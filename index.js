const express = require('express');
const app = express();

app.get('/hello', function(req, res) {
    res.send('hello from index.js');
});
app.listen(3000);