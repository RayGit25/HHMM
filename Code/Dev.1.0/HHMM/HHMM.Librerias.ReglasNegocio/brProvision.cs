using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.ReglasNegocio
{
    public class brProvision : brGeneral
    {
		public beProvisionDetalleVistaListas listar(int id)
        {
			beProvisionDetalleVistaListas obeProvisionDetalleVistaListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daProvision odaProvision = new daProvision();
					obeProvisionDetalleVistaListas = odaProvision.listar(con, id);
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
			return (obeProvisionDetalleVistaListas);
        }

		public List<beAsientoContable> listarAsientoContable(string sucursalId, int procesoId)
		{
			List<beAsientoContable> lbeAsientoContable = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProvision odaProvision = new daProvision();
					lbeAsientoContable = odaProvision.listarAsientoContable(con, sucursalId, procesoId);
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
			return (lbeAsientoContable);
		}

		public int RevertirAsientoProvision( string su, int id, int usuario,string ip,string bd)
		{
			int exito = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProvision odaProvision = new daProvision();
					exito = odaProvision.RevertirAsientoProvision(con, su,id,usuario,ip,bd);
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
		public int RevertirAsientoProvisionCSFR(string su, int id, int usuario, string ip, string bd)
		{
			int exito = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProvision odaProvision = new daProvision();
					exito = odaProvision.RevertirAsientoProvisionCSFR(con, su, id, usuario, ip, bd);
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
		public List<beMedicoSeleccionProvision> ListarMedicoSeleccionProvision(string sucursalId, int procesoid)
		{
			List<beMedicoSeleccionProvision> lbeMedicoSeleccionProvision = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daProvision odaProvision = new daProvision();
					lbeMedicoSeleccionProvision = odaProvision.ListarMedicoSeleccionProvision(con, sucursalId, procesoid);
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
			return (lbeMedicoSeleccionProvision);
		}
    }
}
