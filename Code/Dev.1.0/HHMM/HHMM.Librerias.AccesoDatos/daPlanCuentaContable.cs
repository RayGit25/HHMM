using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;
namespace HHMM.Librerias.AccesoDatos
{
    public class daPlanCuentaContable
    {
        public List<beCampoCadenaCorto> listar(SqlConnection con)
        {
            List<beCampoCadenaCorto> lbePlanCuentaContable = null;
            SqlCommand cmd = new SqlCommand("uspPlanCuentaContableListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbePlanCuentaContable = new List<beCampoCadenaCorto>();
                int posCampo1 = drd.GetOrdinal("PlanCuentaContableId");
                int posCampo2 = drd.GetOrdinal("Descripcion");
                beCampoCadenaCorto obeCampoCadenaCorto;
                while (drd.Read())
                {
                    obeCampoCadenaCorto = new beCampoCadenaCorto();
                    obeCampoCadenaCorto.Campo1 = drd.GetString(posCampo1);
                    obeCampoCadenaCorto.Campo2 = drd.GetString(posCampo2);
                    lbePlanCuentaContable.Add(obeCampoCadenaCorto);
                }
                drd.Close();
            }
            return (lbePlanCuentaContable);
        }
    }
}
