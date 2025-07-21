var listaPeriodo = [], listaMedico = [], listaProduccion = [], listaBonificacion = [], listaMontoFijo = [];
var matrizPeriodo = [], matrizMedico = [], matrizProduccion, matrizBonificacion = [], matrizMontoFijo = [], matrizMedicoFiltro = [];
var matrizFiltroPeriodo = [], matrizFiltroMedico = [], matrizFiltroProduccion = [], matrizFiltroBonificacion = [], matrizFiltroMontoFijo = [];
var matrizBusquedaMedico = [], matrizBusquedaPeriodo = [], matrizBusquedaProduccion, matrizBusquedaBonificacion = [], matrizBusquedaMontoFijo = [];
var matrizUnicaMedicos = [];

var cabecerasPeriodo = ["Periodo", "T. Adm", "Total Provisión", "Total Planilla", "Saldo Procesar"];
var anchosPeriodo = [15, 20, 20, 20, 25];
var matrizIndicePeriodo = [1, 2, 3, 4, 5];

var cabecerasMedico = cabecerasMedicoFiltro = ["Médico/Empresa", "Tipo Admision", "Importe", "Descuento", "Bonificación", "Ajuste", "Total"];
var anchosMedico = [25, 13, 10, 13, 13, 13, 13];
var matrizIndiceMedicoFiltro = matrizIndiceMedico = [1, 8, 2, 3, 4, 5, 6];

//var cabecerasProduccion = ["Médico", "CodigoOA", "Paciente", "Expediente", "Prestación", "Fec. Ate. Prestación", "Fec. Atendido", "Fec. Terminado", "P/U. Prestación", "Cantidad", "Mto. Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Clínica", "Importe", "Bonificación", "Ajuste", "Total", "Fec. InicioOA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Est. Prestación", "Estado"],
var cabecerasProduccion = ["Médico", "CodigoOA", "Prestación", "Fec. Ate. Prestación", "Periodo Prod.", "Servicio", "Total", "Especialidad", "Est. Prestación", "Paciente", "Expediente", "Fec. Atendido", "Fec. Terminado", "P/U. Prestación", "Cantidad", "Mto. Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Clínica", "Importe", "Bonificación", "Ajuste", "Fec. InicioOA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Mod. Facturación", "IdOrdenAtención", "LineaOA", "Estado"],
//anchosProduccion = [8, 2, 8, 2, 8, 4, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 9, 4, 4, 5, 4, 2],
//matrizIndiceProduccion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

anchosProduccion = [8, 2, 8, 4, 3, 4, 2, 5, 4, 8, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 9, 8, 2, 5, 5],
matrizIndiceProduccion = [0, 1, 4, 5, 30, 24, 19, 26, 27, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25, 31, 32, 28];

var cabecerasBonificacion = ["Médico", "Fecha", "H. Inicio", "H. Fin", "H. Programadas", "Día", "Ind. Feriado", "Valor Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado"],
anchosBonificacion = [17, 5, 5, 5, 7, 7, 5, 7, 7, 7, 7, 7, 7, 7],
matrizIndiceBonificacion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

var cabecerasMontoFijo = ["Médico", "Descripcion", "Importe", "ConceptoId", "Concepto", "IndicadorAdministrativo", "Periodo", "ProcesoMedicoConceptoId"],
anchosMontoFijo = [14, 7, 7, 7, 7, 7, 7, 7],
matrizIndiceMontoFijo = [8, 1, 2, 3, 4, 5, 6, 7];

var registrosPagina = 10, registroPaginaDetalle = 7;
var paginasBloque = 5;
var indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0; indiceActualBloqueMF = 0;
var indiceOrden = 0;
var indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0; indiceActualPaginaMF = 0;
var esBloque = 0;

var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var sucursalId;
var sucursal;
var Campoeliminar = "";
var idPaciente = 0;
var PeriodosSeleccionados = [],
	MedicosSeleccionados = [],
	lstTadm,
	medicoEnMatriz = -1,
	ProduccionSeleccionados = [],
	BonificacionSeleccionados = [],
	MontoFijoSeleccionados = [],
	mtProd = 0, mtBon = 0, mtMon = 0, posReg = -1, posTipoAdmin = -1, mtMedico = 0;
var existenMedicos = false;


var cabecerasV = ["IdMédico", "IdOrdenAtencion", "Linea OA", "Código OA", "Monto", "Sucursal", "TipoDocumento", "Serie", "Número", "FechaEmisión", "NroObligación", "Observación"];
var anchosV = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 300];
var matrizIndiceV = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var registrosPaginaV = 5;
var paginasBloqueV = 5;
var indiceActualBloqueV = 0;
var indiceOrdenV = 0;
var indiceActualPaginaV = 0;
var matrizValidados = [];
var registrosPaginaE = 5;
var paginasBloqueE = 5;
var indiceActualBloqueE = 0;
var indiceOrdenE = 0;
var indiceActualPaginaE = 0;
var matrizErrados = [];
var opcionCarga = 0;
var listaValidados = "";
var AnioIni, MesIni;

var rABS = true, use_worker = true, transferable = true, xlsData = "", MatrizWS = [];
var XW = { rABS: '../../Scripts/xlsxworker.js' }

var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}
var objetoEdicionPlanilla = {};

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
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	MesIni = window.parent.document.getElementById("hmes").value;
	AnioIni = window.parent.document.getElementById("hanio").value;	
	MesIni = (MesIni * 1 < 10 ? "0" + MesIni : MesIni);
	ss = window.parent.document.getElementById("iss").value;
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	configuracionInicial();
	var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible").value;
	switch (ddlIndicadorOAVisible) {
		case "True":
			valorindoaM = 1;
			break;
		case "False":
			valorindoaM = 2;
			break;
		default:
			valorindoaM = 3;
			break;
	}
	var url = urlBase + "Proceso/obtenerListas/?ss=" + ss + "&su=" + sucursalId + "&indoa=" + valorindoaM;
	$.ajax(url, "get", listarTodo);
	//var spnFormatoExc = document.getElementById("spnFormatoExc");
	//spnFormatoExc.href = window.parent.parent.parent.document.getElementById("Ref").value + "Files/Formato%20de%20Planillas.xlsx";
	//var contenido = "";
	//var nCabeceras = cabecerasMedico.length;
	//contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
	//contenido += (nCabeceras + 2).toString();
	//contenido += "'>No hay datos</td></tr>";
	//document.getElementById("tbMedico").innerHTML = contenido;
	//document.getElementById("tdPaginasMedico").innerHTML = "";
	var hdfIframe = document.getElementById("hdfIframe").value;
	if (hdfIframe == "1") {
		configurar();
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

function configurar() {
	var doc = document;
		/*spnFormatoExc = doc.getElementById("spnFormatoExc"),*/
	spnTituloIframe = doc.getElementById("spnTituloIframe"),
	btnPlanillaExcel = doc.getElementById("btnPlanillaExcel"),
	btnGrabar = doc.getElementById("btnGrabar"),
	btnCancelar = doc.getElementById("btnCancelar"),
	hdfIdDet = doc.getElementById("hdfIdDet").value,
	hdfIdPlanilla = doc.getElementById("hdfIdPlanilla").value;

	//spnFormatoExc.style.display = "none";
	spnTituloIframe.innerHTML = "Editar planilla - Proceso:" + hdfIdPlanilla + " " + hdfIdDet;
	btnPlanillaExcel.style.display = "none";
	btnGrabar.innerHTML = "Actualizar";
	btnCancelar.style.display = "";

}

function configuracionInicial() {
	crearTabla("Periodo");
	crearTabla("Medico");
	crearTabla("Produccion");
	crearTabla("Bonificacion");
	crearTabla("MontoFijo");

	/*******UNICAMENTE PARA EL TEMA DE CARGA EXCEL*******/
	crearTabla2("divValidados");
	crearTabla2("divErrados");
	/***************************************************/

	ConfiguracionControles();
	//configurarOrdenacion("Periodo");
	//configurarOrdenacion("Medico");
	//configurarOrdenacion("Produccion");
	//configurarOrdenacion("Bonificacion");
	//configurarOrdenacion("MontoFijo");
	configurarFiltro();
}


function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "Periodo":
			contenido = "<table id='tblPeriodo' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
			break;
		case "Medico":
			contenido = "<table id='tblMedico' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosM'/></th>";
			break;
		case "Produccion":
			contenido = "<div style='width:4000px'><table id='tblProduccion' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosP'/></th>";
			break;
		case "Bonificacion":
			contenido = "<div style='width:2000px'><table id='tblBonificacion' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosB'/></th>";
			break;
		case "MontoFijo":
			contenido = "<div style='width:2000px'><table id='tblMontoFijo' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosMF'/></th>";
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
			case "Medico":
			case "Produccion":
			case "Bonificacion":
			case "MontoFijo":
				if (identificador == "Medico") {
					if (j == 1) {
						contenido += "<select id='cboTipoAdmMed' class='cbo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'></select>";
					}
					else {
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
					}
				} else {
					contenido += "<input type='text' class='Texto";
					contenido += identificador;
					contenido += "' name='cabecera";
					contenido += identificador;
					contenido += "' style='width:90%'>";
				}
				break;
			default:
				if (j == 1) {
					contenido += "<select id='cboTipoAdm' class='cbo";
					contenido += identificador;
					contenido += "' name='cabecera";
					contenido += identificador;
					contenido += "' style='width:90%'></select>";
				} else {
					contenido += "<input type='text' class='Texto";
					contenido += identificador;
					contenido += "' name='cabecera";
					contenido += identificador;
					contenido += "' style='width:90%'>";
				}
				break;
		}
		contenido += "</th>";
	}
	if (identificador == "Medico") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='ExportarExcel" + identificador + "'></a></th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr><td style='text-align:center' colspan='";
	contenido += (nCampos + (identificador == "Medico" ? 2 : 1)).toString();
	contenido += "'>No hay datos</td></tr>";
	contenido += "</tbody>";
	switch (identificador) {
		case "Produccion":
		case "Bonificacion":
		case "MontoFijo":
			document.getElementById("div" + identificador).innerHTML = contenido;
			break;
		default:
			contenido += "<tfoot>";
			contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
			contenido += (nCampos + (identificador == "Medico" ? 2 : 1)).toString();
			contenido += "'></td></tr>";
			contenido += "</tfoot>";
			contenido += "</table>";
			//if (identificador[1] == "2" || identificador[1] == "3" || identificador[1] == "4") {
			//	contenido += "</div>";
			//}
			document.getElementById("div" + identificador).innerHTML = contenido;
			break;
	}
}

function configurarOrdenacion(indicador) {
	var enlaces = document.getElementsByClassName("Enlace" + indicador);
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this);
			mostrarMatriz(indiceActualPagina);
		}
	}
}

function ordenarMatriz(enlace) {
	indiceOrden = enlace.getAttribute("data-orden") * 1;
	var Elemento = enlace.className.split("Enlace").join("");
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
		window["matriz" + Elemento] = mergeSort(window["matrizFiltro" + Elemento], indiceOrden);
	} else {
		var matrizClon = window["matriz" + Elemento].reverse();
		window["matriz" + Elemento] = [];
		window["matriz" + Elemento] = matrizClon.slice(0);
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


function listarTodo(rpta) {
	var divPrincipal = document.getElementById("divPrincipal");
	var gifLoad2 = document.getElementById("gifLoad2");
	if (rpta != "") {

		var dt = rpta.split("¬");
		lstTadm = dt[0].split("¯");
		listaPeriodo = dt[1].split("¯");
		listaMedico = dt[2].split("¯");
		var listaanio = (dt[3] != "" ? (dt[3].split("¯")) : "");

		llenarComboTabla(listaanio, "cboMesGrabar", "Seleccione");
		llenarComboTabla(lstTadm, "cboTipoAdm", "Todos");
		llenarComboTabla(lstTadm, "cboTipoAdmMed", "Todos");


		listarPeriodo();
		gifLoad2.style.display = "none";
		divPrincipal.style.display = "table";
	}
	else {
		gifLoad2.style.display = "";
		
		divPrincipal.style.display = "none";
		matrizPeriodo = [];
		var contenido = "";
		var nCabeceras = cabecerasPeriodo.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 1).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbPeriodo").innerHTML = contenido;
		document.getElementById("tdPaginasPeriodo").innerHTML = "";
	}
}

function listarPeriodo(irUltimaPagina) {
	crearMatriz("Periodo");
	matrizUnicaMedicos = [];
	existenMedicos = false;
	crearMatriz("Medico");
	//document.getElementById("ddlIndicadorOAVisible").onchange();
	filtrar("Periodo");
	//paginar(-1, "Periodo");

}

function crearMatriz(identificador) {
	var nRegistros = window["lista" + identificador].length;
	var nCampos;
	var campos;
	var x = 0, nFiltro, regFiltro, ndDpl = false, posproceso, contadorMedicos = 1;
	if (window["lista" + identificador][0] != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
		window["matrizBusqueda" + identificador] = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = window["lista" + identificador][i].split("¦");
			window["matriz" + identificador][x] = [];
			window["matrizFiltro" + identificador][x] = [];
			window["matrizBusqueda" + identificador][x] = [];
			nCampos = campos.length;
			switch (identificador) {
				case "Produccion":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 1) {
							window["matriz" + identificador][x][j] = campos[j];
							window["matrizFiltro" + identificador][x][j] = campos[j];
							window["matrizBusqueda" + identificador][x][j] = campos[j];
						}
						else {
							window["matriz" + identificador][x][j] = campos[j] * 1;
							window["matrizFiltro" + identificador][x][j] = campos[j] * 1;
							window["matrizBusqueda" + identificador][x][j] = campos[j] * 1;
						}
					}
					mtProd += (campos[19] * 1);

					break;
				case "Periodo":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							window["matriz" + identificador][x][j] = campos[j];
							window["matrizFiltro" + identificador][x][j] = campos[j];
							window["matrizBusqueda" + identificador][x][j] = campos[j];
						}
						else {
							window["matriz" + identificador][x][j] = campos[j] * 1;
							window["matrizFiltro" + identificador][x][j] = campos[j] * 1;
							window["matrizBusqueda" + identificador][x][j] = campos[j] * 1;
						}
					}
					break;
				case "Bonificacion":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							if (j == 6) {
								window["matriz" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
								window["matrizFiltro" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
								window["matrizBusqueda" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
							} else {
								window["matriz" + identificador][x][j] = campos[j];
								window["matrizFiltro" + identificador][x][j] = campos[j];
								window["matrizBusqueda" + identificador][x][j] = campos[j];
							}
						}
						else {
							window["matriz" + identificador][x][j] = campos[j] * 1;
							window["matrizFiltro" + identificador][x][j] = campos[j] * 1;
							window["matrizBusqueda" + identificador][x][j] = campos[j] * 1;
						}
					}
					mtBon += (campos[10] * 1);
					break;
				case "MontoFijo":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							if (j == 5) {
								window["matriz" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
								window["matrizFiltro" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
								window["matrizBusqueda" + identificador][x][j] = (campos[j].toLowerCase() == "false" ? "No" : "Si");
							} else {
								window["matriz" + identificador][x][j] = campos[j];
								window["matrizFiltro" + identificador][x][j] = campos[j];
								window["matrizBusqueda" + identificador][x][j] = campos[j];
							}
						}
						else {
							window["matriz" + identificador][x][j] = campos[j] * 1;
							window["matrizFiltro" + identificador][x][j] = campos[j] * 1;
							window["matrizBusqueda" + identificador][x][j] = campos[j] * 1;
						}
					}
					mtMon += (campos[2] * 1);
					break;
				case "Medico":

					if (!existenMedicos) {
						for (var j = 0; j < (nCampos + 1) ; j++) {
							if (j == nCampos) {
								window["matriz" + identificador][x][j] = campos[0];
							} else {
								if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador][x][j] = campos[j];
								else window["matriz" + identificador][x][j] = campos[j] * 1;
							}
						}
						matrizUnicaMedicos.push([(campos[0] * 1), (campos[7] * 1), (campos[8] * 1)]);
						window["matrizFiltro" + identificador] = window["matriz" + identificador].slice(0);
						contadorMedicos++;
						if (contadorMedicos > nRegistros) {
							existenMedicos = true;
						}
					}
					break;
			}
			x++;
		}
		//if (identificador[1] == "1") {
		//	if (matrizMedico[matrizMedico.length - 1].length == 0) {
		//		matrizMedico.splice((matrizMedico.length - 1), 1);
		//	}
		//	document.getElementById("spnTotalMedico").innerHTML = formatearNumero(mtMedico);
		//}

	}
	else {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
		window["matrizBusqueda" + identificador] = [];
	}
}

function paginar(indicePagina, identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	var registroPaginaActual;
	if (identificador == "Produccion" || identificador == "Bonificacion" || identificador == "MontoFijo") {
		registroPaginaActual = registroPaginaDetalle;
	} else {
		registroPaginaActual = registrosPagina;
	}
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
		if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
		if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;


		switch (identificador) {
			case "Periodo":
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
				break;
			case "Medico":
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueM = 0;
						break;
					case -2:
						if (indiceActualBloqueM > 0) {
							indiceActualBloqueM--;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case -3:
						if (indiceActualBloqueM < indiceUltimoBloque) {
							indiceActualBloqueM++;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueM = indiceUltimoBloque;
						break;
				}
				break;
			case "Produccion":
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueP = 0;
						break;
					case -2:
						if (indiceActualBloqueP > 0) {
							indiceActualBloqueP--;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case -3:
						if (indiceActualBloqueP < indiceUltimoBloque) {
							indiceActualBloqueP++;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueP = indiceUltimoBloque;
						break;
				}
				break;
			case "Bonificacion":
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueB = 0;
						break;
					case -2:
						if (indiceActualBloqueB > 0) {
							indiceActualBloqueB--;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
					case -3:
						if (indiceActualBloqueB < indiceUltimoBloque) {
							indiceActualBloqueB++;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueB = indiceUltimoBloque;
						break;
				}
				break;
			case "MontoFijo":
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueMF = 0;
						break;
					case -2:
						if (indiceActualBloqueMF > 0) {
							indiceActualBloqueMF--;
							indicePagina = indiceActualBloqueMF * paginasBloque;
						}
						break;
					case -3:
						if (indiceActualBloqueMF < indiceUltimoBloque) {
							indiceActualBloqueMF++;
							indicePagina = indiceActualBloqueMF * paginasBloque;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueMF = indiceUltimoBloque;
						break;
				}
				break;
		}
	}
	switch (identificador) {
		case "Periodo":
			indiceActualPagina = indicePagina;
			break;
		case "Medico":
			indiceActualPaginaM = indicePagina;
			break;
		case "Produccion":
			indiceActualPaginaP = indicePagina;
			break;
		case "Bonificacion":
			indiceActualPaginaB = indicePagina;
			break;
		case "MontoFijo":
			indiceActualPaginaMF = indicePagina;
			break;
	}
	mostrarMatriz(indicePagina, identificador);
}

function mostrarMatriz(indicePagina, identificador) {
	switch (identificador) {
		case "Periodo":
			indiceActualPagina = indicePagina;
			break;
		case "Medico":
			indiceActualPaginaM = indicePagina;
			break;
		case "Produccion":
			indiceActualPaginaP = indicePagina;
			break;
		case "Bonificacion":
			indiceActualPaginaB = indicePagina;
			break;
		case "MontoFijo":
			indiceActualPaginaMF = indicePagina;
			break;
	}

	var contenido = "";
	var n = window["matriz" + identificador].length;
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var registroPaginaActual;
		if (identificador == "Produccion" || identificador == "Bonificacion" || identificador == "MontoFijo") {
			registroPaginaActual = registroPaginaDetalle;
		} else {
			registroPaginaActual = registrosPagina;
		}
		var nCampos = window["matriz" + identificador][0].length;
		var inicio = indicePagina * registroPaginaActual;
		var fin = inicio + registroPaginaActual;
		var valorTadm;
		switch (identificador) {
			case "Periodo":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnPeriodos'";
						contenido += " data-check='";
						contenido += window["matriz" + identificador][i][0];
						contenido += "'";
						contenido += ((buscarProceso(window["matriz" + identificador][i][0], 0) > -1) ? " checked" : "");
						contenido += "/></td>";
						for (var j = 1; j < nCampos - 1; j++) {
							contenido += "<td ";
							switch (j) {
								case 2:
									contenido += ">";
									if (lstTadm.length > 0) {
										for (var k = 0; k < lstTadm.length; k++) {
											valorTadm = lstTadm[k].split("¦");
											if (valorTadm[0] == window["matriz" + identificador][i][j]) {
												contenido += valorTadm[1];
												break;
											}
										}
									} else {
										contenido += "";
									}
									break;
								case 3:
								case 4:
								case 5:
									contenido += "style='text-align:right'>";
									contenido += formatearNumero(window["matriz" + identificador][i][j]);
									break;
								default:
									contenido += ">";
									contenido += window["matriz" + identificador][i][j];
									break;
							}
							contenido += "</td>";

						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "Medico":
				var datoTipoAdmision = "";
				var datoMostrar = false;
				for (var i = inicio; i < fin; i++) {
					camposSecuencia = "";
					if (i < n) {
						if (buscarProceso(window["matriz" + identificador][i][7], 3, window["matriz" + identificador][i][8]) > -1) datoMostrar = true;
						else datoMostrar = false;
						camposSecuencia += window["matriz" + identificador][i][0];
						camposSecuencia += "|1";
						contenido += "<tr class='FilaDatos'";
						if (window["matriz" + identificador][i][10] == true) {
							contenido += " style='background:rgba(247, 147, 140, 0.75);color:white;'";
						}
						contenido += "><td style='text-align:center;";
						if (window["matriz" + identificador][i][10] == true) {
							contenido += "background:rgba(247, 147, 140, 0.75);color:white;";
						}
						contenido += "'><input type='checkbox' name='rdnMedicos' ";
						contenido += " data-check='";
						contenido += window["matriz" + identificador][i][7];
						contenido += "|";
						contenido += window["matriz" + identificador][i][8];
						contenido += "'";
						contenido += (datoMostrar ? " checked" : "");
						contenido += "/></td>";
						for (var j = 1; j < nCampos - 3; j++) {
							contenido += "<td";
							switch (j) {
								case 2:
									if (window["matriz" + identificador][i][10] == true) {
										contenido += " style='background:rgba(247, 147, 140, 0.75);color:white;'";
									}
									contenido += ">";
									for (var k = 0; k < lstTadm.length; k++) {
										datoTipoAdmision = lstTadm[k].split("¦");
										if ((datoTipoAdmision[0] * 1) == window["matriz" + identificador][i][8]) {
											contenido += datoTipoAdmision[1];
											break;
										}
									}
									break;
								case 3:
								case 4:
								case 5:
								case 6:
								case 7:
									if (window["matriz" + identificador][i][10] == true) {
										contenido += " style='background:rgba(247, 147, 140, 0.75);color:white;text-align:right;'>";
									}
									else {
										contenido += " style='text-align:right'>";
									}
									contenido += formatearNumero(window["matriz" + identificador][i][j - 1]);
									break;
								default:
									if (window["matriz" + identificador][i][10] == true) {
										contenido += " style='background:rgba(247, 147, 140, 0.75);color:white;'";
									}
									contenido += ">";
									contenido += window["matriz" + identificador][i][j];
									break;
							}
							contenido += "</td>";

						}
						contenido += "<td style='text-align:center'>";
						if (datoMostrar) {
							contenido += "<span class='Icons fa-list-alt'";
							contenido += "onclick='EncontrarDetalle(";
							contenido += i;
							contenido += ");medicoEnMatriz=";
							contenido += i;
							contenido += "'></span>";
						}
						contenido += "</td>";
						//contenido += "<td style='text-align:center'><span class='Icons fa-list-alt'";
						//contenido += " data-Det='";
						//contenido += window["matriz" + identificador][i][7];
						//contenido += "-";
						//contenido += window["matriz" + identificador][i][9];
						//contenido += "-";
						//contenido += window["matriz" + identificador][i][8];
						//contenido += "'></span></td>";
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "Produccion":

			case "Bonificacion":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdn";
						contenido += identificador;
						contenido += "'  data-check='";
						if (identificador == "Produccion") {
							contenido += window["matriz" + identificador][i][29];
							contenido += "¦" + window["matriz" + identificador][i][19];
							contenido += "¦" + window["matriz" + identificador][i][18];
							contenido += "¦" + window["matriz" + identificador][i][17];
							contenido += "¦" + window["matriz" + identificador][i][16];
							contenido += "'";
							contenido += " data-id='";
							contenido += window["matriz" + identificador][i][29];
							contenido += "'";
							contenido += (buscarProceso(window["matriz" + identificador][i][29], 1) > -1 ? " checked" : "");
						} else {
							contenido += window["matriz" + identificador][i][14];
							contenido += "¦" + window["matriz" + identificador][i][10];
							contenido += "¦¦" + window["matriz" + identificador][i][9];
							contenido += "¦" + window["matriz" + identificador][i][8];
							contenido += "'";
							contenido += " data-id=";
							contenido += window["matriz" + identificador][i][14];
							contenido += (buscarProceso(window["matriz" + identificador][i][14], 2) > -1 ? " checked" : "");
						}
						contenido += "/></td>";
						for (var j = 0; j < nCampos - 1; j++) {

							contenido += "<td";
							if (identificador == "Produccion") {
								switch (j) {
									case 3:
									case 11://10
									case 12://11
									case 24://23
										contenido += ">";
										contenido += formatearfecha(window["matriz" + identificador][i][matrizIndiceProduccion[j]]);
										break;
									case 6://5
										//case 10://9
									case 13://12
									case 14://13
									case 15:
									case 16:
									case 18:
									case 19:
									case 20:
									case 21:
									case 22:
									case 23:
									case 24:

										//case 8:
										//case 10:
										//case 11:
										//case 13:
										//case 14:
										//case 15:
										//case 16:
										//case 17:
										//case 18:
										//case 19:
										contenido += " style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador][i][matrizIndiceProduccion[j]]);
										break;
									case 29:
									case 30:
										contenido += " style='text-align:right'>";
										contenido += window["matriz" + identificador][i][matrizIndiceProduccion[j]];
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador][i][matrizIndiceProduccion[j]];
										break;
								}
							} else {
								switch (j) {
									//case 6:
									//	contenido += ">";
									//	if (window["matriz" + identificador][i][j] == "False") {
									//		contenido += "No";
									//	} else {
									//		contenido += "Sí";
									//	}
									//	break
									case 7:
									case 8:
									case 9:
									case 10:
										contenido += " style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador][i][j]);
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador][i][j];
										break;
								}
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "MontoFijo":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdn";
						contenido += identificador;
						contenido += "'  data-check='";
						contenido += window["matriz" + identificador][i][7];
						contenido += "¦" + window["matriz" + identificador][i][2];
						contenido += "'";
						contenido += " data-id=";
						contenido += window["matriz" + identificador][i][7];
						contenido += (buscarProceso(window["matriz" + identificador][i][7], 4) > -1 ? " checked" : "");

						contenido += "/></td>";
						for (var j = 0; j < nCampos - 1; j++) {

							contenido += "<td";
							switch (j) {
								case 0:
									contenido += ">";
									contenido += window["matriz" + identificador][i][8];
									break;
									//case 5:
									//	contenido += ">";
									//	if (window["matriz" + identificador][i][j] == "False") {
									//		contenido += "No";
									//	} else {
									//		contenido += "Sí";
									//	}
									//	break
								case 6:
									contenido += ">";
									switch (window["matriz" + identificador][i][j]) {
										case "L": contenido += "Semanal"; break;
										case "Q": contenido += "Quincenal"; break;
										case "M": contenido += "Mensual"; break;
										case "B": contenido += "Bimensual"; break;
										case "T": contenido += "Trimestral"; break;
										case "S": contenido += "Semestral"; break;
										case "A": contenido += "Anual"; break;
									}
									break;
								case 2:
									contenido += " style='text-align:right'>";
									contenido += formatearNumero(window["matriz" + identificador][i][j]);
									break;
								default:
									contenido += ">";
									contenido += window["matriz" + identificador][i][j];
									break;
							}

							contenido += "</td>";
						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
		}
	}
	else {
		var nCabeceras = window["cabeceras" + identificador].length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + (identificador == "Medico" ? 2 : 1)).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
	switch (identificador) {
		case "Periodo":
			configurarCheck("Periodos");
			break;
		case "Medico":
			configurarCheck("Medicos");
			break;
		case "Produccion":
			configurarCheck("Produccion");
			break;
		case "Bonificacion":
			configurarCheck("Bonificacion");
			break;
		case "MontoFijo":
			configurarCheck("MontoFijo");
			break;
	}
}

function crearPaginas(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var registroPaginaActual;
	if (identificador == "Produccion" || identificador == "Bonificacion" || identificador == "MontoFijo") {
		registroPaginaActual = registroPaginaDetalle;
	} else {
		registroPaginaActual = registrosPagina;
	}

	var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
	if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
	if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
	var contenido = "", bloqueActual;
	switch (identificador) {
		case "Periodo":
			bloqueActual = indiceActualBloque;
			break;
		case "Medico":
			bloqueActual = indiceActualBloqueM;
			break;
		case "Produccion":
			bloqueActual = indiceActualBloqueP;
			break;
		case "Bonificacion":
			bloqueActual = indiceActualBloqueB;
			break;
		case "MontoFijo":
			bloqueActual = indiceActualBloqueMF;
			break;
	}

	var inicio = bloqueActual * paginasBloque;
	var fin = inicio + paginasBloque;
	if ((bloqueActual) > 0 && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginar(-1,\"" + identificador + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2,\"" + identificador + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
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
	if ((bloqueActual) < indiceUltimoBloque && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registroPaginaActual) {
		if (identificador == "Produccion" || identificador == "Bonificacion" || identificador == "MontoFijo") {
			document.getElementById("divPaginacion" + identificador).innerHTML = "";
		} else {
			document.getElementById("tdPaginas" + identificador).innerHTML = "";
		}
	}
	else {
		if (identificador == "Produccion" || identificador == "Bonificacion" || identificador == "MontoFijo") {
			document.getElementById("divPaginacion" + identificador).innerHTML = ((identificador[1] == "2" || identificador[1] == "3") ? "<div style='position:fixed;width:100%'>" + contenido + "</div>" : contenido);
		} else {
			document.getElementById("tdPaginas" + identificador).innerHTML = ((identificador[1] == "2" || identificador[1] == "3") ? "<div style='position:fixed;width:100%'>" + contenido + "</div>" : contenido);
		}
		seleccionarPaginaActual(identificador);
	}
}

function seleccionarPaginaActual(identificador) {
	var indice;
	switch (identificador) {
		case "Periodo":
			indice = indiceActualPagina;
			break;
		case "Medico":
			indice = indiceActualPaginaM;
			break;
		case "Produccion":
			indice = indiceActualPaginaP;
			break;
		case "Bonificacion":
			indice = indiceActualPaginaB;
			break;
		case "MontoFijo":
			indice = indiceActualPaginaMF;
			break;
	}
	var aPagina = document.getElementById("a" + identificador + indice);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
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


/*******UNICAMENTE PARA EL TEMA DE CARGA EXCEL*******/
function crearTabla2(opcion) {
	var nCampos = "";
	var contenido = "";
	switch (opcion) {
		case "divValidados":
			nCampos = cabecerasV.length;
			contenido = "<table class='tabla-general tabla-corta' style='table-layout: fixed;width:2000px'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			for (var j = 0; j < nCampos; j++) {
				contenido += "<th style='width:";
				contenido += anchosV[j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace' data-orden='";
				contenido += matrizIndiceV[j];
				contenido += "'>";
				contenido += cabecerasV[j];
				contenido += "</span><br/>";
				contenido += "</th>";
			}
			contenido += "</tr>";
			contenido += "</thead>";
			contenido += "<tbody id='tbValidos' class='tabla-FilaCuerpo'>";
			contenido += "<tr><td colspan='11' style='text-align:left'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
		case "divErrados":
			nCampos = cabecerasV.length;
			contenido = "<table class='tabla-general tabla-corta' style='table-layout: fixed;width:2000px'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			for (var j = 0; j < nCampos; j++) {
				contenido += "<th style='width:";
				contenido += anchosV[j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace' data-orden='";
				contenido += matrizIndiceV[j];
				contenido += "'>";
				contenido += cabecerasV[j];
				contenido += "</span><br/>";
				contenido += "</th>";
			}
			contenido += "</tr>";
			contenido += "</thead>";
			contenido += "<tbody id='tbErrados' class='tabla-FilaCuerpo'>";
			contenido += "<tr><td colspan='11' style='text-align:left'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
	}
	document.getElementById(opcion).innerHTML = contenido;
}



function crearMatriz2(div, lista) {
	switch (div) {
		case "divValidados":
			var cabecera, exito, nCampos, campos, x = 0, v = 0;
			matrizValidados = [];
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizValidados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizValidados[x][j] = campos[j];
						else matrizValidados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenV = 0;
			indiceOrdenV = 0;
			mostrar2Pagina(1, -1);
			document.getElementById("numRegY1").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizValidados.length + "</i>";
			break;
		case "divErrados":
			var cabeceras = document.getElementsByName("cabeceraE");
			var nCabeceras = cabeceras.length;
			var listaCabeceras = [];
			for (var i = 0; i < nCabeceras; i++) {
				listaCabeceras[i] = cabeceras[i].value.toLowerCase();
			}
			var cabecera, exito, nCampos, campos, x = 0, v = 0;
			matrizErrados = [];
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizErrados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizErrados[x][j] = campos[j];
						else matrizErrados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenE = 0;
			indiceOrdenE = 0;
			mostrar2Pagina(2, -1);
			document.getElementById("numRegY2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizErrados.length + "</i>";
			break;
	}
}

function mostrar2Pagina(div, indicePagina) {
	switch (div) {
		case 1:
			var nRegistros = matrizValidados.length;
			var esBloque = (indicePagina < 0);
			if (esBloque) {
				var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
				if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
				var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
				if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueV = 0;
						break;
					case -2:
						if (indiceActualBloqueV > 0) {
							indiceActualBloqueV--;
							indicePagina = indiceActualBloqueV * paginasBloqueV;
						}
						break;
					case -3:
						if (indiceActualBloqueV < indiceUltimoBloque) {
							indiceActualBloqueV++;
							indicePagina = indiceActualBloqueV * paginasBloqueV;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueV = indiceUltimoBloque;
						break;
				}
			}
			indiceActualPaginaV = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			if (matrizValidados.length > 0) {
				var inicio = indicePagina * registrosPaginaV;
				var fin = inicio + registrosPaginaV;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {
						nCampos = cabecerasV.length;
						contenido += "<tr>";
						for (j = 0; j < (nCampos) ; j++) {
							switch (j) {
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 8:
								case 10:
									contenido += "<td style='text-align:right'>";
									break;

								default:
									contenido += "<td>";
									break;
							}
							if (j == 4) contenido += formatearNumero(matrizValidados[i][j]);
							else contenido += matrizValidados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}
			}
			else {
				contenido += "<tr class='FilaDatos'><td style='text-align:left' colspan='11'>No hay datos</td></tr>";
			}
			var tabla = document.getElementById("tbValidos");
			if (tabla != null) {
				tabla.innerHTML = contenido;
				configurarPaginacion2(1);
				seleccionarPaginaActual2(1);
			}
			if (esBloque) {
				configurarPaginacion2(1);
			}
			break;
		case 2:
			var nRegistros = matrizErrados.length;
			var esBloque = (indicePagina < 0);
			if (esBloque) {
				var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
				if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
				var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
				if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueE = 0;
						break;
					case -2:
						if (indiceActualBloqueE > 0) {
							indiceActualBloqueE--;
							indicePagina = indiceActualBloqueE * paginasBloqueE;
						}
						break;
					case -3:
						if (indiceActualBloqueE < indiceUltimoBloque) {
							indiceActualBloqueE++;
							indicePagina = indiceActualBloqueE * paginasBloqueE;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueE = indiceUltimoBloque;
						break;
				}
			}
			indiceActualPaginaE = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			if (matrizErrados.length > 0) {
				var inicio = indicePagina * registrosPaginaE;
				var fin = inicio + registrosPaginaE;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {
						nCampos = cabecerasV.length;
						contenido += "<tr>";
						for (j = 0; j < nCampos; j++) {
							switch (j) {
								case 0:
								case 1:
								case 2:
								case 3:
								case 4:
								case 8:
								case 10:
									contenido += "<td style='text-align:right'>";
									break;

								default:
									contenido += "<td>";
									break;
							}
							if (j == 4) contenido += formatearNumero(matrizErrados[i][j]);
							else contenido += matrizErrados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else

						break;
				}
			} else {
				contenido += "<tr class='FilaDatos'><td style='text-align:left' colspan='11'>No hay datos</td></tr>";
			}
			var tabla = document.getElementById("tbErrados");
			if (tabla != null) {
				tabla.innerHTML = contenido;
				configurarPaginacion2(2);
				seleccionarPaginaActual2(2);
				if (esBloque) {
					configurarPaginacion2(2);
				}
			}

			break;
	}
}

function configurarPaginacion2(div) {
	switch (div) {
		case 1:
			var nRegistros = matrizValidados.length;
			var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
			if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
			var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
			if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
			var contenido = "";
			var inicio = indiceActualBloqueV * paginasBloqueV;
			var fin = inicio + paginasBloqueV;
			if (indiceActualBloqueV > 0 && nRegistros > (paginasBloqueV * registrosPaginaV)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='paginaValidos' onclick='mostrar2Pagina(1, ";
					contenido += i;
					contenido += ");'  title='Ir a la pagina ";
					contenido += (i + 1).toString();
					contenido += "' id='aV";
					contenido += i.toString();
					contenido += "'>";
					contenido += (i + 1).toString();
					contenido += "</a>&nbsp;";
				} else break;
			}
			if (indiceActualBloqueV < indiceUltimoBloque && nRegistros > (paginasBloqueV * registrosPaginaV)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgValidos");
			if (nRegistros <= registrosPaginaV) {
				tdPagina.innerHTML = "";
			}
			else {
				tdPagina.innerHTML = contenido;
				seleccionarPaginaActual2(1);
			}
			break;
		case 2:
			var nRegistros = matrizErrados.length;
			var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
			if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
			var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
			if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
			var contenido = "";
			var inicio = indiceActualBloqueE * paginasBloqueE;
			var fin = inicio + paginasBloqueE;
			if (indiceActualBloqueE > 0 && nRegistros > (paginasBloqueE * registrosPaginaE)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='pagina paginaErrados' onclick='mostrar2Pagina(2, ";
					contenido += i;
					contenido += ");'  title='Ir a la pagina ";
					contenido += (i + 1).toString();
					contenido += "' id='aE";
					contenido += i.toString();
					contenido += "'>";
					contenido += (i + 1).toString();
					contenido += "</a>&nbsp;";
				} else break;
			}
			if (indiceActualBloqueE < indiceUltimoBloque && nRegistros > (paginasBloqueE * registrosPaginaE)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgErrados");
			if (nRegistros <= registrosPaginaV) {
				tdPagina.innerHTML = "";
			}
			else {
				tdPagina.innerHTML = contenido;
				seleccionarPaginaActual2(2);
			}
			break;
	}
}

function seleccionarPaginaActual2(div) {
	var aPaginas;
	if (div == 1) aPaginas = document.getElementsByClassName("paginaValidos");
	else aPaginas = document.getElementsByClassName("paginaErrados");
	var nPaginas = aPaginas.length;
	for (i = 0; i < nPaginas; i++) {
		if (div == 1) aPaginas[i].className = "pagina paginaValidos";
		else aPaginas[i].className = "pagina paginaErrados";
	}
	switch (div) {
		case 1:
			var aPagina = document.getElementById("aV" + indiceActualPaginaV);
			if (aPagina != null) {
				aPagina.className = "pagina paginaValidos seleccionado";
			}
			break;
		case 2:
			var aPagina = document.getElementById("aE" + indiceActualPaginaE);
			if (aPagina != null) {
				aPagina.className = "pagina paginaErrados seleccionado";
			}
			break;
	}
}

/***************************************************/

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
	var cboMesGrabar = document.getElementById("cboMesGrabar");
	cboMesGrabar.className = cboMesGrabar.className.split("error").join("");
	//cboMesGrabar.value = "";

}

function formatearNumero(valor) {
	var valorFrm;
	if (!isNaN(valor)) {
		var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		valorFrm = valor.toLocaleString("en-US", frmMoneda);
	} else {
		valorFrm = "0.00";
	}
	return valorFrm
}

function buscarProceso(p, t, x) {
	var n, reg, pos = -1;

	switch (t) {
		case 0:
			n = PeriodosSeleccionados.length;
			break;
		case 1:
			n = ProduccionSeleccionados.length;
			break;
		case 2:
			n = BonificacionSeleccionados.length;
			break;
		case 3:
			n = MedicosSeleccionados.length;
			break;
		case 4:
			n = MontoFijoSeleccionados.length;
			break;
	}

	if (n > 0) {
		for (var i = 0; i < n; i++) {
			switch (t) {
				case 0:
					reg = PeriodosSeleccionados[i];
					break;
				case 1:
					reg = ProduccionSeleccionados[i];
					break;
				case 2:
					reg = BonificacionSeleccionados[i];
					break;
				case 3:
					reg = MedicosSeleccionados[i];
					break;
				case 4:
					reg = MontoFijoSeleccionados[i];
					break;
			}
			if (t == 3) {
				if (posTipoAdmin == -1) {
					if (reg[0] == p && reg[2] == x) {
						if (reg[9] == true) {
							pos = i;
							break;
						}
					}
				} else {
					if (reg[0] == p && reg[2] == (x != undefined ? x : posTipoAdmin)) {
						if (reg[9] == true) {
							pos = i;
							break;
						}
					}
				}
			} else {
				if (t == 0) {
					if (reg == p) {
						pos = i;
						break;
					}
				} else {
					if (reg[0] == p) {
						pos = i;
						break;
					}
				}
			}
		}
	}
	return pos;
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
		}
		else {
			if (listaTabs[i].className.indexOf("bloqueado") > -1) listaTabs[i].className = "tab-link bloqueado";
			else listaTabs[i].className = "tab-link";
			contenido.className = "tab-content";
		}
	}
	var opcionactual = actual.getAttribute("data-tab");
	var total = 0;
	var contadorActual = 0;
	if (opcionactual == "tabx-1") {
		for (var x = 0; x < ProduccionSeleccionados.length; x++) {
			total = total + ProduccionSeleccionados[x][1];
		}
		contadorActual = ProduccionSeleccionados.length;
	}
	else if (opcionactual == "tabx-2") {
		for (var x = 0; x < BonificacionSeleccionados.length; x++) {
			total = total + BonificacionSeleccionados[x][4];
		}
		contadorActual = BonificacionSeleccionados.length;
	} else if (opcionactual == "tabx-3") {
		for (var x = 0; x < MontoFijoSeleccionados.length; x++) {
			total = total + MontoFijoSeleccionados[x][1];
		}
		contadorActual = MontoFijoSeleccionados.length;
	}
	document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
	document.getElementById("spnContadorReg").innerHTML = contadorActual;
}


function configurarCheck(identificador) {
	var checks = document.getElementsByName("rdn" + identificador);
	var nCampos = checks.length;
	switch (identificador) {
		case "Periodos":

			for (var x = 0; x < nCampos; x++) {
				checks[x].onclick = function () {
					matrizBusquedaMedico = [];
					objetoEdicionPlanilla = {};
					var dato = this.getAttribute("data-check") * 1;
					var chkTodosM = document.getElementById("chkTodosM");
					if (this.checked) {
						PeriodosSeleccionados.push(dato);
					}
					else {
						var n = PeriodosSeleccionados.length;
						var matriz = PeriodosSeleccionados.slice(0);
						for (var y = 0; y < n; y++) {
							if (matriz[y] == dato) {
								PeriodosSeleccionados.splice(y, 1);
								break;
							}
						}
					}
					mostrarMedicosPeriodo();
					if (PeriodosSeleccionados.length > 0) {
						MedicosSeleccionados = [];
						chkTodosM.checked = false;
						chkTodosM.click();
					}
					else {
						MedicosSeleccionados = [];
						chkTodosM.checked = true;
						chkTodosM.click();
					}

				}
			}
			break;
		case "Medicos":
			for (var x = 0; x < nCampos; x++) {
				checks[x].onclick = function () {
					var dato = this.getAttribute("data-check").split("|");
					var n = MedicosSeleccionados.length;
					var matriz = MedicosSeleccionados.slice(0);
					var valor = 0;
					if (this.checked) {
						for (var y = 0; y < n; y++) {
							if (matriz[y][0] == (dato[0] * 1) && matriz[y][2] == (dato[1] * 1)) {
								MedicosSeleccionados[y][9] = true;
								break;
							}
						}
					}
					else {

						for (var y = 0; y < n; y++) {
							if (matriz[y][0] == (dato[0] * 1) && matriz[y][2] == (dato[1] * 1)) {
								MedicosSeleccionados[y][9] = false;
								break;
							}
						}
					}
					mostrarMatriz(indiceActualPaginaM, "Medico");


					var ContadorSeleccionados = 0;
					for (var x = 0; x < MedicosSeleccionados.length; x++) {
						if (MedicosSeleccionados[x][9] == true) {
							ContadorSeleccionados = ContadorSeleccionados + 1;
							valor = valor + MedicosSeleccionados[x][7];
						}
					}
					var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
					if (ContadorSeleccionados > 0) {
						//document.getElementById("btnGrabar").style.display = "";
						
						if (ddlIndicadorOAVisible.value != "False") {
							document.getElementById("btnGrabar").style.display = "none";
							document.getElementById("btnPlanillaExcel").style.display = "none";
						}
						else {
							document.getElementById("btnGrabar").style.display = "";
							document.getElementById("btnPlanillaExcel").style.display = "";
						}

					} else {
						document.getElementById("btnGrabar").style.display = "none";
						if (ddlIndicadorOAVisible.value != "False") {
							document.getElementById("btnGrabar").style.display = "none";
							document.getElementById("btnPlanillaExcel").style.display = "none";
						}
					}
					var spnTotalMedico = document.getElementById("spnTotalMedico");
					spnTotalMedico.innerHTML = formatearNumero(valor);
					var spnTotalProcesar = document.getElementById("spnTotalProcesar");
					spnTotalProcesar.innerHTML = ContadorSeleccionados + " de " + MedicosSeleccionados.length;
				}
			}
			break;
		case "Produccion":
			for (var x = 0; x < nCampos; x++) {
				checks[x].onclick = function () {
					var dato = this.getAttribute("data-check").split("¦");
					var pos = buscarProceso((dato[0] * 1), 1);
					if (this.checked) {
						if (pos == -1) {
							ProduccionSeleccionados.push([(dato[0] * 1), (dato[1] * 1), (dato[2] * 1), (dato[3] * 1), (dato[4] * 1)]);
						}
					} else {
						if (pos > -1) {
							ProduccionSeleccionados.splice(pos, 1);
						}
					}
					mostrarMatriz(indiceActualPaginaP, "Produccion");
					var total = 0;
					for (var x = 0; x < ProduccionSeleccionados.length; x++) {
						total = total + ProduccionSeleccionados[x][1];
					}
					document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
					document.getElementById("spnContadorReg").innerHTML = ProduccionSeleccionados.length;
				}
			}
			break;
		case "Bonificacion":
			for (var x = 0; x < nCampos; x++) {
				checks[x].onclick = function () {
					var dato = this.getAttribute("data-check").split("¦");
					var pos = buscarProceso((dato[0] * 1), 2);
					if (this.checked) {
						if (pos == -1) {
							BonificacionSeleccionados.push([(dato[0] * 1), (dato[1] * 1), 0, (dato[3] * 1), (dato[4] * 1)]);
						}
					} else {
						if (pos > -1) {
							BonificacionSeleccionados.splice(pos, 1);
						}
					}
					mostrarMatriz(indiceActualPaginaB, "Bonificacion");
					var total = 0;
					for (var x = 0; x < BonificacionSeleccionados.length; x++) {
						total = total + BonificacionSeleccionados[x][4];
					}
					document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
					document.getElementById("spnContadorReg").innerHTML = BonificacionSeleccionados.length;
				}
			}
			break;
		case "MontoFijo":
			for (var x = 0; x < nCampos; x++) {
				checks[x].onclick = function () {
					var dato = this.getAttribute("data-check").split("¦");
					var pos = buscarProceso((dato[0] * 1), 4);
					if (this.checked) {
						if (pos == -1) {
							MontoFijoSeleccionados.push([(dato[0] * 1), (dato[1] * 1), 0, 0, 0]);
						}
					} else {
						if (pos > -1) {
							MontoFijoSeleccionados.splice(pos, 1);
						}
					}
					mostrarMatriz(indiceActualPaginaMF, "MontoFijo");
					var total = 0;
					for (var x = 0; x < MontoFijoSeleccionados.length; x++) {
						total = total + MontoFijoSeleccionados[x][1];
					}
					document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
					document.getElementById("spnContadorReg").innerHTML = MontoFijoSeleccionados.length
				}
			}
			break;
	}
}


function mostrarMedicosPeriodo() {
	if (PeriodosSeleccionados.length > 0) {
		var matriz = [];
		var contador = 0;
		var matrizCopia = matrizUnicaMedicos.slice(0);
		for (var x = 0; x < PeriodosSeleccionados.length; x++) {
			for (var y = 0; y < matrizCopia.length; y++) {
				if (matrizCopia[y][0] == PeriodosSeleccionados[x]) {
					matriz[contador] = [];
					matriz[contador] = [matrizCopia[y][0], matrizCopia[y][1], matrizCopia[y][2], y];
					contador++;
				}
			}
		}
		contador = 0;
		var nuevaMatriz = [];
		nuevaMatriz = mergeSort(matriz, 1);
		nuevaMatriz.reverse();
		matrizMedico = [];
		var encontrado = false;
		mtMedico = 0;
		for (x = 0; x < nuevaMatriz.length; x++) {
			encontrado = false;
			for (var k = 0; k < matrizMedico.length; k++) {
				if (matrizMedico[k][7] == nuevaMatriz[x][1] && matrizMedico[k][8] == nuevaMatriz[x][2]) {
					matrizMedico[k][0] = matrizMedico[k][0];
					matrizMedico[k][1] = matrizMedico[k][1];
					matrizMedico[k][2] = matrizMedico[k][2] + matrizFiltroMedico[nuevaMatriz[x][3]][2];
					matrizMedico[k][3] = matrizMedico[k][3] + matrizFiltroMedico[nuevaMatriz[x][3]][3];
					matrizMedico[k][4] = matrizMedico[k][4] + matrizFiltroMedico[nuevaMatriz[x][3]][4];
					matrizMedico[k][5] = matrizMedico[k][5] + matrizFiltroMedico[nuevaMatriz[x][3]][5];
					matrizMedico[k][6] = matrizMedico[k][6] + matrizFiltroMedico[nuevaMatriz[x][3]][6];
					matrizMedico[k][7] = matrizMedico[k][7];
					matrizMedico[k][8] = matrizMedico[k][8];
					matrizMedico[k][9] = matrizMedico[k][9] + "|" + matrizFiltroMedico[nuevaMatriz[x][3]][9];
					matrizMedico[k][10] = false;
					encontrado = true;
				}
			}
			if (encontrado == false) {
				matrizMedico[contador] = [];
				matrizMedico[contador][0] = matrizFiltroMedico[nuevaMatriz[x][3]][0];
				matrizMedico[contador][1] = matrizFiltroMedico[nuevaMatriz[x][3]][1];
				matrizMedico[contador][2] = matrizFiltroMedico[nuevaMatriz[x][3]][2];
				matrizMedico[contador][3] = matrizFiltroMedico[nuevaMatriz[x][3]][3];
				matrizMedico[contador][4] = matrizFiltroMedico[nuevaMatriz[x][3]][4];
				matrizMedico[contador][5] = matrizFiltroMedico[nuevaMatriz[x][3]][5];
				matrizMedico[contador][6] = matrizFiltroMedico[nuevaMatriz[x][3]][6];
				matrizMedico[contador][7] = matrizFiltroMedico[nuevaMatriz[x][3]][7];
				matrizMedico[contador][8] = matrizFiltroMedico[nuevaMatriz[x][3]][8];
				matrizMedico[contador][9] = matrizFiltroMedico[nuevaMatriz[x][3]][0].toString();
				matrizMedico[contador][10] = matrizFiltroMedico[nuevaMatriz[x][3]][10];
				//matrizMedico[k][10] = false;
				contador++;
			}

		}

		var matrizOrdenada = mergeSort(matrizMedico, 1);
		matrizMedico = [];
		matrizMedico = matrizOrdenada.splice(0);
		matrizMedico.reverse();
		for (var k = 0; k < matrizMedico.length; k++) {
			mtMedico = mtMedico + matrizMedico[k][6];
		}
		document.getElementById("spnTotalMedico").innerHTML = formatearNumero(mtMedico);
		var CopiadeMatriz = matrizMedico.slice(0);
		if (matrizBusquedaMedico.length == 0) {
			for (var x = 0; x < CopiadeMatriz.length; x++) {
				matrizBusquedaMedico.push(CopiadeMatriz[x]);
			}
		}
		mostrarMatriz(0, "Medico");
	} else {
		matrizMedico = [];
		matrizBusquedaMedico = [];
		document.getElementById("spnTotalMedico").innerHTML = "0.00";
		mostrarMatriz(0, "Medico");
	}

}


function ConfiguracionControles() {

	var spnFormatoExc = document.getElementById("spnFormatoExc");
	spnFormatoExc.onclick = function () {
		var hojas = "Pagos|Sucursal";
		var nombre = "Formato de Planillas.xlsx";
		var sp = "uspFormatoPlanillas";
		var strDatos = "1|CSF|0|0|21|21|0|0";
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Proceso/listarReportePlanilla/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre + "&sp=" + sp;
		postDownload(url, descargaExcelXLSx, strDatos);
    }


	var ExportarExcelMedico = document.getElementById("ExportarExcelMedico");
	ExportarExcelMedico.onclick = function () {
		var nRegistros = matrizMedico.length;
		if (nRegistros > 0) {

			var formBlob = new Blob([exportacion()], { type: 'application/vnd.ms-excel' });
			this.download = "PlanillaMedicos.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}

	var chkTodos = document.getElementById("chkTodos");
	chkTodos.onclick = function () {
		var chkTodosM = document.getElementById("chkTodosM");
		PeriodosSeleccionados = [];
		MedicosSeleccionados = [];
		matrizBusquedaMedico = [];
		objetoEdicionPlanilla = {};
		if (this.checked) {
			for (var x = 0; x < matrizPeriodo.length; x++) {
				PeriodosSeleccionados.push(matrizPeriodo[x][0]);
			}
			mostrarMedicosPeriodo();
			var rdnPeriodos = document.getElementsByName("rdnPeriodos");
			for (var z = 0; z < rdnPeriodos.length; z++) {
				rdnPeriodos[z].checked = true;
			}
			chkTodosM.checked = false;
			chkTodosM.click();

		} else {
			mostrarMedicosPeriodo();
			var rdnPeriodos = document.getElementsByName("rdnPeriodos");
			for (var z = 0; z < rdnPeriodos.length; z++) {
				rdnPeriodos[z].checked = false;
			}
			chkTodosM.checked = false;
		}

	}
	var chkTodosM = document.getElementById("chkTodosM");
	chkTodosM.onclick = function () {
		var spnTotalMedico = document.getElementById("spnTotalMedico");
		var spnTotalProcesar = document.getElementById("spnTotalProcesar");
		var encontrado = false;
		var posicion = -1;
		var total = 0;
		if (this.checked) {
			//MedicosSeleccionados = [];

			for (var x = 0; x < matrizMedico.length; x++) {
				/*MedicosSeleccionados.push([IDMEDICO, PROCESOS, TIPOADMISION, PRODUCCION, BONIFICACION, MONTO FIJO,TOTAL REAL, TOTALACTUAL,IDMODIFICADO,ESTADO]);*/
				for (var k = 0; k < MedicosSeleccionados.length; k++) {
					if (matrizMedico[x][7] == MedicosSeleccionados[k][0] && matrizMedico[x][8] == MedicosSeleccionados[k][2]) {
						encontrado = true;
						posicion = k;
						break;
					}
				}
				if (!encontrado) {
					MedicosSeleccionados.push([matrizMedico[x][7], matrizMedico[x][9], matrizMedico[x][8], 0, 0, 0, matrizMedico[x][6], matrizMedico[x][6], "", true]);
				}
				else {
					if (posicion > -1) {
						MedicosSeleccionados[posicion][9] = true;
					}
				}
				posicion = -1;
				encontrado = false;
			}
			mostrarMatriz(0, "Medico");
			var rdnDetalle = document.getElementsByName("rdnDetalle");
			for (var z = 0; z < rdnDetalle.length; z++) {
				rdnDetalle[z].checked = true;
			}

		} else {
			for (var x = 0; x < matrizMedico.length; x++) {
				/*MedicosSeleccionados.push([IDMEDICO, PROCESOS, TIPOADMISION, PRODUCCION, BONIFICACION, MONTO FIJO,TOTAL REAL, TOTALACTUAL,IDMODIFICADO,ESTADO]);*/
				for (var k = 0; k < MedicosSeleccionados.length; k++) {
					if (matrizMedico[x][7] == MedicosSeleccionados[k][0] && matrizMedico[x][8] == MedicosSeleccionados[k][2]) {
						encontrado = true;
						posicion = k;
						break;
					}
				}
				if (encontrado) {
					MedicosSeleccionados[posicion][9] = false;
				}
				encontrado = false;
			}

			mostrarMatriz(0, "Medico");
			var rdnDetalle = document.getElementsByName("rdnDetalle");
			for (var z = 0; z < rdnDetalle.length; z++) {
				rdnDetalle[z].checked = false;
			}
		}
		var ContadorSeleccionados = 0;
		for (var x = 0; x < MedicosSeleccionados.length; x++) {
			if (MedicosSeleccionados[x][9] == true) {
				ContadorSeleccionados = ContadorSeleccionados + 1;
				total = total + MedicosSeleccionados[x][7];
			}
		}
		spnTotalProcesar.innerHTML = ContadorSeleccionados + " de " + MedicosSeleccionados.length;
		spnTotalMedico.innerHTML = formatearNumero(total);
		var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
		if (ContadorSeleccionados > 0) {
			//document.getElementById("btnGrabar").style.display = "";
			
			if (ddlIndicadorOAVisible.value != "False") {
				document.getElementById("btnGrabar").style.display = "none";
				document.getElementById("btnPlanillaExcel").style.display = "none";
			}
			else {
				document.getElementById("btnGrabar").style.display = "";
				document.getElementById("btnPlanillaExcel").style.display = "";
			}
		} else {
			document.getElementById("btnGrabar").style.display = "none";
			if (ddlIndicadorOAVisible.value != "False") {
				document.getElementById("btnGrabar").style.display = "none";
				document.getElementById("btnPlanillaExcel").style.display = "none";
			}
		}



	}

	var chkTodosP = document.getElementById("chkTodosP");
	chkTodosP.onclick = function () {
		//ProduccionSeleccionados = [];
		var total = 0;
		var encontrado = false;
		var dato = 0;
		if (this.checked) {
			for (var x = 0; x < matrizProduccion.length; x++) {
				for (var y = 0; y < ProduccionSeleccionados.length; y++) {
					if (ProduccionSeleccionados[y][0] == (matrizProduccion[x][29] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (!encontrado) {
					ProduccionSeleccionados.push([(matrizProduccion[x][29] * 1), (matrizProduccion[x][19] * 1), (matrizProduccion[x][18] * 1), (matrizProduccion[x][17] * 1), (matrizProduccion[x][16] * 1)]);
				} else {
					ProduccionSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}

			paginar(-1, "Produccion");
			//var rdnProduccion = document.getElementsByName("rdnProduccion");
			//for (var z = 0; z < rdnProduccion.length; z++) {
			//	rdnProduccion[z].checked = true;
			//}
			for (var x = 0; x < ProduccionSeleccionados.length; x++) {
				total = total + ProduccionSeleccionados[x][1];
			}
		}
		else {

			for (var x = 0; x < matrizProduccion.length; x++) {
				for (var y = 0; y < ProduccionSeleccionados.length; y++) {
					if (ProduccionSeleccionados[y][0] == (matrizProduccion[x][29] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (encontrado) {
					ProduccionSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}
			paginar(-1, "Produccion");
			//var rdnProduccion = document.getElementsByName("rdnProduccion");
			//for (var z = 0; z < rdnProduccion.length; z++) {
			//	rdnProduccion[z].checked = false;
			//}
			for (var x = 0; x < ProduccionSeleccionados.length; x++) {
				total = total + ProduccionSeleccionados[x][1];
			}
		}
		document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
		document.getElementById("spnContadorReg").innerHTML = ProduccionSeleccionados.length
	}

	var chkTodosB = document.getElementById("chkTodosB");
	chkTodosB.onclick = function () {
		//BonificacionSeleccionados = [];
		var total = 0;
		var encontrado = false;
		var dato = 0;
		if (this.checked) {
			for (var x = 0; x < matrizBonificacion.length; x++) {
				for (var y = 0; y < BonificacionSeleccionados.length; y++) {
					if (BonificacionSeleccionados[y][0] == (matrizBonificacion[x][14] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (!encontrado) {
					BonificacionSeleccionados.push([(matrizBonificacion[x][14] * 1), (matrizBonificacion[x][10] * 1), 0, (matrizBonificacion[x][9] * 1), (matrizBonificacion[x][8] * 1)]);
				} else {
					BonificacionSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}
			//for (var x = 0; x < matrizBonificacion.length; x++) {
			//	BonificacionSeleccionados.push([(matrizBonificacion[x][14] * 1), (matrizBonificacion[x][10] * 1), 0, (matrizBonificacion[x][9] * 1), (matrizBonificacion[x][8] * 1)]);
			//}
			paginar(-1, "Bonificacion");
			//var rdnBonificacion = document.getElementsByName("rdnBonificacion");
			//for (var z = 0; z < rdnBonificacion.length; z++) {
			//	rdnBonificacion[z].checked = true;
			//}
			for (var x = 0; x < BonificacionSeleccionados.length; x++) {
				total = total + BonificacionSeleccionados[x][4];
			}
		}
		else {
			for (var x = 0; x < matrizBonificacion.length; x++) {
				for (var y = 0; y < BonificacionSeleccionados.length; y++) {
					if (BonificacionSeleccionados[y][0] == (matrizBonificacion[x][14] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (encontrado) {
					BonificacionSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}
			paginar(-1, "Bonificacion");
			//var rdnBonificacion = document.getElementsByName("rdnBonificacion");
			//for (var z = 0; z < rdnBonificacion.length; z++) {
			//	rdnBonificacion[z].checked = false;
			//}
			for (var x = 0; x < BonificacionSeleccionados.length; x++) {
				total = total + BonificacionSeleccionados[x][4];
			}
		}

		document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
		document.getElementById("spnContadorReg").innerHTML = BonificacionSeleccionados.length
	}



	var chkTodosMF = document.getElementById("chkTodosMF");
	chkTodosMF.onclick = function () {
		//MontoFijoSeleccionados = [];
		var total = 0;
		var encontrado = false;
		var dato = 0;
		if (this.checked) {
			for (var x = 0; x < matrizMontoFijo.length; x++) {
				for (var y = 0; y < MontoFijoSeleccionados.length; y++) {
					if (MontoFijoSeleccionados[y][0] == (matrizMontoFijo[x][7] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (!encontrado) {
					MontoFijoSeleccionados.push([(matrizMontoFijo[x][7] * 1), (matrizMontoFijo[x][2] * 1), 0, 0, 0]);
				} else {
					MontoFijoSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}
			//for (var x = 0; x < matrizMontoFijo.length; x++) {
			//	MontoFijoSeleccionados.push([(matrizMontoFijo[x][7] * 1), (matrizMontoFijo[x][2] * 1), 0, 0, 0]);
			//}
			paginar(-1, "MontoFijo");
			//var rdnMontoFijo = document.getElementsByName("rdnMontoFijo");
			//for (var z = 0; z < rdnMontoFijo.length; z++) {
			//	rdnMontoFijo[z].checked = true;
			//}
			for (var x = 0; x < MontoFijoSeleccionados.length; x++) {
				total = total + MontoFijoSeleccionados[x][1];
			}
		}
		else {
			for (var x = 0; x < matrizMontoFijo.length; x++) {
				for (var y = 0; y < MontoFijoSeleccionados.length; y++) {
					if (MontoFijoSeleccionados[y][0] == (matrizMontoFijo[x][7] * 1)) {
						encontrado = true;
						dato = y;
						break;
					}
				}
				if (encontrado) {
					MontoFijoSeleccionados.splice(dato, 1);
				}
				encontrado = false;
			}
			paginar(-1, "MontoFijo");
			//var rdnMontoFijo = document.getElementsByName("rdnMontoFijo");
			//for (var z = 0; z < rdnMontoFijo.length; z++) {
			//	rdnMontoFijo[z].checked = false;
			//}
			for (var x = 0; x < MontoFijoSeleccionados.length; x++) {
				total = total + MontoFijoSeleccionados[x][1];
			}
		}
		document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
		document.getElementById("spnContadorReg").innerHTML = MontoFijoSeleccionados.length
	}

	btnConfirmar.onclick = function () {
		var tlProd = 0, tlBon = 0, tlMon = 0, tlpA = 0, tlpB = 0, tlpI = 0, tlmfA = 0, tlmfB = 0, tlmfI = 0, tlbA = 0, tlbB = 0, tlbI = 0, objTl;
		var cambios = false;
		if (BonificacionSeleccionados.length == 0 && ProduccionSeleccionados.length == 0 && MontoFijoSeleccionados.length == 0) {
			mostraralerta("Seleccione por lo menos un registro");
		} else {
			if (listaProduccion.length > 0) {
				if (ProduccionSeleccionados.length > 0) {
					objTl = obtenerTotales(0);
					tlProd = objTl.t;
					tlpA = objTl.a;
					tlpB = objTl.b;
					tlpI = objTl.i;
					cambios = true;
				}
			}
			if (listaBonificacion.length > 0) {
				if (BonificacionSeleccionados.length > 0) {
					objTl = obtenerTotales(1);
					tlBon = objTl.t;
					tlbA = objTl.a;
					tlbB = objTl.b;
					tlbI = objTl.i;
					cambios = true;
				}
			}
			if (listaMontoFijo.length > 0) {
				if (MontoFijoSeleccionados.length > 0) {
					objTl = obtenerTotales(2);
					tlMon = objTl.t;
					tlmfI = objTl.t;
					var dato = objTl.t;
					cambios = true;
				}
			}
			if (cambios) {
				var pos2 = buscarMedico(posReg);
				var objIds = obtenerIdDetalle();
				if (pos2 > -1) {
					objetoEdicionPlanilla[matrizMedico[pos2][7] + "-" + matrizMedico[pos2][8]] = {
						"a": (tlProd + tlBon + tlMon),
						"b": (tlpA + tlbA + tlmfA),
						"c": (tlpB + tlbB + tlmfB),
						"d": (tlpI + tlbI + tlmfI)
					};

					matrizMedico[pos2][6] = (tlProd + tlBon + tlMon);//t
					matrizMedico[pos2][5] = (tlpA + tlbA + tlmfA);//a
					matrizMedico[pos2][4] = (tlpB + tlbB + tlmfB);//b
					matrizMedico[pos2][2] = (tlpI + tlbI + tlmfI);//t

					matrizBusquedaMedico[pos2][6] = (tlProd + tlBon + tlMon);//t
					matrizBusquedaMedico[pos2][5] = (tlpA + tlbA + tlmfA);//a
					matrizBusquedaMedico[pos2][4] = (tlpB + tlbB + tlmfB);//b
					matrizBusquedaMedico[pos2][2] = (tlpI + tlbI + tlmfI);//t



					for (var u = 0; u < MedicosSeleccionados.length; u++) {
						if (MedicosSeleccionados[u][0] == matrizMedico[pos2][7] && MedicosSeleccionados[u][2] == matrizMedico[pos2][8]) {
							MedicosSeleccionados[u][3] = objIds.p;
							MedicosSeleccionados[u][4] = objIds.b;
							MedicosSeleccionados[u][5] = objIds.m;
							MedicosSeleccionados[u][7] = (tlProd + tlBon + tlMon);
							if (MedicosSeleccionados[u][7].toFixed(2) == MedicosSeleccionados[u][6].toFixed(2)) {
								matrizMedico[pos2][10] = false;
								MedicosSeleccionados[u][3] = "";
								MedicosSeleccionados[u][4] = "";
								MedicosSeleccionados[u][5] = "";
								MedicosSeleccionados[u][8] = "";
							}
							else {
								matrizMedico[pos2][10] = true;
								MedicosSeleccionados[u][8] = objIds.p + "¬" + objIds.b + "¬" + objIds.m;
							}
							break;
						}
					}

					//MedicosSeleccionados[medicoEnMatriz][3] = objIds.p;
					//MedicosSeleccionados[medicoEnMatriz][4] = objIds.b;
					//MedicosSeleccionados[medicoEnMatriz][5] = objIds.m;
					//MedicosSeleccionados[medicoEnMatriz][7] = (tlProd + tlBon + tlMon);

					//if (MedicosSeleccionados[medicoEnMatriz][7].toFixed(2) == MedicosSeleccionados[medicoEnMatriz][6].toFixed(2)) {
					//	matrizMedico[pos2][10] = false;
					//	MedicosSeleccionados[medicoEnMatriz][3] = "";
					//	MedicosSeleccionados[medicoEnMatriz][4] = "";
					//	MedicosSeleccionados[medicoEnMatriz][5] = "";
					//	MedicosSeleccionados[medicoEnMatriz][8] = "";
					//}
					//else {
					//	matrizMedico[pos2][10] = true;
					//	MedicosSeleccionados[medicoEnMatriz][8] = objIds.p + "¬" + objIds.b + "¬" + objIds.m;
					//}
				}
			}
			var TotalMostrar = 0;
			for (var x = 0; x < MedicosSeleccionados.length; x++) {
				if (MedicosSeleccionados[x][9] == true) {
					TotalMostrar = TotalMostrar + MedicosSeleccionados[x][7] * 1;
				}
			}
			var spnTotalMedico = document.getElementById("spnTotalMedico");
			spnTotalMedico.innerHTML = formatearNumero(TotalMostrar);
			mostrarMatriz(indiceActualPaginaM, "Medico");
			abrirPopup('PopupDetalle');
		}
	}

	var btnPlanillaExcel = document.getElementById("btnPlanillaExcel");
	btnPlanillaExcel.onclick = function () {
		var gifLoad = document.getElementById("gifLoad3");
		gifLoad.style.display = "none";
		var txtDescripcionGrabar = document.getElementById("txtDescripcionGrabar");
		limpiarPoppupCrearPlanilla();
		//txtDescripcionGrabar.value = "";
		txtDescripcionGrabar.className = "";
		var anio = document.getElementById("cboMesGrabar");
		anio.selectedIndex = "0";
		document.getElementById("GrabarExcel").style.display = "";
		document.getElementById("fupArchivo").value = "";
		document.getElementById("fupArchivo").style.display = "";
		document.getElementById("spnUpExc").style.display = "none";
		document.getElementById("divTotalPlanillaExcel").style.display = "none";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
		var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
		cboTipoPlanilla.selectedIndex = "0";
		cboTipoPlanilla.className = "";
		cboTipoPlanilla.disabled = false;
		var hdfActiv = document.getElementById("hdfActiv").value;
		if (hdfActiv == "true") {
			var combo = document.getElementById("cboMesGrabar");
			var opcion;
			var encontrado = false;
			var valorcombo;
			for (var x = 0; x < combo.length; x++) {
				opcion = combo.options[x].text;
				if (opcion == (AnioIni + "-" + MesIni)) {
					encontrado = true;
					valorcombo = combo.options[x].value;
					break;
				}
			}
			if (encontrado) {
				combo.value = valorcombo;
				combo.disabled = true;
				var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
				btnConfirmarGrabar.style.display = "";
			}
			else {
				combo.innerHTML = "<option>Aperturar Periodo Actual</option>";
				combo.disabled = true;
				combo.selectedIndex = "0";
				var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
				btnConfirmarGrabar.style.display = "none";
			}
			if (combo.className.indexOf("lectura")<0) {
				combo.classList.add("lectura");
			}
		} else {
			var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
			btnConfirmarGrabar.style.display = "";
		}
		abrirPopup("PopupGrabar");
		opcionCarga = 1;

	}

	var btnGrabar = document.getElementById("btnGrabar");
	var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
	btnGrabar.onclick = btnConfirmarGrabar.onclick = function () {
		if (MedicosSeleccionados.length > 0 || opcionCarga == 1) {
			var txtDescripcionGrabar = document.getElementById("txtDescripcionGrabar");
			if (this.id == "btnGrabar") {
				var mt = document.getElementById("spnTotalMedico").innerHTML.trim().replace(/,/g, "") * 1;
				if (mt < 0) {
					mostraralerta("No puede generar una planilla en Negativo");
					return false;
				}

				var hdfIframe = document.getElementById("hdfIframe").value;
				var hdfIdPlanilla = document.getElementById("hdfIdPlanilla").value;
				
				if (hdfIframe == "0") {

					limpiarCabeceras(false);
					document.getElementsByName("cabeceraMedico")[1].onchange();
					//txtDescripcionGrabar.value = "";
					limpiarPoppupCrearPlanilla();
					txtDescripcionGrabar.className = "";
					document.getElementById("fupArchivo").style.display = "none";
					document.getElementById("GrabarExcel").style.display = "none";
					document.getElementById("spnUpExc").style.display = "none";
					document.getElementById("divTotalPlanillaExcel").style.display = "none";
					opcionCarga = 2;
					var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
					cboTipoPlanilla.selectedIndex = "0";
					cboTipoPlanilla.className = "lectura";
					cboTipoPlanilla.disabled = true;

					var hdfActiv = document.getElementById("hdfActiv").value;
					if (hdfActiv == "true") {
						var combo = document.getElementById("cboMesGrabar");
						var opcion;
						var encontrado = false;
						var valorcombo;
						for (var x = 0; x < combo.length; x++) {
							opcion = combo.options[x].text;
							if (opcion == (AnioIni + "-" + MesIni)) {
								encontrado = true;
								valorcombo = combo.options[x].value;
								break;
							}
						}
						if (encontrado) {
							combo.value = valorcombo;
							combo.disabled = true;
							var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
							btnConfirmarGrabar.style.display = "";
						}
						else {
							combo.innerHTML = "<option>Aperturar Periodo Actual</option>";
							combo.selectedIndex = "0";
							combo.disabled = true;
							var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
							btnConfirmarGrabar.style.display = "none";
						}
						if (combo.className.indexOf("lectura") < 0) {
							combo.classList.add("lectura");
						}
					} else {
						var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
						btnConfirmarGrabar.style.display = "";
					}
					abrirPopup("PopupGrabar");
				} else {
					var obj = obtenerListaGrabar();
					var chkIndDescuento = document.getElementById("chkIndDescuento").checked.toString();
					srt = obj.p + "¯" + obj.d + "¯" + txtDescripcionGrabar.value + "¯" + (hdfIframe == "1" ? "E" : "A") + "¯" + hdfIdPlanilla + "¯" + chkIndDescuento;
					url = urlBase + "Proceso/grabarPlanilla/?ss=" + ss + "&anio=0&su=" + sucursalId;
                    $.ajax(url, "post", mostrarRpta, srt);                    
                    document.getElementById("btnConfirmarGrabar").onclick = null;
                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                    //document.getElementById("btnConfirmarGrabar").style.cursor='wait'
					//this.onclick = null;
				}
			} else {
				var anio = document.getElementById("cboMesGrabar");
				if (anio.value == "" || txtDescripcionGrabar.value == "") {
					if (anio.value == "") {
						anio.className += " error";
					}
					else {
						anio.className = anio.className.split("error").join("");
					}
					if (txtDescripcionGrabar.value == "") {
						txtDescripcionGrabar.className += " error";
					}
					else {
						txtDescripcionGrabar.className = txtDescripcionGrabar.className.split("error").join("");
					}
				} else {
					anio.className = anio.className.split("error").join("");
					txtDescripcionGrabar.className = txtDescripcionGrabar.className.split("error").join("");
					var url;
					if (opcionCarga == 2) {
						var obj = obtenerListaGrabar();
						var hdfIframe = document.getElementById("hdfIframe").value;
						var hdfIdPlanilla = document.getElementById("hdfIdPlanilla").value;
						var chkIndDescuento = document.getElementById("chkIndDescuento").checked.toString();
						srt = obj.p + "¯" + obj.d + "¯" + txtDescripcionGrabar.value + "¯" + (hdfIframe == "1" ? "E" : "A") + "¯" + (hdfIframe == "0" ? "0" : hdfIdPlanilla) + "¯" + chkIndDescuento;
						url = urlBase + "Proceso/grabarPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId;
						$.ajax(url, "post", mostrarRpta, srt);

                        document.getElementById("btnGrabar").disabled = true;
                        
                        document.getElementById("btnConfirmarGrabar").onclick = null;
                        
                        
						var spnCerrar = document.getElementById("spnCerrar");
						var spnCancelar = document.getElementById("spnCancelar");
                        spnCancelar.onclick = spnCerrar.onclick = null;
                        
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					}
					else {
						if (matrizValidados.length > 0) {
							var valorTotal = document.getElementById("spnTotalPlanillaExcel").innerHTML * 1;
							if (valorTotal < 0) {
								mostraralerta("No puede generar una planilla en Negativo");
							} else {
								str = listaValidados + "¯" + txtDescripcionGrabar.value;
								url = urlBase + "Proceso/grabarCargaPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId + "&tipo=" + document.getElementById("cboTipoPlanilla").value;
								$.ajax(url, "post", mostrarRpta, str);
								//doc.getElementById("btnGrabar").disabled = true;
								var spnCerrar = document.getElementById("spnCerrar");
								var spnCancelar = document.getElementById("spnCancelar");
                                spnCancelar.onclick = spnCerrar.onclick = null;
                                document.getElementById("btnConfirmarGrabar").onclick = null;
                                
								this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							}
						}
						else {
							mostraralerta("No hay una carga valida");
						}
					}
					//this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					//this.onclick = null;

				}

			}
		} else {
			mostraralerta("Seleccione por lo menos un médico");
		}
	}

	var fup = document.getElementById("fupArchivo");
	fup.onclick = function () {
		this.value = "";
		document.getElementById("spnUpExc").style.display = "none";
		document.getElementById("divTotalPlanillaExcel").style.display = "none";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
	}
	fup.onchange = function () {
		if (this.value != "") {
			var gifLoad = document.getElementById("gifLoad3");
			gifLoad.style.display = "";
			if (this.files[0].name.indexOf("xls") > -1) {
				var file = this.files[0];
				var reader = new FileReader();
				reader.onerror = mostrarError;
				reader.onloadend = mostrarArchivo;
				reader.readAsBinaryString(file);
			}
			else {
				mostraralerta("El archivo tiene que ser Excel");
				this.value = "";
				crearMatriz2("divValidados", "");
				crearMatriz2("divErrados", "");
			}
			document.getElementById("spnUpExc").style.display = "none";
			document.getElementById("divTotalPlanillaExcel").style.display = "none";
		}
		else {
			this.value = "";
			crearMatriz2("divValidados", "");
			crearMatriz2("divErrados", "");
			document.getElementById("spnUpExc").style.display = "none";
			document.getElementById("divTotalPlanillaExcel").style.display = "none";
		}
	};

	var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
	cboTipoPlanilla.onchange = function () {
		document.getElementById("fupArchivo").value = "";
		document.getElementById("spnUpExc").style.display = "none";
		document.getElementById("divTotalPlanillaExcel").style.display = "none";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
	}

	var btnCancelar = document.getElementById("btnCancelar");
	btnCancelar.onclick = function () {
		var seg = document.getElementById("hdfIdSeg").value;
		window.location.href = urlBase + "Proceso/ProcesoPlanillaLista/?ss=" + ss + "&id=" + seg;
	}

	var btnExportarDetalle = document.getElementById("btnExportarDetalle");
	btnExportarDetalle.onclick = function () {
		if (matrizFiltroProduccion.length > 0 || matrizFiltroBonificacion.length > 0 || matrizFiltroMontoFijo.length > 0) {
			exportarDetallePlanilla();
		}

	}

	var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
	ddlIndicadorOAVisible.onchange = function () {
		//filtrar("Periodo");
		var tbPeriodo = document.getElementById("tbPeriodo");
		tbPeriodo.innerHTML = "<tr class='FilaDatos'><td style='text-align:center' colspan='6'>Cargando Registros</td></tr>";
		var tdPaginasPeriodo = document.getElementById("tdPaginasPeriodo");
		tdPaginasPeriodo.innerHTML = "";
		var valorindoaM=2;
		switch (this.value) {
			case "True":
				valorindoaM = 1;
				break;
			case "False":
				valorindoaM = 2;
				break;
			default:
				valorindoaM = 3;
				break;
		}
		var url = urlBase + "Proceso/obtenerListas/?ss=" + ss + "&su=" + sucursalId + "&indoa=" + valorindoaM;
		$.ajax(url, "get", listarTodo);
		PeriodosSeleccionados = [], MedicosSeleccionados = [], ProduccionSeleccionados = [], BonificacionSeleccionados = [],
	indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0;
		indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0;
		matrizPeriodo = [], matrizMedico = [], matrizMedicoFiltro = [], matrizProduccion, matrizBonificacion = [];
		mostrarMatriz(0, "Medico");
		document.getElementById("spnTotalMedico").innerHTML = "0.00";
		document.getElementById("chkTodosM").checked = true;
		document.getElementById("chkTodosM").click();
		document.getElementById("chkTodos").checked = false;
		if (this.value != "False") {
			document.getElementById("btnGrabar").style.display = "none";
			document.getElementById("btnPlanillaExcel").style.display = "none";
		}
		else {
			document.getElementById("btnGrabar").style.display = "";
			document.getElementById("btnPlanillaExcel").style.display = "";
		}
	}
}

function descargaExcelXLSx(rpta) {
	if (rpta != null) {
		var nombre = "Formato de Planillas.xlsx";

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
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoMedico");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			matrizMedico = [];
			//MedicosSeleccionados = [];
			matrizBusquedaMedico = [];
			mostrarMedicosPeriodo();
			filtrar("Medico");
			document.getElementById("chkTodosM").checked = true;
			//document.getElementById("chkTodosM").click();

		}

	}


	var cboMedico = document.getElementsByClassName("cboMedico");
	var nComboMedico = cboMedico.length, texto;
	for (var i = 0; i < nComboMedico; i++) {
		texto = cboMedico[i];
		texto.onchange = function (e) {
			matrizMedico = [];
			//MedicosSeleccionados = [];
			matrizBusquedaMedico = [];
			mostrarMedicosPeriodo();
			filtrar("Medico");
			document.getElementById("chkTodosM").checked = true;
			//document.getElementById("chkTodosM").click();

		}
	}

	var textos = document.getElementsByClassName("TextoPeriodo");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			PeriodosSeleccionados = [];
			matrizMedico = [];
			MedicosSeleccionados = [];
			matrizBusquedaMedico = [];
			filtrar("Periodo");
			document.getElementById("chkTodos").checked = true;
			document.getElementById("chkTodos").click();
			//document.getElementById("btnGrabar").style.display = "none";
			var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
			if (ddlIndicadorOAVisible.value != "False") {
				document.getElementById("btnGrabar").style.display = "none";
				document.getElementById("btnPlanillaExcel").style.display = "none";
			}
			else {
				document.getElementById("btnGrabar").style.display = "";
				document.getElementById("btnPlanillaExcel").style.display = "";
			}
		}

	}


	var cboPeriodo = document.getElementsByClassName("cboPeriodo");
	var nComboPeriodo = cboPeriodo.length, texto;
	for (var i = 0; i < nComboPeriodo; i++) {
		texto = cboPeriodo[i];
		texto.onchange = function (e) {
			PeriodosSeleccionados = [];
			matrizMedico = [];
			MedicosSeleccionados = [];
			matrizBusquedaMedico = [];
			filtrar("Periodo");
			document.getElementById("chkTodos").checked = true;
			document.getElementById("chkTodos").click();
			//document.getElementById("btnGrabar").style.display = "none";
			var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
			if (ddlIndicadorOAVisible.value != "False") {
				document.getElementById("btnGrabar").style.display = "none";
				document.getElementById("btnPlanillaExcel").style.display = "none";
			}
			else {
				document.getElementById("btnGrabar").style.display = "";
				document.getElementById("btnPlanillaExcel").style.display = "";
			}
		}
	}

	var textos = document.getElementsByClassName("TextoProduccion");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			document.getElementById("chkTodosP").checked = false;
			filtrar("Produccion");
		}

	}

	var textos = document.getElementsByClassName("TextoBonificacion");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			document.getElementById("chkTodosB").checked = false;
			filtrar("Bonificacion");
		}

	}

	var textos = document.getElementsByClassName("TextoMontoFijo");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			document.getElementById("chkTodosMF").checked = false;
			filtrar("MontoFijo");
		}

	}
}


function limpiarCabeceras(opcion) {
	if (opcion) {
		var TextoProduccion = document.getElementsByClassName("TextoProduccion");
		for (var x = 0; x < TextoProduccion.length; x++) {
			TextoProduccion[x].value = "";
		}
		var TextoBonificacion = document.getElementsByClassName("TextoBonificacion");
		for (var x = 0; x < TextoBonificacion.length; x++) {
			TextoBonificacion[x].value = "";
		}
		var TextoMontoFijo = document.getElementsByClassName("TextoMontoFijo");
		for (var x = 0; x < TextoMontoFijo.length; x++) {
			TextoMontoFijo[x].value = "";
		}
	} else {
		var cabeceraMedico = document.getElementsByName("cabeceraMedico");
		for (var x = 0; x < cabeceraMedico.length; x++) {
			cabeceraMedico[x].value = "";
		}
	}
}

function buscarMedico(id) {
	var pos = -1, n = matrizMedico.length, reg;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = matrizMedico[i];
			if (reg[7] == id && reg[8] == posTipoAdmin) {
				pos = i;
				break;
			}
		}
	}
	return pos;
}

function obtenerTotales(t) {
	var n, mt = 0, mtA = 0, mtB = 0, mtI = 0, mtMF = 0, reg;
	if (t == 0) {
		n = ProduccionSeleccionados.length;
	} else if (t == 1) {
		n = BonificacionSeleccionados.length;
	} else if (t == 2) {
		n = MontoFijoSeleccionados.length;
	}
	if (n > 0) {
		for (var k = 0; k < n; k++) {
			if (t == 0) {
				reg = ProduccionSeleccionados[k];
			} else if (t == 1) {
				reg = BonificacionSeleccionados[k];
			}
			else if (t == 2) {
				reg = MontoFijoSeleccionados[k];
			}
			mt += reg[1];
			mtA += (reg[2] != "" ? reg[2] : 0);
			mtB += reg[3];
			mtI += reg[4];
			mtMF += reg[1];
		}
	}
	return { t: mt, a: mtA, b: mtB, i: mtI, f: mtMF };
}

function obtenerIdDetalle() {
	var cnt = "", cntP = "", cntB = "", cntMF = "", n, reg;
	n = ProduccionSeleccionados.length;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = ProduccionSeleccionados[i];
			cnt += reg[0] + "¦";
			cntP += reg[0] + "¦";
		}
	}
	n = BonificacionSeleccionados.length;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = BonificacionSeleccionados[i];
			cnt += reg[0] + "¦";
			cntB += reg[0] + "¦";
		}
	}
	n = MontoFijoSeleccionados.length;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = MontoFijoSeleccionados[i];
			cnt += reg[0] + "¦";
			cntMF += reg[0] + "¦";
		}
	}
	cnt = cnt.substring(0, cnt.length - 1);
	cntP = cntP.substring(0, cntP.length - 1);
	cntB = cntB.substring(0, cntB.length - 1);
	cntMF = cntMF.substring(0, cntMF.length - 1);
	return { g: cnt, p: cntP, b: cntB, m: cntMF };
}

function EncontrarDetalle(indice) {
	var ddlIndicadorOAVisible = document.getElementById("ddlIndicadorOAVisible");
	if (ddlIndicadorOAVisible.value == "False") {
		document.getElementById("btnConfirmar").parentNode.style.display = "";
	} else {
		document.getElementById("btnConfirmar").parentNode.style.display = "none";
	}
	var matriz = matrizMedico[indice];
	var procesos = matriz[9].split("|");
	var contenido = "";
	for (var x = 0; x < procesos.length; x++) {
		contenido += procesos[x] + "¦" + matriz[7] + "¦" + matriz[8];
		if (x < (procesos.length - 1)) {
			contenido += "¬";
		}
	}
	indiceActualPaginaP = 0;
	indiceActualPaginaB = 0;
	indiceActualPaginaMF = 0;
	indiceActualBloqueP = 0;
	indiceActualBloqueB = 0;
	indiceActualBloqueMF = 0;
	document.getElementById("spnMtoDetalle").innerHTML = "0.00";
	document.getElementById("spnContadorReg").innerHTML = "0";
	document.getElementById("tbProduccion").innerHTML = "";
	document.getElementById("tbBonificacion").innerHTML = "";
	document.getElementById("gifLoad").style.display = "initial";
	var ddlIndicadorOAVisible=document.getElementById("ddlIndicadorOAVisible").value;
	var valorCombo;
	switch(ddlIndicadorOAVisible){
		case "True":
			valorCombo=1;
			break;
		case "False":
			valorCombo=2;
			break;
		default:
			valorCombo=3;
			break;
	}
	var url = urlBase + "Proceso/obtenerPlanillaDetallelistas/?ss=" + ss + "&su=" + sucursalId + "&indNoOA=" + valorCombo;
	$.ajax(url, "post", mostrarDetalle, contenido);
	limpiarCabeceras(true);
	abrirPopup("PopupDetalle");
	posReg = matriz[7] * 1;
	posTipoAdmin = matriz[8] * 1;	
}

function mostrarDetalle(r) {
	mtProd = 0;
	mtBon = 0;
	ProduccionSeleccionados = [], BonificacionSeleccionados = [], MontoFijoSeleccionados = [];
	matrizProduccion = [], matrizBonificacion = [], matrizMontoFijo = [];
	matrizFiltroProduccion = [], matrizFiltroBonificacion = [], matrizFiltroMontoFijo = [];
	mtProd = 0, mtBon = 0, mtMon = 0;
	document.getElementById("gifLoad").style.display = "none";
	if (r != "") {
		var data = r.split("¬");
		listaProduccion = data[0] != "" ? (data[0].split("¯")) : [];
		listaBonificacion = data[1] != "" ? (data[1].split("¯")) : [];
		listaMontoFijo = data[2] != "" ? (data[2].split("¯")) : [];
		var posMedico = buscarProceso(posReg, 3);
		var datosModificados = MedicosSeleccionados[posMedico][8];
		if (datosModificados != "") {
			var datosTipoAdmision = MedicosSeleccionados[posMedico][8].split("¬");
		}

		if (listaProduccion.length > 0) {
			crearMatriz("Produccion");

			document.getElementById("chkTodosP").checked = true;
			SeleccionarChecks(2, true);

			if (datosModificados != "") {
				if (datosTipoAdmision[0] != "") {
					var ids = datosTipoAdmision[0].split("¦"), n = ids.length, np = ProduccionSeleccionados.length, reg, exito = false;

					for (var i = np; i--;) {
						reg = ProduccionSeleccionados[i];
						for (var j = 0; j < n; j++) {
							if (reg[0] == (ids[j] * 1)) {
								exito = true;
								break;
							}
						}
						if (!exito) {
							ProduccionSeleccionados.splice(i, 1);
						} else {
							exito = false;
						}

					}
				}
			}

			indiceActualBloqueP = 0;
			mostrarMatriz(0, "Produccion");
			document.getElementById("tab1").className = "tab-link";
		} else {
			ProduccionSeleccionados = [];
			document.getElementById("tbProduccion").innerHTML = "";
			document.getElementById("tab1").className = "tab-link bloqueado";
		}
		if (listaBonificacion.length > 0) {
			crearMatriz("Bonificacion");

			document.getElementById("chkTodosB").checked = true;
			SeleccionarChecks(3, true);

			if (datosModificados != "") {
				if (datosTipoAdmision[1] != "") {
					var ids = datosTipoAdmision[1].split("¦"), n = ids.length, np = BonificacionSeleccionados.length, reg, exito = false;

					for (var i = np; i--;) {
						reg = BonificacionSeleccionados[i];
						for (var j = 0; j < n; j++) {
							if (reg[0] == (ids[j] * 1)) {
								exito = true;
								break;
							}
						}
						if (!exito) {
							BonificacionSeleccionados.splice(i, 1);
						} else {
							exito = false;
						}
					}
				}
			}
			indiceActualBloqueB = 0;
			mostrarMatriz(0, "Bonificacion");
			document.getElementById("tab2").className = "tab-link";
		} else {
			BonificacionSeleccionados = [];
			document.getElementById("tbBonificacion").innerHTML = "";
			document.getElementById("tab2").className = "tab-link bloqueado";
		}
		if (listaMontoFijo.length > 0) {
			crearMatriz("MontoFijo");

			document.getElementById("chkTodosMF").checked = true;
			SeleccionarChecks(4, true);

			if (datosModificados != "") {
				if (datosTipoAdmision[2] != "") {
					var ids = datosTipoAdmision[2].split("¦"), n = ids.length, np = MontoFijoSeleccionados.length, reg, exito = false;

					for (var i = np; i--;) {
						reg = MontoFijoSeleccionados[i];
						for (var j = 0; j < n; j++) {
							if (reg[0] == (ids[j] * 1)) {
								exito = true;
								break;
							}
						}
						if (!exito) {
							MontoFijoSeleccionados.splice(i, 1);
						} else {
							exito = false;
						}
					}
				}
			}
			indiceActualBloqueMF = 0;
			mostrarMatriz(0, "MontoFijo");
			document.getElementById("tab3").className = "tab-link";
		} else {
			MontoFijoSeleccionados = [];
			document.getElementById("tbMontoFijo").innerHTML = "";
			document.getElementById("tab3").className = "tab-link bloqueado";
		}
		var total = 0;
		var ContadorActual = 0;
		if (listaProduccion.length > 0) {
			document.getElementById("tab1").onclick();
			for (var x = 0; x < ProduccionSeleccionados.length; x++) {
				total = total + ProduccionSeleccionados[x][1];
			}
			ContadorActual = ProduccionSeleccionados.length;
		}
		else if (listaBonificacion.length > 0) {
			document.getElementById("tab2").onclick();
			for (var x = 0; x < BonificacionSeleccionados.length; x++) {
				total = total + BonificacionSeleccionados[x][4];
			}
			ContadorActual = BonificacionSeleccionados.length;
		}
		else if (listaMontoFijo.length > 0) {
			document.getElementById("tab3").onclick();
			for (var x = 0; x < MontoFijoSeleccionados.length; x++) {
				total = total + MontoFijoSeleccionados[x][1];
			}
			ContadorActual = MontoFijoSeleccionados.length;
		}
		//document.getElementById("spnMtoDetalle").innerHTML = formatearNumero((mtProd + mtBon + mtMon));
		document.getElementById("spnMtoDetalle").innerHTML = formatearNumero(total);
		document.getElementById("spnContadorReg").innerHTML = ContadorActual;
	}
}


function SeleccionarChecks(t, c) {
	var n, reg;
	switch (t) {
		case 0:
			if (c) {
				n = matrizPeriodo.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizPeriodo[i];
						PeriodosSeleccionados.push([reg[0], reg[5]]);
					}
				}
			} else {
				PeriodosSeleccionados = [];
			}
			break;
		case 1:
			if (c) {
				n = matrizMedicoFiltro.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizMedicoFiltro[i];
						MedicosSeleccionados.push([reg[7], "", reg[9], "", "", "", reg[8]]);
					}
				}
			} else {
				MedicosSeleccionados = [];
			}
			break;
		case 2:
			if (c) {
				n = matrizProduccion.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizProduccion[i];
						ProduccionSeleccionados.push([reg[29], reg[19], reg[18], reg[17], reg[16]]);
					}
				}
			} else {
				ProduccionSeleccionados = [];
			}
			break;
		case 3:
			if (c) {
				n = matrizBonificacion.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizBonificacion[i];
						BonificacionSeleccionados.push([reg[14], reg[10], 0, reg[9], reg[8]]);
					}
				}
			} else {
				BonificacionSeleccionados = [];
			}
			break;
		case 4:
			if (c) {
				n = matrizMontoFijo.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizMontoFijo[i];
						MontoFijoSeleccionados.push([reg[7], reg[2], 0, 0, 0]);
					}
				}
			} else {
				MontoFijoSeleccionados = [];
			}
			break;
	}

}

function obtenerListaGrabar() {
	//var matriz = MedicosSeleccionados();
	//MedicosSeleccionados = [];
	//MedicosSeleccionados = matriz.slice(0);
	var n = MedicosSeleccionados.length, reg, cnt = "", cnt1 = "";
	if (n > 0) {
		var proceso, nproceso;
		for (var i = 0; i < n; i++) {
			reg = MedicosSeleccionados[i];
			if (reg[9] == true) {
				if (reg[3] == "" && reg[4] == "" && reg[5] == "") {
					proceso = reg[1].split("|");
					nproceso = proceso.length;
					for (var j = 0; j < nproceso; j++) {
						for (var x = 0; x < matrizMedico.length; x++) {
							if (matrizMedico[x][7] == (reg[0]) && matrizMedico[x][8] == (reg[2])) {
								cnt += proceso[j] + "¦" + reg[0];
								cnt += "¦" + matrizMedico[x][8] + "¦" + matrizMedico[x][6];
								cnt += "¬";
								break;
							}
						}

					}
				} else {
					proceso = reg[1].split("|");
					nproceso = proceso.length;
					for (var j = 0; j < nproceso; j++) {
						for (var x = 0; x < matrizMedico.length; x++) {
							if (matrizMedico[x][7] == (reg[0]) && matrizMedico[x][8] == (reg[2]) && matrizMedico[x][8] == false) {
								cnt += proceso[j] + "¦" + reg[0];
								cnt += "¦" + matrizMedico[x][8] + "¦" + matrizMedico[x][6];
								cnt += "¬";
								break;
							}
						}

					}
					if (reg[3] != "") {
						proceso = reg[3].split("¦");
						nproceso = proceso.length;
						for (var j = 0; j < nproceso; j++) {
							cnt1 += reg[0] + "¦P¦" + proceso[j] + "¬";
						}
					}
					if (reg[4] != "") {
						proceso = reg[4].split("¦");
						nproceso = proceso.length;
						for (var j = 0; j < nproceso; j++) {
							cnt1 += reg[0] + "¦H¦" + proceso[j] + "¬";
						}
					}
					if (reg[5] != "") {
						proceso = reg[5].split("¦");
						nproceso = proceso.length;
						for (var j = 0; j < nproceso; j++) {
							cnt1 += reg[0] + "¦M¦" + proceso[j] + "¬";
						}
					}
				}
			}
		}
	}
	cnt = cnt.substring(0, cnt.length - 1);
	cnt1 = cnt1.substring(0, cnt1.length - 1);
	return { p: cnt, d: cnt1 };
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

function mostrarRpta(r) {
	var hdfIframe = document.getElementById("hdfIframe").value;
	if (hdfIframe == "0") {
		abrirPopup("PopupGrabar");
		var btnGrabar = document.getElementById("btnGrabar");
		btnGrabar.disabled = false;
        var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
        btnGrabar.onclick = btnConfirmarGrabar.onclick = function () {
            if (MedicosSeleccionados.length > 0 || opcionCarga == 1) {
                var txtDescripcionGrabar = document.getElementById("txtDescripcionGrabar");
                if (this.id == "btnGrabar") {
                    var mt = document.getElementById("spnTotalMedico").innerHTML.trim().replace(/,/g, "") * 1;
                    if (mt < 0) {
                        mostraralerta("No puede generar una planilla en Negativo");
                        return false;
                    }

                    var hdfIframe = document.getElementById("hdfIframe").value;
					var hdfIdPlanilla = document.getElementById("hdfIdPlanilla").value;
					
                    if (hdfIframe == "0") {

                        limpiarCabeceras(false);
						document.getElementsByName("cabeceraMedico")[1].onchange();
						limpiarPoppupCrearPlanilla();
                        //txtDescripcionGrabar.value = "";
                        txtDescripcionGrabar.className = "";
                        document.getElementById("fupArchivo").style.display = "none";
                        document.getElementById("GrabarExcel").style.display = "none";
                        document.getElementById("spnUpExc").style.display = "none";
                        document.getElementById("divTotalPlanillaExcel").style.display = "none";
                        opcionCarga = 2;
                        var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
                        cboTipoPlanilla.selectedIndex = "0";
                        cboTipoPlanilla.className = "lectura";
                        cboTipoPlanilla.disabled = true;

                        var hdfActiv = document.getElementById("hdfActiv").value;
                        if (hdfActiv == "true") {
                            var combo = document.getElementById("cboMesGrabar");
                            var opcion;
                            var encontrado = false;
                            var valorcombo;
                            for (var x = 0; x < combo.length; x++) {
                                opcion = combo.options[x].text;
                                if (opcion == (AnioIni + "-" + MesIni)) {
                                    encontrado = true;
                                    valorcombo = combo.options[x].value;
                                    break;
                                }
                            }
                            if (encontrado) {
                                combo.value = valorcombo;
                                combo.disabled = true;
                                var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
                                btnConfirmarGrabar.style.display = "";
                            }
                            else {
                                combo.innerHTML = "<option>Aperturar Periodo Actual</option>";
                                combo.selectedIndex = "0";
                                combo.disabled = true;
                                var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
                                btnConfirmarGrabar.style.display = "none";
                            }
                            if (combo.className.indexOf("lectura") < 0) {
                                combo.classList.add("lectura");
                            }
                        } else {
                            var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
                            btnConfirmarGrabar.style.display = "";
                        }
                        abrirPopup("PopupGrabar");
                    } else {
						var obj = obtenerListaGrabar();
						var chkIndDescuento = document.getElementById("chkIndDescuento").checked.toString();
						srt = obj.p + "¯" + obj.d + "¯" + txtDescripcionGrabar.value + "¯" + (hdfIframe == "1" ? "E" : "A") + "¯" + hdfIdPlanilla + "¯" + chkIndDescuento;
                        url = urlBase + "Proceso/grabarPlanilla/?ss=" + ss + "&anio=0&su=" + sucursalId;
                        $.ajax(url, "post", mostrarRpta, srt);
                        document.getElementById("btnConfirmarGrabar").onclick = null;
                        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                        this.onclick = null;
                    }
                } else {
                    var anio = document.getElementById("cboMesGrabar");
                    if (anio.value == "" || txtDescripcionGrabar.value == "") {
                        if (anio.value == "") {
                            anio.className += " error";
                        }
                        else {
                            anio.className = anio.className.split("error").join("");
                        }
                        if (txtDescripcionGrabar.value == "") {
                            txtDescripcionGrabar.className += " error";
                        }
                        else {
                            txtDescripcionGrabar.className = txtDescripcionGrabar.className.split("error").join("");
                        }
                    } else {
                        anio.className = anio.className.split("error").join("");
                        txtDescripcionGrabar.className = txtDescripcionGrabar.className.split("error").join("");
                        var url;
                        if (opcionCarga == 2) {
                            var obj = obtenerListaGrabar();
                            var hdfIframe = document.getElementById("hdfIframe").value;
                            var hdfIdPlanilla = document.getElementById("hdfIdPlanilla").value;
							var chkIndDescuento = document.getElementById("chkIndDescuento").checked.toString();
							srt = obj.p + "¯" + obj.d + "¯" + txtDescripcionGrabar.value + "¯" + (hdfIframe == "1" ? "E" : "A") + "¯" + (hdfIframe == "0" ? "0" : hdfIdPlanilla) + "¯" + chkIndDescuento;
                            url = urlBase + "Proceso/grabarPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId;
                            $.ajax(url, "post", mostrarRpta, srt);

                            document.getElementById("btnGrabar").disabled = true;

                            document.getElementById("btnConfirmarGrabar").onclick = null;


                            var spnCerrar = document.getElementById("spnCerrar");
                            var spnCancelar = document.getElementById("spnCancelar");
                            spnCancelar.onclick = spnCerrar.onclick = null;

                            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                        }
                        else {
                            if (matrizValidados.length > 0) {
                                var valorTotal = document.getElementById("spnTotalPlanillaExcel").innerHTML * 1;
                                if (valorTotal < 0) {
                                    mostraralerta("No puede generar una planilla en Negativo");
                                } else {
                                    str = listaValidados + "¯" + txtDescripcionGrabar.value;
                                    url = urlBase + "Proceso/grabarCargaPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId + "&tipo=" + document.getElementById("cboTipoPlanilla").value;
                                    $.ajax(url, "post", mostrarRpta, str);
                                    doc.getElementById("btnGrabar").disabled = true;
                                    var spnCerrar = document.getElementById("spnCerrar");
                                    var spnCancelar = document.getElementById("spnCancelar");
                                    spnCancelar.onclick = spnCerrar.onclick = null;
                                    document.getElementById("btnConfirmarGrabar").onclick = null;
                                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                                }
                            }
                            else {
                                mostraralerta("No hay una carga valida");
                            }
                        }
                        //this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                        //this.onclick = null;

                    }

                }
            } else {
                mostraralerta("Seleccione por lo menos un médico");
            }
        }
		btnConfirmarGrabar.innerHTML = "Grabar"
		var spnCerrar = document.getElementById("spnCerrar");
		var spnCancelar = document.getElementById("spnCancelar");
		spnCancelar.onclick = spnCerrar.onclick = function () {
			abrirPopup('PopupGrabar');
		}
	} else {
		var btnGrabar = document.getElementById("btnGrabar");
		btnGrabar.innerHTML = "Actualizar";
	}


	if (r != "") {
		var datos = r.split("¦");
		if (r[0] * 1 >0) {
			var PxMensaje = document.getElementsByClassName("PxMensaje");
			for (var x = 0; x < PxMensaje.length; x++) {
				PxMensaje[x].innerHTML = datos[x + 1];
			}
			abrirPopup('PopupMensaje');
		}
		if (hdfIframe == "1") {
			var seg = document.getElementById("hdfIdSeg").value;
			window.location.href = urlBase + "Proceso/ProcesoPlanillaLista/?ss=" + ss + "&id=" + seg;
			if (window.sessionStorage) {
				window.sessionStorage.setItem("msgPlanilla", "Planilla Actualizada");
			}
			return false;
		}
		var valorindoaM;
		var ddlIndicadorOAVisible=document.getElementById("ddlIndicadorOAVisible").value;
		switch(ddlIndicadorOAVisible){
			case "True":
				valorindoaM=1;
				break;
			case "False":
				valorindoaM=2;
				break;
			default:
				valorindoaM=3;
				break;
		}
		var url = urlBase + "Proceso/obtenerListas/?ss=" + ss + "&su=" + sucursalId + "&indoa=" + valorindoaM;
		$.ajax(url, "get", listarTodo);
		PeriodosSeleccionados = [], MedicosSeleccionados = [], ProduccionSeleccionados = [], BonificacionSeleccionados = [],
		indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0;
		indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0;
		matrizPeriodo = [], matrizMedico = [], matrizMedicoFiltro = [], matrizProduccion, matrizBonificacion = [];
		mostrarMatriz(0, "Medico");
		document.getElementById("spnTotalMedico").innerHTML = "0.00";
		mostraralerta("Planilla grabada");
		document.getElementById("chkTodosM").checked = true;
		document.getElementById("chkTodosM").click();
		document.getElementById("chkTodos").checked = false;
	} else {
		mostraralerta("Error al procesar planilla");
	}
}
function filtrar(identificador) {
	var cabeceras = document.getElementsByName("cabecera" + identificador);
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	window["matriz" + identificador] = [];
	var nRegistros = window["matrizBusqueda" + identificador].length;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var nFiltrados = window["matrizIndice" + identificador].length
	var x = 0;
	var datoEnMatriz;
	var valorCompararPer;
	for (var i = 0; i < nRegistros; i++) {
		campos = window["matrizBusqueda" + identificador][i];
		campoFiltrado = [];
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + identificador)) exito = exito && (campos[window["matrizIndice" + identificador][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[window["matrizIndice" + identificador][j]] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			switch (identificador) {
				case "Periodo":

					datoEnMatriz = window["matrizBusqueda" + identificador][i].slice(0);
					window["matriz" + identificador][x] = [];
					window["matriz" + identificador][x] = datoEnMatriz.splice(0);
					x++;
					break;
				default:
					datoEnMatriz = window["matrizBusqueda" + identificador][i].slice(0);
					window["matriz" + identificador][x] = [];
					window["matriz" + identificador][x] = datoEnMatriz.splice(0);
					x++;
					break;
			}

		}
	}

	switch (identificador) {
		case "Periodo":
			paginar(0, identificador);
			indiceActualPagina = 0;

			break;
		case "Medico":
			var nombreObjeto = "";
			for (var n = 0; n < matrizMedico.length; n++) {
				nombreObjeto = matrizMedico[n][7] + "-" + matrizMedico[n][8];
				if (objetoEdicionPlanilla[nombreObjeto] != undefined) {
					if (matrizMedico[n][6].toFixed(2) != objetoEdicionPlanilla[nombreObjeto].a.toFixed(2)) {
						matrizMedico[n][10] = true;
						matrizBusquedaMedico[n][10] = true;
					}
					else {
						matrizMedico[n][10] = false;
						matrizBusquedaMedico[n][10] = false;
					}
					matrizMedico[n][6] = objetoEdicionPlanilla[nombreObjeto].a;
					matrizMedico[n][5] = objetoEdicionPlanilla[nombreObjeto].b;
					matrizMedico[n][4] = objetoEdicionPlanilla[nombreObjeto].c;
					matrizMedico[n][2] = objetoEdicionPlanilla[nombreObjeto].d;
					matrizBusquedaMedico[n][6] = objetoEdicionPlanilla[nombreObjeto].a;
					matrizBusquedaMedico[n][5] = objetoEdicionPlanilla[nombreObjeto].b;
					matrizBusquedaMedico[n][4] = objetoEdicionPlanilla[nombreObjeto].c;
					matrizBusquedaMedico[n][2] = objetoEdicionPlanilla[nombreObjeto].d;
				}
			}

			paginar(0, identificador);
			indiceActualPaginaM = 0;
			var spnTotalMedico = document.getElementById("spnTotalMedico");
			var spnTotalProcesar = document.getElementById("spnTotalProcesar");
			var ContadorSeleccionados = 0;
			var total = 0;
			for (var x = 0; x < MedicosSeleccionados.length; x++) {
				if (MedicosSeleccionados[x][9] == true) {
					ContadorSeleccionados = ContadorSeleccionados + 1;
					total = total + MedicosSeleccionados[x][7];
				}
			}
			spnTotalProcesar.innerHTML = ContadorSeleccionados + " de " + MedicosSeleccionados.length;
			spnTotalMedico.innerHTML = formatearNumero(total);
			break;
		case "Produccion":
			paginar(0, identificador);
			indiceActualPaginaP = 0;
			break;
		case "Bonificacion":
			paginar(0, identificador);
			indiceActualPaginaB = 0;
			break;
		case "MontoFijo":
			paginar(0, identificador);
			indiceActualPaginaMF = 0;
			break;
	}
}
function mostrarError(e) {
	switch (e.target.error.code) {
		case e.target.error.NOT_FOUND_ERR:
			console.log('Archivo No Encontrado');
			break;
		case e.target.error.NOT_READABLE_ERR:
			console.log('No se puede leer el archivo');
			break;
		case e.target.error.ABORT_ERR:
			break;
		default:
			console.log('Ocurrio un error al leer el archivo');
	};
}
function mostrarArchivo(e) {
	var data = e.target.result;
	if (use_worker) {
		xw(data, process_wb);
	}
}
function process_wb(wb) {
	var doc = document, output = "";
	var lista = to_csv(wb)[0];
	var url = urlBase + "Proceso/leerArchivoExcelPlanilla?ss=" + window.parent.document.getElementById("iss").value;
	url += "&su=" + sucursalId;
	url += "&ti=" + document.getElementById("cboTipoPlanilla").value;
	$.ajax(url, "post", mostrarVistaPrevia, lista);
}
function mostrarVistaPrevia(rpta) {
	var gifLoad = document.getElementById("gifLoad3");
	gifLoad.style.display = "none";
	var data = rpta.split("¯");
	var lista1 = data[0].split("¬");
	var lista2 = data[1].split("¬");
	crearMatriz2("divValidados", lista1);
	listaValidados = data[0];
	crearMatriz2("divErrados", lista2);

	if (matrizValidados.length > 0) {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
	}
	else if (matrizErrados.length > 0) {
		mostrarTabs(document.getElementById("taby2"), 'ulTabsY');
	}
	else {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
	}
	var total = 0;
	for (var x = 0; x < matrizValidados.length; x++) {
		total = total + matrizValidados[x][4];
	}
	document.getElementById("spnTotalPlanillaExcel").innerHTML = formatearNumero(total);
	document.getElementById("spnUpExc").style.display = "";
	document.getElementById("divTotalPlanillaExcel").style.display = "";
}
//function xw(data, cb) {
//	if (transferable) xw_xfer(data, cb);
//	else xw_noxfer(data, cb);
//}
//function xw_xfer(data, cb) {
//	var worker = new Worker(XW.rABS);
//	worker.onmessage = function (e) {
//		switch (e.data.t) {
//			case 'ready': break;
//			case 'e': console.error(e.data.d); break;
//			default: xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
//				cb(JSON.parse(xx));
//				worker.terminate();
//				break;
//		}
//	};
//	if (rABS) {
//		var val = s2ab(data);
//		worker.postMessage(val[1], [val[1]]);
//	} else {
//		worker.postMessage(data, [data]);
//	}
//}
//function s2ab(s) {
//	var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
//	for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
//	return [v, b];
//}
//function ab2str(data) {
//	var o = "", l = 0, w = 10240;
//	for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
//	o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
//	return o;
//}
//function to_csv(workbook) {
//	var result = [], c = 0;

//	workbook.SheetNames.forEach(function (sheetName) {
//		if (c == 0) {
//			var csv = sheet_to_csv(workbook.Sheets[sheetName], null, sheetName);
//			if (csv != null) {
//				result.push(csv);
//			}
//		}
//		c++;
//	});
//	return result;
//}

//function sheet_to_csv(sheet, opts, nm) {
//	MatrizWS = [];
//	var out = "", txt = "", qreg = /"/g;
//	var o = opts == null ? {} : opts;
//	var c = 0;
//	if (sheet == null || sheet["!ref"] == null) return "";
//	var r = safe_decode_range(sheet["!ref"]);
//	var FS = o.FS !== undefined ? o.FS : ",", fs = FS.charCodeAt(0);
//	var RS = o.RS !== undefined ? o.RS : "\n", rs = RS.charCodeAt(0);
//	var row = "", rr = "", cols = [];
//	var i = 0, cc = 0, val;
//	var R = 0, C = 0;
//	for (C = r.s.c; C <= r.e.c; ++C) { cols[C] = encode_col(C) };
//	var nCols = cols.length;
//	var nRg = r.e.r + 1;
//	for (var j = 1; j <= nRg; ++j) {
//		MatrizWS[c] = [];
//		for (var i = 0; i < nCols; i += 1) {
//			val = sheet[cols[i] + j];
//			MatrizWS[c][i] = (val != undefined ? val.w : "");

//		}
//		c++;
//	}

//	MatrizWS.splice(0, 1);
//	xlsData = "";
//	var n = MatrizWS.length, reg, ncampos, cntv = "", cnte = "", tmp = "", tmpxls = "", c = 0, v, msg = "", cv = 0, ce = 0, desc = "";

//	if (n > 0) {
//		for (var k = 0; k < n; k++) {
//			reg = MatrizWS[k];
//			ncampos = reg.length;
//			tmpxls = "";
//			msg = "";
//			c = 0;
//			for (var j = 0; j < ncampos; j++) {
//				tmpxls += reg[j] + "¦";
//			}
//			//tmpxls = tmpxls.substring(0, tmpxls.length - 1);
//			xlsData += tmpxls + "¬";
//		}
//	}
//	xlsData = xlsData.substring(0, xlsData.length - 1);
//	return xlsData;
//}

//function safe_format_cell(cell, v) {
//	if (cell.z !== undefined) try { return (cell.w = SSF.format(cell.z, v)); } catch (e) { }
//	if (!cell.XF) return v;
//	try { return (cell.w = SSF.format(cell.XF.ifmt || 0, v)); } catch (e) { return '' + v; }
//}

//function format_cell(cell, v) {
//	if (cell == null || cell.t == null) return "";
//	if (cell.w !== undefined) return cell.w;
//	if (v === undefined) return safe_format_cell(cell, cell.v);
//	return safe_format_cell(cell, v);
//}
//function safe_decode_range(range) {
//	var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
//	var idx = 0, i = 0, cc = 0;
//	var len = range.length;
//	for (idx = 0; i < len; ++i) {
//		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
//		idx = 26 * idx + cc;
//	}
//	o.s.c = --idx;
//	for (idx = 0; i < len; ++i) {
//		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
//		idx = 10 * idx + cc;
//	}
//	o.s.r = --idx;
//	if (i === len || range.charCodeAt(++i) === 58) { o.e.c = o.s.c; o.e.r = o.s.r; return o; }

//	for (idx = 0; i != len; ++i) {
//		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
//		idx = 26 * idx + cc;
//	}
//	o.e.c = --idx;
//	for (idx = 0; i != len; ++i) {
//		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
//		idx = 10 * idx + cc;
//	}
//	o.e.r = --idx;
//	return o;
//}
//function encode_col(col) { var s = ""; for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode(((col - 1) % 26) + 65) + s; return s; }
//function encode_row(row) { return "" + (row + 1); }


function xw(data, cb) {
	if (transferable) xw_xfer(data, cb);
	//else xw_noxfer(data, cb);
}
//function process_wb(wb) {
//	var doc = document, output = "";
//	var lista = to_csv(wb)[0];
//	console.log(lista);
//	//var url = urlBase + "Proceso/leerArchivoExcelPlanilla?ss=" + window.parent.document.getElementById("iss").value;
//	//url += "&su=" + sucursalId;
//	//url += "&ti=" + document.getElementById("cboTipoPlanilla").value;
//	//$.ajax(url, "post", mostrarVistaPrevia, lista);
//	//document.getElementById("gifLoad").style.display = "none";
//}
function xw_xfer(data, cb) {
	var worker = new Worker(XW.rABS);
	worker.onmessage = function (e) {
		switch (e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			default: xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
				cb(JSON.parse(xx));
				worker.terminate();
				break;
		}
	};
	if (rABS) {
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	} else {
		worker.postMessage(data, [data]);
	}
}
function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
	return o;
}
function s2ab(s) {
	var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
	for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}
function to_csv(workbook) {
	var result = [], c = 0;
	workbook.SheetNames.forEach(function (sheetName) {
		if (c == 0) {
			var csv = sheet_to_csv(workbook.Sheets[sheetName], null, sheetName);
			if (csv != null) {
				result.push(csv);
			}
		}
		c++;
	});
	return result;
}
function sheet_to_csv(sheet, opts, nm) {
	MatrizWS = [];
	var out = "", txt = "", qreg = /"/g;
	var o = opts == null ? {} : opts;
	var c = 0;
	if (sheet == null || sheet["!ref"] == null) return "";
	var r = safe_decode_range(sheet["!ref"]);
	var FS = o.FS !== undefined ? o.FS : ",", fs = FS.charCodeAt(0);
	var RS = o.RS !== undefined ? o.RS : "\n", rs = RS.charCodeAt(0);
	var row = "", rr = "", cols = [];
	var i = 0, cc = 0, val;
	var R = 0, C = 0;
	for (C = r.s.c; C <= r.e.c; ++C) { cols[C] = encode_col(C) };
	var nCols = cols.length;
	var nRg = r.e.r + 1;
	for (var j = 1; j <= nRg; ++j) {
		MatrizWS[c] = [];
		for (var i = 0; i < nCols; i += 1) {
			val = sheet[cols[i] + j];
			MatrizWS[c][i] = (val != undefined ? val.w : "");

		}
		c++;
	}

	MatrizWS.splice(0, 1);
	xlsData = "";
	var n = MatrizWS.length, reg, ncampos, cntv = "", cnte = "", tmp = "", tmpxls = "", c = 0, v, msg = "", cv = 0, ce = 0, desc = "";

	if (n > 0) {
		for (var k = 0; k < n; k++) {
			reg = MatrizWS[k];
			ncampos = reg.length;
			tmpxls = "";
			msg = "";
			c = 0;
			for (var j = 0; j < ncampos; j++) {
				tmpxls += reg[j] + "¦";
			}
			//tmpxls = tmpxls.substring(0, tmpxls.length - 1);
			xlsData += tmpxls + "¬";
		}
	}
	xlsData = xlsData.substring(0, xlsData.length - 1);
	return xlsData;
}
function safe_decode_range(range) {
	var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
	var idx = 0, i = 0, cc = 0;
	var len = range.length;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.s.c = --idx;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.s.r = --idx;
	if (i === len || range.charCodeAt(++i) === 58) { o.e.c = o.s.c; o.e.r = o.s.r; return o; }

	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.e.c = --idx;
	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.e.r = --idx;
	return o;
}
function encode_col(col) { var s = ""; for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode(((col - 1) % 26) + 65) + s; return s; }
function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 210px' align='center'>Médico/Empresa</td>";
	cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
	cabecera += "<td style='width: 100px' align='center'>Importe</td>";
	cabecera += "<td style='width: 100px' align='center'>Descuento</td>";
	cabecera += "<td style='width: 100px' align='center'>Bonificación</td>";
	cabecera += "<td style='width: 100px' align='center'>Ajuste</td>";
	cabecera += "<td style='width: 100px' align='center'>Total</td>";
	cabecera += "</tr>";
	return cabecera;
}
function exportacion() {
	var nRegistros = matrizMedico.length;
	var nCampos = matrizMedico[0].length;
	var contenido = [];
	var excelExportar = crearCabeceraExportar();
	var datoTipoAdmision = "";
	for (var i = 0; i < nRegistros; i++) {
		if (MedicosSeleccionados[i][9]) {
			contenido.push("<tr>");
			for (var j = 1; j < nCampos - 3; j++) {
				contenido.push("<td>");
				switch (j) {

					case 2:
						for (var k = 0; k < lstTadm.length; k++) {
							datoTipoAdmision = lstTadm[k].split("¦");
							if ((datoTipoAdmision[0] * 1) == matrizMedico[i][8]) {
								contenido.push(datoTipoAdmision[1]);
								break;
							}
						}
						break;
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						contenido.push(formatearNumero(matrizMedico[i][j - 1]));
						break;
					default:
						contenido.push(matrizMedico[i][j]);
						break;
				}
				contenido.push("</td>");
			}
			contenido.push("</tr>");
		}

	}
	excelExportar += contenido.join("") + "</table></html>";
	return excelExportar;
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
function descargarExcelMas() {
	var contenido = "";
	if (matrizValidados.length > 0 || matrizErrados.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [];
		matrizCabecera = ["IdMédico", "IdOrdenAtencion", "Linea OA", "Código OA", "Monto", "Sucursal", "TipoDocumento", "Serie", "Número", "FechaEmisión", "NroObligación", "Observación"];
		matrizAnchos = [80, 140, 80, 120, 80, 80, 100, 100, 100, 100, 120, 600];
		matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		for (var x = 0; x < 2; x++) {
			switch (x) {
				case 0:
					//ncampos = matrizValidados[0].length;
					matriz = (matrizValidados.length == 0 ? [] : matrizValidados.slice(0));
					nombre = "Validados";
					break;
				case 1:
					//ncampos = matrizErrados[0].length;
					matriz = (matrizErrados.length == 0 ? [] : matrizErrados.slice(0));
					nombre = "Erroneos";
					break;
			}
			ncampos = matrizCabecera.length;
			n = matriz.length;


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
						switch (y) {
							case 0:
							case 1:
							case 2:
							case 3:
							case 8:
							case 10:
								contenido += '<Cell style="text-align:right">';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndice[y]].toString();
								break;
							case 4:
								contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[z][matrizIndice[y]] * 1;
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndice[y]].toString();
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
	if (contenido != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", "Log_de_Carga.xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	} else {
		mostraralerta("No se encontraron registros");
	}
}
function exportarDetallePlanilla() {
	var contenido = "";
	if (matrizFiltroProduccion.length > 0 || matrizFiltroBonificacion.length > 0 || matrizFiltroMontoFijo.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [];
		for (var x = 0; x < 3; x++) {
			switch (x) {
				case 0:
					matrizCabecera = ["Médico", "CodigoOA", "Prestación", "Fec. Ate. Prestación", "Periodo Prod.", "Servicio", "Total", "Especialidad", "Est. Prestación", "Paciente", "Expediente", "Fec. Atendido", "Fec. Terminado", "P/U. Prestación", "Cantidad", "Mto. Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Clínica", "Importe", "Bonificación", "Ajuste", "Fec. InicioOA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Mod. Facturación", "IdOrdenAtención", "LineaOA", "Estado"];
					matrizAnchos = [600, 140, 800, 250, 150, 500, 100, 400, 180, 500, 130, 230, 230, 160, 100, 130, 130, 130, 100, 120, 140, 100, 120, 120, 230, 200, 230, 700, 170, 130, 100, 130];
					matrizIndice = [0, 1, 4, 5, 30, 24, 19, 26, 27, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 25, 31, 32, 28];
					matriz = (matrizFiltroProduccion.length == 0 ? [] : matrizFiltroProduccion.slice(0));
					nombre = "Producción";
					break;
				case 1:
					matrizCabecera = ["Médico", "Fecha", "H. Inicio", "H. Fin", "H. Programadas", "Día", "Ind. Feriado", "Valor Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado"];
					matrizAnchos = [600, 230, 130, 130, 130, 130, 130, 130, 130, 130, 130, 500, 150, 130];
					matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
					matriz = (matrizFiltroBonificacion.length == 0 ? [] : matrizFiltroBonificacion.slice(0));
					nombre = "Bonificación";
					break;
				case 2:
					matrizCabecera = ["Médico", "Descripcion", "Importe", "ConceptoId", "Concepto", "IndicadorAdministrativo", "Periodo", "ProcesoMedicoConceptoId"];
					matrizAnchos = [600, 700, 130, 130, 300, 150, 130, 130];
					matrizIndice = [8, 1, 2, 3, 4, 5, 6, 7];
					matriz = (matrizFiltroMontoFijo.length == 0 ? [] : matrizFiltroMontoFijo.slice(0));
					nombre = "MontoFijo";
					break;
			}
			ncampos = matrizCabecera.length;
			n = matriz.length;


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
									case 3:
									case 11:
									case 12:
									case 24:
										contenido += '<Cell ss:StyleID="s62">';
										contenido += '<Data ss:Type="String">';
										contenido += formatearfecha(matriz[z][matrizIndice[y]]);
										break;
									case 6:
									case 13:
									case 14:
									case 15:
									case 16:
									case 18:
									case 19:
									case 20:
									case 21:
									case 22:
									case 23:
									case 24:
										contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndice[y]] * 1;
										break;
									case 29:
									case 30:
										contenido += '<Cell style="text-align:right">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndice[y]] * 1;
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
									case 7:
									case 8:
									case 9:
									case 10:
										contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndice[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndice[y]].toString();
										break;
								}
								break;
							case 2:
								switch (y) {
									case 0:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][8].toString();
										break;
									case 6:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										switch (matriz[z][matrizIndice[y]].toString()) {
											case "L": contenido += "Semanal"; break;
											case "Q": contenido += "Quincenal"; break;
											case "M": contenido += "Mensual"; break;
											case "B": contenido += "Bimensual"; break;
											case "T": contenido += "Trimestral"; break;
											case "S": contenido += "Semestral"; break;
											case "A": contenido += "Anual"; break;
										}
										break;
									case 2:
										contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][matrizIndice[y]] * 1;
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][matrizIndice[y]].toString();
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
	if (contenido != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", "CreacionDetallePlanilla.xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	} else {
		mostraralerta("No se encontraron registros");
	}
}
function formatearNumero(valor) {
	var valorFrm;
	var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
	if (!isNaN(valor)) {		
		valorFrm = valor.toLocaleString("en-US", frmMoneda);
		if (valorFrm == "-0.00") {
			valorFrm = "0.00";
		}
	} else {
		valorFrm = "0.00";
	}
	return valorFrm
}
function limpiarPoppupCrearPlanilla() {
	document.getElementById("cboMesGrabar").value = "";
	document.getElementById("cboTipoPlanilla").value = "";
	document.getElementById("chkIndDescuento").checked = false;
	document.getElementById("txtDescripcionGrabar").value = "";
};