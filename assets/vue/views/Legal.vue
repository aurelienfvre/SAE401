<template>
  <CardContainer height="230vh">
    <CardPage
        :image="legalImage"
        height="86rem"
        innerHeight="78rem"
        width="80%"
        innerBgColor="#fff"
    >
      <h1 class="title">{{ $t('legal.title') }}</h1>

      <h2 class="section-title">{{ $t('legal.generalInfoTitle') }}</h2>
      <p>{{ $t('legal.generalInfo') }}</p>

      <h2 class="section-title">{{ $t('legal.creditsTitle') }}</h2>
      <p>{{ $t('legal.credits') }}</p>

      <h2 class="section-title">{{ $t('legal.intellectualPropertyTitle') }}</h2>
      <p>{{ $t('legal.intellectualProperty') }}</p>

      <h2 class="section-title">{{ $t('legal.personalDataProtectionTitle') }}</h2>
      <p>{{ $t('legal.personalDataProtection') }}</p>

      <h2 class="section-title">{{ $t('legal.securityTitle') }}</h2>
      <p>{{ $t('legal.security') }}</p>

      <h2 class="section-title">{{ $t('legal.applicableLawTitle') }}</h2>
      <p>{{ $t('legal.applicableLaw') }}</p>

      <h2 class="section-title">{{ $t('legal.liabilityLimitationTitle') }}</h2>
      <p>{{ $t('legal.liabilityLimitation') }}</p>

      <h2 class="section-title">{{ $t('legal.updateTitle') }}</h2>
      <p>{{ $t('legal.update') }}</p>

      <h2 class="section-title">{{ $t('legal.trackingDataTitle') }}</h2>
      <p>{{ $t('legal.trackingData') }}</p>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import {useI18n} from "vue-i18n";
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import legalImage from "@/assets/legal_image.webp";

const { t } = useI18n();

</script>

<style scoped>
.title {
  text-align: center;
  padding: 0 0 40px 0;
  font-weight: 500;
}

.section-title {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>