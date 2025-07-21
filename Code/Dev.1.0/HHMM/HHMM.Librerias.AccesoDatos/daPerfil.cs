using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
    public class daPerfil
    {
        public List<bePerfil> listar(SqlConnection con)
        {
            List<bePerfil> lbePerfiles = null;
            SqlCommand cmd = new SqlCommand("uspPerfilListar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbePerfiles = new List<bePerfil>();
                bePerfil obePerfil;

                int posPerfilId = drd.GetOrdinal("PerfilId");
                int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obePerfil = new bePerfil();
                    obePerfil.PerfilId = drd.GetInt32(posPerfilId);
                    obePerfil.NombrePerfil = drd.GetString(posNombrePerfil);
                    obePerfil.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    lbePerfiles.Add(obePerfil);
                }

                drd.Close();
            }
            return lbePerfiles;
        }

		public bePerfilListar Adicionar(SqlConnection con, bePerfil obeParametroPersona)
		{
			bePerfilListar obePerfilListar = new bePerfilListar();
			List<bePerfil> lbePerfiles = null;
			SqlCommand cmd = new SqlCommand("uspPerfilAdicionarListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@NombrePerfil", obeParametroPersona.NombrePerfil);
			cmd.Parameters.AddWithValue("@UsuarioCreadorId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePerfiles = new List<bePerfil>();
				bePerfil obePerfil;

				int posPerfilId = drd.GetOrdinal("PerfilId");
				int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

				while (drd.Read())
				{
					obePerfil = new bePerfil();
					obePerfil.PerfilId = drd.GetInt32(posPerfilId);
					obePerfil.NombrePerfil = drd.GetString(posNombrePerfil);
					obePerfil.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbePerfiles.Add(obePerfil);
				}

				drd.Close();

				obePerfilListar.Rpta = par.Value.ToString();
				obePerfilListar.ListaPerfil = lbePerfiles;
			}
			return obePerfilListar;
		}

		public bePerfilListar Actualizar(SqlConnection con, bePerfil obeParametroPersona)
		{
			bePerfilListar obePerfilListar = new bePerfilListar();
			List<bePerfil> lbePerfiles = null;
			SqlCommand cmd = new SqlCommand("uspPerfilActualizarListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PerfilId", obeParametroPersona.PerfilId);
			cmd.Parameters.AddWithValue("@NombrePerfil", obeParametroPersona.NombrePerfil);
			cmd.Parameters.AddWithValue("@UsuarioCreadorId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePerfiles = new List<bePerfil>();
				bePerfil obePerfil;

				int posPerfilId = drd.GetOrdinal("PerfilId");
				int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

				while (drd.Read())
				{
					obePerfil = new bePerfil();
					obePerfil.PerfilId = drd.GetInt32(posPerfilId);
					obePerfil.NombrePerfil = drd.GetString(posNombrePerfil);
					obePerfil.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbePerfiles.Add(obePerfil);
				}

				drd.Close();
				int n = (int)par.Value;
				obePerfilListar.Rpta = (n > 0).ToString().ToLower();
				obePerfilListar.ListaPerfil = lbePerfiles;
			}
			return obePerfilListar;
		}

		public bePerfilListar ActualizarEstado(SqlConnection con, bePerfil obeParametroPersona)
		{
			bePerfilListar obePerfilListar = new bePerfilListar();
			List<bePerfil> lbePerfiles = null;
			SqlCommand cmd = new SqlCommand("uspPerfilActualizarEstadoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PerfilId", obeParametroPersona.PerfilId);
			cmd.Parameters.AddWithValue("@EstadoRegistro", obeParametroPersona.EstadoRegistro);
			cmd.Parameters.AddWithValue("@UsuarioCreadorId", obeParametroPersona.UsuarioCreadorId);
			SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				lbePerfiles = new List<bePerfil>();
				bePerfil obePerfil;

				int posPerfilId = drd.GetOrdinal("PerfilId");
				int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

				while (drd.Read())
				{
					obePerfil = new bePerfil();
					obePerfil.PerfilId = drd.GetInt32(posPerfilId);
					obePerfil.NombrePerfil = drd.GetString(posNombrePerfil);
					obePerfil.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbePerfiles.Add(obePerfil);
				}

				drd.Close();
				int n = (int)par.Value;
				obePerfilListar.Rpta = (n > 0).ToString().ToLower();
				obePerfilListar.ListaPerfil = lbePerfiles;
			}
			return obePerfilListar;
		}
    }
}
