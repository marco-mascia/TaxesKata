import { describe, expect, it } from "vitest"
import { printToScreen } from "./print-to-screen";
import { Receipt } from "./types";

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
            {  name: "book - fiction", price: 12.49, categoryId: 3, quantity: 2, tax: 0, priceTotal: 24.98 },
            {  name: "music CD", price: 14.99, categoryId: 5, quantity: 1, tax: 1.5, priceTotal: 16.49 },
            {  name: "chocolate bar", price: 0.85, categoryId: 3, quantity: 1, tax: 0, priceTotal: 0.85 },
          ],
          totalTax:  1.50, 
          totalAmount: 42.32
        };

        const div = printToScreen(receipt);
        expect(div).toBeInstanceOf(HTMLDivElement);
        expect(div.children.length).toBe(7);
        expect(div.children[0].textContent).toBe("2 book - fiction24.98");
        expect(div.children[1].textContent).toBe("1 music CD14.99*");
        expect(div.children[2].textContent).toBe("1 chocolate bar0.85");

        expect(div.children[4].textContent).toBe("Sales Taxes: 1.50");
        expect(div.children[5].textContent).toBe("Total: 42.32");
      });

})