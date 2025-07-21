using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brReporteContrato:brGeneral
	{
		public beMedicoContratoReporteVista listarMedicoContratoReporte(string su, int usuarioId)
		{
			beMedicoContratoReporteVista obeMedicoContratoReporteVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteContrato odaReporteContrato = new daReporteContrato();
					obeMedicoContratoReporteVista = odaReporteContrato.listarMedicoContratoReporte(con, su, usuarioId);
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
			return (obeMedicoContratoReporteVista);
		}
		public beReporteContratoListas listarReporte(string su, DateTime fecini, DateTime fecfin, int med, int emp,string com)
		{
			beReporteContratoListas obeReporteContratoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReporteContrato odaReporteContrato = new daReporteContrato();
					obeReporteContratoListas = odaReporteContrato.listarReporte(con,su, fecini, fecfin,med,emp,com);
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
			return (obeReporteContratoListas);
		}
	}
}
