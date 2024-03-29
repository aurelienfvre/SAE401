<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="nav-logo">
        <img
          src="@/assets/ecolearn.svg"
          alt="Logo EcoLearn"
          draggable="false"
        />
      </router-link>
      <div class="nav-center-items">
        <router-link to="/" class="nav-item" data-content="Accueil"
          ><span>Accueil</span></router-link
        >
        <router-link to="/education" class="nav-item" data-content="Éducation"
          ><span>Éducation</span></router-link
        >
        <router-link to="/about" class="nav-item" data-content="À propos"
          ><span>À propos</span></router-link
        >
        <router-link to="/contact" class="nav-item" data-content="Contact"
          ><span>Contact</span></router-link
        >
      </div>
      <div class="nav-right-items">
        <button class="language-btn" data-content="fr/en">fr/en</button>
        <router-link to="/login" class="login-btn" data-content="Se connecter"
          ><span>Se connecter</span></router-link
        >
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1.25rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70rem;
}

.nav-logo {
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-center-items {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item {
  position: relative;
  overflow: hidden;
  margin: 0 1rem;
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  margin-top: 15px;
  cursor: pointer;
}

.nav-item::after {
  content: attr(data-content);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s;
  transform: translateY(100%);
  color: #000; /* Assurez-vous que cette couleur est visible sur votre fond */
}

.nav-item > span {
  display: inline-block;
  transition: transform 0.25s, opacity 0.25s;
}

.nav-item:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.nav-item:hover > span {
  transform: translateY(-100%);
  opacity: 0;
}

.nav-right-items {
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-btn {
  margin-left: 1rem;
  padding: 0.2rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 15px;
  background-color: transparent;
  color: #333;
}

.login-btn {
  --color: #333; /* Couleur de base du bouton */
  margin-left: 1rem;
  padding: 0.2rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 15px;
  background-color: transparent;
  color: var(--color);
  border: 1px solid var(--color);
  text-decoration: none;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  transition: color 0.5s;
  font-weight: 500;
  z-index: 1;
}

.login-btn::before {
  content: "";
  position: absolute;
  z-index: -1;
  background: var(--color);
  height: 150px;
  width: 200px;
  border-radius: 50%;
  top: 100%;
  left: -100%;
  transition: all 0.7s;
}

.login-btn:hover {
  color: #fff;
}

.login-btn:hover::before {
  top: -30px;
  left: -30px;
}

.login-btn:active::before {
  background: #333; /* Couleur de background lors du clic */
  transition: background 0s;
}

.login-btn > span {
  display: inline-block;
  transition: transform 0.25s, opacity 0.25s;
  opacity: 1;
}

.login-btn::after {
  content: attr(data-content);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s;
  transform: translateY(100%);
  color: #fff; /* Couleur du texte au hover */
}

.login-btn:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.login-btn:hover > span {
  transform: translateY(-100%);
  opacity: 0;
}
/* Suppression des styles d'animation pour .language-btn et .login-btn */
</style>
