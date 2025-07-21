using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brReporte : brGeneral
    {
        public beReporteVista listarListas(int ti, string su, DateTime fecini, DateTime fecfin, int mes, int anio)
        {
            beReporteVista obeReporteVista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daReporte odaReporte = new daReporte();
                    obeReporteVista = odaReporte.listarReporte(con, ti, su, fecini, fecfin, mes, anio);
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
            return (obeReporteVista);
        }

		public beReporteVista2 listarListas2(int ti, string su, DateTime fecini, DateTime fecfin, int mes, int anio)
		{
			beReporteVista2 obeReporteVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporte odaReporte = new daReporte();
					obeReporteVista = odaReporte.listarReporte2(con, ti, su, fecini, fecfin, mes, anio);
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
			return (obeReporteVista);
		}
    }
}
