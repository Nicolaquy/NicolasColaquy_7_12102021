const express = require("express");                                                     // Importation du paquet express
const router = express.Router();                                                        // Creation du router
const postcTRL = require("../controllers/post-ctrl");                                   // Importation du controller posts
const multer = require("../middleware/multer-config");                                  // Importation du middlware pour Multer
const auth = require("../middleware/auth");                                             // Importation du middlware auth

router.post("/", auth, multer, postcTRL.createPost);                                    // Route pour créer un post
router.get("/", auth, postcTRL.getAllPosts);                                            // Route pour affichager tout les posts
router.get("/user:id(\\d+)", auth, postcTRL.getAllMyPosts);                             // Route pour affichager tout les posts d'un utilisateur
router.get("/:post_id(\\d+)", auth, postcTRL.getOnePost);                               // Route pour affichager un post
router.delete("/:post_id(\\d+)", auth, postcTRL.deletePost);                            // Route pour supprimer un post
router.get("/:post_id(\\d+)/commentaires", auth, postcTRL.getAllComments);              // Route pour affichager tout les commentaires
router.post("/commentaires", auth, postcTRL.createComment);                             // Route pour créer un commentaire
router.delete("/commentaires/:commentaire_id(\\d+)", auth, postcTRL.deleteComment);     // Route pour supprimer un commentaire

module.exports = router;                                                                // Export du router
