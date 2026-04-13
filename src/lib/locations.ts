export interface Location {
  province: string;
  municipalities: {
    name: string;
    barangays: string[];
  }[];
}

export const LOCATIONS: Location[] = [
  {
    province: "Aklan",
    municipalities: [
      {
        name: "Altavas",
        barangays: [
          "Cabangila", "Cabugao", "Catmon", "Dalipdip", "Ginictan", "Linayasan", 
          "Lumaynay", "Lupo", "Man-up", "Odiong", "Poblacion", "Quinasay-an", "Talon", 
          "Tibiao"
        ],
      },
      {
        name: "Balete",
        barangays: [
          "Aranas", "Arcangel", "Calizo", "Cortes", "Feliciano", "Fulgencio", "Guanko", 
          "Morales", "Oquendo", "Poblacion"
        ],
      },
      {
        name: "Banga",
        barangays: [
          "Agbanawan", "Bacan", "Badiangan", "Cerrudo", "Cupang", "Daguitan", 
          "Daja Norte", "Daja Sur", "Dingle", "Jumarap", "Lapnag", "Libas", 
          "Linabuan Sur", "Mambog", "Mangan", "Muguing", "Pagsanghan", "Palale", 
          "Poblacion", "Polo", "Polocate", "San Isidro", "Sibalew", "Sigcay", "Taba-ao", 
          "Tabayon", "Tinapuay", "Torralba", "Ugsod", "Venturanza"
        ],
      },
      {
        name: "Batan",
        barangays: [
          "Ambolong", "Angas", "Bay-ang", "Cabugao", "Caiyang", "Camaligan", "Camanci", 
          "Ipil", "Lalab", "Lupit", "Magpag-ong", "Magubahay", "Mambuquiao", "Man-up", 
          "Mandong", "Napti", "Palay", "Poblacion", "Songcolan", "Tabon"
        ],
      },
      {
        name: "Buruanga",
        barangays: [
          "Alegria", "Bagongbayan", "Balusbos", "Bel-is", "Cabugan", "El Progreso", 
          "Habana", "Katipunan", "Mayapay", "Nazareth", "Panilongan", "Poblacion", 
          "Santander", "Tag-osip", "Tigum"
        ],
      },
      {
        name: "Ibajay",
        barangays: [
          "Agbago", "Agdugayan", "Antipolo", "Aparicio", "Aquino", "Aslum", "Bagacay", 
          "Batuan", "Buenavista", "Bugtongbato", "Cabugao", "Capilijan", "Colongcolong", 
          "Laguinbanua", "Mabusao", "Malindog", "Maloco", "Mina-a", "Monlaque", "Naile", 
          "Naisud", "Naligusan", "Ondoy", "Poblacion", "Polo", "Regador", "Rivera", 
          "Rizal", "San Isidro", "San Jose", "Santa Cruz", "Tagbaya", "Tul-ang", "Unat", 
          "Yawan"
        ],
      },
      {
        name: "Kalibo",
        barangays: [
          "Andagaw", "Bachaw Norte", "Bachaw Sur", "Briones", "Buswang New", 
          "Buswang Old", "Caano", "Estancia", "Linabuan Norte", "Mabilo", "Mobo", 
          "Nalook", "Poblacion", "Pook", "Tigayon", "Tinigaw"
        ],
      },
      {
        name: "Lezo",
        barangays: [
          "Agcawilan", "Bagto", "Bugasongan", "Carugdog", "Cogon", "Ibao", "Mina", 
          "Poblacion", "Santa Cruz", "Santa Cruz Bigaa", "Silakat-Nonok", "Tayhawan"
        ],
      },
      {
        name: "Libacao",
        barangays: [
          "Agmailig", "Alfonso XII", "Batobato", "Bonza", "Calacabian", "Calamcan", 
          "Can-Awan", "Casit-an", "Dalagsa-an", "Guadalupe", "Janlud", "Julita", 
          "Luctoga", "Magugba", "Manika", "Ogsip", "Ortega", "Oyang", "Pampango", 
          "Pinonoy", "Poblacion", "Rivera", "Rosal", "Sibalew"
        ],
      },
      {
        name: "Madalag",
        barangays: [
          "Alaminos", "Alas-as", "Bacyang", "Balactasan", "Cabangahan", "Cabilawan", 
          "Catabana", "Dit-Ana", "Galicia", "Guinatu-an", "Logohon", "Mamba", 
          "Maria Cristina", "Medina", "Mercedes", "Napnot", "Pang-Itan", "Paningayan", 
          "Panipiason", "Poblacion", "San Jose", "Singay", "Talangban", "Talimagao", 
          "Tigbawan"
        ],
      },
      {
        name: "Makato",
        barangays: [
          "Agbalogo", "Aglucay", "Alibagon", "Bagong Barrio", "Baybay", "Cabatanga", 
          "Cajilo", "Calangcang", "Calimbajan", "Castillo", "Cayangwan", "Dumga", 
          "Libang", "Mantiguib", "Poblacion", "Tibiawan", "Tina", "Tugas"
        ],
      },
      {
        name: "Malay",
        barangays: [
          "Argao", "Balabag", "Balusbus", "Cabulihan", "Caticlan", "Cogon", 
          "Cubay Norte", "Cubay Sur", "Dumlog", "Manoc-Manoc", "Motag", "Naasug", 
          "Nabaoy", "Napaan", "Poblacion", "San Viray", "Yapak"
        ],
      },
      {
        name: "Malinao",
        barangays: [
          "Banaybanay", "Biga-a", "Bulabud", "Cabayugan", "Capataga", "Cogon", 
          "Dangcalan", "Kinalangay Nuevo", "Kinalangay Viejo", "Lilo-an", "Malandayon", 
          "Manhanip", "Navitas", "Osman", "Poblacion", "Rosario", "San Dimas", 
          "San Ramon", "San Roque", "Sipac", "Sugnod", "Tambuan", "Tigpalas"
        ],
      },
      {
        name: "Nabas",
        barangays: [
          "Alimbo-Baybay", "Buenafortuna", "Buenasuerte", "Buenavista", "Gibon", 
          "Habana", "Laserna", "Libertad", "Magallanes", "Matabana", "Nagustan", "Pawa", 
          "Pinatuad", "Poblacion", "Rizal", "Solido", "Tagororoc", "Toledo", "Unidos", 
          "Union"
        ],
      },
      {
        name: "New Washington",
        barangays: [
          "Candelaria", "Cawayan", "Dumaguit", "Fatima", "Guinbaliwan", "Jalas", "Jugas", 
          "Lawa-an", "Mabilo", "Mataphao", "Ochando", "Pinamuk-an", "Poblacion", "Polo", 
          "Puis", "Tambak"
        ],
      },
      {
        name: "Numancia",
        barangays: [
          "Albasan", "Aliputos", "Badio", "Bubog", "Bulwang", "Camanci Norte", 
          "Camanci Sur", "Dongon East", "Dongon West", "Joyao-joyao", "Laguinbanua East", 
          "Laguinbanua West", "Marianos", "Navitas", "Poblacion", "Pusiw", "Tabangka"
        ],
      },
      {
        name: "Tangalan",
        barangays: [
          "Afga", "Baybay", "Dapdap", "Dumatad", "Jawili", "Lanipga", "Napatag", 
          "Panayakan", "Poblacion", "Pudiot", "Tagas", "Tamalagon", "Tamokoe", "Tondog", 
          "Vivo"
        ],
      },
    ],
  },
  {
    province: "Antique",
    municipalities: [
      {
        name: "Anini-Y",
        barangays: [
          "Bayo Grande", "Bayo Pequeño", "Butuan", "Casay", "Casay Viejo", "Iba", 
          "Igbarabatuan", "Igpalge", "Igtumarom", "Lisub A", "Lisub B", "Mabuyong", 
          "Magdalena", "Nasuli C", "Nato", "Poblacion", "Sagua", "Salvacion", 
          "San Francisco", "San Ramon", "San Roque", "Tagaytay", "Talisayan"
        ],
      },
      {
        name: "Barbaza",
        barangays: [
          "Baghari", "Bahuyan", "Beri", "Biga-a", "Binangbang", "Binangbang Centro", 
          "Binanu-an", "Cadiao", "Calapadan", "Capoyuan", "Cubay", "Embrangga-an", 
          "Esparar", "Gua", "Idao", "Igpalge", "Igtunarum", "Integasan", "Ipil", 
          "Jinalinan", "Lanas", "Langcaon", "Lisub", "Lombuyan", "Mablad", "Magtulis", 
          "Marigne", "Mayabay", "Mayos", "Nalusdan", "Narirong", "Palma", "Poblacion", 
          "San Antonio", "San Ramon", "Soligao", "Tabongtabong", "Tig-Alaran", "Yapo"
        ],
      },
      {
        name: "Belison",
        barangays: [
          "Borocboroc", "Buenavista", "Concepcion", "Delima", "Ipil", "Maradiona", 
          "Mojon", "Poblacion", "Rombang", "Salvacion", "Sinaja"
        ],
      },
      {
        name: "Bugasong",
        barangays: [
          "Anilawan", "Arangote", "Bagtason", "Camangahan", "Centro Ilawod (Pob.)", 
          "Centro Ilaya (Pob.)", "Centro Pojo (Pob.)", "Cubay North", "Cubay South", 
          "Guija", "Igbalangao", "Igsoro", "Ilaures", "Jinalinan", "Lacayon", "Maray", 
          "Paliwan", "Pangalcagan", "Sabang East", "Sabang West", "Tagudtud North", 
          "Tagudtud South", "Talisay", "Tica", "Tono-an", "Yapu", "Zaragoza"
        ],
      },
      {
        name: "Caluya",
        barangays: [
          "Alegria", "Bacong", "Banago", "Bonbon", "Dawis", "Dionela", "Harigue", 
          "Hininga-an", "Imba", "Masanag", "Poblacion", "Sabang", "Salamento", 
          "Semirara", "Sibato", "Sibay", "Sibolo", "Tinogboc"
        ],
      },
      {
        name: "Culasi",
        barangays: [
          "Alojipan", "Bagacay", "Balac-balac", "Batbatan Island", "Batonan Norte", 
          "Batonan Sur", "Bita", "Bitadton Norte", "Bitadton Sur", "Buenavista", "Buhi", 
          "Camancijan", "Caridad", "Carit-an", "Centro Norte (Pob.)", "Centro Poblacion", 
          "Centro Sur (Pob.)", "Condes", "Esperanza", "Fe", "Flores", "Jalandoni", 
          "Janlagasi", "Lamputong", "Lipata", "Magsaysay", "Malacañang", 
          "Malalison Island", "Maniguin", "Naba", "Osorio", "Paningayan", "Salde", 
          "San Antonio", "San Gregorio", "San Juan", "San Luis", "San Pascual", 
          "San Vicente", "Simbola", "Tigbobolo", "Tinabusan", "Tomao", "Valderama"
        ],
      },
      {
        name: "Hamtic",
        barangays: [
          "Apdo", "Asluman", "Banawon", "Bia-an", "Bongbongan I-II", "Bongbongan III", 
          "Botbot", "Budbudan", "Buhang", "Calacja I", "Calacja II", "Calala", 
          "Cantulan", "Caridad", "Caromangay", "Casalngan", "Dangcalan", "Del Pilar", 
          "Fabrica", "Funda", "General Fullon", "Gov. Evelio B. Javier", "Guintas", 
          "Igbical", "Igbucagay", "Inabasan", "Ingwan-Batangan", "La Paz", "Linaban", 
          "Malandog", "Mapatag", "Masanag", "Nalihawan", "Pamandayan", "Pasu-Jungao", 
          "Piape I", "Piape II", "Piape III", "Pili 1, 2, 3", "Poblacion 1", 
          "Poblacion 2", "Poblacion 3", "Poblacion 4", "Poblacion 5", "Pu-ao", "Suloc", 
          "Villavert-Jimenez"
        ],
      },
      {
        name: "Laua-An",
        barangays: [
          "Bagongbayan", "Banban", "Bongbongan", "Cabariwan", "Cadajug", "Canituan", 
          "Capnayan", "Casit-an", "Guiamon", "Guinbanga-an", "Guisijan", "Igtadiao", 
          "Intao", "Jaguikican", "Jinalinan", "Lactudan", "Latazon", "Laua-an", "Leon", 
          "Liberato", "Lindero", "Liya-liya", "Lugta", "Lupa-an", "Magyapo", "Maria", 
          "Mauno", "Maybunga", "Necesito", "Oloc", "Omlot", "Pandanan", "Paningayan", 
          "Pascuala", "Poblacion", "San Ramon", "Santiago", "Tibacan", "Tigunhao", 
          "Virginia"
        ],
      },
      {
        name: "Libertad",
        barangays: [
          "Barusbus", "Bulanao", "Centro Este (Pob.)", "Centro Weste (Pob.)", "Codiong", 
          "Cubay", "Igcagay", "Inyawan", "Lindero", "Maramig", "Pajo", "Panangkilon", 
          "Paz", "Pucio", "San Roque", "Taboc", "Tinigbas", "Tinindugan", "Union"
        ],
      },
      {
        name: "Pandan",
        barangays: [
          "Aracay", "Badiangan", "Bagumbayan", "Baybay", "Botbot", "Buang", "Cabugao", 
          "Candari", "Carmen", "Centro Norte (Pob.)", "Centro Sur (Pob.)", "Dionela", 
          "Dumrog", "Duyong", "Fragante", "Guia", "Idiacacan", "Jinalinan", 
          "Luhod-Bayang", "Maadios", "Mag-aba", "Napuid", "Nauring", "Patria", 
          "Perfecta", "San Andres", "San Joaquin", "Santa Ana", "Santa Cruz", "Santa Fe", 
          "Santo Rosario", "Talisay", "Tingib", "Zaldivar"
        ],
      },
      {
        name: "Patnongon",
        barangays: [
          "Alvañiz", "Amparo", "Apgahan", "Aureliana", "Badiangan", 
          "Bernaldo A. Julagting", "Carit-an", "Cuyapiao", "Gella", "Igbarawan", 
          "Igbobon", "Igburi", "La Rioja", "Mabasa", "Macarina", "Magarang", "Magsaysay", 
          "Padang", "Pandanan", "Patlabawon", "Poblacion", "Quezon", "Salaguiawan", 
          "Samalague", "San Rafael", "Tamayoc", "Tigbalogo", "Tobias Fornier", 
          "Villa Crespo", "Villa Cruz", "Villa Elio", "Villa Flores", "Villa Laua-an", 
          "Villa Sal", "Villa Salomon", "Vista Alegre"
        ],
      },
      {
        name: "San Jose",
        barangays: [
          "Atabay", "Badiang", "Barangay 1 (Pob.)", "Barangay 2 (Pob.)", 
          "Barangay 3 (Pob.)", "Barangay 4 (Pob.)", "Barangay 5 (Pob.)", 
          "Barangay 6 (Pob.)", "Barangay 7 (Pob.)", "Barangay 8 (Pob.)", "Bariri", 
          "Bugarot", "Cansadan", "Durog", "Funda-Dalipe", "Igbonglo", "Inabasan", 
          "Madrangca", "Magcalon", "Malaiba", "Maybato Norte", "Maybato Sur", "Mojon", 
          "Pantao", "San Angel", "San Fernando", "San Pedro", "Supa"
        ],
      },
      {
        name: "San Remigio",
        barangays: [
          "Agricula", "Alegria", "Aningalan", "Atabay", "Bagumbayan", "Baladjay", 
          "Banbanan", "Barangbang", "Bawang", "Bugo", "Bulan-bulan", "Cabiawan", 
          "Cabunga-an", "Cadolonan", "Carawisan I", "Carawisan II", "Carmelo I", 
          "Carmelo II", "General Fullon", "General Luna", "Iguirindon", "Insubuan", 
          "La Union", "Lapak", "Lumpatan", "Magdalena", "Maragubdub", "Nagbangi I", 
          "Nagbangi II", "Nasuli", "Orquia", "Osorio I", "Osorio II", "Panpanan I", 
          "Panpanan II", "Poblacion", "Ramon Magsaysay", "Rizal", "San Rafael", 
          "Sinundolan", "Sumaray", "Trinidad", "Tubudan", "Vilvar", "Walker"
        ],
      },
      {
        name: "Sebaste",
        barangays: [
          "Abiera", "Aguila", "Alegre", "Aras-Asan", "Bacalan", "Callan", "Idio", 
          "Nauhon", "P. Javier", "Poblacion"
        ],
      },
      {
        name: "Sibalom",
        barangays: [
          "Alangan", "Bari", "Biga-a", "Bongbongan I", "Bongbongan II", "Bongsod", 
          "Bontol", "Bugnay", "Bulalacao", "Cabanbanan", "Cabariuan", "Cabladan", 
          "Cadoldolan", "Calo-oy", "Calog", "Catmon", "Catungan I", "Catungan II", 
          "Catungan III", "Catungan IV", "Cubay-Napultan", "Cubay-Sermon", 
          "District I (Pob.)", "District II (Pob.)", "District III (Pob.)", 
          "District IV (Pob.)", "Egaña", "Esperanza I", "Esperanza II", "Esperanza III", 
          "Igcococ", "Igdagmay", "Igdalaquit", "Iglanot", "Igpanolong", "Igparas", 
          "Igsuming", "Ilabas", "Imparayan", "Inabasan", "Indag-an", "Initan", 
          "Insarayan", "Lacaron", "Lagdo", "Lambayagan", "Luna", "Luyang", "Maasin", 
          "Mabini", "Millamena", "Mojon", "Nagdayao", "Nazareth", "Odiong", "Olaga", 
          "Pangpang", "Panlagangan", "Pantao", "Pasong", "Pis-Anan", "Rombang", 
          "Salvacion", "San Juan", "Sido", "Solong", "Tabongtabong", "Tig-Ohot", 
          "Tigbalua I", "Tigbalua II", "Tordesillas", "Tulatula", "Valentin Grasparil", 
          "Villafont", "Villahermosa", "Villar"
        ],
      },
      {
        name: "Tibiao",
        barangays: [
          "Alegre", "Amar", "Bandoja", "Castillo", "Esparagoza", "Importante", "La Paz", 
          "Malabor", "Martinez", "Natividad", "Pitac", "Poblacion", "Salazar", 
          "San Francisco Norte", "San Francisco Sur", "San Isidro", "Santa Ana", 
          "Santa Justa", "Santo Rosario", "Tigbaboy", "Tuno"
        ],
      },
      {
        name: "Tobias Fornier",
        barangays: [
          "Abaca", "Aras-Asan", "Arobo", "Atabay", "Atiotes", "Bagumbayan", "Balloscas", 
          "Balud", "Barasanan A", "Barasanan B", "Barasanan C", "Bariri", "Camandagan", 
          "Cato-ogan", "Danawan", "Diclum", "Fatima", "Gamad", "Igbalogo", "Igbangcal-A", 
          "Igbangcal-B", "Igbangcal-C", "Igcabuad", "Igcadac", "Igcado", "Igcalawagan", 
          "Igcapuyas", "Igcasicad", "Igdalaguit", "Igdanlog", "Igdurarog", "Igtugas", 
          "Lawigan", "Lindero", "Manaling", "Masayo", "Nagsubuan", "Nasuli-A", "Opsan", 
          "Paciencia", "Poblacion Norte", "Poblacion Sur", "Portillo", "Quezon", 
          "Salamague", "Santo Tomas", "Tacbuyan", "Tene", "Villaflor", "Ysulat"
        ],
      },
      {
        name: "Valderrama",
        barangays: [
          "Alon", "Bakiang", "Binanogan", "Borocboroc", "Bugnay", "Buluangan I", 
          "Buluangan II", "Bunsod", "Busog", "Cananghan", "Canipayan", "Cansilayan", 
          "Culyat", "Iglinab", "Igmasandig", "Lublub", "Manlacbo", "Pandanan", 
          "San Agustin", "Takas (Pob.)", "Tigmamale", "Ubos (Pob.)"
        ],
      },
    ],
  },
  {
    province: "Capiz",
    municipalities: [
      {
        name: "City of Roxas",
        barangays: [
          "Adlawan", "Bago", "Balijuagan", "Banica", "Barra", "Bato", "Baybay", "Bolo", 
          "Cabugao", "Cagay", "Cogon", "Culajao", "Culasi", "Dayao", "Dinginan", 
          "Dumolog", "Gabu-an", "Inzo Arnaldo Village", "Jumaguicjic", "Lanot", 
          "Lawa-an", "Libas", "Liong", "Loctugan", "Lonoy", "Milibili", "Mongpong", 
          "Olotayan", "Poblacion I", "Poblacion II", "Poblacion III", "Poblacion IV", 
          "Poblacion IX", "Poblacion V", "Poblacion VI", "Poblacion VII", 
          "Poblacion VIII", "Poblacion X", "Poblacion XI", "Punta Cogon", "Punta Tabuc", 
          "San Jose", "Sibaguan", "Talon", "Tanque", "Tanza", "Tiza"
        ],
      },
      {
        name: "Cuartero",
        barangays: [
          "Agcabugao", "Agdahon", "Agnaga", "Angub", "Balingasag", "Bito-on Ilawod", 
          "Bito-on Ilaya", "Bun-od", "Carataya", "Lunayan", "Mahabang Sapa", 
          "Mahunodhunod", "Maindang", "Mainit", "Malagab-i", "Nagba", "Poblacion Ilawod", 
          "Poblacion Ilaya", "Poblacion Takas", "Puti-an", "San Antonio", "Sinabsaban"
        ],
      },
      {
        name: "Dao",
        barangays: [
          "Aganan", "Agtambi", "Agtanguay", "Balucuan", "Bita", "Centro", "Daplas", 
          "Duyoc", "Ilas Sur", "Lacaron", "Malonoy", "Manhoy", "Mapulang Bato", 
          "Matagnop", "Nasunogan", "Poblacion Ilawod", "Poblacion Ilaya", "Quinabcaban", 
          "Quinayuya", "San Agustin"
        ],
      },
      {
        name: "Dumalag",
        barangays: [
          "Concepcion", "Consolacion", "Dolores", "Duran", "Poblacion", "San Agustin", 
          "San Jose", "San Martin", "San Miguel", "San Rafael", "San Roque", 
          "Santa Carmen", "Santa Cruz", "Santa Monica", "Santa Rita", "Santa Teresa", 
          "Santo Angel", "Santo Niño", "Santo Rosario"
        ],
      },
      {
        name: "Dumarao",
        barangays: [
          "Agbatuan", "Aglalana", "Aglanot", "Agsirab", "Alipasiawan", "Astorga", 
          "Bayog", "Bungsuan", "Calapawan", "Codingle", "Cubi", "Dacuton", "Dangula", 
          "Gibato", "Guinotos", "Jambad", "Janguslob", "Lawaan", "Malonoy", "Nagsulang", 
          "Ongol Ilawod", "Ongol Ilaya", "Poblacion Ilawod", "Poblacion Ilaya", 
          "Sagrada Familia", "Salcedo", "San Juan", "Sibariwan", "Tamulalod", "Taslan", 
          "Tina", "Tinaytayan", "Traciano"
        ],
      },
      {
        name: "Ivisan",
        barangays: [
          "Agmalobo", "Agustin Navarra", "Balaring", "Basiao", "Cabugao", "Cudian", 
          "Ilaya-Ivisan", "Malocloc Norte", "Malocloc Sur", "Matnog", "Mianay", "Ondoy", 
          "Poblacion Norte", "Poblacion Sur", "Santa Cruz"
        ],
      },
      {
        name: "Jamindan",
        barangays: [
          "Agambulong", "Agbun-od", "Agcagay", "Aglibacao", "Agloloway", "Bayebaye", 
          "Caridad", "Esperanza", "Fe", "Ganzon", "Guintas", "Igang", "Jaena Norte", 
          "Jaena Sur", "Jagnaya", "Lapaz", "Linambasan", "Lucero", "Maantol", "Masgrau", 
          "Milan", "Molet", "Pangabat", "Pangabuan", "Pasol-o", "Poblacion", "San Jose", 
          "San Juan", "San Vicente", "Santo Rosario"
        ],
      },
      {
        name: "Ma-Ayon",
        barangays: [
          "Aglimocon", "Alasaging", "Alayunan", "Balighot", "Batabat", "Bongbongan", 
          "Cabungahan", "Canapian", "Carataya", "Duluan", "East Villaflores", 
          "Fernandez", "Guinbi-alan", "Indayagan", "Jebaca", "Maalan", "Manayupit", 
          "New Guia", "Old Guia", "Palaguian", "Parallan", "Piña", "Poblacion Ilawod", 
          "Poblacion Ilaya", "Poblacion Tabuc", "Quevedo", "Quinabonglan", "Quinat-uyan", 
          "Salgan", "Tapulang", "Tuburan", "West Villaflores"
        ],
      },
      {
        name: "Mambusao",
        barangays: [
          "Atiplo", "Balat-an", "Balit", "Batiano", "Bating", "Bato Bato", "Baye", 
          "Bergante", "Bula", "Bunga", "Bungsi", "Burias", "Caidquid", "Cala-agus", 
          "Libo-o", "Manibad", "Maralag", "Najus-an", "Pangpang Norte", "Pangpang Sur", 
          "Pinay", "Poblacion Proper", "Poblacion Tabuc", "Sinondojan", "Tugas", 
          "Tumalalud"
        ],
      },
      {
        name: "Panay",
        barangays: [
          "Agbalo", "Agbanban", "Agojo", "Anhawon", "Bagacay", "Bago Chiquito", 
          "Bago Grande", "Bahit", "Bantique", "Bato", "Binangig", "Binantuan", "Bonga", 
          "Buntod", "Butacal", "Cabugao Este", "Cabugao Oeste", "Calapawan", "Calitan", 
          "Candual", "Cogon", "Daga", "Ilamnay", "Jamul-awon", "Lanipga", "Lat-Asan", 
          "Libon", "Linao", "Linateran", "Lomboy", "Lus-Onan", "Magubilan", "Navitas", 
          "Pawa", "Pili", "Poblacion Ilawod", "Poblacion Ilaya", "Poblacion Tabuc", 
          "Talasa", "Tanza Norte", "Tanza Sur", "Tico"
        ],
      },
      {
        name: "Panitan",
        barangays: [
          "Agbabadiang", "Agkilo", "Agloway", "Ambilay", "Bahit", "Balatucan", 
          "Banga-an", "Cabangahan", "Cabugao", "Cadio", "Cala-an", "Capagao", "Cogon", 
          "Conciencia", "Ensenagan", "Intampilan", "Pasugue", "Poblacion Ilawod", 
          "Poblacion Ilaya", "Quios", "Salocon", "Tabuc Norte", "Tabuc Sur", "Timpas", 
          "Tincupon", "Tinigban"
        ],
      },
      {
        name: "Pilar",
        barangays: [
          "Balogo", "Binaobawan", "Blasco", "Casanayan", "Cayus", "Dayhagan", "Dulangan", 
          "Monteflor", "Natividad", "Olalo", "Poblacion", "Rosario", "San Antonio", 
          "San Blas", "San Esteban", "San Fernando", "San Nicolas", "San Pedro", 
          "San Ramon", "San Silvestre", "Santa Fe", "Sinamongan", "Tabun-acan", "Yating"
        ],
      },
      {
        name: "Pontevedra",
        barangays: [
          "Agbanog", "Agdalipe", "Ameligan", "Bailan", "Banate", "Bantigue", 
          "Binuntucan", "Cabugao", "Gabuc", "Guba", "Hipona", "Ilawod (Pob.)", 
          "Ilaya (Pob.)", "Intungcan", "Jolongajog", "Lantangan", "Linampongan", 
          "Malag-it", "Manapao", "Rizal", "San Pedro", "Solo", "Sublangon", "Tabuc", 
          "Tacas", "Yatingan"
        ],
      },
      {
        name: "President Roxas",
        barangays: [
          "Aranguel", "Badiangon", "Bayuyan", "Cabugcabug", "Carmencita", "Cubay", 
          "Culilang", "Goce", "Hanglid", "Ibaca", "Madulano", "Manoling", "Marita", 
          "Pandan", "Pantalan Cabugcabug", "Pinamihagan", "Poblacion", "Pondol", 
          "Quiajo", "Sangkal", "Santo Niño", "Vizcaya"
        ],
      },
      {
        name: "Sapi-An",
        barangays: [
          "Agsilab", "Agtatacay Norte", "Agtatacay Sur", "Bilao", "Damayan", "Dapdapan", 
          "Lonoy", "Majanlud", "Maninang", "Poblacion"
        ],
      },
      {
        name: "Sigma",
        barangays: [
          "Acbo", "Amaga", "Balucuan", "Bangonbangon", "Capuyhan", "Cogon", "Dayhagon", 
          "Guintas", "Malapad Cogon", "Mangoso", "Mansacul", "Matangcong", "Matinabus", 
          "Mianay", "Oyong", "Pagbunitan", "Parian", "Pinamalatican", "Poblacion Norte", 
          "Poblacion Sur", "Tawog"
        ],
      },
      {
        name: "Tapaz",
        barangays: [
          "Abangay", "Acuña", "Agcococ", "Aglinab", "Aglupacan", "Agpalali", "Apero", 
          "Artuz", "Bag-Ong Barrio", "Bato-bato", "Buri", "Camburanan", "Candelaria", 
          "Carida", "Cristina", "Da-an Banwa", "Da-an Norte", "Da-an Sur", "Garcia", 
          "Gebio-an", "Hilwan", "Initan", "Katipunan", "Lagdungan", "Lahug", "Libertad", 
          "Mabini", "Maliao", "Malitbog", "Minan", "Nayawan", "Poblacion", "Rizal Norte", 
          "Rizal Sur", "Roosevelt", "Roxas", "Salong", "San Antonio", "San Francisco", 
          "San Jose", "San Julian", "San Miguel Ilawod", "San Miguel Ilaya", 
          "San Nicolas", "San Pedro", "San Roque", "San Vicente", "Santa Ana", 
          "Santa Petronila", "Senonod", "Siya", "Switch", "Tabon", "Tacayan", "Taft", 
          "Taganghin", "Taslan", "Wright"
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
          "Agsanayan", "Avila", "Bacjao", "Banban", "Cansilayan", "Dagsa-an", "Daragan", 
          "East Valencia", "Getulio", "Mabini", "Magsaysay", "Mclain", "Montpiller", 
          "Navalas", "Nazaret", "New Poblacion", "Old Poblacion", "Piña", "Rizal", 
          "Salvacion", "San Fernando", "San Isidro", "San Miguel", "San Nicolas", 
          "San Pedro", "San Roque", "Santo Rosario", "Sawang", "Supang", "Tacay", 
          "Taminla", "Tanag", "Tastasan", "Tinadtaran", "Umilig", "Zaldivar"
        ],
      },
      {
        name: "Jordan",
        barangays: [
          "Alaguisoc", "Balcon Maravilla", "Balcon Melliza", "Bugnay", "Buluangan", 
          "Espinosa", "Hoskyn", "Lawi", "Morobuan", "Poblacion", "Rizal", "San Miguel", 
          "Santa Teresa", "Sinapsapan"
        ],
      },
      {
        name: "Nueva Valencia",
        barangays: [
          "Cabalagnan", "Calaya", "Canhawan", "Concordia Sur", "Dolores", "Guiwanon", 
          "Igang", "Igdarapdap", "La Paz", "Lanipe", "Lucmayan", "Magamay", "Napandong", 
          "Oracon Sur", "Pandaraonan", "Panobolon", "Poblacion", "Salvacion", 
          "San Antonio", "San Roque", "Santo Domingo", "Tando"
        ],
      },
      {
        name: "San Lorenzo",
        barangays: [
          "Aguilar", "Cabano", "Cabungahan", "Constancia", "Gaban", "Igcawayan", 
          "M. Chavez", "San Enrique", "Sapal", "Sebario", "Suclaran", "Tamborong"
        ],
      },
      {
        name: "Sibunag",
        barangays: [
          "Alegria", "Ayangan", "Bubog", "Concordia Norte", "Dasal", "Inampologan", 
          "Maabay", "Millan", "Oracon Norte", "Ravina", "Sabang", "San Isidro", 
          "Sebaste", "Tanglad"
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
          "Adcadarao", "Agbobolo", "Badiangan", "Barrido", "Bato Biasong", "Bay-ang", 
          "Bucana Bunglas", "Central", "Culasi", "Lanjagan", "Luca", "Malayu-an", 
          "Mangorocoro", "Nasidman", "Pantalan Nabaye", "Pantalan Navarro", "Pedada", 
          "Pili", "Pinantan Diel", "Pinantan Elizalde", "Pinay Espinosa", "Poblacion", 
          "Progreso", "Puente Bunglas", "Punta Buri", "Rojas", "San Antonio", 
          "Santo Rosario", "Silagon", "Tagubanhan", "Taguhangin", "Tanduyan", "Tipacla", 
          "Tubogan"
        ],
      },
      {
        name: "Alimodian",
        barangays: [
          "Abang-abang", "Agsing", "Atabay", "Ba-ong", "Bagsakan", "Baguingin-Lanot", 
          "Bagumbayan-Ilajas", "Balabago", "Ban-ag", "Bancal", "Binalud", "Bugang", 
          "Buhay", "Bulod", "Cabacanan Proper", "Cabacanan Rizal", "Cagay", "Coline", 
          "Coline-Dalag", "Cunsad", "Cuyad", "Dalid", "Dao", "Gines", "Ginomoy", 
          "Ingwan", "Laylayan", "Lico", "Luan-luan", "Malamboy-Bondolan", "Malamhay", 
          "Mambawi", "Manasa", "Manduyog", "Pajo", "Pianda-an Norte", "Pianda-an Sur", 
          "Poblacion", "Punong", "Quinaspan", "Sinamay", "Sulong", "Taban-Manguining", 
          "Tabug", "Tarug", "Tugaslon", "Ubodan", "Ugbo", "Ulay-Bugang", "Ulay-Hinablan", 
          "Umingan"
        ],
      },
      {
        name: "Anilao",
        barangays: [
          "Agbatuan", "Badiang", "Balabag", "Balunos", "Cag-an", "Camiros", "Dangula-an", 
          "Guipis", "Manganese", "Medina", "Mostro", "Palaypay", "Pantalan", "Poblacion", 
          "Sambag Culob", "San Carlos", "San Juan Crisostomo", "Santa Rita", 
          "Santo Rosario", "Serallo", "Vista Alegre"
        ],
      },
      {
        name: "Badiangan",
        barangays: [
          "Agusipan", "Astorga", "Bingauan", "Bita-oyan", "Botong", "Budiaue", 
          "Cabanga-an", "Cabayogan", "Calansanan", "Catubig", "Guinawahan", "Ilongbukid", 
          "Indorohan", "Iniligan", "Latawan", "Linayuan", "Mainguit", "Malublub", 
          "Manaolan", "Mapili Grande", "Mapili Sanjo", "Odiongan", "Poblacion", 
          "San Julian", "Sariri", "Sianon", "Sinuagan", "Talaba", "Tamocol", "Teneclan", 
          "Tina"
        ],
      },
      {
        name: "Balasan",
        barangays: [
          "Aranjuez", "Bacolod", "Balanti-an", "Batuan", "Cabalic", "Camambugan", 
          "Dolores", "Gimamanay", "Ipil", "Kinalkalan", "Lawis", "Malapoc", 
          "Mamhut Norte", "Mamhut Sur", "Maya", "Pani-an", "Poblacion Norte", 
          "Poblacion Sur", "Quiasan", "Salong", "Salvacion", "Tingui-an", "Zaragosa"
        ],
      },
      {
        name: "Banate",
        barangays: [
          "Alacaygan", "Bariga", "Belen", "Bobon", "Bularan", "Carmelo", "De La Paz", 
          "Dugwakan", "Fuentes*", "Juanico", "Libertad", "Magdalo", "Managopaya", 
          "Merced", "Poblacion", "San Salvador", "Talokgangan", "Zona Sur"
        ],
      },
      {
        name: "Barotac Nuevo",
        barangays: [
          "Acuit", "Agcuyawan Calsada", "Agcuyawan Pulo", "Bagongbong", "Baras", 
          "Bungca", "Cabilauan", "Cruz", "Guintas", "Igbong", "Ilaud Poblacion", 
          "Ilaya Poblacion", "Jalaud", "Lagubang", "Lanas", "Lico-an", "Linao", "Monpon", 
          "Palaciawan", "Patag", "Salihid", "So-ol", "Sohoton", "Tabuc-Suba", "Tabucan", 
          "Talisay", "Tinorian", "Tiwi", "Tubungan"
        ],
      },
      {
        name: "Barotac Viejo",
        barangays: [
          "Bugnay", "California", "De la Peña", "Del Pilar", "General Luna", 
          "La Fortuna", "Lipata", "Natividad", "Nueva Invencion", "Nueva Sevilla", 
          "Poblacion", "Puerto Princesa", "Rizal", "San Antonio", "San Fernando", 
          "San Francisco", "San Geronimo", "San Juan", "San Lucas", "San Miguel", 
          "San Roque", "Santiago", "Santo Domingo", "Santo Tomas", "Ugasan", 
          "Vista Alegre"
        ],
      },
      {
        name: "Batad",
        barangays: [
          "Alapasco", "Alinsolong", "Banban", "Batad Viejo", "Binon-an", "Bolhog", 
          "Bulak Norte", "Bulak Sur", "Cabagohan", "Calangag", "Caw-i", "Drancalan", 
          "Embarcadero", "Hamod", "Malico", "Nangka", "Pasayan", "Poblacion", 
          "Quiazan Florete", "Quiazan Lopez", "Salong", "Santa Ana", "Tanao", "Tapi-an"
        ],
      },
      {
        name: "Bingawan",
        barangays: [
          "Agba-o", "Alabidhan", "Bulabog", "Cairohan", "Guinhulacan", "Inamyungan", 
          "Malitbog Ilawod", "Malitbog Ilaya", "Ngingi-an", "Poblacion", "Quinangyana", 
          "Quinar-Upan", "Tapacon", "Tubod"
        ],
      },
      {
        name: "Cabatuan",
        barangays: [
          "Acao", "Amerang", "Amurao", "Anuang", "Ayaman", "Ayong", "Bacan", "Balabag", 
          "Baluyan", "Banguit", "Bulay", "Cadoldolan", "Cagban", "Calawagan", "Calayo", 
          "Duyanduyan", "Gaub", "Gines Interior", "Gines Patag", "Guibuangan Tigbauan", 
          "Inabasan", "Inaca", "Inaladan", "Ingas", "Ito Norte", "Ito Sur", 
          "Janipaan Central", "Janipaan Este", "Janipaan Oeste", "Janipaan Olo", 
          "Jelicuon Lusaya", "Jelicuon Montinola", "Lag-an", "Leong", "Lutac", "Manguna", 
          "Maraguit", "Morubuan", "Pacatin", "Pagotpot", "Pamul-Ogan", 
          "Pamuringao Garrido", "Pamuringao Proper", "Pungtod", "Puyas", "Salacay", 
          "Sulanga", "Tabucan", "Tacdangan", "Talanghauan", "Tigbauan Road", "Tinio-an", 
          "Tiring", "Tupol Central", "Tupol Este", "Tupol Oeste", "Tuy-an", 
          "Zone I Pob.", "Zone II Pob.", "Zone III Pob.", "Zone IV Pob.", "Zone IX Pob.", 
          "Zone V Pob.", "Zone VI Pob.", "Zone VII Pob.", "Zone VIII Pob.", 
          "Zone X Pob.", "Zone XI Pob."
        ],
      },
      {
        name: "Calinog",
        barangays: [
          "Agcalaga", "Aglibacao", "Aglonok", "Alibunan", "Badlan Grande", 
          "Badlan Pequeño", "Badu", "Baje San Julian", "Balaticon", "Banban Grande", 
          "Banban Pequeño", "Barrio Calinog", "Binolosan Grande", "Binolosan Pequeño", 
          "Cabagiao", "Cabugao", "Cahigon", "Camalongo", "Canabajan", "Caratagan", 
          "Carvasana", "Dalid", "Datagan", "Gama Grande", "Gama Pequeño", "Garangan", 
          "Guinbonyugan", "Guiso", "Hilwan", "Impalidan", "Ipil", "Jamin-ay", "Lampaya", 
          "Libot", "Lonoy", "Malag-it", "Malaguinabot", "Malapawe", "Malitbog Centro", 
          "Mambiranan", "Manaripay", "Marandig", "Masaroy", "Maspasan", "Nalbugan", 
          "Owak", "Poblacion Centro", "Poblacion Delgado", "Poblacion Ilaya", 
          "Poblacion Rizal Ilaud", "San Nicolas", "Simsiman", "Supanga", "Tabucan", 
          "Tahing", "Tibiao", "Tigbayog", "Toyungan", "Ulayan"
        ],
      },
      {
        name: "Carles",
        barangays: [
          "Abong", "Alipata", "Asluman", "Bancal", "Barangcalan", "Barosbos", 
          "Binuluangan", "Bito-on", "Bolo", "Buaya", "Buenavista", "Cabilao Grande", 
          "Cabilao Pequeño", "Cabuguana", "Cawayan", "Dayhagan", "Gabi", "Granada", 
          "Guinticgan", "Isla De Cana", "Lantangan", "Manlot", "Nalumsan", "Pantalan", 
          "Poblacion", "Punta", "Punta Batuanan", "San Fernando", "Tabugon", 
          "Talingting", "Tarong", "Tinigban", "Tupaz"
        ],
      },
      {
        name: "City of Passi",
        barangays: [
          "Agdahon", "Agdayao", "Aglalana", "Agtabo", "Agtambo", "Alimono", "Arac", 
          "Ayuyan", "Bacuranan", "Bagacay", "Batu", "Bayan", "Bitaogan", "Buenavista", 
          "Buyo", "Cabunga", "Cadilang", "Cairohan", "Dalicanan", "Gegachac", "Gemat-y", 
          "Gemumua-agahon", "Gines Viejo", "Imbang Grande", "Jaguimitan", "Libo-o", 
          "Maasin", "Magdungao", "Malag-it Grande", "Malag-it Pequeño", 
          "Mambiranan Grande", "Mambiranan Pequeño", "Man-it", "Mantulang", "Mulapula", 
          "Nueva Union", "Pagaypay", "Pangi", "Poblacion Ilawod", "Poblacion Ilaya", 
          "Punong", "Quinagaringan Grande", "Quinagaringan Pequeño", "Sablogon", 
          "Salngan", "Santo Tomas", "Sarapan", "Tagubong", "Talongonan", "Tubod", 
          "Tuburan"
        ],
      },
      {
        name: "Concepcion",
        barangays: [
          "Aglosong", "Agnaga", "Bacjawan Norte", "Bacjawan Sur", "Bagongon", "Batiti", 
          "Botlog", "Calamigan", "Dungon", "Igbon", "Jamul-Awon", "Lo-ong", "Macalbang", 
          "Macatunao", "Malangabang", "Maliogliog", "Nipa", "Niño", "Plandico", 
          "Poblacion", "Polopina", "Salvacion", "Talotu-an", "Tambaliza", "Tamis-ac"
        ],
      },
      {
        name: "Dingle",
        barangays: [
          "Abangay", "Agsalanan", "Agtatacay", "Alegria", "Bongloy", "Buenavista", 
          "Caguyuman", "Calicuang", "Camambugan", "Dawis", "Ginalinan Nuevo", 
          "Ginalinan Viejo", "Gutao", "Ilajas", "Libo-o", "Licu-an", "Lincud", 
          "Matangharon", "Moroboro", "Namatay", "Nazuni", "Pandan", "Poblacion", 
          "Potolan", "San Jose", "San Matias", "Siniba-an", "Tabugon", "Tambunac", 
          "Tanghawan", "Tiguib", "Tinocuan", "Tulatula-an"
        ],
      },
      {
        name: "Dueñas",
        barangays: [
          "Agutayan", "Angare", "Anjawan", "Baac", "Bagongbong", "Balangigan", 
          "Balingasag", "Banugan", "Batuan", "Bita", "Buenavista", "Bugtongan", 
          "Cabudian", "Calaca-an", "Calang", "Calawinan", "Capaycapay", "Capuling", 
          "Catig", "Dila-an", "Fundacion", "Inadlawan", "Jagdong", "Jaguimit", "Lacadon", 
          "Luag", "Malusgod", "Maribuyong", "Minanga", "Monpon", "Navalas", "Pader", 
          "Pandan", "Poblacion A", "Poblacion B", "Poblacion C", "Poblacion D", 
          "Ponong Grande", "Ponong Pequeño", "Purog", "Romblon", "San Isidro", 
          "Santo Niño", "Sawe", "Taminla", "Tinocuan", "Tipolo"
        ],
      },
      {
        name: "Dumangas",
        barangays: [
          "Aurora-del Pilar (Pob.)", "Bacay", "Bacong", "Balabag", "Balud", "Bantud", 
          "Bantud Fabrica", "Baras", "Barasan", "Basa-Mabini Bonifacio (Pob.)", 
          "Bolilao", "Buenaflor Embarkadero (Pob.)", "Burgos-Regidor (Pob.)", "Calao", 
          "Cali", "Cansilayan", "Capaliz", "Cayos", "Compayan", "Dacutan", "Ermita", 
          "Ilaya 1st", "Ilaya 2nd", "Ilaya 3rd", "Jardin", "Lacturan", 
          "Lopez Jaena - Rizal (Pob.)", "Managuit", "Maquina", "Nanding Lopez", 
          "Pagdugue", "Paloc Bigque", "Paloc Sool", "Patlad", "Pd Monfort North", 
          "Pd Monfort South", "Pulao", "Rosario", "Sapao", "Sulangan", "Tabucan", 
          "Talusan", "Tambobo", "Tamboilan", "Victorias"
        ],
      },
      {
        name: "Estancia",
        barangays: [
          "Bayas", "Bayuyan", "Botongon", "Bulaqueña", "Calapdan", "Cano-an", 
          "Daan Banua", "Daculan", "Gogo", "Jolog", "Loguingot", "Lonoy", "Lumbia", 
          "Malbog", "Manipulon", "Pa-on", "Poblacion Zone 1", "Poblacion Zone II", 
          "Poblacion Zone III", "San Roque", "Santa Ana", "Tabu-an", "Tacbuyan", "Tanza", 
          "Villa Pani-an"
        ],
      },
      {
        name: "Guimbal",
        barangays: [
          "Anono-o", "Bacong", "Bagumbayan Pob.", "Balantad-Carlos Fruto (Pob.)", 
          "Baras", "Binanua-an", "Bongol San Miguel", "Bongol San Vicente", "Bulad", 
          "Buluangan", "Burgos-Gengos (Pob.)", "Cabasi", "Cabubugan", "Calampitao", 
          "Camangahan", "Generosa-Cristobal Colon (Pob.)", "Gerona-Gimeno (Pob.)", 
          "Girado-Magsaysay (Pob.)", "Gotera (Pob.)", "Igcocolo", "Iyasan", 
          "Libo-on Gonzales (Pob.)", "Lubacan", "Nahapay", "Nalundan", "Nanga", 
          "Nito-an Lupsag", "Particion", "Pescadores (Pob.)", "Rizal-Tuguisan (Pob.)", 
          "Santa Rosa-Laguna", "Sipitan-Badiang", "Torreblanca-Blumentritt (Pob.)"
        ],
      },
      {
        name: "Igbaras",
        barangays: [
          "Alameda", "Amorogtong", "Anilawan", "Bagacay", "Bagacayan", "Bagay", 
          "Balibagan", "Barangay 1 Poblacion", "Barangay 2 Poblacion", 
          "Barangay 3 Poblacion", "Barangay 4 Poblacion", "Barangay 5 Poblacion", 
          "Barangay 6 Poblacion", "Barasan", "Binanua-an", "Boclod", "Buenavista", 
          "Buga", "Bugnay", "Calampitao", "Cale", "Catiringan", "Corucuan", "Igcabugao", 
          "Igpigus", "Igtalongon", "Indaluyon", "Jovellar", "Kinagdan", "Lab-on", 
          "Lacay Dol-Dol", "Lumangan", "Lutungan", "Mantangon", "Mulangan", "Pasong", 
          "Passi", "Pinaopawan", "Riro-an", "San Ambrosio", "Santa Barbara", "Signe", 
          "Tabiac", "Talayatay", "Taytay", "Tigbanaba"
        ],
      },
      {
        name: "Janiuay",
        barangays: [
          "Abangay", "Agcarope", "Aglobong", "Aguingay", "Anhawan", 
          "Aquino Nobleza East (Pob.)", "Aquino Nobleza West (Pob.)", "Atimonan", 
          "Balanac", "Barasalon", "Bongol", "Cabantog", "Calmay", "Canawili", 
          "Canawillian", "Capt. A. Tirador (Pob.)", "Caranas", "Caraudan", "Carigangan", 
          "Concepcion Pob.", "Crispin Salazar North (Pob.)", 
          "Crispin Salazar South (Pob.)", "Cunsad", "Dabong", "Damires", "Damo-ong", 
          "Danao", "Don T. Lutero Center (Pob.)", "Don T. Lutero East (Pob.)", 
          "Don T. Lutero West Pob.", "Gines", "Golgota (Pob.)", "Guadalupe", "Jibolo", 
          "Kuyot", "Locsin (Pob.)", "Madong", "Manacabac", "Mangil", "Matag-ub", 
          "Monte-Magapa", "Pangilihan", "Panuran", "Pararinga", "Patong-patong", 
          "Quipot", "R. Armada (Pob.)", "S. M. Villa (Pob.)", "San Julian (Pob.)", 
          "San Pedro (Pob.)", "Santa Rita (Pob.)", "Santo Tomas", "Sarawag", "Tambal", 
          "Tamu-an", "Tiringanan", "Tolarucan", "Tuburan", "Ubian", "Yabon"
        ],
      },
      {
        name: "Lambunao",
        barangays: [
          "Agsirab", "Agtuman", "Alugmawa", "Badiangan", "Balagiao", "Banban", "Bansag", 
          "Bayuco", "Binaba-an Armada", "Binaba-an Labayno", "Binaba-an Limoso", 
          "Binaba-an Portigo", "Binaba-an Tirador", "Bogongbong", "Bonbon", "Bontoc", 
          "Buri", "Burirao", "Buwang", "Cabatangan", "Cabugao", "Cabunlawan", 
          "Caguisanan", "Caloy-Ahan", "Caninguan", "Capangyan", "Cayan Este", 
          "Cayan Oeste", "Corot-on", "Coto", "Cubay", "Cunarum", "Daanbanwa", "Gines", 
          "Hipgos", "Jayubo", "Jorog", "Lanot Grande", "Lanot Pequeño", "Legayada", 
          "Lumanay", "Madarag", "Magbato", "Maite Grande", "Maite Pequeño", "Malag-it", 
          "Manaulan", "Maribong", "Marong", "Misi", "Natividad", "Pajo", "Pandan", 
          "Panuran", "Pasig", "Patag", "Poblacion Ilawod", "Poblacion Ilaya", "Poong", 
          "Pughanan", "Pungsod", "Quiling", "Sagcup", "San Gregorio", "Sibacungan", 
          "Sibaguan", "Simsiman", "Supoc", "Tampucao", "Tranghawan", "Tubungan", 
          "Tuburan", "Walang"
        ],
      },
      {
        name: "Leganes",
        barangays: [
          "Bigke", "Buntatala", "Cagamutan Norte", "Cagamutan Sur", "Calaboa", 
          "Camangay", "Cari Mayor", "Cari Minor", "Gua-an", "Guihaman", "Guinobatan", 
          "Guintas", "Lapayon", "M.V. Hechanova", "Nabitasan", "Napnud", "Poblacion", 
          "San Vicente"
        ],
      },
      {
        name: "Lemery",
        barangays: [
          "Agpipili", "Alcantara", "Almeñana", "Anabo", "Bankal", "Buenavista", 
          "Cabantohan", "Capiñahan", "Dalipe", "Dapdapan", "Gerongan", "Imbaulan", 
          "Layogbato", "Marapal", "Milan", "Nagsulang", "Nasapahan", "Omio", "Pacuan", 
          "Poblacion NW Zone", "Poblacion SE Zone", "Pontoc", "San Antonio", "San Diego", 
          "San Jose Moto", "Sepanton", "Sincua", "Tabunan", "Tugas", "Velasco", "Yawyawan"
        ],
      },
      {
        name: "Leon",
        barangays: [
          "Agboy Norte", "Agboy Sur", "Agta", "Ambulong", "Anonang", "Apian", "Avanzada", 
          "Awis", "Ayabang", "Ayubo", "Bacolod", "Baje", "Banagan", "Barangbang", 
          "Barasan", "Bayag Norte", "Bayag Sur", "Binolbog", "Biri Norte", "Biri Sur", 
          "Bobon", "Bucari", "Buenavista", "Buga", "Bulad", "Bulwang", "Cabolo-an", 
          "Cabunga-an", "Cabutongan", "Cagay", "Camandag", "Camando", "Cananaman", 
          "Capt. Fernando", "Carara-an", "Carolina", "Cawilihan", "Coyugan Norte", 
          "Coyugan Sur", "Danao", "Dorog", "Dusacan", "Gines", "Gumboc", "Igcadios", 
          "Ingay", "Isian Norte", "Isian Victoria", "Jamog Gines", "Lampaya", "Lanag", 
          "Lang-og", "Ligtos", "Lonoc", "Magcapay", "Maliao", "Malublub", "Manampunay", 
          "Marirong", "Mina", "Mocol", "Nagbangi", "Nalbang", "Odong-odong", "Oluangan", 
          "Omambong", "Paga", "Pandan", "Panginman", "Paoy", "Pepe", "Poblacion", 
          "Salngan", "Samlague", "Siol Norte", "Siol Sur", "Tacuyong Norte", 
          "Tacuyong Sur", "Tagsing", "Talacuan", "Ticuan", "Tina-an Norte", 
          "Tina-an Sur", "Tu-og", "Tunguan"
        ],
      },
      {
        name: "Maasin",
        barangays: [
          "AGROCEL Pob.", "Abay", "Abilay", "Amerang", "Bagacay East", "Bagacay West", 
          "Bolo", "Bug-ot", "Bulay", "Buntalan", "Burak", "Cabangcalan", "Cabatac", 
          "Caigon", "Cananghan", "Canawili", "DELCAR Pob.", "Dagami", "Daja", "Dalusan", 
          "Inabasan", "Layog", "Linab", "Liñagan Calsada", "Liñagan Tacas", "MARI Pob.", 
          "Magsaysay", "Mandog", "Miapa", "Nagba", "Nasaka", "Naslo-Bucao", "Nasuli", 
          "Panalian", "Piandaan East", "Piandaan West", "Pispis", "Punong", "Santa Rita", 
          "Sinubsuban", "Siwalo", "Subog", "THTP Pob.", "Tigbauan", "Trangka", "Tubang", 
          "Tulahong", "Tuy-an East", "Tuy-an West", "Ubian"
        ],
      },
      {
        name: "Miagao",
        barangays: [
          "Agdum", "Aguiauan", "Alimodias", "Awang", "Bacauan", "Bacolod", "Bagumbayan", 
          "Banbanan", "Banga", "Bangladan", "Banuyao", "Baraclayan", "Bariri", 
          "Baybay Norte (Pob.)", "Baybay Sur (Pob.)", "Belen", "Bolho (Pob.)", 
          "Bolocaue", "Buenavista Norte", "Buenavista Sur", "Bugtong Lumangan", 
          "Bugtong Naulid", "Cabalaunan", "Cabangcalan", "Cabunotan", "Cadoldolan", 
          "Cagbang", "Caitib", "Calagtangan", "Calampitao", "Cavite", "Cawayanan", 
          "Cubay", "Cubay Ubos", "Dalije", "Damilisan", "Dawog", "Diday", "Dingle", 
          "Durog", "Frantilla", "Fundacion", "Gines", "Guibongan", "Igbita", "Igbugo", 
          "Igcabidio", "Igcabito-on", "Igcatambor", "Igdalaquit", "Igdulaca", "Igpajo", 
          "Igpandan", "Igpuro", "Igpuro-Bariri", "Igsoligue", "Igtuba", "Ilog-ilog", 
          "Indag-an", "Kirayan Norte", "Kirayan Sur", "Kirayan Tacas", "La Consolacion", 
          "Lacadon", "Lanutan", "Lumangan", "Mabayan", "Maduyo", "Malagyan", "Mambatad", 
          "Maninila", "Maricolcol", "Maringyan", "Mat-y (Pob.)", "Matalngon", "Naclub", 
          "Nam-o Norte", "Nam-o Sur", "Narat-an", "Narorogan", "Naulid", "Olango", 
          "Ongyod", "Onop", "Oya-oy", "Oyungan", "Palaca", "Paro-on", "Potrido", 
          "Pudpud", "Pungtod Monteclaro", "Pungtod Naulid", "Sag-on", "San Fernando", 
          "San Jose", "San Rafael", "Sapa", "Saring", "Sibucao", "Taal", "Tabunacan", 
          "Tacas (Pob.)", "Tambong", "Tan-agan", "Tatoy", "Ticdalan", "Tig-Apog-Apog", 
          "Tig-amaga", "Tigbagacay", "Tiglawa", "Tigmalapad", "Tigmarabo", "To-og", 
          "Tugura-ao", "Tumagboc", "Ubos Ilawod (Pob.)", "Ubos Ilaya (Pob.)", "Valencia", 
          "Wayang"
        ],
      },
      {
        name: "Mina",
        barangays: [
          "Abat", "Agmanaphao", "Amiroy", "Badiangan", "Bangac", "Cabalabaguan", 
          "Capul-an", "Dala", "Guibuangan", "Janipa-an East", "Janipa-an West", 
          "Mina East (Pob.)", "Mina West (Pob.)", "Nasirum", "Naumuan", "Singay", 
          "Talibong Grande", "Talibong Pequeño", "Tipolo", "Tolarucan", "Tumay", "Yugot"
        ],
      },
      {
        name: "New Lucena",
        barangays: [
          "Baclayan", "Badiang", "Balabag", "Bilidan", "Bita-og Gaja", "Bololacao", 
          "Burot", "Cabilauan", "Cabugao", "Cagban", "Calumbuyan", "Damires", "Dawis", 
          "General Delgado", "Guinobatan", "Janipa-an Oeste", "Jelicuon Este", 
          "Jelicuon Oeste", "Pasil", "Poblacion", "Wari-wari"
        ],
      },
      {
        name: "Oton",
        barangays: [
          "Abilay Norte", "Abilay Sur", "Alegre", "Batuan Ilaud", "Batuan Ilaya", 
          "Bita Norte", "Bita Sur", "Botong", "Buray", "Cabanbanan", "Caboloan Norte", 
          "Caboloan Sur", "Cadinglian", "Cagbang", "Calam-isan", "Galang", "Lambuyao", 
          "Mambog", "Pakiad", "Poblacion East", "Poblacion North", "Poblacion South", 
          "Poblacion West", "Polo Maestra Bita", "Rizal", "Salngan", "Sambaludan", 
          "San Antonio", "San Nicolas", "Santa Clara", "Santa Monica", "Santa Rita", 
          "Tagbac Norte", "Tagbac Sur", "Trapiche", "Tuburan", "Turog-Turog"
        ],
      },
      {
        name: "Pavia",
        barangays: [
          "Aganan", "Amparo", "Anilao", "Balabag", "Cabugao Norte", "Cabugao Sur", 
          "Jibao-an", "Mali-ao", "Pagsanga-an", "Pal-agon", "Pandac", "Purok I (Pob.)", 
          "Purok II (Pob.)", "Purok III (Pob.)", "Purok IV (Pob.)", "Tigum", "Ungka I", 
          "Ungka II"
        ],
      },
      {
        name: "Pototan",
        barangays: [
          "Abangay", "Amamaros", "Bagacay", "Barasan", "Batuan", "Bongco", 
          "Cahaguichican", "Callan", "Cansilayan", "Casalsagan", "Cato-ogan", "Cau-ayan", 
          "Culob", "Danao", "Dapitan", "Dawis", "Dongsol", "Fernando Parcon Ward (Pob.)", 
          "Fundacion", "Guibuangan", "Guinacas", "Igang", "Intaluan", "Iwa Ilaud", 
          "Iwa Ilaya", "Jamabalud", "Jebioc", "Lay-Ahan", "Lopez Jaena Ward (Pob.)", 
          "Lumbo", "Macatol", "Malusgod", "Nabitasan", "Naga", "Nanga", "Naslo", "Pajo", 
          "Palanguia", "Pitogo", "Polot-an", "Primitivo Ledesma Ward (Pob.)", "Purog", 
          "Rumbang", "San Jose Ward (Pob.)", "Sinuagan", "Tuburan", "Tumcon Ilaud", 
          "Tumcon Ilaya", "Ubang", "Zarrague"
        ],
      },
      {
        name: "San Dionisio",
        barangays: [
          "Agdaliran", "Amayong", "Bagacay", "Batuan", "Bondulan", "Boroñgon", "Canas", 
          "Capinang", "Cubay", "Cudionan", "Dugman", "Hacienda Conchita", "Madanlog", 
          "Mandu-awak", "Moto", "Naborot", "Nipa", "Odiongan", "Pangi", "Pase", 
          "Poblacion", "San Nicolas", "Santol", "Siempreviva", "Sua", "Talo-ato", 
          "Tamangi", "Tiabas", "Tuble"
        ],
      },
      {
        name: "San Enrique",
        barangays: [
          "Abaca", "Asisig", "Bantayan", "Braulan", "Cabugao Nuevo", "Cabugao Viejo", 
          "Camiri", "Catan-Agan", "Compo", "Cubay", "Dacal", "Dumiles", "Garita", 
          "Gines Nuevo", "Imbang Pequeño", "Imbesad-an", "Iprog", "Lip-ac", "Madarag", 
          "Mapili", "Paga", "Palje", "Poblacion Ilawod", "Poblacion Ilaya", "Quinolpan", 
          "Rumagayray", "San Antonio", "Tambunac"
        ],
      },
      {
        name: "San Joaquin",
        barangays: [
          "Amboyu-an", "Andres Bonifacio", "Antalon", "Bad-as", "Bagumbayan", "Balabago", 
          "Baybay", "Bayunan", "Bolbogan", "Bonga", "Bucaya", "Bulho", "Cadluman", 
          "Cadoldolan", "Camaba-an", "Camia", "Cata-an", "Crossing Dapuyan", "Cubay", 
          "Cumarascas", "Dacdacanan", "Danawan", "Doldol", "Dongoc", "Escalantera", 
          "Ginot-an", "Guibongan Bayunan", "Huna", "Igbaje", "Igbangcal", "Igbinangon", 
          "Igburi", "Igcabutong", "Igcadlum", "Igcaphang", "Igcaratong", "Igcondao", 
          "Igcores", "Igdagmay", "Igdomingding", "Iglilico", "Igpayong", "Jawod", 
          "Langca", "Languanan", "Lawigan", "Lomboy", "Lomboyan", "Lopez Vito", 
          "Mabini Norte", "Mabini Sur", "Manhara", "Maninila", "Masagud", "Matambog", 
          "Mayunoc", "Montinola", "Nadsadan", "Nagquirisan", "Nagsipit", "New Gumawan", 
          "Panatan", "Pitogo", "Purok 1 (Pob.)", "Purok 2 (Pob.)", "Purok 3 (Pob.)", 
          "Purok 4 (Pob.)", "Purok 5 (Pob.)", "Qui-anan", "Roma", "San Luis", 
          "San Mateo Norte", "San Mateo Sur", "Santa Rita", "Santiago", "Sinogbuhan", 
          "Siwaragan", "Talagutac", "Tapikan", "Taslan", "Tiglawa", "Tiolas", "To-og", 
          "Torocadan", "Ulay"
        ],
      },
      {
        name: "San Miguel",
        barangays: [
          "Bgy. 1 Pob.", "Bgy. 10", "Bgy. 11 Pob.", "Bgy. 12 Pob.", "Bgy. 13 Pob.", 
          "Bgy. 14 Pob.", "Bgy. 15 Pob.", "Bgy. 16 Pob.", "Bgy. 2 Pob.", "Bgy. 3 Pob.", 
          "Bgy. 4 Pob.", "Bgy. 5 Pob.", "Bgy. 6 Pob.", "Bgy. 7 Pob.", "Bgy. 8 Pob.", 
          "Bgy. 9 Pob.", "Consolacion", "Igtambo", "San Antonio", "San Jose", 
          "Santa Cruz", "Santa Teresa", "Santo Angel", "Santo Niño"
        ],
      },
      {
        name: "San Rafael",
        barangays: [
          "Aripdip", "Bagacay", "Calaigang", "Ilongbukid", "Poblacion", "Poscolon", 
          "San Andres", "San Dionisio", "San Florentino"
        ],
      },
      {
        name: "Santa Barbara",
        barangays: [
          "Agusipan", "Agutayan", "Bagumbayan", "Balabag", "Balibagan Este", 
          "Balibagan Oeste", "Ban-ag", "Bantay", "Barangay Zone I (Pob.)", 
          "Barangay Zone II (Pob.)", "Barangay Zone III (Pob.)", 
          "Barangay Zone IV (Pob.)", "Barangay Zone V (Pob.)", "Barangay Zone VI (Pob.)", 
          "Barasan Este", "Barasan Oeste", "Binangkilan", "Bitaog-Taytay", "Bolong Este", 
          "Bolong Oeste", "Buayahon", "Buyo", "Cabugao Norte", "Cabugao Sur", 
          "Cadagmayan Norte", "Cadagmayan Sur", "Cafe", "Calaboa Este", "Calaboa Oeste", 
          "Camambugan", "Canipayan", "Conaynay", "Daga", "Dalid", "Duyanduyan", 
          "Gen. Martin T. Delgado", "Guno", "Inangayan", "Jibao-an", "Lacadon", "Lanag", 
          "Lupa", "Magancina", "Malawog", "Mambuyo", "Manhayang", "Miraga-Guibuangan", 
          "Nasugban", "Omambog", "Pal-Agon", "Pungsod", "San Sebastian", "Sangcate", 
          "Tagsing", "Talanghauan", "Talongadian", "Tigtig", "Tuburan", "Tugas", "Tungay"
        ],
      },
      {
        name: "Sara",
        barangays: [
          "Aguirre", "Aldeguer", "Alibayog", "Anoring", "Apelo", "Apologista", "Aposaga", 
          "Arante", "Ardemil", "Aspera", "Aswe-Pabriaga", "Bagaygay", "Bakabak", 
          "Batitao", "Bato", "Castor", "Crespo", "Del Castillo", "Devera", "Domingo", 
          "Ferraris", "Gildore", "Improgo", "Juaneza", "Labigan", "Lanciola", "Latawan", 
          "Malapaya", "Muyco", "Padios", "Pasig", "Poblacion Ilawod", "Poblacion Ilaya", 
          "Poblacion Market", "Posadas", "Preciosa", "Salcedo", "San Luis", "Tady", 
          "Tentay", "Villahermosa", "Zerrudo"
        ],
      },
      {
        name: "Tigbauan",
        barangays: [
          "Alupidian", "Atabayan", "Bagacay", "Baguingin", "Bagumbayan", "Bangkal", 
          "Bantud", "Barangay 1 (Pob.)", "Barangay 2 (Pob.)", "Barangay 3 (Pob.)", 
          "Barangay 4 (Pob.)", "Barangay 5 (Pob.)", "Barangay 6 (Pob.)", 
          "Barangay 7 (Pob.)", "Barangay 8 (Pob.)", "Barangay 9 (Pob.)", "Barosong", 
          "Barroc", "Bayuco", "Binaliuan Mayor", "Binaliuan Menor", "Bitas", 
          "Buenavista", "Bugasongan", "Buyu-an", "Canabuan", "Cansilayan", 
          "Cordova Norte", "Cordova Sur", "Danao", "Dapdap", "Dorong-an", "Guisian", 
          "Isauan", "Isian", "Jamog", "Lanag", "Linobayan", "Lubog", "Nagba", "Namocon", 
          "Napnapan Norte", "Napnapan Sur", "Olo Barroc", "Parara Norte", "Parara Sur", 
          "San Rafael", "Sermon", "Sipitan", "Supa", "Tan Pael", "Taro"
        ],
      },
      {
        name: "Tubungan",
        barangays: [
          "Adgao", "Ago", "Ambarihon", "Ayubo", "Bacan", "Badiang", "Bagunanay", 
          "Balicua", "Bantayanan", "Batga", "Bato", "Bikil", "Boloc", "Bondoc", "Borong", 
          "Buenavista", "Cadabdab", "Daga-ay", "Desposorio", "Igdampog Norte", 
          "Igdampog Sur", "Igpaho", "Igtuble", "Ingay", "Isauan", "Jolason", "Jona", 
          "La-ag", "Lanag Norte", "Lanag Sur", "Male", "Mayang", "Molina", "Morcillas", 
          "Nagba", "Navillan", "Pinamacalan", "San Jose", "Sibucauan", "Singon", "Tabat", 
          "Tagpu-an", "Talento", "Teniente Benito", "Victoria", "Zone I (Pob.)", 
          "Zone II (Pob.)", "Zone III (Pob.)"
        ],
      },
      {
        name: "Zarraga",
        barangays: [
          "Balud I", "Balud II", "Balud Lilo-an", "Dawis Centro", "Dawis Norte", 
          "Dawis Sur", "Gines", "Ilawod Poblacion", "Ilaya Poblacion", 
          "Inagdangan Centro", "Inagdangan Norte", "Inagdangan Sur", "Jalaud Norte", 
          "Jalaud Sur", "Libongcogon", "Malunang", "Pajo", "Sambag", "Sigangao", 
          "Talauguis", "Talibong", "Tubigan", "Tuburan", "Tuburan Sulbod"
        ],
      },
    ],
  },
  {
    province: "Iloilo City",
    municipalities: [
      {
        name: "City of Iloilo",
        barangays: [
          "Abeto Mirasol Taft South", "Aguinaldo", "Airport", "Alalasan Lapuz", 
          "Arguelles", "Arsenal Aduana", "Bakhaw", "Balabago", "Balantang", "Baldoza", 
          "Bantud", "Banuyao", "Baybay Tanza", "Benedicto", "Bito-on", "Bolilao", 
          "Bonifacio", "Bonifacio Tanza", "Buhang", "Buhang Taft North", "Buntatala", 
          "Burgos-Mabini-Plaza", "Caingin", "Calahunan", "Calaparan", "Calubihan", 
          "Calumpang", "Camalig", "Cochero", "Compania", "Concepcion-Montes", "Cuartero", 
          "Cubay", "Danao", "Delgado-Jalandoni-Bagumbayan", "Democracia", "Desamparados", 
          "Divinagracia", "Don Esteban-Lapuz", "Dulonan", "Dungon", "Dungon A", 
          "Dungon B", "East Baluarte", "East Timawa", "Edganzon", "El 98 Castilla", 
          "Fajardo", "Flores", "General Hughes-Montes", "Gloria", "Gustilo", 
          "Guzman-Jesena", "Habog-habog Salvacion", "Hibao-an Norte", "Hibao-an Sur", 
          "Hinactacan", "Hipodromo", "Inday", "Infante", "Ingore", 
          "Jalandoni Estate-Lapuz", "Jalandoni-Wilson", "Javellana", "Jereos", 
          "Kahirupan", "Kasingkasing", "Katilingban", "Kauswagan", "Laguda", "Lanit", 
          "Lapuz Norte", "Lapuz Sur", "Legaspi dela Rama", "Liberation", 
          "Libertad, Santa Isabel", "Libertad-Lapuz", "Loboc-Lapuz", "Lopez Jaena", 
          "Lopez Jaena Norte", "Lopez Jaena Sur", "Luna", "Luna", "M. V. Hechanova", 
          "Mabolo-Delgado", "Macarthur", "Magdalo", "Magsaysay", "Magsaysay Village", 
          "Malipayon-Delgado", "Mansaya-Lapuz", "Marcelo H. del Pilar", "Maria Clara", 
          "Maria Cristina", "Mohon", "Molo Boulevard", "Monica Blumentritt", "Montinola", 
          "Muelle Loney-Montes", "Nabitasan", "Navais", "Nonoy", "North Avanceña", 
          "North Baluarte", "North Fundidor", "North San Jose", "Obrero-Lapuz", "Ortiz", 
          "Osmeña", "Our Lady Of Fatima", "Our Lady Of Lourdes", "Oñate de Leon", 
          "PHHC Block 17", "PHHC Block 22 NHA", "Pale Benedicto Rizal", "Poblacion Molo", 
          "President Roxas", "Progreso-Lapuz", "Punong-Lapuz", "Quezon", "Quintin Salas", 
          "Railway", "Rima-Rizal", "Rizal", "Rizal Estanzuela", "Rizal Ibarra", 
          "Rizal Palapala I", "Rizal Palapala II", "Roxas Village", "Sambag", 
          "Sampaguita", "San Agustin", "San Antonio", "San Felix", "San Isidro", 
          "San Isidro", "San Jose", "San Jose", "San Jose", "San Juan", "San Nicolas", 
          "San Pedro", "San Pedro", "San Rafael", "San Roque", "San Vicente", 
          "Santa Cruz", "Santa Filomena", "Santa Rosa", "Santo Domingo", 
          "Santo Niño Norte", "Santo Niño Sur", "Santo Rosario-Duran", "Seminario", 
          "Simon Ledesma", "Sinikway", "So-oc", "South Baluarte", "South Fundidor", 
          "South San Jose", "Taal", "Tabuc Suba", "Tabuc Suba", "Tabucan", "Tacas", 
          "Tagbac", "Tanza-Esperanza", "Tap-oc", "Taytay Zone II", "Ticud", 
          "Timawa Tanza I", "Timawa Tanza II", "Ungka", "Veterans Village", 
          "Villa Anita", "West Habog-habog", "West Timawa", "Yulo Drive", "Yulo-Arroyo", 
          "Zamora-Melliza"
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
