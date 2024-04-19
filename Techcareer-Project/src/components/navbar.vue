<template>
  <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">TECHCAREER.SHOP</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toogle">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="toogle">
        <div class="search-container d-flex justify-content-center align-items-center">
          <input class="form-control search-input" type="search" placeholder="Ürünleri ara..." aria-label="Ara" v-model="searchQuery">

          <button class="btn btn-outline-primary search-btn" @click="submitSearch">
            <i class="fa fa-search"></i>
          </button>

        </div>

        <div class="d-flex flex-row ms-auto me-2">
  <router-link to="/cart" class="btn btn-outline-primary me-2" aria-label="View shopping cart">
    <i class="fa fa-shopping-cart"></i>
  </router-link>

  <div class="nav-item dropdown">
    <a class="btn btn-outline-primary dropdown-toggle" href="#" role="button" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa fa-user"></i>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
      <li v-if="user"><router-link to="/logout" class="dropdown-item" @click="logout">Çıkış Yap</router-link></li>
      <li v-else><router-link to="/login" class="dropdown-item">Giriş Yap</router-link></li>
      <li v-if="!user"><router-link to="/register" class="dropdown-item">Kayıt Ol</router-link></li>
    </ul>
  </div>
</div>

      </div>
    </div>
  </nav>
</template>



<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      searchQuery: '',
      loggedInUser: null,
    };
  },
  created() {
    this.loggedInUser = this.getUserFromStorage(); 
  },
  methods: {
    submitSearch() {
      this.$router.push({ name: 'products', query: { search: this.searchQuery.trim().toLowerCase() }});
    },
    getUserFromStorage() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    logout() {
      localStorage.removeItem('user');
      this.loggedInUser = null; 
      this.$router.push('/');
    }
  },
  watch: {
  loggedInUser(newValue, oldValue) {
    console.log('User changed from', oldValue, 'to', newValue);
  }
},

  computed: {
    user() {
      return this.loggedInUser;
    }
  }
}
</script>


<style scoped>
.navbar {
  padding: 0.5rem 1rem; 
}
.search-container {
  flex-grow: 1;

}

.search-input {
  width: 100%;
  max-width: 500px;
  border-top-right-radius: 0; 
  border-bottom-right-radius: 0; 
}

.search-btn{
  border-top-left-radius: 0; 
  border-bottom-left-radius: 0;
}



</style>