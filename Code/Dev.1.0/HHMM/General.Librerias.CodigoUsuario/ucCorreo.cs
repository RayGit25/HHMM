using System;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Net.NetworkInformation;
using General.Librerias.EntidadesNegocio;
using System.Threading;
using System.Threading.Tasks;

namespace General.Librerias.CodigoUsuario
{
    public class ucCorreo
    {
        public static bool enviar(beMensaje obeMensaje)
        {
            bool exito = false;
            string rutaLog = ConfigurationManager.AppSettings["rutaLog"];
            string archivo = String.Format("{0}{1}", rutaLog, ucCadena.fomatoAMD("LogError", ".txt"));
            try
            {
                string servidor = ConfigurationManager.AppSettings["CorreoServidor"];
                string puerto = ConfigurationManager.AppSettings["CorreoPuerto"];
                MailMessage eMail = new MailMessage();
                eMail.Subject = obeMensaje.Asunto;
				eMail.IsBodyHtml = Boolean.Parse(ConfigurationManager.AppSettings["CorreoHabilitarCuerpoHtml"]);
                eMail.Body = obeMensaje.Contenido;
                eMail.From = new MailAddress(obeMensaje.De);
                if (obeMensaje.Para != null && obeMensaje.Para.Length > 0)
                {
                    foreach (string para in obeMensaje.Para)
                    {
                        eMail.To.Add(new MailAddress(para));
                    }
                }
                if (obeMensaje.CC != null && obeMensaje.CC.Length > 0)
                {
                    foreach (string cc in obeMensaje.CC)
                    {
                        eMail.CC.Add(new MailAddress(cc));
                    }
                }
				if (obeMensaje.Archivo != null && obeMensaje.Archivo.Length > 0)
				{
					foreach (string aa in obeMensaje.Archivo)
					{
						eMail.Attachments.Add(new Attachment(aa));
					}
				}
                SmtpClient smtp = new SmtpClient();
                smtp.Host = servidor;
                int n;
                bool res = int.TryParse(puerto, out n);
                if (!res) n = 25;
                smtp.Port = n;
				smtp.EnableSsl = Boolean.Parse(ConfigurationManager.AppSettings["CorreoHabilitarSSL"]);
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential(obeMensaje.De, obeMensaje.Clave);
                smtp.Send(eMail);
				eMail.Dispose();
				smtp.Dispose();
                exito = true;
            }
            catch (Exception ex)
            {
                ucObjeto<Exception>.grabarArchivoTexto(ex, archivo);
            }
            return (exito);
        }

        public static bool enviarClave(string asunto, string usuarioNombre, string usuarioCodigo, string correoPara, string claveNormal, string url)
        {
            string[] para = new string[] { correoPara };
            beMensaje obeMensaje = new beMensaje();
            obeMensaje.De = ConfigurationManager.AppSettings["CorreoDe"];
            obeMensaje.Clave = ConfigurationManager.AppSettings["CorreoClave"];
            obeMensaje.Para = para;
            obeMensaje.Asunto = asunto;
            StringBuilder sb = new StringBuilder();
            sb.Append("Estimado(a): ");
            sb.Append(usuarioNombre);
            sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append("Tu usuario del sistema es:");
			sb.Append(Environment.NewLine);
            sb.Append(usuarioCodigo);
			sb.Append(Environment.NewLine);
            sb.Append("Tu nueva contraseña es:");
			sb.Append(Environment.NewLine);
            sb.Append(claveNormal);
			sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append("Puede ingresar al sistema desde la siguiente ruta:");
			sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append(url);
			sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append("La primera vez que ingrese al sistema, se le solicitará que cambie esta contraseña por una nueva, esta solicitud aparecerá hasta que efectivamente cambie su contraseña.");
			sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append("Administrador del sistema.");
			sb.Append(Environment.NewLine);
			sb.Append(Environment.NewLine);
            sb.Append("PD: No responder a este correo.");
            obeMensaje.Contenido = sb.ToString();
            bool exito = ucCorreo.enviar(obeMensaje);
            return exito;
        }
    }
}
