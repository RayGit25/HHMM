using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daMedicoContratoProveedor
    {
        public List<beMedicoContratoProveedor> listar(SqlConnection con, int MedicoContratoId)
        {
            List<beMedicoContratoProveedor> lbeMedicoContratoProveedor = null;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoProveedorListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@MedicoContratoId", MedicoContratoId);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeMedicoContratoProveedor = new List<beMedicoContratoProveedor>();
                int posMedicoContratoProveedorId = drd.GetOrdinal("MedicoContratoProveedorId");
                int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
                int posFechaIniVigen = drd.GetOrdinal("FechaInicioVigencia");
                int posFechaFinVigen = drd.GetOrdinal("FechaFinVigencia");
                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posTipoPersona = drd.GetOrdinal("TipoPersona");
                int posMedicoEmpresaId = drd.GetOrdinal("MedicoEmpresaId");
                int posTiempoPagoId = drd.GetOrdinal("TiempoPagoId");
                int posTipoDocumentoPagoId = drd.GetOrdinal("TipoDocumentoPagoId");
                int posCodigoImpuesto = drd.GetOrdinal("CodigoImpuesto");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                int posMedicoEmpresa = drd.GetOrdinal("MedicoEmpresa");
                int posRuc = drd.GetOrdinal("Ruc");
                int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");
                int posTipoMedico = drd.GetOrdinal("TipoMedico");
                int posCorreoElectronicoAlterno = drd.GetOrdinal("CorreoElectronicoAlterno");
                int posTipoPrestaciones = drd.GetOrdinal("TipoPrestaciones");
                int posComponenteId = drd.GetOrdinal("ComponenteId");
                beMedicoContratoProveedor obeMedicoContratoProveedor;
                while (drd.Read())
                {
                    obeMedicoContratoProveedor = new beMedicoContratoProveedor();
                    obeMedicoContratoProveedor.MedicoContratoProveedorId = drd.GetInt32(posMedicoContratoProveedorId);
                    obeMedicoContratoProveedor.EspecialidadId = drd.GetInt32(posEspecialidadId);
                    obeMedicoContratoProveedor.FechaInicioVigencia = drd.GetDateTime(posFechaIniVigen);
                    obeMedicoContratoProveedor.FechaFinVigencia = drd.GetDateTime(posFechaFinVigen);
                    obeMedicoContratoProveedor.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                    obeMedicoContratoProveedor.TipoPersona = drd.GetString(posTipoPersona);
                    obeMedicoContratoProveedor.MedicoEmpresaId = drd.GetInt32(posMedicoEmpresaId);
                    obeMedicoContratoProveedor.TiempoPagoId = drd.GetInt32(posTiempoPagoId);
                    obeMedicoContratoProveedor.TipoDocumentoPagoId = drd.GetString(posTipoDocumentoPagoId);
                    obeMedicoContratoProveedor.CodigoImpuesto = drd.GetString(posCodigoImpuesto);
                    obeMedicoContratoProveedor.EstadoRegistro = drd.GetString(posEstadoRegistro);
                    obeMedicoContratoProveedor.MedicoEmpresa = drd.GetString(posMedicoEmpresa);
                    obeMedicoContratoProveedor.Ruc = drd.GetString(posRuc);
                    obeMedicoContratoProveedor.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    obeMedicoContratoProveedor.TipoMedico = drd.GetString(posTipoMedico);
                    obeMedicoContratoProveedor.CorreoElectronicoAlterno = drd.GetString(posCorreoElectronicoAlterno);
                    obeMedicoContratoProveedor.TipoPrestaciones = drd.GetString(posTipoPrestaciones);
                    obeMedicoContratoProveedor.ComponenteId = drd.GetString(posComponenteId);
                    lbeMedicoContratoProveedor.Add(obeMedicoContratoProveedor);
                }
                drd.Close();
            }
            return (lbeMedicoContratoProveedor);
        }

        public int grabar(SqlConnection con, beMedicoContratoProveedor obeMedicoContratoProveedor, int usuarioId)
        {
            int id = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoProveedorAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@MedicoContratoId", obeMedicoContratoProveedor.MedicoContratoId);
            cmd.Parameters.AddWithValue("@EspecialidadId", obeMedicoContratoProveedor.EspecialidadId);
            cmd.Parameters.AddWithValue("@FechaInicioVigencia", obeMedicoContratoProveedor.FechaInicioVigencia);
            cmd.Parameters.AddWithValue("@FechaFinVigencia", obeMedicoContratoProveedor.FechaFinVigencia);
            cmd.Parameters.AddWithValue("@TipoAdmisionId", obeMedicoContratoProveedor.TipoAdmisionId);
            cmd.Parameters.AddWithValue("@TipoPersona", obeMedicoContratoProveedor.TipoPersona);
            cmd.Parameters.AddWithValue("@MedicoEmpresaId", obeMedicoContratoProveedor.MedicoEmpresaId);
            cmd.Parameters.AddWithValue("@TiempoPagoId", obeMedicoContratoProveedor.TiempoPagoId);
            cmd.Parameters.AddWithValue("@TipoDocumentoPagoId", obeMedicoContratoProveedor.TipoDocumentoPagoId);
            cmd.Parameters.AddWithValue("@CodigoImpuesto", obeMedicoContratoProveedor.CodigoImpuesto);
            cmd.Parameters.AddWithValue("@CorreoElectronico", obeMedicoContratoProveedor.CorreoElectronico);
            cmd.Parameters.AddWithValue("@TipoMedico", obeMedicoContratoProveedor.TipoMedico);
            cmd.Parameters.AddWithValue("@CorreoAlterno", obeMedicoContratoProveedor.CorreoElectronicoAlterno);
            cmd.Parameters.AddWithValue("@TipoPrestaciones", obeMedicoContratoProveedor.TipoPrestaciones);
            cmd.Parameters.AddWithValue("@ListaPrestaciones", obeMedicoContratoProveedor.ListaPrestaciones);
            SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
            if (n > 0) id = (int)par.Value;
            return (id);
        }
        public int actualizar(SqlConnection con, beMedicoContratoProveedor obeMedicoContratoProveedor, int usuarioId)
        {
            int id = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoProveedorActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@MedicoContratoProveedorId", obeMedicoContratoProveedor.MedicoContratoProveedorId);
            cmd.Parameters.AddWithValue("@MedicoContratoId", obeMedicoContratoProveedor.MedicoContratoId);
            cmd.Parameters.AddWithValue("@EspecialidadId", obeMedicoContratoProveedor.EspecialidadId);
            cmd.Parameters.AddWithValue("@FechaInicioVigencia", obeMedicoContratoProveedor.FechaInicioVigencia);
            cmd.Parameters.AddWithValue("@FechaFinVigencia", obeMedicoContratoProveedor.FechaFinVigencia);
            cmd.Parameters.AddWithValue("@TipoAdmisionId", obeMedicoContratoProveedor.TipoAdmisionId);
            cmd.Parameters.AddWithValue("@TipoPersona", obeMedicoContratoProveedor.TipoPersona);
            cmd.Parameters.AddWithValue("@MedicoEmpresaId", obeMedicoContratoProveedor.MedicoEmpresaId);
            cmd.Parameters.AddWithValue("@TiempoPagoId", obeMedicoContratoProveedor.TiempoPagoId);
            cmd.Parameters.AddWithValue("@TipoDocumentoPagoId", obeMedicoContratoProveedor.TipoDocumentoPagoId);
            cmd.Parameters.AddWithValue("@CodigoImpuesto", obeMedicoContratoProveedor.CodigoImpuesto);
            cmd.Parameters.AddWithValue("@CorreoElectronico", obeMedicoContratoProveedor.CorreoElectronico);
            cmd.Parameters.AddWithValue("@TipoMedico", obeMedicoContratoProveedor.TipoMedico);
            cmd.Parameters.AddWithValue("@CorreoAlterno", obeMedicoContratoProveedor.CorreoElectronicoAlterno);
            cmd.Parameters.AddWithValue("@TipoPrestaciones", obeMedicoContratoProveedor.TipoPrestaciones);
            cmd.Parameters.AddWithValue("@ListaPrestaciones", obeMedicoContratoProveedor.ListaPrestaciones);
            int n = cmd.ExecuteNonQuery();
            if (n > 0) id = n;
            return (id);
        }

        public int actualizarEstado(SqlConnection con, int usuarioId, int MedicoContratoProveedorId, string estado)
        {
            int id = -1;
            SqlCommand cmd = new SqlCommand("uspMedicoContratoProveedorActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UsuarioId", usuarioId);
            cmd.Parameters.AddWithValue("@MedicoContratoProveedorId", MedicoContratoProveedorId);
            cmd.Parameters.AddWithValue("@EstadoRegistro", estado);

            int n = cmd.ExecuteNonQuery();
            if (n > 0) id = n;
            return (id);
        }

        public string ObtenerDatosAdicionales(SqlConnection con, int id)
        {
            string rpta = "";
            SqlCommand cmd = new SqlCommand("uspMedicoEmpresaObtenerDatosAdicionales", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@PersonaId", id);

            object drd = cmd.ExecuteScalar();
            if (drd != null) rpta = drd.ToString();
            return (rpta);
        }
    }
}
