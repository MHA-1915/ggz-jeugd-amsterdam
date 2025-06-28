console.log("Script geladen");

// Globale variabelen
let map;
let markers = [];
let currentInfoWindow = null; // Nieuwe variabele voor het bijhouden van het huidige open infowindow
let legendaToegevoegd = false; // Nieuwe variabele om bij te houden of de legenda al is toegevoegd

// Zorginstelling data
const zorginstellingenData = [
    {
        naam: "Arkin Jeugd & Gezin",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Baarsjesweg 224, 1058 AA Amsterdam", positie: { lat: 52.36744, lng: 4.85713 },
        locaties: [
            { naam: "Arkin Amsterdam West", adres: "Baarsjesweg 224, 1058 AA Amsterdam", positie: { lat: 52.36744, lng: 4.85713 } },
            { naam: "Arkin Diemen", adres: "Wisselwerking 46-48, 1112 XR Diemen", positie: { lat: 52.334722, lng: 4.962778 } },
            { naam: "Arkin Amsterdam Noord", adres: "Klaprozenweg 111, 1033 NN Amsterdam", positie: { lat: 52.41013, lng: 4.89213 } },
            { naam: "Arkin Amsterdam Zuidoost", adres: "Bijlmerdreef 1169, 1103 TT Amsterdam", positie: { lat: 52.31213, lng: 4.97213 } }
        ]
    },
    {
        naam: "Boomerang Zorg Jeugdhulp",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Tijnmuiden 34, 1046AL Amsterdam", positie: { lat: 52.38213, lng: 4.80013 }
    },
    {
        naam: "CareHouse",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Van Hallstraat 10, 1051 HH Amsterdam", positie: { lat: 52.38613, lng: 4.86813 },
        locaties: [
            { naam: "CareHouse Amsterdam Centrum", adres: "Van Hallstraat 10, 1051 HH Amsterdam", positie: { lat: 52.38613, lng: 4.86813 } },
            { naam: "CareHouse Amsterdam Nieuw-West", adres: "Johan Cruijff Boulevard 83, 1101 DM Amsterdam", positie: { lat: 52.31298, lng: 4.94413 } },
            { naam: "CareHouse Amsterdam Noord", adres: "Strekkerweg 77, 1033 DA Amsterdam", positie: { lat: 52.41013, lng: 4.89213 } },
            { naam: "CareHouse Amsterdam IJburg", adres: "Franz Zieglerstraat 76, 1087 HN Amsterdam", positie: { lat: 52.35513, lng: 5.00213 } },
            { naam: "CareHouse Amsterdam Oost", adres: "President Brandstraat 32, 1091 XH Amsterdam", positie: { lat: 52.36213, lng: 4.93013 } },
            { naam: "CareHouse Amsterdam West", adres: "Baarsjesweg 224, 1058 AA Amsterdam", positie: { lat: 52.36744, lng: 4.85713 } },
            { naam: "CareHouse Amsterdam Zuid", adres: "Admiraal de Ruijterweg 454, 1055 NG Amsterdam", positie: { lat: 52.37913, lng: 4.85244 } },
            { naam: "CareHouse Amsterdam Zuidoost", adres: "Bijlmerdreef 1169, 1103 TT Amsterdam", positie: { lat: 52.31213, lng: 4.97213 } }
        ]
    },
    {
        naam: "De Opgroeipraktijk",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Strekkerweg 77, 1033 DA Amsterdam", positie: { lat: 52.41013, lng: 4.89213 },
        locaties: [
            { naam: "De Opgroeipraktijk Amsterdam Noord", adres: "Strekkerweg 77, 1033 DA Amsterdam", positie: { lat: 52.41013, lng: 4.89213 } },
            { naam: "De Opgroeipraktijk Amsterdam IJburg", adres: "Franz Zieglerstraat 76, 1087 HN Amsterdam", positie: { lat: 52.35513, lng: 5.00213 } },
            { naam: "De Opgroeipraktijk Amsterdam Nieuw West", adres: "Osdorpplein 470, 1068 SZ Amsterdam", positie: { lat: 52.35713, lng: 4.80613 } },
            { naam: "De Opgroeipraktijk Amsterdam Oost", adres: "President Brandstraat 32, 1091 XH Amsterdam", positie: { lat: 52.36213, lng: 4.93013 } },
            { naam: "De Opgroeipraktijk Amsterdam West", adres: "Van Hallstraat 10, 1051 HH Amsterdam", positie: { lat: 52.38613, lng: 4.86813 } }
        ]
    },
    {
        naam: "FamilySupporters",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Burgemeester Eliasstraat 1, 1055 NA Amsterdam", positie: { lat: 52.38113, lng: 4.84913 },
        locaties: [
            { naam: "FamilySupporters Amsterdam", adres: "Burgemeester Eliasstraat 1, 1055 NA Amsterdam", positie: { lat: 52.38113, lng: 4.84913 } },
            { naam: "FamilySupporters Amstelveen", adres: "Veenplaats 19, 1182 JW Amstelveen", positie: { lat: 52.30889, lng: 4.86389 } }
        ]
    },
    {
        naam: "Fibbe",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Johan Cruijff Boulevard 83, 1101DM Amsterdam", positie: { lat: 52.31298, lng: 4.94413 },
        aanmelden: "https://fibbescl.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisatie: "Jeugd GGZ, gezinstherapie, traumabehandeling"
    },
    {
        naam: "Groei&glunder",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Houtmankade 334-2, 1013 RR Amsterdam", positie: { lat: 52.38813, lng: 4.88113 }
    },
    {
        naam: "iHUB Care Express",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Nassaukade 162H, 1053 LL Amsterdam", positie: { lat: 52.36798, lng: 4.87213 }
    },
    {
        naam: "iHUB Familiezorg",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Strekkerweg 77, 1033 DA Amsterdam", positie: { lat: 52.41013, lng: 4.89213 },
        locaties: [
            { naam: "iHUB Amsterdam-Noord", adres: "Strekkerweg 77, 1033 DA Amsterdam", positie: { lat: 52.41013, lng: 4.89213 } },
            { naam: "iHUB Amsterdam-Oost", adres: "President Brandstraat 32, 1091 XH Amsterdam", positie: { lat: 52.36213, lng: 4.93013 } },
            { naam: "iHUB Amsterdam-West", adres: "Van Hallstraat 10, 1051 HH Amsterdam", positie: { lat: 52.38613, lng: 4.86813 } },
            { naam: "iHUB Amsterdam-Zuidoost", adres: "Bijlmerdreef 1169, 1103 TT Amsterdam", positie: { lat: 52.31213, lng: 4.97213 } },
            { naam: "iHUB Amstelveen (Amstelland)", adres: "Veenplaats 19, 1182 JW Amstelveen", positie: { lat: 52.30889, lng: 4.86389 } }
        ]
    },
    {
        naam: "Invivo Kids",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Veenplaats 19, 1182JW Amstelveen", positie: { lat: 52.30889, lng: 4.86389 }
    },
    {
        naam: "Leger des Heils",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Hilversumstraat 338, 1024MB Amsterdam", positie: { lat: 52.39713, lng: 4.92713 }
    },
    {
        naam: "Leveo",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Burgemeester Eliasstraat 1, 1055 NA Amsterdam", positie: { lat: 52.38113, lng: 4.84913 }
    },
    {
        naam: "Levvel",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Fred. Roeskestraat 73, 1076 EC Amsterdam", positie: { lat: 52.34013, lng: 4.85713 }
    },
    {
        naam: "Philadelphia",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Jekerstraat 84, 1078MG Amsterdam", positie: { lat: 52.33813, lng: 4.91113 }
    },
    {
        naam: "PsyGRO",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Doctor Willem Dreesweg 2, 1185 VB Amstelveen", positie: { lat: 52.31213, lng: 4.85713 }
    },
    {
        naam: "RIOzorg",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Bijlmerdreef 1001-A, 1103 TW Amsterdam", positie: { lat: 52.31213, lng: 4.97213 },
        locaties: [
            { naam: "RIOzorg Amsterdam Zuidoost", adres: "Bijlmerdreef 1001-A, 1103 TW Amsterdam", positie: { lat: 52.31213, lng: 4.97213 } },
            { naam: "RIOzorg Weesp", adres: "C.J. van Houtenlaan 1G, 1381 CN Weesp", positie: { lat: 52.30713, lng: 5.04113 } }
        ]
    },
    {
        naam: "STEP",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Amsterdam",
        website: "https://stepjeugdhulp.nl",
        aanmelden: "https://stepjeugdhulp.nl/#aanmelden",
        leeftijd: "0-23 jaar",
        specialisatie: "Enkelvoudige specialistische jeugdhulp",
        positie: { lat: 52.3676, lng: 4.9041 }
    },
    {
        naam: "Stichting JA",
        type: "Hoogspecialistische Jeugdhulp (HSJH)",
        adres: "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam", positie: { lat: 52.35913, lng: 4.92213 }
    },
    {
        naam: "Terminal 18",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Admiraal de Ruijterweg 454, 1055NG Amsterdam", positie: { lat: 52.37913, lng: 4.85244 }
    },
    {
        naam: "Timon",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Modemstraat 20C, 1033 RW Amsterdam", positie: { lat: 52.40413, lng: 4.89213 }
    },
    {
        naam: "Youz",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Overschiestraat 57, 1062HN Amsterdam", positie: { lat: 52.34113, lng: 4.83713 }
    },
    {
        naam: "Zigzag Kindzorg",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Albardagracht 1, 1063 NN Amsterdam", positie: { lat: 52.37413, lng: 4.82513 } },
            { naam: "Zigzag Kindzorg Amsterdam-Zuid", adres: "Amsteldijk 196, 1079 LK Amsterdam", positie: { lat: 52.34413, lng: 4.90213 } }
        ]
    },
    {
        naam: "Kabouterhuis",
        type: "Enkelvoudige Specialistische Jeugdhulp (ESJH)",
        adres: "Marne 127, 1186 PJ Amstelveen", positie: { lat: 52.30813, lng: 4.85813 },
        locaties: [
            { naam: "Kabouterhuis Amstelveen", adres: "Marne 127, 1186 PJ Amstelveen", positie: { lat: 52.30813, lng: 4.85813 } },
            { naam: "Kabouterhuis Amsterdam Zuid", adres: "Amsteldijk 196, 1079 LK Amsterdam", positie: { lat: 52.34413, lng: 4.90213 } },
            { naam: "Kabouterhuis Amsterdam Noord", adres: "Kopjachtplein 20, 1034 JG Amsterdam", positie: { lat: 52.40413, lng: 4.89213 } },
            { naam: "Kabouterhuis Amsterdam West", adres: "Albardagracht 1, 1063 NN Amsterdam", positie: { lat: 52.37413, lng: 4.82513 } },
            { naam: "Kabouterhuis Amsterdam Zuidoost", adres: "Leksmondplein 28, 1108 EL Amsterdam", positie: { lat: 52.30713, lng: 4.97813 } }
        ]
    },
    {
        naam: "OKT Geuzenveld & Slotermeer",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Geuzenveld & Slotermeer, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3775, lng: 4.8050 }
    },
    {
        naam: "OKT Osdorp",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Osdorp, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3625, lng: 4.7850 }
    },
    {
        naam: "OKT De Aker & Nieuw-Sloten",
        type: "Ouder- en Kindteam (OKT)",
        adres: "De Aker & Nieuw-Sloten, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3525, lng: 4.7650 }
    },
    {
        naam: "OKT Slotervaart",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Slotervaart, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3575, lng: 4.8300 }
    },
    {
        naam: "OKT Gaasperdam",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Gaasperdam, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.2925, lng: 4.9800 }
    },
    {
        naam: "OKT Watergraafsmeer",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Watergraafsmeer, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3575, lng: 4.9350 }
    },
    {
        naam: "OKT Bos en Lommer",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Bos en Lommer, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3775, lng: 4.8600 }
    },
    {
        naam: "OKT Oud West & De Baarsjes",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Oud West & De Baarsjes, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3625, lng: 4.8700 }
    },
    {
        naam: "OKT Westerpark",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Westerpark, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3875, lng: 4.8750 }
    },
    {
        naam: "OKT Zuid",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Zuid, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3525, lng: 4.8600 }
    },
    {
        naam: "OKT Weesp & Driemond",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Weesp & Driemond, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3075, lng: 5.0450 }
    },
    {
        naam: "OKT Centrum West",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Centrum West, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3750, lng: 4.8850 }
    },
    {
        naam: "OKT Centrum Oost",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Centrum Oost, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3750, lng: 4.9150 }
    },
    {
        naam: "OKT Noord Oost",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Noord Oost, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3925, lng: 4.9350 }
    },
    {
        naam: "OKT Oud Noord",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Oud Noord, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3875, lng: 4.9250 }
    },
    {
        naam: "OKT Noord West",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Noord West, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.4025, lng: 4.9150 }
    },
    {
        naam: "OKT Oud Oost",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Oud Oost, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3575, lng: 4.9300 }
    },
    {
        naam: "OKT Indische Buurt & Oostelijk Havengebied",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Indische Buurt & Oostelijk Havengebied, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3575, lng: 4.9450 }
    },
    {
        naam: "OKT IJburg & Zeeburgereiland",
        type: "Ouder- en Kindteam (OKT)",
        adres: "IJburg & Zeeburgereiland, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3525, lng: 5.0000 }
    },
    {
        naam: "OKT De Pijp & Rivierenbuurt",
        type: "Ouder- en Kindteam (OKT)",
        adres: "De Pijp & Rivierenbuurt, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3525, lng: 4.9000 }
    },
    {
        naam: "OKT Buitenveldert & Zuidas",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Buitenveldert & Zuidas, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3325, lng: 4.8800 }
    },
    {
        naam: "OKT Bijlmer Centrum",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Bijlmer Centrum, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3125, lng: 4.9500 }
    },
    {
        naam: "OKT Bijlmer Oost",
        type: "Ouder- en Kindteam (OKT)",
        adres: "Bijlmer Oost, Amsterdam",
        telefoon: "020 555 55 55",
        website: "https://www.amsterdam.nl/okt",
        aanmelden: "https://www.amsterdam.nl/okt/aanmelden",
        leeftijd: "0-18 jaar",
        specialisatie: "Basis jeugdhulp, opvoedondersteuning, preventieve zorg",
        positie: { lat: 52.3125, lng: 4.9600 }
    }
];

// Gebied data voor OKT's
const oktGebieden = {
    "OKT Geuzenveld & Slotermeer": [
        { lat: 52.3850, lng: 4.7900 },
        { lat: 52.3850, lng: 4.8200 },
        { lat: 52.3700, lng: 4.8200 },
        { lat: 52.3700, lng: 4.7900 }
    ],
    "OKT Osdorp": [
        { lat: 52.3700, lng: 4.7700 },
        { lat: 52.3700, lng: 4.8000 },
        { lat: 52.3550, lng: 4.8000 },
        { lat: 52.3550, lng: 4.7700 }
    ],
    "OKT De Aker & Nieuw-Sloten": [
        { lat: 52.3600, lng: 4.7500 },
        { lat: 52.3600, lng: 4.7800 },
        { lat: 52.3450, lng: 4.7800 },
        { lat: 52.3450, lng: 4.7500 }
    ],
    "OKT Slotervaart": [
        { lat: 52.3650, lng: 4.8200 },
        { lat: 52.3650, lng: 4.8400 },
        { lat: 52.3500, lng: 4.8400 },
        { lat: 52.3500, lng: 4.8200 }
    ],
    "OKT Gaasperdam": [
        { lat: 52.3000, lng: 4.9700 },
        { lat: 52.3000, lng: 4.9900 },
        { lat: 52.2850, lng: 4.9900 },
        { lat: 52.2850, lng: 4.9700 }
    ],
    "OKT Watergraafsmeer": [
        { lat: 52.3650, lng: 4.9250 },
        { lat: 52.3650, lng: 4.9450 },
        { lat: 52.3500, lng: 4.9450 },
        { lat: 52.3500, lng: 4.9250 }
    ],
    "OKT Bos en Lommer": [
        { lat: 52.3850, lng: 4.8500 },
        { lat: 52.3850, lng: 4.8700 },
        { lat: 52.3700, lng: 4.8700 },
        { lat: 52.3700, lng: 4.8500 }
    ],
    "OKT Oud West & De Baarsjes": [
        { lat: 52.3700, lng: 4.8600 },
        { lat: 52.3700, lng: 4.8800 },
        { lat: 52.3550, lng: 4.8800 },
        { lat: 52.3550, lng: 4.8600 }
    ],
    "OKT Westerpark": [
        { lat: 52.3950, lng: 4.8650 },
        { lat: 52.3950, lng: 4.8850 },
        { lat: 52.3800, lng: 4.8850 },
        { lat: 52.3800, lng: 4.8650 }
    ],
    "OKT Zuid": [
        { lat: 52.3600, lng: 4.8500 },
        { lat: 52.3600, lng: 4.8700 },
        { lat: 52.3450, lng: 4.8700 },
        { lat: 52.3450, lng: 4.8500 }
    ],
    "OKT Weesp & Driemond": [
        { lat: 52.3150, lng: 5.0350 },
        { lat: 52.3150, lng: 5.0550 },
        { lat: 52.3000, lng: 5.0550 },
        { lat: 52.3000, lng: 5.0350 }
    ],
    "OKT Centrum West": [
        { lat: 52.3800, lng: 4.8750 },
        { lat: 52.3800, lng: 4.8950 },
        { lat: 52.3700, lng: 4.8950 },
        { lat: 52.3700, lng: 4.8750 }
    ],
    "OKT Centrum Oost": [
        { lat: 52.3800, lng: 4.9050 },
        { lat: 52.3800, lng: 4.9250 },
        { lat: 52.3700, lng: 4.9250 },
        { lat: 52.3700, lng: 4.9050 }
    ],
    "OKT Noord Oost": [
        { lat: 52.4000, lng: 4.9250 },
        { lat: 52.4000, lng: 4.9450 },
        { lat: 52.3850, lng: 4.9450 },
        { lat: 52.3850, lng: 4.9250 }
    ],
    "OKT Oud Noord": [
        { lat: 52.3950, lng: 4.9150 },
        { lat: 52.3950, lng: 4.9350 },
        { lat: 52.3800, lng: 4.9350 },
        { lat: 52.3800, lng: 4.9150 }
    ],
    "OKT Noord West": [
        { lat: 52.4100, lng: 4.9050 },
        { lat: 52.4100, lng: 4.9250 },
        { lat: 52.3950, lng: 4.9250 },
        { lat: 52.3950, lng: 4.9050 }
    ],
    "OKT Oud Oost": [
        { lat: 52.3650, lng: 4.9200 },
        { lat: 52.3650, lng: 4.9400 },
        { lat: 52.3500, lng: 4.9400 },
        { lat: 52.3500, lng: 4.9200 }
    ],
    "OKT Indische Buurt & Oostelijk Havengebied": [
        { lat: 52.3650, lng: 4.9350 },
        { lat: 52.3650, lng: 4.9550 },
        { lat: 52.3500, lng: 4.9550 },
        { lat: 52.3500, lng: 4.9350 }
    ],
    "OKT IJburg & Zeeburgereiland": [
        { lat: 52.3600, lng: 4.9900 },
        { lat: 52.3600, lng: 5.0100 },
        { lat: 52.3450, lng: 5.0100 },
        { lat: 52.3450, lng: 4.9900 }
    ],
    "OKT De Pijp & Rivierenbuurt": [
        { lat: 52.3600, lng: 4.8900 },
        { lat: 52.3600, lng: 4.9100 },
        { lat: 52.3450, lng: 4.9100 },
        { lat: 52.3450, lng: 4.8900 }
    ],
    "OKT Buitenveldert & Zuidas": [
        { lat: 52.3400, lng: 4.8700 },
        { lat: 52.3400, lng: 4.8900 },
        { lat: 52.3250, lng: 4.8900 },
        { lat: 52.3250, lng: 4.8700 }
    ],
    "OKT Bijlmer Centrum": [
        { lat: 52.3200, lng: 4.9400 },
        { lat: 52.3200, lng: 4.9600 },
        { lat: 52.3050, lng: 4.9600 },
        { lat: 52.3050, lng: 4.9400 }
    ],
    "OKT Bijlmer Oost": [
        { lat: 52.3200, lng: 4.9500 },
        { lat: 52.3200, lng: 4.9700 },
        { lat: 52.3050, lng: 4.9700 },
        { lat: 52.3050, lng: 4.9500 }
    ]
};

// Kleuren voor verschillende type zorginstellingen
const markerKleuren = {
    'Ouder- en Kindteam': '#4CAF50', // Groen
    'basis': '#FFC107',              // Geel
    'gespecialiseerd': '#FF5722',    // Oranje
    'hoogspecialistisch': '#E91E63'  // Roze
};

// Functie om de kleur te bepalen op basis van het type zorg
function bepaalKleur(type, isOKT) {
    if (isOKT) return '#4CAF50'; // Groen voor OKT
    
    switch(type.toLowerCase()) {
        case 'basis':
            return '#FFC107'; // Geel voor basis GGZ
        case 'gespecialiseerd':
            return '#FF5722'; // Oranje voor gespecialiseerde GGZ
        case 'hoogspecialistisch':
            return '#F44336'; // Rood voor Hoogspecialistische zorg
        default:
            return '#9E9E9E'; // Grijs voor overige
    }
}

// Functie om zorginstellingen te sorteren op naam
function sorteerInstellingen(instellingen) {
    return [...instellingen].sort((a, b) => a.naam.localeCompare(b.naam));
}

// Functie om de zorginstellingen tabel te vullen
function vulZorginstellingenTabel(instellingen) {
    const tabelBody = document.querySelector('#zorginstellingen-tabel tbody');
    if (!tabelBody) return;

    // Leeg de tabel
    tabelBody.innerHTML = '';

    // Vul de tabel met instellingen
    instellingen.forEach(instelling => {
        if (instelling.locaties && instelling.locaties.length > 0) {
            // Voor instellingen met meerdere locaties
            instelling.locaties.forEach(locatie => {
                const websiteLink = locatie.website || instelling.website;
                const aanmeldLink = instelling.aanmelden || instelling.verwijzing || websiteLink;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${instelling.naam}${locatie.naam ? ` - ${locatie.naam}` : ''}</td>
                    <td>${instelling.type}</td>
                    <td>${locatie.adres || instelling.adres || ''}</td>
                    <td>${instelling.telefoon || ''}</td>
                    <td>${instelling.leeftijd || ''}</td>
                    <td>${instelling.specialisatie || ''}</td>
                    <td>
                        ${websiteLink ? `<a href="${websiteLink}" target="_blank" class="btn btn-primary btn-sm">Website</a>` : ''}
                        ${aanmeldLink && aanmeldLink !== websiteLink ? `<a href="${aanmeldLink}" target="_blank" class="btn btn-success btn-sm">Aanmelden/Verwijzen</a>` : ''}
                    </td>
                `;
                tabelBody.appendChild(row);
            });
        } else {
            // Voor instellingen met één locatie
            const websiteLink = instelling.website;
            const aanmeldLink = instelling.aanmelden || instelling.verwijzing || websiteLink;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${instelling.naam}</td>
                <td>${instelling.type}</td>
                <td>${instelling.adres || ''}</td>
                <td>${instelling.telefoon || ''}</td>
                <td>${instelling.leeftijd || ''}</td>
                <td>${instelling.specialisatie || ''}</td>
                <td>
                    ${websiteLink ? `<a href="${websiteLink}" target="_blank" class="btn btn-primary btn-sm">Website</a>` : ''}
                    ${aanmeldLink && aanmeldLink !== websiteLink ? `<a href="${aanmeldLink}" target="_blank" class="btn btn-success btn-sm">Aanmelden/Verwijzen</a>` : ''}
                </td>
            `;
            tabelBody.appendChild(row);
        }
    });

    // Update de resultaten teller
    const resultatenTeller = document.getElementById('resultaten-teller');
    if (resultatenTeller) {
        const aantalInstellingen = tabelBody.getElementsByTagName('tr').length;
        resultatenTeller.textContent = `${aantalInstellingen} instelling${aantalInstellingen === 1 ? '' : 'en'} gevonden`;
    }
}

// Functie om de kaart te initialiseren
function initMap() {
    console.log("initMap aangeroepen");

    // Centreer de kaart op Amsterdam
    const amsterdam = { lat: 52.3676, lng: 4.9041 };
    
    // Maak een nieuwe kaart aan
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: amsterdam,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    // Voeg markers toe voor alle zorginstellingen
    voegMarkersEnInfoWindowsToe();

    // Voeg de legenda toe als die nog niet is toegevoegd
    if (!legendaToegevoegd) {
        voegLegendaToe();
        legendaToegevoegd = true;
    }

    // Voeg event listeners toe voor de filters als we op de kaartpagina zijn
    if (document.querySelector('.kaart-pagina')) {
        const filterForm = document.getElementById('filter-form');
        if (filterForm) {
            filterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                zoekZorginstellingen();
            });

            // Voeg change event listeners toe voor directe updates
            document.getElementById('type-filter').addEventListener('change', zoekZorginstellingen);
            document.getElementById('leeftijd-filter').addEventListener('change', zoekZorginstellingen);
        }
    }
}

// Zorg ervoor dat initMap globaal beschikbaar is
window.initMap = initMap;

// Functie om de legenda toe te voegen
function voegLegendaToe() {
    const legendaDiv = document.createElement('div');
    legendaDiv.className = 'legenda';
    legendaDiv.style.cssText = `
        background: white;
        padding: 10px;
        margin: 10px;
        border: 1px solid #999;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;

    const legendaItems = [
        { type: 'Ouder- en Kindteam', kleur: '#4CAF50' },
        { type: 'Enkelvoudige Specialistische Jeugdhulp', kleur: '#FF9800' },
        { type: 'Hoogspecialistische Jeugdhulp', kleur: '#F44336' }
    ];

    const titel = document.createElement('div');
    titel.textContent = 'Type Zorginstelling';
    titel.style.fontWeight = 'bold';
    titel.style.marginBottom = '10px';
    legendaDiv.appendChild(titel);

    legendaItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.style.margin = '5px 0';
        itemDiv.style.display = 'flex';
        itemDiv.style.alignItems = 'center';

        const marker = document.createElement('div');
        marker.style.width = '12px';
        marker.style.height = '12px';
        marker.style.borderRadius = '50%';
        marker.style.backgroundColor = item.kleur;
        marker.style.border = '2px solid #FFFFFF';
        marker.style.boxShadow = '0 0 2px rgba(0,0,0,0.3)';
        marker.style.marginRight = '8px';

        const label = document.createElement('span');
        label.textContent = item.type;

        itemDiv.appendChild(marker);
        itemDiv.appendChild(label);
        legendaDiv.appendChild(itemDiv);
    });

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendaDiv);
}

// Functie om markers en info windows toe te voegen
function voegMarkersEnInfoWindowsToe() {
    console.log("Markers worden toegevoegd", zorginstellingenData.length);

    // Verwijder bestaande markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Voeg markers toe voor alle zorginstellingen
    zorginstellingenData.forEach(instelling => {
        // Als de instelling locaties heeft, voeg dan voor elke locatie een marker toe
        if (instelling.locaties && instelling.locaties.length > 0) {
            instelling.locaties.forEach(locatie => {
                if (locatie.positie) {
                    voegMarkerToe(locatie, instelling);
                }
            });
        } else if (instelling.positie) {
            // Anders voeg een marker toe voor de hoofdlocatie
            voegMarkerToe(instelling, instelling);
        }
    });

    console.log("Aantal instellingen:", zorginstellingenData.length);
}

// Functie om een enkele marker toe te voegen
function voegMarkerToe(locatie, instelling) {
    if (!locatie.positie) { console.log("Geen positie voor:", instelling.naam); return; }

    console.log("Voeg marker toe voor:", instelling.naam, "op positie:", locatie.positie);    // Bepaal de kleur op basis van het type
    let kleur;
    if (instelling.type.includes('OKT') || instelling.type.includes('Ouder- en Kindteam')) {
        kleur = '#4CAF50'; // Groen voor OKT
    } else if (instelling.type.includes('Enkelvoudige Specialistische Jeugdhulp')) {
        kleur = '#FF9800'; // Oranje voor ESJH
    } else if (instelling.type.includes('Hoogspecialistische Jeugdhulp')) {
        kleur = '#F44336'; // Rood voor HSJH
    } else {
        kleur = '#9E9E9E'; // Grijs voor overige
    }
    const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: kleur,
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        scale: 10
    };

    const marker = new google.maps.Marker({
        position: locatie.positie,
        map: map,
        title: `${instelling.naam}${locatie.naam ? ` - ${locatie.naam}` : ''}`,
        icon: markerIcon
    });

    // Maak een info window voor deze marker
    const infoWindow = new google.maps.InfoWindow({
        content: maakInfoWindowContent(locatie, instelling)
    });

    // Voeg click event toe
    marker.addListener('click', () => {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
    });

    console.log("Marker:", locatie.positie, instelling.naam);

    markers.push(marker);
}

// Functie om de inhoud van het info window te maken
function maakInfoWindowContent(locatie, instelling) {
    const type = instelling.type;
    const telefoon = locatie.telefoon || instelling.telefoon;
    
    // Bepaal de website en aanmeld links
    const websiteLink = locatie.website || instelling.website;
    const aanmeldLink = instelling.aanmelden || instelling.verwijzing || websiteLink;
    
    return `
        <div class="info-window">
            <h3>${instelling.naam}${locatie.naam ? ` - ${locatie.naam}` : ''}</h3>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Adres:</strong> ${locatie.adres || instelling.adres}</p>
            <p><strong>Telefoon:</strong> ${telefoon}</p>
            <p><strong>Leeftijd:</strong> ${instelling.leeftijd}</p>
            ${instelling.specialisatie ? `<p><strong>Specialisaties:</strong> ${instelling.specialisatie}</p>` : ''}
            <div class="info-window-links">
                ${websiteLink ? `<p><a href="${websiteLink}" target="_blank">Website</a></p>` : ''}
                ${aanmeldLink && aanmeldLink !== websiteLink ? `<p><a href="${aanmeldLink}" target="_blank">Aanmelden/Verwijzen</a></p>` : ''}
            </div>
        </div>
    `;
}

// Functie om de kaart te updaten met gefilterde resultaten
function updateKaart(gefilterd = false) {
    const zorginstellingen = gefilterd ? filterZorginstellingenOpType(gefilterd) : zorginstellingenData;
    voegMarkersEnInfoWindowsToe();
}

// Functie om zorginstellingen te filteren op type
function filterZorginstellingenOpType(type) {
    if (type === 'alle') return zorginstellingenData;
    
    return zorginstellingenData.filter(instelling => {
        const instellingType = instelling.type.toLowerCase();
        
        switch(type) {
            case 'okt':
                return instellingType.includes('okt');
            case 'esjh':
                return instellingType.includes('enkelvoudige specialistische jeugdhulp');
            case 'hsjh':
                return instellingType.includes('hoogspecialistische jeugdhulp');
            default:
                return true;
        }
    });
}

// Functie om tabs te beheren
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Vul initieel de 'alle' tab met alle zorginstellingen
    vulZorginstellingenTabel(zorginstellingenData);
    updateResultatenTeller(zorginstellingenData.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Verwijder active class van alle buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Voeg active class toe aan geklikte button
            button.classList.add('active');
            
            // Filter en toon zorginstellingen
            const type = button.dataset.tab;
            let gefilterd = zorginstellingenData;
            
            if (type !== 'alle') {
                gefilterd = zorginstellingenData.filter(instelling => {
                    const instellingType = instelling.type.toLowerCase();
                    
                    switch(type) {
                        case 'okt':
                            return instellingType.includes('okt') || instellingType.includes('ouder- en kindteam');
                        case 'esjh':
                            return instellingType.includes('enkelvoudige specialistische jeugdhulp');
                        case 'hsjh':
                            return instellingType.includes('hoogspecialistische jeugdhulp');
                        default:
                            return true;
                    }
                });
            }
            
            vulZorginstellingenTabel(gefilterd);
            updateResultatenTeller(gefilterd.length);
        });
    });
}

// Functie om de resultaten teller te updaten
function updateResultatenTeller(aantal) {
    const teller = document.getElementById('resultaten-teller');
    if (teller) {
        teller.textContent = `${aantal} instelling${aantal === 1 ? '' : 'en'} gevonden`;
    }
}

// Functie voor het zoeken van zorginstellingen
function zoekZorginstellingen() {
    if (!document.getElementById('zoekbalk')) return;

    const zoekbalk = document.getElementById('zoekbalk');
    const zoekTerm = zoekbalk.value.toLowerCase();

    // Filter zorginstellingen op basis van zoekterm
    const gefilterd = zorginstellingenData.filter(instelling => {
        // Check naam
        if (instelling.naam.toLowerCase().includes(zoekTerm)) return true;
        
        // Check type
        if (instelling.type.toLowerCase().includes(zoekTerm)) return true;
        
        // Check adres
        if (instelling.adres && instelling.adres.toLowerCase().includes(zoekTerm)) return true;
        
        // Check specialisatie
        if (instelling.specialisatie && instelling.specialisatie.toLowerCase().includes(zoekTerm)) return true;
        
        // Check locaties
        if (instelling.locaties) {
            return instelling.locaties.some(locatie => {
                if (locatie.naam && locatie.naam.toLowerCase().includes(zoekTerm)) return true;
                if (locatie.adres && locatie.adres.toLowerCase().includes(zoekTerm)) return true;
                return false;
            });
        }
        
        return false;
    });

    // Update de tabel met gefilterde resultaten
    vulZorginstellingenTabel(gefilterd);
    updateResultatenTeller(gefilterd.length);
}

// Functie om te bepalen op welke pagina we zijn
function bepaalPagina() {
    const isKaartPagina = document.querySelector('.kaart-pagina') !== null;
    const isOverzichtPagina = document.querySelector('.overzicht-pagina') !== null;
    return { isKaartPagina, isOverzichtPagina };
}

// HTML voor de tabs
const tabsHTML = `
    <div class="tabs">
        <button class="tab-button active" data-tab="alle">Alle Zorginstellingen</button>
        <button class="tab-button" data-tab="okt">OKT</button>
        <button class="tab-button" data-tab="esjh">Enkelvoudige Specialistische Jeugdhulp</button>
        <button class="tab-button" data-tab="hsjh">Hoogspecialistische Jeugdhulp</button>
    </div>
`;

// Functie om de tabs toe te voegen aan de pagina
function voegTabsToe() {
    const container = document.querySelector('.overzicht-pagina');
    if (container) {
        const tabsContainer = document.createElement('div');
        tabsContainer.innerHTML = tabsHTML;
        container.insertBefore(tabsContainer, container.firstChild);
    }
}

// Initialiseer de pagina wanneer deze geladen is
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM geladen');
    
    const { isKaartPagina, isOverzichtPagina } = bepaalPagina();
    console.log('Pagina type:', { isKaartPagina, isOverzichtPagina });

    if (isKaartPagina) {
        // De kaart wordt geïnitialiseerd door de maps-loader.js
        // Voeg markers toe aan de kaart
        
        // Voeg event listeners toe voor de filters
        const filterForm = document.getElementById('filter-form');
        if (filterForm) {
            filterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                zoekZorginstellingen();
            });

            // Voeg change event listeners toe voor directe updates
            document.getElementById('type-filter').addEventListener('change', zoekZorginstellingen);
            document.getElementById('leeftijd-filter').addEventListener('change', zoekZorginstellingen);
        }
    } else if (isOverzichtPagina) {
        console.log('Initialiseer overzichtspagina');
        
        // Initialiseer de tabs
        initializeTabs();
        
        // Voeg zoekfunctionaliteit toe
        const zoekbalk = document.getElementById('zoekbalk');
        if (zoekbalk) {
            zoekbalk.addEventListener('input', zoekZorginstellingen);
        }
    }
}); 