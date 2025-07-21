var lista = [];
var matriz = [];
var cabeceras = ["Usuario", "Nombres", "Apellido Paterno", "Apellido Materno", "Perfil", "Sucursal", "Tipo Usuario", "Estado"];
var anchos = [15, 50, 25];
var matrizIndice = [0, 2, 3, 4, 5, 8, 9, 10];
var registrosPagina = 10; //10
var paginasBloque = 5; //5
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var idTipoDescuento = -1;
var tituloPoup = "";

var dataTotal = [];
var matrizUsuario = [];
var matrizCompaniaSucursal = [];
var matrizPerfil = [];
var matrizCompania = [];
var matrizSucursal = [];
var matrizTipoDocumento = [];

var ListaCompania = [];
var ListaSucursal = [];
var abcde = "";
let lstTipoUsuario = [[0, "Propio"], [1, "AD"]];
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

window.onload = function () {
	var pos1 = window.location.href.indexOf("Administracion");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Administracion/listarUsuario/?ss=" + ss;
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}

function listarTodo(rpta) {
	if (rpta != "") {
		var listas = rpta.split("¬");
		FormarMatriz(listas[0], matrizUsuario);
		FormarMatriz(listas[1], matrizCompaniaSucursal);
		FormarMatriz(listas[2], matrizPerfil);
		FormarMatriz(listas[3], matrizCompania);
		FormarMatriz(listas[4], matrizSucursal);
		FormarMatriz(listas[5], matrizTipoDocumento);

		lista = listas[0].split("¯");
        llenarCombo(matrizPerfil, 'cboPerfiles', '', 'TODOS');
        llenarCombo(lstTipoUsuario, 'cboTipoUsuario', '', 'Seleccione');
		listarUsuarios();
		//configurarOrdenacion();
		//configurarControles();
		//configurarFiltro();
	}
}

function listarUsuarios(irUltimaPagina) {
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

function FormarMatriz(listaOrigen, nombreMatriz) {
	list = listaOrigen.split("¯");
	var nRegistros = list.length;
	var nCampos;
	var campos;
	var x = 0;
	for (i = 0; i < nRegistros; i++) {
		campos = list[i].split("¦");
		nombreMatriz[x] = [];
		nCampos = campos.length;
		for (j = 0; j < nCampos; j++) {
			if (isNaN(campos[j])) nombreMatriz[x][j] = campos[j];
			else nombreMatriz[x][j] = campos[j];
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

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	crearTabla()	
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();

}

function EscogerOpcion(valor) {
	var hdfOpc = document.getElementById("hdfOpc");
	var spnHistorial = document.getElementById("spnHistorial");
	var txtUsuario = document.getElementById("txtUsuario");
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	if (valor) {
		hdfOpc.value = "1";
		spnHistorial.style.display = "none";
		txtUsuario.className = "form-texto validar";
		txtUsuario.readOnly = false;
		txtUsuario.style.pointerEvents = "auto";
		txtUsuario.disabled = false;
		txtNombre.onblur = txtApPaterno.onblur = txtApMaterno.onblur = function () {
			generarUsuario();
		}
	}
	else {
		hdfOpc.value = "2";
		spnHistorial.style.display = "";
		txtUsuario.className = "lectura";
		txtUsuario.readOnly = true;
		txtUsuario.style.pointerEvents = "none";
		txtUsuario.disabled = true;
		txtNombre.onblur = txtApPaterno.onblur = txtApMaterno.onblur = null;
	}
	var txtNombre = document.getElementById("txtNombre");
	txtNombre.focus();
}



function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general tabla-corta'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='operacion(\"Agregar Usuario\");EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupUsuarios\");'></span></th>";
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
		if (j == 4) {
			contenido += "<select style='width:120px;' id='cboPerfiles' class='Combo' name='cabecera' ></select>";
		}
		else if (j == 7) {
			contenido += "<select class='Combo' name='cabecera'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option><option value='R'>REGISTRADO</option></select>";
		}
		else if (j == 6) {
			contenido += "<select class='Combo' name='cabecera'><option value=''>TODOS</option><option value='True'>AD</option><option value='False'>Propio</option></select>";
		}
		else {
			contenido += "<input style='width:120px;' type='text' class='Texto' name='cabecera'>";
		}
		contenido += "</th>";
	}
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbPerfil' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divUsuario").innerHTML = contenido;
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
				contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarUsuario(\"";
				contenido += matriz[i][0];
				contenido += "\")'></span></td>";
				for (var j = 0; j < nCampos; j++) {
					if (!(j == 1 || j == 7 || j == 8 || j == 11 || j == 12 || j == 13 || j == 14)) {
						contenido += "<td>";
						if (j == 9) {
							contenido += ((matriz[i][j]).toLowerCase() == "true" ? "AD" : "Propio");
						}
						else if (j == 10) {
							contenido += ((matriz[i][j]) == "A" ? "ACTIVO" : (matriz[i][j] == "R" ? "REGISTRADO" : "INACTIVO"));
						}
						else if (j == 6) {
							if ((matriz[i][j]) * 1 > 1) {
								contenido += "<a href='#' style='color: blue; text-decoration:underline' onclick='mostrarSucursal(";
								contenido += matriz[i][0];
								contenido += ")'>Varios</a>";
							}
							else contenido += matriz[i][8];
						}
						else if (j == 5) {
							contenido += buscarItem(matrizPerfil, 0, matriz[i][j], 1)
						}
						else {
							contenido += matriz[i][j];
						}
						contenido += "</td>";
					}
				}
				contenido += "<td style='text-align:center'><span class='Icons ";
				contenido += ((matriz[i][10] == "A" || matriz[i][10] == "R") ? "fa-trash-o" : "fa-check");
				contenido += "' onclick='limpiarFormulario();abrirPopup(";
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
	document.getElementById("tbPerfil").innerHTML = contenido;
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

function buscarItem(matrizOrigen, columnaBuscar, item, colummaMostrar) {
	var rpta = "";
	var filas = matrizOrigen.length;
	var colum = matrizOrigen[0].length;
	for (var i = 0; i < filas; i++) {
		var tmp = matrizOrigen[i][columnaBuscar];
		if (matrizOrigen[i][columnaBuscar] == item) {
			return matrizOrigen[i][colummaMostrar];
		}
	}
	return rpta;
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
	var campoFiltrado = [];
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		for (var k = 0; k < matrizIndice.length; k++) {
			if (k == 5) {
				if ((campos[6]) * 1 > 1) {
					campoFiltrado.push("Varios");
				}
				else campoFiltrado.push(campos[matrizIndice[k]]);
			} else campoFiltrado.push(campos[matrizIndice[k]]);

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
			x++;
		}
	}
	paginar(indiceActualPagina);
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

function configurarControles() {
	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		exportacion();
		var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
		this.download = "Usuarios.xls";
		this.href = window.URL.createObjectURL(formBlob);
	}

	var txtFecha = document.getElementById("txtFecNacimiento");
	txtFecha.DatePickerX.init({
		mondayFirst: true
	});
	txtFecha.readOnly = false;
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
	var btngrabar = document.getElementById("btngrabar");
	btngrabar.onclick = function () {
		if (validarUsuario()) {
			this.style.pointerEvents = "none";
			grabarForm();
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}

	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	txtNombre.onblur = txtApPaterno.onblur = txtApMaterno.onblur = function () {
		generarUsuario();
	}

	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		this.style.pointerEvents = "none";
		var valor1 = matriz[Campoeliminar][0];
		var valor2 = matriz[Campoeliminar][10];
		anular(valor1, valor2);
	}

	var cboTipoDocumento = document.getElementById("cboTipoDocumento");
	cboTipoDocumento.onchange = function () {
		var txtNroDocumento = document.getElementById("txtNroDocumento");
		txtNroDocumento.value = "";
		if (this.value == "") {
			txtNroDocumento.className = "form-texto validar lectura";
			txtNroDocumento.readOnly = true;
		} else {
			txtNroDocumento.className = "form-texto validar";
			txtNroDocumento.readOnly = false;
			txtNroDocumento.focus();
			switch (this.value) {
				case "D":
					txtNroDocumento.maxLength = 8;
					txtNroDocumento.onkeypress = function (event) {
						validarSoloNumero(event);
					}
					break;
				case "R":
					txtNroDocumento.maxLength = 11;
					txtNroDocumento.onkeypress = function (event) {
						validarSoloNumero(event);
					}
					break;
				case "P":
					txtNroDocumento.maxLength = 12;
					txtNroDocumento.onkeypress = null;
					break;
				case "X":
					txtNroDocumento.maxLength = 12;
					txtNroDocumento.onkeypress = null;
					break;
				case "N":
					txtNroDocumento.maxLength = 15;
					txtNroDocumento.onkeypress = null;
					break;
				default:
					txtNroDocumento.maxLength = 20;
					txtNroDocumento.onkeypress = null;
					break;
			}
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

function grabarForm() {

	ListaCompania = [];
	ListaSucursal = [];

	var items = document.getElementsByClassName('txtControl');

	for (var i = 0; i < items.length; i++) {
		if (items[i].checked == true) ListaCompania.push(items[i].id);
	}

	var checks = document.getElementsByClassName('txtItem');

	for (var i = 0; i < checks.length; i++) {
		var contenido = "";
		if (checks[i].checked == true) {
			for (var j = 0; j < matrizSucursal.length; j++) {
				if (checks[i].id == matrizSucursal[j][0]) {
					contenido += matrizSucursal[j][2];
					contenido += "|";
					contenido += checks[i].id;
				}
			}
			ListaSucursal.push(contenido);
		}
	}

	var txtUsuario = document.getElementById("txtUsuario");
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtFecNacimiento = document.getElementById("txtFecNacimiento");
	var cboTipoDocumento = document.getElementById("cboTipoDocumento");
	var txtNroDocumento = document.getElementById("txtNroDocumento");
	var txtCorreo = document.getElementById("txtCorreo");
    var cboPerfil = document.getElementById("cboPerfil");
    let cboTipoUsuario = document.getElementById("cboTipoUsuario");

	var frm = new FormData();

	frm.append("CodigoUsuario", txtUsuario.value);
	frm.append("Nombre", txtNombre.value);
	frm.append("ApellidoPaterno", txtApPaterno.value);
	frm.append("ApellidoMaterno", txtApMaterno.value);
	frm.append("FechaNacimiento", txtFecNacimiento.value);
	frm.append("TipoDocumentoId", cboTipoDocumento.value); //Enviar como 
	frm.append("NumeroDocumento", txtNroDocumento.value);
    frm.append("IndicadorAD", cboTipoUsuario.value=="1");  // Por defecto IncidcadorAD = 0
	frm.append("CorreoElectronico", txtCorreo.value);
	frm.append("PerfilId", cboPerfil.value);
	frm.append("Contrasena", generarClave());
	frm.append("ListaCompania", ListaCompania.join(';'));
	frm.append("ListaSucursal", ListaSucursal.join(';'));
	//frm.append("abcde", generarNumeroAzar());

	//var ss = window.parent.document.getElementById("iss").value;
	//var url = urlBase + "Administracion/grabarUsuario/?ss=" + ss;
	//$.ajax(url, "post", mostrarGrabar, frm);


	if (tituloPoup == "Agregar Usuario") {
		var UsuarioId = 0;
		var opc = 1;
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Administracion/grabarUsuario/?ss=" + ss + "&opc=" + opc + "&UsuarioId=" + UsuarioId + "&abcde=" + abcde;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
	else {
		var txtUsuarioId = document.getElementById('txtUsuarioId');
		var UsuarioId = txtUsuarioId.value;
		var opc = 2;
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Administracion/grabarUsuario/?ss=" + ss + "&opc=" + opc + "&UsuarioId=" + UsuarioId + "&abcde=" + abcde;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
}

function generarClave() {
	var numeroAzar = generarNumeroAzar();
	abcde = numeroAzar;
	var clave = CryptoJS.MD5(numeroAzar);
	return clave;
}

function generarNumeroAzar() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

function anular(id, estado) {
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Administracion/anularUsuario/?ss=" + ss + "&id=" + id + "&est=" + ((estado == "A" || estado == "R") ? "I" : "A");
	$.ajax(url, "get", mostrarGrabar);
	abrirPopup('PopupEstado');
}

function mostrarGrabar(rpta) {
	var btngrabar = document.getElementById("btngrabar");
	btngrabar.innerHTML = "Grabar";
	btngrabar.onclick = function () {
		if (validarUsuario()) {
			this.style.pointerEvents = "none";
			grabarForm();
		}
	}
	if (rpta != "") {
		var data = rpta.split("¬");
		if (data.length > 2) {
			var listas = rpta.split("¬");
			FormarMatriz(listas[0], matrizUsuario);
			FormarMatriz(listas[1], matrizCompaniaSucursal);
			FormarMatriz(listas[2], matrizPerfil);
			FormarMatriz(listas[3], matrizCompania);
			FormarMatriz(listas[4], matrizSucursal);
			FormarMatriz(listas[5], matrizTipoDocumento);

			lista = listas[0].split("¯");

			listarUsuarios();
			//crearTabla();  //Creado temporalmente para mostrar tabla
			//llenarCombo(matrizPerfil, 'cboPerfiles', '', 'TODOS');
			crearMatriz();
			mostrarMatriz(0);
			switch (data[6]) {
				case "1":
					abrirPopup('PopupUsuarios');
					mostrarlerta("Se ha agregado un nuevo registro");
					configurarOrdenacion();
					configurarControles();
					configurarFiltro();

					break;
				case "2":
					abrirPopup('PopupUsuarios');
					mostrarlerta("Se ha actualizado un registro");
					configurarOrdenacion();
					configurarControles();
					configurarFiltro();
					break;
				case "3":
					mostrarlerta("Se ha actualizado el estado de un registro");
					configurarOrdenacion();
					configurarControles();
					configurarFiltro();
					break;
			}
		}
		else {
			var btngrabar = document.getElementById("btngrabar");
			btngrabar.style.pointerEvents = "auto";
			if (data[1] == "1") {
				if (data[0] == "-1") mostrarlerta("El usuario ya existe");
				else mostrarlerta("El correo electrónico ya se encuentra registrado");
			}
			else {
				mostrarlerta("El correo electrónico ya se encuentra registrado");
			}
		}
	}
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	var span = document.getElementById('TituloPopupUsuarios');
	span.textContent = tituloPoup;
	document.getElementById('txtNombre').focus

	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function llenarCombo(matrizTabla, nombreCombo, id, primerValor) {
	var contenido = "";
	var nRegistros = matrizTabla.length;
	contenido += "<option value=''>";
	contenido += primerValor;
	contenido += "</option>";
	for (var i = 0; i < nRegistros; i++) {
		if (matrizTabla[i][0] == id) contenido += "<option selected value='" + matrizTabla[i][0] + "'>" + matrizTabla[i][1] + "</option>";
		else contenido += "<option value='" + matrizTabla[i][0] + "'>" + matrizTabla[i][1] + "</option>";
	}
	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function llenarComboInicial(matrizTabla, nombreCombo, filtrar) {
	var contenido = "";
	var nRegistros = matrizTabla.length;
	contenido = "<option value=''>TODOS</option>";
	for (var i = 0; i < nRegistros; i++) {
		contenido += "<option value='" + matrizTabla[i][0] + "'>" + matrizTabla[i][1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function crearTablaPopup(matrizTabla, cabeceraTabla, divInsercion, name) {
	var nCampos = cabeceraTabla.length;
	var contenido = "<table class='tabla-general tabla-corta' style='width:400px;'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>Sel</th>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace' data-orden='";
		contenido += 1;
		contenido += "'>";
		contenido += cabeceraTabla[j];
		contenido += "</span><br/>";
		contenido += "<input style='width:120px;' type='text'>";
		contenido += "</th>";
	}

	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb";
	contenido += name;
	contenido += "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById(divInsercion).innerHTML = contenido;
}

function mostrarMatrizPopup(id, cantidadSucursal) {

	var contenidoCompania = "";
	var contenidoSucursal = "";
	var cabeceraCompania = ["Código", "Descripción"];
	var cabeceraSucursal = ["Sucursal", "Descripción"];
	var ncabeceraCompania = cabeceraCompania.length;
	var ncabeceraSucursal = cabeceraSucursal.length;

	crearTablaPopup(matrizCompania, cabeceraCompania, "divTablaCompania", "Compania");
	crearTablaPopup(matrizSucursal, cabeceraSucursal, "divTablaSucursal", "Sucursal");

	var nRegistrosCompania = matrizCompania.length;
	var nRegistrosSucursal = matrizSucursal.length;
	var nRegistrosCompaniaSucursal = matrizCompaniaSucursal.length;

	var contador = 0;
	var infoCompanias = [];
	var infoSucursales = [];
	for (var i = 0; i < nRegistrosCompaniaSucursal; i++) {

		if (matrizCompaniaSucursal[i][0] == id) {
			infoCompanias.push(matrizCompaniaSucursal[i][1]);
			infoSucursales.push(matrizCompaniaSucursal[i][3]);
			contador++;
		}
		if (contador == cantidadSucursal) break;
	}

	if (nRegistrosCompania > 0) {
		var nCamposCompania = matrizCompania[0].length;
		var nCamposSucursal = matrizSucursal[0].length;

		var inicio = 0;
		var fin = nRegistrosCompania;
		for (var i = inicio; i < fin; i++) {
			var exito = false;

			contenidoCompania += "<tr class='FilaDatos'>";

			if (infoCompanias.indexOf(matrizCompania[i][0]) != -1) {
				contenidoCompania += "<td style='text-align:center'><input id='";
				contenidoCompania += matrizCompania[i][0];
				contenidoCompania += "' class='txtCheckbox txtControl' type='checkbox' onchange='mostrarItems(this)' checked></td>";

				for (var k = 0; k < nRegistrosSucursal; k++) {

					if (matrizSucursal[k][2] == matrizCompania[i][0]) {
						contenidoSucursal += "<tr class='FilaDatos ";
						contenidoSucursal += matrizCompania[i][0];
						contenidoSucursal += "'>";

						if (infoSucursales.indexOf(matrizSucursal[k][0]) != -1) {
							contenidoSucursal += "<td style='text-align:center'><input id='";
							contenidoSucursal += matrizSucursal[k][0];
							contenidoSucursal += "' class='txtCheckbox txtItem' type='checkbox' checked></td>";
						}
						else {
							contenidoSucursal += "<td style='text-align:center'><input id='";
							contenidoSucursal += matrizSucursal[k][0];
							contenidoSucursal += "' class ='txtCheckbox txtItem' type='checkbox'></td>";
						}

						for (var h = 0; h < nCamposSucursal; h++) {
							if (h == 2) break;
							contenidoSucursal += "<td>";
							contenidoSucursal += matrizSucursal[k][h];
							contenidoSucursal += "</td>";
						}
						contenidoSucursal += "</tr>";
					}
				}
			}
			else {
				contenidoCompania += "<td style='text-align:center'><input id='";
				contenidoCompania += matrizCompania[i][0];
				contenidoCompania += "' class='txtCheckbox txtControl' type='checkbox' onchange='mostrarItems(this)'></td>";
			}

			for (var j = 0; j < nCamposCompania; j++) {
				contenidoCompania += "<td>";
				contenidoCompania += matrizCompania[i][j];
				contenidoCompania += "</td>";
			}
			contenidoCompania += "</tr>";
		}
	}
	else {
		contenidoCompania += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenidoCompania += (ncabeceraCompania + 1).toString();
		contenidoCompania += "'>No hay datos</td></tr>";

		contenidoSucursal += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenidoSucursal += (ncabeceraSucursal + 1).toString();
		contenidoSucursal += "'>Seleccione una Compañía</td></tr>";
	}
	document.getElementById('tbCompania').innerHTML = contenidoCompania;
	document.getElementById('tbSucursal').innerHTML = contenidoSucursal;
}

function mostrarItems(elemento) {
	var contenido = '';
	var idCompania = elemento.id;
	var items = document.getElementsByClassName('txtControl');
	var nRegistros = items.length;
	var nRegistrosSucursal = matrizSucursal.length;
	var contenidoSucursal = "";
	var matrizChecked = [];
	var checks = document.getElementsByClassName('txtItem');
	if (checks.length > 0) {
		for (var i = 0; i < checks.length; i++) {
			if (checks[i].checked == true) matrizChecked.push(checks[i].id);
		}
	}
	if (nRegistros > 0) {

		for (var i = 0; i < nRegistros; i++) {

			var nCamposSucursal = matrizSucursal[0].length;

			if (items[i].checked == true) {

				for (var k = 0; k < nRegistrosSucursal; k++) {

					if (matrizSucursal[k][2] == items[i].id) {
						contenidoSucursal += "<tr class='FilaDatos ";
						contenidoSucursal += matrizCompania[i][0];
						contenidoSucursal += "'>";

						if (matrizChecked.indexOf(matrizSucursal[k][0]) == -1) {
							contenidoSucursal += "<td style='text-align:center'><input id='";
							contenidoSucursal += matrizSucursal[k][0];
							contenidoSucursal += "' class='txtCheckbox txtItem' type='checkbox'></td>";
						} else {
							contenidoSucursal += "<td style='text-align:center'><input id='";
							contenidoSucursal += matrizSucursal[k][0];
							contenidoSucursal += "' class='txtCheckbox txtItem' type='checkbox' checked></td>";
						}

						for (var h = 0; h < nCamposSucursal; h++) {
							if (h == 2) break;
							contenidoSucursal += "<td>";
							contenidoSucursal += matrizSucursal[k][h];
							contenidoSucursal += "</td>";
						}
						contenidoSucursal += "</tr>";
					}
				}
			}
		}
	}
	if (contenidoSucursal == "") {
		contenidoSucursal += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenidoSucursal += (3).toString();
		contenidoSucursal += "'>Seleccione una Compañía</td></tr>";
	}

	document.getElementById('tbSucursal').innerHTML = contenidoSucursal;

}

function mostrarUsuario(id) {
	var txtUsuarioId = document.getElementById('txtUsuarioId');
	txtUsuarioId.value = id;
	var nCampos = matrizUsuario.length;
	var campo = "";
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtFecNacimiento = document.getElementById("txtFecNacimiento");
	var cboTipoDocumento = document.getElementById("cboTipoDocumento");
	var txtNroDocumento = document.getElementById("txtNroDocumento");
	var txtCorreo = document.getElementById("txtCorreo");
	var cboPerfil = document.getElementById("cboPerfil");
	var txtUsuario = document.getElementById("txtUsuario");
	var txtEstado = document.getElementById("txtEstado");
    var hdfCd = document.getElementById("hdfCd");
    let cboTipoUsuario = document.getElementById("cboTipoUsuario");

	for (var i = 0; i < nCampos; i++) {
		campo = matrizUsuario[i][0];
		if (campo == id) {
			hdfCd.value = id;
			txtNombre.value = matrizUsuario[i][2];
			txtApPaterno.value = matrizUsuario[i][3];
			txtApMaterno.value = matrizUsuario[i][4];
			txtFecNacimiento.value = matrizUsuario[i][11];
			txtCorreo.value = matrizUsuario[i][14];
            txtUsuario.value = matrizUsuario[i][1];
            cboTipoUsuario.value = matrizUsuario[i][9]=="False"?0:1;

			txtEstado.value = (matrizUsuario[i][10] == "A" ? "ACTIVO" : (matrizUsuario[i][10] == "I" ? "INACTIVO" : "REGISTRADO"));
			operacion("Modificar Usuario");
			llenarCombo(matrizTipoDocumento, 'cboTipoDocumento', matrizUsuario[i][12], 'Seleccione');
			cboTipoDocumento.onchange();
			txtNroDocumento.value = matrizUsuario[i][13];
			llenarCombo(matrizPerfil, 'cboPerfil', matrizUsuario[i][5], 'Seleccione');
			mostrarMatrizPopup(id, matrizUsuario[i][6]);
			txtNombre.focus();
			abrirPopup('PopupUsuarios');
			break;
		}
	}
}

function mostrarSucursal(id) {
	var txtSucUsuario = document.getElementById("txtSucUsuario");
	var txtSucNombre = document.getElementById("txtSucNombres");
	var txtSucApPaterno = document.getElementById("txtSucApPaterno");
	var txtSucApMaterno = document.getElementById("txtSucApMaterno");

	txtSucUsuario.value = buscarItem(matrizUsuario, 0, id, 1);
	txtSucNombre.value = buscarItem(matrizUsuario, 0, id, 2);
	txtSucApPaterno.value = buscarItem(matrizUsuario, 0, id, 3);
	txtSucApMaterno.value = buscarItem(matrizUsuario, 0, id, 4);

	var cabeceraSucursal = ["Compañía", "Sucursal", "Descripción"];
	var campo = "";
	var nCampos = matrizSucursal[0].length;
	var contenido = "<table class='tabla-general tabla-corta' style='margin-top: 25px; width:700px;'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='text-align:center'>";
		contenido += cabeceraSucursal[j];
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbSucursales' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "</table>";
	document.getElementById('divTablaSucCompania').innerHTML = contenido;

	contenido = "";
	var contador = 0;
	var nFilas = matrizCompaniaSucursal.length;
	if (nFilas > 0) {
		for (var i = 0; i < nFilas; i++) {
			if (id == matrizCompaniaSucursal[i][0]) {
				contenido += "<tr class='FilaDatos'><td style='text-align:center'>";
				contenido += matrizCompaniaSucursal[i][2];
				contenido += "</td>";
				contenido += "<td style='text-align:center'>";
				contenido += matrizCompaniaSucursal[i][3];
				contenido += "</td>";
				contenido += "<td style='text-align:center'>";
				contenido += matrizCompaniaSucursal[i][4];
				contenido += "</td></tr>";
				contador++;
			}

			if (contador == buscarItem(matrizUsuario, 0, id, 6)) break;
		}
	}
	else {
		var ncabeceraSucursal = cabeceraSucursal.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (ncabeceraSucursal).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById('tbSucursales').innerHTML = contenido;

	abrirPopup('PopupSucursales');
}

function limpiarFormulario() {
	var btngrabar = document.getElementById("btngrabar")
	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabar.style.pointerEvents = "auto";
	btngrabarEstado.style.pointerEvents = "auto";
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtFecNacimiento = document.getElementById("txtFecNacimiento");
	var txtNroDocumento = document.getElementById("txtNroDocumento");
	var txtCorreo = document.getElementById("txtCorreo");
	var txtUsuario = document.getElementById("txtUsuario");
	var txtEstado = document.getElementById("txtEstado");
	txtNombre.value = '';
	txtApPaterno.value = '';
	txtApMaterno.value = '';
	txtFecNacimiento.value = '';
	txtNroDocumento.value = '';
	txtNroDocumento.className = "form-texto validar lectura";
	txtNroDocumento.readOnly = true;
	txtCorreo.value = '';
	txtUsuario.value = '';
	txtEstado.value = 'ACTIVO';

	llenarCombo(matrizTipoDocumento, 'cboTipoDocumento', '', 'Seleccione');
	llenarCombo(matrizPerfil, 'cboPerfil', '', 'Seleccione');

	var check = document.getElementsByClassName('txtCheckbox');
	var n = check.length;
	for (var i = 0; i < n; i++) {
		check[i].checked = false;
	}

	var cabeceraCompania = ["Código", "Descripción"];
	var cabeceraSucursal = ["Sucursal", "Descripción"];
	var ncabeceraCompania = cabeceraCompania.length;
	var ncabeceraSucursal = cabeceraSucursal.length;

	crearTablaPopup(matrizCompania, cabeceraCompania, "divTablaCompania", "Compania");
	crearTablaPopup(matrizSucursal, cabeceraSucursal, "divTablaSucursal", "Sucursal");

	/* Mostrar Tabla Inicial */

	var nRegistrosCompania = matrizCompania.length;
	var nRegistrosSucursal = matrizSucursal.length;

	var contenidoCompania = "";
	var contenidoSucursal = "";

	if (nRegistrosCompania > 0) {

		var nCamposCompania = matrizCompania[0].length;
		var nCamposSucursal = matrizSucursal[0].length;

		for (var i = 0; i < nRegistrosCompania; i++) {
			contenidoCompania += "<tr class='FilaDatos'>";
			contenidoCompania += "<td style='text-align:center'><input id='";
			contenidoCompania += matrizCompania[i][0];
			contenidoCompania += "' class='txtCheckbox txtControl' type='checkbox' onchange='mostrarItems(this)'></td>";
			for (var j = 0; j < nCamposCompania; j++) {
				contenidoCompania += "<td>";
				contenidoCompania += matrizCompania[i][j];
				contenidoCompania += "</td>";
			}
			contenidoCompania += "</tr>";
		}
	}
	else {
		contenidoCompania += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenidoCompania += (ncabeceraCompania + 1).toString();
		contenidoCompania += "'>No hay datos</td></tr>";

		contenidoSucursal += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenidoSucursal += (ncabeceraSucursal + 1).toString();
		contenidoSucursal += "'>Seleccione una Compañía</td></tr>";
	}

	document.getElementById('tbCompania').innerHTML = contenidoCompania;
	document.getElementById('tbSucursal').innerHTML = contenidoSucursal;

	/*  */

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

function operacion(titulo) {
	tituloPoup = titulo;
}


/*************** Validaciones ****************/

function validarUsuario() {

	//var txtDescripcion = document.getElementById("txtDescripcion");

	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtFecNacimiento = document.getElementById("txtFecNacimiento");
	var cboTipoDocumento = document.getElementById("cboTipoDocumento");
	var txtNroDocumento = document.getElementById("txtNroDocumento");
	var txtCorreo = document.getElementById("txtCorreo");
	var cboPerfil = document.getElementById("cboPerfil");
	var txtUsuario = document.getElementById("txtUsuario");
	var txtEstado = document.getElementById("txtEstado");

	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeNombre = validarTexto(txtNombre.id, "nombre", true);
	if (mensajeNombre != "") {
		mensajeValidacion[txtNombre.getAttribute("data-secuencia")] = mensajeNombre;
		txtNombre.className += " error";
	}

	var mensajeApPaterno = validarTexto(txtApPaterno.id, "apellido paterno", true);
	if (mensajeApPaterno != "") {
		mensajeValidacion[txtApPaterno.getAttribute("data-secuencia")] = mensajeApPaterno;
		txtApPaterno.className += " error";
	}

	var mensajeApMaterno = validarTexto(txtApMaterno.id, "apellido materno", true);
	if (mensajeApMaterno != "") {
		mensajeValidacion[txtApMaterno.getAttribute("data-secuencia")] = mensajeApMaterno;
		txtApMaterno.className += " error";
	}

	var mensajeFecha = validarFecha(txtFecNacimiento.id, "fecha nacimiento", true);
	if (mensajeFecha != "") {
		mensajeValidacion[txtFecNacimiento.getAttribute("data-secuencia")] = mensajeFecha;
		txtFecNacimiento.className += " error";
	}

	var mensajeTipoDocumento = validarCombo(cboTipoDocumento.id, "tipo de documento", true);
	if (mensajeTipoDocumento != "") {
		mensajeValidacion[cboTipoDocumento.getAttribute("data-secuencia")] = mensajeTipoDocumento;
		cboTipoDocumento.className += " error";
	}

	var mensajeNroDocumento = validarTexto(txtNroDocumento.id, "numero de documento", true);
	if (mensajeNroDocumento != "") {
		mensajeValidacion[txtNroDocumento.getAttribute("data-secuencia")] = mensajeNroDocumento;
		txtNroDocumento.className += " error";
	}

	var mensajeCorreo = validarEmail(txtCorreo.id, "correo electrónico", true);
	if (mensajeCorreo != "") {
		mensajeValidacion[txtCorreo.getAttribute("data-secuencia")] = mensajeCorreo;
		txtCorreo.className += " error";
	}

	var mensajePerfil = validarCombo(cboPerfil.id, "perfil", true);
	if (mensajePerfil != "") {
		mensajeValidacion[cboPerfil.getAttribute("data-secuencia")] = mensajePerfil;
		cboPerfil.className += " error";
	}

	var mensajeUsuario = validarTexto(txtUsuario.id, "usuario", true);
	if (mensajeUsuario != "") {
		mensajeValidacion[txtUsuario.getAttribute("data-secuencia")] = mensajeUsuario;
		txtUsuario.className += " error";
	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		var companias = document.getElementsByClassName('txtControl');
		var sucursales = document.getElementsByClassName('txtItem');
		var nCompanias = companias.length;
		var nSucursales = sucursales.length;
		var companiasAsociadas = [];
		var contadorCompaniasSeleccionadas = 0;

		if (nSucursales > 0) {
			for (var i = 0; i < nSucursales; i++) {
				if (sucursales[i].checked == true) {
					if (companiasAsociadas.length == 0) {
						companiasAsociadas.push(buscarItem(matrizSucursal, 0, sucursales[i].id, 2))
					}
					else {
						for (var j = 0; j < companiasAsociadas.length; j++) {
							var asociado = buscarItem(matrizSucursal, 0, sucursales[i].id, 2)
							if (companiasAsociadas[j] != asociado) {
								companiasAsociadas.push(buscarItem(matrizSucursal, 0, sucursales[i].id, 2));
								break;
							}
						}

					}
				}
			}

			var totalCompaniasAsociadas = companiasAsociadas.length;
			for (var k = 0; k < nCompanias; k++) {
				if (companias[k].checked == true) contadorCompaniasSeleccionadas++;
			}
		} else {
			mostrarlerta('Existe compañía sin sucursal asociada');
			return false;
		}
		if (totalCompaniasAsociadas == contadorCompaniasSeleccionadas) {
			return true;
		}
		else {
			mostrarlerta('Existe compañía sin sucursal asociada');
			return false;
		}
	}

}

function mostrarlerta(mensaje, opcion) {
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

function validarEmail(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
				return 'Ingrese ' + Mensaje.toLowerCase();
			}
		}
		if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
			if (Texto.value.match(/([\<])([^\>]{1,})*([\>])/i) != null) {
				return 'El ' + Mensaje + ' no debe contener etiquetas html: <etiqueta>';
			}
			if (Texto.value.match(/[,;]+/) != null) {
				return 'El ' + Mensaje + ' no debe contener , o ;';
			}
			var patron = /^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/i;
			if (!patron.test(Texto.value)) {
				return 'El ' + Mensaje + ' es inválido';
			}
		}
	}
	return "";
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

function justNumbers(e) {
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46))
		return true;
	return /\d/.test(String.fromCharCode(keynum));
}

/*************** FIN (Validaciones) ****************/


/********** Exportacion **********/

function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 60px' align='center'>Id</td>";
	cabecera += "<td style='width: 150px' align='center'>Nombre</td>";
	cabecera += "<td style='width: 150px' align='center'>Apellido Paterno</td>";
	cabecera += "<td style='width: 150px' align='center'>Apellido Materno</td>";
	cabecera += "<td style='width: 150px' align='center'>Perfil</td>";
	cabecera += "<td style='width: 200px' align='center'>Sucursal</td>";
	cabecera += "<td style='width: 100px' align='center'>Tipo Usuario</td>";
	cabecera += "<td style='width: 90px' align='center'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	textoExportar = [];
	excelExportar = crearCabeceraExportar();
	if (nRegistros > 0) {
		for (i = 0; i < nRegistros; i++) {
			contenido.push("<tr>");
			for (var j = 0; j < nCampos; j++) {
				if (!(j == 1 || j == 7 || j == 8 || j == 11 || j == 12 || j == 13 || j == 14)) {
					if (j == 5) {
						contenido.push("<td>" + (buscarItem(matrizPerfil, 0, matriz[i][j], 1)) + "</td>")
					} else if (j == 6) {
						if ((matriz[i][j]) * 1 > 1) {
							contenido.push("<td>Varios</td>")
						}
						else contenido.push("<td>" + matriz[i][8] + "</td>");
					} else if (j == 9) {
						contenido.push("<td>" + ((matriz[i][j]).toLowerCase() == "true" ? "AD" : "Propio") + "</td>");
					} else if (j == 10) {
						contenido.push("<td align='center'>" + ((matriz[i][j]) == "A" ? "ACTIVO" : (matriz[i][j] == "R" ? "REGISTRADO" : "INACTIVO")) + "</td>")
					} else {
						contenido.push("<td>" + matriz[i][j] + "</td>");
					}
					if (j == 5) {
						textoExportar.push((buscarItem(matrizPerfil, 0, matriz[i][j], 1)) + ", ");
					} else if (j == 6) {
						if ((matriz[i][j]) * 1 > 1) {
							textoExportar.push("Varios, ")
						}
						else textoExportar.push(matriz[i][8] + ", ");
					} else if (j == 9) {
						textoExportar.push(((matriz[i][j]).toLowerCase() == "true" ? "AD" : "Propio") + ", ");
					} else if (j == 10) {
						textoExportar.push((matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + ", ")
					} else {
						textoExportar.push(matriz[i][j] + ", ");
					}


					//if (j < (nCampos - 1)) {
					//    textoExportar.push(matriz[i][j] + ", ");
					//}
					//else {
					//    if (j == (nCampos - 1)) textoExportar.push((matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + ", ");
					//    else textoExportar.push(matriz[i][j] + ", ");
					//}
				}
			}
			contenido.push("</tr>");
			textoExportar.push("\r\n");
		}
		textoExportar = textoExportar.join("");
		excelExportar += contenido.join("") + "</table></html>";
	} else {
		mostraralzerta("No hay datos a Exportar");
	}
}

/******** FIN (Exportacion) **********/



function generarUsuario() {
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtUsuario = document.getElementById("txtUsuario");
	if (txtNombre.value.length > 0 && txtApPaterno.value.length > 0 && txtApMaterno.value.length > 0) {
		txtUsuario.value = txtNombre.value.charAt(0) + txtApPaterno.value + txtApMaterno.value.charAt(0);
	}
	else if (txtNombre.value.length > 0 && txtApPaterno.value.length > 0) {
		txtUsuario.value = txtNombre.value.charAt(0) + txtApPaterno.value;
	}
	else if (txtNombre.value.length > 0 && txtApMaterno.value.length > 0) {
		txtUsuario.value = txtNombre.value.charAt(0) + txtApMaterno.value;
	}
	else {
		txtUsuario.value = "";
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