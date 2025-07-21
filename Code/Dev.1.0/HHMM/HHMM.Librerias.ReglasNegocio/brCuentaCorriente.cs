using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brCuentaCorriente:brGeneral
	{
		public beCuentaCorrienteReporteListas listasReporteCTA(string sucursal)
		{
			beCuentaCorrienteReporteListas obeCuentaCorrienteReporteListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daCuentaCorriente odaCuentaCorriente = new daCuentaCorriente();
					obeCuentaCorrienteReporteListas = odaCuentaCorriente.listasReporteCTA(con, sucursal);
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
			return (obeCuentaCorrienteReporteListas);
		}

		public List<beCuentaCorrienteReporte1> listarReporteCTA1(string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			List<beCuentaCorrienteReporte1> lbeCuentaCorrienteReporte1 = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daCuentaCorriente odaCuentaCorriente = new daCuentaCorriente();
					lbeCuentaCorrienteReporte1 = odaCuentaCorriente.listarReporteCTA1(con, sucursal, perproini, perprofin, perprodini, perprodfin, especialidadid, estadoplanilla, fecinicio, fecfin, tipoadmision, persona, empresa, opc, IndicadorNoOA);
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
			return (lbeCuentaCorrienteReporte1);
		}

		public List<beCuentaCorrienteReporte2> listarReporteCTA2(string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			List<beCuentaCorrienteReporte2> lbeCuentaCorrienteReporte2 = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daCuentaCorriente odaCuentaCorriente = new daCuentaCorriente();
					lbeCuentaCorrienteReporte2 = odaCuentaCorriente.listarReporteCTA2(con, sucursal, perproini, perprofin, perprodini, perprodfin, especialidadid, estadoplanilla, fecinicio, fecfin, tipoadmision, persona, empresa, opc, IndicadorNoOA);
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
			return (lbeCuentaCorrienteReporte2);
		}

		public beCuentaCorrienteReporteDetalle listarReporteCTA3(string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc, int IndicadorNoOA)
		{
			beCuentaCorrienteReporteDetalle obeCuentaCorrienteReporteDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daCuentaCorriente odaCuentaCorriente = new daCuentaCorriente();
					obeCuentaCorrienteReporteDetalle = odaCuentaCorriente.listarReporteCTA3(con, sucursal, perproini, perprofin, perprodini, perprodfin, especialidadid, estadoplanilla, fecinicio, fecfin, tipoadmision, persona, empresa, opc, IndicadorNoOA);
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
			return (obeCuentaCorrienteReporteDetalle);
		}

		public beReporteDetalladoProvisionVista ReporteCTAExcel(string sucursal, int perproini, int perprofin, int perprodini, int perprodfin, int especialidadid, string estadoplanilla, DateTime fecinicio, DateTime fecfin, int tipoadmision, int persona, int empresa, int opc)
		{
			beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daCuentaCorriente odaCuentaCorriente = new daCuentaCorriente();
					obeReporteDetalladoProvisionVista = odaCuentaCorriente.ReporteCTAExcel(con, sucursal, perproini, perprofin, perprodini, perprodfin, especialidadid, estadoplanilla, fecinicio, fecfin, tipoadmision, persona, empresa, opc);
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
			return (obeReporteDetalladoProvisionVista);
		}
	}
}
