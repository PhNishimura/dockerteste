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
          <li class="about__item">✅ Qualidade: Compromisso com produtos de alta qualidade.</li>
          <li class="about__item">🚀 Inovação: Buscamos soluções inovadoras para o mercado de escritório.</li>
          <li class="about__item">🌱 Sustentabilidade: Respeito ao meio ambiente em todas as nossas operações.</li>
          <li class="about__item">🤝 Ética: Atuamos com transparência e integridade em todas as nossas ações.</li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 2rem 0;
}

.about {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  align-items: center;
}

.about__image {
  flex: 1 1 400px;
  text-align: center;
}

.about__img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.about__content {
  flex: 1 1 500px;
}

.about__title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.about__subtitle {
  font-size: 1.8rem;
  color: #f4a261;
  margin: 2rem 0 1rem 0;
}

.about__text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 1.5rem;
}

.about__list {
  list-style: none;
  padding: 0;
}

.about__item {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 1rem;
}

@media (max-width: 768px) {
  .about {
    flex-direction: column;
    text-align: center;
  }
  
  .about__title {
    font-size: 2rem;
  }
  
  .about__subtitle {
    font-size: 1.5rem;
  }
}
</style>