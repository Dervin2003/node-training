const fs = require('fs');
const path = require('path');

// Define file path in the same directory
const filePath = path.join(__dirname, 'data.txt');

// ===== Write to the file =====
const contentToWrite = 'Hello from Node.js!';

// Write content to file (will create the file if it doesn't exist)
fs.writeFile(filePath, contentToWrite, (err) => {
  if (err) {
    return console.error('Error writing to file:', err);
  }

  console.log('File written successfully.');

  // ===== Read the file after writing =====
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.error('Error reading file:', err);
    }

    console.log('File content:', data);
  });
});
