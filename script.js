const userSpecified = {
  initial: [],
  replaceWith: [],
};

console.log(`userSpecified declared`);

let theForm, initialList, replaceWithList, replaceInput, withInput;

document.getElementById('the-form').addEventListener('submit', function (event) {
  event.preventDefault();
  replaceInput = document.querySelector('#replace').value;
  withInput = document.querySelector('#with').value;
  userSpecified.initial.push(replaceInput);
  userSpecified.replaceWith.push(withInput);
  chrome.storage.sync.set({ userSpecified });
  console.log(`userSpecified is updated! Words being replaced: ${userSpecified.initial}. Substitutions:  ${userSpecified.replaceWith}`);
});

chrome.storage.sync.get('userSpecified', function (result) {
  if (userSpecified.initial & userSpecified.replaceWith) {
    initialList = result.userSpecified.initial;
    replaceWithList = result.userSpecified.replaceWith;
    console.log(
      `initialList and replaceWithList are updated: ${initialList} and ${replaceWithList}`
    );
  }
});

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
