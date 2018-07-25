<template>
  <main class="container-fluid"
        id="main">
        <nav aria-label="migas de pan" class="breadcrumb">
          <ul>
            <li>
             <router-link :to="{name:'home'}">Inicio</router-link>
            </li>
            <li v-if="categories != null">
              Categoría: <span class="upper">{{$route.params.name}}</span>
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
    <h2>Viendo la categoría de <span class="upper">{{$route.params.name}}</span></h2>
    <div class="row">
    <section class="col-md-9" :class="{'flex-list': view == 'list', 'flex-grid': view == 'grid' }">
      <div v-if="postsCategoria.length == 0">
          <ig-spinner></ig-spinner>
      </div>
       <article v-else-if="view == 'grid'" v-for="post in postsCategoria" class="post" :key="post.id">
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
          <article v-else v-for="post in postsCategoria" class="post" :key="post.id">
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
    <aside class="col-md-3">
      <h2 class="h3-size">Categorías</h2>
      <div v-if="categories == null">
        <ig-spinner></ig-spinner>
      </div>
      <ul v-else
          class="cats">
        <li v-for="category in categories"  :key="category.id" v-if="category.count > 0">
          <router-link :to="{name:'categories', params:{name:category.slug}}"><span aria-hidden="true">{{category.name}} ({{category.count}}</span><span class="sr-only">{{category.name}}, {{category.count}} artículos</span>)</router-link>
        </li>
      </ul>
    </aside>
    </div>
  </main>
</template>

<script>
import { EventBus } from "../eventBus.js";
import loader from "./spinner.vue";
export default {
  name: "Categoria",
  watch: {
    $route: "refreshData"
  },
  data() {
    return {
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      view: this.setView(),
      categories: EventBus.$data.categories,
      postsCategoria: []
    };
  },
  components: {
    "ig-spinner": loader
  },
  created() {
    if (localStorage.getItem("view") == null) {
      localStorage.setItem("view", "grid");
    }
    EventBus.$on("got-posts", this.updatePosts);
    EventBus.$on("got-categories", this.updateCategories);
    EventBus.$on("got-all", this.refreshData);
  },
  mounted() {
    if (EventBus.$data.completed == true) this.refreshData();
  },
  methods: {
    updatePosts() {
      this.posts = EventBus.$data.posts;
    },
    updateCategories() {
      this.categories = EventBus.$data.categories;
    },
    refreshData() {
        document
        .querySelector("meta[name='description']")
        .setAttribute("content", "Categorías en el Blog de Integratur");
      document.title = this.$route.params.name.charAt(0).toUpperCase() + this.$route.params.name.substr(1) +" | Blog de Integratur";

      this.postsCategoria = [];
      let id;
      for (let cat of EventBus.$data.categories) {
        if (cat.slug == this.$route.params.name) {
          id = cat.id;
          break;
        }
      }
      for (let post of EventBus.$data.posts) {
        if (post.categories.includes(id)) {
          this.postsCategoria.push(post);
        }
        this.scrollTop();
      }
    },
    excerpt(text){
    let txt = text.replace(/<[^>]+>/g, '');
    if(txt.length > 120){
      txt= txt.slice(0, 120).trim().concat('...');
    }
    return txt;
    },
    setView() {
      if (localStorage.getItem("view") == null) {
        localStorage.setItem("view", "grid");
        return "grid";
      } else {
        return localStorage.getItem("view");
      }
    },
    scrollTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
figure img {
  width: 100%;
}
.upper {
  text-transform: capitalize;
}
</style>
