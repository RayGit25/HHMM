using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brReporteProvision : brGeneral
	{
		public beReporteLiquidacionListas2 listasReporte(string su)
		{
			beReporteLiquidacionListas2 obeReporteLiquidacionListas2 = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteProvision odaReporteProvision = new daReporteProvision();
					obeReporteLiquidacionListas2 = odaReporteProvision.listasReporte(con, su);
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
			return (obeReporteLiquidacionListas2);
		}

		public beReporteLiquidacionListas listarReporte(string su, int med, int emp, int per, int pro, string tipo, string especialidad)
		{
			beReporteLiquidacionListas obeReporteLiquidacionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteProvision odaReporteProvision = new daReporteProvision();
					obeReporteLiquidacionListas = odaReporteProvision.listarReporte(con, su, med, emp, per, pro, tipo, especialidad);
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
			return (obeReporteLiquidacionListas);
		}

		public beReporteLiquidacionListasResumen listarReporteResumen(string su, int med, int emp, int per, int pro, string tipo, string especialidad)
		{
			beReporteLiquidacionListasResumen obeReporteLiquidacionListasResumen = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteProvision odaReporteProvision = new daReporteProvision();
					obeReporteLiquidacionListasResumen = odaReporteProvision.listarReporteResumen(con, su, med, emp, per, pro, tipo, especialidad);
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
			return (obeReporteLiquidacionListasResumen);
		}
	}
}
