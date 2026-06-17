// ============================================================
// PAGE: CLIENTS
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';
import { showToast } from '../../utils.js';

export function Clients() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/clients')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <h1 class="text-2xl lg:text-3xl font-semibold text-[#E91E63] text-center mb-8">GESTION DES CLIENTS</h1>

          <!-- Header liste -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Liste des clients</h2>
            <button id="addClientBtn" class="btn-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
              <i class="fas fa-plus"></i> Ajouter un client
            </button>
          </div>

          <!-- Formulaire -->
          <div id="formSection" class="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100 hidden">
            <form id="clientForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Nom</label>
                  <input type="text" id="nom" placeholder="Ex: Awa Ndiaye" class="form-input w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" required>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Téléphone</label>
                  <input type="tel" id="telephone" placeholder="Ex: 771234567" class="form-input w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" required>
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Adresse</label>
                  <input type="text" id="adresse" placeholder="Ex: Dakar, Sénégal" class="form-input w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm" required>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Tissu</label>
                <input type="text" id="tissu" placeholder="Ex: Getzner" class="form-input w-full max-w-sm px-4 py-2.5 border border-gray-200 rounded-xl text-sm" required>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-gray-700 mb-3">Mesures</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  ${['C','Ep','T','B','M','C2'].map(m => `
                    <div class="flex items-center gap-1">
                      <span class="text-sm font-semibold text-gray-600 w-7">${m}</span>
                      <input type="text" id="mesure_${m.toLowerCase()}" placeholder="cm"
                        class="form-input flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    </div>`).join('')}
                </div>
              </div>
              <div class="flex flex-wrap gap-3 items-center">
                <!-- Dropdown model -->
                <div class="relative">
                  <button type="button" id="modelDropdownBtn"
                    class="btn-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2">
                    <span id="selectedModelLabel">Model</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div id="modelDropdown"
                    class="dropdown-menu absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" data-model="Rode">Rode</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" data-model="Taille basse">Taille basse</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" data-model="Boubou">Boubou</a>
                  </div>
                </div>
                <button type="submit" class="btn-outline-pink px-6 py-2.5 rounded-lg text-sm font-semibold">Enregistrer</button>
                <button type="button" id="cancelBtn" class="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">Annuler</button>
              </div>
            </form>
          </div>

          <!-- Recherche -->
          <div class="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
            <div class="relative">
              <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" id="clientSearch" placeholder="Rechercher un client..."
                class="form-input w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm">
            </div>
          </div>

          <!-- Tableau -->
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nom</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Téléphone</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Adresse</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tissu</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Model</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody id="clientsTable" class="divide-y divide-gray-100"></tbody>
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
  let editingId = null;
  let selectedModel = 'Rode';

  const formSection  = document.getElementById('formSection');
  const clientForm   = document.getElementById('clientForm');
  const modelDropdown = document.getElementById('modelDropdown');
  const modelLabel    = document.getElementById('selectedModelLabel');

  function renderTable(list = store.clients) {
    document.getElementById('clientsTable').innerHTML = list.map(c => `
      <tr class="table-row">
        <td class="px-6 py-4 text-sm text-gray-700">${c.id}</td>
        <td class="px-6 py-4 text-sm text-gray-900 font-medium">${c.nom}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${c.telephone}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${c.adresse}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${c.tissu}</td>
        <td class="px-6 py-4 text-sm text-gray-700">${c.model}</td>
        <td class="px-6 py-4 text-sm">
          <div class="flex gap-2">
            <button class="edit-btn text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50" data-id="${c.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50" data-id="${c.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`).join('');
    bindTableButtons();
  }

  function bindTableButtons() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = store.clients.find(x => x.id === parseInt(btn.dataset.id));
        if (!c) return;
        editingId = c.id;
        document.getElementById('nom').value       = c.nom;
        document.getElementById('telephone').value = c.telephone;
        document.getElementById('adresse').value   = c.adresse;
        document.getElementById('tissu').value     = c.tissu;
        selectedModel = c.model;
        modelLabel.textContent = selectedModel;
        if (c.mesures) {
          ['c','ep','t','b','m','c2'].forEach(k => {
            const el = document.getElementById('mesure_' + k);
            if (el) el.value = c.mesures[k] || '';
          });
        }
        formSection.classList.remove('hidden');
        formSection.scrollIntoView({ behavior:'smooth' });
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Supprimer ce client ?')) {
          store.deleteClient(parseInt(btn.dataset.id));
          renderTable();
          showToast('Client supprimé');
        }
      });
    });
  }

  // Bouton ajouter
  document.getElementById('addClientBtn').addEventListener('click', () => {
    editingId = null;
    clientForm.reset();
    selectedModel = 'Rode';
    modelLabel.textContent = selectedModel;
    formSection.classList.remove('hidden');
  });

  // Annuler
  document.getElementById('cancelBtn').addEventListener('click', () => {
    formSection.classList.add('hidden');
    clientForm.reset();
    editingId = null;
  });

  // Dropdown model
  document.getElementById('modelDropdownBtn').addEventListener('click', e => {
    e.stopPropagation();
    modelDropdown.classList.toggle('show');
  });
  document.addEventListener('click', () => modelDropdown.classList.remove('show'));
  modelDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      selectedModel = a.dataset.model;
      modelLabel.textContent = selectedModel;
      modelDropdown.classList.remove('show');
    });
  });

  // Submit formulaire
  clientForm.addEventListener('submit', e => {
    e.preventDefault();
    const client = {
      id: editingId || store.nextClientId++,
      nom:       document.getElementById('nom').value.trim(),
      telephone: document.getElementById('telephone').value.trim(),
      adresse:   document.getElementById('adresse').value.trim(),
      tissu:     document.getElementById('tissu').value.trim(),
      model:     selectedModel,
      mesures: {
        c:  document.getElementById('mesure_c').value,
        ep: document.getElementById('mesure_ep').value,
        t:  document.getElementById('mesure_t').value,
        b:  document.getElementById('mesure_b').value,
        m:  document.getElementById('mesure_m').value,
        c2: document.getElementById('mesure_c2').value,
      }
    };
    if (editingId) {
      const idx = store.clients.findIndex(c => c.id === editingId);
      store.clients[idx] = client;
      showToast('Client modifié');
    } else {
      store.addClient(client);
      showToast('Client ajouté');
    }
    editingId = null;
    clientForm.reset();
    formSection.classList.add('hidden');
    renderTable();
  });

  // Recherche
  document.getElementById('clientSearch').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    renderTable(store.clients.filter(c =>
      c.nom.toLowerCase().includes(term) ||
      c.telephone.includes(term) ||
      c.adresse.toLowerCase().includes(term) ||
      c.tissu.toLowerCase().includes(term) ||
      c.model.toLowerCase().includes(term)
    ));
  });

  renderTable();
}
