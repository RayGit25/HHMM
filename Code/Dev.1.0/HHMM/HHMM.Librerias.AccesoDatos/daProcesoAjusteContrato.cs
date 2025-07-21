using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using General.Librerias.EntidadesNegocio;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
	public class daProcesoAjusteContrato
	{
		public List<beProcesoAjusteContrato> ProcesoAjusteContratoListar(SqlConnection con, string su, int idMedico, int idEmpresa, string fInicio, string fFin)
		{
			beProcesoAjusteContrato obeProcesoAjusteContrato = null;
			List<beProcesoAjusteContrato> lbeProcesoAjusteContrato = null;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@PersonaId", idMedico);
			cmd.Parameters.AddWithValue("@EmpresaId", idEmpresa);
			cmd.Parameters.AddWithValue("@FechaInicio", fInicio);
			cmd.Parameters.AddWithValue("@FechaFin", fFin);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContrato = new List<beProcesoAjusteContrato>();
				int posProcesoAjusteContratoId1 = drd.GetOrdinal("ProcesoAjusteContratoId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posFechaHoraProceso = drd.GetOrdinal("FechaHoraProceso");
				int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
				int posTotalRegistros = drd.GetOrdinal("TotalRegistros");
				int posCantidadAjustes = drd.GetOrdinal("CantidadAjustes");
				int posTotalAjuste = drd.GetOrdinal("TotalAjuste");

				while (drd.Read())
				{
					obeProcesoAjusteContrato = new beProcesoAjusteContrato();
					obeProcesoAjusteContrato.ProcesoAjusteContratoId = drd.GetInt32(posProcesoAjusteContratoId1);
					obeProcesoAjusteContrato.Descripcion = drd.GetString(posDescripcion);
					obeProcesoAjusteContrato.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeProcesoAjusteContrato.FechaHoraProceso = drd.GetDateTime(posFechaHoraProceso);
					obeProcesoAjusteContrato.CodigoUsuario = drd.GetString(posCodigoUsuario);
					obeProcesoAjusteContrato.TotalRegistros = drd.GetInt32(posTotalRegistros);
					obeProcesoAjusteContrato.CantidadAjustes = drd.GetInt32(posCantidadAjustes);
					obeProcesoAjusteContrato.TotalAjuste = drd.GetDecimal(posTotalAjuste);
					lbeProcesoAjusteContrato.Add(obeProcesoAjusteContrato);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContrato;
		}

		public List<beProcesoAjusteContratoDetalle2> ProcesoAjusteContratoListar2(SqlConnection con, int id)
		{
			beProcesoAjusteContratoDetalle2 obeProcesoAjusteContratoDetalle = null;
			List<beProcesoAjusteContratoDetalle2> lbeProcesoAjusteContratoDetalle = null;
			SqlCommand cmd = new SqlCommand("uspProcesoDetalleListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoId", id);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContratoDetalle = new List<beProcesoAjusteContratoDetalle2>();
				int posTipoEntidad = drd.GetOrdinal("TipoEntidad");
				int posReplicaOrdenAtencionId = drd.GetOrdinal("ReplicaOrdenAtencionId");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posComponente = drd.GetOrdinal("Componente");
				int posImporteProvisionado = drd.GetOrdinal("ImporteProvisionado");
				int posCalculado = drd.GetOrdinal("Calculado");
				int posDiferencia = drd.GetOrdinal("Diferencia");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posServicio = drd.GetOrdinal("Servicio");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posObservacion = drd.GetOrdinal("Observacion");
				while (drd.Read())
				{
					obeProcesoAjusteContratoDetalle = new beProcesoAjusteContratoDetalle2();
					obeProcesoAjusteContratoDetalle.TipoEntidad = drd.GetString(posTipoEntidad);
					obeProcesoAjusteContratoDetalle.ReplicaOrdenAtencionId = drd.GetInt32(posReplicaOrdenAtencionId);
					obeProcesoAjusteContratoDetalle.CodigoOA = drd.GetString(posCodigoOA);
					obeProcesoAjusteContratoDetalle.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeProcesoAjusteContratoDetalle.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeProcesoAjusteContratoDetalle.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeProcesoAjusteContratoDetalle.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeProcesoAjusteContratoDetalle.Componente = drd.GetString(posComponente);
					obeProcesoAjusteContratoDetalle.ImporteProvisionado = drd.GetDecimal(posImporteProvisionado);
					obeProcesoAjusteContratoDetalle.Calculado = drd.GetDecimal(posCalculado);
					obeProcesoAjusteContratoDetalle.Diferencia = drd.GetDecimal(posDiferencia);
					obeProcesoAjusteContratoDetalle.Medico = drd.GetString(posMedico);
					obeProcesoAjusteContratoDetalle.Empresa = drd.GetString(posEmpresa);
					obeProcesoAjusteContratoDetalle.Servicio = drd.GetString(posServicio);
					obeProcesoAjusteContratoDetalle.Especialidad = drd.GetString(posEspecialidad);
					obeProcesoAjusteContratoDetalle.Observacion = drd.GetString(posObservacion);
					lbeProcesoAjusteContratoDetalle.Add(obeProcesoAjusteContratoDetalle);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContratoDetalle;
		}
		//
		public beProcesoAjusteContratoListas ProcesoAjusteContratoListas(SqlConnection con, string su)
		{
			beProcesoAjusteContratoListas obeProcesoAjusteContratoListas = new beProcesoAjusteContratoListas();
			List<beCampoCadenaCorto> lPeriodo = null;
			List<beCampoCadenaCorto> lServicio = null;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lPeriodo = new List<beCampoCadenaCorto>();
				int posPeriodo = drd.GetOrdinal("Periodo");

				beCampoCadenaCorto obeCampoCadenaCorto;
				while (drd.Read())
				{
					obeCampoCadenaCorto = new beCampoCadenaCorto();
					obeCampoCadenaCorto.Campo1 = drd.GetString(posPeriodo);
					obeCampoCadenaCorto.Campo2 = obeCampoCadenaCorto.Campo1;

					lPeriodo.Add(obeCampoCadenaCorto);
				}
				obeProcesoAjusteContratoListas.listaPeriodo = lPeriodo;
				if (drd.NextResult())
				{
					lServicio = new List<beCampoCadenaCorto>();
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion = drd.GetOrdinal("Descripcion");

					beCampoCadenaCorto obeCampoCadenaCorto2; ;
					while (drd.Read())
					{
						obeCampoCadenaCorto2 = new beCampoCadenaCorto();
						obeCampoCadenaCorto2.Campo1 = drd.GetInt32(posPeriodo).ToString();
						obeCampoCadenaCorto2.Campo2 = drd.GetString(posDescripcion);

						lServicio.Add(obeCampoCadenaCorto2);
					}
					obeProcesoAjusteContratoListas.listaServicio = lServicio;
				}

				drd.Close();
			}
			return obeProcesoAjusteContratoListas;
		}
		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetalleListar(SqlConnection con, string su, string periodoInicial, string periodoFinal, int idMedico, int idEmpresa, string fInicio, string fFin, int idServicio, string idComponente)
		{
			beProcesoAjusteContratoDetalle obeProcesoAjusteContratoDetalle = null;
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoBuscarOA", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@PeriodoInicial", periodoInicial);
			cmd.Parameters.AddWithValue("@PeriodoFinal", periodoFinal);
			cmd.Parameters.AddWithValue("@PersonaId", idMedico);
			cmd.Parameters.AddWithValue("@EmpresaId", idEmpresa);
			cmd.Parameters.AddWithValue("@FechaAtencionInicio", fInicio);
			cmd.Parameters.AddWithValue("@FechaAtencionFin", fFin);
			cmd.Parameters.AddWithValue("@ServicioId", idServicio);
			cmd.Parameters.AddWithValue("@ComponenteId", idComponente);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContratoDetalle = new List<beProcesoAjusteContratoDetalle>();
				int posTipoEntidad = drd.GetOrdinal("TipoEntidad");
				int posProcesoOrdenAtencionId = drd.GetOrdinal("ProcesoOrdenAtencionId");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posComponente = drd.GetOrdinal("Componente");
				int posImporteProvisionado = drd.GetOrdinal("ImporteProvisionado");
				int posCalculado = drd.GetOrdinal("Calculado");
				int posDiferencia = drd.GetOrdinal("Diferencia");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posServicio = drd.GetOrdinal("Servicio");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posObservacion = drd.GetOrdinal("Observacion");
				while (drd.Read())
				{
					obeProcesoAjusteContratoDetalle = new beProcesoAjusteContratoDetalle();
					obeProcesoAjusteContratoDetalle.TipoEntidad = drd.GetString(posTipoEntidad);
					obeProcesoAjusteContratoDetalle.ProcesoOrdenAtencionId = drd.GetInt32(posProcesoOrdenAtencionId);
					obeProcesoAjusteContratoDetalle.CodigoOA = drd.GetString(posCodigoOA);
					obeProcesoAjusteContratoDetalle.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeProcesoAjusteContratoDetalle.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeProcesoAjusteContratoDetalle.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeProcesoAjusteContratoDetalle.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeProcesoAjusteContratoDetalle.Componente = drd.GetString(posComponente);
					obeProcesoAjusteContratoDetalle.ImporteProvisionado = drd.GetDecimal(posImporteProvisionado);
					obeProcesoAjusteContratoDetalle.Calculado = drd.GetDecimal(posCalculado);
					obeProcesoAjusteContratoDetalle.Diferencia = drd.GetDecimal(posDiferencia);
					obeProcesoAjusteContratoDetalle.Medico = drd.GetString(posMedico);
					obeProcesoAjusteContratoDetalle.Empresa = drd.GetString(posEmpresa);
					obeProcesoAjusteContratoDetalle.Servicio = drd.GetString(posServicio);
					obeProcesoAjusteContratoDetalle.Especialidad = drd.GetString(posEspecialidad);
					obeProcesoAjusteContratoDetalle.Observacion = drd.GetString(posObservacion);
					lbeProcesoAjusteContratoDetalle.Add(obeProcesoAjusteContratoDetalle);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContratoDetalle;
		}

		public List<beProcesoAjusteContratoDetalle2> ProcesoAjusteContratoDetalleListar2(SqlConnection con, string su, string oa, int idMedico, int idEmpresa, string fInicio, string fFin, int idServicio, string idComponente, int tipoadmision)
		{
			beProcesoAjusteContratoDetalle2 obeProcesoAjusteContratoDetalle = null;
			List<beProcesoAjusteContratoDetalle2> lbeProcesoAjusteContratoDetalle = null;
			SqlCommand cmd = new SqlCommand("uspProcesoDetalleBuscarOA", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@CodigoOA", oa);
			cmd.Parameters.AddWithValue("@PersonaId", idMedico);
			cmd.Parameters.AddWithValue("@EmpresaId", idEmpresa);
			cmd.Parameters.AddWithValue("@FechaAtencionInicio", fInicio);
			cmd.Parameters.AddWithValue("@FechaAtencionFin", fFin);
			cmd.Parameters.AddWithValue("@ServicioId", idServicio);
			cmd.Parameters.AddWithValue("@ComponenteId", idComponente);
			cmd.Parameters.AddWithValue("@TipoAdmisionId", tipoadmision);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContratoDetalle = new List<beProcesoAjusteContratoDetalle2>();
				int posTipoEntidad = drd.GetOrdinal("TipoEntidad");
				int posReplicaOrdenAtencionId = drd.GetOrdinal("ReplicaOrdenAtencionId");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posComponente = drd.GetOrdinal("Componente");
				int posImporteProvisionado = drd.GetOrdinal("ImporteProvisionado");
				int posCalculado = drd.GetOrdinal("Calculado");
				int posDiferencia = drd.GetOrdinal("Diferencia");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posServicio = drd.GetOrdinal("Servicio");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posObservacion = drd.GetOrdinal("Observacion");
				while (drd.Read())
				{
					obeProcesoAjusteContratoDetalle = new beProcesoAjusteContratoDetalle2();
					obeProcesoAjusteContratoDetalle.TipoEntidad = drd.GetString(posTipoEntidad);
					obeProcesoAjusteContratoDetalle.ReplicaOrdenAtencionId = drd.GetInt32(posReplicaOrdenAtencionId);
					obeProcesoAjusteContratoDetalle.CodigoOA = drd.GetString(posCodigoOA);
					obeProcesoAjusteContratoDetalle.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeProcesoAjusteContratoDetalle.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeProcesoAjusteContratoDetalle.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeProcesoAjusteContratoDetalle.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeProcesoAjusteContratoDetalle.Componente = drd.GetString(posComponente);
					obeProcesoAjusteContratoDetalle.ImporteProvisionado = drd.GetDecimal(posImporteProvisionado);
					obeProcesoAjusteContratoDetalle.Calculado = drd.GetDecimal(posCalculado);
					obeProcesoAjusteContratoDetalle.Diferencia = drd.GetDecimal(posDiferencia);
					obeProcesoAjusteContratoDetalle.Medico = drd.GetString(posMedico);
					obeProcesoAjusteContratoDetalle.Empresa = drd.GetString(posEmpresa);
					obeProcesoAjusteContratoDetalle.Servicio = drd.GetString(posServicio);
					obeProcesoAjusteContratoDetalle.Especialidad = drd.GetString(posEspecialidad);
					obeProcesoAjusteContratoDetalle.Observacion = drd.GetString(posObservacion);
					lbeProcesoAjusteContratoDetalle.Add(obeProcesoAjusteContratoDetalle);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContratoDetalle;
		}


		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetalleImportarListar(SqlConnection con, string data, string tipoproceso)
		{
			beProcesoAjusteContratoDetalle obeProcesoAjusteContratoDetalle = null;
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			SqlCommand cmd = new SqlCommand("uspProcesoSeleccionar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Lista", data);
			cmd.Parameters.AddWithValue("@TipoProceso", tipoproceso);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContratoDetalle = new List<beProcesoAjusteContratoDetalle>();
				int posTipoEntidad = drd.GetOrdinal("TipoEntidad");
				int posProcesoOrdenAtencionId = drd.GetOrdinal("ProcesoOrdenAtencionId");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posComponente = drd.GetOrdinal("Componente");
				int posImporteProvisionado = drd.GetOrdinal("ImporteProvisionado");
				int posCalculado = drd.GetOrdinal("Calculado");
				int posDiferencia = drd.GetOrdinal("Diferencia");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posServicio = drd.GetOrdinal("Servicio");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posObservacion = drd.GetOrdinal("Observacion");
				while (drd.Read())
				{
					obeProcesoAjusteContratoDetalle = new beProcesoAjusteContratoDetalle();
					obeProcesoAjusteContratoDetalle.TipoEntidad = drd.GetString(posTipoEntidad);
					obeProcesoAjusteContratoDetalle.ProcesoOrdenAtencionId = drd.GetInt32(posProcesoOrdenAtencionId);
					obeProcesoAjusteContratoDetalle.CodigoOA = drd.GetString(posCodigoOA);
					obeProcesoAjusteContratoDetalle.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeProcesoAjusteContratoDetalle.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeProcesoAjusteContratoDetalle.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeProcesoAjusteContratoDetalle.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeProcesoAjusteContratoDetalle.Componente = drd.GetString(posComponente);
					obeProcesoAjusteContratoDetalle.ImporteProvisionado = drd.GetDecimal(posImporteProvisionado);
					obeProcesoAjusteContratoDetalle.Calculado = drd.GetDecimal(posCalculado);
					obeProcesoAjusteContratoDetalle.Diferencia = drd.GetDecimal(posDiferencia);
					obeProcesoAjusteContratoDetalle.Medico = drd.GetString(posMedico);
					obeProcesoAjusteContratoDetalle.Empresa = drd.GetString(posEmpresa);
					obeProcesoAjusteContratoDetalle.Servicio = drd.GetString(posServicio);
					obeProcesoAjusteContratoDetalle.Especialidad = drd.GetString(posEspecialidad);
					obeProcesoAjusteContratoDetalle.Observacion = drd.GetString(posObservacion);
					lbeProcesoAjusteContratoDetalle.Add(obeProcesoAjusteContratoDetalle);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContratoDetalle;
		}



		public int ProcesoAjusteContratoDetalleAdicionar(SqlConnection con, string su, string descripcion, int usuarioId, string data)
		{
			int rpta = -1;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@Descripcion", descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
			cmd.Parameters.AddWithValue("@Lista", data);

			object dt = cmd.ExecuteScalar();
			if (dt != null)
			{
				rpta = int.Parse(dt.ToString());
			}

			return rpta;
		}

		public int ProcesoAjusteContratoDetalleAdicionar2(SqlConnection con, int id, int usuarioId, string data)
		{
			int rpta = -1;
			SqlCommand cmd = new SqlCommand("uspProcesoDetalleActualizarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoId", id);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
			cmd.Parameters.AddWithValue("@Lista", data);

			object dt = cmd.ExecuteScalar();
			if (dt != null)
			{
				rpta = int.Parse(dt.ToString());
			}

			return rpta;
		}

		public int ProcesoAjusteContratoDetalleActualizar(SqlConnection con, int ProcesoAjusteContratoId, string su, string descripcion, int usuarioId, string data)
		{
			int rpta = -1;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoAjusteContratoId", ProcesoAjusteContratoId);
			cmd.Parameters.AddWithValue("@SucursalId", su);
			cmd.Parameters.AddWithValue("@Descripcion", descripcion);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
			cmd.Parameters.AddWithValue("@Lista", data);

			object dt = cmd.ExecuteScalar();
			if (dt != null)
			{
				rpta = int.Parse(dt.ToString());
			}

			return rpta;
		}
		public int ProcesoAjusteContratoActualizarEstado(SqlConnection con, int ProcesoAjusteContratoId, string Estado, int usuarioId)
		{
			int rpta = -1;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoAjusteContratoId", ProcesoAjusteContratoId);
			cmd.Parameters.AddWithValue("@EstadoRegistro", Estado);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);

			rpta = cmd.ExecuteNonQuery();
			return rpta;
		}

		public string ProcesoAjusteContratoCalcular(SqlConnection con, int ProcesoAjusteContratoId, int usuarioId, string sucursal, string lista)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoCalcular", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoAjusteContratoId", ProcesoAjusteContratoId);
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			cmd.Parameters.AddWithValue("@ListaMedico", lista);
			object d = cmd.ExecuteScalar();
			if (d != null)
			{
				rpta = d.ToString();
			}
			return rpta;
		}
		public string ProcesoAjusteExcelValidar(SqlConnection con, string lista, string tipoproceso, int id)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspProcesoExcelValidar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Lista", lista);
			cmd.Parameters.AddWithValue("@TipoProceso", tipoproceso);
			cmd.Parameters.AddWithValue("@ProcesoId", id);
			object d = cmd.ExecuteScalar();
			if (d != null)
			{
				rpta = d.ToString();
			}
			return rpta;
		}
		public List<beProcesoAjusteContratoDetalle> ProcesoAjusteContratoDetallePorId(SqlConnection con, int id)
		{
			beProcesoAjusteContratoDetalle obeProcesoAjusteContratoDetalle = null;
			List<beProcesoAjusteContratoDetalle> lbeProcesoAjusteContratoDetalle = null;
			SqlCommand cmd = new SqlCommand("uspProcesoAjusteContratoListarPorId", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ProcesoAjusteContratoId", id);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{

				lbeProcesoAjusteContratoDetalle = new List<beProcesoAjusteContratoDetalle>();
				int posTipoEntidad = drd.GetOrdinal("TipoEntidad");
				int posProcesoOrdenAtencionId = drd.GetOrdinal("ProcesoOrdenAtencionId");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posComponente = drd.GetOrdinal("Componente");
				int posImporteProvisionado = drd.GetOrdinal("ImporteProvisionado");
				int posCalculado = drd.GetOrdinal("Calculado");
				int posDiferencia = drd.GetOrdinal("Diferencia");
				int posMedico = drd.GetOrdinal("Medico");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posServicio = drd.GetOrdinal("Servicio");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posObservacion = drd.GetOrdinal("Observacion");
				while (drd.Read())
				{
					obeProcesoAjusteContratoDetalle = new beProcesoAjusteContratoDetalle();
					obeProcesoAjusteContratoDetalle.TipoEntidad = drd.GetString(posTipoEntidad);
					obeProcesoAjusteContratoDetalle.ProcesoOrdenAtencionId = drd.GetInt32(posProcesoOrdenAtencionId);
					obeProcesoAjusteContratoDetalle.CodigoOA = drd.GetString(posCodigoOA);
					obeProcesoAjusteContratoDetalle.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeProcesoAjusteContratoDetalle.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeProcesoAjusteContratoDetalle.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeProcesoAjusteContratoDetalle.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeProcesoAjusteContratoDetalle.Componente = drd.GetString(posComponente);
					obeProcesoAjusteContratoDetalle.ImporteProvisionado = drd.GetDecimal(posImporteProvisionado);
					obeProcesoAjusteContratoDetalle.Calculado = drd.GetDecimal(posCalculado);
					obeProcesoAjusteContratoDetalle.Diferencia = drd.GetDecimal(posDiferencia);
					obeProcesoAjusteContratoDetalle.Medico = drd.GetString(posMedico);
					obeProcesoAjusteContratoDetalle.Empresa = drd.GetString(posEmpresa);
					obeProcesoAjusteContratoDetalle.Servicio = drd.GetString(posServicio);
					obeProcesoAjusteContratoDetalle.Especialidad = drd.GetString(posEspecialidad);
					obeProcesoAjusteContratoDetalle.Observacion = drd.GetString(posObservacion);
					lbeProcesoAjusteContratoDetalle.Add(obeProcesoAjusteContratoDetalle);
				}

				drd.Close();
			}
			return lbeProcesoAjusteContratoDetalle;
		}
	}
}
