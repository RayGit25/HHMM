var ss, sucursalId, sucursal, urlBase = "", tabactual, tabactualB;
var mensajeValidacion = [], lstAdmision = [], lstVariablesCorreo = [];
var listaPeriodo = [], listaPeriodoC = [], listaMedico = [], listaMedicoC = [], listaMedicoR = [], listaCuerpoCorreo = [];
var matrizPeriodo = [], matrizPeriodoC = [], matrizMedico = [], matrizMedicoC = [], matrizMedicoR = [];
var cabecerasPeriodo = cabecerasPeriodoC = ["Planilla"];
var anchosPeriodo = anchosPeriodoC = [100];
var cabecerasMedico = ["Planilla", "Médico/Empresa", "Tipo Admisión", "Estado", "Total", "Provisión","Tipo Planilla"],
cabecerasMedicoC = ["Correo", "Médico/Empresa", "Tipo Admisión", "Estado", "Total", "Provisión"],
cabecerasMedicoR = ["Correo", "Médico/Empresa", "Tipo Admisión", "Estado", "Ultima fecha envio", "Total", "Provisión"];
var anchosMedico =  [12, 27, 13, 13, 8, 12,15],anchosMedicoC = [12, 28, 13, 13, 8, 15], anchosMedicoR = [15, 30, 10, 10, 15, 5, 15]
var matrizIndicePeriodo = matrizIndicePeriodoC = [1];
var matrizIndiceMedico = [0, 1, 2, 3, 7, 8,9]; matrizIndiceMedicoC = [0, 1, 2, 3, 12, 13], matrizIndiceMedicoR = [0, 1, 2, 3, 7, 12, 13];
var registrosPagina = 10
var paginasBloque = 5;
var indiceActualBloque = 0, indiceActualBloqueC = 0, indiceActualBloqueR = 0, indiceActualBloqueP = 0, indiceActualBloqueCP = 0;
var indiceOrden = 0;
var indiceActualPagina = 0, indiceActualPaginaC = 0, indiceActualPaginaR = 0, indiceActualPaginaP = 0, indiceActualPaginaCP = 0;
var esBloque = 0;
var PeriodosSeleccionados = [], PeriodosCSeleccionados = [], MedicosSeleccionados = [], MedicosCSeleccionados = [], MedicosRSeleccionados = [];
var matrizEstado = ["P¦Pendiente", "G¦Generado", "E¦Enviado"];
var excelExportar;
var rutaOriginal = "";
var pdfProcesados = 0, medicosProcesados = [];
var MedicosSeleccionadosCheck = [];
window.onload = function () {
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	var spnRutaArchivo = document.getElementById("spnRutaArchivo");
	rutaOriginal = spnRutaArchivo.innerHTML + sucursalId + "\\";
	spnRutaArchivo.innerHTML = rutaOriginal;
	ss = window.parent.document.getElementById("iss").value;
	var pos1 = window.location.href.indexOf("Difundir");
	urlBase = window.location.href.substring(0, pos1);
	var url = urlBase + "Difundir/listarArchivoDigital/?ss=" + ss + "&su=" + sucursalId;
	$.ajax(url, "get", listarTodo);


	//configurarSocket("ws://" + document.getElementById("hdfWS").value);
}
window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}
function listarTodo(r) {
	if (r != "") {
		var data = r.split("¬");
		lstAdmision = data[0] != "" ? (data[0].split("¯")) : ([]);
		var periodo = data[1] != "" ? (data[1].split("¯")) : ([]);
		lstVariablesCorreo = data[2] != "" ? (data[2].split("¯")) : ([]);
		llenarComboTabla(lstAdmision, "cboAdmision", "Todos");
		llenarComboTabla(periodo, "cboPeriodoInicio", "Todos");
		llenarComboTabla(periodo, "cboPeriodoFin", "Todos");
		llenarComboTabla(lstAdmision, "cboAdmisionC", "Todos");
		llenarComboTabla(periodo, "cboPeriodoInicioC", "Todos");
		llenarComboTabla(periodo, "cboPeriodoFinC", "Todos");
		llenarComboTabla(lstAdmision, "cboAdmisionR", "Todos");
		llenarComboTabla(periodo, "cboPeriodoInicioR", "Todos");
		llenarComboTabla(periodo, "cboPeriodoFinR", "Todos");
		crearTabla("Periodo|0");
		crearTabla("Medico|1");
		crearTabla("PeriodoC|2");
		crearTabla("MedicoC|3");
		crearTabla("MedicoR|4");

		llenarComboTabla(lstAdmision, "cboAdmMedico", "Todos");
		llenarComboTabla(lstAdmision, "cboAdmMedicoC", "Todos");
		llenarComboTabla(lstAdmision, "cboAdmMedicoR", "Todos");
		llenarComboTabla(matrizEstado, "cboEstMedico", "Todos");
		llenarComboTabla(matrizEstado, "cboEstMedicoC", "Todos");
		llenarComboTabla(matrizEstado, "cboEstMedicoR", "Todos");

		configurarOrdenacion("Periodo|0");
		configurarOrdenacion("Medico|1");
		configurarOrdenacion("PeriodoC|2");
		configurarOrdenacion("MedicoC|3");
		configurarOrdenacion("MedicoR|4");

	}
	configurarControles();
	document.getElementById("btnBusqueda").click();
}

function configurarControles() {
	var doc = document;
	var spnDoctor = doc.getElementsByClassName("spnDoctor");
	for (var x = 0; x < spnDoctor.length; x++) {
		spnDoctor[x].onclick = function () {
			var ifrMedico = document.getElementById("ifrMedico");
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "&tipo=" + this.getAttribute("data-id") + "'></iframe>";
			abrirPopup("PopupMedico");
		}
	}

	var sucursaltext = doc.getElementsByClassName("sucursal");
	for (var i = 0; i < sucursaltext.length; i++) {
		sucursaltext[i].value = sucursal;
	}

	var hdfMedico = doc.getElementById("hdfMedico"),
	hdfMedicoC = doc.getElementById("hdfMedicoC"),
	hdfMedicoR = doc.getElementById("hdfMedicoR");
	hdfMedico.onchange = hdfMedicoC.onchange = hdfMedicoR.onchange = function () {
		var datos = this.value.split("¦");
		this.value = datos[0];
		var tipo = this.getAttribute("data-tipo");
		var texto;
		switch (tipo) {
			case "0":
				texto = document.getElementById("txtBusquedaMedico");
				texto.value = datos[1];
				break;
			case "1":
				texto = document.getElementById("txtBusquedaMedicoC");
				texto.value = datos[1];
				break;
			case "2":
				texto = document.getElementById("txtBusquedaMedicoR");
				texto.value = datos[1];
				break;
		}
	}

	var btnBusqueda = doc.getElementById("btnBusqueda"),
	btnBusquedaC = doc.getElementById("btnBusquedaC"),
	btnBusquedaR = doc.getElementById("btnBusquedaR");
	btnBusqueda.onclick = btnBusquedaC.onclick = btnBusquedaR.onclick = function () {
		var tipo = this.getAttribute("data-tipo");
		var medico, tadm, periodo, periodo1, est;
		switch (tipo) {
			case "0":
				tabactual = "0";
				medico = doc.getElementById("hdfMedico").value;
				tadm = doc.getElementById("cboAdmision").value;
				periodo = doc.getElementById("cboPeriodoInicio").value;
				periodo1 = doc.getElementById("cboPeriodoFin").value;
				est = "P";
				break;
			case "1":
				tabactual = "1";
				medico = doc.getElementById("hdfMedicoC").value;
				tadm = doc.getElementById("cboAdmisionC").value;
				periodo = doc.getElementById("cboPeriodoInicioC").value;
				periodo1 = doc.getElementById("cboPeriodoFinC").value;
				est = "G";
				break;
			case "2":
				tabactual = "2";
				medico = doc.getElementById("hdfMedicoR").value;
				tadm = doc.getElementById("cboAdmisionR").value;
				periodo = doc.getElementById("cboPeriodoInicioR").value;
				periodo1 = doc.getElementById("cboPeriodoFinR").value;
				est = "E";
				break;
		}
		if (validarBusqueda(tipo)) {
			if (medico == "") { medico = "0"; }
			if (tadm == "") { tadm = "0"; }
			if (periodo == "") { periodo = "0"; }
			if (periodo1 == "") { periodo1 = "0"; }
			var url = urlBase + "Difundir/buscarArchivoDigital/?ss=" + ss + "&su=" + sucursalId + "&pe=" + medico + "&ad=" + tadm + "&pi=" + periodo + "&pf=" + periodo1 + "&est=" + est;
			$.ajax(url, "get", mostrarListas);
		}
	}
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

	var tblPeriodo = doc.getElementById("tblPeriodo"),
	tblMedico = doc.getElementById("tblMedico"),
	tblPeriodoC = doc.getElementById("tblPeriodoC"),
	tblMedicoC = doc.getElementById("tblMedicoC"),
	tblMedicoR = doc.getElementById("tblMedicoR");

	tblPeriodo.onclick = tblMedico.onclick = tblPeriodoC.onclick = tblMedicoC.onclick = tblMedicoR.onclick = function (e) {
		var el = e.target || e.srcElement;
		var tipo = el.type;
		if (this.id == "tblPeriodo") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodos") {
					SeleccionarChecks(0, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarMedico(chk[1] * 1);
						if (el.checked) {
							if (pos == -1) {
								PeriodosSeleccionados.push([chk[1] * 1]);
								indiceActualPagina = 0;
							}
						} else {
							if (pos > -1) {
								PeriodosSeleccionados.splice(pos, 1);
								indiceActualPagina = 0;
							}
						}
					}
				}
				mostrarMatriz(indiceActualPagina, "Periodo|0");
				crearMatriz("Medico|1");
				(PeriodosSeleccionados.length > 0 ? doc.getElementById("chkTodosM").checked = true : doc.getElementById("chkTodosM").checked = false);
				MedicosSeleccionados = [];
				SeleccionarChecks(1, true);
				indiceActualBloque = 0;
				indiceActualPagina = 0;
				MedicosSeleccionadosCheck = [];
				if (PeriodosSeleccionados.length > 0) {
					for (var x = 0; x < MedicosSeleccionados.length; x++) {
						MedicosSeleccionadosCheck.push([MedicosSeleccionados[x][0], MedicosSeleccionados[x][1], true]);
					}
				}
				mostrarMatriz(0, "Medico|1");

				var spnRutaArchivo = document.getElementById("spnRutaArchivo");
				if (PeriodosSeleccionados.length > 0 && PeriodosSeleccionados.length < 2) {
					spnRutaArchivo.innerHTML = rutaOriginal + PeriodosSeleccionados[0];
				}
				else {
					spnRutaArchivo.innerHTML = rutaOriginal;
				}
			}
		} else if (this.id == "tblMedico") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosM") {
					SeleccionarChecks(1, el.checked);
					var encontrado = false, posicionCheck = -1;
					for (var x = 0; x < matrizMedico.length; x++) {
						for (var k = 0; k < MedicosSeleccionadosCheck.length; k++) {
							if ((matrizMedico[x][4] * 1) == MedicosSeleccionadosCheck[k][0] && (matrizMedico[x][5] * 1) == MedicosSeleccionadosCheck[k][1]) {
								encontrado = true;
								posicionCheck = k;
								break;
							}
						}

						if (el.checked) {
							if (!encontrado) {
								MedicosSeleccionadosCheck.push([matrizMedico[x][0], matrizMedico[x][1], true]);
							}
							else {
								if (posicionCheck > -1) {
									MedicosSeleccionadosCheck[posicionCheck][2] = true;
								}
							}
						} else {
							if (encontrado) {
								MedicosSeleccionadosCheck[posicionCheck][2] = false;
							}
						}
						posicionCheck = -1;
						encontrado = false;
					}

				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarMedico(chk[0] * 1, 0, chk[1] * 1);
						if (el.checked) {
							if (pos == -1) {
								var n = MedicosSeleccionadosCheck.length;
								var matriz = MedicosSeleccionadosCheck.slice(0);
								for (var y = 0; y < n; y++) {
									if (matriz[y][0] == (chk[0] * 1) && matriz[y][1] == (chk[1] * 1)) {
										MedicosSeleccionadosCheck[y][2] = true;
										break;
									}
								}
								MedicosSeleccionados.push([(chk[0] * 1), (chk[1] * 1)]);
							}
						} else {
							if (pos > -1) {
								var n = MedicosSeleccionadosCheck.length;
								var matriz = MedicosSeleccionadosCheck.slice(0);
								for (var y = 0; y < n; y++) {
									if (matriz[y][0] == (chk[0] * 1) && matriz[y][1] == (chk[1] * 1)) {
										MedicosSeleccionadosCheck[y][2] = false;
										break;
									}
								}
								MedicosSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				indiceActualBloque = 0;
				mostrarMatriz(indiceActualPagina, "Medico|1");
			}
		} else if (this.id == "tblPeriodoC") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosC") {
					SeleccionarChecks(2, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarMedico(chk[1] * 1, 3);
						if (el.checked) {
							if (pos == -1) {
								PeriodosCSeleccionados.push([chk[1] * 1]);
								indiceActualPaginaC = 0;
							}
						} else {
							if (pos > -1) {
								PeriodosCSeleccionados.splice(pos, 1);
								indiceActualPaginaC = 0;
							}
						}
					}
				}
				mostrarMatriz(indiceActualPaginaC, "PeriodoC|2");
				crearMatriz("MedicoC|3");
				(PeriodosCSeleccionados.length > 0 ? doc.getElementById("chkTodosMC").checked = true : doc.getElementById("chkTodosMC").checked = false);
				MedicosCSeleccionados = [];
				SeleccionarChecks(3, true);
				indiceActualBloqueC = 0;
				indiceActualPaginaC = 0;
				mostrarMatriz(0, "MedicoC|3");
			}
		} else if (this.id == "tblMedicoC") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosMC") {
					SeleccionarChecks(3, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarMedico((chk[0] * 1), 1, (chk[1] * 1));
						if (el.checked) {
							if (pos == -1) {
								MedicosCSeleccionados.push([(chk[0] * 1), (chk[1] * 1), chk[2], chk[3], chk[4],(chk[5].trim()!=""?chk[5]:"Varios")]);
							}
						} else {
							if (pos > -1) {
								MedicosCSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				indiceActualBloqueC = 0;
				mostrarMatriz(indiceActualPaginaC, "MedicoC|3");
			}
		}
		else if (this.id == "tblMedicoR") {
			if (tipo == "checkbox") {
				if (el.id == "chkTodosMR") {
					SeleccionarChecks(4, el.checked);
				} else {
					if (el.getAttribute("data-check") != null) {
						var chk = el.getAttribute("data-check").split("¯");
						var pos = buscarMedico((chk[0] * 1), 2, (chk[1] * 1));
						if (el.checked) {
							if (pos == -1) {
								MedicosRSeleccionados.push([(chk[0] * 1), (chk[1] * 1), chk[2], chk[3], chk[4], (chk[5].trim()!=""?chk[5]:"Varios")]);
							}
						} else {
							if (pos > -1) {
								MedicosRSeleccionados.splice(pos, 1);
							}
						}
					}
				}
				indiceActualBloqueR = 0;
				mostrarMatriz(indiceActualPaginaR, "MedicoR|4");
			}
		}
	}

	var TextoPeriodo = doc.getElementsByName("cabeceraMedico");
	var n = TextoPeriodo.length;
	for (var i = 0; i < n; i++) {
		texto = TextoPeriodo[i];
		if (texto.nodeName == "SELECT") {
			texto.onchange = function (e) {
				filtrar("Medico|1");
				//MedicosSeleccionados = [];
				//document.getElementById("chkTodosM").checked = false;
				//document.getElementById("chkTodosM").click();

			}
		} else {
			texto.onkeyup = function (e) {
				filtrar("Medico|1");
				//MedicosSeleccionados = [];
				//document.getElementById("chkTodosM").checked = false;
				//document.getElementById("chkTodosM").click();
			}
		}
	}
	var TextoPeriodoC = doc.getElementsByName("cabeceraMedicoC");
	var n = TextoPeriodoC.length;
	for (var i = 0; i < n; i++) {
		texto = TextoPeriodoC[i];
		if (texto.nodeName == "SELECT") {
			texto.onchange = function (e) {
				filtrar("MedicoC|3");
				MedicosCSeleccionados = [];
				document.getElementById("chkTodosMC").checked = true;
				document.getElementById("chkTodosMC").click();
			}
		} else {
			texto.onkeyup = function (e) {
				filtrar("MedicoC|3");
				MedicosCSeleccionados = [];
				document.getElementById("chkTodosMC").checked = true;
				document.getElementById("chkTodosMC").click();
			}
		}
	}

	var TextoPeriodoR = doc.getElementsByName("cabeceraMedicoR");
	var n = TextoPeriodoR.length;
	for (var i = 0; i < n; i++) {
		texto = TextoPeriodoR[i];
		if (texto.nodeName == "SELECT") {
			texto.onchange = function (e) {
				filtrar("MedicoR|4");
				MedicosRSeleccionados = [];
				document.getElementById("chkTodosMR").checked = true;
				document.getElementById("chkTodosMR").click();
			}
		} else {
			texto.onkeyup = function (e) {

				filtrar("MedicoR|4");
				MedicosRSeleccionados = [];
				document.getElementById("chkTodosMR").checked = true;
				document.getElementById("chkTodosMR").click();

			}
		}
	}

	var btnProcesar = doc.getElementById("btnProcesar"),
	btnEnviar = doc.getElementById("btnEnviar"),
	btnReenviar = doc.getElementById("btnReenviar");
	btnProcesar.onclick = btnEnviar.onclick = btnReenviar.onclick = function () {
		if (this.id == "btnProcesar") {
			if (MedicosSeleccionados.length > 0) {
				tabactualB = "0";
				medicosProcesados = [];
				var str = obtenerParametros(0);
				if (str != "") {
					medicosProcesados = str.split("¬");
					pdfProcesados = medicosProcesados.length;
					var ddlFormatoTipo = document.getElementById("ddlFormatoTipo");
					var url = urlBase + "Difundir/procesarPdf/?ss=" + ss + "&ti=" + ddlFormatoTipo.value + "&su=" + sucursalId + "&con=" + 1;
					$.ajax(url, "post", mostrarRpta, medicosProcesados[0]);
					document.getElementById("spnProcesados").style.display = '';
					document.getElementById("spnProcesado").innerHTML = "1 de " + pdfProcesados;
					this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
					this.disabled = true;
					ddlFormatoTipo.disabled = true;
				}

			} else {
				mostraralerta("Seleccione por lo menos un médico")
			}
		} else if (this.id == "btnEnviar") {
			if (MedicosCSeleccionados.length > 0) {
				if (listaCuerpoCorreo != "") {
					var spnMedReeLen = document.getElementById("spnMedReeLen");
					spnMedReeLen.innerHTML = "¿Esta seguro de enviar los correos a " + MedicosCSeleccionados.length + " médico(s)?";
					var btngrabarReenvio = document.getElementById("btngrabarReenvio");
					btngrabarReenvio.setAttribute("data-id", 1);
					var TituloPopupReenvio = document.getElementById("TituloPopupReenvio");
					TituloPopupReenvio.innerHTML = "CONFIRMAR ENVIO";
					abrirPopup('PopupReenvio');
				} else {
					mostraralerta("No existe PLANTILLA de correo electrónico configurado");
				}

			} else {
				mostraralerta("Seleccione por lo menos un correo");
			}
		} else if (this.id == "btnReenviar") {
			if (MedicosRSeleccionados.length > 0) {
				if (listaCuerpoCorreo != "") {
					var spnMedReeLen = document.getElementById("spnMedReeLen");
					spnMedReeLen.innerHTML = "¿Esta seguro de enviar los correos a " + MedicosRSeleccionados.length + " médico(s)?";
					var btngrabarReenvio = document.getElementById("btngrabarReenvio");
					btngrabarReenvio.setAttribute("data-id", 2);
					var TituloPopupReenvio = document.getElementById("TituloPopupReenvio");
					TituloPopupReenvio.innerHTML = "CONFIRMAR REENVIO";
					abrirPopup('PopupReenvio');
				} else {
					mostraralerta("No existe PLANTILLA de correo electrónico configurado");
				}

			} else {
				mostraralerta("Seleccione por lo menos un correo")
			}
		}
	}

	var btngrabarReenvio = document.getElementById("btngrabarReenvio");
	btngrabarReenvio.onclick = function () {
		var opcion = this.getAttribute("data-id");
		if (opcion == "1") {
			tabactualB = "1";
			var str = obtenerParametros(1);
			str += "¯" + obtenerDatosCorreo(1);
			var url = urlBase + "Difundir/enviarCorreo/?ss=" + ss + "&su=" + sucursalId + "&ti=E";
			$.ajax(url, "post", mostrarRpta, str);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.disabled = true;
		}
		else {
			tabactualB = "2";
			var str = obtenerParametros(2);
			str += "¯" + obtenerDatosCorreo(2);
			var url = urlBase + "Difundir/enviarCorreo/?ss=" + ss + "&su=" + sucursalId + "&ti=R";
			$.ajax(url, "post", mostrarRpta, str);
			this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
			this.disabled = true;
		}
	}


	var btnBusquedaLimpiar = doc.getElementById("btnBusquedaLimpiar"),
	btnBusquedaLimpiarC = doc.getElementById("btnBusquedaLimpiarC"),
	btnBusquedaLimpiarR = doc.getElementById("btnBusquedaLimpiarR");

	btnBusquedaLimpiar.onclick = btnBusquedaLimpiarC.onclick = btnBusquedaLimpiarR.onclick = function () {
		mensajeValidacion = [];
		var tipo = this.getAttribute("data-tipo");
		switch (tipo) {
			case "0":
				doc.getElementById("txtBusquedaMedico").value = "";
				doc.getElementById("hdfMedico").value = "";
				doc.getElementById("tbPeriodo").innerHTML = "";
				doc.getElementById("tbMedico").innerHTML = "";
				doc.getElementById("chkTodos").checked = false;
				doc.getElementById("chkTodosM").checked = false;
				doc.getElementById("cboAdmision").value = "";
				doc.getElementById("cboPeriodoInicio").value = "";
				doc.getElementById("cboPeriodoFin").value = "";
				break;
			case "1":
				doc.getElementById("txtBusquedaMedicoC").value = "";
				doc.getElementById("hdfMedicoC").value = "";
				doc.getElementById("tbPeriodoC").innerHTML = "";
				doc.getElementById("tbMedicoC").innerHTML = "";
				doc.getElementById("chkTodosC").checked = false;
				doc.getElementById("chkTodosMC").checked = false;
				doc.getElementById("cboAdmisionC").value = "";
				doc.getElementById("cboPeriodoInicioC").value = "";
				doc.getElementById("cboPeriodoFinC").value = "";
				break;
			case "2":
				doc.getElementById("txtBusquedaMedicoR").value = "";
				doc.getElementById("hdfMedicoR").value = "";
				doc.getElementById("tbMedicoR").innerHTML = "";
				doc.getElementById("chkTodosMR").checked = false;
				doc.getElementById("cboAdmisionR").value = "";
				doc.getElementById("cboPeriodoInicioR").value = "";
				doc.getElementById("cboPeriodoFinR").value = "";
				break;
		}
	}

	var ExportarExcelMedicoR = doc.getElementById("ExportarExcelMedicoR"),
	ExportarExcelMedicoC = doc.getElementById("ExportarExcelMedicoC"),
	ExportarExcelMedico = doc.getElementById("ExportarExcelMedico");

	ExportarExcelMedicoR.onclick = ExportarExcelMedicoC.onclick = ExportarExcelMedico.onclick = function () {
		var tipo;
		if (this.id == "ExportarExcelMedico") {
			if (matrizMedico.length > 0) {
				tipo = 0;
			}

		} else if (this.id == "ExportarExcelMedicoC") {
			if (matrizMedicoC.length > 0) {
				tipo = 1;
			}

		} else if (this.id == "ExportarExcelMedicoR") {
			if (matrizMedicoR.length > 0) {
				tipo = 2
			}
		}
		if (tipo != undefined) {
			exportacion(tipo);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "ArchivoDigitalMedicos.xls";
			this.href = window.URL.createObjectURL(formBlob);
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
function llenarComboTabla(lista, nombreCombo, cabecera) {
	var contenido = "";
	var n = lista.length;
	var valor = "";
	var campos = "";
	if (cabecera != undefined) {
		contenido = "<option value=''>" + cabecera + "</option>";
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
	switch (actual.getAttribute("data-tab")) {
		case "tabx-1":
			document.getElementById("btnBusqueda").click();
			var checks = document.getElementsByName("rdnPrincipal");
			for (var x = 0; x < checks.length; x++) {
				checks[x].checked = false;
			}
			break;
		case "tabx-2":
			document.getElementById("btnBusquedaC").click();
			var checks = document.getElementsByName("rdnPrincipal");
			for (var x = 0; x < checks.length; x++) {
				checks[x].checked = false;
			}
			break;
			//case "tabx-3":
			//	document.getElementById("btnBusquedaR").click();
			//	break;
	}
	var spnRutaArchivo = document.getElementById("spnRutaArchivo");
	spnRutaArchivo.innerHTML = rutaOriginal;
}
function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
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

function validarIndividual(elemento, obligatorio) {
	if (obligatorio == undefined) {
		obligatorio = true;
	}
	var objeto = elemento.getAttribute("data-validacion").split("|");
	if (mensajeValidacion.length > 0) {
		var valor;
		if ("validarCombo" == objeto[0]) {
			var periodo, periodo1, per, per2;
			var index = elemento.id.substring(elemento.id.length - 1);
			if (index == "C") {
				if (elemento.value != "" || document.getElementById("cboPeriodoFinC").value != "") {
					if (elemento.id.indexOf("Inicio") > -1) {
						per = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
						periodo1 = document.getElementById("cboPeriodoFinC");
						per2 = (periodo1.value != "" ? (periodo1.options[periodo1.selectedIndex].text * 1) : periodo1.value * 1);
						if (per > per2) {
							mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo inicio debe ser menor a inicio";
							elemento.className += " error";
						} else {
							mensajeValidacion[periodo.getAttribute("data-secuencia")] = "";
							if (elemento.className.indexOf("error") > -1) {
								elemento.className = elemento.className.split("error").join("").trim();
							}
						}
					} else {
						per2 = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
						periodo = document.getElementById("cboPeriodoInicioC");
						per1 = (periodo.value != "" ? (periodo.options[periodo.selectedIndex].text * 1) : periodo.value * 1);
						if (per2 < per) {
							mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo Fin debe ser mayor a inicio";
							elemento.className += " error";
						} else {
							mensajeValidacion[periodo.getAttribute("data-secuencia")] = "";
							if (elemento.className.indexOf("error") > -1) {
								elemento.className = elemento.className.split("error").join("").trim();
							}
						}

					}
				}

			} else if (index == "R") {
				if (elemento.id.indexOf("Inicio") > -1) {
					per = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
					periodo1 = document.getElementById("cboPeriodoFinR");
					per2 = (periodo1.value != "" ? (periodo1.options[periodo1.selectedIndex].text * 1) : periodo1.value * 1);
					if (per > per2) {
						mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo inicio debe ser menor a inicio";
						elemento.className += " error";
					} else {
						mensajeValidacion[periodo.getAttribute("data-secuencia")] = "";
						if (elemento.className.indexOf("error") > -1) {
							elemento.className = elemento.className.split("error").join("").trim();
						}
					}
				} else {
					per2 = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
					periodo = document.getElementById("cboPeriodoInicioR");
					per1 = (periodo.value != "" ? (periodo.options[periodo.selectedIndex].text * 1) : periodo.value * 1);
					if (per2 < per) {
						mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo Fin debe ser mayor a inicio";
						elemento.className += " error";
					} else {
						mensajeValidacion[periodo.getAttribute("data-secuencia")] = "";
						if (elemento.className.indexOf("error") > -1) {
							elemento.className = elemento.className.split("error").join("").trim();
						}
					}
				}
			} else {
				if (elemento.id.indexOf("Inicio") > -1) {
					per = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
					periodo1 = document.getElementById("cboPeriodoFin");
					per2 = (periodo1.value != "" ? (periodo1.options[periodo1.selectedIndex].text * 1) : periodo1.value * 1);
					if (per > per2) {
						mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo inicio debe ser menor a inicio";
						elemento.className += " error";
					} else {
						mensajeValidacion[elemento.getAttribute("data-secuencia")] = "";
						if (elemento.className.indexOf("error") > -1) {
							elemento.className = elemento.className.split("error").join("").trim();
						}
					}
				} else {
					per2 = (elemento.value != "" ? (elemento.options[elemento.selectedIndex].text * 1) : elemento.value * 1);
					periodo = document.getElementById("cboPeriodoInicio");
					per = (periodo.value != "" ? (periodo.options[periodo.selectedIndex].text * 1) : periodo.value * 1);
					if (per2 < per) {
						mensajeValidacion[elemento.getAttribute("data-secuencia")] = "Periodo Fin debe ser mayor a inicio";
						elemento.className += " error";
					} else {
						mensajeValidacion[periodo.getAttribute("data-secuencia")] = "";
						if (elemento.className.indexOf("error") > -1) {
							elemento.className = elemento.className.split("error").join("").trim();
						}
					}
				}
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
function validarBusqueda(t) {
	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	var medico, periodo, periodo1;
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	switch (t) {
		case "0":
			periodo = document.getElementById("cboPeriodoInicio");
			periodo1 = document.getElementById("cboPeriodoFin");
			break;
		case "1":
			periodo = document.getElementById("cboPeriodoInicioC");
			periodo1 = document.getElementById("cboPeriodoFinC");
			break;
		case "2":
			periodo = document.getElementById("cboPeriodoInicioR");
			periodo1 = document.getElementById("cboPeriodoFinR");
			break
	}

	var per = periodo.value != "" ? (periodo.options[periodo.selectedIndex].text * 1) : periodo.value * 1;
	var per2 = periodo1.value != "" ? (periodo1.options[periodo1.selectedIndex].text * 1) : periodo1.value * 1;
	if (per2 < per) {
		mensajeValidacion[periodo1.getAttribute("data-secuencia")] = "Periodo Fin debe ser mayor al de inicio";
		periodo1.className += " error";
	} else if (per > per2) {
		mensajeValidacion[periodo.getAttribute("data-secuencia")] = "Periodo inicio debe ser menor a inicio";
		periodo.className += " error";
	}
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}
}

function mostrarListas(r) {
	if (r != "") {
		var data = r.split("¬");
		switch (tabactual) {

			case "0":
				MedicosSeleccionados = [], PeriodosSeleccionados = [];
				listaPeriodo = data[0] != "" ? (data[0].split("¯")) : [];
				listaMedico = data[1] != "" ? (data[1].split("¯")) : [];
				crearMatriz("Periodo|0");
				crearMatriz("Medico|1");
				indiceActualPaginaP = 0, indiceActualPagina = 0, indiceActualBloque = 0, indiceActualBloqueP = 0;
				mostrarMatriz(indiceActualPaginaP, "Periodo|0");
				mostrarMatriz(indiceActualPagina, "Medico|1");
				var checks = document.getElementsByName("rdnPrincipal");
				for (var x = 0; x < checks.length; x++) {
					checks[x].checked = false;
				}
				document.getElementById("chkTodos").checked = false;
				document.getElementById("chkTodosM").checked = false;
				break;
			case "1":
				MedicosCSeleccionados = [], PeriodosCSeleccionados = [];
				listaPeriodoC = data[0] != "" ? (data[0].split("¯")) : [];
				listaMedicoC = data[1] != "" ? (data[1].split("¯")) : [];
				listaCuerpoCorreo = data[2] != "" ? (data[2].split("¦")) : [];
				crearMatriz("PeriodoC|0");
				crearMatriz("MedicoC|1");
				indiceActualPaginaPC = 0, indiceActualPaginaC = 0, indiceActualBloqueC = 0, indiceActualBloquePC = 0;
				mostrarMatriz(indiceActualPaginaP, "PeriodoC|0");
				mostrarMatriz(indiceActualPagina, "MedicoC|1");
				var checks = document.getElementsByName("rdnPrincipal");
				for (var x = 0; x < checks.length; x++) {
					checks[x].checked = false;
				}
				document.getElementById("chkTodosC").checked = false;
				document.getElementById("chkTodosMC").checked = false;
				break;
			case "2":
				//listaMedicoR = data[0] != "" ? (data[0].split("¯")) : [];

				MedicosRSeleccionados = [], PeriodosRSeleccionados = [];
				listaPeriodoR = data[0] != "" ? (data[0].split("¯")) : [];
				listaMedicoR = data[1] != "" ? (data[1].split("¯")) : [];
				listaCuerpoCorreo = data[2] != "" ? (data[2].split("¦")) : [];
				crearMatriz("PeriodoR|0");
				crearMatriz("MedicoR|0");
				indiceActualPaginaPR = 0, indiceActualPaginaR = 0, indiceActualBloqueR = 0, indiceActualBloquePR = 0;
				//mostrarMatriz(indiceActualPaginaP, "PeriodoR|0");
				mostrarMatriz(indiceActualPagina, "MedicoR|4");
				//document.getElementById("chkTodosMR").click();
				break;
		}


	}
}
function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador[1]) {

		case "0":
		case "2":
			contenido = "<table id='tblPeriodo" + (identificador[1] == "2" ? "C" : "") + "' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodos" + (identificador[1] == "2" ? "C" : "") + "'/></th>";
			break;
		case "1":
		case "3":
		case "4":
			contenido = "<table id='tblMedico" + (identificador[1] == "3" ? "C" : identificador[1] == "4" ? "R" : "") + "' class='tabla-general'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><input type='checkbox' id='chkTodosM" + (identificador[1] == "3" ? "C" : identificador[1] == "4" ? "R" : "") + "'/></th>";
			break;

	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador[0]][j];
		contenido += "%'><span id='spn";
		contenido += j.toString();
		contenido += "' class='Enlace";
		contenido += identificador[0];
		contenido += "-";
		contenido += identificador[1];
		contenido += "' data-orden='";
		contenido += window["matrizIndice" + identificador[0]][j];
		contenido += "'>";
		contenido += window["cabeceras" + identificador[0]][j];
		contenido += "</span>";
		if (identificador[1] == "1" || identificador[1] == "3" || identificador[1] == "4") {
			contenido += "<br/>";
			if (j == 2 || j == 3) {
				contenido += "<select id='cbo" + (j == 2 ? ("Adm" + identificador[0]) : ("Est" + identificador[0])) + "' class='cbo";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "' style='width:90%'></select>";
			} else {
				if (identificador[1] == "1") {
					if (j == 6) {
						contenido += "<select class='Combo' name='cabecera";
						contenido += identificador[0];
						contenido += "' style='width:90%'><option value=''>TODOS</option><option value='1'>NORMAL</option><option value='2'>REGULARIZACIÓN</option><option value='3'>COMPENSACIÓN</option>";
					}
					else {
						contenido += "<input type='text' class='Texto";
						contenido += identificador[0];
						contenido += "' name='cabecera";
						contenido += identificador[0];
						contenido += "' style='width:90%'>";
					}
				} else {
					contenido += "<input type='text' class='Texto";
					contenido += identificador[0];
					contenido += "' name='cabecera";
					contenido += identificador[0];
					contenido += "' style='width:90%'>";
				}
			}
		}
		contenido += "</th>";
	}
	if (identificador[1] == "1" || identificador[1] == "3" || identificador[1] == "4") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><a class='Icons fa-file-excel-o' id='ExportarExcel" + identificador[0] + "'></a></th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	contenido += (nCampos + ((identificador[1] == "1" || identificador[1] == "3" || identificador[1] == "4") ? 2 : 1)).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador[0]).innerHTML = contenido;
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
				switch (identificador[1]) {
					case "0":
						indiceActualBloqueP = 0;
						break;
					case "1":
						indiceActualBloque = 0;
						break;
					case "2":
						indiceActualBloqueCP = 0;
						break;
					case "3":
						indiceActualBloqueC = 0;
						break;
					case "4":
						indiceActualBloqueR = 0;
						break;

				}
				break;
			case -2:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloqueP > 0) {
							indiceActualBloqueP--;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloque > 0) {
							indiceActualBloque--;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueCP > 0) {
							indiceActualBloqueCP--;
							indicePagina = indiceActualBloqueCP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueC > 0) {
							indiceActualBloqueC--;
							indicePagina = indiceActualBloqueC * paginasBloque;
						}
						break;
					case "4":
						if (indiceActualBloqueR > 0) {
							indiceActualBloqueR--;
							indicePagina = indiceActualBloqueR * paginasBloque;
						}
						break;
				}
				break;
			case -3:
				switch (identificador[1]) {
					case "0":
						if (indiceActualBloqueP < indiceUltimoBloque) {
							indiceActualBloqueP++;
							indicePagina = indiceActualBloqueP * paginasBloque;
						}
						break;
					case "1":
						if (indiceActualBloque < indiceUltimoBloque) {
							indiceActualBloque++;
							indicePagina = indiceActualBloque * paginasBloque;
						}
						break;
					case "2":
						if (indiceActualBloqueCP < indiceUltimoBloque) {
							indiceActualBloqueCP++;
							indicePagina = indiceActualBloqueCP * paginasBloque;
						}
						break;
					case "3":
						if (indiceActualBloqueC < indiceUltimoBloque) {
							indiceActualBloqueC++;
							indicePagina = indiceActualBloqueC * paginasBloque;
						}
						break;
					case "4":
						if (indiceActualBloqueR < indiceUltimoBloque) {
							indiceActualBloqueR++;
							indicePagina = indiceActualBloqueR * paginasBloque;
						}
						break;
				}
				break;
			case -4:
				switch (identificador[1]) {
					case "0":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueP = indiceUltimoBloque;
						break;
					case "1":
						indicePagina = indiceUltimaPagina;
						indiceActualBloque = indiceUltimoBloque;
						break;
					case "2":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueCP = indiceUltimoBloque;
						break;
					case "3":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueC = indiceUltimoBloque;
						break;
					case "4":
						indicePagina = indiceUltimaPagina;
						indiceActualBloqueR = indiceUltimoBloque;
						break;
				}
				break;
		}
	}
	switch (identificador[1]) {
		case "0":
			indiceActualPaginaP = indicePagina;
			break;
		case "1":
			indiceActualPagina = indicePagina;
			break;
		case "2":
			indiceActualPaginaCP = indicePagina;
			break;
		case "3":
			indiceActualPaginaC = indicePagina;
			break;
		case "3":
			indiceActualPaginaR = indicePagina;
			break;
	}
	mostrarMatriz(indicePagina, elemento);
}
function crearMatriz(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0, nFiltro, regFiltro, ndDpl = false, posperiodo;
	if (nRegistros > 0) {
		if (window["lista" + identificador[0]][0] != "") {
			window["matriz" + identificador[0]] = [];
			for (var i = 0; i < nRegistros; i++) {
				campos = window["lista" + identificador[0]][i].split("¦");
				window["matriz" + identificador[0]][x] = [];
				nCampos = campos.length;
				switch (identificador[1]) {
					case "4":
					case "2":
						for (var j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
							else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
						break;

					case "0":
						for (var j = 0; j < nCampos; j++) {
							if (isNaN(campos[j]) || campos[j] == "" || j == 2) window["matriz" + identificador[0]][x][j] = campos[j];
							else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
						break;
					case "1":
						if (PeriodosSeleccionados.length > 0) {
							posperiodo = buscarMedico(campos[0] * 1);
							if (posperiodo > -1) {
								ndDpl = false;
								if (!ndDpl) {
									for (var j = 0; j < nCampos; j++) {
										if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
										else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
									}
									x++;
								}
							}
						}
						break;
					case "3":
						if (PeriodosCSeleccionados.length > 0) {
							posperiodo = buscarMedico(campos[6] * 1, 3);
							if (posperiodo > -1) {
								ndDpl = false;
								if (!ndDpl) {
									for (var j = 0; j < nCampos; j++) {
										if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
										else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
									}
									x++;
								}
							}
						}
						break;
				}
				if (identificador[1] != "1" && identificador[1] != "3") {
					x++;
				}
			}
			if (identificador[1] == "1" || identificador[1] == "3") {
				if (window["matriz" + identificador[0]][window["matriz" + identificador[0]].length - 1].length == 0) {
					window["matriz" + identificador[0]].splice((window["matriz" + identificador[0]].length - 1), 1);
				}
			}
		}
	}
	else {
		window["matriz" + identificador[0]] = [];
	}
}
function mostrarMatriz(indicePagina, elemento) {

	var identificador = elemento.split("|");
	switch (identificador[1]) {
		case "0":
			indiceActualPaginaP = indicePagina;
			break;
		case "1":
			indiceActualPagina = indicePagina;
			break;
		case "2":
			indiceActualPaginaCP = indicePagina;
			break;
		case "3":
			indiceActualPaginaC = indicePagina;
			break;
		case "4":
			indiceActualPaginaR = indicePagina;
			break;
	}

	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var registroPaginaActual;
		registroPaginaActual = registrosPagina;

		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registroPaginaActual;
		var fin = inicio + registroPaginaActual;
		var valorTadm;
		switch (identificador[1]) {
			case "2":
			case "0":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnPrincipal'";
						contenido += " data-check='";
						contenido += window["matriz" + identificador[0]][i][0];
						contenido += "¯" + window["matriz" + identificador[0]][i][1] + "'";
						if (identificador[1] == "0") {
							contenido += (buscarMedico(window["matriz" + identificador[0]][i][1] * 1) > -1 ? " checked" : "");
						} else {
							contenido += (buscarMedico(window["matriz" + identificador[0]][i][1] * 1, 3) > -1 ? " checked" : "");
						}
						contenido += "/></td>";
						for (var j = 1; j < nCampos ; j++) {
							contenido += "<td>";
							contenido += window["matriz" + identificador[0]][i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "4":
			case "3":
			case "1":

				switch (identificador[1]) {
					case "1":
						nCampos = nCampos - 3;
						break;
					case "3":
						nCampos = nCampos - 9;
						break;
					case "4":
						nCampos = nCampos - 8;
						break;
				}
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'><input type='checkbox' name='rdnDetalle' ";
						contenido += " data-check='";

						if (identificador[1] == "1") {
							contenido += window["matriz" + identificador[0]][i][4];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][5];
							contenido += "'";
							//contenido += (buscarMedico(window["matriz" + identificador[0]][i][4] * 1, 0, window["matriz" + identificador[0]][i][5] * 1) > -1 ? " checked" : "");
							contenido += (buscarMedicoCheck(window["matriz" + identificador[0]][i][4] * 1, window["matriz" + identificador[0]][i][5] * 1) > -1 ? " checked" : "");
						} else if (identificador[1] == "3") {
							contenido += window["matriz" + identificador[0]][i][4];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][5];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][0];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][1];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][8];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][11];
							contenido += "'";
							contenido += (buscarMedico(window["matriz" + identificador[0]][i][4] * 1, 1, window["matriz" + identificador[0]][i][5] * 1) > -1 ? " checked" : "");
						} else if (identificador[1] == "4") {
							contenido += window["matriz" + identificador[0]][i][4];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][5];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][0];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][1];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][8];
							contenido += "¯";
							contenido += window["matriz" + identificador[0]][i][11];
							contenido += "'";
							contenido += (buscarMedico(window["matriz" + identificador[0]][i][4] * 1, 2, window["matriz" + identificador[0]][i][5]) > -1 ? " checked" : "");
						}
						contenido += "/></td>";
						var existe = false;
						for (var j = 0; j < nCampos; j++) {

							if (identificador[1] == "4") {
								if (j == 5) {
									contenido += "<td style='text-align:right'>";
								} else {
									contenido += "<td>";
								}
							}
							else {
								if (j == 4) {
									contenido += "<td style='text-align:right'>";
								} else {
									contenido += "<td>";
								}
							}



							switch (j) {
								case 2:
									for (var z = 0; z < lstAdmision.length; z++) {
										valorTadm = lstAdmision[z].split("¦");
										if (valorTadm[0] == window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]]) {
											contenido += valorTadm[1];
											existe = true;
											break;
										}
									}
									if (!existe) {
										contenido += "Varios";
									}
									break;
								case 3:
									for (var z = 0; z < matrizEstado.length; z++) {
										valorTadm = matrizEstado[z].split("¦");
										if (valorTadm[0] == window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]]) {
											contenido += valorTadm[1];
											break;
										}
									}
									break;
								default:
									if (identificador[1] == "4") {
										if (j == 5) {
											contenido += formatearNumero(window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]]);
										} else {
											contenido += window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]];
										}
									}
									else {
										if (j == 4) {
											contenido += formatearNumero(window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]]);
										} else {
											if (identificador[1] == "3") {
												if (j == 0) {
													contenido += window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]];

												} else {
													contenido += window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]];
												}
											} else {
												if (j == 6) {
													switch (window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]]) {
														case 1:
															contenido += "NORMAL";
															break;
														case 2:
															contenido += "REGULARIZACIÓN";
															break;
														case 3:
															contenido += "COMPENSACIÓN";
															break;
													}
												} else {
													contenido += window["matriz" + identificador[0]][i][window["matrizIndice" + identificador[0]][j]];
												}
											}
										}
									}
									break;
							}
							contenido += "</td>";
						}
						contenido += "<td></td>";
						contenido += "</tr>";
					}
					else break;
				}
				switch (identificador[1]) {
					case "1":

						if (matrizMedico.length > 0) {
							var valortotal = 0;
							contenido += "<tr><td style='text-align:right' colspan=3>CANTIDAD</td><td style='text-align:right'>";
							contenido += matrizMedico.length;
							contenido += "</td><td>TOTAL</td><td style='text-align:right'>";
							for (var x = 0; x < matrizMedico.length; x++) {
								valortotal = valortotal + matrizMedico[x][7];
							}
							contenido += formatearNumero(valortotal);
							contenido += "</td><td colspan=2></td></tr>";

						}
						break;
					case "3":
						if (matrizMedicoC.length > 0) {
							var valortotal = 0;
							contenido += "<tr><td style='text-align:right' colspan=3>CANTIDAD</td><td style='text-align:right'>";
							contenido += matrizMedicoC.length;
							contenido += "</td><td>TOTAL</td><td style='text-align:right'>";
							for (var x = 0; x < matrizMedicoC.length; x++) {
								valortotal = valortotal + matrizMedicoC[x][12];
							}
							contenido += formatearNumero(valortotal);
							contenido += "</td><td colspan=2></td></tr>";
						}
						break;
				}
				break;
		}
	}
	else {
		var nCabeceras = window["cabeceras" + identificador[0]].length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + (identificador[1] != "1" || identificador[1] != "3" || identificador[1] != "4" ? 1 : 2)).toString();
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
	switch (identificador[1]) {
		case "0":
			bloqueActual = indiceActualBloqueP;
			break;
		case "1":
			bloqueActual = indiceActualBloque;
			break;
		case "2":
			bloqueActual = indiceActualBloqueCP;
			break;
		case "3":
			bloqueActual = indiceActualBloqueC;
			break;
		case "4":
			bloqueActual = indiceActualBloqueR;
			break;

	}

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
		document.getElementById("tdPaginas" + (identificador[1] == "1" ? "Medico" : identificador[0])).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + (identificador[0])).innerHTML = contenido;
		seleccionarPaginaActual(identificador[0], identificador[1]);
	}
}
function seleccionarPaginaActual(dato, identificador) {
	var indice;
	switch (identificador) {
		case "0":
			indice = indiceActualPaginaP;
			break;
		case "1":
			indice = indiceActualPagina;
			break;
		case "2":
			indice = indiceActualPaginaCP;
			break;
		case "3":
			indice = indiceActualPaginaC;
			break;
		case "4":
			indice = indiceActualPaginaR;
			break;

	}
	var aPagina = document.getElementById("a" + dato + indice);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
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
			switch (identificador[1]) {
				case "0":
					pagina = indiceActualPaginaP;
					break;
				case "1":
					pagina = indiceActualPagina;
					break;
				case "2":
					pagina = indiceActualPaginaCP;
					break;
				case "3":
					pagina = indiceActualPaginaC;
					break;
				case "4":
					pagina = indiceActualPaginaR;
					break;

			}
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

function filtrar(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = document.getElementsByName("cabecera" + (identificador[0]));
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
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + (identificador[0]))) exito = exito && (campos[window["matrizIndice" + identificador[0]][j]].toString().toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campos[window["matrizIndice" + identificador[0]][j]] == cabecera.value);
			if (!exito) break;
		}
		if (exito) {
			if (identificador[1] == "1" || identificador[1] == "3") {
				if (identificador[1] == "1") {
					for (var u = 0; u < PeriodosSeleccionados.length; u++) {
						if (campos[0] * 1 == PeriodosSeleccionados[u]) {
							window["matriz" + identificador[0]][x] = [];
							for (var j = 0; j < nCampos; j++) {
								if (isNaN(campos[j]) || campos[j] == "" || j == 2) window["matriz" + identificador[0]][x][j] = campos[j];
								else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
							}
							x++;
							break;
						}
					}
				} else {
					for (var u = 0; u < PeriodosCSeleccionados.length; u++) {
						if (campos[6] * 1 == PeriodosCSeleccionados[u]) {
							window["matriz" + identificador[0]][x] = [];
							for (var j = 0; j < nCampos; j++) {
								if (isNaN(campos[j]) || campos[j] == "" || j == 2) window["matriz" + identificador[0]][x][j] = campos[j];
								else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
							}
							x++;
							break;
						}
					}
				}
			} else {
				window["matriz" + identificador[0]][x] = [];
				for (var j = 0; j < nCampos; j++) {
					if (isNaN(campos[j]) || campos[j] == "" || j == 2) window["matriz" + identificador[0]][x][j] = campos[j];
					else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
				}
				x++;
			}
		}
	}
	paginar(0, elemento);
	switch (identificador[1]) {
		case "1":
			indiceActualPagina = 0;
			break;
		case "3":
			indiceActualPaginaC = 0;
			break;
		case "4":
			indiceActualPaginaR = 0;
			break;
	}
}
function SeleccionarChecks(t, c) {
	var n, reg;
	switch (t) {
		case 0:
			if (c) {
				n = matrizPeriodo.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizPeriodo[i];
						PeriodosSeleccionados.push([reg[1]]);
					}
				}
			} else {
				PeriodosSeleccionados = [];
			}
			break;
		case 1:
			if (c) {
				n = matrizMedico.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizMedico[i];
						MedicosSeleccionados.push([(reg[4] * 1), (reg[5] * 1)]);
					}
				}
			} else {
				MedicosSeleccionados = [];
			}
			break;
		case 2:
			if (c) {
				n = matrizPeriodoC.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizPeriodoC[i];
						PeriodosCSeleccionados.push([reg[1]]);
					}
				}
			} else {
				PeriodosCSeleccionados = [];
			}
			break;
		case 3:
			if (c) {
				n = matrizMedicoC.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizMedicoC[i];
						MedicosCSeleccionados.push([(reg[4] * 1), (reg[5] * 1), reg[0], reg[1], reg[8], (reg[11].trim() != "" ? reg[11] : "Varios")]);
					}
				}
			} else {
				MedicosCSeleccionados = [];
			}
			break;
		case 4:
			if (c) {
				n = matrizMedicoR.length;
				if (n > 0) {
					for (var i = 0; i < n; i++) {
						reg = matrizMedicoR[i];
						MedicosRSeleccionados.push([(reg[4] * 1), (reg[5] * 1), reg[0], reg[1], reg[8], (reg[11].trim() != "" ? reg[11] : "Varios")]);
						//MedicosRSeleccionados.push([reg[7]]);
					}
				}
			} else {
				MedicosRSeleccionados = [];
			}
			break;
	}
}
function buscarMedico(id, t, p) {
	var n, reg, pos = -1;
	if (t == undefined) {
		n = PeriodosSeleccionados.length
	} else if (t == 0) {
		n = MedicosSeleccionados.length
	} else if (t == 1) {
		n = MedicosCSeleccionados.length
	} else if (t == 2) {
		n = MedicosRSeleccionados.length
	} else if (t == 3) {
		n = PeriodosCSeleccionados.length
	}
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			if (t == undefined) {
				reg = PeriodosSeleccionados[i]
			} else if (t == 0) {
				reg = MedicosSeleccionados[i];
			} else if (t == 1) {
				reg = MedicosCSeleccionados[i];
			} else if (t == 2) {
				reg = MedicosRSeleccionados[i];
			} else if (t == 3) {
				reg = PeriodosCSeleccionados[i];
			}
			if (p == undefined) {
				if (reg[0] == id) {
					pos = i;
					break;
				}
			} else {
				if (reg[0] == id && reg[1] == p) {
					pos = i;
					break;
				}
			}

		}
	}
	return pos;
}

function buscarMedicoCheck(id, p) {
	var n, reg, pos = -1
	n = MedicosSeleccionadosCheck.length
	if (n > 0) {
		for (var i = 0; i < n; i++) {
			reg = MedicosSeleccionadosCheck[i];
			if (reg[0] == id && reg[1] == p && reg[2] == true) {
				pos = i;
				break;
			}
		}
	}
	return pos;
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
function obtenerParametros(t) {
	var cnt = "", n, reg;
	switch (t) {
		case 0:
			n = MedicosSeleccionadosCheck.length;
			break;
		case 1:
			n = MedicosCSeleccionados.length;
			break;
		case 2:
			n = MedicosRSeleccionados.length;
			break;
	}

	for (var i = 0; i < n; i++) {
		switch (t) {
			case 0:
				reg = MedicosSeleccionadosCheck[i];
				if (reg[2] == true) {
					cnt += reg[1] + "¦" + reg[0] + "¬";
				}
				break;
			case 1:
				reg = MedicosCSeleccionados[i];
				cnt += reg[1] + "¦" + reg[0] + "¦" + reg[2] + "¦" + reg[3] + "¦" + reg[4] +"¦"+reg[5] + "¬";
				break;
			case 2:
				reg = MedicosRSeleccionados[i];
				cnt += reg[1] + "¦" + reg[0] + "¦" + reg[2] + "¦" + reg[3] + "¦" + reg[4] + "¦" + reg[5] + "¬";
				break;
		}
	}
	cnt = cnt.substring(0, cnt.length - 1);
	return cnt;
}
function mostrarRpta(r) {
	var doc = document;
	switch (tabactualB) {
		case "1":
			doc.getElementById("btnEnviar").disabled = false;
			doc.getElementById("btnEnviar").innerHTML = "Enviar";
			var btngrabarReenvio = document.getElementById("btngrabarReenvio");
			btngrabarReenvio.innerHTML = "Grabar";
			abrirPopup('PopupReenvio');
			break;
		case "2":
			doc.getElementById("btnReenviar").disabled = false;
			doc.getElementById("btnReenviar").innerHTML = "Reenviar";
			var btngrabarReenvio = document.getElementById("btngrabarReenvio");
			btngrabarReenvio.innerHTML = "Grabar";
			abrirPopup('PopupReenvio');
			break;
	}
	if (r != "") {
		switch (tabactualB) {
			case "0":
				if (parseInt(r - 1) > -1 && parseInt(r - 1) < pdfProcesados) {
					var ddlFormatoTipo = document.getElementById("ddlFormatoTipo").value;
					var url = urlBase + "Difundir/procesarPdf/?ss=" + ss + "&ti=" + ddlFormatoTipo + "&su=" + sucursalId + "&con=" + parseInt(r);
					$.ajax(url, "post", mostrarRpta, medicosProcesados[r - 1]);
					document.getElementById("spnProcesados").style.display = '';
					document.getElementById("spnProcesado").innerHTML = r + ' de ' + pdfProcesados;
				}
				else {
					doc.getElementById("btnProcesar").disabled = false;
					doc.getElementById("btnProcesar").innerHTML = "Procesar";
					document.getElementById("spnProcesados").style.display = 'none';
					document.getElementById("spnProcesado").innerHTML = '';
					doc.getElementById("btnBusqueda").click();
					var ddlFormatoTipo = document.getElementById("ddlFormatoTipo");
					ddlFormatoTipo.disabled = false;
					mostraralerta("Archivos generados");
				}
				break;
			case "1":
				doc.getElementById("btnBusquedaC").click();
				mostraralerta("Correos enviados");
				break;
			case "2":
				doc.getElementById("btnBusquedaR").click();
				mostraralerta("Correos enviados");
				break;
		}

	} else {
		mostraralerta("Error al procesar archivos");
	}
}
function crearCabeceraExportar(tipo) {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	switch (tipo) {
		case 0:
			cabecera += "<td style='width: 150px' align='center'>Periodo Planilla</td>";
			cabecera += "<td style='width: 400px' align='center'>Médico/Empresa</td>";
			cabecera += "<td style='width: 140px' align='center'>Tipo Admisión</td>";
			cabecera += "<td style='width: 100px' align='center'>Estado</td>";
			cabecera += "<td style='width: 100px' align='center'>Total</td>";
			cabecera += "<td style='width: 170px' align='center'>Periodo Provisión</td>";
			cabecera += "<td style='width: 100px' align='center'>Tipo Planilla</td>";
			break;
		case 1:
			cabecera += "<td style='width: 200px' align='center'>Correo</td>";
			cabecera += "<td style='width: 210px' align='center'>Médico/Empresa</td>";
			cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
			cabecera += "<td style='width: 100px' align='center'>Estado</td>";
			cabecera += "<td style='width: 100px' align='center'>Total</td>";
			cabecera += "<td style='width: 100px' align='center'>Periodo Provisión</td>";
			break;
		case 2:
			cabecera += "<td style='width: 100px' align='center'>Correo</td>";
			cabecera += "<td style='width: 210px' align='center'>Médico/Empresa</td>";
			cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
			cabecera += "<td style='width: 100px' align='center'>Estado</td>";
			cabecera += "<td style='width: 100px' align='center'>Ultima fecha envio</td>";
			cabecera += "<td style='width: 100px' align='center'>Total</td>";
			cabecera += "<td style='width: 100px' align='center'>Periodo Provisión</td>";
			break;
	}

	cabecera += "</tr>";
	return cabecera;
}
function exportacion(tipo) {
	var nRegistros, nCampos, reg;

	switch (tipo) {
		case 0:
			nRegistros = matrizMedico.length;
			nCampos = cabecerasMedico.length;
			break;
		case 1:
			nRegistros = matrizMedicoC.length;
			nCampos = cabecerasMedicoC.length;
			break;
		case 2:
			nRegistros = matrizMedicoR.length;
			nCampos = cabecerasMedicoR.length;
			break;

	}

	var contenido = [];
	excelExportar = crearCabeceraExportar(tipo);
	var valorTadm;
	for (var i = 0; i < nRegistros; i++) {
		contenido.push("<tr>");
		switch (tipo) {
			case 0:
				reg = matrizMedico[i];
				break;
			case 1:
				reg = matrizMedicoC[i];
				break;
			case 2:
				reg = matrizMedicoR[i];
				break;
		}

		for (var j = 0; j < nCampos ; j++) {
			contenido.push("<td>");
			switch (tipo) {

				case 0:
					if (j == 2) {
						for (var z = 0; z < lstAdmision.length; z++) {
							valorTadm = lstAdmision[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					}
					else if (j == 3) {
						for (var z = 0; z < matrizEstado.length; z++) {
							valorTadm = matrizEstado[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					} else if (j == 6) {
						switch (reg[matrizIndiceMedico[j]]) {
							case 1:
								contenido.push("NORMAL");
								break;
							case 2:
								contenido.push("REGULARIZACIÓN");
								break;
							case 3:
								contenido.push("COMPENSACIÓN");
								break;
						}
					}else {
						contenido.push(reg[matrizIndiceMedico[j]]);
					}
					break;
				case 1:
					if (j == 2) {
						for (var z = 0; z < lstAdmision.length; z++) {
							valorTadm = lstAdmision[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					}
					else if (j == 3) {
						for (var z = 0; z < matrizEstado.length; z++) {
							valorTadm = matrizEstado[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					} else {
						contenido.push(reg[matrizIndiceMedicoC[j]]);
					}
					break;
				case 2:
					if (j == 2) {
						for (var z = 0; z < lstAdmision.length; z++) {
							valorTadm = lstAdmision[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					}
					else if (j == 3) {
						for (var z = 0; z < matrizEstado.length; z++) {
							valorTadm = matrizEstado[z].split("¦");
							if (valorTadm[0] == reg[j]) {
								contenido.push(valorTadm[1]);
								break;
							}
						}
					} else {
						contenido.push(reg[matrizIndiceMedicoR[j]]);
					}
					break;
			}
			contenido.push("</td>");
		}
		contenido.push("</tr>");
	}
	excelExportar += contenido.join("") + "</table></html>";
}


function obtenerDatosCorreo(opcion) {
	var datos, lista1 = [], lista2 = [];
	var contenido1 = listaCuerpoCorreo[0], contenido2 = listaCuerpoCorreo[1];
	switch (opcion) {
		case 1:
			for (var x = 0; x < MedicosCSeleccionados.length; x++) {
				for (var y = 0; y < listaMedicoC.length; y++) {
					datos = listaMedicoC[y].split("¦");
					if (((datos[4] * 1) == MedicosCSeleccionados[x][0]) && ((datos[5] * 1) == MedicosCSeleccionados[x][1])) {
						contenido1 = contenido1.replace("@DescripcionProceso", datos[9]);
						contenido1 = contenido1.replace("@Medico", datos[1]);
						contenido1 = contenido1.replace("@PeriodoPlanilla", datos[6]);
						contenido1 = contenido1.replace("@PlanillaId", datos[5]);
						contenido1 = contenido1.replace("@TAdm", datos[11]);

						contenido2 = contenido2.replace("@DescripcionProceso", datos[9]);
						contenido2 = contenido2.replace("@Medico", datos[1]);
						contenido2 = contenido2.replace("@PeriodoPlanilla", datos[6]);
						contenido2 = contenido2.replace("@PlanillaId", datos[5]);
						contenido2 = contenido2.replace("@TAdm", datos[11]);
						//for (var z = 0; z < lstAdmision.length; z++) {
						//	if (lstAdmision[z].split("¦")[0] == datos[2]) {
						//		contenido1 = contenido1.replace("@TAdm", lstAdmision[z].split("¦")[1]);
						//		contenido2 = contenido2.replace("@TAdm", lstAdmision[z].split("¦")[1]);
						//		break;
						//	}
						//}
						lista1.push(contenido1);
						lista2.push(contenido2);
						contenido1 = listaCuerpoCorreo[0];
						contenido2 = listaCuerpoCorreo[1];
						break;
					}
				}
			}
			break;
		case 2:
			for (var x = 0; x < MedicosRSeleccionados.length; x++) {
				for (var y = 0; y < listaMedicoR.length; y++) {
					datos = listaMedicoR[y].split("¦");
					if (((datos[4] * 1) == MedicosRSeleccionados[x][0]) && ((datos[5] * 1) == MedicosRSeleccionados[x][1])) {
						contenido1 = contenido1.replace("@DescripcionProceso", datos[9]);
						contenido1 = contenido1.replace("@Medico", datos[1]);
						contenido1 = contenido1.replace("@PeriodoPlanilla", datos[6]);
						contenido1 = contenido1.replace("@PlanillaId", datos[5]);
						contenido1 = contenido1.replace("@TAdm", datos[11]);

						contenido2 = contenido2.replace("@DescripcionProceso", datos[9]);
						contenido2 = contenido2.replace("@Medico", datos[1]);
						contenido2 = contenido2.replace("@PeriodoPlanilla", datos[6]);
						contenido2 = contenido2.replace("@PlanillaId", datos[5]);
						contenido2 = contenido2.replace("@TAdm", datos[11]);

						lista1.push(contenido1);
						lista2.push(contenido2);
						contenido1 = listaCuerpoCorreo[0];
						contenido2 = listaCuerpoCorreo[1];
						break;
					}
				}
			}

			break;
	}
	return lista1.join("¬") + "¯" + lista2.join("¬");
}

function formatearNumero(valor) {
	var valorFrm;
	if (!isNaN(valor * 1)) {
		var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		valorFrm = valor.toLocaleString("en-US", frmMoneda);
	} else {
		valorFrm = "0.00";
	}
	return valorFrm;
}

//function configurarSocket(v) {
//	socket = new WebSocket(v);
//	socket.onopen = function (event) {
//		console.log("conecto");
//	}
//	socket.onclose = function (event) {
//		console.log("Cerrando socket ");
//	}
//	socket.onerror = function (event) {
//		console.log("Error ");
//		socket = null;
//	}
//	socket.onmessage = function (event) {
//		var texto = document.getElementById('txtSalida');
//		if (event.data != "") {

//			texto.innerText = event.data;
//		}
//	}
//}