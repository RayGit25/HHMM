var cabecerasPrincipal = ["Periodo", "Estado"];
var matrizIndicePrincipal = [0, 1];
var anchosPrincipal = [45, 45];
var matrizFiltroPrincipal = [];
var matrizPrincipal = [];
var cabecerasDetalle = ["Médico/Empresa", "Tipo", "Tipo Descuento", "Nombre Descuento", "Importe", "Estado"];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5];
var anchosDetalle = [15, 15, 15, 15, 15, 15];
var matrizFiltroDetalle = [];
var matrizDetalle = [];
var urlBase = "", ss = "", sucursalId = "";
var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}
var PeriodosSeleccionados = [];
var MedicosSeleccionados = [];
var registrosPagina = 10;

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


window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	crearTabla("Principal");
	crearTabla("Detalle");
	configurarControles();
}

function listarBusqueda(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		var listaPrincipal = data[0].split("¯");
		var listaDetalle = data[1].split("¯");
		crearMatriz(listaPrincipal, "Principal");
		crearMatriz(listaDetalle, "Detalle");
		mostrarMatriz(0, "Principal");
	}

}

function crearMatriz(lista, identificador) {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	window["matriz" + identificador] = [];
	window["matrizFiltro" + identificador] = [];
	for (i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		window["matriz" + identificador][x] = [];
		window["matrizFiltro" + identificador][x] = [];
		nCampos = campos.length;
		for (j = 0; j < nCampos; j++) {
			if (isNaN(campos[j]) || campos[j] == "") {
				window["matriz" + identificador][x][j] = campos[j];
				window["matrizFiltro" + identificador][x][j] = campos[j];
			}
			else {
				window["matriz" + identificador][x][j] = campos[j] * 1;
				window["matrizFiltro" + identificador][x][j] = campos[j] * 1;
			}
		}
		x++;
	}
}



function paginar(indicePagina, identificador) {
	var nRegistros = window["matriz" + identificador].length;
	esBloque = (indicePagina < 0);
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
		if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
		if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
		switch (indicePagina) {
			case -1:
				indicePagina = 0;
				indiceActualBloque = 0;
				break;
			case -2:
				if (indiceActualBloque > 0) {
					indiceActualBloque--;
					indicePagina = indiceActualBloque * paginasBloque;
				}
				break;
			case -3:
				if (indiceActualBloque < indiceUltimoBloque) {
					indiceActualBloque++;
					indicePagina = indiceActualBloque * paginasBloque;
				}
				break;
			case -4:
				indicePagina = indiceUltimaPagina;
				indiceActualBloque = indiceUltimoBloque;
				break;
		}
	}
	indiceActualPagina = indicePagina;
	mostrarMatriz(indicePagina, identificador);
}


function mostrarMatriz(indicePagina, opcion) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	Campoeliminar = "";
	var n;
	var nCampos;
	var inicio;
	var fin;
	switch (opcion) {
		case "Principal":
			n = matrizPrincipal.length;
			if (n > 0) {
				nCampos = cabecerasPrincipal.length;
				for (var i = 0; i < n; i++) {
					if (i < n) {
						valor = matrizPrincipal[i];
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnPeriodo' data-id='";
						contenido += i;
						contenido += "' onclick='FiltrarPeriodo(";
						contenido += i;
						contenido += ",this.checked)'/></td>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td>";
							contenido += valor[j];
							contenido += "</td>";
						}
						contenido += "<td style='text-align:center'><span class='Icons fa-reload'></span>";
						contenido += "</td>";
						contenido += "</tr>";
					}
					else break;
				}
			}
			else {
				contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
				contenido += (nCampos + 2).toString();
				contenido += "'>No hay datos</td></tr>";
			}
			document.getElementById("tbPrincipal").innerHTML = contenido;
			break;

		case "Detalle":
			inicio = indicePagina * registrosPagina;
			fin = inicio + registrosPagina;
			n = matrizDetalle.length;
			nCampos = cabecerasDetalle.length;
			if (n > 0) {				
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						valor = matrizDetalle[i];
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' data-id='";
						contenido += i;
						contenido += "'/></td>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td>";
							contenido += valor[j];
							contenido += "</td>";
						}
						contenido += "<td style='text-align:center'><span class='Icons fa-reload'></span>";
						contenido += "</td>";
						contenido += "</tr>";
					}
					else break;
				}				
			}
			else {
				contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
				contenido += (nCampos + 2).toString();
				contenido += "'>No hay datos</td></tr>";
			}
			document.getElementById("tbDetalle").innerHTML = contenido;
			break;
			
	}
	
}



function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "Principal":
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'><th style='width:5%'></th>";
			break;
		case "Detalle":
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='text-align:center;width:5%;vertical-align:middle'><input type='checkbox'/></th>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador][j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace";
		contenido += identificador;
		contenido += "' data-orden='";
		contenido += window["matrizIndice" + identificador][j];
		contenido += "'>";
		contenido += window["cabeceras" + identificador][j];
		contenido += "</span><br/>";
		contenido += "<input type='text' class='Texto";
		contenido += identificador;
		contenido += "' name='cabecera";
		contenido += identificador;
		contenido += "' style='width:90%'>";
		contenido += "</th>";
	}
	switch (identificador) {
		case "Principal":
			contenido += "<th style='width:5%'></th>";
			break;
		case "Detalle":
			contenido += "<th style='width:5%;vertical-align:middle;text-align:center'><i class='Icons fa-file-excel-o'></i></th>";
			break;
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}



function configurarControles() {
	var spnDoctor = document.getElementById("spnDoctor");
	spnDoctor.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("txtMedico").value = datos[1];
		}
	}

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		var cboMes = document.getElementById("cboMes").value;
		var txtAnio = document.getElementById("txtAnio").value;
		var ddlEstado = document.getElementById("ddlEstado").value;
		var hdfMedico = document.getElementById("hdfMedico").value;
		var lista = hdfMedico + "¦" + sucursalId + "¦" + (cboMes + txtAnio) + "¦" + ddlEstado;
		var url = urlBase + "Proceso/ProcesoDescuentoListar?ss=" + ss;
		$.ajax(url, "post", listarBusqueda, lista);
	}
}


function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}



function FiltrarPeriodo(id, opcion) {
	if (opcion) {
		PeriodosSeleccionados.push(matrizPrincipal[id][0]);
	}
	else {
		for (var x = 0; x < PeriodosSeleccionados.length; x++) {
			if (PeriodosSeleccionados[x] == matrizPrincipal[id][0]) {
				PeriodosSeleccionados.splice(x, 1);
				break;
			}
		}
	}

	var matrizCopia = matrizFiltroDetalle.slice(0);
	var matriz = [];
	var contador = 0;
	for (var x = 0; x < PeriodosSeleccionados.length; x++) {
		for (var y = 0; y < matrizCopia.length; y++) {
			if (PeriodosSeleccionados[x] == matrizCopia[y][7]) {
				matriz[contador] = matrizCopia[y];
				contador++;
			}
		}
	}

	matrizDetalle = [];
	matrizDetalle = matriz.slice(0);
	paginar(0, "Detalle");
}