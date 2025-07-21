var lista = [];
var matriz = [];
var cabeceras = ["Código", "Descripción"];
var anchos = [10, 90];
var matrizIndice = [0, 1];
var registrosPagina = 8;
var paginasBloque = 5;
var indiceActualBloque = 0;
var indiceOrden = 0;
var indiceActualPagina = 0;
var mensajeValidacion = [];
var urlBase = "";
var idPasar = "";
window.onload = function () {
    var pos1 = window.parent.location.href.indexOf("Mantenimiento");
    urlBase = window.parent.location.href.substring(0, pos1);
    var ss = window.parent.parent.document.getElementById("iss").value;
    var url = urlBase + "Mantenimiento/listarCuenta/?ss=" + ss;
    $.ajax(url, "get", listarTodo);
    configuracionInicial();
}

function configuracionInicial() {
    crearTabla();
    configurarOrdenacion();
    configurarFiltro();
}

function listarTodo(rpta) {
    if (rpta != "") {
        lista = rpta.split("¯");
        listarCuenta();
        configurarControles();
    }
}

function listarCuenta(irUltimaPagina) {
    crearMatriz();
    if (irUltimaPagina != null && irUltimaPagina != "") paginar(-4);
    else {
        paginar(0);
        indiceActualBloque = 0;
    }
}

function paginar(indicePagina) {
    var nRegistros = matriz.length;
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
    mostrarMatriz(indicePagina);
}

function crearTabla() {
    var nCampos = cabeceras.length;
    var contenido = "<table class='tabla-general'>";
    contenido += "<thead class='tabla-FilaCab'>";
    contenido += "<tr class='cabecera'>";
    contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'></th>";
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
        contenido += "<input type='text' class='Texto' name='cabecera' style='width:80%'>";
        contenido += "</th>";
    }
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tbCuentaContable' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas' colspan='";
    contenido += (nCampos + 1).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("divCuentaContable").innerHTML = contenido;
}

function crearMatriz() {
    var nRegistros = lista.length;
    var nCampos;
    var campos;
    var x = 0;
    matriz = [];
    for (i = 0; i < nRegistros; i++) {
        campos = lista[i].split("¦");
        matriz[x] = [];
        nCampos = campos.length;
        for (j = 0; j < nCampos; j++) {
            matriz[x][j] = campos[j];
        }
        x++;
    }

}

function mostrarMatriz(indicePagina) {
	var contenido = "";
	var hdfPos = document.getElementById("hdfPos").value;
    var n = matriz.length;
    if (n > 0) {
        var nCampos = matriz[0].length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        for (var i = inicio; i < fin; i++) {
            if (i < n) {
                contenido += "<tr class='FilaDatos'>";
                contenido += "<td style='text-align:center'><input type='radio' name='rdnCuentaContable' id='rdnx";
                contenido += i;
                contenido += "' data-campo='";
                contenido += matriz[i][0];
                contenido += "¦";
                contenido += matriz[i][1];
                contenido += "¦";
                contenido += hdfPos;
                contenido += "'/></td>";
                for (var j = 0; j < nCampos; j++) {
                    contenido += "<td>";
                    contenido += matriz[i][j];
                    contenido += "</td>";
                }
                contenido += "</tr>";
            }
            else break;
        }
    }
    else {
        var nCabeceras = cabeceras.length;
        contenido += "<tr class='FilaDatos'><td style='text-align:center' colspan='";
        contenido += (nCabeceras + 1).toString();
        contenido += "'>No hay datos</td></tr>";
    }
    document.getElementById("tbCuentaContable").innerHTML = contenido;
    crearPaginas();
    configurarChecks();
}
function configurarOrdenacion() {
    var enlaces = document.getElementsByClassName("Enlace");
    var nEnlaces = enlaces.length;
    var enlace;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = enlaces[i];
        enlace.onclick = function () {
            ordenarMatriz(this);
            mostrarMatriz(0);
        }
    }
}

function ordenarMatriz(enlace) {
    indiceOrden = enlace.getAttribute("data-orden");
    var campo = enlace.innerHTML;
    var posAsc = campo.indexOf("▲");
    var posDesc = campo.indexOf("▼");
    tipoOrden = (posAsc == -1 && posDesc == -1 ? 0 : (posAsc > -1 ? 1 : 0));
    limpiarEnlaces();
    if (tipoOrden == 0) enlace.innerHTML = campo.replace(" ▼", "") + " ▲";
    else enlace.innerHTML = campo.replace(" ▲", "") + " ▼";
    matriz.sort(ordenar);
}

function ordenar(x, y) {
    var valX = (isNaN(x[indiceOrden]) ? x[indiceOrden].toLowerCase() : x[indiceOrden]);
    var valY = (isNaN(y[indiceOrden]) ? y[indiceOrden].toLowerCase() : y[indiceOrden]);
    return ((tipoOrden == 0 ? valX > valY : valX < valY) ? 1 : -1);
}

function configurarFiltro() {
    var textos = document.getElementsByClassName("Texto");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            filtrar();
        }
    }
    var combos = document.getElementsByClassName("Combo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            filtrar();
        }
    }
}

function filtrar() {
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
    for (var i = 0; i < nRegistros; i++) {
        campos = lista[i].split("¦");
        nCampos = campos.length;
        for (var j = 0 ; j < nCabeceras; j += 1) {
            exito = true;
            cabecera = cabeceras[j];
            if (cabecera.className == "Texto") {
                if (j == 0) {
                    var suboracion = campos[j].substring(0, cabecera.value.length);
                    exito = exito && (suboracion.toLowerCase().trim() == cabecera.value.toLowerCase().trim());
                }
                else {
                    exito = exito && (campos[j].toLowerCase().trim().indexOf(cabecera.value.toLowerCase().trim()) > -1);
                }
            }
            else {
                exito = exito && (cabecera.value == "" || campos[j] == cabecera.value);
            }
            if (!exito) break;
        }

        if (exito) {
            matriz[x] = [];
            for (var j = 0; j < nCampos; j++) {
                matriz[x][j] = campos[j];
            }
            x++;
        }
    }
    paginar(0);
    indiceActualBloque = 0;
}


function limpiarEnlaces() {
    var enlaces = document.getElementsByClassName("Enlace");
    var nEnlaces = enlaces.length;
    var enlace;
    var campo;
    for (var i = 0; i < nEnlaces; i++) {
        enlace = enlaces[i];
        campo = enlace.innerHTML;
        enlace.innerHTML = campo.replace(" ▲", "").replace(" ▼", "");
    }
}

function crearPaginas() {
    var nRegistros = matriz.length;
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
    if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = indiceActualBloque * paginasBloque;
    var fin = inicio + paginasBloque;
    if (indiceActualBloque > 0 && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-1);' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-2);' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio ; i < fin; i += 1) {
        if (i <= indiceUltimaPagina) {
            contenido += "<span onclick='paginar(";
            contenido += i;
            contenido += ");'  title='Ir a la pagina ";
            contenido += (i + 1).toString();
            contenido += "' id='a";
            contenido += i.toString();
            contenido += "' class='pagina' >";
            contenido += (i + 1).toString();
            contenido += "</span>";

        } else break;
    }
    if (indiceActualBloque < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-3);' title='Ir al siguiente grupo de páginas'>&gt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-4);' title='Ir al último grupo de páginas'>&gt;&gt;</span>";
    }
    if (nRegistros <= registrosPagina) {
        document.getElementById("tdPaginas").innerHTML = "";
    }
    else {
        document.getElementById("tdPaginas").innerHTML = contenido;
        seleccionarPaginaActual();
    }
}


function seleccionarPaginaActual() {
    var aPagina = document.getElementById("a" + indiceActualPagina);
    if (aPagina != null) {
        aPagina.className += " seleccionado";
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

function configurarControles() {
    var btnSeleccionarCuenta = document.getElementById("btnSeleccionarCuenta");
    btnSeleccionarCuenta.onclick = function () {
        if (idPasar != "") {
            var hdfCue = window.parent.document.getElementById("hdfCue");
            hdfCue.value = idPasar;
            hdfCue.onchange();
            window.parent.abrirPopup('PopupCuenta');
            limpiar();
        }
        else {
            return false;
        }
    }

    var btnCancelarCuenta = document.getElementById("btnCancelarCuenta");
    btnCancelarCuenta.onclick = function () {
        limpiar();
        window.parent.abrirPopup('PopupCuenta');
    }
}

function configurarChecks() {
    var rdnCuentaContable = document.getElementsByName("rdnCuentaContable");
    var nCampos = rdnCuentaContable.length;
    for (var x = 0; x < nCampos; x++) {
        rdnCuentaContable[x].onclick = function () {
            idPasar = this.getAttribute("data-campo");
        }
    }
}


function limpiar() {
    var rdnCuentaContable = document.getElementsByName("rdnCuentaContable");
    var nCampos = rdnCuentaContable.length;
    for (var x = 0; x < nCampos; x++) {
        if (rdnCuentaContable[x].checked) {
            rdnCuentaContable[x].checked = false;
            break;
        }
    }
    idPasar = "";
    paginar(0);
    indiceActualBloque = 0;
}