// ============================================================
// PAGE: STATISTIQUES
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';

export function Statistiques() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/statistiques')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <h1 class="text-2xl lg:text-3xl font-semibold text-[#E91E63] text-center mb-8">STATISTIQUES</h1>

          <!-- Cartes stats -->
          <section class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 mb-5">Vue générale</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="stat-card p-6">
                <div class="flex items-start justify-between">
                  <div><p class="text-gray-500 text-sm mb-1">Total commandes</p><h3 class="text-3xl font-bold text-gray-900" id="stat-total">0</h3></div>
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#E3F2FD"><i class="fas fa-clipboard-list text-2xl" style="color:#2196F3"></i></div>
                </div>
              </div>
              <div class="stat-card p-6">
                <div class="flex items-start justify-between">
                  <div><p class="text-gray-500 text-sm mb-1">Terminées</p><h3 class="text-3xl font-bold text-gray-900" id="stat-termine">0</h3></div>
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#E8F5E9"><i class="fas fa-check-circle text-2xl" style="color:#4CAF50"></i></div>
                </div>
              </div>
              <div class="stat-card p-6">
                <div class="flex items-start justify-between">
                  <div><p class="text-gray-500 text-sm mb-1">En cours</p><h3 class="text-3xl font-bold text-gray-900" id="stat-encours">0</h3></div>
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#FFF3E0"><i class="fas fa-shopping-bag text-2xl" style="color:#FF9800"></i></div>
                </div>
              </div>
              <div class="stat-card p-6">
                <div class="flex items-start justify-between">
                  <div><p class="text-gray-500 text-sm mb-1">Clients</p><h3 class="text-3xl font-bold text-gray-900" id="stat-clients">0</h3></div>
                  <div class="w-14 h-14 rounded-xl flex items-center justify-center" style="background:#F3E5F5"><i class="fas fa-user text-2xl" style="color:#9C27B0"></i></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Graphiques -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Vêtements les plus demandés</h3>
              <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="w-full md:w-1/2" style="height:240px;"><canvas id="pieChart"></canvas></div>
                <div class="w-full md:w-1/2 space-y-3" id="pie-legend"></div>
              </div>
            </div>
            <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Recettes (30 derniers jours)</h3>
              <div style="height:240px;"><canvas id="lineChart"></canvas></div>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}

export function init() {
  initSidebar();
  const { store } = App;

  // Stats texte
  const encours = store.orders.filter(o => o.statut === 'En cours').length;
  const termine = store.orders.filter(o => o.statut === 'Terminé').length;
  document.getElementById('stat-total').textContent   = store.orders.length;
  document.getElementById('stat-encours').textContent = encours;
  document.getElementById('stat-termine').textContent = termine;
  document.getElementById('stat-clients').textContent = store.clients.length;

  // Pie chart
  const counts = {};
  store.orders.forEach(o => { counts[o.vetement] = (counts[o.vetement] || 0) + 1; });
  const labels = Object.keys(counts);
  const data   = Object.values(counts);
  const colors = ['#9C27B0','#2196F3','#00BCD4','#FF9800','#E91E63','#4CAF50'];

  document.getElementById('pie-legend').innerHTML = labels.map((l, i) => `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span style="width:10px;height:10px;border-radius:50%;background:${colors[i % colors.length]};display:inline-block;"></span>
        <span class="text-sm text-gray-600">${l}</span>
      </div>
      <span class="text-sm font-semibold text-gray-800">${Math.round(data[i]/store.orders.length*100)}%</span>
    </div>`).join('');

  new Chart(document.getElementById('pieChart').getContext('2d'), {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, data.length), borderWidth: 0, hoverOffset: 8 }] },
    options: { responsive:true, maintainAspectRatio:false, cutout:'60%', plugins:{ legend:{display:false} } }
  });

  new Chart(document.getElementById('lineChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['05/05','10/05','15/05','20/05','25/05','30/05'],
      datasets: [{
        label: 'Recettes',
        data: [50000,65000,90000,140000,180000,240000],
        borderColor: '#4CAF50', backgroundColor: 'rgba(76,175,80,0.12)',
        borderWidth: 3, fill: true, tension: 0.4,
        pointRadius: 4, pointBackgroundColor: '#4CAF50', pointBorderColor: '#fff', pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: {
        y: { beginAtZero:true, ticks:{ callback: v => v.toLocaleString('fr-FR'), color:'#9CA3AF', font:{size:11} }, grid:{ color:'#F3F4F6' } },
        x: { ticks:{ color:'#9CA3AF', font:{size:11} }, grid:{ display:false } }
      },
      plugins: { legend:{ display:false } }
    }
  });
}
