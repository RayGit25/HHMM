var listaPrincipal = [];
var matrizPrincipal = [];
var cabecerasPrincipal = ["Sucursal", "Contrato", "Fecha Inicio", "Fecha Final", "Ind.Vcto.", "Ind.Aplic.", "Médico", "Especialidad", "Empresa", "Estado"];
var anchosPrincipal = [15, 8, 10, 10, 7, 7, 15, 12, 13, 10];
var matrizIndicePrincipal = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10];
var cabecerasProduccionFijoConfiguracion = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Factor", "Valor", "Pres", "Aplicación", "Estado"];
var anchosProduccionFijoConfiguracion = [5, 10, 10, 38, 7, 5, 5, 10, 10];
var matrizIndiceProduccionFijoConfiguracion = [1, 3, 4, 5, 6, 7, 8, 9, 10];

var cabecerasProduccionFijoBonificacion = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Factor", "Valor", "Pres", "Estado"];
var anchosProduccionFijoBonificacion = [5, 10, 10, 40, 5, 5, 5, 10];
var matrizIndiceProduccionFijoBonificacion = [1, 3, 4, 5, 6, 7, 8, 10];

var cabecerasProduccionFijoDescuento = ["Código", "Descripción", "Tipo Descuento", "Tipo Monto", "Importe", "Estado"];
var anchosProduccionFijoDescuento = [5, 40, 15, 15, 10, 10];
var matrizIndiceProduccionFijoDescuento = [1, 2, 3, 4, 5, 6];


var cabecerasProduccionEscalonada = ["Sec", "Fecha Inicio", "Fecha Final", "Servicio", "Tipo Rango", "Rango", "Tipo Factor", "Valor", "Estado"];
var anchosProduccionEscalonada = [5, 10, 10, 20, 10, 10, 10, 10, 15];
var matrizIndiceProduccionEscalonada = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cabecerasContratoFijo = ["Sec", "Concepto", "Valor", "Periodo", "Fecha Inicio", "Fecha Fin", "Estado"];
var anchosContratoFijo = [10, 20, 15, 10, 15, 15, 15];
var matrizIndiceContratoFijo = [1, 2, 3, 4, 5, 6, 7];
var cabecerasHorarioCalculo = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Día", "Día", "Turno", "Valor Hora", "Estado"];
var anchosHorarioCalculo = [5, 10, 10, 35, 5, 10, 5, 5, 10];
var matrizIndiceHorarioCalculo = [1, 3, 4, 5, 6, 7, 8, 9, 10];
var cabecerasHorarioBonificacion = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Día", "Tipo Valor", "Valor", "Estado"];
var anchosHorarioBonificacion = [5, 10, 10, 45, 5, 5, 5, 10];
var matrizIndiceHorarioBonificacion = [1, 3, 4, 5, 6, 7, 8, 9];
var cabecerasTurnoCalculo = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Valor", "Horas", "Valor", "Estado"];
var anchosTurnoCalculo = [5, 10, 10, 45, 5, 5, 5, 15];
var matrizIndiceTurnoCalculo = [1, 3, 4, 5, 6, 7, 8, 9];
var cabecerasTurnoBonificacion = ["Secuencia", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Valor", "Valor", "Estado"];
var anchosTurnoBonificacion = [5, 10, 10, 35, 10, 5, 10];
var matrizIndiceTurnoBonificacion = [1, 3, 4, 5, 6, 7, 8];
var cabecerasCompartido = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Valor", "Valor", "Estado"];
var anchosCompartido = [5, 10, 10, 45, 10, 5, 15];
var matrizIndiceCompartido = [1, 2, 3, 4, 5, 6, 8];
var cabecerasVacuna = ["Sec", "Fecha Inicio", "Fecha Final", "Condición", "Tipo Valor", "Valor", "Preset", "Estado"];
var anchosVacuna = [5, 10, 10, 40, 10, 5, 5, 15];
var matrizIndiceVacuna = [1, 2, 3, 4, 5, 6, 8];
var listaExcelLista1 = [];
var matrizExcelLista1 = [];
var cabecerasExcelLista1 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Observacion", "EstadoRegistro", "Observaciones"];
var anchosExcelLista1 = [5, 5, 5, 20, 5, 5, 25, 5, 25];
var matrizIndiceExcelLista1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var listaExcelLista2 = [];
var matrizExcelLista2 = [];
var cabecerasExcelLista2 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Turno", "Tipo Valor", "Valor 1", "Valor 2", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista2 = [5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 41, 42];
var listaExcelLista3 = [];
var matrizExcelLista3 = [];
var cabecerasExcelLista3 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista3 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista3 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista4 = [];
var matrizExcelLista4 = [];
var cabecerasExcelLista4 = ["Nro.", "Sucursal", "Código", "Médico", "Operador", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Día", "Tipo Feriado", "Fecha Feriado", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Turno", "Tipo Valor", "Valor", "Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista4 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista4 = [1, 2, 3, 4, 20, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 12, 13, 14, 16, 41, 42];
var listaExcelLista5 = [];
var matrizExcelLista5 = [];
var cabecerasExcelLista5 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista5 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista5 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista6 = [];
var matrizExcelLista6 = [];
var cabecerasExcelLista6 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Rango", "Rango 1", "Rango 2", "Servicio", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Valor", "Valor 1", "Valor 2", "Aplica", "Cálculo", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista6 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista6 = [1, 2, 3, 4, 5, 6, 31, 32, 33, 34, 7, 8, 9, 10, 11, 13, 14, 15, 35, 36, 16, 18, 41, 42];
var listaExcelLista7 = [];
var matrizExcelLista7 = [];
var cabecerasExcelLista7 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista7 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista7 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista8 = [];
var matrizExcelLista8 = [];
var cabecerasExcelLista8 = ["Nro.", "Sucursal", "Código", "Médico", "Concepto", "Fecha Inicio", "Fecha Fin", "Importe", "Periodo", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista8 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista8 = [1, 2, 3, 4, 19, 5, 6, 14, 37, 16, 18, 41, 42];
var listaExcelLista9 = [];
var matrizExcelLista9 = [];
var cabecerasExcelLista9 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista9 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista9 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista10 = [];
var matrizExcelLista10 = [];
var cabecerasExcelLista10 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Día", "Tipo Feriado", "Fecha Feriado", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Turno", "Valor Hora", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista10 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 12, 14, 16, 18, 41, 42];
var listaExcelLista11 = [];
var matrizExcelLista11 = [];
var cabecerasExcelLista11 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista11 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista11 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista12 = [];
var matrizExcelLista12 = [];
var cabecerasExcelLista12 = ["Nro.", "Sucursal", "Código", "Médico", "Operador", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Día", "Tipo Feriado", "Fecha Feriado", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Turno", "Tipo Valor", "Valor", "Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista12 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista12 = [1, 2, 3, 4, 20, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 12, 13, 14, 16, 41, 42];
var listaExcelLista13 = [];
var matrizExcelLista13 = [];
var cabecerasExcelLista13 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista13 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista13 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista14 = [];
var matrizExcelLista14 = [];
var cabecerasExcelLista14 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Cantidad Atención Mínima", "Monto de Atención Mínima", "Tipo Valor", "Valor", "Cantidad Horas", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista14 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista14 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 38, 39, 13, 14, 40, 16, 18, 41, 42];
var listaExcelLista15 = [];
var matrizExcelLista15 = [];
var cabecerasExcelLista15 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista15 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista15 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista16 = [];
var matrizExcelLista16 = [];
var cabecerasExcelLista16 = ["Nro.", "Sucursal", "Código", "Médico", "Operador", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Día", "Tipo Feriado", "Fecha Feriado", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Turno", "Tipo Valor", "Valor", "Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista16 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista16 = [1, 2, 3, 4, 20, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 12, 13, 14, 16, 41, 42];
var listaExcelLista17 = [];
var matrizExcelLista17 = [];
var cabecerasExcelLista17 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista17 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista17 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista18 = [];
var matrizExcelLista18 = [];
var cabecerasExcelLista18 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Valor", "Valor 1", "Valor 2", "Prestación", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista18 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 18, 41, 42];
var listaExcelLista19 = [];
var matrizExcelLista19 = [];
var cabecerasExcelLista19 = ["Nro.", "Sucursal", "Código", "Médico", "Código Prestación", "EstadoRegistro", "Observaciones"];
var anchosExcelLista19 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista19 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelLista20 = [];
var matrizExcelLista20 = [];
var cabecerasExcelLista20 = ["Nro.", "Sucursal", "Código", "Médico", "Fecha Inicio", "Fecha Fin", "Tipo Atención", "Tipo Admisión", "Tipo Paciente", "Aseguradora", "Especialidad", "Tipo Valor", "Valor 1", "Valor 2", "Artículo", "Tiempo Pago", "EstadoRegistro", "Observaciones"];
var anchosExcelLista20 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var matrizIndiceExcelLista20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 41, 42];
var listaExcelLista21 = [];
var matrizExcelLista21 = [];
var cabecerasExcelLista21 = ["Nro.", "Sucursal", "Código", "Médico", "Código Artículo", "EstadoRegistro", "Observaciones"];
var anchosExcelLista21 = [10, 10, 10, 30, 10, 10, 20];
var matrizIndiceExcelLista21 = [1, 2, 3, 4, 5, 6, 7];
var listaExcelPrestacion1 = [];
var matrizExcelPrestacion1 = [];
var cabecerasExcelPrestacion1 = ["Nro.", "Código", "Observación"];
var anchosExcelPrestacion1 = [20, 40, 40];
var matrizIndiceExcelPrestacion1 = [0, 1, 2];
var listaExcelPrestacion2 = [];
var matrizExcelPrestacion2 = [];
var cabecerasExcelPrestacion2 = ["Nro.", "Código", "Observación"];
var anchosExcelPrestacion2 = [20, 40, 40];
var matrizIndiceExcelPrestacion2 = [0, 1, 2];

var cabecerasProveedor = ["Especialidad", "Fe.Inicio", "Fe.Fin", "Tipo Admisión", "Tipo Persona", "Empresa/Médico", "Dias de Pago", "Documento Pago", "Tipo Impuesto", "Estado"];
var anchosProveedor = [10, 20, 20, 10, 10, 22, 10, 14, 12, 12];
var matrizIndiceProveedor = [1, 10, 11, 2, 3, 9, 5, 6, 7, 8]; //Chequear Indice
var matrizProveedor = [];
var listaProveedor = [];
var matrizExtornoMontoFijo = [];

/*====VARIABLES A CAMBIAR====*/
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
var idMedico = 0;
var CampoeliminarPrincipal = "";
var sucursalId;
var sucursal;
var OpcionDetalle = -1;
var listaChecks = [];
var instanciaActual = "";
var comboActual = "";
var listaConceptoMonto = [];
var listaTipoAdmision = [];
var listaPaciente = [];
var listaTurno = [];
var listaEspecialidad = [];
var listaTiempoPago = [];
var lstAdmisionProv = [],
    lstTipoDocPago = [],
    lstTipoServicioImpuesto = [],
    listaAplicacion = [],
    listaAplica = [],
    listaDescuento = [],
    listaTipoDescuento = [],
    listaTipoMonto = [],
    listaTipoPrestaciones = [],
    listaProduccionFijoDescuento = [],
    matrizProduccionFijoDescuento = [];


var listaModalidad = [];
var idContratoDetalle = "";
var OpcionValidar = "";
var idTabActual = 0;
var base64Archivo = "";
var DataArchivo = "";
var DataArchivocf = "";
var listaAseguradoraContrato = [];
var MedicoActual = "";
var idEmpresa = 0;
var AlmacenarClick = false;
var NombreControl = "";
var SoloVer = false;
var valorCopiaId;
var matrizSeguridad = [];
var tipoSeleccion = 0;
var listaCorreoProveedor = [];
var rutaContrato = "";
var arrayArchivos = [], arrayArchivosGrab = [], arrayArchivosGrabAdj = [];
var ArchivoActual;
var HayArchivos = false;
var ArchivoAgrabarActuales = [];

var ArchivoAgrabarActualescf = [], arrayArchivoscf = [];

var indiceActualPaginaPrincipal = 0,
    indiceActualPaginaProduccionFijoConfiguracion = 0,
    indiceActualPaginaProduccionFijoBonificacion = 0,
    indiceActualPaginaProduccionFijoDescuento = 0,

    indiceActualPaginaProduccionEscalonada = 0,
    indiceActualPaginaContratoFijo = 0,
    indiceActualPaginaHorarioCalculo = 0,
    indiceActualPaginaHorarioBonificacion = 0,
    indiceActualPaginaTurnoCalculo = 0,
    indiceActualPaginaTurnoBonificacion = 0,
    indiceActualPaginaCompartido = 0,
    indiceActualPaginaVacuna = 0,
    indiceActualPaginaExcelLista1 = 0,
    indiceActualPaginaExcelLista2 = 0,
    indiceActualPaginaExcelLista3 = 0,
    indiceActualPaginaExcelLista4 = 0,
    indiceActualPaginaExcelLista5 = 0,
    indiceActualPaginaExcelLista6 = 0,
    indiceActualPaginaExcelLista7 = 0,
    indiceActualPaginaExcelLista8 = 0,
    indiceActualPaginaExcelLista9 = 0,
    indiceActualPaginaExcelLista10 = 0,
    indiceActualPaginaExcelLista11 = 0,
    indiceActualPaginaExcelLista12 = 0,
    indiceActualPaginaExcelLista13 = 0,
    indiceActualPaginaExcelLista14 = 0,
    indiceActualPaginaExcelLista15 = 0,
    indiceActualPaginaExcelLista16 = 0,
    indiceActualPaginaExcelLista17 = 0,
    indiceActualPaginaExcelLista18 = 0,
    indiceActualPaginaExcelLista19 = 0,
    indiceActualPaginaExcelLista20 = 0,
    indiceActualPaginaExcelLista21 = 0,
    indiceActualPaginaExcelPrestacion1 = 0,
    indiceActualPaginaExcelPrestacion2 = 0,
    indiceActualPaginaProveedor = 0,
    indiceActualBloquePrincipal = 0,
    indiceActualBloqueProduccionFijoConfiguracion = 0,
    indiceActualBloqueProduccionFijoBonificacion = 0,
    indiceActualBloqueProduccionFijoDescuento = 0,
    indiceActualBloqueProduccionEscalonada = 0,
    indiceActualBloqueContratoFijo = 0,
    indiceActualBloqueHorarioCalculo = 0,
    indiceActualBloqueHorarioBonificacion = 0,
    indiceActualBloqueTurnoCalculo = 0,
    indiceActualBloqueTurnoBonificacion = 0,
    indiceActualBloqueCompartido = 0,
    indiceActualBloqueVacuna = 0,
    indiceActualBloqueExcelLista1 = 0,
    indiceActualBloqueExcelLista2 = 0,
    indiceActualBloqueExcelLista3 = 0,
    indiceActualBloqueExcelLista4 = 0,
    indiceActualBloqueExcelLista5 = 0,
    indiceActualBloqueExcelLista6 = 0,
    indiceActualBloqueExcelLista7 = 0,
    indiceActualBloqueExcelLista8 = 0,
    indiceActualBloqueExcelLista9 = 0,
    indiceActualBloqueExcelLista10 = 0,
    indiceActualBloqueExcelLista11 = 0,
    indiceActualBloqueExcelLista12 = 0,
    indiceActualBloqueExcelLista13 = 0,
    indiceActualBloqueExcelLista14 = 0,
    indiceActualBloqueExcelLista15 = 0,
    indiceActualBloqueExcelLista16 = 0,
    indiceActualBloqueExcelLista17 = 0,
    indiceActualBloqueExcelLista18 = 0,
    indiceActualBloqueExcelLista19 = 0,
    indiceActualBloqueExcelLista20 = 0,
    indiceActualBloqueExcelLista21 = 0,
    indiceActualBloqueExcelPrestacion1 = 0,
    indiceActualBloqueExcelPrestacion2 = 0,
    indiceActualBloqueProveedor = 0;


var listaProduccionFijoConfiguracion = [],
    listaProduccionFijoBonificacion = [],
    listaProduccionFijoDescuento = [],
    listaProduccionEscalonada = [],
    listaContratoFijo = [],
    listaHorarioCalculo = [],
    listaHorarioBonificacion = [],
    listaTurnoCalculo = [],
    listaTurnoBonificacion = [],
    listaCompartido = [],
    listaVacuna = [];

var rABS = true, use_worker = true, transferable = true, xlsData = "", MatrizWS = [], mtImponible = 0;
var XW = { rABS: 'Scripts/xlsxworker.js' }
var cabecerasV = ["Sucursal", "IdOrdenAtencion", "Línea", "Código OA", "Fecha de Atención", "Código Componente", "Cantidad", "Monto", "Observación"];

var anchosV = [50, 50, 50, 50, 50, 50, 50, 50, 50, 300];
var matrizIndiceV = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
var matrizCFOAs = [];
var SepListas = "¯", SepFilas = "¬", SepCol = "¦";
var IndicadorCabecera = true;
var _d = document;
window.onload = function () {
    var hdfIndAutRec = document.getElementById("hdfIndAutRec").value;
    if (hdfIndAutRec.toLowerCase() == "true") {
        document.getElementById("divCheckAutorizacion").style.display = "";
    }
    document.getElementById("ulAdjuntos").style.display = "";
    document.getElementById("txtAdjuntar").style.display = "none";
    let dataSeguridad = document.getElementById("hdfSeguridad").value;
    matrizSeguridad = dataSeguridad ? dataSeguridad.split("¯") : [];
    if (matrizSeguridad.length > 0) {
        if (((matrizSeguridad[5].split("¦")[2] * 1) != 1)) {
            removeSeguridad("spnCopiar");
        }
        if (((matrizSeguridad[7].split("¦")[2] * 1) != 1)) {
            removeSeguridad("spnAdjuntar");
        }
        if (((matrizSeguridad[0].split("¦")[2] * 1) != 1)) {
            removeSeguridad("btnDoctorGrabar");
        }
        if (((matrizSeguridad[8].split("¦")[2] * 1) != 1)) {
            document.getElementById("btngrabarPopupContratoFijo").style.display = "none";
        }
        else {
            document.getElementById("btngrabarPopupContratoFijo").style.display = "";
        }
        if (((matrizSeguridad[9].split("¦")[2] * 1) != 1)) {
            removeSeguridad("btnDoctorAutorizar");
            removeSeguridad("btnDetAutorizar");
        }
        if (((matrizSeguridad[10].split("¦")[2] * 1) != 1)) {
            removeSeguridad("btnDoctorRechazar");
            removeSeguridad("btnDetRechazar");
        }
        if (((matrizSeguridad[9].split("¦")[2] * 1) != 1) && ((matrizSeguridad[10].split("¦")[2] * 1) != 1)) {
            removeSeguridad("btnConfRec");
        }
    }
    var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
    txtBusquedaFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
    txtBusquedaFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    sucursalId = window.parent.document.getElementById("isuc").value.split("|")[0];
    sucursal = window.parent.document.getElementById("isuc").value.split("|")[1];
    var hdfrutcontrato = document.getElementById("hdfrutcontrato");
    rutaContrato = hdfrutcontrato.value.split("\\").join("/") + "/" + sucursalId;
    removeSeguridad("hdfrutcontrato");
    var pos1 = window.location.href.indexOf("Configuracion");
    urlBase = window.location.href.substring(0, pos1);
    ss = window.parent.document.getElementById("iss").value;
    var url = urlBase + "Configuracion/listasMedicoContrato/?ss=" + ss + "&su=" + sucursalId;
    $.ajax(url, "get", listarCombos);
}

function removeSeguridad(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

window.onresize = function () {
    var tipError = document.getElementById("tipError");
    if (tipError.style.display != "none") {
        tipError.style.display = "none";
    }
}

function configuracionInicial() {
    crearTabla("Principal|0");
    crearTabla("ProduccionFijoConfiguracion|1");
    crearTabla("ProduccionFijoBonificacion|2");
    crearTabla("ProduccionEscalonada|3");
    crearTabla("ContratoFijo|4");
    crearTabla("HorarioCalculo|5");
    crearTabla("HorarioBonificacion|6");
    crearTabla("TurnoCalculo|7");
    crearTabla("TurnoBonificacion|8");
    crearTabla("Compartido|9");
    crearTabla("Vacuna|10");
    crearTabla("Proveedor|11");
    crearTabla("ProduccionFijoDescuento|12");




    configurarOrdenacion("Principal|0");
    configurarControles();
    configurarFiltro();
    var fup = document.getElementById("fupArchivo");
    fup.onchange = function () {
        var btn = document.getElementById("btnGrabarCarga");
        if (this.value != "") {
            btn.style.display = "";
            var frm = new FormData();
            frm.append("ss", window.parent.document.getElementById("iss").value);
            frm.append("archivo", fup.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open("post", urlBase + "Configuracion/leerArchivoExcel");
            //xhr.open("post", urlBase + "Mantenimiento/leerArchivoExcel");
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    mostrarVistaPrevia(xhr.responseText);
                }
            }
            xhr.send(frm);
        }
    };
    document.getElementById("btnGrabarCarga").onclick = function () {
        var nRegistros = matrizExcelLista1.length;
        var campos, nCampos, contenido1 = ""; contenido2 = ""; contenido3 = "";
        for (var i = 0; i < nRegistros; i++) {
            campos = matrizExcelLista1[i];
            nCampos = campos.length;
            if (campos[7] == "Validado") {
                for (var j = 0; j < nCampos - 2; j++) {
                    if (j != 3) {
                        contenido1 += campos[j];
                        if (j < nCampos - 1) contenido1 += "¦";
                    }
                }
                if (i < nRegistros - 1) contenido1 += "¬";
            }
        }
        for (var a = 2; a < 22; a++) {
            nRegistros = window["matrizExcelLista" + a].length;
            for (var i = 0; i < nRegistros; i++) {
                campos = window["matrizExcelLista" + a][i];
                nCampos = campos.length;
                if (a % 2 == 0) {
                    if (campos[41] == "Validado") {
                        for (var j = 0; j < nCampos - 2; j++) {
                            if (j != 1 && j != 4) {
                                contenido2 += campos[j];
                                if (j < nCampos - 1) contenido2 += "¦";
                            }
                        }
                        contenido2 += "¬";
                    }
                }
                else {
                    if (campos[6] == "Validado") {
                        for (var j = 0; j < nCampos - 2; j++) {
                            if (j != 1 && j != 4) {
                                contenido3 += campos[j];
                                if (j < nCampos - 1) contenido3 += "¦";
                            }
                        }
                        contenido3 += "¬";
                    }
                }
            }
        }
        var frm = new FormData();
        frm.append("ss", window.parent.document.getElementById("iss").value);
        frm.append("lista1", contenido1);
        frm.append("lista2", contenido2.substr(0, contenido2.length - 1));
        frm.append("lista3", contenido3.substr(0, contenido3.length - 1));
        var xhr = new XMLHttpRequest();
        xhr.open("post", urlBase + "Configuracion/adicionarContratos");
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                mostrarAdicionarContratos(xhr.responseText);
            }
        }
        xhr.send(frm);
    };

    var fup2 = document.getElementById("fupArchivo2");
    fup2.onchange = function () {
        var btn = document.getElementById("btnGrabarCarga2");
        if (this.value != "") {
            btn.style.display = "";
            var frm = new FormData();
            frm.append("ss", window.parent.document.getElementById("iss").value);
            frm.append("archivo", fup2.files[0]);
            var xhr = new XMLHttpRequest();
            xhr.open("post", urlBase + "Configuracion/leerArchivoExcel2");
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    mostrarVistaPrevia2(xhr.responseText);
                }
            }
            xhr.send(frm);
        }
    };
    document.getElementById("btnGrabarCarga2").onclick = function () {
        var ifr = document.getElementById("frPrestacion");
        ifr.contentWindow.listarPrestacion("", false);
        ifr.contentWindow.configurarChecks();
        limpiarPopupCarga2();
        abrirPopup("PopupCarga2");
    };

    let ddlPFDescuentoAplica = document.getElementById("ddlPFDescuentoAplica");
    ddlPFDescuentoAplica.onchange = function () {

        let ddlPFDescuentoTipoDescuento = document.getElementById("ddlPFDescuentoTipoDescuento");
        let ddlPFDescuentoTipoMonto = document.getElementById("ddlPFDescuentoTipoMonto");

        ddlPFDescuentoTipoDescuento.classList.remove("lectura");
        ddlPFDescuentoTipoDescuento.removeAttribute("readonly");

        ddlPFDescuentoTipoMonto.classList.remove("lectura");
        ddlPFDescuentoTipoMonto.removeAttribute("readonly");

        if (this.value == "1") {
            ddlPFDescuentoTipoDescuento.classList.add("lectura");
            ddlPFDescuentoTipoDescuento.setAttribute("readonly", "true");
        } else if (this.value = "2") {
            ddlPFDescuentoTipoDescuento.classList.add("lectura");
            ddlPFDescuentoTipoDescuento.setAttribute("readonly", "true");

            ddlPFDescuentoTipoMonto.classList.add("lectura");
            ddlPFDescuentoTipoMonto.setAttribute("readonly", "true");
        }

    }

    _d.getElementById("ddlPFDescuentoDescuento").onchange = function () {
        var valor = this.value.split("|");
        _d.getElementById("ddlPFDescuentoTipoDescuento").value = valor[1];
        _d.getElementById("ddlPFDescuentoTipoMonto").value = valor[2];
        var inpImporte = _d.getElementById("txtPFDescuentoImporte");
        if (_d.getElementById("ddlPFDescuentoTipoMonto").value == "V") {
            inpImporte.classList.remove("validar");
            inpImporte.removeAttribute("data-validacion");
            inpImporte.classList.remove("error");
        } else {
            inpImporte.classList.add("validar");
            inpImporte.setAttribute("data-validacion", "validarTexto|Importe");
        }
    }

    _d.getElementById("ddlPFDescuentoTipoMonto").onchange = function () {
        var inpImporte = _d.getElementById("txtPFDescuentoImporte");
        if (this.value == "F") {
            inpImporte.classList.add("validar");
            inpImporte.setAttribute("data-validacion", "validarTexto|Importe");
        } else if (this.value == "V") {
            inpImporte.classList.remove("validar");
            inpImporte.removeAttribute("data-validacion");
            inpImporte.classList.remove("error");
        }
    }
}

function listarCombos(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        crearChecks(data[0].split("¯"));
        var listaAtencion = data[1].split("¯");
        listaTipoAdmision = data[2].split("¯");
        listaPaciente = data[3].split("¯");
        var listaAseguradora = data[4].split("¯");
        listaEspecialidad = data[5].split("¯");
        listaTurno = data[6].split("¯");
        listaTiempoPago = data[7].split("¯");
        var listaServicio = data[8].split("¯");
        listaAseguradoraContrato = data[9].split("¯");
        var listaTipoBonificacion = data[10].split("¯");

        lstAdmisionProv = data[11].split("¯");
        lstTipoDocPago = data[12].split("¯");
        lstTipoServicioImpuesto = data[13].split("¯");
        listaConceptoMonto = data[14].split("¯");
        listaModalidad = data[15].split("¯");
        listaAplicacion = data[16].split("¯");

        listaAplica = data[17].split("¯");
        listaDescuento = data[18].split("¯");
        listaTipoDescuento = data[19].split("¯");
        listaTipoMonto = ["F¦Monto Fijo", "V¦Monto Variable"];
        listaTipoPrestaciones = data[19].split("¯");

        configuracionInicial();

        llenarCombo(listaAtencion, "ddlPFConfiguracionTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlPFBonificacionTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlProduccionEscalonadaTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlHorarioCalculoTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlHorarioBonificacionTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlTurnoCalculoTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlTurnoBonificacionTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlCCompartidoTipoAtencion", "");
        llenarCombo(listaAtencion, "ddlVacunaTipoAtencion", "");

        llenarCombo(listaTipoAdmision, "ddlPFConfiguracionTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlPFBonificacionTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlProduccionEscalonadaTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlHorarioCalculoTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlHorarioBonificacionTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlTurnoCalculoTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlTurnoBonificacionTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlCCompartidoTipoAdmision", "");
        llenarCombo(listaTipoAdmision, "ddlVacunaTipoAdmision", "");

        llenarCombo(listaPaciente, "ddlPFConfiguracionTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlPFBonificacionTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlProduccionEscalonadaTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlHorarioCalculoTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlHorarioBonificacionTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlTurnoCalculoTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlTurnoBonificacionTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlCCompartidoTipoPaciente", "");
        llenarCombo(listaPaciente, "ddlVacunaTipoPaciente", "");

        llenarCombo(listaAseguradora, "ddlPFConfiguracionAseguradora", "");
        llenarCombo(listaAseguradora, "ddlPFBonificacionAseguradora", "");
        llenarCombo(listaAseguradora, "ddlProduccionEscalonadaAseguradora", "");
        llenarCombo(listaAseguradora, "ddlHorarioCalculoAseguradora", "");
        llenarCombo(listaAseguradora, "ddlHorarioBonificacionAseguradora", "");
        llenarCombo(listaAseguradora, "ddlTurnoCalculoAseguradora", "");
        llenarCombo(listaAseguradora, "ddlTurnoBonificacionAseguradora", "");
        llenarCombo(listaAseguradora, "ddlCCompartidoAseguradora", "");
        llenarCombo(listaAseguradora, "ddlVacunaAseguradora", "");

        llenarCombo(listaEspecialidad, "ddlPFConfiguracionEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlPFBonificacionEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlProduccionEscalonadaEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlHorarioCalculoEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlHorarioBonificacionEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlTurnoCalculoEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlTurnoBonificacionEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlCCompartidoEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlVacunaEspecialidad", "");
        llenarCombo(listaEspecialidad, "ddlBusquedaEspecialidad", "");

        llenarCombo(listaTurno, "ddlPFConfiguracionTurno", "");
        llenarCombo(listaTurno, "ddlPFBonificacionTurno", "");
        llenarCombo(listaTurno, "ddlPopupContratoFijoTurno", "");
        llenarCombo(listaTurno, "ddlHorarioCalculoTurno", "");
        llenarCombo(listaTurno, "ddlHorarioBonificacionTurno", "");
        llenarCombo(listaTurno, "ddlTurnoCalculoTurno", "");
        llenarCombo(listaTurno, "ddlTurnoBonificacionTurno", "");

        llenarCombo(listaTiempoPago, "ddlPFConfiguracionTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlProduccionEscalonadaTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlPopupContratoFijoTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlHorarioCalculoTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlTurnoCalculoTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlCCompartidoTiempoPago", "", true);
        llenarCombo(listaTiempoPago, "ddlVacunaTiempoPago", "", true);

        llenarCombo(listaServicio, "ddlProduccionEscalonadaServicio", "");
        llenarCombo(listaServicio, "ddlPFConfiguracionServicio", "");
        llenarCombo(listaServicio, "ddlPFBonificacionServicio", "");
        llenarCombo(listaServicio, "ddlCCompartidoServicio", "");

        llenarCombo2(listaAseguradoraContrato, "ddlPFConfiguracionContrato", "");

        llenarCombo(listaTipoBonificacion, "ddlPFBonificacionTipoBonificacion");
        llenarCombo(listaTipoBonificacion, "ddlHorarioBonificacionTipoBonificacion");
        llenarCombo(listaTipoBonificacion, "ddlTurnoBonificacionTipoBonificacion");


        llenarCombo(listaEspecialidad, "cboEspecialidadP", "");
        llenarCombo(lstAdmisionProv, "cboTipoadmisionP", "");
        llenarCombo(listaTiempoPago, "cboDiaPagoP", "");
        llenarCombo(lstTipoDocPago, "cboDocumentoPagoP", "");
        llenarCombo(lstTipoServicioImpuesto, "cbotipoImpuestoP", "");

        llenarCombo(listaEspecialidad, "ddlEspecialidadP", "");
        llenarCombo(lstAdmisionProv, "ddlTadmisionP", "");
        llenarCombo(listaTiempoPago, "ddlDiaPagoP", undefined);
        llenarCombo(lstTipoDocPago, "ddlDocPagoP", undefined);
        llenarCombo(lstTipoServicioImpuesto, "ddlTipoImpuestoP", undefined);

        llenarCombo(listaConceptoMonto, "ddlPopupContratoFijoConcepto");

        llenarCombo(listaModalidad, "ddlPFConfiguracionModeloFacturacion", "");
        llenarCombo(listaModalidad, "ddlPFBonificacionModeloFacturacion", "");

        llenarCombo(listaAplicacion, "ddlPFConfiguracionAplicacion", null, true);


        llenarCombo(listaAplica, "ddlPFDescuentoAplica", null, null);
        llenarCombo(listaTipoDescuento, "ddlPFDescuentoTipoDescuento", null, null);
        llenarCombo(listaTipoMonto, "ddlPFDescuentoTipoMonto", null, true);
        llenarComboDescuento(listaDescuento, "ddlPFDescuentoDescuento", null, null);

        var txtBusquedaSucursal = document.getElementById("txtBusquedaSucursal");
        txtBusquedaSucursal.value = sucursal;
    }
}

function llenarComboDescuento(lista, inp, parametro) {
    let nreg = lista.length;
    let campo;
    var html = "<option value=''>Seleccione</option>";
    var valor = "";
    for (let i = 0; i < nreg; i++) {
        campo = lista[i].split(SepCol);
        valor = campo[0] + "|" + campo[2] + "|" + campo[3];
        html += "<option value='" + valor + "' " + (parametro == campo[0] ? "selected" : "") + ">";
        html += campo[1];
        html += "</option>";
    }
    _d.getElementById(inp).innerHTML = html;
}

function Buscar() {
    var divPrincipal = document.getElementById("divPrincipal");
    divPrincipal.style.display = "";
    var url = urlBase + "Configuracion/listarMedicoContrato/?ss=" + ss;
    //var txtBusquedaMedico = (document.getElementById("hdfMedico").value == "-1" ? "" : document.getElementById("hdfMedico").value.split("¦")[0]);
    var txtBusquedaMedico = idMedico;
    var txtBusquedaCodigo = document.getElementById("txtBusquedaCodigo").value;
    var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio").value;
    var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin").value;
    var ddlBusquedaEspecialidad = document.getElementById("ddlBusquedaEspecialidad").value;
    //var txtBusquedaEmpresa = (document.getElementById("hdfEmpresa").value == "-1" ? "" : document.getElementById("hdfEmpresa").value.split("¦")[0]);
    var txtBusquedaEmpresa = idEmpresa;
    var chkPendienteAut = document.getElementById("chkPendienteAut").checked;
    var strDatos = sucursalId + "|" + txtBusquedaMedico + "|" + txtBusquedaCodigo + "|" + txtBusquedaFechaInicio + "|" + txtBusquedaFechaFin + "|" + (txtBusquedaEmpresa == "" ? 0 : txtBusquedaEmpresa) + "|" + (ddlBusquedaEspecialidad == "" ? 0 : ddlBusquedaEspecialidad) + "|" + chkPendienteAut;
    $.ajax(url, "post", listarTodo, strDatos);
}

function listarTodo(rpta) {
    var datos = NombreControl.split("|");
    var control = document.getElementById(datos[1]);
    if (control != null) {
        control.innerHTML = datos[0];
        NombreControl = "";
        control.onclick = function () {
            var TextoPrincipal = document.getElementsByName("cabeceraPrincipal");
            for (var x = 0; x < TextoPrincipal.length; x++) {
                if (TextoPrincipal[x].nodeName == "SELECT") {
                    TextoPrincipal[x].selectedIndex = "0";
                }
                else {
                    TextoPrincipal[x].value = "";
                }
            }
            Buscar();
            NombreControl = this.innerHTML + "|" + this.id.toString();
            this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
            this.onclick = null;
        }
    }
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

function crearTabla(elemento) {
    var identificador = elemento.split("|");
    var cabeceras = window["cabeceras" + identificador[0]];
    var nCampos = cabeceras.length;
    var contenido = "";
    switch (identificador[1]) {
        case "0":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus ContratoAdd' onclick='limpiarFormulario(0);EscogerDetalle(true);'>";
            }
            contenido += "</span>";
            //if (identificador[0] == "Principal") {
            //    if (matrizSeguridad.length > 0 && ((matrizSeguridad[4].split("¦")[2] * 1) == 1)) {
            //        contenido += "&nbsp;<span onclick='abrirPopup(\"PopupCarga\");limpiarPopupCarga()' style='cursor: pointer' class='Icons fa-upload'></span>";
            //    }
            //}
            contenido += "</th>";
            break;
        case "1":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {

                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"PFConfiguracion\");if (HayArchivos) {abrirPopup(\"PopupPFConfiguracion\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "2":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"PFBonificacion\");if (HayArchivos) {abrirPopup(\"PopupPFBonificacion\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "3":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"ProduccionEscalonada\");if (HayArchivos) {abrirPopup(\"PopupProduccionEscalonada\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "4":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[8].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"ContratoFijo\");if (HayArchivos) {abrirPopup(\"PopupContratoFijo\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "5":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"HorarioCalculo\");if (HayArchivos) {abrirPopup(\"PopupHorarioCalculo\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "6":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"HorarioBonificacion\");if (HayArchivos) {abrirPopup(\"PopupHorarioBonificacion\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "7":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"TurnoCalculo\");if (HayArchivos) {abrirPopup(\"PopupTurnoCalculo\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "8":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"TurnoBonificacion\");if (HayArchivos) {abrirPopup(\"PopupTurnoBonificacion\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "9":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"CCompartido\");if (HayArchivos) {abrirPopup(\"PopupCCompartido\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "10":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"Vacuna\");if (HayArchivos) {abrirPopup(\"PopupVacuna\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "11":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {
                contenido += "<span class='Icons fa-plus' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};limpiarProveedor();EscogerConfiguracionPago(true,\"Proveedor\");if (HayArchivos) {abrirPopup(\"PopupProveedor\")};'></span>";
            }
            contenido += "</th>";
            break;
        case "12":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
            if (matrizSeguridad.length > 0 && ((matrizSeguridad[0].split("¦")[2] * 1) == 1)) {

                contenido += "<span class='Icons fa-plus VerAc ContratoAdd' onclick='if(SoloVer){desabilitarControlIndividual(true)}else{desabilitarControlIndividual(false)};EscogerConfiguracionPago(true,\"PFDescuento\");if (HayArchivos) {abrirPopup(\"PopupPFDescuento\")};'></span>";
            }
            contenido += "</th>";
            break;

        case "P1":
        case "P2":
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            break;
        default:
            contenido = "<table class='tabla-general'>";
            contenido += "<thead class='tabla-FilaCab'>";
            contenido += "<tr class='cabecera'>";
            contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'></th>";
            break;
    }
    var valorFor;
    for (var j = 0; j < nCampos; j++) {
        contenido += "<th style='width:";
        contenido += window["anchos" + identificador[0]][j];
        contenido += "%'><span id='spn";
        contenido += j.toString();
        switch (identificador[1]) {
            case "0":

                if (j == 0) {
                    contenido += "'>";
                }
                else {
                    contenido += "' class='Enlace";
                    contenido += identificador[0];
                    contenido += "-";
                    contenido += identificador[1];
                    contenido += "' data-orden='";
                    contenido += window["matrizIndice" + identificador[0]][j];
                    contenido += "'>";

                }
                break;
            default:
                if (j == 0) {
                    contenido += "'>";
                }
                else {
                    contenido += "' class='Enlace";
                    contenido += identificador[0];
                    contenido += "-";
                    contenido += identificador[1];
                    contenido += "' data-orden='";
                    contenido += window["matrizIndice" + identificador[0]][j];
                    contenido += "'>";

                }
                break;
        }
        contenido += window["cabeceras" + identificador[0]][j];
        contenido += "</span><br/>";
        if (identificador[1] == "11" && j == 0) {
            contenido += "<select class='Combo";
            contenido += identificador[0];
            contenido += "' id='cboEspecialidadP'  name='cabecera";
            contenido += identificador[0];
            contenido += "' style='width:90%'></select>";
        }
        if (j > 0 || identificador[1] != "0") {
            switch (identificador[1]) {
                case "0":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "1":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='F'>Factor</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;
                        case 7:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option>";
                            let _n = listaAplicacion.length;
                            let _c = []
                            for (var a = 0; a < _n; a++) {
                                _c = listaAplicacion[a].split("¦");
                                contenido += "<option value='" + _c[0] + "'>" + _c[1] + "</option>";
                            }

                            contenido += "</select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "2":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option><option value='D'>Pago Doble</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "3":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='C'>Cantidad</option><option value='M'>Monto</option></select>";
                            break;
                        case 6:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='F'>Factor</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "4":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 3:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='L'>Semanal</option><option value='Q'>Quincenal</option><option value='M'>Mensual</option><option value='B'>Bimensual</option>";
                            contenido += "<option value='T'>Trimestral</option><option value='S'>Semestral</option><option value='A'>Anual</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "5":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='D'>Día</option><option value='F'>Feriado</option><option value='T'>Todos los Dias</option></select>";
                            break;
                        case 6:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option>";
                            for (var x = 0; x < listaTurno.length; x++) {
                                valorFor = listaTurno[x].split("¦");
                                contenido += "<option value='";
                                contenido += (valorFor[0] * 1);
                                contenido += "'>";
                                contenido += valorFor[1];
                                contenido += "</option>";
                            }
                            contenido += "</select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "6":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='D'>Día</option><option value='F'>Feriado</option><option value='T'>Todos los Dias</option></select>";
                            break;
                        case 5:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;

                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "7":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='T'>Turno</option><option value='H'>Horario</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "8":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "9":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='F'>Factor</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "10":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='P'>POR AUTORIZAR</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='F'>Factor</option><option value='M'>Monto Fijo</option><option value='P'>Porcentaje</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "11":
                    switch (j) {

                        case 1:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                        case 2:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                        case 3:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' id='cboTipoadmisionP' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'></select>";
                            break;
                        case 4:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='J'>JURÍDICA</option><option value='N'>NATURAL</option></select>";
                            break;
                        case 5:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                        case 6:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' id='cboDiaPagoP'  name='cabecera";
                            contenido += identificador[0];
                            contenido += "'></select>";
                            break;
                        case 7:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' id='cboDocumentoPagoP'  name='cabecera";
                            contenido += identificador[0];
                            contenido += "'></select>";
                            break;
                        case 8:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' id='cbotipoImpuestoP'  name='cabecera";
                            contenido += identificador[0];
                            contenido += "'></select>";
                            break;
                        case 9:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                            break;
                    }
                    break;
                case "12":
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                            break;
                        case 2:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option>";
                            let _n = listaTipoDescuento.length;
                            let _c = []
                            for (var a = 0; a < _n; a++) {
                                _c = listaTipoDescuento[a].split("¦");
                                contenido += "<option value='" + _c[0] + "'>" + _c[1] + "</option>";
                            }

                            contenido += "</select>";
                            break;
                        case 3:
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "'><option value=''>TODOS</option>";
                            let _nn = listaTipoMonto.length;
                            let _cc = []
                            for (var a = 0; a < _nn; a++) {
                                _cc = listaTipoMonto[a].split("¦");
                                contenido += "<option value='" + _cc[0] + "'>" + _cc[1] + "</option>";
                            }

                            contenido += "</select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
                case "E1":
                case "P1":
                case "P2":
                    break;
                default:
                    switch (j) {
                        case (nCampos - 1):
                            contenido += "<select class='Combo";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'><option value=''>TODOS</option><option value='A'>ACTIVO</option><option value='I'>INACTIVO</option></select>";
                            break;
                        default:
                            contenido += "<input type='text' class='Texto";
                            contenido += identificador[0];
                            contenido += "' name='cabecera";
                            contenido += identificador[0];
                            contenido += "' style='width:90%'>";
                            break;
                    }
                    break;
            }
        }
        contenido += "</th>";
    }
    if (identificador[1] != "E1" && identificador[1] != "P1" && identificador[1] != "P2") {
        contenido += "<th style='width:5%;vertical-align: middle;text-align: center;'>";
        if (matrizSeguridad.length > 0 && ((matrizSeguridad[3].split("¦")[2] * 1) == 1)) {
            contenido += "<a class='Icons fa-file-excel-o' id='ExportarExcel" + identificador[0] + "' onclick='exportacion(\"";
            contenido += elemento;
            contenido += "\",this)'></a>";
        }
        contenido += "</th>";
    }
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody id='tb" + identificador[0] + "' class='tabla-FilaCuerpo'>";
    contenido += "</tbody>";
    contenido += "<tfoot>";
    contenido += "<tr><td id='tdPaginas" + identificador[0] + "' colspan='";
    contenido += (nCampos + 2).toString();
    contenido += "'></td></tr>";
    contenido += "</tfoot>";
    contenido += "</table>";
    document.getElementById("div" + identificador[0]).innerHTML = contenido;
}

function paginar(indicePagina, elemento) {
    var identificador = elemento.split("|");
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
                window["indiceActualBloque" + identificador[0]] = 0;
                break;
            case -2:
                if (window["indiceActualBloque" + identificador[0]] > 0) {
                    window["indiceActualBloque" + identificador[0]]--;
                    indicePagina = window["indiceActualBloque" + identificador[0]] * paginasBloque;
                }
                break;
            case -3:
                if (window["indiceActualBloque" + identificador[0]] < indiceUltimoBloque) {
                    window["indiceActualBloque" + identificador[0]]++;
                    indicePagina = window["indiceActualBloque" + identificador[0]] * paginasBloque;
                }
                break;
            case -4:
                indicePagina = indiceUltimaPagina;
                window["indiceActualBloque" + identificador[0]] = indiceUltimoBloque;
                break;
        }
    }
    window["indiceActualPagina" + identificador[0]] = indicePagina;
    //indiceActualPagina = indicePagina;
    mostrarMatriz(indicePagina, elemento);
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
                        if (isNaN(campos[j]) || j == 7 || j == 8 || j == 4 || j == 5) window["matriz" + identificador[0]][x][j] = campos[j];
                        else window["matriz" + identificador[0]][x][j] = campos[j] * 1;
                    }
                    break;
                case "E1":
                    for (j = 0; j < nCampos; j++) {
                        window["matriz" + identificador[0]][x][j] = campos[j];
                    }
                    break;
                default:
                    for (j = 0; j < nCampos; j++) {
                        if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
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
    var contenido = "";
    var n = window["matriz" + identificador[0]].length;
    var camposSecuencia = "";
    var esBloque = (indicePagina < 0);
    if (n > 0) {
        var nCampos = window["matriz" + identificador[0]][0].length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;
        var valorFor;
        switch (identificador[1]) {
            case "0":
                nCampos = nCampos - 3;
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0) {
                            if ((matrizSeguridad[1].split("¦")[2] * 1) == 1) {
                                if (window["matriz" + identificador[0]][i][10] == "I" || window["matriz" + identificador[0]][i][12] == 0) {
                                    contenido += "<span class='Icons fa-eye' onclick='SoloVer=true;desabilitarControles(true);limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                                    contenido += window["matriz" + identificador[0]][i][1];
                                    contenido += ");limpiarCabecerasDetalle();'></span>";
                                } else {
                                    contenido += "<span class='Icons fa-edit' onclick='limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                                    contenido += window["matriz" + identificador[0]][i][1];
                                    contenido += ");limpiarCabecerasDetalle();'>&nbsp;</span>";
                                }
                            }
                            if ((matrizSeguridad[6].split("¦")[2] * 1) == 1) {
                                contenido += "<span class='Icons fa-eye' onclick='SoloVer=true;desabilitarControles(true);limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                                contenido += window["matriz" + identificador[0]][i][1];
                                contenido += ");limpiarCabecerasDetalle();'></span>";
                            }
                        }

                        //if (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 1)) {
                        //    if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "I" || window["matriz" + identificador[0]][i][11] == 0) {//cambio antes [9]
                        //        contenido += "<span class='Icons fa-eye' onclick='SoloVer=true;desabilitarControles(true);limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                        //        contenido += window["matriz" + identificador[0]][i][1];
                        //        contenido += ");limpiarCabecerasDetalle();'></span>";
                        //    } else {
                        //        contenido += "<span class='Icons fa-edit' onclick='limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                        //        contenido += window["matriz" + identificador[0]][i][1];
                        //        contenido += ");limpiarCabecerasDetalle();'>&nbsp;</span>";
                        //    }
                        //}
                        //if (matrizSeguridad.length > 0 && ((matrizSeguridad[6].split("¦")[2] * 1) == 1)) {
                        //    contenido += "<span class='Icons fa-eye' onclick='SoloVer=true;desabilitarControles(true);limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                        //    contenido += window["matriz" + identificador[0]][i][1];
                        //    contenido += ");limpiarCabecerasDetalle();'></span>";
                        //}
                        contenido += "</td>";
                        for (var j = 0; j < nCampos; j++) {
                            if (j != 6) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    //contenido += "<span class='historial puntero hstest' style='text-decoration:underline;color:#00a850'>";
                                    contenido += "<span class='historial puntero' style='text-decoration:underline;color:#00a850' onclick='document.getElementById(\"hdfCd\").value=";
                                    contenido += window["matriz" + identificador[0]][i][1];
                                    contenido += ";verHistorial(\"MedicoContrato\")'>";
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    contenido += "</span>";
                                }
                                else {
                                    switch (j) {
                                        case 0:
                                            contenido += sucursal;
                                            break;
                                        case 2:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }
                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            contenido += "></span>";
                        }
                        contenido += "</td>";
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
            case "1":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|1";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'>";
                        contenido += "<span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"PFConfiguracion\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"PFConfiguracion\",\"";
                        }
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupPFConfiguracion\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }

                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje"));
                                            break;
                                        case 7:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        case 9:
                                            let _n = listaAplicacion.length;
                                            let _c = [], des = "";
                                            for (var a = 0; a < _n; a++) {
                                                _c = listaAplicacion[a].split("¦");
                                                if (_c[0] == window["matriz" + identificador[0]][i][j]) {
                                                    des = _c[1];
                                                    break;
                                                }
                                            }

                                            contenido += des;

                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }
                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P") {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td>";
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
            case "2":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|2";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"PFBonificacion\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"PFBonificacion\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"PFBonificacion\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupPFBonificacion\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2 && j != 9) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            switch (window["matriz" + identificador[0]][i][j]) {
                                                case "M":
                                                    contenido += "Monto Fijo";
                                                    break;
                                                case "P":
                                                    contenido += "Porcentaje";
                                                    break;
                                                case "D":
                                                    contenido += "Pago Doble";
                                                    break;
                                            }


                                            //contenido += (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje");
                                            break;
                                        case 7:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }
                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "3":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|3";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"ProduccionEscalonada\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"ProduccionEscalonada\",\"";
                        }

                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"ProduccionEscalonada\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupProduccionEscalonada\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            contenido += "<td>";
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido += "ACTIVO";
                                        break;
                                    case "I":
                                        contenido += "INACTIVO";
                                        break;
                                    case "P":
                                        contenido += "POR AUTORIZAR";
                                        break;
                                }
                                //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                            }
                            else {
                                switch (j) {
                                    case 2:
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    case 3:
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    case 5:
                                        contenido += (window["matriz" + identificador[0]][i][j] == "C" ? "Cantidad" : "Monto");
                                        break;
                                    case 7:
                                        contenido += (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje"));
                                        break;
                                    case 8:
                                        contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                        break;
                                    default:
                                        contenido += window["matriz" + identificador[0]][i][j];
                                        break;
                                }

                            }
                            contenido += "</td>";

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "4":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|4";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[8].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"ContratoFijo\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"ContratoFijo\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[8].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"ContratoFijo\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupContratoFijo\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j == (nCampos - 1)) {
                                contenido += "<td>";
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido += "ACTIVO";
                                        break;
                                    case "I":
                                        contenido += "INACTIVO";
                                        break;
                                    case "P":
                                        contenido += "POR AUTORIZAR";
                                        break;
                                }
                                //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido += "<td style='text-align:right'>";
                                        contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                        break;
                                    case 4:
                                        contenido += "<td>";
                                        switch (window["matriz" + identificador[0]][i][j]) {
                                            case "L":
                                                contenido += "Semanal";
                                                break;
                                            case "Q":
                                                contenido += "Quincenal";
                                                break;
                                            case "M":
                                                contenido += "Mensual";
                                                break;
                                            case "B":
                                                contenido += "Bimensual";
                                                break;
                                            case "T":
                                                contenido += "Trimestral";
                                                break;
                                            case "S":
                                                contenido += "Semestral";
                                                break;
                                            case "A":
                                                contenido += "Anual";
                                                break;
                                        }
                                        break;
                                    case 5:
                                        contenido += "<td>";
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    case 6:
                                        contenido += "<td>";
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    default:
                                        contenido += "<td>";
                                        contenido += window["matriz" + identificador[0]][i][j];
                                        break;
                                }

                            }
                            contenido += "</td>";

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "5":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|5";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"HorarioCalculo\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"HorarioCalculo\",\"";
                        }

                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"HorarioCalculo\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupHorarioCalculo\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "D" ? "Dia" : (window["matriz" + identificador[0]][i][j] == "F" ? "Feriado" : "Todos los Dias"));
                                            break;
                                        case 8:
                                            for (var x = 0; x < listaTurno.length; x++) {
                                                valorFor = listaTurno[x].split("¦");
                                                if (window["matriz" + identificador[0]][i][j] == (valorFor[0] * 1)) {
                                                    contenido += valorFor[1];
                                                    break;
                                                }
                                                if (window["matriz" + identificador[0]][i][j] == 0) {
                                                    contenido += "Todos";
                                                    break;
                                                }
                                            }
                                            break;
                                        case 9:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "6":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|6";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"HorarioBonificacion\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"HorarioBonificacion\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"HorarioBonificacion\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupHorarioBonificacion\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "D" ? "Dia" : (window["matriz" + identificador[0]][i][j] == "F" ? "Feriado" : "Todos los Dias"));
                                            break;
                                        case 7:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje");
                                            break;
                                        case 9:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "7":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|7";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"TurnoCalculo\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"TurnoCalculo\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"TurnoCalculo\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupTurnoCalculo\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "T" ? "Turno" : "Hora");
                                            break;
                                        case 8:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "8":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|8";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"TurnoBonificacion\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"TurnoBonificacion\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"TurnoBonificacion\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupTurnoBonificacion\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 2) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 4:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje");
                                            break;
                                        case 7:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "9":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|9";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"CCompartido\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"CCompartido\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"CCompartido\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupCCompartido\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            if (j != 7) {
                                contenido += "<td>";
                                if (j == (nCampos - 1)) {
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "A":
                                            contenido += "ACTIVO";
                                            break;
                                        case "I":
                                            contenido += "INACTIVO";
                                            break;
                                        case "P":
                                            contenido += "POR AUTORIZAR";
                                            break;
                                    }
                                    //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                }
                                else {
                                    switch (j) {
                                        case 2:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 3:
                                            contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                            break;
                                        case 5:
                                            contenido += (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje"));
                                            break;
                                        case 6:
                                            contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                            break;
                                        default:
                                            contenido += window["matriz" + identificador[0]][i][j];
                                            break;
                                    }

                                }
                                contenido += "</td>";
                            }

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "10":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|10";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye' onclick='desabilitarControlIndividual(true);EscogerConfiguracionPago(false,\"Vacuna\",\"";

                        }
                        else {
                            contenido += "fa-edit' onclick='desabilitarControlIndividual(false);EscogerConfiguracionPago(false,\"Vacuna\",\"";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") ? 'fa-eye' : 'fa-edit');
                        //contenido += "' onclick='EscogerConfiguracionPago(false,\"Vacuna\",\"";
                        contenido += camposSecuencia;
                        contenido += "\");abrirPopup(\"PopupVacuna\");'";
                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos; j++) {
                            contenido += "<td>";
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido += "ACTIVO";
                                        break;
                                    case "I":
                                        contenido += "INACTIVO";
                                        break;
                                    case "P":
                                        contenido += "POR AUTORIZAR";
                                        break;
                                }
                                //contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                            }
                            else {
                                switch (j) {
                                    case 2:
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    case 3:
                                        contenido += formatearfecha(window["matriz" + identificador[0]][i][j]);
                                        break;
                                    case 5:
                                        contenido += (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje"));
                                        break;
                                    case 6:
                                        contenido += (window["matriz" + identificador[0]][i][j] * 1).toFixed(2);
                                        break;
                                    default:
                                        contenido += window["matriz" + identificador[0]][i][j];
                                        break;
                                }

                            }
                            contenido += "</td>";
                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P" && true) {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }
                break;
            case "11":
                var reg;
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'><span class='prov Icons ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 1)] == "I") {
                            contenido += "fa-eye";

                        }
                        else {
                            contenido += "fa-edit";
                        }
                        //contenido += (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) ? 'fa-eye' : 'fa-edit');
                        contenido += "' data-pos='" + i.toString() + "'";
                        contenido += "></span></td>";
                        var exito = false;
                        for (var j = 1; j < nCampos - 7; j++) {
                            contenido += "<td>";
                            switch (j) {
                                case 1:
                                    for (var l = 0, ll = listaEspecialidad.length; l < ll; l++) {
                                        reg = listaEspecialidad[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido += reg[1];
                                            exito = true;
                                            break;
                                        }
                                    }
                                    if (!exito) {
                                        contenido += "Todos";
                                    }

                                    break;
                                case 2:
                                    window["matriz" + identificador[0]][i][j] = (window["matriz" + identificador[0]][i][j].length == 9 ? '0' : '') + window["matriz" + identificador[0]][i][j];
                                    contenido += window["matriz" + identificador[0]][i][j];
                                    break;
                                case 3:
                                    window["matriz" + identificador[0]][i][j] = (window["matriz" + identificador[0]][i][j].length == 9 ? '0' : '') + window["matriz" + identificador[0]][i][j];
                                    contenido += window["matriz" + identificador[0]][i][j];
                                    break;
                                case 4:
                                    exito = false;
                                    for (var l = 0, ll = lstAdmisionProv.length; l < ll; l++) {
                                        reg = lstAdmisionProv[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido += reg[1];
                                            exito = true;
                                            break;
                                        }
                                    }
                                    if (!exito) {
                                        contenido += "Todos";
                                    }
                                    break;
                                case 5:
                                    contenido += (window["matriz" + identificador[0]][i][j] == "J" ? "Jurídica" : (window["matriz" + identificador[0]][i][j] == "N" ? "Natural" : "Todos"));
                                    break;
                                case 6:
                                    contenido += window["matriz" + identificador[0]][i][(nCampos - 5)];
                                    break;
                                case 7:
                                    for (var l = 0, ll = listaTiempoPago.length; l < ll; l++) {
                                        reg = listaTiempoPago[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido += reg[1];
                                            break;
                                        }
                                    }
                                    break;
                                case 8:
                                    for (var l = 0, ll = lstTipoDocPago.length; l < ll; l++) {
                                        reg = lstTipoDocPago[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido += reg[1];
                                            break;
                                        }
                                    }
                                    break;
                                case 9:
                                    for (var l = 0, ll = lstTipoServicioImpuesto.length; l < ll; l++) {
                                        reg = lstTipoServicioImpuesto[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido += reg[1];
                                            break;
                                        }
                                    }
                                    break;
                                case 10:
                                    contenido += (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO");
                                    break;
                            }


                            contenido += "</td>";
                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][10] == "A" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                        }
                        contenido += "</td></tr>";
                    }
                    else break;
                }

                break;
            case "12":
                for (var i = inicio; i < fin; i++) {
                    camposSecuencia = "";
                    if (i < n) {
                        camposSecuencia += window["matriz" + identificador[0]][i][0];
                        camposSecuencia += "|1";
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='width:5%;vertical-align: middle;text-align: center;'>";
                        contenido += "<span class='Icons js_descuento ";
                        if (SoloVer == true || (matrizSeguridad.length > 0 && ((matrizSeguridad[1].split("¦")[2] * 1) == 0)) || window["matriz" + identificador[0]][i][(nCampos - 2)] == "I") {
                            contenido += "fa-eye ";

                        }
                        else {
                            contenido += "fa-edit";
                        }
                        contenido += "' data-pos='" + i.toString() + "'";

                        contenido += "></span></td>";
                        for (var j = 1; j < nCampos - 1; j++) {

                            contenido += "<td>";
                            if (j == (nCampos - 2)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido += "ACTIVO";
                                        break;
                                    case "I":
                                        contenido += "INACTIVO";
                                        break;
                                }

                            }
                            else {
                                switch (j) {
                                    case 3:

                                        let _n = listaTipoDescuento.length;
                                        let _c = [], des = "";
                                        for (var a = 0; a < _n; a++) {
                                            _c = listaTipoDescuento[a].split("¦");
                                            if (_c[0] == window["matriz" + identificador[0]][i][j]) {
                                                des = _c[1];
                                                break;
                                            }
                                        }

                                        contenido += des;

                                        break;
                                    case 4:

                                        let _nn = listaTipoMonto.length;
                                        let _cc = [], dess = "";
                                        for (var a = 0; a < _nn; a++) {
                                            _cc = listaTipoMonto[a].split("¦");
                                            if (_cc[0] == window["matriz" + identificador[0]][i][j]) {
                                                dess = _cc[1];
                                                break;
                                            }
                                        }

                                        contenido += dess;

                                        break;
                                    default:
                                        contenido += window["matriz" + identificador[0]][i][j];
                                        break;
                                }

                            }
                            contenido += "</td>";

                        }
                        contenido += "<td style='text-align:center'>";
                        if (matrizSeguridad.length > 0 && ((matrizSeguridad[2].split("¦")[2] * 1) == 1)) {
                            contenido += "<span class='Icons ";
                            contenido += (window["matriz" + identificador[0]][i][(nCampos - 2)] == "A" || window["matriz" + identificador[0]][i][(nCampos - 2)] == "P" ? "fa-trash-o" : "fa-check");
                            contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                            contenido += "window[\"Campoeliminar";
                            contenido += identificador[0];
                            contenido += "\"]=";
                            contenido += i;
                            contenido += ";instanciaActual=\"";
                            contenido += identificador[0];
                            contenido += "\"'";
                            if (SoloVer) contenido += "style='display:none'></span>";
                            else contenido += "></span>";
                            if (!SoloVer) {
                                if (window["matriz" + identificador[0]][i][(nCampos - 1)] == "P") {
                                    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                                    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                                    if (btnDoctorAutorizar != null || btnDoctorRechazar != null) {
                                        contenido += "&nbsp;<span class='Icons fa-cogs' onclick='asignarIdAutRec(";
                                        contenido += window["matriz" + identificador[0]][i][0];
                                        contenido += ",true);IndicadorCabecera=false;abrirPopup(\"PopupDetalleAutRec\");'></span>";
                                    }
                                }
                            }
                        }
                        contenido += "</td>";
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;

            case "E1":
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='text-align:center'><span class='Icons fa-trash-o' onclick='eliminarRegistro(";
                        contenido += window["matriz" + identificador[0]][i][0];
                        contenido += ",\"";
                        contenido += identificador[0];
                        contenido += "\",\"";
                        contenido += identificador[1];
                        contenido += "\")'></span></td>";
                        for (var j = 0; j < nCampos; j++) {
                            contenido += "<td>";
                            contenido += window["matriz" + identificador[0]][i][j];
                            contenido += "</td>";
                        }
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
            case "E2":
            case "E3":
            case "E4":
            case "E5":
            case "E6":
            case "E7":
            case "E8":
            case "E9":
            case "E10":
            case "E11":
            case "E12":
            case "E13":
            case "E14":
            case "E15":
            case "E16":
            case "E17":
            case "E18":
            case "E19":
            case "E20":
            case "E21":
                switch (identificador[1]) {
                    case "E2":
                        nCampos = matrizIndiceExcelLista2.length;
                        break;
                    case "E4":
                        nCampos = matrizIndiceExcelLista4.length;
                        break;
                    case "E6":
                        nCampos = matrizIndiceExcelLista6.length;
                        break;
                    case "E8":
                        nCampos = matrizIndiceExcelLista8.length;
                        break;
                    case "E10":
                        nCampos = matrizIndiceExcelLista10.length;
                        break;
                    case "E12":
                        nCampos = matrizIndiceExcelLista12.length;
                        break;
                    case "E14":
                        nCampos = matrizIndiceExcelLista14.length;
                        break;
                    case "E16":
                        nCampos = matrizIndiceExcelLista16.length;
                        break;
                    case "E18":
                        nCampos = matrizIndiceExcelLista18.length;
                        break;
                    case "E20":
                        nCampos = matrizIndiceExcelLista20.length;
                        break;
                    case "E3":
                    case "E5":
                    case "E7":
                    case "E9":
                    case "E11":
                    case "E13":
                    case "E15":
                    case "E17":
                    case "E19":
                    case "E21":
                        nCampos = matrizIndiceExcelLista3.length;
                        break;
                }
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='text-align:center'><span class='Icons fa-trash-o' onclick='eliminarRegistro(";
                        contenido += window["matriz" + identificador[0]][i][0];
                        contenido += ",\"";
                        contenido += identificador[0];
                        contenido += "\",\"";
                        contenido += identificador[1];
                        contenido += "\")'></span></td>";
                        for (var j = 0; j < nCampos; j++) {
                            contenido += "<td>";
                            switch (identificador[1]) {
                                case "E2":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista2[j]];
                                    break;
                                case "E3":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista3[j]];
                                    break;
                                case "E4":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista4[j]];
                                    break;
                                case "E5":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista5[j]];
                                    break;
                                case "E6":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista6[j]];
                                    break;
                                case "E7":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista7[j]];
                                    break;
                                case "E8":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista8[j]];
                                    break;
                                case "E9":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista9[j]];
                                    break;
                                case "E10":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista10[j]];
                                    break;
                                case "E11":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista11[j]];
                                    break;
                                case "E12":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista12[j]];
                                    break;
                                case "E13":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista13[j]];
                                    break;
                                case "E14":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista14[j]];
                                    break;
                                case "E15":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista15[j]];
                                    break;
                                case "E16":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista16[j]];
                                    break;
                                case "E17":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista17[j]];
                                    break;
                                case "E18":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista18[j]];
                                    break;
                                case "E19":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista19[j]];
                                    break;
                                case "E20":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista20[j]];
                                    break;
                                case "E21":
                                    contenido += window["matriz" + identificador[0]][i][matrizIndiceExcelLista21[j]];
                                    break;
                            }
                            contenido += "</td>";
                        }
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
            case "P1":
            case "P2":
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        for (var j = 0; j < nCampos; j++) {
                            contenido += "<td>";
                            contenido += window["matriz" + identificador[0]][i][j];
                            contenido += "</td>";
                        }
                        contenido += "</tr>";
                    }
                    else break;
                }
                break;
            default:
                for (var i = inicio; i < fin; i++) {
                    if (i < n) {
                        contenido += "<tr class='FilaDatos'>";
                        contenido += "<td style='text-align:center'><span class='Icons fa-edit' onclick='limpiarFormulario(1);EscogerDetalle(false);mostrarDoctor(";
                        contenido += window["matriz" + identificador[0]][i][0];
                        contenido += ")'></span></td>";
                        for (var j = 0; j < nCampos; j++) {
                            contenido += "<td>";
                            contenido += window["matriz" + identificador[0]][i][j];
                            contenido += "</td>";
                        }
                        contenido += "<td style='text-align:center'><span class='Icons ";
                        contenido += (window["matriz" + identificador[0]][i][(nCampos - 1)] == "A" ? "fa-trash-o" : "fa-check");
                        contenido += "' onclick='abrirPopup(\"PopupEstado\");";
                        contenido += "window[\"Campoeliminar";
                        contenido += identificador[0];
                        contenido += "\"]=";
                        contenido += i;
                        contenido += ";instanciaActual=\"";
                        contenido += identificador[0];
                        contenido += "\"'";
                        contenido += "></span></td>";
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
    switch (identificador[1]) {
        case "1":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[0];
            var tab1 = document.getElementById("tab-1");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "2":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[0];
            var tab1 = document.getElementById("tab-1");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "5":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[3];
            var tab1 = document.getElementById("tab-4");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "6":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[3];
            var tab1 = document.getElementById("tab-4");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "7":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[4];
            var tab1 = document.getElementById("tab-5");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "8":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[4];
            var tab1 = document.getElementById("tab-5");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
    }
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
            var nombreMatriz = this.className.split("Enlace").join("").trim().split("-");
            valor = this.className.split("Enlace").join("").trim().split("-").join("|");
            ordenarMatriz(this);
            mostrarMatriz(window["indiceActualPagina" + nombreMatriz[0]], valor);
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
    switch (orden[1]) {
        case "ProduccionEscalonada":
            valX = ((indice == 2 || indice == 3) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
            valY = ((indice == 2 || indice == 3) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
            break;
        case "ContratoFijo":
            valX = ((indice == 5 || indice == 6) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
            valY = ((indice == 5 || indice == 6) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
            break;
        case "Compartido":
            valX = ((indice == 2 || indice == 3) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
            valY = ((indice == 2 || indice == 3) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
            break;
        case "Vacuna":
            valX = ((indice == 2 || indice == 3) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
            valY = ((indice == 2 || indice == 3) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
            break;
        default:
            valX = ((indice == 3 || indice == 4) ? fechaUTC(x[indice]) : (isNaN(x[indice]) ? x[indice].toLowerCase() : x[indice]));
            valY = ((indice == 3 || indice == 4) ? fechaUTC(y[indice]) : (isNaN(y[indice]) ? y[indice].toLowerCase() : y[indice]));
            break;
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
    var textos = document.getElementsByClassName("TextoProduccionFijoConfiguracion");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionFijoConfiguracion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionFijoConfiguracion = 0;
            }
            filtrar("ProduccionFijoConfiguracion|1");
        }
    }
    var combos = document.getElementsByClassName("ComboProduccionFijoConfiguracion");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionFijoConfiguracion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionFijoConfiguracion = 0;
            }
            filtrar("ProduccionFijoConfiguracion|1");
        }
    }

    var textos = document.getElementsByClassName("TextoProduccionFijoBonificacion");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionFijoBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionFijoBonificacion = 0;
            }
            filtrar("ProduccionFijoBonificacion|2");
        }
    }
    var combos = document.getElementsByClassName("ComboProduccionFijoBonificacion");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionFijoBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionFijoBonificacion = 0;
            }
            filtrar("ProduccionFijoBonificacion|2");
        }
    }

    var textos = document.getElementsByClassName("TextoProduccionEscalonada");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionEscalonada");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionEscalonada = 0;
            }
            filtrar("ProduccionEscalonada|3");
        }
    }
    var combos = document.getElementsByClassName("ComboProduccionEscalonada");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraProduccionEscalonada");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaProduccionEscalonada = 0;
            }
            filtrar("ProduccionEscalonada|3");
        }
    }

    var textos = document.getElementsByClassName("TextoContratoFijo");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraContratoFijo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaContratoFijo = 0;
            }
            filtrar("ContratoFijo|4");
        }
    }
    var combos = document.getElementsByClassName("ComboContratoFijo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraContratoFijo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaContratoFijo = 0;
            }
            filtrar("ContratoFijo|4");
        }
    }

    var textos = document.getElementsByClassName("TextoHorarioCalculo");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraHorarioCalculo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaHorarioCalculo = 0;
            }
            filtrar("HorarioCalculo|5");
        }
    }
    var combos = document.getElementsByClassName("ComboHorarioCalculo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraHorarioCalculo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaHorarioCalculo = 0;
            }
            filtrar("HorarioCalculo|5");
        }
    }

    var textos = document.getElementsByClassName("TextoHorarioBonificacion");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraHorarioBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaHorarioBonificacion = 0;
            }
            filtrar("HorarioBonificacion|6");
        }
    }
    var combos = document.getElementsByClassName("ComboHorarioBonificacion");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraHorarioBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaHorarioBonificacion = 0;
            }
            filtrar("HorarioBonificacion|6");
        }
    }

    var textos = document.getElementsByClassName("TextoTurnoCalculo");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraTurnoCalculo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaTurnoCalculo = 0;
            }
            filtrar("TurnoCalculo|7");
        }
    }
    var combos = document.getElementsByClassName("ComboTurnoCalculo");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraTurnoCalculo");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaTurnoCalculo = 0;
            }
            filtrar("TurnoCalculo|7");
        }
    }

    var textos = document.getElementsByClassName("TextoTurnoBonificacion");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraTurnoBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaTurnoBonificacion = 0;
            }
            filtrar("TurnoBonificacion|8");
        }
    }
    var combos = document.getElementsByClassName("ComboTurnoBonificacion");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraTurnoBonificacion");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaTurnoBonificacion = 0;
            }
            filtrar("TurnoBonificacion|8");
        }
    }

    var textos = document.getElementsByClassName("TextoCompartido");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraCompartido");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaCompartido = 0;
            }
            filtrar("Compartido|9");
        }
    }
    var combos = document.getElementsByClassName("ComboCompartido");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraCompartido");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaCompartido = 0;
            }
            filtrar("Compartido|9");
        }
    }

    var textos = document.getElementsByClassName("TextoVacuna");
    var ntextos = textos.length;
    var texto;
    for (i = 0; i < ntextos; i++) {
        texto = textos[i];
        texto.onkeyup = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraVacuna");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaVacuna = 0;
            }
            filtrar("Vacuna|10");
        }
    }
    var combos = document.getElementsByClassName("ComboVacuna");
    var nCombos = combos.length;
    var combo;
    for (i = 0; i < nCombos; i++) {
        combo = combos[i];
        combo.onchange = function (e) {
            var encontrado = true;
            var obj = document.getElementsByName("cabeceraVacuna");
            for (var y = 0; y < obj.length; y++) {
                if (obj[y].nodeName == "SELECT") {
                    if (obj[y].selectedIndex != "0") {
                        encontrado = false;
                        break;
                    }
                }
                else {
                    if (obj[y].value != "") {
                        encontrado = false;
                        break;
                    }
                }

            }
            if (encontrado) {
                indiceActualPaginaVacuna = 0;
            }
            filtrar("Vacuna|10");
        }
    }

    var textos = document.getElementsByName("cabeceraProveedor");
    var ntextos = textos.length;
    var texto;
    for (var i = 0; i < ntextos; i++) {
        texto = textos[i];
        if (texto.nodeName == "INPUT") {
            texto.onkeyup = function (e) {
                var encontrado = true;
                var obj = document.getElementsByName("cabeceraProveedor");
                for (var y = 0; y < obj.length; y++) {
                    if (obj[y].nodeName == "SELECT") {
                        if (obj[y].selectedIndex != "0") {
                            encontrado = false;
                            break;
                        }
                    }
                    else {
                        if (obj[y].value != "") {
                            encontrado = false;
                            break;
                        }
                    }

                }
                if (encontrado) {
                    indiceActualPaginaProveedor = 0;
                }
                filtrar("Proveedor|11");
                configurarEditarProveedor();
            }
        } else {
            texto.onchange = function (e) {
                var encontrado = true;
                var obj = document.getElementsByName("cabeceraProveedor");
                for (var y = 0; y < obj.length; y++) {
                    if (obj[y].nodeName == "SELECT") {
                        if (obj[y].selectedIndex != "0") {
                            encontrado = false;
                            break;
                        }
                    }
                    else {
                        if (obj[y].value != "") {
                            encontrado = false;
                            break;
                        }
                    }

                }
                if (encontrado) {
                    indiceActualPaginaProveedor = 0;
                }
                filtrar("Proveedor|11");
                configurarEditarProveedor();
            }
        }

    }

    var textos = document.getElementsByName("cabeceraProduccionFijoDescuento");
    var ntextos = textos.length;
    var texto;
    for (var i = 0; i < ntextos; i++) {
        texto = textos[i];
        if (texto.nodeName == "INPUT") {
            texto.onkeyup = function (e) {
                var encontrado = true;
                var obj = document.getElementsByName("cabeceraProduccionFijoDescuento");
                for (var y = 0; y < obj.length; y++) {
                    if (obj[y].nodeName == "SELECT") {
                        if (obj[y].selectedIndex != "0") {
                            encontrado = false;
                            break;
                        }
                    }
                    else {
                        if (obj[y].value != "") {
                            encontrado = false;
                            break;
                        }
                    }

                }
                if (encontrado) {
                    indiceActualPaginaProduccionFijoDescuento = 0;
                }
                filtrar("ProduccionFijoDescuento|12");
                configurarEditarDescuento();
            }
        } else {
            texto.onchange = function (e) {
                var encontrado = true;
                var obj = document.getElementsByName("cabeceraProduccionFijoDescuento");
                for (var y = 0; y < obj.length; y++) {
                    if (obj[y].nodeName == "SELECT") {
                        if (obj[y].selectedIndex != "0") {
                            encontrado = false;
                            break;
                        }
                    }
                    else {
                        if (obj[y].value != "") {
                            encontrado = false;
                            break;
                        }
                    }

                }
                if (encontrado) {
                    indiceActualPaginaProduccionFijoDescuento = 0;
                }
                filtrar("ProduccionFijoDescuento|12");
                configurarEditarDescuento();
            }
        }

    }


}

function filtrar(elemento, opcion) {
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
        for (var j = 0; j < nCabeceras; j += 1) {
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
                        if (isNaN(campos[j]) || j == 7 || j == 8 || j == 4) window["matriz" + identificador[0]][x][j] = campos[j];
                        else window["matriz" + identificador[0]][x][j] = campos[j];
                    }
                    x++;
                    break;
                default:
                    for (j = 0; j < nCampos; j++) {
                        if (isNaN(campos[j]) || campos[j] == "") window["matriz" + identificador[0]][x][j] = campos[j];
                        else window["matriz" + identificador[0]][x][j] = campos[j];
                    }
                    x++;
                    break;
            }

        }
    }
    window["indiceActualBloque" + identificador[0]] = 0;
    //paginar(0, elemento);
    if (opcion == undefined) paginar(0, elemento);
    else paginar(window["indiceActualPagina" + identificador[0]], elemento);
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
    var nRegistros = window["matriz" + identificador[0]].length;
    var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
    if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
    var indiceUltimoBloque = Math.floor(nRegistros / (paginasBloque * registrosPagina));
    if (nRegistros % (paginasBloque * registrosPagina) == 0) indiceUltimoBloque--;
    var contenido = "";
    var inicio = window["indiceActualBloque" + identificador[0]] * paginasBloque;
    var fin = inicio + paginasBloque;
    if (window["indiceActualBloque" + identificador[0]] > 0 && nRegistros > (paginasBloque * registrosPagina)) {
        contenido += "<span class='pagina' onclick='paginar(-1,\"" + elemento + "\");' title='Ir al primer grupo de páginas'>&lt;&lt;</span>";
        contenido += "<span class='pagina' onclick='paginar(-2,\"" + elemento + "\");' title='Ir al anterior grupo de páginas'>&lt;</span>";
    }
    for (var i = inicio; i < fin; i += 1) {
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
    if (window["indiceActualBloque" + identificador[0]] < indiceUltimoBloque && nRegistros > (paginasBloque * registrosPagina)) {
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

function DescargarContrato(rpta) {
    if (rpta.size > 0) {
        var aAdjunto = document.getElementById("aAdjunto");
        var archivo = aAdjunto.getAttribute("data-archivo");
        var tipo = "";
        switch (archivo.split(".")[1]) {
            case "pdf":
                tipo = 'application/pdf';
                break;
            case "doc":
                tipo = 'application/msword';
                break;
            case "docx":
                tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
        }
        var blob = new Blob([rpta], {
            type: tipo
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        var arr = archivo.split("_");
        arr.shift();
        a.download = arr.join("_");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        delete a;
    }
    else {
        mostraralerta("No se ha encontrado el archivo");
    }
}

function DescargarContratoFijo(rpta) {
    if (rpta.size > 0) {
        var aAdjunto = document.getElementById("aAdjuntocf");
        var archivo = aAdjunto.getAttribute("data-archivo");
        var tipo = "";
        switch (archivo.split(".")[1]) {
            case "pdf":
                tipo = 'application/pdf';
                break;
            case "doc":
                tipo = 'application/msword';
                break;
            case "docx":
                tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
        }
        var blob = new Blob([rpta], {
            type: tipo
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        var arr = archivo.split("_");
        arr.shift();
        a.download = arr.join("_");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        delete a;
    }
    else {
        mostraralerta("No se ha encontrado el archivo");
    }
}

function DescargarContrato2(rpta) {
    if (rpta.size > 0) {
        var arr = ArchivoActual.split("_");
        arr.shift();
        var archivo = arr.join("_");
        var tipo = "";
        switch (archivo.split(".")[1]) {
            case "pdf":
                tipo = 'application/pdf';
                break;
            case "doc":
                tipo = 'application/msword';
                break;
            case "docx":
                tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
        }
        var blob = new Blob([rpta], {
            type: tipo
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = archivo;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        delete a;
    }
    else {
        mostraralerta("No se ha encontrado el archivo");
    }
}

function configurarControles() {
    var btngrabarAutRec = document.getElementById("btngrabarAutRec");
    btngrabarAutRec.onclick = function () {
        var id = this.getAttribute("data-id");
        var opc = this.getAttribute("data-opc");
        var cab = this.getAttribute("data-cab");
        var url = urlBase + "Configuracion/AutorizarRechazarContrato?ss=" + ss + "&opc=" + opc + "&id=" + id + "&cab=" + cab;
        $.ajax(url, "get", mostrarAutorizarRechazarContrato);
        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
        this.onclick = null;
    }

    var btnDetAutorizar = document.getElementById("btnDetAutorizar");
    var btnDetRechazar = document.getElementById("btnDetRechazar");
    if (btnDetAutorizar != null) {
        btnDetAutorizar.onclick = function () {
            if (IndicadorCabecera == false) {
                mostrarAutRec(false, true, this.getAttribute("data-id"));
            } else {
                var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
                mostrarAutRec(true, true, txtDoctorCodigo);
            }
            abrirPopup('PopupAutRec');
        }
    }

    if (btnDetRechazar != null) {
        btnDetRechazar.onclick = function () {
            if (IndicadorCabecera == false) {
                mostrarAutRec(false, false, this.getAttribute("data-id"));
            } else {
                var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
                mostrarAutRec(true, false, txtDoctorCodigo);
            }
            abrirPopup('PopupAutRec');
        }
    }

    var btnConfRec = document.getElementById("btnConfRec");
    if (btnConfRec != null) {
        btnConfRec.onclick = function () {
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            asignarIdAutRec(txtDoctorCodigo);
            IndicadorCabecera = true;
            abrirPopup("PopupDetalleAutRec");
        }
    }

    //var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
    //if (btnDoctorAutorizar != null) {
    //	btnDoctorAutorizar.onclick = function () {
    //		var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
    //    	asignarIdAutRec(txtDoctorCodigo);        	
    //    	mostrarAutRec(true, true, txtDoctorCodigo);
    //        IndicadorCabecera = true;
    //        abrirPopup("PopupDetalleAutRec");
    //    }
    //}

    //var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
    //if (btnDoctorRechazar != null) {
    //	btnDoctorRechazar.onclick = function () {
    //		var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
    //    	asignarIdAutRec(txtDoctorCodigo);        	
    //    	mostrarAutRec(true, false, txtDoctorCodigo);
    //    	IndicadorCabecera = true;        	
    //        abrirPopup("PopupDetalleAutRec");
    //    }
    //}

    var aAdjunto = document.getElementById("aAdjunto");
    aAdjunto.onclick = function () {
        var archivo = this.getAttribute("data-archivo");
        var nArchivo = archivo.split("¬");
        if (nArchivo.length > 1) {
        } else {
            var frm = new FormData();
            var extension = archivo.split(".");
            frm.append("archivoCliente", archivo);
            frm.append("extension", extension[extension.length - 1]);
            var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=1&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

            var xhr = new XMLHttpRequest();
            xhr.open("post", url);
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    DescargarContrato(xhr.response);
                }
            }
            xhr.send(frm);
        }
    }
    var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio");
    txtDoctorFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtDoctorFechaInicio.readOnly = false;
    var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin");
    txtDoctorFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtDoctorFechaFin.readOnly = false;
    var txtPFConfiguracionFechaInicio = document.getElementById("txtPFConfiguracionFechaInicio");
    txtPFConfiguracionFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtPFConfiguracionFechaInicio.readOnly = false;
    var txtPFConfiguracionFechaFin = document.getElementById("txtPFConfiguracionFechaFin");
    txtPFConfiguracionFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtPFConfiguracionFechaFin.readOnly = false;
    var txtPFBonificacionFechaInicio = document.getElementById("txtPFBonificacionFechaInicio");
    txtPFBonificacionFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtPFBonificacionFechaInicio.readOnly = false;
    var txtPFBonificacionFechaFin = document.getElementById("txtPFBonificacionFechaFin");
    txtPFBonificacionFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtPFBonificacionFechaFin.readOnly = false;
    var txtProduccionEscalonadaFechaInicio = document.getElementById("txtProduccionEscalonadaFechaInicio");
    txtProduccionEscalonadaFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtProduccionEscalonadaFechaInicio.readOnly = false;
    var txtProduccionEscalonadaFechaFin = document.getElementById("txtProduccionEscalonadaFechaFin");
    txtProduccionEscalonadaFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtProduccionEscalonadaFechaFin.readOnly = false;
    var txtPopupContratoFijoFechaInicio = document.getElementById("txtPopupContratoFijoFechaInicio");
    txtPopupContratoFijoFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtPopupContratoFijoFechaInicio.readOnly = false;
    var txtPopupContratoFijoFechaFin = document.getElementById("txtPopupContratoFijoFechaFin");
    txtPopupContratoFijoFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtPopupContratoFijoFechaFin.readOnly = false;
    var txtHorarioCalculoFechaInicio = document.getElementById("txtHorarioCalculoFechaInicio");
    txtHorarioCalculoFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtHorarioCalculoFechaInicio.readOnly = false;
    var txtHorarioCalculoFechaFin = document.getElementById("txtHorarioCalculoFechaFin");
    txtHorarioCalculoFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtHorarioCalculoFechaFin.readOnly = false;
    var txtHorarioBonificacionFechaInicio = document.getElementById("txtHorarioBonificacionFechaInicio");
    txtHorarioBonificacionFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtHorarioBonificacionFechaInicio.readOnly = false;
    var txtHorarioBonificacionFechaFin = document.getElementById("txtHorarioBonificacionFechaFin");
    txtHorarioBonificacionFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtHorarioBonificacionFechaFin.readOnly = false;
    var txtTurnoCalculoFechaInicio = document.getElementById("txtTurnoCalculoFechaInicio");
    txtTurnoCalculoFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtTurnoCalculoFechaInicio.readOnly = false;
    var txtTurnoCalculoFechaFin = document.getElementById("txtTurnoCalculoFechaFin");
    txtTurnoCalculoFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtTurnoCalculoFechaFin.readOnly = false;
    var txtTurnoBonificacionFechaInicio = document.getElementById("txtTurnoBonificacionFechaInicio");
    txtTurnoBonificacionFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtTurnoBonificacionFechaInicio.readOnly = false;
    var txtTurnoBonificacionFechaFin = document.getElementById("txtTurnoBonificacionFechaFin");
    txtTurnoBonificacionFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtTurnoBonificacionFechaFin.readOnly = false;
    var txtCCompartidoFechaInicio = document.getElementById("txtCCompartidoFechaInicio");
    txtCCompartidoFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtCCompartidoFechaInicio.readOnly = false;
    var txtCCompartidoFechaFin = document.getElementById("txtCCompartidoFechaFin");
    txtCCompartidoFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtCCompartidoFechaFin.readOnly = false;
    var txtVacunaFechaInicio = document.getElementById("txtVacunaFechaInicio");
    txtVacunaFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    txtVacunaFechaInicio.readOnly = false;
    var txtVacunaFechaFin = document.getElementById("txtVacunaFechaFin");
    txtVacunaFechaFin.DatePickerX.init({
        mondayFirst: true
    });
    txtVacunaFechaFin.readOnly = false;

    var txtCopiaFechaInicio = document.getElementById("txtCopiaFechaInicio");
    txtCopiaFechaInicio.DatePickerX.init({
        mondayFirst: true
    });
    var txtCopiaFechaFin = document.getElementById("txtCopiaFechaFin");
    txtCopiaFechaFin.DatePickerX.init({
        mondayFirst: true
    });

    var ddlPFBonificacionCondicion = document.getElementById("ddlPFBonificacionCondicion");
    ddlPFBonificacionCondicion.onchange = function () {
        var txtPFBonificacionVal = document.getElementById("txtPFBonificacionVal");
        if (this.value == "D") {
            txtPFBonificacionVal.value = "0.00";
            txtPFBonificacionVal.className += " lectura";
            txtPFBonificacionVal.readOnly = true;
        }
        else {
            if (txtPFBonificacionVal.className.indexOf("lectura") > -1) {
                txtPFBonificacionVal.value = "0.00";
                txtPFBonificacionVal.className = txtPFBonificacionVal.className.split("lectura").join("").trim();
            }
            txtPFBonificacionVal.readOnly = false;
        }
    }

    var ddlPFConfiguracionAseguradora = document.getElementById("ddlPFConfiguracionAseguradora");
    ddlPFConfiguracionAseguradora.onchange = function () {
        llenarCombo2(listaAseguradoraContrato, "ddlPFConfiguracionContrato", "");
    }

    var ddlPFConfiguracionTipoAdmision = document.getElementById("ddlPFConfiguracionTipoAdmision");
    ddlPFConfiguracionTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlPFConfiguracionTipoPaciente", "");
    }

    var ddlPFConfiguracionTipoValor = document.getElementById("ddlPFConfiguracionTipoValor");
    ddlPFConfiguracionTipoValor.onchange = function () {
        var txtPFConfiguracionValMax = document.getElementById("txtPFConfiguracionValMax");
        var txtPFConfiguracionValMin = document.getElementById("txtPFConfiguracionValMin");
        switch (this.value) {
            case "F":
                txtPFConfiguracionValMax.setAttribute("placeholder", "Porcentaje");
                txtPFConfiguracionValMin.setAttribute("placeholder", "Factor");
                txtPFConfiguracionValMax.style.display = "";
                break;
            default:
                txtPFConfiguracionValMax.setAttribute("placeholder", "");
                txtPFConfiguracionValMin.setAttribute("placeholder", "");
                txtPFConfiguracionValMax.style.display = "none";
                break;
        }
    }

    var ddlPFBonificacionTipoAdmision = document.getElementById("ddlPFBonificacionTipoAdmision");
    ddlPFBonificacionTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlPFBonificacionTipoPaciente", "");
    }

    var ddlPFBonificacionTipoDia = document.getElementById("ddlPFBonificacionTipoDia");
    ddlPFBonificacionTipoDia.onchange = function () {
        var PFocultar = document.getElementsByClassName("PFocultar");
        for (var x = 0; x < PFocultar.length; x++) {
            if (PFocultar[x].getAttribute("data-com") == this.value) {
                PFocultar[x].style.display = "";
            }
            else {
                if (PFocultar[x].getAttribute("data-com") == "D" && this.value == "T") {
                    PFocultar[x].style.display = "";
                }
                else {
                    PFocultar[x].style.display = "none";
                }
            }
        }
        var checks = document.getElementsByName("rdn-PFBonificacion");
        if (this.value == "T") {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = true;
                checks[y].checked = true;
            }
        }
        else {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = false;
                checks[y].checked = false;
            }
        }
    }

    var ddlPFBonificacionTipoFeriado = document.getElementById("ddlPFBonificacionTipoFeriado");
    ddlPFBonificacionTipoFeriado.onchange = function () {
        var ddlPFBonificacionTipoDiaFecha = document.getElementById("ddlPFBonificacionTipoDiaFecha");
        if (this.value == "F") {
            ddlPFBonificacionTipoDiaFecha.className = "";
            ddlPFBonificacionTipoDiaFecha.disabled = false;
        }
        else {
            ddlPFBonificacionTipoDiaFecha.className = "lectura";
            ddlPFBonificacionTipoDiaFecha.disabled = true;
        }
    }

    var ddlProduccionEscalonadaTipoAdmision = document.getElementById("ddlProduccionEscalonadaTipoAdmision");
    ddlProduccionEscalonadaTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlProduccionEscalonadaTipoPaciente", "");
    }

    var ddlPopupContratoFijoTurno = document.getElementById("ddlPopupContratoFijoTurno");
    ddlPopupContratoFijoTurno.onchange = function () {
        var txtPopupContratoFijoHoraInicio = document.getElementById("txtPopupContratoFijoHoraInicio")
        var txtPopupContratoFijoHoraFin = document.getElementById("txtPopupContratoFijoHoraFin")
        if (this.value != "") {
            var opcion = this.options[this.selectedIndex].text;
            txtPopupContratoFijoHoraInicio.className = "form-texto";
            txtPopupContratoFijoHoraFin.className = "form-texto";
            txtPopupContratoFijoHoraInicio.readOnly = false;
            txtPopupContratoFijoHoraFin.readOnly = false;
            txtPopupContratoFijoHoraInicio.value = opcion.split(" ")[opcion.split(" ").length - 2].toString().trim();;
            txtPopupContratoFijoHoraFin.value = opcion.split(" ")[opcion.split(" ").length - 1].toString().trim();;
        }
        else {
            txtPopupContratoFijoHoraInicio.className = "form-texto lectura";
            txtPopupContratoFijoHoraFin.className = "form-texto lectura";
            txtPopupContratoFijoHoraInicio.readOnly = true;
            txtPopupContratoFijoHoraFin.readOnly = true;
            txtPopupContratoFijoHoraInicio.value = "";
            txtPopupContratoFijoHoraFin.value = "";
        }
    }

    var txtPopupContratoFijoHoraInicio = document.getElementById("txtPopupContratoFijoHoraInicio");
    txtPopupContratoFijoHoraInicio.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var txtPopupContratoFijoHoraFin = document.getElementById("txtPopupContratoFijoHoraFin");
    txtPopupContratoFijoHoraFin.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var ddlHorarioCalculoTipoAdmision = document.getElementById("ddlHorarioCalculoTipoAdmision");
    ddlHorarioCalculoTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlHorarioCalculoTipoPaciente", "");
    }

    var ddlHorarioCalculoTurno = document.getElementById("ddlHorarioCalculoTurno");
    ddlHorarioCalculoTurno.onchange = function () {
        var txtHorarioCalculoHoraInicio = document.getElementById("txtHorarioCalculoHoraInicio")
        var txtHorarioCalculoHoraFin = document.getElementById("txtHorarioCalculoHoraFin")
        if (this.value != "") {
            var opcion = this.options[this.selectedIndex].text;
            txtHorarioCalculoHoraInicio.className = "form-texto";
            txtHorarioCalculoHoraFin.className = "form-texto";
            txtHorarioCalculoHoraInicio.readOnly = false;
            txtHorarioCalculoHoraFin.readOnly = false;
            txtHorarioCalculoHoraInicio.value = opcion.split(" ")[opcion.split(" ").length - 2].toString().trim();;
            txtHorarioCalculoHoraFin.value = opcion.split(" ")[opcion.split(" ").length - 1].toString().trim();;
        }
        else {
            txtHorarioCalculoHoraInicio.className = "form-texto lectura";
            txtHorarioCalculoHoraFin.className = "form-texto lectura";
            txtHorarioCalculoHoraInicio.readOnly = true;
            txtHorarioCalculoHoraFin.readOnly = true;
            txtHorarioCalculoHoraInicio.value = "";
            txtHorarioCalculoHoraFin.value = "";
        }
    }

    var txtHorarioCalculoHoraInicio = document.getElementById("txtHorarioCalculoHoraInicio");
    txtHorarioCalculoHoraInicio.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var txtHorarioCalculoHoraFin = document.getElementById("txtHorarioCalculoHoraFin");
    txtHorarioCalculoHoraFin.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var ddlTurnoCalculoTurno = document.getElementById("ddlTurnoCalculoTurno");
    ddlTurnoCalculoTurno.onchange = function () {
        var txtTurnoCalculoHoraInicio = document.getElementById("txtTurnoCalculoHoraInicio")
        var txtTurnoCalculoHoraFin = document.getElementById("txtTurnoCalculoHoraFin")
        if (this.value != "") {
            var opcion = this.options[this.selectedIndex].text;
            txtTurnoCalculoHoraInicio.className = "form-texto";
            txtTurnoCalculoHoraFin.className = "form-texto";
            txtTurnoCalculoHoraInicio.readOnly = false;
            txtTurnoCalculoHoraFin.readOnly = false;
            txtTurnoCalculoHoraInicio.value = opcion.split(" ")[opcion.split(" ").length - 2].toString().trim();;
            txtTurnoCalculoHoraFin.value = opcion.split(" ")[opcion.split(" ").length - 1].toString().trim();;
        }
        else {
            txtTurnoCalculoHoraInicio.className = "form-texto lectura";
            txtTurnoCalculoHoraFin.className = "form-texto lectura";
            txtTurnoCalculoHoraInicio.readOnly = true;
            txtTurnoCalculoHoraFin.readOnly = true;
            txtTurnoCalculoHoraInicio.value = "";
            txtTurnoCalculoHoraFin.value = "";
        }
    }

    var txtTurnoCalculoHoraInicio = document.getElementById("txtTurnoCalculoHoraInicio");
    txtTurnoCalculoHoraInicio.onkeyup = function (event) {
        formatoHora(this, event);
    }

    var txtTurnoCalculoHoraFin = document.getElementById("txtTurnoCalculoHoraFin");
    txtTurnoCalculoHoraFin.onkeyup = function (event) {
        formatoHora(this, event);
    }


    var ddlHorarioCalculoTipoDia = document.getElementById("ddlHorarioCalculoTipoDia");
    ddlHorarioCalculoTipoDia.onchange = function () {
        var HCocultar = document.getElementsByClassName("HCocultar");
        for (var x = 0; x < HCocultar.length; x++) {
            if (HCocultar[x].getAttribute("data-com") == this.value) {
                HCocultar[x].style.display = "";
            }
            else {
                if (HCocultar[x].getAttribute("data-com") == "D" && this.value == "T") {
                    HCocultar[x].style.display = "";
                }
                else {
                    HCocultar[x].style.display = "none";
                }
            }
        }

        var checks = document.getElementsByName("rdn-HorarioCalculo");
        if (this.value == "T") {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = true;
                checks[y].checked = true;
            }
        }
        else {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = false;
                checks[y].checked = false;
            }
        }
    }

    var ddlHorarioCalculoTipoFeriado = document.getElementById("ddlHorarioCalculoTipoFeriado");
    ddlHorarioCalculoTipoFeriado.onchange = function () {
        var ddlHorarioCalculoTipoDiaFecha = document.getElementById("ddlHorarioCalculoTipoDiaFecha");
        if (this.value == "F") {
            ddlHorarioCalculoTipoDiaFecha.className = "";
            ddlHorarioCalculoTipoDiaFecha.disabled = false;
        }
        else {
            ddlHorarioCalculoTipoDiaFecha.className = "lectura";
            ddlHorarioCalculoTipoDiaFecha.disabled = true;
        }
    }

    var ddlHorarioBonificacionTipoAdmision = document.getElementById("ddlHorarioBonificacionTipoAdmision");
    ddlHorarioBonificacionTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlHorarioBonificacionTipoPaciente", "");
    }

    var ddlHorarioBonificacionTipoDia = document.getElementById("ddlHorarioBonificacionTipoDia");
    ddlHorarioBonificacionTipoDia.onchange = function () {
        var HBocultar = document.getElementsByClassName("HBocultar");
        for (var x = 0; x < HBocultar.length; x++) {
            if (HBocultar[x].getAttribute("data-com") == this.value) {
                HBocultar[x].style.display = "";
            }
            else {
                if (HBocultar[x].getAttribute("data-com") == "D" && this.value == "T") {
                    HBocultar[x].style.display = "";
                }
                else {
                    HBocultar[x].style.display = "none";
                }
            }
        }

        var checks = document.getElementsByName("rdn-HorarioBonificacion");
        if (this.value == "T") {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = true;
                checks[y].checked = true;
            }
        }
        else {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = false;
                checks[y].checked = false;
            }
        }
    }

    var ddlHorarioBonificacionTipoFeriado = document.getElementById("ddlHorarioBonificacionTipoFeriado");
    ddlHorarioBonificacionTipoFeriado.onchange = function () {
        var ddlHorarioBonificacionTipoDiaFecha = document.getElementById("ddlHorarioBonificacionTipoDiaFecha");
        if (this.value == "F") {
            ddlHorarioBonificacionTipoDiaFecha.className = "";
            ddlHorarioBonificacionTipoDiaFecha.disabled = false;
        }
        else {
            ddlHorarioBonificacionTipoDiaFecha.className = "lectura";
            ddlHorarioBonificacionTipoDiaFecha.disabled = true;
        }
    }

    var ddlTurnoCalculoTipoAdmision = document.getElementById("ddlTurnoCalculoTipoAdmision");
    ddlTurnoCalculoTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlTurnoCalculoTipoPaciente", "");
    }

    var ddlTurnoCalculoTipoValor = document.getElementById("ddlTurnoCalculoTipoValor");
    ddlTurnoCalculoTipoValor.onchange = function () {
        var spnTurnoTipoValor = document.getElementById("spnTurnoTipoValor");
        var TCocultar = document.getElementsByClassName("TCocultar");
        if (this.value == "T") {
            spnTurnoTipoValor.innerHTML = "Turno";
            TCocultar[0].style.display = "";
            TCocultar[1].style.display = "";
        }
        else {
            spnTurnoTipoValor.innerHTML = "Hora";
            TCocultar[0].style.display = "none";
            TCocultar[1].style.display = "none";
        }
    }

    var ddlTurnoCalculoTipoDia = document.getElementById("ddlTurnoCalculoTipoDia");
    ddlTurnoCalculoTipoDia.onchange = function () {
        var THCocultar = document.getElementsByClassName("THCocultar");
        for (var x = 0; x < THCocultar.length; x++) {
            if (THCocultar[x].getAttribute("data-com") == this.value) {
                THCocultar[x].style.display = "";
            }
            else {
                if (THCocultar[x].getAttribute("data-com") == "D" && this.value == "T") {
                    THCocultar[x].style.display = "";
                }
                else {
                    THCocultar[x].style.display = "none";
                }
            }
        }

        var checks = document.getElementsByName("rdn-TurnoCalculo");
        if (this.value == "T") {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = true;
                checks[y].checked = true;
            }
        }
        else {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = false;
                checks[y].checked = false;
            }
        }
    }

    var ddlTurnoCalculoTipoFeriado = document.getElementById("ddlTurnoCalculoTipoFeriado");
    ddlTurnoCalculoTipoFeriado.onchange = function () {
        var ddlTurnoCalculoTipoDiaFecha = document.getElementById("ddlTurnoCalculoTipoDiaFecha");
        if (this.value == "F") {
            ddlTurnoCalculoTipoDiaFecha.className = "";
            ddlTurnoCalculoTipoDiaFecha.disabled = false;
        }
        else {
            ddlTurnoCalculoTipoDiaFecha.className = "lectura";
            ddlTurnoCalculoTipoDiaFecha.disabled = true;
        }
    }

    var ddlTurnoBonificacionTipoAdmision = document.getElementById("ddlTurnoBonificacionTipoAdmision");
    ddlTurnoBonificacionTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlTurnoBonificacionTipoPaciente", "");
    }

    var ddlTurnoBonificacionTipoDia = document.getElementById("ddlTurnoBonificacionTipoDia");
    ddlTurnoBonificacionTipoDia.onchange = function () {
        var TBocultar = document.getElementsByClassName("TBocultar");
        for (var x = 0; x < TBocultar.length; x++) {
            if (TBocultar[x].getAttribute("data-com") == this.value) {
                TBocultar[x].style.display = "";
            }
            else {
                if (TBocultar[x].getAttribute("data-com") == "D" && this.value == "T") {
                    TBocultar[x].style.display = "";
                }
                else {
                    TBocultar[x].style.display = "none";
                }
            }
        }

        var checks = document.getElementsByName("rdn-TurnoBonificacion");
        if (this.value == "T") {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = true;
                checks[y].checked = true;
            }
        }
        else {
            for (var y = 0; y < checks.length; y++) {
                checks[y].disabled = false;
                checks[y].checked = false;
            }
        }
    }

    var ddlTurnoBonificacionTipoFeriado = document.getElementById("ddlTurnoBonificacionTipoFeriado");
    ddlTurnoBonificacionTipoFeriado.onchange = function () {
        var ddlTurnoBonificacionTipoDiaFecha = document.getElementById("ddlTurnoBonificacionTipoDiaFecha");
        if (this.value == "F") {
            ddlTurnoBonificacionTipoDiaFecha.className = "";
            ddlTurnoBonificacionTipoDiaFecha.disabled = false;
        }
        else {
            ddlTurnoBonificacionTipoDiaFecha.className = "lectura";
            ddlTurnoBonificacionTipoDiaFecha.disabled = true;
        }
    }

    var ddlCCompartidoTipoAdmision = document.getElementById("ddlCCompartidoTipoAdmision");
    ddlCCompartidoTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlCCompartidoTipoPaciente", "");
    }

    var ddlCCompartidoTipoValor = document.getElementById("ddlCCompartidoTipoValor");
    ddlCCompartidoTipoValor.onchange = function () {
        var txtCCompartidoValMax = document.getElementById("txtCCompartidoValMax");
        var txtCCompartidoValMin = document.getElementById("txtCCompartidoValMin");
        if (this.value == "F") {
            txtCCompartidoValMax.setAttribute("placeholder", "Porcentaje");
            txtCCompartidoValMin.setAttribute("placeholder", "Factor");
            txtCCompartidoValMax.style.display = "";
        }
        else {
            txtCCompartidoValMax.setAttribute("placeholder", "");
            txtCCompartidoValMin.setAttribute("placeholder", "");
            txtCCompartidoValMax.style.display = "none";
        }
    }

    var ddlProduccionEscalonadaFactor = document.getElementById("ddlProduccionEscalonadaFactor");
    ddlProduccionEscalonadaFactor.onchange = function () {
        var txtProduccionEscalonadaValMax = document.getElementById("txtProduccionEscalonadaValMax");
        var txtProduccionEscalonadaValMin = document.getElementById("txtProduccionEscalonadaValMin");
        if (this.value == "F") {
            txtProduccionEscalonadaValMax.setAttribute("placeholder", "Porcentaje");
            txtProduccionEscalonadaValMin.setAttribute("placeholder", "Factor");
            txtProduccionEscalonadaValMax.style.display = "";
        }
        else {
            txtProduccionEscalonadaValMax.setAttribute("placeholder", "");
            txtProduccionEscalonadaValMin.setAttribute("placeholder", "");
            txtProduccionEscalonadaValMax.style.display = "none";
        }
    }

    var ddlVacunaTipoAdmision = document.getElementById("ddlVacunaTipoAdmision");
    ddlVacunaTipoAdmision.onchange = function () {
        comboActual = this.value;
        llenarCombo(listaPaciente, "ddlVacunaTipoPaciente", "");
    }

    var ddlVacunaTipoValor = document.getElementById("ddlVacunaTipoValor");
    ddlVacunaTipoValor.onchange = function () {
        var txtCVacunaValMax = document.getElementById("txtCVacunaValMax");
        var txtVacunaoValMin = document.getElementById("txtVacunaoValMin");
        switch (this.value) {
            case "F":
                txtCVacunaValMax.setAttribute("placeholder", "Porcentaje");
                txtVacunaoValMin.setAttribute("placeholder", "Factor");
                txtCVacunaValMax.style.display = "";
                break;
            default:
                txtCVacunaValMax.setAttribute("placeholder", "");
                txtVacunaoValMin.setAttribute("placeholder", "");
                txtCVacunaValMax.style.display = "none";
                break;
        }
    }

    var btnBusqueda = document.getElementById("btnBusqueda");
    btnBusqueda.onclick = function () {
        var TextoPrincipal = document.getElementsByName("cabeceraPrincipal");
        for (var x = 0; x < TextoPrincipal.length; x++) {
            if (TextoPrincipal[x].nodeName == "SELECT") {
                TextoPrincipal[x].selectedIndex = "0";
            }
            else {
                TextoPrincipal[x].value = "";
            }
        }
        Buscar();
        NombreControl = this.innerHTML + "|" + this.id.toString();
        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
        this.onclick = null;
    }

    var btnBusquedaLimpiar = document.getElementById("btnBusquedaLimpiar");
    btnBusquedaLimpiar.onclick = function () {
        var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
        var txtBusquedaCodigo = document.getElementById("txtBusquedaCodigo");
        var ddlBusquedaEspecialidad = document.getElementById("ddlBusquedaEspecialidad");
        var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
        var txtBusquedaFechaInicio = document.getElementById("txtBusquedaFechaInicio");
        var txtBusquedaFechaFin = document.getElementById("txtBusquedaFechaFin");
        var chkPendienteAut = document.getElementById("chkPendienteAut");
        document.getElementById("hdfMedico").value = "-1";
        document.getElementById("hdfEmpresa").value = "-1";
        idMedico = "";
        idEmpresa = "";
        txtBusquedaMedico.value = "";
        txtBusquedaCodigo.value = "";
        txtBusquedaFechaInicio.value = "";
        txtBusquedaFechaFin.value = "";
        ddlBusquedaEspecialidad.value = "";
        txtBusquedaEmpresa.value = "";
        chkPendienteAut.checked = false;
        matrizPrincipal = [];
        paginar(0, "Principal|0");
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

    var spnEmpresaBusqueda = document.getElementById("spnEmpresaBusqueda");
    spnEmpresaBusqueda.onclick = function () {
        tipoSeleccion = 0;
        var ifrEmpresa = document.getElementById("ifrEmpresa");
        if (ifrEmpresa.innerHTML == "") {
            ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupEmpresa");
    }

    var spnEmpresaBusqueda = document.getElementById("spnEmpresaBusquedaP");
    spnEmpresaBusqueda.onclick = function () {
        tipoSeleccion = 1;
        var ifrEmpresa = document.getElementById("ifrEmpresa");
        if (ifrEmpresa.innerHTML == "") {
            ifrEmpresa.innerHTML = "<iframe style='margin:0;padding:0;width:750px;height:500px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/EmpresaLista/?ss=" + ss + "'></iframe>";
        }
        abrirPopup("PopupEmpresa");
    }

    var hdfMedico = document.getElementById("hdfMedico");
    hdfMedico.onchange = function () {
        if (this.value != "-1") {
            var hdfOpc = document.getElementById("hdfOpc").value;
            var datos = this.value.split("¦");
            var PopupDuplicar = document.getElementById("PopupDuplicar");
            if (PopupDuplicar.className.indexOf("Open") > -1) {
                var txtCopiaMedico = document.getElementById("txtCopiaMedico");
                txtCopiaMedico.value = datos[1];
            }
            else {
                idMedico = datos[0];
                if (hdfOpc != "-1") {
                    var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa");
                    txtDoctorEmpresa.value = datos[1];
                } else {
                    var txtBusquedaMedico = document.getElementById("txtBusquedaMedico");
                    txtBusquedaMedico.value = datos[1];
                }
            }
        }
    }

    var hdfEmpresa = document.getElementById("hdfEmpresa");
    hdfEmpresa.onchange = function () {
        if (this.value != "-1") {
            var datos = this.value.split("¦");
            if (tipoSeleccion == 0) {
                idEmpresa = datos[0];
                var txtBusquedaEmpresa = document.getElementById("txtBusquedaEmpresa");
                txtBusquedaEmpresa.value = datos[1];
            } else {
                document.getElementById("hdfEmpresaP").value = datos[0];
                document.getElementById("txtEmpresaP").value = datos[1];
                document.getElementById("txtRucP").value = datos[2];

                var url = urlBase + "Configuracion/ProveedorCorreoAlterno/?ss=" + ss + "&id=" + datos[0];
                $.ajax(url, "get", mostrarCorreoAlterno);
            }
        }
    }

    var btnDoctorCancelar = document.getElementById("btnDoctorCancelar");
    btnDoctorCancelar.onclick = function () {
        if (SoloVer) {
            SoloVer = false;
            desabilitarControles(SoloVer);
        }
        var TextoPrincipal = document.getElementsByName("cabeceraPrincipal");
        for (var x = 0; x < TextoPrincipal.length; x++) {
            if (TextoPrincipal[x].nodeName == "SELECT") {
                TextoPrincipal[x].selectedIndex = "0";
            }
            else {
                TextoPrincipal[x].value = "";
            }
        }
        AlmacenarClick = false;
        idTabActual = 0;
        var hdfOpc = document.getElementById("hdfOpc");
        hdfOpc.value = "-1";
        idMedico = MedicoActual;
        document.getElementById("btnBusqueda").click();
        var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
        var divDoctor = document.getElementById("divDoctor");
        divBusquedaDoctor.style.display = "";
        divDoctor.style.display = "none";
        var spnDoctor = document.getElementsByClassName("spnDoctor");
        for (var x = 0; x < spnDoctor.length; x++) {
            //spnDoctor[x].style.pointerEvents = "auto";
            spnDoctor[x].style.display = "";
        }
        indiceActualPaginaProduccionFijoConfiguracion = 0;
        indiceActualPaginaProduccionFijoBonificacion = 0;
        indiceActualPaginaProduccionEscalonada = 0;
        indiceActualPaginaContratoFijo = 0;
        indiceActualPaginaHorarioCalculo = 0;
        indiceActualPaginaHorarioBonificacion = 0;
        indiceActualPaginaTurnoCalculo = 0;
        indiceActualPaginaTurnoBonificacion = 0;
        indiceActualPaginaCompartido = 0;
        indiceActualPaginaVacuna = 0;
        indiceActualPaginaExcelLista1 = 0;
        indiceActualPaginaExcelLista2 = 0;
        indiceActualPaginaExcelLista3 = 0;
        indiceActualPaginaExcelLista4 = 0;
        indiceActualPaginaExcelLista5 = 0;
        indiceActualPaginaExcelLista6 = 0;
        indiceActualPaginaExcelLista7 = 0;
        indiceActualPaginaExcelLista8 = 0;
        indiceActualPaginaExcelLista9 = 0;
        indiceActualPaginaExcelLista10 = 0;
        indiceActualPaginaExcelLista11 = 0;
        indiceActualPaginaExcelLista12 = 0;
        indiceActualPaginaExcelLista13 = 0;
        indiceActualPaginaExcelLista14 = 0;
        indiceActualPaginaExcelLista15 = 0;
        indiceActualPaginaExcelLista16 = 0;
        indiceActualPaginaExcelLista17 = 0;
        indiceActualPaginaExcelLista18 = 0;
        indiceActualPaginaExcelLista19 = 0;
        indiceActualPaginaExcelLista20 = 0;
        indiceActualPaginaExcelLista21 = 0;
        indiceActualPaginaExcelPrestacion1 = 0;
        indiceActualPaginaExcelPrestacion2 = 0;
        indiceActualPaginaProveedor = 0;
        indiceActualBloquePrincipal = 0;
        indiceActualBloqueProduccionFijoConfiguracion = 0;
        indiceActualBloqueProduccionFijoBonificacion = 0;
        indiceActualBloqueProduccionEscalonada = 0;
        indiceActualBloqueContratoFijo = 0;
        indiceActualBloqueHorarioCalculo = 0;
        indiceActualBloqueHorarioBonificacion = 0;
        indiceActualBloqueTurnoCalculo = 0;
        indiceActualBloqueTurnoBonificacion = 0;
        indiceActualBloqueCompartido = 0;
        indiceActualBloqueVacuna = 0;
        indiceActualBloqueExcelLista1 = 0;
        indiceActualBloqueExcelLista2 = 0;
        indiceActualBloqueExcelLista3 = 0;
        indiceActualBloqueExcelLista4 = 0;
        indiceActualBloqueExcelLista5 = 0;
        indiceActualBloqueExcelLista6 = 0;
        indiceActualBloqueExcelLista7 = 0;
        indiceActualBloqueExcelLista8 = 0;
        indiceActualBloqueExcelLista9 = 0;
        indiceActualBloqueExcelLista10 = 0;
        indiceActualBloqueExcelLista11 = 0;
        indiceActualBloqueExcelLista12 = 0;
        indiceActualBloqueExcelLista13 = 0;
        indiceActualBloqueExcelLista14 = 0;
        indiceActualBloqueExcelLista15 = 0;
        indiceActualBloqueExcelLista16 = 0;
        indiceActualBloqueExcelLista17 = 0;
        indiceActualBloqueExcelLista18 = 0;
        indiceActualBloqueExcelLista19 = 0;
        indiceActualBloqueExcelLista20 = 0;
        indiceActualBloqueExcelLista21 = 0;
        indiceActualBloqueExcelPrestacion1 = 0;
        indiceActualBloqueExcelPrestacion2 = 0;
        indiceActualBloqueProveedor = 0;
        //document.getElementById("txtBusquedaMedico").value = "";
        //document.getElementById("txtBusquedaCodigo").value = "";
        //document.getElementById("txtBusquedaFechaInicio").value = "";
        //document.getElementById("txtBusquedaFechaFin").value = "";

    }

    var rdnConfiguracionPago = document.getElementsByName("rdn-ConfiguracionPago");
    for (var x = 0; x < rdnConfiguracionPago.length; x++) {
        rdnConfiguracionPago[x].onclick = function () {
            HabilitarChecks(this);
        }
    }

    var btnDoctorGrabar = document.getElementById("btnDoctorGrabar");
    if (btnDoctorGrabar != null) {
        btnDoctorGrabar.onclick = function () {
            AlmacenarClick = true;
            var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa").value;
            var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio").value;
            var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin").value;
            if (txtDoctorEmpresa != "") {
                if (txtDoctorFechaInicio != "" && txtDoctorFechaFin != "") {
                    if (!esFecha(txtDoctorFechaInicio)) {
                        mostraralerta("La fecha de inicio no es valida");
                    }
                    else if (!esFecha(txtDoctorFechaFin)) {
                        mostraralerta("La fecha de fin no es valida");
                    }
                    else {
                        if (fechaUTC(txtDoctorFechaInicio) > fechaUTC(txtDoctorFechaFin)) {
                            mostraralerta("La fecha de inicio no puede ser mayor a la fecha fin");
                        } else {
                            var hdfOpc = document.getElementById("hdfOpc").value;
                            var hdfMedico = document.getElementById("hdfMedico").value.split("¦")[0];
                            var txtDoctorObservacion = document.getElementById("txtDoctorObservacion").value;
                            var strDatos = hdfOpc + "|" + sucursalId + "|" + hdfMedico + "|" + txtDoctorFechaInicio + "|" + txtDoctorFechaFin + "|" + txtDoctorObservacion;
                            if (hdfOpc == 2) {
                                var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
                                strDatos += "|" + txtDoctorCodigo;
                                var checks = document.getElementsByName("rdn-ConfiguracionPago");
                                var contenido = "";
                                for (var x = 0; x < checks.length; x++) {
                                    if (checks[x].checked) {
                                        contenido += "1";
                                    }
                                    else {
                                        contenido += "0";
                                    }
                                }

                                strDatos += "|" + contenido;
                            }
                            var url = urlBase + "Configuracion/grabarMedicoContrato/?ss=" + ss;
                            $.ajax(url, "post", mostrarGrabarPrincipal, strDatos);
                        }
                    }
                }
                else {
                    mostraralerta("Ingrese las fechas");
                }
            }
            else {
                mostraralerta("Seleccione el médico");
            }
        }
    }


    var btngrabarEstado = document.getElementById("btngrabarEstado");
    btngrabarEstado.onclick = function () {
        //var matriz = window["Matriz" + instanciaActual];
        var valor1;
        var valor2;
        switch (instanciaActual) {
            case "Principal":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][1];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][10];
                anularPrincipal(valor1, valor2);
                break;
            case "ProduccionFijoConfiguracion":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][10];
                anularDetalle(valor1, valor2);
                break;
            case "ProduccionFijoBonificacion":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][10];
                anularDetalle(valor1, valor2);
                break;
            case "ProduccionEscalonada":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][9];
                anularDetalle(valor1, valor2);
                break;
            case "ContratoFijo":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][7];
                anularDetalle(valor1, valor2);
                break;
            case "HorarioCalculo":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][10];
                anularDetalle(valor1, valor2);
                break;
            case "HorarioBonificacion":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][9];
                anularDetalle(valor1, valor2);
                break;
            case "TurnoCalculo":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][9];
                anularDetalle(valor1, valor2);
                break;
            case "TurnoBonificacion":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][8];
                anularDetalle(valor1, valor2);
                break;
            case "Compartido":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][8];
                anularDetalle(valor1, valor2);
                break;
            case "Vacuna":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][8];
                anularDetalle(valor1, valor2);
                break;
            case "Proveedor":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][10];
                anularProveedor(valor1, valor2);
                break;
            case "ProduccionFijoDescuento":
                valor1 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][0];
                valor2 = window["matriz" + instanciaActual][window["Campoeliminar" + instanciaActual]][6];
                anularDescuento(valor1, valor2);
                break;
        }
    }

    var btngrabarPFConfiguracion = document.getElementById("btngrabarPFConfiguracion");
    btngrabarPFConfiguracion.onclick = function () {
        if (validarDetalle(1)) {
            idTabActual = 1;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtPFConfiguracionFechaInicio = document.getElementById("txtPFConfiguracionFechaInicio").value;
            var txtPFConfiguracionFechaFin = document.getElementById("txtPFConfiguracionFechaFin").value;
            var ddlPFConfiguracionTipoAtencion = document.getElementById("ddlPFConfiguracionTipoAtencion").value;
            var ddlPFConfiguracionTipoAdmision = document.getElementById("ddlPFConfiguracionTipoAdmision").value;
            var ddlPFConfiguracionTipoPaciente = document.getElementById("ddlPFConfiguracionTipoPaciente").value;
            var ddlPFConfiguracionAseguradora = document.getElementById("ddlPFConfiguracionAseguradora").value;
            var ddlPFConfiguracionEspecialidad = document.getElementById("ddlPFConfiguracionEspecialidad").value;
            var ddlPFConfiguracionTurno = document.getElementById("ddlPFConfiguracionTurno").value;
            var ddlPFConfiguracionTipoValor = document.getElementById("ddlPFConfiguracionTipoValor").value;
            var ddlPFConfiguracionContrato = document.getElementById("ddlPFConfiguracionContrato").value;
            var valorMin = document.getElementById("txtPFConfiguracionValMin").value;
            var ddlPFConfiguracionServicio = document.getElementById("ddlPFConfiguracionServicio").value;
            var valorMax = 0;
            if (ddlPFConfiguracionTipoValor == "F") {
                valorMax = document.getElementById("txtPFConfiguracionValMax").value;
            }
            var ddlPFConfiguracionPrestacion = document.getElementById("ddlPFConfiguracionPrestacion").value;
            var ddlPFConfiguracionTiempoPago = document.getElementById("ddlPFConfiguracionTiempoPago").value;
            var ddlPFConfiguracionModeloFacturacion = document.getElementById("ddlPFConfiguracionModeloFacturacion");
            var ddlPFConfiguracionAplicacion = document.getElementById("ddlPFConfiguracionAplicacion").value;

            var ListaPrestaciones = "";
            if (ddlPFConfiguracionPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            strDatos += txtDoctorCodigo + "|C|" + txtPFConfiguracionFechaInicio + "|" + txtPFConfiguracionFechaFin + "|" + ddlPFConfiguracionTipoAtencion + "|" + ddlPFConfiguracionTipoAdmision + "|" + ddlPFConfiguracionTipoPaciente + "|";
            strDatos += ddlPFConfiguracionAseguradora + "|" + ddlPFConfiguracionEspecialidad + "|" + ddlPFConfiguracionTurno + "|" + ddlPFConfiguracionTipoValor + "|" + valorMin + "|" + valorMax + "|" + ((ddlPFConfiguracionPrestacion == "") ? "T" : ddlPFConfiguracionPrestacion) + "|";
            strDatos += ddlPFConfiguracionTiempoPago;
            strDatos += "||||||||||||" + ListaPrestaciones + "|" + ddlPFConfiguracionContrato + "|" + (ddlPFConfiguracionServicio == "" ? 0 : ddlPFConfiguracionServicio) + "|" + (ddlPFConfiguracionModeloFacturacion.selectedIndex == "0" ? "-1" : ddlPFConfiguracionModeloFacturacion.value);
            strDatos += "|" + ddlPFConfiguracionAplicacion;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=1";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupPFConfiguracion");
        }
    }

    var btngrabarPFBonificacion = document.getElementById("btngrabarPFBonificacion");
    btngrabarPFBonificacion.onclick = function () {
        if (validarDetalle(2)) {
            idTabActual = 1;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var ddlPFBonificacionOperador = document.getElementById("ddlPFBonificacionOperador").value;
            var txtPFBonificacionFechaInicio = document.getElementById("txtPFBonificacionFechaInicio").value;
            var txtPFBonificacionFechaFin = document.getElementById("txtPFBonificacionFechaFin").value;
            var ddlPFBonificacionTipoAdmision = document.getElementById("ddlPFBonificacionTipoAdmision").value;
            var ddlPFBonificacionTipoPaciente = document.getElementById("ddlPFBonificacionTipoPaciente").value;
            var ddlPFBonificacionTipoAtencion = document.getElementById("ddlPFBonificacionTipoAtencion").value;
            var ddlPFBonificacionAseguradora = document.getElementById("ddlPFBonificacionAseguradora").value;
            var ddlPFBonificacionEspecialidad = document.getElementById("ddlPFBonificacionEspecialidad").value;
            var ddlPFBonificacionTurno = document.getElementById("ddlPFBonificacionTurno").value;
            var ddlPFBonificacionTipoDia = document.getElementById("ddlPFBonificacionTipoDia").value;
            var ddlPFBonificacionServicio = document.getElementById("ddlPFBonificacionServicio").value;
            var ddlPFBonificacionTipoBonificacion = document.getElementById("ddlPFBonificacionTipoBonificacion").value;
            var ddlPFBonificacionModeloFacturacion = document.getElementById("ddlPFBonificacionModeloFacturacion");
            var strDatos = "";
            var diasCheck = "";
            var fechaFeriado = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            if (ddlPFBonificacionTipoDia == "F") {
                var ddlPFBonificacionTipoFeriado = document.getElementById("ddlPFBonificacionTipoFeriado").value;
                if (ddlPFBonificacionTipoFeriado == "F") {
                    var ddlPFBonificacionTipoDiaFecha = document.getElementById("ddlPFBonificacionTipoDiaFecha");
                    fechaFeriado = ddlPFBonificacionTipoDiaFecha.options[ddlPFBonificacionTipoDiaFecha.selectedIndex].text;
                }
                diasCheck = "||||||";
            }
            else {
                var rdnBonificacion = document.getElementsByName("rdn-PFBonificacion");
                if (ddlPFBonificacionTipoDia == "D") {
                    for (var x = 0; x < rdnBonificacion.length; x++) {
                        if (rdnBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        else {
                            diasCheck += "False";
                        }
                        if (x != (rdnBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
                else {
                    for (var x = 0; x < rdnBonificacion.length; x++) {
                        if (rdnBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        if (x != (rdnBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
            }
            var ddlPFBonificacionCondicion = document.getElementById("ddlPFBonificacionCondicion").value;
            var valorMin = document.getElementById("txtPFBonificacionVal").value;
            var valorMax = 0;
            var ddlPFBonificacionPrestacion = document.getElementById("ddlPFBonificacionPrestacion").value;
            var ListaPrestaciones = "";
            if (ddlPFBonificacionPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            strDatos += txtDoctorCodigo + "|B|" + txtPFBonificacionFechaInicio + "|" + txtPFBonificacionFechaFin + "|" + ddlPFBonificacionTipoAtencion + "|" + ddlPFBonificacionTipoAdmision + "|" + ddlPFBonificacionTipoPaciente + "|";
            strDatos += ddlPFBonificacionAseguradora + "|" + ddlPFBonificacionEspecialidad + "|" + ddlPFBonificacionTurno + "|" + ddlPFBonificacionCondicion + "|" + valorMin + "|" + valorMax + "|" + ((ddlPFBonificacionPrestacion == "") ? "T" : ddlPFBonificacionPrestacion) + "|";
            strDatos += "|" + ddlPFBonificacionOperador + "|" + ddlPFBonificacionTipoDia + "|" + (ddlPFBonificacionTipoFeriado == undefined ? "" : ddlPFBonificacionTipoFeriado) + "|" + fechaFeriado + "|" + diasCheck + "|" + ListaPrestaciones + "|" + (ddlPFBonificacionServicio == "" ? 0 : ddlPFBonificacionServicio) + "|" + ddlPFBonificacionTipoBonificacion + "|" + (ddlPFBonificacionModeloFacturacion.selectedIndex == "0" ? "-1" : ddlPFBonificacionModeloFacturacion.value);
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=2";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupPFBonificacion");
        }
    }

    let btngrabarPFDescuento = document.getElementById("btngrabarPFDescuento");
    btngrabarPFDescuento.onclick = function () {

        if (validarDetalle(12)) {
            idTabActual = 1;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;

            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            let ddlPFDescuentoAplica = document.getElementById("ddlPFDescuentoAplica").value;
            let ddlPFDescuentoDescuento = document.getElementById("ddlPFDescuentoDescuento").value.split("|")[0];
            let ddlPFDescuentoTipoDescuento = document.getElementById("ddlPFDescuentoTipoDescuento").value;
            let ddlPFDescuentoTipoMonto = document.getElementById("ddlPFDescuentoTipoMonto").value;
            let txtPFDescuentoImporte = (document.getElementById("txtPFDescuentoImporte").value == "" ? "0" : document.getElementById("txtPFDescuentoImporte").value);
            let txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio").value;
            let txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin").value;


            var strDatos = idContratoDetalle + "|";

            strDatos += txtDoctorCodigo + "|" + ddlPFDescuentoAplica + "|" + ddlPFDescuentoDescuento + "|" + ddlPFDescuentoTipoDescuento + "|" + ddlPFDescuentoTipoMonto + "|" + txtPFDescuentoImporte + "|";
            strDatos += txtDoctorFechaInicio + "|" + txtDoctorFechaFin;

            var url = urlBase + "Configuracion/grabarConfiguracionPagoDescuento/?ss=" + ss + "&opc=12";
            $.ajax(url, "post", mostrarGrabarDetalleDescuento, strDatos);
            abrirPopup("PopupPFDescuento");
        }


    }

    var btngrabarProduccionEscalonada = document.getElementById("btngrabarProduccionEscalonada");
    btngrabarProduccionEscalonada.onclick = function () {
        if (validarDetalle(3)) {
            idTabActual = 2;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtProduccionEscalonadaFechaInicio = document.getElementById("txtProduccionEscalonadaFechaInicio").value;
            var txtProduccionEscalonadaFechaFin = document.getElementById("txtProduccionEscalonadaFechaFin").value;
            var ddlProduccionEscalonadaTipoRango = document.getElementById("ddlProduccionEscalonadaTipoRango").value;
            var txtProduccionEscalonadaRanMin = document.getElementById("txtProduccionEscalonadaRanMin").value;
            var txtProduccionEscalonadaRanMax = document.getElementById("txtProduccionEscalonadaRanMax").value;
            var ddlProduccionEscalonadaServicio = document.getElementById("ddlProduccionEscalonadaServicio").value;
            var ddlProduccionEscalonadaTipoAtencion = document.getElementById("ddlProduccionEscalonadaTipoAtencion").value;
            var ddlProduccionEscalonadaTipoAdmision = document.getElementById("ddlProduccionEscalonadaTipoAdmision").value;
            var ddlProduccionEscalonadaTipoPaciente = document.getElementById("ddlProduccionEscalonadaTipoPaciente").value;
            var ddlProduccionEscalonadaEspecialidad = document.getElementById("ddlProduccionEscalonadaEspecialidad").value;
            var ddlProduccionEscalonadaAseguradora = document.getElementById("ddlProduccionEscalonadaAseguradora").value;
            var ddlProduccionEscalonadaFactor = document.getElementById("ddlProduccionEscalonadaFactor").value;
            var valorMin = document.getElementById("txtProduccionEscalonadaValMin").value;
            var ddlProduccionEscalonadaAplica = document.getElementById("ddlProduccionEscalonadaAplica").value;
            var ddlProduccionEscalonadaCalculo = document.getElementById("ddlProduccionEscalonadaCalculo").value;
            var ddlProduccionEscalonadaPrestacion = document.getElementById("ddlProduccionEscalonadaPrestacion").value;
            var ddlProduccionEscalonadaTiempoPago = document.getElementById("ddlProduccionEscalonadaTiempoPago").value;
            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            var ListaPrestaciones = "";
            if (ddlProduccionEscalonadaPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            var valorMax = 0;
            if (ddlProduccionEscalonadaFactor == "F") {
                valorMax = document.getElementById("txtProduccionEscalonadaValMax").value;
            }
            strDatos += txtDoctorCodigo + "|" + txtProduccionEscalonadaFechaInicio + "|" + txtProduccionEscalonadaFechaFin + "|" + ddlProduccionEscalonadaTipoRango + "|" + txtProduccionEscalonadaRanMin + "|" + txtProduccionEscalonadaRanMax + "|";
            strDatos += (ddlProduccionEscalonadaServicio == "" ? 0 : ddlProduccionEscalonadaServicio) + "|" + ddlProduccionEscalonadaTipoAtencion + "|" + ddlProduccionEscalonadaTipoAdmision + "|" + ddlProduccionEscalonadaTipoPaciente + "|" + ddlProduccionEscalonadaAseguradora + "|";
            strDatos += ddlProduccionEscalonadaEspecialidad + "|" + ddlProduccionEscalonadaFactor + "|" + valorMin + "|" + valorMax + "|" + ddlProduccionEscalonadaAplica + "|" + ddlProduccionEscalonadaCalculo + "|" + ddlProduccionEscalonadaPrestacion + "|";
            strDatos += ddlProduccionEscalonadaTiempoPago + "|" + ListaPrestaciones;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=3";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupProduccionEscalonada");
        }
    }

    var btngrabarPopupContratoFijo = document.getElementById("btngrabarPopupContratoFijo");
    btngrabarPopupContratoFijo.onclick = function () {
        if (validarDetalle(4)) {
            idTabActual = 3;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtPopupContratoFijoConcepto = document.getElementById("txtPopupContratoFijoConcepto").value;
            var txtPopupContratoFijoFechaInicio = document.getElementById("txtPopupContratoFijoFechaInicio").value;
            var txtPopupContratoFijoFechaFin = document.getElementById("txtPopupContratoFijoFechaFin").value;
            var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte").value;
            var ddlPopupContratoFijoPeriodo = document.getElementById("ddlPopupContratoFijoPeriodo").value;
            var ddlPopupContratoFijoPrestacion = document.getElementById("ddlPopupContratoFijoPrestacion").value;
            var ddlPopupContratoFijoTiempoPago = document.getElementById("ddlPopupContratoFijoTiempoPago").value;
            var ddlPopupContratoFijoTurno = document.getElementById("ddlPopupContratoFijoTurno").value;
            var ddlPopupContratoFijoConcepto = document.getElementById("ddlPopupContratoFijoConcepto").value;
            var ddlPopupContratoFijoTipoRegistro = document.getElementById("ddlPopupContratoFijoTipoRegistro").value;

            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            var ListaPrestaciones = "";
            if (ddlPopupContratoFijoPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            var txtPopupContratoFijoHoraInicio = document.getElementById("txtPopupContratoFijoHoraInicio");
            var txtPopupContratoFijoHoraFin = document.getElementById("txtPopupContratoFijoHoraFin");
            if (ddlPopupContratoFijoTurno != "") {
                txtPopupContratoFijoHoraInicio.value = "01/01/1900 " + txtPopupContratoFijoHoraInicio.value;
                txtPopupContratoFijoHoraFin.value = "01/01/1900 " + txtPopupContratoFijoHoraFin.value;
            }
            strDatos += txtDoctorCodigo + "|" + txtPopupContratoFijoConcepto + "|" + txtPopupContratoFijoFechaInicio + "|" + txtPopupContratoFijoFechaFin + "|" + txtPopupContratoFijoImporte + "|" + ddlPopupContratoFijoPeriodo + "|";
            strDatos += ddlPopupContratoFijoPrestacion + "|" + ddlPopupContratoFijoTiempoPago + "|" + ddlPopupContratoFijoTurno + "|" + txtPopupContratoFijoHoraInicio.value + "|" + txtPopupContratoFijoHoraFin.value + "|" + ListaPrestaciones + "|" + ddlPopupContratoFijoConcepto + "|" + ddlPopupContratoFijoTipoRegistro;
            if (ddlPopupContratoFijoTipoRegistro == "C") {
                strDatos += "||"
            }
            else {
                var ddlPopupContratoFijoPeriodoProd = document.getElementById("ddlPopupContratoFijoPeriodoProd").value;
                var txtPopupContratoFijoPeriodoProd = document.getElementById("txtPopupContratoFijoPeriodoProd").value;
                strDatos += "|" + ddlPopupContratoFijoPeriodoProd + "|" + txtPopupContratoFijoPeriodoProd;
            }
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var frm = new FormData();
            frm.append("cadena", strDatos);
            var file, files = [], fileeliminar = "";
            for (var z = 0; z < arrayArchivoscf.length; z++) {
                file = arrayArchivoscf[z];
                if (ddlPopupContratoFijoTipoRegistro == "C") {
                    if (file.estado == "I" || file.estado == "A") {
                        fileeliminar += file.id + "¯" + file.name + "¬";
                    }
                } else {
                    if (file.id.substring(0, 1) == "f") {
                        frm.append("file", file);
                    } else if (file.id.substring(0, 1) != "f" && file.estado == "I") {
                        fileeliminar += file.id + "¯" + file.name + "¬";
                    }
                }
            }
            fileeliminar = fileeliminar.substring(0, fileeliminar.length - 1);

            frm.append("eliminar", fileeliminar);

            frm.append("detalleOA", (ddlPopupContratoFijoTipoRegistro == "C" ? "E" : ((listaValidados.length > 0) ? listaValidados : (matrizCFOAs.length == 0 ? "A" : ""))));

            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=4&su=" + sucursalId;
            $.ajax(url, "post", mostrarGrabarDetalle, frm);
            //abrirPopup("PopupContratoFijo");
        }
    }

    var btngrabarHorarioCalculo = document.getElementById("btngrabarHorarioCalculo");
    btngrabarHorarioCalculo.onclick = function () {
        if (validarDetalle(5)) {
            idTabActual = 4;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtHorarioCalculoFechaInicio = document.getElementById("txtHorarioCalculoFechaInicio").value;
            var txtHorarioCalculoFechaFin = document.getElementById("txtHorarioCalculoFechaFin").value;
            var ddlHorarioCalculoTipoAtencion = document.getElementById("ddlHorarioCalculoTipoAtencion").value;
            var ddlHorarioCalculoTipoAdmision = document.getElementById("ddlHorarioCalculoTipoAdmision").value;
            var ddlHorarioCalculoTipoPaciente = document.getElementById("ddlHorarioCalculoTipoPaciente").value;
            var ddlHorarioCalculoAseguradora = document.getElementById("ddlHorarioCalculoAseguradora").value;
            var ddlHorarioCalculoEspecialidad = document.getElementById("ddlHorarioCalculoEspecialidad").value;
            var ddlHorarioCalculoTipoDia = document.getElementById("ddlHorarioCalculoTipoDia").value;
            var ddlHorarioCalculoTurno = document.getElementById("ddlHorarioCalculoTurno").value;
            var ddlHorarioCalculoPrestacion = document.getElementById("ddlHorarioCalculoPrestacion").value;
            var txtHorarioCalculoValorHora = document.getElementById("txtHorarioCalculoValorHora").value;
            var ddlHorarioCalculoTiempoPago = document.getElementById("ddlHorarioCalculoTiempoPago").value;
            var strDatos = "";
            var diasCheck = "";
            var fechaFeriado = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            if (ddlHorarioCalculoTipoDia == "F") {
                var ddlHorarioCalculoTipoFeriado = document.getElementById("ddlHorarioCalculoTipoFeriado").value;
                if (ddlHorarioCalculoTipoFeriado == "F") {
                    var ddlHorarioCalculoTipoDiaFecha = document.getElementById("ddlHorarioCalculoTipoDiaFecha");
                    fechaFeriado = ddlHorarioCalculoTipoDiaFecha.options[ddlHorarioCalculoTipoDiaFecha.selectedIndex].text;
                }
                diasCheck = "||||||";
            }
            else {
                var rdnHorarioCalculo = document.getElementsByName("rdn-HorarioCalculo");
                if (ddlHorarioCalculoTipoDia == "D") {
                    for (var x = 0; x < rdnHorarioCalculo.length; x++) {
                        if (rdnHorarioCalculo[x].checked) {
                            diasCheck += "True";
                        }
                        else {
                            diasCheck += "False";
                        }
                        if (x != (rdnHorarioCalculo.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
                else {
                    for (var x = 0; x < rdnHorarioCalculo.length; x++) {
                        if (rdnHorarioCalculo[x].checked) {
                            diasCheck += "True";
                        }
                        if (x != (rdnHorarioCalculo.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
            }

            var ListaPrestaciones = "";
            if (ddlHorarioCalculoPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }

            var txtHorarioCalculoHoraInicio = document.getElementById("txtHorarioCalculoHoraInicio");
            var txtHorarioCalculoHoraFin = document.getElementById("txtHorarioCalculoHoraFin");
            if (ddlHorarioCalculoTurno != "") {
                txtHorarioCalculoHoraInicio.value = "01/01/1900 " + txtHorarioCalculoHoraInicio.value;
                txtHorarioCalculoHoraFin.value = "01/01/1900 " + txtHorarioCalculoHoraFin.value;
            }

            strDatos += txtDoctorCodigo + "|C|" + txtHorarioCalculoFechaInicio + "|" + txtHorarioCalculoFechaFin + "|" + ddlHorarioCalculoTipoAtencion + "|" + ddlHorarioCalculoTipoAdmision + "|" + ddlHorarioCalculoTipoPaciente + "|";
            strDatos += ddlHorarioCalculoAseguradora + "|" + ddlHorarioCalculoEspecialidad + "|" + ddlHorarioCalculoTipoDia + "|" + ddlHorarioCalculoTurno + "||" + txtHorarioCalculoValorHora + "|" + ddlHorarioCalculoPrestacion + "|";
            strDatos += ddlHorarioCalculoTiempoPago + "||" + (ddlHorarioCalculoTipoFeriado == undefined ? "" : ddlHorarioCalculoTipoFeriado) + "|" + fechaFeriado + "|" + diasCheck + "|" + ListaPrestaciones + "|" + txtHorarioCalculoHoraInicio.value + "|" + txtHorarioCalculoHoraFin.value;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=5";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupHorarioCalculo");
        }
    }

    var btngrabarHorarioBonificacion = document.getElementById("btngrabarHorarioBonificacion");
    btngrabarHorarioBonificacion.onclick = function () {
        if (validarDetalle(6)) {
            idTabActual = 4;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtHorarioBonificacionFechaInicio = document.getElementById("txtHorarioBonificacionFechaInicio").value;
            var txtHorarioBonificacionFechaFin = document.getElementById("txtHorarioBonificacionFechaFin").value;
            var ddlHorarioBonificacionOperador = document.getElementById("ddlHorarioBonificacionOperador").value;
            var ddlHorarioBonificacionTipoPaciente = document.getElementById("ddlHorarioBonificacionTipoPaciente").value;
            var ddlHorarioBonificacionTipoAtencion = document.getElementById("ddlHorarioBonificacionTipoAtencion").value;
            var ddlHorarioBonificacionTipoAdmision = document.getElementById("ddlHorarioBonificacionTipoAdmision").value;
            var ddlHorarioBonificacionEspecialidad = document.getElementById("ddlHorarioBonificacionEspecialidad").value;
            var ddlHorarioBonificacionAseguradora = document.getElementById("ddlHorarioBonificacionAseguradora").value;
            var ddlHorarioBonificacionTipoDia = document.getElementById("ddlHorarioBonificacionTipoDia").value;
            var ddlHorarioBonificacionTurno = document.getElementById("ddlHorarioBonificacionTurno").value;
            var ddlHorarioBonificacionTipoValor = document.getElementById("ddlHorarioBonificacionTipoValor").value;
            var txtHorarioBonificacionVal = document.getElementById("txtHorarioBonificacionVal").value;
            var ddlHorarioBonificacionPrestacion = document.getElementById("ddlHorarioBonificacionPrestacion").value;
            var ddlHorarioBonificacionTipoBonificacion = document.getElementById("ddlHorarioBonificacionTipoBonificacion").value;
            var strDatos = "";
            var diasCheck = "";
            var fechaFeriado = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            if (ddlHorarioBonificacionTipoDia == "F") {
                var ddlHorarioBonificacionTipoFeriado = document.getElementById("ddlHorarioBonificacionTipoFeriado").value;
                if (ddlHorarioBonificacionTipoFeriado == "F") {
                    var ddlHorarioBonificacionTipoDiaFecha = document.getElementById("ddlHorarioBonificacionTipoDiaFecha");
                    fechaFeriado = ddlHorarioBonificacionTipoDiaFecha.options[ddlHorarioBonificacionTipoDiaFecha.selectedIndex].text;
                }
                diasCheck = "||||||";
            }
            else {
                var rdnHorarioBonificacion = document.getElementsByName("rdn-HorarioBonificacion");
                if (ddlHorarioBonificacionTipoDia == "D") {
                    for (var x = 0; x < rdnHorarioBonificacion.length; x++) {
                        if (rdnHorarioBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        else {
                            diasCheck += "False";
                        }
                        if (x != (rdnHorarioBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
                else {
                    for (var x = 0; x < rdnHorarioBonificacion.length; x++) {
                        if (rdnHorarioBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        if (x != (rdnHorarioBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
            }

            var ListaPrestaciones = "";
            if (ddlHorarioBonificacionPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            strDatos += txtDoctorCodigo + "|B|" + txtHorarioBonificacionFechaInicio + "|" + txtHorarioBonificacionFechaFin + "|" + ddlHorarioBonificacionTipoAtencion + "|" + ddlHorarioBonificacionTipoAdmision + "|" + ddlHorarioBonificacionTipoPaciente + "|";
            strDatos += ddlHorarioBonificacionAseguradora + "|" + ddlHorarioBonificacionEspecialidad + "|" + ddlHorarioBonificacionTipoDia + "|" + ddlHorarioBonificacionTurno + "|" + ddlHorarioBonificacionTipoValor + "|" + txtHorarioBonificacionVal + "|" + ddlHorarioBonificacionPrestacion + "|";
            strDatos += "|" + ddlHorarioBonificacionOperador + "|" + (ddlHorarioBonificacionTipoFeriado == undefined ? "" : ddlHorarioBonificacionTipoFeriado) + "|" + fechaFeriado + "|" + diasCheck + "|" + ListaPrestaciones + "|" + ddlHorarioBonificacionTipoBonificacion;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=6";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupHorarioBonificacion");
        }
    }

    var btngrabarTurnoCalculo = document.getElementById("btngrabarTurnoCalculo");
    btngrabarTurnoCalculo.onclick = function () {
        if (validarDetalle(7)) {
            idTabActual = 5;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtTurnoCalculoFechaInicio = document.getElementById("txtTurnoCalculoFechaInicio").value;
            var txtTurnoCalculoFechaFin = document.getElementById("txtTurnoCalculoFechaFin").value;
            var ddlTurnoCalculoTipoAtencion = document.getElementById("ddlTurnoCalculoTipoAtencion").value;
            var ddlTurnoCalculoTipoAdmision = document.getElementById("ddlTurnoCalculoTipoAdmision").value;
            var ddlTurnoCalculoTipoPaciente = document.getElementById("ddlTurnoCalculoTipoPaciente").value;
            var ddlTurnoCalculoAseguradora = document.getElementById("ddlTurnoCalculoAseguradora").value;
            var ddlTurnoCalculoEspecialidad = document.getElementById("ddlTurnoCalculoEspecialidad").value;
            var txtTurnoCalculoValMin = document.getElementById("txtTurnoCalculoValMin").value;
            var txtTurnoCalculoValMax = document.getElementById("txtTurnoCalculoValMax").value;
            var ddlTurnoCalculoTipoValor = document.getElementById("ddlTurnoCalculoTipoValor").value;
            var txtTurnoCalculoValTurnoHora = document.getElementById("txtTurnoCalculoValTurnoHora").value;
            var ddlTurnoCalculoTurno = document.getElementById("ddlTurnoCalculoTurno").value;
            var ddlTurnoCalculoTipoDia = document.getElementById("ddlTurnoCalculoTipoDia").value;
            var cantidadHoras = 0;
            if (ddlTurnoCalculoTipoValor == "T") {
                cantidadHoras = document.getElementById("txtTurnoCalculoCantHora").value;
            }
            var ddlTurnoCalculoPrestacion = document.getElementById("ddlTurnoCalculoPrestacion").value;
            var ddlTurnoCalculoTiempoPago = document.getElementById("ddlTurnoCalculoTiempoPago").value;
            var ddlTurnoCalculoTipoDia = document.getElementById("ddlTurnoCalculoTipoDia").value;
            var ListaPrestaciones = "";
            var diasCheck = "";
            var fechaFeriado = "";
            if (ddlTurnoCalculoPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            if (ddlTurnoCalculoTipoDia == "F") {
                var ddlTurnoCalculoTipoFeriado = document.getElementById("ddlTurnoCalculoTipoFeriado").value;
                if (ddlTurnoCalculoTipoFeriado == "F") {
                    var ddlTurnoCalculoTipoDiaFecha = document.getElementById("ddlTurnoCalculoTipoDiaFecha");
                    fechaFeriado = ddlTurnoCalculoTipoDiaFecha.options[ddlTurnoCalculoTipoDiaFecha.selectedIndex].text;
                }
                diasCheck = "||||||";
            }
            else {
                var rdnTurnoCalculo = document.getElementsByName("rdn-TurnoCalculo");
                if (ddlTurnoCalculoTipoDia == "D") {
                    for (var x = 0; x < rdnTurnoCalculo.length; x++) {
                        if (rdnTurnoCalculo[x].checked) {
                            diasCheck += "True";
                        }
                        else {
                            diasCheck += "False";
                        }
                        if (x != (rdnTurnoCalculo.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
                else {
                    for (var x = 0; x < rdnTurnoCalculo.length; x++) {
                        if (rdnTurnoCalculo[x].checked) {
                            diasCheck += "True";
                        }
                        if (x != (rdnTurnoCalculo.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
            }
            var txtTurnoCalculoHoraInicio = document.getElementById("txtTurnoCalculoHoraInicio");
            var txtTurnoCalculoHoraFin = document.getElementById("txtTurnoCalculoHoraFin");
            if (ddlTurnoCalculoTurno != "") {
                txtTurnoCalculoHoraInicio.value = "01/01/1900 " + txtTurnoCalculoHoraInicio.value;
                txtTurnoCalculoHoraFin.value = "01/01/1900 " + txtTurnoCalculoHoraFin.value;
            }
            strDatos += txtDoctorCodigo + "|C|" + txtTurnoCalculoFechaInicio + "|" + txtTurnoCalculoFechaFin + "|" + ddlTurnoCalculoTipoAtencion + "|" + ddlTurnoCalculoTipoAdmision + "|" + ddlTurnoCalculoTipoPaciente + "|";
            strDatos += ddlTurnoCalculoAseguradora + "|" + ddlTurnoCalculoEspecialidad + "|" + ddlTurnoCalculoTipoDia + "|" + ddlTurnoCalculoTurno + "|" + ddlTurnoCalculoTipoValor + "|" + cantidadHoras + "|" + txtTurnoCalculoValTurnoHora + "|" + ddlTurnoCalculoPrestacion + "|";
            strDatos += ddlTurnoCalculoTiempoPago + "||" + (ddlTurnoCalculoTipoFeriado == undefined ? "" : ddlTurnoCalculoTipoFeriado) + "|" + fechaFeriado + "|" + diasCheck + "|" + txtTurnoCalculoValMin + "|" + txtTurnoCalculoValMax + "|" + ListaPrestaciones + "|" + txtTurnoCalculoHoraInicio.value + "|" + txtTurnoCalculoHoraFin.value;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=7";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupTurnoCalculo");
        }
    }

    var btngrabarTurnoBonificacion = document.getElementById("btngrabarTurnoBonificacion");
    btngrabarTurnoBonificacion.onclick = function () {
        if (validarDetalle(8)) {
            idTabActual = 5;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtTurnoBonificacionFechaInicio = document.getElementById("txtTurnoBonificacionFechaInicio").value;
            var txtTurnoBonificacionFechaFin = document.getElementById("txtTurnoBonificacionFechaFin").value;
            var ddlTurnoBonificacionOperador = document.getElementById("ddlTurnoBonificacionOperador").value;
            var ddlTurnoBonificacionTipoAtencion = document.getElementById("ddlTurnoBonificacionTipoAtencion").value;
            var ddlTurnoBonificacionTipoAdmision = document.getElementById("ddlTurnoBonificacionTipoAdmision").value;
            var ddlTurnoBonificacionTipoPaciente = document.getElementById("ddlTurnoBonificacionTipoPaciente").value;
            var ddlTurnoBonificacionEspecialidad = document.getElementById("ddlTurnoBonificacionEspecialidad").value;
            var ddlTurnoBonificacionAseguradora = document.getElementById("ddlTurnoBonificacionAseguradora").value;
            var ddlTurnoBonificacionTipoDia = document.getElementById("ddlTurnoBonificacionTipoDia").value;
            var ddlTurnoBonificacionTurno = document.getElementById("ddlTurnoBonificacionTurno").value;
            var ddlTurnoBonificacionTipoValor = document.getElementById("ddlTurnoBonificacionTipoValor").value;
            var txtTurnoBonificacionVal = document.getElementById("txtTurnoBonificacionVal").value;
            var ddlTurnoBonificacionPrestacion = document.getElementById("ddlTurnoBonificacionPrestacion").value;
            var ddlTurnoBonificacionTipoBonificacion = document.getElementById("ddlTurnoBonificacionTipoBonificacion").value;
            var strDatos = "";
            var diasCheck = "";
            var fechaFeriado = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            if (ddlTurnoBonificacionTipoDia == "F") {
                var ddlTurnoBonificacionTipoFeriado = document.getElementById("ddlTurnoBonificacionTipoFeriado").value;
                if (ddlTurnoBonificacionTipoFeriado == "F") {
                    var ddlTurnoBonificacionTipoDiaFecha = document.getElementById("ddlTurnoBonificacionTipoDiaFecha");
                    fechaFeriado = ddlTurnoBonificacionTipoDiaFecha.options[ddlTurnoBonificacionTipoDiaFecha.selectedIndex].text;
                }
                diasCheck = "||||||";
            }
            else {
                var rdnTurnoBonificacion = document.getElementsByName("rdn-TurnoBonificacion");
                if (ddlTurnoBonificacionTipoDia == "D") {
                    for (var x = 0; x < rdnTurnoBonificacion.length; x++) {
                        if (rdnTurnoBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        else {
                            diasCheck += "False";
                        }
                        if (x != (rdnTurnoBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
                else {
                    for (var x = 0; x < rdnTurnoBonificacion.length; x++) {
                        if (rdnTurnoBonificacion[x].checked) {
                            diasCheck += "True";
                        }
                        if (x != (rdnTurnoBonificacion.length - 1)) {
                            diasCheck += "|";
                        }
                    }
                }
            }
            var ListaPrestaciones = "";
            if (ddlTurnoBonificacionPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            strDatos += txtDoctorCodigo + "|B|" + txtTurnoBonificacionFechaInicio + "|" + txtTurnoBonificacionFechaFin + "|" + ddlTurnoBonificacionTipoAtencion + "|" + ddlTurnoBonificacionTipoAdmision + "|" + ddlTurnoBonificacionTipoPaciente + "|";
            strDatos += ddlTurnoBonificacionAseguradora + "|" + ddlTurnoBonificacionEspecialidad + "|" + ddlTurnoBonificacionTipoDia + "|" + ddlTurnoBonificacionTurno + "|" + ddlTurnoBonificacionTipoValor + "||" + txtTurnoBonificacionVal + "|" + ddlTurnoBonificacionPrestacion + "|";
            strDatos += "|" + ddlTurnoBonificacionOperador + "|" + (ddlTurnoBonificacionTipoFeriado == undefined ? "" : ddlTurnoBonificacionTipoFeriado) + "|" + fechaFeriado + "|" + diasCheck + "|||" + ListaPrestaciones + "|" + ddlTurnoBonificacionTipoBonificacion;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=8";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupTurnoBonificacion");
        }
    }

    var btngrabarCCompartido = document.getElementById("btngrabarCCompartido");
    btngrabarCCompartido.onclick = function () {
        if (validarDetalle(9)) {
            idTabActual = 6;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtCCompartidoFechaInicio = document.getElementById("txtCCompartidoFechaInicio").value;
            var txtCCompartidoFechaFin = document.getElementById("txtCCompartidoFechaFin").value;
            var ddlCCompartidoTipoAtencion = document.getElementById("ddlCCompartidoTipoAtencion").value;
            var ddlCCompartidoTipoAdmision = document.getElementById("ddlCCompartidoTipoAdmision").value;
            var ddlCCompartidoTipoPaciente = document.getElementById("ddlCCompartidoTipoPaciente").value;
            var ddlCCompartidoAseguradora = document.getElementById("ddlCCompartidoAseguradora").value;
            var ddlCCompartidoEspecialidad = document.getElementById("ddlCCompartidoEspecialidad").value;
            var ddlCCompartidoTipoValor = document.getElementById("ddlCCompartidoTipoValor").value;
            var valorMin = document.getElementById("txtCCompartidoValMin").value;
            var ddlCCompartidoServicio = document.getElementById("ddlCCompartidoServicio").value;
            var valorMax = 0;
            if (ddlCCompartidoTipoValor == "F") {
                valorMax = document.getElementById("txtCCompartidoValMax").value;
            }
            var ddlCCompartidoPrestacion = document.getElementById("ddlCCompartidoPrestacion").value;
            var ddlCCompartidoTiempoPago = document.getElementById("ddlCCompartidoTiempoPago").value;
            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            var ListaPrestaciones = "";
            if (ddlCCompartidoPrestacion != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            strDatos += txtDoctorCodigo + "|" + txtCCompartidoFechaInicio + "|" + txtCCompartidoFechaFin + "|" + ddlCCompartidoTipoAtencion + "|" + ddlCCompartidoTipoAdmision + "|" + ddlCCompartidoTipoPaciente + "|";
            strDatos += ddlCCompartidoAseguradora + "|" + ddlCCompartidoEspecialidad + "|" + ddlCCompartidoTipoValor + "|" + valorMin + "|" + valorMax + "|" + ddlCCompartidoPrestacion + "|" + ddlCCompartidoTiempoPago + "|" + ListaPrestaciones + "|" + (ddlCCompartidoServicio == "" ? 0 : ddlCCompartidoServicio);
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=9";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupCCompartido");
        }
    }

    var btngrabarVacuna = document.getElementById("btngrabarVacuna");
    btngrabarVacuna.onclick = function () {
        if (validarDetalle(10)) {
            idTabActual = 7;
            var hdfOpcConf = document.getElementById("hdfOpcConf").value;
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            var txtVacunaFechaInicio = document.getElementById("txtVacunaFechaInicio").value;
            var txtVacunaFechaFin = document.getElementById("txtVacunaFechaFin").value;
            var ddlVacunaTipoAtencion = document.getElementById("ddlVacunaTipoAtencion").value;
            var ddlVacunaTipoAdmision = document.getElementById("ddlVacunaTipoAdmision").value;
            var ddlVacunaTipoPaciente = document.getElementById("ddlVacunaTipoPaciente").value;
            var ddlVacunaAseguradora = document.getElementById("ddlVacunaAseguradora").value;
            var ddlVacunaEspecialidad = document.getElementById("ddlVacunaEspecialidad").value;
            var ddlVacunaTipoValor = document.getElementById("ddlVacunaTipoValor").value;
            var valorMin = document.getElementById("txtVacunaoValMin").value;
            var valorMax = 0;
            if (ddlVacunaTipoValor == "F") {
                valorMax = document.getElementById("txtCVacunaValMax").value;
            }
            var ddlVacunaArticulo = document.getElementById("ddlVacunaArticulo").value;
            var ddlVacunaTiempoPago = document.getElementById("ddlVacunaTiempoPago").value;
            var strDatos = "";
            if (hdfOpcConf == "1") {
                strDatos += "1|";
            }
            else {
                strDatos += "2|";
            }
            var ListaPrestaciones = "";
            if (ddlVacunaArticulo != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            strDatos += txtDoctorCodigo + "|" + txtVacunaFechaInicio + "|" + txtVacunaFechaFin + "|" + ddlVacunaTipoAtencion + "|" + ddlVacunaTipoAdmision + "|" + ddlVacunaTipoPaciente + "|";
            strDatos += ddlVacunaAseguradora + "|" + ddlVacunaEspecialidad + "|" + ddlVacunaTipoValor + "|" + valorMin + "|" + valorMax + "|" + ddlVacunaArticulo + "|" + ddlVacunaTiempoPago + "|" + ListaPrestaciones;
            if (hdfOpcConf == "2") {
                strDatos += "|" + idContratoDetalle;
            }
            var url = urlBase + "Configuracion/grabarConfiguracionPago/?ss=" + ss + "&opc=10";
            $.ajax(url, "post", mostrarGrabarDetalle, strDatos);
            abrirPopup("PopupVacuna");
        }
    }

    var hdfListaPresta = document.getElementById("hdfListaPresta");
    hdfListaPresta.onchange = function () {
        var ifrPrestaciones = document.getElementById("ifrPrestaciones");
        if (ifrPrestaciones.innerHTML != "") {
            var frPrestacion = document.getElementById("frPrestacion");
            frPrestacion.contentDocument.location.reload(true);
        }

        var hdfPrestacionvm = document.getElementById("hdfPrestacionvm");
        if ((hdfPrestacionvm.value * 1) > 0) {
            var PopupPFConfiguracion = document.getElementById("PopupPFConfiguracion");
            if (PopupPFConfiguracion.className.indexOf("Open") > -1) {
                var ddlPFConfiguracionTipoValor = document.getElementById("ddlPFConfiguracionTipoValor");
                if (ddlPFConfiguracionTipoValor.value == "F") {
                    mostraralerta("Configuración por factor generará provisión con valor S/. 0.00, revise la lista de componentes asociadas a esta configuración", null, 5000);
                    hdfPrestacionvm.value = 0;
                }
            }
        }
    }

    var IcoPFConfiguracion = document.getElementById("IcoPFConfiguracion");
    var IcoPFBonificacion = document.getElementById("IcoPFBonificacion");
    var IcoProduccionEscalonada = document.getElementById("IcoProduccionEscalonada");
    var IcoContratoFijo = document.getElementById("IcoContratoFijo");
    var IcoHorarioCalculo = document.getElementById("IcoHorarioCalculo");
    var IcoHorarioBonificacion = document.getElementById("IcoHorarioBonificacion");
    var IcoTurnoCalculo = document.getElementById("IcoTurnoCalculo");
    var IcoTurnoBonificacion = document.getElementById("IcoTurnoBonificacion");
    var IcoCCompartido = document.getElementById("IcoCCompartido");
    var IcoVacuna = document.getElementById("IcoVacuna");
    var IcoIProveedor = document.getElementById("IcoIProveedor");
    IcoPFConfiguracion.onclick = IcoPFBonificacion.onclick = IcoProduccionEscalonada.onclick = IcoContratoFijo.onclick = IcoHorarioCalculo.onclick = IcoHorarioBonificacion.onclick = IcoTurnoCalculo.onclick = IcoTurnoBonificacion.onclick = IcoCCompartido.onclick = IcoVacuna.onclick = IcoIProveedor.onclick = function () {
        var ifrPrestaciones = document.getElementById("ifrPrestaciones");
        var valor = 0;
        if (this.id == "IcoPFConfiguracion" || this.id == "IcoPFBonificacion" || this.id == "IcoProduccionEscalonada" || this.id == "IcoCCompartido") {
            if (this.id == "IcoPFConfiguracion") {
                var ddlPFConfiguracionServicio = document.getElementById("ddlPFConfiguracionServicio").value
                valor = (ddlPFConfiguracionServicio == "" ? 0 : ddlPFConfiguracionServicio);
            }
            else if (this.id == "IcoPFBonificacion") {
                var ddlPFBonificacionServicio = document.getElementById("ddlPFBonificacionServicio").value
                valor = (ddlPFBonificacionServicio == "" ? 0 : ddlPFBonificacionServicio);
            }
            else if (this.id == "IcoCCompartido") {
                var ddlCCompartidoServicio = document.getElementById("ddlCCompartidoServicio").value
                valor = (ddlCCompartidoServicio == "" ? 0 : ddlCCompartidoServicio);
            }
            else {
                var ddlProduccionEscalonadaServicio = document.getElementById("ddlProduccionEscalonadaServicio").value
                valor = (ddlProduccionEscalonadaServicio == "" ? 0 : ddlProduccionEscalonadaServicio);
            }
        }
        if (ifrPrestaciones.innerHTML == "") {
            ifrPrestaciones.innerHTML = "<iframe style='margin:0;padding:0;width:900px;height:600px;border: 1px solid transparent;' src='" + urlBase + "Mantenimiento/PrestacionesLista/?ss=" + ss + "&tc=" + (this.id.indexOf("Vacuna") > -1 ? 'A' : 'P') + "&val=" + valor + "&ver=" + document.getElementById("hdfSeguridad").value + "' id='frPrestacion'></iframe>";
        }
        else {
            var frPrestacion = document.getElementById("frPrestacion");
            frPrestacion.src = urlBase + "Mantenimiento/PrestacionesLista/?ss=" + ss + "&tc=" + (this.id.indexOf("Vacuna") > -1 ? 'A' : 'P') + "&val=" + valor + "&ver=" + document.getElementById("hdfSeguridad").value;
        }
        abrirPopup("PopupPrestaciones");

    }

    var ddlPFConfiguracionPrestacion = document.getElementById("ddlPFConfiguracionPrestacion");
    ddlPFConfiguracionPrestacion.onchange = function () {
        var IcoPFConfiguracion = document.getElementById("IcoPFConfiguracion");
        if (this.value != "T") {
            IcoPFConfiguracion.style.display = "";
        }
        else {
            IcoPFConfiguracion.style.display = "none";
        }
    }

    var ddTipoPrestaciones = document.getElementById("ddTipoPrestaciones");
    ddTipoPrestaciones.onchange = function () {
        var IcoIProveedor = document.getElementById("IcoIProveedor");
        if (this.value != "T") {
            IcoIProveedor.style.display = "";
        }
        else {
            IcoIProveedor.style.display = "none";
        }
    }

    var ddlPFBonificacionPrestacion = document.getElementById("ddlPFBonificacionPrestacion");
    ddlPFBonificacionPrestacion.onchange = function () {
        var IcoPFBonificacion = document.getElementById("IcoPFBonificacion");
        if (this.value != "T") {
            IcoPFBonificacion.style.display = "";
        }
        else {
            IcoPFBonificacion.style.display = "none";
        }
    }

    var ddlProduccionEscalonadaPrestacion = document.getElementById("ddlProduccionEscalonadaPrestacion");
    ddlProduccionEscalonadaPrestacion.onchange = function () {
        var IcoProduccionEscalonada = document.getElementById("IcoProduccionEscalonada");
        if (this.value != "T") {
            IcoProduccionEscalonada.style.display = "";
        }
        else {
            IcoProduccionEscalonada.style.display = "none";
        }
    }

    var ddlPopupContratoFijoPrestacion = document.getElementById("ddlPopupContratoFijoPrestacion");
    ddlPopupContratoFijoPrestacion.onchange = function () {
        var IcoContratoFijo = document.getElementById("IcoContratoFijo");
        if (this.value != "T") {
            IcoContratoFijo.style.display = "";
        }
        else {
            IcoContratoFijo.style.display = "none";
        }
    }

    var ddlHorarioCalculoPrestacion = document.getElementById("ddlHorarioCalculoPrestacion");
    ddlHorarioCalculoPrestacion.onchange = function () {
        var IcoHorarioCalculo = document.getElementById("IcoHorarioCalculo");
        if (this.value != "T") {
            IcoHorarioCalculo.style.display = "";
        }
        else {
            IcoHorarioCalculo.style.display = "none";
        }
    }

    var ddlHorarioBonificacionPrestacion = document.getElementById("ddlHorarioBonificacionPrestacion");
    ddlHorarioBonificacionPrestacion.onchange = function () {
        var IcoHorarioBonificacion = document.getElementById("IcoHorarioBonificacion");
        if (this.value != "T") {
            IcoHorarioBonificacion.style.display = "";
        }
        else {
            IcoHorarioBonificacion.style.display = "none";
        }
    }

    var ddlTurnoCalculoPrestacion = document.getElementById("ddlTurnoCalculoPrestacion");
    ddlTurnoCalculoPrestacion.onchange = function () {
        var IcoTurnoCalculo = document.getElementById("IcoTurnoCalculo");
        if (this.value != "T") {
            IcoTurnoCalculo.style.display = "";
        }
        else {
            IcoTurnoCalculo.style.display = "none";
        }
    }

    var ddlTurnoBonificacionPrestacion = document.getElementById("ddlTurnoBonificacionPrestacion");
    ddlTurnoBonificacionPrestacion.onchange = function () {
        var IcoTurnoBonificacion = document.getElementById("IcoTurnoBonificacion");
        if (this.value != "T") {
            IcoTurnoBonificacion.style.display = "";
        }
        else {
            IcoTurnoBonificacion.style.display = "none";
        }
    }

    var ddlCCompartidoPrestacion = document.getElementById("ddlCCompartidoPrestacion");
    ddlCCompartidoPrestacion.onchange = function () {
        var IcoCCompartido = document.getElementById("IcoCCompartido");
        if (this.value != "T") {
            IcoCCompartido.style.display = "";
        }
        else {
            IcoCCompartido.style.display = "none";
        }
    }

    var ddlVacunaArticulo = document.getElementById("ddlVacunaArticulo");
    ddlVacunaArticulo.onchange = function () {
        var IcoVacuna = document.getElementById("IcoVacuna");
        if (this.value != "T") {
            IcoVacuna.style.display = "";
        }
        else {
            IcoVacuna.style.display = "none";
        }
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

    var spnAdjuntar = document.getElementById("spnAdjuntar");
    var btncancelarAdjuntar = document.getElementById("btncancelarAdjuntar");
    if (spnAdjuntar != null) {

        spnAdjuntar.onclick = btncancelarAdjuntar.onclick = function () {
            ArchivoAgrabarActuales = [];
            arrayArchivos = [];
            document.getElementById("ulAdjuntos").innerHTML = "";
            var fupArchivoAdjuntar = document.getElementById("fupArchivoAdjuntar");
            fupArchivoAdjuntar.value = "";
            abrirPopup('PopupAdjuntar');
        }
    }
    var spnAdjuntarcf = document.getElementById("spnAdjuntarcf");
    var btncancelarAdjuntar = document.getElementById("btncancelarAdjuntarcf");
    if (spnAdjuntarcf != null) {

        spnAdjuntarcf.onclick = btncancelarAdjuntarcf.onclick = function () {
            document.getElementById("ulAdjuntoscf").innerHTML = "";
            var fupArchivoAdjuntar = document.getElementById("fupArchivoAdjuntarcf");
            fupArchivoAdjuntarcf.value = "";
            abrirPopup('PopupAdjuntarcf');
        }
    }


    var btnBuscarArchivo = document.getElementById("btnBuscarArchivo");
    btnBuscarArchivo.onclick = function () {
        var fupArchivoAdjuntar = document.getElementById("fupArchivoAdjuntar");
        fupArchivoAdjuntar.value = "";
        fupArchivoAdjuntar.click();
    }
    var btnBuscarArchivocf = document.getElementById("btnBuscarArchivocf");
    btnBuscarArchivocf.onclick = function () {
        var fupArchivoAdjuntarcf = document.getElementById("fupArchivoAdjuntarcf");
        fupArchivoAdjuntarcf.value = "";
        fupArchivoAdjuntarcf.click();
    }

    var fupArchivoAdjuntar = document.getElementById("fupArchivoAdjuntar");
    fupArchivoAdjuntar.onchange = function () {
        var archivo = this.files[0];
        if (archivo != "") {
            var encontrado = true;
            for (var x = 0; x < arrayArchivos.length; x++) {
                if (arrayArchivos[x].name == archivo.name) {
                    encontrado = false;
                    break;
                }
            }
            if (encontrado) {
                var extension = archivo.name.split('.').pop().toLowerCase();
                if (archivo.name.length > 100) {
                    mostraralerta("El nombre de archivo no puede ser mayor a 100 caracteres");
                } else {
                    if (extension == "pdf" || extension == "docx" || extension == "doc") {
                        if (ArchivoPeso(archivo.size) > 12) {
                            mostraralerta("El tamaño máximo a subir no debe superar los 12MB");
                        }
                        else {
                            var ulAdjuntos = document.getElementById("ulAdjuntos");
                            var contenido = "";
                            if (ulAdjuntos.innerHTML == "") {
                                contenido += "<li style='padding:4px 0'>" + (archivo.name <= 30 ? archivo.name : archivo.name.substring(0, 34) + "...") + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
                                contenido += arrayArchivos.length;
                                contenido += " onclick='EliminarArchivoTemporal(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
                                contenido += arrayArchivos.length;
                                contenido += "></span></li>";
                                ulAdjuntos.innerHTML = contenido;
                            } else {
                                contenido += "<li style='padding:4px 0'>" + (archivo.name <= 30 ? archivo.name : archivo.name.substring(0, 34) + "...") + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
                                contenido += arrayArchivos.length;
                                contenido += " onclick='EliminarArchivoTemporal(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
                                contenido += arrayArchivos.length;
                                contenido += "></span></li>";
                                ulAdjuntos.innerHTML += contenido;
                            }
                            arrayArchivos.push(archivo);
                        }
                    } else {
                        mostraralerta("solo se permite PDF/DOC/DOCX");
                    }
                }

            } else {
                mostraralerta("El archivo ya esta agregado");
                this.value = "";
            }

            var archivo = this.files[0];
            if (archivo != "") {
                var extension = archivo.name.split('.').pop().toLowerCase();
                if (archivo.name.length > 100) {
                    mostraralerta("El nombre de archivo no puede ser mayor a 100 caracteres");
                } else {
                    if (extension == "pdf" || extension == "docx" || extension == "doc") {
                        if (ArchivoPeso(archivo.size) > 12) {
                            mostraralerta("El tamaño máximo a subir no debe superar los 12MB");
                        }
                    } else {
                        mostraralerta("solo se permite PDF/DOC/DOCX");
                    }
                }
            }
        }
    }

    var fupArchivoAdjuntarcf = document.getElementById("fupArchivoAdjuntarcf");
    fupArchivoAdjuntarcf.onchange = function () {
        var archivo = this.files[0];
        if (archivo != "") {
            var encontrado = false;
            for (var x = 0; x < arrayArchivoscf.length; x++) {
                if (arrayArchivoscf[x].name == archivo.name) {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                var extension = archivo.name.split('.').pop().toLowerCase();
                if (archivo.name.length > 100) {
                    mostraralerta("El nombre de archivo no puede ser mayor a 100 caracteres");
                } else {
                    if (extension == "pdf" || extension == "docx" || extension == "doc") {
                        if (ArchivoPeso(archivo.size) > 12) {
                            mostraralerta("El tamaño máximo a subir no debe superar los 12MB");
                        }
                        else {
                            archivo.estado = "A";
                            archivo.id = "f" + new Date().getMilliseconds();
                            var ulAdjuntoscf = document.getElementById("ulAdjuntoscf");
                            var contenido = "";
                            if (ulAdjuntoscf.innerHTML == "") {
                                contenido += "<li style='padding:4px 0'>" + (archivo.name <= 30 ? archivo.name : archivo.name.substring(0, 34) + "...") + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
                                contenido += archivo.id;
                                contenido += " onclick='EliminarArchivoTemporalcf(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
                                contenido += archivo.id;
                                contenido += "></span></li>";
                                ulAdjuntoscf.innerHTML = contenido;
                            } else {
                                contenido += "<li style='padding:4px 0'>" + (archivo.name <= 30 ? archivo.name : archivo.name.substring(0, 34) + "...") + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
                                contenido += archivo.id;
                                contenido += " onclick='EliminarArchivoTemporalcf(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
                                contenido += archivo.id;
                                contenido += "></span></li>";
                                ulAdjuntoscf.innerHTML += contenido;
                            }
                            arrayArchivoscf.push(archivo);
                        }
                    } else {
                        mostraralerta("solo se permite PDF/DOC/DOCX");
                    }
                }
            } else {
                mostraralerta("El archivo ya esta agregado");
                this.value = "";
            }
        }
    }

    var btngrabarAdjuntar = document.getElementById("btngrabarAdjuntar");
    btngrabarAdjuntar.onclick = function () {
        var archivo = arrayArchivos[0];
        if (archivo != "") {
            var extension = archivo.name.split('.').pop().toLowerCase();
            if (archivo.name.length > 100) {
                mostraralerta("El nombre de archivo no puede ser mayor a 100 caracteres");
            } else {
                if (extension == "pdf" || extension == "docx" || extension == "doc") {
                    if (ArchivoPeso(archivo.size) > 12) {
                        mostraralerta("El tamaño máximo a subir no debe superar los 12MB");
                    }
                    else {
                        var spnCargar = document.getElementById("spnCargar");
                        spnCargar.style.display = "none";
                        var url = "";
                        var frm = new FormData();
                        var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
                        frm.append("contratoId", (txtDoctorCodigo * 1));
                        frm.append("ss", ss);
                        frm.append("su", sucursalId);
                        frm.append("file", archivo);
                        frm.append("opc", (DataArchivo == "" ? "1" : "2"));
                        frm.append("nombre", limpiarEspacios(archivo.name));
                        frm.append("tot", arrayArchivos.length);
                        frm.append("con", 0);
                        var ulAdjuntos = document.getElementById("ulAdjuntos");
                        var clases = ulAdjuntos.getElementsByClassName("fa-refresh");
                        var clases2 = ulAdjuntos.getElementsByClassName("fa-times");
                        url = urlBase + "Configuracion/grabarAdjunto/";
                        $.ajax(url, "post", mostrarAdjuntoMultiple, frm);
                        for (var x = 0; x < clases.length; x++) {
                            if (clases[x].getAttribute("data-id") == 0) {
                                clases[x].style.display = "";
                            }
                            else {
                                clases[x].style.display = "none";
                            }
                        }
                        for (var x = 0; x < clases2.length; x++) {
                            clases2[x].style.display = "none";
                        }
                    }
                } else {
                    mostraralerta("solo se permite PDF/DOC/DOCX");
                }
            }
        }
        else {
            mostraralerta("no ha seleccionado el archivo");
        }
    }

    var btngrabarAdjuntarcf = document.getElementById("btngrabarAdjuntarcf");
    btngrabarAdjuntarcf.onclick = function () {
        var archivo = arrayArchivoscf[0];
        if (archivo != "") {
            var extension = archivo.name.split('.').pop().toLowerCase();
            if (archivo.name.length > 100) {
                mostraralerta("El nombre de archivo no puede ser mayor a 100 caracteres");
            } else {
                if (extension == "pdf" || extension == "docx" || extension == "doc") {
                    if (ArchivoPeso(archivo.size) > 12) {
                        mostraralerta("El tamaño máximo a subir no debe superar los 12MB");
                    }
                    else {
                        var aAdjunto = document.getElementById("aAdjuntocf");
                        var spnCargar = document.getElementById("spnCargar");
                        spnCargar.style.display = "none";
                        var spnEliminarArchivo = document.getElementById("spnEliminarArchivocf");
                        document.getElementById("ulAdjuntoscf").innerHTML = "";
                        var numeroArray = nArchivosCf();
                        if (numeroArray.cantidad > 1) {
                            aAdjunto.innerHTML = "Hay " + numeroArray.cantidad + " Archivos";
                            aAdjunto.onclick = null;
                            spnEliminarArchivo.style.display = "none";
                            spnEliminarArchivo.onclick = null;
                            if (arrayArchivoscf[0] != "") {
                                var ulArchAdjuntos = document.getElementById("ulArchAdjuntoscf");
                                var listaArchivos = arrayArchivoscf;
                                var contenido = "";
                                var datoMostrar = [];
                                for (var x = 0; x < listaArchivos.length; x++) {
                                    datoMostrar = listaArchivos[x];
                                    if (datoMostrar.estado == "A") {
                                        contenido += "<li style='padding-bottom:10px;display:block'><span style='cursor:pointer;text-decoration:underline' onclick='BuscarDescargarArchivo(\"";
                                        contenido += (datoMostrar.id.substring(0, 1) == "f" ? datoMostrar.id : datoMostrar.name);
                                        contenido += "\",2)'>";
                                        contenido += (datoMostrar.name.length <= 30 ? datoMostrar.name : datoMostrar.name.substring(0, 34) + "...");
                                        contenido += "</span>&nbsp;&nbsp;<span class='Icons fa-close puntero' style='color: #00a850;' name='multiAdjuntocf' data-id='";
                                        contenido += datoMostrar.id;
                                        contenido += "'></span></li>";
                                    }
                                }
                                ulArchAdjuntos.innerHTML = contenido;
                                var multiAdjunto = document.getElementsByName("multiAdjuntocf");
                                for (var x = 0; x < multiAdjunto.length; x++) {
                                    multiAdjunto[x].onclick = function () {
                                        var archivo = this;
                                        if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                                            EliminarArchivoTemporalcf(archivo);
                                            abrirPopup('PopupArchivosAdjuntoscf');
                                            refrescarDocumentos();
                                        }
                                    }
                                }
                                aAdjunto.onclick = function () {
                                    abrirPopup('PopupArchivosAdjuntoscf');
                                }
                            }
                        } else {
                            aAdjunto.onclick = null;
                            aAdjunto.onclick = function () {
                                var archivo = this.getAttribute("data-archivo");
                                var id = this.getAttribute("data-id");
                                if (id.substring(0, 1) == "f") {
                                    var reader = new FileReader();
                                    var numeroArray = nArchivosCf();
                                    reader.onload = function (e) {
                                        var result = e.target.result;
                                        var aref = document.createElement("a");
                                        aref.href = result;
                                        var numeroArray = nArchivosCf();
                                        aref.download = arrayArchivoscf[numeroArray.indice].name;
                                        aref.click();
                                    }
                                    reader.readAsDataURL(arrayArchivoscf[numeroArray.indice]);
                                } else {
                                    var frm = new FormData();
                                    var extension = archivo.split(".");
                                    frm.append("archivoCliente", archivo);
                                    frm.append("extension", extension[extension.length - 1]);
                                    var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=2&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

                                    var xhr = new XMLHttpRequest();
                                    xhr.open("post", url);
                                    xhr.responseType = 'blob';
                                    xhr.onreadystatechange = function () {
                                        if (xhr.status == 200 && xhr.readyState == 4) {
                                            DescargarContratoFijo(xhr.response);
                                        }
                                    }
                                    xhr.send(frm);
                                }
                            }
                            if (arrayArchivoscf[numeroArray.indice] != "") {
                                aAdjunto.innerHTML = arrayArchivoscf[numeroArray.indice].name;
                                aAdjunto.setAttribute("data-archivo", arrayArchivoscf[numeroArray.indice].name);
                                aAdjunto.setAttribute("data-id", arrayArchivoscf[numeroArray.indice].id);
                                spnEliminarArchivo.style.display = "";
                                spnEliminarArchivo.setAttribute("data-id", arrayArchivoscf[numeroArray.indice].id)
                                spnEliminarArchivo.onclick = function () {
                                    if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                                        arrayArchivoscf[0].estado = "I";
                                        EliminarArchivoTemporalcf(this);
                                        document.getElementById("aAdjuntocf").innerHTML = "";
                                        document.getElementById("spnEliminarArchivocf").style.display = "none";
                                    }
                                }
                            }
                            else {
                                aAdjunto.removeAttribute("data-archivo");
                                spnEliminarArchivo.style.display = "none";
                                spnEliminarArchivo.onclick = null;
                            }
                        }
                    }
                } else {
                    mostraralerta("solo se permite PDF/DOC/DOCX");
                }
            }
        }
        else {
            mostraralerta("no ha seleccionado el archivo");
        }
        abrirPopup("PopupAdjuntarcf");
    }
    var btngrabarPProveedor = document.getElementById("btngrabarPProveedor");
    btngrabarPProveedor.onclick = function () {
        if (validarDetalle(11)) {
            var doc = document,
                ddlEspecialidadP = doc.getElementById("ddlEspecialidadP"),
                txtProveedorIni = doc.getElementById("txtProveedorFechaInicio"),
                txtProveedorFin = doc.getElementById("txtProveedorFechaFin"),
                ddlTadmisionP = doc.getElementById("ddlTadmisionP"),
                ddlTPersonaP = doc.getElementById("ddlTPersonaP"),
                ddlDiaPagoP = doc.getElementById("ddlDiaPagoP"),
                ddlDocPagoP = doc.getElementById("ddlDocPagoP"),
                ddlTipoImpuestoP = doc.getElementById("ddlTipoImpuestoP"),
                hdfEmpresaP = doc.getElementById("hdfEmpresaP"),
                hdfProveedorId = doc.getElementById("hdfProveedorId"),
                txtDoctorCodigo = doc.getElementById("txtDoctorCodigo");
            ddTipoPersonaP = doc.getElementById("ddTipoPersonaP");
            txtCorreoElectronicoP = doc.getElementById("txtCorreoElectronicoP");
            txtCorreoAlternoP = doc.getElementById("txtCorreoAlternoP");
            ddTipoPrestaciones = doc.getElementById("ddTipoPrestaciones");
            var ListaPrestaciones = "";
            if (ddTipoPrestaciones.value != "T") {
                ListaPrestaciones = document.getElementById("hdfListaPresta").value;
            }
            var srtDatos = (ddlEspecialidadP.value * 1) + "¦" + txtProveedorIni.value + "¦" + txtProveedorFin.value + "¦" + (ddlTadmisionP.value * 1) + "¦" + ddlTPersonaP.value + "¦" + (hdfEmpresaP.value * 1) + "¦" + ddlDiaPagoP.value + "¦" + ddlDocPagoP.value + "¦" + ddlTipoImpuestoP.value + "¦" + txtDoctorCodigo.value + "¦" + ddTipoPersonaP.value + "¦" + txtCorreoElectronicoP.value + "¦" + txtCorreoAlternoP.value + "¦" + (hdfProveedorId.value * 1) + "¦" + ddTipoPrestaciones.value + "¦" + ListaPrestaciones;

            var url = urlBase + "Configuracion/grabarProveedor/?ss=" + ss;
            $.ajax(url, "post", mostrarGrabarProveedor, srtDatos);
            abrirPopup("PopupProveedor");
        }
    }

    var ddlTPersonaP = document.getElementById("ddlTPersonaP");
    ddlTPersonaP.onchange = function () {
        var txtEmpresaP = document.getElementById("txtEmpresaP");
        var spnEmpresaBusquedaP = document.getElementById("spnEmpresaBusquedaP");
        var ddlTipoImpuestoP = document.getElementById("ddlTipoImpuestoP");
        var ddlDocPagoP = document.getElementById("ddlDocPagoP");
        var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa");
        document.getElementById("txtEmpresaP").value = "";
        document.getElementById("hdfEmpresaP").value = "";
        document.getElementById("txtRucP").value = "";
        if (this.value == "N" || this.value == "") {
            spnEmpresaBusquedaP.style.display = "none";
            ddlDocPagoP.value = "RH";
            ddlDocPagoP.className = "validar";
            ddlDocPagoP.disabled = false;
            ddlTipoImpuestoP.selectedIndex = "1";
            ddlTipoImpuestoP.className = "validar";
            ddlTipoImpuestoP.disabled = false;

            let aMedico = txtDoctorEmpresa.getAttribute('data-medico').split('|');
            document.getElementById("txtEmpresaP").value = aMedico[1];
            document.getElementById("hdfEmpresaP").value = aMedico[0];
            document.getElementById("txtRucP").value = aMedico[0];

            var url = urlBase + "Configuracion/ProveedorCorreoAlterno/?ss=" + ss + "&id=" + document.getElementById("hdfMedicoCod").value;
            $.ajax(url, "get", mostrarCorreoAlterno);
        }
        else {
            spnEmpresaBusquedaP.style.display = "";
            ddlDocPagoP.value = "FP";
            ddlDocPagoP.className = "lectura";
            ddlDocPagoP.disabled = true;
            ddlTipoImpuestoP.value = "IGV";
            ddlTipoImpuestoP.className = "lectura";
            ddlTipoImpuestoP.disabled = true;
        }
        txtEmpresaP.className = txtEmpresaP.className.split("error").join(" ");
        mensajeValidacion[txtEmpresaP.getAttribute("data-secuencia")] = "";

    }
    var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte");
    txtPopupContratoFijoImporte.onkeypress = function (event) {
        validarSoloNumeroDecimal(event);
    }

    var ddlPopupContratoFijoConcepto = document.getElementById("ddlPopupContratoFijoConcepto");
    ddlPopupContratoFijoConcepto.onchange = function () {
        var ind = buscarIndicador(this.value);
        var chkIndicador = document.getElementById("chkIndicador");
        chkIndicador.checked = (ind == "True" ? true : false);
    }

    var txtPopupContratoFijoPeriodoProd = document.getElementById("txtPopupContratoFijoPeriodoProd");
    txtPopupContratoFijoPeriodoProd.onkeypress = function (event) {
        validarSoloNumero(event);
    }

    var btnSeleccionarExtornoMonto = document.getElementById("btnSeleccionarExtornoMonto");
    btnSeleccionarExtornoMonto.onclick = function () {
        if (matrizExtornoMontoFijo.length > 0) {
            if (this.hasAttribute("data-id") && this.getAttribute("data-id") != "" && this.getAttribute("data-id") != "-1") {
                var dato = this.getAttribute("data-id") * 1;
                document.getElementById("ddlPopupContratoFijoConcepto").value = matrizExtornoMontoFijo[dato][1];
                document.getElementById("ddlPopupContratoFijoConcepto").onchange();
                document.getElementById("ddlPopupContratoFijoPeriodoProd").value = matrizExtornoMontoFijo[dato][2];
                document.getElementById("txtPopupContratoFijoPeriodoProd").value = matrizExtornoMontoFijo[dato][3];
                document.getElementById("txtPopupContratoFijoImporte").value = matrizExtornoMontoFijo[dato][4];
                abrirPopup('PopupExtornoMontoFijo');
            }
            else {
                mostraralerta("No hay registros seleccionados");
            }
        }
        else {
            mostraralerta("No hay registros seleccionados");
        }
    }

    var ddlPopupContratoFijoTipoRegistro = document.getElementById("ddlPopupContratoFijoTipoRegistro");
    ddlPopupContratoFijoTipoRegistro.onchange = function () {
        mensajeValidacion = [];

        var validar = document.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].className.indexOf("error") > -1) {
                validar[x].className = validar[x].className.split("error").join("").trim();
            }
        }

        var ddlPopupContratoFijoPeriodoProd = document.getElementById("ddlPopupContratoFijoPeriodoProd");
        var txtPopupContratoFijoPeriodoProd = document.getElementById("txtPopupContratoFijoPeriodoProd");
        var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte");
        var ddlPopupContratoFijoConcepto = document.getElementById("ddlPopupContratoFijoConcepto");
        if (this.value != "C") {
            ddlPopupContratoFijoPeriodoProd.selectedIndex = "0";
            if (this.value == "R") {
                txtPopupContratoFijoImporte.className = "form-texto validar";
                txtPopupContratoFijoImporte.readOnly = false;
                ddlPopupContratoFijoPeriodoProd.className = "validar";
                ddlPopupContratoFijoPeriodoProd.disabled = false;
                txtPopupContratoFijoPeriodoProd.className = "form-texto validar";
                txtPopupContratoFijoPeriodoProd.readOnly = false;
                ddlPopupContratoFijoConcepto.className = "validar";
                ddlPopupContratoFijoConcepto.disabled = false;
            }
            else {
                txtPopupContratoFijoImporte.className = "form-texto validar lectura";
                txtPopupContratoFijoImporte.readOnly = true;
                ddlPopupContratoFijoPeriodoProd.className = "validar lectura";
                ddlPopupContratoFijoPeriodoProd.disabled = true;
                txtPopupContratoFijoPeriodoProd.className = "form-texto validar lectura";
                txtPopupContratoFijoPeriodoProd.readOnly = true;
                ddlPopupContratoFijoConcepto.className = "validar lectura";
                ddlPopupContratoFijoConcepto.disabled = true;
                if (matrizExtornoMontoFijo.length > 0) {
                    var radios = document.getElementsByName("rdnExtornoMonto");
                    for (var x = 0; x < radios.length; x++) {
                        radios[x].checked = false;
                    }
                    document.getElementById("btnSeleccionarExtornoMonto").removeAttribute("data-id");
                }
                abrirPopup('PopupExtornoMontoFijo');
            }
            txtPopupContratoFijoImporte.value = "0.00";
            var validar = document.getElementsByClassName("validar");
            for (var x = 0; x < validar.length; x++) {
                validar[x].onmouseenter = function (event) {
                    var valor;
                    if (mensajeValidacion.length > 0 && (this.className.indexOf("error") > -1 && this.className.indexOf("validar") > -1)) {
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
            if (mensajeValidacion.length > 0) {
                document.getElementById("btngrabarPopupContratoFijo").click();
            }
        }
        else {
            ddlPopupContratoFijoPeriodoProd.className = "lectura";
            ddlPopupContratoFijoPeriodoProd.disabled = true;
            ddlPopupContratoFijoPeriodoProd.selectedIndex = "0";
            txtPopupContratoFijoPeriodoProd.className = "form-texto lectura";
            txtPopupContratoFijoPeriodoProd.readOnly = true;
            txtPopupContratoFijoPeriodoProd.value = "";
            txtPopupContratoFijoImporte.className = "form-texto validar";
            txtPopupContratoFijoImporte.readOnly = false;
            txtPopupContratoFijoImporte.value = "0.00";
            ddlPopupContratoFijoConcepto.className = "validar";
            ddlPopupContratoFijoConcepto.disabled = false;
            ddlPopupContratoFijoConcepto.selectedIndex = "0";
            var validar = document.getElementsByClassName("validar");
            for (var x = 0; x < validar.length; x++) {
                validar[x].onmouseenter = function (event) {
                    var valor;
                    if (mensajeValidacion.length > 0 && (this.className.indexOf("error") > -1 && this.className.indexOf("validar") > -1)) {
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
        }
        var divArchivocf = document.getElementById("divArchivocf");
        if (this.value == "R" || this.value == "E") {
            divArchivocf.style.display = "block";
            var spnNomImDetalle = document.getElementById("spnNomImDetalle");
            var spnUpload = document.getElementById("spnUpload");
            var spnDscFrm = document.getElementById("spnDscFrm");
            var spnDownload = document.getElementById("spnDownload");
            if (matrizCFOAs.length > 0) {
                spnNomImDetalle.innerHTML = "Importar Detalle";
                spnDownload.style.display = "inline-block";

                spnUpload.style.display = "inline-block";
                spnDscFrm.style.visibility = "hidden";
                spnDscFrm.style.display = "inline";
            } else {
                spnNomImDetalle.innerHTML = "Importar Detalle";
                spnDownload.style.display = "none";
                spnUpload.style.display = "inline-block";
                spnDscFrm.style.visibility = "visible";
                spnDscFrm.style.display = "inline";
            }
        } else {
            divArchivocf.style.display = "none";
            document.getElementById("aAdjuntocf").innerHTML = "";
            document.getElementById("spnEliminarArchivocf").style.display = "none";
            //arrayArchivoscf = [];
            matrizValidados = [];
            matrizCFOAs = [];
        }
    }

    var ddlPFConfiguracionServicio = document.getElementById("ddlPFConfiguracionServicio");
    ddlPFConfiguracionServicio.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlPFConfiguracionPrestacion = document.getElementById("ddlPFConfiguracionPrestacion").value;
        if (hdfListaPresta != "" && ddlPFConfiguracionPrestacion == "A") {
            document.getElementById("IcoPFConfiguracion").click();
        }
    }

    var ddlPFBonificacionServicio = document.getElementById("ddlPFBonificacionServicio");
    ddlPFBonificacionServicio.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlPFBonificacionPrestacion = document.getElementById("ddlPFBonificacionPrestacion").value;
        if (hdfListaPresta != "" && ddlPFBonificacionPrestacion == "A") {
            document.getElementById("IcoPFBonificacion").click();
        }
    }

    var ddlProduccionEscalonadaServicio = document.getElementById("ddlProduccionEscalonadaServicio");
    ddlProduccionEscalonadaServicio.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlProduccionEscalonadaPrestacion = document.getElementById("ddlProduccionEscalonadaPrestacion").value;
        if (hdfListaPresta != "" && ddlProduccionEscalonadaPrestacion == "A") {
            document.getElementById("IcoProduccionEscalonada").click();
        }
    }

    var ddlHorarioCalculoEspecialidad = document.getElementById("ddlHorarioCalculoEspecialidad");
    ddlHorarioCalculoEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlHorarioCalculoPrestacion = document.getElementById("ddlHorarioCalculoPrestacion").value;
        if (hdfListaPresta != "" && ddlHorarioCalculoPrestacion == "A") {
            document.getElementById("IcoHorarioCalculo").click();
        }
    }

    var ddlHorarioBonificacionEspecialidad = document.getElementById("ddlHorarioBonificacionEspecialidad");
    ddlHorarioBonificacionEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlHorarioBonificacionPrestacion = document.getElementById("ddlHorarioBonificacionPrestacion").value;
        if (hdfListaPresta != "" && ddlHorarioBonificacionPrestacion == "A") {
            document.getElementById("IcoHorarioBonificacion").click();
        }
    }

    var ddlTurnoCalculoEspecialidad = document.getElementById("ddlTurnoCalculoEspecialidad");
    ddlTurnoCalculoEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlTurnoCalculoPrestacion = document.getElementById("ddlTurnoCalculoPrestacion").value;
        if (hdfListaPresta != "" && ddlTurnoCalculoPrestacion == "A") {
            document.getElementById("IcoTurnoCalculo").click();
        }
    }

    var ddlTurnoBonificacionEspecialidad = document.getElementById("ddlTurnoBonificacionEspecialidad");
    ddlTurnoBonificacionEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlTurnoBonificacionPrestacion = document.getElementById("ddlTurnoBonificacionPrestacion").value;
        if (hdfListaPresta != "" && ddlTurnoBonificacionPrestacion == "A") {
            document.getElementById("IcoTurnoBonificacion").click();
        }
    }

    var ddlCCompartidoEspecialidad = document.getElementById("ddlCCompartidoEspecialidad");
    ddlCCompartidoEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlCCompartidoPrestacion = document.getElementById("ddlCCompartidoPrestacion").value;
        if (hdfListaPresta != "" && ddlCCompartidoPrestacion == "A") {
            document.getElementById("IcoCCompartido").click();
        }
    }

    var ddlVacunaEspecialidad = document.getElementById("ddlVacunaEspecialidad");
    ddlVacunaEspecialidad.onchange = function () {
        var hdfListaPresta = document.getElementById("hdfListaPresta").value;
        var ddlVacunaArticulo = document.getElementById("ddlVacunaArticulo").value;
        if (hdfListaPresta != "" && ddlVacunaArticulo == "A") {
            document.getElementById("IcoVacuna").click();
        }
    }

    var spnCancelarCf = document.getElementById("spnCancelarCf");
    btnCancelarCf = document.getElementById("btnCancelarCf");
    btnCancelarCf.addEventListener("click", cerrarCf);
    spnCancelarCf.addEventListener("click", cerrarCf);

    var spnUpload = document.getElementById("spnUpload");
    var spnDownload = document.getElementById("spnDownload");
    var spnDscFrm = document.getElementById("spnDscFrm");
    var btnGrabarCargaCFijo = document.getElementById("btnGrabarCargaCFijo");

    spnDownload.onclick = function () {
        var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
        cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
        cabecera += "<td style='width: 80px' align='center'>Sucursal</td>";
        cabecera += "<td style='width: 120px' align='center'>IdOrdenAtencion</td>";
        cabecera += "<td style='width: 100px' align='center'>Línea</td>";
        cabecera += "<td style='width: 100px' align='center'>CodigoOA</td>";
        cabecera += "<td style='width: 120px' align='center'>Fecha Atención</td>";
        cabecera += "<td style='width: 100px' align='center'>Código Componente</td>";
        cabecera += "<td style='width: 80px' align='center'>Cantidad</td>";
        cabecera += "<td style='width: 100px' align='center'>Monto</td></tr>";

        var data, n, esmv = false;
        if (matrizValidados.length > 0) {
            n = matrizValidados.length;
            data = matrizValidados;
            esmv = true;
        } else {
            n = matrizCFOAs.length;
            data = matrizCFOAs;
        }
        var campos;
        for (var i = 0; i < n; i++) {
            if (esmv) {
                campos = data[i];
            } else {
                campos = data[i].split("¦");
            }

            cabecera += "<tr>";
            for (var j = 0; j < campos.length; j++) {
                cabecera += "<td>";
                cabecera += campos[j];
                cabecera += "</td>";
            }
            cabecera += "</tr>";
        }
        cabecera += "</table></html>";
        var formBlob = new Blob([cabecera], { type: 'application/vnd.ms-excel' });
        var aref = document.createElement("a");
        var body = document.getElementsByTagName("body")[0];
        aref.download = "DetalleOAs.xls";
        aref.href = window.URL.createObjectURL(formBlob);
        body.insertAdjacentElement("beforeend", aref);
        aref.click();
        body.removeChild(aref);
    }

    btnGrabarCargaCFijo.onclick = function () {
        var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte").value * 1;
        if (matrizErrados.length > 0) {
            mostraralerta("Existen Datos errados en la importación de excel");
            return false;
        }


        if (formatearNumero(mtImponible * 1) != formatearNumero(txtPopupContratoFijoImporte * 1)) {
            mostraralerta("Monto Imponible es diferente al monto total de la importación de excel");
            return false;
        }
        abrirPopup("PopupCargaCFijo");

        var spnNomImDetalle = document.getElementById("spnNomImDetalle");
        var spnUpload = document.getElementById("spnUpload");
        var spnDscFrm = document.getElementById("spnDscFrm");
        var spnDownload = document.getElementById("spnDownload");
        if (matrizValidados.length > 0) {
            spnNomImDetalle.innerHTML = "Importar Detalle";
            spnDownload.style.display = "inline-block";

            spnUpload.style.display = "inline-block";
            spnDscFrm.style.display = "inline";
            spnDscFrm.style.visibility = "hidden";
        }
    }


    var fupArchivoCFijo = document.getElementById("fupArchivoCFijo");
    fupArchivoCFijo.onchange = function () {
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

    spnUpload.onclick = function () {
        abrirPopup('PopupCargaCFijo');
        fupArchivoCFijo.value = "";
        crearMatriz2("divValidados", "");
        crearMatriz2("divErrados", "");
        matrizValidados = [];
        matrizErrados = [];
        mtImponible = 0;
        listaValidados = "";
        document.getElementById("btnGrabarCargaCFijo").style.display = "none";
    }

    spnDscFrm.onclick = function () {
        var frm = new FormData();
        frm.append("archivoCliente", "");
        frm.append("extension", "xlsx");
        var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=3&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

        var xhr = new XMLHttpRequest();
        xhr.open("post", url);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                DescargarXlsCFijo(xhr.response);
            }
        }
        xhr.send(frm);
    }
    crearTabla2("divValidados");
    crearTabla2("divErrados");
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
    var btnGrabarCargaCFijo = document.getElementById("btnGrabarCargaCFijo");
    btnGrabarCargaCFijo.style.display = "";

    var lista1 = lista[0].split("¬");
    var lista2 = lista[1] != "" ? lista[1].split("¬") : [];
    crearMatriz2("divValidados", lista1);
    listaValidados = lista[0];
    crearMatriz2("divErrados", lista2);

    mtImponible = lista[2];
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

function mostrarVistaPrevia(rpta) {
    var gifLoad = document.getElementById("gifLoad3");
    gifLoad.style.display = "none";
    var data = rpta.split("¯");
    var lista1 = data[0].split("¬");
    var lista2 = data[1].split("¬");
    crearMatriz2("divValidados", lista1);
    listaValidados = data[0];
    crearMatriz2("divErrados", lista2);

    if (matrizValidados.length > 0) {
        mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
    }
    else if (matrizErrados.length > 0) {
        mostrarTabs(document.getElementById("taby2"), 'ulTabsY');
    }
    else {
        mostrarTabs(document.getElementById("taby1"), 'ulTabsY');
    }
}
function DescargarXlsCFijo(rpta) {
    if (rpta.size > 0) {
        var blob = new Blob([rpta], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "DetalleOAs.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        delete a;
    }
    else {
        mostraralerta("No se ha encontrado el archivo");
    }
}
function nArchivosCf() {
    var pos = -1, c = 0;
    for (var i = 0; i < arrayArchivoscf.length; i++) {
        if (arrayArchivoscf[i].estado == "A") {
            c++;
            pos = i;
        }
    }
    return { cantidad: c, indice: pos }
}
function refrescarDocumentos() {
    var aAdjunto = document.getElementById("aAdjuntocf");
    var spnCargar = document.getElementById("spnCargar");
    spnCargar.style.display = "none";
    var spnEliminarArchivo = document.getElementById("spnEliminarArchivocf");
    document.getElementById("ulAdjuntoscf").innerHTML = "";
    var numeroArray = nArchivosCf();
    if (numeroArray.cantidad > 1) {
        aAdjunto.innerHTML = "Hay " + numeroArray.cantidad + " Archivos";
        aAdjunto.onclick = null;
        spnEliminarArchivo.style.display = "none";
        spnEliminarArchivo.onclick = null;
        if (arrayArchivoscf[0] != "") {
            var ulArchAdjuntos = document.getElementById("ulArchAdjuntoscf");
            var listaArchivos = arrayArchivoscf;
            var contenido = "";
            var datoMostrar = [];
            for (var x = 0; x < listaArchivos.length; x++) {
                datoMostrar = listaArchivos[x];
                if (datoMostrar.estado == "A") {
                    contenido += "<li style='padding-bottom:10px;display:block'><span style='cursor:pointer;text-decoration:underline' onclick='BuscarDescargarArchivo(\"";
                    contenido += (datoMostrar.id.substring(0, 1) == "f" ? datoMostrar.id : datoMostrar.name);
                    contenido += "\",2)'>";
                    contenido += (datoMostrar.name.length <= 30 ? datoMostrar.name : datoMostrar.name.substring(0, 34) + "...");
                    if (SoloVer) {
                        contenido += "</span>&nbsp;&nbsp;<span class='Icons fa-close puntero' style='color: #00a850;display:none' name='multiAdjuntocf' data-id='";
                    } else {
                        contenido += "</span>&nbsp;&nbsp;<span class='Icons fa-close puntero' style='color: #00a850;' name='multiAdjuntocf' data-id='";
                    }
                    contenido += datoMostrar.id;
                    contenido += "'></span></li>";
                }
            }
            ulArchAdjuntos.innerHTML = contenido;
            var multiAdjunto = document.getElementsByName("multiAdjuntocf");
            for (var x = 0; x < multiAdjunto.length; x++) {
                multiAdjunto[x].onclick = function () {
                    var archivo = this;
                    if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                        EliminarArchivoTemporalcf(archivo);
                        abrirPopup('PopupArchivosAdjuntoscf');
                        refrescarDocumentos();
                    }
                }
            }
            aAdjunto.onclick = function () {
                abrirPopup('PopupArchivosAdjuntoscf');
            }
        }
    } else {
        aAdjunto.onclick = null;
        aAdjunto.onclick = function () {
            var archivo = this.getAttribute("data-archivo");
            var id = this.getAttribute("data-id");
            if (id.substring(0, 1) == "f") {
                var reader = new FileReader();
                var numeroArray = nArchivosCf();
                reader.onload = function (e) {
                    var result = e.target.result;
                    var aref = document.createElement("a");
                    aref.href = result;
                    var numeroArray = nArchivosCf();
                    aref.download = arrayArchivoscf[numeroArray.indice].name;
                    aref.click();
                }
                reader.readAsDataURL(arrayArchivoscf[numeroArray.indice]);
            } else {
                var frm = new FormData();
                var extension = archivo.split(".");
                frm.append("archivoCliente", archivo);
                frm.append("extension", extension[extension.length - 1]);
                var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=2&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

                var xhr = new XMLHttpRequest();
                xhr.open("post", url);
                xhr.responseType = 'blob';
                xhr.onreadystatechange = function () {
                    if (xhr.status == 200 && xhr.readyState == 4) {
                        DescargarContratoFijo(xhr.response);
                    }
                }
                xhr.send(frm);
            }
        }
        if (arrayArchivoscf[numeroArray.indice] != "") {
            aAdjunto.innerHTML = arrayArchivoscf[numeroArray.indice].name;
            aAdjunto.setAttribute("data-archivo", arrayArchivoscf[numeroArray.indice].name);
            aAdjunto.setAttribute("data-id", arrayArchivoscf[numeroArray.indice].id);
            spnEliminarArchivo.style.display = "";
            spnEliminarArchivo.setAttribute("data-id", arrayArchivoscf[numeroArray.indice].id)
            spnEliminarArchivo.onclick = function () {
                if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                    arrayArchivoscf[numeroArray.indice].estado = "I";
                    EliminarArchivoTemporalcf(this);
                    document.getElementById("aAdjuntocf").innerHTML = "";
                    document.getElementById("spnEliminarArchivocf").style.display = "none";
                }
            }
        }
        else {
            aAdjunto.removeAttribute("data-archivo");
            spnEliminarArchivo.style.display = "none";
            spnEliminarArchivo.onclick = null;
        }
    }
}
function cerrarCf() {
    document.getElementById("aAdjuntocf").innerHTML = "";
    document.getElementById("spnEliminarArchivocf").style.display = "none";
    arrayArchivoscf = [];
}

function mostrarCorreoAlterno(rpta) {
    if (rpta != "") {
        var datos = rpta.split("¦");
        document.getElementById("ddTipoPersonaP").value = (datos[0] == "" ? "T" : datos[0]);
        document.getElementById("txtCorreoElectronicoP").value = datos[1];
        document.getElementById("txtCorreoAlternoP").value = datos[2];
    }
}

function desabilitarControles(opcion) {
    var desControl = document.getElementsByClassName("desControl");
    var desControlCancelar = document.getElementsByClassName("desControlCancelar");
    var checks = document.getElementsByName("rdn-ConfiguracionPago");
    if (opcion) {
        for (var x = 0; x < desControl.length; x++) {
            desControl[x].style.display = "none";
        }
        for (var y = 0; y < checks.length; y++) {
            checks[y].disabled = true;
        }
        for (var z = 0; z < desControlCancelar.length; z++) {
            desControlCancelar[z].innerHTML = "Regresar";
        }
    }
    else {
        for (var x = 0; x < desControl.length; x++) {
            desControl[x].style.display = "";

        }
        for (var y = 0; y < checks.length; y++) {
            checks[y].disabled = false;
        }
        for (var z = 0; z < desControlCancelar.length; z++) {
            desControlCancelar[z].innerHTML = "Cancelar";
        }
    }
}

function desabilitarControlIndividual(opcion) {
    var desControl = document.getElementsByClassName("desControl");
    var desControlCancelar = document.getElementsByClassName("desControlCancelar");
    if (opcion) {
        for (var x = 0; x < desControl.length; x++) {
            desControl[x].style.display = "none";
        }
        for (var z = 0; z < desControlCancelar.length; z++) {
            desControlCancelar[z].innerHTML = "Regresar";
        }
    } else {
        for (var x = 0; x < desControl.length; x++) {
            desControl[x].style.display = "";

        }
        for (var z = 0; z < desControlCancelar.length; z++) {
            desControlCancelar[z].innerHTML = "Cancelar";
        }
    }
}

function anularPrincipal(id, estado) {
    var url = urlBase + "Configuracion/anularMedicoContrato/?ss=" + ss + "&id=" + id + "&est=" + ((estado == "A" || estado == "P") ? "I" : "A");
    $.ajax(url, "get", mostrarGrabarPrincipal);
    abrirPopup('PopupEstado');

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

function anularDetalle(id, estado) {
    var ulTabs = document.getElementById("ulTabs");
    var opcion = ulTabs.getElementsByClassName("tab-link");
    for (var x = 0; x < opcion.length; x++) {
        if (opcion[x].className.indexOf("current") > -1) {
            idTabActual = opcion[x].getAttribute("data-tab").split("-")[1] * 1;
        }
    }

    //var url = urlBase + "Configuracion/anularConfiguracionPago/?ss=" + ss + "&id=" + id + "&est=" + (estado == "A" ? "I" : "A");
    //$.ajax(url, "get", mostrarGrabarDetalle);
    var url = urlBase + "Configuracion/anularConfiguracionPago2/?ss=" + ss + "&id=" + id + "&est=" + ((estado == "A" || estado == "P") ? "I" : "A");
    $.ajax(url, "get", mostrarGrabarDetalleAnulacion);
    abrirPopup('PopupEstado');

}

function mostrarGrabarDetalleAnulacion(rpta) {
    AlmacenarClick = false;
    var mensaje = [];
    if (rpta != "") {
        var data = rpta.split("¬");
        mensaje = data[0].split("¦");
        if (data[1] == "ERROR") {
            mostraralerta(mensaje[1]);
        }
        else {
            var hdfMedicoDet = document.getElementById("hdfMedicoDet");
            idMedico = "";
            mostraralerta(mensaje[1]);
            Buscar();
            limpiarFormulario(1);
            EscogerDetalle(false);
            mostrarDoctor(hdfMedicoDet.value);
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
            txtDoctorCodigo.value = hdfMedicoDet.value;
            limpiarCabeceras();
            url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + hdfMedicoDet.value + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
            $.ajax(url, "get", listarDoctor);
        }
    } else {

    }
}

function mostrarGrabarDetalle(rpta) {
    AlmacenarClick = false;
    if (rpta.indexOf("ERROR") > -1) {
        mostraralerta("Ya existe una configuración registrada");
    }
    else {
        if (rpta != "") {
            var data = rpta.split("¬");
            switch (data[1]) {
                case "-2":
                    mostraralerta("Periodo ingresado ya forma parte de un proceso de provisión");
                    break;
                case "1":
                    arrayArchivoscf = [];
                    if (idTabActual == 3) {
                        abrirPopup("PopupContratoFijo");
                    }
                    var hdfMedicoDet = document.getElementById("hdfMedicoDet");
                    mostrarDoctor(hdfMedicoDet.value);
                    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
                    txtDoctorCodigo.value = hdfMedicoDet.value;
                    url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + hdfMedicoDet.value + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
                    $.ajax(url, "get", listarDoctor);
                    idMedico = "";
                    Buscar();
                    limpiarFormulario(1);
                    EscogerDetalle(false);
                    limpiarCabeceras();
                    mostraralerta("Se ha añadido un nuevo registro");
                    break;
                case "2":
                    arrayArchivoscf = [];
                    if (idTabActual == 3) {
                        abrirPopup("PopupContratoFijo");
                    }
                    var hdfMedicoDet = document.getElementById("hdfMedicoDet");
                    idMedico = "";
                    Buscar();
                    limpiarFormulario(1);
                    EscogerDetalle(false);
                    mostrarDoctor(hdfMedicoDet.value);
                    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
                    txtDoctorCodigo.value = hdfMedicoDet.value;
                    limpiarCabeceras();
                    url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + hdfMedicoDet.value + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
                    $.ajax(url, "get", listarDoctor);
                    mostraralerta("Se ha actualizado un registro");
                    break;
                case "3":
                    var hdfMedicoDet = document.getElementById("hdfMedicoDet");
                    idMedico = "";
                    Buscar();
                    limpiarFormulario(1);
                    EscogerDetalle(false);
                    mostrarDoctor(hdfMedicoDet.value);
                    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
                    txtDoctorCodigo.value = hdfMedicoDet.value;
                    limpiarCabeceras();
                    url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + hdfMedicoDet.value + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
                    $.ajax(url, "get", listarDoctor);
                    mostraralerta("Se ha actualizado el estado de un registro");
                    break;
            }
        }
    }
}

function mostrarGrabarPrincipal(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
        switch (data[1]) {
            case "1":
                //idMedico = "";
                var inf = data[0].split('¦');
                if (inf[0] == '0') {
                    ////mostraralerta("Se ha añadido un nuevo registro");
                    mostraralerta(inf[2]);
                    Buscar();
                    limpiarFormulario(1);
                    EscogerDetalle(false);
                    ////mostrarDoctor(data[0]);
                    mostrarDoctor(inf[1]);
                    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
                    txtDoctorCodigo.value = inf[1];
                    var hdfMedicoDet = document.getElementById("hdfMedicoDet");
                    hdfMedicoDet.value = inf[1];
                    url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + inf[1] + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
                    $.ajax(url, "get", listarDoctor);

                    url = urlBase + "Configuracion/listasContratoProveedor/?ss=" + ss + "&id=" + inf[1];
                    $.ajax(url, "get", listarProveedor);

                    listarDescuentos(inf[1]);
                }
                else {
                    mostraralerta(inf[2]);
                }
                break;
            case "2":
                //idMedico = "";
                var inf = data[0].split('¦');
                if (inf[0] == '0') {
                    //mostraralerta("Se ha actualizado un registro");
                    mostraralerta(inf[2]);
                    Buscar();
                    limpiarFormulario(1);
                    EscogerDetalle(false);
                    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
                    txtDoctorCodigo.value = inf[1];
                    url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + inf[1] + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
                    $.ajax(url, "get", listarDoctor);

                    url = urlBase + "Configuracion/listasContratoProveedor/?ss=" + ss + "&id=" + inf[1];
                    $.ajax(url, "get", listarProveedor);

                    listarDescuentos(inf[1]);
                }
                else {
                    mostraralerta(inf[2]);
                }
                break;
            case "3":
                idMedico = "";
                var inf = data[0].split('¦');
                if (inf[0] == '0') {
                    //mostraralerta("Se ha actualizado el estado de un registro");
                    mostraralerta(inf[2]);
                    Buscar();
                }
                else {
                    mostraralerta(inf[2]);
                }
                break;
        }
    }
}

function mostrarDoctor(elemento) {
    var nRegistros = matrizPrincipal.length;
    var valor;
    var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa");
    var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
    var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio");
    var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin");
    var url = "";
    for (var x = 0; x < nRegistros; x++) {
        valor = matrizPrincipal[x][1];
        if ((valor * 1) == elemento) {
            if (matrizPrincipal[x][10] == "P") {
                var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
                var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
                if (btnDoctorAutorizar == null && btnDoctorRechazar == null) {
                    document.getElementById("divBotonesContrato").style.top = "-40px";
                    document.getElementById("divBotonAutorizarRechazar").style.display = "none";
                } else {
                    document.getElementById("divBotonesContrato").style.top = "-20px";
                    document.getElementById("divBotonAutorizarRechazar").style.display = "";
                }
            } else {
                document.getElementById("divBotonesContrato").style.top = "-40px";
                document.getElementById("divBotonAutorizarRechazar").style.display = "none";
            }

            var hdfMedicoDet = document.getElementById("hdfMedicoDet");
            hdfMedicoDet.value = elemento;
            var txtBusquedaMedico = document.getElementById("txtBusquedaMedico").value;
            if (txtBusquedaMedico != "") {
                MedicoActual = matrizPrincipal[x][6];
            }
            else {
                MedicoActual = "";
            }
            idMedico = elemento;
            document.getElementById("hdfMedicoCod").value = matrizPrincipal[x][6];
            txtDoctorEmpresa.value = matrizPrincipal[x][7];
            txtDoctorEmpresa.setAttribute('data-medico', matrizPrincipal[x][13]);
            txtDoctorCodigo.value = matrizPrincipal[x][1];
            txtDoctorFechaInicio.value = formatearfecha(matrizPrincipal[x][2]);
            txtDoctorFechaFin.value = formatearfecha(matrizPrincipal[x][3]);
            url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + idMedico + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
            $.ajax(url, "get", listarDoctor);
            url = urlBase + "Configuracion/listarNombreEmpresa/?ss=" + ss + "&su=" + sucursalId + "&id=" + matrizPrincipal[x][6];
            $.ajax(url, "get", listarNombreEmpresa);

            url = urlBase + "Configuracion/listasContratoProveedor/?ss=" + ss + "&id=" + idMedico;
            $.ajax(url, "get", listarProveedor);
            listarDescuentos(idMedico);


            if (matrizPrincipal[x][10] == "I") {
                mostraralerta("Sólo podrá consulta el contrato, el médico se encuentra inactivo");
            }
            if (matrizPrincipal[x][12] == 0) {
                mostraralerta("Sólo podrá consultar el contrato, el médico no tiene asociado esta sucursal");
            }
            break;
        }
    }
}

function listarNombreEmpresa(rpta) {
    var txtDoctorEmpSu = document.getElementById("txtDoctorEmpSu");
    if (rpta != "") {
        var data = rpta.split("¦");
        var txtDoctorEmpresa = document.getElementById("txtDoctorEmpresa").value;
        if (txtDoctorEmpresa == data[1]) {
            txtDoctorEmpSu.value = "";
        }
        else {
            txtDoctorEmpSu.value = data[1];
        }
    }
    else {
        txtDoctorEmpSu.value = "";
    }
}

function BuscarDescargarArchivo(dato, opt) {
    if (opt == undefined) {
        opt = "1";
    }
    if (dato.substring(0, 1) == "f") {
        var narchivos = arrayArchivoscf.length, obj;
        for (var i = 0; i < narchivos; i++) {
            if (arrayArchivoscf[i].id == dato) {
                aref.href = result;
                aref.download = obj.name;
                aref.click();
                obj = arrayArchivoscf[i];
                break;
            }
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var result = e.target.result;
            var aref = document.createElement("a");
        }
        reader.readAsDataURL(obj);

    } else {
        ArchivoActual = dato;
        var archivo = dato;
        var frm = new FormData();
        var extension = archivo.split(".");
        frm.append("archivoCliente", archivo);
        frm.append("extension", extension[extension.length - 1]);
        var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=" + opt + "&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

        var xhr = new XMLHttpRequest();
        xhr.open("post", url);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                DescargarContrato2(xhr.response);
            }
        }
        xhr.send(frm);
    }

}


function listarDoctor(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");

        DataArchivo = data[0].split("¯");
        //if (DataArchivo[0] != "") {
        //	HayArchivos = true;
        //} else {
        //	HayArchivos = false;
        //}
        var aAdjunto = document.getElementById("aAdjunto");
        var spnCargar = document.getElementById("spnCargar");
        spnCargar.style.display = "none";
        var spnEliminarArchivo = document.getElementById("spnEliminarArchivo");
        arrayArchivos = [];
        arrayArchivosGrab = [];
        arrayArchivosGrabAdj = [];
        document.getElementById("ulAdjuntos").innerHTML = "";
        if (DataArchivo.length > 1) {
            aAdjunto.innerHTML = "Hay " + DataArchivo.length + " Archivos";
            aAdjunto.onclick = null;
            spnEliminarArchivo.style.display = "none";
            spnEliminarArchivo.onclick = null;
            if (DataArchivo[0] != "") {
                var ulArchAdjuntos = document.getElementById("ulArchAdjuntos");
                //var idAdjuntoArchivo = DataArchivo[1].split("_")[0];
                var listaArchivos = DataArchivo;
                var contenido = "";
                var datoMostrar = [];
                for (var x = 0; x < listaArchivos.length; x++) {
                    datoMostrar = listaArchivos[x].split("¦");
                    contenido += "<li style='padding-bottom:10px;display:inline-block'><span style='cursor:pointer;text-decoration:underline' onclick='BuscarDescargarArchivo(\"";
                    contenido += datoMostrar[1];
                    contenido += "\")'>";
                    contenido += (datoMostrar[0].length <= 30 ? datoMostrar[0] : datoMostrar[0].substring(0, 34) + "...");
                    if (SoloVer) contenido += "</span>&nbsp;&nbsp;<span class='Icons fa-close puntero' style='color: #00a850;display:none' name='multiAdjunto' data-id='";
                    else contenido += "</span>&nbsp;&nbsp;<span class='Icons fa-close puntero' style='color: #00a850;' name='multiAdjunto' data-id='";
                    contenido += datoMostrar[1];
                    contenido += "'></span></li><br/>";
                    //arrayArchivosGrab.push(listaArchivos[x]);
                }
                ulArchAdjuntos.innerHTML = contenido;
                var multiAdjunto = document.getElementsByName("multiAdjunto");
                for (var x = 0; x < multiAdjunto.length; x++) {
                    multiAdjunto[x].onclick = function () {
                        var archivo = this.getAttribute("data-id");
                        if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                            var form = new FormData();
                            form.append("arc", archivo);
                            var url = urlBase + "Configuracion/EliminarArchivo/?ss=" + ss + "&su=" + sucursalId;
                            $.ajax(url, "post", mostrarGrabarDetalle, form);
                            abrirPopup('PopupArchivosAdjuntos');
                        }
                    }
                }
                aAdjunto.onclick = function () {
                    abrirPopup('PopupArchivosAdjuntos');
                }
            }
        } else {
            aAdjunto.onclick = null;
            aAdjunto.onclick = function () {
                var archivo = this.getAttribute("data-archivo");
                var nArchivo = archivo.split("¬");
                if (nArchivo.length > 1) {
                } else {
                    var frm = new FormData();
                    var extension = archivo.split(".");
                    frm.append("archivoCliente", archivo);
                    frm.append("extension", extension[extension.length - 1]);
                    var url = urlBase + "Mantenimiento/exportarArchivo/?ss=" + ss + "&su=" + sucursalId + "&op=1&contratoid=" + document.getElementById("txtDoctorCodigo").value + "&idCompania=" + idCompania;

                    var xhr = new XMLHttpRequest();
                    xhr.open("post", url);
                    xhr.responseType = 'blob';
                    xhr.onreadystatechange = function () {
                        if (xhr.status == 200 && xhr.readyState == 4) {
                            DescargarContrato(xhr.response);
                        }
                    }
                    xhr.send(frm);
                }
            }
            aAdjunto.innerHTML = DataArchivo[0].split("¦")[0];
            if (DataArchivo[0] != "") {
                aAdjunto.setAttribute("data-archivo", DataArchivo[0].split("¦")[1]);
                spnEliminarArchivo.style.display = "";
                spnEliminarArchivo.onclick = function () {
                    if (confirm("¿Desea eliminar el archivo de contrato?") == true) {
                        var form = new FormData();
                        form.append("arc", DataArchivo[0].split("¦")[1]);
                        var url = urlBase + "Configuracion/EliminarArchivo/?ss=" + ss + "&su=" + sucursalId;
                        $.ajax(url, "post", mostrarGrabarDetalle, form);
                    }
                }
            }
            else {
                aAdjunto.removeAttribute("data-archivo");
                spnEliminarArchivo.style.display = "none";
                spnEliminarArchivo.onclick = null;
            }
        }
        if (document.getElementById("spnAdjuntar") != null) {
            if (data[0] != "") {
                document.getElementById("spnAdjuntar").style.color = "#00a850";
            }
            else {
                document.getElementById("spnAdjuntar").style.color = "#ff0000";
            }
        }
        listaChecks = (data[1] == "" ? [] : data[1].split("¯"));
        listaProduccionFijoConfiguracion = (data[2] == "" ? [] : data[2].split("¯"));
        listaProduccionFijoBonificacion = (data[3] == "" ? [] : data[3].split("¯"));
        listaProduccionEscalonada = (data[4] == "" ? [] : data[4].split("¯"));
        listaContratoFijo = (data[5] == "" ? [] : data[5].split("¯"));
        listaHorarioCalculo = (data[6] == "" ? [] : data[6].split("¯"));
        listaHorarioBonificacion = (data[7] == "" ? [] : data[7].split("¯"));
        listaTurnoCalculo = (data[8] == "" ? [] : data[8].split("¯"));
        listaTurnoBonificacion = (data[9] == "" ? [] : data[9].split("¯"));
        listaCompartido = (data[10] == "" ? [] : data[10].split("¯"));
        listaVacuna = (data[11] == "" ? [] : data[11].split("¯"));
        var encontradocolor = false;
        for (var x = 2; x < 12; x++) {
            if (data[x].trim() != "" && data[x].trim().length != 0) {
                encontradocolor = true;
                break;
            }
        }
        if (encontradocolor) {
            HayArchivos = true;
            if (document.getElementById("spnAdjuntar") != null) {
                document.getElementById("spnAdjuntar").style.color = "#00a850";
            }
        }
        else {
            if (DataArchivo[0] != "") {
                HayArchivos = true;
                if (document.getElementById("spnAdjuntar") != null) {
                    document.getElementById("spnAdjuntar").style.color = "#00a850";
                }
            }
            else {
                HayArchivos = false;
                if (document.getElementById("spnAdjuntar") != null) {
                    document.getElementById("spnAdjuntar").style.color = "#ff0000";
                }
            }
        }
        var listaFeriado = (data[12] == "" ? [] : data[12].split("¯"));
        var txtDoctorObservacion = document.getElementById("txtDoctorObservacion");
        txtDoctorObservacion.value = data[13].split("¯");
        listaCorreoProveedor = data[14].split("¦");
        matrizExtornoMontoFijo = [];
        var btnSeleccionarExtornoMonto = document.getElementById("btnSeleccionarExtornoMonto");
        btnSeleccionarExtornoMonto.removeAttribute("data-id");
        if (data[15] != "") {
            var listaExtorno = data[15].split("¯");
            var contenidoExtorno = "";
            for (var x = 0; x < listaExtorno.length; x++) {
                matrizExtornoMontoFijo[x] = listaExtorno[x].split("¦");
                contenidoExtorno += "<tr><td style='text-align:center'><input type='radio' name='rdnExtornoMonto' data-id='";
                contenidoExtorno += x;
                contenidoExtorno += "' /><td>";
                contenidoExtorno += matrizExtornoMontoFijo[x][0];
                contenidoExtorno += "</td><td style='text-align:center'>";
                contenidoExtorno += matrizExtornoMontoFijo[x][1];
                contenidoExtorno += "</td><td style='text-align:center'>";
                contenidoExtorno += matrizExtornoMontoFijo[x][2];
                contenidoExtorno += "</td><td style='text-align:center'>";
                contenidoExtorno += matrizExtornoMontoFijo[x][3];
                contenidoExtorno += "</td><td style='text-align:right'>";
                contenidoExtorno += matrizExtornoMontoFijo[x][4];
                contenidoExtorno += "</td></tr>";
            }
            document.getElementById("tbExtornoMontoFijo").innerHTML = contenidoExtorno;
            var radioExtorno = document.getElementsByName("rdnExtornoMonto");
            for (var x = 0; x < radioExtorno.length; x++) {
                radioExtorno[x].onclick = function () {
                    var btnSeleccionarExtornoMonto = document.getElementById("btnSeleccionarExtornoMonto");
                    btnSeleccionarExtornoMonto.setAttribute("data-id", this.getAttribute("data-id"));
                }
            }
        }
        else {
            document.getElementById("tbExtornoMontoFijo").innerHTML = "<tr><td style='text-align:center' colspan=6>No se encontraron Datos</td></tr>";
        }

        llenarCombo(listaFeriado, "ddlPFBonificacionTipoDiaFecha", "", true);
        llenarCombo(listaFeriado, "ddlHorarioCalculoTipoDiaFecha", "", true);
        llenarCombo(listaFeriado, "ddlHorarioBonificacionTipoDiaFecha", "", true);
        llenarCombo(listaFeriado, "ddlTurnoBonificacionTipoDiaFecha", "", true);
        llenarCombo(listaFeriado, "ddlTurnoCalculoTipoDiaFecha", "", true);

        var ulTabs = document.getElementById("ulTabs");
        var tablink = ulTabs.getElementsByClassName("tab-link");
        var ChecksConfiguracionPago = document.getElementsByName("rdn-ConfiguracionPago");
        var contador = 0;
        for (var x = 0; x < ChecksConfiguracionPago.length; x++) {
            for (var y = 0; y < listaChecks.length; y++) {
                if (ChecksConfiguracionPago[x].value == listaChecks[y]) {
                    ChecksConfiguracionPago[x].checked = true;
                    contador = contador + 1;
                    break;
                }
            }
            if (contador == listaChecks.length) {
                break;
            }
        }
        var primero = -1;
        for (var z = 0; z < tablink.length; z++) {

            if (listaChecks.indexOf(tablink[z].getAttribute("data-tab").split("-")[1]) > -1) {
                tablink[z].className = "tab-link";
                if (primero == -1) {
                    primero = z;
                }
            }
            else {
                tablink[z].className = "tab-link bloqueado";
            }
            if (z == (tablink.length - 1)) {
                tablink[z].className = "tab-link";
            }
        }

        if (primero > -1) {
            tablink[primero].className = "tab-link current";
            tablink[primero].click();
        }
        var ulTabsX = document.getElementById("ulTabsX");
        tabX = ulTabsX.getElementsByClassName("tab-link");
        var ulTabsY = document.getElementById("ulTabsY");
        tabY = ulTabsY.getElementsByClassName("tab-link");
        var ulTabsZ = document.getElementById("ulTabsZ");
        tabZ = ulTabsZ.getElementsByClassName("tab-link");

        if ((listaChecks.indexOf("1") > -1) || (listaChecks.indexOf("4") > -1) || (listaChecks.indexOf("5") > -1)) {
            tabX[0].className = "tab-link current";
            tabX[0].click();
            tabX[1].className = "tab-link";
            tabX[2].className = "tab-link";
            tabY[0].className = "tab-link current";
            tabY[0].click();
            tabY[1].className = "tab-link";
            tabZ[0].className = "tab-link current";
            tabZ[0].click();
            tabZ[1].className = "tab-link";
        }
        else {
            tabX[0].className = "tab-link bloqueado";
            tabX[1].className = "tab-link bloqueado";
            tabX[2].className = "tab-link bloqueado";
            tabY[0].className = "tab-link bloqueado";
            tabY[1].className = "tab-link bloqueado";
            tabZ[0].className = "tab-link bloqueado";
            tabZ[1].className = "tab-link bloqueado";
        }

        matrizProduccionFijoConfiguracion = [];
        matrizProduccionFijoBonificacion = [];
        matrizProduccionEscalonada = [];
        matrizContratoFijo = [];
        matrizHorarioCalculo = [];
        matrizHorarioBonificacion = [];
        matrizTurnoCalculo = [];
        matrizTurnoBonificacion = [];
        matrizCompartido = [];
        matrizVacuna = [];
        crearMatriz("ProduccionFijoConfiguracion|1");
        paginar(indiceActualPaginaProduccionFijoConfiguracion, "ProduccionFijoConfiguracion|1");
        crearMatriz("ProduccionFijoBonificacion|2");
        paginar(indiceActualPaginaProduccionFijoBonificacion, "ProduccionFijoBonificacion|2");
        crearMatriz("ProduccionEscalonada|3");
        paginar(indiceActualPaginaProduccionEscalonada, "ProduccionEscalonada|3");
        crearMatriz("ContratoFijo|4");
        paginar(indiceActualPaginaContratoFijo, "ContratoFijo|4");
        crearMatriz("HorarioCalculo|5");
        paginar(indiceActualPaginaHorarioCalculo, "HorarioCalculo|5");
        crearMatriz("HorarioBonificacion|6");
        paginar(indiceActualPaginaHorarioBonificacion, "HorarioBonificacion|6");
        crearMatriz("TurnoCalculo|7");
        paginar(indiceActualPaginaTurnoCalculo, "TurnoCalculo|7");
        crearMatriz("TurnoBonificacion|8");
        paginar(indiceActualPaginaTurnoBonificacion, "TurnoBonificacion|8");
        crearMatriz("Compartido|9");
        paginar(indiceActualPaginaCompartido, "Compartido|9");
        crearMatriz("Vacuna|10");
        paginar(indiceActualPaginaVacuna, "Vacuna|10");
        configurarOrdenacion("ProduccionFijoConfiguracion|1");
        configurarOrdenacion("ProduccionFijoBonificacion|2");
        configurarOrdenacion("ProduccionEscalonada|3");
        configurarOrdenacion("ContratoFijo|4");
        configurarOrdenacion("HorarioCalculo|5");
        configurarOrdenacion("HorarioBonificacion|6");
        configurarOrdenacion("TurnoCalculo|7");
        configurarOrdenacion("TurnoBonificacion|8");
        configurarOrdenacion("Compartido|9");
        configurarOrdenacion("Vacuna|10");
        configurarOrdenacion("Proveedor|11");
        if (idTabActual > 0) {
            SeleccionarTabActual(idTabActual);
        }
        if (AlmacenarClick) {
            var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
            if (divBusquedaDoctor.style.display == "none") {
                var btnDoctorCancelar = document.getElementById("btnDoctorCancelar");
                if (listaChecks.length > 0) {
                    var btnDoctorCancelar = document.getElementById("btnDoctorCancelar");
                    if (listaChecks.length == 1) {
                        if (listaChecks[0] != "") {
                            //btnDoctorCancelar.click();
                        }
                    }
                    else {
                        btnDoctorCancelar.click();
                    }
                }
            }
        }

        if (SoloVer) {
            var VerAc = document.getElementsByClassName("VerAc");
            for (var x = 0; x < VerAc.length; x++) {
                VerAc[x].style.display = "none";
            }
        }
        else {
            var VerAc = document.getElementsByClassName("VerAc");
            for (var x = 0; x < VerAc.length; x++) {
                if (VerAc[x].id == "btnDoctorGrabar") {
                    VerAc[x].style.display = "inline-block";
                } else {
                    VerAc[x].style.display = "";
                }
            }
        }
    }

    limpiarCabeceras();
}

function listarDetalleDoctor(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        var elementos = data[0].split("¦");
        var hdfListaPresta = document.getElementById("hdfListaPresta");
        hdfListaPresta.value = data[1].split("¯").join(",");
        switch (data[2]) {
            case "1":
                var txtPFConfiguracionFechaInicio = document.getElementById("txtPFConfiguracionFechaInicio");
                var txtPFConfiguracionFechaFin = document.getElementById("txtPFConfiguracionFechaFin");
                var ddlPFConfiguracionTipoAtencion = document.getElementById("ddlPFConfiguracionTipoAtencion");
                var ddlPFConfiguracionTipoAdmision = document.getElementById("ddlPFConfiguracionTipoAdmision");
                var ddlPFConfiguracionTipoPaciente = document.getElementById("ddlPFConfiguracionTipoPaciente");
                var ddlPFConfiguracionAseguradora = document.getElementById("ddlPFConfiguracionAseguradora");
                var ddlPFConfiguracionEspecialidad = document.getElementById("ddlPFConfiguracionEspecialidad");
                var ddlPFConfiguracionTurno = document.getElementById("ddlPFConfiguracionTurno");
                var ddlPFConfiguracionTipoValor = document.getElementById("ddlPFConfiguracionTipoValor");
                var txtPFConfiguracionValMin = document.getElementById("txtPFConfiguracionValMin");
                var ddlPFConfiguracionPrestacion = document.getElementById("ddlPFConfiguracionPrestacion");
                var ddlPFConfiguracionTiempoPago = document.getElementById("ddlPFConfiguracionTiempoPago");
                var txtPFConfiguracionEstado = document.getElementById("txtPFConfiguracionEstado");
                var ddlPFConfiguracionContrato = document.getElementById("ddlPFConfiguracionContrato");
                var ddlPFConfiguracionServicio = document.getElementById("ddlPFConfiguracionServicio");
                var ddlPFConfiguracionModeloFacturacion = document.getElementById("ddlPFConfiguracionModeloFacturacion");
                let ddlPFConfiguracionAplicacion = document.getElementById("ddlPFConfiguracionAplicacion");

                txtPFConfiguracionFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtPFConfiguracionFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlPFConfiguracionTipoAtencion.value = (elementos[2] == "0" ? "" : elementos[2]);
                ddlPFConfiguracionTipoAdmision.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlPFConfiguracionTipoAdmision.onchange();
                ddlPFConfiguracionTipoPaciente.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlPFConfiguracionAseguradora.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlPFConfiguracionAseguradora.onchange();
                ddlPFConfiguracionEspecialidad.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlPFConfiguracionTurno.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlPFConfiguracionTipoValor.value = (elementos[8] == "0" ? "" : elementos[8]);
                ddlPFConfiguracionTipoValor.onchange();
                txtPFConfiguracionValMin.value = elementos[9];
                if (ddlPFConfiguracionTipoValor.value == "F") {
                    var txtPFConfiguracionValMax = document.getElementById("txtPFConfiguracionValMax");
                    txtPFConfiguracionValMax.value = elementos[10];
                }
                ddlPFConfiguracionPrestacion.value = elementos[11];
                ddlPFConfiguracionPrestacion.onchange();
                ddlPFConfiguracionTiempoPago.value = (elementos[12] == "0" ? "" : elementos[12]);
                ddlPFConfiguracionContrato.value = (elementos[13] == "0" ? "" : elementos[13]);
                ddlPFConfiguracionServicio.value = (elementos[14] == "0" ? "" : elementos[14]);
                ddlPFConfiguracionModeloFacturacion.value = (elementos[15] == "-1" ? "" : elementos[15]);
                switch (elementos[16]) {
                    case "A":
                        txtPFConfiguracionEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtPFConfiguracionEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtPFConfiguracionEstado.value = "INACTIVO";
                        break;
                }
                ddlPFConfiguracionAplicacion.value = elementos[17];

                break;
            case "2":
                var ddlPFBonificacionOperador = document.getElementById("ddlPFBonificacionOperador");
                var txtPFBonificacionFechaInicio = document.getElementById("txtPFBonificacionFechaInicio");
                var txtPFBonificacionFechaFin = document.getElementById("txtPFBonificacionFechaFin");
                var ddlPFBonificacionTipoAdmision = document.getElementById("ddlPFBonificacionTipoAdmision");
                var ddlPFBonificacionTipoPaciente = document.getElementById("ddlPFBonificacionTipoPaciente");
                var ddlPFBonificacionTipoAtencion = document.getElementById("ddlPFBonificacionTipoAtencion");
                var ddlPFBonificacionAseguradora = document.getElementById("ddlPFBonificacionAseguradora");
                var ddlPFBonificacionEspecialidad = document.getElementById("ddlPFBonificacionEspecialidad");
                var ddlPFBonificacionTurno = document.getElementById("ddlPFBonificacionTurno");
                var ddlPFBonificacionTipoDia = document.getElementById("ddlPFBonificacionTipoDia");
                var txtPFBonificacionEstado = document.getElementById("txtPFBonificacionEstado");
                var rdnBonificacion = document.getElementsByName("rdn-PFBonificacion");
                var ddlPFBonificacionCondicion = document.getElementById("ddlPFBonificacionCondicion");
                var txtPFBonificacionVal = document.getElementById("txtPFBonificacionVal");
                var ddlPFBonificacionPrestacion = document.getElementById("ddlPFBonificacionPrestacion");
                var txtPFBonificacionPrestacionEstado = document.getElementById("txtPFBonificacionPrestacionEstado");
                var ddlPFBonificacionServicio = document.getElementById("ddlPFBonificacionServicio");
                var ddlPFBonificacionTipoBonificacion = document.getElementById("ddlPFBonificacionTipoBonificacion");
                var ddlPFBonificacionModeloFacturacion = document.getElementById("ddlPFBonificacionModeloFacturacion");
                ddlPFBonificacionOperador.value = elementos[0];
                txtPFBonificacionFechaInicio.value = formatearfecha(elementos[1].split(" ")[0]);
                txtPFBonificacionFechaFin.value = formatearfecha(elementos[2].split(" ")[0]);
                ddlPFBonificacionTipoAtencion.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlPFBonificacionTipoAdmision.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlPFBonificacionTipoAdmision.onchange();
                ddlPFBonificacionTipoPaciente.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlPFBonificacionAseguradora.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlPFBonificacionEspecialidad.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlPFBonificacionTipoDia.value = elementos[8];
                ddlPFBonificacionTipoDia.onchange();
                if (ddlPFBonificacionTipoDia.value == "F") {
                    var ddlPFBonificacionTipoFeriado = document.getElementById("ddlPFBonificacionTipoFeriado");
                    ddlPFBonificacionTipoFeriado.value = elementos[10];
                    ddlPFBonificacionTipoFeriado.onchange();
                    if (ddlPFBonificacionTipoFeriado.value == "F") {
                        var ddlPFBonificacionTipoDiaFecha = document.getElementById("ddlPFBonificacionTipoDiaFecha");
                        var opciones = ddlPFBonificacionTipoDiaFecha.getElementsByTagName("OPTION");
                        for (var x = 0; x < opciones.length; x++) {
                            if (formatearfecha(opciones[x].text) == formatearfecha(elementos[11].split(" ")[0])) {
                                ddlPFBonificacionTipoDiaFecha.selectedIndex = x;
                                break;
                            }
                        }
                    }
                }
                ddlPFBonificacionTurno.value = (elementos[9] == 0 ? "" : elementos[9]);
                rdnBonificacion[0].checked = (elementos[12] == "True" ? true : false);
                rdnBonificacion[1].checked = (elementos[13] == "True" ? true : false);
                rdnBonificacion[2].checked = (elementos[14] == "True" ? true : false);
                rdnBonificacion[3].checked = (elementos[15] == "True" ? true : false);
                rdnBonificacion[4].checked = (elementos[16] == "True" ? true : false);
                rdnBonificacion[5].checked = (elementos[17] == "True" ? true : false);
                rdnBonificacion[6].checked = (elementos[18] == "True" ? true : false);
                ddlPFBonificacionCondicion.value = elementos[19];
                ddlPFBonificacionCondicion.onchange();
                txtPFBonificacionVal.value = elementos[20];
                ddlPFBonificacionPrestacion.value = elementos[21];
                ddlPFBonificacionPrestacion.onchange();
                ddlPFBonificacionServicio.value = (elementos[22] == "0" ? "" : elementos[22]);
                ddlPFBonificacionTipoBonificacion.value = (elementos[23] == "0" ? "" : elementos[23]);
                ddlPFBonificacionModeloFacturacion.value = (elementos[24] == "-1" ? "" : elementos[24]);

                switch (elementos[25]) {
                    case "A":
                        txtPFBonificacionPrestacionEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtPFBonificacionPrestacionEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtPFBonificacionPrestacionEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "3":
                var txtProduccionEscalonadaFechaInicio = document.getElementById("txtProduccionEscalonadaFechaInicio");
                var txtProduccionEscalonadaFechaFin = document.getElementById("txtProduccionEscalonadaFechaFin");
                var ddlProduccionEscalonadaTipoRango = document.getElementById("ddlProduccionEscalonadaTipoRango");
                var txtProduccionEscalonadaRanMin = document.getElementById("txtProduccionEscalonadaRanMin");
                var txtProduccionEscalonadaRanMax = document.getElementById("txtProduccionEscalonadaRanMax");
                var ddlProduccionEscalonadaServicio = document.getElementById("ddlProduccionEscalonadaServicio");
                var ddlProduccionEscalonadaTipoAtencion = document.getElementById("ddlProduccionEscalonadaTipoAtencion");
                var ddlProduccionEscalonadaTipoAdmision = document.getElementById("ddlProduccionEscalonadaTipoAdmision");
                var ddlProduccionEscalonadaTipoPaciente = document.getElementById("ddlProduccionEscalonadaTipoPaciente");
                var ddlProduccionEscalonadaEspecialidad = document.getElementById("ddlProduccionEscalonadaEspecialidad");
                var ddlProduccionEscalonadaAseguradora = document.getElementById("ddlProduccionEscalonadaAseguradora");
                var ddlProduccionEscalonadaFactor = document.getElementById("ddlProduccionEscalonadaFactor");
                var txtProduccionEscalonadaValMin = document.getElementById("txtProduccionEscalonadaValMin");
                var ddlProduccionEscalonadaAplica = document.getElementById("ddlProduccionEscalonadaAplica");
                var ddlProduccionEscalonadaCalculo = document.getElementById("ddlProduccionEscalonadaCalculo");
                var ddlProduccionEscalonadaPrestacion = document.getElementById("ddlProduccionEscalonadaPrestacion");
                var ddlProduccionEscalonadaTiempoPago = document.getElementById("ddlProduccionEscalonadaTiempoPago");
                var txtProduccionEscalonadaEstado = document.getElementById("txtProduccionEscalonadaEstado");
                var txtProduccionEscalonadaValMax = document.getElementById("txtProduccionEscalonadaValMax");
                txtProduccionEscalonadaFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtProduccionEscalonadaFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlProduccionEscalonadaTipoRango.value = elementos[2];
                txtProduccionEscalonadaRanMin.value = elementos[3];
                txtProduccionEscalonadaRanMax.value = elementos[4];
                ddlProduccionEscalonadaServicio.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlProduccionEscalonadaTipoAtencion.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlProduccionEscalonadaTipoAdmision.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlProduccionEscalonadaTipoAdmision.onchange();
                ddlProduccionEscalonadaTipoPaciente.value = (elementos[8] == "0" ? "" : elementos[8]);
                ddlProduccionEscalonadaAseguradora.value = (elementos[9] == "0" ? "" : elementos[9]);
                ddlProduccionEscalonadaEspecialidad.value = (elementos[10] == "0" ? "" : elementos[10]);
                ddlProduccionEscalonadaFactor.value = elementos[12];
                ddlProduccionEscalonadaFactor.onchange();
                txtProduccionEscalonadaValMin.value = elementos[13];
                txtProduccionEscalonadaValMax.value = elementos[14];
                ddlProduccionEscalonadaAplica.value = elementos[15];
                ddlProduccionEscalonadaCalculo.value = elementos[16];
                ddlProduccionEscalonadaPrestacion.value = elementos[17];
                ddlProduccionEscalonadaPrestacion.onchange();
                ddlProduccionEscalonadaTiempoPago.value = elementos[18];

                switch (elementos[19]) {
                    case "A":
                        txtProduccionEscalonadaEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtProduccionEscalonadaEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtProduccionEscalonadaEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "4":
                matrizCFOAs = (data[4] != "" ? data[4].split("¯") : []);
                var txtPopupContratoFijoConcepto = document.getElementById("txtPopupContratoFijoConcepto");
                var txtPopupContratoFijoFechaInicio = document.getElementById("txtPopupContratoFijoFechaInicio");
                var txtPopupContratoFijoFechaFin = document.getElementById("txtPopupContratoFijoFechaFin");
                var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte");
                var ddlPopupContratoFijoPeriodo = document.getElementById("ddlPopupContratoFijoPeriodo");
                var ddlPopupContratoFijoPrestacion = document.getElementById("ddlPopupContratoFijoPrestacion");
                var ddlPopupContratoFijoTiempoPago = document.getElementById("ddlPopupContratoFijoTiempoPago");
                var txtPopupContratoFijoEstado = document.getElementById("txtPopupContratoFijoEstado");
                var ddlPopupContratoFijoTurno = document.getElementById("ddlPopupContratoFijoTurno");
                var ddlPopupContratoFijoConcepto = document.getElementById("ddlPopupContratoFijoConcepto");
                var ddlPopupContratoFijoTipoRegistro = document.getElementById("ddlPopupContratoFijoTipoRegistro");
                var chkIndicador = document.getElementById("chkIndicador");
                txtPopupContratoFijoConcepto.value = elementos[0];
                txtPopupContratoFijoFechaInicio.value = formatearfecha(elementos[1].split(" ")[0]);
                txtPopupContratoFijoFechaFin.value = formatearfecha(elementos[2].split(" ")[0]);
                ddlPopupContratoFijoTipoRegistro.value = elementos[11];
                ddlPopupContratoFijoTipoRegistro.onchange();
                if (ddlPopupContratoFijoTipoRegistro.value == "E") {
                    document.getElementById("PopupExtornoMontoFijo").className = "PopUp";
                }
                txtPopupContratoFijoImporte.value = elementos[3];
                ddlPopupContratoFijoPeriodo.value = elementos[4];
                ddlPopupContratoFijoPrestacion.value = elementos[5];
                ddlPopupContratoFijoPrestacion.onchange();
                ddlPopupContratoFijoTiempoPago.value = elementos[6];
                ddlPopupContratoFijoTurno.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlPopupContratoFijoTurno.onchange();
                if (ddlPopupContratoFijoTurno.value != "") {
                    var txtPopupContratoFijoHoraInicio = document.getElementById("txtPopupContratoFijoHoraInicio");
                    var txtPopupContratoFijoHoraFin = document.getElementById("txtPopupContratoFijoHoraFin");
                    txtPopupContratoFijoHoraInicio.value = (elementos[8].split(":")[0] + ":" + elementos[8].split(":")[1]);
                    txtPopupContratoFijoHoraFin.value = (elementos[9].split(":")[0] + ":" + elementos[9].split(":")[1]);
                }
                ddlPopupContratoFijoConcepto.value = (elementos[10] == "0" ? "" : elementos[10]);

                if (ddlPopupContratoFijoTipoRegistro.value != "C") {
                    var ddlPopupContratoFijoPeriodoProd = document.getElementById("ddlPopupContratoFijoPeriodoProd");
                    ddlPopupContratoFijoPeriodoProd.value = elementos[13];
                    var txtPopupContratoFijoPeriodoProd = document.getElementById("txtPopupContratoFijoPeriodoProd");
                    txtPopupContratoFijoPeriodoProd.value = elementos[12];
                }


                switch (elementos[14]) {
                    case "A":
                        txtPopupContratoFijoEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtPopupContratoFijoEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtPopupContratoFijoEstado.value = "INACTIVO";
                        break;
                }

                var ind = buscarIndicador(elementos[10]);
                chkIndicador.checked = (ind == "True" ? true : false);

                var d = (data[3] != "" ? data[3].split("¯") : []);
                if (d.length > 0) {
                    arrayArchivoscf = [];
                    var obj = {}, ar;
                    for (var i = 0; i < d.length; i++) {
                        ar = d[i].split("¦");
                        obj = {}
                        obj.id = ar[0];
                        obj.name = ar[1];
                        obj.estado = "A";
                        arrayArchivoscf.push(obj);
                    }
                    refrescarDocumentos();
                }
                break;
            case "5":
                var txtHorarioCalculoFechaInicio = document.getElementById("txtHorarioCalculoFechaInicio");
                var txtHorarioCalculoFechaFin = document.getElementById("txtHorarioCalculoFechaFin");
                var ddlHorarioCalculoTipoAtencion = document.getElementById("ddlHorarioCalculoTipoAtencion");
                var ddlHorarioCalculoTipoAdmision = document.getElementById("ddlHorarioCalculoTipoAdmision");
                var ddlHorarioCalculoTipoPaciente = document.getElementById("ddlHorarioCalculoTipoPaciente");
                var ddlHorarioCalculoAseguradora = document.getElementById("ddlHorarioCalculoAseguradora");
                var ddlHorarioCalculoEspecialidad = document.getElementById("ddlHorarioCalculoEspecialidad");
                var ddlHorarioCalculoTipoDia = document.getElementById("ddlHorarioCalculoTipoDia");
                var ddlHorarioCalculoTurno = document.getElementById("ddlHorarioCalculoTurno");
                var ddlHorarioCalculoPrestacion = document.getElementById("ddlHorarioCalculoPrestacion");
                var txtHorarioCalculoValorHora = document.getElementById("txtHorarioCalculoValorHora");
                var ddlHorarioCalculoTiempoPago = document.getElementById("ddlHorarioCalculoTiempoPago");
                var rdnHorarioCalculo = document.getElementsByName("rdn-HorarioCalculo");
                var txtHorarioCalculoEstado = document.getElementById("txtHorarioCalculoEstado");
                txtHorarioCalculoFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtHorarioCalculoFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlHorarioCalculoTipoAtencion.value = (elementos[2] == "0" ? "" : elementos[2]);
                ddlHorarioCalculoTipoAdmision.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlHorarioCalculoTipoAdmision.onchange();
                ddlHorarioCalculoTipoPaciente.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlHorarioCalculoAseguradora.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlHorarioCalculoEspecialidad.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlHorarioCalculoTipoDia.value = elementos[7];
                ddlHorarioCalculoTipoDia.onchange();
                if (ddlHorarioCalculoTipoDia.value == "F") {
                    var ddlHorarioCalculoTipoFeriado = document.getElementById("ddlHorarioCalculoTipoFeriado");
                    ddlHorarioCalculoTipoFeriado.value = (elementos[19] == "" ? "T" : elementos[19]);
                    ddlHorarioCalculoTipoFeriado.onchange();
                    if (ddlHorarioCalculoTipoFeriado.value == "F") {
                        var ddlHorarioCalculoTipoDiaFecha = document.getElementById("ddlHorarioCalculoTipoDiaFecha");
                        var opciones = ddlHorarioCalculoTipoDiaFecha.getElementsByTagName("OPTION");
                        for (var x = 0; x < opciones.length; x++) {
                            if (formatearfecha(opciones[x].text) == formatearfecha(elementos[20].split(" ")[0])) {
                                ddlHorarioCalculoTipoDiaFecha.selectedIndex = x;
                                break;
                            }
                        }
                    }
                }
                ddlHorarioCalculoTurno.value = (elementos[8] == "0" ? "" : elementos[8]);
                ddlHorarioCalculoTurno.onchange();
                txtHorarioCalculoValorHora.value = elementos[9];
                ddlHorarioCalculoPrestacion.value = elementos[10];
                ddlHorarioCalculoPrestacion.onchange();
                ddlHorarioCalculoTiempoPago.value = elementos[11];
                rdnHorarioCalculo[0].checked = (elementos[12] == "True" ? true : false);
                rdnHorarioCalculo[1].checked = (elementos[13] == "True" ? true : false);
                rdnHorarioCalculo[2].checked = (elementos[14] == "True" ? true : false);
                rdnHorarioCalculo[3].checked = (elementos[15] == "True" ? true : false);
                rdnHorarioCalculo[4].checked = (elementos[16] == "True" ? true : false);
                rdnHorarioCalculo[5].checked = (elementos[17] == "True" ? true : false);
                rdnHorarioCalculo[6].checked = (elementos[18] == "True" ? true : false);
                if (ddlHorarioCalculoTurno.value != "") {
                    var txtHorarioCalculoHoraInicio = document.getElementById("txtHorarioCalculoHoraInicio");
                    var txtHorarioCalculoHoraFin = document.getElementById("txtHorarioCalculoHoraFin");
                    txtHorarioCalculoHoraInicio.value = (elementos[21].split(":")[0] + ":" + elementos[21].split(":")[1]);
                    txtHorarioCalculoHoraFin.value = (elementos[22].split(":")[0] + ":" + elementos[22].split(":")[1]);
                }

                switch (elementos[23]) {
                    case "A":
                        txtHorarioCalculoEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtHorarioCalculoEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtHorarioCalculoEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "6":
                var txtHorarioBonificacionFechaInicio = document.getElementById("txtHorarioBonificacionFechaInicio");
                var txtHorarioBonificacionFechaFin = document.getElementById("txtHorarioBonificacionFechaFin");
                var ddlHorarioBonificacionOperador = document.getElementById("ddlHorarioBonificacionOperador");
                var ddlHorarioBonificacionTipoPaciente = document.getElementById("ddlHorarioBonificacionTipoPaciente");
                var ddlHorarioBonificacionTipoAtencion = document.getElementById("ddlHorarioBonificacionTipoAtencion");
                var ddlHorarioBonificacionTipoAdmision = document.getElementById("ddlHorarioBonificacionTipoAdmision");
                var ddlHorarioBonificacionEspecialidad = document.getElementById("ddlHorarioBonificacionEspecialidad");
                var ddlHorarioBonificacionAseguradora = document.getElementById("ddlHorarioBonificacionAseguradora");
                var ddlHorarioBonificacionTipoDia = document.getElementById("ddlHorarioBonificacionTipoDia");
                var ddlHorarioBonificacionTurno = document.getElementById("ddlHorarioBonificacionTurno");
                var ddlHorarioBonificacionTipoValor = document.getElementById("ddlHorarioBonificacionTipoValor");
                var txtHorarioBonificacionVal = document.getElementById("txtHorarioBonificacionVal");
                var rdnHorarioBonificacion = document.getElementsByName("rdn-HorarioBonificacion");
                var txtHorarioBonificacionEstado = document.getElementById("txtHorarioBonificacionEstado");
                var ddlHorarioBonificacionPrestacion = document.getElementById("ddlHorarioBonificacionPrestacion");
                var ddlHorarioBonificacionTipoBonificacion = document.getElementById("ddlHorarioBonificacionTipoBonificacion");
                ddlHorarioBonificacionOperador.value = elementos[0];
                txtHorarioBonificacionFechaInicio.value = formatearfecha(elementos[1].split(" ")[0]);
                txtHorarioBonificacionFechaFin.value = formatearfecha(elementos[2].split(" ")[0]);
                ddlHorarioBonificacionTipoAtencion.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlHorarioBonificacionTipoAdmision.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlHorarioBonificacionTipoAdmision.onchange();
                ddlHorarioBonificacionTipoPaciente.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlHorarioBonificacionAseguradora.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlHorarioBonificacionEspecialidad.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlHorarioBonificacionTipoDia.value = elementos[8];
                ddlHorarioBonificacionTipoDia.onchange();
                if (ddlHorarioBonificacionTipoDia.value == "F") {
                    var ddlHorarioBonificacionTipoFeriado = document.getElementById("ddlHorarioBonificacionTipoFeriado");
                    ddlHorarioBonificacionTipoFeriado.value = (elementos[21] == "" ? "T" : elementos[21]);
                    ddlHorarioBonificacionTipoFeriado.onchange();
                    if (ddlHorarioBonificacionTipoFeriado.value == "F") {
                        var ddlHorarioBonificacionTipoDiaFecha = document.getElementById("ddlHorarioBonificacionTipoDiaFecha");
                        var opciones = ddlHorarioBonificacionTipoDiaFecha.getElementsByTagName("OPTION");
                        for (var x = 0; x < opciones.length; x++) {
                            if (formatearfecha(opciones[x].text) == formatearfecha(elementos[22].split(" ")[0])) {
                                ddlHorarioBonificacionTipoDiaFecha.selectedIndex = x;
                                break;
                            }
                        }
                    }
                }
                ddlHorarioBonificacionTurno.value = (elementos[9] == 0 ? "" : elementos[9]);
                ddlHorarioBonificacionTipoValor.value = elementos[10];
                txtHorarioBonificacionVal.value = elementos[11];
                ddlHorarioBonificacionPrestacion.value = elementos[12];
                ddlHorarioBonificacionPrestacion.onchange();
                rdnHorarioBonificacion[0].checked = (elementos[14] == "True" ? true : false);
                rdnHorarioBonificacion[1].checked = (elementos[15] == "True" ? true : false);
                rdnHorarioBonificacion[2].checked = (elementos[16] == "True" ? true : false);
                rdnHorarioBonificacion[3].checked = (elementos[17] == "True" ? true : false);
                rdnHorarioBonificacion[4].checked = (elementos[18] == "True" ? true : false);
                rdnHorarioBonificacion[5].checked = (elementos[19] == "True" ? true : false);
                rdnHorarioBonificacion[6].checked = (elementos[20] == "True" ? true : false);
                ddlHorarioBonificacionTipoBonificacion.value = (elementos[23] == 0 ? "" : elementos[23]);

                switch (elementos[24]) {
                    case "A":
                        txtHorarioBonificacionEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtHorarioBonificacionEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtHorarioBonificacionEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "7":
                var txtTurnoCalculoFechaInicio = document.getElementById("txtTurnoCalculoFechaInicio");
                var txtTurnoCalculoFechaFin = document.getElementById("txtTurnoCalculoFechaFin");
                var ddlTurnoCalculoTipoAtencion = document.getElementById("ddlTurnoCalculoTipoAtencion");
                var ddlTurnoCalculoTipoAdmision = document.getElementById("ddlTurnoCalculoTipoAdmision");
                var ddlTurnoCalculoTipoPaciente = document.getElementById("ddlTurnoCalculoTipoPaciente");
                var ddlTurnoCalculoAseguradora = document.getElementById("ddlTurnoCalculoAseguradora");
                var ddlTurnoCalculoEspecialidad = document.getElementById("ddlTurnoCalculoEspecialidad");
                var txtTurnoCalculoValMin = document.getElementById("txtTurnoCalculoValMin");
                var txtTurnoCalculoValMax = document.getElementById("txtTurnoCalculoValMax");
                var ddlTurnoCalculoTipoValor = document.getElementById("ddlTurnoCalculoTipoValor");
                var txtTurnoCalculoValTurnoHora = document.getElementById("txtTurnoCalculoValTurnoHora");
                var ddlTurnoCalculoPrestacion = document.getElementById("ddlTurnoCalculoPrestacion");
                var ddlTurnoCalculoTiempoPago = document.getElementById("ddlTurnoCalculoTiempoPago");
                var txtTurnoCalculoEstado = document.getElementById("txtTurnoCalculoEstado");
                var ddlTurnoCalculoTurno = document.getElementById("ddlTurnoCalculoTurno");
                var ddlTurnoCalculoTipoDia = document.getElementById("ddlTurnoCalculoTipoDia");
                var rdnTurnoCalculo = document.getElementsByName("rdn-TurnoCalculo");
                txtTurnoCalculoFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtTurnoCalculoFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlTurnoCalculoTipoAtencion.value = (elementos[2] == "0" ? "" : elementos[2]);
                ddlTurnoCalculoTipoAdmision.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlTurnoCalculoTipoAdmision.onchange();
                ddlTurnoCalculoTipoPaciente.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlTurnoCalculoAseguradora.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlTurnoCalculoEspecialidad.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlTurnoCalculoTipoValor.value = elementos[9];
                ddlTurnoCalculoTipoValor.onchange();
                txtTurnoCalculoValTurnoHora.value = elementos[10];
                if (ddlTurnoCalculoTipoValor.value == "T") {
                    var txtTurnoCalculoCantHora = document.getElementById("txtTurnoCalculoCantHora");
                    txtTurnoCalculoCantHora.value = elementos[11];
                }
                txtTurnoCalculoValMin.value = elementos[12];
                txtTurnoCalculoValMax.value = elementos[13];
                ddlTurnoCalculoTurno.value = (elementos[8] == "0" ? "" : elementos[8]);
                ddlTurnoCalculoTurno.onchange();

                if (ddlTurnoCalculoTurno.value != "") {
                    var txtTurnoCalculoHoraInicio = document.getElementById("txtTurnoCalculoHoraInicio");
                    var txtTurnoCalculoHoraFin = document.getElementById("txtTurnoCalculoHoraFin");
                    txtTurnoCalculoHoraInicio.value = (elementos[25].split(":")[0] + ":" + elementos[25].split(":")[1]);
                    txtTurnoCalculoHoraFin.value = (elementos[26].split(":")[0] + ":" + elementos[26].split(":")[1]);
                }
                ddlTurnoCalculoTipoDia.value = elementos[7];
                ddlTurnoCalculoTipoDia.onchange();
                if (ddlTurnoCalculoTipoDia.value == "F") {
                    var ddlTurnoCalculoTipoFeriado = document.getElementById("ddlTurnoCalculoTipoFeriado");
                    ddlTurnoCalculoTipoFeriado.value = (elementos[23] == "" ? "T" : elementos[23]);
                    ddlTurnoCalculoTipoFeriado.onchange();
                    if (ddlTurnoCalculoTipoFeriado.value == "F") {
                        var ddlTurnoCalculoTipoDiaFecha = document.getElementById("ddlTurnoCalculoTipoDiaFecha");
                        var opciones = ddlTurnoCalculoTipoDiaFecha.getElementsByTagName("OPTION");
                        for (var x = 0; x < opciones.length; x++) {
                            if (formatearfecha(opciones[x].text) == formatearfecha(elementos[24].split(" ")[0])) {
                                ddlTurnoCalculoTipoDiaFecha.selectedIndex = x;
                                break;
                            }
                        }
                    }
                }
                rdnTurnoCalculo[0].checked = (elementos[16] == "True" ? true : false);
                rdnTurnoCalculo[1].checked = (elementos[17] == "True" ? true : false);
                rdnTurnoCalculo[2].checked = (elementos[18] == "True" ? true : false);
                rdnTurnoCalculo[3].checked = (elementos[19] == "True" ? true : false);
                rdnTurnoCalculo[4].checked = (elementos[20] == "True" ? true : false);
                rdnTurnoCalculo[5].checked = (elementos[21] == "True" ? true : false);
                rdnTurnoCalculo[6].checked = (elementos[22] == "True" ? true : false);
                ddlTurnoCalculoPrestacion.value = elementos[14];
                ddlTurnoCalculoPrestacion.onchange();
                ddlTurnoCalculoTiempoPago.value = elementos[15];

                switch (elementos[27]) {
                    case "A":
                        txtTurnoCalculoEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtTurnoCalculoEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtTurnoCalculoEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "8":
                var txtTurnoBonificacionFechaInicio = document.getElementById("txtTurnoBonificacionFechaInicio");
                var txtTurnoBonificacionFechaFin = document.getElementById("txtTurnoBonificacionFechaFin");
                var ddlTurnoBonificacionOperador = document.getElementById("ddlTurnoBonificacionOperador");
                var ddlTurnoBonificacionTipoAtencion = document.getElementById("ddlTurnoBonificacionTipoAtencion");
                var ddlTurnoBonificacionTipoAdmision = document.getElementById("ddlTurnoBonificacionTipoAdmision");
                var ddlTurnoBonificacionTipoPaciente = document.getElementById("ddlTurnoBonificacionTipoPaciente");
                var ddlTurnoBonificacionEspecialidad = document.getElementById("ddlTurnoBonificacionEspecialidad");
                var ddlTurnoBonificacionAseguradora = document.getElementById("ddlTurnoBonificacionAseguradora");
                var ddlTurnoBonificacionTipoDia = document.getElementById("ddlTurnoBonificacionTipoDia");
                var ddlTurnoBonificacionTurno = document.getElementById("ddlTurnoBonificacionTurno");
                var ddlTurnoBonificacionTipoValor = document.getElementById("ddlTurnoBonificacionTipoValor");
                var txtTurnoBonificacionVal = document.getElementById("txtTurnoBonificacionVal");
                var ddlTurnoBonificacionPrestacion = document.getElementById("ddlTurnoBonificacionPrestacion");
                var rdnTurnoBonificacion = document.getElementsByName("rdn-TurnoBonificacion");
                var txtTurnoBonificacionEstado = document.getElementById("txtTurnoBonificacionEstado");
                var ddlTurnoBonificacionTipoBonificacion = document.getElementById("ddlTurnoBonificacionTipoBonificacion");
                ddlTurnoBonificacionOperador.value = elementos[0];
                txtTurnoBonificacionFechaInicio.value = formatearfecha(elementos[1].split(" ")[0]);
                txtTurnoBonificacionFechaFin.value = formatearfecha(elementos[2].split(" ")[0]);
                ddlTurnoBonificacionTipoAtencion.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlTurnoBonificacionTipoAdmision.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlTurnoBonificacionTipoAdmision.onchange();
                ddlTurnoBonificacionTipoPaciente.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlTurnoBonificacionAseguradora.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlTurnoBonificacionEspecialidad.value = (elementos[7] == "0" ? "" : elementos[7]);
                ddlTurnoBonificacionTipoDia.value = elementos[8];
                ddlTurnoBonificacionTipoDia.onchange();
                if (ddlTurnoBonificacionTipoDia.value == "F") {
                    var ddlTurnoBonificacionTipoFeriado = document.getElementById("ddlTurnoBonificacionTipoFeriado");
                    ddlTurnoBonificacionTipoFeriado.value = (elementos[21] == "" ? "T" : elementos[21]);
                    ddlTurnoBonificacionTipoFeriado.onchange();
                    if (ddlTurnoBonificacionTipoFeriado.value == "F") {
                        var ddlTurnoBonificacionTipoDiaFecha = document.getElementById("ddlTurnoBonificacionTipoDiaFecha");
                        var opciones = ddlTurnoBonificacionTipoDiaFecha.getElementsByTagName("OPTION");
                        for (var x = 0; x < opciones.length; x++) {
                            if (formatearfecha(opciones[x].text) == formatearfecha(elementos[22].split(" ")[0])) {
                                ddlTurnoBonificacionTipoDiaFecha.selectedIndex = x;
                                break;
                            }
                        }
                    }
                }
                ddlTurnoBonificacionTurno.value = (elementos[9] == "0" ? "" : elementos[9]);
                ddlTurnoBonificacionTipoValor.value = elementos[10];
                txtTurnoBonificacionVal.value = elementos[11];
                ddlTurnoBonificacionPrestacion.value = elementos[12];
                ddlTurnoBonificacionPrestacion.onchange();
                rdnTurnoBonificacion[0].checked = (elementos[14] == "True" ? true : false);
                rdnTurnoBonificacion[1].checked = (elementos[15] == "True" ? true : false);
                rdnTurnoBonificacion[2].checked = (elementos[16] == "True" ? true : false);
                rdnTurnoBonificacion[3].checked = (elementos[17] == "True" ? true : false);
                rdnTurnoBonificacion[4].checked = (elementos[18] == "True" ? true : false);
                rdnTurnoBonificacion[5].checked = (elementos[19] == "True" ? true : false);
                rdnTurnoBonificacion[6].checked = (elementos[20] == "True" ? true : false);
                ddlTurnoBonificacionTipoBonificacion.value = (elementos[23] == "0" ? "" : elementos[23]);


                switch (elementos[24]) {
                    case "A":
                        txtTurnoBonificacionEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtTurnoBonificacionEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtTurnoBonificacionEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "9":
                var txtCCompartidoFechaInicio = document.getElementById("txtCCompartidoFechaInicio");
                var txtCCompartidoFechaFin = document.getElementById("txtCCompartidoFechaFin");
                var ddlCCompartidoTipoAtencion = document.getElementById("ddlCCompartidoTipoAtencion");
                var ddlCCompartidoTipoAdmision = document.getElementById("ddlCCompartidoTipoAdmision");
                var ddlCCompartidoTipoPaciente = document.getElementById("ddlCCompartidoTipoPaciente");
                var ddlCCompartidoAseguradora = document.getElementById("ddlCCompartidoAseguradora");
                var ddlCCompartidoEspecialidad = document.getElementById("ddlCCompartidoEspecialidad");
                var ddlCCompartidoTipoValor = document.getElementById("ddlCCompartidoTipoValor");
                var txtCCompartidoValMin = document.getElementById("txtCCompartidoValMin");
                var ddlCCompartidoPrestacion = document.getElementById("ddlCCompartidoPrestacion");
                var ddlCCompartidoTiempoPago = document.getElementById("ddlCCompartidoTiempoPago");
                var txtCCompartidoEstado = document.getElementById("txtCCompartidoEstado");
                var ddlCCompartidoServicio = document.getElementById("ddlCCompartidoServicio");
                txtCCompartidoFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtCCompartidoFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlCCompartidoTipoAtencion.value = (elementos[2] == "0" ? "" : elementos[2]);
                ddlCCompartidoTipoAdmision.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlCCompartidoTipoAdmision.onchange();
                ddlCCompartidoTipoPaciente.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlCCompartidoAseguradora.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlCCompartidoEspecialidad.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlCCompartidoTipoValor.value = elementos[8];
                ddlCCompartidoTipoValor.onchange();
                txtCCompartidoValMin.value = elementos[9];
                if (ddlCCompartidoTipoValor.value == "F") {
                    var txtCCompartidoValMax = document.getElementById("txtCCompartidoValMax");
                    txtCCompartidoValMax.value = elementos[10];
                }
                ddlCCompartidoPrestacion.value = elementos[11];
                ddlCCompartidoPrestacion.onchange();
                ddlCCompartidoTiempoPago.value = elementos[12];
                ddlCCompartidoServicio.value = (elementos[13] == "0" ? "" : elementos[13]);


                switch (elementos[14]) {
                    case "A":
                        txtCCompartidoEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtCCompartidoEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtCCompartidoEstado.value = "INACTIVO";
                        break;
                }
                break;
            case "10":
                var txtVacunaFechaInicio = document.getElementById("txtVacunaFechaInicio");
                var txtVacunaFechaFin = document.getElementById("txtVacunaFechaFin");
                var ddlVacunaTipoAtencion = document.getElementById("ddlVacunaTipoAtencion");
                var ddlVacunaTipoAdmision = document.getElementById("ddlVacunaTipoAdmision");
                var ddlVacunaTipoPaciente = document.getElementById("ddlVacunaTipoPaciente");
                var ddlVacunaAseguradora = document.getElementById("ddlVacunaAseguradora");
                var ddlVacunaEspecialidad = document.getElementById("ddlVacunaEspecialidad");
                var ddlVacunaTipoValor = document.getElementById("ddlVacunaTipoValor");
                var txtVacunaoValMin = document.getElementById("txtVacunaoValMin");
                var ddlVacunaArticulo = document.getElementById("ddlVacunaArticulo");
                var ddlVacunaTiempoPago = document.getElementById("ddlVacunaTiempoPago");
                txtVacunaFechaInicio.value = formatearfecha(elementos[0].split(" ")[0]);
                txtVacunaFechaFin.value = formatearfecha(elementos[1].split(" ")[0]);
                ddlVacunaTipoAtencion.value = (elementos[2] == "0" ? "" : elementos[2]);
                ddlVacunaTipoAdmision.value = (elementos[3] == "0" ? "" : elementos[3]);
                ddlVacunaTipoAdmision.onchange();
                ddlVacunaTipoPaciente.value = (elementos[4] == "0" ? "" : elementos[4]);
                ddlVacunaAseguradora.value = (elementos[5] == "0" ? "" : elementos[5]);
                ddlVacunaEspecialidad.value = (elementos[6] == "0" ? "" : elementos[6]);
                ddlVacunaTipoValor.value = elementos[8];
                ddlVacunaTipoValor.onchange();
                txtVacunaoValMin.value = elementos[9];
                if (ddlVacunaTipoValor.value == "F") {
                    var txtCVacunaValMax = document.getElementById("txtCVacunaValMax");
                    txtCVacunaValMax.value = elementos[10];
                }
                ddlVacunaArticulo.value = elementos[11];
                ddlVacunaArticulo.onchange();
                ddlVacunaTiempoPago.value = elementos[12];


                switch (elementos[13]) {
                    case "A":
                        txtVacunaEstado.value = "ACTIVO";
                        break;
                    case "P":
                        txtVacunaEstado.value = "POR AUTORIZAR";
                        break;
                    case "I":
                        txtVacunaEstado.value = "INACTIVO";
                        break;
                }
                break;
        }
    }
}

function HabilitarChecks(elemento) {
    var ulTabs = document.getElementById("ulTabs");
    var tablink = ulTabs.getElementsByClassName("tab-link");
    if (elemento.checked) {
        listaChecks.push(elemento.value);
        tablink[(elemento.value * 1) - 1].click();
    }
    else {
        for (var x = 0; x < listaChecks.length; x++) {
            if (listaChecks[x].indexOf(elemento.value) > -1) {
                listaChecks.splice(x, 1);
                break;
            }
        }
    }


    for (var x = 0; x < tablink.length; x++) {
        if (listaChecks.indexOf(tablink[x].getAttribute("data-tab").split("-")[1].toString()) > -1) {
            tablink[x].className = "tab-link";
        }
        else {
            tablink[x].className = "tab-link bloqueado";
        }
        if (x == (tablink.length - 1)) {
            tablink[x].className = "tab-link";
        }


    }
    var ulTabsX = document.getElementById("ulTabsX");
    tabX = ulTabsX.getElementsByClassName("tab-link");
    var ulTabsY = document.getElementById("ulTabsY");
    tabY = ulTabsY.getElementsByClassName("tab-link");
    var ulTabsZ = document.getElementById("ulTabsZ");
    tabZ = ulTabsZ.getElementsByClassName("tab-link");

    if ((listaChecks.indexOf("1") > -1) || (listaChecks.indexOf("4") > -1) || (listaChecks.indexOf("5") > -1)) {
        tabX[0].className = "tab-link current";
        tabX[1].className = "tab-link";
        tabX[2].className = "tab-link";
        tabY[0].className = "tab-link current";
        tabY[1].className = "tab-link";
        tabZ[0].className = "tab-link current";
        tabZ[1].className = "tab-link";
    }
    else {
        tabX[0].className = "tab-link bloqueado";
        tabX[1].className = "tab-link bloqueado";
        tabX[2].className = "tab-link bloqueado";
        tabY[0].className = "tab-link bloqueado";
        tabY[1].className = "tab-link bloqueado";
        tabZ[0].className = "tab-link bloqueado";
        tabZ[1].className = "tab-link bloqueado";
    }
    if (elemento.checked) {
        tablink[(elemento.value * 1) - 1].className += " current";
    }

    switch (elemento.value) {
        case "1":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[0];
            var tab1 = document.getElementById("tab-1");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "2":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[1];
            var tab1 = document.getElementById("tab-2");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "3":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[2];
            var tab1 = document.getElementById("tab-3");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "4":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[3];
            var tab1 = document.getElementById("tab-4");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "5":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[4];
            var tab1 = document.getElementById("tab-5");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "6":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[5];
            var tab1 = document.getElementById("tab-6");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
        case "7":
            var ulTabs = document.getElementById("ulTabs");
            var tab = ulTabs.getElementsByClassName("tab-link")[6];
            var tab1 = document.getElementById("tab-7");
            if (tab.className.indexOf("bloqueado") > -1) {
                tab1.style.display = "none";
            }
            else {
                tab1.style.display = "";
            }
            break;
    }
}

function EscogerDetalle(valor) {
    var divBusquedaDoctor = document.getElementById("divBusquedaDoctor");
    var divDoctor = document.getElementById("divDoctor");
    var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio");
    var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin");
    var hdfOpc = document.getElementById("hdfOpc");
    var spnDoctor = document.getElementsByClassName("spnDoctor");
    if (valor) {
        hdfOpc.value = "1";
        for (var x = 0; x < spnDoctor.length; x++) {
            //spnDoctor[x].style.pointerEvents = "auto";
            spnDoctor[x].style.display = "";
        }
        var tab1 = document.getElementById("tab-1");
        tab1.style.display = "none";
        var tab4 = document.getElementById("tab-4");
        tab4.style.display = "none";
        var tab5 = document.getElementById("tab-5");
        tab5.style.display = "none";
        ArchivoAgrabarActuales = [];
        arrayArchivos = [];
        document.getElementById("ulAdjuntos").innerHTML = "";
        document.getElementById("aAdjunto").innerHTML = "";
        document.getElementById("fupArchivoAdjuntar").value = "";
    }
    else {

        hdfOpc.value = "2";
        for (var x = 0; x < spnDoctor.length; x++) {
            //spnDoctor[x].style.pointerEvents = "none";
            spnDoctor[x].style.display = "none";
        }
    }

    divBusquedaDoctor.style.display = "none";
    divDoctor.style.display = "";
    var txtDoctorSucursal = document.getElementById("txtDoctorSucursal");
    txtDoctorSucursal.value = sucursal;
}

function EscogerConfiguracionPago(valor, opcion, secuencia) {
    if (HayArchivos) {
        var hdfOpcConf = document.getElementById("hdfOpcConf");
        var hdfListaPresta = document.getElementById("hdfListaPresta");
        hdfListaPresta.value = "";
        hdfListaPresta.onchange();
        var contenido = "";
        if (valor) {
            hdfOpcConf.value = "1";
            contenido += "AGREGAR ";
            idContratoDetalle = 0;
        }
        else {
            hdfOpcConf.value = "2";
            contenido += "MODIFICAR ";
        }

        var limpiar = document.getElementsByName("limpiar" + opcion);
        var nRegistros = limpiar.length;
        for (var y = 0; y < nRegistros; y++) {
            if ((limpiar[y].id.indexOf("Estado") > -1) && opcion != "") {
                limpiar[y].value = "ACTIVO";
            }
            else {
                if (limpiar[y].type == "checkbox") {
                    limpiar[y].checked = false;
                } else {
                    if (limpiar[y].nodeName == "SELECT") {
                        limpiar[y].selectedIndex = "0";
                    }
                    else {
                        limpiar[y].value = "";
                    }
                }
            }
        }
        mensajeValidacion = [];
        var validar = document.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].className.indexOf("error") > -1) {
                validar[x].className = validar[x].className.split("error").join("").trim();
            }
            validar[x].value = "";
        }
        var txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio").value;
        var txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin").value;

        switch (opcion) {
            case "PFConfiguracion":
                document.getElementById("txtPFConfiguracionFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtPFConfiguracionFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlPFConfiguracionTipoAdmision").onchange();
                var ddlPFConfiguracionPrestacion = document.getElementById("ddlPFConfiguracionPrestacion");
                ddlPFConfiguracionPrestacion.selectedIndex = "0";
                ddlPFConfiguracionPrestacion.onchange();
                contenido += "PRODUCCION FIJO - CONFIGURACION";
                document.getElementById("TituloPopupPFConfiguracion").innerHTML = contenido;
                document.getElementById("ddlPFConfiguracionTipoValor").onchange();
                document.getElementById("ddlPFConfiguracionAseguradora").onchange();
                if (valor) document.getElementById("PFConfiguracionHistorial").style.display = "none";
                else document.getElementById("PFConfiguracionHistorial").style.display = "";
                break;
            case "PFBonificacion":
                var divrdnPFBonificacion = document.getElementById("divrdnPFBonificacion");
                divrdnPFBonificacion.className = "tam-25 PFocultar";
                document.getElementById("txtPFBonificacionFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtPFBonificacionFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlPFBonificacionTipoAdmision").onchange();
                var ddlPFBonificacionPrestacion = document.getElementById("ddlPFBonificacionPrestacion");
                ddlPFBonificacionPrestacion.selectedIndex = "0";
                ddlPFBonificacionPrestacion.onchange();
                contenido += "PRODUCCION FIJO - BONIFICACION";
                document.getElementById("TituloPopupPFBonificacion").innerHTML = contenido;
                document.getElementById("ddlPFBonificacionTipoDia").onchange();
                document.getElementById("ddlPFBonificacionTipoFeriado").onchange();
                if (valor) document.getElementById("PFBonificacionHistorial").style.display = "none";
                else document.getElementById("PFBonificacionHistorial").style.display = "";
                var txtPFBonificacionVal = document.getElementById("txtPFBonificacionVal");
                txtPFBonificacionVal.className = "form-texto validar";
                break;
            case "PFDescuento":


                contenido += "DESCUENTO";
                document.getElementById("TituloPopupPFDescuento").innerHTML = contenido;

                if (valor) document.getElementById("PFDescuentoHistorial").style.display = "none";
                else document.getElementById("PFDescuentoHistorial").style.display = "";
                break;
            case "ProduccionEscalonada":
                document.getElementById("txtProduccionEscalonadaFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtProduccionEscalonadaFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlProduccionEscalonadaTipoAdmision").onchange();
                var ddlProduccionEscalonadaPrestacion = document.getElementById("ddlProduccionEscalonadaPrestacion");
                ddlProduccionEscalonadaPrestacion.selectedIndex = "0";
                ddlProduccionEscalonadaPrestacion.onchange();
                contenido += "PRODUCCION ESCALONADA";
                document.getElementById("TituloPopupProduccionEscalonada").innerHTML = contenido;
                if (valor) document.getElementById("ProduccionEscalonadaHistorial").style.display = "none";
                else document.getElementById("ProduccionEscalonadaHistorial").style.display = "";
                break;
            case "ContratoFijo":
                document.getElementById("txtPopupContratoFijoConcepto").focus();
                document.getElementById("txtPopupContratoFijoFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtPopupContratoFijoFechaFin").value = txtDoctorFechaFin;
                var ddlPopupContratoFijoPrestacion = document.getElementById("ddlPopupContratoFijoPrestacion");
                ddlPopupContratoFijoPrestacion.selectedIndex = "0";
                ddlPopupContratoFijoPrestacion.onchange();
                var ddlPopupContratoFijoTurno = document.getElementById("ddlPopupContratoFijoTurno");
                ddlPopupContratoFijoTurno.selectedIndex = "0";
                ddlPopupContratoFijoTurno.onchange();
                contenido += "CONTRATO FIJO";
                document.getElementById("TituloPopupContratoFijo").innerHTML = contenido;
                if (valor) document.getElementById("ContratoFijoHistorial").style.display = "none";
                else document.getElementById("ContratoFijoHistorial").style.display = "";
                var ddlPopupContratoFijoPeriodo = document.getElementById("ddlPopupContratoFijoPeriodo");
                ddlPopupContratoFijoPeriodo.selectedIndex = "2";
                var ddlPopupContratoFijoTipoRegistro = document.getElementById("ddlPopupContratoFijoTipoRegistro");
                ddlPopupContratoFijoTipoRegistro.selectedIndex = "0";
                ddlPopupContratoFijoTipoRegistro.onchange();
                document.getElementById("spnAdjuntarcf").style.color = "#00a850";
                break;
            case "HorarioCalculo":
                document.getElementById("txtHorarioCalculoFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtHorarioCalculoFechaFin").value = txtDoctorFechaFin;
                var ddlHorarioCalculoTipoAdmision = document.getElementById("ddlHorarioCalculoTipoAdmision");
                ddlHorarioCalculoTipoAdmision.selectedIndex = "0";
                ddlHorarioCalculoTipoAdmision.onchange();
                var ddlHorarioCalculoTipoDia = document.getElementById("ddlHorarioCalculoTipoDia");
                ddlHorarioCalculoTipoDia.selectedIndex = "0";
                ddlHorarioCalculoTipoDia.onchange();
                var ddlHorarioCalculoTipoDiaFecha = document.getElementById("ddlHorarioCalculoTipoDiaFecha");
                ddlHorarioCalculoTipoDiaFecha.selectedIndex = "0";
                ddlHorarioCalculoTipoDiaFecha.className = "lectura";
                ddlHorarioCalculoTipoDiaFecha.disabled = true;
                var ddlHorarioCalculoPrestacion = document.getElementById("ddlHorarioCalculoPrestacion");
                ddlHorarioCalculoPrestacion.selectedIndex = "0";
                ddlHorarioCalculoPrestacion.onchange();
                var ddlHorarioCalculoTurno = document.getElementById("ddlHorarioCalculoTurno");
                ddlHorarioCalculoTurno.selectedIndex = "0";
                ddlHorarioCalculoTurno.onchange();
                var checks = document.getElementsByName("rdn-HorarioCalculo");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
                contenido += "HORARIO - CALCULO";
                document.getElementById("TituloPopupHorarioCalculo").innerHTML = contenido;
                if (valor) document.getElementById("HorarioCalculoHistorial").style.display = "none";
                else document.getElementById("HorarioCalculoHistorial").style.display = "";
                break;
            case "HorarioBonificacion":
                var divrdnHorarioBonificacion = document.getElementById("divrdnHorarioBonificacion");
                divrdnHorarioBonificacion.className = "tam-25 HBocultar";
                document.getElementById("txtHorarioBonificacionFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtHorarioBonificacionFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlHorarioBonificacionTipoAdmision").onchange();
                var ddlHorarioBonificacionPrestacion = document.getElementById("ddlHorarioBonificacionPrestacion");
                ddlHorarioBonificacionPrestacion.selectedIndex = "0";
                ddlHorarioBonificacionPrestacion.onchange();
                document.getElementById("ddlHorarioBonificacionTipoFeriado").onchange();
                document.getElementById("ddlHorarioBonificacionTipoDia").onchange();
                var checks = document.getElementsByName("rdn-HorarioBonificacion");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
                contenido += "HORARIO - BONIFICACION";
                document.getElementById("TituloPopupHorarioBonificacion").innerHTML = contenido;
                if (valor) document.getElementById("HorarioBonificacionHistorial").style.display = "none";
                else document.getElementById("HorarioBonificacionHistorial").style.display = "";
                break;
            case "TurnoCalculo":
                document.getElementById("txtTurnoCalculoFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtTurnoCalculoFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlTurnoCalculoTipoAdmision").onchange();
                var ddlTurnoCalculoTurno = document.getElementById("ddlTurnoCalculoTurno");
                ddlTurnoCalculoTurno.selectedIndex = "0";
                ddlTurnoCalculoTurno.onchange();
                var ddlTurnoCalculoPrestacion = document.getElementById("ddlTurnoCalculoPrestacion");
                ddlTurnoCalculoPrestacion.selectedIndex = "0";
                ddlTurnoCalculoPrestacion.onchange();
                document.getElementById("ddlTurnoCalculoTipoValor").onchange();
                document.getElementById("ddlTurnoCalculoTipoFeriado").onchange();
                document.getElementById("ddlTurnoCalculoTipoDia").onchange();
                var checks = document.getElementsByName("rdn-TurnoCalculo");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
                contenido += "TURNO - CALCULO";
                document.getElementById("TituloPopupTurnoCalculo").innerHTML = contenido;
                if (valor) document.getElementById("TurnoCalculoHistorial").style.display = "none";
                else document.getElementById("TurnoCalculoHistorial").style.display = "";
                break;
            case "TurnoBonificacion":
                var divrdnTurnoBonificacion = document.getElementById("divrdnTurnoBonificacion");
                divrdnTurnoBonificacion.className = "tam-25 TBocultar";
                document.getElementById("txtTurnoBonificacionFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtTurnoBonificacionFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlTurnoBonificacionTipoAdmision").onchange();
                var ddlTurnoBonificacionPrestacion = document.getElementById("ddlTurnoBonificacionPrestacion");
                ddlTurnoBonificacionPrestacion.selectedIndex = "0";
                ddlTurnoBonificacionPrestacion.onchange();
                document.getElementById("ddlTurnoBonificacionTipoFeriado").onchange();
                document.getElementById("ddlTurnoBonificacionTipoDia").onchange();
                var checks = document.getElementsByName("rdn-TurnoBonificacion");
                for (var x = 0; x < checks.length; x++) {
                    checks[x].checked = false;
                }
                contenido += "TURNO - BONIFICACION";
                document.getElementById("TituloPopupTurnoBonificacion").innerHTML = contenido;
                if (valor) document.getElementById("TurnoBonificacionHistorial").style.display = "none";
                else document.getElementById("TurnoBonificacionHistorial").style.display = "";
                break;
            case "CCompartido":
                document.getElementById("txtCCompartidoFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtCCompartidoFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlCCompartidoTipoAdmision").onchange();
                var ddlCCompartidoPrestacion = document.getElementById("ddlCCompartidoPrestacion");
                ddlCCompartidoPrestacion.selectedIndex = "0";
                ddlCCompartidoPrestacion.onchange();
                var txtCCompartidoValMax = document.getElementById("txtCCompartidoValMax");
                txtCCompartidoValMax.style.display = "none";
                contenido += "COSTO COMPARTIDO";
                document.getElementById("TituloPopupCCompartido").innerHTML = contenido;
                if (valor) document.getElementById("CCompartidoHistorial").style.display = "none";
                else document.getElementById("CCompartidoHistorial").style.display = "";
                break;
            case "Vacuna":
                document.getElementById("txtVacunaFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtVacunaFechaFin").value = txtDoctorFechaFin;
                document.getElementById("ddlVacunaTipoAdmision").onchange();
                var ddlVacunaArticulo = document.getElementById("ddlVacunaArticulo");
                ddlVacunaArticulo.selectedIndex = "0";
                ddlVacunaArticulo.onchange();
                var txtCVacunaValMax = document.getElementById("txtCVacunaValMax");
                txtCVacunaValMax.style.display = "none";
                contenido += "VACUNAS";
                document.getElementById("TituloPopupVacuna").innerHTML = contenido;
                if (valor) document.getElementById("VacunaHistorial").style.display = "none";
                else document.getElementById("VacunaHistorial").style.display = "";
                break;
            case "Proveedor":
                var ddTipoPrestaciones = document.getElementById("ddTipoPrestaciones");
                ddTipoPrestaciones.selectedIndex = "0";
                ddTipoPrestaciones.onchange();
                document.getElementById("txtProveedorFechaInicio").value = txtDoctorFechaInicio;
                document.getElementById("txtProveedorFechaFin").value = txtDoctorFechaFin;
                break;
            default:
                break;
        }


        if (valor == false && valor != undefined) {
            var data = secuencia.split("|");
            var hdfCd = document.getElementById("hdfCd");
            idContratoDetalle = data[0];
            hdfCd.value = data[0];
            var url = urlBase + "Configuracion/listasMedicoContratoDetalleporId/?ss=" + ss + "&id=" + data[0] + "&opc=" + data[1];
            $.ajax(url, "get", listarDetalleDoctor);
        }

        var hdfListaPresta = document.getElementById("hdfListaPresta");
        hdfListaPresta.value = "";
    } else {
        mostraralerta("Adjuntar el contrato físico del médico en formato PDF para iniciar con las configuraciones");
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

function limpiarFormulario(opcion) {
    if (opcion == undefined) {
        opcion = "";
    }
    listaChecks = [];
    var limpiar
    if (opcion == 0) limpiar = document.getElementsByName("limpiar");
    else limpiar = document.getElementsByName("limpiar" + opcion);
    var nRegistros = limpiar.length;
    for (var y = 0; y < nRegistros; y++) {
        if (y == (limpiar.length - 1) && opcion != "") {
            limpiar[y].value = "ACTIVO";
        }
        else {
            if (limpiar[y].type == "checkbox") {
                limpiar[y].checked = false;
            } else {
                if (limpiar[y].nodeName == "SELECT") {
                    limpiar[y].selectedIndex = "0";
                }
                else {
                    limpiar[y].value = "";
                }
            }
        }
    }
    switch (opcion) {
        case 0:
            var divConfiguracionPago = document.getElementById("divConfiguracionPago");
            divConfiguracionPago.style.display = "none";
            var tabs = document.getElementsByClassName("tab-link");
            for (var x = 0; x < tabs.length; x++) {
                tabs[x].className += " bloqueado";
            }
            var ChecksConfiguracionPago = document.getElementsByName("rdn-ConfiguracionPago");
            for (var y = 0; y < ChecksConfiguracionPago.length; y++) {
                if (ChecksConfiguracionPago[y].checked) {
                    ChecksConfiguracionPago[y].checked = false;
                }
            }
            for (var z = 1; z < 9; z++) {
                var tab = document.getElementById("tab-" + z);
                tab.className = tab.className.split("current").join("").trim();
            }
            matrizProduccionFijoConfiguracion = [];
            matrizProduccionFijoBonificacion = [];
            matrizProduccionEscalonada = [];
            matrizContratoFijo = [];
            matrizHorarioCalculo = [];
            matrizHorarioBonificacion = [];
            matrizTurnoCalculo = [];
            matrizTurnoBonificacion = [];
            matrizCompartido = [];
            matrizVacuna = [];
            paginar(indiceActualPaginaProduccionFijoConfiguracion, "ProduccionFijoConfiguracion|1");
            paginar(indiceActualPaginaProduccionFijoBonificacion, "ProduccionFijoBonificacion|2");
            paginar(indiceActualPaginaProduccionEscalonada, "ProduccionEscalonada|3");
            paginar(indiceActualPaginaContratoFijo, "ContratoFijo|4");
            paginar(indiceActualPaginaHorarioCalculo, "HorarioCalculo|5");
            paginar(indiceActualPaginaHorarioBonificacion, "HorarioBonificacion|6");
            paginar(indiceActualPaginaTurnoCalculo, "TurnoCalculo|7");
            paginar(indiceActualPaginaTurnoBonificacion, "TurnoBonificacion|8");
            paginar(indiceActualPaginaCompartido, "Compartido|9");
            paginar(indiceActualPaginaVacuna, "Vacuna|10");
            break;
        case 1:
            var divConfiguracionPago = document.getElementById("divConfiguracionPago");
            divConfiguracionPago.style.display = "";
            var ulTabs = document.getElementById("ulTabs");
            var tabs = ulTabs.getElementsByClassName("tab-link");
            for (var x = 0; x < tabs.length; x++) {
                if (tabs[x].className.indexOf("bloqueado") > -1) {
                    tabs[x].className = tabs[x].className.split("bloqueado").join("").trim();
                }
            }
            var ChecksConfiguracionPago = document.getElementsByName("rdn-ConfiguracionPago");
            for (var y = 0; y < ChecksConfiguracionPago.length; y++) {
                if (ChecksConfiguracionPago[y].checked) {
                    ChecksConfiguracionPago[y].checked = false;
                }
            }
            break;
        default:
            break;
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

function crearChecks(lista) {
    var nRegistros = lista.length;
    var campo;
    var contenido = "";
    for (var x = 0; x < nRegistros; x++) {
        campo = lista[x].split("¦");
        contenido += "<input type='checkbox' name='rdn-ConfiguracionPago' value='";
        contenido += campo[0];
        contenido += "'/>&nbsp;";
        contenido += campo[1];
        if (x != (nRegistros - 1)) {
            contenido += "&nbsp;";
        }
    }
    var divConfiguracionPago = document.getElementById("divConfiguracionPago");
    divConfiguracionPago.innerHTML = contenido;
}

function mostraralerta(mensaje, opcion, time) {
    var spnAlerta = document.getElementById("spnAlerta");
    spnAlerta.innerHTML = mensaje;
    var alerta = document.getElementById("alerta");
    alerta.className = "anix";
    if (time == undefined) {
        time = 3500
    }
    if (opcion == undefined) {
        setTimeout(function () {
            var alerta = document.getElementById("alerta");
            alerta.className = "";
        }, time);
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

function formatoHora(objeto, event) {
    var v = objeto.value;
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if (v.length < 3 && v.length > 0) {
        if (isNaN(v)) {
            objeto.value = v.substring(0, 1);
            return false;
        }
        else {
            if (keyCode != 8) {
                if ((v.charAt(0) * 1) < 3) {
                    if (v.match(/[0-2]{1}?\d/g) !== null) {
                        if ((objeto.value * 1) < 24) {
                            objeto.value = v + ':';
                            return false;
                        }
                        else {
                            objeto.value = v.charAt(0);
                            return false;
                        }
                    }
                }
                else {
                    objeto.value = '';
                    return false;
                }
            }
        }
    }
    else {
        if (v.indexOf(":") == -1) {
            objeto.value = v.substring(0, 2);
            return false;
        }
        else {
            if ((v.split(":")[1].charAt(0) * 1) < 6) {
                if (keyCode != 8) {
                    if (v.match(/[0-5]{1}?\d/g) !== null) {
                        if (v.length == 5 && isNaN(v.charAt(4))) {
                            objeto.value = v.substring(0, v.length - 1);
                            return false;
                        } else {
                            objeto.value = v;
                            return false;
                        }
                    }
                }
            }
            else {
                objeto.value = v.split(":")[0] + ":";
                return false;
            }
        }

    }
}

function HoraUTC(Tiempo) {
    var Ts = Tiempo.split(':');
    return Date.UTC(1970, 0, 1, Ts[0], Ts[1], 0) / 1000;
}

function esHora(Cadena) {
    if (Cadena.toLowerCase().indexOf(":") > -1) {
        var hora = Cadena.split(":");
        if (hora.length > 2) {
            return false;
        }
        else {
            if (isNaN(hora[0]) || isNaN(hora[1]) || hora[0] == "" || hora[1] == "") return false
            else return true;
        }
    }
    return false;
}


function validarHora(Tex, Mensaje, Obligatorio) {
    var Texto = document.getElementById(Tex);
    if (Texto != null) {
        if (Obligatorio) {
            if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
                return 'Ingrese ' + Mensaje.toLowerCase();
            }
        }
        if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
            if (!esHora(Texto.value)) {
                return 'La ' + Mensaje + ' es inválida';
            }
        }
    }
    return "";
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
            var txtFechaFin = document.getElementById(Tex.replace("FechaInicio", "").trim() + "FechaFin");
            var Inicio = fechaUTC(Texto.value);
            var Fin = fechaUTC(txtFechaFin.value);
            if (Inicio > Fin) {
                return 'La fecha de inicio no puede ser mayor a la de fin';
            }
        }
        else {
            var txtFechaInicio = document.getElementById(Tex.replace("FechaFin", "").trim() + "FechaInicio");
            var Fin = fechaUTC(Texto.value);
            var Inicio = fechaUTC(txtFechaInicio.value);
            if (Fin < Inicio) {
                return 'La fecha de fin no puede ser menor a la de inicio';
            }
        }
    }
    return "";
}

function validarFecha2(Tex, Mensaje, Obligatorio) {
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
            var txtFechaDocIni = document.getElementById("txtDoctorFechaInicio");
            var Inicio = fechaUTC(Texto.value);
            var IniDoc = fechaUTC(txtFechaDocIni.value);
            if (Inicio < IniDoc) {
                return 'La fecha de inicio no puede ser menor a la de inicio del contrato';
            }
        }
        else {
            var txtFechaDocFin = document.getElementById("txtDoctorFechaFin");
            var Fin = fechaUTC(Texto.value);
            var FinDoc = fechaUTC(txtFechaDocFin.value);
            if (Fin > FinDoc) {
                alert('La fecha de fin no puede ser mayor a la de fin del contrato');
                return 'La fecha de fin no puede ser mayor a la de fin del contrato';
            }
        }
    }
    return "";
}

function validarEmail(Tex, Mensaje, Obligatorio) {
    var Texto = document.getElementById(Tex);
    if (Texto != null) {
        if (Obligatorio) {
            if (Texto.value.replace(/^\s+|\s+$/g, "").length == 0) {
                return 'Ingrese ' + Mensaje.toLowerCase();
            }
        }
        if (Texto.value.replace(/^\s+|\s+$/g, "").length > 0) {
            if (Texto.value.match(/([\<])([^\>]{1,})*([\>])/i) != null) {
                return 'El ' + Mensaje + ' no debe contener etiquetas html: <etiqueta>';
            }
            if (Texto.value.match(/[,;]+/) != null) {
                return 'El ' + Mensaje + ' no debe contener , o ;';
            }
            var patron = /^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/i;
            if (!patron.test(Texto.value)) {
                return 'El ' + Mensaje + ' es inválido';
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
            //if (Texto.value.match(/[,;]+/) != null) {
            //    return Mensaje + ' No debe contener , o ;';
            //}
        }
    }
    return "";
}

function validarTextoCantidad(Tex, Mensaje, Obligatorio) {
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
            if ((Texto.value * 1) <= 0) {
                return 'Ingrese ' + Mensaje;
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

function validarSoloNumeroDecimal(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 8 && keyCode != 9 && keyCode != 0 && keyCode != 46) {
            event.preventDefault();
        }
    }
}

function validarSoloNumero(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
        if (keyCode != 8 && keyCode != 9 && keyCode != 0) {
            event.preventDefault();
        }
    }
}

function validarDetalle(opcion) {
    mensajeValidacion = [];
    var validar = document.getElementsByClassName("validar");
    for (var x = 0; x < validar.length; x++) {
        if (validar[x].className.indexOf("error") > -1) {
            validar[x].className = validar[x].className.split("error").join("").trim();
        }
    }
    switch (opcion) {
        case 1:
            var txtPFConfiguracionFechaInicio = document.getElementById("txtPFConfiguracionFechaInicio");
            var txtPFConfiguracionFechaFin = document.getElementById("txtPFConfiguracionFechaFin");
            var ddlPFConfiguracionTipoValor = document.getElementById("ddlPFConfiguracionTipoValor");
            var txtPFConfiguracionValMin = document.getElementById("txtPFConfiguracionValMin");
            var txtPFConfiguracionValMax = document.getElementById("txtPFConfiguracionValMax");

            var mensajeFechaInicio = validarFecha(txtPFConfiguracionFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtPFConfiguracionFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtPFConfiguracionFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtPFConfiguracionFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtPFConfiguracionFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtPFConfiguracionFechaFin.className += " error";
            }

            var mensajeValMin = validarTexto(txtPFConfiguracionValMin.id, "valor mínimo", true);
            if (mensajeValMin != "") {
                mensajeValidacion[txtPFConfiguracionValMin.getAttribute("data-secuencia")] = mensajeValMin;
                txtPFConfiguracionValMin.className += " error";
            }

            if (ddlPFConfiguracionTipoValor.value == "F") {
                var mensajeValMax = validarTexto(txtPFConfiguracionValMax.id, "valor máximo", true);
                if (mensajeValMax != "") {
                    mensajeValidacion[txtPFConfiguracionValMax.getAttribute("data-secuencia")] = mensajeValMax;
                    txtPFConfiguracionValMax.className += " error";
                }
            }

            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 2:
            var txtPFBonificacionFechaInicio = document.getElementById("txtPFBonificacionFechaInicio");
            var txtPFBonificacionFechaFin = document.getElementById("txtPFBonificacionFechaFin");
            var txtPFBonificacionVal = document.getElementById("txtPFBonificacionVal");
            var ddlPFBonificacionTipoBonificacion = document.getElementById("ddlPFBonificacionTipoBonificacion");

            var mensajeFechaInicio = validarFecha(txtPFBonificacionFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtPFBonificacionFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtPFBonificacionFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtPFBonificacionFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtPFBonificacionFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtPFBonificacionFechaFin.className += " error";
            }

            var mensajeTipoBonificacion = validarCombo(ddlPFBonificacionTipoBonificacion.id, "tipo bonificacion", true);
            if (mensajeTipoBonificacion != "") {
                mensajeValidacion[ddlPFBonificacionTipoBonificacion.getAttribute("data-secuencia")] = mensajeTipoBonificacion;
                ddlPFBonificacionTipoBonificacion.className += " error";
            }

            var mensajeValor = validarTexto(txtPFBonificacionVal.id, "valor", true);
            if (mensajeValor != "") {
                mensajeValidacion[txtPFBonificacionVal.getAttribute("data-secuencia")] = mensajeValor;
                txtPFBonificacionVal.className += " error";
            }
            var ddlPFBonificacionTipoDia = document.getElementById("ddlPFBonificacionTipoDia");
            var c = 0;
            if (ddlPFBonificacionTipoDia.value == "D") {
                var rdnbonificacion = document.getElementsByName("rdn-PFBonificacion");
                for (var x = 0; x < rdnbonificacion.length; x++) {
                    if (rdnbonificacion[x].checked) {
                        c = 1;
                        break;
                    }
                }
                var divrdnPFBonificacion = document.getElementById("divrdnPFBonificacion");
                if (c == 1) {
                    divrdnPFBonificacion.className = "tam-25 PFocultar";
                }
                else {
                    divrdnPFBonificacion.className = "tam-25 PFocultar error";
                }
            }
            else {
                c = 1;
            }
            if (mensajeValidacion.length > 0 || c == 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 3:
            var txtProduccionEscalonadaFechaInicio = document.getElementById("txtProduccionEscalonadaFechaInicio");
            var txtProduccionEscalonadaFechaFin = document.getElementById("txtProduccionEscalonadaFechaFin");
            var txtProduccionEscalonadaRanMin = document.getElementById("txtProduccionEscalonadaRanMin");
            var txtProduccionEscalonadaRanMax = document.getElementById("txtProduccionEscalonadaRanMax");
            var txtProduccionEscalonadaValMin = document.getElementById("txtProduccionEscalonadaValMin");
            var txtProduccionEscalonadaValMax = document.getElementById("txtProduccionEscalonadaValMax");
            var ddlProduccionEscalonadaFactor = document.getElementById("ddlProduccionEscalonadaFactor");

            var mensajeFechaInicio = validarFecha(txtProduccionEscalonadaFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtProduccionEscalonadaFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtProduccionEscalonadaFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtProduccionEscalonadaFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtProduccionEscalonadaFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtProduccionEscalonadaFechaFin.className += " error";
            }

            var mensajeRanMin = validarTexto(txtProduccionEscalonadaRanMin.id, "rango mínimo", true);
            if (mensajeRanMin != "") {
                mensajeValidacion[txtProduccionEscalonadaRanMin.getAttribute("data-secuencia")] = mensajeRanMin;
                txtProduccionEscalonadaRanMin.className += " error";
            }

            var mensajeRanMax = validarTexto(txtProduccionEscalonadaRanMax.id, "rango máximo", true);
            if (mensajeRanMax != "") {
                mensajeValidacion[txtProduccionEscalonadaRanMax.getAttribute("data-secuencia")] = mensajeRanMax;
                txtProduccionEscalonadaRanMax.className += " error";
            }

            var mensajeValor = validarTexto(txtProduccionEscalonadaValMin.id, "valor", true);
            if (mensajeValor != "") {
                mensajeValidacion[txtProduccionEscalonadaValMin.getAttribute("data-secuencia")] = mensajeValor;
                txtProduccionEscalonadaValMin.className += " error";
            }

            if (ddlProduccionEscalonadaFactor.value == "F") {
                var mensajeValMax = validarTexto(txtProduccionEscalonadaValMax.id, "valor", true);
                if (mensajeValMax != "") {
                    mensajeValidacion[txtProduccionEscalonadaValMax.getAttribute("data-secuencia")] = mensajeValMax;
                    txtProduccionEscalonadaValMax.className += " error";
                }
            }
            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 4:
            var txtPopupContratoFijoConcepto = document.getElementById("txtPopupContratoFijoConcepto");
            var ddlPopupContratoFijoConcepto = document.getElementById("ddlPopupContratoFijoConcepto");
            var txtPopupContratoFijoFechaInicio = document.getElementById("txtPopupContratoFijoFechaInicio");
            var txtPopupContratoFijoFechaFin = document.getElementById("txtPopupContratoFijoFechaFin");
            var txtPopupContratoFijoImporte = document.getElementById("txtPopupContratoFijoImporte");
            var txtPopupContratoFijoHoraInicio = document.getElementById("txtPopupContratoFijoHoraInicio");
            var txtPopupContratoFijoHoraFin = document.getElementById("txtPopupContratoFijoHoraFin");
            var ddlPopupContratoFijoTurno = document.getElementById("ddlPopupContratoFijoTurno");
            var ddlPopupContratoFijoTipoRegistro = document.getElementById("ddlPopupContratoFijoTipoRegistro");
            var mensajeDescripcion = validarTexto(txtPopupContratoFijoConcepto.id, "descripción", true);
            if (mensajeDescripcion != "") {
                mensajeValidacion[txtPopupContratoFijoConcepto.getAttribute("data-secuencia")] = mensajeDescripcion;
                txtPopupContratoFijoConcepto.className += " error";
            }

            var mensajeConcepto = validarCombo(ddlPopupContratoFijoConcepto.id, "concepto", true);
            if (mensajeConcepto != "") {
                mensajeValidacion[ddlPopupContratoFijoConcepto.getAttribute("data-secuencia")] = mensajeConcepto;
                ddlPopupContratoFijoConcepto.className += " error";
            }

            var mensajeFechaInicio = validarFecha(txtPopupContratoFijoFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtPopupContratoFijoFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtPopupContratoFijoFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtPopupContratoFijoFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtPopupContratoFijoFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtPopupContratoFijoFechaFin.className += " error";
            }

            if (ddlPopupContratoFijoTurno.value != "") {
                var mensajeHoraInicio = validarHora(txtPopupContratoFijoHoraInicio.id, "hora de inicio", true);
                if (mensajeHoraInicio != "") {
                    mensajeValidacion[txtPopupContratoFijoHoraInicio.getAttribute("data-secuencia")] = mensajeHoraInicio;
                    txtPopupContratoFijoHoraInicio.className += " error";
                }
                var mensajeHoraFin = validarHora(txtPopupContratoFijoHoraFin.id, "hora de fin", true);
                if (mensajeHoraFin != "") {
                    mensajeValidacion[txtPopupContratoFijoHoraFin.getAttribute("data-secuencia")] = mensajeHoraFin;
                    txtPopupContratoFijoHoraFin.className += " error";
                }
            }
            if (ddlPopupContratoFijoTipoRegistro.value != "C") {
                var ddlPopupContratoFijoPeriodoProd = document.getElementById("ddlPopupContratoFijoPeriodoProd");
                var txtPopupContratoFijoPeriodoProd = document.getElementById("txtPopupContratoFijoPeriodoProd");
                var mensajePeriodo = validarCombo(ddlPopupContratoFijoPeriodoProd.id, "periodo", true);
                if (mensajePeriodo != "") {
                    mensajeValidacion[ddlPopupContratoFijoPeriodoProd.getAttribute("data-secuencia")] = mensajePeriodo;
                    ddlPopupContratoFijoPeriodoProd.className += " error";
                }

                var mensajeAnio = validarTexto(txtPopupContratoFijoPeriodoProd.id, "año", true);
                if (mensajeAnio != "") {
                    mensajeValidacion[txtPopupContratoFijoPeriodoProd.getAttribute("data-secuencia")] = mensajeAnio;
                    txtPopupContratoFijoPeriodoProd.className += " error";
                }
            }
            if (ddlPopupContratoFijoTipoRegistro.value == "C") {
                var mensajeImporte = validarTextoCantidad(txtPopupContratoFijoImporte.id, "importe", true);
                if (mensajeImporte != "") {
                    mensajeValidacion[txtPopupContratoFijoImporte.getAttribute("data-secuencia")] = mensajeImporte;
                    txtPopupContratoFijoImporte.className += " error";
                }
            }

            if (ddlPopupContratoFijoTipoRegistro.value != "C") {
                var archivos = nArchivosCf();
                var spnAdjuntarcf = document.getElementById("spnAdjuntarcf");
                if (archivos.cantidad == 0) {
                    spnAdjuntarcf.style.color = "Red";
                    mostraralerta("Adjunte un sustento");
                    return false;
                } else {
                    spnAdjuntarcf.style.color = "#00a850";
                }
            }
            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 5:
            var txtHorarioCalculoFechaInicio = document.getElementById("txtHorarioCalculoFechaInicio");
            var txtHorarioCalculoFechaFin = document.getElementById("txtHorarioCalculoFechaFin");
            var txtHorarioCalculoValorHora = document.getElementById("txtHorarioCalculoValorHora");
            var txtHorarioCalculoHoraInicio = document.getElementById("txtHorarioCalculoHoraInicio");
            var txtHorarioCalculoHoraFin = document.getElementById("txtHorarioCalculoHoraFin");
            var ddlHorarioCalculoTurno = document.getElementById("ddlHorarioCalculoTurno");

            var mensajeFechaInicio = validarFecha(txtHorarioCalculoFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtHorarioCalculoFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtHorarioCalculoFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtHorarioCalculoFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtHorarioCalculoFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtHorarioCalculoFechaFin.className += " error";
            }

            if (ddlHorarioCalculoTurno.value != "") {
                var mensajeHoraInicio = validarHora(txtHorarioCalculoHoraInicio.id, "hora de inicio", true);
                if (mensajeHoraInicio != "") {
                    mensajeValidacion[txtHorarioCalculoHoraInicio.getAttribute("data-secuencia")] = mensajeHoraInicio;
                    txtHorarioCalculoHoraInicio.className += " error";
                }
                var mensajeHoraFin = validarHora(txtHorarioCalculoHoraFin.id, "hora de fin", true);
                if (mensajeHoraFin != "") {
                    mensajeValidacion[txtHorarioCalculoHoraFin.getAttribute("data-secuencia")] = mensajeHoraFin;
                    txtHorarioCalculoHoraFin.className += " error";
                }
            }

            var mensajeValor = validarTexto(txtHorarioCalculoValorHora.id, "valor por hora", true);
            if (mensajeValor != "") {
                mensajeValidacion[txtHorarioCalculoValorHora.getAttribute("data-secuencia")] = mensajeValor;
                txtHorarioCalculoValorHora.className += " error";
            }
            var ddlHorarioCalculoTipoDia = document.getElementById("ddlHorarioCalculoTipoDia");
            var c = 0;
            if (ddlHorarioCalculoTipoDia.value == "D") {
                var rdnHorarioCalculo = document.getElementsByName("rdn-HorarioCalculo");
                for (var x = 0; x < rdnHorarioCalculo.length; x++) {
                    if (rdnHorarioCalculo[x].checked) {
                        c = 1;
                        break;
                    }
                }
                var divrdnHorarioCalculo = document.getElementById("divrdnHorarioCalculo");
                if (c == 1) {
                    divrdnHorarioCalculo.className = "tam-25 HCocultar";
                }
                else {
                    divrdnHorarioCalculo.className = "tam-25 HCocultar error";
                }
            }
            else {
                c = 1;
            }
            if (mensajeValidacion.length > 0 || c == 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 6:
            var txtHorarioBonificacionFechaInicio = document.getElementById("txtHorarioBonificacionFechaInicio");
            var txtHorarioBonificacionFechaFin = document.getElementById("txtHorarioBonificacionFechaFin");
            var txtHorarioBonificacionVal = document.getElementById("txtHorarioBonificacionVal");
            var ddlHorarioBonificacionTipoBonificacion = document.getElementById("ddlHorarioBonificacionTipoBonificacion");

            var mensajeFechaInicio = validarFecha(txtHorarioBonificacionFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtHorarioBonificacionFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtHorarioBonificacionFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtHorarioBonificacionFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtHorarioBonificacionFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtHorarioBonificacionFechaFin.className += " error";
            }

            var mensajeTipoBonificacion = validarCombo(ddlHorarioBonificacionTipoBonificacion.id, "tipo bonificacion", true);
            if (mensajeTipoBonificacion != "") {
                mensajeValidacion[ddlHorarioBonificacionTipoBonificacion.getAttribute("data-secuencia")] = mensajeTipoBonificacion;
                ddlHorarioBonificacionTipoBonificacion.className += " error";
            }

            var mensajeValor = validarTexto(txtHorarioBonificacionVal.id, "valor", true);
            if (mensajeValor != "") {
                mensajeValidacion[txtHorarioBonificacionVal.getAttribute("data-secuencia")] = mensajeValor;
                txtHorarioBonificacionVal.className += " error";
            }
            var ddlHorarioBonificacionTipoDia = document.getElementById("ddlHorarioBonificacionTipoDia");
            var c = 0;
            if (ddlHorarioBonificacionTipoDia.value == "D") {
                var rdnHorarioBonificacion = document.getElementsByName("rdn-HorarioBonificacion");
                for (var x = 0; x < rdnHorarioBonificacion.length; x++) {
                    if (rdnHorarioBonificacion[x].checked) {
                        c = 1;
                        break;
                    }
                }
                var divrdnHorarioBonificacion = document.getElementById("divrdnHorarioBonificacion");
                if (c == 1) {
                    divrdnHorarioBonificacion.className = "tam-25 HBocultar";
                }
                else {
                    divrdnHorarioBonificacion.className = "tam-25 HBocultar error";
                }
            }
            else {
                c = 1;
            }
            if (mensajeValidacion.length > 0 || c == 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 7:
            var txtTurnoCalculoFechaInicio = document.getElementById("txtTurnoCalculoFechaInicio");
            var txtTurnoCalculoFechaFin = document.getElementById("txtTurnoCalculoFechaFin");
            var txtTurnoCalculoValMin = document.getElementById("txtTurnoCalculoValMin");
            var txtTurnoCalculoValMax = document.getElementById("txtTurnoCalculoValMax");
            var txtTurnoCalculoValTurnoHora = document.getElementById("txtTurnoCalculoValTurnoHora");
            var ddlTurnoCalculoTipoValor = document.getElementById("ddlTurnoCalculoTipoValor");
            var txtTurnoCalculoCantHora = document.getElementById("txtTurnoCalculoCantHora");
            var ddlTurnoCalculoTurno = document.getElementById("ddlTurnoCalculoTurno");
            var txtTurnoCalculoHoraInicio = document.getElementById("txtTurnoCalculoHoraInicio");
            var txtTurnoCalculoHoraFin = document.getElementById("txtTurnoCalculoHoraFin");
            var mensajeFechaInicio = validarFecha(txtTurnoCalculoFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtTurnoCalculoFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtTurnoCalculoFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtTurnoCalculoFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtTurnoCalculoFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtTurnoCalculoFechaFin.className += " error";
            }

            if (ddlTurnoCalculoTurno.value != "") {
                var mensajeHoraInicio = validarHora(txtTurnoCalculoHoraInicio.id, "hora de inicio", true);
                if (mensajeHoraInicio != "") {
                    mensajeValidacion[txtTurnoCalculoHoraInicio.getAttribute("data-secuencia")] = mensajeHoraInicio;
                    txtTurnoCalculoHoraInicio.className += " error";
                }
                var mensajeHoraFin = validarHora(txtTurnoCalculoHoraFin.id, "hora de fin", true);
                if (mensajeHoraFin != "") {
                    mensajeValidacion[txtTurnoCalculoHoraFin.getAttribute("data-secuencia")] = mensajeHoraFin;
                    txtTurnoCalculoHoraFin.className += " error";
                }
            }

            var mensajeTurnoHora = validarTexto(txtTurnoCalculoValTurnoHora.id, "valor", true);
            if (mensajeTurnoHora != "") {
                mensajeValidacion[txtTurnoCalculoValTurnoHora.getAttribute("data-secuencia")] = mensajeTurnoHora;
                txtTurnoCalculoValTurnoHora.className += " error";
            }
            if (ddlTurnoCalculoTipoValor.value == "T") {
                var mensajeHora = validarTexto(txtTurnoCalculoCantHora.id, "valor hora", true);
                if (mensajeHora != "") {
                    mensajeValidacion[txtTurnoCalculoCantHora.getAttribute("data-secuencia")] = mensajeHora;
                    txtTurnoCalculoCantHora.className += " error";
                }
            }
            var ddlTurnoCalculoTipoDia = document.getElementById("ddlTurnoCalculoTipoDia");
            var c = 0;
            if (ddlTurnoCalculoTipoDia.value == "D") {
                var rdnTurnoCalculo = document.getElementsByName("rdn-TurnoCalculo");
                for (var x = 0; x < rdnTurnoCalculo.length; x++) {
                    if (rdnTurnoCalculo[x].checked) {
                        c = 1;
                        break;
                    }
                }
                var divrdnTurnoCalculo = document.getElementById("divrdnTurnoCalculo");
                if (c == 1) {
                    divrdnTurnoCalculo.className = "tam-25 THCocultar";
                }
                else {
                    divrdnTurnoCalculo.className = "tam-25 THCocultar error";
                }
            }
            else {
                c = 1;
            }
            if (mensajeValidacion.length > 0 || c == 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 8:
            var txtTurnoBonificacionFechaInicio = document.getElementById("txtTurnoBonificacionFechaInicio");
            var txtTurnoBonificacionFechaFin = document.getElementById("txtTurnoBonificacionFechaFin");
            var txtTurnoBonificacionVal = document.getElementById("txtTurnoBonificacionVal");
            var ddlTurnoBonificacionTipoBonificacion = document.getElementById("ddlTurnoBonificacionTipoBonificacion");

            var mensajeFechaInicio = validarFecha(txtTurnoBonificacionFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtTurnoBonificacionFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtTurnoBonificacionFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtTurnoBonificacionFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtTurnoBonificacionFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtTurnoBonificacionFechaFin.className += " error";
            }

            var mensajeTipoBonificacion = validarCombo(ddlTurnoBonificacionTipoBonificacion.id, "tipo bonificacion", true);
            if (mensajeTipoBonificacion != "") {
                mensajeValidacion[ddlTurnoBonificacionTipoBonificacion.getAttribute("data-secuencia")] = mensajeTipoBonificacion;
                ddlTurnoBonificacionTipoBonificacion.className += " error";
            }

            var mensajeValor = validarTexto(txtTurnoBonificacionVal.id, "valor", true);
            if (mensajeValor != "") {
                mensajeValidacion[txtTurnoBonificacionVal.getAttribute("data-secuencia")] = mensajeValor;
                txtTurnoBonificacionVal.className += " error";
            }
            var ddlTurnoBonificacionTipoDia = document.getElementById("ddlTurnoBonificacionTipoDia");
            var c = 0;
            if (ddlTurnoBonificacionTipoDia.value == "D") {
                var rdnTurnoBonificacion = document.getElementsByName("rdn-TurnoBonificacion");
                for (var x = 0; x < rdnTurnoBonificacion.length; x++) {
                    if (rdnTurnoBonificacion[x].checked) {
                        c = 1;
                        break;
                    }
                }
                var divrdnTurnoBonificacion = document.getElementById("divrdnTurnoBonificacion");
                if (c == 1) {
                    divrdnTurnoBonificacion.className = "tam-25 TBocultar";
                }
                else {
                    divrdnTurnoBonificacion.className = "tam-25 TBocultar error";
                }
            }
            else {
                c = 1;
            }
            if (mensajeValidacion.length > 0 || c == 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 9:
            var txtCCompartidoFechaInicio = document.getElementById("txtCCompartidoFechaInicio");
            var txtCCompartidoFechaFin = document.getElementById("txtCCompartidoFechaFin");
            var txtCCompartidoValMin = document.getElementById("txtCCompartidoValMin");
            var ddlCCompartidoTipoValor = document.getElementById("ddlCCompartidoTipoValor");

            var mensajeFechaInicio = validarFecha(txtCCompartidoFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtCCompartidoFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtCCompartidoFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtCCompartidoFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtCCompartidoFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtCCompartidoFechaFin.className += " error";
            }

            var mensajeValMin = validarTexto(txtCCompartidoValMin.id, "valor", true);
            if (mensajeValMin != "") {
                mensajeValidacion[txtCCompartidoValMin.getAttribute("data-secuencia")] = mensajeValMin;
                txtCCompartidoValMin.className += " error";
            }

            if (ddlCCompartidoTipoValor.value == "F") {
                var txtCCompartidoValMax = document.getElementById("txtCCompartidoValMax");
                var mensajeValMax = validarTexto(txtCCompartidoValMax.id, "valor", true);
                if (mensajeValMax != "") {
                    mensajeValidacion[txtCCompartidoValMax.getAttribute("data-secuencia")] = mensajeValMax;
                    txtCCompartidoValMax.className += " error";
                }
            }
            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 10:
            var txtVacunaFechaInicio = document.getElementById("txtVacunaFechaInicio");
            var txtVacunaFechaFin = document.getElementById("txtVacunaFechaFin");
            var txtVacunaoValMin = document.getElementById("txtVacunaoValMin");
            var ddlVacunaTipoValor = document.getElementById("ddlVacunaTipoValor");

            var mensajeFechaInicio = validarFecha(txtVacunaFechaInicio.id, "fecha inicio", true);
            if (mensajeFechaInicio != "") {
                mensajeValidacion[txtVacunaFechaInicio.getAttribute("data-secuencia")] = mensajeFechaInicio;
                txtVacunaFechaInicio.className += " error";
            }

            var mensajeFechaFin = validarFecha(txtVacunaFechaFin.id, "fecha fin", true);
            if (mensajeFechaFin != "") {
                mensajeValidacion[txtVacunaFechaFin.getAttribute("data-secuencia")] = mensajeFechaFin;
                txtVacunaFechaFin.className += " error";
            }

            var mensajeValMin = validarTexto(txtVacunaoValMin.id, "valor", true);
            if (mensajeValMin != "") {
                mensajeValidacion[txtVacunaoValMin.getAttribute("data-secuencia")] = mensajeValMin;
                txtVacunaoValMin.className += " error";
            }

            if (ddlVacunaTipoValor.value == "F") {
                var txtCVacunaValMax = document.getElementById("txtCVacunaValMax");
                var mensajeValMax = validarTexto(txtCVacunaValMax.id, "valor", true);
                if (mensajeValMax != "") {
                    mensajeValidacion[txtCVacunaValMax.getAttribute("data-secuencia")] = mensajeValMax;
                    txtCVacunaValMax.className += " error";
                }
            }
            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }
            break;
        case 11:
            var doc = document,
                //ddlEspecialidadP = doc.getElementById("ddlEspecialidadP"),
                txtFechaIni = doc.getElementById("txtProveedorFechaInicio"),
                txtFechaFin = doc.getElementById("txtProveedorFechaFin"),
                ddlTPersonaP = doc.getElementById("ddlTPersonaP"),
                txtEmpresaP = doc.getElementById("txtEmpresaP"),
                ddlDiaPagoP = doc.getElementById("ddlDiaPagoP"),
                ddlDocPagoP = doc.getElementById("ddlDocPagoP"),
                ddlTipoImpuestoP = doc.getElementById("ddlTipoImpuestoP");
            txtCorreoElectronicoP = doc.getElementById("txtCorreoElectronicoP");
            txtCorreoAlternoP = doc.getElementById("txtCorreoAlternoP");
            var mensaje = ""; validarCombo(ddlEspecialidadP.id, "Especialidad", true);
            //if (mensaje != "") {
            //	mensajeValidacion[ddlEspecialidadP.getAttribute("data-secuencia")] = mensaje;
            //	ddlEspecialidadP.className += " error";
            //}

            mensaje = "";
            mensaje = validarFecha2(txtFechaIni.id, "Fecha inicio", true);
            if (mensaje != "") {
                mensajeValidacion[txtFechaIni.getAttribute("data-secuencia")] = mensaje;
                txtFechaIni.className += " error";
            }

            mensaje = "";
            mensaje = validarFecha2(txtFechaFin.id, "Fecha fin", true);
            if (mensaje != "") {
                mensajeValidacion[txtFechaFin.getAttribute("data-secuencia")] = mensaje;
                txtFechaFin.className += " error";
            }

            mensaje = "";
            mensaje = validarCombo(ddlTPersonaP.id, "Tipo Persona", true);
            if (mensaje != "") {
                mensajeValidacion[ddlTPersonaP.getAttribute("data-secuencia")] = mensaje;
                ddlTPersonaP.className += " error";
            }

            if (ddlTPersonaP.value == "J") {
                mensaje = "";
                mensaje = validarTexto(txtEmpresaP.id, "Empresa", true);
                if (mensaje != "") {
                    mensajeValidacion[txtEmpresaP.getAttribute("data-secuencia")] = mensaje;
                    txtEmpresaP.className += " error";
                }
            }
            mensaje = "";
            mensaje = validarCombo(ddlDiaPagoP.id, "Tiempo Pago", true);
            if (mensaje != "") {
                mensajeValidacion[ddlDiaPagoP.getAttribute("data-secuencia")] = mensaje;
                ddlDiaPagoP.className += " error";
            }

            mensaje = "";
            mensaje = validarCombo(ddlDocPagoP.id, "Doc. de Pago", true);
            if (mensaje != "") {
                mensajeValidacion[ddlDocPagoP.getAttribute("data-secuencia")] = mensaje;
                ddlDocPagoP.className += " error";
            }

            mensaje = "";
            mensaje = validarCombo(ddlTipoImpuestoP.id, "Tipo Impuesto", true);
            if (mensaje != "") {
                mensajeValidacion[ddlTipoImpuestoP.getAttribute("data-secuencia")] = mensaje;
                ddlTipoImpuestoP.className += " error";
            }

            mensaje = "";
            mensaje = validarEmail(txtCorreoElectronicoP.id, "Correo Electrónico", true);
            if (mensaje != "") {
                mensajeValidacion[txtCorreoElectronicoP.getAttribute("data-secuencia")] = mensaje;
                txtCorreoElectronicoP.className += " error";
            }

            mensaje = "";
            mensaje = validarEmail(txtCorreoAlternoP.id, "Correo Electrónico", false);
            if (mensaje != "") {
                mensajeValidacion[txtCorreoAlternoP.getAttribute("data-secuencia")] = mensaje;
                txtCorreoAlternoP.className += " error";
            }

            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }

            break;
        case 12:

            var ddlPFDescuentoAplica = document.getElementById("ddlPFDescuentoAplica");
            var ddlPFDescuentoDescuento = document.getElementById("ddlPFDescuentoDescuento");
            var ddlPFDescuentoTipoDescuento = document.getElementById("ddlPFDescuentoTipoDescuento");
            var txtPFDescuentoImporte = document.getElementById("txtPFDescuentoImporte");

            var mensaje = "";
            mensaje = validarCombo(ddlPFDescuentoAplica.id, "Aplica", true);
            if (mensaje != "") {
                mensajeValidacion[ddlPFDescuentoAplica.getAttribute("data-secuencia")] = mensaje;
                ddlPFDescuentoAplica.className += " error";
            }

            mensaje = "";
            mensaje = validarCombo(ddlPFDescuentoDescuento.id, "Descuento", true);
            if (mensaje != "") {
                mensajeValidacion[ddlPFDescuentoDescuento.getAttribute("data-secuencia")] = mensaje;
                ddlPFDescuentoDescuento.className += " error";
            }


            mensaje = validarTexto(txtPFDescuentoImporte.id, "Importe", true);
            if (_d.getElementById("ddlPFDescuentoTipoMonto").value == "F") {
                if (mensaje != "") {
                    mensajeValidacion[txtPFDescuentoImporte.getAttribute("data-secuencia")] = mensaje;
                    txtPFDescuentoImporte.className += " error";
                }
            }



            if (mensajeValidacion.length > 0) {
                return false;
            } else {
                return true;
            }

            break;
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
            if (elemento.className.indexOf("validar") > -1) {
                elemento.className += " error";
            }
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

function llenarCombo(lista, nombreCombo, titulo, cabecera) {
    var contenido = "";
    var n = lista.length;
    if (n > 0) {
        if (lista[0] == "") {
            n = 0;
        }
    }
    var valor = "";
    var campos = "";
    if (cabecera == undefined) {
        contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
    }
    if (nombreCombo.indexOf("TipoPaciente") > -1) {

        for (var x = 0; x < n; x++) {
            campos = lista[x].split("¦");
            if (campos[2] == comboActual) {
                contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
            }
        }

        var cbo = document.getElementById(nombreCombo);
        if (cbo != null) {
            cbo.innerHTML = contenido;
        }
    }
    else {
        for (var x = 0; x < n; x++) {
            campos = lista[x].split("¦");
            contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
        }

        var cbo = document.getElementById(nombreCombo);
        if (cbo != null) {
            cbo.innerHTML = contenido;
        }
    }
}

function llenarCombo2(lista, nombreCombo, titulo, cabecera) {
    var contenido = "";
    var n = lista.length;
    if (n > 0) {
        if (lista[0] == "") {
            n = 0;
        }
    }
    var valor = "";
    var campos = "";
    var aseguradoraId = document.getElementById("ddlPFConfiguracionAseguradora").value;
    if (cabecera == undefined) {
        contenido = "<option value=''>" + (titulo == undefined ? 'Seleccione' : 'Todos') + "</option>";
    }
    for (var x = 0; x < n; x++) {
        campos = lista[x].split("¦");
        if (campos[2] == aseguradoraId) {
            contenido += "<option value='" + campos[0] + "'>" + campos[1] + "</option>";
        }
    }

    var cbo = document.getElementById(nombreCombo);
    if (cbo != null) {
        cbo.innerHTML = contenido;
    }

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

function limpiarPopupCarga() {
    document.getElementById("fupArchivo").value = "";
    document.getElementById("btnGrabarCarga").style.display = "none";
    document.getElementById("divExcelLista1").innerHTML = "";
    document.getElementById("divExcelLista2").innerHTML = "";
    document.getElementById("divExcelLista3").innerHTML = "";
    document.getElementById("divExcelLista4").innerHTML = "";
    document.getElementById("divExcelLista5").innerHTML = "";
    document.getElementById("divExcelLista6").innerHTML = "";
    document.getElementById("divExcelLista7").innerHTML = "";
    document.getElementById("divExcelLista8").innerHTML = "";
    document.getElementById("divExcelLista9").innerHTML = "";
    document.getElementById("divExcelLista10").innerHTML = "";
    document.getElementById("divExcelLista11").innerHTML = "";
    document.getElementById("divExcelLista12").innerHTML = "";
    document.getElementById("divExcelLista13").innerHTML = "";
    document.getElementById("divExcelLista14").innerHTML = "";
    document.getElementById("divExcelLista15").innerHTML = "";
    document.getElementById("divExcelLista16").innerHTML = "";
    document.getElementById("divExcelLista17").innerHTML = "";
    document.getElementById("divExcelLista18").innerHTML = "";
    document.getElementById("divExcelLista19").innerHTML = "";
    document.getElementById("divExcelLista20").innerHTML = "";
    document.getElementById("divExcelLista21").innerHTML = "";
    listaExcelLista1 = [];
    matrizExcelLista1 = [];
    listaExcelLista2 = [];
    matrizExcelLista2 = [];
    listaExcelLista3 = [];
    matrizExcelLista3 = [];
    listaExcelLista4 = [];
    matrizExcelLista4 = [];
    listaExcelLista5 = [];
    matrizExcelLista5 = [];
    listaExcelLista6 = [];
    matrizExcelLista6 = [];
    listaExcelLista7 = [];
    matrizExcelLista7 = [];
    listaExcelLista8 = [];
    matrizExcelLista8 = [];
    listaExcelLista9 = [];
    matrizExcelLista9 = [];
    listaExcelLista10 = [];
    matrizExcelLista10 = [];
    listaExcelLista11 = [];
    matrizExcelLista11 = [];
    listaExcelLista12 = [];
    matrizExcelLista12 = [];
    listaExcelLista13 = [];
    matrizExcelLista13 = [];
    listaExcelLista14 = [];
    matrizExcelLista14 = [];
    listaExcelLista15 = [];
    matrizExcelLista15 = [];
    listaExcelLista16 = [];
    matrizExcelLista16 = [];
    listaExcelLista17 = [];
    matrizExcelLista17 = [];
    listaExcelLista18 = [];
    matrizExcelLista18 = [];
    listaExcelLista19 = [];
    matrizExcelLista19 = [];
    listaExcelLista20 = [];
    matrizExcelLista20 = [];
    listaExcelLista21 = [];
    matrizExcelLista21 = [];
    Buscar();
}

function limpiarPopupCarga2() {
    document.getElementById("fupArchivo2").value = "";
    document.getElementById("btnGrabarCarga2").style.display = "none";
    document.getElementById("divExcelPrestacion1").innerHTML = "";
    document.getElementById("divExcelPrestacion2").innerHTML = "";
    matrizExcelPrestacion1 = [];
    matrizExcelPrestacion2 = [];
    listaExcelPrestacion1 = [];
    listaExcelPrestacion2 = [];
}

function mostrarVistaPrevia(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        listaExcelLista1 = data[0].split("¯");
        separarListas(data[1].split("¯"));
        separarListas(data[2].split("¯"));
        crearTabla("ExcelLista1|E1");
        crearTabla("ExcelLista2|E1");
        crearTabla("ExcelLista3|E1");
        crearTabla("ExcelLista4|E1");
        crearTabla("ExcelLista5|E1");
        crearTabla("ExcelLista6|E1");
        crearTabla("ExcelLista7|E1");
        crearTabla("ExcelLista8|E1");
        crearTabla("ExcelLista9|E1");
        crearTabla("ExcelLista10|E1");
        crearTabla("ExcelLista11|E1");
        crearTabla("ExcelLista12|E1");
        crearTabla("ExcelLista13|E1");
        crearTabla("ExcelLista14|E1");
        crearTabla("ExcelLista15|E1");
        crearTabla("ExcelLista16|E1");
        crearTabla("ExcelLista17|E1");
        crearTabla("ExcelLista18|E1");
        crearTabla("ExcelLista19|E1");
        crearTabla("ExcelLista20|E1");
        crearTabla("ExcelLista21|E1");
        crearMatriz("ExcelLista1|E1");
        crearMatriz("ExcelLista2|E1");
        crearMatriz("ExcelLista3|E1");
        crearMatriz("ExcelLista4|E1");
        crearMatriz("ExcelLista5|E1");
        crearMatriz("ExcelLista6|E1");
        crearMatriz("ExcelLista7|E1");
        crearMatriz("ExcelLista8|E1");
        crearMatriz("ExcelLista9|E1");
        crearMatriz("ExcelLista10|E1");
        crearMatriz("ExcelLista11|E1");
        crearMatriz("ExcelLista12|E1");
        crearMatriz("ExcelLista13|E1");
        crearMatriz("ExcelLista14|E1");
        crearMatriz("ExcelLista15|E1");
        crearMatriz("ExcelLista16|E1");
        crearMatriz("ExcelLista17|E1");
        crearMatriz("ExcelLista18|E1");
        crearMatriz("ExcelLista19|E1");
        crearMatriz("ExcelLista20|E1");
        crearMatriz("ExcelLista21|E1");
        paginar(indiceActualPaginaExcelLista1, "ExcelLista1|E1");
        paginar(indiceActualPaginaExcelLista2, "ExcelLista2|E2");
        paginar(indiceActualPaginaExcelLista3, "ExcelLista3|E3");
        paginar(indiceActualPaginaExcelLista4, "ExcelLista4|E4");
        paginar(indiceActualPaginaExcelLista5, "ExcelLista5|E5");
        paginar(indiceActualPaginaExcelLista6, "ExcelLista6|E6");
        paginar(indiceActualPaginaExcelLista7, "ExcelLista7|E7");
        paginar(indiceActualPaginaExcelLista8, "ExcelLista8|E8");
        paginar(indiceActualPaginaExcelLista9, "ExcelLista9|E9");
        paginar(indiceActualPaginaExcelLista10, "ExcelLista10|E10");
        paginar(indiceActualPaginaExcelLista11, "ExcelLista11|E11");
        paginar(indiceActualPaginaExcelLista12, "ExcelLista12|E12");
        paginar(indiceActualPaginaExcelLista13, "ExcelLista13|E13");
        paginar(indiceActualPaginaExcelLista14, "ExcelLista14|E14");
        paginar(indiceActualPaginaExcelLista15, "ExcelLista15|E15");
        paginar(indiceActualPaginaExcelLista16, "ExcelLista16|E16");
        paginar(indiceActualPaginaExcelLista17, "ExcelLista17|E17");
        paginar(indiceActualPaginaExcelLista18, "ExcelLista18|E18");
        paginar(indiceActualPaginaExcelLista19, "ExcelLista19|E19");
        paginar(indiceActualPaginaExcelLista20, "ExcelLista20|E20");
        paginar(indiceActualPaginaExcelLista21, "ExcelLista21|E21");


        indiceActualBloque = 0;

    }
}

function mostrarVistaPrevia2(rpta) {
    if (rpta != "") {
        var data = rpta.split("¬");
        var ifr = document.getElementById("frPrestacion");
        var lista = ifr.contentWindow.listaPrincipal;
        var listaChecks = ifr.contentWindow.matrizChecks;
        var nRegistros1 = data.length;
        var nRegistros2 = lista.length;
        if (listaChecks.length > 0) {
            var nRegistros3 = listaChecks.length;
        }
        var campos1, campos2, campos3, existe, obser = false;
        matrizExcelPrestacion1 = [], matrizExcelPrestacion2 = [];
        ifr.contentWindow.listaPrestacionPadre = [];
        for (var i = 0; i < nRegistros1; i++) {
            campos1 = data[i].split("¦");
            for (var j = 0; j < nRegistros2; j++) {
                campos2 = lista[j].split("¦");
                existe = false;
                if (campos1[1] == campos2[0]) {
                    existe = true;
                    if (listaChecks.length > 0) {
                        for (var k = 0; k < nRegistros3; k++) {
                            obser = false;
                            if (campos2[0] == listaChecks[k]) {
                                obser = true;
                                //listaChecks.splice(k, 1);
                                nRegistros3 = listaChecks.length;
                                break;
                            }
                        }
                    }
                    //lista.splice(j, 1);
                    nRegistros2 = lista.length;
                    break;
                }
            }
            if (existe) {
                if (obser) {
                    matrizExcelPrestacion2.push(data[i]);
                    matrizExcelPrestacion2.push("¦Ya seleccionado");
                    matrizExcelPrestacion2.push("¬");
                }
                else {
                    matrizExcelPrestacion1.push(data[i]);
                    matrizExcelPrestacion1.push("¦");
                    matrizExcelPrestacion1.push("¬");
                }
                ifr.contentWindow.listaPrestacionPadre.push(campos1[1]);
            }
            else {
                matrizExcelPrestacion2.push(data[i]);
                matrizExcelPrestacion2.push("¦Código no existe");
                matrizExcelPrestacion2.push("¬");
            }
        }
        listaExcelPrestacion1 = matrizExcelPrestacion1.join("").substr(0, matrizExcelPrestacion1.join("").length - 1).split("¬");
        listaExcelPrestacion2 = matrizExcelPrestacion2.join("").substr(0, matrizExcelPrestacion2.join("").length - 1).split("¬");
        crearTabla("ExcelPrestacion1|P1");
        crearTabla("ExcelPrestacion2|P2");
        crearMatriz("ExcelPrestacion1|E1");
        crearMatriz("ExcelPrestacion2|E1");
        paginar(indiceActualPaginaExcelPrestacion1, "ExcelPrestacion1|P1");
        paginar(indiceActualPaginaExcelPrestacion2, "ExcelPrestacion2|P2");
    }
}

function mostrarAdicionarContratos(rpta) {
    if (rpta != "") {
        abrirPopup('PopupCarga');
        limpiarPopupCarga();
    }
}

function eliminarRegistro(indice, matriz, indiceMatriz) {
    var nRegistros = window["matriz" + matriz].length;
    for (var i = 0; i < nRegistros; i++) {
        if (window["matriz" + matriz][i][0] == indice) {
            window["matriz" + matriz].splice(i, 1);
            break;
        }
    }
    paginar(0, matriz + "|" + indiceMatriz);
}

function separarListas(listaGeneral) {
    var nRegistros = listaGeneral.length;
    var campos, nCampos = listaGeneral[0].length;
    for (var i = 0; i < nRegistros; i++) {
        campos = listaGeneral[i].split("¦");
        switch (campos[0]) {
            case "2":
                listaExcelLista2.push(listaGeneral[i]);
                break;
            case "3":
                listaExcelLista3.push(listaGeneral[i]);
                break;
            case "4":
                listaExcelLista4.push(listaGeneral[i]);
                break;
            case "5":
                listaExcelLista5.push(listaGeneral[i]);
                break;
            case "6":
                listaExcelLista6.push(listaGeneral[i]);
                break;
            case "7":
                listaExcelLista7.push(listaGeneral[i]);
                break;
            case "8":
                listaExcelLista8.push(listaGeneral[i]);
                break;
            case "9":
                listaExcelLista9.push(listaGeneral[i]);
                break;
            case "10":
                listaExcelLista10.push(listaGeneral[i]);
                break;
            case "11":
                listaExcelLista11.push(listaGeneral[i]);
                break;
            case "12":
                listaExcelLista12.push(listaGeneral[i]);
                break;
            case "13":
                listaExcelLista13.push(listaGeneral[i]);
                break;
            case "14":
                listaExcelLista14.push(listaGeneral[i]);
                break;
            case "15":
                listaExcelLista15.push(listaGeneral[i]);
                break;
            case "16":
                listaExcelLista16.push(listaGeneral[i]);
                break;
            case "17":
                listaExcelLista17.push(listaGeneral[i]);
                break;
            case "18":
                listaExcelLista18.push(listaGeneral[i]);
                break;
            case "19":
                listaExcelLista19.push(listaGeneral[i]);
                break;
            case "20":
                listaExcelLista20.push(listaGeneral[i]);
                break;
            case "21":
                listaExcelLista21.push(listaGeneral[i]);
                break;
        }
    }
}

function SeleccionarTabActual(id) {
    var ulTabs = document.getElementById("ulTabs");
    var opciones = ulTabs.getElementsByClassName("tab-link");
    for (var x = 0; x < opciones.length; x++) {
        if (opciones[x].getAttribute("data-tab") == ("tab-" + id)) {
            opciones[x].click();
            switch (id) {
                case 1:
                    var ulTabsX = document.getElementById("ulTabsX");
                    var opcionX = ulTabsX.getElementsByClassName("tab-link")[0];
                    opcionX.click();
                    break;
                case 4:
                    var ulTabsY = document.getElementById("ulTabsY");
                    var opcionY = ulTabsY.getElementsByClassName("tab-link")[0];
                    opcionY.click();
                    break;
                case 5:
                    var ulTabsZ = document.getElementById("ulTabsZ");
                    var opcionZ = ulTabsZ.getElementsByClassName("tab-link")[0];
                    opcionZ.click();
                    break;
            }
            break;
        }
    }
}

function ArchivoPeso(size) {
    return ((size / 1024) / 1024).toFixed(3);
};

function crearCabeceraExportar(opcion) {
    var cabecera = "<html><head><meta charset='utf-8'/></head><table>";
    if (opcion != "0") {
        cabecera += "<tr><td style='width:150px'>Sucursal</td><td>";
        cabecera += document.getElementById("txtDoctorSucursal").value;
        cabecera += "</td></tr><tr><td style='width:150px'>Médico</td><td>";
        cabecera += document.getElementById("txtDoctorEmpresa").value;
        cabecera += "</td></tr><tr></tr><tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    }
    else {
        cabecera += "<tr style='background-Color:\"#00a850\"; color:\"\#FFF\"'>";
    }
    switch (opcion) {
        case "0":
            cabecera += "<td style='width: 150px' align='center'>Sucursal</td>";
            cabecera += "<td style='width: 60px' align='center'>Código Contrato</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 60px' align='center'>Ind. Venc</td>";
            cabecera += "<td style='width: 60px' align='center'>Ind. Aplic</td>";
            cabecera += "<td style='width: 230px' align='center'>Medico</td>";
            cabecera += "<td style='width: 230px' align='center'>Especialidad</td>";
            cabecera += "<td style='width: 250px' align='center'>Empresa</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "1":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Factor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Pres</td>";
            cabecera += "<td style='width: 100px' align='center'>Aplicación</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "2":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Factor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Pres</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "3":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 150px' align='center'>Servicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Rango</td>";
            cabecera += "<td style='width: 60px' align='center'>Rango</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Factor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "4":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 150px' align='center'>Concepto</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 100px' align='center'>Periodo</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "5":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Dia</td>";
            cabecera += "<td style='width: 60px' align='center'>Dia</td>";
            cabecera += "<td style='width: 60px' align='center'>Turno</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor Hora</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "6":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Dia</td>";
            cabecera += "<td style='width: 60px' align='center'>Tipo Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "7":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Horas</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "8":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "9":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "10":
            cabecera += "<td style='width: 60px' align='center'>Secuencia</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fecha Final</td>";
            cabecera += "<td style='width: 400px' align='center'>Condición</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Valor</td>";
            cabecera += "<td style='width: 60px' align='center'>Preset</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "11":
            cabecera += "<td style='width: 60px' align='center'>Especialidad</td>";
            cabecera += "<td style='width: 100px' align='center'>Fe.Inicio</td>";
            cabecera += "<td style='width: 100px' align='center'>Fe.Final</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Admisión</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Persona</td>";
            cabecera += "<td style='width: 400px' align='center'>Empresa</td>";
            cabecera += "<td style='width: 100px' align='center'>Dias de Pago</td>";
            cabecera += "<td style='width: 150px' align='center'>Documento Pago</td>";
            cabecera += "<td style='width: 150px' align='center'>Tipo Impuesto</td>";
            cabecera += "<td style='width: 60px' align='center'>Estado</td>";
            break;
        case "12":
            cabecera += "<td style='width: 60px' align='center'>Código</td>";
            cabecera += "<td style='width: 150px' align='center'>Descripción</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Descuento</td>";
            cabecera += "<td style='width: 100px' align='center'>Tipo Monto</td>";
            cabecera += "<td style='width: 80px' align='center'>Importe</td>";
            cabecera += "<td style='width: 80px' align='center'>Estado</td>";

            break;
    }
    cabecera += "</tr>";
    return cabecera;
}

function exportacion(elemento, objeto) {
    var identificador = elemento.split("|");
    var nRegistros = window["matriz" + identificador[0]].length;
    var nCampos = window["matriz" + identificador[0]][0].length;
    var contenido = [];
    if (nRegistros > 0) {
        excelExportar = crearCabeceraExportar(identificador[1]);
        for (i = 0; i < nRegistros; i++) {
            switch (identificador[1]) {
                case "0":
                    contenido.push("<tr>");
                    for (var j = 0; j < nCampos - 1; j++) {
                        if (j != 6 && j != 11 && j != 12) {
                            if (j == (nCampos - 4)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 0:
                                        contenido.push("<td>" + sucursal + "</td>");
                                        break;
                                    case 2:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }
                    }
                    contenido.push("</tr>");
                    break;
                case "1":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2) {

                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje")) + "</td>");
                                        break;
                                    case 9:
                                        let _n = listaAplicacion.length;
                                        let _c, des = "";
                                        for (let a = 0; a < _n; a++) {
                                            _c = listaAplicacion[a].split("¦");
                                            if (window["matriz" + identificador[0]][i][j] == _c[0]) {
                                                des = _c[1];
                                                break;
                                            }

                                        }
                                        contenido.push("<td>" + des + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }
                            }
                        }
                    }
                    contenido.push("</tr>");
                    break;
                case "2":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2 && j != 9) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje") + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }
                    }
                    contenido.push("</tr>");
                    break;
                case "3":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j == (nCampos - 1)) {
                            switch (window["matriz" + identificador[0]][i][j]) {
                                case "A":
                                    contenido.push("<td>ACTIVO</td>");
                                    break;
                                case "I":
                                    contenido.push("<td>INACTIVO</td>");
                                    break;
                                case "P":
                                    contenido.push("<td>POR AUTORIZAR</td>");
                                    break;
                            }
                        }
                        else {
                            switch (j) {
                                case 2:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                case 3:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                case 5:
                                    contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "C" ? "Cantidad" : "Monto") + "</td>");

                                    break;
                                case 7:
                                    contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje")) + "</td>");
                                    break;
                                default:
                                    contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                    break;
                            }

                        }
                    }
                    contenido.push("</tr>");
                    break;
                case "4":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j == (nCampos - 1)) {
                            switch (window["matriz" + identificador[0]][i][j]) {
                                case "A":
                                    contenido.push("<td>ACTIVO</td>");
                                    break;
                                case "I":
                                    contenido.push("<td>INACTIVO</td>");
                                    break;
                                case "P":
                                    contenido.push("<td>POR AUTORIZAR</td>");
                                    break;
                            }
                        }
                        else {
                            switch (j) {
                                case 4:
                                    switch (window["matriz" + identificador[0]][i][j]) {
                                        case "Q":
                                            contenido.push("<td>Quincenal</td>");
                                            break;
                                        case "M":
                                            contenido.push("<td>Mensual</td>");
                                            break;
                                        case "B":
                                            contenido.push("<td>Bimensual</td>");
                                            break;
                                        case "T":
                                            contenido.push("<td>Trimestral</td>");
                                            break;
                                        case "S":
                                            contenido.push("<td>Semestral</td>");
                                            break;
                                        case "A":
                                            contenido.push("<td>Anual</td>");
                                            break;
                                    }
                                    break;
                                case 5:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                case 6:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                default:
                                    contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                    break;
                            }

                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "5":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "D" ? "Dia" : "Feriado") + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "6":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "D" ? "Dia" : "Feriado") + "</td>");
                                        break;
                                    case 7:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje") + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "7":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "T" ? "Turno" : "Hora") + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "8":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 2) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 4:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 6:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje") + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "9":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j != 7) {
                            if (j == (nCampos - 1)) {
                                switch (window["matriz" + identificador[0]][i][j]) {
                                    case "A":
                                        contenido.push("<td>ACTIVO</td>");
                                        break;
                                    case "I":
                                        contenido.push("<td>INACTIVO</td>");
                                        break;
                                    case "P":
                                        contenido.push("<td>POR AUTORIZAR</td>");
                                        break;
                                }
                            }
                            else {
                                switch (j) {
                                    case 2:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 3:
                                        contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                        break;
                                    case 5:
                                        contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje")) + "</td>");
                                        break;
                                    default:
                                        contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                        break;
                                }

                            }
                        }

                    }
                    contenido.push("</tr>");
                    break;
                case "10":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos; j++) {
                        if (j == (nCampos - 1)) {
                            switch (window["matriz" + identificador[0]][i][j]) {
                                case "A":
                                    contenido.push("<td>ACTIVO</td>");
                                    break;
                                case "I":
                                    contenido.push("<td>INACTIVO</td>");
                                    break;
                                case "P":
                                    contenido.push("<td>POR AUTORIZAR</td>");
                                    break;
                            }
                        }
                        else {
                            switch (j) {
                                case 2:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                case 3:
                                    contenido.push("<td>" + formatearfecha(window["matriz" + identificador[0]][i][j]) + "</td>");
                                    break;
                                case 5:
                                    contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "F" ? "Factor" : (window["matriz" + identificador[0]][i][j] == "M" ? "Monto Fijo" : "Porcentaje")) + "</td>");
                                    break;
                                default:
                                    contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                    break;
                            }

                        }
                    }
                    contenido.push("</tr>");
                    break;

                case "11":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos - 2; j++) {

                        switch (j) {
                            case 1:
                                for (var l = 0, ll = listaEspecialidad.length; l < ll; l++) {
                                    reg = listaEspecialidad[l].split("¦");
                                    if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                        contenido.push("<td>" + reg[1] + "</td>");
                                        break;
                                    }
                                }

                                break;
                            case 2:
                                var exito = false;
                                for (var l = 0, ll = lstAdmisionProv.length; l < ll; l++) {
                                    reg = lstAdmisionProv[l].split("¦");
                                    if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                        contenido.push("<td>" + reg[1] + "</td>");
                                        exito = true;
                                        break;
                                    }
                                }
                                if (!exito) {
                                    contenido.push("<td>todos</td>");
                                }
                                break;
                            case 3:
                                contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "J" ? "Jurídica" : (window["matriz" + identificador[0]][i][j] == "N" ? "Natural" : "Todos")) + "</td>");
                                break;
                            case 4:
                                contenido.push("<td>" + window["matriz" + identificador[0]][i][(nCampos - 2)] + "</td>");
                                break;
                            case 5:
                                for (var l = 0, ll = listaTiempoPago.length; l < ll; l++) {
                                    reg = listaTiempoPago[l].split("¦");
                                    if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                        contenido.push("<td>" + reg[1] + "</td>");
                                        break;
                                    }
                                }
                                break;
                            case 6:
                                for (var l = 0, ll = lstTipoDocPago.length; l < ll; l++) {
                                    reg = lstTipoDocPago[l].split("¦");
                                    if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                        contenido.push("<td>" + reg[1] + "</td>");
                                        break;
                                    }
                                }
                                break;
                            case 7:
                                for (var l = 0, ll = lstTipoServicioImpuesto.length; l < ll; l++) {
                                    reg = lstTipoServicioImpuesto[l].split("¦");
                                    if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                        contenido.push("<td>" + reg[1] + "</td>");
                                        break;
                                    }
                                }
                                break;
                            case 8:
                                contenido.push("<td>" + (window["matriz" + identificador[0]][i][j] == "A" ? "ACTIVO" : "INACTIVO") + "</td>");
                                break;
                        }
                    }
                    contenido.push("</tr>");
                    break;
                case "12":
                    contenido.push("<tr>");
                    for (var j = 1; j < nCampos - 1; j++) {

                        if (j == (nCampos - 2)) {
                            switch (window["matriz" + identificador[0]][i][j]) {
                                case "A":
                                    contenido.push("<td>ACTIVO</td>");
                                    break;
                                case "I":
                                    contenido.push("<td>INACTIVO</td>");
                                    break;

                            }
                        }
                        else {
                            switch (j) {
                                case 3:
                                    let existe = false;
                                    for (var l = 0, ll = listaTipoDescuento.length; l < ll; l++) {
                                        reg = listaTipoDescuento[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido.push("<td>" + reg[1] + "</td>");
                                            existe = true;
                                            break;
                                        }
                                    }
                                    if (!existe) {
                                        contenido.push("<td></td>");
                                    }
                                    break;
                                case 4:
                                    for (var l = 0, ll = listaTipoMonto.length; l < ll; l++) {
                                        reg = listaTipoMonto[l].split("¦");
                                        if (reg[0] == window["matriz" + identificador[0]][i][j]) {
                                            contenido.push("<td>" + reg[1] + "</td>");
                                            break;
                                        }
                                    }
                                    break;

                                default:
                                    contenido.push("<td>" + window["matriz" + identificador[0]][i][j] + "</td>");
                                    break;
                            }

                        }

                    }
                    contenido.push("</tr>");
                    break;

            }
        }
        excelExportar += contenido.join("") + "</table></html>";
        var formBlob = new Blob([excelExportar], { type: 'application/vnd.ms-excel' });
        objeto.download = identificador[0] + ".xls";
        objeto.href = window.URL.createObjectURL(formBlob);
    }
}

function limpiarCabeceras() {
    var A = document.getElementsByName("cabeceraProduccionFijoConfiguracion");
    var B = document.getElementsByName("cabeceraProduccionFijoBonificacion");
    var C = document.getElementsByName("cabeceraProduccionEscalonada");
    var D = document.getElementsByName("cabeceraContratoFijo");
    var E = document.getElementsByName("cabeceraHorarioCalculo");
    var F = document.getElementsByName("cabeceraHorarioBonificacion");
    var G = document.getElementsByName("cabeceraTurnoCalculo");
    var H = document.getElementsByName("cabeceraTurnoBonificacion");
    var I = document.getElementsByName("cabeceraCompartido");
    var J = document.getElementsByName("cabeceraVacuna");
    var encontrado = true;

    for (var y = 0; y < A.length; y++) {
        if (A[y].nodeName == "SELECT") {
            if (A[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("ProduccionFijoConfiguracion|1", false);
                break;
            }
        }
        else {
            if (A[y].value != "") {
                encontrado = false;
                filtrar("ProduccionFijoConfiguracion|1", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < A.length; y++) {
            if (A[y].type == "checkbox") {
                A[y].checked = false;
            } else {
                if (A[y].nodeName == "SELECT") {
                    A[y].selectedIndex = "0";
                }
                else {
                    A[y].value = "";
                }
            }
        }
    }
    encontrado = true;

    for (var y = 0; y < B.length; y++) {
        if (B[y].nodeName == "SELECT") {
            if (B[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("ProduccionFijoBonificacion|2", false);
                break;
            }
        }
        else {
            if (B[y].value != "") {
                encontrado = false;
                filtrar("ProduccionFijoBonificacion|2", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < B.length; y++) {
            if (B[y].type == "checkbox") {
                B[y].checked = false;
            } else {
                if (B[y].nodeName == "SELECT") {
                    B[y].selectedIndex = "0";
                }
                else {
                    B[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < C.length; y++) {
        if (C[y].nodeName == "SELECT") {
            if (C[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("ProduccionEscalonada|3", false);
                break;
            }
        }
        else {
            if (C[y].value != "") {
                encontrado = false;
                filtrar("ProduccionEscalonada|3", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < C.length; y++) {
            if (C[y].type == "checkbox") {
                C[y].checked = false;
            } else {
                if (C[y].nodeName == "SELECT") {
                    C[y].selectedIndex = "0";
                }
                else {
                    C[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < D.length; y++) {
        if (D[y].nodeName == "SELECT") {
            if (D[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("ContratoFijo|4", false);
                break;
            }
        }
        else {
            if (D[y].value != "") {
                encontrado = false;
                filtrar("ContratoFijo|4", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < D.length; y++) {
            if (D[y].type == "checkbox") {
                D[y].checked = false;
            } else {
                if (D[y].nodeName == "SELECT") {
                    D[y].selectedIndex = "0";
                }
                else {
                    D[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < E.length; y++) {
        if (E[y].nodeName == "SELECT") {
            if (E[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("HorarioCalculo|5", false);
                break;
            }
        }
        else {
            if (E[y].value != "") {
                encontrado = false;
                filtrar("HorarioCalculo|5", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < E.length; y++) {
            if (E[y].type == "checkbox") {
                E[y].checked = false;
            } else {
                if (E[y].nodeName == "SELECT") {
                    E[y].selectedIndex = "0";
                }
                else {
                    E[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < F.length; y++) {
        if (F[y].nodeName == "SELECT") {
            if (F[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("HorarioBonificacion|6", false);
                break;
            }
        }
        else {
            if (F[y].value != "") {
                encontrado = false;
                filtrar("HorarioBonificacion|6", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < F.length; y++) {
            if (F[y].type == "checkbox") {
                F[y].checked = false;
            } else {
                if (F[y].nodeName == "SELECT") {
                    F[y].selectedIndex = "0";
                }
                else {
                    F[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < G.length; y++) {
        if (G[y].nodeName == "SELECT") {
            if (G[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("TurnoCalculo|7", false);
                break;
            }
        }
        else {
            if (G[y].value != "") {
                encontrado = false;
                filtrar("TurnoCalculo|7", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < G.length; y++) {
            if (G[y].type == "checkbox") {
                G[y].checked = false;
            } else {
                if (G[y].nodeName == "SELECT") {
                    G[y].selectedIndex = "0";
                }
                else {
                    G[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < H.length; y++) {
        if (H[y].nodeName == "SELECT") {
            if (H[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("TurnoBonificacion|8", false);
                break;
            }
        }
        else {
            if (H[y].value != "") {
                encontrado = false;
                filtrar("TurnoBonificacion|8", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < I.length; y++) {
            if (H[y].type == "checkbox") {
                H[y].checked = false;
            } else {
                if (H[y].nodeName == "SELECT") {
                    H[y].selectedIndex = "0";
                }
                else {
                    H[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < D.length; y++) {
        if (I[y].nodeName == "SELECT") {
            if (I[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("Compartido|9", false);
                break;
            }
        }
        else {
            if (I[y].value != "") {
                encontrado = false;
                filtrar("Compartido|9", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < I.length; y++) {
            if (I[y].type == "checkbox") {
                I[y].checked = false;
            } else {
                if (I[y].nodeName == "SELECT") {
                    I[y].selectedIndex = "0";
                }
                else {
                    I[y].value = "";
                }
            }
        }
    }

    for (var y = 0; y < D.length; y++) {
        if (J[y].nodeName == "SELECT") {
            if (J[y].selectedIndex != "0") {
                encontrado = false;
                filtrar("Vacuna|10", false);
                break;
            }
        }
        else {
            if (J[y].value != "") {
                encontrado = false;
                filtrar("Vacuna|10", false);
                break;
            }
        }
    }
    if (encontrado) {
        for (var y = 0; y < J.length; y++) {
            if (J[y].type == "checkbox") {
                J[y].checked = false;
            } else {
                if (J[y].nodeName == "SELECT") {
                    J[y].selectedIndex = "0";
                }
                else {
                    J[y].value = "";
                }
            }
        }
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

function listarProveedor(r) {
    if (r != "") {
        listaProveedor = r.split("¬");
        matrizProveedor = [];
        crearMatriz("Proveedor|11");
        paginar(indiceActualPaginaProveedor, "Proveedor|11");
        configurarEditarProveedor();
    } else {
        listaProveedor = [];
        crearMatriz("Proveedor|11");
        paginar(indiceActualPaginaProveedor, "Proveedor|11");

    }
}

function configurarEditarProveedor() {
    var prov = document.getElementsByClassName("prov"),
        n = prov.length, spn;
    for (var i = 0; i < n; i++) {
        spn = prov[i];
        spn.onclick = function () {
            limpiarProveedor();
            var pos = this.getAttribute("data-pos") * 1;
            var reg = matrizProveedor[pos];
            var hdfListaPresta = document.getElementById("hdfListaPresta");
            hdfListaPresta.value = reg[17];
            var doc = document,
                ddlEspecialidadP = doc.getElementById("ddlEspecialidadP"),
                txtProveedorInicio = doc.getElementById("txtProveedorFechaInicio"),
                txtProveedorFin = doc.getElementById("txtProveedorFechaFin"),
                ddlTadmisionP = doc.getElementById("ddlTadmisionP"),
                ddlTPersonaP = doc.getElementById("ddlTPersonaP"),
                txtEmpresaP = doc.getElementById("txtEmpresaP"),
                ddlDiaPagoP = doc.getElementById("ddlDiaPagoP"),
                ddlDocPagoP = doc.getElementById("ddlDocPagoP"),
                ddlTipoImpuestoP = doc.getElementById("ddlTipoImpuestoP"),
                ddTipoPrestaciones = doc.getElementById("ddTipoPrestaciones"),
                txtEstadoP = doc.getElementById("txtEstadoP"),
                hdfEmpresaP = doc.getElementById("hdfEmpresaP"),
                hdfProveedorId = doc.getElementById("hdfProveedorId"),
                txtRucP = doc.getElementById("txtRucP"),
                ddTipoPersonaP = doc.getElementById("ddTipoPersonaP"),
                txtCorreoElectronicoP = doc.getElementById("txtCorreoElectronicoP"),
                TituloPopupProveedor = doc.getElementById("TituloPopupProveedor"),
                PProveedorHistorial = doc.getElementById("PProveedorHistorial"),
                IcoIProveedor = doc.getElementById("IcoIProveedor");
            PProveedorHistorial.style.display = "";

            TituloPopupProveedor.innerHTML = "EDITAR PROVEEDOR";
            document.getElementById("hdfCd").value = reg[0];

            ddlEspecialidadP.value = reg[1] == 0 ? "" : reg[1];
            txtProveedorInicio.value = reg[2];
            txtProveedorFin.value = reg[3];
            ddlTadmisionP.value = reg[4] == 0 ? "" : reg[4];
            ddlTPersonaP.value = reg[5];
            var spnEmpresaBusquedaP = document.getElementById("spnEmpresaBusquedaP");
            if (ddlTPersonaP.value == "N" || ddlTPersonaP.value == "") {
                spnEmpresaBusquedaP.style.display = "none";
            }
            else {
                spnEmpresaBusquedaP.style.display = "";
            }
            txtEmpresaP.value = reg[11];
            txtRucP.value = reg[12];
            ddlDiaPagoP.value = reg[7] == 0 ? "" : reg[7];
            ddlDocPagoP.value = reg[8];
            ddlTipoImpuestoP.value = reg[9];
            txtEstadoP.value = reg[10] == "A" ? "ACTIVO" : "INACTIVO";
            hdfEmpresaP.value = reg[6];
            hdfProveedorId.value = reg[0];
            ddTipoPersonaP.value = reg[14];
            txtCorreoElectronicoP.value = reg[13];
            txtCorreoAlternoP.value = reg[15];
            ddTipoPrestaciones.value = reg[16];
            if (ddTipoPrestaciones.value != 0) {
                IcoIProveedor.style.display = "";
            }
            else {
                IcoIProveedor.style.display = "none";
                ddTipoPrestaciones.value = "T";
            }
            abrirPopup("PopupProveedor");
        }
    }
}

function limpiarProveedor() {
    if (HayArchivos) {
        mensajeValidacion = [];
        var validar = document.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].className.indexOf("error") > -1) {
                validar[x].className = validar[x].className.split("error").join("").trim();
            }
        }
        var doc = document,
            txtDoctorFechaInicio = document.getElementById("txtDoctorFechaInicio").value,
            txtDoctorFechaFin = document.getElementById("txtDoctorFechaFin").value,
            //------------------------------------------------------------------------------
            ddlEspecialidadP = doc.getElementById("ddlEspecialidadP"),
            txtProveedorInicio = doc.getElementById("txtProveedorFechaInicio"),
            txtProveedorFin = doc.getElementById("txtProveedorFechaFin"),
            ddlTadmisionP = doc.getElementById("ddlTadmisionP"),
            ddlTPersonaP = doc.getElementById("ddlTPersonaP"),
            txtEmpresaP = doc.getElementById("txtEmpresaP"),
            ddlDiaPagoP = doc.getElementById("ddlDiaPagoP"),
            ddlDocPagoP = doc.getElementById("ddlDocPagoP"),
            ddlTipoImpuestoP = doc.getElementById("ddlTipoImpuestoP"),
            txtEstadoP = doc.getElementById("txtEstadoP"),
            hdfEmpresaP = doc.getElementById("hdfEmpresaP"),
            hdfProveedorId = doc.getElementById("hdfProveedorId"),
            TituloPopupProveedor = doc.getElementById("TituloPopupProveedor"),
            PProveedorHistorial = doc.getElementById("PProveedorHistorial"),
            txtRucP = doc.getElementById("txtRucP");
        ddTipoPersonaP = doc.getElementById("ddTipoPersonaP");
        ddTipoPrestaciones = doc.getElementById("ddTipoPrestaciones");
        IcoIProveedor = doc.getElementById("IcoIProveedor");
        txtCorreoElectronicoP = doc.getElementById("txtCorreoElectronicoP");
        txtCorreoAlternoP = doc.getElementById("txtCorreoAlternoP");
        TituloPopupProveedor.innerHTML = "AGREGAR PROVEEDOR";
        txtEmpresaP.className = txtEmpresaP.className.split("error").join(" ");
        PProveedorHistorial.style.display = "none";
        var spnEmpresaBusquedaP = document.getElementById("spnEmpresaBusquedaP");
        ddlEspecialidadP.value = "";
        txtProveedorInicio.value = txtDoctorFechaInicio;
        txtProveedorFin.value = txtDoctorFechaFin;
        ddlTadmisionP.value = "";
        ddlTPersonaP.value = "N";
        if (ddlTPersonaP.value == "N" || ddlTPersonaP.value == "") {
            spnEmpresaBusquedaP.style.display = "none";
            ddlDocPagoP.value = "RH";
            ddlDocPagoP.className = "validar";
            ddlDocPagoP.disabled = false;
            ddlTipoImpuestoP.selectedIndex = "1";
            ddlTipoImpuestoP.className = "validar";
            ddlTipoImpuestoP.disabled = false;
        }
        else {
            spnEmpresaBusquedaP.style.display = "";
            ddlDocPagoP.value = "FP";
            ddlDocPagoP.className = "lectura";
            ddlDocPagoP.disabled = true;
            ddlTipoImpuestoP.value = "IGV";
            ddlTipoImpuestoP.className = "lectura";
            ddlTipoImpuestoP.disabled = true;
        }
        document.getElementById("txtEmpresaP").value = "";
        document.getElementById("hdfEmpresaP").value = "";
        document.getElementById("txtRucP").value = "";
        txtEmpresaP.className = txtEmpresaP.className.split("error").join(" ");
        mensajeValidacion[txtEmpresaP.getAttribute("data-secuencia")] = "";


        txtEmpresaP.value = "";
        ddlDiaPagoP.value = "";
        txtEstadoP.value = "ACTIVO";
        hdfEmpresaP.value = "";
        hdfProveedorId.value = "";
        txtRucP.value = "";
        ddTipoPersonaP.value = listaCorreoProveedor[1];
        ddTipoPrestaciones.value = "";
        IcoIProveedor.style.display = "none";
        txtCorreoElectronicoP.value = listaCorreoProveedor[0];
        txtCorreoAlternoP.value = "";
    } else {
        mostraralerta("Adjuntar el contrato físico del médico en formato PDF para iniciar con las configuraciones");
    }
}

function mostrarGrabarProveedor(r) {
    if (r != "-1") {
        if (r == "A") {
            mostraralerta("Proveedor anulado");
        } else {
            var id = document.getElementById("hdfProveedorId").value;
            if (id == "") {
                mostraralerta("Proveedor registrado");
            } else {
                mostraralerta("Proveedor actualizado");
            }
        }
        var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
        var url = urlBase + "Configuracion/listasContratoProveedor/?ss=" + ss + "&id=" + txtDoctorCodigo;
        $.ajax(url, "get", listarProveedor);

    } else {
        mostraralerta("No se puede procesar la operación pues generaría duplicidad");
    }
}

function anularProveedor(id, est) {
    var url = urlBase + "Configuracion/anularProveedor/?ss=" + ss + "&id=" + id + "&est=" + (est == "A" ? "I" : "A");
    $.ajax(url, "get", mostrarGrabarProveedor);
    abrirPopup('PopupEstado');
}

function anularDescuento(id, est) {
    var url = urlBase + "Configuracion/anularContratoProduccionDescuento/?ss=" + ss + "&id=" + id + "&est=" + (est == "A" ? "I" : "A");
    $.ajax(url, "get", mostrarGrabarEstadoDescuento);
    abrirPopup('PopupEstado');
}

function mostrarGrabarEstadoDescuento(r) {
    if (r != "-1") {
        if (r == "A") {
            mostraralerta("Descuento anulado");
        }
        var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
        listarDescuentos(txtDoctorCodigo);

    } else {
        mostraralerta("No se pudo actualizar el estado");
    }
}


function buscarIndicador(id) {
    var n = listaConceptoMonto.length, ind = "False";
    if (n > 0) {
        var obj;
        for (var i = 0; i < n; i++) {
            obj = listaConceptoMonto[i].split("¦");
            if (obj[0] == id) {
                ind = obj[2];
                break;
            }
        }
    }
    return ind;
}

function limpiarEspacios(string) {
    var texto = string.trim().replace(/\s/g, "@").split("@");
    if (texto.length > 1) {
        var nuevaMatriz = [];
        for (var x = 0; x < texto.length; x++) {
            if (texto[x].trim() != "") {
                nuevaMatriz.push(texto[x]);
            }
        }
        return nuevaMatriz.join("_");
    } else {
        return texto[0];
    }
}

function mostrarAdjuntoMultiple(rpta) {
    if (rpta != "") {
        var opciones = rpta.split("¯");
        if (opciones[0] == arrayArchivos.length) {
            if (opciones[2] == "true") {
                mostraralerta("El archivo " + opciones[1] + " ya ha sido registrado, por favor volver a cargar la pantalla");
            }
            else {
                ArchivoAgrabarActuales.push(opciones[1]);
            }
            var ulAdjuntos = document.getElementById("ulAdjuntos");
            var clases = ulAdjuntos.getElementsByClassName("fa-refresh");
            for (var x = 0; x < clases.length; x++) {
                clases[x].style.display = "none";
            }
            var spnCargar = document.getElementById("spnCargar");
            spnCargar.style.display = "none";
            var url = "";
            var frm = new FormData();
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            frm.append("contratoId", (txtDoctorCodigo * 1));
            frm.append("ss", ss);
            frm.append("su", sucursalId);
            frm.append("files", arrayArchivos[0]);
            frm.append("opc", (DataArchivo == "" ? "1" : "2"));
            //var nombreCompleto = [];
            //var contador = 0;
            //if (arrayArchivosGrabAdj.length > 0) {
            //	for (var h = 0; h < arrayArchivosGrabAdj.length; h++) {
            //		nombreCompleto.push(limpiarEspacios(arrayArchivosGrabAdj[h]));
            //	}
            //} else {
            //	for (var h = 0; h < arrayArchivos.length; h++) {
            //		nombreCompleto.push(limpiarEspacios(arrayArchivos[h].name));
            //	}
            //}
            frm.append("nombre", ArchivoAgrabarActuales.join("¯"));
            frm.append("tot", arrayArchivos.length);
            frm.append("con", opciones[0] * 1);
            if (DataArchivo != "") {
                url = urlBase + "Configuracion/grabarAdjunto/";
                $.ajax(url, "post", mostrarGrabarDetalle, frm);
                abrirPopup('PopupAdjuntar');
            }
            else {
                url = urlBase + "Configuracion/grabarAdjunto/";
                $.ajax(url, "post", mostrarGrabarDetalle, frm);
                abrirPopup('PopupAdjuntar');
            }
        }
        else {
            if (opciones[2] == "true") {
                mostraralerta("El archivo " + opciones[1] + "ya ha sido grabado por otra persona");
            }
            else {
                ArchivoAgrabarActuales.push(opciones[1]);
            }
            var archivo = arrayArchivos[opciones[0] * 1];
            var spnCargar = document.getElementById("spnCargar");
            spnCargar.style.display = "none";
            var url = "";
            var frm = new FormData();
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
            frm.append("contratoId", (txtDoctorCodigo * 1));
            frm.append("ss", ss);
            frm.append("su", sucursalId);
            frm.append("file", archivo);
            frm.append("opc", (DataArchivo == "" ? "1" : "2"));
            frm.append("nombre", limpiarEspacios(archivo.name));
            frm.append("tot", arrayArchivos.length);
            frm.append("con", opciones[0] * 1);

            url = urlBase + "Configuracion/grabarAdjunto/";
            $.ajax(url, "post", mostrarAdjuntoMultiple, frm);
            var ulAdjuntos = document.getElementById("ulAdjuntos");
            var clases = ulAdjuntos.getElementsByClassName("fa-refresh");
            for (var x = 0; x < clases.length; x++) {
                if (clases[x].getAttribute("data-id") == rpta * 1) {
                    clases[x].style.display = "";
                }
                else {
                    clases[x].style.display = "none";
                }
            }

        }
    }
    else {
        mostraralerta("Ha ocurrido un error");
    }
}

//	if ((rpta * 1) == arrayArchivos.length) {
//		var ulAdjuntos = document.getElementById("ulAdjuntos");
//		var clases = ulAdjuntos.getElementsByClassName("fa-refresh");
//		for (var x = 0; x < clases.length; x++) {
//			clases[x].style.display = "none";
//		}
//		var spnCargar = document.getElementById("spnCargar");
//		spnCargar.style.display = "none";
//		var url = "";
//		var frm = new FormData();
//		var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
//		frm.append("contratoId", (txtDoctorCodigo * 1));
//		frm.append("ss", ss);
//		frm.append("su", sucursalId);
//		frm.append("files", arrayArchivos[0]);
//		frm.append("opc", (DataArchivo == "" ? "1" : "2"));
//		var nombreCompleto = [];
//		var contador = 0;
//		if (arrayArchivosGrabAdj.length > 0) {
//			for (var h = 0; h < arrayArchivosGrabAdj.length; h++) {
//				nombreCompleto.push(limpiarEspacios(arrayArchivosGrabAdj[h]));
//			}
//		} else {
//			for (var h = 0; h < arrayArchivos.length; h++) {
//				nombreCompleto.push(limpiarEspacios(arrayArchivos[h].name));
//			}
//		}
//		frm.append("nombre", nombreCompleto.join("¯"));
//		frm.append("tot", arrayArchivos.length);
//		frm.append("con", rpta * 1);
//		if (DataArchivo != "") {
//			url = urlBase + "Configuracion/grabarAdjunto/";
//			$.ajax(url, "post", mostrarGrabarDetalle, frm);
//			abrirPopup('PopupAdjuntar');
//		}
//		else {
//			url = urlBase + "Configuracion/grabarAdjunto/";
//			$.ajax(url, "post", mostrarGrabarDetalle, frm);
//			abrirPopup('PopupAdjuntar');
//		}
//	} else {
//		var archivo = arrayArchivos[rpta * 1];
//		var spnCargar = document.getElementById("spnCargar");
//		spnCargar.style.display = "none";
//		var url = "";
//		var frm = new FormData();
//		var txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
//		frm.append("contratoId", (txtDoctorCodigo * 1));
//		frm.append("ss", ss);
//		frm.append("su", sucursalId);
//		frm.append("file", archivo);
//		frm.append("opc", (DataArchivo == "" ? "1" : "2"));


//		var nombrefinal = "", nombreEnArray = [];
//		var contador = 0;
//		if (arrayArchivosGrab.length > 0) {
//			var contador = 0;
//			for (var h = 0; h < arrayArchivosGrab.length; h++) {
//				if (limpiarEspacios(arrayArchivosGrab[h]) === limpiarEspacios(archivo.name)) {
//					contador = contador + 1;
//				}
//				if (contador != 0) {
//					nombrefinal = limpiarEspacios(arrayArchivosGrab[h]).split(".");
//					for (var u = 0; u < nombrefinal.length; u++) {
//						if (u != (nombrefinal.length - 1)) {
//							nombreEnArray.push(nombrefinal[u]);
//						}
//					}
//					var datoPrin = nombreEnArray.join("") + "_" + (makeid()) + "." + nombrefinal[nombrefinal.length - 1];
//					frm.append("nombre", datoPrin);
//					arrayArchivosGrabAdj.push(datoPrin);
//					for (var y = 0; y < arrayArchivosGrab.length; y++) {
//						arrayArchivosGrabAdj.push(arrayArchivosGrab[y]);
//					}
//					break;
//				}
//				contador = 0;
//			}
//			if (contador == 0) {
//				frm.append("nombre", limpiarEspacios(archivo.name));
//				arrayArchivosGrabAdj.push(limpiarEspacios(archivo.name));
//			}
//		} else {
//			arrayArchivosGrabAdj.push(limpiarEspacios(archivo.name));
//			frm.append("nombre", limpiarEspacios(archivo.name));
//		}

//		frm.append("tot", arrayArchivos.length);
//		frm.append("con", rpta * 1);

//		url = urlBase + "Configuracion/grabarAdjunto/";
//		$.ajax(url, "post", mostrarAdjuntoMultiple, frm);
//		var ulAdjuntos = document.getElementById("ulAdjuntos");
//		var clases = ulAdjuntos.getElementsByClassName("fa-refresh");
//		for (var x = 0; x < clases.length; x++) {
//			if (clases[x].getAttribute("data-id") == rpta * 1) {
//				clases[x].style.display = "";
//			}
//			else {
//				clases[x].style.display = "none";
//			}
//		}
//	}
//}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function limpiarCabecerasDetalle() {
    var nRegistros = 0;
    var cabeceraProduccionFijoConfiguracion = document.getElementsByName("cabeceraProduccionFijoConfiguracion");
    nRegistros = cabeceraProduccionFijoConfiguracion.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraProduccionFijoConfiguracion[y].nodeName == "SELECT") {
            cabeceraProduccionFijoConfiguracion[y].selectedIndex = "0";
        }
        else {
            cabeceraProduccionFijoConfiguracion[y].value = "";
        }
    }

    var cabeceraProduccionFijoBonificacion = document.getElementsByName("cabeceraProduccionFijoBonificacion");
    nRegistros = cabeceraProduccionFijoBonificacion.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraProduccionFijoBonificacion[y].nodeName == "SELECT") {
            cabeceraProduccionFijoBonificacion[y].selectedIndex = "0";
        }
        else {
            cabeceraProduccionFijoBonificacion[y].value = "";
        }
    }

    var cabeceraProduccionEscalonada = document.getElementsByName("cabeceraProduccionEscalonada");
    nRegistros = cabeceraProduccionEscalonada.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraProduccionEscalonada[y].nodeName == "SELECT") {
            cabeceraProduccionEscalonada[y].selectedIndex = "0";
        }
        else {
            cabeceraProduccionEscalonada[y].value = "";
        }
    }

    var cabeceraContratoFijo = document.getElementsByName("cabeceraContratoFijo");
    nRegistros = cabeceraContratoFijo.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraContratoFijo[y].nodeName == "SELECT") {
            cabeceraContratoFijo[y].selectedIndex = "0";
        }
        else {
            cabeceraContratoFijo[y].value = "";
        }
    }

    var cabeceraHorarioCalculo = document.getElementsByName("cabeceraHorarioCalculo");
    nRegistros = cabeceraHorarioCalculo.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraHorarioCalculo[y].nodeName == "SELECT") {
            cabeceraHorarioCalculo[y].selectedIndex = "0";
        }
        else {
            cabeceraHorarioCalculo[y].value = "";
        }
    }

    var cabeceraHorarioBonificacion = document.getElementsByName("cabeceraHorarioBonificacion");
    nRegistros = cabeceraHorarioBonificacion.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraHorarioBonificacion[y].nodeName == "SELECT") {
            cabeceraHorarioBonificacion[y].selectedIndex = "0";
        }
        else {
            cabeceraHorarioBonificacion[y].value = "";
        }
    }

    var cabeceraTurnoCalculo = document.getElementsByName("cabeceraTurnoCalculo");
    nRegistros = cabeceraTurnoCalculo.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraTurnoCalculo[y].nodeName == "SELECT") {
            cabeceraTurnoCalculo[y].selectedIndex = "0";
        }
        else {
            cabeceraTurnoCalculo[y].value = "";
        }
    }

    var cabeceraTurnoBonificacion = document.getElementsByName("cabeceraTurnoBonificacion");
    nRegistros = cabeceraTurnoBonificacion.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraTurnoBonificacion[y].nodeName == "SELECT") {
            cabeceraTurnoBonificacion[y].selectedIndex = "0";
        }
        else {
            cabeceraTurnoBonificacion[y].value = "";
        }
    }


    var cabeceraCompartido = document.getElementsByName("cabeceraCompartido");
    nRegistros = cabeceraCompartido.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraCompartido[y].nodeName == "SELECT") {
            cabeceraCompartido[y].selectedIndex = "0";
        }
        else {
            cabeceraCompartido[y].value = "";
        }
    }

    var cabeceraVacuna = document.getElementsByName("cabeceraVacuna");
    nRegistros = cabeceraVacuna.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraVacuna[y].nodeName == "SELECT") {
            cabeceraVacuna[y].selectedIndex = "0";
        }
        else {
            cabeceraVacuna[y].value = "";
        }
    }

    var cabeceraProveedor = document.getElementsByName("cabeceraProveedor");
    nRegistros = cabeceraProveedor.length;
    for (var y = 0; y < nRegistros; y++) {
        if (cabeceraProveedor[y].nodeName == "SELECT") {
            cabeceraProveedor[y].selectedIndex = "0";
        }
        else {
            cabeceraProveedor[y].value = "";
        }
    }
    filtrar("ProduccionFijoConfiguracion|1");
    filtrar("ProduccionFijoBonificacion|2");
    filtrar("ProduccionEscalonada|3");
    filtrar("ContratoFijo|4");
    filtrar("HorarioCalculo|5");
    filtrar("HorarioBonificacion|6");
    filtrar("TurnoCalculo|7");
    filtrar("TurnoBonificacion|8");
    filtrar("Compartido|9");
    filtrar("Vacuna|10");
    filtrar("Proveedor|11");
}

function EliminarArchivoTemporal(objeto) {
    var id = objeto.getAttribute("data-id") * 1;
    arrayArchivos.splice(id, 1);
    var ulAdjuntos = document.getElementById("ulAdjuntos");
    var contenido = "";
    for (var x = 0; x < arrayArchivos.length; x++) {
        contenido += "<li style='padding:4px 0'>" + arrayArchivos[x].name + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
        contenido += x;
        contenido += " onclick='EliminarArchivoTemporal(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
        contenido += arrayArchivos.length;
        contenido += "></span></li>";
    }
    ulAdjuntos.innerHTML = contenido;
}
function EliminarArchivoTemporalcf(objeto) {
    var id = objeto.getAttribute("data-id");
    var n = arrayArchivoscf.length;
    if (id.substring(0, 1) == "f") {
        for (var i = 0; i < n; i++) {
            if (arrayArchivoscf[i].id == id) {
                arrayArchivoscf.splice(i, 1);
                break;
            }
        }
    } else {
        for (var i = 0; i < n; i++) {
            if (arrayArchivoscf[i].id == id) {
                arrayArchivoscf[i].estado = "I";
                break;
            }
        }
    }
    var ulAdjuntoscf = document.getElementById("ulAdjuntoscf");
    var contenido = "";
    for (var x = 0; x < arrayArchivoscf.length; x++) {
        if (arrayArchivoscf[x].estado == "A") {
            contenido += "<li style='padding:4px 0'>" + arrayArchivoscf[x].name + "&nbsp;&nbsp;<span class='Icons fa-times' style='cursor:pointer' data-id=";
            contenido += arrayArchivoscf[x].id;
            contenido += " onclick='EliminarArchivoTemporalcf(this)' ></span>&nbsp;&nbsp;<span class='Icons fa-refresh cargando' style='display:none' data-id=";
            contenido += arrayArchivoscf[x].id;
            contenido += "></span></li>";
        }
    }
    ulAdjuntoscf.innerHTML = contenido;
}
/***/
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
                        for (j = 0; j < (nCampos - 1); j++) {
                            switch (j) {
                                case 6:
                                case 7:
                                    contenido += "<td style='text-align:right'>";
                                    break;
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
                                case 6:
                                case 7:
                                    contenido += "<td style='text-align:right'>";
                                    break;

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
            for (var i = inicio; i < fin; i += 1) {
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
            for (var i = inicio; i < fin; i += 1) {
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
    var n = MatrizWS.length, reg, ncampos, cntv = "", cnte = "", errxls = "", tmpxls = "", c = 0, v, msg = "", cv = 0, ce = 0, desc = "", fhora, esOtroFormato = false;
    var mtMonto = 0;
    if (n > 0) {
        for (var k = 0; k < n; k++) {
            reg = MatrizWS[k];
            ncampos = reg.length;
            tmpxls = "";
            msg = "";
            esOtroFormato = false;
            for (var j = 0; j < 8; j++) {
                if (j == 4 && reg[j].indexOf(":") > -1) {
                    esOtroFormato = true;
                    fhora = reg[j].split(" ");
                    reg[j] = fhora[0];
                }
                tmpxls += reg[j] + "¦";
                switch (j) {
                    case 1:
                        if (isNaN(reg[j])) {
                            msg += "IdOrdenAtencion número inválido-";
                        }
                        break;
                    case 2:
                        if (isNaN(reg[j])) {
                            msg += "Línea número inválido-";
                        }
                        break;
                    case 6:
                        if (isNaN(reg[j])) {
                            msg += "Cantidad número inválido-";
                        }
                        break;
                    case 7:
                        if (isNaN(reg[j])) {
                            msg += "Monto número inválido-";
                        } else {
                            mtMonto += (reg[j]) * 1;
                        }
                        break;
                    case 4:

                        if (!esFecha(reg[j]) && !esOtroFormato) {
                            msg += "Fecha Atención inválido-";
                        } else if (!esFecha(reg[j]) && esOtroFormato) {
                            msg += "Fecha Atención formato inválido-";
                        }
                        break;
                }
            }
            if (msg != "") {
                errxls += tmpxls + msg + "¬";
            } else {
                tmpxls = tmpxls.substring(0, tmpxls.length - 1);
                xlsData += tmpxls + "¬";
            }

        }
    }
    xlsData = xlsData.substring(0, xlsData.length - 1);
    errxls = errxls.substring(0, errxls.length - 1);

    return xlsData + "¯" + errxls + "¯" + mtMonto;
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

function formatearNumero(valor) {
    var valorFrm;
    if (!isNaN(valor)) {
        var frmMoneda = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
        valorFrm = valor.toLocaleString("en-US", frmMoneda);
    } else {
        valorFrm = "0.00";
    }
    return valorFrm
}

function asignarIdAutRec(id, opcion) {
    var btnDetAutorizar = document.getElementById("btnDetAutorizar");
    if (btnDetAutorizar != null) {
        btnDetAutorizar.setAttribute("data-id", id);
    }
    var btnDetRechazar = document.getElementById("btnDetRechazar");
    if (btnDetRechazar != null) {
        btnDetRechazar.setAttribute("data-id", id);
    }
    if (opcion != undefined) {
        document.getElementById("divDescTituAutRecCab").style.display = "none";
    } else {
        document.getElementById("divDescTituAutRecCab").style.display = "";
    }
    document.getElementById("divTablaDetAutRec").style.display = "none";
    var url = urlBase + "Configuracion/listarAutDetalleConfiguracionPago?ss=" + ss + "&id=" + id + "&opcion=" + (opcion ? 1 : 2);
    $.ajax(url, "get", mostrarDetalleAutRec);
}

function mostrarDetalleAutRec(rpta) {
    if (rpta == "") {
        document.getElementById("divTablaDetAutRec").style.display = "none";
    } else {
        var contenido = "";
        var datos = rpta.split("¬");
        var data;
        for (var x = 0; x < datos.length; x++) {
            data = datos[x].split("¦");
            contenido += "<tr>";
            for (var y = 0; y < data.length; y++) {
                contenido += "<td>";
                contenido += data[y];
                contenido += "</td>";
            }
            contenido += "</tr>";
        }
        document.getElementById("tbDetAutRec").innerHTML = contenido;
        document.getElementById("divTablaDetAutRec").style.display = "";
    }
    var btnDoctorAutorizar = document.getElementById("btnDoctorAutorizar");
    var btnDoctorRechazar = document.getElementById("btnDoctorRechazar");
    var btnDetAutorizar = document.getElementById("btnDetAutorizar");
    var btnDetRechazar = document.getElementById("btnDetRechazar");
    if (btnDoctorAutorizar != null && btnDoctorRechazar != null) {
        btnDetAutorizar.style.display = "";
        btnDetRechazar.style.display = "";
    } else if (btnDoctorAutorizar != null && btnDoctorRechazar == null) {
        btnDetAutorizar.style.display = "";
        btnDetRechazar.style.display = "none";
    } else if (btnDoctorAutorizar == null && btnDoctorRechazar != null) {
        btnDetAutorizar.style.display = "none";
        btnDetRechazar.style.display = "";
    } else {
        btnDetAutorizar.style.display = "none";
        btnDetRechazar.style.display = "none";
    }
}

function mostrarAutRec(cabecera, opcion, id) {
    var btngrabarAutRec = document.getElementById("btngrabarAutRec");
    btngrabarAutRec.setAttribute("data-id", id);
    if (cabecera) {
        if (opcion) {
            btngrabarAutRec.setAttribute("data-opc", 1);
            btngrabarAutRec.setAttribute("data-cab", 1);
        } else {
            btngrabarAutRec.setAttribute("data-opc", 2);
            btngrabarAutRec.setAttribute("data-cab", 1);

        }
    } else {
        if (opcion) {
            btngrabarAutRec.setAttribute("data-opc", 1);
            btngrabarAutRec.setAttribute("data-cab", 2);
        } else {
            btngrabarAutRec.setAttribute("data-opc", 2);
            btngrabarAutRec.setAttribute("data-cab", 2);
        }
    }
    if (opcion) {
        document.getElementById("spnAutRecDescripcion").innerHTML = "¿Está seguro de <span style='font-weight:bold'>AUTORIZAR</span> los cambios del Contrato?";
    } else {
        document.getElementById("spnAutRecDescripcion").innerHTML = "¿Está seguro de <span style='font-weight:bold'>RECHAZAR</span> los cambios del Contrato?";
    }
}

function mostrarAutorizarRechazarContrato(rpta) {
    var btngrabarAutRec = document.getElementById("btngrabarAutRec");
    btngrabarAutRec.innerHTML = "Aceptar";
    btngrabarAutRec.onclick = function () {
        var id = this.getAttribute("data-id");
        var opc = this.getAttribute("data-opc");
        var cab = this.getAttribute("data-cab");
        var url = urlBase + "Configuracion/AutorizarRechazarContrato?ss=" + ss + "&opc=" + opc + "&id=" + id + "&cab=" + cab;
        $.ajax(url, "get", mostrarAutorizarRechazarContrato);
        this.innerHTML = "<span class='Icons fa-refresh cargando'></span>";
        this.onclick = null;
    }
    if (rpta != "") {
        var datos = rpta.split("|");
        if (datos[0] == "0") {
            mostraralerta(datos[1]);
        } else {
            abrirPopup('PopupAutRec');
            abrirPopup('PopupDetalleAutRec');
            var hdfMedicoDet = document.getElementById("hdfMedicoDet");
            idMedico = "";
            mostraralerta(datos[1]);
            Buscar();
            limpiarFormulario(1);
            EscogerDetalle(false);
            mostrarDoctor(hdfMedicoDet.value);
            var txtDoctorCodigo = document.getElementById("txtDoctorCodigo");
            txtDoctorCodigo.value = hdfMedicoDet.value;
            limpiarCabeceras();
            url = urlBase + "Configuracion/listasMedicoContratoporId/?ss=" + ss + "&id=" + hdfMedicoDet.value + "&su=" + sucursalId + "&per=" + document.getElementById("hdfMedicoCod").value;
            $.ajax(url, "get", listarDoctor);
            if (datos[2] == "1") {
                var btnDoctorCancelar = document.getElementById("btnDoctorCancelar");
                btnDoctorCancelar.click();
            }

        }
    }
}
function fechas(elEvento, idFecha) {
    var evento = elEvento || window.event;
    if (evento.keyCode != 8) {
        var fecha = document.getElementById(idFecha);
        if (fecha.value.length == 2 || fecha.value.length == 5) {
            fecha.value += "/";
        }
    }
}

function mostrarGrabarDetalleDescuento(rpta) {

    AlmacenarClick = false;
    if (rpta.indexOf("ERROR") > -1) {
        mostraralerta("Error al grabar");
    } else {
        if (idContratoDetalle == 0) {
            mostraralerta("Se ha añadido un nuevo registro");
        } else {
            mostraralerta("Se ha actualizó un nuevo registro");
        }

        let txtDoctorCodigo = document.getElementById("txtDoctorCodigo").value;
        listarDescuentos(txtDoctorCodigo);

    }



}

function listarDescuentos(id) {

    url = urlBase + "Configuracion/listarContratoDescuento/?ss=" + ss + "&id=" + id;
    $.ajax(url, "get", responseListaDescuento);

}

function responseListaDescuento(r) {

    if (r != "") {
        listaProduccionFijoDescuento = r.split("¬");
        matrizProduccionFijoDescuento = [];

        crearMatriz("ProduccionFijoDescuento|12");
        paginar(indiceActualPaginaProduccionFijoDescuento, "ProduccionFijoDescuento|12");
        configurarEditarDescuento();
    } else {
        listaProduccionFijoDescuento = [];
        crearMatriz("ProduccionFijoDescuento|12");
        paginar(indiceActualPaginaProduccionFijoDescuento, "ProduccionFijoDescuento|12");

    }
}


function configurarEditarDescuento() {
    var prov = document.getElementsByClassName("js_descuento"),
        n = prov.length, spn;
    for (var i = 0; i < n; i++) {
        spn = prov[i];
        spn.onclick = function () {
            limpiarProductoFijoDescuento();
            var pos = this.getAttribute("data-pos") * 1;
            var reg = matrizProduccionFijoDescuento[pos];

            var doc = document,
                ddlPFDescuentoAplica = doc.getElementById("ddlPFDescuentoAplica"),
                ddlPFDescuentoDescuento = doc.getElementById("ddlPFDescuentoDescuento"),
                ddlPFDescuentoTipoDescuento = doc.getElementById("ddlPFDescuentoTipoDescuento"),
                ddlPFDescuentoTipoMonto = doc.getElementById("ddlPFDescuentoTipoMonto"),
                txtPFDescuentoImporte = doc.getElementById("txtPFDescuentoImporte"),
                txtPFDescuentoEstado = doc.getElementById("txtPFDescuentoEstado"),
                TituloPopupPFDescuento = doc.getElementById("TituloPopupPFDescuento"),
                PFDescuentoHistorial = document.getElementById("PFDescuentoHistorial");
            PFDescuentoHistorial.style.display = "";

            TituloPopupPFDescuento.innerHTML = "EDITAR DESCUENTO";
            document.getElementById("hdfCd").value = reg[0];
            idContratoDetalle = reg[0];
            ddlPFDescuentoDescuento.value = reg[7];
            llenarComboDescuento(listaDescuento, "ddlPFDescuentoDescuento", reg[7]);
            ddlPFDescuentoDescuento.onchange();
            ddlPFDescuentoTipoDescuento.value = reg[3];
            ddlPFDescuentoTipoMonto.value = reg[4] == 0 ? "" : reg[4];
            txtPFDescuentoImporte.value = reg[5];
            txtPFDescuentoEstado.value = reg[6] == "A" ? "ACTIVO" : "INACTIVO";
            ddlPFDescuentoAplica.value = reg[8];
            ddlPFDescuentoAplica.onchange();

            abrirPopup("PopupPFDescuento");
        }
    }
}

function limpiarProductoFijoDescuento() {
    if (HayArchivos) {
        mensajeValidacion = [];
        var validar = document.getElementsByClassName("validar");
        for (var x = 0; x < validar.length; x++) {
            if (validar[x].className.indexOf("error") > -1) {
                validar[x].className = validar[x].className.split("error").join("").trim();
            }
        }
        var doc = document,

            ddlPFDescuentoAplica = doc.getElementById("ddlPFDescuentoAplica"),
            ddlPFDescuentoDescuento = doc.getElementById("ddlPFDescuentoDescuento"),
            ddlPFDescuentoTipoDescuento = doc.getElementById("ddlPFDescuentoTipoDescuento"),
            ddlPFDescuentoTipoMonto = doc.getElementById("ddlPFDescuentoTipoMonto"),
            txtPFDescuentoImporte = doc.getElementById("txtPFDescuentoImporte"),
            txtPFDescuentoEstado = doc.getElementById("txtPFDescuentoEstado"),
            TituloPopupPFDescuento = doc.getElementById("TituloPopupPFDescuento");


        TituloPopupPFDescuento.innerHTML = "AGREGAR DESCUENTO";

        ddlPFDescuentoAplica.value = "";


        ddlPFDescuentoDescuento.value = "";
        ddlPFDescuentoTipoDescuento.value = "";
        txtPFDescuentoEstado.value = "ACTIVO";
        hdfEmpresaP.value = "";
        ddlPFDescuentoTipoMonto.value = "";
        txtPFDescuentoImporte.value = "";

    } else {
        mostraralerta("Adjuntar el contrato físico del médico en formato PDF para iniciar con las configuraciones");
    }
}