import { sizeLetter } from "../index";



export class Button {
  constructor(symbol) {
    this.innerTextButton = symbol;
  }

  createButton(btnText) {
    let div = document.createElement('div');
    div.className = 'button';
    if(this.innerTextButton.length > 1) {
      div.classList.add('button-dark');
    }

    if(this.innerTextButton === 'Space') {
      div.classList.remove('button-dark');
      div.classList.add('button-space');
    }

    if(this.innerTextButton === 'Caps Lock' && sizeLetter === 'big' && btnText === 'Caps Lock') {
      div.classList.add('button_active');
    }

    if(this.innerTextButton === 'Shift' && sizeLetter === 'big' &&  btnText === 'Shift') {
      console.log(123)
      div.classList.add('button_active');
    }

    const text = this.innerTextButton /* === "Space" ? '' : `${this.innerTextButton}`; */

    div.innerText = text;

    return div;
  }
}