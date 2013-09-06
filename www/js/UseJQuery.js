function CallService()
{
    //Creamos la variable que contiene la url del webservice
    var webServiceURL = 'http://192.168.200.23:8080/WSPrueba/services/Hola?wsdl';
    //Este es el mensaje SOAP, dentro de las etiquetas <CI>'+ $('#ci').val() +'</CI> hacemos uso de una función JQuery para obtener valor que está en el campo de texto
    //var soapMessage = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><holaMundo xmlns="http://src"></holaMundo></soap:Body></soap:Envelope>';
	
	//var soapMessage = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><saludo xmlns="http://src"><nombre>'+ $('#CI').val() +'</nombre></saludo></soap:Body></soap:Envelope>';
 
    //Llamamos a la función AJAX de JQuery
	
	if($("#CI").val().length > 0){
		$.ajax({
			url: "http://192.168.200.23:8080/WSPrueba/services/Hola/saludo", 
			type: "POST",
			data: { nombre : $("#CI").val() }, 
			success: OnSuccess,
			error: OnError
		});
	}else{
		$.ajax({
			url: "http://192.168.200.23:8080/WSPrueba/services/Hola/holaMundo", 
			type: "GET",
			contentType: "text/xml",
			//contentType: "text/xml;charset=UTF-8",
			dataType: "xml",
			data: { "":"" },
			success: OnSuccess,
			error:OnError
		});
	}
    return false;
}
//Función que se ejecuta si realizó completa la petición
function OnSuccess(data, status, req)
{		//alert("Metodo OnSuccess");
		//Check to see if an object is a plain object (created using "{}" or "new Object").
		//alert(jQuery.isPlainObject(data));
		//alert($.isEmptyObject(data)); 
		//alert(JSON.stringify(data));
		//console.log(data);
		//$(data).find("return").text();
		//$("#filaRespuesta").css("display","table");
		
		alert("Status: "+status);
		alert("Data: "+data.getElementsByTagName("ns:return")[0].textContent);
		alert($(req.responseXML).find("ns:return").text());
		//$("#respuesta").val(data.getElementsByTagName("ns:return")[0].textContent);
}
function OnError(request, status, error)  //Función que se ejecuta si ocurre algún error
{
		alert("Metodo OnError");
		alert(status + " " + request.statusText);
}
$(function() {
    //Evita problemas de cross-domain con JQuery
    jQuery.support.cors = true;
});