using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Configuration;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brReporteDetalladoProvision:brGeneral
	{
		public beReporteDetalladoProvicionListas listas(string SucursalId)
		{
			beReporteDetalladoProvicionListas obeReporteDetalladoProvicionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteDetalladoProvision odaReporteDetalladoProvision = new daReporteDetalladoProvision();
					obeReporteDetalladoProvicionListas = odaReporteDetalladoProvision.listas(con, SucursalId);
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
			return (obeReporteDetalladoProvicionListas);
		}

		public beReporteDetalladoProvisionVista listar(string tipo,string SucursalId, int PeriodoId, int TipoAdmisionId, int EspecialidadId, int PersonaId, int EmpresaId)
		{
			beReporteDetalladoProvisionVista obeReporteDetalladoProvisionVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteDetalladoProvision odaReporteDetalladoProvision = new daReporteDetalladoProvision();
					obeReporteDetalladoProvisionVista = odaReporteDetalladoProvision.listar(con, tipo,SucursalId, PeriodoId, TipoAdmisionId, EspecialidadId, PersonaId, EmpresaId);
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

		public beReporteDetalladoProvisionVista2 listar2(string tipo, string SucursalId, int PeriodoId, int TipoAdmisionId, int EspecialidadId, int PersonaId, int EmpresaId)
		{
			beReporteDetalladoProvisionVista2 obeReporteDetalladoProvisionVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteDetalladoProvision odaReporteDetalladoProvision = new daReporteDetalladoProvision();
					obeReporteDetalladoProvisionVista = odaReporteDetalladoProvision.listar2(con, tipo, SucursalId, PeriodoId, TipoAdmisionId, EspecialidadId, PersonaId, EmpresaId);
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
