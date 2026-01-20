<template>
    <nav>
        <ul>
            <li><a href="#list">Ver libros</a></li>
            <li><a href="#form">Añadir libro</a></li>
            <li><a href="#about">Acerca de</a></li>
            <li><a href="#carrito">Carrito</a></li>
        </ul>
    </nav>
</template>

<style scoped>
    nav{
    display: grid;
    justify-content: center;
    background-color: bisque;
    width: 100%;
}

nav > ul {
    gap: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
}

nav > ul > li{
    list-style-type: none;
}

nav > ul > li > a{
    padding: 20px;
    text-decoration: none;
    color: black;
}

</style>