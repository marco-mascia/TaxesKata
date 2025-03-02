import { describe, expect, it } from "vitest"
import { calculateTax, calculateItemTotal, createReceiptItem, createReceipt, formatCurrency, formatReceiptLine, formatReceipt, Product, calculateTaxes, Receipt } from "./taxes-calculator-fuctional";

describe('Taxes Calculator', () => {
    
    describe('calculateTaxes', () => {
        it("should handle an empty product list", () => {
            const result = calculateTaxes([]);
            expect(result.items).toStrictEqual([]);
            expect(result.totalTax).toStrictEqual("Sales Taxes: 0.00");
            expect(result.totalAmount).toStrictEqual("Total: 0.00");
        });
    })

    it("should calculate correct taxes and total for given products", () => {
        const products: Product[] = [
          { name: "book", price: 12.49, quantity: 2, isExempt: true },
          { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
          { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
        ];
    
        const result: Receipt = calculateTaxes(products);
        expect(result.items).toStrictEqual([
            { name: "book", price: 12.49, quantity: 2, isExempt: true },
            { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
            { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
          ]);
        expect(result.totalTax).toStrictEqual('Sales Taxes: 1.50');
        expect(result.totalAmount).toStrictEqual('Total: 42.32');
      });


    describe('calculateTax', () => {
        it('should return 0 for exempt items', () => {
            const product = { quantity: 1, name: 'book', price: 12.49, isExempt: true};
            expect(calculateTax(product)).toBe(0);
        });

        it('should calculate 10% tax and round to nearest 0.05', () => {
            const product = { quantity: 1, name: 'music CD', price: 14.99, isExempt: false };
            // 14.99 * 0.10 = 1.499 -> rounded to 1.50
            expect(calculateTax(product)).toBe(1.50);
        });
    });

    describe('calculateItemTotal', () => {
        it('should calculate total including tax for multiple quantities', () => {
            const product = { quantity: 2, name: 'music CD', price: 14.99, isExempt: false };
            const tax = 1.50;
            // 2 * (14.99 + 1.50) = 32.98
            expect(calculateItemTotal(product, tax)).toBe(32.98);
        });
    });

    describe('createReceiptItem', () => {
        it('should create receipt item with correct tax and total', () => {
            const product = { quantity: 1, name: 'music CD', price: 14.99, isExempt: false };
            const receiptItem = createReceiptItem(product);
            
            expect(receiptItem).toEqual({
                quantity: 1,
                name: 'music CD',
                price: 14.99,
                tax: 1.50,
                total: 16.49,
                isExempt: false
            });
        });
    });

    describe('createReceipt', () => {
        it('should create a complete receipt with correct totals', () => {
            const products = [
                { quantity: 1, name: 'book', price: 12.49, isExempt: true },
                { quantity: 1, name: 'music CD', price: 14.99, isExempt: false}
            ];

            const receipt = createReceipt(products);
            expect(receipt.items).toHaveLength(2);
            expect(receipt.totalTax).toBe(1.50); // Only music CD is taxed
            expect(receipt.totalAmount).toBe(28.98); // 12.49 + (14.99 + 1.50)

        });
    });

    describe('formatting functions', () => {
        it('formatCurrency should format numbers to 2 decimal places', () => {
            expect(formatCurrency(12.4)).toBe('12.40');
            expect(formatCurrency(12.456)).toBe('12.46');
        });

        it('formatReceiptLine should format item lines correctly', () => {
            const item = {
                quantity: 2,
                name: 'book',
                price: 12.49,
                tax: 0,
                total: 24.98,
                isExempt: true
            };
            expect(formatReceiptLine(item)).toBe('2 book: 24.98');
        });

        it('formatReceipt should format the complete receipt', () => {
            const receipt = {
                items: [{
                    quantity: 1,
                    name: 'book',
                    price: 12.49,
                    tax: 0,
                    total: 12.49,
                    isExempt: true
                }],
                totalTax: 0,
                totalAmount: 12.49
            };

            const formattedReceipt = formatReceipt(receipt);
            expect(formattedReceipt).toEqual([
                '1 book: 12.49',
                'Sales Taxes: 0.00',
                'Total: 12.49'
            ]);
        });
    });
})