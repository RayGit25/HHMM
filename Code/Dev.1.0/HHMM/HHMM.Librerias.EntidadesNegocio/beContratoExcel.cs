using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beContratoExcel
	{
		public List<beContratoLista1Excel> Lista1 { get; set; }
		public List<beContratoLista2Excel> Lista2 { get; set; }
		public List<beContratoLista3Excel> Lista3 { get; set; }
	}

	public class beContratoLista1Excel
	{
		public string Orden { get; set; }
		public string SucursalId { get; set; }
		public string PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public string FechaInicio { get; set; }
		public string FechaFin { get; set; }
		public string Observacion { get; set; }
		public string EstadoRegistro { get; set; }
		public string Observaciones { get; set; }
	}

	public class beContratoLista2Excel
	{
		public int Hoja { get; set; }
		public string Orden { get; set; }
		public string SucursalId { get; set; }
		public string PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public string FechaInicio { get; set; }
		public string FechaFin { get; set; }
		public string TipoAtencionId { get; set; }
		public string TipoAdmisionId { get; set; }
		public string TipoPacienteId { get; set; }
		public string AseguradoraId { get; set; }
		public string EspecialidadId { get; set; }
		public string TurnoId { get; set; }
		public string TipoValor { get; set; }
		public string Valor1 { get; set; }
		public string Valor2 { get; set; }
		public string AlcancePrestacion { get; set; }
		public string AlcanceArticulo { get; set; }
		public string TiempoPagoId { get; set; }
		public string Descripcion { get; set; }
		public string Operador { get; set; }
		public string TipoDia { get; set; }
		public string TipoFeriado { get; set; }
		public string FechaFeriado { get; set; }
		public string IndicadorLunes { get; set; }
		public string IndicadorMartes { get; set; }
		public string IndicadorMiercoles { get; set; }
		public string IndicadorJueves { get; set; }
		public string IndicadorViernes { get; set; }
		public string IndicadorSabado { get; set; }
		public string IndicadorDomingo { get; set; }
		public string TipoRango { get; set; }
		public string Rango1 { get; set; }
		public string Rango2 { get; set; }
		public string ServicioId { get; set; }
		public string Aplicacion { get; set; }
		public string TipoCalculo { get; set; }
		public string Periodo { get; set; }
		public string CantidadAtencionMinima { get; set; }
		public string MontoAtencionMinima { get; set; }
		public string CantidadHora { get; set; }
		public string EstadoRegistro { get; set; }
		public string Observaciones { get; set; }
	}

	public class beContratoLista3Excel
	{
		public int Hoja { get; set; }
		public string Orden { get; set; }
		public string SucursalId { get; set; }
		public string PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public string ComponenteId { get; set; }
		public string EstadoRegistro { get; set; }
		public string Observaciones { get; set; }
	}
}
