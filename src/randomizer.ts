import { mockOrders } from "./mockOrders";
import { Order } from "./types";

  
export function pickRandomItems(itemNr: number): Order[] {
    const shuffled = Array.from(mockOrders).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, itemNr);
}
  