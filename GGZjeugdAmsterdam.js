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
        type: "gespecialiseerd",
        positie: { lat: 52.3481, lng: 4.8568 },
        adres: "Amsteldijk 196, 1079 LK Amsterdam",
        telefoon: "088-0547001",
        website: "https://www.levvel.nl/formulier/jongere-aanmelden",
        leeftijd: "0-18 jaar",
        specialisaties: "TOPggz: DAT (Dwang, angst en tics), trauma en gezin, complexe gedragsstoornissen en forensische jeugdpsychiatrie"
    },
    {
        naam: "Arkin Jeugd & Gezin",
        type: "gespecialiseerd",
        positie: { lat: 52.3637, lng: 4.8562 },
        adres: "Baarsjesweg 224, 1058 AA Amsterdam",
        telefoon: "020-5905555",
        website: "https://arkinjeugdengezin.nl/verwijzers/client-verwijzen/",
        leeftijd: "0-23 jaar",
        specialisaties: "Gezinstherapie, eetstoornissen, angst",
        locaties: [
            {
                naam: "West",
                adres: "Baarsjesweg 224, 1058 AA Amsterdam",
                positie: { lat: 52.3637, lng: 4.8562 }
            },
            {
                naam: "Diemen",
                adres: "Wisselwerking 46-48, 1112 XR Diemen",
                positie: { lat: 52.3348, lng: 4.9561 }
            },
            {
                naam: "Noord",
                adres: "Klaprozenweg 111, 1033 NN Amsterdam",
                positie: { lat: 52.3912, lng: 4.8914 }
            },
            {
                naam: "Zuidoost",
                adres: "Bijlmerdreef 1169, 1103 TT Amsterdam Zuidoost",
                positie: { lat: 52.3221158, lng: 4.9732716 }
            }
        ]
    },
    {
        naam: "iHUB Familiezorg",
        type: "gespecialiseerd, Basis GGZ",
        positie: { lat: 52.3912, lng: 4.8914 },
        adres: "Klaprozenweg 111, 1033 NN Amsterdam",
        telefoon: "020-4444444",
        website: "https://www.ihubfamiliezorg.nl",
        aanmelden: "https://www.ihub.nl/aanmelden",
        leeftijd: "0-18 jaar",
        specialisaties: "Gezinstherapie, systeemtherapie, enkelvoudige specialistische jeugdhulp, Jeugd GGZ, autisme, ADHD, gedragsproblemen, familiezorg, meervoudige complexe problematiek"
    },
    {
        naam: "GGZ inGeest Jeugd",
        type: "gespecialiseerd",
        positie: { lat: 52.3583, lng: 4.8181 },
        adres: "Willem van Outhoornstraat 12, 1067 HN Amsterdam",
        telefoon: "020-7884666",
        website: "https://www.ggzingeest.nl/jong",
        leeftijd: "12-23 jaar",
        specialisaties: "Stemmingsstoornissen, psychose, persoonlijkheidsproblematiek"
    },
    {
        naam: "OKT Amsterdam",
        type: "basis",
        telefoon: "020-5555961",
        website: "https://oktamsterdam.nl",
        leeftijd: "0-23 jaar",
        specialisaties: "Opvoedondersteuning, jeugdhulp, preventieve zorg",
        locaties: [
            {
                naam: "Centrum West",
                positie: { lat: 52.3784, lng: 4.8837 },
                adres: "Lindengracht 204, 1015 KL Amsterdam",
                website: "https://oktamsterdam.nl/centrum"
            },
            {
                naam: "Centrum Oost",
                positie: { lat: 52.3765, lng: 4.9123 },
                adres: "Kraijenhoffstraat 32, 1018 RL Amsterdam",
                website: "https://oktamsterdam.nl/centrum"
            },
            {
                naam: "Noord Oost",
                positie: { lat: 52.3918, lng: 4.9322 },
                adres: "Beverwijkstraat 3, 1024 VR Amsterdam",
                website: "https://oktamsterdam.nl/noordoost"
            },
            {
                naam: "Oud Noord",
                positie: { lat: 52.3892, lng: 4.9212 },
                adres: "Wingerdweg 52, 1032 AN Amsterdam",
                website: "https://oktamsterdam.nl/oudnoord"
            },
            {
                naam: "Noord West",
                positie: { lat: 52.4011, lng: 4.9123 },
                adres: "Aldebaranplein 2-F, 1033 GS Amsterdam",
                website: "https://oktamsterdam.nl/noordwest"
            },
            {
                naam: "Oud Oost",
                positie: { lat: 52.3605, lng: 4.9284 },
                adres: "Pontanusstraat 278, 1093 SH Amsterdam",
                website: "https://oktamsterdam.nl/oudoost"
            },
            {
                naam: "Indische Buurt & Oostelijk Havengebied",
                positie: { lat: 52.3605, lng: 4.9436 },
                adres: "Kramatplantsoen 101, 1095 LB Amsterdam",
                website: "https://oktamsterdam.nl/iboh"
            },
            {
                naam: "IJburg & Zeeburgereiland",
                positie: { lat: 52.3534, lng: 4.9983 },
                adres: "Pampuslaan 26-32, 1087 LA Amsterdam",
                website: "https://oktamsterdam.nl/ijburg"
            },
            {
                naam: "De Pijp & Rivierenbuurt",
                positie: { lat: 52.3534, lng: 4.8983 },
                adres: "2e Jan van der Heijdenstraat 75-77, 1074 XR Amsterdam",
                website: "https://oktamsterdam.nl/depijprivierenbuurt"
            },
            {
                naam: "Buitenveldert & Zuidas",
                positie: { lat: 52.3314, lng: 4.8781 },
                adres: "A.J. Ernststraat 112, 1082 LP Amsterdam",
                website: "https://oktamsterdam.nl/buitenveldertzuidas"
            },
            {
                naam: "Bijlmer Centrum",
                positie: { lat: 52.3117, lng: 4.9478 },
                adres: "Bijlmerdreef 1005 C, 1103 TW Amsterdam",
                website: "https://oktamsterdam.nl/bijlmercentrum"
            },
            {
                naam: "Bijlmer Oost",
                positie: { lat: 52.3117, lng: 4.9578 },
                adres: "Bijlmerdreef 1005 C, 1103 TW Amsterdam",
                website: "https://oktamsterdam.nl/bijlmeroost"
            },
            {
                naam: "Gaasperdam",
                positie: { lat: 52.2989, lng: 4.9789 },
                adres: "Reigersbos 309, 1107 EZ Amsterdam",
                website: "https://oktamsterdam.nl/gaasperdam"
            },
            {
                naam: "Watergraafsmeer",
                positie: { lat: 52.3605, lng: 4.9284 },
                adres: "Pontanusstraat 278, 1093 SH Amsterdam",
                website: "https://oktamsterdam.nl/watergraafsmeer"
            },
            {
                naam: "Bos en Lommer",
                positie: { lat: 52.3789, lng: 4.8566 },
                adres: "Tijl Uilenspiegelstraat 12, 1055 CK Amsterdam",
                website: "https://oktamsterdam.nl/bosenlommer"
            },
            {
                naam: "Oud West & De Baarsjes",
                positie: { lat: 52.3665, lng: 4.8644 },
                adres: "Brederodestraat 108, 1054 VH Amsterdam",
                website: "https://oktamsterdam.nl/oudwestdebaarsjes"
            },
            {
                naam: "Westerpark",
                positie: { lat: 52.3897, lng: 4.8711 },
                adres: "Revaleiland 1, 1014 ZG Amsterdam",
                website: "https://oktamsterdam.nl/westerpark"
            },
            {
                naam: "Zuid",
                positie: { lat: 52.3534, lng: 4.8583 },
                adres: "Theophile de Bockstraat 100 E, 1058 VC Amsterdam",
                website: "https://oktamsterdam.nl/zuid"
            },
            {
                naam: "Weesp & Driemond",
                positie: { lat: 52.3075, lng: 5.0428 },
                adres: "C J van Houtenlaan 1G, 1381 CN Weesp",
                website: "https://oktamsterdam.nl/weespdriemond"
            },
            {
                naam: "Geuzenveld & Slotermeer",
                positie: { lat: 52.3789, lng: 4.8066 },
                adres: "Slotermeerlaan 103f, 1063 JN Amsterdam",
                website: "https://oktamsterdam.nl/geuzenveldslotermeer"
            },
            {
                naam: "Osdorp",
                positie: { lat: 52.3601, lng: 4.7945 },
                adres: "Evertsweertplantsoen 3-A, 1069 RK Amsterdam",
                website: "https://oktamsterdam.nl/osdorp"
            },
            {
                naam: "De Aker & Nieuw-Sloten",
                positie: { lat: 52.3601, lng: 4.7945 },
                adres: "Evertsweertplantsoen 3-A, 1069 RK Amsterdam",
                website: "https://oktamsterdam.nl/deakernieuwsloten"
            },
            {
                naam: "Slotervaart",
                positie: { lat: 52.3642, lng: 4.8307 },
                adres: "August Allebéplein 11, 1062 AA Amsterdam",
                website: "https://oktamsterdam.nl/slotervaart"
            }
        ]
    },
    {
        naam: "iHub",
        type: "gespecialiseerd",
        telefoon: "088-1341000",
        website: "https://ihub.nu/",
        aanmelden: "https://www.ihub.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, autisme, ADHD, gedragsproblemen, familiezorg, meervoudige complexe problematiek",
        locaties: [
            {
                naam: "iHub familiezorg West",
                positie: { lat: 52.3637, lng: 4.8562 },
                adres: "Dekinderenstraat 22, 1062DB, Amsterdam",
                telefoon: "020 5558300",
                website: "https://www.ihub.nl/locaties/familiezorg-amsterdam-west",
            },
            {
                naam: "iHub Care Express",
                positie: { lat: 52.3665, lng: 4.8789 },
                adres: "Nassaukade 162HS, 1053 LL, Amsterdam",
                telefoon: "020 5558300",
                website: "https://www.ihub.nl/locaties/care-express",
            },
            {
                naam: "iHub familiezorg Oost",
                positie: { lat: 52.3605, lng: 4.9284 },
                adres: "Eerste van Swindenstraat 555, 1093LC, Amsterdam",
                telefoon: "020 5558300",
                website: "https://www.ihub.nl/locaties/familiezorg-amsterdam-oost", 
            },
            {
                naam: "iHub familiezorg Noord",
                positie: { lat: 52.3912, lng: 4.8914 },
                adres: "Rode Kruisstraat 32, 1025KN, Amsterdam",
                telefoon: "020 5558300",
                website: "https://www.ihub.nl/locaties/familiezorg-amsterdam-noord",
            },
            {
                naam: "iHub familiezorg Zuidoost",
                positie: { lat: 52.3117, lng: 4.9478 },
                adres: "Hofgeest 341, 1102 ER, Amsterdam",
                telefoon: "020 5558300",
                website: "https://www.ihub.nl/locaties/familiezorg-amsterdam-zuidoost",
            }
        ]
    },
    {
        naam: "Family Supporters",
        type: "gespecialiseerd",
        positie: { lat: 52.3889, lng: 4.8876 },
        adres: "Houtmankade 332, 1013 RR Amsterdam",
        telefoon: "020-2371781",
        website: "https://www.familysupporters.nl/",
        verwijzing: "https://www.familysupporters.nl/verwijzen/",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, systeemtherapie, gezinsbehandeling"
    },
    {
        naam: "PsyGRO",
        type: "gespecialiseerd",
        positie: { lat: 52.3076, lng: 4.8573 },
        adres: "Doctor Willem Dreesweg 2, 1185 VB Amstelveen",
        telefoon: "0299-607459",
        website: "https://www.psygro.nl/",
        verwijzing: "https://inter-psy.nl/verwijzers/",
        leeftijd: "4-18 jaar",
        specialisaties: "Jeugd GGZ, angst, depressie, trauma"
    },
    {
        naam: "Invivo Kids",
        type: "gespecialiseerd, Basis GGZ",
        positie: { lat: 52.3076, lng: 4.8573 },
        adres: "Veenplaats 19, 1182JW Amstelveen",
        telefoon: "020-7670069",
        website: "https://www.invivokids.nl/",
        aanmelden: "https://www.invivokids.nl/voor-u/voor-verwijzers/",
        leeftijd: "0-18 jaar",
        specialisaties: "Jeugd GGZ, ontwikkelingsproblematiek, gedragsproblemen"
    },
    {
        naam: "Youz",
        type: "gespecialiseerd",
        positie: { lat: 52.3583, lng: 4.8481 },
        adres: "Overschiestraat 57, 1062HN Amsterdam",
        telefoon: "088-3588330",
        website: "https://youz.nl/",
        aanmelden: "https://www.youz.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, verslaving, gedragsproblemen, autisme"
    },
    {
        naam: "Carehouse",
        type: "gespecialiseerd",
        positie: { lat: 52.3812, lng: 4.8676 },
        adres: "Van Hallstraat 10, 1051HH Amsterdam",
        telefoon: "088-1232660",
        website: "https://www.carehouse.nl/",
        aanmelden: "https://www.carehouse.nl/aanmelden",
        leeftijd: "4-18 jaar",
        specialisaties: "Jeugd GGZ, angst, depressie, trauma, enkelvoudige specialistische jeugdhulp"
    },
    {
        naam: "Stichting JA",
        type: "gespecialiseerd, Basis GGZ",
        positie: { lat: 52.3605, lng: 4.9184 },
        adres: "Eerste Oosterparkstraat 88, 1091 GZ Amsterdam",
        telefoon: "020-6659593",
        website: "https://www.stichtingja.nl/",
        aanmelden: "https://www.stichtingja.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, gezinstherapie, traumabehandeling, psychosociaal functioneren, gezin en opvoeding"
    },
    {
        naam: "MOC 't Kabouterhuis",
        type: "gespecialiseerd",
        website: "https://www.kabouterhuis.nl",
        aanmelden: "https://www.kabouterhuis.nl/aanmelden",
        leeftijd: "0-7 jaar",
        specialisaties: "Ontwikkelingsproblemen, gedragsproblemen, opvoedingsproblemen, psychiatrische problemen, medisch orthopedagogische dagbehandeling",
        locaties: [
            {
                naam: "Zuid",
                positie: { lat: 52.3556, lng: 4.9167 },
                telefoon: "020-6445351",
                adres: "Amsteldijk 196, 1079 LK Amsterdam"
            },
            {
                naam: "West",
                positie: { lat: 52.3637, lng: 4.8562 },
                telefoon: "020-6138585",
                adres: "Albardagracht 1, 1063 NN Amsterdam"
            },
            {
                naam: "Noord",
                positie: { lat: 52.3912, lng: 4.8914 },
                telefoon: "020-6304630",
                adres: "Kopjachtplein 20, 1034 JG Amsterdam"
            },
            {
                naam: "Zuid-oost",
                positie: { lat: 52.3117, lng: 4.9478 },
                telefoon: "020-4530191",
                adres: "Leksmondplein 28, 1108 EL Amsterdam"
            }
        ]
    },
    {
        naam: "STEP",
        type: "Basis GGZ",
        positie: { lat: 52.3625, lng: 4.9143 },
        adres: "Amsterdam",
        website: "https://stepjeugdhulp.nl",
        aanmelden: "https://stepjeugdhulp.nl/#aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Enkelvoudige specialistische jeugdhulp"
    },
    {
        naam: "RIOzorg Amsterdam Zuidoost",
        type: "Basis GGZ",
        positie: { lat: 52.3117, lng: 4.9478 },
        adres: "Bijlmerdreef 1001-A, 1103 TW Amsterdam",
        telefoon: "026 820 02 08",
        website: "https://riozorg.nl/locatie/amsterdam-zuidoost-en-weesp/",
        aanmelden: "https://riozorg.nl/aanmelden",
        leeftijd: "4-18 jaar",
        specialisaties: "Concentratieproblemen, AD(H)D, Gedragsproblemen, Autisme, Trauma, Angst, Tics, Dwang, Somberheid",
        bijzonderheden: [
            "Alleen BGGZ trajecten mogelijk op deze locatie",
            "Behandeling kan fysiek of online",
            "Locatie bevindt zich in GC Klein Gooioord op de 1e verdieping",
            "Wachtruimte/grote tafel direct bovenaan de trap"
        ],
        email: "info@riozorg.nl",
        hoofdkantoren: "Arnhem, Amersfoort, Den Haag"
    },
    {
        naam: "RIOzorg Weesp",
        type: "Basis GGZ",
        positie: { lat: 52.3075, lng: 5.0428 },
        adres: "C.J. van Houtenlaan 1G, 1381 CN Weesp",
        telefoon: "026 820 02 08",
        website: "https://riozorg.nl/locatie/amsterdam-zuidoost-en-weesp/",
        aanmelden: "https://riozorg.nl/aanmelden",
        leeftijd: "4-18 jaar",
        specialisaties: "Concentratieproblemen, AD(H)D, Gedragsproblemen, Autisme, Trauma, Angst, Tics, Dwang, Somberheid",
        bijzonderheden: [
            "Alleen BGGZ trajecten mogelijk op deze locatie",
            "Behandeling kan fysiek of online",
            "Locatie bevindt zich in Gezondheidscentrum Aetsveld"
        ],
        email: "info@riozorg.nl",
        hoofdkantoren: "Arnhem, Amersfoort, Den Haag"
    },
    {
        naam: "Leger des Heils",
        type: "gespecialiseerd",
        positie: { lat: 52.3925, lng: 4.9214 },
        adres: "Hilversumstraat 338, 1024MB Amsterdam",
        telefoon: "088-0654825",
        website: "https://www.legerdesheils.nl/zorg/jongleren/amsterdam/jongeren-ambulant-amsterdam",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugdzorg, maatschappelijke ondersteuning, complexe problematiek"
    },
    {
        naam: "Philadelphia",
        type: "gespecialiseerd",
        positie: { lat: 52.3472, lng: 4.9112 },
        adres: "Jekerstraat 84, 1078MG Amsterdam",
        telefoon: "088-0830",
        website: "https://www.philadelphia.nl",
        aanmelden: "https://www.philadelphia.nl/aanmelden",
        leeftijd: "0-19 jaar",
        specialisaties: "Jeugdzorg, verstandelijke beperking, ontwikkelingsproblematiek"
    },
    {
        naam: "Boomerang Zorg Jeugdhulp",
        type: "gespecialiseerd",
        positie: { lat: 52.3912, lng: 4.8543 },
        adres: "Tijnmuiden 34, 1046AL, Amsterdam",
        telefoon: "020-3586739",
        website: "https://www.boomerangzorg.nl",
        aanmelden: "https://www.boomerangzorg.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugdhulp, gezinsbehandeling, samenwerking Boomerang Zorg en Multi Plus Zorg"
    },
    {
        naam: "Fibbe",
        type: "gespecialiseerd",
        positie: { lat: 52.3123, lng: 4.9467 },
        adres: "Johan Cruijff Boulevard 83, 1101DM, Amsterdam",
        telefoon: "0623744058",
        website: "https://fibbescl.nl",
        aanmelden: "https://fibbescl.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugd GGZ, gezinstherapie, traumabehandeling"
    },
    {
        naam: "Timon",
        type: "gespecialiseerd",
        positie: { lat: 52.4012, lng: 4.9217 },
        adres: "Modemstraat 20C, 1033 RW Amsterdam",
        telefoon: "06-11793785",
        website: "https://www.timon.nl",
        aanmelden: "https://www.timon.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugdhulp, pleegzorg, gezinsbegeleiding"
    },
    {
        naam: "Groei&glunder",
        type: "gespecialiseerd",
        positie: { lat: 52.3889, lng: 4.8876 },
        adres: "Houtmankade 334-2, 1013 RR Amsterdam",
        telefoon: "020-2615085",
        website: "https://www.groeienglunder.nl",
        aanmelden: "https://www.groeienglunder.nl/aanmelden",
        leeftijd: "0-23 jaar",
        specialisaties: "Jeugdhulp, ontwikkelingsstimulering, gedragsondersteuning"
    },
    {
        naam: "Terminal 18",
        type: "gespecialiseerd",
        positie: { lat: 52.3726, lng: 4.8584 },
        adres: "Admiraal de Ruijterweg 454, 1055NG Amsterdam",
        telefoon: "020-3088717",
        website: "https://www.terminal18.nl",
        aanmelden: "https://www.terminal18.nl/aanmelden",
        leeftijd: "12-18 jaar",
        specialisaties: "Jeugdhulp, jongerencoaching, toekomstbegeleiding"
    },
    {
        naam: "Zigzag Kindzorg",
        type: "gespecialiseerd",
        telefoon: "085-2381729",
        website: "https://www.zigzagkindzorg.nl",
        aanmelden: "https://www.zigzagkindzorg.nl/aanmeldprocedure",
        leeftijd: "0-18 jaar",
        specialisaties: "Kindzorg, ontwikkelingsondersteuning, gezinsbegeleiding",
        locaties: [
            {
                naam: "Zuid",
                positie: { lat: 52.3481, lng: 4.8568 },
                adres: "Amsteldijk 196, 1079 LK Amsterdam",
                telefoon: "085-2381729"
            },
            {
                naam: "West",
                positie: { lat: 52.3637, lng: 4.8562 },
                adres: "Albardagracht 1, 1063 NN Amsterdam",
                telefoon: "085-2381729"
            }
        ]
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

    // Maak een platte lijst van alle instellingen en hun locaties
    const alleInstellingen = [];
    
    instellingen.forEach(instelling => {
        if (instelling.locaties) {
            // Voeg elke locatie toe als aparte rij
            instelling.locaties.forEach(locatie => {
                alleInstellingen.push({
                    naam: instelling.naam === "OKT Amsterdam" ? 
                        `OKT ${locatie.naam}` : 
                        `${instelling.naam} - ${locatie.naam}`,
                    type: instelling.type,
                    adres: locatie.adres,
                    telefoon: locatie.telefoon || instelling.telefoon,
                    leeftijd: instelling.leeftijd,
                    specialisaties: instelling.specialisaties,
                    website: locatie.website || instelling.website,
                    aanmelden: instelling.aanmelden
                });
            });
        } else {
            // Voor instellingen met één locatie
            alleInstellingen.push(instelling);
        }
    });

    // Sorteer de instellingen alfabetisch
    const gesorteerdeInstellingen = sorteerInstellingen(alleInstellingen);

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
            <td>${instelling.adres || 'Adres niet beschikbaar'}</td>
            <td>${instelling.telefoon ? `<a href="tel:${instelling.telefoon.replace(/[^0-9+]/g, '')}">${instelling.telefoon}</a>` : 'Telefoon niet beschikbaar'}</td>
            <td>${instelling.leeftijd || 'Niet gespecificeerd'}</td>
            <td>${instelling.specialisaties || 'Niet gespecificeerd'}</td>
            <td>
                <div class="actie-knoppen">
                    ${instelling.website ? 
                        `<a href="${instelling.website}" target="_blank" rel="noopener noreferrer" class="knop website-knop">Website</a>` 
                        : ''}
                    ${instelling.aanmelden ? 
                        `<a href="${instelling.aanmelden}" target="_blank" rel="noopener noreferrer" class="knop aanmeld-knop">Aanmelden</a>` 
                        : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update resultaten teller
    const resultatenTeller = document.getElementById('resultaten-teller');
    if (resultatenTeller) {
        resultatenTeller.textContent = `${alleInstellingen.length} ${alleInstellingen.length === 1 ? 'resultaat' : 'resultaten'} gevonden`;
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

// Combineer alle zorginstellingen in één array
const alleZorginstellingen = [...zorginstellingenData];

// Voeg de instellingen uit de eerste array toe als ze nog niet bestaan
zorginstellingen.forEach(instelling => {
    const bestaatAl = alleZorginstellingen.some(
        bestaand => bestaand.naam === instelling.naam && 
        bestaand.adres === instelling.adres
    );
    
    if (!bestaatAl) {
        alleZorginstellingen.push({
            ...instelling,
            type: instelling.type || 'basis'
        });
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
            voegMarkersToe(alleZorginstellingen);
            voegLegendaToe();
        });
    } catch (error) {
        console.error('Fout bij het maken van de kaart:', error);
    }
}

// Zorg ervoor dat initMap globaal beschikbaar is
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
        // Voor instellingen met locaties
        if (instelling.locaties) {
            instelling.locaties.forEach(locatie => {
                if (!locatie.positie || !locatie.positie.lat || !locatie.positie.lng) {
                    console.warn(`Geen geldige positie voor locatie: ${locatie.naam} van ${instelling.naam}`);
                    return;
                }

                const isOKT = instelling.naam.toLowerCase().includes('okt');
                const kleur = bepaalKleur(instelling.type, isOKT);

                const marker = new google.maps.Marker({
                    position: { 
                        lat: parseFloat(locatie.positie.lat), 
                        lng: parseFloat(locatie.positie.lng) 
                    },
                    map: map,
                    title: isOKT ? `OKT ${locatie.naam}` : `${instelling.naam} - ${locatie.naam}`,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: kleur,
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: '#ffffff',
                        scale: 10
                    }
                });

                // Info window content voor locatie
                const contentString = `
                    <div class="info-window">
                        <h3>${isOKT ? `OKT ${locatie.naam}` : `${instelling.naam} - ${locatie.naam}`}</h3>
                        <p><strong>Type:</strong> ${instelling.type}</p>
                        <p><strong>Adres:</strong> ${locatie.adres}</p>
                        <p><strong>Telefoon:</strong> <a href="tel:${locatie.telefoon}">${locatie.telefoon}</a></p>
                        <p><strong>Leeftijd:</strong> ${instelling.leeftijd}</p>
                        <p><strong>Specialisaties:</strong> ${instelling.specialisaties}</p>
                        ${locatie.website ? `<p><strong>Website:</strong> <a href="${locatie.website}" target="_blank">Bezoek website</a></p>` : 
                         instelling.website ? `<p><strong>Website:</strong> <a href="${instelling.website}" target="_blank">Bezoek website</a></p>` : ''}
                        ${instelling.aanmelden ? `<p><strong>Aanmelden:</strong> <a href="${instelling.aanmelden}" target="_blank">Direct aanmelden</a></p>` : ''}
                    </div>
                `;

                const infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });

                marker.addListener('click', () => {
                    if (currentInfoWindow) {
                        currentInfoWindow.close();
                    }
                    infowindow.open(map, marker);
                    currentInfoWindow = infowindow;
                });

                markers.push(marker);
            });
        } else {
            // Voor instellingen met één locatie
            if (!instelling.positie || !instelling.positie.lat || !instelling.positie.lng) {
                // Check of het adres meerdere locaties bevat
                if (instelling.adres && instelling.adres.includes(" en ")) {
                    // Split het adres en maak voor elke locatie een marker
                    const adressen = instelling.adres.split(" en ");
                    adressen.forEach(adres => {
                        // Hier zou je geocoding kunnen gebruiken om de positie te bepalen
                        // Voor nu slaan we deze over omdat we geen positie hebben
                        console.warn(`Geen positie beschikbaar voor extra locatie van ${instelling.naam}: ${adres}`);
                    });
                } else {
                    console.warn(`Geen geldige positie voor instelling: ${instelling.naam}`);
                }
                return;
            }

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

            const contentString = `
                <div class="info-window">
                    <h3>${instelling.naam}</h3>
                    <p><strong>Type:</strong> ${instelling.type}</p>
                    <p><strong>Adres:</strong> ${instelling.adres}</p>
                    <p><strong>Telefoon:</strong> <a href="tel:${instelling.telefoon}">${instelling.telefoon}</a></p>
                    <p><strong>Leeftijd:</strong> ${instelling.leeftijd}</p>
                    <p><strong>Specialisaties:</strong> ${instelling.specialisaties}</p>
                    ${instelling.website ? `<p><strong>Website:</strong> <a href="${instelling.website}" target="_blank">Bezoek website</a></p>` : ''}
                    ${instelling.aanmelden ? `<p><strong>Aanmelden:</strong> <a href="${instelling.aanmelden}" target="_blank">Direct aanmelden</a></p>` : ''}
                </div>
            `;

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300
            });

            marker.addListener('click', () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
                infowindow.open(map, marker);
                currentInfoWindow = infowindow;
            });

            markers.push(marker);
        }
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
