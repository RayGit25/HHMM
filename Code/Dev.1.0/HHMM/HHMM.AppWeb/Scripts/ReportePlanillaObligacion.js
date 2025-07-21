var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
};

function requestServer(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload") { window.parent.parent.location.reload(); }
			success(xhr.responseText);
		}
	};
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}

var matrizPrincipal = [];
var matrizFiltroPrincipal = [];
var listaTipo = [], listaClasificacion = [];

var cabecerasPrincipal = ["Persona", "Médico/Empresa", "Planilla", "Proceso", "Periodo", "Tipo", "Servicio", "Tipo Compr.", "Número Compr.", "SubTotal", "Impuesto", "Monto Obligación", "Fecha Envio CxP", "Usuario Envio CxP"];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var anchosPrincipal = [6, 100, 6, 20, 6, 25, 40, 15, 28, 10, 10, 25, 20, 30];
var anchosExcelPrincipal = [90, 300, 80, 70, 120, 120, 120, 90, 110, 80, 80, 120, 110, 130];
//var anchosPDFPrincipal = [90, 500, 80, 70, 120, 120, 120, 90, 110, 80, 80, 120, 110, 130];
var cabecerasPDFPrincipal = ["Persona", "Médico/Empresa", "Planilla", "Proceso", "Periodo", "Tipo", "Servicio", "T. C.", "N° Compr.", "SubTotal", "Impuesto", "Monto Obligación", "Fecha Envio CxP", "Usu. Envio CxP"];
var anchosPDFPrincipal = [4, 14, 4, 13, 4, 8, 8, 3, 9, 5, 5, 5, 11, 7];

var registrosPagina = 7;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;

var urlBase = "", opcionfiltro = -1, ss = "", sucursal = "", sucursalId = "";

window.onload = function () {
	var sinanimacion = document.getElementsByClassName("no-animacion");
	while (sinanimacion[0]) {
		sinanimacion[0].style.display = "";
		sinanimacion[0].className = "PopUp";
	}
	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	document.getElementById("txtSucursal").value = sucursal;
	ConfiguracionInicial();
	var url = urlBase + "Control/ListasReportePlanillaObligacion?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarCombos);
};

function listarCombos(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		llenarCombo(data[0].split("¯"), "ddlBusPeriodo", "¦", "Seleccione");
		llenarCombo(data[1].split("¯"), "ddlBusTipoAdmision", "¦", "Seleccione");
		llenarCombo(data[2].split("¯"), "ddlBusEstado", "¦");
		llenarCombo(data[3].split("¯"), "ddlBusUsuario", "¦", "Seleccione");
		var lista=crearMatriz(data[3].split("¯"),"¦");
		var hdfuId = document.getElementById("hdfuId").value;
		for (var x = 0; x < lista.length; x++) {
			if (lista[x][0] == hdfuId) {
				document.getElementById("ddlBusUsuario").value = hdfuId;
				break;
			}
		}
	}
	document.getElementById("ddlBusEstado").value = "G";
	document.getElementById("ddlBusMedEmp").onchange();

}


function listarTodo(rpta) {
	var data = rpta.split("¯");
	crearMatriz(data, "¦", "Principal");
	document.getElementById("divPrincipal").style.display = "";
	paginar(0, "Principal");
	var divTablaPrincipal = document.getElementById("divTablaPrincipal");
	if (rpta == "") {
		divTablaPrincipal.style.tableLayout = "";
	}
	else {
		divTablaPrincipal.style.tableLayout = "fixed";
	}

}

function ConfiguracionInicial() {
	crearTabla("Principal");
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
}

function crearMatriz(lista, separador, identificador) {
	var nRegistros = lista.length;
	var nCampos = 0,
        campos, x = 0,
        matriz = [],
        j = 0,
        i = 0;
	identificador = (identificador == undefined ? "" : identificador);
	if (nRegistros > 0 && lista[0] != "") {
		for (; i < nRegistros; i++) {
			campos = lista[i].split(separador);
			nCampos = campos.length;
			matriz[x] = [];
			switch (identificador) {
				case "Principal":
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 14) {
							switch (j) {
								case 12:
									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : campos[j]);
									break;
								default:
									matriz[x][j] = campos[j];
									break;
							}

						}
						else matriz[x][j] = campos[j] * 1;
					}
					break;
				default:
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") matriz[x][j] = campos[j];
						else matriz[x][j] = campos[j] * 1;
					}
					break;
			}
			j = 0;
			x++;
		}
		if (identificador != "") {
			window["matriz" + identificador] = matriz.slice(0);
			window["matrizFiltro" + identificador] = matriz.slice(0);
		}
		else {
			return matriz;
		}
	} else {
		if (identificador != "") {
			window["matriz" + identificador] = [];
			window["matrizFiltro" + identificador] = [];
		} else {
			return matriz;
		}
	}
}


function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "Principal":
			contenido = "<table class='tabla-general' id='divTablaPrincipal' style='table-layout:fixed;width: 2094px;margin-bottom:5px'>";
			contenido += "<thead class='tabla-FilaCab'>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador][j];
		contenido += "px'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace";
		contenido += identificador;
		contenido += "' data-orden='";
		contenido += window["matrizIndice" + identificador][j];
		contenido += "'>";
		contenido += window["cabeceras" + identificador][j];
		contenido += "</span><br/>";
		switch (j) {
			//case 3:
			//	contenido += "<select class='Combo";
			//	contenido += identificador;
			//	contenido += "' name='cabecera";
			//	contenido += identificador;
			//	contenido += "' style='width:90%' id='CabTipo'>";
			//	contenido += "</select>";
			//	break;
			default:
				contenido += "<input type='text' class='Texto";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%'>";
				break;
		}
		contenido += "</th>";
	}
	//switch (identificador) {
	//	case "Principal":
	//		contenido += "<th style='width:6px;vertical-align:middle;text-align:center'><a id='aExportarExcel' href='#'><i class='Icons fa-file-excel-o'></i></a>&nbsp;<i class='Icons fa-file-pdf-o' id='aExportarPDF'></i></th>";
	//		break;
	//}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}

function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("EnlacePrincipal");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "Principal");
			paginar(indiceActualPagina, "Principal");
		};
	}
}

function listarPDF(rpta) {
	if (rpta != "") {
		var data = rpta.split("¦");
		var fecha = new Date();
		if (isIE()) {
			var archivo = crearBlob(data[1]);
			var blob = new Blob([archivo], {
				type: 'application/pdf'
			});
			window.navigator.msSaveBlob(blob, "EnvioCxP-" + fecha.getFullYear().toString() + ((fecha.getMonth() + 1) < 10 ? "0" + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString()) + ((fecha.getDate()) < 10 ? "0" + (fecha.getDate()).toString() : (fecha.getDate()).toString()) + ".pdf");
		} else {
			//var link = "data:application/pdf;base64," + data[1];
			var archivo = crearBlob(data[1]);
			var blob = new Blob([archivo], {
				type: 'application/pdf'
			});
			var link = URL.createObjectURL(blob);
			var ventana = window.open(link, '_blank');
			if (ventana == null || typeof (ventana) == 'undefined') {
				var a = document.createElement("a");
				a.href = link;
				a.download = "EnvioCxP-" + fecha.getFullYear().toString() + ((fecha.getMonth() + 1) < 10 ? "0" + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString()) + ((fecha.getDate()) < 10 ? "0" + (fecha.getDate()).toString() : (fecha.getDate()).toString()) + ".pdf";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				delete a;
			}
		}
	}
}

function crearBlob(archivo) {
	var base64str = archivo;
	var binary = atob(base64str.replace(/\s/g, ''));
	var len = binary.length;
	var buffer = new ArrayBuffer(len);
	var view = new Uint8Array(buffer);
	for (var i = 0; i < len; i++) {
		view[i] = binary.charCodeAt(i);
	}
	return view;
}

function isIE() {
	var valor = false;
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	if (isIE == true || isEdge == true) {
		return valor = true;
	}
	return valor;
}

function configurarControles() {
	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		if (matrizPrincipal.length > 0) {
			var excelExportar = exportacion("Principal");
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			var fecha = new Date();
			this.download = "EnvioCxP-" + fecha.getFullYear().toString() + ((fecha.getMonth() + 1) < 10 ? "0" + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString()) + ((fecha.getDate()) < 10 ? "0" + (fecha.getDate()).toString() : (fecha.getDate()).toString()) + ".xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
		else {
			this.download = "";
			return false;
		}
	}

	var aExportarPDF = document.getElementById("aExportarPDF");
	aExportarPDF.onclick = function () {
		if (matrizPrincipal.length > 0) {			
			var Exportar = exportacionPDF("Principal");
			var lista = "Reporte de Planilla|" + Exportar;
			var url = urlBase + "Control/exportarPDF/?ss=" + ss;
			$.ajax(url, "post", listarPDF, lista);
		}
	}


	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		var lista = "";
		var ddlBusPeriodo = document.getElementById("ddlBusPeriodo").value;
		var personaid = (document.getElementById("ddlBusMedEmp").value == "1" ? document.getElementById("hdfMedico").value : document.getElementById("hdfEmpresa").value);
		var ddlBusEstado = document.getElementById("ddlBusEstado").value;
		var txtFechaInicio = document.getElementById("txtFechaInicio").value;
		var txtFechaFin = document.getElementById("txtFechaFin").value;
		var ddlBusUsuario = document.getElementById("ddlBusUsuario").value;
		var ddlBusTipoAdmision = document.getElementById("ddlBusTipoAdmision").value;
		lista = sucursalId + "|" + (ddlBusPeriodo == "" ? 0 : ddlBusPeriodo) + "|" + personaid + "|" + ddlBusEstado + "|" + txtFechaInicio + "|" + txtFechaFin + "|" + (ddlBusUsuario == "" ? 0 : ddlBusUsuario) + "|" + (ddlBusTipoAdmision == "" ? 0 : ddlBusTipoAdmision);
		//var lista = "CB01|0|0||||0|0";
		var url = urlBase + "Control/ListarReportePlanillaObligacion?ss=" + ss;
		$.ajax(url, "post", listarTodo, lista);
	}

	var ddlBusMedEmp = document.getElementById("ddlBusMedEmp");
	ddlBusMedEmp.onchange = function () {
		var spnDoctor = document.getElementById("spnDoctor");
		spnDoctor.onclick = null;
		if (this.value == "1") {
			spnDoctor.onclick = function () {
				var ifrMedico = document.getElementById("ifrMedico");
				if (ifrMedico.innerHTML == "") {
					ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
				}
				abrirPopup("PopupMedico");
			}
		}
		else {
			spnDoctor.onclick = function () {
				var ifrEmpresa = document.getElementById("ifrEmpresa");
				if (ifrEmpresa.innerHTML == "") {
					ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
				}
				abrirPopup("PopupEmpresa");
			}
		}
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("hdfEmpresa").value = "-1";
			document.getElementById("txtMedico").value = datos[1];
		}
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("hdfMedico").value = "0";
			document.getElementById("txtMedico").value = datos[1];
		}
	}

	var txtFechaInicio = document.getElementById("txtFechaInicio");
	txtFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaInicio.readOnly = false;

	var txtFechaFin = document.getElementById("txtFechaFin");
	txtFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaFin.readOnly = false;

	var btnLimpiar = document.getElementById("btnLimpiar");
	btnLimpiar.onclick = function () {
		var limpiar = document.getElementsByName("limpiar");
		var nRegistros = limpiar.length;
		for (var y = 0; y < nRegistros; y++) {
			if (limpiar[y].type == "checkbox") {
				limpiar[y].checked = false;
			} else {
				if (limpiar[y].nodeName == "SELECT") {
					if (limpiar[y].id == "ddlBusEstado") limpiar[y].value = "G";
					else limpiar[y].selectedIndex = "0";
				}
				else {
					limpiar[y].value = "";
				}
			}

		}
		document.getElementById("ddlBusMedEmp").onchange();
		document.getElementById("hdfMedico").value = "0";
		document.getElementById("hdfEmpresa").value = "0";
		document.getElementById("divTablaPrincipal").style.tableLayout = "";
		matrizPrincipal = [];
		mostrarMatriz(0, "Principal");
		document.getElementById("divPrincipal").style.display = "none";
	}
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoPrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Principal");
		};
	}
	var combos = document.getElementsByClassName("ComboPrincipal");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Principal");
		};
	}
}

function ordenarMatriz(enlace, Elemento) {
	indiceOrden = enlace.getAttribute("data-orden") * 1;
	var validado = false;
	if (opcionfiltro != indiceOrden) {
		opcionfiltro = indiceOrden;
		validado = true;
	}
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(Elemento);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	if (validado) {
		window["matriz" + Elemento] = [];
		window["matriz" + Elemento] = mergeSort(window["matrizFiltro" + Elemento], indiceOrden, tipoOrden);
	} else {
		var matrizClon = window["matriz" + Elemento].reverse();
		window["matriz" + Elemento] = [];
		window["matriz" + Elemento] = matrizClon.slice(0);
	}
}



function mergeSort(arr, indice, opcion) {
	if (arr.length < 2)
		return arr;

	var middle = parseInt(arr.length / 2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle, arr.length);

	return merge(mergeSort(left, indice, opcion), mergeSort(right, indice, opcion), indice, opcion);
}

function merge(left, right, indice, opcion) {
	var result = [];
	while (left.length && right.length) {
		if (left[0][indice] > right[0][indice]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}

	}
	while (left.length)
		result.push(left.shift());

	while (right.length)
		result.push(right.shift());

	return result;
}


function filtrar(identificador) {
	var cabeceras = document.getElementsByName("cabecera" + identificador);
	var nCabeceras = cabeceras.length;
	var cabecera, exito = true,
        campos, nCampos = 0;
	window["matriz" + identificador] = [];
	var matriz = window["matrizFiltro" + identificador].slice(0);
	var nRegistros = matriz.length;
	var x = 0,
        i = 0,
        j = 0;
	var indice;
	for (; i < nRegistros; i++) {
		campos = matriz[i];
		nCampos = campos.length;
		for (; j < nCabeceras; j++) {
			exito = true;
			cabecera = cabeceras[j];
			indice = window["matrizIndice" + identificador][j];
			if (cabecera.className == ("Texto" + identificador)) exito = exito && (campos[indice].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[indice] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador][x] = [];
			window["matriz" + identificador][x] = matriz[i].slice(0);
			x++;
		}
		j = 0;
	}
	paginar(0, identificador);
	indiceActualBloque = 0;
}

function paginar(indicePagina, identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
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

function mostrarMatriz(indicePagina, identificador) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	if (n > 0) {
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "Principal":
				var valor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								case 9:
								case 10:
								case 11:
									contenido += "<td style='text-align:right'>";
									contenido += formatearNumero(window["matriz" + identificador][i][j]);
									break;
								default:
									contenido += "<td style='style=word-wrap: break-word;'>";
									contenido += window["matriz" + identificador][i][j];
									break;
							}
							contenido += "</td>";
						}
						//contenido += "<td></td>";
						contenido += "</tr>";
					} else break;
				}

				break;
		}
	} else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCampos).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
}

function crearPaginas(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1,\"" + identificador + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2,\"" + identificador + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += ",\"";
			contenido += identificador;
			contenido += "\");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			contenido += "' id='a";
			contenido += identificador;
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + identificador).innerHTML = "";
	} else {
		document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		seleccionarPaginaActual(identificador);
	}
}

function seleccionarPaginaActual(identificador) {
	var aPagina = document.getElementById("a" + identificador + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function limpiarEnlaces(identificador) {
	var enlaces = document.getElementsByClassName("Enlace" + identificador);
	var nEnlaces = enlaces.length;
	var enlace;
	var campo;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		campo = enlace.innerHTML;
		enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	}
}

function llenarCombo(lista, nombreCombo, separador, titulo) {
	var contenido = "",
        n = lista.length,
        campos = "";
	if (n > 0) {
		if (titulo != undefined && titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
		}
		for (var x = 0; x < n; x++) {
			campos = lista[x].split("¦");
			contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
		}

		var cbo = document.getElementById(nombreCombo);
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
}

function formatearNumero(valor) {
	var valorFrm;
	if (!isNaN(valor * 1)) {
		var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		valorFrm = valor.toLocaleString("en-US", frmMoneda);
	} else {
		valorFrm = "0.00";
	}
	return valorFrm;
}

function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}



function mostraralerta(mensaje, opcion) {
	var spnAlerta = document.getElementById("spnAlerta");
	spnAlerta.innerHTML = mensaje;
	var alerta = document.getElementById("alerta");
	alerta.className = "anix";
	if (opcion == undefined) {
		setTimeout(function () {
			var alerta = document.getElementById("alerta");
			alerta.className = "";
		}, 3500);
	}
}


function exportacion(identificador) {
	var matriz = window["matriz" + identificador];
	var matrizCabecera = window["cabeceras" + identificador];
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var nCampos = matrizCabecera.length;
	contenido.push("<html><head><meta charset='utf-8'/></head><body><table style='table-layout:fixed;width:2500px'>");
	contenido.push("<tr><td style='font-weight:bold'>Compañia</td><td colspan='6'>Sist. de Administración Hospitalaria SAC</td></tr>");
	contenido.push("<tr><td style='font-weight:bold'>Sucursal</td><td colspan='6'>" + sucursal + "</td></tr><tr></tr>");
	contenido.push("<tr style='background-Color:\"#03bf5d\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: " + window["anchosExcel" + identificador] + "px' align='center'>" + matrizCabecera[x] + "</td>");
	}
	contenido.push("</tr>");
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			switch (j) {
				case 9:
				case 10:
				case 11:
					contenido.push("<td style='text-align:right'>");
					contenido.push(formatearNumero(window["matriz" + identificador][i][j]));
					break;
				default:
					contenido.push("<td style='text-align:left'>");
					contenido.push(window["matriz" + identificador][i][matrizIndicePrincipal[j]]);
					break;

			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");

	}
	return (contenido.join("") + "</table></body></html>");
}


function exportacionPDF(identificador) {
	var matriz = window["matriz" + identificador];
	var matrizCabecera = window["cabeceras" + identificador];
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var a = 0, b = 0, c = 0, d = 0;
	var nCampos = matrizCabecera.length;
	contenido.push("<html><head><meta charset='utf-8'/><style type='text/css'>table{font-size:13px !important;}thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'><table style='style='border-collapse: collapse;width:100%;table-layout:fixed'>");
	contenido.push("<thead><tr><td style='font-weight:bold'>Compañia: </td><td colspan='6'>Sist. de Administración Hospitalaria SAC</td></tr>");
	contenido.push("<tr><td style='font-weight:bold'>Sucursal: </td><td colspan='6'>" + sucursal + "</td></tr><tr></tr>");
	contenido.push("<tr style='background-Color:\"#03bf5d\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: " + window["anchosPDF" + identificador][x] + "%!important;border-top:1px solid black;border-bottom:1px solid black;' align='left'>" + cabecerasPDFPrincipal[x] + "</td>");
	}
	contenido.push("</tr></thead><tbody>");
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			switch (j) {
				//case 1:
				//case 3:
				//	contenido.push("<td style='text-align:right'>");
				//	contenido.push("GOMEZ VELASCO DILMER PERCY GOMEZ VELASCO DILMER PERCY");
				//	break;
				case 9:
				case 10:
				case 11:
					switch (j) {
						case 9:
							a = a + window["matriz" + identificador][i][j];
							break;
						case 10:
							b = b + window["matriz" + identificador][i][j];
							break;
						case 11:
							c = c + window["matriz" + identificador][i][j];
							break;
					}
					contenido.push("<td style='text-align:right'>");
					contenido.push(formatearNumero(window["matriz" + identificador][i][j]));
					break;
				default:
					contenido.push("<td style='text-align:left'>");
					contenido.push(window["matriz" + identificador][i][matrizIndicePrincipal[j]]);
					break;

			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");

	}
	contenido.push("<tr><td colspan='9' style='font-weight:bold;text-align:right'>TOTAL</td><td style='font-weight:bold;text-align:right;border:1px solid black'>" + formatearNumero(a) + "</td><td style='font-weight:bold;text-align:right;border:1px solid black'>" + formatearNumero(b) + "</td><td style='font-weight:bold;text-align:right;border:1px solid black'>" + formatearNumero(c) + "</td><td colspan='3'></td>");
	return (contenido.join("") + "</tbody></table></body></html>");
}

function recargarIframe(objeto) {
	var iframe = document.getElementById(objeto).firstChild;
	var txt = iframe.contentWindow.document.getElementsByClassName('Texto');
	for (var x = 0; x < txt.length; x++) {
		if (txt[x].nodeName == "SELECT") {
			txt[x].selectedIndex = "0";
		}
		else {
			txt[x].value = "";
		}
	}
	iframe.contentWindow.filtrar();
}