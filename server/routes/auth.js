const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/tododb", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

const UserModel = mongoose.model('Users', userSchema);


router.post("/login", async(req, res) => {
    const result = await UserModel.findOne({email: req.body.email}).exec();
    if(!result) res.status(401).send({message:'user not found'});
    if(!await bcrypt.compareSync(req.body.password, result.password)) res.status(401).send({message:'weong password'});
    const token = jwt.sign({data:result},'secret_key',{expiresIn:"24h"});
    res.send({message:'OK', token: token});
});


router.post("/register", async (req, res) => {
    // const user = new UserModel(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    const result = await UserModel.create(req.body).then().catch();
    // const result = user.save();
    res.send(result);
}); 


module.exports = router;