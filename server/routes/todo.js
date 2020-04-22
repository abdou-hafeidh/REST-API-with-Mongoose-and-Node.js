const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/tododb" , { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

const UserModel = mongoose.model('Users', userSchema);

router.post("/:id",async(req,res)=>{
    const result = await UserModel.updateOne({_id: req.params.id},{$addToSet:{todos:req.body}})
    res.send(result)
})


module.exports = router;