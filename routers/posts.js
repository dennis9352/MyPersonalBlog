const { default: ObjectID } = require("bson-objectid");
const express = require("express");
const multer = require('multer');
const Posts = require("../schemas/posts")
const router = express.Router();
const fs = require('fs')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/static/')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+ '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.get("/list", async (req, res, next) => {
    try {
      const categories = await Posts.find({}, { _id : false, category : true })
      res.json({ categories : categories });
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.get("/posts", async (req, res, next) => {
    try {
        const { category } = req.query;
        const posts = await Posts.find({ category }).sort("-date");
        res.json({ posts : posts });
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  posts = await Posts.findOne({ _id : ObjectID(postId) });
  console.log(posts)
  res.json({ detail : posts });
});


router.delete('/delete/:postId', async (req,res) => {
  const { postId } = req.params;
  posts = await Posts.findOne({ _id : ObjectID(postId) });
  const path = `./public/static/${posts['img']}` 
  fs.unlink(path, (err) => {
    if (err){
      console.error(err)
      return
    }
  })
  await Posts.deleteOne({ _id : ObjectID(postId) });
  res.send({ result: 'success' });
})

router.put("/posts/:postId/edit", upload.single('img') ,async(req,res) => {
  const { postId } = req.params;
  const { title, subtitle, context, category, writer} = req.body;
  

  if (req.file === undefined){
    await Posts.updateOne({ _id : ObjectID(postId) }, {$set : { title, subtitle, context, category, writer} });
  }else{
    posts = await Posts.findOne({ _id : ObjectID(postId) });
    const path = `./public/static/${posts['img']}` 
    fs.unlink(path, (err) => {
      if (err){
        console.error(err)
        return
      }
    })
    const img = req.file.filename
    await Posts.updateOne({ _id : ObjectID(postId) }, {$set : { title, subtitle, context, category, writer, img } });
  }
  
  res.send ({ result : "success" });
});


router.post("/posts", upload.single('img') ,async(req,res) => {
  const { title, subtitle, context, category, date, writer, password } = req.body;
  if (req.file === undefined){
    await Posts.create({ title, subtitle, context, category, date, writer, password });
  }else{
    const img = req.file.filename
    await Posts.create({ title, subtitle, context, category, date, writer, password, img });
  }
    res.send ({ result : "success" });
});


module.exports = router;