/***** TYPES *****/

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


/***** CALCS *****/

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
        totalTax: formatCurrencyNumber(items.reduce((sum, item) => sum + (item.tax * item.quantity), 0)),
        totalAmount: formatCurrencyNumber(items.reduce((sum, item) => sum + item.total, 0))
    };
};

export const calculateTaxes = (products: ReadonlyArray<Product>): Receipt =>  {
    const receipt = createReceipt(products);
    printReceipt(receipt); //only for print on console
    return receipt
};


/***** FORMATTERS *****/

export const formatCurrency = (amount: number): string => amount.toFixed(2);
export const formatCurrencyNumber = (amount: number): number => parseFloat(formatCurrency(amount));

//only for print in console
export const formatReceiptLine = (item: ReceiptItem): string => 
    `${item.quantity} ${item.name}: ${formatCurrency(item.total)}`;

//only for print in console
export const formatReceipt = (receipt: Receipt): ReadonlyArray<string> => [
    ...receipt.items.map(formatReceiptLine),
    `Sales Taxes: ${formatCurrency(receipt.totalTax)}`,
    `Total: ${formatCurrency(receipt.totalAmount)}`
];


/***** PRINT *****/

//only for print in console
export const printReceipt = (receipt: Receipt): void => 
    formatReceipt(receipt).forEach(line => console.log(line));






