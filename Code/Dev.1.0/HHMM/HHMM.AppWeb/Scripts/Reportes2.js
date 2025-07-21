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

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

var matrizReportePrincipal = [], matrizReporteDet1 = [], matrizReporteDet2 = [], matrizReporteDet3 = [];
var matrizFiltroReportePrincipal = [], matrizFiltroReporteDet1 = [], matrizFiltroReporteDet2 = [], matrizFiltroReporteDet3 = [];
var listaTipoAtencion = [], listaTipoServicio = [];


var cabecerasReportePrincipal = ["Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
				"Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora","Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
				"IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso"];
var matrizIndiceReportePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,42];
var anchosReportePrincipal = [145, 145, 145, 145, 100, 145, 450, 135, 400, 90, 120, 90, 145, 145, 100, 100, 100, 400, 180, 400, 145, 400, 145, 300, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 200, 200, 200, 145, 200, 145, 145, 145,145];
var anchosExcelReportePrincipal = [145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145];

var cabecerasReporteDet1 = ["Tipo de Registro", "Tipo de Atención", "Código OA", "Fecha Inicio OA", "Periodo Prod.", "Fecha de Proced.", "Tipo de Servicio", "Codigo Prestación", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
				"Estado OA", "ID OA", "Linea OA", "Id Médico", "Médico", "Id Médico Secundario", "Médico Secundario", "Especialidad", "Paciente", "Tipo Paciente", "Aseguradora", "Mod. Facturación", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
				"IndCierreEME", "IndHonorario", "IdTransaccion", "Transacción Caja", "Estado Hospitalización", "Situación Detalle Hospitalización", "Ind.Eliminado", "Situación Detalle Expediente", "IdPlanilla", "EstadoPlanilla", "Ind.Provisionado", "Id Proceso", "Tipo Observación", "Patron", "Observación", "Descripción Validación"];
var matrizIndiceReporteDet1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,47];
var anchosReporteDet1 = [145, 145, 145, 145, 100, 145, 450, 135, 400, 90, 120, 90, 145, 145, 100, 100, 100, 400, 180, 400, 145, 400, 145, 300, 145, 145, 145,145, 145, 145, 145, 145, 145, 145, 145, 200, 250, 145, 250, 145, 145, 145, 145, 145, 300, 600, 400];
var anchosExcelReporteDet1 = [145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 200, 200, 145, 200, 145, 145, 145, 145, 145, 145, 145, 145];

var cabecerasReporteDet2 = ["Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Dia", "Indicador Feriado", "Especialidad", "Tipo Atención", "Estado", "Unidad Id", "Unidad Médica"];
var matrizIndiceReporteDet2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var anchosReporteDet2 = [145, 700, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145];
var anchosExcelReporteDet2 = [145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145];

var cabecerasReporteDet3 = ["Id Médico", "Médico", "Descripción", "Fecha Inicio", "Fecha Fin", "Valor", "ConceptoId", "Concepto", "Estado"];
var matrizIndiceReporteDet3 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var anchosReporteDet3 = [145, 145, 145, 145, 145, 145, 145, 145, 145];
var anchosExcelReporteDet3 = [145, 145, 145, 145, 145, 145, 145, 145, 145];



var indiceActualBloqueReportePrincipal = 0, indiceActualBloqueReporteDet1 = 0, indiceActualBloqueReporteDet2 = 0, indiceActualBloqueReporteDet3 = 0;
var indiceActualPaginaReportePrincipal = 0, indiceActualPaginaReporteDet1 = 0, indiceActualPaginaReporteDet2 = 0, indiceActualPaginaReporteDet3 = 0;

var indiceOrden = 0;

var registrosPagina = 7;
var paginasBloque = 5;
var urlBase = "", opcionfiltro = -1, ss = "", mensajeValidacion = [], NombreControl = "", TotalX = 0;

window.onload = function () {
	var pos1 = window.location.href.indexOf("Control");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
	ConfiguracionInicial();
};



function listarTodo(rpta) {
	var datos = NombreControl.split("|");
	var control = document.getElementById(datos[1]);
	control.innerHTML = datos[0];
	NombreControl = "";
	control.onclick = function () {
		if (validarReporte()) {
			document.getElementById("divPrincipal").style.display = "none";
			document.getElementById("divDetalle").style.display = "none";
			NombreControl = this.innerHTML + "|" + this.id.toString();
			var ddlReporte = document.getElementById("ddlReporte").value;

			var anio = document.getElementById("txtAnio").value;
			var mes = document.getElementById("cboMes").selectedIndex;
			var strDatos = "";
			strDatos = (txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value) + "|" + (txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value) + "|" + mes + "|" + anio;
			var url = urlBase + "Control/ListarReporte/?ss=" + ss + "&ti=" + ddlReporte + "&su=" + sucursalId;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}

	if (rpta != "") {
		var ddlReporte = document.getElementById("ddlReporte").value;
		var datos = rpta.split("¬");
		var divPrincipal = document.getElementById("divPrincipal");
		var divDetalle = document.getElementById("divDetalle");
		if (ddlReporte != "6") {
			matrizReporteDet1 = [];
			matrizReporteDet2 = [];
			matrizReporteDet3 = [];
			divDetalle.style.display = "none";
			listaTipoAtencion = crearMatriz(datos[0].split("¯"), "¦");
			listaTipoServicio = crearMatriz(datos[1].split("¯"), "¦");
			if (datos[3] != "") {
				document.getElementById("spnFecha").innerHTML = (datos[3].indexOf("1900") > -1 ? "" : formatearfecha(datos[3]));
				document.getElementById("spnFecha2").innertHTML = "";
			} else {
				document.getElementById("spnFecha").innerHTML = "";
				document.getElementById("spnFecha2").innertHTML = "";
			}
			llenarCombo(datos[0].split("¯"), "ddlTipoAtencion", "¦", "Todos");
			llenarCombo(datos[1].split("¯"), "ddlTipoServicio", "¦", "Todos");
			var datareporte = datos[2].split("¯");
			crearMatriz(datareporte, "¦", "ReportePrincipal");
			var spnTotal = document.getElementById("spnTotal");
			if (matrizReportePrincipal.length > 0) {
				spnTotal.innerHTML = matrizReportePrincipal.length;
				document.getElementById("spnTotal2").innertHTML = "";
			}
			else {
				spnTotal.innerHTML = 0;
				document.getElementById("spnTotal2").innertHTML = "";
			}
			paginar(-1, "ReportePrincipal");
			divPrincipal.style.display = "";
		} else {
			matrizReportePrincipal = [];
			divPrincipal.style.display = "none";
			listaTipoAtencion = crearMatriz(datos[0].split("¯"), "¦");
			listaTipoServicio = crearMatriz(datos[1].split("¯"), "¦");
			if (datos[5] != "") {
				document.getElementById("spnFecha2").innerHTML = (datos[5].indexOf("1900") > -1 ? "" : formatearfecha(datos[5]));
				document.getElementById("spnFecha").innertHTML = "";
			} else {
				document.getElementById("spnFecha").innerHTML = "";
				document.getElementById("spnFecha").innertHTML = "";
			}
			llenarCombo(datos[0].split("¯"), "ddlTipoAtencionDet", "¦", "Todos");
			llenarCombo(datos[1].split("¯"), "ddlTipoServicioDet", "¦", "Todos");
			crearMatriz(datos[2].split("¯"), "¦", "ReporteDet1");
			crearMatriz(datos[3].split("¯"), "¦", "ReporteDet2");
			crearMatriz(datos[4].split("¯"), "¦", "ReporteDet3");
			var spnTotal2 = document.getElementById("spnTotal2");
			if (matrizReporteDet1.length > 0 || matrizReporteDet2.length > 0 || matrizReporteDet3.length > 0) {
				spnTotal2.innerHTML = matrizReporteDet1.length;
				document.getElementById("spnTotal").innertHTML = "";
			}
			else {
				spnTotal2.innerHTML = 0;
				document.getElementById("spnTotal2").innertHTML = "";
			}
			paginar(-1, "ReporteDet1");
			paginar(-1, "ReporteDet2");
			paginar(-1, "ReporteDet3");
			divDetalle.style.display = "";
			if (matrizFiltroReporteDet1.length > 0) {
				document.getElementById("ddlTipoRegistroDet").value = "OA";
				document.getElementById("ddlTipoObservacionDet").value = "P";
				document.getElementById("ddlTipoObservacionDet").onchange();
			}
		}
	}
}


function ConfiguracionInicial() {
	crearTabla("ReportePrincipal");
	crearTabla("ReporteDet1");
	crearTabla("ReporteDet2");
	crearTabla("ReporteDet3");
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
        i = nRegistros, matrizIndicesForm = [], nForm = 0;
	identificador = (identificador == undefined ? "" : identificador.trim());
	if (identificador != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
		switch (identificador) {
			case "ReportePrincipal":
				matrizIndicesForm = [3, 5, 25, 26, 27, 28];
				break;
			case "ReporteDet1":
				matrizIndicesForm = [3, 5, 25, 26, 27, 28];
				break;
			case "ReporteDet2":
				matrizIndicesForm = [2, 3, 4, 6];
				break;
			case "ReporteDet3":
				matrizIndicesForm = [3, 4];
				break;
		}
		nForm = matrizIndicesForm.length;
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
		switch (identificador) {
			case "ReportePrincipal":
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" && j != 2 ? matriz[x][j] * 1 : matriz[x][j].trim());
					}
					j = 0;
					x++;
				}
				break;
			case "ReporteDet1":
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" && j != 2 && j != 45 && j != 46 ? matriz[x][j] * 1 : matriz[x][j].trim());
					}
					j = 0;
					x++;
				}
				break;
			default:
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
					}
					j = 0;
					x++;
				}
				break;
		}
		j = 0, x = 0, i = nRegistros;
		switch (identificador) {
			case "ReportePrincipal":
			case "ReporteDet1":
				for (; i > 0; i--) {
					for (; j < nForm; j++) {
						matriz[x][matrizIndicesForm[j]] = formatearfecha(matriz[x][matrizIndicesForm[j]]);
					}
					j = 0;
					x++;
				}
				break;
			case "ReporteDet2":
				for (; i > 0; i--) {
					for (; j < nForm; j++) {
						if (matrizIndicesForm[j] == 2) {
							matriz[x][matrizIndicesForm[j]] = formatearfecha(matriz[x][matrizIndicesForm[j]]);
						}
						else if (matrizIndicesForm[j] == 3 || matrizIndicesForm[j] == 4) {
							matriz[x][matrizIndicesForm[j]] = matriz[x][matrizIndicesForm[j]].split(" ")[1];
						}
						else if (matrizIndicesForm[j] == 6) {
							matriz[x][matrizIndicesForm[j]] = (matriz[x][matrizIndicesForm[j]] == "True" ? "SI" : "NO");
						}
					}
					j = 0;
					x++;
				}
				break;
			case "ReporteDet3":
				for (; i > 0; i--) {
					for (; j < nForm; j++) {
						if (matrizIndicesForm[j] == 3 || matrizIndicesForm[j] == 4) {
							matriz[x][matrizIndicesForm[j]] = formatearfecha(matriz[x][matrizIndicesForm[j]]);
						}
					}
					j = 0;
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


//function crearMatriz(lista, separador, identificador,enteros,fechas) {
//	var nRegistros = lista.length;
//	var nCampos = 0,
//        campos, x = 0,
//        matriz = [],
//        j = 0,
//        i = nRegistros,
//        t = 0,u=0;
//	var enteros = [0, 1, 4, 5, 7, 8, 9, 12, 13, 14, 15, 24, 25, 28, 32, 34, 35, 36];
//	var fecha = [2,3,20,21,22,23];
//	identificador = (identificador == undefined ? "" : identificador.trim());
//	if (identificador != "") {
//		window["matriz" + identificador] = [];
//		window["matrizFiltro" + identificador] = [];
//	}
//	if (nRegistros > 0 && lista[0] != "") {
//		for (; i > 0; i--) {
//			matriz[x] = lista[x].split(separador);
//			if (nCampos == 0) {
//				nCampos = matriz[0].length;
//			}
//			switch (identificador) {
//				case "ReportePrincipal":
//				case "ReporteDet1":
//					for (; j < nCampos; j++) {
//						matriz[x][j] = matriz[x][j].trim();
//					}
//					for (; t < enteros.length; t++) {
//						matriz[x][enteros[t]] = matriz[x][enteros[t]] * 1;
//					}
//					for (; u < fecha.length; u++) {
//						matriz[x][fecha[u]] = formatearfecha(matriz[x][fecha[u]]);
//					}
//					j = 0, u = 0, t = 0;
//					x++;
//					break;
//				case "ReporteDet2":
//					matriz[x] = [];
//					for (; j < nCampos; j++) {
//						if (isNaN(campos[j]) || campos[j] == "") {
//							switch (j) {
//								case 2:
//									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]).split(" ")[0]);
//									break;
//								case 3:
//								case 4:
//									matriz[x][j] = campos[j].split(" ")[1];
//									break;
//								case 6:
//									matriz[x][j] = (campos[j] == "True" ? "SI" : "NO");
//									break;
//								default:
//									matriz[x][j] = campos[j];
//									break;
//							}
//						}
//						else matriz[x][j] = campos[j] * 1;
//					}
//					j = 0;
//					x++;
//					break;
//				case "ReporteDet3":
//					matriz[x] = [];
//					for (; j < nCampos; j++) {
//						if (isNaN(campos[j]) || campos[j] == "") {
//							switch (j) {
//								case 3:
//								case 4:
//									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]).split(" ")[0]);
//									break;
//								default:
//									matriz[x][j] = campos[j];
//									break;
//							}
//						}
//						else matriz[x][j] = campos[j] * 1;
//					}
//					j = 0;
//					x++;
//					break;
//				default:
//					matriz[x] = [];
//					for (; j < nCampos; j++) {
//						if (isNaN(campos[j]) || campos[j] == "") matriz[x][j] = campos[j];
//						else matriz[x][j] = campos[j] * 1;
//					}
//					j = 0;
//					x++;
//					break;
//			}

//		}
//		if (identificador != "") {
//			window["matriz" + identificador] = matriz.slice(0);
//			window["matrizFiltro" + identificador] = matriz.slice(0);
//		}
//		else {
//			return matriz;
//		}
//	} else {
//		if (identificador == "") {
//			return matriz;
//		}
//	}
//}

function crearMatriz2(lista, separador, identificador) {
	var nRegistros = lista.length;
	var nCampos = 0,
        campos, x = 0,
        matriz = [],
        j = 0,
        i = nRegistros;
	identificador = (identificador == undefined ? "" : identificador.trim());
	if (identificador != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
	}
	if (nRegistros > 0 && lista[0] != "") {
		for (; i > 0; i--) {
			matriz[x] = lista[x].split(separador);
			//if (nCampos == 0) {
			//	nCampos = campos.length;
			//}
			switch (identificador) {
				case "ReportePrincipal":
				case "ReporteDet1":
					//matriz[x] = [];
					//for (; j < nCampos; j++) {
					//	if (isNaN(campos[j]) || campos[j] == "" || j == 1 || j == 33 || j == 34) {
					//		switch (j) {
					//			case 2:
					//			case 3:
					//			case 20:
					//			case 21:
					//			case 22:
					//			case 23:
					//				matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]));
					//				break;
					//			default:
					//				matriz[x][j] = campos[j].trim();
					//				break;
					//		}
					//	}
					//	else matriz[x][j] = campos[j] * 1;
					//}
					//j = 0;
					x++;
					break;
				case "ReporteDet2":
					matriz[x] = [];
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							switch (j) {
								case 2:
									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]).split(" ")[0]);
									break;
								case 3:
								case 4:
									matriz[x][j] = campos[j].split(" ")[1];
									break;
								case 6:
									matriz[x][j] = (campos[j] == "True" ? "SI" : "NO");
									break;
								default:
									matriz[x][j] = campos[j];
									break;
							}
						}
						else matriz[x][j] = campos[j] * 1;
					}
					j = 0;
					x++;
					break;
				case "ReporteDet3":
					matriz[x] = [];
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") {
							switch (j) {
								case 3:
								case 4:
									matriz[x][j] = (campos[j].indexOf("1900") > -1 ? "" : formatearfecha(campos[j]).split(" ")[0]);
									break;
								default:
									matriz[x][j] = campos[j];
									break;
							}
						}
						else matriz[x][j] = campos[j] * 1;
					}
					j = 0;
					x++;
					break;
				default:
					matriz[x] = [];
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") matriz[x][j] = campos[j];
						else matriz[x][j] = campos[j] * 1;
					}
					j = 0;
					x++;
					break;
			}

		}
		if (identificador != "") {
			nCampos = matriz[0].length;
			var xjk = matriz.length;
			for (var x = 0; x < xjk; x++) {
				for (; j < nCampos; j++) {
					if (j == 2 || j == 3 || j == 20 || j == 21 || j == 22 || j == 23) {
						matriz[x][j] = (matriz[x][j].indexOf("1900") > -1 ? "" : formatearfecha(matriz[x][j]));
					}
					else if (isNaN(matriz[x][j]) || matriz[x][j] == "") {
						matriz[x][j] = matriz[x][j].trim();
					}
					else {
						matriz[x][j] = matriz[x][j] * 1;
					}
				}
				j = 0;
			}

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
		case "ReportePrincipal":
			contenido = "<table class='tabla-general' style='table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
		default:
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		switch (identificador) {
			case "ReportePrincipal":
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
						contenido += "' style='width:90%' id='ddlTipoRegistro'>";
						contenido += "<option value=''>Todos</option><option value='OA'>Ord. Atención</option><option value='EXP'>Expediente</option>";
						contenido += "</select>";
						break;
					case 1:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoAtencion'>";
						contenido += "</select>";
						break;
					case 6:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoServicio'>";
						contenido += "</select>";
						break;
					case 43:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoObservacion'>";
						contenido += "<option value=''>TODOS</option><option value='P' >PENDIENTE</option><option value='I'>INFORMATIVO</option>";
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
			case "ReporteDet1":
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
						contenido += "' style='width:90%' id='ddlTipoRegistroDet'>";
						contenido += "<option value=''>Todos</option><option value='OA'>Ord. Atención</option><option value='EXP'>Expediente</option>";
						contenido += "</select>";
						//contenido += "<input type='text' class='Texto";
						//contenido += identificador;
						//contenido += "' name='cabecera";
						//contenido += identificador;
						//contenido += "' style='width:90%' id='txtTipoRegDet1'>";
						break;
					case 1:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoAtencionDet'>";
						contenido += "</select>";
						break;
					case 6:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoServicioDet'>";
						contenido += "</select>";
						break;
					case 43:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoObservacionDet'>";
						contenido += "<option value=''>TODOS</option><option value='P' >PENDIENTE</option><option value='I'>INFORMATIVO</option>";
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
	//contenido += "<tfoot>";
	//contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	//contenido += (nCampos).toString();
	//contenido += "'></td></tr>";
	//contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}

function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("EnlaceReportePrincipal");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "ReportePrincipal");
			paginar(indiceActualPaginaReportePrincipal, "ReportePrincipal");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceReporteDet1");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "ReporteDet1");
			paginar(indiceActualPaginaReporteDet1, "ReporteDet1");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceReporteDet2");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "ReporteDet2");
			paginar(indiceActualPaginaReporteDet2, "ReporteDet2");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceReporteDet3");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "ReporteDet3");
			paginar(indiceActualPaginaReporteDet3, "ReporteDet3");
		};
	}
}

function convertirFecha(objeto) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	var d = new Date(objeto);
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

function formatearfecha(fecha) {
	if (fecha.indexOf("1900") > -1) {
		return "";
	}
	var campos = fecha.split("/");
	campos[1] = campos[1].length > 1 ? campos[1] : '0' + campos[1];
	campos[0] = campos[0].length > 1 ? campos[0] : '0' + campos[0];
	return campos.join("/");
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configurarControles() {
	var cboMes = document.getElementById("cboMes");
	cboMes.selectedIndex = window.parent.document.getElementById("hmes").value;
	var hoy = new Date();
	var dd = hoy.getDate();
	var mm = hoy.getMonth() + 1;
	var yyyy = hoy.getFullYear();
	hoy = dd + '/' + mm + '/' + yyyy;
	var txtFechaInicio = document.getElementById("txtFechaInicio");
	txtFechaInicio.value = '01/' + mm + '/' + yyyy;
	txtFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaInicio.readOnly = false;
	txtFechaInicio.value = formatearfecha(txtFechaInicio.value);

	var txtFechaFin = document.getElementById("txtFechaFin");
	txtFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaFin.readOnly = false;
	txtFechaFin.value = dd + '/' + mm + '/' + yyyy;
	txtFechaFin.value = formatearfecha(txtFechaFin.value);
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		if (validarReporte()) {
			document.getElementById("divPrincipal").style.display = "none";
			document.getElementById("divDetalle").style.display = "none";
			NombreControl = this.innerHTML + "|" + this.id.toString();
			var ddlReporte = document.getElementById("ddlReporte").value;
			var anio = document.getElementById("txtAnio").value;
			var mes = document.getElementById("cboMes").selectedIndex;
			var strDatos = "";
			strDatos = (txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value) + "|" + (txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value) + "|" + mes + "|" + anio;
			var url = urlBase + "Control/ListarReporte/?ss=" + ss + "&ti=" + ddlReporte + "&su=" + sucursalId;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}
	var validar = document.getElementsByClassName("validar");
	var valor;
	for (var x = 0; x < validar.length; x++) {
		validar[x].onmouseenter = function (event) {
			if (mensajeValidacion.length > 0 && (this.className.indexOf("error") > -1)) {
				valor = mensajeValidacion[this.getAttribute("data-secuencia")];
				if (window.innerWidth > 500) {
					MostrarToolTip(tipError, this, valor);
				}
			} else {
				if (mensajeValidacion[this.getAttribute("data-secuencia")] != "") {
					if (this.hasAttribute("data-obligatorio")) {
						validarIndividual(this, false);
					} else {
						validarIndividual(this);
					}
				}
				EsconderToolTip(tipError);
			}
		}
		validar[x].onmouseleave = function () {
			if (mensajeValidacion.length > 0) {
				if (this.hasAttribute("data-obligatorio")) {
					validarIndividual(this, false);
				} else {
					validarIndividual(this);
				}
			}
			EsconderToolTip(tipError);
		}
	}


	cboMes.onchange = function () {
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		var txtFechaFin = document.getElementById("txtFechaFin");
		var txtAnio = document.getElementById("txtAnio").value;
		if (this.value != "0" && isNaN(txtAnio) == false && (txtAnio * 1) > 1900) {
			var date = new Date(), y = txtAnio, m = ((this.value * 1) - 1);
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			txtFechaInicio.value = convertirFecha(firstDay);
			txtFechaFin.value = convertirFecha(lastDay);
		}
		else {
			txtFechaInicio.value = "";
			txtFechaFin.value = "";
		}
	}
	var txtAnio = document.getElementById("txtAnio");
	txtAnio.onkeyup = function () {
		var cboMes = document.getElementById("cboMes");
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		var txtFechaFin = document.getElementById("txtFechaFin");
		if (cboMes.value != "0" && isNaN(this.value) == false && (this.value * 1) > 1900) {
			var date = new Date(), y = this.value, m = ((cboMes.value * 1) - 1);
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			txtFechaInicio.value = convertirFecha(firstDay);
			txtFechaFin.value = convertirFecha(lastDay);
		}
		else {
			txtFechaInicio.value = "";
			txtFechaFin.value = "";
		}
	}
	cboMes.onchange();



	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		var ddlReporte = document.getElementById("ddlReporte").value;
		if (ddlReporte != "6") {
			this.href = "";
			var excelExportar = exportarExcel(true);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "ReportedeControl.xls";
			this.href = window.URL.createObjectURL(formBlob);
		} else {
			this.href = "";
			var excelExportar = exportarExcel(false);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "ReportedeControl.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}

	}
}

function recogerValores(objeto) {
	var lista = [], contador1 = 0, contador2 = 0;
	var valores = document.getElementsByName("cabecera" + objeto);
	for (var x = 0; x < valores.length; x++) {
		if (valores[x].className.indexOf("Combo") > -1) {
			if (valores[x].selectedIndex != "0") {
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
	var textos = document.getElementsByName("cabeceraReportePrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					var lista = recogerValores("ReportePrincipal");
					filtrar("ReportePrincipal", lista);
					document.getElementById("spnTotal").innerHTML = matrizReportePrincipal.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					var lista = recogerValores("ReportePrincipal");
					filtrar("ReportePrincipal", lista);
					document.getElementById("spnTotal").innerHTML = matrizReportePrincipal.length;
				}, 0);
			};
		}
	}


	var textos = document.getElementsByName("cabeceraReporteDet1");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet1");
					filtrar("ReporteDet1", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet1.length;
				}, 0);

			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet1");
					filtrar("ReporteDet1", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet1.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraReporteDet2");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet2");
					filtrar("ReporteDet2", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet2.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet2");
					filtrar("ReporteDet2", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet2.length;
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraReporteDet3");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet3");
					filtrar("ReporteDet3", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet3.length;
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					var lista = recogerValores("ReporteDet3");
					filtrar("ReporteDet3", lista);
					document.getElementById("spnTotal2").innerHTML = matrizReporteDet3.length;
				}, 0);
			};
		}
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
		window["matriz" + Elemento] = mergeSort(matrizClon, indiceOrden, tipoOrden);
	} else {
		window["matriz" + Elemento].reverse()
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


function filtrar(identificador, lista) {
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
				else exito = (campos[indice].toString().toLowerCase() == (lista[j][1]));
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
			case "ReportePrincipal":
			case "ReporteDet1":
				var valorFor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						if (matriz[i][41] == "NO") contenido += "<tr class='FilaDatos'>";
						else contenido += "<tr class='FilaDatos' style='background: rgba(247, 147, 140, 0.75);color: white;'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 9 || j == 10 || j == 11) {
								if (matriz[i][41] == "NO") contenido2 += "<td style='text-align:right'>";
								else contenido2 += "<td style='text-align:right;background: rgba(247, 147, 140, 0.75);color: white;'>";
							}
							else {
								if (matriz[i][41] == "NO") contenido2 += "<td>";
								else contenido2 += "<td style='background: rgba(247, 147, 140, 0.75);color: white;'>";
							}
							switch (j) {
								case 1:
									for (var x = 0; x < listaTipoAtencion.length; x++) {
										valorFor = listaTipoAtencion[x];
										if (matriz[i][matrizIndice[j]] == valorFor[0]) {
											contenido2 += valorFor[1];
											break;
										}
									}
									break;
								case 6:
									for (var x = 0; x < listaTipoServicio.length; x++) {
										valorFor = listaTipoServicio[x];
										if (matriz[i][matrizIndice[j]] == valorFor[0]) {
											contenido2 += valorFor[1];
											break;
										}
									}
									break;
								case 9:
								case 10:
								case 11:
									contenido2 += formatearNumero(matriz[i][matrizIndice[j]]);
									break;
								case 35:
								case 36:
								case 40:
									contenido2 += (matriz[i][matrizIndice[j]].trim() == "0 -" ? "" : matriz[i][matrizIndice[j]]);
									break;
								case 16:
								case 18:
								case 39:
								case 42:
									contenido2 += (matriz[i][matrizIndice[j]] == 0 ? "" : matriz[i][matrizIndice[j]]);
									break;
								case 43:
									if (matriz[i][matrizIndice[j]] != "") {
										contenido2 += (matriz[i][matrizIndice[j]] == "P" ? "PENDIENTE" : "INFORMATIVO");
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
			case "ReporteDet3":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							if (j == 5) contenido2 += "<td style='text-align:right'>";
							else contenido2 += "<td>";
							switch (j) {
								case 5:
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
		//document.getElementById("tdPaginas" + identificador).innerHTML = "";
		document.getElementById("divPaginacion" + identificador).innerHTML = "";
	} else {
		//document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		document.getElementById("divPaginacion" + identificador).innerHTML = contenido;
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

function limpiarCampos() {
	var limpiar = document.getElementsByName("limpiar");
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
		if (limpiar[y].type == "checkbox") {
			limpiar[y].checked = false;
		} else {
			if (limpiar[y].nodeName == "SELECT") {
				limpiar[y].selectedIndex = "0";
			} else {
				limpiar[y].value = "";
			}
		}

	}
}

function escogerOpcion(opcion, id) {
	limpiarCampos();
	var TituloPopupRecurso = document.getElementById("TituloPopupRecurso");
	var nombre = "";
	for (var x = 0; x < listaTipo.length; x++) {
		if (listaTipo[x][0] == TipoAlerta) {
			nombre = listaTipo[x][1];
			break;
		}
	}
	if (TipoAlerta == "C") {
		document.getElementById("spnCantidad").innerHTML = "Cantidad";
	}
	else {
		document.getElementById("spnCantidad").innerHTML = "Minutos";
	}
	if (opcion) {
		opcionPopUp = 1;
		TituloPopupRecurso.innerHTML = "AGREGAR ALERTA x " + nombre;
	} else {
		opcionPopUp = 2;
		TituloPopupRecurso.innerHTML = "ACTUALIZAR ALERTA x " + nombre;

		document.getElementById("txtCodigo").value = (TipoAlerta == "C" ? matrizPrincipal[id][1] : matrizDetalle[id][1]);
		document.getElementById("txtNombre").value = (TipoAlerta == "C" ? matrizPrincipal[id][2] : matrizDetalle[id][2]);
		document.getElementById("ddlSigno").value = (TipoAlerta == "C" ? matrizPrincipal[id][3] : matrizDetalle[id][3]);
		document.getElementById("txtCantidad").value = (TipoAlerta == "C" ? matrizPrincipal[id][4] : matrizDetalle[id][4]);
		document.getElementById("txtcorreoto").value = (TipoAlerta == "C" ? matrizPrincipal[id][7] : matrizDetalle[id][7]);
		document.getElementById("txtcorreocc").value = (TipoAlerta == "C" ? matrizPrincipal[id][8] : matrizDetalle[id][8]);
		document.getElementById("ddlPrioridad").value = (TipoAlerta == "C" ? matrizPrincipal[id][5] : matrizDetalle[id][5]);
		document.getElementById("ddlFlujo").value = (TipoAlerta == "C" ? matrizPrincipal[id][6] : matrizDetalle[id][6]);
		document.getElementById("ddlEstado").value = (TipoAlerta == "C" ? matrizPrincipal[id][9] : matrizDetalle[id][9]);
	}
	abrirPopup('PopupAlarma');
}

function mostrarRespuesta(rpta) {
	if (rpta != "") {
		var data = rpta.split("♦");

		switch (data[1] * 1) {
			case 1:
				listarTodo(data[0]);
				mostraralerta("Se ha adicionado una alerta");
				abrirPopup('PopupAlarma');
				break;
			case 2:
				listarTodo(data[0]);
				mostraralerta("Se ha actualizado una alerta");
				abrirPopup('PopupAlarma');
				break;
			case 3:
				listarTodo(data[0]);
				mostraralerta("Se ha actualizado el estado de una alerta");
				break;
			case 4:
				listarSemaforo(data[0])
				mostraralerta("Se ha actualizado los valores del semaforo");
				break;
		}
	} else {
		mostraralerta("Ha ocurrido un error");
	}
};

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
	contenido.push("<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#03bf5d\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: " + window["anchosExcel" + identificador] + "px' align='center'>" + matrizCabecera[x] + "</td>");
	}
	contenido.push("</tr>");
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			switch (j) {
				case 3:
					contenido.push("<td style=text-align:center>");
					for (var x = 0; x < listaPrioridad.length; x++) {
						if (listaPrioridad[x][0] == window["matriz" + identificador][i][matrizIndiceDetalle[j]]) {
							contenido.push(listaPrioridad[x][1]);
							break;
						}
					}
					break;
				case 4:
					contenido.push("<td>");
					for (var x = 0; x < listaFlujo.length; x++) {
						if (listaFlujo[x][0] == window["matriz" + identificador][i][matrizIndiceDetalle[j]]) {
							contenido.push(listaFlujo[x][1]);
							break;
						}
					}
					break;
				case 7:
					contenido.push("<td>");
					contenido.push(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]] == "A" ? "ACTIVO" : "INACTIVO");
					break;
				default:
					contenido.push("<td style='text-align:left'>");
					contenido.push(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]);
					break;

			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");

	}
	return (contenido.join("") + "</table></html>");
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
			document.getElementById("spnTotal2").innerHTML = window["matrizReporteDet" + data_tab_actual.split("-")[1]].length;
		}
		else {
			if (listaTabs[i].className.indexOf("bloqueado") > -1) listaTabs[i].className = "tab-link bloqueado";
			else listaTabs[i].className = "tab-link";
			contenido.className = "tab-content";
		}
	}

}

function validarSoloNumero(event) {
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode < 48 || keyCode > 57) {
		if (keyCode != 8 && keyCode != 9 && keyCode != 0) {
			event.preventDefault();
		}
	}
}















/******************************TEMA DE VALIDACIONES*******************************/
function validarReporte() {

	var txtAnio = document.getElementById("txtAnio");
	var cboMes = document.getElementById("cboMes");
	var txtFechaInicio = document.getElementById("txtFechaInicio");
	var txtFechaFin = document.getElementById("txtFechaFin");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeMes = validarCombo(cboMes.id, "Mes", true);
	if (mensajeMes != "") {
		mensajeValidacion[cboMes.getAttribute("data-secuencia")] = mensajeMes;
		cboMes.className += " error";
		cboMes.focus();
		return false;
	}

	var mensajeAnio = validarTexto(txtAnio.id, "Año", true);
	if (mensajeAnio != "") {
		mensajeValidacion[txtAnio.getAttribute("data-secuencia")] = mensajeAnio;
		txtAnio.className += " error";
		txtAnio.focus();
		return false;
	}

	var mensajeFechaInicio = validarFecha(txtFechaInicio.id, "fecha", true);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtFechaInicio.className += " error";
	}
	var mensajeFechaFin = validarFecha(txtFechaFin.id, "fecha", true);
	if (mensajeFechaFin != "") {
		mensajeValidacion[txtFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
		txtFechaFin.className += " error";
	}
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}

}

function validarIndividual(elemento, obligatorio) {
	if (obligatorio == undefined) {
		obligatorio = true;
	}
	var objeto = elemento.getAttribute("data-validacion").split("|");
	if (mensajeValidacion.length > 0) {
		var valor = window[objeto[0]](elemento.id, objeto[1].toLowerCase(), obligatorio);
		if (valor != "") {
			mensajeValidacion[elemento.getAttribute("data-secuencia")] = valor;
			elemento.className += " error";
		} else {
			mensajeValidacion[elemento.getAttribute("data-secuencia")] = "";
			if (elemento.className.indexOf("error") > -1) {
				elemento.className = elemento.className.split("error").join("").trim();
			}
		}
	}
}

function ObtenerPosicion(elemento) {
	var p = {};
	p.x = elemento.offsetLeft;
	p.y = elemento.offsetTop;
	while (elemento.offsetParent) {
		p.x = p.x + elemento.offsetParent.offsetLeft;
		p.y = p.y + elemento.offsetParent.offsetTop;
		if (elemento == document.getElementsByTagName("body")[0]) {
			break;
		} else {
			elemento = elemento.offsetParent;
		}
	}
	return p;
}

function MostrarToolTip(elem, objeto, mensaje) {
	var pos = ObtenerPosicion(objeto);
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var contenido = "";
	contenido = "<span>" + mensaje + "</span>";
	elem.innerHTML = contenido;
	elem.style.display = "";
	elem.setAttribute("data-elemento", objeto.id);
	elem.style.top = ((window.pageYOffset + objeto.getBoundingClientRect().top) - (objeto.offsetHeight + 20)) + "px";
	if (window.innerWidth < 1024) {
		elem.style.left = (pos.x + 70) + "px";
	} else {
		elem.style.left = (pos.x) + "px";
	}
}

function EsconderToolTip(elem) {
	elem.style.display = "none";
	elem.innerHTML = "";
}

function validarTexto(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
				return 'Ingrese ' + Mensaje;
			}
		}
		if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
			if (Texto.value.match(/([\<])([^\>]{1,})*([\>])/i) != null) {
				return Mensaje + ' No debe contener etiquetas html: <etiqueta>';
			}
			if (Texto.value.match(/[,;]+/) != null) {
				return Mensaje + ' No debe contener , o ;';
			}
		}
	}
	return "";
}

function validarCombo(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value == 0) {
				return 'Seleccione ' + Mensaje;
			}
		}
	}
	return "";
}

function validarFecha(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
				return 'Ingrese ' + Mensaje.toLowerCase();
			}
		}
		if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
			if (!esFecha(Texto.value)) {
				return 'La ' + Mensaje + ' es inválida';
			}
		}

		if (Texto.id == "txtFechaInicio") {
			var txtFechaFin = document.getElementById("txtFechaFin");
			var Inicio = fechaUTC(Texto.value);
			var Fin = fechaUTC(txtFechaFin.value);
			if (Inicio > Fin) {
				return 'La fecha de inicio no puede ser mayor a la de fin';
			}
		}
		else {
			var txtFechaInicio = document.getElementById("txtFechaInicio");
			var Fin = fechaUTC(Texto.value);
			var Inicio = fechaUTC(txtFechaInicio.value);
			if (Fin < Inicio) {
				return 'La fecha de fin no puede ser menor a la de inicio';
			}
		}
	}
	return "";
}

function esFecha(Cadena) {
	if (Cadena.toLowerCase().indexOf("/") > -1) {
		var Fecha = new String(Cadena);
		var RealFecha = new Date();
		var Ano = new String(Fecha.substring(Fecha.lastIndexOf("/") + 1, Fecha.length));
		var Mes = new String(Fecha.substring(Fecha.indexOf("/") + 1, Fecha.lastIndexOf("/")));
		var Dia = new String(Fecha.substring(0, Fecha.indexOf("/")));
		var Bisiesto;
		if (isNaN(Ano) || Ano.length < 4 || parseFloat(Ano) < 1900) {
			return false;
		}
		if ((parseFloat(Ano) % 4 == 0) && ((parseFloat(Ano) % 100 != 0) || (parseFloat(Ano) % 400 == 0))) {
			Bisiesto = true;
		}
		else {
			Bisiesto = false;
		}

		if (isNaN(Mes) || parseFloat(Mes) < 1 || parseFloat(Mes) > 12) {
			return false;
		}
		if (isNaN(Dia) || parseInt(Dia, 10) < 1 || parseInt(Dia, 10) > 31) {
			return false;
		}
		if ((Mes == 4 || Mes == 6 || Mes == 9 || Mes == 11) && (isNaN(Dia) || parseInt(Dia, 10) < 1 || parseInt(Dia, 10) > 30)) {
			return false;
		}
		if (Bisiesto == false && parseFloat(Mes) == 2 && parseInt(Dia, 10) > 28) {
			return false;
		}

		if (Bisiesto == true && parseFloat(Mes) == 2 && parseInt(Dia, 10) > 29) {
			return false;
		}

		return true;
	}
	return false;
}

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
}


function exportarExcel(opcion) {
	var contenido = "";
	var nx = (opcion == true ? 1 : 3);
	contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
	var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], valorFor;
	for (var x = 0; x < nx; x++) {
		switch (x) {
			case 0:
				if (opcion) n = matrizReportePrincipal.length;
				else n = matrizReporteDet1.length;
				if (opcion) ncampos = cabecerasReportePrincipal.length;
				else ncampos = cabecerasReporteDet1.length;
				if (opcion) matriz = (matrizReportePrincipal.length > 0 ? matrizReportePrincipal.slice(0) : []);
				else matriz = (matrizReporteDet1.length > 0 ? matrizReporteDet1.slice(0) : []);
				if (opcion) {
					matrizCabecera = cabecerasReportePrincipal.slice(0);
					matrizAnchos = anchosReportePrincipal.slice(0);
				} else {
					matrizCabecera = cabecerasReporteDet1.slice(0);
					matrizAnchos = anchosReporteDet1.slice(0);
				}
				nombre = "Producción";
				break;
			case 1:
				n = matrizReporteDet2.length;
				ncampos = cabecerasReporteDet2.length;
				matriz = (matrizReporteDet2.length > 0 ? matrizReporteDet2.slice(0) : []);
				nombre = "Horario";
				matrizCabecera = cabecerasReporteDet2.slice(0);
				matrizAnchos = anchosReporteDet2.slice(0);
				break;
			case 2:
				n = matrizReporteDet3.length;
				ncampos = cabecerasReporteDet3.length;
				matriz = (matrizReporteDet3.length > 0 ? matrizReporteDet3.slice(0) : []);
				nombre = "Monto Fijo";
				matrizCabecera = cabecerasReporteDet3.slice(0);
				matrizAnchos = anchosReporteDet3.slice(0);
				break;
		}



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
							case 1:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (opcion) {
									for (var K = 0; K < listaTipoAtencion.length; K++) {
										valorFor = listaTipoAtencion[K];
										if (matriz[z][matrizIndiceReportePrincipal[y]] == valorFor[0]) {
											contenido += valorFor[1];
											break;
										}
									}
								} else {
									for (var K = 0; K < listaTipoAtencion.length; K++) {
										valorFor = listaTipoAtencion[K];
										if (matriz[z][matrizIndiceReporteDet1[y]] == valorFor[0]) {
											contenido += valorFor[1];
											break;
										}
									}
								}
								break;
							case 6:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (opcion) {
									for (var k = 0; k < listaTipoServicio.length; k++) {
										valorFor = listaTipoServicio[k];
										if (matriz[z][matrizIndiceReportePrincipal[y]] == valorFor[0]) {
											contenido += valorFor[1];
											break;
										}
									}
								}
								else {
									for (var k = 0; k < listaTipoServicio.length; k++) {
										valorFor = listaTipoServicio[k];
										if (matriz[z][matrizIndiceReporteDet1[y]] == valorFor[0]) {
											contenido += valorFor[1];
											break;
										}
									}
								}

								break;
							case 9:
							case 10:
							case 11:
								contenido += '<Cell ss:StyleID="s65">';
								contenido += '<Data ss:Type="Number">';
								if (opcion) contenido += matriz[z][matrizIndiceReportePrincipal[y]];
								else contenido += matriz[z][matrizIndiceReporteDet1[y]];
								break;
							case 42:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (!opcion) {
									if (matriz[z][matrizIndiceReporteDet1[y]] != "") {
										contenido += (matriz[z][matrizIndiceReporteDet1[y]] == "P" ? "PENDIENTE" : "INFORMATIVO");
									}
								}
								break;
							case 35:
							case 36:
							case 40:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (opcion) contenido += (matriz[z][matrizIndiceReportePrincipal[y]].trim() == "0 -" ? "" : matriz[z][matrizIndiceReportePrincipal[y]].toString());
								else contenido += (matriz[z][matrizIndiceReporteDet1[y]].trim() == "0 -" ? "" : matriz[z][matrizIndiceReporteDet1[y]].toString());
								break;
							case 16:
							case 18:
							case 39:
							case 42:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (opcion) contenido += (matriz[z][matrizIndiceReportePrincipal[y]] == 0 ? "" : matriz[z][matrizIndiceReportePrincipal[y]].toString());
								else contenido += (matriz[z][matrizIndiceReporteDet1[y]] == 0 ? "" : matriz[z][matrizIndiceReporteDet1[y]].toString());
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								if (opcion) contenido += matriz[z][matrizIndiceReportePrincipal[y]];
								else contenido += matriz[z][matrizIndiceReporteDet1[y]];
								break;
						}
						break;
					case 1:
						switch (y) {
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndiceReporteDet2[y]];
								break;
						}
						break;
					case 2:
						switch (y) {
							case 5:
								contenido += '<Cell ss:StyleID="s65">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[z][matrizIndiceReporteDet3[y]];
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndiceReporteDet3[y]];
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




