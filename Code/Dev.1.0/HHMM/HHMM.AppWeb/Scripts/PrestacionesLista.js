var listaPrincipal = [];
var listaDetalle = [];
var matrizPrincipal = [];
var matrizDetalle = [];
var cabecerasPrincipal = ["Código", "Nombre", "Valor Medida", "Servicio"];
var anchosPrincipal = [8, 60, 12, 20];
var matrizIndicePrincipal = [0, 1, 2, 3];
var cabecerasDetalle = ["Código", "Nombre", "Valor Medida", "Servicio"];
var anchosDetalle = [8, 60, 12, 20];
var matrizIndiceDetalle = [0, 1, 2, 3];
var registrosPagina = 5;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var esBloque = 0;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var idHorario = -1;
var Campoeliminar = "";
var FilaAnterior = "";
var listaPrestacionPadre = [];
var listaPrestacion = [];
var matrizChecks = [];
var matrizSeguridad = [];
window.onload = function () {
	listaPrestacionPadre = window.parent.document.getElementById("hdfListaPresta").value.split(",");
	matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
	if (matrizSeguridad.length > 0) {
		if (((matrizSeguridad[0].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnGrabar");
		}
		if (((matrizSeguridad[4].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnCargar");
		}
	}
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	var hdfPrestaTC = document.getElementById("hdfPrestaTC").value.split("|");
	var lista = listaPrestacionPadre;
	var url = urlBase + "Mantenimiento/listarPrestacion/?ss=" + ss + "&tc=" + hdfPrestaTC[0] + "&val=" + hdfPrestaTC[1] + "&su=" + sucursalId;
	$.ajax(url, "post", listarTodo,lista);
	configuracionInicial();
}

function removeSeguridad(id) {
	var elem = document.getElementById(id);
	return elem.parentNode.removeChild(elem);
}

function configuracionInicial() {
	crearTabla("divPrincipal");
	crearTabla("divDetalle");
	var btnCargar = document.getElementById("btnCargar");
	if (btnCargar != null) {
		btnCargar.onclick = function () {
			window.parent.limpiarPopupCarga2();
			window.parent.abrirPopup("PopupCarga2");
		};
	}
}

function listarTodo(rpta) {
	if (rpta != "") {
		listaPrincipal = rpta.split("¯");
		listarPrestacion("", false);
		configurarOrdenacion();
		configurarControles();
		configurarChecks();
		configurarFiltro();
	}
	else {
		var contenido = "";
		var contenido2 = "";
		var nCabeceras = cabecerasPrincipal.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 1).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbPrincipal").innerHTML = contenido;

		var nCabeceras2 = cabecerasDetalle.length;
		contenido2 += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido2 += (nCabeceras2 + 1).toString();
		contenido2 += "'>No hay datos</td></tr>";
		document.getElementById("tbDetalle").innerHTML = contenido2;
	}

}

function listarPrestacion(irUltimaPagina, detalle) {
	crearMatriz(listaPrincipal, detalle);
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, detalle);
	else {
		paginar(0, detalle);
		indiceActualBloque = 0;
	}
	matrizChecks = [];
	matrizDetalle = [];
	listaDetalle = [];
	if (listaPrestacionPadre.length > 0 && listaPrestacionPadre!="") {
		var contador = 0;
		var data;
		for (var x = 0; x < listaPrincipal.length; x++) {
			data = listaPrincipal[x].split("¦");
			for (var y = 0; y < listaPrestacionPadre.length; y++) {
				if (data[0] == listaPrestacionPadre[y]) {
					matrizChecks.push(data[0]);
					matrizDetalle.push(data[0] + "¦" + data[1] + "¦" + data[2] + "¦" + data[3]);
					listaDetalle.push(data[0] + "¦" + data[1] + "¦" + data[2] + "¦" + data[3]);
					contador++;
					break;
				}
			}
			if (contador == listaPrestacionPadre.length) {
				break;
			}
		}
	}
	paginar(0, true);
}

function configurarOrdenacion(detalle) {
	if (detalle) {
		var enlaces = document.getElementsByClassName("EnlaceD");
		var nEnlaces = enlaces.length;
		var enlace;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			enlace.onclick = function () {
				ordenarMatriz(this, true);
				mostrarMatriz(0, true);
			}
		}
	}
	else {
		var enlaces = document.getElementsByClassName("Enlace");
		var nEnlaces = enlaces.length;
		var enlace;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			enlace.onclick = function () {
				ordenarMatriz(this, false);
				mostrarMatriz(0, false);
			}
		}
	}
}

function ordenarMatriz(enlace, detalle) {
	indiceOrden = enlace.getAttribute("data-orden");
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(detalle);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	if (detalle) matrizDetalle.sort(ordenar);
	else matrizPrincipal.sort(ordenar);
}

function ordenar(x, y) {
	var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
	var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function limpiarEnlaces(detalle) {
	var enlaces
	if (detalle) enlaces = document.getElementsByClassName("EnlaceD")
	enlaces = document.getElementsByClassName("Enlace");
	var nEnlaces = enlaces.length;
	var enlace;
	var campo;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		campo = enlace.innerHTML;
		enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	}
}


function crearTabla(div) {
	var nCampos = "";
	var contenido = "";
	if (div == "divPrincipal") {
		nCampos = cabecerasPrincipal.length;
		contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' style='display:none'></span></th>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchosPrincipal[j];
			contenido += "%'><span id='spn";
			contenido += j.toString();
			contenido += "' class='Enlace' data-orden='";
			contenido += matrizIndicePrincipal[j];
			contenido += "'>";
			contenido += cabecerasPrincipal[j];
			contenido += "</span><br/>";
			if (j != (nCampos - 2)) {
				contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
			}
			contenido += "</th>";
		}
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbPrincipal' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginasPrincipal' colspan='";
		contenido += (nCampos + 1);
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
	}
	else {
		nCampos = cabecerasDetalle.length;
		contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchosDetalle[j];
			contenido += "%'><span id='spn";
			contenido += j.toString();
			contenido += "' class='EnlaceD' data-orden='";
			contenido += matrizIndiceDetalle[j];
			contenido += "'>";
			contenido += cabecerasDetalle[j];
			contenido += "</span><br/>";
			if (j != (nCampos - 2)) {
				contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
			}
			contenido += "</th>";
		}
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
			contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcel'></a>";
		}
		contenido += "</th></tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbDetalle' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginasDetalle' colspan='";
		contenido += (nCampos + 1);
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
	}

	document.getElementById(div).innerHTML = contenido;
}

function crearMatriz(lista, detalle) {
	var nCampos;
	var campos;
	var x = 0;
	var nRegistros;
	if (detalle == true) {
		nRegistros = listaPrincipal.length;
		var nRegistrosListaPrestacion = listaPrestacionPadre.length;
		var nTope = 0;
		matrizDetalle = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = listaPrincipal[i].split("¦");
			for (var x = 0; x < nRegistrosListaPrestacion; x++) {
				if (campos[0] == listaPrestacionPadre[x]) {
					matrizDetalle[x] = [];
					nCampos = campos.length;
					for (j = 0; j < nCampos; j++) {
						matrizDetalle[x][j] = campos[j];
					}
					x++;
					break;
				}
			}
			nTope++;
			if (nTope == nRegistrosListaPrestacion) {
				break;
			}
		}
	}
	else {
		nRegistros = lista.length;
		matrizPrincipal = [];
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			matrizPrincipal[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				matrizPrincipal[x][j] = campos[j];
			}
			x++;
		}
	}
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("Texto");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar(false);
		}
	}
	var TextoD = document.getElementsByClassName("TextoD");
	var nTextoD = TextoD.length;
	var textoD;
	for (i = 0; i < nTextoD; i++) {
		textoD = TextoD[i];
		textoD.onkeyup = function (e) {
			filtrar(true);
		}
	}
}

function filtrar(detalle) {
	if (detalle) {
		var cabeceras = document.getElementsByName("cabeceraD");
		var nCabeceras = cabeceras.length;
		var cabecera;
		var exito;
		matrizDetalle = [];
		var nRegistros = listaDetalle.length;
		var nCampos;
		var contenido = "";
		var campos;
		var campoFiltrado = [];
		var x = 0;
		for (var i = 0; i < nRegistros; i++) {
			campos = listaDetalle[i].split("¦");
			campoFiltrado = [];
			nCampos = campos.length;
			for (var k = 0; k < matrizIndiceDetalle.length; k++) {
				campoFiltrado.push(campos[matrizIndiceDetalle[k]]);
			}
			for (var j = 0 ; j < nCabeceras; j++) {
				exito = true;
				cabecera = cabeceras[j];
				if (cabecera.className == "TextoD") exito = exito && (campoFiltrado[(j == 2) ? 3 : j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
				else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
				if (!exito) break;
			}

			if (exito) {
				matrizDetalle[x] = [];
				matrizDetalle[x] = listaDetalle[i];
				x++;

			}
		}
		paginar(0, true);
		indiceActualBloque = 0;
	}
	else {
		var cabeceras = document.getElementsByName("cabecera");
		var nCabeceras = cabeceras.length;
		var cabecera;
		var exito;
		matrizPrincipal = [];
		var nRegistros = listaPrincipal.length;
		var nCampos;
		var contenido = "";
		var campos;
		var campoFiltrado = [];
		var x = 0;
		for (var i = 0; i < nRegistros; i++) {
			campos = listaPrincipal[i].split("¦");
			campoFiltrado = [];
			nCampos = campos.length;
			for (var k = 0; k < matrizIndicePrincipal.length; k++) {
				campoFiltrado.push(campos[matrizIndicePrincipal[k]]);
			}
			for (var j = 0 ; j < nCabeceras; j += 1) {
				exito = true;
				cabecera = cabeceras[j];
				if (cabecera.className == "Texto") exito = exito && (campoFiltrado[(j == 2) ? 3 : j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
				else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
				if (!exito) break;
			}

			if (exito) {
				matrizPrincipal[x] = [];
				for (var j = 0; j < nCampos; j++) {
					matrizPrincipal[x][j] = campos[j];
				}
				x++;
			}
		}
		paginar(0, false);
		indiceActualBloque = 0;
	}

}

function paginar(indicePagina, detalle) {
	var nRegistros
	if (detalle) {
		nRegistros = matrizDetalle.length;
	}
	else {
		var u = 0;
		for (var x = 0; x < matrizPrincipal.length; x++) {
			if (matrizPrincipal[x][4] == "True") {
				u++;
			}
		}
		nRegistros = u;
	}
	esBloque = (indicePagina < 0);
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
	mostrarMatriz(indicePagina, detalle);
}

function mostrarMatriz(indicePagina, detalle) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	Campoeliminar = "";
	var n;
	var nCampos;
	var inicio;
	var fin;
	if (detalle) {
		//limpiarFormulario(false);
		n = matrizDetalle.length;
		if (n > 0) {
			nCampos = matrizDetalle[0].split("¦").length;
			inicio = indicePagina * registrosPagina;
			fin = inicio + registrosPagina;
			var valor;
			for (var i = inicio; i < fin; i++) {
				if (i < n) {
					valor = matrizDetalle[i].split("¦");
					contenido += "<tr class='FilaDatos'>";
					for (var j = 0; j < nCampos; j++) {
						switch (j) {
							case 0:
								contenido += "<td style='text-align:center'>";
								contenido += valor[j];
								break;
							case 1:
								contenido += "<td>";
								contenido += valor[j];
								break;
							case 2:
								contenido += "<td style='text-align:right'>";
								contenido += (valor[j] * 1).toFixed(3);
								break;
							default:
								contenido += "<td>";
								contenido += valor[j];
								break;
						}
						contenido += "</td>";
					}
					contenido += "<td style='text-align:center'><span class='Icons fa-trash-o' onclick='agregarPrestacion(";
					contenido += i;
					contenido += ",true)'></span></td>";
					contenido += "</tr>";
				}
				else break;
			}
		}
		else {
			var nCabeceras = cabecerasDetalle.length;
			contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
			contenido += (nCabeceras + 2).toString();
			contenido += "'>No hay datos</td></tr>";
		}
		document.getElementById("tbDetalle").innerHTML = contenido;
		crearPaginas(true, "tdPaginasDetalle");
		if (esBloque) {
			crearPaginas(true, "tdPaginasDetalle");
		}
	}
	else {
		n = matrizPrincipal.length;
		if (n > 0) {
			nCampos = matrizPrincipal[0].length;
			inicio = indicePagina * registrosPagina;
			fin = inicio + registrosPagina;
			for (var i = inicio; i < fin; i++) {
				if (i < n) {
					if (matrizPrincipal[i][4] == "True") {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnPrincipal' id='rdn";
						contenido += i;
						//contenido += "' data-campo='";
						//contenido += matrizPrincipal[i][0];
						contenido += "' data-check='";
						contenido += matrizPrincipal[i][0];
						contenido += "'/></td>";
						for (var j = 0; j < (nCampos-1); j++) {
							switch (j) {
								case 0:
									contenido += "<td style='text-align:center'>";
									contenido += matrizPrincipal[i][j];
									break;
								case 1:
									contenido += "<td>";
									contenido += matrizPrincipal[i][j];
									break;
								case 2:
									contenido += "<td style='text-align:right'>";
									contenido += (matrizPrincipal[i][j] * 1).toFixed(3);
									break;
								default:
									contenido += "<td>";
									contenido += matrizPrincipal[i][j];
									break;
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
					}
				}
				else break;
			}

		}
		else {
			var nCabeceras = cabecerasPrincipal.length;
			contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
			contenido += (nCabeceras + 2).toString();
			contenido += "'>No hay datos</td></tr>";
		}
		document.getElementById("tbPrincipal").innerHTML = contenido;
		crearPaginas(false, "tdPaginasPrincipal");
		if (esBloque) {
			crearPaginas(false, "tdPaginasPrincipal");
		}
		configurarChecks();
		//if (matrizPrincipal.length > 0) {
		//    var tbPrincipal = document.getElementById("tbPrincipal");
		//    var nRows = tbPrincipal.rows.length;
		//    if (nRows > 0 && nRows != null) {
		//        tbPrincipal.rows[0].click();
		//    }
		//}
	}

}

function crearPaginas(detalle, tdpagina) {
	var nRegistros;
	if (detalle) {
		nRegistros = matrizDetalle.length;
	}
	else {
		var u = 0;
		for (var x = 0; x < matrizPrincipal.length; x++) {
			if (matrizPrincipal[x][4] == "True") {
				u++;
			}
		}
		nRegistros=u;
	}
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1," + detalle + ");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2," + detalle + ");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += ",";
			contenido += detalle;
			contenido += ");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			if (detalle) contenido += "' id='ad";
			else contenido += "' id='a";
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3," + detalle + ");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4," + detalle + ");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById(tdpagina).innerHTML = "";
	}
	else {
		document.getElementById(tdpagina).innerHTML = contenido;
		seleccionarPaginaActual(detalle);
	}
}

function seleccionarPaginaActual(detalle) {
	var aPagina;
	if (detalle) aPagina = document.getElementById("ad" + indiceActualPagina);
	else aPagina = document.getElementById("a" + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}

function configurarControles() {
	var btnGrabar = document.getElementById("btnGrabar");
	if (btnGrabar != null) {
		btnGrabar.onclick = function () {
			window.parent.abrirPopup('PopupPrestaciones');
			var hdfListaPresta = window.parent.document.getElementById("hdfListaPresta");
			var contenido = "";
			var valor,cont=0;
			for (var x = 0; x < matrizChecks.length; x++) {
				valor = matrizChecks[x];
				contenido += valor
				if ((x + 1) < matrizChecks.length) {
					contenido += ",";
				}
			}
			var TextoD = document.getElementsByClassName("TextoD");
			for (var t = 0; t < TextoD.length; t++) {
				TextoD[t].value = "";
			}
			filtrar(true);

			var hdfPrestacionvm = window.parent.document.getElementById("hdfPrestacionvm");
			if (hdfPrestacionvm) {
				var tbDetalle = document.getElementById("tbDetalle"),
					nrows = tbDetalle.rows.length, fila;
				for (var i = 0; i < nrows; i += 1) {
					fila = tbDetalle.rows[i];
					if ((fila.cells[2].textContent * 1) == 0) {
						cont++;
						break;
					}
				}
				hdfPrestacionvm.value = cont;
			}
			hdfListaPresta.value = contenido;
			hdfListaPresta.onchange();
		}
	}

	var aExportarExcel = document.getElementById("aExportarExcel");
	if (aExportarExcel != null) {
		aExportarExcel.onclick = function () {
			var nRegistros = matrizDetalle.length;
			if (nRegistros > 0) {
				exportacion();
				var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
				this.download = "Prestacion.xls";
				this.href = window.URL.createObjectURL(formBlob);
			}
		}
	}
}

function configurarChecks() {
	var rdnPrincipal = document.getElementsByName("rdnPrincipal");
	var nCampos = rdnPrincipal.length;
	var valorCheck;
	for (var x = 0; x < nCampos; x++) {
		rdnPrincipal[x].onclick = function () {
			if (this.checked) {
				var valor = this.id.split("rdn").join("").trim();
				agregarPrestacion(valor);
				this.disabled = true;
			}
		}
		if (matrizChecks.length > 0) {
			valorCheck = rdnPrincipal[x].getAttribute("data-check");
			//valorCheck = rdnPrincipal[x].id.split("rdn").join("").trim();
			for (var y = 0; y < matrizChecks.length; y++) {
				if (matrizChecks[y] == valorCheck) {
					rdnPrincipal[x].checked = true;
					rdnPrincipal[x].disabled = true;
					break;
				}
			}
		}
	}
}

function agregarPrestacion(id, opcion) {
	if (opcion != undefined) {
		var dato, dato2;
		dato2 = matrizDetalle[id].split("¦");
		for (var x = 0; x < listaDetalle.length; x++) {
			dato = listaDetalle[x].split("¦");
			if (dato[0] == dato2[0]) {				
				matrizChecks.splice(x, 1);
				listaDetalle.splice(x, 1);
				matrizDetalle = [];
				for (var y = 0; y < listaDetalle.length; y++) {
					matrizDetalle.push(listaDetalle[y]);
				}
				break;
			}
		}
		paginar(0, true);
		paginar(indiceActualPagina, false);
		var cabeceraD = document.getElementsByName("cabeceraD");
		for (var z = 0; z < cabeceraD.length; z++) {
			if (cabeceraD[z].value != "") {
				filtrar(true);
				break;
			}
		}
	}
	else {
		matrizChecks.push(matrizPrincipal[id][0]);
		matrizDetalle.push(matrizPrincipal[id][0] + "¦" + matrizPrincipal[id][1] + "¦" + matrizPrincipal[id][2] + "¦" + matrizPrincipal[id][3]);
		listaDetalle.push(matrizPrincipal[id][0] + "¦" + matrizPrincipal[id][1] + "¦" + matrizPrincipal[id][2] + "¦" + matrizPrincipal[id][3]);
		paginar(0, true);
	}

	//var provi = matrizPrincipal.slice(id, 1);
	//matrizPrincipal = [];
	//matrizPrincipal = provi;
	//matrizPrincipal = matrizPrincipal.concat(provi);
	//var provi = matrizPrincipal.slice(id,id+1);
	//var vector = matrizPrincipal.slice(0, id);
	//matrizPrincipal = [];
	//matrizPrincipal = vector.concat(provi);
	//paginar(indiceActualPagina, false);

}


function limpiar() {
	var rdnMedico = document.getElementsByName("rdnMedico");
	var nCampos = rdnMedico.length;
	for (var x = 0; x < nCampos; x++) {
		if (rdnMedico[x].checked) {
			rdnMedico[x].checked = false;
			break;
		}
	}
	idPasar = "";
	paginar(-1);
	indiceActualBloque = 0;
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
		if (text != null) xhr.send(text);
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


function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 60px'>Código</td>";
	cabecera += "<td style='width: 300px'>Nombre</td>";
	cabecera += "<td style='width: 100px'>Valor Medida</td>";
	cabecera += "<td style='width: 180px'>Servicio</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matrizDetalle.length;
	var nCampos = matrizDetalle[0].split("¦").length;
	var contenido = [];
	excelExportar = crearCabeceraExportar();
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		var campo = matrizDetalle[i].split("¦");
		for (j = 0; j < nCampos; j++) {
			contenido.push("<td>" + campo[j].trim().replace("\n", " ") + "</td>");
		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
}


