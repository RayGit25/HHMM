﻿using System;
using System.Collections.Generic;

namespace General.Librerias.EntidadesNegocio
{
  public class beMensaje
    {
        public string De { get; set; }
        public string Clave { get; set; }
        public string[] Para { get; set; }
        public string[] CC { get; set; }
        public string Asunto { get; set; }
        public string Contenido { get; set; }
		public string[] Archivo { get; set; }
    }
}
