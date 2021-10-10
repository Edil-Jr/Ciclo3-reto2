// Servicios JavaScript de la tabla Message
function traerInformacion3(){
    $.ajax({
        url:"https://g3107535369e5fe-db202110021401.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta3(respuesta.items);
        }
  
    });
  }
  
  function pintarRespuesta3(items){
  
    let myTable=`<table class="table"> <thead class="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Mensaje</th>
      <th scope="col">Eliminar</th>
      
    </tr>
  </thead>`;
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button class='btn btn-primary' onclick='borrarElemento3("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);
  }
  
  function guardarInformacion3(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
       
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g3107535369e5fe-db202110021401.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"POST",
        data:myData,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerInformacion3();
            alert("Se ha guardado el dato")
        }
    });
  
  }
  
  function editarInformacion3(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
        
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g3107535369e5fe-db202110021401.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerInformacion3();
            alert("Se ha Actualizado")
        }
    });
  }
  
  function borrarElemento3(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://g3107535369e5fe-db202110021401.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacion3();
            alert("Se ha Eliminado.")
        }
    });
  } 
  