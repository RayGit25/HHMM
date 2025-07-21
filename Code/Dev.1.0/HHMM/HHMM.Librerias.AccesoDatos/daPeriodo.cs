using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daPeriodo
	{
		public List<bePeriodo> listar(SqlConnection con, string idSucursal, int anio)
		{
			List<bePeriodo> lbePeriodo = null;
			SqlCommand cmd = new SqlCommand("uspPeriodoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", idSucursal);
			cmd.Parameters.AddWithValue("@Anio", anio);

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo;


				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posAnio = drd.GetOrdinal("Anio");
				int posMes = drd.GetOrdinal("Mes");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posFechaCierre = drd.GetOrdinal("FechaCierre");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
					obePeriodo.SucursalId = drd.GetString(posSucursalId);
					obePeriodo.Descripcion = drd.GetString(posDescripcion);
					obePeriodo.Anio = drd.GetInt32(posAnio);
					obePeriodo.Mes = drd.GetInt32(posMes);
					obePeriodo.Periodo = drd.GetString(posPeriodo);
					obePeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					obePeriodo.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePeriodo.EstadoProvision = drd.GetString(posEstadoProvision);
					obePeriodo.FechaCierre = drd.GetDateTime(posFechaCierre);
					lbePeriodo.Add(obePeriodo);
				}


				drd.Close();
			}
			return lbePeriodo;
		}

		public bePeriodoListar Adicionar(SqlConnection con, bePeriodo obeParametroPersona)
		{
			bePeriodoListar obePeriodoListar = new bePeriodoListar();
			List<bePeriodo> lbePeriodo = null;
			SqlCommand cmd = new SqlCommand("uspPeriodoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", obeParametroPersona.SucursalId);
			cmd.Parameters.AddWithValue("@Anio", obeParametroPersona.Anio);
			cmd.Parameters.AddWithValue("@Mes", obeParametroPersona.Mes);
			cmd.Parameters.AddWithValue("@Descripcion", obeParametroPersona.Descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo;

				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posAnio = drd.GetOrdinal("Anio");
				int posMes = drd.GetOrdinal("Mes");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posFechaCierre = drd.GetOrdinal("FechaCierre");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
					obePeriodo.SucursalId = drd.GetString(posSucursalId);
					obePeriodo.Descripcion = drd.GetString(posDescripcion);
					obePeriodo.Anio = drd.GetInt32(posAnio);
					obePeriodo.Mes = drd.GetInt32(posMes);
					obePeriodo.Periodo = drd.GetString(posPeriodo);
					obePeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					obePeriodo.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePeriodo.EstadoProvision = drd.GetString(posEstadoProvision);
					obePeriodo.FechaCierre = drd.GetDateTime(posFechaCierre);
					lbePeriodo.Add(obePeriodo);
				}

				drd.Close();

				obePeriodoListar.Rpta = par.Value.ToString();
				obePeriodoListar.ListaPeriodo = lbePeriodo;
			}
			return obePeriodoListar;
		}

		public bePeriodoListar Actualizar(SqlConnection con, bePeriodo obeParametroPersona)
		{

			bePeriodoListar obePeriodoListar = new bePeriodoListar();
			List<bePeriodo> lbePeriodo = null;
			SqlCommand cmd = new SqlCommand("uspPeriodoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PeriodoId", obeParametroPersona.PeriodoId);
			cmd.Parameters.AddWithValue("@SucursalId", obeParametroPersona.SucursalId);
			cmd.Parameters.AddWithValue("@Anio", obeParametroPersona.Anio);
			cmd.Parameters.AddWithValue("@Mes", obeParametroPersona.Mes);
			cmd.Parameters.AddWithValue("@Descripcion", obeParametroPersona.Descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo;

				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posAnio = drd.GetOrdinal("Anio");
				int posMes = drd.GetOrdinal("Mes");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posFechaCierre = drd.GetOrdinal("FechaCierre");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
					obePeriodo.SucursalId = drd.GetString(posSucursalId);
					obePeriodo.Descripcion = drd.GetString(posDescripcion);
					obePeriodo.Anio = drd.GetInt32(posAnio);
					obePeriodo.Mes = drd.GetInt32(posMes);
					obePeriodo.Periodo = drd.GetString(posPeriodo);
					obePeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					obePeriodo.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePeriodo.EstadoProvision = drd.GetString(posEstadoProvision);
					obePeriodo.FechaCierre = drd.GetDateTime(posFechaCierre);
					lbePeriodo.Add(obePeriodo);
				}

				drd.Close();

				obePeriodoListar.Rpta = par.Value.ToString();
				obePeriodoListar.ListaPeriodo = lbePeriodo;
			}
			return obePeriodoListar;

		}

		public bePeriodoListar ActualizarEstado(SqlConnection con, bePeriodo obeParametroPersona)
		{


			bePeriodoListar obePeriodoListar = new bePeriodoListar();
			List<bePeriodo> lbePeriodo = null;
			SqlCommand cmd = new SqlCommand("uspPeriodoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PeriodoId", obeParametroPersona.PeriodoId);
			cmd.Parameters.AddWithValue("@Estado", obeParametroPersona.EstadoRegistro);
			cmd.Parameters.AddWithValue("@UsuarioId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo;

				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posAnio = drd.GetOrdinal("Anio");
				int posMes = drd.GetOrdinal("Mes");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posFechaCierre = drd.GetOrdinal("FechaCierre");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
					obePeriodo.SucursalId = drd.GetString(posSucursalId);
					obePeriodo.Descripcion = drd.GetString(posDescripcion);
					obePeriodo.Anio = drd.GetInt32(posAnio);
					obePeriodo.Mes = drd.GetInt32(posMes);
					obePeriodo.Periodo = drd.GetString(posPeriodo);
					obePeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					obePeriodo.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePeriodo.EstadoProvision = drd.GetString(posEstadoProvision);
					obePeriodo.FechaCierre = drd.GetDateTime(posFechaCierre);
					lbePeriodo.Add(obePeriodo);
				}

				drd.Close();

				obePeriodoListar.Rpta = par.Value.ToString();
				obePeriodoListar.ListaPeriodo = lbePeriodo;
			}
			return obePeriodoListar;

		}

		public bePeriodoListar ActualizarEstadocierre(SqlConnection con, bePeriodo obePeriodoParametro)
		{

			bePeriodoListar obePeriodoListar = new bePeriodoListar();
			List<bePeriodo> lbePeriodo = null;
			SqlCommand cmd = new SqlCommand("uspPeriodoActualizarCierre", con);
			cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;
            cmd.Parameters.AddWithValue("@PeriodoId", obePeriodoParametro.PeriodoId);
			cmd.Parameters.AddWithValue("@Estado", obePeriodoParametro.EstadoRegistro);
			cmd.Parameters.AddWithValue("@UsuarioId", obePeriodoParametro.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePeriodo = new List<bePeriodo>();
				bePeriodo obePeriodo;

				int posPeriodoId = drd.GetOrdinal("PeriodoId");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posAnio = drd.GetOrdinal("Anio");
				int posMes = drd.GetOrdinal("Mes");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posFechaCierre = drd.GetOrdinal("FechaCierre");

				while (drd.Read())
				{
					obePeriodo = new bePeriodo();
					obePeriodo.PeriodoId = drd.GetInt32(posPeriodoId);
					obePeriodo.SucursalId = drd.GetString(posSucursalId);
					obePeriodo.Descripcion = drd.GetString(posDescripcion);
					obePeriodo.Anio = drd.GetInt32(posAnio);
					obePeriodo.Mes = drd.GetInt32(posMes);
					obePeriodo.Periodo = drd.GetString(posPeriodo);
					obePeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obePeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					obePeriodo.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obePeriodo.EstadoProvision = drd.GetString(posEstadoProvision);
					obePeriodo.FechaCierre = drd.GetDateTime(posFechaCierre);
					lbePeriodo.Add(obePeriodo);
				}

				drd.Close();

				obePeriodoListar.Rpta = par.Value.ToString();
				obePeriodoListar.ListaPeriodo = lbePeriodo;
			}
			return obePeriodoListar;

		}

	}
}
