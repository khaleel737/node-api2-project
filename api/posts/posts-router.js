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
        const { id } = req.params
        const data = await Adapter.findById(id);
        if(!data)  {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
        res.status(200).json(data);
       
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});

router.post('/', async (req, res) => {
    try {
        const {id} = {title: req.body.title,
                        contents: req.body.contents}

        console.log(req.body);
        let {title, contents} = req.body;
        const insertPost = await Adapter.insert({ title, contents })
        res.status(201).json(insertPost)

            if(!title || !contents) {
                res.status(400).json({ message: "Please provide title and contents for the post" })
            }

    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

router.put('/:id', async (req, res) => {
    try {

        const { title, contents } = req.body
        const data = await Adapter.update(Number(req.params.id) ,{title, contents});
        if(req.params.id === null)  {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else if(title.length === 0 || contents.length === 0)  {
            res.status(400).json({ message: "Please provide title and contents for the post" });
        } 
        return res.status(200).json(data);
       
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});


router.delete('/:id', async (req, res) => {
    try {

        const { title, contents } = req.body
        const data = await Adapter.remove(Number(req.params.id) ,{title, contents});
        if(req.params.id === null)  {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        } else if(title.length === 0 || contents.length === 0)  {
            res.status(400).json({ message: "Please provide title and contents for the post" });
        } 
        return res.status(200).json(data);
       
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Adapter.findPostComments(id);
        if(!data)  {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
        res.status(200).json(data);
       
    } catch (err) {
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
});



module.exports = router
