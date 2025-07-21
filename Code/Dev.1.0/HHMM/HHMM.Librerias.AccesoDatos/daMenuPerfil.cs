using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
	public class daMenuPerfil
	{
		public List<beMenu> listarPorPerfil(SqlConnection con, int idPerfil)
		{
			List<beMenu> lbeMenu = null;
			SqlCommand cmd = new SqlCommand("uspMenuPerfilListarPorPerfil", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@PerfilId", idPerfil);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeMenu = new List<beMenu>();
				int posMenuId = drd.GetOrdinal("MenuId");
				int posNombreMenu = drd.GetOrdinal("NombreMenu");
				int posURLPagina = drd.GetOrdinal("URLPagina");
				int posMenuPadreId = drd.GetOrdinal("MenuPadreId");
				beMenu obeMenu;
				while (drd.Read())
				{
					obeMenu = new beMenu();
					obeMenu.MenuId = drd.GetInt32(posMenuId);
					obeMenu.NombreMenu = drd.GetString(posNombreMenu);
					obeMenu.URLPagina = drd.GetString(posURLPagina);
					obeMenu.MenuPadreId = drd.GetInt32(posMenuPadreId);
					lbeMenu.Add(obeMenu);
				}
				drd.Close();
			}
			return (lbeMenu);
		}

		public string listarSucursal(SqlConnection con, string idSucursal,int id)
		{
			string rpta = "";
			SqlCommand cmd = new SqlCommand("uspUsuarioSucursalDescripcion", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@SucursalId", idSucursal);
			cmd.Parameters.AddWithValue("@UsuarioId", id);
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				if (drd.HasRows)
				{
					drd.Read();
					rpta = drd.GetString(0);
				}
			}
			return rpta;
		}

		

		public beMenuPerfilListas obtenerListas(SqlConnection con)
		{
			beMenuPerfilListas obeMenuPerfilListas = new beMenuPerfilListas();
			List<bePerfil> lbePerfil = null;
			List<beMenu> lbeMenu = null;
			List<beMenuPerfil> lbeMenuPerfil = null;
			List<beMenuAccion> lbeMenuPrivilegio = null;
			List<beMenuAccionPerfilVista> lbeMenuAccionPerfilVista = null;
			SqlCommand cmd = new SqlCommand("uspMenuPerfilListar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			SqlDataReader drd = cmd.ExecuteReader();
			if (drd != null)
			{
				lbePerfil = new List<bePerfil>();
				int posPerfilId = drd.GetOrdinal("PerfilId");
				int posNombrePerfil = drd.GetOrdinal("NombrePerfil");
				bePerfil obePerfil;
				while (drd.Read())
				{
					obePerfil = new bePerfil();
					obePerfil.PerfilId = drd.GetInt32(posPerfilId);
					obePerfil.NombrePerfil = drd.GetString(posNombrePerfil);
					lbePerfil.Add(obePerfil);
				}
				obeMenuPerfilListas.ListaPerfil = lbePerfil;
				if (drd.NextResult())
				{
					lbeMenu = new List<beMenu>();
					int posMenuId = drd.GetOrdinal("MenuId");
					int posNombreMenu = drd.GetOrdinal("NombreMenu");
					int posURLPagina = drd.GetOrdinal("URLPagina");
					int posMenuPadreId = drd.GetOrdinal("MenuPadreId");
					beMenu obeMenu;
					while (drd.Read())
					{
						obeMenu = new beMenu();
						obeMenu.MenuId = drd.GetInt32(posMenuId);
						obeMenu.NombreMenu = drd.GetString(posNombreMenu);
						obeMenu.URLPagina = drd.GetString(posURLPagina);
						obeMenu.MenuPadreId = drd.GetInt32(posMenuPadreId);
						lbeMenu.Add(obeMenu);
					}
					obeMenuPerfilListas.ListaMenu = lbeMenu;
					if (drd.NextResult())
					{
						lbeMenuPerfil = new List<beMenuPerfil>();
						int posPerfilIdMP = drd.GetOrdinal("PerfilId");
						int posMenuIdMP = drd.GetOrdinal("MenuId");
						beMenuPerfil obeMenuPerfil;
						while (drd.Read())
						{
							obeMenuPerfil = new beMenuPerfil();
							obeMenuPerfil.PerfilId = drd.GetInt32(posPerfilIdMP);
							obeMenuPerfil.MenuId = drd.GetInt32(posMenuIdMP);
							lbeMenuPerfil.Add(obeMenuPerfil);
						}
						obeMenuPerfilListas.ListaMenuPerfil = lbeMenuPerfil;
						if (drd.NextResult())
						{
							lbeMenuPrivilegio = new List<beMenuAccion>();
							int posMenuId2 = drd.GetOrdinal("MenuId");
							int posControl = drd.GetOrdinal("Control");
							int posDescripcion = drd.GetOrdinal("Descripcion");
							int posActivo = drd.GetOrdinal("Activo");
							int posMenuAccionId = drd.GetOrdinal("MenuAccionId");
							beMenuAccion obeMenuPrivilegio;
							while (drd.Read())
							{
								obeMenuPrivilegio = new beMenuAccion();
								obeMenuPrivilegio.MenuId = drd.GetInt32(posMenuId2);
								obeMenuPrivilegio.Control = drd.GetString(posControl);
								obeMenuPrivilegio.Descripcion = drd.GetString(posDescripcion);
								obeMenuPrivilegio.Activo = drd.GetInt32(posActivo);
								obeMenuPrivilegio.MenuAccionId = drd.GetInt32(posMenuAccionId);
								lbeMenuPrivilegio.Add(obeMenuPrivilegio);
							}
							obeMenuPerfilListas.ListaMenuPrivilegio = lbeMenuPrivilegio;
							if (drd.NextResult())
							{
								lbeMenuAccionPerfilVista = new List<beMenuAccionPerfilVista>();
								int posMenuAccionPerfil = drd.GetOrdinal("MenuAccionPerfil");
								int posMenuAccionId2 = drd.GetOrdinal("MenuAccionId");
								int posIndicadorActivo = drd.GetOrdinal("IndicadorActivo");
								int posPerfilIdAccion = drd.GetOrdinal("PerfilId");
								beMenuAccionPerfilVista obeMenuAccionPerfilVista;
								while (drd.Read())
								{
									obeMenuAccionPerfilVista = new beMenuAccionPerfilVista();
									obeMenuAccionPerfilVista.MenuAccionPerfil = drd.GetInt32(posMenuAccionPerfil);
									obeMenuAccionPerfilVista.MenuAccionId = drd.GetInt32(posMenuAccionId2);
									obeMenuAccionPerfilVista.IndicadorActivo = drd.GetInt32(posIndicadorActivo);
									obeMenuAccionPerfilVista.PerfilId = drd.GetInt32(posPerfilIdAccion);
									lbeMenuAccionPerfilVista.Add(obeMenuAccionPerfilVista);
								}
								obeMenuPerfilListas.ListaMenuAccionPerfil = lbeMenuAccionPerfilVista;
							}
						}
					}
				}
				drd.Close();
			}
			return (obeMenuPerfilListas);
		}

		public bool actualizarLista(SqlConnection con, string listaMenuPerfil, int UsuarioCreadorId)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMenuPerfilActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@ListaMenuPerfil", listaMenuPerfil);
			cmd.Parameters.AddWithValue("@UsuarioCreadorId", UsuarioCreadorId);
			int n = cmd.ExecuteNonQuery();
			exito = true;
			return exito;
		}

		public List<beCampoEnteroLargo> MenuAccionLista(SqlConnection con, int accionid,int idperfil )
		{
			List<beCampoEnteroLargo> lbeAccion = null;
			SqlCommand cmd = new SqlCommand("uspMenuAccionLista", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@MenuId", accionid);
			cmd.Parameters.AddWithValue("@PerfilId", idperfil);
			SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
			if (drd != null)
			{
				lbeAccion = new List<beCampoEnteroLargo>();
				int posMenuId = drd.GetOrdinal("MenuId");
				int posControl = drd.GetOrdinal("Control");
				int posActivo = drd.GetOrdinal("Activo");
				beCampoEnteroLargo obeAccion;
				while (drd.Read())
				{
					obeAccion = new beCampoEnteroLargo();
					obeAccion.campo1 = drd.GetInt32(posMenuId);
					obeAccion.campo2 = drd.GetString(posControl);
					obeAccion.campo3 = drd.GetInt32(posActivo);
					lbeAccion.Add(obeAccion);
				}
				drd.Close();
			}
			return lbeAccion;
		}

		public bool actualizarMenuAccionLista(SqlConnection con, string lista,int id)
		{
			bool exito = false;
			SqlCommand cmd = new SqlCommand("uspMenuAccionActualizar", con);
			cmd.CommandType = CommandType.StoredProcedure;
			cmd.Parameters.AddWithValue("@Lista", lista);
			cmd.Parameters.AddWithValue("@PerfilId", id);
			int n = cmd.ExecuteNonQuery();
			exito = true;
			return exito;
		}

	}
}
