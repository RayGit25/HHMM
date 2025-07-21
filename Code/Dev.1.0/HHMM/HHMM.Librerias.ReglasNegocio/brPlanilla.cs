using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using General.Librerias.CodigoUsuario;
using HHMM.Librerias.AccesoDatos;
using HHMM.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.ReglasNegocio
{
    public class brPlanilla : brGeneral
    {
        public List<bePlanillaVistaResumen> listarPlanillaResumen(string sucursal)
        {
            List<bePlanillaVistaResumen> lbePlanillaVistaResumen = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    lbePlanillaVistaResumen = odaPlanilla.listarPlanillaResumen(con, sucursal);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (lbePlanillaVistaResumen);
        }

        public List<beProcesoMedico> listarProcesoMedico(string sucursal, string lista, int oa, int paciente, DateTime fechainicio, DateTime fechafin)
        {
            List<beProcesoMedico> lbeProcesoMedico = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    lbeProcesoMedico = odaPlanilla.listarProcesoMedico(con, sucursal, lista, oa, paciente, fechainicio, fechafin);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (lbeProcesoMedico);
        }

        public List<bePacienteVista> listarPacientes(string apepaterno, string apematerno, string nombre)
        {
            List<bePacienteVista> lbePacienteVista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    lbePacienteVista = odaPlanilla.listarPacientes(con, apepaterno, apematerno, nombre);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (lbePacienteVista);
        }

		public beProcesoMedicoVista listarDetalledeConceptos(int ProId, int PerId, int es, string sap)
        {
            beProcesoMedicoVista obeProcesoMedicoVista = null;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    obeProcesoMedicoVista = odaPlanilla.listarDetalledeConceptos(con, ProId, PerId,es,sap);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (obeProcesoMedicoVista);
        }

        public string CalculoProcesoMedico(string su, int pro, int tipoAdmi, DateTime fechainicio, DateTime fechafin, string lista, int usuario, bool indicador1, bool indicador2, bool indicador3, bool indicador4, bool indicador5, bool indicador6, bool indicador7)
        {
			string	 exito = "";
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    exito = odaPlanilla.CalculoProcesoMedico(con, su, pro, tipoAdmi, fechainicio, fechafin, lista, usuario, indicador1, indicador2, indicador3, indicador4, indicador5, indicador6, indicador7);
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (exito);
        }

        public int ProcesoMedicoActualizarEstado(string lista, int usuario, string estado, int id,string sucursalId="")
        {
            int resultado = 0;
            using (SqlConnection con = new SqlConnection(Conexion))
            {
                try
                {
                    con.Open();
                    daPlanilla odaPlanilla = new daPlanilla();
                    resultado = odaPlanilla.ProcesoMedicoActualizarEstado(con, lista, usuario, estado, id);

					//if(estado=="F"){
					//	int n = odaPlanilla.generarAsientoProvision(con, id, sucursalId, usuario);
					//}
                }
                catch (SqlException ex)
                {
                    foreach (SqlError err in ex.Errors)
                    {
                        ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
                    }
                }
                catch (Exception ex)
                {
                    ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
                }
            }
            return (resultado);
        }

		public beDetalleOAListas listarDetalledeConceptosOA(int id, string sap)
		{
			beDetalleOAListas obeDetalleOAListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obeDetalleOAListas = odaPlanilla.listarDetalledeConceptosOA(con, id, sap);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obeDetalleOAListas);
		}

		public bePlanillasListas obtenerListas(string SucursalId,int indoa)
		{
			bePlanillasListas obePlanillasListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obePlanillasListas = odaPlanilla.obtenerListas(con, SucursalId,indoa);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obePlanillasListas);
		}
		public bool validarFuncionalidad(string valorParametro)
		{
			bool exito = false;
			string rpta = "0";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daSQL odaSQL = new daSQL();
					//string valorParametro = "FUNCIONALIDAD¦SAP CSFR";
					rpta = odaSQL.EjecutarComando(con, "uspValidarFuncionalidadSAP", "@lstParametros", valorParametro);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			exito = (rpta.Equals("0") ? false : true);
			return (exito);
		}

		public bePlanillaDetalleListas obtenerDetalleListas(string lista, int indNoOA)
		{
			bePlanillaDetalleListas obePlanillaDetalleListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obePlanillaDetalleListas = odaPlanilla.obtenerDetalleListas(con, lista, indNoOA);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obePlanillaDetalleListas);
		}
		public string grabarPlanilla(string lista, string listadetalle, int anio, string su, int usuario, string descripcion, string TipoProceso, int idProcesoPlanilla, bool indDescuento)
		{
			string exito = "";
			SqlTransaction SQltx=null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					SQltx=con.BeginTransaction();
					daPlanilla odaPlanilla = new daPlanilla();
					
					bool indicadorSeparar = false;
					exito = odaPlanilla.grabarPlanilla(con, lista, listadetalle, anio, su, usuario, descripcion, TipoProceso, idProcesoPlanilla, SQltx, indicadorSeparar, indDescuento);
					
					daSQL odaSQL = new daSQL();
					string valorParametro = "FUNCIONALIDAD¦Separar Planilla";
					string rptaFuncionalidad = odaSQL.EjecutarComando(con, "uspValidarFuncionalidadCsv", "@lstParametros", valorParametro, SQltx);

					if (rptaFuncionalidad.Equals("1"))
					{
						indicadorSeparar = true;
						exito = odaPlanilla.grabarPlanilla(con, lista, listadetalle, anio, su, usuario, descripcion, TipoProceso, idProcesoPlanilla, SQltx, indicadorSeparar, indDescuento);
					}
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
				finally
				{
					if(exito!=""){
					
					SQltx.Commit();
					}else{
						SQltx.Rollback();
					}
				}
			}
			return (exito);
		}

		public beMedicoAsientoProvisionListas generarAsientoProvision(int procesoId, string sucursalId, int usuarioId, DateTime fecha,string ip,string bd)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obeMedicoAsientoProvisionListas = odaPlanilla.generarAsientoProvision(con, procesoId, sucursalId, usuarioId, fecha,ip,bd);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obeMedicoAsientoProvisionListas);
		}
		public beMedicoAsientoProvisionListas generarAsientoProvisionCSFR(int procesoId, string sucursalId, int usuarioId, DateTime fecha)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obeMedicoAsientoProvisionListas = odaPlanilla.generarAsientoProvisionCSFR(con, procesoId, sucursalId, usuarioId, fecha);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obeMedicoAsientoProvisionListas);
		}
		public bool generarInterfaseSAP_ProvisionHHMMCSFR(int procesoId, int usuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					exito = odaPlanilla.generarInterfaseSAP_ProvisionHHMMCSFR(con, procesoId, usuarioId);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (exito);
		}
		public bool generarInterfaseSAP_PlanillaHHMMCSFR(string listaPlanillaId, int usuarioId)
		{
			bool exito = false;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					exito = odaPlanilla.generarInterfaseSAP_PlanillaHHMMCSFR(con, listaPlanillaId, usuarioId);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (exito);
		}
		public beMedicoAsientoProvisionListas generarObligacionPago(int procesoplanillaid, string planillaid, string sucursalId, int usuarioId,string ip,string bd)
		{
			beMedicoAsientoProvisionListas obeMedicoAsientoProvisionListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obeMedicoAsientoProvisionListas = odaPlanilla.generarObligacionPago(con, procesoplanillaid, planillaid, sucursalId, usuarioId,ip,bd);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (obeMedicoAsientoProvisionListas);
		}

		public string grabarPlanillaCarga(string lista, string descripcion, int anio, string su, int usuario,int tipo)
		{
			string exito = "";
			SqlTransaction SQltx = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					SQltx = con.BeginTransaction();
					daPlanilla odaPlanilla = new daPlanilla();

					bool indicadorSeparar = false;
					exito = odaPlanilla.grabarPlanillaCarga(con, lista, descripcion, anio, su, usuario,tipo, SQltx, indicadorSeparar);

					daSQL odaSQL = new daSQL();
					string valorParametro = "FUNCIONALIDAD¦Separar Planilla";
					string rptaFuncionalidad = odaSQL.EjecutarComando(con, "uspValidarFuncionalidadCsv", "@lstParametros", valorParametro, SQltx);

					if (rptaFuncionalidad.Equals("1"))
					{
						indicadorSeparar = true;
						exito = odaPlanilla.grabarPlanillaCarga(con, lista, descripcion, anio, su, usuario, tipo, SQltx, indicadorSeparar);
					}
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
				finally
				{
					if (exito != "")
					{

						SQltx.Commit();
					}
					else
					{
						SQltx.Rollback();
					}
				}
			}
			return (exito);
		}

		public List<bePlanillaUnificacion> listarUnificacionPlanilla(int id)
		{
			List<bePlanillaUnificacion> lbePlanillaUnificacion = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					lbePlanillaUnificacion = odaPlanilla.listarUnificacionPlanilla(con, id);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return lbePlanillaUnificacion;
		}
		public string unificarPlanillas(int idPlanillaUnificada, string lstIdPlanillas, string motivo, int idUsuario)
		{
			string resultado = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaProcesoPlanilla = new daPlanilla();
					resultado = odaProcesoPlanilla.unificarPlanillas(con, idPlanillaUnificada, lstIdPlanillas, motivo, idUsuario);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (resultado);
		}

		public beAprobacionPagoListas AprobacionPago_Listas(string idSucursal)
		{
			beAprobacionPagoListas obeAprobacionPagoListas = null;
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaPlanilla = new daPlanilla();
					obeAprobacionPagoListas = odaPlanilla.AprobacionPago_Listas(con, idSucursal);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return obeAprobacionPagoListas;
		}

		public string AprobacionPago_Grabar(string idSucursal, string lstIdPlanillas, int idUsuario)
		{
			string resultado = "";
			using (SqlConnection con = new SqlConnection(Conexion))
			{
				try
				{
					con.Open();
					daPlanilla odaProcesoPlanilla = new daPlanilla();
					resultado = odaProcesoPlanilla.AprobacionPago_Grabar(con, idSucursal, lstIdPlanillas, idUsuario);
				}
				catch (SqlException ex)
				{
					foreach (SqlError err in ex.Errors)
					{
						ucObjeto<SqlError>.grabarArchivoTexto(err, Archivo);
					}
				}
				catch (Exception ex)
				{
					ucObjeto<Exception>.grabarArchivoTexto(ex, Archivo);
				}
			}
			return (resultado);
		}
	}
}
