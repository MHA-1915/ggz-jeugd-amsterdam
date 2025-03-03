// Globale variabelen
let map;
let markers = [];
let currentInfoWindow = null; // Nieuwe variabele voor het bijhouden van het huidige open infowindow
let legendaToegevoegd = false; // Nieuwe variabele om bij te houden of de legenda al is toegevoegd

// Voorbeeld zorginstellingen data
const zorginstellingen = [
    {
        naam: "OKT Amsterdam Zuid",
        type: "Ouder- en Kindteam",
        adres: "Koninginneweg 1, 1075 CL Amsterdam",
        telefoon: "020-555 5963",
        leeftijd: "0-23",
        specialisaties: "Opvoedondersteuning, Ontwikkeling, Gezinscoaching",
        website: "https://oktamsterdam.nl",
        positie: { lat: 52.3507, lng: 4.8696 }
    },
    {
        naam: "Levvel",
        type: "Hoogspecialistische Zorg",
        adres: "Dr. Jan van Breemenstraat 1, 1056 AB Amsterdam",
        telefoon: "020-555 5151",
        leeftijd: "0-23",
        specialisaties: "Complexe gedragsstoornissen, Trauma, Autisme",
        website: "https://levvel.nl",
        positie: { lat: 52.3662, lng: 4.8544 }
    },
    {
        naam: "Arkin Jeugd & Gezin",
        type: "Gespecialiseerde GGZ",
        adres: "Baarsjesweg 224, 1058 AA Amsterdam",
        telefoon: "020-590 1330",
        leeftijd: "12-23",
        specialisaties: "Angst, Depressie, Gedragsproblemen",
        website: "https://arkinjeugdengezin.nl",
        positie: { lat: 52.3645, lng: 4.8453 }
    }
];

// Zorginstelling data
const zorginstellingenData = [
    {
        naam: "Levvel",
        type: "Hoogspecialistisch",
        positie: { lat: 52.3481, lng: 4.8568 },
        adres: "Amsteldijk 196, 1079 LK Amsterdam",
        telefoon: "088-0547001",
        website: "https://www.levvel.nl/formulier/jongere-aanmelden",
        leeftijd: "0-18 jaar",
        specialisaties: "TOPggz: DAT (Dwang, angst en tics), trauma en gezin, complexe gedragsstoornissen en forensische jeugdpsychiatrie"
    },
    {
        naam: "Arkin Jeugd & Gezin - West",
        type: "Hoogspecialistisch",
        positie: { lat: 52.3637058, lng: 4.8561758 },
        adres: "Baarsjesweg 224, 1058 AA Amsterdam",
        telefoon: "020-5905555",
        website: "https://arkinjeugdengezin.nl/verwijzers/client-verwijzen/",
        leeftijd: "0-23 jaar",
        specialisaties: "Gezinstherapie, eetstoornissen, angst"
    },
    {
        naam: "Arkin Jeugd & Gezin - Diemen",
        type: "Hoogspecialistisch",
        positie: { lat: 52.3348, lng: 4.9561 },
        adres: "Wisselwerking 46-48, 1112 XR Diemen",
        telefoon: "020-5905555",
        website: "https://arkinjeugdengezin.nl/verwijzers/client-verwijzen/",
        leeftijd: "0-23 jaar",
        specialisaties: "Gezinstherapie, eetstoornissen, angst"
    },
    {
        naam: "Arkin Jeugd & Gezin - Noord",
        type: "Hoogspecialistisch",
        positie: { lat: 52.3912, lng: 4.8914 },
        adres: "Klaprozenweg 111, 1033 NN Amsterdam",
        telefoon: "020-5905555",
        website: "https://arkinjeugdengezin.nl/verwijzers/client-verwijzen/ ",
        leeftijd: "0-23 jaar",
        specialisaties: "Gezinstherapie, eetstoornissen, angst"
    },
    {
        naam: "Arkin Jeugd & Gezin - Zuidoost",
        type: "Hoogspecialistisch",
        positie: { lat: 52.3221158, lng: 4.9732716 },
        adres: "Bijlmerdreef 1169, 1103 TT Amsterdam Zuidoost",
        telefoon: "020-5905555",
        website: "https://arkinjeugdengezin.nl/verwijzers/client-verwijzen/",
        leeftijd: "0-23 jaar",
        specialisaties: "Gezinstherapie, eetstoornissen, angst"
    },
    {
        naam: "GGZ inGeest Jeugd - De Nieuwe Valerius",
        type: "gespecialiseerd",
        positie: { lat: 52.3382971, lng: 4.8581411 },
        adres: "Willem van Outhoornstraat 12, 1067 HN Amsterdam",
        telefoon: "020-7884666",
        website: "https://www.ggzingeest.nl/jong",
        leeftijd: "12-23 jaar",
        specialisaties: "Stemmingsstoornissen, psychose, persoonlijkheidsproblematiek"
    },
    {
        naam: "OKT Centrum West",
        type: "basis",
        positie: { lat: 52.3784, lng: 4.8837 },
        adres: "Lindengracht 204, 1015 KL Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/centrum",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Centrum Oost",
        type: "basis",
        positie: { lat: 52.3765, lng: 4.9123 },
        adres: "Kraijenhoffstraat 32, 1018 RL Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/centrum",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Noord Oost",
        type: "basis",
        positie: { lat: 52.3918, lng: 4.9322 },
        adres: "Beverwijkstraat 3, 1024 VR Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/noordoost",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Oud Noord",
        type: "basis",
        positie: { lat: 52.3892, lng: 4.9212 },
        adres: "Wingerdweg 52, 1032 AN Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/oudnoord",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Noord West",
        type: "basis",
        positie: { lat: 52.4011, lng: 4.9123 },
        adres: "Aldebaranplein 2-F, 1033 GS Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/noordwest",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Oud Oost",
        type: "basis",
        positie: { lat: 52.3605, lng: 4.9284 },
        adres: "Pontanusstraat 278, 1093 SH Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/oudoost",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Indische Buurt & Oostelijk Havengebied",
        type: "basis",
        positie: { lat: 52.3605, lng: 4.9436 },
        adres: "Kramatplantsoen 101, 1095 LB Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/iboh",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT IJburg & Zeeburgereiland",
        type: "basis",
        positie: { lat: 52.3534, lng: 4.9983 },
        adres: "Pampuslaan 26-32, 1087 LA Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/ijburg",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT De Pijp & Rivierenbuurt",
        type: "basis",
        positie: { lat: 52.3534, lng: 4.8983 },
        adres: "2e Jan van der Heijdenstraat 75-77, 1074 XR Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/depijprivierenbuurt",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Buitenveldert & Zuidas",
        type: "basis",
        positie: { lat: 52.3314, lng: 4.8781 },
        adres: "A.J. Ernststraat 112, 1082 LP Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/buitenveldertzuidas",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Bijlmer Centrum",
        type: "basis",
        positie: { lat: 52.3117, lng: 4.9478 },
        adres: "Bijlmerdreef 1005 C, 1103 TW Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/bijlmercentrum",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Bijlmer Oost",
        type: "basis",
        positie: { lat: 52.3117, lng: 4.9578 },
        adres: "Bijlmerdreef 1005 C, 1103 TW Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/bijlmeroost",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Gaasperdam",
        type: "basis",
        positie: { lat: 52.2989, lng: 4.9789 },
        adres: "Reigersbos 309, 1107 EZ Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/gaasperdam",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Watergraafsmeer",
        type: "basis",
        positie: { lat: 52.3605, lng: 4.9284 },
        adres: "Pontanusstraat 278, 1093 SH Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/watergraafsmeer",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Bos en Lommer",
        type: "basis",
        positie: { lat: 52.3789, lng: 4.8566 },
        adres: "Tijl Uilenspiegelstraat 12, 1055 CK Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/bosenlommer",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Oud West & De Baarsjes",
        type: "basis",
        positie: { lat: 52.3665, lng: 4.8644 },
        adres: "Brederodestraat 108, 1054 VH Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/oudwestdebaarsjes",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Westerpark",
        type: "basis",
        positie: { lat: 52.3897, lng: 4.8711 },
        adres: "Revaleiland 1, 1014 ZG Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/westerpark",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Zuid",
        type: "basis",
        positie: { lat: 52.3534, lng: 4.8583 },
        adres: "Theophile de Bockstraat 100 E, 1058 VC Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/zuid",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Weesp & Driemond",
        type: "basis",
        positie: { lat: 52.3075, lng: 5.0428 },
        adres: "C J van Houtenlaan 1G, 1381 CN Weesp",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/weespdriemond",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Geuzenveld & Slotermeer",
        type: "basis",
        positie: { lat: 52.3789, lng: 4.8066 },
        adres: "Slotermeerlaan 103f, 1063 JN Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/geuzenveldslotermeer",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Osdorp",
        type: "basis",
        positie: { lat: 52.3601, lng: 4.7945 },
        adres: "Evertsweertplantsoen 3-A, 1069 RK Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/osdorp",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT De Aker & Nieuw-Sloten",
        type: "basis",
        positie: { lat: 52.3601, lng: 4.7945 },
        adres: "Evertsweertplantsoen 3-A, 1069 RK Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/deakernieuwsloten",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "OKT Slotervaart",
        type: "basis",
        positie: { lat: 52.3642, lng: 4.8307 },
        adres: "August Allebéplein 11, 1062 AA Amsterdam",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl/slotervaart",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg"
    },
    {
        naam: "iHub",
        type: "gespecialiseerd",
        positie: { lat: 52.3401, lng: 4.8567 },
        adres: "Anthony Fokkerweg 61, 1059 CP Amsterdam",
        telefoon: "088-1341000",
        website: "https://ihub.nu/",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, autisme, ADHD, gedragsproblemen"
    },
    {
        naam: "Family Supporters",
        type: "gespecialiseerd",
        positie: { lat: 52.3397, lng: 4.8568 },
        adres: "Anthony Fokkerweg 69, 1059 CP Amsterdam",
        telefoon: "020-2258000",
        website: "https://www.familysupporters.nl/",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, systeemtherapie, gezinsbehandeling"
    },
    {
        naam: "PsyGRO",
        type: "gespecialiseerd",
        positie: { lat: 52.3576, lng: 4.8905 },
        adres: "Overtoom 538-540, 1054 LL Amsterdam",
        telefoon: "020-6122411",
        website: "https://www.psygro.nl/",
        leeftijd: "4-18 jaar",
        specialisaties: "Jeugd GGZ, angst, depressie, trauma"
    },
    {
        naam: "Invivo Kids",
        type: "gespecialiseerd",
        positie: { lat: 52.3492, lng: 4.8569 },
        adres: "Johan Huizingalaan 763a, 1066 VH Amsterdam",
        telefoon: "020-4080902",
        website: "https://www.invivokids.nl/",
        leeftijd: "0-18 jaar",
        specialisaties: "Jeugd GGZ, ontwikkelingsproblematiek, gedragsproblemen"
    },
    {
        naam: "Youz",
        type: "gespecialiseerd",
        positie: { lat: 52.3397, lng: 4.8731 },
        adres: "Transformatorweg 6, 1014 AK Amsterdam",
        telefoon: "088-3588888",
        website: "https://youz.nl/",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, verslaving, gedragsproblemen, autisme"
    },
    {
        naam: "Leveo",
        type: "gespecialiseerd",
        positie: { lat: 52.3576, lng: 4.8889 },
        adres: "Overtoom 435-437, 1054 KE Amsterdam",
        telefoon: "020-6122675",
        website: "https://www.leveo.nl/",
        leeftijd: "4-18 jaar",
        specialisaties: "Jeugd GGZ, angst, depressie, trauma"
    },
    {
        naam: "Stichting JA",
        type: "gespecialiseerd",
        positie: { lat: 52.3548, lng: 4.9177 },
        adres: "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam",
        telefoon: "020-6659593",
        website: "https://www.stichtingja.nl/",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, gezinstherapie, traumabehandeling"
    },
    {
        naam: "MOC 't Kabouterhuis",
        type: "gespecialiseerd",
        positie: { lat: 52.3481, lng: 4.8568 },
        adres: "Amsteldijk 196, 1079 LK Amsterdam",
        telefoon: "020-6445351",
        website: "https://www.kabouterhuis.nl/",
        leeftijd: "0-7 jaar",
        specialisaties: "Jeugd GGZ, ontwikkelingsproblematiek, gedragsproblemen, gezinsbehandeling"
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
    'Ouder- en Kindteam': '#4CAF50',
    'Basis GGZ': '#FFC107',
    'Gespecialiseerde GGZ': '#FF5722',
    'Hoogspecialistische Zorg': '#E91E63'
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
            return '#E91E63'; // Roze voor hoogspecialistische zorg
        default:
            return '#9E9E9E'; // Grijs voor overige
    }
}

// Functie om zorginstellingen te sorteren op naam
function sorteerInstellingen(instellingen) {
    return [...instellingen].sort((a, b) => a.naam.localeCompare(b.naam));
}

// Functie om zorginstellingen tabel te vullen
function vulZorginstellingenTabel(instellingen, isGefilterd = false) {
    const tbody = document.querySelector(isGefilterd ? '#gefilterde-zorginstellingen-tabel tbody' : '#zorginstellingen-tabel tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    // Sorteer de instellingen alfabetisch
    const gesorteerdeInstellingen = sorteerInstellingen(instellingen);

    gesorteerdeInstellingen.forEach(instelling => {
        const isOKT = instelling.naam.toLowerCase().includes('okt');
        const kleur = bepaalKleur(instelling.type, isOKT);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${instelling.naam}</td>
            <td>
                <div class="type-indicator">
                    <span style="background: ${kleur};"></span>
                    ${instelling.type}
                </div>
            </td>
            <td>${instelling.adres}</td>
            <td><a href="tel:${instelling.telefoon}">${instelling.telefoon}</a></td>
            <td>${instelling.leeftijd}</td>
            <td>${instelling.specialisaties}</td>
            <td><a href="${instelling.website}" target="_blank" rel="noopener noreferrer">Website</a></td>
        `;
        tbody.appendChild(row);
    });

    // Update resultaten teller
    const resultatenTeller = document.getElementById('resultaten-teller');
    if (resultatenTeller) {
        resultatenTeller.textContent = `${instellingen.length} ${instellingen.length === 1 ? 'resultaat' : 'resultaten'} gevonden`;
    }
}

// Wacht tot het document geladen is
document.addEventListener('DOMContentLoaded', function() {
    const { isKaartPagina, isOverzichtPagina } = bepaalPagina();
    
    if (isKaartPagina) {
        // Wacht tot de Google Maps API is geladen
        if (window.google && window.google.maps) {
            initMap();
        } else {
            window.initMap = initializeMap;
        }
    }
    
    // Als we op de overzichtpagina zijn
    if (isOverzichtPagina) {
        // Vul initieel alle zorginstellingen
        const alleInstellingen = filterZorginstellingenOpType('alle');
        vulZorginstellingenTabel(alleInstellingen, false);
        
        // Initialiseer de tabs
        initializeTabs();
        
        // Update de resultaten teller
        const resultatenTeller = document.getElementById('resultaten-teller');
        if (resultatenTeller) {
            resultatenTeller.textContent = `${alleInstellingen.length} resultaten gevonden`;
        }
    }
});

// Functie om de kaart te initialiseren (wordt aangeroepen door de Google Maps API)
function initMap() {
    console.log('initMap wordt aangeroepen');
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Kaart element niet gevonden');
        return;
    }

    // Centreer de kaart op Amsterdam
    const amsterdam = { lat: 52.3676, lng: 4.9041 };
    
    // Basis kaart opties
    const mapOptions = {
        zoom: 12,
        center: amsterdam,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        fullscreenControl: true
    };

    try {
        // Maak de kaart aan
        map = new google.maps.Map(mapElement, mapOptions);
        
        // Log succesvol maken van de kaart
        console.log('Kaart succesvol aangemaakt');
        
        // Voeg markers en legenda toe nadat de kaart is geladen
        google.maps.event.addListenerOnce(map, 'idle', function() {
            console.log('Kaart is geladen, markers worden toegevoegd');
            voegMarkersToe(zorginstellingenData);
            voegLegendaToe();
        });
    } catch (error) {
        console.error('Fout bij het maken van de kaart:', error);
    }
}

// Maak initMap beschikbaar in het window object voor de callback
window.initMap = initMap;

// Functie om de legenda toe te voegen
function voegLegendaToe() {
    if (legendaToegevoegd || !map) return;

    const legendaDiv = document.createElement('div');
    legendaDiv.className = 'legenda-container';
    legendaDiv.innerHTML = `
        <div class="legenda">
            <h3>Type zorginstelling</h3>
            <div class="legenda-item">
                <span style="background: #4CAF50"></span>
                <span>Ouder- en Kindteam (OKT)</span>
            </div>
            <div class="legenda-item">
                <span style="background: #FFC107"></span>
                <span>Basis GGZ</span>
            </div>
            <div class="legenda-item">
                <span style="background: #FF5722"></span>
                <span>Gespecialiseerde GGZ</span>
            </div>
            <div class="legenda-item">
                <span style="background: #E91E63"></span>
                <span>Hoogspecialistische zorg</span>
            </div>
        </div>
    `;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(legendaDiv);
    legendaToegevoegd = true;
}

// Functie om markers toe te voegen
function voegMarkersToe(zorginstellingen) {
    // Verwijder bestaande markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    zorginstellingen.forEach(instelling => {
        const isOKT = instelling.naam.toLowerCase().includes('okt');
        const kleur = bepaalKleur(instelling.type, isOKT);
        
        const marker = new google.maps.Marker({
            position: { 
                lat: parseFloat(instelling.positie.lat), 
                lng: parseFloat(instelling.positie.lng) 
            },
            map: map,
            title: instelling.naam,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: kleur,
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: '#ffffff',
                scale: 10
            }
        });

        // Info window content
        const contentString = `
            <div class="info-window">
                <h3>${instelling.naam}</h3>
                <p><strong>Type:</strong> ${instelling.type}</p>
                <p><strong>Adres:</strong> ${instelling.adres}</p>
                <p><strong>Telefoon:</strong> <a href="tel:${instelling.telefoon}">${instelling.telefoon}</a></p>
                <p><strong>Leeftijd:</strong> ${instelling.leeftijd}</p>
                <p><strong>Specialisaties:</strong> ${instelling.specialisaties}</p>
                ${instelling.website ? `<p><strong>Website:</strong> <a href="${instelling.website}" target="_blank">Bezoek website</a></p>` : ''}
            </div>
        `;

        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 300
        });

        // Sluit het huidige infowindow als er een open is
        marker.addListener('click', () => {
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infowindow.open(map, marker);
            currentInfoWindow = infowindow;
        });

        markers.push(marker);
    });
}

// Functie om de kaart te updaten met gefilterde resultaten
function updateKaart(gefilterd = false) {
    const zorginstellingen = gefilterd ? filterZorginstellingenOpType(gefilterd) : zorginstellingenData;
    voegMarkersToe(zorginstellingen);
}

// Functie om zorginstellingen te filteren op type
function filterZorginstellingenOpType(type) {
    if (type === 'alle') return zorginstellingenData;
    
    return zorginstellingenData.filter(instelling => {
        const isOKT = instelling.naam.toLowerCase().includes('okt');
        
        switch(type) {
            case 'okt':
                return isOKT;
            case 'basis':
                return instelling.type.toLowerCase() === 'basis' && !isOKT;
            case 'gespecialiseerd':
                return instelling.type.toLowerCase() === 'gespecialiseerd';
            case 'hoogspecialistisch':
                return instelling.type.toLowerCase() === 'hoogspecialistisch';
            default:
                return true;
        }
    });
}

// Functie om tabs te beheren
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    if (!tabButtons.length) return; // Als we niet op de overzichtspagina zijn
    
    // Vul initieel de 'alle' tab
    const alleInstellingen = filterZorginstellingenOpType('alle');
    vulZorginstellingenTabel(alleInstellingen, false);
    updateResultatenTeller(alleInstellingen.length);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Verwijder active class van alle buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Voeg active class toe aan geklikte button
            button.classList.add('active');
            
            // Filter en toon zorginstellingen
            const type = button.dataset.tab;
            const gefilterd = filterZorginstellingenOpType(type);
            vulZorginstellingenTabel(gefilterd, false);
            updateResultatenTeller(gefilterd.length);
        });
    });
}

// Helper functie voor het updaten van de resultaten teller
function updateResultatenTeller(aantal) {
    const resultatenTeller = document.getElementById('resultaten-teller');
    if (resultatenTeller) {
        resultatenTeller.textContent = `${aantal} ${aantal === 1 ? 'resultaat' : 'resultaten'} gevonden`;
    }
}

// Functie voor het zoeken van zorginstellingen
function zoekZorginstellingen() {
    const typeFilter = document.getElementById('type-filter');
    const leeftijdFilter = document.getElementById('leeftijd-filter');
    
    const zorgtype = typeFilter ? typeFilter.value : 'alle';
    const leeftijd = leeftijdFilter ? leeftijdFilter.value : 'alle';

    // Filter zorginstellingen op basis van criteria
    const gefilterd = zorginstellingenData.filter(instelling => {
        const matchType = zorgtype === '' || instelling.type.toLowerCase().includes(zorgtype);
        
        let matchLeeftijd = true;
        if (leeftijd !== '') {
            const [zoekMin, zoekMax] = leeftijd.split('-').map(Number);
            const [instMin, instMax] = instelling.leeftijd.split(/[- ]/)[0].split('-').map(Number);
            matchLeeftijd = (zoekMin >= instMin && zoekMin <= instMax) || 
                          (zoekMax >= instMin && zoekMax <= instMax) ||
                          (zoekMin <= instMin && zoekMax >= instMax);
        }

        return matchType && matchLeeftijd;
    });

    // Update de kaart en tabel met gefilterde resultaten
    voegMarkersToe(gefilterd);
    vulZorginstellingenTabel(gefilterd, true);
}

// Functie om te bepalen op welke pagina we zijn
function bepaalPagina() {
    const isKaartPagina = document.querySelector('.kaart-pagina') !== null;
    const isOverzichtPagina = document.querySelector('.overzicht-pagina') !== null;
    return { isKaartPagina, isOverzichtPagina };
} 