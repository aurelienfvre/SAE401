<template>
  <div class="admin-container">
    <h1>Administration</h1>
    <button @click="logout" class="logout-button">Déconnexion</button>
    <div class="nav flex-column nav-pills" aria-orientation="vertical">
      <router-link class="nav-link" to="/admin/users">Gérer les utilisateurs</router-link>
      <router-link class="nav-link" to="/admin/quizzes">Gérer les quiz</router-link>
      <router-link class="nav-link" to="/admin/questions">Gérer les questions</router-link>
      <router-link class="nav-link" to="/admin/answers">Gérer les réponses</router-link>
      <router-link class="nav-link" to="/admin/progress">Gérer la progression</router-link>
    </div>
    <router-view></router-view> <!-- Zone où les composants enfants seront rendus -->
  </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Admin',
  setup() {
    const router = useRouter();

    const logout = () => {
      // Effacer le localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('userName');
      localStorage.removeItem('profilePictureUrl');

      // Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
      router.push('/login');
    };

    return {
      logout,
    };
  },
}
</script>


<style lang="scss" scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.nav {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.nav-link {
  display: block;
  padding: 10px 15px;
  background-color: #f8f9fa;
  color: #495057;
  text-decoration: none;
  border-bottom: 1px solid #dee2e6;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.nav-link:last-child {
  border-bottom: none;
}

.nav-link:hover, .nav-link.router-link-exact-active {
  background-color: #e9ecef;
  color: #007bff;
}

.logout-button {
  padding: 10px 15px;
  margin-top: 20px;
  background-color: #dc3545; /* Rouge */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #c82333; /* Rouge foncé */
}
</style>

