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

function addToUserList(init, replW, htmlEl) {
  let lines = [];

  for (let i = 0; i < init.length; i++) {
    let str = `<strike><i><font color="#e8d5ff">${init[i]}</font></i></strike> → <b>${replW[i]}</b> <button name="Remove this pair" class="remove">×</button>`;
    lines.push(str);
  }

  let element = document.getElementById(htmlEl);
  element.innerHTML = lines.join('<br>');
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
  } else {
    initial = allItems[0][1];
    replaceWith = allItems[1][1];

    wordsSync();
    addToUserList(initial, replaceWith, 'pair');
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
      // if already exists
      alreadyExists.style.opacity = '85%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
      inReplacements.style.opacity = '0';
    } else if (replaceInput == '') {
      // if empty
      empty.style.opacity = '85%';
      alreadyExists.style.opacity = '0%';
      tooLong.style.opacity = '0%';
      inReplacements.style.opacity = '0';
    } else if (replaceInput.length > 30) {
      // if > 30 chars
      tooLong.style.opacity = '85%';
      empty.style.opacity = '0%';
      alreadyExists.style.opacity = '0%';
      inReplacements.style.opacity = '0%';
    } else if (replaceWith.includes(replaceInput)) {
      // if in replaceWith
      inReplacements.style.opacity = '85%';
      tooLong.style.opacity = '0%';
      empty.style.opacity = '0%';
      alreadyExists.style.opacity = '0%';
    } else {
      // if everything is OK

      initial.push(replaceInput);
      replaceWith.push(withInput);
      alreadyExists.style.opacity = '0%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
      inReplacements.style.opacity = '0%';
      document.querySelector('#replace').value = '';
      document.querySelector('#with').value = '';
      addToUserList(initial, replaceWith, 'pair');
      wordsSync();
      location.reload();
    }
    //TODO: Check if one word is part of another
  });
}, 400);

setTimeout(() => {
  document.querySelector('#clear-all').addEventListener('click', function () {
    if (confirm('Do you want to delete all entries?')) {
      document.getElementById('pair').innerHTML = '';
      chrome.storage.sync.clear();
      location.reload();
    }
  });
}, 500);

setTimeout(() => {
  allRemoveButtons = document.querySelectorAll('.remove');
  for (let i = 0; i < allRemoveButtons.length; i++) {
    const removeButton = allRemoveButtons[i];
    removeButton.addEventListener('click', function () {
      if (confirm('Do you want to delete this entry?')) {
        initial = initial.filter((e) => e !== initial[i]);
        replaceWith = replaceWith.filter((e) => e !== replaceWith[i]);
        wordsSync();
        location.reload();
      }
    });
  }
}, 500);
