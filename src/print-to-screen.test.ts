import { describe, expect, it } from "vitest"
import { ICart } from "./taxes-calculator";
import { printToScreen } from "./print-to-screen";

describe('Taxes Calculator', () => {
    
    describe('printToScreen', () => {
        it("should handle an empty product list", () => {
            const result = printToScreen({products: [], totalTaxes: '', totalPrice: ''});
            expect(result).toBeInstanceOf(HTMLDivElement);
        });
    })

    it("should create a div with product details, taxes, and total", () => {
        const cart: ICart = {
          products: [
            { name: "book", price: 12.49, quantity: 2, isExempt: false },
            { name: "music CD", price: 14.99, quantity: 1, isExempt: true },
          ],
          totalTaxes: 'Sales Taxes: 1.50',
          totalPrice: 'Total: 42.32',
        };

        const div = printToScreen(cart);
        expect(div).toBeInstanceOf(HTMLDivElement);
        expect(div.children.length).toBe(4);
        expect(div.children[0].textContent).toBe("2 book: 24.98");
        expect(div.children[1].textContent).toBe("1 music CD: 14.99");
        expect(div.children[2].textContent).toBe("Sales Taxes: 1.50");
        expect(div.children[3].textContent).toBe("Total: 42.32");
      });

})