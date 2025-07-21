using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daMedicoEmpresaMantenimiento
	{
		public beMedicoEmpresaMantenimientoVistaListas MedicoEmpresaMantenimientoLista(SqlConnection con, string su, int id)
		{
			beMedicoEmpresaMantenimientoVistaListas obeMedicoEmpresaMantenimientoVistaListas = null;
			List<beMedicoEmpresaMantenimientoVista> lbeMedicoEmpresaMantenimientoVista = null;
			SqlCommand cmd = new SqlCommand("uspMedicoEmpresaMantenimientoListarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@UsuarioId", id);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoEmpresaMantenimientoVistaListas = new beMedicoEmpresaMantenimientoVistaListas();
				lbeMedicoEmpresaMantenimientoVista = new List<beMedicoEmpresaMantenimientoVista>();
				int posId1 = drd.GetOrdinal("Id");
				int posSucursal1 = drd.GetOrdinal("Sucursal");
				int posMedico1 = drd.GetOrdinal("Medico");
				int posTipoPersona1 = drd.GetOrdinal("TipoPersona");
				int posNumeroDocumento1 = drd.GetOrdinal("NumeroDocumento");
				int posDocumentoFiscal1 = drd.GetOrdinal("DocumentoFiscal");
				int posEstadoMedico1 = drd.GetOrdinal("EstadoMedico");
				int posEspecialidad1 = drd.GetOrdinal("Especialidad");
				int posEmpresa1 = drd.GetOrdinal("Empresa");
				int posTipoMedico1 = drd.GetOrdinal("TipoMedico");
				int posCorreoElectronico1 = drd.GetOrdinal("CorreoElectronico");
				int posCorreoAlterno1 = drd.GetOrdinal("CorreoAlterno");
				int posTipoServicioImpuestoId1 = drd.GetOrdinal("TipoServicioImpuestoId");
				int posSucursalId1 = drd.GetOrdinal("SucursalId");
				int posEstadoRegistroWeb = drd.GetOrdinal("EstadoRegistroWeb");
				beMedicoEmpresaMantenimientoVista obeMedicoEmpresaMantenimientoVista;
				while (drd.Read())
				{
					obeMedicoEmpresaMantenimientoVista = new beMedicoEmpresaMantenimientoVista();
					obeMedicoEmpresaMantenimientoVista.Id = drd.GetInt32(posId1);
					obeMedicoEmpresaMantenimientoVista.Sucursal = drd.GetString(posSucursal1).Trim();
					obeMedicoEmpresaMantenimientoVista.Medico = drd.GetString(posMedico1).Trim();
					obeMedicoEmpresaMantenimientoVista.TipoPersona = drd.GetString(posTipoPersona1).Trim();
					obeMedicoEmpresaMantenimientoVista.NumeroDocumento = drd.GetString(posNumeroDocumento1).Trim();
					obeMedicoEmpresaMantenimientoVista.DocumentoFiscal = drd.GetString(posDocumentoFiscal1).Trim();
					obeMedicoEmpresaMantenimientoVista.EstadoMedico = drd.GetString(posEstadoMedico1).Trim();
					obeMedicoEmpresaMantenimientoVista.Especialidad = drd.GetString(posEspecialidad1).Trim();
					obeMedicoEmpresaMantenimientoVista.Empresa = drd.GetString(posEmpresa1).Trim();
					obeMedicoEmpresaMantenimientoVista.TipoMedico = drd.GetString(posTipoMedico1).Trim();
					obeMedicoEmpresaMantenimientoVista.CorreoElectronico = drd.GetString(posCorreoElectronico1).Trim();
					obeMedicoEmpresaMantenimientoVista.CorreoAlternativo = drd.GetString(posCorreoAlterno1).Trim();
					obeMedicoEmpresaMantenimientoVista.TipoServicioImpuestoId = drd.GetString(posTipoServicioImpuestoId1).Trim();
					obeMedicoEmpresaMantenimientoVista.SucursalId = drd.GetString(posSucursalId1).Trim();
					obeMedicoEmpresaMantenimientoVista.EstadoRegistroWeb = drd.GetString(posEstadoRegistroWeb).Trim();
					lbeMedicoEmpresaMantenimientoVista.Add(obeMedicoEmpresaMantenimientoVista);
				}
				obeMedicoEmpresaMantenimientoVistaListas.ListaMedicos = lbeMedicoEmpresaMantenimientoVista;
				List<beCampoCadenaCorto> lbeTipoServicioImpuesto = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{					
					int posTipoServicioImpuestoId2 = drd.GetOrdinal("TipoServicioImpuestoId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeTipoServicioImpuesto;
					while (drd.Read())
					{
						obeTipoServicioImpuesto = new beCampoCadenaCorto();
						obeTipoServicioImpuesto.Campo1 = drd.GetString(posTipoServicioImpuestoId2);
						obeTipoServicioImpuesto.Campo2 = drd.GetString(posDescripcion2);
						lbeTipoServicioImpuesto.Add(obeTipoServicioImpuesto);
					}
					obeMedicoEmpresaMantenimientoVistaListas.ListaTipoServicioImpuesto = lbeTipoServicioImpuesto;					
				}
				List<beCampoCadenaCorto> lbeTipoMedico = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posTipoMedico3 = drd.GetOrdinal("TipoMedico");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeTipoMedico;
					while (drd.Read())
					{
						obeTipoMedico = new beCampoCadenaCorto();
						obeTipoMedico.Campo1 = drd.GetString(posTipoMedico3);
						obeTipoMedico.Campo2 = drd.GetString(posDescripcion3);
						lbeTipoMedico.Add(obeTipoMedico);
					}
					obeMedicoEmpresaMantenimientoVistaListas.ListaTipoMedico = lbeTipoMedico;	
				}
				List<beCampoCadenaCorto> lbeSucursal = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posSucursalId4 = drd.GetOrdinal("SucursalId");
					int posDescripcion4 = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeSucursal;
					while (drd.Read())
					{
						obeSucursal = new beCampoCadenaCorto();
						obeSucursal.Campo1 = drd.GetString(posSucursalId4);
						obeSucursal.Campo2 = drd.GetString(posDescripcion4);
						lbeSucursal.Add(obeSucursal);
					}
					obeMedicoEmpresaMantenimientoVistaListas.ListaSucursal = lbeSucursal;
				}
				List<beCampoCadenaCorto> lbeMedicoSucursal = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					int posSucursalId4 = drd.GetOrdinal("PersonaId");
					int posDescripcion4 = drd.GetOrdinal("SucursalId");
					beCampoCadenaCorto obeMedicoSucursal;
					while (drd.Read())
					{
						obeMedicoSucursal = new beCampoCadenaCorto();
						obeMedicoSucursal.Campo1 = drd.GetInt32(posSucursalId4).ToString();
						obeMedicoSucursal.Campo2 = drd.GetString(posDescripcion4);
						lbeMedicoSucursal.Add(obeMedicoSucursal);
					}
					obeMedicoEmpresaMantenimientoVistaListas.ListaMedicoSucursal = lbeMedicoSucursal;
				}
				List<beCampoCadenaCorto> lbeMensaje = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					lbeMensaje = new List<beCampoCadenaCorto>();
					beCampoCadenaCorto obeMensaje = null;

					int posCodigo = drd.GetOrdinal("Codigo");
					int posDescripcion = drd.GetOrdinal("Descripcion");

					while (drd.Read())
					{
						obeMensaje = new beCampoCadenaCorto();
						obeMensaje.Campo1 = drd.GetString(posCodigo);
						obeMensaje.Campo2 = drd.GetString(posDescripcion);
						lbeMensaje.Add(obeMensaje);
					}
					obeMedicoEmpresaMantenimientoVistaListas.ListaMensajes = lbeMensaje;
				}
			}
			return (obeMedicoEmpresaMantenimientoVistaListas);
		}

		public bool ActualizarMedicoEmpresa(SqlConnection con, int persona,string tipomedico,string su,string correoelectronico,string correoalterno,string tiposervicio,int usuario,string estadoweb)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoEmpresaMantenimientoActualizarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@TipoMedico", tipomedico);
			cmd.Parameters.AddWithValue("@ListaSucursalId", su);//SucursalId
			cmd.Parameters.AddWithValue("@CorreoElectronico", correoelectronico);
			cmd.Parameters.AddWithValue("@CorreoAlterno", correoalterno);
			cmd.Parameters.AddWithValue("@TipoServicioImpuestoId", tiposervicio);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			cmd.Parameters.AddWithValue("@EstadoRegistroWeb", estadoweb);
			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}
	}
}
