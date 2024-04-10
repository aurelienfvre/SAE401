<template>
  <div
      class="card-container"
      :style="{ height: props.height, width: props.width }"
  >
    <NavBar />
    <slot />
    <!-- Ici, le contenu spécifique à chaque page sera injecté -->
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import NavBar from "./NavBar.vue";

const props = defineProps({
  height: {
    type: String,
    default: "146vh", // Valeur par défaut si non spécifiée
  },
  width: {
    type: String,
    default: "90vw", // Valeur par défaut si non spécifiée
  },
});
</script>

<style scoped>
.card-container {
  background-color: #ffffff;
  max-width: 1546px; /* Largeur maximale pour les grands écrans */
  margin: 3rem auto; /* Marge supérieure et centrage horizontal */
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 0rem; */
  padding: 20px;
}
</style>