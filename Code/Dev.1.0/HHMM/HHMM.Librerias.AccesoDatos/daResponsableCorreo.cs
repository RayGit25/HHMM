using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daResponsableCorreo
	{
        public beResponsableCorreoListar listar(SqlConnection con, string idSucursal)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = null;
            List<beResponsableCorreo> lbeResponsableCorreo = null;
            List<beUsuario> lbeUsuario = null;
            List<beVariableCorreo> lbeVariableCorreo = null;
            SqlCommand cmd = new SqlCommand("uspResponsableCorreoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", idSucursal);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeResponsableCorreo = new List<beResponsableCorreo>();
                beResponsableCorreo obeResponsableCorreo;

                int posResponsableCorreoId = drd.GetOrdinal("ResponsableCorreoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posUsuarioNombre = drd.GetOrdinal("CodigoUsuario");
                int posResponsable = drd.GetOrdinal("Responsable");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeResponsableCorreo = new beResponsableCorreo();
                    obeResponsableCorreo.ResponsableCorreoId = drd.GetInt32(posResponsableCorreoId);
                    obeResponsableCorreo.SucursalId = drd.GetString(posSucursalId);
                    obeResponsableCorreo.Sucursal = drd.GetString(posSucursal);
                    obeResponsableCorreo.UsuarioNombre = drd.GetString(posUsuarioNombre);
                    obeResponsableCorreo.Responsable = drd.GetString(posResponsable);
                    obeResponsableCorreo.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeResponsableCorreo.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    lbeResponsableCorreo.Add(obeResponsableCorreo);
                }

                drd.NextResult();

                lbeUsuario = new List<beUsuario>();
                beUsuario obeUsuario;

                int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                int pos2Nombre = drd.GetOrdinal("Responsable");
                int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int pos2CorreoElectronicoUsuario = drd.GetOrdinal("CorreoElectronico");

                while (drd.Read())
                {
                    obeUsuario = new beUsuario();
                    obeUsuario.UsuarioId = drd.GetInt32(pos2UsuarioId);
                    obeUsuario.Nombre = drd.GetString(pos2Nombre);
                    obeUsuario.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                    obeUsuario.CorreoElectronico = drd.GetString(pos2CorreoElectronicoUsuario);
                    lbeUsuario.Add(obeUsuario);
                }

                drd.NextResult();

                lbeVariableCorreo = new List<beVariableCorreo>();
                beVariableCorreo obeVariableCorreo;

                int pos3VariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                int pos3Descripcion = drd.GetOrdinal("Descripcion");

                while (drd.Read())
                {
                    obeVariableCorreo = new beVariableCorreo();
                    obeVariableCorreo.VariableCorreoId = drd.GetString(pos3VariableCorreoId);
                    obeVariableCorreo.Descripcion = drd.GetString(pos3Descripcion);
                    lbeVariableCorreo.Add(obeVariableCorreo);
                }

                drd.Close();
            }


            obeResponsableCorreoListar = new beResponsableCorreoListar();
            obeResponsableCorreoListar.ListaResponsableCorreo = lbeResponsableCorreo;
            obeResponsableCorreoListar.ListaUsuario = lbeUsuario;
            obeResponsableCorreoListar.ListaVariableCorreo = lbeVariableCorreo;

            return obeResponsableCorreoListar;
        }

        public beResponsableCorreo listarPorId(SqlConnection con, string idResponsable)
        {
            beResponsableCorreo obeResponsableCorreo = new beResponsableCorreo();
            SqlCommand cmd = new SqlCommand("uspResponsableCorreoListarPorId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ResponsableCorreoId", idResponsable);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                int posResponsableCorreoId = drd.GetOrdinal("ResponsableCorreoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posUsuarioId = drd.GetOrdinal("UsuarioId");
                int posUsuarioNombre = drd.GetOrdinal("CodigoUsuario");
                int posResponsable = drd.GetOrdinal("Responsable");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posAsunto = drd.GetOrdinal("Asunto");
                int posCuerpo = drd.GetOrdinal("Cuerpo");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeResponsableCorreo.ResponsableCorreoId = drd.GetInt32(posResponsableCorreoId);
                    obeResponsableCorreo.SucursalId = drd.GetString(posSucursalId);
                    obeResponsableCorreo.Sucursal = drd.GetString(posSucursal);
                    obeResponsableCorreo.UsuarioId = drd.GetInt32(posUsuarioId);
                    obeResponsableCorreo.UsuarioNombre = drd.GetString(posUsuarioNombre);
                    obeResponsableCorreo.Responsable = drd.GetString(posResponsable);
                    obeResponsableCorreo.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeResponsableCorreo.Asunto = drd.GetString(posAsunto);
                    obeResponsableCorreo.Cuerpo = drd.GetString(posCuerpo);
                    obeResponsableCorreo.EstadoRegistro = drd.GetString(posEstadoRegistro);
                }

                drd.Close();
            }

            return obeResponsableCorreo;
        }

        public beResponsableCorreoListar Adicionar(SqlConnection con, beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = new beResponsableCorreoListar();
            List<beResponsableCorreo> lbeResponsableCorreo = null;
            List<beUsuario> lbeUsuario = null;
            List<beVariableCorreo> lbeVariableCorreo = null;
            SqlCommand cmd = new SqlCommand("uspResponsableCorreoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", obeResponsableCorreo.SucursalId);
            cmd.Parameters.AddWithValue("@UsuarioResponsableId", obeResponsableCorreo.UsuarioId);
            cmd.Parameters.AddWithValue("@CorreoElectronico", obeResponsableCorreo.CorreoElectronico);
            cmd.Parameters.AddWithValue("@Asunto", obeResponsableCorreo.Asunto);
            cmd.Parameters.AddWithValue("@Cuerpo", obeResponsableCorreo.Cuerpo);
            cmd.Parameters.AddWithValue("@UsuarioCreadorId", obeResponsableCorreo.UsuarioCreadorId);
            SqlParameter par = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;


            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeResponsableCorreo = new List<beResponsableCorreo>();

                int posResponsableCorreoId = drd.GetOrdinal("ResponsableCorreoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posUsuarioNombre = drd.GetOrdinal("CodigoUsuario");
                int posResponsable = drd.GetOrdinal("Responsable");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeResponsableCorreo = new beResponsableCorreo();
                    obeResponsableCorreo.ResponsableCorreoId = drd.GetInt32(posResponsableCorreoId);
                    obeResponsableCorreo.SucursalId = drd.GetString(posSucursalId);
                    obeResponsableCorreo.Sucursal = drd.GetString(posSucursal);
                    obeResponsableCorreo.UsuarioNombre = drd.GetString(posUsuarioNombre);
                    obeResponsableCorreo.Responsable = drd.GetString(posResponsable);
                    obeResponsableCorreo.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeResponsableCorreo.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    lbeResponsableCorreo.Add(obeResponsableCorreo);
                }

                drd.NextResult();

                lbeUsuario = new List<beUsuario>();
                beUsuario obeUsuario;

                int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                int pos2Nombre = drd.GetOrdinal("Responsable");
                int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int pos2CorreoElectronicoUsuario = drd.GetOrdinal("CorreoElectronico");

                while (drd.Read())
                {
                    obeUsuario = new beUsuario();
                    obeUsuario.UsuarioId = drd.GetInt32(pos2UsuarioId);
                    obeUsuario.Nombre = drd.GetString(pos2Nombre);
                    obeUsuario.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                    obeUsuario.CorreoElectronico = drd.GetString(pos2CorreoElectronicoUsuario);
                    lbeUsuario.Add(obeUsuario);
                }

                drd.NextResult();

                lbeVariableCorreo = new List<beVariableCorreo>();
                beVariableCorreo obeVariableCorreo;

                int pos3VariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                int pos3Descripcion = drd.GetOrdinal("Descripcion");

                while (drd.Read())
                {
                    obeVariableCorreo = new beVariableCorreo();
                    obeVariableCorreo.VariableCorreoId = drd.GetString(pos3VariableCorreoId);
                    obeVariableCorreo.Descripcion = drd.GetString(pos3Descripcion);
                    lbeVariableCorreo.Add(obeVariableCorreo);
                }

                drd.Close();
            }

            obeResponsableCorreoListar.Rpta = par.Value.ToString();
            obeResponsableCorreoListar = new beResponsableCorreoListar();
            obeResponsableCorreoListar.ListaResponsableCorreo = lbeResponsableCorreo;
            obeResponsableCorreoListar.ListaUsuario = lbeUsuario;
            obeResponsableCorreoListar.ListaVariableCorreo = lbeVariableCorreo;

            return obeResponsableCorreoListar;
        }

        public beResponsableCorreoListar Actualizar(SqlConnection con, beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = new beResponsableCorreoListar();
            List<beResponsableCorreo> lbeResponsableCorreo = null;
            List<beUsuario> lbeUsuario = null;
            List<beVariableCorreo> lbeVariableCorreo = null;
            SqlCommand cmd = new SqlCommand("uspResponsableCorreoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ResponsableCorreoId", obeResponsableCorreo.ResponsableCorreoId);
            cmd.Parameters.AddWithValue("@SucursalId", obeResponsableCorreo.SucursalId);
            cmd.Parameters.AddWithValue("@UsuarioResponsableId", obeResponsableCorreo.UsuarioId);
            cmd.Parameters.AddWithValue("@CorreoElectronico", obeResponsableCorreo.CorreoElectronico);
            cmd.Parameters.AddWithValue("@Asunto", obeResponsableCorreo.Asunto);
            cmd.Parameters.AddWithValue("@Cuerpo", obeResponsableCorreo.Cuerpo);
            cmd.Parameters.AddWithValue("@UsuarioModificacionId", obeResponsableCorreo.UsuarioCreadorId);
            SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;


            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeResponsableCorreo = new List<beResponsableCorreo>();

                int posResponsableCorreoId = drd.GetOrdinal("ResponsableCorreoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posUsuarioNombre = drd.GetOrdinal("CodigoUsuario");
                int posResponsable = drd.GetOrdinal("Responsable");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeResponsableCorreo = new beResponsableCorreo();
                    obeResponsableCorreo.ResponsableCorreoId = drd.GetInt32(posResponsableCorreoId);
                    obeResponsableCorreo.SucursalId = drd.GetString(posSucursalId);
                    obeResponsableCorreo.Sucursal = drd.GetString(posSucursal);
                    obeResponsableCorreo.UsuarioNombre = drd.GetString(posUsuarioNombre);
                    obeResponsableCorreo.Responsable = drd.GetString(posResponsable);
                    obeResponsableCorreo.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeResponsableCorreo.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    lbeResponsableCorreo.Add(obeResponsableCorreo);
                }

                drd.NextResult();

                lbeUsuario = new List<beUsuario>();
                beUsuario obeUsuario;

                int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                int pos2Nombre = drd.GetOrdinal("Responsable");
                int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int pos2CorreoElectronicoUsuario = drd.GetOrdinal("CorreoElectronico");

                while (drd.Read())
                {
                    obeUsuario = new beUsuario();
                    obeUsuario.UsuarioId = drd.GetInt32(pos2UsuarioId);
                    obeUsuario.Nombre = drd.GetString(pos2Nombre);
                    obeUsuario.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                    obeUsuario.CorreoElectronico = drd.GetString(pos2CorreoElectronicoUsuario);
                    lbeUsuario.Add(obeUsuario);
                }

                drd.NextResult();

                lbeVariableCorreo = new List<beVariableCorreo>();
                beVariableCorreo obeVariableCorreo;

                int pos3VariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                int pos3Descripcion = drd.GetOrdinal("Descripcion");

                while (drd.Read())
                {
                    obeVariableCorreo = new beVariableCorreo();
                    obeVariableCorreo.VariableCorreoId = drd.GetString(pos3VariableCorreoId);
                    obeVariableCorreo.Descripcion = drd.GetString(pos3Descripcion);
                    lbeVariableCorreo.Add(obeVariableCorreo);
                }


                drd.Close();
            }

            obeResponsableCorreoListar.Rpta = par.Value.ToString();
            obeResponsableCorreoListar = new beResponsableCorreoListar();
            obeResponsableCorreoListar.ListaResponsableCorreo = lbeResponsableCorreo;
            obeResponsableCorreoListar.ListaUsuario = lbeUsuario;
            obeResponsableCorreoListar.ListaVariableCorreo = lbeVariableCorreo;

            return obeResponsableCorreoListar;

        }

        public beResponsableCorreoListar ActualizarEstado(SqlConnection con, beResponsableCorreo obeResponsableCorreo)
        {
            beResponsableCorreoListar obeResponsableCorreoListar = new beResponsableCorreoListar();
            List<beResponsableCorreo> lbeResponsableCorreo = null;
            List<beUsuario> lbeUsuario = null;
            List<beVariableCorreo> lbeVariableCorreo = null;
            SqlCommand cmd = new SqlCommand("uspResponsableCorreoActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ResponsableCorreoId", obeResponsableCorreo.ResponsableCorreoId);
            cmd.Parameters.AddWithValue("@Estado", obeResponsableCorreo.EstadoRegistro);
            cmd.Parameters.AddWithValue("@UsuarioId", obeResponsableCorreo.UsuarioCreadorId);
            cmd.Parameters.AddWithValue("@SucursalId", obeResponsableCorreo.SucursalId);
            SqlParameter par = cmd.Parameters.Add("@@FilasAfectadas", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;


            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeResponsableCorreo = new List<beResponsableCorreo>();

                int posResponsableCorreoId = drd.GetOrdinal("ResponsableCorreoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posUsuarioNombre = drd.GetOrdinal("CodigoUsuario");
                int posResponsable = drd.GetOrdinal("Responsable");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                while (drd.Read())
                {
                    obeResponsableCorreo = new beResponsableCorreo();
                    obeResponsableCorreo.ResponsableCorreoId = drd.GetInt32(posResponsableCorreoId);
                    obeResponsableCorreo.SucursalId = drd.GetString(posSucursalId);
                    obeResponsableCorreo.Sucursal = drd.GetString(posSucursal);
                    obeResponsableCorreo.UsuarioNombre = drd.GetString(posUsuarioNombre);
                    obeResponsableCorreo.Responsable = drd.GetString(posResponsable);
                    obeResponsableCorreo.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeResponsableCorreo.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    lbeResponsableCorreo.Add(obeResponsableCorreo);
                }

                drd.NextResult();

                lbeUsuario = new List<beUsuario>();
                beUsuario obeUsuario;

                int pos2UsuarioId = drd.GetOrdinal("UsuarioId");
                int pos2Nombre = drd.GetOrdinal("Responsable");
                int pos2CodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int pos2CorreoElectronicoUsuario = drd.GetOrdinal("CorreoElectronico");

                while (drd.Read())
                {
                    obeUsuario = new beUsuario();
                    obeUsuario.UsuarioId = drd.GetInt32(pos2UsuarioId);
                    obeUsuario.Nombre = drd.GetString(pos2Nombre);
                    obeUsuario.CodigoUsuario = drd.GetString(pos2CodigoUsuario);
                    obeUsuario.CorreoElectronico = drd.GetString(pos2CorreoElectronicoUsuario);
                    lbeUsuario.Add(obeUsuario);
                }

                drd.NextResult();

                lbeVariableCorreo = new List<beVariableCorreo>();
                beVariableCorreo obeVariableCorreo;

                int pos3VariableCorreoId = drd.GetOrdinal("VariableCorreoId");
                int pos3Descripcion = drd.GetOrdinal("Descripcion");

                while (drd.Read())
                {
                    obeVariableCorreo = new beVariableCorreo();
                    obeVariableCorreo.VariableCorreoId = drd.GetString(pos3VariableCorreoId);
                    obeVariableCorreo.Descripcion = drd.GetString(pos3Descripcion);
                    lbeVariableCorreo.Add(obeVariableCorreo);
                }


                drd.Close();
            }

            obeResponsableCorreoListar.Rpta = par.Value.ToString();
            obeResponsableCorreoListar = new beResponsableCorreoListar();
            obeResponsableCorreoListar.ListaResponsableCorreo = lbeResponsableCorreo;
            obeResponsableCorreoListar.ListaUsuario = lbeUsuario;
            obeResponsableCorreoListar.ListaVariableCorreo = lbeVariableCorreo;

            return obeResponsableCorreoListar;


        }

	}
}
