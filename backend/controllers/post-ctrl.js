const Post = require("../models/Post-models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;
  Post.addPost(res.locals.userId, req.body.description, image)
    .then(() => res.status(200).json("Post ajouté"))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.getAllPosts()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.getOnePost(req.params.post_id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllMyPosts = (req, res, next) => {
  Post.getAllMyPosts(req.params.id)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.getOnePost(req.params.post_id).then((post) => {
    if (post.image_url != null) {
      const filename = post.image_url.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        if (res.locals.acces == 0) {
          Post.deletePost(req.params.post_id, res.locals.userId)
            .then(() => res.status(200).json("Post supprimé"))
            .catch((error) => res.status(400).json({ error }));
        } else if (res.locals.acces == 1) {
          Post.deletePostMod(req.params.post_id)
            .then(() => res.status(200).json("Post supprimé"))
            .catch((error) => res.status(400).json({ error }));
        }
      });
    } else {
      if (res.locals.acces == 0) {
        Post.deletePost(req.params.post_id, res.locals.userId)
          .then(() => res.status(200).json("Post supprimé"))
          .catch((error) => res.status(400).json({ error }));
      } else if (res.locals.acces == 1) {
        Post.deletePostMod(req.params.post_id)
          .then(() => res.status(200).json("Post supprimé"))
          .catch((error) => res.status(400).json({ error }));
      }
    }
  });
};

exports.createComment = (req, res, next) => {
  Post.addComment(
    res.locals.userId,
    req.body.commentaire,
    req.body.publication_id
  )
    .then(() => res.status(200).json("Commentaire ajouté"))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Post.getAllComments(req.params.post_id)
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  if (res.locals.acces == 0) {
    Post.deleteComment(req.params.commentaire_id, res.locals.userId)
      .then(() => res.status(200).json("Commentaire supprimé"))
      .catch((error) => res.status(400).json({ error }));
  } else if (res.locals.acces == 1) {
    Post.deleteCommentMod(req.params.commentaire_id)
      .then(() => res.status(200).json("Commentaire supprimé"))
      .catch((error) => res.status(400).json({ error }));
  }
};
