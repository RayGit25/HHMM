var lista = [];
var listaComponente = [];
var listaCuenta = [];
var listaCentro = [];
var listaClasificador = [];
var listaTipoDescuento = [];
var matriz = [];
var cabeceras = ["Código", "Descripción", "Tipo Descuento", "Estado"];
var anchos = [10, 55, 15, 15];
var matrizIndice = [0, 1, 2, 9];
var matrizTipoDescuento = [];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var textoExportar;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var sucursalId;
var idDescuento = -1;
var Campoeliminar = "";

window.onload = function () {
    var pos1 = window.location.href.indexOf("Mantenimiento");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    var url = urlBase + "Mantenimiento/listarDescuentosListas/?ss=" + ss;
    $.ajax(url, "get", listarCombos);
    configuracionInicial();
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
}

function listarCombos(rpta) {
    if (rpta != "") {
        listaTipoDescuento = rpta.split("¯");
        //console.log(listaTipoDescuento);
        for (var x = 0; x < listaTipoDescuento.length; x++) {
            matrizTipoDescuento.push(listaTipoDescuento[x].split("¦")[0] * 1);
        }
        llenarCombo(rpta, "ddlBusquedaTipo", true);
        llenarCombo(rpta, "ddlTipoDescuento");
        configuracionInicial();
        //Buscar();
    }
}

function Buscar() {
    var divDescuento = document.getElementById("divDescuento");
    divDescuento.style.display = "";
    var url = urlBase + "Mantenimiento/listarDescuentos/?ss=" + ss;
    var txtBusquedaCodigo = document.getElementById("txtBusquedaCodigo").value;
    var txtBusquedaDescripcion = document.getElementById("txtBusquedaDescripcion").value;
    var ddlBusquedaTipo = document.getElementById("ddlBusquedaTipo").value;
    var strDatos = txtBusquedaCodigo + "|" + txtBusquedaDescripcion + "|" + ddlBusquedaTipo;
    $.ajax(url, "post", listarTodo, strDatos);
}

function configuracionInicial() {
    crearTabla();
    configurarOrdenacion();
    configurarControles();
    configurarFiltro();

}

function EscogerOpcion(valor) {
    var TituloPopupDescuento = document.getElementById("TituloPopupDescuento");
    var hdfOpc = document.getElementById("hdfOpc");
    var spnHistorial = document.getElementById("spnHistorial");
    if (valor) {
        hdfOpc.value = "1";
        TituloPopupDescuento.innerHTML = "AGREGAR DESCUENTO";
        spnHistorial.style.display = "none";
    }
    else {
        hdfOpc.value = "2";
        TituloPopupDescuento.innerHTML = "MODIFICAR DESCUENTO";
        spnHistorial.style.display = "";
    }
    var txtDescripcion = document.getElementById("txtDescripcion");
    txtDescripcion.focus();
}

function listarTodo(rpta) {
    if (rpta != "") {
        lista = rpta.split("¯");
        listarDescuento();
    }
    else {
        matriz = [];
        var contenido = "";
        var nCabeceras = cabeceras.length;
        crearPaginas();
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 2).toString();
        contenido += "'>No hay datos</td></tr>";
        document.getElementById("tbDescuento").innerHTML = contenido;
    }
}

function listarDescuento(irUltimaPagina) {

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
    var tipoDescuento;
    var contenido = "<table class='tabla-general tabla-corta'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupDescuento\");'></span></th>";
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
        switch (j) {
            case (nCampos - 1):
                contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                break;
            case 2:
                contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                for (var x = 0; x < listaTipoDescuento.length; x++) {
                    tipoDescuento = listaTipoDescuento[x].split("¦");
                    contenido += "<option value='";
                    contenido += tipoDescuento[0];
                    contenido += "'>";
                    contenido += tipoDescuento[1];
                    contenido += "</option>";
                }
                break;
            default:
                contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
                break;
        }
        contenido += "</th>";
    }
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tbDescuento' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas' colspan='";
    contenido += (nCampos + 2).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divDescuento").innerHTML = contenido;
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
            if (isNaN(campos[j]) || j == 5 || j == 6 || j == 7 || j == 8) matriz[x][j] = campos[j];
            else matriz[x][j] = campos[j] * 1;
        }
        x++;
    }
    //console.log(matriz);
}

function mostrarMatriz(indicePagina) {
    indiceActualPagina = indicePagina;
    var contenido = "";
    var n = matriz.length;
    if (n > 0) {
        var nCampos = matriz[0].length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        var posicion;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarDescuento(";
                contenido += matriz[i][0];
                contenido += ")'></span></td>";
                for (var j = 0; j < nCampos; j++) {
                    if (matrizIndice.indexOf(j) > -1) {
                        
                        if (j == (nCampos-1)) {
                            contenido += "<td style='text-align:center'>";
                            contenido += (matriz[i][j] == "A" ? "ACTIVO" : "INACTIVO");
                        }
                        else {
                            contenido += "<td>";
                            if (j == 2) {
                                posicion = matrizTipoDescuento.indexOf(matriz[i][j]);
                                contenido += (listaTipoDescuento[posicion].split("¦")[1]);
                            }
                            else {
                                contenido += matriz[i][j];
                            }
                        }
                        contenido += "</td>";
                    }
                }
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += (matriz[i][nCampos - 1] == "A" ? "fa-trash-o" : "fa-check");
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
    document.getElementById("tbDescuento").innerHTML = contenido;
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
    var campoFiltrado = [];
    var x = 0;
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("¦");
        campoFiltrado = [];
        nCampos = campos.length;
        for (var k = 0; k < matrizIndice.length; k++) {
            campoFiltrado.push(campos[matrizIndice[k]]);
        }
        for (var j = 0 ; j < nCabeceras; j += 1) {
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

function mostrarDescuento(id) {
    var nCampos = matriz.length;
    var campo = "";
    var txtCodigo = document.getElementById("txtCodigo");
    var txtDescripcion = document.getElementById("txtDescripcion");
    var ddlTipoDescuento = document.getElementById("ddlTipoDescuento");
    var ddlTipoMonto = document.getElementById("ddlTipoMonto");
    var chkFacturable = document.getElementById("chkFacturable");
    var txtCodigoComponente = document.getElementById("txtCodigoComponente");
    var txtCodigoCuenta = document.getElementById("txtCodigoCuenta");
    var txtCodigoCentroCosto = document.getElementById("txtCodigoCentroCosto");
    var txtCodigoClasificadorMovimiento = document.getElementById("txtCodigoClasificadorMovimiento");
    var txtEstado = document.getElementById("txtEstado");
    var hdfCd = document.getElementById("hdfCd");
    for (var i = 0; i < nCampos; i++) {
        campo = matriz[i][0];
        if (campo == id) {
        	hdfCd.value = id;
            txtCodigo.value = matriz[i][0];
            txtDescripcion.value = matriz[i][1];
            ddlTipoDescuento.value = matriz[i][2].toString();
            ddlTipoMonto.value = matriz[i][3];
            chkFacturable.checked = (matriz[i][4] == "True" ? true : false);
            txtCodigoComponente.value = matriz[i][5]; 
            txtCodigoCuenta.value = matriz[i][6];
            txtCodigoCentroCosto.value = matriz[i][7];
            txtCodigoClasificadorMovimiento.value = matriz[i][8];
            txtEstado.value = (matriz[i][9] == "A" ? "ACTIVO" : "INACTIVO");
            idDescuento = id;
            if (listaComponente.length == 0) {
                var url1 = urlBase + "Mantenimiento/listarComponente/?ss=" + ss + "&su=" + sucursalId;
                $.ajax(url1, "get", busquedaComponente);
            }
            else {
                busquedaComponente();
            }
            if (listaCuenta.length == 0) {
                var url2 = urlBase + "Mantenimiento/listarCuenta/?ss=" + ss;
                $.ajax(url2, "get", busquedaCuenta);
            }
            else {
                busquedaCuenta();
            }
            if (listaCentro.length == 0) {
                var url2 = urlBase + "Mantenimiento/listarCentroCosto/?ss=" + ss;
                $.ajax(url2, "get", busquedaCentro);
            }
            else {
                busquedaCentro();
            }
            if (listaClasificador.length == 0) {
                var url2 = urlBase + "Mantenimiento/listarClasificadorMovimiento/?ss=" + ss;
                $.ajax(url2, "get", busquedaClasificador);
            }
            else {
                busquedaClasificador();
            }
            abrirPopup('PopupDescuento');
            break;
        }
    }
}

function crearCabeceraExportar() {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    cabecera += "<td style='width: 70px' align='center'>Código</td>";
    cabecera += "<td style='width: 210px' align='center'>Descripción</td>";
    cabecera += "<td style='width: 150px' align='center'>Tipo de Descuento</td>";
    cabecera += "<td style='width: 70px' align='center'>TipoMonto</td>";
    cabecera += "<td style='width: 150px' align='center'>Indicador Facturable</td>";
    cabecera += "<td style='width: 120px' align='center'>Código Componente</td>";
    cabecera += "<td style='width: 150px' align='center'>Componente</td>";
    cabecera += "<td style='width: 150px' align='center'>Código Cuenta Contable</td>";
    cabecera += "<td style='width: 200px' align='center'>Cuenta Contable</td>";
    cabecera += "<td style='width: 60px' align='center'>Estado</td>";
    cabecera += "</tr>";
    return cabecera;
}

function exportacion() {
    var nRegistros = matriz.length;
    var data;
    var valor;
    if (nRegistros > 0) {
        var nCampos = matriz[0].length;
        var contenido = [];
        
        excelExportar = crearCabeceraExportar();
        for (i = 0; i < nRegistros; i++) {
            contenido.push("<tr>");
            //for (j = 0; j < (nCampos+2); j++) {
            for (j = 0; j < nCampos; j++) {
                    switch (j) {
                        case 2:
                            for (var x = 0; x < listaTipoDescuento.length; x++) {
                                data = listaTipoDescuento[x].split("¦");
                                if (data[0] * 1 == matriz[i][j]) {
                                    valor = data[1];
                                    break;
                                }
                            }
                            contenido.push("<td>" + valor + "</td>");
                            break;
                        case 4:
                            contenido.push("<td align='center'>" + (matriz[i][j] == "True" ? "Si" : "No") + "</td>");
                            break;
                        case 6:
                            for (var x = 0; x < listaComponente.length; x++) {
                                data = listaComponente[x].split("¦");
                                if (data[0] * 1 == matriz[i][5]) {
                                    valor = data[1];
                                    break;
                                }
                            }
                            contenido.push("<td>" + valor + "</td>");
                            break;
                        case 7:
                            contenido.push("<td>" + matriz[i][6] + "</td>");
                            break;  
                        case 8:
                            for (var x = 0; x < listaCuenta.length; x++) {
                                data = listaCuenta[x].split("¦");
                                if (data[0] * 1 == matriz[i][6]) {
                                    valor = data[1];
                                    break;
                                }
                            }
                            contenido.push("<td>" + valor + "</td>");
                            break;
                        case 9:
                            contenido.push("<td align='center'>" + (matriz[i][9] == "A" ? "ACTIVO" : "INACTIVO") + "</td>")
                            break;
                        default:
                            contenido.push("<td>" + matriz[i][j] + "</td>");
                            break;                                        
                }

            }
            contenido.push("</tr>");
        }
        excelExportar += contenido.join("") + "</table></html>";
    }
    else {
        return false;
    }
}

function configurarControles() {
    var aExportarExcel = document.getElementById("aExportarExcel");
    aExportarExcel.onclick = function () {
        var nRegistros = matriz.length;
        if (nRegistros > 0) {
            exportacion();
            var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
            this.download = "Descuento.xls";
            this.href = window.URL.createObjectURL(formBlob);
        }
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
        if (validarDescuento()) {
            var hdfOpc = document.getElementById("hdfOpc").value;
            var txtDescripcion = document.getElementById("txtDescripcion").value;
            var ddlTipoDescuento = document.getElementById("ddlTipoDescuento").value;
            var ddlTipoMonto = document.getElementById("ddlTipoMonto").value;
            var chkFacturable = (document.getElementById("chkFacturable").checked == true ? "True" : "False");
            var txtCodigoComponente = document.getElementById("txtCodigoComponente").value;
            var txtCodigoCuenta = document.getElementById("txtCodigoCuenta").value;
            var txtCodigoCentroCosto = document.getElementById("txtCodigoCentroCosto").value;
            var txtCodigoClasificadorMovimiento = document.getElementById("txtCodigoClasificadorMovimiento").value;
            var strDatos = hdfOpc + "|" + txtDescripcion + "|" + ddlTipoDescuento + "|" + ddlTipoMonto + "|" + chkFacturable + "|" + txtCodigoComponente + "|" + txtCodigoCuenta + "|" + txtCodigoCentroCosto + "|" + txtCodigoClasificadorMovimiento;
            if (hdfOpc == 2) {
                strDatos += "|" + idDescuento;
            }
            var ss = window.parent.document.getElementById("iss").value;
            var url = urlBase + "Mantenimiento/grabarDescuento/?ss=" + ss;
            $.ajax(url, "post", mostrarGrabar, strDatos);
            abrirPopup("PopupDescuento");
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
    var spnCuenta = document.getElementById("spnCuenta");
    spnCuenta.onclick = function () {
        var ifrCuenta = document.getElementById("ifrCuenta");
        if (ifrCuenta.innerHTML == "") {
            ifrCuenta.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/PlanCuentaContableLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupCuenta");
    }
  
    var spnCentro = document.getElementById("spnCentro");
    spnCentro.onclick = function () {
        var ifrCentro = document.getElementById("ifrCentro");
        if (ifrCentro.innerHTML == "") {
            ifrCentro.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/CentroCostoLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupCentro");
    }
    var spnClasificador = document.getElementById("spnClasificador");
    spnClasificador.onclick = function () {
        var ifrClasificador = document.getElementById("ifrClasificador");
        if (ifrClasificador.innerHTML == "") {
            ifrClasificador.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/ClasificadorMovimientoLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupClasificador");
    }
    var hdfCom = document.getElementById("hdfCom");
    hdfCom.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtCodigoComponente = document.getElementById("txtCodigoComponente");
            txtCodigoComponente.value = datos[0];
            var txtComponente = document.getElementById("txtComponente");
            txtComponente.value = datos[1];
        }
    }
    var hdfCue = document.getElementById("hdfCue");
    hdfCue.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtCodigoCuenta = document.getElementById("txtCodigoCuenta");
            txtCodigoCuenta.value = datos[0];
            var txtCuenta = document.getElementById("txtCuenta");
            txtCuenta.value = datos[1];
        }
    }
    var hdfCen = document.getElementById("hdfCen");
    hdfCen.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtCodigoCentroCosto = document.getElementById("txtCodigoCentroCosto");
            txtCodigoCentroCosto.value = datos[0];
            var txtCentroCosto = document.getElementById("txtCentroCosto");
            txtCentroCosto.value = datos[1];
        }
    }
    var hdfCla = document.getElementById("hdfCla");
    hdfCla.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtCodigoClasificadorMovimiento = document.getElementById("txtCodigoClasificadorMovimiento");
            txtCodigoClasificadorMovimiento.value = datos[0];
            var txtClasificadorMovimiento = document.getElementById("txtClasificadorMovimiento");
            txtClasificadorMovimiento.value = datos[1];
        }
    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        var valor1 = matriz[Campoeliminar][0];
        var valor2 = matriz[Campoeliminar][9];
        anular(valor1, valor2);
    }

    var btnBusqueda = document.getElementById("btnBusqueda");
    btnBusqueda.onclick = function () {
        Buscar();
    }
}

function anular(id, estado) {
    var ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/anularDescuento/?ss=" + ss + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A");
    $.ajax(url, "get", mostrarGrabar);
    abrirPopup('PopupEstado');

}

function mostrarGrabar(rpta) {
    if (rpta != "") {
        switch (rpta) {
            case "1":
                var cabecera = document.getElementsByName("cabecera");
                for (var x = 0; x < cabecera.length; x++) {
                    cabecera[x].value = "";
                }
                mostraralerta("Se ha añadido un nuevo registro");
                break;
            case "2":
                var cabecera = document.getElementsByName("cabecera");
                for (var x = 0; x < cabecera.length; x++) {
                    cabecera[x].value = "";
                }
                mostraralerta("Se ha actualizado un registro");
                break;
            case "3":
                var cabecera = document.getElementsByName("cabecera");
                for (var x = 0; x < cabecera.length; x++) {
                    cabecera[x].value = "";
                }
                mostraralerta("Se ha actualizado el estado de un registro");
                break;
            default:
                var cabecera = document.getElementsByName("cabecera");
                for (var x = 0; x < cabecera.length; x++) {
                    cabecera[x].value = "";
                }
                mostraralerta("Ocurrio un error en la transaccion");
                break;
        }
        var btnBusqueda = document.getElementById("btnBusqueda");
        btnBusqueda.click();
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


function validarDescuento() {
    var txtDescripcion = document.getElementById("txtDescripcion");
    var ddlTipoDescuento = document.getElementById("ddlTipoDescuento");
    var ddlTipoMonto = document.getElementById("ddlTipoMonto");
    var txtCodigoComponente = document.getElementById("txtCodigoComponente");
    var txtCodigoCuenta = document.getElementById("txtCodigoCuenta");
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
    var mensajeTipoDescuento = validarCombo(ddlTipoDescuento.id, "tipo de descuento", true);
    if (mensajeTipoDescuento != "") {
        mensajeValidacion[ddlTipoDescuento.getAttribute("data-secuencia")] = mensajeTipoDescuento;
        ddlTipoDescuento.className += " error";
    }
    var mensajeTipoMonto = validarCombo(ddlTipoMonto.id, "tipo de monto", true);
    if (mensajeTipoMonto != "") {
        mensajeValidacion[ddlTipoMonto.getAttribute("data-secuencia")] = mensajeTipoMonto;
        ddlTipoMonto.className += " error";
    }
    /*var mensajeCodigoComponente = validarTexto(txtCodigoComponente.id, "componente", true);
    if (mensajeCodigoComponente != "") {
        mensajeValidacion[txtCodigoComponente.getAttribute("data-secuencia")] = mensajeCodigoComponente;
        txtCodigoComponente.className += " error";
    }
    var mensajeCodigoCuenta = validarTexto(txtCodigoCuenta.id, "cuenta", true);
    if (mensajeCodigoCuenta != "") {
        mensajeValidacion[txtCodigoCuenta.getAttribute("data-secuencia")] = mensajeCodigoCuenta;
        txtCodigoCuenta.className += " error";
    }*/
    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
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

function limpiarFormulario() {
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
    var limpiar = document.getElementsByName("limpiar");
    for (var y = 0; y < limpiar.length; y++) {
        if (y == (limpiar.length - 1)) {
            limpiar[y].value = "ACTIVO";
        }
        else {
            if (limpiar[y].type == "checkbox") {
                limpiar[y].checked = false;
            } else {
                limpiar[y].value = "";
            }
        }
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

function llenarCombo(lista, nombreCombo, titulo) {
    var contenido = "";
    var listas = lista.split("¯");
    var n = listas.length;
    var valor = "";
    var campos = "";
    contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
    for (var x = 0; x < n; x++) {
        campos = listas[x].split("¦");
        contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function busquedaComponente(rpta) {
    if (rpta != "" && rpta != undefined) {
        listaComponente = rpta.split("¯");
        var nCampos = listaComponente.length;
        var txtCodigoComponente = document.getElementById("txtCodigoComponente").value;
        var txtComponente = document.getElementById("txtComponente");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaComponente[x].split("¦");
            if (valor[0] == txtCodigoComponente) {
                txtComponente.value = valor[1];
                break;
            }
        }
    }
    else {
        var nCampos = listaComponente.length;
        var txtCodigoComponente = document.getElementById("txtCodigoComponente").value;
        var txtComponente = document.getElementById("txtComponente");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaComponente[x].split("¦");
            if (valor[0] == txtCodigoComponente) {
                txtComponente.value = valor[1];
                break;
            }
        }
    }
}

function busquedaCuenta(rpta) {
    if (rpta != "" && rpta != undefined) {
        listaCuenta = rpta.split("¯");
        var nCampos = listaCuenta.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoCuenta").value;
        var txtCuenta = document.getElementById("txtCuenta");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaCuenta[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
    }
    else {
        var nCampos = listaCuenta.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoCuenta").value;
        var txtCuenta = document.getElementById("txtCuenta");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaCuenta[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
    }
}
function busquedaCentro(rpta) {
    if (rpta != "" && rpta != undefined) {
        listaCentro = rpta.split("¯");
        var nCampos = listaCentro.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoCentroCosto").value;
        var txtCuenta = document.getElementById("txtCentroCosto");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaCentro[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
    }
    else {
        var nCampos = listaCentro.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoCentroCosto").value;
        var txtCuenta = document.getElementById("txtCentroCosto");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaCentro[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
    }
}
function busquedaClasificador(rpta) {
    if (rpta != "" && rpta != undefined) {
        listaClasificador = rpta.split("¯");
        var nCampos = listaClasificador.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoClasificadorMovimiento").value;
        var txtCuenta = document.getElementById("txtClasificadorMovimiento");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaClasificador[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
    }
    else {
        var nCampos = listaClasificador.length;
        var txtCodigoCuenta = document.getElementById("txtCodigoClasificadorMovimiento").value;
        var txtCuenta = document.getElementById("txtClasificadorMovimiento");
        var valor;
        for (var x = 0; x < nCampos; x++) {
            valor = listaClasificador[x].split("¦");
            if (valor[0] == txtCodigoCuenta) {
                txtCuenta.value = valor[1];
                break;
            }
        }
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