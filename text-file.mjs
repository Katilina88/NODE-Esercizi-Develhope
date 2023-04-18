const fs = require('fs');

fs.writeFile("text-file.txt", "text-file", (err) => {
  if(err) throw err;
  console.log("file saved");
});
