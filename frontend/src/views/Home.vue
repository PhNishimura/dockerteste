<template>
  <main>
    <section class="banner">
      <div class="banner__content">
        <h1 class="banner__title">All Office Products</h1>
        <h2 class="banner__subtitle">Under One Roof</h2>
        <p class="banner__text">Explore a variedade de materiais de escritório.</p>
        <router-link to="/products" class="banner__button">Ver Produtos</router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.banner {
  background: linear-gradient(135deg, #f4a261 0%, #e76f51 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.banner__content {
  max-width: 800px;
  padding: 2rem;
}

.banner__title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.banner__subtitle {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.banner__text {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.banner__button {
  display: inline-block;
  background: white;
  color: #f4a261;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.banner__button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .banner__title {
    font-size: 2rem;
  }
  
  .banner__subtitle {
    font-size: 1.5rem;
  }
}
</style>