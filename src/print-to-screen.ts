import { taxesLabel, totalLabel } from "./taxes-calculator";
import { Receipt, Product, ReceiptItem } from "./types";

export const printToScreen = (receipt: Receipt) => {

    const div = document.createElement("div");
      
    receipt.items.forEach((item: ReceiptItem) => {
        div.appendChild(printItem(item));
    });
    
    div.appendChild(document.createElement("hr"));
    div.appendChild(printTaxes(receipt));
    div.appendChild(printTotal(receipt));
    div.appendChild(printDisclaimer());

    return div;
}

export const printItem = (item: ReceiptItem) => {

    const p = document.createElement("p");
    p.classList.add("list");

    const label = document.createElement("div");
    label.classList.add('first');
    label.textContent = `${item.quantity} ${item.name}`;
    p.appendChild(label);

    const price = document.createElement("div");
    price.classList.add('price');
    price.textContent = `${(item.price * item.quantity).toFixed(2)}`;
    if(item.tax != 0){
        price.textContent += `*`
    }
    p.appendChild(price);
 
    return p;
}

export const printTaxes = (receipt: Receipt) => {
    const taxes = document.createElement("p");
    taxes.textContent = `${taxesLabel} ${receipt.totalTax.toFixed(2)}`;
    return taxes;
}

export const printTotal = (receipt: Receipt) => {
    const total = document.createElement("p");

    const totalLbl = document.createElement("span");
    totalLbl.textContent = `${totalLabel}`;
    total.appendChild(totalLbl);

    const totalAmount = document.createElement("span");
    totalAmount.classList.add('bold');
    totalAmount.textContent = ` ${receipt.totalAmount.toFixed(2)}`;
    total.appendChild(totalAmount);

    //total.textContent = `${totalLabel} ${receipt.totalAmount.toFixed(2)}`;
    return total;
}

export const printDisclaimer = () => {
    const disclaimer = document.createElement("p");
    disclaimer.classList.add('disclaimer');
    disclaimer.textContent = `* taxed product`;
    return disclaimer;
}