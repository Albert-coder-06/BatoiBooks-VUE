<template>
    <nav>
        <ul>
            <li><router-link to="/">Ver Libros</router-link></li>
            <li><router-link to="/new-book">Añadir Libro</router-link></li>
            <li><router-link to="/carrito">Carrito</router-link></li>
            <li><router-link to="/about">Acerca de...</router-link></li>
        </ul>
    </nav>
</template>

<style scoped>

    nav ul {
        list-style-type: none;
        padding: 0;
    }

    nav a {
        color: #6f42c1;
        text-decoration: none;
        font-weight: bold;
    }

    nav a::before {
        content: "• ";
    }

</style>