window.onload = function () {
    var url = "crearCaptcha";
    enviarServidor(url, mostrarCaptcha);

    var txtCodigo = document.getElementById("txtCodigo");
    txtCodigo.onkeyup = function () {
        txtCodigo.value = txtCodigo.value.toUpperCase();
    }

    var aActualizarCaptcha = document.getElementById("aActualizarCaptcha");
    aActualizarCaptcha.onclick = function () {
        enviarServidor(url, mostrarCaptcha);
    }

    var btnRestablecerClave = document.getElementById("btnRestablecerClave");
    btnRestablecerClave.onclick = function (e) {
        if (validarEnvioClave()) {
            var txtCodigo = document.getElementById("txtCodigo");
            var codigo = txtCodigo.value;
            var cn = generarNumeroAzar();
            var cc = CryptoJS.MD5(cn);
            var txtCorreo = document.getElementById("txtCorreo");
            var correo = txtCorreo.value;
            var url = "../Seguridad/restablecerClave/?codigo=" + codigo + "&cn=" + cn + "&cc=" + cc + "&correo=" + correo;
            enviarServidor(url, mostrarRestablecer);
        }
    }

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.onclick = function () {
        window.location.href = "../Seguridad/Login";
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

function mostrarCaptcha(rpta) {
    if (rpta != "") {
        var formato = "data:image/jpg;base64,";
        var src = formato + rpta;
        var imgCaptcha = document.getElementById("imgCaptcha");
        imgCaptcha.src = src;
    }
}

function generarNumeroAzar() {
    var n = Math.random() * 100000;
    var str = n.toString().substring(0, 5);
    return str;
}

function validarEnvioClave() {
    var mensajeForm = '';
    var n = 0;
    var spnMensaje = document.getElementById('spnMensaje');
    var txtCorreo = document.getElementById("txtCorreo");
    var mensajeCorreo = validarEmailForm(txtCorreo.id, "Correo Electrónico", true);
    if (mensajeCorreo != "") {
        mensajeForm += "<li>" + mensajeCorreo + "</li>";
        n++;
    }
    var txtCodigo = document.getElementById("txtCodigo");
    var mensajeCodigo = validarCadenaForm(txtCodigo.id, "Código", true);
    if (mensajeCodigo != "") {
        mensajeForm += "<li>" + mensajeCodigo + "</li>";
        n++;
    }
    if (mensajeForm != '') {
        mensajeForm = '<ul>' + mensajeForm + '</ul>';
        spnMensaje.innerHTML = mensajeForm;
        return false;
    }
    else {
        spnMensaje.innerHTML = "<ul><li>Procesando...</li></ul>";
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

function validarEmailForm(Tex, Mensaje, Obligatorio) {
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
            var patron = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            if (!patron.test(Texto.value)) {
                return Mensaje + ' es invalido';
            }
        }
    }
    return "";
}

function mostrarRestablecer(rpta) {
    if (rpta != null) {
        var spnMensaje = document.getElementById('spnMensaje');
        spnMensaje.innerHTML = "<ul><li>" + rpta + "</li></ul>";
    }
}