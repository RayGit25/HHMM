using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
using System.Threading.Tasks;
using System.IO;
using System.Text;
using System.Configuration;


namespace HHMM.Librerias.ReglasNegocio
{
	public class brAprobacionMedico:brGeneral
	{
		public beAprobacionMedicoListas listas(beFrHorarioMedicoConsulta obeFrHorarioMedicoConsulta)
		{
			beAprobacionMedicoListas obeAprobacionMedicoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daAprobacionMedico odaAprobacionMedico = new daAprobacionMedico();
					obeAprobacionMedicoListas = odaAprobacionMedico.listas(con, obeFrHorarioMedicoConsulta);
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
			return (obeAprobacionMedicoListas);
		}
		public int grabarAprobacion(string listaMedicos,string sucursalId,int anio,int mes,int usuarioId)
		{
			int exito=-1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daAprobacionMedico odaAprobacionMedico = new daAprobacionMedico();
					exito = odaAprobacionMedico.grabarAprobacion(con, listaMedicos, sucursalId, anio,mes,usuarioId);
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
