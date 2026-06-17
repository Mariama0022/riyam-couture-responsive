// ============================================================
// SIDEBAR — composant HTML de la sidebar du dashboard
// ============================================================
export function sidebarHTML(activePath) {
  const links = [
    { path: '/dashboard',    icon: 'fa-th-large',      label: 'Tableau de bord' },
    { path: '/clients',      icon: 'fa-users',         label: 'Clients'         },
    { path: '/commandes',    icon: 'fa-shopping-bag',  label: 'Commandes'       },
    { path: '/recettes',     icon: 'fa-wallet',        label: 'Recettes'        },
    { path: '/statistiques', icon: 'fa-chart-line',    label: 'Statistiques'    },
    { path: '/models',       icon: 'fa-tshirt',        label: 'Models'          },
  ];

  const navItems = links.map(l => {
    const isActive = l.path === activePath;
    return `
      <a href="#" class="nav-link sidebar-link flex items-center gap-3 px-4 py-3 ${isActive ? 'active text-white' : 'text-gray-300'}"
         data-path="${l.path}" onclick="event.preventDefault(); App.navigate('${l.path}')">
        <i class="fas ${l.icon} w-5"></i>
        <span class="text-sm font-medium">${l.label}</span>
      </a>`;
  }).join('');

  return `
    <!-- Mobile toggle -->
    <button id="menuToggle" class="lg:hidden fixed top-4 left-4 z-50 bg-[#1A1D2E] text-white p-3 rounded-lg shadow-lg">
      <i class="fas fa-bars"></i>
    </button>
    <!-- Overlay -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden"></div>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar w-64 min-h-screen text-white flex flex-col fixed lg:relative z-50">
      <div class="p-6 border-b border-gray-700">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-[#E91E63] rounded-xl flex items-center justify-center">
            <i class="fas fa-cut text-2xl"></i>
          </div>
          <div>
            <h1 class="text-sm font-bold tracking-wide leading-tight">ATELIER DE<br>COUTURE</h1>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-4 space-y-1">${navItems}</nav>
      <div class="p-4 border-t border-gray-700">
        <a href="#" id="logoutBtn" class="sidebar-link flex items-center gap-3 px-4 py-3 text-gray-300">
          <i class="fas fa-sign-out-alt w-5"></i>
          <span class="text-sm font-medium">Déconnexion</span>
        </a>
      </div>
    </aside>`;
}

export function initSidebar() {
  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const sidebar    = document.getElementById('sidebar');
  const overlay    = document.getElementById('overlay');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('hidden');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.add('hidden');
    });
  }

  // Déconnexion
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', e => {
      e.preventDefault();
      if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        // Efface la session du localStorage
        App.store.currentUser = null;
        App.navigate('/');
      }
    });
  }
}
