import { describe, expect, it } from "vitest"
import { printToScreen } from "./print-to-screen";
import { Receipt } from "./taxes-calculator";

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
            { name: "book", price: 12.49, quantity: 2, isExempt: false, tax: 0, total: 24.98 },
            { name: "music CD", price: 14.99, quantity: 1, isExempt: true, tax: 0, total: 24.98  },
          ],
          totalTax:  1.50, 
          totalAmount: 42.32
        };

        const div = printToScreen(receipt);
        expect(div).toBeInstanceOf(HTMLDivElement);
        expect(div.children.length).toBe(4);
        expect(div.children[0].textContent).toBe("2 book: 24.98");
        expect(div.children[1].textContent).toBe("1 music CD: 14.99");
        expect(div.children[2].textContent).toBe("Sales Taxes: 1.50");
        expect(div.children[3].textContent).toBe("Total: 42.32");
      });

})