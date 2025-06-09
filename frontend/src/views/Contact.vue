<template>
  <main>
    <section class="contact">
      <div class="contact__info">
        <h2 class="contact__info-title">Informações de Contato</h2>
        <ul class="contact__info-list">
          <li class="contact__info-item">
            📞 +55 11 4034 7800
          </li>
          <li class="contact__info-item">
            📧 websupport@gmail.com
          </li>
          <li class="contact__info-item">
            📍 Av. Maj. Fernando Valle, 2013 - Bragança Paulista/SP
          </li>
        </ul>
      </div>

      <form class="contact__form" @submit.prevent="handleSubmit">
        <h3>Entre em Contato</h3>
        
        <div class="form__group">
          <label for="name" class="contact__label">Nome</label>
          <input
            type="text"
            id="name"
            v-model="form.nome"
            class="contact__input"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div class="form__group">
          <label for="email" class="contact__label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="contact__input"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div class="form__group">
          <label for="message" class="contact__label">Mensagem</label>
          <textarea
            id="message"
            v-model="form.mensagem"
            class="contact__textarea"
            rows="5"
            placeholder="Digite sua mensagem"
            required
          ></textarea>
        </div>

        <button type="submit" class="contact__button">Enviar Mensagem</button>
      </form>
    </section>

    <section class="map">
      <h2 class="map__title">Nossa Localização</h2>
      <div class="map__container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.0403139075684!2d-46.56107662468851!3d-22.948742379225553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cecbd5c86e1b01%3A0x4c01556c237aa0cc!2sAv.%20Maj.%20Fernando%20Valle%2C%202013%20-%20S%C3%A3o%20Miguel%2C%20Bragan%C3%A7a%20Paulista%20-%20SP%2C%2012903-000!5e0!3m2!1spt-BR!2sbr!4v1733826591588!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          style="border: 0;"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nome: '',
  email: '',
  mensagem: ''
})

const handleSubmit = () => {
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
  // Reset form
  form.nome = ''
  form.email = ''
  form.mensagem = ''
}
</script>

<style scoped>
.contact {
  display: flex;
  gap: 3rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.contact__info {
  flex: 1;
}

.contact__info-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}

.contact__info-list {
  list-style: none;
  padding: 0;
}

.contact__info-item {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #f4a261;
}

.contact__form {
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact__form h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.form__group {
  margin-bottom: 1.5rem;
}

.contact__label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.contact__input,
.contact__textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.contact__input:focus,
.contact__textarea:focus {
  outline: none;
  border-color: #f4a261;
}

.contact__textarea {
  resize: vertical;
  min-height: 120px;
}

.contact__button {
  width: 100%;
  background: #f4a261;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact__button:hover {
  background: #e76f51;
}

.map {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.map__title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.map__container {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .contact {
    flex-direction: column;
  }
  
  .contact__form {
    padding: 1.5rem;
  }
}
</style>