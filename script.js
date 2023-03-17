const userSpecified = {
  initial: [],
  replaceWith: [],
};

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();
  let replaceInput = document.querySelector('#replace').value;
  let withInput = document.querySelector('#with').value;
  userSpecified.initial.push(replaceInput);
  userSpecified.replaceWith.push(withInput);
  chrome.storage.sync.set({ userSpecified });
});

let initialList, replaceWithList;

chrome.storage.sync.get(['userSpecified'], function (result) {
  initialList = result.userSpecified.initial;
  replaceWithList = result.userSpecified.replaceWith;
});

const converter = (element) => {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(converter);
  }
  if (element.nodeType === Text.TEXT_NODE) {
    for (let i = 0; i < initialList.length; i++) {
      if (element.textContent.match(initialList[i])) {
        element.textContent = element.textContent.replace(
          initialList[i],
          replaceWithList[i]
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
