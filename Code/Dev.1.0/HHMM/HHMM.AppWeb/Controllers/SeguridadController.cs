using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using General.Librerias.CodigoUsuario;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.EntidadesNegocio;
using HHMM.Librerias.ReglasNegocio;
using HHMM.AppWeb.Filter;
using System.DirectoryServices;

namespace HHMM.AppWeb.Controllers
{
    public class SeguridadController : Controller
    {
        string c = "";
        string versionJS = ConfigurationManager.AppSettings["VersionJS"];
        public ActionResult Login(string ss)
        {
            ViewBag.versionJS = versionJS;
            return View();
        }
        public void limpiarCache()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.Now.Subtract(new TimeSpan(1, 0, 0)));
            Response.Cache.SetLastModified(DateTime.Now);
            Response.Cache.SetAllowResponseInBrowserHistory(false);
        }
        public string crearCaptcha()
        {
            limpiarCache();
            beCaptcha obeCaptcha = ucImagen.crearCaptcha(200, 80, "Arial", 35);
            TempData["Codigo"] = obeCaptcha.Codigo;
            string rpta = Convert.ToBase64String(obeCaptcha.Imagen);
            return rpta;
        }
        private static Random oAzar = new Random();
        private string generarNumeroAzar()
        {

            string text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 10; i++)
                text += possible[(oAzar.Next(possible.Length))];
            return text;
        }

        public string obtenerListasCompanias()
        {
            string rpta1 = "";
            rpta1 = ConfigurationManager.AppSettings["ListaCompanias"].ToString();
            return rpta1;
        }
        public string validarLogin(string codigo, string usuario, string clave, int cnt, int acc, string pw, string idCompania)
        {
            string rpta = "";
            string codigoGenerado = "";
            if (cnt >= 4)
            {
                codigoGenerado = TempData["Codigo"].ToString();
                TempData["Codigo"] = codigoGenerado;
            }
            if (!codigo.Equals(codigoGenerado) && cnt >= 4)
            {
                rpta = "-6";
            }
            else
            {
                Session["BDUtilizar"] = idCompania;
                string IsDomain = ConfigurationManager.AppSettings["IsDomainActiveDirectory"];

                beUsuarioMensaje obeUsuarioMensaje = null;
                brUsuarioContrasena obrUsuarioContrasena = new brUsuarioContrasena();
                SearchResult oUsuario = null;

                obeUsuarioMensaje = obrUsuarioContrasena.validarADLogin(usuario);
                bool esAd = false;

                if (obeUsuarioMensaje != null && obeUsuarioMensaje.UsuarioLogin != null && obeUsuarioMensaje.UsuarioLogin.IndicadorAD)
                {
                    obeUsuarioMensaje.UsuarioLogin.IdCompania = idCompania;
                    esAd = true;
                    string[] roots = ConfigurationManager.AppSettings["ConnectionActiveDirectory"].ToString().Split(';');
                    string[] dominios = ConfigurationManager.AppSettings["DomainActiveDirectory"].ToString().Split(';');
                    //string[] listas = ConfigurationManager.AppSettings["ListaCompanias"].ToString().Split('¬');
                    int n = roots.Length;

                    string adPath = "";
                    string strDomain = "";

                    for (int i = 0; i < n; i++)
                    {
                        adPath = "LDAP://" + roots[i];
                        strDomain = dominios[i];

                        oUsuario = AutenticateUser(adPath, strDomain, usuario, pw);
                        if (oUsuario != null) { break; }

                    }

                }

                if (oUsuario != null && esAd)
                {
                    obeUsuarioMensaje.Mensaje = "";
                }
                else if (oUsuario == null && esAd) {
                    obeUsuarioMensaje.Mensaje = "-2";
                }

                
                if(!esAd)
                {
                    obeUsuarioMensaje = obrUsuarioContrasena.validarLogin(usuario, clave);
                    if (obeUsuarioMensaje != null && obeUsuarioMensaje.UsuarioLogin != null)
                    {
                        obeUsuarioMensaje.UsuarioLogin.IndicadorAD = false;
                        obeUsuarioMensaje.UsuarioLogin.IdCompania = idCompania;
                    }

                    //if (idCompania.Equals("000000"))
                    //{
                    //    //SAHSAC
                    //    obeUsuarioMensaje = obrUsuarioContrasena.validarLogin(usuario, clave);
                    //    if (obeUsuarioMensaje != null && obeUsuarioMensaje.UsuarioLogin != null)
                    //    {
                    //        obeUsuarioMensaje.UsuarioLogin.IndicadorAD = false;
                    //        obeUsuarioMensaje.UsuarioLogin.IdCompania = idCompania;
                    //    }
                    //}
                    //else
                    //{
                    //    //San Borja
                    //    obeUsuarioMensaje = obrUsuarioContrasena.validarLoginCSB(usuario, clave);
                    //    if (obeUsuarioMensaje != null && obeUsuarioMensaje.UsuarioLogin != null)
                    //    {
                    //        obeUsuarioMensaje.UsuarioLogin.IndicadorAD = false;
                    //        obeUsuarioMensaje.UsuarioLogin.IdCompania = idCompania;
                    //    }
                    //}
                }

                if (obeUsuarioMensaje.Mensaje == "")
                {
                    c = generarNumeroAzar();
                    Session["Usuario" + c] = obeUsuarioMensaje.UsuarioLogin;
                    //Session["BDUtilizar"] = idCompania.Equals("000000")? "conHTE": "_conexionHHMMCSB";
                    if (acc == 0)
                    {
                        beUsuarioSucursalCompaniaListas SucursalCompaniaListas = obrUsuarioContrasena.ListarCompaniaSucursal(obeUsuarioMensaje.UsuarioLogin.UsuarioId,idCompania);
                        string listaCompania = "";
                        string listaSucursal = "";
                        if (SucursalCompaniaListas != null)
                        {
                            if (SucursalCompaniaListas.ListaUsuarioCompania != null && SucursalCompaniaListas.ListaUsuarioCompania.Count > 0)
                            {
                                listaCompania = ucCustomSerializer.Serializar(SucursalCompaniaListas.ListaUsuarioCompania, '¦', '¬', false);
                            }
                            if (SucursalCompaniaListas.ListaUsuarioSucursal != null && SucursalCompaniaListas.ListaUsuarioSucursal.Count > 0)
                            {
                                listaSucursal = ucCustomSerializer.Serializar(SucursalCompaniaListas.ListaUsuarioSucursal, '¦', '¬', false);
                            }
                            rpta = String.Format("{0}¯{1}¯{2}¯{3}", obeUsuarioMensaje.UsuarioLogin.EstadoRegistro, c, listaCompania, listaSucursal);
                        }
                    }
                    else
                    {
                        rpta = obeUsuarioMensaje.UsuarioLogin.EstadoRegistro + "¯" + c;
                    }
                }
                else
                {
                    if (obeUsuarioMensaje.Mensaje.Equals("-1")) {
                        Session["BDUtilizar"] = idCompania;
                    }
                    c = generarNumeroAzar();
                    rpta = obeUsuarioMensaje.Mensaje;
                    string listaCompania = "";
                    string listaSucursal = "";
                    if (rpta != null)
                    {

                        int n = int.Parse(rpta);
                        if (n >= 0)
                        {
                            Session["Usuario" + c] = obeUsuarioMensaje.UsuarioLogin;

                            beUsuarioSucursalCompaniaListas SucursalCompaniaListas = obrUsuarioContrasena.ListarCompaniaSucursal(obeUsuarioMensaje.UsuarioLogin.UsuarioId, idCompania);

                            if (SucursalCompaniaListas != null)
                            {
                                if (SucursalCompaniaListas.ListaUsuarioCompania != null && SucursalCompaniaListas.ListaUsuarioCompania.Count > 0)
                                {
                                    listaCompania = ucCustomSerializer.Serializar(SucursalCompaniaListas.ListaUsuarioCompania, '¦', '¬', false);
                                }
                                if (SucursalCompaniaListas.ListaUsuarioSucursal != null && SucursalCompaniaListas.ListaUsuarioSucursal.Count > 0)
                                {
                                    listaSucursal = ucCustomSerializer.Serializar(SucursalCompaniaListas.ListaUsuarioSucursal, '¦', '¬', false);
                                }
                            }

                        }
                        else
                        {
                            if (n == -1) Session["Caduco" + c] = obeUsuarioMensaje.UsuarioLogin;//Session["Usuario" + c] = obeUsuarioMensaje.UsuarioLogin;//
                        }
                    }
                    rpta = rpta + "¯" + c + "¯" + listaCompania + "¯" + listaSucursal;
                }
            }
            return rpta;
        }


        public ActionResult CambioContrasena(string ss)
        {
            ViewBag.versionJS = versionJS;
            string mensaje = Request.Form["mensaje"];
            ViewBag.ss = ss;
            if (mensaje != null && mensaje != "")
            {
                if (mensaje == "Su contraseña ya caducó") ViewBag.Caduco = "1";
                ViewBag.Mensaje = String.Format("<ul><li>{0}</li></ul>", mensaje);
            }

            if (Session["Usuario" + ss] != null)
            {
                beUsuarioLogin obeUsuarioLogin = (beUsuarioLogin)Session["Usuario" + ss];
                ViewBag.Ad = obeUsuarioLogin.IndicadorAD ? "1" : "0";
            }
            else
            {

                ViewBag.Ad = "0";
            }

            brParametroSeguridad obrParametroSeguridad = new brParametroSeguridad();
            beParametroSeguridadReglas obeParametroSeguridad = obrParametroSeguridad.obtenerReglas();
            if (obeParametroSeguridad != null)
            {
                ViewBag.Parametros = ucCustomSerializer.SerializarObjeto(obeParametroSeguridad, '|', "");
            }
            return View();
        }
        [frSeguridad]
        public string cambiarContrasena(string ss, string ca, string cn, string flg)
        //public string cambiarContrasena(string ca, string cn, string flg, string ss)
        {
            string rpta = "";
            int idUsuario = 0;
            beUsuarioLogin obeUsuario;
            if (flg == "1")
            {
                obeUsuario = (beUsuarioLogin)Session["Caduco" + ss];
            }
            else
            {
                obeUsuario = (beUsuarioLogin)Session["Usuario" + ss];
            }
            if (obeUsuario != null) idUsuario = obeUsuario.UsuarioId;
            brUsuarioContrasena obrUsuario = new brUsuarioContrasena();
            rpta = obrUsuario.actualizarClave(idUsuario, ca, cn);
            if ((rpta == "1" || rpta == "2") && flg == "1")
            {
                Session["Usuario" + ss] = obeUsuario;
                Session["Caduco" + ss] = null;
            }
            return rpta;
        }


        public ActionResult OlvidoContrasena()
        {
            ViewBag.versionJS = versionJS;
            return View();
        }

        public string restablecerClave(string cn, string cc, string correo)
        {
            string rpta = "";
            brUsuarioContrasena obrUsuario = new brUsuarioContrasena();

            string indicadorAd = obrUsuario.validarADPorCorreo(correo);

            if (indicadorAd.Equals("1"))
            {
                rpta = "Ud. tiene relacionado su usuario de la web con la red, no podrá restablecer la contraseña desde esta opción|0";
            }
            else {

                string usuario = obrUsuario.actualizarClavePorCorreo(correo, cc);
                if (usuario.Equals(""))
                {
                    rpta = "El correo electrónico No existe|0";

                }
                else
                {
                    string[] campos = usuario.Split('-');
                    string[] nombres = campos[1].Split(' ');

                    int pos = Request.Url.ToString().IndexOf("Seguridad");
                    string urlNew = Request.Url.ToString().Substring(0, pos);
                    string url = urlNew.Replace("restablecerClave", "Login");
                    bool exito = ucCorreo.enviarClave("Sanna: ¿Olvidó su Contraseña?", nombres[0], campos[0], correo, cn, url);
                    if (exito) rpta = String.Format("Estimado {0}, hemos enviado un mensaje a su correo electrónico indicado las instrucciones para cambiar su contraseña.|1", campos[1]);
                    else rpta = "No se pudo enviar el correo con la clave|0";
                }

            }

            return rpta;
        }

        public string CerrarSesion(string ss)
        {
            string rpta = "OK";
            Session.Remove("Usuario" + ss);
            return rpta;
        }

        private SearchResult AutenticateUser(string root, string domainName, string userName, string password)
        {
            SearchResult oUsuario = null;
            try
            {
                //bool exito = false;

                oUsuario = IsAuthenticated(root, domainName, userName, password);
                if (oUsuario != null)
                {

                }

            }
            catch (Exception e)
            {
                oUsuario = null;
            }

            return oUsuario;
        }

        private SearchResult IsAuthenticated(string root, string domainName, string userName, string password)
        {
            string sanitizedUser = EscapeLdapSearchFilter(userName);
            string domainAndUsername = domainName + "\\" + sanitizedUser;
            DirectoryEntry entry = new DirectoryEntry(root, domainAndUsername, password);

            object obj = entry.NativeObject;
            DirectorySearcher search = new DirectorySearcher(entry);
            search.Filter = "(SAMAccountName=" + sanitizedUser + ")";
            search.PropertiesToLoad.Add("cn");
            search.PropertiesToLoad.Add("sAMAccountName");
            search.PropertiesToLoad.Add("givenName");
            search.PropertiesToLoad.Add("sn");
            search.PropertiesToLoad.Add("co");
            search.PropertiesToLoad.Add("title");
            search.PropertiesToLoad.Add("mail");
            search.PropertiesToLoad.Add("sAMAccountType");
            SearchResult result = search.FindOne();
            return result;
        }

        public string listarCompanias()
        {
            string tmp = ConfigurationManager.AppSettings["ListaCompanias"];
            string rpta = !string.IsNullOrEmpty(tmp) ? tmp : "";
            return rpta;
        }
        private static string EscapeLdapSearchFilter(string filter)
        {
            if (string.IsNullOrEmpty(filter)) return filter;

            return filter
                .Replace("\\", "\\5c")
                .Replace("*", "\\2a")
                .Replace("(", "\\28")
                .Replace(")", "\\29")
                .Replace("\0", "\\00");
        }
    }
}
