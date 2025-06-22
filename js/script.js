document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');

    // Función para manejar el menú hamburguesa
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Función para ocultar el menú al hacer clic en un enlace (para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
            }
            // Navegación suave
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Función para mostrar la sección correcta al cargar la página o al navegar
    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');

        // Resaltar el enlace activo en el menú
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Mostrar la sección de inicio por defecto o la sección basada en el hash de la URL
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('inicio');
    }

    // Asegurarse de que al cambiar el hash en la URL, la sección se actualice
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('inicio');
        }
    });
});

// --- Funciones de las Calculadoras ---

function calculateBasic() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('resultBasic').textContent = 'Por favor, introduce números válidos.';
        return;
    }

    switch (operation) {
        case 'sum':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                result = 'No se puede dividir por cero';
            } else {
                result = num1 / num2;
            }
            break;
        default:
            result = 'Operación no válida';
    }
    document.getElementById('resultBasic').textContent = result;
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    let result;

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        document.getElementById('resultBMI').textContent = 'Por favor, introduce valores válidos.';
        return;
    }

    const bmi = weight / (height * height);
    result = bmi.toFixed(2); // Redondear a 2 decimales

    let category = '';
    if (bmi < 18.5) {
        category = ' (Bajo peso)';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = ' (Peso normal)';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = ' (Sobrepeso)';
    } else {
        category = ' (Obesidad)';
    }

    document.getElementById('resultBMI').textContent = result + category;
}

function calculateSimpleInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value); // Tasa en porcentaje
    const time = parseFloat(document.getElementById('time').value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        document.getElementById('resultSimpleInterest').textContent = 'Por favor, introduce valores positivos válidos.';
        return;
    }

    // Fórmula del interés simple: I = P * R * T / 100
    const interest = (principal * rate * time) / 100;
    document.getElementById('resultSimpleInterest').textContent = interest.toFixed(2);
}