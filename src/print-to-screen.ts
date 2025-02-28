import { ICart, IProduct } from "./taxes-calculator";

export const printToScreen = (cart: ICart) => {

    const div = document.createElement("div");
      
    cart.products.forEach((product: IProduct) => {
        const p = document.createElement("p");
        p.textContent = `${product.quantity} ${product.name}: ${product.price * product.quantity}`;
        div.appendChild(p);
    });
    
    const taxes = document.createElement("p");
    taxes.textContent = `${cart.totalTaxes}`;
    div.appendChild(taxes);
    const total = document.createElement("p");
    total.textContent = `${cart.totalPrice}`;
    div.appendChild(total);

    
    return div;

}