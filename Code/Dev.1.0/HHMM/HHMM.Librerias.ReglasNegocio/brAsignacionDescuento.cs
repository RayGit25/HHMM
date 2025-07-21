using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brAsignacionDescuento : brGeneral
    {
        public beAsignacionDescuentoVistaLista listarVista(string sup, int pe, int med, DateTime fei, DateTime fef,int EmpresaId,int EspecialidadId,bool indicador)
        {
            beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
					obeAsignacionDescuentoVistaLista = odaAsignacionDescuento.listarVista(con, sup, pe, med, fei, fef, EmpresaId, EspecialidadId,indicador);
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
            return (obeAsignacionDescuentoVistaLista);
        }

        public beAsignacionDescuentoListas listarListas()
        {
            beAsignacionDescuentoListas obeAsignacionDescuentoListas = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
                    obeAsignacionDescuentoListas = odaAsignacionDescuento.listarListas(con);
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
            return (obeAsignacionDescuentoListas);
        }

		public List<beMedicoContratoDescuento> listarDescuentos(int id)
		{
			List<beMedicoContratoDescuento> lbeMedicoContratoDescuento = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
					lbeMedicoContratoDescuento = odaAsignacionDescuento.listarDescuentos(con, id);
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
			return (lbeMedicoContratoDescuento);
		}

        public beMedicoContratoDescuento listarDescuentoPorId( int id)
        {
            beMedicoContratoDescuento obeMedicoContratoDescuento = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
                    obeMedicoContratoDescuento = odaAsignacionDescuento.listarDescuentoPorId(con, id);
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
            return (obeMedicoContratoDescuento);
        }

        public int adicionarDescuento(beMedicoContratoDescuentoPorId obeMedicoContratoDescuentoPorId)
        {
            int idDescuento = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
                    idDescuento = odaAsignacionDescuento.adicionarDescuento(con,obeMedicoContratoDescuentoPorId);
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
            return (idDescuento);
        }

        public bool actualizarDescuento(beMedicoContratoDescuentoPorId obeMedicoContratoDescuentoPorId)
        {
            bool exito=false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
                    exito = odaAsignacionDescuento.actualizarDescuento(con,obeMedicoContratoDescuentoPorId);
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

        public bool actualizarEstadoDescuento(int Id, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daAsignacionDescuento odaAsignacionDescuento = new daAsignacionDescuento();
                    exito = odaAsignacionDescuento.actualizarEstadoDescuento(con,Id, EstadoRegistro, UsuarioId);
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
