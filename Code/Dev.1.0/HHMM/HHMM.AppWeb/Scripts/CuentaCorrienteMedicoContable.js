var $ = {
    ajax: function (url, type, success, text) {
        requestServer(url, type, success, text);
    }
}

function requestServer(url, type, success, text) {
    var divLoading = window.parent.parent.document.getElementById("_loading");
    divLoading.classList.remove('hide');
    window.parent.parent.document.getElementById("Espera_Texto").classList.add("hide");
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            divLoading.classList.add('hide');
            window.parent.parent.document.getElementById("Espera_Texto").classList.remove("hide");
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
var postDownload = function (url, callBack, data) {
    requestServerXHR("post", url, callBack, data);
}

function requestServerXHR(type, url, callBack, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.responseType = (data == null ? "text" : "arraybuffer");
    window.parent.parent.document.getElementById("Espera_Texto").classList.add("hide");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            window.parent.parent.document.getElementById("Espera_Texto").classList.remove("hide");
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

var sucursalId = "", sucursal = "", urlBase = "", ss = "", opcionfiltro = -1;
let sepRegistros = "¬", sepCampos = "¦", sepListas = "¯";
let dragSrcEl = null;
let namespace = "CuentaCorriente";
$[namespace] = {};
$scope = $[namespace];
let $isIE = false;
let mensajeValidacion;
let mapCollapsable = new Map();

window.onload = function () {
    sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
    sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
    urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
    ss = window.parent.parent.document.getElementById("iss").value;
    //configuracionInicial();
    url = urlBase + "Control/CuentaCorrienteMedicoContable_Listas/?ss=" + ss + "&su=" + sucursalId;
    $.ajax(url, "get", listasReporte);
}

function listasReporte(rpta) {
    if (rpta) {
        let listas = rpta.split(sepListas);
        let lstsucursal = (listas[0] ? listas[0].split(sepRegistros) : []);
        let lstTipoAdmision = (listas[1] ? listas[1].split(sepRegistros) : []);
        let lstEstadoPlanilla = (listas[2] ? listas[2].split(sepRegistros) : []);
        let lstTipoRegistro = (listas[3] ? listas[3].split(sepRegistros) : []);
        let lstMes = (listas[4] ? listas[4].split(sepRegistros) : []);

        llenarCombo(lstMes, "cboPeriodo", "0,1", "Seleccione");
        llenarCombo(lstMes, "cboPeriodoInicio", "0,1", "Seleccione");
        llenarCombo(lstMes, "cboPeriodoFin", "0,1", "Seleccione");
        llenarCombo(lstsucursal, "ddlSucursal", "0,1", "Todos");
        llenarCombo(lstTipoAdmision, "cboTipoAdmision", "0,1", "Todos");
        llenarCombo(lstTipoRegistro, "cboTipoRegistro", "0,1", "Todos");
        llenarCombo(lstEstadoPlanilla, "cboEstadoPlanilla", "0,1", "Todos");

        configurarControles();

    }
}


function configurarControles() {

    let checks = document.getElementsByClassName("js-check");
    let nchecks = checks.length;
    for (let i = 0; i < nchecks; i++) {
        checks[i].onclick = function () {
            let tar = this.getAttribute("data-t").split(",");
            let ischecked = this.checked;
            let n = tar.length, el;
            for (let z = 0; z < n; z++) {
                el = document.getElementById(tar[z]);
                if (el) {
                    el.value = "";
                    if (ischecked) {
                        el.removeAttribute("disabled");
                        if (el.classList.contains("inp-search")) {
                            el.nextElementSibling.style.pointerEvents = "auto";
                            el.setAttribute("data-v", "");
                        }

                    } else {
                        el.setAttribute("disabled", true);
                        if (el.classList.contains("inp-search")) {
                            el.nextElementSibling.style.pointerEvents = "none";
                            el.setAttribute("data-v", "");
                        }

                    }
                }
            }
        }
    }

    let btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.onclick = function () {

        if (validarBusqueda()) {

            let els = document.getElementsByClassName("js-frmFiltro");
            let n = els.length;
            let cadena = [],el;
            for (let i = 0; i < n; i++) {

                el = els[i];
                if (el.classList.contains("inp-search")) {
                    cadena.push(el.getAttribute("data-v"));
                } else {
                    cadena.push(el.value);
                }
 
            }

            let url = urlBase + "Control/CuentaCorrienteMedicoContable_Listar/?ss=" + ss;
            $.ajax(url, "post", mostrarListar, cadena.join(sepCampos));

        }
    }

    let btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.onclick = function () {

        let checks = document.getElementsByClassName("js-check");
        let nchecks = checks.length;
        for (let i = 0; i < nchecks; i++) {
            checks[i].checked = false;
            checks[i].onclick();

        }
        mensajeValidacion = [];

        var validar = document.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].classList.contains("error")) {
                validar[x].classList.remove("error");
            }
        }
    }
    var spnEmpresa = document.getElementById("spnEmpresa");
    spnEmpresa.onclick = function () {
        var ifrEmpresa = document.getElementById("ifrEmpresa");
        if (ifrEmpresa.innerHTML == "") {
            ifrEmpresa.innerHTML = "<iframe loading='lazy' style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupEmpresa");
    }

    let spnEmpresaBorrar = document.getElementById("spnEmpresaBorrar");
    spnEmpresaBorrar.onclick = function () {
        document.getElementById("txtEmpresa").value = "";
        document.getElementById("txtEmpresa").setAttribute("data-v","");
    }

    var hdfEmpresa = document.getElementById("hdfEmpresa");
    hdfEmpresa.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            this.value = datos[0];
            var txtEmpresa = document.getElementById("txtEmpresa");
            txtEmpresa.value = datos[1];
            txtEmpresa.setAttribute("data-v", datos[0]);
        }
    }

    let spnConfigurar = document.getElementById("spnConfigurar");
    spnConfigurar.onclick = function () {

        let url = urlBase + "Control/CuentaCorrienteMedicoContableConfiguracion_Listar/?ss=" + ss ;
        $.ajax(url, "get", mostrarConfiguracion);
    }


    let btnConfigurarColumnas = document.getElementById("btnConfigurarColumnas");
    btnConfigurarColumnas.onclick = function () {
        let divConfiguraCampos = document.getElementById("divConfiguraCampos");
        let divConfiguraEtiqueta = document.getElementById("divConfiguraEtiqueta");
        let btnAgruparEstados = document.getElementById("btnAgruparEstados");

        divConfiguraCampos.classList.remove("hide");
        divConfiguraEtiqueta.classList.add("hide");
        btnAgruparEstados.style.backgroundColor = "gray";
        this.style.backgroundColor = "";
    }

    let btnAgruparEstados = document.getElementById("btnAgruparEstados");
    btnAgruparEstados.onclick = function () {

        let divConfiguraCampos = document.getElementById("divConfiguraCampos");
        let divConfiguraEtiqueta = document.getElementById("divConfiguraEtiqueta");
        let btnConfigurarColumnas = document.getElementById("btnConfigurarColumnas");

        divConfiguraCampos.classList.add("hide");
        divConfiguraEtiqueta.classList.remove("hide");
        btnConfigurarColumnas.style.backgroundColor = "gray";
        this.style.backgroundColor = "";

    }

    let btnCerrarConfiguracion = document.getElementById("btnCerrarConfiguracion");
    let btnCerrarAgrupacion = document.getElementById("btnCerrarAgrupacion");
    btnCerrarAgrupacion.onclick = btnCerrarConfiguracion.onclick = function () {
        abrirPopup('PopupConfiguracion');
    }

    let btnGrabarAgrupacion = document.getElementById("btnGrabarAgrupacion");
    btnGrabarAgrupacion.onclick = function () {
        let fields = document.getElementsByClassName("js-estado");
        let n = fields.length,field;
        let cadena = [];
        for (let i = 0; i < n; i++) {
            field = fields[i];
            cadena.push(field.getAttribute("data-id") + sepCampos + field.getAttribute("data-tipo") + sepCampos + field.value);
        }

        let url = urlBase + "Control/CuentaCorrienteMedicoContableAgrupacionEstado_Grabar/?ss=" + ss;
        $.ajax(url, "post", mostrarAgrupacionRpta, cadena.join(sepRegistros));

    }

    let btnGrabarConfiguracion = document.getElementById("btnGrabarConfiguracion"),
        btnGrabarConfiguracion2 = document.getElementById("btnGrabarConfiguracion2"),
        btnGrabarConfiguracion3 = document.getElementById("btnGrabarConfiguracion3"),
        btnGrabarConfiguracion4 = document.getElementById("btnGrabarConfiguracion4"),
        btnGrabarConfiguracion5 = document.getElementById("btnGrabarConfiguracion5");

    btnGrabarConfiguracion.onclick = btnGrabarConfiguracion2.onclick = btnGrabarConfiguracion3.onclick = btnGrabarConfiguracion4.onclick = btnGrabarConfiguracion5.onclick = function () {

        let tabla = this.getAttribute("data-tabla");
        let id = tabla.substr(-1);
        let tb = document.getElementById(tabla);
        let nr = tb.rows.length;
        let tr,cadena=[];
        for (let i = 0; i < nr; i++) {
            tr = tb.rows[i];
            cadena.push(tr.getAttribute("data-id") + sepCampos + (i + 1) + sepCampos + tr.cells[0].textContent + sepCampos + (tr.cells[1].firstElementChild.checked ? 1 : 0 )+ sepCampos + tr.getAttribute("data-orden"));
        }

        let url = urlBase + "Control/CuentaCorrienteMedicoContableConfiguracionColumna_Grabar/?ss=" + ss;
        $.ajax(url, "post", mostrarConfiguracionRpta, id+sepListas+cadena.join(sepRegistros));

    }




}

function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this.parentNode.parentNode;

    e.dataTransfer.effectAllowed = 'move';
    //e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
}

function handleDragEnter(e) {

    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
        let el = this;
        if (this.nodeName == "TR") {
            el = this;
        } else if (this.parentNode.nodeName == "TR") {
            el = this.parentNode;
        } else if (this.parentNode.parentNode.nodeName == "TR") {
            el = this.parentNode.parentNode;
        }
        dragSrcEl.style.opacity = '1';
        let t = "afterend"
        if (dragSrcEl.rowIndex > this.rowIndex) {
            t = "beforebegin"
        } else {
            t = "afterend"
        }
        this.insertAdjacentElement(t, dragSrcEl);
        // this.parentNode.removeChild(dragSrcEl);
    }

    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';

    let drag = document.getElementsByClassName("drag");
    let n = drag.length;
    for (let i = 0; i < n; i++) {
        drag[i].style.opacity = '1';
        drag[i].parentNode.parentNode.classList.remove('over');

    }

}

function recargarIframe(objeto) {
    var iframe = document.getElementById(objeto).firstChild;
    var txt = iframe.contentWindow.document.getElementsByClassName('Texto');
    for (var x = 0; x < txt.length; x++) {
        if (txt[x].nodeName == "SELECT") {
            txt[x].selectedIndex = "0";
        }
        else {
            txt[x].value = "";
        }
    }
    iframe.contentWindow.filtrar();
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
            TipoAlerta = listaTabs[i].getAttribute("data-tipo");
        }
        else {
            if (listaTabs[i].className.indexOf("bloqueado") > -1) listaTabs[i].className = "tab-link bloqueado";
            else listaTabs[i].className = "tab-link";
            contenido.className = "tab-content";
        }
    }
    var datoTab = actual.getAttribute("data-tab");
    //switch (datoTab) {
    //    case "tabx-1":
    //        var TextoReporte = document.getElementsByClassName("TextoReporte1");
    //        for (var x = 0; x < TextoReporte.length; x++) {
    //            TextoReporte[x].value = "";
    //        }
    //        var lista = recogerValores("Reporte1");
    //        filtrar("Reporte1", lista);
    //        break;
    //    case "tabx-2":
    //        var TextoReporte = document.getElementsByClassName("TextoReporte2");
    //        for (var x = 0; x < TextoReporte.length; x++) {
    //            TextoReporte[x].value = "";
    //        }
    //        var lista = recogerValores("Reporte2");
    //        filtrar("Reporte2", lista);
    //        break;
    //    case "tabx-3":
    //        var TextoReporte = document.getElementsByClassName("TextoReporte3");
    //        for (var x = 0; x < TextoReporte.length; x++) {
    //            TextoReporte[x].value = "";
    //        }
    //        var lista = recogerValores("Reporte3");
    //        filtrar("Reporte3", lista);
    //        break;
    //    case "tabx-4":
    //        var TextoReporte = document.getElementsByClassName("TextoReporte4");
    //        for (var x = 0; x < TextoReporte.length; x++) {
    //            TextoReporte[x].value = "";
    //        }
    //        var lista = recogerValores("Reporte4");
    //        filtrar("Reporte4", lista);
    //        break;
    //    case "tabx-5":
    //        var TextoReporte = document.getElementsByClassName("TextoReporte5");
    //        for (var x = 0; x < TextoReporte.length; x++) {
    //            TextoReporte[x].value = "";
    //        }
    //        var lista = recogerValores("Reporte5");
    //        filtrar("Reporte5", lista);
    //        break;
    //}
}

function abrirPopup(objeto) {
    var popup = document.getElementById(objeto);
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
}

function llenarCombo(lista, nombreCombo, indice, titulo, separador) {

    var contenido = "", n = lista.length, campos;
    var pos = indice.split(",");
    if (n > 0) {
        if (titulo != undefined && titulo.trim() != "") {
            contenido = "<option value=''>" + titulo + "</option>";
        }

        for (var x = 0; x < n; x++) {

            campos = (separador != undefined && separador != "" ? lista[x].split(separador) : lista[x].split("¦"));
            contenido += "<option value='" + campos[pos[0]] + "'>" + campos[pos[1]] + "</option>";
        }

        var cbo = document.getElementById(nombreCombo);
        if (cbo != null) {
            cbo.innerHTML = contenido;
        }
    }
}


$scope.fnExExportaExcel = function (row, index, tabla, expo, poscol) {
    var c = [];

    c.push('<span');
    c.push(' class="fa-18 Icons fa-file-excel-o"  onclick="$[\'' + namespace + '\'].fnExportarExcel(\'');
    c.push(index);
    c.push('\',\'');
    c.push(tabla);
    c.push('\',\'');
    c.push("1");
    c.push('\');"></span>' );

    return c.join('');
}

$scope.fnExEstiloFila = function (row, index, tabla, expo, poscol) {
    let estilo = "";

    if (row[row.length-1]!="") {
        estilo= "style='font-weight:bold'";
    } 
    return estilo;
}

function htmExportarCabecera(tabla) {
    var c = [];

    c.push('<span');
    c.push(' class="fa-18 Icons fa-file-excel-o"  onclick="$[\'' + namespace + '\'].fnExportarExcel(\'');
    c.push(0);
    c.push('\',\'');
    c.push(tabla);
    c.push('\',\'');
    c.push("-1");
    c.push('\');"></span>' );

    return c.join('');
}

$scope.fnExColapsableRow = function (row, index, tabla, expo, poscol) {
    var c = [];
    if (poscol != undefined && row[poscol] != "") {
        c.push('<span');
        c.push(' class="fa-18 Icons ' + ($["map" + tabla].has(row[poscol]) ? "fa-plus-square-o" : "fa-minus-square-o") + '"  onclick="$[\'' + namespace + '\'].fnRndEventoCollapsable(\'');
        c.push(index);
        c.push('\',\'');
        c.push(poscol);
        c.push('\',\'');
        c.push(tabla);
        c.push('\');"></span>&nbsp;' + row[poscol]);
    }
    return c.join('');
}

$[namespace].fnRndEventoCollapsable = (fila, col, tabla) => {
    fila = fila * 1, col = col * 1;
    let matriz = $["jtse-table" + tabla].Matrix;
    let valor = matriz[fila][col];
    if ($["map" + tabla].has(valor)) {
        let v = $["map" + tabla].get(valor);
        let n = v.length, c = fila + 1;
        for (let i = 0; i < n; i++) {
            $["jtse-table" + tabla].Matrix.splice(c, 0, v[i]);
            c++;
        }
        $["map" + tabla].delete(valor);
    } else {
        let n = matriz.length, c = 0
        for (let i = fila + 1; i < n; i++) {
            if (matriz[i][col] != "" && matriz[i][col] != valor) { break; }
            c++;
        }
        if (c > 0) {
            if (col > 0 && (fila + c) < n - 1) { c--; }
            $["map" + tabla].set(valor, $["jtse-table" + tabla].Matrix.slice(fila + 1, (fila + 1 + c)));
            $["jtse-table" + tabla].Matrix.splice(fila + 1, c);
        }
    }
    $$table(tabla).showTable($["jtse-table" + tabla].IndexCurrentPage);
}

$[namespace].fnExportarExcel = (fila, tabla,esCabecera) => {

    fila = fila*1;
    let row = $["jtse-table" + tabla].Matrix[fila];
    let headers = $["jtse-table" + tabla].Headers;
    let ip = $["jtse-table" + tabla].CollapsableIndex.IndexCodigo * 1;


    var divLoading = window.parent.parent.document.getElementById("_loading");
    divLoading.classList.remove('hide');

    let filtro = document.getElementsByClassName("js-frmFiltro");

    let imoneda = headers.indexOf("Mon.");
    let icc = headers.indexOf("Cuenta Costo");
    let icp = headers.indexOf("Cuenta Proveedor");
    let idcc = headers.indexOf("ID Doc Contable");
    let tdp = headers.indexOf("Tipo Documento Pago");
    let ndp = headers.indexOf("Numero Documento Pago");
    let sid = headers.indexOf("Sucursal Id");
    let gpl = headers.indexOf("Estado Planilla");
    let tre = headers.indexOf("Tipo Registro");

    let esCol = (row[row.length - 1] != "" ? true : false);


    let filaData =[];
    if (esCol) {
        let matriz = $["jtse-table" + tabla].Data;
        let n = matriz.length;
        let inicio = fila + 1;
        while (inicio < n) {
            if (matriz[inicio][idcc] != "") {
                filaData = matriz[inicio];
                break;
            }
            inicio++;
        }

    }

    let valores =  row[row.length - 1].split(";");
    let campoAgrupado = (row[row.length - 1]!=""? valores[0] * 1:"-1");


    let idSucursal = "", idEmpresa = "", idMedico = "", idTipoAdmision = "",TipoRegistro="";

    if (esCol) {
        valores.shift();

        if (["Sucursal", "Sucursal Id"].indexOf(headers[campoAgrupado]) > -1) {
            idSucursal = valores[sid];
        }

        if (["Empresa"].indexOf(headers[campoAgrupado]) > -1) {
            idEmpresa = valores[20];
        }
        if (["Médico"].indexOf(headers[campoAgrupado]) > -1) {
            idMedico = valores[19];
        }
        if (["Tipo Admisión"].indexOf(headers[campoAgrupado]) > -1) {
            idTipoAdmision = valores[21];
        }
        if (["Tipo Registro"].indexOf(headers[campoAgrupado]) > -1) {
            TipoRegistro = valores[22];
        }
    }


    let data = (esCabecera == "-1" ? "" : (esCol ? idSucursal : row[sid]) )  + sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol? "" : row[18]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol? "" : row[17]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol ? idEmpresa : row[20]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol ? idMedico : row[19]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol ? idTipoAdmision : row[21]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol ? TipoRegistro: row[22]) )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (esCol ?"": row[imoneda] )) + sepCampos;
    data += (esCabecera == "-1" ? "" :(icc > -1 ? row[icc] : "") )+ sepCampos;
    data += (esCabecera == "-1" ? "" :(icp > -1 ? row[icp] : "") )+ sepCampos;
    data += (esCabecera == "-1" ? "" :(idcc > -1 ? row[idcc] : "")) + sepCampos;
    data += (esCabecera == "-1" ? "" :(tdp > -1 ? row[tdp] : "") )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (ndp > -1 ? row[ndp] : "") )+ sepCampos;
    data += (esCabecera == "-1" ? "" : (gpl > -1 ? row[gpl] : ""))+ sepCampos;


    data +=filtro[0].value + sepCampos;
    data += filtro[1].value + sepCampos;
    data += filtro[2].value + sepCampos;
    data += filtro[3].value + sepCampos;
    data +=filtro[4].value + sepCampos;
    data += filtro[5].value + sepCampos;

    data += filtro[6].value + sepCampos;
    data += (filtro[7].getAttribute("data-v") != null ? filtro[7].getAttribute("data-v"):"") + sepCampos;
    data += filtro[8].value + sepCampos;
    data += filtro[9].value + sepCampos;
    data += filtro[10].value ;


    var hojas = "Cta_CTE_Medico_contable";
    var nombre = "ReporteDetalladoCTACTEMedicoContable.xlsx";

    var url = urlBase + "Control/generarExcelcuentacorrienteMedico/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre ;
    postDownload(url, descargaExcelXLSx, data);


}

function descargaExcelXLSx(rpta) {
    var divLoading = window.parent.parent.document.getElementById("_loading");
    divLoading.classList.add('hide');
    if (rpta != null && rpta.byteLength>0) {
        var nombre = "ReporteDetalladoCTACTE.xlsx";
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
            if (Texto.value.match(/[,;]+/) != null && Tex != "txtObservacionMant") {
                return Mensaje + ' No debe contener , o ;';
            }
        }
    }
    return "";
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

function EsconderToolTip(elem) {
    elem.style.display = "none";
    elem.innerHTML = "";
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
            elemento.classList.add("error");
        } else {
            mensajeValidacion[elemento.getAttribute("data-secuencia")] = "";
            if (elemento.classList.contains("error")) {
                elemento.classList.remove("error");
            }
        }
    }
}

function validarBusqueda() {
    let doc = document;
    let checks = doc.getElementsByClassName("js-check");
    let cboPeriodo = doc.getElementById("cboPeriodo");
    let txtPeriodo = doc.getElementById("txtPeriodo");
    let cboPeriodoInicio = doc.getElementById("cboPeriodoInicio");
    let txtPeriodoInicio = doc.getElementById("txtPeriodoInicio");
    let cboPeriodoFin = doc.getElementById("cboPeriodoFin");
    let txtPeriodoFin = doc.getElementById("txtPeriodoFin");

    mensajeValidacion = [];

    var validar = doc.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].classList.contains("error")) {
            validar[x].classList.remove("error");
        }
    }
    var mensaje = "";
    if (checks[0].checked) {
        mensaje = validarTexto(txtPeriodo.id, "Sucursal", true);
        if (mensaje != "") {
            mensajeValidacion[txtPeriodo.getAttribute("data-secuencia")] = mensaje;
            txtPeriodo.classList.add("error");
            txtPeriodo.focus();
        }
    }
    if (checks[1].checked) {
        mensaje = validarTexto(txtPeriodoInicio.id, "Sucursal", true);
        if (mensaje != "") {
            mensajeValidacion[txtPeriodoInicio.getAttribute("data-secuencia")] = mensaje;
            txtPeriodoInicio.classList.add("error");
            txtPeriodoInicio.focus();
        }

        mensaje = validarTexto(txtPeriodoFin.id, "Sucursal", true);
        if (mensaje != "") {
            mensajeValidacion[txtPeriodoFin.getAttribute("data-secuencia")] = mensaje;
            txtPeriodoFin.classList.add("error");
            txtPeriodoFin.focus();
        }

        if (txtPeriodoInicio.value * 1 > txtPeriodoFin.value * 1) {
            mensajeValidacion.push("Año de inicio es mayor a año fin");
            mostraralerta("Seleccionar Periodo de busqueda");
        }
        if (txtPeriodoInicio.value * 1 == txtPeriodoFin.value * 1) {
            if (cboPeriodoInicio.value * 1 > cboPeriodoFin.value * 1) {
                mensajeValidacion.push("Mes de inicio es mayor a Mes fin");
                mostraralerta("Seleccionar Periodo de busqueda");
            }
        }
    }

    if (!checks[0].checked && !checks[1].checked) {
        mensajeValidacion.push("Seleccione periodo");
        mostraralerta("Seleccionar Periodo de busqueda");
    }

    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
    }
}

function mostrarConfiguracion(rpta) {

    if (rpta) {

        let listas = rpta.split(sepListas);

        llenarTabla(listas[0], "tbTap1");
        llenarTabla(listas[1], "tbTap2");
        llenarTabla(listas[2], "tbTap3");
        llenarTabla(listas[3], "tbTap4");
        llenarTabla(listas[4], "tbTap5");


        let estados = document.getElementsByClassName("js-estado");
        let n = estados.length, campos;
        let data = listas[5].split(sepRegistros);
        for (let i = 0; i < n; i++) {
            campos = data[i].split(sepCampos);
            estados[i].setAttribute("data-id", campos[0]);
            estados[i].setAttribute("data-tipo", campos[1]);
            estados[i].value = campos[2];
        }
        configurarDrag();
        document.getElementById("DTabC1").onclick();
        abrirPopup("PopupConfiguracion");
    }

}

function llenarTabla(lista, tabla) {

    let arr = lista.split(sepRegistros);
    let n = arr.length, campos;
    let html = [];
    for (let i = 0; i < n; i++) {
        campos = arr[i].split(sepCampos);

        html.push("<tr data-id='"+campos[0]+"' data-orden='"+campos[3]+"'>");
        html.push("<td>"+campos[1]+"</td>");
        html.push("<td style='text-align: center'><input type='checkbox'  "+(campos[2]=="1"?"checked":"")+" /></td>");
        html.push("<td style='text-align: center'><span draggable='true' class='Icons fa-arrows-v drag' ></span></td>");
        html.push("</tr>");

    }
    document.getElementById(tabla).innerHTML = html.join("");

}

function configurarDrag() {
    let drag = document.getElementsByClassName("drag");
    let n = drag.length;
    for (let i = 0; i < n; i++) {
        drag[i].addEventListener('dragstart', handleDragStart, false);
        drag[i].parentNode.parentNode.addEventListener('dragover', handleDragOver, false);
        drag[i].parentNode.parentNode.addEventListener('dragenter', handleDragEnter, false);
        drag[i].parentNode.parentNode.addEventListener('dragleave', handleDragLeave, false);
        drag[i].parentNode.parentNode.addEventListener('dragend', handleDragEnd, false);
        drag[i].parentNode.parentNode.addEventListener('drop', handleDrop, false);
        drag[i].parentNode.parentNode.addEventListener('dragend', handleDragEnd, false);
    }
}

function mostrarAgrupacionRpta(rpta) {
    if (rpta) {
        document.getElementById("btnConfigurarColumnas").onclick();
        mostraralerta("Agrupación de estados grabado");
        abrirPopup('PopupConfiguracion');
    } else {
        mostraralerta("Error al grabar agrupación de estados");
    }
}

function mostrarConfiguracionRpta(rpta) {
    if (rpta) {
        document.getElementById("DTabC1").onclick();
        mostraralerta("Configuración grabada");
        abrirPopup('PopupConfiguracion');
    } else {
        mostraralerta("Error al grabar configuracion");
    }
}

function mostrarListar(rpta) {

    if (rpta) {

        let listas = rpta.split(sepListas);
        let configuracion = listas[0].split(sepRegistros);
        let data = (listas[1] != "" ? listas[1].split(sepRegistros) : []);


        let nc = configuracion.length;
        let campos, Headers = [], HeaderSort = [], DataType = [], DataTypeFilter = [],
            ShowColumns = [], Indexs = [], FnExtensions = [];
        let pestania = configuracion[0].split(sepCampos)[0];
        let index = 0, camposSig = [];
        let pestaniasConfiguradas = [];
        for (let i = 0; i < nc; i++) {

            campos = configuracion[i].split(sepCampos);
            if (campos[0] == pestania) {

                Headers.push(campos[2]);
                HeaderSort.push(false);
                DataType.push(campos[3] == "1" ? "A_L" : "S");
                DataTypeFilter.push("I");
                ShowColumns.push(true);
                Indexs.push(index);
                FnExtensions.push(campos[3] == "1" ? "fnExColapsableRow" : "");

                index++;

                camposSig = configuracion[i + 1];
                if (camposSig) {
                    camposSig = configuracion[i + 1].split(sepCampos);
                    if (camposSig[0] != pestania) {
                        pestaniasConfiguradas.push(pestania);

                        Headers.push(htmExportarCabecera("tablaTab" + pestania));
                        HeaderSort.push(false);
                        DataType.push("A" );
                        DataTypeFilter.push("");
                        ShowColumns.push(true);
                        Indexs.push(index);
                        FnExtensions.push("fnExExportaExcel");

                        $$table('tablaTab' + pestania).create({
                            Headers: Headers,
                            HeaderSort: HeaderSort,
                            DataType: DataType,
                            DataTypeFilter: DataTypeFilter,
                            ShowColumns: ShowColumns,
                            Indexs: Indexs,
                            Data: [],
                            BorderTop: false,
                            New: false,
                            Edit: false,
                            FilterUp: true,
                            FilterDown: false,
                            Export: false,
                            HideSearch: true,
                            ExportName: "",
                            RangePage: 5,
                            Separator: '¦',
                            FnExtensions: FnExtensions,
                            FnRowStyle: "fnExEstiloFila",
                            Scope: namespace,
                            ColTable: "24",
                            CollapsableIndex: { "IndexCodigo": index + 1 },
                            Footers: [{ id: 'lbl_AD_DescTotal' + pestania, index: -1, value: 'Totales', type: '' },
                                { id: 'lbl_AD_Total' + pestania , index: Headers.indexOf("Total Provisión") , value: '', type: 'C' }],
                            ShowFooters: [Headers.indexOf("Mon.")+1 , 1]
                        });


                        Headers=[];
                        HeaderSort=[];
                        DataType=[];
                        DataTypeFilter=[];
                        ShowColumns=[];
                        Indexs=[];
                        FnExtensions=[];
                        index = 0;
                        pestania = camposSig[0];
                    }
                }

            }
        }

        if (Headers.length > 0) {
            pestaniasConfiguradas.push(pestania);
            Headers.push("");
            HeaderSort.push(false);
            DataType.push("A");
            DataTypeFilter.push("");
            ShowColumns.push(true);
            Indexs.push(index);
            FnExtensions.push("fnExExportaExcel");

            $$table('tablaTab' + pestania).create({
                Headers: Headers,
                HeaderSort: HeaderSort,
                DataType: DataType,
                DataTypeFilter: DataTypeFilter,
                ShowColumns: ShowColumns,
                Indexs: Indexs,
                Data: [],
                BorderTop: false,
                New: false,
                Edit: false,
                FilterUp: true,
                FilterDown: false,
                Export: false,
                HideSearch: true,
                ExportName: "",
                RangePage: 5,
                Separator: '¦',
                FnExtensions: FnExtensions,
                FnRowStyle: "fnExEstiloFila",
                Scope: namespace,
                ColTable: "24",
                CollapsableIndex: { "IndexCodigo": index + 1 },
                Footers: [{ id: 'lbl_AD_DescTotal' + pestania, index: -1, value: 'Totales', type: '' },
                { id: 'lbl_AD_Total' + pestania , index: Headers.indexOf("Total Provisión"), value: '', type: 'C' }],
                ShowFooters: [Headers.indexOf("Mon.")+1, 1],
            });
        }

        let ordenData = ["Sucursal Id", "Sucursal", "Empresa", "Periodo", "Médico", "Tipo Admisión", "Tipo Registro", "Mon.",
            "Total Provisión", "Cuenta Costo", "Cuenta Proveedor", "ID Doc Contable", "Tipo Documento Pago", "Numero Documento Pago",
        "Estado Planilla"]
        let np = pestaniasConfiguradas.length;
        let cabecera, indexTabla = [],colOrd=[],colAsc=[];
        let nregistros = data.length;
        let newData = [],dataTabla=[];
        let fila = [], indicePadre;
        let indiceMoneda = -1, indiceTotal = -1;
        let objtotales = [];
        for (let i = 0; i < np; i++) {
            newData = [];
            dataTabla = [];
            colOrd = [], colAsc = [];
            indexTabla = [];
            objtotales = [];
            cabecera= $["jtse-tabletablaTab" + pestaniasConfiguradas[i]];
            nc = cabecera.Headers.length;
            for (let j = 0; j < nc; j++) {
                indexTabla.push(ordenData.indexOf(cabecera.Headers[j]));
                if (cabecera.DataType[j] == "A_L") {
                    colOrd.push(j);
                    colAsc.push("ASC")
                }
            }
            indicePadre = nc;
            indiceMoneda = cabecera.Headers.indexOf("Mon.");
            indiceTotal = cabecera.Headers.indexOf("Total Provisión");

            for (let k = 0; k < nregistros; k++) {
                campos = data[k].split(sepCampos);
                fila = [];
                for (let l = 0; l < nc; l++) {
                    fila.push(indexTabla[l] == -1 ? "": campos[indexTabla[l] * 1]);
                }
                
                fila.push("");

                fila.push(campos[campos.length - 6]);
                fila.push(campos[campos.length - 5]);
                fila.push(campos[campos.length - 4]);
                fila.push(campos[campos.length - 3]);
                fila.push(campos[campos.length - 2]);
                fila.push(campos[campos.length - 1]);


                newData.push(fila);
            }


            ordenarMultipleColumnas(newData, colOrd, colAsc);

            nregistros = newData.length;
            let nAgrupados = colOrd.length;
            let mapAgrupado = new Map();
            for (let l = 0; l < nregistros; l++) {
                campos = newData[l].slice();
                campos[indicePadre] = campos[colOrd[nAgrupados - 1]];
                for (let m = 0; m < nAgrupados; m++) {
                    if (!mapAgrupado.has(campos[colOrd[m]])) {
                        let ncmp = campos.length;
                        let newfila = []
                        for (let n = 0; n < ncmp; n++) {
                            if (n < indicePadre) {
                                newfila.push("");

                            } else {
                                newfila.push(campos[n]);
                            }
                        }
                        mapAgrupado.set(campos[colOrd[m]], "");
                        newfila[colOrd[m]] = campos[colOrd[m]];
                        newfila[indicePadre] = (m == 0 ? "" : newData[l][colOrd[m - 1]]);
                        newfila.push(colOrd[m] + ";" + newData[l].join(";"));
                        dataTabla.push(newfila.join(sepCampos));
                        campos[colOrd[m]] = "";

                        objtotales.push({ indexFila: dataTabla.length - 1, valor: newData[l][colOrd[m]] ,total:0})

                    } else {
                        campos[colOrd[m]]="";
                    }
                }
                let ultimoIndex = colOrd[nAgrupados - 1]*1;
                //for (let o = 0; o < ultimoIndex; o++) {
                //    campos[o] = "";
                //}

                let nobjtotales = objtotales.length;
                for (let p = 0; p < nobjtotales; p++) {

                    let ncmps = newData[l].length;

                    for (let t = 0; t < ncmps; t++) {
   
                        if (newData[l][t]==objtotales[p].valor) {
                            objtotales[p].total += newData[l][indiceTotal] * 1;
                            break;
                        }

                    }

                }
                //para setear estilo fila
                campos.push("");

                dataTabla.push(campos.join(sepCampos));
            }

            let nobjtotales = objtotales.length;
            let objs,mtl=0;
            for (let p = 0; p < nobjtotales; p++) {

                objs = dataTabla[objtotales[p].indexFila].split(sepCampos);
                objs[indiceTotal] = objtotales[p].total.toFixed(2);
                objs[indiceMoneda] = newData[0][indiceMoneda];

                dataTabla[objtotales[p].indexFila] = objs.join(sepCampos);

                mtl += objtotales[p].total * 1;

            }
            if (document.getElementById('lbl_AD_Total' + pestaniasConfiguradas[i])) {
                document.getElementById('lbl_AD_Total' + pestaniasConfiguradas[i]).textContent = mtl.toFixed(2);
            }


            $["maptablaTab" + pestaniasConfiguradas[i]] = new Map();
            $$table('tablaTab' + pestaniasConfiguradas[i]).setData(dataTabla);


        }
    }

}

function ordenarMultipleColumnas (arr, columns, order_by) {

    return multisort(arr, columns, order_by)
    function multisort(arr, columns, order_by) {
        let x;
        if (typeof columns == 'undefined') {
            columns = []
            for (x = 0; x < arr[0].length; x++) {
                columns.push(x);
            }
        }

        if (typeof order_by == 'undefined') {
            order_by = []
            for (x = 0; x < arr[0].length; x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a, b, columns, order_by, index) {
            var direction = order_by[index] == 'DESC' ? 1 : 0;

            var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);


            var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();

            if (x < y) {
                return direction == 0 ? -1 : 1;
            }

            if (x == y) {
                return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
            }

            return direction == 0 ? 1 : -1;
        }

        return arr.sort(function (a, b) {
            return multisort_recursive(a, b, columns, order_by, 0);
        });
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
        }, 3000);
    }
}

var $$table = function (controlName) {

    var ctrl = document.getElementById(controlName);
    var _msgError = {
        m1: 'Control not found',
        m2: 'Header not found',
        m3: 'Header should not be zero',
        m4: 'Scope not found',
        m5: 'Function not defined'
    };
    var $create = function (o) {
        if (ctrl == undefined || o == undefined) {
            console.log(_msgError.m1);
            return;
        }
        if (o.Headers == undefined) {
            console.log(_msgError.m2);
            return;
        }
        if (o.Headers.length == 0) {
            console.log(_msgError.m3);
            return;
        }
        var eWidths = false,
            eWidthsPx = false,
            eIndex = false,
            eNew = false,
            eEdit = false,
            eDelete = false,
            eSort = true,
            eFilterUp = true,
            eFilterDown = false,
            eExport = false,
            eActions = false,
            ePagination = true,
            ePaginasMostrar = true,
            eWidthTable = "",
            eColTable = "",
            eHideSearch = false,
            eWidthEdit = "2.5",
            eHidePaginationDetail = false,
            eHideFilterHeader = false,
            eCollapsableIndex = -1;
        var headers = [],
            footers = [],
            widths = [],
            widthsPx = [],
            showColumns = [],
            showFooters = [],
            showColumnsExport = [],
            indexs = [],
            types = [],
            filters = [],
            enableSort = [],
            cHeaders = 0,
            cFooters = 0,
            cFilters = 0,
            cActions = 0,
            cShowSearch = 10,
            cSearchAll = false,
            cStyleHead = "",
            cSelected = true,
            c = [],
            _headerClass = [],
            _headerSort = [],
            eExportExcel = true,
            eExportText = true;
        _headerClass = o.HeaderClass;
        _headerSort = o.HeaderSort;
        eWidthTable = (o.WidthTable ? o.WidthTable : "w-100");
        eColTable = (o.ColTable ? o.ColTable : "20");
        eHideSearch = (o.HideSearch ? o.HideSearch : false);
        eWidthEdit = (o.WidthEdit ? o.WidthEdit : "2.5");
        eHidePaginationDetail = (o.HidePaginationDetail != undefined ? o.HidePaginationDetail : false);
        eCollapsableIndex = (o.CollapsableIndex != undefined ? o.CollapsableIndex : -1)

        var name = controlName;
        headers = o.Headers;
        cHeaders = o.Headers.length;
        cFilters = cHeaders;
        if (o.Widths != undefined) {
            eWidths = true;
            widths = o.Widths;
        }
        if (o.WidthsPx != undefined) {
            eWidthsPx = true;
            widthsPx = o.WidthsPx;
        }
        if (o.Footers != undefined) { footers = o.Footers.slice(); cFooters = o.Footers.length; };
        if (o.ShowFooters != undefined) showFooters = o.ShowFooters.slice();

        if (o.ShowColumns != undefined) showColumns = o.ShowColumns.slice();
        else for (var i = 0; i < cHeaders; i++) showColumns[i] = true;
        if (o.ShowColumnsExport != undefined) showColumnsExport = o.ShowColumnsExport.slice();
        else for (var i = 0; i < cHeaders; i++) showColumnsExport[i] = true;
        if (o.Indexs != undefined) {
            eIndex = true;
            indexs = o.Indexs.slice();
        }
        else for (var i = 0; i < cHeaders; i++) indexs[i] = i;
        if (o.DataType != undefined) types = o.DataType.slice();
        else for (var i = 0; i < cHeaders; i++) types[i] = 'S';
        if (o.DataTypeFilter != undefined) filters = o.DataTypeFilter;
        else for (var i = 0; i < cHeaders; i++) filters[i] = 'I';
        if (o.FilterUp != undefined) eFilterUp = o.FilterUp;
        if (o.FilterDown != undefined) eFilterDown = o.FilterDown;
        if (eFilterUp || eFilterDown) {
            if (o.DataTypeFilter != undefined) filters = o.DataTypeFilter.slice();
        } else {
            if (o.DataTypeFilter != undefined) filters = o.DataTypeFilter.slice();
        }
        if (o.New != undefined) eNew = o.New;
        if (o.Edit != undefined) eEdit = o.Edit;
        if (o.Delete != undefined) eDelete = o.Delete;
        if (o.Sort != undefined) eSort = o.Sort;
        if (o.EnableSort != undefined) enableSort = o.EnableSort.slice();
        else for (var i = 0; i < cHeaders; i++) enableSort[i] = true;
        if (o.FilterUp != undefined) eFilterUp = o.FilterUp;
        if (o.FilterDown != undefined) eFilterDown = o.FilterDown;
        if (o.Export != undefined) eExport = o.Export;
        if (o.Pagination != undefined) ePagination = o.Pagination;
        if (o.PaginasMostrar != undefined) ePaginasMostrar = o.PaginasMostrar;
        if (o.StyleHead != undefined) cStyleHead = o.StyleHead;
        else cStyleHead = '';
        if (o.Selected != undefined) cSelected = o.Selected;

        if (o.ShowSearch != undefined) cShowSearch = o.ShowSearch;
        if (o.SearchAll != undefined) cSearchAll = o.SearchAll;
        if (o.FnActions != undefined && o.FnActions.length > 0) {
            eActions = true;
            cActions = o.FnActions.length;
        }
        if (o.ExportExcel != undefined) eExportExcel = o.ExportExcel;
        if (o.ExportText != undefined) eExportText = o.ExportText;
        o.FnExportExcel = o.FnExportExcel || '';
        o.FnExportText = o.FnExportText || '';
        if (o.HideFilterHeader) eHideFilterHeader = o.HideFilterHeader;

        var lang = findLanguage(o.Lang != undefined ? o.Lang : '');
        c.push('<div class="w-100">');
        if (o.BorderTop != undefined && o.BorderTop) c.push('<hr />');
        if (o.Title != undefined) {
            c.push('<div class="pull-left col-' + eColTable + '"><h4 class="table-title">');
            c.push(o.Title);
            c.push('</h4></div>');
        }
        c.push('<div class="col-' + eColTable + '" style="display: table;vertical-align: middle;text-align:right;">');
        if (eFilterUp || eFilterDown) {
            if (!eHideSearch) {
                c.push('<div style="display:table-cell; padding:8px;text-align: right;vertical-align:middle" >');
                c.push('<input id="search');
                c.push(name);
                c.push('" style="width:60%;display:inline-block" type="text" class="form-control" placeholder="');
                c.push(lang.Search);
                c.push('">');
                c.push('</div>');
            }

        }
        else {

            if (!eHideSearch) {
                c.push('<div style="display:table-cell; padding:8px;text-align: right;vertical-align:middle" >');
                c.push('<input id="search');
                c.push(name);
                c.push('" style="width:60%;display:inline-block" type="text" class="form-control hide" placeholder="');
                c.push(lang.Search);
                c.push('">');
                c.push('</div>');
            }
        }
        if (eExport || eNew) {
            c.push('<div style="display:table-cell;width:150px;vertical-align:middle" >');
            if (eExport) {
                c.push('<div class="btn-export" style="padding:7px" ');
                if (!eNew) {
                    c.push(' style="margin-bottom:auto; padding:7px" ');
                }
                c.push('>');
                c.push('<label>');
                c.push(lang.Export);
                c.push('</label>');
                if (eExportExcel) {
                    c.push('<span id="exportExcel');
                    c.push(name);
                    c.push('"><i class="Icons fa-file-excel-o"></i></span>');
                }
                if (eExportText) {
                    c.push('<span id="exportText');
                    c.push(name);
                    c.push('"><i class="Icons fa-file-text-o"></i></span>');
                }
                c.push('</div > ');
            }
            if (eNew) {
                c.push('<div id="btnAdd');
                c.push(name);
                c.push('" class="btn-add"><i class="fa fa-plus" title=');
                c.push(lang.Add);
                c.push('></i></div>');
            }
            c.push('</div>');
        }
        c.push('</div><div class="col-' + eColTable + '" ');
        if (eWidthTable) {
            c.push("style='overflow:hidden'");
        }
        c.push('>');
        c.push('<div class=" scroll-x col-lg-' + eColTable + ' ');
        c.push(o.Class || '');
        c.push('">');
        c.push('<table class="table ' + (eWidthTable ? eWidthTable : ""));
        if (eWidthsPx) {
            c.push(' table-layout');
        }
        c.push('"><thead ');
        c.push(' ><tr>');
        for (var i = 0; i < cHeaders; i++) {
            if (eEdit && i == 0)
                c.push('<th style="width:' + eWidthEdit + '%;' + cStyleHead + '"></th>');
            if (showColumns[i]) {
				/* c.push('<th  id="');
				c.push(headers[i]);
				c.push('" class="');*/
                c.push('<th class="');
                if (_headerSort) {
                    if (_headerSort[i] == true) {
                        c.push('sorting ');
                    }
                } else { c.push('sorting '); }
                if (_headerClass) {
                    c.push(_headerClass[i]);
                }
                if (_headerSort) {
                    if (_headerSort[i] == true) {
                        c.push('" name="sort');
                    }
                    else {
                        c.push('" name="');
                    }
                } else { c.push('" name="sort'); }
                c.push(name);
                if (eIndex) {
                    c.push('" data-order="');
                    c.push(indexs[i]);
                    c.push('" style="');
                    c.push(cStyleHead);
                    if (cStyleHead != '') c.push(';');
                    c.push('width:');
                }
                else {
                    c.push('" style="');
                    c.push(cStyleHead);
                    if (cStyleHead != '') c.push(';');
                    c.push('width:')
                }
                if (eWidths) {
                    c.push(widths[i]);
                    c.push('%');
                }
                else if (eWidthsPx) {
                    c.push(widthsPx[i]);
                    c.push('px');
                }
                else {
                    c.push('auto');
                }
                c.push('">');
                c.push(headers[i]);
                c.push('</th > ');
            }
            if (eDelete && i == cHeaders - 1)
                c.push('<th style="width:2.5%;' + cStyleHead + '"></th>');
            if (eActions) {
                if (i == cHeaders - 1) {
                    c.push('<th style="');
                    c.push(cStyleHead);
                    c.push('width:');
                    c.push(cActions * 2.5);
                    c.push('%" colspan="');
                    c.push(cActions);
                    c.push('">Opc</th>');
                }
            }
        }
        c.push('</tr></thead>');
        if (eFilterUp || (eFilterUp == false && eFilterDown == false)) c.push(createFilter(name, filters, cFilters, cActions, showColumns, eEdit, eDelete, eActions, 'U', null, indexs, eHideFilterHeader));
        c.push('<tbody id="tBody');
        c.push(name);
        c.push('"><tr><td class="text-center" colspan="');
        var colspan = cHeaders + (eEdit ? 1 : 0) + (eDelete ? 1 : 0) + (eActions ? o.FnActions.length : 0);
        c.push(colspan);
        c.push('">');
        c.push(lang.NoDataFound);
        c.push('</td></tr></tbody>');

        if (o.Footers) {
            var n = 0, obj;
            c.push('<tfoot><tr>');
            if (eEdit)
                c.push('<td style="width:2.5%"></td>');
            for (var i = 0; i < cFooters; i++) {
                obj = footers[i];
                n += showFooters[i] | 0;
                c.push('<td ' + (obj.type && obj.type == "S" ? "class='text-right'" : (obj.type && obj.type == "C" ? "class='text-center'" : "")) + ' id="');
                c.push((obj.id ? obj.id : ""));
                c.push('" colspan="');
                c.push(showFooters[i]);

                c.push('" style="color:black;font-weight:bold">');
                c.push((obj.value ? obj.value : ""))
                c.push('</td>');
            };
            var ncabecera = headers.length;
            var ntotal = ncabecera - n;
            if (ntotal > 0) {
                c.push('<td colspan="' + ntotal + '"></td>');
            }

            if (eDelete) c.push('<td style="width:2.5%"></td>');

            c.push('</tr></tfoot>');
        };

        if (eFilterDown) c.push(createFilter(name, filters, cFilters, cActions, showColumns, eEdit, eDelete, eActions, 'D', null, indexs));
        c.push('</table></div></div>');
        if (ePagination) {
            if (ePaginasMostrar) {
                c.push('<div class="col-' + eColTable + '"><div class="pagination col-' + eColTable + ' ');
            } else {
                c.push('<div class="col-' + eColTable + '"><div class="pagination col-' + eColTable + ' hide');
            }
            c.push(o.Class || '');
            c.push('">');
            c.push('<div class="col-' + ((eColTable / 2) + 2) + ' col-' + ((eColTable / 2) + 2) + '">');
            c.push('<div class="form-group mar-left pull-left">');
            c.push('<label class="mar-left" style="color:#526069">');
            c.push(lang.Show);
            c.push('</label>');
            c.push('<select id="cboFieldShow');
            c.push(name);
            c.push('" class="form-control mar-left" style="display:inline-block;width:auto">');
            var c10 = '<option value="10">10</option>',
                c25 = '<option value="25">25</option>',
                c50 = '<option value="50">50</option>',
                c100 = '<option value="100">100</option>';
            if (o.EntriesPage) {
                var ep = o.EntriesPage;
                if (ep != 25 && ep != 50 && ep != 100 && ep != 250) {
                    if (ep < 25) {
                        c.push('<option value="');
                        c.push(ep);
                        c.push('" selected>');
                        c.push(ep);
                        c.push('</option>');
                        c.push(c10);
                        c.push(c25);
                        c.push(c50);
                        c.push(c100);
                    } else if (ep < 50) {
                        c.push(c10);
                        c.push('<option value="');
                        c.push(ep);
                        c.push('" selected>');
                        c.push(ep);
                        c.push('</option>');
                        c.push(c25);
                        c.push(c50);
                        c.push(c100);
                    } else if (ep < 100) {
                        c.push(c10);
                        c.push(c25);
                        c.push('<option value="');
                        c.push(ep);
                        c.push('" selected>');
                        c.push(ep);
                        c.push('</option>');
                        c.push(c50);
                        c.push(c100);
                    } else if (ep < 250) {
                        c.push(c10);
                        c.push(c25);
                        c.push(c50);
                        c.push('<option value="');
                        c.push(ep);
                        c.push('" selected>');
                        c.push(ep);
                        c.push('</option>');
                        c.push(c100);
                    } else {
                        c.push(c10);
                        c.push(c25);
                        c.push(c50);
                        c.push(c100);
                        c.push('<option value="');
                        c.push(ep);
                        c.push('" selected>');
                        c.push(ep);
                        c.push('</option>');
                    }
                }
                else {
                    if (ep == 10) {
                        c.push('<option value="10" selected>10</option>');
                        c.push(c25);
                        c.push(c50);
                        c.push(c100);
                    }
                    if (ep == 25) {
                        c.push(c10);
                        c.push('<option value="25" selected>25</option>');
                        c.push(c50);
                        c.push(c100);
                    }
                    if (ep == 50) {
                        c.push(c10);
                        c.push(c25);
                        c.push('<option value="50" selected>50</option>');
                        c.push(c100);
                    }
                    if (ep == 100) {
                        c.push(c10);
                        c.push(c25);
                        c.push(c50);
                        c.push('<option value="100" selected>100</option>');
                    }
                }
            }
            else {
                c.push('<option value="10" selected>10</option>');
                c.push(c25);
                c.push(c50);
                c.push(c100);
            }
            c.push('</select></div>');
            //c.push('</select></div>');
            //c.push('<div class="pagination-details col-sm-10 col-xs-10" style="margin-left:5px; margin-top:4px">');
            c.push('<div class="pagination-details col-' + ((eColTable / 2) - 2) + ' col-' + ((eColTable / 2) - 2) + '" style="margin-left:5px; margin-top:4px;font-size:11px;text-overflow:ellipsis;white-space:nowrap">');
            c.push('<span>');
            c.push(lang.Showing);
            c.push(' <span id="currentPage');
            c.push(name);
            c.push('">0</span>&nbsp;');
            c.push(lang.To);
            c.push('&nbsp;<span id="totalPages');
            c.push(name);
            c.push('">0</span>&nbsp;');
            c.push(lang.Of);
            c.push('&nbsp;<span id="totalEntries');
            c.push(name);
            c.push('">0</span>&nbsp;');
            c.push(lang.Entries);
            c.push('</span></div>');
            c.push('</div>');
            c.push('<div id="pagination');
            c.push(name);
            //c.push('" class="pagination-pages text-right col-sm-10 col-xs-10"></div></div></div>');
            c.push('" class="pagination-pages text-right col-' + ((eColTable / 2) - 2) + ' col-' + ((eColTable / 2) - 2) + '"></div></div></div>');

        } else {

            //c.push('<div class="pagination-details col-sm-10 col-xs-10" style="margin-left:5px; margin-top:4px">');
            c.push('<div class="pagination-details col-12 col-12 ' + (eHidePaginationDetail ? "hide" : "") + '" style="margin-left:5px; margin-top:4px">');
            c.push('<span>');
            c.push(lang.Showing);
            c.push(' <span id="currentPage');
            c.push(name);
            c.push('" class="hide"></span>');
            //c.push(lang.To);
            c.push('<span id="totalPages');
            c.push(name);
            c.push('" class="hide"></span>');
            //c.push(lang.Of);
            c.push('<span id="totalEntries');
            c.push(name);
            c.push('"></span>&nbsp;');
            c.push(lang.Entries);
            c.push('</span></div>');


        }
        ctrl.innerHTML = c.join('');
        if (eSort) orderSetup();
        if (eFilterUp || eFilterDown) filterSetup();
        //filterSetup();
        if (eExport) {
            if (eExportExcel) {
                if (o.FnExportExcel != '') {
                    document.getElementById('exportExcel' + name).onclick = function () { $[o.Scope][o.FnExportExcel](); };
                }
                else {
                    document.getElementById('exportExcel' + name).onclick = function () { exportTextExcel(1); };
                }
            }
            if (eExportText) {
                if (o.FnExportText != '') {
                    document.getElementById('exportText' + name).onclick = function () { $[o.Scope][o.FnExportText](); };
                }
                else {
                    document.getElementById('exportText' + name).onclick = function () { exportTextExcel(0); };
                }
            }
        }
        if (eNew) {
            if (o.FnNew != undefined && o.Scope != undefined)
                document.getElementById('btnAdd' + name).addEventListener('click', $[o.Scope][o.FnNew]);
            else if (o.Scope == undefined) console.log(_msgError.m4);
        }
        if (ePagination) {
            document.getElementById('cboFieldShow' + name).onchange = function () {
                $['jtse-table' + name].EntriesPage = this.value * 1;
                showTable(0);
            };
        }
        $['jtse-table' + name] = {
            Headers: headers,
            DataType: types,
            DataTypeFilter: filters,
            ShowColumns: showColumns,
            ShowColumnsExport: showColumnsExport,
            Widths: widths,
            WidthsPx: widthsPx,
            Indexs: indexs,
            Data: o.Data || [],
            Matrix: [],
            Class: o.Class || 'col-20',
            New: eNew,
            Edit: eEdit,
            Delete: eDelete,
            Sort: eSort,
            EnableSort: enableSort,
            FilterUp: eFilterUp,
            FilterDown: eFilterDown,
            Export: eExport,
            Pagination: ePagination,
            ShowSearch: cShowSearch,
            SearchAll: cSearchAll,
            StyleHead: cStyleHead,
            Selected: cSelected,
            ExportName: (o.ExportName || ''),
            FnNew: (o.FnNew || ''),
            FnEdit: (o.FnEdit || ''),
            FnDelete: (o.FnDelete || ''),
            FnRowEvent: (o.FnRowEvent || ''),
            FnRowdblClickEvent: (o.FnRowdblClickEvent || ''),
            FnRowStyle: (o.FnRowStyle || ''),
            FnRowClass: (o.FnRowClass || ''),
            FnColumStyle: (o.FnColumStyle || ''),
            FnColumnStyle: (o.FnColumnStyle || ''),
            FnActions: (o.FnActions || []),
            Scope: (o.Scope || ''),
            Icons: (o.Icons != undefined ? o.Icons : (o.Actions != undefined ? new Array(o.Actions.length) : [])),
            Separator: '¦',
            Lang: o.Lang != undefined ? o.Lang : '',
            FnExtensions: (o.FnExtensions || []),
            FnExtensionEditButton: (o.FnExtensionEditButton || ''),
            FnExtensionDeleteButton: (o.FnExtensionDeleteButton || ''),
            IndexCurrentPage: 0,
            IndexCurrentRange: 0,
            EntriesPage: (o.EntriesPage != undefined ? o.EntriesPage : 10),
            RangePage: (o.RangePage != undefined ? o.RangePage : 10),
            IndexOrder: 0,
            FilterField: (o.FilterField != undefined ? o.FilterField : true),
            ExportExcel: eExportExcel,
            ExportText: eExportText,
            FnExportExcel: o.FnExportExcel,
            FnExportText: o.FnExportText,
            Footers: o.Footers,
            HideFilterHeader: o.HideFilterHeader,
            CollapsableIndex: eCollapsableIndex
        };
        if (o.Data != undefined && o.Data.length > 0) {
            createMatrix();
            showTable(0);
        }
    };
    var $setData = function (d) {
        if (d != undefined) {
            var nameObj = 'jtse-table' + controlName;
            if ($[nameObj].IndexCurrentPage == 0) {
                $[nameObj].IndexCurrentPage = 0,
                    $[nameObj].IndexCurrentRange = 0,
                    $[nameObj].IndexOrder = 0;
            }
            $[nameObj].Matrix = [];
            createMatrix(d);
            filterThread();
            showTable($[nameObj].IndexCurrentPage);
        }
    };
    var $clearTable = function () {
        var nameObj = 'jtse-table' + controlName;
        $[nameObj].IndexCurrentPage = 0,
            $[nameObj].IndexCurrentRange = 0,
            $[nameObj].IndexOrder = 0;
        $[nameObj].Matrix = [];
        showTable(0);
    };
    var findLanguage = function (obj) {
        if (window[obj] != undefined && obj != '')
            return window[obj];
        else
            return {
                Add: 'Agregar',
                Export: 'Exportar',
                Show: 'Mostrar',
                Search: 'Búsqueda...',
                NoDataFound: 'No hay registros...',
                Showing: 'Mostrando',
                To: 'hasta',
                Of: 'de',
                Entries: 'registros'
            };
    };
    var createFilter = function (name, filters, cFilters, cActions, showColumns, eEdit, eDelete, eActions, pos, footers, indexs, eHideFilterHeader) {
        var c = [];
        c.push('<');
        c.push(pos == 'U' ? 'thead' : 'tbody');
        if (eHideFilterHeader) {
            c.push(' class="hide"');
        } else {
            c.push(pos == 'U' ? ' class="hide"' : '');
        }
        c.push('><tr>');
        for (var i = 0; i < cFilters; i++) {
            if (eEdit && i == 0) c.push('<td></td>');
            if (showColumns[i]) {
                c.push('<td>');
                switch (filters[i]) {
                    case 'S':
                        c.push('<select data-pos=' + i + ' data-index=' + indexs[i] + ' id="cbo_' + name + '_' + i + '" name="filter');
                        c.push(name);
                        c.push('" class="form-control"></select>');
                        break;
                    case 'I':
                        c.push('<input data-pos=' + i + ' data-index=' + indexs[i] + ' name="filter');
                        c.push(name);
                        c.push('" type="text" class="form-control lupa" />');
                        break;
                    default:
                        c.push('<input data-pos=' + i + ' data-index=' + indexs[i] + ' name="filter');
                        c.push(name);
                        c.push('" style="display:none" />');
                        break;
                }
                c.push('</td>');
            }
            if (eDelete && i == cFilters - 1) c.push('<td></td>');
            if (eActions && i == cFilters - 1) for (var k = 0; k < cActions; k++) c.push('<td></td>');
        }
        c.push('</tr></');
        c.push(pos == 'U' ? 'thead' : 'tbody');
        c.push('>');
        return c.join('');
    };
    var orderSetup = function () {
        var links = document.getElementsByName("sort" + controlName);
        var cLinks = links.length;
        var link;
        for (var i = 0; i < cLinks; i++) {
            link = links[i];
            link.onclick = function () {
                sortMatrix(this);
                showTable($['jtse-table' + controlName].IndexCurrentPage);
            }
        }
    };
    var order = function (x, y) {
        var IndexOrder = $['jtse-table' + controlName].IndexOrder;
        var valX = (isNaN(x[IndexOrder]) ? x[IndexOrder].toLowerCase() : x[IndexOrder]);
        var valY = (isNaN(y[IndexOrder]) ? y[IndexOrder].toLowerCase() : y[IndexOrder]);
        return (($['jtse-table' + controlName].OrderType == 0 ? valX > valY : valX < valY) ? 1 : -1);
    };
    var clearLinks = function () {
        var links = document.getElementsByName("sort" + controlName);
        var cLinks = links.length;
        var link;
        for (var i = 0; i < cLinks; i++) {
            link = links[i];
            link.classList.add('sorting');
            link.classList.remove('sorting_desc');
            link.classList.remove('sorting_asc');
        }
    };
    var sortMatrix = function (link) {
        var nameObj = 'jtse-table' + controlName;
        $[nameObj].IndexOrder = link.getAttribute("data-order") * 1;
        var field = link.className;
        var posAsc = field.indexOf("sorting_asc");
        var posDesc = field.indexOf("sorting_desc");
        $[nameObj].OrderType = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
        clearLinks();
        if ($[nameObj].OrderType == 0) {
            link.classList.add('sorting_asc');
            link.classList.remove('sorting_desc');
            link.classList.remove('sorting');
        }//link.className = '';
        else {
            link.classList.add('sorting_desc');
            link.classList.remove('sorting_asc');
            link.classList.remove('sorting');
        }//link.className = 'sorting_desc';
        $[nameObj].Matrix.sort(order);
    };
    var filterSetup = function () {
        var filters = document.getElementsByName("filter" + controlName);
        var cFilters = filters.length;
        for (var i = 0; i < cFilters; i++) {
            switch (filters[i].tagName) {
                case 'INPUT':
                    filters[i].onkeyup = filter;
                    filters[i].onfocus = getfocus;
                    filters[i].onblur = lostfocus;
                    break;
                case 'SELECT':
                    filters[i].onchange = filter;
                    break;
            }
        }
        var search = document.getElementById('search' + controlName);
        if (search != undefined) search.onkeyup = filter;
    };
    var getfocus = function (e) {
        this.classList.remove("lupa");
    }
    var lostfocus = function (e) {
        this.classList.add("lupa");
    }
    var filter = function (e) {
        clearTimeout($['jtse-table' + controlName].Threads);
        $['jtse-table' + controlName].Threads = setTimeout(function () { filterThread(e); }, 1);
    };
    var filterThread = function (e) {
        var nameObj = 'jtse-table' + controlName;
        var filters = document.getElementsByName("filter" + controlName);
        var cFilters = filters.length;
        var vFilters = [], exist, eDataType = false, dataType, arr = [];
        $[nameObj].Matrix = [];
        var cEntries = $[nameObj].Data.length;
        var Indexs = $[nameObj].Indexs.slice();
        let ObjCollapsableFilter = $[nameObj].CollapsableIndex;
        let ArrIndexCollapsableFilter = [];
        var cFields, fields, field, x = 0, vSearch = '', existSearch;
        var optionDate = { "year": "numeric", "month": "2-digit", "day": "2-digit" };
        var optionDateTime = { "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit", "second": "2-digit" };
        if ($[nameObj].DataType != undefined) {
            eDataType = true;
            dataType = $[nameObj].DataType;
        }
        var search = document.getElementById('search' + controlName);
        if (search != undefined && search.value != '') {
            vSearch = search.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
            for (var j = 0; j < cFilters; j++) {
                filters[j].className = 'form-control has-error';
                filters[j].disabled = true;
                if (!$isIE)
                    vFilters.push({ value: filters[j].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(), type: (filters[j].tagName == 'INPUT' ? 0 : 1), index: filters[j].getAttribute("data-index") * 1, pos: filters[j].getAttribute("data-pos") * 1 });
                else
                    vFilters.push({ value: $frQuitarAcentos(filters[j].value).toLowerCase().trim(), type: (filters[j].tagName == 'INPUT' ? 0 : 1), index: filters[j].getAttribute("data-index") * 1, pos: filters[j].getAttribute("data-pos") * 1 });
            }
        }
        else {
            for (var j = 0; j < cFilters; j++) {
                filters[j].className = 'form-control ' + (filters[j].value != "" ? "" : "lupa");
                filters[j].disabled = false;
                if (!$isIE)
                    vFilters.push({ value: (filters[j].tagName == 'INPUT' ? filters[j].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : filters[j].value), type: (filters[j].tagName == 'INPUT' ? 0 : 1), index: filters[j].getAttribute("data-index") * 1, pos: filters[j].getAttribute("data-pos") * 1 });
                else
                    vFilters.push({ value: $frQuitarAcentos(filters[j].value).toLowerCase().trim(), type: (filters[j].tagName == 'INPUT' ? 0 : 1), index: filters[j].getAttribute("data-index") * 1, pos: filters[j].getAttribute("data-pos") * 1 });
            }
        }
        var divTmp;
        var footers = ($[nameObj].Footers ? $[nameObj].Footers : []);
        var nfooterfiltro = footers.length;
        var obj, tipo;

        for (var z = 0; z < nfooterfiltro; z++) {
            obj = footers[z];
            footers[z].total = 0;

        }

        //funcion verificar si existe filtro
        let n = vFilters.length;
        let existeFiltro = false;
        for (let zz = 0; zz < n; zz++) {
            if (vFilters[zz].value != "") {
                existeFiltro = true;
                break;
            }
        }

        for (var i = 0; i < cEntries; i++) {
            fields = $[nameObj].Data[i];
            cFields = fields.length;
            exist = false;
            existSearch = true;
            divTmp = document.createElement('div');
            if (vSearch != '') {
                if ($[nameObj].SearchAll == false) {
                    for (var j = 0; j < cFilters; j++) {
                        filter = vFilters[j];
                        ///->if (filter.type == 0){
                        if (filter.type == 0 || filter.type == 1) {
                            if (eDataType) {
                                switch (dataType[filter.pos]) {
                                    case 'D':
                                        field = (new Date(fields[filter.index])).toLocaleString('es-PE', optionDate);
                                        break;
                                    case 'A':
                                    case 'A_L':
                                    case 'A_R':
                                        divTmp.innerHTML = extension($[nameObj].FnExtensions[filter.pos], fields, i, null, filter.pos);
                                        field = divTmp.textContent;
                                        let span = field.trim().substring(0, 5);
                                        if (span == "<span") {
                                            field = field.trim();
                                            let pos = field.indexOf(">");
                                            let posl = field.indexOf("<", pos)

                                            field = field.substring(pos + 1, posl)
                                        }

                                        break;
                                    /*case 'DT':
                                        field = (new Date(fields[$['jtse-table' + nameTag].Indexs[j]])).toLocaleString('es-PE', optionDateTime);*/
                                    default:
                                        if (!$isIE)
                                            field = fields[filter.index].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                        else
                                            field = $frQuitarAcentos(fields[filter.index].toString());
                                        break;
                                }
                            }
                            else field = fields[filter.index].toString();

                            existSearch = (field.toLowerCase().trim().indexOf(vSearch) > -1);
                            if (existSearch) {
                                exist = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var j = 0; j < fields.length; j++) {

                        field = fields[j].toString();

                        existSearch = (field.toLowerCase().trim().indexOf(vSearch) > -1);
                        if (existSearch) {
                            exist = true;
                            break;
                        }
                    }
                }
            } else if (!exist) {
                for (var j = 0; j < cFilters; j++) {
                    exist = true;
                    filter = vFilters[j];
                    ///->if (filter.type == 0 || filter.type == 1) {
                    if (filter.type == 0) {
                        if (eDataType) {
                            switch (dataType[filter.pos]) {
                                case 'D':
                                    field = (new Date(fields[filter.index])).toLocaleString('es-PE', optionDate);
                                    break;
                                case 'A':
                                case 'A_L':
                                case 'A_R':
                                    field = extension($[nameObj].FnExtensions[filter.pos], fields, i, null, null, filter.pos);
                                    // cambio para que las propiedades html no interfieran en el filtro

                                    let span = field.trim().substring(0, 5);
                                    if (span == "<span") {
                                        field = field.trim();
                                        let pos = field.indexOf(">");
                                        let posl = field.indexOf("<", pos);
                                        if (field.indexOf("Icons") > -1) {
                                            let posl = field.indexOf(">", pos);
                                            field = field.substring(pos + 1);
                                        } else {
                                            field = field.substring(pos + 1, posl);
                                        }


                                    }

                                    break;
                                /*case 'DT':
                                    field = (new Date(fields[$['jtse-table' + nameTag].Indexs[j]])).toLocaleString('es-PE', optionDateTime);*/
                                default:
                                    if (!$isIE)
                                        field = fields[filter.index].toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                                    else
                                        field = $frQuitarAcentos(fields[filter.index].toString());
                                    break;
                            }
                        }
                        else field = fields[filter.index].toString();
                        exist = exist && (field.toLowerCase().trim().indexOf(filter.value) > -1);
                    }
                    //else exist = exist && (filter.value == "" || fields[Indexs[j]] == filter.value);
                    else exist = exist && (filter.value == "" || fields[filter.index].toLowerCase().trim() == filter.value.toLowerCase().trim());
                    if (!exist) break;
                }
            }
            if (exist && existSearch) {
                nfooterfiltro = footers.length;
                obj, tipo;
                //for (var z = 0; z < nfooterfiltro; z++) {
                //    obj = footers[z];
                //    if (obj.index != null && obj.index > -1) {
                //        tipo = obj.type;
                //        if (tipo == "S") {
                //            if (obj.total != null) {
                //                obj.total += (fields[obj.index] | 0);
                //            }
                //        } else {
                //            if (fields[obj.index] != "" && fields[obj.index] != "0") {
                //                obj.total += 1;
                //            }
                //        }
                //    }
                //}

                if (ObjCollapsableFilter != -1) {
                    let IndexCollapsableFilter = ObjCollapsableFilter["IndexCodigo"] * 1;
                    let cod = fields[IndexCollapsableFilter];
                    if (cod && cod != "" && existeFiltro) {
                        if (ArrIndexCollapsableFilter.indexOf(cod) == -1) {
                            let IndexCodigo = ObjCollapsableFilter["IndexCodigo"] * 1;
                            let nc = fields.length;
                            let antecesores = [], encontro = false;;
                            for (let yy = (i - 1); yy >= 0; yy--) {

                                for (let jj = 0; jj < nc; jj++) {

                                    if ($[nameObj].Data[yy][jj] == cod && IndexCollapsableFilter!=jj) {

                                        antecesores.push($[nameObj].Data[yy].slice())
                                        ArrIndexCollapsableFilter.push(cod);
                                        encontro = true;
                                        break;
                                    }
                                }

                                if (encontro && antecesores[antecesores.length - 1][IndexCodigo] != "") {
                                    cod = antecesores[antecesores.length - 1][IndexCodigo];
                                } else {
                                   // break;
                                }

                            }
                            if (antecesores.length > 0) {
                                let n = antecesores.length - 1;
                                for (let yy = n; yy >= 0; yy--) {
                                    arr[x] = [];
                                    arr[x] = antecesores[yy].slice();
                                    x++;
                                }
                            }

                        }
                    } else if (fields[0] != "0") {
                        $["map" + controlName].clear();

                    }
                }
                arr[x] = [];
                arr[x] = fields.slice();
                x++;
            }
        }

        nfooterfiltro = footers.length;
        obj, tipo;
        //for (var z = 0; z < nfooterfiltro; z++) {
        //    obj = footers[z];
        //    if (obj.index != null && obj.index > -1) {
        //        tipo = obj.type
        //        if (obj.id) {
        //            document.getElementById(obj.id).innerHTML = (tipo == "S" ? $frDecimal(obj.total) : obj.total);
        //        }
        //    }
        //}

        $[nameObj].Matrix = arr.slice();
        if (e != undefined) {
            $[nameObj].IndexCurrentPage = 0,
                $[nameObj].IndexCurrentRange = 0;
        }
        pagination($[nameObj].IndexCurrentPage);

        if (nfooterfiltro) {

            let n = $[nameObj].Matrix.length;
            let posT = $[nameObj].Headers.indexOf("Total Provisión");
            let total = 0,obj;
            for (let i = 0; i < n; i++) {
                obj = $[nameObj].Matrix[i];
                if (obj[23] == "") {
                    total += +obj[posT];
                }
            }
            let p = nameObj.substr(-1);
            if (document.getElementById('lbl_AD_Total' + p)) {
                document.getElementById('lbl_AD_Total' + p).textContent = total.toFixed(2);
            }

        }


    };
    var createMatrix = function (_data) {

        if (ctrl != undefined && $['jtse-table' + controlName] != undefined) {
            var nameObj = 'jtse-table' + controlName;
            $[nameObj].TotalRegistros = (_data) ? _data.length : 0;
            $[nameObj].EntriesPage = ($[nameObj].Pagination == true ? $[nameObj].EntriesPage : _data.length);
            //if ($[nameObj].Pagination == false) {
            //	if (_data.length >= $[nameObj].ShowSearch && $[nameObj].ShowSearch != 0) {
            //		if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
            //			document.getElementById(controlName).getElementsByTagName("thead")[1].classList.remove("hide");
            //		}
            //	}
            //	else {
            //		if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
            //			document.getElementById(controlName).getElementsByTagName("thead")[1].classList.add("hide");
            //		}
            //	}
            //}
            var arr = [];
            if (_data != undefined) {
                if (_data.length > 0) $[nameObj].Data = _data;
                else {
                    $[nameObj].Data = [];
                    showTable(0);
                    return;
                }
            }
            var separator = ($[nameObj].Separator != undefined ? $[nameObj].Separator : '¦');
            var cEntries = $[nameObj].Data.length;
            var cColumns = $[nameObj].Data[0].split(separator).length;
            var columns, date, dataType, eDataType = false;
            if ($[nameObj].DataType != undefined) {
                eDataType = true;
                dataType = $[nameObj].DataType;
            }
            for (var i = 0; i < cEntries; i++) {
                columns = $[nameObj].Data[i].split(separator);
                arr[i] = [];
                for (var j = 0; j < cColumns; j++) {
                    if (eDataType) {
                        switch (dataType[j]) {
                            case 'N':
                            case 'DE':
                                arr[i][j] = columns[j] * 1;
                                break;
                            case 'DT':
                            case 'D':
                                if (columns[j] != "") {
                                    date = columns[j].split('/');
                                    arr[i][j] = Date.UTC(date[2], (date[1] * 1) - 1, date[0], 5, 0, 0, 0);
                                }
                                else arr[i][j] = 0;
                                break;
                            case 'B':
                                arr[i][j] = (columns[j] == 'true' ? true : false);
                                break;
                            default:
                                arr[i][j] = columns[j].toString();
                                break;
                        }
                    }
                    else arr[i][j] = columns[j].toString();
                }
            }
            $[nameObj].Data = arr.slice();
            $[nameObj].Matrix = arr.slice();
            arr = [];
        }
    };
    var showTable = function (indexPage) {
        if (ctrl != undefined && $['jtse-table' + controlName] != undefined) {
            var name = controlName, c = [];
            var nameObj = 'jtse-table' + controlName;
            var separator = ($[nameObj].Separator != undefined ? $[nameObj].Separator : '¦');
            var cActions = ($[nameObj].FnActions != undefined ? $[nameObj].FnActions.length : 0);
            $[nameObj].IndexCurrentPage = indexPage;
            var cEntries = $[nameObj].Matrix.length;
            if (cEntries > 0) {
                var start = indexPage * $[nameObj].EntriesPage;
                var end = start + $[nameObj].EntriesPage;
                //document.getElementById('currentPage' + name).innerHTML = start + 1;
                //document.getElementById('totalPages' + name).innerHTML = (end <= cEntries ? end : cEntries);
                //document.getElementById('totalEntries' + name).innerHTML = cEntries;
                document.getElementById('currentPage' + name).innerHTML = start + 1;
                document.getElementById('totalPages' + name).innerHTML = (end <= cEntries ? end : cEntries);
                //}
                document.getElementById('totalEntries' + name).innerHTML = cEntries;
                var cColumns = $[nameObj].Headers.length;
                var dataType, eDataType = false, columns;
                if ($[nameObj].DataType != undefined) {
                    eDataType = true;
                    dataType = $[nameObj].DataType;
                }
                var optionDate = {
                    "year": "numeric", "month": "2-digit", "day": "2-digit"
                };
                var optionDateTime = {
                    "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit", "second": "2-digit"
                };
                var Edit = $[nameObj].Edit,
                    Delete = $[nameObj].Delete,
                    Scope = $[nameObj].Scope,
                    FnEdit = $[nameObj].FnEdit,
                    FnDelete = $[nameObj].FnDelete,
                    FnRowEvent = $[nameObj].FnRowEvent,
                    FnRowdblClickEvent = $[nameObj].FnRowdblClickEvent,
                    FnRowStyle = $[nameObj].FnRowStyle,
                    FnRowClass = $[nameObj].FnRowClass,
                    FnColumStyle = $[nameObj].FnColumStyle,
                    FnColumnStyle = $[nameObj].FnColumnStyle,
                    FnActions = $[nameObj].FnActions,
                    Icons = $[nameObj].Icons,
                    ShowColumns = $[nameObj].ShowColumns.slice(),
                    Indexs = $[nameObj].Indexs.slice();
                for (var i = start; i < end; i++) {
                    if (i < cEntries) {
                        columns = $[nameObj].Matrix[i];
                        c.push('<tr ');
                        if (FnRowStyle != '') {
                            c.push(extension($[nameObj].FnRowStyle, columns, i));
                        }
                        if (FnRowEvent != '') {
                            c.push(' onclick="$$table(\'');
                            c.push(name);
                            c.push('\').fnAction(\'');
                            c.push(Scope);
                            c.push('\',\'');
                            c.push(FnRowEvent);
                            c.push('\',');
                            c.push(i);
                            c.push(');"');
                        }
                        if (FnRowdblClickEvent != '') {
                            c.push(' ondblclick="$$table(\'');
                            c.push(name);
                            c.push('\').fnAction(\'');
                            c.push(Scope);
                            c.push('\',\'');
                            c.push(FnRowdblClickEvent);
                            c.push('\',');
                            c.push(i);
                            c.push(');"');
                        }
                        if (FnRowClass) {
                            c.push(' class="');
                            c.push(extension($[nameObj].FnRowClass, columns, i));
                            c.push('"');
                        }
                        c.push('>');
                        if (Edit) {
                            if ($[nameObj].FnExtensionEditButton == '') {
                                c.push('<td><i class="fa fa-pencil btn-edit" style="cursor:pointer" onclick="$$table(\'');
                                c.push(name);
                                c.push('\').fnAction(\'');
                                c.push(Scope);
                                c.push('\',\'');
                                c.push(FnEdit);
                                c.push('\',');
                                c.push(i);
                                c.push(');"></i></td>');
                            }
                            else {
                                c.push('<td>');
                                c.push(extension($[nameObj].FnExtensionEditButton, columns, i, 'E'));
                                c.push('</td>');
                            }
                        }
                        var _index;
                        for (var j = 0; j < cColumns; j++) {
                            _index = Indexs[j];
                            if (ShowColumns[j]) {
                                c.push('<td ');
                                if (FnColumStyle != '') {
                                    if (FnColumStyle.split(",")[j]) {
                                        c.push(extension(FnColumStyle.split(",")[j], columns, i));
                                    }
                                }
                                if (FnColumnStyle != '') {
                                    if (FnColumnStyle.split(",")[j]) {
                                        c.push(extension(FnColumnStyle.split(",")[j], columns, j));
                                    }
                                }
                                var NoSelect = "";
                                if ($[nameObj].Selected == false) {
                                    NoSelect = "NoSelected";
                                }
                                if (eDataType) {
                                    switch (dataType[j]) {
                                        case 'N':
                                            c.push(' class= "text-right ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(columns[_index]);
                                            break;
                                        case 'S_R':
                                            c.push(' class= "text-right ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(columns[_index]);
                                            break;
                                        case 'D':
                                            c.push(' class= "text-center ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            if (columns[_index] == 0) c.push('');
                                            else c.push($frFormatoFecha((new Date(columns[_index])).toLocaleString('es-PE', optionDate))); //c.push((new Date(columns[j])).toLocaleString('es-PE', optionDate));
                                            break;
                                        case 'DE':
                                            c.push(' class= "text-right ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push($frDecimal(columns[_index]));
                                            break;
                                        case 'DT':
                                            c.push(' class= "text-center ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            if (columns[_index] == 0) c.push('');
                                            else c.push((new Date(columns[_index])).toLocaleString('es-PE', optionDateTime));
                                            break;
                                        case 'SC':
                                        case 'NC':
                                        case 'B':
                                            c.push(' class= "text-center ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(columns[_index]);
                                            break;
                                        case 'A':
                                            c.push(' class= "text-center ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(extension($[nameObj].FnExtensions[j], columns, i, null, null, _index));
                                            break;
                                        case 'A_L':
                                            c.push(' class= "text-left ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(extension($[nameObj].FnExtensions[j], columns, i, null, null, _index));
                                            break;
                                        case 'A_R':
                                            c.push(' class= "text-right ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(extension($[nameObj].FnExtensions[j], columns, i, null, null, _index));
                                            break;
                                        default:
                                            c.push(' class= "text-left ');
                                            c.push(NoSelect);
                                            c.push('">');
                                            c.push(columns[_index]);
                                            break;
                                    }
                                }
                                else {
                                    c.push(' class= "text-left ');
                                    c.push(NoSelect);
                                    c.push('">');
                                    c.push(columns[_index]);
                                }
                                c.push('</td>');
                            }
                        }
                        if (Delete) {
                            if ($[nameObj].FnExtensionDeleteButton == '') {
                                c.push('<td><i class="fa fa-trash-o btn-delete-table" style="cursor:pointer" onclick="$$table(\'');
                                c.push(name);
                                c.push('\').fnAction(\'');
                                c.push(Scope);
                                c.push('\',\'');
                                c.push(FnDelete);
                                c.push('\',');
                                c.push(i);
                                c.push(');"></i></td>');
                            }
                            else {
                                c.push('<td>');
                                c.push(extension($[nameObj].FnExtensionDeleteButton, columns, i, 'D'));
                                c.push('</td>');
                            }
                        }
                        if (cActions > 0) {
                            for (var k = 0; k < cActions; k++) {
                                c.push('<td><i class="fa fa-');
                                c.push(Icons[k]);
                                c.push('" style="color: #62a8ea;cursor:pointer" onclick="$$table(\'');
                                c.push(name);
                                c.push('\').fnAction(\'');
                                c.push(Scope);
                                c.push('\',\'');
                                c.push(FnActions[k]);
                                c.push('\',');
                                c.push(i);
                                c.push(');"></i></td>');
                            }
                        }
                        c.push('</tr>');
                    }
                }
            }
            else {
                c.push('<tr><td class="text-center" colspan="');
                c.push($[nameObj].Headers.length + ($[nameObj].Edit ? 1 : 0) + ($[nameObj].Delete ? 1 : 0) + cActions);
                c.push('">');
                var lang = findLanguage($[nameObj].Lang);
                c.push(lang.NoDataFound);
                c.push('</td></tr>');
                document.getElementById('currentPage' + name).innerHTML = 0;
                document.getElementById('totalPages' + name).innerHTML = 0;
                document.getElementById('totalEntries' + name).innerHTML = 0;
            }
            document.getElementById('tBody' + name).innerHTML = c.join('');
            if ($[nameObj].Pagination) {
                createPagination();
            }
            if ($[nameObj].TotalRegistros >= $[nameObj].ShowSearch || $[nameObj].ShowSearch == undefined) {
                if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
                    if ($[nameObj].FilterField == true) {
                        if (!$[nameObj].HideFilterHeader) {
                            document.getElementById(controlName).getElementsByTagName("thead")[1].classList.remove("hide");
                        }
                    }
                }
            }
            else {
                if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
                    document.getElementById(controlName).getElementsByTagName("thead")[1].classList.add("hide");
                }
            }
        }
    };
    var selectedCurrentPage = function () {
        var page = document.getElementById("goPage" + controlName + $['jtse-table' + controlName].IndexCurrentPage);
        if (page != undefined) page.className += " active";
    };
    var createPagination = function () {
        if (ctrl != undefined && $['jtse-table' + controlName] != undefined) {
            var name = controlName;
            var nameObj = 'jtse-table' + controlName;
            var cEntries = $[nameObj].Matrix.length;
            var indexLastPage = Math.floor(cEntries / $[nameObj].EntriesPage);
            if (cEntries % $[nameObj].EntriesPage == 0) indexLastPage--;
            var indexLastRange = Math.floor(cEntries / ($[nameObj].RangePage * $[nameObj].EntriesPage));
            if (cEntries % ($[nameObj].RangePage * $[nameObj].EntriesPage) == 0) indexLastRange--;
            var content = "";
            var start = $[nameObj].IndexCurrentRange * $[nameObj].RangePage;
            var end = start + $[nameObj].RangePage;
            if ($[nameObj].IndexCurrentRange > 0 && cEntries > ($[nameObj].RangePage * $[nameObj].EntriesPage)) {
                content += "<span class='pagination-button' onclick='$$table(\"";
                content += name;
                content += "\").pagination(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
                content += "<span class='pagination-button' onclick='$$table(\"";
                content += name;
                content += "\").pagination(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
            }

            for (var i = start; i < end; i += 1) {
                if (i <= indexLastPage) {
                    content += "<span onclick='$$table(\"";
                    content += name;
                    content += "\").pagination(";
                    content += i;
                    content += ");'  title='Ir a la pagina ";
                    content += (i + 1).toString();
                    content += "' id='goPage";
                    content += name;
                    content += i.toString();
                    content += "' class='pagination-button' >";
                    content += (i + 1).toString();
                    content += "</span>";
                } else break;
            }
            if ($[nameObj].IndexCurrentRange < indexLastRange && cEntries > ($[nameObj].RangePage * $[nameObj].EntriesPage)) {
                content += "<span class='pagination-button' onclick='$$table(\"";
                content += name;
                content += "\").pagination(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
                content += "<span class='pagination-button' onclick='$$table(\"";
                content += name;
                content += "\").pagination(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
            }

            if (cEntries <= $[nameObj].EntriesPage) {
                document.getElementById('pagination' + name).innerHTML = "";
                //var ShowPages = $['jtseTable' + name].EntriesPage;
                //if ($[nameObj].Data.length <= $[nameObj].EntriesPage && $[nameObj].Matrix.length <= 10) {
                //	if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
                //		document.getElementById(controlName).getElementsByTagName("thead")[1].classList.add("hide");
                //	}
                //} else {
                //	if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
                //		document.getElementById(controlName).getElementsByTagName("thead")[1].classList.remove("hide");
                //	}
                //}

            }
            else {
                document.getElementById('pagination' + name).innerHTML = content;
                selectedCurrentPage();
                //if (document.getElementById(controlName).getElementsByTagName("thead")[1]) {
                //	document.getElementById(controlName).getElementsByTagName("thead")[1].classList.remove("hide");
                //}
            }

        }
    };
    var pagination = function (indexPage) {
        if (ctrl != undefined && $['jtse-table' + controlName] != undefined) {
            var nameObj = 'jtse-table' + controlName;
            var cEntries = $[nameObj].Matrix.length;
            var isRange = (indexPage < 0);
            if (isRange) {
                var indexLastPage = Math.floor(cEntries / $[nameObj].EntriesPage);
                if (cEntries % $[nameObj].EntriesPage == 0) indexLastPage--;
                var indexLastRange = Math.floor(cEntries / ($[nameObj].RangePage * $[nameObj].EntriesPage));
                if (cEntries % ($[nameObj].RangePage * $[nameObj].EntriesPage) == 0) indexLastRange--;
                switch (indexPage) {
                    case -1:
                        indexPage = 0;
                        $[nameObj].IndexCurrentRange = 0;
                        break;
                    case -2:
                        if ($[nameObj].IndexCurrentRange > 0) {
                            $[nameObj].IndexCurrentRange--;
                            indexPage = $[nameObj].IndexCurrentRange * $[nameObj].RangePage;
                        }
                        break;
                    case -3:
                        if ($[nameObj].IndexCurrentRange < indexLastRange) {
                            $[nameObj].IndexCurrentRange++;
                            indexPage = $[nameObj].IndexCurrentRange * $[nameObj].RangePage;
                        }
                        break;
                    case -4:
                        indexPage = indexLastPage;
                        $[nameObj].IndexCurrentRange = indexLastRange;
                        break;
                }
            }
            $[nameObj].IndexCurrentPage = indexPage;
            showTable(indexPage);
        }
    };
    var exportTextExcel = function (type) {
        var columns;
        if (ctrl != undefined && $['jtse-table' + controlName]) {
            var nameObj = 'jtse-table' + controlName, fullName;
            if ($[nameObj].Matrix.length > 0) {
                var cEntries = $[nameObj].Matrix.length;
                var nFields = $[nameObj].Headers.length;
                var showColumnsExport = $[nameObj].ShowColumnsExport.slice();
                var Indexs = $[nameObj].Indexs.slice();
                var _index;
                var c = [], eDataType = false, dataType;
                var fileName = ($[nameObj].ExportName != '' ? $[nameObj].ExportName : (type == 0 ? 'CsvExport' : 'ExcelExport'));
                if (type == 0) {
                    var h = [];
                    if ($[nameObj].DataType != undefined) {
                        eDataType = true;
                        dataType = $[nameObj].DataType;
                    }
                    for (var i = 0; i < nFields; i++) {
                        if (showColumnsExport[i]) {
                            if ($[nameObj].Headers[i] != "") {
                                h.push($[nameObj].Headers[i].replace(/(<br\/>)/ig, " "));
                            }
                        }
                    }
                    c.push(h.join(','));
                    c.push('\r\n');
                    for (var i = 0; i < cEntries; i++) {
                        h = [];
                        columns = $[nameObj].Matrix[i];
                        for (var j = 0; j < nFields; j++) {
                            _index = Indexs[j];
                            if (showColumnsExport[j]) {
                                if ($[nameObj].Headers[j] != "") {
                                    ///->h.push($[nameObj].Matrix[i][j]);
                                    if (eDataType) {
                                        switch (dataType[j]) {
                                            case 'A':
                                            case 'A_L':
                                            case 'A_R':
                                                h.push(extension($[nameObj].FnExtensions[j], columns, _index, null, 'E'));
                                                break;
                                            default:
                                                h.push($[nameObj].Matrix[i][_index]);
                                        }

                                    }
                                }
                            }
                        }
                        c.push(h.join(','));
                        if (i < cEntries - 1) c.push('\r\n');
                    }
                    var formBlob = new Blob([c.join('')], {
                        encoding: "UTF-8", type: 'text/plain;charset=UTF-8'
                    });
                    fullName = fileName + '.txt';
                }
                else {
                    if ($[nameObj].DataType != undefined) {
                        eDataType = true;
                        dataType = $[nameObj].DataType;
                    }
                    var optionDate = { "year": "numeric", "month": "2-digit", "day": "2-digit" };
                    var optionDateTime = { "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit", "second": "2-digit" };
                    c.push('<html><head><meta charset="UTF-8"><style>');
                    c.push('.number_2{ mso-number-format:"0\.00"} .string{ mso-number-format:"\\@"} ');
                    c.push('</style></head><body><table><thead><tr>');
                    for (var i = 0; i < nFields; i++) {
                        if (showColumnsExport[i]) {
                            if ($[nameObj].Headers[i] != "") {
                                c.push('<th>');
                                c.push($[nameObj].Headers[i]);
                                c.push('</th>');
                            }
                        }
                    }
                    var obj_;
                    c.push('</tr></thead><tbody>');
                    for (var i = 0; i < cEntries; i++) {
                        columns = $[nameObj].Matrix[i];
                        c.push('<tr>');
                        for (var j = 0; j < nFields; j++) {
                            _index = Indexs[j];
                            if (showColumnsExport[j]) {
                                if ($[nameObj].Headers[j] != "") {
                                    c.push('<td style="text-align:');
                                    if (eDataType) {
                                        switch (dataType[j]) {
                                            case 'N':
                                                c.push('right">');
                                                c.push($[nameObj].Matrix[i][_index]);
                                                break;
                                            case 'DE':
                                                c.push('right" class="number_2">');
                                                c.push($[nameObj].Matrix[i][_index].toFixed(2));
                                                break;
                                            case 'D':
                                                c.push('center" class="string">');
                                                if ($[nameObj].Matrix[i][_index] == 0) c.push('');
                                                else c.push((new Date($[nameObj].Matrix[i][_index])).toLocaleString('es-PE', optionDate));
                                                break;
                                            case 'DT':
                                                c.push('center" class="string">');
                                                if ($[nameObj].Matrix[i][j] == 0) c.push('');
                                                else c.push((new Date($[nameObj].Matrix[i][_index])).toLocaleString('es-PE', optionDate));
                                                break;
                                            case 'SC':
                                            case 'NC':
                                            case 'B':
                                                c.push('left" class="string">');
                                                c.push($[nameObj].Matrix[i][_index]);
                                                break;
                                            case 'A':
                                            case 'A_L':
                                            case 'A_R':
												/*c.push('left" class="string">');
											    var _div = document.createElement("DIV");
											    _div.innerHTML = extension($[nameObj].FnExtensions[j], columns, i);
											    if (_div.childElementCount > 0) {
											        for (var b = 0; b < _div.getElementsByClassName("control").length ; b++) {
											            obj_ = document.getElementById("div_TableProcesoRenovacion").getElementsByTagName("tbody")[0].rows[i].cells[j].getElementsByClassName("control")[b]
											            if (obj_) {
											                if (obj_.className.indexOf("hide") == -1) {
											                    if (obj_.tagName == "SELECT") {

											                        c.push(obj_.options[obj_.selectedIndex].text);
											                    }
											                    else {
											                        c.push(obj_.value);
											                    }
											                }
											            }
											        }
											        
											    } else {
											        c.push(_div.innerText);
											    }*/
                                                c.push('left" class="string">');
                                                //c.push($[nameObj].Matrix[i][j]);
                                                c.push(extension($[nameObj].FnExtensions[j], columns, _index, null, 'E'));
                                                break;
                                            default:
                                                c.push('left" class="string">');
                                                var _div = document.createElement("DIV");
                                                _div.innerHTML = $[nameObj].Matrix[i][_index];

                                                c.push(_div.innerText);
                                                break;
                                        }
                                    }
                                    else {
                                        c.push('left" class="string">');
                                        c.push($[nameObj].Matrix[i][_index]);
                                    }
                                    c.push('</td>');
                                }
                            }
                        }
                        c.push('</tr>');
                    }
                    c.push('</tbody></table></body></html>');
                    var formBlob = new Blob([c.join('')], {
                        encoding: "UTF-8", type: 'application/vnd.ms-excel;charset=UTF-8'
                    });
                    fullName = fileName + '.xls';
					/*var a = document.createElement('A');
					a.download = fileName + '.xls';
					a.href = window.URL.createObjectURL(formBlob);
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);*/
                }
                if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/))) {
                    navigator.msSaveOrOpenBlob(formBlob, fullName);
                }
                else {
                    var a = document.createElement('A');
                    a.download = fullName;
                    a.href = window.URL.createObjectURL(formBlob);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            }
            else {
                var lang = findLanguage($[nameObj].Lang);
                console.log(lang.NoDataFound);
            }
        }
    };
    var extension = function (extension, columns, index, button, esExportacion, poscolumna) {
        if (ctrl != undefined && $['jtse-table' + controlName] != undefined) {
            var name = controlName, c = [];
            var nameObj = 'jtse-table' + name;
            if (button != undefined) return $[$[nameObj].Scope][extension](columns, index, button);
            else return $[$[nameObj].Scope][extension](columns, index, controlName, esExportacion, poscolumna);
        }
    };
    var $filter = function (o) {
        var filters = document.getElementsByName("filter" + controlName);
        var cFilters = filters.length;
        for (var i = 0; i < cFilters; i++) {
            if (i == o.index) filters[i].value = o.value;
            else filters[i].value = '';
        }
    };
    return {
        create: function (d) {
            $create(d);
        },
        setData: function (d) {
            $setData(d);
        },
        showTable: function (i) {
            showTable(i);
        },
        clearTable: function () {
            $clearTable();
        },
        pagination: function (indexPage) {
            pagination(indexPage);
        },
        setMatrix: function (i, n, v) {
            $['jtse-table' + controlName].Matrix[i][n] = v;
        },
        setMatrixTabla: function (_matrix) {
            $['jtse-table' + controlName].Matrix = _matrix;
            showTable(0);
        },
        setDataTabla: function (_data) {
            $['jtse-table' + controlName].Matrix = _data.slice();
            $['jtse-table' + controlName].Data = _data.slice();
            showTable(0);
        },
        fnAction: function (scope, fn, rowId) {
            if ($[scope][fn] != undefined)
                $[scope][fn]($['jtse-table' + controlName].Matrix[rowId], rowId);
            else console.log(fn + _msgError.m5);
        },
        filter: function (o) {
            $filter(o);
        },
    };
};