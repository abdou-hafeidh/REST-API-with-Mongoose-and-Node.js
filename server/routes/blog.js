const router = require("express").Router();
const mongoose = require("mongoose");
const articleSchema = require("../models/article");
const commentSchema = require("../models/comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/blog" , { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const articleModel = mongoose.model('article', articleSchema);
const commentModel = mongoose.model('comment', commentSchema);

router.post("/article", async (req, res) => {
    const result = await articleModel.create(req.body).then().catch();
    res.send(result);
});

router.get("/article", async (req, res) => {
    const result = await articleModel.find().populate({path:"author"}).populate({path:"comments"});
    res.send(result);
});

router.get("/search/:id", async (req, res) => {
    const result = await articleModel.findById(req.params.id).populate({path:"author"}).populate({path:"comments"});
    res.send(result);
});

router.post("/comment/:idArticle", async(req,res)=>{
    const resultcom = await commentModel.create(req.body);
    const result = await articleModel.findByIdAndUpdate(req.params.idArticle, {$addToSet:{comments:resultcom._id}})
    res.send(result)
});

router.post("/likes/:idArticle/:idUser", async(req,res)=>{
    const result = await articleModel.findByIdAndUpdate(req.params.idArticle, {$addToSet:{likes: req.params.idUser}})
    res.send(result);
});


module.exports = router;