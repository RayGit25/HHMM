using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HHMM.Librerias.EntidadesNegocio;
using HHMM.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.AppWeb.Filter;
using System.Text;

namespace HHMM.AppWeb.Controllers
{
	[frSeguridad]
	public class AdministracionController : Controller
	{
		string versionJS = ConfigurationManager.AppSettings["VersionJS"];
		public ActionResult MantenimientoPerfilesLista()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		public string listarPerfiles()
		{
			string rpta = "";
			brPerfil obrPerfiles = new brPerfil();
			List<bePerfil> lbePerfiles = obrPerfiles.listar();
			string listaPerfiles = "";

			if (lbePerfiles != null && lbePerfiles.Count > 0)
			{
				string archivo = Server.MapPath("~//Files//EstPerfil.txt");
				listaPerfiles = ucCustomSerializer.Serializar(lbePerfiles, '¦', '¯', false, archivo);
			}

			rpta = String.Format("{0}", listaPerfiles);
			return rpta;
		}

		[frSeguridad]
		public string adicionar(bePerfil obePerfil, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brPerfil obrPerfil = new brPerfil();
				obePerfil.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				bePerfilListar obePerfilListar = obrPerfil.Adicionar(obePerfil);
				string listaPerfiles = "";

				if (obePerfilListar != null)
				{
					if (obePerfilListar.ListaPerfil != null && obePerfilListar.ListaPerfil.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstPerfil.txt");
						listaPerfiles = ucCustomSerializer.Serializar(obePerfilListar.ListaPerfil, '¦', '¯', false, archivo);
					}
				}

				rpta = String.Format("{0}¬{1}¬1", listaPerfiles, obePerfilListar.Rpta);
			}
			return (rpta);
		}

		public string actualizar(bePerfil obePerfil, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brPerfil obrPerfil = new brPerfil();
				obePerfil.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				bePerfilListar obePerfilListar = obrPerfil.Actualizar(obePerfil);
				string listaPerfiles = "";

				if (obePerfilListar != null)
				{
					if (obePerfilListar.ListaPerfil != null && obePerfilListar.ListaPerfil.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstPerfil.txt");
						listaPerfiles = ucCustomSerializer.Serializar(obePerfilListar.ListaPerfil, '¦', '¯', false, archivo);
					}
				}

				rpta = String.Format("{0}¬{1}¬2", listaPerfiles, obePerfilListar.Rpta);
			}
			return (rpta);
		}

		public string actualizarEstado(bePerfil obePerfil, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brPerfil obrPerfil = new brPerfil();
				obePerfil.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				bePerfilListar obePerfilListar = obrPerfil.ActualizarEstado(obePerfil);
				string listaPerfiles = "";

				if (obePerfilListar != null)
				{
					if (obePerfilListar.ListaPerfil != null && obePerfilListar.ListaPerfil.Count > 0)
					{
						string archivo = Server.MapPath("~//Files//EstPerfil.txt");
						listaPerfiles = ucCustomSerializer.Serializar(obePerfilListar.ListaPerfil, '¦', '¯', false, archivo);
					}
				}

				rpta = String.Format("{0}¬{1}¬3", listaPerfiles, obePerfilListar.Rpta);
			}
			return (rpta);
		}

		[frSeguridad]
		public ActionResult AsignacionPerfil()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}

		[frSeguridad]
		public string obtenerListasMenuPerfil(string ss)
		{
			string rpta = "";
			string listaPerfil = "";
			string listaMenu = "";
			string listaMenuPerfil = "";
			string listaMenuPrivilegio = "";
			string ListaMenuAccionPerfil = "";
			brMenuPerfil obrMenuPerfil = new brMenuPerfil();
			beMenuPerfilListas obeMenuPerfilListas = obrMenuPerfil.obtenerListas();
			if (obeMenuPerfilListas != null)
			{
				if (obeMenuPerfilListas.ListaPerfil != null && obeMenuPerfilListas.ListaPerfil.Count > 0)
				{
					listaPerfil = ucCustomSerializer.Serializar(obeMenuPerfilListas.ListaPerfil, '|', ';', false, "");
				}
				if (obeMenuPerfilListas.ListaMenu != null && obeMenuPerfilListas.ListaMenu.Count > 0)
				{
					listaMenu = ucCustomSerializer.Serializar(obeMenuPerfilListas.ListaMenu, '|', ';', false, "");
				}
				if (obeMenuPerfilListas.ListaMenuPerfil != null && obeMenuPerfilListas.ListaMenuPerfil.Count > 0)
				{
					string archivo = Server.MapPath("~//Files//EstMenuPerfil.txt");
					listaMenuPerfil = ucCustomSerializer.Serializar(obeMenuPerfilListas.ListaMenuPerfil, '|', ';', false, archivo);
				}
				if (obeMenuPerfilListas.ListaMenuPrivilegio != null && obeMenuPerfilListas.ListaMenuPrivilegio.Count > 0)
				{
					listaMenuPrivilegio = ucCustomSerializer.Serializar(obeMenuPerfilListas.ListaMenuPrivilegio, '|', ';', false, "");
				}
				if (obeMenuPerfilListas.ListaMenuAccionPerfil != null && obeMenuPerfilListas.ListaMenuAccionPerfil.Count > 0)
				{
					ListaMenuAccionPerfil = ucCustomSerializer.Serializar(obeMenuPerfilListas.ListaMenuAccionPerfil, '|', ';', false, "");
				}
				rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}", listaPerfil, listaMenu, listaMenuPerfil, listaMenuPrivilegio, ListaMenuAccionPerfil);
			}
			return rpta;
		}

		[frSeguridad]
		public string grabarMenuPerfil(string valores, string ss)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				string[] MatrizValores = valores.Split('_');
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				int UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				brMenuPerfil obrMenuPerfil = new brMenuPerfil();
				bool exito = obrMenuPerfil.actualizarLista(MatrizValores[0], UsuarioCreadorId);
				string valorrpta = actualizarMenuAccion(MatrizValores[1], int.Parse(MatrizValores[2]));
				if (exito && valorrpta!="") rpta = obtenerListasMenuPerfil(ss);
			}
			return rpta;
		}

		public ActionResult MantenimientoUsuario()
		{
			ViewBag.versionJS = versionJS;
			return View();
		}
		[frSeguridad]
		public string listarUsuario(string ss)
		{
			string rpta = "";
			brUsuarioListar obrUsuarioListar = new brUsuarioListar();
			beUsuarioListar lbeUsuarioListar = obrUsuarioListar.obtenerListas();

			if (lbeUsuarioListar != null)
			{
				//string archivo = Server.MapPath("~//Files//EstUsuario.txt");
				string listaUsuarioCompaniaSucursal = ucCustomSerializer.Serializar(lbeUsuarioListar.lbeUsuarioCompaniaSucursal, '¦', '¯', false, "");
				string listaCompaniaSucursal = ucCustomSerializer.Serializar(lbeUsuarioListar.lbeCompaniaSucursal, '¦', '¯', false, "");
				string listaPerfilNombre = ucCustomSerializer.Serializar(lbeUsuarioListar.lbePerfilNombre, '¦', '¯', false, "");
				string listaCompania = ucCustomSerializer.Serializar(lbeUsuarioListar.lbeCompania, '¦', '¯', false, "");
				string listaSucursalCompania = ucCustomSerializer.Serializar(lbeUsuarioListar.lbeSucursalCompania, '¦', '¯', false, "");
				string listaTipoDocumento = ucCustomSerializer.Serializar(lbeUsuarioListar.lbeTipoDocumento, '¦', '¯', false, "");
				rpta = String.Format("{0}¬{1}¬{2}¬{3}¬{4}¬{5}", listaUsuarioCompaniaSucursal, listaCompaniaSucursal, listaPerfilNombre, listaCompania, listaSucursalCompania, listaTipoDocumento);
			}
			return rpta;
		}

		[frSeguridad]
		public string grabarUsuario(string ss, beUsuarioMantenimiento obeUsuarioMantenimiento, int UsuarioId, string abcde, short opc)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				brUsuarioListar obrUsuarioListar = new brUsuarioListar();
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				obeUsuarioMantenimiento.UsuarioCreadorId = obeUsuarioLogin.UsuarioId;
				int id;
				switch (opc)
				{
					case 1:
						id = obrUsuarioListar.Adicionar(obeUsuarioMantenimiento);
						if (id > -1)
						{
							string nombreUsuario = String.Format("{0} {1}", obeUsuarioMantenimiento.Nombre, obeUsuarioMantenimiento.ApellidoPaterno);
							int pos = Request.Url.ToString().IndexOf("Administracion");
							string urlNew = Request.Url.ToString().Substring(0, pos);
							string url = urlNew.Replace("grabarUsuario", "Login");
							bool adicion = ucCorreo.enviarClave("Creación de Nuevo Usuario", nombreUsuario, obeUsuarioMantenimiento.CodigoUsuario, obeUsuarioMantenimiento.CorreoElectronico, abcde, url);

							string listaUsuario = listarUsuario(ss);
							rpta = string.Format("{0}¬1", listaUsuario);
						}
						else
						{
							rpta = string.Format("{0}¬1", id);
						}
						break;
					case 2:

						id = obrUsuarioListar.Actualizar(UsuarioId, obeUsuarioMantenimiento);
						if (id > -1)
						{
							string listaUsuario = listarUsuario(ss);
							rpta = string.Format("{0}¬2", listaUsuario);
						}
						else
						{
							rpta = string.Format("{0}¬2", id);
						}
						break;
				}
			}
			return (rpta);
		}

		public string anularUsuario(string ss, int id, string est)
		{
			string rpta = "";
			if (Session["Usuario" + ss] != null)
			{
				beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
				brUsuarioListar obrUsuarioListar = new brUsuarioListar();
				bool exito = obrUsuarioListar.actualizarEstado(id, est, obeUsuarioLogin.UsuarioId);
				if (exito)
				{
					string listaUsuario = listarUsuario(ss);
					rpta = string.Format("{0}¬3", listaUsuario);
				}
			}
			return rpta;
		}

		public string obtenerMenuAccion(int id,int perfil)
		{
			string rpta = "";
			brMenuPerfil obrMenuPerfil = new brMenuPerfil();
			List<beCampoEnteroLargo> lbeAccion = obrMenuPerfil.MenuAccionLista(id, perfil);
			if (lbeAccion != null)
			{
				rpta = ucCustomSerializer.Serializar(lbeAccion, '¦', '¯', false, "");
			}
			return rpta;
		}

		public string actualizarMenuAccion(string lista,int id)
		{
			string rpta = "";
			if (lista != "")
			{
				brMenuPerfil obrMenuPerfil = new brMenuPerfil();
				bool exito = obrMenuPerfil.actualizarMenuAccionLista(lista,id);
				if (exito)
				{
					rpta = "OK";
				}
			}
			return rpta;
		}
	}
}
