<template>
  <main class="container-fluid" id="main">
     <nav id="bread" aria-label="migas de pan" class="breadcrumb">
      <ul>
        <li>
          <router-link :to="{name:'home'}">Inicio</router-link>
        </li>
        <li v-if="post != null">
          Publicación: {{post.title.rendered}}
        </li>
      </ul>
    </nav>
    <div class="row">
      <div v-if="post == null">
        <ig-spinner></ig-spinner>
      </div>
      <section v-else class="col-md-9 full-post">        
        <h2>{{post.title.rendered}}</h2>
        <small><span class="sr-only">Fecha: </span>{{localeDate(post.modified)}}</small>
        <img class="img-banner" v-if="post != null && post._embedded.wpmedia != null" :src="post._embedded.wpmedia[0].source_url" alt="">
        <div v-html="post.content.rendered"  class="content"/>
        <div class="share">
          <h3>Comparte este post:</h3>
          <div class="share-icons">
            <a class="tuiter" target="_blank" :href="`http://twitter.com/share?text=${formatExcerpt()}&url=${formatURL()}&hashtags=${formatHashtags()}`">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"/></svg>
            </a>
            <a class="likin" target="_blank" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${formatURL()}&title=${formatTitle()}&summary=${formatExcerpt()}&source=LinkedIn`">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
            </a>
          </div>
        </div>
        <router-link :to="{name:'home'}" class="back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>
          Volver al blog
        </router-link>
      </section>
      <aside class="col-md-3 plr15" v-if="related.length > 0">
        <h2 class="h3-size">Noticias relacionadas</h2>
        <aside>
          <article v-for="rel in related" :key="rel.id" class="related">
            <router-link  :to="{name:'post', params:{slug:rel.slug}}">
            <h3>{{rel.title.rendered}}</h3>
            <small>{{localeDate(post.modified)}}</small>
            <p v-html="rel.excerpt.rendered"></p>
            </router-link>
          </article>
        </aside>
      </aside>
    </div>
  </main>
</template>

<script>
import { EventBus } from "../eventBus.js";
import axios from "axios";
import loader from "./spinner.vue";
import { mixx } from "./mixins/mixin.js";

export default {
  name: "Post",
  data() {
    return {
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      postList: EventBus.$data.posts,
      post: null,
      related: []
    };
  },
  watch: {
    $route: "updatePosts"
  },
  mixins: [mixx],
  components: {
    "ig-spinner": loader
  },
  created() {
    if (this.postList != null) {
      this.updatePosts();
    } else {
      this.getSinglePost();
      this.scrollTop();
    }
    EventBus.$on("got-posts", this.updatePosts);
  },
  methods: {
    getSinglePost() {
      let slug = this.$route.params.slug;
      let self = this;
      axios
        .get(
          `https://integratur.com/wp-json/wp/v2/posts?_embed&slug=` + slug + ``
        )
        .then(function(response) {
          let string = JSON.stringify(response.data[0]);
          let res = string.replace(/wp:featuredmedia/gi, "wpmedia");
          res = res.replace(/wp:term/gi, "wpterm");
          let data = JSON.parse(res);

          self.post = data;
          self.updateMeta();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updatePosts() {
      this.postList = EventBus.$data.posts;
      for (let p of this.postList) {
        if (p.slug == this.$route.params.slug) {
          this.post = p;
          break;
        }
      }
      this.updateMeta();
      this.related = [];
      for (let rel of this.postList) {
        if (
          rel._embedded.wpterm[0][0].slug ==
            this.post._embedded.wpterm[0][0].slug &&
          rel.id != this.post.id
        ) {
          this.related.push(rel);
        }
      }
      this.scrollTop();
    },
    formatTitle() {
      return this.post.title.rendered;
    },
    formatExcerpt() {
      let exc = this.post.excerpt.rendered;
      exc = exc.replace("<p>", "");
      exc = exc.replace("</p>", "");
      exc = exc.replace("\n", "");
      return exc;
    },
    formatURL() {
      let url = "https://blog.integratur.com/#/post/".concat(this.$route.params.slug).replace('#','%23' );
      return url;
    },
    formatHashtags() {
      let arr = [];
      for (let cat of this.post._embedded.wpterm[0]) {
        arr.push(cat.name);
      }
      return arr;
    },
    updateMeta() {
      let content = this.post.excerpt.rendered.replace("<p>", "");
      content = content.replace("</p>", "");
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", content);
      document.title = this.post.title.rendered + " | Blog de Integratur";
    },
    localeDate(date) {
      let fecha = new Date(date).toLocaleDateString("es-ES", this.options);
      return fecha;
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: .5rem;
}
h3 {
  font-size: 1.25rem;
}
small {
  color: #61646b;
}
.related {
  border: 1px solid gainsboro;
  border-radius: 2px;
  margin: 0;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
}
.related h3 {
  margin: 0.5rem 0;
}
.related p {
  margin: 0.25rem 0;
}
.related a {
  color: initial;
  text-decoration: none;
}
.full-post {
  padding: 0 15px;
  line-height: 1.6;
}
img.aligncenter {
  text-align: center;
}
.img-banner {
  width: 100%;
  height: 15rem;
  object-fit: cover;
  margin: 2rem 0;
}
.plr15{
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}
</style>
