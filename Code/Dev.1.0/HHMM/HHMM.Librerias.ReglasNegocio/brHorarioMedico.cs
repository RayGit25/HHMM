using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brHorarioMedico : brGeneral
	{
		public beHorarioListas listarListas(string sucursal)
		{
			beHorarioListas obeHorarioListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					obeHorarioListas = odaHorarioMedico.listarListas(con, sucursal);
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
			return (obeHorarioListas);
		}
		public beHorarioMedicoListas listarHorarios(string sucursal,int mes,int anio)
		{
			beHorarioMedicoListas obeHorarioMedicoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					obeHorarioMedicoListas = odaHorarioMedico.listarHorarios(con, sucursal, mes,anio);
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
			return (obeHorarioMedicoListas);
		}

		public int adicionar(beHorarioMedicoHorario obeHorarioMedicoHorario, int usuario, string sucursal, bool valor1, bool valor2, bool valor3, bool valor4, bool valor5, bool valor6, bool valor7)
		{
			int idMedicoHorario = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					idMedicoHorario = odaHorarioMedico.adicionar(con, obeHorarioMedicoHorario, usuario, sucursal, valor1, valor2, valor3, valor4, valor5, valor6, valor7);
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
			return (idMedicoHorario);
		}

		public int actualizar(beHorarioMedicoHorario obeHorarioMedicoHorario, int usuario, bool valor1, bool valor2, bool valor3, bool valor4, bool valor5, bool valor6, bool valor7)
		{
			int idMedicoHorario = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					idMedicoHorario = odaHorarioMedico.actualizar(con, obeHorarioMedicoHorario, usuario, valor1, valor2, valor3, valor4, valor5, valor6, valor7);
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
			return (idMedicoHorario);
		}

		public bool actualizarEstado(int MedicoHorarioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					exito = odaHorarioMedico.actualizarEstado(con, MedicoHorarioId, EstadoRegistro, UsuarioId);
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

		public beHorarioMedicoExcel cargarHorarios(string lista)
		{
			beHorarioMedicoExcel obeHorarioMedicoExcel = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					obeHorarioMedicoExcel = odaHorarioMedico.cargarHorarios(con, lista);
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
			return obeHorarioMedicoExcel;
		}

		public bool adicionarHorarios(string lista, int usuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					exito = odaHorarioMedico.adicionarHorarios(con, lista, usuarioId);
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
			return exito;
		}

		public beConsultaHorarioMedicoListas listarTurno()
		{
			beConsultaHorarioMedicoListas lista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					lista = odaHorarioMedico.listarTurno(con);
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
			return lista;
		}

		public beHorarioMedicoConsultaVista consultaHorarioMedico(beFrHorarioMedicoConsulta obeFrHorarioMedicoConsulta)
		{
			beHorarioMedicoConsultaVista obj = new beHorarioMedicoConsultaVista();
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					obj = odaHorarioMedico.consultaHorarioMedico(con, obeFrHorarioMedicoConsulta);
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
			return obj;
		}

		public List<beCampoEnteroSolo> ObtenerMedicoEspecialidad( int PersonaId)
		{
			List<beCampoEnteroSolo> lbeCampoEnteroSolo = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daHorarioMedico odaHorarioMedico = new daHorarioMedico();
					lbeCampoEnteroSolo = odaHorarioMedico.ObtenerMedicoEspecialidad(con, PersonaId);
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
			return lbeCampoEnteroSolo;
		}
	}
}
