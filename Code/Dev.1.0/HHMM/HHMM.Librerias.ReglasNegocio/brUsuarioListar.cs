using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brUsuarioListar:brGeneral
    {
        public beUsuarioListar obtenerListas()
        {
            beUsuarioListar obeUsuarioListar = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUsuarioListar odaUsuarioListar = new daUsuarioListar();
                    obeUsuarioListar = odaUsuarioListar.obtenerListas(con);
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
            return (obeUsuarioListar);
        }

		public int Adicionar(beUsuarioMantenimiento obeUsuarioMantenimiento)
		{
			int id = -1;

			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daUsuarioListar odaUsuarioListar = new daUsuarioListar();
					id = odaUsuarioListar.adicionar(con, obeUsuarioMantenimiento);
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
			return id;
		}

		public int Actualizar(int UsuarioId, beUsuarioMantenimiento obeUsuarioMantenimiento)
		{
            int id = -1;

			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daUsuarioListar odaUsuarioListar = new daUsuarioListar();
					id = odaUsuarioListar.actualizar(con, UsuarioId, obeUsuarioMantenimiento);
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
			return id;
		}

        public bool actualizarEstado(int Id, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;

            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUsuarioListar odaUsuarioListar = new daUsuarioListar();
                    exito = odaUsuarioListar.actualizarEstado(con, Id, EstadoRegistro, UsuarioId);
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
            return exito;
        }
    }
}
