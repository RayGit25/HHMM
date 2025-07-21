var urlBase = "";
var listaMenuPerfil;
var matrizMenuAccion = [];
var matriz = [];
var matrizHijos = [];
var matrizCheks = [];
var matrizSeleccionados = [];
var LL = {
	ajax: function (url, type, success, text) {
		requestServer(url, type, success, text);
	}
}

var cabeceras = ["Módulo", "Opción", "Descripción", "Acción", "Activar"];
var anchos = [17, 17, 17, 10, 5];
var ss = "";
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

window.onload = function () {

	var pos1 = window.location.href.indexOf("Administracion");
	urlBase = window.location.href.substring(0, pos1);
	ss = window.parent.document.getElementById("iss").value;
	var url = urlBase + "Administracion/obtenerListasMenuPerfil/?ss=" + ss;
	LL.ajax(url, "get", mostrarPerfilMenus);
	crearTabla();

};

//function enviarServidor(url, metodo) {
//	var xhr = new XMLHttpRequest();
//	xhr.open("get", url, true);
//	xhr.send();
//	xhr.onreadystatechange = function () {
//		if (xhr.readyState == 4 && xhr.status == 200) {
//			metodo(xhr.responseText);
//		}
//	}
//}

var HTE = {
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

function llenarCombo(lista, nombreCombo) {
	var n = lista.length;
	var contenido = "<option value='0'>Seleccione</option>";
	var campos;
	for (i = 0; i < n; i++) {
		campos = lista[i].split("|");
		contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
	}
	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function mostrarPerfilMenus(rpta) {
	if (rpta != "") {
		var listas = rpta.split("¬");
		var listaPerfil = listas[0].split(";");
		llenarCombo(listaPerfil, "cboPerfil");
		var listaMenu = listas[1].split(";");
		var listaPrivilegio = listas[3].split(";");
		//console.log(listaPrivilegio);
		//mostrarTreeCheck(listaMenu);
		//seleccionarTreeCheck();
		//expandirColapsarTreeCheck();
		listaMenuPerfil = listas[2].split(";");
		if (matrizSeleccionados.length == 0) {
			crearMatriz(listaMenu, true);
		}
		matrizCheks = [];
		crearMatriz(listaPrivilegio, false);
		mostrarMatriz();
		configurarControles();
		var listaMenuAccion = listas[4].split(";");
		if (listaMenuAccion != "") {
			matrizMenuAccion = [];
			var campos;
			for (var x = 0; x < listaMenuAccion.length; x++) {
				campos = listaMenuAccion[x].split("|");
				matrizMenuAccion.push([campos[0] * 1, campos[1] * 1, campos[2] * 1, campos[3]]);
			}
		}
		//document.getElementById("cboPerfil").onchange();
	}
}

//function mostrarTreeCheck(lista) {
//	var filas = lista.length;
//	var campos;
//	var ul = $("#ulMenu");
//	ul.html("");
//	var li;
//	for (var i = 0; i < filas; i++) {
//		campos = lista[i].split("|");
//		li = "<li data-id='" + campos[0] +
//            "'><input type='checkbox' /><span style='cursor:pointer'>" +
//            campos[1] + "</span></li>";
//		var padre;
//		if (campos[3] == "0") padre = ul;
//		else {
//			var $elem = ul.find("li[data-id='" + campos[3] + "']");
//			if ($elem.find("ul").length == 0) $elem.append("<ul>");
//			padre = $elem.find("ul:first");
//		}
//		padre.append(li);
//	}
//}

//function seleccionarTreeCheck() {
//	$(function () {
//		$("input[type='checkbox']").change(function () {
//			if (this.id != "chktodos") {
//				$(this).siblings('ul')
//					   .find("input[type='checkbox']")
//					   .prop('checked', this.checked);
//				//if (this.id != 'chkPrincipal') {
//				//this.parentNode.parentNode.previousSibling.previousSibling.checked = this.checked;
//				//}
//				var con = 0;
//				var padre = this.parentNode.parentNode.parentNode.firstChild;
//				if (padre != undefined) {
//					for (var i = 0; i < padre.nextSibling.nextSibling.childNodes.length; i++) {
//						var chk = padre.nextSibling.nextSibling.childNodes[i].firstChild;
//						if (chk.checked) con++;
//					}
//					switch (con) {
//						case 0:
//							padre.checked = false;
//							break;
//						default:
//							padre.checked = true;
//							break;
//					}
//				}
//				limpiarformulario();
//			}
//		});
//	});
//}

//function expandirColapsarTreeCheck() {
//	$(function () {
//		$('#ulPrincipal').find('span').click(function (e) {
//			$(this).parent().children('ul').toggle();
//		});
//	});
//}

function buscarMenuPerfil(idPerfil, idMenu) {
	var filas = listaMenuPerfil.length;
	var campos;
	//var nCampos;
	//var exito = false;
	//for (i = 0; i < filas; i++) {
	//	campos = listaMenuPerfil[i].split("|");
	//	if (campos[0] == idPerfil && campos[1] == idMenu) {
	//		exito = true;
	//		break;
	//	}
	//}
	var matrizMenuPerfil = [];
	for (y = 0; y < filas; y++) {
		campos = listaMenuPerfil[y].split("|");
		if (campos[0] == idPerfil) {
			matrizMenuPerfil.push([(campos[0] * 1), (campos[1] * 1)]);
		}
	}
	var encontrado = true;
	var RD = document.getElementsByClassName("RD");
	var control;
	for (x = 0; x < matrizSeleccionados.length; x++) {
		for (var y = 0; y < matrizMenuPerfil.length; y++) {
			if (matrizMenuPerfil[y][0] == matrizSeleccionados[x][0] && matrizMenuPerfil[y][1] == matrizSeleccionados[x][1]) {
				encontrado = false;
				matrizSeleccionados[x][2] = 1;
				RD[x].checked = true;
				control = document.getElementById("IX" + RD[x].getAttribute("data-id"));
				if (control != null) {
					control.style.display = "";
				}
				break;
			}
		}

		if (encontrado) {
			matrizSeleccionados[x][2] = 0;
			RD[x].checked = false;
			encontrado = true;
			control = document.getElementById("IX" + RD[x].getAttribute("data-id"));
			if (control != null) {
				control.style.display = "none";
			}
		}
	}
	//return exito;
}

function mostrarMenusPorPerfil(cboPerfil) {
	var idPerfil = cboPerfil.value;
	var btnGrabar = document.getElementById("btnGrabar");
	var btnprivilegios = document.getElementById("btnprivilegios");
	
	if (idPerfil == "0") {
		btnGrabar.style.display = "none";
		btnprivilegios.style.display = "none";
	}
	else {
		btnGrabar.style.display = "inline";
		btnprivilegios.style.display = "none";
	}
	var idMenu;
	var exito;
	for (var x = 0; x < matrizSeleccionados.length; x++) {
		matrizSeleccionados[x][0] = idPerfil * 1;
	}
	buscarMenuPerfil(idPerfil, idMenu);
	if (matrizMenuAccion.length > 0) {
		for (var x = 0; x < matrizCheks.length; x++) {
			for (var y = 0; y < matrizMenuAccion.length; y++) {
				if (matrizMenuAccion[y][3] == idPerfil && matrizMenuAccion[y][1] == matrizCheks[x][3]) {
					matrizCheks[x][2] = matrizMenuAccion[y][2];
					valor = false;
					break;
				}
			}
		}
	}
	
}

function mostrarGrabar(rpta) {
	var spnMensaje = document.getElementById("spnMensaje");
	if (rpta != "") {
		var cboPerfil = document.getElementById("cboPerfil");
		var idPerfil = cboPerfil.value;
		mostrarPerfilMenus(rpta);
		cboPerfil.value = idPerfil;
		cboPerfil.onchange();
		//mostrarMenusPorPerfil(cboPerfil);
		mostraralerta("Perfil fue actualizado.");
	}
	else {
		mostraralerta("Ocurrió un error al actualizar el Perfil.");
	}

}

function limpiarformulario() {
	var spnMensaje = document.getElementById('spnMensaje');
	spnMensaje.innerHTML = "";
	var RDX = document.getElementsByName("RDX");
	for (var x = 0; x < RDX.length; x++) {
		RDX[x].checked = true;
		RDX[x].click();
	}
}

function configurarControles() {

	var cboPerfil = document.getElementById("cboPerfil");
	cboPerfil.onchange = function () {
		var iconos = document.getElementsByClassName("Icons");
		for (var x = 0; x < iconos.length; x++) {
			iconos[x].className = "Icons fa-plus-square";
		}
		var checks = document.getElementsByClassName("RD");
		for (var x = 0; x < checks.length; x++) {
			if (this.value != "0") {
				checks[x].disabled = false;
			}
			else {
				checks[x].disabled = true;
			}
		}
		limpiarformulario();
		mostrarMenusPorPerfil(this);
	}

	var btnGrabar = document.getElementById("btnGrabar");
	btnGrabar.onclick = function () {
		var contenido = "";
		var n = matrizSeleccionados.length;
		var nx = matrizCheks.length;
		var strDatos = "";
		for (var x = 0; x < nx; x++) {
			strDatos += matrizCheks[x][3] + "|" + matrizCheks[x][0] + "|" + matrizCheks[x][2];
			if (x < (nx - 1)) {
				strDatos += "¬";
			}
		}
		for (var x = 0; x < n; x++) {
			contenido += matrizSeleccionados[x][0] + "," + matrizSeleccionados[x][1] + "," + matrizSeleccionados[x][2];
			if (x < (n - 1)) {
				contenido += ";";
			}
		}
		contenido = contenido + "_" + strDatos+"_"+document.getElementById("cboPerfil").value;
		//console.log(contenido);
		var pos1 = window.location.href.indexOf("Administracion");
		urlBase = window.location.href.substring(0, pos1);
		ss = window.parent.document.getElementById("iss").value;
		var url = urlBase + "Administracion/grabarMenuPerfil/?ss=" + ss;

		//var hdfIdsesion = window.parent.document.getElementById("hdfIdsesion");
		var xhr = new XMLHttpRequest();
		xhr.open("post", url, true);
		var frm = new FormData();
		frm.append("valores", contenido);
		xhr.send(frm);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				mostrarGrabar(xhr.responseText);
			}

			if (xhr.status == 404 || xhr.status == 0) {
				var urlPadre = window.parent.parent.location.href
				var pos = window.parent.parent.location.href.indexOf("Principal");
				var urlBase = urlPadre.substring(0, pos);
				urlBase += "Seguridad/Login";
				window.parent.parent.location.href = urlBase;
			}
		}
		var iconos = document.getElementsByClassName("Icons");
		for (var x = 0; x < iconos.length; x++) {
			iconos[x].className = "Icons fa-plus-square";
		}
	}

	//var chktodos = document.getElementById("chktodos");
	//chktodos.onclick = function () {
	//	var RDX = document.getElementsByName("RDX");
	//	if (this.checked) {
	//		for (var y = 0; y < RDX.length; y++) {
	//			RDX[y].checked = false;
	//			RDX[y].click();
	//		}
	//	}
	//	else {
	//		for (var y = 0; y < RDX.length; y++) {
	//			RDX[y].checked = true;
	//			RDX[y].click();
	//		}
	//	}
	//	for (var x = 0; x < matrizCheks.length; x++) {
	//		if (this.checked) matrizCheks[x][2] = 1;
	//		else matrizCheks[x][2] = 0;
	//		break;
	//	}
	//}

	var RDX = document.getElementsByName("RDX");
	var n = RDX.length;
	for (var x = 0; x < n; x++) {
		RDX[x].onclick = function () {
			var valor = this.getAttribute("data-id");
			var RDXH = document.getElementsByClassName("RDXH" + valor);
			var checks = document.getElementsByName("RDI" + valor);
			var n = matriz.length;
			//console.log(matriz);
			var matrizPrincipales = [];
			for (var x = 0; x < n; x++) {
				if (matriz[x][3] == valor) {
					matrizPrincipales.push(matriz[x][0]);
				}
				if (matriz[x][0] == valor) {
					if (this.checked) {
						matrizSeleccionados[x][2] = 1;
					}
					else {
						matrizSeleccionados[x][2] = 0;
					}
				}
			}
			if (this.checked) {
				if (checks != null) {
					for (var y = 0; y < checks.length; y++) {
						checks[y].checked = true;
					}
				}
				//for (var x = 0; x < matrizCheks.length; x++) {
				//	for (var z = 0; z < matrizPrincipales.length; z++) {
				//		if (matrizCheks[x][0] == matrizPrincipales[z]) {
				//			matrizCheks[x][2] = 1;
				//			break;
				//		}
				//	}
				//}
				for (var z = 0; z < RDXH.length; z++) {
					RDXH[z].checked = false;
					RDXH[z].click();
				}
			}
			else {
				if (checks != null) {
					var datos;
					for (var y = 0; y < checks.length; y++) {
						checks[y].checked = false;
					}
				}
				//for (var x = 0; x < matrizCheks.length; x++) {
				//	for (var z = 0; z < matrizPrincipales.length; z++) {
				//		if (matrizCheks[x][0] == matrizPrincipales[z]) {
				//			matrizCheks[x][2] = 0;
				//			break;
				//		}
				//	}
				//}

				//var chktodos = document.getElementById("chktodos");
				//chktodos.checked = false;
				for (var z = 0; z < RDXH.length; z++) {
					RDXH[z].checked = true;
					RDXH[z].click();
				}
			}
			//var RDX = document.getElementsByName("RDX");
			//var valor = true;
			//for (var z = 0; z < RDX.length; z++) {
			//	if (RDX[z].checked == false) {
			//		valor = false;
			//	}
			//}
			//if (valor) {
			//	var chktodos = document.getElementById("chktodos");
			//	chktodos.checked = true;
			//}

		}
	}

	var RDI = document.getElementsByClassName("RDI");
	for (var x = 0; x < RDI.length; x++) {
		RDI[x].onclick = function () {
			var valorRD = this.getAttribute("data-id") * 1;
			var mostrarIX = document.getElementById("IX" + valorRD);
			if (mostrarIX != null) {
				if (this.checked) {
					mostrarIX.style.display = "";
				}
				else {
					var valor = this.className.split("RDXH")[1] * 1;
					var lista = document.getElementsByClassName("OPX" + valorRD);
					while (lista.length > 0) {
						lista[0].style.display = "none";
						lista[0].parentNode.removeChild(lista[0]);
					}

					//if (mostrarIX.className.indexOf("minus") > -1) control.className = mostrarIX.className.replace("minus", "plus");
					//else mostrarIX.className = mostrarIX.className.replace("plus", "minus");


					//expandir(valorRD.toString(), valor);
					mostrarIX.style.display = "none";
				}
			}

			for (var y = 0; y < matrizSeleccionados.length; y++) {
				if (valorRD == matrizSeleccionados[y][1]) {
					if (this.checked) matrizSeleccionados[y][2] = 1;
					else matrizSeleccionados[y][2] = 0;
					break;
				}
			}
			var identpadre = this.className.split(" ")[2].split("RDXH").join("").trim() * 1;
			var primos = document.getElementsByClassName("RDXH" + identpadre);
			var valor = 0;
			var padre = document.getElementById("RDP" + identpadre);
			for (var x = 0; x < primos.length; x++) {
				if (primos[x].checked) {					
					padre.checked = true;
					

					for (var y = 0; y < matrizSeleccionados.length; y++) {
						if (matrizSeleccionados[y][1] == identpadre) {
							matrizSeleccionados[y][2] = 1;
							break;
						}
					}
					valor = 1;
					break;
				}
			}
			if (valor == 0) {
					padre.checked = false;				
				
				for (var y = 0; y < matrizSeleccionados.length; y++) {
					if (matrizSeleccionados[y][1] == identpadre) {
						matrizSeleccionados[y][2] = 0;
						break;
					}
				}
			}
		}
	}

	//var btnGrabarPrivilegio = document.getElementById("btnGrabarPrivilegio");
	//btnGrabarPrivilegio.onclick = function () {
	//	var strDatos = "";
	//	var n = matrizCheks.length;
	//	for (var x = 0; x < n; x++) {
	//		strDatos += matrizCheks[x][3] + "|" + matrizCheks[x][0] + "|" + matrizCheks[x][2];
	//		if (x != (n - 1)) {
	//			strDatos += "¬";
	//		}
	//	}
	//	console.log(strDatos);
	//	var url = urlBase + "Administracion/actualizarMenuAccion/?ss=" + ss;
	//	HTE.ajax(url, "post", mostrarRespuesta, strDatos);
	//	abrirPopup('PopupPrivilegio');
	//}
}

function mostrarRespuesta(rpta) {
	if (rpta != "") {
		mostraralerta("Se han grabado con éxito los privilegios.");
	}
	else {
		mostraralerta("Ocurrió un error al actualizar los privilegios.");
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

function abrirPopup(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}

function crearMatriz(lista, opcion) {
	var nRegistros = lista.length;
	var nCampos;
	var campos;
	var x = 0;
	var valorid = "";
	var l = 0;
	if (opcion) {
		matriz = [];
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("|");
			if (campos[3] == "0") {
				matriz[x] = [];
				valorid = campos[0];
				nCampos = campos.length;
				for (j = 0; j < (nCampos - 2) ; j++) {
					if (j != 2) {
						if (isNaN(campos[j])) matriz[x][j] = campos[j];
						else matriz[x][j] = campos[j] * 1;
					}
					else {
						matriz[x][j] = "";
					}
				}
				matrizSeleccionados.push([-1, matriz[x][0], 0]);
				l = (x + 1);
				for (z = 0; z < nRegistros; z++) {
					campos = lista[z].split("|");
					if (campos[3] == valorid) {
						matriz[l] = [];
						for (k = 0; k < (nCampos - 2) ; k++) {
							if (k != 2) {
								if (isNaN(campos[k])) matriz[l][k] = campos[k];
								else matriz[l][k] = campos[k] * 1;
							}
							else {
								matriz[l][k] = "";
							}
						}
						matrizSeleccionados.push([-1, matriz[l][0], 0]);
						l++;
					}

				}
				x = l;
				//x++;
			}
		}
		//var nRegistrosMatriz=matriz.length;
		//for (l = 0; l < nRegistrosMatriz; l++) {
		//	matrizSelecionados.push(-1, matriz[l][0], 0);
		//}
	}
	else {
		matrizHijos = [];
		matrizCheks = [];
		for (i = 0; i < nRegistros; i++) {
			campos = lista[i].split("|");
			matrizHijos[x] = [];
			matrizCheks[x] = [];
			nCampos = campos.length;
			for (j = 0; j < nCampos ; j++) {
				if (j != 0) {
					if (j == 2) {
						matrizHijos[x][j] = campos[j];
					}
					else {
						matrizHijos[x][j] = campos[j];
						if (j == 1) {
							matrizCheks[x][1] = campos[j];
						}
						if (j == 3) {
							matrizCheks[x][2] = campos[3] * 1;
						}
						if (j == 4) {
							matrizCheks[x][3] = campos[j] * 1;
						}
					}
				}
				else {
					matrizHijos[x][j] = campos[j] * 1;
					matrizCheks[x][j] = campos[j] * 1;
				}
			}
			//matrizCheks[x][3] = i;
			x++;
		}
	}
}

function crearTabla() {
	var nCampos = cabeceras.length;
	var contenido = "<table class='tabla-general' style='width:50%;margin:0 auto;'>";
	contenido += "<thead class='tabla-FilaCab'>";
	contenido += "<tr class='cabecera'>";
	contenido += "<th style='width:5%;text-align:center'></th>";
	for (var j = 0; j < nCampos; j++) {
		contenido += "<th style='width:";
		contenido += anchos[j];
		contenido += "%'>";
		contenido += cabeceras[j];
		contenido += "</th>";
	}
	contenido += "</tr>";
	contenido += "</thead>";
	contenido += "<tbody id='tbPrivilegio' class='tabla-FilaCuerpo'>";
	contenido += "</tbody>";
	contenido += "<tfoot>";
	contenido += "<tr><td id='tdPaginas' colspan='";
	contenido += (nCampos + 1).toString();
	contenido += "'></td></tr>";
	contenido += "</tfoot>";
	contenido += "</table>";
	document.getElementById("divPrivilegio").innerHTML = contenido;
}

function mostrarMatriz() {
	var contenido = "";
	var n = matriz.length;
	var valor = 0;
	if (n > 0) {
		var nCampos = matriz[0].length;
		for (var i = 0; i < n; i++) {
			if (i < n) {
				if (matriz[i][3] == 0) {
					contenido += "<tr class='FilaDatos'>";
					contenido += "<td style='text-align:center'><input type='checkbox' class='RD' name='RDX' data-id='";
					contenido += matriz[i][0];
					contenido += "' id='RDP";
					contenido += matriz[i][0];
					contenido += "' disabled=true/></td><td colspan='5'>";
					contenido += matriz[i][1];
					contenido += "</td></tr>";
					valor = matriz[i][0];
					for (var j = (i + 1) ; j < n; j++) {
						if (matriz[j][3] == valor) {
							contenido += "<tr id='OPX";
							contenido += matriz[j][0];
							contenido += "'><td style='text-align:center' colspan='2'></td><td colspan='4'><input type='checkbox' class='RDI RD RDXH";
							contenido += matriz[i][0];
							contenido += "' data-id='";
							contenido += matriz[j][0];
							contenido += "' id='RDP";
							contenido += matriz[j][0];
							contenido += "' disabled=true/>";
							if (buscarHijoMatriz(matriz[j][0])) {
								contenido += "&nbsp;<span class='Icons fa-plus-square' id='IX";
								contenido += matriz[j][0];
								contenido += "' onclick='expandir(\"";
								contenido += matriz[j][0];
								contenido += "\",";
								contenido += valor;
								contenido += ")' style='display:none'></span>&nbsp;";
							}
							contenido += matriz[j][1];
							contenido += "</td>";
						}
						else {
							i = (j - 1);
							break;
						}
					}
				}
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
	document.getElementById("tbPrivilegio").innerHTML = contenido;
}


function buscarHijoMatriz(id) {
	var n = matrizHijos.length;
	var valor = false;
	for (var x = 0; x < n; x++) {
		if (matrizHijos[x][0] == id) {
			valor = true;
			break;
		}
	}
	return valor;
}

function habilitarpadre(id, cx) {
	var control = document.getElementById(id);
	var check = id.split("RDI").join("").trim() * 1;
	if (control.checked) matrizCheks[cx][2] = 1;
	else matrizCheks[cx][2] = 0;
	//for (var x = 0; x < checks.length; x++) {
	//	if (checks[x].checked) {
	//		opcion = false;
	//		break;
	//	}
	//}

	//if (opcion) {
	//	var valor = id.split("RDI").join("").trim();
	//	var padre = document.getElementById("RDP" + valor);
	//	padre.checked = true;
	//	padre.click();
	//}
	//else {
	//	var valor = id.split("RDI").join("").trim();
	//	var padre = document.getElementById("RDP" + valor);
	//	padre.checked = true;
	//	var chktodos = document.getElementById("chktodos");
	//	chktodos.checked = true;
	//}
}

function expandir(id, ob) {
	var control = document.getElementById("IX" + id);

	if (control.className.indexOf("plus") > -1) {
		var contenido = "";
		var n = matrizHijos.length;
		var checkpadre = document.getElementById("RDP" + ob)
		for (var y = 0; y < n; y++) {
			if ((id * 1) == matrizHijos[y][0]) {
				contenido += "<tr class='OPX";
				contenido += id;
				contenido += "'><td colspan='3'></td><td>";
				contenido += matrizHijos[y][1];
				contenido += "</td><td>";
				contenido += matrizHijos[y][2];
				contenido += "</td><td style='text-align:center'><input type='checkbox' id='RDI";
				contenido += matrizCheks[y][3];
				contenido += "' name='RDI";
				contenido += ob
				contenido += "' ";
				if (matrizCheks[y][2] == 1) {
					contenido += "checked";
				}
				contenido += " onclick='habilitarpadre(\"RDI";
				contenido += matrizCheks[y][3];
				contenido += "\",";
				contenido += y;
				contenido += ")' data-matriz='";
				contenido += matrizHijos[y][0];
				contenido += "|";
				contenido += matrizHijos[y][1];
				contenido += "' class='chkToggle'/><label for='RDI";
				contenido += matrizCheks[y][3];
				contenido += "'></label></td>";
				if (matrizHijos[y + 1] == undefined) {
					break;
				}
				else {
					if (matrizHijos[y][0] != matrizHijos[y + 1][0]) {
						break;
					}
				}
			}
		}
		if (contenido != "") {
			var d1 = document.getElementById("OPX" + id);
			d1.insertAdjacentHTML('afterend', contenido);
		}
	}
	else {
		var lista = document.getElementsByClassName("OPX" + id);
		while (lista.length > 0) {
			lista[0].style.display = "none";
			lista[0].parentNode.removeChild(lista[0]);
		}
	}
	if (control.className.indexOf("minus") > -1) control.className = control.className.replace("minus", "plus");
	else control.className = control.className.replace("plus", "minus");
}