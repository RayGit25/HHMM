using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daReplicaProceso
	{
		public beReplicaProcesoListas listas(SqlConnection con,int usuarioid,string sucursal)
		{
			beReplicaProcesoListas obeReplicaProcesoListas = new beReplicaProcesoListas();
			List<beReplicaProcesoPeriodo> lbeReplicaProcesoPeriodo = null;
			List<beCampoEntero> lbeEspecialidad = null;
			List<beCampoCadenaCorto> lbeSucursal = null;
			List<beCampoCadenaCorto> lbeMensaje = null;
			SqlCommand cmd = new SqlCommand("uspReplicaProcesoListasV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@UsuarioId", usuarioid);
			cmd.Parameters.AddWithValue("@SucursalId", sucursal);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbeReplicaProcesoPeriodo = new List<beReplicaProcesoPeriodo>();
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posPeriodo2 = drd.GetOrdinal("Periodo2");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				beReplicaProcesoPeriodo obeReplicaProcesoPeriodo;
				while (drd.Read())
				{
					obeReplicaProcesoPeriodo = new beReplicaProcesoPeriodo();
					obeReplicaProcesoPeriodo.PeriodoId = drd.GetString(posPeriodo);
					obeReplicaProcesoPeriodo.Periodo = drd.GetString(posPeriodo2);
					obeReplicaProcesoPeriodo.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeReplicaProcesoPeriodo.FechaFin = drd.GetDateTime(posFechaFin);
					lbeReplicaProcesoPeriodo.Add(obeReplicaProcesoPeriodo);
				}
				obeReplicaProcesoListas.ListaPeriodo = lbeReplicaProcesoPeriodo;
				if (drd.NextResult())
				{
					lbeEspecialidad = new List<beCampoEntero>();
					int posEspecialidadId2 = drd.GetOrdinal("EspecialidadId");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");
					beCampoEntero obeEspecialidad;
					while (drd.Read())
					{
						obeEspecialidad = new beCampoEntero();
						obeEspecialidad.campo1 = drd.GetInt32(posEspecialidadId2);
						obeEspecialidad.campo2 = drd.GetString(posDescripcion2).Trim();
						lbeEspecialidad.Add(obeEspecialidad);
					}
					obeReplicaProcesoListas.ListaEspecialidad = lbeEspecialidad;
				}
				if (drd.NextResult())
				{
					lbeSucursal = new List<beCampoCadenaCorto>();
					int posSucursalId3 = drd.GetOrdinal("SucursalId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					beCampoCadenaCorto obeSucursal;
					while (drd.Read())
					{
						obeSucursal = new beCampoCadenaCorto();
						obeSucursal.Campo1 = drd.GetString(posSucursalId3).Trim();
						obeSucursal.Campo2 = drd.GetString(posDescripcion3).Trim();
						lbeSucursal.Add(obeSucursal);
					}
					obeReplicaProcesoListas.ListaSucursal = lbeSucursal;
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
					obeReplicaProcesoListas.ListaMensajes = lbeMensaje;
				}
				if (drd.NextResult())
				{
					lbeMensaje = new List<beCampoCadenaCorto>();
					beCampoCadenaCorto obeMensaje = null;

					int posCodigo2 = drd.GetOrdinal("Codigo");
					int posDescripcion2 = drd.GetOrdinal("Descripcion");

					while (drd.Read())
					{
						obeMensaje = new beCampoCadenaCorto();
						obeMensaje.Campo1 = drd.GetString(posCodigo2);
						obeMensaje.Campo2 = drd.GetString(posDescripcion2);
						lbeMensaje.Add(obeMensaje);
					}
					obeReplicaProcesoListas.ListaMensajes2 = lbeMensaje;
				}
				drd.Close();
			}
			return (obeReplicaProcesoListas);
		}

		public List<beReplicaProcesoVista> listar(SqlConnection con,int anio,string estado, string sucursal)
		{
			List<beReplicaProcesoVista> lbeReplicaProcesoVista = null;

			SqlCommand cmd = new SqlCommand("uspReplicaProcesoListarV2", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Anio", anio);
			cmd.Parameters.AddWithValue("@EstadoRegistro", estado);
            cmd.Parameters.AddWithValue("@SucursalId", sucursal);
            cmd.CommandTimeout = 0;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeReplicaProcesoVista = new List<beReplicaProcesoVista>();
				int posReplicaProcesoId = drd.GetOrdinal("ReplicaProcesoId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
				int posUsuario = drd.GetOrdinal("Usuario");
				int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");
				int posPeriodo = drd.GetOrdinal("Periodo");
				int posOAAnterior = drd.GetOrdinal("OAAnterior");
				int posExpAnterior = drd.GetOrdinal("ExpAnterior");
                int posOAActual = drd.GetOrdinal("OAActual");
                int posExpActual = drd.GetOrdinal("ExpActual");
                int posOAUltimo = drd.GetOrdinal("OAUltimo");
                int posExpUltimo = drd.GetOrdinal("ExpUltimo");
                int posUsuarioModificacion = drd.GetOrdinal("UsuarioModificacion");
				int posFechaHoraCrecionUsuarioMod = drd.GetOrdinal("FechaHoraCrecionUsuarioMod");
				beReplicaProcesoVista obeReplicaProcesoVista;
				while (drd.Read())
				{
					obeReplicaProcesoVista = new beReplicaProcesoVista();
					obeReplicaProcesoVista.ReplicaProcesoId = drd.GetInt32(posReplicaProcesoId);
					obeReplicaProcesoVista.Descripcion = drd.GetString(posDescripcion).Trim();
					obeReplicaProcesoVista.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeReplicaProcesoVista.FechaFin = drd.GetDateTime(posFechaFin);
					obeReplicaProcesoVista.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeReplicaProcesoVista.CodigoUsuario = drd.GetString(posCodigoUsuario).Trim();
					obeReplicaProcesoVista.Usuario = drd.GetString(posUsuario).Trim();
					obeReplicaProcesoVista.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
					obeReplicaProcesoVista.Periodo = drd.GetString(posPeriodo);
					obeReplicaProcesoVista.OAAnterior = drd.GetInt32(posOAAnterior);
					obeReplicaProcesoVista.ExpAnterior = drd.GetInt32(posExpAnterior);
					obeReplicaProcesoVista.UsuarioModificacion = drd.GetString(posUsuarioModificacion).Trim();
					obeReplicaProcesoVista.FechaHoraCrecionUsuarioMod = drd.GetDateTime(posFechaHoraCrecionUsuarioMod);
                    obeReplicaProcesoVista.OAActual = drd.GetInt32(posOAActual);
                    obeReplicaProcesoVista.ExpActual = drd.GetInt32(posExpActual);
                    obeReplicaProcesoVista.OAUltimo = drd.GetInt32(posOAUltimo);
                    obeReplicaProcesoVista.ExpUltimo = drd.GetInt32(posExpUltimo);
                    lbeReplicaProcesoVista.Add(obeReplicaProcesoVista);
				}

				drd.Close();
			}
			return (lbeReplicaProcesoVista);
		}
		public int adicionar(SqlConnection con, beReplicaProcesoPeriodo obeReplicaProcesoPeriodo, string Descripcion, int UsuarioId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspReplicaProcesoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Descripcion;

			SqlParameter par2 = cmd.Parameters.Add("@Periodo", SqlDbType.VarChar, 6);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeReplicaProcesoPeriodo.PeriodoId;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeReplicaProcesoPeriodo.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeReplicaProcesoPeriodo.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = UsuarioId;

			SqlParameter par6 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par6.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par6.Value;
			return (Rpta);
		}

		public int interfaseMaestroActualizar(SqlConnection con, string Ip, string Bd, int Entidad, int UsuarioId,int interfaseid)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspInterfaseMaestroSPRINGWebV2", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@IP", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Ip;

			SqlParameter par2 = cmd.Parameters.Add("@BaseDatos", SqlDbType.VarChar, 80);
			par2.Direction = ParameterDirection.Input;
			par2.Value = Bd;

			SqlParameter par3 = cmd.Parameters.Add("@Entidad", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = Entidad;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = UsuarioId;

			SqlParameter par5 = cmd.Parameters.Add("@InterfaseMaestroId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = interfaseid;

			Rpta = cmd.ExecuteNonQuery();

			return (Rpta);
		}

		public int actualizar(SqlConnection con, beReplicaProcesoPeriodo obeReplicaProcesoPeriodo, string Descripcion, int UsuarioId, int ReprocesoId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspReplicaProcesoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Descripcion;

			SqlParameter par2 = cmd.Parameters.Add("@Periodo", SqlDbType.VarChar, 6);
			par2.Direction = ParameterDirection.Input;
			par2.Value = obeReplicaProcesoPeriodo.PeriodoId;

			SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
			par3.Direction = ParameterDirection.Input;
			par3.Value = obeReplicaProcesoPeriodo.FechaInicio;

			SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
			par4.Direction = ParameterDirection.Input;
			par4.Value = obeReplicaProcesoPeriodo.FechaFin;

			SqlParameter par5 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par5.Direction = ParameterDirection.Input;
			par5.Value = UsuarioId;

			SqlParameter par6 = cmd.Parameters.Add("@ReplicaProcesoId", SqlDbType.Int);
			par6.Direction = ParameterDirection.Input;
			par6.Value = ReprocesoId;

			SqlParameter par7 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par7.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par7.Value;
			return (Rpta);
		}

		public string procesar(SqlConnection con,int replica,string periodo,int secuencia, string sucursalId,int persona,int especialidad,string oa,string ip,string bd,int usuario)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspReplicaProcesoProcesarV4", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ReplicaProcesoId", replica);
			cmd.Parameters.AddWithValue("@Periodo", periodo);
			cmd.Parameters.AddWithValue("@TipoEjecucion", secuencia);
			cmd.Parameters.AddWithValue("@SucursalId", sucursalId);
			cmd.Parameters.AddWithValue("@PersonaId", persona);
			cmd.Parameters.AddWithValue("@EspecialidadId", especialidad);
			cmd.Parameters.AddWithValue("@CodigoOA", oa);
			cmd.Parameters.AddWithValue("@IP", ip);
			cmd.Parameters.AddWithValue("@BaseDatos", bd);
			cmd.Parameters.AddWithValue("@UsuarioId", usuario);
			cmd.CommandTimeout = 0;
			object mensaje = cmd.ExecuteScalar();
			if (mensaje != null)
			{
				rpta = mensaje.ToString();
			}
			return rpta;
		}

		public int actualizarEstado(SqlConnection con, int id, string EstadoRegistro, int UsuarioId)
		{
			int Rpta = -1;
			SqlCommand cmd = new SqlCommand("uspReplicaProcesoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ReplicaProcesoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlParameter par2 = cmd.Parameters.Add("@Estado", SqlDbType.Char, 1);
			par2.Direction = ParameterDirection.Input;
			par2.Value = EstadoRegistro;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			cmd.ExecuteNonQuery();
			Rpta = (int)par4.Value;
			return (Rpta);
		}
	}
}
