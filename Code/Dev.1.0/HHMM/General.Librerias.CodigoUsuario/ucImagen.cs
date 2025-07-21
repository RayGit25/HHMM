using System;
using System.Text; //StringBuilder
using System.Drawing; //Bitmap, Graphics, Rectangle
using System.Drawing.Drawing2D; //LinearGradientBrush, LinearGradientMode
using System.Drawing.Imaging; //ImageFormat
using System.IO; //MemoryStream
using General.Librerias.EntidadesNegocio;

namespace General.Librerias.CodigoUsuario
{
   public class ucImagen
    {
        private static Random oAzar = new Random();

        private static string generarCaracterAzar()
        {
            //Generar un caracter al azar entre la A y la Z        
            int n = oAzar.Next(26) + 65;
            System.Threading.Thread.Sleep(15);
            return (((char)n).ToString());
        }

        public static beCaptcha crearCaptcha(int ancho, int alto, string fuenteTipo, int fuenteTamaño)
        {
            beCaptcha obeCaptcha = new beCaptcha();
            Bitmap bmp = new Bitmap(ancho, alto);
            Graphics grafico = Graphics.FromImage(bmp);
            Rectangle rect = new Rectangle(0, 0, ancho, alto);
            LinearGradientBrush deg = new LinearGradientBrush(rect, Color.Green, Color.DarkGreen,
                LinearGradientMode.BackwardDiagonal); //Color.DarkTurquoise, Color.DarkCyan
            grafico.FillRectangle(deg, rect);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 5; i++) { sb.Append(generarCaracterAzar()); }
            grafico.DrawString(sb.ToString(), new Font(fuenteTipo, fuenteTamaño), Brushes.White, 5, 10);
            for (int i = 0; i < 10; i++)
            {
                grafico.DrawLine(new Pen(Brushes.White, 2),
                    new Point(oAzar.Next(ancho), oAzar.Next(alto)),
                    new Point(oAzar.Next(ancho), oAzar.Next(alto)));
            }
            obeCaptcha.Codigo = sb.ToString();
            byte[] captcha;
            using (MemoryStream ms = new MemoryStream())
            {
                bmp.Save(ms, ImageFormat.Jpeg);
                captcha = ms.ToArray();
            }
            obeCaptcha.Imagen = captcha;
            return (obeCaptcha);
        }
    }
}
