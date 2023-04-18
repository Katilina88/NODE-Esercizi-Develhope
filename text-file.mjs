const fs = require('fs');

fs.writeFile("test-file.txt", "text-file", (err) => {
  if(err) throw err;
  console.log("file saved");
});
