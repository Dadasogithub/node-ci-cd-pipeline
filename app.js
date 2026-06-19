const express = require('express');

const app = express();

const password = "admin123"; // hardcoded secret

function test() {
  let unusedVariable = "hello";
  console.log("Testing SonarQube");
}

test();

app.get('/', (req, res) => {
    res.send('Hello from CI/CD Pipeline updated version');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});