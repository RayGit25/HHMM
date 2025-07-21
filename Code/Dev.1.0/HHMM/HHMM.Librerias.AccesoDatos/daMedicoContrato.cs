using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
	public class daMedicoContrato
	{
		public beMedicoContratoListas listarListas(SqlConnection con, string sup)
		{
			beMedicoContratoListas obeMedicoContratoListas = null;
			List<beCampoEntero> lbeConfiguracionPago = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoPagoListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = sup;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoListas = new beMedicoContratoListas();
				lbeConfiguracionPago = new List<beCampoEntero>();
				int posConfiguracionPagoId = drd.GetOrdinal("ConfiguracionPagoId");
				int posDescripcion1 = drd.GetOrdinal("Descripcion");
				beCampoEntero obeConfiguracionPago;
				while (drd.Read())
				{
					obeConfiguracionPago = new beCampoEntero();
					obeConfiguracionPago.campo1 = drd.GetInt32(posConfiguracionPagoId);
					obeConfiguracionPago.campo2 = drd.GetString(posDescripcion1).Trim();
					lbeConfiguracionPago.Add(obeConfiguracionPago);
				}
				obeMedicoContratoListas.ListaConfiguracionPago = lbeConfiguracionPago;
				List<beCampoEntero> lbeTipoAtencion = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoAtencion;
					int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
					int posDescripcionCorta = drd.GetOrdinal("DescripcionCorta");
					while (drd.Read())
					{
						obeTipoAtencion = new beCampoEntero();
						obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
						obeTipoAtencion.campo2 = drd.GetString(posDescripcionCorta).Trim();
						lbeTipoAtencion.Add(obeTipoAtencion);
					}
					obeMedicoContratoListas.ListaTipoAtencion = lbeTipoAtencion;
				}
				List<beCampoEntero> lbeTipoAdmision = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoAdmision;
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoAdmision = new beCampoEntero();
						obeTipoAdmision.campo1 = drd.GetInt32(posTipoAdmisionId);
						obeTipoAdmision.campo2 = drd.GetString(posDescripcion2).Trim();
						lbeTipoAdmision.Add(obeTipoAdmision);
					}
					obeMedicoContratoListas.ListaTipoAdmision = lbeTipoAdmision;
				}
				List<beCampoEnteroLargo> lbeTipoPaciente = new List<beCampoEnteroLargo>();
				if (drd.NextResult())
				{
					beCampoEnteroLargo obeTipoPaciente;
					int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posTipoAdmisionId2 = drd.GetOrdinal("TipoAdmisionId");
					while (drd.Read())
					{
						obeTipoPaciente = new beCampoEnteroLargo();
						obeTipoPaciente.campo1 = drd.GetInt32(posTipoPacienteId);
						obeTipoPaciente.campo2 = drd.GetString(posDescripcion3).Trim();
						obeTipoPaciente.campo3 = drd.GetInt32(posTipoAdmisionId2);
						lbeTipoPaciente.Add(obeTipoPaciente);
					}
					obeMedicoContratoListas.ListaTipoPaciente = lbeTipoPaciente;
				}
				List<beCampoEntero> lbeAseguradora = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeAseguradora;
					int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					while (drd.Read())
					{
						obeAseguradora = new beCampoEntero();
						obeAseguradora.campo1 = drd.GetInt32(posAseguradoraId);
						obeAseguradora.campo2 = drd.GetString(posNombreCompleto).Trim();
						lbeAseguradora.Add(obeAseguradora);
					}
					obeMedicoContratoListas.ListaTipoAseguradora = lbeAseguradora;
				}
				List<beCampoEntero> lbeEspecialidad = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeEspecialidad;
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion4 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion4).Trim();
						lbeEspecialidad.Add(obeEspecialidad);
					}
					obeMedicoContratoListas.ListaEspecialidad = lbeEspecialidad;
				}
				List<beCampoEntero> lbeTurno = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTurno;
					int posTurnoId = drd.GetOrdinal("TurnoId");
					int posDescripcion5 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTurno = new beCampoEntero();
						obeTurno.campo1 = drd.GetInt32(posTurnoId);
						obeTurno.campo2 = drd.GetString(posDescripcion5).Trim();
						lbeTurno.Add(obeTurno);
					}
					obeMedicoContratoListas.ListaTurno = lbeTurno;
				}
				List<beCampoEntero> lbeTiempoPago = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTiempoPago;
					int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
					int posDescripcion6 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTiempoPago = new beCampoEntero();
						obeTiempoPago.campo1 = drd.GetInt32(posTiempoPagoId);
						obeTiempoPago.campo2 = drd.GetString(posDescripcion6).Trim();
						lbeTiempoPago.Add(obeTiempoPago);
					}
					obeMedicoContratoListas.ListaTiempoPago = lbeTiempoPago;
				}
				List<beCampoEntero> lbeServicio = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeServicio;
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion7 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeServicio = new beCampoEntero();
						obeServicio.campo1 = drd.GetInt32(posServicioId);
						obeServicio.campo2 = drd.GetString(posDescripcion7).Trim();
						lbeServicio.Add(obeServicio);
					}
					obeMedicoContratoListas.ListaServicio = lbeServicio;
				}
				List<beCampoEnteroLargo> lbeContrato = new List<beCampoEnteroLargo>();
				if (drd.NextResult())
				{
					beCampoEnteroLargo obeContrato;
					int posContratoId = drd.GetOrdinal("ContratoId");
					int posCodigoContrato = drd.GetOrdinal("CodigoContrato");
					int posAseguradoraId2 = drd.GetOrdinal("AseguradoraId");
					while (drd.Read())
					{
						obeContrato = new beCampoEnteroLargo();
						obeContrato.campo1 = drd.GetInt32(posContratoId);
						obeContrato.campo2 = drd.GetString(posCodigoContrato).Trim();
						obeContrato.campo3 = drd.GetInt32(posAseguradoraId2);
						lbeContrato.Add(obeContrato);
					}
					obeMedicoContratoListas.ListaContrato = lbeContrato;
				}
				List<beCampoEntero> lbeTipoBonificacion = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoBonificacion;
					int posTipoBonificacionId = drd.GetOrdinal("TipoBonificacionId");
					int posDescripcion8 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoBonificacion = new beCampoEntero();
						obeTipoBonificacion.campo1 = drd.GetInt32(posTipoBonificacionId);
						obeTipoBonificacion.campo2 = drd.GetString(posDescripcion8).Trim();
						lbeTipoBonificacion.Add(obeTipoBonificacion);
					}
					obeMedicoContratoListas.ListaTipoBonificacion = lbeTipoBonificacion;
				}

				List<beCampoEntero> lbeTipoAdmisionProveedor = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoAdmisionProveedor;
					int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoAdmisionProveedor = new beCampoEntero();
						obeTipoAdmisionProveedor.campo1 = drd.GetInt32(posTipoAdmisionId);
						obeTipoAdmisionProveedor.campo2 = drd.GetString(posDescripcion2).Trim();
						lbeTipoAdmisionProveedor.Add(obeTipoAdmisionProveedor);
					}
					obeMedicoContratoListas.ListaTipoAdmisionProveedor = lbeTipoAdmisionProveedor;
				}

				List<beCampoCadenaCorto> lbeListaTipoDocumento = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeTipoDocumentoPago;
					int posTipoAdmisionId = drd.GetOrdinal("TipoDocumentoPagoId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoDocumentoPago = new beCampoCadenaCorto();
						obeTipoDocumentoPago.Campo1 = drd.GetString(posTipoAdmisionId);
						obeTipoDocumentoPago.Campo2 = drd.GetString(posDescripcion2).Trim();
						lbeListaTipoDocumento.Add(obeTipoDocumentoPago);
					}
					obeMedicoContratoListas.ListaTipoDocumento = lbeListaTipoDocumento;
				}
				List<beCampoCadenaCorto> lbeTipoServicioImpuesto = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeTipoServicioImpuesto;
					int posCodigoImpuesto = drd.GetOrdinal("CodigoImpuesto");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeTipoServicioImpuesto = new beCampoCadenaCorto();
						obeTipoServicioImpuesto.Campo1 = drd.GetString(posCodigoImpuesto);
						obeTipoServicioImpuesto.Campo2 = drd.GetString(posDescripcion2).Trim();
						lbeTipoServicioImpuesto.Add(obeTipoServicioImpuesto);
					}
					obeMedicoContratoListas.ListaTipoServicioImpuesto = lbeTipoServicioImpuesto;
				}
				List<beCampoCadena3> lbeConceptoMonto = new List<beCampoCadena3>();
				if (drd.NextResult())
				{
					beCampoCadena3 obeConceptoMonto;
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					int posIndicadorAdministrativo = drd.GetOrdinal("IndicadorAdministrativo");
					while (drd.Read())
					{
						obeConceptoMonto = new beCampoCadena3();
						obeConceptoMonto.Campo1 = drd.GetInt32(posConceptoMontoFijoId).ToString();
						obeConceptoMonto.Campo2 = drd.GetString(posDescripcion3).Trim();
						obeConceptoMonto.Campo3 = drd.GetBoolean(posIndicadorAdministrativo).ToString();
						lbeConceptoMonto.Add(obeConceptoMonto);
					}
					obeMedicoContratoListas.ListaConceptoMonto = lbeConceptoMonto;
				}
				List<beCampoEntero> lbeModalidad = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeModalidad;
					int posModalidadFacturacionId = drd.GetOrdinal("ModalidadFacturacionId");
					int posDescripcion4 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeModalidad = new beCampoEntero();
						obeModalidad.campo1 = drd.GetInt32(posModalidadFacturacionId);
						obeModalidad.campo2 = drd.GetString(posDescripcion4).Trim();
						lbeModalidad.Add(obeModalidad);
					}
					obeMedicoContratoListas.ListaModalidad = lbeModalidad;
				}
				List<beCampoCadenaCorto> lbeAplicacion = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeAplicacion;
					int posAplicacionId = drd.GetOrdinal("Codigo");
					int posDescripcionAplicacion = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeAplicacion = new beCampoCadenaCorto();
						obeAplicacion.Campo1 = drd.GetString(posAplicacionId);
						obeAplicacion.Campo2 = drd.GetString(posDescripcionAplicacion).Trim();
						lbeAplicacion.Add(obeAplicacion);
					}
					obeMedicoContratoListas.ListaAplicacion = lbeAplicacion;
				}

				List<beCampoCadenaCorto> lbeAplica= new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeAplicacion;
					int posAplicaId = drd.GetOrdinal("Codigo");
					int posDescripcionAplica = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeAplicacion = new beCampoCadenaCorto();
						obeAplicacion.Campo1 = drd.GetString(posAplicaId);
						obeAplicacion.Campo2 = drd.GetString(posDescripcionAplica).Trim();
						lbeAplica.Add(obeAplicacion);
					}
					obeMedicoContratoListas.ListaAplica = lbeAplica;
				}


				List<beCampoCadena4> lbeDescuento = new List<beCampoCadena4>();
				if (drd.NextResult())
				{
					beCampoCadena4 obeDescuento;
					int posDescuentoId = drd.GetOrdinal("DescuentoId");
					int posDescripcionDescuento = drd.GetOrdinal("Descripcion");
					int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
					int posTipoMonto = drd.GetOrdinal("TipoMonto");

					while (drd.Read())
					{
						obeDescuento = new beCampoCadena4();
						obeDescuento.Campo1 = drd.GetInt32(posDescuentoId).ToString();
						obeDescuento.Campo2 = drd.GetString(posDescripcionDescuento);
						obeDescuento.Campo3 = drd.GetString(posTipoDescuentoId);
						obeDescuento.Campo4 = drd.GetString(posTipoMonto);

						lbeDescuento.Add(obeDescuento);
					}
					obeMedicoContratoListas.ListaDescuento = lbeDescuento;
				}

				List<beCampoCadenaCorto> lbeTipoDescuento = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeDescuento;
					int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
					int posDescripcionTipoDescuento = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeDescuento = new beCampoCadenaCorto();
						obeDescuento.Campo1 = drd.GetInt32(posTipoDescuentoId).ToString();
						obeDescuento.Campo2 = drd.GetString(posDescripcionTipoDescuento);
						lbeTipoDescuento.Add(obeDescuento);
					}
					obeMedicoContratoListas.ListaTipoDescuento = lbeTipoDescuento;
				}


				drd.Close();
			}
			return (obeMedicoContratoListas);
		}

		public beAsignacionDescuentoVistaLista listarVista(SqlConnection con, string sup, int pe, int med, DateTime fei, DateTime fef, int EmpresaId, int EspecialidadId)
		{
			beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = null;
			List<beAsignacionDescuentoVista> lbeAsignacionDescuentoVista = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = sup;

			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = pe;

			SqlParameter par3 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = med;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = fei;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = fef;

			SqlParameter par6 = cmd.Parameters.Add("@EmpresaId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = EmpresaId;

			SqlParameter par7 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = EspecialidadId;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeAsignacionDescuentoVistaLista = new beAsignacionDescuentoVistaLista();
				lbeAsignacionDescuentoVista = new List<beAsignacionDescuentoVista>();
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posMedicoContratoId = drd.GetOrdinal("MedicoContratoId");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posIndicadorVencimiento = drd.GetOrdinal("IndicadorVencimiento");
				int posPersonaId = drd.GetOrdinal("PersonaId");
				int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beAsignacionDescuentoVista obeAsignacionDescuentoVista;
				while (drd.Read())
				{
					obeAsignacionDescuentoVista = new beAsignacionDescuentoVista();
					obeAsignacionDescuentoVista.SucursalId = drd.GetString(posSucursalId);
					obeAsignacionDescuentoVista.MedicoContratoId = drd.GetInt32(posMedicoContratoId);
					obeAsignacionDescuentoVista.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeAsignacionDescuentoVista.FechaFin = drd.GetDateTime(posFechaFin);
					obeAsignacionDescuentoVista.IndicadorVencimiento = drd.GetString(posIndicadorVencimiento);
					obeAsignacionDescuentoVista.PersonaId = drd.GetInt32(posPersonaId);
					obeAsignacionDescuentoVista.NombreCompleto = drd.GetString(posNombreCompleto).Trim();
					obeAsignacionDescuentoVista.Especialidad = drd.GetString(posEspecialidad).Trim();
					obeAsignacionDescuentoVista.Empresa = drd.GetString(posEmpresa).Trim();
					obeAsignacionDescuentoVista.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
					lbeAsignacionDescuentoVista.Add(obeAsignacionDescuentoVista);
				}
				obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento = lbeAsignacionDescuentoVista;

				drd.Close();
			}
			return (obeAsignacionDescuentoVistaLista);
		}

		public beMedicoContratoListar MedicoContratoListar(SqlConnection con, int id)
		{
			beMedicoContratoListar obeMedicoContratoListar = null;
			List<beCampoCadenaCorto> lbeAdjuntos = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoListar = new beMedicoContratoListar();
				lbeAdjuntos = new List<beCampoCadenaCorto>();
				int posNombreArchivo = drd.GetOrdinal("NombreArchivo");
				int posNombreRepositorio = drd.GetOrdinal("NombreRepositorio");
				beCampoCadenaCorto obeAdjunto;
				while (drd.Read())
				{
					obeAdjunto = new beCampoCadenaCorto();
					obeAdjunto.Campo1 = drd.GetString(posNombreArchivo).Trim();
					obeAdjunto.Campo2 = drd.GetString(posNombreRepositorio).Trim();
					lbeAdjuntos.Add(obeAdjunto);
				}
				obeMedicoContratoListar.ListaAdjuntos = lbeAdjuntos;
				List<beCampoEnteroSolo> lbeConfiguracionPago = new List<beCampoEnteroSolo>();
				if (drd.NextResult())
				{
					beCampoEnteroSolo obeConfiguracionPago;
					int posConfiguracionPagoId = drd.GetOrdinal("ConfiguracionPagoId");
					while (drd.Read())
					{
						obeConfiguracionPago = new beCampoEnteroSolo();
						obeConfiguracionPago.Campo1 = drd.GetInt32(posConfiguracionPagoId);
						lbeConfiguracionPago.Add(obeConfiguracionPago);
					}
					obeMedicoContratoListar.ListaConfiguracionPago = lbeConfiguracionPago;
				}
				List<beMedicoContratoProduccionVista> lbeProduccionFijoConfiguracion = new List<beMedicoContratoProduccionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoProduccionVista obeProduccionFijoConfiguracion;
					int posMedicoContratoDetalleId1 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia1 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro1 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio1 = drd.GetOrdinal("FechaInicio");
					int posFechaFin1 = drd.GetOrdinal("FechaFin");
					int posCondicion1 = drd.GetOrdinal("Condicion");
					int posTipoValor1 = drd.GetOrdinal("TipoValor");
					int posValor11 = drd.GetOrdinal("Valor1");
					int posAlcancePrestacion1 = drd.GetOrdinal("AlcancePrestacion");
					int posEstadoRegistro1 = drd.GetOrdinal("EstadoRegistro");
					int posTipoAplicacionId = drd.GetOrdinal("TipoAplicacionId");

					while (drd.Read())
					{
						obeProduccionFijoConfiguracion = new beMedicoContratoProduccionVista();
						obeProduccionFijoConfiguracion.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId1);
						obeProduccionFijoConfiguracion.Secuencia = drd.GetInt32(posSecuencia1);
						obeProduccionFijoConfiguracion.TipoRegistro = drd.GetString(posTipoRegistro1).Trim();
						obeProduccionFijoConfiguracion.FechaInicio = drd.GetDateTime(posFechaInicio1);
						obeProduccionFijoConfiguracion.FechaFin = drd.GetDateTime(posFechaFin1);
						obeProduccionFijoConfiguracion.Condicion = drd.GetString(posCondicion1).Trim();
						obeProduccionFijoConfiguracion.TipoValor = drd.GetString(posTipoValor1).Trim();
						obeProduccionFijoConfiguracion.Valor1 = drd.GetDecimal(posValor11);
						obeProduccionFijoConfiguracion.AlcancePrestacion = drd.GetString(posAlcancePrestacion1);
						obeProduccionFijoConfiguracion.EstadoRegistro = drd.GetString(posEstadoRegistro1).Trim();
						obeProduccionFijoConfiguracion.AplicacionId = drd.GetInt32(posTipoAplicacionId).ToString();

						lbeProduccionFijoConfiguracion.Add(obeProduccionFijoConfiguracion);
					}
					obeMedicoContratoListar.ListaProduccionConfiguracion = lbeProduccionFijoConfiguracion;
				}
				List<beMedicoContratoProduccionVista> lbeProduccionFijoBonificacion = new List<beMedicoContratoProduccionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoProduccionVista obeProduccionFijoBonificacion;
					int posMedicoContratoDetalleId2 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia2 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro2 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio2 = drd.GetOrdinal("FechaInicio");
					int posFechaFin2 = drd.GetOrdinal("FechaFin");
					int posCondicion2 = drd.GetOrdinal("Condicion");
					int posTipoValor2 = drd.GetOrdinal("TipoValor");
					int posValor12 = drd.GetOrdinal("Valor1");
					int posAlcancePrestacion2 = drd.GetOrdinal("AlcancePrestacion");
					int posEstadoRegistro2 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeProduccionFijoBonificacion = new beMedicoContratoProduccionVista();
						obeProduccionFijoBonificacion.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId2);
						obeProduccionFijoBonificacion.Secuencia = drd.GetInt32(posSecuencia2);
						obeProduccionFijoBonificacion.TipoRegistro = drd.GetString(posTipoRegistro2).Trim();
						obeProduccionFijoBonificacion.FechaInicio = drd.GetDateTime(posFechaInicio2);
						obeProduccionFijoBonificacion.FechaFin = drd.GetDateTime(posFechaFin2);
						obeProduccionFijoBonificacion.Condicion = drd.GetString(posCondicion2).Trim();
						obeProduccionFijoBonificacion.TipoValor = drd.GetString(posTipoValor2).Trim();
						obeProduccionFijoBonificacion.Valor1 = drd.GetDecimal(posValor12);
						obeProduccionFijoBonificacion.AlcancePrestacion = drd.GetString(posAlcancePrestacion2);
						obeProduccionFijoBonificacion.EstadoRegistro = drd.GetString(posEstadoRegistro2).Trim();
						lbeProduccionFijoBonificacion.Add(obeProduccionFijoBonificacion);
					}
					obeMedicoContratoListar.ListaProduccionBonificacion = lbeProduccionFijoBonificacion;
				}
				List<beMedicoContratoEscalonadoVista> lbeMedicoContratoEscalonadoVista = new List<beMedicoContratoEscalonadoVista>();
				if (drd.NextResult())
				{
					beMedicoContratoEscalonadoVista obeMedicoContratoEscalonadoVista;
					int posMedicoContratoDetalleId3 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia3 = drd.GetOrdinal("Secuencia");
					int posFechaInicio3 = drd.GetOrdinal("FechaInicio");
					int posFechaFin3 = drd.GetOrdinal("FechaFin");
					int posServicio = drd.GetOrdinal("Servicio");
					int posTipoRango = drd.GetOrdinal("TipoRango");
					int posRango = drd.GetOrdinal("Rango");
					int posTipoValor3 = drd.GetOrdinal("TipoValor");
					int posValor13 = drd.GetOrdinal("Valor1");
					int posEstadoRegistro3 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoEscalonadoVista = new beMedicoContratoEscalonadoVista();
						obeMedicoContratoEscalonadoVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId3);
						obeMedicoContratoEscalonadoVista.Secuencia = drd.GetInt32(posSecuencia3);
						obeMedicoContratoEscalonadoVista.FechaInicio = drd.GetDateTime(posFechaInicio3);
						obeMedicoContratoEscalonadoVista.FechaFin = drd.GetDateTime(posFechaFin3);
						obeMedicoContratoEscalonadoVista.Servicio = drd.GetString(posServicio).Trim();
						obeMedicoContratoEscalonadoVista.TipoRango = drd.GetString(posTipoRango).Trim();
						obeMedicoContratoEscalonadoVista.Rango = drd.GetString(posRango).Trim();
						obeMedicoContratoEscalonadoVista.TipoValor = drd.GetString(posTipoValor3).Trim();
						obeMedicoContratoEscalonadoVista.Valor1 = drd.GetDecimal(posValor13);
						obeMedicoContratoEscalonadoVista.EstadoRegistro = drd.GetString(posEstadoRegistro3).Trim();
						lbeMedicoContratoEscalonadoVista.Add(obeMedicoContratoEscalonadoVista);
					}
					obeMedicoContratoListar.ListaProduccionEscalonada = lbeMedicoContratoEscalonadoVista;
				}
				List<beMedicoContratoMontoVista> lbeMedicoContratoMontoVista = new List<beMedicoContratoMontoVista>();
				if (drd.NextResult())
				{
					beMedicoContratoMontoVista obeMedicoContratoMontoVista;
					int posMedicoContratoDetalleId4 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia4 = drd.GetOrdinal("Secuencia");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					int posValor = drd.GetOrdinal("Valor");
					int posPeriodo = drd.GetOrdinal("Periodo");
					int posFechaInicio4 = drd.GetOrdinal("FechaInicio");
					int posFechaFin4 = drd.GetOrdinal("FechaFin");
					int posEstadoRegistro4 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoMontoVista = new beMedicoContratoMontoVista();
						obeMedicoContratoMontoVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId4);
						obeMedicoContratoMontoVista.Secuencia = drd.GetInt32(posSecuencia4);
						obeMedicoContratoMontoVista.Descripcion = drd.GetString(posDescripcion);
						obeMedicoContratoMontoVista.Valor = drd.GetDecimal(posValor);
						obeMedicoContratoMontoVista.Periodo = drd.GetString(posPeriodo);
						obeMedicoContratoMontoVista.FechaInicio = drd.GetDateTime(posFechaInicio4);
						obeMedicoContratoMontoVista.FechaFin = drd.GetDateTime(posFechaFin4);
						obeMedicoContratoMontoVista.EstadoRegistro = drd.GetString(posEstadoRegistro4).Trim();
						lbeMedicoContratoMontoVista.Add(obeMedicoContratoMontoVista);
					}
					obeMedicoContratoListar.ListaMonto = lbeMedicoContratoMontoVista;
				}
				List<beMedicoContratoHorarioConfiguracionVista> lbeMedicoContratoHorarioConfiguracionVista = new List<beMedicoContratoHorarioConfiguracionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoHorarioConfiguracionVista obeMedicoContratoHorarioConfiguracionVista;
					int posMedicoContratoDetalleId5 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia5 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro3 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio5 = drd.GetOrdinal("FechaInicio");
					int posFechaFin5 = drd.GetOrdinal("FechaFin");
					int posCondicion = drd.GetOrdinal("Condicion");
					int posTipoDia = drd.GetOrdinal("TipoDia");
					int posDia = drd.GetOrdinal("Dia");
					int posTurnoId = drd.GetOrdinal("TurnoId");
					int posValor2 = drd.GetOrdinal("Valor");
					int posEstadoRegistro4 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoHorarioConfiguracionVista = new beMedicoContratoHorarioConfiguracionVista();
						obeMedicoContratoHorarioConfiguracionVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId5);
						obeMedicoContratoHorarioConfiguracionVista.Secuencia = drd.GetInt32(posSecuencia5);
						obeMedicoContratoHorarioConfiguracionVista.TipoRegistro = drd.GetString(posTipoRegistro3);
						obeMedicoContratoHorarioConfiguracionVista.FechaInicio = drd.GetDateTime(posFechaInicio5);
						obeMedicoContratoHorarioConfiguracionVista.FechaFin = drd.GetDateTime(posFechaFin5);
						obeMedicoContratoHorarioConfiguracionVista.Condicion = drd.GetString(posCondicion).Trim();
						obeMedicoContratoHorarioConfiguracionVista.TipoDia = drd.GetString(posTipoDia).Trim();
						obeMedicoContratoHorarioConfiguracionVista.Dia = drd.GetString(posDia).Trim();
						obeMedicoContratoHorarioConfiguracionVista.TurnoId = drd.GetInt32(posTurnoId);
						obeMedicoContratoHorarioConfiguracionVista.Valor = drd.GetDecimal(posValor2);
						obeMedicoContratoHorarioConfiguracionVista.EstadoRegistro = drd.GetString(posEstadoRegistro4).Trim();
						lbeMedicoContratoHorarioConfiguracionVista.Add(obeMedicoContratoHorarioConfiguracionVista);
					}
					obeMedicoContratoListar.ListaHorarioCalculo = lbeMedicoContratoHorarioConfiguracionVista;
				}

				List<beMedicoContratoHorarioBonificacionVista> lbeMedicoContratoHorarioBonificacionVista = new List<beMedicoContratoHorarioBonificacionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoHorarioBonificacionVista obeMedicoContratoHorarioBonificacionVista;
					int posMedicoContratoDetalleId6 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia6 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro4 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio6 = drd.GetOrdinal("FechaInicio");
					int posFechaFin6 = drd.GetOrdinal("FechaFin");
					int posCondicion2 = drd.GetOrdinal("Condicion");
					int posTipoDia2 = drd.GetOrdinal("TipoDia");
					int posTipoValor4 = drd.GetOrdinal("TipoValor");
					int posValor4 = drd.GetOrdinal("Valor");
					int posEstadoRegistro6 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoHorarioBonificacionVista = new beMedicoContratoHorarioBonificacionVista();
						obeMedicoContratoHorarioBonificacionVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId6);
						obeMedicoContratoHorarioBonificacionVista.Secuencia = drd.GetInt32(posSecuencia6);
						obeMedicoContratoHorarioBonificacionVista.TipoRegistro = drd.GetString(posTipoRegistro4);
						obeMedicoContratoHorarioBonificacionVista.FechaInicio = drd.GetDateTime(posFechaInicio6);
						obeMedicoContratoHorarioBonificacionVista.FechaFin = drd.GetDateTime(posFechaFin6);
						obeMedicoContratoHorarioBonificacionVista.Condicion = drd.GetString(posCondicion2).Trim();
						obeMedicoContratoHorarioBonificacionVista.TipoDia = drd.GetString(posTipoDia2).Trim();
						obeMedicoContratoHorarioBonificacionVista.TipoValor = drd.GetString(posTipoValor4).Trim();
						obeMedicoContratoHorarioBonificacionVista.Valor = drd.GetDecimal(posValor4);
						obeMedicoContratoHorarioBonificacionVista.EstadoRegistro = drd.GetString(posEstadoRegistro6).Trim();
						lbeMedicoContratoHorarioBonificacionVista.Add(obeMedicoContratoHorarioBonificacionVista);
					}
					obeMedicoContratoListar.ListaHorarioBonificacion = lbeMedicoContratoHorarioBonificacionVista;
				}


				List<beMedicoContratoTurnoConfiguracionVista> lbeMedicoContratoTurnoConfiguracionVista = new List<beMedicoContratoTurnoConfiguracionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoTurnoConfiguracionVista obeMedicoContratoTurnoConfiguracionVista;
					int posMedicoContratoDetalleId7 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia7 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro5 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio7 = drd.GetOrdinal("FechaInicio");
					int posFechaFin7 = drd.GetOrdinal("FechaFin");
					int posCondicion3 = drd.GetOrdinal("Condicion");
					int posTipoValor5 = drd.GetOrdinal("TipoValor");
					int posCantidadHora = drd.GetOrdinal("CantidadHora");
					int posValor5 = drd.GetOrdinal("Valor");
					int posEstadoRegistro7 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoTurnoConfiguracionVista = new beMedicoContratoTurnoConfiguracionVista();
						obeMedicoContratoTurnoConfiguracionVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId7);
						obeMedicoContratoTurnoConfiguracionVista.Secuencia = drd.GetInt32(posSecuencia7);
						obeMedicoContratoTurnoConfiguracionVista.TipoRegistro = drd.GetString(posTipoRegistro5);
						obeMedicoContratoTurnoConfiguracionVista.FechaInicio = drd.GetDateTime(posFechaInicio7);
						obeMedicoContratoTurnoConfiguracionVista.FechaFin = drd.GetDateTime(posFechaFin7);
						obeMedicoContratoTurnoConfiguracionVista.Condicion = drd.GetString(posCondicion3).Trim();
						obeMedicoContratoTurnoConfiguracionVista.TipoValor = drd.GetString(posTipoValor5).Trim();
						obeMedicoContratoTurnoConfiguracionVista.CantidadHora = drd.GetInt32(posCantidadHora);
						obeMedicoContratoTurnoConfiguracionVista.Valor = drd.GetDecimal(posValor5);
						obeMedicoContratoTurnoConfiguracionVista.EstadoRegistro = drd.GetString(posEstadoRegistro7).Trim();
						lbeMedicoContratoTurnoConfiguracionVista.Add(obeMedicoContratoTurnoConfiguracionVista);
					}
					obeMedicoContratoListar.ListaTurnoCalculo = lbeMedicoContratoTurnoConfiguracionVista;
				}

				List<beMedicoContratoTurnoBonificacionVista> lbeMedicoContratoTurnoBonificacionVista = new List<beMedicoContratoTurnoBonificacionVista>();
				if (drd.NextResult())
				{
					beMedicoContratoTurnoBonificacionVista obeMedicoContratoTurnoBonificacionVista;
					int posMedicoContratoDetalleId8 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia8 = drd.GetOrdinal("Secuencia");
					int posTipoRegistro6 = drd.GetOrdinal("TipoRegistro");
					int posFechaInicio8 = drd.GetOrdinal("FechaInicio");
					int posFechaFin8 = drd.GetOrdinal("FechaFin");
					int posCondicion4 = drd.GetOrdinal("Condicion");
					int posTipoValor6 = drd.GetOrdinal("TipoValor");
					int posValor6 = drd.GetOrdinal("Valor");
					int posEstadoRegistro7 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoTurnoBonificacionVista = new beMedicoContratoTurnoBonificacionVista();
						obeMedicoContratoTurnoBonificacionVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId8);
						obeMedicoContratoTurnoBonificacionVista.Secuencia = drd.GetInt32(posSecuencia8);
						obeMedicoContratoTurnoBonificacionVista.TipoRegistro = drd.GetString(posTipoRegistro6);
						obeMedicoContratoTurnoBonificacionVista.FechaInicio = drd.GetDateTime(posFechaInicio8);
						obeMedicoContratoTurnoBonificacionVista.FechaFin = drd.GetDateTime(posFechaFin8);
						obeMedicoContratoTurnoBonificacionVista.Condicion = drd.GetString(posCondicion4).Trim();
						obeMedicoContratoTurnoBonificacionVista.TipoValor = drd.GetString(posTipoValor6).Trim();
						obeMedicoContratoTurnoBonificacionVista.Valor = drd.GetDecimal(posValor6);
						obeMedicoContratoTurnoBonificacionVista.EstadoRegistro = drd.GetString(posEstadoRegistro7).Trim();
						lbeMedicoContratoTurnoBonificacionVista.Add(obeMedicoContratoTurnoBonificacionVista);
					}
					obeMedicoContratoListar.ListaTurnoBonificacion = lbeMedicoContratoTurnoBonificacionVista;
				}
				List<beMedicoContratoCompartidoVista> lbeMedicoContratoCompartidoVista = new List<beMedicoContratoCompartidoVista>();
				if (drd.NextResult())
				{
					beMedicoContratoCompartidoVista obeMedicoContratoCompartidoVista;
					int posMedicoContratoDetalleId9 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia9 = drd.GetOrdinal("Secuencia");
					int posFechaInicio9 = drd.GetOrdinal("FechaInicio");
					int posFechaFin9 = drd.GetOrdinal("FechaFin");
					int posCondicion5 = drd.GetOrdinal("Condicion");
					int posTipoValor7 = drd.GetOrdinal("TipoValor");
					int posValor7 = drd.GetOrdinal("Valor");
					int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
					int posEstadoRegistro8 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoCompartidoVista = new beMedicoContratoCompartidoVista();
						obeMedicoContratoCompartidoVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId9);
						obeMedicoContratoCompartidoVista.Secuencia = drd.GetInt32(posSecuencia9);
						obeMedicoContratoCompartidoVista.FechaInicio = drd.GetDateTime(posFechaInicio9);
						obeMedicoContratoCompartidoVista.FechaFin = drd.GetDateTime(posFechaFin9);
						obeMedicoContratoCompartidoVista.Condicion = drd.GetString(posCondicion5).Trim();
						obeMedicoContratoCompartidoVista.TipoValor = drd.GetString(posTipoValor7).Trim();
						obeMedicoContratoCompartidoVista.Valor = drd.GetDecimal(posValor7);
						obeMedicoContratoCompartidoVista.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
						obeMedicoContratoCompartidoVista.EstadoRegistro = drd.GetString(posEstadoRegistro8).Trim();
						lbeMedicoContratoCompartidoVista.Add(obeMedicoContratoCompartidoVista);
					}
					obeMedicoContratoListar.ListaCompartido = lbeMedicoContratoCompartidoVista;
				}
				List<beMedicoContratoVacunaVista> lbeMedicoContratoVacunaVista = new List<beMedicoContratoVacunaVista>();
				if (drd.NextResult())
				{
					beMedicoContratoVacunaVista obeMedicoContratoVacunaVista;
					int posMedicoContratoDetalleId10 = drd.GetOrdinal("MedicoContratoDetalleId");
					int posSecuencia10 = drd.GetOrdinal("Secuencia");
					int posFechaInicio10 = drd.GetOrdinal("FechaInicio");
					int posFechaFin10 = drd.GetOrdinal("FechaFin");
					int posCondicion6 = drd.GetOrdinal("Condicion");
					int posTipoValor8 = drd.GetOrdinal("TipoValor");
					int posValor8 = drd.GetOrdinal("Valor");
					int posAlcanceArticulo = drd.GetOrdinal("AlcanceArticulo");
					int posEstadoRegistro9 = drd.GetOrdinal("EstadoRegistro");
					while (drd.Read())
					{
						obeMedicoContratoVacunaVista = new beMedicoContratoVacunaVista();
						obeMedicoContratoVacunaVista.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId10);
						obeMedicoContratoVacunaVista.Secuencia = drd.GetInt32(posSecuencia10);
						obeMedicoContratoVacunaVista.FechaInicio = drd.GetDateTime(posFechaInicio10);
						obeMedicoContratoVacunaVista.FechaFin = drd.GetDateTime(posFechaFin10);
						obeMedicoContratoVacunaVista.Condicion = drd.GetString(posCondicion6).Trim();
						obeMedicoContratoVacunaVista.TipoValor = drd.GetString(posTipoValor8).Trim();
						obeMedicoContratoVacunaVista.Valor = drd.GetDecimal(posValor8);
						obeMedicoContratoVacunaVista.AlcanceArticulo = drd.GetString(posAlcanceArticulo);
						obeMedicoContratoVacunaVista.EstadoRegistro = drd.GetString(posEstadoRegistro9).Trim();
						lbeMedicoContratoVacunaVista.Add(obeMedicoContratoVacunaVista);
					}
					obeMedicoContratoListar.ListaVacuna = lbeMedicoContratoVacunaVista;
				}
				List<beCampoFecha> lbeFeriado = new List<beCampoFecha>();
				if (drd.NextResult())
				{
					beCampoFecha obeFeriado;
					int posFeriadoId = drd.GetOrdinal("FeriadoId");
					int posFecha = drd.GetOrdinal("Fecha");
					while (drd.Read())
					{
						obeFeriado = new beCampoFecha();
						obeFeriado.Campo1 = drd.GetInt32(posFeriadoId);
						obeFeriado.Campo2 = drd.GetDateTime(posFecha);
						lbeFeriado.Add(obeFeriado);
					}
					obeMedicoContratoListar.ListaFeriado = lbeFeriado;
				}
				List<beCampoCadenaSolo> lbeObservacion = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo obeObservacion;
					int posObservacion2 = drd.GetOrdinal("Observacion");
					while (drd.Read())
					{
						obeObservacion = new beCampoCadenaSolo();
						obeObservacion.Campo1 = drd.GetString(posObservacion2);
						lbeObservacion.Add(obeObservacion);
					}
					obeMedicoContratoListar.ListaObservacion = lbeObservacion;
				}
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeCorreoProveedor=null;
					int posCorreoElectronico11 = drd.GetOrdinal("CorreoElectronico");
					int posTipoMedico11 = drd.GetOrdinal("TipoMedico");
					while (drd.Read())
					{
						obeCorreoProveedor = new beCampoCadenaCorto();
						obeCorreoProveedor.Campo1 = drd.GetString(posCorreoElectronico11).Trim();
						obeCorreoProveedor.Campo2 = drd.GetString(posTipoMedico11);
					}
					obeMedicoContratoListar.ListaCorreoProveedor = obeCorreoProveedor;
				}
				drd.Close();
			}
			return (obeMedicoContratoListar);
		}

		public string adicionarMedicoContrato(SqlConnection con, string su, int id, DateTime fecini, DateTime fecfin, string obs, int user,bool indicador)
		{
			//int idMedicoContrato = -1;
			string rpta = "";
            SqlCommand cmd = new SqlCommand("uspMedicoContratoAdicionarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;

			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = fecini;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = fecfin;

			SqlParameter par5 = cmd.Parameters.Add("@Observacion", SqlDbType.VarChar, 4000);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obs;

			SqlParameter par6 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = user;

            SqlParameter par7 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par7.Direction = ParameterDirection.Input;
            par7.Value = indicador;

			SqlParameter par8 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par8.Direction = ParameterDirection.ReturnValue;

			//int n = cmd.ExecuteNonQuery();
			//if (n > 0) idMedicoContrato = (int)par7.Value;
			//return (idMedicoContrato);
			object data = cmd.ExecuteScalar();
			if (data != null) rpta = data.ToString();
			return rpta;
		}

		public string actualizarMedicoContrato(SqlConnection con, int id, DateTime fecini, DateTime fecfin, string obs, int user, string opciones,bool indicador)
		{
			string rpta = "";
            SqlCommand cmd = new SqlCommand("uspMedicoContratoActualizarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par2.Direction = ParameterDirection.Input;
			par2.Value = fecini;

			SqlParameter par3 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = fecfin;

			SqlParameter par4 = cmd.Parameters.Add("@Observacion", SqlDbType.VarChar, 4000);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obs;

			SqlParameter par5 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = user;

			SqlParameter par6 = cmd.Parameters.Add("@ListaContrato", SqlDbType.VarChar,20);
			par6.Direction = ParameterDirection.Input;
			par6.Value = opciones;

            SqlParameter par7 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par7.Direction = ParameterDirection.Input;
            par7.Value = indicador;

			//int n = cmd.ExecuteNonQuery();
			//exito = (n > 0);
			//return (exito);
			object data = cmd.ExecuteScalar();
			if (data != null) rpta = data.ToString();
			return rpta;
		}

		public string actualizarEstadoMedicoContrato(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId)
		{
			//bool exito = false;
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoActualizarEstadoV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Id;

			SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			//int n = cmd.ExecuteNonQuery();
			//exito = (n > 0);
			//return (exito);
			object data = cmd.ExecuteScalar();
			if (data != null) rpta = data.ToString();
			return rpta;
		}

		public int adicionarProduccionFija(SqlConnection con, beProduccionFija obeProduccionFija,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeProduccionFija.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeProduccionFija.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeProduccionFija.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeProduccionFija.TipoRegistro.Trim();

			SqlParameter par5 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeProduccionFija.FechaInicio;

			SqlParameter par6 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeProduccionFija.FechaFin;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeProduccionFija.TipoAtencionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeProduccionFija.TipoAdmisionId;

			SqlParameter par9 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeProduccionFija.TipoPacienteId;

			SqlParameter par10 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeProduccionFija.AseguradoraId;

			SqlParameter par11 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeProduccionFija.EspecialidadId;

			SqlParameter par12 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeProduccionFija.TurnoId;

			SqlParameter par13 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeProduccionFija.TipoValor.Trim();

			SqlParameter par14 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeProduccionFija.Valor1;

			SqlParameter par15 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par15.Direction = ParameterDirection.Input;
			par15.Value = (obeProduccionFija.Valor2 == 0) ? (object)DBNull.Value : obeProduccionFija.Valor2;

			SqlParameter par16 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeProduccionFija.AlcancePrestacion.Trim();

			SqlParameter par17 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par17.Direction = ParameterDirection.Input;
			par17.Value = (obeProduccionFija.TiempoPagoId == 0) ? (object)DBNull.Value : obeProduccionFija.TiempoPagoId;

			SqlParameter par18 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeProduccionFija.Operador == "") ? (object)DBNull.Value : obeProduccionFija.Operador.Trim();
			
			SqlParameter par19 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = (obeProduccionFija.TipoDia == "") ? (object)DBNull.Value : obeProduccionFija.TipoDia.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par20.Direction = ParameterDirection.Input;
			par20.Value = (obeProduccionFija.TipoFeriado == "") ? (object)DBNull.Value : obeProduccionFija.TipoFeriado.Trim();

			SqlParameter par21 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par21.Direction = ParameterDirection.Input;
			par21.Value = (obeProduccionFija.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeProduccionFija.FechaFeriado;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeProduccionFija.IndicadorLunes;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeProduccionFija.IndicadorMartes;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeProduccionFija.IndicadorMiercoles;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeProduccionFija.IndicadorJueves;

			SqlParameter par26 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeProduccionFija.IndicadorViernes;

			SqlParameter par27 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par27.Direction = ParameterDirection.Input;
			par27.Value = obeProduccionFija.IndicadorSabado;

			SqlParameter par28 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par28.Direction = ParameterDirection.Input;
			par28.Value = obeProduccionFija.IndicadorDomingo;

			SqlParameter par29 = cmd.Parameters.Add("@ContratoId", SqlDbType.Int);
			par29.Direction = ParameterDirection.Input;
			par29.Value = obeProduccionFija.ContratoId;

			SqlParameter par30 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par30.Direction = ParameterDirection.Input;
			par30.Value = obeProduccionFija.ServicioId;

			SqlParameter par31 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par31.Direction = ParameterDirection.Input;
			par31.Value = obeProduccionFija.ListaPrestaciones.Trim();

			SqlParameter par32 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par32.Direction = ParameterDirection.Input;
			par32.Value = obeProduccionFija.TipoBonificacion;

			SqlParameter par33 = cmd.Parameters.Add("@ModalidadFacturacionId", SqlDbType.Int);
			par33.Direction = ParameterDirection.Input;
			par33.Value = obeProduccionFija.Modalidad;

            SqlParameter par34 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par34.Direction = ParameterDirection.Input;
            par34.Value = indicador;

			SqlParameter par36 = cmd.Parameters.Add("@TipoAplicacionId", SqlDbType.Int);
			par36.Direction = ParameterDirection.Input;
			par36.Value = obeProduccionFija.AplicacionId;


			SqlParameter par35 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par35.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par35.Value;
			return (idMedicoContrato);
		}

		public int adicionarProduccionEscalonada(SqlConnection con, beProduccionEscalonada obeProduccionEscalonada,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoEscalonadoAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeProduccionEscalonada.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeProduccionEscalonada.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeProduccionEscalonada.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeProduccionEscalonada.FechaInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeProduccionEscalonada.FechaFin;

			SqlParameter par6 = cmd.Parameters.Add("@TipoRango", SqlDbType.Char, 1);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeProduccionEscalonada.TipoRango.Trim();

			SqlParameter par7 = cmd.Parameters.Add("@Rango1", SqlDbType.Decimal);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeProduccionEscalonada.Rango1;

			SqlParameter par8 = cmd.Parameters.Add("@Rango2", SqlDbType.Decimal);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeProduccionEscalonada.Rango2;

			SqlParameter par9 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeProduccionEscalonada.ServicioId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeProduccionEscalonada.TipoAtencionId;

			SqlParameter par11 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeProduccionEscalonada.TipoAdmisionId;

			SqlParameter par12 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeProduccionEscalonada.TipoPacienteId;

			SqlParameter par13 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeProduccionEscalonada.AseguradoraId;

			SqlParameter par14 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeProduccionEscalonada.EspecialidadId;

			SqlParameter par15 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeProduccionEscalonada.TipoValor.Trim();

			SqlParameter par16 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeProduccionEscalonada.Valor1;

			SqlParameter par17 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeProduccionEscalonada.Valor2;

			SqlParameter par18 = cmd.Parameters.Add("@Aplicacion", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeProduccionEscalonada.Aplicacion.Trim();

			SqlParameter par19 = cmd.Parameters.Add("@TipoCalculo", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = obeProduccionEscalonada.TipoCalculo.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par20.Direction = ParameterDirection.Input;
			par20.Value = obeProduccionEscalonada.AlcancePrestacion.Trim();

			SqlParameter par21 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par21.Direction = ParameterDirection.Input;
			par21.Value = (obeProduccionEscalonada.TiempoPagoId == 0) ? (object)DBNull.Value : obeProduccionEscalonada.TiempoPagoId;


			SqlParameter par22 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeProduccionEscalonada.ListaPrestaciones.Trim();

            SqlParameter par23 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par23.Direction = ParameterDirection.Input;
            par23.Value = indicador;

			SqlParameter par24 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par24.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par24.Value;
			return (idMedicoContrato);
		}

		public int adicionarMonto(SqlConnection con, beMonto obeMonto,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoMontoAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMonto.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMonto.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMonto.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMonto.Descripcion;

			SqlParameter par5 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMonto.FechaInicio;

			SqlParameter par6 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMonto.FechaFin;

			SqlParameter par7 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMonto.Valor1;

			SqlParameter par8 = cmd.Parameters.Add("@Periodo", SqlDbType.Char, 1);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMonto.Periodo.Trim();

			SqlParameter par9 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMonto.AlcancePrestacion.Trim();

			SqlParameter par10 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = (obeMonto.TiempoPagoId == 0) ? (object)DBNull.Value : obeMonto.TiempoPagoId;

			SqlParameter par11 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMonto.TurnoId;

			SqlParameter par12 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par12.Direction = ParameterDirection.Input;
			par12.Value = DateTime.Parse(obeMonto.HoraInicio);

			SqlParameter par13 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par13.Direction = ParameterDirection.Input;
			par13.Value = DateTime.Parse(obeMonto.HoraFin);

			SqlParameter par14 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMonto.ListaPrestacion.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.VarChar, -1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMonto.ConceptoMontoFijoId;

			SqlParameter par16 = cmd.Parameters.Add("@TipoRegistroMF", SqlDbType.Char,1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeMonto.TipoRegistro;

			SqlParameter par17 = cmd.Parameters.Add("@AnioProduccionMF", SqlDbType.Int);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeMonto.AnioProduccionMF;

			SqlParameter par18 = cmd.Parameters.Add("@MesProduccionMF", SqlDbType.Int);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeMonto.MesProduccionMF;

            SqlParameter par19 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par19.Direction = ParameterDirection.Input;
            par19.Value = indicador;

			SqlParameter par20 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par20.Direction = ParameterDirection.Output;

			int n = cmd.ExecuteNonQuery();
			idMedicoContrato = (int)par20.Value;
			return (idMedicoContrato);
		}

		public int adicionarMedicoContratoHorario(SqlConnection con, beMedicoContratoHorario obeMedicoContratoHorario,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoHorarioAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoHorario.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMedicoContratoHorario.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoContratoHorario.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoContratoHorario.TipoRegistro.Trim();

			SqlParameter par5 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoContratoHorario.FechaInicio;

			SqlParameter par6 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoContratoHorario.FechaFin;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoContratoHorario.TipoAtencionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoContratoHorario.TipoAdmisionId;

			SqlParameter par9 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoContratoHorario.TipoPacienteId;

			SqlParameter par10 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeMedicoContratoHorario.AseguradoraId;

			SqlParameter par11 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoContratoHorario.EspecialidadId;
			
			SqlParameter par12 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par12.Direction = ParameterDirection.Input;
			par12.Value = (obeMedicoContratoHorario.TipoDia == "") ? (object)DBNull.Value : obeMedicoContratoHorario.TipoDia.Trim();

			SqlParameter par13 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoContratoHorario.TurnoId;

			SqlParameter par14 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMedicoContratoHorario.TipoValor.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMedicoContratoHorario.Valor1;

			SqlParameter par16 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeMedicoContratoHorario.AlcancePrestacion.Trim();

			SqlParameter par17 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par17.Direction = ParameterDirection.Input;
			par17.Value = (obeMedicoContratoHorario.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoContratoHorario.TiempoPagoId;

			SqlParameter par18 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeMedicoContratoHorario.Operador == "") ? (object)DBNull.Value : obeMedicoContratoHorario.Operador.Trim();

			SqlParameter par19 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = (obeMedicoContratoHorario.TipoFeriado == "") ? (object)DBNull.Value : obeMedicoContratoHorario.TipoFeriado.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par20.Direction = ParameterDirection.Input;
			par20.Value = (obeMedicoContratoHorario.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeMedicoContratoHorario.FechaFeriado;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeMedicoContratoHorario.IndicadorLunes;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeMedicoContratoHorario.IndicadorMartes;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeMedicoContratoHorario.IndicadorMiercoles;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeMedicoContratoHorario.IndicadorJueves;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeMedicoContratoHorario.IndicadorViernes;

			SqlParameter par26 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeMedicoContratoHorario.IndicadorSabado;

			SqlParameter par27 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par27.Direction = ParameterDirection.Input;
			par27.Value = obeMedicoContratoHorario.IndicadorDomingo;

			SqlParameter par28 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par28.Direction = ParameterDirection.Input;
			par28.Value = obeMedicoContratoHorario.ListaPrestaciones.Trim();

			SqlParameter par29 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par29.Direction = ParameterDirection.Input;
			par29.Value = DateTime.Parse(obeMedicoContratoHorario.HoraInicio);

			SqlParameter par30 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par30.Direction = ParameterDirection.Input;
			par30.Value = DateTime.Parse(obeMedicoContratoHorario.HoraFin);

			SqlParameter par31 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par31.Direction = ParameterDirection.Input;
			par31.Value = obeMedicoContratoHorario.TipoBonificacion;

            SqlParameter par32 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par32.Direction = ParameterDirection.Input;
            par32.Value = indicador;

			SqlParameter par33 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par33.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par33.Value;
			return (idMedicoContrato);
		}

		public int adicionarMedicoContratoTurno(SqlConnection con, beMedicoContratoTurno obeMedicoContratoTurno,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoTurnoAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoTurno.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMedicoContratoTurno.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoContratoTurno.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoContratoTurno.TipoRegistro.Trim();

			SqlParameter par5 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoContratoTurno.FechaInicio;

			SqlParameter par6 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoContratoTurno.FechaFin;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoContratoTurno.TipoAtencionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoContratoTurno.TipoAdmisionId;

			SqlParameter par9 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoContratoTurno.TipoPacienteId;

			SqlParameter par10 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeMedicoContratoTurno.AseguradoraId;

			SqlParameter par11 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoContratoTurno.EspecialidadId;


			SqlParameter par12 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par12.Direction = ParameterDirection.Input;
			par12.Value = (obeMedicoContratoTurno.TipoDia == "") ? (object)DBNull.Value : obeMedicoContratoTurno.TipoDia.Trim();

			SqlParameter par13 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoContratoTurno.TurnoId;

			SqlParameter par14 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMedicoContratoTurno.TipoValor.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@CantidadHora", SqlDbType.Int);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMedicoContratoTurno.CantidadHora;

			SqlParameter par16 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeMedicoContratoTurno.Valor1;

			SqlParameter par17 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeMedicoContratoTurno.AlcancePrestacion.Trim();

			SqlParameter par18 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeMedicoContratoTurno.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoContratoTurno.TiempoPagoId;

			SqlParameter par19 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = (obeMedicoContratoTurno.Operador == "") ? (object)DBNull.Value : obeMedicoContratoTurno.Operador.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par20.Direction = ParameterDirection.Input;
			par20.Value = (obeMedicoContratoTurno.TipoFeriado == "") ? (object)DBNull.Value : obeMedicoContratoTurno.TipoFeriado.Trim();

			SqlParameter par21 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par21.Direction = ParameterDirection.Input;
			par21.Value = (obeMedicoContratoTurno.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeMedicoContratoTurno.FechaFeriado;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeMedicoContratoTurno.IndicadorLunes;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeMedicoContratoTurno.IndicadorMartes;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeMedicoContratoTurno.IndicadorMiercoles;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeMedicoContratoTurno.IndicadorJueves;

			SqlParameter par26 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeMedicoContratoTurno.IndicadorViernes;

			SqlParameter par27 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par27.Direction = ParameterDirection.Input;
			par27.Value = obeMedicoContratoTurno.IndicadorSabado;

			SqlParameter par28 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par28.Direction = ParameterDirection.Input;
			par28.Value = obeMedicoContratoTurno.IndicadorDomingo;

			SqlParameter par29 = cmd.Parameters.Add("@CantidadAtencionMinima", SqlDbType.Decimal);
			par29.Direction = ParameterDirection.Input;
			par29.Value = obeMedicoContratoTurno.CantidadAtencionMinima;

			SqlParameter par30 = cmd.Parameters.Add("@MontoAtencionMinima", SqlDbType.Decimal);
			par30.Direction = ParameterDirection.Input;
			par30.Value = obeMedicoContratoTurno.MontoAtencionMinima;

			SqlParameter par31 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par31.Direction = ParameterDirection.Input;
			par31.Value = obeMedicoContratoTurno.ListaPrestaciones.Trim();

			SqlParameter par32 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par32.Direction = ParameterDirection.Input;
			par32.Value = DateTime.Parse(obeMedicoContratoTurno.HoraInicio);

			SqlParameter par33 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par33.Direction = ParameterDirection.Input;
			par33.Value = DateTime.Parse(obeMedicoContratoTurno.HoraFin);

			SqlParameter par34 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par34.Direction = ParameterDirection.Input;
			par34.Value = obeMedicoContratoTurno.TipoBonificacion;

            SqlParameter par35 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par35.Direction = ParameterDirection.Input;
            par35.Value = indicador;

			SqlParameter par36 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par36.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par36.Value;
			return (idMedicoContrato);
		}

		public int adicionarContratoCompartido(SqlConnection con, beContratoCompartido obeContratoCompartido,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoCompartidoAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeContratoCompartido.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeContratoCompartido.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeContratoCompartido.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeContratoCompartido.FechaInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeContratoCompartido.FechaFin;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeContratoCompartido.TipoAtencionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeContratoCompartido.TipoAdmisionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeContratoCompartido.TipoPacienteId;

			SqlParameter par9 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeContratoCompartido.AseguradoraId;

			SqlParameter par10 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeContratoCompartido.EspecialidadId;

			SqlParameter par11 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeContratoCompartido.TipoValor.Trim();

			SqlParameter par12 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeContratoCompartido.Valor1;

			SqlParameter par13 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeContratoCompartido.Valor2;


			SqlParameter par14 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeContratoCompartido.AlcancePrestacion.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par15.Direction = ParameterDirection.Input;
			par15.Value = (obeContratoCompartido.TiempoPagoId == 0) ? (object)DBNull.Value : obeContratoCompartido.TiempoPagoId;

			SqlParameter par16 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeContratoCompartido.ServicioId;

			SqlParameter par17 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeContratoCompartido.ListaPrestaciones.Trim();

            SqlParameter par18 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par18.Direction = ParameterDirection.Input;
            par18.Value = indicador;

			SqlParameter par19 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par19.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par19.Value;
			return (idMedicoContrato);
		}

		public int adicionarMedicoVacuna(SqlConnection con, beMedicoVacuna obeMedicoVacuna,bool indicador)
		{
			int idMedicoContrato = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoVacunaAdicionarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoVacuna.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMedicoVacuna.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@ConfiguracionPagoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoVacuna.ConfiguracionPagoId;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoVacuna.FechaInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoVacuna.FechaFin;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoVacuna.TipoAtencionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoVacuna.TipoAdmisionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoVacuna.TipoPacienteId;

			SqlParameter par9 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoVacuna.AseguradoraId;

			SqlParameter par10 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeMedicoVacuna.EspecialidadId;

			SqlParameter par11 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoVacuna.TipoValor.Trim();

			SqlParameter par12 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeMedicoVacuna.Valor1;

			SqlParameter par13 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoVacuna.Valor2;


			SqlParameter par14 = cmd.Parameters.Add("@AlcanceArticulo", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMedicoVacuna.AlcanceArticulo.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par15.Direction = ParameterDirection.Input;
			par15.Value = (obeMedicoVacuna.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoVacuna.TiempoPagoId;


			SqlParameter par16 = cmd.Parameters.Add("@ListaArticulos", SqlDbType.VarChar, -1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeMedicoVacuna.ListaPrestaciones.Trim();

            SqlParameter par17 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par17.Direction = ParameterDirection.Input;
            par17.Value = indicador;

			SqlParameter par18 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par18.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContrato = (int)par18.Value;
			return (idMedicoContrato);
		}

		public beProduccionFijaPorId listarProduccionFijaCPorId(SqlConnection con, int id)
		{
			beProduccionFijaPorId obeProduccionFijaPorId = null;
			List<beProduccionFija> lbeProduccionFija = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "C";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeProduccionFijaPorId = new beProduccionFijaPorId();
				lbeProduccionFija = new List<beProduccionFija>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posValor2 = drd.GetOrdinal("Valor2");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posContratoId = drd.GetOrdinal("ContratoId");
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posModalidadFacturacionId = drd.GetOrdinal("ModalidadFacturacionId");
				int posTipoAplicacionId = drd.GetOrdinal("TipoAplicacionId");
				beProduccionFija obeProduccionFija;
				while (drd.Read())
				{
					obeProduccionFija = new beProduccionFija();
					obeProduccionFija.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeProduccionFija.FechaFin = drd.GetDateTime(posFechaFin);
					obeProduccionFija.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeProduccionFija.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeProduccionFija.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeProduccionFija.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeProduccionFija.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeProduccionFija.TurnoId = drd.GetInt32(posTurnoId);
					obeProduccionFija.TipoValor = drd.GetString(posTipoValor).Trim();
					obeProduccionFija.Valor1 = drd.GetDecimal(posValor1);
					obeProduccionFija.Valor2 = drd.GetDecimal(posValor2);
					obeProduccionFija.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeProduccionFija.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeProduccionFija.ContratoId = drd.GetInt32(posContratoId);
					obeProduccionFija.ServicioId = drd.GetInt32(posServicioId);
					obeProduccionFija.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeProduccionFija.Modalidad = drd.GetInt32(posModalidadFacturacionId);
					obeProduccionFija.AplicacionId= drd.GetInt32(posTipoAplicacionId);
					lbeProduccionFija.Add(obeProduccionFija);
				}
				obeProduccionFijaPorId.ListaProduccionFija = lbeProduccionFija;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeProduccionFijaPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeProduccionFijaPorId);
		}

		public beProduccionFijaPorId listarProduccionFijaBPorId(SqlConnection con, int id)
		{
			beProduccionFijaPorId obeProduccionFijaPorId = null;
			List<beProduccionFija> lbeProduccionFija = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "B";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeProduccionFijaPorId = new beProduccionFijaPorId();
				lbeProduccionFija = new List<beProduccionFija>();
				int posOperador = drd.GetOrdinal("Operador");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTipoDia = drd.GetOrdinal("TipoDia");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoFeriado = drd.GetOrdinal("TipoFeriado");
				int posFechaFeriado = drd.GetOrdinal("FechaFeriado");
				int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
				int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
				int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
				int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
				int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
				int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
				int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posTipoBonificacionId = drd.GetOrdinal("TipoBonificacionId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posModalidadFacturacionId = drd.GetOrdinal("ModalidadFacturacionId");
				beProduccionFija obeProduccionFija;
				while (drd.Read())
				{
					obeProduccionFija = new beProduccionFija();
					obeProduccionFija.Operador = drd.GetString(posOperador);
					obeProduccionFija.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeProduccionFija.FechaFin = drd.GetDateTime(posFechaFin);
					obeProduccionFija.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeProduccionFija.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeProduccionFija.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeProduccionFija.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeProduccionFija.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeProduccionFija.TipoDia = drd.GetString(posTipoDia);
					obeProduccionFija.TurnoId = drd.GetInt32(posTurnoId);
					obeProduccionFija.TipoFeriado = drd.GetString(posTipoFeriado);
					obeProduccionFija.FechaFeriado = drd.GetDateTime(posFechaFeriado);
					obeProduccionFija.IndicadorLunes = drd.GetBoolean(posIndicadorLunes);
					obeProduccionFija.IndicadorMartes = drd.GetBoolean(posIndicadorMartes);
					obeProduccionFija.IndicadorMiercoles = drd.GetBoolean(posIndicadorMiercoles);
					obeProduccionFija.IndicadorJueves = drd.GetBoolean(posIndicadorJueves);
					obeProduccionFija.IndicadorViernes = drd.GetBoolean(posIndicadorViernes);
					obeProduccionFija.IndicadorSabado = drd.GetBoolean(posIndicadorSabado);
					obeProduccionFija.IndicadorDomingo = drd.GetBoolean(posIndicadorDomingo);
					obeProduccionFija.TipoValor = drd.GetString(posTipoValor).Trim();
					obeProduccionFija.Valor1 = drd.GetDecimal(posValor1);
					obeProduccionFija.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeProduccionFija.ServicioId = drd.GetInt32(posServicioId);
					obeProduccionFija.TipoBonificacion = drd.GetInt32(posTipoBonificacionId);
					obeProduccionFija.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeProduccionFija.Modalidad = drd.GetInt32(posModalidadFacturacionId);
					lbeProduccionFija.Add(obeProduccionFija);
				}
				obeProduccionFijaPorId.ListaProduccionFija = lbeProduccionFija;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeProduccionFijaPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeProduccionFijaPorId);
		}

		public beProduccionEscalonadaPorId listarProduccionEscalonadaPorId(SqlConnection con, int id)
		{
			beProduccionEscalonadaPorId obeProduccionEscalonadaPorId = null;
			List<beProduccionEscalonada> lbeProduccionEscalonada = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoEscalonadoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;


			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeProduccionEscalonadaPorId = new beProduccionEscalonadaPorId();
				lbeProduccionEscalonada = new List<beProduccionEscalonada>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoRango = drd.GetOrdinal("TipoRango");
				int posRango1 = drd.GetOrdinal("Rango1");
				int posRango2 = drd.GetOrdinal("Rango2");
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posValor2 = drd.GetOrdinal("Valor2");
				int posAplicacion = drd.GetOrdinal("Aplicacion");
				int posTipoCalculo = drd.GetOrdinal("TipoCalculo");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beProduccionEscalonada obeProduccionEscalonada;
				while (drd.Read())
				{
					obeProduccionEscalonada = new beProduccionEscalonada();
					obeProduccionEscalonada.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeProduccionEscalonada.FechaFin = drd.GetDateTime(posFechaFin);
					obeProduccionEscalonada.TipoRango = drd.GetString(posTipoRango);
					obeProduccionEscalonada.Rango1 = drd.GetDecimal(posRango1);
					obeProduccionEscalonada.Rango2 = drd.GetDecimal(posRango2);
					obeProduccionEscalonada.ServicioId = drd.GetInt32(posServicioId);
					obeProduccionEscalonada.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeProduccionEscalonada.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeProduccionEscalonada.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeProduccionEscalonada.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeProduccionEscalonada.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeProduccionEscalonada.TurnoId = drd.GetInt32(posTurnoId);
					obeProduccionEscalonada.TipoValor = drd.GetString(posTipoValor).Trim();
					obeProduccionEscalonada.Valor1 = drd.GetDecimal(posValor1);
					obeProduccionEscalonada.Valor2 = drd.GetDecimal(posValor2);
					obeProduccionEscalonada.Aplicacion = drd.GetString(posAplicacion);
					obeProduccionEscalonada.TipoCalculo = drd.GetString(posTipoCalculo);
					obeProduccionEscalonada.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeProduccionEscalonada.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeProduccionEscalonada.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeProduccionEscalonada.Add(obeProduccionEscalonada);
				}
				obeProduccionEscalonadaPorId.ListaProduccionEscalonada = lbeProduccionEscalonada;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeProduccionEscalonadaPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeProduccionEscalonadaPorId);
		}

		public beMontoPorId listarMontoPorId(SqlConnection con, int id)
		{
			beMontoPorId obeMontoPorId = null;
			List<beMonto> lbeMonto = null;
			List<beCampoCadenaCorto> lArchivos = null;
			List<beMontoFijoDetalleImportar> lDetalleOA = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoMontoListarPorIdV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;


			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMontoPorId = new beMontoPorId();
				lbeMonto = new List<beMonto>();
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posValor = drd.GetOrdinal("Valor");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
				int posTipoRegistroMF = drd.GetOrdinal("TipoRegistroMF");
				int posAnioProduccionMF = drd.GetOrdinal("AnioProduccionMF");
				int posMesProduccionMF = drd.GetOrdinal("MesProduccionMF");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMonto obeMonto;
				while (drd.Read())
				{
					obeMonto = new beMonto();
					obeMonto.Descripcion = drd.GetString(posDescripcion);
					obeMonto.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMonto.FechaFin = drd.GetDateTime(posFechaFin);
					obeMonto.Valor1 = drd.GetDecimal(posValor);
					obeMonto.Periodo = drd.GetString(posPeriodo);
					obeMonto.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeMonto.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMonto.TurnoId = drd.GetInt32(posTurnoId);
					obeMonto.HoraInicio = drd.GetString(posHoraInicio);
					obeMonto.HoraFin = drd.GetString(posHoraFin);
					obeMonto.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
					obeMonto.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeMonto.TipoRegistro = drd.GetString(posTipoRegistroMF);
					obeMonto.AnioProduccionMF = drd.GetInt32(posAnioProduccionMF);
					obeMonto.MesProduccionMF = drd.GetInt32(posMesProduccionMF);
					lbeMonto.Add(obeMonto);
				}
				obeMontoPorId.ListaMonto = lbeMonto;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeMontoPorId.Componente = lbeComponente;
				}
				lArchivos = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeCampoCadenaCorto;
					while (drd.Read())
					{
						obeCampoCadenaCorto = new beCampoCadenaCorto();
						obeCampoCadenaCorto.Campo1 = drd.GetInt32(0).ToString();
						obeCampoCadenaCorto.Campo2 = drd.GetString(1);
						lArchivos.Add(obeCampoCadenaCorto);
					}
					obeMontoPorId.lArchivos = lArchivos;
				}
				lDetalleOA=new List<beMontoFijoDetalleImportar>();
				if (drd.NextResult())
				{
					beMontoFijoDetalleImportar obeMontoFijoDetalleImportar;
					while (drd.Read())
					{
						obeMontoFijoDetalleImportar = new beMontoFijoDetalleImportar();
						obeMontoFijoDetalleImportar.Sucursal = drd.GetString(0).ToString();
						obeMontoFijoDetalleImportar.IdOrdenAtencion = drd.GetInt32(1);
						obeMontoFijoDetalleImportar.LineaOrdenAtencion = drd.GetInt32(2);
						obeMontoFijoDetalleImportar.CodigoOA = drd.GetString(3);
						obeMontoFijoDetalleImportar.FechaAtencion = drd.GetDateTime(4);
						obeMontoFijoDetalleImportar.ComponenteId = drd.GetString(5);
						obeMontoFijoDetalleImportar.Cantidad = drd.GetDecimal(6);
						obeMontoFijoDetalleImportar.Monto = drd.GetDecimal(7);
						lDetalleOA.Add(obeMontoFijoDetalleImportar);
					}
					obeMontoPorId.lDetalleOAs = lDetalleOA;
				}
				drd.Close();
			}
			return (obeMontoPorId);
		}

		public beMedicoContratoHorarioPorId listarContratoHorarioCPorId(SqlConnection con, int id)
		{
			beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId = null;
			List<beMedicoContratoHorario> lbeMedicoContratoHorario = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoHorarioListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "C";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoHorarioPorId = new beMedicoContratoHorarioPorId();
				lbeMedicoContratoHorario = new List<beMedicoContratoHorario>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTipoDia = drd.GetOrdinal("TipoDia");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
				int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
				int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
				int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
				int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
				int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
				int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
				int posTipoFeriado = drd.GetOrdinal("TipoFeriado");
				int posFechaFeriado = drd.GetOrdinal("FechaFeriado");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMedicoContratoHorario obeMedicoContratoHorario;
				while (drd.Read())
				{
					obeMedicoContratoHorario = new beMedicoContratoHorario();
					obeMedicoContratoHorario.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoHorario.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContratoHorario.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeMedicoContratoHorario.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeMedicoContratoHorario.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeMedicoContratoHorario.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeMedicoContratoHorario.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeMedicoContratoHorario.TipoDia = drd.GetString(posTipoDia);
					obeMedicoContratoHorario.TurnoId = drd.GetInt32(posTurnoId);
					obeMedicoContratoHorario.Valor1 = drd.GetDecimal(posValor1);
					obeMedicoContratoHorario.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeMedicoContratoHorario.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMedicoContratoHorario.IndicadorLunes = drd.GetBoolean(posIndicadorLunes);
					obeMedicoContratoHorario.IndicadorMartes = drd.GetBoolean(posIndicadorMartes);
					obeMedicoContratoHorario.IndicadorMiercoles = drd.GetBoolean(posIndicadorMiercoles);
					obeMedicoContratoHorario.IndicadorJueves = drd.GetBoolean(posIndicadorJueves);
					obeMedicoContratoHorario.IndicadorViernes = drd.GetBoolean(posIndicadorViernes);
					obeMedicoContratoHorario.IndicadorSabado = drd.GetBoolean(posIndicadorSabado);
					obeMedicoContratoHorario.IndicadorDomingo = drd.GetBoolean(posIndicadorDomingo);
					obeMedicoContratoHorario.TipoFeriado = drd.GetString(posTipoFeriado);
					obeMedicoContratoHorario.FechaFeriado = drd.GetDateTime(posFechaFeriado);
					obeMedicoContratoHorario.HoraInicio = drd.GetString(posHoraInicio);
					obeMedicoContratoHorario.HoraFin = drd.GetString(posHoraFin);
					obeMedicoContratoHorario.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoContratoHorario.Add(obeMedicoContratoHorario);
				}
				obeMedicoContratoHorarioPorId.ListaContratoHorario = lbeMedicoContratoHorario;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeMedicoContratoHorarioPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeMedicoContratoHorarioPorId);
		}

		public beMedicoContratoHorarioPorId listarContratoHorarioBPorId(SqlConnection con, int id)
		{
			beMedicoContratoHorarioPorId obeMedicoContratoHorarioPorId = null;
			List<beMedicoContratoHorario> lbeMedicoContratoHorario = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoHorarioListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "B";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoHorarioPorId = new beMedicoContratoHorarioPorId();
				lbeMedicoContratoHorario = new List<beMedicoContratoHorario>();
				int posOperador = drd.GetOrdinal("Operador");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTipoDia = drd.GetOrdinal("TipoDia");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
				int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
				int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
				int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
				int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
				int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
				int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
				int posTipoFeriado = drd.GetOrdinal("TipoFeriado");
				int posFechaFeriado = drd.GetOrdinal("FechaFeriado");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posTipoBonificacionId = drd.GetOrdinal("TipoBonificacionId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMedicoContratoHorario obeMedicoContratoHorario;
				while (drd.Read())
				{
					obeMedicoContratoHorario = new beMedicoContratoHorario();
					obeMedicoContratoHorario.Operador = drd.GetString(posOperador);
					obeMedicoContratoHorario.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoHorario.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContratoHorario.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeMedicoContratoHorario.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeMedicoContratoHorario.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeMedicoContratoHorario.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeMedicoContratoHorario.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeMedicoContratoHorario.TipoDia = drd.GetString(posTipoDia);
					obeMedicoContratoHorario.TurnoId = drd.GetInt32(posTurnoId);
					obeMedicoContratoHorario.TipoValor = drd.GetString(posTipoValor);
					obeMedicoContratoHorario.Valor1 = drd.GetDecimal(posValor1);
					obeMedicoContratoHorario.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeMedicoContratoHorario.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMedicoContratoHorario.IndicadorLunes = drd.GetBoolean(posIndicadorLunes);
					obeMedicoContratoHorario.IndicadorMartes = drd.GetBoolean(posIndicadorMartes);
					obeMedicoContratoHorario.IndicadorMiercoles = drd.GetBoolean(posIndicadorMiercoles);
					obeMedicoContratoHorario.IndicadorJueves = drd.GetBoolean(posIndicadorJueves);
					obeMedicoContratoHorario.IndicadorViernes = drd.GetBoolean(posIndicadorViernes);
					obeMedicoContratoHorario.IndicadorSabado = drd.GetBoolean(posIndicadorSabado);
					obeMedicoContratoHorario.IndicadorDomingo = drd.GetBoolean(posIndicadorDomingo);
					obeMedicoContratoHorario.TipoFeriado = drd.GetString(posTipoFeriado);
					obeMedicoContratoHorario.FechaFeriado = drd.GetDateTime(posFechaFeriado);
					obeMedicoContratoHorario.HoraInicio = drd.GetString(posHoraInicio);
					obeMedicoContratoHorario.HoraFin = drd.GetString(posHoraFin);
					obeMedicoContratoHorario.TipoBonificacion = drd.GetInt32(posTipoBonificacionId);
					obeMedicoContratoHorario.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoContratoHorario.Add(obeMedicoContratoHorario);
				}
				obeMedicoContratoHorarioPorId.ListaContratoHorario = lbeMedicoContratoHorario;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeMedicoContratoHorarioPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeMedicoContratoHorarioPorId);
		}

		public beMedicoContratoTurnoPorId listarContratoTurnoCPorId(SqlConnection con, int id)
		{
			beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId = null;
			List<beMedicoContratoTurno> lbeMedicoContratoTurno = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoTurnoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "C";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoTurnoPorId = new beMedicoContratoTurnoPorId();
				lbeMedicoContratoTurno = new List<beMedicoContratoTurno>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTipoDia = drd.GetOrdinal("TipoDia");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posCantidadHora = drd.GetOrdinal("CantidadHora");
				int posCantidadAtencionMinima = drd.GetOrdinal("CantidadAtencionMinima");
				int posMontoAtencionMinima = drd.GetOrdinal("MontoAtencionMinima");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
				int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
				int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
				int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
				int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
				int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
				int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
				int posTipoFeriado = drd.GetOrdinal("TipoFeriado");
				int posFechaFeriado = drd.GetOrdinal("FechaFeriado");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMedicoContratoTurno obeMedicoContratoTurno;
				while (drd.Read())
				{
					obeMedicoContratoTurno = new beMedicoContratoTurno();
					obeMedicoContratoTurno.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoTurno.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContratoTurno.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeMedicoContratoTurno.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeMedicoContratoTurno.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeMedicoContratoTurno.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeMedicoContratoTurno.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeMedicoContratoTurno.TipoDia = drd.GetString(posTipoDia);
					obeMedicoContratoTurno.TurnoId = drd.GetInt32(posTurnoId);
					obeMedicoContratoTurno.TipoValor = drd.GetString(posTipoValor);
					obeMedicoContratoTurno.Valor1 = drd.GetDecimal(posValor1);
					obeMedicoContratoTurno.CantidadHora = drd.GetInt32(posCantidadHora);
					obeMedicoContratoTurno.CantidadAtencionMinima = drd.GetInt32(posCantidadAtencionMinima);
					obeMedicoContratoTurno.MontoAtencionMinima = drd.GetDecimal(posMontoAtencionMinima);
					obeMedicoContratoTurno.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeMedicoContratoTurno.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMedicoContratoTurno.IndicadorLunes = drd.GetBoolean(posIndicadorLunes);
					obeMedicoContratoTurno.IndicadorMartes = drd.GetBoolean(posIndicadorMartes);
					obeMedicoContratoTurno.IndicadorMiercoles = drd.GetBoolean(posIndicadorMiercoles);
					obeMedicoContratoTurno.IndicadorJueves = drd.GetBoolean(posIndicadorJueves);
					obeMedicoContratoTurno.IndicadorViernes = drd.GetBoolean(posIndicadorViernes);
					obeMedicoContratoTurno.IndicadorSabado = drd.GetBoolean(posIndicadorSabado);
					obeMedicoContratoTurno.IndicadorDomingo = drd.GetBoolean(posIndicadorDomingo);
					obeMedicoContratoTurno.TipoFeriado = drd.GetString(posTipoFeriado);
					obeMedicoContratoTurno.FechaFeriado = drd.GetDateTime(posFechaFeriado);
					obeMedicoContratoTurno.HoraInicio = drd.GetString(posHoraInicio);
					obeMedicoContratoTurno.HoraFin = drd.GetString(posHoraFin);
					obeMedicoContratoTurno.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoContratoTurno.Add(obeMedicoContratoTurno);
				}
				obeMedicoContratoTurnoPorId.ListaContratoTurno = lbeMedicoContratoTurno;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeMedicoContratoTurnoPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeMedicoContratoTurnoPorId);
		}

		public beMedicoContratoTurnoPorId listarContratoTurnoBPorId(SqlConnection con, int id)
		{
			beMedicoContratoTurnoPorId obeMedicoContratoTurnoPorId = null;
			List<beMedicoContratoTurno> lbeMedicoContratoTurno = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoTurnoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = "B";

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoContratoTurnoPorId = new beMedicoContratoTurnoPorId();
				lbeMedicoContratoTurno = new List<beMedicoContratoTurno>();
				int posOperador = drd.GetOrdinal("Operador");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTipoDia = drd.GetOrdinal("TipoDia");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
				int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
				int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
				int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
				int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
				int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
				int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
				int posTipoFeriado = drd.GetOrdinal("TipoFeriado");
				int posFechaFeriado = drd.GetOrdinal("FechaFeriado");
				int posHoraInicio = drd.GetOrdinal("HoraInicio");
				int posHoraFin = drd.GetOrdinal("HoraFin");
				int posTipoBonificacionId = drd.GetOrdinal("TipoBonificacionId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMedicoContratoTurno obeMedicoContratoTurno;
				while (drd.Read())
				{
					obeMedicoContratoTurno = new beMedicoContratoTurno();
					obeMedicoContratoTurno.Operador = drd.GetString(posOperador);
					obeMedicoContratoTurno.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoTurno.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContratoTurno.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeMedicoContratoTurno.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeMedicoContratoTurno.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeMedicoContratoTurno.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeMedicoContratoTurno.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeMedicoContratoTurno.TipoDia = drd.GetString(posTipoDia);
					obeMedicoContratoTurno.TurnoId = drd.GetInt32(posTurnoId);
					obeMedicoContratoTurno.TipoValor = drd.GetString(posTipoValor);
					obeMedicoContratoTurno.Valor1 = drd.GetDecimal(posValor1);
					obeMedicoContratoTurno.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeMedicoContratoTurno.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMedicoContratoTurno.IndicadorLunes = drd.GetBoolean(posIndicadorLunes);
					obeMedicoContratoTurno.IndicadorMartes = drd.GetBoolean(posIndicadorMartes);
					obeMedicoContratoTurno.IndicadorMiercoles = drd.GetBoolean(posIndicadorMiercoles);
					obeMedicoContratoTurno.IndicadorJueves = drd.GetBoolean(posIndicadorJueves);
					obeMedicoContratoTurno.IndicadorViernes = drd.GetBoolean(posIndicadorViernes);
					obeMedicoContratoTurno.IndicadorSabado = drd.GetBoolean(posIndicadorSabado);
					obeMedicoContratoTurno.IndicadorDomingo = drd.GetBoolean(posIndicadorDomingo);
					obeMedicoContratoTurno.TipoFeriado = drd.GetString(posTipoFeriado);
					obeMedicoContratoTurno.FechaFeriado = drd.GetDateTime(posFechaFeriado);
					obeMedicoContratoTurno.HoraInicio = drd.GetString(posHoraInicio);
					obeMedicoContratoTurno.HoraFin = drd.GetString(posHoraFin);
					obeMedicoContratoTurno.TipoBonificacion = drd.GetInt32(posTipoBonificacionId);
					obeMedicoContratoTurno.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoContratoTurno.Add(obeMedicoContratoTurno);
				}
				obeMedicoContratoTurnoPorId.ListaContratoTurno = lbeMedicoContratoTurno;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeMedicoContratoTurnoPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeMedicoContratoTurnoPorId);
		}

		public beContratoCompartidoPorId listarContratoCompartidoPorId(SqlConnection con, int id)
		{
			beContratoCompartidoPorId obeContratoCompartidoPorId = null;
			List<beContratoCompartido> lbeContratoCompartido = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoCompartidoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeContratoCompartidoPorId = new beContratoCompartidoPorId();
				lbeContratoCompartido = new List<beContratoCompartido>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posValor2 = drd.GetOrdinal("Valor2");
				int posAlcancePrestacion = drd.GetOrdinal("AlcancePrestacion");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beContratoCompartido obeContratoCompartido;
				while (drd.Read())
				{
					obeContratoCompartido = new beContratoCompartido();
					obeContratoCompartido.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeContratoCompartido.FechaFin = drd.GetDateTime(posFechaFin);
					obeContratoCompartido.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeContratoCompartido.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeContratoCompartido.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeContratoCompartido.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeContratoCompartido.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeContratoCompartido.TurnoId = drd.GetInt32(posTurnoId);
					obeContratoCompartido.TipoValor = drd.GetString(posTipoValor);
					obeContratoCompartido.Valor1 = drd.GetDecimal(posValor1);
					obeContratoCompartido.Valor2 = drd.GetDecimal(posValor2);
					obeContratoCompartido.AlcancePrestacion = drd.GetString(posAlcancePrestacion);
					obeContratoCompartido.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeContratoCompartido.ServicioId = drd.GetInt32(posServicioId);
					obeContratoCompartido.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeContratoCompartido.Add(obeContratoCompartido);
				}
				obeContratoCompartidoPorId.ListaContratoCompartido = lbeContratoCompartido;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posComponenteId = drd.GetOrdinal("ComponenteId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posComponenteId);
						lbeComponente.Add(beComponente);
					}
					obeContratoCompartidoPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeContratoCompartidoPorId);
		}

		public beMedicoVacunaPorId listarVacunaPorId(SqlConnection con, int id)
		{
			beMedicoVacunaPorId obeMedicoVacunaPorId = null;
			List<beMedicoVacuna> lbeMedicoVacuna = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoVacunaListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeMedicoVacunaPorId = new beMedicoVacunaPorId();
				lbeMedicoVacuna = new List<beMedicoVacuna>();
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
				int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
				int posAseguradoraId = drd.GetOrdinal("AseguradoraId");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor1 = drd.GetOrdinal("Valor1");
				int posValor2 = drd.GetOrdinal("Valor2");
				int posAlcanceArticulo = drd.GetOrdinal("AlcanceArticulo");
				int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beMedicoVacuna obeMedicoVacuna;
				while (drd.Read())
				{
					obeMedicoVacuna = new beMedicoVacuna();
					obeMedicoVacuna.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoVacuna.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoVacuna.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeMedicoVacuna.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
					obeMedicoVacuna.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
					obeMedicoVacuna.AseguradoraId = drd.GetInt32(posAseguradoraId);
					obeMedicoVacuna.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeMedicoVacuna.TurnoId = drd.GetInt32(posTurnoId);
					obeMedicoVacuna.TipoValor = drd.GetString(posTipoValor);
					obeMedicoVacuna.Valor1 = drd.GetDecimal(posValor1);
					obeMedicoVacuna.Valor2 = drd.GetDecimal(posValor2);
					obeMedicoVacuna.AlcanceArticulo = drd.GetString(posAlcanceArticulo);
					obeMedicoVacuna.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
					obeMedicoVacuna.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoVacuna.Add(obeMedicoVacuna);
				}
				obeMedicoVacunaPorId.ListaMedicoVacuna = lbeMedicoVacuna;
				List<beCampoCadenaSolo> lbeComponente = new List<beCampoCadenaSolo>();
				if (drd.NextResult())
				{
					beCampoCadenaSolo beComponente;
					int posArticuloId = drd.GetOrdinal("ArticuloId");
					while (drd.Read())
					{
						beComponente = new beCampoCadenaSolo();
						beComponente.Campo1 = drd.GetString(posArticuloId);
						lbeComponente.Add(beComponente);
					}
					obeMedicoVacunaPorId.Componente = lbeComponente;
				}
				drd.Close();
			}
			return (obeMedicoVacunaPorId);
		}

        public int actualizarProduccionFija(SqlConnection con, beProduccionFija obeProduccionFija, int id, bool indicador)
		{
			int exito = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeProduccionFija.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@TipoRegistro", SqlDbType.Char, 1);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeProduccionFija.TipoRegistro.Trim();

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeProduccionFija.FechaInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeProduccionFija.FechaFin;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeProduccionFija.TipoAtencionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeProduccionFija.TipoAdmisionId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeProduccionFija.TipoPacienteId;

			SqlParameter par9 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeProduccionFija.AseguradoraId;

			SqlParameter par10 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeProduccionFija.EspecialidadId;

			SqlParameter par11 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeProduccionFija.TurnoId;

			SqlParameter par12 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeProduccionFija.TipoValor.Trim();

			SqlParameter par13 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeProduccionFija.Valor1;

			SqlParameter par14 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par14.Direction = ParameterDirection.Input;
			par14.Value = (obeProduccionFija.Valor2 == 0) ? (object)DBNull.Value : obeProduccionFija.Valor2;

			SqlParameter par15 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeProduccionFija.AlcancePrestacion.Trim();

			SqlParameter par16 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par16.Direction = ParameterDirection.Input;
			par16.Value = (obeProduccionFija.TiempoPagoId == 0) ? (object)DBNull.Value : obeProduccionFija.TiempoPagoId;

			SqlParameter par17 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = (obeProduccionFija.Operador == "") ? (object)DBNull.Value : obeProduccionFija.Operador.Trim();

			SqlParameter par18 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeProduccionFija.TipoDia == "") ? (object)DBNull.Value : obeProduccionFija.TipoDia.Trim();

			SqlParameter par19 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = (obeProduccionFija.TipoFeriado == "") ? (object)DBNull.Value : obeProduccionFija.TipoFeriado.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par20.Direction = ParameterDirection.Input;
			par20.Value = (obeProduccionFija.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeProduccionFija.FechaFeriado;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeProduccionFija.IndicadorLunes;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeProduccionFija.IndicadorMartes;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeProduccionFija.IndicadorMiercoles;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeProduccionFija.IndicadorJueves;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeProduccionFija.IndicadorViernes;

			SqlParameter par26 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeProduccionFija.IndicadorSabado;

			SqlParameter par27 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par27.Direction = ParameterDirection.Input;
			par27.Value = obeProduccionFija.IndicadorDomingo;

			SqlParameter par28 = cmd.Parameters.Add("@ContratoId", SqlDbType.Int);
			par28.Direction = ParameterDirection.Input;
			par28.Value = obeProduccionFija.ContratoId;

			SqlParameter par29 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par29.Direction = ParameterDirection.Input;
			par29.Value = obeProduccionFija.ServicioId;

			SqlParameter par30 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par30.Direction = ParameterDirection.Input;
			par30.Value = obeProduccionFija.ListaPrestaciones.Trim();

			SqlParameter par31 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par31.Direction = ParameterDirection.Input;
			par31.Value = obeProduccionFija.TipoBonificacion;

			SqlParameter par32 = cmd.Parameters.Add("@ModalidadFacturacionId", SqlDbType.Int);
			par32.Direction = ParameterDirection.Input;
			par32.Value = obeProduccionFija.Modalidad;

            SqlParameter par33 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par33.Direction = ParameterDirection.Input;
            par33.Value = indicador;

			SqlParameter par34 = cmd.Parameters.Add("@TipoAplicacionId", SqlDbType.Int);
			par34.Direction = ParameterDirection.Input;
			par34.Value = obeProduccionFija.AplicacionId;

			int n = cmd.ExecuteNonQuery();
			exito = n;
			return (exito);
		}

		public bool actualizarProduccionEscalonada(SqlConnection con, beProduccionEscalonada obeProduccionEscalonada, int id,bool indicador)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoEscalonadoActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeProduccionEscalonada.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeProduccionEscalonada.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeProduccionEscalonada.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@TipoRango", SqlDbType.Char, 1);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeProduccionEscalonada.TipoRango.Trim();

			SqlParameter par6 = cmd.Parameters.Add("@Rango1", SqlDbType.Decimal);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeProduccionEscalonada.Rango1;

			SqlParameter par7 = cmd.Parameters.Add("@Rango2", SqlDbType.Decimal);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeProduccionEscalonada.Rango2;

			SqlParameter par8 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeProduccionEscalonada.ServicioId;

			SqlParameter par9 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeProduccionEscalonada.TipoAtencionId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeProduccionEscalonada.TipoAdmisionId;

			SqlParameter par11 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeProduccionEscalonada.TipoPacienteId;

			SqlParameter par12 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeProduccionEscalonada.AseguradoraId;

			SqlParameter par13 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeProduccionEscalonada.EspecialidadId;

			SqlParameter par14 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeProduccionEscalonada.TipoValor.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeProduccionEscalonada.Valor1;

			SqlParameter par16 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeProduccionEscalonada.Valor2;

			SqlParameter par17 = cmd.Parameters.Add("@Aplicacion", SqlDbType.Char, 1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeProduccionEscalonada.Aplicacion.Trim();

			SqlParameter par18 = cmd.Parameters.Add("@TipoCalculo", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeProduccionEscalonada.TipoCalculo.Trim();

			SqlParameter par19 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par19.Direction = ParameterDirection.Input;
			par19.Value = obeProduccionEscalonada.AlcancePrestacion.Trim();

			SqlParameter par20 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par20.Direction = ParameterDirection.Input;
			par20.Value = (obeProduccionEscalonada.TiempoPagoId == 0) ? (object)DBNull.Value : obeProduccionEscalonada.TiempoPagoId;

			SqlParameter par21 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeProduccionEscalonada.ListaPrestaciones.Trim();

            SqlParameter par22 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par22.Direction = ParameterDirection.Input;
            par22.Value = indicador;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public int actualizarMonto(SqlConnection con, beMonto obeMonto, int id,bool indicador)
		{
			int exito = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoMontoActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMonto.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMonto.Descripcion;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMonto.FechaInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMonto.FechaFin;

			SqlParameter par6 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMonto.Valor1;

			SqlParameter par7 = cmd.Parameters.Add("@Periodo", SqlDbType.Char, 1);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMonto.Periodo.Trim();

			SqlParameter par8 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMonto.AlcancePrestacion.Trim();

			SqlParameter par9 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = (obeMonto.TiempoPagoId == 0) ? (object)DBNull.Value : obeMonto.TiempoPagoId;

			SqlParameter par10 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeMonto.TurnoId;

			SqlParameter par11 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par11.Direction = ParameterDirection.Input;
			par11.Value = DateTime.Parse(obeMonto.HoraInicio);

			SqlParameter par12 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par12.Direction = ParameterDirection.Input;
			par12.Value = DateTime.Parse(obeMonto.HoraFin);

			SqlParameter par13 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMonto.ListaPrestacion.Trim();

			SqlParameter par14 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.VarChar, -1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMonto.ConceptoMontoFijoId;

			SqlParameter par15 = cmd.Parameters.Add("@TipoRegistroMF", SqlDbType.Char, 1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMonto.TipoRegistro;

			SqlParameter par16 = cmd.Parameters.Add("@AnioProduccionMF", SqlDbType.Int);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeMonto.AnioProduccionMF;

			SqlParameter par17 = cmd.Parameters.Add("@MesProduccionMF", SqlDbType.Int);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeMonto.MesProduccionMF;

            SqlParameter par18 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par18.Direction = ParameterDirection.Input;
            par18.Value = indicador;

			SqlParameter par19 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par19.Direction = ParameterDirection.Output;

			int n = cmd.ExecuteNonQuery();
			exito = (int)par19.Value;
			return (exito);
		}

		public bool actualizarMedicoContratoHorario(SqlConnection con, beMedicoContratoHorario obeMedicoContratoHorario, int id,bool indicador)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoHorarioActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoHorario.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoContratoHorario.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoContratoHorario.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoContratoHorario.TipoAtencionId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoContratoHorario.TipoAdmisionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoContratoHorario.TipoPacienteId;

			SqlParameter par8 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoContratoHorario.AseguradoraId;

			SqlParameter par9 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoContratoHorario.EspecialidadId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par10.Direction = ParameterDirection.Input;
			par10.Value = (obeMedicoContratoHorario.TipoDia == "") ? (object)DBNull.Value : obeMedicoContratoHorario.TipoDia.Trim();

			SqlParameter par11 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoContratoHorario.TurnoId;

			SqlParameter par12 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeMedicoContratoHorario.TipoValor.Trim();

			SqlParameter par13 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoContratoHorario.Valor1;

			SqlParameter par14 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMedicoContratoHorario.AlcancePrestacion.Trim();

			SqlParameter par15 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par15.Direction = ParameterDirection.Input;
			par15.Value = (obeMedicoContratoHorario.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoContratoHorario.TiempoPagoId;

			SqlParameter par16 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = (obeMedicoContratoHorario.Operador == "") ? (object)DBNull.Value : obeMedicoContratoHorario.Operador.Trim();

			SqlParameter par17 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = (obeMedicoContratoHorario.TipoFeriado == "") ? (object)DBNull.Value : obeMedicoContratoHorario.TipoFeriado.Trim();

			SqlParameter par18 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeMedicoContratoHorario.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeMedicoContratoHorario.FechaFeriado;

			SqlParameter par19 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par19.Direction = ParameterDirection.Input;
			par19.Value = obeMedicoContratoHorario.IndicadorLunes;

			SqlParameter par20 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par20.Direction = ParameterDirection.Input;
			par20.Value = obeMedicoContratoHorario.IndicadorMartes;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeMedicoContratoHorario.IndicadorMiercoles;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeMedicoContratoHorario.IndicadorJueves;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeMedicoContratoHorario.IndicadorViernes;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeMedicoContratoHorario.IndicadorSabado;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeMedicoContratoHorario.IndicadorDomingo;

			SqlParameter par26 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeMedicoContratoHorario.ListaPrestaciones.Trim();

			SqlParameter par27 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par27.Direction = ParameterDirection.Input;
			par27.Value = DateTime.Parse(obeMedicoContratoHorario.HoraInicio);

			SqlParameter par28 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par28.Direction = ParameterDirection.Input;
			par28.Value = DateTime.Parse(obeMedicoContratoHorario.HoraFin);

			SqlParameter par29 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par29.Direction = ParameterDirection.Input;
			par29.Value = obeMedicoContratoHorario.TipoBonificacion;

            SqlParameter par30 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par30.Direction = ParameterDirection.Input;
            par30.Value = indicador;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public bool actualizarMedicoContratoTurno(SqlConnection con, beMedicoContratoTurno obeMedicoContratoTurno, int id,bool indicador)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoTurnoActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoTurno.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoContratoTurno.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoContratoTurno.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoContratoTurno.TipoAtencionId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoContratoTurno.TipoAdmisionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoContratoTurno.TipoPacienteId;

			SqlParameter par8 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoContratoTurno.AseguradoraId;

			SqlParameter par9 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoContratoTurno.EspecialidadId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoDia", SqlDbType.Char, 1);
			par10.Direction = ParameterDirection.Input;
			par10.Value = (obeMedicoContratoTurno.TipoDia == "") ? (object)DBNull.Value : obeMedicoContratoTurno.TipoDia.Trim();

			SqlParameter par11 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoContratoTurno.TurnoId;

			SqlParameter par12 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeMedicoContratoTurno.TipoValor.Trim();

			SqlParameter par13 = cmd.Parameters.Add("@CantidadHora", SqlDbType.Int);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoContratoTurno.CantidadHora;

			SqlParameter par14 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeMedicoContratoTurno.Valor1;

			SqlParameter par15 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMedicoContratoTurno.AlcancePrestacion.Trim();

			SqlParameter par16 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par16.Direction = ParameterDirection.Input;
			par16.Value = (obeMedicoContratoTurno.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoContratoTurno.TiempoPagoId;

			SqlParameter par17 = cmd.Parameters.Add("@Operador", SqlDbType.Char, 1);
			par17.Direction = ParameterDirection.Input;
			par17.Value = (obeMedicoContratoTurno.Operador == "") ? (object)DBNull.Value : obeMedicoContratoTurno.Operador.Trim();

			SqlParameter par18 = cmd.Parameters.Add("@TipoFeriado", SqlDbType.Char, 1);
			par18.Direction = ParameterDirection.Input;
			par18.Value = (obeMedicoContratoTurno.TipoFeriado == "") ? (object)DBNull.Value : obeMedicoContratoTurno.TipoFeriado.Trim();

			SqlParameter par19 = cmd.Parameters.Add("@FechaFeriado", SqlDbType.DateTime);
			par19.Direction = ParameterDirection.Input;
			par19.Value = (obeMedicoContratoTurno.FechaFeriado.Year.Equals(1900)) ? (object)DBNull.Value : obeMedicoContratoTurno.FechaFeriado;

			SqlParameter par20 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par20.Direction = ParameterDirection.Input;
			par20.Value = obeMedicoContratoTurno.IndicadorLunes;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeMedicoContratoTurno.IndicadorMartes;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeMedicoContratoTurno.IndicadorMiercoles;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeMedicoContratoTurno.IndicadorJueves;

			SqlParameter par24 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeMedicoContratoTurno.IndicadorViernes;

			SqlParameter par25 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeMedicoContratoTurno.IndicadorSabado;

			SqlParameter par26 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par26.Direction = ParameterDirection.Input;
			par26.Value = obeMedicoContratoTurno.IndicadorDomingo;

			SqlParameter par27 = cmd.Parameters.Add("@CantidadAtencionMinima", SqlDbType.Decimal);
			par27.Direction = ParameterDirection.Input;
			par27.Value = obeMedicoContratoTurno.CantidadAtencionMinima;

			SqlParameter par28 = cmd.Parameters.Add("@MontoAtencionMinima", SqlDbType.Decimal);
			par28.Direction = ParameterDirection.Input;
			par28.Value = obeMedicoContratoTurno.MontoAtencionMinima;

			SqlParameter par29 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par29.Direction = ParameterDirection.Input;
			par29.Value = obeMedicoContratoTurno.ListaPrestaciones.Trim();

			SqlParameter par30 = cmd.Parameters.Add("@HoraInicio", SqlDbType.DateTime);
			par30.Direction = ParameterDirection.Input;
			par30.Value = DateTime.Parse(obeMedicoContratoTurno.HoraInicio);

			SqlParameter par31 = cmd.Parameters.Add("@HoraFin", SqlDbType.DateTime);
			par31.Direction = ParameterDirection.Input;
			par31.Value = DateTime.Parse(obeMedicoContratoTurno.HoraFin);

			SqlParameter par32 = cmd.Parameters.Add("@TipoBonificacionId", SqlDbType.Int);
			par32.Direction = ParameterDirection.Input;
			par32.Value = obeMedicoContratoTurno.TipoBonificacion;

            SqlParameter par33 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par33.Direction = ParameterDirection.Input;
            par33.Value = indicador;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public bool actualizarContratoCompartido(SqlConnection con, beContratoCompartido obeContratoCompartido, int id,bool indicador)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoCompartidoActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeContratoCompartido.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeContratoCompartido.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeContratoCompartido.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeContratoCompartido.TipoAtencionId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeContratoCompartido.TipoAdmisionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeContratoCompartido.TipoPacienteId;

			SqlParameter par8 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeContratoCompartido.AseguradoraId;

			SqlParameter par9 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeContratoCompartido.EspecialidadId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeContratoCompartido.TipoValor.Trim();

			SqlParameter par11 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeContratoCompartido.Valor1;

			SqlParameter par12 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeContratoCompartido.Valor2;


			SqlParameter par13 = cmd.Parameters.Add("@AlcancePrestacion", SqlDbType.Char, 1);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeContratoCompartido.AlcancePrestacion.Trim();

			SqlParameter par14 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par14.Direction = ParameterDirection.Input;
			par14.Value = (obeContratoCompartido.TiempoPagoId == 0) ? (object)DBNull.Value : obeContratoCompartido.TiempoPagoId;

			SqlParameter par15 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeContratoCompartido.ServicioId;

			SqlParameter par16 = cmd.Parameters.Add("@ListaPrestaciones", SqlDbType.VarChar, -1);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeContratoCompartido.ListaPrestaciones.Trim();

            SqlParameter par17 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par17.Direction = ParameterDirection.Input;
            par17.Value = indicador;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public bool actualizarMedicoVacuna(SqlConnection con, beMedicoVacuna obeMedicoVacuna, int id,bool indicador)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoVacunaActualizarV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoVacuna.UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeMedicoVacuna.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeMedicoVacuna.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeMedicoVacuna.TipoAtencionId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeMedicoVacuna.TipoAdmisionId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeMedicoVacuna.TipoPacienteId;

			SqlParameter par8 = cmd.Parameters.Add("@AseguradoraId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeMedicoVacuna.AseguradoraId;

			SqlParameter par9 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeMedicoVacuna.EspecialidadId;

			SqlParameter par10 = cmd.Parameters.Add("@TipoValor", SqlDbType.Char, 1);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeMedicoVacuna.TipoValor.Trim();

			SqlParameter par11 = cmd.Parameters.Add("@Valor1", SqlDbType.Decimal);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeMedicoVacuna.Valor1;

			SqlParameter par12 = cmd.Parameters.Add("@Valor2", SqlDbType.Decimal);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeMedicoVacuna.Valor2;


			SqlParameter par13 = cmd.Parameters.Add("@AlcanceArticulo", SqlDbType.Char, 1);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeMedicoVacuna.AlcanceArticulo.Trim();

			SqlParameter par14 = cmd.Parameters.Add("@TiempoPagoId", SqlDbType.Int);
			par14.Direction = ParameterDirection.Input;
			par14.Value = (obeMedicoVacuna.TiempoPagoId == 0) ? (object)DBNull.Value : obeMedicoVacuna.TiempoPagoId;


			SqlParameter par15 = cmd.Parameters.Add("@ListaArticulos", SqlDbType.VarChar, -1);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeMedicoVacuna.ListaPrestaciones.Trim();

            SqlParameter par16 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par16.Direction = ParameterDirection.Input;
            par16.Value = indicador;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public List<beMedicoContratoVencer> listarMedicoContratoVencer(SqlConnection con, string idSucursal, int anio, int mes)
		{
			List<beMedicoContratoVencer> lbeMedicoContrato = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoPorVencerListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", idSucursal);
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.Parameters.AddWithValue("@Mes", mes);

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeMedicoContrato = new List<beMedicoContratoVencer>();
				beMedicoContratoVencer obeMedicoContrato;

				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posMedicoContratoId = drd.GetOrdinal("MedicoContratoId");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posMedico = drd.GetOrdinal("Medico");
				int posObservacion = drd.GetOrdinal("Observacion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

				while (drd.Read())
				{
					obeMedicoContrato = new beMedicoContratoVencer();
					obeMedicoContrato.SucursalId = drd.GetString(posSucursalId);
					obeMedicoContrato.MedicoContratoId = drd.GetInt32(posMedicoContratoId);
					obeMedicoContrato.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContrato.FechaFin = drd.GetDateTime(posFechaFin);
					obeMedicoContrato.Medico = drd.GetString(posMedico);
					obeMedicoContrato.Observacion = drd.GetString(posObservacion);
					obeMedicoContrato.EstadoRegistro = drd.GetString(posEstadoRegistro);
					lbeMedicoContrato.Add(obeMedicoContrato);
				}

				drd.Close();
			}
			return lbeMedicoContrato;
		}

		public int actualizarEstadoMedicoContratoDetalle(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId)
		{
			int exito = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = Id;

			SqlParameter par3 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char, 1);
			par3.Direction = ParameterDirection.Input;
			par3.Value = EstadoRegistro;


			int n = cmd.ExecuteNonQuery();
			exito = n;
			return (exito);
		}

		public string actualizarEstadoMedicoContratoDetalle2(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId,bool indicador)
		{
			string rpta="";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleActualizarEstadoV3", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = UsuarioId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = Id;

			SqlParameter par3 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char, 1);
			par3.Direction = ParameterDirection.Input;
			par3.Value = EstadoRegistro;

            SqlParameter par4 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par4.Direction = ParameterDirection.Input;
            par4.Value = indicador;

			object mensaje = cmd.ExecuteScalar();
			if (mensaje != null)
			{
				rpta = mensaje.ToString();
			}

			return (rpta);
		}

		public beContratoExcel cargarExcel(SqlConnection con, List<string> listas)
		{
			beContratoExcel obeContratoExcel = null;

			SqlCommand cmd = new SqlCommand("uspMedicoContratoExcelCargar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			int cont = 1;
			foreach (string cadena in listas)
			{
				cmd.Parameters.AddWithValue("Lista" + cont, cadena);
				cont++;
			}

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeContratoExcel = new beContratoExcel();
				if (drd.HasRows)
				{
					obeContratoExcel.Lista1 = new List<beContratoLista1Excel>();
					beContratoLista1Excel obj = null;
					while (drd.Read())
					{
						obj = new beContratoLista1Excel();
						obj.Orden = drd.GetString(drd.GetOrdinal("Orden"));
						obj.SucursalId = drd.GetString(drd.GetOrdinal("SucursalId"));
						obj.PersonaId = drd.GetString(drd.GetOrdinal("PersonaId"));
						obj.NombreCompleto = drd.GetString(drd.GetOrdinal("NombreCompleto"));
						obj.FechaInicio = drd.GetString(drd.GetOrdinal("FechaInicio"));
						obj.FechaFin = drd.GetString(drd.GetOrdinal("FechaFin"));
						obj.Observacion = drd.GetString(drd.GetOrdinal("Observacion"));
						obj.EstadoRegistro = drd.GetString(drd.GetOrdinal("EstadoRegistro"));
						obj.Observaciones = drd.GetString(drd.GetOrdinal("Observaciones"));
						obeContratoExcel.Lista1.Add(obj);
					}
				}
				if (drd.NextResult())
				{
					if (drd.HasRows)
					{
						obeContratoExcel.Lista2 = new List<beContratoLista2Excel>();
						beContratoLista2Excel obj = null;
						while (drd.Read())
						{
							obj = new beContratoLista2Excel();
							obj.Hoja = drd.GetInt32(drd.GetOrdinal("Hoja"));
							obj.Orden = drd.GetString(drd.GetOrdinal("Orden"));
							obj.SucursalId = drd.GetString(drd.GetOrdinal("SucursalId"));
							obj.PersonaId = drd.GetString(drd.GetOrdinal("PersonaId"));
							obj.NombreCompleto = drd.GetString(drd.GetOrdinal("NombreCompleto"));
							obj.FechaInicio = drd.GetString(drd.GetOrdinal("FechaInicio"));
							obj.FechaFin = drd.GetString(drd.GetOrdinal("FechaFin"));
							obj.TipoAtencionId = drd.GetString(drd.GetOrdinal("TipoAtencionId"));
							obj.TipoAdmisionId = drd.GetString(drd.GetOrdinal("TipoAdmisionId"));
							obj.TipoPacienteId = drd.GetString(drd.GetOrdinal("TipoPacienteId"));
							obj.AseguradoraId = drd.GetString(drd.GetOrdinal("AseguradoraId"));
							obj.EspecialidadId = drd.GetString(drd.GetOrdinal("EspecialidadId"));
							obj.TurnoId = drd.GetString(drd.GetOrdinal("TurnoId"));
							obj.TipoValor = drd.GetString(drd.GetOrdinal("TipoValor"));
							obj.Valor1 = drd.GetString(drd.GetOrdinal("Valor1"));
							obj.Valor2 = drd.GetString(drd.GetOrdinal("Valor2"));
							obj.AlcancePrestacion = drd.GetString(drd.GetOrdinal("AlcancePrestacion"));
							obj.AlcanceArticulo = drd.GetString(drd.GetOrdinal("AlcanceArticulo"));
							obj.TiempoPagoId = drd.GetString(drd.GetOrdinal("TiempoPagoId"));
							obj.Descripcion = drd.GetString(drd.GetOrdinal("Descripcion"));
							obj.Operador = drd.GetString(drd.GetOrdinal("Operador"));
							obj.TipoDia = drd.GetString(drd.GetOrdinal("TipoDia"));
							obj.TipoFeriado = drd.GetString(drd.GetOrdinal("TipoFeriado"));
							obj.FechaFeriado = drd.GetString(drd.GetOrdinal("FechaFeriado"));
							obj.IndicadorLunes = drd.GetString(drd.GetOrdinal("IndicadorLunes"));
							obj.IndicadorMartes = drd.GetString(drd.GetOrdinal("IndicadorMartes"));
							obj.IndicadorMiercoles = drd.GetString(drd.GetOrdinal("IndicadorMiercoles"));
							obj.IndicadorJueves = drd.GetString(drd.GetOrdinal("IndicadorJueves"));
							obj.IndicadorViernes = drd.GetString(drd.GetOrdinal("IndicadorViernes"));
							obj.IndicadorSabado = drd.GetString(drd.GetOrdinal("IndicadorSabado"));
							obj.IndicadorDomingo = drd.GetString(drd.GetOrdinal("IndicadorDomingo"));
							obj.TipoRango = drd.GetString(drd.GetOrdinal("TipoRango"));
							obj.Rango1 = drd.GetString(drd.GetOrdinal("Rango1"));
							obj.Rango2 = drd.GetString(drd.GetOrdinal("Rango2"));
							obj.ServicioId = drd.GetString(drd.GetOrdinal("ServicioId"));
							obj.Aplicacion = drd.GetString(drd.GetOrdinal("Aplicacion"));
							obj.TipoCalculo = drd.GetString(drd.GetOrdinal("TipoCalculo"));
							obj.Periodo = drd.GetString(drd.GetOrdinal("Periodo"));
							obj.CantidadAtencionMinima = drd.GetString(drd.GetOrdinal("CantidadAtencionMinima"));
							obj.MontoAtencionMinima = drd.GetString(drd.GetOrdinal("MontoAtencionMinima"));
							obj.CantidadHora = drd.GetString(drd.GetOrdinal("CantidadHora"));
							obj.EstadoRegistro = drd.GetString(drd.GetOrdinal("EstadoRegistro"));
							obj.Observaciones = drd.GetString(drd.GetOrdinal("Observaciones"));
							obeContratoExcel.Lista2.Add(obj);
						}
					}
				}
				if (drd.NextResult())
				{
					if (drd.HasRows)
					{
						obeContratoExcel.Lista3 = new List<beContratoLista3Excel>();
						beContratoLista3Excel obj = null;
						while (drd.Read())
						{
							obj = new beContratoLista3Excel();
							obj.Hoja = drd.GetInt32(drd.GetOrdinal("Hoja"));
							obj.Orden = drd.GetString(drd.GetOrdinal("Orden"));
							obj.SucursalId = drd.GetString(drd.GetOrdinal("SucursalId"));
							obj.PersonaId = drd.GetString(drd.GetOrdinal("PersonaId"));
							obj.NombreCompleto = drd.GetString(drd.GetOrdinal("NombreCompleto"));
							obj.ComponenteId = drd.GetString(drd.GetOrdinal("ComponenteId"));
							obj.EstadoRegistro = drd.GetString(drd.GetOrdinal("EstadoRegistro"));
							obj.Observaciones = drd.GetString(drd.GetOrdinal("Observaciones"));
							obeContratoExcel.Lista3.Add(obj);
						}
					}
				}
				drd.Close();
			}

			return obeContratoExcel;
		}

		public string grabarMedicoContratoCopiar(SqlConnection con, string SucursalId, int MedicoContratoId, DateTime FecInicio, DateTime FecFin, int UsuarioId, int valorCopiaDoctor,bool indicador)
		{
			//bool exito = false;
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoCopiarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = SucursalId;

			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = valorCopiaDoctor;

			SqlParameter par3 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = MedicoContratoId;

			SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = FecInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = FecFin;

			SqlParameter par6 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = UsuarioId;

			SqlParameter par7 = cmd.Parameters.Add("@CantidadFilas", SqlDbType.Int);
			par7.Direction = ParameterDirection.ReturnValue;

            SqlParameter par8 = cmd.Parameters.Add("@IndicadorAprobacion", SqlDbType.Bit);
            par8.Direction = ParameterDirection.Input;
            par8.Value = indicador;

			//int n = cmd.ExecuteNonQuery();
			//int rs = int.Parse(par6.Value.ToString());
			//exito = (rs > 0);
			//return (exito);
			object data = cmd.ExecuteScalar();
			if (data != null) rpta = data.ToString();
			return rpta;
		}

		public bool adicionarContratos(SqlConnection con, string lista1, string lista2, string lista3, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoExcelAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@lista1", SqlDbType.VarChar, int.MaxValue);
			par1.Direction = ParameterDirection.Input;
			par1.Value = lista1;

			SqlParameter par2 = cmd.Parameters.Add("@lista2", SqlDbType.VarChar, int.MaxValue);
			par2.Direction = ParameterDirection.Input;
			par2.Value = lista2;

			SqlParameter par3 = cmd.Parameters.Add("@lista3", SqlDbType.VarChar, int.MaxValue);
			par3.Direction = ParameterDirection.Input;
			par3.Value = lista3;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = UsuarioId;

			cmd.ExecuteNonQuery();

			exito = true;

			return exito;
		}

        public int adicionarMedicoContratoAdjuntar(SqlConnection con, beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
        {
            int idMedicoContratoAdjuntar = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoAdjuntoAdicionarV2", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeMedicoContratoAdjuntar.MedicoContratoId;

			SqlParameter par2 = cmd.Parameters.Add("@Lista", SqlDbType.VarChar, -1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeMedicoContratoAdjuntar.NombreArchivo;

			//SqlParameter par3 = cmd.Parameters.Add("@NombreRepositorio", SqlDbType.VarChar,-1);
			//par3.Direction = ParameterDirection.Input;
			//par3.Value = obeMedicoContratoAdjuntar.NombreRepositorio;

            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = id;

			SqlParameter par6 = cmd.Parameters.Add("@@ROWCOUNT", SqlDbType.Int);
            par6.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idMedicoContratoAdjuntar = (int)par6.Value;
            return (idMedicoContratoAdjuntar);
        }

        public bool actualizarMedicoContratoAdjuntar(SqlConnection con, beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoAdjuntoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeMedicoContratoAdjuntar.MedicoContratoId;

            SqlParameter par2 = cmd.Parameters.Add("@NombreArchivo", SqlDbType.VarChar, -1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeMedicoContratoAdjuntar.NombreArchivo;

            SqlParameter par3 = cmd.Parameters.Add("@NombreRepositorio", SqlDbType.VarChar, -1);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeMedicoContratoAdjuntar.NombreRepositorio;

            SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par4.Direction = ParameterDirection.Input;
            par4.Value = id;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

		public bool actualizarEstadoMedicoContratoAdjuntar(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId, string NombreRepositorio)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoAdjuntoActualizarEstadoV2", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = Id;

            SqlParameter par2 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char, 1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = EstadoRegistro;

            SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@NombreRepositorio", SqlDbType.VarChar, -1);
			par4.Direction = ParameterDirection.Input;
			par4.Value = NombreRepositorio;

            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

		public bool actualizarEstadoMedicoContratoDetalleAdjuntar(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleAdjuntoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleAdjuntoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Id;

			SqlParameter par2 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public int adicionarMedicoContratoDetalleAdjuntar(SqlConnection con, beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			int idMedicoContratoAdjuntar = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleAdjuntoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoAdjuntar.MedicoContratoId;

			SqlParameter par2 = cmd.Parameters.Add("@Lista", SqlDbType.VarChar, -1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMedicoContratoAdjuntar.NombreArchivo;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = id;

			SqlParameter par6 = cmd.Parameters.Add("@@ROWCOUNT", SqlDbType.Int);
			par6.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContratoAdjuntar = (int)par6.Value;
			return (idMedicoContratoAdjuntar);
		}

		public int adicionarMedicoContratoDetalleImportar(SqlConnection con, beMedicoContratoAdjuntar obeMedicoContratoAdjuntar, int id)
		{
			int idMedicoContratoAdjuntar = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleImportarAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeMedicoContratoAdjuntar.MedicoContratoId;

			SqlParameter par2 = cmd.Parameters.Add("@Lista", SqlDbType.VarChar, -1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeMedicoContratoAdjuntar.NombreArchivo;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = id;

			SqlParameter par6 = cmd.Parameters.Add("@@ROWCOUNT", SqlDbType.Int);
			par6.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContratoAdjuntar = (int)par6.Value;
			return (idMedicoContratoAdjuntar);
		}
		public int actualizarMedicoContratoDetalleImportar(SqlConnection con, int MedicoContratoId, int UsuarioId)
		{
			int idMedicoContratoAdjuntar = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleImportarActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = MedicoContratoId;

			SqlParameter par2 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = UsuarioId;

			SqlParameter par6 = cmd.Parameters.Add("@@ROWCOUNT", SqlDbType.Int);
			par6.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) idMedicoContratoAdjuntar = (int)par6.Value;
			return (idMedicoContratoAdjuntar);
		}


		public beCampoEntero obtenerEmpresaNombre(SqlConnection con, string su, int id)
		{
			beCampoEntero obeCampoEntero = null;
			SqlCommand cmd = new SqlCommand("uspMedicoObtenerEmpresa", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
				while (drd.Read())
				{
					obeCampoEntero = new beCampoEntero();
					obeCampoEntero.campo1 = drd.GetInt32(posMedicoEmpresaId);
					obeCampoEntero.campo2 = drd.GetString(posNombreCompleto);
				}
				drd.Close();
			}
			return obeCampoEntero;
		}

		public List<beExtornoMontoFijo> obtenerExtornoMontoFijo(SqlConnection con, string su, int id)
		{
			List<beExtornoMontoFijo> lbeExtornoMontoFijo = null;
			beExtornoMontoFijo obeExtornoMontoFijo = null;
			SqlCommand cmd = new SqlCommand("uspProvisionMontoFijoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = su;
			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = id;
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeExtornoMontoFijo = new List<beExtornoMontoFijo>();
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
				int posMes = drd.GetOrdinal("Mes");
				int posAnio = drd.GetOrdinal("Anio");
				int posTotal = drd.GetOrdinal("Total");
				while (drd.Read())
				{
					obeExtornoMontoFijo = new beExtornoMontoFijo();
					obeExtornoMontoFijo.Descripcion = drd.GetString(posDescripcion);
					obeExtornoMontoFijo.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
					obeExtornoMontoFijo.Mes = drd.GetInt32(posMes);
					obeExtornoMontoFijo.Anio = drd.GetInt32(posAnio);
					obeExtornoMontoFijo.Total = drd.GetDecimal(posTotal);
					lbeExtornoMontoFijo.Add(obeExtornoMontoFijo);
				}
				drd.Close();
			}
			return lbeExtornoMontoFijo;
		}
		public string grabarAmpliacion(SqlConnection con, string listaContratos, string CantidadMes, int UsuarioId)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoAmpliarVigencia", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ListaContratos", SqlDbType.VarChar, -1);
			par1.Direction = ParameterDirection.Input;
			par1.Value = listaContratos;

			SqlParameter par2 = cmd.Parameters.Add("@CantidadMeses", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = CantidadMes;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			object n = cmd.ExecuteScalar();
			if (n != null)
			{
				rpta = n.ToString();
			}
			return (rpta);
		}
		public beContratoRenovacion grabarRenovacion(SqlConnection con, string listaContratos, string fechafin, int UsuarioId)
		{
			beContratoRenovacion obeContratoRenovacion = new beContratoRenovacion();
			SqlCommand cmd = new SqlCommand("uspMedicoContratoRenovar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ListaContratos", SqlDbType.VarChar, -1);
			par1.Direction = ParameterDirection.Input;
			par1.Value = listaContratos;

			SqlParameter par2 = cmd.Parameters.Add("@FechaFinRenovacion", SqlDbType.DateTime);
			par2.Direction = ParameterDirection.Input;
			par2.Value = fechafin;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null) {

				string mensaje = "";
				if (drd.HasRows) {

					drd.Read();
					mensaje = drd.GetString(0);
					obeContratoRenovacion.mensaje = mensaje;
				}
				if (drd.NextResult()) {
					int posMedicoContratoId = drd.GetOrdinal("MedicoContratoId");
					int posOrigen = drd.GetOrdinal("Origen");
					int posDestino = drd.GetOrdinal("Destino");
					List<beCampoCadena3> lContratos = new List<beCampoCadena3>();
					beCampoCadena3 oContratos;
					while (drd.Read()) {
						oContratos = new beCampoCadena3();
						oContratos.Campo1 = drd.GetInt32(posMedicoContratoId).ToString();
						oContratos.Campo2 = drd.GetString(posOrigen);
						oContratos.Campo3 = drd.GetString(posDestino);
						lContratos.Add(oContratos);
					}
					obeContratoRenovacion.listaContrato = lContratos;
				}
				drd.Close();
			}
			return (obeContratoRenovacion);
		}

        public string AutorizacionRechazoContrato(SqlConnection con,bool cabecera, int id, string estado, int UsuarioId)
        {
            string rpta = "";
            if (cabecera)
            {
                SqlCommand cmd = new SqlCommand("uspMedicoContratoConfirmar", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
                par1.Direction = ParameterDirection.Input;
                par1.Value = id;

                SqlParameter par2 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char, 1);
                par2.Direction = ParameterDirection.Input;
                par2.Value = estado;

                SqlParameter par3 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
                par3.Direction = ParameterDirection.Input;
                par3.Value = UsuarioId;

                object n = cmd.ExecuteScalar();
                if (n != null)
                {
                    rpta = n.ToString();
                }
            }
            else
            {
                SqlCommand cmd = new SqlCommand("uspMedicoContratoDetalleConfirmar", con);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
                par1.Direction = ParameterDirection.Input;
                par1.Value = id;

                SqlParameter par2 = cmd.Parameters.Add("@EstadoRegistro", SqlDbType.Char,1);
                par2.Direction = ParameterDirection.Input;
                par2.Value = estado;

                SqlParameter par3 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
                par3.Direction = ParameterDirection.Input;
                par3.Value = UsuarioId;

                object n = cmd.ExecuteScalar();
                if (n != null)
                {
                    rpta = n.ToString();
                }
            }
            return (rpta);
        }

		public string ListarAutorizacionContratoDetalle(SqlConnection con,string id,int opcion)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoHistorialAutorizarListar", con);
				cmd.CommandType = CommandType.StoredProcedure;

				SqlParameter par1 = cmd.Parameters.Add("@Tabla", SqlDbType.VarChar,200);
				par1.Direction = ParameterDirection.Input;
				par1.Value = (opcion == 1 ? "MedicoContratoDetalle" : "MedicoContrato");

				SqlParameter par2 = cmd.Parameters.Add("@RegistroId", SqlDbType.VarChar,20);
				par2.Direction = ParameterDirection.Input;
				par2.Value = id;

				object n = cmd.ExecuteScalar();
				if (n != null)
				{
					rpta = n.ToString();
				}
			
			return (rpta);
		}

		public string adicionarContratoDescuento(SqlConnection con, beContratoDescuento obeContratoDescuento)
		{
			string id = "-1";
			SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoGrabar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeContratoDescuento.MedicoContratoDetalleId;

			SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeContratoDescuento.MedicoContratoId;

			SqlParameter par3 = cmd.Parameters.Add("@AplicaId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeContratoDescuento.AplicaId;

			SqlParameter par4 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeContratoDescuento.DescuentoId;

			SqlParameter par5 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeContratoDescuento.TipoDescuentoId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoMontoId", SqlDbType.VarChar,5);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeContratoDescuento.TipoMontoId;

			SqlParameter par7 = cmd.Parameters.Add("@Importe", SqlDbType.Decimal);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeContratoDescuento.Importe;

			SqlParameter par8 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeContratoDescuento.FechaInicio;

			SqlParameter par9 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeContratoDescuento.FechaFin;

			SqlParameter par10 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeContratoDescuento.UsuarioId;


			object n = cmd.ExecuteScalar();
			if (n != null) {
				id = n.ToString(); 
			}
			return id;
		}

		public List<beContratoProduccionDescuentoVista> contratoProduccionFijaDescuentoListar(SqlConnection con, int id)
		{
			List<beContratoProduccionDescuentoVista> lblbeContratoProduccionDescuentoVista = null;
			beContratoProduccionDescuentoVista obeContratoProduccionDescuentoVista = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionFijaDescuentoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lblbeContratoProduccionDescuentoVista = new List<beContratoProduccionDescuentoVista>();
				int posMedicoContratoDetalleId = drd.GetOrdinal("MedicoContratoDetalleId");
				int posSecuencia = drd.GetOrdinal("Secuencia");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
				int posTipoMontoId = drd.GetOrdinal("TipoMontoId");
				int posImporte = drd.GetOrdinal("Importe");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posDescuentoId = drd.GetOrdinal("DescuentoId");
				int posAplicaId = drd.GetOrdinal("AplicaId");

				while (drd.Read())
				{
					obeContratoProduccionDescuentoVista = new beContratoProduccionDescuentoVista();
					obeContratoProduccionDescuentoVista.medicoContratoDetalleId = drd.GetString(posMedicoContratoDetalleId);
					obeContratoProduccionDescuentoVista.secuencia = drd.GetString(posSecuencia);
					obeContratoProduccionDescuentoVista.descripcion = drd.GetString(posDescripcion);
					obeContratoProduccionDescuentoVista.tipoDescuentoId = drd.GetString(posTipoDescuentoId);
					obeContratoProduccionDescuentoVista.tipoMontoId = drd.GetString(posTipoMontoId);
					obeContratoProduccionDescuentoVista.importe = drd.GetString(posImporte);
					obeContratoProduccionDescuentoVista.estadoRegistro = drd.GetString(posEstadoRegistro);
					obeContratoProduccionDescuentoVista.descuentoId= drd.GetString(posDescuentoId);
					obeContratoProduccionDescuentoVista.AplicaId = drd.GetString(posAplicaId);
					lblbeContratoProduccionDescuentoVista.Add(obeContratoProduccionDescuentoVista);				
				}
				drd.Close();
			}
			return lblbeContratoProduccionDescuentoVista;
		}

		public int contratoProduccionFijaDescuentoActualizarEstado(SqlConnection con, int usuarioId, int MedicoContratoDetalleId, string estado)
		{
			int id = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoProduccionDescuentoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
			cmd.Parameters.AddWithValue("@MedicoContratoDetalleId", MedicoContratoDetalleId);
			cmd.Parameters.AddWithValue("@EstadoRegistro", estado);

			int n = cmd.ExecuteNonQuery();
			if (n > 0) id = n;
			return (id);
		}



	}
}
