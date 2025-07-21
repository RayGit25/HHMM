var lista = [];
var matriz = [];
var cabeceras = ["Tipo de Atención", "Código OA", "Fecha Inicio OA", "Fecha de Proced.", "Tipo de Servicio", "Prestación", "Cantidad", "Precio Venta", "Importe", "Estado Prestación",
				"Estado OA", "ID OA", "Linea OA", "Médico", "Especialidad", "Paciente","Tipo Paciente", "Fecha Hora Crea.", "Fecha Hora Modif.", "Fecha Hora Atend.", "Fecha Hora Term.", "IndInforme", "IndAnamnesis",
				"IndCierreEME", "IndHonorario", "IdTransaccion","Transacción Caja","Estado Hospitalización", "Detalle Hospitalización", "IdPlanilla", "EstadoPlanilla", "Tipo Observación", "Patron", "Observación"];
var anchos = [145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145, 145,145,145];
var matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var excelExportar;
var urlBase = "";
var sucursalId = "";
var listaTipoAtencion = [];
var listaTipoServicio = [];
var mensajeValidacion = [];
var NombreControl = "";
var ss = "";
var TotalX = 0;
window.onload = function () {
	var pos1 = window.location.href.indexOf("Control");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
	var cboMes = document.getElementById("cboMes");
	cboMes.selectedIndex = window.parent.document.getElementById("hmes").value;
	var hoy = new Date();
	var dd = hoy.getDate();
	var mm = hoy.getMonth() + 1;
	var yyyy = hoy.getFullYear();
	hoy = dd + '/' + mm + '/' + yyyy;
	var txtFechaInicio = document.getElementById("txtFechaInicio");
	txtFechaInicio.value = '01/' + mm + '/' + yyyy;
	txtFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaInicio.readOnly = false;
	txtFechaInicio.value = formatearfecha(txtFechaInicio.value);

	var txtFechaFin = document.getElementById("txtFechaFin");
	txtFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtFechaFin.readOnly = false;
	txtFechaFin.value = dd + '/' + mm + '/' + yyyy;
	txtFechaFin.value = formatearfecha(txtFechaFin.value);
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		if (validarReporte()) {
			NombreControl = this.innerHTML + "|" + this.id.toString();
			var ddlReporte = document.getElementById("ddlReporte").value;
			var anio = document.getElementById("txtAnio").value;
			var mes = document.getElementById("cboMes").selectedIndex;
			var strDatos = "";
			strDatos = (txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value) + "|" + (txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value) + "|" + mes + "|" + anio;
			var url = urlBase + "Control/ListarReporte/?ss=" + ss + "&ti=" + ddlReporte + "&su=" + sucursalId;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}
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


	cboMes.onchange = function () {
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		var txtFechaFin = document.getElementById("txtFechaFin");
		var txtAnio = document.getElementById("txtAnio").value;
		if (this.value != "0" && isNaN(txtAnio) == false && (txtAnio * 1) > 1900) {
			var date = new Date(), y = txtAnio, m = ((this.value * 1) - 1);
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			txtFechaInicio.value = convertirFecha(firstDay);
			txtFechaFin.value = convertirFecha(lastDay);
		}
		else {
			txtFechaInicio.value = "";
			txtFechaFin.value = "";
		}
	}
	var txtAnio = document.getElementById("txtAnio");
	txtAnio.onkeyup = function () {
		var cboMes = document.getElementById("cboMes");
		var txtFechaInicio = document.getElementById("txtFechaInicio");
		var txtFechaFin = document.getElementById("txtFechaFin");
		if (cboMes.value != "0" && isNaN(this.value) == false && (this.value * 1) > 1900) {
			var date = new Date(), y = this.value, m = ((cboMes.value * 1) - 1);
			var firstDay = new Date(y, m, 1);
			var lastDay = new Date(y, m + 1, 0);
			txtFechaInicio.value = convertirFecha(firstDay);
			txtFechaFin.value = convertirFecha(lastDay);
		}
		else {
			txtFechaInicio.value = "";
			txtFechaFin.value = "";
		}
	}
	cboMes.onchange();
}

function convertirFecha(objeto) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	var d = new Date(objeto);
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	var datos = NombreControl.split("|");
	var control = document.getElementById(datos[1]);
	control.innerHTML = datos[0];
	NombreControl = "";
	control.onclick = function () {
		if (validarReporte()) {
			NombreControl = this.innerHTML + "|" + this.id.toString();
			var ddlReporte = document.getElementById("ddlReporte").value;

			var anio = document.getElementById("txtAnio").value;
			var mes = document.getElementById("cboMes").selectedIndex;
			var strDatos = "";
			strDatos = (txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value) + "|" + (txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value) + "|" + mes + "|" + anio;
			var url = urlBase + "Control/ListarReporte/?ss=" + ss + "&ti=" + ddlReporte + "&su=" + sucursalId;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}
	crearTabla();
	configurarOrdenacion();
	configurarControles();
	configurarFiltro();
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


function listarTodo(rpta) {
	configuracionInicial();
	if (rpta != "") {
		document.getElementsByClassName("cocultar")[0].style.display = "";
		document.getElementsByClassName("cocultar")[1].style.display = "";
		var datos = rpta.split("¬")
		listaTipoAtencion = datos[0].split("¯");
		listaTipoServicio = datos[1].split("¯");
		lista = datos[2].split("¯");
		if (datos[3] != "") {
			document.getElementById("spnFecha").innerHTML = datos[3];
		}
		if (lista != "") {
			var ddlReporte=document.getElementById("ddlReporte").value;
			var docultar=document.getElementsByClassName("docultar");
			if (ddlReporte == "7") {
				for (var x = 0; x < docultar.length; x++) {
					docultar[x].style.display = "";
				}
			}
			else {
				for (var x = 0; x < docultar.length; x++) {
					docultar[x].style.display = "none";
				}
			}
			listarReporte();
			llenarCombo(listaTipoAtencion, "ddlTipoAtencion");
			llenarCombo(listaTipoServicio, "ddlTipoServicio");
			if (ddlReporte == "7") {
				configurarFiltro();
				document.getElementById("ddlTipoObservacion").selectedIndex = "1";
				document.getElementById("ddlTipoObservacion").onchange();
			}
		}
		else {
			var spnTotal = document.getElementById("spnTotal");
			spnTotal.innerHTML = "";
			var nCabeceras = cabeceras.length;
			var contenido = "";
			contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
			contenido += nCabeceras.toString();
			contenido += "'>No hay datos</td></tr>";
			document.getElementById("tbReporte").innerHTML = contenido;
		}
	}
	else {
		var spnTotal = document.getElementById("spnTotal");
		spnTotal.innerHTML = "";
		var nCabeceras = cabeceras.length;
		var contenido = "";
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += nCabeceras.toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbReporte").innerHTML = contenido;
	}
	document.getElementById("divReporte").style.display = "";
}


function listarReporte(irUltimaPagina) {
	crearMatriz();
	var spnTotal = document.getElementById("spnTotal");
	if (matriz.length > 0) {
		spnTotal.innerHTML = matriz.length;
	}


	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		paginar(-1);
		indiceActualBloque = 0;
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



function crearTabla() {
	var ddlReporte = document.getElementById("ddlReporte").value;
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	for (var j = 0; j < nCampos; j++) {
		if (j == 31 || j == 32 || j == 33) {
			contenido += "<th class='docultar' style='width:";
		}
		else {
			contenido += "<th style='width:";
		}
		contenido += anchos[j];
		contenido += "px'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace' data-orden='";
		contenido += matrizIndice[j]
		contenido += "'>";
		contenido += cabeceras[j];
		contenido += "</span><br/>";
		if (j == 0 || j == 4) {
			if (j == 0) contenido += "<select class='Combo' name='cabecera' style='width:90%' id='ddlTipoAtencion'></select>";
			else contenido += "<select class='Combo' name='cabecera' style='width:90%' id='ddlTipoServicio'></select>";
		}
		else {
			if (j == 31) {
				contenido += "<select class='Combo' name='cabecera' style='width:90%' id='ddlTipoObservacion'><option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='I'>INFORMATIVO</option></select>";
			}
			else {
				contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
			}
		}
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbReporte' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += nCampos.toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divReporte").innerHTML = contenido;
}

function crearMatriz() {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	matriz = [];
	matrizAnios = [];
	TotalX = 0;
	for (i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		matriz[x] = [];
		nCampos = campos.length;
		for (j = 0; j < nCampos; j++) {
			if (j == 2 || j == 3 || j == 17 || j == 18 || j == 19||j==20) {
				if (campos[j].indexOf("1900") > -1) {
					matriz[x][j] = "";
				}
				else {
					matriz[x][j] = campos[j];
				}
			}
			else {
				matriz[x][j] = campos[j];
				if (j == 8) {
					TotalX = TotalX + (matriz[x][j] * 1);
				}
			}
		}
		x++;
	}

}

function mostrarMatriz(indicePagina) {
	indiceActualPagina = indicePagina;
	var ddlReporte = document.getElementById("ddlReporte").value;
	var contenido = "";
	Campoeliminar = "";
	var n = matriz.length;
	var valorFor;
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		//var totalx = 0;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				for (var j = 0; j < nCampos; j++) {
					switch (j) {
						case 0:
							contenido += "<td>";
							for (var x = 0; x < listaTipoAtencion.length; x++) {
								valorFor = listaTipoAtencion[x].split("¦");
								if (matriz[i][j] == valorFor[0]) {
									contenido += valorFor[1];
									break;
								}
							}
							contenido += "</td>";
							break;
						case 4:
							contenido += "<td>";
							for (var x = 0; x < listaTipoServicio.length; x++) {
								valorFor = listaTipoServicio[x].split("¦");
								if (matriz[i][j] == valorFor[0]) {
									contenido += valorFor[1];
									break;
								}
							}
							contenido += "</td>";
							break;
						case 6:
						case 7:
						case 8:
							contenido += "<td style='text-align:right'>";
							contenido += (matriz[i][j] * 1).toFixed(2);
							contenido += "</td>";
							break;
						case 31:
						case 32:
						case 33:
							if (ddlReporte == "7") {
								contenido += "<td>";
								if (j == 31) contenido += (matriz[i][j]=="P"?"PENDIENTE":"INFORMATIVO");
								else contenido += matriz[i][j];
								contenido += "</td>";
							}
							break;
						default:
							contenido += "<td>";
							contenido += matriz[i][j];
							contenido += "</td>";
							break;
					}

					
				}
				contenido += "</tr>";
			}
			else break;
		}
		contenido += "<tr><td colspan='8' style='text-align:right'><b>Total</b></td><td style='text-align:right'><b>" + formatearNumero(TotalX) + "</b></td  colspan='" + (nCampos - 9) + "'><td></td></tr>";
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (ddlReporte == "6" ? nCabeceras.toString() : (nCabeceras - 2).toString());
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbReporte").innerHTML = contenido;
	crearPaginas();
	if (esBloque) {
		crearPaginas(elemento);
	}
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
	var valX = ((indiceOrden == "2" || indiceOrden == "3") ? fechaUTC(x[indiceOrden]) : (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]));
	var valY = ((indiceOrden == "2" || indiceOrden == "3") ? fechaUTC(y[indiceOrden]) : (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]));
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
	TotalX = 0;
	var nFiltrados = matrizIndice.length
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		for (var k = 0; k < nFiltrados; k++) {
			campoFiltrado.push(campos[matrizIndice[k]]);
		}
		for (var j = 0 ; j < nCabeceras; j++) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "Texto") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				//if (j == 2 || j == 3) {
				if (j == 2 || j == 3 || j == 16 || j == 17 || j == 18 || j == 19) {
					//if (campos[j] == "01/01/1900") {
					//	matriz[x][j] = "";
					//}
					//else {
					//	matriz[x][j] = campos[j];
					//}
					if (campos[j].indexOf("1900") > -1) {
						matriz[x][j] = "";
					}
					else {
						matriz[x][j] = campos[j];
					}
				}
				else {
					matriz[x][j] = campos[j];
					if (j == 8) {
						TotalX = TotalX + (matriz[x][j] * 1);
					}
				}

			}
			x++;
		}
	}

	var spnTotal = document.getElementById("spnTotal");
	//if (matriz.length > 0) {
	spnTotal.innerHTML = matriz.length;
	//}
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



function configurarControles() {
	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		if (matriz.length > 0) {
			exportacionDetalle(this);
		}
	}
}



function llenarCombo(lista, nombreCombo) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	contenido = "<option value=''>Todos</option>";
	for (var x = 0; x < n; x++) {
		campos = lista[x].split("¦");
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
}


function crearCabeceraExportar() {
	var ddlReporte = document.getElementById("ddlReporte");
	var opcion = ddlReporte.options[ddlReporte.selectedIndex].text
	var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
	cabecera += "<tr></tr>";
	cabecera += "<tr><td style='width:200px'>Reporte</td><td style='text-align:left' colspan='4'>";
	cabecera += opcion;
	cabecera += "</td></tr><tr></tr>";
	cabecera += "<tr><td style='width:200px'>Cantidad Registros</td><td style='text-align:left' colspan='4'>";
	cabecera += matriz.length;
	cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>"
	cabecera += "<td style='width: 150px' align='center'>Tipo de Atención</td>";
	cabecera += "<td style='width: 130px' align='center'>Código OA</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Inicio OA</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha de Procedimiento</td>";
	cabecera += "<td style='width: 200px' align='center'>Tipo de Servicio</td>";
	cabecera += "<td style='width: 300px' align='center'>Prestación</td>";
	cabecera += "<td style='width: 100px' align='center'>Cantidad</td>";
	cabecera += "<td style='width: 100px' align='center'>Precio Venta</td>";
	cabecera += "<td style='width: 100px' align='center'>Importe</td>";
	cabecera += "<td style='width: 150px' align='center'>Estado Prestación</td>";
	cabecera += "<td style='width: 150px' align='center'>Estado OA</td>";
	cabecera += "<td style='width: 130px' align='center'>ID OA</td>";
	cabecera += "<td style='width: 130px' align='center'>Linea OA</td>";
	cabecera += "<td style='width: 300px' align='center'>Médico</td>";
	cabecera += "<td style='width: 300px' align='center'>Especialidad</td>";
	cabecera += "<td style='width: 300px' align='center'>Paciente</td>";
	cabecera += "<td style='width: 300px' align='center'>Tipo Paciente</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Hora Creación</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Hora Modificación</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Hora Atendido</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Hora Terminado</td>";
	cabecera += "<td style='width: 130px' align='center'>IndInforme</td>";
	cabecera += "<td style='width: 130px' align='center'>IndAnamnesis</td>";
	cabecera += "<td style='width: 130px' align='center'>IndCierreEME</td>";
	cabecera += "<td style='width: 130px' align='center'>IndHonorario</td>";
	cabecera += "<td style='width: 130px' align='center'>ID Transacción</td>";
	cabecera += "<td style='width: 130px' align='center'>Transacción caja</td>";
	cabecera += "<td style='width: 130px' align='center'>Estado Hospitalización</td>";
	cabecera += "<td style='width: 130px' align='center'>Detalle Hospitalización</td>";
	cabecera += "<td style='width: 130px' align='center'>ID Planilla</td>";
	cabecera += "<td style='width: 150px' align='center'>Estado Planilla</td>";
	if (ddlReporte.value == "7") {
		cabecera += "<td style='width: 150px' align='center'>Tipo Observación</td>";
		cabecera += "<td style='width: 150px' align='center'>Patron</td>";
		cabecera += "<td style='width: 150px' align='center'>Observación</td>";
	}
	cabecera += "</tr>";
	return cabecera;
}

function exportacionDetalle(objeto) {
	var ddlReporte = document.getElementById("ddlReporte").value;
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var valorFor;
	//var totalx = 0;
	if (nRegistros > 0) {
		excelExportar = crearCabeceraExportar();
		for (i = 0; i < nRegistros; i++) {
			contenido.push("<tr>");
			for (var j = 0; j < nCampos ; j++) {
				switch (j) {
					case 0:
						for (var x = 0; x < listaTipoAtencion.length; x++) {
							valorFor = listaTipoAtencion[x].split("¦");
							if (matriz[i][j] == valorFor[0]) {
								contenido.push("<td>" + valorFor[1] + "</td>");
								break;
							}
						}
						break;
					case 1:
						contenido.push("<td style='mso-number-format:\"\@\"'>" +  matriz[i][j] + "</td>");						
						break;
					case 4:
						for (var x = 0; x < listaTipoServicio.length; x++) {
							valorFor = listaTipoServicio[x].split("¦");
							if (matriz[i][j] == valorFor[0]) {
								contenido.push("<td>" + valorFor[1] + "</td>");
								break;
							}
						}
						break;
					case 31:
					case 32:
					case 33:
						if (ddlReporte == "7") {
							if (j == 31) contenido.push("<td>" + (matriz[i][j] == "P" ? "PENDIENTE" : "INFORMATIVO") + "</td>");
							else contenido.push("<td>" + matriz[i][j] + "</td>");

						}
						break;
					default:
						contenido.push("<td>" + matriz[i][j] + "</td>");
						break;
				}

			}
			contenido.push("</tr>");
		}

		//contenido.push("<tr><td colspan='6' style='text-align:center'>Total</td><td align='right'><b>=Suma(G5:G" + (nRegistros + 4) + ")</b></td><td></td><td align='right'><b>=MONEDA(Suma(I5:I" + (nRegistros + 4) + "))</b></td></tr>");
		//contenido.push("<tr><td colspan='8' style='text-align:right'><b>Total</b></td><td align='right'><b>=MONEDA(Suma(I5:I" + (nRegistros + 4) + "))</b></td></tr>");
		//contenido.push("<tr><td colspan='8' style='text-align:right'><b>Total</b></td><td align='right'><b>=MONEDA(Suma(I5:I" + (nRegistros + 4) + "))</b></td></tr>");
		contenido.push("<tr><td colspan='8' style='text-align:right'><b>Total</b></td><td align='right'><b>" + formatearNumero(TotalX) + "</b></td></tr>");

		excelExportar += contenido.join("") + "</table></html>";
		var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
		objeto.download = "Reporte.xls";
		objeto.href = window.URL.createObjectURL(formBlob);
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

function validarReporte() {

	var txtAnio = document.getElementById("txtAnio");
	var cboMes = document.getElementById("cboMes");
	var txtFechaInicio = document.getElementById("txtFechaInicio");
	var txtFechaFin = document.getElementById("txtFechaFin");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeMes = validarCombo(cboMes.id, "Mes", true);
	if (mensajeMes != "") {
		mensajeValidacion[cboMes.getAttribute("data-secuencia")] = mensajeMes;
		cboMes.className += " error";
		cboMes.focus();
		return false;
	}

	var mensajeAnio = validarTexto(txtAnio.id, "Año", true);
	if (mensajeAnio != "") {
		mensajeValidacion[txtAnio.getAttribute("data-secuencia")] = mensajeAnio;
		txtAnio.className += " error";
		txtAnio.focus();
		return false;
	}

	var mensajeFechaInicio = validarFecha(txtFechaInicio.id, "fecha", true);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtFechaInicio.className += " error";
	}
	var mensajeFechaFin = validarFecha(txtFechaFin.id, "fecha", true);
	if (mensajeFechaFin != "") {
		mensajeValidacion[txtFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
		txtFechaFin.className += " error";
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

		if (Texto.id == "txtFechaInicio") {
			var txtFechaFin = document.getElementById("txtFechaFin");
			var Inicio = fechaUTC(Texto.value);
			var Fin = fechaUTC(txtFechaFin.value);
			if (Inicio > Fin) {
				return 'La fecha de inicio no puede ser mayor a la de fin';
			}
		}
		else {
			var txtFechaInicio = document.getElementById("txtFechaInicio");
			var Fin = fechaUTC(Texto.value);
			var Inicio = fechaUTC(txtFechaInicio.value);
			if (Fin < Inicio) {
				return 'La fecha de fin no puede ser menor a la de inicio';
			}
		}
	}
	return "";
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

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
}