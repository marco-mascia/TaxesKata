// Types
export type Product = {
    quantity: number;
    name: string;
    price: number;
    isExempt: boolean;
}

type ReceiptItem = Product & {
    tax: number;
    total: number;
}

export type Receipt = {
    items: ReadonlyArray<ReceiptItem>;
    totalTax: number;
    totalAmount: number;
}


export const calculateTax = (product: Product): number => {
    if (product.isExempt) {
        return 0;
    }
    const tax = product.price * 0.10;
    return Math.ceil(tax * 20) / 20;
};

export const calculateItemTotal = (product: Product, tax: number): number => { 
    return parseFloat((product.quantity * (product.price + tax)).toFixed(2))
}


export const createReceiptItem = (product: Product): ReceiptItem => {
    const tax = calculateTax(product);
    return {
        ...product,
        tax,
        total: calculateItemTotal(product, tax)
    };
};

export const createReceipt = (products: ReadonlyArray<Product>): Receipt => {
    const items = products.map(createReceiptItem);
    
    return {
        items,
        totalTax: items.reduce((sum, item) => sum + (item.tax * item.quantity), 0),
        totalAmount: parseFloat((items.reduce((sum, item) => sum + item.total, 0)).toFixed(2))
    };
};


export const formatCurrency = (amount: number): string => 
    amount.toFixed(2);

export const formatReceiptLine = (item: ReceiptItem): string => 
    `${item.quantity} ${item.name}: ${formatCurrency(item.total)}`;


export const formatReceipt = (receipt: Receipt): ReadonlyArray<string> => [
    ...receipt.items.map(formatReceiptLine),
    `Sales Taxes: ${formatCurrency(receipt.totalTax)}`,
    `Total: ${formatCurrency(receipt.totalAmount)}`
];

// export const printReceipt = (receipt: Receipt): void => 
//     formatReceipt(receipt).forEach(line => console.log(line));

// export const testInput = (): void => {
//     const products:  ReadonlyArray<Product> = [
//       { name: "book", price: 12.49, quantity: 2, isExempt: true },
//       { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
//       { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
//       { name: "aspirin", price: 7.69, quantity: 3, isExempt: true },
//       { name: "trousers", price: 59.99, quantity: 1, isExempt: false },
//     ];

//     const receipt = createReceipt(products);
//     printReceipt(receipt);    
// }
// // Run the test
// testInput();

export const calculateTaxes = (products: ReadonlyArray<Product>): Receipt =>  createReceipt(products);