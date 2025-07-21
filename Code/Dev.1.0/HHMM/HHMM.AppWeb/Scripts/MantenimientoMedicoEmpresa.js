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
var listaTipoMedico = [], listaSucursal = [], listaTipoServicioImpuesto = [];
var matrizPrincipal = [];
var matrizFiltroPrincipal = [];
var matrizMedicoSucursal = [];

var cabecerasPrincipal = ["Médico Id", "Sucursal", "Médico", "Tipo Persona", "Num. Doc.", "Doc. Fiscal", "Especialidad", "Empresa", "Tipo Médico", "Tipo Servicio Impuesto", "Correo Electrónico", "Correo Alterno", "Estado Médico"];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 7, 8, 9, 12, 10, 11, 6];
var anchosPrincipal = [5, 35, 70, 20, 10, 10, 50, 70, 20, 35, 40, 40, 15];
var anchosExcelPrincipal = [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80];


var registrosPagina = 10, paginasBloque = 5, indiceOrden = 0, urlBase = "", sucursalId = "", ss = "", opcionfiltro = -1, mensajeValidacion = [];

var indiceActualPagina = 0;
var indiceActualBloque = 0;
var matrizMensaje = [];

window.onload = function () {
	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	ConfiguracionInicial();
	var url = urlBase + "Mantenimiento/listarMedicoEmpresaMantenimiento?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarTodo);
};

function listarTodo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		listaTipoServicioImpuesto = [], listaTipoMedico = [], listaSucursal = [];
		listaTipoServicioImpuesto = crearMatriz(data[1].split("¯"), "¦");
		listaTipoMedico = crearMatriz(data[2].split("¯"), "¦");
		listaSucursal = crearMatriz(data[3].split("¯"), "¦");
		var listaMensaje = data[5].split("¯");

		for (var i = 0; i < listaMensaje.length; i++) {
			var m = listaMensaje[i].split("¦");
			matrizMensaje.push(m[1]);
		}
		document.getElementById("spnPEstado").textContent = matrizMensaje[0];
		llenarCombo(listaTipoMedico, "ddlTipoMedico", "0,1", "TODOS");
		llenarCombo(listaTipoServicioImpuesto, "ddlTipoServicioImpuesto", "0,1", "TODOS");
		llenarCombo(listaSucursal, "ddlTablSucursal", "1,1", "TODAS");
		llenarCombo(listaTipoMedico, "ddlPTipoMedico", "0,1", "Seleccione");
		llenarCombo(listaTipoServicioImpuesto, "ddlPTipoImpuesto", "0,1", "Seleccione");
		llenarCombo(listaSucursal, "ddlPSucursal", "0,1", "Todas");
		crearMatriz(data[0].split("¯"), "¦", "Principal");
		paginar(0, "Principal");
		matrizMedicoSucursal = data[4].split("¯");
		$$multiselect('divSucursal').create();
		var datosSucursales = data[3].split("¯");
		var nuevocontenido=[];
		for (var x = 2; x < datosSucursales.length; x++) {
			nuevocontenido.push(datosSucursales[x]);
		}
		$$multiselect('divSucursal').setListItems(nuevocontenido);
	}
}
function ConfiguracionInicial() {
	crearTabla("Principal");
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
        i = 0;
	identificador = (identificador == undefined ? "" : identificador);
	if (nRegistros > 0 && lista[0] != "") {
		for (; i < nRegistros; i++) {
			campos = lista[i].split(separador);
			nCampos = campos.length;
			matriz[x] = [];
			switch (identificador) {
				case "Principal":
					if (x == 10) {
						var a = "";
					}
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 3 || j == 4 || j == 5) {
							switch (j) {
								case 3:
									if (campos[j].indexOf("N")>-1) {
										matriz[x][j] = "NATURAL";
									}
									else if (campos[j].indexOf("J")>-1) {
										matriz[x][j] = "JURIDICA";
									}
									else {
										matriz[x][j] = "";
									}
									break;
								default:
									matriz[x][j] = campos[j].trim();
									break;
							}
						}
						else matriz[x][j] = campos[j] * 1;
					}

					break;
				default:
					for (; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "") matriz[x][j] = campos[j].trim();
						else matriz[x][j] = campos[j] * 1;
					}
					break;
			}
			j = 0;
			x++;
		}
		if (identificador != "") {
			window["matriz" + identificador] = [];
			window["matrizFiltro" + identificador] = [];
			window["matriz" + identificador] = matriz.slice(0);
			window["matrizFiltro" + identificador] = matriz.slice(0);
		}
		else {
			return matriz;
		}
	} else {
		if (identificador != "") {
			window["matriz" + identificador] = [];
			window["matrizFiltro" + identificador] = [];
		} else {
			return matriz;
		}
	}
}


function crearTabla(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	var contaColspan = 0;
	switch (identificador) {
		case "Principal":
			contenido = "<table class='tabla-general' style='table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera cPrincipal'><th style='width:2px;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
			contaColspan++;
			break;
	}
	for (var j = 0; j < nCampos; j++) {
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
			case 1:
				contenido += "<select class='Combo";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%' id='ddlTablSucursal'>";
				contenido += "</select>";
				break;
			case 3:
				contenido += "<select class='Combo";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%' id='ddlTipoPersona'><option value=''>TODOS</option><option value='JURIDICA'>JURIDICA</option><option value='NATURAL'>NATURAL</option>";
				contenido += "</select>";
				break;
			case 8:
				contenido += "<select class='Combo";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%' id='ddlTipoMedico'>";
				contenido += "</select>";
				break;
			case 9:
				contenido += "<select class='Combo";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%' id='ddlTipoServicioImpuesto'>";
				contenido += "</select>";
				break;
			case 12:
				contenido += "<select class='Combo";
				contenido += identificador;
				contenido += "' name='cabecera";
				contenido += identificador;
				contenido += "' style='width:90%'>";
				contenido += "<option value=''>Todos</option><option value='ACTIVO'>ACTIVO</option><option value='INACTIVO'>INACTIVO</option>";
				contenido += "</select>";
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
	}
	//switch (identificador) {
	//	case "Principal":
	//		contenido += "<th style='width:5%;vertical-align:middle;text-align:center'><a id='aExportarExcel' href='#'><i class='Icons fa-file-excel-o'></i></a></th>";
	//		contaColspan++;
	//		break;
	//}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos + contaColspan).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos + contaColspan).toString();
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
			paginar(indiceActualPagina, "Principal");
		};
	}
}


function configurarControles() {
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

	var btngrabarMedico = document.getElementById("btngrabarMedico");
	btngrabarMedico.onclick = function () {
		if (validarMantenimiento()) {
			var ddlPSucursal = document.getElementById("ddlPSucursal").value.trim();
			var txtPCodigo = document.getElementById("txtPCodigo").value;
			var ddlPTipoMedico = document.getElementById("ddlPTipoMedico").value;
			var txtPCorreoElectronico = document.getElementById("txtPCorreoElectronico").value.trim();
			var txtPCorreoAlterno = document.getElementById("txtPCorreoAlterno").value.trim();
			var ddlPTipoImpuesto = document.getElementById("ddlPTipoImpuesto").value;
			var lstsucursal = $$multiselect('divSucursal').getValues();
			var estweb = document.getElementById("cboPEstadoWeb").value;
			var lista = txtPCodigo + "|" + ddlPTipoMedico + "|" + txtPCorreoElectronico + "|" + txtPCorreoAlterno + "|" + ddlPTipoImpuesto + "|" + ddlPSucursal + "|" + lstsucursal + "|" + estweb;

			var url = urlBase + "Mantenimiento/ActualizarMedicoEmpresaMantenimiento?ss=" + ss + "&su=" + sucursalId;
			$.ajax(url, "post", mostrarRespuesta,lista);
		}
	}

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		if (matrizPrincipal.length > 0) {
			this.href = "";
			var excelExportar = exportacion("Principal");
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "MedicoEmpresa.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
}


function mostrarRespuesta(rpta) {
	abrirPopup('PopupMedicoEmpresa');
	if (rpta != "") {
		listarTodo(rpta);
		mostraralerta("Se ha actualizado los datos del médico");
	}
	else {
		mostraralerta("No se puede actualizar el médico");
	}
}


function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoPrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {			
			limpiarEnlaces("Principal");
			filtrar("Principal");
			
		};
	}
	var combos = document.getElementsByClassName("ComboPrincipal");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {			
			limpiarEnlaces("Principal");
			filtrar("Principal");
			
		};
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
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(Elemento);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	var matrizClon;
	if (validado) {
		matrizClon = window["matriz" + Elemento].slice(0);
		window["matriz" + Elemento] = [];
		window["matriz" + Elemento] = mergeSort(matrizClon, indiceOrden, tipoOrden);
	} else {
		matrizClon = window["matriz" + Elemento].reverse();
		window["matriz" + Elemento] = [];
		window["matriz" + Elemento] = matrizClon.slice(0);
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
		if (left[0][indice] >= right[0][indice]) {
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
function filtrar(identificador) {
	opcionfiltro = -1;
	var cabeceras = document.getElementsByName("cabecera" + identificador);
	var nCabeceras = cabeceras.length;
	var cabecera, exito = true,
        campos, nCampos = 0;
	window["matriz" + identificador] = [];
	var matriz = window["matrizFiltro" + identificador].slice(0);
	var nRegistros = matriz.length;
	var x = 0,
        i = 0,
        j = 0;
	var indice;
	for (; i < nRegistros; i++) {
		campos = matriz[i];
		nCampos = campos.length;
		for (; j < nCabeceras; j++) {
			exito = true;
			cabecera = cabeceras[j];
			indice = window["matrizIndice" + identificador][j];
			if (cabecera.className == ("Texto" + identificador)) exito = exito && (campos[indice].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[indice] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador][x] = [];
			window["matriz" + identificador][x] = matriz[i].slice(0);
			x++;
		}
		j = 0;
	}
	paginar(-1, identificador);
	indiceActualBloque = 0;
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
	mostrarMatriz(indicePagina, identificador);
}

function mostrarMatriz(indicePagina, identificador) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = window["matriz" + identificador].length;
	var esBloque = (indicePagina < 0);
	var nCampos = window["cabeceras" + identificador].length;
	if (n > 0) {
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador) {
			case "Principal":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='escogerOpcion(";
						contenido += i;
						contenido += ")'></span></td>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								case 8:
									contenido += "<td style='word-break:break;'>";
									for (var x = 0; x < listaTipoMedico.length; x++) {
										if (listaTipoMedico[x][0] == window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]) {
											contenido += listaTipoMedico[x][1];
											break;
										}
									}
									break;
								case 9:
									contenido += "<td style='word-break:break;'>";
									for (var x = 0; x < listaTipoServicioImpuesto.length; x++) {
										if (listaTipoServicioImpuesto[x][0] == window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]) {
											contenido += listaTipoServicioImpuesto[x][1];
											break;
										}
									}
									break;
								default:
									contenido += "<td style='word-break:break;'>";
									contenido += window["matriz" + identificador][i][window["matrizIndice" + identificador][j]];
									break;
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}

				break;
		}
	} else {
		var nCabecerasColspan = document.getElementsByClassName("c" + identificador);
		var ncolspan = nCabecerasColspan[0].getElementsByTagName("TH");
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (ncolspan.length).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
}

function escogerOpcion(valor) {
	limpiarFormulario();
	var hdfCd = document.getElementById("hdfCd");
	hdfCd.value = matrizPrincipal[valor][0];
	document.getElementById("txtPCodigo").value = matrizPrincipal[valor][0];
	document.getElementById("ddlPSucursal").value = matrizPrincipal[valor][13];
	document.getElementById("txtPMedico").value = matrizPrincipal[valor][2];
	document.getElementById("txtPEmpresa").value = matrizPrincipal[valor][8];
	document.getElementById("txtPTipoPersona").value = matrizPrincipal[valor][3];
	document.getElementById("txtPEspecialidad").value = matrizPrincipal[valor][7];
	document.getElementById("txtPNumDoc").value = matrizPrincipal[valor][4];
	document.getElementById("txtPDocFiscal").value = matrizPrincipal[valor][5];
	document.getElementById("ddlPTipoMedico").value = matrizPrincipal[valor][9];
	var encontrado = false;
	for (var x = 0; x < listaTipoServicioImpuesto.length; x++) {
		if (listaTipoServicioImpuesto[x][0] == matrizPrincipal[valor][12]) {
			encontrado = true;
			break;
		}
	}
	if (encontrado) {
		document.getElementById("ddlPTipoImpuesto").value = matrizPrincipal[valor][12];
	}
	document.getElementById("txtPCorreoElectronico").value = matrizPrincipal[valor][10];
	document.getElementById("txtPCorreoAlterno").value = matrizPrincipal[valor][11];
	document.getElementById("txtPEstado").value = matrizPrincipal[valor][6];
	document.getElementById("cboPEstadoWeb").value = matrizPrincipal[valor][14];

	$$multiselect('divSucursal').reset();
	$$multiselect('divSucursal').setValues(obtenerSucursalMedico(matrizPrincipal[valor][0]));
	abrirPopup('PopupMedicoEmpresa');
}
function obtenerSucursalMedico(id) {
	
	var n = matrizMedicoSucursal.length;
	var campos,lista=[],compossig;
	for (var i = 0; i < n; i++) {
		campos = matrizMedicoSucursal[i].split("¦");
		if (id == campos[0]) {
			if (lista.indexOf(campos[1].trim()) == -1) {
				lista.push(campos[1].trim());
			}

			if (matrizMedicoSucursal[i + 1] != undefined) {
				compossig = matrizMedicoSucursal[i + 1].split("¦");
				if (compossig[0] != id) { break;}
			}
		}
	}
	return lista;
}

function crearPaginas(identificador) {
	var nRegistros = window["matriz" + identificador].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
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
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + identificador + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + identificador + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + identificador).innerHTML = "";
	} else {
		document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
		seleccionarPaginaActual(identificador);
	}
}

function seleccionarPaginaActual(identificador) {
	var aPagina = document.getElementById("a" + identificador + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function validarMantenimiento() {
	var ddlPTipoMedico = document.getElementById("ddlPTipoMedico");
	var ddlPTipoImpuesto = document.getElementById("ddlPTipoImpuesto");
	var txtPCorreoElectronico = document.getElementById("txtPCorreoElectronico");
	var txtPCorreoAlterno = document.getElementById("txtPCorreoAlterno");
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	var mensaje = "";
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	mensaje = validarCombo(ddlPTipoMedico.id, "Tipo Médico", true);
	if (mensaje != "") {
		mensajeValidacion[ddlPTipoMedico.getAttribute("data-secuencia")] = mensaje;
		ddlPTipoMedico.className += " error";
	}
	mensaje = "";
	mensaje = validarCombo(ddlPTipoImpuesto.id, "Tipo Impuesto", true);
	if (mensaje != "") {
		mensajeValidacion[ddlPTipoImpuesto.getAttribute("data-secuencia")] = mensaje;
		ddlPTipoImpuesto.className += " error";
	}
	mensaje = "";
	mensaje = validarEmail(txtPCorreoElectronico.id, "Correo Electrónico", true);
	if (mensaje != "") {
		mensajeValidacion[txtPCorreoElectronico.getAttribute("data-secuencia")] = mensaje;
		txtPCorreoElectronico.className += " error";
	}
	mensaje = "";
	mensaje = validarEmail(txtPCorreoAlterno.id, "Correo Electrónico", false);
	if (mensaje != "") {
		mensajeValidacion[txtPCorreoAlterno.getAttribute("data-secuencia")] = mensaje;
		txtPCorreoAlterno.className += " error";
	}

	var divSucursal = document.getElementById("divSucursal");
	var lstsucursal = $$multiselect('divSucursal').getValues();
	if (lstsucursal == "") {
		divSucursal.className += " error";
		mensajeValidacion[1] = "Seleccione sucursal";
	} else {
		divSucursal.className = divSucursal.className.split("error").join();
	}
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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

function llenarCombo(lista, nombreCombo, indices, titulo) {
	var contenido = "",
        n = lista.length,
        campos = "",
        posicion = indices.split(",");
	if (n > 0) {
		if (titulo != undefined && titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
		}
		for (var x = 0; x < n; x++) {
			campos = lista[x];
			contenido += "<option value='" + campos[posicion[0] * 1] + "'>" + campos[posicion[1] * 1] + "</option>";
		}

		var cbo = document.getElementById(nombreCombo);
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
}

function formatearNumero(valor) {
	var valorFrm;
	if (!isNaN(valor * 1)) {
		var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		valorFrm = valor.toLocaleString("en-US", frmMoneda);
	} else {
		valorFrm = "0.00";
	}
	return valorFrm;
}

function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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

function limpiarFormulario() {
	var limpiar = document.getElementsByName("limpiar");
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
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
	var divSucursal = document.getElementById("divSucursal");
		divSucursal.className = divSucursal.className.split("error").join();

}

function exportacion(identificador) {
	var matriz = window["matriz" + identificador];
	var matrizCabecera = window["cabeceras" + identificador];
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var nCampos = matrizCabecera.length;
	contenido.push("<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: " + window["anchosExcel" + identificador] + "px' align='left'>" + matrizCabecera[x] + "</td>");
	}
	contenido.push("</tr>");
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			switch (j) {
				case 8:
					contenido.push("<td>");
					for (var x = 0; x < listaTipoMedico.length; x++) {
						if (listaTipoMedico[x][0] == window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]) {
							contenido.push(listaTipoMedico[x][1]);
							break;
						}
					}
					break;
				case 9:
					contenido.push("<td>");
					for (var x = 0; x < listaTipoServicioImpuesto.length; x++) {
						if (listaTipoServicioImpuesto[x][0] == window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]) {
							contenido.push(listaTipoServicioImpuesto[x][1]);
							break;
						}
					}
					break;
				default:
					contenido.push("<td style='text-align:left'>");
					contenido.push(window["matriz" + identificador][i][window["matrizIndice" + identificador][j]]);
					break;
			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");

	}
	return (contenido.join("") + "</table></html>");
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