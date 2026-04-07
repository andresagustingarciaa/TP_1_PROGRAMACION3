//Ejercicio 1: Punto A
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));      //uso fetch para peticiones asincronicas a servidores y obtener datos, archivos etc E importo la libreria node-fetch para usarla en el entorno de Node.js, ya que fetch es nativo en navegadores pero no en Node.js 

const URL = "https://thronesapi.com/api/v2/Characters";        //para sincronizar y guardar la URL de la API en una constante

async function obtenerPersonajes() {     //defino la funcion para obtener los personajes de la API, es asincronica porque se espera una respuesta de la API
    try {
        const res = await fetch(URL);    //momento donde se hace la peticion a la API, y res guarda la respuesta de la API
        const data = await res.json();     //convierte la respuesta de la API a json

        console.log(data);

    } catch (error) {         //por si hay un error
        console.error("Error:", error);     //imprime el eror en consola
    }
}

obtenerPersonajes();



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

agregarPersonaje();

