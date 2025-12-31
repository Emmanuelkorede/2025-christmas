const colorInput = document.getElementById('colorpicker');

colorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty(
        '--accent',
        e.target.value
    );
});



const btn = document.querySelector('.l-celebation');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function firework(x, y) {
    const particles = [];

    for (let i = 0; i < 40; i++) {
        particles.push({
            x,
            y,
            radius: random(1, 3),
            color: getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent'),
            angle: random(0, Math.PI * 2),
            speed: random(2, 6),
            life: 60
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        if (particles.some(p => p.life > 0)) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}



btn.addEventListener('click', () => {
    const rect = btn.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top;

    for (let i = 0; i < 5; i++) {
        firework(x, y);
    }
});

