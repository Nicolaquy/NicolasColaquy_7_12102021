<template>
  <form v-on:submit.prevent="newPost" id="form">
    <div class="mess">
      <img src="../assets/default-user-image.png" class="imgUser" alt="" />
      <textarea
        type="text"
        class="message"
        v-model="description"
        placeholder="Balance ton post !"
      />
      <label for="customFile"><i class="far fa-images addfile"></i></label>
    </div>

    <input
      class="customFile"
      ref="imageUploader"
      type="file"
      id="customFile"
      accept="image/*"
      @change="changeImage($event)"
    />
    <img id="output" />
    <button type="submit" class="btn btn-primary">Publier</button>
  </form>
</template>

<script>
export default {
  name: "PostForm",

  emits: ["reloadPost"],

  data() {
    return {
      description: "",
      image: "",
    };
  },
  methods: {
    changeImage(event) {
      this.image = event.target.files[0] || event.dataTransfer.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        let output = document.getElementById("output");
        output.src = reader.result;
      };
      reader.readAsDataURL(this.image);
    },

    newPost() {
      let post = new FormData();
      post.append("description", this.description);
      post.append("image", this.image);
      console.log(this.image);

      fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        headers: {
          authorization: "Bearer: " + localStorage.getItem("token"),
        },
        body: post,
      }).then(() => {
        this.$emit("reloadPost");
        this.description = "";
        this.image = "";
        let output = document.getElementById("output");
        output.src = "";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  position: relative;
  margin: 0 auto;
  background: #fff;
  width: 90%;
  padding: 20px;
  padding-bottom: 80px;
  max-width: 800px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .mess {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
    .imgUser {
      height: 60px;
      border-radius: 60px;
    }
    .message {
      margin-left: 20px;
      height: 40px;
      min-height: 40px;
      width: 80%;
      border: none;
      background: rgb(240, 240, 240);
      border-radius: 20px;
      padding-left: 20px;
      outline: none;
      padding-top: 8px;
    }

    .addfile {
      border-radius: 25px;
      font-size: 25px;
      margin-left: 10px;
      padding: 7px;
      background: rgb(233, 233, 255);
      cursor: pointer;
    }
  }

  .customFile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 140px;
  }
}

#output {
  max-width: 80%;
  max-height: 300px;
  border-radius: 5px;
  box-shadow: 0 2px 3px 1px rgba(196, 196, 196, 0.541);
}

@media screen and (max-width: 640px) {
  form {
    width: 100%;

    .mess {
      .imgUser {
        height: 40px;
      }
    }
  }
}

@media screen and (max-width: 620px) {
  .mess {
    margin-bottom: 15px;
    .imgUser {
      display: none;
    }
  }
}
</style>