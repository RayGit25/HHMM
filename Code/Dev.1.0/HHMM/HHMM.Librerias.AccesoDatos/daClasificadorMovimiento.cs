using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daClasificadorMovimiento
    {
        public List<beCampoCadenaCorto> listar(SqlConnection con)
        {
            List<beCampoCadenaCorto> lbeClasificadorMovimiento = null;
            SqlCommand cmd = new SqlCommand("uspClasificadorMovimientoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeClasificadorMovimiento = new List<beCampoCadenaCorto>();
                int posCampo1 = drd.GetOrdinal("ClasificadorMovimientoId");
                int posCampo2 = drd.GetOrdinal("Descripcion");
                beCampoCadenaCorto obeCampoCadenaCorto;
                while (drd.Read())
                {
                    obeCampoCadenaCorto = new beCampoCadenaCorto();
                    obeCampoCadenaCorto.Campo1 = drd.GetString(posCampo1);
                    obeCampoCadenaCorto.Campo2 = drd.GetString(posCampo2);
                    lbeClasificadorMovimiento.Add(obeCampoCadenaCorto);
                }
                drd.Close();
            }
            return (lbeClasificadorMovimiento);
        }
    }
}
