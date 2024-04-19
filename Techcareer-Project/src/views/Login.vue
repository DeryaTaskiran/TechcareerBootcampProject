<template>
  <div class="login-c">
    <div class="login-form">
      <div class="form">
        <h2>Giriş Yap</h2>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">E-posta</label>
            <input type="email" class="form-input" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Şifre</label>
            <input type="password" class="form-input" id="password" v-model="password" required>
          </div>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          <button type="submit" class="btn-login">Giriş Yap</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loggingIn: false
    };
  },
  methods: {
    login() {
      this.loggingIn = true;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === this.email);

      if (!user) {
        this.errorMessage = 'Bu e-posta kayıtlı değil.';
        this.loggingIn = false;
      } else if (user.password !== this.password) {
        this.errorMessage = 'Şifre yanlış.';
        this.loggingIn = false; 
      } else {
        
        localStorage.setItem('user', JSON.stringify({ username: user.username, email: this.email }));

       
        this.$root.$emit('user-logged-in', { username: user.username, email: this.email });

        
        this.$router.push('/');
        this.errorMessage = '';
        this.loggingIn = false; 
      }
    }
  }
};
</script>

<style scoped>
.login-c {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-form{
  width: 100%;
  max-width: 400px;
}

.form{
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 16px;
}

.form-input {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #0056b3;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #004494;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}
</style>

