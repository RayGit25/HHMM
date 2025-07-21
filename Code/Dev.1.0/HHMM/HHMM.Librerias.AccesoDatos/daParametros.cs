using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HHMM.Librerias.AccesoDatos
{
  public  class daParametros
    {
		public string listar(SqlConnection con)
		{
			string lista = "";

			SqlCommand cmd = new SqlCommand("uspParametrosListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			object obj= cmd.ExecuteScalar();

			if (obj != null) {
				lista = obj.ToString();
			}

			return (lista);
		}

		public string listarPorId(SqlConnection con, string parametroId)
		{

			string lista = "";
			SqlCommand cmd = new SqlCommand("uspParametrosPorIdListar", con);
			cmd.CommandType = CommandType.StoredProcedure;


			SqlParameter par3 = cmd.Parameters.Add("@ParametroId", SqlDbType.VarChar,20);
			par3.Direction = ParameterDirection.Input;
			par3.Value = parametroId;

			object obj = cmd.ExecuteScalar();

			if (obj != null)
			{
				lista = obj.ToString();
			}

			return (lista);
		}

		public bool actualizar(SqlConnection con, string parametroId,string codigo, string descripcion,string valor)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspParametroActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ParametroId", SqlDbType.VarChar,50);
			par1.Direction = ParameterDirection.Input;
			par1.Value = parametroId;

			SqlParameter par2 = cmd.Parameters.Add("@Codigo", SqlDbType.VarChar, 50);
			par2.Direction = ParameterDirection.Input;
			par2.Value = codigo;

			SqlParameter par3 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar,250);
			par3.Direction = ParameterDirection.Input;
			par3.Value = descripcion;

			SqlParameter par4 = cmd.Parameters.Add("@Valor", SqlDbType.VarChar,1);
			par4.Direction = ParameterDirection.Input;
			par4.Value = valor;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}


		public string validar(SqlConnection con, string nombre)
		{

			string lista = "";
			SqlCommand cmd = new SqlCommand("uspParametrosValidarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;


			SqlParameter par3 = cmd.Parameters.Add("@Parametro", SqlDbType.VarChar, 250);
			par3.Direction = ParameterDirection.Input;
			par3.Value = nombre;

			object obj = cmd.ExecuteScalar();

			if (obj != null)
			{
				lista = obj.ToString();
			}

			return (lista);
		}


	}
}
