<template>
  <main>
    <h2 class="form__title">Cadastro</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form__group">
        <label for="cpf" class="form__label">CPF/CNPJ</label>
        <input v-model="form.cpf" type="text" id="cpf" name="cpf" placeholder="xxx.xxx.xxx-xx or xx.xxx.xxx.xxxx-xx" required>
      </div>

      <div class="form__group">
        <label for="client-type" class="form__label">Tipo Cliente</label>
        <select v-model="form.clientType" id="client-type" name="client-type">
          <option value="Pessoa Jurídica">Pessoa Jurídica</option>
          <option value="Pessoa Física">Pessoa Física</option>
        </select>
      </div>

      <div class="form__group">
        <label for="name" class="form__label">Nome</label>
        <input v-model="form.name" type="text" id="name" name="name" required>
        <small class="form__error-message" v-if="errors.name">Username must be between 3 and 25 characters.</small>
      </div>

      <div class="form__group">
        <label for="cep" class="form__label">Cep</label>
        <input v-model="form.cep" @blur="fetchCep" type="text" id="cep" name="cep" placeholder="00000-000" required>
      </div>

      <div class="form__group">
        <label for="street" class="form__label">Endereço</label>
        <input v-model="form.street" type="text" id="street" name="street" readonly>
      </div>

      <div class="form__group">
        <label for="number" class="form__label">Número</label>
        <input v-model="form.number" type="number" id="number" name="number" required>
      </div>

      <div class="form__group">
        <label for="state" class="form__label">Estado</label>
        <input v-model="form.state" type="text" id="state" name="state" readonly>
      </div>

      <div class="form__group">
        <label for="city" class="form__label">Cidade</label>
        <input v-model="form.city" type="text" id="city" name="city" readonly>
      </div>

      <div class="form__group">
        <label for="neighborhood" class="form__label">Bairro</label>
        <input v-model="form.neighborhood" type="text" id="neighborhood" name="neighborhood" readonly>
      </div>

      <div class="form__group">
        <label for="phone" class="form__label">Telefone</label>
        <input v-model="form.phone" type="tel" id="phone" name="phone" placeholder="DDD987654321" required>
      </div>

      <div class="form__group">
        <label for="email" class="form__label">Email</label>
        <input v-model="form.email" type="email" id="email" name="email" placeholder="mail@example.com" required>
        <small class="form__error-message" v-if="errors.email">Please enter a valid email address.</small>
      </div>

      <div class="form__group">
        <label for="password" class="form__label">Password:</label>
        <input v-model="form.password" type="password" id="password" name="password" class="form__input" placeholder="********" required>
        <small class="form__error-message" v-if="errors.password">Password must have at least 8 characters that include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character in (!@#$%^&*).</small>
      </div>

      <div class="form__group">
        <label for="confirmPassword" class="form__label">Confirm Password:</label>
        <input v-model="form.confirmPassword" type="password" id="confirmPassword" name="confirmPassword" class="form__input" placeholder="Reenter your password" required>
        <small class="form__error-message" v-if="errors.confirmPassword">Please enter the password again.</small>
      </div>

      <input type="hidden" name="_next" value="http://localhost/thankyou.html">
      <input type="hidden" name="_subject" value="Novo Cadastro">

      <button type="submit" class="form__button">Salvar</button>
    </form>
  </main>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  cpf: '',
  clientType: 'Pessoa Jurídica',
  name: '',
  cep: '',
  street: '',
  number: '',
  state: '',
  city: '',
  neighborhood: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  name: false,
  email: false,
  password: false,
  confirmPassword: false
});

const fetchCep = async () => {
  if (form.cep.length < 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${form.cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      form.street = data.logradouro;
      form.city = data.localidade;
      form.state = data.uf;
      form.neighborhood = data.bairro;
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
  }
};

const validateForm = () => {
  errors.name = form.name.length < 3 || form.name.length > 25;
  errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  errors.password = !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(form.password);
  errors.confirmPassword = form.password !== form.confirmPassword;

  return !Object.values(errors).includes(true);
};

const handleSubmit = () => {
  if (validateForm()) {
    // Aqui você pode usar fetch ou axios para enviar para formsubmit ou backend
    alert('Formulário válido e enviado!');
    // Exemplo de envio:
    // fetch('https://formsubmit.co/maurojircik@gmail.com', { method: 'POST', body: new FormData(formElement) })
  } else {
    alert('Por favor, corrija os erros no formulário.');
  }
};
</script>
