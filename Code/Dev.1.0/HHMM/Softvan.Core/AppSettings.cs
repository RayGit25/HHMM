using System.Configuration;

namespace Softvan.Core
{
    public class AppSettings
    {
        public static string Get(string name)
        {
            if (ConfigurationManager.AppSettings[name] != null)
                return ConfigurationManager.AppSettings[name].ToString();
            else
                return "";
        }
    }
}
