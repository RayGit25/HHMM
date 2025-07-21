using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Threading;
using System.Text;
using System.IO;
using Softvan.Core.Entidades;

namespace Softvan.Core
{
    public class Captcha
    {
        private static Random oAzar = new Random();

        public static beCaptcha CrearCaptcha(int ancho, int alto, string fuenteTipo, int fuenteTamaño)
        {
            beCaptcha captcha = new beCaptcha();
            Bitmap image = new Bitmap(ancho, alto);
            Graphics graphics = Graphics.FromImage(image);
            Rectangle rect = new Rectangle(0, 0, ancho, alto);
            graphics.FillRectangle(new LinearGradientBrush(rect, Color.Aqua, Color.Blue, LinearGradientMode.BackwardDiagonal), rect);
            StringBuilder builder = new StringBuilder();
            int num = 0;
            while (true)
            {
                if (num >= 5)
                {
                    graphics.DrawString(builder.ToString(), new Font(fuenteTipo, (float)fuenteTamaño), Brushes.White, (float)5f, (float)10f);
                    int num2 = 0;
                    while (true)
                    {
                        if (num2 >= 10)
                        {
                            byte[] buffer;
                            captcha.Codigo = builder.ToString();
                            using (MemoryStream stream = new MemoryStream())
                            {
                                image.Save(stream, ImageFormat.Jpeg);
                                buffer = stream.ToArray();
                            }
                            captcha.Imagen = buffer;
                            return captcha;
                        }
                        graphics.DrawLine(new Pen(Brushes.Yellow, 2f), new Point(oAzar.Next(ancho), oAzar.Next(alto)), new Point(oAzar.Next(ancho), oAzar.Next(alto)));
                        num2++;
                    }
                }
                builder.Append(generarCaracterAzar());
                num++;
            }
        }

        private static string generarCaracterAzar()
        {
            int num = oAzar.Next(0x1a) + 0x41;
            Thread.Sleep(15);
            return ((char)num).ToString();
        }
    }
}
