var listaPeriodo = [], listaMedico = [], listaProduccion = [], listaBonificacion = [], listaMontoFijo = [];
var matrizPeriodo = [], matrizMedico = [], matrizMedicoFiltro = [], matrizProduccion, matrizBonificacion = [], matrizMontoFijo = [];
var cabecerasPeriodo = ["Periodo", "T. Adm", "Total Provisión", "Total Planilla", "Saldo Procesar"];
var anchosPeriodo = [15, 20, 20, 20, 25];
var matrizIndicePeriodo = [1, 2, 3, 4, 5];
var cabecerasMedico = cabecerasMedicoFiltro = ["Médico/Empresa", "Tipo Admision", "Importe", "Descuento", "Bonificación", "Ajuste", "Total"];
var anchosMedico = [25, 13, 10, 13, 13, 13, 13];
var matrizIndiceMedicoFiltro = matrizIndiceMedico = [1, 8, 2, 3, 4, 5, 6];
var cabecerasProduccion = ["Médico", "CodigoOA", "Paciente", "Expediente", "Prestación", "Fec. Ate. Prestación", "Fec. Atendido", "Fec. Terminado", "P/U. Prestación", "Cantidad", "Mto. Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Clínica", "Importe", "Bonificación", "Ajuste", "Total", "Fec. InicioOA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Especialidad", "Est. Prestación", "Estado"],
anchosProduccion = [8, 2, 8, 2, 8, 4, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 9, 4, 5, 4, 2],
matrizIndiceProduccion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
cabecerasBonificacion = ["Médico", "Fecha", "H. Inicio", "H. Fin", "H. Programadas", "Día", "Ind. Feriado", "Valor Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado"],
anchosBonificacion = [17, 5, 5, 5, 7, 7, 5, 7, 7, 7, 7, 7, 7, 7],
matrizIndiceBonificacion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
cabecerasMontoFijo = ["PersonaId", "Descripcion", "Importe", "ConceptoId", "Concept", "IndicadorAdministrativo", "Periodo", "ProcesoMedicoConceptoId"],
anchosMontoFijo = [7, 7, 7, 7, 7, 7, 7, 7],
matrizIndiceMontoFijo = [0, 1, 2, 3, 4, 5, 6, 7];
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
var PeriodosSeleccionados = [];
var MedicosSeleccionados = [], lstTadm, ProduccionSeleccionados = [], BonificacionSeleccionados = [], MontoFijoSeleccionados = [], mtProd = 0, mtBon = 0, mtMon = 0, posReg = -1, posTipoAdmin = -1, mtMedico = 0;



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

var rABS = true, use_worker = true, transferable = true, xlsData = "", MatrizWS = [];
var XW = { rABS: '../../Scripts/xlsxworker.js' }

window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	var pos1 = window.location.href.indexOf("Proceso");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	configuracionInicial();
	var url = urlBase + "Proceso/obtenerListas/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarTodo);
	var contenido = "";
	var nCabeceras = cabecerasMedico.length;
	contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
	contenido += (nCabeceras + 2).toString();
	contenido += "'>No hay datos</td></tr>";
	document.getElementById("tbMedico").innerHTML = contenido;
	document.getElementById("tdPaginasMedico").innerHTML = "";

}

function configuracionInicial() {
	crearTabla("Periodo|0");
	crearTabla("Medico|1");
	crearTabla("Produccion|2");
	crearTabla("Bonificacion|3");
	crearTabla("MontoFijo|4");
	crearTabla2("divValidados");
	crearTabla2("divErrados");
	ConfiguracionControles();
	configurarOrdenacion("Periodo|0");
	configurarOrdenacion("Medico|1");
	configurarOrdenacion("Produccion|2");
	configurarOrdenacion("Bonificacion|3");

}

function configurarOrdenacion(elemento) {
	var identificador = elemento.split("|");
	var enlaces = document.getElementsByClassName("Enlace" + identificador[0] + "-" + identificador[1]);
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			var valor = "";
			valor = this.className.split("Enlace").join("").trim().split("-").join("|");
			ordenarMatriz(this);
			var pagina;
			switch (identificador[1]) {
				case "0":
					pagina = indiceActualPagina;
					break;
				case "1":
					pagina = indiceActualPaginaM;
					break;
				case "2":
					pagina = indiceActualPaginaP;
					break;
				case "3":
					pagina = indiceActualPaginaB;
					break;

			}
			mostrarMatriz(pagina, valor);
		}
	}
}

function ordenarMatriz(enlace) {
	var nombreMatriz = enlace.className.split("Enlace").join("").trim().split("-");
	indiceOrden = enlace.getAttribute("data-orden") + "|" + nombreMatriz[0];
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(nombreMatriz[0] + "-" + nombreMatriz[1]);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	window["matriz" + nombreMatriz[0]].sort(ordenar);
}

function ordenar(x, y) {
	var orden = indiceOrden.split("|");
	var indice = orden[0] * 1;
	var valX = (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]);
	var valY = (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]);
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function limpiarEnlaces(dato) {
	var enlaces = document.getElementsByClassName("Enlace" + dato);
	var nEnlaces = enlaces.length;
	var enlace;
	var campo;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		campo = enlace.innerHTML;
		enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	}
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
	crearMatriz("Periodo|0");
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, "Periodo|0");
	else {
		paginar(0, "Periodo|0");
		indiceActualBloque = 0;
	}
}

function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador[1]) {
		case "0":
			contenido = "<table id='tblPeriodo' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
			break;
		case "1":
			contenido = "<table id='tblMedico' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosM'/></th>";
			break;
		case "2":
			contenido = "<div style='width:4000px'><table id='tblProduccion' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosP'/></th>";
			break;
		case "3":
			contenido = "<div style='width:2000px'><table id='tblBonificacion' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosB'/></th>";
			break;
		case "4":
			contenido = "<div style='width:2000px'><table id='tblMontoFijo' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosMF'/></th>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador[0]][j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace";
		contenido += identificador[0];
		contenido += "-";
		contenido += identificador[1];
		contenido += "' data-orden='";
		contenido += window["matrizIndice" + identificador[0]][j];
		contenido += "'>";
		contenido += window["cabeceras" + identificador[0]][j];
		contenido += "</span><br/>";
		if (identificador[1] == "1" || identificador[1] == "2" || identificador[1] == "3") {
			if (identificador[1] == "1") {
				if (j == 1) {
					contenido += "<select id='cboTipoAdmMed' class='cbo";
					contenido += identificador[0];
					contenido += "' name='cabecera";
					contenido += identificador[0];
					contenido += "' style='width:90%'></select>";
				}
				else {
					contenido += "<input type='text' class='Texto";
					contenido += identificador[0];
					contenido += "' name='cabecera";
					contenido += identificador[0];
					contenido += "' style='width:90%'>";
				}
			} else {
				contenido += "<input type='text' class='Texto";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "' style='width:90%'>";
			}
		} else {
			if (j == 1 && identificador[1] != "4") {
				contenido += "<select id='cboTipoAdm' class='cbo";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "' style='width:90%'></select>";
			} else {
				contenido += "<input type='text' class='Texto";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "' style='width:90%'>";
			}
		}
		contenido += "</th>";
	}
	if (identificador[1] == "1") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='ExportarExcel" + identificador[0] + "'></a></th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	contenido += (nCampos + (identificador[1] == "0" ? 1 : 2)).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	if (identificador[1] == "2" || identificador[1] == "3" || identificador[1] == "4") {
		contenido += "</div>";
	}
	document.getElementById("div" + identificador[0]).innerHTML = contenido;
}

function paginar(indicePagina, elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var esBloque = (indicePagina < 0);
	var registroPaginaActual;
	if (identificador[1] == "2" || identificador[1] == "3") {
		registroPaginaActual = registroPaginaDetalle;
	} else {
		registroPaginaActual = registrosPagina;
	}
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
		if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
		if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
		switch (indicePagina) {
			case -1:
				indicePagina = 0;
				switch (identificador[1]) {
					case "0":
						indiceActualBloque = 0;
						break;
					case "1":
						indiceActualBloqueM = 0;
						break;
					case "2":
						indiceActualBloqueP = 0;
						break;
					case "3":
						indiceActualBloqueB = 0;
						break;

				}
				break;
			case -2:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloque > 0) {
							indiceActualBloque--;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloqueM > 0) {
							indiceActualBloqueM--;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueP > 0) {
							indiceActualBloqueP--;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueB > 0) {
							indiceActualBloqueB--;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
				}
				break;
			case -3:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloque < indiceUltimoBloque) {
							indiceActualBloque++;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloqueM < indiceUltimoBloque) {
							indiceActualBloqueM++;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueP < indiceUltimoBloque) {
							indiceActualBloqueP++;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueB < indiceUltimoBloque) {
							indiceActualBloqueB++;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
				}
				break;
			case -4:
				switch (identificador[1]) {
					case "0":
						indicePagina = indiceUltimaPagina;
						indiceActualBloque = indiceUltimoBloque;
						break;
					case "1":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueM = indiceUltimoBloque;
						break;
					case "2":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueP = indiceUltimoBloque;
						break;
					case "3":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueB = indiceUltimoBloque;
						break;
				}
				break;
		}
	}
	switch (identificador[1]) {
		case "0":
			indiceActualPagina = indicePagina;
			break;
		case "1":
			indiceActualPaginaM = indicePagina;
			break;
		case "2":
			indiceActualPaginaP = indicePagina;
			break;
		case "3":
			indiceActualPaginaB = indicePagina;
			break;
	}
	mostrarMatriz(indicePagina, elemento);
}

function crearMatriz(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0, nFiltro, regFiltro, ndDpl = false, posproceso;
	if (window["lista" + identificador[0]][0] != "") {
		window["matriz" + identificador[0]] = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = window["lista" + identificador[0]][i].split("¦");
			window["matriz" + identificador[0]][x] = [];
			nCampos = campos.length;
			switch (identificador[1]) {
				case "4":
				case "3":
				case "2":
				case "0":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					if (identificador[1] == "2") {
						mtProd += (campos[19] * 1);
					} else if (identificador[1] == "3") {
						mtBon += (campos[10] * 1);
					} else if (identificador[1] == "4") {
						mtMon += (campos[2] * 1);
					}
					break;
				case "1":
					if (PeriodosSeleccionados.length > 0) {
						posproceso = buscarProceso(campos[0] * 1);
						if (posproceso > -1) {
							ndDpl = false;
							if (PeriodosSeleccionados.length > 1) {
								nFiltro = window["matriz" + identificador[0]].length;
								if (nFiltro > 0) {
									for (var k = 0; k < nFiltro; k++) {
										regFiltro = window["matriz" + identificador[0]][k];
										if (regFiltro.indexOf(campos[7] * 1) > -1 && regFiltro[8] == (campos[8] * 1)) {
											ndDpl = true;
											window["matriz" + identificador[0]][k][2] = (regFiltro[2] * 1) + (campos[2] * 1);
											window["matriz" + identificador[0]][k][3] = (regFiltro[3] * 1) + (campos[3] * 1);
											window["matriz" + identificador[0]][k][4] = (regFiltro[4] * 1) + (campos[4] * 1);
											window["matriz" + identificador[0]][k][5] = (regFiltro[5] * 1) + (campos[5] * 1);
											window["matriz" + identificador[0]][k][6] = (regFiltro[6] * 1) + (campos[6] * 1);
											mtMedico += (campos[6] * 1);
											if (window["matriz" + identificador[0]][k][9].indexOf(PeriodosSeleccionados[posproceso][0].toString()) == -1) {
												window["matriz" + identificador[0]][k][9] = window["matriz" + identificador[0]][k][9] + "|" + PeriodosSeleccionados[posproceso][0].toString();
											}
											break;
										}
									}

								}
							}
							if (!ndDpl) {
								for (var j = 0; j < nCampos; j++) {
									if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
									else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
								}
								mtMedico += (campos[6] * 1);
								window["matriz" + identificador[0]][x][nCampos] = PeriodosSeleccionados[posproceso][0].toString();
								x++;
							}
						}
					}
					break;
			}
			if (identificador[1] != "1") {
				x++;
			}
		}
		if (identificador[1] == "1") {
			if (matrizMedico[matrizMedico.length - 1].length == 0) {
				matrizMedico.splice((matrizMedico.length - 1), 1);
			}
			document.getElementById("spnTotalMedico").innerHTML = formatearNumero(mtMedico);
		}

	}
	else {
		window["matriz" + identificador[0]] = [];
	}
}

function mostrarMatriz(indicePagina, elemento) {

	var identificador = elemento.split("|");
	switch (identificador[1]) {
		case "0":
			indiceActualPagina = indicePagina;
			break;
		case "1":
			indiceActualPaginaM = indicePagina;
			break;
		case "2":
			indiceActualPaginaP = indicePagina;
			break;
		case "3":
			indiceActualPaginaB = indicePagina;
			break;
		case "4":
			indiceActualPaginaMF = indicePagina;
			break;
	}

	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var registroPaginaActual;
		if (identificador[1] == "2" || identificador[1] == "3") {
			registroPaginaActual = registroPaginaDetalle;
		} else {
			registroPaginaActual = registrosPagina;
		}

		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registroPaginaActual;
		var fin = inicio + registroPaginaActual;
		var valorTadm;
		switch (identificador[1]) {
			case "0":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnPrincipal'";
						contenido += " data-check='";
						contenido += window["matriz" + identificador[0]][i][0];
						contenido += "¯" + window["matriz" + identificador[0]][i][6] + "'";
						contenido += (buscarProceso(window["matriz" + identificador[0]][i][0]) > -1 ? " checked" : "");
						contenido += "/></td>";
						for (var j = 1; j < nCampos - 1; j++) {
							contenido += "<td ";
							switch (j) {
								case 2:
									contenido += ">";
									if (lstTadm.length > 0) {
										for (var k = 0; k < lstTadm.length; k++) {
											valorTadm = lstTadm[k].split("¦");
											if (valorTadm[0] == window["matriz" + identificador[0]][i][j]) {
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
									contenido += formatearNumero(window["matriz" + identificador[0]][i][j]);
									break;
								default:
									contenido += ">";
									contenido += window["matriz" + identificador[0]][i][j];
									break;
							}
							contenido += "</td>";

						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "1":
				var datoTipoAdmision="";
				for (var i = inicio; i < fin; i++) {
					camposSecuencia = "";
					if (i < n) {
						camposSecuencia += window["matriz" + identificador[0]][i][0];
						camposSecuencia += "|1";
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' ";
						contenido += " data-check='";
						contenido += window["matriz" + identificador[0]][i][7];
						contenido += "¯";
						contenido += window["matriz" + identificador[0]][i][9];
						contenido += "¯";
						contenido += window["matriz" + identificador[0]][i][8];
						contenido += "'";
						contenido += (buscarProceso(window["matriz" + identificador[0]][i][7], 3, window["matriz" + identificador[0]][i][8]) > -1 ? " checked" : "");
						contenido += "/></td>";
						for (var j = 1; j < nCampos - 2; j++) {
							contenido += "<td";
							switch (j) {
								case 2:
									contenido += ">";
									for (var k = 0; k < lstTadm.length;k++) {
										datoTipoAdmision=lstTadm[k].split("¦");
										if((datoTipoAdmision[0]*1)==window["matriz" + identificador[0]][i][8]){
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
									contenido += " style='text-align:right'>";
									contenido += formatearNumero(window["matriz" + identificador[0]][i][j - 1]);
									break;
								default:
									contenido += ">";
									contenido += window["matriz" + identificador[0]][i][j];
									break;
							}
							contenido += "</td>";

						}
						contenido += "<td style='text-align:center'><span class='Icons fa-list-alt'";
						contenido += " data-Det='";
						contenido += window["matriz" + identificador[0]][i][7];
						contenido += "-";
						contenido += window["matriz" + identificador[0]][i][9];
						contenido += "-";
						contenido += window["matriz" + identificador[0]][i][8];
						contenido += "'></span></td>";
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "2":
			case "3":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' ";
						contenido += " data-check='";
						if (identificador[1] == "2") {
							contenido += window["matriz" + identificador[0]][i][28];
							contenido += "¦" + window["matriz" + identificador[0]][i][19];
							contenido += "¦" + window["matriz" + identificador[0]][i][18];
							contenido += "¦" + window["matriz" + identificador[0]][i][17];
							contenido += "¦" + window["matriz" + identificador[0]][i][16];
							contenido += "'";
							contenido += (buscarProceso(window["matriz" + identificador[0]][i][28], 1) > -1 ? " checked" : "");
						} else {
							contenido += window["matriz" + identificador[0]][i][14];
							contenido += "¦" + window["matriz" + identificador[0]][i][10];
							contenido += "¦¦" + window["matriz" + identificador[0]][i][9];
							contenido += "¦" + window["matriz" + identificador[0]][i][8];
							contenido += "'";
							contenido += (buscarProceso(window["matriz" + identificador[0]][i][14], 2) > -1 ? " checked" : "");
						}
						contenido += "/></td>";
						for (var j = 0; j < nCampos - 1; j++) {

							contenido += "<td";
							if (identificador[1] == "2") {
								switch (j) {
									case 8:
									case 10:
									case 11:
									case 13:
									case 14:
									case 15:
									case 16:
									case 17:
									case 18:
									case 19:
										contenido += " style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador[0]][i][j]);
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador[0]][i][j];
										break;
								}
							} else {
								switch (j) {
									case 6:
										contenido += ">";
										if (window["matriz" + identificador[0]][i][j] == "False") {
											contenido += "No";
										} else {
											contenido += "Sí";
										}
										break
									case 7:
									case 8:
									case 9:
									case 10:
										contenido += " style='text-align:right'>";
										contenido += formatearNumero(window["matriz" + identificador[0]][i][j]);
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador[0]][i][j];
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
			case "4":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' ";
						contenido += " data-check='";
						contenido += window["matriz" + identificador[0]][i][7];
						contenido += "¦" + window["matriz" + identificador[0]][i][2];
						contenido += "'";
						contenido += (buscarProceso(window["matriz" + identificador[0]][i][7], 4) > -1 ? " checked" : "");

						contenido += "/></td>";
						for (var j = 0; j < nCampos; j++) {

							contenido += "<td";
							switch (j) {
								case 5:
									contenido += ">";
									if (window["matriz" + identificador[0]][i][j] == "False") {
										contenido += "No";
									} else {
										contenido += "Sí";
									}
									break
								case 6:
									contenido += ">";
									switch (window["matriz" + identificador[0]][i][j]) {
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
									contenido += formatearNumero(window["matriz" + identificador[0]][i][j]);
									break;
								default:
									contenido += ">";
									contenido += window["matriz" + identificador[0]][i][j];
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
		var nCabeceras = window["cabeceras" + identificador[0]].length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + (identificador[1] != "1" ? 1 : 2)).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + (identificador[1] == "1" ? "Medico" : identificador[0])).innerHTML = contenido;
	crearPaginas(elemento);
	if (esBloque) {
		crearPaginas(elemento);
	}
}

function crearPaginas(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var registroPaginaActual;
	if (identificador[1] == "2" || identificador[1] == "3") {
		registroPaginaActual = registroPaginaDetalle;
	} else {
		registroPaginaActual = registrosPagina;
	}

	var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
	if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
	if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
	var contenido = "", bloqueActual;
	switch (identificador[1]) {
		case "0":
			bloqueActual = indiceActualBloque;
			break;
		case "1":
			bloqueActual = indiceActualBloqueM;
			break;
		case "2":
			bloqueActual = indiceActualBloqueP;
			break;
		case "3":
			bloqueActual = indiceActualBloqueB;
			break;

	}

	var inicio = bloqueActual * paginasBloque;
	var fin = inicio + paginasBloque;
	if ((bloqueActual) > 0 && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginar(-1,\"" + elemento + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2,\"" + elemento + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += ",\"";
			contenido += elemento;
			contenido += "\");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			contenido += "' id='a";
			contenido += identificador[0];
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if ((bloqueActual) < indiceUltimoBloque && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + (identificador[1] == "1" ? "Medico" : identificador[0])).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + (identificador[1] == "1" ? "Medico" : identificador[0])).innerHTML = ((identificador[1] == "2" || identificador[1] == "3") ? "<div style='position:fixed;width:100%'>" + contenido + "</div>" : contenido);
		seleccionarPaginaActual(identificador[0], identificador[1]);
	}
}

function seleccionarPaginaActual(dato, identificador) {
	var indice;
	switch (identificador) {
		case "0":
			indice = indiceActualPagina;
			break;
		case "1":
			indice = indiceActualPaginaM;
			break;
		case "2":
			indice = indiceActualPaginaP;
			break;
		case "3":
			indice = indiceActualPaginaB;
			break;

	}
	var aPagina = document.getElementById("a" + dato + ((dato.indexOf("Medico") > -1) ? indiceActualPaginaM : indice));
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function ConfiguracionControles() {

	var doc = document,
	tblPeriodo = doc.getElementById("tblPeriodo"),
	tblMedicos = doc.getElementById("tblMedico"),
	tblProduccion = doc.getElementById("tblProduccion"),
	tblBonificacion = doc.getElementById("tblBonificacion"),
	tblMontoFijo = doc.getElementById("tblMontoFijo"),
	btnConfirmar = doc.getElementById("btnConfirmar"),
	btnGrabar = doc.getElementById("btnGrabar"),
	btnConfirmarGrabar = doc.getElementById("btnConfirmarGrabar"),
	ExportarExcelMedico = doc.getElementById("ExportarExcelMedico"), texto;

	tblPeriodo.onclick = tblMedicos.onclick = tblProduccion.onclick = tblBonificacion.onclick = tblMontoFijo.onclick = function (e) {
		var el = e.target || e.srcElement;
		var tipo = el.type;
		if (this.id == "tblPeriodo") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodos") {
					SeleccionarChecks(0, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarProceso(chk[0] * 1);
						if (el.checked) {
							if (pos == -1) {
								PeriodosSeleccionados.push([(chk[0] * 1), (chk[1] * 1)]);
							}
						} else {
							if (pos > -1) {
								PeriodosSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				mtMedico = 0;
				posTipoAdmin == -1;
				mostrarMatriz(indiceActualPagina, "Periodo|0");
				crearMatriz("Medico|1");
				matrizMedicoFiltro = [];
				matrizMedicoFiltro = matrizMedico.slice(0);
				(PeriodosSeleccionados.length > 0 ? doc.getElementById("chkTodosM").checked = true : doc.getElementById("chkTodosM").checked = false);
				MedicosSeleccionados = [];
				SeleccionarChecks(1, true);
				indiceActualBloqueM = 0;
				mostrarMatriz(0, "Medico|1");
				if (MedicosSeleccionados.length > 0) {
					document.getElementById("btnGrabar").style.display = "";
				} else {
					document.getElementById("btnGrabar").style.display = "none";
				}
			}
		} else if (this.id == "tblMedico") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosM") {
					posTipoAdmin = -1;
					SeleccionarChecks(1, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						posTipoAdmin = chk[2] * 1;
						var pos = buscarProceso((chk[0] * 1), 3);
						if (el.checked) {
							if (pos == -1) {
								MedicosSeleccionados.push([(chk[0] * 1), "", chk[1], "", "", "", chk[2]]);
							}
						} else {
							if (pos > -1) {
								MedicosSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				mostrarMatriz(indiceActualPaginaM, "Medico|1");
				if (MedicosSeleccionados.length > 0) {
					document.getElementById("btnGrabar").style.display = "";
				} else {
					document.getElementById("btnGrabar").style.display = "none";
				}
			} else if (el.nodeName == "SPAN" && (el.className.indexOf("Icons") > -1)) {
				if (el.getAttribute("data-det") != null) {
					var data = el.getAttribute("data-det").split("-");
					var procesos = data[1].split("|"), n = procesos.length, srtLista = "";
					for (var i = 0; i < n; i++) {
						srtLista += procesos[i] + "¦" + data[0] + "¦" + data[2] + "¬";
					}
					indiceActualPaginaP = 0;
					indiceActualPaginaB = 0;
					indiceActualBloqueP = 0;
					indiceActualBloqueB = 0;
					srtLista = srtLista.substring(0, srtLista.length - 1);
					document.getElementById("spnMtoDetalle").innerHTML = "0.00";
					document.getElementById("tbProduccion").innerHTML = "";
					document.getElementById("tbBonificacion").innerHTML = "";
					document.getElementById("gifLoad").style.display = "initial";
					var url = urlBase + "Proceso/obtenerPlanillaDetallelistas/?ss=" + ss + "&su=" + sucursalId;
					$.ajax(url, "post", mostrarDetalle, srtLista);
					abrirPopup("PopupDetalle");
					posReg = data[0] * 1;
					posTipoAdmin = data[2] * 1;
				}
			}
		} else if (this.id == "tblProduccion") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosP") {
					SeleccionarChecks(2, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¦");
						var pos = buscarProceso((chk[0] * 1), 1);
						if (el.checked) {
							if (pos == -1) {
								ProduccionSeleccionados.push([(chk[0] * 1), (chk[1] * 1), (chk[2] * 1), (chk[3] * 1), (chk[4] * 1)]);
							}
						} else {
							if (pos > -1) {
								ProduccionSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				var totalesp = obtenerTotales(0);
				var totalesb = obtenerTotales(1);
				var totalesmf = obtenerTotales(2);
				document.getElementById("spnMtoDetalle").innerHTML = formatearNumero((totalesp.t + totalesb.t + totalesb.t));
				mostrarMatriz(indiceActualPaginaP, "Produccion|2");
			}
		} else if (this.id == "tblBonificacion") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosB") {
					SeleccionarChecks(3, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¦");
						var pos = buscarProceso((chk[0] * 1), 2);
						if (el.checked) {
							if (pos == -1) {
								BonificacionSeleccionados.push([(chk[0] * 1), (chk[1] * 1), "", (chk[3] * 1), (chk[4] * 1)]);
							}
						} else {
							if (pos > -1) {
								BonificacionSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				var totalesp = obtenerTotales(0);
				var totalesb = obtenerTotales(1);
				var totalesmf = obtenerTotales(2);
				document.getElementById("spnMtoDetalle").innerHTML = formatearNumero((totalesp.t + totalesb.t + totalesb.t));
				mostrarMatriz(indiceActualPaginaB, "Bonificacion|3");

			}
		}
		else if (this.id == "tblMontoFijo") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosMF") {
					SeleccionarChecks(4, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¦");
						var pos = buscarProceso((chk[0] * 1), 4);
						if (el.checked) {
							if (pos == -1) {
								MontoFijoSeleccionados.push([(chk[0] * 1), (chk[1] * 1), "", "", ""]);
							}
						} else {
							if (pos > -1) {
								MontoFijoSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				var totalesp = obtenerTotales(0);
				var totalesb = obtenerTotales(1);
				var totalesmf = obtenerTotales(2);
				document.getElementById("spnMtoDetalle").innerHTML = formatearNumero((totalesp.t + totalesb.t + totalesmf.t));
				mostrarMatriz(indiceActualPaginaMF, "MontoFijo|4");

			}
		}
		e.stopPropagation();
	}

	var textos = doc.getElementsByClassName("TextoMedico");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
			texto.onkeyup = function (e) {
				if (matrizMedico.length > 0) {
					filtrar("MedicoFiltro|1");
				}
			}
		
	}


	var cboMedico = doc.getElementsByClassName("cboMedico");
	var nComboMedico = cboMedico.length, texto;
	for (var i = 0; i < nComboMedico; i++) {
		texto = cboMedico[i];
		texto.onchange = function (e) {
			if (matrizMedico.length > 0) {
				filtrar("MedicoFiltro|1");
			}
		}
	}
	var TextoPeriodo = doc.getElementsByName("cabeceraPeriodo");
	var n = TextoPeriodo.length;
	for (var i = 0; i < n; i++) {
		texto = TextoPeriodo[i];
		if (texto.nodeName == "SELECT") {
			texto.onchange = function (e) {
				if (matrizPeriodo.length > 0) {
					filtrar("Periodo|0");

				}
			}
		} else {
			texto.onkeyup = function (e) {
				if (matrizPeriodo.length > 0) {
					filtrar("Periodo|0");

				}
			}
		}
	}

	var textos = doc.getElementsByClassName("TextoProduccion");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			if (matrizMedico.length > 0) {
				filtrar("Produccion|2");

			}
		}
	}
	var textos = doc.getElementsByClassName("TextoBonificacion");
	var ntextos = textos.length, texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			if (matrizMedico.length > 0) {
				filtrar("Bonificacion|3");

			}
		}
	}

	ExportarExcelMedico.onclick = function () {

		var nRegistros = (matrizMedicoFiltro.length == 0 ? matrizMedico.length : matrizMedicoFiltro.length);
		if (nRegistros > 0) {
			exportacion();
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "PlanillaMedicos.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	btnConfirmar.onclick = function () {
		var tlProd = 0, tlBon = 0, tlMon = 0, tlpA = 0, tlpB = 0, tlpI = 0, tlmfA = 0, tlmfB = 0, tlmfI = 0, tlbA = 0, tlbB = 0, tlbI = 0, objTl;
		if (BonificacionSeleccionados.length == 0 && ProduccionSeleccionados.length == 0 && MontoFijoSeleccionados.length == 0) {
			mostraralerta("Seleccione por lo menos un registro");
		} else {
			if (listaProduccion.length > 0) {
				if (ProduccionSeleccionados.length > 0) {
					if (listaProduccion.length != ProduccionSeleccionados.length) {
						objTl = obtenerTotales(0);
						tlProd = objTl.t;
						tlpA = objTl.a;
						tlpB = objTl.b;
						tlpI = objTl.i;
					}
				}
			}
			if (listaBonificacion.length > 0) {
				if (BonificacionSeleccionados.length > 0) {
					if (listaBonificacion.length != BonificacionSeleccionados.length) {
						objTl = obtenerTotales(1);
						tlBon = objTl.t;
						tlbA = objTl.a;
						tlbB = objTl.b;
						tlbI = objTl.i;
					}
				}
			}
			if (listaMontoFijo.length > 0) {
				if (MontoFijoSeleccionados.length > 0) {
					if (listaMontoFijo.length != MontoFijoSeleccionados.length) {
						objTl = obtenerTotales(2);
						tlMon = objTl.t;
						tlmfI = objTl.t;
						var dato = objTl.t;
					}
				}
			}
			var pos = buscarMedico(posReg);
			var registro = matrizMedico[pos];
			if (registro != undefined) {
				registro[6] = (tlProd + tlBon + tlMon);//t
				registro[5] = (tlpA + tlbA + tlmfA);//a
				registro[4] = (tlpB + tlbB + tlmfB);//b
				registro[2] = (tlpI + tlbI + tlmfI);//t

				pos = buscarProceso(registro[7], 3);
				var objIds = obtenerIdDetalle();
				MedicosSeleccionados[pos][1] = objIds.g;
				MedicosSeleccionados[pos][3] = objIds.p;
				MedicosSeleccionados[pos][4] = objIds.b;
				MedicosSeleccionados[pos][5] = objIds.m;
				MedicosSeleccionados[pos][6] = posTipoAdmin;
				mostrarMatriz(indiceActualPaginaM, "Medico|1");

			}
			abrirPopup('PopupDetalle');
		}
	}
	var btnPlanillaExcel = document.getElementById("btnPlanillaExcel");
	btnPlanillaExcel.onclick = function () {
		var gifLoad = document.getElementById("gifLoad3");
		gifLoad.style.display = "none";
		var txtDescripcionGrabar = document.getElementById("txtDescripcionGrabar");
		txtDescripcionGrabar.value = "";
		txtDescripcionGrabar.className = "";
		var anio = document.getElementById("cboMesGrabar");
		anio.selectedIndex = "0";
		document.getElementById("GrabarExcel").style.display = "";
		document.getElementById("fupArchivo").value = "";
		document.getElementById("fupArchivo").style.display = "";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
		var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
		cboTipoPlanilla.selectedIndex = "0";
		cboTipoPlanilla.className = "";
		cboTipoPlanilla.disabled = false;
		abrirPopup("PopupGrabar");
		opcionCarga = 1;

	}
	btnGrabar.onclick = btnConfirmarGrabar.onclick = function () {
		if (MedicosSeleccionados.length > 0 || opcionCarga == 1) {
			var txtDescripcionGrabar = document.getElementById("txtDescripcionGrabar");
			if (this.id == "btnGrabar") {
				txtDescripcionGrabar.value = "";
				txtDescripcionGrabar.className = "";
				document.getElementById("fupArchivo").style.display = "none";
				document.getElementById("GrabarExcel").style.display = "none";
				opcionCarga = 2;
				var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
				cboTipoPlanilla.selectedIndex = "0";
				cboTipoPlanilla.className = "lectura";
				cboTipoPlanilla.disabled = true;
				abrirPopup("PopupGrabar");
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
						var obj = obtenerListaGrabar(),
						srt = obj.p + "¯" + obj.d + "¯" + txtDescripcionGrabar.value;
						url = urlBase + "Proceso/grabarPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId;
						$.ajax(url, "post", mostrarRpta, srt);
						doc.getElementById("btnGrabar").disabled = true;
						var spnCerrar = document.getElementById("spnCerrar");
						var spnCancelar = document.getElementById("spnCancelar");
						spnCancelar.onclick = spnCerrar.onclick = null;
					}
					else {
						if (matrizValidados.length > 0) {
							str = listaValidados + "¯" + txtDescripcionGrabar.value;
							url = urlBase + "Proceso/grabarCargaPlanilla/?ss=" + ss + "&anio=" + anio.value + "&su=" + sucursalId + "&tipo=" + document.getElementById("cboTipoPlanilla").value;
							$.ajax(url, "post", mostrarRpta, str);
							doc.getElementById("btnGrabar").disabled = true;
							var spnCerrar = document.getElementById("spnCerrar");
							var spnCancelar = document.getElementById("spnCancelar");
							spnCancelar.onclick = spnCerrar.onclick = null;
						}
						else {
							mostraralerta("No hay una carga valida");
						}
					}
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					//this.onclick = null;

				}

			}
		} else {
			mostraralerta("Seleccione por lo menos un médico");
		}
	}

	var fup = document.getElementById("fupArchivo");
	var gifLoad = document.getElementById("gifLoad3");
	fup.onclick = function () {
		this.value = "";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
	}
	fup.onchange = function () {
		if (this.value != "") {
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
		}
		else {
			this.value = "";
			crearMatriz2("divValidados", "");
			crearMatriz2("divErrados", "");
		}
	};

	var cboTipoPlanilla = document.getElementById("cboTipoPlanilla");
	cboTipoPlanilla.onchange = function () {
		document.getElementById("fupArchivo").value = "";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
	}
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
}

function filtrar(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = document.getElementsByName("cabecera" + (identificador[1] == "1" ? "Medico" : identificador[0]));
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	window["matriz" + identificador[0]] = [];
	var nRegistros = (identificador[1] != "1" ? (window["lista" + identificador[0]].length) : (matrizMedico.length));
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var nFiltrados = window["matrizIndice" + identificador[0]].length
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = ((identificador[1] == "0" || identificador[1] == "2" || identificador[1] == "3") ? (window["lista" + identificador[0]][i].split("¦")) : (matrizMedico[i]));
		campoFiltrado = [];
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + (identificador[1] == "1" ? "Medico" : identificador[0]))) exito = exito && (campos[window["matrizIndice" + identificador[0]][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[window["matrizIndice" + identificador[0]][j]] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador[0]][x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
			}
			x++;
		}
	}
	paginar(0, elemento);
	switch (identificador) {
		case "0":
			indiceActualPagina = 0;
			break;
		case "1":
			indiceActualPaginaM = 0;
			break;
		case "2":
			indiceActualPaginaP = 0;
			break;
		case "3":
			indiceActualPaginaB = 0;
			break;

	}
}


function abrirPopup(popup) {
	var popup = document.getElementById(popup);
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
						ProduccionSeleccionados.push([reg[28], reg[19], reg[18], reg[17], reg[16]]);
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
						BonificacionSeleccionados.push([reg[14], reg[10], "", reg[9], reg[8]]);
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
						MontoFijoSeleccionados.push([reg[7], reg[2], "", "", ""]);
					}
				}
			} else {
				MontoFijoSeleccionados = [];
			}
			break;
	}

}
function buscarProceso(p, t, x) {
	var n, reg, pos = -1;
	if (t == undefined) {
		n = PeriodosSeleccionados.length
	} else if (t == 1) {
		n = ProduccionSeleccionados.length
	} else if (t == 2) {
		n = BonificacionSeleccionados.length
	} else if (t == 3) {
		n = MedicosSeleccionados.length
	} else if (t == 4) {
		n = MontoFijoSeleccionados.length
	}
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			if (t == undefined) {
				reg = PeriodosSeleccionados[i];
			} else if (t == 1) {
				reg = ProduccionSeleccionados[i];
			} else if (t == 2) {
				reg = BonificacionSeleccionados[i];
			} else if (t == 3) {
				reg = MedicosSeleccionados[i];
			} else if (t == 4) {
				reg = MontoFijoSeleccionados[i];
			}
			if (t == 3) {
				if (posTipoAdmin == -1) {
					if (reg[0] == p) {
						pos = i;
						break;
					}
				} else {
					if (reg[0] == p && reg[6] == (x != undefined ? x : posTipoAdmin.toString())) {
						pos = i;
						break;
					}
				}
			} else {
				if (reg[0] == p) {
					pos = i;
					break;
				}
			}
		}
	}
	return pos;
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
function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
	limpiar();
}
function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 210px' align='center'>Médico/Empresa</td>";
	cabecera += "<td style='width: 100px' align='center'>Importe</td>";
	cabecera += "<td style='width: 100px' align='center'>Descuento</td>";
	cabecera += "<td style='width: 100px' align='center'>Bonificación</td>";
	cabecera += "<td style='width: 100px' align='center'>Ajuste</td>";
	cabecera += "<td style='width: 100px' align='center'>Total</td>";
	cabecera += "</tr>";
	return cabecera;
}
function exportacion() {
	var nRegistros = (matrizMedicoFiltro.length == 0 ? matrizMedico.length : matrizMedicoFiltro.length);
	var nCampos = (matrizMedicoFiltro.length == 0 ? matrizMedico[0].length : matrizMedicoFiltro[0].length);
	var contenido = [];
	var tipo = (matrizMedicoFiltro.length == 0 ? 0 : 1);
	excelExportar = crearCabeceraExportar();
	for (var i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 1; j < nCampos - 2; j++) {
			contenido.push("<td>");
			switch (j) {

				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					if (tipo == 0) {
						contenido.push(formatearNumero(matrizMedico[i][j]));
					} else {
						contenido.push(formatearNumero(matrizMedicoFiltro[i][j]));
					}
					break;
				default:
					if (tipo == 0) {
						contenido.push(matrizMedico[i][j]);
					} else {
						contenido.push(matrizMedicoFiltro[i][j]);
					}
					break;
			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
}
function mostrarDetalle(r) {
	mtProd = 0;
	mtBon = 0;
	ProduccionSeleccionados = [], BonificacionSeleccionados = [], MontoFijoSeleccionados = [];
	matrizProduccion = [], matrizBonificacion = [], matrizMontoFijo = [];
	mtProd = 0, mtBon = 0, mtMon = 0;
	document.getElementById("gifLoad").style.display = "none";
	if (r != "") {
		var data = r.split("¬");
		listaProduccion = data[0] != "" ? (data[0].split("¯")) : [];
		listaBonificacion = data[1] != "" ? (data[1].split("¯")) : [];
		listaMontoFijo = data[2] != "" ? (data[2].split("¯")) : [];
		var posMedico = buscarProceso(posReg, 3);
		var dostosSeleccionados = MedicosSeleccionados[posMedico][1];

		if (listaProduccion.length > 0) {
			crearMatriz("Produccion|2");
			document.getElementById("chkTodosP").checked = true;
			SeleccionarChecks(2, true);
			if (dostosSeleccionados != "") {
				var ids = dostosSeleccionados.split("¦"), n = ids.length, np = ProduccionSeleccionados.length, reg, exito = false;

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
					}
				}
			}
			indiceActualBloqueP = 0;
			mostrarMatriz(indiceActualPaginaP, "Produccion|2");
			document.getElementById("tab1").className = "tab-link";
		} else {
			ProduccionSeleccionados = [];
			document.getElementById("tbProduccion").innerHTML = "";
			document.getElementById("tab1").className = "tab-link bloqueado";
		}
		if (listaBonificacion.length > 0) {
			crearMatriz("Bonificacion|3");
			document.getElementById("chkTodosB").checked = true;
			SeleccionarChecks(3, true);
			if (dostosSeleccionados != "") {
				var ids = dostosSeleccionados.split("¦"), n = ids.length, np = BonificacionSeleccionados.length, reg, exito = false;

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
					}
				}
			}
			indiceActualBloqueB = 0;
			mostrarMatriz(indiceActualPaginaB, "Bonificacion|3");
			document.getElementById("tab2").className = "tab-link";
		} else {
			BonificacionSeleccionados = [];
			document.getElementById("tbBonificacion").innerHTML = "";
			document.getElementById("tab2").className = "tab-link bloqueado";
		}
		if (listaMontoFijo.length > 0) {
			crearMatriz("MontoFijo|4");
			document.getElementById("chkTodosMF").checked = true;
			SeleccionarChecks(4, true);
			if (dostosSeleccionados != "") {
				var ids = dostosSeleccionados.split("¦"), n = ids.length, np = MontoFijoSeleccionados.length, reg, exito = false;

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
					}
				}
			}
			indiceActualBloqueMF = 0;
			mostrarMatriz(indiceActualPaginaMF, "MontoFijo|4");
			document.getElementById("tab3").className = "tab-link";
		} else {
			MontoFijoSeleccionados = [];
			document.getElementById("tbMontoFijo").innerHTML = "";
			document.getElementById("tab3").className = "tab-link bloqueado";
		}
		if (listaProduccion.length > 0) {
			document.getElementById("tab1").onclick();
		}
		else if (listaBonificacion.length > 0) {
			document.getElementById("tab2").onclick();
		}
		else if (listaMontoFijo.length > 0) {
			document.getElementById("tab3").onclick();
		}

		document.getElementById("spnMtoDetalle").innerHTML = formatearNumero((mtProd + mtBon + mtMon));
	}
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
function obtenerListaGrabar() {
	var matriz=NuevoFiltroMedicosSeleccionados();
	MedicosSeleccionados = [];
	MedicosSeleccionados = matriz.slice(0);
	var n = MedicosSeleccionados.length, reg, cnt = "", cnt1 = "";
	if (n > 0) {
		var proceso, nproceso;
		for (var i = 0; i < n; i++) {
			reg = MedicosSeleccionados[i];
			if (reg[3] == "" && reg[4] == "" && reg[5] == "") {
				proceso = reg[2].split("|");
				nproceso = proceso.length;
				for (var j = 0; j < nproceso; j++) {
					cnt += proceso[j] + "¦" + reg[0];
					for (var x = 0; x < matrizMedico.length; x++) {
						if (matrizMedico[x][7] == (reg[0] * 1)) {
							cnt += "¦"+matrizMedico[x][8]+ "¦"+ matrizMedico[x][6];
							break;
						}
					}
					cnt += "¬";
				}
			} else {
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
	cnt = cnt.substring(0, cnt.length - 1);
	cnt1 = cnt1.substring(0, cnt1.length - 1);
	return { p: cnt, d: cnt1 };
}
function mostrarRpta(r) {
	abrirPopup("PopupGrabar");
	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.disabled = false;
	var btnConfirmarGrabar = document.getElementById("btnConfirmarGrabar");
	btnConfirmarGrabar.innerHTML = "Grabar"
	var spnCerrar = document.getElementById("spnCerrar");
	var spnCancelar = document.getElementById("spnCancelar");
	spnCancelar.onclick = spnCerrar.onclick = function () {
		abrirPopup('PopupGrabar');
	}

	if (r != "") {
		var url = urlBase + "Proceso/obtenerListas/?ss=" + ss + "&su=" + sucursalId;
		$.ajax(url, "get", listarTodo);
		PeriodosSeleccionados = [], MedicosSeleccionados = [], ProduccionSeleccionados = [], BonificacionSeleccionados = [],
		indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0;
		indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0;
		matrizPeriodo = [], matrizMedico = [], matrizMedicoFiltro = [], matrizProduccion, matrizBonificacion = [];
		var contenido = "";
		var nCabeceras = cabecerasMedico.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbMedico").innerHTML = contenido;
		document.getElementById("tdPaginasMedico").innerHTML = "";
		document.getElementById("chkTodosM").checked = false;
		document.getElementById("spnTotalMedico").innerHTML = "0.00";
		mostraralerta("Planilla grabada");
	} else {
		mostraralerta("Error al procesar planilla");
	}
}
function limpiar() {
	var cboMesGrabar = document.getElementById("cboMesGrabar");
	cboMesGrabar.className = cboMesGrabar.className.split("error").join("");
	cboMesGrabar.value = "";
}


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
	document.getElementById("gifLoad").style.display = "none";
}
function xw(data, cb) {
	if (transferable) xw_xfer(data, cb);
	else xw_noxfer(data, cb);
}

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
function s2ab(s) {
	var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
	for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}
function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
	return o;
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

function safe_format_cell(cell, v) {
	if (cell.z !== undefined) try { return (cell.w = SSF.format(cell.z, v)); } catch (e) { }
	if (!cell.XF) return v;
	try { return (cell.w = SSF.format(cell.XF.ifmt || 0, v)); } catch (e) { return '' + v; }
}

function format_cell(cell, v) {
	if (cell == null || cell.t == null) return "";
	if (cell.w !== undefined) return cell.w;
	if (v === undefined) return safe_format_cell(cell, cell.v);
	return safe_format_cell(cell, v);
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
function encode_row(row) { return "" + (row + 1); }




function NuevoFiltroMedicosSeleccionados() {
	var matriz=[];
	for (var y = 0; y < MedicosSeleccionados.length; y++) {
		for (var x = 0; x < matrizMedicoFiltro.length; x++) {
			if (matrizMedicoFiltro[x][7] == MedicosSeleccionados[y][0] && matrizMedicoFiltro[x][8] == MedicosSeleccionados[y][6]) {
				matriz.push(MedicosSeleccionados[y]);
				break;
			}
		}
	}
	return matriz;
}