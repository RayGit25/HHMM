var c = 0, url, base, exito = false, acc = 0;
var urlBase;
var listaCompania = "";
var listaSucursal = "";
var _idCompania = "";
var idCompania = localStorage.getItem('SANNA_HHMM_Compania');
window.onload = function () {

    var txtUsuario = document.getElementById("txtUsuario");

    txtUsuario.focus();
    var divCont = document.getElementById("divCont");
    var stimer = setTimeout(function () {
        divCont.className = "lineaContenedor";
        clearTimeout(stimer);
    }, 1500)
    configurarEventos();

    enviarServidor('Seguridad/listarCompanias', mostrarCompania);

    txtUsuario.className = "textbox";
    txtUsuario.disabled = false;
    
    txtClave.className = "textbox";
    txtClave.disabled = false;
    txtUsuario.focus();
}

function configurarEventos() {
    var aActualizarCaptcha = document.getElementById("aActualizarCaptcha");
    aActualizarCaptcha.onclick = function () {
        url = base + "crearCaptcha";
        enviarServidor(url, mostrarCaptcha);
    }

    var txtCodigo = document.getElementById("txtCodigo");
    txtCodigo.onkeyup = function () {
        txtCodigo.value = txtCodigo.value.toUpperCase();
    }

    //var aOlvidoContrasena = document.getElementById("aOlvidoContrasena");
    //aOlvidoContrasena.onclick = function () {
    //    window.location.href = base + "OlvidoContrasena";
    //}

    var btnAceptar = document.getElementById("btnAceptar");
    btnAceptar.onclick = function () {
        if (validarLogin(c)) {
            var txtUsuario = document.getElementById("txtUsuario");
            var txtClave = document.getElementById("txtClave");
            var txtCodigo = document.getElementById("txtCodigo");
            var spnMensaje = document.getElementById('spnMensaje');
            (exito ? (c = 0) : "");
            _idCompania = document.getElementById("cboEmp").value;
            if (_idCompania != "") {
                spnMensaje.innerHTML = "";
                url = "Seguridad/validarLogin/?codigo=" + txtCodigo.value + "&usuario=" + txtUsuario.value + "&clave=" + CryptoJS.MD5(txtClave.value) + "&cnt=" + c + "&acc=" + acc + "&pw=" + txtClave.value + "&idCompania=" + _idCompania;
                c++;
                // txtClave.value = CryptoJS.MD5(txtClave.value);
                enviarServidor(url, mostrarValidar);
                //var comboEmpresa = document.getElementById("cboEmp").addEventListener;
            } else {
                spnMensaje.innerHTML = "Falta Seleccionar Empresa";
                btnAceptar.innerHTML = "Acceder";
            }
        }
    }

    var cboEmp = document.getElementById("cboEmp");
    cboEmp.onchange = function () {
        //llenarCombo(listaSucursal, "cboCede");
        txtUsuario.className = "textbox";
        txtUsuario.disabled = false;
        txtClave.className = "textbox";
        txtClave.disabled = false;
    }

    document.onkeypress = function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            var btnAceptar = document.getElementById("btnAceptar");
            btnAceptar.click();
        }
        return true;
    };

    var btnRestablecerClave = document.getElementById("btnRestablecerClave");
    btnRestablecerClave.onclick = function (e) {
        var cn = generarNumeroAzar();
        var cc = CryptoJS.MD5(cn);
        var txtCorreo = document.getElementById("txtcorreo");
        var correo = txtCorreo.value;
        var url = "Seguridad/restablecerClave/?cn=" + cn + "&cc=" + cc + "&correo=" + correo;
        enviarServidor(url, mostrarRestablecer);
        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
        this.onclick = null;
    }
}
//function enviarDataServidor(claveCifrada) {
//    var txtUsuario = document.getElementById("txtUsuario");
//    var txtClave = document.getElementById("txtClave");
//    var txtCodigo = document.getElementById("txtCodigo");
//    txtClave.value = claveCifrada;
//    var pos1 = window.location.href.indexOf("Seguridad");
//    var base = "Seguridad/";
//    if (pos1 > -1) base = "";
//    url = base + "validarLogin/?codigo=" + txtCodigo.value + "&usuario=" + txtUsuario.value + "&clave=" + txtClave.value + "&cnt="+c;
//    enviarServidor(url, mostrarValidar);

//}
function generarNumeroAzar() {
    var n = parseInt(Math.random() * 1000000);
    var str = n.toString().substring(0, 5);
    return str;
}

function mostrarRestablecer(rpta) {
	var btnRestablecerClave = document.getElementById("btnRestablecerClave");
	btnRestablecerClave.innerHTML = "Restablecer";
	btnRestablecerClave.onclick = function (e) {
		var cn = generarNumeroAzar();
		var cc = CryptoJS.MD5(cn);
		var txtCorreo = document.getElementById("txtcorreo");
		var correo = txtCorreo.value;
		var url = "Seguridad/restablecerClave/?cn=" + cn + "&cc=" + cc + "&correo=" + correo;
		enviarServidor(url, mostrarRestablecer);
	}
    if (rpta != "") {
        var data = rpta.split("|");
        if (data[1] == "1") {
            mostraralerta(data[0]);
            abrirPopup('PopupCambioContrasena');
        }
        else {
            mostraralerta(data[0]);
        }
    }
}

function enviarServidor(url, metodo) {
    var xhr = new XMLHttpRequest();
    urlBase = location.protocol + "//" + window.location.host + document.getElementById("url").value;
    xhr.open("get", urlBase + url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            metodo(xhr.responseText);
        }
    }
}

function mostrarCaptcha(rpta) {
    if (rpta != "") {
        var formato = "data:image/jpg;base64,";
        var src = formato + rpta;
        var imgCaptcha = document.getElementById("imgCaptcha");
        imgCaptcha.src = src;
    }
}

function validarLogin(v) {
    var mensajeForm = '';
    var n = 0, doc = document;
    var spnMensaje = doc.getElementById('spnMensaje');

    var txtUsuario = doc.getElementById("txtUsuario"), obj;
    var mensajeUsuario = validarCadenaForm(txtUsuario.id, "Usuario", true);
    if (mensajeUsuario != "") {
        obj = doc.getElementById("txtUsuariomsj");
        obj.innerHTML = mensajeUsuario;
        obj.className = "error";
        //mensajeForm += "<li>" + mensajeUsuario + "</li>";
        n++;
    } else {
        obj = doc.getElementById("txtUsuariomsj");
        obj.className = "error ocultar";
    }
    var txtClave = doc.getElementById("txtClave");
    var mensajeClave = validarCadenaForm(txtClave.id, "Contraseña", true);
    if (mensajeClave != "") {
        obj = doc.getElementById("txtClavemsj");
        obj.innerHTML = mensajeClave;
        obj.className = "error";
        //mensajeForm += "<li>" + mensajeClave + "</li>";
        n++;
    } else {
        obj = doc.getElementById("txtClavemsj");
        obj.className = "error ocultar";
    }
    if (v > 3) {
        var txtCodigo = doc.getElementById("txtCodigo");
        if (!exito) {
            var mensajeCodigo = validarCadenaForm(txtCodigo.id, "Código", true);
            if (mensajeCodigo != "") {
                obj = doc.getElementById("txtCodigomsj");
                obj.innerHTML = mensajeCodigo;
                obj.className = "error";
                n++;
            } else {
                obj = doc.getElementById("txtCodigomsj");
                obj.className = "error ocultar";
            }
        }
    }
    if (exito) {
        var cboCede = doc.getElementById("cboCede");;
        var mensajeCombo = validarComboForm(cboCede.id, "Sede", true);
        if (mensajeCombo != "") {
            obj = doc.getElementById("cboCedemsj");
            obj.innerHTML = mensajeCombo;
            obj.className = "error";
            n++;
        } else {
            obj = doc.getElementById("txtCodigomsj");
            obj.className = "error ocultar";
        }
    }
    if (n > 0) {
        return false;
    }
    else {
        var btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.innerHTML = "<i class='ico fa-refresh puntero rotar'></i>";
      /*  if (!exito) {
            txtClave.value = CryptoJS.MD5(txtClave.value);
        }*/
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

function validarComboForm(Combo, Mensaje, Obligatorio) {
    var cbo = document.getElementById(Combo);
    if (cbo != null) {
        if (Obligatorio) {
            if (cbo.value == "" || cbo.value == "0") {
                return "Seleccione " + Mensaje;
            }
        }
    }
    return "";
}

function mostrarValidar(rpta) {
    if (rpta != "") {
        var spnMensaje = document.getElementById('spnMensaje');
        var url = "";
        var data = rpta.split("¯");
        var est = data[0];
        //Guardamos el estado de Administrador

        switch (est) {
            //case "REG":
            case "A":
                let lSucursal = data[3] ? data[3].split('¬') : [];
                var idSucursal = '';
                if (lSucursal.length == 1) {
                    let aSucursal = lSucursal[0].split('¦');
                    idSucursal = aSucursal[1];
                    exito = true;
                }
                if (exito) {
                    localStorage.setItem('SANNA_HHMM_Compania', document.getElementById('cboEmp').value);
                    idSucursal = idSucursal || document.getElementById("cboCede").value;
                    url = urlBase + "Principal/Inicio/?ss=" + data[1] + "&sucursalId=" + idSucursal + "&idCompania=" + _idCompania;
                    enviarFormulario(url, "", data[1], idSucursal);
                }
                spnMensaje.innerHTML = "";
                exito = true;
                acc = 1;
                if (data[2] != "" && data[3] != "") {
                    habilitarSede(data[2], data[3]);
                }
                break;
            case "R":
                if (exito) {
                	enviarFormulario(urlBase + "Seguridad/CambioContrasena", "Debe modificar su contraseña", data[1]);//CambioContrasena
                }
                spnMensaje.innerHTML = "";
                exito = true;
                acc = 1;
                if (data[2] != "" && data[3] != "") {
                    habilitarSede(data[2], data[3]);
                }
                break;
            default:
                if (est == "-1" || est == "-5") {
                    //if (exito) {
                    	if (est == "-1") enviarFormulario(urlBase+"Seguridad/CambioContrasena", "Su contraseña ya caducó", data[1]);
                    	else enviarFormulario(urlBase+"Seguridad/CambioContrasena", "Su contraseña ya caducó y ya hay una sesión activa", data[1]);
                  //  }
                    if (est == "-1") spnMensaje.innerHTML = "Usuario Inactivo";
                    else spnMensaje.innerHTML = "";
                    exito = true;
                    //habilitarSede();
                    //if (pos > -1) url = "../Principal/Inicio/?ss=" + data[1];
                    //else url = "Principal/Inicio/?ss=" + data[1];
                    //enviarFormulario(url, "", data[1]);
                }
                else {
                    if (est == "-2" || est == "-3" || est == "-4" || est == "-6") {

                        switch (est) {
                            case "-2":
                                spnMensaje.innerHTML = "Login inválido";
                                habilitarCapcha();
                                break;
                            case "-3":
                                spnMensaje.innerHTML = "Acceso Restringido";
                                habilitarCapcha();
                                break;
                            case "-4":
                                spnMensaje.innerHTML = "Usuario ya tiene sesión activa";
                                habilitarCapcha();
                                break;
                            case "-6":
                                spnMensaje.innerHTML = "Código ingresado no coincide con el Captcha";
                                habilitarCapcha();
                                break;
                        }
                    }
                    else {
                        let lSucursal = data[3] ? data[3].split('¬') : [];
                        var idSucursal = '';
                        if (lSucursal.length == 1) {
                            let aSucursal = lSucursal[0].split('¦');
                            idSucursal = aSucursal[1];
                            exito = true;
                        }
                        if (exito) {
                            localStorage.setItem('SANNA_HHMM_Compania', document.getElementById('cboEmp').value);
                            var idSucursal = idSucursal = idSucursal || document.getElementById("cboCede").value;
                            url = urlBase + "Principal/Inicio/?ss=" + data[1] + "&sucursalId=" + idSucursal + "&idCompania=" + _idCompania;
                        	enviarFormulario(url, "Faltan " + est + " días para que caduque tu contraseña", data[1], idSucursal);
                        }
                        spnMensaje.innerHTML = "";
                        exito = true;
                        if (data[2] != "" && data[3] != "") {
                            habilitarSede(data[2], data[3]);
                        }
                    }
                }
                break;
        }
        var btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.innerHTML = "Acceder";
    }
}
function habilitarSede(compania, sucursal) {
    var doc = document,
        txtUsuario = doc.getElementById("txtUsuario"),
        txtClave = doc.getElementById("txtClave"),
        cboCede = doc.getElementById("cboCede"),
        cboEmp = doc.getElementById("cboEmp"),
        aActualizarCaptcha = doc.getElementById("aActualizarCaptcha"),
        txtCodigo = doc.getElementById("txtCodigo");
    txtUsuario.disabled = true;
    txtClave.disabled = true;
    
    aActualizarCaptcha.disabled = true;
    txtCodigo.disabled = true;
    listaCompania = compania;
    listaSucursal = sucursal;
    //llenarCombo(compania, "cboEmp");
    llenarCombo(sucursal, "cboCede");	
    cboCede.disabled = false;
    cboEmp.disabled = true;
    var matriz1 = listaCompania.split("¬");
    var matriz2 = listaSucursal.split("¬");
    //if (matriz1.length == 1) {
    //	cboEmp.selectedIndex = "1";
    //	cboEmp.onchange();
    //}
    //else {
    //	cboEmp.selectedIndex = "0";
    //	cboEmp.onchange();
    //}
    //if (cboEmp.selectedIndex != "0") {
    //	var campos = "", contador = 0;
    //	for (var x = 0; x < matriz2.length; x++) {
    //		campos = matriz2[x].split("¦");
    //		if (campos[0] == cboEmp.value) {
    //			contador++;
    //		}
    //	}
    //	if (contador > 1) {
    //		cboCede.selectedIndex = "0";
    //	}
    //	else {
    //		cboCede.selectedIndex = "1";
    //	}
    //} else {
    //	cboCede.selectedIndex = "0";
    //}
	
    txtUsuario.className = "textbox desabilitado";
    txtClave.className = "textbox desabilitado";
    txtCodigo.className = "textbox desabilitado";
    cboCede.className = "combobox";
    cboEmp.className = "combobox";
    //cboCede.value = "1";
}

function habilitarCapcha() {
    if (c >= 4) {
        var filaCpa = document.getElementById("filaCpa"), filaCdo = document.getElementById("filaCdo");
        url = "Seguridad/crearCaptcha";
        enviarServidor(url, mostrarCaptcha);
        filaCpa.className = "row relative";
        filaCdo.className = "row relative";
    }
}

function enviarFormulario(accion, mensaje, ss, sucursal) {
    var cuerpo = document.getElementById("frmLogin");
    var form = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', accion);
    var campo = document.createElement("input");
    campo.setAttribute('name', "mensaje");
    campo.setAttribute('type', "hidden");
    campo.setAttribute('value', mensaje);
    form.appendChild(campo);
    var campo2 = document.createElement("input");
    campo2.setAttribute('name', "ss");
    campo2.setAttribute('type', "hidden");
    campo2.setAttribute('value', ss);
    form.appendChild(campo2);
    var campo3 = document.createElement("input");
    campo3.setAttribute('name', "sucursalId");
    campo3.setAttribute('type', "hidden");
    campo3.setAttribute('value', (sucursal == "" ? "" : sucursal));
    form.appendChild(campo3);
    form.style.display = "none";
    cuerpo.appendChild(form);
    form.submit();
}

function llenarCombo(lista, nombreCombo) {
    var contenido = "";
    var listas = lista.split("¬");
    var n = listas.length;
    var valor = "";
    var campos = "";
    contenido = n == 1 ? "" : "<option value=''>Seleccione</option>";
    if (nombreCombo == "cboCede") {
        var valor = document.getElementById("cboEmp").value;
        for (var x = 0; x < n; x++) {
            campos = listas[x].split("¦");
           // if (campos[0] == valor) {
                contenido += "<option value='" + campos[1] + "'>" + campos[2] + "</option>";
           // }
        }
    }
    else {
        idCompania = localStorage.getItem('SANNA_HHMM_Compania');
        for (var x = 0; x < n; x++) {
            campos = listas[x].split("¦");
            contenido += "<option value='" + campos[0] + "'";
            if (idCompania && idCompania == campos[0]) {
                contenido += " selected";
            }
            contenido += " >";
            contenido += campos[2];
            contenido += "</option>";

            //var txtUsuario = document.getElementById("txtUsuario");

            //txtUsuario.focus();
        }
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}
/*function llenarComboCompania() {
    var contenido = "";
    string[] listas = 
}*/

function abrirPopup(control) {
	var popup = document.getElementById(control);
    if (popup.className.indexOf("Open") == -1) {
        popup.className += " Open";
    } else {
        popup.className = "PopUp";
    }
    if (control == "PopupCambioContrasena") {
    	document.getElementById('txtcorreo').focus();
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

function mostrarCompania(rpta) {
    if (rpta) {
        //let listaTemp = rpta ? rpta.split('¬') : [];
        //console.log('listaTemp: ', listaTemp);
        llenarComboV2(rpta, "cboEmp", "¬", "|");
    }
}

function llenarComboV2(lista, nombreCombo, sepRegistros, sepCampos) {
    sepRegistros = sepRegistros || '¬';
    sepCampos = sepCampos || '¦';
    var contenido = "";
    var listas = lista.split(sepRegistros);
    var n = listas.length;
    var valor = "";
    var campos = "";
    contenido = n == 1 ? "" : "<option value=''>Seleccione</option>";
    if (nombreCombo == "cboCede") {
        var valor = document.getElementById("cboEmp").value;
        for (var x = 0; x < n; x++) {
            campos = listas[x].split(sepCampos);
            // if (campos[0] == valor) {
            contenido += "<option value='" + campos[1] + "'>" + campos[2] + "</option>";
            // }
        }
    }
    else {
        idCompania = localStorage.getItem('SANNA_HHMM_Compania');
        for (var x = 0; x < n; x++) {
            campos = listas[x].split(sepCampos);
            contenido += "<option value='" + campos[0] + "'";
            if (idCompania && idCompania == campos[0]) {
                contenido += " selected";
            }
            contenido += " >";
            contenido += campos[2];
            contenido += "</option>";

            //var txtUsuario = document.getElementById("txtUsuario");

            //txtUsuario.focus();
        }
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }
}