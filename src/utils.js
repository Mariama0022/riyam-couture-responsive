// ============================================================
// UTILS — fonctions utilitaires partagées
// ============================================================

export function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const bg = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
  const toast = document.createElement('div');
  toast.className = `toast ${bg} text-white px-6 py-3 rounded-lg shadow-lg mb-3 flex items-center gap-2`;
  toast.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all .3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function statusBadge(statut) {
  const cls = statut === 'En cours' ? 'status-en-cours' : 'status-termine';
  return `<span class="status-badge ${cls}">${statut}</span>`;
}

export function formatPrix(n) {
  return Number(n).toLocaleString('fr-FR') + ' F';
}