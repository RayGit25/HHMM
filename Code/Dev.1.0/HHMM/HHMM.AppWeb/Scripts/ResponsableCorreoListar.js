var lista = [];
var listaUsuario = [];
var listaVariableCorreo = [];
var matriz = [];
var matrizUsuario = [];
var matrizVariableCorreo = [];
var cabeceras = ["Nº", "Sucursal", "Usuario", "Responsable", "Correo", "Estado"];
var anchos = [8, 17, 17, 20, 20, 10, 8];
var matrizIndice = [0, 1, 2, 3, 4, 5];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var idResponsableCorreo = -1;
var tituloPoup = "";
var Campoeliminar = "";
var ControlActual = "";
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
    buscarResponsableCorreo();
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
}

function buscarResponsableCorreo() {
    var pos1 = window.location.href.indexOf("Difundir");
    urlBase = window.location.href.substring(0, pos1);
    var ss = window.parent.document.getElementById("iss").value;
    var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
    var url = urlBase + "Difundir/listarResponsableCorreo/?ss=" + ss + "&idSucursal=" + sucursal;
    $.ajax(url, "get", listarTodo);
    configuracionInicial();
}

function configuracionInicial() {
    crearTabla();
    configurarOrdenacion();
    configurarControles();
    configurarFiltro();
}

function listarTodo(rpta) {
    lista = [];
    listaUsuario = [];
    listaVariableCorreo = [];
    if (rpta != "") {
        var listaGeneral = rpta.split("¬");
        lista = listaGeneral[0].split("¯");
        listaUsuario = listaGeneral[1].split("¯");
        listaVariableCorreo = listaGeneral[2].split("¯");
        listarResponsableCorreo();
    }
}

function listarResponsableCorreo(irUltimaPagina) {
    crearMatriz();
    crearMatrizUsuario();
    crearMatrizVariableCorreo();
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
    var contenido = "<table class='tabla-general'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='operacion(\"Adicionar Configuración de Correos de Responsables\");EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupResponsableCorreo\");estableceFormulario();'></span></th>";
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
    contenido += "<tbody id='tbResponsableCorreo' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas' colspan='";
    contenido += (nCampos + 2).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divResponsableCorreo").innerHTML = contenido;
}

function crearMatriz() {
    var nRegistros = lista.length;
    var nCampos;
    var campos;
    var x = 0;
    matriz = [];
    if (lista != "") {
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

}

function crearMatrizUsuario() {
    var nRegistros = listaUsuario.length;
    var nCampos;
    var campos;
    var x = 0;
    matrizUsuario = [];
    for (i = 0; i < nRegistros; i++) {
        campos = listaUsuario[i].split("¦");
        matrizUsuario[x] = [];
        nCampos = campos.length;
        for (j = 0; j < nCampos; j++) {
            if (isNaN(campos[j])) matrizUsuario[x][j] = campos[j];
            else matrizUsuario[x][j] = campos[j] * 1;
        }
        x++;
    }
}

function crearMatrizVariableCorreo() {
    var nRegistros = listaVariableCorreo.length;
    var nCampos;
    var campos;
    var x = 0;
    matrizVariableCorreo = [];
    for (i = 0; i < nRegistros; i++) {
        campos = listaVariableCorreo[i].split("¦");
        matrizVariableCorreo[x] = [];
        nCampos = campos.length;
        for (j = 0; j < nCampos; j++) {
            if (isNaN(campos[j])) matrizVariableCorreo[x][j] = campos[j];
            else matrizVariableCorreo[x][j] = campos[j] * 1;
        }
        x++;
    }

}

function mostrarMatriz(indicePagina) {
    var contenido = "";
    var n = matriz.length;
    if (n > 0) {
        var nCampos = matriz[0].length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarResponsableCorreo(";
                contenido += matriz[i][0] + ",\"" + matriz[i][5] + "\"";
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
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += (matriz[i][5] == "A" ? "fa-trash-o" : "fa-check");
                contenido += "' onclick='operacion(\"Actualizar Estado Periodo\");abrirPopup(";
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
    document.getElementById("tbResponsableCorreo").innerHTML = contenido;
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
            mostrarMatriz(0);
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
    cabecera += "<td style='width: 30px'>Nº</td>";
    cabecera += "<td style='width: 120px'>Sucursal</td>";
    cabecera += "<td style='width: 150px'>Usuario</td>";
    cabecera += "<td style='width: 180px'>Responsable</td>";
    cabecera += "<td style='width: 190px'>Correo</td>";
    cabecera += "<td style='width: 55px'>Estado</td>";
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
            resultado = txtExportar.document.execCommand("SaveAs", true, "ConfiguracionCorreo.xls");
        }
        else // Otro Navegador
        {
            //resultado = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(excelExportar));

            var formBlob = new Blob([excelExportar], { type: "type:'text/html'" });
            var url = window.URL.createObjectURL(formBlob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "ConfiguracionCorreo.xls";
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


    var btngrabar = document.getElementById("btngrabar")
    btngrabar.onclick = function () {

        if (validarResponsableCorreo()) {
            grabarForm()
        }
    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        var valor1 = matriz[Campoeliminar][0];
        var valor2 = matriz[Campoeliminar][5];
        var valor3 = window.parent.document.getElementById("isuc").value.split("|")[0];
        anular(valor1, valor2, valor3);
    }

    var cboResponsable = document.getElementById("cboResponsable");
    cboResponsable.onchange = function () {
        mostrarSeleccion(cboResponsable.value);
    }

    var CopiarValores = document.getElementsByClassName("CopiarValores");
    for (var x = 0; x < CopiarValores.length; x++) {
    	CopiarValores[x].onfocus = function () {
    		ControlActual = this.id;
    	}
    }
}

function validarResponsableCorreo() {

    var txtSucursal = document.getElementById("txtSucursal");
    var cboResponsable = document.getElementById("cboResponsable");
    var txtUsuario = document.getElementById("txtUsuario");
    var txtCorreo = document.getElementById("txtCorreo");
    var txtAsunto = document.getElementById("txtAsunto");
    var txtCuerpo = document.getElementById("txtCuerpo");
    var txtEstado = document.getElementById("txtEstado");

    mensajeValidacion = [];
    var validar = document.getElementById("PopupResponsableCorreo").getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }

    var mensajeSucursal = validarTexto(txtSucursal.id, "Sucursal", true);
    if (mensajeSucursal != "") {
        mensajeValidacion[txtSucursal.getAttribute("data-secuencia")] = mensajeSucursal;
        txtSucursal.className += " error";
    }

    var mensajeResponsable = validarCombo(cboResponsable.id, "Responsable", true);
    if (mensajeResponsable != "") {
        mensajeValidacion[cboResponsable.getAttribute("data-secuencia")] = mensajeResponsable;
        cboResponsable.className += " error";
    }

    var mensajeUsuario = validarTexto(txtUsuario.id, "Usuario", true);
    if (mensajeUsuario != "") {
        mensajeValidacion[txtUsuario.getAttribute("data-secuencia")] = mensajeUsuario;
        txtUsuario.className += " error";
    }

    var mensajeCorreo = validarTexto(txtCorreo.id, "Descripción", true);
    if (mensajeCorreo != "") {
        mensajeValidacion[txtCorreo.getAttribute("data-secuencia")] = mensajeCorreo;
        txtCorreo.className += " error";
    }

    var mensajeAsunto = validarTexto(txtAsunto.id, "Descripción", true);
    if (mensajeAsunto != "") {
        mensajeValidacion[txtAsunto.getAttribute("data-secuencia")] = mensajeAsunto;
        txtAsunto.className += " error";
    }

    var mensajeCuerpo = validarTexto(txtCuerpo.id, "Descripción", true);
    if (mensajeCuerpo != "") {
        mensajeValidacion[txtCuerpo.getAttribute("data-secuencia")] = mensajeCuerpo;
        txtCuerpo.className += " error";
    }

    var mensajeEstado = validarTexto(txtEstado.id, "Descripción", true);
    if (mensajeEstado != "") {
        mensajeValidacion[txtEstado.getAttribute("data-secuencia")] = mensajeEstado;
        txtEstado.className += " error";
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

function mostrarResponsableCorreo(id, estado) {
    //if (estado == "I") { mostraralerta("El registro se encuentra Inactivo."); return; }
    var ss = window.parent.document.getElementById("iss").value;

    var frm = new FormData();
    frm.append("ResponsableCorreoId", id);

    var ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Difundir/listarResponsableCorreoPorId/?ss=" + ss;
    $.ajax(url, "post", mostrarResponsable, frm);

}

function mostrarResponsable(rpta) {

    if (rpta != "") {
        var matrizElemento = rpta.split("¦");;
        var hdfResponsableCorreoId = document.getElementById("hdfResponsableCorreoId");
        var txtSucursal = document.getElementById("txtSucursal");
        var cboResponsable = document.getElementById("cboResponsable");
        var txtUsuario = document.getElementById("txtUsuario");
        var txtCorreo = document.getElementById("txtCorreo");
        var txtAsunto = document.getElementById("txtAsunto");
        var txtCuerpo = document.getElementById("txtCuerpo");
        var txtEstado = document.getElementById("txtEstado");
        mostrarMatrizUsuario();
        mostrarMatrizVariables();
        hdfResponsableCorreoId.value = matrizElemento[0];
        txtSucursal.value = matrizElemento[2];
        cboResponsable.value = matrizElemento[3];
        txtUsuario.value = matrizElemento[4];
        txtCorreo.value = matrizElemento[6];
        txtAsunto.value = matrizElemento[7];
        txtCuerpo.value = matrizElemento[8];
        txtEstado.value = (matrizElemento[9] == "A" ? "ACTIVO" : "INACTIVO");
        idResponsableCorreo = matrizElemento[0];
        operacion("Modificar Configuración de Correos de Responsables");
        abrirPopup('PopupResponsableCorreo');
    }

}

function mostrarSeleccion(id) {
    var txtUsuario = document.getElementById("txtUsuario");
    var txtCorreo = document.getElementById("txtCorreo");
    var nCampos = matrizUsuario.length;

    if (id == undefined || id == 0) {
        txtUsuario.value = "";
        txtCorreo.value = "";
        return;
    }

    for (var i = 0; i < nCampos; i++) {
        campo = matrizUsuario[i][0];
        if (campo == id) {
            txtUsuario.value = matrizUsuario[i][2];
            txtCorreo.value = matrizUsuario[i][3];
            break;
        }
    }
}

function grabarForm() {

    var hdfResponsableCorreoId = document.getElementById("hdfResponsableCorreoId");
    var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    var cboResponsable = document.getElementById("cboResponsable");
    var txtUsuario = document.getElementById("txtUsuario");
    var txtCorreo = document.getElementById("txtCorreo");
    var txtAsunto = document.getElementById("txtAsunto");
    var txtCuerpo = document.getElementById("txtCuerpo");
    var txtVariables = document.getElementById("txtVariables");
    var txtEstado = document.getElementById("txtEstado");


    var frm = new FormData();
    frm.append("ResponsableCorreoId", hdfResponsableCorreoId.value);
    frm.append("SucursalId", intSucursalId);
    frm.append("UsuarioId", cboResponsable.value);
    frm.append("CorreoElectronico", txtCorreo.value);
    frm.append("Asunto", txtAsunto.value);
    frm.append("Cuerpo", txtCuerpo.value);

    if (tituloPoup == "Adicionar Configuración de Correos de Responsables") {
        var ss = window.parent.document.getElementById("iss").value;
        var url = urlBase + "Difundir/adicionarResponsableCorreo/?ss=" + ss;
        $.ajax(url, "post", mostrarGrabar, frm);
    }
    else {
        var ss = window.parent.document.getElementById("iss").value;
        var url = urlBase + "Difundir/actualizarResponsableCorreo/?ss=" + ss;
        $.ajax(url, "post", mostrarGrabar, frm);
    }
}

function anular(id, estado, sucursal) {
    var ss = window.parent.document.getElementById("iss").value;

    var frm = new FormData();
    frm.append("ResponsableCorreoId", id);
    frm.append("EstadoRegistro", (estado == "A" ? "I" : "A"));
    frm.append("SucursalId", sucursal);
    var url = urlBase + "Difundir/actualizarEstadoResponsableCorreo/?ss=" + ss;
    $.ajax(url, "post", mostrarGrabar, frm);
    abrirPopup('PopupEstado');
}

function mostrarGrabar(rpta) {

    lista = [];
    listaUsuario = [];
    listaVariableCorreo = [];
    if (rpta != "") {
        var listaGeneral = rpta.split("¬");
        lista = listaGeneral[0].split("¯");
        listaUsuario = listaGeneral[1].split("¯");
        listaVariableCorreo = listaGeneral[2].split("¯");

        if (tituloPoup == "Adicionar Configuración de Correos de Responsables") {
            mostraralerta("Se ha agregado un nuevo registro");
            listarResponsableCorreo();
            abrirPopup("PopupResponsableCorreo");
        }
        else if (tituloPoup == "Modificar Configuración de Correos de Responsables") {
            mostraralerta("Se ha actualizado el registro");
            listarResponsableCorreo();
            abrirPopup("PopupResponsableCorreo");
        } else {

            mostraralerta("Se ha actualizado el estado de un registro");
            listarResponsableCorreo();
        }
    }
}

function operacion(titulo) {
    tituloPoup = titulo;
}

function EscogerOpcion(valor) {
    var hdfOpc = document.getElementById("hdfOpc");
    if (valor) hdfOpc.value = "1";
    else hdfOpc.value = "2";
    ControlActual = "";
}

function abrirPopup(popup) {
    var popup = document.getElementById(popup);
    var span = document.getElementById('TituloPopupResponsableCorreo');
    span.textContent = tituloPoup;
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
}

function estableceFormulario() {
    var txtSucursal = document.getElementById("txtSucursal");
    var txtUsuario = document.getElementById("txtUsuario");
    var txtCorreo = document.getElementById("txtCorreo");
    var cboResponsable = document.getElementById("cboResponsable");
    var txtEstado = document.getElementById("txtEstado");
    mostrarMatrizUsuario();
    mostrarMatrizVariables();
    txtSucursal.value = window.parent.document.getElementById("isuc").value.split("|")[1];
    cboResponsable.selectedIndex = "0";
    txtEstado.value = "ACTIVO";
    cboResponsable.focus();
}

function mostrarMatrizUsuario() {
    var contenido = "";
    var n = matrizUsuario.length;
    if (n > 0) {
        contenido += "<option value='0'>Seleccione</option>";
        for (var i = 0; i < n; i++) {
            contenido += "<option value='" + matrizUsuario[i][0] + "'>" + matrizUsuario[i][1] + "</option>";
        }
    }
    else {
        contenido += "<option value='0'>Seleccione</option>";
    }
    document.getElementById("cboResponsable").innerHTML = contenido;
}

function mostrarMatrizVariables() {
    var contenido = "";
    var n = matrizVariableCorreo.length;
    if (n > 0) {
        for (var i = 0; i < n; i++) {
            contenido += "<div id='" + matrizVariableCorreo[i][0] + "' class='dragTest' style='-webkit-user-drag: element; user-select: none;margin:5px 0' draggable='true' ondragstart='arratraVariable(event)' onclick='copiaVariable(this.id)' >" + matrizVariableCorreo[i][1] + "</div>";
        }
    }
    document.getElementById("txtVariables").innerHTML = contenido;
}

function copiaVariable(id) {
	var txtCuerpo = document.getElementById((ControlActual == "" ? "txtCuerpo" : ControlActual));
    var posicionStart = txtCuerpo.selectionStart;
    var posicionEnd = txtCuerpo.selectionEnd;
    var strCuerpo = txtCuerpo.value;
    txtCuerpo.value = strCuerpo.substr(0, posicionStart) + id + strCuerpo.substr(posicionStart);
}

function arratraVariable(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    return true;
}

function limpiarFormulario() {
    var hdfResponsableCorreoId = document.getElementById("hdfResponsableCorreoId");
    var txtSucursal = document.getElementById("txtSucursal");
    var cboResponsable = document.getElementById("cboResponsable");
    var txtUsuario = document.getElementById("txtUsuario");
    var txtCorreo = document.getElementById("txtCorreo");
    var txtAsunto = document.getElementById("txtAsunto");
    var txtCuerpo = document.getElementById("txtCuerpo");
    var txtVariables = document.getElementById("txtVariables");
    var txtEstado = document.getElementById("txtEstado");
    hdfResponsableCorreoId.value = "-1"
    txtSucursal.value = ""
    cboResponsable.selectedIndex = "-1"
    txtUsuario.value = ""
    txtCorreo.value = ""
    txtAsunto.value = ""
    txtCuerpo.value = ""
    txtVariables.value = ""
    txtEstado.value = "";

    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
    mensajeValidacion = [];
    var validar = document.getElementById("PopupResponsableCorreo").getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
        validar[x].value = "";
    }
    txtCuerpo.className = "form-texto CopiarValores";
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