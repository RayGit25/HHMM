var sucursalId, sucursal, urlBase, ss;
var mensajeValidacion = [];
var matrizgarbage = "";
var tipoReporte = 0;
var periodoMeses = 0;
window.onload = function () {
    sucursalId = window.parent.parent.document.getElementById("isuc").value.split("|")[0];
    sucursal = window.parent.parent.document.getElementById("isuc").value.split("|")[1];
    urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
    ss = window.parent.parent.document.getElementById("iss").value;
    var url = urlBase + "Control/ListasReporteDetalladoProvision/?ss=" + ss + "&su=" + sucursalId;
    $.ajax(url, "get", listarCombo);
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
    var reporteSelecion = document.getElementById("reporteSelecion");
    var ancho = reporteSelecion.getBoundingClientRect().width;
    if (ancho <= 800) {
        reporteSelecion.style.textAlign = "left";
    } else {
        reporteSelecion.style.textAlign = "center";
    }
}
var get = function (url, callBack) {
    requestServerXHR("get", url, callBack);
}

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
function listarCombo(rpta) {
    if (rpta != "") {
        periodoMeses = document.getElementById("hdfPeriodo").value;
        var data = rpta.split("¬");
        var listaPeriodo = data[0] != "" ? data[0].split("¯") : [];
        var listaTadm = data[1] != "" ? data[1].split("¯") : [];
        var listaEspecialidad = data[2] != "" ? data[2].split("¯") : [];
        llenarCombo(listaPeriodo, "ddlPeriodo1");
        llenarCombo(listaPeriodo, "ddlPeriodo2");
        llenarCombo(listaTadm, "ddlTipoAdm", "");
        llenarCombo(listaEspecialidad, "ddlEspecialidad", "");
    }
    configurarControles();
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

function abrirPopup(objeto) {
    var popup = document.getElementById(objeto);
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
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
function validarBusqueda() {
    var doc = document;
    //var txtMedico = doc.getElementById("txtMedico");
    //var txtEmpresa = doc.getElementById("txtEmpresa");
    var ddlPeriodo1 = doc.getElementById("ddlPeriodo1");
    var ddlPeriodo2 = doc.getElementById("ddlPeriodo2");
    var periodo1 = ddlPeriodo1.options[ddlPeriodo1.selectedIndex].text.split("-");
    var periodo2 = ddlPeriodo2.options[ddlPeriodo2.selectedIndex].text.split("-");
    mensajeValidacion = [];
    var validar = document.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }

    var mensajePeriodo = validarCombo(ddlPeriodo1.id, "Periodo", true);
    if (mensajePeriodo != "") {
        mensajeValidacion[ddlPeriodo1.getAttribute("data-secuencia")] = mensajePeriodo;
        ddlPeriodo1.className += " error";
    }
    mensajePeriodo = validarCombo(ddlPeriodo2.id, "Periodo", true);
    if (mensajePeriodo != "") {
        mensajeValidacion[ddlPeriodo2.getAttribute("data-secuencia")] = mensajePeriodo;
        ddlPeriodo2.className += " error";
    }
    mensajePeriodo = validarComboRangos(periodo1, periodo2, "Periodo");
    if (mensajePeriodo != "") {
        mensajeValidacion[ddlPeriodo1.getAttribute("data-secuencia")] = mensajePeriodo;
        ddlPeriodo1.className += " error";
    }
    //Validacion de 6 Meses de diferencia entre periodos
    mensajePeriodo = validarComboPeriodo(periodo1, periodo2, "Periodo");
    if (mensajePeriodo != "") {
        mensajeValidacion[ddlPeriodo2.getAttribute("data-secuencia")] = mensajePeriodo;
        ddlPeriodo2.className += " error";
    }

    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
    }
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
function validarComboRangos(Texto1, Texto2, Mensaje) {
    if (Texto1[0] > Texto2[0]) {
        return 'Seleccione ' + Mensaje;
    }
    else if (Texto1[0] == Texto2[0]) {
        if (parseInt(Texto1[1]) > parseInt(Texto2[1])) {
            return 'Seleccione ' + Mensaje;
        }
    }
    return "";
}
function validarComboPeriodo(Texto1, Texto2, Mensaje) {
    if (Texto1[0] == Texto2[0]) {
        //if ((parseInt(Texto2[1]) - parseInt(Texto1[1]) + 1) > periodoMeses)
        //    return 'Periodo no puede ser mayor a ' + periodoMeses.toString() + ' meses';
    }
    return "";
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
        }
    }
    return "";
}
function llenarCombo(lista, nombreCombo, titulo) {
    var contenido = "";
    var n = lista.length;
    var valor = "";
    var campos = "";
    contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";

    for (var x = 0; x < n; x++) {
        campos = lista[x].split("¦");
        contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";

    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}
function configurarControles() {
    var doc = document;

    var validar = doc.getElementsByClassName("validar");
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

    var spnDoctor = doc.getElementById("spnDoctor");
    spnDoctor.onclick = function () {
        var ifrMedico = document.getElementById("ifrMedico");
        if (ifrMedico.innerHTML == "") {
            ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupMedico");
    }

    var hdfMedico = doc.getElementById("hdfMedico");
    hdfMedico.onchange = function () {
        if (this.value != "0") {
            var datos = this.value.split("¦");
            this.value = datos[0];
            document.getElementById("txtMedico").value = datos[1];
        }
    }

    var spnEmpresa = doc.getElementById("spnEmpresa");
    spnEmpresa.onclick = function () {
        var ifrEmpresa = document.getElementById("ifrEmpresa");
        if (ifrEmpresa.innerHTML == "") {
            ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupEmpresa");
    }

    var hdfEmpresa = doc.getElementById("hdfEmpresa");
    hdfEmpresa.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            this.value = datos[0];
            var txtEmpresa = document.getElementById("txtEmpresa");
            txtEmpresa.value = datos[1];
        }
    }

    var btnLimpiar = doc.getElementById("btnLimpiar");
    btnLimpiar.onclick = function () {
        mensajeValidacion = [];
        var validar = doc.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].className.indexOf("error") > -1) {
                validar[x].className = validar[x].className.split("error").join("").trim();
            }
            validar[x].value = "";
        }
        doc.getElementById("hdfMedico").value = "0";
        doc.getElementById("hdfEmpresa").value = "0";
        doc.getElementById("ddlPeriodo1").value = "";
        doc.getElementById("ddlPeriodo2").value = "";
        doc.getElementById("ddlTipoAdm").value = "";
        doc.getElementById("ddlEspecialidad").value = "";
        doc.getElementById("txtEmpresa").value = "";
        doc.getElementById("txtMedico").value = "";

    }
    //var btnBuscar = doc.getElementById("btnBuscar");
    //btnBuscar.onclick = function () {
    //    if (validarBusqueda()) {
    //        var strDatos = "";
    //        var hdfMedico = doc.getElementById("hdfMedico").value,
    //            hdfEmpresa = doc.getElementById("hdfEmpresa").value,
    //            ddlPeriodo1 = doc.getElementById("ddlPeriodo1").value,
    //            ddlPeriodo2 = doc.getElementById("ddlPeriodo2").value,
    //            ddlTipoAdm = doc.getElementById("ddlTipoAdm").value,
    //            ddlEspecialidad = doc.getElementById("ddlEspecialidad").value;
    //        ddlTipoReporte = doc.getElementById("ddlTipoReporte").value;
    //        strDatos = sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
    //        var url = urlBase + "Control/listarReporteDetallado/?ss=" + ss + "&tipo=" + ddlTipoReporte;
    //        $.ajax(url, "post", Exportar, strDatos);
             //var xhr = new XMLHttpRequest();
            //xhr.open("post", url);
            //xhr.responseType = 'blob';
            //xhr.onreadystatechange = function () {
            //    if (xhr.status == 200 && xhr.readyState == 4) {
            //        descargaExcel(xhr.response);
            //    }
            //}
            //xhr.send(strDatos);
   //        document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
    //        this.onclick = null;
    //        tipoReporte = ddlTipoReporte;
    //    }
    //}
    //Proceso que genera un XLS en el Servidor, usando cadenas
    //30/10/2019
    //var btnBuscar = doc.getElementById("btnBuscar");
    //btnBuscar.onclick = function () {
    //    if (validarBusqueda()) {
    //        var strDatos = "";
    //        var hdfMedico = doc.getElementById("hdfMedico").value,
    //            hdfEmpresa = doc.getElementById("hdfEmpresa").value,
    //            ddlPeriodo1 = doc.getElementById("ddlPeriodo1").value,
    //            ddlPeriodo2 = doc.getElementById("ddlPeriodo2").value,
    //            ddlTipoAdm = doc.getElementById("ddlTipoAdm").value,
    //            ddlEspecialidad = doc.getElementById("ddlEspecialidad").value;
    //        ddlTipoReporte = doc.getElementById("ddlTipoReporte").value;
    //        strDatos = ddlTipoReporte + "|" + sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + ddlPeriodo2 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
    //        var hojas = "Produccion|Horario|Monto_Fijo";
    //        var url = urlBase + "Control/listarReporteDetalladoV5/?ss=" + ss + "&hojas=" + hojas;
    //        $.ajax(url, "post", Exportar, strDatos);
    //        document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
    //        this.onclick = null;
    //        tipoReporte = ddlTipoReporte;
    //    }
    //}

    //Proceso que genera un XLSX en el Servidor, y lo descarga en el Cliente
    //13/11/2019
    var btnBuscar2 = document.getElementById("btnBuscar2");
    btnBuscar2.onclick = function () {
        if (validarBusqueda()) {
            var strDatos = "";
            var hdfMedico = document.getElementById("hdfMedico").value,
                hdfEmpresa = document.getElementById("hdfEmpresa").value,
                ddlPeriodo1 = document.getElementById("ddlPeriodo1").value,
                ddlPeriodo2 = document.getElementById("ddlPeriodo2").value,
                ddlTipoAdm = document.getElementById("ddlTipoAdm").value,
                ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            ddlTipoReporte = document.getElementById("ddlTipoReporte").value;
            strDatos = ddlTipoReporte + "|" + sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + ddlPeriodo2 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
            var hojas = "Produccion|Horario|Monto_Fijo";
            var nombre = ddlTipoReporte == "1" ? "ReporteDetalladoProvision.xlsx" : "ReporteDetalladoPlanilla.xlsx";
            var sp = "uspReporteDetalladoListarV5";
            var url = urlBase + "Control/listarReporteDetalladoGEN/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre + "&sp=" + sp;
            postDownload(url, descargaExcelXLSx, strDatos);
            document.getElementById("btnBuscar2").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }
    }
}
function ExportarXls(r) {
    document.getElementById("btnBuscar").innerHTML = "Procesando";
    var btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.onclick = function () {
        if (validarBusqueda()) {
            var strDatos = "";
            var hdfMedico = document.getElementById("hdfMedico").value,
                hdfEmpresa = document.getElementById("hdfEmpresa").value,
                ddlPeriodo1 = document.getElementById("ddlPeriodo1").value,
                ddlPeriodo2 = document.getElementById("ddlPeriodo2").value,
                ddlTipoAdm = document.getElementById("ddlTipoAdm").value,
                ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            ddlTipoReporte = document.getElementById("ddlTipoReporte").value;
            //strDatos = sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
            //var url = urlBase + "Control/listarReporteDetallado/?ss=" + ss + "&tipo=" + ddlTipoReporte;
            strDatos = ddlTipoReporte + "|" + sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + ddlPeriodo2 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
            var hojas = "Produccion|Horario|Monto_Fijo";
            var url = urlBase + "Control/listarReporteDetalladoV6/?ss=" + ss + "&hojas=" + hojas;
            $.ajax(url, "post", ExportarXls, strDatos);
            //$.ajax(url, "post", Exportar, strDatos);
            document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
            tipoReporte = ddlTipoReporte;
        }
    }
    descargaExcel(r);
}
function descargaExcel(rpta) {
    if (rpta.size > 0) {
        var a = document.createElement("a");
        var formBlob = new Blob([rpta], { type: 'application/zip' });
        var reporteActual = "Reporte_Detallado_de_Provision.zip";
        a.download = "Reporte_Detallado_de_Provision.zip";
        a.href = URL.createObjectURL(rpta);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    else {
        mostraralerta("No se ha generado el archivo");
    }
    var btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.innerHTML = "Descargar";
    btnBuscar.disabled = false;
    btnBuscar.style.pointerEvents = "auto";
    document.getElementById("btnBuscar").disabled = false;
    document.getElementById("btnBuscar").style.pointerEvents = "auto";
    //document.getElementById("ddlReporteConsolidado").disabled = false;
    //document.getElementById("ddlReporteConsolidado").style.pointerEvents = "auto";
}
function descargaExcelXLSx(rpta) {
    var btnBuscar2 = document.getElementById("btnBuscar2");
    btnBuscar2.onclick = function () {
        if (validarBusqueda()) {
            var strDatos = "";
            var hdfMedico = document.getElementById("hdfMedico").value,
                hdfEmpresa = document.getElementById("hdfEmpresa").value,
                ddlPeriodo1 = document.getElementById("ddlPeriodo1").value,
                ddlPeriodo2 = document.getElementById("ddlPeriodo2").value,
                ddlTipoAdm = document.getElementById("ddlTipoAdm").value,
                ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
            ddlTipoReporte = document.getElementById("ddlTipoReporte").value;
            strDatos = ddlTipoReporte + "|" + sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + ddlPeriodo2 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
            var hojas = "Produccion|Horario|Monto_Fijo";
            var nombre = ddlTipoReporte == "1" ? "ReporteDetalladoProvision.xlsx" : "ReporteDetalladoPlanilla.xlsx";
            var sp = "uspReporteDetalladoListarV5";
            var url = urlBase + "Control/listarReporteDetalladoGEN/?ss=" + ss + "&hojas=" + hojas + "&nombre=" + nombre + "&sp=" + sp;
            postDownload(url, descargaExcelXLSx, strDatos);
            document.getElementById("btnBuscar2").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }

    }
    if (rpta != null) {
        ddlTipoReporte = document.getElementById("ddlTipoReporte").value;
        var nombre = ddlTipoReporte == "1" ? "ReporteDetalladoProvision.xlsx" : "ReporteDetalladoPlanilla.xlsx";

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
    var btnBuscar = document.getElementById("btnBuscar2");
    btnBuscar.innerHTML = "Descargar";
    btnBuscar.disabled = false;
    btnBuscar.style.pointerEvents = "auto";
    document.getElementById("btnBuscar2").disabled = false;
    document.getElementById("btnBuscar2").style.pointerEvents = "auto";
}
function Exportar(r) {
    if (r != "" && r != "¬") {
        /************************************************/
        var btnBuscar = document.getElementById("btnBuscar");
        btnBuscar.onclick = function () {
            if (validarBusqueda()) {
                var strDatos = "";
                var hdfMedico = document.getElementById("hdfMedico").value,
                    hdfEmpresa = document.getElementById("hdfEmpresa").value,
                    ddlPeriodo1 = document.getElementById("ddlPeriodo1").value,
                    ddlPeriodo2 = document.getElementById("ddlPeriodo2").value,
                    ddlTipoAdm = document.getElementById("ddlTipoAdm").value,
                    ddlEspecialidad = document.getElementById("ddlEspecialidad").value;
                ddlTipoReporte = document.getElementById("ddlTipoReporte").value;
                //strDatos = sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
                //var url = urlBase + "Control/listarReporteDetallado/?ss=" + ss + "&tipo=" + ddlTipoReporte;
                strDatos = ddlTipoReporte + "|" + sucursalId + "|" + (hdfMedico == "0" ? "0" : hdfMedico) + "|" + (hdfEmpresa == "0" ? "0" : hdfEmpresa) + "|" + ddlPeriodo1 + "|" + ddlPeriodo2 + "|" + (ddlTipoAdm == "" ? "0" : ddlTipoAdm) + "|" + (ddlEspecialidad == "" ? "0" : ddlEspecialidad);
                var url = urlBase + "Control/listarReporteDetalladoV5/?ss=" + ss;
                $.ajax(url, "post", ExportarXls, strDatos);
                //$.ajax(url, "post", Exportar, strDatos);
                document.getElementById("btnBuscar").innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                this.onclick = null;
                tipoReporte = ddlTipoReporte;
            }
        }
        /************************************************/
        var data = r.split("¬"), nRgs = 0, campos, objExls = {};
        var dtPro = data[0].split("¯"), dtHor = data[1].split("¯"), dtPer = data[2].split("¯");
        if (tipoReporte == "1") {
            MtzPro = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "Inc. Automática", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING", "Indicador Honorario",
                "EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
                "Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo", "Cuenta Proveedor", "Id.Doc.Contable",
                "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision", "Indicador No Visible Planilla", "Excluido Provisión"]];
            /*MtzPro = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "Inc. Automática", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla SPRING", "Id Estado Planilla SPRING", "Indicador Honorario",
                "EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
                "Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "Cuenta Costo", "Cuenta Proveedor", "Id.Doc.Contable",
                "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision", "Indicador No Visible Planilla"]];*/
            MtzHor = [["SucursalId", "Sucursal", "Periodo", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico",
                "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "Cuenta Costo", "Cuenta Proveedor",
                "Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];
            MtzPer = [["Periodo", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe",
                "Concepto Monto Fijo Id", "Concepto", "Cuenta Costo", "Cuenta Proveedor",
                "Id.Doc.Contable", "Id Planilla Web", "Estado Planilla Web", "Tipo Documento Pago", "Numero Documento", "Fecha Emision"]];
        } else {
            MtzPro = [["Periodo Planilla", "Periodo Provision", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "TipoAdmisión", "CodigoOA", "IdOrdenAtencion", "Línea Orden", "IdExpediente", "Codigo Prestación", "Prestación", "PeriodoProduccion", "TipoRegistro", "Inc. Automática", "F. Atención", "Fecha Atendido", "Fecha Termino", "Precio Unitario", "Costo Prest.", "Cantidad", "Monto Imponible", "Valor Medida", "Tipo Valor", "Valor", "Porcentaje", "Parte Médico", "Bonificación", "F. Inicio OA", "Tipo Paciente", "Tipo Atención", "Aseguradora", "Servicio", "Mod. Facturación", "Especialidad", "Estado Prestación", "Estado Registro", "Ajuste", "Total Provisión", "Paciente", "Ajuste ProcesoId", "Id Planilla", "Id Estado Planilla", "Indicador Honorario",
                "EstadoHospitalizacion", "SituacionDetalleHospitalizacion", "IndicadorEliminado", "SituacionDetalleExpediente",
                "Estado Planilla", "Fecha Hora Creación", "Estado Provisión", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago", "Id.Doc.Contable"]];
            MtzHor = [["SucursalId", "Sucursal", "Periodo Planilla", "Periodo Provision", "IdEmpresa", "Empresa", "Id Médico", "Médico", "Fecha", "Hora Inicio", "Hora Fin", "Horas Programadas", "Día", "Indicador Feriado", "Valor Contrato", "Parte Médico", "Bonificación", "Total", "Especialidad", "Tipo Atención", "Estado", "Unidad Medica Id", "Unidad Medica", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago"]];
            MtzPer = [["Periodo Planilla", "Periodo Provision", "SucursalId", "Sucursal", "IdEmpresa", "Empresa", "IdMedico", "Médico", "Descripción", "Importe", "Concepto Monto Fijo Id", "Concepto", "PlanillaWebId", "Estado Planilla Web", "TipoDocumentoPagoId", "TipoDocumentoPago", "Fecha Emisión", "Cuenta Provision", "Cuenta Pago"]];

        }
        var currency = { id: 2 };

        for (var i = 0; i < 3; i += 1) {
            switch (i) {
                case 0:
                    nRgs = (dtPro[0] != "" ? dtPro.length : 0);
                    break;
                case 1:
                    nRgs = (dtHor[0] != "" ? dtHor.length : 0);
                    break;
                case 2:
                    nRgs = (dtPer[0] != "" ? dtPer.length : 0);
                    break;
            }

            for (var j = 0; j < nRgs; j += 1) {
                switch (i) {
                    case 0:
                        campos = dtPro[j].split("¦");

                        if (tipoReporte == "1") campos[16] = (campos[16] == "False" ? "No" : "Sí");
                        else campos[17] = (campos[17] == "False" ? "No" : "Sí");
                        MtzPro.push(campos);
                        break;
                    case 1:
                        campos = dtHor[j].split("¦");
                        if (tipoReporte == "1") campos[12] = (campos[12] == "False" ? "No" : "Sí");
                        else campos[13] = (campos[13] == "False" ? "No" : "Sí");
                        MtzHor.push(campos);
                        break;
                    case 2:
                        campos = dtPer[j].split("¦");
                        if (tipoReporte == "1") {
                            campos[3] = campos[3] * 1;
                            campos[5] = campos[5] * 1;
                            campos[9] = campos[9] * 1;
                            campos[8] = campos[8] * 1;
                        } else {
                            campos[4] = campos[4] * 1;
                            campos[6] = campos[6] * 1;
                            campos[10] = campos[10] * 1;
                            campos[9] = campos[9] * 1;
                        }
                        MtzPer.push(campos);
                        break;

                }
            }
        }
        var datos = "";
        var formBlob;
        var anchorElem;
        var elem;
        if (MtzPro.length > 1 || MtzHor.length > 1 || MtzPer.length > 1) {
            datos = exportarExcel(MtzPro, MtzHor, MtzPer);
        }
        if (datos != "") {
            anchorElem = document.createElement('a');
            formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
            anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
            anchorElem.setAttribute("download", (tipoReporte == "1" ? "ReporteDetalladoProvision.xls" : "ReporteDetalladoPlanilla.xls"));
            anchorElem.setAttribute("id", "atemp");
            document.body.appendChild(anchorElem);
            anchorElem.click();
            elem = document.getElementById("atemp");
            elem.parentNode.removeChild(elem);
        } else {
            mostraralerta("No se encontraron registros");
        }
        btnBuscar.innerHTML = "Descargar";

    } else {
        btnBuscar.innerHTML = "Descargar";
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

function exportarExcel(matriz1, matriz2, matriz3) {
    var contenido = "";
    if (matriz1.length > 0 || matriz2.length > 0 || matriz3.length > 0) {
        contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
        var n = 0, ncampos, matriz = [], nombre = "", matrizAnchos = [];
        for (var x = 0; x < 3; x++) {
            switch (x) {
                case 0:
                    n = matriz1.length;
                    ncampos = matriz1[0].length;
                    matriz = matriz1.slice(0);
                    if (tipoReporte == "1") {
                        matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140,140];
                    } else {
                        matrizAnchos = [140, 140, 70, 100, 75, 405, 75, 405, 100, 80, 115, 80, 90, 120, 900, 125, 90, 90, 125, 125, 125, 100, 70, 70, 120, 100, 100, 100, 100, 100, 100, 125, 300, 100, 420, 200, 420, 120, 120, 120, 120, 650, 120, 120, 120, 120, 140, 140, 140, 140, 140, 120, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140];
                    }
                    nombre = "Producción";
                    break;
                case 1:
                    n = matriz2.length;
                    ncampos = matriz2[0].length;
                    matriz = matriz2.slice(0);
                    nombre = "Horario";
                    if (tipoReporte == "1") {
                        matrizAnchos = [70, 100, 65, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140, 140];
                    } else {
                        matrizAnchos = [70, 100, 140, 140, 75, 405, 75, 405, 125, 125, 125, 125, 70, 120, 120, 120, 120, 120, 420, 110, 70, 120, 300, 140, 140, 140, 140, 140, 140, 140];
                    }
                    break;
                case 2:
                    n = matriz3.length;
                    ncampos = matriz3[0].length;
                    matriz = matriz3.slice(0);
                    nombre = "Monto Fijo";
                    if (tipoReporte == "1") {
                        matrizAnchos = [65, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140, 140];
                    } else {
                        matrizAnchos = [140, 140, 70, 100, 75, 405, 75, 405, 650, 80, 160, 300, 140, 140, 140, 140, 140, 140, 140];
                    }
                    break;
            }

            if (n > 0) {
                contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
                switch (x) {
                    case 0:
                        for (var u = 0; u < matrizAnchos.length; u++) {
                            contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
                        }
                        break;
                    case 1:
                        for (var u = 0; u < matrizAnchos.length; u++) {
                            contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
                        }
                        break;
                    case 2:
                        for (var u = 0; u < matrizAnchos.length; u++) {
                            contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
                        }
                        break;
                }


                for (var z = 0; z < n; z++) {
                    contenido += "<Row>";
                    //console.log(matriz[z]);
                    for (y = 0; y < ncampos; y++) {
                        if (z == 0) {
                            contenido += '<Cell ss:StyleID="s79">';
                            contenido += '<Data ss:Type="String">';
                            contenido += matriz[z][y];
                        }
                        else {
                            if (tipoReporte == "1") {
                                switch (x) {
                                    case 0:
                                        switch (y) {
                                            case 3:
                                            case 5:
                                            case 9:
                                            case 10:
                                            case 11:
                                            case 42:
                                            case 43://41
                                            case 44://42
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 24:
                                                contenido += '<Cell ss:StyleID="s63">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 20:
                                            case 21:
                                            case 22:
                                            case 23:
                                            case 26:
                                            case 27:
                                            case 28:
                                            case 29:
                                            case 39:
                                            case 40:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 17:
                                            case 18:
                                            case 19:
                                            case 30:
                                            case 51:
                                            case 60:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                //contenido += '<Data ss:Type="DateTime">';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
                                                break;
                                            case 46:
                                            case 47:
                                            case 49:
                                            case 56:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y].toString();
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (y) {
                                            case 3:
                                            case 5:
                                            case 20:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 13:
                                            case 14:
                                            case 15:
                                            case 16:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 25:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            case 29:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y];
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (y) {
                                            case 3:
                                            case 5:
                                            case 9:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 8:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 14:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            case 18:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y];
                                                break;
                                        }
                                        break;
                                }
                            } else {
                                switch (x) {
                                    case 0:
                                        switch (y) {
                                            case 4:
                                            case 6:
                                            case 10:
                                            case 11:
                                            case 12:
                                            case 43:
                                            case 44://41
                                            case 45://42
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 25:
                                                contenido += '<Cell ss:StyleID="s63">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 21:
                                            case 22:
                                            case 23:
                                            case 24:
                                            case 27:
                                            case 28:
                                            case 29:
                                            case 30:
                                            case 40:
                                            case 41:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y] * 1;
                                                break;
                                            case 18:
                                            case 19:
                                            case 20:
                                            case 31:
                                            case 52:
                                            case 58:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                //contenido += '<Data ss:Type="DateTime">';
                                                contenido += '<Data ss:Type="String">';
                                                if (y == 58) {
                                                    contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
                                                } else {
                                                    contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y]);
                                                }
                                                break;
                                            case 47:
                                            case 48:
                                            case 50:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].charAt(0) == "0" ? "" : matriz[z][y]);
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y].toString();
                                                break;
                                        }
                                        break;
                                    case 1:
                                        switch (y) {
                                            case 4:
                                            case 6:
                                            case 21:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 14:
                                            case 15:
                                            case 16:
                                            case 17:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 27:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y];
                                                break;
                                        }
                                        break;
                                    case 2:
                                        switch (y) {
                                            case 4:
                                            case 6:
                                            case 10:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            case 16:
                                                contenido += '<Cell ss:StyleID="s62">';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += (matriz[z][y].indexOf("1900") > -1 ? "" : matriz[z][y].split(" ")[0]);
                                                break;
                                            case 9:
                                                contenido += '<Cell ss:StyleID="s65">';
                                                contenido += '<Data ss:Type="Number">';
                                                contenido += matriz[z][y];
                                                break;
                                            default:
                                                contenido += '<Cell>';
                                                contenido += '<Data ss:Type="String">';
                                                contenido += matriz[z][y];
                                                break;
                                        }
                                        break;
                                }
                            }
                        }
                        contenido += '</Data>';
                        contenido += '</Cell>';
                    }
                    contenido += "</Row>";
                }
                contenido += '</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><Print xmlns="urn:schemas-microsoft-com:office:excel"><ValidPrinterInfo xmlns="urn:schemas-microsoft-com:office:excel"/><HorizontalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</HorizontalResolution><VerticalResolution xmlns="urn:schemas-microsoft-com:office:excel">1200</VerticalResolution></Print><ProtectObjects xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectObjects><ProtectScenarios xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectScenarios></WorksheetOptions></Worksheet>';
            }
        }
        contenido += '</Workbook>';
    }
    return contenido;
}

