using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace General.Librerias.CodigoUsuario
{
    public class ucCustomSerializer
    {
        public static string Serializar<T>(List<T> lista, char separadorCampo, char separadorRegistro, bool incluirCabeceras = true, string archivo = "", bool opcFecha = false, bool esfechalarga = false, bool esHora = false, bool ampm = false)
        {
            int c = 0;
            StringBuilder sb = new StringBuilder();
            if (lista != null && lista.Count > 0)
            {
                PropertyInfo[] propiedades = lista[0].GetType().GetProperties();
                if (archivo == "")
                {
                    if (incluirCabeceras)
                    {
                        for (int i = 0; i < propiedades.Length; i++)
                        {
                            sb.Append(propiedades[i].Name);
                            if (i < propiedades.Length - 1) sb.Append(separadorCampo);
                        }
                        sb.Append(separadorRegistro);
                    }
                    string tipo;
                    object valor;
                    for (int j = 0; j < lista.Count; j++)
                    {
                        propiedades = lista[j].GetType().GetProperties();
                        for (int i = 0; i < propiedades.Length; i++)
                        {
                            tipo = propiedades[i].PropertyType.ToString();
                            valor = propiedades[i].GetValue(lista[j], null);
                            if (valor != null)
                            {
                                if (tipo.Contains("Byte[]"))
                                {
                                    byte[] buffer = (byte[])valor;
                                    sb.Append(Convert.ToBase64String(buffer));
                                }
                                else
                                {
                                    if (tipo.Contains("DateTime"))
                                    {
                                        if (opcFecha == true)
                                        {
                                            if (ampm) sb.Append(((DateTime)valor).ToString("dd/MM/yyyy HH:mm:ss tt"));
                                            else sb.Append(((DateTime)valor).ToString());
                                        }
                                        else
                                        {
                                            if (esHora)
                                            {
                                                sb.Append(((DateTime)valor).ToString("HH:mm"));
                                            }
                                            else
                                            {
                                                if (esfechalarga) sb.Append(((DateTime)valor).ToString("dd/MM/yyyy HH:mm:ss"));
                                                else sb.Append(((DateTime)valor).ToShortDateString());
                                            }
                                        }
                                    }
                                    else sb.Append(valor.ToString());
                                }
                            }
                            else sb.Append("");
                            if (i < propiedades.Length - 1) sb.Append(separadorCampo);
                        }
                        if (j < lista.Count - 1)
                        {
                            c++;
                            sb.Append(separadorRegistro);
                        }
                    }
                }
                else
                {
                    if (File.Exists(archivo))
                    {
                        List<string> campos = File.ReadAllLines(archivo).ToList();
                        List<string> props = new List<string>();
                        for (int i = 0; i < propiedades.Length; i++)
                        {
                            props.Add(propiedades[i].Name);
                        }
                        if (incluirCabeceras)
                        {
                            for (int i = 0; i < campos.Count; i++)
                            {
                                if (props.IndexOf(campos[i]) > -1)
                                {
                                    sb.Append(campos[i]);
                                    sb.Append(separadorCampo);
                                }
                            }
                            sb = sb.Remove(sb.Length - 1, 1);
                            sb.Append(separadorRegistro);
                        }
                        string tipo;
                        object valor;
                        for (int j = 0; j < lista.Count; j++)
                        {
                            for (int i = 0; i < campos.Count; i++)
                            {
                                if (props.IndexOf(campos[i]) > -1)
                                {
                                    tipo = lista[j].GetType().GetProperty(campos[i]).PropertyType.ToString();
                                    valor = lista[j].GetType().GetProperty(campos[i]).GetValue(lista[j], null);
                                    if (valor != null)
                                    {
                                        if (tipo.Contains("Byte[]"))
                                        {
                                            byte[] buffer = (byte[])valor;
                                            sb.Append(Convert.ToBase64String(buffer));
                                        }
                                        else
                                        {
                                            if (tipo.Contains("DateTime"))
                                            {
                                                if (opcFecha == true)
                                                {
                                                    sb.Append(((DateTime)valor).ToString());
                                                }
                                                else
                                                {
                                                    if (esHora)
                                                    {
                                                        sb.Append(((DateTime)valor).ToString("HH:mm"));
                                                    }
                                                    else
                                                    {
                                                        if (esfechalarga) sb.Append(((DateTime)valor).ToString("dd/MM/yyyy HH:mm:ss"));
                                                        else sb.Append(((DateTime)valor).ToShortDateString());
                                                    }
                                                }
                                            }
                                            else sb.Append(valor.ToString());
                                        }
                                    }
                                    else sb.Append("");
                                    sb.Append(separadorCampo);
                                }
                            }
                            sb = sb.Remove(sb.Length - 1, 1);
                            c++;
                            sb.Append(separadorRegistro);
                        }
                        sb = sb.Remove(sb.Length - 1, 1);
                    }
                }
            }
            return sb.ToString();
        }
        public static string SerializarObjeto<T>(T obj, char separadorCampo, string archivo = "", bool esfechalarga = false, bool esHora = false)
        {
            StringBuilder sb = new StringBuilder();
            PropertyInfo[] propiedades = obj.GetType().GetProperties();
            string tipo;
            object valor;
            if (archivo == "")
            {
                for (int i = 0; i < propiedades.Length; i++)
                {
                    tipo = propiedades[i].PropertyType.ToString();
                    valor = propiedades[i].GetValue(obj, null);
                    if (valor != null)
                    {
                        if (tipo.Contains("Byte[]"))
                        {
                            byte[] buffer = (byte[])propiedades[i].GetValue(obj, null);
                            sb.Append(Convert.ToBase64String(buffer));
                        }
                        if (tipo.Contains("DateTime"))
                        {
                            if (esHora)
                            {
                                sb.Append(((DateTime)valor).ToString("HH:mm"));
                            }
                            else
                            {
                                if (esfechalarga) sb.Append(((DateTime)valor).ToString("dd/MM/yyyy HH:mm:ss"));
                                else sb.Append(((DateTime)valor).ToShortDateString());
                            }

                        }
                        else sb.Append(propiedades[i].GetValue(obj, null).ToString());
                    }
                    else sb.Append("");
                    if (i < propiedades.Length - 1) sb.Append(separadorCampo);
                }
            }
            else
            {
                if (File.Exists(archivo))
                {
                    List<string> campos = File.ReadAllLines(archivo).ToList();
                    List<string> props = new List<string>();
                    for (int i = 0; i < propiedades.Length; i++)
                    {
                        props.Add(propiedades[i].Name);
                    }
                    for (int i = 0; i < campos.Count; i++)
                    {
                        if (props.IndexOf(campos[i]) > -1)
                        {
                            tipo = obj.GetType().GetProperty(campos[i]).PropertyType.ToString();
                            valor = obj.GetType().GetProperty(campos[i]).GetValue(obj, null);
                            if (valor != null)
                            {
                                if (tipo.Contains("Byte[]"))
                                {
                                    byte[] buffer = (byte[])valor;
                                    sb.Append(Convert.ToBase64String(buffer));
                                }
                                if (tipo.Contains("DateTime"))
                                {
                                    if (esHora)
                                    {
                                        sb.Append(((DateTime)valor).ToString("HH:mm"));
                                    }
                                    else
                                    {
                                        if (esfechalarga) sb.Append(((DateTime)valor).ToString("dd/MM/yyyy HH:mm:ss"));
                                        else sb.Append(((DateTime)valor).ToShortDateString());
                                    }

                                }
                                else sb.Append(valor.ToString());
                            }
                            else sb.Append("");
                            sb.Append(separadorCampo);
                        }
                    }
                    sb = sb.Remove(sb.Length - 1, 1);
                }
            }
            return sb.ToString();
        }

        public static DataTable ConvertirEnTabla(string data, char sepCampo = '¦', char sepRegistro = '¯', bool conAnchos = true)
        {
            int pos = 0;
            if (conAnchos) pos = 1;
            DataTable tabla = new DataTable();
            string[] registros = data.Split(sepRegistro);
            int nRegistros = registros.Length;
            string[] cabeceras = registros[0].Split(sepCampo);
            string[] anchos = null;
            if (conAnchos) anchos = registros[pos].Split(sepCampo);
            string[] tipos = registros[pos + 1].Split(sepCampo);
            int nCabeceras = cabeceras.Length;
            string cabecera, tipo, ancho;
            for (int j = 0; j < nCabeceras; j++)
            {
                cabecera = cabeceras[j];
                tipo = tipos[j];
                tabla.Columns.Add(String.Format("{0}", cabecera), Type.GetType(String.Format("System.{0}", tipo)));
                if (conAnchos)
                {
                    ancho = anchos[j];
                    tabla.Columns[j].Caption = ancho;
                }
            }
            DataRow fila;
            string[] campos;
            Type tipoCol;
            for (int i = pos + 2; i < nRegistros; i++)
            {
                fila = tabla.NewRow();
                campos = registros[i].Split(sepCampo);
                for (int j = 0; j < nCabeceras; j++)
                {
                    tipoCol = tabla.Columns[j].DataType;
                    fila[j] = Convert.ChangeType(campos[j], tipoCol);
                }
                tabla.Rows.Add(fila);
            }
            return tabla;
        }

        public static void CabeceraDeTabla(string data, ref DataTable dtbl, char sepCampo = '¦', char sepRegistro = '¯', bool conAnchos = true)
        {
            int pos = 0;
            if (conAnchos) pos = 1;
            string[] registros = data.Split(sepRegistro);
            int nRegistros = registros.Length;
            string[] cabeceras;
            string[] anchos = null;
            if (conAnchos) anchos = registros[pos].Split(sepCampo);
            string[] tipos = registros[pos + 1].Split(sepCampo);
            int nCabeceras, nCampos;
            string cabecera, tipo, ancho;
            cabeceras = registros[0].Split(sepCampo);
            nCabeceras = cabeceras.Length;
            nCampos = dtbl.Columns.Count;
            for (int j = 0; j < nCampos; j++)
            {
                cabecera = cabeceras[j];
                tipo = tipos[j];
                dtbl.Columns[j].ColumnName = cabecera;
                var vv = dtbl.Columns[j].DefaultValue;
                if (conAnchos)
                {
                    ancho = anchos[j];
                    dtbl.Columns[j].Caption = ancho;
                }
            }
        }

        //public static void CabeceraDeTablaHistorial(string data, ref DataTable dtbl, char sepCampo = '¦', char sepRegistro = '¯', bool conAnchos = true)
        //{
        //    int pos = conAnchos ? 1 : 0;
        //    string[] registros = data.Split(sepRegistro);
        //    if (registros.Length < pos + 2) return;

        //    string[] cabeceras = registros[0].Split(sepCampo);
        //    string[] tipos = registros[pos + 1].Split(sepCampo);
        //    string[] anchos = conAnchos ? registros[pos].Split(sepCampo) : null;

        //    for (int j = 0; j < cabeceras.Length; j++)
        //    {
        //        string nombre = cabeceras[j];
        //        string tipo = tipos[j];
        //        string ancho = conAnchos ? anchos[j] : "";

        //        Type tipoCol = typeof(string);
        //        switch (tipo.ToLower())
        //        {
        //            case "int":
        //            case "int32":
        //                tipoCol = typeof(int);
        //                break;
        //            case "decimal":
        //                tipoCol = typeof(decimal);
        //                break;
        //            case "datetime":
        //                tipoCol = typeof(DateTime);
        //                break;
        //            case "boolean":
        //                tipoCol = typeof(bool);
        //                break;
        //            case "string":
        //                tipoCol = typeof(string);
        //                break;
        //        }

        //        DataColumn col = new DataColumn(nombre, tipoCol);
        //        if (conAnchos) col.Caption = ancho;

        //        dtbl.Columns.Add(col);
        //    }
        //}

        public DataTable MakeDataTable(string data, char sepCampo = '¦', char sepRegistro = '¯', bool conAnchos = true)
        {
            DataTable myTable;
            // Create a new DataTable.
            myTable = new DataTable("miTabla");
            int pos = 0;
            if (conAnchos) pos = 1;
            string[] registros = data.Split(sepRegistro);
            int nRegistros = registros.Length;
            string[] cabeceras;
            string[] anchos = null;
            if (conAnchos) anchos = registros[pos].Split(sepCampo);
            string[] tipos = registros[pos + 1].Split(sepCampo);
            int nCampos;
            string cabecera, tipo, ancho;
            cabeceras = registros[0].Split(sepCampo);
            nCampos = cabeceras.Length;
            for (int j = 0; j < nCampos; j++)
            {
                cabecera = cabeceras[j];
                tipo = tipos[j];

                // Create DataColumn objects of data types.
                DataColumn colString = new DataColumn(cabecera);
                colString.DataType = System.Type.GetType(String.Format("System.{0}", tipo));
                if (conAnchos)
                {
                    ancho = anchos[j];
                    colString.MaxLength = int.Parse(ancho);
                }
                myTable.Columns.Add(colString);
            }

            //// Populate one row with values.
            //DataRow myNewRow;
            //myNewRow = myTable.NewRow();

            //myNewRow["StringCol"] = "Item Name";
            //myNewRow["Int32Col"] = 2147483647;
            //myNewRow["BooleanCol"] = true;
            //myNewRow["TimeSpanCol"] = new TimeSpan(10, 22, 10, 15, 100);
            //myNewRow["DateTimeCol"] = System.DateTime.Today;
            //myNewRow["DecimalCol"] = 64.0021;
            //myNewRow["ByteArrayCol"] = new Byte[] { 1, 5, 120 };
            //myTable.Rows.Add(myNewRow);
            return myTable;
        }
    }
}
