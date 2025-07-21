using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daErrorDetalle
	{
		public beDetalleErrorListas listar(SqlConnection con, int id, int ti, DateTime fi, DateTime ff, int es, string su)
		{
			beDetalleErrorListas obeDetalleErrorListas=null;
			List<beDetalleErrorLista> lbeDetalleErrorLista = null;
			SqlCommand cmd = new SqlCommand("uspReplicaListarObservadosV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PersonaId", id);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", ti);
			cmd.Parameters.AddWithValue("@FechaInicio", fi);
			cmd.Parameters.AddWithValue("@FechaFin", ff);
			cmd.Parameters.AddWithValue("@EspecialidadId", es);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeDetalleErrorListas = new beDetalleErrorListas();
				lbeDetalleErrorLista = new List<beDetalleErrorLista>();
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posFechaAtendido = drd.GetOrdinal("FechaAtendido");
				int posFechaTerminado = drd.GetOrdinal("FechaTerminado");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posCostoPrestacion = drd.GetOrdinal("CostoPrestacion");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posServicio = drd.GetOrdinal("Servicio");
				int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
				int posAseguradora = drd.GetOrdinal("Aseguradora");
				int posContrato = drd.GetOrdinal("Contrato");
				int posIdExpediente = drd.GetOrdinal("IdExpediente");
				int posLineaExpediente = drd.GetOrdinal("LineaExpediente");
				int posObservacion = drd.GetOrdinal("Observacion");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beDetalleErrorLista obeDetalleErrorLista;
				while (drd.Read())
				{
					obeDetalleErrorLista = new beDetalleErrorLista();
					obeDetalleErrorLista.CodigoOA = drd.GetString(posCodigoOA).Trim();
					obeDetalleErrorLista.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obeDetalleErrorLista.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeDetalleErrorLista.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeDetalleErrorLista.Prestacion = drd.GetString(posPrestacion).Trim();
					obeDetalleErrorLista.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeDetalleErrorLista.FechaAtendido = drd.GetDateTime(posFechaAtendido);
					obeDetalleErrorLista.FechaTerminado = drd.GetDateTime(posFechaTerminado);
					obeDetalleErrorLista.Cantidad = drd.GetDecimal(posCantidad);
					obeDetalleErrorLista.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obeDetalleErrorLista.CostoPrestacion = drd.GetDecimal(posCostoPrestacion);
					obeDetalleErrorLista.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obeDetalleErrorLista.Servicio = drd.GetString(posServicio).Trim();
					obeDetalleErrorLista.TipoPaciente = drd.GetString(posTipoPaciente).Trim();
					obeDetalleErrorLista.TipoAtencion = drd.GetString(posTipoAtencion).Trim();
					obeDetalleErrorLista.Aseguradora = drd.GetString(posAseguradora);
					obeDetalleErrorLista.Contrato = drd.GetString(posContrato).Trim();
					obeDetalleErrorLista.IdExpediente = drd.GetInt32(posIdExpediente);
					obeDetalleErrorLista.LineaExpediente = drd.GetInt32(posLineaExpediente);
					obeDetalleErrorLista.Observacion = drd.GetString(posObservacion);
                    obeDetalleErrorLista.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeDetalleErrorLista.Add(obeDetalleErrorLista);
				}
				obeDetalleErrorListas.ListaDetalleError1 = lbeDetalleErrorLista;
				List<beDetalleErrorHorarioLista> lbeDetalleErrorHorarioLista = new List<beDetalleErrorHorarioLista>();	
				if (drd.NextResult())
				{				
					int posFecha2 = drd.GetOrdinal("Fecha");
					int posHoraInicio2 = drd.GetOrdinal("HoraInicio");
					int posHoraFin2 = drd.GetOrdinal("HoraFin");
					int posHorasProgramadas2 = drd.GetOrdinal("HorasProgramadas");
					int posDia2 = drd.GetOrdinal("Dia");
					int posIndicadorFeriado2 = drd.GetOrdinal("IndicadorFeriado");
					int posEspecialidad2 = drd.GetOrdinal("Especialidad");
					int posTipoAtencion2 = drd.GetOrdinal("TipoAtencion");
					beDetalleErrorHorarioLista obeDetalleErrorHorarioLista;
					while (drd.Read())
					{
						obeDetalleErrorHorarioLista = new beDetalleErrorHorarioLista();
						obeDetalleErrorHorarioLista.Fecha = drd.GetString(posFecha2);
						obeDetalleErrorHorarioLista.HoraInicio = drd.GetString(posHoraInicio2);
						obeDetalleErrorHorarioLista.HoraFin = drd.GetString(posHoraFin2);
						obeDetalleErrorHorarioLista.HorasProgramadas = drd.GetDecimal(posHorasProgramadas2);
						obeDetalleErrorHorarioLista.Dia = drd.GetString(posDia2);
						obeDetalleErrorHorarioLista.IndicadorFeriado = drd.GetBoolean(posIndicadorFeriado2);
						obeDetalleErrorHorarioLista.Especialidad = drd.GetString(posEspecialidad2);
						obeDetalleErrorHorarioLista.TipoAtencion = drd.GetString(posTipoAtencion2);
						lbeDetalleErrorHorarioLista.Add(obeDetalleErrorHorarioLista);
					}
					obeDetalleErrorListas.ListaDetalleError2 = lbeDetalleErrorHorarioLista;
				}
				drd.Close();
			}
			return (obeDetalleErrorListas);
		}
	}
}
