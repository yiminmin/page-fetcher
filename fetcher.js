const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Request failed with status code:', response.statusCode);
    return;
  }

  fs.writeFile(filePath, body, (error) => {
    if (error) {
      console.error('Error saving file:', error);
      return;
    }

    const fileSize = Buffer.byteLength(body);
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});
