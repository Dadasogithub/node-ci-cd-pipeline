const express = require('express');

const app = express();



function test() {
  let unusedVariable = "hello";
  console.log(`Testing SonarQube ${unusedVariable}`);
}

test();


app.get('/', (req, res) => {
    res.send('All pipeline is automated successfully! Yes Yes! This is a CICD pipeline for Node.js application using Jenkins, Docker, and SonarQube.    ');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});