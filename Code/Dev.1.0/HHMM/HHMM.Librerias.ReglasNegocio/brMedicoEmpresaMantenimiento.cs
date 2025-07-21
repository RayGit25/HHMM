using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brMedicoEmpresaMantenimiento:brGeneral
	{
		public beMedicoEmpresaMantenimientoVistaListas MedicoEmpresaMantenimientoLista(string su, int id)
		{
			beMedicoEmpresaMantenimientoVistaListas obeMedicoEmpresaMantenimientoVistaListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoEmpresaMantenimiento odaMedicoEmpresaMantenimiento = new daMedicoEmpresaMantenimiento();
					obeMedicoEmpresaMantenimientoVistaListas = odaMedicoEmpresaMantenimiento.MedicoEmpresaMantenimientoLista(con,su,id);
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
			return (obeMedicoEmpresaMantenimientoVistaListas);
		}

		public bool ActualizarMedicoEmpresa(int persona, string tipomedico, string su, string correoelectronico, string correoalterno, string tiposervicio, int usuario,string estadoweb)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daMedicoEmpresaMantenimiento odaMedicoEmpresaMantenimiento = new daMedicoEmpresaMantenimiento();
					exito = odaMedicoEmpresaMantenimiento.ActualizarMedicoEmpresa(con, persona, tipomedico, su, correoelectronico, correoalterno, tiposervicio, usuario, estadoweb);
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
	}
}
