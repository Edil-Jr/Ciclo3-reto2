//creacion funcion lectura datos
$(document).ready(function () {
    adquirirDatos();
});

function adquirirDatos(){
    $("#registronuevo").hide();
    $("#editarregistro").hide();
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
    let identificador;
    let tablaDatos =`<table class="table"> <thead class="thead-dark">
                        
                        <tr>
                            <th scope="col">MARCA</th>
                            <th scope="col">HABITACIONES</th>
                            <th scope="col">CATEGORIA</th>
                            <th scope="col">NOMBRE CABAÑA</th>
                            <th scope="col">ACCIONES</th>
                            </tr>
                        
                        <tbody>`;
    for(i=0;i<items.length;i++){
        tablaDatos+="<tr>";
        tablaDatos+="<td>"+items[i].brand+"</td>";
        tablaDatos+="<td>"+items[i].rooms+"</td>";
        tablaDatos+="<td>"+items[i].category_id+"</td>";
        tablaDatos+="<td>"+items[i].name+"</td>";
        identificador = items[i];
        tablaDatos+=`<td><button class="btn btn-primary" onclick="visualizacion(${items[i].id});" type="button">Editar</button>
        <button class="btn btn-primary" onclick="borrarRegistro(${items[i].id});" type="button">Borrar</button>
        </td>`;
        tablaDatos+="</tr>";

       
    }

    tablaDatos+="<tbody></table>";
    console.log(items);
    $("#listadatos").html(tablaDatos);
    $("#listadatos").show(200);
}

function pagnuevoRegistro(){
    $("#listadatos").hide();
    $("#editarregistro").hide();
    $("#registronuevo").show(500);
}

function agregarRegistro(){
    let dataj = {id:$("#idcabana").val(),
    brand:$("#brandcabana").val(),
    rooms:$("#roomscabana").val(),
    category_id:$("#categorycabana").val(),
    name:$("#namecabana").val()};
    let datatoSend = JSON.stringify(dataj);
    if(dataj.id=="" || dataj.brand=="" || dataj.rooms=="" || dataj.category_id=="" || dataj.name==""){
        alert("Ingrese valores en todos los campos");
    }
    else{
        $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        data: datatoSend,
        type: 'POST',
        contentType:"application/JSON",
        success: function(answers){
            console.log(answers);
            $("#idcabana").val(""), $("#brandcabana").val(""), $("#roomscabana").val(""), $("#categorycabana").val(""), $("#namecabana").val("");
            alert("Información cargada con exito");
        },
        error: function(xhr,status){
            alert("No se logró cargar la información ");
        }
        })
    }
}

function visualizacion(id){
    console.log(id);
    $("#listadatos").hide();
    $("#registronuevo").hide();
    $("#editarregistro").show(500);
    consultaporId(id);

}

function consultaporId(id){
    //alert("función ok");
    //let datos = {id:id};
    //let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin/"+id,
        type: 'GET',
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(answers){
            console.log(answers.items);
            $("#idcabanaedit").val(id);
            $("#brandcabanaedit").val(answers.items[0].brand);
            $("#roomscabanaedit").val(answers.items[0].rooms);
            $("#categorycabanaedit").val(answers.items[0].category_id);
            $("#namecabanaedit").val(answers.items[0].name);
        },
        error: function(xhr,status){
        }
        })
}

function consultaId(){
    //alert("función ok");
    let datos = {id:$("#idcabanaedit").val(),brand:$("#brandcabanaedit").val(),rooms:$("#roomscabanaedit").val(),category_id:$("#categorycabanaedit").val(),name:$("#namecabanaedit").val()};
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        data: datosPeticion,
        type: 'PUT',
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(answers){
            //adquirirDatos();
        },
        error: function(xhr,status){
            alert("el registro fue editado exitosamente");
            adquirirDatos();

        }
        })
}

function borrarRegistro(items){
    let datos={id: items};
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        data: datosPeticion,
        type: 'DELETE',
        contentType:"application/JSON",
        dataType:"JSON",
        success: function(answers){
            alert("el registro fue borrado exitosamente");
            adquirirDatos();
        },
        error: function(xhr,status){
            alert("No se logró borrar el registro");
        }
        })
}