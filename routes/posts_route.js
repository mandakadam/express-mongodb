const express = require('express');

const router = express.Router();
const Posts =  require('../models/post_model');

//Get All the Posts
router.get('/', async (req, resp) => {
    try{
        const allPosts = await Posts.find()
        resp.json(allPosts) 
    }
    catch(err){
        resp.json({message:err})
    }
})

//Add New Post
router.post('/', async (req, resp) => {
    const newItem = new Posts({
        name: req.body.name,
        content: req.body.content,
    })
    try{
        const savePost = await newItem.save()
        resp.json(savePost)
    }
    catch(err){
        resp.json({message:err})
    }
})

router.get('/:postId', async (req, resp) => {
    try{
        const singlePost = await Posts.findById(req.params.postId)
        resp.json(singlePost)
    }
    catch(err){
        resp.json({message: err})
    }
})

router.delete('/:postId', async (req, resp) =>{
    try{
        const removedPost = await Posts.deleteOne({_id: req.params.postId});
        resp.json(removedPost);
    }
    catch(err){
        resp.json({message: err})
    }
})
 
router.patch('/:postId', async (req, resp) =>{
    try{
        const updatedPost = await Posts.updateOne(
            { 
                _id: req.params.postId }, 
                {$set: { name: req.body.name }
            }
        );
        resp.json(updatedPost);
    }
    catch(err){
        resp.json({message: err})
    }
})
 


module.exports = router;