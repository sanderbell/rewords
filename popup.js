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
  document.querySelector('#the-form').addEventListener('submit', function (e) {
    e.preventDefault();
    replaceInput = document.querySelector('#replace').value.trim();
    withInput = document.querySelector('#with').value.trim();

    const alreadyExists = document.querySelector('#already-exists');
    const empty = document.querySelector('#empty');
    const tooLong = document.querySelector('#too-long');

    if (initial.includes(replaceInput)) {
      alreadyExists.style.opacity = '85%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
    } else if (replaceInput == '') {
      empty.style.opacity = '85%';
      alreadyExists.style.opacity = '0%';
      tooLong.style.opacity = '0%';
    } else if (replaceInput.length > 30) {
      tooLong.style.opacity = '85%';
      empty.style.opacity = '0%';
      alreadyExists.style.opacity = '0%';
    } else {
      initial.push(replaceInput);
      replaceWith.push(withInput);
      alreadyExists.style.opacity = '0%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
      document.querySelector('#replace').value = '';
      document.querySelector('#with').value = '';
      wordsSync();
    }
  });
}, 500);

// One function to sync words
