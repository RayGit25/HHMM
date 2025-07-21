var _data, _matriz = [];
var _totales = {
	mtImporte: 0, mtBonificacion: 0, mtDescuento: 0,
	mtAjuste: 0, mtTotal: 0
};
var _cabeceras = [
	'Planilla', 'Médico/Empresa', 'Importe',
	'Bonificación', 'Descuento', 'Ajuste',
	'Total', 'Estado'
];
var _anchos = [
	8, 23, 10,
	10, 10, 10,
	10, 12
];
var _indices = [
	0, 1, 2,
	3, 4, 5,
	6, 7
];
var _registrosPagina = 5, _indiceActualPagina = 0;
var _paginasBloque = 5, _indiceActualBloque = 0;
var _registrosSeleccionados = [];


window.onload = function () {
    crearTabla();
    configurarFiltro();
    configurarControles();
	var hdfDatos = document.getElementById("hdfDatos").value.split("|");
	urlBase = location.protocol + "//" + window.location.host + window.parent.parent.parent.document.getElementById("Ref").value;
	var ss = window.parent.parent.document.getElementById("iss").value;
	var url = urlBase + "Proceso/listarUnificacionPlanilla/?ss=" + ss + "&id=" + hdfDatos[0];
    $.ajax(url, "get", listarTodo);
}

function crearTabla() {
    var nCampos;
    var contenido = "";
    var nCampos = _cabeceras.length;
    var contenido = "<table class='tabla-general'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
    for (var j = 0; j < nCampos; j++) {
        contenido += "<th style='width:";
        contenido += _anchos[j];
        contenido += "%;' ";
        if (j == 7 || j == 8 || j == 9) {
            contenido += "class='ocultarSeccionDiv'";
        }
        contenido += "><span id='spn";
        contenido += j.toString();
        contenido += "' class='EnlaceD' data-orden='";
        contenido += _indices[j];
        contenido += "'>";
        contenido += _cabeceras[j];
        contenido += "</span><br/>";
        if (j != (nCampos - 1)) {
            contenido += "<input type='text' class='TextoD' name='cabeceraD' style='width:90%'>";
        }
        contenido += "</th>";
    }
    contenido += "<th style='width:10%;vertical-align: middle;text-align: center;padding:6px 20px'>";
    contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcelDetalle'></a>";
    contenido += "</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tbUnificacionPlantilla' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginasDetalle' colspan='";
    contenido += (nCampos + 2);
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divDetalle").innerHTML = contenido;
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

function configurarControles() {
    var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
    aExportarExcelDetalle.onclick = function () {
        var nRegistros = _matriz.length;
        if (nRegistros > 0) {
            exportacion(this);
        }
        else {
            this.removeAttribute("download");
            this.href = "#";
        }
    }
    var chkTodos = document.getElementById("chkTodos");
    chkTodos.onclick = function () {
        if (_matriz.length > 0) {
            //var rdnDetalle = document.getElementsByName("rdnDetalle");
            _registrosSeleccionados = [];
            if (this.checked) {
                var valor;
                for (var x = 0; x < _data.length; x++) {
                    valor = _data[x].split("¦");
                    //if (SeleccionActualProceso == valor[7]) {
                    _registrosSeleccionados.push(valor[0] * 1);
                    //}
                }
            }
        }
        paginar(0);
    }
}

function listarTodo(rpta) {
    if (rpta != "") {
        _data = rpta.split("¬");
        //TEST
        //let i = 1;
        //let aCampo = _data[0].split('¦');
        //while (i <= 100) {
        //    aCampo[0] = i;
        //    _data.push(aCampo.join('¦'));
        //    i++;
        //}
        //TEST
        crearMatriz();
        paginar(0);
    } else {
        console.log('Limpiar grilla');
    }
}

function crearMatriz() {
    _totales.mtImporte = 0;
    _totales.mtBonificacion = 0;
    _totales.mtDescuento = 0;
    _totales.mtAjuste = 0;
    _totales.mtTotal = 0;

    var nRegistros;
    var nCampos;
    var campos;
    var x = 0;

    //var valor;
    nRegistros = _data.length;
    _matriz = [];
    for (i = 0; i < nRegistros; i++) {
        campos = _data[i].split("¦");
        if (true) {//SeleccionActualProceso == campos[7]) {
            _matriz[x] = [];
            nCampos = campos.length;
            for (j = 0; j < nCampos; j++) {
                if (isNaN(campos[j]) || j == 1) {
                    _matriz[x][j] = campos[j];
                }
                else {
                    _matriz[x][j] = campos[j] * 1;
                }

            }
            _totales.mtImporte = (_totales.mtImporte + (campos[2] * 1));
            _totales.mtBonificacion = (_totales.mtBonificacion + (campos[3] * 1));
            _totales.mtDescuento = (_totales.mtDescuento + (campos[4] * 1));
            _totales.mtAjuste = (_totales.mtAjuste + (campos[5] * 1));
            _totales.mtTotal = (_totales.mtTotal + (campos[6] * 1));
            x++;
        }
    }
}

function filtrar() {
    _totales.mtImporte = 0;
    _totales.mtBonificacion = 0;
    _totales.mtDescuento = 0;
    _totales.mtAjuste = 0;
    _totales.mtTotal = 0;

    var cabeceras = document.getElementsByName("cabeceraD");
    var nCabeceras = cabeceras.length;
    var cabecera;
    var exito;
    _matriz = [];
    var nRegistros = _data.length;
    var nCampos;
    var campos;
    var campoFiltrado = [];
    var x = 0;
    var nFiltrados = _indices.length

    for (var i = 0; i < nRegistros; i++) {
        campos = _data[i].split("¦");
        campoFiltrado = [];
        nCampos = campos.length;
        for (var k = 0; k < nFiltrados; k++) {
            campoFiltrado.push(campos[_indices[k]]);
        }

        for (var j = 0; j < nCabeceras; j++) {
            exito = true;
            cabecera = cabeceras[j];
            if (cabecera.className == "TextoD") exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
            else exito = exito && (cabecera.value == "" || campoFiltrado[j].toLowerCase() == cabecera.value.toLowerCase());
            if (!exito) break;
        }

        if (exito) {
            if (true) {//SeleccionActualProceso == campos[7]) {
                _matriz[x] = [];
                nCampos = campos.length;
                for (j = 0; j < nCampos; j++) {
                    if (isNaN(campos[j]) || j == 1) {
                        _matriz[x][j] = campos[j];
                    }
                    else {
                        _matriz[x][j] = campos[j] * 1;
                    }

                }
                _totales.mtImporte = (_totales.mtImporte + (campos[2] * 1));
                _totales.mtBonificacion = (_totales.mtBonificacion + (campos[3] * 1));
                _totales.mtDescuento = (_totales.mtDescuento + (campos[4] * 1));
                _totales.mtAjuste = (_totales.mtAjuste + (campos[5] * 1));
                _totales.mtTotal = (_totales.mtTotal + (campos[6] * 1));
                x++;
            }
        }

    }
    paginar(0);
    _indiceActualBloque = 0;
}

function paginar(indicePagina) {
	var nRegistros = _matriz.length;
	var esBloque = (indicePagina < 0);
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / _registrosPagina);
		if (nRegistros % _registrosPagina == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (_paginasBloque * _registrosPagina));
		if (nRegistros % (_paginasBloque * _registrosPagina) == 0) indiceUltimoBloque--;
		switch (indicePagina) {
			case -1:
				indicePagina = 0;
                _indiceActualBloque = 0;
				break;
            case -2:
                if (_indiceActualBloque > 0) {
                    _indiceActualBloque--;
                    indicePagina = _indiceActualBloque * _paginasBloque;
				}
				break;
			case -3:
                if (_indiceActualBloque < indiceUltimoBloque) {
                    _indiceActualBloque++;
                    indicePagina = _indiceActualBloque * _paginasBloque;
				}
				break;
			case -4:
				indicePagina = indiceUltimaPagina;
                _indiceActualBloque = indiceUltimoBloque;
				break;
		}
	}
	_indiceActualPagina = indicePagina;
	mostrarMatriz(indicePagina);
}

function mostrarMatriz(indicePagina) {
    _indiceActualPagina = indicePagina;
    var contenido = "";
    //Campoeliminar = "";
    var n = _matriz.length;
    var nCabeceras = _cabeceras.length;
    //var ConfiguracionActual = 0;
    if (n > 0) {
        var nCampos = _cabeceras.length;
        var inicio = indicePagina * _registrosPagina;
        var fin = inicio + _registrosPagina;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<td style='text-align:center'>";
                if (true) { //matrizDetalle[i][7] != "D") { //Validar con que estado no debe mostrar
                    contenido += "<input type='checkbox' name='rdnDetalle' id='rdn";
                    contenido += i;
                    contenido += "' data-check='";
                    contenido += _matriz[i][0];
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
                            contenido += _matriz[i][_indices[j]].toLocaleString('en-US', { minimumFractionDigits: 2 });
                            contenido += "</td>";
                            break;
                        case 7:
                            contenido += "<td><span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='";
                            contenido += _matriz[i][0];
                            contenido += "' data-t='PlanillaMedico'>";
                            //switch (_matriz[i][_indices[j]]) {
                            //    case "P":
                            //        contenido += "PENDIENTE";
                            //        break;
                            //    case "D":
                            //        contenido += "DIFUNDIR";
                            //        break;
                            //    case "C":
                            //        contenido += "CONFIRMAR";
                            //        break;
                            //    case "O":
                            //        contenido += "ENVIAR OBLIGACIÓN";
                            //        break;
                            //    case "G":
                            //        contenido += "PENDIENTE DE PAGO";
                            //        break;
                            //    case "F":
                            //        contenido += "PAGADO";
                            //        break;
                            //}
                            contenido += _matriz[i][_indices[j]];
                            contenido += "</span>";
                            contenido += "</td>";
                            break;
                        default:
                            //if (j == 7 || j == 8 || j == 9) {
                            //    if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
                            //        contenido += "<td>";
                            //        if (j == 8) {
                            //            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]] == 0 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                            //        }
                            //        else if (j == 9) {
                            //            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]].indexOf("1900") > -1 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                            //        }
                            //        else {
                            //            contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                            //        }
                            //        contenido += "</td>";
                            //    }
                            //}
                            //else {
                            contenido += "<td>";
                            contenido += _matriz[i][_indices[j]];
                            contenido += "</td>";
                            //}
                            break;
                    }

                }
                contenido += "<td style='text-align:center'><span class='Icons ";
                contenido += "fa-list-alt";
                contenido += "' onclick='mostrarDetalleOA(";
                contenido += _matriz[i][0];
                contenido += ",\"";
                contenido += _matriz[i][1];
                contenido += "\")'></span>";
                //if (SeleccionActualProceso == "P" || SeleccionActualProceso == "C" || SeleccionActualProceso == "O" || SeleccionActualProceso == "D") {
                //    contenido += "&nbsp;&nbsp;<span class='Icons ";
                //    contenido += (matrizDetalle[i][7] == "I" ? "fa-check" : "fa-trash-o");
                //    contenido += "'";
                //    if (matrizDetalle[i][7] == "I") {
                //        contenido += " onclick='mostraralerta(\"No se puede realizar el cambio de estado\")'";
                //    }
                //    else {
                //        contenido += " onclick='operacion(\"Actualizar Estado Planilla\");abrirPopup(";
                //        contenido += '"PopupEstado"';
                //        contenido += ");Campoeliminar=";
                //        contenido += i;
                //        contenido += ";document.getElementById(\"btngrabarEstado\").setAttribute(\"data-indice\",2);'";
                //    }
                //    contenido += "></span>";
                //}
                //contenido += "&nbsp;&nbsp;<span class='Icons ";
                //contenido += "fa-paperclip";
                //contenido += "' onclick='mostrarUnificacionPlanilla(";
                //contenido += matrizDetalle[i][0];
                //contenido += ",\"";
                //contenido += matrizDetalle[i][1];
                //contenido += "\")'></span>";
                contenido += "</td></tr>";
            }

        }
        contenido += "<tr><td style='text-align:right;font-weight:bold' colspan='3'>Totales</td><td style='text-align:right'>" + formatearNumero(_totales.mtImporte) + "</td><td style='text-align:right'>" + formatearNumero(_totales.mtBonificacion) + "</td><td style='text-align:right'>" + formatearNumero(_totales.mtDescuento) + "</td><td style='text-align:right'>" + formatearNumero(_totales.mtAjuste) + "</td><td style='text-align:right'>" + formatearNumero(_totales.mtTotal) + "</td><td colspan='2'></td></tr>";
    }
    else {
        //var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 2).toString();
        contenido += "'>No hay datos</td></tr>";
    }
    //excelExportarDetalle = contenido;
    document.getElementById("tbUnificacionPlantilla").innerHTML = contenido;
    crearPaginas();
    configurarChecks();
    //var rdnDetalle = document.getElementsByName("rdnDetalle");
    //var chkTodos = document.getElementById("chkTodos");
    //if (inicioEnvio > 0) {
    //    for (var x = 0; x < rdnDetalle.length; x++) {
    //        rdnDetalle[x].setAttribute("disabled", "disabled");
    //    }
    //    chkTodos.setAttribute("disabled", "disabled");
    //}
    //else {
    //    for (var x = 0; x < rdnDetalle.length; x++) {
    //        rdnDetalle[x].removeAttribute("disabled");
    //    }
    //    chkTodos.removeAttribute("disabled");
    //}
    configurarHistorial();
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

function crearPaginas() {
    var nRegistros = _matriz.length;
    var indiceUltimaPagina = Math.floor(nRegistros / _registrosPagina);
    if (nRegistros % _registrosPagina == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (_paginasBloque * _registrosPagina));
    if (nRegistros % (_paginasBloque * _registrosPagina) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = _indiceActualBloque * _paginasBloque;
    var fin = inicio + _paginasBloque;
    if (_indiceActualBloque > 0 && nRegistros > (_paginasBloque * _registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginar(";
            contenido += i;
            contenido += ");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            contenido += "' id='ad";
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if (_indiceActualBloque < indiceUltimoBloque && nRegistros > (_paginasBloque * _registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= _registrosPagina) {
        document.getElementById("tdPaginasDetalle").innerHTML = "";
    }
    else {
        document.getElementById("tdPaginasDetalle").innerHTML = contenido;
        //seleccionarPaginaActual(opcion);
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
            //var hdfCd = document.getElementById("hdfCd");
            //hdfCd.value = valor;
            verHistorial(tabla, valor);
        }
    }
}

function verHistorial(t, v) {
    //var hdfCd = document.getElementById("hdfCd");
    var ss = window.parent.parent.document.getElementById("iss").value;
    var h = window.parent.parent.document.getElementById("Ref").value;
    var u = h + "Principal/HistorialCambio?t=" + t + "&i=" + v + "&ss=" + ss;
    mostrarPopupH(u);
}

function mostrarPopupH(url, tipo) {
    if (tipo == undefined) {
        var ifrHistorial = window.parent.document.getElementById("ifrHistorial");
        ifrHistorial.innerHTML = "";
        if (ifrHistorial.innerHTML == "") {
            ifrHistorial.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:400px;border: 1px solid transparent;' src='" + url + "'></iframe>";
        }
    }
    abrirPopupH("PopupHistorial");
    return false;
}

function abrirPopupH(popup) {
    var popup = window.parent.document.getElementById(popup);
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
}

function exportacion(objeto) {
    var contenido = "";
    var nRegistros = _matriz.length;
    if (nRegistros > 0) {
        contenido = crearCabeceraExportar();
        var nCampos = _cabeceras.length;
        for (var i = 0; i < nRegistros; i++) {
            contenido += "<tr>";
            for (var j = 0; j < nCampos; j++) {
                switch (j) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        contenido += "<td style='text-align:right'>";
                        contenido += _matriz[i][_indices[j]].toLocaleString('en-US', { minimumFractionDigits: 2 });
                        contenido += "</td>";
                        break;
                    case 7:
                        contenido += "<td><span class='historial puntero hstest' style='text-decoration:underline;color:#00a850' data-v='";
                        contenido += _matriz[i][0];
                        contenido += "' data-t='PlanillaMedico'>";
                        contenido += _matriz[i][_indices[j]];
                        contenido += "</span>";
                        contenido += "</td>";
                        break;
                    default:
                        //if (j == 7 || j == 8 || j == 9) {
                        //    if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {

                        //        if (j == 8) {
                        //            contenido += "<td>";
                        //            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]] == 0 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                        //        }
                        //        else if (j == 9) {
                        //            contenido += "<td style='text-align:left'>";
                        //            contenido += (matrizDetalle[i][matrizIndiceDetalle[j]].indexOf("1900") > -1 ? "" : matrizDetalle[i][matrizIndiceDetalle[j]]);
                        //        }
                        //        else {
                        //            contenido += "<td>";
                        //            contenido += matrizDetalle[i][matrizIndiceDetalle[j]];
                        //        }
                        //        contenido += "</td>";
                        //    }
                        //}
                        //else {
                        contenido += "<td>";
                        contenido += _matriz[i][_indices[j]];
                        contenido += "</td>";
                        //}
                        break;
                }
            }
            contenido += "</tr>";
        }
        contenido += "</table></html>";
        var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
        objeto.download = "UnificacionPlanilla.xls";
        objeto.href = window.URL.createObjectURL(formBlob);
    }
}

function crearCabeceraExportar() {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
    //cabecera += "<tr><td style='width:200px'>Periodo</td><td style='text-align:left'>";
    //cabecera += document.getElementById("txtDetalleDoctorPeriodo").value;
    //cabecera += "</td></tr><tr><td style='width:200px'>Nro Proceso</td><td style='text-align:left'>";
    //cabecera += document.getElementById("txtDetalleDoctorNro").value;
    //cabecera += "</td></tr><tr><td style='width:200px'>Descripción</td><td style='text-align:left'>";
    //cabecera += document.getElementById("txtDetalleDoctorDes").value;
    //cabecera += "</td></tr><tr><td style='width:200px'>Estado</td><td style='text-align:left'>";
    //switch (SeleccionActualProceso) {
    //    case "P":
    //        cabecera += "PENDIENTE";
    //        break;
    //    case "D":
    //        cabecera += "DIFUNDIR";
    //        break;
    //    case "C":
    //        cabecera += "CONFIRMAR";
    //        break;
    //    case "O":
    //        cabecera += "ENVIAR OBLIGACIÓN";
    //        break;
    //    case "G":
    //        cabecera += "PENDIENTE DE PAGO";
    //        break;
    //    case "F":
    //        cabecera += "PAGADO";
    //        break;
    //}
    //cabecera += "</td></tr><tr></tr>;
    cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    cabecera += "<td style='width: 150px'>Planilla</td>";
    cabecera += "<td style='width: 300px'>Medico/Empresa</td>";
    cabecera += "<td style='width: 150px'>Importe</td>";
    cabecera += "<td style='width: 150px'>Bonificacion</td>";
    cabecera += "<td style='width: 150px'>Descuento</td>";
    cabecera += "<td style='width: 150px'>Ajuste</td>";
    cabecera += "<td style='width: 150px'>Total</td>";
    //if (SeleccionActualProceso != "P" && SeleccionActualProceso != "D") {
    //    cabecera += "<td style='width: 150px'>Tipo Documento</td>";
    //    cabecera += "<td style='width: 150px'>Documento</td>";
    //    cabecera += "<td style='width: 150px'>Fecha Emisión</td>";
    //}
    cabecera += "<td style='width: 150px'>Estado</td>";
    cabecera += "</tr>";
    return cabecera;
}

function configurarChecks() {
    var rdnDetalle = document.getElementsByName("rdnDetalle");
    var nCampos = rdnDetalle.length;
    var valorCheck;
    var valor;
    for (var x = 0; x < nCampos; x++) {
        rdnDetalle[x].onclick = function () {
            valor = this.id.split("rdn").join("").trim();
            if (this.checked) {
                _registrosSeleccionados.push(_matriz[valor][0]);
            }
            else {
                if (_registrosSeleccionados.length > 0) {
                    for (var x = 0; x < _registrosSeleccionados.length; x++) {
                        if (_registrosSeleccionados[x] == this.getAttribute("data-check")) {
                            _registrosSeleccionados.splice(x, 1);
                            break;
                        }
                    }
                    if (_registrosSeleccionados.length <= 0) {
                        _registrosSeleccionados = [];
                        document.getElementById("chkTodos").checked = false;
                    }
                }

            }

        }
        if (_registrosSeleccionados.length > 0) {
            valorCheck = rdnDetalle[x].getAttribute("data-check");
            for (var y = 0; y < _registrosSeleccionados.length; y++) {
                if (_registrosSeleccionados[y] == valorCheck) {
                    rdnDetalle[x].checked = true;
                    break;
                }
            }
        }

    }

}

function mostrarDetalleOA(id, dato) {
    window.parent.mostrarDetalleOA(id, dato);
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