using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daMedico
    {
        public List<beMedico> listar(SqlConnection con,string sucursal)
        {
            List<beMedico> lbeMedico = null;
            SqlCommand cmd = new SqlCommand("uspMedicoListarV2", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@sucursal", sucursal);
            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeMedico = new List<beMedico>();
                int posPersonaId = drd.GetOrdinal("PersonaId");
                int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                int posApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                int posNombre = drd.GetOrdinal("Nombre");
                int posCMP = drd.GetOrdinal("CMP");
				int posTipoPersona = drd.GetOrdinal("TipoPersona");
				int posNumeroDocumento = drd.GetOrdinal("NumeroDocumento");
				int posDocumentoFiscal = drd.GetOrdinal("DocumentoFiscal");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
                beMedico obeMedico;
                while (drd.Read())
                {
                    obeMedico = new beMedico();
                    obeMedico.PersonaId = drd.GetInt32(posPersonaId);
                    obeMedico.ApellidoPaterno = drd.GetString(posApellidoPaterno);
                    obeMedico.ApellidoMaterno = drd.GetString(posApellidoMaterno);
                    obeMedico.Nombre = drd.GetString(posNombre);
                    obeMedico.CMP = drd.GetString(posCMP);
					obeMedico.TipoPersona = drd.GetString(posTipoPersona);
					obeMedico.NumeroDocumento = drd.GetString(posNumeroDocumento);
					obeMedico.DocumentoFiscal = drd.GetString(posDocumentoFiscal);
                    obeMedico.Estado = drd.GetString(posEstadoRegistro);
                    lbeMedico.Add(obeMedico);
                }
                drd.Close();
            }
            return (lbeMedico);
        }

    }
}
