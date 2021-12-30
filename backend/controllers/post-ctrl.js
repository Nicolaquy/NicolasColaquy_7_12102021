const Post = require("../models/Post-models");                                    // Importation des models Post
const fs = require("fs");                                                         // Importation de fs pour supprimer les images

exports.createPost = (req, res, next) => {
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null;  // Si une image est trouvée on paramètre son URL
  Post.addPost(res.locals.userId, req.body.description, image)                    // Envoie de la requête a la bdd avec valeurs
    .then(() => res.status(200).json("Post ajouté"))                              // Retour positif, post créé
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.getAllPosts = (req, res, next) => {
  Post.getAllPosts()                                                              // Envoie de la requête a la bdd
    .then((posts) => res.status(200).json(posts))                                 // Retour positif, affichage des posts
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.getOnePost = (req, res, next) => {
  Post.getOnePost(req.params.post_id)                                             // Envoie de la requête a la bdd avec valeur
    .then((post) => res.status(200).json(post))                                   // Retour positif, affichage du post
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.getAllMyPosts = (req, res, next) => {
  Post.getAllMyPosts(req.params.id)                                               // Envoie de la requête a la bdd avec valeur
    .then((posts) => res.status(200).json(posts))                                 // Retour positif, affichage de mes posts
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.deletePost = (req, res, next) => {
  Post.getOnePost(req.params.post_id).then((post) => {                            // Envoie de la requête a la bdd avec valeur
    if (post.image_url != null) {                                                 // Si une image est trouvée
      const filename = post.image_url.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {                                     // Suppression de celle-ci dans le fichier image
        if (res.locals.acces == 0) {                                              // Si utilisateur standard
          Post.deletePost(req.params.post_id, res.locals.userId)                  // Envoie de la requête a la bdd avec valeurs
            .then(() => res.status(200).json("Post supprimé"))                    // Retour positif, suppression du post
            .catch((error) => res.status(400).json({ error }));                   // Retour négatif, erreur
        } else if (res.locals.acces == 1) {                                       // Si admin
          Post.deletePostMod(req.params.post_id)                                  // Envoie de la requête a la bdd avec valeur
            .then(() => res.status(200).json("Post supprimé"))                    // Retour positif, suppression du post
            .catch((error) => res.status(400).json({ error }));                   // Retour négatif, erreur
        }
      });
    } else {                                                                      // Si pas d'image, suppression post standard
      if (res.locals.acces == 0) {                                                // Si utilisateur standard
        Post.deletePost(req.params.post_id, res.locals.userId)                    // Envoie de la requête a la bdd avec valeurs
          .then(() => res.status(200).json("Post supprimé"))                      // Retour positif, suppression du post
          .catch((error) => res.status(400).json({ error }));                     // Retour négatif, erreur
      } else if (res.locals.acces == 1) {                                         // Si admin
        Post.deletePostMod(req.params.post_id)                                    // Envoie de la requête a la bdd avec valeur
        .then(() => res.status(200).json("Post supprimé"))                        // Retour positif, suppression du post
        .catch((error) => res.status(400).json({ error }));                       // Retour négatif, erreur
      }
    }
  });
};

exports.createComment = (req, res, next) => {
  Post.addComment(                                                                // Envoie de la requête a la bdd avec valeurs
    res.locals.userId,
    req.body.commentaire,
    req.body.publication_id
  )
    .then(() => res.status(200).json("Commentaire ajouté"))                       // Retour positif, ajout du commentaire
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.getAllComments = (req, res, next) => {
  Post.getAllComments(req.params.post_id)                                         // Envoie de la requête a la bdd avec valeur
    .then((comments) => res.status(200).json(comments))                           // Retour positif, affichage des commentaires
    .catch((error) => res.status(400).json({ error }));                           // Retour négatif, erreur
};

exports.deleteComment = (req, res, next) => {
  if (res.locals.acces == 0) {                                                    // Si utilisateur standard
    Post.deleteComment(req.params.commentaire_id, res.locals.userId)              // Envoie de la requête a la bdd avec valeurs
      .then(() => res.status(200).json("Commentaire supprimé"))                   // Retour positif, suppression du commentaire
      .catch((error) => res.status(400).json({ error }));                         // Retour négatif, erreur
  } else if (res.locals.acces == 1) {                                             // Si admin
    Post.deleteCommentMod(req.params.commentaire_id)                              // Envoie de la requête a la bdd avec valeur
      .then(() => res.status(200).json("Commentaire supprimé"))                   // Retour positif, suppression du commentaire
      .catch((error) => res.status(400).json({ error }));                         // Retour négatif, erreur
  }
};
