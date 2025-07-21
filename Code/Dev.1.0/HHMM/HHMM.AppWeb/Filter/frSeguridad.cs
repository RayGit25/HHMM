using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using HHMM.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
namespace HHMM.AppWeb.Filter
{
	public class frSeguridad : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			string id = "";

			if (filterContext.HttpContext.Request.QueryString["ss"] != null)
			{
				id = filterContext.HttpContext.Request.QueryString["ss"];
			}
			else
			{
				id = filterContext.HttpContext.Request.Form["ss"];
			}

			if (filterContext.HttpContext.Session["Usuario" + id] == null && filterContext.HttpContext.Session["Caduco" + id] == null)
			{
				filterContext.HttpContext.Response.Clear();
				//filterContext.HttpContext.Response.Write("<script>window.parent.parent.location.href='http://192.168.1.10/HHMM/HHMM.AppWeb/';</script>");
				filterContext.HttpContext.Response.Write("reload<script>window.parent.parent.location.href='" + filterContext.HttpContext.Request.Url.Scheme + "://" + filterContext.HttpContext.Request.Url.Authority + filterContext.HttpContext.Request.ApplicationPath + "';</script>");
			}
		}
	}
}