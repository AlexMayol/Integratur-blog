<template>
  <header v-once>
    <h1 class="sr-only">Blog de Integratur</h1>
    <nav id="nav" class="contacto">
      <div class="desktop-nav">
        <a href="mailto:contacto@integratur.com">contacto@integratur.com</a>
          <ul class="tlf">
            <li lang="es"><img src="https://integratur.com/fotos/spanish.png" alt=""><span class="sr-only">Teléfono de contacto</span><span aria-hidden="true"> Español:</span><a href="tel:34965163210">(+34) 96 516 32 10</a></li>
            <li lang="en"><img src="https://integratur.com/fotos/english.png" alt=""><span class="sr-only">Contact us at</span><span aria-hidden="true"> English</span>:<a href="tel:34965163210">(+34) 96 516 32 10</a></li>
            <li lang="fr"><img src="https://integratur.com/fotos/francais.png" alt=""> Français:<a href="tel:34965163210">(+34) 96 516 32 10</a></li>
          </ul>
      </div>
      <div class="mobile-nav">
         <b-btn v-b-toggle.collapse1 class="toggler marg">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
         </b-btn>
          <b-collapse id="collapse1" class="mt-2 m-1">
                 <a href="mailto:contacto@integratur.com">contacto@integratur.com</a>
          <ul class="tlf">
            <li lang="es"><img src="https://integratur.com/fotos/spanish.png" alt=""><span class="sr-only">Teléfono de contacto</span><span aria-hidden="true">Español:</span><a href="tel:34965163210">(+34) 96 516 32 10</a></li>
            <li lang="en"><img src="https://integratur.com/fotos/english.png" alt=""><span class="sr-only">Contact us at</span> <span aria-hidden="true">English</span>:<a href="tel:34965163210">(+34) 96 516 32 10</a></li>
            <li lang="fr"><img src="https://integratur.com/fotos/francais.png" alt=""> Français:<a href="tel:34965163210">(+34) 96 516 32 10</a></li>
          </ul>
          </b-collapse>
      </div>     
    </nav>
    <nav class="menu">
      <div class="img-container"><img src="https://integratur.com/wp-content/uploads/2016/12/logo-integratur.png" alt=""></div>
      <ul class="menu-nav-desktop">
        <li><a href="https://integratur.com/#inicio" target="_blank" rel="noopener">INICIO</a></li>
        <li><a href="https://integratur.com/#porque" target="_blank" rel="noopener">ACCESIBILIDAD</a></li>
        <li><a href="https://integratur.com/#como" target="_blank" rel="noopener">SERVICIOS</a></li>
        <li><a href="https://integratur.com/#paraque" target="_blank" rel="noopener">ESTABLECIMIENTOS</a></li>
        <li><a href="https://integratur.com/#equipo" target="_blank" rel="noopener">EQUIPO</a></li>
        <li><a href="https://integratur.com/#proyectos" target="_blank" rel="noopener">PORTFOLIO</a></li>
        <li><a href="https://integratur.com/#contacto" target="_blank" rel="noopener">CONTACTO</a></li>
      </ul>
      <div class="menu-nav-mobile">
        <div style="margin:.25rem 0">
          <b-btn v-b-toggle.collapse2 class="toggler">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
          </b-btn>
          </div>
          <b-collapse id="collapse2" class="mt-2 m-1">
            <div class="collapser">             
              <ul>
                <li><a href="https://integratur.com/#inicio" target="_blank" rel="noopener">INICIO</a></li>
                <li><a href="https://integratur.com/#porque" target="_blank" rel="noopener">ACCESIBILIDAD</a></li>
                <li><a href="https://integratur.com/#como" target="_blank" rel="noopener">SERVICIOS</a></li>
                <li><a href="https://integratur.com/#paraque" target="_blank" rel="noopener">ESTABLECIMIENTOS</a></li>
                <li><a href="https://integratur.com/#equipo" target="_blank" rel="noopener">EQUIPO</a></li>
                <li><a href="https://integratur.com/#proyectos" target="_blank" rel="noopener">PORTFOLIO</a></li>
                <li><a href="https://integratur.com/#contacto" target="_blank" rel="noopener">CONTACTO</a></li>
              </ul>
            </div>
          </b-collapse>      
      </div>
    </nav>
  </header>
</template>

<script>
import bModal from "bootstrap-vue/es/components/modal/modal";
export default {
  name: "Header"
};
</script>

<style scoped>
.toggler {
  background-color: #0d4b67;
  padding-bottom: 0;
}
.marg{
  margin: 0 3vw;
}
.toggler svg {
  width: 1rem;
  fill: #F9EDD1;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  -webkit-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1) !important;
  -moz-box-shadow: 0 0 7px rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1) !important;
}
/*.menu ul   {
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.menu li {
  display: inline-block;
}*/
.img-container {
  max-width: 600px;
  margin: 1.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-container img {
  width: 100%;
}
ul {
  margin: 0.5rem 0;
  padding: 0;
}
.contacto li {
  display: inline-block;
  padding: 0 .5rem;
}
.menu-nav {
  display: flex;
  flex-direction: row;
}
.menu-nav li {
  padding: 0.5rem;
}
/*.menu-nav-desktop a, .menu-nav-mobile a {
  text-decoration: none;
  color: #0077a6;
  transition: all 0.25s ease;
  font-weight: 500;
}*/
[class^="menu-nav"]{
  font-weight: bold;
}
@media (min-width: 50.1rem) {
  .menu-nav-mobile {
    display: none;
  }
  .menu-nav-desktop {
    display: flex;
    list-style-type: none;
    justify-content: space-between;
    flex-direction: row;
    justify-content: space-between;
  }
  .menu-nav-desktop li {
    padding: 0.5rem;
  }
  .menu-nav-desktop li a{
    color: #0077a6;
  }
}
@media (max-width: 50rem) {
  .menu-nav-desktop {
    display: none;
  }
  .menu-nav-mobile{
    width: 100%;
    padding: 0 3vw;
  }
  .collapser {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .collapser ul{
    list-style-type: none;
    text-align: center;
    display: flex;
    flex-direction: column;

  }
  .collapser li{
    display: inline-block;
  }
  .collapser a{
    color: #0077a6;
  }
}

@media (max-width: 60rem) {
  .desktop-nav {
    display: none;
  }
  .mobile-nav {
    background-color: #666666;
    color: white;
  }
  .mobile-nav li a,
  .mobile-nav a {
    color: white;
  }
}
@media (min-width: 60.1rem) {
  .mobile-nav {
    display: none;
  }
  .desktop-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: white;
    background-color: #666666;
  }
  .desktop-nav li a,
  .desktop-nav a {
    color: white;
  }
}
</style>
