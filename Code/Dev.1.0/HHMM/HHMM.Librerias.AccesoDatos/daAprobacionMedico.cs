using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.AccesoDatos
{
	public class daAprobacionMedico
	{
		public beAprobacionMedicoListas listas(SqlConnection con, beFrHorarioMedicoConsulta obeFrHorarioMedicoConsulta)
		{
			beAprobacionMedicoListas obeAprobacionMedicoListas = new beAprobacionMedicoListas();
			 
			List<DateTime> listaFeriados=null;
			List<beHorarioMedicoConsulta> listaCalendario=null;
			List<beAprobacionMedico> listaTabla = null;

			SqlCommand cmd = new SqlCommand("uspAprobacionMedicoListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 240;

			cmd.Parameters.AddWithValue("@SucursalId", obeFrHorarioMedicoConsulta.Sucursal);
			cmd.Parameters.AddWithValue("@PersonaId", obeFrHorarioMedicoConsulta.Medico);
			cmd.Parameters.AddWithValue("@EmpresaId", obeFrHorarioMedicoConsulta.Empresa);
			cmd.Parameters.AddWithValue("@TurnoId", obeFrHorarioMedicoConsulta.Turno);
			cmd.Parameters.AddWithValue("@Mes", obeFrHorarioMedicoConsulta.Periodo);
			cmd.Parameters.AddWithValue("@Anio", obeFrHorarioMedicoConsulta.Anio);
			cmd.Parameters.AddWithValue("@UnidadMedicaId", obeFrHorarioMedicoConsulta.UnidadMedica);
			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{
				listaFeriados = new List<DateTime>();
				while (drd.Read())
				{
					listaFeriados.Add(drd.GetDateTime(0));
				}
				obeAprobacionMedicoListas.listaFeriado=listaFeriados;
				if (drd.NextResult())
				{
					listaCalendario = new List<beHorarioMedicoConsulta>();
					beHorarioMedicoConsulta obj = null;
					int posFecha = drd.GetOrdinal("Fecha");
					int posDia = drd.GetOrdinal("Dia");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
					int posPersona = drd.GetOrdinal("Medico");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posHorasAsignadas = drd.GetOrdinal("HorasAsignadas");
					while (drd.Read())
					{
						obj = new beHorarioMedicoConsulta();
						obj.Fecha = drd.GetDateTime(posFecha);
						obj.Dia = drd.GetInt32(posDia);
						obj.PersonaId = drd.GetInt32(posPersonaId);
						obj.ApellidoPaterno = drd.GetString(posApellidoPaterno);
						obj.Persona = drd.GetString(posPersona);
						obj.HoraInicio = drd.GetDateTime(posHoraInicio);
						obj.HoraFin = drd.GetDateTime(posHoraFin);
						obj.HorasAsignadas = drd.GetInt32(posHorasAsignadas);
						listaCalendario.Add(obj);
					}
					obeAprobacionMedicoListas.lista = listaCalendario;
				}
				if(drd.NextResult())
				{
					listaTabla = new List<beAprobacionMedico>();
					beAprobacionMedico obeTabla;
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posmedico = drd.GetOrdinal("Medico");
					int posHoras=drd.GetOrdinal("Horas");
					int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
					int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
					int posFechaHoraAprobacion = drd.GetOrdinal("FechaHoraAprobacion");

					while(drd.Read())
					{
						obeTabla = new beAprobacionMedico();
						obeTabla.PersonaId = drd.GetInt32(posPersonaId);
						obeTabla.Medico = drd.GetString(posmedico);
						obeTabla.Horas = drd.GetInt32(posHoras);
						obeTabla.EstadoRegistro = drd.GetString(posEstadoRegistro);
						obeTabla.CodigoUsuario = drd.GetString(posCodigoUsuario);
						obeTabla.FechaHoraAprobacion = drd.GetDateTime(posFechaHoraAprobacion);
						listaTabla.Add(obeTabla);
					}
				obeAprobacionMedicoListas.listaTabla=listaTabla;
				}
				drd.Close();
			}

			return (obeAprobacionMedicoListas);
		}

		public int grabarAprobacion(SqlConnection con,string listaMedicos,string sucursalId,int anio,int mes,int usuarioId)
		{
			int exito=-1;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioAprobar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			
			cmd.Parameters.AddWithValue("@ListaMedicos",listaMedicos);
			cmd.Parameters.AddWithValue("@SucursalId", sucursalId);
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.Parameters.AddWithValue("@Mes", mes);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);

			int n = cmd.ExecuteNonQuery();
			if(n>-1){
			exito=n;
			}
			return exito;
		}
	}
}
