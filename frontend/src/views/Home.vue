<template>
  <div class="home" v-if="connected">
    <PostForm v-on:reload-post="getPosts" />
    <post
      v-on:reload-post="getPosts"
      v-for="post in posts"
      :key="post.id"
      v-bind="post"
    ></post>
  </div>
  <div class="home" v-else>
    <p>
      Pour acceder aux fonctionnalités de l'application et voir les messages de
      vos collègues merci de vous connecter
    </p>
    <router-link to="/auth"
      ><button class="btn btn-primary">Se connecter</button></router-link
    >
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import PostForm from "../components/PostForm.vue";

export default {
  name: "Home",

  components: {
    Post,
    PostForm,
  },

  data() {
    return {
      connected: false,
      moderateur: false,
      posts: [],
    };
  },

  created() {
    this.connectedUser();
    this.getPosts();
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    connectedUser() {
      if (localStorage.token == undefined) {
        this.connected = false;
        console.log("Utilisateur non connecté !");
      } else {
        this.connected = true;
        if (localStorage.accesnivel == 1) {
          this.canDelete = true;
          console.log("Modérateur connecté !");
        } else if (this.user_id == localStorage.getItem("userId")) {
          this.canDelete = true;
          console.log("Utilisateur connecté !");
        } else {
          this.canDelete = false;
        }
      }
    },

    getPosts() {
      fetch("http://localhost:3000/api/posts", {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer: " + localStorage.getItem("token"),
        },
      })
        .then((result) => result.json())
        .then((result) => {
          this.posts = result;
        });
    },

    handleScroll () {
      if (window.scrollY < 1)
          this.getPosts();
    }
  },
};
</script>

<style scoped>
.home {
  margin-top: 120px;
  padding-bottom: 30px;
}
</style>