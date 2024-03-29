<template>
  <CardContainer height="238vh">
    <CardPage
        :image="aboutImage"
        height="90rem"
        innerHeight="82rem"
        width="80%"
        innerBgColor="#fff"
    >
      <h1 class="title">Découvrez EcoLearn</h1>

      <h2 class="section-title">Notre Vision</h2>
      <p>
        Au cœur de l'innovation et de l'engagement pour un futur durable,
        EcoLearn révolutionne l'apprentissage de l'écologie. Nous démocratisons
        l'accès à l'éducation environnementale grâce à une plateforme immersive
        explorant la richesse des écosystèmes planétaires. Des océans aux
        déserts arides, EcoLearn est votre passerelle vers la découverte et la
        compréhension des merveilles naturelles et des défis écologiques
        actuels.
      </p>

      <h2 class="section-title">Les Piliers d'EcoLearn</h2>
      <p>
        Aurélien Fèvre, le maître d'œuvre technique, Karelle Truchy, l'artiste
        visuelle qui donne vie à nos idées, et Célia Khiev, la muse créative,
        composent le trio fondateur d'EcoLearn. Animés par une passion commune
        pour la technologie verte et l'innovation, nous fusionnons expertise
        technique, sens artistique et vision stratégique pour propulser EcoLearn
        au-devant de la scène éducative environnementale.
      </p>

      <h2 class="section-title">Notre Mission</h2>
      <p>
        EcoLearn s'engage à briser les barrières de l'apprentissage traditionnel
        en intégrant des techniques de gamification pour rendre l'éducation
        écologique accessible, captivante et mémorable. Nous aspirons à éveiller
        la curiosité et à encourager une action positive pour notre planète
        parmi un public mondial. Notre plateforme est conçue pour être un espace
        où apprendre rime avec plaisir et où chaque utilisateur peut devenir un
        acteur du changement.
      </p>
      <div class="values-container">
        <div class="value-section">
          <h2 class="value-title">Éducation</h2>
          <p>
            Chez EcoLearn, l'éducation est au cœur de notre mission. Nous
            proposons une approche novatrice pour apprendre et comprendre les
            enjeux environnementaux actuels, rendant l'apprentissage aussi
            enrichissant qu'engageant.
          </p>
        </div>
        <div class="vertical-hr"></div>
        <div class="value-section">
          <h2 class="value-title">Éco-conception</h2>
          <p>
            Notre plateforme est conçue avec une empreinte écologique minimale.
            Nous intégrons les principes d'éco-conception dès le début du
            processus de développement, assurant ainsi un impact environnemental
            réduit.
          </p>
        </div>
        <div class="vertical-hr"></div>
        <div class="value-section">
          <h2 class="value-title">Ludique</h2>
          <p>
            L'apprentissage par le jeu est au cœur de l'expérience EcoLearn.
            Nous croyons que la gamification est essentielle pour engager les
            utilisateurs et faciliter une compréhension profonde des sujets
            traités.
          </p>
        </div>
      </div>
      <div class="image">
        <img
            src="@/assets/about-image2.jpg"
            alt="Une équipe passionnée"
            draggable="false"
        />
      </div>
    </CardPage>
  </CardContainer>
  <Footer />
</template>

<script setup>
import CardContainer from "@/components/CardContainer.vue";
import CardPage from "@/components/CardPage.vue";
import Footer from "@/components/Footer.vue";
import aboutImage from "@/assets/about-image.jpg";
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
.values-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #d1e2fd;
  color: #002773;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 10px;
}

.value-section {
  width: 30%; /* Ajustez en fonction de la largeur de votre contenu */
  text-align: center;
}

.value-title {
  font-weight: bold;
  padding: 0.7rem;
}

.vertical-hr {
  width: 1px;
  background-color: #000;
  margin: 0 20px; /* Ajustez l'espacement selon vos besoins */
  flex-grow: 1; /* Permet à la ligne de s'étendre verticalement pour occuper tout l'espace disponible */
  height: 14rem;
}
.image {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
}
.image img {
  border-radius: 10px;
  width: 70%;
}
</style>