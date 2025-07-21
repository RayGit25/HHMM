using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daProvision
    {
        public beProvisionDetalleVistaListas listar(SqlConnection con, int id)
        {
			beProvisionDetalleVistaListas obeProvisionDetalleVistaListas = null;
			List<beCampoEntero> lbeMedico = null;

            SqlCommand cmd = new SqlCommand("uspProcesoMedicoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProcesoId", id);
			cmd.CommandTimeout = 0;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
				obeProvisionDetalleVistaListas = new beProvisionDetalleVistaListas();
				lbeMedico = new List<beCampoEntero>();
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posNombreCompletoE = drd.GetOrdinal("NombreCompleto");
				beCampoEntero obeMedico;
				while (drd.Read())
				{
					obeMedico = new beCampoEntero();
					obeMedico.campo1 = drd.GetInt32(posMedicoEmpresaId);
					obeMedico.campo2 = drd.GetString(posNombreCompletoE).Trim();
					lbeMedico.Add(obeMedico);
				}
				obeProvisionDetalleVistaListas.ListaMedico = lbeMedico;
				List<beCampoEntero> lbeEspecialidad = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeEspecialidad;
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion).Trim();
						lbeEspecialidad.Add(obeEspecialidad);
					}
					obeProvisionDetalleVistaListas.ListaEspecialidad = lbeEspecialidad;
				}

				List<beProvisionDetalleVista> lbeProvisionDetalleVista = new List<beProvisionDetalleVista>();
				if (drd.NextResult())
				{
					beProvisionDetalleVista obeProvisionDetalleVista;
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					int posImporte = drd.GetOrdinal("Importe");
					int posBonificacion = drd.GetOrdinal("Bonificacion");
					int posDescuento = drd.GetOrdinal("Descuento");
					int posAjuste = drd.GetOrdinal("Ajuste");
					int posTotal = drd.GetOrdinal("Total");
					int posIndicadorError = drd.GetOrdinal("IndicadorError");
					int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
					int posObservacion = drd.GetOrdinal("Observacion");
					int posFechaHoraCalculo = drd.GetOrdinal("FechaHoraCalculo");
					int posFechaHoraAutorizado = drd.GetOrdinal("FechaHoraAutorizado");
					int posFechaHoraProvision = drd.GetOrdinal("FechaHoraProvision");
					int posEspecialidadId2 = drd.GetOrdinal("EspecialidadId");
					int posMedicoEmpresaId2 = drd.GetOrdinal("MedicoEmpresaId");
					int posProcesoMedicoId = drd.GetOrdinal("ProcesoMedicoId");
					int posConfiguracionPagoId2 = drd.GetOrdinal("ConfiguracionPagoId");
					while (drd.Read())
					{
						obeProvisionDetalleVista = new beProvisionDetalleVista();
						obeProvisionDetalleVista.PersonaId = drd.GetInt32(posPersonaId);
						obeProvisionDetalleVista.NombreCompleto = drd.GetString(posNombreCompleto);
						obeProvisionDetalleVista.Importe = drd.GetDecimal(posImporte);
						obeProvisionDetalleVista.Bonificacion = drd.GetDecimal(posBonificacion);
						obeProvisionDetalleVista.Descuento = drd.GetDecimal(posDescuento);
						obeProvisionDetalleVista.Ajuste = drd.GetDecimal(posAjuste);
						obeProvisionDetalleVista.Total = drd.GetDecimal(posTotal);
						obeProvisionDetalleVista.IndicadorError = drd.GetBoolean(posIndicadorError);
						obeProvisionDetalleVista.EstadoProvision = drd.GetString(posEstadoProvision);
						obeProvisionDetalleVista.Observacion = drd.GetString(posObservacion);
						obeProvisionDetalleVista.FechaHoraCalculo = drd.GetDateTime(posFechaHoraCalculo);
						obeProvisionDetalleVista.FechaHoraAutorizado = drd.GetDateTime(posFechaHoraAutorizado);
						obeProvisionDetalleVista.FechaHoraProvision = drd.GetDateTime(posFechaHoraProvision);
						obeProvisionDetalleVista.EspecialidadId = drd.GetInt32(posEspecialidadId2);
						obeProvisionDetalleVista.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId2);
						obeProvisionDetalleVista.ProcesoMedicoId = drd.GetInt32(posProcesoMedicoId);
						obeProvisionDetalleVista.ConfiguracionPagoId = drd.GetInt32(posConfiguracionPagoId2);
						lbeProvisionDetalleVista.Add(obeProvisionDetalleVista);
					}
					obeProvisionDetalleVistaListas.ListaProvision = lbeProvisionDetalleVista;
				}
				List<beCampoEntero> lbeConfiguracion = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeConfiguracion;
					int posConfiguracionPagoId3 = drd.GetOrdinal("ConfiguracionPagoId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeConfiguracion = new beCampoEntero();
						obeConfiguracion.campo1 = drd.GetInt32(posConfiguracionPagoId3);
						obeConfiguracion.campo2 = drd.GetString(posDescripcion3).Trim();
						lbeConfiguracion.Add(obeConfiguracion);
					}
					obeProvisionDetalleVistaListas.ListaConfiguracion = lbeConfiguracion;
				}
                drd.Close();
            }
			return (obeProvisionDetalleVistaListas);
        }

		public List<beAsientoContable> listarAsientoContable(SqlConnection con, string sucursalId,int procesoId)
		{
			List<beAsientoContable> lbeAsientoContable = null;
			SqlCommand cmd = new SqlCommand("uspProcesoMedicoAsientoExportar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursalId);
			cmd.Parameters.AddWithValue("@ProcesoId", procesoId);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbeAsientoContable = new List<beAsientoContable>();

				int posCuentaContable = drd.GetOrdinal("CuentaContable");
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posProyectoId = drd.GetOrdinal("ProyectoId");
				int posFECHA = drd.GetOrdinal("FECHA");
				int posCentroCosto = drd.GetOrdinal("CentroCosto");
				int posDocumento = drd.GetOrdinal("Documento");
				int posSucursal = drd.GetOrdinal("Sucursal");
				int posReferencia = drd.GetOrdinal("Referencia");
				int posMontoLocal = drd.GetOrdinal("MontoLocal");
				int posMontoDolar = drd.GetOrdinal("MontoDolar");
				int posReferencia1 = drd.GetOrdinal("Referencia1");
				int posReferencia9 = drd.GetOrdinal("Referencia9");
				int posGlosa = drd.GetOrdinal("Glosa");

				beAsientoContable obeAsientoContable;
				while (drd.Read())
				{
					obeAsientoContable = new beAsientoContable();
					obeAsientoContable.CuentaContable = drd.GetString(posCuentaContable);
					obeAsientoContable.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
					obeAsientoContable.ProyectoId = drd.GetString(posProyectoId);
					obeAsientoContable.FECHA = drd.GetString(posFECHA);
					obeAsientoContable.CentroCosto = drd.GetString(posCentroCosto);
					obeAsientoContable.Documento = drd.GetString(posDocumento);
					obeAsientoContable.Sucursal = drd.GetString(posSucursal);
					obeAsientoContable.Referencia = drd.GetString(posReferencia);
					obeAsientoContable.MontoLocal = drd.GetDecimal(posMontoLocal);
					obeAsientoContable.MontoDolar = drd.GetDecimal(posMontoDolar);
					obeAsientoContable.Referencia1 = drd.GetString(posReferencia1);
					obeAsientoContable.Referencia9 = drd.GetString(posReferencia9);
					obeAsientoContable.Glosa = drd.GetString(posGlosa);
					lbeAsientoContable.Add(obeAsientoContable);
				}
				drd.Close();
			}
			return (lbeAsientoContable);
		}

		public int RevertirAsientoProvision(SqlConnection con, string su, int id, int usuario,string ip,string bd)
		{
			int exito = -1;
			SqlCommand cmd = null;
			if (ip != null && bd != null)
			{
				cmd = new SqlCommand("uspProcesoMedicoAsientoRevertirV1", con);
			}
			else
			{
				cmd = new SqlCommand("uspProcesoMedicoAsientoRevertir", con);
			}
			
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@ProcesoId", id);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			if (ip != null && bd != null)
			{
				cmd.Parameters.AddWithValue("@IP", ip);
				cmd.Parameters.AddWithValue("@BaseDatos", bd);
			}
			SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;
			cmd.ExecuteNonQuery();
			exito = (int)par.Value;
			return exito;
		}
		public int RevertirAsientoProvisionCSFR(SqlConnection con, string su, int id, int usuario, string ip, string bd)
		{
			int exito = -1;
			SqlCommand cmd = null;

			cmd = new SqlCommand("uspProcesoMedicoAsientoRevertirV2", con);

			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@ProcesoId", id);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			if (ip != null && bd != null)
			{
				cmd.Parameters.AddWithValue("@IP", ip);
				cmd.Parameters.AddWithValue("@BaseDatos", bd);
			}
			SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par.Direction = ParameterDirection.ReturnValue;
			cmd.ExecuteNonQuery();
			exito = (int)par.Value;
			return exito;
		}

		public List<beMedicoSeleccionProvision> ListarMedicoSeleccionProvision(SqlConnection con,string sucursalId,int procesoid)
		{
			List<beMedicoSeleccionProvision> lbeMedicoSeleccionProvision = null;
			SqlCommand cmd = new SqlCommand("uspProcesoDetalleMedicoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;
			cmd.Parameters.AddWithValue("@SucursalId", sucursalId);
			cmd.Parameters.AddWithValue("@ProcesoId", procesoid);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbeMedicoSeleccionProvision = new List<beMedicoSeleccionProvision>();
				int posPersonaId = drd.GetOrdinal("PersonaId");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posIndicadorProceso = drd.GetOrdinal("IndicadorProceso");
				beMedicoSeleccionProvision obeMedicoSeleccionProvision;
				while (drd.Read())
				{
					obeMedicoSeleccionProvision = new beMedicoSeleccionProvision();
					obeMedicoSeleccionProvision.PersonaId = drd.GetInt32(posPersonaId);
					obeMedicoSeleccionProvision.Medico = drd.GetString(posMedico).Trim();
					obeMedicoSeleccionProvision.Empresa = drd.GetString(posEmpresa).Trim();
					obeMedicoSeleccionProvision.Especialidad = drd.GetString(posEspecialidad).Trim();
					obeMedicoSeleccionProvision.IndicadorProceso = drd.GetInt32(posIndicadorProceso);
					lbeMedicoSeleccionProvision.Add(obeMedicoSeleccionProvision);
				}
				drd.Close();
			}

			return lbeMedicoSeleccionProvision;
		}
    }
}
