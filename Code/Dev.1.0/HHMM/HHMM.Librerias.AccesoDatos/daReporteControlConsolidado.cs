using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReporteControlConsolidado
	{
		public string listas(SqlConnection con)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspReporteControlConsolidadoListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			object lista=cmd.ExecuteScalar();
			if (lista != null)
			{
				 rpta=lista.ToString();
			}
			return rpta;
		}

		public string listar(SqlConnection con,int opc,string param)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspReporteControlConsolidadoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Opcion", opc);
			cmd.Parameters.AddWithValue("@Parametros", param);
			cmd.CommandTimeout = 0;
			object lista = cmd.ExecuteScalar();
			if (lista != null)
			{
				rpta = lista.ToString();
			}
			return rpta;
		}
	}
}
