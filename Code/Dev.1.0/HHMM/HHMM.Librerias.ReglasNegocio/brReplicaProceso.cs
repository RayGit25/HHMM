using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.ReglasNegocio
{
	public class brReplicaProceso:brGeneral
	{
		public beReplicaProcesoListas listas(int usuarioid,string sucursal)
		{
			beReplicaProcesoListas obeReplicaProcesoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					obeReplicaProcesoListas = odaReplicaProceso.listas(con,usuarioid,sucursal);
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
			return (obeReplicaProcesoListas);
		}

		public List<beReplicaProcesoVista> listar(int anio,string estado, string sucursal)
		{
			List<beReplicaProcesoVista> lbeReplicaProcesoVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					lbeReplicaProcesoVista = odaReplicaProceso.listar(con,anio,estado,sucursal);
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
			return (lbeReplicaProcesoVista);
		}


		public int adicionar( beReplicaProcesoPeriodo obeReplicaProcesoPeriodo, string Descripcion, int UsuarioId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					rpta = odaReplicaProceso.adicionar(con,obeReplicaProcesoPeriodo,Descripcion,UsuarioId);
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
			return (rpta);
		}

		public int interfaseMaestroActualizar(string Ip, string Bd, int Entidad, int UsuarioId, int interfaseid)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					rpta = odaReplicaProceso.interfaseMaestroActualizar(con, Ip, Bd, Entidad, UsuarioId, interfaseid);
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
			return (rpta);
		}

		public int actualizar(beReplicaProcesoPeriodo obeReplicaProcesoPeriodo, string Descripcion, int UsuarioId,int ReprocesoId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					rpta = odaReplicaProceso.actualizar(con, obeReplicaProcesoPeriodo, Descripcion, UsuarioId, ReprocesoId);
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
			return (rpta);
		}

		public string procesar(int replica, string periodo, int secuencia, string sucursalId, int persona, int especialidad, string oa, string ip, string bd,int usuario)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					rpta = odaReplicaProceso.procesar(con, replica,periodo,secuencia, sucursalId, persona, especialidad,oa,ip,bd,usuario);
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
			return (rpta);
		}

		public int actualizarEstado(int id, string EstadoRegistro, int UsuarioId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daReplicaProceso odaReplicaProceso = new daReplicaProceso();
					rpta = odaReplicaProceso.actualizarEstado(con, id,EstadoRegistro,UsuarioId);
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
			return (rpta);
		}
	}
}
