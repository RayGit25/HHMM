var lista = [];
var listaServicio = [];
var listaMoneda = [];
var listaTipoAdmision = [];
var listaTipoPaciente = [];
var listaTipoPersona = ["N¦Natural", "J¦Juridica"];
var listaUnidadMedica = [];
var listaConcepto = [];
var matriz = [];
var cabeceras = ["Sucursal", "Asiento", "Servicio", "Moneda", "Tipo Admision", "Tipo Paciente", "Tipo Persona", "Comp./Art.", "Comp./Art. Descripcion", "Cta. Cont. Costo Vinculada", "Cta. Cont. Prov. Vinculada", "Cta. Cont. Costo No Vinculada", "Cta. Cont. Prov. No Vinculada", "Estado"];
var anchos = [180, 80, 200, 100, 150, 150, 150, 100, 250, 350, 350, 350, 350, 80];
var matrizIndice = [2, 3, 4, 5, 6, 37, 38, 11, 33, 34, 35, 36, 10];
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
var idCuenta = -1;
var Campoeliminar = "";
var sucursalId;
var sucursal;
window.onload = function () {
    sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
    var pos1 = window.location.href.indexOf("Mantenimiento");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/listasCuentaProvisionPago/?ss=" + ss;
    $.ajax(url, "get", listarCombos);
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
    var TituloPopupCuentaProvision = document.getElementById("TituloPopupCuentaProvision");
    var hdfOpc = document.getElementById("hdfOpc");
    var spnHistorial = document.getElementById("spnHistorial");
    if (valor) {
        hdfOpc.value = "1";
        TituloPopupCuentaProvision.innerHTML = "AGREGAR CUENTAS CONTABLES DE PROVISIÓN Y PAGO";
        spnHistorial.style.display = "none";
    }
    else {
        hdfOpc.value = "2";
        TituloPopupCuentaProvision.innerHTML = "MODIFICAR CUENTAS CONTABLES DE PROVISIÓN Y PAGO";
        spnHistorial.style.display = "";
    }
}

function listarCombos(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        listaServicio = data[0].split("¯");
        listaTipoAdmision = data[1].split("¯");
        listaMoneda = data[2].split("¯");
        var listaEspecialidad = data[3].split("¯");
        var listaClasificadorMovimiento = data[4].split("¯");
        var listaChecks = data[5].split("¯");
        listaUnidadMedica = data[6].split("¯");
        listaConcepto = data[7].split("¯");
        listaTipoPaciente = data[8].split("¯");

        llenarCombo(listaServicio, "ddlBusquedaTipoServicio", true);
        llenarCombo(listaTipoAdmision, "ddlBusquedaTipoAdmision", true);
        llenarCombo(listaTipoPaciente, "ddlBusquedaTipoPaciente", true);
        var txtBusquedaSucursal = document.getElementById("txtBusquedaSucursal");
        txtBusquedaSucursal.value = sucursal;
        llenarCombo(listaServicio, "ddlServicio", true);
        llenarCombo(listaMoneda, "ddlMoneda");
        llenarCombo(listaEspecialidad, "ddlEspecialidad", true);
        llenarCombo(listaTipoAdmision, "ddlTipoAdmision", true);
        llenarCombo(listaTipoPaciente, "ddlTipoPaciente", true);
        llenarCombo(listaClasificadorMovimiento, "ddlClasificacionMovimiento", true);
        var txtSucursal = document.getElementById("txtSucursal");
        txtSucursal.value = sucursal;
        configuracionInicial();
        crearChecks(listaChecks);
        //Buscar();
    }
}

function Buscar() {
    var divCuentaProvision = document.getElementById("divCuentaProvision");
    divCuentaProvision.style.display = "";
    configuracionInicial();
    var url = urlBase + "Mantenimiento/listarCuentaProvisionPago/?ss=" + ss;
    var ddlBusquedaTipoServicio = document.getElementById("ddlBusquedaTipoServicio").value;
    var ddlBusquedaTipoAdmision = document.getElementById("ddlBusquedaTipoAdmision").value;
    var ddlBusquedaTipoPersona = document.getElementById("ddlBusquedaTipoPersona").value;
    var ddlBusquedaTipoPaciente = document.getElementById("ddlBusquedaTipoPaciente").value;
    var ddlBusquedaTipoAsiento = document.getElementById("ddlBusquedaTipoAsiento").value;
    var txtBusquedaCuenta = document.getElementById("txtBusquedaCuenta").value;
    var strDatos = sucursalId + "|" + ddlBusquedaTipoServicio + "|" + ddlBusquedaTipoAdmision + "|" + ddlBusquedaTipoAsiento + "|" + txtBusquedaCuenta + "|" + ddlBusquedaTipoPersona + "|" + ddlBusquedaTipoPaciente;
    $.ajax(url, "post", listarTodo, strDatos);
}

function listarTodo(rpta) {
    if (rpta != "") {
        lista = rpta.split("¯");
        listarCuenta();
    }
    else {
        matriz = [];
        var contenido = "";
        var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 2).toString();
        contenido += "'>No hay datos</td></tr>";
        document.getElementById("tbCuentaProvision").innerHTML = contenido;
    }
}

function listarCuenta(irUltimaPagina) {
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
    var valor = "";
    var nCampos = cabeceras.length;
    var contenido = "<table class='tabla-general' style='table-layout:fixed'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:50px;vertical-align: middle;text-align: center;'><span class='Icons fa-plus' onclick='EscogerOpcion(true);limpiarFormulario();abrirPopup(\"PopupCuentaProvision\");'></span></th>";
    for (var j = 0; j < nCampos; j++) {
        contenido += "<th style='width:";
        contenido += anchos[j];
        contenido += "px'><span id='spn";
        contenido += j.toString();
        if (j == 0) {
            contenido += "'>";
        }
        else {
            contenido += "' class='Enlace' data-orden='";
            contenido += matrizIndice[j];
            contenido += "'>";
        }
        contenido += cabeceras[j];
        contenido += "</span><br/>";
        if (j > 0) {
            switch (j) {
                case (nCampos - 1):
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                    break;
                case 2:
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                    for (var x = 0; x < listaServicio.length; x++) {
                        valor = listaServicio[x].split("¦");
                        contenido += "<option value='";
                        contenido += valor[0];
                        contenido += "'>";
                        contenido += valor[1];
                        contenido += "</option>";
                    }
                    break;
                case 3:
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                    for (var x = 0; x < listaMoneda.length; x++) {
                        valor = listaMoneda[x].split("¦");
                        contenido += "<option value='";
                        contenido += valor[0];
                        contenido += "'>";
                        contenido += valor[1];
                        contenido += "</option>";
                    }
                    break;
                case 4:
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                    for (var x = 0; x < listaTipoAdmision.length; x++) {
                        valor = listaTipoAdmision[x].split("¦");
                        contenido += "<option value='";
                        contenido += valor[0];
                        contenido += "'>";
                        contenido += valor[1];
                        contenido += "</option>";
                    }
                    break;
                case 5:
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                    for (var x = 0; x < listaTipoPaciente.length; x++) {
                        valor = listaTipoPaciente[x].split("¦");
                        contenido += "<option value='";
                        contenido += valor[0];
                        contenido += "'>";
                        contenido += valor[1];
                        contenido += "</option>";
                    }
                    break;
                case 6:
                    contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                    for (var x = 0; x < listaTipoPersona.length; x++) {
                        valor = listaTipoPersona[x].split("¦");
                        contenido += "<option value='";
                        contenido += valor[0];
                        contenido += "'>";
                        contenido += valor[1];
                        contenido += "</option>";
                    }
                    break;
                default:
                    contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
                    break;
            }
        }
        contenido += "</th>";
    }
    contenido += "<th style='width:50px;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='aExportarExcel'></a></th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tbCuentaProvision' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas' colspan='";
    contenido += (nCampos + 2).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divCuentaProvision").innerHTML = contenido;
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
        for (j = 0; j < nCampos + 4; j++) {
            if (j == 33 || j == 34 || j == 35 || j == 36 || j == 37 || j == 38) {
                switch (j) {
                    case 33:
                        matriz[x][j] = campos[12] + " - " + campos[18].trim();
                        break;
                    case 34:
                        matriz[x][j] = campos[13] + " - " + campos[19].trim();
                        break;
                    case 35:
                        matriz[x][j] = campos[15] + " - " + campos[21].trim();
                        break;
                    case 36:
                        matriz[x][j] = campos[16] + " - " + campos[22].trim();
                        break;
                    case 37:
                        matriz[x][j] = campos[33];
                        break;
                    case 38:
                        matriz[x][j] = campos[34];
                        break;
                }
            }
            else {
                if (isNaN(campos[j]) || j == 4 || j == 9 || j == 11 || j == 5 || j == 6 || j >= 12 || campos[j] == "") matriz[x][j] = campos[j];
                else matriz[x][j] = campos[j] * 1;
            }
        }
        x++;
    }
}


function mostrarMatriz(indicePagina) {
    indiceActualPagina = indicePagina;
    var contenido = "";
    var n = matriz.length;
    if (n > 0) {
        var nCampos = cabeceras.length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        var valor;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<div>";
                contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='EscogerOpcion(false);limpiarFormulario();mostrarCuenta(";
                contenido += matriz[i][0];
                contenido += ")'></span></td></div>";
                contenido += "<td>";
                contenido += sucursal;
                contenido += "</td>";
                for (var j = 1; j < nCampos; j++) {
                    contenido += "<td>";
                    switch (j) {
                        case 1:
                            contenido += matriz[i][2];
                            break;
                        case 2:
                            if (matriz[i][3] == 0) {
                                contenido += "TODOS";
                            }
                            else {
                                for (var x = 0; x < listaServicio.length; x++) {
                                    valor = listaServicio[x].split("¦");
                                    if (matriz[i][3] == valor[0]) {
                                        contenido += valor[1];
                                        break;
                                    }
                                }
                            }
                            break;
                        case 3:
                            var valor;
                            for (var x = 0; x < listaMoneda.length; x++) {
                                valor = listaMoneda[x].split("¦");
                                if (matriz[i][4] == valor[0]) {
                                    contenido += valor[1];
                                    break;
                                }
                            }
                            break;
                        case 4:
                            var valor;
                            for (var x = 0; x < listaTipoAdmision.length; x++) {
                                valor = listaTipoAdmision[x].split("¦");
                                if (matriz[i][5] == valor[0]) {
                                    contenido += valor[1];
                                    break;
                                }
                                else if (matriz[i][5] == "0") {
                                    contenido += "Todos";
                                    break;
                                }
                            }
                            break;
                        case 5:
                            var valor;
                            for (var x = 0; x < listaTipoPaciente.length; x++) {
                                valor = listaTipoPaciente[x].split("¦");
                                if (matriz[i][37] == valor[0]) {
                                    contenido += valor[1];
                                    break;
                                }
                                else if (matriz[i][37] == "0") {
                                    contenido += "Todos";
                                    break;
                                }
                            }
                            break;
                        case 6:
                            var valor;
                            for (var x = 0; x < listaTipoPersona.length; x++) {
                                valor = listaTipoPersona[x].split("¦");
                                if (matriz[i][38] == valor[0]) {
                                    contenido += valor[1];
                                    break;
                                }
                                else if (matriz[i][38] == "0") {
                                    contenido += "Todos";
                                    break;
                                }
                            }
                            break;
                        case 7:
                            contenido += matriz[i][6];
                            break;
                        case 8:
                            contenido += matriz[i][11];
                            break;
                        case 9:
                            contenido += matriz[i][33];
                            break;
                        case 10:
                            contenido += matriz[i][34];
                            break;
                        case 11:
                            contenido += matriz[i][35];
                            break;
                        case 12:
                            contenido += matriz[i][36];
                            break;
                        case 13:
                            contenido += (matriz[i][10] == "A" ? "ACTIVO" : "INACTIVO");
                            break;
                        default:
                            contenido += matriz[i][j];
                            break;

                    }
                    contenido += "</td>";
                }
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += (matriz[i][10] == "A" ? "fa-trash-o" : "fa-check");
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
    document.getElementById("tbCuentaProvision").innerHTML = contenido;
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
        for (var k = 0; k < nCabeceras; k++) {
            if (k == 4 || k == 5 || k == 6 || k == 7 || k == 8 || k == 9 || k == 10 || k == 11) {
                switch (k) {
                    case 4:
                        campoFiltrado.push(campos[33]);
                        break;
                    case 5:
                        campoFiltrado.push(campos[34]);
                        break;
                    case 6:
                        campoFiltrado.push(campos[6]);
                        break;
                    case 7:
                        campoFiltrado.push(campos[11]);
                        break;
                    case 8:
                        campoFiltrado.push(campos[12] + " - " + campos[18].trim());
                        break;
                    case 9:
                        campoFiltrado.push(campos[13] + " - " + campos[19].trim());
                        break;
                    case 10:
                        campoFiltrado.push(campos[15] + " - " + campos[21].trim());
                        break;
                    case 11:
                        campoFiltrado.push(campos[16] + " - " + campos[22].trim());
                        break;
                }
            }
            else {
                campoFiltrado.push(campos[matrizIndice[k]]);
            }
        }
        for (var j = 0; j < nCabeceras; j += 1) {
            exito = true;
            cabecera = cabeceras[j];
            if (cabecera.className == "Texto") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
            else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
            if (!exito) break;
        }

        if (exito) {
            matriz[x] = [];
            for (var j = 0; j < nCampos + 4; j++) {
                if (j == 33 || j == 34 || j == 35 || j == 36 || j == 37 || j == 38) {
                    switch (j) {
                        case 33:
                            matriz[x][j] = campos[12] + " - " + campos[18].trim();
                            break;
                        case 34:
                            matriz[x][j] = campos[13] + " - " + campos[19].trim();
                            break;
                        case 35:
                            matriz[x][j] = campos[15] + " - " + campos[21].trim();
                            break;
                        case 36:
                            matriz[x][j] = campos[16] + " - " + campos[22].trim();
                            break;
                        case 37:
                            matriz[x][j] = campos[33];
                            break;
                        case 38:
                            matriz[x][j] = campos[34];
                            break;
                    }
                }
                else {
                    if (isNaN(campos[j]) || j == 4 || j == 9 || j == 11 || j == 5 || j == 6 || j >= 12 || campos[j] == "") matriz[x][j] = campos[j];
                    else matriz[x][j] = campos[j] * 1;
                }
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
    for (var i = inicio; i < fin; i += 1) {
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
    cabecera += "<td style='width: 250px' align='center'>Sucursal</td>";
    cabecera += "<td style='width: 100px' align='center'>Asiento</td>";
    cabecera += "<td style='width: 200px' align='center'>Servicio</td>";
    cabecera += "<td style='width: 100px' align='center'>Moneda</td>";
    cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
    cabecera += "<td style='width: 140px' align='center'>Componente Artículo</td>";
    cabecera += "<td style='width: 300px' align='center'>Descripción</td>";
    cabecera += "<td style='width: 350px' align='center'>Cta. Cont. Costo Vinculada</td>";
    cabecera += "<td style='width: 450px' align='center'>Cta. Cont. Prov. Vinculada</td>";
    cabecera += "<td style='width: 350px' align='center'>Cta. Cont. Costo No Vinculada</td>";
    cabecera += "<td style='width: 450px' align='center'>Cta. Cont. Prov. No Vinculada</td>";
    cabecera += "<td style='width: 60px' align='center'>Estado</td>";
    cabecera += "</tr>";
    return cabecera;
}

function exportacion() {
    var nRegistros = matriz.length;
    var nCampos = cabeceras.length;
    var contenido = [];
    var valor;
    excelExportar = crearCabeceraExportar();
    for (i = 0; i < nRegistros; i++) {
        contenido.push("<tr>");
        contenido.push("<td>" + sucursal + "</td>");
        for (j = 1; j < nCampos; j++) {
            switch (j) {
                case 1:
                    contenido.push("<td>" + matriz[i][2] + "</td>");
                    break;
                case 2:
                    for (var x = 0; x < listaServicio.length; x++) {
                        valor = listaServicio[x].split("¦");
                        if (matriz[i][3] == valor[0]) {
                            contenido.push("<td>" + valor[1] + "</td>");
                            break;
                        } else {
                            contenido.push("<td>Todos</td>");
                            break;
                        }
                    }
                    break;
                case 3:

                    for (var x = 0; x < listaMoneda.length; x++) {
                        valor = listaMoneda[x].split("¦");
                        if (matriz[i][4] == valor[0]) {
                            contenido.push("<td>" + valor[1] + "</td>");
                            break;
                        }
                    }
                    break;
                case 4:
                    for (var x = 0; x < listaTipoAdmision.length; x++) {
                        valor = listaTipoAdmision[x].split("¦");
                        if (matriz[i][5] == valor[0]) {
                            contenido.push("<td>" + valor[1] + "</td>");
                            break;
                        } else {
                            contenido.push("<td>Todos</td>");
                            break;
                        }
                    }
                    break;
                case 5:
                    contenido.push("<td style='mso-number-format:\"\@\"'>" + matriz[i][6] + "</td>");
                    break;
                case 6:
                    contenido.push("<td>" + matriz[i][11] + "</td>");
                    break;
                case 7:
                    contenido.push("<td>" + matriz[i][33] + "</td>");
                    break;
                case 8:
                    contenido.push("<td>" + matriz[i][34] + "</td>");
                    break;
                case 9:
                    contenido.push("<td>" + matriz[i][35] + "</td>");
                    break;
                case 10:
                    contenido.push("<td>" + matriz[i][36] + "</td>");
                    break;
                case 11:
                    contenido.push("<td>" + (matriz[i][10] == "A" ? "ACTIVO" : "INACTIVO") + "</td>");
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

function configurarControles() {
    var aExportarExcel = document.getElementById("aExportarExcel");
    aExportarExcel.onclick = function () {
        var nRegistros = matriz.length;
        if (nRegistros > 0) {
            exportacion();
            var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
            this.download = "CuentaProvisionPago.xls";
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
    var btnBusqueda = document.getElementById("btnBusqueda");
    btnBusqueda.onclick = function () {
        Buscar();
    }
    var ddlComponente = document.getElementById("ddlComponente");
    ddlComponente.onchange = function () {
        var divOculComp = document.getElementById("divOculComp");
        if (this.value == "") {
            divOculComp.style.display = "none";
        }
        else {
            var ocultar = document.getElementsByClassName("cocultar");
            for (var i = 0; i < ocultar.length; i++) {
                if (ocultar[i].getAttribute("data-com") == this.value) {
                    ocultar[i].style.display = "";
                }
                else {
                    ocultar[i].style.display = "none";
                }
            }
            divOculComp.style.display = "";
        }
        var txtPrestacion = document.getElementById("txtPrestacion");
        txtPrestacion.value = "";
        var txtArticulo = document.getElementById("txtArticulo");
        txtArticulo.value = "";
        var txtPresDescripcion = document.getElementById("txtPresDescripcion");
        txtPresDescripcion.value = "";
    }

    var spnComponente = document.getElementById("spnComponente");
    spnComponente.onclick = function () {
        var ddlComponente = document.getElementById("ddlComponente");
        if (ddlComponente.value == "A") {
            var ifrArticulo = document.getElementById("ifrArticulo");
            if (ifrArticulo.innerHTML == "") {
                ifrArticulo.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/ArticuloLista/?ss=" + ss + "'></iframe>";
            }
            abrirPopup("PopupArticulo");
        }
        else {
            var ifrComponente = document.getElementById("ifrComponente");
            if (ifrComponente.innerHTML == "") {
                ifrComponente.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/ComponenteLista/?ss=" + ss + "'></iframe>";
            }
            abrirPopup("PopupComponente");
        }
    }

    var spnVCostoCuenta = document.getElementById("spnVCostoCuenta"),
        spnVProvCuenta = document.getElementById("spnVProvCuenta"),
        spnvCliCuenta = document.getElementById("spnvCliCuenta"),
        spnNVCostoCuenta = document.getElementById("spnNVCostoCuenta"),
        spnNVProvCuenta = document.getElementById("spnNVProvCuenta"),
        spnNVCliCuenta = document.getElementById("spnNVCliCuenta");

    spnVCostoCuenta.onclick = spnVProvCuenta.onclick = spnvCliCuenta.onclick = spnNVCostoCuenta.onclick = spnNVProvCuenta.onclick = spnNVCliCuenta.onclick = function () {
        var ifrCuenta = document.getElementById("ifrCuenta");
        //if (ifrCuenta.innerHTML == "") {
        ifrCuenta.innerHTML = "<iframe style='margin:0;padding:0;width:700px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/PlanCuentaContableLista/?ss=" + ss + "&pos=" + this.getAttribute("data-orden") + "'></iframe>";
        //}
        abrirPopup("PopupCuenta");
    }

    var hdfCom = document.getElementById("hdfCom");
    hdfCom.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtPrestacion = document.getElementById("txtPrestacion");
            txtPrestacion.value = datos[0];
            var txtPresDescripcion = document.getElementById("txtPresDescripcion");
            txtPresDescripcion.value = datos[1];
            if (txtPrestacion.className.indexOf("error") > -1) {
                txtPrestacion.className = txtPrestacion.className.split("error").join("").trim()
            }
        }
    }
    var hdfCue = document.getElementById("hdfCue");
    hdfCue.onchange = function () {
        var doc = document, txtCodigo, txtDescripcion;
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            switch (datos[2]) {
                case "1":
                    txtCodigo = doc.getElementById("txtCuentaContableVCosto");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableVCostoDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
                case "2":
                    txtCodigo = doc.getElementById("txtCuentaContableVProv");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableVProvDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
                case "3":
                    txtCodigo = doc.getElementById("txtCuentaContableVCli");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableVCliDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
                case "4":
                    txtCodigo = doc.getElementById("txtCuentaContableNVCosto");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableNVCostoDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
                case "5":
                    txtCodigo = doc.getElementById("txtCuentaContableNVProv");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableNVProvDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
                case "6":
                    txtCodigo = doc.getElementById("txtCuentaContableNVCli");
                    txtCodigo.value = datos[0];
                    txtDescripcion = doc.getElementById("txtCuentaContableNVCliDescripcion");
                    txtDescripcion.value = datos[1];
                    break;
            }
            if (txtCodigo.className.indexOf("error") > -1) {
                txtCodigo.className = txtCodigo.className.split("error").join("").trim()
            }
        }
    }
    var hdfArt = document.getElementById("hdfArt");
    hdfArt.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            var txtArticulo = document.getElementById("txtArticulo");
            txtArticulo.value = datos[0];
            var txtPresDescripcion = document.getElementById("txtPresDescripcion");
            txtPresDescripcion.value = datos[1];
            if (txtArticulo.className.indexOf("error") > -1) {
                txtArticulo.className = txtArticulo.className.split("error").join("").trim()
            }
        }
    }
    var btngrabar = document.getElementById("btngrabar")
    btngrabar.onclick = function () {
        if (validarCuenta()) {
            var Componente = "";
            var hdfOpc = document.getElementById("hdfOpc").value;
            var ddlTipoAsiento = document.getElementById("ddlTipoAsiento").value;
            var ddlServicio = document.getElementById("ddlServicio").value;
            var ddlMoneda = document.getElementById("ddlMoneda").value;
            var ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            //var chkVinculada = (document.getElementById("chkVinculada").checked == true ? "True" : "False");
            var ddlTipoAdmision = document.getElementById("ddlTipoAdmision").value;
            var ddlTipoPaciente = document.getElementById("ddlTipoPaciente").value;
            var ddlTipoPersona = document.getElementById("ddlTipoPersona").value;
            var ddlClasificacionMovimiento = document.getElementById("ddlClasificacionMovimiento").value;
            var ddlComponente = document.getElementById("ddlComponente").value;
            if (ddlComponente != "") {
                if (ddlComponente == "A") {
                    Componente = document.getElementById("txtArticulo").value;
                }
                else {
                    Componente = document.getElementById("txtPrestacion").value;
                }
            }
            var txtCuentaContableVCosto = document.getElementById("txtCuentaContableVCosto").value;
            var txtCuentaContableVProv = document.getElementById("txtCuentaContableVProv").value;
            var txtCuentaContableVCli = document.getElementById("txtCuentaContableVCli").value;

            var txtCuentaContableNVCosto = document.getElementById("txtCuentaContableNVCosto").value;
            var txtCuentaContableNVProv = document.getElementById("txtCuentaContableNVProv").value;
            var txtCuentaContableNVCli = document.getElementById("txtCuentaContableNVCli").value;

            var strDatos = hdfOpc + "|" + sucursalId + "|" + ddlTipoAsiento + "|" + ddlServicio + "|" + ddlMoneda + "|" + ddlEspecialidad + "||" + ddlTipoAdmision + "|" + ddlClasificacionMovimiento + "|" + ddlComponente + "|" + Componente + "|" + txtCuentaContableVCosto + "|" + txtCuentaContableVProv + "|" + txtCuentaContableVCli + "|" + txtCuentaContableNVCosto + "|" + txtCuentaContableNVProv + "|" + txtCuentaContableNVCli + "|" + ddlTipoPaciente + "|" + ddlTipoPersona;

            var checks = document.getElementsByName("rdn-ConfiguracionPago");
            var contenido = "0|";//obs produccion 0
            for (var x = 0; x < checks.length; x++) {
                if (checks[x].checked) {
                    contenido += "1|";
                }
                else {
                    contenido += "0|";
                }
            }
            var divGeneral = document.getElementById("divGeneral"),
                ddlGeneral = document.getElementById("ddlGeneral");
            var tipo = ddlGeneral.getAttribute("data-v");
            if (tipo == "") {
                contenido += "0|0|";
            } else {
                if (tipo == "1") {
                    contenido += ddlGeneral.value + "|0|";
                } else if (tipo == "2") {
                    contenido += "0|" + ddlGeneral.value + "|";
                }
            }
            contenido = contenido.substring(0, contenido.length - 1);
            strDatos += "|" + contenido;

            if (hdfOpc == 2) {
                strDatos += "|" + idCuenta;
            }
            var ss = window.parent.document.getElementById("iss").value;
            var url = urlBase + "Mantenimiento/grabarCuentaProvisionPago/?ss=" + ss;
            $.ajax(url, "post", mostrarGrabar, strDatos);
            abrirPopup("PopupCuentaProvision");
        }
    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        var valor1 = matriz[Campoeliminar][0];
        var valor2 = matriz[Campoeliminar][10];
        anular(valor1, valor2);
    }

    var ddlTipoAdmision = document.getElementById("ddlTipoAdmision");
    ddlTipoAdmision.onchange = function () {
        var divConfiguracionPago = document.getElementById("divConfiguracionPago");
        var divGeneral = document.getElementById("divGeneral");
        var checks = document.getElementsByName("rdn-ConfiguracionPago");
        if (this.value == "3") {
            var ddlGeneral = document.getElementById("ddlGeneral");
            ddlGeneral.selectedIndex = "0";
            divGeneral.style.display = "";
            divConfiguracionPago.style.display = "";
            if (checks[1].checked == false && checks[2].checked == false && checks[3].checked == false) {
                divGeneral.style.display = "none";
            }
        } else {
            divGeneral.style.display = "none";
            divConfiguracionPago.style.display = "none";
            limpiarChecks();
        }
    }
    var checks = document.getElementsByName("rdn-ConfiguracionPago"),
        divGeneral = document.getElementById("divGeneral"),
        spnGeneral = document.getElementById("spnGeneral"),
        ddlGeneral = document.getElementById("ddlGeneral");
    for (var x = 0; x < checks.length; x++) {
        checks[x].onchange = function () {
            if (this.value == "3") {
                if (this.checked) {
                    limpiarChecks(this.value);
                    divGeneral.style.display = "block";
                    spnGeneral.innerHTML = "Concepto";
                    llenarCombo(listaConcepto, "ddlGeneral");
                    ddlGeneral.setAttribute("data-v", "1");
                } else {
                    divGeneral.style.display = "none";
                    llenarCombo([], "ddlGeneral", true);
                    ddlGeneral.setAttribute("data-v", "");
                }
            } else if (this.value == "4" || this.value == "5") {
                if (this.checked) {
                    limpiarChecks(this.value);
                    if (divGeneral.style.display != "block") {
                        divGeneral.style.display = "block";
                        spnGeneral.innerHTML = "Unidad Médica";
                        llenarCombo(listaUnidadMedica, "ddlGeneral");
                    } else {
                        spnGeneral.innerHTML = "Unidad Médica";
                        llenarCombo(listaUnidadMedica, "ddlGeneral");
                    }
                    ddlGeneral.setAttribute("data-v", "2");
                } else {
                    if (!checks[3].checked && !checks[4].checked) {
                        divGeneral.style.display = "none";
                        llenarCombo([], "ddlGeneral");
                        ddlGeneral.setAttribute("data-v", "");
                    }
                }
            } else {
                limpiarChecks(this.value);
                divGeneral.style.display = "none";
                llenarCombo([], "ddlGeneral");
                ddlGeneral.setAttribute("data-v", "");
            }
        }
    }
}
function limpiarChecks(v) {
    var checks = document.getElementsByName("rdn-ConfiguracionPago");
    for (var x = 0; x < checks.length; x++) {
        if (v == undefined) {
            checks[x].checked = false;
        } else {
            if (v == "4" || v == "5") {
                if (checks[x].value != "4" && checks[x].value != "5") {
                    checks[x].checked = false;
                }
            } else {
                if (checks[x].value != v) {
                    checks[x].checked = false;
                }
            }
        }
    }
}
function anular(id, estado) {
    var ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/anularCuentaProvisionPago/?ss=" + ss + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A");
    $.ajax(url, "get", mostrarGrabar);
    abrirPopup('PopupEstado');

}

function mostrarGrabar(rpta) {
    if (rpta != "-1") {
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
            }
        }

        var btnBusqueda = document.getElementById("btnBusqueda");
        btnBusqueda.click();
    } else {
        mostraralerta("No se puede procesar la operación pues generaría duplicidad");
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

function validarCuenta() {
    var ddlComponente = document.getElementById("ddlComponente");
    var ddlTipoAsiento = document.getElementById("ddlTipoAsiento");
    var ddlMoneda = document.getElementById("ddlMoneda");
    var txtCuentaContableVCosto = document.getElementById("txtCuentaContableVCosto");
    var txtCuentaContableVProv = document.getElementById("txtCuentaContableVProv");
    var txtCuentaContableNVCosto = document.getElementById("txtCuentaContableNVCosto");
    var txtCuentaContableNVProv = document.getElementById("txtCuentaContableNVProv");

    var ddlGeneral = document.getElementById("ddlGeneral");
    var divGeneral = document.getElementById("divGeneral");

    mensajeValidacion = [];
    var validar = document.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }
    var mensajeTipoAsiento = validarCombo(ddlTipoAsiento.id, "tipo de asiento", true);
    if (mensajeTipoAsiento != "") {
        mensajeValidacion[ddlTipoAsiento.getAttribute("data-secuencia")] = mensajeTipoAsiento;
        ddlTipoAsiento.className += " error";
    }
    var mensajeMoneda = validarCombo(ddlMoneda.id, "moneda", true);
    if (mensajeMoneda != "") {
        mensajeValidacion[ddlMoneda.getAttribute("data-secuencia")] = mensajeMoneda;
        ddlMoneda.className += " error";
    }

    var tab1 = [];
    var mensajeCuentaContable = validarTexto(txtCuentaContableVCosto.id, "cuenta contable costo", true);
    if (mensajeCuentaContable != "") {
        mensajeValidacion[txtCuentaContableVCosto.getAttribute("data-secuencia")] = mensajeCuentaContable;
        txtCuentaContableVCosto.className += " error";
        tab1.push("1");
    }

    mensajeCuentaContable = validarTexto(txtCuentaContableVProv.id, "cuenta contable proveedor", true);
    if (mensajeCuentaContable != "") {
        mensajeValidacion[txtCuentaContableVProv.getAttribute("data-secuencia")] = mensajeCuentaContable;
        txtCuentaContableVProv.className += " error";
        if (tab1.indexOf("1") == -1) {
            tab1.push("1");
        }
    }

    mensajeCuentaContable = validarTexto(txtCuentaContableNVCosto.id, "cuenta contable costo", true);
    if (mensajeCuentaContable != "") {
        mensajeValidacion[txtCuentaContableNVCosto.getAttribute("data-secuencia")] = mensajeCuentaContable;
        txtCuentaContableNVCosto.className += " error";
        if (tab1.indexOf("2") == -1) {
            tab1.push("2");
        }
    }

    mensajeCuentaContable = validarTexto(txtCuentaContableNVProv.id, "cuenta contable proveedor", true);
    if (mensajeCuentaContable != "") {
        mensajeValidacion[txtCuentaContableNVProv.getAttribute("data-secuencia")] = mensajeCuentaContable;
        txtCuentaContableNVProv.className += " error";
        if (tab1.indexOf("2") == -1) {
            tab1.push("2");
        }
    }
    if (tab1.length == 1) {
        document.getElementById("tab" + tab1[0]).onclick();
    }

    if (divGeneral.style.display != "none") {
        if (ddlGeneral.value == "") {
            ddlGeneral.setAttribute("class", "error");
            return false;
        } else {
            ddlGeneral.setAttribute("class", "");
        }
    }

    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
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
        if (y == (limpiar.length - 14)) {
            limpiar[y].value = "ACTIVO";
        }
        else {
            if (limpiar[y].type == "checkbox") {
                limpiar[y].checked = false;
            } else {
                if (limpiar[y].nodeName == "SELECT") {
                    limpiar[y].selectedIndex = "0";
                    if (limpiar[y].id == "ddlComponente") {
                        limpiar[y].onchange();
                    }
                }
                else {
                    limpiar[y].value = "";
                }
            }
        }
    }
    var checks = document.getElementsByName("rdn-ConfiguracionPago");
    var contenido = "";
    for (var x = 0; x < checks.length; x++) {
        checks[x].checked = false;
    }
    document.getElementById("divConfiguracionPago").style.display = "none";
    document.getElementById("spnGeneral").innerHTML = "";
    llenarCombo([], "ddlGeneral");
    document.getElementById("ddlGeneral").setAttribute("data-v", "");
    document.getElementById("ddlGeneral").setAttribute("class", "");
    document.getElementById("divGeneral").style.display = "none";
    document.getElementById("tab1").onclick();
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

function mostrarCuenta(id) {
    var nCampos = matriz.length;
    var campo = "";
    var ddlTipoAsiento = document.getElementById("ddlTipoAsiento");
    var ddlServicio = document.getElementById("ddlServicio");
    var ddlMoneda = document.getElementById("ddlMoneda");
    var ddlEspecialidad = document.getElementById("ddlEspecialidad");
    var ddlTipoAdmision = document.getElementById("ddlTipoAdmision");
    var ddlTipoPaciente = document.getElementById("ddlTipoPaciente");
    var ddlTipoPersona = document.getElementById("ddlTipoPersona");
    var ddlClasificacionMovimiento = document.getElementById("ddlClasificacionMovimiento");
    var ddlComponente = document.getElementById("ddlComponente");
    var txtEstado = document.getElementById("txtEstado");
    var hdfCd = document.getElementById("hdfCd");
    var txtPresDescripcion = document.getElementById("txtPresDescripcion");

    var txtCuentaContableVCosto = document.getElementById("txtCuentaContableVCosto");
    var txtCuentaContableVCostoDescripcion = document.getElementById("txtCuentaContableVCostoDescripcion");

    var txtCuentaContableVProv = document.getElementById("txtCuentaContableVProv");
    var txtCuentaContableVProvDescripcion = document.getElementById("txtCuentaContableVProvDescripcion");

    var txtCuentaContableVCli = document.getElementById("txtCuentaContableVCli");
    var txtCuentaContableVCliDescripcion = document.getElementById("txtCuentaContableVCliDescripcion");

    var txtCuentaContableNVCosto = document.getElementById("txtCuentaContableNVCosto");
    var txtCuentaContableNVCostoDescripcion = document.getElementById("txtCuentaContableNVCostoDescripcion");

    var txtCuentaContableNVProv = document.getElementById("txtCuentaContableNVProv");
    var txtCuentaContableNVProvDescripcion = document.getElementById("txtCuentaContableNVProvDescripcion");

    var txtCuentaContableNVCli = document.getElementById("txtCuentaContableNVCli");
    var txtCuentaContableNVCliDescripcion = document.getElementById("txtCuentaContableNVCliDescripcion");

    var spnGeneral = document.getElementById("spnGeneral");
    var ddlGeneral = document.getElementById("ddlGeneral");
    var divGeneral = document.getElementById("divGeneral");


    for (var i = 0; i < nCampos; i++) {
        campo = matriz[i][0];
        if (campo == id) {
            hdfCd.value = id;
            idCuenta = id;
            ddlTipoAsiento.value = (matriz[i][2] == "Planilla" ? "X" : (matriz[i][2] == "Provisión" ? "P" : "I"));
            ddlServicio.value = (matriz[i][3] == 0 ? "" : matriz[i][3]);
            ddlMoneda.value = matriz[i][4];
            ddlEspecialidad.value = (matriz[i][8] == 0 ? "" : matriz[i][8]);
            ddlTipoAdmision.value = (matriz[i][5] == 0 ? "" : matriz[i][5]);
            ddlTipoAdmision.onchange();
            ddlTipoPaciente.value = (matriz[i][37] == 0 ? "" : matriz[i][37]);
            /*ddlTipoPaciente.onchange();*/
            ddlTipoPersona.value = (matriz[i][38] == 0 ? "" : matriz[i][38]);
            /*ddlTipoPersona.onchange();*/
            ddlClasificacionMovimiento.value = matriz[i][9];
            ddlComponente.value = (matriz[i][7] == 0 ? "" : matriz[i][7]);
            ddlComponente.onchange();
            if (ddlComponente.value != "") {
                if (ddlComponente.value == "A") {
                    var txtArticulo = document.getElementById("txtArticulo");
                    txtArticulo.value = matriz[i][6];
                }
                else {
                    var txtPrestacion = document.getElementById("txtPrestacion");
                    txtPrestacion.value = matriz[i][6];
                }
                txtPresDescripcion.value = matriz[i][11];
            }
            txtEstado.value = (matriz[i][10] == "A" ? "ACTIVO" : "INACTIVO");
            if (matriz[i][5] == 3) {
                document.getElementById("divConfiguracionPago").style.display = "";
            }

            txtCuentaContableVCosto.value = matriz[i][12];
            txtCuentaContableVProv.value = matriz[i][13];
            txtCuentaContableVCli.value = matriz[i][14];
            txtCuentaContableNVCosto.value = matriz[i][15];
            txtCuentaContableNVProv.value = matriz[i][16];
            txtCuentaContableNVCli.value = matriz[i][17];

            txtCuentaContableVCostoDescripcion.value = matriz[i][18];
            txtCuentaContableVProvDescripcion.value = matriz[i][19];
            txtCuentaContableVCliDescripcion.value = matriz[i][20];
            txtCuentaContableNVCostoDescripcion.value = matriz[i][21];
            txtCuentaContableNVProvDescripcion.value = matriz[i][22];
            txtCuentaContableNVCliDescripcion.value = matriz[i][23];

            var checks = document.getElementsByName("rdn-ConfiguracionPago");
            var contenido = "";
            //var k = 25//obs se quita produccion

            checks[0].checked = ((matriz[i][29] != undefined && matriz[i][29] == "True") ? true : false);
            checks[1].checked = ((matriz[i][26] != undefined && matriz[i][26] == "True") ? true : false);
            checks[2].checked = ((matriz[i][25] != undefined && matriz[i][25] == "True") ? true : false);
            checks[3].checked = ((matriz[i][27] != undefined && matriz[i][27] == "True") ? true : false);
            checks[4].checked = ((matriz[i][28] != undefined && matriz[i][28] == "True") ? true : false);
            checks[5].checked = ((matriz[i][30] != undefined && matriz[i][30] == "True") ? true : false);

            if (matriz[i][31] != "0") {
                divGeneral.style.display = "block";
                spnGeneral.innerHTML = "Concepto";
                llenarCombo(listaConcepto, "ddlGeneral");
                ddlGeneral.value = matriz[i][31];
                ddlGeneral.setAttribute("data-v", "1");
            }
            if (matriz[i][32] != "0") {
                divGeneral.style.display = "block";
                spnGeneral.innerHTML = "Unidad Médica";
                llenarCombo(listaUnidadMedica, "ddlGeneral");
                ddlGeneral.value = matriz[i][32];
                ddlGeneral.setAttribute("data-v", "2");
            }

            abrirPopup('PopupCuentaProvision');
            break;
        }
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

function llenarCombo(lista, nombreCombo, titulo, cabecera) {
    var contenido = "";
    var n = lista.length;
    var valor = "";
    var campos = "";
    if (cabecera == undefined) {
        contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
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
}
function crearChecks(lista) {
    var nRegistros = lista.length;
    var campo;
    var contenido = "";
    for (var x = 0; x < nRegistros; x++) {
        campo = lista[x].split("¦");
        contenido += "<input type='checkbox' name='rdn-ConfiguracionPago' value='";
        contenido += campo[0];
        contenido += "'/>&nbsp;";
        contenido += campo[1];
        if (x != (nRegistros - 1)) {
            contenido += "&nbsp;";
        }
    }
    var divConfiguracionPago = document.getElementById("divConfiguracionPago");
    divConfiguracionPago.innerHTML = contenido;
}