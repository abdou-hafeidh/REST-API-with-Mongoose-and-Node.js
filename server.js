const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const auth = require("./server/routes/auth");
app.use("/auth", auth);

const blog = require("./server/routes/blog");
app.use("/blog", blog);

const todo = require("./server/routes/todo");
app.use("/todo", todo);

const authpassport = require("./server/routes/authpassport");
app.use("/authpassport", authpassport);

app.listen(3000, err => {
    if (err) throw err;
    console.log("Ready in 3000...");
});