// Global variables
let initial, replaceWith;

// Synchronize the initial and replaceWith arrays in Chrome storage
function wordsSync() {
  chrome.storage.sync.set({ initial, replaceWith });
}

// Add user-defined word pairs to the HTML element
function addToUserList(init, replW, htmlEl) {
  const lines = init.map(
    (word, i) =>
      `<strike><i><font color="#e8d5ff">${word}</font></i></strike> → <b>${replW[i]}</b> <button name="Remove this pair" class="remove">×</button>`
  );

  document.getElementById(htmlEl).innerHTML = lines.join('<br>');
}

// Initialize Chrome storage with initial and replaceWith arrays if not already present
chrome.storage.sync.get(null, (items) => {
  const keyItems = Object.keys(items);

  if (!keyItems.includes('initial')) {
    initial = [];
    replaceWith = [];
  } else {
    initial = items.initial;
    replaceWith = items.replaceWith;
  }

  wordsSync();
  addToUserList(initial, replaceWith, 'pair');
});

// Helper function to delay execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Event listeners
(async () => {
  await delay(400);
  document.querySelector('#the-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const replaceInput = document.querySelector('#replace').value.trim();
    const withInput = document.querySelector('#with').value.trim();
    const alreadyExists = document.querySelector('#already-exists');
    const empty = document.querySelector('#empty');
    const tooLong = document.querySelector('#too-long');
    const partOfReplacement = document.querySelector('#part-of-replacement');
    const inReplacements = document.querySelector('#in-replacements');

    // Input validation
    if (initial.includes(replaceInput)) {
      alreadyExists.style.opacity = '0.85';
    } else if (replaceInput === '') {
      empty.style.opacity = '0.85';
    } else if (replaceInput.length > 30) {
      tooLong.style.opacity = '0.85';
    } else if (replaceWith.includes(replaceInput)) {
      inReplacements.style.opacity = '0.85';
    } else if (replaceWith.some((word) => word.includes(replaceInput))) {
      console.log('partOfReplacement');
      partOfReplacement.style.opacity = '0.85';
    } else {
      initial.push(replaceInput);
      replaceWith.push(withInput);
      document.querySelector('#replace').value = '';
      document.querySelector('#with').value = '';
      addToUserList(initial, replaceWith, 'pair');
      wordsSync();
      location.reload();
    }
  });

  await delay(500);
  document.querySelector('#clear-all').addEventListener('click', () => {
    if (confirm('Do you want to delete all entries?')) {
      document.getElementById('pair').innerHTML = '';
      chrome.storage.sync.clear();
      location.reload();
    }
  });

  await delay(500);
  const allRemoveButtons = document.querySelectorAll('.remove');
  allRemoveButtons.forEach((removeButton, i) => {
    removeButton.addEventListener('click', () => {
      if (confirm('Do you want to delete this entry?')) {
        initial = initial.filter((e) => e !== initial[i]);
        replaceWith = replaceWith.filter((e) => e !== replaceWith[i]);
        wordsSync();
        location.reload();
      }
    });
  });
})();
