using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
	public class daObservado
	{
		public List<beDetalleObservadoLista> listar(SqlConnection con, int id, int ti, DateTime fi, DateTime ff, int es,string su,int procesoid,bool inddet)
		{
			List<beDetalleObservadoLista> lbeDetalleObservadoLista = null;
			SqlCommand cmd = new SqlCommand("uspReplicaListarObservadosV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PersonaId", id);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", ti);
			cmd.Parameters.AddWithValue("@FechaInicio", fi);
			cmd.Parameters.AddWithValue("@FechaFin", ff);
			cmd.Parameters.AddWithValue("@EspecialidadId", es);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@ProcesoId", procesoid);
			cmd.Parameters.AddWithValue("@IndicadorDetalleOA", inddet);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeDetalleObservadoLista = new List<beDetalleObservadoLista>();
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posServicio = drd.GetOrdinal("Servicio");
				int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
				int posAseguradora = drd.GetOrdinal("Aseguradora");
				int posContrato = drd.GetOrdinal("Contrato");
				int posIdExpediente = drd.GetOrdinal("IdExpediente");
				int posLineaExpediente = drd.GetOrdinal("LineaExpediente");
				int posObservacion = drd.GetOrdinal("Observacion");			
				beDetalleObservadoLista obeDetalleObservadoLista;
				while (drd.Read())
				{
					obeDetalleObservadoLista = new beDetalleObservadoLista();
					obeDetalleObservadoLista.CodigoOA = drd.GetString(posCodigoOA).Trim();
					obeDetalleObservadoLista.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obeDetalleObservadoLista.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeDetalleObservadoLista.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeDetalleObservadoLista.Prestacion = drd.GetString(posPrestacion).Trim();
					obeDetalleObservadoLista.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeDetalleObservadoLista.Cantidad = drd.GetDecimal(posCantidad);
					obeDetalleObservadoLista.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obeDetalleObservadoLista.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obeDetalleObservadoLista.Servicio = drd.GetString(posServicio).Trim();
					obeDetalleObservadoLista.TipoPaciente = drd.GetString(posTipoPaciente).Trim();
					obeDetalleObservadoLista.TipoAtencion = drd.GetString(posTipoAtencion).Trim();
					obeDetalleObservadoLista.Aseguradora = drd.GetString(posAseguradora);
					obeDetalleObservadoLista.Contrato = drd.GetString(posContrato).Trim();
					obeDetalleObservadoLista.IdExpediente = drd.GetInt32(posIdExpediente);
					obeDetalleObservadoLista.LineaExpediente = drd.GetInt32(posLineaExpediente);
					obeDetalleObservadoLista.Observacion = drd.GetString(posObservacion);
					lbeDetalleObservadoLista.Add(obeDetalleObservadoLista);
				}
				drd.Close();
			}
			return (lbeDetalleObservadoLista);
		}
	}
}
