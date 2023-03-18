let initial, replaceWith, initialList, replaceWithList, replaceInput, withInput;

chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);

  if (allItems.length > 0) {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
  } else {
    initial = [];
    replaceWith = [];
  }
  setTimeout(() => {
    console.log(initial, replaceWith);
  }, 1000);
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

// chrome.storage.sync.get('userSpecified', function (result) {
//   if (initial.length > 0) {
//     initialList = result.initial;
//     replaceWithList = result.replaceWith;
//     console.log(
//       `initialList and replaceWithList are updated: ${initialList} and ${replaceWithList}`
//     );
//   }
// });

const converter = (element) => {
  if (element.hasChildNodes()) {
    element.childNodes.forEach(converter);
  }
  if ((element.nodeType === Text.TEXT_NODE) & initialList) {
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
console.log('converter worked');
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
console.log('refresher worked');
