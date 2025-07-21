using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daOrdenAtencion
	{
		public beOrdenAtencionListas listas(SqlConnection con, string sucursalId)
		{
			beOrdenAtencionListas obeOrdenAtencionListas = new beOrdenAtencionListas();

			List<beCampoEntero> ListaTipoAtencion = null;
			List<beCampoEntero> ListaServicio = null;
			List<beCampoEntero> ListaEspecialidad = null;
			List<beCampoEntero> ListaEstado1 = null;
			List<beCampoEntero> ListaEstado2 = null;
			List<beCampoCadenaCorto> lbeMensaje = null;

			SqlCommand cmd = new SqlCommand("uspReplicaOrdenAtencionListas", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", sucursalId);
			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{

				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posDescripcionCorta = drd.GetOrdinal("DescripcionCorta");
				ListaTipoAtencion = new List<beCampoEntero>();
				beCampoEntero oTipoAtencion;
				while (drd.Read())
				{
					oTipoAtencion = new beCampoEntero();
					oTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
					oTipoAtencion.campo2 = drd.GetString(posDescripcionCorta);
					ListaTipoAtencion.Add(oTipoAtencion);
				}
				obeOrdenAtencionListas.ListaTipoAtencion = ListaTipoAtencion;
				if (drd.NextResult())
				{
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					ListaServicio = new List<beCampoEntero>();
					beCampoEntero oServicio;
					while (drd.Read())
					{
						oServicio = new beCampoEntero();
						oServicio.campo1 = drd.GetInt32(posServicioId);
						oServicio.campo2 = drd.GetString(posDescripcion);
						ListaServicio.Add(oServicio);
					}
					obeOrdenAtencionListas.ListaServicio = ListaServicio;
				}
				if (drd.NextResult())
				{
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion = drd.GetOrdinal("Descripcion");
					ListaEspecialidad = new List<beCampoEntero>();
					beCampoEntero obeEspecialidad;
					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion);
						ListaEspecialidad.Add(obeEspecialidad);
					}
					obeOrdenAtencionListas.ListaEspecialidad = ListaEspecialidad;
				}
				if (drd.NextResult())
				{
					int posEstadoId1 = drd.GetOrdinal("EstadoId");
					int posEstadoNombre1 = drd.GetOrdinal("EstadoNombre");
					ListaEstado1 = new List<beCampoEntero>();
					beCampoEntero obeEstado1;
					while (drd.Read())
					{
						obeEstado1 = new beCampoEntero();
						obeEstado1.campo1 = drd.GetInt32(posEstadoId1);
						obeEstado1.campo2 = drd.GetString(posEstadoNombre1);
						ListaEstado1.Add(obeEstado1);
					}
					obeOrdenAtencionListas.ListaEstado1 = ListaEstado1;
				}
				if (drd.NextResult())
				{
					int posEstadoId2 = drd.GetOrdinal("EstadoId");
					int posEstadoNombre2 = drd.GetOrdinal("EstadoNombre");
					ListaEstado2 = new List<beCampoEntero>();
					beCampoEntero obeEstado2;
					while (drd.Read())
					{
						obeEstado2 = new beCampoEntero();
						obeEstado2.campo1 = drd.GetInt32(posEstadoId2);
						obeEstado2.campo2 = drd.GetString(posEstadoNombre2);
						ListaEstado2.Add(obeEstado2);
					}
					obeOrdenAtencionListas.ListaEstado2 = ListaEstado2;
				}
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
					obeOrdenAtencionListas.ListaMensajes = lbeMensaje;
				}
				drd.Close();
			}
			return (obeOrdenAtencionListas);
		}
		public beOrdenAtencionVista listar(SqlConnection con, beOrdenAtencionFiltro obeOrdenAtencionFiltro)
		{
			beOrdenAtencionVista obeOrdenAtencionVista = null;
			List<beOrdenAtencion> lbeOrdenAtencion1 = null;
			SqlCommand cmd = new SqlCommand("uspReplicaOrdenAtencionListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", obeOrdenAtencionFiltro.SucursalId);
			cmd.Parameters.AddWithValue("@TipoEntidad", obeOrdenAtencionFiltro.TipoEntidad);
			cmd.Parameters.AddWithValue("@TipoAtencionId", obeOrdenAtencionFiltro.TipoAtencion);
			cmd.Parameters.AddWithValue("@ServicioId", obeOrdenAtencionFiltro.ServicioId);
			cmd.Parameters.AddWithValue("@EspecialidadId", obeOrdenAtencionFiltro.EspecialidadId);
			cmd.Parameters.AddWithValue("@Anio", obeOrdenAtencionFiltro.Anio);
			cmd.Parameters.AddWithValue("@Mes", obeOrdenAtencionFiltro.Mes);
			cmd.CommandTimeout = 0;
			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{
				obeOrdenAtencionVista = new beOrdenAtencionVista();
				lbeOrdenAtencion1 = new List<beOrdenAtencion>();
				int posIdTabla = drd.GetOrdinal("IdTabla");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posTipoComponente = drd.GetOrdinal("TipoComponente");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posIdEspecialidad = drd.GetOrdinal("IdEspecialidad");
				int posServicioId = drd.GetOrdinal("ServicioId");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posMedico = drd.GetOrdinal("Medico");
				int posMedicoSecundario = drd.GetOrdinal("MedicoSecundario");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posCostoPrestacion = drd.GetOrdinal("CostoPrestacion");
				int posTipoProceso = drd.GetOrdinal("TipoProceso");
				int posDescripcionEstadoPrestacion = drd.GetOrdinal("DescripcionEstadoPrestacion");

				int posObservacionTX = drd.GetOrdinal("ObservacionTX");
				int posIdTransaccion= drd.GetOrdinal("IdTransaccion");
				int posDescripcionEstadoTX = drd.GetOrdinal("DescripcionEstadoTX");
				int posAlmacenDestino = drd.GetOrdinal("AlmacenDestino");
				int posLineaFamilia = drd.GetOrdinal("LineaFamilia");
				int posFamilia = drd.GetOrdinal("Familia");

				int posFechaHoraMigracion = drd.GetOrdinal("FechaHoraMigracion");

				int posFechaHoraCreacion= drd.GetOrdinal("FechaHoraCreacion");
				int posUsuarioCreacion= drd.GetOrdinal("UsuarioCreacion");

				int posFechaHoraModificacion = drd.GetOrdinal("FechaHoraModificacion");
				int posUsuarioModificacion = drd.GetOrdinal("UsuarioModificacion");
				int posIndicadorModificado = drd.GetOrdinal("IndicadorModificado");

				int posProcesoId = drd.GetOrdinal("ProcesoId");
				beOrdenAtencion obeOrdenAtencion;
				while (drd.Read())
				{
					obeOrdenAtencion = new beOrdenAtencion();
					obeOrdenAtencion.IdTabla = drd.GetInt32(posIdTabla);
					obeOrdenAtencion.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeOrdenAtencion.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeOrdenAtencion.CodigoOA = drd.GetString(posCodigoOA);
					obeOrdenAtencion.TipoComponente = drd.GetString(posTipoComponente);
					obeOrdenAtencion.Prestacion = drd.GetString(posPrestacion);
					obeOrdenAtencion.IdEspecialidad = drd.GetInt32(posIdEspecialidad);
					obeOrdenAtencion.ServicioId = drd.GetInt32(posServicioId);
					obeOrdenAtencion.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeOrdenAtencion.Medico = drd.GetString(posMedico);
					obeOrdenAtencion.MedicoSecundario = drd.GetString(posMedicoSecundario);
					obeOrdenAtencion.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeOrdenAtencion.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obeOrdenAtencion.Cantidad = drd.GetDecimal(posCantidad);
					obeOrdenAtencion.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obeOrdenAtencion.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obeOrdenAtencion.CostoPrestacion = drd.GetDecimal(posCostoPrestacion);
					obeOrdenAtencion.TipoProceso = drd.GetString(posTipoProceso);
					obeOrdenAtencion.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion);

					obeOrdenAtencion.ObservacionTX = drd.GetString(posObservacionTX);
					obeOrdenAtencion.IdTransaccion = drd.GetInt32(posIdTransaccion);
					obeOrdenAtencion.DescripcionEstadoTX = drd.GetString(posDescripcionEstadoTX);
					obeOrdenAtencion.AlmacenDestino=drd.GetString(posAlmacenDestino);
					obeOrdenAtencion.LineaFamilia=drd.GetString(posLineaFamilia);
					obeOrdenAtencion.Familia=drd.GetString(posFamilia);

					obeOrdenAtencion.FechaHoraMigracion = drd.GetDateTime(posFechaHoraMigracion);

					obeOrdenAtencion.FechaHoraCreacion=drd.GetDateTime(posFechaHoraCreacion);
					obeOrdenAtencion.UsuarioCreacion=drd.GetString(posUsuarioCreacion);


					obeOrdenAtencion.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion);
					obeOrdenAtencion.UsuarioModificacion = drd.GetString(posUsuarioModificacion);
					obeOrdenAtencion.ProcesoId = drd.GetInt32(posProcesoId);
					obeOrdenAtencion.IndicadorModificado = drd.GetBoolean(posIndicadorModificado);
					lbeOrdenAtencion1.Add(obeOrdenAtencion);
				}
				obeOrdenAtencionVista.ListaOrdenAtencion1 = lbeOrdenAtencion1;
				List<beOrdenAtencion> lbeOrdenAtencion2 = new List<beOrdenAtencion>();
				if (drd.NextResult())
				{
					int posIdTabla2 = drd.GetOrdinal("IdTabla");
					int posIdOrdenAtencion2 = drd.GetOrdinal("IdOrdenAtencion");
					int posLineaOrdenAtencion2 = drd.GetOrdinal("LineaOrdenAtencion");
					int posCodigoOA2 = drd.GetOrdinal("CodigoOA");
					int posTipoComponente2 = drd.GetOrdinal("TipoComponente");
					int posPrestacion2 = drd.GetOrdinal("Prestacion");
					int posIdEspecialidad2 = drd.GetOrdinal("IdEspecialidad");
					int posServicioId2 = drd.GetOrdinal("ServicioId");
					int posTipoAtencionId2 = drd.GetOrdinal("TipoAtencionId");
					int posMedico2 = drd.GetOrdinal("Medico");
					int posMedicoSecundario2 = drd.GetOrdinal("MedicoSecundario");
					int posFechaAtencionPrestacion2 = drd.GetOrdinal("FechaAtencionPrestacion");
					int posFechaInicioOA2 = drd.GetOrdinal("FechaInicioOA");
					int posCantidad2 = drd.GetOrdinal("Cantidad");
					int posPrecioUnitarioPrestacion2 = drd.GetOrdinal("PrecioUnitarioPrestacion");
					int posMontoImponiblePrestacion2 = drd.GetOrdinal("MontoImponiblePrestacion");
					int posCostoPrestacion2 = drd.GetOrdinal("CostoPrestacion");
					int posTipoProceso2 = drd.GetOrdinal("TipoProceso");
					int posDescripcionEstadoPrestacion2 = drd.GetOrdinal("DescripcionEstadoPrestacion");

					int posObservacionTX2 = drd.GetOrdinal("ObservacionTX");
					int posIdTransaccion2 = drd.GetOrdinal("IdTransaccion");
					int posDescripcionEstadoTX2 = drd.GetOrdinal("DescripcionEstadoTX");
					int posAlmacenDestino2 = drd.GetOrdinal("AlmacenDestino");
					int posLineaFamilia2 = drd.GetOrdinal("LineaFamilia");
					int posFamilia2 = drd.GetOrdinal("Familia");


					int posFechaHoraMigracion2 = drd.GetOrdinal("FechaHoraMigracion");

					int posFechaHoraCreacion2 = drd.GetOrdinal("FechaHoraCreacion");
					int posUsuarioCreacion2 = drd.GetOrdinal("UsuarioCreacion");

					int posFechaHoraModificacion2 = drd.GetOrdinal("FechaHoraModificacion");
					int posUsuarioModificacion2 = drd.GetOrdinal("UsuarioModificacion");
					//int posUsuarioModificacion2 = drd.GetOrdinal("UsuarioModificacion");
					int posIndicadorModificado2 = drd.GetOrdinal("IndicadorModificado");

					int posProcesoId2 = drd.GetOrdinal("ProcesoId");

					beOrdenAtencion obeOrdenAtencion2;
					while (drd.Read())
					{
						obeOrdenAtencion2 = new beOrdenAtencion();
						obeOrdenAtencion2.IdTabla = drd.GetInt32(posIdTabla2);
						obeOrdenAtencion2.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion2);
						obeOrdenAtencion2.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion2);
						obeOrdenAtencion2.CodigoOA = drd.GetString(posCodigoOA2);
						obeOrdenAtencion2.TipoComponente = drd.GetString(posTipoComponente2);
						obeOrdenAtencion2.Prestacion = drd.GetString(posPrestacion2);
						obeOrdenAtencion2.IdEspecialidad = drd.GetInt32(posIdEspecialidad2);
						obeOrdenAtencion2.ServicioId = drd.GetInt32(posServicioId2);
						obeOrdenAtencion2.TipoAtencionId = drd.GetInt32(posTipoAtencionId2);
						obeOrdenAtencion2.Medico = drd.GetString(posMedico2);
						obeOrdenAtencion2.MedicoSecundario = drd.GetString(posMedicoSecundario2);
						obeOrdenAtencion2.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion2);
						obeOrdenAtencion2.FechaInicioOA = drd.GetDateTime(posFechaInicioOA2);
						obeOrdenAtencion2.Cantidad = drd.GetDecimal(posCantidad2);
						obeOrdenAtencion2.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion2);
						obeOrdenAtencion2.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion2);
						obeOrdenAtencion2.CostoPrestacion = drd.GetDecimal(posCostoPrestacion2);
						obeOrdenAtencion2.TipoProceso = drd.GetString(posTipoProceso2);
						obeOrdenAtencion2.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion2);

						obeOrdenAtencion2.ObservacionTX = drd.GetString(posObservacionTX2);
						obeOrdenAtencion2.IdTransaccion = drd.GetInt32(posIdTransaccion2);
						obeOrdenAtencion2.DescripcionEstadoTX = drd.GetString(posDescripcionEstadoTX2);
						obeOrdenAtencion2.AlmacenDestino = drd.GetString(posAlmacenDestino2);
						obeOrdenAtencion2.LineaFamilia = drd.GetString(posLineaFamilia2);
						obeOrdenAtencion2.Familia = drd.GetString(posFamilia2);

						obeOrdenAtencion2.FechaHoraMigracion = drd.GetDateTime(posFechaHoraMigracion2);

						obeOrdenAtencion2.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion2);
						obeOrdenAtencion2.UsuarioCreacion = drd.GetString(posUsuarioCreacion2);

						obeOrdenAtencion2.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion2);
						obeOrdenAtencion2.UsuarioModificacion = drd.GetString(posUsuarioModificacion2);

						obeOrdenAtencion2.ProcesoId = drd.GetInt32(posProcesoId2);

						obeOrdenAtencion2.IndicadorModificado = drd.GetBoolean(posIndicadorModificado2);
						lbeOrdenAtencion2.Add(obeOrdenAtencion2);
					}
					obeOrdenAtencionVista.ListaOrdenAtencion2 = lbeOrdenAtencion2;
					List<beOrdenAtencion> lbeOrdenAtencion3 = new List<beOrdenAtencion>();
					if (drd.NextResult())
					{
						int posIdTabla3 = drd.GetOrdinal("IdTabla");
						int posIdOrdenAtencion3 = drd.GetOrdinal("IdOrdenAtencion");
						int posLineaOrdenAtencion3 = drd.GetOrdinal("LineaOrdenAtencion");
						int posCodigoOA3 = drd.GetOrdinal("CodigoOA");
						int posTipoComponente3 = drd.GetOrdinal("TipoComponente");
						int posPrestacion3 = drd.GetOrdinal("Prestacion");
						int posIdEspecialidad3 = drd.GetOrdinal("IdEspecialidad");
						int posServicioId3 = drd.GetOrdinal("ServicioId");
						int posTipoAtencionId3 = drd.GetOrdinal("TipoAtencionId");
						int posMedico3 = drd.GetOrdinal("Medico");
						int posMedicoSecundario3 = drd.GetOrdinal("MedicoSecundario");
						int posFechaAtencionPrestacion3 = drd.GetOrdinal("FechaAtencionPrestacion");
						int posFechaInicioOA3 = drd.GetOrdinal("FechaInicioOA");
						int posCantidad3 = drd.GetOrdinal("Cantidad");
						int posPrecioUnitarioPrestacion3 = drd.GetOrdinal("PrecioUnitarioPrestacion");
						int posMontoImponiblePrestacion3 = drd.GetOrdinal("MontoImponiblePrestacion");
						int posCostoPrestacion3 = drd.GetOrdinal("CostoPrestacion");
						int posTipoProceso3 = drd.GetOrdinal("TipoProceso");
						int posDescripcionEstadoPrestacion3 = drd.GetOrdinal("DescripcionEstadoPrestacion");

						int posObservacionTX3 = drd.GetOrdinal("ObservacionTX");
						int posIdTransaccion3 = drd.GetOrdinal("IdTransaccion");
						int posDescripcionEstadoTX3 = drd.GetOrdinal("DescripcionEstadoTX");
						int posAlmacenDestino3 = drd.GetOrdinal("AlmacenDestino");
						int posLineaFamilia3 = drd.GetOrdinal("LineaFamilia");
						int posFamilia3 = drd.GetOrdinal("Familia");


						int posFechaHoraMigracion3 = drd.GetOrdinal("FechaHoraMigracion");

						int posFechaHoraCreacion3 = drd.GetOrdinal("FechaHoraCreacion");
						int posUsuarioCreacion3 = drd.GetOrdinal("UsuarioCreacion");


						int posFechaHoraModificacion3 = drd.GetOrdinal("FechaHoraModificacion");
						int posUsuarioModificacion3 = drd.GetOrdinal("UsuarioModificacion");
						int posIndicadorModificado3 = drd.GetOrdinal("IndicadorModificado");

						int posProcesoId3 = drd.GetOrdinal("ProcesoId");

						beOrdenAtencion obeOrdenAtencion3;
						while (drd.Read())
						{
							obeOrdenAtencion3 = new beOrdenAtencion();
							obeOrdenAtencion3.IdTabla = drd.GetInt32(posIdTabla3);
							obeOrdenAtencion3.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion3);
							obeOrdenAtencion3.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion3);
							obeOrdenAtencion3.CodigoOA = drd.GetString(posCodigoOA3);
							obeOrdenAtencion3.TipoComponente = drd.GetString(posTipoComponente3);
							obeOrdenAtencion3.Prestacion = drd.GetString(posPrestacion3);
							obeOrdenAtencion3.IdEspecialidad = drd.GetInt32(posIdEspecialidad3);
							obeOrdenAtencion3.ServicioId = drd.GetInt32(posServicioId3);
							obeOrdenAtencion3.TipoAtencionId = drd.GetInt32(posTipoAtencionId3);
							obeOrdenAtencion3.Medico = drd.GetString(posMedico3);
							obeOrdenAtencion3.MedicoSecundario = drd.GetString(posMedicoSecundario3);
							obeOrdenAtencion3.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion3);
							obeOrdenAtencion3.FechaInicioOA = drd.GetDateTime(posFechaInicioOA3);
							obeOrdenAtencion3.Cantidad = drd.GetDecimal(posCantidad3);
							obeOrdenAtencion3.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion3);
							obeOrdenAtencion3.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion3);
							obeOrdenAtencion3.CostoPrestacion = drd.GetDecimal(posCostoPrestacion3);
							obeOrdenAtencion3.TipoProceso = drd.GetString(posTipoProceso3);
							obeOrdenAtencion3.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion3);

							obeOrdenAtencion3.ObservacionTX = drd.GetString(posObservacionTX3);
							obeOrdenAtencion3.IdTransaccion = drd.GetInt32(posIdTransaccion3);
							obeOrdenAtencion3.DescripcionEstadoTX = drd.GetString(posDescripcionEstadoTX3);
							obeOrdenAtencion3.AlmacenDestino = drd.GetString(posAlmacenDestino3);
							obeOrdenAtencion3.LineaFamilia = drd.GetString(posLineaFamilia3);
							obeOrdenAtencion3.Familia = drd.GetString(posFamilia3);


							obeOrdenAtencion3.FechaHoraMigracion = drd.GetDateTime(posFechaHoraMigracion3);

							obeOrdenAtencion3.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion3);
							obeOrdenAtencion3.UsuarioCreacion = drd.GetString(posUsuarioCreacion3);

							obeOrdenAtencion3.FechaHoraModificacion = drd.GetDateTime(posFechaHoraModificacion3);
							obeOrdenAtencion3.UsuarioModificacion = drd.GetString(posUsuarioModificacion3);
							obeOrdenAtencion3.ProcesoId = drd.GetInt32(posProcesoId3);
							obeOrdenAtencion3.IndicadorModificado = drd.GetBoolean(posIndicadorModificado3);
							lbeOrdenAtencion3.Add(obeOrdenAtencion3);
						}
						obeOrdenAtencionVista.ListaOrdenAtencion3 = lbeOrdenAtencion3;
					}
				}
				drd.Close();
			}
			return (obeOrdenAtencionVista);
		}

		public string actualizarReplicaOrdenAtencion(SqlConnection con, beReplicaOrdenAtencionActualizador obeReplicaOrdenAtencionActualizador, string tipoentidad, int usuarioId)
		{
			string exito = "";
			SqlCommand cmd = new SqlCommand("uspReplicaOrdenAtencionActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 0;

			SqlParameter par0 = cmd.Parameters.Add("@TipoEntidad", SqlDbType.Char, 1);
			par0.Direction = ParameterDirection.Input;
			par0.Value = tipoentidad;

			SqlParameter par1 = cmd.Parameters.Add("@TipoTab", SqlDbType.Char,1);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeReplicaOrdenAtencionActualizador.TipoTab;

			SqlParameter par2 = cmd.Parameters.Add("@ListaId", SqlDbType.VarChar);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeReplicaOrdenAtencionActualizador.ListaId;

			SqlParameter par3 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeReplicaOrdenAtencionActualizador.PersonaId;

			SqlParameter par4 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeReplicaOrdenAtencionActualizador.EspecialidadId;

			SqlParameter par5 = cmd.Parameters.Add("@CostoPrestacion", SqlDbType.Decimal);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeReplicaOrdenAtencionActualizador.CostoPrestacion;

			SqlParameter par6 = cmd.Parameters.Add("@FechaHoraPrestacion", SqlDbType.DateTime);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeReplicaOrdenAtencionActualizador.FechaHoraPrestacion;

			SqlParameter par7 = cmd.Parameters.Add("@PersonaSecundariaId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeReplicaOrdenAtencionActualizador.PersonaSecundariaId;

			SqlParameter par8 = cmd.Parameters.Add("@TipoProceso", SqlDbType.Char,1);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeReplicaOrdenAtencionActualizador.TipoProceso;

			SqlParameter par9 = cmd.Parameters.Add("@EstadoProcedimiento", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeReplicaOrdenAtencionActualizador.EstadoProcedimiento;

			SqlParameter par10 = cmd.Parameters.Add("@EstadoConsultaExterna", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = obeReplicaOrdenAtencionActualizador.EstadoConsultaExterna;

			SqlParameter par11 = cmd.Parameters.Add("@IndicadorHonorario", SqlDbType.Int);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeReplicaOrdenAtencionActualizador.IndicadorHorario;

			SqlParameter par12 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par12.Direction = ParameterDirection.Input;
			par12.Value = usuarioId;

			object n = cmd.ExecuteScalar();
			if (n != null)
			{
				exito = n.ToString();
			}
			return (exito);
		}

		public List<beConsultaOA> listarOADetalle(SqlConnection con, string SucursalId, string OA)
		{
			List<beConsultaOA> lbeConsultaOA = null;
			SqlCommand cmd = new SqlCommand("uspConsultaPorOAListarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", SucursalId);
			cmd.Parameters.AddWithValue("@CodigoOA", OA);

			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				int posPeriodo = drd.GetOrdinal("PeriodoProvision");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				int posSucursal = drd.GetOrdinal("Sucursal");
				int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
				int posEmpresa = drd.GetOrdinal("Empresa");
				int posIdMedico = drd.GetOrdinal("IdMedico");
				int posMedico = drd.GetOrdinal("Medico");
				int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
				int posCodigoOA = drd.GetOrdinal("CodigoOA");
				int posIdOrdenAtencion = drd.GetOrdinal("IdOrdenAtencion");
				int posLineaOrdenAtencion = drd.GetOrdinal("LineaOrdenAtencion");
				int posIdExpediente = drd.GetOrdinal("IdExpediente");
				int posCodigoPrestacion = drd.GetOrdinal("CodigoPrestacion");
				int posPrestacion = drd.GetOrdinal("Prestacion");
				int posPeriodoProduccion = drd.GetOrdinal("PeriodoProduccion");
				int posTipoRegistro = drd.GetOrdinal("TipoRegistro");
				int posFechaAtencionPrestacion = drd.GetOrdinal("FechaAtencionPrestacion");
				int posFechaAtendido = drd.GetOrdinal("FechaAtendido");
				int posFechaTerminado = drd.GetOrdinal("FechaTerminado");
				int posPrecioUnitarioPrestacion = drd.GetOrdinal("PrecioUnitarioPrestacion");
				int posCostoPrestacion = drd.GetOrdinal("CostoPrestacion");
				int posCantidad = drd.GetOrdinal("Cantidad");
				int posMontoImponiblePrestacion = drd.GetOrdinal("MontoImponiblePrestacion");
				int posValorMedida = drd.GetOrdinal("ValorMedida");
				int posTipoValor = drd.GetOrdinal("TipoValor");
				int posValor = drd.GetOrdinal("Valor");
				int posPorcentaje = drd.GetOrdinal("Porcentaje");
				int posParteMedico = drd.GetOrdinal("ParteMedico");
				int posBonificacion = drd.GetOrdinal("Bonificacion");
				int posFechaInicioOA = drd.GetOrdinal("FechaInicioOA");
				int posTipoPaciente = drd.GetOrdinal("TipoPaciente");
				int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
				int posAseguradora = drd.GetOrdinal("Aseguradora");

				int posCodigoContrato = drd.GetOrdinal("CodigoContrato");

				int posServicio = drd.GetOrdinal("Servicio");
				int posModFacturacion = drd.GetOrdinal("ModFacturacion");
				int posEspecialidad = drd.GetOrdinal("Especialidad");
				int posDescripcionEstadoPrestacion = drd.GetOrdinal("DescripcionEstadoPrestacion");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posAjuste = drd.GetOrdinal("Ajuste");
				int posTotalProvision = drd.GetOrdinal("TotalProvision");
				int posPaciente = drd.GetOrdinal("Paciente");
				int posAjusteProcesoId = drd.GetOrdinal("AjusteProcesoId");
				int posIdplanilla = drd.GetOrdinal("Idplanilla");
				int posIdEstadoPlanilla = drd.GetOrdinal("IdEstadoPlanilla");
				int posIndicadorHonorario = drd.GetOrdinal("IndicadorHonorario");

				int posEstadoHospitalizacion = drd.GetOrdinal("EstadoHospitalizacion");
				int posSituacionDetalleHospitalizacion = drd.GetOrdinal("SituacionDetalleHospitalizacion");
				int posIndicadorEliminado = drd.GetOrdinal("IndicadorEliminado");
				int posSituacionDetalleExpediente = drd.GetOrdinal("SituacionDetalleExpediente");


				int posEstadoPlanilla = drd.GetOrdinal("EstadoPlanilla");
				int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
				int posEstadoProvision = drd.GetOrdinal("EstadoProvision");
				int posPlanillaIdWeb = drd.GetOrdinal("PlanillaIdWeb");
				int posEstadoPlanillaWeb = drd.GetOrdinal("EstadoPlanillaWeb");
				lbeConsultaOA = new List<beConsultaOA>();
				beConsultaOA obeConsultaOA;
				while (drd.Read())
				{
					obeConsultaOA = new beConsultaOA();
					obeConsultaOA.Periodo = drd.GetString(posPeriodo);
					obeConsultaOA.SucursalId = drd.GetString(posSucursalId);
					obeConsultaOA.Sucursal = drd.GetString(posSucursal);
					obeConsultaOA.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
					obeConsultaOA.Empresa = drd.GetString(posEmpresa);
					obeConsultaOA.IdMedico = drd.GetInt32(posIdMedico);
					obeConsultaOA.Medico = drd.GetString(posMedico);
					obeConsultaOA.TipoAdmision = drd.GetString(posTipoAdmision);
					obeConsultaOA.CodigoOA = drd.GetString(posCodigoOA);
					obeConsultaOA.IdOrdenAtencion = drd.GetInt32(posIdOrdenAtencion);
					obeConsultaOA.LineaOrdenAtencion = drd.GetInt32(posLineaOrdenAtencion);
					obeConsultaOA.IdExpediente = drd.GetInt32(posIdExpediente);
					obeConsultaOA.CodigoPrestacion = drd.GetString(posCodigoPrestacion);
					obeConsultaOA.Prestacion = drd.GetString(posPrestacion);
					obeConsultaOA.PeriodoProduccion = drd.GetString(posPeriodoProduccion);
					obeConsultaOA.TipoRegistro = drd.GetString(posTipoRegistro);
					obeConsultaOA.FechaAtencionPrestacion = drd.GetDateTime(posFechaAtencionPrestacion);
					obeConsultaOA.FechaAtendido = drd.GetDateTime(posFechaAtendido);
					obeConsultaOA.FechaTerminado = drd.GetDateTime(posFechaTerminado);
					obeConsultaOA.PrecioUnitarioPrestacion = drd.GetDecimal(posPrecioUnitarioPrestacion);
					obeConsultaOA.CostoPrestacion = drd.GetDecimal(posCostoPrestacion);
					obeConsultaOA.Cantidad = drd.GetDecimal(posCantidad);
					obeConsultaOA.MontoImponiblePrestacion = drd.GetDecimal(posMontoImponiblePrestacion);
					obeConsultaOA.ValorMedida = drd.GetDecimal(posValorMedida);
					obeConsultaOA.TipoValor = drd.GetString(posTipoValor);
					obeConsultaOA.Valor = drd.GetDecimal(posValor);
					obeConsultaOA.Porcentaje = drd.GetDecimal(posPorcentaje);
					obeConsultaOA.ParteMedico = drd.GetDecimal(posParteMedico);
					obeConsultaOA.Bonificacion = drd.GetDecimal(posBonificacion);
					obeConsultaOA.FechaInicioOA = drd.GetDateTime(posFechaInicioOA);
					obeConsultaOA.TipoPaciente = drd.GetString(posTipoPaciente);
					obeConsultaOA.TipoAtencion = drd.GetString(posTipoAtencion);
					obeConsultaOA.Aseguradora = drd.GetString(posAseguradora);

					obeConsultaOA.CodigoContrato = drd.GetString(posCodigoContrato);
					

					obeConsultaOA.Servicio = drd.GetString(posServicio);

					obeConsultaOA.ModFacturacion = drd.GetString(posModFacturacion);

					obeConsultaOA.Especialidad = drd.GetString(posEspecialidad);
					obeConsultaOA.DescripcionEstadoPrestacion = drd.GetString(posDescripcionEstadoPrestacion);
					obeConsultaOA.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeConsultaOA.Ajuste = drd.GetDecimal(posAjuste);
					obeConsultaOA.TotalProvision = drd.GetDecimal(posTotalProvision);
					obeConsultaOA.Paciente = drd.GetString(posPaciente);
					obeConsultaOA.AjusteProcesoId = drd.GetInt32(posAjusteProcesoId);
					obeConsultaOA.IdPlanilla = drd.GetInt32(posIdplanilla);
					obeConsultaOA.IdEstadoPlanilla = drd.GetInt32(posIdEstadoPlanilla);
					obeConsultaOA.IndicadorHonorario = drd.GetString(posIndicadorHonorario);

					obeConsultaOA.EstadoHospitalizacion = drd.GetString(posEstadoHospitalizacion);
					obeConsultaOA.SituacionDetalleHospitalizacion = drd.GetString(posSituacionDetalleHospitalizacion);
					obeConsultaOA.IndicadorEliminado = drd.GetString(posIndicadorEliminado);
					obeConsultaOA.SituacionDetalleExpediente = drd.GetString(posSituacionDetalleExpediente);

					obeConsultaOA.EstadoPlanilla = drd.GetString(posEstadoPlanilla);
					obeConsultaOA.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
					obeConsultaOA.EstadoProvision = drd.GetString(posEstadoProvision);
					obeConsultaOA.PlanillaIdWeb = drd.GetInt32(posPlanillaIdWeb);
					obeConsultaOA.EstadoPlanillaWeb = drd.GetString(posEstadoPlanillaWeb);
					lbeConsultaOA.Add(obeConsultaOA);
				}
				drd.Close();
			}
			return lbeConsultaOA;
		}

	}
}
