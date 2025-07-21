using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daFeriado
    {
        public beFeriadoVistaLista listar(SqlConnection con, string sucursal)
        {
            beFeriadoVistaLista obeFeriadoVistaLista = null;
            List<beFeriadoVista> lbeFeriadoVista = null;
            SqlCommand cmd = new SqlCommand("uspFeriadoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                obeFeriadoVistaLista = new beFeriadoVistaLista();
                lbeFeriadoVista = new List<beFeriadoVista>();

                int posFeriadoId = drd.GetOrdinal("FeriadoId");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posFecha = drd.GetOrdinal("Fecha");
                int posAnio = drd.GetOrdinal("Anio");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                beFeriadoVista obeFeriadoVista;
                while (drd.Read())
                {
                    obeFeriadoVista = new beFeriadoVista();
                    obeFeriadoVista.FeriadoId = drd.GetInt32(posFeriadoId);
                    obeFeriadoVista.Descripcion = drd.GetString(posDescripcion);
                    obeFeriadoVista.Fecha = drd.GetDateTime(posFecha);
                    obeFeriadoVista.Anio = drd.GetInt32(posAnio);
                    obeFeriadoVista.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
                    lbeFeriadoVista.Add(obeFeriadoVista);
                }
                obeFeriadoVistaLista.ListaFeriado = lbeFeriadoVista;

                drd.Close();
            }
            return (obeFeriadoVistaLista);
        }

        public int adicionar(SqlConnection con, beFeriado obeFeriado)
        {
            int idFeriado = -1;
            SqlCommand cmd = new SqlCommand("uspFeriadoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeFeriado.SucursalId;

            SqlParameter par2 = cmd.Parameters.Add("@Anio", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeFeriado.Fecha.Year;

            SqlParameter par3 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeFeriado.Descripcion;

            SqlParameter par4 = cmd.Parameters.Add("@Fecha", SqlDbType.DateTime);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeFeriado.Fecha;

            SqlParameter par5 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeFeriado.UsuarioCreadorId;           

            SqlParameter par6 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par6.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idFeriado = (int)par6.Value;
            return (idFeriado);
        }

        public bool actualizar(SqlConnection con, beFeriado obeFeriado)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspFeriadoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@FeriadoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeFeriado.FeriadoId;
            SqlParameter par2 = cmd.Parameters.Add("@Fecha", SqlDbType.DateTime);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeFeriado.Fecha;
            SqlParameter par3 = cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 80);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeFeriado.Descripcion;
            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeFeriado.UsuarioModificadorId;
            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstado(SqlConnection con, int FeriadoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspFeriadoActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@FeriadoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = FeriadoId;

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

        public bool copiarFeriado(SqlConnection con,int AnioInicio, int AnioFin, int UsuarioId,string sucursal)
        {
            bool exito = false;
			SqlCommand cmd = new SqlCommand("uspFeriadoCopiarV2", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@AnioOriginal", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = AnioInicio;

            SqlParameter par2 = cmd.Parameters.Add("@AnioCopia", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = AnioFin;

            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar,4);
			par4.Direction = ParameterDirection.Input;
			par4.Value = sucursal;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }
    }
}
