import { Product, Receipt, taxesLabel, totalLabel } from "./taxes-calculator";

export const printToScreen = (receipt: Receipt) => {

    //console.log(receipt)
    const div = document.createElement("div");
      
    receipt.items.forEach((product: Product) => {
        const p = document.createElement("p");
        p.textContent = `${product.quantity} ${product.name}: ${(product.price * product.quantity).toFixed(2)}`;
        div.appendChild(p);
    });
    
    div.appendChild(document.createElement("hr"));
    div.appendChild(printTaxes(receipt));
    div.appendChild(printTotal(receipt));
    //div.appendChild(printDisclaimer());

    return div;
}

export const printTaxes = (receipt: Receipt) => {
    const taxes = document.createElement("p");
    taxes.textContent = `${taxesLabel} ${receipt.totalTax.toFixed(2)}`;
    return taxes;
}

export const printTotal = (receipt: Receipt) => {
    const total = document.createElement("p");
    total.textContent = `${totalLabel} ${receipt.totalAmount.toFixed(2)}`;
    return total;
}

export const printDisclaimer = () => {
    const disclaimer = document.createElement("p");
    disclaimer.textContent = `* taxed product`;
    return disclaimer;
}