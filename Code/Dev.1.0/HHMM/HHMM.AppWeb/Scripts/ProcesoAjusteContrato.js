var listaPrincipal = [];
var matrizPrincipal = [];
var listaDetalle = [];
var idCompania = "";
var matrizDetalle = [];
var listaTipoDescuento;
var listaDetalle;
var listaTipoDocumento;
var cabecerasPrincipal = ["Descripción", "Estado", "Fecha Termino", "Usuario", "Total Registros", "Cantidad Ajustes", "Total Ajustes"];
var anchosPrincipal = [20, 10, 15, 15, 10, 10, 10, 10];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 6, 7];
var cabecerasDetalle = ["Código OA", "Fecha Atención", "IdOrdenAtención", "Linea", "Código", "Componente", "Monto Provisionado", "Monto Calculado", "Diferencia", "Médico", "Empresa", "Servicio", "Especialidad", "Observación"];
var anchosDetalle = [100, 130, 120, 80, 100, 300, 150, 150, 80, 300, 400, 300, 300, 400];
var matrizIndiceDetalle = [1, 2, 4, 5, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
var idContrato = -1;
var Campoeliminar = "";
var sucursalId;
var sucursal;
var idMedico = 0;
var idContratoDetalle = 0;
var mensajeValidacion = [];
var idEmpresa = 0;
var MedicoActual = "";
var matrizSeguridad = [], esPrincipal = true, matrizSeleccionados = [];

var rABS = true, use_worker = true, transferable = true, xlsData = "", MatrizWS = [], mtImponible = 0;
var XW = { rABS: 'Scripts/xlsxworker.js' }
var cabecerasV = ["Código Sucursal", "IdOrdenAtencion", "Línea", "Código OA", "Código Componente", "Periodo Producción", "Observación"];

var anchosV = [50, 50, 50, 50, 50, 50, 200];
var matrizIndiceV = [0, 1, 2, 3, 4, 5, 6];
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
var opcionCarga = 0;
var listaValidados = "";
var opcionCalculado = false;
var EsProvision = false;

var inicioEnvio = 0;
var registroEnviar = 10;
var nEnvios = 0;
var cEnvios = 0;
var datosCalculados = 0;
var matrizSeleccionadosCalcular = [];

window.onload = function () {
	if (document.getElementById("hdfAjusteContrato").value != "") {
		EsProvision = true;
	}
	matrizSeguridad = document.getElementById("hdfSeguridad").value.split("¯");
	sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
	sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
	var pos1 = window.location.href.indexOf("Proceso");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Proceso/ProcesoAjusteContratoListas?ss=" + ss;
	$.ajax(url, "post", llenarListas, sucursalId);
}
function llenarListas(r) {
	if (r != "") {
		var d = r.split("¯");
		var p = (d[0] != "" ? d[0].split("¬") : []);
		var s = (d[1] != "" ? d[1].split("¬") : []);

		llenarCombo(p, "cboPprov", "");
		llenarCombo(p, "cboPprov2", "");
		llenarCombo(s, "cboServicio", "");
	}
	configuracionInicial();
}
window.onresize = function () {
	var tipError = document.getElementById("tipError");
	if (tipError.style.display != "none") {
		tipError.style.display = "none";
	}
}

function configuracionInicial() {
	if (EsProvision) {
		cabecerasDetalle = ["Código OA", "Fecha Atención", "IdOdenAtención", "Linea", "Código", "Componente", "Médico", "Empresa", "Servicio", "Especialidad", "Observación"];
		anchosDetalle = [100, 130, 120, 80, 100, 300, 300, 400, 300, 300, 400];
		matrizIndiceDetalle = [1, 2, 4, 5, 3, 6, 10, 11, 12, 13, 14];
	}
	crearTabla("Principal|0");
	crearTabla("Detalle|1");
	configurarOrdenacion("Principal|0");
	configurarOrdenacion("Detalle|1");
	ConfiguracionControles();
	configurarFiltro();
	crearTabla2("divValidados");
	crearTabla2("divErrados");
	if (EsProvision) {
		EscogerDetalle(true);
		document.getElementById("txtDetalleDescripcion").value = document.getElementById("hdfAjusteContrato").value.split("¦")[1];
		document.getElementById("txtDetalleDescripcion").classList.add("lectura");
		document.getElementById("txtDetalleDescripcion").readOnly = true;
		var cocultar = document.getElementsByClassName("cocultar");
		for (var x = 0; x < cocultar.length; x++) {
			cocultar[x].style.display = "";
		}
		var docultar = document.getElementsByClassName("docultar");
		for (var x = 0; x < docultar.length; x++) {
			docultar[x].style.display = "none";
		}
		//document.getElementById("iclose").style.display = "";
		document.getElementById("hdfOpc").value = document.getElementById("hdfAjusteContrato").value.split("¦")[0];
		document.getElementById("divDetalleCalcular").style.display = "none";
		var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar2?ss=" + ss + "&id=" + document.getElementById("hdfOpc").value;
		$.ajax(url, "get", listarDetalle);
	}
	else {
		var cocultar = document.getElementsByClassName("cocultar");
		for (var x = 0; x < cocultar.length; x++) {
			cocultar[x].style.display = "none";
		}
		var docultar = document.getElementsByClassName("docultar");
		for (var x = 0; x < docultar.length; x++) {
			docultar[x].style.display = "";
		}
	}
}

function ConfiguracionControles() {
	var btnBusqueda = document.getElementById("btnBusqueda");
	btnBusqueda.onclick = function () {
		Buscar();
	}
	var btnBusquedaLimpiar = document.getElementById("btnBusquedaLimpiar");
	btnBusquedaLimpiar.onclick = function () {
		var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
		var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
		var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
		var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
		idMedico = "";
		idEmpresa = "";
		txtBusquedaMedico.value = "";
		txtBusquedaFechaInicio.value = "";
		txtBusquedaFechaFin.value = "";
		txtBusquedaEmpresa.value = "";
	}

	var spnDoctor = document.getElementsByClassName("spnDoctor");
	for (var x = 0; x < spnDoctor.length; x++) {
		spnDoctor[x].onclick = function () {
			var ifrMedico = document.getElementById("ifrMedico");
			if (ifrMedico.innerHTML == "") {
				ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
			}
			abrirPopup("PopupMedico");
		}
	}

	var spnEmpresaBusqueda = document.getElementsByClassName("spnEmpresa");
	spnEmpresaBusqueda[0].onclick = spnEmpresaBusqueda[1].onclick = function () {
		var ifrEmpresa = document.getElementById("ifrEmpresa");
		if (ifrEmpresa.innerHTML == "") {
			ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupEmpresa");
	}
	var spnComponente = document.getElementById("spnComponente");
	spnComponente.onclick = function () {
		var ifrComponente = document.getElementById("ifrComponente");
		if (ifrComponente.innerHTML == "") {
			ifrComponente.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/ComponentesLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupComponente");
	}

	var hdfMedico = document.getElementById("hdfMedico");
	hdfMedico.onchange = function () {
		if (this.value != "-1") {
			var hdfOpc = document.getElementById("hdfOpc").value;
			var datos = this.value.split("¦");
			if (esPrincipal) {
				idMedico = datos[0];
				var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
				txtBusquedaMedico.value = datos[1];
			} else {
				var txtDetalleMedico = document.getElementById("txtDetalleMedico");
				txtDetalleMedico.setAttribute("data-i", datos[0]);
				txtDetalleMedico.value = datos[1];

			}
		}
	}

	var hdfEmpresa = document.getElementById("hdfEmpresa");
	hdfEmpresa.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			if (esPrincipal) {
				idEmpresa = datos[0];
				var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
				txtBusquedaEmpresa.value = datos[1];
			} else {
				var txtDetalleEmpresa = document.getElementById("txtDetalleEmpresa");
				txtDetalleEmpresa.setAttribute("data-i", datos[0]);
				txtDetalleEmpresa.value = datos[1];
			}

		}
	}
	var hdfComponente = document.getElementById("hdfComponente");
	hdfComponente.onchange = function () {
		if (this.value != "-1") {
			var datos = this.value.split("¦");
			var txtDetalleComponente = document.getElementById("txtDetalleComponente");
			txtDetalleComponente.setAttribute("data-i", datos[0]);
			txtDetalleComponente.value = datos[1];
		}
	}


	var btnDetalleCancelar = document.getElementById("btnDetalleCancelar");
	btnDetalleCancelar.onclick = function () {
	    if (EsProvision) {
	        if (localStorage.length > 0) {
	            var matriz = localStorage.getItem("ProcesoProvision").split("¬");
	            if (matriz[matriz.length - 1] == "true") {
	                matriz[matriz.length - 1] = false;
	                localStorage.removeItem("ProcesoProvision");
	                localStorage.setItem("ProcesoProvision", matriz.join("¬"));
	            }
	        }
			redireccionprovision();
		} else {
			var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
			var divDoctor = document.getElementById("divDoctor");
			divBusquedaDoctor.style.display = "";
			divDoctor.style.display = "none";
			idMedico = MedicoActual;
			esPrincipal = true;
			document.getElementById("spnTituloDetalle").innerHTML = "Ajuste por Cambio de Contrato - Producción por OA";
		}
	}
	var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
	txtBusquedaFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtBusquedaFechaInicio.readOnly = false;

	var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
	txtBusquedaFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtBusquedaFechaFin.readOnly = false;


	var txtDetalleFechaInicio = document.getElementById("txtDetalleFechaInicio");
	txtDetalleFechaInicio.DatePickerX.init({
		mondayFirst: true
	});
	txtDetalleFechaInicio.readOnly = false;

	var txtDetalleFechaFin = document.getElementById("txtDetalleFechaFin");
	txtDetalleFechaFin.DatePickerX.init({
		mondayFirst: true
	});
	txtDetalleFechaFin.readOnly = false;



	var btngrabarEstado = document.getElementById("btngrabarEstado");
	btngrabarEstado.onclick = function () {
		var valor1 = matrizPrincipal[Campoeliminar][0];
		var valor2 = matrizPrincipal[Campoeliminar][2];
		anularPrincipal(valor1, valor2);
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

	var aExportarExcel = document.getElementById("aExportarExcel");
	aExportarExcel.onclick = function () {
		var nRegistros = matrizPrincipal.length;
		if (nRegistros > 0) {
			exportacion(true);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "Ajuste_Cambio_Contrato.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}

	var aExportarExcelDetalle = document.getElementById("aExportarExcelDetalle");
	aExportarExcelDetalle.onclick = function () {
		this.href = "#";
		var nRegistros = matrizDetalle.length;
		if (nRegistros > 0) {
			exportacion(false);
			var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
			this.download = "Detalle_Ajuste_Por_Cambio_Contrato.xls";
			this.href = window.URL.createObjectURL(formBlob);
		}
	}

	var btnDetalleBuscar = document.getElementById("btnDetalleBuscar"),
		btnDetalleImportar = document.getElementById("btnDetalleImportar"),
		btnDetalleCalcular = document.getElementById("btnDetalleCalcular"),
		btnDetalleTerminar = document.getElementById("btnDetalleTerminar"),
		btnDetalleGrabar = document.getElementById("btnDetalleGrabar"),
		spnFrmcarga = document.getElementById("spnFrmcarga");

	btnDetalleGrabar.onclick = function () {
		if (validarDetalle(true)) {
			if (matrizSeleccionados.length > 0) {
				var hdfOpc = document.getElementById("hdfOpc").value;
				var des = document.getElementById("txtDetalleDescripcion").value;
				var strData = "", url = "";
				if (EsProvision) {
					strData = hdfOpc + "¯" + obtenerIds(true);
					url = urlBase + "Proceso/ProcesoAjusteDetalleContratoGrabar?ss=" + ss + "&opc=2";
				} else {
					strData = hdfOpc + "¯" + sucursalId + "¯" + des + "¯" + obtenerIds(true);
					url = urlBase + "Proceso/ProcesoAjusteDetalleContratoGrabar?ss=" + ss + "&opc=1";
				}
				$.ajax(url, "post", mostrarDetalleGrabar, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			} else {
				mostraralerta("Seleccione por lo menos un registro");
			}
		}
	}

	btnDetalleCalcular.onclick = function () {
		opcionCalculado = true;
		document.getElementById("btnDetalleGrabar").click();
	}

	var btnGrabarDetalle = document.getElementById("btnGrabarDetalle");
	btnGrabarDetalle.onclick = function () {
		if (matrizValidados.length > 0) {
			var cadena = "";
			for (var i = 0; i < matrizValidados.length; i += 1) {
				cadena += matrizValidados[i].join("¦");
				cadena += "¬";
			}
			cadena = cadena.substring(0, cadena.length - 1);
			var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoImportarListar?ss=" + ss + "&tipo=" + (EsProvision ? "PROVISION" : "AJUSTE");
			$.ajax(url, "post", mostrarDetalleImportar, cadena);
		}
	}
	var fupArchivoDet = document.getElementById("fupArchivoDet");
	fupArchivoDet.onchange = function () {
		if (this.value != "") {
			var gifLoad = document.getElementById("gifLoad");
			gifLoad.style.display = "";
			if (this.files[0].name.indexOf("xls") > -1) {
				var file = this.files[0];
				var reader = new FileReader();
				reader.onerror = mostrarError;
				reader.onloadend = mostrarArchivo;
				reader.readAsBinaryString(file);
				this.value = null;
			}
			else {
				mostraralerta("El archivo tiene que ser Excel");
				this.value = "";
				crearMatriz2("divValidados", "");
				crearMatriz2("divErrados", "");
			}
		}
		else {
			this.value = "";
			crearMatriz2("divValidados", "");
			crearMatriz2("divErrados", "");
		}
	}
	btnDetalleImportar.onclick = function () {
		abrirPopup('PopupCargaDetalle');
		fupArchivoDet.value = "";
		crearMatriz2("divValidados", "");
		crearMatriz2("divErrados", "");
		matrizValidados = [];
		matrizErrados = [];
		mtImponible = 0;
		listaValidados = "";
		document.getElementById("btnGrabarDetalle").style.display = "none";
	}

	spnFrmcarga.onclick = function () {
		var frm = new FormData();
		frm.append("archivoCliente", "");
		frm.append("extension", "xlsx");
		var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=4&contratoid=0" + "&idCompania=" + idCompania;

		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.responseType = 'blob';
		xhr.onreadystatechange = function () {
			if (xhr.status == 200 && xhr.readyState == 4) {
				DescargarXlsAjuste(xhr.response);
			}
		}
		xhr.send(frm);
	}

	btnDetalleBuscar.onclick = function () {
		var doc = document,
			cboPprov = doc.getElementById("cboPprov").value,
			cboPprov2 = doc.getElementById("cboPprov2").value,
			txtDetalleCodigoOA = doc.getElementById("txtDetalleCodigoOA").value,
			txtDetalleMedico = doc.getElementById("txtDetalleMedico").getAttribute("data-i"),
			cboServicio = doc.getElementById("cboServicio").value,
			txtDetalleEmpresa = doc.getElementById("txtDetalleEmpresa").getAttribute("data-i"),
			txtDetalleFechaInicio = doc.getElementById("txtDetalleFechaInicio").value,
			txtDetalleFechaFin = doc.getElementById("txtDetalleFechaFin").value,
			txtDetalleComponente = doc.getElementById("txtDetalleComponente").getAttribute("data-i"),
			chkFiltrarTodos = doc.getElementById("chkFiltrarTodos"),
			chkTodos = doc.getElementById("chkTodos");
		chkFiltrarTodos.checked = false;
		chkTodos.checked = false;

		if (EsProvision) {
			if (txtDetalleCodigoOA == "" && txtDetalleMedico == "" && cboServicio == "" && txtDetalleEmpresa == "" && txtDetalleFechaInicio == "" && txtDetalleFechaFin == "" && txtDetalleComponente == "") {
				mostraralerta("Ingrese o seleccione por lo menos un criterio de búsqueda");
			} else {
				var strData = sucursalId + "¦" + txtDetalleCodigoOA + "¦";
				strData += (txtDetalleMedico == "" ? "0" : txtDetalleMedico) + "¦" + (txtDetalleEmpresa == "" ? "0" : txtDetalleEmpresa) + "¦";
				strData += (txtDetalleFechaInicio == "" ? "01/01/1900" : txtDetalleFechaInicio) + "¦" + (txtDetalleFechaFin == "" ? "01/01/1900" : txtDetalleFechaFin) + "¦";
				strData += (cboServicio == "" ? "0" : cboServicio) + "¦" + txtDetalleComponente + "¦";
				strData += (document.getElementById("hdfAjusteContrato").value.split("¦")[2]);
				var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar?ss=" + ss + "&opc=2";
				$.ajax(url, "post", mostrarDetalle, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			}
		} else {
			if (cboPprov == "" && cboPprov2 == "" && txtDetalleMedico == "" && cboServicio == "" && txtDetalleEmpresa == "" && txtDetalleFechaInicio == "" && txtDetalleFechaFin == "" && txtDetalleComponente == "") {
				mostraralerta("Ingrese o seleccione por lo menos un criterio de búsqueda");
			} else {
				var strData = sucursalId + "¦" + cboPprov + "¦" + cboPprov2 + "¦";
				strData += (txtDetalleMedico == "" ? "0" : txtDetalleMedico) + "¦" + (txtDetalleEmpresa == "" ? "0" : txtDetalleEmpresa) + "¦";
				strData += (txtDetalleFechaInicio == "" ? "01/01/1900" : txtDetalleFechaInicio) + "¦" + (txtDetalleFechaFin == "" ? "01/01/1900" : txtDetalleFechaFin) + "¦";
				strData += (cboServicio == "" ? "0" : cboServicio) + "¦" + txtDetalleComponente;

				var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar?ss=" + ss + "&opc=1";
				$.ajax(url, "post", mostrarDetalle, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			}
		}
	}
	var btnDetalleLimpiar = document.getElementById("btnDetalleLimpiar");
	btnDetalleLimpiar.onclick = function () {
		limpiarFormulario("Detalle", 8);
	}
	var chkTodos = document.getElementById("chkTodos");
	chkTodos.onclick = function () {
		if (this.checked) {
			if (matrizSeleccionados.length == 0) {
				matrizSeleccionados.push.apply(matrizSeleccionados, matrizDetalle);
			} else {
				var n = matrizDetalle.length, ns = matrizSeleccionados.length, id, ids, existe = false;
				for (var i = 0; i < n; i += 1) {
					id = matrizDetalle[i][0];
					existe = false
					for (var j = 0; j < ns; j += 1) {
						ids = matrizSeleccionados[j][0];
						if (ids == id) {
							existe = true;
							break;
						}
					}
					if (!existe) {
						matrizSeleccionados[matrizSeleccionados.length] = matrizDetalle[i];
					}
				}
			}
		} else {
			var n = matrizDetalle.length, ns = matrizSeleccionados.length, id, ids, existe = false;
			for (var i = 0; i < n; i += 1) {
				id = matrizDetalle[i][0];
				ns = matrizSeleccionados.length
				for (var j = 0; j < ns; j += 1) {
					ids = matrizSeleccionados[j][0];
					if (ids == id) {
						matrizSeleccionados.splice(j, 1);
						break;
					}
				}
			}
		}
		paginar(0, "Detalle|1");
		indiceActualBloque = 0;
		document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
	}

	var tbDetalle = document.getElementById("tbDetalle");
	tbDetalle.onclick = function (e) {
		var chk = e.target || e.srcElement;
		if (chk.type == "checkbox") {
			var data = chk.getAttribute("data-d").split("¦");
			if (chk.checked) {
				matrizSeleccionados[matrizSeleccionados.length] = data;
			} else {
				var pos = buscarSeleccionado(data[0]);
				if (pos > -1) {
					matrizSeleccionados.splice(pos, 1);
				}
			}
			document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
		}
	}

	var chkFiltrarTodos = document.getElementById("chkFiltrarTodos");
	chkFiltrarTodos.onclick = function () {
		if (this.checked) {
			listaDetalle = [];
			var n = matrizSeleccionados.length;
			for (var i = 0; i < n; i += 1) {
				listaDetalle.push(matrizSeleccionados[i].join("¦"));
			}
			matrizDetalle = [];
			matrizDetalle.push.apply(matrizDetalle, matrizSeleccionados);
			paginar(0, "Detalle|1");
			indiceActualBloque = 0;
			document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
		} else {
			document.getElementById("btnDetalleBuscar").click();
		}
	}

	var btnDetalleTerminar = document.getElementById("btnDetalleTerminar");
	btnDetalleTerminar.onclick = function () {
		abrirPopup('PopupEstadoTerminar');
	}

	var btngrabarEstadoTerminar = document.getElementById("btngrabarEstadoTerminar");
	btngrabarEstadoTerminar.onclick = function () {
		abrirPopup('PopupEstadoTerminar');
		var url = urlBase + "Proceso/ProcesoAjusteContratoActualizarEstado?ss=" + ss + "&id=" + document.getElementById("hdfOpc").value + "&est=T";
		$.ajax(url, "get", mostrarGrabar);
		document.getElementById("btnDetalleCancelar").click();
	}

}
function mostrarDetalleGrabar(r) {
	var btnDetalleGrabar = document.getElementById("btnDetalleGrabar");
	btnDetalleGrabar.innerHTML = "Grabar";
	btnDetalleGrabar.onclick = function () {
		if (validarDetalle(true)) {
			if (matrizSeleccionados.length > 0) {
				var strData = "", url = "";
				var hdfOpc = document.getElementById("hdfOpc").value;
				var des = document.getElementById("txtDetalleDescripcion").value;
				if (EsProvision) {
					strData = hdfOpc + "¯" + obtenerIds(true);
					url = urlBase + "Proceso/ProcesoAjusteDetalleContratoGrabar?ss=" + ss + "&opc=2";
				} else {
					strData = hdfOpc + "¯" + sucursalId + "¯" + des + "¯" + obtenerIds(true);
					url = urlBase + "Proceso/ProcesoAjusteDetalleContratoGrabar?ss=" + ss + "&opc=1";
				}
				$.ajax(url, "post", mostrarDetalleGrabar, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			} else {
				mostraralerta("Seleccione por lo menos un registro");
			}
		}
	}
	if (opcionCalculado) {
		var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
		btnDetalleCalcular.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
		btnDetalleCalcular.onclick = null;
		matrizSeleccionadosCalcular = [];
		matrizSeleccionadosCalcular = unicasVariables();
		nEnvios = Math.floor(matrizSeleccionadosCalcular.length / registroEnviar);
		if (matrizSeleccionadosCalcular.length % registroEnviar > 0) nEnvios++;
		inicioEnvio = 0;
		var lista = obtenerIds(false);
		var hdfOpc = document.getElementById("hdfOpc");
		hdfOpc.value = r;
		datosCalculados = 0;
		var url = urlBase + "Proceso/ProcesoAjusteContratoCalcular?ss=" + ss + "&id=" + hdfOpc.value + "&tt=" + matrizSeleccionadosCalcular.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
		$.ajax(url, "post", mostrarDetalleCalcular, lista);
	} else {
		opcionCalculado = false;
		if (EsProvision) {
			if (r != "") {
				matrizSeleccionados = [];
				//document.getElementById("hdfOpc").value = document.getElementById("hdfAjusteContrato").value.split("¦")[0];
				//var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar2?ss=" + ss + "&id=" + document.getElementById("hdfOpc").value;
				//$.ajax(url, "get", listarDetalle);
				mostraralerta("Se grabó el registro correctamente");
				redireccionprovision();
			} else {
				mostraralerta("Error en proceso");
			}
		} else {
			document.getElementById("btnDetalleCancelar").click();
			if (r != "") {
				mostraralerta("Se grabó el registro correctamente");
				Buscar();
			} else {
				mostraralerta("Error en proceso");
			}
		}

	}
}


function mostrarDetalleCalcular(rpta) {
	var valorrpta = rpta.split("¬");
	if (rpta.indexOf("NEXT") > -1) {
		var dato = valorrpta[2] * 1;
		datosCalculados = datosCalculados + dato;
		cEnvios++;
		inicioEnvio = inicioEnvio + registroEnviar;
		var porcentaje = Math.floor(((datosCalculados * 1) * 100) / matrizSeleccionadosCalcular.length);
		if (porcentaje == 100) {
			mostraralerta("Se ha calculado el " + porcentaje + "% de registros");
		} else {
			mostraralerta("Se ha calculado el " + porcentaje + "% de registros", true);
		}
	}
	if (cEnvios < nEnvios) {
		nEnvios = Math.floor(matrizSeleccionadosCalcular.length / registroEnviar);
		if (matrizSeleccionadosCalcular.length % registroEnviar > 0) nEnvios++;
		var lista = obtenerIds(false);
		var hdfOpc = document.getElementById("hdfOpc").value;
		var url = urlBase + "Proceso/ProcesoAjusteContratoCalcular?ss=" + ss + "&id=" + hdfOpc + "&tt=" + matrizSeleccionadosCalcular.length + "&cc=" + inicioEnvio + "&su=" + sucursalId;
		$.ajax(url, "post", mostrarDetalleCalcular, lista);
	} else {
		var hdfOpc = document.getElementById("hdfOpc").value;
		var btnDetalleCalcular = document.getElementById("btnDetalleCalcular");
		btnDetalleCalcular.innerHTML = "Calcular";
		btnDetalleCalcular.onclick = function () {
			opcionCalculado = true;
			document.getElementById("btnDetalleGrabar").click();
		}
		//var datos = rpta.split("¦");
		//mostraralerta(datos[0]);
		var estado = valorrpta[1].split("|")[1];
		opcionCalculado = false;
		document.getElementById("btnBusqueda").click();
		EscogerDetalle(false, hdfOpc + "¦" + document.getElementById("txtDetalleDescripcion").value, estado);
		matrizSeleccionadosCalcular = [];
		inicioEnvio = 0;
	}
}

function obtenerIds(opcion) {
	var n = matrizSeleccionados.length, ids = "";
	if (opcion) {
		for (var i = 0; i < n; i += 1) {
			ids += matrizSeleccionados[i][0];
			ids += "¦";
			ids += matrizSeleccionados[i][15];
			ids += "¬";
		}
	} else {
		var nRegistros = matrizSeleccionadosCalcular.length;
		var fin = inicioEnvio + registroEnviar;
		for (var i = inicioEnvio; i < fin; i++) {
			if (i < nRegistros) {
				ids += matrizSeleccionadosCalcular[i];
				ids += "¬";
			}
		}
	}
	ids = ids.substring(0, ids.length - 1);
	return ids;
}
function mostrarDetalleImportar(r) {
	if (EsProvision) {
		abrirPopup('PopupCargaDetalle');
		if (r != "") {
			var dt = r.split("¯"), n = dt.length, id, ids, existe = false, ns = matrizSeleccionados.length;

			for (var i = 0; i < n; i += 1) {
				id = dt[i].split("¦");
				existe = false
				ns = matrizSeleccionados.length;
				for (var j = 0; j < ns; j += 1) {
					ids = matrizSeleccionados[j][0];
					if (ids == id[0]) {
						existe = true;
						break;
					}
				}
				if (!existe) {
					matrizSeleccionados[matrizSeleccionados.length] = id;
				}
			}
			//listaDetalle = r.split("¯");
			//crearMatriz("Detalle|1");
			//matrizSeleccionados.push.apply(matrizSeleccionados, matrizDetalle);
			matrizDetalle = [];
			matrizDetalle = matrizSeleccionados.slice(0);
			document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
			paginar(0, "Detalle|1");
			indiceActualBloque = 0;
		} else {

		}
	}
	else {

		abrirPopup('PopupCargaDetalle');
		if (r != "") {
			var dt = r.split("¯"), n = dt.length, id, ids, existe = false, ns = matrizSeleccionados.length;

			for (var i = 0; i < n; i += 1) {
				id = dt[i].split("¦");
				existe = false
				ns = matrizSeleccionados.length;
				for (var j = 0; j < ns; j += 1) {
					ids = matrizSeleccionados[j][0];
					if (ids == id[0]) {
						existe = true;
						break;
					}
				}
				if (!existe) {
					matrizSeleccionados[matrizSeleccionados.length] = id;
				}
			}
			matrizDetalle = [];
			matrizDetalle = matrizSeleccionados.slice(0);
			document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
			paginar(0, "Detalle|1");
			indiceActualBloque = 0;
		} else {

		}
	}
}
function DescargarXlsAjuste(rpta) {
	if (rpta.size > 0) {
		var blob = new Blob([rpta], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		});
		var a = document.createElement("a");
		a.href = URL.createObjectURL(blob);
		a.download = "Formato_Carga_OA.xlsx";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		delete a;
	}
	else {
		mostraralerta("No se ha encontrado el archivo");
	}
}
function buscarSeleccionado(ids) {
	var ns = matrizSeleccionados.length, id, pos = -1;
	for (var i = 0; i < ns; i += 1) {
		id = matrizSeleccionados[i][0];
		if (ids == id) {
			pos = i;
			break;
		}
	}
	return pos;
}

function mostrarDetalle(r) {
	var btnDetalleBuscar = document.getElementById("btnDetalleBuscar");
	btnDetalleBuscar.innerHTML = "Buscar";
	btnDetalleBuscar.onclick = function () {
		var doc = document,
					cboPprov = doc.getElementById("cboPprov").value,
					cboPprov2 = doc.getElementById("cboPprov2").value,
					txtDetalleCodigoOA = doc.getElementById("txtDetalleCodigoOA").value,
					txtDetalleMedico = doc.getElementById("txtDetalleMedico").getAttribute("data-i"),
					cboServicio = doc.getElementById("cboServicio").value,
					txtDetalleEmpresa = doc.getElementById("txtDetalleEmpresa").getAttribute("data-i"),
					txtDetalleFechaInicio = doc.getElementById("txtDetalleFechaInicio").value,
					txtDetalleFechaFin = doc.getElementById("txtDetalleFechaFin").value,
					txtDetalleComponente = doc.getElementById("txtDetalleComponente").getAttribute("data-i"),
					chkFiltrarTodos = doc.getElementById("chkFiltrarTodos"),
					chkTodos = doc.getElementById("chkTodos");
		chkFiltrarTodos.checked = false;
		chkTodos.checked = false;

		if (EsProvision) {
			if (txtDetalleCodigoOA == "" && txtDetalleMedico == "" && cboServicio == "" && txtDetalleEmpresa == "" && txtDetalleFechaInicio == "" && txtDetalleFechaFin == "" && txtDetalleComponente == "") {
				mostraralerta("Ingrese o seleccione por lo menos un criterio de búsqueda");
			} else {
				var strData = sucursalId + "¦" + txtDetalleCodigoOA + "¦";
				strData += (txtDetalleMedico == "" ? "0" : txtDetalleMedico) + "¦" + (txtDetalleEmpresa == "" ? "0" : txtDetalleEmpresa) + "¦";
				strData += (txtDetalleFechaInicio == "" ? "01/01/1900" : txtDetalleFechaInicio) + "¦" + (txtDetalleFechaFin == "" ? "01/01/1900" : txtDetalleFechaFin) + "¦";
				strData += (cboServicio == "" ? "0" : cboServicio) + "¦" + txtDetalleComponente + "¦";
				strData += (document.getElementById("hdfAjusteContrato").value.split("¦")[2]);

				var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar?ss=" + ss + "&opc=2";
				$.ajax(url, "post", mostrarDetalle, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			}
		} else {
			if (cboPprov == "" && cboPprov2 == "" && txtDetalleMedico == "" && cboServicio == "" && txtDetalleEmpresa == "" && txtDetalleFechaInicio == "" && txtDetalleFechaFin == "" && txtDetalleComponente == "") {
				mostraralerta("Ingrese o seleccione por lo menos un criterio de búsqueda");
			} else {
				var strData = sucursalId + "¦" + cboPprov + "¦" + cboPprov2 + "¦";
				strData += (txtDetalleMedico == "" ? "0" : txtDetalleMedico) + "¦" + (txtDetalleEmpresa == "" ? "0" : txtDetalleEmpresa) + "¦";
				strData += (txtDetalleFechaInicio == "" ? "01/01/1900" : txtDetalleFechaInicio) + "¦" + (txtDetalleFechaFin == "" ? "01/01/1900" : txtDetalleFechaFin) + "¦";
				strData += (cboServicio == "" ? "0" : cboServicio) + "¦" + txtDetalleComponente;

				var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoListar?ss=" + ss + "&opc=1";
				$.ajax(url, "post", mostrarDetalle, strData);
				this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
				this.onclick = null;
			}
		}
	}

	if (r != "") {
		var dt = r.split("¯");
		listaDetalle = dt;
	} else {
		listaDetalle = [];
	}

	crearMatriz("Detalle|1");
	paginar(0, "Detalle|1");
	indiceActualBloque = 0;

}

function mostrarGrabar(rpta) {
	if (rpta != "") {
		mostraralerta("Se ha actualizado el estado de un registro");
		Buscar();
	} else {
		mostraralerta("Error al procesar");
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

function Buscar() {
	var divPrincipal = document.getElementById("divPrincipal");
	divPrincipal.style.display = "";
	var url = urlBase + "Proceso/ProcesoAjusteContratoListar?ss=" + ss;
	var txtBusquedaMedico = idMedico;
	var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio").value;
	var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin").value;
	var txtBusquedaEmpresa = idEmpresa;
	var strDatos = sucursalId + "¦" + (txtBusquedaMedico == "" ? "0" : txtBusquedaMedico) + "¦" + (txtBusquedaEmpresa == "" ? 0 : txtBusquedaEmpresa) + "¦" + (txtBusquedaFechaInicio == "" ? "01/01/1900" : txtBusquedaFechaInicio) + "¦" + (txtBusquedaFechaFin == "" ? "01/01/1900" : txtBusquedaFechaFin);
	$.ajax(url, "post", listarTodo, strDatos);
}

function listarTodo(rpta) {
	if (rpta != "") {
		listaPrincipal = rpta.split("¯");
		listarPrincipal();
	}
	else {
		matrizPrincipal = [];
		var contenido = "";
		var nCabeceras = cabecerasPrincipal.length;
		contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
		document.getElementById("tbPrincipal").innerHTML = contenido;
		document.getElementById("tdPaginasPrincipal").innerHTML = "";
	}
}

function listarPrincipal(irUltimaPagina) {
	crearMatriz("Principal|0");
	if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4, "Principal|0");
	else {
		paginar(0, "Principal|0");
		indiceActualBloque = 0;
	}
}

function paginar(indicePagina, elemento) {

	var identificador = elemento.split("|");
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
	var nRegistros = window["matriz" + identificador[0]].length;
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
	mostrarMatriz(indicePagina, elemento);
}

function crearTabla(elemento) {
	var identificador = elemento.split("|");
	var cabeceras = window["cabeceras" + identificador[0]];
	var nCampos = cabeceras.length;
	var contenido = "";
	switch (identificador[1]) {
		case "0":
			contenido = "<table class='tabla-general' >";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons fa-plus'  onclick='EscogerDetalle(true);'></span></th>";
			break;
		case "1":
			contenido = "<table class='tabla-general' style='width:1500px;table-layout:fixed'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			contenido += "<th style='width:50px;vertical-align: middle;text-align: center;'>";
			contenido += "<input type='checkbox' id='chkTodos'>";
			contenido += "</th>";
			break;
	}

	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += window["anchos" + identificador[0]][j];
		if (identificador[1] == "0") contenido += "%'><span id='spn";
		else contenido += "px'><span id='spn";
		contenido += j.toString();

		switch (identificador[1]) {
			case "0":
				contenido += "' class='Enlace";
				contenido += identificador[0];
				contenido += "-";
				contenido += identificador[1];
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador[0]][j];
				contenido += "'>";
				break;
			default:
				contenido += "' class='Enlace";
				contenido += identificador[0];
				contenido += "-";
				contenido += identificador[1];
				contenido += "' data-orden='";
				contenido += window["matrizIndice" + identificador[0]][j];
				contenido += "'>";

				break;
		}
		contenido += window["cabeceras" + identificador[0]][j];
		contenido += "</span><br/>";
		if (identificador[1] == "0") {
			if (j == 1) {
				contenido += "<select class='Combo";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "'><option value=''>TODOS</option><option value='P'>PENDIENTE</option><option value='C'>CALCULADO</option><option value='T'>TERMINADO</option><option value='I'>INACTIVO</option></select>";
			} else {
				contenido += "<input type='text' class='Texto";
				contenido += identificador[0];
				contenido += "' name='cabecera";
				contenido += identificador[0];
				contenido += "' style='width:90%'>";
			}
		} else {
			switch (j) {
				//case (nCampos - 1):
				//	contenido += "<select class='Combo";
				//	contenido += identificador[0];
				//	contenido += "' name='cabecera";
				//	contenido += identificador[0];
				//	contenido += "' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
				//	break;
				default:
					contenido += "<input type='text' class='Texto";
					contenido += identificador[0];
					contenido += "' name='cabecera";
					contenido += identificador[0];
					contenido += "' style='width:90%'>";
					break;
			}

		}
		contenido += "</th>";
	}
	if (identificador[1] != "1") {
		contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
		//if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
		contenido += "<a class='Icons fa-file-excel-o' id='aExportarExcel'></a>";
		//}
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
	switch (identificador[1]) {
		case "0":
			contenido += (nCampos + 1).toString();
			break;
		default:
			contenido += (nCampos + 2).toString();
			break;
	}
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("div" + identificador[0]).innerHTML = contenido;
}

function crearMatriz(elemento) {
	var identificador = elemento.split("|");
	var nRegistros = window["lista" + identificador[0]].length;
	var nCampos;
	var campos;
	var x = 0;
	if (window["lista" + identificador[0]][0] != "") {
		window["matriz" + identificador[0]] = [];
		for (i = 0; i < nRegistros; i++) {
			campos = window["lista" + identificador[0]][i].split("¦");
			window["matriz" + identificador[0]][x] = [];
			nCampos = campos.length;
			switch (identificador[1]) {
				case "0":
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j])) {
							if (j == 3) {
								window["matriz" + identificador[0]][x][j] = (campos[j].indexOf("1900") > -1 ? "" : campos[j]);
							} else {
								window["matriz" + identificador[0]][x][j] = campos[j];
							}
						}
						else {
							window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
					}
					break;
				default:
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 10 || j == 1) window["matriz" + identificador[0]][x][j] = campos[j];
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
	indiceActualPagina = indicePagina;
	var identificador = elemento.split("|");
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
	var contenido = "";
	var n = window["matriz" + identificador[0]].length;
	var camposSecuencia = "";
	var esBloque = (indicePagina < 0);
	if (n > 0) {
		var nCampos = window["matriz" + identificador[0]][0].length;
		var inicio = indicePagina * registrosPagina;
		var fin = inicio + registrosPagina;
		switch (identificador[1]) {
			case "0":
				for (var i = inicio; i < fin; i++) {
					if (i < n) {
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='text-align:center'>";
						//if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
						contenido += "<span class='Icons fa-edit' onclick='EscogerDetalle(false,\"" + (window["matriz" + identificador[0]][i][0] + "¦" + window["matriz" + identificador[0]][i][1]) + "\",\"" + window["matriz" + identificador[0]][i][2] + "\");";
						contenido += "'></span>";
						//}
						contenido += "</td>";
						for (var j = 0; j < nCampos; j++) {
							if (j != 0) {
								contenido += "<td";
								switch (j) {
									case 2:
										contenido += ">";
										switch (window["matriz" + identificador[0]][i][j]) {
											case "P":
												contenido += "PENDIENTE";
												break;
											case "C":
												contenido += "CALCULADO";
												break;
											case "T":
												contenido += "TERMINADO";
												break;
											case "I":
												contenido += "INACTIVO";
												break;
										}
										break;
									case 5:
									case 6:
										contenido += " style='text-align:right;'>";
										contenido += window["matriz" + identificador[0]][i][j];
										break;
									case 7:
										contenido += " style='text-align:right;'>";
										contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador[0]][i][j];
										break;
								}
								contenido += "</td>";
							}
						}
						contenido += "<td style='text-align:center'>";
						if (window["matriz" + identificador[0]][i][2] != "T") {
							contenido += "<span class='Icons ";
							contenido += (window["matriz" + identificador[0]][i][2] != "I" ? "fa-trash-o" : "fa-check");
							contenido += "' onclick='abrirPopup(";
							contenido += '"PopupEstado"';
							contenido += ");Campoeliminar=";
							contenido += i;
							contenido += "'";
							contenido += "></span>";
						}
						contenido += "</td>";
						contenido += "</tr>";
					}
					else break;
				}
				break;
			case "1":
				var valor;
				nCampos = window["cabeceras" + identificador[0]].length;
				for (var i = inicio; i < fin; i++) {
					camposSecuencia = "";
					if (i < n) {
						camposSecuencia += window["matriz" + identificador[0]][i][0];
						contenido += "<tr class='FilaDatos'>";
						contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'>";

						contenido += "<input type='checkbox' " + (buscarSeleccionado(window["matriz" + identificador[0]][i][0]) > -1 ? "checked" : "") + " data-d='" + (window["matriz" + identificador[0]][i].join("¦")) + "'/>";

						contenido += "</td>";
						if (EsProvision) {
							for (var j = 0; j < nCampos; j++) {
									contenido += "<td";
									contenido += ">";
									contenido += window["matriz" + identificador[0]][i][matrizIndiceDetalle[j]];
									contenido += "</td>";
							}
						} else {
							for (var j = 0; j < nCampos; j++) {
								contenido += "<td";
								switch (j) {
									case 6:
									case 7:
									case 8:																		
										contenido += " style='text-align:right;'>"
										contenido += (window["matriz" + identificador[0]][i][matrizIndiceDetalle[j]] * 1).toFixed(2);
										break;
									case 2:
									case 3:	
										contenido += " style='text-align:right;'>"
										contenido += (window["matriz" + identificador[0]][i][matrizIndiceDetalle[j]] * 1);
										break;
									default:
										contenido += ">";
										contenido += window["matriz" + identificador[0]][i][matrizIndiceDetalle[j]];
										break;
								}
								contenido += "</td>";

							}
						}
						//contenido += "<td style='text-align:center'>";
						//if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
						//	contenido += "<span class='Icons ";
						//	contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" ? "fa-trash-o" : "fa-check");
						//	contenido += "' onclick='abrirPopup(";
						//	contenido += '"PopupEstado"';
						//	contenido += ");Campoeliminar=";
						//	contenido += i;
						//	contenido += "'";
						//	contenido += "></span>";
						//}
						//contenido += "</td>";
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
		contenido += (nCabeceras + 2).toString();
		contenido += "'>No hay datos</td></tr>";
	}
	document.getElementById("tb" + identificador[0]).innerHTML = contenido;
	crearPaginas(elemento);
	if (esBloque) {
		crearPaginas(elemento);
	}
}

function anularPrincipal(id, estado) {
	var url = urlBase + "Proceso/ProcesoAjusteContratoActualizarEstado?ss=" + ss + "&id=" + id + "&est=" + (estado != "I" ? "I" : "P");
	$.ajax(url, "get", mostrarGrabar);
	abrirPopup('PopupEstado');
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
			mostrarMatriz(indiceActualPagina, valor);
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
	var valX;
	var valY;
	if (orden[1] == "Principal") {
		valX = ((indice == 3 || indice == 4) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
		valY = ((indice == 3 || indice == 4) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
	}
	else {
		valX = ((indice == 6 || indice == 7) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
		valY = ((indice == 6 || indice == 7) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
	}
	return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function fechaUTC(fecha) {
	var fechaArray = fecha.trim().split('/');
	return new Date(fechaArray[2], (fechaArray[1] - 1), fechaArray[0]);
	//return new Date(fechaArray[2],fechaArray[0] - 1, fechaArray[1]);
}

function configurarFiltro() {
	var textos = document.getElementsByClassName("TextoPrincipal");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Principal|0");
		}
	}
	var combos = document.getElementsByClassName("ComboPrincipal");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Principal|0");
		}
	}
	var textos = document.getElementsByClassName("TextoDetalle");
	var ntextos = textos.length;
	var texto;
	for (i = 0; i < ntextos; i++) {
		texto = textos[i];
		texto.onkeyup = function (e) {
			filtrar("Detalle|1");
			document.getElementById("chkTodos").checked = false;
		}
	}
	var combos = document.getElementsByClassName("ComboDetalle");
	var nCombos = combos.length;
	var combo;
	for (i = 0; i < nCombos; i++) {
		combo = combos[i];
		combo.onchange = function (e) {
			filtrar("Detalle|1");
			document.getElementById("chkTodos").checked = false;
		}
	}
}

function filtrar(elemento) {
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
	var variableContador = (identificador[0] == "Principal" ? 1 : 0);
	for (var i = 0; i < nRegistros; i++) {
		campos = window["lista" + identificador[0]][i].split("¦");
		campoFiltrado = [];
		nCampos = campos.length;
		for (var k = variableContador; k < nFiltrados; k++) {
			campoFiltrado.push(campos[window["matrizIndice" + identificador[0]][k]]);
		}
		for (var j = 0 ; j < nCabeceras; j += 1) {
			exito = true;
			cabecera = cabeceras[j];
			if (cabecera.className == ("Texto" + identificador[0])) exito = exito && (campoFiltrado[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
			else exito = exito && (cabecera.value == "" || campoFiltrado[j] == cabecera.value);
			if (!exito) break;
		}

		if (exito) {
			window["matriz" + identificador[0]][x] = [];
			switch (identificador[1]) {
				case "0":
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j])) {
							if (j == 3) {
								window["matriz" + identificador[0]][x][j] = (campos[j].indexOf("1900") > -1 ? "" : campos[j]);
							} else {
								window["matriz" + identificador[0]][x][j] = campos[j];
							}
						}
						else {
							window["matriz" + identificador[0]][x][j] = campos[j] * 1;
						}
					}
					x++;
					break;
				default:
					for (j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j] == "" || j == 8 || j == 1) window["matriz" + identificador[0]][x][j] = campos[j];
						else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
					}
					x++;
					break;
			}

		}
	}
	indiceActualBloque = 0;
	paginar(0, elemento);
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

function crearPaginas(elemento) {
	var identificador = elemento.split("|");
	if (identificador[0] == "Principal") registrosPagina = 10;
	else registrosPagina = 5;
	var nRegistros = window["matriz" + identificador[0]].length;
	var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
	if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
	var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
	if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
	var contenido = "";
	var inicio = indiceActualBloque * paginasBloque;
	var fin = inicio + paginasBloque;
	if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
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
	if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
		contenido += "<span class='pagina' onclick='paginar(-3,\"" + elemento + "\");' title='Ir al siguiente grupo de páginas'>&gt;</span>";
		contenido += "<span class='pagina' onclick='paginar(-4,\"" + elemento + "\");' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
	}
	if (nRegistros <= registrosPagina) {
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = "";
	}
	else {
		document.getElementById("tdPaginas" + identificador[0]).innerHTML = contenido;
		seleccionarPaginaActual(identificador[0]);
	}
}

function seleccionarPaginaActual(dato) {
	var aPagina = document.getElementById("a" + dato + indiceActualPagina);
	if (aPagina != null) {
		aPagina.className += " seleccionado";
	}
}


function EscogerDetalle(valor, id, estado) {
	matrizDetalle = [];
	matrizSeleccionados = [];
	var spnTituloDetalle = document.getElementById("spnTituloDetalle");
	var spnHistorial = document.getElementById("spnHistorial");
	var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
	var divDoctor = document.getElementById("divDoctor");
	var hdfOpc = document.getElementById("hdfOpc");
	var spnDoctor = document.getElementsByClassName("spnDoctor");
	esPrincipal = false;
	limpiarFormulario("Detalle");
	divBusquedaDoctor.style.display = "none";
	divDoctor.style.display = "";
	if (valor) {
		document.getElementById("divDetalleCalcular").style.display = "none";
		hdfOpc.value = "0";
		document.getElementById("spnCantidad").innerHTML = "";
		if (EsProvision) {
			spnTituloDetalle.innerHTML = "Detalle Proceso Provisión";
		}
		else {
			spnTituloDetalle.innerHTML = "Nuevo&nbsp;Ajuste por Cambio de Contrato - Producción por OA";
		}
		spnHistorial.style.display = "none";
		listaDetalle = [];
		matrizDetalle = [];
		paginar(0, "Detalle|1");
		var ocultar = document.getElementsByClassName("xocultar");
		for (var x = 0; x < ocultar.length; x++) {
			ocultar[x].style.display = "";
			//if (x == ocultar.length - 1) {
			//	if (EsProvision) {
			//		ocultar[x].style.display = "none";
			//	}
			//}
		}
		var btnDetalleTerminar = document.getElementById("btnDetalleTerminar");
		btnDetalleTerminar.parentElement.style.display = "none";
		document.getElementById("btnDetalleCancelar").innerHTML = "Cancelar";

	}
	else {
		document.getElementById("divDetalleCalcular").style.display = "";
		spnTituloDetalle.innerHTML = "Editar&nbsp;Ajuste por Cambio de Contrato - Producción por OA";
		spnHistorial.style.display = "";
		var dt = id.split("¦");
		hdfOpc.value = dt[0];
		url = urlBase + "Proceso/ProcesoAjusteDetalleContratoPorId/?ss=" + ss + "&id=" + dt[0];
		$.ajax(url, "get", listarDetalle);
		document.getElementById("txtDetalleDescripcion").value = dt[1];
		document.getElementById("hdfCd").value = dt[0];
		var btnDetalleTerminar = document.getElementById("btnDetalleTerminar");
		var ocultar = document.getElementsByClassName("xocultar");
		if (estado == "T") {
			for (var x = 0; x < ocultar.length; x++) {
				ocultar[x].style.display = "none";
				//if (x == ocultar.length - 1) {
				//	ocultar[x].style.display = "";
				//	if (EsProvision) {
				//		ocultar[x].style.display = "none";
				//	}
				//}
			}
			document.getElementById("btnDetalleCancelar").innerHTML = "Regresar";
		}
		else {
			for (var x = 0; x < ocultar.length; x++) {
				ocultar[x].style.display = "";
				if (x == ocultar.length - 1) {
					if (EsProvision) {
						ocultar[x].style.display = "none";
					}
				}
			}
			if (estado == "C") btnDetalleTerminar.parentElement.style.display = "";
			else btnDetalleTerminar.parentElement.style.display = "none";
			document.getElementById("btnDetalleCancelar").innerHTML = "Cancelar";
		}
	}

}
function listarDetalle(r) {
	if (r != "") {
		listaDetalle = r.split("¯");
		crearMatriz("Detalle|1");
		matrizSeleccionados.push.apply(matrizSeleccionados, matrizDetalle);
		document.getElementById("spnCantidad").innerHTML = matrizSeleccionados.length;
		paginar(0, "Detalle|1");
		indiceActualBloque = 0;

	}
}

function limpiarFormulario(opcion, id) {
	if (opcion == undefined) {
		opcion = "";
	}
	listaChecks = [];
	var limpiar
	if (opcion == 0) limpiar = document.getElementsByName("limpiar");
	else limpiar = document.getElementsByName("limpiar" + opcion);
	var nRegistros = limpiar.length;
	for (var y = 0; y < nRegistros; y++) {
		if (limpiar[y].type == "checkbox") {
			limpiar[y].checked = false;
		} else {
			if (limpiar[y].nodeName == "SELECT") {
				limpiar[y].selectedIndex = "0";
			}
			else {
				if (id == y) { continue; }
				if (limpiar[y].id == "txtDetalleDescripcion") {
					if (!EsProvision) {
						limpiar[y].value = "";
					}
				} else {
					limpiar[y].value = "";
				}
				if (limpiar[y].getAttribute("data-i")) {
					limpiar[y].setAttribute("data-i", "");
				}
			}
		}
	}
}

function formatearfecha(fecha) {
	var campos = fecha.split("/");
	var anio = campos[2];
	var mes = campos[1];
	mes = mes.length > 1 ? mes : '0' + mes;
	var dia = campos[0]
	dia = dia.length > 1 ? dia : '0' + dia;
	return dia + '/' + mes + '/' + anio;
}

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
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
	if (nombreCombo == "ddlDescuento") {
		var valor = document.getElementById("ddlTipoDescuento").value;
		if (lista != "") {
			for (var x = 0; x < n; x++) {
				campos = lista[x].split("¦");
				if (campos[2] == valor) {
					contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
				}
			}
		}
	}
	else {
		if (lista != "") {
			for (var x = 0; x < n; x++) {
				campos = lista[x].split("¦");
				contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
			}
		}
	}
	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
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

		if (Texto.id.toLowerCase().indexOf("inicio") > -1) {
			var txtFechaFin = document.getElementById("txtDescuentoFechaFin");
			var Inicio = fechaUTC(Texto.value);
			var Fin = fechaUTC(txtFechaFin.value);
			if (Inicio > Fin) {
				return 'La fecha de inicio no puede ser mayor a la de fin';
			}
		}
		else {
			var txtFechaInicio = document.getElementById("txtDescuentoFechaInicio");
			var Fin = fechaUTC(Texto.value);
			var Inicio = fechaUTC(txtFechaInicio.value);
			if (Fin < Inicio) {
				return 'La fecha de fin no puede ser menor a la de inicio';
			}
		}
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
			if (Texto.value.match(/[,;]+/) != null) {
				return Mensaje + ' No debe contener , o ;';
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

function validarDetalle(detalle) {

	var txtDetalleDescripcion = document.getElementById("txtDetalleDescripcion");

	mensajeValidacion = [];
	var validar = document.getElementsByClassName("validar");
	for (var x = 0; x < validar.length; x++) {
		if (validar[x].className.indexOf("error") > -1) {
			validar[x].className = validar[x].className.split("error").join("").trim();
		}
	}
	var msg = "";
	if (detalle) {
		msg = validarTexto(txtDetalleDescripcion.id, "Descripción", true);
		if (msg != "") {
			mensajeValidacion[txtDetalleDescripcion.getAttribute("data-secuencia")] = msg;
			txtDetalleDescripcion.className += " error";
		}
	} else {

	}
	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
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

function crearCabeceraExportar(opcion) {
	var cabecera = "<html><head><meta charset='utf-8'/></head><table><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
	if (opcion) {
		cabecera += "<td style='width: 300px'>Descripción</td>";
		cabecera += "<td style='width: 150px'>Estado</td>";
		cabecera += "<td style='width: 150px'>Fecha Termino</td>";
		cabecera += "<td style='width: 150px'>Usuario</td>";
		cabecera += "<td style='width: 150px'>Total Registros</td>";
		cabecera += "<td style='width: 150px'>Cantidad Ajustes</td>";
		cabecera += "<td style='width: 150px'>total Ajustes</td>";
	} else {
		cabecera += "<td style='width: 100px'>Código OA</td>";
		cabecera += "<td style='width: 130px'>Fecha Atención</td>";
		cabecera += "<td style='width: 100px'>IdOrdenAtención</td>";
		cabecera += "<td style='width: 100px'>Linea</td>";
		cabecera += "<td style='width: 100px'>Código</td>";		
		cabecera += "<td style='width: 300px'>Componente</td>";
		cabecera += "<td style='width: 150px'>Monto Provisionado</td>";
		cabecera += "<td style='width: 150px'>Monto Calculado</td>";
		cabecera += "<td style='width: 80px'>Diferencia</td>";
		cabecera += "<td style='width: 300px'>Médico</td>";
		cabecera += "<td style='width: 400px'>Empresa</td>";
		cabecera += "<td style='width: 300px'>Servicio</td>";
		cabecera += "<td style='width: 300px'>Especialidad</td>";
		cabecera += "<td style='width: 400px'>Obs</td>";
	}
	cabecera += "</tr>";
	return cabecera;
}

function exportacion(opcion) {
	var nRegistros, nCampos, contenido = [];
	if (opcion) {
		nRegistros = matrizPrincipal.length;
		nCampos = matrizPrincipal[0].length;
		excelExportar = crearCabeceraExportar(opcion);
		var valor;
		for (i = 0; i < nRegistros; i++) {
			contenido.push("<tr>");
			for (j = 1; j < nCampos; j++) {
				if (j == 2) {
					switch (matrizPrincipal[i][j]) {
						case "P":
							contenido.push("<td>" + "PENDIENTE" + "</td>");
							break;
						case "C":
							contenido.push("<td>" + "CALCULADO" + "</td>");
							break;
						case "T":
							contenido.push("<td>" + "TERMINADO" + "</td>");
							break;
						case "I":
							contenido.push("<td>" + "INACTIVO" + "</td>");
							break;
					}
				} else {
					switch (j) {						
						case 6:
						case 7:
						case 8:
							contenido.push("<td>" + matrizPrincipal[i][j].toFixed(2) + "</td>");
							break;
						default:
							contenido.push("<td>" + matrizPrincipal[i][j] + "</td>");
							break;
					}
				}

			}
			contenido.push("</tr>");
		}
		excelExportar += contenido.join("") + "</table></html>";
	} else {
		nRegistros = matrizDetalle.length;
		nCampos = cabecerasDetalle.length;
		excelExportar = crearCabeceraExportar(opcion);
		var valor;
		for (i = 0; i < nRegistros; i++) {
			contenido.push("<tr>");
			for (j = 0; j < nCampos; j++) {
				switch (j) {
					case 6:
					case 7:
					case 8:
									
						contenido.push("<td>" + matrizDetalle[i][matrizIndiceDetalle[j]].toFixed(2) + "</td>");
						break;
					default:
						contenido.push("<td style='mso-number-format:\"\@\"'>" + matrizDetalle[i][matrizIndiceDetalle[j]] + "</td>");
						break;
				}
			}
			contenido.push("</tr>");
		}
		excelExportar += contenido.join("") + "</table></html>";
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
			ifrHistorial.innerHTML = "<iframe style='margin:0;padding:0;width:800px;height:400px;border: 1px solid transparent;' src='" + url + "'></iframe>";
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

function mostrarError(e) {
	switch (e.target.error.code) {
		case e.target.error.NOT_FOUND_ERR:
			console.log('Archivo No Encontrado');
			break;
		case e.target.error.NOT_READABLE_ERR:
			console.log('No se puede leer el archivo');
			break;
		case e.target.error.ABORT_ERR:
			break;
		default:
			console.log('Ocurrio un error al leer el archivo');
	};
}
function mostrarArchivo(e) {
	var data = e.target.result;
	if (use_worker) {
		xw(data, process_wb);
	}
}
function process_wb(wb) {
	var doc = document, output = "";
	var lista = to_csv(wb)[0].split("¯");

	var gifLoad = document.getElementById("gifLoad");
	gifLoad.style.display = "none";
	var btnGrabarDetalle = document.getElementById("btnGrabarDetalle");
	btnGrabarDetalle.style.display = "";

	var lista1 = lista[0].split("¬");
	var lista2 = lista[1] != "" ? lista[1].split("¬") : [];
	listaValidados = lista[0];
	crearMatriz2("divErrados", lista2);

	var url = urlBase + "Proceso/ProcesoAjusteDetalleContratoExcelValidar?ss=" + ss + "&tipo=" + (EsProvision ? "PROVISION" : "AJUSTE") + "&id=" + (EsProvision ? document.getElementById("hdfOpc").value : "0");
	$.ajax(url, "post", listarValidacion, listaValidados);


}


function listarValidacion(rpta) {
	var matrizcopiaerrados = matrizErrados.splice(0, matrizErrados.length);
	var lista = rpta.split("¬"), lista1 = [], lista2 = [];
	var datos;
	for (var x = 0; x < lista.length; x++) {
		datos = lista[x].split("¦");
		if (datos[6] == "") {
			lista1.push(lista[x]);
		}
		else {
			lista2.push(lista[x]);
		}
	}
	//var lista1 = lista[0].split("¬");
	//var lista2 = lista[1] != "" ? lista[1].split("¬") : [];
	crearMatriz2("divValidados", lista1);
	//listaValidados = lista[0];
	crearMatriz2("divErrados", lista2);
	Array.prototype.push.apply(matrizErrados, matrizcopiaerrados);
	tipoOrdenE = 0;
	indiceOrdenE = 0;
	mostrar2Pagina(2, -1);
	document.getElementById("numRegY2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizErrados.length + "</i>";


	if (matrizValidados.length > 0) {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsXCf');
	}
	else if (matrizErrados.length > 0) {
		mostrarTabs(document.getElementById("taby2"), 'ulTabsXCf');
	}
	else {
		mostrarTabs(document.getElementById("taby1"), 'ulTabsXCf');
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
/*------*/

function crearTabla2(opcion) {
	var nCampos = "";
	var contenido = "";
	switch (opcion) {
		case "divValidados":
			nCampos = cabecerasV.length;
			contenido = "<table class='tabla-general tabla-corta' style='width:1000px'>";
			contenido += "<thead class='tabla-FilaCab'>";
			contenido += "<tr class='cabecera'>";
			for (var j = 0; j < nCampos - 1; j++) {
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
			contenido += "<tr><td colspan='11' style='text-align:left'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
		case "divErrados":
			nCampos = cabecerasV.length;
			contenido = "<table class='tabla-general tabla-corta' style=';width:1000px'>";
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
			contenido += "<tr><td colspan='11' style='text-align:left'>No hay Datos</td></tr>";
			contenido += "</tbody>";
			contenido += "</table>";
			break;
	}
	document.getElementById(opcion).innerHTML = contenido;
}

function crearMatriz2(div, lista) {
	switch (div) {
		case "divValidados":
			var cabecera, exito, nCampos, campos, x = 0, v = 0;
			matrizValidados = [];
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizValidados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizValidados[x][j] = campos[j];
						else matrizValidados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenV = 0;
			indiceOrdenV = 0;
			mostrar2Pagina(1, -1);
			document.getElementById("numRegY1").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizValidados.length + "</i>";
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
			if (lista[0] != "") {
				var nRegistros = lista.length;
				var fecha;
				for (var i = 0; i < nRegistros; i++) {
					campos = lista[i].split("¦");
					nCampos = campos.length;
					matrizErrados[x] = [];
					for (var j = 0; j < nCampos; j++) {
						if (isNaN(campos[j]) || campos[j].trim() == "" || j == 3) matrizErrados[x][j] = campos[j];
						else matrizErrados[x][j] = campos[j] * 1;
					}
					x++;
				}
			}
			tipoOrdenE = 0;
			indiceOrdenE = 0;
			mostrar2Pagina(2, -1);
			document.getElementById("numRegY2").innerHTML = "<i style='border-radius:50%;font-style: normal;background-color: white;color: #00a850;padding: 2px;'>" + matrizErrados.length + "</i>";
			break;
	}
}

function mostrar2Pagina(div, indicePagina) {
	switch (div) {
		case 1:
			var nRegistros = matrizValidados.length;
			var esBloque = (indicePagina < 0);
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
			indiceActualPaginaV = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			if (matrizValidados.length > 0) {
				var inicio = indicePagina * registrosPaginaV;
				var fin = inicio + registrosPaginaV;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {
						nCampos = cabecerasV.length;
						contenido += "<tr>";
						for (j = 0; j < (nCampos - 1) ; j++) {
							switch (j) {
								default:
									contenido += "<td>";
									break;
							}
							if (j == 7) contenido += formatearNumero(matrizValidados[i][j]);
							else contenido += matrizValidados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else break;
				}
			}
			else {
				contenido += "<tr class='FilaDatos'><td style='text-align:left' colspan='11'>No hay datos</td></tr>";
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
			indiceActualPaginaE = indicePagina;
			var nCampos;
			var contenido = "";
			var campos;
			if (matrizErrados.length > 0) {
				var inicio = indicePagina * registrosPaginaE;
				var fin = inicio + registrosPaginaE;
				for (var i = inicio; i < fin; i++) {
					if (i < nRegistros) {
						nCampos = cabecerasV.length;
						contenido += "<tr>";
						for (j = 0; j < nCampos; j++) {
							switch (j) {

								default:
									contenido += "<td>";
									break;
							}
							if (j == 7) contenido += formatearNumero(matrizErrados[i][j]);
							else contenido += matrizErrados[i][j];
							contenido += "</td>";
						}
						contenido += "</tr>";
					} else

						break;
				}
			} else {
				contenido += "<tr class='FilaDatos'><td style='text-align:left' colspan='11'>No hay datos</td></tr>";
			}
			var tabla = document.getElementById("tbErrados");
			if (tabla != null) {
				tabla.innerHTML = contenido;
				configurarPaginacion2(2);
				seleccionarPaginaActual2(2);
				if (esBloque) {
					configurarPaginacion2(2);
				}
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
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='paginaValidos' onclick='mostrar2Pagina(1, ";
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
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(1, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgValidos");
			if (nRegistros <= registrosPaginaV) {
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
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -1);' title='Ir al primer grupo de páginas'><<</a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -2);' title='Ir al anterior grupo de páginas'><</a>";
			}
			for (var i = inicio ; i < fin; i += 1) {
				if (i <= indiceUltimaPagina) {
					contenido += "<a class='pagina paginaErrados' onclick='mostrar2Pagina(2, ";
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
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -3);' title='Ir al siguiente grupo de páginas'>></a>";
				contenido += "<a class='pagina' onclick='mostrar2Pagina(2, -4);' title='Ir al último grupo de páginas'>>></a>";
			}
			var tdPagina = document.getElementById("pgErrados");
			if (nRegistros <= registrosPaginaV) {
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
	var aPaginas;
	if (div == 1) aPaginas = document.getElementsByClassName("paginaValidos");
	else aPaginas = document.getElementsByClassName("paginaErrados");
	var nPaginas = aPaginas.length;
	for (i = 0; i < nPaginas; i++) {
		if (div == 1) aPaginas[i].className = "pagina paginaValidos";
		else aPaginas[i].className = "pagina paginaErrados";
	}
	switch (div) {
		case 1:
			var aPagina = document.getElementById("aV" + indiceActualPaginaV);
			if (aPagina != null) {
				aPagina.className = "pagina paginaValidos seleccionado";
			}
			break;
		case 2:
			var aPagina = document.getElementById("aE" + indiceActualPaginaE);
			if (aPagina != null) {
				aPagina.className = "pagina paginaErrados seleccionado";
			}
			break;
	}
}
function xw(data, cb) {
	if (transferable) xw_xfer(data, cb);
	//else xw_noxfer(data, cb);
}
function xw_xfer(data, cb) {
	var path = window.top.document.getElementById("Ref").value;
	var worker = new Worker(path + XW.rABS);
	worker.onmessage = function (e) {
		switch (e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); break;
			default: xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
				cb(JSON.parse(xx));
				worker.terminate();
				break;
		}
	};
	if (rABS) {
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	} else {
		worker.postMessage(data, [data]);
	}
}
function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
	o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
	return o;
}
function s2ab(s) {
	var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
	for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}
function to_csv(workbook) {
	var result = [], c = 0;
	workbook.SheetNames.forEach(function (sheetName) {
		if (c == 0) {
			var csv = sheet_to_csv(workbook.Sheets[sheetName], null, sheetName);
			if (csv != null) {
				result.push(csv);
			}
		}
		c++;
	});
	return result;
}
function sheet_to_csv(sheet, opts, nm) {
	MatrizWS = [];
	var out = "", txt = "", qreg = /"/g;
	var o = opts == null ? {} : opts;
	var c = 0;
	if (sheet == null || sheet["!ref"] == null) return "";
	var r = safe_decode_range(sheet["!ref"]);
	var FS = o.FS !== undefined ? o.FS : ",", fs = FS.charCodeAt(0);
	var RS = o.RS !== undefined ? o.RS : "\n", rs = RS.charCodeAt(0);
	var row = "", rr = "", cols = [];
	var i = 0, cc = 0, val;
	var R = 0, C = 0;
	for (C = r.s.c; C <= r.e.c; ++C) { cols[C] = encode_col(C) };
	var nCols = cols.length;
	var nRg = r.e.r + 1;
	for (var j = 1; j <= nRg; ++j) {
		MatrizWS[c] = [];
		for (var i = 0; i < nCols; i += 1) {
			val = sheet[cols[i] + j];
			MatrizWS[c][i] = (val != undefined ? (val.w != undefined ? val.w : (val.v != undefined ? val.v : "")) : "");
		}
		c++;
	}

	MatrizWS.splice(0, 1);
	xlsData = "";
	var n = MatrizWS.length, reg, ncampos, cntv = "", cnte = "", errxls = "", tmpxls = "", c = 0, v, msg = "", cv = 0, ce = 0, desc = "";
	if (n > 0) {
		for (var k = 0; k < n; k++) {
			reg = MatrizWS[k];
			ncampos = reg.length;
			tmpxls = "";
			msg = "";

			for (var j = 0; j < 6; j++) {
				tmpxls += reg[j] + "¦";

				switch (j) {
					case 0:
						if (!isNaN(reg[j]) || sucursalId != reg[j]) {
							msg += "Código Sucursal: inválido-";
						}
						break;
					case 1:
						if (isNaN(reg[j])) {
							msg += "IdOrdenAtencion: número inválido-";
						}
						break;
					case 2:
						if (isNaN(reg[j])) {
							msg += "Línea: número inválido-";
						}
						break;
					case 3:
						if (reg[j].length > 10) {
							msg += "CodigoOA:  inválido-";
						}
						break;
					case 5:
						if (isNaN(reg[j]) || reg[j].length != 6) {
							msg += "Periodo Producción: número inválido-";
						}
						break;
				}
			}
			if (msg != "") {
				errxls += tmpxls + msg + "¬";
			} else {
				tmpxls = tmpxls.substring(0, tmpxls.length - 1);
				//xlsData += tmpxls + "¬";
				xlsData += tmpxls + msg + "¬";
			}
		}
	}
	xlsData = xlsData.substring(0, xlsData.length - 1);
	errxls = errxls.substring(0, errxls.length - 1);
	return xlsData + "¯" + errxls;
}
function safe_decode_range(range) {
	var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
	var idx = 0, i = 0, cc = 0;
	var len = range.length;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.s.c = --idx;
	for (idx = 0; i < len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.s.r = --idx;
	if (i === len || range.charCodeAt(++i) === 58) { o.e.c = o.s.c; o.e.r = o.s.r; return o; }

	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
		idx = 26 * idx + cc;
	}
	o.e.c = --idx;
	for (idx = 0; i != len; ++i) {
		if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
		idx = 10 * idx + cc;
	}
	o.e.r = --idx;
	return o;
}
function encode_col(col) { var s = ""; for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode(((col - 1) % 26) + 65) + s; return s; }

function redireccionprovision() {
	var id = document.getElementById("hdfAjusteContrato").value.split("¦")[3];
	window.location.href = urlBase + "Proceso/ProcesoProvicionLista/?ss=" + ss + "&id=" + id;
}

function prepararDatosEnviarCalcular() {
	var strDatos = "";
	var nRegistros = MedicosSeleccionados.length;
	var fin = inicioEnvio + registroEnviar;
	for (var i = inicioEnvio; i < fin; i++) {
		if (i < nRegistros) {
			strDatos += MedicosSeleccionados[i];
			strDatos += "¬";
		}
		else break;
	}
	strDatos = strDatos.substring(0, strDatos.length - 1);
	return strDatos;
}


function unicasVariables() {
	var matriz = quicksort2(matrizSeleccionados, 8).slice(0);
	var n = matriz.length;
	var matrizsalida = [];
	matrizsalida.push(matriz[0][10].split("-")[0] + "¦" + matriz[0][13].split("-")[0]);
	var nsalida = matrizsalida.length;
	var encontrado = false;
	for (var x = 1; x < n; x++) {
		for (var y = 0; y < nsalida; y++) {
			if ((matriz[x][10].split("-")[0] + "¦" + matriz[x][13].split("-")[0]) == matrizsalida[y]) {
				encontrado = true;
				break;
			}
		}
		if (!encontrado) {
			matrizsalida.push(matriz[x][10].split("-")[0] + "¦" + matriz[x][13].split("-")[0]);
			nsalida = matrizsalida.length;
		}
		encontrado = false;
	}
	return matrizsalida;
}

function quicksort2(arr, indice) {
	if (arr.length <= 1) {
		return arr;
	}

	var arrLength = arr.length;
	var pivotPosition = Math.floor(arrLength / 2);
	var pivotValue = arr[pivotPosition][indice];
	var less = [],
        more = [],
        same = [];
	for (var i = 0; i < arrLength; i++) {
		if (arr[i][indice] === pivotValue) {
			same.push(arr[i]);
		}
		else if (arr[i][indice] < pivotValue) {
			less.push(arr[i]);
		}
		else {
			more.push(arr[i]);
		}
	}

	return quicksort2(less, indice).concat(same, quicksort2(more, indice));
}


function exportacionExcelImportacion() {
	var contenido = "";
	if (matrizValidados.length > 0 || matrizErrados.length > 0) {
		contenido += '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author xmlns="urn:schemas-microsoft-com:office:office">ewoychowsky</Author><Company xmlns="urn:schemas-microsoft-com:office:office">EAW</Company><Version xmlns="urn:schemas-microsoft-com:office:office">10.4219</Version></DocumentProperties><OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office"><DownloadComponents xmlns="urn:schemas-microsoft-com:office:office"/><LocationOfComponents xmlns="urn:schemas-microsoft-com:office:office" HRef="file:///\\phlfsnt01\DOWNLOAD\OfficeXPSrc"/></OfficeDocumentSettings><ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"><WindowHeight xmlns="urn:schemas-microsoft-com:office:excel">9210</WindowHeight><WindowWidth xmlns="urn:schemas-microsoft-com:office:excel">15195</WindowWidth><WindowTopX xmlns="urn:schemas-microsoft-com:office:excel">0</WindowTopX><WindowTopY xmlns="urn:schemas-microsoft-com:office:excel">60</WindowTopY><ProtectStructure xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectStructure><ProtectWindows xmlns="urn:schemas-microsoft-com:office:excel">False</ProtectWindows></ExcelWorkbook><Styles><Style ss:ID="Default" ss:Name="Normal"> <Alignment ss:Vertical="Bottom"/><Borders/><Font/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="s62"> <NumberFormat ss:Format="dd/mm/yyyy\ h:mm:ss"/></Style>  <Style ss:ID="s63"><NumberFormat ss:Format="0.000000"/></Style><Style ss:ID="s65"> <NumberFormat ss:Format="&quot;&quot;#,##0.00"/><Alignment ss:Horizontal="Right"/></Style><Style ss:ID="s79"> <Font ss:FontName="Calibri" x:Family="Swiss" ss:Size="11" ss:Color="#FFFFFF"/> <Interior ss:Color="#00B050" ss:Pattern="Solid"/></Style></Styles>';
		var n = 0, ncampos, nanchos = 0, matriz = [], nombre = "", matrizAnchos = [], matrizCabecera = [], matrizIndice = [];
		matrizCabecera = ["Código Sucursal", "IdOrdenAtencion", "Línea", "Código OA", "Código Componente", "Periodo Producción", "Observación"];
		matrizAnchos = [150, 150, 150, 150, 150, 150, 300];
		matrizIndice = [0, 1, 2, 3, 4, 5, 6];

		for (var x = 0; x < 2; x++) {
			switch (x) {
				case 0:
					//ncampos = matrizValidados[0].length;
					matriz = (matrizValidados.length == 0 ? [] : matrizValidados.slice(0));
					nombre = "Validados";
					break;
				case 1:
					//ncampos = matrizErrados[0].length;
					matriz = (matrizErrados.length == 0 ? [] : matrizErrados.slice(0));
					nombre = "Erroneos";
					break;
			}
			ncampos = (x == 0 ? (matrizCabecera.length - 1) : matrizCabecera.length);
			n = matriz.length;
			nanchos = (x == 0 ? (matrizAnchos.length - 1) : matrizAnchos.length);

			if (n > 0) {
				contenido += '<Worksheet ss:Name="' + nombre + '"><Table>';
				for (var u = 0; u < nanchos; u++) {
					contenido += '<ss:Column ss:Width="' + matrizAnchos[u] + '"/>';
				}
				contenido += "<Row>";
				for (var t = 0; t < ncampos; t++) {
					contenido += '<Cell ss:StyleID="s79">';
					contenido += '<Data ss:Type="String">';
					contenido += matrizCabecera[t];
					contenido += '</Data>';
					contenido += '</Cell>';
				}
				contenido += "</Row>";
				for (var z = 0; z < n; z++) {
					contenido += "<Row>";
					for (y = 0; y < ncampos; y++) {
						switch (y) {
							case 7:
								contenido += '<Cell ss:StyleID="s65" style="text-align:right">';
								contenido += '<Data ss:Type="Number">';
								contenido += matriz[z][matrizIndice[y]] * 1;
								break;
							default:
								contenido += '<Cell>';
								contenido += '<Data ss:Type="String">';
								contenido += matriz[z][matrizIndice[y]].toString();
								break;
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
	if (contenido != "") {
		anchorElem = document.createElement('a');
		var formBlob = new Blob([contenido], { type: 'application/vnd.ms-excel' });
		anchorElem.setAttribute("href", window.URL.createObjectURL(formBlob));
		anchorElem.setAttribute("download", "Validacion_de_Carga.xls");
		anchorElem.setAttribute("id", "atemp");
		document.body.appendChild(anchorElem);
		anchorElem.click();
		elem = document.getElementById("atemp");
		elem.parentNode.removeChild(elem);
	} else {
		mostraralerta("No se encontraron registros");
	}
}