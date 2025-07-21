using System;
namespace HHMM.Librerias.EntidadesNegocio
{
   public class beUsuario
    {
      public int  UsuarioId	{get;set;}
      public string CodigoUsuario { get;set;}
      public string Nombre	{ get;set;}
      public string ApellidoPaterno	{get;set;}
      public string ApellidoMaterno	{get;set;}
      public DateTime FechaNacimiento {get;set;}
      public short TipoDocumentoId	{get;set;}
      public string NumeroDocumento	{get;set;}
      public short PaisId	{get;set;}
      public string CorreoElectronico {get;set;}
      public short PerfilId	{get;set;}
      public int DistribuidorId	{get;set;}
      public string EstadoRegistro	{get;set;}
      public short UsuarioIdCreador	{get;set;}
      public DateTime FechaHoraCreacion{get;set;}
      public short UsuarioIdModificacion {get;set;}
      public DateTime FechaHoraModificacion {get;set;}
      public string IPCliente { get; set; }
    }
}
