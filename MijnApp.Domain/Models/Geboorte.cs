using System;
using System.Collections.Generic;
using System.Text;

namespace MijnApp.Domain.Models
{
    public class Geboorte
    {
        public Datum datum { get; set; }
    }

    public class Datum
    {
        public string jaar { get; set; }
        public string maand { get; set; }
        public string dag { get; set; }
        public string datum { get; set; }
    }
}
