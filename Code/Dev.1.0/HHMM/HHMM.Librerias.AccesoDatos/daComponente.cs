using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daComponente
    {
        public List<beCampoCadenaCorto> listar(SqlConnection con,string su)
        {
            List<beCampoCadenaCorto> lbeComponente = null;
            SqlCommand cmd = new SqlCommand("uspComponenteListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId",su);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeComponente = new List<beCampoCadenaCorto>();
                int posCampo1 = drd.GetOrdinal("ComponenteId");
                int posCampo2 = drd.GetOrdinal("Descripcion");
                beCampoCadenaCorto obeCampoCadenaCorto;
                while (drd.Read())
                {
                    obeCampoCadenaCorto = new beCampoCadenaCorto();
                    obeCampoCadenaCorto.Campo1 = drd.GetString(posCampo1);
                    obeCampoCadenaCorto.Campo2 = drd.GetString(posCampo2);
                    lbeComponente.Add(obeCampoCadenaCorto);
                }
                drd.Close();
            }
            return (lbeComponente);
        }
    }
}
