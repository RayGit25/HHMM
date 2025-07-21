using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brPerfil: brGeneral
    {
        List<bePerfil> lbePerfiles = null;

        public List<bePerfil> listar()
        {
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPerfil odaPerfiles = new daPerfil();
                    lbePerfiles = odaPerfiles.listar(con);
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
            return (lbePerfiles);
        }

		public bePerfilListar Adicionar(bePerfil obePerfil)
		{
			bePerfilListar obePefilListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPerfil odaPerfil = new daPerfil();
					obePefilListar = odaPerfil.Adicionar(con, obePerfil);
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
			return obePefilListar;
		}

		public bePerfilListar Actualizar(bePerfil obePerfil)
		{
			bePerfilListar obePefilListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPerfil odaPerfil = new daPerfil();
					obePefilListar = odaPerfil.Actualizar(con, obePerfil);
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
			return obePefilListar;
		}

		public bePerfilListar ActualizarEstado(bePerfil obePerfil)
		{
			bePerfilListar obePefilListar = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPerfil odaPerfil = new daPerfil();
					obePefilListar = odaPerfil.ActualizarEstado(con, obePerfil);
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
			return obePefilListar;
		}

    }
}
