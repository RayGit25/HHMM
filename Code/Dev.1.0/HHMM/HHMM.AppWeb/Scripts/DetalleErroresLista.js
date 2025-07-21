var listaPrincipal = [];
var listaDetalle = [];
var matrizPrincipal = [];
var matrizDetalle = [];
var cabecerasPrincipal = ["Servicio", "Código OA", "Fecha Inicio OA", "Ord.Aten.", "Linea OA", "Prestación", "Fecha Atención Prestación", "Fecha Atendido", "Fecha Terminado", "Cant.", "P. Unit.","Cost. Prest.", "Imponible", "T. Paciente", "T. Atención", "Aseguradora", "Contrato", "Id.Exp.", "Línea", "Observación", "Est. Registro OA"];
var anchosPrincipal = [30, 8, 12, 8, 5, 40, 22, 22, 22, 5, 5, 8, 5, 5, 20, 30, 5, 5, 5, 50,5];
var matrizIndicePrincipal = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20];
var cabecerasDetalle = ["Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Dia", "Feriado", "Especialidad", "Tipo Atención"];
var anchosDetalle = [14, 10, 10, 10, 10, 14, 16, 16];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5, 6, 7];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var esBloque = 0;
var excelExportar;
var urlBase = "";
window.onload = function () {
	var sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	var data = document.getElementById("hdfDatos").value.split("¬");
	var strDatos = data[0];
	document.getElementById("spnEspecialidad").innerHTML = data[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/listarDetalleErrores/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "post", listarTodo, strDatos);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla("Principal|0");
	crearTabla("Detalle|1");
	configurarFiltro();
}

function listarTodo(rpta) {
	//var validarRpta = rpta.replace("¬", "").trim();
	if (rpta != "") {
		var data = rpta.split("¬");
		listaPrincipal = data[0].split("¯");
		listaDetalle = data[1].split("¯");
		crearMatriz("Principal|0");
		paginar(0, "Principal|0");
		crearMatriz("Detalle|1");
		paginar(0, "Detalle|1");
		if (listaPrincipal != "" && listaDetalle == "") {
			var ctab1 = document.getElementById("ctab1");
			var ctab2 = document.getElementById("ctab2");
			ctab1.click();
			ctab2.className = "tab-link bloqueado";
		}
		if (listaPrincipal == "" && listaDetalle != "") {
			var divocultar = document.getElementById("divocultar");
			divocultar.style.display = "none";
			var ctab1 = document.getElementById("ctab1");
			var ctab2 = document.getElementById("ctab2");
			ctab2.click();
			ctab1.className = "tab-link bloqueado";
		}
		indiceActualBloque = 0;
	}
}

function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	if (identificador[1] == "0") contenido = "<div><table class='tabla-general' style='table-layout:fixed'>";
	else contenido = "<div><table class='tabla-general'>";
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
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	contenido += nCampos.toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
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
				if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
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
		registrosPagina = 10;
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
				var ContadorRegistros = 0;
				var listaRegistros = listaPrincipal.length;
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						if (ContadorRegistros == registrosPagina) {
							break;
						}
						if (window["matriz" + identificador[0]][i + 1] != undefined && (window["matriz" + identificador[0]][i][12] == window["matriz" + identificador[0]][i + 1][12]) || window["matriz" + identificador[0]].length != listaRegistros) {
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:left'>";
							contenido += window["matriz" + identificador[0]][i][12];
							contenido += "</td>";
							contenido += "<td colspan='20'></td></tr>";
							for (w = i; w < window["matriz" + identificador[0]].length; w++) {
								if (ContadorRegistros == registrosPagina) {
									break;
								}
								ContadorRegistros = ContadorRegistros + 1;
								contenido += "<tr class='FilaDatos'>";
								for (var j = 0; j < nCampos; j++) {
									switch (j) {
										case 0:
											contenido += "<td>";
											break;
										case 1:
										case 3:
										case 4:
										case 5:
										case 6:
										case 7:
											contenido += "<td>";
											contenido += window["matriz" + identificador[0]][w][j - 1];
											break;
										case 2:
										case 8:
											contenido += "<td>";
											contenido += (window["matriz" + identificador[0]][w][j - 1].indexOf("1900") > -1 ? "" : window["matriz" + identificador[0]][w][j - 1]);
											break;
										case 9:
										case 10:
										case 11:
										case 12:
											contenido += "<td style='text-align:right'>";
											contenido += window["matriz" + identificador[0]][w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
											break;
										case 17:
										case 18:
											contenido += "<td>";
											contenido += (window["matriz" + identificador[0]][w][j] == 0 ? "" : window["matriz" + identificador[0]][w][j]);
											break;
										default:
											contenido += "<td>";
											contenido += window["matriz" + identificador[0]][w][j];
											break;
									}
									contenido += "</td>";
								}
								contenido += "</tr>";
								i = w;
								if (window["matriz" + identificador[0]][w + 1] == undefined) {
									break;
								}
								else if (window["matriz" + identificador[0]][w][12] != window["matriz" + identificador[0]][w + 1][12]) {
									break;
								}
							}
						}
						else {
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:left'>";
							contenido += window["matriz" + identificador[0]][i][12];
							contenido += "</td>";
							contenido += "<td colspan='20'></td></tr>";
							for (w = i; w < window["matriz" + identificador[0]].length; w++) {
								if (ContadorRegistros == registrosPagina) {
									break;
								}
								ContadorRegistros = ContadorRegistros + 1;
								contenido += "<tr class='FilaDatos'>";
								for (var j = 0; j < nCampos; j++) {
									switch (j) {
										case 0:
											contenido += "<td>";
											break;
										case 1:
										case 3:
										case 4:
										case 5:
										case 6:
										case 7:
											contenido += "<td>";
											contenido += window["matriz" + identificador[0]][w][j - 1];
											break;
										case 2:
										case 8:
											contenido += "<td>";
											contenido += (window["matriz" + identificador[0]][w][j - 1].indexOf("1900") > -1 ? "" : window["matriz" + identificador[0]][w][j - 1]);
											break;
										case 9:
										case 10:
										case 11:
										case 12:
											contenido += "<td style='text-align:right'>";
											contenido += window["matriz" + identificador[0]][w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
											break;
										case 17:
										case 18:
											contenido += "<td>";
											contenido += (window["matriz" + identificador[0]][w][j] == 0 ? "" : window["matriz" + identificador[0]][w][j]);
											break;
										default:
											contenido += "<td>";
											contenido += window["matriz" + identificador[0]][w][j];
											break;
									}
									contenido += "</td>";
								}
								contenido += "</tr>";
								i = w;
								if (window["matriz" + identificador[0]][w + 1] == undefined) {
									break;
								}
								else if (window["matriz" + identificador[0]][w][12] != window["matriz" + identificador[0]][w + 1][12]) {
									break;
								}
							}
						}
					}
					else break;
				}
				break;
			case "1":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td style='width:";
							contenido += window["anchos" + identificador[0]][j];
							contenido += "px'>";
							switch (j) {
								case 5:
									contenido += (window["matriz" + identificador[0]][i][j] == "True" ? "SI" : "NO");
									break;
								default:
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
		contenido += (nCabeceras).toString();
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
				if (isNaN(campos[j]) || campos[j] == "" || j == 0) window["matriz" + identificador[0]][x][j] = campos[j];
				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
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
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = contenido;
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
}

function crearCabeceraExportar(opcion) {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
	if (opcion) {
		cabecera += "<tr><td>Especialidad</td><td colspan='2'>";
		cabecera += document.getElementById("spnEspecialidad").innerHTML;
		cabecera += "</td></tr><tr><td colspan='17'></td></tr>";
		cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
		cabecera += "<td style='width: 200px'>Servicio</td>";
		cabecera += "<td style='width: 100px'>Código OA</td>";
		cabecera += "<td style='width: 120px'>Fecha Inicio OA</td>";
		cabecera += "<td style='width: 100px'>Ord.Aten.</td>";
		cabecera += "<td style='width: 120px'>Linea OA</td>";
		cabecera += "<td style='width: 350px'>Prestacion</td>";
		cabecera += "<td style='width: 120px'>Fecha Atenación Prestación</td>";
		cabecera += "<td style='width: 120px'>Fecha Atendido</td>";
		cabecera += "<td style='width: 120px'>Fecha Terminado</td>";
		cabecera += "<td style='width: 100px'>Cant.</td>";
		cabecera += "<td style='width: 150px'>P. Unit.</td>";
		cabecera += "<td style='width: 150px'>Cost. Prest.</td>";
		cabecera += "<td style='width: 160px'>Imponible</td>";
		cabecera += "<td style='width: 180px'>T. Paciente</td>";
		cabecera += "<td style='width: 180px'>T. Atención</td>";
		cabecera += "<td style='width: 180px'>Aseguradora</td>";
		cabecera += "<td style='width: 180px'>Contrato</td>";
		cabecera += "<td style='width: 100px'>Id.Exp.</td>";
		cabecera += "<td style='width: 100px'>Línea</td>";
		cabecera += "<td style='width: 300px'>Observacion</td>";
		cabecera += "<td style='width: 100px'>Est. Registro OA</td>";
		cabecera += "</tr>";
	}
	else {
		cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
		cabecera += "<td style='width: 150px'>Fecha</td>";
		cabecera += "<td style='width: 150px'>Hora Inicio</td>";
		cabecera += "<td style='width: 150px'>Hora Fin</td>";
		cabecera += "<td style='width: 150px'>Horas Programadas</td>";
		cabecera += "<td style='width: 150px'>Dia</td>";
		cabecera += "<td style='width: 150px'>Feriado</td>";
		cabecera += "<td style='width: 150px'>Especialidad</td>";
		cabecera += "<td style='width: 150px'>Tipo Atención</td>";
	}
	return cabecera;
}

function exportarExcel(opcion) {
	var nRegistros;
	var nCampos;
	var contenido = [];
	var excelExportar = crearCabeceraExportar(opcion);
	if (opcion) {
		nRegistros = matrizPrincipal.length;
		if (nRegistros > 0) {
			nCampos = matrizPrincipal[0].length;
			for (i = 0; i < nRegistros; i++) {
				contenido.push("<tr>");
				for (j = 0; j < nCampos; j++) {
					switch (j) {
						case 0:
							contenido.push("<td>" + matrizPrincipal[i][9] + "</td>");
							break;
						case 1:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							contenido.push("<td>" + matrizPrincipal[i][j - 1] + "</td>");
							break;
						case 2:
						case 8:
							contenido.push("<td>" + (matrizPrincipal[w][j - 1].indexOf("1900") > -1 ? "" : matrizPrincipal[w][j - 1]) + "</td>");
							break;
						case 9:
						case 10:
						case 11:
						case 12:
							contenido.push("<td>" + matrizPrincipal[i][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>");
							break;
						case 17:
						case 18:
							contenido.push("<td>" + (matrizPrincipal[i][j] == 0 ? "" : matrizPrincipal[i][j]) + "</td>");
							break;
						default:
							contenido.push("<td>" + matrizPrincipal[i][j] + "</td>");
							break;
					}

				}
				contenido.push("</tr>");
			}
		}
	}
	else {
		nRegistros = matrizDetalle.length;
		if (nRegistros > 0) {
			nCampos = matrizDetalle[0].length;
			for (i = 0; i < nRegistros; i++) {
				contenido.push("<tr>");
				for (j = 0; j < nCampos; j++) {
					switch (j) {
						case 5:
							contenido.push("<td>" + (matrizDetalle[i][j] == "True" ? "SI" : "NO") + "</td>");
							break;
						default:
							contenido.push("<td>" + matrizDetalle[i][j] + "</td>");
							break;
					}

				}
				contenido.push("</tr>");
			}
		}
	}
	if (contenido.length > 0) excelExportar += contenido.join("") + "</table></html>";
	else excelExportar = "";
	return excelExportar;
}