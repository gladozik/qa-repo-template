// Хелпер для парсинга цены из тайтла объявления
export function parsePrice(priceText?: string): number {
    if (!priceText) {
        throw new Error("parsePrice: пустая строка");
    }
    if (priceText.trim() === "Бесплатно") {
        return 0;
    }

    let s = priceText.trim().replace(/[^0-9,]/g, "");
    s = s.replace(",", ".");

    const n = Number(s);
    if (!Number.isFinite(n)) {
        throw new Error(`Не удалось распарсить цену из "${priceText}" -> "${s}"`);
    }

    return n;
}
