var listaPrincipal = [];
var listaDetalle = [];
var listaMonto = [];
var matrizPrincipal = [];
var matrizDetalle = [];
var matrizMonto = [];
var cabecerasPrincipal = ["Codigo OA", "Paciente", "Id Exp.", "Prestación", "Fecha Prestación", "Fecha Atendido", "Fecha Terminado", "Prec. Uni.", "Cost. Prest.", "Cantidad", "Imponible", "Val. Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Méd.", "Parte Clín.", "Ajuste", "Bonificación", "Importe Planilla", "Nro. Proceso", "Tipo Ajuste", "Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Especialidad", "Estado", "ID Orden Atención", "Linea OA", "Est. Registro OA", "Inclusión automatica"];
var anchosPrincipal = [10, 150, 10, 200, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 120, 35, 5, 5, 5, 20, 20, 80,80];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,32];
var cabecerasDetalle = ["Fecha", "Hora Inicio", "Hora Fin", "Horas", "Dia", "Feriado", "Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención"];
var anchosDetalle = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var cabecerasMonto = ["SucursalId", "Sucursal", "Periodo", "EmpresaId", "Empresa", "MédicoId", "Médico", "Descripción", "Importe", "ConceptoId", "Concepto"];
var anchosMonto = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
var matrizIndiceMonto = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var registrosPagina = 7;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var esBloque = 0;
var excelExportar;
var urlBase = "";
var totalPrincipal = 0, totalDetalle = 0, totalMonto = 0;
window.onload = function () {
	var hdfDatos = document.getElementById("hdfDatos").value;
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	configuracionInicial();
	var url = urlBase + "Proceso/listarPlanillaDetalleConceptosOA/?ss=" + ss + "&id=" + hdfDatos;
	$.ajax(url, "get", listarTodo);
	var btnExcelDetalleError = document.getElementById("btnExcelDetalleError");
	btnExcelDetalleError.onclick = function () {
		var datos = "",formBlob,anchorElem,elem;
		datos = exportarExcel(matrizPrincipal, matrizDetalle, matrizMonto);
		if (datos != "") {
			anchorElem = document.createElement('a');
			var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", "PlanillaDetalleConceptoOAHorario.xls");
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			elem = document.getElementById("atemp");
			elem.parentNode.removeChild(elem);
		}
	}
}

function configuracionInicial() {
	crearTabla("Principal|0");
	crearTabla("Detalle|1");
	crearTabla("Monto|2");
	configurarFiltro();
}

function listarTodo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		listaPrincipal = data[0].split("¯");
		listaDetalle = data[1].split("¯");
		listaMonto = data[2].split("¯");
		crearMatriz("Principal|0");
		paginar(0, "Principal|0");
		crearMatriz("Detalle|1");
		paginar(0, "Detalle|1");
		crearMatriz("Monto|2");
		paginar(0, "Monto|2");
		totalPrincipal = 0, totalDetalle = 0, totalMonto = 0;
		for (var x = 0; x < matrizPrincipal.length; x++) {
			totalPrincipal = totalPrincipal + matrizPrincipal[x][19] * 1;
		}
		for (var y = 0; y < matrizDetalle.length; y++) {
			totalDetalle = totalDetalle + matrizDetalle[y][7] * 1;
		}
		for (var z = 0; z < matrizMonto.length; z++) {
			totalMonto = totalMonto + matrizMonto[z][8] * 1;
		}
		var ctab1 = document.getElementById("ctab1");
		var ctab2 = document.getElementById("ctab2");
		var ctab3 = document.getElementById("ctab3");

		if (matrizPrincipal.length > 0) {
			ctab1.click();
			if (matrizDetalle.length == 0) {
				ctab2.className = "tab-link bloqueado";
			}
			if (matrizMonto.length == 0) {
				ctab3.className = "tab-link bloqueado";
			}
		}
		else if (matrizDetalle.length > 0) {
			ctab2.click();
			if (matrizPrincipal.length == 0) {
				ctab1.className = "tab-link bloqueado";
			}
			if (matrizMonto.length == 0) {
				ctab3.className = "tab-link bloqueado";
			}

		}
		else if (matrizMonto.length > 0) {
			ctab3.click();
			if (matrizDetalle.length == 0) {
				ctab2.className = "tab-link bloqueado";
			}
			if (matrizPrincipal.length == 0) {
				ctab1.className = "tab-link bloqueado";
			}
		}
		else {
			if (matrizDetalle.length == 0) {
				ctab2.className = "tab-link bloqueado";
			}
			if (matrizPrincipal.length == 0) {
				ctab1.className = "tab-link bloqueado";
			}
			if (matrizMonto.length == 0) {
				ctab3.className = "tab-link bloqueado";
			}
		}
		indiceActualBloque = 0;
	}
	var divIfrPlanillaDetalleOA = window.parent.document.getElementById("divIfrPlanillaDetalleOA");
	divIfrPlanillaDetalleOA.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight + 20) + "px";
	var tab1 = document.getElementById("tab-1");
	var tab2 = document.getElementById("tab-2");
	var tab3 = document.getElementById("tab-3");
	tab1.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight - 100) + "px";
	tab2.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight - 100) + "px";
	tab3.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight - 100) + "px";
}


window.onresize = function () {
	var tab1 = document.getElementById("tab-1");
	var tab2 = document.getElementById("tab-2");
	var tab3 = document.getElementById("tab-3");
	tab1.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight-100) + "px";
	tab2.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight-100) + "px";
	tab3.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight-100) + "px";
}

function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	contenido = "<div><table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	var valorFor;
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador[0]][j];
		contenido += "px'><span id='spn";
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
		contenido += "<input type='text' class='Texto";
		contenido += identificador[0];
		contenido += "' name='cabecera";
		contenido += identificador[0];
		contenido += "' style='width:80%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	//contenido += "<tfoot>";
	//contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	//contenido += nCampos.toString();
	//contenido += "'></td></tr>";
	//contenido += "</tfoot>";
	contenido += "</table></div>";
	document.getElementById("div" + identificador[0]).innerHTML = contenido;
}

function crearMatriz(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0;
	if (window["lista" + identificador[0]][0] != "") {
		window["matriz" + identificador[0]] = [];
		for (i = 0; i < nRegistros; i++) {
			campos = window["lista" + identificador[0]][i].split("¦");
			window["matriz" + identificador[0]][x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				switch (identificador[0]) {
					case "Principal":
						if (j == 32) {
							window["matriz" + identificador[0]][x][j] = (campos[j] == "True" ? "SI" : "NO");
						} else {
							if (isNaN(campos[j]) || campos[j] == "" || j == 0 || j == 19) window["matriz" + identificador[0]][x][j] = campos[j];
							else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
						break;
					case "Detalle":
						if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						break;
					default:
						if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						break;
				}
			}
			x++;
		}
	}
	else {
		window["matriz" + identificador[0]] = [];
	}
}

function paginar(indicePagina, elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	if (identificador[0] == "Detalle") {
		registrosPagina = 8;
	}
	else {
		registrosPagina = 7;
	}
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
	mostrarMatriz(indicePagina, elemento);
}


function mostrarMatriz(indicePagina, elemento) {
	indiceActualPagina = indicePagina;
	var identificador = elemento.split("|");
	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador[1]) {
			case "0":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						if (window["matriz" + identificador[0]][i][32] == "SI") {
							contenido += "<tr class='FilaDatos style='background:rgba(247, 147, 140, 0.75);color:white;'>";
						} else {
							contenido += "<tr class='FilaDatos'>";
						}
						for (var j = 0; j < nCampos ; j++) {
							switch (j) {
								case 4:
								case 5:
								case 6:
								case 22:
									if (window["matriz" + identificador[0]][i][32] == "SI") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75);color:white;'>";
									} else {
										contenido += "<td>";
									}
									contenido += (window["matriz" + identificador[0]][i][j].indexOf("1900") > -1 ? "" : window["matriz" + identificador[0]][i][j]);
									break;
								case 7:
								case 8:
								case 9:
								case 10:
								case 11:
								case 13:
								case 14:
								case 15:
								case 16:
								case 17:
								case 18:
								case 19:
									if (window["matriz" + identificador[0]][i][32] == "SI") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75);color:white;text-align:right'>";
									} else {
										contenido += "<td style='text-align:right'>";
									}
									contenido += window["matriz" + identificador[0]][i][j].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
									break

								case 20:
									if (window["matriz" + identificador[0]][i][32] == "SI") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75);color:white;'>";
									} else {
										contenido += "<td>";
									}
									contenido += (window["matriz" + identificador[0]][i][j] == 0 ? "" : window["matriz" + identificador[0]][i][j]);
									break;
								default:
									if (window["matriz" + identificador[0]][i][32] == "SI") {
										contenido += "<td style='background:rgba(247, 147, 140, 0.75);color:white;'>";
									} else {
										contenido += "<td>";
									}
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
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								//case 4:
								case 5:
									contenido += "<td style='width:";
									contenido += window["anchos" + identificador[0]][j];
									contenido += "px'>";
									contenido += (window["matriz" + identificador[0]][i][j] == "True" ? "SI" : "NO");
									break;
									//case 6:
								case 3:
									contenido += "<td style='width:";
									contenido += window["anchos" + identificador[0]][j];
									contenido += "px;text-align:right'>";
									contenido += matrizDetalle[i][j].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
									break;
									//case 9:
									//contenido += (window["matriz" + identificador[0]][i][j] == "True" ? "SI" : "NO");
									//break;
								default:
									contenido += "<td style='width:";
									contenido += window["anchos" + identificador[0]][j];
									contenido += "px'>";
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
			case "2":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {

								case 8:
									contenido += "<td style='width:";
									contenido += window["anchos" + identificador[0]][j];
									contenido += "px;text-align:right'>";
									contenido += window["matriz" + identificador[0]][i][j].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
									break;
								default:
									contenido += "<td style='width:";
									contenido += window["anchos" + identificador[0]][j];
									contenido += "px'>";
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
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador[0]).innerHTML = contenido;
	crearPaginas(elemento);
	if (esBloque) {
		crearPaginas(elemento);
	}
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
			filtrar("Principal|0");
		}
	}
	var combos = document.getElementsByClassName("ComboPrincipal");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Principal|0");
		}
	}
	var textos = document.getElementsByClassName("TextoDetalle");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Detalle|1");
		}
	}
	var combos = document.getElementsByClassName("ComboDetalle");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Detalle|1");
		}
	}

	var textos = document.getElementsByClassName("TextoMonto");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Monto|2");
		}
	}
	var combos = document.getElementsByClassName("ComboMonto");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Monto|2");
		}
	}
}

function filtrar(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = document.getElementsByName("cabecera" + identificador[0]);
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	window["matriz" + identificador[0]] = [];
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var nFiltrados = window["matrizIndice" + identificador[0]].length
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = window["lista" + identificador[0]][i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		for (var k = 0; k < nFiltrados; k++) {
			campoFiltrado.push(campos[window["matrizIndice" + identificador[0]][k]]);
			if (identificador[0] == "Principal" && campoFiltrado.length == 33) {
				campoFiltrado[32] = (campoFiltrado[32] == "True" ? "SI" : "NO");
			}
		}
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + identificador[0])) exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador[0]][x] = [];
			for (j = 0; j < nCampos; j++) {
				//if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
				//else window["matriz" + identificador[0]][x][j] = campos[j] * 1;

				switch (identificador[0]) {
					case "Principal":
						if (j == 32) {
							window["matriz" + identificador[0]][x][j] = (campos[j] == "True" ? "SI" : "NO");
						} else {
							if (isNaN(campos[j]) || campos[j] == "" || j == 0 || j == 19) window["matriz" + identificador[0]][x][j] = campos[j];
							else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
						break;
					case "Detalle":
						if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						break;
					default:
						if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						break;
				}

			}
			x++;
		}
	}
	paginar(0, elemento);
	indiceActualBloque = 0;
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

function crearPaginas(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
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
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		//document.getElementById("tdPaginas" + identificador[0]).innerHTML = "";
		document.getElementById("divPaginacion" + identificador[0]).innerHTML = "";
	}
	else {
		//document.getElementById("tdPaginas" + identificador[0]).innerHTML = contenido;
		document.getElementById("divPaginacion" + identificador[0]).innerHTML = "<div style='position:fixed;width:100%'>" + contenido + "</div>";
		seleccionarPaginaActual(identificador[0]);
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
	switch (data_tab_actual) {
		case "tab-1":
			document.getElementById("spnTotal").innerHTML = totalPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			break;
		case "tab-2":
			document.getElementById("spnTotal").innerHTML = totalDetalle.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			break;
		case "tab-3":
			document.getElementById("spnTotal").innerHTML = totalMonto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			break;
	}
}


function exportarExcel(matriz1, matriz2, matriz3) {
	var contenido = "";
	if (matriz1.length > 0 || matriz2.length > 0 || matriz3.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, matriz = [], nombre = "", matrizCabecera = [];
		for (var x = 0; x < 3; x++) {
			switch (x) {
				case 0:
					n = matriz1.length;
					matrizCabecera = ["Código OA", "Paciente", "Id. exp.", "Prestación", "Fecha Prestación", "Fecha Atendido", "Fecha Terminado", "Prec. Uni.", "Cost. Prest.", "Cantidad", "Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Parte Clínica", "Ajuste", "Bonificación", "Importe Planilla", "AjusteProcesoId", "AjusteTipoRegistro", "Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Especialidad", "Estado", "ID Orden Atención", "Linea Orden Atención", "Est. Registro OA","Inclusión automatica"]
					if (n > 0) {
						ncampos = matriz1[0].length;
						matriz = matriz1.slice(0);
					} else {
						ncampos = 0;
						matriz = [];
					}
					nombre = "Producción";
					break;
				case 1:
					n = matriz2.length;
					matrizCabecera = ["Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Feriado", "Valor Contrato", "Importe", "Bonificación", "Total", "Especialidad", "Tipo Atención"];
					if (n > 0) {
						ncampos = matriz2[0].length;
						matriz = matriz2.slice(0);
					} else {
						ncampos = 0;
						matriz = [];
					}
					nombre = "Horario";
					break;
				case 2:
					n = matriz3.length;
					matrizCabecera = ["SucursalId", "Sucursal", "Periodo", "EmpresaId", "Empresa", "MédicoId", "Médico", "Descripción", "Importe", "ConceptoId", "Concepto"];
					if (n > 0) {
						ncampos = matriz3[0].length;
						matriz = matriz3.slice(0);
					} else {
						ncampos = 0;
						matriz = [];
					}
					nombre = "Monto Fijo";
					break;
			}

			if (n > 0) {
				contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
				switch (x) {
					case 0:
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="250"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="350"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						break;
					case 1:
						contenido += '<ss:Column ss:Width="80"/>';
						contenido += '<ss:Column ss:Width="80"/>';
						contenido += '<ss:Column ss:Width="70"/>';
						contenido += '<ss:Column ss:Width="130"/>';
						contenido += '<ss:Column ss:Width="70"/>';
						contenido += '<ss:Column ss:Width="70"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="80"/>';
						contenido += '<ss:Column ss:Width="80"/>';
						contenido += '<ss:Column ss:Width="80"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="120"/>';
						break;
					case 2:
						contenido += '<ss:Column ss:Width="90"/>';
						contenido += '<ss:Column ss:Width="150"/>';
						contenido += '<ss:Column ss:Width="70"/>';
						contenido += '<ss:Column ss:Width="90"/>';
						contenido += '<ss:Column ss:Width="400"/>';
						contenido += '<ss:Column ss:Width="90"/>';
						contenido += '<ss:Column ss:Width="400"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						contenido += '<ss:Column ss:Width="130"/>';
						contenido += '<ss:Column ss:Width="100"/>';
						contenido += '<ss:Column ss:Width="200"/>';
						break;
				}
				for (var z = 0; z < n; z++) {
					if (z == 0) {
						contenido += "<Row>";
						for (var k = 0; k < matrizCabecera.length; k++) {
							contenido += '<Cell ss:StyleID="s79">';
							contenido += '<Data ss:Type="String">';
							contenido += matrizCabecera[k];
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
									case 7:
									case 8:
									case 9:
									case 10:
									case 11:
									case 13:
									case 14:
									case 15:
									case 16:
									case 17:
									case 18:
									case 19:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][y];
										break;
									case 4:
									case 5:
									case 6:
									case 22:
										contenido += '<Cell ss:StyleID="s62">';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
										break;
									case 20:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += ((matriz[z][y]*1) == 0 ? "" : matriz[z][y]);
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
									case 0:									
										contenido += '<Cell ss:StyleID="s62">';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
										break;
									case 3:
									case 6:
									case 7:
									case 8:
									case 9:
										contenido += '<Cell ss:StyleID="s65">';
										contenido += '<Data ss:Type="Number">';
										contenido += matriz[z][y];
										break;
									case 5:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += (matriz[z][y] == "True" ? "SI" : "NO");
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
									default:
										contenido += '<Cell>';
										contenido += '<Data ss:Type="String">';
										contenido += matriz[z][y];
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
