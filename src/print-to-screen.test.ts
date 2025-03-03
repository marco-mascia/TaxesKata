import { describe, expect, it } from "vitest"
import { printToScreen } from "./print-to-screen";
import { ProductCategory, Receipt } from "./taxes-calculator";

describe('Taxes Calculator', () => {
    
    describe('printToScreen', () => {
        it("should handle an empty product list", () => {
            const result = printToScreen({items: [], totalTax: 0, totalAmount: 0});
            expect(result).toBeInstanceOf(HTMLDivElement);
        });
    })

    it("should create a div with product details, taxes, and total", () => {
        const receipt: Receipt = {
          items: [
            { name: "book", price: 12.49, quantity: 2, tax: 0, total: 24.98, category: ProductCategory.BOOKS},
            { name: "music CD", price: 14.99, quantity: 1, category: ProductCategory.MUSIC, tax: 1.50, total: 24.98 },
            { name: "spaghetti", price: 1.89, quantity: 7, tax: 0, total: 13.23, category: ProductCategory.FOOD }, 
          ],
          totalTax:  1.50, 
          totalAmount: 42.32
        };

        const div = printToScreen(receipt);
        expect(div).toBeInstanceOf(HTMLDivElement);
        expect(div.children.length).toBe(6);
        expect(div.children[0].textContent).toBe("2 book: 24.98");
        expect(div.children[1].textContent).toBe("1 music CD: 14.99");
        expect(div.children[2].textContent).toBe("7 spaghetti: 13.23");

        expect(div.children[4].textContent).toBe("Sales Taxes: 1.50");
        expect(div.children[5].textContent).toBe("Total: 42.32");
      });

})