'use strict';

let initial, replaceWith, replaceInput, withInput;

chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);

  if (allItems.length == 0) {
    initial = [];
    replaceWith = [];
  } else {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
  }
});

try {
  document
    .getElementById('the-form')
    .addEventListener('submit', function (event) {
      // event.preventDefault();
      replaceInput = document.querySelector('#replace').value;
      withInput = document.querySelector('#with').value;
      initial.push(replaceInput);
      replaceWith.push(withInput);
      chrome.storage.sync.set({ initial: initial, replaceWith: replaceWith });
      console.log(
        `userSpecified is updated! Words being replaced: ${initial}. Substitutions:  ${replaceWith}`
      );
    });
} catch (error) {
  console.log(error);
}

const converter = (element) => {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(converter);
  }
  if ((element.nodeType === Text.TEXT_NODE) & (initial.length > 0)) {
    for (let i = 0; i < initial.length; i++) {
      rgx = new RegExp(`${initial[i]}`);
      if (element.textContent.match(rgx)) {
        element.textContent = element.textContent.replace(
          initial[i],
          replaceWith[i]
        );
      }
    }
  }
};

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

setTimeout(() => {
  converter(document.head);
  converter(document.body);
  refresher.observe(document.body, { childList: true, subtree: true });
  console.log(initial, replaceWith);
}, 50);
