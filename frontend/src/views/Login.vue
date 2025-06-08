<template>
    <main>
      <section class="login">
        <div class="login__container">
          <div class="login__card">
            <h2 class="login__title">Login</h2>
            <form class="login__form" @submit.prevent="handleLogin">
              <div class="login__form-group">
                <label for="email" class="login__label">E-mail</label>
                <input type="email" id="email" v-model="email" class="login__input" required>
              </div>
              <div class="login__form-group">
                <label for="password" class="login__label">Senha</label>
                <input type="password" id="password" v-model="password" class="login__input" required>
                <a href="#" class="login__forgot-password">Esqueceu a senha?</a>
              </div>
              <button type="submit" class="login__button">Entrar</button>
              <div class="login__register-link">
                Não tem uma conta? <router-link to="/register">Cadastre-se</router-link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('E-mail:', email.value)
  console.log('Senha:', password.value)
  alert('Login realizado com sucesso! (simulado)')
}

const toggleTheme = () => {
  document.body.classList.toggle('theme-light')
  document.body.classList.toggle('theme-dark')
}
</script>

