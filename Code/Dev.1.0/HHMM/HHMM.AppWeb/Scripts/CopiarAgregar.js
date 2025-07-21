init()
function init() {

	var spnCopiar = document.getElementById("spnCopiar");
	spnCopiar.onclick = function () {
		abrirPopup("PopupDuplicar");
		var txtCopiaFechaInicio = document.getElementById("txtCopiaFechaInicio");
		var txtCopiaFechaFin = document.getElementById("txtCopiaFechaFin");
		var txtCopiaMedico = document.getElementById("txtCopiaMedico");
		mensajeValidacion = [];
		txtCopiaFechaInicio.removeAttribute("readonly");
		txtCopiaFechaFin.removeAttribute("readonly");
		txtCopiaFechaInicio.classList.remove("error");
		txtCopiaFechaFin.classList.remove("error");
		txtCopiaMedico.classList.remove("error");
		txtCopiaFechaInicio.value = "";
		txtCopiaFechaFin.value = "";
		txtCopiaMedico.value = "";
		var txtCopiaMedico = document.getElementById("txtCopiaMedico");
		txtCopiaMedico.value = "";
		var hdfMedico = document.getElementById("hdfMedico").value;
		valorCopiaId = hdfMedico;
	}
	var btngrabarCopiar = document.getElementById("btngrabarCopiar");
	btngrabarCopiar.onclick = function () {
		if (validarCopiar()) {
			var doc = document,
				txtCopiaFechaInicio = doc.getElementById("txtCopiaFechaInicio").value,
				txtCopiaFechaFin = doc.getElementById("txtCopiaFechaFin").value,
				hdfMedicoDet = doc.getElementById("hdfMedicoDet").value,
				hdfMedico = doc.getElementById("hdfMedico").value.split("|")[0],
				isuc = window.parent.document.getElementById("isuc").value.split("|")[0];
				txtCopiaMedico = doc.getElementById("txtCopiaMedico").value;

			var strDatos = txtCopiaFechaInicio + "¦" + txtCopiaFechaFin + "¦" + hdfMedicoDet + "¦" + isuc + "¦" + (txtCopiaMedico == "" ? 0 : hdfMedico);
			var ss = window.parent.document.getElementById("iss").value;
			var url = "../grabarCopia/?ss=" + ss;
			requestServerC(url, "post", mostrarGrabarCopia, strDatos);
		}
	}

	var spnCopiaMedico = document.getElementById("spnCopiaMedico");
	spnCopiaMedico.onclick = function () {
		var ifrMedico = document.getElementById("ifrMedico");
		if (ifrMedico.innerHTML == "") {
			ifrMedico.innerHTML = "<iframe style='margin:0;padding:0;width:950px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/MedicoLista/?ss=" + ss + "'></iframe>";
		}
		abrirPopup("PopupMedico");
	}


}

function mostrarGrabarCopia(rpta) {
	var data = rpta.split('¦');
	if (data[0] == "0") {
		mostraralerta(data[1]);
		abrirPopup("PopupDuplicar");
		document.getElementById("txtCopiaFechaInicio").value = "";
		document.getElementById("txtCopiaFechaFin").value = "";
		document.getElementById('hdfMedico').value = valorCopiaId;
	} else {
		mostraralerta(data[1]);
	}
	mensajeValidacion = [];
}



function validarCopiar() {
	mensajeValidacion = [];

	var txtCopiaFechaInicio = document.getElementById("txtCopiaFechaInicio");
	var txtCopiaFechaFin = document.getElementById("txtCopiaFechaFin");
	var txtCopiaMedico = document.getElementById("txtCopiaMedico");
	var mensajeFechaInicio = validarFecha(txtCopiaFechaInicio.id, "fecha inicio", true);
	if (mensajeFechaInicio != "") {
		mensajeValidacion[txtCopiaFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
		txtCopiaFechaInicio.className += " error";
	}

	var mensajeFechaFin = validarFecha(txtCopiaFechaFin.id, "fecha fin", true);
	if (mensajeFechaFin != "") {
		mensajeValidacion[txtCopiaFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
		txtCopiaFechaFin.className += " error";
	}

	if (txtCopiaMedico.value == "") {
		mensajeValidacion[txtCopiaFechaFin.getAttribute("data-secuencia")] = "No debe estar vacio.";
		txtCopiaMedico.className += " error";
	}

	if (mensajeValidacion.length > 0) {
		return false;
	} else {
		return true;
	}
}
function requestServerC(url, type, success, text) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url);
	xhr.onreadystatechange = function () {
		if (xhr.status == 200 && xhr.readyState == 4) {
			success(xhr.responseText);
		}
	}
	if (type == "get") xhr.send();
	else {
		if (text != null && text != "") xhr.send(text);
	}
}