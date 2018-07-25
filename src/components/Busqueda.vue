<template>
  <main class="container-fluid"
        id="main">
        <nav aria-label="migas de pan" class="breadcrumb">
          <ul>
            <li>
             <router-link :to="{name:'home'}">Inicio</router-link>
            </li>
            <li>
              Búsqueda en el blog: "{{formatQuery()}}"
            </li>
          </ul>
        </nav>
     <div class="btn-grid">
      <button @click="toggleView('grid')" :disabled="view == 'grid'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/></svg>      </button>
      <button @click="toggleView('list')" :disabled="view == 'list'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 116V76c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H144c-8.837 0-16-7.163-16-16zm16 176h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 144h64c8.837 0 16-7.163 16-16V64c0-8.837-7.163-16-16-16H16C7.163 48 0 55.163 0 64v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16z"/></svg>
      </button>
    </div>
    <h2>Viendo los resultados de la búsqueda "{{formatQuery()}}"</h2>
    <div class="row">
      <div class="warning-search" v-if="noMatch == true">No se ha encontrado ninguna publicación con ese texto. Vuelva a intentarlo.</div>
    <section class="col-md-12" :class="{'flex-list': view == 'list', 'flex-grid': view == 'grid' }">
      <div v-if="searchResult == null">
          <ig-spinner></ig-spinner>
      </div>
       <article v-else-if="view == 'grid'" class="post" v-for="post in searchResult" :key="post.id">
          <h3 v-html="post.title.rendered"></h3>
          <small>{{localeDate(post.modified)}}</small>
          <div class="categorias">
             <small>
              <router-link v-for="cats in post._embedded.wpterm[0]" :key="cats.id" class="cat" :to="{name:'categories', params:{name:cats.slug}}">{{cats.name}}</router-link>
            </small>
          </div>           
          <figure v-if="post._embedded.wpmedia != null">
            <img :src="post._embedded.wpmedia[0].source_url" alt="">
          </figure>
          <div v-html="excerpt(post.excerpt.rendered)" class="resumen"/>
        <div class="btn-cont">
          <router-link :to="{name:'post', params:{slug:post.slug}}" class="seguir">Seguir leyendo</router-link>
        </div>          
        </article>
          <article v-else v-for="post in searchResult" class="post" :key="post.id">
          <div class="img-cont">
            <img  v-if="post._embedded.wpmedia != null" :src="post._embedded.wpmedia[0].source_url" alt="">
          </div>
          <div class="info">
            <h3 v-html="post.title.rendered"></h3>
           <small>{{localeDate(post.modified)}} -           
              <div v-for="cats in post._embedded.wpterm[0]" :key="cats.id" class="cats-info">
                <router-link class="cat" :to="{name:'categories', params:{name:cats.slug}}">{{cats.name}}</router-link>
              </div>
            </small>
            <div v-html="excerpt(post.excerpt.rendered)" class="resumen"/>
            <router-link :to="{name:'post', params:{slug:post.slug}}" class="seguir">Seguir leyendo</router-link>
          </div>
        </article>        
    </section>    
    </div>
    <router-link :to="{name:'home'}" class="back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
          Volver al blog
        </router-link>
  </main>
</template>

<script>
import { EventBus } from "../eventBus.js";
import loader from "./spinner.vue";
export default {
  name: "Buesqueda",
  watch: {
    $route: "refreshData"
  },
  data() {
    return {
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      view: this.setView(),
      searchResult: EventBus.$data.searchResult,
      noMatch:false
    };
  },
  components: {
    "ig-spinner": loader
  },
  created() {
    if (localStorage.getItem("view") == null) {
      localStorage.setItem("view", "grid");
    }
    EventBus.$on("got-posts", this.refreshData);
  },
  mounted() {
    if (EventBus.$data.completed == true) this.refreshData();
  },
  methods: {
    refreshData() {
      if (EventBus.$data.searchResult == null) {
        let queryUpper = this.$route.params.query.replace("-", " ").toUpperCase();
        this.searchResult = [];
        for (let post of EventBus.$data.posts) {
          var equalTitle = post.title.rendered.toUpperCase().includes(queryUpper) ;
          var equalExcerpt = post.excerpt.rendered.toUpperCase().includes(queryUpper);
          var equalContent =  post.content.rendered.toUpperCase().includes(queryUpper);
          
          if (equalTitle == true|| equalExcerpt == true || equalContent == true) {
            this.searchResult.push(post);
          }
        }
        if (this.searchResult.length == 0) {this.noMatch = true;} 
      } else {
        this.searchResult = EventBus.$data.searchResult;
      }
    },
    setView() {
      if (localStorage.getItem("view") == null) {
        localStorage.setItem("view", "grid");
        return "grid";
      } else {
        return localStorage.getItem("view");
      }
    },
      excerpt(text){
      let txt = text.replace(/<[^>]+>/g, '');
      if(txt.length > 120){
        txt= txt.slice(0, 120).trim().concat('...');
      }
      return txt;
    },
    formatQuery() {
      return this.$route.params.query.replace(/-/gi, " ");
    },
    localeDate(date) {
      let fecha = new Date(date).toLocaleDateString("es-ES", this.options);
      return fecha;
    },
    toggleView(view) {
      localStorage.setItem("view", view);
      this.view = view;
    }
  }
};
</script>

<style scoped>

</style>
