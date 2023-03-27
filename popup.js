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
    let str = `<strike><i><font color="#d7d7d7">${init[i]}</font></i></strike> ⟶ <b>${replW[i]}</b>`;
    lines.push(str);
  }

  let element = document.getElementById(htmlEl);
  element.innerHTML = lines.join('<br>');
}

//TODO: Deletion
//TODO: Check if one word is part of another
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
      // if user input already exists
      alreadyExists.style.opacity = '85%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
    } else if (replaceInput == '') {
      // if user input is empty
      empty.style.opacity = '85%';
      alreadyExists.style.opacity = '0%';
      tooLong.style.opacity = '0%';
    } else if (replaceInput.length > 30) {
      // if user input is longer than 30 characters
      tooLong.style.opacity = '85%';
      empty.style.opacity = '0%';
      alreadyExists.style.opacity = '0%';
    } else {
      // if everything is OK
      initial.push(replaceInput);
      replaceWith.push(withInput);
      alreadyExists.style.opacity = '0%';
      empty.style.opacity = '0%';
      tooLong.style.opacity = '0%';
      document.querySelector('#replace').value = '';
      document.querySelector('#with').value = '';
      addToUserList(initial, replaceWith, 'pair');
      wordsSync();
    }
  });
}, 400);
