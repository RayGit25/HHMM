var listaPrincipal = [], listaDetalle = [], listaMontoFijo = [];
var matrizPrincipal = [], matrizDetalle = [], matrizMontoFijo = [];
var matrizFiltroPrincipal = [], matrizFiltroDetalle = [], matrizFiltroMontoFijo = [];

var cabecerasPrincipal = ["Codigo OA", "Paciente", "Id Exp.", "Prestación", "Periodo Producción", "Fecha Prestación", "Fecha Atendido", "Fecha Terminado", "Prec. Uni.", "Cost. Prest.", "Cantidad", "Imponible", "Val. Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Méd.", "Parte Clín.", "Ajuste", "Bonificación", "Importe Provision", "Nro. Proceso", "Tipo Ajuste", "Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio","Mod. Facturación","Especialidad", "Estado", "ID Orden Atención", "Linea OA", "Est. Registro OA", "Fecha Hora Creación", "Fecha Hora Modificación"];
var anchosPrincipal = [10, 150, 10, 200, 120, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 120, 35, 5, 5,5, 5, 20, 20, 80, 150, 150];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35,36];

var cabecerasDetalle = ["Fecha", "Hora Inicio", "Hora Fin", "Horas", "Dia", "Feriado", "Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención"];
var anchosDetalle = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

var cabecerasMontoFijo = ["SucursalId", "Sucursal", "Periodo", "EmpresaId", "Empresa", "MedicoId", "Medico", "Descripción", "Importe", "ConceptoId", "Concepto"];
var anchosMontoFijo = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var matrizIndiceMontoFijo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


var registrosPagina = 5;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var esBloque = 0;
var excelExportar;
var urlBase = "";

window.onload = function () {
	var hdfDatos = document.getElementById("hdfDatos").value.replace("♣","&").split("|");
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	configuracionInicial();
	var frm = new FormData();
	frm.append("pro", hdfDatos[4]);
	frm.append("sap", hdfDatos[9]);
	var url = urlBase + "Proceso/listarDetalleConceptosOA/?ss=" + ss;
	$.ajax(url, "post", listarTodo,frm);
	document.getElementById("txtMedicoOA").value = hdfDatos[0];
	document.getElementById("txtPeriodoOAInicio").value = hdfDatos[7];
	document.getElementById("txtPeriodoOAFin").value = hdfDatos[8];
	document.getElementById("txtMontoOA").value = hdfDatos[1];
	switch (hdfDatos[2]) {
		case "P":
			document.getElementById("txtEstadoOA").value = "PENDIENTE";
			break;
		case "C":
			document.getElementById("txtEstadoOA").value = "CALCULADO";
			break;
		case "A":
			document.getElementById("txtEstadoOA").value = "AUTORIZADO";
			break;
		case "F":
			document.getElementById("txtEstadoOA").value = "PROVISIONADO";
			break;
	}
	document.getElementById("txtFAutorizadoOA").value = (hdfDatos[3].indexOf("1990") > -1 ? "" : hdfDatos[3]);
	var btnExcelDetalleError = document.getElementById("btnExcelDetalleError");
	btnExcelDetalleError.onclick = function () {
		var datos = exportarExcel();
		if (datos != "") {
			var anchorElem = document.createElement('a');
			formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", "ProvisionDetalleConceptoOAHorario.xls");
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			var elem = document.getElementById("atemp");
			return elem.parentNode.removeChild(elem);
		}
	}
}

function configuracionInicial() {
	crearTabla("Principal");
	crearTabla("Detalle");
	crearTabla("MontoFijo");
	configurarFiltro();
}

function listarTodo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		var lista1 = data[0].split("¯");
		var lista2 = data[1].split("¯");
		var lista3 = data[2].split("¯");
		crearMatriz(lista1, "Principal");
		crearMatriz(lista2, "Detalle");
		crearMatriz(lista3, "MontoFijo");
		paginar(0, "Principal");
		paginar(0, "Detalle");
		paginar(0, "MontoFijo");
		var ctab1 = document.getElementById("ctab1");
		var ctab2 = document.getElementById("ctab2");
		var ctab3 = document.getElementById("ctab3");
		ctab1.className = (data[0] != "" ? "tab-link" : "tab-link bloqueado");
		ctab2.className = (data[1] != "" ? "tab-link" : "tab-link bloqueado");
		ctab3.className = (data[2] != "" ? "tab-link" : "tab-link bloqueado");

		if (data[0] != "") {
			ctab1.click();
		}
		else if (data[1] != "") {
			ctab2.click();
		}
		else if (data[2] != "") {
			ctab3.click();
		}
		else {
			ctab1.click();
		}
		indiceActualBloque = 0;
	}
	var divIfrProcesoDetalleOA = window.parent.document.getElementById("divIfrProcesoDetalleOA");
	divIfrProcesoDetalleOA.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight + 20) + "px";
}

function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	contenido = "<div><table class='tabla-general' style='margin-bottom:-10px'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	var valorFor;
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
		contenido += "<input type='text' class='Texto";
		contenido += identificador;
		contenido += "' name='cabecera";
		contenido += identificador;
		contenido += "' style='width:80%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += nCampos.toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table></div>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}


function crearMatriz(lista, identificador) {
	var nRegistros = lista.length;
	var nCampos = 0, campos, x = 0, matriz = [], j = 0, i = 0;
	identificador = (identificador == undefined ? "" : identificador);
	if (nRegistros > 0 && lista[0] != "") {
		for (; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			nCampos = campos.length;
			matriz[x] = [];
			switch (identificador) {
				case "Principal":
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == ""||j==0) {
							switch (j) {
								case 35:
								case 36:
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
						if (isNaN(campos[j]) || campos[j] == "" || j == 0) matriz[x][j] = campos[j];
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
	} else {
		if (identificador != "") {
			window["matriz" + identificador] = [];
			window["matrizFiltro" + identificador] = [];
		} else {
			return matriz;
		}
	}
}


//function crearMatriz(elemento) {
//	var identificador = elemento.split("|");
//	var nRegistros = window["lista" + identificador[0]].length;
//	var nCampos;
//	var campos;
//	var x = 0;
//	if (window["lista" + identificador[0]][0] != "") {
//		window["matriz" + identificador[0]] = [];
//		for (i = 0; i < nRegistros; i++) {
//			campos = window["lista" + identificador[0]][i].split("¦");
//			window["matriz" + identificador[0]][x] = [];
//			nCampos = campos.length;
//			for (j = 0; j < nCampos; j++) {
//				if (isNaN(campos[j]) || campos[j] == "" || j == 0 || j == 19) window["matriz" + identificador[0]][x][j] = campos[j];
//				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
//			}
//			x++;
//		}
//	}
//	else {
//		window["matriz" + identificador[0]] = [];
//	}
//}

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
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var nCampos = window["cabeceras" + identificador].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "Principal":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						if (window["matriz" + identificador][i][32] == "True") {
							contenido += "<tr class='FilaDatos' style='background:rgba(247, 147, 140, 0.75);color:white;'>";
						}
						else {
							contenido += "<tr class='FilaDatos'>";
						}
						for (var j = 0; j < (nCampos) ; j++) {
							switch (j) {
								case 5:
								case 6:
								case 7:
								case 23:
									if (window["matriz" + identificador][i][33] == "True") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75)'>";
									}
									else {
										contenido += "<td>";
									}
									contenido += (window["matriz" + identificador][i][j].indexOf("1900") > -1 ? "" : window["matriz" + identificador][i][j]);
									break;
								case 8:
								case 9:
								case 10:
								case 11:
								case 12:
								case 14:
								case 15:
								case 16:
								case 17:
								case 18:
								case 19:
								case 20:
									if (window["matriz" + identificador][i][33] == "True") {
										contenido += "<td style='text-align:right;background:rgba(247, 147, 140, 0.75)'>";
									}
									else {
										contenido += "<td style='text-align:right'>";
									}
									contenido += window["matriz" + identificador][i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break

								case 21:
									if (window["matriz" + identificador][i][33] == "True") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75)'>";
									}
									else {
										contenido += "<td>";
									}
									contenido += (window["matriz" + identificador][i][j] == 0 ? "" : window["matriz" + identificador][i][j]);
									break;
								case 34:
								case 35:
									if (window["matriz" + identificador][i][33] == "True") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75)'>";
									}
									else {
										contenido += "<td>";
									}
									contenido += window["matriz" + identificador][i][j + 1];
									break;
								default:
									if (window["matriz" + identificador][i][33] == "True") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75)'>";
									}
									else {
										contenido += "<td>";
									}
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
			case "Detalle":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td style='width:";
							contenido += window["anchos" + identificador][j];
							contenido += "px";
							switch (j) {
								//case 4:
								case 5:
									contenido += ";text-align:center'>";
									contenido += (window["matriz" + identificador][i][j] == "True" ? "SI" : "NO");
									break;
									//case 6:
								case 3:
								case 6:
								case 7:
								case 8:
								case 9:
									contenido += ";text-align:right'>";
									contenido += matrizDetalle[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								default:
									contenido += "'>";
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
			case "MontoFijo":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td style='width:";
							contenido += window["anchos" + identificador][j];
							contenido += "px";
							switch (j) {
								case 8:
									contenido += ";text-align:right'>";
									contenido += matrizMontoFijo[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								default:
									contenido += "'>";
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
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
}

function configurarOrdenacion(identificador) {
	var enlaces = document.getElementsByClassName("Enlace" + identificador);
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			var valor = "";
			valor = this.className.split("Enlace").join("").trim().split("-").join("|");
			ordenarMatriz(this);
			mostrarMatriz(indiceActualPagina, valor);
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
	var valX = ((isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
	var valY = ((isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoPrincipal");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Principal");
		}
	}
	var combos = document.getElementsByClassName("ComboPrincipal");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Principal");
		}
	}
	var textos = document.getElementsByClassName("TextoDetalle");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Detalle");
		}
	}
	var combos = document.getElementsByClassName("ComboDetalle");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Detalle");
		}
	}

	var textos = document.getElementsByClassName("TextoMontoFijo");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("MontoFijo");
		}
	}
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
			window["matriz" + identificador][x] = matriz[i].slice(0);
			x++;
		}
		j = 0;
	}
	paginar(0, identificador);
	indiceActualBloque = 0;
}

//function filtrar(elemento) {
//	var identificador = elemento.split("|");
//	var cabeceras = document.getElementsByName("cabecera" + identificador[0]);
//	var nCabeceras = cabeceras.length;
//	var cabecera;
//	var exito;
//	window["matriz" + identificador[0]] = [];
//	var nRegistros = window["lista" + identificador[0]].length;
//	var nCampos;
//	var contenido = "";
//	var campos;
//	var campoFiltrado = [];
//	var nFiltrados = window["matrizIndice" + identificador[0]].length
//	var x = 0;
//	for (var i = 0; i < nRegistros; i++) {
//		campos = window["lista" + identificador[0]][i].split("¦");
//		campoFiltrado = [];
//		nCampos = campos.length;
//		for (var k = 0; k < nFiltrados; k++) {
//			campoFiltrado.push(campos[window["matrizIndice" + identificador[0]][k]]);
//		}
//		for (var j = 0 ; j < nCabeceras; j += 1) {
//			exito = true;
//			cabecera = cabeceras[j];
//			if (cabecera.className == ("Texto" + identificador[0])) exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
//			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
//			if (!exito) break;
//		}

//		if (exito) {
//			window["matriz" + identificador[0]][x] = [];
//			for (j = 0; j < nCampos; j++) {
//				if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
//				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
//			}
//			x++;
//		}
//	}
//	paginar(0, elemento);
//	indiceActualBloque = 0;
//}

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
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + identificador).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		seleccionarPaginaActual(identificador);
	}
}

function seleccionarPaginaActual(dato) {
	var aPagina = document.getElementById("a" + dato + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
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



function exportarExcel() {
	var contenido = "";
	contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
	var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [];
	for (var x = 0; x < 3; x++) {
		switch (x) {
			case 0:
				n = matrizPrincipal.length;
				ncampos = (cabecerasPrincipal.length > 0 ? cabecerasPrincipal.length : 0);
				matriz = (matrizPrincipal.length > 0 ? matrizPrincipal.slice(0) : []);				
				matrizCabecera = ["Código OA", "Paciente", "Id.exp.", "Prestación", "PeriodoProducción", "Fecha Prestación", "Fecha Atendido", "Fecha Terminado", "Prec. Uni.", "Cost. Prest.", "Cantidad", "Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Parte Clínica", "Ajuste", "Bonificación", "Importe Provisión", "AjusteProcesoId", "AjusteTipoRegistro", "Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio","Mod. Facturación","Especialidad", "Estado", "ID Orden Atención", "Linea Orden Atención", "Est. Registro OA", "Fecha Hora Creación", "Fecha Hora Modificación"];
				matrizAnchos = [120, 250, 100, 350, 150, 120, 120, 120, 100, 100, 100, 100, 150, 150, 100, 100, 100, 100, 100, 100, 100, 100, 120, 120, 200, 200, 200, 200,200, 200, 150, 150, 150, 100, 120, 120];
				nombre = "Producción";
				break;
			case 1:
				n = matrizDetalle.length;
				ncampos = (cabecerasDetalle.length > 0 ? cabecerasDetalle.length : 0);
				matriz = (matrizDetalle.length > 0 ? matrizDetalle.slice(0) : []);
				nombre = "Horario";
				matrizCabecera = ["Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Feriado", "Valor Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención"];
				matrizAnchos = [80, 80, 70, 130, 70, 70, 100, 80, 80, 80, 150, 120];
				break;
			case 2:
				n = matrizMontoFijo.length;
				ncampos = (cabecerasMontoFijo.length > 0 ? cabecerasMontoFijo.length : 0);
				matriz = (matrizMontoFijo.length > 0 ? matrizMontoFijo.slice(0) : []);
				nombre = "Monto Fijo";
				matrizCabecera = ["SucursalId", "Sucursal", "Periodo", "EmpresaId", "Empresa", "MedicoId", "Medico", "Descripción", "Importe", "ConceptoId", "Concepto"];
				matrizAnchos = [80, 150, 80, 80, 250, 80, 250, 300, 120, 120, 150];
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
				if (z == 0) {
					contenido += "<Row>";
					for (var t = 0; t < matrizCabecera.length; t++) {
						contenido += '<Cell ss:StyleID="s79">';
						contenido += '<Data ss:Type="String">';
						contenido += matrizCabecera[t];
						contenido += '</Data>';
						contenido += '</Cell>';
					}
					contenido += "</Row>";
				}
				contenido += "<Row>";
				for (y = 0; y < ncampos; y++) {
					switch (x) {
						case 0:
						    switch (y) {
						        case 34:
						        case 35:
						            contenido += '<Cell>';
						            contenido += '<Data ss:Type="String">';
						            contenido += matriz[z][y+1];
						            break;
								default:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += matriz[z][y];
									break;
							}
							break;
						case 1:
							switch (y) {
								case 5:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += (matriz[z][matrizIndiceDetalle[y]] == "True" ? "SI" : "NO");
									break;
								default:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += matriz[z][matrizIndiceDetalle[y]];
									break;
							}
							break;
						case 2:
							switch (y) {
								default:
									contenido += '<Cell>';
									contenido += '<Data ss:Type="String">';
									contenido += matriz[z][matrizIndiceMontoFijo[y]];
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
	return contenido;
}

