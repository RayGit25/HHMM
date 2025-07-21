using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daHistorialCambio
	{
		public List<beHistorialCambio> listar(SqlConnection con,string tabla, string RegistroId)
		{
			List<beHistorialCambio> lbeHistorialCambio = null;
			SqlCommand cmd = new SqlCommand("uspHistorialCambioListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Tabla",tabla);
			cmd.Parameters.AddWithValue("@RegistroId",RegistroId);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeHistorialCambio = new List<beHistorialCambio>();
				int posAccion = drd.GetOrdinal("Accion");
				int posCampo = drd.GetOrdinal("Campo");
				int posValorInicial = drd.GetOrdinal("ValorInicial");
				int posValorFinal = drd.GetOrdinal("ValorFinal");
				int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
				int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");

				beHistorialCambio obeHistorialCambio;
				while (drd.Read())
				{
					obeHistorialCambio = new beHistorialCambio();
					obeHistorialCambio.Accion = drd.GetString(posAccion);
					obeHistorialCambio.Campo = drd.GetString(posCampo);
					obeHistorialCambio.ValorInicial = drd.GetString(posValorInicial);
                    obeHistorialCambio.ValorFinal = drd.GetString(posValorFinal);
					obeHistorialCambio.NombreCompleto = drd.GetString(posNombreCompleto);
					obeHistorialCambio.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
					lbeHistorialCambio.Add(obeHistorialCambio);
				}
				drd.Close();
			}
			return (lbeHistorialCambio);
		}
	}
}
