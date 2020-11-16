const input = document.querySelector('textarea');
const lang = document.querySelector('input[name=lang]');
const output = document.querySelector('pre > code');
const pre = document.querySelector('pre');
const precontainer = document.querySelector('#precontainer');
const size = document.querySelector('input[name=size]');
const lightdark = document.querySelector('#lightdark');

restoreStorage();

input.addEventListener('input', doHighlight);
lang.addEventListener('change', doHighlight);
size.addEventListener('change', doHighlight);
lang.addEventListener('change', saveStorage);
size.addEventListener('change', saveStorage);
lightdark.addEventListener('input', saveStorage);

doHighlight();
input.select();

pre.addEventListener('click', doSelect);

function restoreStorage() {
  if (localStorage.lastHighlighterLanguage) {
    lang.value = localStorage.lastHighlighterLanguage;
  }

  if (localStorage.lastHighlighterSize) {
    size.value = localStorage.lastHighlighterSize;
  }

  if (localStorage.lastHighlighterLightdark) {
    lightdark.checked = localStorage.lastHighlighterLightdark === 'true';
  }
}

function saveStorage() {
  localStorage.lastHighlighterLanguage = lang.value;
  localStorage.lastHighlighterSize = size.value;
  localStorage.lastHighlighterLightdark = lightdark.checked;
}

function doHighlight() {
  output.textContent = input.value.trim() + '\n\u00a0';
  output.className = `language-${lang.value}`;
  Prism.highlightElement(output);
  precontainer.style.setProperty('--font-size', size.value + 'pt');
}

function doSelect() {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(output);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  setTimeout(() => input.select(), 300);
}
