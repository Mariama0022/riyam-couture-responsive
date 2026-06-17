// ============================================================
// PAGE: DASHBOARD
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';
import { statusBadge, formatPrix }  from '../../utils.js';

export function Dashboard() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/dashboard')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <h1 class="text-2xl lg:text-3xl font-semibold text-[#E91E63] text-center mb-2">TABLEAU DE BORD</h1>
          <p id="dashWelcome" class="text-center text-gray-500 mb-1 text-sm"></p>
          <p id="dashDate"    class="text-center text-gray-400 text-sm mb-8"></p>

          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div class="stat-card p-6">
              <div class="flex items-start justify-between">
                <div><p class="text-gray-500 text-sm mb-1">Total clients</p><h3 class="text-3xl font-bold text-gray-900" id="dash-clients">0</h3></div>
                <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#F3E5F5"><i class="fas fa-users text-2xl" style="color:#9C27B0"></i></div>
              </div>
            </div>
            <div class="stat-card p-6">
              <div class="flex items-start justify-between">
                <div><p class="text-gray-500 text-sm mb-1">Total commandes</p><h3 class="text-3xl font-bold text-gray-900" id="dash-commandes">0</h3></div>
                <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#E3F2FD"><i class="fas fa-shopping-bag text-2xl" style="color:#2196F3"></i></div>
              </div>
            </div>
            <div class="stat-card p-6">
              <div class="flex items-start justify-between">
                <div><p class="text-gray-500 text-sm mb-1">En cours</p><h3 class="text-3xl font-bold text-gray-900" id="dash-encours">0</h3></div>
                <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#FFF3E0"><i class="fas fa-clock text-2xl" style="color:#FF9800"></i></div>
              </div>
            </div>
            <div class="stat-card p-6">
              <div class="flex items-start justify-between">
                <div><p class="text-gray-500 text-sm mb-1">Recettes totales</p><h3 class="text-3xl font-bold text-gray-900" id="dash-recettes">0 F</h3></div>
                <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#E8F5E9"><i class="fas fa-wallet text-2xl" style="color:#4CAF50"></i></div>
              </div>
            </div>
          </div>

          <!-- Dernières commandes -->
          <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Dernières commandes</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Client</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vêtement</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody id="dashOrdersTable" class="divide-y divide-gray-100"></tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}

export function init() {
  initSidebar();
  const { store } = App;

  // Bienvenue + date
  if (store.currentUser) {
    const h   = new Date().getHours();
    const msg = h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir';
    document.getElementById('dashWelcome').textContent = `${msg}, ${store.currentUser.name} !`;
  }
  const opts = { day:'2-digit', month:'long', year:'numeric' };
  document.getElementById('dashDate').textContent =
    "Aujourd'hui : " + new Date().toLocaleDateString('fr-FR', opts);

  // Stats
  const encours  = store.orders.filter(o => o.statut === 'En cours').length;
  const totalRec = store.recettes.reduce((s, r) => s + r.montant, 0);
  document.getElementById('dash-clients').textContent   = store.clients.length;
  document.getElementById('dash-commandes').textContent = store.orders.length;
  document.getElementById('dash-encours').textContent   = encours;
  document.getElementById('dash-recettes').textContent  = formatPrix(totalRec);

  // Table
  document.getElementById('dashOrdersTable').innerHTML =
    store.orders.slice(-4).map(o => `
      <tr class="table-row">
        <td class="px-4 py-3 text-sm text-gray-700">${o.id}</td>
        <td class="px-4 py-3 text-sm text-gray-900 font-medium">${o.client}</td>
        <td class="px-4 py-3 text-sm text-gray-700">${o.vetement}</td>
        <td class="px-4 py-3">${statusBadge(o.statut)}</td>
      </tr>`).join('');
}
