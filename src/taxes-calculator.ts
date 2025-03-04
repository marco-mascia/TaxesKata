import { mockCategory } from "./mockCategory";
import { mockProducts } from "./mockProducts";
import { Order, Product, ProductCategory, Receipt, ReceiptItem } from "./types";

export const taxesLabel = 'Sales Taxes:';
export const totalLabel = 'Total:';

/***** CALCS *****/

// Round up to the nearest 0.05
// 1. Multiplying by 20 (to shift decimal point)
// 2. Using Math.ceil to round up to nearest whole number
// 3. Dividing by 20 (to shift decimal point back)
    
export const calculateTax = (product: Product, category: ProductCategory): number => {

    if (!product || product.price < 0) {
        throw new Error('Invalid product price');
    }

    if (!category || category.tax < 0) {
        throw new Error('Invalid category ID');
    }

    const tax = product.price * category.tax;
    return Math.ceil(tax * 20) / 20;
};

export const getCategory = (categoryId: number): ProductCategory  => {
    if (!categoryId || categoryId < 0) {
        throw new Error('Invalid category ID');
    }

    if (!mockCategory || !Array.isArray(mockCategory)) {
        throw new Error('Categories data is not available');
    }

    return mockCategory.find((category: ProductCategory) => category.id == categoryId);
}

export const getProduct = (productId: number): Product => {
    if (!productId || productId < 0) {
        throw new Error('Invalid product ID');
    }

    if (!mockProducts || !Array.isArray(mockProducts)) {
        throw new Error('Products data is not available');
    }

    return mockProducts.find((product: Product) => product.id == productId);
}


export const calculateItemTotal = (quantity: number, price: number, tax: number): number => { 

    if (!quantity || quantity < 0) {
        throw new Error('Invalid Quantity');
    }
    if (!price || price < 0) {
        throw new Error('Invalid Price');
    }
    // if (!tax || tax < 0) {
    //     throw new Error('Invalid Tax');
    // }

    return formatCurrencyNumber((quantity * (price + tax)))
}

export const createReceiptItem = (order: Order): ReceiptItem => {

    const product = getProduct(order.productId);
    const category = getCategory(product.categoryId);
    const tax = calculateTax(product, category);

    return {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        quantity: order.quantity,
        tax,
        priceTotal: calculateItemTotal(order.quantity, product.price, tax)
    };
};

export const createReceipt = (orders: ReadonlyArray<Order>): Receipt => {
    const items = mapProductItems(orders);

    return {
        items,
        totalTax: sumTotalTaxes(items),
        totalAmount: sumTotalAmount(items)
    };
};

//checks for empty products list and negative or zero product quantity
export const mapProductItems = (orders: ReadonlyArray<Order>): ReadonlyArray<ReceiptItem> => {
    
    if (!orders || orders.length === 0) {
        return [];
    }

    return orders.filter(order => order !== null && order !== undefined && order.quantity >= 0)
                    .map(order => createReceiptItem(order));

}

export const sumTotalTaxes = (items: ReadonlyArray<ReceiptItem>): number => {
    return formatCurrencyNumber(items.reduce((sum, item) => {
        if (item.quantity < 0) return 0;
        return sum + (item.tax * item.quantity);
    }, 0))
}


export const sumTotalAmount = (items: ReadonlyArray<ReceiptItem>) => {
    return formatCurrencyNumber(items.reduce((sum, item) => sum + item.priceTotal, 0))
}


export const calculateReceipt = (orders: ReadonlyArray<Order>): Receipt =>  {
    const receipt = createReceipt(orders);
    printReceipt(receipt); //only for print on console
    return receipt
};


/***** FORMATTERS *****/

export const formatCurrency = (amount: number): string => amount.toFixed(2);
export const formatCurrencyNumber = (amount: number): number => parseFloat(formatCurrency(amount));

//only for print in console
export const formatReceiptLine = (item: ReceiptItem): string => 
    `${item.quantity} ${item.name}: ${formatCurrency(item.priceTotal)}`;

//only for print in console
export const formatReceipt = (receipt: Receipt): ReadonlyArray<string> => [
    ...receipt.items.map(formatReceiptLine),
    `${taxesLabel} ${formatCurrency(receipt.totalTax)}`,
    `${totalLabel} ${formatCurrency(receipt.totalAmount)}`
];


/***** PRINT *****/

//only for print in console
export const printReceipt = (receipt: Receipt): void => 
    formatReceipt(receipt).forEach(line => console.log(line));


