using System;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class bePlanillaDetalleBonificacion
	{
		public string Medico{get;set;}
		public string Fecha{get;set;}
		public string HoraInicio{get;set;}
		public string HoraFin{get;set;}
		public decimal HorasProgramadas{get;set;}
		public string Dia{get;set;}
		public bool IndicadorFeriado{get;set;}
		public decimal ValorContrato{get;set;}
		public decimal Importe{get;set;}
		public decimal Bonificacion {get;set;}
		public decimal Total{get;set;}
		public string Especialidad{get;set;}
		public string TipoAtencion{get;set;}
		public string EstadoRegistro{get;set;}
		public int ProcesoMedicoHorarioId{get;set;}
	}
}
