let allItems,
  keyItems,
  valueItems,
  initial,
  replaceWith,
  replaceInput,
  withInput;

function wordsSync() {
  chrome.storage.sync.set({
    initial: initial,
    replaceWith: replaceWith,
  });
}

//TODO: Set limits
//TODO: Add into the list
//TODO: Deletion

// Creating entries in the storage on the first run
chrome.storage.sync.get(null, function (items) {
  allItems = Object.entries(items);
  keyItems = Object.keys(items);
  valueItems = Object.values(items);

  if (!keyItems.includes('initial')) {
    initial = [];
    replaceWith = [];
    wordsSync();
  } else {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];
    wordsSync();
  }
});
//TODO: Convert to async to wait instead of setTimeout?
setTimeout(() => {
  document.getElementById('the-form').addEventListener('submit', function (e) {
    e.preventDefault();
    replaceInput = document.querySelector('#replace').value.trim();
    withInput = document.querySelector('#with').value.trim();

    const tooltiptext = document.getElementById('tooltiptext');

    if (initial.includes(replaceInput)) {
      tooltiptext.style.visibility = 'visible';
      tooltiptext.style.opacity = '75%';
    } else {
      initial.push(replaceInput);
      replaceWith.push(withInput);
      tooltiptext.style.opacity = '0%';
      wordsSync();
      document.querySelector('#replace').value = '';
      document.querySelector('#with').value = '';
    }
  });
}, 500);

// One function to sync words
