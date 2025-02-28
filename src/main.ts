import './style.css'
import { setupCounter } from './counter.ts'
import { calculateTaxes, IProduct } from './taxes-calculator.ts'
import { printToScreen } from './print-to-screen.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Taxes Kata</h1>
    <div id="receipt" class="alignLeft"></div>
    <div class="card">
      <button id="counter" type="button">Randomize</button>
    </div>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const products: IProduct[] = [
  { name: "book", price: 12.49, quantity: 2, isExempt: true },
  { name: "music CD", price: 14.99, quantity: 1, isExempt: false },
  { name: "chocolate bar", price: 0.85, quantity: 1, isExempt: true },
  { name: "aspirin", price: 7.69, quantity: 3, isExempt: true },
  { name: "trousers", price: 59.99, quantity: 1, isExempt: false },
];


const element = document.getElementById('receipt');
element?.appendChild(printToScreen(calculateTaxes(products)));


