// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCpcMn1qbogy2UaQgSnKiwwa8FzTvVVbEc",
    authDomain: "demoweb-18658.firebaseapp.com",
    projectId: "demoweb-18658",
    storageBucket: "demoweb-18658.appspot.com",
    messagingSenderId: "418004013963",
    appId: "1:418004013963:web:dc37fede4ccce90152158e"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elementos del DOM
const logoutButton = document.getElementById('logout-button');
const showLoginFormButton = document.getElementById('show-login-form-button');
const authForm = document.getElementById('auth-form');
const emailLoginButton = document.getElementById('email-login-button');
const registerButton = document.getElementById('register-button');
const loadingMessage = document.getElementById('loading-message');
const categoriesContainer = document.getElementById('categories');
const booksContainer = document.getElementById('books-list');
const backButton = document.getElementById('back-button');
const header = document.getElementById('header');

// Muestra el formulario de autenticación con correo electrónico
showLoginFormButton.addEventListener('click', () => {
    authForm.style.display = authForm.style.display === 'none' ? 'block' : 'none';
});

// Autenticación con correo y contraseña
emailLoginButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error('Error de inicio de sesión con correo:', error);
    }
});

// Registro de nuevo usuario
registerButton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        console.log('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error al registrarse:', error);
    }
});

// Cierre de sesión
logoutButton.addEventListener('click', () => {
    auth.signOut();
});

// Cambios en la interfaz según el estado de autenticación
auth.onAuthStateChanged(async user => {
    console.log("User state changed:", user); // Comprobación en consola
    if (user) {
        // Usuario autenticado
        logoutButton.style.display = 'inline-block';
        showLoginFormButton.style.display = 'none';
        authForm.style.display = 'none';

        loadingMessage.style.display = 'block'; // Mostrar el cargador solo cuando el usuario esté autenticado
        await renderCategories(); // Esperar a que se carguen las categorías
        loadingMessage.style.display = 'none'; // Ocultar el cargador al finalizar
    } else {
        // Usuario no autenticado
        showLoginFormButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        categoriesContainer.innerHTML = ''; // Limpiar categorías si el usuario no está autenticado
    }
});

// Llamada a la API
const API_KEY = '7yvAmlfD7ddm0oM1IG2PoxWBNroMmfmf';
const API_CATEGORIES_URL = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}`;
const API_LIST_URL = (listName) => `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${API_KEY}`;

// Función para renderizar la imagen en el header
function renderHeaderImage() {
    // Limpiar cualquier contenido previo
    header.innerHTML = '';

    // Crear un elemento de imagen
    const headerImage = document.createElement('img');
    headerImage.src = 'assets/img/TNYT_BestSeller3.png'; // Reemplaza con la URL de tu imagen
    headerImage.alt = 'New York Times Best Sellers'; // Texto alternativo
    headerImage.style.width = '70%'; // Ajusta el estilo según tus necesidades

    // Agregar la imagen al header
    header.appendChild(headerImage);
}

// Función para obtener las categorías
async function fetchCategories() {
    try {
        const response = await fetch(API_CATEGORIES_URL);
        if (!response.ok) throw new Error(`Error al obtener los datos: ${response.statusText}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error en fetchCategories:", error);
        return [];
    }
}

// Función para mostrar las categorías en el DOM
async function renderCategories() {
    console.log("Rendering categories"); // Comprobación en consola
    loadingMessage.style.display = 'block';
    categoriesContainer.style.display = 'grid';
    booksContainer.style.display = 'none';
    backButton.style.display = 'none';
    categoriesContainer.innerHTML = '';

    const categories = await fetchCategories();
    loadingMessage.style.display = 'none';

    if (categories.length === 0) {
        categoriesContainer.innerHTML = '<p>No se pudieron cargar las categorías.</p>';
        return;
    }

    // Renderizar categorías y asignar eventos de clic
    categories.forEach(category => {
        const card = document.createElement('div');
        card.classList.add('category-card');
        card.innerHTML = `
            <h2>${category.display_name}</h2>
            <p>Oldest: ${category.oldest_published_date}</p>
            <p>Newest: ${category.newest_published_date}</p>
            <p>Updated: ${category.updated}</p>
            <a href="#" class="button-read-more" data-list="${category.list_name}">READ MORE ></a>
        `;
        categoriesContainer.appendChild(card);
    });

    // Agregar eventos de clic a enlaces después de renderizar categorías
    document.querySelectorAll('.button-read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const listName = e.target.getAttribute('data-list');
            console.log("Clicked category:", listName); // Verificar qué categoría se hace clic
            renderBooks(listName);
        });
    });
}

// Función para mostrar los libros de una lista específica
async function fetchBooks(listName) {
    console.log("Fetching books for list:", listName); // Verifica si `listName` está bien
    try {
        const response = await fetch(API_LIST_URL(listName));
        if (!response.ok) throw new Error(`Error al obtener los datos: ${response.statusText}`);
        const data = await response.json();
        return data.results.books;
    } catch (error) {
        console.error("Error en fetchBooks:", error);
        return [];
    }
}

// Función para renderizar libros
async function renderBooks(listName) {
    console.log("Rendering books for:", listName); // Comprobación en consola
    loadingMessage.style.display = 'block'; // Mostrar el cargador
    categoriesContainer.style.display = 'none';
    booksContainer.style.display = 'grid';
    backButton.style.display = 'inline-block';
    booksContainer.innerHTML = '';

    const books = await fetchBooks(listName);
    loadingMessage.style.display = 'none'; // Ocultar el cargador después de cargar los libros

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
            <a href="${book.amazon_product_url}" target="_blank" class="button-buy-amazon">Comprar en Amazon</a>
        `;
        booksContainer.appendChild(card);
    });
}

// Evento para volver a la vista de categorías
backButton.addEventListener('click', () => {
    renderCategories();
    booksContainer.style.display = 'none';
    backButton.style.display = 'none';
});

// Llamada inicial para cargar la imagen en el header
document.addEventListener('DOMContentLoaded', () => {
    renderHeaderImage();
    // No llamar a renderCategories aquí
});
