using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daTipoDescuento
    {

        public beTipoDescuentoLista listar(SqlConnection con)
        {
            beTipoDescuentoLista obeTipoDescuentoLista = null;
            List<beTipoDescuento> lbeTipoDescuento = null;
            SqlCommand cmd = new SqlCommand("uspTipoDescuentoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                obeTipoDescuentoLista = new beTipoDescuentoLista();
                lbeTipoDescuento = new List<beTipoDescuento>();

                int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                beTipoDescuento obeTipoDescuento;
                while (drd.Read())
                {
                    obeTipoDescuento = new beTipoDescuento();
                    obeTipoDescuento.TipoDescuentoId = drd.GetInt32(posTipoDescuentoId);
                    obeTipoDescuento.Descripcion = drd.GetString(posDescripcion);
                    obeTipoDescuento.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
                    lbeTipoDescuento.Add(obeTipoDescuento);
                }
                obeTipoDescuentoLista.ListaTipoDescuento = lbeTipoDescuento;

                drd.Close();
            }
            return (obeTipoDescuentoLista);
        }

        public int adicionar(SqlConnection con, beTipoDescuento obeTipoDescuento)
        {
            int idTipoDescuento = -1;
            SqlCommand cmd = new SqlCommand("uspTipoDescuentoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeTipoDescuento.Descripcion;

            SqlParameter par2 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeTipoDescuento.UsuarioCreadorId;

            SqlParameter par3 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par3.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idTipoDescuento = (int)par3.Value;
            return (idTipoDescuento);
        }

        public bool actualizar(SqlConnection con, beTipoDescuento obeTipoDescuento)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspTipoDescuentoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeTipoDescuento.TipoDescuentoId;
            SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 80);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeTipoDescuento.Descripcion;
            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeTipoDescuento.UsuarioModificadorId;
            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstado(SqlConnection con, int TipoDescuentoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspTipoDescuentoActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = TipoDescuentoId;

            SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = EstadoRegistro;

            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = UsuarioId;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }
    }
}
