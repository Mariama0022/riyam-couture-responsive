// ============================================================
// PAGE: INTRO (Accueil)
// ============================================================
export function Intro() {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="logo">
          <img src="assets/models/logotrans.png" alt="Riyam Couture">
        </div>
        <h2 style="color:#35215d;font-size:2rem;font-weight:700;margin-bottom:3.5rem; margin-left:6rem;">Bienvenue chez <br>Riyam Couture</h2>       
        <div style="display:flex;flex-direction:column;gap:1rem;">
          <button class="auth-btn" onclick="App.navigate('/connexion')">
            <i class="fas fa-arrow-right-from-bracket"></i> Se connecter
          </button>
          <button class="auth-btn-outline" onclick="App.navigate('/inscription')">
            <i class="fas fa-user-plus"></i> S'inscrire
          </button>
        </div>
      </div>
    </div>`;
}

export function init() {}
