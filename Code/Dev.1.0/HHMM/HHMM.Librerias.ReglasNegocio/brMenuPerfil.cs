using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.ReglasNegocio
{
   public class brMenuPerfil:brGeneral
    {
       public List<beMenu> listarPorPerfil(int idPerfil)
       {
           List<beMenu> lbeMenu = null;
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
                   lbeMenu = odaMenuPerfil.listarPorPerfil(con, idPerfil);
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
           return (lbeMenu);
       }

       public string listarSucursal(string idSucursal,int id,string idCompania)
       {
           string rpta = "";
            //string cadenaConexion = idCompania.Equals("000000") ? Conexion : ConexionCSB;
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {   
                   con.Open();
                   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
                   rpta = odaMenuPerfil.listarSucursal(con, idSucursal,id);
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
           return rpta;
       }

       public beMenuPerfilListas obtenerListas()
       {
           beMenuPerfilListas obeMenuPerfilListas = null;
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
                   obeMenuPerfilListas = odaMenuPerfil.obtenerListas(con);
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
           return (obeMenuPerfilListas);
       }

       public bool actualizarLista(string listaMenuPerfil, int UsuarioCreadorId)
       {
           bool exito = false;
           using (SqlConnection con = new SqlConnection(Conexion))
           {
               try
               {
                   con.Open();
                   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
                   exito = odaMenuPerfil.actualizarLista(con, listaMenuPerfil, UsuarioCreadorId);
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

	   public List<beCampoEnteroLargo> MenuAccionLista(int accionid, int idperfil)
	   {
		   List<beCampoEnteroLargo> lbeAccion = null;
		   using (SqlConnection con = new SqlConnection(Conexion))
		   {
			   try
			   {
				   con.Open();
				   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
				   lbeAccion = odaMenuPerfil.MenuAccionLista(con, accionid, idperfil);
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
		   return (lbeAccion);
	   }

	   public bool actualizarMenuAccionLista(string lista,int id)
	   {
		   bool exito = false;
		   using (SqlConnection con = new SqlConnection(Conexion))
		   {
			   try
			   {
				   con.Open();
				   daMenuPerfil odaMenuPerfil = new daMenuPerfil();
				   exito = odaMenuPerfil.actualizarMenuAccionLista(con, lista,id);
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
