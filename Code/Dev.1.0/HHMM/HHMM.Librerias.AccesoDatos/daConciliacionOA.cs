using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daConciliacionOA
	{
		public List<beConciliacionOAVista> Listar(SqlConnection con, string su, DateTime fecini, DateTime fecfin, int med, int emp)
		{
			List<beConciliacionOAVista> lbeConciliacionOAVista = null;
			SqlCommand cmd = new SqlCommand("uspConciliacionListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@FechaInicio", fecini);
			cmd.Parameters.AddWithValue("@FechaFin", fecfin);
			cmd.Parameters.AddWithValue("@PersonaId", med);
			cmd.Parameters.AddWithValue("@EmpresaId", emp);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeConciliacionOAVista = new List<beConciliacionOAVista>();
				beConciliacionOAVista obeConciliacionOAVista;

				int posConciliacionId = drd.GetOrdinal("ConciliacionId");
				int posMedico = drd.GetOrdinal("Medico");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posFechaHoraConciliacion = drd.GetOrdinal("FechaHoraConciliacion");
				int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
				int posTotalRegistros = drd.GetOrdinal("TotalRegistros");
				int posTotalObservados = drd.GetOrdinal("TotalObservados");

				while (drd.Read())
				{
					obeConciliacionOAVista = new beConciliacionOAVista();
					obeConciliacionOAVista.ConciliacionId = drd.GetInt32(posConciliacionId);
					obeConciliacionOAVista.Medico = drd.GetString(posMedico);
					obeConciliacionOAVista.Descripcion = drd.GetString(posDescripcion);
					obeConciliacionOAVista.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeConciliacionOAVista.FechaHoraConciliacion = drd.GetDateTime(posFechaHoraConciliacion);
					obeConciliacionOAVista.CodigoUsuario = drd.GetString(posCodigoUsuario);
					obeConciliacionOAVista.TotalRegistros = drd.GetInt32(posTotalRegistros);
					obeConciliacionOAVista.TotalObservados = drd.GetInt32(posTotalObservados);
					lbeConciliacionOAVista.Add(obeConciliacionOAVista);
				}

				drd.Close();
			}
			return lbeConciliacionOAVista;
		}

		public string adicionar(SqlConnection con, string su, int id,int usuario, string descripcion, string lista,bool indicador)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspConciliacionAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@PersonaId", id);
			cmd.Parameters.AddWithValue("@Descripcion", descripcion);
			cmd.Parameters.AddWithValue("@Lista", lista);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			cmd.Parameters.AddWithValue("@IndicadorAdicionar", indicador);
			object exc = cmd.ExecuteScalar();
			if (exc != null)
			{
				rpta = exc.ToString();
			}
			return rpta;
		}

		public string listarId(SqlConnection con,int id)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspConciliacionListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ConciliacionId", id);
			object exc = cmd.ExecuteScalar();
			if (exc != null)
			{
				rpta = exc.ToString();
			}
			return rpta;
		}

		public string Procesar(SqlConnection con, int id,int usuario)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspConciliacionProcesar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ConciliacionId", id);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			object exc = cmd.ExecuteScalar();
			if (exc != null)
			{
				rpta = exc.ToString();
			}
			return rpta;
		}

		public string ActualizarEstado(SqlConnection con, int id,int usuario,string estado)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspConciliacionActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ConciliacionId", id);
			cmd.Parameters.AddWithValue("@EstadoRegistro", estado);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			object exc = cmd.ExecuteScalar();
			if (exc != null)
			{
				rpta = exc.ToString();
			}
			return rpta;
		}

		
	}
}
