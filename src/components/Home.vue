<template>
  <main id="main" class="container-fluid">
    <nav aria-label="migas de pan" class="breadcrumb">
      <ul>
        <li>
          Inicio
        </li>
      </ul>
    </nav>
    <h2 class="azul-corp">Últimas noticias en Integratur</h2>
    <div class="top-bar">
      <div class="btn-grid" aria-hidden="true">
        <button @click="toggleView('grid')" :disabled="view == 'grid'" title="Ver en modo de cuadrícula">
          <span class="sr-only">Ver en cuadrícula</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/></svg>  
        </button>
        <button @click="toggleView('list')" :disabled="view == 'list'" title="Ver en modo de lista">
          <span class="sr-only">Ver en lista</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 116V76c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H144c-8.837 0-16-7.163-16-16zm16 176h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 144h64c8.837 0 16-7.163 16-16V64c0-8.837-7.163-16-16-16H16C7.163 48 0 55.163 0 64v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16z"/></svg>
        </button>
      </div>
      <ig-search></ig-search>
    </div>

    <div class="row">

      <section class="col-lg-9" :class="{'flex-list': view == 'list', 'flex-grid': view == 'grid' }">
        <div v-if="posts==null">
          <ig-spinner></ig-spinner>
        </div>
        <article v-else-if="view == 'grid'" v-for="post in posts" class="post" :key="post.id">
          <h3 v-html="post.title.rendered"></h3>
          <small><span class="sr-only">Fecha: </span>{{localeDate(post.modified)}}</small>
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
        <article v-else v-for="post in posts" class="post" :key="post.id">
          <div class="img-cont"  v-if="post._embedded.wpmedia != null">
            <img  v-if="post._embedded.wpmedia != null" :src="post._embedded.wpmedia[0].source_url" alt="">
          </div>          
          <div class="info">
            <h3 v-html="post.title.rendered"></h3>
            <small><span class="sr-only">Fecha: </span>{{localeDate(post.modified)}} -           
              <div v-for="cats in post._embedded.wpterm[0]" :key="cats.id" class="cats-info">
                <router-link class="cat" :to="{name:'categories', params:{name:cats.slug}}">{{cats.name}}</router-link>
              </div>
            </small>
            <div v-html="excerpt(post.excerpt.rendered)" class="resumen"/>
            <router-link :to="{name:'post', params:{slug:post.slug}}" class="seguir">Seguir leyendo</router-link>
          </div>
        </article>
        <div class="pagination" v-if="posts != null && totalPages != null">
          <ul>
            <li><button @click="changePage(1)" :disabled="currentPage == 1">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"/></svg>
              <span class="sr-only">Ir a la primera página</span>
              </button>
            </li>
            <li v-for="page in totalPages" :key="page">
             <button :disabled="page == currentPage" @click="changePage(page)">{{page}}</button>
            </li>
            <li><button @click="changePage(totalPages)" :disabled="currentPage == totalPages">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"/></svg>
              <span class="sr-only">Ir a la última página</span>
              </button>
            </li>
          </ul>
        </div>
        
      </section>
      <aside class="col-lg-3">
        <h2 class="h3-size">Categorías</h2>
        <div v-if="categories == null">
          <ig-spinner></ig-spinner>
        </div>
        <ul v-else
            class="cats">
          <li v-for="category in categories" :key="category.id" v-if="category.count > 0">
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
import search from "./Search.vue";
import { mixx } from "./mixins/mixin.js";
export default {
  name: "Home",
  data() {
    return {
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      view: this.setView(),
      posts: null,
      categories: EventBus.$data.categories,
      totalPages: EventBus.$data.totalPages,
      currentPage: EventBus.$data.currentPage,

    };
  },
  //mixins: [mixx],
  components: {
    "ig-spinner": loader,
    "ig-search": search
  },
  mounted() {
    EventBus.$on("got-posts", this.updatePosts);
    EventBus.$on("got-categories", this.updateCategories);
    EventBus.$on("got-totalPages", this.updatePages);
     document
        .querySelector("meta[name='description']")
        .setAttribute("content", "Blog de Integratur");
      document.title = "Blog de Integratur";
    this.updatePosts();
    this.scrollTop();
  },
  methods: {
    setView() {
      if (localStorage.getItem("view") == null) {
        localStorage.setItem("view", "grid");
        return "grid";
      } else {
        return localStorage.getItem("view");
      }
    },
    updatePosts() {      
      if(EventBus.$data.posts != null){
        let postsPagina = []; 
        let post = null;
        
         for(let x = 0; x < EventBus.$data.perPage; x++){
          post = null;
          post = EventBus.$data.posts[((this.currentPage - 1) * EventBus.$data.perPage)+x ]; 
          
          if( post != null){
            postsPagina.push(post); 
          }else{
          }
        }

        this.posts = postsPagina;
      }
    },
    updateCategories() {
      this.categories = EventBus.$data.categories;
    },
    updatePages() {
      if(EventBus.$data.totalPages != null){
        this.totalPages = EventBus.$data.totalPages;
      }      
    },
    updateCurrentPage(){
        if(EventBus.$data.currentPage != null){
        this.currentPage = EventBus.$data.currentPage;
      }else{
        this.currentPage = 1;
      }
    },
    changePage(num){
        EventBus.setCurrentPage(num);  
        this.currentPage = EventBus.$data.currentPage;   
        this.updatePosts();
        this.scrollTop();
    },
    excerpt(text){
      let txt = text.replace(/<[^>]+>/g, '');
      if(txt.length > 120){
        txt= txt.slice(0, 120).trim().concat('...');
      }
      return txt;
    },
    localeDate(date) {
      let fecha = new Date(date).toLocaleDateString("es-ES", this.options);
      return fecha;
    },
    toggleView(view) {
      localStorage.setItem("view", view);
      this.view = view;
    },
     scrollTop() {   
      document.getElementById('scrollTop').scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
};
</script>
<style scoped>
aside h2 {
  padding: 0 0.5rem;
}
.pagination {
  flex-grow: 1;
  flex-basis: 100%;
}
.pagination ul{
  padding: 0;
  margin: 1rem;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border:none;
  width: 100%;
}
@media(max-width: 400px){
  .pagination ul{
    flex-direction: column;
  }
}
.pagination button{
  background-color: white;
  border:none;
  border:1px solid rgb(222, 226, 230);
  padding: .25rem 1rem;
  color: #167DB0;
  transition: all .25s ease;
}
.pagination button:disabled, .pagination button:hover:disabled{
  background-color: #c8dce2;
  color: white;
  cursor: not-allowed;
}
.pagination button:hover,.pagination button:focus{
  background-color: #167DB0;
  color: white;
}  
.pagination li:first-child button{
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pagination li:last-child button{
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.pagination svg{
  width: 1rem;
  height: 1rem;
  fill: #167DB0;
  padding-top: .25rem;
}
.pagination button:hover svg,.pagination button:focus svg{
  fill: white;
}  
.pagination button:disabled svg, .pagination button:hover:disabled svg{
fill: white;
}
</style>
