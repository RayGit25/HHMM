using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daDescuento
    {

        public List<beCampoEntero> listas(SqlConnection con)
        {
            List<beCampoEntero> lbeTipoDescuento = null;
            SqlCommand cmd = new SqlCommand("uspDescuentoListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeTipoDescuento = new List<beCampoEntero>();
                int posCampo1 = drd.GetOrdinal("TipoDescuentoId");
                int posCampo2 = drd.GetOrdinal("Descripcion");
                beCampoEntero obeCampoEntero;
                while (drd.Read())
                {
                    obeCampoEntero = new beCampoEntero();
                    obeCampoEntero.campo1 = drd.GetInt32(posCampo1);
                    obeCampoEntero.campo2 = drd.GetString(posCampo2);
                    lbeTipoDescuento.Add(obeCampoEntero);
                }
                drd.Close();
            }
            return (lbeTipoDescuento);
        }


        public beDescuentoVista listar(SqlConnection con,int dex,string des,int tip)
        {
            beDescuentoVista obeDescuentoVista = null;
            List<beDescuento> lbeDescuento = null;
            SqlCommand cmd = new SqlCommand("uspDescuentoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = dex;

            SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar,80);
            par2.Direction = ParameterDirection.Input;
            par2.Value = des;

            SqlParameter par3 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = tip;


            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeDescuentoVista = new beDescuentoVista();
                lbeDescuento = new List<beDescuento>();
                int posDescuentoId=drd.GetOrdinal("DescuentoId");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
                int posTipoMonto = drd.GetOrdinal("TipoMonto");
                int posIndicadorFacturable = drd.GetOrdinal("IndicadorFacturable");
                int posComponenteId = drd.GetOrdinal("ComponenteId");
                int posPlanCuentaContableId = drd.GetOrdinal("PlanCuentaContableId");
                int posCentroCostoId = drd.GetOrdinal("CentroCostoId");
                int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                beDescuento obeDescuento;
                while (drd.Read())
                {
                    obeDescuento = new beDescuento();
                    obeDescuento.DescuentoId = drd.GetInt32(posDescuentoId);
                    obeDescuento.Descripcion = drd.GetString(posDescripcion).Trim();
                    obeDescuento.TipoDescuentoId=drd.GetInt32(posTipoDescuentoId);
                    obeDescuento.TipoMonto=drd.GetString(posTipoMonto);
                    obeDescuento.IndicadorFacturable=drd.GetBoolean(posIndicadorFacturable);
                    obeDescuento.ComponenteId=drd.GetString(posComponenteId);
                    obeDescuento.PlanCuentaContableId=drd.GetString(posPlanCuentaContableId);                    
                    obeDescuento.CentroCostoId=drd.GetString(posCentroCostoId);                    
                    obeDescuento.ClasificadorMovimientoId=drd.GetString(posClasificadorMovimientoId);
                    obeDescuento.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
                    lbeDescuento.Add(obeDescuento);
                }
                obeDescuentoVista.ListaDescuento = lbeDescuento;
                drd.Close();
            }
            return (obeDescuentoVista);
    }

        public int adicionar(SqlConnection con, beDescuento obeDescuento,int usuario)
        {
            int idDescuento = -1;
            SqlCommand cmd = new SqlCommand("uspDescuentoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeDescuento.Descripcion;

            SqlParameter par2 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeDescuento.TipoDescuentoId;

            SqlParameter par3 = cmd.Parameters.Add("@TipoMonto", SqlDbType.Char, 1);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeDescuento.TipoMonto;

            SqlParameter par4 = cmd.Parameters.Add("@IndicadorFacturable", SqlDbType.Bit);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeDescuento.IndicadorFacturable;

            SqlParameter par5 = cmd.Parameters.Add("@ComponenteId", SqlDbType.VarChar,25);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeDescuento.ComponenteId;

            SqlParameter par6 = cmd.Parameters.Add("@PlanCuentaContableId", SqlDbType.VarChar, 20);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeDescuento.PlanCuentaContableId;

            SqlParameter par7 = cmd.Parameters.Add("@CentroCostoId", SqlDbType.VarChar, 20);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeDescuento.CentroCostoId;

            SqlParameter par8 = cmd.Parameters.Add("@ClasificadorMovimientoId", SqlDbType.VarChar, 20);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeDescuento.ClasificadorMovimientoId;

            SqlParameter par9 = cmd.Parameters.Add("@Usuario", SqlDbType.Int);
            par9.Direction = ParameterDirection.Input;
            par9.Value = usuario;

            SqlParameter par10 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par10.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idDescuento = (int)par10.Value;
            return (idDescuento);
        }

        public bool actualizar(SqlConnection con, beDescuento obeDescuento,int usuario)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspDescuentoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeDescuento.DescuentoId;

            SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeDescuento.Descripcion;

            SqlParameter par3 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeDescuento.TipoDescuentoId;

            SqlParameter par4 = cmd.Parameters.Add("@TipoMonto", SqlDbType.Char, 1);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeDescuento.TipoMonto;

            SqlParameter par5 = cmd.Parameters.Add("@IndicadorFacturable", SqlDbType.Bit);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeDescuento.IndicadorFacturable;

            SqlParameter par6 = cmd.Parameters.Add("@ComponenteId", SqlDbType.VarChar, 25);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeDescuento.ComponenteId;

            SqlParameter par7 = cmd.Parameters.Add("@PlanCuentaContableId", SqlDbType.VarChar, 20);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeDescuento.PlanCuentaContableId;

            SqlParameter par8 = cmd.Parameters.Add("@CentroCostoId", SqlDbType.VarChar, 20);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeDescuento.CentroCostoId;

            SqlParameter par9 = cmd.Parameters.Add("@ClasificadorMovimientoId", SqlDbType.VarChar, 20);
            par9.Direction = ParameterDirection.Input;
            par9.Value = obeDescuento.ClasificadorMovimientoId;

            SqlParameter par10 = cmd.Parameters.Add("@Usuario", SqlDbType.Int);
            par10.Direction = ParameterDirection.Input;
            par10.Value = usuario;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstado(SqlConnection con, int DescuentoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspDescuentActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = DescuentoId;

            SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = EstadoRegistro;

            SqlParameter par3 = cmd.Parameters.Add("@Usuario", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = UsuarioId;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }
}
}
