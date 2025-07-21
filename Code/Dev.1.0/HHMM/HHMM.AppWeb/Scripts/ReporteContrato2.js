var cabeceras = ["Médico", "Contrato", "Conf. Pago", "Tipo Registro", "Fecha Inicio", "Fecha Fin", "Código", "Descripción", "V. Medida", "Servicio", "Tipo", "Valor", "Valor 2"];
var anchos = [13, 5, 10, 10, 7, 7, 10, 11, 6, 6, 5, 5, 5];
var matrizIndice = [2, 0, 2, 4, 11, 12, 1, 4, 2, 3, 5, 6, 10];
var matrizPos = [0, 0, 1, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2];
var listaTipoArray = [[0, "", -1], [1, "", -1], [2, "", -1], [3, "", -1], [4, "", -1], [5, "", -1], [6, "", -1], [7, "", -1], [8, "", -1], [9, "", -1], [10, "", -1], [11, "", -1], [12, "", -1]];
var listaComponente = [];
var mensajeValidacion = [];
var listaMedicoContratoReporte = [];
var listaContratoCabecera = [];
var listaMedicoContrato = [];
var listaContratoDetalle = [];
var listaContratoComponentes = [];
var listaServicios = [];
var matrizContratoCabecera = [];
var matrizMedicoContrato = [];
var matrizContratoDetalle = [];
var matrizContratoComponentes = [];
var idEmpresa = "";
var matrizConfiguracionpago = ["Producción Fija", "Producción Escalonada", "Contrato Fijo", "Por Horarios", "Por Turnos", "C. Compartido", "Vacunas"];
var ExcelExportar = "";
var ExcelExportarMedico = "";
var valorcheck = "";
var MatrizIndiceComponente = [];
var MatrizIndiceServicio = [];
var MatrizIndiceContratoComponentes = [];


var matrizPrincipal = [], matrizComponente = [];
var matrizFiltroPrincipal = [], matrizFiltroComponente = [];
var listaTipoMedico = [], listaServicioComponente = [];
var cabecerasPrincipal = ["Id", "Médico", "T. Médico", "T. Persona", "Documento", "Documento Fiscal", "Empresa", "Especialidad", "Estado", "Ind. Contrato", "Contrato", "Fecha Inicio", "Fecha Fin", "Estado Contrato", "Ind. Adjunto", "Nombre Archivo"];
var matrizIndicePrincipal = [0, 1, 16, 2, 3, 4, 15, 14, 5, 13, 6, 7, 8, 9, 10, 11];
var anchosPrincipal = [5, 15, 10, 5, 6, 10, 10, 10, 7, 5, 6, 6, 6, 7, 6, 10];
var anchosExcelPrincipal = [5, 15, 10, 5, 6, 10, 10, 10, 7, 5, 6, 6, 6, 7, 6, 10];

var cabecerasComponente = ["Código", "Componente", "Valor Medida", "Servicio"];
var matrizIndiceComponente = [0, 1, 2, 3];
var anchosComponente = [10, 40, 20, 30];
var anchosExcelComponente = [20, 20, 20, 20];

var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloquePrincipal = 0, indiceActualBloqueComponente = 0;
var indiceOrden = 0;
var indiceActualPaginaPrincipal = 0, indiceActualPaginaComponente = 0;

var urlBase = "", opcionfiltro = -1, opcionPopUp = -1, ss = "", Campoeliminar = "", sucursalId = "", sucursal;
var valorTabACtual = "tabx-1";

window.onload = function () {
	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	ss = window.parent.parent.document.getElementById("iss").value;
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	RutaContrato = document.getElementById("hdfRuta").value + "\\" + sucursalId;
	var url = urlBase + "Control/ListarMedicoContratoReporte/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarMedicoContratoReporte);
	ConfiguracionInicial();

};

function ConfiguracionInicial() {
	configuracionInicialDetalle();
	crearTablaEX("Principal");
	crearTablaEX("Componente");
	configurarOrdenacionEX();
	configurarControles();
	configurarFiltroEX();
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
			case "Principal":
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
						if (isNaN(matriz[x][j]) || matriz[x][j] == "" || j == 3 || j == 4) {
							switch (j) {
								case 2:
									matriz[x][j] = (matriz[x][j] == "N" ? "NATURAL" : "JURIDICA");
									break;
								case 7:
								case 8:
									matriz[x][j] = (matriz[x][j].indexOf("1900") > -1 ? "" : formatearfecha(matriz[x][j]));
									break;
								default:
									matriz[x][j] = matriz[x][j].trim();
									break;
							}

						} else {
							matriz[x][j] = matriz[x][j] * 1;
						}
					}
					j = 0;
					x++;
				}
				break;
			case "Componente":
				var valorEncontrado = false;
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
							case 3:
								for (var g = 0; g < listaServicioComponente.length; g++) {
									if (listaServicioComponente[g][0] == matriz[x][j]) {
										matriz[x][j] = listaServicioComponente[g][1];
										valorEncontrado = true;
										break;
									}
								}
								if (!valorEncontrado) {
									matriz[x][j] = "";
								}
								valorEncontrado = false;
								break;
							case 4:
							case 5:
								matriz[x][j] = (matriz[x][j] == "A" ? "ACTIVO" : "INACTIVO");
								break;
							default:
								matriz[x][j] = matriz[x][j].trim();
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

function crearTablaEX(identificador) {
	var cabeceras = window["cabeceras" + identificador];
	var nCampos = cabeceras.length;
	var contenido = "";
	contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
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
		switch (identificador) {
			case "Principal":
				switch (j) {
					case 2:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlTipoMedico'>";
						contenido += "</select>";
						break;
					case 3:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>TODOS</option><option value='NATURAL'>NATURAL</option><option value='JURIDICA'>JURIDICA</option>";
						contenido += "</select>";
						break;
					case 8:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoMed'>";
						contenido += "<option value=''>Todos</option><option value='ACTIVO'>ACTIVO</option><option value='INACTIVO'>INACTIVO</option>";
						contenido += "</select>";
						break;
					case 13:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%' id='ddlEstadoCabCont'>";
						contenido += "<option value=''>Todos</option><option value='ACTIVO'>ACTIVO</option><option value='INACTIVO'>INACTIVO</option>";
						contenido += "</select>";
						break;
					case 9:
					case 14:
						contenido += "<select class='Combo";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						contenido += "<option value=''>Todos</option><option value='SI'>SI</option><option value='NO'>NO</option>";
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
			case "Componente":
				switch (j) {
					default:
						contenido += "<input type='text' class='Texto";
						contenido += identificador;
						contenido += "' name='cabecera";
						contenido += identificador;
						contenido += "' style='width:90%'>";
						break;
				}
				break;
		}
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	//contenido += "<tfoot>";
	//contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	//contenido += (nCampos).toString();
	//contenido += "'></td></tr>";
	//contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador).innerHTML = contenido;
}

function configurarOrdenacionEX() {
	var enlaces = document.getElementsByClassName("EnlacePrincipal");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "Principal");
			paginarEX(indiceActualPagina, "Principal");
		};
	}

	var enlaces = document.getElementsByClassName("EnlaceComponente");
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			ordenarMatrizEX(this, "Componente");
			paginarEX(indiceActualPagina, "Componente");
		};
	}
}

function configurarFiltroEX() {
	var textos = document.getElementsByName("cabeceraPrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("Principal");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("Principal");
				}, 0);
			};
		}
	}

	var textos = document.getElementsByName("cabeceraComponente");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.onkeyup = function (e) {
				delay(function () {
					filtrarEX("Componente");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					filtrarEX("Componente");
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

function limpiarCabeceras() {
    var cabecera = document.getElementsByName("cabecera");
    var cabeceraObj;
    for (var i = 0; i < cabecera.length; i++) {
        cabeceraObj = cabecera[i];
        if (cabeceraObj.nodeName == "SELECT") {
            cabeceraObj.selectedIndex = "0";
        } else {
            cabeceraObj.value = "";
        }
    }
    listaTipoArray = [[0, "", -1], [1, "", -1], [2, "", -1], [3, "", -1], [4, "", -1], [5, "", -1], [6, "", -1], [7, "", -1], [8, "", -1], [9, "", -1], [10, "", -1], [11, "", -1], [12, "", -1]];
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

function filtrarEX(identificador) {
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
	paginarEX(-1, identificador);
	limpiarEnlaces(identificador);
	window["indiceActualBloque" + identificador] = 0;
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

function mostrarMatrizEX(indicePagina, identificador) {
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
				var valor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								case 1:
									if (window["matriz" + identificador][i][6] != 0) {
										contenido += "<td style='text-align:left'><span class='puntero' style='text-decoration:underline;color:#00a850' onclick='mostrarDetalleMedico(\"";
										contenido += window["matriz" + identificador][i][0];
										contenido += "\",\"";
										contenido += window["matriz" + identificador][i][1];
										contenido += "\",\"";
										contenido += window["matriz" + identificador][i][2];
										contenido += "\",\"";
										contenido += window["matriz" + identificador][i][7];
										contenido += "\",\"";
										contenido += window["matriz" + identificador][i][8];
										contenido += "\")'>";
										contenido += window["matriz" + identificador][i][1];
										contenido += "</span>";
									}
									else {
										contenido += "<td style='text-align:left'><span>";
										contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
										contenido += "</span>";
									}
									break;
								case 2:
									contenido += "<td>";
									for (var x = 0; x < listaTipoMedico.length; x++) {
										if (listaTipoMedico[x][0] == window["matriz" + identificador][i][matrizIndicePrincipal[j]]) {
											contenido += listaTipoMedico[x][1];
											break;
										}
									}
									break;
								case 10:
									contenido += "<td style='text-align:center'>";
									if (window["matriz" + identificador][i][matrizIndicePrincipal[j]] != 0) contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
									break;
								case 9:
								case 11:
								case 12:
								case 14:
									contenido += "<td style='text-align:center'>";
									contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
									break;
								case 15:
									contenido += "<td style='text-align:center'><span class='puntero' style='text-decoration:underline;color:#00a850' onclick='DescargarArchivo(\"";
									contenido += window["matriz" + identificador][i][12];
									contenido += "\")'>";
									contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
									contenido += "</span>";
									break;

								default:
									contenido += "<td>";
									contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
									break;
							}
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}

				break;
			case "Componente":
				var valor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						for (var j = 0; j < nCampos; j++) {
							switch (j) {
								case 1:
									contenido += "<td><span class='puntero' style='text-decoration:underline;color:#00a850' onclick='mostrarDetalleComponente(\"";
									contenido += window["matriz" + identificador][i][0];
									contenido += "\",\"";
									contenido += window["matriz" + identificador][i][1];
									contenido += "\")'>";
									contenido += window["matriz" + identificador][i][matrizIndiceComponente[j]];
									contenido += "</span>";
									break;
								case 2:
									contenido += "<td style='text-align:right'>";
									contenido += window["matriz" + identificador][i][matrizIndiceComponente[j]];
									break;
								default:
									contenido += "<td>";
									contenido += window["matriz" + identificador][i][matrizIndiceComponente[j]];
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
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCampos + 2).toString();
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
	    document.getElementById("divPaginacion" + identificador).innerHTML = "";
	} else {
	    //document.getElementById("tdPaginas" + identificador).innerHTML = contenido;
	    document.getElementById("divPaginacion" + identificador).innerHTML = contenido;
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

/*===============================TABLAS COMPONENTES===============================*/

function mostrarDetalleMedico(idMed, Med, tipoPersona, feInicio, feFin) {
    limpiarCabeceras();
	var divMedicoReporte = document.getElementById("divMedicoReporte");
	divMedicoReporte.style.display = 'none';
	var divContratoReporte = document.getElementById("divContratoReporte");
	divContratoReporte.style.display = 'inline';
	var txtFechaInicio = document.getElementById("txtFechaInicio").value;
	var txtFechaFin = document.getElementById("txtFechaFin").value;
	var hdfMedico = document.getElementById("hdfMedico").value;
	var hdfEmpresa = document.getElementById("hdfEmpresa").value;
	var txtSucursal = document.getElementById("txtSucursal");


	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	//var url = urlBase + "Mantenimiento/listarComponente/?ss=" + ss + "&su=" + sucursalId;
	//$.ajax(url, "get", listarCombo);

	document.getElementById("txtSucursal").value = sucursal;
	if (tipoPersona == "NATURAL" || tipoPersona == "JURIDICA") {
		document.getElementById("hdfMedico").value = idMed;
		document.getElementById("txtMedico").value = Med;
		document.getElementById("hdfEmpresa").value = "";
		document.getElementById("txtEmpresa").value = "";
	}
	else {
		document.getElementById("hdfMedico").value = "";
		document.getElementById("txtMedico").value = "";
		document.getElementById("hdfEmpresa").value = "";
		document.getElementById("txtEmpresa").value = "";
	}

	document.getElementById("txtFechaInicio").value = feInicio;
	document.getElementById("txtFechaFin").value = feFin;
	document.getElementById("hdfCom").value = "";
	document.getElementById("txtComponente").value = "";

	var rdnTipo = document.getElementsByName("rdnTipo");
	rdnTipo[0].checked = true;
	rdnTipo[1].checked = false;
	rdnTipo[1].disabled = false;
	rdnTipo[1].style.pointerEvents = "";

	var contenido = "<div id='alerta'><div class='alerta move-right'><span id='spnAlerta' style='display: block'></span></div></div>";
	var tipError = document.getElementById("tipError");
	tipError.insertAdjacentHTML('afterend', contenido);
	document.getElementById('btnBuscar').click();
}


function mostrarDetalleComponente(componenteid, componente) {
    limpiarCabeceras();
	document.getElementById("tbReporte").innerHTML = "";
	var divMedicoReporte = document.getElementById("divMedicoReporte");
	divMedicoReporte.style.display = 'none';
	var divContratoReporte = document.getElementById("divContratoReporte");
	divContratoReporte.style.display = 'inline';

	sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;


	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("hdfMedico").value = "0";
	document.getElementById("txtMedico").value = "";
	document.getElementById("hdfEmpresa").value = "-1";
	document.getElementById("txtEmpresa").value = "";

	document.getElementById("txtFechaInicio").value = "";
	document.getElementById("txtFechaFin").value = "";

	document.getElementById("hdfCom").value = componenteid;
	document.getElementById("txtComponente").value = componente;

	var rdnTipo = document.getElementsByName("rdnTipo");
	rdnTipo[0].checked = true;
	rdnTipo[1].checked = false;
	rdnTipo[1].disabled = true;
	rdnTipo[1].style.pointerEvents = "none";

	var contenido = "<div id='alerta'><div class='alerta move-right'><span id='spnAlerta' style='display: block'></span></div></div>";
	var tipError = document.getElementById("tipError");
	tipError.insertAdjacentHTML('afterend', contenido);
	document.getElementById('btnBuscar').click();
}


function listarCombo(rpta) {
	if (rpta != "") {
		listaComponente = rpta.split("¯");
		var valor;
		for (var x = 0; x < listaComponente.length; x++) {
			valor = listaComponente[x].split("¦");
			MatrizIndiceComponente[x] = valor[0];
		}
	}
}

function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<div style='display:inline-block;float: right;cursor:pointer'><a class='Icons fa-file-excel-o' id='btnExportar'></a></div><div style='clear:both'></div><table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr>";
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
		if (j == 2 || j == 3 || j == 10) {
			switch (j) {
				case 2:
					contenido += "<select class='Combo' tabIndex='";
					contenido += j;
					contenido += "' name='cabecera' style='width:90%' data-matriz=";
					contenido += matrizPos[j];
					contenido += ">";
					contenido += "<option value=''>TODOS</option>";
					for (var x = 0; x < matrizConfiguracionpago.length; x++) {
						contenido += "<option value='";
						contenido += (x + 1);
						contenido += "'>";
						contenido += matrizConfiguracionpago[x];
						contenido += "</option>";
					}
					contenido += "</select>";
					break;
				case 3:
					contenido += "<select class='Combo' tabIndex='";
					contenido += j;
					contenido += "' name='cabecera' style='width:90%' data-matriz=";
					contenido += matrizPos[j];
					contenido += ">";
					contenido += "<option value=''>TODOS</option><option value='C'>Configuración</option><option value='B'>Bonificación</option>";
					contenido += "</select>";
					break;
				case 10:
					contenido += "<select class='Combo' tabIndex='";
					contenido += j;
					contenido += "' name='cabecera' style='width:90%' data-matriz=";
					contenido += matrizPos[j];
					contenido += ">";
					contenido += "<option value=''>TODOS</option><option value='F'>Factor</option><option value='M'>Monto</option><option value='P'>Porcentaje</option><option value='D'>Doble</option>";
					contenido += "</select>";
					break;
			}
		}
		else {
			contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%' data-matriz=";
			contenido += matrizPos[j];
			contenido += "  tabIndex='";
			contenido += j;
			contenido += "'>";
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

function configuracionInicialDetalle() {
	crearTabla();
	configurarFiltro();
}

function filtrar() {
	var cabecera = document.getElementsByName("cabecera");
	var valor;
	var valorMax = -1;
	for (var l = 0; l < listaTipoArray.length; l++) {
		valor = listaTipoArray[l];
		if (valor[1] != "") {
			if (valorMax == -1) {
				valorMax = valor[2] * 1;
			}
			else {
				if ((valor[2] * 1) > valorMax) {
					valorMax = valor[2] * 1;
				}
			}
		}
	}

	var nRegistros;
	var nCampos;
	var campos;
	var x = 0;
	var matrizEncontrados = [];
	var matrizEncontrados2 = [];
	var valorEncontrado;
	var Encontrado = false;
	var exito = "";
	matrizContratoCabecera = [];
	matrizMedicoContrato = [];
	matrizContratoDetalle = [];
	matrizContratoComponentes = [];

	switch (valorMax) {
		case 0:
			nRegistros = listaContratoCabecera.length;
			matrizEncontrados2 = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoCabecera[i].split("¦");
				nCampos = campos.length;
				if (listaTipoArray[0][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[0][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[1][1].trim() != "") exito += (campos[0].toLowerCase().indexOf(listaTipoArray[1][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[4][1].trim() != "") exito += (campos[3].toLowerCase().indexOf(listaTipoArray[4][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[5][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[5][1].toLowerCase().trim()) > -1).toString();
				if (exito.toLowerCase().indexOf("false") == -1) {
					matrizContratoCabecera[x] = [];
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 2 || j == 5) matrizContratoCabecera[x][j] = campos[j];
						else matrizContratoCabecera[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			crearMatriz("MedicoContrato|1");
			crearMatriz("ContratoDetalle|2");
			break;
		case 1:
			nRegistros = listaMedicoContrato.length;
			matrizEncontrados = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaMedicoContrato[i].split("¦");
				nCampos = campos.length;
				if (listaTipoArray[2][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[2][1].toLowerCase().trim()) > -1).toString();
				if (exito.toLowerCase().indexOf("false") == -1) {
					matrizMedicoContrato[x] = [];
					for (j = 0; j < nCampos; j++) {
						matrizMedicoContrato[x][j] = campos[j] * 1;
						if (j == 0) {
							valorEncontrado = campos[j] * 1;
						}
					}
					if (matrizEncontrados.length == 0) {
						matrizEncontrados.push(valorEncontrado);
					}
					else {
						if (matrizEncontrados[matrizEncontrados.length - 1] != valorEncontrado) {
							matrizEncontrados.push(valorEncontrado);
						}
					}
					x++;
				}

			}

			nRegistros = listaContratoCabecera.length;
			matrizEncontrados2 = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoCabecera[i].split("¦");
				for (var z = 0; z < matrizEncontrados.length; z++) {
					if (campos[0] == matrizEncontrados[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[0][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[0][1].toLowerCase().trim()) > -1).toString();
					if (listaTipoArray[1][1].trim() != "") exito += (campos[0].toLowerCase().indexOf(listaTipoArray[1][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[4][1].trim() != "") exito += (campos[3].toLowerCase().indexOf(listaTipoArray[4][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[5][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[5][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizContratoCabecera[x] = [];
						for (j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || j == 2 || j == 5) matrizContratoCabecera[x][j] = campos[j];
							else matrizContratoCabecera[x][j] = campos[j] * 1;
						}
						x++;
					}
				}
				Encontrado = false;
			}
			crearMatriz("ContratoDetalle|2");
			//crearMatriz("ContratoComponentes|3");
			break;
		case 2:
			nRegistros = listaContratoDetalle.length;
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoDetalle[i].split("¦");
				nCampos = campos.length;
				if (listaTipoArray[3][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[3][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[10][1].trim() != "") exito += (campos[5].toLowerCase().indexOf(listaTipoArray[10][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[11][1].trim() != "") exito += (campos[6].toLowerCase().indexOf(listaTipoArray[11][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[12][1].trim() != "") exito += (campos[10].toLowerCase().indexOf(listaTipoArray[12][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[4][1].trim() != "") exito += (formatearfecha(campos[11]).toLowerCase().indexOf(listaTipoArray[4][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[5][1].trim() != "") exito += (formatearfecha(campos[12]).toLowerCase().indexOf(listaTipoArray[5][1].toLowerCase().trim()) > -1).toString();
				if (exito.toLowerCase().indexOf("false") == -1) {
					matrizContratoDetalle[x] = [];
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 4 || j == 5 || j == 6 || j == 7 || j == 10) matrizContratoDetalle[x][j] = campos[j];
						else matrizContratoDetalle[x][j] = campos[j] * 1;
						if (j == 2) {
							valorEncontrado = campos[j];
						}
					}
					if (matrizEncontrados2.length == 0) {
						matrizEncontrados2.push(valorEncontrado);
					}
					else {
						if (matrizEncontrados2[matrizEncontrados2.length - 1] != valorEncontrado) {
							matrizEncontrados2.push(valorEncontrado);
						}
					}
					x++;
				}
			}

			nRegistros = listaMedicoContrato.length;
			matrizEncontrados = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaMedicoContrato[i].split("¦");
				for (var z = 0; z < matrizEncontrados2.length; z++) {
					if (campos[1] == matrizEncontrados2[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[2][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[2][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizMedicoContrato[x] = [];
						for (j = 0; j < nCampos; j++) {
							matrizMedicoContrato[x][j] = campos[j] * 1;
							if (j == 0) {
								valorEncontrado = campos[j] * 1;
							}
						}
						if (matrizEncontrados.length == 0) {
							matrizEncontrados.push(valorEncontrado);
						}
						else {
							if (matrizEncontrados[matrizEncontrados.length - 1] != valorEncontrado) {
								matrizEncontrados.push(valorEncontrado);
							}
						}
						x++;
					}
				}
				Encontrado = false;
			}

			nRegistros = listaContratoCabecera.length;
			matrizEncontrados2 = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoCabecera[i].split("¦");
				for (var z = 0; z < matrizEncontrados.length; z++) {
					if (campos[0] == matrizEncontrados[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[0][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[0][1].toLowerCase().trim()) > -1).toString();
					if (listaTipoArray[1][1].trim() != "") exito += (campos[0].toLowerCase().indexOf(listaTipoArray[1][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[4][1].trim() != "") exito += (campos[3].toLowerCase().indexOf(listaTipoArray[4][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[5][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[5][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizContratoCabecera[x] = [];
						for (j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || j == 2 || j == 5) matrizContratoCabecera[x][j] = campos[j];
							else matrizContratoCabecera[x][j] = campos[j] * 1;
						}
						x++;
					}
				}
				Encontrado = false;
			}
			//crearMatriz("ContratoComponentes|3");
			break;
		case 3:
			var valorComponente;
			var valorServicio;
			var valorComponenteReal;
			var valorServicioReal;
			var ServicioActual;
			var ServicioCopiaACtual;
			var ComponenteActual;
			var ComponenteCopiaACtual;
			nRegistros = listaContratoComponentes.length;
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoComponentes[i].split("¦");
				nCampos = campos.length;
				if (listaTipoArray[6][1].trim() != "") exito += (campos[1].toLowerCase().indexOf(listaTipoArray[6][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[7][1].trim() != "") {
					if (ComponenteActual != campos[1]) {

						for (var u = 0; u < MatrizIndiceComponente.length; u++) {
							if (campos[1] == MatrizIndiceComponente[u]) {
								valorComponente = listaComponente[u].split("¦");
								valorComponenteReal = valorComponente[1];
								ComponenteActual = campos[1];
								ComponenteCopiaACtual = valorComponente[1];
								break;
							}
						}

					} else {
						valorComponenteReal = ComponenteCopiaACtual;
					}
					exito += (valorComponenteReal.toLowerCase().indexOf(listaTipoArray[7][1].toLowerCase().trim()) > -1).toString();
				}
				if (listaTipoArray[8][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[8][1].toLowerCase().trim()) > -1).toString();
				if (listaTipoArray[9][1].trim() != "") {
					if (ServicioActual != campos[3]) {

						for (var u = 0; u < MatrizIndiceServicio.length; u++) {
							if (campos[3] == MatrizIndiceServicio[u]) {
								valorServicio = listaServicios[u].split("¦");
								valorServicioReal = valorServicio[1];
								ServicioActual = campos[1];
								ServicioCopiaACtual = valorServicio[1];
								break;
							}
						}

					} else {
						valorServicioReal = ServicioCopiaACtual;
					}
					exito += (valorServicioReal.toLowerCase().indexOf(listaTipoArray[9][1].toLowerCase().trim()) > -1).toString();
				}
				if (exito.toLowerCase().indexOf("false") == -1) {
					valorEncontrado = campos[0];
					if (matrizEncontrados.length == 0) {
						matrizEncontrados.push(valorEncontrado);
					}
					else {
						if (matrizEncontrados[matrizEncontrados.length - 1] != valorEncontrado) {
							matrizEncontrados.push(valorEncontrado);
						}
					}
					x++;
				}
			}

			nRegistros = listaContratoDetalle.length;
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoDetalle[i].split("¦");
				for (var z = 0; z < matrizEncontrados.length; z++) {
					if (campos[0] == matrizEncontrados[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[3][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[3][1].toLowerCase().trim()) > -1).toString();
					if (listaTipoArray[10][1].trim() != "") exito += (campos[5].toLowerCase().indexOf(listaTipoArray[10][1].toLowerCase().trim()) > -1).toString();
					if (listaTipoArray[11][1].trim() != "") exito += (campos[6].toLowerCase().indexOf(listaTipoArray[11][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizContratoDetalle[x] = [];
						for (j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || j == 4 || j == 5 || j == 6 || j == 7) matrizContratoDetalle[x][j] = campos[j];
							else matrizContratoDetalle[x][j] = campos[j] * 1;
							if (j == 2) {
								valorEncontrado = campos[j];
							}
						}
						if (matrizEncontrados2.length == 0) {
							matrizEncontrados2.push(valorEncontrado);
						}
						else {
							if (matrizEncontrados2[matrizEncontrados2.length - 1] != valorEncontrado) {
								matrizEncontrados2.push(valorEncontrado);
							}
						}
						x++;
					}
				}
				Encontrado = false;
			}

			nRegistros = listaMedicoContrato.length;
			matrizEncontrados = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaMedicoContrato[i].split("¦");
				for (var z = 0; z < matrizEncontrados2.length; z++) {
					if (campos[1] == matrizEncontrados2[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[2][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[2][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizMedicoContrato[x] = [];
						for (j = 0; j < nCampos; j++) {
							matrizMedicoContrato[x][j] = campos[j] * 1;
							if (j == 0) {
								valorEncontrado = campos[j] * 1;
							}
						}
						if (matrizEncontrados.length == 0) {
							matrizEncontrados.push(valorEncontrado);
						}
						else {
							if (matrizEncontrados[matrizEncontrados.length - 1] != valorEncontrado) {
								matrizEncontrados.push(valorEncontrado);
							}
						}
						x++;
					}
				}
				Encontrado = false;
			}

			nRegistros = listaContratoCabecera.length;
			matrizEncontrados2 = [];
			x = 0;
			for (i = 0; i < nRegistros; i++) {
				exito = "";
				campos = listaContratoCabecera[i].split("¦");
				for (var z = 0; z < matrizEncontrados.length; z++) {
					if (campos[0] == matrizEncontrados[z]) {
						Encontrado = true;
						break;
					}
				}
				if (Encontrado) {
					nCampos = campos.length;
					if (listaTipoArray[0][1].trim() != "") exito += (campos[2].toLowerCase().indexOf(listaTipoArray[0][1].toLowerCase().trim()) > -1).toString();
					if (listaTipoArray[1][1].trim() != "") exito += (campos[0].toLowerCase().indexOf(listaTipoArray[1][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[4][1].trim() != "") exito += (campos[3].toLowerCase().indexOf(listaTipoArray[4][1].toLowerCase().trim()) > -1).toString();
					//if (listaTipoArray[5][1].trim() != "") exito += (campos[4].toLowerCase().indexOf(listaTipoArray[5][1].toLowerCase().trim()) > -1).toString();
					if (exito.toLowerCase().indexOf("false") == -1) {
						matrizContratoCabecera[x] = [];
						for (j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || j == 2 || j == 5) matrizContratoCabecera[x][j] = campos[j];
							else matrizContratoCabecera[x][j] = campos[j] * 1;
						}
						x++;
					}
				}
				Encontrado = false;
			}
			break;
		default:
			crearMatriz("ContratoCabecera|0");
			crearMatriz("MedicoContrato|1");
			crearMatriz("ContratoDetalle|2");
			//crearMatriz("ContratoComponentes|3");
			break;
	}
	mostrarMatriz();
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("Texto");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {			
			var control = this.tabIndex * 1;
			var pos = buscarIdFiltro(control);
			if (pos == -1) {
				listaTipoArray.push([control, this.value, this.getAttribute("data-matriz")]);
			}
			else {
				listaTipoArray[pos][1] = this.value;
				listaTipoArray[pos][2] = this.getAttribute("data-matriz");
			}


			var keyCode = ('which' in e) ? e.which : e.keyCode;
			if (keyCode == 13) {
				filtrar();
			}
		}
	}
	var combos = document.getElementsByClassName("Combo");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			var control = this.tabIndex * 1;
			var pos = buscarIdFiltro(control);
			if (pos == -1) {
				listaTipoArray.push([control, this.value, this.getAttribute("data-matriz")]);
			}
			else {
				listaTipoArray[pos][1] = this.value;
				listaTipoArray[pos][2] = this.getAttribute("data-matriz");
			}
			filtrar();
		}
	}

}

function buscarIdFiltro(ti) {
	var n = listaTipoArray.length;
	var pos = -1;
	if (n > 0) {
		for (var x = 0; x < n; x++) {
			if (listaTipoArray[x][0] == ti) {
				pos = x;
				break;
			}

		}
	}
	return pos;
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
		limpiarCabeceras();
		var hdfCom = document.getElementById("hdfCom").value;
		var hdfMedico = document.getElementById("hdfMedico").value;
		var hdfEmpresa = document.getElementById("hdfEmpresa").value;

		var strDatos = "";
		var txtFechaInicio = document.getElementById("txtFechaInicio").value;
		var txtFechaFin = document.getElementById("txtFechaFin").value;

		var rdnTipo = document.getElementsByName("rdnTipo");
		if (hdfCom != "") {
			if (rdnTipo[0].checked) {
				valorcheck = rdnTipo[0].value;
			}
			else {
				valorcheck = rdnTipo[1].value;
			}
			strDatos = sucursalId + "|" + (txtFechaInicio == "" ? "01/01/1900" : txtFechaInicio) + "|" + (txtFechaFin == "" ? "01/01/1900" : txtFechaFin) + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + hdfCom;
			var url = urlBase + "Control/ListarReporteContrato/?ss=" + ss + "&ti=" + valorcheck;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		} else {
			if (validarBusqueda()) {				
				if (rdnTipo[0].checked) {
					valorcheck = rdnTipo[0].value;
				}
				else {
					valorcheck = rdnTipo[1].value;
				}
				strDatos = sucursalId + "|" + (txtFechaInicio == "" ? "01/01/1900" : txtFechaInicio) + "|" + (txtFechaFin == "" ? "01/01/1900" : txtFechaFin) + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + hdfCom;
				var url = urlBase + "Control/ListarReporteContrato/?ss=" + ss + "&ti=" + valorcheck;
				$.ajax(url, "post", listarTodo, strDatos);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;

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
		var validar = document.getElementsByClassName("validar");
		for (var x = 0; x < validar.length; x++) {
			if (validar[x].className.indexOf("error") > -1) {
				validar[x].className = validar[x].className.split("error").join("").trim();
			}
			validar[x].value = "";
		}
		limpiarCabeceras();
		document.getElementById("hdfMedico").value = "0";
		document.getElementById("hdfEmpresa").value = "-1";
		document.getElementById("tbReporte").innerHTML = "";
		document.getElementById("txtComponente").value = "";
		document.getElementById("hdfCom").value = "";
		document.getElementById("hdfCom").onchange();
	}


	var hdfCom = document.getElementById("hdfCom");
	hdfCom.onchange = function () {
		var rdnTipo = document.getElementsByName("rdnTipo");
		rdnTipo[0].checked = true;
		rdnTipo[1].checked = false;
		if (this.value == "") {
			rdnTipo[1].disabled = false;
			rdnTipo[1].style.pointerEvents = "";
		}
		else {
			var datos = this.value.split("¦");
			this.value = datos[0];
			var txtComponente = document.getElementById("txtComponente");
			txtComponente.value = datos[1];
			rdnTipo[1].disabled = true;
			rdnTipo[1].style.pointerEvents = "none";
		}
	}

	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		if (matrizContratoDetalle.length > 0) {
			var contenido = exportarExcel();
			var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
			this.download = "ReporteContrato.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}

	var btnRegresar = document.getElementById('btnRegresar');
	btnRegresar.onclick = function () {
		limpiarCabeceras();
		var divMedicoReporte = document.getElementById("divMedicoReporte");
		divMedicoReporte.style.display = '';
		var divContratoReporte = document.getElementById("divContratoReporte");
		divContratoReporte.style.display = 'none';
	}

	var textos = document.getElementsByClassName("Texto");
	var ntextos = textos.length;
	for (i = 0; i < ntextos; i++) {
		textos[i].onfocus = function () {
			if (this.className.indexOf("Texto") > -1) {
				if (matrizContratoDetalle.length > 0) {
					mostraralerta("Digite su busqueda y presione la tecla Enter para filtrar", true);
				}
			}
		}

		textos[i].onblur = function () {
			var alerta = document.getElementById("alerta");
			alerta.removeAttribute("class");
		}
	}

	var btnExportarMedico = document.getElementById("btnExportarMedico");
	btnExportarMedico.onclick = function () {
		if (valorTabACtual == "tabx-1") {
			if (matrizPrincipal.length > 0) {
				var contenido = exportarExcelMedico(true);
				var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
				this.download = "ReporteMedicoContrato.xls";
				this.href = window.URL.createObjectURL(formBlob);
			}
		} else {
			if (matrizComponente.length > 0) {
				var contenido = exportarExcelMedico(false);
				var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
				this.download = "ReporteMedicoComponente.xls";
				this.href = window.URL.createObjectURL(formBlob);
			}
		}
	}

	var spnComponente = document.getElementById("spnComponente");
	spnComponente.onclick = function () {
			var ifrComponente = document.getElementById("ifrComponente");
			if (ifrComponente.innerHTML == "") {
				ifrComponente.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/ComponenteLista/?ss=" + ss + "'></iframe>";
			}
			abrirPopup("PopupComponente");		
	}
}

function listarTodo(rpta) {
	if (valorcheck == "R") {
		document.getElementsByName("cabecera")[6].className = "lectura";
		document.getElementsByName("cabecera")[6].readOnly = true;
		document.getElementsByName("cabecera")[7].className = "lectura";
		document.getElementsByName("cabecera")[7].readOnly = true;
		document.getElementsByName("cabecera")[8].className = "lectura";
		document.getElementsByName("cabecera")[8].readOnly = true;
		document.getElementsByName("cabecera")[9].className = "lectura";
		document.getElementsByName("cabecera")[9].readOnly = true;
	}
	else {
		document.getElementsByName("cabecera")[6].className = "Texto";
		document.getElementsByName("cabecera")[6].readOnly = false;
		document.getElementsByName("cabecera")[7].className = "Texto";
		document.getElementsByName("cabecera")[7].readOnly = false;
		document.getElementsByName("cabecera")[8].className = "Texto";
		document.getElementsByName("cabecera")[8].readOnly = false;
		document.getElementsByName("cabecera")[9].className = "Texto";
		document.getElementsByName("cabecera")[9].readOnly = false;
	}
	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.innerHTML = "Buscar";
	btnBuscar.onclick = function () {
		limpiarCabeceras();
		var hdfCom = document.getElementById("hdfCom").value;
		var hdfMedico = document.getElementById("hdfMedico").value;
		var hdfEmpresa = document.getElementById("hdfEmpresa").value;

		var strDatos = "";
		var txtFechaInicio = document.getElementById("txtFechaInicio").value;
		var txtFechaFin = document.getElementById("txtFechaFin").value;

		var rdnTipo = document.getElementsByName("rdnTipo");
		if (hdfCom != "") {
			if (rdnTipo[0].checked) {
				valorcheck = rdnTipo[0].value;
			}
			else {
				valorcheck = rdnTipo[1].value;
			}
			strDatos = sucursalId + "|" + (txtFechaInicio == "" ? "01/01/1900" : txtFechaInicio) + "|" + (txtFechaFin == "" ? "01/01/1900" : txtFechaFin) + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + hdfCom;
			var url = urlBase + "Control/ListarReporteContrato/?ss=" + ss + "&ti=" + valorcheck;
			$.ajax(url, "post", listarTodo, strDatos);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		} else {
			if (validarBusqueda()) {
				if (rdnTipo[0].checked) {
					valorcheck = rdnTipo[0].value;
				}
				else {
					valorcheck = rdnTipo[1].value;
				}
				strDatos = sucursalId + "|" + (txtFechaInicio == "" ? "01/01/1900" : txtFechaInicio) + "|" + (txtFechaFin == "" ? "01/01/1900" : txtFechaFin) + "|" + (hdfMedico == "0" ? "" : hdfMedico) + "|" + (hdfEmpresa == "-1" ? "" : hdfEmpresa) + "|" + hdfCom;
				var url = urlBase + "Control/ListarReporteContrato/?ss=" + ss + "&ti=" + valorcheck;
				$.ajax(url, "post", listarTodo, strDatos);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;

			}
		}
	}
	limpiarCabeceras();
	if (rpta != "") {
		var data = rpta.split("¬");
		listaContratoCabecera = data[0].split("¯");
		listaMedicoContrato = data[1].split("¯");
		listaContratoDetalle = data[2].split("¯");
		listaContratoComponentes = data[3].split("¯");
		listaServicios = data[4].split("¯");
		var valor;
		for (var x = 0; x < listaServicios.length; x++) {
			valor = listaServicios[x].split("¦");
			MatrizIndiceServicio[x] = valor[0];
		}
		valor = "";
		var x = 0;
		MatrizIndiceContratoComponentes = [];
		for (var y = 0; y < listaContratoComponentes.length; y++) {
			valor = listaContratoComponentes[y].split("¦");
			if (y == 0) {
				MatrizIndiceContratoComponentes[x] = [];
				MatrizIndiceContratoComponentes[x][0] = valor[0];
				MatrizIndiceContratoComponentes[x][1] = y;
				x++;
			}
			else {
				if (MatrizIndiceContratoComponentes[MatrizIndiceContratoComponentes.length - 1][0] != valor[0]) {
					MatrizIndiceContratoComponentes[x] = [];
					MatrizIndiceContratoComponentes[x][0] = valor[0];
					MatrizIndiceContratoComponentes[x][1] = y;
					x++;
				}

			}
		}
		listarReporte();
	}
}

function listarReporte() {
	crearMatriz("ContratoCabecera|0");
	crearMatriz("MedicoContrato|1");
	crearMatriz("ContratoDetalle|2");
	mostrarMatriz();
}

function crearMatriz(elemento, opcional) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0;

	if (window["lista" + identificador[0]][0] != "") {
		window["matriz" + identificador[0]] = [];
		switch (identificador[1]) {
			case "0":
				for (i = 0; i < nRegistros; i++) {
					campos = window["lista" + identificador[0]][i].split("¦");
					window["matriz" + identificador[0]][x] = [];
					nCampos = campos.length;
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 2 || j == 5) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
				}
				break;
			case "1":
				for (i = 0; i < nRegistros; i++) {
					campos = window["lista" + identificador[0]][i].split("¦");
					window["matriz" + identificador[0]][x] = [];
					nCampos = campos.length;
					for (j = 0; j < nCampos; j++) {
						window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
				}
				break;
			case "2":
				for (i = 0; i < nRegistros; i++) {
					campos = window["lista" + identificador[0]][i].split("¦");
					window["matriz" + identificador[0]][x] = [];
					nCampos = campos.length;
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || j == 4 || j == 5 || j == 6 || j == 7 || j == 10) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
				}
				break
			case "3":
				var encontrado = false;
				var valorComponente;
				var valorServicio;
				for (i = 0; i < nRegistros; i++) {
					campos = window["lista" + identificador[0]][i].split("¦");
					if ((opcional * 1) == (campos[0] * 1)) {
						encontrado = true;
						window["matriz" + identificador[0]][x] = [];
						nCampos = campos.length;
						for (j = 0; j < (nCampos + 2) ; j++) {
							if (j == 2 || j == 3) {
								window["matriz" + identificador[0]][x][j] = campos[j] * 1;
							}
							else {
								window["matriz" + identificador[0]][x][j] = campos[j];

							}
						}
						x++;
					}
					if (encontrado) {
						if (window["lista" + identificador[0]][i + 1] != undefined) {
							if ((campos[0] * 1) != (window["lista" + identificador[0]][i + 1].split("¦")[0] * 1)) {
								break;
							}
						}
					}
				}

				break;
		}
	}
	else {
		window["matriz" + identificador[0]] = [];
	}
}

function mostrarMatriz() {
	var contenido = "";
	var contenido2 = "";
	var contenido3 = "";
	var contenido4 = "";
	var n1 = matrizContratoCabecera.length;
	var n2 = matrizMedicoContrato.length;
	var n3 = matrizContratoDetalle.length;
	var n4 = matrizContratoComponentes.length;
	var nCabeceras = cabeceras.length;
	var VariableActual;
	var nombreActual;
	var valoractual = -1;
	var valorComponente;
	var valorServicio;
	var idPasar = "";
	if (n1 > 0) {

		for (var i = 0; i < n1; i++) {
			if (i < n1) {
				VariableActual = i;
				if (nombreActual != matrizContratoCabecera[VariableActual][2]) {
					contenido += "<tr><td>";
					contenido += matrizContratoCabecera[VariableActual][2];
					contenido += "</td><td colspan='12'></td></tr>";//cambio +1
					nombreActual = matrizContratoCabecera[VariableActual][2];
				}
				for (var x = 0; x < n2; x++) {
					if (matrizContratoCabecera[VariableActual][0] == matrizMedicoContrato[x][0]) {
						if (valoractual == -1 && matrizContratoCabecera[VariableActual][0] == matrizMedicoContrato[x][0]) {
							contenido += "<tr class='ME";
							contenido += matrizContratoCabecera[VariableActual][0];
							contenido += matrizContratoCabecera[VariableActual][1];
							contenido += "'><td></td><td>";
							contenido += "<span class='Icons fa-minus-square' onclick='expandir(\"CB\",\"";
							contenido += matrizMedicoContrato[x][0];
							contenido += "\",this.id,1)' id='ME";
							contenido += matrizMedicoContrato[x][0];
							contenido += matrizMedicoContrato[x][1];
							contenido += "'></span>&nbsp;";
							contenido += matrizMedicoContrato[x][0];
							contenido += "</td><td colspan='11'></td></tr>";//cambio +1
							valoractual = matrizMedicoContrato[x][0];
						}
						for (var p = x; p < n2; p++) {
							contenido += "<tr class='CB";
							contenido += matrizMedicoContrato[p][0];
							contenido += "' style='color:green;'><td colspan='2'></td><td>";
							contenido += "<span class='Icons fa-minus-square ICB";
							contenido += matrizMedicoContrato[p][0];
							contenido += "' onclick='expandir(\"CNB\",\"";
							contenido += matrizMedicoContrato[p][1];
							contenido += "\",this.id,2)' id='CNB";
							contenido += matrizMedicoContrato[p][0];
							contenido += matrizMedicoContrato[p][1];
							contenido += "'></span>&nbsp;";
							contenido += matrizConfiguracionpago[(matrizMedicoContrato[p][2] * 1) - 1];
							contenido += "</td><td></td><td>";
							contenido += formatearfecha(matrizContratoCabecera[VariableActual][3]);
							contenido += "</td><td>";
							contenido += formatearfecha(matrizContratoCabecera[VariableActual][4]);
							contenido += "</td><td colspan='7'></td></tr>";//cambio +1
							for (var h = 0; h < n3; h++) {
								if (matrizContratoDetalle[h][2] == matrizMedicoContrato[p][1]) {
									if (matrizContratoDetalle[h][2] == matrizMedicoContrato[p][1] && matrizContratoDetalle[h + 1] != undefined && (matrizContratoDetalle[h][11] == matrizContratoDetalle[h + 1][11]) && (matrizContratoDetalle[h][12] == matrizContratoDetalle[h + 1][12])) {
										contenido += "<tr class='CNB";
										contenido += matrizContratoDetalle[h][2];
										contenido += " CB";
										contenido += matrizMedicoContrato[p][0];
										contenido += "' style='color:#e91e63'><td colspan='3'></td><td>Vigencia Detalle</td>";
										contenido += "<td>";
										contenido += formatearfecha(matrizContratoDetalle[h][11]);
										contenido += "</td><td>";
										contenido += formatearfecha(matrizContratoDetalle[h][12]);
										contenido += "</td><td colspan='7'></td></tr>";
										for (var z = h; z < n3; z++) {
											if (matrizContratoDetalle[z][2] == matrizMedicoContrato[p][1] && (matrizContratoDetalle[z][11] == matrizContratoDetalle[h][11]) && (matrizContratoDetalle[z][12] == matrizContratoDetalle[h][12])) {
												contenido += "<tr class='CNB";
												contenido += matrizContratoDetalle[z][2];
												contenido += " CB";
												contenido += matrizMedicoContrato[p][0];
												contenido += "' style='color:blue;'";
												contenido += "id='TPCX";
												contenido += matrizContratoDetalle[z][0];
												contenido += "_";
												contenido += matrizContratoDetalle[z][1];
												contenido += matrizContratoDetalle[z][2];
												contenido += "'><td colspan='3'></td><td>";
												idPasar = "";
												idPasar += matrizContratoDetalle[z][0].toString();
												idPasar += "_";
												idPasar += matrizContratoDetalle[z][1].toString();
												idPasar += matrizContratoDetalle[z][2].toString();
												idPasar += "|";
												idPasar += z + "-" + p;
												if (matrizContratoDetalle[z][7] != "T" && matrizContratoDetalle[z][7] != "") {
													if (valorcheck == "D") {
														contenido += "<span class='Icons fa-plus-square ICNB";
														contenido += matrizContratoDetalle[z][2];
														contenido += " ICB";
														contenido += matrizMedicoContrato[p][0];
														contenido += "' onclick='expandir(\"TPC\",\"";
														contenido += matrizContratoDetalle[z][0];
														contenido += "\",this.id,3,\"";
														contenido += idPasar.toString();
														contenido += "\")' id='TPC";
														contenido += matrizContratoDetalle[z][0];
														contenido += matrizContratoDetalle[z][1];
														contenido += matrizContratoDetalle[z][2];
														contenido += "'></span>&nbsp;";
													}
												}
												if (matrizContratoDetalle[z][4] == "C") contenido += "Configuración";
												else contenido += "Bonificación";
												contenido += "</td><td colspan='4'>";
												contenido += matrizContratoDetalle[z][9];
												contenido += "</td><td></td><td></td><td>";
												switch (matrizContratoDetalle[z][5]) {
													case "P":
														contenido += "Porcentaje";
														break;
													case "F":
														contenido += "Factor";
														break;
													case "M":
														contenido += "Monto";
														break;
													case "D":
														contenido += "Doble";
														break;
												}
												contenido += "</td><td>";
												contenido += matrizContratoDetalle[z][6];
												contenido += "</td><td>";
												contenido += matrizContratoDetalle[z][10];
												contenido += "</td></tr>";
												contenido += "<div id='EXC";
												contenido += matrizContratoDetalle[z][0].toString();
												contenido += "' style='display:none'></div>";
												h = z;
												if (matrizContratoDetalle[z + 1] == undefined) {
													break;
												}
												else {
													if (matrizContratoDetalle[z][2] != matrizContratoDetalle[z + 1][2]) {
														break;
													}
												}

											}
											else break;
										}
									} else {
										contenido += "<tr class='CNB";
										contenido += matrizContratoDetalle[h][2];
										contenido += " CB";
										contenido += matrizMedicoContrato[p][0];
										contenido += "' style='color:#e91e63'><td colspan='3'></td><td>Vigencia Detalle</td>";
										contenido += "<td>";
										contenido += formatearfecha(matrizContratoDetalle[h][11]);
										contenido += "</td><td>";
										contenido += formatearfecha(matrizContratoDetalle[h][12]);
										contenido += "</td><td colspan='7'></td></tr>";
										for (var z = h; z < n3; z++) {

											contenido += "<tr class='CNB";
											contenido += matrizContratoDetalle[z][2];
											contenido += " CB";
											contenido += matrizMedicoContrato[p][0];
											contenido += "' style='color:blue;'";
											contenido += "id='TPCX";
											contenido += matrizContratoDetalle[z][0];
											contenido += "_";
											contenido += matrizContratoDetalle[z][1];
											contenido += matrizContratoDetalle[z][2];
											contenido += "'><td colspan='3'></td><td>";
											idPasar = "";
											idPasar += matrizContratoDetalle[z][0].toString();
											idPasar += "_";
											idPasar += matrizContratoDetalle[z][1].toString();
											idPasar += matrizContratoDetalle[z][2].toString();
											idPasar += "|";
											idPasar += z + "-" + p;
											if (matrizContratoDetalle[z][7] != "T" && matrizContratoDetalle[z][7] != "") {
												if (valorcheck == "D") {
													contenido += "<span class='Icons fa-plus-square ICNB";
													contenido += matrizContratoDetalle[z][2];
													contenido += " ICB";
													contenido += matrizMedicoContrato[p][0];
													contenido += "' onclick='expandir(\"TPC\",\"";
													contenido += matrizContratoDetalle[z][0];
													contenido += "\",this.id,3,\"";
													contenido += idPasar.toString();
													contenido += "\")' id='TPC";
													contenido += matrizContratoDetalle[z][0];
													contenido += matrizContratoDetalle[z][1];
													contenido += matrizContratoDetalle[z][2];
													contenido += "'></span>&nbsp;";
												}
											}
											if (matrizContratoDetalle[z][4] == "C") contenido += "Configuración";
											else contenido += "Bonificación";
											contenido += "</td><td colspan='4'>";
											contenido += matrizContratoDetalle[z][9];
											contenido += "</td><td></td><td></td><td>";
											switch (matrizContratoDetalle[z][5]) {
												case "P":
													contenido += "Porcentaje";
													break;
												case "F":
													contenido += "Factor";
													break;
												case "M":
													contenido += "Monto";
													break;
												case "D":
													contenido += "Doble";
													break;
											}
											contenido += "</td><td>";
											contenido += matrizContratoDetalle[z][6];
											contenido += "</td><td>";
											contenido += matrizContratoDetalle[z][10];
											contenido += "</td></tr>";
											contenido += "<div id='EXC";
											contenido += matrizContratoDetalle[z][0].toString();
											contenido += "' style='display:none'></div>";
											h = z;
											if (matrizContratoDetalle[z + 1] == undefined) {
												break;
											}
											else {
												if (matrizContratoDetalle[z][2] != matrizContratoDetalle[z + 1][2]) {
													break;
												}
											}

											break;
										}
									}
								}
							}
							if (matrizContratoDetalle[p + 1] == undefined) {
								break;
							}
							else {
								if (matrizContratoDetalle[p][0] != matrizContratoDetalle[p + 1][0]) {
									break;
								}
							}
						}
						if (matrizMedicoContrato[x + 1] == undefined) {
							break;
						}
						else {
							if (matrizMedicoContrato[x][0] != matrizMedicoContrato[x + 1][0]) {
								break;
							}
						}
					}
					else {
						valoractual = -1;
					}
				}

			}
		}
	}
	else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += nCabeceras.toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tbReporte").innerHTML = contenido;
	//ExcelExportar = contenido;
}

function expandir(id, ob, control, valor, objeto) {
	var control = document.getElementById(control);
	switch (valor) {
		case 1:
			if (control.className.indexOf("plus") > -1) {
				var lista = document.getElementsByClassName(id + ob);
				for (var x = 0; x < lista.length; x++) {
					if (lista[x].className == (id + ob)) {
						lista[x].style.display = "";
					}
				}
			}
			else {
				var lista = document.getElementsByClassName(id + ob);
				var obj;
				for (var x = 0; x < lista.length; x++) {
					if (lista[x].className.indexOf("CNB") > -1) {
						lista[x].style.display = "none";
						obj = document.getElementsByClassName(lista[x].id.split("_")[0].replace("x", "").toString());
						if (obj != undefined && obj.length > 0) {
							while (obj[0]) {
								obj[0].parentNode.removeChild(obj[0]);
								x = x + 1;
							}
						}
					}
					else {
						lista[x].style.display = "none";
					}
				}

				var lista2 = document.getElementsByClassName("I" + id + ob);
				for (var x = 0; x < lista2.length; x++) {
					if (lista2[x].className.indexOf("minus") > -1) {
						lista2[x].className = lista2[x].className.replace("minus", "plus");
					}
				}
			}
			break;
		case 2:
			if (control.className.indexOf("plus") > -1) {
				var clases = control.className.split(" ")[2].replace("I", "");
				var lista = document.getElementsByClassName(id + ob);
				for (var x = 0; x < lista.length; x++) {
					if (lista[x].className == (id + ob + " " + clases)) {
						lista[x].style.display = "";
					}
				}
			}
			else {
				var lista = document.getElementsByClassName(id + ob);
				var obj;
				for (var x = 0; x < lista.length; x++) {
					lista[x].style.display = "none";
					obj = document.getElementsByClassName(lista[x].id.split("_")[0].replace("x", "").toString());
					if (obj != undefined && obj.length > 0) {
						while (obj[0]) {
							obj[0].parentNode.removeChild(obj[0]);
							x = x + 1;
						}
					}
				}


				var lista2 = document.getElementsByClassName("I" + id + ob);
				for (var x = 0; x < lista2.length; x++) {
					if (lista2[x].className.indexOf("minus") > -1) {
						lista2[x].className = lista2[x].className.replace("minus", "plus");
					}
				}
			}
			break;
		case 3:
			if (control.className.indexOf("plus") > -1) {
				var lista = document.getElementsByClassName(id + ob);
				while (lista[0]) {
					lista[0].parentNode.removeChild(lista[0]);
				}
				var valores = objeto.split("|");
				var cabecera = document.getElementsByName("cabecera");
				var cabVal = [cabecera[6].value, cabecera[7].value, cabecera[8].value, cabecera[9].value];
				var datos = valores[1].split("-");
				var contenido = "";
				var exito = "";
				//crearMatriz("ContratoComponentes|3", matrizContratoDetalle[datos[0]][0]);
				var valorComponente;
				var valorComponenteReal = "";
				var valorServicio;
				var valorServicioReal = "";
				var valorComponenteActual = "";
				var valorServicioActual = "";
				var nRegistros = listaContratoComponentes.length;
				var campos;
				var x = 0;
				var encontrado = false;
				var posicion = 0;
				matrizContratoComponentes = [];
				for (var z = 0; z < MatrizIndiceContratoComponentes.length; z++) {
					if (matrizContratoDetalle[datos[0]][0] == MatrizIndiceContratoComponentes[z][0]) {
						posicion = MatrizIndiceContratoComponentes[z][1];
						break;
					}
				}
				for (var r = posicion; r < nRegistros; r++) {
					campos = listaContratoComponentes[r].split("¦");
					if (matrizContratoDetalle[datos[0]][0] == campos[0]) {
						exito = "";

						if (valorComponenteActual != campos[1]) {
							for (var u = 0; u < MatrizIndiceComponente.length; u++) {
								if (campos[1] == MatrizIndiceComponente[u]) {
									valorComponente = listaComponente[u].split("¦");
									valorComponenteReal = valorComponente[1];
									valorComponenteActual = campos[1];
									break;
								}
							}
						}

						if (valorServicioActual != campos[3]) {
							for (var u = 0; u < MatrizIndiceServicio.length; u++) {
								if (campos[3] == MatrizIndiceServicio[u]) {
									valorServicio = listaServicios[u].split("¦");
									valorServicioReal = valorServicio[1];
									valorServicioActual = campos[3];
									break;
								}
							}
						}

						if (cabVal[0].trim() != "") exito += (campos[1].toLowerCase().indexOf(cabVal[0].toLowerCase().trim()) > -1).toString();
						if (cabVal[1].trim() != "") exito += (valorComponenteReal.toLowerCase().indexOf(cabVal[1].toLowerCase().trim()) > -1).toString();

						if (cabVal[2].trim() != "") exito += (campos[2].toLowerCase().indexOf(cabVal[2].toLowerCase().trim()) > -1).toString();
						if (cabVal[3].trim() != "") exito += (valorServicioReal.toLowerCase().indexOf(cabVal[3].toLowerCase().trim()) > -1).toString();
						if (exito.toLowerCase().indexOf("false") == -1) {
							encontrado = true;
							matrizContratoComponentes[x] = [];
							nCampos = campos.length;
							for (j = 0; j < nCampos ; j++) {
								if (j == 2 || j == 3) {
									matrizContratoComponentes[x][j] = campos[j] * 1;
								}
								else {
									matrizContratoComponentes[x][j] = campos[j];

								}
							}
							x++;
							contenido += "<tr class='TPC";
							contenido += campos[0];
							contenido += " CNB";
							contenido += matrizContratoDetalle[datos[0]][2];
							contenido += " CB";
							contenido += matrizMedicoContrato[datos[1]][0];
							contenido += "' style='color:red;display:none'><td colspan='6'></td><td>&nbsp;";
							contenido += campos[1];
							contenido += "</td>";
							contenido += "<td>";
							if (valorComponenteReal.length > 50) {
								contenido += "<span title='"
								contenido += valorComponenteReal;
								contenido += "'>";
								contenido += valorComponenteReal.substring(0, 50);
								contenido += "...";
								contenido += "</span>";
							}
							else {
								contenido += valorComponenteReal;
							}
							contenido += "</td>";
							contenido += "<td>";
							contenido += (campos[2] * 1).toFixed(3);
							contenido += "</td>";
							contenido += "<td>";
							contenido += valorServicioReal;
							contenido += "</td>";
							contenido += "<td colspan='3'></td></tr>";

						}
						if (encontrado) {
							if (listaContratoComponentes[r + 1] != undefined) {
								if (campos[0] != listaContratoComponentes[r + 1].split("¦")[0]) {
									break;
								}
							}
							else {
								break;
							}
						}
					}
				}
				var d1 = document.getElementById("TPCX" + valores[0]);
				d1.insertAdjacentHTML('afterend', contenido);

				var clases1 = control.className.split(" ")[2].replace("I", "");
				var clases2 = control.className.split(" ")[3].replace("I", "");
				var lista = document.getElementsByClassName(id + ob);
				for (var y = 0; y < lista.length; y++) {
					if (lista[y].className == (id + ob + " " + clases1 + " " + clases2)) {
						lista[y].style.display = "";
					}
				}
			}
			else {

				var lista = document.getElementsByClassName(id + ob);
				while (lista[0]) {
					lista[0].parentNode.removeChild(lista[0]);
				}
				var lista2 = document.getElementsByClassName("I" + id + ob);
				for (var x = 0; x < lista2.length; x++) {
					if (lista2[x].className.indexOf("minus") > -1) {
						lista2[x].className = lista2[x].className.replace("minus", "plus");
					}
				}
			}
			break;
	}
	if (control.className.indexOf("minus") > -1) control.className = control.className.replace("minus", "plus");
	else control.className = control.className.replace("plus", "minus");
}

function validarBusqueda() {
	var txtFechaInicio = document.getElementById("txtFechaInicio");
	var txtFechaFin = document.getElementById("txtFechaFin");
	var txtMedico = document.getElementById("txtMedico");
	var txtEmpresa = document.getElementById("txtEmpresa");
	var txtComponente = document.getElementById("txtComponente");
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

	var mensajeFechaInicio = validarFecha(txtFechaInicio.id, "fecha inicio", false);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtFechaInicio.className += " error";
	}
	var mensajeFechaFin = validarFecha(txtFechaFin.id, "fecha fin", false);
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
			//if (Texto.value.match(/[,;]+/) != null) {
			//    return Mensaje + ' No debe contener , o ;';
			//}
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

function exportarExcel() {
	var contenido = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	for (var x = 0; x < cabeceras.length; x++) {
		contenido += "<td style='color:white'>";
		contenido += cabeceras[x];
		contenido += "</td>"
	}
	contenido += "</tr>";
	var n1 = matrizContratoCabecera.length;
	var n2 = matrizMedicoContrato.length;
	var n3 = matrizContratoDetalle.length;
	var nCabeceras = cabeceras.length;
	var VariableActual;
	var nombreActual;
	var valoractual = -1;
	var valorComponente;
	var valorServicio;
	var idPasar = "";
	var valores;
	var datos
	var exito = "";

	var valorComponente;
	var valorComponenteReal = "";
	var valorServicio;
	var valorServicioReal = "";
	var valorComponenteActual = "";
	var valorServicioActual = "";
	var nRegistros = listaContratoComponentes.length;
	var campos;
	var x = 0;
	var encontrado = false;
	var posicion = 0;
	if (n1 > 0) {
		for (var i = 0; i < n1; i++) {
			if (i < n1) {
				VariableActual = i;
				if (nombreActual != matrizContratoCabecera[VariableActual][2]) {
					contenido += "<tr><td>";
					contenido += matrizContratoCabecera[VariableActual][2];
					contenido += "</td><td colspan='12'></td></tr>";
					nombreActual = matrizContratoCabecera[VariableActual][2];
				}
				for (var x = 0; x < n2; x++) {
					if (matrizContratoCabecera[VariableActual][0] == matrizMedicoContrato[x][0]) {
						if (valoractual == -1 && matrizContratoCabecera[VariableActual][0] == matrizMedicoContrato[x][0]) {
							contenido += "<tr><td></td><td>";
							contenido += "<span></span>&nbsp;";
							contenido += matrizMedicoContrato[x][0];
							contenido += "</td><td colspan='11'></td></tr>";
							valoractual = matrizMedicoContrato[x][0];
						}
						for (var p = 0; p < n2; p++) {
							contenido += "<tr style='color:green;'><td colspan='2'></td><td>";
							contenido += "<span></span>&nbsp;";
							contenido += matrizConfiguracionpago[(matrizMedicoContrato[p][2] * 1) - 1];
							contenido += "</td><td></td><td>";
							contenido += formatearfecha(matrizContratoCabecera[VariableActual][3]);
							contenido += "</td><td>";
							contenido += formatearfecha(matrizContratoCabecera[VariableActual][4]);
							contenido += "</td><td colspan='7'></td></tr>";
							for (var h = 0; h < n3; h++) {
								if (matrizContratoDetalle[h][2] == matrizMedicoContrato[p][1] && matrizContratoDetalle[h + 1] != undefined && (matrizContratoDetalle[h][11] == matrizContratoDetalle[h + 1][11]) && (matrizContratoDetalle[h][12] == matrizContratoDetalle[h + 1][12])) {
									contenido += "<tr style='color:#e91e63'><td colspan='3'></td><td>Vigencia Detalle</td>";
									contenido += "<td>";
									contenido += formatearfecha(matrizContratoDetalle[h][11]);
									contenido += "</td><td>";
									contenido += formatearfecha(matrizContratoDetalle[h][12]);
									contenido += "</td><td colspan='7'></td></tr>";
									for (var z = h; z < n3; z++) {
										if (matrizContratoDetalle[z][2] == matrizMedicoContrato[p][1] && (matrizContratoDetalle[z][11] == matrizContratoDetalle[h][11]) && (matrizContratoDetalle[z][12] == matrizContratoDetalle[h][12])) {
											h = z;
											contenido += "<tr style='color:blue;'><td colspan='3'></td><td>";
											idPasar = "";
											idPasar += matrizContratoDetalle[z][0].toString();
											idPasar += "_";
											idPasar += matrizContratoDetalle[z][1].toString();
											idPasar += matrizContratoDetalle[z][2].toString();
											idPasar += "|";
											idPasar += (z + "-" + p).toString();
											if (matrizContratoDetalle[z][7] != "T" && matrizContratoDetalle[z][7] != "") {
												if (valorcheck == "D") {
													contenido += "<span></span>&nbsp;";
												}
											}
											if (matrizContratoDetalle[z][4] == "C") contenido += "Configuración";
											else contenido += "Bonificación";
											contenido += "</td><td colspan='4'>";
											contenido += matrizContratoDetalle[z][9];
											contenido += "</td><td></td><td></td><td>";
											switch (matrizContratoDetalle[z][5]) {
												case "P":
													contenido += "Porcentaje";
													break;
												case "F":
													contenido += "Factor";
													break;
												case "M":
													contenido += "Monto";
													break;
												case "D":
													contenido += "Doble";
													break;
											}
											contenido += "</td><td>";
											contenido += matrizContratoDetalle[z][6];
											contenido += "</td><td>";
											contenido += matrizContratoDetalle[z][10];
											contenido += "</td></tr>";
											if (matrizContratoDetalle[z][7] != "T" && matrizContratoDetalle[z][7] != "") {
												if (valorcheck == "D") {
													valores = idPasar.split("|");
													datos = valores[1].split("-");
													for (var u = 0; u < MatrizIndiceContratoComponentes.length; u++) {
														if (matrizContratoDetalle[datos[0]][0] == MatrizIndiceContratoComponentes[u][0]) {
															posicion = MatrizIndiceContratoComponentes[u][1];
															break;
														}
													}
													for (var r = posicion; r < nRegistros; r++) {
														campos = listaContratoComponentes[r].split("¦");
														if (matrizContratoDetalle[datos[0]][0] == campos[0]) {


															if (valorComponenteActual != campos[1]) {
																for (var u = 0; u < MatrizIndiceComponente.length; u++) {
																	if (campos[1] == MatrizIndiceComponente[u]) {
																		valorComponente = listaComponente[u].split("¦");
																		valorComponenteReal = valorComponente[1];
																		valorComponenteActual = campos[1];
																		break;
																	}
																}
															}

															if (valorServicioActual != campos[3]) {
																for (var u = 0; u < MatrizIndiceServicio.length; u++) {
																	if (campos[3] == MatrizIndiceServicio[u]) {
																		valorServicio = listaServicios[u].split("¦");
																		valorServicioReal = valorServicio[1];
																		valorServicioActual = campos[3];
																		break;
																	}
																}
															}
															encontrado = true;
															contenido += "<tr style='color:red'><td colspan='6'></td><td>&nbsp;";
															contenido += campos[1];
															contenido += "</td>";
															contenido += "<td>";
															contenido += valorComponenteReal;
															contenido += "</td>";
															contenido += "<td>";
															contenido += (campos[2] * 1).toFixed(3);
															contenido += "</td>";
															contenido += "<td>";
															contenido += valorServicioReal;
															contenido += "</td>";
															contenido += "<td colspan='3'></td></tr>";
															if (encontrado) {
																if (listaContratoComponentes[r + 1] != undefined) {
																	if (campos[0] != listaContratoComponentes[r + 1].split("¦")[0]) {
																		break;
																	}
																}
																else {
																	break;
																}
															}
														}
													}
												}
											}

											if (matrizContratoDetalle[z + 1] != undefined) {
												if (matrizContratoDetalle[z][2] != matrizContratoDetalle[z + 1][2]) {
													break;
												}
											}

										} else break;
									}
								}
							}
							if (matrizContratoDetalle[p + 1] == undefined) {
								break;
							}
							else {
								if (matrizContratoDetalle[p][0] != matrizContratoDetalle[p + 1][0]) {
									break;
								}
							}
						}
						if (matrizMedicoContrato[x + 1] == undefined) {
							break;
						}
						else {
							if (matrizMedicoContrato[x][0] != matrizMedicoContrato[x + 1][0]) {
								break;
							}
						}
					}
					else {
						valoractual = -1;
					}
				}

			}
		}
	}
	else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += nCabeceras.toString();
		contenido += "'>No hay datos</td></tr>";
	}
	ExcelExportar = contenido;
	contenido += ExcelExportar.replace(/display:none/gi, "");
	contenido += "</table></html>";
	return contenido;
}

function exportarExcelMedico(opcion) {
	var contenido = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	if (opcion) {
		for (var x = 0; x < cabecerasPrincipal.length; x++) {
			contenido += "<td style='color:white'>";
			contenido += cabecerasPrincipal[x];
			contenido += "</td>"
		}
	} else {
		for (var x = 0; x < cabecerasComponente.length; x++) {
			contenido += "<td style='color:white'>";
			contenido += cabecerasComponente[x];
			contenido += "</td>"
		}
	}
	contenido += "</tr>";

	var n = (opcion ? matrizPrincipal.length : matrizComponente.length);
	var campos;

	if (n > 0) {
		var nCampos = (opcion ? cabecerasPrincipal.length : cabecerasComponente.length);
		for (var i = 0; i < n; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				if (opcion) {
					for (var j = 0; j < nCampos; j++) {
						switch (j) {
							case 1:
								if (matrizPrincipal[i][6] != 0) {
									contenido += "<td style='text-align:left'><span class='puntero' style='text-decoration:underline;color:#00a850'>";
									contenido += matrizPrincipal[i][1];
									contenido += "</span></td>";
								}
								else {
									contenido += "<td style='text-align:left'><span>";
									contenido += matrizPrincipal[i][matrizIndicePrincipal[j]];
									contenido += "</span></td>";
								}
								break;
							case 2:
								contenido += "<td>";
								for (var x = 0; x < listaTipoMedico.length; x++) {
									if (listaTipoMedico[x][0] == matrizPrincipal[i][matrizIndicePrincipal[j]]) {
										contenido += listaTipoMedico[x][1];
										break;
									}
								}
								contenido += "</td>";
								break;
							case 10:
								contenido += "<td style='text-align:center'>";
								if (matrizPrincipal[i][matrizIndicePrincipal[j]] != 0) contenido += matrizPrincipal[i][matrizIndicePrincipal[j]];
								contenido += "</td>";
								break;
							case 9:
							case 11:
							case 12:
							case 14:
								contenido += "<td style='text-align:center'>";
								contenido += matrizPrincipal[i][matrizIndicePrincipal[j]];
								contenido += "</td>";
								break;
							case 15:
								contenido += "<td style='text-align:center'><span class='puntero' style='text-decoration:underline;color:#00a850'>";
								contenido += matrizPrincipal[i][matrizIndicePrincipal[j]];
								contenido += "</span></td>";
								break;
							default:
								contenido += "<td>";
								contenido += matrizPrincipal[i][matrizIndicePrincipal[j]];
								contenido += "</td>";
								break;
						}
					}
				} else {
					for (var j = 0; j < nCampos; j++) {
						switch (j) {
							case 2:
								contenido += "<td style='text-align:right'>";
								contenido += matrizComponente[i][matrizIndiceComponente[j]];
								contenido += "</td>";
								break;
							default:
								contenido += "<td style='text-align:left'>";
								contenido += matrizComponente[i][matrizIndiceComponente[j]];
								contenido += "</td>";
								break;
						}
					}
				}
				contenido += "</tr>";
			}
			else break;
		}
	}
	else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += nCabeceras.toString();
		contenido += "'>No hay datos</td></tr>";
	}
	ExcelExportarMedico = contenido;
	contenido += ExcelExportarMedico.replace(/display:none/gi, "");
	contenido += "</table></html>";
	return contenido;
}
/*===============================LLAMADAS===============================*/

function listarMedicoContrato(lista) {
	crearMatrizEX(lista.split("¯"), "¦", "Principal");
	paginarEX(0, "Principal");
	paginarEX(0, "Componente");
	document.getElementById("ddlEstadoMed").value = "ACTIVO";
	document.getElementById("ddlEstadoCabCont").value = "ACTIVO";
	document.getElementById("ddlEstadoMed").onchange();
	var url = urlBase + "Mantenimiento/listarComponente/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarCombo);
}

function listarMedicoContratoReporte(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		//listaMedicoContratoReporte = data[0].split("¯");
		var lista = data[1].split("¯");
		listaServicioComponente = crearMatrizEX(data[3].split("¯"), "¦");
		crearMatrizEX(data[2].split("¯"), "¦", "Componente");
		var valores = [];
		for (var x = 0; x < lista.length; x++) {
			valores = lista[x].split("¦");
			listaTipoMedico.push([valores[0], valores[1]]);
		}
		llenarComboTabla(listaTipoMedico, "ddlTipoMedico", "TODOS");
		listarMedicoContrato(data[0]);
	}

}

function DescargarArchivo(archivo) {
	NombreArchivoActual = archivo;
	var frm = new FormData();
	var extension = archivo.split(".");
	frm.append("archivoCliente", archivo);
	frm.append("extension", extension[extension.length - 1]);
	var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=1&contratoid=1" + "&idCompania=" + idCompania;
	var xhr = new XMLHttpRequest();
	xhr.open("post", url);
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			DescargarContrato(xhr.response);
		}
	}
	xhr.send(frm);
}

function DescargarContrato(rpta) {
	if (rpta.size > 0) {
		var archivo = NombreArchivoActual;
		var tipo = "";
		switch (archivo.split(".")[1]) {
			case "pdf":
				tipo = 'application/pdf';
				break;
			case "doc":
				tipo = 'application/msword';
				break;
			case "docx":
				tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
				break;
		}
		var blob = new Blob([rpta], {
			type: tipo
		});
		var a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = archivo;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		delete a;
	}
	else {
		var hdfRuta = document.getElementById("hdfRuta").value;
		mostraralerta("No se ha encontrado el archivo en el repositorio: " + hdfRuta + sucursalId);
	}
}

/*===============================FUNCIONES GENERICAS===============================*/

function formatearfecha(fecha) {
	var campos = fecha.split("/");
	var anio = campos[2];
	if (anio == "1900") {
		return "";
	}
	var mes = campos[1];
	mes = mes.length > 1 ? mes : '0' + mes;
	var dia = campos[0]
	dia = dia.length > 1 ? dia : '0' + dia;
	return dia + '/' + mes + '/' + anio;
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
		campos = lista[x];
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";

	}
	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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
	valorTabACtual = data_tab_actual;
}

function abrirPopup(objeto) {
	var popup = document.getElementById(objeto);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
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

/*===============================EVENTOS WINDOWS Y FUNCIONES ESPECIALES===============================*/

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();


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