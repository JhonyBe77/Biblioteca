# Biblioteca Dinámica - Manipulación de DOM y Autenticación con Firebase

Este proyecto es una biblioteca dinámica que permite a los usuarios explorar y gestionar una lista de libros, con la posibilidad de guardar sus favoritos tras autenticarse mediante Firebase. El proyecto utiliza manipulación dinámica del DOM, implementa asincronía y emplea ES6 para una experiencia de usuario fluida, sin el uso de frameworks ni librerías externas en la medida de lo posible. 

## Índice
- [Características](#características)
- [Requisitos del Proyecto](#requisitos-del-proyecto)
- [Especificaciones](#especificaciones)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Uso](#instalación-y-uso)
- [Contribuciones](#contribuciones)

---

## Características
- **Interfaz dinámica:** Generación de contenido y actualizaciones de interfaz en tiempo real.
- **Responsive y mobile-first:** Diseño adaptable a dispositivos móviles usando semántica HTML5.
- **Gestión de favoritos:** Permite a los usuarios autenticarse con Firebase Auth para guardar y ver su lista personalizada de libros favoritos.
- **Buenas prácticas de código:** Organización y limpieza del código según las mejores prácticas.
- **Control de versiones:** Gestión del proyecto desde GitHub usando ramas para cada funcionalidad o ajuste específico.

## Requisitos del Proyecto
Este proyecto ha sido desarrollado siguiendo los siguientes requisitos:

1. **Manipulación dinámica del DOM**: La interfaz se actualiza dinámicamente mediante JavaScript para reflejar los cambios del usuario sin necesidad de recargar la página.
2. **Uso de ES6**: Se han utilizado las funcionalidades modernas de ES6, como `let`, `const`, funciones de flecha, destructuring, etc.
3. **Asincronía**: Uso de `async/await` y `fetch` para gestionar las operaciones asincrónicas, especialmente para interactuar con Firebase.
4. **Sin frameworks ni librerías externas**: Se evita el uso de frameworks o librerías externas salvo Firebase para la autenticación, buscando mantener el código limpio y libre de dependencias.
5. **Gestión de proyecto en GitHub**: El desarrollo se ha llevado a cabo en un repositorio de GitHub desde el principio, con uso de ramas para distintas funcionalidades y revisiones.
6. **Código limpio y buenas prácticas**: El código está organizado y comentado, siguiendo las mejores prácticas para facilitar su comprensión y mantenimiento.
7. **Responsive y mobile-first**: El diseño está orientado primero a dispositivos móviles, con escalabilidad hacia pantallas de mayor tamaño usando media queries y flexbox.
8. **HTML5 semántico**: Uso de etiquetas semánticas para mejorar la accesibilidad y optimizar el SEO.

## Especificaciones
Este proyecto se encuentra en su Fase II, que incluye la integración de Firebase para autenticación y personalización:

- **Autenticación con Firebase Auth**: Los usuarios pueden registrarse y acceder mediante Firebase Auth. Una vez autenticados, se habilita la funcionalidad de guardar sus libros favoritos.
- **Base de datos de Firebase**: Los datos de favoritos se almacenan de forma segura en la base de datos de Firebase, accesibles solo para el usuario autenticado.

## Estructura del Proyecto
├── index.html # Archivo HTML principal ├── css/ │ └── styles.css # Estilos y diseño responsive ├── js/ │ ├── app.js # Lógica de manipulación del DOM y gestión de eventos │ └── firebase.js # Configuración de Firebase y funciones de autenticación ├── assets/ # Recursos de imágenes, íconos, etc. └── README.md # Este archivo README

