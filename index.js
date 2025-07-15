const { faker } = require('@faker-js/faker');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// middle wears
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("view", path.join(__dirname, "view"));

// faker to generate fake data
createRandomUser = ()=>{
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}

app.listen(port, ()=>{
    console.log(`App is listening to port: ${port}`);
});