// Package snapshot отдаёт снимок контракта, вшитый в бинарь.
//
// Каталог одновременно данные и пакет Go намеренно: go:embed читает только
// СВОЙ каталог и ниже, а копия тех же файлов рядом с кодом означала бы два
// экземпляра контракта, расходящихся молча.
//
// CLI обязан работать без сети и без checkout: партнёр запускает conformance у
// себя, и «скачай контракт» превратило бы проверку приёмника в проверку своего
// доступа к нашему репозиторию.
package snapshot

import (
	_ "embed"
	"encoding/json"
	"fmt"
)

//go:embed SNAPSHOT.json
var manifestJSON []byte

//go:embed extension-delivery/v1/delivery-contract.json
var deliveryContractJSON []byte

//go:embed extension-manifest/v1/manifest.schema.json
var manifestSchemaJSON []byte

//go:embed reference-data/v1/reference-data.schema.json
var referenceDataSchemaJSON []byte

//go:embed platform-catalog/v1/platform-catalog.json
var platformCatalogJSON []byte

// ManifestJSON — опись снимка: версия контракта, файлы и их контрольные суммы.
func ManifestJSON() []byte { return manifestJSON }

// DeliveryContractJSON — машинный контракт подписанной доставки с векторами.
func DeliveryContractJSON() []byte { return deliveryContractJSON }

// ManifestSchemaJSON — JSON Schema манифеста расширения v1.
func ManifestSchemaJSON() []byte { return manifestSchemaJSON }

// ReferenceDataSchemaJSON — схемы слоя ссылок на справочники v1.
func ReferenceDataSchemaJSON() []byte { return referenceDataSchemaJSON }

// PlatformCatalogJSON — каталог точек расширения, слотов и мест интерфейса.
func PlatformCatalogJSON() []byte { return platformCatalogJSON }

// ModelSandbox — модель точки, которая исполняет КОД расширения внутри
// продукта: WebAssembly, без сети, без часов, с бюджетом в миллисекундах.
//
// Она единственная вправе остановить операцию кабинета и единственная, на
// которой объявляется функция. Разница не косметическая: функция, объявленная
// на сетевой точке, не будет вызвана никогда — а кабинет подпишет согласие
// «проверяет документы перед проведением» и не получит ни одной проверки.
// Молчание, неотличимое от работы, — поэтому проверка на это есть и здесь.
//
// Значение имени — из каталога, а не из головы: список моделей платформы лежит
// в снимке полем point_models, и разбор снимка падает, если у точки оказалась
// модель вне него.
const ModelSandbox = "sandbox"

// ExtensionPoint — точка расширения из каталога.
type ExtensionPoint struct {
	Key               string   `json:"key"`
	Owner             string   `json:"owner"`
	Summary           string   `json:"summary"`
	Model             string   `json:"model"`
	RequestSchema     string   `json:"request_schema"`
	ResponseSchema    string   `json:"response_schema"`
	Scopes            []string `json:"scopes"`
	RequestTopic      string   `json:"request_topic,omitempty"`
	ResponseOperation string   `json:"response_operation,omitempty"`
	Errors            []string `json:"errors,omitempty"`
}

// Sandboxed — точка исполняет код расширения, а не ходит по сети.
func (p ExtensionPoint) Sandboxed() bool { return p.Model == ModelSandbox }

// UISlot — контракт слота интерфейса: чем он вправе объявиться и что просить.
type UISlot struct {
	Slot    string   `json:"slot"`
	Types   []string `json:"types"`
	Context []string `json:"context"`
	Action  string   `json:"action"`
	Framed  bool     `json:"framed"`
}

// UIPlacement — именованное место: куда слот просится и что это место даёт.
type UIPlacement struct {
	Placement string   `json:"placement"`
	Module    string   `json:"module"`
	Entity    string   `json:"entity"`
	Surface   string   `json:"surface"`
	Types     []string `json:"types"`
	Context   []string `json:"context"`
	Summary   string   `json:"summary"`
}

// PlatformCatalog — то, чего нет в схеме манифеста: САМИ СПИСКИ.
//
// Схема знает про место только форму ключа и пропускает `crm.deal.sidebar`,
// которого не существует. Каталог отвечает на вопрос «а такое место есть?» —
// поэтому он и лежит в снимке, рядом с контрактом, а не в коде CLI: список,
// набранный руками, разошёлся бы с платформой молча.
type PlatformCatalog struct {
	CatalogVersion int      `json:"catalog_version"`
	Surfaces       []string `json:"surfaces"`
	SlotTypes      []string `json:"slot_types"`
	// PointModels — модели ответа, которые платформа знает сегодня. Список
	// закрытый и снятый с её же констант: по нему видно, что `sandbox` — не
	// опечатка в каталоге, а третья модель рядом с sync и async.
	PointModels         []string `json:"point_models"`
	LaunchContextFields []string `json:"launch_context_fields"`
	Bridge              struct {
		FromExtension []string `json:"from_extension"`
		ToExtension   []string `json:"to_extension"`
	} `json:"bridge"`
	ExtensionPoints []ExtensionPoint `json:"extension_points"`
	UISlots         []UISlot         `json:"ui_slots"`
	UIPlacements    []UIPlacement    `json:"ui_placements"`
}

// ReadPlatformCatalog разбирает каталог точек, слотов и мест.
func ReadPlatformCatalog() (PlatformCatalog, error) {
	var catalog PlatformCatalog
	if err := json.Unmarshal(platformCatalogJSON, &catalog); err != nil {
		return PlatformCatalog{}, fmt.Errorf("каталог точек и мест не разбирается: %w", err)
	}
	return catalog, nil
}

// PlacementOf — место по ключу.
func (c PlatformCatalog) PlacementOf(key string) (UIPlacement, bool) {
	for _, place := range c.UIPlacements {
		if place.Placement == key {
			return place, true
		}
	}
	return UIPlacement{}, false
}

// SlotOf — контракт слота по ключу.
func (c PlatformCatalog) SlotOf(key string) (UISlot, bool) {
	for _, slot := range c.UISlots {
		if slot.Slot == key {
			return slot, true
		}
	}
	return UISlot{}, false
}

// PointOf — точка расширения по ключу.
func (c PlatformCatalog) PointOf(key string) (ExtensionPoint, bool) {
	for _, point := range c.ExtensionPoints {
		if point.Key == key {
			return point, true
		}
	}
	return ExtensionPoint{}, false
}

// SandboxPointKeys — точки, исполняющие код расширения, по алфавиту. Нужны
// отказу: «точка не песочничная» без списка тех, что песочничные, заставляет
// автора манифеста угадывать.
func (c PlatformCatalog) SandboxPointKeys() []string {
	keys := make([]string, 0, len(c.ExtensionPoints))
	for _, point := range c.ExtensionPoints {
		if point.Sandboxed() {
			keys = append(keys, point.Key)
		}
	}
	return keys
}

// PlacementKeys — все места каталога, по алфавиту.
func (c PlatformCatalog) PlacementKeys() []string {
	keys := make([]string, 0, len(c.UIPlacements))
	for _, place := range c.UIPlacements {
		keys = append(keys, place.Placement)
	}
	return keys
}

// File — одна строка описи.
type File struct {
	Path   string `json:"path"`
	Bytes  int    `json:"bytes"`
	SHA256 string `json:"sha256"`
}

// Manifest — опись снимка целиком.
type Manifest struct {
	SnapshotVersion int    `json:"snapshot_version"`
	SnapshotDigest  string `json:"snapshot_digest"`
	Contract        struct {
		Title      string   `json:"title"`
		Version    string   `json:"version"`
		License    string   `json:"license"`
		Servers    []string `json:"servers"`
		Schemas    int      `json:"schemas"`
		Operations struct {
			Total      int            `json:"total"`
			ByStage    map[string]int `json:"by_stage"`
			ByAudience map[string]int `json:"by_audience"`
			ByModule   map[string]int `json:"by_module"`
			// InstallationReachable — сколько операций контракта открыты
			// токену установки `ai_…`. Отдельная ось: она не выводится ни из
			// стадии, ни из области — операция достижима ровно тогда, когда
			// назвала installationToken в своём security.
			InstallationReachable int            `json:"installation_reachable"`
			InstallationByModule  map[string]int `json:"installation_by_module"`
		} `json:"operations"`
	} `json:"contract"`
	Files []File `json:"files"`
}

// ReadManifest разбирает опись снимка.
func ReadManifest() (Manifest, error) {
	var manifest Manifest
	if err := json.Unmarshal(manifestJSON, &manifest); err != nil {
		return Manifest{}, fmt.Errorf("опись снимка не разбирается: %w", err)
	}
	return manifest, nil
}

// DeliveryContract — то, что нужно приёмнику: форма подписи, конверт, пределы
// доставки и векторы для самопроверки.
type DeliveryContract struct {
	Version   int `json:"version"`
	Signature struct {
		Version       string            `json:"version"`
		Algorithm     string            `json:"algorithm"`
		WindowSeconds int               `json:"windowSeconds"`
		Headers       map[string]string `json:"headers"`
		HeaderValue   string            `json:"headerValue"`
		SigningBase   []string          `json:"signingBase"`
		BodyDigest    string            `json:"bodyDigest"`
	} `json:"signature"`
	Envelope struct {
		RequiredFields      []string `json:"requiredFields"`
		HeaderMustMatchBody []string `json:"headerMustMatchBody"`
	} `json:"envelope"`
	Delivery struct {
		RequestTimeoutSeconds int   `json:"requestTimeoutSeconds"`
		MaxAttempts           int   `json:"maxAttempts"`
		AcceptedStatusFrom    int   `json:"acceptedStatusFrom"`
		AcceptedStatusTo      int   `json:"acceptedStatusTo"`
		RetryableStatuses     []int `json:"retryableStatuses"`
		RetryableStatusFrom   int   `json:"retryableStatusFrom"`
	} `json:"delivery"`
	Vectors []Vector `json:"vectors"`
}

// Vector — синтетический пример подписанной доставки. Секреты в нём поддельные.
type Vector struct {
	Name           string `json:"name"`
	KeyID          string `json:"keyId"`
	Secret         string `json:"secret"`
	InstallationID string `json:"installationId"`
	EventID        string `json:"eventId"`
	TimestampUnix  int64  `json:"timestampUnix"`
	Body           string `json:"body"`
	Signature      string `json:"signature"`
}

// ReadDeliveryContract разбирает контракт доставки.
func ReadDeliveryContract() (DeliveryContract, error) {
	var contract DeliveryContract
	if err := json.Unmarshal(deliveryContractJSON, &contract); err != nil {
		return DeliveryContract{}, fmt.Errorf("контракт доставки не разбирается: %w", err)
	}
	return contract, nil
}
