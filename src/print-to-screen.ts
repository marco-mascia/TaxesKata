import { Product, Receipt } from "./taxes-calculator-fuctional";

export const printToScreen = (receipt: Receipt) => {

    console.log('receipt ', receipt);

    const div = document.createElement("div");
      
    receipt.items.forEach((product: Product) => {
        const p = document.createElement("p");
        p.textContent = `${product.quantity} ${product.name}: ${product.price * product.quantity}`;
        div.appendChild(p);
    });
    
    const taxes = document.createElement("p");
    taxes.textContent = `${receipt.totalTax}`;
    div.appendChild(taxes);
    const total = document.createElement("p");
    total.textContent = `${receipt.totalAmount}`;
    div.appendChild(total);
  
    return div;
}
