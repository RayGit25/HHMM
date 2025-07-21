using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daConceptos
	{
		public beConceptoMontoFijoListas listar(SqlConnection con)
		{
			beConceptoMontoFijoListas obeConceptoMontoFijoListas = new beConceptoMontoFijoListas();
			List<beConceptoMontoFijo>listaConceptoMontoFijo=null;
			List<beCampoCadena4> listaConcepto = null;
			List<beCampoEntero> listaConceptoCombo=null;

			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				listaConceptoMontoFijo = new List<beConceptoMontoFijo>();
				int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
				int posDescripcion = drd.GetOrdinal("Descripcion");
				int posIndicadorAdministrativo = drd.GetOrdinal("IndicadorAdministrativo");
				int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				beConceptoMontoFijo obeConcepto;
				while (drd.Read())
				{
					obeConcepto = new beConceptoMontoFijo();
					obeConcepto.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
					obeConcepto.Descripcion = drd.GetString(posDescripcion);
					obeConcepto.IndicadorAdministrativo = drd.GetBoolean(posIndicadorAdministrativo);
					obeConcepto.EstadoRegistro = drd.GetString(posEstadoRegistro);
					listaConceptoMontoFijo.Add(obeConcepto);
				}
				obeConceptoMontoFijoListas.listaConceptoMontoFijo=listaConceptoMontoFijo;

				if(drd.NextResult())
				{
					listaConcepto = new List<beCampoCadena4>();
					int posConceptoMontoFijoId1 = drd.GetOrdinal("ConceptoMontoFijoId");
					int posConceptoMontoFijoServicioId=drd.GetOrdinal("ConceptoMontoFijoServicioId");
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posEstadoRegistro1=drd.GetOrdinal("EstadoRegistro");
					beCampoCadena4 oListaServicio;
					while (drd.Read())
					{
						oListaServicio = new beCampoCadena4();
						oListaServicio.Campo1 = drd.GetInt32(posConceptoMontoFijoId1).ToString();
						oListaServicio.Campo2 = drd.GetInt32(posConceptoMontoFijoServicioId).ToString();
						oListaServicio.Campo3 = drd.GetInt32(posServicioId).ToString();
						oListaServicio.Campo4 = drd.GetString(posEstadoRegistro1);
						listaConcepto.Add(oListaServicio);
					}
					obeConceptoMontoFijoListas.listaConcepto = listaConcepto;
				}
				if (drd.NextResult())
				{
					listaConceptoCombo = new List<beCampoEntero>();
					int posServicioId = drd.GetOrdinal("ServicioId");
					int posDescripcion1 = drd.GetOrdinal("Descripcion");
					beCampoEntero oListaServicioCombo;
					while (drd.Read())
					{
						oListaServicioCombo = new beCampoEntero();
						oListaServicioCombo.campo1 = drd.GetInt32(posServicioId);
						oListaServicioCombo.campo2 = drd.GetString(posDescripcion1);
						listaConceptoCombo.Add(oListaServicioCombo);
					}
					obeConceptoMontoFijoListas.listaConceptoCombo = listaConceptoCombo;
				}

				drd.Close();
			}
			return (obeConceptoMontoFijoListas);
		}

		public int adicionar(SqlConnection con, string Descripcion,bool IndAdm, int UsuarioId)
		{
			int ConceptoMontoFijoId = -1;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 80);
			par1.Direction = ParameterDirection.Input;
			par1.Value = Descripcion;

			SqlParameter par2 = cmd.Parameters.Add("@IndicadorAdministrativo", SqlDbType.Bit);
			par2.Direction = ParameterDirection.Input;
			par2.Value = IndAdm;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioCreadorId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) ConceptoMontoFijoId = (int)par4.Value;
			return (ConceptoMontoFijoId);
		}

		public bool actualizar(SqlConnection con,int ConceptoId ,string Descripcion,bool IndAdm, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = ConceptoId;

			SqlParameter par2 = cmd.Parameters.Add("@Descripcion", SqlDbType.NVarChar, 80);
			par2.Direction = ParameterDirection.Input;
			par2.Value = Descripcion;

			SqlParameter par3 = cmd.Parameters.Add("@IndicadorAdministrativo", SqlDbType.Bit);
			par3.Direction = ParameterDirection.Input;
			par3.Value = IndAdm;

			SqlParameter par4 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.Input;
			par4.Value = UsuarioId;

			int n = cmd.ExecuteNonQuery();
			exito = (n > 0);
			return (exito);
		}

		public bool actualizarEstado(SqlConnection con, int ConceptoId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = ConceptoId;

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

		public int adicionarDetalle(SqlConnection con, int ConceptoMontoFijoId, int ServicioId, int UsuarioId)
		{
			int ConceptoMontoFijoDetalleId = -1;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoServicioAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = ConceptoMontoFijoId;

			SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = ServicioId;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@ConceptoMontoFijoServicioId", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) ConceptoMontoFijoDetalleId = (int)par4.Value;
			return (ConceptoMontoFijoDetalleId);
		}

		public int actualizarDetalle(SqlConnection con, int ConceptoServicioId, int ServicioId, int UsuarioId)
		{
			int id = -1;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoServicioActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ConceptoMontoFijoServicioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = ConceptoServicioId;

			SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
			par2.Direction = ParameterDirection.Input;
			par2.Value = ServicioId;

			SqlParameter par3 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par3.Direction = ParameterDirection.Input;
			par3.Value = UsuarioId;

			SqlParameter par4 = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
			par4.Direction = ParameterDirection.ReturnValue;

			int n = cmd.ExecuteNonQuery();
			if (n > 0) id = (int)par4.Value;
			return (id);
		}
		public bool actualizarEstadoDetalle(SqlConnection con, int ConceptoMontoFijoServicioId, string EstadoRegistro, int UsuarioId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspConceptoMontoFijoServicioActualizarEstado", con);
			cmd.CommandType = CommandType.StoredProcedure;

			SqlParameter par1 = cmd.Parameters.Add("@ConceptoMontoFijoServicioId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = ConceptoMontoFijoServicioId;

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

	}
}
