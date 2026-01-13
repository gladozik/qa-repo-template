// Хелпер для парсинга цены из тайтла объявления
export function parsePrice(priceText?: string): number {
    if (!priceText) {
        throw new Error("parsePrice: пустая строка");
    }
    if (priceText.trim() === "Бесплатно") {
        return 0;
    }

    // Удаление пробелов и нечисловых символов, кроме запятой
    let s = priceText.trim().replace(/[^0-9,]/g, "");

    // Замена запятой на точку для парсинга в число
    s = s.replace(",", ".");

    const n = Number(s);
    if (!Number.isFinite(n)) {
        throw new Error(`parsePrice: не удалось распарсить цену из "${priceText}" -> "${s}"`);
    }
    return n;
}
