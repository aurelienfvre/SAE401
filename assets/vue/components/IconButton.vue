<template>
  <div class="icon" :style="{ backgroundColor, color: textColor }">
    <span>{{ buttonText }}</span>
    <img src="@/assets/arrow-1f86b4bc.svg" alt="Arrow Icon" />
  </div>
</template>


<script setup>
const props = defineProps({
  to: String,
  buttonText: String,
  backgroundColor: String,
  textColor: String,
});
</script>

<style scoped>
.icon {
  background: white;
  padding: 0.5rem;
  border-radius: 150px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  width: 3rem;
  height: 3rem;
  transition: ease-in-out 0.4s;
  overflow: hidden;
  gap: 18px;
  white-space: nowrap; /* Ajouté pour empêcher le texte de passer à la ligne */
  text-decoration: none;
  font-weight: bold;
}

.icon:hover {
  gap: 4px;
  width: 12rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
}

.icon:hover img {
  transform: rotate(45deg);
}

.icon img {
  width: 2rem;
  height: 2rem;
  transition: cubic-bezier(0.25, 0.24, 0.63, 1.53) 0.25s;
}
</style>
