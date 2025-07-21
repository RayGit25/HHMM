using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brProcesoDescuento:brGeneral
	{
		public beProcesoDescuentoListas ProcesoDescuentoListar(int id, string su, string periodo, string estado)
		{
			beProcesoDescuentoListas obeProcesoDescuentoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoDescuento odaProcesoDescuento = new daProcesoDescuento();
					obeProcesoDescuentoListas = odaProcesoDescuento.ProcesoDescuentoListar(con, id,su,periodo,estado);
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
			return obeProcesoDescuentoListas;
		}
	}
}
