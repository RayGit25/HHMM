var matrizReporte1 = [], matrizReporte2 = [], matrizReporte3 = [], matrizReporte4 = [], matrizReporte5 = []
var matrizFiltroReporte1 = [], matrizFiltroReporte2 = [], matrizFiltroReporte3, matrizFiltroReporte4 = [], matrizFiltroReporte5 = [];


var cabecerasReporte1 = ["Empresa", "Médico", "Total Provisión", "Saldo Provisión", "Total Liquidado", "Total Proceso Pago"];
var anchosReporte1 = [24, 24, 13, 13, 13, 13];
var matrizIndiceReporte1 = [1, 3, 4, 5, 6, 7];
var anchosExcelReporte1 = [400, 400, 150, 150, 150, 150];

var cabecerasReporte2 = ["Tipo Admisión", "Periodo", "IDProvisión", "Periodo Producción", "Moneda", "Total", "Liquidado", "Pagado", "Por Liquidar", "Por Pagar", "Documento", "Fecha Emision"];
var anchosReporte2 = [8, 6, 14, 6, 6, 8, 8, 8, 8, 8, 8, 8];
var matrizIndiceReporte2 = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var anchosExcelReporte2 = [80, 80, 210, 80, 80, 80, 80, 80, 80, 80, 80, 80];


var cabecerasReporte3 = ["Servicio", "Periodo", "IDProvisión", "Periodo Producción", "Moneda", "Total", "Liquidado", "Pagado", "Por Liquidar", "Por Pagar", "Documento", "Fecha Emision"];
var anchosReporte3 = [8, 6, 14, 6, 6, 8, 8, 8, 8, 8, 8, 8];
var matrizIndiceReporte3 = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var anchosExcelReporte3 = [310, 80, 210, 80, 80, 80, 80, 80, 80, 80, 80, 80];

var cabecerasReporte4 = ["Unidad Medica", "Periodo", "IDProvisión", "Periodo Producción", "Moneda", "Total", "Liquidado", "Pagado", "Por Liquidar", "Por Pagar", "Documento", "Fecha Emision"];
var anchosReporte4 = [8, 6, 14, 6, 6, 8, 8, 8, 8, 8, 8, 8];
var matrizIndiceReporte4 = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var anchosExcelReporte4 = [310, 80, 210, 80, 80, 80, 80, 80, 80, 80, 80, 80];

var cabecerasReporte5 = ["Concepto", "Periodo", "IDProvisión", "Periodo Producción", "Moneda", "Total", "Liquidado", "Pagado", "Por Liquidar", "Por Pagar", "Documento", "Fecha Emision"];
var anchosReporte5 = [8, 6, 14, 6, 6, 8, 8, 8, 8, 8, 8, 8];
var matrizIndiceReporte5 = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var anchosExcelReporte5 = [310, 80, 210, 80, 80, 80, 80, 80, 80, 80, 80, 80];

var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloqueReporte1 = 0, indiceActualBloqueReporte2 = 0, indiceActualBloqueReporte3 = 0, indiceActualBloqueReporte4 = 0, indiceActualBloqueReporte5 = 0;
var indiceActualPaginaReporte1 = 0, indiceActualPaginaReporte2 = 0, indiceActualPaginaReporte3 = 0, indiceActualPaginaReporte4 = 0, indiceActualPaginaReporte5 = 0;
var indiceOrden = 0, idEnMatriz = -1, idmedico = -1, idempresa = -1;

var listaPeriodo, listaEspecialidad, listaEstado;

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
var postDownload = function (url, callBack, data) {
    requestServerXHR("post", url, callBack, data);
}

function requestServerXHR(type, url, callBack, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.responseType = (data == null ? "text" : "arraybuffer");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (callBack != null) {
                if (data == null) callBack(xhr.responseText);
                else {
                    if (xhr.response.byteLength == 83)
                        window.parent.parent.location.reload();
                    else
                        callBack(xhr.response);
                }
            }
        }
    }
    if (type == "get") xhr.send();
    else {
        if (data != "") xhr.send(data);
    }
}

var sucursalId = "", sucursal = "", urlBase = "", ss = "", opcionfiltro = -1;

window.onload = function () {
	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	configuracionInicial();
	url = urlBase + "Control/obtenerCuentaCorrienteListas/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listasReporte);
}

function configuracionInicial() {
	crearTabla("Reporte1");
	crearTabla("Reporte2");
	crearTabla("Reporte3");
	crearTabla("Reporte4");
	crearTabla("Reporte5");
	configurarControles();
	configurarFiltro();
	configurarOrdenacion();
}

function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "Reporte2":
			contenido = "<table id='tbl";
			contenido += identificador;
			contenido += "' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
		default:
			contenido = "<table id='tbl";
			contenido += identificador;
			contenido += "' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
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
		switch (identificador) {
			case "Reporte2":
				switch (j) {
					case 0:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'><option value=''>TODOS</option><option value='Asegurado'>Asegurado</option><option value='No Asegurado'>No Asegurado</option><option value='General'>General</option></select>";
						break;
					default:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						break;
				}
				break;
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
	contenido += "<th style='text-align:center'>";
	mostrarLeyenda
	contenido += "<span class='Icons fa-eye' onclick='mostrarLeyenda(";
	if (identificador == "Reporte1") {
		contenido += true;
	} else {
		contenido += false;
	}
	contenido += ");'></span></br>";
    contenido += "<span class='Icons fa-file-excel-o' name='nsExportar' onclick='descargarExcelGenericoDetalle(-1,\"N\");'></span></th>";
	//contenido += "<span class='Icons fa-file-excel-o' name='nsExportar' onclick='descargarExcelGenerico(\"";
	//contenido += identificador;
	//contenido += "\",\"";
	//contenido += "CuentaCorriente"\");'></span></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr><td style='text-align:center' colspan='";
	contenido += (nCampos + 1).toString();
	contenido += "'>No hay datos</td></tr>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos + 1).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}


function mostrarTabs(actual, ultab) {
	var tabs = document.getElementById(ultab);
	var listaTabs = tabs.getElementsByTagName("li");
	var contenido;
	var data_tab, data_tab_actual;
	for (var i = 0; i < listaTabs.length; i++) {
		data_tab = listaTabs[i].getAttribute("data-tab");
		data_tab_actual = actual.getAttribute("data-tab");
		contenido = document.getElementById(data_tab);
		if (data_tab == data_tab_actual) {
			listaTabs[i].className = "tab-link current";
			contenido.className = "tab-content current";
			TipoAlerta = listaTabs[i].getAttribute("data-tipo");
		}
		else {
			if (listaTabs[i].className.indexOf("bloqueado") > -1) listaTabs[i].className = "tab-link bloqueado";
			else listaTabs[i].className = "tab-link";
			contenido.className = "tab-content";
		}
	}
	var datoTab = actual.getAttribute("data-tab");
	switch (datoTab) {
		case "tabx-1":
			var TextoReporte = document.getElementsByClassName("TextoReporte1");
			for (var x = 0; x < TextoReporte.length; x++) {
				TextoReporte[x].value = "";
			}
			var lista = recogerValores("Reporte1");
			filtrar("Reporte1", lista);
			break;
		case "tabx-2":
			var TextoReporte = document.getElementsByClassName("TextoReporte2");
			for (var x = 0; x < TextoReporte.length; x++) {
				TextoReporte[x].value = "";
			}
			var lista = recogerValores("Reporte2");
			filtrar("Reporte2", lista);
			break;
		case "tabx-3":
			var TextoReporte = document.getElementsByClassName("TextoReporte3");
			for (var x = 0; x < TextoReporte.length; x++) {
				TextoReporte[x].value = "";
			}
			var lista = recogerValores("Reporte3");
			filtrar("Reporte3", lista);
			break;
		case "tabx-4":
			var TextoReporte = document.getElementsByClassName("TextoReporte4");
			for (var x = 0; x < TextoReporte.length; x++) {
				TextoReporte[x].value = "";
			}
			var lista = recogerValores("Reporte4");
			filtrar("Reporte4", lista);
			break;
		case "tabx-5":
			var TextoReporte = document.getElementsByClassName("TextoReporte5");
			for (var x = 0; x < TextoReporte.length; x++) {
				TextoReporte[x].value = "";
			}
			var lista = recogerValores("Reporte5");
			filtrar("Reporte5", lista);
			break;
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
	var posAsc = campo.indexOf("▼");
	var posDesc = campo.indexOf("▲");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(Elemento);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	else enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	if (validado) {
		var matrizClon = window["matriz" + Elemento].splice(0, window["matriz" + Elemento].length);
		window["matriz" + Elemento] = mergeSort(matrizClon, indiceOrden);
	} else {
		window["matriz" + Elemento].reverse()
	}
}

function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("EnlaceReporte1");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "Reporte1");
			paginar(indiceActualPaginaReporte1, "Reporte1");
		};
	}

}


function mergeSort(arr, indice) {
	if (arr.length < 2)
		return arr;

	var middle = parseInt(arr.length / 2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle, arr.length);

	return merge(mergeSort(left, indice), mergeSort(right, indice), indice);
}

function merge(left, right, indice) {
	var result = [];
	while (left.length && right.length) {
		if (left[0][indice] >= right[0][indice]) {
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

	var spnEmpresa = document.getElementById("spnEmpresa");
	spnEmpresa.onclick = function () {
		var ifrEmpresa = document.getElementById("ifrEmpresa");
		if (ifrEmpresa.innerHTML == "") {
			ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupEmpresa");
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			var txtEmpresa = document.getElementById("txtEmpresa");
			txtEmpresa.value = datos[1];
		}
	}

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		var a1 = document.getElementById("txtMedico").value;
		var a2 = document.getElementById("txtEmpresa").value;
		var a3 = document.getElementById("ddlEspecialidad").value;
		var a4 = document.getElementById("ddlEstado").value;
		var a5 = document.getElementById("ddlPeriodoProvisionInicio").value;
		var a6 = document.getElementById("ddlPeriodoProvisionFin").value;
		var a7 = document.getElementById("ddlPeriodoProduccionInicio").value;
		var a8 = document.getElementById("ddlPeriodoProduccionFin").value;
		var a9 = document.getElementById("txtfecini").value;
		var a10 = document.getElementById("txtfecfin").value;
		if (a1 == "" && a2 == "" && a3 == "" && a4 == "" && a5 == "" && a6 == "" && a7 == "" && a8 == "" && a9 == "" && a10 == "") {
			mostraralerta("Por favor ingrese o seleccione al menos un criterio de busqueda");
		} else {
			buscarReporte(1);
			matrizReporte1 = [];
			matrizReporte2 = [];
			matrizReporte3 = [];
			matrizReporte4 = [];
			matrizReporte5 = [];
			document.getElementById("DTab1").click();
			document.getElementById("DTab2").className = "tab-link bloqueado";
			document.getElementById("DTab3").className = "tab-link bloqueado";
			document.getElementById("DTab4").className = "tab-link bloqueado";
			document.getElementById("DTab5").className = "tab-link bloqueado";
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}

	var btnLimpiar = document.getElementById("btnLimpiar");
	btnLimpiar.onclick = function () {
		var hdfEmpresa = document.getElementById("hdfEmpresa");
		hdfEmpresa.value = "-1";
		var hdfMedico = document.getElementById("hdfMedico");
		hdfMedico.value = "0";
		document.getElementById("txtMedico").value = "";
		document.getElementById("txtEmpresa").value = "";
		document.getElementById("ddlEspecialidad").value = "";
		document.getElementById("ddlEstado").value = "";
		document.getElementById("ddlPeriodoProvisionInicio").value = "";
		document.getElementById("ddlPeriodoProvisionFin").value = "";
		document.getElementById("ddlPeriodoProduccionInicio").value = "";
		document.getElementById("ddlPeriodoProduccionFin").value = "";
		document.getElementById("txtfecini").value = "";
		document.getElementById("txtfecfin").value = "";
		matrizReporte1 = [];
		matrizReporte2 = [];
		matrizReporte3 = [];
		matrizReporte4 = [];
		matrizReporte5 = [];
		document.getElementById("DTab1").click();
		document.getElementById("DTab2").className = "tab-link bloqueado";
		document.getElementById("DTab3").className = "tab-link bloqueado";
		document.getElementById("DTab4").className = "tab-link bloqueado";
		document.getElementById("DTab5").className = "tab-link bloqueado";
		paginar(-1, "Reporte1");

	}

	//var nsExportar = document.getElementsByName("nsExportar");
	//for (var x = 0; x < nsExportar.length; x++) {
	//	nsExportar[x].onclick = function () {
	//		this.href = "";
	//		var excelExportar = exportarExcel();
	//		var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
	//		this.download = "ReporteCuentaCorriente.xls";
	//		this.href = window.URL.createObjectURL(formBlob);
	//	}
	//}

	var txtfecini = document.getElementById("txtfecini");
	txtfecini.DatePickerX.init({
		mondayFirst: true
	});
	txtfecini.readOnly = false;
	var txtfecfin = document.getElementById("txtfecfin");
	txtfecfin.DatePickerX.init({
		mondayFirst: true
	});
	txtfecfin.readOnly = false;
}

function recogerValores(objeto) {
	var lista = [], contador1 = 0, contador2 = 0;
	var valores = document.getElementsByName("cabecera" + objeto);
	for (var x = 0; x < valores.length; x++) {
		if (valores[x].className.indexOf("Combo") > -1) {
			lista.push([x, valores[x].value.toLowerCase().trim(), false]);
			if (valores[x].selectedIndex != "0" && contador1 == 0) {
				contador1 = 1;
			}

		}
		else {
			if (valores[x].value.trim() != "") {
				lista.push([x, valores[x].value.toLowerCase().trim(), true]);
				contador2 = 1;
			}
		}
	}
	return ((contador1 == 0 && contador2 == 0) ? [] : lista);
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoReporte1");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			var lista = recogerValores("Reporte1");
			filtrar("Reporte1", lista);
		};
	}
	var combos = document.getElementsByClassName("ComboReporte1");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			var lista = recogerValores("Reporte1");
			filtrar("Reporte1", lista);
		};
	}

	var textos = document.getElementsByClassName("TextoReporte2");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			var lista = recogerValores("Reporte2");
			filtrar("Reporte2", lista);
		};
	}
	var combos = document.getElementsByClassName("ComboReporte2");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			var lista = recogerValores("Reporte2");
			filtrar("Reporte2", lista);
		};
	}

	var textos = document.getElementsByClassName("TextoReporte3");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			var lista = recogerValores("Reporte3");
			filtrar("Reporte3", lista);
		};
	}

	var textos = document.getElementsByClassName("TextoReporte4");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			var lista = recogerValores("Reporte4");
			filtrar("Reporte4", lista);
		};
	}

	var textos = document.getElementsByClassName("TextoReporte5");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			var lista = recogerValores("Reporte5");
			filtrar("Reporte5", lista);
		};
	}
}

function filtrar(identificador, lista) {
	opcionfiltro = -1;
	var nCabeceras = lista.length;
	var exito = true, campos;
	window["matriz" + identificador] = [];
	if (nCabeceras > 0) {
		var matriz = window["matrizFiltro" + identificador].slice(0);
		var matrizIndices = window["matrizIndice" + identificador].slice(0);
		var nRegistros = matriz.length;
		var x = 0, i = 0, j = 0, indice;
		for (; i < nRegistros; i++) {
			campos = matriz[i];
			for (; j < nCabeceras; j++) {
				exito = true;
				indice = matrizIndices[lista[j][0]];
				if (lista[j][2]) exito = exito && (campos[indice].toString().toLowerCase().indexOf(lista[j][1]) > -1);
				else exito = exito && (lista[j][1] == "" || campos[indice].toString().toLowerCase() == lista[j][1]);
				if (!exito) break;
			}
			if (exito) {
				window["matriz" + identificador][x] = campos.slice(0);
				x++;
			}
			j = 0;
		}
	} else {
		window["matriz" + identificador] = window["matrizFiltro" + identificador].slice(0);
	}
	paginar(0, identificador);
	limpiarEnlaces(identificador);
	window["indiceActualBloque" + identificador] = 0;
}

function buscarReporte(opcion, id) {
	var url = "";
	var lista = "";
	var hdfMedico = document.getElementById("hdfMedico").value;
	var hdfEmpresa = (document.getElementById("hdfEmpresa").value == "-1" ? 0 : document.getElementById("hdfEmpresa").value);
	var ddlEspecialidad = (document.getElementById("ddlEspecialidad").value == "" ? 0 : document.getElementById("ddlEspecialidad").value);
	var ddlEstado = document.getElementById("ddlEstado").value;
	var ddlPeriodoProvisionInicio = (document.getElementById("ddlPeriodoProvisionInicio").value == "" ? 0 : document.getElementById("ddlPeriodoProvisionInicio").value);
	var ddlPeriodoProvisionFin = (document.getElementById("ddlPeriodoProvisionFin").value == "" ? 0 : document.getElementById("ddlPeriodoProvisionFin").value);
	var ddlPeriodoProduccionInicio = (document.getElementById("ddlPeriodoProduccionInicio").value == "" ? 0 : document.getElementById("ddlPeriodoProduccionInicio").value);
	var ddlPeriodoProduccionFin = (document.getElementById("ddlPeriodoProduccionFin").value == "" ? 0 : document.getElementById("ddlPeriodoProduccionFin").value);
	var txtfecini = (document.getElementById("txtfecini").value == "" ? "01/01/1900" : document.getElementById("txtfecini").value);
	var txtfecfin = (document.getElementById("txtfecfin").value == "" ? "01/01/1900" : document.getElementById("txtfecfin").value);
	var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible").value;
	var indOAvis;
	switch (ddlIndicadorOAVisible) {
		case "True":
			indOAvis = 1;
			break;
		case "False":
			indOAvis = 2;
			break;
		default:
			indOAvis = 3;
			break;
    }
	switch (opcion) {
        case 1:
			lista = ddlPeriodoProvisionInicio + "|" + ddlPeriodoProvisionFin + "|" + ddlPeriodoProduccionInicio + "|" + ddlPeriodoProduccionFin + "|";
			lista += ddlEspecialidad + "|" + ddlEstado + "|" + txtfecini + "|" + txtfecfin + "|" + 0 + "|" + hdfMedico + "|" + hdfEmpresa + "|" + indOAvis;

			//lista = "||" + hdfMedico + "|" + hdfEmpresa;
			var hdfOpcion = document.getElementById("hdfOpcion");
			hdfOpcion.value = opcion;
			url = urlBase + "Control/obtenerCuentaCorrienteReporte/?ss=" + ss + "&su=" + sucursalId + "&opc=" + opcion;
			$.ajax(url, "post", listarReporte, lista);
			idmedico = -1;
			idempresa = -1;
			break;
		case 2:
			lista = ddlPeriodoProvisionInicio + "|" + ddlPeriodoProvisionFin + "|" + ddlPeriodoProduccionInicio + "|" + ddlPeriodoProduccionFin + "|";
			lista += ddlEspecialidad + "|" + ddlEstado + "|" + txtfecini + "|" + txtfecfin + "|" + 0 + "|" + matrizReporte1[id][2] + "|" + matrizReporte1[id][0] + "|" + indOAvis;
			var hdfOpcion = document.getElementById("hdfOpcion");
			hdfOpcion.value = opcion;
			idmedico = matrizReporte1[id][2];
			idempresa = matrizReporte1[id][0];
			idEnMatriz = id;
			var tbReporte1 = document.getElementById("tbReporte1");
			var clases = tbReporte1.getElementsByClassName("FilaDatos");
			for (var x = 0; x < clases.length; x++) {
				if (clases[x].getAttribute("data-id") == (idmedico + "|" + idempresa)) {
					clases[x].className = "FilaDatos seleccionado";
				}
				else {
					clases[x].className = "FilaDatos";
				}
			}
			url = urlBase + "Control/obtenerCuentaCorrienteReporte/?ss=" + ss + "&su=" + sucursalId + "&opc=" + opcion;
			$.ajax(url, "post", listarReporte, lista);
			break;
		case 3:
			lista = ddlPeriodoProvisionInicio + "|" + ddlPeriodoProvisionFin + "|" + ddlPeriodoProduccionInicio + "|" + ddlPeriodoProduccionFin + "|";
			lista += ddlEspecialidad + "|" + ddlEstado + "|" + txtfecini + "|" + txtfecfin + "|" + matrizReporte2[id][0] + "|" + idmedico + "|" + idempresa + "|" + indOAvis;
			//lista = matrizReporte2[id][2] + "|" + matrizReporte2[id][0] + "|" + idmedico + "|" + idempresa;
			var hdfOpcion = document.getElementById("hdfOpcion");
			hdfOpcion.value = opcion;
			idEnMatriz = id;
			url = urlBase + "Control/obtenerCuentaCorrienteReporte/?ss=" + ss + "&su=" + sucursalId + "&opc=" + opcion;
			$.ajax(url, "post", listarReporte, lista);
			break;
        case 4:
			lista = ddlPeriodoProvisionInicio + "|" + ddlPeriodoProvisionFin + "|" + ddlPeriodoProduccionInicio + "|" + ddlPeriodoProduccionFin + "|";
			lista += ddlEspecialidad + "|" + ddlEstado + "|" + txtfecini + "|" + txtfecfin + "|" + 0 + "|" + matrizReporte1[id][2] + "|" + matrizReporte1[id][0] + "|" + indOAvis;
			url = urlBase + "Control/obtenerCuentaCorrienteReporte/?ss=" + ss + "&su=" + sucursalId + "&opc=" + opcion;
			$.ajax(url, "post", listarReporteExcel, lista);
			break;
	}
}

function listarReporteExcel(r) {
	if (r != "" && r != "¬") {
		var data = r.split("¬"), nRgs = 0, campos, objExls = {};
		var dtPro = data[0].split("¯"), dtHor = data[1].split("¯"), dtPer = data[2].split("¯");
		/*MtzPro = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING", "Indicador Honorario",
			"EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
			"Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo", "Cuenta Proveedor", "Id.Doc.Contable",
			"Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision", "Indicador No Visible Planilla","IndicadorIncluidoPlanilla"]];*/
        MtzPro = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA",
            "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro",
            "IndicadorIncluidoPlanilla",
            "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible",
            "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente",
            "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro",
            "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING",
            "Indicador Honorario", "EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado",
            "SituacionDetalleExpediente", "Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo",
            "Cuenta Proveedor", "Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento",
            "Fecha Emision", "Indicador No Visible Planilla", "Inc. Automática", "IndicadorExcluido"]];
        MtzHor = [["SucursalId", "Sucursal", "Periodo", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico",
			"Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "Cuenta Costo", "Cuenta Proveedor",
			"Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];
		MtzPer = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe",
			"Concepto Monto Fijo Id", "Concepto", "Cuenta Costo", "Cuenta Proveedor",
			"Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];

		var currency = { id: 2 };

		for (var i = 0; i < 3; i += 1) {
			switch (i) {
				case 0:
					nRgs = (dtPro[0] != "" ? dtPro.length : 0);
					break;
				case 1:
					nRgs = (dtHor[0] != "" ? dtHor.length : 0);
					break;
				case 2:
					nRgs = (dtPer[0] != "" ? dtPer.length : 0);
					break;
			}

			for (var j = 0; j < nRgs; j += 1) {
				switch (i) {
					case 0:
						campos = dtPro[j].split("¦");
						MtzPro.push(campos);
						break;
					case 1:
						campos = dtHor[j].split("¦");
						campos[12] = (campos[12] == "False" ? "No" : "Sí");

						MtzHor.push(campos);
						break;
					case 2:
						campos = dtPer[j].split("¦");
						campos[3] = campos[3] * 1;
						campos[5] = campos[5] * 1;
						campos[9] = campos[9] * 1;
						campos[8] = campos[8] * 1;
						MtzPer.push(campos);
						break;

				}
			}
		}
		var datos = "";
		var formBlob;
		var anchorElem;
		var elem;
		if (MtzPro.length > 1 || MtzHor.length > 1 || MtzPer.length > 1) {
			datos = exportarExcel(MtzPro, MtzHor, MtzPer);
		}
		if (datos != "") {
			anchorElem = document.createElement('a');
			var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", "DetalleCuentaCorriente.xls");
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			elem = document.getElementById("atemp");
			elem.parentNode.removeChild(elem);
		} else {
			mostraralerta("No se encontraron registros");
		}

	} else {
		mostraralerta("No se encontraron registros");
	}
}

function listarReporte(rpta) {
	var Opcion = document.getElementById("hdfOpcion").value;
	switch (Opcion) {
		case "1":
			var btnBuscar = document.getElementById("btnBuscar");
            btnBuscar.onclick = function () {
                var a1 = document.getElementById("txtMedico").value;
                var a2 = document.getElementById("txtEmpresa").value;
                var a3 = document.getElementById("ddlEspecialidad").value;
                var a4 = document.getElementById("ddlEstado").value;
                var a5 = document.getElementById("ddlPeriodoProvisionInicio").value;
                var a6 = document.getElementById("ddlPeriodoProvisionFin").value;
                var a7 = document.getElementById("ddlPeriodoProduccionInicio").value;
                var a8 = document.getElementById("ddlPeriodoProduccionFin").value;
                var a9 = document.getElementById("txtfecini").value;
                var a10 = document.getElementById("txtfecfin").value;
                if (a1 == "" && a2 == "" && a3 == "" && a4 == "" && a5 == "" && a6 == "" && a7 == "" && a8 == "" && a9 == "" && a10 == "") {
                    mostraralerta("Por favor ingrese o seleccione al menos un criterio de busqueda");
                } else {
                    buscarReporte(1);
                    matrizReporte1 = [];
                    matrizReporte2 = [];
                    matrizReporte3 = [];
                    matrizReporte4 = [];
                    matrizReporte5 = [];
                    document.getElementById("DTab1").click();
                    document.getElementById("DTab2").className = "tab-link bloqueado";
                    document.getElementById("DTab3").className = "tab-link bloqueado";
                    document.getElementById("DTab4").className = "tab-link bloqueado";
                    document.getElementById("DTab5").className = "tab-link bloqueado";
                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                    this.onclick = null;
                }
            }
			btnBuscar.innerHTML = "Buscar";
			console.time("crearMatriz");
			crearMatriz(rpta.split("¯"), "¦", "Reporte1");
			console.timeEnd("crearMatriz");
			//matrizReporte1 = [];
			//matrizReporte1 = mergeSort(matrizFiltroReporte1, 0, 0);
			paginar(-1, "Reporte1");

			break;
		case "2":
			matrizReporte3 = [];
			matrizReporte4 = [];
			matrizReporte5 = [];
			var DTab3 = document.getElementById("DTab3");
			DTab3.className = "tab-link bloqueado";
			var DTab4 = document.getElementById("DTab4");
			DTab4.className = "tab-link bloqueado";
			var DTab5 = document.getElementById("DTab5");
			DTab5.className = "tab-link bloqueado";
			crearMatriz(rpta.split("¯"), "¦", "Reporte2");
			//matrizReporte2 = [];
			//matrizReporte2 = mergeSort(matrizFiltroReporte2, 0, 0);

			var clssucursal = document.getElementsByClassName("clssucursal");
			var clsempresa = document.getElementsByClassName("clsempresa");
			var clsmedico = document.getElementsByClassName("clsmedico");

			for (var x = 0; x < clssucursal.length; x++) {
				clssucursal[x].innerHTML = sucursal;
				clsempresa[x].innerHTML = (matrizReporte1[idEnMatriz][1].trim() == "" ? "" : matrizReporte1[idEnMatriz][0] + " - " + matrizReporte1[idEnMatriz][1]);
				clsmedico[x].innerHTML = matrizReporte1[idEnMatriz][2] + " - " + matrizReporte1[idEnMatriz][3];
			}

			paginar(-1, "Reporte2");
			var DTab2 = document.getElementById("DTab2");
			if (matrizReporte2.length > 0) {
				DTab2.className = "tab-link";
				DTab2.click();
			}
			else {
				DTab2.className = "tab-link bloqueado";
			}
			break;
		case "3":
			var tadm1 = document.getElementById("tadm1");
			var tadm2 = document.getElementById("tadm2");
			var tadm3 = document.getElementById("tadm3");
			tadm1.innerHTML = tadm2.innerHTML = tadm3.innerHTML = matrizReporte2[idEnMatriz][1];
			matrizReporte3 = [];
			matrizReporte4 = [];
			matrizReporte5 = [];
			var data = rpta.split("¬");
			if (data != "") {
				crearMatriz(data[0].split("¯"), "¦", "Reporte3");
				crearMatriz(data[1].split("¯"), "¦", "Reporte4");
				crearMatriz(data[2].split("¯"), "¦", "Reporte5");
			}
			paginar(-1, "Reporte3");
			paginar(-1, "Reporte4");
			paginar(-1, "Reporte5");
			var DTab3 = document.getElementById("DTab3");
			if (matrizReporte3.length > 0) {
				DTab3.className = "tab-link";
			}
			else {
				DTab3.className = "tab-link bloqueado";
			}
			var DTab4 = document.getElementById("DTab4");
			if (matrizReporte4.length > 0) {
				DTab4.className = "tab-link";
			}
			else {
				DTab4.className = "tab-link bloqueado";
			}
			var DTab5 = document.getElementById("DTab5");
			if (matrizReporte5.length > 0) {
				DTab5.className = "tab-link";
			}
			else {
				DTab5.className = "tab-link bloqueado";
			}
			if (matrizReporte3.length > 0) {
				DTab3.click();
			} else if (matrizReporte4.length > 0) {
				DTab4.click();
			} else if (matrizReporte5.length > 0) {
				DTab5.click();
			} else {
				DTab3.click();
			}
			break;

	}

}

function listasReporte(rpta) {
	if (rpta != "") {
		var datos = rpta.split("¬");
		listaPeriodo = crearMatriz(datos[0].split("¯"), "¦");
		listaEspecialidad = crearMatriz(datos[1].split("¯"), "¦");
		listaEstado = crearMatriz(datos[2].split("¯"), "¦");
		llenarCombo(listaPeriodo, "ddlPeriodoProvisionInicio", "0,1", "Todos");
		llenarCombo(listaPeriodo, "ddlPeriodoProduccionInicio", "0,1", "Todos");
		llenarCombo(listaPeriodo, "ddlPeriodoProvisionFin", "0,1", "Todos");
		llenarCombo(listaPeriodo, "ddlPeriodoProduccionFin", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "ddlEspecialidad", "0,1", "Todos");
		llenarCombo(listaEstado, "ddlEstado", "0,1", "Todos");
	}
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
				case "Reporte2":
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							switch (j) {
								case 13:
									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]));
									break;
								default:
									matriz[x][j] = campos[j];
									break;
							}
						}
						else matriz[x][j] = campos[j] * 1;
					}
					break;
				case "Reporte3":
				case "Reporte4":
				case "Reporte5":
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							switch (j) {
								case 15:
									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]));
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

function llenarComboTabla(lista, nombreCombo, cabecera) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	if (cabecera != undefined) {
		contenido = "<option value=''>" + cabecera + "</option>";
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

function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function llenarCombo(lista, nombreCombo, indice, titulo, separador) {
	var contenido = "", n = lista.length, campo;
	var pos = indice.split(",");
	if (n > 0) {
		if (titulo != undefined && titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
		}
		for (var x = 0; x < n; x++) {
			campos = (separador != undefined && separador != "" ? lista[x].split(separador) : lista[x]);
			contenido += "<option value='" + campos[pos[0]] + "'>" + campos[pos[1]] + "</option>";
		}

		var cbo = document.getElementById(nombreCombo);
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
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
				window["indiceActualBloque" + identificador] = 0;
				break;
			case -2:
				if (window["indiceActualBloque" + identificador] > 0) {
					window["indiceActualBloque" + identificador]--;
					indicePagina = window["indiceActualBloque" + identificador] * paginasBloque;

				}
				break;
			case -3:
				if (window["indiceActualBloque" + identificador] < indiceUltimoBloque) {
					window["indiceActualBloque" + identificador]++;
					indicePagina = window["indiceActualBloque" + identificador] * paginasBloque;
				}
				break;
			case -4:
				indicePagina = indiceUltimaPagina;
				window["indiceActualBloque" + identificador] = indiceUltimoBloque;
				break;
		}
	}
	window["indiceActualPagina" + identificador] = indicePagina;

	mostrarMatriz(indicePagina, identificador);
}

function mostrarMatriz(indicePagina, identificador) {
	window["indiceActualPagina" + identificador] = indicePagina;
	var contenido = "", contenido2 = "";
	var n = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	var variableActual;
	if (n > 0) {
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "Reporte1":
				var ContadorRegistros = 0;
				var matrizSumatoria = {};
				var a = 0, b = 0, c = 0, d = 0, e = 0;
				for (var i = 0; i < n; i++) {
					variableActual = i;
					if (i < n) {
						//if (ContadorRegistros == registrosPagina) {
						//	break;
						//}


						if (window["matriz" + identificador][i + 1] != undefined && (window["matriz" + identificador][i][0] == window["matriz" + identificador][i + 1][0]) && window["matriz" + identificador][i][1].trim() != "") {
							matrizSumatoria = {};
							contenido2 = "";
							matrizSumatoria[window["matriz" + identificador][i][0].toString() + "0"] = 0;
							matrizSumatoria[window["matriz" + identificador][i][0].toString() + "1"] = 0;
							matrizSumatoria[window["matriz" + identificador][i][0].toString() + "2"] = 0;
							matrizSumatoria[window["matriz" + identificador][i][0].toString() + "3"] = 0;
							for (w = i; w < n; w++) {

								//if (ContadorRegistros == registrosPagina) {
								//	break;
								//}

								ContadorRegistros = ContadorRegistros + 1;

								if (idmedico == -1) {
									contenido2 += "<tr class='FilaDatos' data-id='";
									contenido2 += window["matriz" + identificador][w][2];
									contenido2 += "|";
									contenido2 += window["matriz" + identificador][w][0];
									contenido2 += "'>";
								}
								else {
									if (window["matriz" + identificador][w][2] == idmedico && window["matriz" + identificador][w][0] == idempresa) {
										contenido2 += "<tr class='FilaDatos seleccionado' data-id='";
										contenido2 += window["matriz" + identificador][w][2];
										contenido2 += "|";
										contenido2 += window["matriz" + identificador][w][0];
										contenido2 += "'>";
									}
									else {
										contenido2 += "<tr class='FilaDatos' data-id='";
										contenido2 += window["matriz" + identificador][w][2];
										contenido2 += "|";
										contenido2 += window["matriz" + identificador][w][0];
										contenido2 += "'>";
									}
								}
								for (var j = 0; j < nCampos; j++) {
									switch (j) {
										case 0:
											contenido2 += "<td style='text-align:right' ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											break;
										case 2:
											contenido2 += "<td style='text-align:right' ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											matrizSumatoria[window["matriz" + identificador][w][0].toString() + "0"] = matrizSumatoria[window["matriz" + identificador][w][0].toString() + "0"] + window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
										case 3:
											contenido2 += "<td style='text-align:right' ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											matrizSumatoria[window["matriz" + identificador][w][0].toString() + "1"] = matrizSumatoria[window["matriz" + identificador][w][0].toString() + "1"] + window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
										case 4:
											contenido2 += "<td style='text-align:right' ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											matrizSumatoria[window["matriz" + identificador][w][0].toString() + "2"] = matrizSumatoria[window["matriz" + identificador][w][0].toString() + "2"] + window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
										case 5:
											contenido2 += "<td style='text-align:right' ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											matrizSumatoria[window["matriz" + identificador][w][0].toString() + "3"] = matrizSumatoria[window["matriz" + identificador][w][0].toString() + "3"] + window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
										default:
											contenido2 += "<td ondblclick='buscarReporte(2,"
											contenido2 += w;
											contenido2 += ")'>";
											contenido2 += window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
											break;
									}

									contenido += "</td>";
								}
                                contenido2 += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='descargarExcelGenericoDetalle(";
								//contenido2 += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='buscarReporte(4,";
								contenido2 += w;
                                contenido2 += ",\"N\")'></span></td>";
								contenido2 += "</tr>";
								a = a + window["matriz" + identificador][w][4];
								b = b + window["matriz" + identificador][w][5];
								c = c + window["matriz" + identificador][w][6];
								d = d + window["matriz" + identificador][w][7];


								i = w;
								if (window["matriz" + identificador][w + 1] == undefined) {
									break;
								} else if (window["matriz" + identificador][w][0] != window["matriz" + identificador][w + 1][0]) {
									break;
								}
							}
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:left' ondblclick='buscarReporte(2,"
							contenido += i;
							contenido += ")'>";
							contenido += window["matriz" + identificador][i][1];
							contenido += "</td><td></td>";
							contenido += "<td style='text-align:right' ondblclick='buscarReporte(2,"
							contenido += i;
							contenido += ")'>";
							contenido += formatearNumero(matrizSumatoria[window["matriz" + identificador][i][0].toString() + "0"]);
							contenido += "</td>";
							contenido += "<td style='text-align:right' ondblclick='buscarReporte(2,"
							contenido += i;
							contenido += ")'>";
							contenido += formatearNumero(matrizSumatoria[window["matriz" + identificador][i][0].toString() + "1"]);
							contenido += "</td>";
							contenido += "<td style='text-align:right' ondblclick='buscarReporte(2,"
							contenido += i;
							contenido += ")'>";
							contenido += formatearNumero(matrizSumatoria[window["matriz" + identificador][i][0].toString() + "2"]);
							contenido += "</td>";
							contenido += "<td style='text-align:right' ondblclick='buscarReporte(2,"
							contenido += i;
							contenido += ")'>";
							contenido += formatearNumero(matrizSumatoria[window["matriz" + identificador][i][0].toString() + "3"]);
							contenido += "</td>";
							//contenido += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='buscarReporte(4,";
                            contenido += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='descargarExcelGenericoDetalle(";
							contenido += i;
                            contenido += ",\"S\")'></span></td></tr>";
							contenido += contenido2;
						} else {
							//if (ContadorRegistros == registrosPagina) {
							//	break;
							//}
							//ContadorRegistros = ContadorRegistros + 1;
							if (idmedico == -1) {
								contenido += "<tr class='FilaDatos' data-id='";
								contenido += window["matriz" + identificador][i][2];
								contenido += "|";
								contenido += window["matriz" + identificador][i][0];
								contenido += "'>";
							}
							else {
								if (window["matriz" + identificador][i][2] == idmedico) {
									contenido += "<tr class='FilaDatos seleccionado' data-id='";
									contenido += window["matriz" + identificador][i][2];
									contenido += "|";
									contenido += window["matriz" + identificador][i][0];
									contenido += "'>";
								}
								else {
									contenido += "<tr class='FilaDatos' data-id='";
									contenido += window["matriz" + identificador][i][2];
									contenido += "|";
									contenido += window["matriz" + identificador][i][0];
									contenido += "'>";
								}
							}
							for (var j = 0; j < nCampos; j++) {
								switch (j) {
									case 2:
									case 3:
									case 4:
									case 5:
										contenido += "<td style='text-align:right' ondblclick='buscarReporte(2,"
										contenido += i;
										contenido += ")'>";
										contenido += formatearNumero(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]);
										break;
									default:
										contenido += "<td ondblclick='buscarReporte(2,"
										contenido += i;
										contenido += ")'>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
										break;
								}
								contenido += "</td>";

							}
							a = a + window["matriz" + identificador][i][4];
							b = b + window["matriz" + identificador][i][5];
							c = c + window["matriz" + identificador][i][6];
							d = d + window["matriz" + identificador][i][7];
							//contenido += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='buscarReporte(4,";
                            contenido += "<td style='text-align:center'><span class='Icons fa-download puntero' onclick='descargarExcelGenericoDetalle(";
							contenido += i;
                            contenido += ",\"N\")'></span></td>";
							contenido += "</tr>";
						}
					} else break;
				}
				contenido += "<tr class='FilaDatos' style='font-weight:bold'>";
				contenido += "<td colspan='2' style='text-align:right'>TOTAL</td>";
				contenido += "<td style='text-align:right'>";
				contenido += a.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += b.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += c.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += d.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td></td>";
				contenido += "</tr>";
				break;
			case "Reporte2":
				var ContadorRegistros = 0;
				var contenido2 = "";
				var variableActual;
				var a = 0, b = 0, c = 0, d = 0, e = 0;
				var matrizSumatorio = {};
				for (var i = 0; i < n; i++) {
					if (i < n) {
						if (window["matriz" + identificador][i + 1] != undefined && (window["matriz" + identificador][i][0] == window["matriz" + identificador][i + 1][0]) && window["matriz" + identificador][i][1].trim() != "") {
							contenido2 = "";
							matrizSumatorio = {};
							variableActual = i;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "0"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "1"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "2"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "3"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "4"] = 0;
							for (w = i; w < n; w++) {
								contenido2 += "<tr class='FilaDatos' ondblclick='buscarReporte(3,";
								contenido2 += w;
								contenido2 += ")'>";
								for (var j = 0; j < nCampos; j++) {
									switch (j) {
										case 0:
											contenido2 += "<td>";
											break;
										case 5:
										case 6:
										case 7:
										case 8:
										case 9:
											contenido2 += "<td style='text-align:right'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											break;
										default:
											contenido2 += "<td>";
											contenido2 += window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
									}

									contenido += "</td>";
								}
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"] + window["matriz" + identificador][w][7];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"] + window["matriz" + identificador][w][8];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"] + window["matriz" + identificador][w][9];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"] + window["matriz" + identificador][w][10];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"] + window["matriz" + identificador][w][11];

								a = a + window["matriz" + identificador][w][7];
								b = b + window["matriz" + identificador][w][8];
								c = c + window["matriz" + identificador][w][9];
								d = d + window["matriz" + identificador][w][10];
								e = e + window["matriz" + identificador][w][11];

								//contenido2 += "<td style='text-align:center'><span style='display:none' class='Icons fa-table puntero' onclick='buscarReporte(4,";
                                contenido2 += "<td style='text-align:center'><span style='display:none' class='Icons fa-table puntero' onclick='descargarExcelGenericoDetalle(";
								contenido2 += w;
                                contenido2 += ",\"N\")'></span></td>";
								contenido2 += "</tr>";
								i = w;
								if (window["matriz" + identificador][w + 1] == undefined) {
									break;
								} else if (window["matriz" + identificador][w][0] != window["matriz" + identificador][w + 1][0]) {
									break;
								}
							}
							contenido += "<tr class='FilaDatos' ondblclick='buscarReporte(3,";
							contenido += i;
							contenido += ")'>";
							contenido += "<td style='text-align:left'>";
							contenido += window["matriz" + identificador][i][1];
							contenido += "</td>";
							contenido += "<td colspan='4'></td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td colspan='3'></td>";
							contenido += "</tr>";
							contenido += contenido2;
						} else {
							contenido += "<tr class='FilaDatos' ondblclick='buscarReporte(3,";
							contenido += i;
							contenido += ")'>";
							for (var j = 0; j < nCampos; j++) {
								switch (j) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += "<td style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]);
										break;
									default:
										contenido += "<td>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
								}
								contenido += "</td>";
							}
							a = a + window["matriz" + identificador][i][7];
							b = b + window["matriz" + identificador][i][8];
							c = c + window["matriz" + identificador][i][9];
							d = d + window["matriz" + identificador][i][10];
							e = e + window["matriz" + identificador][i][11];
							//contenido += "<td style='text-align:center'><span style='display:none' class='Icons fa-table puntero' onclick='buscarReporte(4,";
                            contenido += "<td style='text-align:center'><span style='display:none' class='Icons fa-table puntero' onclick='descargarExcelGenericoDetalle(";
							contenido += i;
                            contenido += ",\"N\")'></span></td>";
							contenido += "</tr>";
						}
					} else break;
				}
				contenido += "<tr class='FilaDatos' style='font-weight:bold'>";
				contenido += "<td colspan='5' style='text-align:right'>TOTAL</td>";
				contenido += "<td style='text-align:right'>";
				contenido += a.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += b.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += c.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += d.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += e.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td colspan='3'></td>";
				contenido += "</tr>";
				break;
			default:
				var ContadorRegistros = 0;
				var contenido2 = "";
				var variableActual;
				var matrizSumatorio = {};
				var a = 0, b = 0, c = 0, d = 0, e = 0;
				for (var i = 0; i < n; i++) {
					if (i < n) {

						if (window["matriz" + identificador][i + 1] != undefined && (window["matriz" + identificador][i][2] == window["matriz" + identificador][i + 1][2]) && window["matriz" + identificador][i][3].trim() != "") {
							variableActual = i;
							contenido2 = "";
							matrizSumatorio = {};
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "0"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "1"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "2"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "3"] = 0;
							matrizSumatorio[window["matriz" + identificador][i][0].toString() + "4"] = 0;
							for (w = i; w < n; w++) {
								contenido2 += "<tr class='FilaDatos'>";
								for (var j = 0; j < nCampos; j++) {
									switch (j) {
										case 0:
											contenido2 += "<td>";
											break;
										case 5:
										case 6:
										case 7:
										case 8:
										case 9:
											contenido2 += "<td style='text-align:right'>";
											contenido2 += formatearNumero(window["matriz" + identificador][w][window["matrizIndice" + identificador][j]]);
											break;
										default:
											contenido2 += "<td>";
											contenido2 += window["matriz" + identificador][w][window["matrizIndice" + identificador][j]];
											break;
									}

									contenido += "</td>";
								}
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"] + window["matriz" + identificador][w][9];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"] + window["matriz" + identificador][w][10];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"] + window["matriz" + identificador][w][11];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"] + window["matriz" + identificador][w][12];
								matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"] = matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"] + window["matriz" + identificador][w][13];

								a = a + window["matriz" + identificador][w][9];
								b = b + window["matriz" + identificador][w][10];
								c = c + window["matriz" + identificador][w][11];
								d = d + window["matriz" + identificador][w][12];
								e = e + window["matriz" + identificador][w][13];

								contenido2 += "<td style='text-align:center'></td>";
								contenido2 += "</tr>";
								i = w;
								if (window["matriz" + identificador][w + 1] == undefined) {
									break;
								} else if (window["matriz" + identificador][w][2] != window["matriz" + identificador][w + 1][2]) {
									break;
								}
							}
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:left' colspan='3'>";
							contenido += window["matriz" + identificador][i][3];
							contenido += "</td>";
							contenido += "<td colspan='2'></td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "0"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "1"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "2"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "3"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatorio[window["matriz" + identificador][variableActual][0].toString() + "4"].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							contenido += "<td colspan='3'></td>";
							contenido += "</tr>";
							contenido += contenido2;
						} else {

							contenido += "<tr class='FilaDatos'>";
							for (var j = 0; j < nCampos; j++) {
								switch (j) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += "<td style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]);
										break;
									default:
										contenido += "<td>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
								}
								contenido += "</td>";
							}
							a = a + window["matriz" + identificador][i][9];
							b = b + window["matriz" + identificador][i][10];
							c = c + window["matriz" + identificador][i][11];
							d = d + window["matriz" + identificador][i][12];
							e = e + window["matriz" + identificador][i][13];
							contenido += "<td style='text-align:center'></td>";
							contenido += "</tr>";
						}
					} else break;
				}
				contenido += "<tr class='FilaDatos' style='font-weight:bold'>";
				contenido += "<td colspan='5' style='text-align:right'>TOTAL</td>";
				contenido += "<td style='text-align:right'>";
				contenido += a.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += b.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += c.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += d.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td style='text-align:right'>";
				contenido += e.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
				contenido += "</td>";
				contenido += "<td colspan='3'></td>";
				contenido += "</tr>";
				break;
		}
	} else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCampos + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	//if (identificador == "Reporte1") {
	//	crearPaginas(identificador);
	//	if (esBloque) {
	//		crearPaginas(identificador);
	//	}
	//}
}

function crearPaginas(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";

	var inicio = window["indiceActualBloque" + identificador] * paginasBloque;
	var fin = inicio + paginasBloque;
	if (window["indiceActualBloque" + identificador] > 0 && nRegistros > (paginasBloque * registrosPagina)) {
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
	if (window["indiceActualBloque" + identificador] < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
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

	var aPagina = document.getElementById("a" + identificador + window["indiceActualPagina" + identificador]);
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

function formatearfecha(fecha) {
	var campos = fecha.split("/");
	var anio = campos[2];
	var mes = campos[1];
	mes = mes.length > 1 ? mes : '0' + mes;
	var dia = campos[0]
	dia = dia.length > 1 ? dia : '0' + dia;
	return dia + '/' + mes + '/' + anio;
}

function exportarExcel() {
	var contenido = "";
	if (matrizReporte1.length > 0 || matrizReporte2.length > 0 || matrizReporte3.length > 0 || matrizReporte4.length > 0 || matrizReporte5.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], valorFor;
		for (var x = 0; x < 5; x++) {
			switch (x) {
				case 0:
					n = matrizReporte1.length;
					ncampos = cabecerasReporte1.length;
					matriz = (matrizReporte1.length > 0 ? matrizReporte1.slice(0) : []);
					matrizCabecera = cabecerasReporte1.slice(0);
					matrizAnchos = anchosExcelReporte1.slice(0);
					nombre = "Médicos";
					break;
				case 1:
					n = matrizReporte2.length;
					ncampos = cabecerasReporte2.length;
					matriz = (matrizReporte2.length > 0 ? matrizReporte2.slice(0) : []);
					matrizCabecera = cabecerasReporte2.slice(0);
					matrizAnchos = anchosExcelReporte2.slice(0);
					nombre = "Detalle";
					break;
				case 2:
					n = matrizReporte3.length;
					ncampos = cabecerasReporte3.length;
					matriz = (matrizReporte3.length > 0 ? matrizReporte3.slice(0) : []);
					matrizCabecera = cabecerasReporte3.slice(0);
					matrizAnchos = anchosExcelReporte3.slice(0);
					nombre = "Producción";
					break;
				case 3:
					n = matrizReporte4.length;
					ncampos = cabecerasReporte4.length;
					matriz = (matrizReporte4.length > 0 ? matrizReporte4.slice(0) : []);
					matrizCabecera = cabecerasReporte4.slice(0);
					matrizAnchos = anchosExcelReporte4.slice(0);
					nombre = "Horario";
					break;
				case 4:
					n = matrizReporte5.length;
					ncampos = cabecerasReporte5.length;
					matriz = (matrizReporte5.length > 0 ? matrizReporte5.slice(0) : []);
					matrizCabecera = cabecerasReporte5.slice(0);
					matrizAnchos = anchosExcelReporte5.slice(0);
					nombre = "Monto Fijo";
					break;
			}


			if (n > 0) {
				contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
				for (var u = 0; u < matrizAnchos.length; u++) {
					contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
				}
				contenido += "<Row>";
				for (var t = 0; t < matrizCabecera.length; t++) {
					contenido += '<Cell ss:StyleID="s79">';
					contenido += '<Data ss:Type="String">';
					contenido += matrizCabecera[t];
					contenido += '</Data>';
					contenido += '</Cell>';
				}

				contenido += "</Row>";

				for (var z = 0; z < n; z++) {
					contenido += "<Row>";
					for (y = 0; y < ncampos; y++) {
						switch (x) {
							case 0:
								switch (y) {
									case 2:
									case 3:
									case 4:
									case 5:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndiceReporte1[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndiceReporte1[y]];
										break;
								}
								break;
							case 1:
								switch (y) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndiceReporte2[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndiceReporte2[y]];
										break;
								}
								break;
							case 2:
								switch (y) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndiceReporte3[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndiceReporte3[y]];
										break;
								}
								break;
							case 3:
								switch (y) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndiceReporte4[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndiceReporte4[y]];
										break;
								}
								break;
							case 4:
								switch (y) {
									case 5:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndiceReporte5[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndiceReporte5[y]];
										break;
								}
								break;
						}
						contenido += '</Data>';
						contenido += '</Cell>';
					}
					contenido += "</Row>";
				}
				contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
			}
		}
		contenido += '</Workbook>';
	}
	return contenido;
}

function exportarExcel(matriz1, matriz2, matriz3) {
	var contenido = "";
	if (matriz1.length > 0 || matriz2.length > 0 || matriz3.length > 0) {
        contenido += '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [],matrizIndice=[];
		for (var x = 0; x < 3; x++) {
			switch (x) {
				case 0:
					n = matriz1.length;
					ncampos = matriz1[0].length;
					matriz = matriz1.slice(0);
					matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140,180, 140];
					matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 16, 62];
					nombre = "Producción";
					break;
				case 1:
					n = matriz2.length;
					ncampos = matriz2[0].length;
					matriz = matriz2.slice(0);
					nombre = "Horario";
					matrizAnchos = [70, 100, 65, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140, 140];

					break;
				case 2:
					n = matriz3.length;
					ncampos = matriz3[0].length;
					matriz = matriz3.slice(0);
					nombre = "Monto Fijo";
					matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140, 140];

					break;
			}

			if (n > 0) {
				contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
				switch (x) {
					case 0:
						for (var u = 0; u < matrizAnchos.length; u++) {
							contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
						}
						break;
					case 1:
						for (var u = 0; u < matrizAnchos.length; u++) {
							contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
						}
						break;
					case 2:
						for (var u = 0; u < matrizAnchos.length; u++) {
							contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
						}
						break;
				}


				for (var z = 0; z < n; z++) {
					contenido += "<Row>";
					//console.log(matriz[z]);
					for (y = 0; y < ncampos; y++) {
						if (z == 0) {
							contenido += '<Cell ss:StyleID="s79">';
							contenido += '<Data ss:Type="String">';
							contenido += matriz[z][y];
						}
						else {

							switch (x) {
								case 0:
									switch (y) {
										case 3:
										case 5:
										case 9:
										case 10:
										case 11:
										case 41:
										case 42://41
										case 43://42
											contenido += '<Cell>';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][matrizIndice[y]] * 1;
											break;
										case 23:
											contenido += '<Cell ss:StyleID="s63">';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][matrizIndice[y]] * 1;
											break;
										case 19:
										case 20:
										case 21:
										case 22:
										case 25:
										case 26:
										case 27:
										case 28:
										case 38:
										case 39:
											contenido += '<Cell ss:StyleID="s65">';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][matrizIndice[y]] * 1;
											break;
										case 16:
										case 17:
										case 18:
										case 29:
										case 50:
										case 59:
											contenido += '<Cell ss:StyleID="s62">';
											//contenido += '<Data ss:Type="DateTime">';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][matrizIndice[y]].indexOf("1900") > -1 ? "" : matriz[z][matrizIndice[y]]);
											break;
										case 45:
										case 46:
										case 48:
										case 55:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][matrizIndice[y]].charAt(0) == "0" ? "" : matriz[z][matrizIndice[y]]);
											break;
									    case 61:
									        contenido += '<Cell>';
									        contenido += '<Data ss:Type="String">';
									        contenido += (matriz[z][matrizIndice[y]]== "False" ? "NO" : "SI");
									        break;
										default:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += matriz[z][matrizIndice[y]].toString();
											break;
									}
									break;
								case 1:
									switch (y) {
										case 3:
										case 5:
										case 20:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][y];
											break;
										case 13:
										case 14:
										case 15:
										case 16:
											contenido += '<Cell ss:StyleID="s65">';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][y];
											break;
										case 25:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
											break;
										case 29:
											contenido += '<Cell ss:StyleID="s62">';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
											break;
										default:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += matriz[z][y];
											break;
									}
									break;
								case 2:
									switch (y) {
										case 3:
										case 5:
										case 9:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][y];
											break;
										case 8:
											contenido += '<Cell ss:StyleID="s65">';
											contenido += '<Data ss:Type="Number">';
											contenido += matriz[z][y];
											break;
										case 14:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
											break;
										case 18:
											contenido += '<Cell ss:StyleID="s62">';
											contenido += '<Data ss:Type="String">';
											contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
											break;
										default:
											contenido += '<Cell>';
											contenido += '<Data ss:Type="String">';
											contenido += matriz[z][y];
											break;
									}
									break;
							}

						}
						contenido += '</Data>';
						contenido += '</Cell>';
					}
					contenido += "</Row>";
				}
				contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
			}
		}
		contenido += '</Workbook>';
	}
	return contenido;
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

function descargarExcelGenerico(identificador, nombrearchivo) {
    var matriz = window["matriz" + identificador].slice(0);
    var matrizCabecera = window["cabeceras" + identificador].slice(0);
    var matrizIndice = window["matrizIndice" + identificador].slice(0);
    var matrizAnchos = window["anchosExcel" + identificador].slice(0);
    var nRegistros = matriz.length;
    var contenido = "";
    if (nRegistros > 0) {
        contenido += "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
        for (var x = 0; x < matrizCabecera.length; x++) {
            contenido += "<td style='width: ";
            contenido += matrizAnchos[x];
            contenido += "px'>";
            contenido += matrizCabecera[x];
            contenido += "</td>";
        }
        contenido += "</tr>";
        for (var i = 0; i < nRegistros; i++) {
            contenido += "<tr>";
            switch (identificador) {
                case "Reporte1":
                    for (var j = 0; j < matrizIndice.length; j++) {

                        switch (j) {

                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                contenido += "<td style='text-align:right;mso-number-format:\"\@\"'>";
                                contenido += matriz[i][matrizIndice[j]].toString().trim();
                                break;
                            default:
                                contenido += "<td style='mso-number-format:\"\@\"'>";
                                contenido += matriz[i][matrizIndice[j]].toString().trim();
                                break;
                        }
                        contenido += "</td>";
                    }
                    break;
                default:
                    for (var j = 0; j < matrizIndice.length; j++) {

                        switch (j) {

                            default:
                                contenido += "<td>";
                                contenido += matriz[i][matrizIndice[j]].toString().trim();
                                break;
                        }
                        contenido += "</td>";
                    }
                    break;
            }
            contenido += "</tr>";

        }
        contenido += "</table></html>";
    }
    if (contenido != "") {
        anchorElem = document.createElement('a');
        var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
        anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
        anchorElem.setAttribute("download", nombrearchivo + ".xls");
        anchorElem.setAttribute("id", "atemp");
        document.body.appendChild(anchorElem);
        anchorElem.click();
        elem = document.getElementById("atemp");
        elem.parentNode.removeChild(elem);
    } else {
        mostraralerta("No se encontraron registros");
    }
}

//DETALLE DE CUENTA CORRIENTE
//REPORTE 1, 4
//MODIFICADO: 18/11/2019
function descargarExcelGenericoDetalle(id, bloque) {
    var strDatos = "";
    var hdfMedico = document.getElementById("hdfMedico").value;
    var hdfEmpresa = (document.getElementById("hdfEmpresa").value == "-1" ? 0 : document.getElementById("hdfEmpresa").value);
    var ddlEspecialidad = (document.getElementById("ddlEspecialidad").value == "" ? 0 : document.getElementById("ddlEspecialidad").value);
    var ddlEstado = document.getElementById("ddlEstado").value;
    var ddlPeriodoProvisionInicio = (document.getElementById("ddlPeriodoProvisionInicio").value == "" ? 0 : document.getElementById("ddlPeriodoProvisionInicio").value);
    var ddlPeriodoProvisionFin = (document.getElementById("ddlPeriodoProvisionFin").value == "" ? 0 : document.getElementById("ddlPeriodoProvisionFin").value);
    var ddlPeriodoProduccionInicio = (document.getElementById("ddlPeriodoProduccionInicio").value == "" ? 0 : document.getElementById("ddlPeriodoProduccionInicio").value);
    var ddlPeriodoProduccionFin = (document.getElementById("ddlPeriodoProduccionFin").value == "" ? 0 : document.getElementById("ddlPeriodoProduccionFin").value);
    var txtfecini = (document.getElementById("txtfecini").value == "" ? "01/01/1900" : document.getElementById("txtfecini").value);
    var txtfecfin = (document.getElementById("txtfecfin").value == "" ? "01/01/1900" : document.getElementById("txtfecfin").value);
    var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible").value;
    var indOAvis;
    switch (ddlIndicadorOAVisible) {
        case "True":
            indOAvis = 1;
            break;
        case "False":
            indOAvis = 2;
            break;
        default:
            indOAvis = 3;
            break;
    }
    if (id >= 0) {
        hdfEmpresa = matrizReporte1[id][0];
        hdfMedico = (bloque == 'N') ? matrizReporte1[id][2] : 0;
    }
    strDatos = sucursalId + "|" + hdfEmpresa + "|" + hdfMedico + "|" + ddlEspecialidad + "|" + ddlPeriodoProvisionInicio + "|" + ddlPeriodoProvisionFin + "|";
    strDatos += ddlPeriodoProduccionInicio + "|" + ddlPeriodoProduccionFin + "|" + ddlEstado + "|" + txtfecini + "|" + txtfecfin + "|" + indOAvis;

    var hojas = "Cta_CTE";
    var nombre = "ReporteDetalladoCTACTE.xlsx";
    var sp = "uspReporteCTACTEDescargarV2";
    var url = urlBase + "Control/listarReporteDetalladoGEN/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre + "&sp=" + sp;
    postDownload(url, descargaExcelXLSx, strDatos);
    btnBuscar.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
    btnBuscar.onclick = null;
    btnBuscar.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
    btnBuscar.onclick = null;
}

function descargaExcelXLSx(rpta) {
    var btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.onclick = function () {
        var a1 = document.getElementById("txtMedico").value;
        var a2 = document.getElementById("txtEmpresa").value;
        var a3 = document.getElementById("ddlEspecialidad").value;
        var a4 = document.getElementById("ddlEstado").value;
        var a5 = document.getElementById("ddlPeriodoProvisionInicio").value;
        var a6 = document.getElementById("ddlPeriodoProvisionFin").value;
        var a7 = document.getElementById("ddlPeriodoProduccionInicio").value;
        var a8 = document.getElementById("ddlPeriodoProduccionFin").value;
        var a9 = document.getElementById("txtfecini").value;
        var a10 = document.getElementById("txtfecfin").value;
        if (a1 == "" && a2 == "" && a3 == "" && a4 == "" && a5 == "" && a6 == "" && a7 == "" && a8 == "" && a9 == "" && a10 == "") {
            mostraralerta("Por favor ingrese o seleccione al menos un criterio de busqueda");
        } else {
            buscarReporte(1);
            matrizReporte1 = [];
            matrizReporte2 = [];
            matrizReporte3 = [];
            matrizReporte4 = [];
            matrizReporte5 = [];
            document.getElementById("DTab1").click();
            document.getElementById("DTab2").className = "tab-link bloqueado";
            document.getElementById("DTab3").className = "tab-link bloqueado";
            document.getElementById("DTab4").className = "tab-link bloqueado";
            document.getElementById("DTab5").className = "tab-link bloqueado";
            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }
    }
    var btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.onclick = function () {
        var hdfEmpresa = document.getElementById("hdfEmpresa");
        hdfEmpresa.value = "-1";
        var hdfMedico = document.getElementById("hdfMedico");
        hdfMedico.value = "0";
        document.getElementById("txtMedico").value = "";
        document.getElementById("txtEmpresa").value = "";
        document.getElementById("ddlEspecialidad").value = "";
        document.getElementById("ddlEstado").value = "";
        document.getElementById("ddlPeriodoProvisionInicio").value = "";
        document.getElementById("ddlPeriodoProvisionFin").value = "";
        document.getElementById("ddlPeriodoProduccionInicio").value = "";
        document.getElementById("ddlPeriodoProduccionFin").value = "";
        document.getElementById("txtfecini").value = "";
        document.getElementById("txtfecfin").value = "";
        matrizReporte1 = [];
        matrizReporte2 = [];
        matrizReporte3 = [];
        matrizReporte4 = [];
        matrizReporte5 = [];
        document.getElementById("DTab1").click();
        document.getElementById("DTab2").className = "tab-link bloqueado";
        document.getElementById("DTab3").className = "tab-link bloqueado";
        document.getElementById("DTab4").className = "tab-link bloqueado";
        document.getElementById("DTab5").className = "tab-link bloqueado";
        paginar(-1, "Reporte1");

    }
    if (rpta != null) {
        var nombre = "ReporteDetalladoCTACTE.xlsx";
        var a = document.createElement("a");
        var formBlob = new Blob([rpta], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        a.download = nombre;
        a.href = window.URL.createObjectURL(formBlob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        mostraralerta("No se ha generado el archivo");
    }
    btnBuscar.innerHTML = "Buscar";
    btnBuscar.disabled = false;
    btnBuscar.style.pointerEvents = "auto";
    document.getElementById("btnBuscar").disabled = false;
    document.getElementById("btnBuscar").style.pointerEvents = "auto";
}

function mostrarLeyenda(opcion) {
	if (opcion) {
		document.getElementById("tblLeyenda1").style.display = "";
		document.getElementById("tblLeyenda2").style.display = "none";
	}
	else {
		document.getElementById("tblLeyenda1").style.display = "none";
		document.getElementById("tblLeyenda2").style.display = "";
	}
	abrirPopup('PopupLeyenda');
}
