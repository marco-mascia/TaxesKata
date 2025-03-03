import './style.css'
import { printToScreen } from './print-to-screen.ts'
import { calculateReceipt } from './taxes-calculator.ts'
import { pickRandomItems } from './randomizer.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Taxes Kata</h1>
    <div id="receipt" class="alignLeft"></div>
  </div>
`

const element = document.getElementById('receipt');
const products = pickRandomItems(10);
element?.appendChild(printToScreen(calculateReceipt(products)));

