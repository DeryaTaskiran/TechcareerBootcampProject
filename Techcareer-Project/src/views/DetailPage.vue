<template>
  <div class="product-details">
    <h1>{{ product.name }}</h1>
    <img :src="currentImage" :alt="product.name + ' image'" class="product-image">
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <button @click="addToCart(product)" class="add-to-cart">Sepete Ekle</button>
  </div>
</template>

<script>
import productsData from '@/data/products.json';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: {},
    };
  },
  created() {
    const productId = parseInt(this.$route.params.id);
    this.product = productsData.find(product => product.id === productId);
  },
  computed: {
    currentImage() {
      return this.product.images ? this.product.images[0] : this.product.image;
    }
  },
  methods: {
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let found = cart.find(prod => prod.id === product.id);
      if (found) {
        found.quantity = (found.quantity || 1) + 1;  
      } else {
        product.quantity = 1; 
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart)); 
    },
  }
}
</script>

<style scoped>
.product-details {
  text-align: center;
  margin: 20px auto;
  width: 80%;
}

.product-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 20px;
}

.add-to-cart {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>
