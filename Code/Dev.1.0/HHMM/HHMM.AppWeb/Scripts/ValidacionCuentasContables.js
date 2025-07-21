var matrizProduccion = [], matrizMontoFijo = [], matrizHorario = [], matrizTurno = [];
var matrizFiltroProduccion = [], matrizFiltroMontoFijo = [], matrizFiltroHorario = [], matrizFiltroTurno = [];

var cabecerasProduccion = [
	"Sucursal", "Código", "Médico",
	"Ind. Vinculada", "Orden Atención", "Línea OA",
	"Tipo Admisión Id", "Tipo Admisión", "Servicio Id",
	"Servicio", "Especialidad Id", "Especialidad",
	"Clasificador Movimiento Id", "Clasificador Movimiento", "Código Prestación",
	"Prestación"
];
var matrizIndiceProduccion = [
	0, 1, 2,
	3, 4, 5,
	6, 7, 8,
	9, 10, 11,
	12, 13, 14,
	15
];
var anchosProduccion = [
	200, 80, 300,
	90, 115, 80,
	110, 150, 80,
	200, 110, 150,
	170, 180, 110,
	300
];
var anchosExcelProduccion = [
	5, 15, 10,
	5, 6, 10,
	10, 10, 7,
	5, 6, 10,
	10, 10, 7,
	5
];
var matrizIndiceFiltroProduccion = [
	0, 1, 2,
	3, 4, 5,
	6, 7, 8,
	9, 10, 11,
	12, 13, 14,
	15
];
var camposMostrarProduccion = [
	true, true, true,
	true, true, true,
	true, true, true,
	true, true, true,
	true, true, true,
	true
];
var totalProduccion = 16;

var cabecerasMontoFijo = [
	"Sucursal", "Código", "Médico",
	"Ind. Vinculada", "Tipo Admisión Id", "Tipo Admisión",
	"Concepto Monto Fijo Id", "Concepto Monto Fijo"
];
var matrizIndiceMontoFijo = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var anchosMontoFijo = [
	200, 80, 300,
	90, 100, 150,
	120, 200
];
var anchosExcelMontoFijo = [
	20, 20, 20,
	20, 20, 20,
	20, 20
];
var matrizIndiceFiltroMontoFijo = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var camposMostrarMontoFijo = [
	true, true, true,
	true, true, true,
	true, true
];
var totalMontoFijo = 8;

var lProduccion = [], lMontoFijo = [], lHorario = [], lTurno = [];

var cabecerasHorario = [
	"Sucursal", "Código", "Médico",
	"Ind. Vinculada", "Tipo Admisión Id", "Tipo Admisión",
	"Unidad Médica Id", "Unidad Médica"
];
var matrizIndiceHorario = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var anchosHorario = [
	200, 80, 300,
	90, 100, 150,
	120, 200
];
var anchosExcelHorario = [
	20, 20, 20,
	20, 20, 20,
	20, 20
];
var matrizIndiceFiltroHorario = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var camposMostrarHorario = [
	true, true, true,
	true, true, true,
	true, true
];
var totalHorario = 8;

var cabecerasTurno = [
	"Sucursal", "Código", "Médico",
	"Ind. Vinculada", "Tipo Admisión Id", "Tipo Admisión",
	"Unidad Médica Id", "Unidad Médica"
];
var matrizIndiceTurno = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var anchosTurno = [
	200, 80, 300,
	90, 100, 150,
	120, 200
];
var anchosExcelTurno = [
	20, 20, 20,
	20, 20, 20,
	20, 20
];
var matrizIndiceFiltroTurno = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var camposMostrarTurno = [
	true, true, true,
	true, true, true,
	true, true
];
var totalTurno = 8;

var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloqueProduccion = 0, indiceActualBloqueMontoFijo = 0, indiceActualBloqueHorario = 0, indiceActualBloqueTurno = 0;
var indiceOrden = 0;
var indiceActualPaginaProduccion = 0, indiceActualPaginaMontoFijo = 0, indiceActualPaginaHorario = 0, indiceActualPaginaTurno = 0;

var urlBase = "", opcionfiltro = -1, opcionPopUp = -1;
var valorTabActual = "tabx-1";
var _lMeses = ['1¦Enero', '2¦Febrero', '3¦Marzo', '4¦Abril', '5¦Mayo', '6¦Junio', '7¦Julio', '8¦Agosto', '9¦Setiembre', '10¦Octubre', '11¦Noviembre', '12¦Diciembre'];

var _lSucursal, _lTipoAdmision;

window.onload = function () {
	ss = window.parent.parent.document.getElementById("iss").value;
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var url = urlBase + "Control/ValidacionCuentasContables_Listas/?ss=" + ss;
	$.ajax(url, "get", fnObtenerListas);
	fnConfiguracionInicial();
};

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
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload")
				window.parent.parent.location.reload();
			success(xhr.responseText);
		}
	};
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}

function fnObtenerListas(rpta) {
	var listas = [];
	if (rpta !== '') {
		listas = rpta.split('¯');
		_lSucursal = listas[0] !== '' ? listas[0].split('¬') : [];
		_lTipoAdmision = listas[1] !== '' ? listas[1].split('¬') : [];
		llenarCombo(_lSucursal, "cbo_VCC_Sucursal", 2);
		var cboSucursal = document.getElementById('cbo_VCC_Sucursal');
		var idSucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
		cboSucursal.value = idSucursal;
		llenarCombo(_lTipoAdmision, "cbo_VCC_TipoAdmision", 2);
		var oFechaActual = new Date();
		var cboMes = document.getElementById('cbo_VCC_Mes');
		var txtAnio = document.getElementById('txt_VCC_Anio');
		var idMes = fnObtenerMes(oFechaActual.getMonth(), _lMeses);
		var anio = oFechaActual.getFullYear();
		cboMes.value = idMes;
		txtAnio.value = anio;
	}
}

function fnObtenerMes(indice, lista) {
	var i, nRegistros;
	var aCampos = [], idMes = '';
	nRegistros = lista.length;
	for (i = 0; i < nRegistros; i++) {
		if (indice === i) {
			aCampos = lista[i].split('¦');
			idMes = aCampos[0];
			break;
		}
	}
	return idMes;
}

function fnConfiguracionInicial() {
	fnCrearTablaEX('Produccion');
	/*lista = ['40¦CUBAS ROSALES CESAR ALFREDO¦Si¦3003231¦2¦No Asegurado¦PROCEMIENTOS¦CARDIOLOGIA¦Hospitalización¦230101¦RIESGO QUIRURGICO INCLUYE CONSULTA'];
	crearMatrizEX(lista, '¦', 'Produccion');
	paginarEX(0, 'Produccion');*/

	fnCrearTablaEX('MontoFijo');
	/*lista = ['40¦CUBAS ROSALES CESAR ALFREDO¦Si¦4¦Servicio de Neonatología', '130641¦CLINICA SAN FELIPE¦Si¦10¦Servicios Atenciones Medicas'];
	crearMatrizEX(lista, '¦', 'MontoFijo');
	paginarEX(0, 'MontoFijo');*/

	fnCrearTablaEX('Horario');
	/*lista = ['40¦CUBAS ROSALES CESAR ALFREDO¦Si¦4¦Servicio de Neonatología', '130641¦CLINICA SAN FELIPE¦Si¦10¦Servicios Atenciones Medicas']
	crearMatrizEX(lista, '¦', 'Horario');
	paginarEX(0, 'Horario');*/

	fnCrearTablaEX('Turno');
	/*lista = ['40¦CUBAS ROSALES CESAR ALFREDO¦Si¦4¦Servicio de Neonatología', '130641¦CLINICA SAN FELIPE¦Si¦10¦Servicios Atenciones Medicas']
	crearMatrizEX(lista, '¦', 'Turno');
	paginarEX(0, 'Turno');*/

	configurarOrdenacionEX();
	configurarControles();
	configurarFiltroEX();
	fnAsignarEventosEnRadiosValidar();
}

function fnMostrarValidar(rpta) {
	var divLoading = window.parent.parent.document.getElementById("_loading");
	divLoading.classList.add('hide');
	var btnValidar = document.getElementById('btn_VCC_Buscar');
	btnValidar.disabled = false;
	btnValidar.style.cursor = 'pointer';
	if (rpta !== '') {
		var listas = rpta.split('¯');
		lProduccion = listas[0] ? listas[0] !== '' ? listas[0].split('¬') : [] : [];
		lMontoFijo = listas[1] ? listas[1] !== '' ? listas[1].split('¬') : [] : [];
		lHorario = listas[2] ? listas[2] !== '' ? listas[2].split('¬') : [] : [];
		lTurno = listas[3] ? listas[3] !== '' ? listas[3].split('¬') : [] : [];
		fnDeshabilitarTabs();
		crearMatrizEX(lProduccion, '¦', 'Produccion');
		paginarEX(0, 'Produccion');
		crearMatrizEX(lMontoFijo, '¦', 'MontoFijo');
		paginarEX(0, 'MontoFijo');
		crearMatrizEX(lHorario, '¦', 'Horario');
		paginarEX(0, 'Horario');
		crearMatrizEX(lTurno, '¦', 'Turno');
		paginarEX(0, 'Turno');
	}
}

function fnObtenerParametros() {
	var cboTipoAdmision = document.getElementById('cbo_VCC_TipoAdmision');
	var cboMes = document.getElementById('cbo_VCC_Mes');
	var cboAnio = document.getElementById('txt_VCC_Anio');
	var aTmp = [], aData = [];
	aTmp.push(fnObtenerValorRadio('rdnValidar'));
	aTmp.push(cboTipoAdmision.value);
	aTmp.push(fnObtenerValorRadio('rdnTipoCuenta'));
	aTmp.push(cboAnio.value);
	aTmp.push(cboMes.value);

	aData.push(aTmp.join('¦'));
	aData.push(fnObtenerSucursales());

	return aData.join('¯');
}

function fnObtenerSucursales() {
	var i, len;
	var aSucursal = [], idSucursal = '',
		cboSucursal = document.getElementById('cbo_VCC_Sucursal');
	idSucursal = cboSucursal.value;
	if (idSucursal !== '') {
		aSucursal.push(idSucursal);
	} else {
		var opciones = cboSucursal.options;
		len = opciones.length;
		for (i = 1; i < len; i++) {
			idSucursal = opciones[i].value;
			aSucursal.push(idSucursal);
		}
	}
	return aSucursal.join('¦');
}

function fnObtenerValorRadio(name) {
	var i, len;
	var radio, radios = document.getElementsByName(name);
	var valor = '';
	len = radios.length;
	for (i = 0; i < len; i++) {
		radio = radios[i];
		if (radio.checked) {
			valor = radio.value;
			break;
		}
	}
	return valor;
}

function configurarControles() {
	var btnValidar = document.getElementById('btn_VCC_Buscar');
	btnValidar.onclick = function () {
		indiceActualBloqueProduccion = 0, indiceActualBloqueMontoFijo = 0, indiceActualBloqueHorario = 0, indiceActualBloqueTurno = 0;
		indiceActualPaginaProduccion = 0, indiceActualPaginaMontoFijo = 0, indiceActualPaginaHorario = 0, indiceActualPaginaTurno = 0;
		var divLoading = window.parent.parent.document.getElementById("_loading");
		divLoading.classList.remove('hide');
		ss = window.parent.parent.document.getElementById("iss").value;
		urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
		var url = urlBase + "Control/ValidacionCuentasContables_Listar/?ss=" + ss;
		var data = fnObtenerParametros();
		this.disabled = true;
		this.style.cursor = 'wait';
		fnModificarCamposMostrar();
		fnConfiguracionInicial();
		$.ajax(url, "post", fnMostrarValidar, data);
		fnLimpiarCabeceras();
	};

	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		var contenido = '';
		var identificador = '';
		switch (valorTabActual) {
			case 'tabx-1':
				identificador = 'Produccion';
				break;
			case 'tabx-2':
				identificador = 'MontoFijo';
				break;
			case 'tabx-3':
				identificador = 'Horario';
				break;
			case 'tabx-4':
				identificador = 'Turno';
				break;
		}
		this.removeAttribute('download');
		this.href = '#';
		if (window['matriz' + identificador].length > 0) {
			contenido = exportarExcel(identificador);
			var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
			this.download = identificador + ".xls";
			this.href = window.URL.createObjectURL(formBlob);
		} else {
			return true;
		}
	};

	var btnLimpiar = document.getElementById('btn_VCC_Limpiar');
	btnLimpiar.onclick = function () {
		var rdnMaestroSistema = document.getElementById('rdnMaestroSistema');
		var cboSucursal = document.getElementById('cbo_VCC_Sucursal');
		var cboTipoAdmision = document.getElementById('cbo_VCC_TipoAdmision');
		var rdnCuentaProvision = document.getElementById('rdnCuentaProvision');
		var cboMes = document.getElementById('cbo_VCC_Mes');
		var txtAnio = document.getElementById('txt_VCC_Anio');

		var oFechaActual = new Date();
		var idMes = fnObtenerMes(oFechaActual.getMonth(), _lMeses);
		var anio = oFechaActual.getFullYear();
		rdnMaestroSistema.checked = true;
		cboSucursal.selectedIndex = 0;
		cboTipoAdmision.selectedIndex = 0;
		rdnCuentaProvision.checked = true;
		cboMes.value = idMes;
		txtAnio.value = anio;
	};
}

function fnCrearTablaEX(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	for (var j = 0; j < nCampos; j++) {
		if (window['camposMostrar' + identificador][j]) {
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
				default:
					contenido += "<input type='text' class='Texto";
					contenido += identificador;
					contenido += "' name='cabecera";
					contenido += identificador;
					contenido += "' style='width:90%'>";
					break;
			}
			contenido += "</th>";
		}
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (window['total' + identificador]).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "</table>";
	document.getElementById("div_VCC_" + identificador).innerHTML = contenido;
}

function fnMostrarTabs(actual, ultab) {
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
	valorTabActual = data_tab_actual;
	fnDeshabilitarTabs();
}

function configurarOrdenacionEX() {
	var enlaces, enlace;
	var i, nEnlaces;
	enlaces = document.getElementsByClassName("EnlaceProduccion");
	nEnlaces = enlaces.length;
	for (i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "Produccion");
			paginarEX(indiceActualPagina, "Produccion");
		};
	}

	enlaces = document.getElementsByClassName("EnlaceMontoFijo");
	nEnlaces = enlaces.length;
	for (i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "MontoFijo");
			paginarEX(indiceActualPagina, "MontoFijo");
		};
	}

	enlaces = document.getElementsByClassName("EnlaceHorario");
	nEnlaces = enlaces.length;
	for (i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "Horario");
			paginarEX(indiceActualPagina, "Horario");
		};
	}

	enlaces = document.getElementsByClassName("EnlaceTurno");
	nEnlaces = enlaces.length;
	for (i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "Turno");
			paginarEX(indiceActualPagina, "Turno");
		};
	}
}

function ordenarMatrizEX(enlace, Elemento) {
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

function paginarEX(indicePagina, identificador) {
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
	mostrarMatrizEX(indicePagina, identificador);
}

function crearMatrizEX(lista, separador, identificador) {
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
			case "Produccion":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				if (matriz.length > 0) {
					nCampos = matriz[0].length;
				}
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 0:
								matriz[x][j] = fnObtenerDescripcion(matriz[x][j], _lSucursal);
								break;
							case 3:
								matriz[x][j] = matriz[x][j] === '1' ? 'Si' : 'No';
								break;
							default:
								matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
								break;
						}
						

						/*if (isNaN(matriz[x][j]) || matriz[x][j] == "" || j == 3 || j == 4) {
							switch (j) {
								default:
									matriz[x][j] = matriz[x][j].trim();
									break;
							}

						} else {
							matriz[x][j] = matriz[x][j] * 1;
						}*/
					}
					j = 0;
					x++;
				}
				break;
			case "MontoFijo":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				if (matriz.length > 0) {
					nCampos = matriz[0].length;
				}
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 0:
								matriz[x][j] = fnObtenerDescripcion(matriz[x][j], _lSucursal);
								break;
							case 3:
								matriz[x][j] = matriz[x][j] === '1' ? 'Si' : 'No';
								break;
							default:
								matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
								break;
						}
					}
					j = 0;
					x++;
				}
				break;
			case "Horario":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				if (matriz.length > 0) {
					nCampos = matriz[0].length;
				}
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 0:
								matriz[x][j] = fnObtenerDescripcion(matriz[x][j], _lSucursal);
								break;
							case 3:
								matriz[x][j] = matriz[x][j] === '1' ? 'Si' : 'No';
								break;
							default:
								matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
								break;
						}
					}
					j = 0;
					x++;
				}
				break;
			case "Turno":
				for (; i > 0; i--) {
					matriz[x] = lista[x].split(separador);
					x++;
				}
				x = 0, i = nRegistros;
				if (matriz.length > 0) {
					nCampos = matriz[0].length;
				}
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						switch (j) {
							case 0:
								matriz[x][j] = fnObtenerDescripcion(matriz[x][j], _lSucursal);
								break;
							case 3:
								matriz[x][j] = matriz[x][j] === '1' ? 'Si' : 'No';
								break;
							default:
								matriz[x][j] = (!isNaN(matriz[x][j]) && matriz[x][j].trim() != "" ? matriz[x][j] * 1 : matriz[x][j].trim());
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

function mostrarMatrizEX(indicePagina, identificador) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	if (n > 0) {
		var i, j;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "Produccion":
				for (i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (j = 0; j < nCampos; j++) {
							if (window['camposMostrar' + identificador][j]) {
								switch (j) {
									default:
										contenido += "<td>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
								}
								contenido += "</td>";
							}
						}
						contenido += "</tr>";
					} else break;
				}
				break;
			case "MontoFijo":
				for (i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (j = 0; j < nCampos; j++) {
							if (window['camposMostrar' + identificador][j]) {
								switch (j) {
									default:
										contenido += "<td>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
								}
								contenido += "</td>";
							}
						}
						contenido += "</tr>";
					} else break;
				}
				break;
			case "Horario":
				for (i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (j = 0; j < nCampos; j++) {
							if (window['camposMostrar' + identificador][j]) {
								switch (j) {
									default:
										contenido += "<td>";
										contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
										break;
								}
								contenido += "</td>";
							}
						}
						contenido += "</tr>";
					} else break;
				}
				break;
			case "Turno":
				for (i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
							for (j = 0; j < nCampos; j++) {
								if (window['camposMostrar' + identificador][j]) {
									switch (j) {
										default:
											contenido += "<td>";
											contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
											break;
									}
									contenido += "</td>";
								}
							}
						contenido += "</tr>";
					} else break;
				}
				break;
		}
	} else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		//contenido += (nCampos + 2).toString();
		contenido += window['total' + identificador].toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginasEX(identificador);
	if (esBloque) {
		crearPaginasEX(identificador);
	}
}

function crearPaginasEX(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = window["indiceActualBloque" + identificador] * paginasBloque;
	var fin = inicio + paginasBloque;
	if (window["indiceActualBloque" + identificador] > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginarEX(-1,\"" + identificador + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginarEX(-2,\"" + identificador + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginarEX(";
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
		contenido += "<span class='pagina' onclick='paginarEX(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginarEX(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		//document.getElementById("tdPaginas" + identificador).innerHTML = "";
		document.getElementById("div_VCC_Paginacion" + identificador).innerHTML = "";
	} else {
		//document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		document.getElementById("div_VCC_Paginacion" + identificador).innerHTML = contenido;
		seleccionarPaginaActualEX(identificador);
	}
}

function seleccionarPaginaActualEX(identificador) {
	var aPagina = document.getElementById("a" + identificador + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
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

function configurarFiltroEX() {
	var textos, texto;
	var i, nTextos;
	textos = document.getElementsByName("cabeceraProduccion");
	nTextos = textos.length;
	for (i = 0; i < nTextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("Produccion");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("Produccion");
				}, 0);
			};
		}
	}

	textos = document.getElementsByName("cabeceraMontoFijo");
	nTextos = textos.length;
	for (i = 0; i < nTextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("MontoFijo");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("MontoFijo");
				}, 0);
			};
		}
	}

	textos = document.getElementsByName("cabeceraHorario");
	nTextos = textos.length;
	for (i = 0; i < nTextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("Horario");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("Horario");
				}, 0);
			};
		}
	}

	textos = document.getElementsByName("cabeceraTurno");
	nTextos = textos.length;
	for (i = 0; i < nTextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("Turno");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("Turno");
				}, 0);
			};
		}
	}
}

function filtrarEX(identificador) {
	var lista = recogerValores(identificador);
	opcionfiltro = -1;
	var nCabeceras = lista.length;
	var exito = true,
		campos;
	window["matriz" + identificador] = [];
	if (nCabeceras > 0) {
		var matriz = window["matrizFiltro" + identificador].slice(0);
		var matrizIndices = window["matrizIndiceFiltro" + identificador].slice(0);
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
	paginarEX(-1, identificador);
	limpiarEnlaces(identificador);
	window["indiceActualBloque" + identificador] = 0;
}

function exportarExcel(identificador) {
	var contenido = "<html><head><meta charset='utf-8'/></head><body><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'><thead>";
	var i, j, nRegistros, nCampos;
	nCampos = window['cabeceras' + identificador].length;
	for (i = 0; i < nCampos; i++) {
		if (window['camposMostrar' + identificador][i]) {
			contenido += "<td style='color:white'>";
			contenido += window['cabeceras' + identificador][i];
			contenido += "</td>";
		}
	}
	contenido += "</tr>";
	contenido += "</thead><tbody>";

	nRegistros = window['matriz' + identificador].length;
	for (i = 0; i < nRegistros; i++) {
		contenido += "<tr class='FilaDatos'>";
		for (j = 0; j < nCampos; j++) {
			if (window['camposMostrar' + identificador][j]) {
				contenido += "<td>";
				contenido += window['matriz' + identificador][i][window['matrizIndice' + identificador][j]];
				contenido += "</td>";
			}
		}
		contenido += "</tr>";
	}
	contenido += "</tbody></table></body></html>";
	return contenido;
}

function llenarCombo(lista, nombreCombo, mostrarOpcInicial, desInicial) {
	var c = [];
	var aCampos = [], decripcionInicial = '';
	var i, nRegistros;
	if (mostrarOpcInicial) {
		switch (mostrarOpcInicial) {
			case 1:
				decripcionInicial = 'Seleccione';
				break;
			case 2:
				decripcionInicial = 'Todos';
				break;
			default:
				decripcionInicial = desInicial;
				break;
		}
		c.push('<option value="">');
		c.push(decripcionInicial);
		c.push('</option>');
	}
	nRegistros = lista.length;
	for (i = 0; i < nRegistros; i++) {
		aCampos = lista[i].split('¦');
		c.push('<option value="');
		c.push(aCampos[0]);
		c.push('">');
		c.push(aCampos[1]);
		c.push('</option>');
	}
	var cbo = document.getElementById(nombreCombo);
	if (cbo !== null) {
		cbo.innerHTML = c.join('');
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

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function fnLimpiarCabeceras() {
	var i, j, nIdentificadores, nFiltros;
	var filtro, aFiltros = []; //Textos
	var identificador, aIdentificadores = [
		'Produccion', 'MontoFijo', 'Horario', 'Turno'
	];
	nIdentificadores = aIdentificadores.length;
	for (i = 0; i < nIdentificadores; i++) {
		aFiltros = document.getElementsByClassName('Texto' + aIdentificadores[i]);
		nFiltros = aFiltros.length;
		for (j = 0; j < nFiltros; j++) {
			filtro = aFiltros[j];
			filtro.value = '';
		}
	}
}

function fnObtenerDescripcion(id, lista) {
	var i, len;
	var valor = '', aCampos = [];
	len = lista.length;
	for (i = 0; i < len; i++) {
		aCampos = lista[i].split('¦');
		if (aCampos[0] === id) {
			valor = aCampos[1];
			break;
		}
	}
	return valor;
}

function fnAsignarEventosEnRadiosValidar() {
	var control, aControles = document.getElementsByName('rdnValidar');
	var i, nControles;
	nControles = aControles.length;
	for (i = 0; i < nControles; i++) {
		control = aControles[i];
		control.addEventListener('click', function (event) {
			var cboMes = document.getElementById('cbo_VCC_Mes');
			var txtAnio = document.getElementById('txt_VCC_Anio');
			var rdnCuentaProvision = document.getElementById('rdnCuentaProvision');
			var rdnCuentaPago = document.getElementById('rdnCuentaPago');
			if (this.value === '1') {
				var oFechaActual = new Date();
				var idMes = fnObtenerMes(oFechaActual.getMonth(), _lMeses);
				var anio = oFechaActual.getFullYear();
				cboMes.disabled = true;
				cboMes.style.backgroundColor = 'rgb(235, 235, 228)';
				txtAnio.disabled = true;
				cboMes.value = idMes;
				txtAnio.value = anio;
				rdnCuentaPago.disabled = false;
			} else {
				cboMes.disabled = false;
				cboMes.style.backgroundColor = 'white';
				txtAnio.disabled = false;
				rdnCuentaProvision.checked = true;
				rdnCuentaPago.disabled = true;
			}
		}, false);
	}
}

function fnModificarCamposMostrar() {
	var vRadioValidar = fnObtenerValorRadio('rdnValidar');
	var divProduccion = document.getElementById('div_VCC_Produccion');
	var divMontoFijo = document.getElementById('div_VCC_MontoFijo');
	var divHorario = document.getElementById('div_VCC_Horario');
	var divTurno = document.getElementById('div_VCC_Turno');
	switch (vRadioValidar) {
		case '1':
			divProduccion.style.width = '1280px';
			matrizIndiceFiltroProduccion = [
				0,
				
				6, 7, 8,
				9,
				14,
				15
			];
			camposMostrarProduccion = [
				true, false, false,
				false, false, false,
				true, true, true,
				true, false, false,
				false, false, true,
				true
			];
			totalProduccion = matrizIndiceFiltroProduccion.length;

			divMontoFijo.style.width = '1000px';
			matrizIndiceFiltroMontoFijo = [
				0,
				
				6, 7
			];
			camposMostrarMontoFijo = [
				true, false, false,
				false, false, false,
				true, true
			];
			totalMontoFijo = matrizIndiceFiltroMontoFijo.length;

			divHorario.style.width = '1000px';
			matrizIndiceFiltroHorario = [
				0,
				
				6, 7
			];
			camposMostrarHorario = [
				true, false, false,
				false, false, false,
				true, true
			];
			totalHorario = matrizIndiceFiltroHorario.length;

			divTurno.style.width = '1000px';
			matrizIndiceFiltroTurno = [
				0,
				
				6, 7
			];
			camposMostrarTurno = [
				true, false, false,
				false, false, false,
				true, true
			];
			totalTurno = matrizIndiceFiltroTurno.length;
			break;
		default:
			divProduccion.style.width = '3200px';
			matrizIndiceFiltroProduccion = [
				0, 1, 2,
				3, 4, 5,
				6, 7, 8,
				9, 10, 11,
				12, 13, 14,
				15
			];
			camposMostrarProduccion = [
				true, true, true,
				true, true, true,
				true, true, true,
				true, true, true,
				true, true, true,
				true
			];
			totalProduccion = matrizIndiceFiltroProduccion.length;

			divMontoFijo.style.width = '1600px';
			matrizIndiceFiltroMontoFijo = [
				0, 1, 2,
				3, 4, 5,
				6, 7
			];
			camposMostrarMontoFijo = [
				true, true, true,
				true, true, true,
				true, true
			];
			totalMontoFijo = matrizIndiceFiltroMontoFijo.length;

			divHorario.style.width = '1600px';
			matrizIndiceFiltroHorario = [
				0, 1, 2,
				3, 4, 5,
				6, 7
			];
			camposMostrarHorario = [
				true, true, true,
				true, true, true,
				true, true
			];
			totalHorario = matrizIndiceFiltroHorario.length;

			divTurno.style.width = '1600px';
			matrizIndiceFiltroTurno = [
				0, 1, 2,
				3, 4, 5,
				6, 7
			];
			camposMostrarTurno = [
				true, true, true,
				true, true, true,
				true, true
			];
			totalTurno = matrizIndiceFiltroTurno.length;
			break;
	}
}

function fnDeshabilitarTabs() {
	var li_VCC_1 = document.getElementById('li_VCC_1');
	var li_VCC_2 = document.getElementById('li_VCC_2');
	var li_VCC_3 = document.getElementById('li_VCC_3');
	var li_VCC_4 = document.getElementById('li_VCC_4');
	var ul_VCC_Tabs = document.getElementById('ul_VCC_Tabs');
	var c = 0;
	if (window['lProduccion'].length > 0) {
		li_VCC_1.classList.remove('tab-disabled');
		c++;
	} else {
		li_VCC_1.classList.add('tab-disabled');
	}
	if (window['lMontoFijo'].length > 0) {
		li_VCC_2.classList.remove('tab-disabled');
		c++;
	} else {
		li_VCC_2.classList.add('tab-disabled');
	}
	if (window['lHorario'].length > 0) {
		li_VCC_3.classList.remove('tab-disabled');
		c++;
	} else {
		li_VCC_3.classList.add('tab-disabled');
	}
	if (window['lTurno'].length > 0) {
		li_VCC_4.classList.remove('tab-disabled');
		c++;
	} else {
		li_VCC_4.classList.add('tab-disabled');
	}
	if (c > 0) {
		ul_VCC_Tabs.classList.remove('contenedor-tabs-disabled');
	} else {
		ul_VCC_Tabs.classList.add('contenedor-tabs-disabled');
	}
}