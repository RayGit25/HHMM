var lista = [];
var listaOrden1 = [];
var listaOrden2 = [];
var listaOrden3 = [];
var listaGeneral = [];
var listaServicio = [];
var listaEspecialidad = [];
var listaTipoAtencion = [];
var matriz = [];
var cabeceras = ["Orden Atención", "Línea Orden", "Código OA", "T. Comp.", "Prestación", "Especialidad", "Servicio", "Tipo Atención", "Médico", "Médico Secundario", "F. Atención", "Fecha Inicio", "Cantidad", "P.U. Prest.", "Mto. Prest.", "Cos. Prest.", "Tipo Proceso", "Estado Pres.", "ObservacionTX", "IdTransaccion", "Desc. EstadoTX", "Almacen Destino", "Línea Familia", "Familia", "F. Migración", "F. Creación", "U. Creación", "F. Modificación", "Usuario", "Nro. Proceso", "Ind. Modificado"];
var anchos = [20, 15, 15, 10, 50, 50, 30, 40, 50, 50, 30, 30, 10, 15, 15, 15, 15, 20, 30, 20, 20, 20, 20, 20, 30, 12, 12, 20, 15, 18, 18];
var matrizIndice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
var registrosPagina = 7;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var idCuenta = -1;
var Campoeliminar = "";
var sucursalId;
var sucursal, vAnio, vMes, aFiltro = [];
var matrizChecks = [];
var matrizChecksPos = [];
var matrizSeguridad = [];
var matrizmedicosfiltrar = [];
var opcionfiltro = -1, OpcionMedico = -1;
var strAct = "";
var PersonaPrincipal1 = "0", PersonaPrincipal2 = "0";
var matrizMensaje = [];
window.onload = function () {
	matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
	if (matrizSeguridad.length > 0) {
		if (((matrizSeguridad[0].split("¦")[2] * 1) != 1)) {
			removeSeguridad("tabOA1");
		}
		if (((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
			removeSeguridad("tabOA2");
		}
		if (((matrizSeguridad[2].split("¦")[2] * 1) != 1)) {
			removeSeguridad("tabOA3");
		}
	}
	var fecha = new Date();
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	var pos1 = window.location.href.indexOf("Mantenimiento");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	document.getElementById("cboMes").value = fecha.getMonth() + 1;
	document.getElementById("txtAnio").value = fecha.getFullYear();
	var url = urlBase + "Mantenimiento/obtenerOrdenAtencionListas/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarCombos);
}

function removeSeguridad(id) {
	var elem = document.getElementById(id);
	return elem.parentNode.removeChild(elem);
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
	var TituloPopupCuentaProvision = document.getElementById("TituloPopupCuentaProvision");
	var hdfOpc = document.getElementById("hdfOpc");
	var spnHistorial = document.getElementById("spnHistorial");
	if (valor) {
		hdfOpc.value = "1";
		TituloPopupCuentaProvision.innerHTML = "AGREGAR CUENTAS CONTABLES DE PROVISIÓN Y PAGO";
		spnHistorial.style.display = "none";
	}
	else {
		hdfOpc.value = "2";
		TituloPopupCuentaProvision.innerHTML = "MODIFICAR CUENTAS CONTABLES DE PROVISIÓN Y PAGO";
		spnHistorial.style.display = "";
	}
}

function listarCombos(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		listaTipoAtencion = data[0].split("¯");
		listaServicio = data[1].split("¯");
		listaEspecialidad = data[2].split("¯");
		var listaConsultaExterna = data[3].split("¯");
		var listaConsultaProcedimiento = data[4].split("¯");
		var listaMensaje = data[5].split("¬");

		for (var i = 0; i < listaMensaje.length; i++) {
			var m = listaMensaje[i].split("¦");
			matrizMensaje.push(m[1]);
		}
		document.getElementById("divCabecera").textContent = matrizMensaje[0];
		llenarCombo(listaEspecialidad, "ddlEspecialidad", true);
		llenarCombo(listaEspecialidad, "ddlMasEspecialidad", true);
		llenarCombo(listaTipoAtencion, "ddlTipoAtencion", true);
		llenarCombo(listaServicio, "ddlServicio", true);
		llenarCombo(listaConsultaExterna, "ddlMasEstadoConsulExterna");
		llenarCombo(listaConsultaProcedimiento, "ddlMasEstadoProcedimiento");

		configuracionInicial();

	}
}

function Buscar() {

	var url = urlBase + "Mantenimiento/obtenerOrdenAtencionListar/?ss=" + ss;

	var ddlEntidad = document.getElementById("ddlEntidad").value;
	var ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
	var ddlTipoAtencion = document.getElementById("ddlTipoAtencion").value;
	var ddlServicio = document.getElementById("ddlServicio").value;

	var strDatos = sucursalId + "|" + ddlEntidad + "|" + vMes + "|" + vAnio + "|" + (ddlEspecialidad == "" ? 0 : ddlEspecialidad) + "|" + (ddlTipoAtencion == "" ? 0 : ddlTipoAtencion) + "|" + (ddlServicio == "" ? 0 : ddlServicio);
	$.ajax(url, "post", listarTodo, strDatos);
}

function listarTodo(rpta) {
	limpiarFiltros();

	document.getElementById("btnBuscar").innerHTML = "Buscar";
	if (rpta != "") {
		var data = rpta.split("¬");
		listaOrden1 = data[0].split('¯');
		listaOrden2 = data[1].split('¯');
		listaOrden3 = data[2].split('¯');
		var tab = document.getElementById("ulTabs");
		elementos = tab.getElementsByClassName("tab-link");
		if (elementos[0] != null) {
			elementos[0].click();
		}
	}
	else {
		matriz = [];
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbOrdenAtencion").innerHTML = contenido;
	}
	var divOrdenAtencion = document.getElementById("divOrdenAtencion");
	divOrdenAtencion.style.display = "";
}

function listarOrdenAtencion(opcion) {
	limpiarPopUp(opcion);
	switch (opcion) {
		case 1:
			crearMatriz(listaOrden1);
			break;
		case 2:
			crearMatriz(listaOrden2);
			break;
		case 3:
			crearMatriz(listaOrden3);
			break;
	}
	indiceActualBloque = 0;
	paginar(-1);

}

function limpiarPopUp(opcion) {
	var btnMasgrabar = document.getElementById("btnMasgrabar");
	btnMasgrabar.setAttribute("data-opcion", opcion);
	var ocultar = document.getElementsByClassName("ocultar");
	if (opcion == 1) {
		ocultar[0].style.display = "none";
		ocultar[1].style.display = "";
		ocultar[2].style.display = "none";
		ocultar[3].style.display = "";
		ocultar[4].style.display = "";
		ocultar[5].style.display = "none";
		ocultar[6].style.display = "none";
		ocultar[7].style.display = "none";
	} else {
		ocultar[0].style.display = "";
		ocultar[1].style.display = "";
		ocultar[2].style.display = "";
		ocultar[3].style.display = "";
		ocultar[4].style.display = "none";
		ocultar[5].style.display = "";
		ocultar[6].style.display = "";
		ocultar[7].style.display = "";
	}
	var limpiar = document.getElementsByName("limpiar");
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
		if (limpiar[y].nodeName == "SELECT") {
			limpiar[y].selectedIndex = "0";
		}
		else {
			limpiar[y].value = "";
		}
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
	var valor = "";
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general' style='table-layout:fixed'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:1px;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos' /></th>";
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
		switch (j) {
			case 5:
				contenido += "<select class='Combo' name='cabecera' style='width:90%' tabIndex='" + matrizIndice[j] + "'><option value=''>TODOS</option>";
				for (var x = 0; x < listaEspecialidad.length; x++) {
					valor = listaEspecialidad[x].split("¦");
					contenido += "<option value='";
					contenido += valor[0];
					contenido += "'>";
					contenido += valor[1];
					contenido += "</option>";
				}
				break;
			case 6:
				contenido += "<select class='Combo' name='cabecera' style='width:90%' tabIndex='" + matrizIndice[j] + "'><option value=''>TODOS</option>";
				for (var x = 0; x < listaServicio.length; x++) {
					valor = listaServicio[x].split("¦");
					contenido += "<option value='";
					contenido += valor[0];
					contenido += "'>";
					contenido += valor[1];
					contenido += "</option>";
				}
				break;
			case 7:
				contenido += "<select class='Combo' name='cabecera' style='width:90%' tabIndex='" + matrizIndice[j] + "'><option value=''>TODOS</option>";
				for (var x = 0; x < listaTipoAtencion.length; x++) {
					valor = listaTipoAtencion[x].split("¦");
					contenido += "<option value='";
					contenido += valor[0];
					contenido += "'>";
					contenido += valor[1];
					contenido += "</option>";
				}
				break;
			case 30:
				contenido += "<select class='Combo' name='cabecera' style='width:90%' tabIndex='" + matrizIndice[j] + "'><option value=''>TODOS</option>";
				contenido += "<option value='True'>SI</option>";
				contenido += "<option value='False'>NO</option>";
				break;
			default:
				contenido += "<input type='text' class='Texto' name='cabecera' tabIndex='" + matrizIndice[j] + "' style='width:90%'>";
				break;
		}

		contenido += "</th>";
	}
	contenido += "<th style='width:1px;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbOrdenAtencion' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divOrdenAtencionTabla").innerHTML = contenido;
}

function crearMatriz(lista) {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	matriz = [];
	listaGeneral = [];
	if (lista != "") {
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			matriz[x] = [];
			listaGeneral[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "" || j == 3) {
					matriz[x][j] = campos[j].trim();
					listaGeneral[x][j] = campos[j].trim();
					if (j == 9) {
						matrizmedicosfiltrar[x] = campos[j].trim();
					}
				}
				else {
					matriz[x][j] = campos[j] * 1;
					listaGeneral[x][j] = campos[j] * 1;
				}
			}
			x++;
		}
	}
}

function mostrarMatriz(indicePagina) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		var valor;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				if (matriz[i][31] == "True") {
					contenido += "<tr class='FilaDatos' style='background-color: #dedede !important;'>";
				}
				else {
					contenido += "<tr class='FilaDatos'>";
				}
				contenido += "<td style='text-align:center'><input type='checkbox'";
				if (matriz[i][30] != "0") {
					contenido += " disabled='disabled' ";
				}
				contenido += " name='rdnDetalle' id='rdn";
				contenido += i;
				contenido += "' data-check='";
				contenido += matriz[i][0];
				contenido += "' /></td>";
				for (var j = 1; j < nCampos; j++) {
					contenido += "<td style='word-wrap: break-word;'";
					switch (j) {

						case 6:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;'>";
							}
							else {
								contenido += ">";
							}

							for (var x = 0; x < listaEspecialidad.length; x++) {
								valor = listaEspecialidad[x].split("¦");
								if (matriz[i][6] == valor[0]) {
									contenido += valor[0] + "-" + valor[1];
									break;
								}
							}
							break;
						case 7:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;'>";
							}
							else {
								contenido += ">";
							}
							var valor;
							for (var x = 0; x < listaServicio.length; x++) {
								valor = listaServicio[x].split("¦");
								if (matriz[i][7] == valor[0]) {
									contenido += valor[0] + "-" + valor[1];
									break;
								}
							}
							break;
						case 8:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;'>";
							}
							else {
								contenido += ">";
							}
							var valor;
							for (var x = 0; x < listaTipoAtencion.length; x++) {
								valor = listaTipoAtencion[x].split("¦");
								if (matriz[i][8] == valor[0]) {
									contenido += valor[0] + "-" + valor[1];
									break;
								}
							}
							break;
						case 11:
						case 12:
						case 25:
						case 26:
						case 28:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;'>";
							}
							else {
								contenido += ">";
							}
							contenido += (matriz[i][j].indexOf("1900") > -1 ? "" : matriz[i][j]);
							break;


						case 14:
						case 15:
						case 16:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;text-align:right'>";
							}
							else {
								contenido += " style='text-align:right'>";
							}
							contenido += formatearNumero(matriz[i][j]);
							break;
						case 30:
							if (matriz[i][30] == "0") {
								if (matriz[i][31] == "True") {
									contenido += " style='background-color: #dedede !important;text-align:center'>";
								} else {
									contenido += ">";
								}
								//contenido += ">";
								//var chkId = document.getElementById("rdn" + i);
								//chkId.disabled = "disabled";
							}
							else {
								if (matriz[i][31] == "True") {
									contenido += " style='background-color: #dedede !important;text-align:center'>" + matriz[i][j];
								} else {
									contenido += " style='text-align:center'>" + matriz[i][j];
								}

							}
							//contenido += matriz[i][j];
							break;
						case 31:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;text-align:center'>";
								contenido += "<span onclick='verHistorial(\"" + matriz[i][0] + "\");' class='puntero'>SI</span>";

							}
							else {
								contenido += " style='text-align:center'>NO";
							}
							break;
						default:
							if (matriz[i][31] == "True") {
								contenido += " style='background-color: #dedede !important;'>";
							}
							else {
								contenido += ">";
							}
							contenido += matriz[i][j];
							break;

					}
					contenido += "</td>";
				}
				contenido += "<td style='text-align:center'></td></tr>";
			}
			else { break; }
		}
	}
	else {
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbOrdenAtencion").innerHTML = contenido;
	configurarChecks();
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
	indiceOrden = enlace.getAttribute("data-orden") * 1;
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
	//matriz.sort(ordenar);

	if (validado) {
		matriz = [];

		//matriz = heapSort(listaGeneral, indiceOrden);
		matriz = mergeSort(listaGeneral, indiceOrden, tipoOrden);
	}
	else {
		var matrizClon = matriz.reverse();
		matriz = [];
		matriz = matrizClon.slice(0);
	}
}

function mergeSort(arr, indice, opcion) {
	if (arr.length < 2)
		return arr;

	var middle = parseInt(arr.length / 2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle, arr.length);

	return merge(mergeSort(left, indice, opcion), mergeSort(right, indice, opcion), indice, opcion);
}

function merge(left, right, indice, opcion) {
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

function ordenar(x, y) {
	//var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
	//var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
	var valX = x[indiceOrden];
	var valY = y[indiceOrden];
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function configurarFiltro() {
	var textos = document.getElementsByName("cabecera");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.nodeName == "INPUT") {
			texto.onkeyup = function (e) {
				var cnt = e.target || e.srcElement;
				var ti = cnt.getAttribute("tabIndex") * 1;
				var pos = buscarFiltro(ti);
				var valor = cnt.value;
				if (pos == -1) {
					if (valor.trim() != "") {
						aFiltro.push([ti, valor])
					}
				} else {
					if (valor.trim() != "") {
						aFiltro[pos][1] = valor;
					} else {
						aFiltro.splice(pos, 1);
					}
				}

				filtrar();
			}
		} else {
			texto.onchange = function (e) {
				var cnt = e.target || e.srcElement;
				var ti = cnt.getAttribute("tabIndex") * 1;
				var pos = buscarFiltro(ti);
				var valor = cnt.value;
				if (pos == -1) {
					if (valor.trim() != "") {
						aFiltro.push([ti, valor])
					}
				} else {
					if (valor.trim() != "") {
						aFiltro[pos][1] = valor;
					} else {
						aFiltro.splice(pos, 1);
					}
				}
				filtrar();
			}
		}
	}
}

function buscarFiltro(id) {
	var n = aFiltro.length, pos = -1, reg;
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = aFiltro[i];
			if (reg[0] == id) {
				pos = i;
				break;
			}
		}
	}
	return pos;
}

function filtrar() {
	var exito;
	matriz = [];
	var nRegistros = listaGeneral.length;
	var nCampos;
	var campos;
	var x = 0;
	var nFiltro = aFiltro.length, ofiltro;
	for (var i = 0; i < nRegistros; i++) {
		campos = listaGeneral[i];
		nCampos = campos.length;
		if (nFiltro > 0) {
			for (var j = 0 ; j < nFiltro; j += 1) {
				exito = true;
				ofiltro = aFiltro[j];
				if (ofiltro[0] == 6 || ofiltro[0] == 7 || ofiltro[0] == 8) {
					exito = exito && (campos[ofiltro[0]].toString().toLowerCase() == ofiltro[1].toLowerCase());
				} else {
					exito = exito && (campos[ofiltro[0]].toString().toLowerCase().indexOf(ofiltro[1].toLowerCase()) > -1);
				}
				if (!exito) break;

			}
		} else {
			exito = true;
		}
		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || campos[j] == "" || j == 3) matriz[x][j] = campos[j];
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

function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 100px' align='center'>Orden Atención</td>";
	cabecera += "<td style='width: 100px' align='center'>Línea Orden</td>";
	cabecera += "<td style='width: 100px' align='center'>Código OA</td>";
	cabecera += "<td style='width: 100px' align='center'>Tipo Componente</td>";
	cabecera += "<td style='width: 250px' align='center'>Prestación</td>";
	cabecera += "<td style='width: 150px' align='center'>Especialidad</td>";
	cabecera += "<td style='width: 150px' align='center'>Servicio</td>";
	cabecera += "<td style='width: 150px' align='center'>Tipo Atención</td>";
	cabecera += "<td style='width: 250px' align='center'>Médico</td>";
	cabecera += "<td style='width: 250px' align='center'>Médico Secundario</td>";
	cabecera += "<td style='width: 100px' align='center'>F. Atención</td>";
	cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
	cabecera += "<td style='width: 60px' align='center'>Cantidad</td>";
	cabecera += "<td style='width: 60px' align='center'>P.U. Prestación</td>";
	cabecera += "<td style='width: 80px' align='center'>Mto. Prestación</td>";
	cabecera += "<td style='width: 80px' align='center'>Costo Prestación</td>";
	cabecera += "<td style='width: 80px' align='center'>Tipo Proceso</td>";
	cabecera += "<td style='width: 80px' align='center'>Estado Prestación</td>";

	cabecera += "<td style='width: 80px' align='center'>ObservacionTX</td>";
	cabecera += "<td style='width: 80px' align='center'>IdTransaccion</td>";
	cabecera += "<td style='width: 80px' align='center'>Desc. EstadoTX</td>";
	cabecera += "<td style='width: 80px' align='center'>Almacen Destino</td>";

	cabecera += "<td style='width: 80px' align='center'>Línea Familia</td>";
	cabecera += "<td style='width: 80px' align='center'>Familia</td>";

	cabecera += "<td style='width: 100px' align='center'>F. Migración</td>";

	cabecera += "<td style='width: 100px' align='center'>F. Creación</td>";
	cabecera += "<td style='width: 100px' align='center'>U. Creación</td>";

	cabecera += "<td style='width: 100px' align='center'>F. Modificación</td>";
	cabecera += "<td style='width: 100px' align='center'>Usuario</td>";
	cabecera += "<td style='width: 100px' align='center'>Nro. Proceso</td>";
	cabecera += "<td style='width: 100px' align='center'>Ind. Modificado</td>";

	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var valor;
	excelExportar = crearCabeceraExportar();
	for (var i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 1; j < nCampos; j++) {
			contenido.push("<td");
			switch (j) {
				case 3:
					contenido.push(" style='mso-number-format:\"\@\"'>");
					contenido.push(matriz[i][j]);
					break;
					break;
				case 6:
					contenido.push(">");
					for (var x = 0; x < listaEspecialidad.length; x++) {
						valor = listaEspecialidad[x].split("¦");
						if (matriz[i][6] == valor[0]) {
							contenido.push(valor[0] + "-" + valor[1]);
							break;
						}
					}
					break;
				case 7:
					contenido.push(">");
					var valor;
					for (var x = 0; x < listaServicio.length; x++) {
						valor = listaServicio[x].split("¦");
						if (matriz[i][7] == valor[0]) {
							contenido.push(valor[0] + "-" + valor[1]);
							break;
						}
					}
					break;
				case 8:
					contenido.push(">");
					var valor;
					for (var x = 0; x < listaTipoAtencion.length; x++) {
						valor = listaTipoAtencion[x].split("¦");
						if (matriz[i][8] == valor[0]) {
							contenido.push(valor[0] + "-" + valor[1]);
							break;
						}
					}
					break;

				case 11:
				case 12:
				case 25:
				case 26:
				case 28:
					contenido.push(">");
					contenido.push(matriz[i][j].indexOf("1900") > -1 ? "" : matriz[i][j]);
					break;
				case 14:
				case 15:
				case 16:
					contenido.push(" style='mso-number-format:\"\#\,\#\#0\.00\"'>");
					contenido.push(matriz[i][j]);
					break;
				case 30:
					contenido.push(">");
					contenido.push(matriz[i][j] == "0" ? "" : matriz[i][j]);
					break;
				case 31:
					contenido.push(">");
					contenido.push(matriz[i][j] == "True" ? "Sí" : "No");
					break;
				default:
					contenido.push(">");
					contenido.push(matriz[i][j]);
					break;

			}
		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
}

function configurarControles() {
	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		var nRegistros = matriz.length;
		if (nRegistros > 0) {
			exportacion();
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "OrdenAtencion.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		validar[x].onmouseenter = function (event) {
			var PopupEdicionMasiva = document.getElementById("PopupEdicionMasiva");
			if (PopupEdicionMasiva.className.indexOf("Open") > -1) {
				var txtMasFechaPrestacion = document.getElementById("txtMasFechaPrestacion");
				var txtMasHoraPrestacion = document.getElementById("txtMasHoraPrestacion");
				var btnMasgrabar = document.getElementById("btnMasgrabar");
				var opcion = btnMasgrabar.getAttribute("data-opcion");
				if (txtMasFechaPrestacion.value == "" && txtMasHoraPrestacion.value == "" && opcion == "2") {
					mensajeValidacion = [];
					txtMasFechaPrestacion.className = "form-texto validar";
					txtMasHoraPrestacion.className = "form-texto validar";
				}
			}
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
			var PopupEdicionMasiva = document.getElementById("PopupEdicionMasiva");
			if (PopupEdicionMasiva.className.indexOf("Open") > -1) {
				var txtMasFechaPrestacion = document.getElementById("txtMasFechaPrestacion");
				var txtMasHoraPrestacion = document.getElementById("txtMasHoraPrestacion");
				var btnMasgrabar = document.getElementById("btnMasgrabar");
				var opcion = btnMasgrabar.getAttribute("data-opcion");
				if (txtMasFechaPrestacion.value == "" && txtMasHoraPrestacion.value == "" && opcion == "2") {
					mensajeValidacion = [];
					txtMasFechaPrestacion.className = "form-texto validar";
					txtMasHoraPrestacion.className = "form-texto validar";
				}
			}
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
		if (validarBusqueda()) {
			vMes = document.getElementById("cboMes").value;
			vAnio = document.getElementById("txtAnio").value;
			Buscar();
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		}
	}

	var btnEditar = document.getElementById("btnEditar");
	btnEditar.onclick = function () {
		if (matrizChecks.length > 0) {
			mensajeValidacion = [];
			var validar = document.getElementsByClassName("validar");
			for (var x = 0; x < validar.length; x++) {
				if (validar[x].className.indexOf("error") > -1) {
					validar[x].className = validar[x].className.split("error").join("").trim();
				}
			}
			var limpiar = document.getElementsByName("limpiar");
			var nRegistros = limpiar.length;
			for (var y = 0; y < nRegistros; y++) {
				if (limpiar[y].nodeName == "SELECT") {
					limpiar[y].selectedIndex = "0";
				}
				else {
					limpiar[y].value = "";
				}
			}
			document.getElementById("hdfMedico").value = "0";
			document.getElementById("hdfMedico2").value = "0";
			PersonaPrincipal1 = "0";
			PersonaPrincipal2 = "0";
			var btnMasgrabar = document.getElementById("btnMasgrabar");
			var elemento = btnMasgrabar.getAttribute("data-opcion");
			var valor = 0;
			var contador = 0;
			var tipos = [];
			for (var x = 0; x < matrizChecks.length; x++) {
				for (var y = 0; y < listaGeneral.length; y++) {
					if (listaGeneral[y][0] == matrizChecks[x]) {
						if (tipos.indexOf(listaGeneral[y][17] * 1) == -1) {
							tipos.push(listaGeneral[y][17] * 1);
						}
						if (valor == 0) {
							valor = (listaGeneral[y][17] * 1);
						}
						else {
							if (valor != (listaGeneral[y][17] * 1)) {
								valor = 0;
								break;
							}
						}
						contador = contador + 1;
						break;
					}
				}
				if (contador == matrizChecks.length) {
					break;
				}
			}

			var divconex = document.getElementById("divconex");
			var divconpro = document.getElementById("divconpro");
			if (elemento == "1") {
				divconex.style.display = "none";
				divconpro.style.display = "none";
			}
			else {
				if (tipos.length == 2) {
					divconex.style.display = "";
					divconpro.style.display = "";
				}
				else {
					if (tipos[0] == 1) {
						divconex.style.display = "";
						divconpro.style.display = "none";
					}
					else {
						divconex.style.display = "none";
						divconpro.style.display = "";
					}
				}
			}

			var chkHabilitar = document.getElementsByClassName("chkHabilitar");
			for (var u = 0; u < chkHabilitar.length; u++) {
				chkHabilitar[u].checked = true;
				chkHabilitar[u].click();
			}

			abrirPopup('PopupEdicionMasiva');

		}

		var txtMasHoraPrestacion = document.getElementById("txtMasHoraPrestacion");
		txtMasHoraPrestacion.onkeyup = function (event) {
			formatoHora(this, event);
		}


	}


	var chkHabilitar = document.getElementsByClassName("chkHabilitar");
	for (var x = 0; x < chkHabilitar.length; x++) {
		chkHabilitar[x].onclick = function () {
			var datos = this.getAttribute("data-id");
			var control;
			if (datos.indexOf("¦") > -1) {
				var matrizDatos = [];
				matrizDatos = datos.split("¦");
				for (var x = 0; x < matrizDatos.length; x++) {
					control = document.getElementById(matrizDatos[x]);
					if (this.checked) {
						control.style.pointerEvents = "auto";
						control.disabled = false;
						control.readOnly = false;
						if (datos.indexOf("spn") > -1) {
							if (control.id == "spnMasDoctor") {
								document.getElementById("hdfMedico").value = "0";
								PersonaPrincipal1 = "0";
								document.getElementById("txtMasMedico").value = "";
							}
							else {
								document.getElementById("hdfMedico2").value = "0";
								PersonaPrincipal2 = "0";
								document.getElementById("txtMasMedicoSec").value = "";
							}
						}
						else {
							if (control.nodeName == "SELECT") {
								control.selectedIndex = "0";
							}
							else {
								control.value = "";

							}
							control.className = control.className.split("lectura block").join("");
						}
					}
					else {
						control.style.pointerEvents = "none";
						control.disabled = true;
						control.readOnly = true;
						if (datos.indexOf("spn") > -1) {
							if (control.id == "spnMasDoctor") {
								document.getElementById("hdfMedico").value = "0";
								PersonaPrincipal1 = "0";
								document.getElementById("txtMasMedico").value = "";
							}
							else {
								document.getElementById("hdfMedico2").value = "0";
								PersonaPrincipal2 = "0";
								document.getElementById("txtMasMedicoSec").value = "";
							}
						}
						else {
							if (control.nodeName == "SELECT") {
								control.selectedIndex = "0";
							}
							else {
								control.value = "";
							}
							control.className += " lectura block";
						}
					}
				}
			}
			else {
				control = document.getElementById(datos);
				if (this.checked) {
					control.style.pointerEvents = "auto";
					control.disabled = false;
					control.readOnly = false;
					if (datos.indexOf("spn") > -1) {
						if (control.id == "spnMasDoctor") {
							document.getElementById("hdfMedico").value = "0";
							PersonaPrincipal1 = "0";
							document.getElementById("txtMasMedico").value = "";
						}
						else {
							document.getElementById("hdfMedico2").value = "0";
							PersonaPrincipal2 = "0";
							document.getElementById("txtMasMedicoSec").value = "";
						}
					}
					else {
						if (control.nodeName == "SELECT") {
							control.selectedIndex = "0";
						}
						else {
							control.value = "";

						}
						control.className = control.className.split("lectura block").join("");
					}
				}
				else {
					control.style.pointerEvents = "none";
					control.disabled = true;
					control.readOnly = true;
					if (datos.indexOf("spn") > -1) {
						if (control.id == "spnMasDoctor") {
							document.getElementById("hdfMedico").value = "0";
							PersonaPrincipal1 = "0";
							document.getElementById("txtMasMedico").value = "";
						}
						else {
							document.getElementById("hdfMedico2").value = "0";
							PersonaPrincipal2 = "0";
							document.getElementById("txtMasMedicoSec").value = "";
						}
					}
					else {
						if (control.nodeName == "SELECT") {
							control.selectedIndex = "0";
						}
						else {
							control.value = "";
						}
						control.className += " lectura block";
					}
				}
			}


		}
	}

	//var btnMasgrabar = document.getElementById("btnMasgrabar");
	//btnMasgrabar.onclick = function () {
	//	var cadena = "";
	//	var opcion = this.getAttribute("data-opcion");
	//	var lista = matrizChecks.join("|");
	//	var txtMasFechaPrestacion = document.getElementById("txtMasFechaPrestacion").value;
	//	var txtMasHoraPrestacion = document.getElementById("txtMasHoraPrestacion").value;
	//	var hdfMedico = document.getElementById("hdfMedico").value;
	//	var ddlMasEspecialidad = document.getElementById("ddlMasEspecialidad").value;
	//	var txtMasCosto = document.getElementById("txtMasCosto").value;
	//	var ddlMasEstadoConsulExterna = document.getElementById("ddlMasEstadoConsulExterna").value;
	//	var ddlMasEstadoProcedimiento = document.getElementById("ddlMasEstadoProcedimiento").value;
	//	var ddlMasIndicadorHorario = document.getElementById("ddlMasIndicadorHorario").value;
	//	cadena = opcion + "¬" + lista + "¬" + (opcion == "1" ? hdfMedico : "") + ddlMasEspecialidad + "¬" + txtMasCosto + "¬" + txtMasFechaPrestacion + " " + txtMasHoraPrestacion
	//}

	var chkTodos = document.getElementById("chkTodos");
	chkTodos.onclick = function () {
		if (matriz.length > 0) {
			var rdnDetalle = document.getElementsByName("rdnDetalle");
			if (this.checked) {
				var valor;
				for (var x = 0; x < listaGeneral.length; x++) {
					if (listaGeneral[x][30] == "0") {
						matrizChecks.push(listaGeneral[x][0]);
						//matrizChecksPos.push(x);
					}
				}
			}
			else {
				matrizChecks = [];
				//matrizChecksPos = [];
			}

		}
		paginar(indiceActualPagina);
	}

	var spnMasDoctor = document.getElementById("spnMasDoctor");
	var spnMasDoctorSec = document.getElementById("spnMasDoctorSec");
	spnMasDoctor.onclick = spnMasDoctorSec.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (this.id == "spnMasDoctor") OpcionMedico = 1;
		else OpcionMedico = 2;
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "0") {
			var datos = this.value.split("¦");
			if (OpcionMedico == 2) {
				var hdfMedico2 = document.getElementById("hdfMedico2");
				hdfMedico2.value = datos[0];
				PersonaPrincipal2 = datos[0];
				document.getElementById("txtMasMedicoSec").value = datos[1];
			} else {
				PersonaPrincipal1 = datos[0];
				this.value = datos[0];
				document.getElementById("txtMasMedico").value = datos[1];
			}

		}
	}

	var btnMasgrabar = document.getElementById("btnMasgrabar");
	btnMasgrabar.onclick = function () {
		if (validarFormulario()) {
			var ddlEntidad = document.getElementById("ddlEntidad").value;
			var persona = 0;
			var personasecundario = 0;
			var tab = this.getAttribute("data-opcion");
			var lista = matrizChecks.join("¬");

			persona = PersonaPrincipal1
			personasecundario = PersonaPrincipal2;
			switch (tab) {
				case "1":
					strAct = "1¦" + (persona != "0" ? (persona + "-" + document.getElementById("txtMasMedico").value) : "") + "¦";
					strAct += document.getElementById("ddlMasEspecialidad").value + "¦";
					strAct += document.getElementById("txtMasCosto").value;
					break;
				case "2":
					strAct = "2¦" + document.getElementById("txtMasFechaPrestacion").value + " " + document.getElementById("txtMasHoraPrestacion").value + "¦";
					strAct += (persona != "0" ? (persona + "-" + document.getElementById("txtMasMedico").value) : "") + "¦";
					strAct += document.getElementById("ddlMasEspecialidad").value + "¦";
					strAct += (document.getElementById("ddlMasEstadoConsulExterna").value != "" ? (document.getElementById("ddlMasEstadoConsulExterna").options[document.getElementById("ddlMasEstadoConsulExterna").selectedIndex].text) : "") + "¦";
					strAct += (document.getElementById("ddlMasEstadoProcedimiento").value != "" ? (document.getElementById("ddlMasEstadoProcedimiento").options[document.getElementById("ddlMasEstadoProcedimiento").selectedIndex].text) : "") + "¦";
					strAct += document.getElementById("ddlMasIndicadorHorario").value + "¦";
					strAct += (persona != "0" ? (persona + "-" + document.getElementById("txtMasMedicoSec").value) : "");
					break;
				case "3":
					strAct = "3¦" + document.getElementById("txtMasFechaPrestacion").value + " " + document.getElementById("txtMasHoraPrestacion").value + "¦";
					strAct += (persona != "0" ? (persona + "-" + document.getElementById("txtMasMedico").value) : "") + "¦";
					strAct += document.getElementById("ddlMasEspecialidad").value + "¦";
					strAct += (document.getElementById("ddlMasEstadoConsulExterna").value != "" ? (document.getElementById("ddlMasEstadoConsulExterna").options[document.getElementById("ddlMasEstadoConsulExterna").selectedIndex].text) : "") + "¦";
					strAct += (document.getElementById("ddlMasEstadoProcedimiento").value != "" ? (document.getElementById("ddlMasEstadoProcedimiento").options[document.getElementById("ddlMasEstadoProcedimiento").selectedIndex].text) : "") + "¦";
					strAct += document.getElementById("ddlMasIndicadorHorario").value + "¦";
					strAct += (persona != "0" ? (persona + "-" + document.getElementById("txtMasMedicoSec").value) : "");
					break;
			}

			var ddlMasEspecialidad = document.getElementById("ddlMasEspecialidad").value;
			var txtMasCosto = document.getElementById("txtMasCosto").value;
			var FechaHora = document.getElementById("txtMasFechaPrestacion").value + " " + document.getElementById("txtMasHoraPrestacion").value;
			var valor = 0;
			if (tab != "3") {
				for (var x = 0; x < matriz.length; x++) {
					if (x == 0) {
						valor = matriz[17];
					}
					else {
						if (valor != matriz[17]) {
							break;
						}
					}
				}
			}
			var ddlMasEstadoProcedimiento = document.getElementById("ddlMasEstadoProcedimiento").value;
			var ddlMasEstadoConsulExterna = document.getElementById("ddlMasEstadoConsulExterna").value;
			var ddlMasIndicadorHorario = document.getElementById("ddlMasIndicadorHorario").value;
			var strDatos = tab + "¯" + lista + "¯" + persona + "¯" + ddlMasEspecialidad + "¯" + txtMasCosto + "¯" + FechaHora.trim() + "¯" + personasecundario + "¯" + valor + "¯" + ddlMasEstadoProcedimiento + "¯" + ddlMasEstadoConsulExterna + "¯" + ddlMasIndicadorHorario;

			var ddlEntidad = document.getElementById("ddlEntidad").value;

			var url = urlBase + "Mantenimiento/OrdenAtencionActualizar/?ss=" + ss + "&t=" + ddlEntidad;
			$.ajax(url, "post", mostrarRpta, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		}
	}

	var txtMasFechaPrestacion = document.getElementById("txtMasFechaPrestacion");
	txtMasFechaPrestacion.DatePickerX.init({
		mondayFirst: true
	});
	txtMasFechaPrestacion.readOnly = false;

	var txtMasCosto = document.getElementById("txtMasCosto");
	txtMasCosto.onkeypress = function (event) {
		validarSoloNumeroDecimal(event);
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

function mostrarRpta(rpta) {
	document.getElementById("btnMasgrabar").innerHTML = "Grabar";
	var Datos = strAct.split("¦");
	var pos = Datos[0] * 1;
	var pagactual = indiceActualPagina;
	var blockactual = indiceActualBloque;
	if (rpta != "") {
		var mensaje=rpta.split("¦")[1];
		mostraralerta(mensaje);
		actualizarLista();
		strAct = "";
	}
	else {
		mostraralerta("Error en la actualización");
	}
	abrirPopup('PopupEdicionMasiva');

	var tab = document.getElementById("ulTabs");
	elementos = tab.getElementsByClassName("tab-link");
	if (elementos[0] != null) {
		elementos[(pos - 1)].click();
	}

	//matriz = [];
	indiceActualBloque = blockactual;
	paginar(pagactual);
	var encontrado = true;
	var Texto = document.getElementsByClassName("Texto");
	var Combo = document.getElementsByClassName("Combo");
	for (var x = 0; x < Texto.length; x++) {
		if (Texto[x].value != "") {
			encontrado = true;
			break;
		}
	}
	if (encontrado == false) {

		for (var y = 0; y < Combo.length; y++) {
			if (Combo[y].selectedIndex != "0") {
				encontrado = true;
				break;
			}
		}
	}
	if (encontrado) {
		var ti = 6;
		var pos = buscarFiltro(ti);
		var valor = Combo[0].value;
		if (pos == -1) {
			if (valor.trim() != "") {
				aFiltro.push([ti, valor])
			}
		} else {
			if (valor.trim() != "") {
				aFiltro[pos][1] = valor;
			} else {
				aFiltro.splice(pos, 1);
			}
		}

		filtrar();
	}
	//var btnBuscar = document.getElementById("btnBuscar");
	//btnBuscar.click();
}

function actualizarLista() {
	var n = matrizChecks.length;
	var nr, objr;
	var obj = strAct.split("¦");

	switch (obj[0]) {
		case "1":
			nr = listaOrden1.length;
			break;
		case "2":
			nr = listaOrden2.length;
			break;
		case "3":
			nr = listaOrden3.length;
			break;
	}

	if (n > 0) {
		for (var i = 0; i < n; i++) {
			switch (obj[0]) {
				case "1":
					for (var x = 0; x < nr; x++) {
						objr = listaOrden1[x].split("¦");
						if (objr[0] == matrizChecks[i]) {
							//6 especialidad 16 costo
							if (obj[1] != "") {
								objr[9] = obj[1]
							}
							if (obj[2] != "") {
								objr[6] = obj[2]
							}
							if (obj[3] != "") {
								objr[16] = obj[3]
							}
							objr[31] = "True";
							listaOrden1[x] = objr.join("¦");
							break;
						}
					}
					break;
				case "2":
					for (var x = 0; x < nr; x++) {
						objr = listaOrden2[x].split("¦");
						if (objr[0] == matrizChecks[i]) {
							if (obj[1].trim() != "") {
								objr[11] = obj[1] + ":00";
							}
							if (obj[2] != "") {
								objr[9] = obj[2]
							}
							if (obj[3] != "") {
								objr[6] = obj[3]
							}

							if (objr[17] == "1") {
								if (obj[4] != "") {
									objr[18] = obj[4]
								}
							} else {
								if (obj[5] != "") {
									objr[18] = obj[5];
								}
							}
							objr[31] = "True";
							listaOrden2[x] = objr.join("¦");
							break;
						}
					}
					break;
				case "3":
					for (var x = 0; x < nr; x++) {
						objr = listaOrden3[x].split("¦");
						if (objr[0] == matrizChecks[i]) {
							if (obj[1].trim() != "") {
								objr[11] = obj[1] + ":00";
							}
							if (obj[2] != "") {
								objr[9] = obj[2]
							}
							if (obj[3] != "") {
								objr[6] = obj[3]
							}

							if (objr[17] == "1") {
								if (obj[4] != "") {
									objr[18] = obj[4]
								}
							} else {
								if (obj[5] != "") {
									objr[18] = obj[5];
								}
							}
							objr[31] = "True";
							listaOrden3[x] = objr.join("¦");
							break;
						}
					}
					break;
			}
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
		}, 3500);
	}
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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

function validarCuenta() {
	var ddlComponente = document.getElementById("ddlComponente");
	var txtPrestacion = document.getElementById("txtPrestacion");
	var txtArticulo = document.getElementById("txtArticulo");
	var ddlTipoAsiento = document.getElementById("ddlTipoAsiento");
	var ddlServicio = document.getElementById("ddlServicio");
	var ddlMoneda = document.getElementById("ddlMoneda");
	var txtCuentaContableVCosto = document.getElementById("txtCuentaContableVCosto");
	var txtCuentaContableVProv = document.getElementById("txtCuentaContableVProv");
	var txtCuentaContableNVCosto = document.getElementById("txtCuentaContableNVCosto");
	var txtCuentaContableNVProv = document.getElementById("txtCuentaContableNVProv");

	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	var mensajeTipoAsiento = validarCombo(ddlTipoAsiento.id, "tipo de asiento", true);
	if (mensajeTipoAsiento != "") {
		mensajeValidacion[ddlTipoAsiento.getAttribute("data-secuencia")] = mensajeTipoAsiento;
		ddlTipoAsiento.className += " error";
	}
	var mensajeServicio = validarCombo(ddlServicio.id, "servicio", true);
	if (mensajeServicio != "") {
		mensajeValidacion[ddlServicio.getAttribute("data-secuencia")] = mensajeServicio;
		ddlServicio.className += " error";
	}
	var mensajeMoneda = validarCombo(ddlMoneda.id, "moneda", true);
	if (mensajeMoneda != "") {
		mensajeValidacion[ddlMoneda.getAttribute("data-secuencia")] = mensajeMoneda;
		ddlMoneda.className += " error";
	}

	if (ddlComponente.value == "A") {
		var mensajeArticulo = validarTexto(txtArticulo.id, "articulo", true);
		if (mensajeArticulo != "") {
			mensajeValidacion[txtArticulo.getAttribute("data-secuencia")] = mensajeArticulo;
			txtArticulo.className += " error";
		}
	}
	else {
		var mensajePrestacion = validarTexto(txtPrestacion.id, "articulo", true);
		if (mensajePrestacion != "") {
			mensajeValidacion[txtPrestacion.getAttribute("data-secuencia")] = mensajePrestacion;
			txtPrestacion.className += " error";
		}
	}
	var tab1 = [];
	var mensajeCuentaContable = validarTexto(txtCuentaContableVCosto.id, "cuenta contable costo", true);
	if (mensajeCuentaContable != "") {
		mensajeValidacion[txtCuentaContableVCosto.getAttribute("data-secuencia")] = mensajeCuentaContable;
		txtCuentaContableVCosto.className += " error";
		tab1.push("1");
	}

	mensajeCuentaContable = validarTexto(txtCuentaContableVProv.id, "cuenta contable proveedor", true);
	if (mensajeCuentaContable != "") {
		mensajeValidacion[txtCuentaContableVProv.getAttribute("data-secuencia")] = mensajeCuentaContable;
		txtCuentaContableVProv.className += " error";
		if (tab1.indexOf("1") == -1) {
			tab1.push("1");
		}
	}

	mensajeCuentaContable = validarTexto(txtCuentaContableNVCosto.id, "cuenta contable costo", true);
	if (mensajeCuentaContable != "") {
		mensajeValidacion[txtCuentaContableNVCosto.getAttribute("data-secuencia")] = mensajeCuentaContable;
		txtCuentaContableNVCosto.className += " error";
		if (tab1.indexOf("2") == -1) {
			tab1.push("2");
		}
	}

	mensajeCuentaContable = validarTexto(txtCuentaContableNVProv.id, "cuenta contable proveedor", true);
	if (mensajeCuentaContable != "") {
		mensajeValidacion[txtCuentaContableNVProv.getAttribute("data-secuencia")] = mensajeCuentaContable;
		txtCuentaContableNVProv.className += " error";
		if (tab1.indexOf("2") == -1) {
			tab1.push("2");
		}
	}
	if (tab1.length == 1) {
		document.getElementById("tab" + tab1[0]).onclick();
	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}
}

function limpiarFormulario() {
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
	}
	var limpiar = document.getElementsByName("limpiar");
	for (var y = 0; y < limpiar.length; y++) {
		if (y == (limpiar.length - 13)) {
			limpiar[y].value = "ACTIVO";
		}
		else {
			if (limpiar[y].type == "checkbox") {
				limpiar[y].checked = false;
			} else {
				if (limpiar[y].nodeName == "SELECT") {
					limpiar[y].selectedIndex = "0";
					if (limpiar[y].id == "ddlComponente") {
						limpiar[y].onchange();
					}
				}
				else {
					limpiar[y].value = "";
				}
			}
		}
	}
	var checks = document.getElementsByName("rdn-ConfiguracionPago");
	var contenido = "";
	for (var x = 0; x < checks.length; x++) {
		checks[x].checked = false;
	}
	document.getElementById("divConfiguracionPago").style.display = "none";
	document.getElementById("tab1").onclick();
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

function mostrarCuenta(id) {
	var nCampos = matriz.length;
	var campo = "";
	var ddlTipoAsiento = document.getElementById("ddlTipoAsiento");
	var ddlServicio = document.getElementById("ddlServicio");
	var ddlMoneda = document.getElementById("ddlMoneda");
	var ddlEspecialidad = document.getElementById("ddlEspecialidad");
	var ddlTipoAdmision = document.getElementById("ddlTipoAdmision");
	var ddlClasificacionMovimiento = document.getElementById("ddlClasificacionMovimiento");
	var ddlComponente = document.getElementById("ddlComponente");
	var txtEstado = document.getElementById("txtEstado");
	var hdfCd = document.getElementById("hdfCd");
	var txtPresDescripcion = document.getElementById("txtPresDescripcion");

	var txtCuentaContableVCosto = document.getElementById("txtCuentaContableVCosto");
	var txtCuentaContableVCostoDescripcion = document.getElementById("txtCuentaContableVCostoDescripcion");

	var txtCuentaContableVProv = document.getElementById("txtCuentaContableVProv");
	var txtCuentaContableVProvDescripcion = document.getElementById("txtCuentaContableVProvDescripcion");

	var txtCuentaContableVCli = document.getElementById("txtCuentaContableVCli");
	var txtCuentaContableVCliDescripcion = document.getElementById("txtCuentaContableVCliDescripcion");

	var txtCuentaContableNVCosto = document.getElementById("txtCuentaContableNVCosto");
	var txtCuentaContableNVCostoDescripcion = document.getElementById("txtCuentaContableNVCostoDescripcion");

	var txtCuentaContableNVProv = document.getElementById("txtCuentaContableNVProv");
	var txtCuentaContableNVProvDescripcion = document.getElementById("txtCuentaContableNVProvDescripcion");

	var txtCuentaContableNVCli = document.getElementById("txtCuentaContableNVCli");
	var txtCuentaContableNVCliDescripcion = document.getElementById("txtCuentaContableNVCliDescripcion");


	for (var i = 0; i < nCampos; i++) {
		campo = matriz[i][0];
		if (campo == id) {
			hdfCd.value = id;
			idCuenta = id;
			ddlTipoAsiento.value = (matriz[i][2] == "Planilla" ? "X" : "P");
			ddlServicio.value = matriz[i][3].toString();
			ddlMoneda.value = matriz[i][4];
			ddlEspecialidad.value = (matriz[i][8] == 0 ? "" : matriz[i][8]);
			ddlTipoAdmision.value = (matriz[i][5] == 0 ? "" : matriz[i][5]);

			ddlClasificacionMovimiento.value = matriz[i][9];
			ddlComponente.value = matriz[i][7];
			ddlComponente.onchange();
			if (ddlComponente.value == "A") {
				var txtArticulo = document.getElementById("txtArticulo");
				txtArticulo.value = matriz[i][6];
			}
			else {
				var txtPrestacion = document.getElementById("txtPrestacion");
				txtPrestacion.value = matriz[i][6];
			}
			txtPresDescripcion.value = matriz[i][11];
			txtEstado.value = (matriz[i][10] == "A" ? "ACTIVO" : "INACTIVO");
			if (matriz[i][5] == 3) {
				document.getElementById("divConfiguracionPago").style.display = "";
			}

			txtCuentaContableVCosto.value = matriz[i][12];
			txtCuentaContableVProv.value = matriz[i][13];
			txtCuentaContableVCli.value = matriz[i][14];
			txtCuentaContableNVCosto.value = matriz[i][15];
			txtCuentaContableNVProv.value = matriz[i][16];
			txtCuentaContableNVCli.value = matriz[i][17];

			txtCuentaContableVCostoDescripcion.value = matriz[i][18];
			txtCuentaContableVProvDescripcion.value = matriz[i][19];
			txtCuentaContableVCliDescripcion.value = matriz[i][20];
			txtCuentaContableNVCostoDescripcion.value = matriz[i][21];
			txtCuentaContableNVProvDescripcion.value = matriz[i][22];
			txtCuentaContableNVCliDescripcion.value = matriz[i][23];

			var checks = document.getElementsByName("rdn-ConfiguracionPago");
			var contenido = "";
			var k = 25//obs se quita produccion
			for (var x = 0; x < checks.length; x++) {
				checks[x].checked = ((matriz[i][k] != undefined && matriz[i][k] == "True") ? true : false);
				k++;
			}

			abrirPopup('PopupCuentaProvision');
			break;
		}
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
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}
function verHistorial(id) {
	var hdfCd = document.getElementById("hdfCd");
	hdfCd.value = id;
	var t = "";
	var ddlEntidad = document.getElementById("ddlEntidad").value;
	if (ddlEntidad == "O") t = "ReplicaOrdenAtencion";
	else t = "ReplicaLiquidacionExpediente";
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
function validarBusqueda() {

	var txtAnio = document.getElementById("txtAnio");
	var cboMes = document.getElementById("cboMes");

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
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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

function mostrarTabs(elemento) {

	var tab = document.getElementById("ulTabs");
	elementos = tab.getElementsByClassName("tab-link");
	var opcion;
	for (var x = 0; x < elementos.length; x++) {
		if ((elementos[x].getAttribute("data-id") * 1) == elemento) {
			elementos[x].className = "tab-link current";
			elementos[x].style.pointerEvents = "none";
			opcion = elementos[x].getAttribute("data-id") * 1;
		}
		else {
			elementos[x].className = "tab-link";
			elementos[x].style.pointerEvents = "";
		}
	}
	var chkTodos = document.getElementById("chkTodos");
	chkTodos.checked = false;
	matrizChecks = [];
	//matrizChecksPos = [];
	listarOrdenAtencion(opcion);
	opcionfiltro = -1;
}

function configurarChecks() {
	var rdnDetalle = document.getElementsByName("rdnDetalle");
	var nCampos = rdnDetalle.length;
	var valorCheck;
	var valor;
	var rdnPrincipal;
	for (var x = 0; x < nCampos; x++) {
		rdnDetalle[x].onclick = function () {
			valor = this.id.split("rdn").join("").trim();
			if (this.checked) {
				matrizChecks.push(matriz[valor][0]);
				//matrizChecksPos.push((valor * 1))
			}
			else {
				if (matrizChecks.length > 0) {
					for (var x = 0; x < matrizChecks.length; x++) {
						if (matrizChecks[x] == this.getAttribute("data-check")) {
							matrizChecks.splice(x, 1);
							//matrizChecksPos.splice(x, 1);
							break;
						}
					}
					if (matrizChecks.length <= 0) {
						matrizChecks = [];
						//matrizChecksPos = [];
						document.getElementById("chkTodos").checked = false;
					}
				}

			}

		}
		if (matrizChecks.length > 0) {
			valorCheck = rdnDetalle[x].getAttribute("data-check");
			for (var y = 0; y < matrizChecks.length; y++) {
				if (matrizChecks[y] == valorCheck) {
					rdnDetalle[x].checked = true;
					break;
				}
			}
		}
	}
}

function formatoHora(objeto, event) {
	var v = objeto.value;
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (v.length < 3 && v.length > 0) {
		if (isNaN(v)) {
			objeto.value = v.substring(0, 1);
			return false;
		}
		else {
			if (keyCode != 8 && keyCode != 37 && keyCode != 39 && keyCode != 35 && keyCode != 36) {
				if ((v.charAt(0) * 1) < 3) {
					if (v.match(/[0-2]{1}?\d/g) !== null) {
						if ((objeto.value * 1) < 24) {
							objeto.value = v + ':';
							return false;
						}
						else {
							objeto.value = v.charAt(0);
							return false;
						}
					}
				}
				else {
					objeto.value = '';
					return false;
				}
			}
		}
	}
	else {
		if (v.indexOf(":") == -1) {
			objeto.value = v.substring(0, 2);
			return false;
		}
		else {
			if ((v.split(":")[1].charAt(0) * 1) < 6) {
				if (keyCode != 8 && keyCode != 37 && keyCode != 39 && keyCode != 35 && keyCode != 36) {
					if (v.match(/[0-5]{1}?\d/g) !== null) {
						if (v.length == 5 && isNaN(v.charAt(4))) {
							objeto.value = v.substring(0, v.length - 1);
							return false;
						} else {
							objeto.value = v;
							return false;
						}
					}
				}
			}
			else {
				objeto.value = v.split(":")[0] + ":";
				return false;
			}
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

function validarHora(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
				return 'Ingrese ' + Mensaje.toLowerCase();
			}
		}
		if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
			if (!esHora(Texto.value)) {
				return 'La ' + Mensaje + ' es inválida';
			}
		}
	}
	return "";
}

function esHora(Cadena) {
	if (Cadena.toLowerCase().indexOf(":") > -1) {
		var hora = Cadena.split(":");
		if (hora.length > 2) {
			return false;
		}
		else {
			if (isNaN(hora[0]) || isNaN(hora[1]) || hora[0] == "" || hora[1] == "") return false
			else return true;
		}
	}
	return false;
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


function validarFormulario() {
	var txtMasFechaPrestacion = document.getElementById("txtMasFechaPrestacion");
	var txtMasHoraPrestacion = document.getElementById("txtMasHoraPrestacion");
	var mensajeFecha = "";
	var mensajeHora = "";
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	if ((txtMasFechaPrestacion.value != "" && txtMasHoraPrestacion.value == "") || (txtMasFechaPrestacion.value == "" && txtMasHoraPrestacion.value != "")) {
		mensajeFecha = validarFecha(txtMasFechaPrestacion.id, "fecha", true);
		if (mensajeFecha != "") {
			mensajeValidacion[txtMasFechaPrestacion.getAttribute("data-secuencia")] = mensajeFecha;
			txtMasFechaPrestacion.className += " error";
		}
		mensajeHora = validarHora(txtMasHoraPrestacion.id, "hora", true);
		if (mensajeHora != "") {
			mensajeValidacion[txtMasHoraPrestacion.getAttribute("data-secuencia")] = mensajeHora;
			txtMasHoraPrestacion.className += " error";
		}
	}
	else {
		return true;
	}


	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}

}


var array_length;
/* to create MAX  array */
function heap_root(input, i, indice) {
	var left = 2 * i + 1;
	var right = 2 * i + 2;
	var max = i;

	if (left < array_length && input[left][indice] > input[max][indice]) {
		max = left;
	}

	if (right < array_length && input[right][indice] > input[max][indice]) {
		max = right;
	}

	if (max != i) {
		swap(input, i, max);
		heap_root(input, max);
	}
}

function swap(input, index_A, index_B) {
	var temp = input[index_A];

	input[index_A] = input[index_B];
	input[index_B] = temp;
}

function heapSort(input, indice) {

	array_length = input.length;

	for (var i = Math.floor(array_length / 2) ; i >= 0; i -= 1) {
		heap_root(input, i, indice);
	}

	for (i = input.length - 1; i > 0; i--) {
		swap(input, 0, i);
		array_length--;


		heap_root(input, 0, indice);
	}
	console.log(input);
}


function limpiarFiltros() {
	var Texto = document.getElementsByClassName("Texto");
	var Combo = document.getElementsByClassName("Combo");
	for (var x = 0; x < Texto.length; x++) {
		Texto[x].value = "";
	}

	for (var y = 0; y < Combo.length; y++) {
		Combo[y].selectedIndex = "0"
	}
}