using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daHorarioMedico
	{
		public beHorarioListas listarListas(SqlConnection con, string sucursal)
		{
			beHorarioListas obeHorarioListas = null;
			List<beCampoCadena> lbeConsultorio = null;
			List<beCampoEntero> ListaMedicoEmpresaSucursal = null;
			SqlCommand cmd = new SqlCommand("uspHorarioListasV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = sucursal;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeHorarioListas = new beHorarioListas();
				lbeConsultorio = new List<beCampoCadena>();
				int posConsultorioId = drd.GetOrdinal("ConsultorioId");
				int posDescripcion1 = drd.GetOrdinal("Descripcion");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				beCampoCadena obeConsultorio;
				while (drd.Read())
				{
					obeConsultorio = new beCampoCadena();
					obeConsultorio.Campo1 = drd.GetInt32(posConsultorioId);
					obeConsultorio.Campo2 = drd.GetString(posDescripcion1).Trim();
					obeConsultorio.Campo3 = drd.GetString(posSucursalId).Trim();
					lbeConsultorio.Add(obeConsultorio);
				}
				obeHorarioListas.ListaConsultorio = lbeConsultorio;
				List<beCampoEntero> lbeTipoAtencion = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeTipoAtencion;
					int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
					int posDescripcion2 = drd.GetOrdinal("DescripcionCorta");
					while (drd.Read())
					{
						obeTipoAtencion = new beCampoEntero();
						obeTipoAtencion.campo1 = drd.GetInt32(posTipoAtencionId);
						obeTipoAtencion.campo2 = drd.GetString(posDescripcion2).Trim();
						lbeTipoAtencion.Add(obeTipoAtencion);
					}
					obeHorarioListas.ListaTipoAtencion = lbeTipoAtencion;
				}
				List<beCampoEntero> lbeEspecialidad = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeEspecialidad;
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion3).Trim();
						lbeEspecialidad.Add(obeEspecialidad);
					}
					obeHorarioListas.ListaEspecialidad = lbeEspecialidad;
				}
				List<beCampoCadena> lbeTurno = new List<beCampoCadena>();
				if (drd.NextResult())
				{
					beCampoCadena obeTurno;
					int posTurnoId = drd.GetOrdinal("TurnoId");
					int posDescripcion4 = drd.GetOrdinal("Descripcion");
					int posSucursalId4 = drd.GetOrdinal("SucursalId");
					while (drd.Read())
					{
						obeTurno = new beCampoCadena();
						obeTurno.Campo1 = drd.GetInt32(posTurnoId);
						obeTurno.Campo2 = drd.GetString(posDescripcion4).Trim();
						obeTurno.Campo3 = drd.GetString(posSucursalId4).Trim();
						lbeTurno.Add(obeTurno);
					}
					obeHorarioListas.ListaTurno = lbeTurno;
				}
				List<beCampoCadenaCorto> lbeSucursal = new List<beCampoCadenaCorto>();
				if (drd.NextResult())
				{
					beCampoCadenaCorto obeSucursal;
					int posSucursalId5 = drd.GetOrdinal("SucursalId");
					int posDescripcion5 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeSucursal = new beCampoCadenaCorto();
						obeSucursal.Campo1 = drd.GetString(posSucursalId5).Trim();
						obeSucursal.Campo2 = drd.GetString(posDescripcion5).Trim();
						lbeSucursal.Add(obeSucursal);
					}
					obeHorarioListas.ListaSucursal = lbeSucursal;
				}
				if (drd.NextResult())
				{
					List<beHorarioMedicoVista> lbeHorarioMedicoVista = new List<beHorarioMedicoVista>();
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					int posCMP = drd.GetOrdinal("CMP");
					int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
					//int posSucursalIdm = drd.GetOrdinal("SucursalId");//Cambiar
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					beHorarioMedicoVista obeHorarioMedicoVista;
					while (drd.Read())
					{
						obeHorarioMedicoVista = new beHorarioMedicoVista();
						obeHorarioMedicoVista.PersonaId = drd.GetInt32(posPersonaId);
						obeHorarioMedicoVista.NombreCompleto = drd.GetString(posNombreCompleto).Trim();
						obeHorarioMedicoVista.CMP = drd.GetString(posCMP).Trim();
						obeHorarioMedicoVista.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
						//obeHorarioMedicoVista.SucursalId = drd.GetString(posSucursalIdm).Trim();
						obeHorarioMedicoVista.Especialidad = drd.GetString(posEspecialidad);
						lbeHorarioMedicoVista.Add(obeHorarioMedicoVista);
					}
					obeHorarioListas.ListaMedico = lbeHorarioMedicoVista;
				}
				if (drd.NextResult())
				{
					List<beCampoEntero> lbeUnidadMedica = new List<beCampoEntero>();
					beCampoEntero obeUnidadMedica;
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posDescripcion7 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeUnidadMedica = new beCampoEntero();
						obeUnidadMedica.campo1 = drd.GetInt32(posUnidadMedicaId);
						obeUnidadMedica.campo2 = drd.GetString(posDescripcion7).Trim();
						lbeUnidadMedica.Add(obeUnidadMedica);
					}
					obeHorarioListas.ListaUnidadMedica = lbeUnidadMedica;
				}
				if (drd.NextResult())
				{
					ListaMedicoEmpresaSucursal = new List<beCampoEntero>();
					beCampoEntero obeMedicoEmpresaSucursal;
					int posPersonalId = drd.GetOrdinal("PersonaId");
					int posSucursalId2 = drd.GetOrdinal("SucursalId");
					while (drd.Read())
					{
						obeMedicoEmpresaSucursal = new beCampoEntero();
						obeMedicoEmpresaSucursal.campo1 = drd.GetInt32(posPersonalId);
						obeMedicoEmpresaSucursal.campo2 = drd.GetString(posSucursalId2).Trim();
						ListaMedicoEmpresaSucursal.Add(obeMedicoEmpresaSucursal);
					}
					obeHorarioListas.ListaMedicoEmpresaSucursal = ListaMedicoEmpresaSucursal;
				}
				drd.Close();
			}
			return (obeHorarioListas);
		}

		public beHorarioMedicoListas listarHorarios(SqlConnection con, string sucursal, int mes, int anio)
		{
			beHorarioMedicoListas obeHorarioMedicoListas = null;
			SqlCommand cmd = new SqlCommand("uspHorarioListar", con);
			SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par1.Direction = ParameterDirection.Input;
			par1.Value = sucursal;

			SqlParameter par2 = cmd.Parameters.Add("@Mes", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = mes;

			SqlParameter par3 = cmd.Parameters.Add("@Anio", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = anio;

			cmd.CommandType = CommandType.StoredProcedure;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeHorarioMedicoListas = new beHorarioMedicoListas();
				List<beHorarioMedicoHorario> lbeHorarioMedicoHorario = new List<beHorarioMedicoHorario>();

				beHorarioMedicoHorario obeHorarioMedicoHorario;
				int posMedicoHorarioId = drd.GetOrdinal("MedicoHorarioId");
				int posPersonaId2 = drd.GetOrdinal("PersonaId");
				int posTipoRegistroHorario = drd.GetOrdinal("TipoRegistroHorario");
				int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
				int posConsultorioId = drd.GetOrdinal("ConsultorioId");
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
				int posFechaHoraInicio = drd.GetOrdinal("FechaHoraInicio");
				int posFechaHoraFin = drd.GetOrdinal("FechaHoraFin");
				int posEstadoRegistro2 = drd.GetOrdinal("EstadoRegistro");
				int posDias = drd.GetOrdinal("Dias");
				int posSucursalId2 = drd.GetOrdinal("SucursalId");
				int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
				while (drd.Read())
				{
					obeHorarioMedicoHorario = new beHorarioMedicoHorario();
					obeHorarioMedicoHorario.MedicoHorarioId = drd.GetInt32(posMedicoHorarioId);
					obeHorarioMedicoHorario.PersonaId = drd.GetInt32(posPersonaId2);
					obeHorarioMedicoHorario.TipoRegistroHorario = drd.GetString(posTipoRegistroHorario);
					obeHorarioMedicoHorario.EspecialidadId = drd.GetInt32(posEspecialidadId);
					obeHorarioMedicoHorario.ConsultorioId = drd.GetInt32(posConsultorioId);
					obeHorarioMedicoHorario.TurnoId = drd.GetInt32(posTurnoId);
					obeHorarioMedicoHorario.TipoAtencionId = drd.GetInt32(posTipoAtencionId);
					obeHorarioMedicoHorario.FechaHoraInicio = drd.GetDateTime(posFechaHoraInicio);
					obeHorarioMedicoHorario.FechaHoraFin = drd.GetDateTime(posFechaHoraFin);
					obeHorarioMedicoHorario.EstadoRegistro = drd.GetString(posEstadoRegistro2);
					obeHorarioMedicoHorario.ListaDia = drd.GetString(posDias);
					obeHorarioMedicoHorario.SucursalId = drd.GetString(posSucursalId2);
					obeHorarioMedicoHorario.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
					lbeHorarioMedicoHorario.Add(obeHorarioMedicoHorario);
				}
				obeHorarioMedicoListas.ListaHorario = lbeHorarioMedicoHorario;
				drd.Close();
			}
			return (obeHorarioMedicoListas);
		}

		public int adicionar(SqlConnection con, beHorarioMedicoHorario obeHorarioMedicoHorario, int usuario, string sucursal, bool valor1, bool valor2, bool valor3, bool valor4, bool valor5, bool valor6, bool valor7)
		{
			int idMedicoHorario = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeHorarioMedicoHorario.PersonaId;

			SqlParameter par2 = cmd.Parameters.Add("@TipoRegistroHorario", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeHorarioMedicoHorario.TipoRegistroHorario;

			SqlParameter par3 = cmd.Parameters.Add("@FechaHoraInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeHorarioMedicoHorario.FechaHoraInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaHoraFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeHorarioMedicoHorario.FechaHoraFin;

			SqlParameter par5 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeHorarioMedicoHorario.TurnoId;

			SqlParameter par6 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeHorarioMedicoHorario.TipoAtencionId;

			SqlParameter par7 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeHorarioMedicoHorario.EspecialidadId;

			SqlParameter par8 = cmd.Parameters.Add("@ConsultorioId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeHorarioMedicoHorario.ConsultorioId;

			SqlParameter par9 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = usuario;

			SqlParameter par10 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
			par10.Direction = ParameterDirection.Input;
			par10.Value = sucursal;

			SqlParameter par11 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par11.Direction = ParameterDirection.Input;
			par11.Value = valor1;

			SqlParameter par12 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par12.Direction = ParameterDirection.Input;
			par12.Value = valor2;

			SqlParameter par13 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par13.Direction = ParameterDirection.Input;
			par13.Value = valor3;

			SqlParameter par14 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par14.Direction = ParameterDirection.Input;
			par14.Value = valor4;

			SqlParameter par15 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par15.Direction = ParameterDirection.Input;
			par15.Value = valor5;

			SqlParameter par16 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par16.Direction = ParameterDirection.Input;
			par16.Value = valor6;

			SqlParameter par17 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par17.Direction = ParameterDirection.Input;
			par17.Value = valor7;

			SqlParameter par18 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeHorarioMedicoHorario.UnidadMedicaId;

			SqlParameter par19 = cmd.Parameters.Add("@MedicoHorarioId", SqlDbType.Int);
			par19.Direction = ParameterDirection.Output;

			int n = cmd.ExecuteNonQuery();
			idMedicoHorario = (int)par19.Value;
			return (idMedicoHorario);
		}

		public int actualizar(SqlConnection con, beHorarioMedicoHorario obeHorarioMedicoHorario, int usuario, bool valor1, bool valor2, bool valor3, bool valor4, bool valor5, bool valor6, bool valor7)
		{
			int idMedicoHorario = -1;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoHorarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = obeHorarioMedicoHorario.MedicoHorarioId;

			SqlParameter par2 = cmd.Parameters.Add("@PersonaId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeHorarioMedicoHorario.PersonaId;

			SqlParameter par3 = cmd.Parameters.Add("@TipoRegistroHorario", SqlDbType.Char, 1);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeHorarioMedicoHorario.TipoRegistroHorario;

			SqlParameter par4 = cmd.Parameters.Add("@FechaHoraInicio", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeHorarioMedicoHorario.FechaHoraInicio;

			SqlParameter par5 = cmd.Parameters.Add("@FechaHoraFin", SqlDbType.DateTime);
			par5.Direction = ParameterDirection.Input;
			par5.Value = obeHorarioMedicoHorario.FechaHoraFin;

			SqlParameter par6 = cmd.Parameters.Add("@TurnoId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = obeHorarioMedicoHorario.TurnoId;

			SqlParameter par7 = cmd.Parameters.Add("@TipoAtencionId", SqlDbType.Int);
			par7.Direction = ParameterDirection.Input;
			par7.Value = obeHorarioMedicoHorario.TipoAtencionId;

			SqlParameter par8 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
			par8.Direction = ParameterDirection.Input;
			par8.Value = obeHorarioMedicoHorario.EspecialidadId;

			SqlParameter par9 = cmd.Parameters.Add("@ConsultorioId", SqlDbType.Int);
			par9.Direction = ParameterDirection.Input;
			par9.Value = obeHorarioMedicoHorario.ConsultorioId;

			SqlParameter par10 = cmd.Parameters.Add("@UsuarioModificacionId", SqlDbType.Int);
			par10.Direction = ParameterDirection.Input;
			par10.Value = usuario;

			SqlParameter par11 = cmd.Parameters.Add("@IndicadorLunes", SqlDbType.Bit);
			par11.Direction = ParameterDirection.Input;
			par11.Value = valor1;

			SqlParameter par12 = cmd.Parameters.Add("@IndicadorMartes", SqlDbType.Bit);
			par12.Direction = ParameterDirection.Input;
			par12.Value = valor2;

			SqlParameter par13 = cmd.Parameters.Add("@IndicadorMiercoles", SqlDbType.Bit);
			par13.Direction = ParameterDirection.Input;
			par13.Value = valor3;

			SqlParameter par14 = cmd.Parameters.Add("@IndicadorJueves", SqlDbType.Bit);
			par14.Direction = ParameterDirection.Input;
			par14.Value = valor4;

			SqlParameter par15 = cmd.Parameters.Add("@IndicadorViernes", SqlDbType.Bit);
			par15.Direction = ParameterDirection.Input;
			par15.Value = valor5;

			SqlParameter par16 = cmd.Parameters.Add("@IndicadorSabado", SqlDbType.Bit);
			par16.Direction = ParameterDirection.Input;
			par16.Value = valor6;

			SqlParameter par17 = cmd.Parameters.Add("@IndicadorDomingo", SqlDbType.Bit);
			par17.Direction = ParameterDirection.Input;
			par17.Value = valor7;

			SqlParameter par18 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeHorarioMedicoHorario.UnidadMedicaId;

			SqlParameter par19 = cmd.Parameters.Add("@FilasAfectadas", SqlDbType.Int);
			par19.Direction = ParameterDirection.Output;

			int n = cmd.ExecuteNonQuery();
			idMedicoHorario = (int)par19.Value;
			return (idMedicoHorario);
		}

		public bool actualizarEstado(SqlConnection con, int MedicoHorarioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@MedicoHorarioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = MedicoHorarioId;

			SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public beHorarioMedicoExcel cargarHorarios(SqlConnection con, string lista)
		{
			beHorarioMedicoExcel obeHorarioMedicoExcel = null;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioExcelCargar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 240;
			cmd.Parameters.AddWithValue("ListaHorarios", lista);

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				obeHorarioMedicoExcel = new beHorarioMedicoExcel();
				List<beHorarioMedicoLista> lbeHorarioMedicoLista1 = new List<beHorarioMedicoLista>();
				if (drd.HasRows)
				{
					beHorarioMedicoLista obeHorarioMedicoLista = null;
					int posOrden = drd.GetOrdinal("Orden");
					int posSucursalId = drd.GetOrdinal("SucursalId");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
					int posTipoRegistroHorario = drd.GetOrdinal("TipoRegistroHorario");
					int posNombreRegistroHorario = drd.GetOrdinal("NombreRegistroHorario");
					int posFechaInicio = drd.GetOrdinal("FechaInicio");
					int posFechaFin = drd.GetOrdinal("FechaFin");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
					int posEspecialidad = drd.GetOrdinal("Especialidad");
					int posConsultorioId = drd.GetOrdinal("ConsultorioId");
					int posConsultorio = drd.GetOrdinal("Consultorio");
					int posTurnoId = drd.GetOrdinal("TurnoId");
					int posTurno = drd.GetOrdinal("Turno");
					int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
					int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posUnidadMedica = drd.GetOrdinal("UnidadMedica");
					int posObservacion = drd.GetOrdinal("Observacion");
					int posIndicadorLunes = drd.GetOrdinal("IndicadorLunes");
					int posIndicadorMartes = drd.GetOrdinal("IndicadorMartes");
					int posIndicadorMiercoles = drd.GetOrdinal("IndicadorMiercoles");
					int posIndicadorJueves = drd.GetOrdinal("IndicadorJueves");
					int posIndicadorViernes = drd.GetOrdinal("IndicadorViernes");
					int posIndicadorSabado = drd.GetOrdinal("IndicadorSabado");
					int posIndicadorDomingo = drd.GetOrdinal("IndicadorDomingo");
					while (drd.Read())
					{
						obeHorarioMedicoLista = new beHorarioMedicoLista();
						obeHorarioMedicoLista.Orden = drd.GetString(posOrden);
						obeHorarioMedicoLista.SucursalId = drd.GetString(posSucursalId);
						obeHorarioMedicoLista.PersonaId = drd.GetString(posPersonaId);
						obeHorarioMedicoLista.NombreCompleto = drd.GetString(posNombreCompleto);
						obeHorarioMedicoLista.TipoRegistroHorario = drd.GetString(posTipoRegistroHorario);
						obeHorarioMedicoLista.NombreRegistroHorario = drd.GetString(posNombreRegistroHorario);
						obeHorarioMedicoLista.FechaInicio = drd.GetString(posFechaInicio);
						obeHorarioMedicoLista.FechaFin = drd.GetString(posFechaFin);
						obeHorarioMedicoLista.HoraInicio = drd.GetString(posHoraInicio);
						obeHorarioMedicoLista.HoraFin = drd.GetString(posHoraFin);
						obeHorarioMedicoLista.EspecialidadId = drd.GetString(posEspecialidadId);
						obeHorarioMedicoLista.Especialidad = drd.GetString(posEspecialidad);
						obeHorarioMedicoLista.ConsultorioId = drd.GetString(posConsultorioId);
						obeHorarioMedicoLista.Consultorio = drd.GetString(posConsultorio);
						obeHorarioMedicoLista.TurnoId = drd.GetString(posTurnoId);
						obeHorarioMedicoLista.Turno = drd.GetString(posTurno);
						obeHorarioMedicoLista.TipoAtencionId = drd.GetString(posTipoAtencionId);
						obeHorarioMedicoLista.TipoAtencion = drd.GetString(posTipoAtencion);
						obeHorarioMedicoLista.UnidadMedicaId = drd.GetString(posUnidadMedicaId);
						obeHorarioMedicoLista.UnidadMedica = drd.GetString(posUnidadMedica);
						obeHorarioMedicoLista.Observacion = drd.GetString(posObservacion);
						obeHorarioMedicoLista.IndicadorLunes = drd.GetString(posIndicadorLunes);
						obeHorarioMedicoLista.IndicadorMartes = drd.GetString(posIndicadorMartes);
						obeHorarioMedicoLista.IndicadorMiercoles = drd.GetString(posIndicadorMiercoles);
						obeHorarioMedicoLista.IndicadorJueves = drd.GetString(posIndicadorJueves);
						obeHorarioMedicoLista.IndicadorViernes = drd.GetString(posIndicadorViernes);
						obeHorarioMedicoLista.IndicadorSabado = drd.GetString(posIndicadorSabado);
						obeHorarioMedicoLista.IndicadorDomingo = drd.GetString(posIndicadorDomingo);
						lbeHorarioMedicoLista1.Add(obeHorarioMedicoLista);
					}
					obeHorarioMedicoExcel.Lista1 = lbeHorarioMedicoLista1;
				}
				List<beHorarioMedicoLista> lbeHorarioMedicoLista2 = new List<beHorarioMedicoLista>();
				if (drd.NextResult())
				{
					if (drd.HasRows)
					{
						beHorarioMedicoLista obeHorarioMedicoLista = null;
						int posOrden = drd.GetOrdinal("Orden");
						int posSucursalId = drd.GetOrdinal("SucursalId");
						int posPersonaId = drd.GetOrdinal("PersonaId");
						int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
						int posTipoRegistroHorario = drd.GetOrdinal("TipoRegistroHorario");
						int posNombreRegistroHorario = drd.GetOrdinal("NombreRegistroHorario");
						int posFechaInicio = drd.GetOrdinal("FechaInicio");
						int posFechaFin = drd.GetOrdinal("FechaFin");
						int posHoraInicio = drd.GetOrdinal("HoraInicio");
						int posHoraFin = drd.GetOrdinal("HoraFin");
						int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
						int posEspecialidad = drd.GetOrdinal("Especialidad");
						int posConsultorioId = drd.GetOrdinal("ConsultorioId");
						int posConsultorio = drd.GetOrdinal("Consultorio");
						int posTurnoId = drd.GetOrdinal("TurnoId");
						int posTurno = drd.GetOrdinal("Turno");
						int posTipoAtencionId = drd.GetOrdinal("TipoAtencionId");
						int posTipoAtencion = drd.GetOrdinal("TipoAtencion");
						int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
						int posUnidadMedica = drd.GetOrdinal("UnidadMedica");
						int posObservacion = drd.GetOrdinal("Observacion");
						while (drd.Read())
						{
							obeHorarioMedicoLista = new beHorarioMedicoLista();
							obeHorarioMedicoLista.Orden = drd.GetString(posOrden);
							obeHorarioMedicoLista.SucursalId = drd.GetString(posSucursalId);
							obeHorarioMedicoLista.PersonaId = drd.GetString(posPersonaId);
							obeHorarioMedicoLista.NombreCompleto = drd.GetString(posNombreCompleto);
							obeHorarioMedicoLista.TipoRegistroHorario = drd.GetString(posTipoRegistroHorario);
							obeHorarioMedicoLista.NombreRegistroHorario = drd.GetString(posNombreRegistroHorario);
							obeHorarioMedicoLista.FechaInicio = drd.GetString(posFechaInicio);
							obeHorarioMedicoLista.FechaFin = drd.GetString(posFechaFin);
							obeHorarioMedicoLista.HoraInicio = drd.GetString(posHoraInicio);
							obeHorarioMedicoLista.HoraFin = drd.GetString(posHoraFin);
							obeHorarioMedicoLista.EspecialidadId = drd.GetString(posEspecialidadId);
							obeHorarioMedicoLista.Especialidad = drd.GetString(posEspecialidad);
							obeHorarioMedicoLista.ConsultorioId = drd.GetString(posConsultorioId);
							obeHorarioMedicoLista.Consultorio = drd.GetString(posConsultorio);
							obeHorarioMedicoLista.TurnoId = drd.GetString(posTurnoId);
							obeHorarioMedicoLista.Turno = drd.GetString(posTurno);
							obeHorarioMedicoLista.TipoAtencionId = drd.GetString(posTipoAtencionId);
							obeHorarioMedicoLista.TipoAtencion = drd.GetString(posTipoAtencion);
							obeHorarioMedicoLista.UnidadMedicaId = drd.GetString(posUnidadMedicaId);
							obeHorarioMedicoLista.UnidadMedica = drd.GetString(posUnidadMedica);
							obeHorarioMedicoLista.Observacion = drd.GetString(posObservacion);
							lbeHorarioMedicoLista2.Add(obeHorarioMedicoLista);
						}
						obeHorarioMedicoExcel.Lista2 = lbeHorarioMedicoLista2;
					}
				}
				drd.Close();
			}
			return obeHorarioMedicoExcel;
		}

		public bool adicionarHorarios(SqlConnection con, string lista, int usuarioId)
		{
			bool exito = false;

			SqlCommand cmd = new SqlCommand("uspMedicoHorarioExcelAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			cmd.Parameters.AddWithValue("ListaHorarios", lista);
			cmd.Parameters.AddWithValue("UsuarioId", usuarioId);

			cmd.ExecuteNonQuery();

			exito = true;

			return exito;
		}

		public beConsultaHorarioMedicoListas listarTurno(SqlConnection con)
		{
			beConsultaHorarioMedicoListas lista = new beConsultaHorarioMedicoListas();
			List<beCampoCadena> lbeTurno = null;
			SqlCommand cmd = new SqlCommand("uspMedicoHorarioDetalleListas", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{
				lbeTurno = new List<beCampoCadena>();
				int posTurnoId = drd.GetOrdinal("TurnoId");
				int posDescripcion1 = drd.GetOrdinal("Descripcion");
				int posSucursalId = drd.GetOrdinal("SucursalId");
				beCampoCadena obeTurno;
				while (drd.Read())
				{
					obeTurno = new beCampoCadena();
					obeTurno.Campo1 = drd.GetInt32(posTurnoId);
					obeTurno.Campo2 = drd.GetString(posDescripcion1).Trim();
					obeTurno.Campo3 = drd.GetString(posSucursalId).Trim();
					lbeTurno.Add(obeTurno);
				}
				lista.ListaTurno = lbeTurno;
				List<beCampoEntero> lbeUnidadMedica = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeUnidadMedica;
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeUnidadMedica = new beCampoEntero();
						obeUnidadMedica.campo1 = drd.GetInt32(posUnidadMedicaId);
						obeUnidadMedica.campo2 = drd.GetString(posDescripcion2).Trim();
						lbeUnidadMedica.Add(obeUnidadMedica);
					}
					lista.ListaUnidadMedica = lbeUnidadMedica;
				}
				drd.Close();
			}

			return lista;
		}

		public beHorarioMedicoConsultaVista consultaHorarioMedico(SqlConnection con, beFrHorarioMedicoConsulta obeFrHorarioMedicoConsulta)
		{
			beHorarioMedicoConsultaVista obeHorarioMedicoConsultaVista = new beHorarioMedicoConsultaVista();
			obeHorarioMedicoConsultaVista.listaFeriado = new List<DateTime>();
			obeHorarioMedicoConsultaVista.lista = new List<beHorarioMedicoConsulta>();

			SqlCommand cmd = new SqlCommand("uspMedicoHorarioDetalleListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.CommandTimeout = 240;

			cmd.Parameters.AddWithValue("@SucursalId", obeFrHorarioMedicoConsulta.Sucursal);
			cmd.Parameters.AddWithValue("@PersonaId", obeFrHorarioMedicoConsulta.Medico);
			cmd.Parameters.AddWithValue("@EmpresaId", obeFrHorarioMedicoConsulta.Empresa);
			cmd.Parameters.AddWithValue("@TurnoId", obeFrHorarioMedicoConsulta.Turno);
			cmd.Parameters.AddWithValue("@Mes", obeFrHorarioMedicoConsulta.Periodo);
			cmd.Parameters.AddWithValue("@Anio", obeFrHorarioMedicoConsulta.Anio);
			cmd.Parameters.AddWithValue("@UnidadMedicaId", obeFrHorarioMedicoConsulta.UnidadMedica);
			SqlDataReader drd = cmd.ExecuteReader();

			if (drd != null)
			{
				while (drd.Read())
				{
					obeHorarioMedicoConsultaVista.listaFeriado.Add(drd.GetDateTime(0));
				}
				if (drd.NextResult())
				{
					beHorarioMedicoConsulta obj = null;
					int posFecha = drd.GetOrdinal("Fecha");
					int posDia = drd.GetOrdinal("Dia");
					int posPersonaId = drd.GetOrdinal("PersonaId");
					int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
					int posPersona = drd.GetOrdinal("Medico");
					int posHoraInicio = drd.GetOrdinal("HoraInicio");
					int posHoraFin = drd.GetOrdinal("HoraFin");
					int posHorasAsignadas = drd.GetOrdinal("HorasAsignadas");
					while (drd.Read())
					{
						obj = new beHorarioMedicoConsulta();
						obj.Fecha = drd.GetDateTime(posFecha);
						obj.Dia = drd.GetInt32(posDia);
						obj.PersonaId = drd.GetInt32(posPersonaId);
						obj.ApellidoPaterno = drd.GetString(posApellidoPaterno);
						obj.Persona = drd.GetString(posPersona);
						obj.HoraInicio = drd.GetDateTime(posHoraInicio);
						obj.HoraFin = drd.GetDateTime(posHoraFin);
						obj.HorasAsignadas = drd.GetDecimal(posHorasAsignadas);
						obeHorarioMedicoConsultaVista.lista.Add(obj);
					}
				}
				drd.Close();
			}

			return obeHorarioMedicoConsultaVista;
		}

		public List<beCampoEnteroSolo> ObtenerMedicoEspecialidad(SqlConnection con, int PersonaId)
		{
			List<beCampoEnteroSolo> lbeCampoEnteroSolo = new List<beCampoEnteroSolo>();
			SqlCommand cmd = new SqlCommand("uspObtenerMedicoEspecialidad", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PersonaId", PersonaId);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);

			if (drd != null)
			{
				if (drd.HasRows)
				{
					beCampoEnteroSolo obeCampoEnteroSolo = null;
					while (drd.Read())
					{
						obeCampoEnteroSolo = new beCampoEnteroSolo();
						obeCampoEnteroSolo.Campo1 = drd.GetInt32(0);
						lbeCampoEnteroSolo.Add(obeCampoEnteroSolo);
					}
				}
				drd.Close();
			}

			return lbeCampoEnteroSolo;
		}
	}
}
