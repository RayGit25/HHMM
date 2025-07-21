using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daPrestacion
    {
		public List<bePrestacionVista> listar(SqlConnection con, string tc,int val,string su,string lista)
        {
			List<bePrestacionVista> lbePrestacion = null;
            SqlCommand cmd = new SqlCommand("uspPrestacionesListado", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlParameter par1 = cmd.Parameters.Add("@TipoConsulta", SqlDbType.Char,1);
            par1.Direction = ParameterDirection.Input;
            par1.Value = tc;
			SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = val;
			SqlParameter par3 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par3.Direction = ParameterDirection.Input;
			par3.Value = su;
			SqlParameter par4 = cmd.Parameters.Add("@ListaComponentes", SqlDbType.VarChar);
			par4.Direction = ParameterDirection.Input;
			par4.Value = lista;
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
				lbePrestacion = new List<bePrestacionVista>();
				int posComponenteId = drd.GetOrdinal("ComponenteId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posValorMedida=drd.GetOrdinal("ValorMedida");
				int posServicio = drd.GetOrdinal("Servicio");
				int posIndicadorVisible = drd.GetOrdinal("IndicadorVisible");
				bePrestacionVista obePrestacionVista;
                while (drd.Read())
                {
					obePrestacionVista = new bePrestacionVista();
					obePrestacionVista.ComponenteId = drd.GetString(posComponenteId);
					obePrestacionVista.Descripcion = drd.GetString(posDescripcion);
					obePrestacionVista.ValorMedida = drd.GetDecimal(posValorMedida);
					obePrestacionVista.Servicio = drd.GetString(posServicio);
					obePrestacionVista.IndicadorVisible = drd.GetBoolean(posIndicadorVisible);
					lbePrestacion.Add(obePrestacionVista);
                }
                drd.Close();
            }
            return (lbePrestacion);
        }
    }
}
