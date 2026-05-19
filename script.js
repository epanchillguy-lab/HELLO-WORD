// ===========================
// CANVAS SETUP
// ===========================
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
const container = document.getElementById('container');

function resizeCanvas() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ===========================
// STARS
// ===========================
const STAR_COUNT = 150;

const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.3,
  speed: Math.random() * 0.3 + 0.05,
  opacity: Math.random() * 0.6 + 0.2,
  twinkle: Math.random() * Math.PI * 2
}));

function drawStars() {
  stars.forEach(s => {
    s.twinkle += 0.02;
    const alpha = s.opacity * (0.7 + 0.3 * Math.sin(s.twinkle));

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();

    s.y -= s.speed;
    if (s.y < 0) {
      s.y = canvas.height;
      s.x = Math.random() * canvas.width;
    }
  });
}

// ===========================
// FLOATING PARTICLES
// ===========================
const PARTICLE_COUNT = 50;
const PARTICLE_COLORS = ['#00f5ff', '#bf00ff', '#ff00aa'];

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  r: Math.random() * 2 + 1,
  color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
  alpha: Math.random() * 0.4 + 0.1
}));

function drawParticles() {
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
}

// ===========================
// CENTER PULSE GLOW
// ===========================
let time = 0;

function drawCenterGlow() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const pulse = 100 + 25 * Math.sin(time * 1.5);

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulse);
  grad.addColorStop(0, 'rgba(0, 245, 255, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.beginPath();
  ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

// ===========================
// MAIN ANIMATION LOOP
// ===========================
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.016;

  drawStars();
  drawParticles();
  drawCenterGlow();

  requestAnimationFrame(animate);
}

animate();
