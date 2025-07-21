var lista = [];
var matriz = [];
var cabeceras = ["Servicio", "Código OA","Fecha Inicio OA", "Ord.Aten.", "Linea OA", "Prestación","Fecha Atención Prestación","Cant.", "P. Unit.", "Imponible", "T. Paciente", "T. Atención", "Aseguradora", "Contrato", "Id.Exp.", "Línea", "Observación"];
var anchos = [5, 5, 5, 6, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,5,5];
var matrizIndice = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14,15,16];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var mensajeValidacion = [];
var urlBase = "";
var idPasar = "";
window.onload = function () {
	var sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	var data = document.getElementById("hdfDatos").value.split("¬");
	var strDatos = data[0];
	document.getElementById("spnEspecialidad").innerHTML = data[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/listarDetalleObservados/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "post", listarTodo, strDatos);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla();
	//configurarOrdenacion();
	configurarFiltro();
}

function listarTodo(rpta) {
	if (rpta != "") {
		lista = rpta.split("¯");
		listarObservado();
	}
}

function listarObservado(irUltimaPagina) {
	crearMatriz();
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		paginar(0);
		indiceActualBloque = 0;
	}
}

function paginar(indicePagina) {
	var nRegistros = matriz.length;
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
	mostrarMatriz(indicePagina);
}

function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "px'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace' data-orden='";
		contenido += matrizIndice[j];
		contenido += "'>";
		contenido += cabeceras[j];
		contenido += "</span><br/>";
		contenido += "<input type='text' class='Texto' name='cabecera' style='width:80%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbObservados' class='tabla-FilaCuerpo'>";
	contenido += "<tr><td colspan='";
	contenido += (nCampos).toString();
	contenido += "'>Cargando Datos...</td></tr>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divObservado").innerHTML = contenido;
}

function crearMatriz() {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	matriz = [];
	for (i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		matriz[x] = [];
		nCampos = campos.length;
		for (j = 0; j < nCampos; j++) {
			if (isNaN(campos[j]) || campos[j] == "" || j == 0) matriz[x][j] = campos[j];
			else matriz[x][j] = campos[j] * 1;
		}
		x++;
	}

}

function mostrarMatriz(indicePagina) {
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		var ContadorRegistros = 0;
		var listaRegistros = lista.length;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				if (ContadorRegistros == registrosPagina) {
					break;
				}				
				if (matriz[i + 1] != undefined && (matriz[i][9] == matriz[i + 1][9]) || matriz.length != listaRegistros) {
					contenido += "<tr class='FilaDatos'>";
					contenido += "<td style='text-align:left'>";
					contenido += matriz[i][9];
					contenido += "</td>";
					contenido += "<td colspan='16'></td></tr>";
					for (w = i; w < matriz.length; w++) {
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
									contenido += "<td>";
									contenido += matriz[w][j - 1];
									break;
								case 2:
								case 6:
									contenido += "<td>";
									contenido += (matriz[w][j - 1].indexOf("1900")>-1?"":matriz[w][j - 1]);
									break;
								case 7:
								case 8:
									contenido += "<td style='text-align:right'>";
									contenido += matriz[w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								case 9:
									contenido += "<td style='text-align:right'>";
									contenido += matriz[w][8].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								case 14:
								case 15:
									contenido += "<td>";
									contenido += (matriz[w][j] == 0 ? "" : matriz[w][j]);
									break;
								default:
									contenido += "<td>";
									contenido += matriz[w][j];
									break;
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
						i = w;
						if (matriz[w + 1] == undefined) {
							break;
						}
						else if (matriz[w][9] != matriz[w + 1][9]) {
							break;
						}
					}
				}
				else {
					contenido += "<tr class='FilaDatos'>";
					contenido += "<td style='text-align:left'>";
					contenido += matriz[i][9];
					contenido += "</td>";
					contenido += "<td colspan='14'></td></tr>";
					for (w = i; w < matriz.length; w++) {
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
									contenido += "<td>";
									contenido += matriz[w][j - 1];
									break;
								case 2:
								case 6:
									contenido += "<td>";
									contenido += (matriz[w][j - 1].indexOf("1900") > -1 ? "" : matriz[w][j - 1]);
									break;
								case 7:
								case 8:
									contenido += "<td style='text-align:right'>";
									contenido += matriz[w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								case 9:
									contenido += "<td style='text-align:right'>";
									contenido += matriz[w][8].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
								case 14:
								case 15:
									contenido += "<td>";
									contenido += (matriz[w][j] == 0 ? "" : matriz[w][j]);
									break;
								default:
									contenido += "<td>";
									contenido += matriz[w][j];
									break;
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
						i = w;
						if (matriz[w + 1] == undefined) {
							break;
						}
						else if (matriz[w][9] != matriz[w + 1][9]) {
							break;
						}
					}
				}
			}
			else break;
		}
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 1).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbObservados").innerHTML = contenido;
	crearPaginas();
}
function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("Enlace");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this);
			mostrarMatriz(0);
		}
	}
}

function ordenarMatriz(enlace) {
	indiceOrden = enlace.getAttribute("data-orden");
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces();
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	matriz.sort(ordenar);
}

function ordenar(x, y) {
	var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
	var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("Texto");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar();
		}
	}
	var combos = document.getElementsByClassName("Combo");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar();
		}
	}
}

function filtrar() {
	var cabeceras = document.getElementsByName("cabecera");
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	matriz = [];
	var nRegistros = lista.length;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var x = 0;
	var nFiltrados = matrizIndice.length;
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		nCampos = campos.length;
		campoFiltrado = [];
		for (var k = 0; k < nFiltrados; k++) {
			campoFiltrado.push(campos[matrizIndice[k]]);
		}
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "Texto") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "" || j == 0) matriz[x][j] = campos[j];
				else matriz[x][j] = campos[j] * 1;
			}
			x++;
		}
	}
	indiceActualBloque = 0;
	paginar(0);

}


function limpiarEnlaces() {
	var enlaces = document.getElementsByClassName("Enlace");
	var nEnlaces = enlaces.length;
	var enlace;
	var campo;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		campo = enlace.innerHTML;
		enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	}
}

function crearPaginas() {
	var nRegistros = matriz.length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += ");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			contenido += "' id='a";
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas").innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas").innerHTML = contenido;
		seleccionarPaginaActual();
	}
}

function seleccionarPaginaActual() {
	var aPagina = document.getElementById("a" + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}


function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
	cabecera += "<tr><td>Especialidad</td><td colspan='2'>";
	cabecera += document.getElementById("spnEspecialidad").innerHTML;
	cabecera += "</td></tr><tr><td colspan='17'></td></tr>"
	cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 200px'>Servicio</td>";
	cabecera += "<td style='width: 100px'>Código OA</td>";
	cabecera += "<td style='width: 120px'>Fecha Inicio OA</td>";
	cabecera += "<td style='width: 100px'>Ord.Aten.</td>";
	cabecera += "<td style='width: 120px'>Linea OA</td>";
	cabecera += "<td style='width: 350px'>Prestacion</td>";
	cabecera += "<td style='width: 120px'>Fecha Atenación Prestación</td>";
	cabecera += "<td style='width: 100px'>Cant.</td>";
	cabecera += "<td style='width: 150px'>P. Unit.</td>";
	cabecera += "<td style='width: 160px'>Imponible</td>";
	cabecera += "<td style='width: 180px'>T. Paciente</td>";
	cabecera += "<td style='width: 180px'>T. Atención</td>";
	cabecera += "<td style='width: 180px'>Aseguradora</td>";
	cabecera += "<td style='width: 180px'>Contrato</td>";
	cabecera += "<td style='width: 100px'>Id.Exp.</td>";
	cabecera += "<td style='width: 100px'>Línea</td>";
	cabecera += "<td style='width: 300px'>Observacion</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportarExcel() {
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	textoExportar = [];
	var excelExportar = crearCabeceraExportar();
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (j = 0; j < nCampos; j++) {
			switch (j) {
				case 0:
					contenido.push("<td>" + matriz[i][9] + "</td>");
					break;
				case 1:				
				case 3:
				case 4:
				case 5:				
					contenido.push("<td>" + matriz[i][j - 1] + "</td>");
					break;
				case 2:
				case 6:
					contenido.push("<td>" + (matriz[w][j - 1].indexOf("1900") > -1 ? "" : matriz[w][j - 1]) + "</td>");
					break;
				case 7:
				case 8:
					contenido.push("<td>" + matriz[i][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>");
					break;
				case 9:
					contenido.push("<td>" + matriz[i][8] + "</td>");
					break;
				case 14:
				case 15:
					contenido.push("<td>" + (matriz[i][j] == 0 ? "" : matriz[i][j]) + "</td>");
					break;
				default:
					contenido.push("<td>" + matriz[i][j] + "</td>");
					break;
			}

		}
		contenido.push("</tr>");
	}
	textoExportar = textoExportar.join("");
	excelExportar += contenido.join("") + "</table></html>";
	return excelExportar;
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