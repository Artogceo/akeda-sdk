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

// ManifestJSON — опись снимка: версия контракта, файлы и их контрольные суммы.
func ManifestJSON() []byte { return manifestJSON }

// DeliveryContractJSON — машинный контракт подписанной доставки с векторами.
func DeliveryContractJSON() []byte { return deliveryContractJSON }

// ManifestSchemaJSON — JSON Schema манифеста расширения v1.
func ManifestSchemaJSON() []byte { return manifestSchemaJSON }

// ReferenceDataSchemaJSON — схемы слоя ссылок на справочники v1.
func ReferenceDataSchemaJSON() []byte { return referenceDataSchemaJSON }

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
