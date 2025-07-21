var lista = [];
var matriz = [];
var cabeceras = ["Código", "Descripción", "Estado"];
var anchos = [10, 70, 15];
var matrizIndice = [0, 1, 2];
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
    var url = urlBase + "Administracion/listarPerfiles/?ss=" + ss;
    $.ajax(url, "get", listarTodo);
    configuracionInicial();
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

function listarTodo(rpta) {
    if (rpta != "") {
        lista = rpta.split("¯");
        listarPerfiles();
    }
}

function listarPerfiles(irUltimaPagina) {
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
    var contenido = "<table class='tabla-general tabla-corta'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='operacion(\"Agregar Perfil\");EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupPerfil\");'></span></th>";
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
    document.getElementById("divPerfil").innerHTML = contenido;
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
                contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarPerfil(";
                contenido += matriz[i][0];
                contenido += ")'></span></td>";
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
                //contenido += "<td style='text-align:center'><span class='Icons ";
                //contenido += (matriz[i][2] == "A" ? "fa-trash-o" : "fa-check");
                //contenido += "' onclick='operacion(\"ActualizarEstado\");anular(";
                //contenido += matriz[i][0];
                //contenido += ",";
                //contenido += '"';
                //contenido += matriz[i][2];
                //contenido += '"';
                //contenido += ");'></span></td>";
                //contenido += "</tr>";
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += (matriz[i][2] == "A" ? "fa-trash-o" : "fa-check");
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

function mostrarPerfil(id) {
    var nCampos = matriz.length;
    var campo = "";
    var txtCodigo = document.getElementById("txtCodigo");
    var txtDescripcion = document.getElementById("txtDescripcion");
    var txtEstado = document.getElementById("txtEstado");
    var hdfCd = document.getElementById("hdfCd");
    for (var i = 0; i < nCampos; i++) {
        campo = matriz[i][0];
        if (campo == id) {
        	hdfCd.value=matriz[i][0];
            txtCodigo.value = matriz[i][0];
            txtDescripcion.value = matriz[i][1];
            txtEstado.value = (matriz[i][2] == "A" ? "ACTIVO" : "INACTIVO");
            idTipoDescuento = id;
            operacion("Modificar Perfil");
            abrirPopup('PopupPerfil');
            break;
        }
    }
}

function crearCabeceraExportar() {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    cabecera += "<td style='width: 60px' align='center'>Código</td>";
    cabecera += "<td style='width: 210px' align='center'>Descripción</td>";
    cabecera += "<td style='width: 60px' align='center'>Estado</td>";
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
			    contenido.push("<td  align='center'>" + (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
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
    var aExportarExcel = document.getElementById("aExportarExcel");
    aExportarExcel.onclick = function () {
        exportacion();
        var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
        this.download = "Perfiles.xls";
        this.href = window.URL.createObjectURL(formBlob);
    }
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
        if (validarPerfil()) {
            this.style.pointerEvents = "none";
            grabarForm();
        }
    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        this.style.pointerEvents = "none";
        var valor1 = matriz[Campoeliminar][0];
        var valor2 = matriz[Campoeliminar][2];
        anular(valor1, valor2);
    }
}

function grabarForm() {
	var txtCodigo = document.getElementById("txtCodigo");
	var txtDescripcion = document.getElementById("txtDescripcion");

	var frm = new FormData();
	frm.append("PerfilId", txtCodigo.value);
	frm.append("NombrePerfil", txtDescripcion.value);

	if (tituloPoup == "Agregar Perfil") {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Administracion/adicionar/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
	else {
		var ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Administracion/actualizar/?ss=" + ss;
		$.ajax(url, "post", mostrarGrabar, frm);
	}
}

function anular(id, estado) {
    	var ss = window.parent.document.getElementById("iss").value;

    	var frm = new FormData();
    	frm.append("PerfilId", id);
    	frm.append("EstadoRegistro", (estado == "A" ? "I" : "A"));
		
        var url = urlBase + "Administracion/actualizarEstado/?ss=" + ss;
        $.ajax(url, "post", mostrarGrabar, frm);
        abrirPopup('PopupEstado');
}

function mostrarGrabar(rpta) {
    if (rpta != "") {
    	var data = rpta.split("¬");
    	lista = data[0].split("¯");
    	var res = data[1];
    	var opcion = data[2];
    	switch (opcion) {
    	    case "1":
    	        mostraralerta("Se ha agregado un nuevo registro");
    	        listarPerfiles();
    	        abrirPopup("PopupPerfil");
    	        break;
    	    case "2":
    	        mostraralerta("Se ha actualizado el registro");
    	        listarPerfiles();
    	        abrirPopup("PopupPerfil");
    	        break;
    	    case "3":
    	        mostraralerta("Se ha actualizado el estado de un registro");
    	        listarPerfiles();
    	        break;
    	}
        
    	//if (tituloPoup == "Agregar Perfil") {
    	//	mostraralerta("Se ha agregado un nuevo registro");
    	//	listarPerfiles();
    	//	abrirPopup("PopupPerfil");
    	//}
    	//else if (tituloPoup == "Modificar Perfil") {
    	//	mostraralerta("Se ha actualizado el registro");
    	//	listarPerfiles();
    	//	abrirPopup("PopupPerfil");
    	//} else {
    		
    	//	mostraralerta("Se ha actualizado el estado de un registro");
    	//	listarPerfiles();
    	//}
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
            if (Texto.value.match(/[,;]+/) != null) {
                return Mensaje + ' No debe contener , o ;';
            }
        }
    }
    return "";
}

function validarPerfil() {
    var txtDescripcion = document.getElementById("txtDescripcion");
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
    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
    }

}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	var span = document.getElementById('TituloPopupPerfil');
	span.innerHTML = tituloPoup;
	document.getElementById('txtDescripcion').focus();
	
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
}

function limpiarFormulario() {
	var txtCodigo = document.getElementById("txtCodigo");
	var txtDescripcion = document.getElementById("txtDescripcion");
	var txtEstado = document.getElementById("txtEstado");
	txtCodigo.value = "";
	txtDescripcion.value = "";
	txtEstado.value = "";

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

    var btngrabar = document.getElementById("btngrabar");
    btngrabar.style.pointerEvents = "auto";
    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.style.pointerEvents = "auto";
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

function operacion(titulo) {
	tituloPoup = titulo;
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