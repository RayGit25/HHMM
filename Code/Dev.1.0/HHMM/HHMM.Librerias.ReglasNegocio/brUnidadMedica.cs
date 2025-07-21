using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brUnidadMedica:brGeneral
    {
        public beUnidadMedicaLista listar()
        {
            beUnidadMedicaLista obeUnidadMedicaLista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUnidadMedica odaUnidadMedica = new daUnidadMedica();
                    obeUnidadMedicaLista = odaUnidadMedica.listar(con);
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
            return (obeUnidadMedicaLista);
        }

        public int adicionar(beUnidadMedica obeUnidadMedica)
        {
            int idTipoDescuento = -1;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUnidadMedica odaUnidadMedica = new daUnidadMedica();
                    idTipoDescuento = odaUnidadMedica.adicionar(con, obeUnidadMedica);
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
            return (idTipoDescuento);
        }

        public bool actualizar(beUnidadMedica obeUnidadMedica)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUnidadMedica odaUnidadMedica = new daUnidadMedica();
                    exito = odaUnidadMedica.actualizar(con, obeUnidadMedica);
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

        public bool actualizarEstado(int UnidadMedicaId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUnidadMedica odaUnidadMedica = new daUnidadMedica();
                    exito = odaUnidadMedica.actualizarEstado(con, UnidadMedicaId, EstadoRegistro, UsuarioId);
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

		public int adicionarDetalle(int UnidadMedicaId, int ServicioId, int UsuarioId)
		{
			int UnidadMedicaServicioId = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daUnidadMedica odaUnidadMedica = new daUnidadMedica();
					UnidadMedicaServicioId = odaUnidadMedica.adicionarDetalle(con, UnidadMedicaId, ServicioId, UsuarioId);
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
			return (UnidadMedicaServicioId);
		}

		public int actualizarDetalle(int UnidadMedicaServicioId, int ServicioId, int UsuarioId)
		{
			int id = -1;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daUnidadMedica odaUnidadMedica = new daUnidadMedica();
					id = odaUnidadMedica.actualizarDetalle(con, UnidadMedicaServicioId, ServicioId, UsuarioId);
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
			return (id);
		}

		public bool actualizarEstadoDetalle(int UnidadMedicaServicioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daUnidadMedica odaUnidadMedica = new daUnidadMedica();
					exito = odaUnidadMedica.actualizarEstadoDetalle(con, UnidadMedicaServicioId, EstadoRegistro, UsuarioId);
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
