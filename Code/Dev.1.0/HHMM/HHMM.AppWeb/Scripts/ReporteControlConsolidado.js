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
		if (text != null) xhr.send(text);
	}
}

var matrizOP1ReportePrincipal = [],
	matrizOP21ReportePrincipal = [],
	matrizOP22ReportePrincipal = [],
	matrizOP23ReportePrincipal = [],
	matrizOP3ReportePrincipal = [];
var matrizFiltroOP1ReportePrincipal = [],
	matrizFiltroOP21ReportePrincipal = [],
	matrizFiltroOP22ReportePrincipal = [],
	matrizFiltroOP23ReportePrincipal = [],
	matrizFiltroOP3ReportePrincipal = [];
var listaSucursal = [],
	listaTipoAtencion = [],
	listaTipoServicio = [],
	listaComponente = [],
	listaDocumentoEstados = [],
	listaMedicoEmpresa = [],
	listaEspecialidad = [],
	listaAseguradora = [],
	listaModalidadFacturacion = [],
	listaTipoPaciente = [],
	listaTipoAdmision = [],
	listaTurno = [],
	listaConfiguracionPago = [],
	listaUnidadMedica = [],
	listaConceptoMontoFijo = [];
var matrizArchivoSucursal = [];

var reporteActual;
//var cabecerasOP1ReportePrincipal = ["Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
//				"Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
//				"IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso"];

var cabecerasOP1ReportePrincipal = ["Tipo Reporte", "Sucursal", "Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
				"Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
				"IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso"];

var matrizIndiceOP1ReportePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 42, 10, 11, 12, 13, 14, 15, 16, 17, 43, 18, 44, 19, 20, 21, 45, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];
var anchosOP1ReportePrincipal = [420, 250, 145, 145, 100, 145, 150, 145, 400, 150, 400, 140, 140, 140, 150, 150, 100, 100, 100, 400, 150, 400, 400, 400, 400, 400, 145, 145, 145, 145, 145, 120, 120, 120, 120, 120, 200, 145, 210, 120, 200, 120, 145, 120, 120];


var cabecerasOP21ReportePrincipal = ["Tipo Reporte", "Sucursal", "Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
				"Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
				"IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso", "Tipo Observación", "Patron", "Observación", "Descripción Validación"];

var matrizIndiceOP21ReportePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 46, 10, 11, 12, 13, 14, 15, 16, 17, 47, 18, 48, 19, 20, 21, 49, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var anchosOP21ReportePrincipal = [420, 250, 145, 145, 100, 145, 150, 145, 400, 150, 400, 140, 140, 140, 150, 150, 100, 100, 100, 400, 150, 400, 400, 400, 400, 400, 145, 145, 145, 145, 145, 120, 120, 120, 120, 120, 200, 145, 210, 120, 200, 120, 145, 120, 120, 200, 200, 200, 200];


var cabecerasOP22ReportePrincipal = ["Tipo Reporte", "Sucursal", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Dia", "Indicador Feriado", "Especialidad", "Tipo Atención", "Estado", "Unidad Id", "Unidad Médica"];

var matrizIndiceOP22ReportePrincipal = [0, 1, 2, 12, 3, 4, 5, 6, 7, 13, 14, 10, 11, 15];
var anchosOP22ReportePrincipal = [250, 250, 90, 400, 100, 100, 100, 100, 100, 400, 250, 100, 100, 300];

var cabecerasOP23ReportePrincipal = ["Tipo Reporte", "Sucursal", "Id Médico", "Médico", "Descripción", "Fecha Inicio", "Fecha Fin", "Valor", "Concepto Monto Fijo Id", "Concepto Monto Fijo", "Estado"];

var matrizIndiceOP23ReportePrincipal = [0, 1, 2, 9, 3, 4, 5, 6, 7, 10, 8];
var anchosOP23ReportePrincipal = [250, 250, 90, 400, 400, 100, 100, 120, 150, 300, 150];


var cabecerasOP3ReportePrincipal = ["Sucursal Médico", "Id Médico", "Médico", "Tipo Persona", "Numero Documento", "Documento Fiscal", "Estado Médico", "Sucursal Contrato", "Id Contrato", "Fecha Inicio Contrato", "Fecha Fin Contrato", "Estado Contrato", "Indicador Adjunto",
								    "Nombre Archivo", "Nombre Repositorio", "Indicador Contrato", "Especialidad", "Empresa", "Tipo Médico", "Modalidad Pago", "Fecha Inicio Contrato Detalle", "Fecha Fin Contrato Detalle", "Secuencia", "Tipo Registro",
									"Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Servicio", "Aseguradora", "Contrato", "Especialidad", "Turno", "Tipo Valor", "Valor1", "Valor2", "Alcance Prestación", "Estado Linea Configuración", "Id Componente", "Componente"];

var matrizIndiceOP3ReportePrincipal = [0, 1, 33, 34, 35, 36, 37, 2, 3, 4, 5, 6, 7, 8, 9, 10, 38, 39, 13, 40, 15, 16, 17, 18, 19, 20, 21, 22, 41, 24, 25, 26, 27, 28, 29, 30, 31, 32, 44];
var anchosOP3ReportePrincipal = [200, 100, 400, 145, 130, 145, 100, 200, 100, 150, 150, 100, 120, 200, 200, 120, 300, 300, 100, 110, 180, 180, 70, 100, 100, 100, 120, 400, 300, 145, 300, 120, 120, 120, 120, 120, 150, 120, 300];
var anchosExcelOP3ReportePrincipal = [145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145];


var indiceActualBloqueOP1ReportePrincipal = 0, indiceActualBloqueOP21ReportePrincipal = 0, indiceActualBloqueOP22ReportePrincipal = 0, indiceActualBloqueOP23ReportePrincipal = 0, indiceActualBloqueOP3ReportePrincipal = 0;
var indiceActualPaginaOP1ReportePrincipal = 0, indiceActualPaginaOP21ReportePrincipal = 0, indiceActualPaginaOP22ReportePrincipal = 0, indiceActualPaginaOP23ReportePrincipal = 0, indiceActualPaginaOP3ReportePrincipal = 0;


var registrosPagina = 10, paginasBloque = 5, indiceOrden = 0, matrizMaximo = 100000;

var urlBase = "", opcionfiltro = -1, opcionPopUp = -1, ss = "", Campoeliminar = "", IdInterfaceActual = -1;
var indiceExcelActualArchivos = 0;

window.onload = function () {
	var pos1 = window.location.href.indexOf("Control");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	ConfiguracionInicial();
	var url = urlBase + "Control/ReporteControlConsolidadoListas?ss=" + ss;
	$.ajax(url, "get", ObtenerListas);
};

/*********************************CONFIGURACIONES GENERALES*****************************************/

function ConfiguracionInicial() {
	var fecha = new Date();
	var AnioActual = fecha.getFullYear();
	document.getElementById("BUSOP1txtAnio").value = AnioActual;
	document.getElementById("BUSOP2txtAnio").value = AnioActual;
	crearTabla("OP1ReportePrincipal");
	crearTabla("OP21ReportePrincipal");
	crearTabla("OP22ReportePrincipal");
	crearTabla("OP23ReportePrincipal");
	crearTabla("OP3ReportePrincipal");
	//crearTabla("OP2ReporteDet1");
	//crearTabla("OP2ReporteDet2");
	//crearTabla("OP2ReporteDet3");
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
}

function crearMatriz(lista, separador, identificador, enteros, fechas) {
	var nRegistros = lista.length;
	var nCampos = 0,
        campos, x = 0,
        matriz = [],
        j = 0,
        i = nRegistros, matrizIndicesFecha = [], matrizIndicesEntero = [], nForm = 0;
	identificador = (identificador == undefined ? "" : identificador.trim());
	if (identificador != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
	}
	if (enteros != undefined && enteros.trim() != "") {
		matrizIndicesEntero = enteros.split(",");
	}
	if (fechas != undefined && fechas.trim() != "") {
		matrizIndicesFecha = fechas.split(",");
	}

	if (nRegistros > 0 && lista[0] != "") {
		for (; i > 0; i--) {
			matriz[x] = lista[x].split(separador);
			x++;
			if (nCampos == 0) {
				nCampos = matriz[0].length;
			}
		}
		x = 0, i = nRegistros;
		for (; i > 0; i--) {
			for (; j < nCampos; j++) {
				if (matrizIndicesEntero.length > 0 && buscarIdx(matrizIndicesEntero, j.toString())) {
					matriz[x][j] = matriz[x][j] * 1;
				}
				else if (matrizIndicesFecha.length > 0 && buscarIdx(matrizIndicesFecha, j.toString())) {
					if (matriz[x][j].indexOf("1900") > -1) {
						matriz[x][j] = "";
					}
				}
				else {
					matriz[x][j] = matriz[x][j].trim();
				}
			}
			j = 0;
			x++;
		}

		j = 0, x = 0, i = nRegistros;
		switch (identificador) {
			case "OP1ReportePrincipal":
			case "OP21ReportePrincipal":
				for (; i > 0; i--) {
					if (!buscarIdx(matrizArchivoSucursal, matriz[x][1], 0)) {
						matrizArchivoSucursal.push(matriz[x][1]);
					}
					matriz[x][matriz[x].length] = buscarEnLista(listaComponente, matriz[x][9], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][17], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][18], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaAseguradora, matriz[x][22], 0, 1, true);
					x++;
				}
				break;
			case "OP22ReportePrincipal":
				for (; i > 0; i--) {
					if (!buscarIdx(matrizArchivoSucursal, matriz[x][1], 0)) {
						matrizArchivoSucursal.push(matriz[x][1]);
					}
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][2], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaEspecialidad, matriz[x][8], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaTipoAtencion, matriz[x][9], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaUnidadMedica, matriz[x][11], 0, 1, true);
					x++;
				}
				break;
			case "OP23ReportePrincipal":
				for (; i > 0; i--) {
					if (!buscarIdx(matrizArchivoSucursal, matriz[x][1], 0)) {
						matrizArchivoSucursal.push(matriz[x][1]);
					}
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][2], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaConceptoMontoFijo, matriz[x][7], 0, 1, true);
					x++;
				}
				break;
			case "OP3ReportePrincipal":
				var datosCadena = [], contenido = [];
				for (; i > 0; i--) {
					if (!buscarIdx(matrizArchivoSucursal, matriz[x][0], 0)) {
						matrizArchivoSucursal.push(matriz[x][0]);
					}
					contenido = [];
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][1], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][1], 0, 2, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][1], 0, 3, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][1], 0, 4, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaMedicoEmpresa, matriz[x][1], 0, 5, true);

					datosCadena = matriz[x][11].split("-");
					for (var o = 0; o < (datosCadena.length - 1) ; o++) {
						contenido.push(buscarEnLista(listaEspecialidad, datosCadena[o], 0, 1, true));
					}
					matriz[x][matriz[x].length] = contenido.join("-");
					contenido = [];

					datosCadena = [];
					datosCadena = matriz[x][12].split("-");
					for (var o = 0; o < (datosCadena.length - 1) ; o++) {
						contenido.push(buscarEnLista(listaMedicoEmpresa, datosCadena[o], 0, 1, true));
					}
					matriz[x][matriz[x].length] = contenido.join("-");
					matriz[x][matriz[x].length] = buscarEnLista(listaConfiguracionPago, matriz[x][14], 0, 1, true);
					matriz[x][matriz[x].length] = (buscarEnLista(listaAseguradora, matriz[x][23], 0, 1, true) == "" ? "Todos" : buscarEnLista(listaAseguradora, matriz[x][23], 0, 1, true));
					matriz[x][matriz[x].length] = buscarEnLista(listaEspecialidad, matriz[x][25], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaTurno, matriz[x][26], 0, 1, true);
					matriz[x][matriz[x].length] = buscarEnLista(listaComponente, matriz[x][32], 0, 1, true);

					x++;
				}
				break;
		}

		if (identificador != "") {
			window["matriz" + identificador] = matriz.slice(0);
			window["matrizFiltro" + identificador] = matriz.slice(0);
		}
		else {
			return matriz;
		}
	} else {
		if (identificador == "") {
			return matriz;
		}
	}
}

function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "OP1ReportePrincipal":
		case "OP21ReportePrincipal":
		case "OP22ReportePrincipal":
		case "OP23ReportePrincipal":
		case "OP3ReportePrincipal":
			contenido = "<table class='tabla-general' style='table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
		default:
			contenido = "<table class='tabla-general' style='margin-bottom:0'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		switch (identificador) {
			case "OP1ReportePrincipal":
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
					case 0:
						if (identificador == "OP1ReportePrincipal") {
							contenido += "<select class='Combo";
							contenido += identificador;
							contenido += "' name='cabecera";
							contenido += identificador;
							contenido += "' style='width:90%'>";
							contenido += "<option value=''>Todos</option>";
							contenido += "<option value='1'>Procedimientos y Consultas sin médico o especialidad</option>";
							contenido += "<option value='2'>Procedimientos y Consultas pendientes de cierre de emergencia</option>";
							contenido += "<option value='3'>Procedimientos y Consultas pendientes de atención</option>";
							contenido += "<option value='4'>Consultas sin anamnesis</option>",
							contenido += "<option value='5'>Procedimientos sin informe médico</option>";
							contenido += "</select>";
						}
						break;
					case 1:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlSucursal'>";
						contenido += "</select>";
						break;
					case 3:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoAtencion'>";
						contenido += "</select>";
						break;
					case 8:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoServicio'>";
						contenido += "</select>";
						break;
					case 15:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoOA'>";
						contenido += "</select>";
						break;
					case 22:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEspecialidad'>";
						contenido += "</select>";
						break;
					case 24:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoPaciente'>";
						contenido += "</select>";
						break;
					case 26:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlModFacturacion'>";
						contenido += "</select>";
						break;
					case 31:
					case 32:
					case 33:
					case 34:
					case 39:
					case 43:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>TODOS</option><option value='SI'>SI</option><option value='NO'>NO</option>";
						contenido += "</select>";
						break;
					case 36:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoTransaccion'>";
						contenido += "</select>";
						break;
					case 37:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoHospitalizacion'>";
						contenido += "</select>";
						break;
					case 38:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoSitDetalleHosp'>";
						contenido += "</select>";
						break;
					case 40:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoSitDetalleExp'>";
						contenido += "</select>";
						break;
					case 42:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoPlanilla'>";
						contenido += "</select>";
						break;
					case 45:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='I'>INFORMATIVO</option>";
						contenido += "</select>";
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
			case "OP21ReportePrincipal":
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
					case 0:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%;display:none'>";
						break;
					case 1:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlSucursal'>";
						contenido += "</select>";
						break;
					case 3:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlTipoAtencion'>";
						contenido += "</select>";
						break;
					case 8:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlTipoServicio'>";
						contenido += "</select>";
						break;
					case 15:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoOA'>";
						contenido += "</select>";
						break;
					case 22:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEspecialidad'>";
						contenido += "</select>";
						break;
					case 24:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlTipoPaciente'>";
						contenido += "</select>";
						break;
					case 26:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlModFacturacion'>";
						contenido += "</select>";
						break;
					case 31:
					case 32:
					case 33:
					case 34:
					case 39:
					case 43:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>TODOS</option><option value='SI'>SI</option><option value='NO'>NO</option>";
						contenido += "</select>";
						break;
					case 36:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoTransaccion'>";
						contenido += "</select>";
						break;
					case 37:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoHospitalizacion'>";
						contenido += "</select>";
						break;
					case 38:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoSitDetalleHosp'>";
						contenido += "</select>";
						break;
					case 40:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoSitDetalleExp'>";
						contenido += "</select>";
						break;
					case 42:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP21ddlEstadoPlanilla'>";
						contenido += "</select>";
						break;
					case 45:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='I'>INFORMATIVO</option>";
						contenido += "</select>";
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
			case "OP22ReportePrincipal":
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
					case 0:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%;display:none'>";
						break;
					case 8:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='1'>SI</option><option value='0'>NO</option>";
						contenido
						break;
					case 11:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option>";
						contenido += "</select>";
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
			case "OP23ReportePrincipal":
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
					case 0:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%;display:none'>";
						break;
					case 1:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP23ddlSucursalMedico'>";
						contenido += "</select>";
						break;
					case 10:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option>";
						contenido += "</select>";
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
			case "OP3ReportePrincipal":
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
					case 0:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlSucursalMedico'>";
						contenido += "</select>";
						break;
					case 3:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='J'>JURIDICA</option><option value='N'>NATURAL</option>";
						contenido += "</select>";
						break;
					case 6:
					case 11:
					case 36:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option>";
						contenido += "</select>";
						break;
					case 7:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlSucursalContrato'>";
						contenido += "</select>";
						break;
					case 24:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlTipoAtencion'>";
						contenido += "</select>";
						break;
					case 25:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlTipoAdmision'>";
						contenido += "</select>";
						break;
					case 26:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlTipoPaciente'>";
						contenido += "</select>";
						break;
					case 27:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlTipoServicio'>";
						contenido += "</select>";
						break;
					case 30:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlEspecialidad'>";
						contenido += "</select>";
						break;
					case 31:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='OP3ddlTurno'>";
						contenido += "</select>";
						break;
					case 12:
					case 15:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='1'>SI</option><option value='0'>NO</option>";
						contenido += "</select>";
						break;
					case 18:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='T'>TERCERO</option><option value='E'>EMPLEADO</option><option value='C'>CORTESIA</option>";
						contenido += "</select>";
						break;
					case 23:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='C'>CONFIGURACIÓN</option><option value='B'>BONIFICACIÓN</option>";
						contenido += "</select>";
						break;
					case 32:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='P'>PORCENTAJE</option><option value='M'>MONTO</option><option value='F'>FACTOR</option><option value='D'>PAGO DOBLE</option><option value='H'>HORARIO</option><option value='T'>TURNO</option>";
						contenido += "</select>";
						break;
					case 35:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='T'>TODOS</option><option value='A'>ALGUNOS</option><option value='E'>EXCEPTO</option>";
						contenido += "</select>";
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
				contenido += "<input type='text' class='Texto";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%'>";
				break;
		}
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
	document.getElementById("divEX" + identificador).innerHTML = "<div id='tdPaginas" + identificador + "'></div>";
}

function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("EnlaceOP1ReportePrincipal");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "OP1ReportePrincipal");
			paginar(indiceActualPaginaOP1ReportePrincipal, "OP1ReportePrincipal");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceOP2ReporteDet1");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "OP2ReporteDet1");
			paginar(indiceActualPaginaReporteDet1, "OP2ReporteDet1");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceOP2ReporteDet2");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "OP2ReporteDet2");
			paginar(indiceActualPaginaReporteDet2, "OP2ReporteDet2");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceOP2ReporteDet3");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "OP2ReporteDet3");
			paginar(indiceActualPaginaReporteDet3, "OP2ReporteDet3");
		};
	}
}

function recogerValores(objeto) {
	var lista = [], contador1 = 0, contador2 = 0;
	var valores = document.getElementsByName("cabecera" + objeto);
	for (var x = 0; x < valores.length; x++) {
		if (valores[x].className.indexOf("Combo") > -1) {
			if ((valores[x].selectedIndex * 1) > 0) {
				lista.push([x, valores[x].value.toLowerCase().trim(), false]);
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
	var textos = document.getElementsByName("cabeceraOP1ReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("OP1ReportePrincipal");
					document.getElementById("spnOP1Total").innerHTML = matrizOP1ReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("OP1ReportePrincipal");
					document.getElementById("spnOP1Total").innerHTML = matrizOP1ReportePrincipal.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraOP21ReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("OP21ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP21ReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("OP21ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP21ReportePrincipal.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraOP22ReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("OP22ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP22ReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("OP22ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP22ReportePrincipal.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraOP23ReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("OP23ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP23ReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("OP23ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = matrizOP23ReportePrincipal.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraOP3ReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("OP3ReportePrincipal");
					document.getElementById("spnOP3Total").innerHTML = matrizOP3ReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("OP3ReportePrincipal");
					document.getElementById("spnOP3Total").innerHTML = matrizOP3ReportePrincipal.length;
				}, 0);
			};
		}
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
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 1 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(Elemento);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	else enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	if (validado) {
		var matrizClon = window["matriz" + Elemento].splice(0, window["matriz" + Elemento].length);
		window["matriz" + Elemento] = quicksort2(matrizClon, indiceOrden);
	} else {
		window["matriz" + Elemento].reverse();
	}
}

function quicksort2(arr, indice) {
	if (arr.length <= 1) {
		return arr;
	}

	var arrLength = arr.length;
	var pivotPosition = Math.floor(arrLength / 2);
	var pivotValue = arr[pivotPosition][indice];
	var less = [],
        more = [],
        same = [];
	for (var i = 0; i < arrLength; i++) {
		if (arr[i][indice] === pivotValue) {
			same.push(arr[i]);
		}
		else if (arr[i][indice] < pivotValue) {
			less.push(arr[i]);
		}
		else {
			more.push(arr[i]);
		}
	}

	return quicksort2(less, indice).concat(same, quicksort2(more, indice));
}

function filtrar(identificador) {
	var lista = recogerValores(identificador);
	opcionfiltro = -1;
	var nCabeceras = lista.length;
	var exito = true,
        campos;
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
				if (lista[j][2]) exito = (campos[indice].toString().toLowerCase().indexOf(lista[j][1]) > -1);
				if (identificador == "OP3ReportePrincipal") {
					exito = (campos[indice].toString().toLowerCase().indexOf(lista[j][1])>-1);
				}else{
					exito = (campos[indice].toString().toLowerCase().includes(lista[j][1]));
				}
				 
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
	paginar(-1, identificador);
	limpiarEnlaces(identificador);
	window["indiceActualBloque" + identificador] = 0;
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
	indiceActualPagina = indicePagina;
	var contenido = "";

	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	var matriz = window["matriz" + identificador].slice(0);
	var matrizIndice = window["matrizIndice" + identificador].slice(0);
	var n = matriz.length;
	var contenido2 = "";
	if (n > 0) {
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "OP1ReportePrincipal":
			case "OP21ReportePrincipal":
				var valorFor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						if (matriz[i][41] == "0") contenido += "<tr class='FilaDatos'>";
						else contenido += "<tr class='FilaDatos' style='background: rgba(247, 147, 140, 0.75);color: white;'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 11 || j == 12 || j == 13 || j == 17 || j == 18 || j == 20 || j == 35 || j == 41 || j == 44) {
								if (matriz[i][41] == "0") contenido2 += "<td style='text-align:right'>";
								else contenido2 += "<td style='text-align:right;background: rgba(247, 147, 140, 0.75);color: white;'>";
							}
							else {
								if (matriz[i][41] == "0") contenido2 += "<td>";
								else contenido2 += "<td style='background: rgba(247, 147, 140, 0.75);color: white;'>";
							}
							switch (j) {
								case 0:
									if (identificador != "OP21ReportePrincipal") {
										switch (matriz[i][matrizIndice[j]]) {
											case "1":
												contenido2 += "Procedimientos y Consultas sin médico o especialidad";
												break;
											case "2":
												contenido2 += "Procedimientos y Consultas pendientes de cierre de emergencia";
												break;
											case "3":
												contenido2 += "Procedimientos y Consultas pendientes de atención";
												break;
											case "4":
												contenido2 += "Consultas sin anamnesis";
												break;
											case "5":
												contenido2 += "Procedimientos sin informe médico";
												break;
										}
									} else {
										contenido2 += "Pendientes de Provisión - Producción";
									}
									break;
								case 1:
									contenido2 += buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 3:
									contenido2 += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 8:
									contenido2 += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 12:
								case 13:
									contenido2 += formatearNumero(matriz[i][matrizIndice[j]]);
									break;
								case 15:
									contenido2 += buscarEnLista(listaDocumentoEstados, "44," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 22:
									contenido2 += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 24:
									contenido2 += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 26:
									contenido2 += buscarEnLista(listaModalidadFacturacion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 31:
								case 32:
								case 33:
								case 34:
								case 39:
								case 43:
									contenido2 += (matriz[i][matrizIndice[j]] == "SI" ? "SI" : "NO");
									break;
								case 36:
									contenido2 += buscarEnLista(listaDocumentoEstados, "41," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 37:
									contenido2 += buscarEnLista(listaDocumentoEstados, "54," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 38:
									contenido2 += buscarEnLista(listaDocumentoEstados, "101," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 40:
									contenido2 += buscarEnLista(listaDocumentoEstados, "100," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 42:
									contenido2 += buscarEnLista(listaDocumentoEstados, "51," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 18:
								case 20:
								case 41:
								case 44:
									contenido2 += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
									break;
								case 45:
									switch (matriz[i][matrizIndice[j]]) {
										case "P":
											contenido2 += "PENDIENTE";
											break;
										case "I":
											contenido2 += "INFORMATIVO";
											break;
										default:
											contenido2 += "";
											break;
									}
									break;
								default:
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
			case "OP22ReportePrincipal":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 7) contenido2 += "<td style='text-align:right'>";
							else contenido2 += "<td>";
							switch (j) {
								case 0:
									contenido2 += "Pendientes de Provisión - Horario";
									break;
								case 1:
									contenido2 += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
									break;
								case 11:
									contenido2 += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
									break;
								default:
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
			case "OP23ReportePrincipal":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 7) contenido2 += "<td style='text-align:right'>";
							else contenido2 += "<td>";
							switch (j) {
								case 0:
									contenido2 += "Pendientes de Provisión - Monto Fijo";
									break;
								case 1:
									contenido2 += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, false));
									break;
								case 10:
									contenido2 += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
									break;
								default:
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
			case "OP3ReportePrincipal":
				var valorFor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 8 || j == 22 || j == 33 || j == 34) {
								contenido2 += "<td style='text-align:right'>";
							}
							else {
								contenido2 += "<td>";
							}
							switch (j) {
								case 0:
									contenido2 += (matriz[i][matrizIndice[0]] == "" ? "Varios" : buscarDescripcionSucursal(listaSucursal,matriz[i][matrizIndice[0]]));
									break;
								case 7:
									contenido2 += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
									break;
								case 3:
									contenido2 += (matriz[i][matrizIndice[j]] == "J" ? "JURIDICA" : "NATURAL");
									break;
								case 6:
								case 11:
								case 36:
									contenido2 += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
									break;
								case 8:
								case 29:
									contenido2 += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
									break;
								case 12:
								case 15:
									contenido2 += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
									break;
								case 18:
									switch (matriz[i][matrizIndice[j]]) {
										case 'T':
											contenido2 += 'TERCERO';
											break;
										case 'E':
											contenido2 += 'EMPLEADO';
											break;
										case 'C':
											contenido2 += 'CORTESIA';
											break;
										default:
											contenido2 += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 23:
									switch (matriz[i][matrizIndice[j]]) {
										case 'C':
											contenido2 += 'CONFIGURACIÓN';
											break;
										case 'B':
											contenido2 += 'BONIFICACIÓN';
											break;
										default:
											contenido2 += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 24:
									contenido2 += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 25:
									contenido2 += buscarEnLista(listaTipoAdmision, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 26:
									contenido2 += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 27:
									contenido2 += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 30:
									contenido2 += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 31:
									contenido2 += buscarEnLista(listaTurno, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 32:
									switch (matriz[i][matrizIndice[j]]) {
										case 'P':
											contenido2 += 'PORCENTAJE';
											break;
										case 'M':
											contenido2 += 'MONTO';
											break;
										case 'F':
											contenido2 += 'FACTOR';
											break;
										case 'D':
											contenido2 += 'PAGO DOBLE';
											break;
										case 'H':
											contenido2 += 'HORARIO';
											break;
										case 'T':
											contenido2 += 'TURNO';
											break;
										default:
											contenido2 += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 35:
									switch (matriz[i][matrizIndice[j]]) {
										case 'T':
											contenido2 += 'TODOS';
											break;
										case 'A':
											contenido2 += 'ALGUNOS';
											break;
										case 'E':
											contenido2 += 'EXCEPTO';
											break;
									}
									break;
								case 33:
								case 34:
									contenido2 += formatearNumero(matriz[i][matrizIndice[j]]);
									break;
								default:
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
			default:
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								default:
									contenido2 += "<td>";
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
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
function buscarDescripcionSucursal(lista,valor){
	var n=lista.length,campos,cadena="";;
	for(var i=0;i<n;i++){
		campos=lista[i];
		if(valor.indexOf(campos[0])>-1){
			cadena+=campos[1];
			cadena+=" -";
		}
	}
	return cadena.substring(0,cadena.length-1);
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
	var aPagina = document.getElementById("a" + identificador + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function configurarControles() {
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		var ddlReporteConsolidado = document.getElementById("ddlReporteConsolidado").value;
		var url = urlBase + "Control/ReporteControlConsolidadoListar?ss=" + ss + "&opc=" + ddlReporteConsolidado;
		var lista = "";
		switch (ddlReporteConsolidado) {
			case "1":
				var BUSOP1cboMes = document.getElementById("BUSOP1cboMes").value;
				var BUSOP1txtAnio = document.getElementById("BUSOP1txtAnio").value;
				lista = BUSOP1txtAnio + "¦" + BUSOP1cboMes;
				break;
			case "2":
				var BUSOP2cboMes = document.getElementById("BUSOP2cboMes").value;
				var BUSOP2txtAnio = document.getElementById("BUSOP2txtAnio").value;
				lista = BUSOP2txtAnio + "¦" + BUSOP2cboMes;
				break;
		}
		$.ajax(url, "post", ObtenerReporte, lista);
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.disabled = true;
		this.style.pointerEvents = "none";
	}

	var ddlReporteConsolidado = document.getElementById("ddlReporteConsolidado");
	ddlReporteConsolidado.onchange = function () {
		var divOP1Principal = document.getElementById("divOP1Principal");
		var divOP2Principal = document.getElementById("divOP2Principal");
		var divOP3Principal = document.getElementById("divOP3Principal");
		var divOP4Principal = document.getElementById("divOP4Principal");
		var btnExportar = document.getElementById("btnExportar");
		var btnBuscar = document.getElementById("btnBuscar");
		if (this.value == "4") {
			btnExportar.style.display = "none";
			btnBuscar.style.display = "none";
		} else {
			btnExportar.style.display = "";
			btnBuscar.style.display = "";
		}
		switch (this.value) {
			case "1":
				divOP1Principal.style.display = "";
				divOP2Principal.style.display = "none";
				divOP3Principal.style.display = "none";
				divOP4Principal.style.display = "none";
				break;
			case "2":
				divOP1Principal.style.display = "none";
				divOP2Principal.style.display = "";
				divOP3Principal.style.display = "none";
				divOP4Principal.style.display = "none";
				break;
			case "3":
				divOP1Principal.style.display = "none";
				divOP2Principal.style.display = "none";
				divOP3Principal.style.display = "";
				divOP4Principal.style.display = "none";
				break;
			case "4":
				divOP1Principal.style.display = "none";
				divOP2Principal.style.display = "none";
				divOP3Principal.style.display = "none";
				divOP4Principal.style.display = "";
				break;
		}
	}

	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		document.getElementById("btnBuscar").disabled = true;
		document.getElementById("btnBuscar").style.pointerEvents = "none";
		document.getElementById("ddlReporteConsolidado").disabled = true;
		document.getElementById("ddlReporteConsolidado").style.pointerEvents = "none";

		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.disabled = true;
		this.style.pointerEvents = "none";
		var ddlReporteConsolidado = document.getElementById("ddlReporteConsolidado").value;
		var lista = "";
		switch (ddlReporteConsolidado) {
			case "1":
				var BUSOP1cboMes = document.getElementById("BUSOP1cboMes").value;
				var BUSOP1txtAnio = document.getElementById("BUSOP1txtAnio").value;
				lista = BUSOP1txtAnio + "¦" + BUSOP1cboMes;
				break;
			case "2":
				var BUSOP2cboMes = document.getElementById("BUSOP2cboMes").value;
				var BUSOP2txtAnio = document.getElementById("BUSOP2txtAnio").value;
				lista = BUSOP2txtAnio + "¦" + BUSOP2cboMes;
				break;
		}

		reporteActual = ddlReporteConsolidado;
		var url = urlBase + "Control/CreacionExcelConsolidado?ss=" + ss + "&opc=" + ddlReporteConsolidado + "&param=" + lista;
		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.responseType = 'blob';
		xhr.onreadystatechange = function () {
			if (xhr.status == 200 && xhr.readyState == 4) {
				descargaExcel(xhr.response);
			}
		}
		xhr.send();
	}

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

	var OP4btnBuscar = document.getElementById("OP4btnBuscar");
	OP4btnBuscar.onclick = function () {

		var ddlPeriodo = document.getElementById("OP4ddlPeriodo").value;
		if (ddlPeriodo == "") {
			mostraralerta("No se ha seleccionado un periodo");
		}
		else {
			var strDatos = "";
			var ddlReporteConsolidado = document.getElementById("ddlReporteConsolidado").value;
			var hdfMedico = document.getElementById("hdfMedico").value,
				hdfEmpresa = document.getElementById("hdfEmpresa").value,
				ddlTipoAdm = document.getElementById("OP4ddlTipoAdmision").value,
				ddlEspecialidad = document.getElementById("OP4ddlEspecialidad").value;
			var OP4ddlSucursal = document.getElementById("OP4ddlSucursal").value;
			strDatos = OP4ddlSucursal + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
			//var url = urlBase + "Control/listarReporteDetallado/?ss=" + ss + "&tipo=" + ddlTipoReporte;
			//$.ajax(url, "post", ExportarOP4, strDatos);

			var url = urlBase + "Control/CreacionExcelConsolidado?ss=" + ss + "&opc=" + ddlReporteConsolidado + "&param=";
			var xhr = new XMLHttpRequest();
			xhr.open("post", url);
			xhr.responseType = 'blob';
			xhr.onreadystatechange = function () {
				if (xhr.status == 200 && xhr.readyState == 4) {
					descargaExcel(xhr.response);
				}
			}
			xhr.send(strDatos);


			document.getElementById("btnBuscar").disabled = true;
			document.getElementById("btnBuscar").style.pointerEvents = "none";
			document.getElementById("ddlReporteConsolidado").disabled = true;
			document.getElementById("ddlReporteConsolidado").style.pointerEvents = "none";
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.disabled = true;
			this.style.pointerEvents = "none";
			reporteActual = ddlReporteConsolidado;
		}

	}

	var btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.onclick = function () {
        var hdfMedico = document.getElementById("hdfMedico"),
            OP4ddlSucursal = document.getElementById("OP4ddlSucursal"),
            hdfEmpresa = document.getElementById("hdfEmpresa"),
            ddlTipoAdm = document.getElementById("OP4ddlTipoAdmision"),
            txtMedico = document.getElementById("txtMedico"),
            txtEmpresa = document.getElementById("txtEmpresa"),
            ddlEspecialidad = document.getElementById("OP4ddlEspecialidad"),
            ddlPeriodo = document.getElementById("OP4ddlPeriodo");
        hdfMedico.value = "0";
        hdfEmpresa.value = "0";
        ddlTipoAdm.selectedIndex = "0";
        ddlEspecialidad.selectedIndex = "0";
        ddlPeriodo.selectedIndex = "0";
        OP4ddlSucursal.selectedIndex = "0";
        txtMedico.value = "";
        txtEmpresa.value = "";
    }
}

/****************CALLBACKS********************/

function ObtenerListas(rpta) {
	if (rpta != "") {
		var datos = rpta.split("¯");
		listaSucursal = crearMatriz(datos[0].split("¬"), "¦");
		listaTipoAtencion = crearMatriz(datos[1].split("¬"), "¦");
		listaTipoServicio = crearMatriz(datos[2].split("¬"), "¦");
		listaComponente = crearMatriz(datos[3].split("¬"), "¦");
		listaDocumentoEstados = crearMatriz(datos[4].split("¬"), "¦");
		listaMedicoEmpresa = crearMatriz(datos[5].split("¬"), "¦");
		listaEspecialidad = crearMatriz(datos[6].split("¬"), "¦");
		listaAseguradora = crearMatriz(datos[7].split("¬"), "¦");
		listaModalidadFacturacion = crearMatriz(datos[8].split("¬"), "¦");
		listaTipoPaciente = crearMatriz(datos[9].split("¬"), "¦");
		listaTipoAdmision = crearMatriz(datos[10].split("¬"), "¦");
		listaTurno = crearMatriz(datos[11].split("¬"), "¦");
		listaConfiguracionPago = crearMatriz(datos[12].split("¬"), "¦");
		listaUnidadMedica = crearMatriz(datos[13].split("¬"), "¦");
		listaConceptoMontoFijo = crearMatriz(datos[14].split("¬"), "¦");
		llenarCombo(listaSucursal, "ddlSucursal", "0,1", "Todos");
		llenarCombo(listaSucursal, "OP21ddlSucursal", "0,1", "Todos");
		llenarCombo(listaSucursal, "OP23ddlSucursalMedico", "0,1", "Todos");
		llenarCombo(listaSucursal, "OP3ddlSucursalMedico", "0,1", "Todos");
		llenarCombo(listaSucursal, "OP3ddlSucursalContrato", "0,1", "Todos");
		llenarCombo(listaSucursal, "OP4ddlSucursal", "0,1", "Todos");
		llenarCombo(listaTipoAtencion, "ddlTipoAtencion", "0,1", "Todos");
		llenarCombo(listaTipoAtencion, "OP21ddlTipoAtencion", "0,1", "Todos");
		llenarCombo(listaTipoAtencion, "OP3ddlTipoAtencion", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "ddlEspecialidad", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "OP21ddlEspecialidad", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "OP3ddlEspecialidad", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "OP4ddlEspecialidad", "0,1", "Todos");
		llenarCombo(listaTipoServicio, "ddlTipoServicio", "0,1", "Todos");
		llenarCombo(listaTipoServicio, "OP21ddlTipoServicio", "0,1", "Todos");
		llenarCombo(listaTipoServicio, "OP3ddlTipoServicio", "0,1", "Todos");
		llenarCombo(listaTipoPaciente, "ddlTipoPaciente", "0,1", "Todos");
		llenarCombo(listaTipoPaciente, "OP21ddlTipoPaciente", "0,1", "Todos");
		llenarCombo(listaTipoPaciente, "OP3ddlTipoPaciente", "0,1", "Todos");
		llenarCombo(listaTipoAdmision, "OP3ddlTipoAdmision", "0,1", "Todos");
		llenarCombo(listaTipoAdmision, "OP4ddlTipoAdmision", "0,1", "Todos");
		llenarCombo(listaTurno, "OP3ddlTurno", "0,1", "Todos");
		llenarCombo(listaModalidadFacturacion, "ddlModFacturacion", "0,1", "Todos");
		llenarCombo(listaModalidadFacturacion, "OP21ddlModFacturacion", "0,1", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoTransaccion", "1,2", "41", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoTransaccion", "1,2", "41", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoOA", "1,2", "44", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoOA", "1,2", "44", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoHospitalizacion", "1,2", "54", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoHospitalizacion", "1,2", "54", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoSitDetalleHosp", "1,2", "101", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoSitDetalleHosp", "1,2", "101", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoSitDetalleExp", "1,2", "100", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoSitDetalleExp", "1,2", "100", "Todos");
		llenarCombo2(listaDocumentoEstados, "ddlEstadoPlanilla", "1,2", "51", "Todos");
		llenarCombo2(listaDocumentoEstados, "OP21ddlEstadoPlanilla", "1,2", "51", "Todos");

		document.getElementById("BUSOP1cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
		document.getElementById("BUSOP2cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;

	}

	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Control/ListasReporteDetalladoProvision/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarCombo);

}

function ObtenerReporte(rpta) {
	matrizOP1ReportePrincipal = [], matrizOP21ReportePrincipal = [], matrizOP22ReportePrincipal = [], matrizOP23ReportePrincipal = [], matrizOP3ReportePrincipal = [];
	paginar(-1, "OP1ReportePrincipal");
	paginar(-1, "OP21ReportePrincipal");
	paginar(-1, "OP22ReportePrincipal");
	paginar(-1, "OP23ReportePrincipal");
	paginar(-1, "OP3ReportePrincipal");
	if (rpta != "") {
		var datos = [];
		datos = rpta.split("¯");
		switch (datos[0]) {
			case "1":
				var matriz = datos[1].split("¬");
				if (matriz.length > 30000) {
					var confirmar = confirm("La cantidad de registros ha excedido el límite, ¿Desea descargar en archivo Excel?");
					if (confirmar) {
						document.getElementById("btnExportar").click();
					}
				}
				else {
					crearMatriz(datos[1].split("¬"), "¦", "OP1ReportePrincipal", "10,11,12", "5,7,24,25,26,27");
					document.getElementById("spnOP1Total").innerHTML = matrizOP1ReportePrincipal.length;
					document.getElementById("spnOP1Fecha").innerHTML = datos[2];
					paginar(-1, "OP1ReportePrincipal");
					document.getElementById("spnOP2Total").innerHTML = "";
					document.getElementById("spnOP3Total").innerHTML = "";
				}
				break;
			case "2":
				var matriz1 = datos[1].split("¬");
				var matriz2 = datos[2].split("¬");
				var matriz3 = datos[3].split("¬");
				var sumatoria = matriz1.length + matriz2.length + matriz3.length;
				if (sumatoria > 30000) {
					var confirmar = confirm("La cantidad de registros ha excedido el límite, ¿Desea descargar en archivo Excel?");
					if (confirmar) {
						document.getElementById("btnExportar").click();
					}
				}
				else {
					crearMatriz(matriz1, "¦", "OP21ReportePrincipal", "", "5,7,24,25,26,27");
					crearMatriz(matriz2, "¦", "OP22ReportePrincipal", "", "3");
					crearMatriz(matriz3, "¦", "OP23ReportePrincipal", "", "4,5");
					paginar(-1, "OP21ReportePrincipal");
					paginar(-1, "OP22ReportePrincipal");
					paginar(-1, "OP23ReportePrincipal");
					var ulTabsD = document.getElementById("ulTabsD");
					var tabs = ulTabsD.getElementsByClassName("tab-link");
					var idx = 0;
					for (var y = 0; y < tabs.length; y++) {
						if (tabs[y].className.indexOf("current") > -1) {
							idx = y;
							break;
						}
					}
					switch (idx) {
						case 0:
							document.getElementById("spnOP2Total").innerHTML = matrizOP21ReportePrincipal.length;
							break;
						case 1:
							document.getElementById("spnOP2Total").innerHTML = matrizOP22ReportePrincipal.length;
							break;
						case 2:
							document.getElementById("spnOP2Total").innerHTML = matrizOP23ReportePrincipal.length;
							break;
					}
					document.getElementById("spnFecha2").innerHTML = datos[4];
					document.getElementById("spnOP1Total").innerHTML = "";
					document.getElementById("spnOP1Fecha").innerHTML = "";
					document.getElementById("spnOP3Total").innerHTML = "";
				}
				break;
			case "3":
				var matriz = datos[1].split("¬");
				if (matriz.length > 30000) {
					var confirmar = confirm("La cantidad de registros ha excedido el límite, ¿Desea descargar en archivo Excel?");
					if (confirmar) {
						document.getElementById("btnExportar").click();
					}
				}
				else {
					crearMatriz(matriz, "¦", "OP3ReportePrincipal", "28,29", '4,5,15,16');
					document.getElementById("spnOP3Total").innerHTML = matrizOP3ReportePrincipal.length;
					paginar(-1, "OP3ReportePrincipal");
					document.getElementById("spnOP1Total").innerHTML = "";
					document.getElementById("spnOP1Fecha").innerHTML = "";
					document.getElementById("spnOP2Total").innerHTML = "";
				}
				break;
		}
	}
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.innerHTML = "Buscar";
	btnBuscar.disabled = false;
	btnBuscar.style.pointerEvents = "auto";
}

function listarCombo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		var listaPeriodo = data[0] != "" ? data[0].split("¯") : [];
		var contenido = "";
		var n = listaPeriodo.length;
		var valor = "";
		var campos = "";
		contenido = "<option value=''>Seleccione</option>";

		for (var x = 0; x < n; x++) {
			campos = listaPeriodo[x].split("¦");
			contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";

		}

		var cbo = document.getElementById("OP4ddlPeriodo");
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
}

function ExportarOP4(r) {
	console.log(r);
	var OP4btnBuscar = document.getElementById("OP4btnBuscar");
	OP4btnBuscar.onclick = function () {
		var strDatos = "";
		var hdfMedico = document.getElementById("hdfMedico").value,
			hdfEmpresa = document.getElementById("hdfEmpresa").value,
			ddlPeriodo = document.getElementById("OP4ddlPeriodo").value,
			ddlTipoAdm = document.getElementById("OP4ddlTipoAdmision").value,
			ddlEspecialidad = document.getElementById("OP4ddlEspecialidad").value;
		var ddlTipoReporte = 1;
		ddlEspecialidad = document.getElementById("OP4ddlEspecialidad").value;
		var OP4ddlSucursal = document.getElementById("OP4ddlSucursal").value;
		strDatos = OP4ddlSucursal + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
		var url = urlBase + "Control/listarReporteDetallado/?ss=" + ss + "&tipo=" + ddlTipoReporte;
		$.ajax(url, "post", ExportarOP4, strDatos);
		document.getElementById("OP4btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.onclick = null;
		tipoReporte = ddlTipoReporte;

	}

	if (r != "" && r != "¬") {
		var data = r.split("¬"), nRgs = 0, campos, objExls = {};
		var dtPro = data[0].split("¯"), dtHor = data[1].split("¯"), dtPer = data[2].split("¯");
		if (tipoReporte == "1") {
			MtzPro = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING", "Indicador Honorario",
				"EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
				"Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo", "Cuenta Proveedor", "Id.Doc.Contable",
				"Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision", "Indicador No Visible Planilla"]];
			MtzHor = [["SucursalId", "Sucursal", "Periodo", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico",
				"Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "Cuenta Costo", "Cuenta Proveedor",
				"Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];
			MtzPer = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe",
				"Concepto Monto Fijo Id", "Concepto", "Cuenta Costo", "Cuenta Proveedor",
				"Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];
		} else {
			MtzPro = [["Periodo Planilla", "Periodo Provision", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla", "Id Estado Planilla", "Indicador Honorario",
				"EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
				"Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago", "Id.Doc.Contable"]];
			MtzHor = [["SucursalId", "Sucursal", "Periodo Planilla", "Periodo Provision", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico", "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago"]];
			MtzPer = [["Periodo Planilla", "Periodo Provision", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe", "Concepto Monto Fijo Id", "Concepto", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago"]];

		}
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
						if (tipoReporte == "1") campos[12] = (campos[12] == "False" ? "No" : "Sí");
						else campos[13] = (campos[13] == "False" ? "No" : "Sí");
						MtzHor.push(campos);
						break;
					case 2:
						campos = dtPer[j].split("¦");
						if (tipoReporte == "1") {
							campos[3] = campos[3] * 1;
							campos[5] = campos[5] * 1;
							campos[9] = campos[9] * 1;
							campos[8] = campos[8] * 1;
						} else {
							campos[4] = campos[4] * 1;
							campos[6] = campos[6] * 1;
							campos[10] = campos[10] * 1;
							campos[9] = campos[9] * 1;
						}
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
			datos = exportarExcelOP4(MtzPro, MtzHor, MtzPer);
		}
		if (datos != "") {
			anchorElem = document.createElement('a');
			var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", (tipoReporte == "1" ? "ReporteDetalladoProvision.xls" : "ReporteDetalladoPlanilla.xls"));
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			elem = document.getElementById("atemp");
			elem.parentNode.removeChild(elem);
		} else {
			mostraralerta("No se encontraron registros");
		}
		OP4btnBuscar.innerHTML = "Descargar";

	} else {
		OP4btnBuscar.innerHTML = "Descargar";
	}
}

/****************FUNCIONES GENERICAS********************/

function buscarIdx(matriz, indice, idxbi) {
	if (idxbi == undefined) {
		for (var x = 0; x < matriz.length; x++) {
			if (matriz[x] == indice) {
				return true;
				break;
			}
		}
	} else {
		for (var x = 0; x < matriz.length; x++) {
			if (matriz[x][idxbi] == indice) {
				return true;
				break;
			}
		}
	}
	return false;
}

function buscarEnLista(lista, valor, posicion, posrespuesta, exacto, separador, sepcampo) {
	var matriz = [], valBusqueda, valBusquedaPos, contenido = "";
	if (separador != undefined) {
		var datos = lista.split(separador);
		if (sepcampo != undefined) {
			for (var x = 0; x < datos.length; x++) {
				matriz[x] = datos[x].split(sepcampo).slice(0);
			}
		}
		else {
			matriz = datos.slice(0);
		}
	}
	else {
		matriz = lista.slice(0);
	}

	if (exacto) {
		if (valor.split(",").length > 1) {
			valBusqueda = valor.split(",");
			valBusquedaPos = posicion.split(",");
			for (var y = 0; y < valBusqueda.length; y++) {
				contenido += "matriz[x][" + valBusquedaPos[y] + "] == " + valBusqueda[y];
				if (y < (valBusqueda.length - 1)) {
					contenido += "&&";
				}
			}
			for (var x = 0; x < matriz.length; x++) {
				if (eval(contenido)) {
					return matriz[x][posrespuesta];
					break;
				}
			}
		}
		else {
			for (var x = 0; x < matriz.length; x++) {
				if (matriz[x][posicion] == valor) {
					return matriz[x][posrespuesta];
					break;
				}
			}
		}
	} else {
		if (valor.split(",").length > 1) {
			valBusqueda = valor.split(",");
			valBusquedaPos = posicion.split(",");
			for (var y = 0; y < valBusqueda.length; y++) {
				contenido += "matriz[x][" + valBusquedaPos[y] + "].indexOf(" + valBusqueda[y] + ")>-1";
				if (y < (valBusqueda.length - 1)) {
					contenido += "&&";
				}
			}
			for (var x = 0; x < matriz.length; x++) {
				if (eval(contenido)) {
					return matriz[x][posrespuesta];
					break;
				}
			}
		} else {
			for (var x = 0; x < matriz.length; x++) {
				if (matriz[x][posicion].indexOf(valor) > -1) {
					return matriz[x][posrespuesta];
					break;
				}
			}
		}
	}
	return (typeof (valor) == "string" ? "" : 0);
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
		if (titulo != undefined || titulo.trim() != "") {
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

function llenarCombo2(lista, nombreCombo, indice, idxbus, titulo, separador) {
	var contenido = "", n = lista.length, campo;
	var pos = indice.split(",");
	if (n > 0) {
		if (titulo != undefined || titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
		}
		for (var x = 0; x < n; x++) {
			campos = (separador != undefined && separador != "" ? lista[x].split(separador) : lista[x]);
			if (idxbus == campos[0]) {
				contenido += "<option value='" + campos[pos[0]] + "'>" + campos[pos[1]] + "</option>";
			}
		}

		var cbo = document.getElementById(nombreCombo);
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

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

function mostrarTabs(actual, ultab) {
	var tabs = document.getElementById(ultab);
	var listaTabs = tabs.getElementsByTagName("li");
	var contenido;
	var data_tab, data_tab_actual;
	var idxactual = -1
	for (var i = 0; i < listaTabs.length; i++) {
		data_tab = listaTabs[i].getAttribute("data-tab");
		data_tab_actual = actual.getAttribute("data-tab");
		contenido = document.getElementById(data_tab);
		if (data_tab == data_tab_actual) {
			listaTabs[i].className = "tab-link current";
			contenido.className = "tab-content current";
			idxactual = i;
		}
		else {
			if (listaTabs[i].className.indexOf("bloqueado") > -1) listaTabs[i].className = "tab-link bloqueado";
			else listaTabs[i].className = "tab-link";
			contenido.className = "tab-content";
		}
	}

	switch (idxactual) {
		case 0:
			document.getElementById("spnOP2Total").innerHTML = matrizOP21ReportePrincipal.length;
			break;
		case 1:
			document.getElementById("spnOP2Total").innerHTML = matrizOP22ReportePrincipal.length;
			break;
		case 2:
			document.getElementById("spnOP2Total").innerHTML = matrizOP23ReportePrincipal.length;
			break;
	}
}

/****************EXPORTACIONES********************/

function exportarExcelOP4(matriz1, matriz2, matriz3) {
	var contenido = "";
	if (matriz1.length > 0 || matriz2.length > 0 || matriz3.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [];
		for (var x = 0; x < 3; x++) {
			switch (x) {
				case 0:
					n = matriz1.length;
					ncampos = matriz1[0].length;
					matriz = matriz1.slice(0);
					if (tipoReporte == "1") {
						matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140];
					} else {
						matrizAnchos = [140, 140, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 140, 140, 140, 140, 140, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140];
					}
					nombre = "Producción";
					break;
				case 1:
					n = matriz2.length;
					ncampos = matriz2[0].length;
					matriz = matriz2.slice(0);
					nombre = "Horario";
					if (tipoReporte == "1") {
						matrizAnchos = [70, 100, 65, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140, 140];
					} else {
						matrizAnchos = [70, 100, 140, 140, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140];
					}
					break;
				case 2:
					n = matriz3.length;
					ncampos = matriz3[0].length;
					matriz = matriz3.slice(0);
					nombre = "Monto Fijo";
					if (tipoReporte == "1") {
						matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140, 140];
					} else {
						matrizAnchos = [140, 140, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140];
					}
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
							if (tipoReporte == "1") {
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
												contenido += matriz[z][y] * 1;
												break;
											case 23:
												contenido += '<Cell ss:StyleID="s63">';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y] * 1;
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
												contenido += matriz[z][y] * 1;
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
												contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
												break;
											case 45:
											case 46:
											case 48:
											case 55:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="String">';
												contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
												break;
											default:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="String">';
												contenido += matriz[z][y].toString();
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
							} else {
								switch (x) {
									case 0:
										switch (y) {
											case 4:
											case 6:
											case 10:
											case 11:
											case 12:
											case 42:
											case 43://41
											case 44://42
												contenido += '<Cell>';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y] * 1;
												break;
											case 24:
												contenido += '<Cell ss:StyleID="s63">';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y] * 1;
												break;
											case 20:
											case 21:
											case 22:
											case 23:
											case 26:
											case 27:
											case 28:
											case 29:
											case 39:
											case 40:
												contenido += '<Cell ss:StyleID="s65">';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y] * 1;
												break;
											case 17:
											case 18:
											case 19:
											case 30:
											case 51:
											case 57:
												contenido += '<Cell ss:StyleID="s62">';
												//contenido += '<Data ss:Type="DateTime">';
												contenido += '<Data ss:Type="String">';
												if (y == 57) {
													contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
												} else {
													contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
												}
												break;
											case 46:
											case 47:
											case 49:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="String">';
												contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
												break;
											default:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="String">';
												contenido += matriz[z][y].toString();
												break;
										}
										break;
									case 1:
										switch (y) {
											case 4:
											case 6:
											case 21:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y];
												break;
											case 14:
											case 15:
											case 16:
											case 17:
												contenido += '<Cell ss:StyleID="s65">';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y];
												break;
											case 27:
												contenido += '<Cell ss:StyleID="s62">';
												contenido += '<Data ss:Type="String">';
												contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
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
											case 4:
											case 6:
											case 10:
												contenido += '<Cell>';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y];
												break;
											case 16:
												contenido += '<Cell ss:StyleID="s62">';
												contenido += '<Data ss:Type="String">';
												contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
												break;
											case 9:
												contenido += '<Cell ss:StyleID="s65">';
												contenido += '<Data ss:Type="Number">';
												contenido += matriz[z][y];
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

function exportarArchivoExcelVarios(opcion, lista, pestania, partir, indicePartir, JIndex) {
	var contenido = "";
	var matrizNombres = lista.split(",");
	var matrizPestania = pestania.split(",");
	if (matrizNombres.join("").trim() == "") {
		return contenido;
	}
	var nx = (matrizNombres.length);
	contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style>';
	contenido += '<Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>';
	contenido += '<Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style>';
	contenido += '<Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/>';
	contenido += '<Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
	var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [], valorFor;
	for (var x = 0; x < nx; x++) {
		matriz = (window["matriz" + matrizNombres[x]].length > 0 && matrizNombres[x].trim() != "" ? window["matriz" + matrizNombres[x]].slice(0) : []);
		matrizCabecera = window["cabeceras" + matrizNombres[x]].slice(0);
		matrizAnchos = window["anchos" + matrizNombres[x]].slice(0);
		matrizIndice = window["matrizIndice" + matrizNombres[x]].slice(0);
		n = matriz.length;
		ncampos = matrizCabecera.length;
		nombre = (matrizPestania[x].trim() == "" ? "OPCION " + (x + 1) : matrizPestania[x]);

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

		for (var i = JIndex; i < n; i++) {
			if (matriz[i][indicePartir] == partir) {
				contenido += "<Row>";
				for (j = 0; j < ncampos; j++) {
					switch (opcion) {
						case "1":
							switch (j) {
								case 0:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									switch (matriz[i][matrizIndice[j]]) {
										case "1":
											contenido += "Procedimientos y Consultas sin médico o especialidad";
											break;
										case "2":
											contenido += "Procedimientos y Consultas pendientes de cierre de emergencia";
											break;
										case "3":
											contenido += "Procedimientos y Consultas pendientes de atención";
											break;
										case "4":
											contenido += "Consultas sin anamnesis";
											break;
										case "5":
											contenido += "Procedimientos sin informe médico";
											break;
									}
									break;
								case 1:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 3:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 8:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 12:
								case 13:
									contenido += '<Cell ss:StyleID="s65">';
									contenido += '<Data ss:Type="Number">';
									contenido += matriz[i][matrizIndice[j]] * 1;
									break;
								case 15:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "44," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 22:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 24:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 26:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaModalidadFacturacion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 31:
								case 32:
								case 33:
								case 34:
								case 39:
								case 43:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
									break;
								case 36:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "41," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 37:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "54," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 38:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "101," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 40:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "100," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 42:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaDocumentoEstados, "51," + matriz[i][matrizIndice[j]], "0,1", 2, true);
									break;
								case 18:
								case 20:
								case 41:
								case 44:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
									break;
								default:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += matriz[i][matrizIndice[j]];
									break;
							}
							break;
						case "3":
							switch (j) {
								case 0:
								case 7:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
									break;
								case 3:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "J" ? "JURIDICA" : "NATURAL");
									break;
								case 6:
								case 11:
								case 36:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
									break;
								case 8:
								case 29:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
									break;
								case 12:
								case 15:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
									break;
								case 18:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									switch (matriz[i][matrizIndice[j]]) {
										case 'T':
											contenido += 'TERCERO';
											break;
										case 'E':
											contenido += 'EMPLEADO';
											break;
										case 'C':
											contenido += 'CORTESIA';
											break;
										default:
											contenido += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 23:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									switch (matriz[i][matrizIndice[j]]) {
										case 'C':
											contenido += 'CONFIGURACIÓN';
											break;
										case 'B':
											contenido += 'BONIFICACIÓN';
											break;
										default:
											contenido += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 24:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 25:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoAdmision, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 26:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 27:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 30:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 31:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += buscarEnLista(listaTurno, matriz[i][matrizIndice[j]], 0, 1, true);
									break;
								case 32:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									switch (matriz[i][matrizIndice[j]]) {
										case 'P':
											contenido += 'PORCENTAJE';
											break;
										case 'M':
											contenido += 'MONTO';
											break;
										case 'F':
											contenido += 'FACTOR';
											break;
										case 'D':
											contenido += 'PAGO DOBLE';
											break;
										case 'H':
											contenido += 'HORARIO';
											break;
										case 'T':
											contenido += 'TURNO';
											break;
										default:
											contenido += matriz[i][matrizIndice[j]];
											break;
									}
									break;
								case 35:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									switch (matriz[i][matrizIndice[j]]) {
										case 'T':
											contenido += 'TODOS';
											break;
										case 'A':
											contenido += 'ALGUNOS';
											break;
										case 'E':
											contenido += 'EXCEPTO';
											break;
									}
									break;
								case 33:
								case 34:
									contenido += '<Cell ss:StyleID="s65">';
									contenido += '<Data ss:Type="Number">';
									contenido += matriz[i][matrizIndice[j]] * 1;
									break;
								default:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += matriz[i][matrizIndice[j]];
									break;

							}
							break;
					}
					contenido += '</Data>';
					contenido += '</Cell>';
				}
				contenido += "</Row>";
			}
			else {
				indiceExcelActualArchivos = (i + 1);
				break;
			}
		}
		contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
	}
	contenido += '</Workbook>';
	return contenido;
}

function exportarArchivoExcel(opcion, lista, pestania) {
	var contenido = "";
	var matrizNombres = lista.split(",");
	var matrizPestania = pestania.split(",");
	if (matrizNombres.join("").trim() == "") {
		return contenido;
	}
	var nx = (matrizNombres.length);
	contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style>';
	contenido += '<Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>';
	contenido += '<Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style>';
	contenido += '<Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/>';
	contenido += '<Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
	var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [], valorFor;
	for (var x = 0; x < nx; x++) {
		matriz = (window["matriz" + matrizNombres[x]].length > 0 && matrizNombres[x].trim() != "" ? window["matriz" + matrizNombres[x]].slice(0) : []);
		matrizCabecera = window["cabeceras" + matrizNombres[x]].slice(0);
		matrizAnchos = window["anchos" + matrizNombres[x]].slice(0);
		matrizIndice = window["matrizIndice" + matrizNombres[x]].slice(0);
		n = matriz.length;
		ncampos = matrizCabecera.length;
		nombre = (matrizPestania[x].trim() == "" ? "OPCION " + (x + 1) : matrizPestania[x]);

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

		for (var i = 0; i < n; i++) {
			contenido += "<Row>";
			for (j = 0; j < ncampos; j++) {
				switch (opcion) {
					case "1":
						switch (j) {
							case 0:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								switch (matriz[i][matrizIndice[j]]) {
									case "1":
										contenido += "Procedimientos y Consultas sin médico o especialidad";
										break;
									case "2":
										contenido += "Procedimientos y Consultas pendientes de cierre de emergencia";
										break;
									case "3":
										contenido += "Procedimientos y Consultas pendientes de atención";
										break;
									case "4":
										contenido += "Consultas sin anamnesis";
										break;
									case "5":
										contenido += "Procedimientos sin informe médico";
										break;
								}
								break;
							case 1:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 3:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 8:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 12:
							case 13:
								contenido += '<Cell ss:StyleID="s65">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[i][matrizIndice[j]] * 1;
								break;
							case 15:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "44," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 22:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 24:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 26:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaModalidadFacturacion, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 31:
							case 32:
							case 33:
							case 34:
							case 39:
							case 43:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
								break;
							case 36:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "41," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 37:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "54," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 38:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "101," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 40:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "100," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 42:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaDocumentoEstados, "51," + matriz[i][matrizIndice[j]], "0,1", 2, true);
								break;
							case 18:
							case 20:
							case 41:
							case 44:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[i][matrizIndice[j]];
								break;
						}
						break;
					case "3":
						switch (j) {
							case 0:
							case 7:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
								break;
							case 3:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "J" ? "JURIDICA" : "NATURAL");
								break;
							case 6:
							case 11:
							case 36:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
								break;
							case 8:
							case 29:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
								break;
							case 12:
							case 15:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
								break;
							case 18:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								switch (matriz[i][matrizIndice[j]]) {
									case 'T':
										contenido += 'TERCERO';
										break;
									case 'E':
										contenido += 'EMPLEADO';
										break;
									case 'C':
										contenido += 'CORTESIA';
										break;
									default:
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
								break;
							case 23:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								switch (matriz[i][matrizIndice[j]]) {
									case 'C':
										contenido += 'CONFIGURACIÓN';
										break;
									case 'B':
										contenido += 'BONIFICACIÓN';
										break;
									default:
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
								break;
							case 24:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 25:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoAdmision, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 26:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 27:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 30:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 31:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += buscarEnLista(listaTurno, matriz[i][matrizIndice[j]], 0, 1, true);
								break;
							case 32:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								switch (matriz[i][matrizIndice[j]]) {
									case 'P':
										contenido += 'PORCENTAJE';
										break;
									case 'M':
										contenido += 'MONTO';
										break;
									case 'F':
										contenido += 'FACTOR';
										break;
									case 'D':
										contenido += 'PAGO DOBLE';
										break;
									case 'H':
										contenido += 'HORARIO';
										break;
									case 'T':
										contenido += 'TURNO';
										break;
									default:
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
								break;
							case 35:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								switch (matriz[i][matrizIndice[j]]) {
									case 'T':
										contenido += 'TODOS';
										break;
									case 'A':
										contenido += 'ALGUNOS';
										break;
									case 'E':
										contenido += 'EXCEPTO';
										break;
								}
								break;
							case 33:
							case 34:
								contenido += '<Cell ss:StyleID="s65">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[i][matrizIndice[j]] * 1;
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[i][matrizIndice[j]];
								break;

						}
						break;
					case "2":
						switch (x) {
							case 0:
								switch (j) {
									case 0:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										switch (matriz[i][matrizIndice[j]]) {
											case "1":
												contenido += "Procedimientos y Consultas sin médico o especialidad";
												break;
											case "2":
												contenido += "Procedimientos y Consultas pendientes de cierre de emergencia";
												break;
											case "3":
												contenido += "Procedimientos y Consultas pendientes de atención";
												break;
											case "4":
												contenido += "Consultas sin anamnesis";
												break;
											case "5":
												contenido += "Procedimientos sin informe médico";
												break;
										}
										break;
									case 1:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 3:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaTipoAtencion, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 8:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaTipoServicio, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 12:
									case 13:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[i][matrizIndice[j]] * 1;
										break;
									case 15:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "44," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 22:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaEspecialidad, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 24:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaTipoPaciente, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 26:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaModalidadFacturacion, matriz[i][matrizIndice[j]], 0, 1, true);
										break;
									case 31:
									case 32:
									case 33:
									case 34:
									case 39:
									case 43:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[i][matrizIndice[j]] == "1" ? "SI" : "NO");
										break;
									case 36:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "41," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 37:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "54," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 38:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "101," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 40:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "100," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 42:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += buscarEnLista(listaDocumentoEstados, "51," + matriz[i][matrizIndice[j]], "0,1", 2, true);
										break;
									case 18:
									case 20:
									case 41:
									case 44:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[i][matrizIndice[j]] == "0" ? "" : matriz[i][matrizIndice[j]]);
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
								break;
							case 1:
								switch (j) {
									case 0:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += "Pendientes de Provisión - Horario";
										break;
									case 1:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
										break;
									case 11:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
								break;
							case 2:
								switch (j) {
									case 0:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += "Pendientes de Provisión - Monto Fijo";
										break;
									case 1:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true) == "" ? "Varios" : buscarEnLista(listaSucursal, matriz[i][matrizIndice[j]], 0, 1, true));
										break;
									case 10:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[i][matrizIndice[j]] == "A" ? "ACTIVO" : "INACTIVO");
										break;
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[i][matrizIndice[j]];
										break;
								}
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
	contenido += '</Workbook>';
	return contenido;
}

function descargaExcel(rpta) {
	if (rpta.size > 0) {
		var a = document.createElement("a");
		var formBlob = new Blob([rpta], { type: 'application/zip' });
		switch (reporteActual) {
			case "1":
				a.download = "Reportes_de_Seguimiento_Operativo.zip";
				break;
			case "2":
				a.download = "Reporte_de_Pendientes.zip";
				break;
			case "3":
				a.download = "Reporte_Contrato";
				break;
			case "4":
				a.download = "Reporte_Consolidado-Detallado_de_Provision.zip";
				break;
		}
		a.href = URL.createObjectURL(rpta);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	else {
		mostraralerta("No se ha generado el archivo");
	}
	if (reporteActual != "4") {
		var btnExportar = document.getElementById("btnExportar");
		btnExportar.innerHTML = "Exportar a Excel";
		btnExportar.disabled = false;
		btnExportar.style.pointerEvents = "auto";
		document.getElementById("btnBuscar").disabled = false;
		document.getElementById("btnBuscar").style.pointerEvents = "auto";
		document.getElementById("ddlReporteConsolidado").disabled = false;
		document.getElementById("ddlReporteConsolidado").style.pointerEvents = "auto";
	}
	else {
		var OP4btnBuscar = document.getElementById("OP4btnBuscar");
		OP4btnBuscar.innerHTML = "Descargar";
		OP4btnBuscar.disabled = false;
		OP4btnBuscar.style.pointerEvents = "auto";
		document.getElementById("btnBuscar").disabled = false;
		document.getElementById("btnBuscar").style.pointerEvents = "auto";
		document.getElementById("ddlReporteConsolidado").disabled = false;
		document.getElementById("ddlReporteConsolidado").style.pointerEvents = "auto";
	}
}