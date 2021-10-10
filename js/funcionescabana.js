//creacion funcion lectura datos
$(document).ready(function () {
    adquirirdatos();
});

function adquirirdatos(){
    $.ajax({
        url: "https://g6b8ff7bc67d349-db202109302119.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type: 'GET',
        dataType: 'JSON',
        success: function(answers){
            console.log(answers);
            desplieguedatos(answers.items);
        },
        error: function(xhr,status){
            window.alert("No se logró actualizar la tabla");
        }
    })
}

function desplieguedatos(items){
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
        tablaDatos+="</tr>";
    }
    tablaDatos+="<tbody></table>";
    $("#listadatos").html(tablaDatos);
}