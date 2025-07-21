using System;
using System.Collections.Generic;

namespace HHMM.Librerias.EntidadesNegocio
{
	public class beHorarioMedicoExcel
	{
		public List<beHorarioMedicoLista> Lista1 { get; set; }
		public List<beHorarioMedicoLista> Lista2 { get; set; }
	}

	public class beHorarioMedicoLista
	{
        public string Orden { get; set; }
		public string SucursalId { get; set; }
        public string PersonaId { get; set; }
		public string NombreCompleto { get; set; }
		public string TipoRegistroHorario { get; set; }
		public string NombreRegistroHorario { get; set; }
		public string FechaInicio { get; set; }
		public string FechaFin { get; set; }
		public string HoraInicio { get; set; }
		public string HoraFin { get; set; }
        public string EspecialidadId { get; set; }
		public string Especialidad { get; set; }
        public string ConsultorioId { get; set; }
		public string Consultorio { get; set; }
        public string TurnoId { get; set; }
		public string Turno { get; set; }
        public string TipoAtencionId { get; set; }
		public string TipoAtencion { get; set; }
		public string UnidadMedicaId{get;set;}
		public string UnidadMedica { get; set; }
		public string Observacion { get; set; }
        public string IndicadorLunes { get; set; }
        public string IndicadorMartes { get; set; }
        public string IndicadorMiercoles { get; set; }
        public string IndicadorJueves { get; set; }
        public string IndicadorViernes { get; set; }
        public string IndicadorSabado { get; set; }
        public string IndicadorDomingo { get; set; }
	}
}
