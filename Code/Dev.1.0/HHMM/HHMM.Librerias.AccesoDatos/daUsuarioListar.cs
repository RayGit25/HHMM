using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daUsuarioListar
    {
        public beUsuarioListar obtenerListas(SqlConnection con)
        {
            beUsuarioListar obeUsuarioListar = new beUsuarioListar();

            List<beUsuarioCompaniaSucursal> lbeUsuarioCompaniaSucursal = null;
            List<beCompaniaSucursal> lbeCompaniaSucursal = null;
            List<bePerfilNombre> lbePerfilNombre = null;
            List<beCompania> lbeCompania = null;
            List<beSucursalCompania> lbeSucursalCompania = null;
			List<beTipoDocumento> lbeTipoDocumento = null;

            SqlCommand cmd = new SqlCommand("uspUsuarioListar", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                lbeUsuarioCompaniaSucursal = new List<beUsuarioCompaniaSucursal>();
                int posUsuarioId = drd.GetOrdinal("UsuarioId");
                int posCodigoUsuario = drd.GetOrdinal("CodigoUsuario");
                int posNombre = drd.GetOrdinal("Nombre");
                int posApellidoPaterno = drd.GetOrdinal("ApellidoPaterno");
                int posApellidoMaterno = drd.GetOrdinal("ApellidoMaterno");
                int posPerfilId = drd.GetOrdinal("PerfilId");
                int posCantidadSucursal = drd.GetOrdinal("CantidadSucursal");
                int posCompania = drd.GetOrdinal("Compania");
                int posSucursal = drd.GetOrdinal("Sucursal");
                int posIndicadorAD = drd.GetOrdinal("IndicadorAD");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posFechaNacimiento = drd.GetOrdinal("FechaNacimiento");
				int posTipoDocumentoId = drd.GetOrdinal("TipoDocumentoId");
				int posNumeroDocumento = drd.GetOrdinal("NumeroDocumento");
				int posCorreoElectronico = drd.GetOrdinal("CorreoElectronico");

                beUsuarioCompaniaSucursal obeUsuarioCompaniaSucursal;
                while (drd.Read())
                {
                    obeUsuarioCompaniaSucursal = new beUsuarioCompaniaSucursal();
                    obeUsuarioCompaniaSucursal.UsuarioId = drd.GetInt32(posUsuarioId);
                    obeUsuarioCompaniaSucursal.CodigoUsuario = drd.GetString(posCodigoUsuario);
                    obeUsuarioCompaniaSucursal.Nombre = drd.GetString(posNombre);
                    obeUsuarioCompaniaSucursal.ApellidoPaterno = drd.GetString(posApellidoPaterno);
                    obeUsuarioCompaniaSucursal.ApellidoMaterno = drd.GetString(posApellidoMaterno);
                    obeUsuarioCompaniaSucursal.PerfilId = drd.GetInt32(posPerfilId);
                    obeUsuarioCompaniaSucursal.CantidadSucursal = drd.GetInt32(posCantidadSucursal);
                    obeUsuarioCompaniaSucursal.Compania = drd.GetString(posCompania);
                    obeUsuarioCompaniaSucursal.Sucursal = drd.GetString(posSucursal);
                    obeUsuarioCompaniaSucursal.IndicadorAD = drd.GetBoolean(posIndicadorAD);
                    obeUsuarioCompaniaSucursal.EstadoRegistro = drd.GetString(posEstadoRegistro);
					obeUsuarioCompaniaSucursal.FechaNacimiento = drd.GetDateTime(posFechaNacimiento);
					obeUsuarioCompaniaSucursal.TipoDocumentoId = drd.GetString(posTipoDocumentoId);
					obeUsuarioCompaniaSucursal.NumeroDocumento = drd.GetString(posNumeroDocumento);
					obeUsuarioCompaniaSucursal.CorreoElectronico = drd.GetString(posCorreoElectronico);
                    lbeUsuarioCompaniaSucursal.Add(obeUsuarioCompaniaSucursal);
                }
                obeUsuarioListar.lbeUsuarioCompaniaSucursal = lbeUsuarioCompaniaSucursal;
                if (drd.NextResult())
                {
                    lbeCompaniaSucursal = new List<beCompaniaSucursal>();
                    int posiUsuarioId = drd.GetOrdinal("UsuarioId");
                    int posiCompaniaId = drd.GetOrdinal("CompaniaId");
                    int posiCompania = drd.GetOrdinal("Compania");
                    int posiSucursalId = drd.GetOrdinal("SucursalId");
                    int posiSucursal = drd.GetOrdinal("Sucursal");
                    int posiEstadoRegistro = drd.GetOrdinal("EstadoRegistro");

                    beCompaniaSucursal obeCompaniaSucursal;
                    while (drd.Read())
                    {
                        obeCompaniaSucursal = new beCompaniaSucursal();
                        obeCompaniaSucursal.UsuarioId = drd.GetInt32(posiUsuarioId);
                        obeCompaniaSucursal.CompaniaId = drd.GetString(posiCompaniaId);
                        obeCompaniaSucursal.Compania = drd.GetString(posiCompania);
                        obeCompaniaSucursal.SucursalId = drd.GetString(posiSucursalId);
                        obeCompaniaSucursal.Sucursal = drd.GetString(posiSucursal);
                        obeCompaniaSucursal.EstadoRegistro = drd.GetString(posiEstadoRegistro);
                        lbeCompaniaSucursal.Add(obeCompaniaSucursal);
                    }
                    obeUsuarioListar.lbeCompaniaSucursal = lbeCompaniaSucursal;
                    if (drd.NextResult())
                    {
                        lbePerfilNombre = new List<bePerfilNombre>();
                        int posicPerfilId = drd.GetOrdinal("PerfilId");
                        int posicNombrePerfil = drd.GetOrdinal("NombrePerfil");

                        bePerfilNombre obePerfilNombre;
                        while (drd.Read())
                        {
                            obePerfilNombre = new bePerfilNombre();
                            obePerfilNombre.PerfilId = drd.GetInt32(posicPerfilId);
                            obePerfilNombre.NombrePerfil = drd.GetString(posicNombrePerfil);
                            lbePerfilNombre.Add(obePerfilNombre);
                        }
                        obeUsuarioListar.lbePerfilNombre = lbePerfilNombre;
                        if (drd.NextResult())
                        {
                            lbeCompania = new List<beCompania>();
                            int poCompaniaId = drd.GetOrdinal("CompaniaId");
                            int poCompania = drd.GetOrdinal("Compania");

                            beCompania obeCompania;
                            while (drd.Read())
                            {
                                obeCompania = new beCompania();
                                obeCompania.CompaniaId = drd.GetString(poCompaniaId);
                                obeCompania.Compania = drd.GetString(poCompania);
                                lbeCompania.Add(obeCompania);
                            }
                            obeUsuarioListar.lbeCompania = lbeCompania;
                            if (drd.NextResult())
                            {
                                lbeSucursalCompania = new List<beSucursalCompania>();
                                int pSucursalId = drd.GetOrdinal("SucursalId");
                                int pSucursal = drd.GetOrdinal("Sucursal");
                                int pCompaniaId = drd.GetOrdinal("CompaniaId");

                                beSucursalCompania obeSucursalCompania;
                                while (drd.Read())
                                {
                                    obeSucursalCompania = new beSucursalCompania();
                                    obeSucursalCompania.SucursalId = drd.GetString(pSucursalId);
                                    obeSucursalCompania.Sucursal = drd.GetString(pSucursal);
                                    obeSucursalCompania.CompaniaId = drd.GetString(pCompaniaId);
                                    lbeSucursalCompania.Add(obeSucursalCompania);
                                }
                                obeUsuarioListar.lbeSucursalCompania = lbeSucursalCompania;
								if (drd.NextResult())
								{
									lbeTipoDocumento = new List<beTipoDocumento>();
									int gTipoDocumentoId = drd.GetOrdinal("TipoDocumentoId");
									int gDescripcion = drd.GetOrdinal("Descripcion");

									beTipoDocumento obeTipoDocumento;
									while (drd.Read())
									{
										obeTipoDocumento = new beTipoDocumento();
										obeTipoDocumento.TipoDocumentoId = drd.GetString(gTipoDocumentoId);
										obeTipoDocumento.Descripcion = drd.GetString(gDescripcion);
										lbeTipoDocumento.Add(obeTipoDocumento);
									}
									obeUsuarioListar.lbeTipoDocumento = lbeTipoDocumento;
								}
                            }
                        }
                    }
                }
                drd.Close();
            }
            return (obeUsuarioListar);
        }

		public int adicionar(SqlConnection con, beUsuarioMantenimiento obeUsuarioMantenimiento)
		{

			int id = -1;

			SqlCommand cmd = new SqlCommand("uspUsuarioAdicionar", con);
			cmd.CommandType = CommandType.StoredProcedure;

			cmd.Parameters.AddWithValue("@CodigoUsuario", obeUsuarioMantenimiento.CodigoUsuario);
			cmd.Parameters.AddWithValue("@Nombre", obeUsuarioMantenimiento.Nombre);
			cmd.Parameters.AddWithValue("@ApellidoPaterno", obeUsuarioMantenimiento.ApellidoPaterno);
			cmd.Parameters.AddWithValue("@ApellidoMaterno", obeUsuarioMantenimiento.ApellidoMaterno);
			cmd.Parameters.AddWithValue("@FechaNacimiento", obeUsuarioMantenimiento.FechaNacimiento);
			cmd.Parameters.AddWithValue("@TipoDocumentoId", obeUsuarioMantenimiento.TipoDocumentoId);
			cmd.Parameters.AddWithValue("@NumeroDocumento", obeUsuarioMantenimiento.NumeroDocumento);
			cmd.Parameters.AddWithValue("@IndicadorAD", obeUsuarioMantenimiento.IndicadorAD);
			cmd.Parameters.AddWithValue("@CorreoElectronico", obeUsuarioMantenimiento.CorreoElectronico);
			cmd.Parameters.AddWithValue("@PerfilId", obeUsuarioMantenimiento.PerfilId);
			cmd.Parameters.AddWithValue("@UsuarioCreadorId", obeUsuarioMantenimiento.UsuarioCreadorId);
			cmd.Parameters.AddWithValue("@Contrasena", obeUsuarioMantenimiento.Contrasena);
			cmd.Parameters.AddWithValue("@ListaCompania", obeUsuarioMantenimiento.ListaCompania);
			cmd.Parameters.AddWithValue("@ListaSucursal", obeUsuarioMantenimiento.ListaSucursal);
            SqlParameter par = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;           

            int n = cmd.ExecuteNonQuery();

            id = (int)par.Value;
			return (id);
		}

		public int actualizar(SqlConnection con, int UsuarioId, beUsuarioMantenimiento obeUsuarioMantenimiento)
		{
            int id = -1;

			SqlCommand cmd = new SqlCommand("uspUsuarioActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@UsuarioId", UsuarioId);
			cmd.Parameters.AddWithValue("@CodigoUsuario", obeUsuarioMantenimiento.CodigoUsuario);
			cmd.Parameters.AddWithValue("@Nombre", obeUsuarioMantenimiento.Nombre);
			cmd.Parameters.AddWithValue("@ApellidoPaterno", obeUsuarioMantenimiento.ApellidoPaterno);
			cmd.Parameters.AddWithValue("@ApellidoMaterno", obeUsuarioMantenimiento.ApellidoMaterno);
			cmd.Parameters.AddWithValue("@FechaNacimiento", obeUsuarioMantenimiento.FechaNacimiento);
			cmd.Parameters.AddWithValue("@TipoDocumentoId", obeUsuarioMantenimiento.TipoDocumentoId);
			cmd.Parameters.AddWithValue("@NumeroDocumento", obeUsuarioMantenimiento.NumeroDocumento);
			cmd.Parameters.AddWithValue("@IndicadorAD", obeUsuarioMantenimiento.IndicadorAD);
			cmd.Parameters.AddWithValue("@CorreoElectronico", obeUsuarioMantenimiento.CorreoElectronico);
			cmd.Parameters.AddWithValue("@PerfilId", obeUsuarioMantenimiento.PerfilId);
			cmd.Parameters.AddWithValue("@UsuarioModificacionId", obeUsuarioMantenimiento.UsuarioCreadorId);////
			cmd.Parameters.AddWithValue("@ListaCompania", obeUsuarioMantenimiento.ListaCompania);
			cmd.Parameters.AddWithValue("@ListaSucursal", obeUsuarioMantenimiento.ListaSucursal);
            SqlParameter par = cmd.Parameters.Add("@Retorno", SqlDbType.Int);
            par.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();

            id = (int)par.Value;
            return (id);

		}

        public bool actualizarEstado(SqlConnection con, int Id, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;

            SqlCommand cmd = new SqlCommand("uspUsuarioActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UsuarioId", Id);
            cmd.Parameters.AddWithValue("@Estado", EstadoRegistro);
            cmd.Parameters.AddWithValue("@UsuarioModificacionId", UsuarioId);
            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }
    }
}
