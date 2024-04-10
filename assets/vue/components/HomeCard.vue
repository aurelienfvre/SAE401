<template>
  <router-link :to="route" v-magnetic class="card-home"
               :class="[cardColor, { 'is-hovered': isHovered }]"
               @mouseenter="isHovered = true"
               @mouseleave="isHovered = false">
    <div class="image-wrapper">
      <img :src="imageSrc" alt="Image" class="card-image" draggable="false" />
    </div>
    <div class="text-content">
      <h3 class="card-title" :style="{ color: titleColor }">{{ title }}</h3>
      <p class="card-subtitle" :style="{ color: subtitleColor }">{{ subtitle }}</p>
    </div>
    <div class="button-wrapper">
      <IconButton
          :background-color="buttonColor"
          :button-text="buttonText"
          :text-color="textColor"
      />
    </div>
  </router-link>
</template>



<script setup>
import IconButton from "@/components/IconButton.vue";
import { ref } from 'vue';

const props = defineProps({
  cardColor: String,
  imageSrc: String,
  title: String,
  subtitle: String,
  titleColor: String,
  subtitleColor: String,
  route: String,
  buttonColor: String,
  buttonText: String,
  textColor: String,
});

const isHovered = ref(false);
</script>

<style>

.card-home {
  position: relative;
  width: 255.41px;
  height: 422px;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3.5rem; /* Ajuster selon besoin */
}

.card-image {
  max-width: 80%; /* Ajuster selon besoin */
  height: auto;
  object-fit: cover;
}

.text-content {
  padding: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.text-content h3 {
  font-size: 30px;
}

.card-title,
.card-subtitle {
  margin: 5px 0; /* Ajuster l'espacement entre le titre et le sous-titre */
}

.button-wrapper {
  position: absolute;
  bottom: 12px;
  right: 12px;
  left: 12px; /* Pour centrer le bouton, ajuster selon besoin */
  display: flex;
  justify-content: flex-end;
}
/* Ajouté dans HomeCard.vue */
.card-home:hover .icon {
  gap: 4px;
  width: 12rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
}

/* Ajoutez cette partie pour gérer la rotation de l'icône lors du survol de la carte */
.card-home.is-hovered .icon img {
  transform: rotate(45deg);
}
.icon:hover img {
  transform: rotate(45deg);
}



/* Ajustements spécifiques pour IconButton si nécessaire */
</style>