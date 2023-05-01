/* import sizeLetter from '../index'; */

export default class Button {
  constructor(symbol, sizeLetter) {
    this.innerTextButton = symbol;
    this.sizeLetter = sizeLetter;
  }

  createButton(btnText) {
    const div = document.createElement('div');
    div.className = 'button';
    if (this.innerTextButton.length > 1) {
      div.classList.add('button-dark');
    }

    if (this.innerTextButton === 'Space') {
      div.classList.remove('button-dark');
      div.classList.add('button-space');
    }

    if (this.innerTextButton === 'CapsLock' && this.sizeLetter === 'big' && btnText === 'CapsLock') {
      div.classList.add('button_active');
    }

    if (this.innerTextButton === 'Shift' && this.sizeLetter === 'big' && btnText === 'Shift') {
      div.classList.toggle('button_active');
    }

    const text = this.innerTextButton;

    div.innerText = text;

    return div;
  }
}
