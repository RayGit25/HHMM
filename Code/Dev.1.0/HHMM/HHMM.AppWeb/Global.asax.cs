using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Fleck;
using System.Configuration;
using System.Security.Cryptography.X509Certificates;
using System.Security.Authentication;

namespace HHMM.AppWeb
{
	public class MvcApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			WebApiConfig.Register(GlobalConfiguration.Configuration);
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);

			string ip = ConfigurationManager.AppSettings["WebSocketIp"];
			string puerto = ConfigurationManager.AppSettings["WebSocketPuerto"];
			bool sockethttps = bool.Parse(ConfigurationManager.AppSettings["WebSocketHttps"]);
            string cer = ConfigurationManager.AppSettings["rutaCer"];
            string cerpass = ConfigurationManager.AppSettings["passCer"];

            string ruta = "";
			if (sockethttps) ruta = "wss://" + ip + ":" + puerto;
			else ruta = "ws://" + ip + ":" + puerto;
			//string ruta = "ws://" + ip + ":" + puerto;

			List<IWebSocketConnection> usuarios = new List<IWebSocketConnection>();
			WebSocketServer servidor = new WebSocketServer(ruta);
            if (sockethttps)
            {
                servidor.Certificate = new X509Certificate2(cer, cerpass);
                servidor.EnabledSslProtocols = SslProtocols.Tls12 | SslProtocols.Ssl3 | SslProtocols.Tls11 | SslProtocols.Tls;
            }

            servidor.Start(socket =>
			{
				socket.OnOpen = () =>
				{
					usuarios.Add(socket);
				};
				socket.OnClose = () =>
				{
					usuarios.Remove(socket);
				};
				socket.OnMessage = mensaje =>
				{
					usuarios.ToList().ForEach(s => s.Send(mensaje));
				};
			});
			Application["usuarios"] = usuarios;
		}
	}
}