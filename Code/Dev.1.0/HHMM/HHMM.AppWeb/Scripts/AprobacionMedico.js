var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
};
var lista = [], listaFeriado;
var matrizTabla = [];
var listaTabla = [];
var cabeceras = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var cabecerasTabla = ["Médico", "Horas", "Usuario","Fecha Aprobación","Estado"];
var anchosTabla = [30, 10, 25,20,15];
var matrizIndiceTabla = [1, 2, 3,4,5];
var anchos = [14, 14, 14, 14, 14, 15, 15];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var urlBase = "", ss = "";
var PersonaMedicoId;
var sucursalId;
var contenidoExportar = "";
var MedicosSeleccionados = [];
var excelExportar,vAnio,vMes;
function requestServer(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, urlBase + url);
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
	urlBase = location.protocol + "//" + window.location.host + document.getElementById("url").value;
	ss = window.parent.document.getElementById("iss").value;
	var hdfSucursal = document.getElementById("hdfSucursal").value;
	if (hdfSucursal != "") {
		var elemento1 = document.getElementsByClassName("fa-search")[0];
		var elemento2 = document.getElementsByClassName("fa-search")[1];
		elemento1.style.display = "none";
		elemento2.style.display = "none";
		var cboTurno = document.getElementById("cboTurno");
		cboTurno.className += " lectura";
		cboTurno.readOnly = "readOnly";
		cboTurno.disabled = true;
		var btnLimpiar = document.getElementById("btnLimpiar");
		btnLimpiar.style.display = "none";
	}
	cargaInicial();
};

function cargaInicial() {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	var fecha = new Date();
	var cboPeriodo = document.getElementById("cboPeriodo");
	var txtAnio = document.getElementById("txtAnio");
	cboPeriodo.value = fecha.getMonth() + 1;
	txtAnio.value = fecha.getFullYear();
	crearTabla("Resultado|0");
	crearTabla("Tabla|1");
	configurarOrdenacion("Tabla|1");
	$.ajax("Configuracion/listasConsultaAprobacionMedico/?ss=" + ss, "get", cargarDatos);
}

function crearTabla(el) {
	var elemento = el.split("|");
	var nCampos = (elemento[1]=="0"? cabeceras.length:cabecerasTabla.length);
	var contenido = "<table class='tabla-general' id='"+(elemento[1]=="1"? "tblTabla":"")+"'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	if (elemento[1] == "1") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos'/></th>";
	}
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido +=(elemento[1]=="0"?  anchos[j]:anchosTabla[j]);
		contenido += "%;text-align:center'><span id='spn";
		contenido += j.toString();
		if (elemento[1] != "0") {
			contenido += "' class='Enlace" + elemento[0] + "-" + elemento[1] + "' data-orden='";
			contenido += window["matrizIndice"+elemento[0]][j];
		}
		contenido += "'>";
		contenido += (elemento[1]=="0"? cabeceras[j]:cabecerasTabla[j]);
		contenido += "</span>";
		if (elemento[1] != "0") {
			if (j == (nCampos - 1)) {
				contenido += "<br/><select name='cabecera' style='width:90%'><option value=''>Todos</option><option value='P'>Pendiente</option><option value='A'>Aprobado</option></select>";
			} else {
				contenido += "<br/><input type='text' class='Texto' name='cabecera' style='width:90%'>";
			}
		}
		contenido += "</th>";
	}
	if (elemento[1] == "1") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='ExportarExcel" + elemento[0] + "'></a></th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb"+elemento[0]+"' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + elemento[0] + "' colspan='";
	contenido += (nCampos+2).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + elemento[0] + "").innerHTML = contenido;
}

function configurarBotones() {
	document.getElementById("btnBuscar").onclick = function () {
		document.getElementById("tbResultado").innerHTML = "";
		var sucursal = window.parent.document.getElementById("isuc").value.split("|")[0];
		var txtMedico = document.getElementById("hdfMedico").value.split("¦")[0];
		var cboPeriodo = document.getElementById("cboPeriodo").value;
		var txtAnio = document.getElementById("txtAnio").value;
		var txtEmpresa = document.getElementById("hdfEmpresa").value.split("¦")[0];
		var cboTurno = document.getElementById("cboTurno").value;
		var cboUnidadMedica = document.getElementById("cboUnidadMedica").value;
		var mensaje = sucursal + "¦" + ((txtMedico == "" || txtMedico == "-1") ? "0" : txtMedico) + "¦" + cboPeriodo + "¦" + txtAnio + "¦" + ((txtEmpresa == "" || txtEmpresa == "-1") ? "0" : txtEmpresa) + "¦" + (cboTurno == "" ? "0" : cboTurno) + "¦" + (cboUnidadMedica == "" ? "0" : cboUnidadMedica);
		$.ajax("Configuracion/consultarAprobacionMedico/?ss=" + ss, "post", mostrarResultado, mensaje);
		vAnio = txtAnio;
		vMes = cboPeriodo;
		this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
	};

	var spnDoctor = document.getElementById("spnDoctor");
	spnDoctor.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}


	var spnEmpresaBusqueda = document.getElementById("spnEmpresaBusqueda");
	spnEmpresaBusqueda.onclick = function () {
		var ifrEmpresa = document.getElementById("ifrEmpresa");
		if (ifrEmpresa.innerHTML == "") {
			ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupEmpresa");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			var txtMedico = document.getElementById("txtMedico");
			txtMedico.value = datos[1];
		}
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			this.value = datos[0];
			var txtEmpresa = document.getElementById("txtEmpresa");
			txtEmpresa.value = datos[1];
		}
	}

	var btnLimpiar = document.getElementById("btnLimpiar");
	btnLimpiar.onclick = function () {
		var limpiar = document.getElementsByClassName("limpiar");
		for (var y = 0; y < limpiar.length; y++) {
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

		}
		document.getElementById("tbTabla").innerHTML = "";
		document.getElementById("tdPaginasTabla").innerHTML = "";
		document.getElementById("tbResultado").innerHTML = "";
		document.getElementById("hdfMedico").value = "-1";
		document.getElementById("hdfEmpresa").value = "-1";
		document.getElementById("chkTodos").checked = false;
		MedicosSeleccionados = [];
	}

	var btnExportar = document.getElementById("btnExportar");
	btnExportar.onclick = function () {

		var cboPeriodo = document.getElementById("cboPeriodo");
		var txtAnio = document.getElementById("txtAnio").value;
		var contenido = "<html><head><meta charset='utf-8'/></head><body style='font-family: Calibri;font-size: 12px;'><table style='border: 1px solid #ddd;border-collapse:collapse;font-family: Calibri;font-size: 12px;'>";
		contenido += "<tr><td colspan='7'>" + window.top.document.getElementById("spnSucursal").innerHTML + "</td></tr>";
		contenido += "<tr><td colspan='7' style='text-align:center'>Periodo:" + cboPeriodo.options[cboPeriodo.selectedIndex].text + "  " + "" + txtAnio + " </td></tr>";
		contenido += "<tr style='color:#797979:background-color:#f5f5f5;'><td style='width:200px;text-align:center'>Lunes</td><td style='width:200px;text-align:center'>Martes</td><td style='width:200px;text-align:center'>Miércoles</td><td style='width:200px;text-align:center'>Jueves</td><td style='width:200px;text-align:center'>Viernes</td><td style='width:200px;text-align:center'>Sábado</td><td style='width:200px;text-align:center'>Domingo</td></tr>";
		contenido += contenidoExportar + "</table></body></html>";
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		this.download = "ConsultaHorarioMedico.xls";
		this.href = window.URL.createObjectURL(formBlob)
		window.URL.revokeObjectURL(formBlob)
	}

	var btnExportarPDF = document.getElementById("btnExportarPDF");
	btnExportarPDF.onclick = function () {
		var cboPeriodo = document.getElementById("cboPeriodo");
		var txtAnio = document.getElementById("txtAnio").value;
		var contenido = "<html><head><meta charset='utf-8'/><style type='text/css'>thead{display: table-header-group;} tr{page-break-inside: avoid;}</style></head><body style='font-family: Calibri;font-size: 12px;'><table  style='border-collapse:collapse;font-family: Calibri;font-size: 12px;'><thead>";
		contenido += "<tr><td colspan='7'>" + window.top.document.getElementById("spnSucursal").innerHTML + "</td></tr>";
		contenido += "<tr><td colspan='7' style='text-align:center'>Periodo:" + cboPeriodo.options[cboPeriodo.selectedIndex].text + "  " + "" + txtAnio + " </td></tr>";
		contenido += "<tr style='color:#797979:background-color:#f5f5f5;'><td style='width:200px;text-align:center'>Lunes</td><td style='width:200px;text-align:center'>Martes</td><td style='width:200px;text-align:center'>Miércoles</td><td style='width:200px;text-align:center'>Jueves</td><td style='width:200px;text-align:center'>Viernes</td><td style='width:200px;text-align:center'>Sábado</td><td style='width:200px;text-align:center'>Domingo</td></tr><thead><tbody>";
		contenido += contenidoExportar + "</tbody></table></body></html>";
		contenido = contenido.replace(/#F5F5DC/gi, "#F9B1B4");
		var url = "Control/generarPDF/?ss=" + ss;
		$.ajax(url, "post", listarPDF, contenido);
	}

	var TextoTabla = document.getElementsByName("cabecera");
	var n = TextoTabla.length;
	for (var i = 0; i < n; i++) {
		texto = TextoTabla[i];
		if (texto.nodeName == "SELECT") {
			texto.onchange = function (e) {
				if (listaTabla.length > 0) {
					filtrar("Tabla|1");
				}
			}
		} else {
			texto.onkeyup = function (e) {
				if (listaTabla.length > 0) {
					filtrar("Tabla|1");
				}
			}
		}
	}
	var tblTabla = document.getElementById("tblTabla");
	tblTabla.onclick = function (e) {
		var el = e.target || e.srcElement;
		var tipo = el.type;
		if (this.id == "tblTabla") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodos") {
					SeleccionarChecks(el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check");
						var pos = buscarProceso(chk * 1);
						if (el.checked) {
							if (pos == -1) {
								MedicosSeleccionados.push([(chk * 1)]);
							}
						} else {
							if (pos > -1) {
								MedicosSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				mostrarMatriz(indiceActualPagina, "Tabla|1");
			}
		}
		e.stopPropagation();
	}

	var ExportarExcelTabla = document.getElementById("ExportarExcelTabla");
	ExportarExcelTabla.onclick = function () {
		var nRegistros = matrizTabla.length;
		if (nRegistros > 0) {
			exportacion();
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "Medicos.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	} 
	var btnGrabarTabla = document.getElementById("btnGrabarTabla"),
	btnGrabar = document.getElementById("btnGrabar");
	btnGrabarTabla.onclick = btnGrabar.onclick = function () {
		if (this.id == "btnGrabar") {
			MedicosSeleccionados=[]
			SeleccionarChecks(true);
		} 
		if (MedicosSeleccionados.length > 0) {
			var url = "Configuracion/grabarAprobacionMedico/?ss=" + ss + "&su=" + sucursalId;
			var strData = MedicosSeleccionados.join("¬") + "¯" + vMes + "¦" + vAnio;

			$.ajax(url, "post", mostrarRpta, strData);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		} else {
			mostraralerta("No hay médicos para procesar");
		}
	}
}

function llenarCombo(lista, nombreCombo, separadorRegistro, separadorCampo, inicio) {
	var contenido = "";
	var listas = lista.split(separadorRegistro);
	var n = listas.length;
	var valor = "";
	var campos = "";
	var hdfSucursal = document.getElementById("hdfSucursal").value;
	contenido = "<option value=''>" + inicio + "</option>";
	if (nombreCombo == "cboUnidadMedica") {
		for (var x = 0; x < n; x++) {
			campos = listas[x].split(separadorCampo);
			contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
		}
	}
	else {
		for (var x = 0; x < n; x++) {
			campos = listas[x].split(separadorCampo);
			if (hdfSucursal != "" && campos[2] == hdfSucursal) {
			}
			else {
				if (hdfSucursal == "" && campos[2] == sucursalId) {
					contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
				}
			}
		}
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function cargarDatos(rpta) {
	if (rpta != "") {
		var data = rpta.split("¯");
		llenarCombo(data[0], "cboTurno", "¬", "¦", "Todos");
		llenarCombo(data[1], "cboUnidadMedica", "¬", "¦", "Todos");
		configurarBotones();
		var hdfMedico = document.getElementById("hdfMedico");
		var hdfFecha = document.getElementById("hdfFecha");
		if (hdfMedico.value != "" && hdfMedico.value != "-1") {

			document.getElementById("txtMedico").value = (document.getElementById("hdfMedico").value == "-1" ? "" : document.getElementById("hdfMedico").value.split("¦")[1]);
			if (hdfFecha.value != "") {
				document.getElementById("cboPeriodo").value = parseInt(hdfFecha.value.split("/")[1]);
				document.getElementById("txtAnio").value = hdfFecha.value.split("/")[2];
			}
			document.getElementById("divultimo").style.display = "";
			document.getElementById("btnBuscar").click();
		}
	}
}

function validarFeriado(dia) {
	for (var i = 0; i < listaFeriado.length; i++) {
		if (listaFeriado[i].split("/")[0] == dia) {
			return true;
			break;
		}
	}
	return false;
}

function mostrarResultado(rpta) {
	document.getElementById("btnBuscar").innerHTML = "Buscar";
	if (rpta != "") {
		var totalDias = daysInMonth(document.getElementById("cboPeriodo").value, document.getElementById("txtAnio").value);
		var diaInicio = (new Date(document.getElementById("txtAnio").value, parseInt(document.getElementById("cboPeriodo").value) - 1, 1)).getDay();
		if (diaInicio == 0) diaInicio = 7;
		var data = rpta.split("¯");
		var lista = data[0].split("¬");
		listaFeriado = data[1].split("¬");
		listaTabla = data[2].split("¬");
		var contenido = "", pos = 1, pos1 = 0, inicioCalendario = false, nuevo = false, campos, diaAnterior;
		var nRegistros = lista.length;
		contenidoExportar = "";
		var sumatoriaTotal = 0;
		var horario;
		for (var i = pos; i < totalDias; i++) {
			contenido += "<tr>";
			contenidoExportar += "<tr>";
			for (var j = 1; j < 8; j++) {
				if (!inicioCalendario) {
					switch (diaInicio) {
						case 2:
							contenido += "<td></td>";
							contenidoExportar += contenido;
							break;
						case 3:
							contenido += "<td></td><td></td>";
							contenidoExportar += contenido;
							break;
						case 4:
							contenido += "<td></td><td></td><td></td>";
							contenidoExportar += contenido;
							break;
						case 5:
							contenido += "<td></td><td></td><td></td><td></td>";
							contenidoExportar += contenido;
							break;
						case 6:
							contenido += "<td></td><td></td><td></td><td></td><td></td>";
							contenidoExportar += contenido;
							break;
						case 7:
							contenido += "<td></td><td></td><td></td><td></td><td></td><td></td>";
							contenidoExportar += contenido;
							break;
					}
					inicioCalendario = true;
					j = diaInicio;
					if (diaInicio == 7) {
						for (var h = pos1; h < nRegistros; h++) {
							campos = lista[h].split("¦");
							if (parseInt(campos[1]) == diaInicio || diaAnterior == campos[0]) {
								if (diaAnterior != campos[0]) {
									if (diaInicio == 7 || validarFeriado(i)) {
										contenido += "<td style='background-color: rgba(249, 177, 180, 0.45)'>";
										contenidoExportar += "<td style='background-color: #F5F5DC;height:20px;vertical-align:top'><pre  style='font-family: Calibri;font-size: 12px;'>";
									}
									else {
										contenido += "<td>";
										contenidoExportar += "<td style='height:20px;vertical-align:top'><pre  style='font-family: Calibri;font-size: 12px;'>";
									}
									contenido += "<span style='font-weight: bold;font-size: 16px;float: right;background-color: #00A850;color:white;padding: 2px 6px;border-radius: 50%'>";
									contenido += i;
									contenidoExportar += i + "\n";
									contenido += "</span><br /><br /><div style='overflow-y:auto;max-height:70px'>";
								}
								if (campos[6] != "") {
									contenido += "<div style='white-space: nowrap;overflow: hidden;width: 50px;display:inline-block;vertical-align:top' title='";
									contenido += campos[6];
									contenido += "'>";
									contenido += campos[7];
									contenidoExportar += "\n";
									contenidoExportar += campos[7];
									contenido += "</div>";
									contenido += " -> ";
									contenidoExportar += " ->";
									contenido += "<div style='display:inline-block;vertical-align:top'>";
									horario = campos[3].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenido += campos[5];
									contenidoExportar += " ";
									contenidoExportar += campos[5];
									contenido += "</div>";
									sumatoriaTotal = sumatoriaTotal + (campos[5] * 1);
								}
								diaAnterior = campos[0];
								pos1 = h + 1;
							}
							else
								break;
						}
						contenido += "</td>";
						contenidoExportar += "</pre></td>";
						break;
					}
					else {
						j--;
					}
				}
				else {
					for (var h = pos1; h < nRegistros; h++) {
						campos = lista[h].split("¦");
						if (diaAnterior != campos[0]) {
							if (parseInt(campos[1]) == j) {
								if (j == 7 || validarFeriado(i)) {
									contenido += "<td style='background-color: rgba(249, 177, 180, 0.45)'>";
									contenidoExportar += "<td style='background-color: #F5F5DC;height:20px;vertical-align:top'><pre  style='font-family: Calibri;font-size: 12px;'>";
								}
								else {
									contenido += "<td>";
									contenidoExportar += "<td style='height:20px;vertical-align:top'><pre  style='font-family: Calibri;font-size: 12px;'>";
								}
								contenido += "<span style='font-weight: bold;font-size: 16px;float: right;background-color: #00A850;color:white;padding: 2px 6px;border-radius: 50%'>";
								if (i < totalDias + 1) {
									contenido += i;
									contenidoExportar += i + "\n";
								}
								contenido += "</span><br /><br /><div style='overflow-y:auto;max-height:70px'>";
								contenidoExportar += "\n";
								if (campos[6] != "") {
									contenido += "<div style='white-space: nowrap;overflow: hidden;width: 50px;display:inline-block;vertical-align:top' title='";
									contenido += campos[6];
									contenido += "'>";
									contenido += campos[7];
									contenidoExportar += campos[7];
									contenido += "</div>";
									contenido += " -> ";
									contenidoExportar += " -> ";
									contenido += "<div style='display:inline-block;vertical-align:top'>";
									horario = campos[3].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenido += campos[5];
									contenidoExportar += " ";
									contenidoExportar += campos[5];
									contenido += "</div>";
									sumatoriaTotal = sumatoriaTotal + (campos[5] * 1);
								}
								diaAnterior = campos[0];
								pos1 = h + 1;
							}
							else break;
						}
						else {
							if (diaAnterior == campos[0]) {
								if (campos[6] != "") {
									contenido += "<br /><div style='white-space: nowrap;overflow: hidden;width: 50px;display:inline-block;vertical-align:top' title='";
									contenido += campos[6];
									contenido += "'>";
									contenido += campos[7];
									contenido += "</div>";
									contenido += " -> ";
									contenidoExportar += "\n"
									contenidoExportar += campos[7];
									contenidoExportar += " -> ";

									contenido += "<div style='display:inline-block;vertical-align:top'>";
									horario = campos[3].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if (horario[2].indexOf("p") > -1) {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									contenido += " ";
									contenido += campos[5];

									contenidoExportar += " ";
									contenidoExportar += campos[5];

									contenido += "</div>";
									sumatoriaTotal = sumatoriaTotal + (campos[5] * 1);
								}
								diaAnterior = campos[0];
								pos1 = h + 1;
							}
							else break;
						}
					}
					contenido += "</div></td>";
					contenidoExportar += "</pre></td>";
					if (j < 7) i++;
				}
			}
			contenido += "</tr>";
			contenidoExportar += "</tr>";
		}
		contenidoExportar += "<tr><td colspan='7' style='text-align:right'>Total de horas asignadas " + (sumatoriaTotal == 0 ? "" : sumatoriaTotal) + "</td><tr>"
		document.getElementById("tbResultado").innerHTML = contenido;
		document.getElementById("spnSumatoriaTotal").innerHTML = (sumatoriaTotal == 0 ? "" : sumatoriaTotal);

		crearMatriz("Tabla|1");
		SeleccionarChecks(true);
		paginar(0, "Tabla|1");
		indiceActualBloque = 0;
		document.getElementById("chkTodos").checked = true;

	}
}

function daysInMonth(humanMonth, year) {
	return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
}
function hora24(contenido, opcion) {
	var data = contenido.split(":");
	if (opcion) {
		if (data[0] * 1 == 12) {
			return (((data[0] * 1)).toString()) + ":" + data[1];
		} else {
			return (((data[0] * 1) + 12).toString()) + ":" + data[1];
		}
	}
	else {
		if ((data[0] * 1) == 12) {
			return "00:" + data[1];
		}
		else {
			return contenido;
		}
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

function listarPDF(rpta) {
	if (rpta != "") {
		var data = rpta.split("¦");
		if (isIE()) {
			var archivo = crearBlob(data[1]);
			var blob = new Blob([archivo], {
				type: 'application/pdf'
			});
			window.navigator.msSaveBlob(blob, "ConsultaHorariosMedico.pdf");
		} else {
			var link = "data:application/pdf;base64," + data[1];
			var ventana = window.open(link, '_blank');
			if (ventana == null || typeof (ventana) == 'undefined') {
				var a = document.createElement("a");
				a.href = "data:application/pdf;base64," + data[1];
				a.download = "ConsultaHorariosMedico";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				delete a;
			}
		}
	}
}

function crearBlob(archivo) {
	var base64str = archivo;
	var binary = atob(base64str.replace(/\s/g, ''));
	var len = binary.length;
	var buffer = new ArrayBuffer(len);
	var view = new Uint8Array(buffer);
	for (var i = 0; i < len; i++) {
		view[i] = binary.charCodeAt(i);
	}
	return view;
}

function isIE() {
	var valor = false;
	var isIE = /*@cc_on!@*/ false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	if (isIE == true || isEdge == true) {
		return valor = true;
	}
	return valor;
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
function paginar(indicePagina, elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var esBloque = (indicePagina < 0);
	var registroPaginaActual;
		registroPaginaActual = registrosPagina;
	if (esBloque) {
		var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
		if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
		var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
		if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
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
	mostrarMatriz(indicePagina, elemento);
}
function crearMatriz(elemento) {
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
				case "1":
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
function mostrarMatriz(indicePagina, elemento) {

	var identificador = elemento.split("|");
	indiceActualPagina = indicePagina;


	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var registroPaginaActual;
		registroPaginaActual = registrosPagina;

		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registroPaginaActual;
		var fin = inicio + registroPaginaActual;
		switch (identificador[1]) {
			case "1":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";

						if (matrizTabla[i][5] == "P") {
							contenido += "<input type='checkbox' data-check='";
							contenido += window["matriz" + identificador[0]][i][0];
							contenido += "'";
							contenido += (buscarProceso(window["matriz" + identificador[0]][i][0]) > -1 ? " checked" : "");
							contenido += "/>";
						}
						contenido += "</td>";
						for (var j = 1; j < nCampos ; j++) {
							contenido += "<td";
							if (j != (nCampos - 1)) {
								if (j == 4) {
									contenido += ">";
									if (window["matriz" + identificador[0]][i][j].indexOf("1900") == -1) {
										contenido += window["matriz" + identificador[0]][i][j];
									}
								} else if (j == 2) {
									contenido += " style='text-align:center' >";
									contenido += window["matriz" + identificador[0]][i][j];
								} else {
									contenido += ">";
									contenido += window["matriz" + identificador[0]][i][j];
								}
							} else {
								contenido += ">";
								if (window["matriz" + identificador[0]][i][j] == "P") {
									contenido += "Pendiente";
								} else {
									contenido += "Aprobado";
								}
							}
							contenido += "</td>";

						}
						contenido+="<td></td>"
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
		contenido += (nCabeceras + (2)).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + (identificador[0])).innerHTML = contenido;
	crearPaginas(elemento);
	if (esBloque) {
		crearPaginas(elemento);
	}
}
function crearPaginas(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["matriz" + identificador[0]].length;
	var registroPaginaActual;
		registroPaginaActual = registrosPagina;

	var indiceUltimaPagina = Math.floor(nRegistros / registroPaginaActual);
	if (nRegistros % registroPaginaActual == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registroPaginaActual));
	if (nRegistros % (paginasBloque * registroPaginaActual) == 0) indiceUltimoBloque--;
	var contenido = "", bloqueActual;
		bloqueActual = indiceActualBloque;

	var inicio = bloqueActual * paginasBloque;
	var fin = inicio + paginasBloque;
	if ((bloqueActual) > 0 && nRegistros > (paginasBloque * registroPaginaActual)) {
		contenido += "<span class='pagina' onclick='paginar(-1,\"" + elemento + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-2,\"" + elemento + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
	}
	for (var i = inicio ; i < fin; i += 1) {
		if (i <= indiceUltimaPagina) {
			contenido += "<span onclick='paginar(";
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
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + (identificador[0])).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + (identificador[0])).innerHTML = contenido;
		seleccionarPaginaActual(identificador[0], identificador[1]);
	}
}
function seleccionarPaginaActual(dato, identificador) {
	var indice;
	indice = indiceActualPagina;
	var aPagina = document.getElementById("a" + dato +  indice);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}
function filtrar(elemento) {
	var identificador = elemento.split("|");
	var cabeceras =  document.getElementsByName("cabecera");
	var nCabeceras = cabeceras.length;
	var cabecera;
	var exito;
	window["matriz" + identificador[0]] = [];
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var contenido = "";
	var campos;
	var nFiltrados = window["matrizIndice" + identificador[0]].length
	var x = 0;
	for (var i = 0; i < nRegistros; i++) {
		campos = window["lista" + identificador[0]][i].split("¦");
		nCampos = campos.length;
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto")) exito = exito && (campos[window["matrizIndice" + identificador[0]][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
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
	paginar(0, elemento);
	indiceActualPagina=0;
}
function configurarOrdenacion(elemento) {
	var identificador = elemento.split("|");
	var enlaces = document.getElementsByClassName("Enlace" + identificador[0] + "-" + identificador[1]);
	var nEnlaces = enlaces.length;
	var enlace;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		enlace.onclick = function () {
			var valor = "";
			valor = this.className.split("Enlace").join("").trim().split("-").join("|");
			ordenarMatriz(this);
			var pagina;
				pagina = indiceActualPagina;
			mostrarMatriz(pagina, valor);
		}
	}
}

function ordenarMatriz(enlace) {
	var nombreMatriz = enlace.className.split("Enlace").join("").trim().split("-");
	indiceOrden = enlace.getAttribute("data-orden") + "|" + nombreMatriz[0];
	var campo = enlace.innerHTML;
	var posAsc = campo.indexOf("▲");
	var posDesc = campo.indexOf("▼");
	tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
	limpiarEnlaces(nombreMatriz[0] + "-" + nombreMatriz[1]);
	if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
	else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
	window["matriz" + nombreMatriz[0]].sort(ordenar);
}

function ordenar(x, y) {
	var orden = indiceOrden.split("|");
	var indice = orden[0] * 1;
	var valX = (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]);
	var valY = (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]);
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function limpiarEnlaces(dato) {
	var enlaces = document.getElementsByClassName("Enlace" + dato);
	var nEnlaces = enlaces.length;
	var enlace;
	var campo;
	for (var i = 0; i < nEnlaces; i++) {
		enlace = enlaces[i];
		campo = enlace.innerHTML;
		enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
	}
}
function buscarProceso(p) {
	var n, reg, pos = -1;
		n = MedicosSeleccionados.length
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = MedicosSeleccionados[i];
			if (reg[0] == p) {
				pos = i;
				break;
			}
		}
	}
	return pos;
}
function SeleccionarChecks(c) {
	var n, reg;
	if (c) {
		n = matrizTabla.length;
		if (n > 0) {
			for (var i = 0; i < n; i++) {
				reg = matrizTabla[i];
				if (reg[5] == "P") {
					MedicosSeleccionados.push([reg[0]]);
				}
			}
		}
	} else {
		MedicosSeleccionados = [];
	}
}
function crearCabeceraExportar() {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	cabecera += "<td style='width: 270px' align='center'>Médico</td>";
	cabecera += "<td style='width: 80px' align='center'>Horas</td>";
	cabecera += "<td style='width: 200px' align='center'>Usuario</td>";
	cabecera += "<td style='width: 100px' align='center'>Fecha Aprobación</td>";
	cabecera += "<td style='width: 100px' align='center'>Estado</td>";
	cabecera += "</tr>";
	return cabecera;
}
function exportacion() {
	var nRegistros = matrizTabla.length;
	var nCampos = matrizTabla[0].length;
	var contenido = [];
	excelExportar = crearCabeceraExportar();
	for (var i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		for (var j = 1; j < nCampos ; j++) {
			contenido.push("<td>");
			if (j != (nCampos - 1)) {
				if (j == 4) {
					if (matrizTabla[i][j].indexOf("1900") == -1) {
						contenido.push(matrizTabla[i][j]);
					}
				} else {
					contenido.push(matrizTabla[i][j]);
				}
			} else {
				if (matrizTabla[i][j] == "P") {
					contenido.push("Pendiente");
				} else {
					contenido.push("Atendido");
				}
			}

			contenido.push("</td>");
		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
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
function mostrarRpta(r) {
	document.getElementById("btnGrabarTabla").innerHTML = "Aprobar";
	document.getElementById("btnGrabar").innerHTML = "Aprobar";
	if (r != "") {
		mostraralerta("Registros aprobados");
		document.getElementById("btnLimpiar").click();
	} else {
		mostraralerta("Error al procesar datos");
	}
}