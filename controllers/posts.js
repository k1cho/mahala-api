const Post = require('../models/post')
const User = require('../models/user')
const Like = require('../models/like')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dj7a0d88z',
  api_key: '225984538533363',
  api_secret: '14TrHwbq3N09XKqpq4rRJPp0H_M'
});


exports.index = (req, res, err) => {
  Post
    .find({})
    .populate('user')
    .populate('comments')
    .populate('likes')
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

exports.topPosts = (req, res, err) => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1)

  Post
    .find({
      totalLikes: {
        $gte: 2
      },
      createdAt: {
        $gte: date
      }
    })
    .populate('user')
    .populate('comments')
    .populate('likes')
    .sort({
      totalLikes: -1,
    })
    .exec(function (err, posts) {
      if (err) {
        return res.status(422).json(err)
      }

      return res.status(200).json(posts)
    })
}

exports.findById = (req, res) => {
  Post
    .findById({
      '_id': req.params.id
    })
    .populate('user')
    .populate({
      path: 'comments',
      // Get user of comments - populate the 'user' array for every friend
      populate: {
        path: 'user'
      }
    })
    .populate('likes')
    .sort({
      createdAt: -1
    })
    .exec(function (err, post) {
      if (err) {
        return res.status(422).json(err)
      }

      return res.status(200).json(post)
    })
}

exports.store = (req, res, err) => {

  const post = {
    user: req.user._id,
    post: req.body.post,
    createdAt: new Date()
  }

  if (req.body.image) {
    cloudinary.uploader.upload(req.body.image, async (result) => {
      const reqBody = {
        user: req.user._id,
        post: req.body.post,
        imgId: result.public_id,
        imgVersion: result.version,
        createdAt: new Date()
      }

      await Post.create(reqBody).then(post => {
        User.updateOne({
          _id: req.user._id
        }, {
          $push: {
            posts: post
          }
        })

        return res.status(201).json({
          message: 'Post created.'
        })
      }).catch(() => {
        res.status(422).json({
          message: 'Could not create post.'
        })
      })
    })
  } else {
    Post.create(post).then(post => {
      User.updateOne({
        _id: req.user._id
      }, {
        $push: {
          posts: post
        }
      })

      return res.status(201).json({
        message: 'Post created.'
      })
    }).catch(() => {
      res.status(422).json({
        message: 'Could not create post.'
      })
    })
  }
}

exports.like = (req, res) => {
  const postId = req.body._id

  Like.findOne({
    post: postId,
    user: req.user._id
  }).then(like => {

    if (like != null) {
      return res.status(422).json({
        message: 'You can only like a Post once'
      })
    }

    Like.create({
      post: postId,
      user: req.user._id,
    }).then(like => {

      Post.updateOne({
        _id: postId,
        'likes.user': {
          $ne: req.user._id
        }
      }, {
        $push: {
          likes: like._id
        },
        $inc: {
          totalLikes: 1
        }
      }).then(() => {
        return res.status(201).json({
          message: 'Post liked.'
        })
      }).catch(err => console.log(err))

    }).catch(() => {
      return res.status(422).json({
        message: 'Could not like the post.'
      })
    })

  }).catch(err => console.log(err))
}