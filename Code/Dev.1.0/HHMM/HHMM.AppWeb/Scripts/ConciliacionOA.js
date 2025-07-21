var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
};

function requestServer(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload") { window.parent.parent.location.reload(); }
			success(xhr.responseText);
		}
	};
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}


var matrizPrincipal = [], matrizFiltroPrincipal = [], matrizValidados = [], matrizFiltroValidados = [], matrizErrados = [], matrizFiltroErrados = [];

var cabecerasPrincipal = ["Médico/Empresa", "Descripción", "Estado", "Fecha Conciliación", "Usuario", "Total Registros", "Nro. Observados"];
var matrizIndicePrincipal = [1, 2, 3, 4, 5, 6, 7];
var anchosPrincipal = [27, 12, 8, 10, 10, 9, 9, 5];
var anchosExcelPrincipal = [400, 400, 130, 170, 170, 130, 140];

var cabecerasDetalle = ["IdOrdenAtencion", "LineaOA", "CódigoOA", "Periodo Prod.", "Código", "Componente", "Importe", "Importe Prov.", "Estado", "Estado Provisión", "IdPlanilla", "Estado Planilla", "T.Doc.", "Comprobante", "Fecha Emisión", "Fecha Envio Spring", "Usuario Envio Spring", "Observación"];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
var anchosDetalle = [50, 30, 30, 40, 30, 200, 30, 40, 50, 50, 50, 50, 10, 50, 70, 70, 50, 800];
var anchosExcelDetalle = [140, 90, 120, 120, 140, 300, 90, 130, 100, 150, 150, 150, 150, 150, 150, 150, 150, 4000];


var cabecerasV = ["Sucursal", "IdOrdenAtencion", "LineaOA", "CódigoOA", "Componente", "Importe", "Periodo Prod.", "Observación"];
var anchosV = [30, 30, 20, 30, 30, 30, 30, 300];
var matrizIndiceV = [0, 1, 2, 3, 4, 5, 6, 7];
var registrosPaginaV = 5;
var paginasBloqueV = 5;
var indiceActualBloqueV = 0;
var indiceOrdenV = 0;
var indiceActualPaginaV = 0;
var matrizValidados = [];
var registrosPaginaE = 5;
var paginasBloqueE = 5;
var indiceActualBloqueE = 0;
var indiceOrdenE = 0;
var indiceActualPaginaE = 0;
var matrizErrados = [];

var rABS = true, use_worker = true, transferable = true, xlsData = "", MatrizWS = [], mtImponible = 0;
var XW = { rABS: 'Scripts/xlsxworker.js' }

var indiceActualBloquePrincipal = 0, indiceActualPaginaPrincipal = 0;

var indiceOrden, registrosPagina = 10, paginasBloque = 5;
var urlBase = "", opcionfiltro = -1, ss = "", mensajeValidacion = [], sucursalId;
var idmedicoMantenimiento = 0;
var idenfiltroactual = 0;
var idenMatriz = 0;
var esConciliacion = false;

window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	urlBase = location.protocol + "//" + window.location.host + window.parent.document.getElementById("Ref").value;
	ss = window.parent.document.getElementById("iss").value;
	ConfiguracionInicial();
};

function ConfiguracionInicial() {
	crearTabla("Principal");
	crearTabla("Detalle");
	crearTabla2("divValidados");
	crearTabla2("divErrados");
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
}

function crearMatriz(lista, separador, identificador) {
	var nRegistros = lista.length;
	var nCampos = 0,
        campos, x = 0,
        matriz = [],
        j = 0,
        i = nRegistros;

	identificador = (identificador == undefined ? "" : identificador.trim());
	if (identificador != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
	}

	if (nRegistros > 0 && lista[0] != "") {

		switch (identificador) {
			case "Principal":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				nCampos = (matriz.length > 0 ? matriz[0].length : 0);
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 6:
							case 7:
								matriz[x][j] = matriz[x][j] * 1;
								break;
							case 4:							
								matriz[x][j] = (matriz[x][j].indexOf("1900") > -1 ? "" : matriz[x][j]);
								break;
							default:
								matriz[x][j].trim()
								break;
						}
					}
					j = 0;
					x++;
				}
				break;
			case "Detalle":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				nCampos = (matriz.length > 0 ? matriz[0].length : 0);
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 6:
							case 7:
								matriz[x][j] = matriz[x][j] * 1;
								break;
							case 14:
							case 15:
								matriz[x][j] = (matriz[x][j].indexOf("1900") > -1 ? "" : matriz[x][j]);
								break;
							case 16:
								matriz[x][j] = (matriz[x][j] == "0" ? "" : matriz[x][j]*1);
								break;
							default:
								matriz[x][j].trim()
								break;
						}
					}
					j = 0;
					x++;
				}
				break;
			default:
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
					}
					j = 0;
					x++;
				}
				break;
		}
		if (identificador != "") {
			window["matriz" + identificador] = matriz.slice(0);
			window["matrizFiltro" + identificador] = matriz.slice(0);
		}
		else {
			return matriz;
		}
	} else {
		if (identificador == "") {
			return matriz;
		}
	}
}

function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador) {
		case "Principal":
			contenido = "<table class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'><th style='text-align:center;vertical-align:middle;width:5%'><span id='aAdicionar' class='Icons fa-plus' style='cursor: pointer' title='Adicionar Conciliación'></span></th>";
			break;
		case "Detalle":
			contenido = "<table class='tabla-general' style='margin-bottom:0;table-layout:fixed;width:6000px'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
		default:
			contenido = "<table class='tabla-general' style='margin-bottom:0'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		switch (identificador) {
			case "Principal":
				contenido += "<th style='width:";
				contenido += window["anchos" + identificador][j];
				contenido += "%'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace";
				contenido += identificador;
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador][j];
				contenido += "'>";
				contenido += window["cabeceras" + identificador][j];
				contenido += "</span><br/>";
				switch (j) {
					case 2:
						contenido += "<select class='Combo' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:98%'><option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='C'>CONCILIADO</option><option value='T'>TERMINADO</option><option value='I'>INACTIVO</option></select>";
						break;
					default:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						break;
				}
				contenido += "</th>";
				break;
			case "Detalle":
				contenido += "<th style='width:";
				contenido += window["anchos" + identificador][j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace";
				contenido += identificador;
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador][j];
				contenido += "'>";
				contenido += window["cabeceras" + identificador][j];
				contenido += "</span><br/>";
				switch (j) {
					case 8:
						contenido += "<select class='Combo' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:98%'><option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='C'>CONCILIADO</option><option value='T'>TERMINADO</option></select>";
						break;
					default:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						break;
				}
				contenido += "</th>";
				break;
			default:
				contenido += "<th style='width:";
				contenido += window["anchos" + identificador][j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace";
				contenido += identificador;
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador][j];
				contenido += "'>";
				contenido += window["cabeceras" + identificador][j];
				contenido += "</span><br/>";
				contenido += "<input type='text' class='Texto";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%'>";
				contenido += "</th>";
				break;
		}

	}
	switch (identificador) {
		case "Principal":
			contenido += "<th style='vertical-align:middle;width:5%;text-align:center'><i class='Icons fa-file-excel-o' style='cursor: pointer' onclick='descargarExcelGenerico(\"Principal\",\"ListadoConciliacion\");' title='Exportar Excel'></i></th>";
			break;
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (identificador == "Principal" ? (nCampos + 2).toString() : nCampos.toString());
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (identificador == "Principal" ? (nCampos + 2).toString() : nCampos.toString());
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}

function configurarOrdenacion() {
	var enlaces = document.getElementsByClassName("EnlacePrincipal");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatriz(this, "Principal");
			paginar(indiceActualPaginaPrincipal, "Principal");
		};
	}
}

function configurarControles() {
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

	var aAdicionar = document.getElementById("aAdicionar");
	if (aAdicionar != null) {
		aAdicionar.onclick = function () {
			limpiarFormulario();
			document.getElementById("TituloPopupConcilacion").innerHTML = "ADICIONAR PROCESO DE CONCILIACIÓN";
			document.getElementById("spnMedicoEmpresa").style.display = "";
			document.getElementById("hdfOpc").value = "1";
			document.getElementById("divTabs").style.display = "";
			document.getElementById("divEdicion").style.display = "none";
			document.getElementById("divCheck").style.display = "none";
			var btnGrabarConciliar = document.getElementById("btnGrabarConciliar");
			btnGrabarConciliar.parentNode.style.display = "none";
			var btnGrabarTerminar = document.getElementById("btnGrabarTerminar");
			btnGrabarTerminar.parentNode.style.display = "none";
			var btnGrabarCarga = document.getElementById("btnGrabarCarga");
			btnGrabarCarga.parentNode.style.display = "";
			document.getElementById("spnHistorial").style.display = "none";
			abrirPopup('PopupConcilacion');
		}
	}

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		Buscar();
	}

	var spnDoctor = document.getElementById("spnDoctor");
	var spnMedicoEmpresa = document.getElementById("spnMedicoEmpresa");
	spnDoctor.onclick = spnMedicoEmpresa.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		if (this.id == "spnMedicoEmpresa") {
			var hdfMedico = document.getElementById("hdfMedico");
			hdfMedico.setAttribute("data-mantenimiento", "1");
		}
		abrirPopup("PopupMedico");

	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.hasAttribute("data-mantenimiento")) {
			if (this.value != "0") {
				var datos = this.value.split("¦");
				idmedicoMantenimiento = datos[0];
				document.getElementById("txtMedicoEmpresa").value = datos[1];
			}
			this.removeAttribute("data-mantenimiento");

		}
		else {
			if (this.value != "0") {
				var datos = this.value.split("¦");
				this.value = datos[0];
				idenfiltroactual = datos[0];
				document.getElementById("txtBusMedico").value = datos[1];
			}
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
			document.getElementById("txtBusMedicoEmpresa").value = datos[1];
		}
	}

	var fupArchivo = document.getElementById("fupArchivo");
	fupArchivo.onchange = function () {
		if (this.value != "") {
			var gifLoad = document.getElementById("gifLoad3");
			gifLoad.style.display = "";
			if (this.files[0].name.indexOf("xls") > -1) {
				var file = this.files[0];
				var reader = new FileReader();
				reader.onerror = mostrarError;
				reader.onloadend = mostrarArchivo;
				reader.readAsBinaryString(file);
				this.value = null;
			}
			else {
				mostraralerta("El archivo tiene que ser Excel");
				this.value = "";
				crearMatriz2("divValidados", "");
				crearMatriz2("divErrados", "");
			}
		}
		else {
			this.value = "";
			crearMatriz2("divValidados", "");
			crearMatriz2("divErrados", "");
		}
	}

	var btnGrabarCarga = document.getElementById("btnGrabarCarga");
	btnGrabarCarga.onclick = function () {
		var divCheck = document.getElementById("divCheck").style.display;
		if (divCheck != "none") {
			var chkExcMant = document.getElementById("chkExcMant").checked;
			if (chkExcMant) {
				if (matrizValidados.length) {
					abrirPopup('PopupConfirmacion');
					//var confirmar = confirm("¿Está seguro de reemplazar la carga de conciliación?");
					//if (confirmar) {
					//	if (validarDetalle()) {
					//		var lista = document.getElementById("txtDescripcion").value + "¯" + obtenerIds(true);
					//		var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
					//		$.ajax(url, "post", grabarCarga, lista);
					//		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					//		this.onclick = null;
					//	} else {
					//		mostraralerta("No hay registros validados");
					//	}
					//}
				}
				else {
					if (validarDetalle()) {
						var lista = document.getElementById("txtDescripcion").value + "¯";
						var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
						$.ajax(url, "post", grabarCarga, lista);
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						this.onclick = null;
					}
				}
			} else {
				if (validarDetalle()) {
					var lista = document.getElementById("txtDescripcion").value + "¯";
					var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
					$.ajax(url, "post", grabarCarga, lista);
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					this.onclick = null;
				}
			}
		}
		else {
			if (validarDetalle()) {
				var fupArchivo = document.getElementById("fupArchivo").value;
				if (matrizValidados.length > 0) {
					var lista = document.getElementById("txtDescripcion").value + "¯" + obtenerIds(true);
					var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 1;
					$.ajax(url, "post", grabarCarga, lista);
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					this.onclick = null;
				}
				else {
					mostraralerta("No hay registros validados");
				}
			}
		}
	}

	var btngrabarConfirmacion = document.getElementById("btngrabarConfirmacion");
	btngrabarConfirmacion.onclick = function () {		
		if (validarDetalle()) {
			var lista = document.getElementById("txtDescripcion").value + "¯" + obtenerIds(true);
			var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
			$.ajax(url, "post", grabarCarga, lista);
			var btnGrabarCarga = document.getElementById("btnGrabarCarga");
			btnGrabarCarga.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			btnGrabarCarga.onclick = null;
			abrirPopup('PopupConfirmacion');
		} else {
			mostraralerta("No hay registros validados");
		}
	}

	var btnLimpiar = document.getElementById("btnLimpiar");
	btnLimpiar.onclick = function () {
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		txtFechaInicio.value = "";
		var txtFechaFin = document.getElementById("txtFechaFin");
		txtFechaFin.value = "";
		var txtBusMedicoEmpresa = document.getElementById("txtBusMedicoEmpresa");
		txtBusMedicoEmpresa.value = "";
		var txtBusMedico = document.getElementById("txtBusMedico");
		txtBusMedico.value = "";
		var hdfEmpresa = document.getElementById("hdfEmpresa");
		hdfEmpresa.value = "-1";
		var hdfMedico = document.getElementById("hdfMedico");
		hdfMedico.value = "0";
	}

	var chkExcMant = document.getElementById("chkExcMant");
	chkExcMant.onclick = function () {
		matrizValidados = [], matrizErrados = [];
		tipoOrdenV = 0;
		indiceOrdenV = 0;
		mostrar2Pagina(1, -1);
		tipoOrdenE = 0;
		indiceOrdenE = 0;
		mostrar2Pagina(2, -1);
		document.getElementById("numRegY1").innerHTML = "";
		document.getElementById("numRegY2").innerHTML = "";
		mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
		var txtDescripcion = document.getElementById("txtDescripcion");
		if (this.checked) {
			document.getElementById("divExporExcDet").style.display = "none";
			document.getElementById("divTabs").style.display = "";
			document.getElementById("divEdicion").style.display = "none";
		}
		else {
			document.getElementById("divExporExcDet").style.display = "";
			document.getElementById("divTabs").style.display = "none";
			document.getElementById("divEdicion").style.display = "";
		}
	}

	var btnGrabarConciliar = document.getElementById("btnGrabarConciliar");
	btnGrabarConciliar.onclick = function () {
		if (matrizValidados.length > 0) {
			esConciliacion = true;
			document.getElementById("btnGrabarCarga").click();
		} else {
			esConciliacion = true;
			document.getElementById("btnGrabarCarga").click();
			//var url = urlBase + "Control/ConciliacionOAProcesar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento;
			//$.ajax(url, "get", grabarConciliacion);
			//this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			//this.onclick = null;
		}
	}

	var btnGrabarTerminar = document.getElementById("btnGrabarTerminar");
	btnGrabarTerminar.onclick = function () {
		document.getElementById("TituloPopupEstado2").innerHTML = "CERRAR PROCESO CONCILIACIÓN";
		document.getElementById("spnDescEst2").innerHTML = "¿Está seguro de cerrar el proceso de conciliación?";
		var btngrabarEstado2 = document.getElementById("btngrabarEstado2");
		btngrabarEstado2.onclick = null;
		btngrabarEstado2.onclick = function () {
			var url = urlBase + "Control/ConciliacionOAActualizarEstado?ss=" + ss + "&id=" + idmedicoMantenimiento + "&st=T";
			$.ajax(url, "get", grabarCierre);
		}
		abrirPopup('PopupEstado2');
	}

	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var datos = this.getAttribute("data-grabar").split("|");
		var url = urlBase + "Control/ConciliacionOAActualizarEstado?ss=" + ss + "&id=" + datos[0] + "&st=" + datos[1];
		$.ajax(url, "get", mostrarAnulacion);
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.onclick = null;
	}
}

function recogerValores(objeto) {
	var lista = [], contador1 = 0, contador2 = 0;
	var valores = document.getElementsByName("cabecera" + objeto);
	for (var x = 0; x < valores.length; x++) {
		if (valores[x].className.indexOf("Combo") > -1) {
			if (valores[x].selectedIndex != "0") {
				lista.push([x, valores[x].value.toLowerCase().trim(), false]);
				contador1 = 1;
			}
		}
		else {
			if (valores[x].value.trim() != "") {
				lista.push([x, valores[x].value.toLowerCase().trim(), true]);
				contador2 = 1;
			}
		}
	}
	return ((contador1 == 0 && contador2 == 0) ? [] : lista);
}

function configurarFiltro() {
	var textos = document.getElementsByName("cabeceraPrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("Principal");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("Principal");
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraDetalle");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrar("Detalle");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrar("Detalle");
				}, 0);
			};
		}
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

function ordenarMatriz(enlace, Elemento) {
	indiceOrden = enlace.getAttribute("data-orden") * 1;
	var validado = false;
	if (opcionfiltro != indiceOrden) {
		opcionfiltro = indiceOrden;
		validado = true;
	}
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▼");
	var posDesc = campo.indexOf("▲");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 1 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(Elemento);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	else enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	if (validado) {
		var matrizClon = window["matriz" + Elemento].splice(0, window["matriz" + Elemento].length);
		window["matriz" + Elemento] = quicksort2(matrizClon, indiceOrden);
	} else {
		window["matriz" + Elemento].reverse();
	}
}

function quicksort2(arr, indice) {
	if (arr.length <= 1) {
		return arr;
	}

	var arrLength = arr.length;
	var pivotPosition = Math.floor(arrLength / 2);
	var pivotValue = arr[pivotPosition][indice];
	var less = [],
        more = [],
        same = [];
	for (var i = 0; i < arrLength; i++) {
		if (arr[i][indice] === pivotValue) {
			same.push(arr[i]);
		}
		else if (arr[i][indice] < pivotValue) {
			less.push(arr[i]);
		}
		else {
			more.push(arr[i]);
		}
	}

	return quicksort2(less, indice).concat(same, quicksort2(more, indice));
}

function filtrar(identificador) {
	var lista = recogerValores(identificador);
	opcionfiltro = -1;
	var nCabeceras = lista.length;
	var exito = true,
        campos;
	window["matriz" + identificador] = [];
	if (nCabeceras > 0) {
		var matriz = window["matrizFiltro" + identificador].slice(0);
		var matrizIndices = window["matrizIndice" + identificador].slice(0);
		var nRegistros = matriz.length;
		var x = 0, i = 0, j = 0, indice;
		for (; i < nRegistros; i++) {
			campos = matriz[i];
			for (; j < nCabeceras; j++) {
				exito = true;
				indice = matrizIndices[lista[j][0]];
				if (lista[j][2]) exito = (campos[indice].toString().toLowerCase().indexOf(lista[j][1]) > -1);
				else exito = (campos[indice].toString().toLowerCase() == (lista[j][1]));
				if (!exito) break;
			}

			if (exito) {
				window["matriz" + identificador][x] = campos.slice(0);
				x++;
			}
			j = 0;
		}
	} else {
		window["matriz" + identificador] = window["matrizFiltro" + identificador].slice(0);
	}
	paginar(0, identificador);
	limpiarEnlaces(identificador);
	window["indiceActualBloque" + identificador] = 0;
}

function paginar(indicePagina, identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
		if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
		if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
		switch (indicePagina) {
			case -1:
				indicePagina = 0;
				window["indiceActualBloque" + identificador] = 0;
				break;
			case -2:
				if (window["indiceActualBloque" + identificador] > 0) {
					window["indiceActualBloque" + identificador]--;
					indicePagina = window["indiceActualBloque" + identificador] * paginasBloque;
				}
				break;
			case -3:
				if (window["indiceActualBloque" + identificador] < indiceUltimoBloque) {
					window["indiceActualBloque" + identificador]++;
					indicePagina = window["indiceActualBloque" + identificador] * paginasBloque;
				}
				break;
			case -4:
				indicePagina = indiceUltimaPagina;
				window["indiceActualBloque" + identificador] = indiceUltimoBloque;
				break;
		}
	}

	window["indiceActualPagina" + identificador] = indicePagina;
	mostrarMatriz(indicePagina, identificador);
}

function mostrarMatriz(indicePagina, identificador) {
	indiceActualPagina = indicePagina;
	var contenido = "";

	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	var matriz = window["matriz" + identificador].slice(0);
	var matrizIndice = window["matrizIndice" + identificador].slice(0);
	var n = matriz.length;
	var contenido2 = "";
	if (n > 0) {
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		var nRegistroLista = 0;
		switch (identificador) {
			case "Principal":
				var valorFor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";
						contenido += "<a href='#' class='Icons fa-edit' onclick='ObtenerDetalle(";
						contenido += i;
						contenido += ");' style='cursor: pointer;' title='Editar Carga'/>";
						contenido += "</td>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {

							switch (j) {
								case 2:
									contenido2 += "<td>";
									switch (matriz[i][matrizIndice[j]]) {
										case "C":
											contenido2 += "CONCILIADO";
											break;
										case "P":
											contenido2 += "PENDIENTE";
											break;
										case "T":
											contenido2 += "TERMINADO";
											break;
										case "I":
											contenido2 += "INACTIVO";
											break;
									}
									break;
								case 5:
								case 6:
									contenido2 += "<td style='text-align:right'>";
									contenido2 += matriz[i][matrizIndice[j]];
									break;
								default:
									contenido2 += "<td>";
									contenido2 += matriz[i][matrizIndice[j]].toString().trim();
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "<td style='text-align:center'>";
						if (matriz[i][3] != "T") {
							contenido += "<span class='" + (matriz[i][3] == "I" ? "Icons fa-check" : "Icons fa-trash-o") + "' onclick='registrarAnulacion(" + i + ");'></span>";
						}
						contenido += "</td></tr>";
					} else break;
				}
				break;
			case "Detalle":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								case 8:
									contenido2 += "<td>";
									switch (matriz[i][matrizIndice[j]]) {
										case "C":
											contenido2 += "CONCILIADO";
											break;
										case "P":
											contenido2 += "PENDIENTE";
											break;
										case "T":
											contenido2 += "TERMINADO";
											break;
									}
									break;
								case 6:
								case 7:
									contenido2 += "<td style='text-align:right'>";
									contenido2 += matriz[i][matrizIndice[j]].toFixed(2);
									break;
								default:
									contenido2 += "<td>";
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
			default:
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								default:
									contenido2 += "<td>";
									contenido2 += matriz[i][matrizIndice[j]];
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						contenido += "</tr>";
					} else break;
				}
				break;
		}
	} else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (identificador == "Principal" ? (nCampos + 2).toString() : nCampos.toString());
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
}

function crearPaginas(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = window["indiceActualBloque" + identificador] * paginasBloque;
	var fin = inicio + paginasBloque;
	if (window["indiceActualBloque" + identificador] > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1,\"" + identificador + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2,\"" + identificador + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += ",\"";
			contenido += identificador;
			contenido += "\");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			contenido += "' id='a";
			contenido += identificador;
			contenido += i.toString();
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (window["indiceActualBloque" + identificador] < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		if (identificador == "Detalle") {
			document.getElementById("pgDetalle").innerHTML = "";
		} else {
			document.getElementById("tdPaginas" + identificador).innerHTML = "";
		}
	} else {
		if (identificador == "Detalle") {
			document.getElementById("pgDetalle").innerHTML = contenido;
		} else {
			document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		}
		seleccionarPaginaActual(identificador);
	}
}

function seleccionarPaginaActual(identificador) {
	var aPagina = document.getElementById("a" + identificador + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function limpiarFormulario(opcion) {
	mensajeValidacion = [];
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
		validar[x].value = "";
	}

	matrizValidados = [], matrizErrados = [];
	tipoOrdenV = 0;
	indiceOrdenV = 0;
	mostrar2Pagina(1, -1);
	tipoOrdenE = 0;
	indiceOrdenE = 0;
	mostrar2Pagina(2, -1);
	document.getElementById("numRegY1").innerHTML = "";
	document.getElementById("numRegY2").innerHTML = "";
	mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
	document.getElementById("txtDescripcion").value = "";
	document.getElementById("chkExcMant").checked = false;
	if (opcion) {
		idmedicoMantenimiento = 0;
		document.getElementById("spnMedicoEmpresa").style.display = "";
	}
	//esConciliacion = false;
}
/***************CALL BACKS***************/

function listarTodo(rpta) {
		//var datos = rpta.split("¯");
		crearMatriz(rpta.split("¬"), "¦", "Principal");
		paginar(0, "Principal");

}

function listarDetalle(rpta) {
	if (rpta != "") {
		document.getElementById("spnHistorial").style.display = "";
		document.getElementById("hdfCd").value = matrizPrincipal[idenMatriz][0];
		limpiarFormulario(false);
		document.getElementById("divTabs").style.display = "none";
		document.getElementById("divEdicion").style.display = "";
		document.getElementById("spnMedicoEmpresa").style.display = "none";
		document.getElementById("txtMedicoEmpresa").value = matrizPrincipal[idenMatriz][1];
		document.getElementById("txtDescripcion").value = matrizPrincipal[idenMatriz][2];
		document.getElementById("TituloPopupConcilacion").innerHTML = "ACTUALIZAR PROCESO DE CONCILIACIÓN";
		document.getElementById("divCheck").style.display = "";
		crearMatriz(rpta.split("¬"), "¦", "Detalle");
		paginar(0, "Detalle");
		document.getElementById("divExporExcDet").style.display = "";
		document.getElementById("spnCantDet").innerHTML = matrizDetalle.length;
		var btnGrabarConciliar = document.getElementById("btnGrabarConciliar");
		var btnGrabarTerminar = document.getElementById("btnGrabarTerminar");
		btnGrabarConciliar.parentNode.style.display = "none";
		if (matrizPrincipal[idenMatriz][3] == "C") {
			btnGrabarTerminar.parentNode.style.display = "";
		}
		else {
			btnGrabarTerminar.parentNode.style.display = "none";
		}
		var btnGrabarCarga = document.getElementById("btnGrabarCarga");
		if (matrizPrincipal[idenMatriz][3] == "T" || matrizPrincipal[idenMatriz][3] == "I") {
			btnGrabarConciliar.parentNode.style.display = "none";
			btnGrabarCarga.parentNode.style.display = "none";
			document.getElementById("divreemExc").style.display = "none";
			document.getElementById("divExporExcDet").style.width = "100%";
		} else {
			btnGrabarConciliar.parentNode.style.display = "";
			btnGrabarCarga.parentNode.style.display = "";
			document.getElementById("divreemExc").style.display = "inline-block";
			document.getElementById("divExporExcDet").style.width = "600px";
		}

		if (esConciliacion) {
			abrirPopup('PopupConcilacion');
			esConciliacion = false;
		}
	}
}

function grabarCarga(rpta) {
	var btnGrabarCarga = document.getElementById("btnGrabarCarga");
	btnGrabarCarga.innerHTML = "Grabar";
	btnGrabarCarga.onclick = function () {
		var divCheck = document.getElementById("divCheck").style.display;
		if (divCheck != "none") {
			var chkExcMant = document.getElementById("chkExcMant").checked;
			if (chkExcMant) {
				if (matrizValidados.length) {
					abrirPopup('PopupConfirmacion');
				}
				else {
					if (validarDetalle()) {
						var lista = document.getElementById("txtDescripcion").value + "¯";
						var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
						$.ajax(url, "post", grabarCarga, lista);
						this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
						this.onclick = null;
					}
				}
			} else {
				if (validarDetalle()) {
					var lista = document.getElementById("txtDescripcion").value + "¯";
					var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 0;
					$.ajax(url, "post", grabarCarga, lista);
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					this.onclick = null;
				}
			}
		}
		else {
			if (validarDetalle()) {
				var fupArchivo = document.getElementById("fupArchivo").value;
				if (matrizValidados.length > 0) {
					var lista = document.getElementById("txtDescripcion").value + "¯" + obtenerIds(true);
					var url = urlBase + "Control/ConciliacionOAadicionar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento + "&opc=" + 1;
					$.ajax(url, "post", grabarCarga, lista);
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					this.onclick = null;
				}
				else {
					mostraralerta("No hay registros validados");
				}
			}
		}
	}
	if (esConciliacion) {
		var btnGrabarConciliar = document.getElementById("btnGrabarConciliar");
		btnGrabarConciliar.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		btnGrabarConciliar.onclick = null;
		var url = urlBase + "Control/ConciliacionOAProcesar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento;
		$.ajax(url, "get", grabarConciliacion);
	}
	else {
		mostraralerta(rpta);
		document.getElementById("btnBuscar").click();
		abrirPopup("PopupConcilacion");
		esConciliacion = false;
	}
}

function grabarConciliacion(rpta) {
	var btnGrabarConciliar = document.getElementById("btnGrabarConciliar");
	btnGrabarConciliar.innerHTML = "Conciliar";
	btnGrabarConciliar.onclick = function () {
		if (matrizValidados.length > 0) {
			esConciliacion = true;
			document.getElementById("btnGrabarCarga").click();
		} else {
			esConciliacion = true;
			document.getElementById("btnGrabarCarga").click();
			//var url = urlBase + "Control/ConciliacionOAProcesar?ss=" + ss + "&su=" + sucursalId + "&id=" + idmedicoMantenimiento;
			//$.ajax(url, "get", grabarConciliacion);
			//this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			//this.onclick = null;
		}
	}
	document.getElementById("btnBuscar").click();
	mostraralerta(rpta);
	//ObtenerDetalle(idenMatriz);
	esConciliacion = false;
	var url = urlBase + "Control/ConciliacionOAListarPorId?ss=" + ss + "&id=" + matrizPrincipal[idenMatriz][0];
	$.ajax(url, "get", listarDetalle);
	idmedicoMantenimiento = matrizPrincipal[idenMatriz][0];
	//abrirPopup("PopupConcilacion");
	
}

function grabarCierre(rpta) {
	abrirPopup('PopupEstado2');
	if (rpta != "") {
		mostraralerta(rpta);
		document.getElementById("btnBuscar").click();
		abrirPopup('PopupConcilacion');
	}
}

function mostrarAnulacion(rpta) {
	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.innerHTML = "Grabar";
	btngrabarEstado.onclick = function () {
		var datos = this.getAttribute("data-grabar").split("|");
		var url = urlBase + "Control/ConciliacionOAActualizarEstado?ss=" + ss + "&id=" + datos[0] + "&st=" + datos[1];
		$.ajax(url, "get", mostrarAnulacion);
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.onclick = null;
	}
	if (rpta != "") {
		mostraralerta(rpta);
		document.getElementById("btnBuscar").click();
		abrirPopup('PopupEstado');
	}
}

/**************FUNCIONES DE ACCION**************/

function Buscar() {
	var divPrincipal = document.getElementById("divPrincipal");
	divPrincipal.style.display = "";
	var url = urlBase + "Control/ConciliacionOAListar?ss=" + ss;
	var txtFechaInicio = document.getElementById("txtFechaInicio").value;
	var txtFechaFin = document.getElementById("txtFechaFin").value;
	var hdfMedico = idenfiltroactual;
	var hdfEmpresa = document.getElementById("hdfEmpresa").value;
	var strDatos = sucursalId + "|" + (txtFechaInicio == "" ? "01/01/1900" : txtFechaInicio) + "|" + (txtFechaFin == "" ? "01/01/1900" : txtFechaFin) + "|" + hdfMedico + "|" + (hdfEmpresa == "-1" ? "0" : hdfEmpresa);
	$.ajax(url, "post", listarTodo, strDatos);
}

function ObtenerDetalle(id) {
	esConciliacion = true;
	idenMatriz = id;
	var url = urlBase + "Control/ConciliacionOAListarPorId?ss=" + ss + "&id=" + matrizPrincipal[id][0];
	$.ajax(url, "get", listarDetalle);
	idmedicoMantenimiento = matrizPrincipal[id][0];
}

function registrarAnulacion(id) {
	var codigo = matrizPrincipal[id][0];
	var estado = matrizPrincipal[id][3];
	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.setAttribute("data-grabar", codigo + "|" + (estado == "I" ? "P" : "I"));
	abrirPopup('PopupEstado');
}

/***************VALIDACIONES**************/

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

function validarDetalle() {

	var txtMedicoEmpresa = document.getElementById("txtMedicoEmpresa");
	var txtDescripcion = document.getElementById("txtDescripcion");

	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeMedico = validarTexto(txtMedicoEmpresa.id, "médico/empresa", true);
	if (mensajeMedico != "") {
		mensajeValidacion[txtMedicoEmpresa.getAttribute("data-secuencia")] = mensajeMedico;
		txtMedicoEmpresa.className += " error";
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

/****************FUNCIONES GENERICAS********************/
function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

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

function exportacionExcelImportacion() {
	var contenido = "";
	if (matrizValidados.length > 0 || matrizErrados.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, nanchos = 0, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [];

		matrizCabecera = ["Sucursal", "IdOrdenAtencion", "LineaOA", "CodigoOA", "Componente", "Importe", "Periodo Prod.", "Observación"];
		matrizAnchos = [120, 120, 120, 120, 120, 120, 120, 600];
		matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7];

		for (var x = 0; x < 2; x++) {
			switch (x) {
				case 0:
					//ncampos = matrizValidados[0].length;
					matriz = (matrizValidados.length == 0 ? [] : matrizValidados.slice(0));
					nombre = "Validados";
					break;
				case 1:
					//ncampos = matrizErrados[0].length;
					matriz = (matrizErrados.length == 0 ? [] : matrizErrados.slice(0));
					nombre = "Erroneos";
					break;
			}
			ncampos = (x == 0 ? (matrizCabecera.length - 1) : matrizCabecera.length);
			n = matriz.length;
			nanchos = (x == 0 ? (matrizAnchos.length - 1) : matrizAnchos.length);

			if (n > 0) {
				contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
				for (var u = 0; u < nanchos; u++) {
					contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
				}
				contenido += "<Row>";
				for (var t = 0; t < ncampos; t++) {
					contenido += '<Cell ss:StyleID="s79">';
					contenido += '<Data ss:Type="String">';
					contenido += matrizCabecera[t];
					contenido += '</Data>';
					contenido += '</Cell>';
				}
				contenido += "</Row>";
				for (var z = 0; z < n; z++) {
					contenido += "<Row>";
					for (y = 0; y < ncampos; y++) {
						switch (y) {
							case 5:
								contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[z][matrizIndice[y]] * 1;
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndice[y]].toString();
								break;
						}
						contenido += '</Data>';
						contenido += '</Cell>';
					}
					contenido += "</Row>";
				}
				contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
			}
		}
		contenido += '</Workbook>';
	}
	if (contenido != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", "Validacion_de_Carga.xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	} else {
		mostraralerta("No se encontraron registros");
	}
}

function descargarExcelGenerico(identificador, nombrearchivo) {
	var matriz = window["matriz" + identificador].slice(0);
	var matrizCabecera = window["cabeceras" + identificador].slice(0);
	var matrizIndice = window["matrizIndice" + identificador].slice(0);
	var matrizAnchos = window["anchosExcel" + identificador].slice(0);
	var nRegistros = matriz.length;
	var contenido = "";
	if (nRegistros > 0) {
		contenido += "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
		for (var x = 0; x < matrizCabecera.length; x++) {
			contenido += "<td style='width: ";
			contenido += matrizAnchos[x];
			contenido += "px'>";
			contenido += matrizCabecera[x];
			contenido += "</td>";
		}
		contenido += "</tr>";
		for (var i = 0; i < nRegistros; i++) {
			contenido += "<tr>";
			switch (identificador) {
				case "Principal":
					for (var j = 0; j < matrizIndice.length; j++) {
						contenido += "<td>";
						if (j == 2) {
							switch (matriz[i][matrizIndice[j]]) {
								case "C":
									contenido += "CONCILIADO";
									break;
								case "P":
									contenido += "PENDIENTE";
									break;
								case "T":
									contenido += "TERMINADO";
									break;
								case "I":
									contenido += "INACTIVO";
									break;
							}
						}
						else {
							contenido += matriz[i][matrizIndice[j]].toString().trim();
						}
						contenido += "</td>";
					}
					break;
				case "Detalle":
					for (var j = 0; j < matrizIndice.length; j++) {

						switch (j) {
							case 8:
								contenido += "<td>";
								switch (matriz[i][matrizIndice[j]]) {
									case "C":
										contenido += "CONCILIADO";
										break;
									case "P":
										contenido += "PENDIENTE";
										break;
									case "T":
										contenido += "TERMINADO";
										break;
								}
								break;
							case 6:
							case 7:
								contenido += "<td style='text-align:right;mso-number-format:\"\@\"'>";
								contenido += matriz[i][matrizIndice[j]].toString().trim();
								break;
							default:
								contenido += "<td style='mso-number-format:\"\@\"'>";
								contenido += matriz[i][matrizIndice[j]].toString().trim();
								break;
						}
						contenido += "</td>";
					}
					break;
			}
			contenido += "</tr>";

		}
		contenido += "</table></html>";
	}
	if (contenido != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", nombrearchivo + ".xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	} else {
		mostraralerta("No se encontraron registros");
	}
}


/*******UNICAMENTE PARA EL TEMA DE CARGA EXCEL*******/

function xw(data, cb) {
	if (transferable) xw_xfer(data, cb);
	//else xw_noxfer(data, cb);
}
function xw_xfer(data, cb) {
	var path = window.top.document.getElementById("Ref").value;
	var worker = new Worker(path + XW.rABS);
	worker.onmessage = function (e) {
		switch (e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			default: xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
				cb(JSON.parse(xx));
				worker.terminate();
				break;
		}
	};
	if (rABS) {
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	} else {
		worker.postMessage(data, [data]);
	}
}
function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
	return o;
}
function s2ab(s) {
	var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
	for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}

function mostrarError(e) {
	switch (e.target.error.code) {
		case e.target.error.NOT_FOUND_ERR:
			console.log('Archivo No Encontrado');
			break;
		case e.target.error.NOT_READABLE_ERR:
			console.log('No se puede leer el archivo');
			break;
		case e.target.error.ABORT_ERR:
			break;
		default:
			console.log('Ocurrio un error al leer el archivo');
	};
}

function mostrarArchivo(e) {
	var data = e.target.result;
	if (use_worker) {
		xw(data, process_wb);
	}
}
function process_wb(wb) {
	var doc = document, output = "";
	var lista = to_csv(wb)[0].split("¯");

	var gifLoad = document.getElementById("gifLoad3");
	gifLoad.style.display = "none";
	var lista1 = lista[0].split("¬");
	var lista2 = lista[1] != "" ? lista[1].split("¬") : [];
	crearMatriz2("divValidados", lista1);
	//listaValidados = lista[0];
	crearMatriz2("divErrados", lista2);

	//mtImponible = lista[2];
	if (matrizValidados.length > 0) {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
	}
	else if (matrizErrados.length > 0) {
		mostrarTabs(document.getElementById("taby2"), 'ulTabsY');
	}
	else {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
	}

}

function to_csv(workbook) {
	var result = [], c = 0;
	workbook.SheetNames.forEach(function (sheetName) {
		if (c == 0) {
			var csv = sheet_to_csv(workbook.Sheets[sheetName], null, sheetName);
			if (csv != null) {
				result.push(csv);
			}
		}
		c++;
	});
	return result;
}

function sheet_to_csv(sheet, opts, nm) {
	MatrizWS = [];
	var out = "", txt = "", qreg = /"/g;
	var o = opts == null ? {} : opts;
	var c = 0;
	if (sheet == null || sheet["!ref"] == null) return "";
	var r = safe_decode_range(sheet["!ref"]);
	var FS = o.FS !== undefined ? o.FS : ",", fs = FS.charCodeAt(0);
	var RS = o.RS !== undefined ? o.RS : "\n", rs = RS.charCodeAt(0);
	var row = "", rr = "", cols = [];
	var i = 0, cc = 0, val;
	var R = 0, C = 0;
	for (C = r.s.c; C <= r.e.c; ++C) { cols[C] = encode_col(C) };
	var nCols = cols.length;
	var nRg = r.e.r + 1;
	for (var j = 1; j <= nRg; ++j) {
		MatrizWS[c] = [];
		for (var i = 0; i < nCols; i += 1) {
			val = sheet[cols[i] + j];
			MatrizWS[c][i] = (val != undefined ? (val.w != undefined ? val.w : (val.v != undefined ? val.v : "")) : "");
		}
		c++;
	}

	MatrizWS.splice(0, 1);
	xlsData = "";
	var n = MatrizWS.length, reg, ncampos, cntv = "", cnte = "", errxls = "", tmpxls = "", c = 0, v, msg = "", cv = 0, ce = 0, desc = "";
	var mtMonto = 0;
	if (n > 0) {
		if (MatrizWS[0].length == 7) {
			for (var k = 0; k < n; k++) {
				reg = MatrizWS[k];
				ncampos = reg.length;
				tmpxls = "";
				msg = "";

				for (var j = 0; j < 7; j++) {
					tmpxls += reg[j] + "¦";

					switch (j) {
						case 0:
							if (reg[j].trim() == "") {
								msg += "La sucursal no debe estar vacia-";
							}
							else {
								if (reg[j].trim().length > 4) {
									msg += "La sucursal es inválida-";
								}
								else {
									if (reg[j].trim() != sucursalId) {
										msg += "La sucursal no corresponde al usuario logeado-";
									}
								}
							}
							break;
						case 1:
							if (reg[j].trim() == "") {
								msg += "IdOrdenAtencion no debe estar vacia-";
							} else {
								if (isNaN(reg[j])) {
									msg += "IdOrdenAtencion número inválido-";
								}
							}
							break;
						case 2:
							if (reg[j].trim() == "") {
								msg += "Línea no debe estar vacia-";
							} else {
								if (isNaN(reg[j])) {
									msg += "Línea número inválido-";
								}
							}
							break;
						case 3:
							if (reg[j].trim() == "") {
								msg += "El código OA no debe estar vacia-";
							} else {
								if (reg[j].trim().length < 10 || reg[j].trim().length > 10) {
									msg += "El código OA es inválido-";
								}
							}
							break;
						case 4:
							if (reg[j].trim() == "") {
								msg += "El código de componente no debe estar vacia-";
							} else {
								if (reg[j].trim() == "") {
									msg += "El código de componente no debe estar vacia-";
								}
							}
							break;
						case 5:
							if (reg[j].trim() == "") {
								msg += "La cantidad no debe estar vacia-";
							} else {
								if (isNaN(reg[j])) {
									msg += "Cantidad número inválido-";
								}
							}
							break;
						case 6:
							if (reg[j].trim() == "") {
								msg += "El periodo de producción no debe estar vacio-";
							} else {
								if (isNaN(reg[j]) || reg[j].trim().length < 6) {
									msg += "El periodo de producción es inválido-";
								}
							}
							break;
					}
				}
				if (msg != "") {
					errxls += tmpxls + msg + "¬";
				} else {
					tmpxls = tmpxls.substring(0, tmpxls.length - 1);
					xlsData += tmpxls + "¬";
				}

			}
		} else {
			mostraralerta("El archivo excel no tiene el formato indicado");
			return "¯¯";
		}
	}
	xlsData = xlsData.substring(0, xlsData.length - 1);
	errxls = errxls.substring(0, errxls.length - 1);

	return xlsData + "¯" + errxls + "¯" + mtMonto;
}

function safe_decode_range(range) {
	var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
	var idx = 0, i = 0, cc = 0;
	var len = range.length;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.s.c = --idx;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.s.r = --idx;
	if (i === len || range.charCodeAt(++i) === 58) { o.e.c = o.s.c; o.e.r = o.s.r; return o; }

	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.e.c = --idx;
	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.e.r = --idx;
	return o;
}
function encode_col(col) { var s = ""; for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode(((col - 1) % 26) + 65) + s; return s; }

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

function crearTabla2(opcion) {
	var nCampos = "";
	var contenido = "";
	switch (opcion) {
		case "divValidados":
			nCampos = (cabecerasV.length - 1);
			contenido = "<table class='tabla-general tabla-corta' style='table-layout: fixed;width: 100%;max-width: none;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			for (var j = 0; j < nCampos; j++) {
				contenido += "<th style='width:";
				contenido += anchosV[j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace' data-orden='";
				contenido += matrizIndiceV[j];
				contenido += "'>";
				contenido += cabecerasV[j];
				contenido += "</span><br/>";
				contenido += "<input type='text' class='TextoValidados";
				contenido += "' name='cabeceraValidados";
				contenido += "' style='width:90%;display:none'>";
				contenido += "</th>";
			}
			contenido += "</tr>";
			contenido += "</thead>";
			contenido += "<tbody id='tbValidos' class='tabla-FilaCuerpo'>";
			contenido += "<tr><td colspan='" + nCampos + "' style='text-align:center'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
		case "divErrados":
			nCampos = cabecerasV.length;
			contenido = "<table class='tabla-general tabla-corta' style='width:100%;max-width:none;'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			for (var j = 0; j < nCampos; j++) {
				contenido += "<th style='width:";
				contenido += anchosV[j];
				contenido += "px'><span id='spn";
				contenido += j.toString();
				contenido += "' class='Enlace' data-orden='";
				contenido += matrizIndiceV[j];
				contenido += "'>";
				contenido += cabecerasV[j];
				contenido += "</span><br/>";
				contenido += "</th>";
			}
			contenido += "</tr>";
			contenido += "</thead>";
			contenido += "<tbody id='tbErrados' class='tabla-FilaCuerpo'>";
			contenido += "<tr><td colspan='" + nCampos + "' style='text-align:center'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
	}
	document.getElementById(opcion).innerHTML = contenido;
}

function crearMatriz2(div, lista) {
	switch (div) {
		case "divValidados":
			var cabecera, exito, nCampos, campos, x = 0, v = 0;
			matrizValidados = [];
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizValidados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizValidados[x][j] = campos[j];
						else matrizValidados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenV = 0;
			indiceOrdenV = 0;
			mostrar2Pagina(1, -1);
			document.getElementById("numRegY1").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizValidados.length + "</i>";
			break;
		case "divErrados":
			var cabeceras = document.getElementsByName("cabeceraE");
			var nCabeceras = cabeceras.length;
			var listaCabeceras = [];
			for (var i = 0; i < nCabeceras; i++) {
				listaCabeceras[i] = cabeceras[i].value.toLowerCase();
			}
			var cabecera, exito, nCampos, campos, x = 0, v = 0;
			matrizErrados = [];
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizErrados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizErrados[x][j] = campos[j];
						else matrizErrados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenE = 0;
			indiceOrdenE = 0;
			mostrar2Pagina(2, -1);
			document.getElementById("numRegY2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizErrados.length + "</i>";
			break;
	}
}

function mostrar2Pagina(div, indicePagina) {
	switch (div) {
		case 1:
			var nRegistros = matrizValidados.length;
			var esBloque = (indicePagina < 0);
			if (esBloque) {
				var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
				if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
				var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
				if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueV = 0;
						break;
					case -2:
						if (indiceActualBloqueV > 0) {
							indiceActualBloqueV--;
							indicePagina = indiceActualBloqueV * paginasBloqueV;
						}
						break;
					case -3:
						if (indiceActualBloqueV < indiceUltimoBloque) {
							indiceActualBloqueV++;
							indicePagina = indiceActualBloqueV * paginasBloqueV;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueV = indiceUltimoBloque;
						break;
				}
			}
			indiceActualPaginaV = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			nCampos = cabecerasV.length - 1;
			if (matrizValidados.length > 0) {
				var inicio = indicePagina * registrosPaginaV;
				var fin = inicio + registrosPaginaV;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {
						contenido += "<tr>";
						for (j = 0; j < (nCampos) ; j++) {
							switch (j) {
								case 1:
								case 2:
								case 5:
								case 6:
									contenido += "<td style='text-align:right'>";
									break;

								default:
									contenido += "<td>";
									break;
							}
							if (j == 5) contenido += formatearNumero(matrizValidados[i][j]);
							else contenido += matrizValidados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}
			}
			else {
				contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='" + nCampos + "'>No hay datos</td></tr>";
			}
			var tabla = document.getElementById("tbValidos");
			if (tabla != null) {
				tabla.innerHTML = contenido;
				configurarPaginacion2(1);
				seleccionarPaginaActual2(1);
			}
			if (esBloque) {
				configurarPaginacion2(1);
			}
			break;
		case 2:
			var nRegistros = matrizErrados.length;
			var esBloque = (indicePagina < 0);
			if (esBloque) {
				var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
				if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
				var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
				if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
				switch (indicePagina) {
					case -1:
						indicePagina = 0;
						indiceActualBloqueE = 0;
						break;
					case -2:
						if (indiceActualBloqueE > 0) {
							indiceActualBloqueE--;
							indicePagina = indiceActualBloqueE * paginasBloqueE;
						}
						break;
					case -3:
						if (indiceActualBloqueE < indiceUltimoBloque) {
							indiceActualBloqueE++;
							indicePagina = indiceActualBloqueE * paginasBloqueE;
						}
						break;
					case -4:
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueE = indiceUltimoBloque;
						break;
				}
			}
			indiceActualPaginaE = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			nCampos = cabecerasV.length;
			if (matrizErrados.length > 0) {
				var inicio = indicePagina * registrosPaginaE;
				var fin = inicio + registrosPaginaE;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {

						contenido += "<tr>";
						for (j = 0; j < nCampos; j++) {
							switch (j) {
								case 1:
								case 2:
								case 5:
								case 6:
									contenido += "<td style='text-align:right'>";
									break;

								default:
									contenido += "<td>";
									break;
							}
							if (j == 5) contenido += formatearNumero(matrizErrados[i][j]);
							else contenido += matrizErrados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else

						break;
				}
			} else {
				contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='" + nCampos + "'>No hay datos</td></tr>";
			}
			var tabla = document.getElementById("tbErrados");
			if (tabla != null) {
				tabla.innerHTML = contenido;
				configurarPaginacion2(2);
				seleccionarPaginaActual2(2);
				if (esBloque) {
					configurarPaginacion2(2);
				}
			}

			break;
	}
}

function configurarPaginacion2(div) {
	switch (div) {
		case 1:
			var nRegistros = matrizValidados.length;
			var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
			if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
			var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
			if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
			var contenido = "";
			var inicio = indiceActualBloqueV * paginasBloqueV;
			var fin = inicio + paginasBloqueV;
			if (indiceActualBloqueV > 0 && nRegistros > (paginasBloqueV * registrosPaginaV)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='paginaValidos' onclick='mostrar2Pagina(1, ";
					contenido += i;
					contenido += ");'  title='Ir a la pagina ";
					contenido += (i + 1).toString();
					contenido += "' id='aV";
					contenido += i.toString();
					contenido += "'>";
					contenido += (i + 1).toString();
					contenido += "</a>&nbsp;";
				} else break;
			}
			if (indiceActualBloqueV < indiceUltimoBloque && nRegistros > (paginasBloqueV * registrosPaginaV)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgValidos");
			if (nRegistros <= registrosPaginaV) {
				tdPagina.innerHTML = "";
			}
			else {
				tdPagina.innerHTML = contenido;
				seleccionarPaginaActual2(1);
			}
			break;
		case 2:
			var nRegistros = matrizErrados.length;
			var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
			if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
			var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
			if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
			var contenido = "";
			var inicio = indiceActualBloqueE * paginasBloqueE;
			var fin = inicio + paginasBloqueE;
			if (indiceActualBloqueE > 0 && nRegistros > (paginasBloqueE * registrosPaginaE)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='pagina paginaErrados' onclick='mostrar2Pagina(2, ";
					contenido += i;
					contenido += ");'  title='Ir a la pagina ";
					contenido += (i + 1).toString();
					contenido += "' id='aE";
					contenido += i.toString();
					contenido += "'>";
					contenido += (i + 1).toString();
					contenido += "</a>&nbsp;";
				} else break;
			}
			if (indiceActualBloqueE < indiceUltimoBloque && nRegistros > (paginasBloqueE * registrosPaginaE)) {
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgErrados");
			if (nRegistros <= registrosPaginaV) {
				tdPagina.innerHTML = "";
			}
			else {
				tdPagina.innerHTML = contenido;
				seleccionarPaginaActual2(2);
			}
			break;
	}
}

function seleccionarPaginaActual2(div) {
	var aPaginas;
	if (div == 1) aPaginas = document.getElementsByClassName("paginaValidos");
	else aPaginas = document.getElementsByClassName("paginaErrados");
	var nPaginas = aPaginas.length;
	for (i = 0; i < nPaginas; i++) {
		if (div == 1) aPaginas[i].className = "pagina paginaValidos";
		else aPaginas[i].className = "pagina paginaErrados";
	}
	switch (div) {
		case 1:
			var aPagina = document.getElementById("aV" + indiceActualPaginaV);
			if (aPagina != null) {
				aPagina.className = "pagina paginaValidos seleccionado";
			}
			break;
		case 2:
			var aPagina = document.getElementById("aE" + indiceActualPaginaE);
			if (aPagina != null) {
				aPagina.className = "pagina paginaErrados seleccionado";
			}
			break;
	}
}

function obtenerIds(opcion) {
	var n = 0, ids = "";
	if (opcion) {
		n = matrizValidados.length;
		for (var i = 0; i < n; i++) {
			ids += matrizValidados[i][1];
			ids += "¦";
			ids += matrizValidados[i][2];
			ids += "¦";
			ids += matrizValidados[i][3];
			ids += "¦";
			ids += matrizValidados[i][4];
			ids += "¦";
			ids += matrizValidados[i][5];
			ids += "¦";
			ids += matrizValidados[i][6];
			ids += "¬";
		}
	} else {
		var nRegistros = matrizSeleccionadosCalcular.length;
		var fin = inicioEnvio + registroEnviar;
		for (var i = inicioEnvio; i < fin; i++) {
			if (i < nRegistros) {
				ids += matrizSeleccionadosCalcular[i];
				ids += "¬";
			}
		}
	}
	ids = ids.substring(0, ids.length - 1);
	return ids;
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
			ifrHistorial.innerHTML = "<iframe style='margin:0;padding:0;width:100%;height:400px;border: 1px solid transparent;' src='" + url + "'></iframe>";
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
