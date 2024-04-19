<template>
  <div class="register-container">
    <div class="custom-container">
      <div class="custom-form-wrapper">
        <h2>Kayıt Ol</h2>
        <form @submit.prevent="register" novalidate>
          <div class="custom-form-group">
            <label for="username" class="custom-label">Kullanıcı Adı</label>
            <input type="text" class="custom-input" id="username" v-model="username" required>
            <div v-if="errors.username" class="custom-error-message">{{ errors.username }}</div>
          </div>
          <div class="custom-form-group">
            <label for="email" class="custom-label">E-Posta</label>
            <input type="email" class="custom-input" id="email" v-model="email" required>
            <div v-if="errors.email" class="custom-error-message">{{ errors.email }}</div>
          </div>
          <div class="custom-form-group">
            <label for="password" class="custom-label">Şifre</label>
            <input type="password" class="custom-input" id="password" v-model="password" required>
            <div v-if="errors.password" class="custom-error-message">{{ errors.password }}</div>
          </div>
          <button type="submit" class="custom-button">Kayıt Ol</button>
          <p v-if="error" class="custom-error-message">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: false,
      errorMessage: '',
      errors: {} 
    };
  },
  methods: {
    register() {
      this.errors = {}; 
      
      if (!this.username || !this.email || !this.password) {
        this.error = true;
        this.errorMessage = 'Tüm alanları doldurunuz.';
        return;
      }

      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === this.email)) {
        this.errors.email = 'Bu e-posta daha önce kullanılmış.';
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: this.password
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      this.error = false;
      this.errorMessage = '';
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.custom-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.custom-form-wrapper {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.custom-form-group {
  margin-bottom: 20px;
}

.custom-label {
  font-size: 16px;
  color: #333;
}

.custom-input {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-button {
  width: 100%;
  padding: 10px;
  background-color: #0056b3;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #004494;
}

.custom-error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>
