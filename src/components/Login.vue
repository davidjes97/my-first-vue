<template>
  <div id="loginForm">
        <v-text-field label="Your Email" v-model="user"></v-text-field>
        <v-text-field type="password" label="Password" v-model="pass"></v-text-field>
        <v-container v-show="isLoggedIn === false">
            <v-row justify="end">
                <v-btn id ="up" @click="doSignUp">SignUp</v-btn>
                <v-btn id="in" @click="doSignIn">SignIn</v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { AppAUTH } from "../db-init.js";
export default {
  data: function() {
    return {
      isLoggedIn: false,
      user: "",
      pass: ""
    }
  },

  methods: {
    doSignUp() {
      AppAUTH.createUserWithEmailAndPassword(this.user, this.pass)
        .then(u => {
          alert("User created with UID " + u.user.uid);
          this.$router.push({ path: "/budget" });
        })
        .catch(err => {
          alert("Error " + err);
        });
    },

    doSignIn() {
      AppAUTH.signInWithEmailAndPassword(this.user, this.pass)
        .then(u => {
          alert("You logged in as " + u.user.email);
          this.$router.push({ path: "/budget" });
        })
        .catch(err => {
          alert("Error " + err);
        });
    }
  },

  mounted() {
    AppAUTH.onAuthStateChanged(u => {
        if(u == null) this.isLoggedIn = false;
        else this.isLoggedIn = true;
    });
  }
};
</script>

<style scoped>
    #loginForm {
    margin: 5px;
    padding: 5px;
    width: 50vw;
    border: 2px solid grey;
    border-radius: 15px;
    }

    #up {
    margin: 5px;
    }

    #in {
    margin: 5px;
    margin-right: 15px;
    }
</style>