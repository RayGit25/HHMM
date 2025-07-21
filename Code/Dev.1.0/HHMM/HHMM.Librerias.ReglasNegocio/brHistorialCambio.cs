using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brHistorialCambio:brGeneral
	{
		public List<beHistorialCambio> listar(string tabla, string RegistroId)
		{
			List<beHistorialCambio> lbeHistorialCambio = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHistorialCambio odaHistorialCambio = new daHistorialCambio();
					lbeHistorialCambio = odaHistorialCambio.listar(con, tabla, RegistroId);
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
			return (lbeHistorialCambio);
		}
	}
}
