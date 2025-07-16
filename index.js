const { faker } = require('@faker-js/faker');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// -----------------------------------middle wears---------------------------------------
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----------------------faker to generate fake data---------------------------------
createRandomUser = ()=>{
  return [
    faker.string.uuid(),
    faker.internet.username(), 
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// ------------------------connecting server with mysql DB----------------------------
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: "XyzAbc@123."
});

// ------------------------inserting 100 values into the DB-------------------------
const insertValue = ()=>{
    let q = "INSERT INTO user (id, username, email, password) VALUES ?";
    let users = [];
    for (i=1; i<=100; i++){
        users.push(createRandomUser())
    }
    
    connection.query(q, [users], (err, result)=>{
        // we are not using try-catching as connection.querry is an asynchronous task
        if(err) console.log(err);
        else console.log(result);
    })
}
// insertValue()

// ------------------------------------------home page------------------------------------
app.get("/", (req, res)=>{
    
    let q = "SELECT COUNT(*) FROM user";
    connection.query(q, (err, result)=>{
        if(err) {
            console.log(err);
            let error = err.message;
            res.render("error.ejs", error);
        }
        else {
            let userCount = result[0]["COUNT(*)"];
            res.render("home.ejs", {userCount});
        }
    })
})

// -------------------------------all user page----------------------------------
app.get("/user", (req, res)=>{
    let q = "SELECT * FROM user ORDER BY username ASC";
    connection.query(q, (err, users)=>{
        if(err) {
            console.log(err);
            let error = err.message;
            res.render("error.ejs", error);
        }
        else{
            res.render("showusers.ejs", {users})
        }
    })
})

// ---------------------------ADD NEW USER----------------------------
// from to add
app.get("/user/add", (req, res)=>{
    res.render("adduser.ejs");
})

// add user
app.post("/user", (req, res)=>{
    let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
    let {password, email, username} = req.body;
    let user = [faker.string.uuid(), username, email, password];
    
    connection.query(q, user, (err, result)=>{
        if(err) {
            console.log(err);
            let error = err.message;
            res.render("error.ejs", {error});
        }
        else{
            res.redirect("/user");
        }
    })
})

// ------------------------------EDIT USERNAME------------------------
// edit user from with auth
app.get("/user/:id", (req, res)=>{
    let {id} = req.params;
    let q = "SELECT * FROM user WHERE id = ? ";

    connection.query(q, id, (err, result)=>{
        if(err) {
            console.log(err);
            let error = err.message;
            res.render("error.ejs", {error});
        }
        else{
            let user = result[0];
            res.render("edit.ejs", {user});
        }
    })
})

// update user
app.patch("/user/:id", (req, res)=>{
    let {password: formPass, username: formUser} = req.body;
    let {id} = req.params;

    let q = "SELECT * FROM user WHERE id = ?";
    connection.query(q, id, (err, result)=>{
        if(err){
            console.log(err);
            let error = err.message;
            res.render("error.ejs", {error});
        }
        let user = result[0];

        // auth
        if(formPass != user.password) res.render("wrongpass_edit.ejs", {user});
        else{
            let q = `UPDATE user SET username='${formUser}' WHERE id = ?`;
            connection.query(q, id, (err, result)=>{
                if (err){
                    console.log(err)
                    let error = err.message;
                    res.render("error.ejs", {error});
                }
                else res.redirect("/user");
            })
        }
    })
})

// ---------------------------DELETE USER----------------------------
// authentication user from
app.get("/user/:id/auth", (req, res)=>{
    let {id} = req.params;
    let q = "SELECT * FROM user WHERE id = ? ";

    connection.query(q, id, (err, result)=>{
        if(err) {
            console.log(err);
            let error = err.message;
            res.render("error.ejs", {error});
        }
        else{
            let user = result[0];
            res.render("auth.ejs", {user})
        }
    })
})

// delete user
app.delete("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {password, email} = req.body;
    let q = "SELECT * FROM user WHERE id = ? ";

    connection.query(q, id, (err, result)=>{
        if (err) {
           console.log(err);
           let error = err.message;
           res.render("error.ejs", {error}); 
        }
        else{
            let user = result[0];
            // auth checking
            if((password!=user.password) || (email!=user.email)) res.render("wrongpass_auth.ejs", {user});
            else{
                let q = "DELETE FROM user WHERE id = ?"
                connection.query(q, id, (err, result)=>{
                    if(err) {
                        console.log(err);
                        let error = err.message;
                        res.render("error.ejs", {error});
                    }
                    else{
                        res.redirect("/user");
                    }
                })
            }
        }
    })
})

// --------------------------------starting server---------------------
app.listen(port, ()=>{
    console.log(`App is listening to port: ${port}`);
});