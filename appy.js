//Ejercicio 1: Punto A
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));      //uso fetch para peticiones asincronicas a servidores y obtener datos, archivos etc E importo la libreria node-fetch para usarla en el entorno de Node.js, ya que fetch es nativo en navegadores pero no en Node.js 
const fs = require('fs/promises');
const path = require('path');

const URL = "https://thronesapi.com/api/v2/Characters";        //para sincronizar y guardar la URL de la API en una constante

async function obtenerPersonajes() {     //defino la funcion para obtener los personajes de la API, es asincronica porque se espera una respuesta de la API
    try {
        const res = await fetch(URL);    //momento donde se hace la peticion a la API, y res guarda la respuesta de la API
        const data = await res.json();     //convierte la respuesta de la API a json

        console.log(data);

        // Ejercicio 1: Punto D: guardar en disco lo que devolvio la primera consulta (lista de personajes)
        const archivo = path.join(__dirname, 'personajes.json');
        await fs.writeFile(archivo, JSON.stringify(data, null, 2), 'utf8');
        console.log('Datos guardados en:', archivo);

    } catch (error) {         //por si hay un error
        console.error("Error:", error);     //imprime el eror en consola
    }
}

//Ejercicio 1: Punto C — GET de un personaje por id (el id va en la URL)
async function obtenerPersonajePorId(id) {
    try {
        const res = await fetch(`${URL}/${id}`);
        if (!res.ok) {
            console.error('Respuesta no OK. Status:', res.status);
            return;
        }
        const data = await res.json();
        console.log('Personaje id', id, ':', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

//obtenerPersonajes();
//obtenerPersonajePorId(1);   // ejemplo: buscar el personaje con id 1 (cambiar el numero si queres otro)



//Ejercicio 1: Punto B
async function agregarPersonaje() {
    try {
        const nuevoPersonaje = {
            fullName: "Juan Stark",
            title: "Rey del Norte",
            family: "Stark",
            imageUrl: ""
        };

        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPersonaje)
        });


        console.log("Status:", res.status);
        console.log("Personaje enviado correctamente (simulado)");

    } catch (error) {
        console.error("Error:", error);
    }
}

//agregarPersonaje();


//Ejercicio 2: Punto A
async function agregarPersonajeAlFinal(){
    try {
        const archivo = path.join(__dirname, 'personajes.json'); //se define la ruta del archivo
        const data = await fs.readFile(archivo, 'utf8'); //se lee el contenido del archivo personajes.json

        const personajes = JSON.parse(data);

        const nuevoPersonaje = {
            id: personajes.length,
            firstName: "Aegon",
            lastName: "Targaryen",
            fullName: "Aegon Targaryen",
            title: "Rey de los Siete Reinos",
            family: "Targaryen",
            imageUrl: ""
        };

        personajes.push(nuevoPersonaje); //se agrega el nuevo objeto al final de la lista

        await fs.writeFile(archivo, JSON.stringify(personajes, null, 2), 'utf8'); //se guardan los cambios actualizando el archivo físico
        console.log('Nuevo personaje agregado al final del archivo:', nuevoPersonaje);

    } catch (error) {
        console.error("Error:", error);
    }
}

//agregarPersonajeAlFinal();