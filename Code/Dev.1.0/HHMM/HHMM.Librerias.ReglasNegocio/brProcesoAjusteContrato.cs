using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brProcesoAjusteContrato:brGeneral
	{
		public List<beProcesoAjusteContrato> ProcesoAjusteContratoListar(string su, int idMedico, int idEmpresa, string fInicio, string fFin)
		{
			List<beProcesoAjusteContrato> lbeProcesoAjusteContrato = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContrato = odaProcesoAjusteContrato.ProcesoAjusteContratoListar(con, su, idMedico, idEmpresa, fInicio, fFin);
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
			return lbeProcesoAjusteContrato;
		}

		public List<beProcesoAjusteContratoDetalle2> ProcesoAjusteContratoListar2(int id)
		{
			List<beProcesoAjusteContratoDetalle2> lbeProcesoAjusteContratoDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContratoDetalle = odaProcesoAjusteContrato.ProcesoAjusteContratoListar2(con, id);
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
			return lbeProcesoAjusteContratoDetalle;
		}
		public beProcesoAjusteContratoListas ProcesoAjusteContratoListas(string su)
		{
			beProcesoAjusteContratoListas obeProcesoAjusteContratoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					obeProcesoAjusteContratoListas = odaProcesoAjusteContrato.ProcesoAjusteContratoListas(con, su);
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
			return obeProcesoAjusteContratoListas;
		}
		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetalleListar(string su, string periodoInicial, string periodoFinal, int idMedico, int idEmpresa, string fInicio, string fFin, int idServicio, string idComponente)
		{
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContratoDetalle = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleListar(con, su,  periodoInicial,  periodoFinal,  idMedico,  idEmpresa,  fInicio,  fFin,  idServicio,  idComponente);
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
			return lbeProcesoAjusteContratoDetalle;
		}
		public List<beProcesoAjusteContratoDetalle2> ProcesoAjusteContratoDetalleListar2(string su, string oa,int idMedico, int idEmpresa, string fInicio, string fFin, int idServicio, string idComponente,int tipoadmision)
		{
			List<beProcesoAjusteContratoDetalle2> lbeProcesoAjusteContratoDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContratoDetalle = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleListar2(con, su, oa, idMedico, idEmpresa, fInicio, fFin, idServicio, idComponente, tipoadmision);
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
			return lbeProcesoAjusteContratoDetalle;
		}

		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetalleImportarListar(string data,string tipoproceso)
		{
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContratoDetalle = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleImportarListar(con, data,tipoproceso);
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
			return lbeProcesoAjusteContratoDetalle;
		}

		

		public int ProcesoAjusteContratoDetalleAdicionar(string su, string descripcion, int usuarioId, string data)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleAdicionar(con, su, descripcion, usuarioId, data);
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
			return rpta;
		}

		public int ProcesoAjusteContratoDetalleAdicionar2(int id, int usuarioId, string data)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleAdicionar2(con, id, usuarioId, data);
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
			return rpta;
		}


		public int ProcesoAjusteContratoDetalleActualizar(int ProcesoAjusteContratoId,string su, string descripcion, int usuarioId, string data)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteContratoDetalleActualizar(con, ProcesoAjusteContratoId, su, descripcion, usuarioId, data);
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
			return rpta;
		}
		public int ProcesoAjusteContratoActualizarEstado( int ProcesoAjusteContratoId, string Estado, int usuarioId)
		{
			int rpta = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteContratoActualizarEstado(con, ProcesoAjusteContratoId, Estado, usuarioId);
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
			return rpta;
		}

		public string ProcesoAjusteContratoCalcular(int ProcesoAjusteContratoId, int usuarioId, string sucursal, string lista)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteContratoCalcular(con, ProcesoAjusteContratoId, usuarioId, sucursal,lista);
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
			return rpta;
		}

		public string ProcesoAjusteExcelValidar(string lista, string tipoproceso,int id)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					rpta = odaProcesoAjusteContrato.ProcesoAjusteExcelValidar(con, lista, tipoproceso,id);
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
			return rpta;
		}
		

		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetallePorId( int id)
		{
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProcesoAjusteContrato odaProcesoAjusteContrato = new daProcesoAjusteContrato();
					lbeProcesoAjusteContratoDetalle = odaProcesoAjusteContrato.ProcesoAjusteContratoDetallePorId(con, id);
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
			return lbeProcesoAjusteContratoDetalle;
		}
	}
}
