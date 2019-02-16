const Post = require('../models/post')
const User = require('../models/user')

exports.index = (req, res, err) => {
  Post
    .find({})
    .populate('user')
    //.populate('comments')
    //.populate('likes')
    .sort({
      createdAt: -1
    })
    .exec(function (err, posts) {
      if (err) {
        return res.status(422).json(err)
      }

      return res.status(200).json(posts)
    })
}

exports.store = (req, res, err) => {
  const post = {
    user: req.user._id,
    post: req.body.post,
    createdAt: new Date()
  }

  Post.create(post).then(post => {
    User.updateOne({
      _id: req.user._id
    }, {
      $push: {
        posts: post
      }
    }, (err) => {
      console.log(err)
    })
    return res.status(201).json({
      message: 'Post created.',
      post: post
    })
  }).catch(err => {
    res.status(422).json({
      message: 'Could not create post.'
    })
  })
}