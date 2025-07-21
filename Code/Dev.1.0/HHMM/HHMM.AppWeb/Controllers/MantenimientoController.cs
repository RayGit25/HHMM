using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using HHMM.Librerias.EntidadesNegocio;
using HHMM.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.AppWeb.Filter;
using System.Text;
using io = System.IO;
using System.IO.Compression;
using System.Xml;
using webdown = System.Web;

namespace HHMM.AppWeb.Controllers
{
	[frSeguridad]
	public class MantenimientoController : Controller
	{

		string versionJS = ConfigurationManager.AppSettings["VersionJS"];
		public ActionResult FeriadosLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarFeriado(string ss, string sucursal)
		{
			string rpta = "";
			brFeriado obrFeriado = new brFeriado();
			beFeriadoVistaLista obeFeriadoVistaLista = obrFeriado.listar(sucursal);
			string listaFeriado = "";

			if (obeFeriadoVistaLista != null)
			{
				if (obeFeriadoVistaLista.ListaFeriado != null && obeFeriadoVistaLista.ListaFeriado.Count > 0)
				{
					listaFeriado = ucCustomSerializer.Serializar(obeFeriadoVistaLista.ListaFeriado, '¦', '¯', false, "");
				}
			}
			rpta = String.Format("{0}", listaFeriado);
			return rpta;
		}

		public string grabarFeriado(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strFeriado = Encoding.UTF8.GetString(buffer);
					string[] Feriados = strFeriado.Split('|');
					beFeriado obeFeriado = new beFeriado();
					if (Feriados[0] == "1")
					{
						obeFeriado.Fecha = DateTime.Parse(Feriados[1]);
						obeFeriado.Descripcion = Feriados[2];
						obeFeriado.SucursalId = Feriados[3];
						obeFeriado.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
						brFeriado obrFeriado = new brFeriado();
						int idFeriado = obrFeriado.adicionar(obeFeriado);
						if (idFeriado > -1)
						{
							string listaFeriado = listarFeriado(ss, Feriados[3]);
							rpta = string.Format("{0}¬1", listaFeriado);
						}
					}
					else
					{
						obeFeriado.FeriadoId = int.Parse(Feriados[4]);
						obeFeriado.Fecha = DateTime.Parse(Feriados[1]);
						obeFeriado.Descripcion = Feriados[2];
						obeFeriado.UsuarioModificadorId = obeUsuarioLogin.UsuarioId;
						brFeriado obrFeriado = new brFeriado();
						bool exito = obrFeriado.actualizar(obeFeriado);
						if (exito)
						{
							string listaFeriado = listarFeriado(ss, Feriados[3]);
							rpta = string.Format("{0}¬2", listaFeriado);
						}
					}
				}
			}
			return rpta;
		}

		public string anularFeriado(string ss, int id, string est, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brFeriado obrFeriado = new brFeriado();
				bool exito = obrFeriado.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					string listaFeriado = listarFeriado(ss, su);
					rpta = string.Format("{0}¬3", listaFeriado);
				}
			}
			return rpta;
		}

		public string copiarFeriado(string ss, int ani, int anf, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brFeriado obrFeriado = new brFeriado();
				bool exito = obrFeriado.copiarFeriado(ani, anf, obeUsuarioLogin.UsuarioId,su);
				if (exito)
				{
					string listaFeriado = listarFeriado(ss, su);
					rpta = string.Format("{0}¬4", listaFeriado);
				}
			}
			return rpta;
		}

		public ActionResult TipoDescuentoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarTipoDescuento(string ss)
		{
			string rpta = "";
			brTipoDescuento obrTipoDescuento = new brTipoDescuento();
			beTipoDescuentoLista obeTipoDescuentoLista = obrTipoDescuento.listar();
			string listaTipoDescuento = "";

			if (obeTipoDescuentoLista != null)
			{
				if (obeTipoDescuentoLista.ListaTipoDescuento != null && obeTipoDescuentoLista.ListaTipoDescuento.Count > 0)
				{
					string archivo = Server.MapPath("~//Files//EstTipoDescuento.txt");
					listaTipoDescuento = ucCustomSerializer.Serializar(obeTipoDescuentoLista.ListaTipoDescuento, '¦', '¯', false, archivo);
				}
			}
			rpta = String.Format("{0}", listaTipoDescuento);
			return rpta;
		}

		public string grabarTipoDescuento(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strTipo = Encoding.UTF8.GetString(buffer);
					string[] Tipo = strTipo.Split('|');
					beTipoDescuento obeTipoDescuento = new beTipoDescuento();
					if (Tipo[0] == "1")
					{
						obeTipoDescuento.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
						obeTipoDescuento.Descripcion = Tipo[1];
						brTipoDescuento obrTipoDescuento = new brTipoDescuento();
						int idTipo = obrTipoDescuento.adicionar(obeTipoDescuento);
						if (idTipo > -1)
						{
							string listaTipoDescuento = listarTipoDescuento(ss);
							rpta = string.Format("{0}¬1", listaTipoDescuento);
						}
					}
					else
					{
						obeTipoDescuento.TipoDescuentoId = int.Parse(Tipo[2]);
						obeTipoDescuento.Descripcion = Tipo[1];
						obeTipoDescuento.UsuarioModificadorId = obeUsuarioLogin.UsuarioId;
						brTipoDescuento obrTipoDescuento = new brTipoDescuento();
						bool exito = obrTipoDescuento.actualizar(obeTipoDescuento);
						if (exito)
						{
							string listaTipoDescuento = listarTipoDescuento(ss);
							rpta = string.Format("{0}¬2", listaTipoDescuento);
						}
					}
				}
			}
			return rpta;
		}

		public string anularTipoDescuento(string ss, int id, string est)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brTipoDescuento obrTipoDescuento = new brTipoDescuento();
				bool exito = obrTipoDescuento.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					string listaTipoDescuento = listarTipoDescuento(ss);
					rpta = string.Format("{0}¬3", listaTipoDescuento);
				}
			}
			return rpta;
		}

		public ActionResult DescuentosLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarDescuentosListas(string ss)
		{
			string rpta = "";
			brDescuento obrDescuento = new brDescuento();
			List<beCampoEntero> lbeTipoDescuento = obrDescuento.listas();
			if (lbeTipoDescuento != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeTipoDescuento, '¦', '¯', false, "");
			}
			return rpta;
		}

		public string listarDescuentos(string ss)
		{
			string rpta = "";
			if (Request.InputStream != null)
			{
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);
				string strDescuento = Encoding.UTF8.GetString(buffer);
				string[] Descuento = strDescuento.Split('|');
				brDescuento obrDescuento = new brDescuento();
				beDescuentoVista obeDescuentoVista = obrDescuento.listar((Descuento[0] == "") ? 0 : int.Parse(Descuento[0]), Descuento[1], (Descuento[2] == "") ? 0 : int.Parse(Descuento[2]));
				if (obeDescuentoVista != null)
				{
					if (obeDescuentoVista.ListaDescuento != null && obeDescuentoVista.ListaDescuento.Count > 0)
					{
						rpta = ucCustomSerializer.Serializar(obeDescuentoVista.ListaDescuento, '¦', '¯', false, "");
					}
				}

			}
			return rpta;
		}

		public string grabarDescuento(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strDescuento = Encoding.UTF8.GetString(buffer);
					string[] Descuento = strDescuento.Split('|');
					beDescuento obeDescuento = new beDescuento();
					if (Descuento[0] == "1")
					{
						obeDescuento.Descripcion = Descuento[1];
						obeDescuento.TipoDescuentoId = int.Parse(Descuento[2]);
						obeDescuento.TipoMonto = Descuento[3];
						obeDescuento.IndicadorFacturable = bool.Parse(Descuento[4]);
						obeDescuento.ComponenteId = Descuento[5];
						obeDescuento.PlanCuentaContableId = Descuento[6];
						obeDescuento.CentroCostoId = Descuento[7];
						obeDescuento.ClasificadorMovimientoId = Descuento[8];
						brDescuento obrDescuento = new brDescuento();
						int idDescuento = obrDescuento.adicionar(obeDescuento, obeUsuarioLogin.UsuarioId);
						if (idDescuento > -1)
						{
							rpta = "1";
						}
					}
					else
					{
						obeDescuento.Descripcion = Descuento[1];
						obeDescuento.TipoDescuentoId = int.Parse(Descuento[2]);
						obeDescuento.TipoMonto = Descuento[3];
						obeDescuento.IndicadorFacturable = bool.Parse(Descuento[4]);
						obeDescuento.ComponenteId = Descuento[5];
						obeDescuento.PlanCuentaContableId = Descuento[6];
						obeDescuento.CentroCostoId = Descuento[7];
						obeDescuento.ClasificadorMovimientoId = Descuento[8];
						obeDescuento.DescuentoId = int.Parse(Descuento[9]);
						brDescuento obrDescuento = new brDescuento();
						bool exito = obrDescuento.actualizar(obeDescuento, obeUsuarioLogin.UsuarioId);
						if (exito)
						{
							rpta = "2";
						}
					}
				}
			}
			return rpta;
		}

		public string anularDescuento(string ss, int id, string est)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brDescuento obrDescuento = new brDescuento();
				bool exito = obrDescuento.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					rpta = "3";
				}
			}
			return rpta;
		}

		public ActionResult CuentaProvisionPagoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listasCuentaProvisionPago(string ss)
		{
			string rpta = "";
			brCuentaProvisionPago obrCuentaProvisionPago = new brCuentaProvisionPago();
			beCuentaProvisionPagoListas obeCuentaProvisionPagoListas = obrCuentaProvisionPago.listarListas();
			string ListaServicio = "";
			string ListaTipoAdmision = "";
			string ListaMoneda = "";
			string ListaEspecialidad = "";
			string ListaClasificadorMovimiento = "";
			string ListaConfiguracionPago = "";
			string ListaUnidadMedica = "";
			string ListaConcepto = "";
			string listaTipoPaciente = "";
			if (obeCuentaProvisionPagoListas != null)
			{
				if (obeCuentaProvisionPagoListas.ListaServicio != null && obeCuentaProvisionPagoListas.ListaServicio.Count > 0)
				{
					ListaServicio = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaServicio, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaTipoAdmision != null && obeCuentaProvisionPagoListas.ListaTipoAdmision.Count > 0)
				{
					ListaTipoAdmision = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaTipoAdmision, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaMoneda != null && obeCuentaProvisionPagoListas.ListaMoneda.Count > 0)
				{
					ListaMoneda = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaMoneda, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaEspecialidad != null && obeCuentaProvisionPagoListas.ListaEspecialidad.Count > 0)
				{
					ListaEspecialidad = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaEspecialidad, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaClasificadorMovimiento != null && obeCuentaProvisionPagoListas.ListaClasificadorMovimiento.Count > 0)
				{
					ListaClasificadorMovimiento = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaClasificadorMovimiento, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaConfiguracionPago != null && obeCuentaProvisionPagoListas.ListaConfiguracionPago.Count > 0)
				{
					ListaConfiguracionPago = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaConfiguracionPago, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaUnidadMedica != null && obeCuentaProvisionPagoListas.ListaUnidadMedica.Count > 0)
				{
					ListaUnidadMedica = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaUnidadMedica, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.ListaConcepto != null && obeCuentaProvisionPagoListas.ListaConcepto.Count > 0)
				{
					ListaConcepto = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.ListaConcepto, '¦', '¯', false, "");
				}
				if (obeCuentaProvisionPagoListas.listaTipoPaciente != null && obeCuentaProvisionPagoListas.listaTipoPaciente.Count > 0)
				{
					listaTipoPaciente = ucCustomSerializer.Serializar(obeCuentaProvisionPagoListas.listaTipoPaciente, '¦', '¯', false, "");
				}
			}
			rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}¬{6}¬{7}¬{8}", ListaServicio, ListaTipoAdmision, ListaMoneda, ListaEspecialidad, ListaClasificadorMovimiento, ListaConfiguracionPago, ListaUnidadMedica, ListaConcepto, listaTipoPaciente);
			return rpta;
		}

		public string listarCuentaProvisionPago(string ss)
		{
			string rpta = "";
			if (Request.InputStream != null)
			{
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);
				string strCuenta = Encoding.UTF8.GetString(buffer);
				string[] Cuenta = strCuenta.Split('|');
				brCuentaProvisionPago obrCuentaProvisionPago = new brCuentaProvisionPago();
				beCuentaProvisionPagoVistaLista obeCuentaProvisionPagoVistaLista = obrCuentaProvisionPago.listarVista(Cuenta[0], (Cuenta[1] == "") ? 0 : int.Parse(Cuenta[1]), (Cuenta[2] == "") ? 0 : int.Parse(Cuenta[2]), Cuenta[3], Cuenta[4], Cuenta[5], Cuenta[6]);
				if (obeCuentaProvisionPagoVistaLista != null)
				{
					if (obeCuentaProvisionPagoVistaLista.ListaCuentaProvisionPago != null && obeCuentaProvisionPagoVistaLista.ListaCuentaProvisionPago.Count > 0)
					{
						rpta = ucCustomSerializer.Serializar(obeCuentaProvisionPagoVistaLista.ListaCuentaProvisionPago, '¦', '¯', false);
					}
				}
			}
			return rpta;
		}

		public string grabarCuentaProvisionPago(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strCuenta = Encoding.UTF8.GetString(buffer);
					string[] Cuenta = strCuenta.Split('|');
					beCuentaProvisionPago obeCuentaProvisionPago = new beCuentaProvisionPago();

					obeCuentaProvisionPago.SucursalId = Cuenta[1];
					obeCuentaProvisionPago.TipoAsiento = Cuenta[2];
					obeCuentaProvisionPago.ServicioId = (Cuenta[3] == "") ? 0 : int.Parse(Cuenta[3]);
					obeCuentaProvisionPago.MonedaId = Cuenta[4];
					obeCuentaProvisionPago.EspecialidadId = (Cuenta[5] == "") ? 0 : int.Parse(Cuenta[5]);
					//obeCuentaProvisionPago.IndicadorVinculada = bool.Parse(Cuenta[6]); ;
					obeCuentaProvisionPago.TipoAdmisionId = (Cuenta[7] == "") ? 0 : int.Parse(Cuenta[7]);
					obeCuentaProvisionPago.ClasificadorMovimientoId = Cuenta[8];
					obeCuentaProvisionPago.TipoComponente = Cuenta[9];
					obeCuentaProvisionPago.ComponenteId = (Cuenta[9] == "A") ? "" : Cuenta[10];
					obeCuentaProvisionPago.ArticuloId = (Cuenta[9] == "A") ? Cuenta[10] : "";
					obeCuentaProvisionPago.PlanCuentaSVCostoId = Cuenta[11];
					obeCuentaProvisionPago.PlanCuentaSVProveedorId = Cuenta[12];
					obeCuentaProvisionPago.PlanCuentaSVClienteId = Cuenta[13];
					obeCuentaProvisionPago.PlanCuentaNVCostoId = Cuenta[14];
					obeCuentaProvisionPago.PlanCuentaNVProveedorId = Cuenta[15];
					obeCuentaProvisionPago.PlanCuentaNVClienteId = Cuenta[16];
					obeCuentaProvisionPago.TipoPacienteId = (Cuenta[17] == "") ? 0 : int.Parse(Cuenta[17]);
					obeCuentaProvisionPago.TipoPersona = (Cuenta[18] == "") ? "" : Cuenta[18];

					obeCuentaProvisionPago.IndicadorProduccion = String.IsNullOrEmpty(Cuenta[19]) ? false : Convert.ToBoolean(int.Parse(Cuenta[21]));
					obeCuentaProvisionPago.IndicadorCompartido = String.IsNullOrEmpty(Cuenta[20]) ? false : Convert.ToBoolean(int.Parse(Cuenta[20]));
					obeCuentaProvisionPago.IndicadorMontoFijo = String.IsNullOrEmpty(Cuenta[21]) ? false : Convert.ToBoolean(int.Parse(Cuenta[21]));
					obeCuentaProvisionPago.IndicadorEscalonado = String.IsNullOrEmpty(Cuenta[22]) ? false : Convert.ToBoolean(int.Parse(Cuenta[22]));
					obeCuentaProvisionPago.IndicadorHorario = String.IsNullOrEmpty(Cuenta[23]) ? false : Convert.ToBoolean(int.Parse(Cuenta[23]));
					obeCuentaProvisionPago.IndicadorTurno = String.IsNullOrEmpty(Cuenta[24]) ? false : Convert.ToBoolean(int.Parse(Cuenta[24]));
					obeCuentaProvisionPago.IndicadorVacuna = String.IsNullOrEmpty(Cuenta[25]) ? false : Convert.ToBoolean(int.Parse(Cuenta[25]));
					obeCuentaProvisionPago.ConceptoMontoFijoId = (Cuenta[26] == "") ? 0 : int.Parse(Cuenta[26]);
					obeCuentaProvisionPago.UnidadMedicaId = (Cuenta[27] == "") ? 0 : int.Parse(Cuenta[27]);

					brCuentaProvisionPago obrCuentaProvisionPago = new brCuentaProvisionPago();
					if (Cuenta[0] == "1")
					{
						int idCuenta = obrCuentaProvisionPago.adicionar(obeCuentaProvisionPago, obeUsuarioLogin.UsuarioId);
						if (idCuenta > -1)
						{
							rpta = "1";
						}
						else {
							rpta = "-1";
						}
					}
					else
					{
						obeCuentaProvisionPago.CuentaProvisionPagoId = int.Parse(Cuenta[28]);
						bool exito = obrCuentaProvisionPago.actualizar(obeCuentaProvisionPago, obeUsuarioLogin.UsuarioId);
						if (exito)
						{
							rpta = "2";
						}
					}
				}
			}
			return rpta;
		}

		public string anularCuentaProvisionPago(string ss, string id, string est)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brCuentaProvisionPago obrCuentaProvisionPago = new brCuentaProvisionPago();
				bool exito = obrCuentaProvisionPago.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					rpta = "3";
				}
			}
			return rpta;
		}

		public ActionResult HorarioMedicoLista(string ss, int id)
		{
			AdministracionController Administracion = new AdministracionController();
			beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
			ViewBag.seguridad = (obeUsuarioLogin == null ? "" : Administracion.obtenerMenuAccion(id, obeUsuarioLogin.PerfilId).ToString());
			ViewBag.versionJS = versionJS;
			ViewBag.idSeguridad = id;
			//ViewBag.rutaArchivo = obeUsuarioLogin.IdCompania.Equals("000000") ? "Files/Formato%20de%20Horarios.xlsx" : "Files/Formato%20de%20Horarios%20CSB.xlsx";
			ViewBag.rutaArchivo = "Files/Formato%20de%20Horarios.xlsx";
			return View();
		}

		public string listasHorarioMedico(string ss, string su)
		{
			string rpta = "";
			brHorarioMedico obrHorarioMedico = new brHorarioMedico();
			beHorarioListas obeHorarioListas = obrHorarioMedico.listarListas(su);
			string ListaConsultorio = "";
			string ListaTipoAtencion = "";
			string ListaEspecialidad = "";
			string ListaTurno = "";
			string ListaSucursal = "";
			string ListaMedico = "";
			string ListaUnidadMedica = "";
			string ListaMedicoEmpresaSucursal = "";
			if (obeHorarioListas != null)
			{
				if (obeHorarioListas.ListaConsultorio != null && obeHorarioListas.ListaConsultorio.Count > 0)
				{
					ListaConsultorio = ucCustomSerializer.Serializar(obeHorarioListas.ListaConsultorio, '¦', '¯', false, "");
				}

				if (obeHorarioListas.ListaTipoAtencion != null && obeHorarioListas.ListaTipoAtencion.Count > 0)
				{
					ListaTipoAtencion = ucCustomSerializer.Serializar(obeHorarioListas.ListaTipoAtencion, '¦', '¯', false, "");
				}

				if (obeHorarioListas.ListaEspecialidad != null && obeHorarioListas.ListaEspecialidad.Count > 0)
				{
					ListaEspecialidad = ucCustomSerializer.Serializar(obeHorarioListas.ListaEspecialidad, '¦', '¯', false, "");
				}

				if (obeHorarioListas.ListaTurno != null && obeHorarioListas.ListaTurno.Count > 0)
				{
					ListaTurno = ucCustomSerializer.Serializar(obeHorarioListas.ListaTurno, '¦', '¯', false, "");
				}
				if (obeHorarioListas.ListaSucursal != null && obeHorarioListas.ListaSucursal.Count > 0)
				{
					ListaSucursal = ucCustomSerializer.Serializar(obeHorarioListas.ListaSucursal, '¦', '¯', false, "");
				}
				if (obeHorarioListas.ListaMedico != null && obeHorarioListas.ListaMedico.Count > 0)
				{
					ListaMedico = ucCustomSerializer.Serializar(obeHorarioListas.ListaMedico, '¦', '¯', false, "");
				}
				if (obeHorarioListas.ListaUnidadMedica != null && obeHorarioListas.ListaUnidadMedica.Count > 0)
				{
					ListaUnidadMedica = ucCustomSerializer.Serializar(obeHorarioListas.ListaUnidadMedica, '¦', '¯', false, "");
				}
				if (obeHorarioListas.ListaMedicoEmpresaSucursal != null && obeHorarioListas.ListaMedicoEmpresaSucursal.Count > 0)
				{
					ListaMedicoEmpresaSucursal = ucCustomSerializer.Serializar(obeHorarioListas.ListaMedicoEmpresaSucursal, '¦', '¯', false, "");
				}

			}
			rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}¬{6}¬{7}", ListaConsultorio, ListaTipoAtencion, ListaEspecialidad, ListaTurno, ListaSucursal, ListaMedico, ListaUnidadMedica, ListaMedicoEmpresaSucursal);
			return rpta;
		}

		public string listarHorarioMedico(string ss, string su, int mes, int anio)
		{
			string rpta = "";
			brHorarioMedico obrHorarioMedico = new brHorarioMedico();
			beHorarioMedicoListas obeHorarioMedicoListas = obrHorarioMedico.listarHorarios(su, mes, anio);
			string ListaHorario = "";
			if (obeHorarioMedicoListas != null)
			{
				if (obeHorarioMedicoListas.ListaHorario != null && obeHorarioMedicoListas.ListaHorario.Count > 0)
				{
					ListaHorario = ucCustomSerializer.Serializar(obeHorarioMedicoListas.ListaHorario, '¦', '¯', false, "", false, true, false);
				}
			}
			rpta = String.Format("{0}", ListaHorario);
			return rpta;
		}

		public string grabarHorarioMedico(string ss, string su, string supr)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strHorario = Encoding.UTF8.GetString(buffer);
					string[] Horario = strHorario.Split('|');
					beHorarioMedicoHorario obeHorarioMedicoHorario = new beHorarioMedicoHorario();
					if (Horario[0] == "1")
					{
						obeHorarioMedicoHorario.PersonaId = int.Parse(Horario[1]);
						obeHorarioMedicoHorario.TipoRegistroHorario = Horario[2];
						obeHorarioMedicoHorario.FechaHoraInicio = DateTime.Parse(Horario[3]);
						obeHorarioMedicoHorario.FechaHoraFin = DateTime.Parse(Horario[4]);
						obeHorarioMedicoHorario.TurnoId = int.Parse(Horario[5]);
						obeHorarioMedicoHorario.TipoAtencionId = (Horario[6] == "" ? 0 : int.Parse(Horario[6]));
						obeHorarioMedicoHorario.EspecialidadId = (Horario[7] == "" ? 0 : int.Parse(Horario[7]));
						obeHorarioMedicoHorario.ConsultorioId = (Horario[8] == "" ? 0 : int.Parse(Horario[8]));
						bool valor1 = (Horario[9] == "true") ? true : false;
						bool valor2 = (Horario[10] == "true") ? true : false;
						bool valor3 = (Horario[11] == "true") ? true : false;
						bool valor4 = (Horario[12] == "true") ? true : false;
						bool valor5 = (Horario[13] == "true") ? true : false;
						bool valor6 = (Horario[14] == "true") ? true : false;
						bool valor7 = (Horario[15] == "true") ? true : false;
						obeHorarioMedicoHorario.UnidadMedicaId = (Horario[16] == "" ? 0 : int.Parse(Horario[16]));
						brHorarioMedico obrHorarioMedico = new brHorarioMedico();
						int idHorarioMedico = obrHorarioMedico.adicionar(obeHorarioMedicoHorario, obeUsuarioLogin.UsuarioId, su, valor1, valor2, valor3, valor4, valor5, valor6, valor7);
						if (idHorarioMedico > -1)
						{
							int mes = int.Parse(Horario[17]);
							int anio = int.Parse(Horario[18]);
							string listaHorarioMedico = listarHorarioMedico(ss, supr, mes, anio);
							rpta = string.Format("{0}¬1", listaHorarioMedico);
						}
						else
						{
							rpta = string.Format("{0}", idHorarioMedico);
						}
					}
					else
					{
						obeHorarioMedicoHorario.MedicoHorarioId = int.Parse(Horario[19]);
						obeHorarioMedicoHorario.PersonaId = int.Parse(Horario[1]);
						obeHorarioMedicoHorario.TipoRegistroHorario = Horario[2];
						obeHorarioMedicoHorario.FechaHoraInicio = DateTime.Parse(Horario[3]);
						obeHorarioMedicoHorario.FechaHoraFin = DateTime.Parse(Horario[4]);
						obeHorarioMedicoHorario.TurnoId = int.Parse(Horario[5]);
						obeHorarioMedicoHorario.TipoAtencionId = (Horario[6] == "" ? 0 : int.Parse(Horario[6]));
						obeHorarioMedicoHorario.EspecialidadId = (Horario[7] == "" ? 0 : int.Parse(Horario[7]));
						obeHorarioMedicoHorario.ConsultorioId = (Horario[8] == "" ? 0 : int.Parse(Horario[8]));
						bool valor1 = (Horario[9] == "true") ? true : false;
						bool valor2 = (Horario[10] == "true") ? true : false;
						bool valor3 = (Horario[11] == "true") ? true : false;
						bool valor4 = (Horario[12] == "true") ? true : false;
						bool valor5 = (Horario[13] == "true") ? true : false;
						bool valor6 = (Horario[14] == "true") ? true : false;
						bool valor7 = (Horario[15] == "true") ? true : false;
						obeHorarioMedicoHorario.UnidadMedicaId = (Horario[16] == "" ? 0 : int.Parse(Horario[16]));
						brHorarioMedico obrHorarioMedico = new brHorarioMedico();
						int idHorarioMedico = obrHorarioMedico.actualizar(obeHorarioMedicoHorario, obeUsuarioLogin.UsuarioId, valor1, valor2, valor3, valor4, valor5, valor6, valor7);
						if (idHorarioMedico > -1)
						{
							int mes = int.Parse(Horario[17]);
							int anio = int.Parse(Horario[18]);
							string listaHorarioMedico = listarHorarioMedico(ss, supr, mes, anio);
							rpta = string.Format("{0}¬2", listaHorarioMedico);
						}
						else
						{
							rpta = string.Format("{0}", idHorarioMedico);
						}
					}
				}
			}
			return rpta;
		}

		public string anularHorarioMedico(string ss, int id, string est, string su, int mes, int anio)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brHorarioMedico obrHorarioMedico = new brHorarioMedico();
				bool exito = obrHorarioMedico.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					string listaHorarioMedico = listarHorarioMedico(ss, su, mes, anio);
					rpta = string.Format("{0}¬3", listaHorarioMedico);
				}
			}
			return rpta;
		}

		public string leerArchivoExcel()
		{
			string rpta = "";
			string contenido = "";
			StringBuilder sb = new StringBuilder();
			string contenidoFila = "";
			int nRegistros = 0;
			List<string> hojas = new List<string>();
			HttpPostedFileBase hpfb = (HttpPostedFileBase)Request.Files["archivo"];
			List<XmlDocument> docs = new List<XmlDocument>();
			List<string> nombres = new List<string>();
			List<string> valores = new List<string>();
			List<string> columnas = new List<string>();
			//Descomprimir el archivo Excel y guardar solo los archivos xml necesarios
			//en una Lista de objetos de tipo XmlDocument
			using (var zip = new ZipArchive(hpfb.InputStream, ZipArchiveMode.Read))
			{
				XmlDocument doc;
				foreach (var archivoXml in zip.Entries)
				{
					if (archivoXml.Name == "workbook.xml" || archivoXml.Name == "sharedStrings.xml" || archivoXml.Name.StartsWith("sheet") && io.Path.GetExtension(archivoXml.Name) == ".xml")
					{
						using (io.Stream stream = archivoXml.Open())
						{
							doc = new XmlDocument();
							doc.Load(stream);
							docs.Add(doc);
							nombres.Add(archivoXml.Name);
						}
					}
				}
			}
			if (docs.Count > 0)
			{
				//Leer el archivo xml donde se guardan los datos de tipo cadena
				int pos = nombres.IndexOf("sharedStrings.xml");
				if (pos > -1)
				{
					XmlDocument xdStrings = docs[pos];
					XmlElement nodoRaizStrings = xdStrings.DocumentElement;
					XmlNodeList nodosValores = nodoRaizStrings.ChildNodes;
					if (nodosValores != null)
					{
						foreach (XmlNode nodoValor in nodosValores)
						{
							valores.Add(nodoValor.FirstChild.FirstChild.Value);
						}
					}
				}
				//Leer el archivo xml workbook donde se guardan la lista de hojas
				pos = nombres.IndexOf("workbook.xml");
				if (pos > -1)
				{
					XmlDocument xdLibro = docs[pos];
					XmlElement nodoRaizHojas = xdLibro.DocumentElement;
					XmlNodeList nodosHojas = nodoRaizHojas.GetElementsByTagName("sheet");
					string id, hoja;
					if (nodosHojas != null)
					{
						contenido = "";
						int ch = 0;
						foreach (XmlNode nodoHoja in nodosHojas)
						{
							id = nodoHoja.Attributes["r:id"].Value.Replace("rId", "");
							hoja = nodoHoja.Attributes["name"].Value;
							//Leer cada archivo xml con la hoja
							pos = nombres.IndexOf("sheet" + id + ".xml");
							if (pos > -1)
							{
								XmlDocument xdHoja = docs[pos];
								XmlElement nodoRaizHoja = xdHoja.DocumentElement;
								XmlNodeList nodosFilas = nodoRaizHoja.GetElementsByTagName("row");

								int indice;
								string celda, valor;
								XmlAttribute tipoString;
								contenido = "";
								int cf = 0; //contador de filas
								int cc = 0; //contador de columnas
								XmlNode nodoCelda = null;
								if (nodosFilas != null)
								{
									foreach (XmlNode nodoFila in nodosFilas)
									{
										XmlNodeList nodoCeldas = nodoFila.ChildNodes;
										if (nodoCeldas != null)
										{
											if (cf == 0)
											{
												columnas = new List<string>();
												nRegistros = nodoCeldas.Count;
												for (int i = 0; i < nRegistros; i++)
												{
													columnas.Add(nodoCeldas[i].Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""));
												}
											}
											else
											{
												cc = 0;
												contenidoFila = "";
												nRegistros = columnas.Count;
												for (int i = 0; i < nRegistros; i++)
												{
													nodoCelda = nodoCeldas[cc];
													if (cc > 0) contenidoFila += "¦";
													if (nodoCelda != null)
													{
														if (columnas[i] == nodoCelda.Attributes["r"].Value.Replace(nodoFila.Attributes["r"].Value, ""))
														{
															celda = nodoCelda.Attributes["r"].Value;
															tipoString = nodoCelda.Attributes["t"];
															valor = "";
															if (tipoString != null)
															{
																if (valores != null && valores.Count > 0)
																{
																	indice = int.Parse(nodoCelda.FirstChild.FirstChild.Value);
																	valor = valores[indice];
																	contenidoFila += valor;
																}
															}
															else
															{
																if (nodoCelda.FirstChild != null && nodoCelda.FirstChild.FirstChild != null)
																{
																	valor = nodoCelda.FirstChild.FirstChild.Value;
																	contenidoFila += valor;
																}
															}
															cc++;
														}
													}
												}
												if (cf < nodosFilas.Count - 1) contenidoFila += "¬";
												contenido += contenidoFila;
											}
										}
										cf++;
									}
								}
								hojas.Add(contenido);
								//sb.AppendLine(contenido);
							}
							ch++;
						}
					}
				}
			}
			//rpta = sb.ToString();
			brHorarioMedico obrHorarioMedico = new brHorarioMedico();
			beHorarioMedicoExcel obeHorarioMedicoExcel = obrHorarioMedico.cargarHorarios(hojas[0]);
			string lista1 = "";
			string lista2 = "";
			if (obeHorarioMedicoExcel != null)
			{
				lista1 = ucCustomSerializer.Serializar(obeHorarioMedicoExcel.Lista1, '¦', '¬', false, "");
				lista2 = ucCustomSerializer.Serializar(obeHorarioMedicoExcel.Lista2, '¦', '¬', false, "");
			}
			rpta = String.Format("{0}¯{1}", lista1, lista2);
			return rpta;
		}

		public string adicionarCargaHorarios(string ss, string lista)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin usuario = (beUsuarioLogin)Session["Usuario" + ss];
				brHorarioMedico obrHorarioMedico = new brHorarioMedico();
				bool exito = obrHorarioMedico.adicionarHorarios(lista, usuario.UsuarioId);
				if (exito) rpta = "1";
			}
			return rpta;
		}

		public ActionResult ComponenteLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarComponente(string ss, string su)
		{
			string rpta = "";
			brComponente obrComponente = new brComponente();
			List<beCampoCadenaCorto> obeComponente = obrComponente.listar(su);
			if (obeComponente != null)
			{
				rpta = ucCustomSerializer.Serializar(obeComponente, '¦', '¯', false, "");
			}
			return rpta;
		}

		public ActionResult PlanCuentaContableLista(string pos = null)
		{
			ViewBag.Orden = pos;
			ViewBag.versionJS = versionJS;
			return View();
		}

		public ActionResult CentroCostoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public ActionResult ClasificadorMovimientoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarCuenta(string ss)
		{
			string rpta = "";
			brPlanCuentaContable obrPlanCuentaContable = new brPlanCuentaContable();
			List<beCampoCadenaCorto> obePlanCuentaContable = obrPlanCuentaContable.listar();
			if (obePlanCuentaContable != null)
			{
				rpta = ucCustomSerializer.Serializar(obePlanCuentaContable, '¦', '¯', false, "");
			}
			return rpta;
		}
		//ad1
		public string listarCentroCosto(string ss)
		{
			string rpta = "";
			brCentroCosto obrCentroCosto = new brCentroCosto();
			List<beCampoCadenaCorto> obeCentroCosto = obrCentroCosto.listar();
			if (obeCentroCosto != null)
			{
				rpta = ucCustomSerializer.Serializar(obeCentroCosto, '¦', '¯', false, "");
			}
			return rpta;
		}
		//ad2
		public string listarClasificadorMovimiento(string ss)
		{
			string rpta = "";
			brClasificadorMovimiento obrClasificadorMovimiento = new brClasificadorMovimiento();
			List<beCampoCadenaCorto> obeClasificadorMovimiento = obrClasificadorMovimiento.listar();
			if (obeClasificadorMovimiento != null)
			{
				rpta = ucCustomSerializer.Serializar(obeClasificadorMovimiento, '¦', '¯', false, "");
			}
			return rpta;
		}

		public ActionResult ArticuloLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarArticulo(string ss)
		{
			string rpta = "";
			brArticulo obrArticulo = new brArticulo();
			List<beCampoCadenaCorto> obeArticulo = obrArticulo.listar();
			if (obeArticulo != null)
			{
				rpta = ucCustomSerializer.Serializar(obeArticulo, '¦', '¯', false, "");
			}
			return rpta;
		}

		public ActionResult MedicoLista(string tipo = null)
		{
			ViewBag.versionJS = versionJS;
			ViewBag.tipo = tipo;
			return View();
		}

		public string listarMedico(string ss, string su)
		{
			string rpta = "";
			brMedico obrMedico = new brMedico();
			List<beMedico> lbeMedico = obrMedico.listar(su);
			if (lbeMedico != null)
			{
				string archivo = Server.MapPath("~//Files//EstMedico.txt");
				rpta = ucCustomSerializer.Serializar(lbeMedico, '¦', '¯', false, archivo);
			}
			return rpta;
		}

		public ActionResult PrestacionesLista(string tc, int val, string ver)
		{
			ViewBag.versionJS = versionJS;
			ViewBag.TC = tc + "|" + val.ToString();
			ViewBag.seguridad = ((ver == "" || ver.Length == 0 || ver == null) ? "" : ver);
			return View();
		}

		public string listarPrestacion(string ss, string tc, int val, string su)
		{
			string rpta = "";
			int n = (int)Request.InputStream.Length;
			byte[] buffer = new byte[n];
			Request.InputStream.Read(buffer, 0, n);
			string lista = Encoding.UTF8.GetString(buffer);
			brPrestacion obrPrestacion = new brPrestacion();
			List<bePrestacionVista> obePrestacion = obrPrestacion.listar(tc, val, su, lista);
			if (obePrestacion != null)
			{
				rpta = ucCustomSerializer.Serializar(obePrestacion, '¦', '¯', false, "");
			}
			return rpta;
		}

		public ActionResult ConceptosResumenLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public ActionResult ConceptosResumenDetalleLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public ActionResult EmpresaLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarEmpresa(string ss, string su)
		{
			string rpta = "";
			brEmpresa obrEmpresa = new brEmpresa();
			List<beCampoCadena> lbeEmpresa = obrEmpresa.listar(su);
			if (lbeEmpresa != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeEmpresa, '¦', '¯', false);
			}
			return rpta;
		}

		public ActionResult DetalleErroresLista(string data)
		{
			ViewBag.Datos = data;
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarDetalleErrores(string ss, string su)
		{
			string rpta = "";
			int n = (int)Request.InputStream.Length;
			byte[] buffer = new byte[n];
			Request.InputStream.Read(buffer, 0, n);
			string strError = Encoding.UTF8.GetString(buffer);
			string[] Errores = strError.Split('|');
			int valor1 = int.Parse(Errores[0]);
			int valor2 = int.Parse(Errores[1]);
			DateTime valor3 = DateTime.Parse(Errores[2]);
			DateTime valor4 = DateTime.Parse(Errores[3]);
			int valor5 = int.Parse(Errores[4]);
			brErrorDetalle obrErrorDetalle = new brErrorDetalle();
			beDetalleErrorListas obeDetalleErrorListas = obrErrorDetalle.listar(valor1, valor2, valor3, valor4, valor5, su);
			string ListaDetalleError1 = "";
			string ListaDetalleError2 = "";
			if (obeDetalleErrorListas != null)
			{
				if (obeDetalleErrorListas.ListaDetalleError1 != null && obeDetalleErrorListas.ListaDetalleError1.Count > 0)
				{
					ListaDetalleError1 = ucCustomSerializer.Serializar(obeDetalleErrorListas.ListaDetalleError1, '¦', '¯', false, "", false, true);
				}
				if (obeDetalleErrorListas.ListaDetalleError2 != null && obeDetalleErrorListas.ListaDetalleError2.Count > 0)
				{
					ListaDetalleError2 = ucCustomSerializer.Serializar(obeDetalleErrorListas.ListaDetalleError2, '¦', '¯', false);
				}
				rpta = string.Format("{0}¬{1}", ListaDetalleError1, ListaDetalleError2);
			}
			return rpta;
		}

		public ActionResult DetalleObservadosLista(string data)
		{
			ViewBag.Datos = data;
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarDetalleObservados(string ss, string su)
		{
			string rpta = "";
			int n = (int)Request.InputStream.Length;
			byte[] buffer = new byte[n];
			Request.InputStream.Read(buffer, 0, n);
			string strError = Encoding.UTF8.GetString(buffer);
			string[] Errores = strError.Split('|');
			int valor1 = int.Parse(Errores[0]);
			int valor2 = int.Parse(Errores[1]);
			DateTime valor3 = DateTime.Parse(Errores[2]);
			DateTime valor4 = DateTime.Parse(Errores[3]);
			int valor5 = int.Parse(Errores[4]);
			int valor6 = int.Parse(Errores[5]);
			bool valor7 = (Errores[6] == "true" ? true : false);
			brObservado obrObservado = new brObservado();
			List<beDetalleObservadoLista> lbeDetalleObservadoLista = obrObservado.listar(valor1, valor2, valor3, valor4, valor5, su, valor6, valor7);
			if (lbeDetalleObservadoLista != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeDetalleObservadoLista, '¦', '¯', false);
			}
			return rpta;
		}

		public string listaEspecialidadPorId(string ss, int id)
		{
			string rpta = "";
			brHorarioMedico obrHorarioMedico = new brHorarioMedico();
			List<beCampoEnteroSolo> lbeCampoEnteroSolo = obrHorarioMedico.ObtenerMedicoEspecialidad(id);
			if (lbeCampoEnteroSolo != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeCampoEnteroSolo, '¦', '¯', false);
			}
			return rpta;
		}

		public ActionResult UnidadMedicaLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarUnidadMedica(string ss)
		{
			StringBuilder sb = new StringBuilder();
			brUnidadMedica obrUnidadMedica = new brUnidadMedica();
			beUnidadMedicaLista obeUnidadMedicaLista = obrUnidadMedica.listar();

			if (obeUnidadMedicaLista != null)
			{
				if (obeUnidadMedicaLista.ListaUnidadMedica != null && obeUnidadMedicaLista.ListaUnidadMedica.Count > 0)
				{
					string archivo = Server.MapPath("~//Files//EstUnidadMedica.txt");
					sb.Append(ucCustomSerializer.Serializar(obeUnidadMedicaLista.ListaUnidadMedica, '¦', '¯', false, archivo));
				}
				sb.Append("¬");
				if (obeUnidadMedicaLista.listaUnidadServicio != null && obeUnidadMedicaLista.listaUnidadServicio.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeUnidadMedicaLista.listaUnidadServicio, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeUnidadMedicaLista.listaServicioCombo != null && obeUnidadMedicaLista.listaServicioCombo.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeUnidadMedicaLista.listaServicioCombo, '¦', '¯', false, ""));
				}
			}
			return sb.ToString();
		}

		public string grabarUnidadMedica(string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strTipo = Encoding.UTF8.GetString(buffer);
					string[] Tipo = strTipo.Split('|');
					beUnidadMedica obeUnidadMedica = new beUnidadMedica();
					if (Tipo[0] == "1")
					{
						obeUnidadMedica.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
						obeUnidadMedica.Descripcion = Tipo[1];
						brUnidadMedica obrUnidadMedica = new brUnidadMedica();
						int idTipo = obrUnidadMedica.adicionar(obeUnidadMedica);
						if (idTipo > -1)
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦1", listaUnidadMedica);
						}
					}
					else
					{
						obeUnidadMedica.UnidadMedicaId = int.Parse(Tipo[2]);
						obeUnidadMedica.Descripcion = Tipo[1];
						obeUnidadMedica.UsuarioModificadorId = obeUsuarioLogin.UsuarioId;
						brUnidadMedica obrUnidadMedica = new brUnidadMedica();
						bool exito = obrUnidadMedica.actualizar(obeUnidadMedica);
						if (exito)
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦2", listaUnidadMedica);
						}
					}
				}
			}
			return rpta;
		}
		public string grabarUnidadMedicaDetalle(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strUnidadMedica = Encoding.UTF8.GetString(buffer);
					string[] unidadMedica = strUnidadMedica.Split('|');
					brUnidadMedica obrUnidadMedica = new brUnidadMedica();
					if (unidadMedica[0] == "1")
					{

						int idConcepto = obrUnidadMedica.adicionarDetalle(int.Parse(unidadMedica[1]), int.Parse(unidadMedica[2]), obeUsuarioLogin.UsuarioId);
						if (idConcepto > -1)
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦1", listaUnidadMedica);
						}
						else
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦-1", listaUnidadMedica);
						}
					}
					else
					{
						int exito = obrUnidadMedica.actualizarDetalle(int.Parse(unidadMedica[3]), int.Parse(unidadMedica[2]), obeUsuarioLogin.UsuarioId);
						if (exito > -1)
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦2", listaUnidadMedica);
						}
						else
						{
							string listaUnidadMedica = listarUnidadMedica(ss);
							rpta = string.Format("{0}♦-2", listaUnidadMedica);
						}
					}
				}
			}
			return rpta;
		}

		public string anularUnidadMedica(string ss, int id, string est, int tp)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brUnidadMedica obrUnidadMedica = new brUnidadMedica();
				bool exito = false;
				if (tp == 0)
				{
					exito = obrUnidadMedica.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				}
				else
				{
					exito = obrUnidadMedica.actualizarEstadoDetalle(id, est, obeUsuarioLogin.UsuarioId);
				}

				if (exito)
				{
					string listaUnidadMedica = listarUnidadMedica(ss);
					rpta = string.Format("{0}¬3", listaUnidadMedica);
				}
			}
			return rpta;
		}

		public ActionResult OrdenAtencion(string ss, int id)
		{
			AdministracionController Administracion = new AdministracionController();
			beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
			ViewBag.seguridad = (obeUsuarioLogin == null ? "" : Administracion.obtenerMenuAccion(id, obeUsuarioLogin.PerfilId).ToString());
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string obtenerOrdenAtencionListas(string su)
		{
			StringBuilder sb = new StringBuilder();

			brOrdenAtencion obrOrdenAtencion = new brOrdenAtencion();
			beOrdenAtencionListas obeOrdenAtencionListas = obrOrdenAtencion.listas(su);
			if (obeOrdenAtencionListas != null)
			{
				if (obeOrdenAtencionListas.ListaTipoAtencion != null && obeOrdenAtencionListas.ListaTipoAtencion.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaTipoAtencion, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeOrdenAtencionListas.ListaServicio != null && obeOrdenAtencionListas.ListaServicio.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaServicio, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeOrdenAtencionListas.ListaEspecialidad != null && obeOrdenAtencionListas.ListaEspecialidad.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaEspecialidad, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeOrdenAtencionListas.ListaEstado1 != null && obeOrdenAtencionListas.ListaEstado1.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaEstado1, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeOrdenAtencionListas.ListaEstado2 != null && obeOrdenAtencionListas.ListaEstado2.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaEstado2, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeOrdenAtencionListas.ListaMensajes != null && obeOrdenAtencionListas.ListaMensajes.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeOrdenAtencionListas.ListaMensajes, '¦', '¯', false, ""));
				}
			}
			return sb.ToString();
		}
		public string obtenerOrdenAtencionListar()
		{
			string rpta = "";
			int n = (int)Request.InputStream.Length;
			byte[] buffer = new byte[n];
			Request.InputStream.Read(buffer, 0, n);
			string[] strData = Encoding.UTF8.GetString(buffer).Split('|');

			brOrdenAtencion obrOrdenAtencion = new brOrdenAtencion();
			beOrdenAtencionFiltro obeOrdenAtencionFiltro = new beOrdenAtencionFiltro();
			obeOrdenAtencionFiltro.SucursalId = strData[0];
			obeOrdenAtencionFiltro.TipoEntidad = strData[1];
			obeOrdenAtencionFiltro.Mes = int.Parse(strData[2]);
			obeOrdenAtencionFiltro.Anio = int.Parse(strData[3]);
			obeOrdenAtencionFiltro.EspecialidadId = int.Parse(strData[4]);
			obeOrdenAtencionFiltro.TipoAtencion = int.Parse(strData[5]);
			obeOrdenAtencionFiltro.ServicioId = int.Parse(strData[6]);

			beOrdenAtencionVista obeOrdenAtencionVista = obrOrdenAtencion.listar(obeOrdenAtencionFiltro);
			if (obeOrdenAtencionVista != null)
			{
				string ListaOrdenAtencion1 = "";
				string ListaOrdenAtencion2 = "";
				string ListaOrdenAtencion3 = "";
				if (obeOrdenAtencionVista.ListaOrdenAtencion1 != null && obeOrdenAtencionVista.ListaOrdenAtencion1.Count > 0)
				{
					ListaOrdenAtencion1 = ucCustomSerializer.Serializar(obeOrdenAtencionVista.ListaOrdenAtencion1, '¦', '¯', false, "", false, true);
				}
				if (obeOrdenAtencionVista.ListaOrdenAtencion2 != null && obeOrdenAtencionVista.ListaOrdenAtencion2.Count > 0)
				{
					ListaOrdenAtencion2 = ucCustomSerializer.Serializar(obeOrdenAtencionVista.ListaOrdenAtencion2, '¦', '¯', false, "", false, true);
				}
				if (obeOrdenAtencionVista.ListaOrdenAtencion3 != null && obeOrdenAtencionVista.ListaOrdenAtencion3.Count > 0)
				{
					ListaOrdenAtencion3 = ucCustomSerializer.Serializar(obeOrdenAtencionVista.ListaOrdenAtencion3, '¦', '¯', false, "", false, true);
				}
				rpta = string.Format("{0}¬{1}¬{2}", ListaOrdenAtencion1, ListaOrdenAtencion2, ListaOrdenAtencion3);
			}

			return rpta;
		}

		public string OrdenAtencionActualizar(string ss, string t)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);

				string[] strData = Encoding.UTF8.GetString(buffer).Split('¯');

				brOrdenAtencion obrOrdenAtencion = new brOrdenAtencion();
				beReplicaOrdenAtencionActualizador obeReplicaOrdenAtencionActualizador = new beReplicaOrdenAtencionActualizador();
				obeReplicaOrdenAtencionActualizador.TipoTab = strData[0];
				obeReplicaOrdenAtencionActualizador.ListaId = strData[1];
				obeReplicaOrdenAtencionActualizador.PersonaId = (strData[2] == "" ? 0 : int.Parse(strData[2]));
				obeReplicaOrdenAtencionActualizador.EspecialidadId = (strData[3] == "" ? 0 : int.Parse(strData[3]));
				obeReplicaOrdenAtencionActualizador.CostoPrestacion = (strData[4] == "" ? 0 : decimal.Parse(strData[4]));
				obeReplicaOrdenAtencionActualizador.FechaHoraPrestacion = (strData[5] == "" ? DateTime.Parse("01/01/1990") : DateTime.Parse(strData[5]));
				obeReplicaOrdenAtencionActualizador.PersonaSecundariaId = (strData[6] == "" ? 0 : int.Parse(strData[6]));
				obeReplicaOrdenAtencionActualizador.TipoProceso = strData[7];
				obeReplicaOrdenAtencionActualizador.EstadoProcedimiento = (strData[8] == "" ? 0 : int.Parse(strData[8]));
				obeReplicaOrdenAtencionActualizador.EstadoConsultaExterna = (strData[9] == "" ? 0 : int.Parse(strData[9]));
				obeReplicaOrdenAtencionActualizador.IndicadorHorario = (strData[10] == "" ? 0 : int.Parse(strData[10]));

				string exito = obrOrdenAtencion.actualizarReplicaOrdenAtencion(obeReplicaOrdenAtencionActualizador, t, obeUsuarioLogin.UsuarioId);
				if (exito != "")
				{
					rpta = exito;
				}
			}
			return rpta;
		}

		//mantenimiento turno

		public ActionResult TurnoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarTurno(string ss, string sucursal)
		{
			string rpta = "";
			brTruno obrTruno = new brTruno();
			List<beTurno> lbeTurno = obrTruno.listar(sucursal);

			if (lbeTurno != null && lbeTurno.Count > 0)
			{
				rpta = ucCustomSerializer.Serializar(lbeTurno, '¦', '¯', false, "", false, true);
			}
			return rpta;
		}

		public string grabarTurno(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strTurno = Encoding.UTF8.GetString(buffer);
					string[] turno = strTurno.Split('|');
					beTurno obeTurno = new beTurno();
					if (turno[0] == "1")
					{
						obeTurno.Descripcion = turno[1];
						obeTurno.HoraInicio = "1900-01-01T" + turno[2];
						obeTurno.HoraFin = "1900-01-01T" + turno[3];
						brTruno obrTruno = new brTruno();
						int idTurno = obrTruno.adicionar(obeTurno, su, obeUsuarioLogin.UsuarioId);
						if (idTurno > -1)
						{
							string listaTurno = listarTurno(ss, su);
							rpta = string.Format("{0}¬1", listaTurno);
						}
					}
					else
					{
						obeTurno.Descripcion = turno[1];
						obeTurno.HoraInicio = "1900-01-01T" + turno[2];
						obeTurno.HoraFin = "1900-01-01T" + turno[3];
						obeTurno.TurnoId = int.Parse(turno[4]);
						brTruno obrTruno = new brTruno();
						bool exito = obrTruno.actualizar(obeTurno, obeUsuarioLogin.UsuarioId);
						if (exito)
						{
							string listaTurno = listarTurno(ss, su);
							rpta = string.Format("{0}¬2", listaTurno);
						}
					}
				}
			}
			return rpta;
		}

		public string anularTurno(string ss, int id, string est, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brTruno obrTruno = new brTruno();
				bool exito = obrTruno.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					string listaTurno = listarTurno(ss, su);
					rpta = string.Format("{0}¬3", listaTurno);
				}
			}
			return rpta;
		}

		public ActionResult ConceptoLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarConcepto(string ss)
		{
			StringBuilder sb = new StringBuilder();
			beConceptoMontoFijoListas obeConceptoMontoFijoListas = null;
			brConcepto obrConcepto = new brConcepto();
			obeConceptoMontoFijoListas = obrConcepto.listar();
			if (obeConceptoMontoFijoListas != null)
			{
				if (obeConceptoMontoFijoListas.listaConceptoMontoFijo != null && obeConceptoMontoFijoListas.listaConceptoMontoFijo.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeConceptoMontoFijoListas.listaConceptoMontoFijo, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeConceptoMontoFijoListas.listaConcepto != null && obeConceptoMontoFijoListas.listaConcepto.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeConceptoMontoFijoListas.listaConcepto, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeConceptoMontoFijoListas.listaConceptoCombo != null && obeConceptoMontoFijoListas.listaConceptoCombo.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeConceptoMontoFijoListas.listaConceptoCombo, '¦', '¯', false, ""));
				}
			}
			return sb.ToString();
		}

		public string grabarConcepto(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strConcepto = Encoding.UTF8.GetString(buffer);
					string[] concepto = strConcepto.Split('|');
					brConcepto obrConcepto = new brConcepto();
					if (concepto[0] == "1")
					{

						int idTurno = obrConcepto.adicionar(concepto[1], bool.Parse(concepto[2]), obeUsuarioLogin.UsuarioId);
						if (idTurno > -1)
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦1♦{1}", listaConcepto,idTurno);
						}
					}
					else
					{
						bool exito = obrConcepto.actualizar(int.Parse(concepto[3]), concepto[1], bool.Parse(concepto[2]), obeUsuarioLogin.UsuarioId);
						if (exito)
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦2", listaConcepto);
						}
					}
				}
			}
			return rpta;
		}

		public string grabarConceptoDetalle(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strConcepto = Encoding.UTF8.GetString(buffer);
					string[] concepto = strConcepto.Split('|');
					brConcepto obrConcepto = new brConcepto();
					if (concepto[0] == "1")
					{

						int idConcepto = obrConcepto.adicionarDetalle(int.Parse(concepto[1]), int.Parse(concepto[2]), obeUsuarioLogin.UsuarioId);
						if (idConcepto > -1)
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦1", listaConcepto);
						}
						else
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦-1", listaConcepto);
						}
					}
					else
					{
						int exito = obrConcepto.actualizarDetalle(int.Parse(concepto[3]), int.Parse(concepto[2]), obeUsuarioLogin.UsuarioId);
						if (exito > -1)
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦2", listaConcepto);
						}
						else
						{
							string listaConcepto = listarConcepto(ss);
							rpta = string.Format("{0}♦-2", listaConcepto);
						}
					}
				}
			}
			return rpta;
		}

		public string anularConcepto(string ss, int id, string est, string su, int tp)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brConcepto obrConcepto = new brConcepto();
				bool exito = false;
				if (tp == 0)
				{
					exito = obrConcepto.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				}
				else
				{
					exito = obrConcepto.actualizarEstadoDetalle(id, est, obeUsuarioLogin.UsuarioId);
				}
				if (exito)
				{
					string listaConcepto = listarConcepto(ss);
					rpta = string.Format("{0}♦3", listaConcepto);
				}
			}
			return rpta;
		}

        public ActionResult OADetalleLista(string su, string oa)
        {
            ViewBag.versionJS = versionJS;
            ViewBag.Datos = su + "¬" + oa;
            return View();
        }

        public string listarOADetalle(string su, string oa)
        {
            string rpta = "";
            brOrdenAtencion obrOrdenAtencion = new brOrdenAtencion();
            List<beConsultaOA> lbeConsultaOA = obrOrdenAtencion.listarOADetalle(su, oa);
            if (lbeConsultaOA != null)
            {
                rpta = ucCustomSerializer.Serializar(lbeConsultaOA, '¦', '¯', false, "", false, true);
            }
            return rpta;
        }

        public ActionResult MedicoEmpresaMantenimiento()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarMedicoEmpresaMantenimiento(string ss, string su)
		{
			StringBuilder rpta = new StringBuilder();
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brMedicoEmpresaMantenimiento obrMedicoEmpresaMantenimiento = new brMedicoEmpresaMantenimiento();
				beMedicoEmpresaMantenimientoVistaListas obeMedicoEmpresaMantenimientoVistaListas = obrMedicoEmpresaMantenimiento.MedicoEmpresaMantenimientoLista(su, obeUsuarioLogin.UsuarioId);
				if (obeMedicoEmpresaMantenimientoVistaListas != null)
				{
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaMedicos != null && obeMedicoEmpresaMantenimientoVistaListas.ListaMedicos.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaMedicos, '¦', '¯', false, ""));
					}
					rpta.Append("¬");
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaTipoServicioImpuesto != null && obeMedicoEmpresaMantenimientoVistaListas.ListaTipoServicioImpuesto.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaTipoServicioImpuesto, '¦', '¯', false, ""));
					}
					rpta.Append("¬");
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaTipoMedico != null && obeMedicoEmpresaMantenimientoVistaListas.ListaTipoMedico.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaTipoMedico, '¦', '¯', false, ""));
					}
					rpta.Append("¬");
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaSucursal != null && obeMedicoEmpresaMantenimientoVistaListas.ListaSucursal.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaSucursal, '¦', '¯', false, ""));
					}
					rpta.Append("¬");
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaMedicoSucursal != null && obeMedicoEmpresaMantenimientoVistaListas.ListaMedicoSucursal.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaMedicoSucursal, '¦', '¯', false, ""));
					}
					rpta.Append("¬");
					if (obeMedicoEmpresaMantenimientoVistaListas.ListaMensajes != null && obeMedicoEmpresaMantenimientoVistaListas.ListaMensajes.Count > 0)
					{
						rpta.Append(ucCustomSerializer.Serializar(obeMedicoEmpresaMantenimientoVistaListas.ListaMensajes, '¦', '¯', false, ""));
					}
				}
			}
			return rpta.ToString();
		}

		public string ActualizarMedicoEmpresaMantenimiento(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strData = Encoding.UTF8.GetString(buffer);
					string[] Data = strData.Split('|');
					brMedicoEmpresaMantenimiento obrMedicoEmpresaMantenimiento = new brMedicoEmpresaMantenimiento();
					bool exito = obrMedicoEmpresaMantenimiento.ActualizarMedicoEmpresa(int.Parse(Data[0]), Data[1], Data[6], Data[2], Data[3], Data[4], obeUsuarioLogin.UsuarioId, Data[7]);
					if (exito)
					{
						string lista = listarMedicoEmpresaMantenimiento(ss, su);
						rpta = string.Format("{0}", lista);
					}
				}
			}
			return rpta;
		}

		public FileResult exportarArchivo(string archivoCliente, string extension, string su, int op, int contratoid, string idCompania)
		{
			string tipo = "";

			string ruta = ConfigurationManager.AppSettings["rutaContrato-" + idCompania] + "\\" + su + "\\" + archivoCliente;
			if (op == 1)
			{
				ruta = ConfigurationManager.AppSettings["rutaContrato-" + idCompania] + "\\" + su + "\\" + archivoCliente;
			}
			else if (op == 2)
			{
				var id = archivoCliente.Split('_');
				ruta = ConfigurationManager.AppSettings["rutaContratoFijo-" + idCompania] + su + "\\" + contratoid + "\\" + archivoCliente;
			}
			else if (op == 3)
			{
				var archivo = Server.MapPath("~/Files/DetalleOAs.xlsx");
				ruta = archivo;
				extension = "xlsx";
			}
			else if (op == 4)
			{
				var archivo = Server.MapPath("~/Files/Formato_Ajuste_Cambio_Contrato.xlsx");
				ruta = archivo;
				extension = "xlsx";
			}
			else
			{
				ruta = ConfigurationManager.AppSettings["rutaPDF"] + "\\" + archivoCliente;
			}
			switch (extension)
			{
				case "txt":
					tipo = "text/plain";
					break;
				case "xls":
					tipo = "application/vnd.ms-excel";
					break;
				case "xlsx":
					tipo = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
					break;
				case "doc":
					tipo = "application/msword";
					break;
				case "docx":
					tipo = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
					break;
				case "pdf":
					tipo = "application/pdf";
					break;
			}
			if (System.IO.File.Exists(ruta))
			{
				return File(System.IO.File.ReadAllBytes(ruta), tipo);
			}
			else
			{
				return null;
			}
		}

		public ActionResult ReplicaProcesoVista()
		{
			ViewBag.versionJS = versionJS;
            ViewBag.ReplicaProcesoActivador = ConfigurationManager.AppSettings["InterfaseResumenProceso"];
			return View();
		}

		public string listasReplicaProceso(string ss,string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brReplicaProceso obrReplicaProceso = new brReplicaProceso();
				beReplicaProcesoListas obeReplicaProcesoListas = obrReplicaProceso.listas(obeUsuarioLogin.UsuarioId,su);
				string ListaPeriodo = "", ListaEspecialidad = "", ListaSucursal = "", ListaMensaje = "", ListaMensaje2 = "";
				if (obeReplicaProcesoListas != null)
				{
					if (obeReplicaProcesoListas.ListaPeriodo != null && obeReplicaProcesoListas.ListaPeriodo.Count > 0)
					{
						ListaPeriodo = ucCustomSerializer.Serializar(obeReplicaProcesoListas.ListaPeriodo, '¦', '¬', false, "");
					}
					if (obeReplicaProcesoListas.ListaEspecialidad != null && obeReplicaProcesoListas.ListaEspecialidad.Count > 0)
					{
						ListaEspecialidad = ucCustomSerializer.Serializar(obeReplicaProcesoListas.ListaEspecialidad, '¦', '¬', false, "");
					}
					if (obeReplicaProcesoListas.ListaSucursal != null && obeReplicaProcesoListas.ListaSucursal.Count > 0)
					{
						ListaSucursal = ucCustomSerializer.Serializar(obeReplicaProcesoListas.ListaSucursal, '¦', '¬', false, "");
					}
					if (obeReplicaProcesoListas.ListaMensajes != null && obeReplicaProcesoListas.ListaMensajes.Count > 0)
					{
						ListaMensaje = ucCustomSerializer.Serializar(obeReplicaProcesoListas.ListaMensajes, '¦', '¬', false, "");
					}
					if (obeReplicaProcesoListas.ListaMensajes2 != null && obeReplicaProcesoListas.ListaMensajes2.Count > 0)
					{
						ListaMensaje2 = ucCustomSerializer.Serializar(obeReplicaProcesoListas.ListaMensajes2, '¦', '¬', false, "");
					}
					rpta = string.Format("{0}¯{1}¯{2}¯{3}¯{4}", ListaPeriodo, ListaEspecialidad, ListaSucursal, ListaMensaje, ListaMensaje2);
				}
			}
			return rpta;
		}

		public string listarReplicaProceso(int anio, string estado, string sucursal)
		{
			string rpta = "";
			brReplicaProceso obrReplicaProceso = new brReplicaProceso();
			List<beReplicaProcesoVista> lbeReplicaProcesoVista = obrReplicaProceso.listar(anio, estado, sucursal);
			if (lbeReplicaProcesoVista != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeReplicaProcesoVista, '¦', '¬', false, "", false, true);
			}
			return rpta;
		}
		public string procesoInterfaseMaestro(string ss, int entidad,int interfasid)
		{
			string rpta = "";
			beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
			brReplicaProceso obrReplicaProceso = new brReplicaProceso();
			//ucObjeto<object>.grabarArchivoTexto(new {
			//	Compania = obeUsuarioLogin.IdCompania,
			//	Spring = "ServidorSPRING-" + obeUsuarioLogin.IdCompania
			//}, Server.MapPath("~/Logs/ConexionSpring.txt"));
			string DatosSPRING = ConfigurationManager.AppSettings["ServidorSPRING-" + obeUsuarioLogin.IdCompania];
			string[] valoresSPRING = DatosSPRING.Split('|');
			rpta = obrReplicaProceso.interfaseMaestroActualizar(valoresSPRING[0], valoresSPRING[1], entidad, obeUsuarioLogin.UsuarioId, interfasid).ToString();
			return rpta;
		}

		public string GrabarReplicaProceso(string ss, int opc, int anio, string estado, string sucursal)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					beReplicaProcesoPeriodo obeReplicaProcesoPeriodo = new beReplicaProcesoPeriodo();
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string Data = Encoding.UTF8.GetString(buffer);
					string[] Datos = Data.Split('¦');
					string Descripcion = Datos[0];
					obeReplicaProcesoPeriodo.PeriodoId = Datos[1];
					obeReplicaProcesoPeriodo.FechaInicio = DateTime.Parse(Datos[2]);
					obeReplicaProcesoPeriodo.FechaFin = DateTime.Parse(Datos[3]);
					brReplicaProceso obrReplicaProceso = new brReplicaProceso();
					if (opc == 1)
					{
						int exito = obrReplicaProceso.adicionar(obeReplicaProcesoPeriodo, Descripcion, obeUsuarioLogin.UsuarioId);
						if (exito > -1)
						{
                            rpta = "1";
                        }
						else
						{
							rpta = "-1";
						}
					}
					else
					{
						int idReproceso = int.Parse(Datos[4]);
						int exito = obrReplicaProceso.actualizar(obeReplicaProcesoPeriodo, Descripcion, obeUsuarioLogin.UsuarioId, idReproceso);
						if (exito > -1)
						{
                            rpta = "1";
                        }
						else
						{
							rpta = "-1";
						}
					}
				}
			}
			return rpta;
		}

		public string procesarReplicaProceso(string ss,int sec)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				if (Request.InputStream != null)
				{
					beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
					brReplicaProceso obrReplicaProceso = new brReplicaProceso();
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string Data = Encoding.UTF8.GetString(buffer);
					string[] Datos = Data.Split('¦');
					string DatosSPRING = ConfigurationManager.AppSettings["ServidorSPRING-" + obeUsuarioLogin.IdCompania];
					string[] valoresSPRING = DatosSPRING.Split('|');
					rpta = obrReplicaProceso.procesar(int.Parse(Datos[0]), Datos[1], sec, Datos[2], int.Parse(Datos[3]), int.Parse(Datos[4]), Datos[5], valoresSPRING[0], valoresSPRING[1], obeUsuarioLogin.UsuarioId);
					rpta = rpta + "¦" + (sec + 1);
				}
			}
			return rpta;
		}

		public string anularReplicaProceso(string ss, int id, string est, int anio, string estado)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brReplicaProceso obrReplicaProceso = new brReplicaProceso();
				int exito = obrReplicaProceso.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito > -1)
				{
					rpta = "ok";
				}
				else
				{
					rpta = "-1";
				}
			}
			return rpta;
		}

		public ActionResult ComponentesLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public ActionResult SeleccionMedicoProvision(string datos)
		{
			ViewBag.versionJS = versionJS;
			ViewBag.Datos = datos;
			return View();
		}

		public string ListarSeleccionMedicoProvision(string su, int id)
		{
			string rpta = "";
			brProvision obrProvision = new brProvision();
			List<beMedicoSeleccionProvision> lbeMedicoSeleccionProvision = obrProvision.ListarMedicoSeleccionProvision(su, id);
			if (lbeMedicoSeleccionProvision != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeMedicoSeleccionProvision, '¦', '¬', false, "", false, true);
			}
			return rpta;
		}


		public string ActSeleccionMedicoProvision(string ss, int id,int conf)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);
				string Data = Encoding.UTF8.GetString(buffer);
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brProceso obrProceso = new brProceso();
				int resultado = obrProceso.SeleccionMedicoProvisionActualizacion(id, Data, obeUsuarioLogin.UsuarioId,conf);
				if (resultado > -1)
				{
					rpta = "ok";
				}
			}
			return rpta;
		}

		public ActionResult InterfaseMaestrosSpringLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarInterfaseMaestrosSpring(int anio, string estado)
		{
			string rpta = "";
			brInterfaseMaestro obrInterfaseMaestro = new brInterfaseMaestro();
			List<beInterfaseMaestroVista> lbeInterfaseMaestroVista = obrInterfaseMaestro.listar(anio, estado);
			if (lbeInterfaseMaestroVista != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeInterfaseMaestroVista, '¦', '¬', false, "", false, true);
			}
			return rpta;
		}

		public string GrabarInterfaseMaestrosSpring(string ss, int opc, int anio, string estado)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string Data = Encoding.UTF8.GetString(buffer);
					string[] Datos = Data.Split('¦');
					string Descripcion = Datos[0];
					int PeriodoId = int.Parse(Datos[1]);
					brInterfaseMaestro obrInterfaseMaestro = new brInterfaseMaestro();
					if (opc == 1)
					{
						int exito = obrInterfaseMaestro.adicionar(Descripcion,PeriodoId,obeUsuarioLogin.UsuarioId);
						if (exito > -1)
						{
							rpta = listarInterfaseMaestrosSpring(anio, estado);
						}
						else
						{
							rpta = "-1";
						}
					}
					else
					{
						int idInterfase = int.Parse(Datos[2]);
						int exito = obrInterfaseMaestro.actualizar(Descripcion, obeUsuarioLogin.UsuarioId, PeriodoId, idInterfase);
						if (exito > -1)
						{
							rpta = exito.ToString();
						}
						else
						{
							rpta = "-1";
						}
					}
				}
			}
			return rpta;
		}

		public string anularInterfaseMaestrosSpring(string ss, int id, string est, int anio, string estado)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brInterfaseMaestro obrInterfaseMaestro = new brInterfaseMaestro();
				int exito = obrInterfaseMaestro.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito > -1)
				{
					rpta = "ok";
				}
				else
				{
					rpta = "-1";
				}
			}
			return rpta;
		}


		public ActionResult Parametros()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string parametrosListas(string ss)
		{

			string rpta = "";
			brParametros obrParametros = new brParametros();
			rpta = obrParametros.listar();
		
			return rpta;
		}

		public string parametrosPorIdListar(string ss,string parametroId)
		{

			string rpta = "";
			brParametros obrParametros = new brParametros();
			rpta = obrParametros.listarPorId(parametroId);

			return rpta;
		}


		public string actualizarParametro(string ss, string su)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				if (Request.InputStream != null)
				{
					int n = (int)Request.InputStream.Length;
					byte[] buffer = new byte[n];
					Request.InputStream.Read(buffer, 0, n);
					string strConcepto = Encoding.UTF8.GetString(buffer);
					brParametros obrParametros = new brParametros();
					string[] concepto = strConcepto.Split('¦');
		
						bool exito = obrParametros.actualizar(concepto[0], concepto[1],concepto[2], concepto[3]);
						if (exito)
						{
							rpta = "1";
						}
					
				}
			}
			return rpta;
		}

		public string parametrosValidar(string nombre)
		{

			string rpta = "";
			brParametros obrParametros = new brParametros();
			rpta = obrParametros.validar(nombre);

			return rpta;
		}


	}
}
