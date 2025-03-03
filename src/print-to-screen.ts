import { Product, Receipt } from "./taxes-calculator";

export const printToScreen = (receipt: Receipt) => {

    console.log(receipt)
    const div = document.createElement("div");
      
    receipt.items.forEach((product: Product) => {
        const p = document.createElement("p");
        p.textContent = `${product.quantity} ${product.name}: ${(product.price * product.quantity).toFixed(2)}`;
        div.appendChild(p);
    });
    
    const taxes = document.createElement("p");
    taxes.textContent = `Sales Taxes: ${receipt.totalTax.toFixed(2)}`;
    div.appendChild(taxes);
    const total = document.createElement("p");
    total.textContent = `Total: ${receipt.totalAmount.toFixed(2)}`;
    div.appendChild(total);
  
    return div;
}
