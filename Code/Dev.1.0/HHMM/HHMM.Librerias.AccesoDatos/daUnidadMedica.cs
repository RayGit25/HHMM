using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daUnidadMedica
    {
        public beUnidadMedicaLista listar(SqlConnection con)
        {
			beUnidadMedicaLista obeUnidadMedicaLista = new beUnidadMedicaLista();
            List<beUnidadMedica> ListaUnidadMedica=null;
			List<beCampoCadena4> listaUnidadServicio=null;
			List<beCampoEntero> listaServicioCombo=null;

            SqlCommand cmd = new SqlCommand("uspUnidadMedicaListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {

				ListaUnidadMedica = new List<beUnidadMedica>();

                int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                beUnidadMedica obeUnidadMedica;
                while (drd.Read())
                {
                    obeUnidadMedica = new beUnidadMedica();
                    obeUnidadMedica.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
                    obeUnidadMedica.Descripcion = drd.GetString(posDescripcion);
                    obeUnidadMedica.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
					ListaUnidadMedica.Add(obeUnidadMedica);
                }
				obeUnidadMedicaLista.ListaUnidadMedica = ListaUnidadMedica;

				if (drd.NextResult())
				{
					listaUnidadServicio = new List<beCampoCadena4>();
					int posUnidadMedicaId1 = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedicaServicioId = drd.GetOrdinal("UnidadMedicaServicioId");
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posEstadoRegistro1 = drd.GetOrdinal("EstadoRegistro");
					beCampoCadena4 oListaServicio;
					while (drd.Read())
					{
						oListaServicio = new beCampoCadena4();
						oListaServicio.Campo1 = drd.GetInt32(posUnidadMedicaId1).ToString();
						oListaServicio.Campo2 = drd.GetInt32(posUnidadMedicaServicioId).ToString();
						oListaServicio.Campo3 = drd.GetInt32(posServicioId).ToString();
						oListaServicio.Campo4 = drd.GetString(posEstadoRegistro1);
						listaUnidadServicio.Add(oListaServicio);
					}
					obeUnidadMedicaLista.listaUnidadServicio = listaUnidadServicio;
				}
				if (drd.NextResult())
				{
					listaServicioCombo = new List<beCampoEntero>();
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion1 = drd.GetOrdinal("Descripcion");
					beCampoEntero oListaServicioCombo;
					while (drd.Read())
					{
						oListaServicioCombo = new beCampoEntero();
						oListaServicioCombo.campo1 = drd.GetInt32(posServicioId);
						oListaServicioCombo.campo2 = drd.GetString(posDescripcion1);
						listaServicioCombo.Add(oListaServicioCombo);
					}
					obeUnidadMedicaLista.listaServicioCombo = listaServicioCombo;
				}
                drd.Close();
            }
            return (obeUnidadMedicaLista);
        }

        public int adicionar(SqlConnection con, beUnidadMedica obeUnidadMedica)
        {
            int idUnidadMedica = -1;
            SqlCommand cmd = new SqlCommand("uspUnidadMedicaAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeUnidadMedica.Descripcion;

            SqlParameter par2 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeUnidadMedica.UsuarioCreadorId;

            SqlParameter par3 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
            par3.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idUnidadMedica = (int)par3.Value;
            return (idUnidadMedica);
        }

        public bool actualizar(SqlConnection con, beUnidadMedica obeUnidadMedica)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspUnidadMedicaActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeUnidadMedica.UnidadMedicaId;
            SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 80);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeUnidadMedica.Descripcion;
            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeUnidadMedica.UsuarioModificadorId;
            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstado(SqlConnection con, int UnidadMedicaId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspUnidadMedicaActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = UnidadMedicaId;

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

		public int adicionarDetalle(SqlConnection con, int UnidadMedicaId, int ServicioId, int UsuarioId)
		{
			int UnidadMedicaServicioId = -1;
			SqlCommand cmd = new SqlCommand("uspUnidadMedicaServicioAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = UnidadMedicaId;

			SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = ServicioId;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@UnidadMedicaServicioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) UnidadMedicaServicioId = (int)par4.Value;
			return (UnidadMedicaServicioId);
		}

		public int actualizarDetalle(SqlConnection con, int UnidadMedicaServicioId, int ServicioId, int UsuarioId)
		{
			int id = -1;
			SqlCommand cmd = new SqlCommand("uspUnidadMedicaServicioActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UnidadMedicaServicioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = UnidadMedicaServicioId;

			SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = ServicioId;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) id = (int)par4.Value;
			return (id);
		}
		public bool actualizarEstadoDetalle(SqlConnection con, int UnidadMedicaServicioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspUnidadMedicaServicioActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UnidadMedicaServicioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = UnidadMedicaServicioId;

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
