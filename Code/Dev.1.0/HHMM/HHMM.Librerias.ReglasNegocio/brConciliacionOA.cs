using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
	public class brConciliacionOA : brGeneral
	{
		public List<beConciliacionOAVista> Listar(string su, DateTime fecini, DateTime fecfin, int med, int emp)
		{
			List<beConciliacionOAVista> lbeConciliacionOAVista = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConciliacionOA odaConciliacionOA = new daConciliacionOA();
					lbeConciliacionOAVista = odaConciliacionOA.Listar(con, su, fecini, fecfin, med, emp);
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
			return (lbeConciliacionOAVista);
		}

		public string adicionar(string su, int id, int usuario, string descripcion, string lista, bool indicador)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConciliacionOA odaConciliacionOA = new daConciliacionOA();
					rpta = odaConciliacionOA.adicionar(con, su, id, usuario, descripcion, lista, indicador);
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
			return (rpta);
		}

		public string listarId(int id)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConciliacionOA odaConciliacionOA = new daConciliacionOA();
					rpta = odaConciliacionOA.listarId(con,id);
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
			return (rpta);
		}

		public string Procesar(int id,int usuario)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConciliacionOA odaConciliacionOA = new daConciliacionOA();
					rpta = odaConciliacionOA.Procesar(con, id,usuario);
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
			return (rpta);
		}

		public string ActualizarEstado(int id, int usuario, string estado)
		{
			string rpta = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daConciliacionOA odaConciliacionOA = new daConciliacionOA();
					rpta = odaConciliacionOA.ActualizarEstado(con, id,usuario,estado);
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
			return (rpta);
		}
		
		
	}
}
