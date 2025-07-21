var sucursalId;
var sucursal;
var urlBase;
var ss;
var mensajeValidacion = [];
//var aCabecera = ["Fecha Pres.", "Código OA", "Estado", "Exp", "Estado Exp.", "Nombre Paciente", "Tipo Pac.", "Cant. Mnd", "Monto Prestación", "Part. Médico", "Part. Clínica", "Bonificación", "IGV/Renta", "Importe Total", "Doc. Emit. Empr. Medic."]
var aCabecera = ["Fecha Pres.", "Código OA", "Estado", "Exp", "Estado Exp.", "Nombre Paciente", "Tipo Pac.", "Cant.", "Monto Prestación", "Part. Médico", "Part. Clínica", "Bonificación", "Importe Total", "Doc. Emit. Empr. Medic."]
var aCabeceraHorario = ["Fecha", "Hora Inicio", "Hora Fin", "Horas", "Valor Contrato", "Importe", "Bonificación", "Total", "Día", "Feriado", "Especialidad", "Tipo Atención"];
var aCabeceraMtoFijo = ["Médico", "Descripción", "Id", "Concepto", "Ind. Adm", "Periodo", "Importe", "Total General", "Documento"];
//var aCabeceraMtoFijo = ["Médico", "Descripción", "Id", "Concepto", "Ind. Adm", "Periodo", "Importe", "Impuesto", "Total General", "Documento"];
var anchosMtoFijo = [8, 24, 5, 16, 5, 8, 8, 8, 8];
//var anchosMtoFijo = [8, 24, 5, 16, 5, 8, 8, 8, 8, 8];
//var anchos = [5, 5, 8, 8, 8, 9, 5, 6, 6, 6, 6, 6, 6, 6, 10];
var anchos = [5, 5, 8, 8, 8, 9, 5, 6, 6, 6, 6, 6, 6, 10];
var aMedicos = [], aDetalle = [], lstMedico = "", lstDetalle = "", aMtoFijo = [];
var aTotales = [], aTipoAtencion = [], aTipoOrden = [], aConcepto = [], aConceptoArticulo = [];
var lstsucursal = "", lstPeriodo = "", lstFactura = "";
var listaProceso = [];
var excelExportar = "";
var excelExportarMtoFijo = "";
var cabecerasDetalle = ["Empresa", "Médico", "Especialidad", "Importe", "Bonificación", "Descuento", "Ajuste", "Total"];
var cabecerasHorario = ["Fecha", "Hora Inicio", "Hora Fin", "Horas", "Valor Contrato", "Importe", "Bonificación", "Total", "Día", "Feriado", "Especialidad", "Tipo Atención"];
var anchosHorario = [8, 8, 8, 8, 6, 8, 8, 8, 8, 8, 10, 8];
var anchosDetalle = [10, 25, 10, 10, 10, 10, 10, 10];
var matrizIndiceDetalle = [9, 1, 8, 2, 3, 4, 5, 6];
var matrizDetalle = [];
var listaProvision, listaEmpresaMedico, listaEmpresaMedicoEspecialidad;
var IndicadorPrimero = true;
var SeleccionActualProceso = "P";
var idProvision = 0;
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var lstHorario, aHorario = [], aFiltro = [];
var totales = { mtImporte: 0, mtBonificacion: 0, mtDescuento: 0, mtAjuste: 0, mtTotal: 0 };
var cadenaEsp = "";
var lstPeriodoCombo = ["L¦Semanal", "Q¦Quincenal", "M¦Mensual", "B¦Bimensual", "T¦Trimestral", "S¦Semestral", "A¦Anual"];
var totalesMtfijo = { mtImporte: 0, mtDescuento: 0, mtTotal: 0 };
window.onload = function () {
	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Control/ListasReporteProvision/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarCombo);
	configuracionInicial();
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	var reporteSelecion = document.getElementById("reporteSelecion");
	var ancho = reporteSelecion.getBoundingClientRect().width;
	if (ancho <= 800) {
		reporteSelecion.style.textAlign = "left";
	} else {
		reporteSelecion.style.textAlign = "center";
	}
}

function listarCombo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		var listaPeriodo = data[0].split("¯");
		listaProceso = data[1].split("¯");
		llenarCombo(listaPeriodo, "ddlPeriodo", "", true);
		llenarCombo(listaProceso, "ddlProceso", "", true);
		var ddlPeriodo = document.getElementById('ddlPeriodo');
		ddlPeriodo.value = ddlPeriodo.options[ddlPeriodo.options.length - 1].value;
		ddlPeriodo.onchange();
	}
}

function configuracionInicial() {
	configurarControles();
}


function configurarControles() {
	var txtSucursal = document.getElementById("txtSucursal");
	txtSucursal.value = sucursal;

	var validar = document.getElementsByClassName("validar");
	var valor;
	for (var x = 0; x < validar.length; x++) {
		validar[x].onmouseenter = function (event) {
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

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		aHorario = [], matrizDetalle = [], aDetalle = [];
		var tipoVista = document.getElementsByName("tipoVista");
		if (tipoVista[0].checked) {
			var strDatos = "";
			var hdfMedico = document.getElementById("hdfMedico").value;
			var hdfEmpresa = document.getElementById("hdfEmpresa").value;
			var ddlPeriodo = document.getElementById("ddlPeriodo").value;
			var ddlProceso = document.getElementById("ddlProceso").value;

			strDatos = sucursalId + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + ddlPeriodo + "|" + ddlProceso + "|" + (tipoVista[0].checked ? "R" : "D") + "|" + cadenaEsp;
			var url = urlBase + "Control/ListarReporteProvision/?ss=" + ss;
			$.ajax(url, "post", listarTodo, strDatos);
			document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
			cadenaEsp = "";
		} else {
			if (validarBusqueda()) {
				var strDatos = "";
				var hdfMedico = document.getElementById("hdfMedico").value;
				var hdfEmpresa = document.getElementById("hdfEmpresa").value;
				var ddlPeriodo = document.getElementById("ddlPeriodo").value;
				var ddlProceso = document.getElementById("ddlProceso").value;

				strDatos = sucursalId + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + ddlPeriodo + "|" + ddlProceso + "|" + (tipoVista[0].checked ? "R" : "D") + "|" + cadenaEsp;
				var url = urlBase + "Control/ListarReporteProvision/?ss=" + ss;
				$.ajax(url, "post", listarTodo, strDatos);
				document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
				cadenaEsp = "";
			}
		}
	};

	var spnDoctor = document.getElementById("spnDoctor");
	spnDoctor.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}
	var tipoVista = document.getElementsByName("tipoVista");
	tipoVista[0].onclick = function () {
		if (this.checked) {
			mensajeValidacion = [];
			var validar = document.getElementsByClassName("validar");
			for (var x = 0; x < validar.length; x++) {
				if (validar[x].className.indexOf("error") > -1) {
					validar[x].className = validar[x].className.split("error").join("").trim();
				}
				validar[x].value = "";
			}
			document.getElementById("hdfMedico").value = "0";
			document.getElementById("hdfEmpresa").value = "-1";
			document.getElementById("divReporte").innerHTML = "";
			document.getElementById("txtMedico").value = "";
			document.getElementById("txtEmpresa").value = "";
			document.getElementById("spnDoctor").style.display = "none";
			document.getElementById("spnEmpresa").style.display = "none";

		}
	}
	tipoVista[1].onclick = function () {
		document.getElementById("divReporte").innerHTML = "";
		document.getElementById("spnDoctor").style.display = "";
		document.getElementById("spnEmpresa").style.display = "";
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("txtMedico").value = datos[1];
		}
	}

	var spnEmpresa = document.getElementById("spnEmpresa");
	spnEmpresa.onclick = function () {
		var ifrEmpresa = document.getElementById("ifrEmpresa");
		if (ifrEmpresa.innerHTML == "") {
			ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupEmpresa");
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			var txtEmpresa = document.getElementById("txtEmpresa");
			txtEmpresa.value = datos[1];
		}
	}

	var btnLimpiar = document.getElementById("btnLimpiar");
	btnLimpiar.onclick = function () {
		mensajeValidacion = [];
		var validar = document.getElementsByClassName("validar");
		for (var x = 0; x < validar.length; x++) {
			if (validar[x].nodeName == "SELECT") {
				validar[x].selectedIndex = "0";
				if (validar[x].id === "ddlPeriodo") {
					validar[x].onchange();
				}
			} else {
				if (validar[x].className.indexOf("error") > -1) {
					validar[x].className = validar[x].className.split("error").join("").trim();
				} else {
					validar[x].value = "";
				}
            }
		}
		document.getElementById("hdfMedico").value = "0";
		document.getElementById("hdfEmpresa").value = "-1";
		document.getElementById("divReporte").innerHTML = "";
		cadenaEsp = "";
	}
	var btnAceptarAlerta = document.getElementById("btnAceptarAlerta");

	var ddlPeriodo = document.getElementById("ddlPeriodo");
	ddlPeriodo.onchange = function () {
		llenarCombo(listaProceso, "ddlProceso", "", true);
	}
}

function listarPDF(rpta) {
	if (rpta != "") {
		var data = rpta.split("¦");
		if (isIE()) {
			var archivo = crearBlob(data[1]);
			var blob = new Blob([archivo], {
				type: 'application/pdf'
			});
			window.navigator.msSaveBlob(blob, nombrePDF + ".pdf");
		} else {
			var link = "data:application/pdf;base64," + data[1];
			var ventana = null;
			//var ventana = window.open(link, '_blank');
			if (ventana == null || typeof (ventana) == 'undefined') {
				var a = document.createElement("a");
				a.href = "data:application/pdf;base64," + data[1];
				a.download = nombrePDF + ".pdf";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				delete a;
			}
		}
	}
}

function crearBlob(archivo) {
	var base64str = archivo;
	var binary = atob(base64str.replace(/\s/g, ''));
	var len = binary.length;
	var buffer = new ArrayBuffer(len);
	var view = new Uint8Array(buffer);
	for (var i = 0; i < len; i++) {
		view[i] = binary.charCodeAt(i);
	}
	return view;
}

function isIE() {
	var valor = false;
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	if (isIE == true || isEdge == true) {
		return valor = true;
	}
	return valor;
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

function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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
function validarBusqueda() {

	var txtMedico = document.getElementById("txtMedico");
	var txtEmpresa = document.getElementById("txtEmpresa");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	if (txtMedico.value == "" && txtEmpresa.value == "") {
		var mensajeMedico = validarTexto(txtMedico.id, "médico", true);
		if (mensajeMedico != "") {
			mensajeValidacion[txtMedico.getAttribute("data-secuencia")] = mensajeMedico;
			txtMedico.className += " error";
		}
	}
	else if (txtMedico.value != "" && txtEmpresa.value == "") {
		var mensajeMedico = validarTexto(txtMedico.id, "médico", true);
		if (mensajeMedico != "") {
			mensajeValidacion[txtMedico.getAttribute("data-secuencia")] = mensajeMedico;
			txtMedico.className += " error";
		}
	}
	else {
		var mensajeEmpresa = validarTexto(txtEmpresa.id, "empresa", true);
		if (mensajeEmpresa != "") {
			mensajeValidacion[txtEmpresa.getAttribute("data-secuencia")] = mensajeEmpresa;
			txtEmpresa.className += " error";
		}
	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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
		}
	}
	return "";
}
function crearTabla(opcion) {
	var nCampos, contenido = "";
	if (opcion == "1") {
		contenido += "<ul id='ulTabs' class='tabs'><li class='tab-link current' data-tab='tab-1' onclick=\"mostrarTabs(this,'ulTabs');\" id='ctab1'>Producción</li>";
		contenido += "<li class='tab-link' data-tab='tab-2' onclick=\"mostrarTabs(this,'ulTabs');\" id='ctab2'>Horario</li>";
		contenido += "<li class='tab-link' data-tab='tab-3' onclick=\"mostrarTabs(this,'ulTabs');\" id='ctab3'>Monto Fijo</li></ul>";
		contenido += "<div id='tab-1' class='tab-content current'>";
		contenido += "<div id='divExportacion' style='padding-right:10px;padding-bottom:5px;'>";
		contenido += "	<a class='Icons fa-file-excel-o' id='btnExportar' style='font-size:15px;cursor:pointer;float:right;padding:0px 4px'></a>&nbsp";
		contenido += "	<a class='Icons fa-file-pdf-o' id='btnExportarPDF' style='font-size:15px;cursor:pointer;float:right;'></a>";
		contenido += "</div><div style='clear:both'></div>";
		nCampos = aCabecera.length;
		contenido += "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr>";
		var contenido2 = "<tr>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchos[j];
			contenido += "%'><span id='spn";
			contenido += j.toString();
			contenido += "' class='Enlace' data-orden='";
			contenido += j;//matrizIndice[j];
			contenido += "'>";
			contenido += aCabecera[j];
			contenido += "</span>";
			contenido += "</th>";
		}
		contenido += "</tr>";
		contenido += contenido2 + "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbReporte' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginas' colspan='";
		contenido += nCampos.toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		contenido += "</div>";

		contenido += "<div id='tab-2' class='tab-content'>";

		contenido += "<div style='padding-right:10px;padding-bottom:5px;'>";
		contenido += "	<a class='Icons fa-file-excel-o' id='btnExcelHorario' style='font-size:15px;cursor:pointer;float:right;padding:0px 4px'></a>";
		contenido += "	<a class='Icons fa-file-pdf-o' id='btnPDFHorario' style='font-size:15px;cursor:pointer;float:right;'></a>";
		contenido += "</div><div style='clear:both'></div>";

		nCampos = cabecerasHorario.length;
		contenido += "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchosHorario[j];
			if (j == 4 || j == 5 || j == 6 || j == 7) contenido += "%;text-align:right'><span id='spn";
			else contenido += "%'><span id='spn";
			contenido += j.toString();
			contenido += "' class='Enlace' data-orden='";
			contenido += j;//matrizIndice[j];
			contenido += "'>";
			contenido += cabecerasHorario[j];
			contenido += "</span>";
			if (j != 9) {
				contenido += "<input type='text' style='width:90%' class='hfiltro' tabindex='" + j + "'/> ";
			} else {
				contenido += "<select class='hfiltro' style='width:90%' tabindex='" + j + "'><option value=''>Todos</option><option value='True'>Sí</option><option value='False'>No</option></select>";
			}
			contenido += "</th>";
		}
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbReporteHorario' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td colspan='";
		contenido += nCampos.toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		contenido += "</div>";

		contenido += "<div id='tab-3' class='tab-content'>";

		contenido += "<div  style='padding-right:10px;padding-bottom:5px;'>";
		contenido += "	<a class='Icons fa-file-excel-o' id='btnExportarMtf' style='font-size:15px;cursor:pointer;float:right;padding:0px 4px'></a>&nbsp";
		contenido += "	<a class='Icons fa-file-pdf-o' id='btnExportarPDFMtf' style='font-size:15px;cursor:pointer;float:right;'></a>";
		contenido += "</div><div style='clear:both'></div>";

		nCampos = aCabeceraMtoFijo.length;
		contenido += "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchosMtoFijo[j];
			contenido += "%;'><span id='spn";
			contenido += j.toString();
			contenido += "' class='Enlace' data-orden='";
			contenido += j;//matrizIndice[j];
			contenido += "'>";
			contenido += aCabeceraMtoFijo[j];
			contenido += "</span>";
			//if (j != 9) {
			//	contenido += "<input type='text' style='width:90%' class='hfiltro' tabindex='" + j + "'/> ";
			//} else {
			//	contenido += "<select class='hfiltro' style='width:90%' tabindex='" + j + "'><option value=''>Todos</option><option value='True'>Sí</option><option value='False'>No</option></select>";
			//}
			contenido += "</th>";
		}
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbReporteMontoFijo' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td colspan='";
		contenido += nCampos.toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		contenido += "<div>";

	} else {
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
			switch (j) {
				case 2:
					contenido += "<select class='ComboD' name='cabeceraD'style='width:90%'id='ddlMedicoEspecialidad'></select>";
					break;
				default:
					contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
					break;
			}
			contenido += "</th>";
		}
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a></th>";
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbDetalleDoctor' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "</table>";
	}
	document.getElementById("divReporte").innerHTML = contenido;
}
function listarTodo(r) {
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.innerHTML = "Buscar";
	btnBuscar.onclick = function () {
		aHorario = [], matrizDetalle = [], aDetalle = [];
		var tipoVista = document.getElementsByName("tipoVista");
		if (tipoVista[0].checked) {
			var strDatos = "";
			var hdfMedico = document.getElementById("hdfMedico").value;
			var hdfEmpresa = document.getElementById("hdfEmpresa").value;
			var ddlPeriodo = document.getElementById("ddlPeriodo").value;
			var ddlProceso = document.getElementById("ddlProceso").value;

			strDatos = sucursalId + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + ddlPeriodo + "|" + ddlProceso + "|" + (tipoVista[0].checked ? "R" : "D") + "|" + cadenaEsp;
			var url = urlBase + "Control/ListarReporteProvision/?ss=" + ss;
			$.ajax(url, "post", listarTodo, strDatos);
			document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
			cadenaEsp = "";
		} else {
			if (validarBusqueda()) {
				var strDatos = "";
				var hdfMedico = document.getElementById("hdfMedico").value;
				var hdfEmpresa = document.getElementById("hdfEmpresa").value;
				var ddlPeriodo = document.getElementById("ddlPeriodo").value;
				var ddlProceso = document.getElementById("ddlProceso").value;

				strDatos = sucursalId + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + ddlPeriodo + "|" + ddlProceso + "|" + (tipoVista[0].checked ? "R" : "D") + "|" + cadenaEsp;
				var url = urlBase + "Control/ListarReporteProvision/?ss=" + ss;
				$.ajax(url, "post", listarTodo, strDatos);
				document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
				cadenaEsp = "";
			}
		}
	}
	if (r != "") {
		var data = r.split("¬");
		if (data.length > 3) {
			aMedicos = [], aDetalle = [], aTotales = [], aTipoAtencion = [], aTipoOrden = [], aConcepto = [], aMtoFijo = [];

			lstsucursal = data[0], lstPeriodo = data[1], lstFactura = data[2];
			var lstMedico = data[3];
			var lstDetalle = data[4];
			var lstTipoAtencion = data[5];
			var lstTipoOrden = data[6];
			var lstConcepto = data[7];
			var lstConceptoArticulo = data[9];
			var lstMtoFijo = data[10];
			lstHorario = data[8];
			crearTabla("1");
			crearMatriz(lstMedico, 1);
			crearMatriz(lstDetalle, 0);
			crearMatriz(lstTipoAtencion, 2);
			crearMatriz(lstTipoOrden, 3);
			crearMatriz(lstConcepto, 4);
			crearMatriz(lstConceptoArticulo, 6);
			crearMatriz(lstMtoFijo, 7);
			aFiltro = [];
			configurarFiltroHorario();
			exportarDetallado();
			if (lstHorario != "") {
				document.getElementById("ctab2").click();
			}
			if (lstDetalle == "" && lstHorario == "") {
				document.getElementById("ctab3").click();
			}
			mostrarMatrizMtoFijo();
			var cantidad = aDetalle.length;
			if (cantidad < 3000) {
				mostrarMatriz(true);
			}
			else {
				mostrarMatriz(false);
				abrirPopup('PopupAlerta');
			}
		} else {
			listaEmpresaMedicoEspecialidad = data[0].split("¯");;
			listaEmpresaMedico = data[1].split("¯");
			listaProvision = data[2].split("¯");
			crearTabla("2");
			llenarComboTabla(listaEmpresaMedicoEspecialidad, "ddlMedicoEspecialidad", "Todos");
			crearMatrizResumen();
			mostrarMatrizResumen();
			configurarFiltro();
			configurarExportarDetallado();
		}
	}
}
function crearMatriz(l, t) {
	var data = l != "" ? (l.split("¯")) : [];
	var n = data.length;
	var mtPres = 0;//14
	var mtPartMed = 0//20
	var mtPartCli = 0;//21
	var mtBono = 0;//15
	var mtIgv = 0;//22
	var mtTotal = 0;//23
	var idMed = "", idTipoAte = "", esNuevo = false, camposNuevos;
	var nfiltro = aFiltro.length, exito = true, regfiltro, c = 0;
	var tipoAjuste = "";//parametro nuevo agregado
	var contadortotal = 0;
	if (n > 0) {
		var campos, nCampos, x = 0;
		for (var i = 0; i < n; i++) {
			campos = data[i].split("¦");
			switch (t) {
				case 0:
					aDetalle[x] = [];
					idMed = campos[2];
					idTipoAte = campos[0];
					tipoAjuste = campos[26];
					if (data[i + 1] != undefined) {
						camposNuevos = data[i + 1].split("¦");
						if (idMed != camposNuevos[2] || (idMed == camposNuevos[2] && tipoAjuste != camposNuevos[26]) || (idMed == camposNuevos[2] && idTipoAte != camposNuevos[0])) {//parametro agregado cambio
							esNuevo = true;
						}
					}
					break;
				case 1:
					aMedicos[x] = [];
					break;
				case 2:
					aTipoAtencion[x] = [];
					break;
				case 3:
					aTipoOrden[x] = [];
					break;
				case 4:
					aConcepto[x] = [];
					break;
				case 5:
					if (nfiltro > 0) {
						for (var k = 0; k < nfiltro; k++) {
							regfiltro = aFiltro[i];
							exito = true;
							exito = exito && campos[regfiltro[0]].toLowerCase().indexOf(regfiltro[1].toLowerCase()) > -1;
							if (!exito) { break; }
						}
						if (exito) { aHorario[c] = []; }
					} else {
						aHorario[x] = [];
					}
					break;
				case 6:
					aConceptoArticulo[x] = [];
					break;
				case 7:
					aMtoFijo[x] = [];
					break;
			}
			nCampos = campos.length;
			for (var j = 0; j < nCampos; j++) {
				if (t != 5) {
					if (isNaN(campos[j]) || campos[j] == "" || j == 6) {
						switch (t) {
							case 0:
								aDetalle[x][j] = campos[j]
								break;
							case 1:
								aMedicos[x][j] = campos[j]
								break;
							case 2:
								aTipoAtencion[x][j] = campos[j]
								break;
							case 3:
								aTipoOrden[x][j] = campos[j]
								break;
							case 4:
								aConcepto[x][j] = campos[j]
								break;
							case 6:
								aConceptoArticulo[x][j] = campos[j]
								break;
							case 7:
								aMtoFijo[x][j] = campos[j];
								break;
						}
					}
					else {
						switch (t) {
							case 0:
								aDetalle[x][j] = campos[j] * 1;
								switch (j) {
									case 14:
										mtPres += campos[j] * 1;//14
										break;
									case 15:
										mtBono += campos[j] * 1;//15
										break;
									case 20:
										mtPartMed += campos[j] * 1;//20
										break;
									case 21:
										mtPartCli += campos[j] * 1;//21
										break;
									case 22:
										mtIgv += campos[j] * 1;//22
										break;
									case 23:
										mtTotal += campos[j] * 1;//23
										break;
								}
								break;
							case 1:
								aMedicos[x][j] = campos[j] * 1
								break;
							case 2:
								aTipoAtencion[x][j] = campos[j]
								break;
							case 3:
								aTipoOrden[x][j] = campos[j]
								break;
							case 4:
								aConcepto[x][j] = campos[j]
								break;
							case 6:
								aConceptoArticulo[x][j] = campos[j]
								break;
							case 7:
								aMtoFijo[x][j] = campos[j];
								break;
						}
					}
				} else {
					if (nfiltro > 0) {
						if (exito) {
							switch (j) {
								case 4:
								case 5:
								case 6:
								case 7:
									aHorario[c][j] = campos[j] * 1;
									break;
								default:
									aHorario[c][j] = campos[j];
							}
						}

					} else {
						switch (j) {
							case 4:
							case 5:
							case 6:
							case 7:
								aHorario[x][j] = campos[j] * 1;
								break;
							default:
								aHorario[x][j] = campos[j];
						}
					}
				}
			}
			if ((esNuevo && t == 0) || (t == 0 && i == (n - 1))) {
				var oMed = buscarMedicoLista(idMed, campos[4]);
				aTotales.push([oMed.id, idTipoAte, oMed.Nombre, oMed.Especialidad, mtPres, mtPartMed, mtPartCli, mtBono, mtIgv, mtTotal, campos[26], contadortotal]);//parametro agregado 
				contadortotal++;
				esNuevo = false;
				mtPres = 0;//14
				mtBono = 0;//15
				mtPartMed = 0;//20
				mtPartCli = 0;//21
				mtIgv = 0;//22
				mtTotal = 0;//23
			}
			if (nfiltro > 0 && exito) { c++; }
			x++;
		}
	}
}

function buscarMedicoLista(id, es) {
	var n = aMedicos.length, registro, oMedico = {};
	for (var i = 0; i < n; i++) {
		registro = aMedicos[i];
		if (registro[0] == id && registro[2] == es) {
			oMedico.id = registro[0];
			oMedico.Nombre = registro[1];
			oMedico.Especialidad = registro[3];
			break;
		}
	}
	return oMedico
}

function buscarMedico(id, tipo, ta, pos) {
	var lstCabeceta = [];
	var n = aTotales.length, registro, rpta = [];
	for (var i = 0; i < n; i++) {
		registro = aTotales[i];
		if (registro[0] == id && registro[1] == tipo && registro[10] == ta, registro[11] == pos) {// parametro quitado
			rpta = registro;// parametro comentado
			break;
		}
	}
	return rpta;
}

function mostrarMatriz(mostrar) {
	var n = aDetalle.length,
	registro, nCampos, contenido = "";
	var idMed = "", idTipoAte = "", tipoAjuste = "", esNuevo = false, regSiguiente;
	var idServicio = "", esQEspecialidad = false, contadortotal = 0;
	var idEspecialidad = "";
	var codPres = "";
	var esNuevoTipoAte = false;
	var cabecera = "";
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			registro = aDetalle[i];
			nCampos = registro.length;
			idMed = registro[2] == undefined ? -1 : registro[2];
			idTipoAte = registro[0] == undefined ? -1 : registro[0];
			tipoAjuste = registro[26] == undefined ? -1 : registro[26];
			idServicio = registro[1] == undefined ? -1 : registro[1];
			idEspecialidad = registro[4] == undefined ? -1 : registro[4];
			codPres = registro[3] == undefined ? -1 : registro[3];
			if (i == 0 || esNuevoTipoAte == true) {
				cabecera = registro[6] + "¦" + registro[2] + "¦" + registro[4] + "¦" + registro[26] + "¦" + registro[0] + "¦";
				cabecera += registro[27] + "¦" + registro[28] + "¦" + registro[29] + "¦" + registro[30] + " ¦" + registro[31];
				contenido += obtenerCabeceraMedico(cabecera);
				contadortotal++;
				contenido += "<tr><td colspan='2'>Tipo Ord. Ate</td><td colspan='12'>";
				contenido += buscarDescription(1, registro[1]);
				contenido += "</td></tr>"
				contenido += "<tr><td colspan='2'>Concepto</td><td colspan='12'>";
				contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
				contenido += "</td></tr>";
				esNuevoTipoAte = false;
			}
			if (esNuevo) {//para cambio
				contenido += "<tr><td colspan='2'>Tipo Ord. Ate</td><td colspan='12'>";
				contenido += buscarDescription(1, regSiguiente[1]);
				contenido += "</td></tr>"
				contenido += "<tr><td colspan='2'>Concepto</td><td colspan='12'>";
				contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
				contenido += "</td></tr>";
				esNuevo = false;
			}
			regSiguiente = aDetalle[i + 1];
			if (regSiguiente != undefined) {
				if (idMed != regSiguiente[2]) {
					esNuevoTipoAte = true;
				}
				else if (idEspecialidad != regSiguiente[4]) {
					esNuevoTipoAte = true;
				}
				else if (tipoAjuste != regSiguiente[26]) {
					esNuevoTipoAte = true;
				}
				else if (idTipoAte != regSiguiente[0]) {
					esNuevoTipoAte = true;
				}
				else if (idServicio != regSiguiente[1]) {
					esNuevo = true;
				}
				else if (codPres != regSiguiente[3]) {
					esNuevo = true;
				}
				else {
					esNuevo = false;
				}
			}
			contenido += "<tr>";
			for (var j = 5; j < nCampos; j++) {
				switch (j) {
					case 5:
						contenido += "<td >";
						contenido += registro[5];
						contenido += "</td>";
						break;
					case 6:
						contenido += "<td style='mso-number-format:\"\@\"'>";
						contenido += registro[6];
						contenido += "</td>";
						break;
					case 7:
						contenido += "<td>";
						contenido += registro[7];
						contenido += "</td>";
						break;
					case 8:
						contenido += "<td>";
						contenido += registro[8] == 0 ? "" : registro[8];
						contenido += "</td>";
						break;
					case 9:
						contenido += "<td>";
						contenido += registro[9];
						contenido += "</td>";
						break;
					case 10:
						contenido += "<td>";
						contenido += registro[11];
						contenido += "</td>";
						break;
					case 11:
						contenido += "<td>";
						contenido += registro[12];
						contenido += "</td>";
						break;
					case 12:
						contenido += "<td style='text-align:right'>";
						contenido += registro[13].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 13:
						contenido += "<td style='text-align:right'>";
						contenido += registro[14].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 14:
						contenido += "<td style='text-align:right'>";
						contenido += registro[20].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 15:
						contenido += "<td style='text-align:right'>";
						contenido += registro[21].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 16:
						contenido += "<td style='text-align:right'>";
						contenido += registro[15].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 17:
						//contenido += "<td style='text-align:right;background:green;display:none'>";
						//contenido += registro[22].toFixed(2);
						//contenido += "</td>";
						break;
					case 18:
						contenido += "<td style='text-align:right'>";
						contenido += registro[23].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
						contenido += "</td>";
						break;
					case 19:
						contenido += "<td>";
						contenido += registro[24];
						contenido += "</td>";
						break;
				}
			}
			contenido += "</tr>";
			if (esNuevoTipoAte == true || (i == (n - 1))) {
				contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='5'>SUB TOTAL ";
				contenido += buscarDescription(0, registro[4]);
				contenido += "</td><td style='text-align:right'>" + (registro[27] != undefined ? ((registro[27] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
				contenido += "</td><td style='text-align:right'>" + (registro[28] != undefined ? ((registro[28] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
				contenido += "</td><td style='text-align:right'>" + (registro[29] != undefined ? ((registro[29] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
				contenido += "</td><td style='text-align:right'>" + (registro[30] != undefined ? ((registro[30] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
				contenido += "</td>";
				contenido += "<td style='text-align:right'>" + (registro[31] != undefined ? ((registro[31] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td><td></td></tr>";
			}
		}
		contenido += obtenerTotales();
		excelExportar = contenido;
	} else {
		contenido += "<tr><td colspan='15' style='text-align:center'>No hay registros</td></tr>";
	}
	if (mostrar) {
		document.getElementById("tbReporte").innerHTML = contenido;
	}

}

function buscarDescription(t, id, opcion) {
	var n, registro, des = "";
	switch (t) {
		case 0:
			n = aTipoAtencion.length;
			break;
		case 1:
			n = aTipoOrden.length;
			break;
		case 2:
			if (opcion == "A") n = aConceptoArticulo.length;
			else n = aConcepto.length;
			break;
	}
	for (var i = 0; i < n; i++) {
		switch (t) {
			case 0:
				registro = aTipoAtencion[i];
				break;
			case 1:
				registro = aTipoOrden[i];
				break;
			case 2:
				registro = (opcion == "A" ? aConceptoArticulo[i] : aConcepto[i]);
				break;
		}
		if (registro[0] == id) {
			des = registro[1];
			break;
		}
	}
	return des;
}

function obtenerCabeceraMedico(data) {
	var registro = data.split('¦');
	var contenido = ""
	var oMed = buscarMedicoLista(registro[1], registro[2]);//oMed.Nombre, oMed.Especialidad
	if (registro.length > 0) {
		contenido += "<tr><td style='font-weight:bold;'>Médico</td><td style='font-weight:bold'>" + (oMed.id == undefined ? "" : oMed.id);
		contenido += "</td><td colspan='3' style='font-weight:bold'>" + (oMed.Nombre == undefined ? "" : oMed.Nombre) + "</td><td colspan='9'>Especialidad <b>" + (oMed.Especialidad == undefined ? "" : oMed.Especialidad) + "</b></td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold;border-bottom:1px solid black'>Tipo Registro</td><td colspan='6' style='font-weight:bold;border-bottom:1px solid black'>" + registro[3] + "</td><td colspan='6'></td></tr>";//parametro nuevo
		contenido += "<tr><td colspan='2'>Tipo Atención</td><td colspan='6'>" + buscarDescription(0, registro[4]) + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((registro[5] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='border-bottom: 4px double black;text-align:right'>" + ((registro[6] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='border-bottom: 4px double black;text-align:right'>" + ((registro[7] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='border-bottom: 4px double black;text-align:right'>" + ((registro[8] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((registro[9] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td><td></td></tr>";
		contenido += "<tr><td colspan='8'></td>";

		contenido += "<td style='text-align:right'>" + ((registro[5] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='text-align:right'>" + ((registro[6] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='text-align:right'>" + ((registro[7] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
		contenido += "</td><td style='text-align:right'>" + ((registro[8] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='text-align:right'>" + ((registro[9] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td><td></td></tr>";
		contenido += "<tr><td colspan='14'>&nbsp</td></tr>";
	}
	return contenido;
}

function obtenerTotales(p) {
	var n = aTotales.length, registro, contenido = "";
	var mtPres = 0;//14
	var mtPartMed = 0//20
	var mtPartCli = 0;//21
	var mtBono = 0;//15
	var mtIgv = 0;//22
	var mtTotal = 0;//23
	for (var i = 0; i < n; i++) {
		registro = aTotales[i];

		mtPres += registro[4];//14
		mtPartMed += registro[5]//20
		mtPartCli += registro[6];//21
		mtBono += registro[7];//15
		mtIgv += registro[8];//22
		mtTotal += registro[9];//23
	}
	contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='5'>TOTAL GENERAL ";
	contenido += "</td><td style='text-align:right'>" + (mtPres.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td><td style='text-align:right'>" + (mtPartMed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td><td style='text-align:right'>" + (mtPartCli.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
	contenido += "</td><td style='text-align:right'>" + (mtBono.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
	contenido += "<td style='text-align:right'>" + (mtTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td><td></td></tr>";
	return (p == undefined ? contenido : { t: (mtPartMed + mtBono), r: mtIgv });
}

function llenarCombo(lista, nombreCombo, titulo, cabecera) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	if (cabecera == undefined) {
		contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
	}
	if (nombreCombo != "ddlProceso") {
		for (var x = 0; x < n; x++) {
			campos = lista[x].split("¦");
			contenido += "<option value='" + campos[0] + "'>" + campos[2] + "-" + ((campos[3] * 1) < 10 ? ("0" + campos[3]) : campos[3]) + "</option>";
		}
	}
	else {
		var ddlPeriodo = document.getElementById("ddlPeriodo").value;
		for (var x = 0; x < n; x++) {
			campos = lista[x].split("¦");
			if (campos[2] == ddlPeriodo) {
				contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
			}
		}
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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

function crearMatrizResumen(opcion) {
	totales.mtImporte = 0,
	totales.mtBonificacion = 0,
	totales.mtDescuento = 0,
	totales.mtAjuste = 0,
	totales.mtTotal = 0;

	var nRegistros;
	var nCampos;
	var campos;
	var x = 0;

	a = 0;
	b = 0;
	c = 0;
	d = 0;
	var valor;
	nRegistros = listaProvision.length;
	matrizDetalle = [];
	//matrizAnios = [];
	var matrizConteoConfiguracion = [0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i < nRegistros; i++) {
		campos = listaProvision[i].split("¦");
		matrizDetalle[x] = [];
		nCampos = campos.length;
		for (var j = 0; j < (nCampos + 1) ; j++) {
			if ((isNaN(campos[j]) || campos[j] == "" || j == 7) && j != 9) {
				matrizDetalle[x][j] = campos[j];
			}
			else {
				matrizDetalle[x][j] = campos[j] * 1;
			}

		}
		totales.mtImporte = (totales.mtImporte + (campos[2] * 1))
		totales.mtBonificacion = (totales.mtBonificacion + (campos[3] * 1)),
		totales.mtDescuento = (totales.mtDescuento + (campos[4] * 1)),
		totales.mtAjuste = (totales.mtAjuste + (campos[5] * 1)),
		totales.mtTotal = (totales.mtTotal + (campos[6] * 1));
		x++;
	}
}
function mostrarMatrizResumen() {

	var contenido = "";
	Campoeliminar = "";
	var n = matrizDetalle.length;
	var nCabeceras = cabecerasDetalle.length;
	var ConfiguracionActual = 0;
	var variableActual = -1;
	var matrizSumatoria = {};
	if (n > 0) {
		var nCampos = cabecerasDetalle.length;

		for (var i = 0; i < matrizDetalle.length; i++) {
			if (i < n) {
				if (matrizDetalle[i][9] == 0) {
					variableActual = i;
					matrizSumatoria = {}
					var contenido2 = "";
					if (matrizDetalle[i + 1] != undefined && (matrizDetalle[i][0] == matrizDetalle[i + 1][0]) && matrizDetalle[i + 1][9] == 0) {
						matrizSumatoria[matrizDetalle[i][0].toString() + "0"] = 0;
						matrizSumatoria[matrizDetalle[i][0].toString() + "1"] = 0;
						matrizSumatoria[matrizDetalle[i][0].toString() + "2"] = 0;
						matrizSumatoria[matrizDetalle[i][0].toString() + "3"] = 0;
						matrizSumatoria[matrizDetalle[i][0].toString() + "4"] = 0;
						contenido2 = "";
						for (w = i; w < matrizDetalle.length; w++) {
							contenido2 += "<tr name='ES";
							contenido2 += matrizDetalle[w][9];
							contenido2 += matrizDetalle[w][0];
							contenido2 += "' class='FilaDatos' style='display:none'>";
							matrizSumatoria[matrizDetalle[w][0].toString() + "0"] = matrizSumatoria[matrizDetalle[w][0].toString() + "0"] + matrizDetalle[w][2];
							matrizSumatoria[matrizDetalle[w][0].toString() + "1"] = matrizSumatoria[matrizDetalle[w][0].toString() + "1"] + matrizDetalle[w][3];
							matrizSumatoria[matrizDetalle[w][0].toString() + "2"] = matrizSumatoria[matrizDetalle[w][0].toString() + "2"] + matrizDetalle[w][4];
							matrizSumatoria[matrizDetalle[w][0].toString() + "3"] = matrizSumatoria[matrizDetalle[w][0].toString() + "3"] + matrizDetalle[w][5];
							matrizSumatoria[matrizDetalle[w][0].toString() + "4"] = matrizSumatoria[matrizDetalle[w][0].toString() + "4"] + matrizDetalle[w][6];
							for (var j = 0; j < nCampos ; j++) {
								switch (j) {
									case 0:
										contenido2 += "<td style='text-align:center'>";
										break;
									case 2:
										contenido2 += "<td>";
										for (var z = 0; z < listaEmpresaMedicoEspecialidad.length; z++) {
											valor = listaEmpresaMedicoEspecialidad[z].split("¦");
											if ((valor[0] * 1) == (matrizDetalle[w][8] * 1)) {
												contenido2 += valor[1];
												break;
											}
										}
										break
									case 1:
										contenido2 += "<td>";
										break;
									default:
										contenido2 += "<td style='text-align:right'>";
										contenido2 += matrizDetalle[w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
										break;
								}
								contenido2 += "</td>";
							}
							contenido2 += "<td style='text-align:center' colspan='3'><span"; // aqui
							contenido2 += (matrizDetalle[w][7] != "P" ? "" : "");
							if (matrizDetalle[w][7] == "P") {
								contenido2 += "></span></td>";
								contenido2 += "</tr>";
							}
							else {
								contenido2 += "></span></td>";
								contenido2 += "</tr>";
							}

							i = w;
							if (matrizDetalle[w + 1] == undefined) {
								break;
							}
							else if (matrizDetalle[w][0] != matrizDetalle[w + 1][0]) {
								break;
							}
						}
						variableActual = i;
						var prueba = matrizDetalle[variableActual][0];
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td></td>";
						contenido += "<td>";
						contenido += "<span class='Icons fa-plus-square' onclick='expandir(\"ES\",\"";
						contenido += matrizDetalle[variableActual][9];
						contenido += matrizDetalle[variableActual][0];
						contenido += "\",this.id)' id='ME";
						contenido += matrizDetalle[variableActual][9];
						contenido += matrizDetalle[variableActual][0];
						contenido += "'></span>&nbsp;<span class='select' data-select='M-" + matrizDetalle[variableActual][0] + "' data-es='P'>";
						contenido += matrizDetalle[variableActual][1];
						contenido += "</span></td><td></td>";
						contenido += "<td style='text-align:right'>";
						//console.log(window[(matrizDetalle[variableActual][0].toString() + "0").toString()].toLocaleString('en-US', { minimumFractionDigits: 2 }));
						contenido += matrizSumatoria[(matrizDetalle[variableActual][0].toString() + "0").toString()].toLocaleString('en-US', { minimumFractionDigits: 2 });
						contenido += "</td>";
						contenido += "<td style='text-align:right'>";
						contenido += matrizSumatoria[matrizDetalle[variableActual][0].toString() + "1"].toLocaleString('en-US', { minimumFractionDigits: 2 });
						contenido += "</td>";
						contenido += "<td style='text-align:right'>";
						contenido += matrizSumatoria[matrizDetalle[variableActual][0].toString() + "2"].toLocaleString('en-US', { minimumFractionDigits: 2 });
						contenido += "</td>";
						contenido += "<td style='text-align:right'>";
						contenido += matrizSumatoria[matrizDetalle[variableActual][0].toString() + "3"].toLocaleString('en-US', { minimumFractionDigits: 2 });
						contenido += "</td>";
						contenido += "<td style='text-align:right'>";
						contenido += matrizSumatoria[matrizDetalle[variableActual][0].toString() + "4"].toLocaleString('en-US', { minimumFractionDigits: 2 });
						contenido += "</td>";
						contenido += "<td colspan='3'></td>";
						contenido += "</tr>";
						contenido += contenido2;
					}
					else {
						contenido += "<tr class='FilaDatos'>";
						//contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' id='rdn";
						//contenido += i;
						//contenido += "' data-check='";
						//contenido += matrizDetalle[i][0];
						//contenido += "¦";
						//contenido += matrizDetalle[i][15];
						//contenido += "¦";
						//contenido += matrizDetalle[i][13];
						//contenido += "'/></td>";
						for (var j = 0; j < nCampos ; j++) {
							switch (j) {
								case 0:
									contenido += "<td>";
									break;
								case 2:
									contenido += "<td>";
									for (var w = 0; w < listaEmpresaMedicoEspecialidad.length; w++) {
										valor = listaEmpresaMedicoEspecialidad[w].split("¦");
										if ((valor[0] * 1) == (matrizDetalle[i][8] * 1)) {
											contenido += valor[1];
											break;
										}
									}
									break
								case 1:
									contenido += "<td>";
									contenido += "<span class='select' data-select='M-" + matrizDetalle[i][0] + "' data-es='" + matrizDetalle[i][8] + "'>" + matrizDetalle[i][1] + "<span>";
									break;
									//case 8:
									//	contenido += "<td style='text-align:center'>";
									//	if (matrizDetalle[i][7] == "C") contenido += (matrizDetalle[i][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarObservadas(" + i + ")'>SI</span>");
									//	else contenido += (matrizDetalle[i][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarError(" + i + ")'>SI</span>");
									//	break;
									//case 9:
									//	contenido += "<td>";
									//	contenido += (matrizDetalle[i][7] == "P" ? "PENDIENTE" : (matrizDetalle[i][7] == "A" ? "AUTORIZADO" : (matrizDetalle[i][7] == "C" ? "CALCULADO" : "PROVISIONADO")));
									//	break;
								default:
									contenido += "<td style='text-align:right'>";
									contenido += matrizDetalle[i][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
									break;
							}
							contenido += "</td>";
						}
						contenido += "<td style='text-align:center' colspan='3'><span";//aqui
						contenido += (matrizDetalle[i][7] != "P" ? "" : "");
						if (matrizDetalle[i][7] == "P") {
							contenido += "></span></td>";
							contenido += "</tr>";
						}
						else {
							contenido += "></span></td>";
							contenido += "</tr>";
						}
					}
				}
					//para empresa
				else {
					var valor;
					variableActual = i;
					var contenido3 = "";
					matrizSumatoria = {}
					matrizSumatoria[matrizDetalle[variableActual][0].toString() + "0"] = 0;
					matrizSumatoria[matrizDetalle[variableActual][0].toString() + "1"] = 0;
					matrizSumatoria[matrizDetalle[variableActual][0].toString() + "2"] = 0;
					matrizSumatoria[matrizDetalle[variableActual][0].toString() + "3"] = 0;
					matrizSumatoria[matrizDetalle[variableActual][0].toString() + "4"] = 0;
					var valor1 = 0;
					var valor2 = 0;
					var valor3 = 0;
					var valor4 = 0;
					var valor5 = 0;
					for (var x = i; x < matrizDetalle.length; x++) {
						matrizSumatoria[matrizDetalle[x][0].toString() + "0"] = 0;
						matrizSumatoria[matrizDetalle[x][0].toString() + "1"] = 0;
						matrizSumatoria[matrizDetalle[x][0].toString() + "2"] = 0;
						matrizSumatoria[matrizDetalle[x][0].toString() + "3"] = 0;
						matrizSumatoria[matrizDetalle[x][0].toString() + "4"] = 0;
						var contenido2 = "";
						if (matrizDetalle[x + 1] != undefined && matrizDetalle[x][0] == matrizDetalle[x + 1][0] && matrizDetalle[x][9] == matrizDetalle[x + 1][9]) {
							for (var y = x; y < matrizDetalle.length; y++) {
								contenido2 += "<tr name='ES";
								contenido2 += matrizDetalle[y][9];
								contenido2 += matrizDetalle[y][0];
								contenido2 += "' class='FilaDatos ES";
								contenido2 += matrizDetalle[y][9];
								contenido2 += "' style='display:none'>";
								contenido2 += "<td></td>";
								matrizSumatoria[matrizDetalle[y][0].toString() + "0"] = matrizSumatoria[matrizDetalle[y][0].toString() + "0"] + matrizDetalle[y][2];
								matrizSumatoria[matrizDetalle[y][0].toString() + "1"] = matrizSumatoria[matrizDetalle[y][0].toString() + "1"] + matrizDetalle[y][3];
								matrizSumatoria[matrizDetalle[y][0].toString() + "2"] = matrizSumatoria[matrizDetalle[y][0].toString() + "2"] + matrizDetalle[y][4];
								matrizSumatoria[matrizDetalle[y][0].toString() + "3"] = matrizSumatoria[matrizDetalle[y][0].toString() + "3"] + matrizDetalle[y][5];
								matrizSumatoria[matrizDetalle[y][0].toString() + "4"] = matrizSumatoria[matrizDetalle[y][0].toString() + "4"] + matrizDetalle[y][6];
								for (var h = 1; h < nCampos; h++) {
									switch (h) {
										case 0, 1:
											contenido2 += "<td>";
											break;
										case 2:
											contenido2 += "<td>";
											for (var w = 0; w < listaEmpresaMedicoEspecialidad.length; w++) {
												valor = listaEmpresaMedicoEspecialidad[w].split("¦");
												if ((valor[0] * 1) == (matrizDetalle[y][8] * 1)) {
													contenido2 += valor[1];
													break;
												}
											}
											break;
										case 7:
											contenido2 += "<td style='text-align:right'>";
											contenido2 += matrizDetalle[y][6].toLocaleString('en-US', { minimumFractionDigits: 2 });
											break;
										default:
											contenido2 += "<td style='text-align:right'>";
											contenido2 += matrizDetalle[y][h - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
											break;
									}
									contenido2 += "</td>";
								}
								contenido2 += "<td style='text-align:center' colspan='3'><span ";//aqui
								contenido2 += (matrizDetalle[y][7] != "P" ? "" : "");
								if (matrizDetalle[y][7] == "P") {
									contenido2 += "></span></td>";
									contenido2 += "</tr>";
								}
								else {
									contenido2 += "></span></td>";
									contenido2 += "</tr>";
								}
								x = y;
								if (matrizDetalle[y + 1] == undefined) {
									break;
								}
								else if (matrizDetalle[y][0] != matrizDetalle[y + 1][0]) {
									break;
								}
							}
							contenido3 += "<tr name='ME";
							contenido3 += matrizDetalle[x][9];
							contenido3 += "' style='display:none' data-icono='";
							contenido3 += matrizDetalle[x][9];
							contenido3 += matrizDetalle[x][0];
							contenido3 += "'><td></td><td style='text-align:left;color:#00a850' colspan='2'>";
							contenido3 += "<span class='Icons fa-plus-square' onclick='expandir(\"ES\",\"";
							contenido3 += matrizDetalle[x][9];
							contenido3 += matrizDetalle[x][0];
							contenido3 += "\",this.id)' id='ME";
							contenido3 += matrizDetalle[x][9];
							contenido3 += matrizDetalle[x][0];
							contenido3 += "'></span>&nbsp;<span data-select='M-" + matrizDetalle[x][0] + "' data-es='E' data-e='" + matrizDetalle[x][9] + "'>";
							contenido3 += matrizDetalle[x][1];
							contenido3 += "</span></td><td style='text-align:right'>";
							contenido3 += matrizSumatoria[matrizDetalle[x][0].toString() + "0"].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizSumatoria[matrizDetalle[x][0].toString() + "1"].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizSumatoria[matrizDetalle[x][0].toString() + "2"].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizSumatoria[matrizDetalle[x][0].toString() + "3"].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizSumatoria[matrizDetalle[x][0].toString() + "4"].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td><td colspan='3'></td>";
							contenido3 += "</tr>";
							contenido3 += contenido2;
							valor1 = valor1 + matrizSumatoria[matrizDetalle[x][0].toString() + "0"];
							valor2 = valor2 + matrizSumatoria[matrizDetalle[x][0].toString() + "1"];
							valor3 = valor3 + matrizSumatoria[matrizDetalle[x][0].toString() + "2"];
							valor4 = valor4 + matrizSumatoria[matrizDetalle[x][0].toString() + "3"];
							valor5 = valor5 + matrizSumatoria[matrizDetalle[x][0].toString() + "4"];
							i = x;
							if (matrizDetalle[x + 1] == undefined) {
								break;
							}
							else if (matrizDetalle[x][9] != matrizDetalle[x + 1][9]) {
								break;
							}
						}
						else {
							contenido3 += "<tr name='ME";
							contenido3 += matrizDetalle[x][9];
							contenido3 += "' style='display:none' data-icono='";
							contenido3 += matrizDetalle[x][9];
							contenido3 += matrizDetalle[x][0];
							contenido3 += "'>";
							contenido3 += "<td></td><span class='Icons fa-plus-square' style='display:none' id='ME";
							contenido3 += matrizDetalle[x][9];
							contenido3 += matrizDetalle[x][0];
							contenido3 += "'></span></span><td style='text-align:left;color:#00a850'><span data-select='M-" + matrizDetalle[x][0] + "' data-es='" + matrizDetalle[x][8] + "' data-e='" + matrizDetalle[x][9] + "'>";
							contenido3 += matrizDetalle[x][1];
							contenido3 += "</span></td>";
							contenido3 += "<td>";
							for (var w = 0; w < listaEmpresaMedicoEspecialidad.length; w++) {
								var valoxr = listaEmpresaMedicoEspecialidad[w].split("¦");
								if ((valoxr[0] * 1) == (matrizDetalle[x][8] * 1)) {
									contenido3 += valoxr[1];
									break;
								}
							}
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizDetalle[x][2].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizDetalle[x][3].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizDetalle[x][4].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizDetalle[x][5].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:right'>";
							contenido3 += matrizDetalle[x][6].toLocaleString('en-US', { minimumFractionDigits: 2 });
							contenido3 += "</td>";
							contenido3 += "<td style='text-align:center' colspan='3'>";//aqui
							contenido3 += "</td>";
							contenido3 += "</tr>";

							valor1 = valor1 + matrizDetalle[x][2];
							valor2 = valor2 + matrizDetalle[x][3];
							valor3 = valor3 + matrizDetalle[x][4];
							valor4 = valor4 + matrizDetalle[x][5];
							valor5 = valor5 + matrizDetalle[x][6];
							i = x;
							if (matrizDetalle[x + 1] == undefined) {
								break;
							}
							else if (matrizDetalle[x][9] != matrizDetalle[x + 1][9]) {
								break;
							}
						}
					}
					contenido += "<tr><td style='text-align:left;font-weight:bold' colspan='3'>";
					contenido += "<span class='Icons fa-plus-square' onclick='expandir(\"ME\",\"";
					contenido += matrizDetalle[variableActual][9];
					contenido += "\",this.id)' id='EX";
					contenido += matrizDetalle[variableActual][9];
					contenido += "'></span>&nbsp;<span class='select' data-select='E-" + matrizDetalle[variableActual][9] + "'>";//////////////////////
					for (var w = 0; w < listaEmpresaMedico.length; w++) {
						valor = listaEmpresaMedico[w].split("¦");
						if ((valor[0] * 1) == (matrizDetalle[variableActual][9] * 1)) {
							contenido += valor[1];
							break;
						}
					}
					contenido += "</span></td>";
					contenido += "<td style='text-align:right'>";
					contenido += valor1.toLocaleString('en-US', { minimumFractionDigits: 2 });
					contenido += "</td>";
					contenido += "<td style='text-align:right'>";
					contenido += valor2.toLocaleString('en-US', { minimumFractionDigits: 2 });
					contenido += "</td>";
					contenido += "<td style='text-align:right'>";
					contenido += valor3.toLocaleString('en-US', { minimumFractionDigits: 2 });
					contenido += "</td>";
					contenido += "<td style='text-align:right'>";
					contenido += valor4.toLocaleString('en-US', { minimumFractionDigits: 2 });
					contenido += "</td>";
					contenido += "<td style='text-align:right'>";
					contenido += valor5.toLocaleString('en-US', { minimumFractionDigits: 2 });
					contenido += "</td>";
					contenido += "<td colspan=3></td></tr>";
					contenido += contenido3;
				}
			}
			else break;
		}
		contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='3'>Totales</td>";
		contenido += "<td style='text-align:right'>" + totales.mtImporte.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + totales.mtBonificacion.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + totales.mtDescuento.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + totales.mtAjuste.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>";
		contenido += "<td style='text-align:right'>" + totales.mtTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td><td colspan='3'></td></tr>";
	}
	else {
		var nCabeceras = cabecerasDetalle.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	excelExportarDetalle = contenido;
	document.getElementById("tbDetalleDoctor").innerHTML = contenido;
	configurarSeleccion();

}
function expandir(id, ob, control) {
	var control = document.getElementById(control);
	if (id == "ES") {
		var lista = document.getElementsByName(id + ob);
		for (var x = 0; x < lista.length; x++) {
			if (lista[x].style.display == "none") lista[x].style.display = "";
			else lista[x].style.display = "none";
		}
	}
	else {
		if (control.className.indexOf("plus") > -1) {
			var lista = document.getElementsByName(id + ob);
			for (var x = 0; x < lista.length; x++) {
				lista[x].style.display = "";
			}
		}
		else {
			var lista2 = document.getElementsByName(id + ob);
			for (var x = 0; x < lista2.length; x++) {
				lista2[x].style.display = "none";
				document.getElementById("ME" + lista2[x].getAttribute("data-icono")).className = "Icons fa-plus-square";
			}
			var lista = document.getElementsByClassName("ES" + ob);
			for (var x = 0; x < lista.length; x++) {
				lista[x].style.display = "none";
			}
		}
	}

	if (control.className.indexOf("minus") > -1) control.className = control.className.replace("minus", "plus");
	else control.className = control.className.replace("plus", "minus");
}
function configurarFiltro() {

	var textos = document.getElementsByClassName("TextoD");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar(false);
		}
	}

	var combos = document.getElementsByClassName("ComboD");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar(false);
		}
	}
}
function filtrar(opcion) {

	totales.mtImporte = 0,
	totales.mtBonificacion = 0,
	totales.mtDescuento = 0,
	totales.mtAjuste = 0,
	totales.mtTotal = 0;
	var cabeceras = document.getElementsByName("cabeceraD");
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	matrizDetalle = [];
	var nRegistros = listaProvision.length;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado = [];
	var x = 0;
	var nFiltrados = matrizIndiceDetalle.length

	for (var i = 0; i < nRegistros; i++) {
		campos = listaProvision[i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		if (campos[9] == "0") {
			campoFiltrado.push("");
		}
		else {
			for (var z = 0; z < listaEmpresaMedico.length; z++) {
				valor = listaEmpresaMedico[z].split("¦");
				if ((valor[0] * 1) == (campos[9] * 1)) {
					campoFiltrado.push(valor[1]);
					break;
				}
			}
		}
		for (var k = 1; k < nFiltrados; k++) {
			campoFiltrado.push(campos[matrizIndiceDetalle[k]]);
		}

		for (var j = 0 ; j < nCabeceras; j++) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "TextoD") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j].toLowerCase() == cabecera.value.toLowerCase());
			if (!exito) break;
		}


		if (exito) {
			matrizDetalle[x] = [];

			for (j = 0; j < (nCampos + 1) ; j++) {
				if ((isNaN(campos[j]) || campos[j] == "" || j == 7)) {
					matrizDetalle[x][j] = campos[j];
				}
				else {
					matrizDetalle[x][j] = campos[j] * 1;
				}
			}

			totales.mtImporte = (totales.mtImporte + (campos[2] * 1))
			totales.mtBonificacion = (totales.mtBonificacion + (campos[3] * 1)),
			totales.mtDescuento = (totales.mtDescuento + (campos[4] * 1)),
			totales.mtAjuste = (totales.mtAjuste + (campos[5] * 1)),
			totales.mtTotal = (totales.mtTotal + (campos[6] * 1));
			x++;
		}
	}

	mostrarMatrizResumen();
}
function exportarDetallado() {
	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = btnAceptarAlerta.onclick = function () {
		if (aDetalle.length > 0) {
			var sucursal = lstsucursal.split("¦");
			var factura = lstFactura.split("¦");
			var Periodo = lstPeriodo.split("¦")
			var contenido = "<html><head><meta charset='utf-8'/></head><table style='width:100%'><tr><td colspan='15' style='text-align:center'>LIQUIDACIÓN-SERVICIOS MEDICOS<br/>PERIODO " + Periodo[2] + "-" + Periodo[3] + "</td></tr>";
			contenido += "<tr><td colspan='2'>Compañia:</td><td colspan='13'>" + sucursal[2] + "</td></tr>";
			contenido += "<tr style='boder-bottom:1px solid black'><td colspan='2'>Sucursal: </td><td colspan='13'>" + sucursal[1] + "</td></tr></table>";

			contenido += "<table style='width:100%'><tr><td colspan='2'>N° Liquidacíon: </td><td colspan='13'>'168688</td></tr>";
			contenido += "<tr><td colspan='2'>Factura a Empresa: </td><td colspan='13'>" + factura[1] + "</td></tr>";
			contenido += "<tr><td colspan='2'>RUC: </td><td colspan='13' style='mso-number-format:\"\@\"'>" + factura[2] + "</td></tr></table>";

			contenido += "<table><tr>";
			var n = aCabecera.length;
			for (var i = 0; i < n; i++) {
				contenido += "<td>";
				contenido += aCabecera[i];
				contenido += "</td>";
			}
			contenido += "</tr>";
			contenido += excelExportar;
			contenido += "</table></html>";


			var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
			this.download = "ReporteProduccion.xls";
			this.href = window.URL.createObjectURL(formBlob);
			if (this.id == "btnAceptarAlerta") {
				abrirPopup('PopupAlerta');
			}
		}
	}
	var btnExportarPDF = document.getElementById("btnExportarPDF");
	btnExportarPDF.onclick = function () {
		CreacionPDFGeneral()



		//if (aDetalle.length > 0) {
		//	var tbody = document.getElementById("tbReporte");
		//	if (tbody != null) {
		//		var sucursal = lstsucursal.split("¦");
		//		var factura = lstFactura.split("¦");
		//		var Periodo = lstPeriodo.split("¦");
		//		var Medico = lstMedico.split("¦");
		//		var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'><table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='13' style='text-align:left'>" + sucursal[1] + "</td></tr>";

		//		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
		//		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		//		var fecha = factura[4].split(" ");
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
		//		var n = aCabecera.length;
		//		for (var i = 0; i < n; i++) {
		//			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
		//			contenido += aCabecera[i];
		//			contenido += "</td>";
		//		}
		//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px'>";
		//		contenido += excelExportar;
		//		contenido += "</tbody><tfoot></tfoot></table>";

		//		contenido += "<div style='page-break-after:always'></div>";
		//		var contenido1 = "";
		//		contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a):</p>";
		//		contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
		//		contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

		//		contenido += "<table style='width:100%;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
		//		contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";

		//		var totales = obtenerTotales(true);
		//		var total = 0;
		//		var descuento = totales.t * (aMedicos[0][5] / 100);
		//		if (aMedicos[0][6] == "I") {
		//			total = totales.t + descuento;
		//		} else {
		//			total = totales.t - descuento;
		//			descuento = descuento * -1;
		//		}
		//		contenido += "<table style='width:700px;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + totales.t.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px'>IGV/Renta</td><td style='text-align:right;width:100px'>" + descuento.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		var lt = NumeroALetras(Math.abs(total));
		//		contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";


		//		contenido += "</body></html>";
		//		var url = urlBase + "Control/generarPDF/?ss=" + ss + "&anio=" + Periodo[2] + "&mes=" + Periodo[3];
		//		nombrePDF = Periodo[2] + "-" + Periodo[3] + "-" + Periodo[4].charAt(0) + "-" + factura[1];
		//		$.ajax(url, "post", listarPDF, contenido);
		//	}
		//}
	}

	var btnPDFHorario = document.getElementById("btnPDFHorario");
	btnPDFHorario.onclick = function () {
		CreacionPDFGeneral();
		//if (aHorario.length > 0) {
		//	var tbody = document.getElementById("tbReporte");
		//	if (tbody != null) {
		//		var sucursal = lstsucursal.split("¦");
		//		var factura = lstFactura.split("¦");
		//		var Periodo = lstPeriodo.split("¦");
		//		var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'><table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
		//		//contenido += "<tr><td colspan='15' style='text-align:center'>LIQUIDACIÓN-SERVICIOS MEDICOS<br/>PERIODO " + Periodo[2] + "-" + Periodo[3] + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='13' style='text-align:left'>" + sucursal[1] + "</td></tr>";

		//		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
		//		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		//		var fecha = factura[4].split(" ");
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		//		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
		//		var n = aCabeceraHorario.length;
		//		for (var i = 0; i < n; i++) {
		//			if (i == 4 || i == 5 || i == 6 || i == 7) contenido += "<td style='font-weight:bold;border-top: 4px double black;text-align:right'>";
		//			else contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
		//			contenido += aCabeceraHorario[i];
		//			contenido += "</td>";
		//		}
		//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px;margin-bottom:10px'>";
		//		contenido += excelExportar;
		//		contenido += "</tbody><tfoot></tfoot></table>";

		//		contenido += "<div style='page-break-after:always'></div>";
		//		var contenido1 = "";
		//		contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a):</p>";
		//		contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
		//		contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

		//		contenido += "<table style='width:100%;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
		//		contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";

		//		var totales = sumarTotalesHorario(aHorario, '', true);
		//		var dato = totales.split("¦");
		//		dato[1] = dato[0] * 1 * (aMedicos[0][5] / 100);
		//		if (aMedicos[0][6] == "I") {
		//			dato[2] = dato[0] * 1 + (dato[1] * 1);
		//		} else {
		//			dato[2] = dato[0] * 1 - (dato[1] * 1);
		//			dato[1] = (dato[1] * 1) * -1;
		//		}

		//		contenido += "<table style='width:700px;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + (dato[0] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px'>IGV/Renta</td><td style='text-align:right;width:100px'>" + (dato[1] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (dato[2] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		var lt = NumeroALetras(Math.abs(dato[2]));
		//		contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";
		//		contenido += "</body></html>";
		//		nombrePDF = Periodo[2] + "-" + Periodo[3] + "-" + Periodo[4].charAt(0) + "-" + factura[1];
		//		var url = urlBase + "Control/generarPDF/?ss=" + ss + "&anio=" + Periodo[2] + "&mes=" + Periodo[3];
		//		$.ajax(url, "post", listarPDF, contenido);
		//	}
		//}
	}

	var btnExcelHorario = document.getElementById("btnExcelHorario");
	btnExcelHorario.onclick = function () {
		if (aHorario.length > 0) {
			var cabecera = "<html><head><meta charset='utf-8'/></head><table>";

			cabecera += "<tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
			cabecera += "<td style='width: 80px' align='center'>Fecha</td>";
			cabecera += "<td style='width: 80px' align='center'>Hora Inicio</td>";
			cabecera += "<td style='width: 80px' align='center'>Hora Fin</td>";
			cabecera += "<td style='width: 80px' align='center'>Horas</td>";
			cabecera += "<td style='width: 100px' align='center'>Valor Contrato</td>";
			cabecera += "<td style='width: 80px' align='center'>Importe</td>";
			cabecera += "<td style='width: 80px' align='center'>Bonificación</td>";
			cabecera += "<td style='width: 80px' align='center'>Total</td>";
			cabecera += "<td style='width: 100px' align='center'>Día</td>";
			cabecera += "<td style='width: 70px' align='center'>Feriado</td>";
			cabecera += "<td style='width: 200px' align='center'>Especialidad</td>";
			cabecera += "<td style='width: 100px' align='center'>Tipo Atención</td>";
			cabecera += "</tr>";
			cabecera += document.getElementById("tbReporteHorario").innerHTML;
			cabecera += "</table></html>";
			var formBlob = new Blob([cabecera], { type: 'application/vnd.ms-excel' });
			this.download = "ReporteHorario.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	var btnExportarMtf = document.getElementById("btnExportarMtf");
	btnExportarMtf.onclick = function () {
		if (aMtoFijo.length > 0) {
			var cabecera = "<html><head><meta charset='utf-8'/></head><table>";

			cabecera += "<tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
			cabecera += "<td style='width: 80px' align='center'>PersonaId</td>";
			cabecera += "<td style='width: 200px' align='center'>Descripción</td>";
			cabecera += "<td style='width: 80px' align='center'>Id</td>";
			cabecera += "<td style='width: 200px' align='center'>Concepto </td>";
			cabecera += "<td style='width: 80px' align='center'>Ind. Adm.</td>";
			cabecera += "<td style='width: 80px' align='center'>Periodo</td>";
			cabecera += "<td style='width: 80px' align='center'>Importe</td>";
			//cabecera += "<td style='width: 80px' align='center'>Impuesto</td>";
			cabecera += "<td style='width: 80px' align='center'>Total</td>";
			cabecera += "<td style='width: 80px' align='center'>Documento</td>";
			cabecera += "</tr>";
			cabecera += document.getElementById("tbReporteMontoFijo").innerHTML;
			cabecera += "</table></html>";
			var formBlob = new Blob([cabecera], { type: 'application/vnd.ms-excel' });
			this.download = "ReporteMontoFijo.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	var btnExportarPDFMtf = document.getElementById("btnExportarPDFMtf");
	btnExportarPDFMtf.onclick = function () {
		CreacionPDFGeneral();
		//if (aMtoFijo.length > 0) {
		//	var tbody = document.getElementById("tbReporte");
		//	if (tbody != null) {
		//		var sucursal = lstsucursal.split("¦");
		//		var factura = lstFactura.split("¦");
		//		var Periodo = lstPeriodo.split("¦")
		//		var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'><table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
		//		//contenido += "<tr><td colspan='15' style='text-align:center'>LIQUIDACIÓN-SERVICIOS MEDICOS<br/>PERIODO " + Periodo[2] + "-" + Periodo[3] + "</td></tr>";
		//		contenido += "<tr><td colspan='1' style='font-weight:bold'>Compañia:</td><td colspan='9' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>" + sucursal[1] + "</td></tr>";

		//		contenido += "<tr><td colspan='10' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		//		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Teléfono</td><td colspan='1'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='6'></td></tr>";
		//		contenido += "<tr><td colspan='10' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		//		var fecha = factura[4].split(" ");
		//		contenido += "<tr><td colspan='1' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='5'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		//		contenido += "<tr><td colspan='1' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='5'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		//		contenido += "<tr><td colspan='1' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='5'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
		//		var n = aCabeceraMtoFijo.length;
		//		for (var i = 0; i < n; i++) {
		//			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
		//			contenido += aCabeceraMtoFijo[i];
		//			contenido += "</td>";
		//		}
		//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px'>";
		//		contenido += excelExportarMtoFijo;
		//		contenido += "</tbody><tfoot></tfoot></table>";

		//		contenido += "<div style='page-break-after:always'></div>";
		//		var contenido1 = "";
		//		contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a):</p>";
		//		contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
		//		contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

		//		contenido += "<table style='width:100%;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
		//		contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
		//		contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";

		//		var totales = totalesMtfijo;
		//		var total = 0;
		//		var descuento = totales.mtImporte * (aMedicos[0][5] / 100);
		//		if (aMedicos[0][6] == "I") {
		//			total = totales.mtImporte + descuento;
		//		} else {
		//			total = totales.mtImporte - descuento;
		//			descuento = descuento * -1;
		//		}
		//		contenido += "<table style='width:700px;border-collapse: collapse'>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + totales.mtImporte.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px'>IGV/Renta</td><td style='text-align:right;width:100px'>" + descuento.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
		//		var lt = NumeroALetras(Math.abs(total));
		//		contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";


		//		contenido += "</body></html>";
		//		nombrePDF = Periodo[2] + "-" + Periodo[3] + "-" + Periodo[4].charAt(0) + "-" + factura[1];
		//		var url = urlBase + "Control/generarPDF/?ss=" + ss + "&anio=" + Periodo[2] + "&mes=" + Periodo[3];
		//		$.ajax(url, "post", listarPDF, contenido);
		//	}
		//}
	}

}
function configurarExportarDetallado() {
	var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
	aExportarExcelDetalle.onclick = function () {
		if (matrizDetalle.length > 0) {
			exportacionDetalle(this);
		}
	}
}

function exportacionDetalle(objeto) {
	var nRegistros = matrizDetalle.length;
	if (nRegistros > 0) {
		var excelExportarprovision = crearCabeceraExportarDetalle();
		excelExportarprovision += excelExportarDetalle.replace(/checkbox/gi, "hidden").replace(/display:none/gi, "");
		excelExportarprovision += "</table></html>";
		var formBlob = new Blob([excelExportarprovision], { type: 'application/vnd.ms-excel' });
		objeto.download = "ProcesoProvision.xls";
		objeto.href = window.URL.createObjectURL(formBlob);
	}
}
function crearCabeceraExportarDetalle() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";

	cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 300px'>Empresa</td>";
	cabecera += "<td style='width: 300px'>Médico</td>";
	cabecera += "<td style='width: 200px'>Especialidad</td>";
	cabecera += "<td style='width: 150px'>Importe</td>";
	cabecera += "<td style='width: 150px'>Bonificacion</td>";
	cabecera += "<td style='width: 150px'>Descuento</td>";
	cabecera += "<td style='width: 150px'>Ajuste</td>";
	cabecera += "<td style='width: 150px'>Total</td>";
	cabecera += "</tr>";
	return cabecera;
}
function configurarSeleccion() {

	var select = document.getElementsByClassName("select");
	var n = select.length, spn;
	for (var i = 0; i < n; i++) {
		spn = select[i];
		spn.onclick = function () {
			var par = this.getAttribute("data-select");
			var hdfMedico = document.getElementById("hdfMedico");
			var hdfEmpresa = document.getElementById("hdfEmpresa");
			var txtMedico = document.getElementById("txtMedico");
			var txtEmpresa = document.getElementById("txtEmpresa");
			var btnBuscar = document.getElementById("btnBuscar");
			var tipoVista = document.getElementsByName("tipoVista");
			if (par != null) {
				par = par.split("-");
				if (par[0] == "M") {
					var especialidad = this.getAttribute("data-es");
					var esEmpresa = this.getAttribute("data-e");
					if (esEmpresa != null) {
						if (especialidad != null) {
							if (especialidad == "E") {
								cadenaEsp = buscarIdEspecialidad(1, par[1], esEmpresa);
							} else {
								cadenaEsp = especialidad;
							}
							hdfEmpresa.value = esEmpresa;
							hdfMedico.value = par[1];
							txtMedico.value = this.textContent;
							var nme = buscarNombreEmpresa(esEmpresa);
							txtEmpresa.value = nme;
						}
					} else {
						if (especialidad != null) {
							if (especialidad == "P") {
								cadenaEsp = buscarIdEspecialidad(0, par[1]);
							} else {
								cadenaEsp = especialidad;
							}
							hdfEmpresa.value = "";
							hdfMedico.value = par[1];
							txtMedico.value = this.textContent;
						}
					}
				} else {
					cadenaEsp = "";
					txtMedico.value = "";
					txtEmpresa.value = this.textContent;
					hdfEmpresa.value = par[1];
				}
				tipoVista[1].checked = true;


				var event = new Event('Event');
				if (event != null) {
					event.initEvent('click', true, true);
					btnBuscar.addEventListener('click', function (e) { }, false);
					btnBuscar.dispatchEvent(event);
				} else {
					btnBuscar.click();
				}
			}
		}
	}
}

function buscarIdEspecialidad(t, id, emp) {
	var n = matrizDetalle.length;
	var cnt = "";
	if (n > 0) {
		var obj;
		for (var i = 0; i < n; i++) {
			obj = matrizDetalle[i];
			if (obj[9] == t) {
				if (obj[0] == id) {
					cnt += obj[8];
					cnt += "¦";
				}
			} else {
				if (obj[0] == id && obj[9] == emp) {
					cnt += obj[8];
					cnt += "¦";
				}
			}
		}
	}
	cnt = cnt.substring(0, cnt.length - 1);
	return cnt;
}
function buscarNombreEmpresa(id) {
	var n = listaEmpresaMedico.length;
	var cnt = "";
	if (n > 0) {
		var obj;
		for (var i = 0; i < n; i++) {
			obj = listaEmpresaMedico[i].split("¦");
			if (obj[0] == id) {
				cnt += obj[1];
			}
		}
	}
	return cnt;
}


function mostrarTabs(elemento) {
	var tab = document.getElementById("ulTabs");
	elementos = tab.getElementsByClassName("tab-link");
	for (var x = 0; x < elementos.length; x++) {
		if ((elementos[x].getAttribute("data-tab")) == elemento.getAttribute("data-tab")) {
			elementos[x].className = "tab-link current";
			document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content current";
			if (elementos[x].getAttribute("data-tab") == "tab-2") {
				limpiarfiltroHorario();
				aFiltro = [];
				crearMatriz(lstHorario, 5);
				mostrarMatrizHorario();
			}
		}
		else {
			elementos[x].className = "tab-link";
			document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content";
		}
	}
}
function limpiarfiltroHorario() {
	var hfiltro = document.getElementsByClassName("hfiltro"),
	n = hfiltro.length, cnt;
	for (var i = 0; i < n; i++) {
		cnt = hfiltro[i];
		cnt.value = "";
	}
}

function obtenerCabeceraMedicoHorario(idMed, TipoAte, totales) {
	var matrizTotal = totales.split("¦");
	var registro = buscarMedicoHorario(idMed, TipoAte, totales);
	var contenido = ""
	if (registro.length > 0) {
		contenido += "<tr><td>Médico</td><td>" + (registro[0] == undefined ? "" : registro[0]);
		contenido += "</td><td colspan='2'>" + (registro[1] == undefined ? "" : registro[1]) + "</td><td>Especialidad</td><td colspan='10'><b>" + (registro[3] == undefined ? "" : registro[3]) + "</b></td></tr>";
		contenido += "<tr><td>Tipo Atención</td><td colspan='2'>" + TipoAte + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'></td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((matrizTotal[0] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((matrizTotal[1] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((matrizTotal[2] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='border-bottom: 4px double black;text-align:right'>" + ((matrizTotal[3] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td colspan='7'></td></tr>";
		contenido += "<tr><td colspan='3'></td>";
		contenido += "<td></td>";
		contenido += "<td style='text-align:right'>" + ((matrizTotal[0] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='text-align:right'>" + ((matrizTotal[1] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='text-align:right'>" + ((matrizTotal[2] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td style='text-align:right'>" + ((matrizTotal[3] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + "</td>";
		contenido += "<td colspan='7'></td></tr>";
	}

	return contenido;
}

function sumarTotalesHorario(lista, valor, opcion) {
	if (opcion) {
		var a = 0, b = 0, c = 0;
		for (var x = 0; x < lista.length; x++) {
			a = a + (lista[x][6] * 1);
			b = b + (lista[x][13] * 1);
			c = c + (lista[x][14] * 1);
		}
		return (a + "¦" + b + "¦" + c);
	}
	else {
		var a = 0, b = 0, c = 0, d = 0;
		for (var x = 0; x < lista.length; x++) {
			if (lista[x][0] == valor) {
				for (var y = x; y < lista.length; y++) {
					a = a + (lista[y][5] * 1);
					b = b + (lista[y][6] * 1);
					c = c + (lista[y][7] * 1);
					d = d + (lista[y][8] * 1);
					if (lista[y + 1] != undefined && lista[y][0] != lista[y + 1][0]) {
						break;
					}
				}
				break;
			}
		}
		return (a + "¦" + b + "¦" + c + "¦" + d);
	}
}

function buscarMedicoHorario(id, tipo) {
	var rpta = "";
	var n = aMedicos.length;
	for (var i = 0; i < n; i++) {
		registro = aMedicos[i];
		if (registro[0] == id) {
			rpta = registro;
			break;
		}
	}
	return rpta
}


function mostrarMatrizHorario() {

	var n = aHorario.length, contenido = "", ncampos = cabecerasHorario.length, registro, nCampos;
	var idMed = "", idTipoAte = "", esNuevo = false, regSiguiente;

	if (n > 0) {
		var registro, vc = 0, imp = 0, bon = 0, total = 0;
		for (var i = 0; i < n; i++) {
			registro = aHorario[i];
			nCampos = registro.length;
			idMed = registro[0] == undefined ? -1 : registro[0];
			idTipoAte = registro[12] == undefined ? -1 : registro[12];
			if (i == 0 || esNuevo == true) {
				if (i != 0) {
					contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
				}
				var totales = sumarTotalesHorario(aHorario, registro[0]);
				contenido += obtenerCabeceraMedicoHorario(idMed, idTipoAte, totales);
				contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
				//contenido += "<tr><td colspan='2'>Concepto</td><td colspan='13'>";
				//contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
				//contenido += "</td></tr>";
			}
			regSiguiente = aHorario[i + 1];
			if (regSiguiente != undefined) {
				if (idMed != regSiguiente[0] || idTipoAte != regSiguiente[12]) {
					esNuevo = true;
				} else { esNuevo = false; }

			}
			contenido += "<tr>";
			for (var j = 0; j < ncampos; j++) {
				switch (j) {

					case 4:
					case 5:
					case 6:
					case 7:
						contenido += "<td style='text-align:right'>";
						contenido += formatearNumero(registro[j + 1] * 1);
						switch (j) {
							case 4:
								vc += registro[j + 1] * 1;
								break;
							case 5:
								imp += registro[j + 1] * 1;
								break;
							case 6:
								bon += registro[j + 1] * 1;
								break;
							case 7:
								total += registro[j + 1] * 1;
								break;

						}
						break;
					case 9:
						contenido += "<td style='text-align:center'>";
						contenido += (registro[j + 1] == "True" ? "Sí" : "No");
						break;
					default:
						contenido += "<td>";
						contenido += registro[j + 1];
						break;
				}

				contenido += "</td>";
			}
			contenido += "</tr>";
		}

		contenido += "<tr><td colspan='4' style='text-align:right;font-wight:bolt'>Totales</td>";
		contenido += "<td style='text-align:right;'>" + formatearNumero(vc) + "</td>"
		contenido += "<td style='text-align:right;'>" + formatearNumero(imp) + "</td>"
		contenido += "<td style='text-align:right;'>" + formatearNumero(bon) + "</td>"
		contenido += "<td style='text-align:right;'>" + formatearNumero(total) + "</td>"
		contenido += "<td colspan='4'></td></tr>";
	} else {
		contenido += "<tr><td colspan='" + ncampos + "' style='text-align:center'>No hay Registros</td></tr>";
	}
	excelExportar = contenido;
	var tb = document.getElementById("tbReporteHorario");
	if (tb != null) {
		tb.innerHTML = contenido;
	}
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
function configurarFiltroHorario() {

	var hfiltro = document.getElementsByClassName("hfiltro"),
	n = hfiltro.length, cnt;
	for (var i = 0; i < n; i++) {
		cnt = hfiltro[i];
		if (cnt.nodeName == "INPUT") {
			cnt.onkeyup = function () {
				var ti = this.tabIndex * 1,
				pos = buscarCampofiltro(ti);
				if (pos == -1) {
					if (this.value.trim() != "") {
						aFiltro.push([ti, this.value]);
					}
				} else {
					if (this.value.trim() != "") {
						aFiltro[pos][1] = this.value;
					} else {
						aFiltro.splice(pos, 1);
					}
				}
				aHorario = [];
				crearMatriz(lstHorario, 5);
				mostrarMatrizHorario();
			}
		} else {
			cnt.onchange = function () {
				var ti = this.tabIndex * 1,
				pos = buscarCampofiltro(ti);
				if (pos == -1) {
					if (this.value.trim() != "") {
						aFiltro.push([ti, this.value]);
					}
				} else {
					if (this.value.trim() != "") {
						aFiltro[pos][1] = this.value;
					} else {
						aFiltro.splice(pos, 1);
					}
				}
				aHorario = [];
				crearMatriz(lstHorario, 5);
				mostrarMatrizHorario();
			}
		}
	}
}
function buscarCampofiltro(id) {
	var pos = -1, n = aFiltro.length;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			if (aFiltro[i][0] == id) {
				pos = i;
				break;
			}
		}
	}
	return pos;
}
function Unidades(num) {
	switch (num) {
		case 1: return "UN";
		case 2: return "DOS";
		case 3: return "TRES";
		case 4: return "CUATRO";
		case 5: return "CINCO";
		case 6: return "SEIS";
		case 7: return "SIETE";
		case 8: return "OCHO";
		case 9: return "NUEVE";
	}
	return "";
}
function Decenas(num) {
	decena = Math.floor(num / 10);
	unidad = num - (decena * 10);
	switch (decena) {
		case 1:
			switch (unidad) {
				case 0: return "DIEZ";
				case 1: return "ONCE";
				case 2: return "DOCE";
				case 3: return "TRECE";
				case 4: return "CATORCE";
				case 5: return "QUINCE";
				default: return "DIECI" + Unidades(unidad);
			}
		case 2:
			switch (unidad) {
				case 0: return "VEINTE";
				default: return "VEINTI" + Unidades(unidad);
			}
		case 3: return DecenasY("TREINTA", unidad);
		case 4: return DecenasY("CUARENTA", unidad);
		case 5: return DecenasY("CINCUENTA", unidad);
		case 6: return DecenasY("SESENTA", unidad);
		case 7: return DecenasY("SETENTA", unidad);
		case 8: return DecenasY("OCHENTA", unidad);
		case 9: return DecenasY("NOVENTA", unidad);
		case 0: return Unidades(unidad);
	}
}
function DecenasY(strSin, numUnidades) {
	if (numUnidades > 0)
		return strSin + " Y " + Unidades(numUnidades)

	return strSin;
}
function Centenas(num) {
	centenas = Math.floor(num / 100);
	decenas = num - (centenas * 100);
	switch (centenas) {
		case 1:
			if (decenas > 0)
				return "CIENTO " + Decenas(decenas);
			return "CIEN";
		case 2: return "DOSCIENTOS " + Decenas(decenas);
		case 3: return "TRESCIENTOS " + Decenas(decenas);
		case 4: return "CUATROCIENTOS " + Decenas(decenas);
		case 5: return "QUINIENTOS " + Decenas(decenas);
		case 6: return "SEISCIENTOS " + Decenas(decenas);
		case 7: return "SETECIENTOS " + Decenas(decenas);
		case 8: return "OCHOCIENTOS " + Decenas(decenas);
		case 9: return "NOVECIENTOS " + Decenas(decenas);
	}
	return Decenas(decenas);
}
function Seccion(num, divisor, strSingular, strPlural) {
	cientos = Math.floor(num / divisor)
	resto = num - (cientos * divisor)
	letras = "";
	if (cientos > 0)
		if (cientos > 1)
			letras = Centenas(cientos) + " " + strPlural;
		else
			letras = strSingular;
	if (resto > 0)
		letras += "";
	return letras;
}
function Miles(num) {
	divisor = 1000;
	cientos = Math.floor(num / divisor)
	resto = num - (cientos * divisor)

	strMiles = Seccion(num, divisor, "UN MIL", "MIL");
	strCentenas = Centenas(resto);

	if (strMiles == "")
		return strCentenas;
	return strMiles + " " + strCentenas;
}
function Millones(num) {
	divisor = 1000000;
	cientos = Math.floor(num / divisor)
	resto = num - (cientos * divisor)

	strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
	strMiles = Miles(resto);

	if (strMillones == "")
		return strMiles;

	return strMillones + " " + strMiles;
}
function NumeroALetras(num) {
	var data = {
		numero: num,
		enteros: Math.floor(num),
		centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
		letrasCentavos: "",
		letrasMonedaPlural: "SOLES",
		letrasMonedaSingular: "SOLES"
	};

	if (data.centavos > 0)
		data.letrasCentavos = "Y " + data.centavos + "/100";

	if (data.enteros == 0)
		return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
	if (data.enteros == 1)
		return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaSingular;
	else
		return Millones(data.enteros) + " " + data.letrasCentavos + " " + data.letrasMonedaSingular;;
}
function mostrarMatrizMtoFijo() {

	var n = aMtoFijo.length, cnt = "";
	var tbReporteMontoFijo = document.getElementById("tbReporteMontoFijo");
	var mimp = 0, migv = 0, mttg = 0;
	if (n > 0) {
		var obj, ncampos = aCabeceraMtoFijo.length, idMed = "", objSiguiente, esNuevo = false;
		for (var i = 0; i < n; i++) {
			obj = aMtoFijo[i];
			idMed = obj[0];

			if (i == 0 || esNuevo) {
				cnt += "<tr><td>" + obj[0] + "</td>";
				cnt += "<td colspan='8'>" + buscarDescripcionMtoFijo(1, obj[0]);
				cnt += "</td></tr>";
				esNuevo = false;

			}

			objSiguiente = aMtoFijo[i + 1];
			if (objSiguiente != undefined) {
				//objSiguiente = aMtoFijo[i + 1].split("¦");
				objSiguiente = aMtoFijo[i + 1];
				if (idMed != objSiguiente[0]) {
					esNuevo = true;
				}
			}

			cnt += "<tr>";
			for (var j = 0; j < ncampos; j++) {
				switch (j) {
					case 0:
						cnt += "<td>";
						cnt += "</td>";
						break;
					case 4:
						cnt += "<td>";
						cnt += obj[j] == "True" ? "SI" : "NO";
						cnt += "</td>";
						break;
					case 5:
						cnt += "<td>";
						cnt += buscarDescripcionMtoFijo(0, obj[j]);
						cnt += "</td>";
						break;
						//case 7:
						//	cnt += "<td style='text-align:right'>";
						//	cnt += (obj[j] * 1).toFixed(2);
						//	break;
					case 6:
						cnt += "<td style='text-align:right'>";
						cnt += (obj[j] * 1).toFixed(2);
						break;
					case 7:
						cnt += "<td style='text-align:right'>";
						cnt += (obj[8] * 1).toFixed(2);
						break;
					case 8:
						cnt += "<td style='text-align:right'>";
						cnt += obj[9];
						break;
					default:
						cnt += "<td>";
						cnt += obj[j];
						cnt += "</td>";
						break;
				}
			}
			cnt += "</tr>";
			mimp += (obj[6] * 1);
			migv += (obj[7] * 1);
			mttg += (obj[8] * 1);
		}
		excelExportarMtoFijo = cnt;
		totalesMtfijo.mtImporte = mimp;
		totalesMtfijo.mtDescuento = migv;
		totalesMtfijo.mtTotal = mttg;
		cnt += "<tr><td colspan='6' style='text-align:right'>Totales</td><td style='text-align:right'>" + (mimp).toFixed(2) + "</td>";
		//cnt += "<td style='text-align:right'>" + (migv).toFixed(2) + "</td>";
		cnt += "<td style='text-align:right'>" + (mttg).toFixed(2) + "</td><td></td>"

	} else {
		cnt += "<tr><td colspan='" + aCabeceraMtoFijo.length + "' style='text-align:center'>No hay Datos</td></tr>";;

	}
	tbReporteMontoFijo.innerHTML = cnt;

}
function buscarDescripcionMtoFijo(t, id) {
	var n, des = "";
	switch (t) {
		case 0:
			n = lstPeriodoCombo.length;
			break;
		case 1:
			n = aMedicos.length;
			break;
	}
	if (n > 0) {
		var obj;
		for (var i = 0; i < n; i++) {
			switch (t) {
				case 0:
					obj = lstPeriodoCombo[i].split("¦");
					break;
				case 1:
					obj = aMedicos[i];
					break;
			}
			if (obj[0] == id) {
				des = obj[1];
			}
		}
	}
	return des;
}

function CreacionPDFGeneral() {
	var sucursal = lstsucursal.split("¦");
	var factura = lstFactura.split("¦");
	var Periodo = lstPeriodo.split("¦");
	var Medico = lstMedico.split("¦");
	var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>table{font-size:12px !important;}thead{display: table-header-group;} tr{page-break-inside: avoid;} body{width:100%;font-family:Calibri;margin-bottom:80px;font-size:8px !important;}</style></head><body>";
	if (aDetalle.length > 0) {
		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>" + sucursal[1] + "</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td colspan='2'>PRODUCCIÓN</td></tr>";

		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		var fecha = factura[4].split(" ");
		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr>";
		var n = aCabecera.length;
		for (var i = 0; i < n; i++) {
			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
			contenido += aCabecera[i];
			contenido += "</td>";
		}
		contenido += "</tr></thead><tbody style'width:100%;'>";
		var nx = aDetalle.length,
            registro, nCampos;
		var idMed = "",
            idTipoAte = "",
            tipoAjuste = "",
            esNuevo = false,
            regSiguiente;
		var idServicio = "",
            esQEspecialidad = false,
            contadortotal = 0;
		var idEspecialidad = "";
		var codPres = "";
		var esNuevoTipoAte = false;
		var cabecera = "";
		if (nx > 0) {
			for (var i = 0; i < nx; i++) {
				registro = aDetalle[i];
				nCampos = registro.length;
				idMed = registro[2] == undefined ? -1 : registro[2];
				idTipoAte = registro[0] == undefined ? -1 : registro[0];
				tipoAjuste = registro[26] == undefined ? -1 : registro[26];
				idServicio = registro[1] == undefined ? -1 : registro[1];
				idEspecialidad = registro[4] == undefined ? -1 : registro[4];
				codPres = registro[3] == undefined ? -1 : registro[3];
				//if (i == 0 || esNuevo == true) {
				if (i == 0 || esNuevoTipoAte == true) {
					cabecera = registro[6] + "¦" + registro[2] + "¦" + registro[4] + "¦" + registro[26] + "¦" + registro[0] + "¦";
					cabecera += registro[27] + "¦" + registro[28] + "¦" + registro[29] + "¦" + registro[30] + " ¦" + registro[31];
					//contenido += obtenerCabeceraMedico(idMed, idTipoAte, registro[26], contadortotal);
					contenido += obtenerCabeceraMedico(cabecera);
					contadortotal++;
					//contenido += "<tr><td colspan='4'>&nbsp</td></tr>";
					contenido += "<tr style='font-weight: bold'><td colspan='2'>Tipo Ord. Ate</td><td colspan='12' >";
					contenido += buscarDescription(1, registro[1]);
					contenido += "</td></tr>"
					contenido += "<tr style='font-weight: bold'><td colspan='2'>Concepto</td><td colspan='12' >";
					contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
					contenido += "</td></tr>";
					esNuevoTipoAte = false;
				}
				if (esNuevo) {//para cambio
					contenido += "<tr><td colspan='4'>&nbsp</td></tr>";
					contenido += "<tr><td colspan='4'>&nbsp</td></tr>";
					contenido += "<tr style='font-weight: bold'><td colspan='2'>Tipo Ord. Ate</td><td colspan='12'>";
					contenido += buscarDescription(1, regSiguiente[1]);
					contenido += "</td></tr>"
					contenido += "<tr style='font-weight: bold'><td colspan='2'>Concepto</td><td colspan='12'>";
					contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
					contenido += "</td></tr>";
					esNuevo = false;
				}
				regSiguiente = aDetalle[i + 1];
				if (regSiguiente != undefined) {
					if (idMed != regSiguiente[2]) {
						esNuevoTipoAte = true;
					}
					else if (idEspecialidad != regSiguiente[4]) {
						esNuevoTipoAte = true;
					}
					else if (tipoAjuste != regSiguiente[26]) {
						esNuevoTipoAte = true;
					}
					else if (idTipoAte != regSiguiente[0]) {
						esNuevoTipoAte = true;
					}
					else if (idServicio != regSiguiente[1]) {
						esNuevo = true;
					}
					else if (codPres != regSiguiente[3]) {
						esNuevo = true;
					}
					else {
						esNuevo = false;
					}
				}
				contenido += "<tr>";
				for (var j = 5; j < nCampos; j++) {
					switch (j) {
						case 5:
							contenido += "<td >";
							contenido += registro[5];
							contenido += "</td>";
							break;
						case 6:
							contenido += "<td style='mso-number-format:\"\@\"'>";
							contenido += registro[6];
							contenido += "</td>";
							break;
						case 7:
							contenido += "<td>";
							contenido += registro[7];
							contenido += "</td>";
							break;
						case 8:
							contenido += "<td>";
							contenido += registro[8] == 0 ? "" : registro[8];
							contenido += "</td>";
							break;
						case 9:
							contenido += "<td>";
							contenido += registro[9];
							contenido += "</td>";
							break;
						case 10:
							contenido += "<td>";
							contenido += registro[11];
							contenido += "</td>";
							break;
						case 11:
							contenido += "<td>";
							contenido += registro[12];
							contenido += "</td>";
							break;
						case 12:
							contenido += "<td style='text-align:right'>";
							contenido += registro[13].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 13:
							contenido += "<td style='text-align:right'>";
							contenido += registro[14].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 14:
							contenido += "<td style='text-align:right'>";
							contenido += registro[20].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 15:
							contenido += "<td style='text-align:right'>";
							contenido += registro[21].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 16:
							contenido += "<td style='text-align:right'>";
							contenido += registro[15].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 17:
							//contenido += "<td style='text-align:right;background:green;display:none'>";
							//contenido += registro[22].toFixed(2);
							//contenido += "</td>";
							break;
						case 18:
							contenido += "<td style='text-align:right'>";
							contenido += registro[23].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
							contenido += "</td>";
							break;
						case 19:
							contenido += "<td>";
							contenido += registro[24];
							contenido += "</td>";
							break;
					}
				}
				contenido += "</tr>";
				if (esNuevoTipoAte == true || (i == (n - 1))) {
					contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='5'>SUB TOTAL ";
					contenido += buscarDescription(0, registro[4]);
					contenido += "</td><td style='text-align:right'>" + (registro[27] != undefined ? ((registro[27] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
					contenido += "</td><td style='text-align:right'>" + (registro[28] != undefined ? ((registro[28] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
					contenido += "</td><td style='text-align:right'>" + (registro[29] != undefined ? ((registro[29] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
					contenido += "</td><td style='text-align:right'>" + (registro[30] != undefined ? ((registro[30] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
					contenido += "</td>";
					contenido += "<td style='text-align:right'>" + (registro[31] != undefined ? ((registro[31] * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td><td></td></tr>";
					contenido += "<tr><td colspan='4'>&nbsp</td></tr>";
					contenido += "<tr><td colspan='4'>&nbsp</td></tr>";
				}
			}
			contenido += obtenerTotales();
		}
		if (aHorario.length == 0 && aMtoFijo.length == 0) {
			contenido += "<tr><td colspan='14'><br/><br/>";
			contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a): " + factura[1] + "</p>";
			contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
			contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

			contenido += "<table style='width:100%;border-collapse: collapse'>";
			contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
			contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";


			var totales = 0;
			for (var m = 0; m < 3; m++) {
				switch (m) {
					case 0:
						for (var h = 0; h < aDetalle.length; h++) {
							totales += aDetalle[h][23];
						}
						break;
					case 1:
						for (var h = 0; h < aHorario.length; h++) {
							totales += aHorario[h][6];
						}
						break;
					case 2:
						for (var h = 0; h < aMtoFijo.length; h++) {
							totales += (aMtoFijo[h][6] * 1);
						}
						break;
				}
			}
			var descuento = totales * (aMedicos[0][5] / 100);
			var TotalGeneral = 0;
			if (aMedicos[0][6] == "I") {
				TotalGeneral = totales + descuento;
			} else {
				TotalGeneral = totales - descuento;
				descuento = (descuento) * -1;
			}

			contenido += "<table style='width:700px;border-collapse: collapse'>";
			contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + (totales).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>" + (descuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (TotalGeneral).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			var lt = NumeroALetras(Math.abs(TotalGeneral));
			contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";
			contenido += "</td></tr></tr></tbody></table>";
			contenido += "</body></html>";
		} else {
			contenido += "</tr></tbody></table>";
		}
	}
	if (aHorario.length > 0) {
		if (aDetalle.length > 0) {
			contenido += "<div style='page-break-after:always'></div>";
		}
		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";

		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>" + sucursal[1] + "</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td colspan='2'>HORARIO</td></tr>";

		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		var fecha = factura[4].split(" ");
		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
		var n = aCabeceraHorario.length;
		for (var i = 0; i < n; i++) {
			if (i == 4 || i == 5 || i == 6 || i == 7) contenido += "<td style='font-weight:bold;border-top: 4px double black;text-align:right'>";
			else contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
			contenido += aCabeceraHorario[i];
			contenido += "</td>";
		}
		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px;margin-bottom:10px'>";
		var nx = aHorario.length,
            ncampos = cabecerasHorario.length,
            registro, nCampos;
		var idMed = "",
            idTipoAte = "",
            esNuevo = false,
            regSiguiente;

		if (nx > 0) {
			var registro, vc = 0,
                imp = 0,
                bon = 0,
                total = 0;
			for (var i = 0; i < nx; i++) {
				registro = aHorario[i];
				nCampos = registro.length;
				idMed = registro[0] == undefined ? -1 : registro[0];
				idTipoAte = registro[12] == undefined ? -1 : registro[12];
				if (i == 0 || esNuevo == true) {
					if (i != 0) {
						contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
					}
					var totales = sumarTotalesHorario(aHorario, registro[0]);
					contenido += obtenerCabeceraMedicoHorario(idMed, idTipoAte, totales);
					contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
				}
				regSiguiente = aHorario[i + 1];
				if (regSiguiente != undefined) {
					if (idMed != regSiguiente[0] || idTipoAte != regSiguiente[12]) {
						esNuevo = true;
					} else { esNuevo = false; }

				}
				contenido += "<tr>";
				for (var j = 0; j < ncampos; j++) {
					switch (j) {

						case 4:
						case 5:
						case 6:
						case 7:
							contenido += "<td style='text-align:right'>";
							contenido += formatearNumero(registro[j + 1] * 1);
							switch (j) {
								case 4:
									vc += registro[j + 1] * 1;
									break;
								case 5:
									imp += registro[j + 1] * 1;
									break;
								case 6:
									bon += registro[j + 1] * 1;
									break;
								case 7:
									total += registro[j + 1] * 1;
									break;

							}
							break;
						case 9:
							contenido += "<td style='text-align:center'>";
							contenido += (registro[j + 1] == "True" ? "Sí" : "No");
							break;
						default:
							contenido += "<td>";
							contenido += registro[j + 1];
							break;
					}

					contenido += "</td>";
				}
				contenido += "</tr>";
			}

			contenido += "<tr><td colspan='4' style='text-align:right;font-wight:bolt'>Totales</td>";
			contenido += "<td style='text-align:right;'>" + formatearNumero(vc) + "</td>"
			contenido += "<td style='text-align:right;'>" + formatearNumero(imp) + "</td>"
			contenido += "<td style='text-align:right;'>" + formatearNumero(bon) + "</td>"
			contenido += "<td style='text-align:right;'>" + formatearNumero(total) + "</td>"
			contenido += "<td colspan='4'></td></tr>";
		}
		if (aMtoFijo.length == 0) {
			contenido += "<tr><td colspan='15'><br/><br/>";
			contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a): " + factura[1] + "</p>";
			contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
			contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

			contenido += "<table style='width:100%;border-collapse: collapse'>";
			contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
			contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";


			var totales = 0;
			for (var m = 0; m < 3; m++) {
				switch (m) {
					case 0:
						for (var h = 0; h < aDetalle.length; h++) {
							totales += aDetalle[h][23];
						}
						break;
					case 1:
						for (var h = 0; h < aHorario.length; h++) {
							totales += aHorario[h][6];
						}
						break;
					case 2:
						for (var h = 0; h < aMtoFijo.length; h++) {
							totales += (aMtoFijo[h][6] * 1);
						}
						break;
				}
			}
			var descuento = totales * (aMedicos[0][5] / 100);
			var TotalGeneral = 0;
			if (aMedicos[0][6] == "I") {
				TotalGeneral = totales + descuento;
			} else {
				TotalGeneral = totales - descuento;
				descuento = (descuento) * -1;
			}

			contenido += "<table style='width:700px;border-collapse: collapse'>";
			contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + (totales).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>" + (descuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";

			contenido += "<tr><td style='width:200px;'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (TotalGeneral).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			var lt = NumeroALetras(Math.abs(TotalGeneral));
			contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";
			contenido += "</td></tr></tr></tbody></table>";
			contenido += "</body></html>";
		} else {
			contenido += "</tr></tbody></table>";
		}
	}
	if (aMtoFijo.length > 0) {
		if (aHorario.length > 0) {
			contenido += "<div style='page-break-after:always'></div>";
		}
		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
		contenido += "<tr><td colspan='1' style='font-weight:bold'>Compañia:</td><td colspan='9' style='text-align:left'>" + sucursal[2] + "</td></tr>";
		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>" + sucursal[1] + "</td><td colspan='2' style='font-weight:bold'>Condición de Pago</td><td colspan='2'>MONTO FIJO</td></tr>";

		contenido += "<tr><td colspan='10' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Teléfono</td><td colspan='1'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='6'></td></tr>";
		contenido += "<tr><td colspan='10' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

		var fecha = factura[4].split(" ");
		contenido += "<tr><td colspan='1' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='5'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
		contenido += "<tr><td colspan='1' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='5'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
		contenido += "<tr><td colspan='1' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='5'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
		var n = aCabeceraMtoFijo.length;
		for (var i = 0; i < n; i++) {
			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
			contenido += aCabeceraMtoFijo[i];
			contenido += "</td>";
		}
		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px'>";
		var nx = aMtoFijo.length;
		var mimp = 0,
            migv = 0,
            mttg = 0;
		if (nx > 0) {
			var obj, ncampos = aCabeceraMtoFijo.length,
                idMed = "",
                objSiguiente, esNuevo = false;
			for (var i = 0; i < nx; i++) {
				obj = aMtoFijo[i];
				idMed = obj[0];

				if (i == 0 || esNuevo) {
					contenido += "<tr><td>" + obj[0] + "</td>";
					contenido += "<td colspan='8'>" + buscarDescripcionMtoFijo(1, obj[0]);
					contenido += "</td></tr>";
					esNuevo = false;

				}

				objSiguiente = aMtoFijo[i + 1];
				if (objSiguiente != undefined) {
					objSiguiente = aMtoFijo[i + 1];
					if (idMed != objSiguiente[0]) {
						esNuevo = true;
					}
				}

				contenido += "<tr>";
				for (var j = 0; j < ncampos; j++) {
					switch (j) {
						case 0:
							contenido += "<td>";
							contenido += "</td>";
							break;
						case 4:
							contenido += "<td>";
							contenido += obj[j] == "True" ? "SI" : "NO";
							contenido += "</td>";
							break;
						case 5:
							contenido += "<td>";
							contenido += buscarDescripcionMtoFijo(0, obj[j]);
							contenido += "</td>";
							break;
						case 6:
							contenido += "<td style='text-align:right'>";
							contenido += (obj[j] * 1).toFixed(2);
							break;
						case 7:
							contenido += "<td style='text-align:right'>";
							contenido += (obj[8] * 1).toFixed(2);
							break;
						case 8:
							contenido += "<td style='text-align:right'>";
							contenido += obj[9];
							break;
						default:
							contenido += "<td>";
							contenido += obj[j];
							contenido += "</td>";
							break;
					}
				}
				contenido += "</tr>";
				mimp += (obj[6] * 1);
				migv += (obj[7] * 1);
				mttg += (obj[8] * 1);
			}
			totalesMtfijo.mtImporte = mimp;
			totalesMtfijo.mtDescuento = migv;
			totalesMtfijo.mtTotal = mttg;
			contenido += "<tr><td colspan='6' style='text-align:right'>Totales</td><td style='text-align:right'>" + (mimp).toFixed(2) + "</td>";
			contenido += "<td style='text-align:right'>" + (mttg).toFixed(2) + "</td><td></td></tr>";
			contenido += "<tr><td colspan='15'><br/><br/>";
			contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a): " + factura[1] + "</p>";
			contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
			contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

			contenido += "<table style='width:100%;border-collapse: collapse'>";
			contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
			contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
			contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";


			var totales = 0;
			for (var m = 0; m < 3; m++) {
				switch (m) {
					case 0:
						for (var h = 0; h < aDetalle.length; h++) {
							totales += aDetalle[h][23];
						}
						break;
					case 1:
						for (var h = 0; h < aHorario.length; h++) {
							totales += aHorario[h][6];
						}
						break;
					case 2:
						for (var h = 0; h < aMtoFijo.length; h++) {
							totales += (aMtoFijo[h][6] * 1);
						}
						break;
				}
			}
			var descuento = totales * (aMedicos[0][5] / 100);
			var TotalGeneral = 0;
			if (aMedicos[0][6] == "I") {
				TotalGeneral = totales + descuento;
			} else {
				TotalGeneral = totales - descuento;
				descuento = (descuento) * -1;
			}

			contenido += "<table style='width:700px;border-collapse: collapse'>";
			contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + (totales).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px;border-bottom:2px solid black'>IGV/Renta</td><td style='text-align:right;width:100px;border-bottom:2px solid black'>" + (descuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (TotalGeneral).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
			var lt = NumeroALetras(Math.abs(TotalGeneral));
			contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";
			contenido += "</td></tr></tr></tbody></table>";
			contenido += "</body></html>";
		}
	}
	var url = urlBase + "Control/generarPDF/?ss=" + ss + "&anio=" + Periodo[2] + "&mes=" + Periodo[3];
	nombrePDF = Periodo[2] + "-" + Periodo[3] + "-" + Periodo[4].charAt(0) + "-" + factura[1];
	$.ajax(url, "post", listarPDF, contenido);
}


//function CreacionPDFGeneral() {
//	var sucursal = lstsucursal.split("¦");
//	var factura = lstFactura.split("¦");
//	var Periodo = lstPeriodo.split("¦");
//	var Medico = lstMedico.split("¦");
//	var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='width:100%;font-family:Calibri;margin-bottom:80px;'>";
//	if (aDetalle.length > 0) {
//		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='13' style='text-align:left'>" + sucursal[1] + "</td></tr>";

//		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
//		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

//		var fecha = factura[4].split(" ");
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
//		var n = aCabecera.length;
//		for (var i = 0; i < n; i++) {
//			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
//			contenido += aCabecera[i];
//			contenido += "</td>";
//		}
//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px'>";
//		var nx = aDetalle.length, registro, nCampos;
//		var idMed = "", idTipoAte = "", tipoAjuste = "", esNuevo = false, regSiguiente;
//		var idServicio = "", esQEspecialidad = false, contadortotal = 0;
//		if (nx > 0) {
//			for (var i = 0; i < nx; i++) {
//				registro = aDetalle[i];
//				nCampos = registro.length;
//				idMed = registro[2] == undefined ? -1 : registro[2];
//				idTipoAte = registro[0] == undefined ? -1 : registro[0];
//				tipoAjuste = registro[26] == undefined ? -1 : registro[26];
//				idServicio = registro[1] == undefined ? -1 : registro[1];
//				if (i == 0 || esNuevo == true) {
//					contenido += obtenerCabeceraMedico(idMed, idTipoAte, registro[26], contadortotal);
//					contadortotal++;
//					contenido += "<tr><td colspan='2'>Tipo Ord. Ate</td><td colspan='12'>";
//					contenido += buscarDescription(1, registro[1]);
//					contenido += "</td></tr>"
//					contenido += "<tr><td colspan='2'>Concepto</td><td colspan='12'>";
//					contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
//					contenido += "</td></tr>";
//				}
//				regSiguiente = aDetalle[i + 1];
//				if (regSiguiente != undefined) {
//					if (idMed != regSiguiente[2] || (idMed == regSiguiente[2] && tipoAjuste != regSiguiente[26]) || (idMed == regSiguiente[2] && idTipoAte != regSiguiente[0])) {
//						esNuevo = true;
//					} else {
//						esNuevo = false;
//						if (idServicio != regSiguiente[1]) {
//							esQEspecialidad = true;
//						}
//					}
//				}

//				contenido += "<tr>";
//				for (var j = 5; j < nCampos; j++) {
//					switch (j) {
//						case 5:
//							contenido += "<td >";
//							contenido += registro[5];
//							contenido += "</td>";
//							break;
//						case 6:
//							contenido += "<td style='mso-number-format:\"\@\"'>";
//							contenido += registro[6];
//							contenido += "</td>";
//							break;
//						case 7:
//							contenido += "<td>";
//							contenido += registro[7];
//							contenido += "</td>";
//							break;
//						case 8:
//							contenido += "<td>";
//							contenido += registro[8] == 0 ? "" : registro[8];
//							contenido += "</td>";
//							break;
//						case 9:
//							contenido += "<td>";
//							contenido += registro[9];
//							contenido += "</td>";
//							break;
//						case 10:
//							contenido += "<td>";
//							contenido += registro[11];
//							contenido += "</td>";
//							break;
//						case 11:
//							contenido += "<td>";
//							contenido += registro[12];
//							contenido += "</td>";
//							break;
//						case 12:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[13].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 13:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[14].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 14:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[20].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 15:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[21].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 16:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[15].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 17:
//							break;
//						case 18:
//							contenido += "<td style='text-align:right'>";
//							contenido += registro[23].toFixed(2);
//							contenido += "</td>";
//							break;
//						case 19:
//							contenido += "<td>";
//							contenido += registro[24];
//							contenido += "</td>";
//							break;
//					}
//				}
//				contenido += "</tr>";
//				if (esNuevo || (i == (n - 1))) {
//					var registro1 = buscarMedico(idMed, idTipoAte, registro[26]);
//					contenido += "<tr><td colspan='3'>&nbsp</td><td colspan='5'>SUB TOTAL ";
//					contenido += buscarDescription(0, registro[0]);
//					contenido += "</td><td style='text-align:right'>" + (registro1[4] != undefined ? (registro1[4].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td><td style='text-align:right'>" + (registro1[5] != undefined ? (registro1[5].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td><td style='text-align:right'>" + (registro1[6] != undefined ? (registro1[6].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "");
//					contenido += "</td><td style='text-align:right'>" + (registro1[7] != undefined ? (registro1[7].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td>";
//					contenido += "<td style='text-align:right'>" + (registro1[9] != undefined ? (registro1[9].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : "") + "</td><td></td></tr>";
//				}
//				if (esQEspecialidad) {
//					contenido += "<tr><td colspan='2'>Tipo Ord. Ate</td><td colspan='12'>";
//					contenido += buscarDescription(1, regSiguiente[1]);
//					contenido += "</td></tr>"
//					contenido += "<tr><td colspan='2'>Concepto</td><td colspan='12'>";
//					contenido += registro[3] + "-" + buscarDescription(2, registro[3], registro[25]);
//					contenido += "</td></tr>";
//					esQEspecialidad = false;
//				}
//			}
//			contenido += obtenerTotales();
//		}
//		contenido += "</tbody><tfoot></tfoot></table>";
//	}

//	if (aMtoFijo.length > 0) {
//		if (aDetalle.length > 0) {
//			contenido += "<div style='page-break-after:always'></div>";
//		}
//		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";
//		contenido += "<tr><td colspan='1' style='font-weight:bold'>Compañia:</td><td colspan='9' style='text-align:left'>" + sucursal[2] + "</td></tr>";
//		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Sucursal: </td><td colspan='9' style='text-align:left'>" + sucursal[1] + "</td></tr>";

//		contenido += "<tr><td colspan='10' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
//		contenido += "<tr><td colspan='1' style='font-weight:bold;'>Teléfono</td><td colspan='1'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='6'></td></tr>";
//		contenido += "<tr><td colspan='10' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

//		var fecha = factura[4].split(" ");
//		contenido += "<tr><td colspan='1' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='5'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
//		contenido += "<tr><td colspan='1' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='5'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
//		contenido += "<tr><td colspan='1' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='5'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
//		var n = aCabeceraMtoFijo.length;
//		for (var i = 0; i < n; i++) {
//			contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
//			contenido += aCabeceraMtoFijo[i];
//			contenido += "</td>";
//		}
//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px'>";
//		var nx = aMtoFijo.length;
//		var mimp = 0, migv = 0, mttg = 0;
//		if (nx > 0) {
//			var obj, ncampos = aCabeceraMtoFijo.length, idMed = "", objSiguiente, esNuevo = false;
//			for (var i = 0; i < nx; i++) {
//				obj = aMtoFijo[i];
//				idMed = obj[0];

//				if (i == 0 || esNuevo) {
//					contenido += "<tr><td>" + obj[0] + "</td>";
//					contenido += "<td colspan='8'>" + buscarDescripcionMtoFijo(1, obj[0]);
//					contenido += "</td></tr>";
//					esNuevo = false;

//				}

//				objSiguiente = aMtoFijo[i + 1];
//				if (objSiguiente != undefined) {
//					objSiguiente = aMtoFijo[i + 1];
//					if (idMed != objSiguiente[0]) {
//						esNuevo = true;
//					}
//				}

//				contenido += "<tr>";
//				for (var j = 0; j < ncampos; j++) {
//					switch (j) {
//						case 0:
//							contenido += "<td>";
//							contenido += "</td>";
//							break;
//						case 4:
//							contenido += "<td>";
//							contenido += obj[j] == "True" ? "SI" : "NO";
//							contenido += "</td>";
//							break;
//						case 5:
//							contenido += "<td>";
//							contenido += buscarDescripcionMtoFijo(0, obj[j]);
//							contenido += "</td>";
//							break;
//						case 6:
//							contenido += "<td style='text-align:right'>";
//							contenido += (obj[j] * 1).toFixed(2);
//							break;
//						case 7:
//							contenido += "<td style='text-align:right'>";
//							contenido += (obj[8] * 1).toFixed(2);
//							break;
//						case 8:
//							contenido += "<td style='text-align:right'>";
//							contenido += obj[9];
//							break;
//						default:
//							contenido += "<td>";
//							contenido += obj[j];
//							contenido += "</td>";
//							break;
//					}
//				}
//				contenido += "</tr>";
//				mimp += (obj[6] * 1);
//				migv += (obj[7] * 1);
//				mttg += (obj[8] * 1);
//			}
//			totalesMtfijo.mtImporte = mimp;
//			totalesMtfijo.mtDescuento = migv;
//			totalesMtfijo.mtTotal = mttg;
//			contenido += "<tr><td colspan='6' style='text-align:right'>Totales</td><td style='text-align:right'>" + (mimp).toFixed(2) + "</td>";
//			contenido += "<td style='text-align:right'>" + (mttg).toFixed(2) + "</td><td></td>"
//			contenido += "</tbody><tfoot></tfoot></table>";
//		}
//	}
//	if (aHorario.length > 0) {
//		if (aMtoFijo.length > 0) {
//			contenido += "<div style='page-break-after:always'></div>";
//		}
//		contenido += "<table style='width:100%;border-collapse: collapse'><thead style='display: table-header-group'>";

//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Compañia:</td><td colspan='13' style='text-align:left'>" + sucursal[2] + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Sucursal: </td><td colspan='13' style='text-align:left'>" + sucursal[1] + "</td></tr>";

//		contenido += "<tr><td colspan='15' style='font-weight:bold;'>" + sucursal[3] + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold;'>Teléfono</td><td colspan='2'>" + sucursal[4] + "</td><td >Fax</td><td style='text-align:left'>" + sucursal[5] + "</td><td colspan='11'></td></tr>";
//		contenido += "<tr><td colspan='15' style='font-weight:bold;border-bottom:1px solid black'>" + sucursal[6] + "</td></tr>";

//		var fecha = factura[4].split(" ");
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>N° Liquidacíon: </td><td  style='text-align:left' colspan='9'>168688</td><td colspan='2'>Fecha Cierre</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[0]) + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>Factura a: </td><td style='text-align:left' colspan='9'>" + factura[1] + "</td><td colspan='2'>Hora</td><td colspan='2'>" + (fecha[0].indexOf("1900") > -1 ? "" : fecha[1]) + "</td></tr>";
//		contenido += "<tr><td colspan='2' style='font-weight:bold'>RUC: </td><td style='text-align:left' colspan='9'>" + factura[2] + "</td><td colspan='2'>Usuario</td><td colspan='2'>" + factura[3] + "</td></tr><tr></tr><tr style'font-size:12px'>";
//		var n = aCabeceraHorario.length;
//		for (var i = 0; i < n; i++) {
//			if (i == 4 || i == 5 || i == 6 || i == 7) contenido += "<td style='font-weight:bold;border-top: 4px double black;text-align:right'>";
//			else contenido += "<td style='font-weight:bold;border-top: 4px double black;'>";
//			contenido += aCabeceraHorario[i];
//			contenido += "</td>";
//		}
//		contenido += "</tr></thead><tbody style'width:100%;font-family:Calibri;font-size:8px;margin-bottom:10px'>";
//		var nx = aHorario.length, ncampos = cabecerasHorario.length, registro, nCampos;
//		var idMed = "", idTipoAte = "", esNuevo = false, regSiguiente;

//		if (nx > 0) {
//			var registro, vc = 0, imp = 0, bon = 0, total = 0;
//			for (var i = 0; i < nx; i++) {
//				registro = aHorario[i];
//				nCampos = registro.length;
//				idMed = registro[0] == undefined ? -1 : registro[0];
//				idTipoAte = registro[12] == undefined ? -1 : registro[12];
//				if (i == 0 || esNuevo == true) {
//					if (i != 0) {
//						contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
//					}
//					var totales = sumarTotalesHorario(aHorario, registro[0]);
//					contenido += obtenerCabeceraMedicoHorario(idMed, idTipoAte, totales);
//					contenido += "<tr><td colspan='15' style='padding: 6px;height:20px'></td></tr>";
//				}
//				regSiguiente = aHorario[i + 1];
//				if (regSiguiente != undefined) {
//					if (idMed != regSiguiente[0] || idTipoAte != regSiguiente[12]) {
//						esNuevo = true;
//					} else { esNuevo = false; }

//				}
//				contenido += "<tr>";
//				for (var j = 0; j < ncampos; j++) {
//					switch (j) {

//						case 4:
//						case 5:
//						case 6:
//						case 7:
//							contenido += "<td style='text-align:right'>";
//							contenido += formatearNumero(registro[j + 1] * 1);
//							switch (j) {
//								case 4:
//									vc += registro[j + 1] * 1;
//									break;
//								case 5:
//									imp += registro[j + 1] * 1;
//									break;
//								case 6:
//									bon += registro[j + 1] * 1;
//									break;
//								case 7:
//									total += registro[j + 1] * 1;
//									break;

//							}
//							break;
//						case 9:
//							contenido += "<td style='text-align:center'>";
//							contenido += (registro[j + 1] == "True" ? "Sí" : "No");
//							break;
//						default:
//							contenido += "<td>";
//							contenido += registro[j + 1];
//							break;
//					}

//					contenido += "</td>";
//				}
//				contenido += "</tr>";
//			}

//			contenido += "<tr><td colspan='4' style='text-align:right;font-wight:bolt'>Totales</td>";
//			contenido += "<td style='text-align:right;'>" + formatearNumero(vc) + "</td>"
//			contenido += "<td style='text-align:right;'>" + formatearNumero(imp) + "</td>"
//			contenido += "<td style='text-align:right;'>" + formatearNumero(bon) + "</td>"
//			contenido += "<td style='text-align:right;'>" + formatearNumero(total) + "</td>"
//			contenido += "<td colspan='4'></td></tr>";
//		}
//		contenido += "</tbody><tfoot></tfoot></table>";
//	}
//	contenido += "<div style='page-break-after:always'></div>";
//	contenido += "<p style='font-weight: bold;margin:0px'>Estimado Dr(a): " + factura[1] + "</p>";
//	contenido += "<p style='margin:0px'>Le agredecemos emitir sus comprobantes de pago por los servicios médicos</p>";
//	contenido += "<p style='margin:0px'>tomar en cuenta la siguiente información:</p>";

//	contenido += "<table style='width:100%;border-collapse: collapse'>";
//	contenido += "<tr><td style='width:100px'>Girar a</td><td>" + sucursal[2] + "</td></tr>";
//	contenido += "<tr><td style='width:100px'>RUC</td><td>" + sucursal[7] + "</td></tr>";
//	contenido += "<tr><td style='width:100px'>Sucursal</td><td>" + sucursal[1] + "</td></tr>";
//	contenido += "<tr><td style='width:100px'>Dirección</td><td>" + sucursal[3] + "</td></tr></table>";
//	contenido += "<p style='margin:0px'>Descripción Servicios Médicos en Consultas del " + Periodo[5] + " al " + Periodo[6] + "</p>";


//	var totales = 0;
//	for (var m = 0; m < 3; m++) {
//		switch (m) {
//			case 0:
//				for (var h = 0; h < aDetalle.length; h++) {
//					totales += aDetalle[h][23];
//				}
//				break;
//			case 1:
//				for (var h = 0; h < aHorario.length; h++) {
//					totales += aHorario[h][6];
//				}
//				break;
//			case 2:
//				for (var h = 0; h < aMtoFijo.length; h++) {
//					totales += (aMtoFijo[h][6]*1);
//				}
//				break;
//		}
//	}
//	var descuento = totales * (aMedicos[0][5] / 100);
//	var TotalGeneral = 0;
//	if (aMedicos[0][6] == "I") {
//		TotalGeneral = totales + descuento;
//	} else {
//		TotalGeneral = totales - descuento;
//		descuento = (descuento) * -1;
//	}

//	contenido += "<table style='width:700px;border-collapse: collapse'>";
//	contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Valor venta</td><td style='text-align:right;width:100px'>" + (totales).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
//	contenido += "<tr><td style='width:200px'>Tipo Admisión: " + Periodo[4] + "</td><td style='width:100px'>IGV/Renta</td><td style='text-align:right;width:100px'>" + (descuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
//	contenido += "<tr><td style='width:200px'></td><td style='width:100px'>Total</td><td style='text-align:right;width:100px'>" + (TotalGeneral).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td><td></td><td></td></tr>";
//	var lt = NumeroALetras(Math.abs(TotalGeneral));
//	contenido += "<tr><td colspan='5'>Son: " + lt + "</td></tr></table>";
//	contenido += "</body></html>";
//	var url = urlBase + "Control/generarPDF/?ss=" + ss + "&anio=" + Periodo[2] + "&mes=" + Periodo[3];
//	nombrePDF = Periodo[2] + "-" + Periodo[3] + "-" + Periodo[4].charAt(0) + "-" + factura[1];
//	$.ajax(url, "post", listarPDF, contenido);
//}