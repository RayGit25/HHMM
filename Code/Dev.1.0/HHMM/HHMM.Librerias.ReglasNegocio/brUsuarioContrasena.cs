using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
   public class brUsuarioContrasena:brGeneral
    {
       public beUsuarioMensaje validarLogin(string codigoUsuario, string contrasena)
       {
           beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daUsuarioContrasena odaUsuarioContrasena = new daUsuarioContrasena();
                   obeUsuarioMensaje = odaUsuarioContrasena.validarLogin(con, codigoUsuario, contrasena);
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
           return (obeUsuarioMensaje);
       }
        public beUsuarioMensaje validarLoginCSB(string codigoUsuario, string contrasena)
        {
            beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUsuarioContrasena odaUsuarioContrasena = new daUsuarioContrasena();
                    obeUsuarioMensaje = odaUsuarioContrasena.validarLogin(con, codigoUsuario, contrasena);
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
            return (obeUsuarioMensaje);
        }
        public string actualizarClavePorCorreo(string correoElectronico, string contrasenaNueva)
       {
           string usuario = "";
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daUsuarioContrasena odaUsuario = new daUsuarioContrasena();
                   usuario = odaUsuario.actualizarClavePorCorreo(con, correoElectronico, contrasenaNueva);
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
           return (usuario);
       }
       public string actualizarClave(int usuarioId, string contrasenaAnterior, string contrasenaNueva)
       {
           string rpta = "-1";
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daUsuarioContrasena odaUsuario = new daUsuarioContrasena();
                   rpta = odaUsuario.actualizarClave(con, usuarioId, contrasenaAnterior, contrasenaNueva);
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
       public beUsuarioSucursalCompaniaListas ListarCompaniaSucursal(int usuarioId,string idCompania)
       {
            beUsuarioSucursalCompaniaListas obeUsuarioSucursalCompaniaListas = new beUsuarioSucursalCompaniaListas();
            using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daUsuarioContrasena odaUsuarioContrasena = new daUsuarioContrasena();
                   obeUsuarioSucursalCompaniaListas = odaUsuarioContrasena.ListarCompaniaSucursal(con, usuarioId);
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
           return (obeUsuarioSucursalCompaniaListas);
       }

        public beUsuarioMensaje validarADLogin(string codigoUsuario)
        {
            beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUsuarioContrasena odaUsuarioContrasena = new daUsuarioContrasena();
                    obeUsuarioMensaje = odaUsuarioContrasena.validarADLogin(con, codigoUsuario);
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
            return (obeUsuarioMensaje);
        }

        public String validarADPorCorreo(string correo)
        {
            string rpta = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daUsuarioContrasena odaUsuarioContrasena = new daUsuarioContrasena();
                    rpta = odaUsuarioContrasena.validarADPorCorreo(con, correo);
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
