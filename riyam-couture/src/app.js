// ============================================================
// APP.JS — bootstrap, gestion de session persistante
// ============================================================
import { store }    from './store.js';
import { navigate } from './router.js';

// Expose globalement pour les pages
window.App = { navigate, store };

// Si une session existe déjà → dashboard directement
// Sinon → page d'accueil
if (store.currentUser) {
  navigate('/dashboard');
} else {
  navigate('/');
}
