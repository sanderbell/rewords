let allItems, initial, replaceWith;

chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);
  initial = allItems[0][1];
  replaceWith = allItems[1][1];
});

const converter = (element) => {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(converter);
  }
  if ((element.nodeType === Text.TEXT_NODE) & (initial.length > 0)) {
    for (let i = 0; i < initial.length; i++) {
      rgx = new RegExp(`${initial[i]}`, 'gmi');
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
}, 150);
