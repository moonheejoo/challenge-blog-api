const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {BlogPosts} = require('./models');
const jsonParser = bodyParser.json();

BlogPosts.create('Title 1', 'Today I went for a run and it was glorious');
BlogPosts.create('Title 2', 'Today I went to a coffee shop');
BlogPosts.create('Title 3', 'Today I walked my dog but he is a very disobedient dog');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['id', 'title', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.id, req.body.title, req.body.content);
  res.status(201).json(item);
});


router.put('/:id', jsonParser, (req, res) => {
  console.log("put working");
  const requiredFields = ['id', 'title', 'content'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  res.status(204).end();
});



router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;
