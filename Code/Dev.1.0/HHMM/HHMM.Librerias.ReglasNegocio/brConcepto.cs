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
	public class brConcepto:brGeneral
	{
		public beConceptoMontoFijoListas listar()
		{
			beConceptoMontoFijoListas obeConceptoMontoFijoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					obeConceptoMontoFijoListas = odaConceptos.listar(con);
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
			return (obeConceptoMontoFijoListas);
		}

		public int adicionar(string Descripcion,bool IndAdm, int UsuarioId)
		{
			int idConcepto = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					idConcepto = odaConceptos.adicionar(con, Descripcion,IndAdm, UsuarioId);
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
			return (idConcepto);
		}

		public bool actualizar(int ConceptoId, string Descripcion,bool IndAdm, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					exito = odaConceptos.actualizar(con, ConceptoId, Descripcion,IndAdm, UsuarioId);
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

		public bool actualizarEstado(int ConceptoId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					exito = odaConceptos.actualizarEstado(con, ConceptoId, EstadoRegistro, UsuarioId);
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

		public int adicionarDetalle(int ConceptoMontoFijoId, int ServicioId, int UsuarioId)
		{
			int idConcepto = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					idConcepto = odaConceptos.adicionarDetalle(con, ConceptoMontoFijoId, ServicioId, UsuarioId);
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
			return (idConcepto);
		}
		public int actualizarDetalle(int ConceptoServicioId, int ServicioId, int UsuarioId)
		{
			int id = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					id = odaConceptos.actualizarDetalle(con, ConceptoServicioId, ServicioId, UsuarioId);
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
			return (id);
		}
		public bool actualizarEstadoDetalle(int ConceptoMontoFijoServicioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConceptos odaConceptos = new daConceptos();
					exito = odaConceptos.actualizarEstadoDetalle(con, ConceptoMontoFijoServicioId, EstadoRegistro, UsuarioId);
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
	}
}
