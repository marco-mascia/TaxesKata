import './style.css'
import { printToScreen } from './print-to-screen.ts'
import { calculateReceipt } from './taxes-calculator.ts'
import { pickRandomItems, setupRandomizer } from './randomizer.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Taxes Kata</h1>
    <div id="receipt" class="alignLeft"></div>
    <div class="card">
      <button id="randomizer" type="button">Randomize</button>
    </div>
  </div>
`

setupRandomizer(document.querySelector<HTMLButtonElement>('#randomizer')!)

const element = document.getElementById('receipt');
const products = pickRandomItems(10);
element?.appendChild(printToScreen(calculateReceipt(products)));

