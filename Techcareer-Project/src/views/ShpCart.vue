<template>
  <div class="container mt-5">
    <div v-if="cartItems.length > 0">
      <ul class="list-group cart-list">
        <li class="list-group-item cart-item" v-for="item in cartItems" :key="item.id">
          <div class="item-content d-flex align-items-center">
            <div class="item-image flex-grow-0">
              <img :src="item.image" class="item-img img-fluid" :alt="item.name">
            </div>
            <div class="item-details flex-grow-1">
              <h4 class="item-name">{{ item.name }}</h4>
              <p class="item-description">{{ item.description }}</p>
              <div class="quantity-section d-flex justify-content-between align-items-center">
                <div>
                  <span class="item-price">{{ item.price }}</span>
                  <div class="quantity-controls d-flex align-items-center">
                    <button class="quantity-btn btn btn-sm btn-outline-secondary" @click="decrementQuantity(item)">
                      <i class="fa fa-minus"></i>
                    </button>
                    <span class="quantity-badge mx-2">{{ item.quantity }}</span>
                    <button class="quantity-btn btn btn-sm btn-outline-secondary" @click="incrementQuantity(item)">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button class="remove-btn btn btn-sm btn-outline-danger" @click="removeFromCart(item)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="subtotal-section mt-3 text-right">
        <h4>Ara Toplam: <span class="subtotal-custom">{{ calculateSubtotal }} TL</span></h4>
        <button class="checkout-btn btn btn-success" @click="approveCart">Sepeti Onayla</button>
      </div>
    </div>
    <div v-else class="empty-cart text-center">
      <i class="empty-cart-icon fas fa-shopping-cart"></i>
      <h3 class="empty-cart-heading">Sepetim</h3>
      <p class="empty-cart-text">Sepetinizde ürün bulunmuyor.</p>
      <button class="start-shopping-btn btn btn-primary" @click="goToProducts">Alışverişe Başla</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    calculateSubtotal() {
      return this.cartItems.reduce((acc, item) => acc + (item.quantity * parseFloat(item.price.replace(' TL', '').replace('.', '').replace(',', '.'))), 0).toFixed(2);
    }
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    },
    incrementQuantity(item) {
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(item);
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    removeFromCart(itemToRemove) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    goToProducts() {
      this.$router.push('/'); 
    },
    approveCart() {
      this.$router.push('/Checkout');
    }
  }
};
</script>

<style scoped>
.cart-list {
  padding: 0;
}

.cart-item {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
}

.item-content {
  padding: 10px;
}

.item-image {
  max-width: 100px;
}

.item-img {
  max-width: 100%;
  height: auto;
}

.item-details {
  padding-left: 10px;
}

.item-name {
  margin: 0;
}

.item-description {
  margin: 5px 0;
}

.quantity-section {
  display: flex;
  align-items: center;
}

.item-price {
  margin-right: 10px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  cursor: pointer;
}

.quantity-badge {
  margin: 0 5px;
}

.remove-btn {
  color: red;
  cursor: pointer;
}

.subtotal-section {
  margin-top: 20px;
}

.checkout-btn {
  border-radius: 4px;
}

.empty-cart {
  padding: 50px;
}

.empty-cart-icon {
  font-size: 5rem;
  color: #ccc;
}

.empty-cart-heading {
  margin-top: 20px;
}

.empty-cart-text {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
