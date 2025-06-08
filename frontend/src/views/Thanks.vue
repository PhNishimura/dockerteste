<template>
    <!-- Conteúdo principal -->
    <main class="main">
      <section class="about">
        <div class="about__content" style="text-align: center;">
          <h1 class="about__title">Obrigado por sua visita!</h1>
          <p class="about__text" style="font-size: 1.2rem;">
            A equipe da <strong>ConcordSupplies</strong> agradece pela sua confiança.<br>
            Esperamos vê-lo em breve novamente. 💙
          </p>
          <router-link to="/" class="header__button" style="margin-top: 20px;">Voltar à Home</router-link>
        </div>
      </section>
    </main>
</template>

<script setup>
import { ref } from 'vue'

const theme = ref('theme-light')

function toggleTheme() {
  theme.value = theme.value === 'theme-light' ? 'theme-dark' : 'theme-light'
}
</script>

