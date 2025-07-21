var $ = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
};

var lista = [], listaFeriado;
var matriz = [];
var cabeceras = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var anchos = [14, 14, 14, 14, 14, 15, 15];
//var matrizIndice = [0, 1, 2, 3, 4, 5, 6, 7];
var registrosPagina = 10;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var urlBase = "", ss = "";
var PersonaMedicoId;
var sucursalId;
var contenidoExportar = "";
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
	crearTabla();
	$.ajax("Control/listasConsultaHorariosMedico/?ss=" + ss, "get", cargarDatos);
}

function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%;text-align:center'><span id='spn";
		contenido += j.toString();
		//contenido += "' class='Enlace' data-orden='";
		//contenido += matrizIndice[j];
		contenido += "'>";
		contenido += cabeceras[j];
		contenido += "</span>";
		//contenido += "<br/><input type='text' class='Texto' name='cabecera' style='width:90%'>";
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbResultado' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divResultado").innerHTML = contenido;
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
		$.ajax("Control/consultarHorarioMedico/?ss=" + ss, "post", mostrarResultado, mensaje);
	};
	document.getElementById("btnRegresar").onclick = function () {
		var hdfSeg = document.getElementById("hdfSeg").value;
		window.location.href = urlBase + "Mantenimiento/HorarioMedicoLista/?ss=" + ss + "&id=" + hdfSeg;
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
		document.getElementById("hdfMedico").value = "-1";
		document.getElementById("hdfEmpresa").value = "-1";
		crearTabla();
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
		var url = "Control/generarPDF/?ss=" + ss + "&anio=" + txtAnio + "&mes=" + cboPeriodo.options[cboPeriodo.selectedIndex].text;
		$.ajax(url, "post", listarPDF, contenido);
		//console.log(contenido);
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
				document.getElementById("cboPeriodo").value = parseInt(hdfFecha.value.split("¦")[0]);
				document.getElementById("txtAnio").value = hdfFecha.value.split("¦")[1];
			}
			document.getElementById("divbtnRegresar").style.display = "";
			document.getElementById("divultimo").style.display = "";
			document.getElementById("btnRegresar").style.display = "";
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
	if (rpta != "") {
		
		var diaInicio = (new Date(document.getElementById("txtAnio").value, parseInt(document.getElementById("cboPeriodo").value) - 1, 1)).getDay();
		if (diaInicio == 0) diaInicio = 7;
		var data = rpta.split("¯");
		var lista = data[0].split("¬");
		listaFeriado = data[1].split("¬");
		var contenido = "", pos = 1, pos1 = 0, inicioCalendario = false, nuevo = false, campos, diaAnterior;
		var nRegistros = lista.length;
		contenidoExportar = "";
		//var primerDia = lista[0].split("¦")[1];
		var sumatoriaTotal = 0;
		var horario;
		var totalDias = contarDias(lista).length+1;
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
									if ((horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1])))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if ((horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1])))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
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
									//contenidoExportar += "\n";
									contenidoExportar += campos[7];
									contenido += "</div>";
									contenido += " -> ";
									contenidoExportar += " -> ";
									contenido += "<div style='display:inline-block;vertical-align:top'>";
									horario = campos[3].split(" ");
									if (horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1]))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if (horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1]))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
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
									if (horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1]))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
									}
									contenido += " ";
									contenidoExportar += " ";
									horario = campos[4].split(" ");
									if (horario[2] != undefined ? (horario[2].indexOf("p") > -1) : (VerificarHora(horario[1]))) {
										contenido += hora24(horario[1].substr(0, 5), false);
										contenidoExportar += hora24(horario[1].substr(0, 5), false);
									}
									else {
										contenido += hora24(horario[1].substr(0, 5), true);
										contenidoExportar += hora24(horario[1].substr(0, 5), true);
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
	}
}

function VerificarHora(hora) {
	if (hora.indexOf(":") > -1) {
		var dato = hora.split(":");
		if ((dato[0] * 1) > 12) return true;
		else return false;
	}
	else return false;
}

function contarDias(lista) {
	var n = lista.length;
	var dato = "", dato2 = "";
	var matriz = [];
	for (var x = 0; x < n; x++) {
		dato = lista[x].split("¦");
		dato2 = dato[0].split(" ")[0];
		if (matriz.length == 0) {
			matriz.push(dato2);
		} else {
			if (matriz[matriz.length] != dato2) {
				matriz.push(dato2);
			}
		}
	}
	return matriz;
}

function daysInMonth(humanMonth, year) {
	return new Date(year, humanMonth, 0).getDate();
}

function hora24(contenido, opcion) {
	var data = contenido.split(":");
	if (opcion) {
		//if (data[0] * 1 == 12) {
		//	return (((data[0] * 1)).toString()) + ":" + data[1];
		//} else {
		//	return (((data[0] * 1) + 12).toString()) + ":" + data[1];
		//	//return (((data[0] * 1) + 12).toString()) + ":" + data[1];
		//}
		return (((data[0] * 1)).toString()) + ":" + data[1];
	}
	else {
		//if ((data[0] * 1) == 12) {
		//	return "00:" + data[1];
		//}
		//else {
		//	return contenido;
		//}
		return contenido;
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
			///->var ventana = window.open(link, '_blank');
			var ventana = window.open('about:blank');
			setTimeout(function () { //FireFox seems to require a setTimeout for this to work.
				iFrame = ventana.document.createElement('iframe');
				iFrame.src = link;
				iFrame.style.width = '100%';
				iFrame.style.height = '100%';
				iFrame.style.border = '0';
				ventana.document.body.style.padding = '0';
				ventana.document.body.style.margin = '0';
				ventana.document.body.appendChild(iFrame);
			}, 0);
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
