var urlBase;
window.onload = function () {
	var parametros = hdfParametros.value.split("|");
	var longitudMaxima = Number(parametros[1]);
	var txtClaveAnterior = document.getElementById("txtClaveAnterior");
	txtClaveAnterior.focus();
	var txtClaveNueva = document.getElementById("txtClaveNueva");
	txtClaveNueva.maxLength = longitudMaxima;
	var txtClaveRepetida = document.getElementById("txtClaveRepetida");
	txtClaveRepetida.maxLength = longitudMaxima;

	var btnAceptar = document.getElementById("btnAceptar");
	btnAceptar.onclick = function (e) {
		if (validarCambioClave()) {
			var txtClaveAnterior = document.getElementById("txtClaveAnterior");
			var txtClaveNueva = document.getElementById("txtClaveNueva");
			var hdfCaduco = document.getElementById("hdfCaduco");
			if (hdfCaduco.value == null || hdfCaduco.value == "") {
				hdfCaduco.value = "0";
			}
			var url;

			var pos1 = window.location.href.indexOf("Seguridad");
			urlBase = window.location.href.substring(0, pos1);
			var ss = document.getElementById("ss").value;
			url = urlBase + "Seguridad/cambiarContrasena/?ss=" + ss + "&ca=" + txtClaveAnterior.value + "&cn=" + txtClaveNueva.value + "&flg=" + hdfCaduco.value;
			enviarServidor(url, mostrarCambio);
		}
	}

	var iframe = window.top !== window.self;
	var btnCerrar = document.getElementById("btnCerrar");
	if (iframe) {
		btnCerrar.style.display = "none";
		btnAceptar.style.width = "100%";
	}
	else {
		btnCerrar.style.display = "";
		btnCerrar.onclick = function () {
			var pos1 = location.href.indexOf("Seguridad");
			var urlBase = location.href.substring(0, pos1);
			location.href = urlBase;
		}
    }

    let hdfAd = document.getElementById("hdfAd").value;
    if (hdfAd == "1") {

        let btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.style.cssText = "width:100%;background-color: #8c8a8a;pointer-events: none;border:0;";
        let mensaje = document.getElementsByClassName("js_mensaje")[0];
        mensaje.style.display = "block";
    }

}

function enviarServidor(url, metodo) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			metodo(xhr.responseText);
		}
	}
}

function validarCambioClave() {
	var mensajeForm = '';
	var n = 0;
	var spnMensaje = document.getElementById('spnMensaje');
	var txtClaveAnterior = document.getElementById("txtClaveAnterior");
	var mensajeClaveAnterior = validarCadenaForm(txtClaveAnterior.id, "Contraseña Anterior", true);
	if (mensajeClaveAnterior != "") {
		mensajeForm += "<li>" + mensajeClaveAnterior + "</li>";
		n++;
	}
	var txtClaveNueva = document.getElementById("txtClaveNueva");
	var mensajeClaveNueva = validarCadenaForm(txtClaveNueva.id, "Contraseña Nueva", true);
	if (mensajeClaveNueva != "") {
		mensajeForm += "<li>" + mensajeClaveNueva + "</li>";
		n++;
	}
	var txtClaveRepetida = document.getElementById("txtClaveRepetida");
	var mensajeClaveRepetida = validarCadenaForm(txtClaveRepetida.id, "Contraseña Repetida", true);
	if (mensajeClaveRepetida != "") {
		mensajeForm += "<li>" + mensajeClaveRepetida + "</li>";
		n++;
	}
	if (txtClaveAnterior.value == txtClaveNueva.value) {
		mensajeForm += "<li>La nueva Contraseña no puede ser igual a la anterior</li>";
		n++;
	}
	if (txtClaveNueva.value != txtClaveRepetida.value) {
		mensajeForm += "<li>Contraseña repetida No coincide con la nueva Contraseña</li>";
		n++;
	}
	if (txtClaveNueva.value != "") {
		var hdfParametros = document.getElementById("hdfParametros");
		if (hdfParametros.value == "") {
			mensajeForm += "<li>No se pudo obtener los parametros</li>";
			n++;
		}
		else {
			var parametros = hdfParametros.value.split("|");
			var longitudActual = Number(txtClaveNueva.value.length);
			var longitudMinima = Number(parametros[0]);
			var longitudMaxima = Number(parametros[1]);
			var indicadorMinusculas = (parametros[2] == "True" ? true : false);
			var indicadorNumeros = (parametros[3] == "True" ? true : false);
			//Agregar indicador numero parametros[3]
			var indicadorMayusculas = (parametros[4] == "True" ? true : false);
			var indicadorCaracteres = (parametros[5] == "True" ? true : false);
			if (longitudActual < longitudMinima) {
				mensajeForm += "<li>La contraseña debe tener " + parametros[0] + " caracteres como mínimo</li>";
				n++;
			}
			if (longitudActual > longitudMaxima) {
				mensajeForm += "<li>La contraseña debe tener " + parametros[1] + " caracteres como máximo</li>";
				n++;
			}
			if (indicadorMinusculas) {
				var regexMinusculas = /[a-z]/g;
				if (!regexMinusculas.test(txtClaveNueva.value)) {
					mensajeForm += "<li>La contraseña debe tener minúsculas</li>";
					n++;
				}
			}
			//Agregar validación
			if (indicadorMayusculas) {
				var regexMayusculas = /[A-Z]/g;
				if (!regexMayusculas.test(txtClaveNueva.value)) {
					mensajeForm += "<li>La contraseña debe tener mayúsculas</li>";
					n++;
				}
			}

			if (indicadorNumeros) {
				var regexnumero = /[0-9]/g;
				if (!regexnumero.test(txtClaveNueva.value)) {
					mensajeForm += "<li>La contraseña debe tener numeros</li>";
					n++;
				}
			}

			if (indicadorCaracteres) {
				var regexCaracteres = /[!@#\$%\^\&*\)\(+=._-]/g;
				if (!regexCaracteres.test(txtClaveNueva.value)) {
					mensajeForm += "<li>La contraseña debe tener caracteres especiales</li>";
					n++;
				}
			}
		}
	}
	if (mensajeForm != '') {
		mensajeForm = '<ul>' + mensajeForm + '</ul>';
		spnMensaje.innerHTML = mensajeForm;
		return false;
	}
	else {
		txtClaveAnterior.value = CryptoJS.MD5(txtClaveAnterior.value);
		txtClaveNueva.value = CryptoJS.MD5(txtClaveNueva.value);
		txtClaveRepetida.value = CryptoJS.MD5(txtClaveRepetida.value);
		return true;
	}
}

function validarCadenaForm(Tex, Mensaje, Obligatorio) {
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

function mostrarCambio(rpta) {
	var spnMensaje = document.getElementById('spnMensaje');
	var url;
	var mensaje;
	if (rpta != "") {
		switch (rpta) {
			case "-1":
				mostraralerta("Ocurrió un error en el proceso");
				limpiarTextos();
				break;
			case "-2":
				mostraralerta("La contraseña anterior es inválida");
				limpiarTextos();
				break;
			case "-3":
				mostraralerta("La contraseña ya está en el historial");
				limpiarTextos();
				break;
			case "1":
				url = urlBase+"Principal/Inicio";
				var hdfSesion = document.getElementById("ss").value;
				mostraralerta("Se modificó contraseña y se activo usuario");
				enviarFormulario(url, mensaje, hdfSesion);
				break;
			case "2":

				limpiarTextos();
				mostraralerta("Se procedió a modificar la contraseña");
				setTimeout(function () {
					var iframe = window.top !== window.self;
					if (iframe) {
						var ifrPrincipal = window.parent.document.getElementById("ifrPrincipal");
						ifrPrincipal.src = "";					
						
					} else {
						var pos1 = location.href.indexOf("Seguridad");
						var urlBase = location.href.substring(0, pos1);
						location.href = urlBase;
					}
				}, 1000);
				break;
		}
	}
	else {
		mostraralerta("No se pudo obtener los datos del usuario");
	}
}

function enviarFormulario(accion, mensaje, hdfsesion) {
	var cuerpo = document.getElementById("frmCambio");
	var form = document.createElement("form");
	form.setAttribute('method', "post");
	form.setAttribute('action', accion);
	var campo = document.createElement("input");
	campo.setAttribute('name', "mensaje");
	campo.setAttribute('type', "hidden");
	campo.setAttribute('value', mensaje);
	form.appendChild(campo);

	var campo2 = document.createElement("input");
	campo2.setAttribute('name', "idSesion");
	campo2.setAttribute('type', "hidden");
	campo2.setAttribute('value', hdfsesion);
	form.appendChild(campo2);

	cuerpo.appendChild(form);
	form.submit();
	//sessionStorage.setItem("salir", "1");
	// window.parent.parent.parent.location.href = accion;
}

function limpiarTextos() {
	var txtClaveAnterior = document.getElementById("txtClaveAnterior");
	txtClaveAnterior.value = "";
	var txtClaveNueva = document.getElementById("txtClaveNueva");
	txtClaveNueva.value = "";
	var txtClaveRepetida = document.getElementById("txtClaveRepetida");
	txtClaveRepetida.value = "";
}

function cerrarVentana() {
	var btnToggle = window.parent.document.getElementById("btnToggle");
	btnToggle.click();
	var cerrar = document.getElementById('frmCambio');
	cerrar.style.display = 'none';
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