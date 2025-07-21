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
	public class brOrdenAtencion:brGeneral
	{
		public beOrdenAtencionListas listas(string sucursal)
		{
			beOrdenAtencionListas obeOrdenAtencionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daOrdenAtencion odaOrdenAtencion = new daOrdenAtencion();
					obeOrdenAtencionListas = odaOrdenAtencion.listas(con, sucursal);
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
			return (obeOrdenAtencionListas);
		}
		public beOrdenAtencionVista listar(beOrdenAtencionFiltro obeOrdenAtencionFiltro)
		{
			beOrdenAtencionVista obeOrdenAtencionVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daOrdenAtencion odaOrdenAtencion = new daOrdenAtencion();
					obeOrdenAtencionVista = odaOrdenAtencion.listar(con, obeOrdenAtencionFiltro);
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
			return (obeOrdenAtencionVista);
		}

		public string actualizarReplicaOrdenAtencion(beReplicaOrdenAtencionActualizador obeReplicaOrdenAtencionActualizador, string tipoentidad,int usuarioId)
		{
			string exito = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daOrdenAtencion odaOrdenAtencion = new daOrdenAtencion();
					exito = odaOrdenAtencion.actualizarReplicaOrdenAtencion(con, obeReplicaOrdenAtencionActualizador, tipoentidad, usuarioId);
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
			return (exito);
		}

		public List<beConsultaOA> listarOADetalle(string SucursalId, string OA)
		{
			List<beConsultaOA> lbeConsultaOA = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daOrdenAtencion odaOrdenAtencion = new daOrdenAtencion();
					lbeConsultaOA = odaOrdenAtencion.listarOADetalle(con, SucursalId,OA);
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
			return (lbeConsultaOA);
		}
	}
}
