using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using HHMM.Librerias.EntidadesNegocio;
using General.Librerias.EntidadesNegocio;

namespace HHMM.Librerias.AccesoDatos
{
    public class daCuentaProvisionPago
    {
        public beCuentaProvisionPagoVistaLista listarVista(SqlConnection con,string sup,int se,int tad,string tap,string cu, string Pa, string Pe)
        {
            beCuentaProvisionPagoVistaLista obeCuentaProvisionPagoVistaLista = null;
            List<beCuentaProvisionPagoVista> lbeCuentaProvisionPagoVista = null;
            SqlCommand cmd = new SqlCommand("uspCuentaProvisionPagoListar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par1.Direction = ParameterDirection.Input;
            par1.Value = sup;

            SqlParameter par2 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
            par2.Direction = ParameterDirection.Input;
            par2.Value = se;

            SqlParameter par3 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = tad;

            SqlParameter par4 = cmd.Parameters.Add("@TipoAsiento", SqlDbType.Char, 1);
            par4.Direction = ParameterDirection.Input;
            par4.Value = tap;

            SqlParameter par5 = cmd.Parameters.Add("@PlanCuentaContableId", SqlDbType.VarChar, 25);
            par5.Direction = ParameterDirection.Input;
            par5.Value = cu;

            SqlParameter par6 = cmd.Parameters.Add("@TipoPersona", SqlDbType.Char, 1);
            par6.Direction = ParameterDirection.Input;
            par6.Value = Pa;

            SqlParameter par7 = cmd.Parameters.Add("@TipoPaciente", SqlDbType.VarChar, 50);
            par7.Direction = ParameterDirection.Input;
            par7.Value = Pe;

            
             SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeCuentaProvisionPagoVistaLista = new beCuentaProvisionPagoVistaLista();
                lbeCuentaProvisionPagoVista = new List<beCuentaProvisionPagoVista>();
                int posCuentaProvisionPagoId = drd.GetOrdinal("CuentaProvisionPagoId");
                int posSucursalId = drd.GetOrdinal("SucursalId");
                int posTipoAsiento = drd.GetOrdinal("TipoAsiento");
                int posServicioId = drd.GetOrdinal("ServicioId");
                int posMonedaId = drd.GetOrdinal("MonedaId");
                int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                int posComponenteArticulo = drd.GetOrdinal("ComponenteArticulo");
                int posTipoComponente = drd.GetOrdinal("TipoComponente");
                int posEspecialidadId = drd.GetOrdinal("EspecialidadId");
                int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
                int posEstadoRegistro = drd.GetOrdinal("EstadoRegistro");
				int posComponenteDescripcion = drd.GetOrdinal("ComponenteDescripcion");

				int posPlanCuentaSVCostoId = drd.GetOrdinal("PlanCuentaSVCostoId");
				int posPlanCuentaSVProveedorId = drd.GetOrdinal("PlanCuentaSVProveedorId");
				int posPlanCuentaSVClienteId = drd.GetOrdinal("PlanCuentaSVClienteId");
				int posPlanCuentaNVCostoId = drd.GetOrdinal("PlanCuentaNVCostoId");
				int posPlanCuentaNVProveedorId = drd.GetOrdinal("PlanCuentaNVProveedorId");
				int posPlanCuentaNVClienteId = drd.GetOrdinal("PlanCuentaNVClienteId");

				int posPlanCuentaContableVcostoDesc = drd.GetOrdinal("PlanCuentaContableVcostoDesc");
				int posPlanCuentaContableVprovDesc = drd.GetOrdinal("PlanCuentaContableVprovDesc");
				int posPlanCuentaContableVcliDesc = drd.GetOrdinal("PlanCuentaContableVcliDesc");
				int posPlanCuentaContableNVcostoDesc = drd.GetOrdinal("PlanCuentaContableNVcostoDesc");
				int posPlanCuentaContableNVprovDesc = drd.GetOrdinal("PlanCuentaContableNVprovDesc");
				int posPlanCuentaContableNVcliDesc = drd.GetOrdinal("PlanCuentaContableNVcliDesc");

				int posIndicadorProduccion = drd.GetOrdinal("IndicadorProduccion");
				int posIndicadorEscalonado = drd.GetOrdinal("IndicadorEscalonado");
				int posIndicadorMontoFijo = drd.GetOrdinal("IndicadorMontoFijo");
				int posIndicadorHorario = drd.GetOrdinal("IndicadorHorario");
				int posIndicadorTurno = drd.GetOrdinal("IndicadorTurno");
				int posIndicadorCompartido = drd.GetOrdinal("IndicadorCompartido");
				int posIndicadorVacuna = drd.GetOrdinal("IndicadorVacuna");

				int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
				int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");

                int posTipoPacienteId = drd.GetOrdinal("TipoPacienteId");
                int posTipoPersona = drd.GetOrdinal("TipoPersona");

                beCuentaProvisionPagoVista obeCuentaProvisionPagoVista;
                while (drd.Read())
                {
                    obeCuentaProvisionPagoVista = new beCuentaProvisionPagoVista();
                    obeCuentaProvisionPagoVista.CuentaProvisionPagoId = drd.GetInt32(posCuentaProvisionPagoId);
                    obeCuentaProvisionPagoVista.SucursalId = drd.GetString(posSucursalId);
                    obeCuentaProvisionPagoVista.TipoAsiento = drd.GetString(posTipoAsiento).Trim();
                    obeCuentaProvisionPagoVista.ServicioId = drd.GetInt32(posServicioId);
                    obeCuentaProvisionPagoVista.MonedaId = drd.GetString(posMonedaId);
                    obeCuentaProvisionPagoVista.TipoAdmisionId = drd.GetInt32(posTipoAdmisionId);
                    obeCuentaProvisionPagoVista.ComponenteArticulo = drd.GetString(posComponenteArticulo);
                    obeCuentaProvisionPagoVista.TipoComponente = drd.GetString(posTipoComponente);
                    obeCuentaProvisionPagoVista.EspecialidadId = drd.GetInt32(posEspecialidadId);
                    obeCuentaProvisionPagoVista.ClasificadorMovimientoId = drd.GetString(posClasificadorMovimientoId);
                    obeCuentaProvisionPagoVista.EstadoRegistro = drd.GetString(posEstadoRegistro).Trim();
					obeCuentaProvisionPagoVista.ComponenteDescripcion = drd.GetString(posComponenteDescripcion).Trim();
					obeCuentaProvisionPagoVista.PlanCuentaSVCostoId = drd.GetString(posPlanCuentaSVCostoId);
					obeCuentaProvisionPagoVista.PlanCuentaSVProveedorId = drd.GetString(posPlanCuentaSVProveedorId);
					obeCuentaProvisionPagoVista.PlanCuentaSVClienteId = drd.GetString(posPlanCuentaSVClienteId);

					obeCuentaProvisionPagoVista.PlanCuentaNVCostoId = drd.GetString(posPlanCuentaNVCostoId);
					obeCuentaProvisionPagoVista.PlanCuentaNVProveedorId = drd.GetString(posPlanCuentaNVProveedorId);
					obeCuentaProvisionPagoVista.PlanCuentaNVClienteId = drd.GetString(posPlanCuentaNVClienteId);

					obeCuentaProvisionPagoVista.PlanCuentaContableVcostoDesc = drd.GetString(posPlanCuentaContableVcostoDesc);
					obeCuentaProvisionPagoVista.PlanCuentaContableVprovDesc = drd.GetString(posPlanCuentaContableVprovDesc);
					obeCuentaProvisionPagoVista.PlanCuentaContableVcliDesc = drd.GetString(posPlanCuentaContableVcliDesc);
					obeCuentaProvisionPagoVista.PlanCuentaContableNVcostoDesc = drd.GetString(posPlanCuentaContableNVcostoDesc);
					obeCuentaProvisionPagoVista.PlanCuentaContableNVprovDesc = drd.GetString(posPlanCuentaContableNVprovDesc);
					obeCuentaProvisionPagoVista.PlanCuentaContableNVcliDesc = drd.GetString(posPlanCuentaContableNVcliDesc);
					obeCuentaProvisionPagoVista.IndicadorProduccion = drd.GetBoolean(posIndicadorProduccion);
					obeCuentaProvisionPagoVista.IndicadorEscalonado = drd.GetBoolean(posIndicadorEscalonado);
					obeCuentaProvisionPagoVista.IndicadorMontoFijo = drd.GetBoolean(posIndicadorMontoFijo);
					obeCuentaProvisionPagoVista.IndicadorHorario = drd.GetBoolean(posIndicadorHorario);
					obeCuentaProvisionPagoVista.IndicadorTurno = drd.GetBoolean(posIndicadorTurno);
					obeCuentaProvisionPagoVista.IndicadorCompartido = drd.GetBoolean(posIndicadorCompartido);
					obeCuentaProvisionPagoVista.IndicadorVacuna = drd.GetBoolean(posIndicadorVacuna);

					obeCuentaProvisionPagoVista.ConceptoMontoFijoId = drd.GetInt32(posConceptoMontoFijoId);
					obeCuentaProvisionPagoVista.UnidadMedicaId = drd.GetInt32(posUnidadMedicaId);
                    obeCuentaProvisionPagoVista.TipoPacienteId = drd.GetInt32(posTipoPacienteId);
                    obeCuentaProvisionPagoVista.TipoPersona = drd.GetString(posTipoPersona);
                    lbeCuentaProvisionPagoVista.Add(obeCuentaProvisionPagoVista);
                }
                obeCuentaProvisionPagoVistaLista.ListaCuentaProvisionPago = lbeCuentaProvisionPagoVista;

                drd.Close();
            }
            return (obeCuentaProvisionPagoVistaLista);
        }

        public beCuentaProvisionPagoListas listarListas(SqlConnection con)
        {
            beCuentaProvisionPagoListas obeCuentaProvisionPagoListas = null;
            List<beCampoEntero> lbeServicio = null;
            SqlCommand cmd = new SqlCommand("uspCuentaProvisionPagoListas", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader drd = cmd.ExecuteReader();
            if (drd != null)
            {
                obeCuentaProvisionPagoListas = new beCuentaProvisionPagoListas();
                lbeServicio = new List<beCampoEntero>();
                int posServicioId = drd.GetOrdinal("ServicioId");
                int posDescripcion1 = drd.GetOrdinal("Descripcion");
                beCampoEntero obeServicio;
                while (drd.Read())
                {
                    obeServicio = new beCampoEntero();
                    obeServicio.campo1 = drd.GetInt32(posServicioId);
                    obeServicio.campo2 = drd.GetString(posDescripcion1).Trim();
                    lbeServicio.Add(obeServicio);
                }
                obeCuentaProvisionPagoListas.ListaServicio = lbeServicio;
                List<beCampoEntero> lbeTipoAdmision = new List<beCampoEntero>();
                if (drd.NextResult())
                {
                    beCampoEntero obeTipoAdmision;
                    int posTipoAdmisionId = drd.GetOrdinal("TipoAdmisionId");
                    int posDescripcion2 = drd.GetOrdinal("Descripcion");
                    while (drd.Read())
                    {
                        obeTipoAdmision = new beCampoEntero();
                        obeTipoAdmision.campo1 = drd.GetInt32(posTipoAdmisionId);
                        obeTipoAdmision.campo2 = drd.GetString(posDescripcion2).Trim();
                        lbeTipoAdmision.Add(obeTipoAdmision);
                    }
                    obeCuentaProvisionPagoListas.ListaTipoAdmision = lbeTipoAdmision;
                }
                List<beCampoCadenaCorto> lbeMoneda = new List<beCampoCadenaCorto>();
                if (drd.NextResult())
                {
                    beCampoCadenaCorto obeMoneda;
                    int posMonedaId = drd.GetOrdinal("MonedaId");
                    int posDescripcion3 = drd.GetOrdinal("Descripcion");
                    while (drd.Read())
                    {
                        obeMoneda = new beCampoCadenaCorto();
                        obeMoneda.Campo1 = drd.GetString(posMonedaId);
                        obeMoneda.Campo2 = drd.GetString(posDescripcion3).Trim();
                        lbeMoneda.Add(obeMoneda);
                    }
                    obeCuentaProvisionPagoListas.ListaMoneda = lbeMoneda;
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
                    obeCuentaProvisionPagoListas.ListaEspecialidad = lbeEspecialidad;
                }
                List<beCampoCadenaCorto> lbeClasificadorMovimiento = new List<beCampoCadenaCorto>();
                if (drd.NextResult())
                {
                    beCampoCadenaCorto obeClasificadorMovimiento;
                    int posClasificadorMovimientoId = drd.GetOrdinal("ClasificadorMovimientoId");
                    int posDescripcion5 = drd.GetOrdinal("Descripcion");
                    while (drd.Read())
                    {
                        obeClasificadorMovimiento = new beCampoCadenaCorto();
                        obeClasificadorMovimiento.Campo1 = drd.GetString(posClasificadorMovimientoId);
                        obeClasificadorMovimiento.Campo2 = drd.GetString(posDescripcion5).Trim();
                        lbeClasificadorMovimiento.Add(obeClasificadorMovimiento);
                    }
                    obeCuentaProvisionPagoListas.ListaClasificadorMovimiento = lbeClasificadorMovimiento;
                }
				List<beCampoEntero> lbeConfiguracionPago = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeConfiguracionPago;
					int posConfiguracionPagoId = drd.GetOrdinal("ConfiguracionPagoId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeConfiguracionPago = new beCampoEntero();
						obeConfiguracionPago.campo1 = drd.GetInt32(posConfiguracionPagoId);
						obeConfiguracionPago.campo2 = drd.GetString(posDescripcion3).Trim();
						lbeConfiguracionPago.Add(obeConfiguracionPago);
					}
					obeCuentaProvisionPagoListas.ListaConfiguracionPago = lbeConfiguracionPago;
				}

				List<beCampoEntero> lbeUnidadMedica = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeUnidadMedica;
					int posUnidadMedicaId = drd.GetOrdinal("UnidadMedicaId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeUnidadMedica = new beCampoEntero();
						obeUnidadMedica.campo1 = drd.GetInt32(posUnidadMedicaId);
						obeUnidadMedica.campo2 = drd.GetString(posDescripcion3).Trim();
						lbeUnidadMedica.Add(obeUnidadMedica);
					}
					obeCuentaProvisionPagoListas.ListaUnidadMedica = lbeUnidadMedica;
				}
				List<beCampoEntero> lbeConcepto = new List<beCampoEntero>();
				if (drd.NextResult())
				{
					beCampoEntero obeConcepto;
					int posConceptoMontoFijoId = drd.GetOrdinal("ConceptoMontoFijoId");
					int posDescripcion3 = drd.GetOrdinal("Descripcion");
					while (drd.Read())
					{
						obeConcepto = new beCampoEntero();
						obeConcepto.campo1 = drd.GetInt32(posConceptoMontoFijoId);
						obeConcepto.campo2 = drd.GetString(posDescripcion3).Trim();
						lbeConcepto.Add(obeConcepto);
					}
					obeCuentaProvisionPagoListas.ListaConcepto = lbeConcepto;
				}
                List<beCampoEntero> lbePaciente = new List<beCampoEntero>();
                if (drd.NextResult())
                {
                    beCampoEntero obePaciente;
                    int TipoPacienteId = drd.GetOrdinal("TipoPacienteId");
                    int posDescripcion3 = drd.GetOrdinal("Descripcion");
                    while (drd.Read())
                    {
                        obePaciente = new beCampoEntero();
                        obePaciente.campo1 = drd.GetInt32(TipoPacienteId);
                        obePaciente.campo2 = drd.GetString(posDescripcion3).Trim();
                        lbePaciente.Add(obePaciente);
                    }
                    obeCuentaProvisionPagoListas.listaTipoPaciente = lbePaciente;
                }
                drd.Close();
            }
            return (obeCuentaProvisionPagoListas);
        }

        public int adicionar(SqlConnection con, beCuentaProvisionPago obeCuentaProvisionPago, int usuario)
        {
            int idCuentaProvisionPago = -1;
            SqlCommand cmd = new SqlCommand("uspCuentaProvisionPagoAdicionar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeCuentaProvisionPago.SucursalId;

            SqlParameter par2 = cmd.Parameters.Add("@TipoAsiento", SqlDbType.Char, 1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeCuentaProvisionPago.TipoAsiento;

            SqlParameter par3 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeCuentaProvisionPago.ServicioId;

            SqlParameter par4 = cmd.Parameters.Add("@MonedaId", SqlDbType.VarChar,4);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeCuentaProvisionPago.MonedaId;

            SqlParameter par5 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeCuentaProvisionPago.EspecialidadId;

			//SqlParameter par6 = cmd.Parameters.Add("@IndicadorVinculada", SqlDbType.Bit);
			//par6.Direction = ParameterDirection.Input;
			//par6.Value = obeCuentaProvisionPago.IndicadorVinculada;

            SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeCuentaProvisionPago.TipoAdmisionId;

            SqlParameter par7 = cmd.Parameters.Add("@ClasificadorMovimientoId", SqlDbType.VarChar, 15);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeCuentaProvisionPago.ClasificadorMovimientoId;

            SqlParameter par8 = cmd.Parameters.Add("@TipoComponente", SqlDbType.Char, 1);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeCuentaProvisionPago.TipoComponente;

            SqlParameter par9 = cmd.Parameters.Add("@ComponenteId", SqlDbType.VarChar, 25);
            par9.Direction = ParameterDirection.Input;
            par9.Value = obeCuentaProvisionPago.ComponenteId;

            SqlParameter par10 = cmd.Parameters.Add("@ArticuloId", SqlDbType.VarChar, 20);
            par10.Direction = ParameterDirection.Input;
            par10.Value = obeCuentaProvisionPago.ArticuloId;

			SqlParameter par11 = cmd.Parameters.Add("@PlanCuentaSVCostoId", SqlDbType.VarChar, 20);
            par11.Direction = ParameterDirection.Input;
            par11.Value = obeCuentaProvisionPago.PlanCuentaSVCostoId;

			SqlParameter par12 = cmd.Parameters.Add("@PlanCuentaSVProveedorId", SqlDbType.VarChar, 20);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeCuentaProvisionPago.PlanCuentaSVProveedorId;

			SqlParameter par13 = cmd.Parameters.Add("@PlanCuentaSVClienteId", SqlDbType.VarChar, 20);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeCuentaProvisionPago.PlanCuentaSVClienteId;

			SqlParameter par14 = cmd.Parameters.Add("@PlanCuentaNVCostoId", SqlDbType.VarChar, 20);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeCuentaProvisionPago.PlanCuentaNVCostoId;

			SqlParameter par15 = cmd.Parameters.Add("@PlanCuentaNVProveedorId", SqlDbType.VarChar, 20);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeCuentaProvisionPago.PlanCuentaNVProveedorId;

			SqlParameter par16 = cmd.Parameters.Add("@PlanCuentaNVClienteId", SqlDbType.VarChar, 20);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeCuentaProvisionPago.PlanCuentaNVClienteId;

			SqlParameter par17 = cmd.Parameters.Add("@IndicadorProduccion", SqlDbType.Bit);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeCuentaProvisionPago.IndicadorProduccion;

			SqlParameter par18 = cmd.Parameters.Add("@IndicadorEscalonado", SqlDbType.Bit);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeCuentaProvisionPago.IndicadorEscalonado;

			SqlParameter par19 = cmd.Parameters.Add("@IndicadorMontoFijo", SqlDbType.Bit);
			par19.Direction = ParameterDirection.Input;
			par19.Value = obeCuentaProvisionPago.IndicadorMontoFijo;

			SqlParameter par20 = cmd.Parameters.Add("@IndicadorHorario", SqlDbType.Bit);
			par20.Direction = ParameterDirection.Input;
			par20.Value = obeCuentaProvisionPago.IndicadorHorario;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorTurno", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeCuentaProvisionPago.IndicadorTurno;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorCompartido", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeCuentaProvisionPago.IndicadorCompartido;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorVacuna", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeCuentaProvisionPago.IndicadorVacuna;

			SqlParameter par24 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeCuentaProvisionPago.ConceptoMontoFijoId;

			SqlParameter par25 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeCuentaProvisionPago.UnidadMedicaId;


            SqlParameter par26 = cmd.Parameters.Add("@Usuario", SqlDbType.Int);
			par26.Direction = ParameterDirection.Input;
			par26.Value = usuario;

            SqlParameter par27 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
            par27.Direction = ParameterDirection.Input;
            par27.Value = obeCuentaProvisionPago.TipoPacienteId;

            SqlParameter par28 = cmd.Parameters.Add("@TipoPersona", SqlDbType.Char, 1);
            par28.Direction = ParameterDirection.Input;
            par28.Value = obeCuentaProvisionPago.TipoPersona;

            SqlParameter par29 = cmd.Parameters.Add("@@identity", SqlDbType.Int);
			par29.Direction = ParameterDirection.ReturnValue;

            int n = cmd.ExecuteNonQuery();
			if (n > 0) idCuentaProvisionPago = (int)par25.Value;
            return (idCuentaProvisionPago);
        }

        public bool actualizar(SqlConnection con, beCuentaProvisionPago obeCuentaProvisionPago, int usuario)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspCuentaProvisionPagoActualizar", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par = cmd.Parameters.Add("@CuentaProvisionPagoId", SqlDbType.Int);
            par.Direction = ParameterDirection.Input;
            par.Value = obeCuentaProvisionPago.CuentaProvisionPagoId;

            SqlParameter par1 = cmd.Parameters.Add("@SucursalId", SqlDbType.VarChar, 4);
            par1.Direction = ParameterDirection.Input;
            par1.Value = obeCuentaProvisionPago.SucursalId;

            SqlParameter par2 = cmd.Parameters.Add("@TipoAsiento", SqlDbType.Char, 1);
            par2.Direction = ParameterDirection.Input;
            par2.Value = obeCuentaProvisionPago.TipoAsiento;

            SqlParameter par3 = cmd.Parameters.Add("@ServicioId", SqlDbType.Int);
            par3.Direction = ParameterDirection.Input;
            par3.Value = obeCuentaProvisionPago.ServicioId;

            SqlParameter par4 = cmd.Parameters.Add("@MonedaId", SqlDbType.VarChar, 4);
            par4.Direction = ParameterDirection.Input;
            par4.Value = obeCuentaProvisionPago.MonedaId;

            SqlParameter par5 = cmd.Parameters.Add("@EspecialidadId", SqlDbType.Int);
            par5.Direction = ParameterDirection.Input;
            par5.Value = obeCuentaProvisionPago.EspecialidadId;

			//SqlParameter par7 = cmd.Parameters.Add("@IndicadorVinculada", SqlDbType.Bit);
			//par7.Direction = ParameterDirection.Input;
			//par7.Value = obeCuentaProvisionPago.IndicadorVinculada;

            SqlParameter par6 = cmd.Parameters.Add("@TipoAdmisionId", SqlDbType.Int);
            par6.Direction = ParameterDirection.Input;
            par6.Value = obeCuentaProvisionPago.TipoAdmisionId;

            SqlParameter par7 = cmd.Parameters.Add("@ClasificadorMovimientoId", SqlDbType.VarChar, 15);
            par7.Direction = ParameterDirection.Input;
            par7.Value = obeCuentaProvisionPago.ClasificadorMovimientoId;

            SqlParameter par8 = cmd.Parameters.Add("@TipoComponente", SqlDbType.Char, 1);
            par8.Direction = ParameterDirection.Input;
            par8.Value = obeCuentaProvisionPago.TipoComponente;

            SqlParameter par9 = cmd.Parameters.Add("@ComponenteId", SqlDbType.VarChar, 25);
            par9.Direction = ParameterDirection.Input;
            par9.Value = obeCuentaProvisionPago.ComponenteId;

            SqlParameter par10 = cmd.Parameters.Add("@ArticuloId", SqlDbType.VarChar, 20);
            par10.Direction = ParameterDirection.Input;
            par10.Value = obeCuentaProvisionPago.ArticuloId;

			SqlParameter par11 = cmd.Parameters.Add("@PlanCuentaSVCostoId", SqlDbType.VarChar, 20);
			par11.Direction = ParameterDirection.Input;
			par11.Value = obeCuentaProvisionPago.PlanCuentaSVCostoId;

			SqlParameter par12 = cmd.Parameters.Add("@PlanCuentaSVProveedorId", SqlDbType.VarChar, 20);
			par12.Direction = ParameterDirection.Input;
			par12.Value = obeCuentaProvisionPago.PlanCuentaSVProveedorId;

			SqlParameter par13 = cmd.Parameters.Add("@PlanCuentaSVClienteId", SqlDbType.VarChar, 20);
			par13.Direction = ParameterDirection.Input;
			par13.Value = obeCuentaProvisionPago.PlanCuentaSVClienteId;

			SqlParameter par14 = cmd.Parameters.Add("@PlanCuentaNVCostoId", SqlDbType.VarChar, 20);
			par14.Direction = ParameterDirection.Input;
			par14.Value = obeCuentaProvisionPago.PlanCuentaNVCostoId;

			SqlParameter par15 = cmd.Parameters.Add("@PlanCuentaNVProveedorId", SqlDbType.VarChar, 20);
			par15.Direction = ParameterDirection.Input;
			par15.Value = obeCuentaProvisionPago.PlanCuentaNVProveedorId;

			SqlParameter par16 = cmd.Parameters.Add("@PlanCuentaNVClienteId", SqlDbType.VarChar, 20);
			par16.Direction = ParameterDirection.Input;
			par16.Value = obeCuentaProvisionPago.PlanCuentaNVClienteId;

			SqlParameter par17 = cmd.Parameters.Add("@IndicadorProduccion", SqlDbType.Bit);
			par17.Direction = ParameterDirection.Input;
			par17.Value = obeCuentaProvisionPago.IndicadorProduccion;

			SqlParameter par18 = cmd.Parameters.Add("@IndicadorEscalonado", SqlDbType.Bit);
			par18.Direction = ParameterDirection.Input;
			par18.Value = obeCuentaProvisionPago.IndicadorEscalonado;

			SqlParameter par19 = cmd.Parameters.Add("@IndicadorMontoFijo", SqlDbType.Bit);
			par19.Direction = ParameterDirection.Input;
			par19.Value = obeCuentaProvisionPago.IndicadorMontoFijo;

			SqlParameter par20 = cmd.Parameters.Add("@IndicadorHorario", SqlDbType.Bit);
			par20.Direction = ParameterDirection.Input;
			par20.Value = obeCuentaProvisionPago.IndicadorHorario;

			SqlParameter par21 = cmd.Parameters.Add("@IndicadorTurno", SqlDbType.Bit);
			par21.Direction = ParameterDirection.Input;
			par21.Value = obeCuentaProvisionPago.IndicadorTurno;

			SqlParameter par22 = cmd.Parameters.Add("@IndicadorCompartido", SqlDbType.Bit);
			par22.Direction = ParameterDirection.Input;
			par22.Value = obeCuentaProvisionPago.IndicadorCompartido;

			SqlParameter par23 = cmd.Parameters.Add("@IndicadorVacuna", SqlDbType.Bit);
			par23.Direction = ParameterDirection.Input;
			par23.Value = obeCuentaProvisionPago.IndicadorVacuna;

			SqlParameter par24 = cmd.Parameters.Add("@ConceptoMontoFijoId", SqlDbType.Int);
			par24.Direction = ParameterDirection.Input;
			par24.Value = obeCuentaProvisionPago.ConceptoMontoFijoId;

			SqlParameter par25 = cmd.Parameters.Add("@UnidadMedicaId", SqlDbType.Int);
			par25.Direction = ParameterDirection.Input;
			par25.Value = obeCuentaProvisionPago.UnidadMedicaId;

			SqlParameter par26 = cmd.Parameters.Add("@UsuarioId", SqlDbType.Int);
			par26.Direction = ParameterDirection.Input;
			par26.Value = usuario;

            SqlParameter par27 = cmd.Parameters.Add("@TipoPacienteId", SqlDbType.Int);
            par27.Direction = ParameterDirection.Input;
            par27.Value = obeCuentaProvisionPago.TipoPacienteId;

            SqlParameter par28 = cmd.Parameters.Add("@TipoPersona", SqlDbType.Char, 1);
            par28.Direction = ParameterDirection.Input;
            par28.Value = obeCuentaProvisionPago.TipoPersona;


            int n = cmd.ExecuteNonQuery();
            exito = (n > 0);
            return (exito);
        }

        public bool actualizarEstado(SqlConnection con, string CuentaProvisionPagoId, string EstadoRegistro, int UsuarioId)
        {
            bool exito = false;
            SqlCommand cmd = new SqlCommand("uspCuentaProvisionPagoActualizarEstado", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlParameter par1 = cmd.Parameters.Add("@CuentaProvisionPagoId",SqlDbType.Int);
            par1.Direction = ParameterDirection.Input;
            par1.Value = CuentaProvisionPagoId;

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
