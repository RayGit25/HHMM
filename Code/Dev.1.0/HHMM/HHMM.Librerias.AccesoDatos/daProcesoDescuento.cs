using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daProcesoDescuento
	{
		public beProcesoDescuentoListas ProcesoDescuentoListar(SqlConnection con, int id,string su,string periodo,string estado)
		{
			beProcesoDescuentoListas obeProcesoDescuentoListas = null;
			List<beCampoCadenaCorto> ListaPeriodo=null;
			List<beProcesoDescuentoVista> ListaDescuento = null;
			SqlCommand cmd = new SqlCommand("uspProcesoDescuentoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@MedicoId", id);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@Periodo", periodo);
			cmd.Parameters.AddWithValue("@Estado", estado);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeProcesoDescuentoListas = new beProcesoDescuentoListas();
				ListaPeriodo = new List<beCampoCadenaCorto>();
				int posPeriodo1 = drd.GetOrdinal("Periodo");
				int posEstado1 = drd.GetOrdinal("Estado");
				beCampoCadenaCorto obePeriodo;
				while (drd.Read())
				{
					obePeriodo = new beCampoCadenaCorto();
					obePeriodo.Campo1 = drd.GetString(posPeriodo1);
					obePeriodo.Campo2 = drd.GetString(posEstado1);
					ListaPeriodo.Add(obePeriodo);
				}
				obeProcesoDescuentoListas.ListaPeriodo = ListaPeriodo;
				if (drd.NextResult())
				{
					ListaDescuento = new List<beProcesoDescuentoVista>();
					int posMedicoEmpresaId2 = drd.GetOrdinal("MedicoEmpresaId");
					int posMedicoEmpresa2 = drd.GetOrdinal("MedicoEmpresa");
					int posTipo2 = drd.GetOrdinal("Tipo");
					int posTipoDescuento2 = drd.GetOrdinal("TipoDescuento");
					int posNombreDescuento2 = drd.GetOrdinal("NombreDescuento");
					int posImporte2 = drd.GetOrdinal("Importe");
					int posEstado2 = drd.GetOrdinal("Estado");
					int posPeriodo2 = drd.GetOrdinal("Periodo");
					beProcesoDescuentoVista obeProcesoDescuentoVista;
					while (drd.Read())
					{
						obeProcesoDescuentoVista = new beProcesoDescuentoVista();
						obeProcesoDescuentoVista.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId2);
						obeProcesoDescuentoVista.MedicoEmpresa = drd.GetString(posMedicoEmpresa2).Trim();
						obeProcesoDescuentoVista.Tipo = drd.GetString(posTipo2);
						obeProcesoDescuentoVista.TipoDescuento = drd.GetString(posTipoDescuento2);
						obeProcesoDescuentoVista.NombreDescuento = drd.GetString(posNombreDescuento2);
						obeProcesoDescuentoVista.Importe = drd.GetDecimal(posImporte2);
						obeProcesoDescuentoVista.Estado = drd.GetString(posEstado2);
						obeProcesoDescuentoVista.Periodo = drd.GetString(posPeriodo2);
						ListaDescuento.Add(obeProcesoDescuentoVista);
					}
					obeProcesoDescuentoListas.ListaProcesoDescuento = ListaDescuento;
				}
				drd.Close();
			}
			return obeProcesoDescuentoListas;
		}
	}
}
