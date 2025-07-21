using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.ReglasNegocio
{
	public class brMedicoContrato : brGeneral
	{
		public beAsignacionDescuentoVistaLista listarVista(string sup, int pe, int med, DateTime fei, DateTime fef, int EmpresaId, int EspecialidadId)
		{
			beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeAsignacionDescuentoVistaLista = odaMedicoContrato.listarVista(con, sup, pe, med, fei, fef, EmpresaId, EspecialidadId);
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
			return (obeAsignacionDescuentoVistaLista);
		}

		public beMedicoContratoListas listarListas(string sup)
		{
			beMedicoContratoListas obeMedicoContratoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoListas = odaMedicoContrato.listarListas(con, sup);
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
			return (obeMedicoContratoListas);
		}

		public beMedicoContratoListar MedicoContratoListar(int id)
		{
			beMedicoContratoListar obeMedicoContratoListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoListar = odaMedicoContrato.MedicoContratoListar(con, id);
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
			return (obeMedicoContratoListar);
		}

        public string adicionarMedicoContrato(string su, int id, DateTime fecini, DateTime fecfin, string obs, int user, bool indicador)
		{
			//int idMedicoContrato = -1;
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
                    rpta = odaMedicoContrato.adicionarMedicoContrato(con, su, id, fecini, fecfin, obs, user, indicador);
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

		public string actualizarMedicoContrato(int id, DateTime fecini, DateTime fecfin, string obs, int user, string opciones,bool indicador)
		{
			//bool exito = false;
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
                    rpta = odaMedicoContrato.actualizarMedicoContrato(con, id, fecini, fecfin, obs, user, opciones, indicador);
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

		public string actualizarEstadoMedicoContrato(int Id, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					rpta = odaMedicoContrato.actualizarEstadoMedicoContrato(con, Id, EstadoRegistro, UsuarioId);
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

		public int adicionarProduccionFija(beProduccionFija obeProduccionFija,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarProduccionFija(con, obeProduccionFija,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarProduccionEscalonada(beProduccionEscalonada obeProduccionEscalonada,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarProduccionEscalonada(con, obeProduccionEscalonada,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarMonto(beMonto obeMonto,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarMonto(con, obeMonto,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarMedicoContratoHorario(beMedicoContratoHorario obeMedicoContratoHorario,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarMedicoContratoHorario(con, obeMedicoContratoHorario,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarMedicoContratoTurno(beMedicoContratoTurno obeMedicoContratoTurno,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarMedicoContratoTurno(con, obeMedicoContratoTurno,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarContratoCompartido(beContratoCompartido obeContratoCompartido,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarContratoCompartido(con, obeContratoCompartido,indicador);
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
			return (idMedicoContrato);
		}

		public int adicionarMedicoVacuna(beMedicoVacuna obeMedicoVacuna,bool indicador)
		{
			int idMedicoContrato = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContrato = odaMedicoContrato.adicionarMedicoVacuna(con, obeMedicoVacuna,indicador);
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
			return (idMedicoContrato);
		}

		public beProduccionFijaPorId listarProduccionFijaCPorId(int id)
		{
			beProduccionFijaPorId obeProduccionFijaPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeProduccionFijaPorId = odaMedicoContrato.listarProduccionFijaCPorId(con, id);
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
			return (obeProduccionFijaPorId);
		}

		public beProduccionFijaPorId listarProduccionFijaBPorId(int id)
		{
			beProduccionFijaPorId obeProduccionFijaPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeProduccionFijaPorId = odaMedicoContrato.listarProduccionFijaBPorId(con, id);
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
			return (obeProduccionFijaPorId);
		}

		public beProduccionEscalonadaPorId listarProduccionEscalonadaPorId(int id)
		{
			beProduccionEscalonadaPorId obeProduccionEscalonadaPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeProduccionEscalonadaPorId = odaMedicoContrato.listarProduccionEscalonadaPorId(con, id);
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
			return (obeProduccionEscalonadaPorId);
		}

		public beMontoPorId listarMontoPorId(int id)
		{
			beMontoPorId obeMontoPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMontoPorId = odaMedicoContrato.listarMontoPorId(con, id);
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
			return (obeMontoPorId);
		}

		public beMedicoContratoHorarioPorId listarContratoHorarioCPorId(int id)
		{
			beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoHorarioPorId = odaMedicoContrato.listarContratoHorarioCPorId(con, id);
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
			return (obeMedicoContratoHorarioPorId);
		}

		public beMedicoContratoHorarioPorId listarContratoHorarioBPorId(int id)
		{
			beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoHorarioPorId = odaMedicoContrato.listarContratoHorarioBPorId(con, id);
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
			return (obeMedicoContratoHorarioPorId);
		}

		public beMedicoContratoTurnoPorId listarContratoTurnoCPorId(int id)
		{
			beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoTurnoPorId = odaMedicoContrato.listarContratoTurnoCPorId(con, id);
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
			return (obeMedicoContratoTurnoPorId);
		}

		public beMedicoContratoTurnoPorId listarContratoTurnoBPorId(int id)
		{
			beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoContratoTurnoPorId = odaMedicoContrato.listarContratoTurnoBPorId(con, id);
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
			return (obeMedicoContratoTurnoPorId);
		}

		public beContratoCompartidoPorId listarContratoCompartidoPorId(int id)
		{
			beContratoCompartidoPorId obeContratoCompartidoPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeContratoCompartidoPorId = odaMedicoContrato.listarContratoCompartidoPorId(con, id);
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
			return (obeContratoCompartidoPorId);
		}
		public beMedicoVacunaPorId listarVacunaPorId(int id)
		{
			beMedicoVacunaPorId obeMedicoVacunaPorId = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeMedicoVacunaPorId = odaMedicoContrato.listarVacunaPorId(con, id);
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
			return (obeMedicoVacunaPorId);
		}

		public int actualizarProduccionFija(beProduccionFija obeProduccionFija, int id,bool indicador)
		{
			int exito = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarProduccionFija(con, obeProduccionFija, id,indicador);
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

		public bool actualizarProduccionEscalonada(beProduccionEscalonada obeProduccionEscalonada, int id,bool indicador)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarProduccionEscalonada(con, obeProduccionEscalonada, id,indicador);
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

		public int actualizarMonto(beMonto obeMonto, int id,bool indicador)
		{
			int exito = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarMonto(con, obeMonto, id,indicador);
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

		public bool actualizarMedicoContratoHorario(beMedicoContratoHorario obeMedicoContratoHorario, int id,bool indicador)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarMedicoContratoHorario(con, obeMedicoContratoHorario, id,indicador);
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

		public bool actualizarMedicoContratoTurno(beMedicoContratoTurno obeMedicoContratoTurno, int id,bool indicador)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarMedicoContratoTurno(con, obeMedicoContratoTurno, id,indicador);
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

		public bool actualizarContratoCompartido(beContratoCompartido obeContratoCompartido, int id,bool indicador)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarContratoCompartido(con, obeContratoCompartido, id,indicador);
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

		public bool actualizarMedicoVacuna(beMedicoVacuna obeMedicoVacuna, int id,bool indicador)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarMedicoVacuna(con, obeMedicoVacuna, id,indicador);
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

		public List<beMedicoContratoVencer> listarMedicoContratoVencer(string idSucursal, int anio, int mes)
		{
			List<beMedicoContratoVencer> lbeMedicoContrato = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					lbeMedicoContrato = odaMedicoContrato.listarMedicoContratoVencer(con, idSucursal, anio, mes);
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
			return (lbeMedicoContrato);
		}

		public int actualizarEstadoMedicoContratoDetalle(int Id, string EstadoRegistro, int UsuarioId)
		{
			int exito = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarEstadoMedicoContratoDetalle(con, Id, EstadoRegistro, UsuarioId);
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

		public string actualizarEstadoMedicoContratoDetalle2(int Id, string EstadoRegistro, int UsuarioId,bool indicador)
		{
			string rpta="";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					rpta = odaMedicoContrato.actualizarEstadoMedicoContratoDetalle2(con, Id, EstadoRegistro, UsuarioId,indicador);
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

		public beContratoExcel cargarExcel(List<string> listas)
		{
			beContratoExcel obeContratoExcel = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeContratoExcel = odaMedicoContrato.cargarExcel(con, listas);
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
			return (obeContratoExcel);
		}

		public string grabarMedicoContratoCopiar(string SucursalId, int MedicoContratoId, DateTime FecInicio, DateTime FecFin, int UsuarioId, int valorCopiaDoctor,bool indicador)
		{
			//bool exito = false;
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					rpta = odaMedicoContrato.grabarMedicoContratoCopiar(con, SucursalId, MedicoContratoId, FecInicio, FecFin, UsuarioId,valorCopiaDoctor,indicador);
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

		public bool adicionarContratos(string lista1, string lista2, string lista3, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.adicionarContratos(con, lista1, lista2, lista3, UsuarioId);
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

		public int adicionarMedicoContratoAdjuntar(beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			int idMedicoContratoAdjuntar = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContratoAdjuntar = odaMedicoContrato.adicionarMedicoContratoAdjuntar(con, obeMedicoContratoAdjuntar, id);
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
			return (idMedicoContratoAdjuntar);
		}

		public bool actualizarMedicoContratoAdjuntar(beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarMedicoContratoAdjuntar(con, obeMedicoContratoAdjuntar, id);
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

		public bool actualizarEstadoMedicoContratoAdjuntar(int Id, string EstadoRegistro, int UsuarioId, string NombreRepositorio)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarEstadoMedicoContratoAdjuntar(con, Id, EstadoRegistro, UsuarioId, NombreRepositorio);
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
		/*cambio*/
		public bool actualizarEstadoMedicoContratoDetalleAdjuntar(int Id, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.actualizarEstadoMedicoContratoDetalleAdjuntar(con, Id, EstadoRegistro, UsuarioId);
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

		public int adicionarMedicoContratoDetalleAdjuntar(beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			int idMedicoContratoAdjuntar = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContratoAdjuntar = odaMedicoContrato.adicionarMedicoContratoDetalleAdjuntar(con, obeMedicoContratoAdjuntar, id);
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
			return (idMedicoContratoAdjuntar);
		}
		public int adicionarMedicoContratoDetalleImportar(beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			int idMedicoContratoAdjuntar = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContratoAdjuntar = odaMedicoContrato.adicionarMedicoContratoDetalleImportar(con, obeMedicoContratoAdjuntar, id);
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
			return (idMedicoContratoAdjuntar);
		}

		public int actualizarMedicoContratoDetalleImportar(int MedicoContratoId, int UsuarioId)
		{
			int idMedicoContratoAdjuntar = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					idMedicoContratoAdjuntar = odaMedicoContrato.actualizarMedicoContratoDetalleImportar(con, MedicoContratoId, UsuarioId);
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
			return (idMedicoContratoAdjuntar);
		}

		public beCampoEntero obtenerEmpresaNombre(string su, int id)
		{
			beCampoEntero obeCampoEntero = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeCampoEntero = odaMedicoContrato.obtenerEmpresaNombre(con, su, id);
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
			return (obeCampoEntero);
		}

		public List<beExtornoMontoFijo> obtenerExtornoMontoFijo(string su, int id)
		{
			List<beExtornoMontoFijo> lbeExtornoMontoFijo = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					lbeExtornoMontoFijo = odaMedicoContrato.obtenerExtornoMontoFijo(con, su, id);
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
			return (lbeExtornoMontoFijo);
		}

		public string grabarAmpliacion(string listaContratos, string CantidadMes, int UsuarioId)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					rpta = odaMedicoContrato.grabarAmpliacion(con, listaContratos, CantidadMes, UsuarioId);
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
		public beContratoRenovacion grabarRenovacion(string listaContratos, string fechafin, int UsuarioId)

		{
			beContratoRenovacion obeContratoRenovacion = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					obeContratoRenovacion = odaMedicoContrato.grabarRenovacion(con, listaContratos, fechafin, UsuarioId);
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
			return (obeContratoRenovacion);
		}

        public string AutorizacionRechazoContrato(bool cabecera, int id, string estado, int UsuarioId)
        {
            string rpta="";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daMedicoContrato odaMedicoContrato = new daMedicoContrato();
                    rpta = odaMedicoContrato.AutorizacionRechazoContrato(con, cabecera,id,estado,UsuarioId);
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

		public string ListarAutorizacionContratoDetalle(string id,int opcion)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					rpta = odaMedicoContrato.ListarAutorizacionContratoDetalle(con, id,opcion);
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

		public string adicionarContratoDescuento(beContratoDescuento obeContratoDescuento)
		{
			string id = "-1";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					id = odaMedicoContrato.adicionarContratoDescuento(con, obeContratoDescuento);
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
			return id;
		}

		public List<beContratoProduccionDescuentoVista> contratoProduccionFijaDescuentoListar(int id)
		{
			List<beContratoProduccionDescuentoVista> lblbeContratoProduccionDescuentoVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					lblbeContratoProduccionDescuentoVista = odaMedicoContrato.contratoProduccionFijaDescuentoListar(con, id);
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
			return lblbeContratoProduccionDescuentoVista;
		}

		public int contratoProduccionFijaDescuentoActualizarEstado(int usuarioId, int MedicoContratoDetalleId, string estado)
		{
			int exito = -1; ;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoContrato odaMedicoContrato = new daMedicoContrato();
					exito = odaMedicoContrato.contratoProduccionFijaDescuentoActualizarEstado(con, usuarioId, MedicoContratoDetalleId, estado);
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


	}
}
