/* Description: A simple profanity filter that censors inappropriate words in a given text.
This will be used to censor any not-Calvin-appropriate words in comments.
The censorText function reads a list of inappropriate words from a file and censors them in a given text.
The escapeRegExp function escapes special characters in a string for use in a regular expression.
The censorText function uses the escapeRegExp function to create a regular expression for each inappropriate word.
The censorText function replaces all occurrences of the inappropriate words with asterisks for every character in the bad word.

inappropriate.txt mostly gotten from http://www.bannedwordlist.com/lists/swearWords.txt
This is not a 100% accurate filter, if someone finds a creative way to break the filter, it is what it is, though we are trying our best to make it as robust as possible. */

const fs = require('fs');
const path = require('path');

// /node_modules/expo-router/node/inappropriate.txt'
const inappropriateWords = fs.readFileSync(path.join(__dirname, "inappropriate.txt"), 'utf-8').split('\n').map(word => word.trim());

// Toggle this to print all inappropriate words to verify they are read correctly (green text)
// console.log('Inappropriate Words:', inappropriateWords);

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters
}

// Function to censor inappropriate words in a given text
// eslint-disable-next-line
function censorText(text) {
    let censoredText = text;
    inappropriateWords.forEach(word => {
        const escapedWord = escapeRegExp(word);
        // Subsitutions for alternate characters in inappropriate words contained in a dictionary
        const substitutions = {
            'i': '[i!1|]',
            's': '[s$5]',
            'a': '[a@4]',
            'e': '[e3]',
            'o': '[o0]',
            't': '[t7]'
        };

        let pattern = escapedWord.split('').map(char => substitutions[char.toLowerCase()] || char).join('[\\s-._]*');
        const regex = new RegExp(pattern, 'gi');
        censoredText = censoredText.replace(regex, '*'.repeat(word.length));
    });
    return censoredText;
}

module.exports = { censorText };

/* // Manually testing censorText() function
const inputText = "The chicken tasted like ass!";
const censoredText = censorText(inputText);
console.log(censoredText);

const inputText2 = "Shut the f.u.c.k. up!.";
const censoredText2 = censorText(inputText2);
console.log(censoredText2);

const inputText3 = "You're a bit-ch!";
const censoredText3 = censorText(inputText3);
console.log(censoredText3);

const inputText4 = "This is bull$h!t!";
const censoredText4 = censorText(inputText4);
console.log(censoredText4);

const inputText5 = "This pizza FUCKING sucks!"
const censoredText5 = censorText(inputText5);
console.log(censoredText5);

const inputText6 = "You're such a $lu7!"
const censoredText6 = censorText(inputText6);
console.log(censoredText6);

const inputText7 = "The chicken is ass and it tasted like shit fuck fuck fuck!"
const censoredText7 = censorText(inputText7);
console.log(censoredText7); */

/* // Interactive tester. Be an immature child when you play with this hahaha
const readUserInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    readUserInput.question('Enter a message to censor (or type "exit" to quit): ', (input) => {
        if (input.toLowerCase() === 'exit') {
            readUserInput.close();
        } else {
            const censoredMessage = censorText(input);
            console.log('Censored Message:', censoredMessage);
            promptUser();
        }
    });
}

promptUser(); 
// End of interactive tester */
