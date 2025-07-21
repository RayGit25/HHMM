using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brErrorDetalle : brGeneral
	{
		public beDetalleErrorListas listar(int id, int ti, DateTime fi, DateTime ff, int es, string su)
		{
			beDetalleErrorListas obeDetalleErrorListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daErrorDetalle odaErrorDetalle = new daErrorDetalle();
					obeDetalleErrorListas = odaErrorDetalle.listar(con, id, ti, fi, ff, es, su);
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
			return (obeDetalleErrorListas);
		}
	}
}
