using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daEmpresa
	{
		public List<beCampoCadena> listar(SqlConnection con, string sucursal)
		{
			List<beCampoCadena> lbeEmpresa = null;
			SqlCommand cmd = new SqlCommand("uspEmpresaListarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@sucursal", sucursal);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeEmpresa = new List<beCampoCadena>();
				int posPersonaId = drd.GetOrdinal("PersonaId");
				int posNombre = drd.GetOrdinal("Nombre");
				int posRUC = drd.GetOrdinal("RUC");
				beCampoCadena obeEmpresa;
				while (drd.Read())
				{
					obeEmpresa = new beCampoCadena();
					obeEmpresa.Campo1 = drd.GetInt32(posPersonaId);
					obeEmpresa.Campo2 = drd.GetString(posNombre);
					obeEmpresa.Campo3 = drd.GetString(posRUC);
					lbeEmpresa.Add(obeEmpresa);
				}
				drd.Close();
			}
			return (lbeEmpresa);
		}
	}
}
