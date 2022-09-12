// simbolos [ ] {}  =>

// let buttons= document.getElementsByClassName(".btn btn-dark")
// console.log(buttons)
//VARIABLES
let listadecompras= [ ];
let recuperoStorage= localStorage.getItem("listadecompras");
let container = document.querySelector('.container');
let article = "";
let pedido= document.getElementById("pedido")
let res=document.getElementById("res");
let cantinad=document.getElementById("cantidad");
// let calcular= document.getElementsByClassName(".calcular")
let totalcompras= 0;
let resultado=0;
let totalfinal=0;
let eleccion= [ ];
// let equipos= [ ];

// https://my-json-server.typicode.com/ivanvn19/productos/db

fetch(' https://my-json-server.typicode.com/ivanvn19/equipos/db') 
.then( (resp) => resp.json())
.then( (data) => {
    equipos= data.data
    console.log (equipos)
    console.log(data)
    equipos.forEach((equipo) => {
        const {imgSrc, modelo, precio, id} = equipo 
        article += `<div class="Card-equipo" style="width: 18rem;">
                        <div class="producto"><img src="${imgSrc}"></div>
                        <h5 class="card-title">${modelo}</h5>
                        <p class="card-text">Precio por jonrada: $${precio}</p>
                        <div id="${id}"><button class="btn btn-dark">COTIZAR</button></div>
                    </div>`
                    
    })
    container.innerHTML += article
    recuperoStorage != null ? infoenStorage(equipos):amlacenaInfo(equipos)
})


function amlacenaInfo(equipos){
    // console.log(equipos)
    let buttons = document.querySelectorAll('.btn');
    for (button of buttons){
        button.onclick= (e) => {
            consologuear("button clicked")
            let element= e.target.parentElement
            let id=element.attributes.id.value
            let eleccion = equipos.find (e => e.id==id)
            console.log (equipos)
            consologuear(eleccion)
            if (listadecompras. includes(eleccion)) {
                consologuear("este equipo ya fue seleccionado " ); 
                let anularEleccion=  listadecompras.indexOf(eleccion);
                listadecompras.splice(anularEleccion, 1)
                let equipoElegidoYa= document.querySelector(`#id-${id}`)
                pedido.removeChild(equipoElegidoYa)
                res.innerHTML =` `;
            
            } else {
                consologuear("este equipo no fue seleccionado ");       
                let {imgSrc, modelo, precio, id} = eleccion 
                listadecompras.push(eleccion)
                pedido.innerHTML += ` <div id= id-${id}>
                <div class="producto" ><img src="${imgSrc}"></div>
                    <div class="texto">
                        <h5 class="card-title">${modelo}</h5>
                        <p class="card-text">Precio por jonrada: $${precio}</p>
                    </div>
                </div>`;
                Toastify({
                    text: `Has seleccionado ${modelo} con un valor de $ ${precio} ARS  por jornada `,
                    className: "info",
                    style: {
                    background:"linear-gradient(to right, #fff633, #000000)",
                    
                    }
                }).showToast();
                totalcompras = listadecompras.reduce ( (acc, item )=> acc + item.precio, 0)
                res.innerHTML =` <h5><strong >Sub: $ ${totalcompras} por jornada</strong> </h5>`;
            }
            consologuear(listadecompras)
            localStorage.setItem("listadecompras", JSON.stringify(listadecompras))
        }
            
}

}
let formulario= document.getElementById("CalculoJornadas")
               //let jornadasElegidas= docudocument.getElementById("jor")
            formulario.addEventListener("submit", jornadas)
            function jornadas(e) {
                            e.preventDefault()
                            let formArray=e.target
                            let jor=formArray [0] 
                            // de aca para abajo sería lo del boton calcular 
                            totalcompras = listadecompras.reduce ( (acc, item )=> acc + item.precio, 0)
                            let totalfinal=  totalcompras*jor.value
                            consologuear(totalfinal)
                            let resultadofinal=document.getElementById("totalfinal")
                            resultadofinal.innerHTML=  `<h5><strong > tu alquiler tiene un valor total de $ ${totalfinal} ARS</strong></h5>` 
                            //ACÁ TIENE Q IR EL SWALLL ALERTANDO LA COTIZACIÓN CON E LTOTAL
                            swal({
                                title: "Completaste tu cotización",
                                text: ` tu alquiler tiene un valor total de $ ${totalfinal} ARS` ,
                                icon: "success",
                                button: "excelente",
                                className:"dulce",
                            });
    }

function infoenStorage(equipos){
    listadecompras= JSON.parse(recuperoStorage)
    console.log(listadecompras)
    listadecompras.map(listadecompra => {
        pedido.innerHTML += ` <div id= id-${listadecompra.id}>
                <div class="producto" ><img src="${listadecompra.imgSrc}"></div>
                    <div class="texto">
                        <h5 class="card-title">${listadecompra.modelo}</h5>
                        <p class="card-text">Precio por jonrada: $${listadecompra.precio}</p>
                    </div>
                </div>`;
                    
    })
  // console.log("llegue")
    amlacenaInfo(equipos)
}
function consologuear(mensaje){
    console.log(mensaje)
}





//FUNCIONES: DENTRO DE LA FUNCIÓN MAESTRA ALMACENO LOS OBJETOS SELECCIONADOS EN UN ARRAY QUE ENVIO AL LOCAL STORAGE PARA ALMACENAR Y CONSUMIR. UTILIZO BUCLES PARA RECORRER EL ARRAY DE LOS EQUIPOS SELECCIONADOS POR EL USUARIO, Y EXTRAER LOS PRECIOS.  TAMBIEN REALIZAO OTRAS FUNCIONES DE SUMA Y MULTIPLICACIÓN PARA LOS CALCULOS DEL SIMULADOR. Creo funciones para introducir diferentes procedimientos que luego uso para aplicar operadores de orden superior (if ternario etc...), tambien creo la función consologuear. para evitar poner console.log todo el tiempo


// UTILIZO UN CONDICIONAL PARA ESTABLECER EL FUNCIONAMIENTO CORRECTO DEL SIMULADOR TENIENDO EN CUENTA SI EL STORAGE TIENE INFO O NO (ESTO MODIFICARÁ LA FORMA DE FUNCIONAR DEL SIMULADOR.) DENTRO DE ESTE CONDICIONAL DECALRO LA FUNCIÓN MAESTRA Y TAMBIÉN UN COMPORTAMIENTO PARA QUE EN CASO DE TILDAR UN EQUIPO POR ERROR, TOCANDOLO DE NUEVO  SE BORRE DEL HTML Y DEL STORAGE 


