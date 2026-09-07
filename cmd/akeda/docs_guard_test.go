package main

import (
	"os"
	"strings"
	"testing"

	"github.com/Artogceo/akeda-sdk/snapshot"
)

// Снимок робот пересоберёт сам, а абзац про новую точку или место сам не
// напишется. Поэтому каждая точка и каждое место каталога обязаны быть
// названы в docs/extension-points.md: пересъём, принёсший новое, не сольётся,
// пока кто-то не напишет, что это и как этим пользоваться.
func TestEveryCatalogEntryIsDocumented(t *testing.T) {
	catalog, err := snapshot.ReadPlatformCatalog()
	if err != nil {
		t.Fatalf("каталог не читается: %v", err)
	}
	raw, err := os.ReadFile("../../docs/extension-points.md")
	if err != nil {
		t.Fatalf("docs/extension-points.md не читается: %v", err)
	}
	doc := string(raw)
	for _, point := range catalog.ExtensionPoints {
		if !strings.Contains(doc, point.Key) {
			t.Errorf("точка %s есть в каталоге, но не описана в docs/extension-points.md", point.Key)
		}
	}
	for _, place := range catalog.UIPlacements {
		if !strings.Contains(doc, place.Placement) {
			t.Errorf("место %s есть в каталоге, но не названо в docs/extension-points.md", place.Placement)
		}
	}
}
