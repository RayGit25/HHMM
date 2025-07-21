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

var matrizPrincipal = [];
var matrizFiltroPrincipal = [];
var listaPeriodo = [], listaEspecialidad = [], listaSucursal = [];

var cabecerasPrincipal = ["Descripción", "Estado", "Usuario Creador", "Fecha Hora Creación", "Usuario Modificador", "Fecha Hora Modificación"];
var matrizIndicePrincipal = [1, 2, 3, 4, 5, 6];
var anchosPrincipal = [250, 120, 200, 150, 200, 150];
var anchosExcelPrincipal = [250, 120, 200, 150, 200, 150];


var registrosPagina = 10;
var paginasBloque = 5;
var indiceOrden = 0;
var indiceActualPaginaPrincipal = -1;
var indiceActualBloquePrincipal = 0;

var urlBase = "", opcionfiltro = -1, opcionPopUp = -1, ss = "", Campoeliminar = "", IdInterfaceActual = -1;
var sucursal, sucursalId;
var matrizMensaje = [];

window.onload = function () {
	urlBase = window.parent.document.getElementById("Ref").value;
	ss = window.parent.document.getElementById("iss").value;
	sucursalId = window.top.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.top.document.getElementById("isuc").value.split("|")[1];

	ConfiguracionInicial();
	var url = urlBase + "Mantenimiento/listasReplicaProceso?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", ObtenerListas);
	var meses = ["¦Todos", "01¦Enero", "02¦Febrero", "03¦Marzo", "04¦Abril", "05¦Mayo", "06¦Junio", "07¦Julio", "08¦Agosto", "09¦Septiembre", "10¦Octubre", "11¦Noviembre", "12¦Diciembre"];
	var entidad = ['0¦Todos', '1¦Medico/Empresa', '2¦Compañia', '3¦Sucursal', '4¦Clasificador de Movimiento', '5¦Consultorio',
					'6¦Tipo Documento', '7¦Tipo Documento Pago', '8¦Tipo Pago', '9¦Especialidad', '10¦Medico Especialidad', '11¦Tipo Servicio Impuesto',
					'12¦Tipo Atencion', '13¦Tipo Paciente', '14¦Aseguradora', '15¦Contrato', '16¦Tipo Orden Atencion', '17¦Componente', '18¦Componente Sucursal',
					'19¦Articulo Linea', '20¦Articulo Familia', '21¦Articulo Sub Familia', '22¦Articulo', '23¦Plan Cuenta Contable', '24¦Tipo de Cambio',
					'25¦Estado Documento', '26¦CentroCosto'];
	llenarComboMes(meses, "cboMes", true);
	llenarComboMes(entidad, "cboEntidad");
};
function llenarComboMes(lista, id, fecha) {
	var n = lista.length, cmp, html = "";
	for (var i = 0; i < n; i += 1) {
		cmp = lista[i].split("¦");
		html += "<option value='" + cmp[0];
		html += "'>" + cmp[1];
		html += "</option>";
	}
	var cbo = document.getElementById(id);
	cbo.innerHTML = html;

	if (fecha) {
		var fecha = new Date();
		var mes = fecha.getMonth() + 1;
		cboMes.value = (mes > 9 ? mes : ("0" + mes));
	}

}

function ConfiguracionInicial() {
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
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
				var matrizEnteros = [0];
				nCampos = matrizEnteros.length;
				for (; i > 0; i--) {
					for (; j < nCampos; j++) {
						matriz[x][matrizEnteros[j]] = matriz[x][matrizEnteros[j]] * 1;
					}
					j = 0;
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
			contenido = "<table class='tabla-general' style='table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'><th style='text-align:center;vertical-align:middle;width:20px'><span id='aAdicionar' class='Icons fa-plus' style='cursor: pointer' title='Adicionar Usuario'></span></th>";
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
						contenido += "' style='width:90%' id='ddlEstado'>";
						contenido += "<option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option>";
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
				break;
		}
		contenido += "</th>";
	}
	contenido += "<th style='vertical-align:middle;width:50px;text-align:center'><a href='#' class='Icons fa-file-excel-o' style='cursor: pointer' title='Exportar Excel' id='aExportarExcel'></a></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos + 2).toString();
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
			limpiarCampos();
			document.getElementById("TituloPopupPeriodo").innerHTML = matrizMensaje[1];
			document.getElementById("hdfOpc").value = "1";
			document.getElementById("txtDescripcion").focus();
			abrirPopup('PopupPeriodo');
		}
	}

	var btngrabar = document.getElementById("btngrabar");
	btngrabar.onclick = function () {
		if (validarReplicaProceso()) {
			//this.style.pointerEvents = "none";
			//grabarUsuario();
			//this.innerHTML = "Grabando&nbsp;&nbsp;<span class='Icons fa-refresh cargando'></span>";
			//this.disabled = true;
			//BotonActivo = this.id;
			grabarPeriodo();
		}

	}


	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var id = matrizPrincipal[Campoeliminar][0];
		var estado = matrizPrincipal[Campoeliminar][4];
		var ss = window.parent.document.getElementById("iss").value;
		var txtAnio = document.getElementById("txtAnio").value;
		var cboEstado = document.getElementById("cboEstado").value;
		var url = urlBase + "Mantenimiento/anularInterfaseMaestrosSpring/?ss=" + ss + "&id=" + id + "&est=" + (cboEstado == "A" ? "I" : "A") + "&anio=" + txtAnio + "&estado=" + cboEstado;
		$.ajax(url, "get", EstadosInterface);
	}

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		var txtAnio = document.getElementById("txtAnio").value;
		var cboEstado = document.getElementById("cboEstado").value;
		var cboMes = document.getElementById("cboMes").value;
		var url = urlBase + "Mantenimiento/listarInterfaseMaestrosSpring?ss=" + ss + "&anio=" + (txtAnio + cboMes) + "&estado=" + cboEstado;
		$.ajax(url, "get", listarTodo);
		indiceActualPaginaPrincipal = 0;
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.disabled = true;
		this.pointerEvents = "none";
	}
	var btnIProcesar = document.getElementById("btnIProcesar");
	btnIProcesar.onclick = function () {
		var cboEntidad = document.getElementById("cboEntidad").value;

		var url = urlBase + "Mantenimiento/procesoInterfaseMaestro?ss=" + ss + "&entidad=" + cboEntidad + "&interfasid=" + IdInterfaceActual;
		$.ajax(url, "get", mostrarRptaMaestro);
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.onclick = null;
	}

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		if (matrizPrincipal.length > 0) {
			var contenido = exportacion();
			var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
			this.download = "InterfaseMaestroSpring.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
}
function mostrarRptaMaestro(rpta) {
	var btnIProcesar = document.getElementById("btnIProcesar");
	btnIProcesar.innerHTML = "Procesar";
	btnIProcesar.onclick = function () {
		var cboEntidad = document.getElementById("cboEntidad").value;

		var url = urlBase + "Mantenimiento/procesoInterfaseMaestro?ss=" + ss + "&entidad=" + cboEntidad + "&interfasid=" + IdInterfaceActual;
		$.ajax(url, "get", mostrarRptaMaestro);
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		this.onclick = null;
	}
	abrirPopup('PopupInterface');
	if (rpta != "-1" && rpta != "") {
		mostraralerta("Se ha actualizado el proceso con éxito");
	} else {
		mostraralerta("Error al procesar");
	}
	document.getElementById("btnBuscar").click();
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
				var encontrado = false;
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";
						for (var x = 0; x < listaPeriodo.length; x++) {
							if (listaPeriodo[x][0] == matriz[i][7]) {
								encontrado = true;
								break;
							}
						}
						if (encontrado) {
							contenido += "<a href='#' class='Icons fa-edit' onclick='buscarReplicaProceso(";
							contenido += i;
							contenido += ");' style='cursor: pointer;display:" + (matriz[i][7] == 'ANU' ? 'none' : 'inline') + " title='Editar Usuario'/>";
						}
						
						contenido += "</td>";
						contenido2 = "";
						for (var j = 0; j < nCampos; j++) {

							switch (j) {
								case 1:
									contenido2 += "<td>";
									switch (matriz[i][matrizIndice[j]]) {
										case "A":
											contenido2 += "ACTIVO";
											break;
										case "I":
											contenido2 += "INACTIVO";
											break;
									}
									break;
								case 5:
									contenido2 += "<td>";
									contenido2 += (matriz[i][matrizIndice[j]].toString().trim().indexOf("1900")>-1?"":matriz[i][matrizIndice[j]].toString().trim());
									break;
								default:
									contenido2 += "<td>";
									contenido2 += matriz[i][matrizIndice[j]].toString().trim();
									break;
							}
							contenido2 += "</td>";
						}
						contenido += contenido2;
						if (matriz[i][2] == "A") {
							contenido += "<td style='text-align:center'>";
							if (encontrado) {
								contenido += "<a href='#' class='" + (matriz[i][2] == "I" ? "Icons fa-check" : "Icons fa-trash-o") + "' onclick='Campoeliminar=\"";
								contenido += i;
								contenido += "\";abrirPopup(\"PopupEstado\");' title='" + (matriz[i][2] == 'A' ? 'INACTIVO' : 'ACTIVO') + "'></a>&nbsp;";
								contenido += "<span class='Icons fa-cogs' onclick='listarInterfacePopUp(";
								contenido += i;
								contenido += ")'></span>";
							}
							contenido += "</td>";
						} else {
							contenido += "<td style='text-align:center'>";
							if (encontrado) {
								contenido += "<a href='#' class='" + (matriz[i][2] == "I" ? "Icons fa-check" : "Icons fa-trash-o") + "' onclick='Campoeliminar=\"";
								contenido += i;
								contenido += "\";abrirPopup(\"PopupEstado\");' title='" + (matriz[i][2] == 'A' ? 'INACTIVO' : 'ACTIVO') + "'></a>";
							}
							contenido += "</td>";
						}
						encontrado = false;
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
		contenido += (nCampos + 2).toString();
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


/***************CALL BACKS***************/

function listarTodo(rpta) {
	document.getElementById("divPrincipal").style.display = "";
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.innerHTML = "Buscar";
	btnBuscar.disabled = false;
	btnBuscar.pointerEvents = "auto";
	if (rpta != "") {
		var data = rpta.split("¯");
		crearMatriz(data[0].split("¬"), "¦", "Principal");
		paginar(indiceActualPaginaPrincipal, "Principal");
	} else {
		matrizPrincipal = [], matrizFiltroPrincipal = [];
		paginar(-1, "Principal");
	}

}

function ObtenerListas(rpta) {
	if (rpta != "") {
		var datos = rpta.split("¯");
		listaPeriodo = crearMatriz(datos[0].split("¬"), "¦");
		listaEspecialidad = crearMatriz(datos[1].split("¬"), "¦");
		listaSucursal = crearMatriz(datos[2].split("¬"), "¦");
		var listaMensaje = datos[3].split("¬");

		for (var i = 0; i < listaMensaje.length; i++) {
			var m = listaMensaje[i].split("¦");
			matrizMensaje.push(m[1]);
		}
		document.getElementById("divCabecera").textContent = matrizMensaje[0];
		llenarCombo(listaPeriodo, "cboPeriodo", "0,1", "Seleccione");
		llenarCombo(listaSucursal, "cboISucursal", "0,1", "Todos");
		llenarCombo(listaEspecialidad, "cboIEspecialidad", "0,1", "Todos");

	}
}

function mostrarGrabar(rpta) {
	if (rpta != "") {
		if (rpta != "-1") {
			//listarTodo(rpta);
			abrirPopup('PopupPeriodo');
			limpiarCampos();
			var hdfOpc = document.getElementById("hdfOpc").value;
			if (hdfOpc == "1") mostraralerta("Se ha adicionado el proceso con éxito");
			else mostraralerta("Se ha actualizado el proceso con éxito");
		}
		else {
			mostraralerta("Ya existe proceso creado para el periodo");
		}
	}
	else {
		mostraralerta("Ha ocurrido un error");
	}
	document.getElementById("btnBuscar").click();
}

function listarBusquedaProceso(rpta) {
	if (rpta != "") {
		var datos = rpta.split("¦");
		if (datos[0] == "0") {
			mostraralerta(datos[1]);
			var desabiPop = document.getElementsByClassName("desabiPop");
			for (var x = 0; x < desabiPop.length; x++) {
				desabiPop[x].style.pointerEvents = "auto";
				desabiPop[x].disabled = false;
			}
			var btnIBuscar = document.getElementById("btnIBuscar");
			btnIBuscar.innerHTML = "Procesar";
			document.getElementById("btnBuscar").click();
		}
		else {
			if (datos[2] == "6") {
				abrirPopup('PopupInterface');
				mostraralerta(datos[1]);
				var desabiPop = document.getElementsByClassName("desabiPop");
				for (var x = 0; x < desabiPop.length; x++) {
					desabiPop[x].style.pointerEvents = "auto";
					desabiPop[x].disabled = false;
				}
				var btnIBuscar = document.getElementById("btnIBuscar");
				btnIBuscar.innerHTML = "Procesar";
			}
			else {
				var lista = "";
				var txtIPeriodo = document.getElementById("txtIPeriodo").value;
				var hdfMedico = document.getElementById("hdfMedico").value;
				var cboISucursal = document.getElementById("cboISucursal").value;
				var cboIEspecialidad = document.getElementById("cboIEspecialidad").value;
				var txtIOA = document.getElementById("txtIOA").value;
				lista += IdInterfaceActual + "¦" + txtIPeriodo + "¦" + cboISucursal + "¦" + hdfMedico + "¦" + (cboIEspecialidad == "" ? 0 : cboIEspecialidad) + "¦" + txtIOA;
				var url = urlBase + "Mantenimiento/procesarReplicaProceso?ss=" + ss + "&sec=" + datos[2];
				$.ajax(url, "post", listarBusquedaProceso, lista);
				mostraralerta(datos[1], true);
			}
		}
	}
	else {
		mostraralerta("No se encontraron datos");
	}
}

/**************FUNCIONES DE ACCION**************/

function grabarPeriodo() {
	var lista = "";
	var opc = document.getElementById("hdfOpc").value;
	var txtDescripcion = document.getElementById("txtDescripcion").value;
	var cboPeriodo = document.getElementById("cboPeriodo").value;
	var lista = txtDescripcion + "¦" + cboPeriodo;
	//for (var x = 0; x < listaPeriodo.length; x++) {
	//	if (listaPeriodo[x][0] == cboPeriodo) {
	//		lista += "¦" + listaPeriodo[x][2] + "¦" + listaPeriodo[x][3];
	//		break;
	//	}
	//}
	var ss = window.parent.document.getElementById("iss").value;
	var txtAnio = document.getElementById("txtAnio").value;
	var cboEstado = document.getElementById("cboEstado").value;
	if (opc == 1) {
		var url = urlBase + "Mantenimiento/GrabarInterfaseMaestrosSpring?ss=" + ss + "&anio=" + txtAnio + "&estado=" + cboEstado + "&opc=1";
		$.ajax(url, "post", mostrarGrabar, lista);
	}
	else {
		lista += "¦" + document.getElementById('hdfReplicaProcesoId').value;
		var url = urlBase + "Mantenimiento/GrabarInterfaseMaestrosSpring?ss=" + ss + "&anio=" + txtAnio + "&estado=" + cboEstado + "&opc=2";
		$.ajax(url, "post", mostrarGrabar, lista);
	}
}

function buscarUsuario(id) {
	limpiarCampos();
	var matriz = matrizPrincipal[id];
	var hdfUsuarioId = document.getElementById("hdfUsuarioId");
	var txtUsuario = document.getElementById("txtUsuario");
	var txtNombre = document.getElementById("txtNombre");
	var txtApPaterno = document.getElementById("txtApPaterno");
	var txtApMaterno = document.getElementById("txtApMaterno");
	var txtFecNacimiento = document.getElementById("txtFecNacimiento");
	var cboTipoDocumento = document.getElementById("cboTipoDocumento");
	var txtNroDocumento = document.getElementById("txtNroDocumento");
	var txtCorreo = document.getElementById("txtCorreo");
	var cboPerfil = document.getElementById("cboPerfil");
	hdfUsuarioId.value = matriz[0];
	txtUsuario.value = matriz[1];
	txtNombre.value = matriz[2];
	txtApPaterno.value = matriz[3];
	txtApMaterno.value = matriz[4];
	txtFecNacimiento.value = matriz[10];
	cboTipoDocumento.value = matriz[11];
	cboTipoDocumento.onchange();
	txtNroDocumento.value = matriz[12];
	txtCorreo.value = matriz[13];
	cboPerfil.value = matriz[5];
	document.getElementById("TituloPopupUsuarios").innerHTML = "ACTUALIZAR USUARIO";
	document.getElementById("hdfOpc").value = "2";
	abrirPopup('PopupUsuarios');
	var chkCompania = document.getElementsByName("chkCompania");
	if (chkCompania.length > 0) {
		for (var x = 0; x < chkCompania.length; x++) {
			for (var y = 0; y < matrizSucursal.length; y++) {
				if (ObjLista.listaCompania[chkCompania[x].getAttribute("data-id")][0] == matrizSucursal[y][1] && matrizSucursal[y][0] == matriz[0]) {
					chkCompania[x].click();
					var chkSucursal = document.getElementsByName("chkSucursal");
					if (chkSucursal.length > 0) {
						for (var w = 0; w < matrizSucursal.length; w++) {
							for (var z = 0; z < chkSucursal.length; z++) {
								if (ObjLista.listaCompania[chkCompania[x].getAttribute("data-id")][0] == matrizSucursal[w][1] && ObjLista.listaSucursal[chkSucursal[z].getAttribute("data-id")][0] == matrizSucursal[w][3] && matrizSucursal[w][0] == matriz[0]) {
									chkSucursal[z].click();
									break;
								}
							}
						}
					}
					break;
				}
			}
		}
	}
}

function buscarReplicaProceso(id) {
	limpiarCampos();
	document.getElementById("TituloPopupPeriodo").innerHTML = matrizMensaje[2];
	document.getElementById("txtDescripcion").value = matrizPrincipal[id][1];
	var cbo = document.getElementById("cboPeriodo");
	var option = cbo.options, n = option.length, existe = false;
	for (var i = 0; i < n; i += 1) {
		if (option[i].value == matrizPrincipal[id][7]) {
			existe = true;
			break;
		}
	}
	//if (existe) {
	//	cbo.value = matrizPrincipal[id][7];
	//} else {
	//	var html = "<option value='" + matrizPrincipal[id][8] + "'>" + matrizPrincipal[id][8].toString().substring(0, 4) + "-" + matrizPrincipal[id][8].toString().substring(4) + "</option>";
	//	cbo.insertAdjacentHTML("beforeend", html);
	//}
	cbo.value = matrizPrincipal[id][7];

	document.getElementById("txtEstado").value = (matrizPrincipal[id][2] == "A" ? "ACTIVO" : "INACTIVO");
	document.getElementById("hdfReplicaProcesoId").value = matrizPrincipal[id][0];
	document.getElementById("hdfOpc").value = "2";
	document.getElementById("txtDescripcion").focus();
	abrirPopup('PopupPeriodo');
}

function listarInterfacePopUp(id) {

	window.top.validarPermisoParametro(matrizMensaje[3]).then(function (d) {

		if (d == "" || d == "1") {

			var limpiar = document.getElementsByName("limpiarPop");
			for (var y = 0; y < limpiar.length; y++) {
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
			IdInterfaceActual = matrizPrincipal[id][0];
			abrirPopup('PopupInterface');

		}

	});

}

function EstadosInterface(rpta) {
	if (rpta != "") {
		if (rpta != "-1") {
			//listarTodo(rpta);
			abrirPopup('PopupEstado');
			var hdfOpc = document.getElementById("hdfOpc").value;
			mostraralerta("Se ha actualizado el estado");
		}
		else {
			mostraralerta("No se ha podido actualizar el estado");
		}
	} else {
		mostraralerta("No se ha podido actualizar el estado");
	}
	document.getElementById("btnBuscar").click();
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

function validarReplicaProceso() {

	var txtDescripcion = document.getElementById("txtDescripcion");
	var cboPeriodo = document.getElementById("cboPeriodo");

	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeDescripcion = validarTexto(txtDescripcion.id, "descripción", true);
	if (mensajeDescripcion != "") {
		mensajeValidacion[txtDescripcion.getAttribute("data-secuencia")] = mensajeDescripcion;
		txtDescripcion.className += " error";
	}

	var mensajePeriodo = validarCombo(cboPeriodo.id, "periodo", true);
	if (mensajePeriodo != "") {
		mensajeValidacion[cboPeriodo.getAttribute("data-secuencia")] = mensajePeriodo;
		cboPeriodo.className += " error";
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

function llenarCombo(lista, nombreCombo, indice, titulo, separador) {
	var contenido = "", n = lista.length, campo;
	var pos = indice.split(",");
	if (n > 0) {
		if (titulo != undefined || titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
		}
		for (var x = 0; x < n; x++) {
			campos = (separador != undefined && separador != "" ? lista[x].split(separador) : lista[x]);
			contenido += "<option value='" + campos[pos[0]] + "'>" + campos[pos[1]] + "</option>";
		}

		var cbo = document.getElementById(nombreCombo);
		if (cbo != null) {
			cbo.innerHTML = contenido;
		}
	}
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function validarSoloNumero(event) {
	var keyCode = ('which' in event) ? event.which : event.keyCode;
	if (keyCode < 48 || keyCode > 57) {
		if (keyCode != 8 && keyCode != 9 && keyCode != 0) {
			event.preventDefault();
		}
	}
}

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

function limpiarCampos() {
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	document.getElementById("txtDescripcion").value = "";
	document.getElementById("cboPeriodo").selectedIndex = "0";
	document.getElementById("txtEstado").value = "ACTIVO";
	document.getElementById("hdfReplicaProcesoId").value = "-1";
}

function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 120px'>Sucursal</td>";
	cabecera += "<td style='width: 80px'>Contrato</td>";
	cabecera += "<td style='width: 80px'>Inicio</td>";
	cabecera += "<td style='width: 80px'>Fin</td>";
	cabecera += "<td style='width: 250px'>Medico/Empresa</td>";
	cabecera += "<td style='width: 250px'>Observación</td>";
	cabecera += "<td style='width: 60px'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matrizPrincipal.length;
	var nCampos = cabecerasPrincipal.length;
	var contenido = [];

	contenido.push("<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: "+anchosExcelPrincipal[x]+"px'>"+cabecerasPrincipal[x]+"</td>");
	}
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			contenido.push("<td>");
			switch (j) {
				case 1:
					
					switch (matrizPrincipal[i][matrizIndicePrincipal[j]]) {
						case "A":
							contenido.push("ACTIVO");
							break;
						case "I":
							contenido.push("INACTIVO");
							break;
					}
					break;
				case 5:
					contenido.push(matrizPrincipal[i][matrizIndicePrincipal[j]].toString().trim().indexOf("1900") > -1 ? "" : matrizPrincipal[i][matrizIndicePrincipal[j]].toString().trim());
					break;
				default:
					contenido.push(matrizPrincipal[i][matrizIndicePrincipal[j]].toString().trim());
					break;
			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");
	}
	return (contenido.join("") + "</table></html>");
}

