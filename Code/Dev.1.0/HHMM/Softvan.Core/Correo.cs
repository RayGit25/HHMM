using System;
using System.Net;
using System.Net.Mail;
using Softvan.Core.Entidades;

namespace Softvan.Core
{
    public class Correo
    {
        public static bool Enviar(beCorreo obeCorreo)
        {
            bool flag = false;
            string str = $"{AppSettings.Get("_RutaLog")}{FormatoTexto.AnioMesDia(AppSettings.Get("_NombreLog"), ".txt")}";
            try
            {
                int num;
                string servidor = obeCorreo.Servidor;
                string text9 = servidor;
                if (servidor == null)
                {
                    string local1 = servidor;
                    text9 = AppSettings.Get("_CorreoServidor");
                }
                obeCorreo.Servidor = text9;
                string puerto = obeCorreo.Puerto;
                string text10 = puerto;
                if (puerto == null)
                {
                    string local2 = puerto;
                    text10 = AppSettings.Get("_CorreoPuerto");
                }
                obeCorreo.Puerto = text10;
                string de = obeCorreo.De;
                string text11 = de;
                if (de == null)
                {
                    string local3 = de;
                    text11 = AppSettings.Get("_CorreoDe");
                }
                obeCorreo.De = text11;
                string clave = obeCorreo.Clave;
                string text12 = clave;
                if (clave == null)
                {
                    string local4 = clave;
                    text12 = AppSettings.Get("_CorreoClave");
                }
                obeCorreo.Clave = text12;
                string asunto = obeCorreo.Asunto;
                string text13 = asunto;
                if (asunto == null)
                {
                    string local5 = asunto;
                    text13 = AppSettings.Get("_CorreoAsunto");
                }
                obeCorreo.Asunto = text13;
                string contenido = obeCorreo.Contenido;
                string text14 = contenido;
                if (contenido == null)
                {
                    string local6 = contenido;
                    text14 = AppSettings.Get("_CorreoContenido");
                }
                obeCorreo.Contenido = text14;
                string aliasNombre = obeCorreo.AliasNombre;
                string text15 = aliasNombre;
                if (aliasNombre == null)
                {
                    string local7 = aliasNombre;
                    text15 = AppSettings.Get("_CorreoAliasNombre");
                }
                obeCorreo.AliasNombre = text15;
                string aliasCuenta = obeCorreo.AliasCuenta;
                string text16 = aliasCuenta;
                if (aliasCuenta == null)
                {
                    string local8 = aliasCuenta;
                    text16 = AppSettings.Get("_CorreoAliasCuenta");
                }
                obeCorreo.AliasCuenta = text16;
                obeCorreo.EsHTML = new bool?((obeCorreo.EsHTML == null) ? bool.Parse(AppSettings.Get("_CorreoHabilitarCuerpoHtml")) : obeCorreo.EsHTML.Value);
                obeCorreo.EsSSL = new bool?((obeCorreo.EsSSL == null) ? bool.Parse(AppSettings.Get("_CorreoHabilitarSSL")) : obeCorreo.EsSSL.Value);
                MailMessage message = new MailMessage
                {
                    Subject = obeCorreo.Asunto,
                    Body = obeCorreo.Contenido,
                    IsBodyHtml = obeCorreo.EsHTML.Value,
                    From = new MailAddress(obeCorreo.AliasCuenta, obeCorreo.AliasNombre),
                    Sender = new MailAddress(obeCorreo.AliasCuenta, obeCorreo.AliasNombre)
                };
                if ((obeCorreo.Para != null) && (obeCorreo.Para.Length != 0))
                {
                    foreach (string str2 in obeCorreo.Para)
                    {
                        message.To.Add(new MailAddress(str2));
                    }
                }
                if ((obeCorreo.CC != null) && (obeCorreo.CC.Length != 0))
                {
                    foreach (string str3 in obeCorreo.CC)
                    {
                        message.CC.Add(new MailAddress(str3));
                    }
                }
                if ((obeCorreo.CCO != null) && (obeCorreo.CCO.Length != 0))
                {
                    foreach (string str4 in obeCorreo.CCO)
                    {
                        message.Bcc.Add(new MailAddress(str4));
                    }
                }
                if ((obeCorreo.Archivo != null) && (obeCorreo.Archivo.Length != 0))
                {
                    foreach (string str5 in obeCorreo.Archivo)
                    {
                        message.Attachments.Add(new Attachment(str5));
                    }
                }
                SmtpClient client = new SmtpClient
                {
                    Host = obeCorreo.Servidor
                };
                if (!int.TryParse(obeCorreo.Puerto, out num))
                {
                    num = 0x19;
                }
                client.Port = num;
                client.EnableSsl = obeCorreo.EsSSL.Value;
                client.UseDefaultCredentials = false;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Credentials = new NetworkCredential(obeCorreo.De, obeCorreo.Clave);
                client.Send(message);
                flag = true;
            }
            catch (Exception exception1)
            {
                ArchivoTexto<Exception>.GenerarArchivo(exception1, null, "");
            }
            return flag;
        }
    }
}
