// implement your posts router here
const { Router } = require('express');
const Adapter = require('./posts-model');
const router = Router()



router.get('/',async (req, res) => {
    try {
        const findPosts = await Adapter.find()
        return res.status(200).json(findPosts);
    } catch (err) {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    }
});



router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params
        const data = await Adapter.findById(req.params.id);
        if(!data)  {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
        res.status(200).json(data);
       
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});


module.exports = router
