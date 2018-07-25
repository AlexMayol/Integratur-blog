<template>
  <div>
    <div class="search-bar">
      <label for="search">
        <input id="search" v-model="searchText" type="text" placeholder="Buscar un post" :disabled="isReady == false" @keyup.enter="search()" maxlength="50"/>
         <button @click="search()" class="glass">
        <span class="sr-only">Buscar</span>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
      </button>
      </label>    
     
    </div>
    <transition  name="aparecer" mode="out-in" appear>
      <p class="alert-warning" v-if="closeAlert == false && isMatch == false && searchText.length >=0">{{errorMsg}} <button @click="close" aria-label="Cerrar alerta">&times;</button></p>
    </transition>
  </div>
</template>

<script>
import { EventBus } from "../eventBus.js";
import loader from "./spinner.vue";

export default {
  name: "Search",
  data() {
    return {
      errorMsg:'',
      isReady:false,
      closeAlert:null,
      searchText: '',
      results:[],
      isMatch:null,
    };
  },
  components: {
    "ig-spinner": loader
  },
  created() { 
    EventBus.$on("got-all", this.ready);
    EventBus.$data.posts != null ? this.isReady = true : this.isReady = false;
  },
  methods: {
    search(){
      this.results = [];
      
      if(this.searchText.length < 3){
        this.errorMsg = 'Introduzca más caractéres';
        this.isMatch = false;
        this.closeAlert = false;
      }else{
        for(let query of EventBus.$data.posts){
          if(query.title.rendered.includes(this.searchText) || query.excerpt.rendered.includes(this.searchText) || query.content.rendered.includes(this.searchText)){
            this.results.push(query);
          }
        }              
        if(this.results.length == 0){
           this.errorMsg = 'Sin coincidencias';
          this.isMatch = false;
           this.closeAlert = false;
        }else{
          this.errorMsg = '';
          EventBus.$data.searchResult = this.results;
          this.pushRoute();
        }
      }
    },
    close(){
      this.closeAlert = true;
    },
    pushRoute(){
      let formatURL = this.searchText.trim().replace(/ /gi, "-");
      this.$router.push({ name: 'search', params: { query : formatURL }})
    },
    ready(){
      this.isReady = true
    }
  }
};
</script>
<style scoped>
.alert-warning button{
  background-color: transparent;
  border:none;
  cursor: pointer;
}
.search-bar{
  border:1px solid #BEC5D1;
  border-radius: 2px;
  width: fit-content;
}
input{
  border:none;
  border-radius: 3px;
}
label{
  margin: 0;
}
.glass{
  border:none;
  background-color: #007EAE;

}
.glass svg{
  fill:white;
  width:1rem;
  height:1rem;
}

</style>
