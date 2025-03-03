import { mockData } from "./mockData";
import { Product } from "./taxes-calculator";

export function setupRandomizer(element: HTMLButtonElement) {
    element.addEventListener('click', () => pickRandomItems(10))
}
  
export function pickRandomItems(itemNr: number): Product[] {
    const shuffled = Array.from(mockData).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, itemNr);
}
  