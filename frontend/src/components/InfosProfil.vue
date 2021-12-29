<template>
  <div class="userInfos">
    <img src="../assets/default-user-image.png" class="imgUser" alt="" />
    <h2>{{ users.pseudo }}</h2>
    <p>{{ users.email }}</p>
    <p>Membre depuis le {{ formattedDate }}</p>
    <button class="btn btn-danger" @click="deleteUser">
      Supprimer mon profil
    </button>

    <!--     <button @click="infosToggle">Un petit mot sur toi ?</button>
    <div class="infos">
      <input type="text" class="infosTexte" />
      <a class="save"><i class="fas fa-check-circle"></i></a>
    </div> -->
  </div>
</template>

<script>
const user_id = localStorage.getItem("userId");
const API_URL = "http://localhost:3000/api/users/" + user_id;

export default {
  name: "InfosProfil",

  computed: {
    formattedDate() {
      let date = new Date(this.users.creation_date);
      let day =
        Number(date.getDate()) >= 10 ? date.getDate() : "0" + date.getDate();
      return `${day}/${date.getMonth()}/${date.getFullYear()}`;
    },
  },

  data() {
    return {
      users: [],
    };
  },

  created() {
    this.connectedUser();
    fetch(API_URL, {
      headers: {
        "content-type": "application/json",
        authorization: "Bearer: " + localStorage.getItem("token"),
      },
    })
      .then((result) => result.json())
      .then((result) => {
        this.users = result;
      });
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

    deleteUser() {
      if (
        window.confirm(
          "La suppression de votre compte est définitive, voulez vous continuer ?"
        )
      ) {
        fetch(API_URL, {
          method: "DELETE",
          headers: {
            authorization: "Bearer: " + localStorage.getItem("token"),
          },
        }).then(() => {
          localStorage.clear();
          location.href = "/auth";
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfos {
  margin-bottom: 30px;
  .imgUser {
    height: 260px;
    border-radius: 130px;
    margin-bottom: 20px;
    border: 2px solid #21252a;
  }

  .infos {
    position: relative;
    width: 80%;
    max-width: 600px;
    height: 120px;
    margin: 10px auto;

    .infosTexte {
      width: 100%;
      height: 120px;
      border: none;
      border-radius: 40px 40px 0 40px;
      outline: none;
      padding-left: 20px;
    }

    a {
      position: absolute;
      right: -15px;
      bottom: -20px;
      color: #0b5ed7;
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>