var lista = [];
var listaAnios;
var matriz = [];
var matrizAnios = [];
var cabeceras = ["Médico/Empresa", "Importe", "Descuento", "Ajuste", "Total", "Ind Error", "Estado"];
var anchos = [35, 10, 10, 10, 10, 10, 15];
var matrizIndice = [1, 2, 3, 4, 5, 6, 7];
var registrosPagina = 10;
var paginasBloque = 10;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var sucursalId = "";
var idFeriado = -1;
var Campoeliminar = "";
var SeleccionActualProceso = "";
var ss = "";
var a = 0;
var b = 0;
var c = 0;
var IndicadorPrimero = true;
window.onload = function () {
    var pos1 = window.location.href.indexOf("Proceso");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    //var url = urlBase + "Mantenimiento/listarFeriado/?ss=" + ss + "&sucursal=" + sucursalId;
    //$.ajax(url, "get", listarTodo);
    configuracionInicial();
}


//window.onresize = function () {
//    var tipError = document.getElementById("tipError");
//    if (tipError.style.display != "none") {
//        tipError.style.display = "none";
//    }
//}

function configuracionInicial() {
    crearTabla();
    //configurarOrdenacion();
    configurarControles();
    //configurarFiltro();
}


function listarTodo(rpta) {
    if (rpta != "") {
        lista = rpta.split("¯");
        listarFeriado();
    }
    var ddlAnios = document.getElementById("ddlAnios");
    var hanio = window.parent.document.getElementById("hanio");
    ddlAnios.value = hanio.value;
    ddlAnios.onchange();
}


function listarFeriado(irUltimaPagina) {
    crearMatriz();
    IndicadorPrimero = false;
    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
    else {
        paginar(0);
        indiceActualBloque = 0;
    }
    llenarCombo(listaAnios, "ddlAnioInicioCopia");
}

function buscarProvision(codigo) {
    var url = urlBase + "Proceso/ListarProvisionPorId/?ss=" + ss + "&id=" + codigo;
    $.ajax(url, "get", listarProvision);
}

function listarProvision(rpta) {
    if (rpta != "") {
        listaProvision = rpta.split("¯");
        var divOpcionesProvision = document.getElementById("divOpcionesProvision");
        var opcion = divOpcionesProvision.getElementsByTagName("LI")[0];
        opcion.click();
    }
    else {
        var contenido = "";
        var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 2).toString();
        contenido += "'>No hay datos</td></tr>";
        document.getElementById("tbDetalleDoctor").innerHTML = contenido;
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
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' style='display:none'></span></th>";
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
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' style='display:none'></span></th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tbDetalleDoctor' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginasPrincipal' colspan='";
    contenido += (nCampos + 2);
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divDetalle").innerHTML = contenido;
}

function crearMatriz(lista) {
    var nRegistros = lista.length;
    var nCampos;
    var campos;
    var x = 0;
    matriz = [];
    matrizAnios = [];
    for (i = 0; i < nRegistros; i++) {
        campos = lista[i].split("¦");
        if (SeleccionActualProceso == campos[7]) {
            matriz[x] = [];
            nCampos = campos.length;
            for (j = 0; j < nCampos; j++) {
                if (isNaN(campos[j])) matriz[x][j] = campos[j];
                else matriz[x][j] = campos[j] * 1;
            }
            x++;
        }
        if (IndicadorPrimero) {
            switch (campos[7]) {
                case "P":
                    a = a + 1;
                    break;
                case "A":
                    b = b + 1;
                    break;
                case "F":
                    c = c + 1;
                    break;
            }
        }
    }

}

function mostrarMatriz(indicePagina) {
    indiceActualPagina = indicePagina;
    var contenido = "";
    Campoeliminar = "";
    var n = matriz.length;
    if (n > 0) {
        var nCampos = matriz[0].length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarFeriado(";
                contenido += matriz[i][0];
                contenido += ")'></span></td>";
                for (var j = 1; j < nCampos; j++) {
                    if (j == (nCampos - 1)) {
                        contenido += "<td style='text-align:center'>";
                        contenido += (matriz[i][j] == "P" ? "PENDIENTE" : (matriz[i][j] == "A" ? "AUTORIZAR" : "PROVISION"));
                    }
                    else {
                        switch (j) {
                            case 6:
                                contenido += "<td style='text-align:center'>";
                                contenido += (matriz[i][j]==""?"":"SI");
                                break;
                            case 1:
                                contenido += "<td>";
                                contenido += matriz[i][j];
                                break;
                            default:
                                contenido += "<td style='text-align:right'>";
                                contenido += (matriz[i][j]*1).toFixed(2);
                                break;
                        }
                    }
                    contenido += "</td>";

                }
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += (matriz[i][7] == "A" ? "fa-list-alt" : "");
                contenido += "' onclick='abrirPopup(";
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
    document.getElementById("tbDetalleDoctor").innerHTML = contenido;
    //crearPaginas();
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
    var campoFiltrado;
    var x = 0;
    var ddlAnios = document.getElementById("ddlAnios").value;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("¦");
        campoFiltrado = campos.slice(1, 3);
        campoFiltrado.push(campos.slice(4)[0]);
        nCampos = campos.length;
        for (var j = 0 ; j < nCabeceras; j += 1) {
            exito = true;
            cabecera = cabeceras[j];
            if (cabecera.className == "Texto") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
            else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
            if (!exito) break;
        }

        if (exito) {
            if (ddlAnios == "" || campos[3] == ddlAnios) {
                matriz[x] = [];
                for (var j = 0; j < nCampos; j++) {
                    if (isNaN(campos[j])) matriz[x][j] = campos[j];
                    else matriz[x][j] = campos[j] * 1;
                }
                x++;
            }
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

function mostrarFeriado(id) {
    var nCampos = matriz.length;
    var campo = "";
    var txtFecha = document.getElementById("txtFecha");
    var txtDescripcion = document.getElementById("txtDescripcion");
    var txtEstado = document.getElementById("txtEstado");
    var hdfCd = document.getElementById("hdfCd");
    for (var i = 0; i < nCampos; i++) {
        campo = matriz[i][0];
        if (campo == id) {
            hdfCd.value = id;
            txtFecha.value = matriz[i][2];
            txtDescripcion.value = matriz[i][1];
            txtEstado.value = (matriz[i][4] == "A" ? "ACTIVO" : "INACTIVO");
            idFeriado = id;
            abrirPopup('PopupFeriado');
            break;
        }
    }
}


function crearCabeceraExportar() {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    cabecera += "<td style='width: 60px'>FeriadoId</td>";
    cabecera += "<td style='width: 210px'>Descripción</td>";
    cabecera += "<td style='width: 100px'>Fecha</td>";
    cabecera += "<td style='width: 60px'>Año</td>";
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
            if (j < (nCampos - 1)) textoExportar.push(matriz[i][j] + ", ");
            else textoExportar.push(matriz[i][j]);

        }
        contenido.push("</tr>");
        textoExportar.push("\r\n");
    }
    textoExportar = textoExportar.join("");
    excelExportar += contenido.join("") + "</table></html>";
}


function configurarControles() {
    var divOpcionesProvision = document.getElementById("divOpcionesProvision");
    var opciones = divOpcionesProvision.getElementsByTagName("LI");
    for (var x = 0; x < opciones.length; x++) {
        opciones[x].onclick = function () {
            var divOpcionesProvision = document.getElementById("divOpcionesProvision");
            var opciones = divOpcionesProvision.getElementsByTagName("LI");
            for (y = 0; y < opciones.length; y++) {
                opciones[y].className = "";
            }
            this.className = "active";
            SeleccionActualProceso = this.getAttribute("data-estado");
            crearMatriz(listaProvision);
            paginar(0);
            indiceActualBloque = 0;
            var spnOpcProv1 = document.getElementById("spnOpcProv1");
            var spnOpcProv2 = document.getElementById("spnOpcProv2");
            var spnOpcProv3 = document.getElementById("spnOpcProv3");
            spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
            spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
            spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
        }
    }

    var btnDetalleCargar = document.getElementById("btnDetalleCargar");
    btnDetalleCargar.onclick = function () {
        buscarProvision(1);
    }

    //var aExportarExcel = document.getElementById("aExportarExcel");
    //aExportarExcel.onclick = function () {
    //    var nRegistros = matriz.length;
    //    if (nRegistros > 0) {
    //        exportacion();
    //        var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
    //        this.download = "Feriados.xls";
    //        this.href = window.URL.createObjectURL(formBlob);
    //    }
    //}

    //var btngrabar = document.getElementById("btngrabar")
    //btngrabar.onclick = function () {
    //    if (validarFeriado()) {
    //        var hdfOpc = document.getElementById("hdfOpc").value;
    //        var txtFecha = document.getElementById("txtFecha").value;
    //        var txtDescripcion = document.getElementById("txtDescripcion").value;
    //        var strDatos = hdfOpc + "|" + txtFecha + "|" + txtDescripcion + "|" + sucursalId;
    //        if (hdfOpc == 2) {
    //            strDatos += "|" + idFeriado;
    //        }
    //        var ss = window.parent.document.getElementById("iss").value;
    //        var url = urlBase + "Mantenimiento/grabarFeriado/?ss=" + ss;
    //        $.ajax(url, "post", mostrarGrabar, strDatos);
    //        abrirPopup("PopupFeriado");
    //    }
    //}
    //var btngrabarEstado = document.getElementById("btngrabarEstado");
    //btngrabarEstado.onclick = function () {
    //    var valor1 = matriz[Campoeliminar][0];
    //    var valor2 = matriz[Campoeliminar][4];
    //    anular(valor1, valor2);
    //}
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
            success(xhr.responseText);
        }
    }
    if (type == "get") xhr.send();
    else {
        if (text != null && text != "") xhr.send(text);
    }
}
