const API_KEY = '7yvAmlfD7ddm0oM1IG2PoxWBNroMmfmf'; 
const API_URL = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`;

// Función para obtener las categorías de la API

async function fetchCategories() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Función para pintar las categorías en el DOM
async function renderCategories() {
    const loadingMessage = document.getElementById('loading-message');
    const container = document.getElementById('categories');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas categorías

    try {
        const categories = await fetchCategories();
        loadingMessage.style.display = 'none'; // Ocultar mensaje de carga

        if (categories.length === 0) {
            container.innerHTML = '<p>No se pudieron cargar las categorías.</p>';
            return;
        }

        categories.forEach(category => {
            const card = document.createElement('div');
            card.classList.add('category-card');

            card.innerHTML = `
                <h2>${category.display_name}</h2>
                <p>Oldest: ${category.oldest_published_date}</p>
                <p>Newest: ${category.newest_published_date}</p>
                <p>Updated: ${category.updated}</p>
                <a href="#">READ MORE!</a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        loadingMessage.textContent = 'Error al cargar las categorías. Inténtalo de nuevo más tarde.';
        console.error(error);
    }
}

// Llamada a la función para renderizar al cargar la página
document.addEventListener('DOMContentLoaded', renderCategories);
