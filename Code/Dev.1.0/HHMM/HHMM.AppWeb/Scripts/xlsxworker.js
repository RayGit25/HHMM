﻿importScripts('jszip.js');
importScripts('xlsx.full.min.js');
postMessage({ t: "ready" });
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
onmessage = function (oEvent) {
    var v;
    try {
    	v = XLSX.read(ab2str(oEvent.data), { type: 'binary', dateNF: "dd/mm/yyyy" });
    } catch (e) { postMessage({ t: "e", d: e.stack }); }
    var res = { t: "xlsx", d: JSON.stringify(v) };
    var r = s2ab(res.d)[1];
    postMessage(r, [r]);
};
