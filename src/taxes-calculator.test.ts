import { describe, expect, it } from "vitest";
import {
  calculateTax,
  calculateReceipt,
  getCategory,
  getProduct,
  calculateItemTotal,
  createReceiptItem,
  createReceipt,
  sumTotalTaxes,
  sumTotalAmount,
  formatCurrency,
  formatCurrencyNumber,
  formatReceiptLine,
  formatReceipt,
  mapProductItems,
} from "./taxes-calculator";
import { Order, Receipt, ReceiptItem } from "./types";

describe("Taxes Calculator", () => {

  describe('getCategory', () => { 
    it("should return a ProductCategory", () => {
      const category = getCategory(1);
      expect(category).toStrictEqual(
        {
          id: 1,
          name: "ELECTRONICS",
          tax: 0.1,
        }
      )
    })

    it("should manage negative category", () => {
      expect(() => getCategory(-1)).toThrow('Invalid category ID');
    });

  })

  describe('getProduct', () => { 
    it("should return a Product", () => {
      const product = getProduct(1);

      expect(product).toStrictEqual(
        { id: 1, name: "notebook", price: 5.99, categoryId: 1 },
      )
    })

    it("should manage negative id", () => {
      expect(() => getProduct(-1)).toThrow('Invalid product ID');
    });

  })

  describe("calculateReceipt", () => {

    it("should handle an empty product list", () => {
      const result = calculateReceipt([]);

      expect(result.items).toStrictEqual([]);
      expect(result.totalTax).toStrictEqual(0);
      expect(result.totalAmount).toStrictEqual(0);
    });

    it("should calculate correct taxes and total for given products", () => {

      const orders: Order[] = [
        { id: 1, quantity: 2, productId: 44 },
        { id: 2, quantity: 1, productId: 63 },
        { id: 3, quantity: 1, productId: 17 },
      ];
  
      const result: Receipt = calculateReceipt(orders);
  
      expect(result.items).toStrictEqual([
        {  name: "book - fiction", price: 12.49, categoryId: 3, quantity: 2, tax: 0, priceTotal: 24.98 },
        {  name: "music CD", price: 14.99, categoryId: 5, quantity: 1, tax: 1.5, priceTotal: 16.49 },
        {  name: "chocolate bar", price: 0.85, categoryId: 3, quantity: 1, tax: 0, priceTotal: 0.85 },
      ]);
      expect(result.totalTax).toStrictEqual(1.5);
      expect(result.totalAmount).toStrictEqual(42.32);
    });

  });

  describe("mapProductItems ", () => {
    it("should manage empty product list", () => {
        const products: Order[] = [];
        const result = mapProductItems(products);
        expect(result).toStrictEqual([]);
    });

    it("should map product items", () => {
      const orders: Order[] = [
        { id: 1, quantity: 2, productId: 44 },
        { id: 2, quantity: 1, productId: 63 },
        { id: 3, quantity: 1, productId: 17 },
      ];

      const result: ReadonlyArray<ReceiptItem> = mapProductItems(orders);

      expect(result).toStrictEqual([
        {  name: "book - fiction", price: 12.49, categoryId: 3, quantity: 2, tax: 0, priceTotal: 24.98 },
        {  name: "music CD", price: 14.99, categoryId: 5, quantity: 1, tax: 1.5, priceTotal: 16.49 },
        {  name: "chocolate bar", price: 0.85, categoryId: 3, quantity: 1, tax: 0, priceTotal: 0.85 },
      ]);
    });

    //   const products: ReadonlyArray<Product> = [
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "spaghetti",
    //       price: 1.89,
    //       quantity: -1,
    //       category: ProductCategory.FOOD,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ];

    //   const result: ReadonlyArray<ReceiptItem> = mapProductItems(products);

    //   expect(result).toStrictEqual([
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       tax: 0,
    //       total: 24.98,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       tax: 1.5,
    //       total: 16.49,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ]);
    // });

    // it("should map product items mixed with products with negative price", () => {
    //   const products: ReadonlyArray<Product> = [
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "spaghetti",
    //       price: -100,
    //       quantity: 1,
    //       category: ProductCategory.FOOD,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ];

    //   const result: ReadonlyArray<ReceiptItem> = mapProductItems(products);

    //   expect(result).toStrictEqual([
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       tax: 0,
    //       total: 24.98,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       tax: 1.5,
    //       total: 16.49,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ]);
    // });

    // it("should map product items with zero price", () => {
    //   const products: ReadonlyArray<Product> = [
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "spaghetti",
    //       price: 0,
    //       quantity: 1,
    //       category: ProductCategory.FOOD,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ];

    //   const result: ReadonlyArray<ReceiptItem> = mapProductItems(products);

    //   expect(result).toStrictEqual([
    //     {
    //       name: "book",
    //       price: 12.49,
    //       quantity: 2,
    //       tax: 0,
    //       total: 24.98,
    //       category: ProductCategory.BOOKS,
    //     },
    //     {
    //       name: "spaghetti",
    //       price: 0,
    //       quantity: 1,
    //       tax: 0,
    //       total: 0,
    //       category: ProductCategory.FOOD,
    //     },
    //     {
    //       name: "music CD",
    //       price: 14.99,
    //       quantity: 1,
    //       tax: 1.5,
    //       total: 16.49,
    //       category: ProductCategory.MUSIC,
    //     },
    //   ]);
    // });
  });

  describe("sumTotalAmount", () => {

    it("should return 0 for empty array", () => {
      const products: ReadonlyArray<ReceiptItem> = [];

      const result = sumTotalAmount(products);

      expect(result).toStrictEqual(0);
     });

    it("should calculate correct total taxes for for given products", () => {
      const items: ReadonlyArray<ReceiptItem> = [
        {  name: "book - fiction", price: 12.49, categoryId: 3, quantity: 2, tax: 0, priceTotal: 24.98 },
        {  name: "music CD", price: 14.99, categoryId: 5, quantity: 2, tax: 1.5, priceTotal: 16.49 },
        {  name: "chocolate bar", price: 0.85, categoryId: 3, quantity: 1, tax: 0, priceTotal: 0.85 },
      ];

      const result = sumTotalAmount(items);

      expect(result).toStrictEqual(42.32);
    });

  });

  describe("sumTotalTaxes", () => {

    it("should return 0 for empty array", () => {
      const products: ReadonlyArray<ReceiptItem> = [];

      const result = sumTotalTaxes(products);

      expect(result).toStrictEqual(0);
     });

    it("should calculate correct total taxes for for given products", () => {
      const items: ReadonlyArray<ReceiptItem> = [
        {  name: "book - fiction", price: 12.49, categoryId: 3, quantity: 2, tax: 0, priceTotal: 24.98 },
        {  name: "music CD", price: 14.99, categoryId: 5, quantity: 2, tax: 1.5, priceTotal: 16.49 },
        {  name: "chocolate bar", price: 0.85, categoryId: 3, quantity: 1, tax: 0, priceTotal: 0.85 },
      ];

      const result = sumTotalTaxes(items);

      expect(result).toStrictEqual(3);
    });

  });

  describe("calculateTax", () => {

    it("should return tax value for category tax > 0", () => {
      const product =  { id: 63, name: "music CD", price: 14.99, categoryId: 5 };     
      const category = { id: 5, name: "MUSIC", tax: 0.1 };
      const result = calculateTax(product, category);
      expect(result).toBe(1.5);
    });

    it("should manage negative price", () => {
      const product =  { id: 63, name: "music CD", price: -14.99, categoryId: 5 };     
      const category = { id: 5, name: "MUSIC", tax: 0.1 };
      expect(() => calculateTax(product, category)).toThrow('Invalid product price');
    });

    it("should manage negative tax", () => {
      const product =  { id: 63, name: "music CD", price: 14.99, categoryId: 5 };     
      const category = { id: 5, name: "MUSIC", tax: -0.1 };
      expect(() => calculateTax(product, category)).toThrow('Invalid category ID');
      });

  });

  describe("calculateItemTotal", () => {
    it("should calculate total including tax for multiple quantities", () => {  
      // 2 * (14.99 + 1.50) = 32.98
      expect(calculateItemTotal(2, 14.99, 1.5)).toBe(32.98);
    });

    it("should manage negative quantity", () => {
      expect(() => calculateItemTotal(-1, 14.99, 1.5)).toThrow('Invalid Quantity');
    });
    it("should manage negative price", () => {
      expect(() => calculateItemTotal(2, -14.99, 1.5)).toThrow('Invalid Price');
    });

    it("should manage negative tax", () => {
      expect(() => calculateItemTotal(2, 14.99, -1.5)).toThrow('Invalid Tax');
    });

  });

  describe("createReceiptItem", () => {

    it("should create receipt item with correct tax and total", () => {
      const orders: Order = { id: 2, quantity: 1, productId: 63 };
      
      const receiptItem = createReceiptItem(orders);

      expect(receiptItem).toEqual({
        quantity: 1,
        name: "music CD",
        price: 14.99,
        tax: 1.5,
        priceTotal: 16.49,
        categoryId: 5
      });
    });

  });

  describe("createReceipt", () => {
    it("should create a complete receipt with correct totals", () => {
      const orders: Order[] = [
        { id: 1, quantity: 2, productId: 44 },
        { id: 2, quantity: 1, productId: 63 },
        { id: 3, quantity: 1, productId: 17 },
      ];

      const receipt = createReceipt(orders);

      expect(receipt.items).toHaveLength(3);
      expect(receipt.totalTax).toBe(1.5); // Only music CD is taxed
      expect(receipt.totalAmount).toBe(42.32);
    });
  });

  describe("formatting functions", () => {
    it("formatCurrency should format numbers to 2 decimal places and return strings", () => {
      expect(formatCurrency(-1)).toBe("-1.00");
      expect(formatCurrency(0)).toBe("0.00");
      expect(formatCurrency(12.4)).toBe("12.40");
      expect(formatCurrency(12.456)).toBe("12.46");
    });

    it("formatCurrencyNumber should format numbers to 2 decimal places and return numbers", () => {
      expect(formatCurrencyNumber(-1)).toBe(-1);
      expect(formatCurrencyNumber(0)).toBe(0);
      expect(formatCurrencyNumber(12)).toBe(12.00);
      expect(formatCurrencyNumber(12.00)).toBe(12.00);
      expect(formatCurrencyNumber(12.4)).toBe(12.4);
      expect(formatCurrencyNumber(12.456)).toBe(12.46);
    });

    it("formatReceiptLine should format item lines correctly", () => {
      const item = {
        quantity: 1,
        name: "music CD",
        price: 14.99,
        tax: 1.5,
        priceTotal: 16.49,
        categoryId: 5
      };
      expect(formatReceiptLine(item)).toBe("1 music CD: 16.49");
    });

    it("formatReceipt should format the complete receipt", () => {
      const receipt = {
        items: [
          {
            quantity: 1,
            name: "music CD",
            price: 14.99,
            tax: 1.5,
            priceTotal: 16.49,
            categoryId: 5
          },
        ],
        totalTax: 1.50,
        totalAmount: 16.49,
      };

      const formattedReceipt = formatReceipt(receipt);
      expect(formattedReceipt).toEqual([
        "1 music CD: 16.49",
        "Sales Taxes: 1.50",
        "Total: 16.49",
      ]);
    });
  });
});
