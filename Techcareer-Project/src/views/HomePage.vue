<template>
  <div class="container mt-5">
    <div v-if="alertMessage" class="alert" :class="{'alert-warning': alertMessage.type === 'warning', 'alert-success': alertMessage.type === 'success'}">
      {{ alertMessage.text }}
    </div>
    <div class="grid">
      <div class="grid-item" v-for="product in filteredProducts" :key="product.id">
        <div class="card mb-3 shadow-sm">
          <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
            <img :src="getFirstImage(product)" class="card-img" :alt="product.name">
          </router-link>
          <div class="card-body">
            <h5 class="card-title" @click="goToProductDetails(product.id)">{{ product.name }}</h5>
            <p class="card-text" @click="goToProductDetails(product.id)">{{ product.description }}</p>
            <div class="d-flex flex-column align-items-center">
              <span class="price">{{ product.price }}</span>
              <button type="button" class="btn btn-primary" @click="addToCart(product)">Sepete Ekle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsData from '@/data/products.json';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      searchQuery: this.$route.query.search || '',
      alertMessage: null
    };
  },
  created() {
    this.products = productsData;
  },
  watch: {
    '$route'(to) {
      this.searchQuery = to.query.search || '';
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let found = cart.find(prod => prod.id === product.id);
      if (found) {
        found.quantity = (found.quantity || 1) + 1;  
        this.alertMessage = {text: 'Ürün miktarı artırıldı.', type: 'success'};
        setTimeout(() => {
          this.alertMessage = null;
        }, 4000);
      } else {
        product.quantity = 1; 
        cart.push(product);
        this.alertMessage = {text: 'Ürün sepete eklendi!', type: 'success'};
        setTimeout(() => {
          this.alertMessage = null;
        }, 3000);
      }
      localStorage.setItem('cart', JSON.stringify(cart)); 
    },
    goToProductDetails(productId) {
      this.$router.push({ name: 'ProductDetails', params: { id: productId } });
    },
    getFirstImage(product) {
      // Check if the product has images array
      if (Array.isArray(product.image) && product.image.length > 0) {
        return product.image[0]; // Return the first image
      } else if (typeof product.image === 'string') {
        return product.image; // Return the single image URL
      } else {
        return ''; // Return empty string if there are no images
      }
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px; 
}

.btn-primary {
  width: 100%; 
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: grey; 
}
</style>



