using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daSQL
    {
		public string EjecutarComando(SqlConnection con, string nombreProcedimiento, 
			string nombreParametro = null, string valorParametro = null, SqlTransaction oTransaccion = null)
		{
			string response = "";

			SqlCommand cmd;
			if (oTransaccion != null)
			{
				cmd = new SqlCommand(nombreProcedimiento, con, oTransaccion);
			}
			else
            {
				cmd = new SqlCommand(nombreProcedimiento, con);
			}
			cmd.CommandType = CommandType.StoredProcedure;

			if (nombreParametro != null && valorParametro != null)
			{
				cmd.Parameters.AddWithValue(nombreParametro, valorParametro);
			}
			object data = cmd.ExecuteScalar();
			if (data != null)
			{
				response = data.ToString();
			}
			return response;
		}
        public DataSet EjecutarComandoDst(SqlConnection con, string NombreSP, string parametroNombre = "", string parametroValor = "")
        {
			var result = new DataSet();

			SqlCommand cmd = new SqlCommand(NombreSP, con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			if (!String.IsNullOrEmpty(parametroValor) && !String.IsNullOrEmpty(parametroValor))
			{
				cmd.Parameters.AddWithValue(parametroNombre, parametroValor);
			}
			var dataAdapter = new SqlDataAdapter(cmd);
			dataAdapter.Fill(result);

			return result;
		}
    }
}
