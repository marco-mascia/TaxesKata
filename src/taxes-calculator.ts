/***** TYPES *****/

export type Product = {
    quantity: number;
    name: string;
    price: number;
    category?: ProductCategory;
}

export enum ProductCategory {
    FOOD =  0,
    BOOKS = 0,
    MEDICAL = 0,
    MUSIC = 0.1, 
    APPAREL = 0.1,
    ELECTRONICS = 0.1,
    OFFICE = 0.1,
    HOUSE = 0.1
}

export type ReceiptItem = Product & {
    tax: number;
    total: number;
}

export type Receipt = {
    items: ReadonlyArray<ReceiptItem>;
    totalTax: number;
    totalAmount: number;
}


/***** CALCS *****/

// Round up to the nearest 0.05
// 1. Multiplying by 20 (to shift decimal point)
// 2. Using Math.ceil to round up to nearest whole number
// 3. Dividing by 20 (to shift decimal point back)
    
export const calculateTax = (product: Product): number => {
    if (product.price < 0 || !product.category) {
        return 0;
    }
    const tax = product.price * product.category.valueOf();
    return Math.ceil(tax * 20) / 20;
};

export const calculateItemTotal = (product: Product, tax: number): number => { 
    return formatCurrencyNumber((product.quantity * (product.price + tax)))
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
    const items = mapProductItems(products);

    return {
        items,
        totalTax: sumTotalTaxes(items),
        totalAmount: sumTotalAmount(items)
    };
};

//checks for empty products list and negative or zero product quantity
export const mapProductItems = (products: ReadonlyArray<Product>): ReadonlyArray<ReceiptItem> => {
    
    if (!products || products.length === 0) {
        return [];
    }

    return products.filter(product => product !== null && product !== undefined && product.quantity >= 0 && product.price >= 0)
                    .map(product => createReceiptItem(product));

}

export const sumTotalTaxes = (items: ReadonlyArray<ReceiptItem>): number => {
    return formatCurrencyNumber(items.reduce((sum, item) => {
        if (item.quantity < 0) return 0;
        return sum + (item.tax * item.quantity);
    }, 0))
}


export const sumTotalAmount = (items: ReadonlyArray<ReceiptItem>) => {
    return formatCurrencyNumber(items.reduce((sum, item) => sum + item.total, 0))
}


export const calculateReceipt = (products: ReadonlyArray<Product>): Receipt =>  {
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

