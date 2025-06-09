<template>
  <div class="app">
    <header class="header">
      <div class="header__top-bar">
        <div class="header__contact-info">
          <span class="header__contact-item">📞 +55-11-4034-7800</span>
          <span class="header__contact-item">📧 websupport@gmail.com</span>
        </div>
        <div class="header__social-icons">
          <a href="https://www.facebook.com/" target="_blank" title="Facebook" class="header__social-link">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" title="Instagram" class="header__social-link">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
          <a href="https://br.linkedin.com/" target="_blank" title="Linkedin" class="header__social-link">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <a href="https://x.com/" target="_blank" title="X" class="header__social-link">
            <font-awesome-icon :icon="['fab', 'x-twitter']" />
          </a>
        </div>
      </div>
      
      <nav class="header__nav">
        <h1 class="header__logo">ConcordSupplies</h1>
        
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <router-link to="/" class="header__nav-link">Home</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/products" class="header__nav-link">Produtos</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/about" class="header__nav-link">Sobre Nós</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/contact" class="header__nav-link">Contato</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/register" class="header__nav-link">Cadastro</router-link>
          </li>
          <li class="header__nav-item">
            <router-link to="/users" class="header__nav-link">Usuários</router-link>
          </li>
        </ul>
        
        <div class="header__cart-container">
          <router-link to="/cart" class="header__cart-link">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />
            <span v-if="cartStore.totalItems > 0" class="header__cart-count">
              {{ cartStore.totalItems }}
            </span>
          </router-link>
          <router-link to="/login" class="header__button">Login</router-link>
        </div>
      </nav>
    </header>

    <router-view />

    <footer class="footer">
      <div class="footer__container">
        <div class="footer__column">
          <h3 class="footer__title">Links</h3>
          <ul class="footer__list">
            <li class="footer__list-item">
              <router-link to="/" class="footer__link">Home</router-link>
            </li>
            <li class="footer__list-item">
              <router-link to="/products" class="footer__link">Produtos</router-link>
            </li>
            <li class="footer__list-item">
              <router-link to="/about" class="footer__link">Sobre Nós</router-link>
            </li>
            <li class="footer__list-item">
              <router-link to="/contact" class="footer__link">Contato</router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer__column">
          <h3 class="footer__title">Contato</h3>
          <ul class="footer__list">
            <li class="footer__list-item">+55-11-4034-7800</li>
            <li class="footer__list-item">websupport@gmail.com</li>
            <li class="footer__list-item">Av. Maj. Fernando Valle, 2013</li>
            <li class="footer__list-item">Bragança Paulista, São Paulo, Brasil</li>
          </ul>
        </div>
        
        <div class="footer__column">
          <h3 class="footer__title">Siga-nos</h3>
          <div class="footer__social-icons">
            <a href="https://www.facebook.com/" target="_blank" title="Facebook" class="footer__social-link">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" title="Instagram" class="footer__social-link">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://br.linkedin.com/" target="_blank" title="Linkedin" class="footer__social-link">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
            <a href="https://x.com/" target="_blank" title="X" class="footer__social-link">
              <font-awesome-icon :icon="['fab', 'x-twitter']" />
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer__bottom">
        <p class="footer__text">© Copyright 2024 - ConcordSupplies. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart.js'

const cartStore = useCartStore()
</script>