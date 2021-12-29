<template>
  <div id="app">
    <Navigation />

    <div class="content">
    <div>
      <div id="nav-mobile" class="navbar navbar-dark bg-dark fixed-top" v-if="mobileView">

      </div>
      
    </div>
    <div class="contentPage">
    <router-view />
    </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Naviation.vue";

export default {
  components: { 
    Navigation
  },
  data() {
    return {
      mobileView: false
    };
  },
  methods: {
  },
  created() {
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;

  .nav-logo {
      height: 150px;
    }
}

.content {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  transition: 1s transform cubic-bezier(0, .12, .14, 1);
    background: rgb(243, 243, 243);
}
.contentPage {
  width: 90%;
  position: relative;
  margin: 0 auto;
}

.open {
  transform: translateX(-250px);
}

#nav-mobile {
  height: 65px;

  a {
    font-weight: bold;
    color: white;
    position: relative;
    top: -55px;
    margin: 0 20px;

    &.router-link-exact-active {
      color: #0b5ed7;
    }
  }

}
</style>
