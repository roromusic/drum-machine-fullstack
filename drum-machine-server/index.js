const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8081

app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});