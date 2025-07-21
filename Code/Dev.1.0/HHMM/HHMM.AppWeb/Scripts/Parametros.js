var lista = [], lstEstado = [], lstSiNo = [],listaDetalle=[];
var matriz = [];
var matrizDetalle = [];
var cabeceras = ["Descripción"];
var cabecerasDetalle = ["Descripción", "Valor","Estado"];
var anchos = [100];
var anchosDetalle = [70,10, 20];
var matrizIndice = [1];
var matrizIndiceDetalle = [1, 2,3];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0, indiceActualBloqueDetalle = 0;
var indiceOrden = 0;
var indiceActualPagina = 0, indiceActualPaginaDetalle = 0;

var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var sucursalId = "";
var idConcepto = -1, idConceptoDetalle = 0;
var Campoeliminar = -1, CampoeliminarDetalle = -1;
window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var pos1 = window.location.href.indexOf("Mantenimiento");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Mantenimiento/parametrosListas?ss=" + ss + "&sucursal=" + sucursalId;
	$.ajax(url, "get", listarTodo);
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	crearTabla(false);
	crearTabla(true);
	configurarOrdenacion(true);
	configurarOrdenacion(false);
	configurarControles();
	configurarFiltro();
}

function EscogerOpcion(valor, tipo) {
	if (tipo) {
		var TituloPopupTurno = document.getElementById("TituloPopupTurno");
		var hdfOpc = document.getElementById("hdfOpc");
		var spnHistorial = document.getElementById("spnHistorial");
		if (valor) {
			hdfOpc.value = "1";
			TituloPopupTurno.innerHTML = "AGREGAR CONCEPTO";
			spnHistorial.style.display = "none";
		}
		else {
			hdfOpc.value = "2";
			TituloPopupTurno.innerHTML = "MODIFICAR CONCEPTO";
			spnHistorial.style.display = "inline";
		}
		var txtDescripcion = document.getElementById("txtDescripcion");
		txtDescripcion.focus();
	} else {
		var TituloPopupConceptoDetalle = document.getElementById("TituloPopupConceptoDetalle");
		var hdfOpc = document.getElementById("hdfOpc");
		var spnHistorialDetalle = document.getElementById("spnHistorialDetalle");
		if (valor) {
			hdfOpc.value = "1";
			TituloPopupConceptoDetalle.innerHTML = "AGREGAR SERVICIO";
			spnHistorialDetalle.style.display = "none";
		}
		else {
			hdfOpc.value = "2";
			TituloPopupConceptoDetalle.innerHTML = "MODIFICAR DETALLE";
		//	spnHistorialDetalle.style.display = "inline";
		}
	}
}

function listarTodo(rpta) {
	if (rpta != "") {
		var listas = rpta.split("¯");
		lista = (listas[0]? listas[0].split("¬"):[]);
		lstEstado = listas[1] != "" ? listas[1].split("¬") : [];
		lstSiNo = listas[2].split("¬");

		//llenarCombo(listaCombo, "ddlServicioDetalle");

	}
	configuracionInicial();
	listarConcepto();
	if (matriz.length > 0) {
		var tbl = document.getElementById("tbConcepto");
		if (tbl != null) {
			if (tbl.rows[0] != null && tbl.rows[0] != undefined) {
				if (tbl.rows[0].cells[0] != null) {
					tbl.rows[0].cells[0].click();
				}
			}
		}
	}
}


function listarConcepto(irUltimaPagina) {
	crearMatriz(true);
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, true);
	else {
		paginar(0, true);
		indiceActualBloque = 0;
	}
}


function paginar(indicePagina, tipo) {
	var nRegistros;
	var esBloque = (indicePagina < 0);
	if (tipo) {
		nRegistros = matriz.length;
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
	} else {
		nRegistros = matrizDetalle.length;
		if (esBloque) {
			var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
			if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
			var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
			if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
			switch (indicePagina) {
				case -1:
					indicePagina = 0;
					indiceActualBloqueDetalle = 0;
					break;
				case -2:
					if (indiceActualBloqueDetalle > 0) {
						indiceActualBloqueDetalle--;
						indicePagina = indiceActualBloqueDetalle * paginasBloque;
					}
					break;
				case -3:
					if (indiceActualBloqueDetalle < indiceUltimoBloque) {
						indiceActualBloqueDetalle++;
						indicePagina = indiceActualBloqueDetalle * paginasBloque;
					}
					break;
				case -4:
					indicePagina = indiceUltimaPagina;
					indiceActualBloqueDetalle = indiceUltimoBloque;
					break;
			}
		}
		indiceActualPagina = indicePagina;

	}
	if (tipo) {
		document.getElementById("spnDetalleConcepto").innerHTML = "";
		idConcepto = -1;
		idConceptoDetalle = -1;
		crearMatriz(false);
		mostrarMatriz(0, false);
	}
	mostrarMatriz(indicePagina, tipo);
}

function crearTabla(detalle) {
	if (!detalle) {
		var nCampos = cabeceras.length;
		var contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";

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

				contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
			
			contenido += "</th>";
		}

		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbConcepto' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginas' colspan='";
		contenido += (nCampos ).toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		document.getElementById("divTurno").innerHTML = contenido;
	} else {
		var nCampos = cabecerasDetalle.length;
		var contenido = "<table class='tabla-general'>";
		contenido += "<thead class='tabla-FilaCab'>";
		contenido += "<tr class='cabecera'>";
		//<span id='spnDetalle' style='display:none' class='Icons fa-plus' onclick='EscogerOpcion(true,false);limpiarFormulario(false);abrirPopup(\"PopupConceptoDetalle\");'></span>
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'></th>";
		for (var j = 0; j < nCampos; j++) {
			contenido += "<th style='width:";
			contenido += anchosDetalle[j];
			contenido += "%'><span id='spn";
			contenido += j.toString();
			contenido += "' class='EnlaceDetalle' data-orden='";
			contenido += matrizIndiceDetalle[j];
			contenido += "'>";
			contenido += cabecerasDetalle[j];
			contenido += "</span><br/>";
			if (j == 1) {
				var obj;
				contenido += "<select class='Combo' name='cabeceraDetalle' style='width:90%'><option value=''>TODOS</option>";
				for (var z = 0; z < lstSiNo.length; z++) {
					obj = lstSiNo[z].split("¦");
					contenido += "<option value='" + obj[0] + "'>";
					contenido += obj[1];
					contenido += "</option>";

				}

				contenido += "</select>";
			} else if (j == 2) {
				var obj;
				contenido += "<select class='Combo' name='cabeceraDetalle' style='width:90%'><option value=''>TODOS</option>";
				for (var z = 0; z < lstEstado.length; z++) {
					obj = lstEstado[z].split("¦");
					contenido += "<option value='" + obj[0] + "'>";
					contenido += obj[1];
					contenido += "</option>";

				}

				contenido += "</select>";

			} else {
				contenido += "<input type='text' class='Texto' name='cabeceraDetalle' style='width:90%'>";
			}
			contenido += "</th>";
		}
		//contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a></th>";
		contenido += "</tr>";
		contenido += "</thead>";
		contenido += "<tbody id='tbConceptoDetalle' class='tabla-FilaCuerpo'>";
		contenido += "</tbody>";
		contenido += "<tfoot>";
		contenido += "<tr><td id='tdPaginasDetalle' colspan='";
		contenido += (nCampos + 1).toString();
		contenido += "'></td></tr>";
		contenido += "</tfoot>";
		contenido += "</table>";
		document.getElementById("divTurnoDetalle").innerHTML = contenido;
	}
}

function crearMatriz(tipo) {
	var nRegistros;
	var nCampos;
	var campos;
	var x = 0;
	if (tipo) {
		nRegistros = lista.length;
		matriz = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			matriz[x] = [];
			nCampos = campos.length;
			for (var j = 0; j < nCampos; j++) {
				if (isNaN(campos[j]) || j == "") matriz[x][j] = campos[j];
				else matriz[x][j] = campos[j] * 1;
			}
			x++;
		}
	} else {
		nRegistros = listaDetalle.length;
		matrizDetalle = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = listaDetalle[i].split("¦");
		
				matrizDetalle[x] = [];
				nCampos = campos.length;
				for (var j = 0; j < nCampos; j++) {
					if (isNaN(campos[j]) || j == "") matrizDetalle[x][j] = campos[j];
					else matrizDetalle[x][j] = campos[j] * 1;
				}
				x++;
			
		}
	}
}

function mostrarMatriz(indicePagina, tipo) {
	var contenido = "";
	Campoeliminar = -1;
	CampoeliminarDetalle = -1;
	var n;
	if (tipo) {
		indiceActualPagina = indicePagina;
		n = matriz.length;
		if (n > 0) {
			var nCampos = matriz[0].length;
			var inicio = indicePagina * registrosPagina;
			var fin = inicio + registrosPagina;
			for (var i = inicio; i < fin; i++) {
				if (i < n) {
					contenido += "<tr id='Fil" + i + "' class='FilaDatos' data-v='" + matriz[i][0] + "'>";
					/*contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false,true);limpiarFormulario(true);mostrarConcepto(";
					contenido += matriz[i][0];
					contenido += ")'></span></td>";*/
					for (var j = 1; j < nCampos; j++) {
						if (j == 3) {
							contenido += "<td style='text-align:center'>";
							contenido += (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO");
						} else if (j == 2) {
							contenido += "<td style='text-align:center'>";
							contenido += (matriz[i][j] == "True" ? "SÍ" : "NO");
						}
						else {
							contenido += "<td>";
							contenido += matriz[i][j];

						}
						contenido += "</td>";
					}
					/*contenido += "<td style='text-align:center'><span class='Icons ";
					contenido += (matriz[i][3] == "A" ? "fa-trash-o" : "fa-check");
					contenido += "' onclick='abrirPopup(";
					contenido += '"PopupEstado"';
					contenido += ");Campoeliminar=";
					contenido += i;
					contenido += ";'";
					contenido += "></span></td>";*/
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
		document.getElementById("tbConcepto").innerHTML = contenido;
	} else {
		indiceActualPaginaDetalle = indicePagina;
		n = matrizDetalle.length;
		if (n > 0) {
			var nCampos = matrizDetalle[0].length;
			var inicio = indicePagina * registrosPagina;
			var fin = inicio + registrosPagina;
			var obj;
			for (var i = inicio; i < fin; i++) {
				if (i < n) {
					contenido += "<tr class='FilaDatos'>";
					contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false,false);limpiarFormulario(false);mostrarConceptoDetalle(";
					contenido += matrizDetalle[i][0];
					contenido += ")'></span></td>";
					for (var j = 1; j < nCampos; j++) {
						if (j == 2) {
							contenido += "<td>";
							for (var z = 0; lstSiNo.length; z++) {
								obj = lstSiNo[z].split("¦");
								if (matrizDetalle[i][2] == obj[0]) {
									contenido += obj[1];
									break;
								}
							}
						} else if (j == 3) {
							//(matrizDetalle[i][3] == "A" ? "ACTIVO" : "INACTIVO");

							contenido += "<td>";
							for (var z = 0; lstEstado.length; z++) {
								obj = lstEstado[z].split("¦");
								if (matrizDetalle[i][3] == obj[0]) {
									contenido += obj[1];
									break;
								}
							}

						}
						else {
							contenido += "<td>";
							contenido += matrizDetalle[i][j];
						}
						contenido += "</td>";
					}
					/*contenido += "<td style='text-align:center'><span class='Icons ";
					contenido += (matrizDetalle[i][3] == "A" ? "fa-trash-o" : "fa-check");
					contenido += "' onclick='abrirPopup(";
					contenido += '"PopupEstado"';
					contenido += ");CampoeliminarDetalle=";
					contenido += i;
					contenido += ";'";
					contenido += "></span></td>";*/
					contenido += "</tr>";
				}
				else break;
			}
		}
		else {
			var nCabeceras = cabecerasDetalle.length;
			contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
			contenido += (nCabeceras + 1).toString();
			contenido += "'>No hay datos</td></tr>";
		}
		document.getElementById("tbConceptoDetalle").innerHTML = contenido;

	}
	crearPaginas(tipo);
}

function configurarOrdenacion(tipo) {
	var enlaces, nEnlaces;
	var enlace;
	if (tipo) {
		enlaces = document.getElementsByClassName("Enlace");
		nEnlaces = enlaces.length;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			enlace.onclick = function () {
				ordenarMatriz(this, true);
				mostrarMatriz(indiceActualPagina, true);
			}
		}
	} else {
		enlaces = document.getElementsByClassName("EnlaceDetalle");
		nEnlaces = enlaces.length;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			enlace.onclick = function () {
				ordenarMatriz(this, false);
				mostrarMatriz(indiceActualPagina, false);
			}
		}
	}
}

function ordenarMatriz(enlace, tipo) {
	indiceOrden = enlace.getAttribute("data-orden");
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(tipo);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	if (tipo) {
		matriz.sort(ordenar);
	} else {
		matrizDetalle.sort(ordenar);
	}
}

function ordenar(x, y) {
	var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
	var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
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
				filtrar(true);
			}
		} else {
			texto.onchange = function (e) {
				filtrar(true);
			}
		}

	}
	var textoDetalle = document.getElementsByName("cabeceraDetalle");
	var nCombos = textoDetalle.length;
	for (var i = 0; i < nCombos; i++) {
		texto = textoDetalle[i];
		if (texto.nodeName == "INPUT") {
			texto.onkeyup = function (e) {
				filtrar(false);
			}
		} else {
			texto.onchange = function (e) {
				filtrar(false);
			}
		}
	}
}

function filtrar(tipo) {
	var cabeceras;
	var nCabeceras;
	var cabecera;
	var exito;
	var nRegistros;
	var nCampos;
	var contenido = "";
	var campos;
	var campoFiltrado;
	var x = 0;
	if (tipo) {
		idConcepto = -1;
		idConceptoDetalle = -1;
		cabeceras = document.getElementsByName("cabecera");
		nCabeceras = cabeceras.length;
		nRegistros = lista.length;
		matriz = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = lista[i].split("¦");
			campoFiltrado = campos.slice(1, 4);
			nCampos = campos.length;
			for (var j = 0; j < nCabeceras; j += 1) {
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
	} else {
		cabeceras = document.getElementsByName("cabeceraDetalle");
		nCabeceras = cabeceras.length;
		nRegistros = listaDetalle.length;
		matrizDetalle = [];
		for (var i = 0; i < nRegistros; i++) {
			campos = listaDetalle[i].split("¦");
			campoFiltrado = campos.slice(1, 4);
			nCampos = campos.length;
			if (idConcepto == campos[0]) {
				for (var j = 0; j < nCabeceras; j += 1) {
					exito = true;
					cabecera = cabeceras[j];
					if (cabecera.className == "Texto") exito = exito && (campoFiltrado[1].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
					else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
					if (!exito) break;
				}
				if (exito) {
					matrizDetalle[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j])) matrizDetalle[x][j] = campos[j];
						else matrizDetalle[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
		}
	}
	paginar(0, tipo);
	indiceActualBloque = 0;
	indiceActualBloqueDetalle = 0;
}


function limpiarEnlaces(tipo) {
	var enlaces;
	var nEnlaces;
	var enlace;
	var campo;
	if (tipo) {
		enlaces = document.getElementsByClassName("Enlace");
		nEnlaces = enlaces.length;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			campo = enlace.innerHTML;
			enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
		}
	} else {
		enlaces = document.getElementsByClassName("EnlaceDetalle");
		nEnlaces = enlaces.length;
		for (var i = 0; i < nEnlaces; i++) {
			enlace = enlaces[i];
			campo = enlace.innerHTML;
			enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
		}
	}
}

function crearPaginas(tipo) {
	var nRegistros = (tipo ? matriz.length : matrizDetalle.length);
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";

	var indiceActualBloquetipo = (tipo ? indiceActualBloque : indiceActualBloqueDetalle);

	var inicio = indiceActualBloquetipo * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloquetipo > 0 && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-1," + (tipo ? true : false) + ");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2," + (tipo ? true : false) + ");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
			contenido += i;
			contenido += "," + (tipo ? true : false) + ");'  title='Ir a la pagina ";
			contenido += (i + 1).toString();
			contenido += "' id='a";
			contenido += i.toString() + (tipo ? "" : "Detalle");
			contenido += "' class='pagina' >";
			contenido += (i + 1).toString();
			contenido += "</span>";

		} else break;
	}
	if (indiceActualBloquetipo < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3," + (tipo ? true : false) + ");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4," + (tipo ? true : false) + ");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		if (tipo) {
			document.getElementById("tdPaginas").innerHTML = "";
		} else {
			document.getElementById("tdPaginasDetalle").innerHTML = "";
		}
	}
	else {
		if (tipo) {
			document.getElementById("tdPaginas").innerHTML = contenido;
		} else {
			document.getElementById("tdPaginasDetalle").innerHTML = contenido;
		}
		seleccionarPaginaActual(tipo);
	}
}

function seleccionarPaginaActual(tipo) {
	var aPagina = document.getElementById("a" + indiceActualPagina + (tipo ? "" : "Detalle"));
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}

function mostrarConcepto(id) {
	var nCampos = matriz.length;
	var campo = "";
	var txtDescripcion = document.getElementById("txtDescripcion");
	var txtEstado = document.getElementById("txtEstado");
	var txtIndAdm = document.getElementById("txtIndAdm");
	var hdfCd = document.getElementById("hdfCd");
	for (var i = 0; i < nCampos; i++) {
		campo = matriz[i][0];
		if (campo == id) {
			hdfCd.value = id;
			txtDescripcion.value = matriz[i][1];
			txtIndAdm.checked = (matriz[i][2] == "True" ? true : false);
			txtEstado.value = (matriz[i][3] == "A" ? "ACTIVO" : "INACTIVO");
			idConcepto = id;
			abrirPopup('PopupConcepto');
			break;
		}
	}
}
function mostrarConceptoDetalle(id) {
	var nCampos = matrizDetalle.length;
	var campo = "";
	var chkValorDetalle = document.getElementById("chkValorDetalle");
	var txtDescripcionDetalle = document.getElementById("txtDescripcionDetalle");
	var hdfCd = document.getElementById("hdfCd");
	for (var i = 0; i < nCampos; i++) {
		campo = matrizDetalle[i][0];
		if (campo == id) {
			hdfCd.value = id;
			txtDescripcionDetalle.value = matrizDetalle[i][1];
			chkValorDetalle.checked = (matrizDetalle[i][2] == "1" );
			idConceptoDetalle = id;
			abrirPopup('PopupConceptoDetalle');
			break;
		}
	}
}


function crearCabeceraExportar(tipo) {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	if (tipo) {
		cabecera += "<td style='width: 60px' align='center'>Id</td>";
		cabecera += "<td style='width: 210px' align='center'>Descripción</td>";
		cabecera += "<td style='width: 80px' align='center'>Ind. Adm.</td>";
		cabecera += "<td style='width: 60px' align='center'>Estado</td>";
	} else {
		cabecera += "<td style='width: 60px' align='center'>IdConcepto</td>";
		cabecera += "<td style='width: 60px' align='center'>IdConceptoServicio</td>";
		cabecera += "<td style='width: 210px' align='center'>Servicio</td>";
		cabecera += "<td style='width: 60px' align='center'>Estado</td>";
	}
	cabecera += "</tr>";
	return cabecera;
}

function exportacion(tipo) {
	var nRegistros;
	var nCampos;
	var contenido = [];
	if (tipo) {
		nRegistros = matriz.length;
		if (nRegistros > 0) {
			nCampos = matriz[0].length;
			excelExportar = crearCabeceraExportar(tipo);
			for (var i = 0; i < nRegistros; i++) {
				contenido.push("<tr>");
				for (var j = 0; j < nCampos; j++) {
					if (j == 3) {
						contenido.push("<td align='center'>" + (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
					} else if (j == 2) {
						contenido.push("<td align='center'>" + (matriz[i][j] == "True" ? "SÍ" : "NO") + "</td>")
					}
					else {
						contenido.push("<td>" + matriz[i][j] + "</td>");
					}
				}
				contenido.push("</tr>");
			}
		}

	} else {
		nRegistros = matrizDetalle.length;
		if (nRegistros > 0) {
			nCampos = matrizDetalle[0].length;
			excelExportar = crearCabeceraExportar(tipo);
			var obj;
			for (var i = 0; i < nRegistros; i++) {
				contenido.push("<tr>");
				for (var j = 0; j < nCampos; j++) {
					if (j == 3) {
						contenido.push("<td align='center'>" + (matrizDetalle[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
					} else if (j == 2) {
						contenido.push("<td>");
						for (var z = 0; z < listaCombo.length; z++) {
							obj = listaCombo[z].split("¦");
							if (matrizDetalle[i][2] == obj[0]) {
								contenido.push(obj[1]);
								break;
							}
						}
						contenido.push("</td>");
					}
					else {
						contenido.push("<td>" + matrizDetalle[i][j] + "</td>");
					}
				}
				contenido.push("</tr>");
			}
		}
	}
	excelExportar += contenido.join("") + "</table></html>";
}


function configurarControles() {
	/*
	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		var nRegistros = matriz.length;
		if (nRegistros > 0) {
			exportacion(true);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "Concepto.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
	aExportarExcelDetalle.onclick = function () {
		var nRegistros = matrizDetalle.length;
		if (nRegistros > 0) {
			exportacion(false);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "ConceptoDetalle.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}
	*/
	var sucursalNombre = window.parent.document.getElementById("isuc").value.split("|")[1];


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
	var btngrabar = document.getElementById("btngrabar")
	btngrabar.onclick = function () {
		if (validarConcepto(true)) {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var txtDescripcion = document.getElementById("txtDescripcion").value;
			var txtIndAdm = document.getElementById("txtIndAdm").checked;

			var strDatos = hdfOpc + "|" + txtDescripcion + "|" + (txtIndAdm ? "True" : "False");
			if (hdfOpc == 2) {
				strDatos += "|" + idConcepto;
			}
			var ss = window.parent.document.getElementById("iss").value;
			var url = urlBase + "Mantenimiento/grabarConcepto?ss=" + ss + "&su=" + sucursalId;
			$.ajax(url, "post", mostrarGrabar, strDatos);
			abrirPopup("PopupConcepto");
		}
	}
	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1;
		var valor2;
		if (Campoeliminar != -1) {
			valor1 = matriz[Campoeliminar][0];
			valor2 = matriz[Campoeliminar][3];
		} else {
			valor1 = matrizDetalle[CampoeliminarDetalle][1];
			valor2 = matrizDetalle[CampoeliminarDetalle][3];
		}
		anular(valor1, valor2);
	}
	var tbConcepto = document.getElementById("tbConcepto");
	tbConcepto.onclick = function (e) {
		var cnt = e.target || e.srcElement;
		if (cnt.nodeName == "TD") {
			limpiarSeleccionado();
			var tr = cnt.parentNode;
			idConcepto = tr.getAttribute("data-v") * 1;
			tr.className += " Seleccionado";
			document.getElementById("spnDetalleConcepto").innerHTML = tr.cells[0].textContent;
			//document.getElementById("spnDetalle").style.display = "";

			var ss = window.parent.document.getElementById("iss").value;
			var url = urlBase + "Mantenimiento/parametrosPorIdListar?ss=" + ss + "&parametroId=" + idConcepto;
			$.ajax(url, "get", listarDetalle);


		}
	}
	var btngrabarDetalle = document.getElementById("btngrabarDetalle");
	btngrabarDetalle.onclick = function () {
		if (validarConcepto(false)) {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var txtDescripcionDetalle = document.getElementById("txtDescripcionDetalle").value;
			let chkValorDetalle = document.getElementById("chkValorDetalle");


			var strDatos = idConcepto + "¦" + idConceptoDetalle + "¦" + txtDescripcionDetalle + "¦" + (chkValorDetalle.checked?1:0);

			var ss = window.parent.document.getElementById("iss").value;
			var url = urlBase + "Mantenimiento/actualizarParametro?ss=" + ss + "&su=" + sucursalId;
			$.ajax(url, "post", mostrarGrabar, strDatos);
			abrirPopup("PopupConceptoDetalle");
		}
	}
}

function listarDetalle(rpta) {
	if (rpta) {

		listaDetalle = rpta.split("¬");
	}


	indiceActualPaginaDetalle = 0;
	indiceActualBloqueDetalle = 0;
	crearMatriz(false);
	paginar(0, false);

}

function limpiarSeleccionado() {
	var tbConcepto = document.getElementById("tbConcepto");
	var n = tbConcepto.rows.length;
	for (var i = 0; i < n; i++) {
		tbConcepto.rows[i].className = tbConcepto.rows[i].className.split("Seleccionado").join("");
	}

}

function anular(id, estado) {
	var ss = window.parent.document.getElementById("iss").value;
	var tp = 0;
	if (CampoeliminarDetalle != -1) {
		tp = 1;
	}
	var url = urlBase + "Mantenimiento/anularConcepto?ss=" + ss + "&su=" + sucursalId + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A") + "&tp=" + tp;
	$.ajax(url, "get", mostrarGrabar);
	abrirPopup('PopupEstado');
}

function mostrarGrabar(rpta) {
	if (rpta != "") {
	
		
		var idConceptofiltro = idConcepto;


		if (idConceptofiltro != -1) {
			var pos = buscarConcepto(idConceptofiltro * 1);
			if (pos != -1) {
				var registrosPagina = 10;
				var indicePagina = Math.floor(pos / registrosPagina);
				if (indicePagina < 0) {
					indicePagina = 0;
				}
				//if (pos % registrosPagina == 0) indicePagina--;

				var indiceBloque = Math.floor(pos / (paginasBloque * registrosPagina));
				if (pos % (paginasBloque * registrosPagina) == 0) {
					if (indiceBloque > 0) {
						indiceBloque--;
					}
				}
				indicePagina = indicePagina < 0 ? 0 : indicePagina;
				indiceActualPagina = indicePagina;
				indiceActualBloque = indiceBloque;
				mostrarMatriz(indicePagina, true);
				var id = "Fil" + pos;
				document.getElementById(id).cells[0].click();
				//document.getElementById("tbConcepto").rows[0].cells[0].click();

			}
		}


	}
}
function buscarConcepto(id) {
	var n = matriz.length, pos = -1;
	if (n > 0) {
		var reg;
		for (var i = 0; i < n; i++) {
			reg = matriz[i];
			if (id == reg[0]) {
				pos = i;
				break;
			}
		}
	}
	return pos;
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

function validarConcepto(tipo) {
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	if (tipo) {
		var txtDescripcion = document.getElementById("txtDescripcion");

		var mensajeDescripcion = validarTexto(txtDescripcion.id, "descripción", true);
		if (mensajeDescripcion != "") {
			mensajeValidacion[txtDescripcion.getAttribute("data-secuencia")] = mensajeDescripcion;
			txtDescripcion.className += " error";
		}
	} else {

	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}
}
function validarCombo(Tex, Mensaje, Obligatorio) {
	var Texto = document.getElementById(Tex);
	if (Texto != null) {
		if (Obligatorio) {
			if (Texto.value == "") {
				return 'Seleccione ' + Mensaje;
			}
		}
	}
	return "";
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function limpiarFormulario(tipo) {

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
	if (tipo) {
		document.getElementById("txtEstado").value = "ACTIVO";
	} else {
		//document.getElementById("txtEstadoDetalle").value = "ACTIVO";
	}

}

function llenarCombo(lista, nombreCombo, filtrar) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	contenido = "<option value=''>Seleccione</option>";
	for (var x = 0; x < n; x++) {
		campos = lista[x].split("¦");
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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