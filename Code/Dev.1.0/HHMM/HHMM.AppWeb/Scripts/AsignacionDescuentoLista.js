var listaPrincipal = [];
var matrizPrincipal = [];
var listaDetalle = [];
var matrizDetalle = [];
var listaTipoDescuento;
var listaDescuento;
var listaTipoDocumento;
var cabecerasPrincipal = ["Sucursal", "Contrato", "Fecha Inicio", "Fecha Final", "Ind.Vcto.", "Medico", "Especialidad", "Empresa", "Estado"];
var anchosPrincipal = [15, 10, 10, 10, 5, 15, 12, 13, 10];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 7, 8, 9, 10];
var cabecerasDetalle = ["Descuento", "Descripción", "Importe", "Ind. Fact", "Tipo Monto", "Fecha Inicio", "Fecha Final", "Estado"];
var anchosDetalle = [10, 25, 10, 10, 10, 10, 10, 15];
var matrizIndiceDetalle = [2, 8, 3, 4, 5, 6, 7, 9];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var idContrato = -1;
var Campoeliminar = "";
var sucursalId;
var sucursal;
var idMedico = 0;
var idContratoDetalle = 0;
var mensajeValidacion = [];
var idEmpresa = 0;
var MedicoActual = "";
var matrizSeguridad = [];
window.onload = function () {
	matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	var pos1 = window.location.href.indexOf("Configuracion");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Configuracion/listasAsignacionDescuento/?ss=" + ss;
	$.ajax(url, "get", listarCombos);

	var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
	txtBusquedaFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
	txtBusquedaFechaFin.DatePickerX.init({
		mondayFirst: true
	});
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	crearTabla("Principal|0");
	crearTabla("Detalle|1");
	configurarOrdenacion("Principal|0");
	configurarOrdenacion("Detalle|1");
	ConfiguracionControles();
	configurarFiltro();

}
function listarCombos(rpta) {
	if (rpta != "") {
		var listas = rpta.split("¬");
		listaTipoDescuento = listas[0].split("¯");
		listaDescuento = listas[1].split("¯");
		listaTipoDocumento = listas[2].split("¯");
		var listaEspecialidad = listas[3].split("¯");
		llenarCombo(listaTipoDescuento, "ddlTipoDescuento");
		llenarCombo(listaDescuento, "ddlDescuento");
		llenarCombo(listaEspecialidad, "ddlBusquedaEspecialidad", "");
		var txtBusquedaSucursal = document.getElementById("txtBusquedaSucursal");
		txtBusquedaSucursal.value = sucursal;
		configuracionInicial();
	}
}

function ConfiguracionControles() {
	var btnBusqueda = document.getElementById("btnBusqueda");
	btnBusqueda.onclick = function () {
		Buscar();
	}

	var btnBusquedaLimpiar = document.getElementById("btnBusquedaLimpiar");
	btnBusquedaLimpiar.onclick = function () {
		var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
		var txtBusquedaCodigo = document.getElementById("txtBusquedaCodigo");
		var ddlBusquedaEspecialidad = document.getElementById("ddlBusquedaEspecialidad");
		var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
		var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
		var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
		idMedico = "";
		idEmpresa = "";
		txtBusquedaMedico.value = "";
		txtBusquedaCodigo.value = "";
		txtBusquedaFechaInicio.value = "";
		txtBusquedaFechaFin.value = "";
		ddlBusquedaEspecialidad.value = "";
		txtBusquedaEmpresa.value = "";
	}

	var spnDoctor = document.getElementsByClassName("spnDoctor");
	for (var x = 0; x < spnDoctor.length; x++) {
		spnDoctor[x].onclick = function () {
			var ifrMedico = document.getElementById("ifrMedico");
			if (ifrMedico.innerHTML == "") {
				ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
			}
			abrirPopup("PopupMedico");
		}
	}

	var spnEmpresaBusqueda = document.getElementById("spnEmpresaBusqueda");
	spnEmpresaBusqueda.onclick = function () {
		var ifrEmpresa = document.getElementById("ifrEmpresa");
		if (ifrEmpresa.innerHTML == "") {
			ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupEmpresa");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "-1") {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var datos = this.value.split("¦");
			idMedico = datos[0];
			var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
			txtBusquedaMedico.value = datos[1];
		}
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			idEmpresa = datos[0];
			var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
			txtBusquedaEmpresa.value = datos[1];
		}
	}



	var btnDoctorCancelar = document.getElementById("btnDoctorCancelar");
	btnDoctorCancelar.onclick = function () {
		var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
		var divDoctor = document.getElementById("divDoctor");
		divBusquedaDoctor.style.display = "";
		divDoctor.style.display = "none";
		idMedico = MedicoActual;
		var spnDoctor = document.getElementsByClassName("spnDoctor");
		for (var x = 0; x < spnDoctor.length; x++) {
			spnDoctor[x].style.pointerEvents = "auto";
		}
	}

	var txtDescuentoFechaInicio = document.getElementById("txtDescuentoFechaInicio");
	txtDescuentoFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtDescuentoFechaInicio.readOnly = false;

	var txtDescuentoFechaFin = document.getElementById("txtDescuentoFechaFin");
	txtDescuentoFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtDescuentoFechaFin.readOnly = false;

	var chkComprobante = document.getElementById("chkComprobante");
	chkComprobante.onclick = function () {
		var ddlDescuentoTipoComprobante = document.getElementById("ddlDescuentoTipoComprobante");
		if (this.checked) {
			ddlDescuentoTipoComprobante.className = "";
			ddlDescuentoTipoComprobante.disabled = false;
		}
		else {
			ddlDescuentoTipoComprobante.className = "lectura";
			ddlDescuentoTipoComprobante.disabled = true;
			ddlDescuentoTipoComprobante.value = "";
		}
	}

	var btngrabarDescuento = document.getElementById("btngrabarDescuento");
	btngrabarDescuento.onclick = function () {
		if (validarDescuento()) {
			var hdfOpcConf = document.getElementById("hdfOpcConf").value;
			var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
			var ddlTipoDescuento = document.getElementById("ddlTipoDescuento").value;
			var ddlDescuento = document.getElementById("ddlDescuento").value;
			var txtDescuentoImporte = document.getElementById("txtDescuentoImporte").value;
			var chkComprobante = document.getElementById("chkComprobante").checked;
			var txtDescuentoDescripcion = document.getElementById("txtDescuentoDescripcion").value;
			var txtDescuentoFechaInicio = document.getElementById("txtDescuentoFechaInicio").value;
			var txtDescuentoFechaFin = document.getElementById("txtDescuentoFechaFin").value;
			var ddlDescuentoTipoComprobante = document.getElementById("ddlDescuentoTipoComprobante").value;
			var strDatos = "";
			if (hdfOpcConf == "1") {
				strDatos += "1|";
			}
			else {
				strDatos += "2|";
			}
			strDatos += txtDoctorCodigo + "|" + txtDescuentoFechaInicio + "|" + txtDescuentoFechaFin + "|" + ddlTipoDescuento + "|" + ddlDescuento + "|" + txtDescuentoImporte + "|" + (chkComprobante ? "True" : "False") + "|";
			strDatos += ddlDescuentoTipoComprobante + "|" + txtDescuentoDescripcion;
			if (hdfOpcConf == "2") {
				strDatos += "|" + idContratoDetalle;
			}
			var url = urlBase + "Configuracion/grabarDescuento/?ss=" + ss;
			$.ajax(url, "post", mostrarGrabar, strDatos);
			abrirPopup("PopupDescuento");
		}
	}

	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1 = matrizDetalle[Campoeliminar][0];
		var valor2 = matrizDetalle[Campoeliminar][9];
		anularPrincipal(valor1, valor2);
	}

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

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		var nRegistros = matrizDetalle.length;
		if (nRegistros > 0) {
			exportacion();
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "MédicoDescuentos.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}

	var ddlTipoDescuento = document.getElementById("ddlTipoDescuento");
	ddlTipoDescuento.onchange = function () {
		llenarCombo(listaDescuento, "ddlDescuento");
	}
}

function mostrarGrabar(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		switch (data[1]) {
			case "1":
				var cabecera = document.getElementsByName("cabeceraDetalle");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha añadido un nuevo registro");
				listarDoctor(data[0]);
				break;
			case "2":
				var cabecera = document.getElementsByName("cabeceraD");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha actualizado un registro");
				listarDoctor(data[0]);
				break;
			case "3":
				var cabecera = document.getElementsByName("cabeceraD");
				for (var x = 0; x < cabecera.length; x++) {
					cabecera[x].value = "";
				}
				mostraralerta("Se ha actualizado el estado de un registro");
				mostrarDoctor(idMedico);
				break;
		}
	}
}

function recargarIframe(objeto) {
	var iframe = document.getElementById(objeto).firstChild;
	var txt = iframe.contentWindow.document.getElementsByClassName('Texto');
	for (var x = 0; x < txt.length; x++) {
		if (txt[x].nodeName == "SELECT") {
			txt[x].selectedIndex = "0";
		}
		else {
			txt[x].value = "";
		}
	}
	iframe.contentWindow.filtrar();
}

function Buscar() {
	var divPrincipal = document.getElementById("divPrincipal");
	divPrincipal.style.display = "";
	var url = urlBase + "Configuracion/listarMedicoContrato/?ss=" + ss;
	var txtBusquedaMedico = idMedico;
	var txtBusquedaCodigo = document.getElementById("txtBusquedaCodigo").value;
	var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio").value;
	var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin").value;
	var ddlBusquedaEspecialidad = document.getElementById("ddlBusquedaEspecialidad").value;
	var txtBusquedaEmpresa = idEmpresa;
	var strDatos = sucursalId + "|" + txtBusquedaMedico + "|" + txtBusquedaCodigo + "|" + txtBusquedaFechaInicio + "|" + txtBusquedaFechaFin + "|" + (txtBusquedaEmpresa == "" ? 0 : txtBusquedaEmpresa) + "|" + (ddlBusquedaEspecialidad == "" ? 0 : ddlBusquedaEspecialidad)+"|false";
	$.ajax(url, "post", listarTodo, strDatos);
}

function listarTodo(rpta) {
	if (rpta != "") {
		listaPrincipal = rpta.split("¯");
		listarPrincipal();
	}
	else {
		matrizPrincipal = [];
		var contenido = "";
		var nCabeceras = cabecerasPrincipal.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbPrincipal").innerHTML = contenido;
		document.getElementById("tdPaginasPrincipal").innerHTML = "";
	}
}

function listarPrincipal(irUltimaPagina) {
	crearMatriz("Principal|0");
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, "Principal|0");
	else {
		paginar(0, "Principal|0");
		indiceActualBloque = 0;
	}
}

function paginar(indicePagina, elemento) {

	var identificador = elemento.split("|");
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
	var nRegistros = window["matriz" + identificador[0]].length;
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

function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador[1]) {
		case "0":
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' style='display:none'></span></th>";
			break;
		case "1":
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
			if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
				contenido += "<span class='Icons fa-plus' onclick='EscogerConfiguracionPago(true,\"Descuento\");abrirPopup(\"PopupDescuento\");'";
				contenido += "></span>";
			}
			contenido +="</th>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador[0]][j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		switch (identificador[1]) {
			case "0":
				if (j == 0) {
					contenido += "'>";
				}
				else {
					contenido += "' class='Enlace";
					contenido += identificador[0];
					contenido += "-";
					contenido += identificador[1];
					contenido += "' data-orden='";
					contenido += window["matrizIndice" + identificador[0]][j];
					contenido += "'>";

				}
				break;
			default:
				contenido += "' class='Enlace";
				contenido += identificador[0];
				contenido += "-";
				contenido += identificador[1];
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador[0]][j];
				contenido += "'>";

				break;
		}
		contenido += window["cabeceras" + identificador[0]][j];
		contenido += "</span><br/>";
		if (j > 0 || identificador[1] != "0") {
			switch (identificador[1]) {
				case "0":
					switch (j) {
						case (nCampos - 1):
							contenido += "<select class='Combo";
							contenido += identificador[0];
							contenido += "' name='cabecera";
							contenido += identificador[0];
							contenido += "' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
							break;
						default:
							contenido += "<input type='text' class='Texto";
							contenido += identificador[0];
							contenido += "' name='cabecera";
							contenido += identificador[0];
							contenido += "' style='width:90%'>";
							break;
					}
					break;
				default:
					switch (j) {
						case (nCampos - 1):
							contenido += "<select class='Combo";
							contenido += identificador[0];
							contenido += "' name='cabecera";
							contenido += identificador[0];
							contenido += "' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
							break;
						default:
							contenido += "<input type='text' class='Texto";
							contenido += identificador[0];
							contenido += "' name='cabecera";
							contenido += identificador[0];
							contenido += "' style='width:90%'>";
							break;
					}
					break;
			}
		}
		contenido += "</th>";
	}
	if (identificador[1] != "0") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
			contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcel'></a>";
		}
		contenido +="</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	switch (identificador[1]) {
		case "0":
			contenido += (nCampos + 1).toString();
			break;
		default:
			contenido += (nCampos + 2).toString();
			break;
	}
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
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
			switch (identificador[1]) {
				case "0":
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 7 || j == 8 || j == 4) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					break;
				default:
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 8) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					break;
			}
			x++;
		}
	}
	else {
		window["matriz" + identificador[0]] = [];
	}

}

function mostrarMatriz(indicePagina, elemento) {
	indiceActualPagina = indicePagina;
	var identificador = elemento.split("|");
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
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
				nCampos = window["cabecerasPrincipal"].length;
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";
						if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
							contenido +="<span class='Icons fa-edit' onclick='limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
							contenido += window["matriz" + identificador[0]][i][1];
							contenido += ")'></span>";
						}
						contenido +="</td>";
						for (var j = 0; j < nCampos; j++) {
								contenido += "<td>";
								if (j == (nCampos - 1)) {
									contenido += (window["matriz" + identificador[0]][i][matrizIndicePrincipal[j]] == "A" ? "ACTIVO" : "INACTIVO");
								}
								else {
									switch (j) {
										case 0:
											contenido += sucursal;
											break;
										case 2:
											contenido += formatearfecha(window["matriz" + identificador[0]][i][matrizIndicePrincipal[j]]);
											break;
										case 3:
											contenido += formatearfecha(window["matriz" + identificador[0]][i][matrizIndicePrincipal[j]]);
											break;
										default:
											contenido += window["matriz" + identificador[0]][i][matrizIndicePrincipal[j]];
											break;
									}

								}
								contenido += "</td>";
							
						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "1":
				var valor;
				for (var i = inicio; i < fin; i++) {
					camposSecuencia = "";
					if (i < n) {
						camposSecuencia += window["matriz" + identificador[0]][i][0];
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'>";
						if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
							contenido +="<span class='Icons fa-edit' onclick='EscogerConfiguracionPago(false,\"Descuento\",\"";
							contenido += camposSecuencia;
							contenido += "\");abrirPopup(\"PopupDescuento\");'";
							contenido += "></span>";
						}
						contenido +="</td>";
						for (var j = 1; j < nCampos - 1; j++) {
							switch (j) {
								case 1:
									contenido += "<td>";
									for (var x = 0; x < listaDescuento.length; x++) {
										valor = listaDescuento[x].split("¦");
										if (window["matriz" + identificador[0]][i][2] == (valor[0] * 1)) {
											contenido += valor[1];
											break;
										}
									}
									break;
								case 2:
									contenido += "<td>";
									contenido += window["matriz" + identificador[0]][i][8];
									break;
								case 3:
									contenido += "<td style='text-align:right'>";
									contenido += window["matriz" + identificador[0]][i][j].toFixed(2);
									break;
								case 4:
									contenido += "<td style='text-align:center'>";
									contenido += "<input type='checkbox' ";
									contenido += (window["matriz" + identificador[0]][i][j] == "True" ? "checked" : "");
									contenido += " disabled/>";
									break;
								case 5:
									contenido += "<td style='text-align:center'>";
									contenido += (window["matriz" + identificador[0]][i][j] == "V" ? "Monto Variable" : "Monto Fijo");
									break;
								case 6:
									contenido += "<td>";
									contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
									break;
								case 7:
									contenido += "<td>";
									contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
									break;
								case 8:
									contenido += "<td>";
									contenido += (window["matriz" + identificador[0]][i][9] == "A" ? "ACTIVO" : "INACTIVO");
									break;
									//case 6:
									//    contenido += (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje"));
									//    break;
								default:
									contenido += "<td>";
									contenido += window["matriz" + identificador[0]][i][j];
									break;
							}
							contenido += "</td>";

						}
						contenido += "<td style='text-align:center'>";
						if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
							contenido +="<span class='Icons ";
							contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" ? "fa-trash-o" : "fa-check");
							contenido += "' onclick='abrirPopup(";
							contenido += '"PopupEstado"';
							contenido += ");Campoeliminar=";
							contenido += i;
							contenido += "'";
							contenido += "></span>";
						}
						contenido +="</td>";
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

function anularPrincipal(id, estado) {
	var url = urlBase + "Configuracion/anularDescuento/?ss=" + ss + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A");
	$.ajax(url, "get", mostrarGrabar);
	abrirPopup('PopupEstado');

}

function EscogerConfiguracionPago(valor, opcion, id) {
	var hdfOpcConf = document.getElementById("hdfOpcConf");
	var TituloDescuento = document.getElementById("TituloDescuento");
	var spnHistorial = document.getElementById("spnHistorial");
	if (valor) {
		hdfOpcConf.value = "1";
		TituloDescuento.innerHTML = "AGREGAR DESCUENTO";
		spnHistorial.style.display = "none";
	}
	else {
		hdfOpcConf.value = "2";
		TituloDescuento.innerHTML = "MODIFICAR DESCUENTO";
		spnHistorial.style.display = "";
	}

	var limpiar = document.getElementsByName("limpiar" + opcion);
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
		if (limpiar[y].id.indexOf("Estado") > -1) {
			limpiar[y].value = "ACTIVO";
		}
		else {
			if (limpiar[y].type == "checkbox") {
				limpiar[y].checked = false;
			} else {
				if (limpiar[y].nodeName == "SELECT") {
					limpiar[y].selectedIndex = "0";
					if (limpiar[y].id == "ddlTipoDescuento") {
						limpiar[y].onchange();
					}
				}
				else {
					limpiar[y].value = "";
				}
			}
		}
	}
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	var txtDescuentoFechaInicio = document.getElementById("txtDescuentoFechaInicio");
	var txtDescuentoFechaFin = document.getElementById("txtDescuentoFechaFin");
	var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio").value;
	var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin").value;
	txtDescuentoFechaInicio.value = txtDoctorFechaInicio;
	txtDescuentoFechaFin.value = txtDoctorFechaFin;

	if (valor == false && valor != undefined) {
		idContratoDetalle = id;
		var hdfCd = document.getElementById("hdfCd");
		hdfCd.value = id;
		var url = urlBase + "Configuracion/listarDescuentoPorId/?ss=" + ss + "&id=" + id;
		$.ajax(url, "get", listarDetalleDoctor);
	}
}

function listarDetalleDoctor(rpta) {
	if (rpta != "") {
		var data = rpta.split("¦");
		var ddlTipoDescuento = document.getElementById("ddlTipoDescuento");
		var ddlDescuento = document.getElementById("ddlDescuento");
		var txtDescuentoImporte = document.getElementById("txtDescuentoImporte");
		var chkComprobante = document.getElementById("chkComprobante");
		var txtDescuentoDescripcion = document.getElementById("txtDescuentoDescripcion");
		var txtDescuentoFechaInicio = document.getElementById("txtDescuentoFechaInicio");
		var txtDescuentoFechaFin = document.getElementById("txtDescuentoFechaFin");
		ddlTipoDescuento.value = data[1];
		ddlTipoDescuento.onchange();
		ddlDescuento.value = data[2];
		txtDescuentoImporte.value = data[3];
		if (data[4] == "True") {
			chkComprobante.click();
			var ddlDescuentoTipoComprobante = document.getElementById("ddlDescuentoTipoComprobante");
			ddlDescuentoTipoComprobante.value = data[5];
		}
		txtDescuentoFechaInicio.value = formatearfecha(data[6].split(" ")[0]);
		txtDescuentoFechaFin.value = formatearfecha(data[7].split(" ")[0]);
		txtDescuentoDescripcion.value = data[8];
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
	var valX;
	var valY;
	if (orden[1] == "Principal") {
		valX = ((indice == 3 || indice == 4) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
		valY = ((indice == 3 || indice == 4) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
	}
	else {
		valX = ((indice == 6 || indice == 7) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
		valY = ((indice == 6 || indice == 7) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
	}
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
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
	var variableContador = (identificador[0] == "Principal" ? 1 : 0);
	for (var i = 0; i < nRegistros; i++) {
		campos = window["lista" + identificador[0]][i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		for (var k = variableContador; k < nFiltrados; k++) {
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
			switch (identificador[1]) {
				case "0":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 7 || j == 8 || j == 4) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
					break;
				default:
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
					break;
			}

		}
	}
	indiceActualBloque = 0;
	paginar(0, elemento);
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
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
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


function mostrarDoctor(elemento) {
	var nRegistros = matrizPrincipal.length;
	var valor;
	var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa");
	var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
	var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio");
	var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin");
	var txtDoctorObservacion = document.getElementById("txtDoctorObservacion");
	var url = "";
	for (var x = 0; x < nRegistros; x++) {
		valor = matrizPrincipal[x][1];
		if ((valor * 1) == elemento) {
			var hdfMedicoDet = document.getElementById("hdfMedicoDet");
			hdfMedicoDet.value = elemento;
			var txtBusquedaMedico = document.getElementById("txtBusquedaMedico").value;
			if (txtBusquedaMedico != "") {
				MedicoActual = matrizPrincipal[x][5];
			}
			else {
				MedicoActual = "";
			}
			idMedico = elemento;
			txtDoctorEmpresa.value = matrizPrincipal[x][6];
			txtDoctorCodigo.value = matrizPrincipal[x][1];
			txtDoctorFechaInicio.value = formatearfecha(matrizPrincipal[x][2]);
			txtDoctorFechaFin.value = formatearfecha(matrizPrincipal[x][3]);
			txtDoctorObservacion.value = matrizPrincipal[x][7];
			url = urlBase + "Configuracion/listarDescuento/?ss=" + ss + "&id=" + idMedico;
			$.ajax(url, "get", listarDoctor);
			break;
		}

	}
}

function listarDoctor(rpta) {
	listaDetalle = rpta.split("¯");
	matrizDetalle = [];
	crearMatriz("Detalle|1");
	paginar(0, "Detalle|1");
}

function EscogerDetalle(valor) {
	var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
	var divDoctor = document.getElementById("divDoctor");
	var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio");
	var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin");
	var hdfOpc = document.getElementById("hdfOpc");
	var spnDoctor = document.getElementsByClassName("spnDoctor");
	if (valor) {
		hdfOpc.value = "1";
		for (var x = 0; x < spnDoctor.length; x++) {
			spnDoctor[x].style.pointerEvents = "auto";
		}
	}
	else {
		hdfOpc.value = "2";
		for (var x = 0; x < spnDoctor.length; x++) {
			spnDoctor[x].style.pointerEvents = "none";
		}
	}

	divBusquedaDoctor.style.display = "none";
	divDoctor.style.display = "";
	var txtDoctorSucursal = document.getElementById("txtDoctorSucursal");
	txtDoctorSucursal.value = sucursal;
}

function limpiarFormulario(opcion) {
	if (opcion == undefined) {
		opcion = "";
	}
	listaChecks = [];
	var limpiar
	if (opcion == 0) limpiar = document.getElementsByName("limpiar");
	else limpiar = document.getElementsByName("limpiar" + opcion);
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
		if (y == (limpiar.length - 1) && opcion != "") {
			limpiar[y].value = "ACTIVO";
		}
		else {
			if (limpiar[y].type == "checkbox") {
				limpiar[y].checked = false;
			} else {
				if (limpiar[y].nodeName == "SELECT") {
					limpiar[y].selectedIndex = "0";
				}
				else {
					limpiar[y].value = "";
				}
			}
		}
	}
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

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function llenarCombo(lista, nombreCombo, titulo, cabecera) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	if (cabecera == undefined) {
		contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
	}
	if (nombreCombo == "ddlDescuento") {
		var valor = document.getElementById("ddlTipoDescuento").value;
		if (lista != "") {
			for (var x = 0; x < n; x++) {
				campos = lista[x].split("¦");
				if (campos[2] == valor) {
					contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
				}
			}
		}
	}
	else {
		if (lista != "") {
			for (var x = 0; x < n; x++) {
				campos = lista[x].split("¦");
				contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
			}
		}
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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

		if (Texto.id.toLowerCase().indexOf("inicio") > -1) {
			var txtFechaFin = document.getElementById("txtDescuentoFechaFin");
			var Inicio = fechaUTC(Texto.value);
			var Fin = fechaUTC(txtFechaFin.value);
			if (Inicio > Fin) {
				return 'La fecha de inicio no puede ser mayor a la de fin';
			}
		}
		else {
			var txtFechaInicio = document.getElementById("txtDescuentoFechaInicio");
			var Fin = fechaUTC(Texto.value);
			var Inicio = fechaUTC(txtFechaInicio.value);
			if (Fin < Inicio) {
				return 'La fecha de fin no puede ser menor a la de inicio';
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

function validarCombo(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
				return 'Seleccione ' + Mensaje;
			}
		}
	}
	return "";
}

function validarDescuento() {
	var ddlTipoDescuento = document.getElementById("ddlTipoDescuento");
	var ddlDescuento = document.getElementById("ddlDescuento");
	var txtDescuentoImporte = document.getElementById("txtDescuentoImporte");
	var chkComprobante = document.getElementById("chkComprobante");
	var txtDescuentoDescripcion = document.getElementById("txtDescuentoDescripcion");
	var txtDescuentoFechaInicio = document.getElementById("txtDescuentoFechaInicio");
	var txtDescuentoFechaFin = document.getElementById("txtDescuentoFechaFin");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	var mensajeTipoDescuento = validarCombo(ddlTipoDescuento.id, "tipo de descuento", true);
	if (mensajeTipoDescuento != "") {
		mensajeValidacion[ddlTipoDescuento.getAttribute("data-secuencia")] = mensajeTipoDescuento;
		ddlTipoDescuento.className += " error";
	}
	var mensajeDescuento = validarCombo(ddlDescuento.id, "descuento", true);
	if (mensajeDescuento != "") {
		mensajeValidacion[ddlDescuento.getAttribute("data-secuencia")] = mensajeDescuento;
		ddlDescuento.className += " error";
	}
	var mensajeImporte = validarTexto(txtDescuentoImporte.id, "importe", true);
	if (mensajeImporte != "") {
		mensajeValidacion[txtDescuentoImporte.getAttribute("data-secuencia")] = mensajeImporte;
		txtDescuentoImporte.className += " error";
	}
	if (chkComprobante.checked) {
		var ddlDescuentoTipoComprobante = document.getElementById("ddlDescuentoTipoComprobante");
		var mensajeTipoComprobante = validarCombo(ddlDescuentoTipoComprobante.id, "tipo de comprobante", true);
		if (mensajeTipoComprobante != "") {
			mensajeValidacion[ddlDescuentoTipoComprobante.getAttribute("data-secuencia")] = mensajeTipoComprobante;
			ddlDescuentoTipoComprobante.className += " error";
		}
	}
	var mensajeDescripcion = validarTexto(txtDescuentoDescripcion.id, "descripción", true);
	if (mensajeDescripcion != "") {
		mensajeValidacion[txtDescuentoDescripcion.getAttribute("data-secuencia")] = mensajeDescripcion;
		txtDescuentoDescripcion.className += " error";
	}

	var mensajeFechaInicio = validarFecha(txtDescuentoFechaInicio.id, "fecha inicio", true);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtDescuentoFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtDescuentoFechaInicio.className += " error";
	}

	var mensajeFechaFin = validarFecha(txtDescuentoFechaFin.id, "fecha fin", true);
	if (mensajeFechaFin != "") {
		mensajeValidacion[txtDescuentoFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
		txtDescuentoFechaFin.className += " error";
	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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

function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
	cabecera += "<tr><td style='width:150px'>Sucursal</td><td>";
	cabecera += document.getElementById("txtDoctorSucursal").value;
	cabecera += "</td></tr><tr><td style='width:150px'>Médico</td><td>";
	cabecera += document.getElementById("txtDoctorEmpresa").value;
	cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 150px'>Tipo de Descuento</td>";
	cabecera += "<td style='width: 100px'>Descuento</td>";
	cabecera += "<td style='width: 100px'>Importe</td>";
	cabecera += "<td style='width: 100px'>Ind Fact</td>";
	cabecera += "<td style='width: 100px'>Monto Fijo</td>";
	cabecera += "<td style='width: 100px'>Fecha Inicio</td>";
	cabecera += "<td style='width: 100px'>Fecha Fin</td>";
	cabecera += "<td style='width: 210px'>Descripción</td>";
	cabecera += "<td style='width: 60px'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matrizDetalle.length;
	var nCampos = matrizDetalle[0].length;
	var contenido = [];
	excelExportar = crearCabeceraExportar();
	var valor;
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (j = 1; j < nCampos; j++) {
			if (j == (nCampos - 1)) {
				contenido.push("<td>" + (matrizDetalle[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>");
			} else {
				switch (j) {
					case 1:
						for (var x = 0; x < listaTipoDescuento.length; x++) {
							valor = listaTipoDescuento[x].split("¦");
							if (matrizDetalle[i][j] == (valor[0] * 1)) {
								contenido.push("<td>" + valor[1] + "</td>");
								break;
							}
						}
						break;
					case 2:
						for (var x = 0; x < listaDescuento.length; x++) {
							valor = listaDescuento[x].split("¦");
							if (matrizDetalle[i][j] == (valor[0] * 1)) {
								contenido.push("<td>" + valor[1] + "</td>");
								break;
							}
						}
						break;
					case 3:
						contenido.push("<td>" + matrizDetalle[i][j].toFixed(2) + "</td>");
						break;
					case 4:
						contenido.push("<td>" + (matrizDetalle[i][j] == "True" ? "SI" : "NO") + "</td>");
						break;
					case 5:
						contenido.push("<td>" + (matrizDetalle[i][j] == "F" ? "Monto Fijo" : "Monto Variable") + "</td>");
						break;
					default:
						contenido.push("<td>" + matrizDetalle[i][j] + "</td>");
						break;
				}
			}

		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
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
			ifrHistorial.innerHTML = "<iframe style='margin:0;padding:0;width:800px;height:400px;border: 1px solid transparent;' src='" + url + "'></iframe>";
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

