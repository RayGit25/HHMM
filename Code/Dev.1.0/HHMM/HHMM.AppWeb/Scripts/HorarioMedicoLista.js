var listaPrincipal = [];
var listaDetalle = [];
var listaConsultorio = [];
var listaTurno = [];
var listaEspecialidad = [];
var matrizPrincipal = [];
var matrizDetalle = [];
var listaUnidadMedica = [];
var cabecerasPrincipal = ["Código", "Nombres Completos", "CMP", "Estado", "Sucursal", "Especialidad"];
var anchosPrincipal = [12, 40, 12, 15, 15, 24];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5];
var cabecerasDetalle = ["Tipo Registro", "Fecha Inicio", "Fecha Final", "Hora Inicio", "Hora Fin", "Estado"];
var anchosDetalle = [20, 15, 15, 15, 15, 20];
var matrizIndiceDetalle = [2, 7, 8, 9, 10, 11];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceActualBloqueH = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var esBloque = 0;
var excelExportar;
var mensajeValidacion = [];
var urlBase = "";
var ss;
var idHorario = -1;
var Campoeliminar = "";
var FilaAnterior = "";
var cabecerasV = ["", "Nro.", "Sucursal", "Código de Médico", "Nombre de Médico", "Tipo de Registro",
    "Nombre Tipo de Registro", "Fecha Inicio", "Fecha Fin", "Hora Inicio", "Hora Fin",
    "Código de Especialidad", "Especialidad", "Código de Consultorio", "Consultorio",
    "Código de Turno", "Turno", "Código  Tipo de Atención", "Tipo Atención", "Código Unidad Médica", "Unidad Médica", "Observación"];
var anchosV = [50, 30, 80, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 150, 500];
var matrizIndiceV = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var registrosPaginaV = 5;
var paginasBloqueV = 5;
var indiceActualBloqueV = 0;
var indiceOrdenV = 0;
var indiceActualPaginaV = 0;
var matrizValidados = [];
var registrosPaginaE = 5;
var paginasBloqueE = 5;
var indiceActualBloqueE = 0;
var indiceOrdenE = 0;
var indiceActualPaginaE = 0;
var matrizErrados = [];
var sucursal;
var sucursalCombo;
var checkConHorario = -1;
var aMes = ["01¦Enero", "02¦Febrero", "03¦Marzo", "04¦Abril", "05¦Mayo", "06¦Junio", "07¦Julio", "08¦Agosto", "09¦Septiembre", "10¦Octubre", "11¦Noviembre", "12¦Diciembre"];
var matrizSeguridad = [];
var idEspecialidadEditar = "";
var listaMedicoSucursal, matrizFiltroDetalle = [], matrizDoctor = [];
window.onload = function () {
    matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
    if (matrizSeguridad.length > 0) {
        if (((matrizSeguridad[3].split("¦")[2] * 1) != 1)) {
            removeSeguridad("btnExportarMedicos");
        }
        if (((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
            removeSeguridad("spnHistorial");
        }
        //if (((matrizSeguridad[0].split("¦")[2] * 1) != 1)) {
        //	removeSeguridad("btnDoctorGrabar");
        //}
    }
    sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    sucursalCombo = sucursalId;
    sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
    var pos1 = window.location.href.indexOf("Mantenimiento");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/listasHorarioMedico/?ss=" + ss + "&su=" + sucursalId;
    $.ajax(url, "get", listarCombos);
}

//var postDownload = function (url, callBack) {
//    requestServerXHR("get", url, callBack);
//}

var postDownload = function (url, callBack, data) {
    requestServerXHR("post", url, callBack, data);
}

function requestServerXHR(type, url, callBack, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.responseType = (data == null ? "text" : "arraybuffer");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (callBack != null) {
                if (data == null) callBack(xhr.responseText);
                else {
                    if (xhr.response.byteLength == 83)
                        window.parent.parent.location.reload();
                    else
                        callBack(xhr.response);
                }
            }
        }
    }
    if (type == "get") xhr.send();
    else {
        if (data != "") xhr.send(data);
    }
}

function removeSeguridad(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function configuracionInicial() {
    crearTabla("divMedico");
    crearTabla("divHorario");
    configurarOrdenacion();
    configurarControles();
    configurarFiltro();
    configurarBotones();
    crearMatriz(listaPrincipal, false);
    paginar(0, false);
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
}

function EscogerOpcion(valor) {
    var hdfOpc = document.getElementById("hdfOpc");
    var spnHistorial = document.getElementById("spnHistorial");



    if (valor) {
        hdfOpc.value = "1";
        limpiarFormulario(true);
        if (spnHistorial != null) {
            spnHistorial.style.display = "none";
        }
    }
    else {
        hdfOpc.value = "2";
        limpiarFormulario(true);
        if (spnHistorial != null) {
            spnHistorial.style.display = "";
        }
    }
}


function listarEspecilidadHorarioPorId() {
    var hdfMed = document.getElementById("hdfMed").value;
    var url = urlBase + "Mantenimiento/listaEspecialidadPorId/?ss=" + ss + "&id=" + hdfMed;
    $.ajax(url, "get", listarEspecialidadId);
}

function listarCombos(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        listaConsultorio = data[0].split("¯");
        var listaTipoAtencion = data[1].split("¯");
        listaEspecialidad = data[2].split("¯");
        listaTurno = data[3].split("¯");
        listaSucursal = data[4].split("¯");
        listaPrincipal = data[5].split("¯");
        listaUnidadMedica = data[6].split("¯");

        listaMedicoSucursal = data[7].split("¯");


        llenarCombo(listaConsultorio, "ddlConsultorio", "");
        llenarCombo(listaTipoAtencion, "ddlAtencion", "");
        llenarCombo(listaEspecialidad, "ddlEspecialidad", "");
        llenarCombo(listaTurno, "ddlTurno");
        llenarCombo(listaUnidadMedica, "ddlUnidadMed");

        llenarCombo(aMes, "cboMes", null, "");
        var fa = new Date();
        var aAnio = [];
        var inicio = fa.getFullYear() - 10;
        var fin = fa.getFullYear() + 10;
        for (var i = inicio; i < fin; i++) {
            aAnio.push(i + "¦" + i);
        }
        llenarCombo(aAnio, "cboPeriodo", null, "");
        document.getElementById("cboPeriodo").value = fa.getFullYear();
        document.getElementById("cboMes").value = ((fa.getMonth() + 1) > 9 ? (fa.getMonth() + 1) : "0" + (fa.getMonth() + 1));
        crearMatrizPrincipal()
        configuracionInicial();
        var url = urlBase + "Mantenimiento/listarHorarioMedico/?ss=" + ss + "&su=" + sucursalId + "&mes=" + (fa.getMonth() + 1) + "&anio=" + fa.getFullYear();
        $.ajax(url, "get", listarTodo);
    }
}
function crearMatrizPrincipal() {
    matrizDoctor = [];
    var nr = listaPrincipal.length, cmp, ncmp;
    for (var i = 0; i < nr; i += 1) {
        cmp = listaPrincipal[i].split("¦");
        ncmp = cmp.length;
        matrizDoctor[i] = [];
        for (var j = 0; j < ncmp; j += 1) {
            if (cmp[j] == "" || isNaN(cmp[j])) {
                matrizDoctor[i][j] = cmp[j];
            } else {
                matrizDoctor[i][j] = cmp[j] * 1;
            }
        }
    }
}

function listarTodo(rpta) {
    if (rpta != "") {
        listaDetalle = rpta.split("¯");
        listarHorario("", false);
    }
}

function listarHorario(irUltimaPagina, detalle) {
    crearMatriz(listaPrincipal, detalle);
    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, detalle);
    else {
        paginar(0, detalle);
        indiceActualBloque = 0;
        indiceActualBloqueH = 0;
    }
    if (matrizPrincipal.length > 0) {
        var tbPrincipal = document.getElementById("tbPrincipal");
        var nRows = tbPrincipal.rows.length;
        if (nRows > 0 && nRows != null) {
            tbPrincipal.rows[0].click();
        }
    }
}

function EscogerFila(fila, valor) {
    if (valor) {
        var filaSeleccionada = document.getElementById(fila);
        if (filaSeleccionada != null) {
            var hdfMed = document.getElementById("hdfMed");
            hdfMed.value = filaSeleccionada.getAttribute("data-id");
            var FilaPrinc = document.getElementsByName("FilaPrinc");
            for (var x = 0; x < FilaPrinc.length; x++) {
                if (FilaPrinc[x].id == filaSeleccionada.id) {
                    FilaPrinc[x].className += ' Seleccionado';
                    var spnAgregar = document.getElementById("spnAgregar");
                    if (spnAgregar != null) {
                        spnAgregar.style.display = "";
                    }
                    document.getElementById("btncancelar").click();
                }
                else {
                    FilaPrinc[x].className = 'FilaDatos';
                }
            }
            //sucursalCombo = matrizPrincipal[filaSeleccionada.id.split("Fil")[1] * 1][4];
            if (matrizFiltroDetalle.length > 0) {
                document.getElementById("hdfNomMed").value = matrizFiltroDetalle[filaSeleccionada.id.split("Fil")[1] * 1][1];
            } else {
                document.getElementById("hdfNomMed").value = matrizPrincipal[filaSeleccionada.id.split("Fil")[1] * 1][1];

            }
            //document.getElementById("hdfNomMed").value = matrizFiltroDetalle[filaSeleccionada.id.split("Fil")[1] * 1][1];
            //document.getElementById("hdfSucMed").value = matrizPrincipal[filaSeleccionada.id.split("Fil")[1] * 1][4];
            document.getElementById("hdfSucMed").value = sucursalCombo;
            llenarCombo(listaConsultorio, "ddlConsultorio", "");
            llenarCombo(listaTurno, "ddlTurno");
            crearMatriz(listaDetalle, true);
            irUltimaPagina = "";
            if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
            else {
                indiceActualBloqueH = 0;
                paginar(0, true);
                //indiceActualBloque = 0;
            }
        }
    }
    else {
        var filaSeleccionada = document.getElementById(fila.replace("X", "D"));
        var FilaDet = document.getElementsByName("FilaDet");
        var n = FilaDet.length;
        for (var x = 0; x < n; x++) {
            if (FilaDet[x].id == filaSeleccionada.id) {
                FilaDet[x].className += ' Seleccionado';

            }
            else {
                FilaDet[x].className = 'FilaDatos';
            }
        }
    }
}

function listarEspecialidadId(rpta) {
    if (rpta != "") {
        var contenido = "";
        var lista = rpta.split("¯");
        var n = lista.length;
        var valor = "";
        var campos = "";
        if (n == 1) {
            for (var y = 0; y < listaEspecialidad.length; y++) {
                campos = listaEspecialidad[y].split("¦")
                if (lista[0] == campos[0]) {
                    contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
                    break;
                }
            }
        }
        else {
            var campos2 = "";
            contenido = "<option value=''>Todos</option>";
            for (var x = 0; x < n; x++) {
                campos = lista[x].split("¦");
                for (var y = 0; y < listaEspecialidad.length; y++) {
                    campos2 = listaEspecialidad[y].split("¦")
                    if (campos[0] == campos2[0]) {
                        contenido += "<option value='" + campos[0] + "' selected>" + campos2[1] + "</option>";
                        break;
                    }
                }
            }
        }
        if (n == 1) {
            document.getElementById("ddlEspecialidad").innerHTML = contenido;
        }
        else {
            document.getElementById("ddlEspecialidad").innerHTML = contenido;
            document.getElementById("ddlEspecialidad").value = idEspecialidadEditar;
        }
        //if (idEspecialidadEditar != "") {
        //	document.getElementById("ddlEspecialidad").value = idEspecialidadEditar;
        //	idEspecialidadEditar = "";
        //}
    }
    else {
        document.getElementById("ddlEspecialidad").innerHTML = "<option value=''>Todos</option>";
    }
}

function configurarBotones() {
    var fup = document.getElementById("fupArchivo");
    var gifLoad = document.getElementById("gifLoad");
    fup.onchange = function () {
        var btn = document.getElementById("btnGrabarCarga");
        if (this.value != "") {
            btn.style.display = "none";
            gifLoad.style.display = "block";
            var frm = new FormData();
            frm.append("ss", window.parent.document.getElementById("iss").value)
            frm.append("archivo", fup.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open("post", urlBase + "Mantenimiento/leerArchivoExcel");
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    mostrarVistaPrevia(xhr.responseText);
                }
            }
            xhr.send(frm);
        }
        else {
            btn.style.display = "none";
            document.getElementById("divValidados").innerHTML = "";
            document.getElementById("pgValidos").innerHTML = "";
            document.getElementById("divErrados").innerHTML = "";
            document.getElementById("pgErrados").innerHTML = "";
            document.getElementById("numReg1").innerHTML = "";
            document.getElementById("numReg2").innerHTML = "";
            document.getElementById("tab1").click();
        }
    };
    var btnGrabarCarga = document.getElementById("btnGrabarCarga");
    btnGrabarCarga.onclick = function () {
        var nRegistros = matrizValidados.length;
        var contenido = "";
        for (var i = 0; i < nRegistros; i++) {
            if (i != 0) contenido += "¬";
            contenido += matrizValidados[i][0];
            contenido += "¦";
            contenido += matrizValidados[i][1];
            contenido += "¦";
            contenido += matrizValidados[i][2];
            contenido += "¦";
            contenido += matrizValidados[i][4];
            contenido += "¦";
            contenido += matrizValidados[i][6];
            contenido += "¦";
            contenido += matrizValidados[i][7];
            contenido += "¦";
            contenido += matrizValidados[i][8];
            contenido += "¦";
            contenido += matrizValidados[i][9];
            contenido += "¦";
            contenido += matrizValidados[i][10];
            contenido += "¦";
            contenido += matrizValidados[i][12];
            contenido += "¦";
            contenido += matrizValidados[i][14];
            contenido += "¦";
            contenido += matrizValidados[i][16];
            contenido += "¦";
            contenido += matrizValidados[i][18];
            contenido += "¦";
            //contenido += matrizValidados[i][19];
            //contenido += "¦";
            //contenido += matrizValidados[i][20];
            //contenido += "¦";
            contenido += matrizValidados[i][21];
            contenido += "¦";
            contenido += matrizValidados[i][22];
            contenido += "¦";
            contenido += matrizValidados[i][23];
            contenido += "¦";
            contenido += matrizValidados[i][24];
            contenido += "¦";
            contenido += matrizValidados[i][25];
            contenido += "¦";
            contenido += matrizValidados[i][26];
            contenido += "¦";
            contenido += matrizValidados[i][27];
        }
        var frm = new FormData();
        frm.append("ss", window.parent.document.getElementById("iss").value)
        frm.append("lista", contenido);
        var xhr = new XMLHttpRequest();
        xhr.open("post", urlBase + "Mantenimiento/adicionarCargaHorarios");
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                mostrarCargaHorarios(xhr.responseText);
            }
        }
        xhr.send(frm);
        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
        this.onclick = null;
    };
}

function mostrarVistaPrevia(rpta) {
    gifLoad = document.getElementById("gifLoad").style.display = "none";
    document.getElementById("btnGrabarCarga").style.display = "";
    mostrarTabs(document.getElementById("tab1"), 'ulTabsX');
    document.getElementById("numReg1").innerHTML = "";
    document.getElementById("numReg2").innerHTML = "";
    var data = rpta.split("¯");
    document.getElementById("divValidados").innerHTML = "";
    document.getElementById("divErrados").innerHTML = "";
    var lista1 = data[0].split("¬");
    var lista2 = data[1].split("¬");
    console.log(lista1);
    console.log(lista2);
    if (data[0].length > 0) {
        crearTabla("divValidados");
        crearMatriz2("divValidados", lista1);
    }
    else document.getElementById("numReg1").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + data[0].length + "</i>";
    if (data[1].length > 0) {
        crearTabla("divErrados");
        crearMatriz2("divErrados", lista2);
        if (data[0].length == 0) mostrarTabs(document.getElementById("tab2"), 'ulTabsX');
    }
    else document.getElementById("numReg2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + data[1].length + "</i>";
};

function limpiarPopupCarga() {
    document.getElementById("fupArchivo").value = "";
    document.getElementById("btnGrabarCarga").style.display = "none";
    document.getElementById("divValidados").innerHTML = "";
    document.getElementById("pgValidos").innerHTML = "";
    document.getElementById("divErrados").innerHTML = "";
    document.getElementById("pgErrados").innerHTML = "";
    document.getElementById("numReg1").innerHTML = "";
    document.getElementById("numReg2").innerHTML = "";
    document.getElementById("tab1").click();
}

function mostrarCargaHorarios(rpta) {
    var btnGrabarCarga = document.getElementById("btnGrabarCarga");
    btnGrabarCarga.innerHTML = "Grabar";
    btnGrabarCarga.onclick = function () {
        var nRegistros = matrizValidados.length;
        var contenido = "";
        for (var i = 0; i < nRegistros; i++) {
            if (i != 0) contenido += "¬";
            contenido += matrizValidados[i][0];
            contenido += "¦";
            contenido += matrizValidados[i][1];
            contenido += "¦";
            contenido += matrizValidados[i][2];
            contenido += "¦";
            contenido += matrizValidados[i][4];
            contenido += "¦";
            contenido += matrizValidados[i][6];
            contenido += "¦";
            contenido += matrizValidados[i][7];
            contenido += "¦";
            contenido += matrizValidados[i][8];
            contenido += "¦";
            contenido += matrizValidados[i][9];
            contenido += "¦";
            contenido += matrizValidados[i][10];
            contenido += "¦";
            contenido += matrizValidados[i][12];
            contenido += "¦";
            contenido += matrizValidados[i][14];
            contenido += "¦";
            contenido += matrizValidados[i][16];
            contenido += "¦";
            contenido += matrizValidados[i][19];
            contenido += "¦";
            contenido += matrizValidados[i][20];
            contenido += "¦";
            contenido += matrizValidados[i][21];
            contenido += "¦";
            contenido += matrizValidados[i][22];
            contenido += "¦";
            contenido += matrizValidados[i][23];
            contenido += "¦";
            contenido += matrizValidados[i][24];
            contenido += "¦";
            contenido += matrizValidados[i][25];
        }
        var frm = new FormData();
        frm.append("ss", window.parent.document.getElementById("iss").value)
        frm.append("lista", contenido);
        var xhr = new XMLHttpRequest();
        xhr.open("post", urlBase + "Mantenimiento/adicionarCargaHorarios");
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                mostrarCargaHorarios(xhr.responseText);
            }
        }
        xhr.send(frm);
    };
    if (rpta != "") {
        document.getElementById("fupArchivo").value = "";
        document.getElementById("btnGrabarCarga").style.display = "none";
        document.getElementById("divValidados").innerHTML = "";
        document.getElementById("pgValidos").innerHTML = "";
        document.getElementById("divErrados").innerHTML = "";
        document.getElementById("pgErrados").innerHTML = "";
        document.getElementById("numReg1").innerHTML = "";
        document.getElementById("numReg2").innerHTML = "";
        document.getElementById("tab1").click();
        abrirPopup("PopupCarga");
        var url = urlBase + "Mantenimiento/listasHorarioMedico/?ss=" + window.parent.document.getElementById("iss").value + "&su=" + sucursalId;
        $.ajax(url, "get", listarCombos);
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

function configurarOrdenacion(detalle) {
    if (detalle) {
        var enlaces = document.getElementsByClassName("EnlaceD");
        var nEnlaces = enlaces.length;
        var enlace;
        for (var i = 0; i < nEnlaces; i++) {
            enlace = enlaces[i];
            enlace.onclick = function () {
                ordenarMatriz(this, true);
                mostrarMatriz(indiceActualPagina, true);
            }
        }
    }
    else {
        var enlaces = document.getElementsByClassName("Enlace");
        var nEnlaces = enlaces.length;
        var enlace;
        for (var i = 0; i < nEnlaces; i++) {
            enlace = enlaces[i];
            enlace.onclick = function () {
                ordenarMatriz(this, false);
                mostrarMatriz(indiceActualPagina, false);
            }
        }
    }
}

function ordenarMatriz(enlace, detalle) {
    indiceOrden = enlace.getAttribute("data-orden");
    var campo = enlace.innerHTML;
    var posAsc = campo.indexOf("▲");
    var posDesc = campo.indexOf("▼");
    tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
    limpiarEnlaces(detalle);
    if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
    else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
    if (detalle) matrizDetalle.sort(ordenar);
    else matrizPrincipal.sort(ordenar);
}

function ordenar(x, y) {
    var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
    var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
    return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function limpiarEnlaces(detalle) {
    var enlaces
    if (detalle) enlaces = document.getElementsByClassName("EnlaceD")
    enlaces = document.getElementsByClassName("Enlace");
    var nEnlaces = enlaces.length;
    var enlace;
    var campo;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = enlaces[i];
        campo = enlace.innerHTML;
        enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
    }
}

function crearTabla(div) {
    var nCampos = "";
    var contenido = "";
    switch (div) {
        case "divMedico":
            nCampos = cabecerasPrincipal.length;
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            for (var j = 0; j < nCampos; j++) {
                //if (j != 3) {
                contenido += "<th style='width:";
                contenido += anchosPrincipal[j];
                contenido += "%'><span id='spn";
                contenido += j.toString();
                contenido += "' class='Enlace' data-orden='";
                contenido += matrizIndicePrincipal[j];
                contenido += "'>";
                contenido += cabecerasPrincipal[j];
                contenido += "</span><br/>";
                switch (j) {
                    case (3):
                        contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                        break;
                    case (4):
                        var valor;
                        contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                        for (var x = 0; x < listaSucursal.length; x++) {
                            valor = listaSucursal[x].split("¦");
                            contenido += "<option value='";
                            contenido += valor[0];
                            contenido += "'>";
                            contenido += valor[1]
                            contenido += "</option>";
                        }
                        break;
                    default:
                        contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
                        break;
                }

                contenido += "</th>";
                //}
            }
            contenido += "</tr>";
            contenido += "</thead>";
            contenido += "<tbody id='tbPrincipal' class='tabla-FilaCuerpo'>";
            contenido += "</tbody>";
            contenido += "<tfoot>";
            contenido += "<tr><td id='tdPaginasPrincipal' colspan='";
            contenido += (nCampos - 1);
            contenido += "'></td></tr>";
            contenido += "</tfoot>";
            contenido += "</table>";
            break;
        case "divHorario":
            nCampos = cabecerasDetalle.length;
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span id='spnAgregar' class='Icons fa-plus' style='display:none'></span><br/>";
            }
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[4].split("¦")[2] * 1) == 1)) {
                contenido += "<span onclick='abrirPopup(\"PopupCarga\");limpiarPopupCarga()' style='cursor: pointer'><i class='Icons fa-upload'></i></span>";
            }
            contenido += "</th>";
            for (var j = 0; j < nCampos; j++) {
                contenido += "<th style='width:";
                contenido += anchosDetalle[j];
                contenido += "%'><span id='spn";
                contenido += j.toString();
                contenido += "' class='EnlaceD' data-orden='";
                contenido += matrizIndiceDetalle[j];
                contenido += "'>";
                contenido += cabecerasDetalle[j];
                contenido += "</span><br/>";
                switch (j) {
                    case (nCampos - 1):
                        contenido += "<select class='ComboD' name='cabeceraD' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                        break;
                    case 0:
                        contenido += "<select class='ComboD' name='cabeceraD' style='width:90%'><option value=''>TODOS</option><option value='R'>REGULAR</option><option value='E'>EXCEPCIÓN</option><option value='I'>INASISTENCIA</option></select>";
                        break;
                    default:
                        contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
                        break;
                }

                contenido += "</th>";
            }
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
                contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcelHorario' href='#'></a>";
            }
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[5].split("¦")[2] * 1) == 1)) {
                contenido += "<a class='Icons fa-calendar' href='javascript:void(0)' onclick='consultarHorarioMedico()'></a>";
            }
            contenido += "</th>";
            contenido += "</tr>";
            contenido += "</thead>";
            contenido += "<tbody id='tbDetalle' class='tabla-FilaCuerpo'>";
            contenido += "</tbody>";
            contenido += "<tfoot>";
            contenido += "<tr><td id='tdPaginasDetalle' colspan='";
            contenido += (nCampos + 2);
            contenido += "'></td></tr>";
            contenido += "</tfoot>";
            contenido += "</table>";
            break;
        case "divValidados":
            nCampos = cabecerasV.length;
            contenido = "<table class='tabla-general tabla-corta' style='table-layout: fixed;'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            for (var j = 0; j < nCampos; j++) {
                contenido += "<th style='width:";
                contenido += anchosV[j];
                contenido += "px'><span id='spn";
                contenido += j.toString();
                contenido += "' class='Enlace' data-orden='";
                contenido += matrizIndiceV[j];
                contenido += "'>";
                contenido += cabecerasV[j];
                contenido += "</span><br/>";
                contenido += "</th>";
            }
            contenido += "</tr>";
            contenido += "</thead>";
            contenido += "<tbody id='tbValidos' class='tabla-FilaCuerpo'>";
            contenido += "</tbody>";
            contenido += "</table>";
            break;
        case "divErrados":
            nCampos = cabecerasV.length;
            contenido = "<table class='tabla-general tabla-corta' style='table-layout: fixed;'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            for (var j = 0; j < nCampos; j++) {
                contenido += "<th style='width:";
                contenido += anchosV[j];
                contenido += "px'><span id='spn";
                contenido += j.toString();
                contenido += "' class='Enlace' data-orden='";
                contenido += matrizIndiceV[j];
                contenido += "'>";
                contenido += cabecerasV[j];
                contenido += "</span><br/>";
                contenido += "</th>";
            }
            contenido += "</tr>";
            contenido += "</thead>";
            contenido += "<tbody id='tbErrados' class='tabla-FilaCuerpo'>";
            contenido += "</tbody>";
            contenido += "</table>";
            break;
    }
    document.getElementById(div).innerHTML = contenido;
}

function crearMatriz(lista, detalle) {
    var nCampos;
    var campos;
    var x = 0;
    var nRegistros;
    var chkSedes = document.getElementById("chkSedes");
    if (detalle == true) {
        nRegistros = lista.length;
        var hdfMed = document.getElementById("hdfMed").value;
        var hdfSucMed = document.getElementById("hdfSucMed").value;
        var cboPeriodo = document.getElementById("cboPeriodo"),
            cboMes = document.getElementById("cboMes"),
            vffiltro = ((cboPeriodo.value != "" && cboMes.value != "") ? (cboPeriodo.value + cboMes.value) * 1 : 0),
            finicio, ffin, vainicio = 0, vafin = 0;

        matrizDetalle = [];
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("¦");
            if (campos[7] != "" && campos[8] != "" && vffiltro > 0) {
                finicio = campos[7].split(" ")[0].split("/");
                ffin = campos[8].split(" ")[0].split("/");
                vainicio = (finicio[2] + finicio[1]) * 1;
                vafin = (ffin[2] + ffin[1]) * 1;
            }

            if (((hdfMed == "" || campos[1] == hdfMed) && (campos[11] == hdfSucMed)) && ((vffiltro >= vainicio && vffiltro <= vafin))) {
                matrizDetalle[x] = [];
                nCampos = (campos.length + 2);
                for (j = 0; j < nCampos; j++) {
                    switch (j) {
                        case 7:
                            matrizDetalle[x][j] = campos[j].split(" ")[0];
                            break;
                        case 8:
                            matrizDetalle[x][j] = campos[j].split(" ")[0];
                            break;
                        case 9:
                            matrizDetalle[x][j] = campos[7].split(" ")[1];
                            break;
                        case 10:
                            matrizDetalle[x][j] = campos[8].split(" ")[1];
                            break;
                        case 11:
                            matrizDetalle[x][j] = campos[9];
                            break;
                        case 12:
                            matrizDetalle[x][j] = campos[10];
                            break;
                        case 13:
                            matrizDetalle[x][j] = campos[12];
                            break;
                        default:
                            if (isNaN(campos[j])) matrizDetalle[x][j] = campos[j];
                            else matrizDetalle[x][j] = campos[j] * 1;
                            break;
                    }

                }
                x++;
            }
        }
    }
    else {
        nRegistros = lista.length;
        matrizPrincipal = [];
        var nRegHorario = listaDetalle.length, exito = false,
            regHorario;
        var cbo = document.getElementById("ddlSinHorario").value;
        var chkSedes = document.getElementById("chkSedes").checked, obj;
        for (var i = 0; i < nRegistros; i += 1) {
            campos = matrizDoctor[i];//lista[i].split("¦");
            if (checkConHorario != -1 && nRegHorario > 0) {
                exito = false;
                for (var k = 0; k < nRegHorario; k += 1) {
                    regHorario = listaDetalle[k].split("¦");
                    if (regHorario[1] == campos[0]) {
                        exito = true;
                        break;
                    }
                }
                if (checkConHorario == 0 && exito) {
                    exito = true;
                    obj = obtenerSucursal(campos[0], sucursalId, 0);
                    if (obj.existe) {
                        campos[4] = sucursalId;
                        exito = true;
                    } else {
                        exito = false;
                    }
                } else {
                    if (checkConHorario == 1 && !exito) {
                        var obj = obtenerSucursal(campos[0], sucursalId, 1);
                        campos[4] = obj.ids != "" ? obj.ids.substring(0, obj.ids.length - 1) : "";
                        exito = true;
                    } else { exito = false; }
                }
            } else {
                if (nRegHorario == 0 && cbo == "0") {
                    exito = false;
                } else {
                    if (chkSedes) {
                        obj = obtenerSucursal(campos[0], sucursalId, 1);
                        if (obj.ids != "") {
                            campos[4] = obj.ids.substring(0, obj.ids.length - 1);
                            exito = true;
                        } else {
                            exito = false;
                        }
                    } else {
                        obj = obtenerSucursal(campos[0], sucursalId, 0);
                        if (obj.existe) {
                            campos[4] = sucursalId;
                            exito = true;
                        } else {
                            exito = false;
                        }
                    }
                }
            }
            if (exito) {
                if ((chkSedes.checked && campos[4] != "") || (campos[4])) {
                    matrizPrincipal[x] = [];
                    nCampos = campos.length;
                    for (var j = 0; j < nCampos; j += 1) {
                        if (isNaN(campos[j]) || j == 1 || j == 2 || campos[j] == "") matrizPrincipal[x][j] = campos[j];
                        else matrizPrincipal[x][j] = campos[j] * 1;
                    }
                    x++;
                }
            }
        }
    }
}
function obtenerSucursal(idmedico, sucursal, tipo) {

    var nreg = listaMedicoSucursal.length;
    var campos, obj = { existe: false, ids: "" }, camposiguiente, pos = -1;
    pos = binSearch(listaMedicoSucursal, idmedico);
    var i = (pos > -1 ? pos : 0);
    for (i = 0; i < nreg; i++) {
        campos = listaMedicoSucursal[i].split("¦");
        if (tipo == 0) {
            if (idmedico == campos[0] && sucursal == campos[1]) {
                obj.existe = true;
                break;
            }
        } else {
            if (idmedico == campos[0]) {
                obj.ids += campos[1] + ";";
                if (listaMedicoSucursal[i + 1] != undefined) {
                    camposiguiente = listaMedicoSucursal[i + 1].split("¦");
                    if (idmedico != camposiguiente[0]) {
                        break;
                    }
                }
            }
        }
    }
    return obj;
}
function binSearch(arr, data) {
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    var cmp;
    while (lowerBound <= upperBound) {
        var mid = Math.floor((upperBound + lowerBound) / 2);
        cmp = arr[mid].split("¦");
        if ((cmp[0] * 1) < data) {//arr[mid]
            lowerBound = mid + 1;
        }
        else if ((cmp[0] * 1) > data) {
            upperBound = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -1;
}
function crearMatriz2(div, lista) {
    switch (div) {
        case "divValidados":
            var cabecera, exito, nCampos, campos, x = 0, v = 0;
            matrizValidados = [];
            var nRegistros = lista.length;
            var fecha;
            for (var i = 0; i < nRegistros; i++) {
                campos = lista[i].split("¦");
                nCampos = campos.length;
                matrizValidados[x] = [];
                for (var j = 0; j < nCampos; j++) {
                    if (isNaN(campos[j]) || campos[j].trim() == "") matrizValidados[x][j] = campos[j];
                    else matrizValidados[x][j] = campos[j] * 1;
                }
                x++;
            }
            tipoOrdenV = 0;
            indiceOrdenV = 0;
            mostrarPagina(1, 0);
            document.getElementById("numReg1").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + x + "</i>";
            break;
        case "divErrados":
            var cabeceras = document.getElementsByName("cabeceraE");
            var nCabeceras = cabeceras.length;
            var listaCabeceras = [];
            for (var i = 0; i < nCabeceras; i++) {
                listaCabeceras[i] = cabeceras[i].value.toLowerCase();
            }
            var cabecera, exito, nCampos, campos, x = 0, v = 0;
            matrizErrados = [];
            var nRegistros = lista.length;
            var fecha;
            for (var i = 0; i < nRegistros; i++) {
                campos = lista[i].split("¦");
                nCampos = campos.length;
                matrizErrados[x] = [];
                for (var j = 0; j < nCampos; j++) {
                    if (isNaN(campos[j]) || campos[j].trim() == "") matrizErrados[x][j] = campos[j];
                    else matrizErrados[x][j] = campos[j] * 1;
                }
                x++;
            }
            tipoOrdenE = 0;
            indiceOrdenE = 0;
            mostrarPagina(2, 0);
            document.getElementById("numReg2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + x + "</i>";
            break;
    }
}

function mostrarPagina(div, indicePagina) {
    switch (div) {
        case 1:
            var nRegistros = matrizValidados.length;
            var esBloque = (indicePagina < 0);
            if (esBloque) {
                if (esBloque) {
                    var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
                    if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
                    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
                    if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
                    switch (indicePagina) {
                        case -1:
                            indicePagina = 0;
                            indiceActualBloqueV = 0;
                            break;
                        case -2:
                            if (indiceActualBloqueV > 0) {
                                indiceActualBloqueV--;
                                indicePagina = indiceActualBloqueV * paginasBloqueV;
                            }
                            break;
                        case -3:
                            if (indiceActualBloqueV < indiceUltimoBloque) {
                                indiceActualBloqueV++;
                                indicePagina = indiceActualBloqueV * paginasBloqueV;
                            }
                            break;
                        case -4:
                            indicePagina = indiceUltimaPagina;
                            indiceActualBloqueV = indiceUltimoBloque;
                            break;
                    }
                }
            }
            indiceActualPaginaV = indicePagina;
            var nCampos;
            var contenido = "";
            var campos;
            var inicio = indicePagina * registrosPaginaV;
            var fin = inicio + registrosPaginaV;
            for (var i = inicio; i < fin; i++) {
                if (i < nRegistros) {
                    //nCampos = matrizValidados[i].length;
                    nCampos = cabecerasV.length - 1;
                    contenido += "<tr>";
                    contenido += "<td onclick='eliminar(1,";
                    contenido += matrizValidados[i][0];;
                    contenido += ")' style='text-align:center;vertical-align: middle'><span class='Icons fa-trash-o'></span>";
                    contenido += "</td>";
                    for (j = 0; j < (nCampos); j++) {
                        contenido += "<td>";
                        contenido += matrizValidados[i][j];
                        contenido += "</td>";
                    }
                } else break;
            }
            var tabla = document.getElementById("tbValidos");
            if (tabla != null) {
                tabla.innerHTML = contenido;
                configurarPaginacion2(1);
                seleccionarPaginaActual2(1);
            }
            if (esBloque) {
                configurarPaginacion2(1);
            }
            break;
        case 2:
            var nRegistros = matrizErrados.length;
            var esBloque = (indicePagina < 0);
            if (esBloque) {
                if (esBloque) {
                    var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
                    if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
                    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
                    if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
                    switch (indicePagina) {
                        case -1:
                            indicePagina = 0;
                            indiceActualBloqueE = 0;
                            break;
                        case -2:
                            if (indiceActualBloqueE > 0) {
                                indiceActualBloqueE--;
                                indicePagina = indiceActualBloqueE * paginasBloqueE;
                            }
                            break;
                        case -3:
                            if (indiceActualBloqueE < indiceUltimoBloque) {
                                indiceActualBloqueE++;
                                indicePagina = indiceActualBloqueE * paginasBloqueE;
                            }
                            break;
                        case -4:
                            indicePagina = indiceUltimaPagina;
                            indiceActualBloqueE = indiceUltimoBloque;
                            break;
                    }
                }
            }
            indiceActualPaginaE = indicePagina;
            var nCampos;
            var contenido = "";
            var campos;
            var inicio = indicePagina * registrosPaginaE;
            var fin = inicio + registrosPaginaE;
            for (var i = inicio; i < fin; i++) {
                if (i < nRegistros) {
                    //nCampos = matrizErrados[i].length;
                    nCampos = cabecerasV.length - 1;
                    contenido += "<tr>";
                    contenido += "<td onclick='eliminar(2,";
                    contenido += matrizErrados[i][0];;
                    contenido += ")' style='text-align:center;vertical-align: middle'><span class='Icons fa-trash-o'></span>";
                    contenido += "</td>";
                    for (j = 0; j < nCampos; j++) {
                        contenido += "<td>";
                        contenido += matrizErrados[i][j];
                        contenido += "</td>";
                    }
                } else break;
            }
            var tabla = document.getElementById("tbErrados");
            if (tabla != null) {
                tabla.innerHTML = contenido;
                configurarPaginacion2(2);
                seleccionarPaginaActual2(2);
            }
            if (esBloque) {
                configurarPaginacion2(2);
            }
            break;
    }
}

function configurarPaginacion2(div) {
    switch (div) {
        case 1:
            var nRegistros = matrizValidados.length;
            var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaV);
            if (nRegistros % registrosPaginaV == 0) indiceUltimaPagina--;
            var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueV * registrosPaginaV));
            if (nRegistros % (paginasBloqueV * registrosPaginaV) == 0) indiceUltimoBloque--;
            var contenido = "";
            var inicio = indiceActualBloqueV * paginasBloqueV;
            var fin = inicio + paginasBloqueV;
            if (indiceActualBloqueV > 0 && nRegistros > (paginasBloqueV * registrosPaginaV)) {
                contenido += "<a class='pagina' onclick='mostrarPagina(1, -1);' title='Ir al primer grupo de páginas'><<</a>";
                contenido += "<a class='pagina' onclick='mostrarPagina(1, -2);' title='Ir al anterior grupo de páginas'><</a>";
            }
            for (var i = inicio; i < fin; i += 1) {
                if (i <= indiceUltimaPagina) {
                    contenido += "<a class='pagina' onclick='mostrarPagina(1, ";
                    contenido += i;
                    contenido += ");'  title='Ir a la pagina ";
                    contenido += (i + 1).toString();
                    contenido += "' id='aV";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += (i + 1).toString();
                    contenido += "</a>&nbsp;";
                } else break;
            }
            if (indiceActualBloqueV < indiceUltimoBloque && nRegistros > (paginasBloqueV * registrosPaginaV)) {
                contenido += "<a class='pagina' onclick='mostrarPagina(1, -3);' title='Ir al siguiente grupo de páginas'>></a>";
                contenido += "<a class='pagina' onclick='mostrarPagina(1, -4);' title='Ir al último grupo de páginas'>>></a>";
            }
            var tdPagina = document.getElementById("pgValidos");
            if (nRegistros <= registrosPagina) {
                tdPagina.innerHTML = "";
            }
            else {
                tdPagina.innerHTML = contenido;
                seleccionarPaginaActual2(1);
            }
            break;
        case 2:
            var nRegistros = matrizErrados.length;
            var indiceUltimaPagina = Math.floor(nRegistros / registrosPaginaE);
            if (nRegistros % registrosPaginaE == 0) indiceUltimaPagina--;
            var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloqueE * registrosPaginaE));
            if (nRegistros % (paginasBloqueE * registrosPaginaE) == 0) indiceUltimoBloque--;
            var contenido = "";
            var inicio = indiceActualBloqueE * paginasBloqueE;
            var fin = inicio + paginasBloqueE;
            if (indiceActualBloqueE > 0 && nRegistros > (paginasBloqueE * registrosPaginaE)) {
                contenido += "<a class='pagina' onclick='mostrarPagina(2, -1);' title='Ir al primer grupo de páginas'><<</a>";
                contenido += "<a class='pagina' onclick='mostrarPagina(2, -2);' title='Ir al anterior grupo de páginas'><</a>";
            }
            for (var i = inicio; i < fin; i += 1) {
                if (i <= indiceUltimaPagina) {
                    contenido += "<a class='pagina' onclick='mostrarPagina(2, ";
                    contenido += i;
                    contenido += ");'  title='Ir a la pagina ";
                    contenido += (i + 1).toString();
                    contenido += "' id='aE";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += (i + 1).toString();
                    contenido += "</a>&nbsp;";
                } else break;
            }
            if (indiceActualBloqueE < indiceUltimoBloque && nRegistros > (paginasBloqueE * registrosPaginaE)) {
                contenido += "<a class='pagina' onclick='mostrarPagina(2, -3);' title='Ir al siguiente grupo de páginas'>></a>";
                contenido += "<a class='pagina' onclick='mostrarPagina(2, -4);' title='Ir al último grupo de páginas'>>></a>";
            }
            var tdPagina = document.getElementById("pgErrados");
            if (nRegistros <= registrosPagina) {
                tdPagina.innerHTML = "";
            }
            else {
                tdPagina.innerHTML = contenido;
                seleccionarPaginaActual2(2);
            }
            break;
    }
}

function seleccionarPaginaActual2(div) {
    var aPaginas = document.getElementsByClassName("pagina");
    var nPaginas = aPaginas.length;
    for (i = 0; i < nPaginas; i++) {
        aPaginas[i].className = "pagina";
    }
    switch (div) {
        case 1:
            var aPagina = document.getElementById("aV" + indiceActualPaginaV);
            if (aPagina != null) {
                aPagina.className = "pagina seleccionado";
            }
            break;
        case 2:
            var aPagina = document.getElementById("aE" + indiceActualPaginaE);
            if (aPagina != null) {
                aPagina.className = "pagina seleccionado";
            }
            break;
    }
}

function eliminar(div, indice) {
    var nRegistros;
    switch (div) {
        case 1:
            nRegistros = matrizValidados.length;
            for (var i = 0; i < nRegistros; i++) {
                if (matrizValidados[i][0] == indice) {
                    matrizValidados.splice(i, 1);
                    tipoOrdenV = 0;
                    indiceOrdenV = 0;
                    mostrarPagina(1, 0);
                    break;
                }
            }
            break;
        case 2:
            nRegistros = matrizErrados.length;
            for (var i = 0; i < nRegistros; i++) {
                if (matrizErrados[i][0] == indice) {
                    matrizErrados.splice(i, 1);
                    tipoOrdenE = 0;
                    indiceOrdenE = 0;
                    mostrarPagina(2, 0);
                    break;
                }
            }
            break;
    }
}

function configurarFiltro() {
    var textos = document.getElementsByClassName("Texto");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            filtrar(false);
        }
    }
    var combos = document.getElementsByClassName("Combo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            filtrar(false);
        }
    }
    var TextoD = document.getElementsByClassName("TextoD");
    var nTextoD = TextoD.length;
    var textoD;
    for (i = 0; i < nTextoD; i++) {
        textoD = TextoD[i];
        textoD.onkeyup = function (e) {
            filtrar(true);
        }
    }
    var ComboD = document.getElementsByClassName("ComboD");
    var nCombosD = ComboD.length;
    var comboD;
    for (i = 0; i < nCombosD; i++) {
        comboD = ComboD[i];
        comboD.onchange = function (e) {
            filtrar(true);
        }
    }

    var cboPeriodo = document.getElementById("cboPeriodo"),
        cboMes = document.getElementById("cboMes");
    cboPeriodo.onchange = cboMes.onchange = function () {
        if (cboPeriodo.value != "" && cboMes.value != "") {

            var url = urlBase + "Mantenimiento/listarHorarioMedico/?ss=" + ss + "&su=" + sucursalId + "&mes=" + (document.getElementById("cboMes").value) + "&anio=" + document.getElementById("cboPeriodo").value;
            $.ajax(url, "get", listarFiltroDetalle);

            //crearMatriz(listaDetalle, true);
            //irUltimaPagina = "";
            //if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
            //else {
            //	paginar(0, true);
            //	indiceActualBloque = 0;
            //}
        }
    }
}

function filtrar(detalle) {
    if (detalle) {
        var cabeceras = document.getElementsByName("cabeceraD");
        var nCabeceras = cabeceras.length;
        var cabecera;
        var exito;
        matrizDetalle = [];
        var nRegistros = listaDetalle.length;
        var nCampos;
        var contenido = "";
        var campos;
        var campoFiltrado = [];
        var x = 0;
        for (var i = 0; i < nRegistros; i++) {
            campos = listaDetalle[i].split("¦");
            campoFiltrado = [];
            nCampos = campos.length;
            for (var k = 0; k < matrizIndiceDetalle.length; k++) {
                campoFiltrado.push(campos[matrizIndiceDetalle[k]]);
                //campoFiltrado[2] = campos
            }
            campoFiltrado[1] = campos[7].split(" ")[0];
            campoFiltrado[2] = campos[8].split(" ")[0];
            campoFiltrado[3] = campos[7].split(" ")[1];
            campoFiltrado[4] = campos[8].split(" ")[1];
            campoFiltrado[5] = campos[9];
            for (var j = 0; j < nCabeceras; j += 1) {
                exito = true;
                cabecera = cabeceras[j];
                if (cabecera.className == "TextoD") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
                else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
                if (!exito) break;
            }

            if (exito) {
                var hdfMed = document.getElementById("hdfMed").value;
                var hdfSucMed = document.getElementById("hdfSucMed").value;
                if ((hdfMed == "" || campos[1] == hdfMed) && campos[11] == hdfSucMed) {
                    matrizDetalle[x] = [];
                    nCampos = (campos.length + 2);
                    for (j = 0; j < nCampos; j++) {
                        switch (j) {
                            case 7:
                                matrizDetalle[x][j] = campos[j].split(" ")[0];
                                break;
                            case 8:
                                matrizDetalle[x][j] = campos[j].split(" ")[0];
                                break;
                            case 9:
                                matrizDetalle[x][j] = campos[7].split(" ")[1];
                                break;
                            case 10:
                                matrizDetalle[x][j] = campos[8].split(" ")[1];
                                break;
                            case 11:
                                matrizDetalle[x][j] = campos[9];
                                break;
                            case 12:
                                matrizDetalle[x][j] = campos[10];
                                break;
                            case 13:
                                matrizDetalle[x][j] = campos[12];
                                break;
                            default:
                                if (isNaN(campos[j])) matrizDetalle[x][j] = campos[j];
                                else matrizDetalle[x][j] = campos[j] * 1;
                                break;
                        }

                    }
                    x++;
                }
            }
        }
        paginar(0, true);
        indiceActualBloqueH = 0;
        //indiceActualBloque = 0;
    }
    else {
        var cabeceras = document.getElementsByName("cabecera");
        var nCabeceras = cabeceras.length;
        var cabecera;
        var exito = false;
        matrizFiltroDetalle = [];
        var nRegistros = matrizPrincipal.length;
        var nCampos;
        var contenido = "";
        var campos;
        var campoFiltrado = [];
        var x = 0;
        var chkSedes = document.getElementById("chkSedes");
        var nRegHorario = listaDetalle.length, exitoM = false, regHorario;
        var obj;
        for (var i = 0; i < nRegistros; i++) {
            campos = matrizPrincipal[i];
            //campos = listaPrincipal[i].split("¦");
            //campos[4] = (campos[4] == "" ? sucursalId : campos[4]);

            //if (chkSedes.checked) {
            //	obj = obtenerSucursal(campos[0], sucursalId, 1);
            //	campos[4] = obj.ids != "" ? obj.ids.substring(0, obj.ids.length - 1) : "";
            //} else {
            //	obj = obtenerSucursal(campos[0], sucursalId, 0);
            //	if (obj.existe) {
            //		campos[4] = sucursalId;
            //		exitoM = true;
            //	} else {
            //		exitoM = false;
            //	}
            //}

            campoFiltrado = [];
            nCampos = campos.length;

            for (var j = 0; j < nCabeceras; j += 1) {
                exito = true;
                cabecera = cabeceras[j];
                if (cabecera.className == "Texto") exito = exito && (campos[j].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
                else exito = exito && (cabecera.value == "" || campos[j].indexOf(cabecera.value) > -1);
                if (!exito) break;
            }
            //}
            if (exito) {
                if (checkConHorario != -1 && nRegHorario > 0) {
                    exitoM = false;
                    for (var k = 0; k < nRegHorario; k++) {
                        regHorario = listaDetalle[k].split("¦");
                        if (regHorario[1] == campos[0]) {
                            exitoM = true;
                            break;
                        }
                    }
                    if (checkConHorario == 0 && exitoM) {
                        exito = true;
                    } else if (checkConHorario == 1 && !exitoM) {
                        exitoM = true;
                    }
                } else {
                    exitoM = true;
                }
                if (exitoM) {
                    if ((chkSedes.checked && campos[4] != "") || (campos[4] != "")) {
                        matrizFiltroDetalle[x] = [];
                        for (var j = 0; j < nCampos; j++) {
                            if (isNaN(campos[j]) || j == 1 || j == 2 || campos[j] == "") matrizFiltroDetalle[x][j] = campos[j];
                            else matrizFiltroDetalle[x][j] = campos[j] * 1;
                        }
                        x++;
                    }
                }
            }
        }
        var spnAgregar = document.getElementById("spnAgregar");
        if (spnAgregar != null) {
            document.getElementById("spnAgregar").style.display = "none";
        }
        document.getElementById("btncancelar").click();
        paginar(-1, false, true);
        indiceActualBloque = 0;
    }

}

function paginar(indicePagina, detalle, filtro) {
    var nRegistros
    if (detalle) {
        nRegistros = matrizDetalle.length;
        registrosPagina = 5;
    }
    else {
        nRegistros = (filtro ? matrizFiltroDetalle.length : matrizPrincipal.length);
        registrosPagina = 8;
    }
    var esBloque = (indicePagina < 0);
    if (esBloque) {
        var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
        if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
        var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
        if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
        switch (indicePagina) {
            case -1:
                indicePagina = 0;
                if (detalle) {
                    indiceActualBloqueH = 0;
                } else {
                    indiceActualBloque = 0;
                }
                break;
            case -2:
                if (detalle) {
                    if (indiceActualBloqueH > 0) {
                        indiceActualBloqueH--;
                        indicePagina = indiceActualBloqueH * paginasBloque;
                    }
                } else {
                    if (indiceActualBloque > 0) {
                        indiceActualBloque--;
                        indicePagina = indiceActualBloque * paginasBloque;
                    }
                }
                break;
            case -3:
                if (detalle) {
                    if (indiceActualBloqueH < indiceUltimoBloque) {
                        indiceActualBloqueH++;
                        indicePagina = indiceActualBloqueH * paginasBloque;
                    }
                } else {
                    if (indiceActualBloque < indiceUltimoBloque) {
                        indiceActualBloque++;
                        indicePagina = indiceActualBloque * paginasBloque;
                    }
                }
                break;
            case -4:
                if (detalle) {
                    indicePagina = indiceUltimaPagina;
                    indiceActualBloqueH = indiceUltimoBloque;
                } else {
                    indicePagina = indiceUltimaPagina;
                    indiceActualBloque = indiceUltimoBloque;
                }
                break;
        }
    }
    indiceActualPagina = indicePagina;
    mostrarMatriz(indicePagina, detalle, filtro);
}

function mostrarMatriz(indicePagina, detalle, filtro) {
    indiceActualPagina = indicePagina;
    var contenido = "";
    Campoeliminar = "";
    var n;
    var nCampos;
    var inicio;
    var fin;
    if (detalle) {
        registrosPagina = 5;
        limpiarFormulario(false);
        n = matrizDetalle.length;
        if (n > 0) {
            nCampos = matrizDetalle[0].length;
            inicio = indicePagina * registrosPagina;
            fin = inicio + registrosPagina;
            for (var i = inicio; i < fin; i++) {
                if (i < n) {
                    contenido += "<tr class='FilaDatos' name='FilaDet' id='FilD";
                    contenido += i;
                    contenido += "'>";
                    contenido += "<td style='text-align:center'>";
                    if (matrizDetalle[i][11] == "A") {
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons fa-edit' id='FilX";
                            contenido += i;
                            contenido += "' onclick='EscogerOpcion(false);EscogerFila(this.id,false);mostrarHorario(";
                            contenido += matrizDetalle[i][0];
                            contenido += ");listarEspecilidadHorarioPorId()'></span>";
                        }
                    }
                    contenido += "</td>";
                    for (var j = 2; j < (nCampos - 3); j++) {
                        if (j < 3 || j > 6) {
                            contenido += "<td id='FilD";
                            //contenido += i.toString() + j.toString();
                            contenido += i.toString();
                            contenido += "' onclick='EscogerFila(this.id,false);mostrarHorario(";
                            contenido += matrizDetalle[i][0];
                            contenido += ");mostrardesabilitado();listarEspecilidadHorarioPorId();'>";
                            switch (j) {
                                case 2:
                                    contenido += (matrizDetalle[i][j] == "R" ? "Regular" : (matrizDetalle[i][j] == "E" ? "Excepción" : "Inasistencia"));
                                    break;
                                case 9:
                                    contenido += matrizDetalle[i][j].split(":").slice(0, -1).join(":");
                                    break;
                                case 10:
                                    contenido += matrizDetalle[i][j].split(":").slice(0, -1).join(":");
                                    break;
                                case 11:
                                    contenido += (matrizDetalle[i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                    break;
                                default:
                                    contenido += matrizDetalle[i][j];
                                    break;
                            }
                            contenido += "</td>";
                        }
                    }
                    contenido += "<td style='text-align:center'>";
                    if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                        contenido += "<span class='Icons ";
                        contenido += (matrizDetalle[i][11] == "A" ? "fa-trash-o" : "fa-check");
                        contenido += "' onclick='abrirPopup(";
                        contenido += '"PopupEstado"';
                        contenido += ");Campoeliminar=";
                        contenido += i;
                        contenido += ";'";
                        contenido += "></span>";
                    }
                    contenido += "</td></tr>";
                }
                else break;
            }
        }
        else {
            var nCabeceras = cabecerasDetalle.length;
            contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
            contenido += (nCabeceras + 2).toString();
            contenido += "'>No hay datos</td></tr>";
        }
        document.getElementById("tbDetalle").innerHTML = contenido;
        crearPaginas(true, "tdPaginasDetalle");
        if (esBloque) {
            crearPaginas(true, "tdPaginasDetalle");
        }
    }
    else {
        registrosPagina = 8;
        n = (filtro ? matrizFiltroDetalle.length : matrizPrincipal.length);
        if (n > 0) {
            nCampos = (filtro ? matrizFiltroDetalle[0].length : matrizPrincipal[0].length);
            inicio = indicePagina * registrosPagina;
            fin = inicio + registrosPagina;
            var valor;
            var matrizfiltro = [];
            for (var i = inicio; i < fin; i++) {
                if (i < n) {
                    (filtro ? (matrizfiltro = matrizFiltroDetalle[i]) : (matrizfiltro = matrizPrincipal[i]))
                    contenido += "<tr class='FilaDatos' name='FilaPrinc' onclick='EscogerFila(";
                    contenido += "this.id,true);' id='Fil";
                    contenido += i;
                    contenido += "' data-id='"
                    contenido += matrizfiltro[0];
                    contenido += "'>";
                    for (var j = 0; j < nCampos; j++) {
                        //if (j != 4 && j != 5) {
                        switch (j) {
                            case 3:
                                contenido += "<td>";
                                contenido += (matrizfiltro[j] == "A" ? "ACTIVO" : "INACTIVO");
                                break;
                            case (4):
                                contenido += "<td>";
                                for (var x = 0; x < listaSucursal.length; x++) {
                                    valor = listaSucursal[x].split("¦");
                                    if (matrizfiltro[4].indexOf(valor[0]) > -1) {
                                        contenido += valor[1] + " -";
                                    }
                                }
                                contenido = contenido.substring(0, contenido.length - 1);
                                break;
                            case 0:
                                contenido += "<td style='text-align:right'>";
                                contenido += matrizfiltro[j];
                                break;
                            default:
                                contenido += "<td>";
                                contenido += matrizfiltro[j];
                                break;
                        }
                        contenido += "</td>";
                        //}
                    }
                    contenido += "</tr>";
                }
                else break;
            }

        }
        else {
            var nCabeceras = cabecerasPrincipal.length;
            contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
            contenido += (nCabeceras + 1).toString();
            contenido += "'>No hay datos</td></tr>";
            var contenido2 = "";
            var nCabeceras2 = cabecerasDetalle.length;
            contenido2 += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
            contenido2 += (nCabeceras2 + 2).toString();
            contenido2 += "'>No hay datos</td></tr>";
            document.getElementById("tbDetalle").innerHTML = contenido2;
            document.getElementById("tdPaginasDetalle").innerHTML = "";
            var spnAgregar = document.getElementById("spnAgregar")
            if (spnAgregar != null) {
                spnAgregar.style.display = "none";
            }
        }
        document.getElementById("tbPrincipal").innerHTML = contenido;
        crearPaginas(false, "tdPaginasPrincipal", filtro);
        if (esBloque) {
            crearPaginas(false, "tdPaginasPrincipal", filtro);
        }
        //if (matrizPrincipal.length > 0) {
        //    var tbPrincipal = document.getElementById("tbPrincipal");
        //    var nRows = tbPrincipal.rows.length;
        //    if (nRows > 0 && nRows != null) {
        //        tbPrincipal.rows[0].click();
        //    }
        //}
    }

}

function crearPaginas(detalle, tdpagina, filtro) {
    var nRegistros;
    if (detalle) {
        nRegistros = matrizDetalle.length;
        registrosPagina = 5;
    }
    else {
        nRegistros = (filtro ? matrizFiltroDetalle.length : matrizPrincipal.length);
        registrosPagina = 8;
    }
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
    if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = (detalle ? indiceActualBloqueH : indiceActualBloque) * paginasBloque;
    var fin = inicio + paginasBloque;
    if ((detalle ? indiceActualBloqueH : indiceActualBloque) > 0 && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-1," + detalle + "," + filtro + ");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-2," + detalle + "," + filtro + ");' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginar(";
            contenido += i;
            contenido += ",";
            contenido += detalle;
            contenido += ",";
            contenido += filtro;
            contenido += ");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            if (detalle) contenido += "' id='ad";
            else contenido += "' id='a";
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if ((detalle ? indiceActualBloqueH : indiceActualBloque) < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-3," + detalle + "," + filtro + ");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-4," + detalle + "," + filtro + ");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= registrosPagina) {
        document.getElementById(tdpagina).innerHTML = "";
    }
    else {
        document.getElementById(tdpagina).innerHTML = contenido;
        seleccionarPaginaActual(detalle);
    }
}

function mostrarHorario(id) {
    var nCampos = matrizDetalle.length;
    var campo = "";
    var txtFechaInicio = document.getElementById("txtFechaInicio");
    var txtFechaFin = document.getElementById("txtFechaFin");
    var txtHoraInicio = document.getElementById("txtHoraInicio");
    var txtHoraFin = document.getElementById("txtHoraFin");
    var ddlTipoRegistro = document.getElementById("ddlTipoRegistro");
    var ddlEspecialidad = document.getElementById("ddlEspecialidad");
    var ddlConsultorio = document.getElementById("ddlConsultorio");
    var ddlTurno = document.getElementById("ddlTurno");
    var ddlAtencion = document.getElementById("ddlAtencion");
    var txtEstado = document.getElementById("txtEstado");
    var ddlUnidadMed = document.getElementById("ddlUnidadMed");
    var hdfCd = document.getElementById("hdfCd");
    for (var i = 0; i < nCampos; i++) {
        campo = matrizDetalle[i][0];
        if (campo == id) {
            hdfCd.value = id;
            idHorario = id;
            txtFechaInicio.value = matrizDetalle[i][7];
            txtFechaFin.value = matrizDetalle[i][8];
            txtHoraInicio.value = matrizDetalle[i][9].split(":").slice(0, -1).join(":");
            txtHoraFin.value = matrizDetalle[i][10].split(":").slice(0, -1).join(":");
            txtEstado.value = (matrizDetalle[i][11] == "A" ? "ACTIVO" : "INACTIVO");
            ddlTipoRegistro.value = matrizDetalle[i][2];

            ddlConsultorio.value = ((matrizDetalle[i][4] * 1) == 0 ? "" : matrizDetalle[i][4]);
            ddlTurno.value = matrizDetalle[i][5];
            ddlAtencion.value = ((matrizDetalle[i][6] * 1) == 0 ? "" : matrizDetalle[i][6]);
            var dias = matrizDetalle[i][12].split("|");
            var checksDia = document.getElementsByName("rdnDia");
            for (var z = 0; z < checksDia.length; z++) {
                checksDia[z].checked = (dias[z] == "1" ? true : false);
            }
            ddlUnidadMed.value = matrizDetalle[i][13] == "0" ? "" : matrizDetalle[i][13];

            ddlEspecialidad.value = ((matrizDetalle[i][3] * 1) == 0 ? "" : matrizDetalle[i][3]);
            idEspecialidadEditar = ((matrizDetalle[i][3] * 1) == 0 ? "" : matrizDetalle[i][3]);
            break;
        }
    }
}

function seleccionarPaginaActual(detalle) {
    var valor;
    if (detalle) valor = "ad";
    else valor = "a";
    var aPagina = document.getElementById(valor + indiceActualPagina);
    if (aPagina != null) {
        aPagina.className += " seleccionado";
    }
}

function configurarControles() {
    var spnFormatoExc = document.getElementById("spnFormatoExc");
    spnFormatoExc.onclick = function () {
        /*var hojas = "Estructura|Sucursal|Especialidad|Consultorio|Turno|TipoAtencion|UnidadMedica"; 1|CSF|0|0|21|21|0|0*/
        var hojas = "Estructura|Sucursal|Especialidad|Consultorio|Turno|TipoAtencion|UnidadMedica";
        var nombre = "Formatos de Horarios.xlsx";
        var sp = "uspFormatoHonorarios";
        var strDatos = "1|CSF|0|0|21|21|0|0";
        var ss = window.parent.document.getElementById("iss").value;
        var url = urlBase + "Proceso/listarReporteHorarios/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre + "&sp=" + sp;
        postDownload(url, descargaExcelXLSx, strDatos);
    }

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
    var txtFechaInicio = document.getElementById("txtFechaInicio");
    txtFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    var txtFechaFin = document.getElementById("txtFechaFin");
    txtFechaFin.DatePickerX.init({
        mondayFirst: true
    });

    var txtHoraInicio = document.getElementById("txtHoraInicio");
    txtHoraInicio.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var txtHoraFin = document.getElementById("txtHoraFin");
    txtHoraFin.onkeyup = function (event) {
        formatoHora(this, event);
    }

    //var divPrincipal = document.getElementById("divPrincipal");
    //divPrincipal.onmouseover = function () {
    //	var txtFechaInicio = document.getElementById("txtFechaInicio");
    //	var txtFechaFin = document.getElementById("txtFechaFin");
    //	var hdfOpc = document.getElementById("hdfOpc").value;
    //	if (hdfOpc == "1") {
    //		if (txtFechaInicio.value != "" && txtFechaFin.value != "" && esFecha(txtFechaInicio.value) && esFecha(txtFechaFin.value) && txtFechaInicio.value == txtFechaFin.value) {
    //			var fecha = txtFechaInicio.value.split('/');
    //			var FechaD = new Date(fecha[2], fecha[1] - 1, fecha[0]);
    //			var arrayFechas = [6, 0, 1, 2, 3, 4, 5]
    //			var Dia = arrayFechas[FechaD.getDay()];
    //			var rdnDia = document.getElementsByName("rdnDia");
    //			for (var x = 0; x < rdnDia.length; x++) {
    //				if (x == Dia) {
    //					rdnDia[x].checked = true;
    //					break;
    //				}
    //			}
    //		}
    //		//else {
    //		//	if (txtFechaInicio.value == "" || txtFechaFin.value != "" || esFecha(txtFechaInicio.value) || esFecha(txtFechaFin.value)) {
    //		//		var rdnDia = document.getElementsByName("rdnDia");
    //		//		for (var x = 0; x < rdnDia.length; x++) {
    //		//			rdnDia[x].checked = false;
    //		//		}
    //		//	}
    //		//}
    //	}
    //}

    var btncancelar = document.getElementById("btncancelar");
    btncancelar.onclick = function () {
        var FilaDet = document.getElementsByName("FilaDet");
        for (var x = 0; x < FilaDet.length; x++) {
            FilaDet[x].className = 'FilaDatos';
        }
        limpiarFormulario(false);
        var spnHistorial = document.getElementById("spnHistorial")
        if (spnHistorial != null) {
            spnHistorial.style.display = "none";
        }
    }

    var spnAgregar = document.getElementById("spnAgregar");
    if (spnAgregar != null) {
        spnAgregar.onclick = function () {
            var FilaDet = document.getElementsByName("FilaDet");
            for (var x = 0; x < FilaDet.length; x++) {
                FilaDet[x].className = 'FilaDatos';
            }
            EscogerOpcion(true);
            idEspecialidadEditar = '';
            listarEspecilidadHorarioPorId();
        }
    }

    var btngrabar = document.getElementById("btngrabar");
    btngrabar.onclick = function () {
        if (validarHorario()) {
            var hdfOpc = document.getElementById("hdfOpc").value;
            var hdfMed = document.getElementById("hdfMed").value;
            var ddlTipoRegistro = document.getElementById("ddlTipoRegistro").value;

            var txtFechaInicio = document.getElementById("txtFechaInicio").value;
            var txtHoraInicio = document.getElementById("txtHoraInicio").value;

            var FechaHoraInicio = txtFechaInicio + " " + txtHoraInicio;

            var txtFechaFin = document.getElementById("txtFechaFin").value;
            var txtHoraFin = document.getElementById("txtHoraFin").value;

            var FechaHoraFin = txtFechaFin + " " + txtHoraFin;

            var ddlTurno = document.getElementById("ddlTurno").value;
            var ddlAtencion = document.getElementById("ddlAtencion").value;
            var ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            var ddlConsultorio = document.getElementById("ddlConsultorio").value;
            var ddlUnidadMed = document.getElementById("ddlUnidadMed").value;
            var cboPeriodo = document.getElementById("cboPeriodo").value;
            var cboMes = document.getElementById("cboMes").value * 1;
            var dias = "";
            var checksDia = document.getElementsByName("rdnDia");
            for (var z = 0; z < checksDia.length; z++) {
                dias += checksDia[z].checked.toString();
                if (z < (checksDia.length - 1)) {
                    dias += "|";
                }
            }
            var strDatos = hdfOpc + "|" + hdfMed + "|" + ddlTipoRegistro + "|" + FechaHoraInicio + "|" + FechaHoraFin + "|" + ddlTurno + "|" + ddlAtencion + "|" + ddlEspecialidad + "|" + ddlConsultorio + "|" + dias + "|" + ddlUnidadMed + "|" + cboMes + "|" + cboPeriodo;
            if (hdfOpc == 2) {
                strDatos += "|" + idHorario;
            }
            var ss = window.parent.document.getElementById("iss").value;
            var url = urlBase + "Mantenimiento/grabarHorarioMedico/?ss=" + ss + "&su=" + sucursalCombo + "&supr=" + sucursalId;
            $.ajax(url, "post", mostrarGrabar, strDatos);
            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }

    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        var valor1 = matrizDetalle[Campoeliminar][0];
        var valor2 = matrizDetalle[Campoeliminar][11];
        anular(valor1, valor2);
    }

    var chkSedes = document.getElementById("chkSedes");
    chkSedes.onclick = function () {
        crearMatriz(listaPrincipal, false);
        paginar(-1, false);
        indiceActualBloque = 0;

    }
    var ddlSinHorario = document.getElementById("ddlSinHorario");
    ddlSinHorario.onchange = function () {
        checkConHorario = this.value * 1;
        crearMatriz(listaPrincipal, false);
        paginar(-1, false);
        indiceActualBloque = 0;

        document.getElementById("tbDetalle").innerHTML = "";
        document.getElementById("tdPaginasDetalle").innerHTML = "";
        document.getElementById("btncancelar").click();

    }

    var ddlTurno = document.getElementById("ddlTurno");
    ddlTurno.onchange = function () {
        if (this.value != "") {
            var opcion = this.options[this.selectedIndex].text;
            var datos = opcion.split("|")[1].toString().trim();
            var hora = datos.split("-");
            document.getElementById("txtHoraInicio").value = hora[0];
            document.getElementById("txtHoraFin").value = hora[1];
        }
        else {
            document.getElementById("txtHoraInicio").value = "";
            document.getElementById("txtHoraFin").value = "";
        }
    }

    var btnExportarMedicos = document.getElementById("btnExportarMedicos");
    if (btnExportarMedicos != null) {
        btnExportarMedicos.onclick = function () {
            var nRegistros = matrizPrincipal.length;
            if (nRegistros > 0) {
                exportacion(false);
                var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
                this.download = "Medicos.xls";
                this.href = window.URL.createObjectURL(formBlob);
            }
        }
    }

    var aExportarExcelHorario = document.getElementById("aExportarExcelHorario");
    if (aExportarExcelHorario != null) {
        aExportarExcelHorario.onclick = function () {
            var nRegistros = matrizDetalle.length;
            if (nRegistros > 0) {
                exportacion(true);
                var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
                this.download = "Horarios.xls";
                this.href = window.URL.createObjectURL(formBlob);
            }
        }
    }
}

function descargaExcelXLSx(rpta) {
    if (rpta != null) {
        var nombre = "Formatos de Horarios.xlsx";

        var a = document.createElement("a");
        var formBlob = new Blob([rpta], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        a.download = nombre;
        a.href = window.URL.createObjectURL(formBlob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        mostraralerta("No se ha generado el archivo");
    }
}


function anular(id, estado) {
    var cboPeriodo = document.getElementById("cboPeriodo").value;
    var cboMes = document.getElementById("cboMes").value * 1;

    var ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/anularHorarioMedico/?ss=" + ss + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A") + "&su=" + sucursalId + "&mes=" + cboMes + "&anio=" + cboPeriodo;
    $.ajax(url, "get", mostrarGrabar);
    abrirPopup('PopupEstado');

}

function mostrarGrabar(rpta) {
    var btngrabar = document.getElementById("btngrabar");
    btngrabar.innerHTML = "Grabar";
    btngrabar.onclick = function () {
        if (validarHorario()) {
            var hdfOpc = document.getElementById("hdfOpc").value;
            var hdfMed = document.getElementById("hdfMed").value;
            var ddlTipoRegistro = document.getElementById("ddlTipoRegistro").value;
            var txtFechaInicio = document.getElementById("txtFechaInicio").value;
            var txtHoraInicio = document.getElementById("txtHoraInicio").value;
            var FechaHoraInicio = txtFechaInicio + " " + txtHoraInicio;
            var txtFechaFin = document.getElementById("txtFechaFin").value;
            var txtHoraFin = document.getElementById("txtHoraFin").value;
            var FechaHoraFin = txtFechaFin + " " + txtHoraFin;
            var ddlTurno = document.getElementById("ddlTurno").value;
            var ddlAtencion = document.getElementById("ddlAtencion").value;
            var ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            var ddlConsultorio = document.getElementById("ddlConsultorio").value;
            var ddlUnidadMed = document.getElementById("ddlUnidadMed").value;
            var cboPeriodo = document.getElementById("cboPeriodo").value;
            var cboMes = document.getElementById("cboMes").value * 1;
            var dias = "";
            var checksDia = document.getElementsByName("rdnDia");
            for (var z = 0; z < checksDia.length; z++) {
                dias += checksDia[z].checked.toString();
                if (z < (checksDia.length - 1)) {
                    dias += "|";
                }
            }
            var strDatos = hdfOpc + "|" + hdfMed + "|" + ddlTipoRegistro + "|" + FechaHoraInicio + "|" + FechaHoraFin + "|" + ddlTurno + "|" + ddlAtencion + "|" + ddlEspecialidad + "|" + ddlConsultorio + "|" + dias + "|" + ddlUnidadMed + "|" + cboMes + "|" + cboPeriodo;
            if (hdfOpc == 2) {
                strDatos += "|" + idHorario;
            }
            var ss = window.parent.document.getElementById("iss").value;
            var url = urlBase + "Mantenimiento/grabarHorarioMedico/?ss=" + ss + "&su=" + sucursalCombo + "&supr=" + sucursalId;
            $.ajax(url, "post", mostrarGrabar, strDatos);
            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }
    }
    if (rpta != "") {
        var data = rpta.split("¬");
        if (data.length > 1) {
            switch (data[1]) {
                case "1":
                    var cabecera = document.getElementsByName("cabeceraD");
                    for (var x = 0; x < cabecera.length; x++) {
                        cabecera[x].value = "";
                    }
                    listaDetalle = [];
                    listaDetalle = data[0].split("¯");
                    crearMatriz(listaDetalle, true);
                    irUltimaPagina = "";
                    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
                    else {
                        paginar(0, true);
                        indiceActualBloque = 0;
                    }
                    mostraralerta("Se ha añadido un nuevo registro");
                    break;
                case "2":
                    var spnHistorial = document.getElementById("spnHistorial");
                    if (spnHistorial != null) {
                        spnHistorial.style.display = "none";
                    }
                    var cabecera = document.getElementsByName("cabeceraD");
                    for (var x = 0; x < cabecera.length; x++) {
                        cabecera[x].value = "";
                    }
                    listaDetalle = [];
                    listaDetalle = data[0].split("¯");
                    crearMatriz(listaDetalle, true);
                    irUltimaPagina = "";
                    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
                    else {
                        paginar(0, true);
                        indiceActualBloque = 0;
                    }
                    mostraralerta("Se ha actualizado un registro");
                    break;
                case "3":
                    var cabecera = document.getElementsByName("cabeceraD");
                    for (var x = 0; x < cabecera.length; x++) {
                        cabecera[x].value = "";
                    }
                    listaDetalle = [];
                    listaDetalle = data[0].split("¯");
                    crearMatriz(listaDetalle, true);
                    irUltimaPagina = "";
                    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
                    else {
                        paginar(0, true);
                        indiceActualBloque = 0;
                    }
                    mostraralerta("Se ha actualizado el estado de un registro");
                    break;
            }
        }
        else {
            switch (data[0]) {
                case "-1": mostraralerta("El rango de fechas coincide con otro registro");
                    break;
                case "-2": mostraralerta("Inasistencia no puede aplicarse sobre un Día/Hora no programado");
                    break;
                case "-3": mostraralerta("Excepción no puede aplicarse sobre un día no programado");
                    break;
                case "-4": mostraralerta("Día(s) no corresponde(n) a la fechas ingresadas");
                    break;
                case "-5": mostraralerta("El horario no puede ser modificado, pues pertenece a una provisión contabilizada");
                    break;
                case "-6": mostraralerta("Periodo ingresado ya forma parte de un proceso de provisión");
                    break;
            }
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
    if (nombreCombo != "ddlConsultorio" && nombreCombo != "ddlTurno") {
        for (var x = 0; x < n; x++) {
            campos = lista[x].split("¦");
            contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
        }
    }
    else {
        for (var x = 0; x < n; x++) {
            campos = lista[x].split("¦");
            if (campos[2] == sucursalCombo) {
                contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
            }
        }
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}

function limpiarFormulario(opcion) {
    var calendario1 = document.getElementsByClassName("dpx-clear")[0];
    var calendario2 = document.getElementsByClassName("dpx-clear")[1];
    calendario1.click();
    calendario2.click();
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
                if (limpiar[y].nodeName == "SELECT") {
                    limpiar[y].selectedIndex = "0";
                }
                else {
                    limpiar[y].value = "";
                }
            }
            if (opcion) {
                limpiar[y].readOnly = false;
                limpiar[y].disabled = false;
                limpiar[y].className = "";
                limpiar[y].style.pointerEvents = "auto";
            }
            else {
                limpiar[y].readOnly = true;
                limpiar[y].disabled = true;
                limpiar[y].className = "lectura";
                limpiar[y].style.pointerEvents = "none";
            }
        }
    }
    var divChecksDia = document.getElementById("divChecksDia");
    if (divChecksDia.className.indexOf("error") > -1) {
        divChecksDia.className = "form-grupo fila";
    }

    var checksDia = document.getElementsByName("rdnDia");
    for (var z = 0; z < checksDia.length; z++) {
        checksDia[z].checked = false;
        if (opcion) {
            checksDia[z].disabled = false;
        }
        else {
            checksDia[z].disabled = true;
        }
    }

    var divBotones = document.getElementById("divBotones");
    if (opcion) {
        var txtFechaInicio = document.getElementById("txtFechaInicio");
        txtFechaInicio.focus();
        divBotones.style.display = "";
    }
    else {
        divBotones.style.display = "none";
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

function mostrardesabilitado() {
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
    }
    var limpiar = document.getElementsByName("limpiar");
    for (var y = 0; y < limpiar.length; y++) {
        limpiar[y].readOnly = true;
        limpiar[y].disabled = true;
        limpiar[y].className = "lectura";
        limpiar[y].style.pointerEvents = "none";

    }
    var divBotones = document.getElementById("divBotones");
    divBotones.style.display = "none";
    var spnHistorial = document.getElementById("spnHistorial");
    if (spnHistorial != null) {
        spnHistorial.style.display = "";
    }
    var checksDia = document.getElementsByName("rdnDia");
    for (var z = 0; z < checksDia.length; z++) {
        checksDia[z].disabled = true;
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

function formatoHora(objeto, event) {
    var v = objeto.value;
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if (v.length < 3 && v.length > 0) {
        if (isNaN(v)) {
            objeto.value = v.substring(0, 1);
            return false;
        }
        else {
            if (keyCode != 8 && keyCode != 37 && keyCode != 39 && keyCode != 35 && keyCode != 36) {
                if ((v.charAt(0) * 1) < 3) {
                    if (v.match(/[0-2]{1}?\d/g) !== null) {
                        if ((objeto.value * 1) < 24) {
                            objeto.value = v + ':';
                            return false;
                        }
                        else {
                            objeto.value = v.charAt(0);
                            return false;
                        }
                    }
                }
                else {
                    objeto.value = '';
                    return false;
                }
            }
        }
    }
    else {
        if (v.indexOf(":") == -1) {
            objeto.value = v.substring(0, 2);
            return false;
        }
        else {
            if ((v.split(":")[1].charAt(0) * 1) < 6) {
                if (keyCode != 8 && keyCode != 37 && keyCode != 39 && keyCode != 35 && keyCode != 36) {
                    if (v.match(/[0-5]{1}?\d/g) !== null) {
                        if (v.length == 5 && isNaN(v.charAt(4))) {
                            objeto.value = v.substring(0, v.length - 1);
                            return false;
                        } else {
                            objeto.value = v;
                            return false;
                        }
                    }
                }
            }
            else {
                objeto.value = v.split(":")[0] + ":";
                return false;
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

function validarHora(Tex, Mensaje, Obligatorio) {
    var Texto = document.getElementById(Tex);
    if (Texto != null) {
        if (Obligatorio) {
            if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
                return 'Ingrese ' + Mensaje.toLowerCase();
            }
        }
        if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
            if (!esHora(Texto.value)) {
                return 'La ' + Mensaje + ' es inválida';
            }
        }

        var txtFechaInicio = document.getElementById("txtFechaInicio").value;
        var txtFechaFin = document.getElementById("txtFechaFin").value;
        var Inicio;
        var Fin;
        if (Texto.id == "txtHoraInicio") {
            var txtHoraFin = document.getElementById("txtHoraFin");
            if ((txtFechaInicio == txtFechaFin) || (txtFechaInicio == "" && txtFechaFin != "") || (txtFechaFin == "" && txtFechaInicio != "")) {
                Inicio = HoraUTC(Texto.value);
                Fin = HoraUTC(txtHoraFin.value);
            }
            else {
                Inicio = FechaHoraUTC(Texto.value, txtFechaInicio);
                Fin = FechaHoraUTC(txtHoraFin.value, txtFechaFin);
            }
            if (Inicio > Fin) {
                return 'La hora de inicio no puede ser mayor a la de fin';
            }

            if (Inicio == Fin) {
                return 'La hora de inicio no puede ser igual a la de fin';
            }
        }
        else {
            var txtHoraInicio = document.getElementById("txtHoraInicio");
            if ((txtFechaInicio == txtFechaFin) || (txtFechaInicio == "" && txtFechaFin != "") || (txtFechaFin == "" && txtFechaInicio != "")) {
                Fin = HoraUTC(Texto.value);
                Inicio = HoraUTC(txtHoraInicio.value);
            } else {
                Fin = FechaHoraUTC(Texto.value, txtFechaFin);
                Inicio = FechaHoraUTC(txtHoraInicio.value, txtFechaInicio);
            }
            if (Fin < Inicio) {
                return 'La hora de fin no puede ser menor a la de inicio';
            }

            if (Fin == Inicio) {
                return 'La hora de fin no puede ser igual a la de inicio';
            }
        }
    }
    return "";
}


function validarHorario() {
    var txtFechaInicio = document.getElementById("txtFechaInicio");
    var txtFechaFin = document.getElementById("txtFechaFin");
    var txtHoraInicio = document.getElementById("txtHoraInicio");
    var txtHoraFin = document.getElementById("txtHoraFin");
    var ddlConsultorio = document.getElementById("ddlConsultorio");
    var ddlTurno = document.getElementById("ddlTurno");
    var ddlAtencion = document.getElementById("ddlAtencion");
    var ddlUnidadMed = document.getElementById("ddlUnidadMed");
    mensajeValidacion = [];
    var validar = document.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }
    var mensajeFechaInicio = validarFecha(txtFechaInicio.id, "fecha inicio", true);
    if (mensajeFechaInicio != "") {
        mensajeValidacion[txtFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
        txtFechaInicio.className += " error";
    }
    var mensajeFechaFin = validarFecha(txtFechaFin.id, "fecha fin", true);
    if (mensajeFechaFin != "") {
        mensajeValidacion[txtFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
        txtFechaFin.className += " error";
    }
    var mensajeHoraInicio = validarHora(txtHoraInicio.id, "hora de inicio", true);
    if (mensajeHoraInicio != "") {
        mensajeValidacion[txtHoraInicio.getAttribute("data-secuencia")] = mensajeHoraInicio;
        txtHoraInicio.className += " error";
    }
    var mensajeHoraFin = validarHora(txtHoraFin.id, "hora de fin", true);
    if (mensajeHoraFin != "") {
        mensajeValidacion[txtHoraFin.getAttribute("data-secuencia")] = mensajeHoraFin;
        txtHoraFin.className += " error";
    }
    var mensajeTurno = validarCombo(ddlTurno.id, "turno", true);
    if (mensajeTurno != "") {
        mensajeValidacion[ddlTurno.getAttribute("data-secuencia")] = mensajeTurno;
        ddlTurno.className += " error";
    }
    var mensajeUnidadMedica = validarCombo(ddlUnidadMed.id, "Unidad Médica", true);
    if (mensajeUnidadMedica != "") {
        mensajeValidacion[ddlUnidadMed.getAttribute("data-secuencia")] = mensajeUnidadMedica;
        ddlUnidadMed.className += " error";
    }
    var c = 0;
    var checksDia = document.getElementsByName("rdnDia");
    for (var z = 0; z < checksDia.length; z++) {
        if (checksDia[z].checked) {
            c = 1;
            break;
        }
    }
    var divChecksDia = document.getElementById("divChecksDia");
    if (c == 0) {
        divChecksDia.className += " error";
    }
    else {
        divChecksDia.className = "form-grupo fila";
    }

    if (mensajeValidacion.length > 0 || c == 0) {
        return false;
    } else {
        return true;
    }

}

function fechaUTC(fecha) {
    var fechaArray = fecha.trim().split('/');
    return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
    //return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
}

function HoraUTC(Tiempo) {
    var Ts = Tiempo.split(':');
    return Date.UTC(1970, 0, 1, Ts[0], Ts[1], 0) / 1000;
}

function FechaHoraUTC(Tiempo, fecha) {
    var fechaArray = fecha.trim().split('/');
    var Ts = Tiempo.split(':');
    return Date.UTC(fechaArray[2], (fechaArray[1] - 1), fechaArray[0], Ts[0], Ts[1], 0) / 1000;
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


function esHora(Cadena) {
    if (Cadena.toLowerCase().indexOf(":") > -1) {
        var hora = Cadena.split(":");
        if (hora.length > 2) {
            return false;
        }
        else {
            if (isNaN(hora[0]) || isNaN(hora[1]) || hora[0] == "" || hora[1] == "") return false
            else return true;
        }
    }
    return false;
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

function crearCabeceraExportar(opcion) {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
    if (opcion) {
        var seleccionado = "";
        var FilaDatos = document.getElementsByClassName("FilaDatos");
        for (var z = 0; z < FilaDatos.length; z++) {
            if (FilaDatos[z].className.indexOf("Seleccionado") > -1) {
                seleccionado = FilaDatos[z].getElementsByTagName("TD")[1].innerHTML;
            }
        }
        cabecera += "<tr><td style='width:150px'>Sucursal</td><td>";
        cabecera += sucursal;
        cabecera += "</td></tr><tr><td style='width:150px'>Médico</td><td colspan='3'>";
        cabecera += seleccionado;
        cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
        cabecera += "<td style='width: 150px' align='center'>Tipo de Registro</td>";
        cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
        cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
        cabecera += "<td style='width: 100px' align='center'>Hora Inicio</td>";
        cabecera += "<td style='width: 100px' align='center'>Hora Fin</td>";
        cabecera += "<td style='width: 60px' align='center'>Estado</td>";
    }
    else {
        cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
        cabecera += "<td style='width: 100px' align='center'>Código</td>";
        cabecera += "<td style='width: 300px' align='center'>Médico</td>";
        cabecera += "<td style='width: 100px' align='center'>CMP</td>";
        cabecera += "<td style='width: 60px' align='center'>Estado</td>";
        cabecera += "<td style='width: 80px' align='center'>Sucursal Id</td>";
        cabecera += "<td style='width: 80px' align='center'>Tiene Horario</td>";
    }
    cabecera += "</tr>";
    return cabecera;
}

function exportacion(opcion) {
    var nRegistros
    var nCampos
    var contenido = [];
    excelExportar = crearCabeceraExportar(opcion);
    if (opcion) {
        var nRegistros = matrizDetalle.length;
        var nCampos = matrizDetalle[0].length;
        for (i = 0; i < nRegistros; i++) {
            contenido.push("<tr>");
            for (j = 2; j < (nCampos - 3); j++) {
                if (j < 3 || j > 6) {
                    switch (j) {
                        case 2:
                            contenido.push("<td>" + (matrizDetalle[i][j] == "R" ? "Regular" : (matrizDetalle[i][j] == "E" ? "Excepción" : "Inasistencia")) + "</td>");
                            break;
                        case 9:
                            contenido.push("<td>" + (matrizDetalle[i][j].split(":").slice(0, -1).join(":") + "</td>"));
                            break;
                        case 10:
                            contenido.push("<td>" + (matrizDetalle[i][j].split(":").slice(0, -1).join(":") + "</td>"));
                            break;
                        case 11:
                            contenido.push("<td>" + (matrizDetalle[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>");
                            break;
                        default:
                            contenido.push("<td>" + matrizDetalle[i][j] + "</td>");
                            break;
                    }
                }
            }
            contenido.push("</tr>");
        }
    }
    else {
        var nRegistros = matrizPrincipal.length;
        var nCampos = matrizPrincipal[0].length;
        for (i = 0; i < nRegistros; i++) {
            contenido.push("<tr>");
            for (j = 0; j < nCampos; j++) {
                switch (j) {
                    case (nCampos - 3):
                        contenido.push("<td>" + (matrizPrincipal[i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>");
                        break;
                    case (nCampos - 1):
                        contenido.push("<td>" + (buscarHorario(matrizPrincipal[i][0]) ? "SI" : "NO") + "</td>");
                        break;
                    case 0:
                        contenido.push("<td style='text-align:right'>" + matrizPrincipal[i][j] + "</td>");
                        break;
                    default:
                        contenido.push("<td>" + matrizPrincipal[i][j] + "</td>");
                        break;
                }

            }
            contenido.push("</tr>");
        }
    }
    excelExportar += contenido.join("") + "</table></html>";
}

function consultarHorarioMedico(medico) {
    var hdfSucMed = document.getElementById("hdfSucMed").value;
    var hdfSeg = document.getElementById("hdfSeg").value;
    var cboPeriodo = document.getElementById("cboPeriodo");
    var anio = cboPeriodo.options[cboPeriodo.selectedIndex].text;
    var mes = document.getElementById("cboMes").value * 1;
    window.location.href = urlBase + "Control/ConsultaHorariosMedico/?ss=" + ss + "&medicoId=" + document.getElementById("hdfMed").value + "&fecha=" + (mes + "¦" + anio) + "&no=" + document.getElementById("hdfNomMed").value + "&su=" + hdfSucMed + "&idSeg=" + hdfSeg;
}
function buscarHorario(id) {
    var nRegHorario = listaDetalle.length, exito = false,
        regHorario;

    for (var k = 0; k < nRegHorario; k++) {
        regHorario = listaDetalle[k].split("¦");
        if (regHorario[1] == id) {
            exito = true;
            break;
        }
    }
    return exito;
}
function listarFiltroDetalle(rpta) {
    var cbo = document.getElementById("ddlSinHorario");

    if (rpta != "") {
        var idMedico = document.getElementById("hdfMed").value;
        limpiarfiltro();
        var valorFiltro = cbo.value
        indiceActualBloque = 0;
        indiceActualPagina = 0;
        cbo.value = "-1";
        //cbo.onchange();
        listaDetalle = rpta.split("¯");
        listarHorario("", false);

        cbo.value = valorFiltro;
        cbo.onchange();
        if (idMedico != "") {
            var pos = buscarMedico(idMedico * 1);
            if (pos != -1) {
                var registrosPagina = 8;
                var indicePagina = Math.floor(pos / registrosPagina);
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
                mostrarMatriz(indicePagina, false);
                var id = "Fil" + pos;
                EscogerFila(id, true);

            } else {
                document.getElementById("tbDetalle").innerHTML = "<tr class='FilaDatos'><td style='text-align:center' colspan='8'>No hay datos</td></tr>";
                document.getElementById("tdPaginasDetalle").innerHTML = "";
            }
        }
    } else {
        mostraralerta("No se encontraron resultados");
        document.getElementById("tbDetalle").innerHTML = "<tr class='FilaDatos'><td style='text-align:center' colspan='8'>No hay datos</td></tr>";
        document.getElementById("tdPaginasDetalle").innerHTML = "";
        listaDetalle = [];
        cbo.onchange();
        indiceActualBloque = 0, indiceActualBloqueH = 0, indiceActualPagina = 0;

    }
}
function limpiarfiltro() {

    var cabecera = document.getElementsByName("cabecera");
    var n = cabecera.length;
    for (var i = 0; i < n; i++) {
        cabecera[i].value = "";
    }
}

function buscarMedico(id) {
    var n = matrizPrincipal.length, pos = -1;
    if (n > 0) {
        var reg;
        for (var i = 0; i < n; i++) {
            reg = matrizPrincipal[i];
            if (id == reg[0]) {
                pos = i;
                break;
            }
        }
    }
    return pos;
}