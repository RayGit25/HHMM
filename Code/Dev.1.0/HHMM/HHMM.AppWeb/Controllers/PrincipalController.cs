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
namespace HHMM.AppWeb.Controllers
{
    
    public class PrincipalController : Controller
    {
		string versionJS = ConfigurationManager.AppSettings["VersionJS"];
		[frSeguridad]
		

        public ActionResult Inicio(string mensaje, string ss,string sucursalId,string idCompania)
        {
			ViewBag.Mensaje = mensaje;
			ViewBag.versionJS = versionJS;
			ViewBag.versionAPI = ConfigurationManager.AppSettings["VersionAplicativo"];
			ViewBag.TituloAplicativo = ConfigurationManager.AppSettings["TituloAplicativo"];
			beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
			if (obeUsuarioLogin != null)
			{
				if (sucursalId != null)
				{
					Session["Sucursal" + ss] = sucursalId;
				}
				if (Session["Sucursal" + ss] != null)
				{
					brMenuPerfil obrMenuPerfil = new brMenuPerfil();
					string[] sucursal = obrMenuPerfil.listarSucursal(Session["Sucursal" + ss].ToString(), obeUsuarioLogin.UsuarioId, obeUsuarioLogin.IdCompania).Split('¬');
					ViewBag.UsuarioNombre = String.Format("{0} {1}", obeUsuarioLogin.Nombre, obeUsuarioLogin.ApellidoPaterno);
					ViewBag.UsuarioPerfil = String.Format("{0} {1} - {2} / {3}", obeUsuarioLogin.Nombre, obeUsuarioLogin.ApellidoPaterno, obeUsuarioLogin.CodigoUsuario, obeUsuarioLogin.NombrePerfil);
					ViewBag.idSesion = ss;
					ViewBag.idSucursal = sucursal[0];
					ViewBag.listaSucursal = sucursal[1];
					ViewBag.Anio = DateTime.Today.Year.ToString();
					ViewBag.Mes = DateTime.Today.Month.ToString();
					ViewBag.vistaPerfil = obeUsuarioLogin.PerfilId;
                    ViewBag.esAdministrador = obeUsuarioLogin.UsuarioAdministrador;

                }
			}
			return View();
        }

        public string crearMenus(string ss)
        {
            StringBuilder sb = new StringBuilder();
            List<beMenu> lbeMenu = null;
            beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
            if (obeUsuarioLogin != null)
            {
                brMenuPerfil obrMenuPerfil = new brMenuPerfil();
                lbeMenu = obrMenuPerfil.listarPorPerfil(obeUsuarioLogin.PerfilId);
                if (lbeMenu != null && lbeMenu.Count > 0)
                {
                    string archivo = Server.MapPath("~/Files/EstMenu.txt");
                    sb.Append(ucCustomSerializer.Serializar(lbeMenu, '¦', '¬', false));
                }

            }

            return (sb.ToString());
        }
        public ActionResult PaginaVacia()
        {
            return View();
        }
		public ActionResult HistorialCambio()
		{
			ViewBag.Tabla=Request.QueryString["t"];
			ViewBag.Id = Request.QueryString["i"];
			ViewBag.versionJS = versionJS;
			return View();
		}
		public string obtenerListaHistorial(string t,string i) {

			string rpta = "";
			brHistorialCambio obrHistorialCambio = new brHistorialCambio();
			List<beHistorialCambio> lbeHistorialCambio = obrHistorialCambio.listar(t,i);
			string archivo = Server.MapPath("~/Files/EstHistorialCambio.txt");
			if (lbeHistorialCambio != null && lbeHistorialCambio.Count > 0) {
				rpta = ucCustomSerializer.Serializar(lbeHistorialCambio, '¦', '¬', false, archivo, false, true);
			}
			return rpta;
		}

    }
}
