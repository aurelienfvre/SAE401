<template>
  <div id="app">
    <router-view />
    <!-- Chaque composant de route s'affiche ici -->
  </div>
</template>

<script>
// Pas besoin d'importer CardContainer ici
export default {
  name: "App",
};
</script>
<style>
/* Vous pouvez définir le style de fond ici s'il est spécifique à une page */
.content {
  padding: 20px;
  /* Ajoutez plus de styles pour votre contenu ici */
}
</style>
