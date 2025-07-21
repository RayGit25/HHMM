var lista = [];
var matriz = [];
var cabeceras = ["Sucursal", "Contrato", "Inicio", "Fin", "Medico/Empresa", "Observación", "Estado"];
var anchos = [15, 10, 10, 10, 25, 20, 10];
var matrizIndice = [0, 1, 2, 3, 4, 5, 6];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var idTipoDescuento = -1;
var tituloPoup = "";
var Campoeliminar = "";
var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}
var aAmpliar = [];
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
	estableceSucursal();
	//buscarContratoPorVencer();
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
	document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;

}

function buscarContratoPorVencer() {

	var pos1 = window.location.href.indexOf("Control");
	urlBase = window.location.href.substring(0, pos1);
	var ss = window.parent.document.getElementById("iss").value;
	var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
	var anio = document.getElementById("txtAnio").value;
	var mes = document.getElementById("cboMes").selectedIndex;
	var url = urlBase + "Control/listarContratoPorVencer/?ss=" + ss + "&idSucursal=" + sucursal + "&anio=" + anio + "&mes=" + mes;
	$.ajax(url, "get", listarTodo);
	configuracionInicial();
}

function configuracionInicial() {
	crearTabla();
	configurarOrdenacion();
	configurarFiltro();
	configurarSeleccionTodos();
}
function configurarSeleccionTodos() {
	var chkAmpTodo = document.getElementById("chkAmpTodo");
	chkAmpTodo.onclick = function () {
		if (matriz.length > 0) {
			var esvacio = cabeceraVacia();
			if (this.checked) {
				var n = matriz.length, campos;
				if (esvacio) {
					aAmpliar = [];
				}
				var pos;
				for (var i = 0; i < n; i++) {
					campos = matriz[i];
					pos = buscarAmpliarId(campos[1]);
					if (campos[6] == "A" && pos == -1) {
						aAmpliar.push(campos[1]);
					}
				}
			} else {
				if (esvacio) {
					aAmpliar = [];
				}
			}
			paginar(indiceActualPagina);
			indiceActualBloque = indiceActualBloque;
		} else { return false; }
	}
	var tbContrato = document.getElementById("tbContrato");
	tbContrato.onclick = function (e) {
		var check = e.target || e.srcElement;
		if (check.type == "checkbox") {
			var id = check.getAttribute("data-i");
			var pos = buscarAmpliarId(id);
			if (check.checked && pos == -1) {
				aAmpliar.push(id);
			} else {
				if (!check.checked) {
					aAmpliar.splice(pos, 1);
				}
			}
		}
	}
}
function cabeceraVacia() {
	var cabeceras = document.getElementsByName("cabecera");
	var ncabeceras = cabeceras.length, esvacio = true;
	for (var i = 0; i < ncabeceras; i++) {
		if (cabeceras[i].value.trim() != "") {
			esvacio = false;
			break;
		}
	}
	return esvacio;
}
function buscarAmpliarId(id) {
	var n = aAmpliar.length, pos = -1;
	for (var i = 0; i < n; i++) {
		if (aAmpliar[i] == id) {
			pos = i;
			break;
		}
	}
	return pos;
}


function listarTodo(rpta) {
	var aExportarExcel = document.getElementById("btnExportar");
	aExportarExcel.style.visibility = "hidden";
	lista = [];
	aAmpliar = [];
	if (rpta != "") {
		lista = rpta.split("¯");
		listarContratosPorVencer();
		aExportarExcel.style.visibility = "visible";
	}
	else {
		var contenido = "";
		var nCabeceras = cabeceras.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras+1).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbContrato").innerHTML = contenido;
	}
}

function listarContratosPorVencer(irUltimaPagina) {
	crearMatriz();
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
	else {
		indicePagina = 0;
		indiceActualBloque = 0;
		paginar(indicePagina);
		indiceActualBloque = indiceActualBloque;

		var cabecera = document.getElementsByName("cabecera")[6];
		cabecera.value = "A";
		cabecera.onchange();
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
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;text-align:center'><span class='enlace'>Sel.</span><br/><input type='checkbox' id='chkAmpTodo'/></th>";
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
		if (j == (nCampos - 1)) contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
		else contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbContrato' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divContrato").innerHTML = contenido;
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
			if (j == 5 ||isNaN(campos[j]) ) matriz[x][j] = campos[j];
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
		var nCampos = matriz[0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		for (var i = inicio; i < fin; i++) {
			if (i < n) {
				contenido += "<tr class='FilaDatos'>";
				if (matriz[i][6] == "A") {
					pos = buscarAmpliarId(matriz[i][1]);
					contenido += "<td style='text-align:center'><input type='checkbox' data-i='" + matriz[i][1] + "' " + (pos > -1 ? "checked" : "") + "/></td>";
				} else {
					contenido += "<td ></td>";
				}
				for (var j = 0; j < nCampos; j++) {

					if (j == (nCampos - 1)) {
						contenido += "<td style='text-align:center'>";
						contenido += (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO");
					}
					else {
						contenido += "<td>";
						contenido += matriz[i][j];
					}
					contenido += "</td>";
				}
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
	document.getElementById("tbContrato").innerHTML = contenido;
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
			if (cabecera.className == "Texto") exito = exito && (campos[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			matriz[x] = [];
			for (var j = 0; j < nCampos; j++) {
				if (j==5|| isNaN(campos[j])) matriz[x][j] = campos[j];
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
	var nRegistros = matriz.length;
	var nCampos = matriz[0].length;
	var contenido = [];
	textoExportar = [];
	excelExportar = crearCabeceraExportar();
	for (i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (j = 0; j < nCampos; j++) {
			if (j == (nCampos - 1)) {
				contenido.push("<td>" + (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
			} else {
				contenido.push("<td>" + matriz[i][j] + "</td>");
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

function configurarControles() {

	var aExportarExcel = document.getElementById("btnExportar");
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
			resultado = txtExportar.document.execCommand("SaveAs", true, "ContratosPorVencer.xls");
		}
		else // Otro Navegador
		{
			//resultado = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excelExportar));

			var formBlob = new Blob([excelExportar], { type: "type:'text/html'" });
			var url = window.URL.createObjectURL(formBlob);
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.href = url;
			a.download = "ContratosPorVencer.xls";
			a.click();
			setTimeout(function () { window.URL.revokeObjectURL(url); }, 0);
			resultado = true;
		}

		return resultado;
	}

	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		validar[x].onfocus = function (event) {
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
		validar[x].onblur = function () {
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
		buscarContratoPorVencer();
	}
	var btnAmpliar = document.getElementById("btnAmpliar");
	btnAmpliar.onclick = function () {
		var validar = document.getElementsByClassName("validar");
		for (var x = 0; x < validar.length; x++) {
			if (validar[x].className.indexOf("error") > -1) {
				validar[x].className = validar[x].className.split("error").join("").trim();
			}
		}
		if (aAmpliar.length > 0) {
			abrirPopup("PopupAmpliar");
			var divMes = document.getElementById("divMes");
			divMes.style.display = "block";
			var txtMeses = document.getElementById("txtMeses");
			txtMeses.className = "form-texto validar";
			txtMeses.value = "";
			txtMeses.focus();
			document.getElementsByName("inpradio")[0].click();
		} else {
			mostrarlerta("Seleccione un contrato a vencer");
		}
	}

	var btnConfirmar = document.getElementById("btnConfirmar");
	btnConfirmar.addEventListener("click", enviarAmpliar);

	var inpradio = document.getElementsByName("inpradio");
	inpradio[0].onclick = inpradio[1].onclick = function () {
		var tipo = this.getAttribute("data-i");
		var txtMeses = document.getElementById("txtMeses");
		var txtFecha = document.getElementById("txtFecha");
		var divMes = document.getElementById("divMes");
		var divFecha = document.getElementById("divFecha");

		if (tipo == "0") {
			divMes.style.display = "block";
			txtMeses.value = "";
			txtMeses.className = "form-texto validar";
			txtMeses.focus();
			divFecha.style.display = "none";
			txtFecha.value = "";
			txtFecha.className = "form-texto";
		} else {
			divMes.style.display = "none";
			txtMeses.value = "";
			txtFecha.className = "form-texto";

			divFecha.style.display = "block";
			txtFecha.value = "";
			txtFecha.focus();
			txtFecha.className = "form-texto validar";
		}
	}
	var txtFecha = document.getElementById("txtFecha");
	txtFecha.DatePickerX.init({
		mondayFirst: true
	});
	txtFecha.readOnly = false;

}
function enviarAmpliar(e) {

	if (validarMes()) {
		var txtMeses = document.getElementById("txtMeses").value;
		var txtFecha = document.getElementById("txtFecha").value;
		var ids = aAmpliar.join("¬");
		var pos1 = window.location.href.indexOf("Control");
		urlBase = window.location.href.substring(0, pos1);
		var ss = window.parent.document.getElementById("iss").value;
		var sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
		var url = urlBase + "Control/contratoPorVencerAmpliar?ss=" + ss+"&su="+sucursalId;

		var cadena = ids + "¯" + txtMeses + "¯" + txtFecha;
		$.ajax(url, "post", mostarAmpliacion, cadena);

		var btnConfirmar = document.getElementById("btnConfirmar");
		btnConfirmar.innerHTML="<span class='Icons fa-refresh cargando'></span>";
		btnConfirmar.removeEventListener("click", enviarAmpliar);
	}
}
function mostarAmpliacion(r) {
	abrirPopup("PopupAmpliar")
	var btnConfirmar = document.getElementById("btnConfirmar");
	btnConfirmar.addEventListener("click", enviarAmpliar);
	btnConfirmar.innerHTML = "confirmar";
	if (r != "") {
		mostrarlerta(r);
		buscarContratoPorVencer();
	} else {
		mostrarlerta("Error en proceso");
	}
}
function validarMes() {

	var txtMeses = document.getElementById("txtMeses");
	var txtFecha = document.getElementById("txtFecha");
	var inpradio = document.getElementsByName("inpradio");

	mensajeValidacion = [];

	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	if (inpradio[0].checked) {
		var mensajeAnio = validarTexto(txtMeses.id, "Meses", true);
		if (mensajeAnio != "") {
			mensajeValidacion[txtMeses.getAttribute("data-secuencia")] = mensajeAnio;
			txtMeses.className += " error";
			txtMeses.focus();
			return false;
		}
	} else {
		var mensajeAnio = validarFecha(txtFecha.id, "Fecha", true);
		if (mensajeAnio != "") {
			mensajeValidacion[txtFecha.getAttribute("data-secuencia")] = mensajeAnio;
			txtFecha.className += " error";
			txtFecha.focus();
			return false;
		}
		var cboMes=document.getElementById("cboMes").value;
		var txtAnio=document.getElementById("txtAnio").value;
		var fecha=esFecha("01/"+cboMes+"/"+txtAnio);
		if (fecha) {
			var valores = txtFecha.value.split("/");
			var mes = valores[1];
			var anio = valores[2];
            var valor = parseInt((anio + "" + mes));

			var mesa = cboMes;
			var anioa = txtAnio;
            var valora = parseInt((anioa + "" + mesa));

			if (valor <= valora) {
				mensajeValidacion[txtFecha.getAttribute("data-secuencia")] = "Fecha es menor o igual al periodo del filtro";
				txtFecha.className += " error";
				txtFecha.focus();
				return false;
			}
		}
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

	var mensajeAnio = validarTexto(txtAnio.id, "Año", true);
	if (mensajeAnio != "") {
		mensajeValidacion[txtAnio.getAttribute("data-secuencia")] = mensajeAnio;
		txtAnio.className += " error";
		txtAnio.focus();
		return false;
	}

	var mensajeMes = validarCombo(cboMes.id, "Mes", true);
	if (mensajeMes != "") {
		mensajeValidacion[cboMes.getAttribute("data-secuencia")] = mensajeMes;
		cboMes.className += " error";
		cboMes.focus();
		return false;
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
function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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