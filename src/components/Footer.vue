<template>
  <footer v-once>
    <button class="toTop" aria-hidden="true" @click="scrollTop()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"  viewBox="0 0 284.929 284.929" style="enable-background:new 0 0 284.929 284.929;" xml:space="preserve">
        <g>
          <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285   C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854   c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848   c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566   C284.929,199.378,283.984,197.188,282.082,195.285z" fill="#D1DCEC"/>
        </g>
      </svg>
      <span class="sr-only">Volver arriba</span>
    </button>
    <div class="img-container"><img src="https://integratur.com/wp-content/uploads/2016/03/1-BLANCO-INTEGRATUR-LOGO.png" alt="Logo de Integratur"></div>
    <nav class="mt2 mb1">
      <ul class="list">
        <li><a href="https://integratur.com/aviso-legal/" rel="noopener" target="_blank">Aviso legal</a></li> 
        <li><a href="https://integratur.com/politica-de-cookies/" rel="noopener" target="_blank">Política de coockies</a></li>
      </ul>
    </nav>
    <!--<nav>
      <ul class="list">
       <li>© Copyright Integratur </li>
       <li>Todos los derechos reservados</li>
       <li>{{currentYear}}</li>
       <li>Sitio web diseñado por Destribats Web Consulting</li>
      </ul>
    </nav>-->
    <p class="complement"><span aria-hidden="true">©</span> Copyright Integratur | Todos los derechos reservados | {{currentYear}} | Sitio web diseñado por Destribats Web Consulting</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  methods: {
    scrollTop() {   
      document.getElementById('scrollTop').scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }
};
</script>

<style scoped>
.toTop{
  background: none;
  padding: 0.25rem 1rem;
  width: 3.5rem;
  height: 2rem;
  border:none;
  position: absolute;
  top: 0;
  right: 0;
  margin: .5rem;
}
footer {
  position: relative;
  background-color: #004b67;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 0 1.5rem 0;
}
a {
  color: white;
  text-decoration: none;
}
a:focus {
  border: 0.4rem;
  outline: 2px solid;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline-block;
  color: white;
}
li + li:before {
  content: " | ";
  font-weight: bold;
  color: white;
  padding: 0 3px 0 6px;
}
.img-container {
  max-width: 50rem;
  padding: 0 1rem;
}
.img-container img {
  width: 100%;
}
.list {
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
}
.complement {
  padding: 0 1rem;
  color: white;
  text-align: center;
  line-height: 1.5;
}
@media (max-width: 300px) {
  .list {
    flex-direction: column;
    text-align: center;
  }
  .list li + li:before {
    content: none;
  }
}
</style>
