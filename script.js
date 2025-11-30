function print(msg) {
    document.getElementById("salida").textContent += msg + "\n";
}

function clearOutput() {
    document.getElementById("salida").textContent = "";
}

// 3
function ej3() {
    clearOutput();
    try {
        let numero = 10;
        let resultado = numero / x; 
        print("Resultado: " + resultado);
    } catch (e) {
        print("Ocurrió un error:");
        print("Mensaje: " + e.message);
    }
}


//4
function ej4() {
    clearOutput();
    try {
        JSON.parse("{invalido}");
    } catch (e) {
        print("Nombre: " + e.name);
        print("Mensaje: " + e.message);
    }
}

//5
function ej5() {
    clearOutput();
    try {
        console.log(x); // x no está definida
    } catch (e) {
        print("falló");
    } finally {
        print("siempre se ejecuta");
    }
}

//6
function validarEdad(edad) {
    if (isNaN(edad) || edad < 0) {
        throw new Error("Edad inválida");
    }
    return "Edad válida: " + edad;
}

function ej6() {
    clearOutput();
    try {
        validarEdad(-4);
    } catch (e) {
        print(e.message);
    }
}

//7
function ej7() {
    clearOutput();
    try {
        let x = null;
        x.nombre;
    } catch (e) {
        if (e instanceof TypeError) {
            print("Se produjo un TypeError: " + e.message);
        } else {
            print("Otro tipo de error: " + e.message);
        }
    }
}

//8
function nivel2() {
    try {
        x = y; // error
    } catch (e) {
        print("Nivel 2 atrapó el error: " + e.message);
        throw e; // se relanza
    }
}

function nivel1() {
    try {
        nivel2();
    } catch (e) {
        print("Nivel 1 recibió el error: " + e.message);
        throw e;
    }
}

function ej8() {
    clearOutput();
    try {
        nivel1();
    } catch (e) {
        print("ERROR FINAL capturado en el nivel superior: " + e.message);
    }
}

//9
function cargarMensaje(callback) {
    setTimeout(() => {
        callback("Mensaje cargado");
    }, 1000);
}

function ej9() {
    clearOutput();
    cargarMensaje(msg => print(msg));
}

//10
function cargarUsuario(callback) {
    let tiempo = Math.random() * (1500 - 800) + 800;
    setTimeout(() => {
        callback({ id: 1, nombre: "Juancito" });
    }, tiempo);
}

function ej10() {
    clearOutput();
    cargarUsuario(u => {
        print(`Usuario cargado: ${u.nombre} (ID: ${u.id})`);
    });
}

//11
function dividirAsync(a, b, callback) {
    setTimeout(() => {
        if (b === 0) {
            callback(new Error("No se puede dividir entre cero"), null);
        } else {
            callback(null, a / b);
        }
    }, 1500);
}

function ej11() {
    clearOutput();
    dividirAsync(10, 2, (err, res) => {
        if (err) print(err.message);
        else print("Resultado: " + res);
    });
}

//12
function procesarLista(lista, callback) {
    let procesados = 0;

    lista.forEach(num => {
        let tiempo = Math.random() * 1000 + 500;
        print("Procesando " + num + "...");
        setTimeout(() => {
            procesados++;
            if (procesados === lista.length) {
                callback("Proceso completado");
            }
        }, tiempo);
    });
}

function ej12() {
    clearOutput();
    procesarLista([1, 2, 3, 4], msg => print(msg));
}

//13
function ej13() {
    clearOutput();
    new Promise(resolve => {
        setTimeout(() => resolve("Mensaje cargado"), 1000);
    }).then(print);
}

//14
function ej14() {
    clearOutput();
    new Promise(resolve => {
        let tiempo = Math.random() * (1500 - 800) + 800;
        setTimeout(() => resolve({ id: 1, nombre: "Juancito" }), tiempo);
    }).then(u => print(`Usuario cargado: ${u.nombre} (ID: ${u.id})`));
}

//15
function ej15() {
    clearOutput();
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("No se puede dividir entre cero")), 1500);
    })
        .then(res => print(res))
        .catch(err => print(err.message));
}

//16
function procesarListaPromesa(lista) {
    return Promise.all(
        lista.map(num => {
            return new Promise(resolve => {
                let tiempo = Math.random() * 1000 + 500;
                print("Procesando " + num + "...");
                setTimeout(resolve, tiempo);
            });
        })
    );
}

function ej16() {
    clearOutput();
    procesarListaPromesa([1, 2, 3, 4]).then(() => print("Proceso completado"));
}

//17
async function ej17() {
    clearOutput();
    let r = await new Promise(resolve =>
        setTimeout(() => resolve("Mensaje cargado"), 1000)
    );
    print(r);
}

//18
async function ej18() {
    clearOutput();
    let usuario = await new Promise(resolve => {
        let tiempo = Math.random() * (1500 - 800) + 800;
        setTimeout(() => resolve({ id: 1, nombre: "Juancito" }), tiempo);
    });
    print(`Usuario cargado: ${usuario.nombre} (ID: ${usuario.id})`);
}

//19
async function ej19() {
    clearOutput();
    try {
        await new Promise((res, rej) =>
            setTimeout(() => rej(new Error("No se puede dividir entre cero")), 1500)
        );
    } catch (e) {
        print(e.message);
    }
}

//20
async function ej20() {
    clearOutput();
    let lista = [1, 2, 3, 4];
    for (let num of lista) {
        print("Procesando " + num + "...");
        let tiempo = Math.random() * 1000 + 500;
        await new Promise(resolve => setTimeout(resolve, tiempo));
    }
    print("Proceso completado");
}