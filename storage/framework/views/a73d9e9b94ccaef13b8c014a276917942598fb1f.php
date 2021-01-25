<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link rel="icon" type="image/png" href="images/icon-pokeball.png" />
    <script src="js/ajax.js"></script>
    <meta name="csrf-token" id="token" content="<?php echo e(csrf_token()); ?>">
    <title>Pokédex</title>
</head>

<body>
    <div class="row">
        <div class="column-1">
            <h1>Pokédex de Kanto</h1>
        </div>
    </div>
    <div class="row" id="section-2">
        <div class="column-2 padding-3">
            <input type="text" name="searchPokemon" id="searchPokemon" placeholder="Pokémon..." onkeyup="read()">
        </div>

        <div class="column-2 padding-2" id="message">
            <h4>Busca un Pokémon por su nombre. Sube una imagen del Pokémon para registrarlo.</h4>
        </div>
    </div>
    <div class="row">
        <div class="column-1">
            <h3 id="mensaje">Aquí verás las últimas modificaciones...</h3>
        </div>
    </div>
    <!-- Sección que vamos a recargar con AJAX -->
    <div class="row" id="section-3">
        
    </div>

    <!-- The Modal -->
    <div id="addImage" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2 id="msg"></h2>
            <form method="post" onsubmit="updateImage(); return false;">
                <div> <input accept="image/png" type="file" name="pokemon_image" id="pokemon_image"></div>
                <input type="hidden" name="numero_pokedex" id="numero_pokedex">
                <div style="padding:10px"><input style="display: block;margin-left: auto;margin-right: auto;" type="submit" value="registrar Pokemon"></div>
            </form>
        </div>
    </div>
</body>

</html><?php /**PATH C:\xampp\htdocs\pokedex\resources\views/pokedex.blade.php ENDPATH**/ ?>