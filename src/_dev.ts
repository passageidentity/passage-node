import passage from '.'

import express from 'express';
const app = express();
const port = 3000;

require('dotenv').config();

let passageConfig = {
    appID: process.env.APP_ID ? process.env.APP_ID : '',
}

app.get('/authentication', passage(passageConfig), (req, res) => {
    console.log(res.passage);
    res.send("This is an authenticated route!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});