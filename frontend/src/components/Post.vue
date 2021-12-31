<template>
  <div>
    <div class="card text-center">
      <div class="card-header">
        <div class="userInfos">
          <div class="user">
            <img
              src="../assets/default-user-image.png"
              class="imgUser"
              alt=""
            />
            <div class="name">{{ pseudo }}</div>
          </div>
        </div>
        <div class="date">{{ formattedDate }}</div>
        <div>
          <button
            class="btn-small btn-danger delete"
            @click="deletePost()"
            v-show="canDelete"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ description }}</h5>
        <img :src="image_url" />

        <ul>
          <li>
            <a class="btn btn-small"
              ><span class="like">Like</span><i class="far fa-thumbs-up"></i
            ></a>
          </li>
          <li>
            <a
              class="btn btn-small collapsed"
              data-bs-toggle="collapse"
              :data-bs-target="'#flush-collapse' + id"
              aria-expanded="false"
              :aria-controls="'flush-collapse' + id"
              @click="getComments()"
            >
              Commentaires
            </a>
          </li>
        </ul>
        <div :id="'flush-collapse' + id" class="accordion-collapse collapse">
          <div class="comments">
            <commentaire
              v-on:reload-comment="getComments"
              v-for="commentaire in commentaires"
              :key="commentaire.id"
              v-bind="commentaire"
            ></commentaire>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form v-on:submit.prevent="newComment">
          <div class="comment">
            <img
              src="../assets/default-user-image.png"
              class="imgUser"
              alt=""
            /><input
              type="text"
              v-model="commentaire"
              placeholder="Laissez un commentaire"
            />
          </div>
          <button class="btn btn-primary" type="submit">
            <span class="publier">Commenter</span
            ><i class="fas fa-comment-medical"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Commentaire from "../components/Commentaire.vue";

export default {
  name: "Post",

  emits: ["reloadPost"],

  data() {
    return {
      commentaire: "",
      commentaires: [],
      connected: false,
      canDelete: false,
    };
  },

  props: {
    creation_date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {},
    user_id: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    pseudo: {
      type: String,
      required: true,
    },
  },

  components: {
    Commentaire,
  },

  created() {
    this.connectedUser();
    this.getComments();
    window.addEventListener('scroll', this.handleScroll);
  },

  methods: {
    connectedUser() {                                        // Fonction pour vérifier si l'utilisateur est connecté et s'il sagit d'un admin
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

    getComments() {                                         // Fonction pour récuperer les commentaires
      fetch("http://localhost:3000/api/posts/" + this.id + "/commentaires", {
        headers: {
          "content-type": "application/json",
          authorization: "Bearer: " + localStorage.getItem("token"),
        },
      })
        .then((result) => result.json())
        .then((result) => {
          this.commentaires = result;
        });
    },

    newComment() {                                          // Fonction pour ajouter un commentaire
      let commentaire = {
        commentaire: this.commentaire,
        publication_id: this.id,
      };

      fetch("http://localhost:3000/api/posts/commentaires", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "Bearer: " + localStorage.getItem("token"),
        },
        body: JSON.stringify(commentaire),
      }).then(() => {
        this.getComments();
        this.commentaire = "";
      });
    },

    deletePost() {                                         // Fonction pour supprimer un post
      if (window.confirm("Voulez-vous vraiment supprimer ce post ?")) {
        fetch("http://localhost:3000/api/posts/" + this.id, {
          method: "DELETE",
          headers: {
            authorization: "Bearer: " + localStorage.getItem("token"),
          },
        }).then(() => {
          this.$emit("reloadPost");
        });
      }
    },

        handleScroll () {
      if (window.scrollY < 1)
          this.getComments();
    }
  },

  computed: {
    formattedDate() {                                           // Formatage de la date
      let date = new Date(this.creation_date);
      let day =
        Number(date.getDate()) >= 10 ? date.getDate() : "0" + date.getDate();
      let minutes =
        Number(date.getMinutes()) >= 10
          ? date.getMinutes()
          : "0" + date.getMinutes();
      return `${day}/${date.getMonth()}/${date.getFullYear()} à ${date.getHours()}h${minutes}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 30px auto 0 auto;
  width: 90%;
  max-width: 800px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  li {
    width: 50%;
    margin-top: 10px;
    margin-right: 40px;

    .btn-small {
      width: 100%;
      max-width: 300px;
      transition: transform 0.3s ease;
      .like {
        margin-right: 10px;
      }
    }
  }

  .card-header {
    display: flex;
    flex-direction: row;
    position: relative;

    .user {
      display: flex;
      flex-direction: row;
      .name {
        align-self: center;
        margin-left: 10px;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .delete {
      border-radius: 4px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .delete:hover {
      transform: rotate(360deg);
      transition: 400ms ease-out 100ms;
    }

    .imgUser {
      height: 60px;
      border-radius: 60px;
      margin-right: 10px;
    }

    .date {
      position: absolute;
      right: 60px;
      top: 14px;
    }

    .postMenu {
      text-align: right;
      button {
        border: 1px solid gray;
        background: white;
        border-radius: 5px;
        margin: 5px;
      }
    }
  }

  img {
    max-width: 95%;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    vertical-align: center;

    .btn-small:hover {
      transform: scale(1.1);
    }
  }

  .comments {
    display: flex;
    flex-direction: column-reverse;
  }

  .card-footer {
    form {
      display: flex;
      flex-direction: row;
      width: 100%;

      .comment {
        width: 100%;
        display: flex;
        flex-direction: row;
        input {
          border: none;
          padding: 5px;
          padding-left: 10px;
          width: 80%;
          border-radius: 20px;
          outline: none;
          background: rgb(240, 240, 240);
        }
        .imgUser {
          height: 40px;
          border-radius: 60px;
          margin-right: 10px;
        }
      }
      .fa-comment-medical {
        display: none;
      }
    }
  }
  .card-header,
  .card-footer {
    background: white;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media screen and (max-width: 640px) {
  .card {
    width: 100%;
    .card-header {
      .imgUser {
        height: 40px;
      }
      .date {
        margin-top: 2px;
        font-size: 14px;
      }
    }
    .card-footer {
      .imgUser {
        display: none;
      }

      .comment {
        input {
          width: 100%;
        }
      }

      button {
        background: transparent;
        border: none;
        font-size: 26px;
        width: 10%;
        .publier {
          display: none;
        }
        .fa-comment-medical {
          display: inherit;
          color: #0b5ed7;
        }
      }
    }
  }
}
</style>