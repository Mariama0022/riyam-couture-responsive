// ============================================================
// STORE — données et état global avec persistance localStorage
// ============================================================

// ── Helpers localStorage ────────────────────────────────────
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Données par défaut ──────────────────────────────────────
const defaultClients = [
  { id:1, nom:'Awa Ndiaye',   telephone:'771234567', adresse:'Dakar', tissu:'Getzner', model:'Rode',         mesures:{c:'',ep:'',t:'',b:'',m:'',c2:''} },
  { id:2, nom:'Fatou Ndiaye', telephone:'772345678', adresse:'Dakar', tissu:'Getzner', model:'Taille basse', mesures:{c:'',ep:'',t:'',b:'',m:'',c2:''} },
  { id:3, nom:'Modou Ndiaye', telephone:'773456789', adresse:'Thiès', tissu:'Bazin',   model:'Boubou',       mesures:{c:'',ep:'',t:'',b:'',m:'',c2:''} }
];
const defaultOrders = [
  { id:1, client:'Awa Ndiaye',  vetement:'Robe',     prix:8000,  date:'12/06/2026', statut:'En cours' },
  { id:2, client:'Fatou Diop',  vetement:'Boubou',   prix:15000, date:'15/06/2026', statut:'En cours' },
  { id:3, client:'Mariama Ba',  vetement:'Chemise',  prix:6000,  date:'10/06/2026', statut:'Terminé'  },
  { id:4, client:'Adama Fall',  vetement:'Pantalon', prix:7000,  date:'11/06/2026', statut:'Terminé'  }
];
const defaultRecettes = [
  { id:1, client:'Awa Ndiaye', montant:8000,  date:'01/06/2026', mode:'Espèces'      },
  { id:2, client:'Fatou Diop', montant:7000,  date:'02/06/2026', mode:'Espèces'      },
  { id:3, client:'Mariama Ba', montant:6000,  date:'02/06/2026', mode:'Orange Money' },
  { id:4, client:'Adama Fall', montant:12000, date:'03/06/2026', mode:'Espèces'      }
];

// ── Store réactif avec auto-sauvegarde ──────────────────────
export const store = {
  // Session courante (non persistée entre onglets, mais restaurée au reload)
  get currentUser() { return load('rc_session', null); },
  set currentUser(val) { save('rc_session', val); },

  // Utilisateurs inscrits — persistés définitivement
  get users() { return load('rc_users', []); },
  set users(val) { save('rc_users', val); },

  // Clients
  get clients() { return load('rc_clients', defaultClients); },
  set clients(val) { save('rc_clients', val); },

  // Commandes
  get orders() { return load('rc_orders', defaultOrders); },
  set orders(val) { save('rc_orders', val); },

  // Recettes
  get recettes() { return load('rc_recettes', defaultRecettes); },
  set recettes(val) { save('rc_recettes', val); },

  // Compteurs d'ID
  get nextOrderId()  { return load('rc_nextOrderId',  5); },
  set nextOrderId(v) { save('rc_nextOrderId', v); },
  get nextClientId() { return load('rc_nextClientId', 4); },
  set nextClientId(v){ save('rc_nextClientId', v); },

  // ── Méthodes utilisateurs ─────────────────────────────────
  addUser(user) {
    const users = this.users;
    users.push(user);
    this.users = users;
  },
  findUser(email, password) {
    return this.users.find(u => u.email === email && u.password === password);
  },
  userExists(email) {
    return this.users.some(u => u.email === email);
  },

  // ── Méthodes clients ──────────────────────────────────────
  addClient(client) {
    const list = this.clients;
    list.push(client);
    this.clients = list;
  },
  updateClient(updated) {
    const list = this.clients.map(c => c.id === updated.id ? updated : c);
    this.clients = list;
  },
  deleteClient(id) {
    this.clients = this.clients.filter(c => c.id !== id);
  },

  // ── Méthodes commandes ────────────────────────────────────
  addOrder(order) {
    const list = this.orders;
    list.push(order);
    this.orders = list;
  },
  deleteOrder(id) {
    this.orders = this.orders.filter(o => o.id !== id);
  },
};
