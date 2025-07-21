using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daTurno
	{
		public List<beTurno> listar(SqlConnection con, string sucursal)
		{
			List<beTurno> lbeTurno =null;

			SqlCommand cmd = new SqlCommand("uspTurnoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeTurno = new List<beTurno>();
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beTurno ObeTurno;
				while (drd.Read())
				{
					ObeTurno = new beTurno();
					ObeTurno.TurnoId = drd.GetInt32(posTurnoId);
					ObeTurno.Descripcion = drd.GetString(posDescripcion);
					ObeTurno.HoraInicio = drd.GetString(posHoraInicio);
					ObeTurno.HoraFin = drd.GetString(posHoraFin);
					ObeTurno.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
					lbeTurno.Add(ObeTurno);
				}

				drd.Close();
			}
			return (lbeTurno);
		}

		public int adicionar(SqlConnection con, beTurno obeTurno,string SucursalId,int UsuarioId)
		{
			int idFeriado = -1;
			SqlCommand cmd = new SqlCommand("uspTurnoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = SucursalId;

			SqlParameter par3 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 150);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeTurno.Descripcion;

			SqlParameter par4 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value =  Convert.ToDateTime(obeTurno.HoraInicio);

			SqlParameter par5 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = Convert.ToDateTime(obeTurno.HoraFin);

			SqlParameter par6 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = UsuarioId;

			SqlParameter par7 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par7.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idFeriado = (int)par7.Value;
			return (idFeriado);
		}

		public bool actualizar(SqlConnection con, beTurno obeTurno, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspTurnoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeTurno.TurnoId;

			SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 80);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeTurno.Descripcion;

			SqlParameter par3 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = Convert.ToDateTime(obeTurno.HoraInicio);

			SqlParameter par4 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = Convert.ToDateTime(obeTurno.HoraFin);

			SqlParameter par5 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = UsuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public bool actualizarEstado(SqlConnection con, int TurnoId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspTurnoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = TurnoId;

			SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}
	}
}
