<template>
  <div class="profil" v-if="connected">
    <infosProfil />
    <PostForm v-on:reload-post="getPosts" />
    <div class="posts">
      <h3>Mes Posts:</h3>
      <post
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
        v-on:reload-post="getPosts"
      ></post>
    </div>
  </div>
  <div class="profil" v-else>
    <p>
      Pour acceder aux fonctionnalités de l'application et voir votre profil
      merci de vous connecter
    </p>
    <router-link to="/auth"
      ><button class="btn btn-primary">Se connecter</button></router-link
    >
  </div>
</template>

<script>
import InfosProfil from "../components/InfosProfil.vue";
import PostForm from "../components/PostForm.vue";
import Post from "../components/Post.vue";
const id = localStorage.getItem("userId");
const API_URL = "http://localhost:3000/api/posts/user" + id;

export default {
  name: "Profil",

  components: {
    InfosProfil,
    PostForm,
    Post,
  },

  data() {
    return {
      connected: false,
      posts: [],
    };
  },

  created() {
    this.connectedUser(), this.getPosts();
  },

  methods: {
    connectedUser() {
      if (localStorage.token == undefined) {
        this.connected = false;
        console.log("Utilisateur non connecté !");
      } else {
        this.connected = true;
        console.log("Utilisateur connecté !");
      }
    },
    getPosts() {
      fetch(API_URL, {
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
  },
};
</script>

<style lang="scss" scoped>
.profil {
  margin-top: 120px;

  .posts {
    margin: 40px 0px;
  }
}
</style>