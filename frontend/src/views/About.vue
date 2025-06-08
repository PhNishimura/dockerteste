<template>
    <main class="main">
      <section class="about">
        <div class="about__image">
          <img src="/imagens/aboutUs.png" alt="Equipe Concord Supplies" class="about__img" />
        </div>
        <div class="about__content">
          <h1 class="about__title">Sobre a Concord Supplies</h1>
          <p class="about__text">
            A Concord Supplies é uma empresa dedicada a fornecer produtos de qualidade para o seu escritório e organização.
            Com uma vasta gama de produtos e um compromisso com a excelência, estamos aqui para garantir que você tenha tudo o que precisa para o seu dia a dia.
          </p>
          <h2 class="about__subtitle">Nossa Missão</h2>
          <p class="about__text">
            Nossa missão é oferecer produtos de alta qualidade, acessíveis e inovadores, sempre priorizando a satisfação do cliente e o compromisso com a sustentabilidade e responsabilidade social.
          </p>
          <h2 class="about__subtitle">Nossos Valores</h2>
          <ul class="about__list">
            <li class="about__item">Qualidade: Compromisso com produtos de alta qualidade.</li>
            <li class="about__item">Inovação: Buscamos soluções inovadoras para o mercado de escritório.</li>
            <li class="about__item">Sustentabilidade: Respeito ao meio ambiente em todas as nossas operações.</li>
            <li class="about__item">Ética: Atuamos com transparência e integridade em todas as nossas ações.</li>
          </ul>
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

