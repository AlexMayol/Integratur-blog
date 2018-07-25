<template>
  <div id="blog">
    <a class="skip" href="#nav">Saltar al menú de navegación</a>
    <a class="skip" href="#main">Saltar al contenido principal</a>
    <ig-header></ig-header>
    <div id="scrollTop"></div>
    <transition name="aparecer" mode="out-in" appear>
      <router-view :key="$route.fullPath"/>
    </transition>    
    <ig-footer></ig-footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { EventBus } from "./eventBus.js";
export default {
  data(){
    return{
     
    }    
  },
  components: {
    "ig-header": Header,
    "ig-footer": Footer
  },

  name: "Blog",
  created() {
    EventBus.$data.posts = this.getPostsData();
    EventBus.$data.categories = this.getCategoriesData();
  },
  methods: {
    getPostsData() {
      let self = this;
      axios
        .get("https://integratur.com/wp-json/wp/v2/posts?_embed&per_page=100")
        .then(function(response) {

          let string = JSON.stringify(response.data).replace(/wp:featuredmedia/gi, "wpmedia").replace(/wp:term/gi, "wpterm");
          let data = JSON.parse(string);
          EventBus.$data.posts = data;
          EventBus.$emit("got-posts");
          if (EventBus.$data.categories != null && EventBus.$data.posts != null) {
            EventBus.$emit("got-all");
            EventBus.$data.completed = true;
          }
          EventBus.$data.totalPages = Math.ceil( EventBus.$data.posts.length /  EventBus.$data.perPage);
          EventBus.$emit("got-totalPages");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCategoriesData() {
      axios
        .get("https://integratur.com/wp-json/wp/v2/categories")
        .then(function(response) {
          EventBus.$data.categories = response.data;
          EventBus.$emit("got-categories");
          if (EventBus.$data.categories != null && EventBus.$data.posts != null) {
            EventBus.$emit("got-all");
            EventBus.$data.completed = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>
<style>
