var $$multiselect = function (controlName) {
	var ctrl = document.getElementById(controlName);
	var $create = function (_data) {
		var o = _data || {};
		var height;
		var content = '<div style="min-width:3em !important"><i id="MultiSelect' + controlName + '" class="Icons fa-plus"></i></div><div style="display:none"><ul></ul></div>';
		if (!ctrl.classList.contains('jtse-tags')) ctrl.classList.add('jtse-tags');
		ctrl.innerHTML = content;
		var ctrlChild = document.getElementById('MultiSelect' + controlName);
		height = o.Height != undefined ? o.Height : 55;
		ctrl.children[0].style.height = height + 'px';
		ctrl.children[0].children[0].onclick = function () {
			var divContenido = document.getElementById("divContenido");
			this.parentElement.nextElementSibling.style.display = 'block';
			if (divContenido) {
				var alto = divContenido.getBoundingClientRect();
				var altomul = this.parentElement.nextElementSibling.getBoundingClientRect();
				var dif = alto.height - altomul.height;
				if (altomul.height >= (alto.height-dif)) {
					var altowrap = this.parentElement.getBoundingClientRect();
					this.parentElement.nextElementSibling.style.top = -(altomul.height+2) + "px";
				} else {
					this.parentElement.nextElementSibling.style.top = "";
				}
			}
		};
		ctrl.onmouseleave = function () { this.children[1].style.display = 'none'; };
		o.ListItems = o.ListItems || [];
		o.SeparatorRegOutput = o.SeparatorRegOutput || '¬';
		o.SeparatorOutput = o.SeparatorOutput || '¦';
		o.Separator = o.Separator || '¦';
		$['jtse-multiselect-' + controlName] = o;
		if (o.ListItems.length > 0) listItems();
	};
	var listItems = function () {
		var o = $['jtse-multiselect-' + controlName];
		if (o.ListItems.length > 0) {
			var separator = o.Separator;
			var list = o.ListItems.slice();
			var cf = document.createDocumentFragment(), d, li;
			for (var i = 0; i < list.length; i++) {
				d = list[i].split(separator);
				li = document.createElement('LI');
				li.setAttribute('data-order', i);
				li.setAttribute('data-value', d[0]);
				li.setAttribute('data-desc', d[1]);
				li.innerHTML = d[1];
				li.onclick = function () { addItem(this); };
				cf.appendChild(li);
			}
			ctrl.children[1].children[0].appendChild(cf);
		}
	};
	var addItem = function (obj) {
		var lis = ctrl.children[1].children[0].children;
		var nReg = lis.length, cont = 0;
		for (var i = 0; i < nReg; i++) {
			if (lis[i].getAttribute('data-value') == obj.getAttribute('data-value')) {
				lis[i].style.display = 'none';
				var spn1 = document.createElement("SPAN");
				spn1.className = "tag label label-info";
				spn1.setAttribute("data-value", obj.getAttribute('data-value'));
				spn1.textContent = lis[i].getAttribute('data-desc');
				var spn2 = document.createElement("SPAN");
				spn2.setAttribute("data-order", lis[i].getAttribute('data-order'));
				spn2.setAttribute("data-role", "remove");
				spn2.onclick = function () { deleteItem(this); };
				spn1.appendChild(spn2);
				ctrl.firstElementChild.insertBefore(spn1, ctrl.children[0].lastElementChild);
				ctrl.firstElementChild.scrollTop = ctrl.firstElementChild.scrollHeight;
				if ($['jtse-multiselect-' + ctrl.id].AddEvent != undefined) {
					var o = $['jtse-multiselect-' + ctrl.id];
					$[o.Namespace][o.AddEvent](obj);
				}
			}
			if (lis[i].style.display == 'none') cont++;
		}
		if (nReg == cont) ctrl.firstElementChild.lastElementChild.style.display = 'none';
		else ctrl.firstElementChild.lastElementChild.style.display = '';
	};
	var deleteItem = function (obj) {
		var lis = ctrl.children[1].children[0].children;
		var nReg = lis.length, cont = 0;
		for (var i = 0; i < lis.length; i++) {
			if (lis[i].getAttribute('data-order') == obj.getAttribute('data-order')) {
				lis[i].style.display = 'block';
				ctrl.firstElementChild.removeChild(obj.parentElement);
			}
			if (lis[i].style.display == 'none') cont++;
		}
		ctrl.firstElementChild.lastElementChild.style.display = '';
		if ($['jtse-multiselect-' + ctrl.id].DeleteEvent != undefined) {
			var o = $['jtse-multiselect-' + ctrl.id];
			$[o.Namespace][o.DeleteEvent](obj);
		}
	};
	var $getValues = function () {
		var spns = ctrl.firstElementChild.children;
		var c = [], c2 = '', separatorRegOutput = $['jtse-multiselect-' + controlName].SeparatorRegOutput, separatorOutput = $['jtse-multiselect-' + controlName].SeparatorOutput;
		for (var i = 0; i < spns.length - 1; i++) {
			c2 = spns[i].getAttribute('data-value');
			c2 += separatorOutput;
			c2 += spns[i].childNodes[0].textContent;
			c.push(c2);
		}
		return c.join(separatorRegOutput);
	};
	var $setListItems = function (list) {
		if (list != undefined) {
			ctrl.children[1].children[0].innerHTML = '';
			$['jtse-multiselect-' + controlName].ListItems = list.slice();
			listItems();
		}
	};
	var $setValues = function (list) {
		var lis = ctrl.children[1].children[0].children;
		var nReg = list.length, nReg2 = lis.length, cont = 0;
		var i = ctrl.children[0].lastElementChild;
		ctrl.children[0].innerHTML = '';
		ctrl.children[0].appendChild(i);
		for (var j = 0; j < nReg2; j++) lis[j].style.display = 'block';
		for (var i = 0; i < nReg; i++) {
			for (var j = 0; j < nReg2; j++) {
				if (list[i] == lis[j].getAttribute('data-value')) {
					lis[j].style.display = 'none';
					var spn1 = document.createElement("SPAN");
					spn1.className = "tag label label-info";
					spn1.setAttribute("data-value", lis[j].getAttribute('data-value'));
					spn1.textContent = lis[j].getAttribute('data-desc');
					var spn2 = document.createElement("SPAN");
					spn2.setAttribute("data-order", lis[j].getAttribute('data-order'));
					spn2.setAttribute("data-role", "remove");
					spn2.onclick = function () { deleteItem(this); };
					spn1.appendChild(spn2);
					ctrl.firstElementChild.insertBefore(spn1, ctrl.children[0].lastElementChild);
					ctrl.firstElementChild.scrollTop = ctrl.firstElementChild.scrollHeight;
				}
			}
		}
		for (var j = 0; j < nReg2; j++) {
			if (lis[j].style.display == 'none') cont++;
		}
		if (nReg2 == cont) ctrl.firstElementChild.lastElementChild.style.display = 'none';
		else ctrl.firstElementChild.lastElementChild.style.display = '';
	};
	var $setHistory = function (list) {
		ctrl.setAttribute('data-history', list);
	};
	var $reset = function () {
		var i = ctrl.children[0].lastElementChild;
		i.value = '';
		ctrl.children[0].innerHTML = '';
		ctrl.children[0].appendChild(i);
	};
	return {
		create: function (o) {
			$create(o);
		},
		getValues: function () {
			return $getValues();
		},
		setListItems: function (o) {
			$setListItems(o);
		},
		setValues: function (o) {
			$setValues(o);
		},
		setHistory: function (o) {
			$setHistory(o);
		},
		reset: function () {
			$reset();
		}
	};
};