let initial, replaceWith, replaceInput, withInput;

chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);

  if (allItems.length > 0) {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
  } else {
    initial = [];
    replaceWith = [];
  }
});

document
  .getElementById('the-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    replaceInput = document.querySelector('#replace').value;
    withInput = document.querySelector('#with').value;
    initial.push(replaceInput);
    replaceWith.push(withInput);
    chrome.storage.sync.set({ initial: initial });
    chrome.storage.sync.set({ replaceWith: replaceWith });
    console.log(
      `userSpecified is updated! Words being replaced: ${initial}. Substitutions:  ${replaceWith}`
    );
  });

const converter = (element) => {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(converter);
  }
  if ((element.nodeType === Text.TEXT_NODE) & (initial.length > 0)) {
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
  console.log(initial);
}, 100);
