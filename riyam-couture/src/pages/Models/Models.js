// ============================================================
// PAGE: MODELS
// ============================================================
import { sidebarHTML, initSidebar } from '../../components/sidebar.js';

export function Models() {
  return `
    <div class="flex min-h-screen">
      ${sidebarHTML('/models')}
      <main class="flex-1 lg:ml-0 ml-0">
        <div class="p-4 lg:p-8 pt-20 lg:pt-8">
          <header class="text-center mb-12">
            <h1 class="text-4xl sm:text-5xl font-semibold" style="color:#E91E63;letter-spacing:.05em;">MODELS</h1>
            <div class="mt-4 mx-auto w-20 h-1 rounded-full" style="background:linear-gradient(to right,transparent,#E91E63,transparent)"></div>
          </header>
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8" id="modelsGrid"></div>
          <footer class="mt-16 text-center">
            <p class="text-gray-400 text-sm font-light tracking-wide">Contemporary African Fashion Collection</p>
          </footer>
        </div>
      </main>
    </div>`;
}

export function init() {
  initSidebar();
  const grid = document.getElementById('modelsGrid');
  const images = [
    'Image collée (3).png','Image collée (4).png','Image collée (5).png',
    'Image collée (6).png','Image collée (7).png','Image collée (8).png',
    'Image collée (10).png','Image collée (11).png','Image collée (12).png',
    'Image collée (13).png','Image collée (14).png','Image collée (15).png'
  ];
  grid.innerHTML = images.map((src, i) => `
    <div class="model-card" style="opacity:0;transform:translateY(20px);transition:opacity .6s ease ${i*80}ms,transform .6s ease ${i*80}ms">
      <img src="assets/models/${src}" class="model-img" loading="lazy"
        onerror="this.parentElement.style.background='#e5e7eb';this.style.display='none'">
    </div>`).join('');

  setTimeout(() => {
    grid.querySelectorAll('.model-card').forEach(c => {
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    });
  }, 50);
}
