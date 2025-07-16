# 👥 User Management System (Node.js + Express + MySQL)

A full-stack user management CRUD application built using **Node.js**, **Express**, **MySQL**, and **EJS**. This project allows you to add, view, edit (with password authentication), and delete users with proper error handling and dynamic frontend rendering.

---

## 📌 Features

- ✅ Add new users with unique email & username
- 📋 View all users in a structured table
- ✏️ Edit usernames after password verification
- ❌ Delete users securely with password confirmation
- ⚠️ Error pages for duplicate entries and invalid actions
- 🔁 Fake user generator for testing (using `faker`)
- 🧾 Clean, server-rendered EJS templates

---

## 🛠️ Tech Stack

| Role         | Technology          |
|--------------|---------------------|
| Server       | Node.js, Express    |
| Database     | MySQL               |
| View Engine  | EJS                 |
| Utilities    | Faker, UUID, method-override |

---

## 🗃️ Database Schema

```sql
CREATE DATABASE test;

USE test;

CREATE TABLE user (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);
````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/isbahansariii/user-management-express-sql.git
cd user-management-express-sql
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure MySQL

Edit `index.js` to use your local MySQL credentials:

```js
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'test'
});
```

### 4. (Optional) Seed with 100 fake users

Uncomment the line in `index.js`:

```js
// insertValue();
```

Then run the app once to populate your database.

---

## ▶️ Run the App

```bash
nodemon index.js
```

Then open:

```
http://localhost:8080
```

---

## 📁 Folder Structure

```
.
├── views/                 # EJS Templates
│   ├── adduser.ejs
│   ├── auth.ejs
│   ├── edit.ejs
│   ├── error.ejs
│   ├── home.ejs
│   ├── showusers.ejs
│   ├── wrongpass_auth.ejs
│   └── wrongpass_edit.ejs
├── index.js               # Main server file
├── schema.sql             # SQL schema
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🧠 To Do / Future Enhancements

* 🔐 Hash passwords using `bcrypt`
* ✅ Add client-side form validation
* 🖼️ Enhance UI using Tailwind or Bootstrap
* 🌐 Deploy using Render or Vercel (backend with DB hosting)

---

## ✍️ Author

**Isbah Ansari**
🌐 [GitHub](https://github.com/isbahansariii)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

```