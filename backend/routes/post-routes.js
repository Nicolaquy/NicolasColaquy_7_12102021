const express = require("express");
const router = express.Router();
const postcTRL = require("../controllers/post-ctrl");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

router.post("/", auth, multer, postcTRL.createPost);
router.get("/", auth, postcTRL.getAllPosts);
router.get("/user:id(\\d+)", auth, postcTRL.getAllMyPosts);
router.get("/:post_id(\\d+)", auth, postcTRL.getOnePost);
router.delete("/:post_id(\\d+)", auth, postcTRL.deletePost);
router.get("/:post_id(\\d+)/commentaires", auth, postcTRL.getAllComments);
router.post("/commentaires", auth, postcTRL.createComment);
router.delete("/commentaires/:commentaire_id(\\d+)", auth, postcTRL.deleteComment);

module.exports = router;
