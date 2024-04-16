<template>
  <div class="card-page" :style="cardStyle">
    <div v-if="!props.dualInnerContainers" class="inner-container" :style="innerContainerStyle">
      <slot />
    </div>
    <div v-else class="dual-inner-containers">
      <div class="inner-container left" :style="innerContainerStyle">
        <slot name="left" />
      </div>
      <div class="inner-container right" :style="innerContainerStyleRight">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  image: String,
  height: { type: String, default: "50rem" },
  width: { type: String, default: "80%" },
  innerWidth: { type: String, default: "100%" },
  innerHeight: { type: String, default: "41.5rem" },
  innerBgColor: { type: String, default: "white" },
  innerPosition: { type: String, default: "center" },
  innerPadding: { type: String, default: "70px" },
  textAlignment: { type: String, default: "justify" },
  dualInnerContainers: { type: Boolean, default: false },
  innerWidthRight: { type: String, default: "50%" },
  innerBgColorRight: { type: String, default: "#fff" },
  innerPaddingRight: { type: String, default: "70px" },
  textAlignmentRight: { type: String, default: "justify" },
  borderRadius: { type: String, default: "20px" },
});

// Styles pour le premier conteneur interne
const innerContainerStyle = computed(() => {
  let margin;
  switch (props.innerPosition) {
    case "right":
      margin = "0 0 0 auto"; // Pour pousser le conteneur à droite
      break;
    case "left":
      margin = "0 auto 0 0"; // Pour pousser le conteneur à gauche
      break;
    case "center":
    default:
      margin = "auto"; // Centrer le conteneur
      break;
  }

  return {
    width: props.innerWidth,
    height: props.innerHeight,
    backgroundColor: props.innerBgColor,
    padding: props.innerPadding,
    textAlign: props.textAlignment,
    display: "block", // Modifié pour utiliser `display: block` pour faciliter le positionnement
    margin: margin, // Utilisez la marge calculée basée sur la position
    borderRadius: props.borderRadius,
  };
});

// Styles pour le second conteneur interne, si utilisé
const innerContainerStyleRight = computed(() => ({
  width: props.innerWidthRight,
  height: props.innerHeight, // Utilise la même hauteur que le premier conteneur
  backgroundColor: props.innerBgColorRight,
  padding: props.innerPaddingRight,
  textAlign: props.textAlignmentRight,
  display: "inline-block", // Conserve `display: inline-block` pour les conteneurs doubles
  verticalAlign: "top",
  borderRadius: props.borderRadius,
}));

const cardStyle = computed(() => ({
  width: props.width,
  margin: "40px auto 0 auto",
  padding: "70px",
  background: props.image ? `url(${props.image})` : "#D88BCA",
  height: props.height,
  borderRadius: "50px",
  backgroundSize: "cover",
}));
</script>

<style lang="scss" scoped>
.dual-inner-containers {
  display: flex;
  justify-content: space-between;
}

</style>
