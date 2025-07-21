using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.ReglasNegocio;

namespace General.Librerias.AccesoDatos
{
    public class daSQL:brGeneral
    {
		string CadenaConexion;
		int TiempoEspera;

		//public daSQL(string nombreConexion = "_ConexionBD")
		public daSQL(string nombreConexion = "_ConexionBD", string tiempoEspera = "_TiempoEspera")
		{
			CadenaConexion = ConfigurationManager.ConnectionStrings[nombreConexion].ConnectionString;
			TiempoEspera = int.Parse(ConfigurationManager.AppSettings[tiempoEspera]);
		}

		public string EjecutarComando(string nombreProcedimiento, string nombreParametro = null, string valorParametro = null)
		{
			string response = "";
			using (SqlConnection con = new SqlConnection(CadenaConexion))
			{
				try
				{
					con.Open();
					SqlCommand cmd = new SqlCommand(nombreProcedimiento, con);
					cmd.CommandType = CommandType.StoredProcedure;
					cmd.CommandTimeout = TiempoEspera;

					if (nombreParametro != null && valorParametro != null)
					{
						cmd.Parameters.AddWithValue(nombreParametro, valorParametro);
					}
					object data = cmd.ExecuteScalar();
					if (data != null)
					{
						response = data.ToString();
					}
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return response;
		}
        public DataSet EjecutarComandoDst(string NombreSP, string parametroNombre = "", string parametroValor = "")
        {
            var result = new DataSet();
            using (SqlConnection con = new SqlConnection(CadenaConexion))
            {
                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand(NombreSP, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandTimeout = 0;
                    if (!String.IsNullOrEmpty(parametroValor) && !String.IsNullOrEmpty(parametroValor))
                    {
                        cmd.Parameters.AddWithValue(parametroNombre, parametroValor);
                    }

                    var dataAdapter = new SqlDataAdapter(cmd);
                    dataAdapter.Fill(result);
                }
                catch (Exception ex)
                {
                    //Grabar el Log con ex.Message
                }
            } //con.Close(); con.Dispose(); con=null;
            return result;
        }
    }
}
