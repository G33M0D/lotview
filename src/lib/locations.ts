export interface Location {
  province: string;
  municipalities: {
    name: string;
    barangays: string[];
  }[];
}

export const LOCATIONS: Location[] = [
  {
    province: "Iloilo City",
    municipalities: [
      {
        name: "Jaro",
        barangays: [
          "Balabago", "Bitoon", "Buhang", "Buntatala", "Camalig",
          "Cubay", "Dungon", "Dungon A", "Dungon B", "Fajardo",
          "Javellana", "Lanit", "Lopez Jaena", "Luna", "M.H. Del Pilar",
          "Magdalo", "Magsaysay", "Mc Arthur", "Quintin Salas", "San Isidro",
          "Simon Ledesma", "Tabuc Suba", "Tacas", "Taytay Zone I",
          "Taytay Zone II"
        ],
      },
      {
        name: "La Paz",
        barangays: [
          "Aguinaldo", "Baldoza", "Bantud", "Banuyao", "Bolilao",
          "Divinagracia", "Don Esteban", "Duran", "Gustilo", "Hinactacan",
          "Jereos", "Libertad", "Lopez Jaena Norte", "Lopez Jaena Sur",
          "Luna", "Mabini", "Mansaya", "Navais", "Nabitasan", "Rizal",
          "San Isidro", "Tabuc Suba"
        ],
      },
      {
        name: "Mandurriao",
        barangays: [
          "Bolilao", "Bakhaw", "Bito-on", "Calumpang", "Dungon A",
          "Dungon B", "Guzman-Jesena", "Hibao-an Norte", "Hibao-an Sur",
          "Iloilo City Proper", "Jalandoni Estate", "Malipayon",
          "Navais", "Oate", "Q. Abeto", "San Rafael", "Seminario",
          "Tagbac", "Tabucan", "Tap-oc"
        ],
      },
      {
        name: "Molo",
        barangays: [
          "Calumpang", "Cochero", "East Baluarte", "East Timawa",
          "Habog-Habog", "Infante", "Katilingban", "Molo Boulevard",
          "North Avanceña", "North Baluarte", "North Fundidor",
          "North San Jose", "Poblacion", "Railway", "San Antonio",
          "San Juan", "San Pedro", "South Baluarte", "South Fundidor",
          "South San Jose", "Tap-oc", "West Habog-Habog"
        ],
      },
      {
        name: "Arevalo",
        barangays: [
          "Asis", "Calaparan", "Dulonan", "Mohon", "San Jose",
          "Santa Cruz", "Santo Domingo", "Santo Niño Norte",
          "Santo Niño Sur", "Sooc", "Yulo Drive"
        ],
      },
      {
        name: "City Proper",
        barangays: [
          "Arsenal Aduana", "Bonifacio Tanza", "Concepcion-Montes",
          "Danao", "Edganzon", "Flores", "General Hughes-Montes",
          "Gloria", "Hipodromo", "Iznart", "Jalandoni", "Kahirupan",
          "Mabolo-Delgado", "Ortiz", "Ozamiz", "Rima-Rizal",
          "Rizal Estanzuela", "San Felix", "San Jose", "Santa Filomena",
          "Tanza-Esperanza", "Veterans Village"
        ],
      },
      {
        name: "Lapuz",
        barangays: [
          "Alalasan", "Bo. Obrero", "Boulevard", "Caingin",
          "Jalandoni Estate", "Lapuz Norte", "Lapuz Sur",
          "Liberty", "Loboc-Lapuz", "Progreso", "Punong",
          "San Isidro", "Santa Cruz", "Sooc", "Ticud"
        ],
      },
    ],
  },
  {
    province: "Iloilo",
    municipalities: [
      {
        name: "Ajuy",
        barangays: [
          "Badiangan", "Baguingin", "Baras", "Bontoc", "Bulanao",
          "Culasi", "Lanjagan", "Luca", "Malayu-an", "Manduao",
          "Nasidman", "Pani-an", "Pedada", "Piña", "Poblacion",
          "Robles", "San Antonio", "Silakat-Nonok", "Tagubanhan", "Tipacla"
        ],
      },
      {
        name: "Alimodian",
        barangays: [
          "Abilay", "Agbobolo", "Bancal", "Ban-ag", "Binalud",
          "Bugang", "Cabacanan", "Cagay", "Dalid", "Laylayan",
          "Libo-on", "Liong", "Maalat", "Manasa", "Poblacion",
          "San Andres", "San Fernando", "Sinamay", "Sulong", "Tarug"
        ],
      },
      {
        name: "Anilao",
        barangays: [
          "Agbatuan", "Badiang", "Balabag", "Balaring", "Bongol",
          "Butuan", "Camiros", "Magdalena", "Mambog", "Manaol",
          "Poblacion", "San Carlos", "San Jose", "San Ramon",
          "Santo Rosario"
        ],
      },
      {
        name: "Badiangan",
        barangays: [
          "Agtuman", "Badiangan", "Bato", "Binolosan", "Cabayogan",
          "Cadilang", "Calamunan", "Inabasan", "Malublub", "Poblacion",
          "San Agustin", "San Fernando", "Saravia", "Sulanga", "Tamocol"
        ],
      },
      {
        name: "Balasan",
        barangays: [
          "Aranjuez", "Baras", "Caraycayon", "Cawayanon",
          "Dapdapan", "Gibon", "Hilwan", "Ipil", "Kinalkalan",
          "Lawis", "Malapoc", "Poblacion Norte", "Poblacion Sur",
          "Punong", "Quiasan", "Sagua"
        ],
      },
      {
        name: "Banate",
        barangays: [
          "Bago", "Bagumbayan", "Bantud", "Barotac", "Bularan",
          "Magdalena", "Managopaya", "Merced", "Poblacion",
          "San Salvador", "Talotoan", "Zona Sur"
        ],
      },
      {
        name: "Barotac Nuevo",
        barangays: [
          "Acuit", "Agcuyawan", "Amamaros", "Bagumbayan",
          "Baras", "Bungca", "Cabilauan", "Guintas",
          "Ilaud", "Lanas", "Langka", "Lawa-an",
          "Nasaka", "Poblacion", "San Jose", "San Roque",
          "Santa Cruz", "Sojoton", "Tagbaya", "Tul-ahan"
        ],
      },
      {
        name: "Barotac Viejo",
        barangays: [
          "Burak", "California", "De la Peña", "Del Castillo",
          "General Luna", "Igang", "Lupa", "Natividad",
          "Poblacion", "San Fernando", "San Juan",
          "San Lucas", "San Miguel", "Suso", "Vista Alegre"
        ],
      },
      {
        name: "Batad",
        barangays: [
          "Alapasco", "Alinsolong", "Banban", "Binon-an",
          "Bolho", "Bugang", "Calauan", "Cawayan",
          "Nasidman", "Poblacion", "San Antonio", "San Pedro",
          "Tanao", "Tapi-an"
        ],
      },
      {
        name: "Bingawan",
        barangays: [
          "Agba-o", "Alabidhan", "Bulabog", "Cairohan",
          "Guinhulaogan", "Inamyungan", "Malitbog",
          "Ngingi-an", "Poblacion", "Quinaspan", "Tarug",
          "Tubod"
        ],
      },
      {
        name: "Cabatuan",
        barangays: [
          "Acao", "Ayaman", "Bacan", "Banguit", "Bulay",
          "Cadoldolan", "Cagay", "Duyan-duyan", "Gaub",
          "Gines", "Janipaan Central", "Janipaan Olo",
          "Janipaan Oeste", "Jelicuon Este", "Jelicuon Oeste",
          "Libo-on", "Mambog", "Manguna", "Pacatin", "Poblacion",
          "Salong", "Sulanga", "Tabucan", "Taguhangin", "Tigbauan"
        ],
      },
      {
        name: "Calinog",
        barangays: [
          "Agcalaga", "Bato-bato", "Binolbogan", "Cabagiao",
          "Cahigon", "Dalid", "Datagan", "Garangan", "Igan",
          "Impalidan", "Ipil", "Jamin-ay", "Lampaya",
          "Libot", "Lonoy", "Maasin", "Malaguinabot",
          "Malitbog", "Mandog", "Matinabus", "Moroboro",
          "Poblacion", "Salocon", "Tabucan", "Tigbanaba"
        ],
      },
      {
        name: "Carles",
        barangays: [
          "Abong", "Asluman", "Bancal", "Barangcalan", "Barosbos",
          "Binuluangan", "Bito-on", "Buaya", "Cabilao",
          "Gabi", "Granada", "Guinticgan", "Manlot",
          "Pantalan", "Poblacion", "Punta", "Santo Niño",
          "Tarugan", "Tinigban"
        ],
      },
      {
        name: "Concepcion",
        barangays: [
          "Aglosong", "Bacjawan Norte", "Bacjawan Sur",
          "Bagongon", "Botlog", "Buyo", "Cabalawan",
          "Dungon", "Igbon", "Jamul-awon", "Lo-ong",
          "Macalbang", "Magsaysay", "Malangabang", "Pantalan",
          "Polopina", "Poblacion", "Salvacion", "Taloto",
          "Tambaliza"
        ],
      },
      {
        name: "Dingle",
        barangays: [
          "Abangay", "Bulay", "Caguyuman", "Calaparan",
          "Dawis", "Ginalinan", "Jibolo", "Libo-on",
          "Luce", "Matab-ang", "Matinabus", "Moroboro",
          "Poblacion", "Potol", "San Jose", "San Matias",
          "Sinublan", "Tabuc"
        ],
      },
      {
        name: "Dueñas",
        barangays: [
          "Agutayan", "Bagumbayan", "Calao", "Caningay",
          "Cawilihan", "Daja", "Ermita", "Jaguimit",
          "Libo-on", "Mojon", "Poblacion", "San Miguel",
          "San Vicente", "Taminla", "Tiglawa"
        ],
      },
      {
        name: "Dumangas",
        barangays: [
          "Bacay", "Bacong", "Balabag", "Bancal", "Bolo",
          "Buenaflor", "Calao", "Cali", "Dawis",
          "Ermita", "Ilaya", "Lacaron", "Pagdugue",
          "Paloc", "Patlad", "Poblacion", "Pulao",
          "Rosario", "San Miguel", "Sapao", "Sulangan",
          "Tabucan", "Tanag", "Tanza"
        ],
      },
      {
        name: "Estancia",
        barangays: [
          "Bayas", "Bayuyan", "Botongon", "Bulaqueña",
          "Calapdan", "Cano-an", "Daan Banua",
          "Gogo", "Lonoy", "Lumbia", "Manlot",
          "Poblacion Zone I", "Poblacion Zone II", "Poblacion Zone III",
          "San Roque", "Tanza", "Villa Felor"
        ],
      },
      {
        name: "Guimbal",
        barangays: [
          "Bacong", "Bagumbayan", "Balantad-Carlos", "Bulay",
          "Bulod", "Cabagiao", "Gemat-y", "Igtambo",
          "Nanga", "Narra-Uno", "Nalundan", "Poblacion",
          "San Fernando", "Santa Rosa", "Sipitan", "Suka"
        ],
      },
      {
        name: "Igbaras",
        barangays: [
          "Alameda", "Alaguisoc", "Bagumbayan", "Bakhawan",
          "Bagay", "Buyanon", "Cagay", "Calampitao",
          "Corugcog", "Igcabugao", "Igtalongon",
          "Indaluyon", "Jovellar", "Layaan", "Poblacion Norte",
          "Poblacion Sur", "Passi", "Sulangan", "Tabucan"
        ],
      },
      {
        name: "Janiuay",
        barangays: [
          "Abay", "Agcarope", "Aglobong", "Badiangan",
          "Bakhaw", "Bolo", "Cabantog", "Cari", "Caridad",
          "Cawilihan", "Daja Norte", "Daja Sur",
          "Guadalupe", "Jibolo", "Lanag", "Lico-an",
          "Locsin", "Maasin", "Mandog", "Pajo", "Pangilihan",
          "Poblacion", "Quipot", "San Julian", "Siol"
        ],
      },
      {
        name: "Lambunao",
        barangays: [
          "Agdeppa", "Agtatacay", "Alibunan", "Badlan",
          "Banag", "Binaba-an", "Cabagiao", "Cabunlawan",
          "Cagay", "Caloy-ahan", "Camambugan", "Capuruhan",
          "Daanbanwa", "Gines", "Jayubo", "Libas",
          "Libo-on", "Mabini", "Millantawan", "Misi",
          "Pandan", "Panuran", "Poblacion Ilaud", "Poblacion Sidya",
          "Siya", "Tacuyong", "Tagsulip"
        ],
      },
      {
        name: "Leganes",
        barangays: [
          "Bigke", "Buntatala", "Cagamutan Norte",
          "Cagamutan Sur", "Calaboa", "Camangay",
          "Dolores", "Gua-an", "Guinobatan",
          "Nabitasan", "Poblacion", "San Vicente"
        ],
      },
      {
        name: "Lemery",
        barangays: [
          "Agbobolo", "Agalaan", "Anabo", "Cabalaunan",
          "Camambugan", "Imbang Grande", "Imbang Pequeño",
          "Layaan", "Naslo", "Poblacion", "Rojas",
          "San Fernando", "Sinciat"
        ],
      },
      {
        name: "Leon",
        barangays: [
          "Agboy", "Alibayog", "Buenavista", "Bulak Norte",
          "Bulak Sur", "Cagay", "Camando", "Cawilihan",
          "Dawis", "Do-og", "Gui-ob", "Ibus", "Inagdangan",
          "Langka", "Lico-an", "Maliao", "Malublub",
          "Mina", "Mocol", "Poblacion", "San Pablo",
          "Santa Cruz", "Tacuyong", "Talacuan"
        ],
      },
      {
        name: "Lucena",
        barangays: [
          "Bita", "Bugnay", "Cabilaoan", "Cagboy",
          "Daja", "Gua-an", "Ilajas", "Isian",
          "Lanipga", "Lucena Proper", "Magsaysay",
          "Nahoy", "Pantalan", "Poblacion"
        ],
      },
      {
        name: "Maasin",
        barangays: [
          "Abay", "Alibunan", "Bagacay", "Baluyan",
          "Burak", "Cabatangan", "Dagami", "Naslo",
          "North Poblacion", "Poblacion", "San Angel",
          "Siol", "Tigbauan"
        ],
      },
      {
        name: "Miagao",
        barangays: [
          "Awang", "Bacolod", "Bagumbayan", "Bakhaw",
          "Bolho", "Buwang", "Cabalaunan", "Cabangcalan",
          "Cagay", "Dalije", "Dawis", "Dila-an",
          "Guibongan", "Igpuro", "Igtuba", "Kirayan Norte",
          "Kirayan Sur", "Mat-y", "Namocon", "Nasidman",
          "Nay-nay", "Olango", "Poblacion", "San Fernando",
          "San Jose", "Sapa", "Tacas", "Tigbauan"
        ],
      },
      {
        name: "Mina",
        barangays: [
          "Abat", "Agmanaphao", "Bangac", "Cabalabaguan",
          "Capul-an", "Dajay", "Guibuangan", "Janipa-an Este",
          "Janipa-an Oeste", "Latasan", "Mina Proper",
          "Naclub", "Poblacion", "Singay", "Talokgangan",
          "Tipolo", "Tuyungan"
        ],
      },
      {
        name: "New Lucena",
        barangays: [
          "Baclayan", "Calumangan", "General Delgado",
          "Janipa-an Oeste", "Janipa-an Este", "Mambog",
          "Occidental", "Poblacion", "Wari-wari"
        ],
      },
      {
        name: "Oton",
        barangays: [
          "Abilay Norte", "Abilay Sur", "Alegre",
          "Batuan Ilaud", "Batuan Ilaya", "Bita Norte",
          "Bita Sur", "Botong", "Buray", "Cabanbanan",
          "Caboloan Norte", "Caboloan Sur", "Camandag",
          "Galang", "Inalasan", "Mohon", "Poblacion East",
          "Poblacion North", "Poblacion South", "Poblacion West",
          "San Antonio", "San Nicolas", "Trapiche", "Tuguisan"
        ],
      },
      {
        name: "Pavia",
        barangays: [
          "Aganan", "Amparo", "Anilao", "Balabag",
          "Cabugao Norte", "Cabugao Sur", "Jibolo",
          "Mali-ao", "Pagsanga-an", "Pandac",
          "Poblacion", "Purok I", "Purok II",
          "Ungka I", "Ungka II"
        ],
      },
      {
        name: "Passi City",
        barangays: [
          "Agdahon", "Agdayao", "Agtabo", "Agtambo",
          "Alimono", "Bacuranan", "Bagacay", "Batu",
          "Bayan", "Bitaogan", "Buenavista", "Cabunga",
          "Cadilang", "Cairohan", "Dalid", "Gemat-y",
          "Gemumua-agahon", "Gines Nuevo", "Gines Viejo",
          "Imbang Pequeño", "Ipil", "Jamul-awon",
          "Lanot", "Maasin", "Magdungao", "Mambog",
          "Man-it", "Nangka", "Nueva Obra", "Pari-an",
          "Pilar", "Poblacion Ilaud", "Poblacion Ilaya",
          "Punong", "Quinagaringan", "Sablogon",
          "San Agustin", "San Jose", "San Rafael",
          "Santa Rita", "Santo Tomas", "Siya", "Sulangan",
          "Taguhangin", "Tul-ahan"
        ],
      },
      {
        name: "Pototan",
        barangays: [
          "Abangay", "Amamaros", "Bagacay", "Barasan",
          "Batuan", "Bongco", "Caboloan", "Cadilang",
          "Cagamutan", "Camandag", "Cari", "Dao",
          "Dawis", "Don Alejandro", "Gemat-y",
          "Guibuangan", "Imbang Pequeño",
          "Iwa", "Jamabalod", "Libo-on", "Maasin",
          "Nanga", "Pajo", "Palanguia", "Poblacion",
          "San Roque", "Sulangan", "Tabucan",
          "Tul-ahan", "Tumcon Ilaud", "Tumcon Ilaya"
        ],
      },
      {
        name: "San Dionisio",
        barangays: [
          "Agdaliran", "Amayong", "Batuan", "Bondulan",
          "Cabi-angan", "Calagnaan", "Candari",
          "Codingle", "Cubay", "Cubay Sur",
          "Himanag", "Naborot", "Nangan", "Nasidman",
          "Panayran", "Poblacion", "San Nicolas", "Tab-oc"
        ],
      },
      {
        name: "San Enrique",
        barangays: [
          "Bagonawa", "Baja", "Bakhaw", "Batuan",
          "Buyanon", "Cabiguan", "Cadilang", "Cagamutan",
          "Catmon", "Cuartero", "Dacal", "Gines",
          "Hidalgo", "Mapili", "Poblacion Ilaud",
          "Poblacion Ilaya", "San Jose", "Taban"
        ],
      },
      {
        name: "San Joaquin",
        barangays: [
          "Anilao", "Badiang", "Balabag", "Catmon",
          "Damires", "Igcocolo", "Igdalaguit", "Igdulaca",
          "Igpaho", "Lignay", "Malandog", "Nagas",
          "Nasidman", "Poblacion", "San Fernando",
          "Sapa", "Tiolas", "Tubog"
        ],
      },
      {
        name: "San Miguel",
        barangays: [
          "Abian", "Cagamutan", "Calagnaan", "Cato-ogan",
          "Dalipe", "Gines", "Hamod", "Nasidman",
          "Oyong", "Poblacion", "San Jose", "San Nicolas",
          "Sinuagan", "Sulangan"
        ],
      },
      {
        name: "San Rafael",
        barangays: [
          "Agutayan", "Aspra", "Baguingin", "Calaigang",
          "Cali", "Hinay-agan", "Jibolo",
          "Pagsanga-an", "Poblacion"
        ],
      },
      {
        name: "Santa Barbara",
        barangays: [
          "Agutayan", "Agtambo", "Balabag", "Binabaan",
          "Bolong Este", "Bolong Oeste", "Buyo", "Cabugao",
          "Cadilang", "Calomagon", "Dapdapan", "Dawis",
          "Guintas", "Jaguimit", "Lanag", "Lico-an",
          "Mambog", "Muguing", "Palaypay", "Pamuringao",
          "Pandog", "Poblacion", "San Angel", "San Isidro",
          "Siang", "Sulangan", "Tugas", "Tul-ahan"
        ],
      },
      {
        name: "Sara",
        barangays: [
          "Aguirre", "Aldeguer", "Amaliao", "Bagacay",
          "Bolo", "Canhawan", "Catadman", "Devera",
          "Fernan", "Juanico", "Lanipe", "Malapoc",
          "Muyco", "Nasidman", "Pandac", "Poblacion Ilaud",
          "Poblacion Ilaya", "Rafanan", "Rizal Norte",
          "Rizal Sur", "San Luis", "Tanguingui"
        ],
      },
      {
        name: "Tigbauan",
        barangays: [
          "Alaguisoc", "Bagumbayan", "Bakhawan", "Binuluangan",
          "Bita", "Bugarot", "Buluangan", "Buyu-an",
          "Cordova Norte", "Cordova Sur", "Igtambo",
          "Napnapan Norte", "Napnapan Sur", "Pal-agon I",
          "Pal-agon II", "Parara Norte", "Parara Sur",
          "Poblacion", "San Rafael", "Sinublan", "Tacas",
          "Tabucan"
        ],
      },
      {
        name: "Tubungan",
        barangays: [
          "Adgao", "Agtambo", "Alibunan", "Bayog",
          "Binuluan", "Cadilang", "Cagay", "Igbita",
          "Igtambo", "Inalasan", "Malaguinabot",
          "Mantangon", "Nadsadan", "Nagsulang",
          "Poblacion", "San Jose", "San Vicente", "Sulangan"
        ],
      },
      {
        name: "Zarraga",
        barangays: [
          "Balud", "Dawis", "Gines", "Ilaud", "Jalaud",
          "Libongcogon", "Malunang", "Palaypay", "Poblacion",
          "Talaugon", "Tacas", "Tul-ahan", "Tumagboc"
        ],
      },
    ],
  },
  {
    province: "Aklan",
    municipalities: [
      {
        name: "Altavas",
        barangays: [
          "Cabangila", "Cabugao", "Catmon", "Dalipdip",
          "Gibon", "Linayasan", "Mamba", "Mandong",
          "Mcombo", "Poblacion", "Quinasay-an", "Rosario",
          "San Isidro", "San Jose", "Tul-ang"
        ],
      },
      {
        name: "Balete",
        barangays: [
          "Aranas", "Arcangel", "Calizo", "Cortes",
          "Feliciano", "Fulgencio", "Guanko",
          "Morales", "Pagatpatan", "Poblacion",
          "Rizal", "Talisay"
        ],
      },
      {
        name: "Banga",
        barangays: [
          "Agbanawan", "Bacan", "Cerrudo", "Cupang",
          "Daja", "Dalagsaan", "Guinbialan",
          "Kalibo", "Lapnag", "Libas", "Linabuan Norte",
          "Linabuan Sur", "Mambog", "Poblacion",
          "Polocate", "Sampaguita", "Sigpit", "Torralba"
        ],
      },
      {
        name: "Batan",
        barangays: [
          "Amancio", "Angas", "Bay-ang", "Cabad-an",
          "Cabayugan", "Cabugan", "Calang", "Lalab",
          "Lupit", "Magcalon", "Malindog", "Poblacion",
          "Songcolan", "Tabon"
        ],
      },
      {
        name: "Buruanga",
        barangays: [
          "Alegria", "Bagongbayan", "Balusbos",
          "Bel-is", "Cabugan", "El Progreso",
          "Habana", "Katipunan", "Mayapay", "Nazareth",
          "Panilongan", "Poblacion", "Santander",
          "Tag-osip", "Tigum"
        ],
      },
      {
        name: "Ibajay",
        barangays: [
          "Agbago", "Aquino", "Asluman", "Bugtongbato",
          "Colongcolong", "Jalas", "Laguinbanua East",
          "Laguinbanua West", "Maloco", "Mina-a",
          "Naisud", "Nalook", "Poblacion", "Polo",
          "Regador", "Rivera", "San Isidro",
          "Santa Cruz", "Tagbaya", "Yawan"
        ],
      },
      {
        name: "Kalibo",
        barangays: [
          "Andagao", "Bachaw Norte", "Bachaw Sur",
          "Briones", "Buswang New", "Buswang Old",
          "Caano", "Cabatangan", "Estancia", "Linabuan Norte",
          "Linabuan Sur", "Mabilo", "Mobo", "Nalook",
          "Ochando", "Pala-pala I", "Pala-pala II",
          "Poblacion", "Pook", "Tigayon", "Tinigao",
          "Union"
        ],
      },
      {
        name: "Lezo",
        barangays: [
          "Agcawili", "Carugdog", "Ibao", "Mambog",
          "Mangan", "Poblacion", "Santa Cruz",
          "Santa Cruz Bigaa", "Silakat-Nonok",
          "Tayhawan"
        ],
      },
      {
        name: "Libacao",
        barangays: [
          "Agmalobo", "Alfredo", "Baguijay", "Bonbon",
          "Calacabian", "Cortes", "Cudian", "Daguitan",
          "Guba", "Janlud", "Julita", "Lublub",
          "Manika", "Obo-ob", "Ondoy", "Pampango",
          "Poblacion", "Rosal", "Sibalew"
        ],
      },
      {
        name: "Madalag",
        barangays: [
          "Alaminos", "Alas-as", "Bacyang", "Balactasan",
          "Cabangahan", "Daguitan", "Guadalupe",
          "Logon", "Mamba", "Mandog", "Maria Cristina",
          "Medina", "Mosteiro", "Pang-itan", "Pawa",
          "Poblacion", "Singay", "Tigum"
        ],
      },
      {
        name: "Makato",
        barangays: [
          "Baybay", "Cabatanga", "Calangcang", "Cayangwan",
          "Dumga", "Libang", "Mantiguib",
          "Poblacion", "Songcolan", "Taberna",
          "Tugas"
        ],
      },
      {
        name: "Malay",
        barangays: [
          "Argao", "Balabag", "Balusbus", "Cagban",
          "Caticlan", "Cogon", "Cubay Norte", "Cubay Sur",
          "Dumlog", "Manoc-Manoc", "Motag", "Naasug",
          "Nabaoy", "Napaan", "Poblacion", "San Visal",
          "Yapak"
        ],
      },
      {
        name: "Malinao",
        barangays: [
          "Cabayugan", "Cabugao", "Candelaria",
          "Cogon", "Florete", "Fundacion",
          "Huron-Huron", "Laguinbanua", "Navitas",
          "Ogsip", "Poblacion", "Rosario",
          "Savang", "Tigum"
        ],
      },
      {
        name: "Nabas",
        barangays: [
          "Alimbo-Baybay", "Buenafortuna", "Cabugan",
          "Gibon", "Ibaan", "Malita", "Napti",
          "Pawa", "Pinamucan", "Poblacion",
          "Rizal", "Solido", "Tagororoc",
          "Union"
        ],
      },
      {
        name: "New Washington",
        barangays: [
          "Aclan", "Banguilan", "Candelaria",
          "Dumaguit", "Fatima", "Guinbaliwan",
          "Jalas", "Jugas", "Lawa-an", "Mabilo",
          "Mataphao", "Ochando", "Pinamuk-an",
          "Poblacion", "Polo", "Puis", "Tambak"
        ],
      },
      {
        name: "Numancia",
        barangays: [
          "Albasan", "Aliputos", "Badio", "Camanci Norte",
          "Camanci Sur", "Dongon East", "Dongon West",
          "Jagnaya", "Laguinbanua", "Navitas",
          "Poblacion", "Puti-an"
        ],
      },
      {
        name: "Tangalan",
        barangays: [
          "Afga", "Baybay", "Dapdap", "Dumatad",
          "Jawili", "Lacayon", "Napatag",
          "Panayakan", "Poblacion", "Pudiot",
          "Santo Niño", "Tagas", "Tamaligan",
          "Tamokoe", "Tondog", "Vidal"
        ],
      },
    ],
  },
  {
    province: "Capiz",
    municipalities: [
      {
        name: "Cuartero",
        barangays: [
          "Agcuyawan", "Balighot", "Bito-on", "Cabugao",
          "Canapian", "Dolores", "Inzo Arnaldo",
          "Maninang", "Murio", "Poblacion Ilaud",
          "Poblacion Ilaya", "Quinabcaban", "San Antonio",
          "San Juan", "Sinabsaban"
        ],
      },
      {
        name: "Dao",
        barangays: [
          "Agbalo", "Aglalana", "Agrupacion",
          "Balighot", "Batabat", "Bungsuan",
          "Cabilogan", "Codingle", "Dawis",
          "Malonoy", "Manhoy", "Mapulang",
          "Matagnop", "Nasunogan", "Poblacion Ilaud",
          "Poblacion Ilaya"
        ],
      },
      {
        name: "Dumalag",
        barangays: [
          "Codingle", "Consolacion", "Daan Sur",
          "General Delgado", "General Luna",
          "Mabini", "Malusan", "Nacurvatan",
          "Poblacion Norte", "Poblacion Sur",
          "San Agustin", "San Jose", "San Martin",
          "San Rafael", "Santa Carmen"
        ],
      },
      {
        name: "Dumarao",
        barangays: [
          "Agbatuan", "Agloway", "Alipasiawan",
          "Astorga", "Bayog", "Bungsuan", "Codingle",
          "Ermita", "Jagnaya", "Lacaron", "Mambusao",
          "Maninang", "Ngalan", "Poblacion", "Rizal",
          "San Jose", "Sibariwan", "Tamulalod",
          "Taslan", "Villaverde"
        ],
      },
      {
        name: "Ivisan",
        barangays: [
          "Agcawayan", "Agmalobo", "Agustin Navarra",
          "Balaring", "Basiao", "Cabugao",
          "Cudian", "Ilaud", "Malocloc Norte",
          "Malocloc Sur", "Matnog", "Mianay",
          "Poblacion Norte", "Poblacion Sur",
          "San Fernando"
        ],
      },
      {
        name: "Jamindan",
        barangays: [
          "Agambulong", "Agbun-od", "Agcagay",
          "Aglibacao", "Agloloway", "Bato-bato",
          "Cabugao", "Cudian", "Jagnaya",
          "Lapaz", "Mianay", "Poblacion",
          "San Jose", "Siya"
        ],
      },
      {
        name: "Ma-ayon",
        barangays: [
          "Aglimocon", "Alipasiawan", "Banate",
          "Bayog", "Cabugao", "Carmensita",
          "Cubay", "Danao", "Duyoc",
          "Jagnaya", "Nahalinan", "Nasunogan",
          "Poblacion", "San Jose", "San Miguel",
          "Tuburan"
        ],
      },
      {
        name: "Mambusao",
        barangays: [
          "Atiplo", "Balat-an", "Balit", "Batiano",
          "Bating", "Bunga", "Caidquid",
          "Cogon", "Dawis", "Duran",
          "Hilwan", "Juanico", "Poblacion Proper",
          "Poblacion Tabuc", "San Antonio",
          "San Juan", "San Vicente"
        ],
      },
      {
        name: "Panay",
        barangays: [
          "Amti", "Bag-ong Barrio", "Binangig",
          "Bonga", "Cabugao Occidental", "Cabugao Oriental",
          "Cogon", "Daga", "Ilaud",
          "Jinalinan", "Linabuan", "Navitas",
          "Pawa", "Pinamihagan", "Poblacion Ilaud",
          "Poblacion Ilaya", "Poblacion Tabuc",
          "Tanza"
        ],
      },
      {
        name: "Panitan",
        barangays: [
          "Agbalo", "Agbanawan", "Amaga",
          "Balit", "Bato-bato", "Cabugao",
          "Calit", "Candual", "Cogon",
          "Daan", "Linabuan", "Mambog",
          "Mianay", "Pasol-o", "Poblacion Ilaud",
          "Poblacion Ilaya"
        ],
      },
      {
        name: "Pilar",
        barangays: [
          "Binaobao", "Cabugao", "Casanayan",
          "Dapdap", "Dulangan", "Natividad",
          "Olotayan", "Poblacion", "San Antonio",
          "San Nicolas", "San Pedro",
          "San Ramon", "Santa Fe"
        ],
      },
      {
        name: "Pontevedra",
        barangays: [
          "Bailan", "Barangay I", "Barangay II",
          "Barangay III", "Binuluangan", "Bitas",
          "Butuan", "Cabugao", "Intungcan",
          "Lantangan", "Linampongan", "Mianay",
          "Natividad", "Pandan", "Poblacion",
          "Rizal", "San Julian", "Tacas"
        ],
      },
      {
        name: "President Roxas",
        barangays: [
          "Aranguel", "Balit", "Cabugao",
          "Cubay", "Culasi", "Goce",
          "Lomboy", "Mianay", "Mongpong",
          "Poblacion", "Quiajo", "San Juan"
        ],
      },
      {
        name: "Roxas City",
        barangays: [
          "Adlawan", "Bago", "Balijuagan", "Banica",
          "Bantigue", "Barangay I", "Barangay II",
          "Barangay III", "Barangay IV", "Barangay V",
          "Barangay VI", "Barangay VII", "Barangay VIII",
          "Barangay IX", "Barangay X", "Barangay XI",
          "Baybay", "Bolo", "Cabugao", "Cogon",
          "Culasi", "Cagay", "Dayao", "Dinginan",
          "Dumolog", "Gabu-an", "Inzo Arnaldo Village",
          "Jumaguicjic", "Lanot", "Lawa-an", "Libas",
          "Loctugan", "Milibili", "Mongpong",
          "Olotayan", "Poblacion", "Sibaguan",
          "Talon", "Tanza", "Tiza"
        ],
      },
      {
        name: "Sapian",
        barangays: [
          "Agcuyawan", "Aspera", "Bilao", "Binungkalan",
          "Cabugao", "Canapian", "Dulangan",
          "Hibao-an", "Linabuan", "Poblacion",
          "San Jose", "Silakat", "Tacas"
        ],
      },
      {
        name: "Sigma",
        barangays: [
          "Acbo", "Amaga", "Bangonbangon",
          "Cabugao", "Cabangon", "Capuyhan",
          "Cogon", "Dapdap", "Mianay",
          "Poblacion Norte", "Poblacion Sur",
          "Tawog"
        ],
      },
      {
        name: "Tapaz",
        barangays: [
          "Acbo", "Aglinab", "Agluoy", "Agpalali",
          "Apil", "Artajo", "Binangig",
          "Cabungahan", "Caritan", "Cudian",
          "Da-an Sur", "Duran", "Hilwan",
          "Katipunan", "Lahug", "Libon",
          "Mabini", "Malitbog", "Mambog",
          "Nayawan", "Poblacion", "Rizal",
          "Roosevelt", "Sablig", "San Antonio",
          "San Fernando", "San Jose", "San Nicolas",
          "Siya", "Tapaz Proper"
        ],
      },
    ],
  },
  {
    province: "Antique",
    municipalities: [
      {
        name: "Anini-y",
        barangays: [
          "Bayo Grande", "Bayo Pequeño", "Butuan",
          "Casit-an", "Igbangcal", "Magdalena",
          "Nasuli", "Nato", "Poblacion",
          "San Francisco", "San Jose", "San Ramon",
          "San Roque", "Talisayan"
        ],
      },
      {
        name: "Barbaza",
        barangays: [
          "Binanu-an", "Bugo", "Cadiao",
          "Catungan I", "Catungan II",
          "Esparagosa", "Ipil", "Laserna",
          "Malandog", "Nalook", "Paliwan",
          "Poblacion", "Siguinit", "Talisay"
        ],
      },
      {
        name: "Belison",
        barangays: [
          "Aras-asan", "Borocboroc", "Buenavista",
          "Concepcion", "Delima", "Maradiona",
          "Mojon", "Nopla", "Poblacion",
          "Rombang", "Salvacion"
        ],
      },
      {
        name: "Bugasong",
        barangays: [
          "Anilawan", "Aningalan", "Atoybato",
          "Badiang", "Bagtason", "Camancijan",
          "Centro Norte", "Centro Sur", "Cubay",
          "Igbalangao", "Igsoro", "Ilaures",
          "La Rioja", "Pangpang", "Poblacion",
          "San Fernando", "Santo Rosario", "Tagudtud",
          "Zaragoza"
        ],
      },
      {
        name: "Caluya",
        barangays: [
          "Alegria", "Bacong", "Banago",
          "Bonbon", "Dawis", "Dionela",
          "Harigue", "Hinugayan", "Imba",
          "Masabay", "Poblacion", "Sabang",
          "Salamento", "Semirara", "Sibato",
          "Tinogboc"
        ],
      },
      {
        name: "Culasi",
        barangays: [
          "Alojipan", "Bagacay", "Balac-balac",
          "Bulanao", "Capilijan", "Condes",
          "Flores", "Lipata", "Manaol",
          "Nauring", "Osorio", "Poblacion",
          "San Fernando", "San Jose", "Valderama"
        ],
      },
      {
        name: "Dao",
        barangays: [
          "Amiroy", "Badiangan", "Borocboroc",
          "Buhang", "Cadolonan", "Calapadan",
          "Ilaures", "Lacaron", "Lusong",
          "Malonoy", "Manhoy", "Nasuli",
          "Poblacion", "Quinagaringan", "San Isidro"
        ],
      },
      {
        name: "Hamtic",
        barangays: [
          "Apdo", "Asluman", "Banawon",
          "Biga", "Botbot", "Buhang",
          "Calacja", "Carbajal", "Dangcalan",
          "Dol-og", "General Fullon", "Ilo-ilo",
          "Magtulis", "Mapatag", "Nalook",
          "Pajo", "Piape I", "Piape II",
          "Piape III", "Poblacion", "Talisay"
        ],
      },
      {
        name: "Laua-an",
        barangays: [
          "Bagacay", "Banban", "Capoyuan",
          "Casit-an", "Guia", "Intao",
          "Lanas", "Latabon", "Lawa-an",
          "Libertad", "Lindero", "Lipe-ahan",
          "Luan", "Lugban", "Mananao",
          "Nucaan", "Pandanan", "Poblacion"
        ],
      },
      {
        name: "Libertad",
        barangays: [
          "Barangcalan", "Baranggay 1", "Baranggay 2",
          "Baranggay 3", "Bulanao", "Corocog",
          "Cubay", "Igcabugao", "Iguirindon",
          "La Paz", "Maramig", "Pajo",
          "Panganiban", "Poblacion", "San Roque",
          "Taboc"
        ],
      },
      {
        name: "Pandan",
        barangays: [
          "Bagumbayan", "Barangay 1", "Barangay 2",
          "Barangay 3", "Barangay 4", "Barangay 5",
          "Bulanao", "Cabugao", "Duyong",
          "Guia", "Idiacacan", "Jinalinan",
          "Mag-aba", "Nauring", "Patria",
          "Poblacion", "San Andres", "Sta. Cruz",
          "Talisay", "Tingib"
        ],
      },
      {
        name: "Patnongon",
        barangays: [
          "Acao", "Aracay", "Badiangan",
          "Cabugao", "Catmon", "Igbolo",
          "Igcococ", "La Rioja", "Lambayagan",
          "Maalat", "Mabini", "Malandog",
          "Natividad", "Pandanan", "Poblacion",
          "San Jose", "Sto. Rosario"
        ],
      },
      {
        name: "San Jose de Buenavista",
        barangays: [
          "Atabay", "Badiang", "Barangay 1",
          "Barangay 2", "Barangay 3", "Barangay 4",
          "Barangay 5", "Barangay 6", "Barangay 7",
          "Barangay 8", "Bayo Grande", "Bayo Pequeño",
          "Cansadan", "Camambugan", "Funda-Dalipe",
          "Gracia", "Igbonglo", "Ipil",
          "Maybato Norte", "Maybato Sur", "Mojon",
          "Pangalcagan", "Phob", "Poblacion",
          "San Angel", "San Fernando", "San Pedro",
          "Santo Rosario", "Supa", "Tobias Fornier"
        ],
      },
      {
        name: "San Remigio",
        barangays: [
          "Agbuñag", "Agliam", "Agtatacay",
          "Ambilay", "Bariri", "Burias",
          "Cabalawan", "Cabanbanan", "Cadiao",
          "Gata", "Igbical", "Igbugo",
          "La Union", "Mataywanac", "Panganiban",
          "Poblacion", "Rosario"
        ],
      },
      {
        name: "Sebaste",
        barangays: [
          "Abiera", "Aguila", "Alegre",
          "Buenavista", "Bulalacao", "Idio",
          "Nagustan", "Poblacion"
        ],
      },
      {
        name: "Sibalom",
        barangays: [
          "Alangan", "Biga", "Bongbongan I",
          "Bongbongan II", "Bongsod", "Bugang",
          "Cabanbanan", "Cadoldolan", "Catungan",
          "Cubay", "Egaña", "Esperanza",
          "Guisijan", "Igbalogo", "Igdalaguit",
          "Inabasan", "Lacaron", "Mablad",
          "Milabog", "Nasuli", "Pajo",
          "Pantao", "Pasong", "Poblacion",
          "San Fernando", "Solong", "Villafuerte"
        ],
      },
      {
        name: "Tibiao",
        barangays: [
          "Alegre", "Aningalan", "Atabay",
          "Bugang", "Catmon", "Esparagosa",
          "Importante", "Malabor", "Poblacion",
          "San Isidro", "Seguinit", "Tagubanhan",
          "Tina"
        ],
      },
      {
        name: "Tobias Fornier",
        barangays: [
          "Abaca", "Aras-asan", "Ardemil",
          "Asluman", "Barangay I", "Barangay II",
          "Barangay III", "Dalipe", "Fatima",
          "Igbucagay", "Ipil", "Lublub",
          "Magdalena", "Magsaysay", "Nasuli",
          "Poblacion", "San Francisco", "San Jose",
          "Tuno", "Vilvar"
        ],
      },
      {
        name: "Valderrama",
        barangays: [
          "Afonangon", "Amiroy", "Balingasag",
          "Buluangan", "Busog", "Candelaria",
          "Igcocolo", "Igdagmay", "Mabini",
          "Pandanan", "Paningayan", "Poblacion",
          "San Agustin", "Tagudtud", "Tuno",
          "Ubos"
        ],
      },
    ],
  },
  {
    province: "Guimaras",
    municipalities: [
      {
        name: "Buenavista",
        barangays: [
          "Agsanayan", "Avila", "Bacjao", "Banban",
          "Buenavista Proper", "Calaya", "Cansilayan",
          "Dalusan", "Getulinan", "Mclain",
          "Montilla", "Naquilian", "Nueva Valencia",
          "Oldadok", "Poblacion", "Rizal",
          "San Fernando", "San Isidro", "San Miguel",
          "San Nicolas", "San Pedro", "Santa Rosa",
          "Sawang", "Supang", "Tacay",
          "Taminla", "Tasil"
        ],
      },
      {
        name: "Jordan",
        barangays: [
          "Alaguisoc", "Balcon Melliza", "Bugnay",
          "Buluangan", "Espinosa", "Hoskyn",
          "Lawi", "Morobuan", "Poblacion",
          "Rizal", "San Miguel", "San Nicolas",
          "Sapal", "Sinapsapan", "Tamborong"
        ],
      },
      {
        name: "Nueva Valencia",
        barangays: [
          "Cabalagnan", "Calaya", "Canhawan",
          "Dolores", "Guisi", "Igang",
          "Igdarapdap", "La Paz", "Lanipe",
          "Lucmayan", "Magamay", "Napandong",
          "Oracon Norte", "Oracon Sur", "Pandaraonan",
          "Poblacion", "Salvacion", "San Antonio",
          "San Isidro", "San Miguel", "Santo Domingo",
          "Sto. Niño", "Tando"
        ],
      },
      {
        name: "San Lorenzo",
        barangays: [
          "Aguilar", "Cabano", "Cabungahan",
          "Constancia", "Gaban", "Igcawayan",
          "M. Chavez", "San Enrique", "Sapal",
          "Sebaste", "Suclaran", "Tamandato",
          "Poblacion"
        ],
      },
      {
        name: "Sibunag",
        barangays: [
          "Alegria", "Ayangan", "Bubog",
          "Concordia", "Dasal", "Inampologan",
          "Maabay", "Millan", "Oracon",
          "Poblacion", "Sabang", "San Isidro",
          "Sebaste", "Tanglad"
        ],
      },
    ],
  },
];

// Helper functions

export function getProvinces(): string[] {
  return LOCATIONS.map((loc) => loc.province);
}

export function getMunicipalities(province: string): string[] {
  const loc = LOCATIONS.find(
    (l) => l.province.toLowerCase() === province.toLowerCase()
  );
  if (!loc) return [];
  return loc.municipalities.map((m) => m.name);
}

export function getBarangays(province: string, municipality: string): string[] {
  const loc = LOCATIONS.find(
    (l) => l.province.toLowerCase() === province.toLowerCase()
  );
  if (!loc) return [];
  const mun = loc.municipalities.find(
    (m) => m.name.toLowerCase() === municipality.toLowerCase()
  );
  if (!mun) return [];
  return mun.barangays;
}
