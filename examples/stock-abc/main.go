// Расширение Akeda ERP «ABC-XYZ анализ запасов».
//
// Две страницы внутри Akeda и свой API к ним. Читает обороты и остатки
// регистра склада, раскладывает номенклатуру по классам ABC (величина расхода)
// и XYZ (ровность расхода) и показывает результат: сводку — на странице
// настройки, класс одного товара — на его карточке.
//
// ── ПОЧЕМУ ЭТО РАСШИРЕНИЕ, А НЕ ФУНКЦИЯ ПРОДУКТА ────────────────────────────
//
// Потому что методика — дело клиента. Один считает A по восьмидесяти процентам
// расхода, другой по семидесяти, третий меряет в штуках, а не в деньгах;
// период у всех свой. Платформа, назначившая эти числа за клиента, была бы
// неправа у всех, кроме одного.
//
// ── ЧЕГО ОНО НЕ ДЕЛАЕТ ──────────────────────────────────────────────────────
//
// НИЧЕГО НЕ ПИШЕТ. Ни в Akeda, ни у себя на диск. Список вызываемых операций
// закрыт четырьмя чтениями и двумя обращениями к собственной установке; команд,
// меняющих учёт, в коде нет вовсе.
//
//	export AKEDA_TENANT='кабинет'
//	export AKEDA_INSTALLATION_TOKEN='ai_live_…'   # или …_TOKEN_FILE
//	go run ./examples/stock-abc
//
// Полностью — examples/stock-abc/README.md.
package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	config, err := LoadConfig()
	// Журнал собирается ДО разбора отказа: сообщение об ошибке настройки может
	// содержать значение переменной окружения, и фильтр секрета обязан стоять
	// раньше первой строки вывода.
	logger := newLogger(os.Stderr, config.Token)
	if err != nil {
		logger.Fatalf("настройка сервиса: %v", err)
	}

	api, err := NewAkeda(config.BaseURL, config.Token, config.Tenant)
	if err != nil {
		logger.Fatalf("клиент Akeda: %v", err)
	}

	server := NewServer(config, api, logger)
	httpServer := &http.Server{
		Addr:    config.Addr,
		Handler: server.Handler(),
		// Сроки выставлены явно: у http.Server их нет по умолчанию вовсе, и
		// служба без них держит зависшее соединение до конца времён.
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	// Секрет печатается через Secret.String: в журнале остаётся только контур
	// токена (ai_live_… либо ai_test_…), по которому разбирают инцидент.
	logger.Printf("ABC-XYZ анализ запасов: слушаю %s", config.Addr)
	logger.Printf("контур Akeda: %s, кабинет: %s, токен: %s", config.BaseURL, config.Tenant, config.Token)
	logger.Printf("источники оболочки: %v", config.ShellOrigins)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)

	go func() {
		if err := httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Fatalf("сервер остановлен: %v", err)
		}
	}()

	<-stop
	logger.Print("останавливаюсь")
	shutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := httpServer.Shutdown(shutdown); err != nil {
		logger.Printf("остановка с ошибкой: %v", err)
	}
}
