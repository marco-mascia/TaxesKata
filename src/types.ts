
//propagazione errore 
export type Order = {
    id: number,
    productId: number;
    quantity: number
}

export type Product = {
    id: number;
    name: string;
    price: number;
    categoryId: number;
}

export type ProductCategory = {
    id: number;
    name: string; 
    tax: number;
}

export type ReceiptItem = {
    id?: number;
    name: string;
    price: number;
    categoryId: number;
    quantity: number;
    tax: number;
    priceTotal: number;
}

export type Receipt = {
    items: ReadonlyArray<ReceiptItem>;
    totalTax: number;
    totalAmount: number;
}