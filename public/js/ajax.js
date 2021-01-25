window.onload = function() {
    modal = document.getElementById('addImage');
    read();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

/* Muestra todos los registros de la base de datos (sin filtrar y filtrados) */
function read() {
    var section = document.getElementById('section-3');
    var buscador = document.getElementById('searchPokemon').value;
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    // Busca la ruta read y que sea asyncrono
    ajax.open('POST', 'read', true);
    var datasend = new FormData();
    datasend.append('filtro', buscador);
    datasend.append('_token', token);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            var tabla = '';
            for (let i = 0; i < respuesta.length; i++) {
                //const element = array[i];
                tabla += '<div class="column-5">';
                if (respuesta[i].imagen == null) {
                    tabla += '<img src="images/unown.png" style="opacity:.3" alt="error">';
                    tabla += '<h4>' + respuesta[i].nombre + '</h4>';
                    tabla += '<h4>' + respuesta[i].numero_pokedex + '</h4>';
                    tabla += '<div><img src="images/up_image.png" onclick="openModal('+respuesta[i].numero_pokedex+')" alt="error" style="opacity:.3"></div>';
                } else {
                    tabla += '<img src="data:image/png;base64,' + respuesta[i].imagen + '" alt="error">';
                    tabla += '<h4>' + respuesta[i].nombre + '</h4>';
                    tabla += '<h4>' + respuesta[i].numero_pokedex + '</h4>';
                    tabla += '<div>';
                    tabla += '<img src="images/catched.png" alt="error">';
                    if (respuesta[i].favorito == 1) {
                        tabla += '<a onclick="updateFav('+respuesta[i].numero_pokedex+',0)"><img src="images/fav.png" alt="error"></a>';
                    } else {
                        tabla += '<a onclick="updateFav('+respuesta[i].numero_pokedex+',1)"><img src="images/fav.png" style="opacity:.3" alt="error"></a>';
                    }
                    tabla += '</div>';
                }
                tabla += '</div>';
            }
            section.innerHTML = tabla;
        }
    }
    ajax.send(datasend);
}
// ajax.onreadystatechange = function() {
//     if (ajax.readyState == 4 && ajax.status == 200) {
//         var respuesta = JSON.parse(ajax.responseText);
//         var tabla = '';
//         section.innerHTML = tabla;
//     }
// }

/*
 @foreach($pokemons as $pokemon)
        <div class="column-5">

            @if ($pokemon->imagen == null)
                <img src="images/unown.png" style="opacity:.3" alt="error">
                <h4>{{$pokemon->nombre}}</h4>
                <h4>{{$pokemon->numero_pokedex}}</h4>
                <div><img src="images/up_image.png" alt="error" style="opacity:.3"></div>

            @else
                <img src="data:image/png;base64,{{ chunk_split(base64_encode($pokemon->imagen))}}" alt="error">
                <h4>{{$pokemon->nombre}}</h4>
                <h4>{{$pokemon->numero_pokedex}}</h4>
                <div>
                    <img src="images/catched.png" alt="error">
                    @if ($pokemon->favorito == 1)
                        <img src="images/fav.png" alt="error">
                    @else
                        <img src="images/fav.png" style="opacity:.3" alt="error">
                    @endif

                </div>
            @endif


        </div>         
        @endforeach
*/

/* Actualiza el campo favorito de un pokemon en la base de datos */
function updateFav(num, fav) {
    var mensaje = document.getElementById('mensaje');
    var ajax = new objetoAjax();
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'updateFav', true);
    var datos = new FormData();
    datos.append('num_pokedex', num);
    datos.append('favorito', fav);
    datos.append('_token', token)
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // var tabla = '';
            // mensaje.innerHTML = 'Pokemon '+num+' agregado a favorito';

            if (respuesta.resultado == 'OK') {
                if (fav == 0) {
                    mensaje.innerHTML = 'Pokemon '+num+' fuera de favorito';
                } else {
                    mensaje.innerHTML = 'Pokemon '+num+' agregado a favorito';
                }
            } else {
                mensaje.innerHTML = 'Ha ocurrido un error.' + respuesta.resultado;
            }
            read();
        }
    }
    ajax.send(datos);
}

/* Actualiza el campo imagen de un pokemon en la base de datos */
function updateImage() {
    var mensaje = document.getElementById('mensaje');
    var ajax = new objetoAjax();
    var image = document.getElementById('pokemon_image');
    var img = image.files[0];
    var num = document.getElementById('numero_pokedex').value;
    var token = document.getElementById('token').getAttribute('content');
    ajax.open('POST', 'updateImage', true);
    var datos = new FormData();
    datos.append('num_pokedex', num);
    datos.append('imagen', img);
    datos.append('_token', token);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(ajax.responseText);
            // var tabla = '';
            // mensaje.innerHTML = 'Pokemon '+num+' agregado a favorito';

            if (respuesta.resultado == 'OK') {
                mensaje.innerHTML = 'Pokemon '+num+' registrado';
            } else {
                mensaje.innerHTML = 'Ha ocurrido un error.' + respuesta.resultado;
            }
            closeModal();
            read();
        }
    }
    ajax.send(datos);
}

function openModal(num) {
    modal.style.display = "block";
    document.getElementById('numero_pokedex').value = num;
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/* comillas en envío de variables de entrada en funciones JS: &#039 */

/* EX:
1. filtro favoritos
2. liberar pokémons (quitar la imagen)
*/