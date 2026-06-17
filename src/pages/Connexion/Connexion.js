// ============================================================
// PAGE: CONNEXION
// ============================================================
export function Connexion() {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="logo">
          <img src="assets/models/logotrans.png" alt="Riyam Couture">
          <h2 style="color:#35215d;font-size:1.5rem;font-weight:700;margin-top:.5rem;">Connexion</h2>
          <p style="color:#888;font-size:.9rem;">Connectez-vous à votre compte</p>
        </div>
        <form id="loginForm" style="margin-top:1.5rem;">
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Email</label>
          <div class="input-box">
            <i class="fa-regular fa-envelope"></i>
            <input type="email" id="loginEmail" placeholder="exemple@email.com" required>
          </div>
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Mot de passe</label>
          <div class="input-box">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="loginPassword" placeholder="Votre mot de passe" required>
            <i class="fa-regular fa-eye toggle-password" id="toggleLoginPwd"></i>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
            <label style="display:flex;align-items:center;gap:.5rem;font-weight:400;color:#555;cursor:pointer;">
              <input type="checkbox" id="rememberMe"> Se souvenir de moi
            </label>
            <a href="#" style="color:#e53982;font-weight:600;font-size:.9rem;">Mot de passe oublié ?</a>
          </div>
          <button type="submit" class="auth-btn">
            <i class="fas fa-right-to-bracket"></i> Se connecter
          </button>
        </form>
        <div class="separator"><span>ou</span></div>
        <p class="switch-link">Pas de compte ? <a onclick="App.navigate('/inscription')">S'inscrire</a></p>
      </div>
    </div>`;
}

export function init() {
  const toggle = document.getElementById('toggleLoginPwd');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const input = document.getElementById('loginPassword');
      input.type = input.type === 'password' ? 'text' : 'password';
      toggle.classList.toggle('fa-eye');
      toggle.classList.toggle('fa-eye-slash');
    });
  }

  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const { store } = App;

    const isAdmin = email === 'admin@riyam.com' && password === 'admin';
    const user    = store.findUser(email, password);

    if (isAdmin) {
      store.currentUser = { name: 'Admin', email: 'admin@riyam.com' };
      App.navigate('/dashboard');
    } else if (user) {
      store.currentUser = { name: user.name, email: user.email };
      App.navigate('/dashboard');
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  });
}
