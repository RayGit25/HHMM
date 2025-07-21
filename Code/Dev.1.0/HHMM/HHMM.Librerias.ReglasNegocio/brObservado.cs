using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brObservado:brGeneral
	{
		public List<beDetalleObservadoLista> listar(int id, int ti, DateTime fi, DateTime ff, int es, string su, int procesoid, bool inddet)
		{
			List<beDetalleObservadoLista> lbeDetalleObservadoLista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daObservado odaObservado = new daObservado();
					lbeDetalleObservadoLista = odaObservado.listar(con, id, ti, fi, ff, es,su,procesoid,inddet);
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
			return (lbeDetalleObservadoLista);
		}
	}
}
