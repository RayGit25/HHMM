var lista = [];
var listaConfiguracion = [];
var listaProvision = [];
var listaTipoAdmision = [];
var listaPeriodo = [];
var matriz = [];
var matrizTipoAdmision = [];
var matrizPeriodo = [];
var matrizDetalle = [];
var cabeceras = ["Sucursal", "Nro. Proceso", "Periodo", "Descripcion", "Fecha Inicio", "Fecha Final", "Tipo de Admisión", "Cant.", "Monto Provisión", "Estado Provisión"];
var anchos = [10, 8, 8, 11, 8, 8, 10, 5, 10, 12];
var matrizIndice = [-1, 0, 3, 15, 4, 5, 6, 7, 8, 9];
var cabecerasDetalle = ["Empresa", "Médico", "Especialidad", "Importe", "Bonificación", "Descuento", "Ajuste", "Total", "Error", "Estado"];
var anchosDetalle = [10, 20, 10, 10, 10, 10, 10, 10, 5, 5];
var matrizIndiceDetalle = [16, 1, 13, 2, 3, 4, 5, 6, 7, 8];

var cabecerasProduccion = ["PersonaId", "Médico", "Ind. Vinculada", "Orden AtencionId", "Linea OA", "Tipo Admision Id", "Tipo Admisión", "Servicio Id", "Servicio", "Especialidad Id", "Especialidad", "Clasificador Movimiento Id", "Clasificador Movimiento", "Código Prestacion", "Prestación"];
var anchosProduccion = [80, 300, 90, 115, 80, 110, 150, 80, 200, 110, 150, 170, 180, 110, 300];
var matrizProduccion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var cabecerasMontoFijo = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Concepto Monto Fijo Id", "Concepto Monto Fijo"];
var anchosMontoFijo = [10, 8, 8, 11, 8, 8, 10];
var matrizMontoFijo = [0, 1, 2, 3, 4, 5, 6];

var cabecerasHorario = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Unidad MedicaId", "Unidad Médica"];
var anchosHorario = [10, 8, 8, 11, 8, 8, 10];
var matrizHorario = [0, 1, 2, 3, 4, 5, 6];

var cabecerasTurno = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Unidad MedicaId", "Unidad Médica"];
var anchosTurno = [10, 8, 8, 11, 8, 8, 10];
var matrizTurno = [0, 1, 2, 3, 4, 5, 6];

var indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0;
var indiceOrden = 0;
var indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0;
var esBloque = 0;
var listaProduccion = [], listaMontoFijo = [], listaHorario = [], listaTurno = [];
var matrizProduccion = [], matrizMontoFijo = [], matrizHorario = [], matrizTurno;



var registrosPagina = 7;
var registroPaginaDetalle = 7;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var excelExportarDetalle = "";
var mensajeValidacion = [];
var urlBase = "";
var idProceso = -1;
var tituloPoup = "";
var Campoeliminar = "";
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var ss;
var IndicadorPrimero = true;
var SeleccionActualProceso = "P";
var idProvision = 0;
var MedicosSeleccionados = [];
var sucursalId;
var idProvisionEnMatriz;
var NombreControl = "";
var ProcesoMedicoActual = 0;
var cabeceraEnvio = "";
var inicioEnvio = 0;
var registroEnviar = 10;
var nEnvios = 0;
var cEnvios = 0;
var datosCalculados = 0;
var ConfiguracionPagoActual = 0;
var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}
var listaEmpresaMedico = [];
var listaEmpresaMedicoEspecialidad = [];
var matrizSeguridad = [];
var totales = { mtImporte: 0, mtBonificacion: 0, mtDescuento: 0, mtAjuste: 0, mtTotal: 0 }, esPagina = false;;
var ocultarPorProvision = true;
var primerQuery = true;
var SehaRevertido = false;
var matrizMensaje = [];
function requestServer(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url);
	var divBloqueo = document.getElementById('divBloqueo');
	if (divBloqueo !== null) divBloqueo.classList.add('bloquear');
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (divBloqueo !== null) divBloqueo.classList.remove('bloquear');
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload")
				window.parent.parent.location.reload();
			success(xhr.responseText);
		}
	}
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
	setTimeout(function () {
		if (divBloqueo !== null) divBloqueo.classList.remove('bloquear');
	}, 30 * 1000);
}

window.onload = function () {
	matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
	if (matrizSeguridad.length > 0) {
		if (((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnDetalleCalcular");
		}
		if (((matrizSeguridad[6].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnDetalleAutorizar");
		}
		if (((matrizSeguridad[7].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnDetalleRevertir");
		}
		if (((matrizSeguridad[8].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnDetalleProvisionar");
		}
		if (((matrizSeguridad[9].split("¦")[2] * 1) != 1)) {
			removeSeguridad("btnDetalleRevertirProvisionado");
		}
	}
	var ppcabecera = document.getElementById("ppcabecera");
	ppcabecera.onresize = function () {
		var valor = (this.getBoundingClientRect().width - 180);
		document.getElementById("CerrarProvisionDetalleConceptosOA").style.width = valor + "px";
	}
	estableceSucursal();
	buscarListas();
	configurarControles();
	definirAltura();
	
	if (location.protocol === 'http:') configurarSocket("ws://" + document.getElementById("hdfSk").value);
	else if (location.protocol === 'https:') configurarSocket("wss://" + document.getElementById("hdfSk").value);
}

function removeSeguridad(id) {
	var elem = document.getElementById(id);
	return elem.parentNode.removeChild(elem);
}


function definirAltura() {
	var altura = window.parent.document.getElementById("ifrPrincipal").getBoundingClientRect().height;
	var PopupObservado = document.getElementById("PopupObservado");
	var PopupError = document.getElementById("PopupError");
	if (altura > 840) {
		PopupObservado.getElementsByTagName("DIV")[0].style.height = "68%";
		PopupError.getElementsByTagName("DIV")[0].style.height = "68%";
	}
	else if (altura > 700) {
		PopupObservado.getElementsByTagName("DIV")[0].style.height = "82%";
		PopupError.getElementsByTagName("DIV")[0].style.height = "82%";
	}
	else {
		PopupObservado.getElementsByTagName("DIV")[0].style.height = "92%";
		PopupError.getElementsByTagName("DIV")[0].style.height = "92%";
	}
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	var ppcabecera = window.parent.document.getElementById("ifrPrincipal").getBoundingClientRect().width;
	var menu = window.parent.document.getElementsByTagName("ASIDE")[0];
	var valor = 0;
	if (menu.className == "pcl-menu activo") {
		valor = (ppcabecera - 500);
	}
	else {
		valor = (ppcabecera - 230);
	}
	document.getElementById("CerrarProvisionDetalleConceptosOA").style.width = valor + "px";
	document.getElementById("CerrarProvisionError").style.width = valor + "px";
	document.getElementById("CerrarProvisionObservado").style.width = valor + "px";
	definirAltura();
}

function estableceSucursal() {
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
	document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
}

function buscarListas() {
	var pos1 = window.location.href.indexOf("Proceso");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Proceso/listarProcesoListas/?ss=" + ss;

	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
	var frm = new FormData();
	frm.append("SucursalId", sucursal);

	$.ajax(url, "post", listarInicial, frm);
}

function listarInicial(rpta) {
	listaTipoAdmision = [];
	listaPeriodo = [];
	if (rpta != "") {
		var listaGeneral = rpta.split("_");
		listaPeriodo = listaGeneral[0].split("¯");
		listaTipoAdmision = listaGeneral[1].split("¯");
		listaConfiguracion = listaGeneral[2].split("¯");
		var listaMensaje = listaGeneral[3].split("¯");

		for (var i = 0; i < listaMensaje.length; i++) {
			var m = listaMensaje[i].split("¦");
			matrizMensaje.push(m[1]);
        }

		crearChecks(listaConfiguracion);
		//llenarCombo(listaTipoAdmision, "ddlTipoAdmisionCabecera",true);
		listarTipoAdmision();
		//listarPeriodo();
		var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
		cboTipoAdmisionMant.onchange = function () {
			var divConfiguraciones = document.getElementById("divConfiguraciones");
			var divespecificarOA = document.getElementById("divespecificarOA");
			if (this.value == "3") {
				divConfiguraciones.style.display = "";
				var checks = document.getElementsByName("rdn-ConfiguracionPago");
				for (var x = 0; x < checks.length; x++) {
					checks[x].checked = false;
				}
				document.getElementById("chkEspecificarOAMant").checked = false;
				divespecificarOA.style.display = "none";
			}
			else {
				var divespecificarMedicos = document.getElementById("divespecificarMedicos");
				divespecificarMedicos.style.display = "none";
				divConfiguraciones.style.display = "none";
				document.getElementById("chkEspecificarOAMant").checked = false;
				if (this.value == "0" || this.value == "") {
					divespecificarOA.style.display = "none";
				}
				else {
					divespecificarOA.style.display = "";
				}
				var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
				var txtFechaFinMant = document.getElementById("txtFechaFinMant");
				var chkPorDias = document.getElementById("chkPorDias")
				if (!chkPorDias.checked) {
					txtFechaInicioMant.className = "form-texto lectura";
					txtFechaInicioMant.readOnly = true;
					txtFechaInicioMant.style.pointerEvents = "none";
					txtFechaFinMant.className = "form-texto lectura";
					txtFechaFinMant.readOnly = true;
					txtFechaFinMant.style.pointerEvents = "none";
				}
				
			}
		}
	}
	if (localStorage.length > 0) {
	    var matriz = localStorage.getItem("ProcesoProvision").split("¬");
	    if (matriz[matriz.length - 1] == "false") {
	        var control, datos;
	        for (var x = 0; x < matriz.length - 1; x++) {
	            datos = matriz[x].split("¦");
	            control = document.getElementById(datos[0]);
	            control.value = datos[1];
	        }
	        localStorage.removeItem("ProcesoProvision");
	        document.getElementById("btnBuscar").click();
	    } else {
	        localStorage.removeItem("ProcesoProvision");
	    }
	}
}

function listarTipoAdmision() {
	crearMatrizTipoAdmision();
	mostrarMatrizTipoAdmision();
}
function listarPeriodo() {
	crearMatrizPeriodo();
	mostrarMatrizPeriodo();
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
	document.getElementById("cboTipoAdmisionMant").innerHTML = contenido;
}

function crearMatrizPeriodo() {
	var nRegistros = listaPeriodo.length;
	var nCampos;
	var campos;
	var x = 0;
	matrizPeriodo = [];
	if (listaPeriodo != "") {
		for (i = 0; i < nRegistros; i++) {
			campos = listaPeriodo[i].split("¦");
			matrizPeriodo[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || j == 11) matrizPeriodo[x][j] = campos[j];
				else matrizPeriodo[x][j] = campos[j] * 1;
			}
			x++;
		}
	}
}

function mostrarMatrizPeriodo() {
	var hdfOpc = document.getElementById("hdfOpc").value;
	var contenido = "";
	var n = matrizPeriodo.length;
	if (n > 0) {
		contenido += "<option value='0'>Seleccione</option>";
		for (var i = 0; i < n; i++) {
			//if ((hdfOpc == "1" && matrizPeriodo[i][11] != "C") || hdfOpc == "2") {
			if (matrizPeriodo[i][11] != "C") {
				contenido += "<option value='" + matrizPeriodo[i][0] + "'>" + matrizPeriodo[i][2] + "</option>";
			}
		}
	}
	else {
		contenido += "<option value='0'>Seleccione</option>";
	}
	document.getElementById("cboPeriodoMant").innerHTML = contenido;
}

// **
function configurarControles() {
	crearTabla(true);
	crearTabla(false);
	
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

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		if (!validarBusqueda()) return;
		buscarProceso();
	}
	var chkPorDias = document.getElementById("chkPorDias");
	chkPorDias.onclick = function () {
		var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
		var txtFechaFinMant = document.getElementById("txtFechaFinMant");
		var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
		if (this.checked) {
			txtFechaInicioMant.className = "form-texto validar date-picker-x-input"
			txtFechaInicioMant.removeAttribute("readonly");
			txtFechaInicioMant.style.pointerEvents = "auto";
			txtFechaFinMant.className = "form-texto validar date-picker-x-input"
			txtFechaFinMant.removeAttribute("readonly");
			txtFechaFinMant.style.pointerEvents = "auto";
			cboTipoAdmisionMant.value = "1";
		}
		else
		{
			document.getElementById("cboPeriodoMant").onchange();
			txtFechaInicioMant.className = "form-texto lectura"
			txtFechaInicioMant.setAttribute("readonly", "");
			txtFechaInicioMant.style.pointerEvents = "none";
			//txtFechaInicioMant.value = "";
			txtFechaFinMant.className = "form-texto lectura"
			txtFechaFinMant.setAttribute("readonly", "");
			txtFechaFinMant.style.pointerEvents = "none";
			//txtFechaFinMant.value = "";
			cboTipoAdmisionMant.value = "0";
        }
		
	}

	var btngrabar = document.getElementById("btngrabar");
	btngrabar.onclick = function () {

		if (validarProceso()) {
			grabarForm()
			NombreControl = this.innerHTML + "|" + this.id.toString();
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}

	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1 = matriz[Campoeliminar][0];
		var valor2 = matriz[Campoeliminar][9];
		anular(valor1, valor2);
	}

	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	cboPeriodoMant.onchange = function () {
		mostrarSeleccion(cboPeriodoMant.value);
		
		var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
		var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
		var txtFechaFinMant = document.getElementById("txtFechaFinMant");
		var chkPorDias = document.getElementById("chkPorDias");
		
		if (this.value != 0) {
			txtFechaInicioMant.setAttribute("data-fecha", txtFechaInicioMant.value);
			txtFechaFinMant.setAttribute("data-fecha", txtFechaFinMant.value);
			chkPorDias.checked = false;
			chkPorDias.disabled = false;
			
		} else {
			if (txtFechaInicioMant.hasAttribute("data-fecha")) {
				txtFechaInicioMant.removeAttribute("data-fecha");
			}
			if (txtFechaFinMant.hasAttribute("data-fecha")) {
				txtFechaFinMant.removeAttribute("data-fecha");
			}
			chkPorDias.checked = false;
			chkPorDias.disabled = true;
		}
		if (cboTipoAdmisionMant.value == 3) {
			var checks = document.getElementsByName("rdn-ConfiguracionPago");
			var contador = 0;
			var valor = -1;
			for (var x = 0; x < checks.length; x++) {
				if (checks[x].checked) {
					if (contador == 0) {
						contador++;
						valor = checks[x].value;
					} else {
						contador = 0;
						break;
					}
				}
			}

			if (contador == 1 && (valor == 4 || valor == 5)) {
				if (cboPeriodoMant.length > 1) {
					txtFechaInicioMant.className = "form-texto lectura";
					txtFechaInicioMant.style.pointerEvents = "none";
					txtFechaInicioMant.readOnly = true;
					txtFechaFinMant.className = "form-texto lectura";
					txtFechaFinMant.style.pointerEvents = "none";
					txtFechaFinMant.readOnly = true;
				}
				if (document.getElementById("chkEspecificarMedicosMant").checked) {
					txtFechaInicioMant.className = "form-texto";
					txtFechaInicioMant.style.pointerEvents = "";
					txtFechaInicioMant.readOnly = false;
					txtFechaFinMant.className = "form-texto";
					txtFechaFinMant.style.pointerEvents = "";
					txtFechaFinMant.readOnly = false;
				}
				else {
					txtFechaInicioMant.className = "form-texto lectura";
					txtFechaInicioMant.style.pointerEvents = "none";
					txtFechaInicioMant.readOnly = true;
					txtFechaFinMant.className = "form-texto lectura";
					txtFechaFinMant.style.pointerEvents = "none";
					txtFechaFinMant.readOnly = true;
				}

			} else {
				txtFechaInicioMant.className = "form-texto lectura";
				txtFechaInicioMant.style.pointerEvents = "none";
				txtFechaInicioMant.readOnly = true;
				txtFechaFinMant.className = "form-texto lectura";
				txtFechaFinMant.style.pointerEvents = "none";
				txtFechaFinMant.readOnly = true;
			}
		} else {
			txtFechaInicioMant.className = "form-texto lectura";
			txtFechaInicioMant.style.pointerEvents = "none";
			txtFechaInicioMant.readOnly = true;
			txtFechaFinMant.className = "form-texto lectura";
			txtFechaFinMant.style.pointerEvents = "none";
			txtFechaFinMant.readOnly = true;
		}
	}

	var divOpcionesProvision = document.getElementById("divOpcionesProvision");
	var opciones = divOpcionesProvision.getElementsByTagName("LI");
	for (var x = 0; x < opciones.length; x++) {
		opciones[x].onclick = function () {
			ConfiguracionPagoActual = 0;
			var encontrado = false;
			var posicionclass = -1;
			MedicosSeleccionados = [];
			var divOpcionesProvision = document.getElementById("divOpcionesProvision");
			var opciones = divOpcionesProvision.getElementsByTagName("LI");
			for (y = 0; y < opciones.length; y++) {
				opciones[y].className = "";
			}
			this.className = "active";
			SeleccionActualProceso = this.getAttribute("data-estado");

			if (SeleccionActualProceso == "F" || SeleccionActualProceso == "A" || SeleccionActualProceso == "G") {
				document.getElementById("chkTodos").style.display = "none";
			} else {
				document.getElementById("chkTodos").style.display = "";
			}

			crearMatriz(false);
			paginar(0, false);
			var tab = document.getElementById("ulTabs");
			if (SeleccionActualProceso == "P") {
				tab.style.display = "none";
			}
			else {
				tab.style.display = "";
				elementos = tab.getElementsByClassName("tab-link");
				for (var x = 0; x < elementos.length; x++) {
					if (elementos[x].style.display != "none" && encontrado == false) {
						encontrado = true;
						posicionclass = x;
					}
					if (x == 0) {
						elementos[x].className = "tab-link current";
					}
					else {
						elementos[x].className = "tab-link";
					}
				}
				if (posicionclass > -1) {
					elementos[posicionclass].click();
				}
			}
			indiceActualBloque = 0;
			var spnOpcProv1 = document.getElementById("spnOpcProv1");
			var spnOpcProv2 = document.getElementById("spnOpcProv2");
			var spnOpcProv3 = document.getElementById("spnOpcProv3");
			var spnOpcProv4 = document.getElementById("spnOpcProv4");
			var spnOpcProv5 = document.getElementById("spnOpcProv5");
			spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
			spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
			spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
			spnOpcProv4.innerHTML = (d > 999 ? "999+" : d);
			spnOpcProv5.innerHTML = (e > 999 ? "999+" : e);
			var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
			var btnDetalleAnular = document.getElementById("btnDetalleAnular");
			var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
			var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
			var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
			var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
			var btnDetalleDescargar = document.getElementById("btnDetalleDescargar");
			var btnDetalleRevertirProvisionado = document.getElementById("btnDetalleRevertirProvisionado");
			if (!ocultarPorProvision) {
				if (btnDetalleAutorizar != null) {
					btnDetalleAutorizar.style.display = "none";
				}
				if (btnDetalleAnular != null) {
					btnDetalleAnular.style.display = "none";
				}
				btnDetalleCancelar.style.display = "";
				if (btnDetalleCalcular != null) {
					btnDetalleCalcular.style.display = "none";
				}
				if (btnDetalleProvisionar != null) {
					btnDetalleProvisionar.style.display = "none";
				}
				if (btnDetalleRevertir != null) {
					btnDetalleRevertir.style.display = "none";
				}
				if (btnDetalleDescargar != null) {
					if (SeleccionActualProceso == "F") btnDetalleDescargar.style.display = "";
					else btnDetalleDescargar.style.display = "none";
				}
				if (btnDetalleRevertirProvisionado != null) {
					if (SeleccionActualProceso == "F") btnDetalleRevertirProvisionado.style.display = "";
					else btnDetalleRevertirProvisionado.style.display = "none";
				}
			}
			else {

				switch (SeleccionActualProceso) {
					case "P":
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "none";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "none";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "none";
						}
						if (btnDetalleDescargar != null) {
							btnDetalleDescargar.style.display = "none";
						}
						if (btnDetalleRevertirProvisionado != null) {
							btnDetalleRevertirProvisionado.style.display = "none";
						}
						document.getElementById("spnD8").innerHTML = "Error";
						break;
					case "C":
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "none";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "none";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "";
						}
						if (btnDetalleDescargar != null) {
							btnDetalleDescargar.style.display = "none";
						}
						if (btnDetalleRevertirProvisionado != null) {
							btnDetalleRevertirProvisionado.style.display = "none";
						}
						document.getElementById("spnD8").innerHTML = "Obs";
						break;
					case "A":
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "none";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "none";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "none";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "";
						}
						if (btnDetalleDescargar != null) {
							btnDetalleDescargar.style.display = "none";
						}
						if (btnDetalleRevertirProvisionado != null) {
							btnDetalleRevertirProvisionado.style.display = "none";
						}
						document.getElementById("spnD8").innerHTML = "Error";
						break;
					case "F":
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "none";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "none";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "none";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "none";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "none";
						}
						if (btnDetalleDescargar != null) {
							btnDetalleDescargar.style.display = "";
						}
						if (btnDetalleRevertirProvisionado != null) {
							btnDetalleRevertirProvisionado.style.display = "";
						}
						document.getElementById("spnD8").innerHTML = "Error";
						break;
					case "G":
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "none";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "none";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "none";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "none";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "none";
						}
						if (btnDetalleDescargar != null) {
							btnDetalleDescargar.style.display = "none";
						}
						if (btnDetalleRevertirProvisionado != null) {
							btnDetalleRevertirProvisionado.style.display = "none";
						}
						document.getElementById("spnD8").innerHTML = "Error";
						break;
				}
			}
			limpiarCabeceras();
		}
	}

	var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
	btnDetalleCancelar.onclick = function () {
	    var cabecera = document.getElementsByName("cabecera");
	    for (var x = 0; x < cabecera.length; x++) {
	        if (cabecera[x].nodeName == "SELECT") {
	            cabecera[x].selectedIndex = "0";
	        }
	        else {
	            cabecera[x].value = "";
	        }
	    }
	    
		var btnBuscar = document.getElementById("btnBuscar");
		btnBuscar.click();
		var divDetalleDoctor = document.getElementById("divDetalleDoctor");
		divDetalleDoctor.style.display = "none";
		var divPrincipal = document.getElementById("divPrincipal");
		divPrincipal.style.display = "";
		SeleccionActualProceso = "P";
		ConfiguracionPagoActual = 0;
		document.getElementById("spn9").innerHTML = "Estado Provisión";
	}

	var btnBuscarDetalleOA = document.getElementById("btnBuscarDetalleOA");
	btnBuscarDetalleOA.onclick = function () {
		var txtOADetalle = document.getElementById("txtOADetalle").value;
		if (txtOADetalle != "") {
			var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
			var ss = window.parent.document.getElementById("iss").value;
			var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
			divIfrDetalleOA.src = urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOADetalle;
		}
	}

	var btnExportarExcelDetalleOA = document.getElementById("btnExportarExcelDetalleOA");
	btnExportarExcelDetalleOA.onclick = function () {
		var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
		var datos = "", formBlob, anchorElem, elem;
		datos = divIfrDetalleOA.contentWindow.exportarExcel();
		if (datos != "") {
			anchorElem = document.createElement('a');
			var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", "ReporteOA.xls");
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			elem = document.getElementById("atemp");
			elem.parentNode.removeChild(elem);
		}
	}

	var chkTodos = document.getElementById("chkTodos");
	chkTodos.onclick = function () {
		if (matrizDetalle.length > 0) {
			var rdnDetalle = document.getElementsByName("rdnDetalle");
			if (this.checked) {
				var valor;
				for (var x = 0; x < listaProvision.length; x++) {
					valor = listaProvision[x].split("¦");
					if (SeleccionActualProceso == valor[8]) {
						MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
					}
				}
			}
			else {
				MedicosSeleccionados = [];
			}

		}
		paginar(0, false);
	}

	var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
	if (btnDetalleCalcular != null) {
		btnDetalleCalcular.onclick = function () {
			if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
				var rdnDetalle = document.getElementsByName("rdnDetalle");
				var chkTodos = document.getElementById("chkTodos");
				if (MedicosSeleccionados.length > 0) {
					for (var x = 0; x < rdnDetalle.length; x++) {
						rdnDetalle[x].setAttribute("disabled", "disabled");
					}
					chkTodos.setAttribute("disabled", "disabled");
				}
				else {
					for (var x = 0; x < rdnDetalle.length; x++) {
						rdnDetalle[x].removeAttribute("disabled");
					}
					chkTodos.removeAttribute("disabled");
				}
				NombreControl = this.innerHTML + "|" + this.id.toString();
				var dato;
				var tipo;
				var datos;
				dato = matriz[idProvisionEnMatriz][13].split("¬");
				tipo = matriz[idProvisionEnMatriz][12];

				if (tipo == 3) {
					datos = "false|";
				}
				else {
					datos = "true|";
				}
				datos += (dato[1] == "1" ? true : false) + "|" + (dato[2] == "1" ? true : false) + "|" + (dato[3] == "1" ? true : false) + "|" + (dato[4] == "1" ? true : false) + "|" + (dato[5] == "1" ? true : false) + "|" + (dato[6] == "1" ? true : false);
				var strDatos = "";
				var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
				var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
				var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
				cabeceraEnvio = sucursalId + "|" + idProvision + "|" + tipo + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + datos + "|";
				nEnvios = Math.floor(MedicosSeleccionados.length / registroEnviar);
				if (MedicosSeleccionados.length % registroEnviar > 0) nEnvios++;
				inicioEnvio = 0;
				var lista = prepararDatosEnviar();
				strDatos += cabeceraEnvio + lista;
				var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
				$.ajax(url, "post", RptaCalculo, strDatos);
				var divOpcionesProvision = document.getElementById("divOpcionesProvision");
				var opciones = divOpcionesProvision.getElementsByTagName("LI");
				for (var x = 0; x < opciones.length; x++) {
					opciones[x].onclick = null;
				}
				var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
				btnDetalleCancelar.onclick = null;
				var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
				if (btnDetalleAutorizar != null) {
					btnDetalleAutorizar.onclick = null;
				}
				var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
				if (btnDetalleRevertir != null) {
					btnDetalleRevertir.onclick = null;
				}
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null

			}
		}
	}

	var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
	var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
	if (btnDetalleAutorizar != null) {
		btnDetalleAutorizar.onclick = function () {

			if (SeleccionActualProceso == "A") {
				var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
				var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
				if (spn1 == 0 && spn2 == 0) {
					if (matrizDetalle.length > 0) {
						var valor;
						for (var x = 0; x < listaProvision.length; x++) {
							valor = listaProvision[x].split("¦");
							if (SeleccionActualProceso == valor[8]) {
								MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
							}
						}
					}
				} else {
					abrirPopup("PopupErrorAutorizacion");
					return false;
				}
			}

			if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
				var strDatos = "";
				var lista = MedicosSeleccionados.join("¬");
				var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
				strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
				var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
				var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
				var mensaje = "";
				var titulo = "";
				if (this.id == "btnDetalleAutorizar" ? true : false) {
					mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
					titulo = "CONFIRMAR CAMBIO DE ESTADO";
				}
				else {
					mensaje = "¿Está seguro de notificar la creación de la provisión?";
					titulo = matriz[0];
				}

				document.getElementById("spnActualizarProvision").innerHTML = mensaje;
				document.getElementById("TituloActualizarProvision").innerHTML = titulo;
				var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
				btngrabarActualizarProvision.onclick = null;
				btngrabarActualizarProvision.onclick = function () {
					var data = this.getAttribute("data-datos").split("¯");
					$.ajax(data[0], "post", RptaCalculo, data[1]);
					if (SeleccionActualProceso == "A") {
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						window.provisioncargar = 1;
						document.getElementById("spnCancelarProvision").onclick = null;
						document.getElementById("spnCancelarProvisionx").onclick = null;
					} else {
						abrirPopup('PopupActualizarProvision');
					}
					var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					var opciones = divOpcionesProvision.getElementsByTagName("LI");
					for (var x = 0; x < opciones.length; x++) {
						opciones[x].onclick = null;
					}
					var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					btnDetalleCancelar.onclick = null;
				}
				abrirPopup('PopupActualizarProvision');
			}
		}
	}

	if (btnDetalleProvisionar != null) {
		btnDetalleProvisionar.onclick = function () {

			if (SeleccionActualProceso == "A") {
				var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
				var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
				if (spn1 == 0 && spn2 == 0) {
					if (matrizDetalle.length > 0) {
						var valor;
						for (var x = 0; x < listaProvision.length; x++) {
							valor = listaProvision[x].split("¦");
							if (SeleccionActualProceso == valor[8]) {
								MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
							}
						}
					}
				} else {
					abrirPopup("PopupErrorAutorizacion");
					return false;
				}
			}

			if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
				var strDatos = "";
				var lista = MedicosSeleccionados.join("¬");
				var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
				strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
				var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
				var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
				var mensaje = "";
				var titulo = "";
				if (this.id == "btnDetalleAutorizar" ? true : false) {
					mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
					titulo = "CONFIRMAR CAMBIO DE ESTADO";
				}
				else {
					mensaje = "¿Está seguro de notificar la creación de la provisión?";
					titulo = matrizMensaje[1];// "INTEGRACIÓN CON SPRING";
				}

				document.getElementById("spnActualizarProvision").innerHTML = mensaje;
				document.getElementById("TituloActualizarProvision").innerHTML = titulo;
				var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
				btngrabarActualizarProvision.onclick = null;
				btngrabarActualizarProvision.onclick = function () {
					var data = this.getAttribute("data-datos").split("¯");
					$.ajax(data[0], "post", RptaCalculo, data[1]);
					if (SeleccionActualProceso == "A") {
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						window.provisioncargar = 1;
						document.getElementById("spnCancelarProvision").onclick = null;
						document.getElementById("spnCancelarProvisionx").onclick = null;
					} else {
						abrirPopup('PopupActualizarProvision');
					}
					var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					var opciones = divOpcionesProvision.getElementsByTagName("LI");
					for (var x = 0; x < opciones.length; x++) {
						opciones[x].onclick = null;
					}
					var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					btnDetalleCancelar.onclick = null;
				}
				abrirPopup('PopupActualizarProvision');
			}
		}
	}

	var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
	if (btnDetalleRevertir != null) {
		btnDetalleRevertir.onclick = function () {

			if (SeleccionActualProceso == "A") {
				if (matrizDetalle.length > 0) {
					var valor;
					for (var x = 0; x < listaProvision.length; x++) {
						valor = listaProvision[x].split("¦");
						if (SeleccionActualProceso == valor[8]) {
							MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
						}
					}
				}
			}

			if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
				var strDatos = "";
				var lista = MedicosSeleccionados.join("¬");
				var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
				strDatos += lista + "|" + (SeleccionActualProceso == "A" ? "C" : "P") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
				var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
				var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
				var mensaje = "";
				var titulo = "";
				mensaje = "¿Desea revertir a un estado anterior?";
				titulo = "CONFIRMAR CAMBIO DE ESTADO";
				document.getElementById("spnActualizarProvision").innerHTML = mensaje;
				document.getElementById("TituloActualizarProvision").innerHTML = titulo;
				var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
				btngrabarActualizarProvision.onclick = null;
				btngrabarActualizarProvision.onclick = function () {
					var data = this.getAttribute("data-datos").split("¯");
					$.ajax(data[0], "post", RptaCalculo, data[1]);
					if (SeleccionActualProceso == "A") {
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						window.provisioncargar = 1;
						document.getElementById("spnCancelarProvision").onclick = null;
						document.getElementById("spnCancelarProvisionx").onclick = null;
					} else {
						abrirPopup('PopupActualizarProvision');
					}
					var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					var opciones = divOpcionesProvision.getElementsByTagName("LI");
					for (var x = 0; x < opciones.length; x++) {
						opciones[x].onclick = null;
					}
					var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					btnDetalleCancelar.onclick = null;
				}
				abrirPopup('PopupActualizarProvision');
			}
		}
	}

	var btnDetalleAnular = document.getElementById("btnDetalleAnular");
	if (btnDetalleAnular != null) {
		btnDetalleAnular.onclick = function () {
			if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
				var strDatos = "";
				var lista = MedicosSeleccionados.join("¬");
				var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
				strDatos += lista + "|I|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
				var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
				var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
				var mensaje = "";
				var titulo = "";
				mensaje = "¿Desea cambiar a estado anulado?";
				titulo = "CONFIRMAR CAMBIO DE ESTADO";
				document.getElementById("spnActualizarProvision").innerHTML = mensaje;
				document.getElementById("TituloActualizarProvision").innerHTML = titulo;
				var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
				btngrabarActualizarProvision.onclick = null;
				btngrabarActualizarProvision.onclick = function () {
					var data = this.getAttribute("data-datos").split("¯");
					$.ajax(data[0], "post", RptaCalculo, data[1]);
					if (SeleccionActualProceso == "A") {
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						window.provisioncargar = 1;
						document.getElementById("spnCancelarProvision").onclick = null;
						document.getElementById("spnCancelarProvisionx").onclick = null;
					} else {
						abrirPopup('PopupActualizarProvision');
					}
					var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					var opciones = divOpcionesProvision.getElementsByTagName("LI");
					for (var x = 0; x < opciones.length; x++) {
						opciones[x].onclick = null;
					}
					var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					btnDetalleCancelar.onclick = null;
				}
				abrirPopup('PopupActualizarProvision');
			}
		}
	}

	var txtFechaInicio = document.getElementById("txtFechaInicio");
	txtFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaInicio.readOnly = false;
	var txtFechaFin = document.getElementById("txtFechaFin");
	txtFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaFin.readOnly = false;

	var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
	txtFechaInicioMant.DatePickerX.init({
		mondayFirst: true
	});

	var txtFechaFinMant = document.getElementById("txtFechaFinMant");
	txtFechaFinMant.DatePickerX.init({
		mondayFirst: true,
	});

	var hdfIdPaciente = document.getElementById("hdfIdPaciente");
	hdfIdPaciente.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("txtPaciente").value = datos[1];
		}
	}
	var spnIcoPaciente = document.getElementById("spnIcoPaciente");
	spnIcoPaciente.onclick = function () {
		var ifrPaciente = document.getElementById("ifrPaciente");
		if (ifrPaciente.innerHTML == "") {
			ifrPaciente.innerHTML = "<iframe style='margin:0;padding:0;width:800px;height:530px;border: 1px solid transparent;' src='" + urlBase + "Proceso/PacienteLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupPaciente");
	}

	var spnDoctor = document.getElementById("spnDoctor");
	spnDoctor.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var datos = this.value.split("¦");
			this.value = datos[0];
			document.getElementById("txtMedico").value = datos[1];
		}
	}

	var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
	if (aExportarExcelDetalle != null) {
		aExportarExcelDetalle.onclick = function () {
			var nRegistros = matrizDetalle.length;
			if (nRegistros > 0) {
				exportacionDetalle(this);
			}
		}
	}

	var btnExcelDetalleError = document.getElementById("btnExcelDetalleError");
	btnExcelDetalleError.onclick = function () {
		var ifr = document.getElementById("divifrDetalleError");
		var datos = "";
		var formBlob;
		datos = ifr.contentWindow.exportarExcel(true);
		if (datos != "") {
			formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			this.download = "DetalleError.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
		datos = ifr.contentWindow.exportarExcel(false);
		if (datos != "") {
			var anchorElem = document.createElement('a');
			formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
			anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
			anchorElem.setAttribute("download", "DetalleErrorHorario.xls");
			anchorElem.setAttribute("id", "atemp");
			document.body.appendChild(anchorElem);
			anchorElem.click();
			var elem = document.getElementById("atemp");
			return elem.parentNode.removeChild(elem);
		}
	}

	var btnExcelDetalleObservado = document.getElementById("btnExcelDetalleObservado");
	btnExcelDetalleObservado.onclick = function () {
		var ifr = document.getElementById("divifrDetalleObservado");
		var datos = ifr.contentWindow.exportarExcel();
		var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
		this.download = "DetalleObservado.xls";
		this.href = window.URL.createObjectURL(formBlob);
	}

	var btnDetalleDescargar = document.getElementById("btnDetalleDescargar");
	btnDetalleDescargar.onclick = function () {
		var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
		var url = urlBase + "Proceso/obtenerAsiento/?ss=" + ss + "&su=" + sucursal + "&pr=" + idProvision;
		$.ajax(url, "get", exportarAsiento);

	}
	var btnDetalleRevertirProvisionado = document.getElementById("btnDetalleRevertirProvisionado");
	if (btnDetalleRevertirProvisionado != null) {
		btnDetalleRevertirProvisionado.onclick = function () {
			if (matrizDetalle.length > 0) {
				var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
				var url = urlBase + "Proceso/revertirAsientoContable/?ss=" + ss + "&su=" + sucursal + "&id=" + idProvision;// + "&idCompania=" + idCompania;
				var mensaje = "";
				var titulo = "";
				var txtDetalleDoctorPeriodo = document.getElementById("txtDetalleDoctorPeriodo").value;
				mensaje = "¿Desea revertir la provisión del periodo <span style='font-weight:bold;color:red'>" + txtDetalleDoctorPeriodo + "</span>?";
				titulo = "CONFIRMAR REVERSIÓN DE PROVISIÓN";
				document.getElementById("spnActualizarProvision").innerHTML = mensaje;
				document.getElementById("TituloActualizarProvision").innerHTML = titulo;
				var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url);
				btngrabarActualizarProvision.onclick = null;
				btngrabarActualizarProvision.onclick = function () {
					var url = this.getAttribute("data-datos");
					$.ajax(url, "get", listarProvision);
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					window.provisioncargar = 1;
					document.getElementById("spnCancelarProvision").onclick = null;
					document.getElementById("spnCancelarProvisionx").onclick = null;
					SehaRevertido = true;
					//var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					//var opciones = divOpcionesProvision.getElementsByTagName("LI");
					//for (var x = 0; x < opciones.length; x++) {
					//	opciones[x].onclick = null;
					//}
					//var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					//btnDetalleCancelar.onclick = null;
				}
				abrirPopup('PopupActualizarProvision');


			}

		}
	}

	var chkEspecificarMedicosMant = document.getElementById("chkEspecificarMedicosMant");
	chkEspecificarMedicosMant.onclick = function () {
		var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
		var cboPeriodoMant = document.getElementById("cboPeriodoMant");
		if (cboTipoAdmisionMant.value == 3) {
			var checks = document.getElementsByName("rdn-ConfiguracionPago");
			var contador = 0;
			var valor = -1;
			for (var x = 0; x < checks.length; x++) {
				if (checks[x].checked) {
					if (contador == 0) {
						contador++;
						valor = checks[x].value;
					} else {
						contador = 0;
						break;
					}
				}
			}

			if (contador == 1 && (valor == 4 || valor == 5)) {
				if (cboPeriodoMant.length > 1) {
					if (this.checked) {
						txtFechaInicioMant.className = "form-texto";
						txtFechaInicioMant.style.pointerEvents = "";
						txtFechaInicioMant.readOnly = false;
						txtFechaFinMant.className = "form-texto";
						txtFechaFinMant.style.pointerEvents = "";
						txtFechaFinMant.readOnly = false;
					} else {
						txtFechaInicioMant.className = "form-texto lectura";
						txtFechaInicioMant.style.pointerEvents = "none";
						txtFechaInicioMant.readOnly = true;
						txtFechaFinMant.className = "form-texto lectura";
						txtFechaFinMant.style.pointerEvents = "none";
						txtFechaFinMant.readOnly = true;
					}
				}

			} else {
				txtFechaInicioMant.className = "form-texto lectura";
				txtFechaInicioMant.style.pointerEvents = "none";
				txtFechaInicioMant.readOnly = true;
				txtFechaFinMant.className = "form-texto lectura";
				txtFechaFinMant.style.pointerEvents = "none";
				txtFechaFinMant.readOnly = true;
			}
		} else {
			txtFechaInicioMant.className = "form-texto lectura";
			txtFechaInicioMant.style.pointerEvents = "none";
			txtFechaInicioMant.readOnly = true;
			txtFechaFinMant.className = "form-texto lectura";
			txtFechaFinMant.style.pointerEvents = "none";
			txtFechaFinMant.readOnly = true;
		}
		if (!this.checked) {
			cboPeriodoMant.onchange();
		}
	}
}

function prepararDatosEnviar() {
	var strDatos = "";
	var nRegistros = MedicosSeleccionados.length;
	var fin = inicioEnvio + registroEnviar;
	for (var i = inicioEnvio; i < fin; i++) {
		if (i < nRegistros) {
			strDatos += MedicosSeleccionados[i];
			strDatos += "¬";
		}
		else break;
	}
	strDatos = strDatos.substring(0, strDatos.length - 1);
	return strDatos;
}

function mostrarDetalleOA() {
	var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
	var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
	var txtDetalleDoctorPeriodo = document.getElementById("txtDetalleDoctorPeriodo").value;
	var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
	var id = ProcesoMedicoActual;
	var detalles = matrizDetalle[id][1] + "|" + matrizDetalle[id][2] + "|" + matrizDetalle[id][8] + "|" + matrizDetalle[id][11] + "|" + matrizDetalle[id][15] + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + txtDetalleDoctorPeriodo + "|" + txtDetalleDoctorTipoAdmision + "|" + SeleccionActualProceso;
	var ifrProvisionDetalleConceptosOA = document.getElementById("ifrProvisionDetalleConceptosOA");
	if (ifrProvisionDetalleConceptosOA.innerHTML == "") {
		ifrProvisionDetalleConceptosOA.innerHTML = "<iframe id='divIfrProcesoDetalleOA' style='margin:0;padding:0;width:100%;height:400px;border: 1px solid transparent;' src='" + urlBase + "Proceso/ProvisionDetalleConceptosOA/?ss=" + ss + "&data=" + detalles.replace("&", "♣") + "'></iframe>";
	}
	else {
		document.getElementById('divIfrProcesoDetalleOA').src = urlBase + "Proceso/ProvisionDetalleConceptosOA/?ss=" + ss + "&data=" + detalles.replace("&", "♣");
	}
	abrirPopup("PopupProvisionDetalleConceptosOA");
}


function RptaCalculo(rpta) {

	if (window.provisioncargar == 1) {
		abrirPopup('PopupActualizarProvision');
		window.provisioncargar = 0;
		document.getElementById("btngrabarActualizarProvision").innerHTML = "Confirmar";
		var divBloqueoEspecifico = document.getElementById('divBloqueoEspecifico');
		if (divBloqueoEspecifico !== null) divBloqueoEspecifico.classList.remove('bloquear');
		document.getElementById("spnCancelarProvision").onclick = function () { abrirPopup('PopupActualizarProvision') };
		document.getElementById("spnCancelarProvisionx").onclick = function () { abrirPopup('PopupActualizarProvision') };
	}
	var valorrpta = rpta.split("|")[1];
	if (rpta.indexOf("NEXT") > -1) {

		var dato = valorrpta.split("¦")[0] * 1;
		datosCalculados += dato;
		cEnvios++;
		inicioEnvio += registroEnviar;
		var porcentaje = Math.floor(((datosCalculados * 1) * 100) / MedicosSeleccionados.length);

        if (valorrpta.indexOf(":::") > -1) {
			var alerta = document.getElementById("alerta");
			alerta.removeAttribute("class");
            mostraralerta(valorrpta);

			/**/
			var divOpcionesProvision = document.getElementById("divOpcionesProvision");
			var opciones = divOpcionesProvision.getElementsByTagName("LI");

			for (var x = 0; x < opciones.length; x++) {
				opciones[x].onclick = function () {
					var encontrado = false;
					var posicionclass;
					ConfiguracionPagoActual = 0;
					MedicosSeleccionados = [];
					var divOpcionesProvision = document.getElementById("divOpcionesProvision");
					var opciones = divOpcionesProvision.getElementsByTagName("LI");
					for (y = 0; y < opciones.length; y++) {
						opciones[y].className = "";
					}
					this.className = "active";
					SeleccionActualProceso = this.getAttribute("data-estado");

					if (SeleccionActualProceso == "F" || SeleccionActualProceso == "A" || SeleccionActualProceso == "G") {
						document.getElementById("chkTodos").style.display = "none";
					} else {
						document.getElementById("chkTodos").style.display = "";
					}

					crearMatriz(false);
					paginar(0, false);
					indiceActualBloque = 0;
					var tab = document.getElementById("ulTabs");
					if (SeleccionActualProceso == "P") {
						tab.style.display = "none";
					}
					else {
						tab.style.display = "";
						elementos = tab.getElementsByClassName("tab-link");
						for (var x = 0; x < elementos.length; x++) {
							if (elementos[x].style.display != "none" && encontrado == false) {
								encontrado = true;
								posicionclass = x;
							}
							if (x == 0) {
								elementos[x].className = "tab-link current";
							}
							else {
								elementos[x].className = "tab-link";
							}
						}
						if (posicionclass > -1) {
							elementos[posicionclass].click();
						}
					}
					var spnOpcProv1 = document.getElementById("spnOpcProv1");
					var spnOpcProv2 = document.getElementById("spnOpcProv2");
					var spnOpcProv3 = document.getElementById("spnOpcProv3");
					var spnOpcProv4 = document.getElementById("spnOpcProv4");
					var spnOpcProv5 = document.getElementById("spnOpcProv5");
					spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
					spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
					spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
					spnOpcProv4.innerHTML = (d > 999 ? "999+" : d);
					spnOpcProv5.innerHTML = (e > 999 ? "999+" : e);
					var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
					var btnDetalleAnular = document.getElementById("btnDetalleAnular");
					var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
					var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
					var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
					var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
					var btnDetalleDescargar = document.getElementById("btnDetalleDescargar");
					var btnDetalleRevertirProvisionado = document.getElementById("btnDetalleRevertirProvisionado");
					if (!ocultarPorProvision) {
						if (btnDetalleAutorizar != null) {
							btnDetalleAutorizar.style.display = "none";
						}
						if (btnDetalleAnular != null) {
							btnDetalleAnular.style.display = "none";
						}
						btnDetalleCancelar.style.display = "";
						if (btnDetalleCalcular != null) {
							btnDetalleCalcular.style.display = "none";
						}
						if (btnDetalleProvisionar != null) {
							btnDetalleProvisionar.style.display = "none";
						}
						if (btnDetalleRevertir != null) {
							btnDetalleRevertir.style.display = "none";
						}
						if (btnDetalleDescargar != null) {
							if (SeleccionActualProceso == "F") btnDetalleDescargar.style.display = "";
							else btnDetalleDescargar.style.display = "none";
						}
						if (btnDetalleRevertirProvisionado != null) {
							if (SeleccionActualProceso == "F") btnDetalleRevertirProvisionado.style.display = "";
							else btnDetalleRevertirProvisionado.style.display = "none";
						}
					} else {

						switch (SeleccionActualProceso) {
							case "P":
								if (btnDetalleAutorizar != null) {
									btnDetalleAutorizar.style.display = "none";
								}
								if (btnDetalleAnular != null) {
									btnDetalleAnular.style.display = "";
								}
								btnDetalleCancelar.style.display = "";
								if (btnDetalleCalcular != null) {
									btnDetalleCalcular.style.display = "";
								}
								if (btnDetalleProvisionar != null) {
									btnDetalleProvisionar.style.display = "none";
								}
								if (btnDetalleRevertir != null) {
									btnDetalleRevertir.style.display = "none";
								}
								if (btnDetalleDescargar != null) {
									btnDetalleDescargar.style.display = "none";
								}
								if (btnDetalleRevertirProvisionado != null) {
									btnDetalleRevertirProvisionado.style.display = "none";
								}
								break;
							case "C":
								if (btnDetalleAutorizar != null) {
									btnDetalleAutorizar.style.display = "";
								}
								if (btnDetalleAnular != null) {
									btnDetalleAnular.style.display = "none";
								}
								btnDetalleCancelar.style.display = "";
								if (btnDetalleCalcular != null) {
									btnDetalleCalcular.style.display = "";
								}
								if (btnDetalleProvisionar != null) {
									btnDetalleProvisionar.style.display = "none";
								}
								if (btnDetalleRevertir != null) {
									btnDetalleRevertir.style.display = "";
								}
								if (btnDetalleDescargar != null) {
									btnDetalleDescargar.style.display = "none";
								}
								if (btnDetalleRevertirProvisionado != null) {
									btnDetalleRevertirProvisionado.style.display = "none";
								}
								break;
							case "A":
								if (btnDetalleAutorizar != null) {
									btnDetalleAutorizar.style.display = "none";
								}
								if (btnDetalleAnular != null) {
									btnDetalleAnular.style.display = "none";
								}
								btnDetalleCancelar.style.display = "";
								if (btnDetalleCalcular != null) {
									btnDetalleCalcular.style.display = "none";
								}
								if (btnDetalleProvisionar != null) {
									btnDetalleProvisionar.style.display = "";
								}
								if (btnDetalleRevertir != null) {
									btnDetalleRevertir.style.display = "";
								}
								if (btnDetalleDescargar != null) {
									btnDetalleDescargar.style.display = "none";
								}
								if (btnDetalleRevertirProvisionado != null) {
									btnDetalleRevertirProvisionado.style.display = "none";
								}
								break;
							case "F":
								if (btnDetalleAutorizar != null) {
									btnDetalleAutorizar.style.display = "none";
								}
								if (btnDetalleAnular != null) {
									btnDetalleAnular.style.display = "none";
								}
								btnDetalleCancelar.style.display = "";
								if (btnDetalleCalcular != null) {
									btnDetalleCalcular.style.display = "none";
								}
								if (btnDetalleProvisionar != null) {
									btnDetalleProvisionar.style.display = "none";
								}
								if (btnDetalleRevertir != null) {
									btnDetalleRevertir.style.display = "none";
								}
								if (btnDetalleDescargar != null) {
									btnDetalleDescargar.style.display = "";
								}
								if (btnDetalleRevertirProvisionado != null) {
									btnDetalleRevertirProvisionado.style.display = "";
								}
								break;
							case "G":
								if (btnDetalleAutorizar != null) {
									btnDetalleAutorizar.style.display = "none";
								}
								if (btnDetalleAnular != null) {
									btnDetalleAnular.style.display = "none";
								}
								btnDetalleCancelar.style.display = "";
								if (btnDetalleCalcular != null) {
									btnDetalleCalcular.style.display = "none";
								}
								if (btnDetalleProvisionar != null) {
									btnDetalleProvisionar.style.display = "none";
								}
								if (btnDetalleRevertir != null) {
									btnDetalleRevertir.style.display = "none";
								}
								if (btnDetalleDescargar != null) {
									btnDetalleDescargar.style.display = "none";
								}
								if (btnDetalleRevertirProvisionado != null) {
									btnDetalleRevertirProvisionado.style.display = "none";
								}
								document.getElementById("spnD8").innerHTML = "Error";
								break;
						}
					}
					limpiarCabeceras();
				}
			}
			var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
			btnDetalleCancelar.onclick = function () {
			    var cabecera = document.getElementsByName("cabecera");
			    for (var x = 0; x < cabecera.length; x++) {
			        if (cabecera[x].nodeName == "SELECT") {
			            cabecera[x].selectedIndex = "0";
			        }
			        else {
			            cabecera[x].value = "";
			        }
			    }
				var btnBuscar = document.getElementById("btnBuscar");
				btnBuscar.click();
				var divDetalleDoctor = document.getElementById("divDetalleDoctor");
				divDetalleDoctor.style.display = "none";
				var divPrincipal = document.getElementById("divPrincipal");
				divPrincipal.style.display = "";
				SeleccionActualProceso = "P";
				ConfiguracionPagoActual = 0;
				document.getElementById("spn9").innerHTML = "Estado Provisión";
			}
			var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
			var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
			if (btnDetalleAutorizar != null) {
				btnDetalleAutorizar.onclick = function () {

					if (SeleccionActualProceso == "A") {
						var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
						var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
						if (spn1 == 0 && spn2 == 0) {
							if (matrizDetalle.length > 0) {
								var valor;
								for (var x = 0; x < listaProvision.length; x++) {
									valor = listaProvision[x].split("¦");
									if (SeleccionActualProceso == valor[8]) {
										MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
									}
								}
							}
						} else {
							abrirPopup("PopupErrorAutorizacion");
							return false;
						}
					}

					if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
						var strDatos = "";
						var lista = MedicosSeleccionados.join("¬");
						var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
						strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
						var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
						var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;

						var mensaje = "";
						var titulo = "";
						if (this.id == "btnDetalleAutorizar" ? true : false) {
							mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
							titulo = "CONFIRMAR CAMBIO DE ESTADO";
						}
						else {
							mensaje = "¿Esta seguro de notificar la creación de la provisión?";
							titulo = matrizMensaje[2]; // "INTEGRACIÓN CON SPRING";
						}

						document.getElementById("spnActualizarProvision").innerHTML = mensaje;
						document.getElementById("TituloActualizarProvision").innerHTML = titulo;
						var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                        btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
						btngrabarActualizarProvision.onclick = null;
						btngrabarActualizarProvision.onclick = function () {
							var data = this.getAttribute("data-datos").split("¯");
							$.ajax(data[0], "post", RptaCalculo, data[1]);
							if (SeleccionActualProceso == "A") {
								this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
								window.provisioncargar = 1;
								document.getElementById("spnCancelarProvision").onclick = null;
								document.getElementById("spnCancelarProvisionx").onclick = null;

							} else {
								abrirPopup('PopupActualizarProvision');
							}
							var divOpcionesProvision = document.getElementById("divOpcionesProvision");
							var opciones = divOpcionesProvision.getElementsByTagName("LI");
							for (var x = 0; x < opciones.length; x++) {
								opciones[x].onclick = null;
							}
							var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
							btnDetalleCancelar.onclick = null;
						}
						abrirPopup('PopupActualizarProvision');
					}
				}
			}

			if (btnDetalleProvisionar != null) {
				btnDetalleProvisionar.onclick = function () {

					if (SeleccionActualProceso == "A") {
						var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
						var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
						if (spn1 == 0 && spn2 == 0) {
							if (matrizDetalle.length > 0) {
								var valor;
								for (var x = 0; x < listaProvision.length; x++) {
									valor = listaProvision[x].split("¦");
									if (SeleccionActualProceso == valor[8]) {
										MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
									}
								}
							}
						} else {
							abrirPopup("PopupErrorAutorizacion");
							return false;
						}
					}

					if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
						var strDatos = "";
						var lista = MedicosSeleccionados.join("¬");
						var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
						strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
						var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
						var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;

						var mensaje = "";
						var titulo = "";
						if (this.id == "btnDetalleAutorizar" ? true : false) {
							mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
							titulo = "CONFIRMAR CAMBIO DE ESTADO";
						}
						else {
							mensaje = "¿Esta seguro de notificar la creación de la provisión?";
							titulo = matrizMensaje[3]; // "INTEGRACIÓN CON SPRING";
						}

						document.getElementById("spnActualizarProvision").innerHTML = mensaje;
						document.getElementById("TituloActualizarProvision").innerHTML = titulo;
						var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                        btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
						btngrabarActualizarProvision.onclick = null;
						btngrabarActualizarProvision.onclick = function () {
							var data = this.getAttribute("data-datos").split("¯");
							$.ajax(data[0], "post", RptaCalculo, data[1]);
							if (SeleccionActualProceso == "A") {
								this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
								window.provisioncargar = 1;
								document.getElementById("spnCancelarProvision").onclick = null;
								document.getElementById("spnCancelarProvisionx").onclick = null;
							} else {
								abrirPopup('PopupActualizarProvision');
							}
							var divOpcionesProvision = document.getElementById("divOpcionesProvision");
							var opciones = divOpcionesProvision.getElementsByTagName("LI");
							for (var x = 0; x < opciones.length; x++) {
								opciones[x].onclick = null;
							}
							var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
							btnDetalleCancelar.onclick = null;
						}
						abrirPopup('PopupActualizarProvision');
					}
				}
			}

			var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
			if (btnDetalleRevertir != null) {
				btnDetalleRevertir.onclick = function () {

					if (SeleccionActualProceso == "A") {
						if (matrizDetalle.length > 0) {
							var valor;
							for (var x = 0; x < listaProvision.length; x++) {
								valor = listaProvision[x].split("¦");
								if (SeleccionActualProceso == valor[8]) {
									MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
								}
							}
						}
					}

					if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
						var strDatos = "";
						var lista = MedicosSeleccionados.join("¬");
						var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
						strDatos += lista + "|" + (SeleccionActualProceso == "A" ? "C" : "P") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
						var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
						var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
						var mensaje = "";
						var titulo = "";
						mensaje = "¿Desea revertir a un estado anterior?";
						titulo = "CONFIRMAR CAMBIO DE ESTADO";
						document.getElementById("spnActualizarProvision").innerHTML = mensaje;
						document.getElementById("TituloActualizarProvision").innerHTML = titulo;
						var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                        btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
						btngrabarActualizarProvision.onclick = null;
						btngrabarActualizarProvision.onclick = function () {
							var data = this.getAttribute("data-datos").split("¯");
							$.ajax(data[0], "post", RptaCalculo, data[1]);
							if (SeleccionActualProceso == "A") {
								this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
								window.provisioncargar = 1;
								document.getElementById("spnCancelarProvision").onclick = null;
								document.getElementById("spnCancelarProvisionx").onclick = null;
							} else {
								abrirPopup('PopupActualizarProvision');
							}
							var divOpcionesProvision = document.getElementById("divOpcionesProvision");
							var opciones = divOpcionesProvision.getElementsByTagName("LI");
							for (var x = 0; x < opciones.length; x++) {
								opciones[x].onclick = null;
							}
							var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
							btnDetalleCancelar.onclick = null;
						}
						abrirPopup('PopupActualizarProvision');
					}
				}
			}

			//if (rpta != "-1") {
			inicioEnvio = 0;
			nEnvios = 0;
			cEnvios = 0;
			datosCalculados = 0;
			cabeceraEnvio = "";
			var datos = NombreControl.split("|");
			if (datos[0] == "Calcular") {
				var control = document.getElementById(datos[1]);
				if (control != null) {
					control.innerHTML = datos[0];
					NombreControl = "";
					control.onclick = function () {
						if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
							var rdnDetalle = document.getElementsByName("rdnDetalle");
							var chkTodos = document.getElementById("chkTodos");
							if (MedicosSeleccionados.length > 0) {
								for (var x = 0; x < rdnDetalle.length; x++) {
									rdnDetalle[x].setAttribute("disabled", "disabled");
								}
								chkTodos.setAttribute("disabled", "disabled");
							}
							else {
								for (var x = 0; x < rdnDetalle.length; x++) {
									rdnDetalle[x].removeAttribute("disabled");
								}
								chkTodos.removeAttribute("disabled");
							}
							NombreControl = this.innerHTML + "|" + this.id.toString();
							var dato;
							var tipo;
							var datos;
							dato = matriz[idProvisionEnMatriz][13].split("¬");
							tipo = matriz[idProvisionEnMatriz][12];

							if (tipo == 3) {
								datos = "false|";
							}
							else {
								datos = "true|";
							}
							datos += (dato[1] == "1" ? true : false) + "|" + (dato[2] == "1" ? true : false) + "|" + (dato[3] == "1" ? true : false) + "|" + (dato[4] == "1" ? true : false) + "|" + (dato[5] == "1" ? true : false) + "|" + (dato[6] == "1" ? true : false);
							var strDatos = "";
							var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
							var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
							var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
							cabeceraEnvio = sucursalId + "|" + idProvision + "|" + tipo + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + datos + "|";
							nEnvios = Math.floor(MedicosSeleccionados.length / registroEnviar);
							if (MedicosSeleccionados.length % registroEnviar > 0) nEnvios++;
							inicioEnvio = 0;
							var lista = prepararDatosEnviar();
							strDatos += cabeceraEnvio + lista;
							var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
							$.ajax(url, "post", RptaCalculo, strDatos);
							var divOpcionesProvision = document.getElementById("divOpcionesProvision");
							var opciones = divOpcionesProvision.getElementsByTagName("LI");
							for (var x = 0; x < opciones.length; x++) {
								opciones[x].onclick = null;
							}
							var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
							btnDetalleCancelar.onclick = null;
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							this.onclick = null
						}
					}
				}
			}
			var url = urlBase + "Proceso/ListarProvisionPorId/?ss=" + ss + "&id=" + idProvision;
			$.ajax(url, "get", listarProvision);
			var chkTodos = document.getElementById("chkTodos");
			chkTodos.checked = false;
			if (matrizDetalle.length > 0) {
				var checks = document.getElementsByName("rdnDetalle");
				for (var x = 0; x < checks.length; x++) {
					checks[x].checked = false;
				}
			}
			//}

			/**/


			return false;
		}
		mostraralerta("Se ha calculado el " + porcentaje + "% de registros", true);
	}

	if (cEnvios < nEnvios) {
		var strDatos = cabeceraEnvio + prepararDatosEnviar();
		var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
		$.ajax(url, "post", RptaCalculo, strDatos);
	}
	else {
		var alerta = document.getElementById("alerta");
		alerta.removeAttribute("class");
		var divOpcionesProvision = document.getElementById("divOpcionesProvision");
		var opciones = divOpcionesProvision.getElementsByTagName("LI");

		for (var x = 0; x < opciones.length; x++) {
			opciones[x].onclick = function () {
				var encontrado = false;
				var posicionclass;
				ConfiguracionPagoActual = 0;
				MedicosSeleccionados = [];
				var divOpcionesProvision = document.getElementById("divOpcionesProvision");
				var opciones = divOpcionesProvision.getElementsByTagName("LI");
				for (y = 0; y < opciones.length; y++) {
					opciones[y].className = "";
				}
				this.className = "active";
				SeleccionActualProceso = this.getAttribute("data-estado");

				if (SeleccionActualProceso == "F" || SeleccionActualProceso == "A" || SeleccionActualProceso == "G") {
					document.getElementById("chkTodos").style.display = "none";
				} else {
					document.getElementById("chkTodos").style.display = "";
				}

				crearMatriz(false);
				paginar(0, false);
				indiceActualBloque = 0;
				var tab = document.getElementById("ulTabs");
				if (SeleccionActualProceso == "P") {
					tab.style.display = "none";
				}
				else {
					tab.style.display = "";
					elementos = tab.getElementsByClassName("tab-link");
					for (var x = 0; x < elementos.length; x++) {
						if (elementos[x].style.display != "none" && encontrado == false) {
							encontrado = true;
							posicionclass = x;
						}
						if (x == 0) {
							elementos[x].className = "tab-link current";
						}
						else {
							elementos[x].className = "tab-link";
						}
					}
					if (posicionclass > -1) {
						elementos[posicionclass].click();
					}
				}
				var spnOpcProv1 = document.getElementById("spnOpcProv1");
				var spnOpcProv2 = document.getElementById("spnOpcProv2");
				var spnOpcProv3 = document.getElementById("spnOpcProv3");
				var spnOpcProv4 = document.getElementById("spnOpcProv4");
				var spnOpcProv5 = document.getElementById("spnOpcProv5");
				spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
				spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
				spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
				spnOpcProv4.innerHTML = (d > 999 ? "999+" : d);
				spnOpcProv5.innerHTML = (e > 999 ? "999+" : e);
				var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
				var btnDetalleAnular = document.getElementById("btnDetalleAnular");
				var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
				var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
				var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
				var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
				var btnDetalleDescargar = document.getElementById("btnDetalleDescargar");
				var btnDetalleRevertirProvisionado = document.getElementById("btnDetalleRevertirProvisionado");
				if (!ocultarPorProvision) {
					if (btnDetalleAutorizar != null) {
						btnDetalleAutorizar.style.display = "none";
					}
					if (btnDetalleAnular != null) {
						btnDetalleAnular.style.display = "none";
					}
					btnDetalleCancelar.style.display = "";
					if (btnDetalleCalcular != null) {
						btnDetalleCalcular.style.display = "none";
					}
					if (btnDetalleProvisionar != null) {
						btnDetalleProvisionar.style.display = "none";
					}
					if (btnDetalleRevertir != null) {
						btnDetalleRevertir.style.display = "none";
					}
					if (btnDetalleDescargar != null) {
						if (SeleccionActualProceso == "F") btnDetalleDescargar.style.display = "";
						else btnDetalleDescargar.style.display = "none";
					}
					if (btnDetalleRevertirProvisionado != null) {
						if (SeleccionActualProceso == "F") btnDetalleRevertirProvisionado.style.display = "";
						else btnDetalleRevertirProvisionado.style.display = "none";
					}
				}
				else {
					switch (SeleccionActualProceso) {
						case "P":
							if (btnDetalleAutorizar != null) {
								btnDetalleAutorizar.style.display = "none";
							}
							if (btnDetalleAnular != null) {
								btnDetalleAnular.style.display = "";
							}
							btnDetalleCancelar.style.display = "";
							if (btnDetalleCalcular != null) {
								btnDetalleCalcular.style.display = "";
							}
							if (btnDetalleProvisionar != null) {
								btnDetalleProvisionar.style.display = "none";
							}
							if (btnDetalleRevertir != null) {
								btnDetalleRevertir.style.display = "none";
							}
							if (btnDetalleDescargar != null) {
								btnDetalleDescargar.style.display = "none";
							}
							if (btnDetalleRevertirProvisionado != null) {
								btnDetalleRevertirProvisionado.style.display = "none";
							}
							break;
						case "C":
							if (btnDetalleAutorizar != null) {
								btnDetalleAutorizar.style.display = "";
							}
							if (btnDetalleAnular != null) {
								btnDetalleAnular.style.display = "none";
							}
							btnDetalleCancelar.style.display = "";
							if (btnDetalleCalcular != null) {
								btnDetalleCalcular.style.display = "";
							}
							if (btnDetalleProvisionar != null) {
								btnDetalleProvisionar.style.display = "none";
							}
							if (btnDetalleRevertir != null) {
								btnDetalleRevertir.style.display = "";
							}
							if (btnDetalleDescargar != null) {
								btnDetalleDescargar.style.display = "none";
							}
							if (btnDetalleRevertirProvisionado != null) {
								btnDetalleRevertirProvisionado.style.display = "none";
							}
							break;
						case "A":
							if (btnDetalleAutorizar != null) {
								btnDetalleAutorizar.style.display = "none";
							}
							if (btnDetalleAnular != null) {
								btnDetalleAnular.style.display = "none";
							}
							btnDetalleCancelar.style.display = "";
							if (btnDetalleCalcular != null) {
								btnDetalleCalcular.style.display = "none";
							}
							if (btnDetalleProvisionar != null) {
								btnDetalleProvisionar.style.display = "";
							}
							if (btnDetalleRevertir != null) {
								btnDetalleRevertir.style.display = "";
							}
							if (btnDetalleDescargar != null) {
								btnDetalleDescargar.style.display = "none";
							}
							if (btnDetalleRevertirProvisionado != null) {
								btnDetalleRevertirProvisionado.style.display = "none";
							}
							break;
						case "F":
							if (btnDetalleAutorizar != null) {
								btnDetalleAutorizar.style.display = "none";
							}
							if (btnDetalleAnular != null) {
								btnDetalleAnular.style.display = "none";
							}
							btnDetalleCancelar.style.display = "";
							if (btnDetalleCalcular != null) {
								btnDetalleCalcular.style.display = "none";
							}
							if (btnDetalleProvisionar != null) {
								btnDetalleProvisionar.style.display = "none";
							}
							if (btnDetalleRevertir != null) {
								btnDetalleRevertir.style.display = "none";
							}
							if (btnDetalleDescargar != null) {
								btnDetalleDescargar.style.display = "";
							}
							if (btnDetalleRevertirProvisionado != null) {
								btnDetalleRevertirProvisionado.style.display = "";
							}
							break;
						case "G":
							if (btnDetalleAutorizar != null) {
								btnDetalleAutorizar.style.display = "none";
							}
							if (btnDetalleAnular != null) {
								btnDetalleAnular.style.display = "none";
							}
							btnDetalleCancelar.style.display = "";
							if (btnDetalleCalcular != null) {
								btnDetalleCalcular.style.display = "none";
							}
							if (btnDetalleProvisionar != null) {
								btnDetalleProvisionar.style.display = "none";
							}
							if (btnDetalleRevertir != null) {
								btnDetalleRevertir.style.display = "none";
							}
							if (btnDetalleDescargar != null) {
								btnDetalleDescargar.style.display = "none";
							}
							if (btnDetalleRevertirProvisionado != null) {
								btnDetalleRevertirProvisionado.style.display = "none";
							}
							document.getElementById("spnD8").innerHTML = "Error";
							break;
					}
				}
				limpiarCabeceras();
			}
		}
		var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
		btnDetalleCancelar.onclick = function () {
		    var cabecera = document.getElementsByName("cabecera");
		    for (var x = 0; x < cabecera.length; x++) {
		        if (cabecera[x].nodeName == "SELECT") {
		            cabecera[x].selectedIndex = "0";
		        }
		        else {
		            cabecera[x].value = "";
		        }
		    }
			var btnBuscar = document.getElementById("btnBuscar");
			btnBuscar.click();
			var divDetalleDoctor = document.getElementById("divDetalleDoctor");
			divDetalleDoctor.style.display = "none";
			var divPrincipal = document.getElementById("divPrincipal");
			divPrincipal.style.display = "";
			SeleccionActualProceso = "P";
			ConfiguracionPagoActual = 0;
			document.getElementById("spn9").innerHTML = "Estado Provisión";
		}
		var btnDetalleAutorizar = document.getElementById("btnDetalleAutorizar");
		var btnDetalleProvisionar = document.getElementById("btnDetalleProvisionar");
		if (btnDetalleAutorizar != null) {
			btnDetalleAutorizar.onclick = function () {

				if (SeleccionActualProceso == "A") {
					var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
					var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
					if (spn1 == 0 && spn2 == 0) {
						if (matrizDetalle.length > 0) {
							var valor;
							for (var x = 0; x < listaProvision.length; x++) {
								valor = listaProvision[x].split("¦");
								if (SeleccionActualProceso == valor[8]) {
									MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
								}
							}
						}
					} else {
						abrirPopup("PopupErrorAutorizacion");
						return false;
					}
				}

				if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
					var strDatos = "";
					var lista = MedicosSeleccionados.join("¬");
					var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
					strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
					var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
					var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;

					var mensaje = "";
					var titulo = "";
					if (this.id == "btnDetalleAutorizar" ? true : false) {
						mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
						titulo = "CONFIRMAR CAMBIO DE ESTADO";
					}
					else {
						mensaje = "¿Esta seguro de notificar la creación de la provisión?";
						titulo = matrizMensaje[4]; // "INTEGRACIÓN CON SPRING";
					}

					document.getElementById("spnActualizarProvision").innerHTML = mensaje;
					document.getElementById("TituloActualizarProvision").innerHTML = titulo;
					var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                    btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
					btngrabarActualizarProvision.onclick = null;
					btngrabarActualizarProvision.onclick = function () {
						var data = this.getAttribute("data-datos").split("¯");
						$.ajax(data[0], "post", RptaCalculo, data[1]);
						if (SeleccionActualProceso == "A") {
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							window.provisioncargar = 1;
							document.getElementById("spnCancelarProvision").onclick = null;
							document.getElementById("spnCancelarProvisionx").onclick = null;

						} else {
							abrirPopup('PopupActualizarProvision');
						}
						var divOpcionesProvision = document.getElementById("divOpcionesProvision");
						var opciones = divOpcionesProvision.getElementsByTagName("LI");
						for (var x = 0; x < opciones.length; x++) {
							opciones[x].onclick = null;
						}
						var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
						btnDetalleCancelar.onclick = null;
					}
					abrirPopup('PopupActualizarProvision');
				}
			}
		}

		if (btnDetalleProvisionar != null) {
			btnDetalleProvisionar.onclick = function () {

				if (SeleccionActualProceso == "A") {
					var spn1 = document.getElementById("spnOpcProv1").innerHTML * 1;
					var spn2 = document.getElementById("spnOpcProv2").innerHTML * 1;
					if (spn1 == 0 && spn2 == 0) {
						if (matrizDetalle.length > 0) {
							var valor;
							for (var x = 0; x < listaProvision.length; x++) {
								valor = listaProvision[x].split("¦");
								if (SeleccionActualProceso == valor[8]) {
									MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
								}
							}
						}
					} else {
						abrirPopup("PopupErrorAutorizacion");
						return false;
					}
				}

				if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
					var strDatos = "";
					var lista = MedicosSeleccionados.join("¬");
					var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
					strDatos += lista + "|" + (this.id == "btnDetalleAutorizar" ? "A" : "F") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
					var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
					var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
					var mensaje = "";
					var titulo = "";
					if (this.id == "btnDetalleAutorizar" ? true : false) {
						mensaje = "¿Confirmar el cambio de estado de calculado a autorizado?";
						titulo = "CONFIRMAR CAMBIO DE ESTADO";
					}
					else {
						mensaje = "¿Esta seguro de notificar la creación de la provisión?";
						titulo = matrizMensaje[5]; // "INTEGRACIÓN CON SPRING";
					}

					document.getElementById("spnActualizarProvision").innerHTML = mensaje;
					document.getElementById("TituloActualizarProvision").innerHTML = titulo;
					var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                    btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
					btngrabarActualizarProvision.onclick = null;
					btngrabarActualizarProvision.onclick = function () {
						var data = this.getAttribute("data-datos").split("¯");
						$.ajax(data[0], "post", RptaCalculo, data[1]);
						if (SeleccionActualProceso == "A") {
							var divBloqueoEspecifico = document.getElementById('divBloqueoEspecifico');
							if (divBloqueoEspecifico !== null) divBloqueoEspecifico.classList.add('bloquear');
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							window.provisioncargar = 1;
							document.getElementById("spnCancelarProvision").onclick = null;
							document.getElementById("spnCancelarProvisionx").onclick = null;
							setTimeout(function () {
								if (divBloqueoEspecifico !== null) divBloqueoEspecifico.classList.remove('bloquear');
							}, 60 * 1000);
						} else {
							abrirPopup('PopupActualizarProvision');
						}
						var divOpcionesProvision = document.getElementById("divOpcionesProvision");
						var opciones = divOpcionesProvision.getElementsByTagName("LI");
						for (var x = 0; x < opciones.length; x++) {
							opciones[x].onclick = null;
						}
						var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
						btnDetalleCancelar.onclick = null;
					}
					abrirPopup('PopupActualizarProvision');
				}
			}
		}

		var btnDetalleRevertir = document.getElementById("btnDetalleRevertir");
		if (btnDetalleRevertir != null) {
			btnDetalleRevertir.onclick = function () {

				if (SeleccionActualProceso == "A") {
					if (matrizDetalle.length > 0) {
						var valor;
						for (var x = 0; x < listaProvision.length; x++) {
							valor = listaProvision[x].split("¦");
							if (SeleccionActualProceso == valor[8]) {
								MedicosSeleccionados.push(valor[0] + "¦" + valor[15] + "¦" + valor[13]);
							}
						}
					}
				}

				if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
					var strDatos = "";
					var lista = MedicosSeleccionados.join("¬");
					var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin");
					strDatos += lista + "|" + (SeleccionActualProceso == "A" ? "C" : "P") + "|" + idProvision + "|" + txtDetalleDoctorFechaFin.value;
					var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
					var url = urlBase + "Proceso/ActualizarProcesoMedico/?ss=" + ss + "&su=" + sucursal;
					var mensaje = "";
					var titulo = "";
					mensaje = "¿Desea revertir a un estado anterior?";
					titulo = "CONFIRMAR CAMBIO DE ESTADO";
					document.getElementById("spnActualizarProvision").innerHTML = mensaje;
					document.getElementById("TituloActualizarProvision").innerHTML = titulo;
					var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                    btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
					btngrabarActualizarProvision.onclick = null;
					btngrabarActualizarProvision.onclick = function () {
						var data = this.getAttribute("data-datos").split("¯");
						$.ajax(data[0], "post", RptaCalculo, data[1]);
						if (SeleccionActualProceso == "A") {
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							window.provisioncargar = 1;
							document.getElementById("spnCancelarProvision").onclick = null;
							document.getElementById("spnCancelarProvisionx").onclick = null;
						} else {
							abrirPopup('PopupActualizarProvision');
						}
						var divOpcionesProvision = document.getElementById("divOpcionesProvision");
						var opciones = divOpcionesProvision.getElementsByTagName("LI");
						for (var x = 0; x < opciones.length; x++) {
							opciones[x].onclick = null;
						}
						var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
						btnDetalleCancelar.onclick = null;
					}
					abrirPopup('PopupActualizarProvision');
				}
			}
		}

		if (rpta.indexOf("¬") > -1) {

			var data = rpta.split("¬");
			/*popup marco*/
			listaProduccion = data[0] != "" ? data[0].split("¯") : [];
			listaMontoFijo = data[1] != "" ? data[1].split("¯") : [];
			listaHorario = data[2] != "" ? data[2].split("¯") : [];
			listaTurno = data[3] != "" ? data[3].split("¯") : [];

			crearTablaDetalle("Produccion|0");
			crearMatrizDetalle("Produccion|0");
			paginarDetalle(0, "Produccion|0");
			indiceActualBloque = 0;
			crearTablaDetalle("MontoFijo|1");
			crearMatrizDetalle("MontoFijo|1");
			paginarDetalle(0, "MontoFijo|1");
			indiceActualBloqueM = 0;
			crearTablaDetalle("Horario|2");
			crearMatrizDetalle("Horario|2");
			paginarDetalle(0, "Horario|2");
			indiceActualBloqueP = 0;
			crearTablaDetalle("Turno|3");
			crearMatrizDetalle("Turno|3");
			paginarDetalle(0, "Turno|3");
			indiceActualBloqueB = 0;

			abrirPopup("PopupDetalle");

			/*para no  modificar*/
			var datos = NombreControl.split("|");
			if (datos[0] == "Calcular") {
				var control = document.getElementById(datos[1]);
				if (control != null) {
					control.innerHTML = datos[0];
					NombreControl = "";
					control.onclick = function () {
						if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
							NombreControl = this.innerHTML + "|" + this.id.toString();
							var dato;
							var tipo;
							var datos;
							dato = matriz[idProvisionEnMatriz][13].split("¬");
							tipo = matriz[idProvisionEnMatriz][12];

							if (tipo == 3) {
								datos = "false|";
							}
							else {
								datos = "true|";
							}
							datos += (dato[1] == "1" ? true : false) + "|" + (dato[2] == "1" ? true : false) + "|" + (dato[3] == "1" ? true : false) + "|" + (dato[4] == "1" ? true : false) + "|" + (dato[5] == "1" ? true : false) + "|" + (dato[6] == "1" ? true : false);
							var strDatos = "";
							var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
							var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
							var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
							var lista = MedicosSeleccionados.join("¬");
							strDatos += sucursalId + "|" + idProvision + "|" + tipo + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + lista + "|" + datos;
							var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss;
							$.ajax(url, "post", RptaCalculo, strDatos);
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							//this.onclick = null
						}
					}
				}
			}
		}


		if (rpta != "-1") {
			inicioEnvio = 0;
			nEnvios = 0;
			cEnvios = 0;
			datosCalculados = 0;
			cabeceraEnvio = "";
			var datos = NombreControl.split("|");
			if (datos[0] == "Calcular") {
				var control = document.getElementById(datos[1]);
				if (control != null) {
					control.innerHTML = datos[0];
					NombreControl = "";
					control.onclick = function () {
						if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
							var rdnDetalle = document.getElementsByName("rdnDetalle");
							var chkTodos = document.getElementById("chkTodos");
							if (MedicosSeleccionados.length > 0) {
								for (var x = 0; x < rdnDetalle.length; x++) {
									rdnDetalle[x].setAttribute("disabled", "disabled");
								}
								chkTodos.setAttribute("disabled", "disabled");
							}
							else {
								for (var x = 0; x < rdnDetalle.length; x++) {
									rdnDetalle[x].removeAttribute("disabled");
								}
								chkTodos.removeAttribute("disabled");
							}
							NombreControl = this.innerHTML + "|" + this.id.toString();
							var dato;
							var tipo;
							var datos;
							dato = matriz[idProvisionEnMatriz][13].split("¬");
							tipo = matriz[idProvisionEnMatriz][12];

							if (tipo == 3) {
								datos = "false|";
							}
							else {
								datos = "true|";
							}
							datos += (dato[1] == "1" ? true : false) + "|" + (dato[2] == "1" ? true : false) + "|" + (dato[3] == "1" ? true : false) + "|" + (dato[4] == "1" ? true : false) + "|" + (dato[5] == "1" ? true : false) + "|" + (dato[6] == "1" ? true : false);
							var strDatos = "";
							var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
							var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
							var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
							cabeceraEnvio = sucursalId + "|" + idProvision + "|" + tipo + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + datos + "|";
							nEnvios = Math.floor(MedicosSeleccionados.length / registroEnviar);
							if (MedicosSeleccionados.length % registroEnviar > 0) nEnvios++;
							inicioEnvio = 0;
							var lista = prepararDatosEnviar();
							strDatos += cabeceraEnvio + lista;
							var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
							$.ajax(url, "post", RptaCalculo, strDatos);
							var divOpcionesProvision = document.getElementById("divOpcionesProvision");
							var opciones = divOpcionesProvision.getElementsByTagName("LI");
							for (var x = 0; x < opciones.length; x++) {
								opciones[x].onclick = null;
							}
							var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
							btnDetalleCancelar.onclick = null;
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							this.onclick = null
						}
					}
				}
			}
			esPagina = true;
            if (socket != null && socket.OPEN == 1) {
                let cboMes = document.getElementById("cboMes").value;
                let txtAnio = document.getElementById("txtAnio").value;
                socket.send("1_" + sucursalId + "_" + cboMes + "_" + txtAnio);

			}
			var url = urlBase + "Proceso/ListarProvisionPorId/?ss=" + ss + "&id=" + idProvision;
			$.ajax(url, "get", listarProvision);
			var chkTodos = document.getElementById("chkTodos");
			chkTodos.checked = false;
			if (matrizDetalle.length > 0) {
				var checks = document.getElementsByName("rdnDetalle");
				for (var x = 0; x < checks.length; x++) {
					checks[x].checked = false;
				}
			}
		}
		else {
			var datos = NombreControl.split("|");
			if (datos[0] == "Calcular") {
				var control = document.getElementById(datos[1]);
				if (control != null) {
					control.innerHTML = datos[0];
					NombreControl = "";
					control.onclick = function () {
						if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
							NombreControl = this.innerHTML + "|" + this.id.toString();
							var dato;
							var tipo;
							var datos;
							dato = matriz[idProvisionEnMatriz][13].split("¬");
							tipo = matriz[idProvisionEnMatriz][12];

							if (tipo == 3) {
								datos = "false|";
							}
							else {
								datos = "true|";
							}
							datos += (dato[1] == "1" ? true : false) + "|" + (dato[2] == "1" ? true : false) + "|" + (dato[3] == "1" ? true : false) + "|" + (dato[4] == "1" ? true : false) + "|" + (dato[5] == "1" ? true : false) + "|" + (dato[6] == "1" ? true : false);
							var strDatos = "";
							var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
							var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
							var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
							var lista = MedicosSeleccionados.join("¬");
							strDatos += sucursalId + "|" + idProvision + "|" + tipo + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + lista + "|" + datos;
							var url = urlBase + "Proceso/CalcularProcesoMedico/?ss=" + ss;
							$.ajax(url, "post", RptaCalculo, strDatos);
							this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
							this.onclick = null
						}
					}
				}
			}
			mostraralerta("No se puede realizar el cambio de estado")
		}
	}
}


function mostrarProvisionDetalles(proceso, persona, especialidad) {
	var datos = proceso + "|" + persona + "|" + especialidad + "|" + SeleccionActualProceso;
	var ifrProvisionDetalleConceptos = document.getElementById("ifrProvisionDetalleConceptos");
	if (ifrProvisionDetalleConceptos.innerHTML == "") {
		ifrProvisionDetalleConceptos.innerHTML = "<iframe id='divIfrProceso' style='margin:0;padding:0;width:800px;height:530px;border: 1px solid transparent;' src='" + urlBase + "Proceso/ProvisionDetalleConceptos/?ss=" + ss + "&data=" + datos + "'></iframe>";
	}
	else {
		document.getElementById('divIfrProceso').src = urlBase + "Proceso/ProvisionDetalleConceptos/?ss=" + ss + "&data=" + datos;
	}
	abrirPopup("PopupProvisionDetalleConceptos");
}

function buscarProvision(codigo, id) {
	document.getElementById("txtDetalleDoctorPeriodo").value = matriz[id][3];
	document.getElementById("txtDetalleDoctorFechaInicio").value = matriz[id][4];
	document.getElementById("txtDetalleDoctorFechaFin").value = matriz[id][5];
	document.getElementById("txtDetalleDoctorTipoAdmision").value = matriz[id][6];
	document.getElementById("txtOrden").value = "";

	idProvision = codigo;
	idProvisionEnMatriz = id;
	if (matriz[id][6].toLowerCase() == "general") {
		document.getElementsByClassName("tab-link")[1].style.display = "none";
	}
	var url = urlBase + "Proceso/ListarProvisionPorId/?ss=" + ss + "&id=" + codigo;
	$.ajax(url, "get", listarProvision);
}

function llenarCombo(lista, nombreCombo, titulo, cabecera) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	if (cabecera == undefined) {
		contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
	}
	for (var x = 0; x < n; x++) {
		campos = lista[x].split("¦");
		contenido += "<option value='" + (nombreCombo == "ddlTipoAdmisionCabecera" ? campos[1] : campos[0]) + "'>" + campos[1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function listarProvision(rpta) {
	if (window.provisioncargar == 1) {
		abrirPopup('PopupActualizarProvision');
		window.provisioncargar = 0;
		document.getElementById("btngrabarActualizarProvision").innerHTML = "Confirmar";
		document.getElementById("spnCancelarProvision").onclick = function () { abrirPopup('PopupActualizarProvision') };
		document.getElementById("spnCancelarProvisionx").onclick = function () { abrirPopup('PopupActualizarProvision') };

	}

	if (rpta != "") {
		if (rpta.indexOf("ERROR") > -1) {
			var data = rpta.split("¬");
			switch (data[1]) {
				case "-1":
					mostraralerta(matrizMensaje[6]); // "Provisión NO ha sido revertido en el SPRING"
					break;
				case "-2":
					mostraralerta("Error en Proceso de Provisión, contacte a su administrador");
					break;
			}
		}
		else {
			if (SehaRevertido) {
				buscarProvision(idProvision, idProvisionEnMatriz);
				ocultarPorProvision = true;
				SehaRevertido = false;
			}
			else {
				var data = rpta.split("¬");
				listaEmpresaMedico = data[0].split("¯");
				listaEmpresaMedicoEspecialidad = data[1].split("¯");
				listaEmpresaMedicoConfiguracion = data[2].split("¯");
				llenarCombo(listaEmpresaMedicoEspecialidad, "ddlMedicoEspecialidad", true);
				var divPrincipal = document.getElementById("divPrincipal");
				divPrincipal.style.display = "none";
				var divDetalleDoctor = document.getElementById("divDetalleDoctor");
				divDetalleDoctor.style.display = "";
				listaProvision = data[2].split("¯");
				var divOpcionesProvision = document.getElementById("divOpcionesProvision");
				var opcion = divOpcionesProvision.getElementsByTagName("LI");
				for (var x = 0; x < opcion.length; x++) {
					if (opcion[x].getAttribute("data-estado") == SeleccionActualProceso) {


						opcion[x].click();
						break;
					}
				}

				if (primerQuery) {
					for (var y = 0; y < opcion.length; y++) {
						dato = document.getElementById("spnOpcProv" + (y + 1)).innerHTML * 1;
						if (dato > 0) {
							opcion[y].click();
							break;
						}
					}
					primerQuery = false;
				}
			}


		}
	}
	else {
		//var data = rpta.split("¬");
		//listaEmpresaMedico = data[0].split("¯");
		//listaEmpresaMedicoEspecialidad = data[1].split("¯");
		//llenarCombo(listaEmpresaMedicoEspecialidad, "ddlMedicoEspecialidad", true);
		//var divPrincipal = document.getElementById("divPrincipal");
		//divPrincipal.style.display = "none";
		//var divDetalleDoctor = document.getElementById("divDetalleDoctor");
		//divDetalleDoctor.style.display = "";
		//listaProvision = data[2].split("¯");
		//var divOpcionesProvision = document.getElementById("divOpcionesProvision");
		//var opcion = divOpcionesProvision.getElementsByTagName("LI");
		//for (var x = 0; x < opcion.length; x++) {
		//	if (opcion[x].getAttribute("data-estado") == SeleccionActualProceso) {
		//		opcion[x].click();
		//		break;
		//	}
		//}
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbDetalleDoctor").innerHTML = contenido;
	}
}

function configurarChecksMedicos() {
	var rdnDetalle = document.getElementsByName("rdnDetalle");
	var nCampos = rdnDetalle.length;
	var valorCheck;
	var valor;
	var rdnPrincipal;
	for (var x = 0; x < nCampos; x++) {
		rdnDetalle[x].onclick = function () {
			valor = this.id.split("rdn").join("").trim();
			if (this.checked) {
				MedicosSeleccionados.push(matrizDetalle[valor][0] + "¦" + matrizDetalle[valor][15] + "¦" + matrizDetalle[valor][13]);
			}
			else {
				if (MedicosSeleccionados.length > 0) {
					for (var x = 0; x < MedicosSeleccionados.length; x++) {
						if (MedicosSeleccionados[x] == this.getAttribute("data-check")) {
							MedicosSeleccionados.splice(x, 1);
							break;
						}
					}
					if (MedicosSeleccionados.length <= 0) {
						MedicosSeleccionados = [];
						document.getElementById("chkTodos").checked = false;
					}
				}

			}

		}
		if (MedicosSeleccionados.length > 0) {
			valorCheck = rdnDetalle[x].getAttribute("data-check");
			for (var y = 0; y < MedicosSeleccionados.length; y++) {
				if (MedicosSeleccionados[y] == valorCheck) {
					rdnDetalle[x].checked = true;
					break;
				}
			}
		}

	}

}

function validarProceso() {

	var txtSucursalMant = document.getElementById("txtSucursalMant");
	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
	var txtObservacionMant = document.getElementById("txtObservacionMant");
	var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
	var txtFechaFinMant = document.getElementById("txtFechaFinMant");
	//txtFechaInicioMant.setAttribute("data-fecha", txtFechaInicioMant.value);
	//txtFechaFinMant.setAttribute("data-fecha", txtFechaFinMant.value);

	mensajeValidacion = [];
	var validar = document.getElementById("PopupProceso").getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeSucursalMant = validarTexto(txtSucursalMant.id, "Sucursal", true);
	if (mensajeSucursalMant != "") {
		mensajeValidacion[mensajeSucursalMant.getAttribute("data-secuencia")] = mensajeSucursalMant;
		mensajeSucursalMant.className += " error";
	}

	var mensajePeriodoMant = validarCombo(cboPeriodoMant.id, "Periodo", true);
	if (mensajePeriodoMant != "") {
		mensajeValidacion[cboPeriodoMant.getAttribute("data-secuencia")] = mensajePeriodoMant;
		cboPeriodoMant.className += " error";
	}


	var mensajeTipoAdmisionMant = validarCombo(cboTipoAdmisionMant.id, "Tipo de Admisión", true);
	if (mensajeTipoAdmisionMant != "") {
		mensajeValidacion[cboTipoAdmisionMant.getAttribute("data-secuencia")] = mensajeTipoAdmisionMant;
		cboTipoAdmisionMant.className += " error";
	}

	var mensajeObservacionMant = validarTexto(txtObservacionMant.id, "Observación", true);
	if (mensajeObservacionMant != "") {
		mensajeValidacion[txtObservacionMant.getAttribute("data-secuencia")] = mensajeObservacionMant;
		txtObservacionMant.className += " error";
	}

	var mensajeFechaInicio = validarFecha(txtFechaInicioMant.id, "fecha inicio", true);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtFechaInicioMant.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtFechaInicioMant.className += " error";
	}

	var mensajeFechaFin = validarFecha(txtFechaFinMant.id, "fecha fin", true);
	if (mensajeFechaFin != "") {
		mensajeValidacion[txtFechaFinMant.getAttribute("data-secuencia")] = mensajeFechaFin;
		txtFechaFinMant.className += " error";
	}

	var rdnConfiguracionPago = document.getElementsByName("rdn-ConfiguracionPago");
	for (var x = 0; x < rdnConfiguracionPago.length; x++) {
		if (rdnConfiguracionPago[x].checked) {
			c = 1;
			break;
		}
	}
	var divConfiguraciones = document.getElementById("divConfiguraciones");
	if (divConfiguraciones.style.display == "none") {
		c = 1;
	}
	if (c == 1) {
		divConfiguraciones.className = "form-grupo fila centrado";
	}
	else {
		divConfiguraciones.className = "form-grupo fila centrado error";
	}

	if (mensajeValidacion.length > 0 || c == 0) {
		return false;
	} else {
		return true;
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
			if (Texto.value.match(/[,;]+/) != null && Tex != "txtObservacionMant") {
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

// **
function buscarProceso() {
	var txtOrden = document.getElementById("txtOrden");
	var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var ss = window.parent.document.getElementById("iss").value;
	if (txtOrden.value != "") {
		var ifrDetalleOA = document.getElementById("ifrDetalleOA");
		if (ifrDetalleOA.innerHTML == "") {
			ifrDetalleOA.innerHTML = "<iframe id='divIfrDetalleOA' style='margin:0;padding:0;width:1150px;height:440px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOrden.value + "'></iframe>";
		}
		else {
			var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
			divIfrDetalleOA.src = urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOrden.value;
		}
		document.getElementById("txtOADetalle").value = txtOrden.value;
		abrirPopup("PopupDetalleOA");
	} else {

	    var txtMedico = document.getElementById("txtMedico");
	    var txtPaciente=document.getElementById("txtPaciente");
		var cboMes = document.getElementById("cboMes");
		var txtAnio = document.getElementById("txtAnio");
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		var txtFechaFin = document.getElementById("txtFechaFin");

		var hdfIdPaciente = document.getElementById("hdfIdPaciente");
		var hdfMedico = document.getElementById("hdfMedico");


		var valMedico = hdfMedico.value;
		var valMes = (cboMes.value == undefined || cboMes.value == "" ? "0" : cboMes.value);
		var valAnio = (txtAnio.value == undefined || txtAnio.value == "" ? "0" : txtAnio.value);
		var valFechaInicio = (txtFechaInicio.value == undefined || txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value);
		var valFechaFin = (txtFechaFin.value == undefined || txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value);
		var valOrden = (txtOrden.value == undefined || txtOrden.value == "" ? "" : txtOrden.value);
		var valPaciente = hdfIdPaciente.value;

		var frm = new FormData();
		frm.append("SucursalId", intSucursalId);
		frm.append("Mes", valMes);
		frm.append("Anio", valAnio);
		frm.append("PeriodoFechaInicio", valFechaInicio);
		frm.append("PeriodoFechaFin", valFechaFin);
		//frm.append("OrdenAtencion", valOrden);
		frm.append("MedicoId", valMedico);
		frm.append("PacienteId", valPaciente);
		var url = urlBase + "Proceso/listarProceso/?ss=" + ss + "&or=" + valOrden;
		$.ajax(url, "post", listarTodo, frm);
		configuracionInicial();
		var btnBuscar = document.getElementById("btnBuscar");
		btnBuscar.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		btnBuscar.disabled = true;
		btnBuscar.style.pointerEvents = "none";
		var matrizGuardar = ["txtMedico¦" + txtMedico.value, "hdfMedico¦"+hdfMedico.value, "cboMes¦"+cboMes.value,"txtAnio¦"+txtAnio.value,"txtFechaInicio¦"+txtFechaInicio.value,"txtFechaFin¦"+txtFechaFin.value, "txtPaciente¦"+txtPaciente.value,"hdfIdPaciente¦"+hdfIdPaciente.value, "txtOrden¦"+txtOrden.value, true];
		localStorage.clear();
		localStorage.setItem("ProcesoProvision", matrizGuardar.join("¬"));
	}
}

function listarTodo(rpta) {
	lista = [];
	if (rpta != "") {
		lista = rpta.split("¯");
		//var datos = rpta.split("¦");
		//var listachecks = lista[(datos.length - 1)];
		listarProcesos();
	}
	else {
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbProceso").innerHTML = contenido;
		document.getElementById("tdPaginas").innerHTML = "";
		document.getElementById("spnTotal").innerHTML = "0.00";

	}
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.innerHTML = "Buscar";
	btnBuscar.disabled = false;
	btnBuscar.style.pointerEvents = "auto";
}

function listarProcesos(irUltimaPagina) {
	crearMatriz(true);
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, true);
	else {
		paginar(0, true);
		indiceActualBloque = 0;
	}
}

function crearMatriz(opcion) {
	totales.mtImporte = 0,
	totales.mtBonificacion = 0,
	totales.mtDescuento = 0,
	totales.mtAjuste = 0,
	totales.mtTotal = 0;

	var nRegistros;
	var nCampos;
	var campos;
	var x = 0;
	if (opcion) {
		var total = 0;
		nRegistros = lista.length;
		matriz = [];
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			matriz[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j])) {
					matriz[x][j] = campos[j];
				}
				else {
					matriz[x][j] = campos[j] * 1;
					if (j == 8) {
						if (campos[9].toUpperCase() != "INACTIVO") {
							total = total + (campos[j] * 1);
						}
					}
				}
			}
			x++;
		}

		document.getElementById("spnTotal").innerHTML = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
	}
	else {
		a = 0;
		b = 0;
		c = 0;
		d = 0;
		e = 0;
		var valor;
		nRegistros = listaProvision.length;
		matrizDetalle = [];
		//matrizAnios = [];
		var matrizConteoConfiguracion = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (i = 0; i < nRegistros; i++) {
			campos = listaProvision[i].split("¦");
			if (SeleccionActualProceso == campos[8]) {
				matrizConteoConfiguracion[campos[16] * 1] = (matrizConteoConfiguracion[campos[16] * 1] == undefined ? 0 : matrizConteoConfiguracion[campos[16] * 1]) + 1;
			}
			if (SeleccionActualProceso == "P") {
				if (SeleccionActualProceso == campos[8] || campos[8] == "I") {
					matrizDetalle[x] = [];
					nCampos = campos.length;
					for (j = 0; j < (nCampos + 1) ; j++) {
						if ((isNaN(campos[j]) || campos[j] == "" || j == 7) && j != 16) {
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
			else {

				if (SeleccionActualProceso == campos[8] && (ConfiguracionPagoActual == (campos[16] * 1))) {
					matrizDetalle[x] = [];
					nCampos = campos.length;
					for (j = 0; j < (nCampos + 1) ; j++) {
						if ((isNaN(campos[j]) || campos[j] == "" || j == 7) && j != 16) {
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
			if (IndicadorPrimero) {
				switch (campos[8]) {
					case "P":
						a = a + 1;
						break;
					case "C":
						b = b + 1;
						break;
					case "A":
						c = c + 1;
						break;
					case "F":
						d = d + 1;
						break;
					case "G":
						e = e + 1;
						break;
				}
			}
		}
		for (var z = 0; z < matrizConteoConfiguracion.length; z++) {
			var tab = document.getElementById("spnTabConfiguracion" + z)
			if (matrizConteoConfiguracion[z] == 0) {
				document.getElementsByClassName("tab-link")[z].style.display = "none";
			}
			else {
				if (z == 1) {
					if (document.getElementById("txtDetalleDoctorTipoAdmision").value == "General") document.getElementsByClassName("tab-link")[z].style.display = "none";
					else document.getElementsByClassName("tab-link")[z].style.display = "";
				} else {
					document.getElementsByClassName("tab-link")[z].style.display = "";
				}
				tab.innerHTML = (matrizConteoConfiguracion[z] > 99 ? "99+" : matrizConteoConfiguracion[z]);
			}
		}
	}
}

function paginar(indicePagina, opcion) {
	var nRegistros
	if (opcion) nRegistros = matriz.length;
	else nRegistros = matrizDetalle.length;
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
	mostrarMatriz(indicePagina, opcion);
}


function crearPaginas(opcion) {
	var nRegistros;
	if (opcion) nRegistros = matriz.length;
	else nRegistros = matrizDetalle.length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1," + opcion + ");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2," + opcion + ");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += "," + opcion + ");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			if (opcion) {
				contenido += "' id='a";
			} else {
				contenido += "' id='ad";
			}
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3," + opcion + ");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4," + opcion + ");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		if (opcion) document.getElementById("tdPaginas").innerHTML = "";
		else document.getElementById("tdPaginasDetalle").innerHTML = "";

	}
	else {
		if (opcion) document.getElementById("tdPaginas").innerHTML = contenido;
		else document.getElementById("tdPaginasDetalle").innerHTML = contenido;
		seleccionarPaginaActual(opcion);
	}
}

function seleccionarPaginaActual(opcion) {
	var aPagina = document.getElementById("a" + (opcion == true ? "" : "d") + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

// ***
function configuracionInicial() {
	configurarOrdenacion();
	configurarControles2();
	configurarFiltro();
}

function crearTabla(opcion) {
	var nCampos;
	var contenido = "";
	if (opcion) {
		nCampos = cabeceras.length;
		contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
			contenido += "<span class='Icons fa-plus' onclick='operacion(\"Creación de Proceso de Provisión\");EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupProceso\");estableceFormulario();'></span>";
		}
		contenido += "</th>";
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
			if (j != 0) {
			    if (j == 6) {
			        //contenido += "<select class='Combo' name='cabecera' id='ddlTipoAdmisionCabecera' style='width:90%'></select>";
			        contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
			    } else {
			        contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
			    }
			}
			contenido += "</th>";
		}
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
			contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcel'></a>";
		}
		contenido += "</th>";
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbProceso' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginas' colspan='";
		contenido += (nCampos + 2).toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		document.getElementById("divProceso").innerHTML = contenido;
	}
	else {
		var nCampos = cabecerasDetalle.length;
		var contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th " + (j == 8 ? "class='ocultar'" : "") + " style='width:";
			contenido += anchosDetalle[j];
			contenido += "%'><span id='spnD";
			contenido += j.toString();
			contenido += "' class='EnlaceD' data-orden='";
			contenido += matrizIndiceDetalle[j];
			contenido += "'>";
			contenido += cabecerasDetalle[j];
			contenido += "</span><br/>";
			if (j != (nCampos - 1)) {
				switch (j) {
					case 2:
						contenido += "<select class='ComboD' name='cabeceraD'style='width:90%'id='ddlMedicoEspecialidad'></select>";
						break;
					case 8:
						contenido += "<select class='ComboD' name='cabeceraD'style='width:90%'><option value=''>TODOS</option><option value='true'>SI</option><option value='false'>NO</option></select>";
						break;
					default:
						contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
						break;
				}
			}
			contenido += "</th>";
		}
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
			contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a>";
		}
		contenido += "</th>";
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbDetalleDoctor' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginasDetalle' colspan='";
		contenido += (nCampos + 2);
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		document.getElementById("divDetalle").innerHTML = contenido;
	}
}


function mostrarMatriz(indicePagina, opcion) {
	if (opcion) {
		var contenido = "";
		var n = matriz.length;
		if (n > 0) {
			var nCampos = cabeceras[0].length;
			var inicio = indicePagina * registrosPagina;
			var fin = inicio + registrosPagina;
			var datoConfSel;
			for (var i = inicio; i < fin; i++) {
				if (i < n) {
					if (matriz[i][16] == "True") contenido += "<tr class='FilaDatos' style='background: rgba(247, 147, 140, 0.75);'>";
					else contenido += "<tr class='FilaDatos'>";
					contenido += "<td style='text-align:center'>";
					if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
						contenido += "<span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarProceso(";
						contenido += matriz[i][0];
						contenido += ","
						if (matriz[i][9] == "PROVISIONADO") contenido += false;
						else contenido += true;
						contenido += ")'></span>";
					}
					contenido += "</td>";
					for (var j = 0; j < nCampos + 2; j++) {
						if (j == 8) {
							contenido += "<td style='text-align:right'>";
							contenido += matriz[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
						} else {
							if (j == 7) contenido += "<td style='text-align:right'>";
							else contenido += "<td>";
							switch (j) {
								case 0:
									contenido += matriz[i][2].split("$")[0];
									break;
								case 1:
									contenido += matriz[i][0];
									break;
								case 2:
									contenido += matriz[i][3];
									break;
								case 3:
									contenido += matriz[i][15];
									break;
								default:
									contenido += matriz[i][j];
									break;
							}
							contenido += "</td>";
						}
					}
					contenido += "<td style='text-align:center'>";
					if (matriz[i][9] != "INACTIVO") {
						if (matrizSeguridad.length > 0 && ((matrizSeguridad[4].split("¦")[2] * 1) == 1)) {
							contenido += "<span class='Icons fa-money' onclick='buscarProvision(" + matriz[i][0] + "," + i + ");";
							if (matriz[i][9] == "PROVISIONADO") contenido += "ocultarPorProvision = false;primerQuery=true;'";
							contenido += "ocultarPorProvision = true;primerQuery=true;'";
							contenido += "></span>&nbsp;&nbsp";
						}
						if (matriz[i][9] == "PENDIENTE" || matriz[i][9] == "CALCULADO") {
							if (matriz[i][2].split("$")[1] == "1") {
								contenido += "<span class='Icons fa-gears' onclick='busquedaAjusteCambioContrato(\"";
								contenido += matriz[i][0];
								contenido += "¦";
								contenido += limpiarSaltos(matriz[i][10]);
								contenido += "¦";
								contenido += (matriz[i][6] == "Asegurado" ? "2" : "1");
								contenido += "¦";
								contenido += window.location.href.split("&id=")[1];
								contenido += "\");'></span>&nbsp;&nbsp";
							}
							else {
								if (matriz[i][2].split("$")[2] == "1") {
									contenido += "<span class='Icons fa-gears' onclick='busquedaSeleccionMedico(\"";
									contenido += matriz[i][1];
									contenido += "¦";
									contenido += matriz[i][0];
									contenido += "¦";
									datoConfSel = matriz[i][13].split("¬");
									for (var e = 1; e < datoConfSel.length - 1; e++) {
										if (datoConfSel[e] == "1") {
											contenido += document.getElementsByName("rdn-ConfiguracionPago")[e-1].value;
											break;
										}
									}
									contenido += "\",";
									contenido += i;
									contenido += ");'></span>&nbsp;&nbsp";
								}
							}
						}
					}
					if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
						contenido += "<span class='Icons ";
						contenido += (matriz[i][9] == "PROVISIONADO" ? "" : (matriz[i][9] == "INACTIVO" ? "fa-check" : "fa-trash-o"));
						contenido += "'";
						if (matriz[i][14] == "I") {
							contenido += " onclick='mostraralerta(\"No se puede realizar el cambio de estado\")'";
						}
						else {
							contenido += " onclick='operacion(\"Actualizar Estado Proceso\");abrirPopup(";
							contenido += '"PopupEstado"';
							contenido += ");Campoeliminar=";
							contenido += i;
							contenido += ";'";
						}
						contenido += "></span>";
					}
					contenido += "</td></tr>";
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
		document.getElementById("tbProceso").innerHTML = contenido;
		crearPaginas(opcion);
	}
	else {
		indiceActualPagina = indicePagina;
		var contenido = "";
		Campoeliminar = "";
		var n = matrizDetalle.length;
		var nCabeceras = cabeceras.length;
		var ConfiguracionActual = 0;
		var variableActual = -1;
		if (n > 0) {
			var nCampos = cabecerasDetalle.length;
			var inicio = indicePagina * registrosPagina;
			var fin = inicio + registrosPagina;
			var matrizSumatoria = {};
			for (var i = 0; i < matrizDetalle.length; i++) {
				if (i < n) {
					if (matrizDetalle[i][14] == 0) {
						variableActual = i;
						var contenido2 = "";
						if (matrizDetalle[i + 1] != undefined && (matrizDetalle[i][0] == matrizDetalle[i + 1][0]) && matrizDetalle[i + 1][14] == 0) {
							matrizSumatoria = {};
							matrizSumatoria[matrizDetalle[i][0].toString() + "0"] = 0;
							matrizSumatoria[matrizDetalle[i][0].toString() + "1"] = 0;
							matrizSumatoria[matrizDetalle[i][0].toString() + "2"] = 0;
							matrizSumatoria[matrizDetalle[i][0].toString() + "3"] = 0;
							matrizSumatoria[matrizDetalle[i][0].toString() + "4"] = 0;
							contenido2 = "";
							for (w = i; w < matrizDetalle.length; w++) {
								contenido2 += "<tr name='ES";
								contenido2 += matrizDetalle[w][14];
								contenido2 += matrizDetalle[w][0];
								contenido2 += "' class='FilaDatos' style='display:none'>";
								contenido2 += "<td style='text-align:center'>";
								if (SeleccionActualProceso != "F" && SeleccionActualProceso != "A" && SeleccionActualProceso != "G") {
									contenido2 += "<input type='checkbox' name='rdnDetalle' id='rdn";
									contenido2 += w;
									contenido2 += "' data-check='";
									contenido2 += matrizDetalle[w][0];
									contenido2 += "¦";
									contenido2 += matrizDetalle[w][15];
									contenido2 += "¦";
									contenido2 += matrizDetalle[w][13];
									contenido2 += "'/>";
								}
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
												if ((valor[0] * 1) == (matrizDetalle[w][13] * 1)) {
													contenido2 += valor[1];
													break;
												}
											}
											break
										case 1:
											contenido2 += "<td>";
											break;
										case 8:
											contenido2 += "<td class='ocultar' style='text-align:center'>";
											if (matrizDetalle[w][8] == "C") contenido2 += (matrizDetalle[w][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarObservadas(" + w + ")'>SI</span>");
											else contenido2 += (matrizDetalle[w][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarError(" + w + ")'>SI</span>");
											break;
										case 9:
											contenido2 += "<td>";
											contenido2 += "<span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='" + matrizDetalle[w][15] + "'>";
											switch (matrizDetalle[w][8]) {
												case "P":
													contenido2 += "PENDIENTE";
													contenido2 += "<span>";
													break;
												case "A":
													contenido2 += "AUTORIZADO";
													contenido2 += "<span>";
													break;
												case "C":
													contenido2 += "CALCULADO";
													contenido2 += "<span>";
													break;
												case "I":
													contenido2 += "ANULADO";
													contenido2 += "<span>";
													break;
												default:
													contenido2 += "PROVISIONADO";
													contenido2 += "<span>";
													break;
											}
											break;
										default:
											contenido2 += "<td style='text-align:right'>";
											contenido2 += matrizDetalle[w][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
											break;
									}
									contenido2 += "</td>";
								}
								contenido2 += "<td style='text-align:center'><span class='Icons ";
								contenido2 += (matrizDetalle[w][8] != "P" && matrizDetalle[w][8] != "I" ? "fa-list-alt" : "");
								if (matrizDetalle[w][8] == "P") {
									contenido2 += "'></span></td>";
									contenido2 += "</tr>";
								}
								else {
									contenido2 += "' onclick='mostrarProvisionDetalles(";
									contenido2 += idProvision;
									contenido2 += ",";
									contenido2 += matrizDetalle[w][0];
									contenido2 += ",";
									contenido2 += matrizDetalle[w][13];
									contenido2 += ");ProcesoMedicoActual=";
									contenido2 += w;
									contenido2 += "'";
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
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:center'></td><td></td>";
							contenido += "<td>";
							contenido += "<span class='Icons fa-plus-square' onclick='expandir(\"ES\",\"";
							contenido += matrizDetalle[variableActual][14];
							contenido += matrizDetalle[variableActual][0];
							contenido += "\",this.id)' id='ME";
							contenido += matrizDetalle[variableActual][14];
							contenido += matrizDetalle[variableActual][0];
							contenido += "'></span>&nbsp;";
							contenido += matrizDetalle[variableActual][1];
							contenido += "</td><td></td>";
							contenido += "<td style='text-align:right'>";
							contenido += matrizSumatoria[matrizDetalle[variableActual][0].toString() + "0"].toLocaleString('en-US', { minimumFractionDigits: 2 });
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
							contenido += "<td colspan='" + (SeleccionActualProceso != "P" ? 3 : 3) + "'></td>";
							contenido += "</tr>";
							contenido += contenido2;
						}
						else {
							contenido += "<tr class='FilaDatos'>";
							contenido += "<td style='text-align:center'>";
							if (SeleccionActualProceso != "F" && SeleccionActualProceso != "A" && SeleccionActualProceso != "G") {
								contenido += "<input type='checkbox' name='rdnDetalle' id='rdn";
								contenido += i;
								contenido += "' data-check='";
								contenido += matrizDetalle[i][0];
								contenido += "¦";
								contenido += matrizDetalle[i][15];
								contenido += "¦";
								contenido += matrizDetalle[i][13];
								contenido += "'/>";
							}
							contenido += "</td>";
							for (var j = 0; j < nCampos ; j++) {
								switch (j) {
									case 0:
										contenido += "<td>";
										break;
									case 2:
										contenido += "<td>";
										for (var w = 0; w < listaEmpresaMedicoEspecialidad.length; w++) {
											valor = listaEmpresaMedicoEspecialidad[w].split("¦");
											if ((valor[0] * 1) == (matrizDetalle[i][13] * 1)) {
												contenido += valor[1];
												break;
											}
										}
										break
									case 1:
										contenido += "<td>";
										contenido += matrizDetalle[i][1];
										break;
									case 8:
										contenido += "<td class='ocultar' style='text-align:center'>";
										if (matrizDetalle[i][8] == "C") contenido += (matrizDetalle[i][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarObservadas(" + i + ")'>SI</span>");
										else contenido += (matrizDetalle[i][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarError(" + i + ")'>SI</span>");
										break;
									case 9:
										contenido += "<td>";
										contenido += "<span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='" + matrizDetalle[i][15] + "'>";
										switch (matrizDetalle[i][8]) {
											case "P":
												contenido += "PENDIENTE";
												contenido += "</span>";
												break;
											case "A":
												contenido += "AUTORIZADO";
												contenido += "</span>";
												break;
											case "C":
												contenido += "CALCULADO";
												contenido += "</span>";
												break;
											case "I":
												contenido += "ANULADO";
												contenido += "</span>";
												break;
											default:
												contenido += "PROVISIONADO";
												contenido += "</span>";
												break;
										}

										//contenido += (matrizDetalle[i][8] == "P" ? "PENDIENTE" : (matrizDetalle[i][8] == "A" ? "AUTORIZADO" : (matrizDetalle[i][8] == "C" ? "CALCULADO" : "PROVISIONADO")));
										break;
									default:
										contenido += "<td style='text-align:right'>";
										contenido += matrizDetalle[i][j - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
										break;
								}
								contenido += "</td>";
							}
							contenido += "<td style='text-align:center'><span class='Icons ";
							contenido += (matrizDetalle[i][8] != "P" && matrizDetalle[i][8] != "I" ? "fa-list-alt" : "");
							if (matrizDetalle[i][8] == "P") {
								contenido += "'></span></td>";
								contenido += "</tr>";
							}
							else {
								contenido += "' onclick='mostrarProvisionDetalles(";
								contenido += idProvision;
								contenido += ",";
								contenido += matrizDetalle[i][0];
								contenido += ",";
								contenido += matrizDetalle[i][13];
								contenido += ");ProcesoMedicoActual=";
								contenido += i;
								contenido += "'";
								contenido += "></span></td>";
								contenido += "</tr>";
							}
						}
					} else {
						var valor;
						var variableActual = i;
						var contenido3 = "";
						matrizSumatoria = {};
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
							if (matrizDetalle[x + 1] != undefined && matrizDetalle[x][0] == matrizDetalle[x + 1][0] && matrizDetalle[x][14] == matrizDetalle[x + 1][14]) {
								for (var y = x; y < matrizDetalle.length; y++) {
									contenido2 += "<tr name='ES";
									contenido2 += matrizDetalle[y][14];
									contenido2 += matrizDetalle[y][0];
									contenido2 += "' class='FilaDatos ES";
									contenido2 += matrizDetalle[y][14];
									contenido2 += "' style='display:none'>";
									contenido2 += "<td style='text-align:center'>";
									if (SeleccionActualProceso != "F" && SeleccionActualProceso != "A" && SeleccionActualProceso != "G") {
										contenido2 += " <input type='checkbox' name='rdnDetalle' id='rdn";
										contenido2 += y;
										contenido2 += "' data-check='";
										contenido2 += matrizDetalle[y][0];
										contenido2 += "¦";
										contenido2 += matrizDetalle[y][15];
										contenido2 += "¦";
										contenido2 += matrizDetalle[y][13];
										contenido2 += "'/>";
									}
									contenido2 += "</td><td></td>";
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
													if ((valor[0] * 1) == (matrizDetalle[y][13] * 1)) {
														contenido2 += valor[1];
														break;
													}
												}
												break;
											case 7:
												contenido2 += "<td style='text-align:right'>";
												contenido2 += matrizDetalle[y][6].toLocaleString('en-US', { minimumFractionDigits: 2 });
												break;
											case 8:
												contenido2 += "<td class='ocultar' style='text-align:center'>";
												if (matrizDetalle[y][8] == "C") contenido2 += (matrizDetalle[y][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarObservadas(" + y + ")'>SI</span>");
												else contenido2 += (matrizDetalle[y][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarError(" + y + ")'>SI</span>");
												break;
											case 9:
												contenido2 += "<td>";
												contenido2 += "<span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='" + matrizDetalle[y][15] + "'>";
												switch (matrizDetalle[y][8]) {
													case "P":
														contenido2 += "PENDIENTE";
														contenido2 += "</span>";
														break;
													case "A":
														contenido2 += "AUTORIZADO";
														contenido2 += "</span>";
														break;
													case "C":
														contenido2 += "CALCULADO";
														contenido2 += "</span>";
														break;
													case "I":
														contenido2 += "ANULADO";
														contenido2 += "</span>";
														break;
													default:
														contenido2 += "PROVISIONADO";
														contenido2 += "</span>";
														break;
												}

												//contenido2 += (matrizDetalle[y][8] == "P" ? "PENDIENTE" : (matrizDetalle[y][8] == "A" ? "AUTORIZADO" : (matrizDetalle[y][8] == "C" ? "CALCULADO" : "PROVISIONADO")));
												break;
											default:
												contenido2 += "<td style='text-align:right'>";
												contenido2 += matrizDetalle[y][h - 1].toLocaleString('en-US', { minimumFractionDigits: 2 });
												break;
										}
										contenido2 += "</td>";
									}
									contenido2 += "<td style='text-align:center'><span class='Icons ";
									contenido2 += (matrizDetalle[y][8] != "P" && matrizDetalle[y][8] != "I" ? "fa-list-alt" : "");
									if (matrizDetalle[y][8] == "P") {
										contenido2 += "'></span></td>";
										contenido2 += "</tr>";
									}
									else {
										contenido2 += "' onclick='mostrarProvisionDetalles(";
										contenido2 += idProvision;
										contenido2 += ",";
										contenido2 += matrizDetalle[y][0];
										contenido2 += ",";
										contenido2 += matrizDetalle[y][13];
										contenido2 += ");ProcesoMedicoActual=";
										contenido2 += y;
										contenido2 += "'";
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
								contenido3 += matrizDetalle[x][14];
								contenido3 += "' style='display:none' data-icono='";
								contenido3 += matrizDetalle[x][14];
								contenido3 += matrizDetalle[x][0];
								contenido3 += "'><td style='text-align:center'></td><td></td><td style='text-align:left;color:#00a850' colspan='2'>";
								contenido3 += "<span class='Icons fa-plus-square' onclick='expandir(\"ES\",\"";
								contenido3 += matrizDetalle[x][14];
								contenido3 += matrizDetalle[x][0];
								contenido3 += "\",this.id)' id='ME";
								contenido3 += matrizDetalle[x][14];
								contenido3 += matrizDetalle[x][0];
								contenido3 += "'></span>&nbsp;";
								contenido3 += matrizDetalle[x][1];
								contenido3 += "</td><td style='text-align:right'>";
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
								contenido3 += "</td><td colspan='" + (SeleccionActualProceso != "P" ? 3 : 3) + "'></td>";
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
								else if (matrizDetalle[x][14] != matrizDetalle[x + 1][14]) {
									break;
								}
							}
							else {
								contenido3 += "<tr name='ME";
								contenido3 += matrizDetalle[x][14];
								contenido3 += "' style='display:none' data-icono='";
								contenido3 += matrizDetalle[x][14];
								contenido3 += matrizDetalle[x][0];
								contenido3 += "'><td style='text-align:center'>";
								if (SeleccionActualProceso != "F" && SeleccionActualProceso != "A" && SeleccionActualProceso != "G") {
									contenido3 += "<input type='checkbox' name='rdnDetalle' id='rdn";
									contenido3 += x;
									contenido3 += "' data-check='";
									contenido3 += matrizDetalle[x][0];
									contenido3 += "¦";
									contenido3 += matrizDetalle[x][15];
									contenido3 += "¦";
									contenido3 += matrizDetalle[x][13];
									contenido3 += "'/>";
								}
								contenido3 += "<td></td><span class='Icons fa-plus-square' style='display:none' id='ME";
								contenido3 += matrizDetalle[x][14];
								contenido3 += matrizDetalle[x][0];
								contenido3 += "'></span></span><td style='text-align:left;color:#00a850'>";
								contenido3 += matrizDetalle[x][1];
								contenido3 += "</td>";
								contenido3 += "<td>";
								for (var w = 0; w < listaEmpresaMedicoEspecialidad.length; w++) {
									var valoxr = listaEmpresaMedicoEspecialidad[w].split("¦");
									if ((valoxr[0] * 1) == (matrizDetalle[x][13] * 1)) {
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
								contenido3 += "<td class='ocultar' style='text-align:center'>";
								if (matrizDetalle[x][8] == "C") contenido3 += (matrizDetalle[x][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarObservadas(" + x + ")'>SI</span>");
								else contenido3 += (matrizDetalle[x][7].toLowerCase() == "false" ? "" : "<span class='puntero' style='color:#00a850' onclick='mostrarError(" + x + ")'>SI</span>");
								contenido3 += "<td>";
								contenido3 += "<span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='" + matrizDetalle[x][15] + "'>";
								switch (matrizDetalle[x][8]) {
									case "P":
										contenido3 += "PENDIENTE";
										contenido3 += "</span>";
										break;
									case "A":
										contenido3 += "AUTORIZADO";
										contenido3 += "</span>";
										break;
									case "C":
										contenido3 += "CALCULADO";
										contenido3 += "</span>";
										break;
									case "I":
										contenido3 += "ANULADO";
										contenido3 += "</span>";
										break;
									default:
										contenido3 += "PROVISIONADO";
										contenido3 += "</span>";
										break;
								}
								//contenido3 += (matrizDetalle[x][8] == "P" ? "PENDIENTE" : (matrizDetalle[x][8] == "A" ? "AUTORIZADO" : (matrizDetalle[x][8] == "C" ? "CALCULADO" : "PROVISIONADO")));
								contenido3 += "</td>";
								contenido3 += "<td style='text-align:center'><span class='Icons ";
								contenido3 += (matrizDetalle[x][8] != "P" && matrizDetalle[x][8] != "I" ? "fa-list-alt" : "");
								if (matrizDetalle[x][8] == "P") {
									contenido3 += "'></span></td>";
									contenido3 += "</tr>";
								}
								else {
									contenido3 += "' onclick='mostrarProvisionDetalles(";
									contenido3 += idProvision;
									contenido3 += ",";
									contenido3 += matrizDetalle[x][0];
									contenido3 += ",";
									contenido3 += matrizDetalle[x][13];
									contenido3 += ");ProcesoMedicoActual=";
									contenido3 += x;
									contenido3 += "'";
									contenido3 += "></span></td>";
									contenido3 += "</tr>";
								}
								valor1 = valor1 + matrizDetalle[x][2];
								valor2 = valor2 + matrizDetalle[x][3];
								valor3 = valor3 + matrizDetalle[x][4];
								valor4 = valor4 + matrizDetalle[x][5];
								valor5 = valor5 + matrizDetalle[x][6];
								i = x;
								if (matrizDetalle[x + 1] == undefined) {
									break;
								}
								else if (matrizDetalle[x][14] != matrizDetalle[x + 1][14]) {
									break;
								}
							}
						}
						contenido += "<tr><td></td><td style='text-align:left;font-weight:bold' colspan='3'>";
						contenido += "<span class='Icons fa-plus-square' onclick='expandir(\"ME\",\"";
						contenido += matrizDetalle[variableActual][14];
						contenido += "\",this.id)' id='EX";
						contenido += matrizDetalle[variableActual][14];
						contenido += "'></span>&nbsp;";
						for (var w = 0; w < listaEmpresaMedico.length; w++) {
							valor = listaEmpresaMedico[w].split("¦");
							if ((valor[0] * 1) == (matrizDetalle[variableActual][14] * 1)) {
								contenido += valor[1];
								break;
							}
						}
						contenido += "</td>";
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
						contenido += "<td colspan='" + (SeleccionActualProceso != "P" ? 3 : 3) + "'></td></tr>";
						contenido += contenido3;
					}

				}
				else break;
			}
			//if (SeleccionActualProceso != "P") {
			//	contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='4'>Totales</td><td style='text-align:right'>" + formatearNumero(totales.mtImporte) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtBonificacion) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtDescuento) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtAjuste) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtTotal) + "</td><td colspan='3'></td></tr>";
			//}
			//else if (SeleccionActualProceso == "P") {
			contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='4'>Totales</td><td style='text-align:right'>" + formatearNumero(totales.mtImporte) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtBonificacion) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtDescuento) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtAjuste) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtTotal) + "</td><td colspan='" + (SeleccionActualProceso != "P" ? 3 : 3) + "'></td></tr>";
			//}
		}
		else {
			var nCabeceras = cabeceras.length;
			contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
			contenido += ((SeleccionActualProceso != "P" ? (nCabeceras + 1) : nCabeceras) + 2).toString();
			contenido += "'>No hay datos</td></tr>";
		}
		excelExportarDetalle = contenido;
		document.getElementById("tbDetalleDoctor").innerHTML = contenido;
		//crearPaginas(opcion);
		configurarChecksMedicos();
		var rdnDetalle = document.getElementsByName("rdnDetalle");
		var chkTodos = document.getElementById("chkTodos");
		if (inicioEnvio > 0) {
			for (var x = 0; x < rdnDetalle.length; x++) {
				rdnDetalle[x].setAttribute("disabled", "disabled");
			}
			chkTodos.setAttribute("disabled", "disabled");
		}
		else {
			for (var x = 0; x < rdnDetalle.length; x++) {
				rdnDetalle[x].removeAttribute("disabled");
			}
			chkTodos.removeAttribute("disabled");
		}
		if (SeleccionActualProceso != "P") {
			ocultarTd(true);
		} else {
			ocultarTd(false);
		}

		configurarHistorial();

	}
}
function configurarHistorial() {
	var hstest = document.getElementsByClassName("hstest");
	var n = hstest.length, spn;
	for (var i = 0; i < n; i++) {
		spn = hstest[i];
		spn.onclick = function () {
			var valor = this.getAttribute("data-v");
			var hdfCd = document.getElementById("hdfCd");
			hdfCd.value = valor;
			verHistorial("ProcesoMedico");
		}
	}
}

function limpiarCabeceras() {
	var TextoD = document.getElementsByClassName("TextoD");
	for (var x = 0; x < TextoD.length; x++) {
		TextoD[x].value = "";
	}
	var ComboD = document.getElementsByClassName("ComboD");
	for (var y = 0; y < ComboD.length; y++) {
		ComboD[y].selectedIndex = "0";
	}
	ComboD[0].onchange();
	var chkTodos = document.getElementById("chkTodos");
	chkTodos.checked = false;
	var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
	if (aExportarExcelDetalle != null) {
		aExportarExcelDetalle.removeAttribute("download");
		aExportarExcelDetalle.href = "#";
	}
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

function mostrarError(id) {
	document.getElementById("spnErrorDescripcion").innerHTML = matrizDetalle[id][9];
	var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
	var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
	var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value
	var valor = "";
	var valor2 = "";
	var dato;
	var datos
	for (var x = 0; x < listaTipoAdmision.length; x++) {
		dato = listaTipoAdmision[x].split("¦");
		if (dato[1] == txtDetalleDoctorTipoAdmision) {
			valor = dato[0];
			break;
		}
	}

	for (var z = 0; z < listaEmpresaMedicoEspecialidad.length; z++) {
		datos = listaEmpresaMedicoEspecialidad[z].split("¦");
		if ((datos[0] * 1) == (matrizDetalle[id][13] * 1)) {
			valor2 = datos[1];
			break;
		}
	}

	var detalles = matrizDetalle[id][0] + "|" + valor + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + matrizDetalle[id][13] + "|" + matriz[idProvisionEnMatriz][0] + "|" + (matriz[idProvisionEnMatriz][2].split("$")[1] == "1" ? "true" : "false") + "¬" + valor2;
	var ifrDetalleError = document.getElementById("ifrDetalleError");
	if (ifrDetalleError.innerHTML == "") {
		//ifrDetalleError.innerHTML = "<iframe id='divifrDetalleError' style='margin:0;padding:0;width:100%;height:420px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/DetalleErroresLista/?ss=" + ss + "&data=" + detalles + "'></iframe>";
		ifrDetalleError.innerHTML = "<iframe id='divifrDetalleError' style='margin:0;padding:0;width:100%;height:420px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/DetalleObservadosLista/?ss=" + ss + "&data=" + detalles + "'></iframe>";
	}
	else {
		//document.getElementById('divifrDetalleError').src = urlBase + "Mantenimiento/DetalleErroresLista/?ss=" + ss + "&data=" + detalles;
		document.getElementById('divifrDetalleError').src = urlBase + "Mantenimiento/DetalleObservadosLista/?ss=" + ss + "&data=" + detalles;
	}
	abrirPopup('PopupError');
}

function mostrarObservadas(id) {
	document.getElementById("spnObservadoDescripcion").innerHTML = matrizDetalle[id][9];
	var txtDetalleDoctorFechaInicio = document.getElementById("txtDetalleDoctorFechaInicio").value;
	var txtDetalleDoctorFechaFin = document.getElementById("txtDetalleDoctorFechaFin").value;
	var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value
	var valor = "";
	var valor2 = "";
	var dato;
	var datos
	for (var x = 0; x < listaTipoAdmision.length; x++) {
		dato = listaTipoAdmision[x].split("¦");
		if (dato[1] == txtDetalleDoctorTipoAdmision) {
			valor = dato[0];
			break;
		}
	}

	for (var z = 0; z < listaEmpresaMedicoEspecialidad.length; z++) {
		datos = listaEmpresaMedicoEspecialidad[z].split("¦");
		if ((datos[0] * 1) == (matrizDetalle[id][13] * 1)) {
			valor2 = datos[1];
			break;
		}
	}

	var detalles = matrizDetalle[id][0] + "|" + valor + "|" + txtDetalleDoctorFechaInicio + "|" + txtDetalleDoctorFechaFin + "|" + matrizDetalle[id][13] + "|" + matriz[idProvisionEnMatriz][0] + "|" + (matriz[idProvisionEnMatriz][2].split("$")[1] == "1" ? "true" : "false") + "¬" + valor2;
	var ifrDetalleObservado = document.getElementById("ifrDetalleObservado");
	if (ifrDetalleObservado.innerHTML == "") {
		ifrDetalleObservado.innerHTML = "<iframe id='divifrDetalleObservado' style='margin:0;padding:0;width:100%;height:420px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/DetalleObservadosLista/?ss=" + ss + "&data=" + detalles + "'></iframe>";
	}
	else {
		document.getElementById('divifrDetalleObservado').src = urlBase + "Mantenimiento/DetalleObservadosLista/?ss=" + ss + "&data=" + detalles;
	}
	abrirPopup('PopupObservado');
}


function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("Enlace");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this);
			mostrarMatriz(0, true);
		}
	}

	//var enlaces = document.getElementsByClassName("EnlaceD");
	//var nEnlaces = enlaces.length;
	//var enlace;
	//for (var i = 0; i < nEnlaces; i++) {
	//	enlace = enlaces[i];
	//	enlace.onclick = function () {
	//		ordenarMatrizDetalle(this);
	//		mostrarMatriz(0, false);
	//	}
	//}
}

function ordenarMatriz(enlace) {
	indiceOrden = parseInt(enlace.getAttribute("data-orden")) + 2;
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

function ordenarMatrizDetalle(enlace) {
	indiceOrden = enlace.getAttribute("data-orden");
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces();
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	matrizDetalle.sort(ordenarDetalle);
}

function ordenarDetalle(x, y) {
	var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
	var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
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

function configurarFiltro() {
	var textos = document.getElementsByClassName("Texto");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar(true);
		}
	}
	var combos = document.getElementsByClassName("Combo");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar(true);
		}
	}

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
	if (opcion) {
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
		var campoFiltrado = [];
		var nFiltrados = matrizIndice.length, total = 0;
		for (var i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			nCampos = campos.length;
			campoFiltrado = [];
			for (var k = 1; k < nFiltrados; k++) {
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
					if (isNaN(campos[j])) matriz[x][j] = campos[j];
					else matriz[x][j] = campos[j] * 1;
				}
				if (campos[9].toUpperCase() != "INACTIVO") {
					total = total + (campos[8] * 1);
				}

				x++;
			}
		}
		document.getElementById("spnTotal").innerHTML = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
		paginar(0, true);
		indiceActualBloque = 0;
	}
	else {
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
			if (campos[14] == "0") {
				campoFiltrado.push("");
			}
			else {
				for (var z = 0; z < listaEmpresaMedico.length; z++) {
					valor = listaEmpresaMedico[z].split("¦");
					if ((valor[0] * 1) == (campos[14] * 1)) {
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


			//campos = listaProvision[i].split("¦");
			//nCampos = campos.length;
			//for (var j = 0 ; j < nCabeceras; j += 1) {
			//    exito = true;
			//    cabecera = cabeceras[j];
			//    if (cabecera.className == "TextoD") exito = exito && (campos[j + 2].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			//    else exito = exito && (cabecera.value == "" || campos[j + 2] == cabecera.value);
			//    if (!exito) break;
			//}

			if (exito) {
				if (SeleccionActualProceso == "P") {
					if (SeleccionActualProceso == campos[8] || campos[8] == "I") {
						matrizDetalle[x] = [];

						for (j = 0; j < (nCampos + 1) ; j++) {
							if ((isNaN(campos[j]) || campos[j] == "" || j == 7) && j != 16) {
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
				else {
					if (SeleccionActualProceso == campos[8] && (ConfiguracionPagoActual == (campos[16] * 1))) {
						matrizDetalle[x] = [];

						for (j = 0; j < (nCampos + 1) ; j++) {
							if ((isNaN(campos[j]) || campos[j] == "" || j == 7) && j != 16) {
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
			}

		}

		paginar(0, false);
		indiceActualBloque = 0;
	}
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

	//var enlaces = document.getElementsByClassName("EnlaceD");
	//var nEnlaces = enlaces.length;
	//var enlace;
	//var campo;
	//for (var i = 0; i < nEnlaces; i++) {
	//	enlace = enlaces[i];
	//	campo = enlace.innerHTML;
	//	enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	//}
}

//function crearPaginas() {
//    var nRegistros = matriz.length;
//    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
//    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
//    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
//    if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
//    var contenido = "";
//    var inicio = indiceActualBloque * paginasBloque;
//    var fin = inicio + paginasBloque;
//    if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
//        contenido += "<span class='pagina' onclick='paginar(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
//        contenido += "<span class='pagina' onclick='paginar(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
//    }
//    for (var i = inicio ; i < fin; i += 1) {
//        if (i <= indiceUltimaPagina) {
//            contenido += "<span onclick='paginar(";
//            contenido += i;
//            contenido += ");'  title='Ir a la pagina ";
//            contenido += (i + 1).toString();
//            contenido += "' id='a";
//            contenido += i.toString();
//            contenido += "' class='pagina' >";
//            contenido += (i + 1).toString();
//            contenido += "</span>";

//        } else break;
//    }
//    if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
//        contenido += "<span class='pagina' onclick='paginar(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
//        contenido += "<span class='pagina' onclick='paginar(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
//    }
//    if (nRegistros <= registrosPagina) {
//        document.getElementById("tdPaginas").innerHTML = "";
//    }
//    else {
//        document.getElementById("tdPaginas").innerHTML = contenido;
//        seleccionarPaginaActual();
//    }
//}

//function seleccionarPaginaActual() {
//    var aPagina = document.getElementById("a" + indiceActualPagina);
//    if (aPagina != null) {
//        aPagina.className += " seleccionado";
//    }
//}

function configurarControles2() {

	var aExportarExcel = document.getElementById("aExportarExcel");
	if (aExportarExcel != null) {
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
				resultado = txtExportar.document.execCommand("SaveAs", true, "ProcesoProvision.xls");
			}
			else // Otro Navegador
			{
				resultado = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excelExportar));

				var formBlob = new Blob([excelExportar], { type: "type:'text/html'" });
				var url = window.URL.createObjectURL(formBlob);
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.href = url;
				a.download = "ProcesoProvision.xls";
				a.click();
				setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
				resultado = true;
			}

			return resultado;
		}
	}
}


function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 120px' align='center'>Sucursal</td>";
	cabecera += "<td style='width: 100px' align='center'>Nro Proceso</td>";
	cabecera += "<td style='width: 100px' align='center'>Periodo</td>";
	cabecera += "<td style='width: 250px' align='center'>Descripcion</td>";
	cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
	cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
	cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
	cabecera += "<td style='width: 100px' align='center'>Cantidad</td>";
	cabecera += "<td style='width: 100px' align='center'>Monto</td>";
	cabecera += "<td style='width: 100px' align='center'>Estado Provisión</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matriz.length;
	var nCampos = cabeceras[0].length;
	var contenido = [];
	textoExportar = [];
	excelExportar = crearCabeceraExportar();
	var totalx = 0;
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");

		for (var j = 0; j < nCampos + 2; j++) {
			if (j == 8) {
				contenido.push("<td style='text-align:right'>" + matriz[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 }) + "</td>");
			} else {
				switch (j) {
					case 0:
						contenido.push("<td>" + matriz[i][2].split("$")[0] + "</td>");
						break;
					case 1:
						contenido.push("<td>" + matriz[i][0] + "</td>");
						break;
					case 2:
						contenido.push("<td>" + matriz[i][3] + "</td>");
						break;
					case 3:
						contenido.push("<td>" + matriz[i][15] + "</td>");
						break;
					default:
						contenido.push("<td>" + matriz[i][j] + "</td>");
						break;
				}
			}
		}



		contenido.push("</tr>");
		//textoExportar.push("\r\n");
		totalx = totalx + matriz[i][8];
	}
	//contenido.push("<tr><td colspan='6' style='text-align:right'><b>Total</b></td><td align='right'><b>=MONEDA(Suma(G2:G" + (nRegistros + 1) + "))</b></td></tr>");
	contenido.push("<tr><td colspan='8' style='text-align:right'><b>Total</b></td><td align='right'><b>" + formatearNumero(totalx) + "</b></td></tr>");
	textoExportar = textoExportar.join("");
	excelExportar += contenido.join("") + "</table></html>";
}


//***
function operacion(titulo) {
	tituloPoup = titulo;
}

function EscogerOpcion(valor) {
	var hdfOpc = document.getElementById("hdfOpc");
	var spnHistorial = document.getElementById("spnHistorial");
	if (valor) {
		hdfOpc.value = "1";
		spnHistorial.style.display = "none";
	}
	else {
		hdfOpc.value = "2";
		spnHistorial.style.display = "";
	}

	listarPeriodo();
}

function abrirPopup(objeto, mostrar) {
	var popup = document.getElementById(objeto);
	var span = document.getElementById('TituloPopupProceso');
	span.textContent = tituloPoup;
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
	if (objeto == "PopupProvisionDetalleConceptosOA" || objeto == "PopupError" || objeto == "PopupObservado") {
		window.onresize();
	}
	if (objeto == "PopupProceso") {
		var hdfOpc = document.getElementById("hdfOpc").value;
		if (mostrar || (hdfOpc == "1")) document.getElementById("btngrabar").style.display = "";
		else document.getElementById("btngrabar").style.display = "none";
	}
}

function anular(id, estado) {
	var ss = window.parent.document.getElementById("iss").value;

	var frm = new FormData();
	frm.append("ProcesoId", id);
	frm.append("EstadoProvision", (estado == "INACTIVO" ? "P" : "I"));

	var url = urlBase + "Proceso/actualizarProcesoEstado/?ss=" + ss;
	$.ajax(url, "post", mostrarGrabar, frm);
	abrirPopup('PopupEstado');
}

function busquedaAjusteCambioContrato(lista) {
	window.location.href = urlBase + "Proceso/ProcesoAjusteContrato/?ss=" + ss + "&AC=" + lista;
}

function mostrarGrabar(rpta) {
	var datos = NombreControl.split("|");
	var control = document.getElementById(datos[1]);
	if (control != null) {
		control.innerHTML = datos[0];
		NombreControl = "";
		control.onclick = function () {
			if (validarProceso()) {
				grabarForm()
				NombreControl = this.innerHTML + "|" + this.id.toString();
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			}
		}
	}
	if (rpta != "" && ((rpta * 1) > 0)) {
		if (tituloPoup == "Creación de Proceso de Provisión") {
			mostraralerta("Se ha agregado un nuevo registro");
			buscarProceso();
			abrirPopup("PopupProceso");
		}
		else if (tituloPoup == "Modificación de Proceso de Provisión") {
			mostraralerta("Se ha actualizado el registro");
			buscarProceso();
			abrirPopup("PopupProceso");
		} else {
			mostraralerta("Se ha actualizado el estado de un registro");
			buscarProceso();
		}
		esPagina = true;
        if (socket != null && socket.OPEN == 1) {
            let cboMes = document.getElementById("cboMes").value;
            let txtAnio = document.getElementById("txtAnio").value;
            socket.send("0_" + sucursalId + "_" + cboMes + "_" + txtAnio);
		}
	}
	else {
		if (tituloPoup == "Creación de Proceso de Provisión") {
			if ((rpta * 1) == -2) mostraralerta("El periodo seleccionado se encuentra cerrado");
			else mostraralerta("Ya existe un periodo registrado");
		}
		else if (tituloPoup == "Modificación de Proceso de Provisión") {
			if ((rpta * 1) == -2) mostraralerta("El periodo seleccionado se encuentra cerrado");
			else mostraralerta("Ya existe un periodo registrado");
		}
		else {
			mostraralerta("No se puede realizar cambio de estado");
		}
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
		}, 3000);
	}
}

function grabarForm() {
	var hdfProcesoId = document.getElementById("hdfProcesoId");
	var intSucursalMant = window.parent.document.getElementById("isuc").value.split("|")[0];
	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
	var txtObservacionMant = document.getElementById("txtObservacionMant");

	var frm = new FormData();
	frm.append("ProcesoId", hdfProcesoId.value);
	frm.append("SucursalId", intSucursalMant);
	frm.append("PeriodoId", cboPeriodoMant.value);
	if (cboPeriodoMant.value == "0") {
		frm.append("fecini", "01/01/1900");
		frm.append("fecfin", "01/01/1900");
	} else {
		frm.append("fecini", document.getElementById("txtFechaInicioMant").value);
		frm.append("fecfin", document.getElementById("txtFechaFinMant").value);
	}

	frm.append("TipoAdmisionId", cboTipoAdmisionMant.value);
	frm.append("Descripcion", txtObservacionMant.value);
	var lista = "";
	if (cboTipoAdmisionMant.value == "3") {
		lista = "false|";
	}
	else {
		lista = "true|";
	}
	var checks = document.getElementsByName("rdn-ConfiguracionPago");
	for (var x = 0; x < checks.length; x++) {
		if (checks[x].checked) {
			lista += "true|";
		}
		else {
			lista += "false|";
		}
	}
	lista = lista.substring(0, lista.length - 1);
	frm.append("Checks", lista);
	var chkEspecificarOAMant = document.getElementById("chkEspecificarOAMant").checked;
	if (chkEspecificarOAMant) {
		frm.append("indicadorOA", "true");
	}
	else {
		frm.append("indicadorOA", "false");
	}
	var divespecificarMedicos = document.getElementById("divespecificarMedicos");
	if (divespecificarMedicos.style.display == "none") {
		frm.append("indMed", "false");
	} else {
		frm.append("indMed", document.getElementById("chkEspecificarMedicosMant").checked);
	}
	var chkPorDias = document.getElementById("chkPorDias").checked;
	if (chkPorDias) {
		frm.append("PorDias", "true");
	}
	else {
		frm.append("PorDias", "false");
	}
	if (tituloPoup == "Creación de Proceso de Provisión") {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Proceso/adicionarProceso/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
	else {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Proceso/actualizarProceso/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
	mensajeValidacion = [];
}



function limpiarFormulario() {
	var hdfProcesoId = document.getElementById("hdfProcesoId");
	var txtSucursalMant = document.getElementById("txtSucursalMant");
	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
	var txtObservacionMant = document.getElementById("txtObservacionMant");
	var txtEstadoMant = document.getElementById("txtEstadoMant");
	var chkPorDias = document.getElementById("chkPorDias")
	hdfProcesoId.value = "-1"
	txtSucursalMant.value = ""
	txtObservacionMant.value = ""
	cboPeriodoMant.selectedIndex = "-1"
	cboPeriodoMant.onchange();
	cboTipoAdmisionMant.selectedIndex = "-1";
	cboTipoAdmisionMant.onchange();
	txtEstadoMant.value = "";
	chkPorDias.checked = false;

	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	mensajeValidacion = [];
	var validar = document.getElementById("PopupProceso").getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
		validar[x].value = "";
	}

	var checks = document.getElementsByName("rdn-ConfiguracionPago");
	for (var x = 0; x < checks.length; x++) {
		checks[x].checked = false;
	}

	var divConfiguraciones = document.getElementById("divConfiguraciones");
	divConfiguraciones.className = "form-grupo fila centrado";
	document.getElementById("chkEspecificarMedicosMant").checked = false;
}


function estableceFormulario() {
	var txtSucursalMant = document.getElementById("txtSucursalMant");
	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
	var txtEstadoMant = document.getElementById("txtEstadoMant");
	txtSucursalMant.value = window.parent.document.getElementById("isuc").value.split("|")[1];
	cboPeriodoMant.selectedIndex = "0";
	cboTipoAdmisionMant.selectedIndex = "0";
	txtEstadoMant.value = "ACTIVO";
	cboPeriodoMant.focus();
	var btngrabar = document.getElementById("btngrabar");
	btngrabar.parentNode.style.display = "";
}


function mostrarSeleccion(id) {
	var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
	var txtFechaFinMant = document.getElementById("txtFechaFinMant");
	var nCampos = matrizPeriodo.length;

	if (id == undefined || id == 0) {
		txtFechaInicioMant.value = "";
		txtFechaFinMant.value = "";
		return;
	}

	for (var i = 0; i < nCampos; i++) {
		campo = matrizPeriodo[i][0];
		if (campo == id) {
			txtFechaInicioMant.value = matrizPeriodo[i][4];
			txtFechaFinMant.value = matrizPeriodo[i][5];
			break;
		}
	}
}


function mostrarProceso(id, opcion) {
	var nCampos = matriz.length;
	var campo = "";
	var hdfProcesoId = document.getElementById("hdfProcesoId");
	var txtSucursalMant = document.getElementById("txtSucursalMant");
	var cboPeriodoMant = document.getElementById("cboPeriodoMant");
	var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
	var txtObservacionMant = document.getElementById("txtObservacionMant");
	var txtEstadoMant = document.getElementById("txtEstadoMant");
	var chkPorDias = document.getElementById("chkPorDias");
	var hdfCd = document.getElementById("hdfCd");
	for (var i = 0; i < nCampos; i++) {
		campo = matriz[i][0];
		if (campo == id) {
			hdfCd.value = id;
			hdfProcesoId.value = matriz[i][0];
			txtSucursalMant.value = matriz[i][2].split("$")[0];
			cboPeriodoMant.value = matriz[i][11];
			cboTipoAdmisionMant.value = matriz[i][12];
			chkPorDias.checked = (matriz[i][17] === "True" ? true : false);
			cboTipoAdmisionMant.onchange();
			if (cboTipoAdmisionMant.value == "3") {
				var dato = matriz[i][13].split("¬");
				document.getElementsByName("rdn-ConfiguracionPago")[0].checked = (dato[1] == "1" ? true : false);
				document.getElementsByName("rdn-ConfiguracionPago")[1].checked = (dato[2] == "1" ? true : false);
				document.getElementsByName("rdn-ConfiguracionPago")[2].checked = (dato[3] == "1" ? true : false);
				document.getElementsByName("rdn-ConfiguracionPago")[3].checked = (dato[4] == "1" ? true : false);
				document.getElementsByName("rdn-ConfiguracionPago")[4].checked = (dato[5] == "1" ? true : false);
				document.getElementsByName("rdn-ConfiguracionPago")[5].checked = (dato[6] == "1" ? true : false);


				var checks = document.getElementsByName("rdn-ConfiguracionPago");
				var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
				var contador = 0;
				var valor = -1;
				for (var x = 0; x < checks.length; x++) {
					if (checks[x].checked) {
						if (contador == 0) {
							contador++;
							valor = checks[x].value;
						} else {
							contador = 0;
							break;
						}
					}
				}
				var divespecificarMedicos = document.getElementById("divespecificarMedicos");
				var chkEspecificarMedicosMant = document.getElementById("chkEspecificarMedicosMant");
				if (contador == 1 && (valor == 3 || valor == 4 || valor == 5)) {
					divespecificarMedicos.style.display = "";
				}
				else {
					divespecificarMedicos.style.display = "none";
				}

				//chkEspecificarMedicosMant.checked = (matriz[i][2].split("$")[2]=="1"?true:false);
			}
			else {
				var indicadorOA = matriz[i][2].split("$")[1];
				if (indicadorOA == "1") {
					document.getElementById("chkEspecificarOAMant").checked = true;
				}
				else {
					document.getElementById("chkEspecificarOAMant").checked = false;
				}
			}
			cboPeriodoMant.onchange();
			if (cboPeriodoMant.value != "0") {
				document.getElementById("txtFechaInicioMant").value = matriz[i][4];
				document.getElementById("txtFechaFinMant").value = matriz[i][5];
			}
			if (cboTipoAdmisionMant.value == "3") {
				if (matriz[i][2].split("$")[2] == "1") {
					chkEspecificarMedicosMant.checked = false;
				} else {
					chkEspecificarMedicosMant.checked = true;
				}
				chkEspecificarMedicosMant.click();
			}
			//mostrarSeleccion(cboPeriodoMant.value);
			txtObservacionMant.value = matriz[i][10];
			txtEstadoMant.value = matriz[i][9];
			idProceso = id;
			//if (matriz[i][6] == "Inactivo") { mostraralerta("El registro se encuentra Inactivo."); break; return; }
			var btngrabar = document.getElementById("btngrabar");
			if (matriz[i][9] == "INACTIVO") {
				btngrabar.parentNode.style.display = "none";
			}
			else {
				btngrabar.parentNode.style.display = "";
			}
			operacion("Modificación de Proceso de Provisión");
			abrirPopup('PopupProceso', opcion);
			break;
		}
	}
}

function crearChecks(lista) {
	var nRegistros = lista.length;
	var campo;
	var contenido = "";
	for (var x = 0; x < nRegistros; x++) {
		campo = lista[x].split("¦");
		if (campo[0] == 3) {
			contenido += "<input type='checkbox' id='chkManMontFij' name='rdn-ConfiguracionPago' value='";
		} else {
			contenido += "<input type='checkbox' name='rdn-ConfiguracionPago' value='";
		}
		contenido += campo[0];
		contenido += "'/>&nbsp;";
		contenido += campo[1];
		if (x != (nRegistros - 1)) {
			contenido += "&nbsp;";
		}
	}
	var divConfiguraciones = document.getElementById("divConfiguraciones");
	divConfiguraciones.innerHTML = contenido;

	var checks = document.getElementsByName("rdn-ConfiguracionPago");
	for (var u = 0; u < checks.length; u++) {
		checks[u].onclick = function () {
			var checks = document.getElementsByName("rdn-ConfiguracionPago");
			var cboTipoAdmisionMant = document.getElementById("cboTipoAdmisionMant");
			var contador = 0;
			var valor = -1;
			for (var x = 0; x < checks.length; x++) {
				if (checks[x].checked) {
					if (contador == 0) {
						contador++;
						valor = checks[x].value;
					} else {
						contador = 0;
						break;
					}
				}
			}
			var divespecificarMedicos = document.getElementById("divespecificarMedicos");
			var chkEspecificarMedicosMant = document.getElementById("chkEspecificarMedicosMant");
			var cboPeriodoMant = document.getElementById("cboPeriodoMant");
			var txtFechaInicioMant = document.getElementById("txtFechaInicioMant");
			var txtFechaFinMant = document.getElementById("txtFechaFinMant");
			if (contador == 1 && cboTipoAdmisionMant.value == 3 && (valor == 3 || valor == 4 || valor == 5)) {
				divespecificarMedicos.style.display = "";

				if (valor == 4 || valor == 5) {
					if (cboPeriodoMant.length > 1) {
						if (cboPeriodoMant.selectedIndex == "0") {
							cboPeriodoMant.selectedIndex = "1";
						}
						cboPeriodoMant.onchange();
					}
				} else {
					//cboPeriodoMant.selectedIndex = "0";
					cboPeriodoMant.onchange();
				}
			}
			else {
				//cboPeriodoMant.selectedIndex = "0";
				cboPeriodoMant.onchange();
				divespecificarMedicos.style.display = "none";

			}
			chkEspecificarMedicosMant.checked = false;
		}
	}
}


function crearCabeceraExportarDetalle() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
	cabecera += "<tr><td style='width:1px'></td><td style='width:200px'>Periodo</td><td style='text-align:left'>";
	cabecera += document.getElementById("txtDetalleDoctorPeriodo").value;
	cabecera += "</td></tr><tr><td style='width:1px'></td><td style='width:200px'>Fecha Inicio</td><td style='text-align:left'>";
	cabecera += document.getElementById("txtDetalleDoctorFechaInicio").value;
	cabecera += "</td></tr><tr><td style='width:1px'></td><td style='width:200px'>Fecha Fin</td><td style='text-align:left'>";
	cabecera += document.getElementById("txtDetalleDoctorFechaFin").value;
	cabecera += "</td></tr><tr><td style='width:1px'></td><td style='width:200px'>Tipo Admisión</td><td style='text-align:left'>";
	cabecera += document.getElementById("txtDetalleDoctorTipoAdmision").value.toUpperCase();
	cabecera += "</td></tr><tr><td style='width:1px'></td><td style='width:200px'>Estado</td><td style='text-align:left'>";
	switch (SeleccionActualProceso) {
		case "P":
			cabecera += "PENDIENTE";
			break;
		case "C":
			cabecera += "CALCULADO";
			break;
		case "A":
			cabecera += "AUTORIZADO";
			break;
		case "F":
			cabecera += "PROVISIONADO";
			break;
		case "G":
			cabecera += "PAGADO";
			break;
	}
	cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 1px;display:none'></td>";
	cabecera += "<td style='width: 300px'>Empresa</td>";
	cabecera += "<td style='width: 300px'>Médico</td>";
	cabecera += "<td style='width: 200px'>Especialidad</td>";
	cabecera += "<td style='width: 150px'>Importe</td>";
	cabecera += "<td style='width: 150px'>Bonificacion</td>";
	cabecera += "<td style='width: 150px'>Descuento</td>";
	cabecera += "<td style='width: 150px'>Ajuste</td>";
	cabecera += "<td style='width: 150px'>Total</td>";
	if (SeleccionActualProceso == "C") cabecera += "<td style='width: 150px'>Observ.</td>";
	else cabecera += "<td style='width: 150px'>Error</td>";
	cabecera += "<td style='width: 150px'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacionDetalle(objeto) {
	var nRegistros = matrizDetalle.length;
	if (nRegistros > 0) {
		excelExportar = crearCabeceraExportarDetalle();
		excelExportar += excelExportarDetalle.replace(/checkbox/gi, "hidden").replace(/display:none/gi, "");
		excelExportar += "</table></html>";
		var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
		objeto.download = "ProcesoProvision.xls";
		objeto.href = window.URL.createObjectURL(formBlob);
	}
}

function mostrarTabs(elemento) {
	ConfiguracionPagoActual = elemento * 1;
	var tab = document.getElementById("ulTabs");
	elementos = tab.getElementsByClassName("tab-link");
	for (var x = 0; x < elementos.length; x++) {
		if ((elementos[x].getAttribute("data-id") * 1) == elemento) {
			elementos[x].className = "tab-link current";
		}
		else {
			elementos[x].className = "tab-link";
		}
	}
	crearMatriz(false);
	paginar(0, false);
	indiceActualBloque = 0;
	limpiarCabeceras();
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

function ocultarTd(v) {

	var ocultar = document.getElementsByClassName("ocultar"),
	n = ocultar.length;
	for (var i = 0; i < n; i++) {
		if (v) {
			ocultar[i].style.display = "none";
		} else {
			ocultar[i].style.display = "";
		}
	}
}
function configurarSocket(v) {
	socket = new WebSocket(v);
	socket.onopen = function (event) {
		console.log("conecto");
	}
	socket.onclose = function (event) {
		console.log("Cerrando socket ");
	}
	socket.onerror = function (event) {
		console.log("Error ");
		socket = null;
	}
	socket.onmessage = function (event) {
		var txtOrden = document.getElementById('txtOrden');
		if (!esPopUpOpen('PopupDetalleOA') && (txtOrden.value == "")) { //modificado
			var divPrincipal = document.getElementById("divPrincipal");
			if (event.data != "") {
                if (!esPagina) {
                    let rptaws = event.data.split("_");
                    if (rptaws[1] != sucursalId) {
                        return false;
                    }

                    let cboMes = document.getElementById("cboMes").value;
                    let txtAnio = document.getElementById("txtAnio").value;
                    if (cboMes == rptaws[2] && txtAnio == rptaws[3]) {

                        switch (rptaws[0]) {
                            case "0":
                                if (divPrincipal.style.display != "none") {
                                    buscarProceso();
                                }
                                break;
                            case "1":
                                if (divPrincipal.style.display == "none") {
                                    var url = urlBase + "Proceso/ListarProvisionPorId/?ss=" + ss + "&id=" + idProvision;
                                    $.ajax(url, "get", listarProvision);
                                    var chkTodos = document.getElementById("chkTodos");
                                    chkTodos.checked = false;
                                    if (matrizDetalle.length > 0) {
                                        var checks = document.getElementsByName("rdnDetalle");
                                        for (var x = 0; x < checks.length; x++) {
                                            checks[x].checked = false;
                                        }
                                    }
                                } else {
                                    buscarProceso();
                                }
                                break;
                        }
                    }

				}
			}
			esPagina = false;
		}
	}
}
function esPopUpOpen(obejto) {
	var PopupDetalleOA = document.getElementById(obejto);
	if (PopupDetalleOA.className.indexOf('Open') > -1) return true;
	else return false;
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
function exportarAsiento(r) {
	if (r != "") {
		var dt = r.split("¯");
		var n = dt.length, ob, cnt = "";
		for (var i = 0; i < n; i++) {
			ob = dt[i].split("¦");

			cnt += ob.join("\t") + "\r";

		}
		var formBlob = new Blob([cnt], { type: 'text/plain' });
		var txtDetalleDoctorPeriodo = document.getElementById("txtDetalleDoctorPeriodo").value;
		var txtDetalleDoctorTipoAdmision = document.getElementById("txtDetalleDoctorTipoAdmision").value;
		var nombre = txtDetalleDoctorPeriodo + sucursalId + txtDetalleDoctorTipoAdmision.charAt(0);
		var ref = document.createElement("a");
		ref.download = nombre + ".txt";
		ref.href = window.URL.createObjectURL(formBlob);
		ref.click();
		ref.remove();
	}
}

function crearTablaDetalle(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador[1]) {
		case "0":
			contenido = "<table id='tblProduccion' class='tabla-general' style='table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			//contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
			break;
		case "1":
			contenido = "<table id='tblMontoFijo' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			//contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosM'/></th>";
			break;
		case "2":
			contenido = "<table id='tblHorario' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			//contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosP'/></th>";
			break;
		case "3":
			contenido = "<table id='tblTurno' class='tabla-general' style='margin-botton:10px;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			//contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosB'/></th>";
			break;
	}

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
		contenido += window["matriz" + identificador[0]][j];
		contenido += "'>";
		contenido += window["cabeceras" + identificador[0]][j];
		contenido += "</span><br/>";
		contenido += "<input type='text' class='Texto";
		contenido += identificador[0];
		contenido += "' name='cabecera";
		contenido += identificador[0];
		contenido += "' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador[0]).innerHTML = contenido;
}
function paginarDetalle(indicePagina, elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var esBloque = (indicePagina < 0);
	var registroPaginaActual;
	if (identificador[1] == "2" || identificador[1] == "3") {
		registroPaginaActual = registroPaginaDetalle;
	} else {
		registroPaginaActual = registrosPagina;
	}
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
		if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
		if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
		switch (indicePagina) {
			case -1:
				indicePagina = 0;
				switch (identificador[1]) {
					case "0":
						indiceActualBloque = 0;
						break;
					case "1":
						indiceActualBloqueM = 0;
						break;
					case "2":
						indiceActualBloqueP = 0;
						break;
					case "3":
						indiceActualBloqueB = 0;
						break;

				}
				break;
			case -2:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloque > 0) {
							indiceActualBloque--;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloqueM > 0) {
							indiceActualBloqueM--;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueP > 0) {
							indiceActualBloqueP--;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueB > 0) {
							indiceActualBloqueB--;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
				}
				break;
			case -3:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloque < indiceUltimoBloque) {
							indiceActualBloque++;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloqueM < indiceUltimoBloque) {
							indiceActualBloqueM++;
							indicePagina = indiceActualBloqueM * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueP < indiceUltimoBloque) {
							indiceActualBloqueP++;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueB < indiceUltimoBloque) {
							indiceActualBloqueB++;
							indicePagina = indiceActualBloqueB * paginasBloque;
						}
						break;
				}
				break;
			case -4:
				switch (identificador[1]) {
					case "0":
						indicePagina = indiceUltimaPagina;
						indiceActualBloque = indiceUltimoBloque;
						break;
					case "1":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueM = indiceUltimoBloque;
						break;
					case "2":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueP = indiceUltimoBloque;
						break;
					case "3":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueB = indiceUltimoBloque;
						break;
				}
				break;
		}
	}
	switch (identificador[1]) {
		case "0":
			indiceActualPagina = indicePagina;
			break;
		case "1":
			indiceActualPaginaM = indicePagina;
			break;
		case "2":
			indiceActualPaginaP = indicePagina;
			break;
		case "3":
			indiceActualPaginaB = indicePagina;
			break;
	}
	mostrarMatrizDetalle(indicePagina, elemento);
}
function crearMatrizDetalle(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0, nFiltro, regFiltro, ndDpl = false, posproceso;
	if (window["lista" + identificador[0]][0] != "") {
		window["matriz" + identificador[0]] = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = window["lista" + identificador[0]][i].split("¦");
			window["matriz" + identificador[0]][x] = [];
			nCampos = campos.length;
			switch (identificador[1]) {
				case "0":
				case "1":
				case "2":
				case "3":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
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
function mostrarMatrizDetalle(indicePagina, elemento) {

	var identificador = elemento.split("|");
	switch (identificador[1]) {
		case "0":
			indiceActualPagina = indicePagina;
			break;
		case "1":
			indiceActualPaginaM = indicePagina;
			break;
		case "2":
			indiceActualPaginaP = indicePagina;
			break;
		case "3":
			indiceActualPaginaB = indicePagina;
			break;
	}

	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var registroPaginaActual;
		registroPaginaActual = registrosPagina;


		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registroPaginaActual;
		var fin = inicio + registroPaginaActual;
		var valorTadm;
		switch (identificador[1]) {
			case "0":
			case "1":
			case "2":
			case "3":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos ; j++) {
							contenido += "<td>";
							contenido += window["matriz" + identificador[0]][i][j];
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
	crearPaginasDetalle(elemento);
	if (esBloque) {
		crearPaginasDetalle(elemento);
	}
}
function crearPaginasDetalle(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var registroPaginaActual;
	registroPaginaActual = registroPaginaDetalle;

	var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
	if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
	if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
	var contenido = "", bloqueActual;
	switch (identificador[1]) {
		case "0":
			bloqueActual = indiceActualBloque;
			break;
		case "1":
			bloqueActual = indiceActualBloqueM;
			break;
		case "2":
			bloqueActual = indiceActualBloqueP;
			break;
		case "3":
			bloqueActual = indiceActualBloqueB;
			break;
	}

	var inicio = bloqueActual * paginasBloque;
	var fin = inicio + paginasBloque;
	if ((bloqueActual) > 0 && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginarDetalle(-1,\"" + elemento + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginarDetalle(-2,\"" + elemento + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginarDetalle(";
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
	if ((bloqueActual) < indiceUltimoBloque && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginarDetalle(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginarDetalle(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = contenido;
		seleccionarPaginaActualDetalle(identificador[0], identificador[1]);
	}
}

function seleccionarPaginaActualDetalle(dato, identificador) {
	var indice;
	switch (identificador) {
		case "0":
			indice = indiceActualPagina;
			break;
		case "1":
			indice = indiceActualPaginaM;
			break;
		case "2":
			indice = indiceActualPaginaP;
			break;
		case "3":
			indice = indiceActualPaginaB;
			break;

	}
	var aPagina = document.getElementById("a" + dato + (indice));
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}
function filtrarDetalle(elemento) {
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
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + identificador[0])) exito = exito && (campos[window["matrizIndice" + identificador[0]][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[window["matrizIndice" + identificador[0]][j]] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador[0]][x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
				else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
			}
			x++;
		}
	}
	paginarDetalle(0, elemento);
	switch (identificador) {
		case "0":
			indiceActualPagina = 0;
			break;
		case "1":
			indiceActualPaginaM = 0;
			break;
		case "2":
			indiceActualPaginaP = 0;
			break;
		case "3":
			indiceActualPaginaB = 0;
			break;
	}
}
function mostrarTabsDetalle(elemento) {
	var tab = document.getElementById("ulTabsD");
	elementos = tab.getElementsByClassName("tab-link");
	for (var x = 0; x < elementos.length; x++) {
		if (elementos[x].getAttribute("data-tab") == elemento.getAttribute("data-tab")) {
			elementos[x].className = "tab-link current";
			document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content current";
		}
		else {
			elementos[x].className = "tab-link";
			document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content";
		}
	}
}

function validarSoloNumeroDecimal(event) {
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode < 48 || keyCode > 57) {
		if (keyCode != 8 && keyCode != 9 && keyCode != 0 && keyCode != 46) {
			event.preventDefault();
		}
	}
}

function validarSoloNumero(event) {
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode < 48 || keyCode > 57) {
		if (keyCode != 8 && keyCode != 9 && keyCode != 0) {
			event.preventDefault();
		}
	}
}

function busquedaSeleccionMedico(datos, id) {
	var ifrMedicoSeleccion = document.getElementById("ifrMedicoSeleccion");
	if (ifrMedicoSeleccion.innerHTML == "") {
		ifrMedicoSeleccion.innerHTML = "<iframe style='margin:0;padding:0;width:1100px;height:430px;border: 1px solid transparent;' id='divIfrMedicoSeleccion'  src='" + urlBase + "Mantenimiento/SeleccionMedicoProvision/?ss=" + ss + "&datos=" + datos + "'></iframe>";
	} else {
		var divIfrMedicoSeleccion = document.getElementById("divIfrMedicoSeleccion");
		divIfrMedicoSeleccion.src = urlBase + "Mantenimiento/SeleccionMedicoProvision/?ss=" + ss + "&datos=" + datos;
	}
	document.getElementById("txtselpro").value = matriz[id][0];
	document.getElementById("txtseldes").value = matriz[id][10];
	abrirPopup("PopupSeleccionMedicos");
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
			var txtFechaFin = document.getElementById(Tex.replace("FechaInicio", "FechaFin").trim());
			var Inicio = fechaUTC(Texto.value);
			var Fin = fechaUTC(txtFechaFin.value);
			if (Texto.hasAttribute("data-fecha")) {
				var fechaatributo = Texto.getAttribute("data-fecha");
				if (Texto.value != fechaatributo) {
					if (Inicio < fechaUTC(fechaatributo)) {
						return 'La ' + Mensaje + ' esta fuera del rango del periodo';
					}
				}
			}

			if (Inicio > Fin) {
				return 'La fecha de inicio no puede ser mayor a la de fin';
			}
		}
		else {
			var txtFechaInicio = document.getElementById(Tex.replace("FechaFin", "FechaInicio").trim());
			var Fin = fechaUTC(Texto.value);
			var Inicio = fechaUTC(txtFechaInicio.value);

			if (Texto.hasAttribute("data-fecha")) {
				var fechaatributo = Texto.getAttribute("data-fecha");
				if (Texto.value != fechaatributo) {
					if (Fin > fechaUTC(fechaatributo)) {
						return 'La ' + Mensaje + ' esta fuera del rango del periodo';
					}
				}
			}

			if (Fin < Inicio) {
				return 'La fecha de fin no puede ser menor a la de inicio';
			}
		}
	}
	return "";
}

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
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

function limpiarSaltos(texto) {
	return texto.toString().replace(/(\r\n|\n|\r)/gm, " ");
}