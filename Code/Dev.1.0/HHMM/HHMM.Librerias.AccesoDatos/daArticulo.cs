using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daArticulo
    {
        public List<beCampoCadenaCorto> listar(SqlConnection con)
        {
            List<beCampoCadenaCorto> lbeArticulo = null;
            SqlCommand cmd = new SqlCommand("uspArticuloListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeArticulo = new List<beCampoCadenaCorto>();
                int posCampo1 = drd.GetOrdinal("ArticuloId");
                int posCampo2 = drd.GetOrdinal("Descripcion");
                beCampoCadenaCorto obeCampoCadenaCorto;
                while (drd.Read())
                {
                    obeCampoCadenaCorto = new beCampoCadenaCorto();
                    obeCampoCadenaCorto.Campo1 = drd.GetString(posCampo1);
                    obeCampoCadenaCorto.Campo2 = drd.GetString(posCampo2);
                    lbeArticulo.Add(obeCampoCadenaCorto);
                }
                drd.Close();
            }
            return (lbeArticulo);
        }
    }
}
