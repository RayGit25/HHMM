//var lista = [];
var matriz = [];
var matrizDetalle = [];
var matrizSeleccionados = [];
var cabeceras = ["Concepto", "Tipo de Registro", "Periodo", "Importe", "Bonificación", "Descuento", "Ajuste", "Total", "Observado"];
var anchos = [20, 20, 20, 15, 15, 15, 15, 15, 10];
var matrizIndice = [2, -1, -1, 3, 4, 5, 6, 7, -1];
var registrosPagina = 8;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var mensajeValidacion = [];
var urlBase = "";
var idPasar = "";
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
window.onload = function () {
	var hdfDatos = document.getElementById("hdfDatos").value.split("|");
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Proceso/listarDetalleConceptos/?ss=" + ss + "&pro=" + hdfDatos[0] + "&per=" + hdfDatos[1] + "&es=" + hdfDatos[2] + "&sap=" + hdfDatos[3];
	$.ajax(url, "get", listarTodo);
	crearTabla();
	configurarControles();
}


function listarTodo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		var cabecera = data[0].split("¦");
		document.getElementById("txtPeriodo").value = cabecera[0];
		document.getElementById("txtMedico").value = cabecera[1];
		document.getElementById("txtTipoAdmision").value = (cabecera[2] == "1" ? "NO ASEGURADO" : (cabecera[2] == "2" ? "ASEGURADO" : "GENERAL"));
		document.getElementById("txtEspecialidad").value = cabecera[3];
		var divDetalleOcultar = document.getElementById("divDetalleOcultar");
		divDetalleOcultar.style.display = "";
		//if (cabecera[2] == "1" || cabecera[2] != "2") divDetalleOcultar.style.display = "";
		//else divDetalleOcultar.style.display = "none";
		var lista = data[1].split("¯");
		var lista2 = data[2].split("¯");
		var tamano = (lista.length * 20) + 330;
		window.parent.document.getElementById("divIfrProceso").style.height = tamano + "px";
		crearMatriz(lista, true);
		crearMatriz(lista2, false);
		matrizSeleccionados = [];
		var dato;
		for (var x = 0; x < matrizDetalle.length; x++) {
			if (matrizSeleccionados.length == 0) {
				matrizSeleccionados.push(matrizDetalle[x][0]);
				dato = (matrizSeleccionados.length - 1);
			}
			else {
				if (matrizSeleccionados[dato] != matrizDetalle[x][0]) {
					matrizSeleccionados.push(matrizDetalle[x][0]);
					dato = (matrizSeleccionados.length - 1);
				}
			}
		}
		mostrarMatriz();

	}
}


function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%'>"
		contenido += cabeceras[j];
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbDetalle' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "</table>";
	document.getElementById("divDetalle").innerHTML = contenido;
}

function crearMatriz(listado, opcion) {
	var nRegistros = listado.length;
	var nCampos;
	var campos;
	var x = 0;
	if (opcion) {
		matriz = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = listado[i].split("¦");
			matriz[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || j == 0 || j == 9 || j == 10) matriz[x][j] = campos[j];
				else matriz[x][j] = campos[j] * 1;
			}
			a = a + (campos[4] * 1);
			b = b + (campos[5] * 1);
			c = c + (campos[6] * 1);
			d = d + (campos[7] * 1);
			e = e + (campos[8] * 1);
			x++;
		}
	}
	else {
		matrizDetalle = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = listado[i].split("¦");
			matrizDetalle[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j])) matrizDetalle[x][j] = campos[j];
				else matrizDetalle[x][j] = campos[j] * 1;
			}
			x++;
		}
	}
}

function mostrarMatriz() {
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		for (var i = 0; i < n; i++) {
			if (i < n) {
				if (matriz[i][9] == "S") contenido += "<tr class='FilaDatos' style='background: rgba(247, 147, 140, 0.75);color: white;' id='CB" + matriz[i][2] + "'>";
				else contenido += "<tr class='FilaDatos' id='CB" + matriz[i][2] + "'>";
				for (var j = 3; j < (nCampos - 1) ; j++) {

					if (j == 3) {
						if (matriz[i][9] == "S") contenido += "<td style='background: rgba(247, 147, 140, 0.75);color: white;' colspan='3'>";
						else contenido += "<td colspan='3'>";
						for (var x = 0; x < matrizSeleccionados; x++) {
							if (matrizSeleccionados[x] == matriz[i][2]) {
								contenido += "<span class='Icons fa-plus-square' onclick='expandir(\"";
								contenido += matriz[i][2];
								contenido += "\")' id='ME";
								contenido += matriz[i][2];
								contenido += "'></span>&nbsp;";
								break;
							}
						}
						contenido += matriz[i][j];
					}
					else {
						if (j == 9) {
							if (matriz[i][9] == "S") {
								contenido += "<td style='text-align:center;background: rgba(247, 147, 140, 0.75);color: white;'><span class='puntero' onclick='mostrarError(\"";
								contenido += matriz[i][10];
								contenido += "\")'>SI</span>";
							}
							else {
								contenido += "<td style='text-align:center'>NO";
							}
						}
						else {
							if (matriz[i][9] == "S") contenido += "<td style='text-align:right;background: rgba(247, 147, 140, 0.75);color: white;'>";
							else contenido += "<td style='text-align:right'>";
							contenido += matriz[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
						}
					}

					contenido += "</td>";
				}
				contenido += "</tr>";
			}
			else break;
		}
		contenido += "<tr class='FilaDatos'><td style='font-weight:bold;background-color:whitesmoke;color:#797979;text-align:right' colspan='3'>Total</td>";
		contenido += "<td style='text-align:right'>" + a.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + b.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + c.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + d.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + e.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td><td></td>";
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += nCabeceras.toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbDetalle").innerHTML = contenido;
}

function expandir(id) {
	var control = document.getElementById("ME" + id)
	if (control.className.indexOf("plus") > -1) {
		var contenido = "";
		for (var x = 0; x < matrizDetalle.length; x++) {
			if (matrizDetalle[x][0] == (id * 1)) {
				contenido += "<tr class='CBX";
				contenido += id;
				contenido += "'><td></td><td>";
				contenido += matrizDetalle[x][1];
				contenido += "</td><td>";
				contenido += matrizDetalle[x][2];
				contenido += "</td><td style='text-align:right'>";
				contenido += matrizDetalle[x][3].toLocaleString('en-US', { minimumFractionDigits: 2 });
				contenido += "</td><td style='text-align:right'>";
				contenido += matrizDetalle[x][4].toLocaleString('en-US', { minimumFractionDigits: 2 });
				contenido += "</td><td style='text-align:right'>";
				contenido += matrizDetalle[x][5].toLocaleString('en-US', { minimumFractionDigits: 2 });
				contenido += "</td><td style='text-align:right'>";
				contenido += matrizDetalle[x][6].toLocaleString('en-US', { minimumFractionDigits: 2 });
				contenido += "</td><td style='text-align:right'>";
				contenido += matrizDetalle[x][7].toLocaleString('en-US', { minimumFractionDigits: 2 });
				contenido += "</td><td></td></tr>";
				if (matrizDetalle[x + 1] != undefined) {
					if (matrizDetalle[x][0] != matrizDetalle[x + 1][0]) {
						break;
					}
				}
				else {
					break;
				}
			}
		}
		var d1 = document.getElementById("CB" + id);
		d1.insertAdjacentHTML('afterend', contenido);
	}
	else {
		var lista = document.getElementsByClassName("CBX" + id);
		while (lista[0]) {
			lista[0].parentNode.removeChild(lista[0]);
		}
	}
	if (control.className.indexOf("minus") > -1) control.className = control.className.replace("minus", "plus");
	else control.className = control.className.replace("plus", "minus");
}


function configurarControles() {
	var btnCancelar = document.getElementById("btnCancelar");
	btnCancelar.onclick = function () {
		window.parent.abrirPopup('PopupProvisionDetalleConceptos');
	}

	var btnSeleccionarDetalleOA = document.getElementById("btnSeleccionarDetalleOA");
	btnSeleccionarDetalleOA.onclick = function () {
		window.parent.mostrarDetalleOA();
	}

}

function mostrarError(data) {
	window.parent.document.getElementById("spnErrorConcepto").innerHTML = data;
	window.parent.abrirPopup('PopupErrorConcepto');
}

var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}

function requestServer(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload")
				window.parent.parent.location.reload();
			success(xhr.responseText);
		}
	}
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}