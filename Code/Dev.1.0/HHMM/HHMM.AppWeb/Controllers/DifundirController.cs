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
using System.Threading.Tasks;
using Fleck;

namespace HHMM.AppWeb.Controllers
{
	[frSeguridad]
	public class DifundirController : Controller
	{

		#region ConfiguracionCorreo
		string versionJS = ConfigurationManager.AppSettings["VersionJS"];
		public ActionResult ConfiguracionCorreoListar()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		[frSeguridad]
		public string listarResponsableCorreo(string idSucursal)
		{
			string rpta = "";
			brResponsableCorreo obrResponsableCorreo = new brResponsableCorreo();
			beResponsableCorreoListar obeResponsableCorreoListar = obrResponsableCorreo.listar(idSucursal);
			string listaResponsableCorreo = "";
			string listaUsuario = "";
			string listaVariableCorreo = "";


			if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaResponsableCorreo.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstResponsableCorreo.txt");
				listaResponsableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaResponsableCorreo, '¦', '¯', false, archivo);
			}

			if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaUsuario.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstUsuario.txt");
				listaUsuario = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaUsuario, '¦', '¯', false, archivo);
			}

			if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaVariableCorreo.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstVariableCorreo.txt");
				listaVariableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaVariableCorreo, '¦', '¯', false, archivo);
			}

			rpta = String.Format("{0}¬{1}¬{2}", listaResponsableCorreo, listaUsuario, listaVariableCorreo);
			return rpta;
		}

		[frSeguridad]
		public string listarResponsableCorreoPorId(beResponsableCorreo obeResponsableCorreo, string ss)
		{
			string rpta = "";
			brResponsableCorreo obrResponsableCorreo = new brResponsableCorreo();
			obeResponsableCorreo = obrResponsableCorreo.listarPorId(obeResponsableCorreo.ResponsableCorreoId.ToString());
			string objResponsableCorreo = "";

			if (obeResponsableCorreo != null)
			{
				string archivo = Server.MapPath("~//Files//EstResponsableCorreoPorId.txt");
				objResponsableCorreo = ucCustomSerializer.SerializarObjeto(obeResponsableCorreo, '¦');
			}

			rpta = String.Format("{0}", objResponsableCorreo);
			return rpta;
		}

		[frSeguridad]
		public string adicionarResponsableCorreo(beResponsableCorreo obeResponsableCorreo, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brResponsableCorreo obrResponsableCorreo = new brResponsableCorreo();
				obeResponsableCorreo.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				beResponsableCorreoListar obeResponsableCorreoListar = obrResponsableCorreo.Adicionar(obeResponsableCorreo);
				string listaResponsableCorreo = "";
				string listaUsuario = "";
				string listaVariableCorreo = "";

				if (obeResponsableCorreoListar != null)
				{
					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaResponsableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstResponsableCorreo.txt");
						listaResponsableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaResponsableCorreo, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaUsuario.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstUsuario.txt");
						listaUsuario = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaUsuario, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaVariableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstVariableCorreo.txt");
						listaVariableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaVariableCorreo, '¦', '¯', false, archivo);
					}
				}
				rpta = String.Format("{0}¬{1}¬{2}¬{3}", listaResponsableCorreo, listaUsuario, listaVariableCorreo, rpta);
			}
			return (rpta);
		}

		[frSeguridad]
		public string actualizarResponsableCorreo(beResponsableCorreo obeResponsableCorreo, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brResponsableCorreo obrResponsableCorreo = new brResponsableCorreo();
				obeResponsableCorreo.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				beResponsableCorreoListar obeResponsableCorreoListar = obrResponsableCorreo.Actualizar(obeResponsableCorreo);
				string listaResponsableCorreo = "";
				string listaUsuario = "";
				string listaVariableCorreo = "";

				if (obeResponsableCorreoListar != null)
				{
					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaResponsableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstResponsableCorreo.txt");
						listaResponsableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaResponsableCorreo, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaUsuario.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstUsuario.txt");
						listaUsuario = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaUsuario, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaVariableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstVariableCorreo.txt");
						listaVariableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaVariableCorreo, '¦', '¯', false, archivo);
					}
				}
				rpta = String.Format("{0}¬{1}¬{2}¬{3}", listaResponsableCorreo, listaUsuario, listaVariableCorreo, rpta);
			}
			return (rpta);
		}

		[frSeguridad]
		public string actualizarEstadoResponsableCorreo(beResponsableCorreo obeResponsableCorreo, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brResponsableCorreo obrResponsableCorreo = new brResponsableCorreo();
				obeResponsableCorreo.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				beResponsableCorreoListar obeResponsableCorreoListar = obrResponsableCorreo.ActualizarEstado(obeResponsableCorreo);
				string listaResponsableCorreo = "";
				string listaUsuario = "";
				string listaVariableCorreo = "";

				if (obeResponsableCorreoListar != null)
				{
					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaResponsableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstResponsableCorreo.txt");
						listaResponsableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaResponsableCorreo, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaUsuario.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstUsuario.txt");
						listaUsuario = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaUsuario, '¦', '¯', false, archivo);
					}

					if (obeResponsableCorreoListar != null && obeResponsableCorreoListar.ListaVariableCorreo.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstVariableCorreo.txt");
						listaVariableCorreo = ucCustomSerializer.Serializar(obeResponsableCorreoListar.ListaVariableCorreo, '¦', '¯', false, archivo);
					}
				}
				rpta = String.Format("{0}¬{1}¬{2}¬{3}", listaResponsableCorreo, listaUsuario, listaVariableCorreo, rpta);
			}
			return (rpta);
		}

		#endregion

		#region BandejaCorreo

		public ActionResult BandejaCorreoListar()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		[frSeguridad]
		public string listarBandejaCorreo(string ss, beBandejaCorreo obeBandejaCorreo)
		{
			string rpta = "";
			brBandejaCorreo obrBandejaCorreo = new brBandejaCorreo();
			List<beBandejaCorreo> lbeBandejaCorreo = obrBandejaCorreo.listar(obeBandejaCorreo);
			string listaBandejaCorreo = "";


			if (lbeBandejaCorreo.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstBandejaCorreo.txt");
				listaBandejaCorreo = ucCustomSerializer.Serializar(lbeBandejaCorreo, '¦', '¯', false, archivo, true, true);
			}


			rpta = String.Format("{0}", listaBandejaCorreo);
			return rpta;
		}

		public string listarBandejaCorreoPorId(string ss, beBandejaCorreo obeBandejaCorreo)
		{

			string rpta = "";

			brBandejaCorreo obrBandejaCorreo = new brBandejaCorreo();
			beBandejaCorreoListar obeBandejaCorreoListar = obrBandejaCorreo.listarPorId(obeBandejaCorreo);
			string listaBandejaCorreo = "";
			string listaBandejaCorreoAdjunto = "";


			if (obeBandejaCorreoListar != null && obeBandejaCorreoListar.ListaBandejaCorreo.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstBandejaCorreoPorId.txt");
				listaBandejaCorreo = ucCustomSerializer.Serializar(obeBandejaCorreoListar.ListaBandejaCorreo, '¦', '¯', false, archivo, true, true);
			}

			if (obeBandejaCorreoListar != null && obeBandejaCorreoListar.ListaBandejaCorreoAdjunto.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstBandejaCorreoAdjunto.txt");
				listaBandejaCorreoAdjunto = ucCustomSerializer.Serializar(obeBandejaCorreoListar.ListaBandejaCorreoAdjunto, '¦', '¯', false, archivo, true, true);
			}


			rpta = String.Format("{0}_{1}", listaBandejaCorreo, listaBandejaCorreoAdjunto);
			return rpta;
		}

		[frSeguridad]
		public string listarTipoAdmision(string ss)
		{
			string rpta = "";
			brBandejaCorreo obrBandejaCorreo = new brBandejaCorreo();
			List<beTipoAdmision> lbeTipoAdmision = obrBandejaCorreo.listar();
			string listaBandejaCorreo = "";


			if (lbeTipoAdmision.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstTipoAdmision.txt");
				listaBandejaCorreo = ucCustomSerializer.Serializar(lbeTipoAdmision, '¦', '¯', false, archivo);
			}


			rpta = String.Format("{0}", listaBandejaCorreo);
			return rpta;
		}


		#endregion

		public ActionResult GenerarArchivosDigitalesListar(string ss)
		{
			beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
			ViewBag.versionJS = versionJS;
			ViewBag.rutaPDF = ConfigurationManager.AppSettings["rutaPDF-" + obeUsuarioLogin.IdCompania];
			string ip = ConfigurationManager.AppSettings["WebSocketIp"];
			string puerto = ConfigurationManager.AppSettings["WebSocketPuerto"];
			ViewBag.socket = ip + ":" + puerto;
			return View();
		}
		[frSeguridad]
		public string listarArchivoDigital(string ss, string su)
		{
			StringBuilder sb = new StringBuilder();
			brAchivoDigital obrAchivoDigital = new brAchivoDigital();
			beArchivoDigitalListas obeArchivoDigitalListas = obrAchivoDigital.listas(su);
			if (obeArchivoDigitalListas != null)
			{
				if (obeArchivoDigitalListas.ListaAdmision != null && obeArchivoDigitalListas.ListaAdmision.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeArchivoDigitalListas.ListaAdmision, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeArchivoDigitalListas.ListaPeriodo != null && obeArchivoDigitalListas.ListaPeriodo.Count > 0)
				{
					sb.Append(ucCustomSerializer.Serializar(obeArchivoDigitalListas.ListaPeriodo, '¦', '¯', false, ""));
				}
				sb.Append("¬");
				if (obeArchivoDigitalListas.ListaVariables != null && obeArchivoDigitalListas.ListaVariables.Count > 0)
				{
					for (var x = 0; x < obeArchivoDigitalListas.ListaVariables.Count; x++)
					{
						sb.Append(obeArchivoDigitalListas.ListaVariables[x]);
						if (x < obeArchivoDigitalListas.ListaVariables.Count - 1)
						{
							sb.Append("¯");
						}
					}
				}

			}
			return sb.ToString();
		}
		[frSeguridad]
		public string buscarArchivoDigital(string ss, string su, int pe, int ad, int pi, int pf, string est)
		{
			StringBuilder sb = new StringBuilder();
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brAchivoDigital obrAchivoDigital = new brAchivoDigital();
				beArchivoDigitalDetalleListas obeArchivoDigitalDetalleListas = obrAchivoDigital.listarBusqueda(su, pe, ad, pi, pf, est, obeUsuarioLogin.UsuarioId);
				if (obeArchivoDigitalDetalleListas != null)
				{
					if (obeArchivoDigitalDetalleListas.ListaPeriodo != null && obeArchivoDigitalDetalleListas.ListaPeriodo.Count > 0)
					{
						sb.Append(ucCustomSerializer.Serializar(obeArchivoDigitalDetalleListas.ListaPeriodo, '¦', '¯', false, ""));
					}
					sb.Append("¬");
					if (obeArchivoDigitalDetalleListas.ListaMedico != null && obeArchivoDigitalDetalleListas.ListaMedico.Count > 0)
					{
						string archivo = Server.MapPath("~/Files/EstArchivoDigital.txt");
						sb.Append(ucCustomSerializer.Serializar(obeArchivoDigitalDetalleListas.ListaMedico, '¦', '¯', false, (est == "P" ? archivo : ""), false, true));
					}
					sb.Append("¬");
					if (obeArchivoDigitalDetalleListas.ListaDescripcionCorreo != null && obeArchivoDigitalDetalleListas.ListaDescripcionCorreo.Count > 0)
					{
						sb.Append(ucCustomSerializer.Serializar(obeArchivoDigitalDetalleListas.ListaDescripcionCorreo, '¦', '¯', false, ""));
					}
				}
			}
			return sb.ToString();
		}
		[frSeguridad]
		public async Task<string> procesarPdf(string ss, string su, int con,int ti)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);
				string medico = Encoding.UTF8.GetString(buffer);
				//string[] medicos = strFechas.Split('¬');

				brAchivoDigital obrAchivoDigital = new brAchivoDigital();
				string rutapdf = ConfigurationManager.AppSettings["rutaPDF-" + obeUsuarioLogin.IdCompania];

				switch (obeUsuarioLogin.IdCompania)
				{
					case "00":
						rpta = await obrAchivoDigital.crearPdfDefault(medico, su, rutapdf, ti);
						break;
					case "01":
						rpta = await obrAchivoDigital.crearPdfCSFR(medico, su, rutapdf, ti);
						break;
					default:
						rpta = await obrAchivoDigital.crearPdfDefault(medico, su, rutapdf, ti);
						break;
				}

				bool exito = false;
				if (rpta != "")
				{
					exito = obrAchivoDigital.actualizarEstados(medico, "G", obeUsuarioLogin.UsuarioId, su);
				}
				if (exito) rpta = (con + 1).ToString();
				else rpta = "0";
			}
			return rpta;
		}

		//public async Task<string> actualizarEstados(string ss, string su)
		//{
		//	string rpta = "";
		//	beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
		//	int n = (int)Request.InputStream.Length;
		//	byte[] buffer = new byte[n];
		//	Request.InputStream.Read(buffer, 0, n);
		//	string lista = Encoding.UTF8.GetString(buffer);
		//	brAchivoDigital obrAchivoDigital = new brAchivoDigital();
		//	bool exito = obrAchivoDigital.actualizarEstados(lista, "G", obeUsuarioLogin.UsuarioId, su);
		//	return rpta;
		//}

		[frSeguridad]
		public async Task<string> enviarCorreo(string ss, string su,string ti)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int n = (int)Request.InputStream.Length;
				byte[] buffer = new byte[n];
				Request.InputStream.Read(buffer, 0, n);
				string strFechas = Encoding.UTF8.GetString(buffer);
				string[] Datos = strFechas.Split('¯');
				string[] medicos = Datos[0].Split('¬');
				string[] Cabecera = Datos[1].Split('¬');
				string[] Contenido = Datos[2].Split('¬');
				brAchivoDigital obrAchivoDigital = new brAchivoDigital();
				string rutapdf = ConfigurationManager.AppSettings["rutaPDF-" + obeUsuarioLogin.IdCompania];
				rpta = await obrAchivoDigital.EnviarCorreo(medicos, su, rutapdf, obeUsuarioLogin.UsuarioId, Cabecera, Contenido);
				//rpta = "OK";
				if (rpta != "")
				{
					bool exito = obrAchivoDigital.actualizarEstados(rpta, ti, obeUsuarioLogin.UsuarioId, su);
				}
			}
			return rpta;
		}
	}
}
