using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
namespace Softvan.Core
{
    public class DataSQL
    {
        private string CadenaConexion;
        private int TiempoEspera;

        public DataSQL(string nombreConexion = "_ConexionBD", string tiempoEspera = "_TiempoEspera")
        {
            this.CadenaConexion = ConfigurationManager.ConnectionStrings[nombreConexion].ConnectionString;
            this.TiempoEspera = int.Parse(ConfigurationManager.AppSettings[tiempoEspera]);
        }
        public StatusResponse EjecutarComando(string nombreProcedimiento, string nombreParametro = null, string valorParametro = null)
        {
            StatusResponse response = new StatusResponse();
            SqlConnection connection = new SqlConnection(this.CadenaConexion);
            try
            {
                connection.Open();
                SqlCommand command = new SqlCommand(nombreProcedimiento, connection)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = this.TiempoEspera
                };
                if ((nombreParametro != null) && (valorParametro != null))
                {
                    command.Parameters.AddWithValue(nombreParametro, valorParametro);
                }
                object obj2 = command.ExecuteScalar();
                if (obj2 != null)
                {
                    response.Success = true;
                    response.Data = obj2.ToString();
                }
            }
            catch (SqlException exception1)
            {
                ArchivoTexto<Exception>.GenerarArchivo(exception1, null, "");
            }
            catch (Exception exception3)
            {
                ArchivoTexto<Exception>.GenerarArchivo(exception3, null, "");
            }
            finally
            {
                if (connection != null)
                {
                    connection.Dispose();
                }
            }
            return response;
        }
    }
}
