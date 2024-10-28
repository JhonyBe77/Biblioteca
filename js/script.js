const API_KEY = '7yvAmlfD7ddm0oM1IG2PoxWBNroMmfmf';
const API_CATEGORIES_URL = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`;
const API_LIST_URL = (listName) => `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${API_KEY}`;

const loadingMessage = document.getElementById('loading-message');
const categoriesContainer = document.getElementById('categories');
const booksContainer = document.getElementById('books-list');
const backButton = document.getElementById('back-button');

// Función para obtener las categorías
async function fetchCategories() {
    try {
        const response = await fetch(API_CATEGORIES_URL);
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

// Función para obtener los libros de una lista específica
async function fetchBooks(listName) {
    try {
        const response = await fetch(API_LIST_URL(listName));
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results.books;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Función para mostrar las categorías en el DOM
async function renderCategories() {
    loadingMessage.style.display = 'block';
    categoriesContainer.style.display = 'grid';
    booksContainer.style.display = 'none';
    backButton.style.display = 'none'; // Ocultar botón de "Volver" en la vista de categorías
    categoriesContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas categorías

    const categories = await fetchCategories();
    loadingMessage.style.display = 'none';

    if (categories.length === 0) {
        categoriesContainer.innerHTML = '<p>No se pudieron cargar las categorías.</p>';
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
            <a href="#" data-list="${category.list_name}">READ MORE!</a>
        `;

        categoriesContainer.appendChild(card);
    });

    // Asignar el evento de clic a cada enlace de "READ MORE!"
    document.querySelectorAll('.category-card a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const listName = e.target.getAttribute('data-list');
            renderBooks(listName);
        });
    });
}

// Función para mostrar los libros de una lista específica
async function renderBooks(listName) {
    loadingMessage.style.display = 'block';
    categoriesContainer.style.display = 'none';
    booksContainer.style.display = 'grid';
    backButton.style.display = 'inline-block'; // Mostrar botón de "Volver" en la vista de libros
    booksContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos libros

    const books = await fetchBooks(listName);
    loadingMessage.style.display = 'none';

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No se pudieron cargar los libros.</p>';
        return;
    }

    books.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        card.innerHTML = `
            <h2>#${index + 1} ${book.title}</h2>
            <img src="${book.book_image}" alt="${book.title}">
            <p><strong>Semanas en lista:</strong> ${book.weeks_on_list}</p>
            <p>${book.description}</p>
            <a href="${book.amazon_product_url}" target="_blank">Comprar en Amazon</a>
        `;

        booksContainer.appendChild(card);
    });
}

// Volver a la vista de categorías
backButton.addEventListener('click', () => {
    renderCategories(); // Llamar a la función para recargar las categorías
});

// Llamada inicial para cargar las categorías
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});
