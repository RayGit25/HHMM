using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daAsignacionDescuento
    {
		public beAsignacionDescuentoVistaLista listarVista(SqlConnection con, string sup, int pe, int med, DateTime fei, DateTime fef, int EmpresaId, int EspecialidadId,bool indicador)
        {
            beAsignacionDescuentoVistaLista obeAsignacionDescuentoVistaLista = null;
            List<beAsignacionDescuentoVista> lbeAsignacionDescuentoVista = null;
			SqlCommand cmd = new SqlCommand("uspMedicoContratoListarV2", con);
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

			SqlParameter par8 = cmd.Parameters.Add("@IndicadorPorAutorizar", SqlDbType.Bit);
			par8.Direction = ParameterDirection.Input;
			par8.Value = indicador;

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
				int posEstadoRegistroWeb = drd.GetOrdinal("EstadoRegistroWeb");
				int posIndicadorSucursal = drd.GetOrdinal("IndicadorSucursal");
                int posIndicadorAplicacion = drd.GetOrdinal("IndicadorAplicacion");
                int posDatosMedicoDetalle = drd.GetOrdinal("DatosMedicoDetalle");

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
					obeAsignacionDescuentoVista.EstadoRegistroWeb = drd.GetString(posEstadoRegistroWeb);
					obeAsignacionDescuentoVista.IndicadorSucursal = drd.GetInt32(posIndicadorSucursal);
                    obeAsignacionDescuentoVista.IndicadorAplicacion = drd.GetString(posIndicadorAplicacion);
                    obeAsignacionDescuentoVista.DatosMedicoDetalle = drd.GetString(posDatosMedicoDetalle);
                    lbeAsignacionDescuentoVista.Add(obeAsignacionDescuentoVista);
                }
                obeAsignacionDescuentoVistaLista.ListaAsignacionDescuento = lbeAsignacionDescuentoVista;

                drd.Close();
            }
            return (obeAsignacionDescuentoVistaLista);
        }

		public List<beMedicoContratoDescuento> listarDescuentos(SqlConnection con, int id)
		{
			List<beMedicoContratoDescuento> lbeMedicoContratoDescuento = null;

            SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoListar", con);
			cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
			par1.Direction = ParameterDirection.Input;
			par1.Value = id;

			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbeMedicoContratoDescuento = new List<beMedicoContratoDescuento>();
				int posMedicoContratoDetalleId = drd.GetOrdinal("MedicoContratoDetalleId");
				int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
				int posDescuentoId = drd.GetOrdinal("DescuentoId");
				int posMonto = drd.GetOrdinal("Monto");
				int posIndicadorDocumentoPago = drd.GetOrdinal("IndicadorDocumentoPago");
                int posTipoMonto = drd.GetOrdinal("TipoMonto");
				int posFechaInicio = drd.GetOrdinal("FechaInicio");
				int posFechaFin = drd.GetOrdinal("FechaFin");				
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posDescripcion = drd.GetOrdinal("Descripcion");

				beMedicoContratoDescuento obeMedicoContratoDescuento;

				while (drd.Read())
				{
					obeMedicoContratoDescuento = new beMedicoContratoDescuento();
					obeMedicoContratoDescuento.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId);
					obeMedicoContratoDescuento.TipoDescuentoId = drd.GetInt32(posTipoDescuentoId);
					obeMedicoContratoDescuento.DescuentoId = drd.GetInt32(posDescuentoId);
					obeMedicoContratoDescuento.Monto = drd.GetDecimal(posMonto);
					obeMedicoContratoDescuento.IndicadorDocumentoPago = drd.GetBoolean(posIndicadorDocumentoPago);
                    obeMedicoContratoDescuento.TipoMonto = drd.GetString(posTipoMonto);
					obeMedicoContratoDescuento.FechaInicio = drd.GetDateTime(posFechaInicio);
					obeMedicoContratoDescuento.FechaFin = drd.GetDateTime(posFechaFin);					
					obeMedicoContratoDescuento.Descripcion = drd.GetString(posDescripcion);
                    obeMedicoContratoDescuento.EstadoRegistro = drd.GetString(posEstadoRegistro);

					lbeMedicoContratoDescuento.Add(obeMedicoContratoDescuento);
				}

				drd.Close();
			}
			return (lbeMedicoContratoDescuento);
		}

        public beAsignacionDescuentoListas listarListas(SqlConnection con)
        {
            beAsignacionDescuentoListas obeAsignacionDescuentoListas = null;
            List<beCampoEntero> lbeTipoDescuento = null;

			SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeAsignacionDescuentoListas = new beAsignacionDescuentoListas();
                lbeTipoDescuento = new List<beCampoEntero>();
                int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
                int posDescripcion1 = drd.GetOrdinal("Descripcion");
                beCampoEntero obeTipoDescuento;
                while (drd.Read())
                {
                    obeTipoDescuento = new beCampoEntero();
                    obeTipoDescuento.campo1 = drd.GetInt32(posTipoDescuentoId);
                    obeTipoDescuento.campo2 = drd.GetString(posDescripcion1).Trim();
                    lbeTipoDescuento.Add(obeTipoDescuento);
                }
                obeAsignacionDescuentoListas.ListaTipoDescuento = lbeTipoDescuento;
                List<beCampoEnteroLargo> lbeDescuento = new List<beCampoEnteroLargo>();
                if (drd.NextResult())
                {
                    beCampoEnteroLargo obeDescuento;
                    int posDescuentoId = drd.GetOrdinal("DescuentoId");
                    int posDescripcion2 = drd.GetOrdinal("Descripcion");
                    int posTipoDescuentoId2 = drd.GetOrdinal("TipoDescuentoId");
                    while (drd.Read())
                    {
                        obeDescuento = new beCampoEnteroLargo();
                        obeDescuento.campo1 = drd.GetInt32(posDescuentoId);
                        obeDescuento.campo2 = drd.GetString(posDescripcion2).Trim();
                        obeDescuento.campo3 = drd.GetInt32(posTipoDescuentoId2);
                        lbeDescuento.Add(obeDescuento);
                    }
                    obeAsignacionDescuentoListas.ListaDescuento = lbeDescuento;
                }
                List<beCampoCadenaCorto> lbeTipoDocumento = new List<beCampoCadenaCorto>();
                if (drd.NextResult())
                {
                    beCampoCadenaCorto obeTipoDocumento;
                    int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
                    int posDescripcion3 = drd.GetOrdinal("Descripcion");
                    while (drd.Read())
                    {
                        obeTipoDocumento = new beCampoCadenaCorto();
                        obeTipoDocumento.Campo1 = drd.GetString(posTipoDocumentoPagoId);
                        obeTipoDocumento.Campo2 = drd.GetString(posDescripcion3).Trim();
                        lbeTipoDocumento.Add(obeTipoDocumento);
                    }
                    obeAsignacionDescuentoListas.ListaTipoDocumento = lbeTipoDocumento;
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
					obeAsignacionDescuentoListas.ListaEspecialidad = lbeEspecialidad;
				}    
                drd.Close();
            }
            return (obeAsignacionDescuentoListas);
        }

        public beMedicoContratoDescuento listarDescuentoPorId(SqlConnection con, int id)
        {
            beMedicoContratoDescuento obeMedicoContratoDescuento = null;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoListarPorId", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = id;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleRow);
            if (drd != null)
            {
                obeMedicoContratoDescuento = new beMedicoContratoDescuento();
                int posMedicoContratoDetalleId = drd.GetOrdinal("MedicoContratoDetalleId");
                int posTipoDescuentoId = drd.GetOrdinal("TipoDescuentoId");
                int posDescuentoId = drd.GetOrdinal("DescuentoId");
                int posMonto = drd.GetOrdinal("Monto");
                int posIndicadorDocumentoPago = drd.GetOrdinal("IndicadorDocumentoPago");
                int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
                int posFechaInicio = drd.GetOrdinal("FechaInicio");
                int posFechaFin = drd.GetOrdinal("FechaFin");
                int posDescripcion = drd.GetOrdinal("Descripcion");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                while (drd.Read())
                {
                    obeMedicoContratoDescuento.MedicoContratoDetalleId = drd.GetInt32(posMedicoContratoDetalleId);
                    obeMedicoContratoDescuento.TipoDescuentoId = drd.GetInt32(posTipoDescuentoId);
                    obeMedicoContratoDescuento.DescuentoId = drd.GetInt32(posDescuentoId);
                    obeMedicoContratoDescuento.Monto = drd.GetDecimal(posMonto);
                    obeMedicoContratoDescuento.IndicadorDocumentoPago = drd.GetBoolean(posIndicadorDocumentoPago);
                    obeMedicoContratoDescuento.TipoMonto = drd.GetString(posTipoDocumentoPagoId);
                    obeMedicoContratoDescuento.FechaInicio = drd.GetDateTime(posFechaInicio);
                    obeMedicoContratoDescuento.FechaFin = drd.GetDateTime(posFechaFin);
                    obeMedicoContratoDescuento.Descripcion = drd.GetString(posDescripcion);
                    obeMedicoContratoDescuento.EstadoRegistro = drd.GetString(posEstadoRegistro);
                }
                drd.Close();
            }
            return (obeMedicoContratoDescuento);
        }

        public int adicionarDescuento(SqlConnection con,beMedicoContratoDescuentoPorId obeMedicoContratoDescuentoPorId)
        {
            int idDescuento = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeMedicoContratoDescuentoPorId.UsuarioId;

            SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeMedicoContratoDescuentoPorId.MedicoContratoId;

            SqlParameter par3 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeMedicoContratoDescuentoPorId.FechaInicio;

            SqlParameter par4 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeMedicoContratoDescuentoPorId.FechaFin;

            SqlParameter par5 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeMedicoContratoDescuentoPorId.TipoDescuentoId;

            SqlParameter par6 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeMedicoContratoDescuentoPorId.DescuentoId;

            SqlParameter par7 = cmd.Parameters.Add("@Monto", SqlDbType.Decimal);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeMedicoContratoDescuentoPorId.Monto;

            SqlParameter par8 = cmd.Parameters.Add("@IndicadorDocumentoPago", SqlDbType.Bit);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeMedicoContratoDescuentoPorId.IndicadorDocumentoPago;

            SqlParameter par9 = cmd.Parameters.Add("@TipoDocumentoPagoId", SqlDbType.VarChar,2);
            par9.Direction = ParameterDirection.Input;
            par9.Value = obeMedicoContratoDescuentoPorId.TipoDocumentoPago;

            SqlParameter par10 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
            par10.Direction = ParameterDirection.Input;
            par10.Value = obeMedicoContratoDescuentoPorId.Descripcion.Trim();

            SqlParameter par11 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
            par11.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) idDescuento = (int)par11.Value;
            return (idDescuento);
        }

        public bool actualizarDescuento(SqlConnection con, beMedicoContratoDescuentoPorId obeMedicoContratoDescuentoPorId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeMedicoContratoDescuentoPorId.UsuarioId;

            SqlParameter par2 = cmd.Parameters.Add("@MedicoContratoDetalleId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeMedicoContratoDescuentoPorId.MedicoContratoDetalleId;

            SqlParameter par3 = cmd.Parameters.Add("@MedicoContratoId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeMedicoContratoDescuentoPorId.MedicoContratoId;

            SqlParameter par4 = cmd.Parameters.Add("@FechaInicio", SqlDbType.DateTime);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeMedicoContratoDescuentoPorId.FechaInicio;

            SqlParameter par5 = cmd.Parameters.Add("@FechaFin", SqlDbType.DateTime);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeMedicoContratoDescuentoPorId.FechaFin;

            SqlParameter par6 = cmd.Parameters.Add("@TipoDescuentoId", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeMedicoContratoDescuentoPorId.TipoDescuentoId;

            SqlParameter par7 = cmd.Parameters.Add("@DescuentoId", SqlDbType.Int);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeMedicoContratoDescuentoPorId.DescuentoId;

            SqlParameter par8 = cmd.Parameters.Add("@Monto", SqlDbType.Decimal);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeMedicoContratoDescuentoPorId.Monto;

            SqlParameter par9 = cmd.Parameters.Add("@IndicadorDocumentoPago", SqlDbType.Bit);
            par9.Direction = ParameterDirection.Input;
            par9.Value = obeMedicoContratoDescuentoPorId.IndicadorDocumentoPago;

            SqlParameter par10 = cmd.Parameters.Add("@TipoDocumentoPagoId", SqlDbType.VarChar, 2);
            par10.Direction = ParameterDirection.Input;
            par10.Value = obeMedicoContratoDescuentoPorId.TipoDocumentoPago;

            SqlParameter par11 = cmd.Parameters.Add("@Descripcion", SqlDbType.VarChar, 200);
            par11.Direction = ParameterDirection.Input;
            par11.Value = obeMedicoContratoDescuentoPorId.Descripcion.Trim();


            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstadoDescuento(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoDescuentoActualizarEstado", con);
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
            exito = (n > 0);
            return (exito);
        }
    }
}
