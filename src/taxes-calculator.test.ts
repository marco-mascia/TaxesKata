import { describe, expect, it } from "vitest"
import { calculateTaxes, ICart, IProduct } from "./taxes-calculator";

describe('Taxes Calculator', () => {
    
    describe('calculateTaxes', () => {
        it("should handle an empty product list", () => {
            const result = calculateTaxes([]);
            expect(result.products).toStrictEqual([]);
            expect(result.totalTaxes).toStrictEqual("Sales Taxes: 0.00");
            expect(result.totalPrice).toStrictEqual("Total: 0.00");
        });
    })

    it("should calculate correct taxes and total for given products", () => {
        const products: IProduct[] = [
          { name: "book", price: 12.49, quantity: 2, isExempt: true },
          { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
          { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
        ];
    
        const result: ICart = calculateTaxes(products);
        expect(result.products).toStrictEqual([
            { name: "book", price: 12.49, quantity: 2, isExempt: true },
            { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
            { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
          ]);
        expect(result.totalTaxes).toStrictEqual('Sales Taxes: 1.50');
        expect(result.totalPrice).toStrictEqual('Total: 42.32');
      });

})