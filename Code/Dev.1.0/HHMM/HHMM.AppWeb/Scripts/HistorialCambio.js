var lista = [];
var matriz = [];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var urlBase = "";
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
			success(xhr.responseText);
		}
	}
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}

window.onload = function () {
	var pos1 = window.location.href.indexOf("Principal");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.parent.document.getElementById("iss").value,
		hdfT = document.getElementById("hdfT").value,
		hdfI = document.getElementById("hdfI").value;
	var url = urlBase + "Principal/obtenerListaHistorial/?ss=" + ss + "&t=" + hdfT + "&i=" + hdfI;
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError != null) {
		if (tipError.style.display != "none") {
			tipError.style.display = "none";
		}
	}
}
function configuracionInicial() {
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
}
function listarTodo(rpta) {
	if (rpta != "") {
		lista = rpta.split("¬");
		listarHistorial();
	} else {
		var c = "<tr class='FilaDatos'><td style='text-align:center' colspan='6'>No hay datos</td></tr>";
		document.getElementById("tbHistorial").innerHTML = c;
	}	
}
function listarHistorial(irUltimaPagina) {
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
			if (isNaN(campos[j]) || campos[j]=="") matriz[x][j] = campos[j];
			else matriz[x][j] = campos[j] * 1;
		}
		x++;
	}
}

function mostrarMatriz(indicePagina) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				for (var j = 0; j < nCampos; j++) {
					if ((j == 2 || j == 3) && (matriz[i][j] == "A" || matriz[i][j] == "I")) {
						contenido += "<td style='text-align:left'>";
						contenido += (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO");
					} else {
						contenido += "<td>";
						contenido += matriz[i][j];
					}
					contenido += "</td>";
				}
				contenido += "</tr>";
			}
			else break;
		}
	}
	else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (6).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbHistorial").innerHTML = contenido;
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
			mostrarMatriz(indiceActualPagina);
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
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "Texto") exito = exito && (campos[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "") matriz[x][j] = campos[j];
				else matriz[x][j] = campos[j] * 1;
			}
			x++;
		}
	}
	paginar(0);
	indiceActualBloque = 0;
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
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 60px'>Acción</td>";
	cabecera += "<td style='width: 210px'>Campo</td>";
	cabecera += "<td style='width: 60px'>Valor Inicial</td>";
	cabecera += "<td style='width: 60px'>Valor Final</td>";
	cabecera += "<td style='width: 60px'>Nombre Completo</td>";
	cabecera += "<td style='width: 60px'>Fecha de Creación</td>";
	cabecera += "</tr>";
	return cabecera;
}
function exportacion() {
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	textoExportar = [];
	excelExportar = crearCabeceraExportar();
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (j = 0; j < nCampos; j++) {
			contenido.push("<td>" + matriz[i][j] + "</td>");
			if (j < (nCampos - 1)) {
				textoExportar.push(matriz[i][j] + ", ");
			}
			else {
				if (j == (nCampos - 1)) textoExportar.push(matriz[i][j] + ", ");
				else textoExportar.push(matriz[i][j] + ", ");
			}
		}
		contenido.push("</tr>");
		textoExportar.push("\r\n");
	}
	textoExportar = textoExportar.join("");
	excelExportar += contenido.join("") + "</table></html>";
}
function configurarControles() {
	//var aExportarExcel = document.getElementById("aExportarExcel");
	//aExportarExcel.onclick = function () {
	//	exportacion();
	//	var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
	//	this.download = "Historial.xls";
	//	this.href = window.URL.createObjectURL(formBlob);
	//}
}
