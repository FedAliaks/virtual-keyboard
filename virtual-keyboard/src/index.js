import './style.scss';
import {
  KEYBOARD_EN, KEYBOARD_EN_SHIFT, KEYBOARD_RU, KEYBOARD_RU_SHIFT,
} from './js/keyboards';
import { createKeyboardLines, deleteNextLetter } from './js/createKeyboard';
import createPage from './js/createPage';

const BUTTONS = {
  Backquote: ['`', '~', '`', '~'],
  Digit1: ['1', '!', '1', '!'],
  Digit2: ['2', '@', '2', '@'],
  Digit3: ['3', '#', '3', '#'],
  Digit4: ['4', '$', '4', '$'],
  Digit5: ['5', '%', '5', '%'],
  Digit6: ['6', '^', '6', '^'],
  Digit7: ['7', '&', '7', '&'],
  Digit8: ['8', '*', '8', '*'],
  Digit9: ['9', '(', '9', '('],
  Digit0: ['0', ')', '0', ')'],
  Minus: ['-', '_', '-', '_'],
  Equal: ['=', '=', '=', '='],
  Backspace: ['Backspace', 'Backspace', 'Backspace', 'Backspace'],
  Tab: ['Tab', 'Tab', 'Tab', 'Tab'],
  KeyQ: ['q', 'Q', 'й', 'Й'],
  KeyW: ['w', 'W', 'ц', 'Ц'],
  KeyE: ['e', 'E', 'у', 'У'],
  KeyR: ['r', 'R', 'к', 'К'],
  KeyT: ['t', 'T', 'е', 'Е'],
  KeyY: ['y', 'Y', 'н', 'Н'],
  KeyU: ['u', 'U', 'г', 'Г'],
  KeyI: ['i', 'I', 'ш', 'Ш'],
  KeyO: ['o', 'O', 'щ', 'Щ'],
  KeyP: ['p', 'P', 'з', 'З'],
  BracketLeft: ['[', '{', 'х', 'Х'],
  BracketRight: [']', '}', 'ъ', 'Ъ'],
  Backslash: ['\\', '|', '\\', '|'],
  CapsLock: ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
  KeyA: ['a', 'A', 'ф', 'Ф'],
  KeyS: ['s', 'S', 'ы', 'Ы'],
  KeyD: ['d', 'D', 'в', 'В'],
  KeyF: ['f', 'F', 'а', 'А'],
  KeyG: ['g', 'G', 'п', 'П'],
  KeyH: ['h', 'H', 'р', 'Р'],
  KeyJ: ['j', 'J', 'о', 'О'],
  KeyK: ['k', 'k', 'л', 'Л'],
  KeyL: ['l', 'l', 'д', 'Д'],
  Semicolon: [';', ':', 'ж', 'Ж'],
  Quote: ['\'', '"', 'э', 'Э'],
  Enter: ['Enter', 'Enter', 'Enter', 'Enter'],
  ShiftLeft: ['Shift', 'Shift', 'Shift', 'Shift'],
  KeyZ: ['z', 'Z', 'я', 'Я'],
  KeyX: ['x', 'X', 'ч', 'Ч'],
  KeyC: ['c', 'C', 'с', 'С'],
  KeyV: ['v', 'V', 'м', 'М'],
  KeyB: ['b', 'B', 'и', 'И'],
  KeyN: ['n', 'N', 'т', 'Т'],
  KeyM: ['m', 'M', 'ь', 'Ь'],
  Comma: [',', '<', 'б', 'Б'],
  Period: ['.', '>', 'ю', 'Ю'],
  Slash: ['/', '?', '.', ''],
  ArrowUp: ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp'],
  ShiftRight: ['Shift', 'Shift', 'Shift', 'Shift'],
  ControlLeft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  Meta: ['Win', 'Win', 'Win', 'Win'],
  AltLeft: ['Alt', 'Alt', 'Alt', 'Alt'],
  Space: ['Space', 'Space', 'Space', 'Space'],
  ArrowLeft: ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft'],
  ArrowDown: ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown'],
  ArrowRight: ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight'],
  ControlRight: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
};

let langKeyboard = 'EN';
let sizeLetter = 'small';

window.addEventListener('unload', () => {
  localStorage.setItem('langKey', langKeyboard);
});

window.addEventListener('load', () => {
  const lang = localStorage.getItem('langKey') || 'EN';
  langKeyboard = lang;
  if (langKeyboard === 'EN') {
    createKeyboardLines(KEYBOARD_EN);
  } else {
    createKeyboardLines(KEYBOARD_RU);
  }
});

createPage();

function addInteractiveForButton(e) {
  if (e.target.classList.contains('button')) {
    if (e.target.innerText !== 'CapsLock') {
      e.target.classList.add('button_active');
    } else {
      e.target.classList.toggle('button_active');
    }
  }
}

function changeSizeButtonInKeyboard(btnText) {
  let alphabet = '';
  if (langKeyboard === 'EN') {
    if (sizeLetter === 'small') {
      alphabet = KEYBOARD_EN_SHIFT;
    } else {
      alphabet = KEYBOARD_EN;
    }
  } else if (sizeLetter === 'small') {
    alphabet = KEYBOARD_RU_SHIFT;
  } else {
    alphabet = KEYBOARD_RU;
  }

  if (sizeLetter === 'small') {
    sizeLetter = 'big';
  } else {
    sizeLetter = 'small';
  }

  createKeyboardLines(alphabet, btnText, sizeLetter);
}

function removeInteractiveForButton(e) {
  if (e.target.classList.contains('button') && e.target.innerText !== 'CapsLock') {
    e.target.classList.remove('button_active');
  }

  if (e.target.innerText === 'Shift') {
    changeSizeButtonInKeyboard(e.target.innerText);
  }
}

function addLetterInTextareaField(letter) {
  const TEXTAREA = document.querySelector('.textarea');
  let content = TEXTAREA.value;
  let addSymbolInTextarea = '';

  if (letter === 'Tab') {
    addSymbolInTextarea = '    ';
  } else if (letter === 'Backspace') {
    content = content.slice(0, content.length - 1);
  } else if (letter === 'CapsLock') {
    changeSizeButtonInKeyboard(letter);
  } else if (letter === 'Control'
                || letter === 'Meta'
                || letter === 'Alt') {
    // comment empty

  } else if (letter === 'Enter') {
    addSymbolInTextarea = '\r\n';
    // change Big or Small Letters
  } else if (letter === 'Shift') {
    changeSizeButtonInKeyboard(letter);
    // change Big or Small Letters
  } else if (letter === 'Ctrl') {
    // change Big or Small Letters
  } else if (letter === 'ArrowUp') {
    addSymbolInTextarea = '\u25B2';
  } else if (letter === 'ArrowDown') {
    addSymbolInTextarea = '\u25BC';
  } else if (letter === 'ArrowLeft') {
    addSymbolInTextarea = '\u25C0';
  } else if (letter === 'ArrowRight') {
    addSymbolInTextarea = '\u25B6';
  } else if (letter === 'Win') {
    // change Big or Small Letters
  } else if (letter === 'Space') {
    addSymbolInTextarea = ' ';
  } else if (letter === 'Del') {
    deleteNextLetter();
  } else {
    addSymbolInTextarea = letter;
  }

  TEXTAREA.value = content + addSymbolInTextarea;
}

const KEYBOARD = document.querySelector('.keyboard');

KEYBOARD.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('button')) {
    const KEYBOARDS = document.querySelectorAll('.button');
    KEYBOARDS.forEach((item) => {
      if (item.innerText !== 'CapsLock') {
        item.classList.remove('button_active');
      }
    });

    addInteractiveForButton(e);
    addLetterInTextareaField(e.target.innerText);
  }
});

KEYBOARD.addEventListener('mouseup', (e) => {
  const targetContent = e.target.innerText;

  if (targetContent !== 'CapsLock') {
    removeInteractiveForButton(e);
  }

  if (targetContent === 'Shift' && e.target.classList.contains('button_active')) {
    changeSizeButtonInKeyboard(targetContent);
  }
});

// keyboard event
const changeLanguage = ['Shift', 'Alt'];
const pressed = new Set();

function addInteractiveAfterKeyboardPress(button) {
  document.querySelector('.textarea').blur();
  let temp = button;

  if (button === 'Meta') {
    temp = 'Win';
  } else if (button === ' ') {
    temp = 'Space';
  } else if (button === 'ArrowLeft') {
    temp = '\u25C0';
  } else if (button === 'ArrowUp') {
    temp = '\u25B2';
  } else if (button === 'ArrowDown') {
    temp = '\u25BC';
  } else if (button === 'ArrowRight') {
    temp = '\u25B6';
  }

  const BUTTONS_ON_VIRTUAL_KEYBOARD = document.querySelectorAll('.button');

  BUTTONS_ON_VIRTUAL_KEYBOARD.forEach((item) => {
    if (item.innerText !== 'CapsLock') {
      item.classList.remove('button_active');
    }
    if (item.innerText === temp) {
      if (button === 'CapsLock') {
        item.classList.toggle('button_active');
      } else {
        item.classList.add('button_active');
      }
    }
  });
}

function removeInteractiveAfterKeyboardPress(button) {
  let temp = button;

  if (button === 'Meta') {
    temp = 'Win';
  } else if (button === ' ') {
    temp = 'Space';
  } else if (button === 'ArrowLeft') {
    temp = '\u25C0';
  } else if (button === 'ArrowUp') {
    temp = '\u25B2';
  } else if (button === 'ArrowDown') {
    temp = '\u25BC';
  } else if (button === 'ArrowRight') {
    temp = '\u25B6';
  }

  const BUTTONS_ON_VIRTUAL_KEYBOARD = document.querySelectorAll('.button');

  BUTTONS_ON_VIRTUAL_KEYBOARD.forEach((item) => {
    if (item.innerText === temp) {
      item.classList.remove('button_active');
    }
  });
}

function checkChangeLanguage() {
  for (let i = 0; i < changeLanguage.length; i += 1) {
    if (!pressed.has(changeLanguage[i])) {
      return;
    }
  }

  if (langKeyboard === 'EN') {
    langKeyboard = 'RU';
  } else {
    langKeyboard = 'EN';
  }
}

document.addEventListener('keydown', (e) => {
  pressed.add(e.key);

  let index;

  if (sizeLetter === 'big') {
    if (langKeyboard === 'EN') {
      index = 1;
    } else {
      index = 3;
    }
  }

  if (sizeLetter === 'small') {
    if (langKeyboard === 'EN') {
      index = 0;
    } else {
      index = 2;
    }
  }

  addInteractiveAfterKeyboardPress(BUTTONS[e.code][index]);
  addLetterInTextareaField(BUTTONS[e.code][index], 'keyboard');

  checkChangeLanguage();
});

document.addEventListener('keyup', (e) => {
  const btn = e.key === 'Control' ? 'Ctrl' : e.key;

  let index;

  if (sizeLetter === 'big') {
    if (langKeyboard === 'EN') {
      index = 1;
    } else {
      index = 3;
    }
  }

  if (sizeLetter === 'small') {
    if (langKeyboard === 'EN') {
      index = 0;
    } else {
      index = 2;
    }
  }

  if (btn !== 'CapsLock') {
    removeInteractiveAfterKeyboardPress(BUTTONS[e.code][index]);
  }

  if (btn === 'Shift') {
    changeSizeButtonInKeyboard(BUTTONS[e.code][index]);
  }

  pressed.delete(e.key);
});

export default { sizeLetter };
