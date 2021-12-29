<template>
  <nav id="nav" class="navbar navbar-dark bg-dark fixed-top">
    <router-link to="/" class="navbar-brand"
      ><img
        class="nav-logo"
        src="../assets/icon-left-font-monochrome-white.png"
        alt="Logo Groupomania"
        @click="closeNav"
    /></router-link>
    <ul v-show="!mobile">
      <li><router-link to="/" class="navbar-brand">Accueil</router-link></li>
      <li v-if="connected">
        <router-link to="/profil" class="navbar-brand">Profil</router-link>
      </li>
      <li v-if="!connected">
        <router-link to="/auth" class="navbar-brand">Connexion</router-link>
      </li>
      <li v-if="connected" v-on:click="deconnexion()">
        <router-link to="/auth" class="navbar-brand">Déconnexion</router-link>
      </li>
    </ul>
    <div class="icon">
      <i
        @click="toggleMobileNav"
        v-show="mobile"
        class="fas fa-bars"
        :class="{ 'icon-active': mobileNav }"
      ></i>
    </div>
    <transition name="mobile-nav">
      <ul v-show="mobileNav" class="dropdown-nav">
        <li>
          <router-link to="/" class="navbar-brand" @click="closeNav"
            >Accueil</router-link
          >
        </li>
        <li v-if="connected">
          <router-link to="/profil" class="navbar-brand" @click="closeNav"
            >Profil</router-link
          >
        </li>
        <li v-if="!connected">
          <router-link to="/auth" class="navbar-brand" @click="closeNav"
            >Connexion</router-link
          >
        </li>
        <li v-if="connected" v-on:click="deconnexion()">
          <router-link to="/auth" class="navbar-brand" @click="closeNav"
            >Déconnexion</router-link
          >
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windwWidth: null,
      connected: false,
    };
  },

  created() {
    this.connectedUser();
  },

  mounted() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
    window.addEventListener("scroll", this.closeNav);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeNav() {
      if (this.mobileNav) {
        this.mobileNav = !this.mobileNav;
      }
    },
    checkScreen() {
      this.windwWidth = window.innerWidth;
      if (this.windwWidth <= 720) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    connectedUser() {
      if (localStorage.token == undefined || localStorage.token == null) {
        this.connected = false;
        console.log("Utilisateur non connecté !");
      } else {
        this.connected = true;
        console.log("Utilisateur connecté !");
      }
    },
     deconnexion(){
        localStorage.clear();
        location.href = '/auth';
        }
  },
};
</script>

<style lang="scss">
#nav {
  height: 65px;

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    position: relative;
    top: 8px;
  }

  a {
    font-weight: bold;
    color: white;
    position: relative;
    top: -55px;
    margin: 0 20px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #0b5ed7;
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    i {
      color: #fff;
      font-size: 25px;
      cursor: pointer;
      transition: 0.8s ease all;
    }
  }
  .icon-active {
    transform: rotate(180deg);
  }

  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    height: 100%;
    top: 62px;
    right: 0px;
    background: #21252a;
    padding-top: 80px;
    text-align: right;

    li {
      margin-top: 20px;
      margin-right: 20px;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: 0.8s ease all;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0px);
  }
}
</style>