let initial = [];
let replaceWith = [];

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  let replaceInput = document.querySelector('#replace').value;
  let withInput = document.querySelector('#with').value;
  chrome.storage.sync.set({ replaceInput: replaceInput, withInput: withInput });
});

const converter = (element) => {
  if (element.hasChildNodes) {
    element.childNodes.forEach(converter);
  }
  if (element.nodeType === Text.TEXT_NODE) {
    for (let i = 0; i < initial.length; i++) {
      if (element.textContent.match(initial[i])) {
        element.textContent = element.textContent.replace(
          initial[i],
          replaceWith[i]
        );
      }
    }
  }
};

converter(document.head);
converter(document.body);

// Applies converter() to every newly-emerged DOM-element
const refresher = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          converter(node);
        }
      });
    }
  }
});

refresher.observe(document.body, { childList: true, subtree: true });
