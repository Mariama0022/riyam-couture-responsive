// ============================================================
// PAGE: RECETTES
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';

export function Recettes() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/recettes')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <h1 class="text-2xl lg:text-3xl font-semibold text-[#E91E63] text-center mb-8">RECETTES / PAIEMENTS</h1>

          <!-- Tableau + filtre -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div class="p-4 md:p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-5">Historique des recettes</h3>
              <div class="flex flex-col sm:flex-row gap-4 mb-6">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Du</label>
                  <input type="date" id="date-from" class="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Au</label>
                  <input type="date" id="date-to" class="form-input w-full px-4 py-2.5 border border-gray-300 rounded-lg">
                </div>
                <div class="flex items-end">
                  <button id="filterBtn" class="btn-primary w-full sm:w-auto px-8 py-2.5 text-white font-medium rounded-lg">
                    <i class="fas fa-filter mr-1"></i> Filtrer
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-gray-200">
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700">Montant (FCFA)</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 hidden md:table-cell">Date paiement</th>
                      <th class="text-left py-3 px-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Mode</th>
                      <th class="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="recettesTable" class="divide-y divide-gray-100"></tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Cartes résumé -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div class="card-hover bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center">
                  <i class="fas fa-wallet text-[#E91E63] text-2xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Total encaissé</p>
                  <p class="text-2xl font-bold text-gray-900" id="total-encaisse">0 FCFA</p>
                </div>
              </div>
            </div>
            <div class="card-hover bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                  <i class="fas fa-receipt text-blue-600 text-2xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Nombre de paiements</p>
                  <p class="text-2xl font-bold text-gray-900" id="nb-paiements">0</p>
                </div>
              </div>
            </div>
            <div class="card-hover bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
                  <i class="fas fa-calculator text-purple-600 text-2xl"></i>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Moyenne par commande</p>
                  <p class="text-2xl font-bold text-gray-900" id="moyenne-commande">0 FCFA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}

export function init() {
  initSidebar();
  const { store } = App;

  function renderRecettes(list = store.recettes) {
    document.getElementById('recettesTable').innerHTML = list.map(r => `
      <tr class="table-row">
        <td class="py-4 px-4 text-sm text-gray-800">${r.id}</td>
        <td class="py-4 px-4 text-sm text-gray-900 font-medium">${r.client}</td>
        <td class="py-4 px-4 text-sm font-semibold text-gray-900">${r.montant.toLocaleString('fr-FR')}</td>
        <td class="py-4 px-4 text-sm text-gray-600 hidden md:table-cell">${r.date}</td>
        <td class="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">${r.mode}</td>
        <td class="py-4 px-4 text-center">
          <button class="w-8 h-8 rounded-lg bg-[#E91E63] text-white inline-flex items-center justify-center hover:bg-[#C2185B]"
            onclick="alert('Détails: ${r.client}')">
            <i class="fas fa-eye text-xs"></i>
          </button>
        </td>
      </tr>`).join('');

    const total = list.reduce((s, r) => s + r.montant, 0);
    document.getElementById('total-encaisse').textContent   = total.toLocaleString('fr-FR') + ' FCFA';
    document.getElementById('nb-paiements').textContent     = list.length;
    document.getElementById('moyenne-commande').textContent = list.length
      ? Math.round(total / list.length).toLocaleString('fr-FR') + ' FCFA'
      : '0 FCFA';
  }

  document.getElementById('filterBtn').addEventListener('click', () => {
    const from = document.getElementById('date-from').value;
    const to   = document.getElementById('date-to').value;
    if (!from && !to) { renderRecettes(); return; }
    const parse = s => { const [d,m,y] = s.split('/'); return new Date(y, m-1, d); };
    renderRecettes(store.recettes.filter(r => {
      const d = parse(r.date);
      return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
    }));
  });

  renderRecettes();
}
