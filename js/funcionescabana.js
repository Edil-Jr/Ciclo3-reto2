//creacion funcion lectura datos
$(document).ready(function () {
    adquirirDatos();
});

function adquirirDatos(){
    $("#registronuevo").hide();
    $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type: 'GET',
        dataType: 'JSON',
        success: function(answers){
            console.log(answers);
            despliegueDatos(answers.items);
        },
        error: function(xhr,status){
            alert("No se logró actualizar la tabla");
        }
    })
}

function despliegueDatos(items){
    const identificador = [];
    let tablaDatos =`<table class="table table-dark table-striped">
                        <thead>
                        <tr>
                            <th scope="col">MARCA</th>
                            <th scope="col">HABITACIONES</th>
                            <th scope="col">CATEGORIA</th>
                            <th scope="col">NOMBRE CABAÑA</th>
                            <th scope="col">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>`;
    for(i=0;i<items.length;i++){
        tablaDatos+="<tr>";
        tablaDatos+="<td>"+items[i].brand+"</td>";
        tablaDatos+="<td>"+items[i].rooms+"</td>";
        tablaDatos+="<td>"+items[i].category_id+"</td>";
        tablaDatos+="<td>"+items[i].name+"</td>";
        tablaDatos+=`<td><button class="btn btn-primary" type="button">Editar</button>
        <button class="btn btn-primary" type="button">Borrar</button>
        </td>`;
        tablaDatos+="</tr>";
    }
    tablaDatos+="<tbody></table>";
    $("#listadatos").html(tablaDatos);
    $("#listadatos").show(200);
}

function pagnuevoRegistro(){
    $("#listadatos").hide();
    $("#registronuevo").show(500);
}

function agregarRegistro(){
    let dataj = {id:$("#idcabana").val(),
    brand:$("#brandcabana").val(),
    rooms:$("#roomscabana").val(),
    category_id:$("#categorycabana").val(),
    name:$("#namecabana").val()};
    if(dataj.id=="" || dataj.brand=="" || dataj.rooms=="" || dataj.category_id=="" || dataj.name==""){
        alert("Ingrese valores en todos los campos");
    }
    else{
        let datatoSend = JSON.stringify(dataj);
        $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type: 'POST',
        data: datatoSend,
        dataType: 'JSON',
        success: function(answers){
            console.log(answers);
            alert("Información cargada con exito");
        },
        error: function(xhr,status){
            alert("No se logró cargar la información");
        }
        })
    }
}