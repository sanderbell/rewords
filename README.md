# Rewords

## Overview

*Re*words is a Chrome extension that allows you to define word pairs and automatically replace specified words while browsing the web. It offers a simple and intuitive user interface to manage your word replacements, ensuring a seamless and customized browsing experience.

## Features

### 1. User-Defined Word Pairs

*Re*words enables you to add your own word pairs, specifying words to be replaced and their corresponding replacements. The extension maintains an organized list of your custom word pairs, making it easy to manage and update them as needed.

### 2. On-the-Fly Word Replacement

Once you've defined your word pairs, *Re*words takes effect in real-time as you browse the web. The extension automatically replaces occurrences of the defined words with their corresponding replacements within the content of web pages.

### 3. Dynamic DOM Element Handling

*Re*words intelligently handles dynamically loaded content by using a MutationObserver to detect and apply word replacements to newly-added elements on web pages. This ensures that replaced words are consistently updated even when new content is loaded asynchronously.

### 4. User-Friendly Options Page

The extension provides a user-friendly options page where you can easily add, edit, and delete word pairs. The interface is designed to be intuitive, allowing you to manage your replacements effortlessly.

### 5. Validation and Error Handling

*Re*words incorporates input validation to ensure that your word pairs are well-formed and avoids any conflicts or errors in the replacement process. It provides helpful error messages when input data is invalid, making it easier for you to correct any mistakes.

### 6. Data Synchronization

Your word pairs are automatically synchronized across devices using Chrome storage. This means that your customized word replacements will be available whenever you sign in to Chrome from any device.

## How to Use

1. Click on the *Re*words icon in the Chrome toolbar to open the extension popup.

2. In the popup, you will see a list of your existing word pairs, if any.

3. To add a new word pair, enter the word you want to replace in the "Replace" input field and the corresponding replacement word in the "With" input field. Then click the "Add" button.

4. If there are any errors in your input (e.g., duplicate word pairs, empty fields, or replacements exceeding 30 characters), appropriate error messages will be displayed, and the word pair will not be added until the issues are resolved.

5. Existing word pairs are displayed with the original word struck through and highlighted in purple, along with the replacement word in bold. You can also remove any word pair by clicking the "Remove" button next to it.

6. To clear all your word pairs, click the "Clear All" button. A confirmation dialog will ensure you don't delete them accidentally.

7. As you browse the web, *Re*words automatically replaces the defined words with their corresponding replacements in real-time.

## Installation

1. Clone or download this repository to your local machine.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Turn on "Developer mode" (located in the top right corner).

4. Click on "Load unpacked" and select the directory where you cloned/downloaded the extension.

5. The *Re*words extension will be added to Chrome, and you'll see its icon in the toolbar.

## Contributions and Bug Reporting

We welcome contributions to this project! If you find any bugs or have ideas for improvements, please submit an issue on the [GitHub repository](https://github.com/sanderbell/rewords) or feel free to create a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

---

Thank you for using *Re*words! We hope this extension makes your browsing experience funnier. If you have any questions or feedback, please don't hesitate to contact us. Happy browsing!