using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daInterfaseMaestro
	{
		public List<beInterfaseMaestroVista> listar(SqlConnection con, int anio, string estado)
		{
			List<beInterfaseMaestroVista> LbeInterfaseMaestroVista = null;

			SqlCommand cmd = new SqlCommand("uspInterfaseMaestroListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.Parameters.AddWithValue("@EstadoRegistro", estado);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				LbeInterfaseMaestroVista = new List<beInterfaseMaestroVista>();
				int posInterfaseMaestroId = drd.GetOrdinal("InterfaseMaestroId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posUsuario = drd.GetOrdinal("Usuario");
				int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
				int posUsuarioModificacion = drd.GetOrdinal("UsuarioModificacion");
				int posFechaHoraCreacionUsuarioMod = drd.GetOrdinal("FechaHoraCreacionUsuarioMod");
				int posPeriodoId = drd.GetOrdinal("PeriodoId");

				beInterfaseMaestroVista obeInterfaseMaestroVista;
				while (drd.Read())
				{
					obeInterfaseMaestroVista = new beInterfaseMaestroVista();
					obeInterfaseMaestroVista.InterfaseMaestroID = drd.GetInt32(posInterfaseMaestroId);
					obeInterfaseMaestroVista.Descripcion = drd.GetString(posDescripcion).Trim();
					obeInterfaseMaestroVista.EstadoRegistro = drd.GetString(posEstadoRegistro);

					obeInterfaseMaestroVista.Usuario = drd.GetString(posUsuario).Trim();
					obeInterfaseMaestroVista.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
					obeInterfaseMaestroVista.UsuarioModificador = drd.GetString(posUsuarioModificacion).Trim();
					obeInterfaseMaestroVista.FechaHoraCreacionModificador = drd.GetDateTime(posFechaHoraCreacionUsuarioMod);
					obeInterfaseMaestroVista.PeriodoId = drd.GetInt32(posPeriodoId);
					LbeInterfaseMaestroVista.Add(obeInterfaseMaestroVista);
				}

				drd.Close();
			}
			return (LbeInterfaseMaestroVista);
		}

		public int adicionar(SqlConnection con, string Descripcion,int Periodo,int UsuarioId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspInterfaseMaestroAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Descripcion;

			SqlParameter par2 = cmd.Parameters.Add("@Periodo", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = Periodo;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par4.Value;
			return (Rpta);
		}

		public int actualizar(SqlConnection con,string Descripcion, int UsuarioId,int PeriodoId,int InterfaseId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspInterfaseMaestroActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Descripcion;

			SqlParameter par2 = cmd.Parameters.Add("@Periodo", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = PeriodoId;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@InterfaseMaestroId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = InterfaseId;

			SqlParameter par5 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par5.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par5.Value;
			return (Rpta);
		}

		public int actualizarEstado(SqlConnection con, int id, string EstadoRegistro, int UsuarioId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspInterfaseMaestroActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@InterfaseMaestroId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par4.Value;
			return (Rpta);
		}
	}
}
