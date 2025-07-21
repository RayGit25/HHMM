var matriz = [], matrizFiltro = [], lista = [];
var cabeceras = ["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora","Código Contrato", "Servicio","Mod. Facturación","Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla", "Id Estado Planilla", "Indicador Honorario","EstadoHospitalizacion","SituacionDetalleHospitalizacion","IndicadorEliminado","SituacionDetalleExpediente", "Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "PlanillaIdWeb", "Estado PlanillaWeb"];
var anchos = [65, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 125, 125, 125, 100, 90, 90, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420,100, 200,200, 420, 120, 120, 120, 120, 650, 120, 120, 140, 140,140,200,140,200, 120, 140, 140, 140, 140];
var matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,49,50,51,52,53,54];
var registrosPagina = 8;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceActualPagina = 0;
var urlBase = "";
var idPasar = "";
var opcionfiltro = -1;
window.onload = function () {
	var hdfDatos = document.getElementById("hdfDatos").value.split("¬");
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/listarOADetalle/?ss=" + ss + "&su=" + hdfDatos[0] + "&oa=" + hdfDatos[1];
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla();
	configurarOrdenacion();
	configurarFiltro();
}

function listarTodo(rpta) {
	if (rpta != "") lista = rpta.split("¯");
	else lista = "";
	listarOA();
}

function configurarControles() {
	
	var datos = "";
	var formBlob;
	var anchorElem;
	var elem;
	datos = exportarExcel(MtzPro, MtzHor, MtzPer);
	if (datos != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", "ReporteDetalladoProvision.xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	}
}

function listarOA() {
	crearMatriz();
	paginar(-1);
	indiceActualBloque = 0;
	var divIfrDetalleOA = window.parent.document.getElementById("divIfrDetalleOA");
	divIfrDetalleOA.style.height = (document.getElementsByTagName("HTML")[0].offsetHeight + 20) + "px";
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
	var contenido = "<table class='tabla-general' style='table-layout:fixed;width:8200px'>";
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
	contenido += "<tbody id='tbPrincipal' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divOA").innerHTML = contenido;
}

function crearMatriz() {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	matriz = [];
	matrizFiltro = []
	if (lista != "") {
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			matriz[x] = [];
			matrizFiltro[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				switch (j) {
					case 11:
					case 49:
						matriz[x][j] = (campos[j] == "0" ? "" : campos[j]);
						matrizFiltro[x][j] = (campos[j] == "0" ? "" : campos[j]);
						break;
					default:
						matriz[x][j] = campos[j];
						matrizFiltro[x][j] = campos[j];
						break;
				}

			}
			x++;
		}
	}

}

function mostrarMatriz(indicePagina) {
	var contenido = "";
	var n = matriz.length;
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				for (var j = 0; j < nCampos; j++) {
					switch (j) {
						case 16:
						case 17:
						case 18:
						case 29:
						case 47:
							contenido += "<td>";
							contenido += (matriz[i][j].indexOf("1900") > -1 ? "" : matriz[i][j]);
							break;
						case 19:
						case 20:
						case 21:
						case 22:
						case 25:
						case 26:
						case 27:
						case 28:
						case 39:
						case 40:
							contenido += "<td style='text-align:right'>";
							contenido += formatearNumero(matriz[i][j]);
							break;
						case 11:
						case 53:
							contenido += "<td>";
							contenido += (matriz[i][j] == "0" ? "" : matriz[i][j]);
							break;
						default:
							contenido += "<td>";
							contenido += matriz[i][j];
							break;
					}
					contenido += "</td>";
				}
				contenido += "</tr>";
			}
			else break;
		}
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbPrincipal").innerHTML = contenido;
	crearPaginas();
	if (esBloque) {
		crearPaginas(crearPaginas);
	}
}
function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("Enlace");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			if (matriz.length > 0) {
				ordenarMatriz(this);
				mostrarMatriz(0);
			}
		}
	}
}



function ordenarMatriz(enlace) {
	var indiceOrden = enlace.getAttribute("data-orden") * 1;
	var validado = false;
	if (opcionfiltro != indiceOrden) {
		opcionfiltro = indiceOrden;
		validado = true;
	}
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces();
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	if (validado) {
		matriz = [];
		matriz = mergeSort(matrizFiltro, indiceOrden);
	} else {
		matriz.reverse();
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
	//var combos = document.getElementsByClassName("Combo");
	//var nCombos = combos.length;
	//var combo;
	//for (i = 0; i < nCombos; i++) {
	//	combo = combos[i];
	//	combo.onchange = function (e) {
	//		filtrar();
	//	}
	//}
}

function filtrar() {
	var cabeceras = document.getElementsByName("cabecera");
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	matriz = [];
	var nRegistros = matrizFiltro.length;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var nFiltrados = matrizIndice.length
	var x = 0;
	var datoEnMatriz;
	for (var i = 0; i < nRegistros; i++) {
		campos = matrizFiltro[i];
		campoFiltrado = [];
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j++) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto")) exito = exito && (campos[matrizIndice[j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[campos[matrizIndice[j]]] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			datoEnMatriz = matrizFiltro[i].slice(0);
			matriz[x] = [];
			matriz[x] = datoEnMatriz.splice(0);
			x++;
		}
	}
	paginar(-1);
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

var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}


function limpiar() {
	idPasar = "";
	paginar(-1);
	indiceActualBloque = 0;
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

function exportarExcel() {
	var contenido = "";
	if (matriz.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, nombre = "";
		n = matriz.length;
		ncampos = matriz[0].length;
		nombre = "Producción";
		if (n > 0) {
			contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
			contenido += '<ss:Column ss:Width="65"/>';
			contenido += '<ss:Column ss:Width="70"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="75"/>';
			contenido += '<ss:Column ss:Width="405"/>';
			contenido += '<ss:Column ss:Width="75"/>';
			contenido += '<ss:Column ss:Width="405"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="80"/>';
			contenido += '<ss:Column ss:Width="115"/>';
			contenido += '<ss:Column ss:Width="80"/>';
			contenido += '<ss:Column ss:Width="90"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="900"/>';
			contenido += '<ss:Column ss:Width="125"/>';
			contenido += '<ss:Column ss:Width="90"/>';
			contenido += '<ss:Column ss:Width="125"/>';
			contenido += '<ss:Column ss:Width="125"/>';
			contenido += '<ss:Column ss:Width="125"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="70"/>';
			contenido += '<ss:Column ss:Width="70"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="125"/>';
			contenido += '<ss:Column ss:Width="300"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="420"/>';
			contenido += '<ss:Column ss:Width="100"/>';
			contenido += '<ss:Column ss:Width="200"/>';
			contenido += '<ss:Column ss:Width="200"/>';
			contenido += '<ss:Column ss:Width="420"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="650"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			contenido += '<ss:Column ss:Width="200"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			contenido += '<ss:Column ss:Width="200"/>';
			contenido += '<ss:Column ss:Width="120"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			contenido += '<ss:Column ss:Width="140"/>';
			for (var z = 0; z < n; z++) {				
				if (z == 0) {
					contenido += "<Row>";					
					for (var k = 0; k < cabeceras.length; k++) {
						contenido += '<Cell ss:StyleID="s79">';
						contenido += '<Data ss:Type="String">';
						contenido += cabeceras[k];
						contenido += '</Data>';
						contenido += '</Cell>';
					}
					contenido += "</Row>";
				}
				contenido += "<Row>";
				for (y = 0; y < ncampos; y++) {
						switch (y) {
							case 3:
							case 5:
							case 9:
							case 10:							
							case 42:
							case 43://41
							case 44://42
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
							case 39:
							case 40:
								contenido += '<Cell ss:StyleID="s65">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[z][y] * 1;
								break;
							case 16:
							case 17:
							case 18:
							case 29:
							case 51:
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
											
					contenido += '</Data>';
					contenido += '</Cell>';
				}
				contenido += "</Row>";
			}
			contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
		}

		contenido += '</Workbook>';
	}
	return contenido;
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