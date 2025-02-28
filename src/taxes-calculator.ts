export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    isExempt: boolean;
  };

export interface ICart {
    products: IProduct[];
    totalTaxes: string;
    totalPrice: string;
}

const taxesLabel = 'Sales Taxes:';
const totalPriceLabel = 'Total:';
const salesTax = 0.1;

export const calculateTaxes = (products: IProduct[]): ICart => {
    
    let cart: ICart = { products: products, totalTaxes: `${taxesLabel} 0`, totalPrice: `${totalPriceLabel} 0`};
    let totalTaxes = 0;
    let totalPrice = 0;
  
    products.forEach((product: IProduct) => {
      const tax = product.isExempt ? 0 : product.price * salesTax;
      const taxedPrice = product.price + tax;
      totalTaxes += tax * product.quantity;
      totalPrice += taxedPrice * product.quantity;
    });
  
    cart.totalTaxes = `${taxesLabel} ${totalTaxes.toFixed(2)}`;
    cart.totalPrice = `${totalPriceLabel} ${totalPrice.toFixed(2)}`;

    return cart;
  }
  