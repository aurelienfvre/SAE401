<template>
  <div class="buttons-wrapper">
    <router-link to="/ocean" class="action-button play-button">
      {{ $t('playbuttons.play') }}
    </router-link>
    <router-link to="/ocean" class="action-button svg-button">
      <!-- SVG ici -->
      <svg
          width="95"
          height="16"
          viewBox="0 0 95 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M94.7071 8.70711C95.0976 8.31658 95.0976 7.68342 94.7071 7.29289L88.3431 0.928933C87.9526 0.538408 87.3195 0.538408 86.9289 0.928933C86.5384 1.31946 86.5384 1.95262 86.9289 2.34315L92.5858 8L86.9289 13.6569C86.5384 14.0474 86.5384 14.6805 86.9289 15.0711C87.3195 15.4616 87.9526 15.4616 88.3431 15.0711L94.7071 8.70711ZM0 9L94 9V7L0 7V9Z"
            fill="black"
        />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>


<style lang="scss" scoped>
.buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  grid-column: 5;
  position: relative;
  bottom: 3rem;
  left: 2rem;

  &:hover .action-button {
    transform: rotate(0deg);
  }

  .action-button {
    border: 1px solid #333;
    color: #333;
    text-decoration: none;
    transition: transform 0.3s ease;
    font-size: 1.5rem;
    border-radius: 50px;
  }

  .play-button {
    transform: rotate(-5deg);
    padding: 5px 50px;
  }

  .svg-button {
    transform: rotate(5deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 40px;

    svg path {
      fill: #333;
    }
  }
}

</style>