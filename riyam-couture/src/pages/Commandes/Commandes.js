// ============================================================
// PAGE: COMMANDES
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';
import { showToast, statusBadge, formatPrix } from '../../utils.js';

export function Commandes() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/commandes')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <h1 class="text-2xl lg:text-3xl font-semibold text-[#E91E63] text-center mb-8">GESTION DES COMMANDES</h1>

          <!-- Formulaire nouvelle commande -->
          <div class="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-6 border border-gray-100">
            <h3 class="text-lg font-bold text-gray-800 mb-5">Nouvelle commande</h3>
            <form id="orderForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Client</label>
                  <input type="text" id="order-client" placeholder="Nom complet"
                    class="form-input w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Vêtement</label>
                  <input type="text" id="order-vetement" placeholder="Type de vêtement"
                    class="form-input w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Prix (FCFA)</label>
                  <input type="number" id="order-prix" placeholder="Prix"
                    class="form-input w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Date de livraison</label>
                  <div class="relative">
                    <input type="text" id="order-date" placeholder="jj/mm/aaaa"
                      class="form-input w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 pr-10">
                    <i class="fas fa-calendar-alt absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                  <select id="order-statut" class="form-input w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer">
                    <option>En cours</option>
                    <option>Terminé</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                <i class="fas fa-plus"></i> Ajouter une commande
              </button>
            </form>
          </div>

          <!-- Recherche -->
          <div class="mb-6">
            <label class="block text-sm font-bold text-gray-800 mb-2">Rechercher</label>
            <div class="relative">
              <input type="text" id="orderSearch" placeholder="ID, client, vêtement, statut..."
                class="form-input w-full px-5 py-3.5 pl-12 border border-gray-200 rounded-xl bg-white shadow-sm">
              <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#E91E63]"></i>
            </div>
          </div>

          <!-- Tableau -->
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Client</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Vêtement</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Prix</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Livraison</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Statut</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody id="ordersTable" class="divide-y divide-gray-100"></tbody>
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

  function renderTable(list = store.orders) {
    document.getElementById('ordersTable').innerHTML = list.map(o => `
      <tr class="table-row">
        <td class="px-6 py-4 text-sm font-semibold text-gray-900">${o.id}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${o.client}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${o.vetement}</td>
        <td class="px-6 py-4 text-sm font-semibold text-gray-900">${formatPrix(o.prix)}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${o.date}</td>
        <td class="px-6 py-4">${statusBadge(o.statut)}</td>
        <td class="px-6 py-4">
          <button class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 delete-order-btn" data-id="${o.id}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>`).join('');

    document.querySelectorAll('.delete-order-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Supprimer cette commande ?')) {
          store.deleteOrder(parseInt(btn.dataset.id));
          renderTable();
          showToast('Commande supprimée');
        }
      });
    });
  }

  document.getElementById('orderForm').addEventListener('submit', e => {
    e.preventDefault();
    const client   = document.getElementById('order-client').value.trim();
    const vetement = document.getElementById('order-vetement').value.trim();
    const prix     = parseInt(document.getElementById('order-prix').value) || 0;
    const date     = document.getElementById('order-date').value.trim();
    const statut   = document.getElementById('order-statut').value;
    if (!client || !vetement || !prix || !date) { alert('Veuillez remplir tous les champs.'); return; }
    const nid = store.nextOrderId; store.nextOrderId = nid + 1; store.addOrder({ id: nid, client, vetement, prix, date, statut });
    document.getElementById('orderForm').reset();
    renderTable();
    showToast('Commande ajoutée');
  });

  document.getElementById('orderSearch').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    renderTable(store.orders.filter(o =>
      String(o.id).includes(term) ||
      o.client.toLowerCase().includes(term) ||
      o.vetement.toLowerCase().includes(term) ||
      o.statut.toLowerCase().includes(term)
    ));
  });

  renderTable();
}
