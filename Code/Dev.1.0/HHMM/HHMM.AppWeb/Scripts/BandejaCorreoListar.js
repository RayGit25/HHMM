var lista = [];
var listaTipoAdmision = [];
var matriz = [];
var matrizAdjunto = [];
var matrizTipoAdmision = [];
var cabeceras = ["De", "Para", "Médico/Empresa", "Tipo Admisión", "Periodo", "Nro. Planilla", "Fecha Hora"];
var anchos = [17, 17, 24, 10, 8, 8, 16];
var matrizIndice = [0, 1, 2, 3, 4, 5, 6];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var idResponsableCorreo = -1;
var tituloPoup = "";
var Campoeliminar = "";
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
	estableceSucursal();
	buscarTipoAdmision();
	configurarControles();
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function buscarTipoAdmision() {
	var pos1 = window.location.href.indexOf("Difundir");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Difundir/listarTipoAdmision/?ss=" + ss;
	$.ajax(url, "get", listarInicial);
}

function estableceSucursal() {
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
	document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
}

function listarInicial(rpta) {
	listaTipoAdmision = [];
	if (rpta != "") {
		listaTipoAdmision = rpta.split("¯");
		listarTipoAdmision();
	}
}

function listarTipoAdmision(irUltimaPagina) {
	crearMatrizTipoAdmision();
	mostrarMatrizTipoAdmision();
}

function crearMatrizTipoAdmision() {
	var nRegistros = listaTipoAdmision.length;
	var nCampos;
	var campos;
	var x = 0;
	matrizTipoAdmision = [];
	for (i = 0; i < nRegistros; i++) {
		campos = listaTipoAdmision[i].split("¦");
		matrizTipoAdmision[x] = [];
		nCampos = campos.length;
		for (j = 0; j < nCampos; j++) {
			if (isNaN(campos[j])) matrizTipoAdmision[x][j] = campos[j];
			else matrizTipoAdmision[x][j] = campos[j] * 1;
		}
		x++;
	}
}

function mostrarMatrizTipoAdmision() {
	var contenido = "";
	var n = matrizTipoAdmision.length;
	if (n > 0) {
		contenido += "<option value='0'>Seleccione</option>";
		for (var i = 0; i < n; i++) {
			contenido += "<option value='" + matrizTipoAdmision[i][0] + "'>" + matrizTipoAdmision[i][1] + "</option>";
		}
	}
	else {
		contenido += "<option value='0'>Seleccione</option>";
	}
	document.getElementById("cboTipoAdmision").innerHTML = contenido;
}

// ***

function buscarBandejaCorreo() {

	var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var txtMedico = document.getElementById("txtMedico");
	var cboTipoAdmision = document.getElementById("cboTipoAdmision");
	var cboMes = document.getElementById("cboMes");
	var txtAnio = document.getElementById("txtAnio");

	var ss = window.parent.document.getElementById("iss").value;

	var frm = new FormData();
	frm.append("SucursalId", intSucursalId);
	frm.append("PersonaId", document.getElementById("hdfMedico").value);
	frm.append("TipoAdmisionId", cboTipoAdmision.value);
	frm.append("MesPeriodo", cboMes.value);
	frm.append("AnioPeriodo", txtAnio.value);
	frm.append("OrdenAtencionId", "0");
	frm.append("ExpedienteId", "0");

	var url = urlBase + "Difundir/listarBandejaCorreo/?ss=" + ss;
	$.ajax(url, "post", listarTodo, frm);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla();
	configurarOrdenacion();
	configurarControles2();
	configurarFiltro();
}

function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'></th>";
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
		contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbBandejaCorreo' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 1).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divBandejaCorreo").innerHTML = contenido;
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
	if (esFechaValida(valX) && esFechaValida(valY)) {
		valX = convertirFecha(valX);
		valY = convertirFecha(valY);
		return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
	}
	else {
		return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
	}
}


function esFechaValida(strFecha) {
	var arr = strFecha.toString().split('/');
	var y = arr[2], m = arr[1], d = arr[0];
	var diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if ((!(y % 4) && y % 100) || !(y % 400)) {
		diasMes[1] = 29;
	}
	return d <= diasMes[--m]
}

function convertirFecha(strFecha) {
	var arr = strFecha.split("/");
	return new Date(arr[2], arr[1] - 1, arr[0]);
}

function configurarControles2() {

	/* var aExportarExcel = document.getElementById("aExportarExcel");
	 aExportarExcel.onclick = function () {
 
		 if (lista.length <= 0) {
			 mostrarlerta('No hay datos para exportar.');
			 return;
		 };
 
		 // Exportar, según Tipo de Navegador
		 var ua = window.navigator.userAgent;
		 var msie = ua.indexOf("MSIE ");
		 var resultado = false;
 
		 exportacion();
 
		 if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // Internet Explorer
		 {
			 txtExportar.document.open("txt/html", "replace");
			 txtExportar.document.write(excelExportar);
			 txtExportar.document.close();
			 txtExportar.focus();
			 resultado = txtExportar.document.execCommand("SaveAs", true, "BandejaCorreo.xls");
		 }
		 else // Otro Navegador
		 {
			 //resultado = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excelExportar));
 
			 var formBlob = new Blob([excelExportar], { type: "type:'text/html'" });
			 var url = window.URL.createObjectURL(formBlob);
			 var a = document.createElement("a");
			 document.body.appendChild(a);
			 a.href = url;
			 a.download = "BandejaCorreo.xls";
			 a.click();
			 setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
			 resultado = true;
		 }
 
		 return resultado;
	 }*/

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
			if (cabecera.className == "Texto") exito = exito && (campos[j + 1].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[j + 1] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j])) matriz[x][j] = campos[j];
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

function listarTodo(rpta) {
	lista = [];
	if (rpta != "") {
		lista = rpta.split("¯");
		listarBandejaCorreo();
	}
	else {
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 1).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbBandejaCorreo").innerHTML = contenido;
	}
}

function listarBandejaCorreo(irUltimaPagina) {
	crearMatriz();
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		paginar(0);
		indiceActualBloque = 0;
	}
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
			if (isNaN(campos[j])) matriz[x][j] = campos[j];
			else matriz[x][j] = campos[j] * 1;
		}
		x++;
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

function mostrarMatriz(indicePagina) {
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				contenido += "<td style='text-align:center'><span class='Icons fa-eye' onclick='EscogerOpcion(false);limpiarFormulario();mostrarBandejaCorreo(";
				contenido += matriz[i][0];
				contenido += ")'></span></td>";
				for (var j = 1; j < nCampos; j++) {
					contenido += "<td>";
					contenido += matriz[i][j];
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
		contenido += (nCabeceras+1).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbBandejaCorreo").innerHTML = contenido;
	crearPaginas();
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

// ***

function configurarControles() {

	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		validar[x].onfocus = function (event) {
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
		validar[x].onblur = function () {
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

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		if (!validarBusqueda()) return;
		buscarBandejaCorreo();
	}

	var spnDoctor = document.getElementById("spnDoctor");
	spnDoctor.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			var ss = window.parent.document.getElementById("iss").value;
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("txtMedico").value = datos[1];
		}
	}
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

function validarBusqueda() {

	var txtSucursal = document.getElementById("txtSucursal");

	mensajeValidacion = [];

	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeSucursal = validarTexto(txtSucursal.id, "Sucursal", true);
	if (mensajeSucursal != "") {
		mensajeValidacion[txtSucursal.getAttribute("data-secuencia")] = mensajeSucursal;
		txtSucursal.className += " error";
		txtSucursal.focus();
	}


	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}

}

// ***

function operacion(titulo) {
	tituloPoup = titulo;
}

function EscogerOpcion(valor) {
	var hdfOpc = document.getElementById("hdfOpc");
	if (valor) hdfOpc.value = "1";
	else hdfOpc.value = "2";
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	var span = document.getElementById('TituloPopupBandejaCorreo');
	span.textContent = tituloPoup;
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function estableceFormulario() {
	var txtDe = document.getElementById("txtDe");
	var txtPara = document.getElementById("txtPara");
	var txtMedicoNombre = document.getElementById("txtMedicoNombre");
	var txtFecha = document.getElementById("txtFecha");
	var txtPlanilla = document.getElementById("txtPlanilla");
	var txtPeriodo = document.getElementById("txtPeriodo");
	var txtCuerpo = document.getElementById("txtCuerpo");
	mostrarAdjunto();
}


function limpiarFormulario() {
	var txtDe = document.getElementById("txtDe");
	var txtPara = document.getElementById("txtPara");
	var txtMedicoNombre = document.getElementById("txtMedicoNombre");
	var txtFecha = document.getElementById("txtFecha");
	var txtPlanilla = document.getElementById("txtPlanilla");
	var txtPeriodo = document.getElementById("txtPeriodo");
	var txtCuerpo = document.getElementById("txtCuerpo");
	txtDe.value = ""
	txtPara.value = ""
	txtMedicoNombre.value = ""
	txtFecha.value = ""
	txtPlanilla.value = ""
	txtPeriodo.value = ""
	txtCuerpo.value = "";
}

function DescargarAdjunto(rpta) {
	if (rpta.size > 0) {
		var spnAdjunto = document.getElementById("spnAdjunto");
		if (spnAdjunto != null) {
			var archivo = spnAdjunto.innerHTML;
			var tipo = "";
			switch (archivo.split(".")[1]) {
				case "pdf":
					tipo = 'application/pdf';
					break;
				case "doc":
					tipo = 'application/msword';
					break;
				case "docx":
					tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
					break;
			}
			var blob = new Blob([rpta], {
				type: tipo
			});
			var a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = archivo;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			delete a;
		}
	}
	else {
		mostraralerta("No se ha encontrado el archivo");
	}
}


function mostrarAdjunto(lista2) {
	var contenido = "";
	var n = lista2.length;
	if (n > 0) {
		contenido += "<span class='link-adjunto' id='spnAdjunto' style='text-decoration:underline;cursor:pointer;color:#00a850' data-archivo='" + lista2[0] + "'>" + lista2[1] + "</span>";
	}
	document.getElementById("divAdjunto").innerHTML = contenido;
	if (n > 0) {
		var ss = window.parent.document.getElementById("iss").value;
		var spnAdjunto = document.getElementById("spnAdjunto");
		spnAdjunto.onclick = function () {
			var archivo = this.getAttribute("data-archivo");
			var frm = new FormData();
			frm.append("archivoCliente", archivo);
			frm.append("extension", archivo.split(".")[1]);
			var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&op=2" + "&idCompania=" + idCompania;

			var xhr = new XMLHttpRequest();
			xhr.open("post", url);
			xhr.responseType = 'blob';
			xhr.onreadystatechange = function () {
				if (xhr.status == 200 && xhr.readyState == 4) {
					DescargarAdjunto(xhr.response);
				}
			}
			xhr.send(frm);
		}
	}
}

function mostrarBandejaCorreo(id) {
	var ss = window.parent.document.getElementById("iss").value;

	var frm = new FormData();
	frm.append("BandejaCorreoId", id);

	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Difundir/listarBandejaCorreoPorId/?ss=" + ss;
	$.ajax(url, "post", mostrarFormulario, frm);

}

function mostrarFormulario(rpta) {
	if (rpta != "") {
		var matrizRpta = rpta.split("_");;
		var lista1 = matrizRpta[0].split("¦");;
		var lista2 = matrizRpta[1].split("¦");;
		var txtDe = document.getElementById("txtDe");
		var txtPara = document.getElementById("txtPara");
		var txtMedicoNombre = document.getElementById("txtMedicoNombre");
		var txtFecha = document.getElementById("txtFecha");
		var txtPlanilla = document.getElementById("txtPlanilla");
		var txtPeriodo = document.getElementById("txtPeriodo");
		var txtCuerpo = document.getElementById("txtCuerpo");
		txtDe.value = lista1[1];
		txtPara.value = lista1[2];
		txtMedicoNombre.value = lista1[4];
		txtFecha.value = lista1[10];
		txtPlanilla.value = lista1[9];
		txtPeriodo.value = lista1[7];
		txtCuerpo.value = lista1[8];
		mostrarAdjunto(lista2);
		operacion("Detalle de Información de Correo");
		abrirPopup('PopupBandejaCorreo');

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