var lista = [];
var matriz = [];
var cabeceras = ["Sucursal", "Periodo", "Descripción", "Inicio", "Fin","Fecha cierre", "Estado"];
var anchos = [15, 15, 20, 10, 10,10, 10];
var matrizIndice = [0, 1, 2, 3, 4, 5,6];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var idPerfil = -1;
var tituloPoup = "";
var Campoeliminar = "";
var Campoeliminar1 = -1;
var $ = {
	ajax: function (url, type, success, text, textLoading) {
		requestServer(url, type, success, text, textLoading);
	}
}

function requestServer(url, type, success, text, textLoading) {
    var xhr = new XMLHttpRequest();
    //-------------------------
    var divEspera = document.getElementById('divEspera');
    divEspera.className = 'loading';
    var c = [];
    c.push('<div class="circle"></div>');
    c.push('<div class="circle-small"></div>');
    c.push('<div class="circle-big"></div>');
    c.push('<div class="circle-inner-inner"></div>');
    c.push('<div class="circle-inner"></div>');
	c.push('<div id="Espera_Texto" class="loading-text">');
	if (textLoading) {
		c.push(textLoading);
    }
	c.push('</div>');
    divEspera.innerHTML = c.join('');
    //-------------------------
    //window.parent.document.getElementById('_loading').classList.remove('hide');
    xhr.open(type, url);
    xhr.onloadstart = function () {
        if (divEspera != null)
            divEspera.style.display = "inline";
    }
	xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            //window.parent.document.getElementById('_loading').classList.add('hide');
            divEspera.style.display = "none";
			if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload")
				window.parent.parent.location.reload();
            success(xhr.responseText);
		}
	}
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
    }
    //xhr.ontimeout = function () {
    //    //$loading.inactive();
    //    $alert.show(data.timeoutMessage, 'W');
    //    resolve("");//si se cancela por timeout que devuelva vacio
    //};
}

window.onload = function () {
	estableceSucursal();
	configurarControles();
}

window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function estableceSucursal() {
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	document.getElementById("txtSucursal").value = sucursal;
	document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
}

function buscarPeriodo() {
	var pos1 = window.location.href.indexOf("Proceso");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
	var anio = document.getElementById("txtAnio").value;
	var url = urlBase + "Proceso/listarPeriodo/?ss=" + ss + "&idSucursal=" + sucursal + "&anio=" + anio;
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla();
	configurarOrdenacion();
	configurarControlExcel();
	configurarFiltro();
}

function listarTodo(rpta) {
	lista = [];
	if (rpta != "") {
		lista = rpta.split("¯");
		listarPeriodos();
	}
	else {
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbPeriodo").innerHTML = contenido;
	}
}

function listarPeriodos(irUltimaPagina) {
	crearMatriz();
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		paginar(0);
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
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general tabla-corta' style='max-width: 80%'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='operacion(\"Creación de Periodo\");EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupPeriodo\");estableceFormulario();'></span></th>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace' data-orden='";
		contenido += matrizIndice[j + 1];
		contenido += "'>";
		contenido += cabeceras[j];
		contenido += "</span><br/>";
		if (j == (nCampos - 1)) contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
		else contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "<th style='width:5%;vertical-align: middle;text-align: center;' colspan='2'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbPeriodo' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divPeriodo").innerHTML = contenido;
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
		for (j = 0; j < nCampos-1; j++) {
			if (isNaN(campos[j])) matriz[x][j] = campos[j];
			else matriz[x][j] = campos[j] * 1;
		}
		x++;
	}

}

function mostrarMatriz(indicePagina) {
	indiceActualPagina = indicePagina;
	var contenido = "";
	var n = matriz.length;
	if (n > 0) {
		var nCampos = matriz[0].length - 3;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarPeriodo(";
				contenido += matriz[i][0];
				contenido += ")'></span></td>";
				for (var j = 1; j < nCampos; j++) {

					if (j == (nCampos - 1)) {
						contenido += "<td style='text-align:center'>";
						switch (matriz[i][j]) {
							case "A":
								contenido += "ACTIVO";
								break;
							case "I":
								contenido += "INACTIVO";
								break;
							case "P":
								contenido += "EN PROCESO";
								break;
							case "F":
								contenido += "PROVISIONADO";
								break;
						}

					}
					else {
						contenido += "<td>";
						if (j == 4 || j == 5) {
							contenido += matriz[i][j].split(" ")[0];
						}
						else if (j == 6) {
							contenido += ((matriz[i][j].indexOf("1900") > -1 || matriz[i][j].indexOf("0001") > -1) ? "" : matriz[i][j]);
						} else {
							contenido += matriz[i][j];
						}
					}
					contenido += "</td>";
				}
				contenido += "<td style='text-align:center'><span class='Icons ";
				contenido += ((matriz[i][7] == "P" || matriz[i][7] == "F") ? "" : (matriz[i][7] == "A" ? "fa-trash-o" : "fa-check"));
				contenido += "' onclick='operacion(\"Actualizar Estado Periodo\");abrirPopup(";
				contenido += '"PopupEstado"';
				contenido += ");Campoeliminar=";
				contenido += i;
				contenido += ";'";
				contenido += "></span></td>";
				contenido += "<td style='text-align:center'><span class='Icons ";

				contenido += ((matriz[i][10] == "A" ? "fa-unlock" : "fa-lock"));
				contenido += "'";
				if (matriz[i][10] != "C") {
					//if (true) {
					contenido += " onclick='operacion(\"Actualizar Estado Periodo\");abrirPopup(";
					contenido += '"PopupEstado"';
					contenido += ");Campoeliminar1=";
					contenido += i;
					contenido += ";'";
				}
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
	document.getElementById("tbPeriodo").innerHTML = contenido;
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
	if (esFechaValida(valX) && esFechaValida(valY)) {
		valX = convertirFecha(valX);
		valY = convertirFecha(valY);
		return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
	}
	else {
		return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
	}
}

function esFechaValida(strFecha) {
	var arr = strFecha.toString().split('/');
	var y = arr[2], m = arr[1], d = arr[0];
	var diasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if ((!(y % 4) && y % 100) || !(y % 400)) {
		diasMes[1] = 29;
	}
	return d <= diasMes[--m]
}

function convertirFecha(strFecha) {
	var arr = strFecha.split("/");
	return new Date(arr[2], arr[1] - 1, arr[0]);
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
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = lista[i].split("¦");
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == "Texto") exito = exito && (campos[j + 1].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[j + 1] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos-1; j++) {
				if (isNaN(campos[j])) matriz[x][j] = campos[j];
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
	cabecera += "<td style='width: 120px' align='center'>Sucursal</td>";
	cabecera += "<td style='width: 100px' align='center'>Periodo</td>";
	cabecera += "<td style='width: 250px' align='center'>Descripción</td>";
	cabecera += "<td style='width: 100px' align='center'>Inicio</td>";
	cabecera += "<td style='width: 100px' align='center'>Fin</td>";
	cabecera += "<td style='width: 180px' align='center'>Fecha Cierre</td>";
	cabecera += "<td style='width: 80px' align='center'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}

function exportacion() {
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length - 3;
	var contenido = [];
	textoExportar = [];
	excelExportar = crearCabeceraExportar();
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (j = 1; j < nCampos; j++) {
			if (j == (nCampos - 1)) {
				contenido.push("<td>" + (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
			} else {
				if (j == 4 || j == 5) {
					contenido.push("<td>" + matriz[i][j].split(" ")[0] + "</td>");
				} else if (j == 6) {
					contenido.push("<td>" + ((matriz[i][j].indexOf("1900") > -1 || matriz[i][j].indexOf("0001") > -1) ? "" : matriz[i][j]) + "</td>");
				} else {
					contenido.push("<td>" + matriz[i][j] + "</td>");
				}
			}
			if (j < (nCampos - 1)) {
				textoExportar.push(matriz[i][j] + ", ");
			}
			else {
				if (j == (nCampos - 1)) textoExportar.push((matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + ", ");
				else textoExportar.push(matriz[i][j] + ", ");
			}

		}
		contenido.push("</tr>");
		textoExportar.push("\r\n");
	}
	textoExportar = textoExportar.join("");
	excelExportar += contenido.join("") + "</table></html>";
}

function configurarControlExcel() {

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {

		if (lista.length <= 0) {
			mostrarlerta('No hay datos para exportar.');
			return;
		};

		// Exportar, según Tipo de Navegador
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var resultado = false;

		exportacion();

		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // Internet Explorer
		{
			txtExportar.document.open("txt/html", "replace");
			txtExportar.document.write(excelExportar);
			txtExportar.document.close();
			txtExportar.focus();
			resultado = txtExportar.document.execCommand("SaveAs", true, "Periodos.xls");
		}
		else // Otro Navegador
		{
			//resultado = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excelExportar));

			var formBlob = new Blob([excelExportar], { type: "type:'text/html'" });
			var url = window.URL.createObjectURL(formBlob);
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.href = url;
			a.download = "Periodos.xls";
			a.click();
			setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
			resultado = true;
		}

		return resultado;
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

	var btnBuscar = document.getElementById("btnBuscar");
	btnBuscar.onclick = function () {
		if (!validarBusqueda()) return;
		buscarPeriodo();
	}

	var btngrabar = document.getElementById("btngrabar")
	btngrabar.onclick = function () {

		if (validarPeriodo()) {
			grabarForm()
		}
	}

	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1;
		var valor2;
		var valor3;
		if (Campoeliminar1 != -1) {
			valor1 = matriz[Campoeliminar1][0];
			valor2 = matriz[Campoeliminar1][10];
		
			valor3 = 1;
		} else {
			valor1 = matriz[Campoeliminar][0];
			valor2 = matriz[Campoeliminar][7];
			valor3 = 0;
		}
		anular(valor1, valor2, valor3);
	}

}

function validarPeriodo() {

	var txtSucursalPeriodo = document.getElementById("txtSucursalPeriodo");
	var cboMesPeriodo = document.getElementById("cboMesPeriodo");
	var txtAnioPeriodo = document.getElementById("txtAnioPeriodo");
	var txtDescripcionPeriodo = document.getElementById("txtDescripcionPeriodo");
	var txtEstadoPeriodo = document.getElementById("txtEstadoPeriodo");

	mensajeValidacion = [];
	var validar = document.getElementById("PopupPeriodo").getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeSucursal = validarTexto(txtSucursalPeriodo.id, "Sucursal", true);
	if (mensajeSucursal != "") {
		mensajeValidacion[txtSucursalPeriodo.getAttribute("data-secuencia")] = mensajeSucursal;
		txtSucursalPeriodo.className += " error";
	}

	var mensajeMes = validarCombo(cboMesPeriodo.id, "Mes", true);
	if (mensajeMes != "") {
		mensajeValidacion[cboMesPeriodo.getAttribute("data-secuencia")] = mensajeMes;
		cboMesPeriodo.className += " error";
	}

	var mensajeAnio = validarTexto(txtAnioPeriodo.id, "Año", true);
	if (mensajeAnio != "") {
		mensajeValidacion[txtAnioPeriodo.getAttribute("data-secuencia")] = mensajeAnio;
		txtAnioPeriodo.className += " error";
	}

	var mensajeDescripcion = validarTexto(txtDescripcionPeriodo.id, "Descripción", true);
	if (mensajeDescripcion != "") {
		mensajeValidacion[txtDescripcionPeriodo.getAttribute("data-secuencia")] = mensajeDescripcion;
		txtDescripcionPeriodo.className += " error";
	}

	var mensajeEstado = validarTexto(txtEstadoPeriodo.id, "Estado", true);
	if (mensajeEstado != "") {
		mensajeValidacion[txtEstadoPeriodo.getAttribute("data-secuencia")] = mensajeEstado;
		txtEstadoPeriodo.className += " error";
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
			if (Texto.value.match(/[,;]+/) != null && Tex != "txtDescripcionPeriodo") {
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

function validarBusqueda() {

	var txtAnio = document.getElementById("txtAnio");


	mensajeValidacion = [];

	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}

	var mensajeAnio = validarTexto(txtAnio.id, "Año", true);
	if (mensajeAnio != "") {
		mensajeValidacion[txtAnio.getAttribute("data-secuencia")] = mensajeAnio;
		txtAnio.className += " error";
		txtAnio.focus();
	}


	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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

function mostrarPeriodo(id) {

	var nCampos = matriz.length;
	var campo = "";
	var hdfPeriodoId = document.getElementById("hdfPeriodoId");
	var txtSucursal = document.getElementById("txtSucursalPeriodo");
	var cboMes = document.getElementById("cboMesPeriodo");
	var txtAnio = document.getElementById("txtAnioPeriodo");
	var txtDescripcion = document.getElementById("txtDescripcionPeriodo");
	var txtEstado = document.getElementById("txtEstadoPeriodo");
	for (var i = 0; i < nCampos; i++) {
		campo = matriz[i][0];
		if (campo == id) {
			hdfPeriodoId.value = matriz[i][0];
			txtSucursal.value = matriz[i][1];
			cboMes.selectedIndex = matriz[i][9];
			txtAnio.value = matriz[i][8];
			txtDescripcion.value = matriz[i][3];
			switch (matriz[i][7]) {
				case "A":
					txtEstado.value = "ACTIVO";
					break;
				case "I":
					txtEstado.value = "INACTIVO";
					break;
				case "P":
					txtEstado.value = "EN PROCESO";
					break;
				case "F":
					txtEstado.value = "PROVISIONADO";
					break;
			}
			idPerfil = id;
			if (matriz[i][10] == "C") {
				document.getElementById("btngrabar").style.display = "none";
			} else {
				document.getElementById("btngrabar").style.display = "";
			}
			//if (matriz[i][6] == "I") { mostraralerta("El registro se encuentra Inactivo."); break; return; }
			operacion("Modificar Periodo");
			abrirPopup('PopupPeriodo');
			break;
		}
	}
}

function grabarForm() {
	var hdfPeriodoId = document.getElementById("hdfPeriodoId");
	var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var cboMesPeriodo = document.getElementById("cboMesPeriodo");
	var txtAnioPeriodo = document.getElementById("txtAnioPeriodo");
	var txtDescripcionPeriodo = document.getElementById("txtDescripcionPeriodo");
	var txtEstadoPeriodo = document.getElementById("txtEstadoPeriodo");

	var frm = new FormData();
	frm.append("PeriodoId", hdfPeriodoId.value);
	frm.append("SucursalId", intSucursalId);
	frm.append("Anio", txtAnioPeriodo.value);
	frm.append("Mes", cboMesPeriodo.value);
	frm.append("Descripcion", txtDescripcionPeriodo.value);

	if (tituloPoup == "Creación de Periodo") {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Proceso/adicionarPeriodo/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
	else {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Proceso/actualizarPeriodo/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
}

function anular(id, estado,valor) {
	var ss = window.parent.document.getElementById("iss").value;

	var estadoRegistro = (Campoeliminar1 != -1 ? (estado == "A" ? "C" : "A") : (estado == "A" ? "I" : "A"));

	var frm = new FormData();
	frm.append("PeriodoId", id);
	frm.append("EstadoRegistro", estadoRegistro);
	frm.append("tipo", valor)

	var url = urlBase + "Proceso/actualizarPeriodoEstado/?ss=" + ss;

	if (estadoRegistro === 'C') {
		$.ajax(url, "post", mostrarGrabar, frm, 'Cierre en Proceso, espere un momento...');
	} else {
		$.ajax(url, "post", mostrarGrabar, frm);
	}

	abrirPopup('PopupEstado');
}

function mostrarGrabar(rpta) {
	if (rpta != "") {
		var data = rpta.split("¬");
		if (data[1] != "-1") {
			lista = [];
			lista = data[0].split("¯");
			var res = data[1];
			if (tituloPoup == "Creación de Periodo") {
				mostraralerta("Se ha agregado un nuevo registro");
				abrirPopup("PopupPeriodo");
			}
			else if (tituloPoup == "Modificar Periodo") {
				mostraralerta("Se ha actualizado el registro");
				abrirPopup("PopupPeriodo");
			} else {
				mostraralerta("Se ha actualizado el estado de un registro");
			}
			listarPeriodos();
			Campoeliminar1 = -1;
		}
		else {
			if (tituloPoup == "Creación de Periodo") {
				mostraralerta("Ya existe un periodo registrado");
			}
			else if (tituloPoup == "Modificar Periodo") {
				mostraralerta("Ya existe un periodo registrado");
			} else {
				if (Campoeliminar1 != -1) {
					mostraralerta("Existen procesos de provisión en curso - deben estar en estado provisionado");
					Campoeliminar1 = -1;
				} else {
					mostraralerta("No se puede realizar cambio de estado");
				}
			}
		}
	}
}

function operacion(titulo) {
	tituloPoup = titulo;
}

function verHistorial(t) {
	var hdfCd = document.getElementById("hdfPeriodoId");
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

function EscogerOpcion(valor) {
	var hdfOpc = document.getElementById("hdfOpc");
	var spnHistorial = document.getElementById("spnHistorial");
	if (valor) {
		hdfOpc.value = "1";
		spnHistorial.style.display = "none";
	}
	else {
		hdfOpc.value = "2";
		spnHistorial.style.display = "";
	}
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	var span = document.getElementById('TituloPopupPeriodo');
	span.textContent = tituloPoup;
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function estableceFormulario() {
	var txtSucursalPeriodo = document.getElementById("txtSucursalPeriodo");
	var cboMesPeriodo = document.getElementById("cboMesPeriodo");
	var txtEstadoPeriodo = document.getElementById("txtEstadoPeriodo");
	txtSucursalPeriodo.value = window.parent.document.getElementById("isuc").value.split("|")[1];
	cboMesPeriodo.selectedIndex = "0";
	txtEstadoPeriodo.value = "ACTIVO";
	cboMesPeriodo.focus();
}

function limpiarFormulario() {
	var hdfPeriodoId = document.getElementById("hdfPeriodoId");
	var txtSucursalPeriodo = document.getElementById("txtSucursalPeriodo");
	var cboMesPeriodo = document.getElementById("cboMesPeriodo");
	var txtAnioPeriodo = document.getElementById("txtAnioPeriodo");
	var txtDescripcionPeriodo = document.getElementById("txtDescripcionPeriodo");
	var txtEstadoPeriodo = document.getElementById("txtEstadoPeriodo");
	hdfPeriodoId.value = "-1"
	txtSucursalPeriodo.value = ""
	cboMesPeriodo.selectedIndex = "-1"
	txtAnioPeriodo.value = "";
	txtDescripcionPeriodo.value = "";
	txtEstadoPeriodo.value = "";

	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
	mensajeValidacion = [];
	var validar = document.getElementById("PopupPeriodo").getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
		validar[x].value = "";
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
