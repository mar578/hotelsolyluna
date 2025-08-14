// -------------------------------
// 1. MENÚ FIJO CON CAMBIO DE COLOR AL SCROLL
// -------------------------------
const header = document.querySelector('.header-elegante');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 58, 110, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
});

// -------------------------------
// 2. SCROLL SUAVE PARA ENLACES
// -------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#reservar') return;
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// -------------------------------
// 3. ANIMACIÓN DE SERVICIOS AL SCROLL
// -------------------------------
const servicios = document.querySelectorAll('.servicio');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

servicios.forEach(servicio => {
    servicio.style.opacity = '0';
    servicio.style.transform = 'translateY(30px)';
    servicio.style.transition = 'all 0.6s ease-out';
    observer.observe(servicio);
});

// -------------------------------
// 4. GALERÍA INTERACTIVA
// -------------------------------
const imagenesGaleria = document.querySelectorAll('.imagen-galeria');

imagenesGaleria.forEach(imagen => {
    imagen.addEventListener('mouseenter', () => {
        const overlay = imagen.querySelector('.overlay-dorado');
        overlay.style.opacity = '1';
    });

    imagen.addEventListener('mouseleave', () => {
        const overlay = imagen.querySelector('.overlay-dorado');
        overlay.style.opacity = '0';
    });
});

// -------------------------------
// 5. TESTIMONIOS AUTOMÁTICOS
// -------------------------------
const testimonios = [
    {
        texto: "¡La suite con vista al mar fue increíble! El servicio impecable y el spa... simplemente celestial.",
        autor: "María González",
        pais: "🇪🇸 España"
    },
    {
        texto: "Aniversario inolvidable. Cada detalle, desde las flores en la habitación hasta la cena privada, fue perfecto.",
        autor: "Carlos & Sofía",
        pais: "🇲🇽 México"
    },
    {
        texto: "El mejor hotel en el que he estado. Volveré sin duda.",
        autor: "John Smith",
        pais: "🇺🇸 Estados Unidos"
    }
];

let testimonioIndex = 0;
const testimonioActivo = document.querySelector('.testimonio-activo');

function mostrarTestimonio() {
    const testimonio = testimonios[testimonioIndex];
    testimonioActivo.innerHTML = `
        <p>"${testimonio.texto}"</p>
        <div class="autor-testimonio">
            <strong>${testimonio.autor}</strong>
            <span>${testimonio.pais}</span>
        </div>
    `;
}

// Rotación automática
let intervaloTestimonios = setInterval(() => {
    testimonioIndex = (testimonioIndex + 1) % testimonios.length;
    mostrarTestimonio();
}, 5000);

// Controles manuales
document.querySelector('.testimonio-prev').addEventListener('click', () => {
    clearInterval(intervaloTestimonios);
    testimonioIndex = (testimonioIndex - 1 + testimonios.length) % testimonios.length;
    mostrarTestimonio();
});

document.querySelector('.testimonio-next').addEventListener('click', () => {
    clearInterval(intervaloTestimonios);
    testimonioIndex = (testimonioIndex + 1) % testimonios.length;
    mostrarTestimonio();
});

// -------------------------------
// 6. MENÚ MÓVIL
// -------------------------------
const menuMovilBtn = document.querySelector('.menu-movil-btn');
const menu = document.querySelector('.menu-creativo');

menuMovilBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    menuMovilBtn.innerHTML = menu.style.display === 'flex' ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// -------------------------------
// 7. MODAL DE RESERVA
// -------------------------------
const modal = document.querySelector('.modal-reserva');
const btnReservar = document.getElementById('btn-reservar');
const cerrarModal = document.querySelector('.cerrar-modal');

btnReservar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// -------------------------------
// 8. CARGA DE IMÁGENES (LAZY LOAD)
// -------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const imagenes = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = (img) => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = () => {
            img.style.opacity = '1';
        };
    };

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                lazyObserver.unobserve(entry.target);
            }
        });
    });

    imagenes.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        lazyObserver.observe(img);
    });
});