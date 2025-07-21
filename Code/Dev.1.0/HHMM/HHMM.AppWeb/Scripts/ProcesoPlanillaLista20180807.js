var lista = [];
var idCompania = "";
var listaConfiguracion = [];
var listaProvision = [];
var listaTipoAdmision = [];
var listaPeriodo = [];
var matriz = [];
var matrizTipoAdmision = [];
var matrizPeriodo = [];
var matrizDetalle = [];
var MatrizFiltroMedicosSeleccionados = [];
var MatrizMedicosSeleccionados = [];
var cabeceras = ["Sucursal", "Nro Proceso", "Descripción", "Tipo", "Periodo", "Fecha Inicio", "Fecha Final", "Cantidad", "Monto", "Estado Planilla"];
var anchos = [13, 8, 15, 5, 8, 10, 10, 8, 8, 10];
var matrizIndice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var cabecerasDetalle = ["Planilla", "Médico/Empresa", "Importe", "Bonificación", "Descuento", "Ajuste", "Total", "Tipo Documento", "Documento", "Fecha Emision", "Estado"];
var anchosDetalle = [5, 15, 9, 9, 9, 9, 9, 8, 8, 8, 12];
var matrizIndiceDetalle = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 7];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var indiceActualBloqueConf = 0;
var indiceActualPaginaConf = 0;
var textoExportar;
var excelExportar;
var excelExportarDetalle = "";
var mensajeValidacion = [];
var urlBase = "";
var idProceso = -1;
var tituloPoup = "";
var Campoeliminar = "";
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var ss;
var IndicadorPrimero = true;
var SeleccionActualProceso = "P";
var idProvision = 0;
var MedicosSeleccionados = [];
var sucursalId;
var idProvisionEnMatriz;
var NombreControl = "";
var ProcesoMedicoActual = 0;
var cabeceraEnvio = "";
var inicioEnvio = 0;
var registroEnviar = 10;
var nEnvios = 0;
var cEnvios = 0;
var datosCalculados = 0;
var ConfiguracionPagoActual = 0;

var $ = {
    ajax: function (url, type, success, text) {
        requestServer(url, type, success, text);
    }
}
var listaEmpresaMedico = [];
var listaEmpresaMedicoEspecialidad = [];
var matrizSeguridad = [];
var totales = { mtImporte: 0, mtBonificacion: 0, mtDescuento: 0, mtAjuste: 0, mtTotal: 0 };
var datosBusqueda = "";
var listaTipoDocumento = [];
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

var primerQuery = true;
var mostrarReg = true;
var cabecerasProduccion = ["PersonaId", "Médico", "Ind. Vinculada", "Orden AtencionId", "Linea OA", "Tipo Admision Id", "Tipo Admisión", "Servicio Id", "Servicio", "Especialidad Id", "Especialidad", "Clasificador Movimiento Id", "Clasificador Movimiento", "Código Prestacion", "Prestación"];
var anchosProduccion = [80, 300, 90, 115, 80, 110, 150, 80, 200, 110, 150, 170, 180, 110, 300];
var matrizProduccion = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var cabecerasMontoFijo = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Concepto Monto Fijo Id", "Concepto Monto Fijo"];
var anchosMontoFijo = [10, 8, 8, 11, 8, 8, 10];
var matrizMontoFijo = [0, 1, 2, 3, 4, 5, 6];

var cabecerasHorario = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Unidad MedicaId", "Unidad Médica"];
var anchosHorario = [10, 8, 8, 11, 8, 8, 10];
var matrizHorario = [0, 1, 2, 3, 4, 5, 6];

var cabecerasTurno = ["PersonaId", "Médico", "Ind. Vinculada", "Tipo Admision Id", "Tipo Admisión", "Unidad MedicaId", "Unidad Médica"];
var anchosTurno = [10, 8, 8, 11, 8, 8, 10];
var matrizTurno = [0, 1, 2, 3, 4, 5, 6];

var indiceActualBloque = 0, indiceActualBloqueM = 0, indiceActualBloqueP = 0, indiceActualBloqueB = 0;
var indiceOrden = 0;
var indiceActualPagina = 0, indiceActualPaginaM = 0, indiceActualPaginaP = 0, indiceActualPaginaB = 0;
var esBloque = 0;
var listaProduccion = [], listaMontoFijo = [], listaHorario = [], listaTurno = [];
var matrizProduccion = [], matrizMontoFijo = [], matrizHorario = [], matrizTurno;
var registroPaginaDetalle = 7;



window.onload = function () {
    matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
    if (matrizSeguridad.length > 0) {
        if (((matrizSeguridad[0].split("¦")[2] * 1) != 1)) {
            document.getElementById("btnRevertirObligacion").parentNode.style.display = "none";
            removeSeguridad("btnRevertirObligacion");
        }
        //if (((matrizSeguridad[1].split("¦")[2] * 1) != 1) && ((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
        if (((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
            document.getElementById("btnRevertir").parentNode.style.display = "none";
            removeSeguridad("btnRevertir");
        }
        if (((matrizSeguridad[2].split("¦")[2] * 1) != 1) && ((matrizSeguridad[3].split("¦")[2] * 1) != 1) && ((matrizSeguridad[4].split("¦")[2] * 1) != 1)) {
            document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
            removeSeguridad("btnDetalleConfirmar");
        }
    }
    var ppcabecera = document.getElementById("ppcabecera");
    ppcabecera.onresize = function () {
        var valor = (this.getBoundingClientRect().width - 180);
        document.getElementById("CerrarPlanillaDetalleConceptosOA").style.width = valor + "px";
    }
    estableceSucursal();
    buscarListas();
    crearTabla(true);
    crearTabla(false);
    //configurarOrdenacion();
    configurarFiltro();
    configurarControles();
    //definirAltura();
    if (window.sessionStorage) {

        var ParametroBusqueda = sessionStorage.getItem("ValorBusqueda");
        if (ParametroBusqueda) {
            var msg = window.sessionStorage.getItem("msgPlanilla");
            if (msg != undefined && msg != "") {
                mostraralerta(msg);
                sessionStorage.setItem("msgPlanilla", "");
            }
            ParametroBusqueda = ParametroBusqueda.split("¦");
            var txtMedico = document.getElementById("txtMedico");
            var cboMes = document.getElementById("cboMes");
            var txtAnio = document.getElementById("txtAnio");
            var txtFechaInicio = document.getElementById("txtFechaInicio");
            var txtFechaFin = document.getElementById("txtFechaFin");
            var hdfIdPaciente = document.getElementById("hdfIdPaciente");
            var hdfMedico = document.getElementById("hdfMedico");
            var txtPplanilla = document.getElementById("txtPplanilla");
            var txtPlanilla = document.getElementById("txtPlanilla");
            var txtPaciente = document.getElementById("txtPaciente");
            var txtOrden = document.getElementById("txtOrden");

            hdfMedico.value = ParametroBusqueda[0];
            txtMedico.value = ParametroBusqueda[1];
            txtPplanilla.value = ParametroBusqueda[2];
            txtPlanilla.value = ParametroBusqueda[3];
            cboMes.value = ParametroBusqueda[4];
            txtAnio.value = ParametroBusqueda[5];
            txtFechaInicio.value = ParametroBusqueda[6];
            txtFechaFin.value = ParametroBusqueda[7];
            txtOrden.value = ParametroBusqueda[8];
            hdfIdPaciente.value = ParametroBusqueda[9];
            txtPaciente.value = ParametroBusqueda[10];
            buscarProceso();
            sessionStorage.clear();
        }
    }
}

function removeSeguridad(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
    var ppcabecera = window.parent.document.getElementById("ifrPrincipal").getBoundingClientRect().width;
    var menu = window.parent.document.getElementsByTagName("ASIDE")[0];
    var valor = 0;
    if (menu.className == "pcl-menu activo") {
        valor = (ppcabecera - 500);
    }
    else {
        valor = (ppcabecera - 230);
    }
    document.getElementById("CerrarPlanillaDetalleConceptosOA").style.width = valor + "px";
    var divIfrPlanillaDetalleOA = document.getElementById('divIfrPlanillaDetalleOA');
    if (divIfrPlanillaDetalleOA != null) {
        divIfrPlanillaDetalleOA.style.height = (document.getElementById("ppcabecera").clientHeight - 150) + "px";
    }
}

function estableceSucursal() {
    var sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
    sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    document.getElementById("txtSucursal").value = sucursal;
    document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
    document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
}

function buscarListas() {
    var pos1 = window.location.href.indexOf("Proceso");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Proceso/listarProcesoListas/?ss=" + ss;

    var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
    var frm = new FormData();
    frm.append("SucursalId", sucursal);

    $.ajax(url, "post", listarInicial, frm);
}

function listarInicial(rpta) {
    listaTipoAdmision = [];
    listaPeriodo = [];
    if (rpta != "") {
        var listaGeneral = rpta.split("_");
        //listaPeriodo = listaGeneral[0].split("¯");
        listaTipoAdmision = listaGeneral[1].split("¯");
        //listaConfiguracion = listaGeneral[2].split("¯");
        //crearChecks(listaConfiguracion);
        //listarTipoAdmision();
        //listarPeriodo();
    }
}


function listarTipoAdmision() {
    crearMatrizTipoAdmision();
    mostrarMatrizTipoAdmision();
}


function crearMatrizTipoAdmision() {
    var nRegistros = listaTipoAdmision.length;
    var nCampos;
    var campos;
    var x = 0;
    matrizTipoAdmision = [];
    for (i = 0; i < nRegistros; i++) {
        campos = listaTipoAdmision[i].split("¦");
        matrizTipoAdmision[x] = [];
        nCampos = campos.length;
        for (j = 0; j < nCampos; j++) {
            if (isNaN(campos[j])) matrizTipoAdmision[x][j] = campos[j];
            else matrizTipoAdmision[x][j] = campos[j] * 1;
        }
        x++;
    }
}

function mostrarMatrizTipoAdmision() {
    var contenido = "";
    var n = matrizTipoAdmision.length;
    if (n > 0) {
        contenido += "<option value='0'>Seleccione</option>";
        for (var i = 0; i < n; i++) {
            contenido += "<option value='" + matrizTipoAdmision[i][0] + "'>" + matrizTipoAdmision[i][1] + "</option>";
        }
    }
    else {
        contenido += "<option value='0'>Seleccione</option>";
    }
    document.getElementById("cboTipoAdmisionMant").innerHTML = contenido;
}

function configurarControles() {

    var txtPplanilla = document.getElementById("txtPplanilla");
    var txtPlanilla = document.getElementById("txtPlanilla");
    txtPplanilla.onkeyup = txtPlanilla.onkeyup = function () {
        if (this.id == "txtPplanilla") {
            var txtPlanilla = document.getElementById("txtPlanilla").value;
            if (this.value == "" && txtPlanilla == "") {
                document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
                document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
            } else {
                document.getElementById("cboMes").selectedIndex = "0";
                document.getElementById("txtAnio").value = "";
            }
        } else {
            var txtPplanilla = document.getElementById("txtPplanilla").value;
            if (this.value == "" && txtPplanilla == "") {
                document.getElementById("txtAnio").value = window.parent.document.getElementById("hanio").value;
                document.getElementById("cboMes").selectedIndex = window.parent.document.getElementById("hmes").value;
            } else {
                document.getElementById("cboMes").selectedIndex = "0";
                document.getElementById("txtAnio").value = "";
            }
        }

    }


    var btnBuscarDetalleOA = document.getElementById("btnBuscarDetalleOA");
    btnBuscarDetalleOA.onclick = function () {
        var txtOADetalle = document.getElementById("txtOADetalle").value;
        if (txtOADetalle != "") {
            var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
            var ss = window.parent.document.getElementById("iss").value;
            var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
            divIfrDetalleOA.src = urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOADetalle;
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

    var btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.onclick = function () {
        if (!validarBusqueda()) return;
        buscarProceso();
    }

    var txtFechaInicio = document.getElementById("txtFechaInicio");
    txtFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtFechaInicio.readOnly = false;
    var txtFechaFin = document.getElementById("txtFechaFin");
    txtFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtFechaFin.readOnly = false;
    var hdfIdPaciente = document.getElementById("hdfIdPaciente");
    hdfIdPaciente.onchange = function () {
        if (this.value != "0") {
            var datos = this.value.split("¦");
            this.value = datos[0];
            document.getElementById("txtPaciente").value = datos[1];
        }
    }
    var spnIcoPaciente = document.getElementById("spnIcoPaciente");
    spnIcoPaciente.onclick = function () {
        var ifrPaciente = document.getElementById("ifrPaciente");
        if (ifrPaciente.innerHTML == "") {
            ifrPaciente.innerHTML = "<iframe style='margin:0;padding:0;width:800px;height:530px;border: 1px solid transparent;' src='" + urlBase + "Proceso/PacienteLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupPaciente");
    }

    var spnDoctor = document.getElementById("spnDoctor");
    spnDoctor.onclick = function () {
        var ifrMedico = document.getElementById("ifrMedico");
        if (ifrMedico.innerHTML == "") {
            ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupMedico");
    }

    var hdfMedico = document.getElementById("hdfMedico");
    hdfMedico.onchange = function () {
        if (this.value != "0") {
            var hdfOpc = document.getElementById("hdfOpc").value;
            var datos = this.value.split("¦");
            this.value = datos[0];
            document.getElementById("txtMedico").value = datos[1];
        }
    }


    var divOpcionesProvision = document.getElementById("divOpcionesProvision");
    var opciones = divOpcionesProvision.getElementsByTagName("LI");
    for (var x = 0; x < opciones.length; x++) {
        opciones[x].onclick = function () {
            MedicosSeleccionados = [];
            var divOpcionesProvision = document.getElementById("divOpcionesProvision");
            var opciones = divOpcionesProvision.getElementsByTagName("LI");
            for (y = 0; y < opciones.length; y++) {
                opciones[y].className = "";
            }
            this.className = "active";
            SeleccionActualProceso = this.getAttribute("data-estado");
            crearMatriz(false);
            paginar(0, false);
            indiceActualBloque = 0;
            var spnOpcProv1 = document.getElementById("spnOpcProv1");
            var spnOpcProv2 = document.getElementById("spnOpcProv2");
            var spnOpcProv3 = document.getElementById("spnOpcProv3");
            var spnOpcProv4 = document.getElementById("spnOpcProv4");
            var spnOpcProv5 = document.getElementById("spnOpcProv5");
            var spnOpcProv6 = document.getElementById("spnOpcProv6");
            spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
            spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
            spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
            spnOpcProv4.innerHTML = (d > 999 ? "999+" : d);
            spnOpcProv5.innerHTML = (e > 999 ? "999+" : e);
            spnOpcProv6.innerHTML = (f > 999 ? "999+" : f);
            limpiarCabeceras();
            if (document.getElementById("btnDetalleConfirmar") != null) {
                if (SeleccionActualProceso == "D" || SeleccionActualProceso == "G" || SeleccionActualProceso == "F") {
                    document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                }
                else {
                    if (SeleccionActualProceso == "P" && ((matrizSeguridad[2].split("¦")[2] * 1) != 1)) {
                        document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                    }
                    else if (SeleccionActualProceso == "C" && ((matrizSeguridad[3].split("¦")[2] * 1) != 1)) {
                        document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                    }
                    else if (SeleccionActualProceso == "O" && ((matrizSeguridad[4].split("¦")[2] * 1) != 1)) {
                        document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                    }
                    else {
                        document.getElementById("btnDetalleConfirmar").parentNode.style.display = "";
                    }
                }
            }
            if (document.getElementById("btnRevertirObligacionPagado") != null) {
                if (SeleccionActualProceso == "F" && mostrarReg) document.getElementById("btnRevertirObligacionPagado").parentNode.style.display = "";
                else document.getElementById("btnRevertirObligacionPagado").parentNode.style.display = "none";
            }
            if (document.getElementById("btnRevertirObligacion") != null) {
                if (SeleccionActualProceso == "G" && mostrarReg) document.getElementById("btnRevertirObligacion").parentNode.style.display = "";
                else document.getElementById("btnRevertirObligacion").parentNode.style.display = "none";
            }
            if (document.getElementById("btnRevertir") != null) {
                if (SeleccionActualProceso == "C" || SeleccionActualProceso == "O") {
                    if (SeleccionActualProceso == "C" && ((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
                        document.getElementById("btnRevertir").parentNode.style.display = "none";
                    }
                    //else if (SeleccionActualProceso == "O" && ((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
                    else if (SeleccionActualProceso == "O" && ((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
                        document.getElementById("btnRevertir").parentNode.style.display = "none";
                    }
                    else {
                        document.getElementById("btnRevertir").parentNode.style.display = "";
                    }
                }
                else {
                    document.getElementById("btnRevertir").parentNode.style.display = "none";
                }
            }

            if (document.getElementById("btnDetalleConfirmar") != null) {
                if (SeleccionActualProceso == "O") {
                    document.getElementById("btnDetalleConfirmar").innerHTML = "Enviar Obligación";
                    document.getElementById("btnDetalleConfirmar").parentNode.className = "tam-8";
                }
                else {
                    document.getElementById("btnDetalleConfirmar").innerHTML = "Confirmar";
                    document.getElementById("btnDetalleConfirmar").parentNode.className = "tam-5";
                }
            }
            var ocultarSeccionDiv = document.getElementsByClassName("ocultarSeccionDiv");
            if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
                for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                    ocultarSeccionDiv[j].style.display = "";
                }
            }
            else {
                for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                    ocultarSeccionDiv[j].style.display = "none";
                }
            }
            var ocultarSeccionDiv = document.getElementsByClassName("ocultarSeccionDiv");
            if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
                for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                    ocultarSeccionDiv[j].style.display = "";
                }
            }
            else {
                for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                    ocultarSeccionDiv[j].style.display = "none";
                }
            }
        }
    }

    var chkTodos = document.getElementById("chkTodos");
    chkTodos.onclick = function () {
        if (matrizDetalle.length > 0) {
            var rdnDetalle = document.getElementsByName("rdnDetalle");
            MedicosSeleccionados = [];
            if (this.checked) {
                var valor;
                for (var x = 0; x < listaProvision.length; x++) {
                    valor = listaProvision[x].split("¦");
                    if (SeleccionActualProceso == valor[7]) {
                        MedicosSeleccionados.push(valor[0] * 1);
                    }
                }
            }
        }
        paginar(0, false);
    }

    var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
    btnDetalleCancelar.onclick = function () {
        var btnBuscar = document.getElementById("btnBuscar");
        btnBuscar.click();
        var divDetalleDoctor = document.getElementById("divDetalleDoctor");
        divDetalleDoctor.style.display = "none";
        var divPrincipal = document.getElementById("divPrincipal");
        divPrincipal.style.display = "";
        SeleccionActualProceso = "P";
        ConfiguracionPagoActual = 0;
    }

    var btnDetalleConfirmar = document.getElementById("btnDetalleConfirmar");
    if (btnDetalleConfirmar != null) {
        btnDetalleConfirmar.onclick = function () {
            if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
                var strDatos = "";
                var url = "";
                var lista = MedicosSeleccionados.join("¬");
                strDatos += lista + "|";
                switch (SeleccionActualProceso) {
                    case "P":
                        strDatos += "D";
                        break;
                    case "D":
                        strDatos += "C";
                        break;
                    case "C":
                        strDatos += "O";
                        break;
                    case "O":
                        strDatos += "G|";
                        strDatos += matriz[idProvisionEnMatriz][2];
                        break;
                }
                if (SeleccionActualProceso == "O") url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
                else url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
                var mensaje = "";
                var titulo = "";
                if (SeleccionActualProceso == "P" || SeleccionActualProceso == "O") {
                    if (SeleccionActualProceso == "P") {
                        mensaje = "¿Confirmar el cambio de estado de pendiente a difundir?";
                        titulo = "CONFIRMAR CAMBIO DE ESTADO";
                    }
                    else {
                        mensaje = "¿Está seguro de generar la obligación de los registros seleccionados en el SPRING ?";
                        titulo = "INTEGRACIÓN CON SPRING";
                    }

                    document.getElementById("spnActualizarProvision").innerHTML = mensaje;
                    document.getElementById("TituloActualizarProvision").innerHTML = titulo;
                    var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                    btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
                    btngrabarActualizarProvision.onclick = null;
                    btngrabarActualizarProvision.onclick = function () {
                        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                        var data = this.getAttribute("data-datos").split("¯");
                        //abrirPopup('PopupActualizarProvision');
                        $.ajax(data[0], "post", RptaCalculo, data[1]);
                        var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                        var opciones = divOpcionesProvision.getElementsByTagName("LI");
                        for (var x = 0; x < opciones.length; x++) {
                            opciones[x].onclick = null;
                        }

                        var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
                        btnDetalleCancelar.onclick = null;

                    }
                    abrirPopup('PopupActualizarProvision');
                }
                else {
                    if (SeleccionActualProceso == "C") {
                        var valor, valor2;
                        var contenido = "";
                        MatrizMedicosSeleccionados = [];
                        var contador = 0;
                        for (var y = 0; y < MedicosSeleccionados.length; y++) {
                            for (var x = 0; x < listaProvision.length; x++) {
                                valor = listaProvision[x].split("¦");
                                if (MedicosSeleccionados[y] == (valor[0] * 1)) {
                                    MatrizMedicosSeleccionados[contador] = [];
                                    MatrizMedicosSeleccionados[contador][0] = valor[0] * 1;
                                    MatrizMedicosSeleccionados[contador][1] = valor[1];
                                    MatrizMedicosSeleccionados[contador][2] = valor[8];
                                    MatrizMedicosSeleccionados[contador][3] = "";
                                    MatrizMedicosSeleccionados[contador][4] = "";
                                    MatrizMedicosSeleccionados[contador][5] = "";
                                    MatrizMedicosSeleccionados[contador][6] = "";
                                    contador = contador + 1;
                                    break;
                                }
                            }
                        }
                        MatrizFiltroMedicosSeleccionados = [];
                        MatrizFiltroMedicosSeleccionados = MatrizMedicosSeleccionados.slice(0);
                        paginarMedicosConfirma(0);
                        abrirPopup('PopupConfirmarProvision');

                    }
                }
            } else {
                if (matrizDetalle.length > 0 && MedicosSeleccionados.length == 0) {
                    mostraralerta("Seleccione al menos un médico");
                }
            }
        }

    }

    var btnRevertir = document.getElementById("btnRevertir");
    if (btnRevertir != null) {
        btnRevertir.onclick = function () {
            if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
                var strDatos = "";
                var lista = MedicosSeleccionados.join("¬");
                strDatos += lista + "|";
                switch (SeleccionActualProceso) {
                    case "C": strDatos += "D";
                        break;
                    case "O": strDatos += "C";
                        break;
                }
                strDatos += "|-1";
                var url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
                var mensaje = "";
                switch (SeleccionActualProceso) {
                    case "C": mensaje = "¿Confirmar revertir de estado confirmar a difundir?";
                        break;
                    case "O": mensaje = "¿Confirmar revertir de estado enviar obligación a confirmar?";
                        break;
                }
                var titulo = "CONFIRMAR CAMBIO DE ESTADO";
                document.getElementById("spnActualizarProvision").innerHTML = mensaje;
                document.getElementById("TituloActualizarProvision").innerHTML = titulo;
                var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
                btngrabarActualizarProvision.onclick = null;
                btngrabarActualizarProvision.onclick = function () {
                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                    var data = this.getAttribute("data-datos").split("¯");
                    $.ajax(data[0], "post", RptaCalculo, data[1]);
                    //abrirPopup('PopupActualizarProvision');
                    var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                    var opciones = divOpcionesProvision.getElementsByTagName("LI");
                    for (var x = 0; x < opciones.length; x++) {
                        opciones[x].onclick = null;
                    }
                    var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
                    btnDetalleCancelar.onclick = null;
                }
                abrirPopup('PopupActualizarProvision');

            } else {
                if (matrizDetalle.length > 0 && MedicosSeleccionados.length == 0) {
                    mostraralerta("Seleccione al menos un médico");
                }
            }
        }
    }

    var btnRevertirObligacion = document.getElementById("btnRevertirObligacion");
    if (btnRevertirObligacion != null) {
        btnRevertirObligacion.onclick = function () {
            if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
                var strDatos = "";
                var lista = MedicosSeleccionados.join("¬");
                strDatos += lista + "|F|" + matriz[idProvisionEnMatriz][2];
                var url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
                var mensaje = "¿Confirmar revertir la obligación?";
                var titulo = "CONFIRMAR CAMBIO DE ESTADO";
                document.getElementById("spnActualizarProvision").innerHTML = mensaje;
                document.getElementById("TituloActualizarProvision").innerHTML = titulo;
                var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
                btngrabarActualizarProvision.onclick = null;
                btngrabarActualizarProvision.onclick = function () {
                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                    var data = this.getAttribute("data-datos").split("¯");
                    $.ajax(data[0], "post", RptaCalculo, data[1]);
                    //abrirPopup('PopupActualizarProvision');
                    var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                    var opciones = divOpcionesProvision.getElementsByTagName("LI");
                    for (var x = 0; x < opciones.length; x++) {
                        opciones[x].onclick = null;
                    }
                    var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
                    btnDetalleCancelar.onclick = null;
                }
                abrirPopup('PopupActualizarProvision');

            } else {
                if (matrizDetalle.length > 0 && MedicosSeleccionados.length == 0) {
                    mostraralerta("Seleccione al menos un médico");
                }
            }
        }
    }

    var btnRevertirObligacionPagado = document.getElementById("btnRevertirObligacionPagado");
    if (btnRevertirObligacionPagado != null) {
        btnRevertirObligacionPagado.onclick = function () {
            if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
                var strDatos = "";
                var lista = MedicosSeleccionados.join("¬");
                strDatos += lista + "|F|" + matriz[idProvisionEnMatriz][2];
                var url = urlBase + "Proceso/ActualizarProcesoPlanillaPagado/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
                var mensaje = "¿Confirmar revertir la obligación?";
                var titulo = "CONFIRMAR CAMBIO DE ESTADO";
                document.getElementById("spnActualizarProvision").innerHTML = mensaje;
                document.getElementById("TituloActualizarProvision").innerHTML = titulo;
                var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
                btngrabarActualizarProvision.onclick = null;
                btngrabarActualizarProvision.onclick = function () {
                    this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                    var data = this.getAttribute("data-datos").split("¯");
                    $.ajax(data[0], "post", RptaCalculo, data[1]);
                    //abrirPopup('PopupActualizarProvision');
                    var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                    var opciones = divOpcionesProvision.getElementsByTagName("LI");
                    for (var x = 0; x < opciones.length; x++) {
                        opciones[x].onclick = null;
                    }
                    var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
                    btnDetalleCancelar.onclick = null;
                }
                abrirPopup('PopupActualizarProvision');

            } else {
                if (matrizDetalle.length > 0 && MedicosSeleccionados.length == 0) {
                    mostraralerta("Seleccione al menos un médico");
                }
            }
        }
    }

    var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
    aExportarExcelDetalle.onclick = function () {
        var nRegistros = matrizDetalle.length;
        if (nRegistros > 0) {
            exportacionDetalle(this);
        }
        else {
            this.removeAttribute("download");
            this.href = "#";
        }
    }

    var btngrabarConfirmarProvision = document.getElementById("btngrabarConfirmarProvision");
    btngrabarConfirmarProvision.onclick = function () {
        var encontrado = false;
        var contenido = "";
        var contador = 0;
        var mensajeFecha = "";

        var selects = document.getElementsByClassName("ddlConfirmarTipoDoc");
        for (var x = 0; x < selects.length; x++) {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][2] = this.value;
                    break;
                }
            }
        }

        var txtNumConf = document.getElementsByClassName("txtNumConf");
        for (var x = 0; x < txtNumConf.length; x++) {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][3] = this.value;
                    break;
                }
            }
        }

        var txtSerConf = document.getElementsByClassName("txtSerConf");
        for (var x = 0; x < txtSerConf.length; x++) {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][4] = this.value;
                    break;
                }
            }
        }

        var txtFecConf = document.getElementsByClassName("txtFecConf");
        for (var x = 0; x < txtFecConf.length; x++) {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][5] = this.value;
                    break;
                }
            }

        }


        if (validarDocumentoPago()) {
            var contador = 0;
            for (var x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][3] != "" && MatrizMedicosSeleccionados[x][4] != "" && MatrizMedicosSeleccionados[x][5] != "") {
                    contenido += MatrizMedicosSeleccionados[x][0] + "¦" + MatrizMedicosSeleccionados[x][2] + "¦" + MatrizMedicosSeleccionados[x][3] + "¦" + MatrizMedicosSeleccionados[x][4] + "¦" + MatrizMedicosSeleccionados[x][5];
                    contenido += "¬";
                    contador++;
                }
            }
            contenido = contenido.substring(0, contenido.length - 1);
            contenido = contenido + "|O";
            var url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + contador + "&cc=" + contador;
            $.ajax(url, "post", RptaCalculo, contenido);

        }
    }

    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        var dato = this.getAttribute("data-indice");
        var valor1, valor2;
        switch (dato) {
            case "1":
                valor1 = matriz[Campoeliminar][2];
                valor2 = 1;
                break;
            case "2":
                valor1 = matrizDetalle[Campoeliminar][0];
                valor2 = 2;
                break;
        }

        anular(valor1, valor2);
    }

    var btnExportarExcelDetalleOA = document.getElementById("btnExportarExcelDetalleOA");
    btnExportarExcelDetalleOA.onclick = function () {
        var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
        var datos = "", formBlob, anchorElem, elem;
        datos = divIfrDetalleOA.contentWindow.exportarExcel();
        if (datos != "") {
            anchorElem = document.createElement('a');
            var formBlob = new Blob([datos], { type: 'application/vnd.ms-excel' });
            anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
            anchorElem.setAttribute("download", "ReporteOA.xls");
            anchorElem.setAttribute("id", "atemp");
            document.body.appendChild(anchorElem);
            anchorElem.click();
            elem = document.getElementById("atemp");
            elem.parentNode.removeChild(elem);
        }
    }

    var btngrabar = document.getElementById("btngrabar");
    btngrabar.onclick = function () {
        var id = matriz[idProvisionEnMatriz][2];
        var des = document.getElementById("txtDesMant").value;
        url = urlBase + "Proceso/ProvisionPlanillaDescripcion/?ss=" + ss + "&id=" + id + "&des=" + des;
        $.ajax(url, "get", mostrarActualDescripcion);
    }

    var spnPlanilla = document.getElementById("spnPlanilla");
    spnPlanilla.onclick = function () {
        grabarParametrosBusqueda();
        var id = this.getAttribute("data-id");
        var txtDesMant = document.getElementById("txtDesMant").value.substring(0, 50);
        var seg = document.getElementById("hdfSeguridad").value.split("¦")[0]
        window.location.href = urlBase + "Proceso/CreacionPlanilla/?ss=" + ss + "&esIframe=1&id=" + id + "&seg=" + seg + "&det=" + txtDesMant;
    }

    var btnLimpiarBuscar = document.getElementById("btnLimpiarBuscar");
    btnLimpiarBuscar.onclick = function () {
        var txtMedico = document.getElementById("txtMedico"),
            cboMes = document.getElementById("cboMes"),
            txtAnio = document.getElementById("txtAnio"),
            txtFechaInicio = document.getElementById("txtFechaInicio"),
            txtFechaFin = document.getElementById("txtFechaFin"),
            hdfIdPaciente = document.getElementById("hdfIdPaciente"),
            hdfMedico = document.getElementById("hdfMedico"),
            txtPplanilla = document.getElementById("txtPplanilla"),
            txtPlanilla = document.getElementById("txtPlanilla"),
            txtPaciente = document.getElementById("txtPaciente"),
            txtOrden = document.getElementById("txtOrden");

        hdfMedico.value = "";
        txtMedico.value = "";
        txtPplanilla.value = "";
        txtPlanilla.value = "";
        cboMes.value = "0";
        txtAnio.value = new Date().getFullYear();
        txtFechaInicio.value = "";
        txtFechaFin.value = "";
        txtOrden.value = "";
        hdfIdPaciente.value = "";
        txtPaciente.value = "";
    }
}

function mostrarActualDescripcion(rpta) {
    if (rpta != "") {
        mostraralerta("Se ha cambiado la descripción");
        abrirPopup('PopupProceso');
        document.getElementById("btnBuscar").click();
    }
    else {
        mostraralerta("No se pudo actualizar la descripción");
    }
}
function anular(id, estado) {
    var url = "";
    switch (estado) {
        case 1:
            url = urlBase + "Proceso/AnularProcesoPlanilla/?ss=" + ss + "&id=" + id;
            $.ajax(url, "get", mostrarCambioEstado);
            break;
        case 2:
            url = urlBase + "Proceso/AnularPlanilla/?ss=" + ss + "&id=" + id;
            $.ajax(url, "get", mostrarCambioEstado);
            break;
    }
    abrirPopup('PopupEstado');
}

function mostrarCambioEstado(rpta) {
    if (rpta != "") {
        switch (rpta) {
            case "1":
                document.getElementById("btnBuscar").click();
                break;
            case "2":
                buscarProvision(idProvisionEnMatriz);
                break;
        }
        mostraralerta("Se ha cambiado el estado");
    }
    else {
        mostraralerta("No se ha podido cambiar el estado");
    }
}

function crearCabeceraExportarDetalle() {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
    cabecera += "<tr><td style='width:200px'>Periodo</td><td style='text-align:left'>";
    cabecera += document.getElementById("txtDetalleDoctorPeriodo").value;
    cabecera += "</td></tr><tr><td style='width:200px'>Nro Proceso</td><td style='text-align:left'>";
    cabecera += document.getElementById("txtDetalleDoctorNro").value;
    cabecera += "</td></tr><tr><td style='width:200px'>Descripción</td><td style='text-align:left'>";
    cabecera += document.getElementById("txtDetalleDoctorDes").value;
    cabecera += "</td></tr><tr><td style='width:200px'>Estado</td><td style='text-align:left'>";
    switch (SeleccionActualProceso) {
        case "P":
            cabecera += "PENDIENTE";
            break;
        case "D":
            cabecera += "DIFUNDIR";
            break;
        case "C":
            cabecera += "CONFIRMAR";
            break;
        case "O":
            cabecera += "ENVIAR OBLIGACIÓN";
            break;
        case "G":
            cabecera += "PENDIENTE DE PAGO";
            break;
        case "F":
            cabecera += "PAGADO";
            break;
    }
    cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    cabecera += "<td style='width: 300px'>Medico/Empresa</td>";
    cabecera += "<td style='width: 150px'>Importe</td>";
    cabecera += "<td style='width: 150px'>Bonificacion</td>";
    cabecera += "<td style='width: 150px'>Descuento</td>";
    cabecera += "<td style='width: 150px'>Ajuste</td>";
    cabecera += "<td style='width: 150px'>Total</td>";
    if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
        cabecera += "<td style='width: 150px'>Tipo Documento</td>";
        cabecera += "<td style='width: 150px'>Documento</td>";
        cabecera += "<td style='width: 150px'>Fecha Emisión</td>";
    }
    cabecera += "<td style='width: 150px'>Estado</td>";
    cabecera += "</tr>";
    return cabecera;
}

function exportacionDetalle(objeto) {
    var contenido = "";
    var nRegistros = matrizDetalle.length;
    if (nRegistros > 0) {
        contenido = crearCabeceraExportarDetalle();
        var nCampos = cabecerasDetalle.length;
        for (var i = 0; i < nRegistros; i++) {
            contenido += "<tr>";
            for (var j = 1; j < nCampos; j++) {
                switch (j) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        contenido += "<td style='text-align:right'>";
                        contenido += matrizDetalle[i][matrizIndiceDetalle[j]].toLocaleString('en-US', { minimumFractionDigits: 2 });
                        break;

                    case 10:
                        contenido += "<td><span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='";
                        contenido += matrizDetalle[i][0];
                        contenido += "' data-t='PlanillaMedico'>";
                        switch (matrizDetalle[i][matrizIndiceDetalle[j]]) {
                            case "P":
                                contenido += "PENDIENTE";
                                break;
                            case "D":
                                contenido += "DIFUNDIR";
                                break;
                            case "C":
                                contenido += "CONFIRMAR";
                                break;
                            case "O":
                                contenido += "ENVIAR OBLIGACIÓN";
                                break;
                            case "G":
                                contenido += "PENDIENTE DE PAGO";
                                break;
                            case "F":
                                contenido += "PAGADO";
                                break;
                        }
                        contenido += "</span>";
                        contenido += "</td>";
                        break;
                    default:
                        if (j == 7 || j == 8 || j == 9) {
                            if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {

                                if (j == 8) {
                                    contenido += "<td>";
                                    contenido += (matrizDetalle[i][matrizIndiceDetalle[j]] == 0 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                                }
                                else if (j == 9) {
                                    contenido += "<td style='text-align:left'>";
                                    contenido += (matrizDetalle[i][matrizIndiceDetalle[j]].indexOf("1900") > -1 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                                }
                                else {
                                    contenido += "<td>";
                                    contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                                }
                                contenido += "</td>";
                            }
                        }
                        else {
                            contenido += "<td>";
                            contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                            contenido += "</td>";
                        }

                        break;
                }
            }
            contenido += "</tr>";
        }
        contenido += "</table></html>";
        var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
        objeto.download = "ProcesoPlanilla.xls";
        objeto.href = window.URL.createObjectURL(formBlob);
    }
}

function configurarOrdenacion() {
    var EnlaceD = document.getElementsByClassName("EnlaceD");
    var nEnlaces = EnlaceD.length;
    var enlace;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = EnlaceD[i];
        enlace.onclick = function () {
            ordenarMatriz(this, false);
            paginar(indiceActualPagina, false);
        }
    }

    var enlaces = document.getElementsByClassName("Enlace");
    var nEnlaces = enlaces.length;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = enlaces[i];
        enlace.onclick = function () {
            ordenarMatriz(this, true);
            paginar(indiceActualPagina, true);
        }
    }

}

function ordenarMatriz(enlace, detalle) {
    indiceOrden = enlace.getAttribute("data-orden");
    var campo = enlace.innerHTML;
    var posAsc = campo.indexOf("▲");
    var posDesc = campo.indexOf("▼");
    tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
    limpiarEnlacesCabecera(detalle);
    if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
    else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
    if (detalle) matriz.sort(ordenar);
    else matrizDetalle.sort(ordenar);
}

function limpiarEnlacesCabecera(detalle) {
    var enlaces;
    if (detalle) enlaces = document.getElementsByClassName("Enlace")
    else enlaces = document.getElementsByClassName("EnlaceD");
    var nEnlaces = enlaces.length;
    var enlace;
    var campo;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = enlaces[i];
        campo = enlace.innerHTML;
        enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
    }
}

function ordenar(x, y) {
    var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
    var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
    return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function RptaCalculo(rpta) {
    var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
    btngrabarActualizarProvision.innerHTML = "Confirmar";
    var PopupActualizarProvision = document.getElementById("PopupActualizarProvision");
    if (PopupActualizarProvision.className.indexOf("Open") > -1) {
        PopupActualizarProvision.className = "PopUp";
    }
    if (rpta.indexOf("NEXT") > -1) {
        if (rpta.indexOf("ERROR") == -1) {
            var dato = rpta.split("|")[1] * 1;
            datosCalculados += dato;
            cEnvios++;
            inicioEnvio += registroEnviar;
            var porcentaje = Math.floor(((datosCalculados * 1) * 100) / MedicosSeleccionados.length);
            mostraralerta("Se ha calculado el " + porcentaje + "% de registros", true);
        }
    }
    if (cEnvios < nEnvios) {
        var strDatos = cabeceraEnvio + prepararDatosEnviar();
        var url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
        $.ajax(url, "post", RptaCalculo, strDatos);
    }
    else {
        var alerta = document.getElementById("alerta");
        alerta.removeAttribute("class");
        var divOpcionesProvision = document.getElementById("divOpcionesProvision");
        var opciones = divOpcionesProvision.getElementsByTagName("LI");

        for (var x = 0; x < opciones.length; x++) {
            opciones[x].onclick = function () {
                MedicosSeleccionados = [];
                var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                var opciones = divOpcionesProvision.getElementsByTagName("LI");
                for (y = 0; y < opciones.length; y++) {
                    opciones[y].className = "";
                }
                this.className = "active";
                SeleccionActualProceso = this.getAttribute("data-estado");
                crearMatriz(false);
                paginar(0, false);
                indiceActualBloque = 0;
                var spnOpcProv1 = document.getElementById("spnOpcProv1");
                var spnOpcProv2 = document.getElementById("spnOpcProv2");
                var spnOpcProv3 = document.getElementById("spnOpcProv3");
                var spnOpcProv4 = document.getElementById("spnOpcProv4");
                var spnOpcProv5 = document.getElementById("spnOpcProv5");
                var spnOpcProv6 = document.getElementById("spnOpcProv6");
                spnOpcProv1.innerHTML = (a > 999 ? "999+" : a);
                spnOpcProv2.innerHTML = (b > 999 ? "999+" : b);
                spnOpcProv3.innerHTML = (c > 999 ? "999+" : c);
                spnOpcProv4.innerHTML = (d > 999 ? "999+" : d);
                spnOpcProv5.innerHTML = (e > 999 ? "999+" : e);
                spnOpcProv6.innerHTML = (f > 999 ? "999+" : f);
                limpiarCabeceras();
                if (document.getElementById("btnDetalleConfirmar") != null) {
                    if (SeleccionActualProceso == "D" || SeleccionActualProceso == "G" || SeleccionActualProceso == "F") {
                        document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                    }
                    else {
                        if (SeleccionActualProceso == "P" && ((matrizSeguridad[2].split("¦")[2] * 1) != 1)) {
                            document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                        }
                        else if (SeleccionActualProceso == "C" && ((matrizSeguridad[3].split("¦")[2] * 1) != 1)) {
                            document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                        }
                        else if (SeleccionActualProceso == "O" && ((matrizSeguridad[4].split("¦")[2] * 1) != 1)) {
                            document.getElementById("btnDetalleConfirmar").parentNode.style.display = "none";
                        }
                        else {
                            document.getElementById("btnDetalleConfirmar").parentNode.style.display = "";
                        }
                    }
                }

                if (document.getElementById("btnRevertirObligacionPagado") != null) {
                    if (SeleccionActualProceso == "F" && mostrarReg) document.getElementById("btnRevertirObligacionPagado").parentNode.style.display = "";
                    else document.getElementById("btnRevertirObligacionPagado").parentNode.style.display = "none";
                }

                if (document.getElementById("btnRevertirObligacion") != null) {
                    if (SeleccionActualProceso == "G" && mostrarReg) document.getElementById("btnRevertirObligacion").parentNode.style.display = "";
                    else document.getElementById("btnRevertirObligacion").parentNode.style.display = "none";
                }

                if (document.getElementById("btnRevertir") != null) {
                    if (SeleccionActualProceso == "C" || SeleccionActualProceso == "O") {
                        if (SeleccionActualProceso == "C" && ((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
                            document.getElementById("btnRevertir").parentNode.style.display = "none";
                        }
                        //else if (SeleccionActualProceso == "O" && ((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
                        else if (SeleccionActualProceso == "O" && ((matrizSeguridad[1].split("¦")[2] * 1) != 1)) {
                            document.getElementById("btnRevertir").parentNode.style.display = "none";
                        }
                        else {
                            document.getElementById("btnRevertir").parentNode.style.display = "";
                        }
                    }
                    else {
                        document.getElementById("btnRevertir").parentNode.style.display = "none";
                    }
                }

                if (document.getElementById("btnDetalleConfirmar") != null) {
                    if (SeleccionActualProceso == "O") {
                        document.getElementById("btnDetalleConfirmar").innerHTML = "Enviar Obligación";
                        document.getElementById("btnDetalleConfirmar").parentNode.className = "tam-8";
                    }
                    else {
                        document.getElementById("btnDetalleConfirmar").innerHTML = "Confirmar";
                        document.getElementById("btnDetalleConfirmar").parentNode.className = "tam-5";
                    }
                }
                var ocultarSeccionDiv = document.getElementsByClassName("ocultarSeccionDiv");
                if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
                    for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                        ocultarSeccionDiv[j].style.display = "";
                    }
                }
                else {
                    for (var j = 0; j < ocultarSeccionDiv.length; j++) {
                        ocultarSeccionDiv[j].style.display = "none";
                    }
                }
            }
        }
        var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
        btnDetalleCancelar.onclick = function () {
            var btnBuscar = document.getElementById("btnBuscar");
            btnBuscar.click();
            var divDetalleDoctor = document.getElementById("divDetalleDoctor");
            divDetalleDoctor.style.display = "none";
            var divPrincipal = document.getElementById("divPrincipal");
            divPrincipal.style.display = "";
            SeleccionActualProceso = "P";
        }
        var btnDetalleConfirmar = document.getElementById("btnDetalleConfirmar");
        if (btnDetalleConfirmar != null) {
            btnDetalleConfirmar.onclick = function () {
                if (matrizDetalle.length > 0 && MedicosSeleccionados.length > 0) {
                    var strDatos = "";
                    var url = "";
                    var lista = MedicosSeleccionados.join("¬");
                    strDatos += lista + "|";
                    switch (SeleccionActualProceso) {
                        case "P":
                            strDatos += "D";
                            break;
                        case "D":
                            strDatos += "C";
                            break;
                        case "C":
                            strDatos += "O";
                            break;
                        case "O":
                            strDatos += "G|";
                            strDatos += matriz[idProvisionEnMatriz][2];
                            break;
                    }
                    if (SeleccionActualProceso == "O") url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
                    else url = urlBase + "Proceso/ActualizarProcesoPlanilla/?ss=" + ss + "&tt=" + MedicosSeleccionados.length + "&cc=" + inicioEnvio;
                    var mensaje = "";
                    var titulo = "";
                    if (SeleccionActualProceso == "P" || SeleccionActualProceso == "O") {
                        if (SeleccionActualProceso == "P") {
                            mensaje = "¿Confirmar el cambio de estado de pendiente a difundir?";
                            titulo = "CONFIRMAR CAMBIO DE ESTADO";
                        }
                        else {
                            mensaje = "¿Está seguro de generar la obligación de los registros seleccionados en el SPRING ?";
                            titulo = "INTEGRACIÓN CON SPRING";
                        }

                        document.getElementById("spnActualizarProvision").innerHTML = mensaje;
                        document.getElementById("TituloActualizarProvision").innerHTML = titulo;
                        var btngrabarActualizarProvision = document.getElementById("btngrabarActualizarProvision");
                        btngrabarActualizarProvision.setAttribute("data-datos", url + "¯" + strDatos);
                        btngrabarActualizarProvision.onclick = null;
                        btngrabarActualizarProvision.onclick = function () {
                            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
                            var data = this.getAttribute("data-datos").split("¯");
                            $.ajax(data[0], "post", RptaCalculo, data[1]);
                            //abrirPopup('PopupActualizarProvision');
                            var divOpcionesProvision = document.getElementById("divOpcionesProvision");
                            var opciones = divOpcionesProvision.getElementsByTagName("LI");
                            for (var x = 0; x < opciones.length; x++) {
                                opciones[x].onclick = null;
                            }
                            var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
                            btnDetalleCancelar.onclick = null;
                        }
                        abrirPopup('PopupActualizarProvision');
                    }
                    else {
                        if (SeleccionActualProceso == "C") {
                            var valor, valor2;
                            var contenido = "";
                            MatrizMedicosSeleccionados = [];
                            var contador = 0;
                            for (var y = 0; y < MedicosSeleccionados.length; y++) {
                                for (var x = 0; x < listaProvision.length; x++) {
                                    valor = listaProvision[x].split("¦");
                                    if (MedicosSeleccionados[y] == (valor[0] * 1)) {
                                        MatrizMedicosSeleccionados[contador] = [];
                                        MatrizMedicosSeleccionados[contador][0] = valor[0] * 1;
                                        MatrizMedicosSeleccionados[contador][1] = valor[1];
                                        MatrizMedicosSeleccionados[contador][2] = valor[8];
                                        MatrizMedicosSeleccionados[contador][3] = "";
                                        MatrizMedicosSeleccionados[contador][4] = "";
                                        MatrizMedicosSeleccionados[contador][5] = "";
                                        contador = contador + 1;
                                        break;
                                    }
                                }
                            }
                            MatrizFiltroMedicosSeleccionados = [];
                            MatrizFiltroMedicosSeleccionados = MatrizMedicosSeleccionados.slice(0);
                            paginarMedicosConfirma(0);
                            abrirPopup('PopupConfirmarProvision');

                        }
                    }
                } else {
                    if (matrizDetalle.length > 0 && MedicosSeleccionados.length == 0) {
                        mostraralerta("Seleccione al menos un médico");
                    }
                }
            }

        }

        if (rpta.indexOf("¬") > -1) {

            var data = rpta.split("¬");
            /*popup marco*/
            listaProduccion = data[0] != "" ? data[0].split("¯") : [];
            listaMontoFijo = data[1] != "" ? data[1].split("¯") : [];
            listaHorario = data[2] != "" ? data[2].split("¯") : [];
            listaTurno = data[3] != "" ? data[3].split("¯") : [];

            crearTablaDetalle("Produccion|0");
            crearMatrizDetalle("Produccion|0");
            paginarDetalle(0, "Produccion|0");
            indiceActualBloque = 0;
            crearTablaDetalle("MontoFijo|1");
            crearMatrizDetalle("MontoFijo|1");
            paginarDetalle(0, "MontoFijo|1");
            indiceActualBloqueM = 0;
            crearTablaDetalle("Horario|2");
            crearMatrizDetalle("Horario|2");
            paginarDetalle(0, "Horario|2");
            indiceActualBloqueP = 0;
            crearTablaDetalle("Turno|3");
            crearMatrizDetalle("Turno|3");
            paginarDetalle(0, "Turno|3");
            indiceActualBloqueB = 0;

            abrirPopup("PopupDetalle");
        }

        console.log(rpta);
        if (rpta != "-1" && (rpta.indexOf("NEXT|-1") == -1)) {
            switch (SeleccionActualProceso) {
                case "C":
                    if (rpta.indexOf("ERROR") == -1) {
                        abrirPopup('PopupConfirmarProvision');
                    }
                    else {
                        var datosD = rpta.split("|");
                        var listaDet = datosD[2].split("¯");
                        var valorDet;
                        var datoValidar = "";
                        var trMedConf = document.getElementsByClassName("trMedConf");
                        var MessMed = document.getElementsByClassName("MessMed");
                        var pequeñaMatriz = [];
                        var enMatrizEncontrado = false;
                        var valorEnMatriz = 0;
                        for (var u = 0; u < listaDet.length; u++) {
                            valorDet = listaDet[u].split("¦");
                            for (var t = 0; t < trMedConf.length; t++) {
                                datoValidar = trMedConf[t].getAttribute("data-id");
                                if (datoValidar == valorDet[3]) {
                                    valorEnMatriz = buscarEnMatrizMedicosSeleccionados(valorDet[3]);
                                    trMedConf[valorEnMatriz].style.backgroundColor = "#F79A93";
                                    trMedConf[valorEnMatriz].style.color = "white";
                                    MessMed[valorEnMatriz].style.display = "";
                                    pequeñaMatriz.push(valorDet[3]);
                                    MatrizMedicosSeleccionados[valorEnMatriz][6] = "El documento fue ingresado en el proceso: " + valorDet[1] + ", tipo de admisión: " + valorDet[2] + " en el periodo de provisión: " + valorDet[4];
                                    MessMed[valorEnMatriz].onclick = null;
                                    MessMed[valorEnMatriz].onclick = function () {
                                        mostraralerta(MatrizMedicosSeleccionados[valorEnMatriz][6]);
                                    }
                                    enMatrizEncontrado = false;
                                }
                                else {
                                    for (var h = 0; h < pequeñaMatriz.length; h++) {
                                        if (valorDet[3] == pequeñaMatriz[h]) {
                                            enMatrizEncontrado = true;
                                            break;
                                        }
                                    }
                                    if (!enMatrizEncontrado) {
                                        valorEnMatriz = buscarEnMatrizMedicosSeleccionados(valorDet[3]);
                                        trMedConf[valorEnMatriz].style.backgroundColor = "white";
                                        trMedConf[valorEnMatriz].style.color = "#8B91A0";
                                        MessMed[valorEnMatriz].style.display = "none";
                                    }
                                    enMatrizEncontrado = false;
                                }
                            }
                        }
                        break;
                    }
                    break;
                case "G":
                    mostraralerta("Se realizo la reversión de forma satisfactoria");
                    break;
            }
            inicioEnvio = 0;
            nEnvios = 0;
            cEnvios = 0;
            datosCalculados = 0;
            cabeceraEnvio = "";
            var url = urlBase + "Proceso/listarProcesoPlanillaPorId/?ss=" + ss + "&su=" + sucursalId + "&pe=" + idProvision + "&datos=" + datosBusqueda + "&pro=" + matriz[idProvisionEnMatriz][2];
            $.ajax(url, "get", listarProvision);
            var chkTodos = document.getElementById("chkTodos");
            chkTodos.checked = false;
            if (matrizDetalle.length > 0) {
                var checks = document.getElementsByName("rdnDetalle");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
            }
        }
        else {
            switch (SeleccionActualProceso) {
                case "G":
                    mostraralerta("Obligación debe ser revertido primero en el SPRING");
                    break;
                default:
                    mostraralerta("No se puede realizar el cambio de estado");
                    break;
            }
            inicioEnvio = 0;
            nEnvios = 0;
            cEnvios = 0;
            datosCalculados = 0;
            cabeceraEnvio = "";
            var url = urlBase + "Proceso/listarProcesoPlanillaPorId/?ss=" + ss + "&su=" + sucursalId + "&pe=" + idProvision + "&datos=" + datosBusqueda + "&pro=" + matriz[idProvisionEnMatriz][2];
            $.ajax(url, "get", listarProvision);
            var chkTodos = document.getElementById("chkTodos");
            chkTodos.checked = false;
            if (matrizDetalle.length > 0) {
                var checks = document.getElementsByName("rdnDetalle");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
            }
        }
    }
}


function buscarEnMatrizMedicosSeleccionados(valor) {
    for (var t = 0; t < MatrizMedicosSeleccionados.length; t++) {
        if (MatrizMedicosSeleccionados[t][0] == valor * 1) {
            return t;
            break;
        }
    }
}

function configurarChecksMedicos() {
    var rdnDetalle = document.getElementsByName("rdnDetalle");
    var nCampos = rdnDetalle.length;
    var valorCheck;
    var valor;
    var rdnPrincipal;
    for (var x = 0; x < nCampos; x++) {
        rdnDetalle[x].onclick = function () {
            valor = this.id.split("rdn").join("").trim();
            if (this.checked) {
                MedicosSeleccionados.push(matrizDetalle[valor][0]);
            }
            else {
                if (MedicosSeleccionados.length > 0) {
                    for (var x = 0; x < MedicosSeleccionados.length; x++) {
                        if (MedicosSeleccionados[x] == this.getAttribute("data-check")) {
                            MedicosSeleccionados.splice(x, 1);
                            break;
                        }
                    }
                    if (MedicosSeleccionados.length <= 0) {
                        MedicosSeleccionados = [];
                        document.getElementById("chkTodos").checked = false;
                    }
                }

            }

        }
        if (MedicosSeleccionados.length > 0) {
            valorCheck = rdnDetalle[x].getAttribute("data-check");
            for (var y = 0; y < MedicosSeleccionados.length; y++) {
                if (MedicosSeleccionados[y] == valorCheck) {
                    rdnDetalle[x].checked = true;
                    break;
                }
            }
        }

    }

}

function buscarProvision(id) {
    document.getElementById("txtDetalleDoctorPeriodo").value = matriz[id][5];
    document.getElementById("txtDetalleDoctorNro").value = matriz[id][2];
    document.getElementById("txtDetalleDoctorDes").value = matriz[id][3];
    idProvision = matriz[id][0];
    idProvisionEnMatriz = id;
    var url = urlBase + "Proceso/listarProcesoPlanillaPorId/?ss=" + ss + "&su=" + sucursalId + "&pe=" + idProvision + "&datos=" + datosBusqueda + "&pro=" + matriz[id][2];
    $.ajax(url, "get", listarProvision);
}

function listarProvision(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        var divPrincipal = document.getElementById("divPrincipal");
        divPrincipal.style.display = "none";
        var divDetalleDoctor = document.getElementById("divDetalleDoctor");
        divDetalleDoctor.style.display = "";
        listaProvision = data[0].split("¯");
        listaTipoDocumento = data[1].split("¯");
        var divOpcionesProvision = document.getElementById("divOpcionesProvision");
        var opcion = divOpcionesProvision.getElementsByTagName("LI");
        var dato;
        for (var x = 0; x < opcion.length; x++) {
            if (opcion[x].getAttribute("data-estado") == SeleccionActualProceso) {
                opcion[x].click();
                break;
            }
        }
        if (primerQuery) {
            for (var y = 0; y < opcion.length; y++) {
                dato = document.getElementById("spnOpcProv" + (y + 1)).innerHTML * 1;
                if (dato > 0) {
                    opcion[y].click();
                    break;
                }
            }
            primerQuery = false;


            var txtPlanilla = document.getElementById("txtPlanilla").value.trim();
            if (txtPlanilla != "") {
                var nRegistros = listaProvision.length;//
                var campos;
                for (var i = 0; i < nRegistros; i += 1) {
                    campos = listaProvision[i].split("¦");
                    if (campos[0] == txtPlanilla) {
                        SeleccionActualProceso = campos[7];
                        for (var x = 0; x < opcion.length; x++) {
                            if (opcion[x].getAttribute("data-estado") == SeleccionActualProceso) {
                                opcion[x].click();
                                document.getElementsByName("cabeceraD")[0].value = txtPlanilla;
                                document.getElementsByName("cabeceraD")[0].onkeyup();
                                break;
                            }
                        }

                        break;
                    }
                }
            }
        }
    }
    else {
        var contenido = "";
        var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 1).toString();
        contenido += "'>No hay datos</td></tr>";
        document.getElementById("tbDetalleDoctor").innerHTML = contenido;
    }
}

function crearTabla(opcion) {
    var nCampos;
    var contenido = "";
    if (opcion) {
        nCampos = cabeceras.length;
        contenido = "<table class='tabla-general'>";
        contenido += "<thead class='tabla-FilaCab'>";
        contenido += "<tr class='cabecera'><td></td>";
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
            if (j == 9) {
                contenido += "<select class='Combo' name='cabecera' style='width:90%'><option value=''>TODOS</option>";
                contenido += "<option value='P'>Pendiente</option>";
                contenido += "<option value='D'>Difundir</option>";
                contenido += "<option value='C'>Confirmar</option>";
                contenido += "<option value='O'>Enviar obligación</option>";
                contenido += "<option value='G'>Pendiente de pago</option>";
                contenido += "<option value='F'>Pagado</option>";
                contenido += "<option value='I'>Inactivo</option>";
                contenido += "</select>";
            } else {
                contenido += "<input type='text' class='Texto' name='cabecera' style='width:90%'>";
            }
            contenido += "</th>";
        }
        contenido += "<th style='width:7%;vertical-align: middle;text-align: center;'>";
        contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcel'></a>";
        contenido += "</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody id='tbProceso' class='tabla-FilaCuerpo'>";
        contenido += "</tbody>";
        contenido += "<tfoot>";
        contenido += "<tr><td id='tdPaginas' colspan='";
        contenido += (nCampos + 1).toString();
        contenido += "'></td></tr>";
        contenido += "</tfoot>";
        contenido += "</table>";
        document.getElementById("divProceso").innerHTML = contenido;
    }
    else {
        var nCampos = cabecerasDetalle.length;
        var contenido = "<table class='tabla-general'>";
        contenido += "<thead class='tabla-FilaCab'>";
        contenido += "<tr class='cabecera'>";
        contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
        for (var j = 0; j < nCampos; j++) {
            contenido += "<th style='width:";
            contenido += anchosDetalle[j];
            contenido += "%;' ";
            if (j == 7 || j == 8 || j == 9) {
                contenido += "class='ocultarSeccionDiv'";
            }
            contenido += "><span id='spn";
            contenido += j.toString();
            contenido += "' class='EnlaceD' data-orden='";
            contenido += matrizIndiceDetalle[j];
            contenido += "'>";
            contenido += cabecerasDetalle[j];
            contenido += "</span><br/>";
            if (j != (nCampos - 1)) {
                contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
            }
            contenido += "</th>";
        }
        contenido += "<th style='width:10%;vertical-align: middle;text-align: center;padding:6px 20px'>";
        //if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
        //	contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a>";
        //}
        contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a>";
        contenido += "</th>";
        contenido += "</tr>";
        contenido += "</thead>";
        contenido += "<tbody id='tbDetalleDoctor' class='tabla-FilaCuerpo'>";
        contenido += "</tbody>";
        contenido += "<tfoot>";
        contenido += "<tr><td id='tdPaginasDetalle' colspan='";
        contenido += (nCampos + 2);
        contenido += "'></td></tr>";
        contenido += "</tfoot>";
        contenido += "</table>";
        document.getElementById("divDetalle").innerHTML = contenido;
    }
}

function buscarProceso() {

    var txtOrden = document.getElementById("txtOrden");
    var intSucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    var ss = window.parent.document.getElementById("iss").value;
    if (txtOrden.value != "") {
        var ifrDetalleOA = document.getElementById("ifrDetalleOA");
        if (ifrDetalleOA.innerHTML == "") {
            ifrDetalleOA.innerHTML = "<iframe id='divIfrDetalleOA' style='margin:0;padding:0;width:1150px;height:440px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOrden.value + "'></iframe>";
        }
        else {
            var divIfrDetalleOA = document.getElementById("divIfrDetalleOA");
            divIfrDetalleOA.src = urlBase + "Mantenimiento/OADetalleLista/?ss=" + ss + "&su=" + intSucursalId + "&oa=" + txtOrden.value;
        }
        document.getElementById("txtOADetalle").value = txtOrden.value;
        abrirPopup("PopupDetalleOA");
    } else {

        var txtMedico = document.getElementById("txtMedico");
        var cboMes = document.getElementById("cboMes");
        var txtAnio = document.getElementById("txtAnio");
        var txtFechaInicio = document.getElementById("txtFechaInicio");
        var txtFechaFin = document.getElementById("txtFechaFin");
        var hdfIdPaciente = document.getElementById("hdfIdPaciente");
        var hdfMedico = document.getElementById("hdfMedico");
        var txtPplanilla = document.getElementById("txtPplanilla").value;
        var txtPlanilla = document.getElementById("txtPlanilla").value;
        var txtPaciente = document.getElementById("txtPaciente");

        var valMedico = hdfMedico.value;
        var valMes = (cboMes.value == undefined || cboMes.value == "" ? "0" : cboMes.value);
        var valAnio = (txtAnio.value == undefined || txtAnio.value == "" ? "0" : txtAnio.value);
        var valFechaInicio = (txtFechaInicio.value == undefined || txtFechaInicio.value == "" ? "01/01/1900" : txtFechaInicio.value);
        var valFechaFin = (txtFechaFin.value == undefined || txtFechaFin.value == "" ? "01/01/1900" : txtFechaFin.value);
        var valOrden = (txtOrden.value == undefined || txtOrden.value == "" ? "" : txtOrden.value);
        var valPaciente = hdfIdPaciente.value;

        var frm = new FormData();
        frm.append("SucursalId", intSucursalId);
        frm.append("Mes", valMes);
        frm.append("Anio", valAnio);
        frm.append("PeriodoFechaInicio", valFechaInicio);
        frm.append("PeriodoFechaFin", valFechaFin);
        //frm.append("OrdenAtencion", valOrden);
        frm.append("MedicoId", valMedico);
        frm.append("PacienteId", valPaciente);
        frm.append("ProcesoPlanillaId", (txtPplanilla == "" ? 0 : txtPplanilla));
        frm.append("PlanillaId", (txtPlanilla == "" ? 0 : txtPlanilla));

        datosBusqueda = valOrden + "|" + valMedico + "|" + valPaciente;
        var url = urlBase + "Proceso/listarProcesoPlanilla/?ss=" + ss + "&or=" + valOrden;
        $.ajax(url, "post", listarTodo, frm);
    }
    //configuracionInicial();
}
function grabarParametrosBusqueda() {
    var txtOrden = document.getElementById("txtOrden");
    var txtMedico = document.getElementById("txtMedico");
    var cboMes = document.getElementById("cboMes");
    var txtAnio = document.getElementById("txtAnio");
    var txtFechaInicio = document.getElementById("txtFechaInicio");
    var txtFechaFin = document.getElementById("txtFechaFin");
    var hdfIdPaciente = document.getElementById("hdfIdPaciente").value;
    var hdfMedico = document.getElementById("hdfMedico").value;
    var txtPplanilla = document.getElementById("txtPplanilla").value;
    var txtPlanilla = document.getElementById("txtPlanilla").value;
    var txtPaciente = document.getElementById("txtPaciente");

    var ParametroBusqueda = hdfMedico + "¦" + txtMedico.value + "¦" + txtPplanilla + "¦" + txtPlanilla + "¦";
    ParametroBusqueda += cboMes.value + "¦" + txtAnio.value + "¦" + txtFechaInicio.value + "¦" + txtFechaFin.value + "¦" + txtOrden.value + "¦" + hdfIdPaciente + "¦" + txtPaciente.value;
    if (window.sessionStorage) {
        sessionStorage.setItem("ValorBusqueda", ParametroBusqueda)
    }
}

function listarTodo(rpta) {
    lista = [];
    if (rpta != "") {
        lista = rpta.split("¯");
        listarProcesos();
    }
    else {
        var contenido = "";
        var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 2).toString();
        contenido += "'>No hay datos</td></tr>";
        document.getElementById("tbProceso").innerHTML = contenido;
        document.getElementById("tdPaginas").innerHTML = "";
        document.getElementById("spnTotal").innerHTML = "0.00";

    }
}

function listarProcesos(irUltimaPagina) {
    crearMatriz(true);
    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, true);
    else {
        paginar(0, true);
        indiceActualBloque = 0;
    }
}

function crearMatriz(opcion) {
    totales.mtImporte = 0,
        totales.mtBonificacion = 0,
        totales.mtDescuento = 0,
        totales.mtAjuste = 0,
        totales.mtTotal = 0;

    var nRegistros;
    var nCampos;
    var campos;
    var x = 0;
    if (opcion) {
        var total = 0;
        nRegistros = lista.length;
        matriz = [];
        for (i = 0; i < nRegistros; i++) {
            campos = lista[i].split("¦");
            matriz[x] = [];
            nCampos = campos.length;
            for (j = 0; j < nCampos; j++) {
                if (isNaN(campos[j]) || j == 3) {
                    matriz[x][j] = campos[j];
                }
                else {
                    matriz[x][j] = campos[j] * 1;
                    if (j == 9) {
                        if (campos[10] != "I") {
                            total = total + (campos[j] * 1);
                        }
                    }
                }
            }
            x++;
        }

        document.getElementById("spnTotal").innerHTML = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }
    else {
        a = 0;
        b = 0;
        c = 0;
        d = 0;
        e = 0;
        f = 0;
        var valor;
        nRegistros = listaProvision.length;
        matrizDetalle = [];
        for (i = 0; i < nRegistros; i++) {
            campos = listaProvision[i].split("¦");
            if (SeleccionActualProceso == campos[7]) {
                matrizDetalle[x] = [];
                nCampos = campos.length;
                for (j = 0; j < nCampos; j++) {
                    if (isNaN(campos[j]) || j == 1) {
                        matrizDetalle[x][j] = campos[j];
                    }
                    else {
                        matrizDetalle[x][j] = campos[j] * 1;
                    }

                }
                totales.mtImporte = (totales.mtImporte + (campos[2] * 1))
                totales.mtBonificacion = (totales.mtBonificacion + (campos[3] * 1)),
                    totales.mtDescuento = (totales.mtDescuento + (campos[4] * 1)),
                    totales.mtAjuste = (totales.mtAjuste + (campos[5] * 1)),
                    totales.mtTotal = (totales.mtTotal + (campos[6] * 1));
                x++;
            }

            if (IndicadorPrimero) {
                switch (campos[7]) {
                    case "P":
                        a = a + 1;
                        break;
                    case "D":
                        b = b + 1;
                        break;
                    case "C":
                        c = c + 1;
                        break;
                    case "O":
                        d = d + 1;
                        break;
                    case "G":
                        e = e + 1;
                        break;
                    case "F":
                        f = f + 1;
                        break;
                }
            }
        }
    }
}


function paginar(indicePagina, opcion) {
    var nRegistros
    if (opcion) nRegistros = matriz.length;
    else nRegistros = matrizDetalle.length;
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
    mostrarMatriz(indicePagina, opcion);
}


function crearPaginas(opcion) {
    var nRegistros;
    if (opcion) nRegistros = matriz.length;
    else nRegistros = matrizDetalle.length;
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
    if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = indiceActualBloque * paginasBloque;
    var fin = inicio + paginasBloque;
    if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-1," + opcion + ");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-2," + opcion + ");' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginar(";
            contenido += i;
            contenido += "," + opcion + ");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            if (opcion) {
                contenido += "' id='a";
            } else {
                contenido += "' id='ad";
            }
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-3," + opcion + ");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-4," + opcion + ");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= registrosPagina) {
        if (opcion) document.getElementById("tdPaginas").innerHTML = "";
        else document.getElementById("tdPaginasDetalle").innerHTML = "";

    }
    else {
        if (opcion) document.getElementById("tdPaginas").innerHTML = contenido;
        else document.getElementById("tdPaginasDetalle").innerHTML = contenido;
        seleccionarPaginaActual(opcion);
    }
}

function seleccionarPaginaActual(opcion) {
    var aPagina = document.getElementById("a" + (opcion == true ? "" : "d") + indiceActualPagina);
    if (aPagina != null) {
        aPagina.className += " seleccionado";
    }
}

function mostrarProcesoActual(id) {
    idProvisionEnMatriz = id;
    document.getElementById("txtSucursalMant").value = matriz[id][1];
    document.getElementById("txtNroMant").value = matriz[id][2];
    document.getElementById("txtDesMant").value = matriz[id][3];
    document.getElementById("txtCantMant").value = matriz[id][8];
    document.getElementById("txtMontoMant").value = formatearNumero(matriz[id][9]);

    if (matriz[id][10] == "I") {
        document.getElementById("btngrabar").style.display = "none";
    } else {
        document.getElementById("btngrabar").style.display = "";
    }

    var divEPlanilla = document.getElementById("divEPlanilla");
    if (matriz[id][10] == "P") {
        document.getElementById("spnPlanilla").setAttribute("data-id", matriz[id][2]);
        divEPlanilla.style.display = "inline-block";
    } else {
        divEPlanilla.style.display = "none";
    }
    abrirPopup("PopupProceso");
}


function mostrarMatriz(indicePagina, opcion) {
    indiceActualPagina = indicePagina;
    if (opcion) {
        var contenido = "";
        var n = matriz.length;
        if (n > 0) {
            var nCampos = matriz[0].length;
            var inicio = indicePagina * registrosPagina;
            var fin = inicio + registrosPagina;
            for (var i = inicio; i < fin; i++) {
                if (i < n) {
                    contenido += "<tr class='FilaDatos'>";
                    contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='mostrarProcesoActual(";
                    contenido += i;
                    contenido += ")'></span></td>";
                    for (var j = 1; j < nCampos; j++) {

                        switch (j) {
                            case 4:
                                contenido += "<td>";
                                contenido += (matriz[i][j] == 1 ? "NORMAL" : "REGULARIZACIÓN");
                                break;
                            case 9:
                                contenido += "<td style='text-align:right'>";
                                contenido += matriz[i][j].toLocaleString('en-US', { minimumFractionDigits: 2 });
                                break;
                            case 10:
                                contenido += "<td><span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='";
                                contenido += matriz[i][2];
                                contenido += "' data-t='ProcesoPlanilla'>";
                                switch (matriz[i][j]) {
                                    case "I":
                                        contenido += "INACTIVO";
                                        break;
                                    case "P":
                                        contenido += "PENDIENTE";
                                        break;
                                    case "D":
                                        contenido += "DIFUNDIR";
                                        break;
                                    case "C":
                                        contenido += "CONFIRMAR";
                                        break;
                                    case "O":
                                        contenido += "ENVIAR OBLIGACIÓN";
                                        break;
                                    case "G":
                                        contenido += "PENDIENTE DE PAGO";
                                        break;
                                    case "F":
                                        contenido += "PAGADO";
                                        break;
                                }
                                contenido += "</span>";
                                break;
                            default:
                                contenido += "<td>";
                                contenido += matriz[i][j];
                                break;
                        }
                        contenido += "</td>";
                    }
                    contenido += "<td style='text-align:center'>";
                    if (matriz[i][10] != "I") {
                        contenido += "<span class='Icons fa-money' onclick='buscarProvision(" + i + ");primerQuery=true;mostrarReg=";
                        contenido += (matriz[i][4] == 1 ? true : false);
                        contenido += "'></span>&nbsp;&nbsp";
                    }
                    if (matriz[i][10] != "G" && matriz[i][10] != "F") {
                        contenido += "<span class='Icons ";
                        contenido += (matriz[i][10] == "F" ? "" : (matriz[i][10] == "I" ? "fa-check" : "fa-trash-o"));
                        contenido += "'";
                        if (matriz[i][10] == "I") {
                            contenido += " onclick='mostraralerta(\"No se puede realizar el cambio de estado\")'";
                        }
                        else {
                            contenido += " onclick='operacion(\"Actualizar Estado Planilla\");abrirPopup(";
                            contenido += '"PopupEstado"';
                            contenido += ");Campoeliminar=";
                            contenido += i;
                            contenido += ";document.getElementById(\"btngrabarEstado\").setAttribute(\"data-indice\",1);'";
                        }
                        contenido += "></span>";
                    }
                    //if (matriz[i][9] != "INACTIVO") {
                    //	if (matrizSeguridad.length > 0 && ((matrizSeguridad[4].split("¦")[2] * 1) == 1)) {
                    //		contenido += "<span class='Icons fa-money' onclick='buscarProvision(" + matriz[i][0] + "," + i + ")'></span>&nbsp;&nbsp";
                    //	}
                    //}
                    //if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                    //	contenido += "<span class='Icons ";
                    //	contenido += (matriz[i][9] == "PROVISIONADO" ? "" : (matriz[i][9] == "INACTIVO" ? "fa-check" : "fa-trash-o"));
                    //	contenido += "'";
                    //	if (matriz[i][14] == "I") {
                    //		contenido += " onclick='mostraralerta(\"No se puede realizar el cambio de estado\")'";
                    //	}
                    //	else {
                    //		contenido += " onclick='operacion(\"Actualizar Estado Proceso\");abrirPopup(";
                    //		contenido += '"PopupEstado"';
                    //		contenido += ");Campoeliminar=";
                    //		contenido += i;
                    //		contenido += ";'";
                    //	}
                    //	contenido += "></span>";
                    //}
                    contenido += "</td></tr>";
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
        document.getElementById("tbProceso").innerHTML = contenido;
        crearPaginas(opcion);
    }
    else {
        indiceActualPagina = indicePagina;
        var contenido = "";
        Campoeliminar = "";
        var n = matrizDetalle.length;
        var nCabeceras = cabeceras.length;
        var ConfiguracionActual = 0;
        if (n > 0) {
            var nCampos = cabecerasDetalle.length;
            var inicio = indicePagina * registrosPagina;
            var fin = inicio + registrosPagina;
            for (var i = inicio; i < fin; i++) {
                if (i < n) {
                    contenido += "<tr class='FilaDatos'>";
                    contenido += "<td style='text-align:center'>";
                    if (matrizDetalle[i][7] != "D") {
                        contenido += "<input type='checkbox' name='rdnDetalle' id='rdn";
                        contenido += i;
                        contenido += "' data-check='";
                        contenido += matrizDetalle[i][0];
                        contenido += "'/></td>";
                    }
                    for (var j = 0; j < nCampos; j++) {
                        switch (j) {
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                contenido += "<td style='text-align:right'>";
                                contenido += matrizDetalle[i][matrizIndiceDetalle[j]].toLocaleString('en-US', { minimumFractionDigits: 2 });
                                break;

                            case 10:
                                contenido += "<td><span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='";
                                contenido += matrizDetalle[i][0];
                                contenido += "' data-t='PlanillaMedico'>";
                                switch (matrizDetalle[i][matrizIndiceDetalle[j]]) {
                                    case "P":
                                        contenido += "PENDIENTE";
                                        break;
                                    case "D":
                                        contenido += "DIFUNDIR";
                                        break;
                                    case "C":
                                        contenido += "CONFIRMAR";
                                        break;
                                    case "O":
                                        contenido += "ENVIAR OBLIGACIÓN";
                                        break;
                                    case "G":
                                        contenido += "PENDIENTE DE PAGO";
                                        break;
                                    case "F":
                                        contenido += "PAGADO";
                                        break;
                                }
                                contenido += "</span>";
                                contenido += "</td>";
                                break;
                            default:
                                if (j == 7 || j == 8 || j == 9) {
                                    if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
                                        contenido += "<td>";
                                        if (j == 8) {
                                            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]] == 0 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                                        }
                                        else if (j == 9) {
                                            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]].indexOf("1900") > -1 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                                        }
                                        else {
                                            contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                                        }
                                        contenido += "</td>";
                                    }
                                }
                                else {
                                    contenido += "<td>";
                                    contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                                    contenido += "</td>";
                                }

                                break;
                        }

                    }
                    contenido += "<td style='text-align:center'><span class='Icons ";
                    contenido += "fa-list-alt";
                    contenido += "' onclick='mostrarDetalleOA(";
                    contenido += matrizDetalle[i][0];
                    contenido += ",\"";
                    contenido += matrizDetalle[i][1];
                    contenido += "\")'></span>";
                    if (SeleccionActualProceso == "P" || SeleccionActualProceso == "C" || SeleccionActualProceso == "O" || SeleccionActualProceso == "D") {
                        contenido += "&nbsp;&nbsp;<span class='Icons ";
                        contenido += (matrizDetalle[i][7] == "I" ? "fa-check" : "fa-trash-o");
                        contenido += "'";
                        if (matrizDetalle[i][7] == "I") {
                            contenido += " onclick='mostraralerta(\"No se puede realizar el cambio de estado\")'";
                        }
                        else {
                            contenido += " onclick='operacion(\"Actualizar Estado Planilla\");abrirPopup(";
                            contenido += '"PopupEstado"';
                            contenido += ");Campoeliminar=";
                            contenido += i;
                            contenido += ";document.getElementById(\"btngrabarEstado\").setAttribute(\"data-indice\",2);'";
                        }
                        contenido += "></span>";
                    }
                    contenido += "</td></tr>";
                }

            }
            //if (SeleccionActualProceso != "P") {
            //	contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='4'>Totales</td><td style='text-align:right'>" + formatearNumero(totales.mtImporte) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtBonificacion) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtDescuento) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtAjuste) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtTotal) + "</td><td colspan='3'></td></tr>";
            //}
            //else if (SeleccionActualProceso == "P") {
            contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='3'>Totales</td><td style='text-align:right'>" + formatearNumero(totales.mtImporte) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtBonificacion) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtDescuento) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtAjuste) + "</td><td style='text-align:right'>" + formatearNumero(totales.mtTotal) + "</td><td colspan='2'></td></tr>";
            //}
        }
        else {
            var nCabeceras = cabeceras.length;
            contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
            contenido += (nCabeceras + 2).toString();
            contenido += "'>No hay datos</td></tr>";
        }
        excelExportarDetalle = contenido;
        document.getElementById("tbDetalleDoctor").innerHTML = contenido;
        crearPaginas(opcion);
        configurarChecksMedicos();
        var rdnDetalle = document.getElementsByName("rdnDetalle");
        var chkTodos = document.getElementById("chkTodos");
        if (inicioEnvio > 0) {
            for (var x = 0; x < rdnDetalle.length; x++) {
                rdnDetalle[x].setAttribute("disabled", "disabled");
            }
            chkTodos.setAttribute("disabled", "disabled");
        }
        else {
            for (var x = 0; x < rdnDetalle.length; x++) {
                rdnDetalle[x].removeAttribute("disabled");
            }
            chkTodos.removeAttribute("disabled");
        }
    }
    configurarHistorial();
}


function operacion(nombre) {
    document.getElementById("TituloPopupEstado").innerHTML = nombre;
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


function validarBusqueda() {

    var txtSucursal = document.getElementById("txtSucursal");

    mensajeValidacion = [];

    var validar = document.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }

    var mensajeSucursal = validarTexto(txtSucursal.id, "Sucursal", true);
    if (mensajeSucursal != "") {
        mensajeValidacion[txtSucursal.getAttribute("data-secuencia")] = mensajeSucursal;
        txtSucursal.className += " error";
        txtSucursal.focus();
    }


    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
    }

}

function validarDocumentoPago() {

    var txtSerConf = document.getElementsByClassName("txtSerConf");
    var txtNumConf = document.getElementsByClassName("txtNumConf");
    var txtFecConf = document.getElementsByClassName("txtFecConf");
    mensajeValidacion = [];
    var mensaje1 = "", mensaje2 = "", mensaje3 = "";
    var validar = document.getElementsByClassName("validar2");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }

    for (var z = 0; z < txtSerConf.length; z++) {
        if (txtSerConf[z].value != "" || txtNumConf[z].value != "" || txtFecConf[z].value != "") {
            mensaje1 = validarTexto(txtSerConf[z].id, "Serie", true);
            if (mensaje1 != "") {
                mensajeValidacion[txtSerConf[z].getAttribute("data-secuencia")] = mensaje1;
                txtSerConf[z].className += " error";
                txtSerConf[z].focus();
            }


            mensaje2 = validarTexto(txtNumConf[z].id, "Número", true);
            if (mensaje2 != "") {
                mensajeValidacion[txtNumConf[z].getAttribute("data-secuencia")] = mensaje2;
                txtNumConf[z].className += " error";
                txtNumConf[z].focus();
            }
            mensaje3 = validarFecha2(txtFecConf[z].id, "Fecha", true);
            if (mensaje3 != "") {
                mensajeValidacion[txtFecConf[z].getAttribute("data-secuencia")] = mensaje3;
                txtFecConf[z].className += " error";
                txtFecConf[z].focus();
            }

        }


    }
    if (mensajeValidacion.length > 0) {
        return false;
    } else {
        return true;
    }




    //for (var z = 0; z < txtSerConf.length; z++) {
    //	if (txtSerConf[z].value != "") {
    //		mensaje1 = validarTexto(txtSerConf[z].id, "Serie", true);
    //		if (mensaje1 != "") {
    //			mensajeValidacion[txtSerConf[z].getAttribute("data-secuencia")] = mensaje1;
    //			txtSerConf[z].className += " error";
    //			txtSerConf[z].focus();
    //		}
    //	}
    //}
    //for (var z = 0; z < txtNumConf.length; z++) {
    //	if (txtNumConf[z].value != "") {
    //		mensaje2 = validarTexto(txtNumConf[z].id, "Número", true);
    //		if (mensaje2 != "") {
    //			mensajeValidacion[txtNumConf[z].getAttribute("data-secuencia")] = mensaje2;
    //			txtNumConf[z].className += " error";
    //			txtNumConf[z].focus();
    //		}
    //	}
    //}
    //for (var z = 0; z < txtSerConf.length; z++) {
    //	if (txtFecConf[z].value != "") {
    //		mensaje3 = validarFecha(txtFecConf[z].id, "Fecha", true);
    //		if (mensaje3 != "") {
    //			mensajeValidacion[txtFecConf[z].getAttribute("data-secuencia")] = mensaje3;
    //			txtFecConf[z].className += " error";
    //			txtFecConf[z].focus();
    //		}
    //	}
    //}



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
            elemento.className += " error";
        } else {
            mensajeValidacion[elemento.getAttribute("data-secuencia")] = "";
            if (elemento.className.indexOf("error") > -1) {
                elemento.className = elemento.className.split("error").join("").trim();
            }
        }
    }
}

function limpiarCabeceras() {
    var TextoD = document.getElementsByClassName("TextoD");
    for (var x = 0; x < TextoD.length; x++) {
        TextoD[x].value = "";
    }
    var chkTodos = document.getElementById("chkTodos");
    chkTodos.checked = false;
    //var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
    //if (aExportarExcelDetalle != null) {
    //	aExportarExcelDetalle.removeAttribute("download");
    //	aExportarExcelDetalle.href = "#";
    //}
}

function abrirPopup(objeto) {
    var popup = document.getElementById(objeto);
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
    if (objeto == "PopupPlanillaDetalleConceptosOA" || objeto == "PopupError" || objeto == "PopupObservado") {
        window.onresize();
    }
}

function formatearNumero(valor) {
    var valorFrm;
    if (!isNaN(valor)) {
        var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        valorFrm = valor.toLocaleString("en-US", frmMoneda);
    } else {
        valorFrm = "0.00";
    }
    return valorFrm
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
        }, 4500);
    }
}

function configurarFiltro() {
    var textos = document.getElementsByClassName("Texto");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            filtrar(true);
        }
    }
    var combos = document.getElementsByClassName("Combo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            filtrar(true);
        }
    }

    var textos = document.getElementsByClassName("TextoD");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            filtrar(false);
        }
    }

    var combos = document.getElementsByClassName("ComboD");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            filtrar(false);
        }
    }
}

function filtrar(opcion) {
    if (opcion) {
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
        var nFiltrados = matrizIndice.length
        var total = 0
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("¦");
            campoFiltrado = [];
            nCampos = campos.length;
            for (var k = 0; k < nFiltrados; k++) {
                campoFiltrado.push(campos[matrizIndice[k]]);
            }
            for (var j = 0; j < nCabeceras; j++) {
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
                if (campos[10] != "I") {
                    total = total + (campos[9] * 1);
                }
                x++;
            }
        }

        document.getElementById("spnTotal").innerHTML = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
        paginar(0, true);
        indiceActualBloque = 0;
    }
    else {
        totales.mtImporte = 0,
            totales.mtBonificacion = 0,
            totales.mtDescuento = 0,
            totales.mtAjuste = 0,
            totales.mtTotal = 0;

        var cabeceras = document.getElementsByName("cabeceraD");
        var nCabeceras = cabeceras.length;
        var cabecera;
        var exito;
        matrizDetalle = [];
        var nRegistros = listaProvision.length;
        var nCampos;
        var contenido = "";
        var campos;
        var campoFiltrado = [];
        var x = 0;
        var nFiltrados = matrizIndiceDetalle.length

        for (var i = 0; i < nRegistros; i++) {
            campos = listaProvision[i].split("¦");
            campoFiltrado = [];
            nCampos = campos.length;
            for (var k = 0; k < nFiltrados; k++) {
                campoFiltrado.push(campos[matrizIndiceDetalle[k]]);
            }

            for (var j = 0; j < nCabeceras; j++) {
                exito = true;
                cabecera = cabeceras[j];
                if (cabecera.className == "TextoD") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
                else exito = exito && (cabecera.value == "" || campoFiltrado[j].toLowerCase() == cabecera.value.toLowerCase());
                if (!exito) break;
            }

            if (exito) {
                if (SeleccionActualProceso == campos[7]) {
                    matrizDetalle[x] = [];
                    nCampos = campos.length;
                    for (j = 0; j < nCampos; j++) {
                        if (isNaN(campos[j]) || j == 1) {
                            matrizDetalle[x][j] = campos[j];
                        }
                        else {
                            matrizDetalle[x][j] = campos[j] * 1;
                        }

                    }
                    totales.mtImporte = (totales.mtImporte + (campos[2] * 1))
                    totales.mtBonificacion = (totales.mtBonificacion + (campos[3] * 1)),
                        totales.mtDescuento = (totales.mtDescuento + (campos[4] * 1)),
                        totales.mtAjuste = (totales.mtAjuste + (campos[5] * 1)),
                        totales.mtTotal = (totales.mtTotal + (campos[6] * 1));
                    x++;
                }
            }

        }

        paginar(0, false);
        indiceActualBloque = 0;
    }
}

function paginarMedicosConfirma(indicePaginaConf) {
    var nRegistros = MatrizMedicosSeleccionados.length;
    var esBloque = (indicePaginaConf < 0);
    if (esBloque) {
        var indiceUltimaPagina = Math.floor(nRegistros / 8);
        if (nRegistros % 8 == 0) indiceUltimaPagina--;
        var indiceUltimoBloque = Math.floor(nRegistros / (5 * 8));
        if (nRegistros % (5 * 8) == 0) indiceUltimoBloque--;
        switch (indicePaginaConf) {
            case -1:
                indicePaginaConf = 0;
                indiceActualBloqueConf = 0;
                break;
            case -2:
                if (indiceActualBloqueConf > 0) {
                    indiceActualBloqueConf--;
                    indicePaginaConf = indiceActualBloqueConf * 5;
                }
                break;
            case -3:
                if (indiceActualBloqueConf < indiceUltimoBloque) {
                    indiceActualBloqueConf++;
                    indicePaginaConf = indiceActualBloqueConf * 5;
                }
                break;
            case -4:
                indicePaginaConf = indiceUltimaPagina;
                indiceActualBloqueConf = indiceUltimoBloque;
                break;
        }
    }
    indiceActualPaginaConf = indicePaginaConf;
    mostrarMatrizMedicosConfirmar(indicePaginaConf);

    mensajeValidacion = [];

    var validar = document.getElementsByClassName("validar2");
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
                        var dato = this.getAttribute("data-matriz");
                        if (MatrizMedicosSeleccionados[dato][3] != "" || MatrizMedicosSeleccionados[dato][4] != "" || MatrizMedicosSeleccionados[dato][5] != "") {
                            validarIndividual(this, true);
                        }
                        else {
                            if (MatrizMedicosSeleccionados[dato][3] == "" && MatrizMedicosSeleccionados[dato][4] == "" && MatrizMedicosSeleccionados[dato][5] == "") {
                                document.getElementsByClassName("txtSerConf")[dato].className = "txtSerConf validar2";
                                document.getElementsByClassName("txtNumConf")[dato].className = "txtNumConf validar2";
                                document.getElementsByClassName("txtFecConf")[dato].className = "txtFecConf validar2";
                                mensajeValidacion[document.getElementsByClassName("txtSerConf")[dato].getAttribute("data-secuencia")];
                                mensajeValidacion[document.getElementsByClassName("txtNumConf")[dato].getAttribute("data-secuencia")];
                                mensajeValidacion[document.getElementsByClassName("txtFecConf")[dato].getAttribute("data-secuencia")];
                            }
                        }
                    }
                }
                EsconderToolTip(tipError);
            }
        }
        validar[x].onmouseleave = function () {
            if (mensajeValidacion.length > 0) {
                var dato = this.getAttribute("data-matriz");
                if (MatrizMedicosSeleccionados[dato][3] != "" || MatrizMedicosSeleccionados[dato][4] != "" || MatrizMedicosSeleccionados[dato][5] != "") {
                    validarIndividual(this, true);
                }
                else {
                    if (MatrizMedicosSeleccionados[dato][3] == "" && MatrizMedicosSeleccionados[dato][4] == "" && MatrizMedicosSeleccionados[dato][5] == "") {
                        document.getElementsByClassName("txtSerConf")[dato].className = "txtSerConf validar2";
                        document.getElementsByClassName("txtNumConf")[dato].className = "txtNumConf validar2";
                        document.getElementsByClassName("txtFecConf")[dato].className = "txtFecConf validar2";
                        mensajeValidacion[document.getElementsByClassName("txtSerConf")[dato].getAttribute("data-secuencia")];
                        mensajeValidacion[document.getElementsByClassName("txtNumConf")[dato].getAttribute("data-secuencia")];
                        mensajeValidacion[document.getElementsByClassName("txtFecConf")[dato].getAttribute("data-secuencia")];
                    }
                }
            }
            EsconderToolTip(tipError);
        }
    }
}


function crearPaginasConf() {
    var nRegistros = MatrizMedicosSeleccionados.length;
    var indiceUltimaPagina = Math.floor(nRegistros / 8);
    if (nRegistros % 5 == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (5 * 8));
    if (nRegistros % (5 * 8) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = indiceActualBloqueConf * 5;
    var fin = inicio + 5;
    if (indiceActualBloqueConf > 0 && nRegistros > (5 * 8)) {
        contenido += "<span class='pagina' onclick='paginarMedicosConfirma(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginarMedicosConfirma(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginarMedicosConfirma(";
            contenido += i;
            contenido += ");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            contenido += "' id='aConf";
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if (indiceActualBloqueConf < indiceUltimoBloque && nRegistros > (5 * 8)) {
        contenido += "<span class='pagina' onclick='paginarMedicosConfirma(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginarMedicosConfirma(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= registrosPagina) {
        document.getElementById("tdPaginasConfSel").innerHTML = "";
    }
    else {
        document.getElementById("tdPaginasConfSel").innerHTML = contenido;
        seleccionarPaginaActualConf();
    }
}

function seleccionarPaginaActualConf() {
    var aPagina = document.getElementById("aConf" + indiceActualPaginaConf);
    if (aPagina != null) {
        aPagina.className += " seleccionado";
    }
}

function mostrarMatrizMedicosConfirmar(indicePagina) {
    indiceActualPaginaConf = indicePagina;
    var contenido = "";
    Campoeliminar = "";
    var n = MatrizMedicosSeleccionados.length;
    var ConfiguracionActual = 0;
    if (n > 0) {
        var inicio = indicePagina * 8;
        var fin = inicio + 8;
        var contador = 0;
        for (var z = 0; z < n; z++) {
            if (z < n) {
                contenido += "<tr class='FilaDatos trMedConf' data-id='";
                contenido += MatrizMedicosSeleccionados[z][0];
                contenido += "'><td>";
                contenido += MatrizMedicosSeleccionados[z][1];
                contenido += "</td><td>"
                contenido += "<select class='ddlConfirmarTipoDoc lectura' style='padding:5px 0;width:100%' disabled>";
                for (var k = 0; k < listaTipoDocumento.length; k++) {
                    valor2 = listaTipoDocumento[k].split("¦");
                    contenido += "<option value='";
                    contenido += valor2[0];
                    if (valor2[0] == MatrizMedicosSeleccionados[z][2]) contenido += "' selected>";
                    else contenido += "'>";
                    contenido += valor2[1].trim();
                    contenido += "</option>";
                }
                contenido += "</select></td><td>";
                contenido += "<input type='text' class='txtSerConf validar2' id='txtSerConf" + z + "' data-matriz='" + z + "' data-secuencia='" + contador + "' data-obligatorio='true' data-validacion='validarTexto|Serie' style='padding:5px 0;width:100%;text-transform:uppercase' maxlength='4' value='";
                contenido += MatrizMedicosSeleccionados[z][3];
                contenido += "'/></td><td>";
                contador++;
                contenido += "<input type='text' class='txtNumConf validar2' id='txtNumConf" + z + "' data-matriz='" + z + "' data-secuencia='" + (contador) + "' data-obligatorio='true' data-validacion='validarTexto|Número' style='padding:5px 0;width:100%' maxlength='8' value='";
                contenido += MatrizMedicosSeleccionados[z][4];
                contenido += "'/></td><td>";
                contador++;
                contenido += "<input type='text' class='txtFecConf validar2' id='txtFecConf" + z + "' data-matriz='" + z + "' data-secuencia='" + (contador) + "' data-obligatorio='true' data-validacion='validarFecha2|Fecha' placeholder='dd/mm/yyyy' style='padding:5px 0;width:100%' maxlength='10' value='";
                contenido += MatrizMedicosSeleccionados[z][5];
                contenido += "'/></td>";
                contenido += "<td style='text-align:center;vertical-align:middle'><span class='Icons fa-eye MessMed' style='display:none'></span></td>";
                contenido += "</tr>";
                contador++;
            }
        }
        document.getElementById("tbConfirmarProvision").innerHTML = contenido;
        var txtFecConf = document.getElementsByClassName("txtFecConf");
        var picker = document.getElementsByClassName("date-picker-x");
        for (var x = 0; x < txtFecConf.length; x++) {
            txtFecConf[x].DatePickerX.init({
                mondayFirst: true
            });
            txtFecConf[x].readOnly = false;

        }
        var contadorPicker = 0;
        var contadorMatriz = 0;
        for (var x = 2; x < picker.length; x++) {
            picker[x].setAttribute("data-id", contadorPicker + "|" + contadorMatriz);
            picker[x].onclick = function () {
                var dato = this.getAttribute("data-id").split("|");
                MatrizMedicosSeleccionados[dato[1]][5] = document.getElementsByClassName("txtFecConf")[dato[0]].value;
            }
            contadorPicker++;
            contadorMatriz++;
        }
        //crearPaginasConf();
        recogerValores();
    }
}



function recogerValores() {
    var selects = document.getElementsByClassName("ddlConfirmarTipoDoc");
    for (var x = 0; x < selects.length; x++) {
        selects[x].onchange = function () {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizFiltroMedicosSeleccionados.length; x++) {
                if (MatrizFiltroMedicosSeleccionados[x][0] == valor) {
                    MatrizFiltroMedicosSeleccionados[x][2] = this.value;
                    break;
                }
            }
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][2] = this.value;
                    break;
                }
            }
        }
    }

    var txtNumConf = document.getElementsByClassName("txtNumConf");
    for (var x = 0; x < txtNumConf.length; x++) {
        txtNumConf[x].onkeyup = function () {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizFiltroMedicosSeleccionados.length; x++) {
                if (MatrizFiltroMedicosSeleccionados[x][0] == valor) {
                    MatrizFiltroMedicosSeleccionados[x][3] = this.value;
                    break;
                }
            }
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][3] = this.value;
                    break;
                }
            }
        }
    }

    var txtSerConf = document.getElementsByClassName("txtSerConf");
    for (var x = 0; x < txtSerConf.length; x++) {
        txtSerConf[x].onkeyup = function () {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizFiltroMedicosSeleccionados.length; x++) {
                if (MatrizFiltroMedicosSeleccionados[x][0] == valor) {
                    MatrizFiltroMedicosSeleccionados[x][4] = this.value;
                    break;
                }
            }
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][4] = this.value;
                    break;
                }
            }
        }
    }

    var txtFecConf = document.getElementsByClassName("txtFecConf");
    for (var x = 0; x < txtFecConf.length; x++) {
        txtFecConf[x].onkeyup = function () {
            var valor = this.parentNode.parentNode.getAttribute("data-id") * 1;
            for (x = 0; x < MatrizFiltroMedicosSeleccionados.length; x++) {
                if (MatrizFiltroMedicosSeleccionados[x][0] == valor) {
                    MatrizFiltroMedicosSeleccionados[x][5] = this.value;
                    break;
                }
            }
            for (x = 0; x < MatrizMedicosSeleccionados.length; x++) {
                if (MatrizMedicosSeleccionados[x][0] == valor) {
                    MatrizMedicosSeleccionados[x][5] = this.value;
                    break;
                }
            }
        }
    }
}

function mostrarDetalleOA(id, dato) {
    var ifrPlanillaDetalleConceptosOA = document.getElementById("ifrPlanillaDetalleConceptosOA");
    if (ifrPlanillaDetalleConceptosOA.innerHTML == "") {
        ifrPlanillaDetalleConceptosOA.innerHTML = "<iframe id='divIfrPlanillaDetalleOA' style='margin:0;padding:0;width:100%;height:400px;border: 1px solid transparent;' src='" + urlBase + "Proceso/PlanillaDetalleConceptosOA/?ss=" + ss + "&data=" + id + "'></iframe>";
    }
    else {
        document.getElementById('divIfrPlanillaDetalleOA').src = urlBase + "Proceso/PlanillaDetalleConceptosOA/?ss=" + ss + "&data=" + id;
    }
    document.getElementById('divIfrPlanillaDetalleOA').style.height = (document.getElementById("ppcabecera").clientHeight - 150) + "px";


    document.getElementById("txtMedicoPla").value = dato;
    abrirPopup("PopupPlanillaDetalleConceptosOA");
}


function validarFecha(Tex, Mensaje, Obligatorio) {
    var Tex = document.getElementById(Tex).value;
    if (Obligatorio) {
        if (Tex.replace(/^\s+|\s+$/g, "").length == 0) {
            return 'Ingrese ' + Mensaje.toLowerCase();
        }
    }
    if (Tex.replace(/^\s+|\s+$/g, "").length > 0) {
        if (!esFecha(Tex)) {
            return 'La ' + Mensaje + ' es inválida';
        }
        else {
            var fecha = new Date();
            var Ano = new String(Tex.substring(Tex.lastIndexOf("/") + 1, Tex.length));
            var Mes = new String(Tex.substring(Tex.indexOf("/") + 1, Tex.lastIndexOf("/")));
            var Dia = new String(Tex.substring(0, Tex.indexOf("/")));
            if (new Date((Ano * 1), (Mes * 1) - 1, (Dia * 1)) > fecha) {
                return 'La fecha no puede ser mayor a la fecha actual';
            }
            else {
                fecha.setMonth(fecha.getMonth() - 5);
                if (new Date((Ano * 1), (Mes * 1) - 1, (Dia * 1)) < fecha) {
                    return 'La fecha no debe ser menor a 5 meses';
                }
            }
        }

    }
    return "";
}

function validarFecha2(Tex, Mensaje, Obligatorio) {
    var Tex = document.getElementById(Tex).value;
    if (Obligatorio) {
        if (Tex.replace(/^\s+|\s+$/g, "").length == 0) {
            return 'Ingrese ' + Mensaje.toLowerCase();
        }
    }
    if (Tex.replace(/^\s+|\s+$/g, "").length > 0) {
        if (!esFecha(Tex)) {
            return 'La ' + Mensaje + ' es inválida';
        }
        else {
            var fecha = new Date();
            var Ano = new String(Tex.substring(Tex.lastIndexOf("/") + 1, Tex.length));
            var Mes = new String(Tex.substring(Tex.indexOf("/") + 1, Tex.lastIndexOf("/")));
            var Dia = new String(Tex.substring(0, Tex.indexOf("/")));
            if (new Date((Ano * 1), (Mes * 1) - 1, (Dia * 1)) > fecha) {
                return 'La fecha no puede ser mayor a la fecha actual';
            }
            else {
                var fecha2 = new Date(2017, 3, 1);
                if (new Date((Ano * 1), (Mes * 1) - 1, (Dia * 1)) < fecha2) {
                    return 'La fecha no debe ser menor al 01/04/2017 ';
                }
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











function crearTablaDetalle(elemento) {
    var identificador = elemento.split("|");
    var cabeceras = window["cabeceras" + identificador[0]];
    var nCampos = cabeceras.length;
    var contenido = "";
    switch (identificador[1]) {
        case "0":
            contenido = "<table id='tblProduccion' class='tabla-general' style='table-layout:fixed'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            //contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
            break;
        case "1":
            contenido = "<table id='tblMontoFijo' class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            //contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosM'/></th>";
            break;
        case "2":
            contenido = "<table id='tblHorario' class='tabla-general' style='margin-botton:10px;'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            //contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosP'/></th>";
            break;
        case "3":
            contenido = "<table id='tblTurno' class='tabla-general' style='margin-botton:10px;'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            //contenido += "<th style='width:1%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosB'/></th>";
            break;
    }

    for (var j = 0; j < nCampos; j++) {
        contenido += "<th style='width:";
        contenido += window["anchos" + identificador[0]][j];
        contenido += "px'><span id='spn";
        contenido += j.toString();
        contenido += "' class='Enlace";
        contenido += identificador[0];
        contenido += "-";
        contenido += identificador[1];
        contenido += "' data-orden='";
        contenido += window["matriz" + identificador[0]][j];
        contenido += "'>";
        contenido += window["cabeceras" + identificador[0]][j];
        contenido += "</span><br/>";
        contenido += "<input type='text' class='Texto";
        contenido += identificador[0];
        contenido += "' name='cabecera";
        contenido += identificador[0];
        contenido += "' style='width:90%'>";
        contenido += "</th>";
    }
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
    contenido += (nCampos).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("div" + identificador[0]).innerHTML = contenido;
}
function paginarDetalle(indicePagina, elemento) {
    var identificador = elemento.split("|");
    var nRegistros = window["matriz" + identificador[0]].length;
    var esBloque = (indicePagina < 0);
    var registroPaginaActual;
    if (identificador[1] == "2" || identificador[1] == "3") {
        registroPaginaActual = registroPaginaDetalle;
    } else {
        registroPaginaActual = registrosPagina;
    }
    if (esBloque) {
        var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
        if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
        var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
        if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
        switch (indicePagina) {
            case -1:
                indicePagina = 0;
                switch (identificador[1]) {
                    case "0":
                        indiceActualBloque = 0;
                        break;
                    case "1":
                        indiceActualBloqueM = 0;
                        break;
                    case "2":
                        indiceActualBloqueP = 0;
                        break;
                    case "3":
                        indiceActualBloqueB = 0;
                        break;

                }
                break;
            case -2:
                switch (identificador[1]) {
                    case "0":
                        if (indiceActualBloque > 0) {
                            indiceActualBloque--;
                            indicePagina = indiceActualBloque * paginasBloque;
                        }
                        break;
                    case "1":
                        if (indiceActualBloqueM > 0) {
                            indiceActualBloqueM--;
                            indicePagina = indiceActualBloqueM * paginasBloque;
                        }
                        break;
                    case "2":
                        if (indiceActualBloqueP > 0) {
                            indiceActualBloqueP--;
                            indicePagina = indiceActualBloqueP * paginasBloque;
                        }
                        break;
                    case "3":
                        if (indiceActualBloqueB > 0) {
                            indiceActualBloqueB--;
                            indicePagina = indiceActualBloqueB * paginasBloque;
                        }
                        break;
                }
                break;
            case -3:
                switch (identificador[1]) {
                    case "0":
                        if (indiceActualBloque < indiceUltimoBloque) {
                            indiceActualBloque++;
                            indicePagina = indiceActualBloque * paginasBloque;
                        }
                        break;
                    case "1":
                        if (indiceActualBloqueM < indiceUltimoBloque) {
                            indiceActualBloqueM++;
                            indicePagina = indiceActualBloqueM * paginasBloque;
                        }
                        break;
                    case "2":
                        if (indiceActualBloqueP < indiceUltimoBloque) {
                            indiceActualBloqueP++;
                            indicePagina = indiceActualBloqueP * paginasBloque;
                        }
                        break;
                    case "3":
                        if (indiceActualBloqueB < indiceUltimoBloque) {
                            indiceActualBloqueB++;
                            indicePagina = indiceActualBloqueB * paginasBloque;
                        }
                        break;
                }
                break;
            case -4:
                switch (identificador[1]) {
                    case "0":
                        indicePagina = indiceUltimaPagina;
                        indiceActualBloque = indiceUltimoBloque;
                        break;
                    case "1":
                        indicePagina = indiceUltimaPagina;
                        indiceActualBloqueM = indiceUltimoBloque;
                        break;
                    case "2":
                        indicePagina = indiceUltimaPagina;
                        indiceActualBloqueP = indiceUltimoBloque;
                        break;
                    case "3":
                        indicePagina = indiceUltimaPagina;
                        indiceActualBloqueB = indiceUltimoBloque;
                        break;
                }
                break;
        }
    }
    switch (identificador[1]) {
        case "0":
            indiceActualPagina = indicePagina;
            break;
        case "1":
            indiceActualPaginaM = indicePagina;
            break;
        case "2":
            indiceActualPaginaP = indicePagina;
            break;
        case "3":
            indiceActualPaginaB = indicePagina;
            break;
    }
    mostrarMatrizDetalle(indicePagina, elemento);
}
function crearMatrizDetalle(elemento) {
    var identificador = elemento.split("|");
    var nRegistros = window["lista" + identificador[0]].length;
    var nCampos;
    var campos;
    var x = 0, nFiltro, regFiltro, ndDpl = false, posproceso;
    if (window["lista" + identificador[0]][0] != "") {
        window["matriz" + identificador[0]] = [];
        for (var i = 0; i < nRegistros; i++) {
            campos = window["lista" + identificador[0]][i].split("¦");
            window["matriz" + identificador[0]][x] = [];
            nCampos = campos.length;
            switch (identificador[1]) {
                case "0":
                case "1":
                case "2":
                case "3":
                    for (var j = 0; j < nCampos; j++) {
                        if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
                        else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
                    }

                    break;
            }
            x++;

        }
    }
    else {
        window["matriz" + identificador[0]] = [];
    }
}
function mostrarMatrizDetalle(indicePagina, elemento) {

    var identificador = elemento.split("|");
    switch (identificador[1]) {
        case "0":
            indiceActualPagina = indicePagina;
            break;
        case "1":
            indiceActualPaginaM = indicePagina;
            break;
        case "2":
            indiceActualPaginaP = indicePagina;
            break;
        case "3":
            indiceActualPaginaB = indicePagina;
            break;
    }

    var contenido = "";
    var n = window["matriz" + identificador[0]].length;
    var camposSecuencia = "";
    var esBloque = (indicePagina < 0);
    if (n > 0) {
        var registroPaginaActual;
        registroPaginaActual = registrosPagina;


        var nCampos = window["matriz" + identificador[0]][0].length;
        var inicio = indicePagina * registroPaginaActual;
        var fin = inicio + registroPaginaActual;
        var valorTadm;
        switch (identificador[1]) {
            case "0":
            case "1":
            case "2":
            case "3":
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        for (var j = 0; j < nCampos; j++) {
                            contenido += "<td>";
                            contenido += window["matriz" + identificador[0]][i][j];
                            contenido += "</td>";

                        }
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
        }
    }
    else {
        var nCabeceras = window["cabeceras" + identificador[0]].length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras).toString();
        contenido += "'>No hay datos</td></tr>";
    }
    document.getElementById("tb" + identificador[0]).innerHTML = contenido;
    crearPaginasDetalle(elemento);
    if (esBloque) {
        crearPaginasDetalle(elemento);
    }
}
function crearPaginasDetalle(elemento) {
    var identificador = elemento.split("|");
    var nRegistros = window["matriz" + identificador[0]].length;
    var registroPaginaActual;
    registroPaginaActual = registroPaginaDetalle;

    var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
    if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
    if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
    var contenido = "", bloqueActual;
    switch (identificador[1]) {
        case "0":
            bloqueActual = indiceActualBloque;
            break;
        case "1":
            bloqueActual = indiceActualBloqueM;
            break;
        case "2":
            bloqueActual = indiceActualBloqueP;
            break;
        case "3":
            bloqueActual = indiceActualBloqueB;
            break;
    }

    var inicio = bloqueActual * paginasBloque;
    var fin = inicio + paginasBloque;
    if ((bloqueActual) > 0 && nRegistros > (paginasBloque * registroPaginaActual)) {
        contenido += "<span class='pagina' onclick='paginarDetalle(-1,\"" + elemento + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginarDetalle(-2,\"" + elemento + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginarDetalle(";
            contenido += i;
            contenido += ",\"";
            contenido += elemento;
            contenido += "\");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            contenido += "' id='a";
            contenido += identificador[0];
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if ((bloqueActual) < indiceUltimoBloque && nRegistros > (paginasBloque * registroPaginaActual)) {
        contenido += "<span class='pagina' onclick='paginarDetalle(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginarDetalle(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= registrosPagina) {
        document.getElementById("tdPaginas" + identificador[0]).innerHTML = "";
    }
    else {
        document.getElementById("tdPaginas" + identificador[0]).innerHTML = contenido;
        seleccionarPaginaActualDetalle(identificador[0], identificador[1]);
    }
}

function seleccionarPaginaActualDetalle(dato, identificador) {
    var indice;
    switch (identificador) {
        case "0":
            indice = indiceActualPagina;
            break;
        case "1":
            indice = indiceActualPaginaM;
            break;
        case "2":
            indice = indiceActualPaginaP;
            break;
        case "3":
            indice = indiceActualPaginaB;
            break;

    }
    var aPagina = document.getElementById("a" + dato + (indice));
    if (aPagina != null) {
        aPagina.className += " seleccionado";
    }
}
function filtrarDetalle(elemento) {
    var identificador = elemento.split("|");
    var cabeceras = document.getElementsByName("cabecera" + identificador[0]);
    var nCabeceras = cabeceras.length;
    var cabecera;
    var exito;
    window["matriz" + identificador[0]] = [];
    var nRegistros = window["lista" + identificador[0]].length;
    var nCampos;
    var contenido = "";
    var campos;
    var campoFiltrado = [];
    var nFiltrados = window["matrizIndice" + identificador[0]].length
    var x = 0;
    for (var i = 0; i < nRegistros; i++) {
        campos = window["lista" + identificador[0]][i].split("¦");
        campoFiltrado = [];
        nCampos = campos.length;
        for (var j = 0; j < nCabeceras; j += 1) {
            exito = true;
            cabecera = cabeceras[j];
            if (cabecera.className == ("Texto" + identificador[0])) exito = exito && (campos[window["matrizIndice" + identificador[0]][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
            else exito = exito && (cabecera.value == "" || campos[window["matrizIndice" + identificador[0]][j]] == cabecera.value);
            if (!exito) break;
        }

        if (exito) {
            window["matriz" + identificador[0]][x] = [];
            for (var j = 0; j < nCampos; j++) {
                if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
                else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
            }
            x++;
        }
    }
    paginarDetalle(0, elemento);
    switch (identificador) {
        case "0":
            indiceActualPagina = 0;
            break;
        case "1":
            indiceActualPaginaM = 0;
            break;
        case "2":
            indiceActualPaginaP = 0;
            break;
        case "3":
            indiceActualPaginaB = 0;
            break;
    }
}
function mostrarTabsDetalle(elemento) {
    var tab = document.getElementById("ulTabsD");
    elementos = tab.getElementsByClassName("tab-link");
    for (var x = 0; x < elementos.length; x++) {
        if (elementos[x].getAttribute("data-tab") == elemento.getAttribute("data-tab")) {
            elementos[x].className = "tab-link current";
            document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content current";
        }
        else {
            elementos[x].className = "tab-link";
            document.getElementById(elementos[x].getAttribute("data-tab")).className = "tab-content";
        }
    }
}

function configurarHistorial() {

    var hstest = document.getElementsByClassName("hstest");
    var n = hstest.length, spn;
    for (var i = 0; i < n; i++) {
        spn = hstest[i];
        spn.onclick = function () {
            var valor = this.getAttribute("data-v");
            var tabla = this.getAttribute("data-t");
            var hdfCd = document.getElementById("hdfCd");
            hdfCd.value = valor;
            verHistorial(tabla);
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

function validarSoloNumero(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 8 && keyCode != 9 && keyCode != 0) {
            event.preventDefault();
        }
    }
}