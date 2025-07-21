using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;


namespace HHMM.Librerias.AccesoDatos
{
    public class daBandejaCorreo
    {
        public List<beBandejaCorreo> listar(SqlConnection con, beBandejaCorreo obeBandejaCorreo)
        {
            List<beBandejaCorreo> lbeBandejaCorreo = null;
            SqlCommand cmd = new SqlCommand("uspBandejaCorreoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@SucursalId", obeBandejaCorreo.SucursalId);
            cmd.Parameters.AddWithValue("@PersonaId", obeBandejaCorreo.PersonaId);
            cmd.Parameters.AddWithValue("@TipoAdmisionId", obeBandejaCorreo.TipoAdmisionId);
            cmd.Parameters.AddWithValue("@MesPeriodo", obeBandejaCorreo.MesPeriodo);
            cmd.Parameters.AddWithValue("@AnioPeriodo", obeBandejaCorreo.AnioPeriodo);
            cmd.Parameters.AddWithValue("@OrdenAtencionId", obeBandejaCorreo.OrdenAtencionId);
            cmd.Parameters.AddWithValue("@ExpedienteId", obeBandejaCorreo.ExpedienteId);

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeBandejaCorreo = new List<beBandejaCorreo>();

                int posBandejaCorreoId = drd.GetOrdinal("BandejaCorreoId");
                int posRemitente = drd.GetOrdinal("Remitente");
                int posDestinatarios = drd.GetOrdinal("Destinatarios");
                int posPersonaId = drd.GetOrdinal("PersonaId");
                int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
                int posPeriodo = drd.GetOrdinal("Periodo");
                int posPlanillaId = drd.GetOrdinal("PlanillaId");
                int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");

                while (drd.Read())
                {
                    obeBandejaCorreo = new beBandejaCorreo();
                    obeBandejaCorreo.BandejaCorreoId = drd.GetInt32(posBandejaCorreoId);
                    obeBandejaCorreo.Remitente = drd.GetString(posRemitente);
                    obeBandejaCorreo.Destinatarios = drd.GetString(posDestinatarios);
                    obeBandejaCorreo.PersonaId = drd.GetInt32(posPersonaId);
                    obeBandejaCorreo.NombreCompleto = drd.GetString(posNombreCompleto);
                    obeBandejaCorreo.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                    obeBandejaCorreo.TipoAdmision = drd.GetString(posTipoAdmision);
                    obeBandejaCorreo.Periodo = drd.GetString(posPeriodo);
                    obeBandejaCorreo.PlanillaId = drd.GetInt32(posPlanillaId);
                    obeBandejaCorreo.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
                    lbeBandejaCorreo.Add(obeBandejaCorreo);
                }

                drd.Close();
            }
            return lbeBandejaCorreo;
        }

        public beBandejaCorreoListar listarPorId(SqlConnection con, beBandejaCorreo obeBandejaCorreo)
        {
            beBandejaCorreoListar obeBandejaCorreoListar = null;
            List<beBandejaCorreo> lbeBandejaCorreo = null;
            List<beBandejaCorreoAdjunto> lbeBandejaCorreoAdjunto = null;
            SqlCommand cmd = new SqlCommand("uspBandejaCorreoListarPorId", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BandejaCorreoId", obeBandejaCorreo.BandejaCorreoId);

            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeBandejaCorreo = new List<beBandejaCorreo>();

                int posBandejaCorreoId = drd.GetOrdinal("BandejaCorreoId");
                int posRemitente = drd.GetOrdinal("Remitente");
                int posDestinatarios = drd.GetOrdinal("Destinatarios");
                int posPersonaId = drd.GetOrdinal("PersonaId");
                int posNombreCompleto = drd.GetOrdinal("NombreCompleto");
                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posTipoAdmision = drd.GetOrdinal("TipoAdmision");
                int posPeriodo = drd.GetOrdinal("Periodo");
                int posCuerpoCorreo = drd.GetOrdinal("CuerpoCorreo");
                int posPlanillaId = drd.GetOrdinal("PlanillaId");
                int posFechaHoraCreacion = drd.GetOrdinal("FechaHoraCreacion");

                while (drd.Read())
                {
                    obeBandejaCorreo = new beBandejaCorreo();
                    obeBandejaCorreo.BandejaCorreoId = drd.GetInt32(posBandejaCorreoId);
                    obeBandejaCorreo.Remitente = drd.GetString(posRemitente);
                    obeBandejaCorreo.Destinatarios = drd.GetString(posDestinatarios);
                    obeBandejaCorreo.PersonaId = drd.GetInt32(posPersonaId);
                    obeBandejaCorreo.NombreCompleto = drd.GetString(posNombreCompleto);
                    obeBandejaCorreo.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                    obeBandejaCorreo.TipoAdmision = drd.GetString(posTipoAdmision);
                    obeBandejaCorreo.Periodo = drd.GetString(posPeriodo);
                    obeBandejaCorreo.CuerpoCorreo = drd.GetString(posCuerpoCorreo);
                    obeBandejaCorreo.PlanillaId = drd.GetInt32(posPlanillaId);
                    obeBandejaCorreo.FechaHoraCreacion = drd.GetDateTime(posFechaHoraCreacion);
                    lbeBandejaCorreo.Add(obeBandejaCorreo);
                }

                drd.NextResult();

                lbeBandejaCorreoAdjunto = new List<beBandejaCorreoAdjunto>();
                beBandejaCorreoAdjunto obeBandejaCorreoAdjunto;

                int pos2NombreAdjunto = drd.GetOrdinal("NombreAdjunto");
				int pos2NombreArchivo = drd.GetOrdinal("NombreArchivo");

                while (drd.Read())
                {
                    obeBandejaCorreoAdjunto = new beBandejaCorreoAdjunto();
                    obeBandejaCorreoAdjunto.NombreAdjunto = drd.GetString(pos2NombreAdjunto);
					obeBandejaCorreoAdjunto.NombreArchivo = drd.GetString(pos2NombreArchivo);
                    lbeBandejaCorreoAdjunto.Add(obeBandejaCorreoAdjunto);
                }


                drd.Close();
            }


            obeBandejaCorreoListar = new beBandejaCorreoListar();
            obeBandejaCorreoListar.ListaBandejaCorreo = lbeBandejaCorreo;
            obeBandejaCorreoListar.ListaBandejaCorreoAdjunto = lbeBandejaCorreoAdjunto;
         

            return obeBandejaCorreoListar;
        }

        public List<beTipoAdmision> listar(SqlConnection con)
        {
            List<beTipoAdmision> lbeTipoAdmision = null;
            SqlCommand cmd = new SqlCommand("uspBandejaCorreoListas", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
            if (drd != null)
            {
                lbeTipoAdmision = new List<beTipoAdmision>();

                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posDescripcion = drd.GetOrdinal("Descripcion");

                beTipoAdmision obeTipoAdmision = null;

                while (drd.Read())
                {
                    obeTipoAdmision = new beTipoAdmision();
                    obeTipoAdmision.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                    obeTipoAdmision.Descripcion = drd.GetString(posDescripcion);
                 
                    lbeTipoAdmision.Add(obeTipoAdmision);
                }

                drd.Close();
            }
            return lbeTipoAdmision;
        }

    }
}
