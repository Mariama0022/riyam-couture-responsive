// ============================================================
// PAGE: INSCRIPTION
// ============================================================
export function Inscription() {
  return `
    <div class="auth-page">
      <div class="auth-container">
        <div class="logo">
          <img src="assets/models/logotrans.png" alt="Riyam Couture">
          <h2 style="color:#35215d;font-size:1.5rem;font-weight:700;margin-top:.5rem;">Inscription</h2>
          <p style="color:#888;font-size:.9rem;">Créez votre compte</p>
        </div>
        <form id="registerForm" style="margin-top:1.5rem;">
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Nom complet</label>
          <div class="input-box">
            <i class="fa-regular fa-user"></i>
            <input type="text" id="regName" placeholder="Votre nom complet" required>
          </div>
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Email</label>
          <div class="input-box">
            <i class="fa-regular fa-envelope"></i>
            <input type="email" id="regEmail" placeholder="exemple@email.com" required>
          </div>
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Mot de passe</label>
          <div class="input-box">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="regPwd" placeholder="Créez un mot de passe" required>
            <i class="fa-regular fa-eye toggle-password" id="toggleRegPwd"></i>
          </div>
          <label style="display:block;color:#35215d;font-weight:600;margin-bottom:.4rem;">Confirmer le mot de passe</label>
          <div class="input-box">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="regPwdConfirm" placeholder="Confirmez votre mot de passe" required>
            <i class="fa-regular fa-eye toggle-password" id="toggleRegPwdConfirm"></i>
          </div>
          <label style="display:flex;align-items:center;gap:.6rem;font-weight:400;color:#555;margin-bottom:1.2rem;cursor:pointer;">
            <input type="checkbox" id="terms" required> J'accepte les conditions d'utilisation
          </label>
          <button type="submit" class="auth-btn">
            <i class="fas fa-user-plus"></i> S'inscrire
          </button>
        </form>
        <div class="separator"><span>ou</span></div>
        <p class="switch-link">Déjà un compte ? <a onclick="App.navigate('/connexion')">Se connecter</a></p>
      </div>
    </div>`;
}

export function init() {
  [['toggleRegPwd','regPwd'], ['toggleRegPwdConfirm','regPwdConfirm']].forEach(([btnId, inputId]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.addEventListener('click', () => {
      const input = document.getElementById(inputId);
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.classList.toggle('fa-eye');
      btn.classList.toggle('fa-eye-slash');
    });
  });

  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('regName').value.trim();
    const email   = document.getElementById('regEmail').value.trim();
    const pwd     = document.getElementById('regPwd').value;
    const confirm = document.getElementById('regPwdConfirm').value;
    const { store } = App;

    if (pwd !== confirm) { alert('Les mots de passe ne correspondent pas.'); return; }
    if (store.userExists(email)) {
      alert('Cet email est déjà utilisé. Connectez-vous !');
      App.navigate('/connexion');
      return;
    }

    store.addUser({ name, email, password: pwd });
    store.currentUser = { name, email };
    App.navigate('/dashboard');
  });
}
