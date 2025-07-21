var lista = [];
var listaAnios;
var matriz = [];
var matrizAnios = [];
var cabeceras = ["Descripción", "Fecha", "Estado"];
var anchos = [60, 15, 15];
var matrizIndice = [1, 2, 4];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var sucursalId = "";
var idFeriado = -1;
var Campoeliminar = "";
window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var pos1 = window.location.href.indexOf("Mantenimiento");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/listarFeriado/?ss=" + ss + "&sucursal=" + sucursalId;
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}


window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	crearTabla();
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
}

function EscogerOpcion(valor) {
	var TituloPopupFeriado = document.getElementById("TituloPopupFeriado");
	var hdfOpc = document.getElementById("hdfOpc");
	var spnHistorial = document.getElementById("spnHistorial");
	if (valor) {
		hdfOpc.value = "1";
		TituloPopupFeriado.innerHTML = "AGREGAR FERIADO";
		spnHistorial.style.display = "none";
		document.getElementById("txtEstado").value = "ACTIVO";
	}
	else {
		hdfOpc.value = "2";
		TituloPopupFeriado.innerHTML = "MODIFICAR FERIADO";
		spnHistorial.style.display = "inline";
	}
	var txtFecha = document.getElementById("txtFecha");
	txtFecha.focus();
}

function listarTodo(rpta) {
	if (rpta != "") {
		lista = rpta.split("¯");
		listarFeriado();
	}
	var ddlAnios = document.getElementById("ddlAnios");
	var hanio = window.parent.document.getElementById("hanio");
	ddlAnios.value = hanio.value;
	ddlAnios.onchange();
}


function listarFeriado(irUltimaPagina) {
	crearMatriz();
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		paginar(0);
		indiceActualBloque = 0;
	}
	llenarCombo(listaAnios, "ddlAnioInicioCopia");
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
	var contenido = "<table class='tabla-general tabla-corta'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupFeriado\");'></span></th>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace' data-orden='";
		contenido += matrizIndice[j];
		contenido += "'>";
		contenido += cabeceras[j];
		contenido += "</span><br/>";
		if (j == (nCampos - 1)) contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
		else contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbFeriado' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divFeriado").innerHTML = contenido;
}

function crearMatriz() {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	var ddlAnios = document.getElementById("ddlAnios").value;
	matriz = [];
	matrizAnios = [];
	for (i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		if (ddlAnios == "" || campos[3] == ddlAnios) {
			matriz[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j])) matriz[x][j] = campos[j];
				else matriz[x][j] = campos[j] * 1;
			}
			x++;
		}
		if (matrizAnios.indexOf(campos[3]) == -1) {
			matrizAnios.push(campos[3]);
		}
	}
}

function mostrarMatriz(indicePagina) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	Campoeliminar = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarFeriado(";
				contenido += matriz[i][0];
				contenido += ")'></span></td>";
				for (var j = 1; j < nCampos; j++) {
					if (j != 3) {
						if (j == 4) {
							contenido += "<td style='text-align:center'>";
							contenido += (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO");
						}
						else {
							if (j == 2) {
								contenido += "<td style='text-align:center'>";
								contenido += formatearfecha(matriz[i][j]);
							}
							else {
								contenido += "<td>";
								contenido += matriz[i][j];
							}
						}
						contenido += "</td>";
					}
				}
				contenido += "<td style='text-align:center'><span class='Icons ";
				contenido += (matriz[i][4] == "A" ? "fa-trash-o" : "fa-check");
				contenido += "' onclick='abrirPopup(";
				contenido += '"PopupEstado"';
				contenido += ");Campoeliminar=";
				contenido += i;
				contenido += ";'";
				contenido += "></span></td>";
				contenido += "</tr>";
			}
			else break;
		}
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbFeriado").innerHTML = contenido;
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
	var valX = (indiceOrden == "2" ? fechaUTC(x[indiceOrden]) : (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]));
	var valY = (indiceOrden == "2" ? fechaUTC(y[indiceOrden]) : (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]));
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
	var campoFiltrado;
	var x = 0;
	var ddlAnios = document.getElementById("ddlAnios").value;
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		campoFiltrado = campos.slice(1, 3);
		campoFiltrado.push(campos.slice(4)[0]);
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "Texto") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
			if (!exito) break;
		}
		if (exito) {
			if (ddlAnios == "" || campos[3] == ddlAnios) {
				matriz[x] = [];
				for (var j = 0; j < nCampos; j++) {
					if (isNaN(campos[j])) matriz[x][j] = campos[j];
					else matriz[x][j] = campos[j] * 1;
				}
				x++;
			}
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

function mostrarFeriado(id) {
	var nCampos = matriz.length;
	var campo = "";
	var txtFecha = document.getElementById("txtFecha");
	var txtDescripcion = document.getElementById("txtDescripcion");
	var txtEstado = document.getElementById("txtEstado");
	var hdfCd = document.getElementById("hdfCd");
	for (var i = 0; i < nCampos; i++) {
		campo = matriz[i][0];
		if (campo == id) {
			hdfCd.value = id;
			txtFecha.value = matriz[i][2];
			txtDescripcion.value = matriz[i][1];
			txtEstado.value = (matriz[i][4] == "A" ? "ACTIVO" : "INACTIVO");
			idFeriado = id;
			abrirPopup('PopupFeriado');
			break;
		}
	}
}


function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 60px' align='center'>Id</td>";
	cabecera += "<td style='width: 210px' align='center'>Descripción</td>";
	cabecera += "<td style='width: 100px' align='center'>Fecha</td>";
	cabecera += "<td style='width: 60px' align='center'>Año</td>";
	cabecera += "<td style='width: 60px' align='center'>Estado</td>";
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
			if (j == (nCampos - 1)) {
			    contenido.push("<td align='center'>" + (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
			} else {
				contenido.push("<td>" + matriz[i][j] + "</td>");
			}
			if (j < (nCampos - 1)) textoExportar.push(matriz[i][j] + ", ");
			else textoExportar.push(matriz[i][j]);

		}
		contenido.push("</tr>");
		textoExportar.push("\r\n");
	}
	textoExportar = textoExportar.join("");
	excelExportar += contenido.join("") + "</table></html>";
}


function configurarControles() {
	var btnCopiar = document.getElementById("btnCopiar");
	btnCopiar.onclick = function () {
		var alerta = document.getElementById("alerta");
		if (alerta.className.indexOf("anix") > -1) {
			alerta.className = "";
		}
		var ddlAnioFinCopia = document.getElementById("ddlAnioFinCopia");
		if (ddlAnioFinCopia.value != "") {
			var ddlAnioInicioCopia = document.getElementById("ddlAnioInicioCopia");
			if (ddlAnioFinCopia.value == ddlAnioInicioCopia.value) {
				mostraralerta("Las Fechas no deben ser las mismas", true);
			}
			else {
				var ss = window.parent.document.getElementById("iss").value;
				var url = urlBase + "Mantenimiento/copiarFeriado/?ss=" + ss + "&su=" + sucursalId + "&ani=" + ddlAnioInicioCopia.value + "&anf=" + ddlAnioFinCopia.value;
				$.ajax(url, "get", mostrarGrabar);
				abrirPopup("PopupFeriadoCopia");
			}
		}
		else {
			mostraralerta("Seleccione la fecha", true);
		}
	}
	var btnCancelarCopia = document.getElementById("btnCancelarCopia");
	btnCancelarCopia.onclick = function () {
		var alerta = document.getElementById("alerta");
		if (alerta.className.indexOf("anix") > -1) {
			alerta.className = "";
		}
		abrirPopup("PopupFeriadoCopia");
	}
	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		var nRegistros = matriz.length;
		if (nRegistros > 0) {
			exportacion();
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "Feriados.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	var ddlAnios = document.getElementById("ddlAnios");
	ddlAnios.onchange = function () {
		crearMatriz();
		paginar(0);
		indiceActualBloque = 0;
	}
	var icoCopia = document.getElementById("icoCopia");
	var ddlAnioInicioCopia = document.getElementById("ddlAnioInicioCopia");
	ddlAnioInicioCopia.value = ddlAnios.value;
	var ddlAnioFinCopia = document.getElementById("ddlAnioFinCopia");
	ddlAnioFinCopia.value = ddlAnios.value;
	icoCopia.onclick = function () {
		abrirPopup('PopupFeriadoCopia');
	}
	var txtFecha = document.getElementById("txtFecha");
	txtFecha.DatePickerX.init({
		mondayFirst: true
	});
	txtFecha.readOnly = false;
	var sucursalNombre = window.parent.document.getElementById("isuc").value.split("|")[1];
	var txtSucursal = document.getElementById("txtSucursal");
	txtSucursal.value = sucursalNombre;
	var anioActual = window.parent.document.getElementById("hanio").value;
	listaAnios = crearListaAnios(anioActual);
	llenarCombo(listaAnios, "ddlAnios");
	llenarCombo(listaAnios, "ddlAnioFinCopia");
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		validar[x].onmouseenter = function (event) {
			var valor;
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
	var btngrabar = document.getElementById("btngrabar")
	btngrabar.onclick = function () {
		if (validarFeriado()) {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var txtFecha = document.getElementById("txtFecha").value;
			var txtDescripcion = document.getElementById("txtDescripcion").value;
			var strDatos = hdfOpc + "|" + txtFecha + "|" + txtDescripcion + "|" + sucursalId;
			if (hdfOpc == 2) {
				strDatos += "|" + idFeriado;
			}
			var ss = window.parent.document.getElementById("iss").value;
			var url = urlBase + "Mantenimiento/grabarFeriado/?ss=" + ss;
			$.ajax(url, "post", mostrarGrabar, strDatos);
			abrirPopup("PopupFeriado");
		}
	}
	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1 = matriz[Campoeliminar][0];
		var valor2 = matriz[Campoeliminar][4];
		anular(valor1, valor2);
	}
}

function anular(id, estado) {
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/anularFeriado/?ss=" + ss + "&su=" + sucursalId + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A");
	$.ajax(url, "get", mostrarGrabar);
	abrirPopup('PopupEstado');

}


function mostrarGrabar(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		switch (data[1]) {
			case "1":
				var cabecera = document.getElementsByName("cabecera");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha añadido un nuevo registro");
				lista = [];
				lista = data[0].split("¯");
				listarFeriado();
				var ddlAnios = document.getElementById("ddlAnios");
				ddlAnios.onchange();
				break;
			case "2":
				var cabecera = document.getElementsByName("cabecera");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha actualizado un registro");
				lista = [];
				lista = data[0].split("¯");
				listarFeriado();
				var ddlAnios = document.getElementById("ddlAnios");
				ddlAnios.onchange();
				break;
			case "3":
				var cabecera = document.getElementsByName("cabecera");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha actualizado el estado de un registro");
				lista = [];
				lista = data[0].split("¯");
				listarFeriado();
				var ddlAnios = document.getElementById("ddlAnios");
				ddlAnios.onchange();
				break;
			case "4":
				var cabecera = document.getElementsByName("cabecera");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha copiado los feriados con exito");
				lista = [];
				lista = data[0].split("¯");
				listarFeriado();
				var ddlAnios = document.getElementById("ddlAnios");
				ddlAnios.onchange();
				break;
		}
	}
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
	}
	return "";
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

function validarFeriado() {
	var txtFecha = document.getElementById("txtFecha");
	var txtDescripcion = document.getElementById("txtDescripcion");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	var mensajeFecha = validarFecha(txtFecha.id, "fecha", true);
	if (mensajeFecha != "") {
		mensajeValidacion[txtFecha.getAttribute("data-secuencia")] = mensajeFecha;
		txtFecha.className += " error";
	}
	var mensajeDescripcion = validarTexto(txtDescripcion.id, "descripción", true);
	if (mensajeDescripcion != "") {
		mensajeValidacion[txtDescripcion.getAttribute("data-secuencia")] = mensajeDescripcion;
		txtDescripcion.className += " error";
	}
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}

}

function crearListaAnios(anio) {
	var contenido = "";
	for (var i = 10; i > 0; i--) {
		contenido += (anio * 1) - i;
		contenido += "¦";
		contenido += (anio * 1) - i;
		contenido += "¬";
	}
	contenido += (anio * 1) + "¦" + (anio * 1) + "¬";
	for (var j = 1; j < 11; j++) {
		contenido += (anio * 1) + j;
		contenido += "¦";
		contenido += (anio * 1) + j;
		if (j < 10) {
			contenido += "¬";
		}
	}
	return contenido;
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function limpiarFormulario() {
	var calendario = document.getElementsByClassName("dpx-clear")[0];
	calendario.click();
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
		validar[x].value = "";
	}
}

function llenarCombo(lista, nombreCombo, filtrar) {
	var contenido = "";
	var listas = lista.split("¬");
	var n = listas.length;
	var valor = "";
	var campos = "";
	contenido = "<option value=''>Seleccione</option>";
	for (var x = 0; x < n; x++) {
		campos = listas[x].split("¦");
		if (nombreCombo == "ddlAnioInicioCopia") {
			if (matrizAnios.indexOf(campos[1]) > -1) {
				contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>"
			}
		}
		else {
			contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
		}
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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

function formatearfecha(fecha) {
	var campos = fecha.split("/");
	var anio = campos[2];
	var mes = campos[1];
	mes = mes.length > 1 ? mes : '0' + mes;
	var dia = campos[0]
	dia = dia.length > 1 ? dia : '0' + dia;
	return dia + '/' + mes + '/' + anio;
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

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
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
function verHistorial(t) {
	var hdfCd = document.getElementById("hdfCd");
	var ss = window.parent.document.getElementById("iss").value;
	var h = window.parent.document.getElementById("Ref").value;
	var u = h + "Principal/HistorialCambio?t=" + t + "&i=" + hdfCd.value + "&ss=" + ss;
	mostrarPopupH(u);
}
function mostrarPopupH(url, tipo) {
	if (tipo == undefined) {
		var ifrHistorial = document.getElementById("ifrHistorial");
		ifrHistorial.innerHTML = "";
		if (ifrHistorial.innerHTML == "") {
			ifrHistorial.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:400px;border: 1px solid transparent;' src='" + url + "'></iframe>";
		}
	}
	abrirPopupH("PopupHistorial");
	return false;
}
function abrirPopupH(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}