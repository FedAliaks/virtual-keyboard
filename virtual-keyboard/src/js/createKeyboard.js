import Button from './Button';

function createKeyboardLines(language, btnText, sizeLetter) {
  const KEYBOARD_SECTION = document.querySelector('.keyboard');
  KEYBOARD_SECTION.innerHTML = '';

  language.forEach((keyboardLine) => {
    const line = document.createElement('div');
    line.className = 'keyboard-line';
    keyboardLine.forEach((item) => {
      const btn = new Button(item, sizeLetter);
      const btnElement = btn.createButton(btnText);
      line.append(btnElement);
    });

    KEYBOARD_SECTION.appendChild(line);
  });
}

function deleteNextLetter() {
  const TEXTAREA = document.querySelector('.textarea');

  const stringInTextarea = TEXTAREA.value;
  const position = TEXTAREA.selectionStart;

  const content = stringInTextarea.slice(0, position) + stringInTextarea.slice(position + 1);
  TEXTAREA.value = content;
}

export { createKeyboardLines, deleteNextLetter };
