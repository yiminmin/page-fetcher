const request = require('request'); // Import the 'request' module for making HTTP requests
const fs = require('fs'); // Import the 'fs' module for file system operations
/**
 * node fetcher.js http://www.example.com/ ./index.html
  node -> process.argv[0]
  fetcher.js -> process.argv[1]
  url -> process.argv[2]
  filepath -> process.argv[3]
 */
const url = process.argv[2]; // Get the URL from the command line arguments
const filePath = process.argv[3]; // Get the file path from the command line arguments

request(url, (error, response, body) => {
  if (error) { // If there is an error in the request
    console.error('Error:', error); // Print the error message
    return; // Stop the execution of the code
  }

  if (response.statusCode !== 200) { // If the response status code is not 200 (OK)
    console.error('Request failed with status code:', response.statusCode); // Print the error message
    return; // Stop the execution of the code
  }

  fs.writeFile(filePath, body, (error) => { // Write the received response body to a file
    if (error) { // If there is an error in writing the file
      console.error('Error saving file:', error); // Print the error message
      return; // Stop the execution of the code
    }

    const fileSize = Buffer.byteLength(body); // Calculate the size of the downloaded content
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`); // Print the success message
  });
});
