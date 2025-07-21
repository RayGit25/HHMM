var btnUsuDet, UsuDet, btnToggle, menu, listaMenu, ss, urlold;
window.onload = function () {
	var ifrPrincipal = document.getElementById("ifrPrincipal");
	var doc = ifrPrincipal.contentDocument || ifrPrincipal.contentWindow.document;
	var p = document.createElement('p');
	p.textContent = "v. " + document.getElementById("hvs").value;
	p.style.cssText = "position: fixed;bottom: 0px;right: 50px;font-size: 18px;font-weight: 300;letter-spacing: 1px;color: white;text-shadow: rgba(0, 0, 0, 0.8) 0px 14px 10px;";
	doc.body.appendChild(p);

	var doc = document;
	var pos1 = window.location.href.indexOf("Principal");
	var sucursal = document.getElementById("isuc").value.split("|")[1];
	var spnSucursal = document.getElementById("spnSucursal");
	spnSucursal.innerHTML = sucursal;


	urlold = location.protocol + "//" + window.location.host + document.getElementById("Ref").value;
	//var urlold = window.location.href.substring(0, pos1);
	ss = doc.getElementById("iss").value;
	var url = urlold + "Principal/crearMenus/?ss=" + ss;
	enviarServidor(url, mostrarMenu);

	btnUsuDet = document.getElementById("btnUsuDet");
	UsuDet = document.getElementById("usuDet");
	btnUsuDet.onclick = function () {
		UsuarioDetalle();
	};
	btnToggle = document.getElementById("btnToggle");
	btnToggle.onclick = function () {
		MinimizarMenu();
	};
	var ifr = document.getElementById("ifrPrincipal");
	ifr.onload = function () {
		var menu = document.getElementsByClassName("pcl-menu");
		menu[0].className = menu[0].className.replace(/(?:^|\s)activo(?!\S)/g, ' desactivo');
		ifr.style.paddingLeft = "0px";

	};
	var btnCamCon = document.getElementById("btnCamCon");
	btnCamCon.onclick = function () {
		OcultarUsuarioDetalle();
	};

	var btnSalir = document.getElementById("btnSalir");
	btnSalir.onclick = function () {
		//window.location.href = base + "Seguridad/Login";
		var url = urlold + "/Seguridad/CerrarSesion?ss=" + ss;
		enviarServidor(url, redirecionar);
	};
	var msg = document.getElementById("hmsg").value;
	if (msg.toLowerCase().indexOf("faltan") > -1) {
		mostraralerta(msg);
	}

	var ddlPrincipalSucursal = document.getElementById("ddlPrincipalSucursal");
	var lista = document.getElementById("lstSuc").value.split("¯");
	if (lista.length > 1 && lista != "") {
		llenarCombo(lista, "ddlPrincipalSucursal");
		ddlPrincipalSucursal.onchange = function () {
			if (this.value != "") {
				var url = window.location.href;
				if (url.indexOf('?') > -1) {
					url = urlold + "Principal/Inicio?ss=" + ss + "&sucursalId=" + this.value;
					window.location.href = url;
				}
			}
		}
	}
	else {
		ddlPrincipalSucursal.parentNode.removeChild(ddlPrincipalSucursal);
	}
}
function llenarCombo(matrizTabla, nombreCombo) {
	var contenido = "";
	var nRegistros = matrizTabla.length;
	var valor = "";
	contenido = "<option value=''>Seleccione</option>";
	for (var i = 0; i < nRegistros; i++) {
		valor = matrizTabla[i].split("|");
		contenido += "<option value='" + valor[0] + "'>" + valor[1] + "</option>";
	}

	var cbo = document.getElementById(nombreCombo);
	if (cbo != null) {
		cbo.innerHTML = contenido;
	}
}

function redirecionar() {
	window.location.href = urlold;
}

function UsuarioDetalle() {
	if (UsuDet.className.indexOf("desactivo") > -1) {
		UsuDet.className = UsuDet.className.replace(/(?:^|\s)desactivo(?!\S)/g, ' activo');
	}
	else {
		UsuDet.className = UsuDet.className.replace(/(?:^|\s)activo(?!\S)/g, ' desactivo');
	}
}

function OcultarUsuarioDetalle() {
	if (UsuDet.className.indexOf("activo") > -1) {
		UsuDet.className = UsuDet.className.replace(/(?:^|\s)activo(?!\S)/g, ' desactivo');
	}
}

function MinimizarMenu() {
	OcultarUsuarioDetalle();
	var menu = document.getElementsByClassName("pcl-menu");
	var cuerpo = document.getElementById("ifrPrincipal");
	if (menu[0].className.indexOf("desactivo") > -1) {
		menu[0].className = menu[0].className.replace(/(?:^|\s)desactivo(?!\S)/g, ' activo');
		cuerpo.style.paddingLeft = "270px";
	}
	else {
		menu[0].className = menu[0].className.replace(/(?:^|\s)activo(?!\S)/g, ' desactivo');
		cuerpo.style.paddingLeft = "0px";
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
function principal() {
	var url = window.parent.location.href;
	var pos = url.indexOf("Principal");
	window.parent.location.href = url.substring(0, pos) + "/Seguridad/Login";
}
function mostrarCerrarSesion(rpta) {
	if (rpta == "1") {
		window.close();
	}
}
function mostrarMenu(rpta) {
	if (rpta != "") {
		var ss = document.getElementById("iss").value;
		listaMenu = rpta.split("¬");
		var nRegistros = listaMenu.length;
		var campos;
		var nCampos;
		var divMenu = document.getElementById("divMenu");
		var contenido = "<ul id='ulMenu' style='cursor:pointer' class='menu'>";
		for (var i = 0; i < nRegistros; i++) {
			campos = listaMenu[i].split("¦");
			nCampos = campos.length;
			if (campos[3] == 0) {
				contenido += "<li class='mn-li'";
				contenido += "><a href='#'><i class='Icons fa-circle-o verde'></i><span>";
				contenido += campos[1];
				contenido += "</span><i class='Icons fa-angle-left der'></i></a>";
				contenido += crearMenu(campos[0], ss);
				contenido += "</li>";
			}
		}
		contenido += "</li></ul>";
		divMenu.innerHTML = contenido;
		configurarTree();
	}
}

function crearMenu(idMenu, sid) {
	var ref = document.getElementById("Ref").value;
	var nRegistros = listaMenu.length;
	var campos;
	var nCampos;
	var contenido = "<ul class='treeview-menu'>";
	for (var i = 0; i < nRegistros; i++) {
		campos = listaMenu[i].split("¦");
		nCampos = campos.length;
		if (campos[3] == idMenu) {
			contenido += "<li style='padding-left:10px' class='mn-li'";
			contenido += ">";
			if ((campos[0]*1) != 6) {
				contenido += "<a href='";
				if (campos[2] != "") {
					contenido += ref;
					//contenido += "Principal/"
					contenido += campos[2];
					contenido += "/?ss=";
					contenido += sid;
					contenido += "&id=";
					contenido += campos[0] * 1;
				}
				else {
					contenido += "#";
				}
			} else {
				contenido += "<a href='#";
				//contenido += campos[2];
			}
			contenido += "' ";
			if (campos[2] == "") {
			    if ((campos[0] * 1) != 6) {
			        contenido += "onclick='return false' ";
			    } else {
			        var url = urlold + "Seguridad/CerrarSesion?ss=" + ss;			        
			        contenido += "onclick='enviarServidor(\"";
			        contenido += url;
			        contenido +="\", redirecionar);'";
			    }
			}
			if ((campos[0] * 1) != 6) {
			    contenido += " target='ifrPrincipal'>";
			} else {
			    contenido += " >";
			}
			contenido += campos[1];
			contenido += "</a>";
			contenido += crearMenu(campos[0]);
			contenido += "</li>";
		}
	}
	contenido += "</ul>";
	return contenido;
}

function configurarTree() {
	var mn = document.getElementsByClassName("mn-li"), nmn = mn.length, li, lich;
	for (var i = nmn; i--;) {
		li = mn[i];
		li.onclick = function (e) {
			lich = e.currentTarget;
			if (lich.lastChild.nodeName == "UL") {

				//lich.lastChild.classList.add("activo");
				var hg = lich.lastChild.style.height;
				if (hg == "0px" || hg == "") {
					limpiarMenu();
					lich.lastChild.style.height = lich.lastChild.scrollHeight + "px";
				} else {
					lich.lastChild.style.height = "0px";
				}
			}
			if (e.target.nodeName == "A") {
				window.sessionStorage.clear();
			}
		}
	}
}
function limpiarMenu() {
	var mn = document.getElementsByClassName("mn-li"), nmn = mn.length, li, lich;
	for (var i = nmn; i--;) {
		li = mn[i];
		if (li.lastChild.nodeName == "UL") {
			li.lastChild.style.height = "0px";
			//li.lastChild.classList.remove("activo");
		}
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

function validarPermisoParametro(nombre) {

	return new Promise(function (resolve,reject) {

		var ss = document.getElementById("iss").value;

		var url = urlold + "Mantenimiento/parametrosValidar/?nombre=" + nombre + "&ss=" + ss;
		var type = "get";
		var text = "";
		var xhr = new XMLHttpRequest();
		xhr.open(type,  url);
		xhr.onreadystatechange = function () {
			if (xhr.status == 200 && xhr.readyState == 4) {
				if (xhr.responseText.length >= 6 && xhr.responseText.substr(0, 6) == "reload") {
					window.parent.parent.location.reload();
				}
				let rpta = xhr.responseText;
				if (rpta) {
					let ar = rpta.split("¦");
					if (ar[0] == "0") {
						document.getElementById("mensajeValidacionParametro").innerHTML = ar[1];
						abrirPopupParametro('PopupValidarParametro');
						resolve("0");
					} else {
						resolve("1");
					}
				} else {
					resolve("");
				}
	
		
			}
		}
		xhr.onerror = function () {
			resolve("");
		}
		if (type == "get") xhr.send();
		else {
			if (text != null && text != "") xhr.send(text);
		}

	}, () => { });


}
function abrirPopupParametro(popup) {
	var popup = document.getElementById(popup);
	if (popup.className.indexOf("Open") == -1) {
		popup.className += " Open";
	} else {
		popup.className = "PopUp";
	}
}