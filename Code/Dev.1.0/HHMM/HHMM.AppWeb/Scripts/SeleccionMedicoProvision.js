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
var matrizBusquedaFiltro = [];
var listaTipo = [], listaClasificacion = [];
var medicosSeleccionados = [];

var cabecerasPrincipal = ["Código", "Médico", "Empresa", "Especialidad"];
var matrizIndicePrincipal = [0, 1, 2, 3];
var anchosPrincipal = [10, 30, 30, 30];


var registrosPagina = 6;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;

var urlBase = "", opcionfiltro = -1, opcionPopUp = -1, ss = "", Campoeliminar = "";

window.onload = function () {
	document.getElementById("chkfiltroseleccionados").checked = false;
	urlBase = window.parent.parent.document.getElementById("Ref").value;
	ss = window.parent.parent.document.getElementById("iss").value;
	var hdfDatos = document.getElementById("hdfDatos").value.split("¦");
	ConfiguracionInicial();
	var url = urlBase + "Mantenimiento/ListarSeleccionMedicoProvision?ss=" + ss + "&su=" + hdfDatos[0] + "&id=" + hdfDatos[1];
	$.ajax(url, "get", listarTodo);
};


function listarTodo(rpta) {
	if (rpta != "") {
		var data = rpta.split("¯");
		crearMatriz(data[0].split("¬"), "¦", "Principal");
		matrizBusquedaFiltro = matrizFiltroPrincipal.slice(0);
		paginar(0, "Principal");
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
        i = nRegistros;

	identificador = (identificador == undefined ? "" : identificador.trim());
	if (identificador != "") {
		window["matriz" + identificador] = [];
		window["matrizFiltro" + identificador] = [];
	}

	if (nRegistros > 0 && lista[0] != "") {

		switch (identificador) {
			case "Principal":
				var contador = 0;
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
						if (j == 0 || j == 4) {
							matriz[x][j] = matriz[x][j] * 1;

						}
						else {
							matriz[x][j] = matriz[x][j].trim();
						}
					}
					medicosSeleccionados.push([matriz[x][0], matriz[x][1], matriz[x][2], matriz[x][3], (matriz[x][4] == 1 ? true : false)]);
					if (matriz[x][4] == 1) {
						contador++;
					}
					j = 0;
					x++;

				}
				document.getElementById("spnCantidad").innerHTML = contador;
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
			contenido = "<table class='tabla-general' style='margin:0'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'><th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
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
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador + "' class='tabla-FilaCuerpo'>";
	contenido += "<tr ><td colspan='";
	contenido += (nCampos + 1).toString();
	contenido += "' style='text-align:center'>No hay datos</td></tr></tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador + "' colspan='";
	contenido += (nCampos + 1).toString();
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
	//var btngrabar = document.getElementById("btngrabar");
	//btngrabar.onclick = function () {
	//	var lista = "";
	//	var txtCodigo = document.getElementById("txtCodigo").value;
	//	var ddlClasificacion = document.getElementById("ddlClasificacion").value;
	//	var txtDescripcion = document.getElementById("txtDescripcion").value;
	//	var txtOrden = document.getElementById("txtOrden").value;
	//	var ddlTipoRecurso = document.getElementById("ddlTipoRecurso").value;
	//	var ddlEstado = document.getElementById("ddlEstado").value;
	//	lista = opcionPopUp + "¦" + txtDescripcion + "¦" + txtOrden + "¦" + ddlTipoRecurso + "¦" + ddlClasificacion + "¦" + ddlEstado;
	//	if (opcionPopUp == 2) {
	//		lista += "¦" + txtCodigo;
	//	}
	//	var url = urlBase + "Mantenimiento/grabarRecurso?ss=" + ss + "&su=" + sucursalId;
	//	$.ajax(url, "post", mostrarRespuesta, lista);
	//};
	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.onclick = function () {
		var lista = [];
		var id = document.getElementById("hdfDatos").value.split("¦")[1];
		var conf = document.getElementById("hdfDatos").value.split("¦")[2];
		for (var x = 0; x < medicosSeleccionados.length; x++) {
			if (medicosSeleccionados[x][4] == true) {
				lista.push(medicosSeleccionados[x][0]);
			}
		}
		if (lista.length == 0) {
			mostraralerta("Seleccione al menos un médico");
		} else {
			var url = urlBase + "Mantenimiento/ActSeleccionMedicoProvision?ss=" + ss + "&id=" + id + "&conf=" + conf;
			$.ajax(url, "post", mostrarRespuesta, lista.join("¬"));
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}

	var btnCancelar = document.getElementById("btnCancelar");
	btnCancelar.onclick = function () {
		window.parent.abrirPopup("PopupSeleccionMedicos");
	}

	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {
		var contenido = "";
		var contenido = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
		contenido += "<td style='width: 100px' align='center'>Código</td>";
		contenido += "<td style='width: 300px' align='center'>Médico</td>";
		contenido += "<td style='width: 300px' align='center'>Empresa</td>";
		contenido += "<td style='width: 400px' align='center'>Especialidad</td>";
		contenido += "</tr>";

		var nRegistros = matrizPrincipal.length;
		var nCampos = 4;
		for (i = 0; i < nRegistros; i++) {
			contenido += "<tr>";
			for (j = 0; j < nCampos; j++) {
				contenido += "<td>";
				contenido += matrizPrincipal[i][j];
				contenido += "</td>";
			}
			contenido += "</tr>";
		}
		contenido += "</table></html>";
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		this.download = "DetalleMedicoProvision.xls";
		this.href = window.URL.createObjectURL(formBlob);
	}

	var chkfiltroseleccionados = document.getElementById("chkfiltroseleccionados");
	chkfiltroseleccionados.onclick = function () {
		matrizPrincipal = [];
		var TextoPrincipal = document.getElementsByClassName("TextoPrincipal");
		if (this.checked) {
			document.getElementById("chkTodos").style.display = "none";
			for (var x = 0; x < medicosSeleccionados.length; x++) {
				if (medicosSeleccionados[x][4]) {
					matrizPrincipal.push([medicosSeleccionados[x][0], medicosSeleccionados[x][1], medicosSeleccionados[x][2], medicosSeleccionados[x][3], (medicosSeleccionados[x][4] == true ? 1 : 0)]);
				}
			}
			matrizFiltroPrincipal = [];
			matrizFiltroPrincipal = matrizPrincipal.slice(0);
		}
		else {
			document.getElementById("chkTodos").style.display = "";
			matrizPrincipal = matrizBusquedaFiltro.slice(0);
			matrizFiltroPrincipal = [];
			matrizFiltroPrincipal = matrizBusquedaFiltro.slice(0);
		}
		paginar(0, "Principal");
	}

	var chkTodos = document.getElementById("chkTodos");
	chkTodos.onclick = function () {
		var encontrado = false, posicion = -1;
		if (this.checked) {
			for (var x = 0; x < matrizPrincipal.length; x++) {
				for (var k = 0; k < medicosSeleccionados.length; k++) {
					if (matrizPrincipal[x][0] == medicosSeleccionados[k][0]) {
						encontrado = true;
						posicion = k;
						break;
					}
				}
				if (encontrado) {
					medicosSeleccionados[posicion][4] = true;
				}
				posicion = -1;
				encontrado = false;
			}
		}
		else {
			for (var x = 0; x < matrizPrincipal.length; x++) {
				for (var k = 0; k < medicosSeleccionados.length; k++) {
					if (matrizPrincipal[x][0] == medicosSeleccionados[k][0]) {
						encontrado = true;
						posicion = k;
						break;
					}
				}
				if (encontrado) {
					medicosSeleccionados[posicion][4] = false;
				}
				posicion = -1;
				encontrado = false;
			}
		}
		var contador = 0;
		for (var k = 0; k < medicosSeleccionados.length; k++) {
			if (medicosSeleccionados[k][4]) {
				contador++;
			}
		}
		document.getElementById("spnCantidad").innerHTML = contador;
		paginar(0, "Principal");
	}
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
					document.getElementById("chkTodos").checked = false;
					filtrar("Principal");
				}, 0);
			};
		} else {
			texto.onchange = function (e) {
				delay(function () {
					document.getElementById("chkTodos").checked = false;
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
				var valor = "";
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";

						if (document.getElementById("chkfiltroseleccionados").checked == false) {
							if (buscarEnMatriz(window["matriz" + identificador][i][0], window["matriz" + identificador][i][3])) {
								contenido += "<input type='checkbox' name='rdnMedico' data-id='";
								contenido += window["matriz" + identificador][i][0];
								contenido += "¦";
								contenido += window["matriz" + identificador][i][3];
								contenido += "' checked />";
							}
							else {
								contenido += "<input type='checkbox' name='rdnMedico' data-id='";
								contenido += window["matriz" + identificador][i][0];
								contenido += "¦";
								contenido += window["matriz" + identificador][i][3];
								contenido += "' />";
							}
						}
						contenido += "</td>";
						for (var j = 0; j < nCampos; j++) {
							contenido += "<td>";
							contenido += window["matriz" + identificador][i][matrizIndicePrincipal[j]];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}

				break;
		}
	} else {
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCampos + 1).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador).innerHTML = contenido;
	crearPaginas(identificador);
	if (esBloque) {
		crearPaginas(identificador);
	}
	var rdnMedico = document.getElementsByName("rdnMedico")
	for (var t = 0; t < rdnMedico.length; t++) {
		rdnMedico[t].onclick = function () {
			var id = this.getAttribute("data-id").split("¦");
			if (this.checked) {
				var nregistros = medicosSeleccionados.length;
				for (var x = 0; x < nregistros; x++) {
					if (medicosSeleccionados[x][0] == id[0] && medicosSeleccionados[x][3] == id[1]) {
						medicosSeleccionados[x][4] = true;
						break;
					}
				}
				var contador = 0;
				for (var u = 0; u < nregistros; u++) {
					if (medicosSeleccionados[u][4]) {
						contador++;
					}
				}
				document.getElementById("spnCantidad").innerHTML = contador;
			}
			else {
				var nregistros = medicosSeleccionados.length;
				for (var x = 0; x < nregistros; x++) {
					if (medicosSeleccionados[x][0] == id[0] && medicosSeleccionados[x][3] == id[1]) {
						medicosSeleccionados[x][4] = false;
						break;
					}
				}
				var contador = 0;
				for (var u = 0; u < nregistros; u++) {
					if (medicosSeleccionados[u][4]) {
						contador++;
					}
				}
				document.getElementById("spnCantidad").innerHTML = contador;
			}
		}
	}

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

function llenarCombo(lista, nombreCombo, separador, titulo) {
	var contenido = "",
        n = lista.length,
        campos = "";
	if (n > 0) {
		if (titulo != undefined || titulo.trim() != "") {
			contenido = "<option value=''>" + titulo + "</option>";
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

function exportacion(identificador) {
	var matriz = window["matriz" + identificador];
	var matrizCabecera = window["cabeceras" + identificador];
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	var nCampos = matrizCabecera.length;
	contenido.push("<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#03bf5d\"; color:\"\#FFF\"'>");
	for (var x = 0; x < nCampos; x++) {
		contenido.push("<td style='width: " + window["anchosExcel" + identificador] + "px' align='center'>" + matrizCabecera[x] + "</td>");
	}
	contenido.push("</tr>");
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 0; j < nCampos; j++) {
			switch (j) {
				case 2:
					contenido.push("<td>");
					for (var x = 0; x < listaTipo.length; x++) {
						valor = listaTipo[x].split("¦");
						if (valor[0] == window["matriz" + identificador][i][matrizIndicePrincipal[j]]) {
							contenido.push(valor[1]);
							break;
						}
					}
					break;
				case 3:
					contenido.push("<td>");
					for (var x = 0; x < listaClasificacion.length; x++) {
						valor = listaClasificacion[x].split("¦");
						if (valor[0] == window["matriz" + identificador][i][matrizIndicePrincipal[j]]) {
							contenido.push(valor[1]);
							break;
						}
					}
					break;
				case 4:
					contenido.push("<td>");
					contenido.push(window["matriz" + identificador][i][matrizIndicePrincipal[j]] == "A" ? "ACTIVO" : "INACTIVO");
					break;
				default:
					contenido.push("<td style='text-align:left'>");
					contenido.push(window["matriz" + identificador][i][matrizIndicePrincipal[j]]);
					break;

			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");

	}
	return (contenido.join("") + "</table></html>");
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function limpiarCabeceras() {
	var textos = document.getElementsByName("cabeceraPrincipal");
	var ntextos = textos.length;
	var texto;
	for (var i = 0; i < ntextos; i++) {
		texto = textos[i];
		if (texto.className.indexOf("Texto") > -1) {
			texto.value = "";
		} else {
			texto.selectedIndex = "0";
		}
	}
}


function buscarEnMatriz(id, espe) {
	var nregistros = medicosSeleccionados.length;
	for (var x = 0; x < nregistros; x++) {
		if (medicosSeleccionados[x][0] == id && medicosSeleccionados[x][3] == espe && medicosSeleccionados[x][4] == true) {
			return true;
			break;
		}
	}
	return false;
}

function mostrarRespuesta(rpta) {
	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.innerHTML = "Grabar";
	btnGrabar.onclick = function () {
		var lista = [];
		var id = document.getElementById("hdfDatos").value.split("¦")[1];
		var conf = document.getElementById("hdfDatos").value.split("¦")[2];
		for (var x = 0; x < medicosSeleccionados.length; x++) {
			if (medicosSeleccionados[x][4] == true) {
				lista.push(medicosSeleccionados[x][0]);
			}
		}
		if (lista.length == 0) {
			mostraralerta("Seleccione al menos un médico");
		} else {
			var url = urlBase + "Mantenimiento/ActSeleccionMedicoProvision?ss=" + ss + "&id=" + id + "&conf=" + conf;
			$.ajax(url, "post", mostrarRespuesta, lista.join("¬"));
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.onclick = null;
		}
	}
	if (rpta != "") {
		window.parent.document.getElementById("btnBuscar").click();
		window.parent.mostraralerta("Se ha actualizado con exito los datos");
		window.parent.abrirPopup("PopupSeleccionMedicos");
	}
	else {
		mostraralerta("Hubo un error");
	}
}