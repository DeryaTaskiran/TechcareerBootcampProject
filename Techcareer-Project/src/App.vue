<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <div>
      <SiteFooter />
    </div>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue';
import SiteFooter from './components/footersite.vue'; 

export default {
  name: 'App',
  components: {
    Navbar,
    SiteFooter
  }
}
</script>

<style>
body {
  background-color: #f0f8ff;
}
</style>

