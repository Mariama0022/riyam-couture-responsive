// ============================================================
// ROUTER — système de navigation SPA (lazy loading)
// ============================================================

const routes = {
  '/':             './pages/Intro/Intro.js',
  '/connexion':    './pages/Connexion/Connexion.js',
  '/inscription':  './pages/Inscription/Inscription.js',
  '/dashboard':    './pages/Dashboard/Dashboard.js',
  '/clients':      './pages/Clients/Clients.js',
  '/commandes':    './pages/Commandes/Commandes.js',
  '/recettes':     './pages/Recettes/Recettes.js',
  '/statistiques': './pages/Statistiques/Statistiques.js',
  '/models':       './pages/Models/Models.js',
};

export async function navigate(path) {
  const app = document.getElementById('app');
  if (!app) return;

  const modulePath = routes[path] ?? routes['/'];

  // Chargement dynamique du module de la page
  const mod = await import(modulePath);

  // Injection du HTML
  app.innerHTML = mod[getPageName(path)]();

  // Scroll en haut
  window.scrollTo(0, 0);

  // Initialisation de la page
  if (mod.init) mod.init();
}

// Retourne le nom de la fonction export depuis le path
function getPageName(path) {
  const map = {
    '/':             'Intro',
    '/connexion':    'Connexion',
    '/inscription':  'Inscription',
    '/dashboard':    'Dashboard',
    '/clients':      'Clients',
    '/commandes':    'Commandes',
    '/recettes':     'Recettes',
    '/statistiques': 'Statistiques',
    '/models':       'Models',
  };
  return map[path] ?? 'Intro';
}
