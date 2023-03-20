let allItems,
  keyItems,
  valueItems,
  initial,
  replaceWith,
  replaceInput,
  withInput;

//TODO: Check whether initial input already exists
//TODO: Do not accept empty
//TODO: Set limits
//TODO: Add into the list
//TODO: Deletion

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
    console.log('Launched for the first time');
  } else {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
    wordsSync();
    console.log('Launched NOT for the first time');
  }
});

//TODO: Convert to async to wait instead of setTimeout
setTimeout(() => {
  document.getElementById('the-form').addEventListener('submit', function () {
    replaceInput = document.querySelector('#replace').value.trim();
    withInput = document.querySelector('#with').value.trim();
    initial.push(replaceInput);
    replaceWith.push(withInput);
    wordsSync();
  });
}, 500);
