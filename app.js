const express = require('express');

const app = express();



function test() {
  let unusedVariable = "hello";
  console.log(`Testing SonarQube ${unusedVariable}`);
}

test();


app.get('/', (req, res) => {
    res.send('All pipeline is automated successfully!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});