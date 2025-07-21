using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daUsuarioContrasena
    {
        public beUsuarioMensaje validarLogin(SqlConnection con, string codigoUsuario, string contrasena)
        {
            beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
            SqlCommand cmd = new SqlCommand("uspUsuarioContrasenaValidarLogin", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CodigoUsuario", codigoUsuario);
            cmd.Parameters.AddWithValue("@Contrasena", contrasena);
            SqlParameter par1 = cmd.Parameters.Add("@CodigoMensaje", SqlDbType.SmallInt);
            par1.Direction = ParameterDirection.Output;

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                int posUsuarioId = drd.GetOrdinal("UsuarioId");
                int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int posNombre = drd.GetOrdinal("Nombre");
                int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                int posApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                int posPerfilId = drd.GetOrdinal("PerfilId");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
                int posFechaActual = drd.GetOrdinal("FechaActual");
                int posUsuarioAdmin = drd.GetOrdinal("UsuarioAdministrador");
                int posIndicadorAD = drd.GetOrdinal("IndicadorAD");

                if (drd.HasRows)
                {
                    drd.Read();
                    beUsuarioLogin obeUsuarioLogin = new beUsuarioLogin();
                    obeUsuarioLogin.UsuarioId = drd.GetInt32(posUsuarioId);
                    obeUsuarioLogin.CodigoUsuario = drd.GetString(posCodigoUsuario);
                    obeUsuarioLogin.Nombre = drd.GetString(posNombre);
                    obeUsuarioLogin.ApellidoPaterno = drd.GetString(posApellidoPaterno);
                    obeUsuarioLogin.ApellidoMaterno = drd.GetString(posApellidoMaterno);
                    obeUsuarioLogin.PerfilId = drd.GetInt32(posPerfilId);
                    obeUsuarioLogin.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    obeUsuarioLogin.NombrePerfil = drd.GetString(posNombrePerfil);
                    obeUsuarioLogin.FechaActual = drd.GetDateTime(posFechaActual);
                    obeUsuarioMensaje.UsuarioLogin = obeUsuarioLogin;
                    obeUsuarioLogin.UsuarioAdministrador = drd.GetInt32(posUsuarioAdmin);
                    obeUsuarioLogin.IndicadorAD = drd.GetBoolean(posIndicadorAD);

                }
                if (drd.NextResult())
                {
                    int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                    int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                    int pos2Nombre = drd.GetOrdinal("Nombre");
                    int pos2ApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                    int pos2ApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                    int pos2PerfilId = drd.GetOrdinal("PerfilId");
                    int pos2EstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                    int pos2NombrePerfil = drd.GetOrdinal("NombrePerfil");
                    int pos2UsuarioAdmin = drd.GetOrdinal("UsuarioAdministrador");
                    int pos2IndicadorAD = drd.GetOrdinal("IndicadorAD");

                    if (drd.HasRows)
                    {
                        drd.Read();
                        beUsuarioLogin obeUsuarioLogin = new beUsuarioLogin();
                        obeUsuarioLogin.UsuarioId = drd.GetInt32(pos2UsuarioId);
                        obeUsuarioLogin.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                        obeUsuarioLogin.Nombre = drd.GetString(pos2Nombre);
                        obeUsuarioLogin.ApellidoPaterno = drd.GetString(pos2ApellidoPaterno);
                        obeUsuarioLogin.ApellidoMaterno = drd.GetString(pos2ApellidoMaterno);
                        obeUsuarioLogin.PerfilId = drd.GetInt32(pos2PerfilId);
                        obeUsuarioLogin.EstadoRegistro = drd.GetString(pos2EstadoRegistro);
                        obeUsuarioLogin.NombrePerfil = drd.GetString(pos2NombrePerfil);
                        obeUsuarioMensaje.UsuarioLogin = obeUsuarioLogin;
                        obeUsuarioLogin.UsuarioAdministrador = drd.GetInt32(pos2UsuarioAdmin);
                        obeUsuarioLogin.IndicadorAD = drd.GetBoolean(pos2IndicadorAD);

                    }
                }
                drd.Close();
                obeUsuarioMensaje.Mensaje = par1.Value.ToString();
            }
            return (obeUsuarioMensaje);
        }
        public string actualizarClavePorCorreo(SqlConnection con, string correoElectronico, string contrasenaNueva)
        {
            string usuario = "";
            SqlCommand cmd = new SqlCommand("uspUsuarioActualizarContrasenaPorCorreo", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@CorreoElectronico", SqlDbType.NVarChar, 50);
            par1.Direction = ParameterDirection.Input;
            par1.Value = correoElectronico;

            SqlParameter par2 = cmd.Parameters.Add("@ContrasenaNueva", SqlDbType.NVarChar, 200);
            par2.Direction = ParameterDirection.Input;
            par2.Value = contrasenaNueva;

            object rpta = cmd.ExecuteScalar();
            if (rpta != null) usuario = rpta.ToString();

            return (usuario);
        }
        public string actualizarClave(SqlConnection con, int usuarioId, string contrasenaAnterior, string contrasenaNueva)
        {
            string rpta = "-1";
            SqlCommand cmd = new SqlCommand("uspUsuarioActualizarContrasena", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@ContrasenaAnterior", contrasenaAnterior);
            cmd.Parameters.AddWithValue("@ContrasenaNueva", contrasenaNueva);
            SqlParameter par = cmd.Parameters.Add("@CodigoMensaje", SqlDbType.SmallInt);
            par.Direction = ParameterDirection.Output;

            int n = cmd.ExecuteNonQuery();
            rpta = par.Value.ToString();

            return (rpta);
        }

        public beUsuarioSucursalCompaniaListas ListarCompaniaSucursal(SqlConnection con, int usuarioId)
        {
            beUsuarioSucursalCompaniaListas obeUsuarioSucursalCompaniaListas = null;

            SqlCommand cmd = new SqlCommand("uspUsuarioCompaniaSucursalListar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = usuarioId;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeUsuarioSucursalCompaniaListas = new beUsuarioSucursalCompaniaListas();
                List<beUsuarioCompaniaLogin> lbeUsuarioCompaniaLogin = new List<beUsuarioCompaniaLogin>();
                int posUsuarioCompaniaId = drd.GetOrdinal("UsuarioCompaniaId");
                int posCompaniaId = drd.GetOrdinal("CompaniaId");
                int posDescripcionCorta = drd.GetOrdinal("DescripcionCorta");
                int posDescripcionLarga = drd.GetOrdinal("DescripcionLarga");
                beUsuarioCompaniaLogin obeUsuarioCompaniaLogin;
                while (drd.Read())
                {
                    obeUsuarioCompaniaLogin = new beUsuarioCompaniaLogin();
                    obeUsuarioCompaniaLogin.UsuarioCompaniaId = drd.GetInt32(posUsuarioCompaniaId);
                    obeUsuarioCompaniaLogin.CompaniaId = drd.GetString(posCompaniaId);
                    obeUsuarioCompaniaLogin.DescripcionCorta = drd.GetString(posDescripcionCorta);
                    obeUsuarioCompaniaLogin.DescripcionLarga = drd.GetString(posDescripcionLarga);
                    lbeUsuarioCompaniaLogin.Add(obeUsuarioCompaniaLogin);
                }
                obeUsuarioSucursalCompaniaListas.ListaUsuarioCompania = lbeUsuarioCompaniaLogin;
                List<beUsuarioSucursalLogin> lbeUsuarioSucursalLogin = new List<beUsuarioSucursalLogin>();
                if (drd.NextResult())
                {
                    int posUsuarioCompaniaId2 = drd.GetOrdinal("UsuarioCompaniaId");
                    int posSucursalId = drd.GetOrdinal("SucursalId");
                    int posDescripcion = drd.GetOrdinal("Descripcion");
                    beUsuarioSucursalLogin obeUsuarioSucursalLogin;
                    while (drd.Read())
                    {
                        obeUsuarioSucursalLogin = new beUsuarioSucursalLogin();
                        obeUsuarioSucursalLogin.UsuarioCompaniaId = drd.GetInt32(posUsuarioCompaniaId2);
                        obeUsuarioSucursalLogin.SucursalId = drd.GetString(posSucursalId);
                        obeUsuarioSucursalLogin.Descripcion = drd.GetString(posDescripcion);
                        lbeUsuarioSucursalLogin.Add(obeUsuarioSucursalLogin);
                    }
                    obeUsuarioSucursalCompaniaListas.ListaUsuarioSucursal = lbeUsuarioSucursalLogin;
                }
                drd.Close();
            }
            return obeUsuarioSucursalCompaniaListas;
        }

        public beUsuarioMensaje validarADLogin(SqlConnection con, string codigoUsuario)
        {
            beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
            SqlCommand cmd = new SqlCommand("uspUsuarioADValidarLogin", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CodigoUsuario", codigoUsuario);
            SqlParameter par1 = cmd.Parameters.Add("@CodigoMensaje", SqlDbType.SmallInt);
            par1.Direction = ParameterDirection.Output;

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                int posUsuarioId = drd.GetOrdinal("UsuarioId");
                int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int posNombre = drd.GetOrdinal("Nombre");
                int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                int posApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                int posPerfilId = drd.GetOrdinal("PerfilId");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
                int posFechaActual = drd.GetOrdinal("FechaActual");
                int posUsuarioAdmin = drd.GetOrdinal("UsuarioAdministrador");
                int posIndicadorAD = drd.GetOrdinal("IndicadorAD");

                if (drd.HasRows)
                {
                    drd.Read();
                    beUsuarioLogin obeUsuarioLogin = new beUsuarioLogin();
                    obeUsuarioLogin.UsuarioId = drd.GetInt32(posUsuarioId);
                    obeUsuarioLogin.CodigoUsuario = drd.GetString(posCodigoUsuario);
                    obeUsuarioLogin.Nombre = drd.GetString(posNombre);
                    obeUsuarioLogin.ApellidoPaterno = drd.GetString(posApellidoPaterno);
                    obeUsuarioLogin.ApellidoMaterno = drd.GetString(posApellidoMaterno);
                    obeUsuarioLogin.PerfilId = drd.GetInt32(posPerfilId);
                    obeUsuarioLogin.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    obeUsuarioLogin.NombrePerfil = drd.GetString(posNombrePerfil);
                    obeUsuarioLogin.FechaActual = drd.GetDateTime(posFechaActual);
                    obeUsuarioMensaje.UsuarioLogin = obeUsuarioLogin;
                    obeUsuarioLogin.UsuarioAdministrador = drd.GetInt32(posUsuarioAdmin);
                    obeUsuarioLogin.IndicadorAD = drd.GetBoolean(posIndicadorAD);

                }
                if (drd.NextResult())
                {
                    int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                    int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                    int pos2Nombre = drd.GetOrdinal("Nombre");
                    int pos2ApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                    int pos2ApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                    int pos2PerfilId = drd.GetOrdinal("PerfilId");
                    int pos2EstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                    int pos2NombrePerfil = drd.GetOrdinal("NombrePerfil");
                    int pos2UsuarioAdmin = drd.GetOrdinal("UsuarioAdministrador");
                    int pos2IndicadorAD = drd.GetOrdinal("IndicadorAD");

                    if (drd.HasRows)
                    {
                        drd.Read();
                        beUsuarioLogin obeUsuarioLogin = new beUsuarioLogin();
                        obeUsuarioLogin.UsuarioId = drd.GetInt32(pos2UsuarioId);
                        obeUsuarioLogin.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                        obeUsuarioLogin.Nombre = drd.GetString(pos2Nombre);
                        obeUsuarioLogin.ApellidoPaterno = drd.GetString(pos2ApellidoPaterno);
                        obeUsuarioLogin.ApellidoMaterno = drd.GetString(pos2ApellidoMaterno);
                        obeUsuarioLogin.PerfilId = drd.GetInt32(pos2PerfilId);
                        obeUsuarioLogin.EstadoRegistro = drd.GetString(pos2EstadoRegistro);
                        obeUsuarioLogin.NombrePerfil = drd.GetString(pos2NombrePerfil);
                        obeUsuarioMensaje.UsuarioLogin = obeUsuarioLogin;
                        obeUsuarioLogin.UsuarioAdministrador = drd.GetInt32(pos2UsuarioAdmin);
                        obeUsuarioLogin.IndicadorAD = drd.GetBoolean(pos2IndicadorAD);

                    }
                }
                drd.Close();
                obeUsuarioMensaje.Mensaje = par1.Value.ToString();
            }
            return (obeUsuarioMensaje);
        }

        public String validarADPorCorreo(SqlConnection con, string correo)
        {
            string rpta = "0";
            beUsuarioMensaje obeUsuarioMensaje = new beUsuarioMensaje();
            SqlCommand cmd = new SqlCommand("uspUsuarioADPorCorreo", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Correo", correo);


            Object obj = cmd.ExecuteScalar();
            if (obj != null) {
                rpta = obj.ToString();
            }

            
            return rpta;
        }


    }
}
