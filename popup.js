let allItems,
  keyItems,
  valueItems,
  initial,
  replaceWith,
  replaceInput,
  withInput;

// One function to sync words
function wordsSync() {
  chrome.storage.sync.set({
    initial: initial,
    replaceWith: replaceWith,
  });
}

// Creating entries in the storage on the first run
chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);
  keyItems = Object.keys(items);
  valueItems = Object.values(items);

  if (!keyItems.includes('initial')) {
    initial = [];
    replaceWith = [];
    wordsSync();
    console.log('Has been launched for the first time');
  } else {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
    wordsSync();
    console.log('Has been launched NOT for the first time');
  }
});

setTimeout(() => {
  document
    .getElementById('the-form')
    .addEventListener('submit', function () {
      replaceInput = document.querySelector('#replace').value;
      withInput = document.querySelector('#with').value;
      initial.push(replaceInput);
      replaceWith.push(withInput);
      wordsSync();
    });
}, 500);
