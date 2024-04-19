<template>
  <div class="odeme-sayfasi">
    <form id="payment-form" v-if="!odemeAlindi">
      <div class="input-group">
        <input type="text" placeholder="Adınız" v-model="ad" required />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Soyadınız" v-model="soyad" required />
      </div>
      <div class="input-group">
        <input type="email" placeholder="E-posta adresiniz" v-model="email" required />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Kart Numarası" maxlength="16" v-model="kartNumarasi" required />
      </div>
      <div class="input-group son-kullanma-cvv">
        <input type="text" placeholder="MM/YY" maxlength="5" style="width: 60px;" v-model="sonKullanmaTarihi" required />
        <input type="text" placeholder="CVV" maxlength="3" style="width: 60px;" v-model="cvv" required />
      </div>
      <button type="button" @click="odemeYap">Ödeme Yap</button>
      <p v-if="gosterUyari" class="uyari">Lütfen tüm alanları doldurun.</p> 
    </form>
    <div class="bildiri" v-if="odemeAlindi">
      Ödemeniz alındı. Teşekkür ederiz!cs
    </div>
  </div>
</template>

<script>
export default {
  name: 'OdemeSayfasi',
  data() {
    return {
      ad: '',
      soyad: '',
      email: '',
      kartNumarasi: '',
      sonKullanmaTarihi: '',
      cvv: '',
      odemeAlindi: false,
      gosterUyari: false
    };
  },
  methods: {
    odemeYap() {
      if (!this.ad || !this.soyad || !this.email || !this.kartNumarasi || !this.sonKullanmaTarihi || !this.cvv) {
        this.gosterUyari = true;
        return;
      }
      
     
      this.odemeAlindi = true;
      this.gosterUyari = false; 
     
      this.ad = '';
      this.soyad = '';
      this.email = '';
      this.kartNumarasi = '';
      this.sonKullanmaTarihi = '';
      this.cvv = '';
    }
  }
}
</script>
<style scoped>
.odeme-sayfasi {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 20px;
}

.input-group {
  margin-bottom: 10px; 
  display: flex; 
  justify-content: center; 
  margin-top: 10px;
}

.input-group input {
  width: 100%;
}

input[type="text"],
input[type="email"],
input[type="password"],
button {
  margin: 10px 0;
  padding: 8px;
  width: 90%;
  max-width: 400px;
}

.son-kullanma-cvv {
  display: flex; 
  justify-content: center; 
  align-items: center;
}

.son-kullanma-cvv input {
  margin-right: 8px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.bildiri {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}

.uyari {
  color: red;
  margin-top: -10px; 
  margin-bottom: 10px; 
}
</style>



