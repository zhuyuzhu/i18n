const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, './src')));

app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, './src/index.html'), function(err, data){
        if(err){
            console.log(err);
            return res.status(404).end('cant find this file')
        }
        res.status(200).end(data);
    })
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})