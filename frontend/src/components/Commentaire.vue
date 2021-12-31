<template>
  <div class="commentaire">
    <div class="comment">
      <p class="name">{{ pseudo }}</p>
      <p class="text">
        <i class="fas fa-angle-double-right"></i> {{ commentaire }}
      </p>
      <p class="date">{{ formattedDate }}</p>
    </div>
    <div class="supprimer">
      <button
        class="suppI btn-small btn-danger"
        @click="deleteComment()"
        v-show="canDelete"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commentaire",

  emits: ["reloadComment"],

  data() {
    return {
      connected: false,
      canDelete: false,
    };
  },

  props: {
    creation_date: {
      type: String,
      required: true,
    },
    commentaire: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    publication_id: {
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

  created() {
    this.connectedUser();
  },

  methods: {
    connectedUser() {                                              // Fonction pour vérifier si l'utilisateur est connecté et s'il sagit d'un admin
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

    deleteComment() {                                             // Fonction pour effacer un commentaire
        fetch(
          "http://localhost:3000/api/posts/commentaires/" + this.id, {
            method: "DELETE",
            headers: {
              authorization: "Bearer: " + localStorage.getItem("token"),
            },
          }
        ).then(() => {
        this.$emit("reloadComment");
      });
    },
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
.commentaire {
  position: relative;
  overflow: hidden;

  .comment {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 10px;
    border-top: 1px solid #f3f3f3;
    margin-bottom: 5px;

    .name {
      font-weight: 500;
      height: 10px;
    }

    .text {
      padding-left: 10px;
      margin: 0;
    }

    .date {
      position: absolute;
      right: 0px;
      top: 2px;
      font-size: 12px;
    }
  }
  .supprimer {
    position: absolute;
    right: -50px;
    height: 110%;
    top: 0;

    .suppI {
      margin-top: 26px;
      border-radius: 4px;
    }
  }
}

.commentaire:hover {
  .supprimer {
    transform: translateX(-60px);
    transition: 350ms ease-out;
    .suppI {
      transform: rotate(360deg);
      transition: 400ms ease-out 100ms;
    }
  }
}
</style>