<template>
  <div>
    <div class="auth">
      <transition name="fade" mode="out-in">
        <!---------- FORMULAIRE DE CONNEXION ---------->

        <form v-on:submit.prevent="logIn" v-if="visible" :key="visible">
          <div class="mb-3">
            <label for="email" class="form-label">Identifiant</label>
            <input
              v-model="email"
              ref="email"
              type="email"
              class="form-control"
              required
              placeholder="Ton adresse mail ou ton pseudo"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input
              v-model="password"
              ref="password"
              type="password"
              class="form-control"
              required
              placeholder="************"
            />
          </div>
          <button value="connexion" type="submit" class="btn btn-primary">
            Connexion
          </button>
          <div class="errorMessage">{{ message }}</div>
        </form>

        <!---------- FORMULAIRE D'INSCRIPTION ---------->

        <form v-on:submit.prevent="signUp" class="newUser" v-else>
          <div class="mb-3">
            <label for="email" class="form-label">Adresse mail</label>
            <input
              v-model="email"
              ref="email"
              type="email"
              class="form-control"
              id="email"
              required
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div class="mb-3">
            <label for="pseudo" class="form-label">Pseudo</label>
            <input
              v-model="pseudo"
              ref="pseudo"
              type="text"
              class="form-control"
              id="pseudo"
              required
              placeholder="JohnDoe33"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input
              v-model="password"
              ref="password"
              type="password"
              class="form-control"
              id="password"
              required
              placeholder="************"
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label"
              >Confirmez mot de passe</label
            >
            <input
              v-model="confirmPassword"
              ref="confirmPassword"
              type="password"
              class="form-control"
              id="confirmPassword"
              required
              placeholder="************"
            />
          </div>
          <button
            value="inscription"
            type="submit"
            class="btn btn-primary"
            id="signUp"
          >
            Créer un compte
          </button>
          <div class="errorMessage">{{ message }}</div>
        </form>
      </transition>
    </div>

    <!---------- BOUTON TOGGLE ---------->

    <p id="come">
      Pas encore insctit ?
      <button @click="toggle" class="btn btn-success btn-sm">
        Rejoins nous !
      </button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return {
      message: "",
      visible: true,
      email: "",
      password: "",
      pseudo: "",
      confirmPassword: "",
      connected: false,
    };
  },

  methods: {
    toggle () {                                               // Fonction pourgerer le toggle
      let btn = document.getElementById("come");
      btn.classList.add("fade-out-btn");
      this.visible = !this.visible;
    },

    logIn() {                                                 // Fonction de connexion
      let user = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.acces === 0) {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            localStorage.setItem("accesnivel", res.acces);
            location.href = "/";
          }  else if (res.acces === 1) {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            localStorage.setItem("accesnivel", res.acces);
            location.href = "/";
          } else {
            this.message = "Mot de passe ou identifiant incorrect";
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

        signUp() {                                                  // Fonction d'inscription
      let newUser = {
        email: this.email,
        pseudo: this.pseudo,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      if (this.password == this.confirmPassword) {
        this.message = "";
          fetch("http://localhost:3000/api/users/signup", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser)
          }).then(() => {
            location.href = "/auth";
            window.alert(
          "Votre compte a bien été créé, veuillez maintenant vous connecter pour profiter de notre réseau !"
        )
      });

      } else {
        this.message = "La confirmation du mot de passe n'est pas identique";
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.auth {
  display: flex;
  margin-top: 100px;
}
form {
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
}

input {
  text-align: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

#come {
  margin-top: 30px;
}

.errorMessage {
  color: red;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  background: rgb(0, 0, 0);
  border-radius: 5px;
}

.fade-leave-active {
  -webkit-animation: flip-out-ver-right 0.45s
    cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: flip-out-ver-right 0.45s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
@-webkit-keyframes flip-out-ver-right {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateY(70deg);
    transform: rotateY(70deg);
    opacity: 0;
  }
}
@keyframes flip-out-ver-right {
  0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: rotateY(70deg);
    transform: rotateY(70deg);
    opacity: 0;
  }
}
.fade-enter-active {
  -webkit-animation: flip-in-ver-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: flip-in-ver-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes flip-in-ver-right {
  0% {
    -webkit-transform: rotateY(-80deg);
    transform: rotateY(-80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    opacity: 1;
  }
}
@keyframes flip-in-ver-right {
  0% {
    -webkit-transform: rotateY(-80deg);
    transform: rotateY(-80deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
    opacity: 1;
  }
}

.fade-out-btn {
  animation: flip-out-ver-right;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}
</style>