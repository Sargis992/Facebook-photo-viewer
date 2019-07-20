const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/facebook-photos'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'./dist/facebook-photos/index.html' ))
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});
