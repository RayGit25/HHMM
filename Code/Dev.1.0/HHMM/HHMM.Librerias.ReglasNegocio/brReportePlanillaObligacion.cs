using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brReportePlanillaObligacion : brGeneral
	{
		public List<beReportePlanillaObligacionVista> listarReporte(string su, int periodo, int persona, string estado, DateTime fechainicio, DateTime fechafin, int usuario, int tipo)
		{
			List<beReportePlanillaObligacionVista> lbeReportePlanillaObligacionVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReportePlanillaObligacion odaReportePlanillaObligacion = new daReportePlanillaObligacion();
					lbeReportePlanillaObligacionVista = odaReportePlanillaObligacion.listarReporte(con, su, periodo, persona, estado, fechainicio, fechafin, usuario, tipo);
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
			return (lbeReportePlanillaObligacionVista);
		}

		public beReportePlanillaObligacionListas listasReporte(string su)
		{
			beReportePlanillaObligacionListas obeReportePlanillaObligacionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReportePlanillaObligacion odaReportePlanillaObligacion = new daReportePlanillaObligacion();
					obeReportePlanillaObligacionListas = odaReportePlanillaObligacion.listasReporte(con, su);
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
			return (obeReportePlanillaObligacionListas);
		}
	}
}
