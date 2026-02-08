export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  itunesId?: string;
  metadataSearch?: string;
  lyricsOffset?: number;
}

function seededRandom(seed: number) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function deterministicShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const rnd = seededRandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const RAW_TRACKS: Track[] = [
  {
    "id": "4NRXx6U8ABQ",
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "duration": 262,
    "itunesId": "1488408163",
    "lyricsOffset": 21
  },
  {
    "id": "XXYlFuWEuKI",
    "title": "Save Your Tears",
    "artist": "The Weeknd",
    "duration": 248,
    "itunesId": "1550181035"
  },
  {
    "id": "H5v3kku4y6Q",
    "title": "As It Was",
    "artist": "Harry Styles",
    "duration": 167,
    "itunesId": "1615551350"
  },
  {
    "id": "G7KNmW9a75Y",
    "title": "Flowers",
    "artist": "Miley Cyrus",
    "duration": 200
  },
  {
    "id": "ic8j13piAhQ",
    "title": "Cruel Summer",
    "artist": "Taylor Swift",
    "duration": 178
  },
  {
    "id": "eVli-tstM5E",
    "title": "Espresso",
    "artist": "Sabrina Carpenter",
    "duration": 175
  },
  {
    "id": "629_M8W_DRE",
    "title": "Birds of a Feather",
    "artist": "Billie Eilish",
    "duration": 210
  },
  {
    "id": "t7bQwwqW-Bs",
    "title": "A Bar Song (Tipsy)",
    "artist": "Shaboozey",
    "duration": 171
  },
  {
    "id": "H58vbez_m4E",
    "title": "Not Like Us",
    "artist": "Kendrick Lamar",
    "duration": 274
  },
  {
    "id": "22tVWwmTie8",
    "title": "Houdini",
    "artist": "Eminem",
    "duration": 287
  },
  {
    "id": "efxiDBygvdg",
    "title": "Wish (feat. Trippie Redd)",
    "artist": "Diplo",
    "duration": 179
  },
  {
    "id": "c8zq4kAn_O0",
    "title": "back to friends",
    "artist": "sombr",
    "duration": 202
  },
  {
    "id": "SMvmAWECT8U",
    "title": "DEVIL IS A LIE",
    "artist": "Tommy Richman",
    "duration": 132
  },
  {
    "id": "QqzXvvdk3bQ",
    "title": "COMË N GO",
    "artist": "Yeat",
    "duration": 200
  },
  {
    "id": "Zf1d8SGuxfs",
    "title": "MILLION DOLLAR BABY",
    "artist": "Tommy Richman",
    "duration": 167
  },
  {
    "id": "EWdIElQUI_4",
    "title": "lalala",
    "artist": "bbno$, y2k",
    "duration": 166
  },
  {
    "id": "_VuJA-VQRcY",
    "title": "Doja",
    "artist": "Central Cee",
    "duration": 106,
    "itunesId": "1634523100"
  },
  {
    "id": "MQlyMtaICxI",
    "title": "Love For You",
    "artist": "LOVELI LORI",
    "duration": 172
  },
  {
    "id": "OdxSbc0ap-s",
    "title": "Mamushi (feat. Yuki Chiba)",
    "artist": "Megan Thee Stallion",
    "duration": 227
  },
  {
    "id": "sYpSpHq9ziM",
    "title": "KEEP UP",
    "artist": "ODETARI",
    "duration": 137
  },
  {
    "id": "1XzY2ij_vL4",
    "title": "Ransom",
    "artist": "Lil Tecca",
    "duration": 148
  },
  {
    "id": "HF73kN6TIw8",
    "title": "Rock",
    "artist": "Stepz",
    "duration": 199
  },
  {
    "id": "Vk5-c_v4gMU",
    "title": "Magnetic",
    "artist": "ILLIT",
    "duration": 189
  },
  {
    "id": "1xcvWmN0Pe4",
    "title": "If We Being Rëal",
    "artist": "YEAT",
    "duration": 173
  },
  {
    "id": "GMihWoOqIrU",
    "title": "GMFU (w/ 6arelyhuman)",
    "artist": "ODETARI",
    "duration": 126
  },
  {
    "id": "3elVQh4hz3M",
    "title": "Stephanie",
    "artist": "Nafeesisboujee",
    "duration": 141
  },
  {
    "id": "WuglphJ2Slk",
    "title": "ecstacy",
    "artist": "SUICIDAL-IDOL",
    "duration": 120
  },
  {
    "id": "bPONddpEnBs",
    "title": "CRAZY",
    "artist": "Unknown Artist",
    "duration": 165
  },
  {
    "id": "1Tfr1X9G0Kg",
    "title": "YOU'RE TOO SLOW",
    "artist": "ODETARI",
    "duration": 117
  },
  {
    "id": "h54g3lvGhaI",
    "title": "SPIT IN MY FACE!",
    "artist": "ThxSoMch",
    "duration": 148
  },
  {
    "id": "HCq1OcAEAm0",
    "title": "Industry Baby ft. Jack Harlow",
    "artist": "Lil Nas X",
    "duration": 213
  },
  {
    "id": "JtBBT8xK-uo",
    "title": "DICE ROLL",
    "artist": "ODETARI",
    "duration": 121
  },
  {
    "id": "2k5wP2rpYig",
    "title": "GOOD LOYAL THOTS",
    "artist": "ODETARI",
    "duration": 103
  },
  {
    "id": "Iq8h3GEe22o",
    "title": "Lovin On Me",
    "artist": "Jack Harlow",
    "duration": 140
  },
  {
    "id": "62TrmUvQGjo",
    "title": "Cupid (Twin Version)",
    "artist": "FIFTY FIFTY",
    "duration": 176
  },
  {
    "id": "evJ6gX1lp2o",
    "title": "i like the way you kiss me",
    "artist": "Artemas",
    "duration": 156
  },
  {
    "id": "NZffGy4TLno",
    "title": "Отключаю телефон",
    "artist": "INSTASAMKA",
    "duration": 188
  },
  {
    "id": "WTKEa7kikcg",
    "title": "Paint The Town Red",
    "artist": "Doja Cat",
    "duration": 232
  },
  {
    "id": "acfYQmCBsz8",
    "title": "Lovers Rock",
    "artist": "TV Girl",
    "duration": 208
  },
  {
    "id": "PD1EXJScA6k",
    "title": "End Of Beginning",
    "artist": "Djo",
    "duration": 160
  },
  {
    "id": "fukGbiPuBjU",
    "title": "I Wanna Be Yours",
    "artist": "Arctic Monkeys",
    "duration": 185
  },
  {
    "id": "dawrQnvwMTY",
    "title": "Shinunoga E-Wa",
    "artist": "Fujii Kaze",
    "duration": 192
  },
  {
    "id": "TGgcC5xg9YI",
    "title": "SEE YOU AGAIN featuring Kali Uchis",
    "artist": "Tyler The Creator",
    "duration": 203
  },
  {
    "id": "UGYjHg8Xu7U",
    "title": "I Know",
    "artist": "Kanii",
    "duration": 134
  },
  {
    "id": "oIvFXVqtzxg",
    "title": "Tek It",
    "artist": "Cafuné",
    "duration": 167
  },
  {
    "id": "aTYovhwxIqI",
    "title": "Trapped in a Dream",
    "artist": "RudyWade, Ethan Ross & Marin Hoxha",
    "duration": 143
  },
  {
    "id": "4zm45tQd8QI",
    "title": "DAMNSON",
    "artist": "Hanumankind",
    "duration": 151
  },
  {
    "id": "f1r0XZLNlGQ",
    "title": "One Of The Girls",
    "artist": "The Weeknd, JENNIE & Lily Rose Depp",
    "duration": 245
  },
  {
    "id": "U4mADkt6o-M",
    "title": "redrum",
    "artist": "21 Savage",
    "duration": 267
  },
  {
    "id": "_Cu9Df_9Zvg",
    "title": "GBP",
    "artist": "Central Cee & 21 Savage",
    "duration": 194,
    "itunesId": "1783404294"
  },
  {
    "id": "pDddlvCfTiw",
    "title": "BAND4BAND",
    "artist": "CENTRAL CEE FT. LIL BABY",
    "duration": 152,
    "itunesId": "1747857516"
  },
  {
    "id": "L3i4WPqOlb0",
    "title": "NIGHTS LIKE THIS",
    "artist": "The Kid LAROI",
    "duration": 90
  },
  {
    "id": "NfMegACVJQw",
    "title": "Freaks",
    "artist": "Surf Curse",
    "duration": 148
  },
  {
    "id": "BOyO8sZOaOQ",
    "title": "this is what falling in love feels like",
    "artist": "JVKE",
    "duration": 155
  },
  {
    "id": "5-rbSNzU_b8",
    "title": "Cigarettes After Sex",
    "artist": "Sunsetz",
    "duration": 215
  },
  {
    "id": "oftolPu9qp4",
    "title": "Boy's a liar Pt. 2",
    "artist": "PinkPantheress, Ice Spice",
    "duration": 136
  },
  {
    "id": "UNZqm3dxd2w",
    "title": "The Box",
    "artist": "Roddy Ricch",
    "duration": 213
  },
  {
    "id": "BC19kwABFwc",
    "title": "Love Again",
    "artist": "Dua Lipa",
    "duration": 263
  },
  {
    "id": "8F2s8ivKXNY",
    "title": "Life Goes On",
    "artist": "Oliver Tree",
    "duration": 207
  },
  {
    "id": "KBtk5FUeJbk",
    "title": "Cradles",
    "artist": "Sub Urban",
    "duration": 219
  },
  {
    "id": "1qksd1FYZe8",
    "title": "Bad Dream",
    "artist": "Stellar",
    "duration": 149
  },
  {
    "id": "9Zj0JOHJR-s",
    "title": "My Ordinary Life",
    "artist": "The Living Tombstone",
    "duration": 246
  },
  {
    "id": "iSyX-aGYHYk",
    "title": "check",
    "artist": "bbno$",
    "duration": 126
  },
  {
    "id": "K6BRna4_bmg",
    "title": "edamame",
    "artist": "bbno$ & Rich Brian",
    "duration": 141
  },
  {
    "id": "pSY3i5XHHXo",
    "title": "Sprinter",
    "artist": "Central Cee x Dave",
    "duration": 230,
    "itunesId": "1839519978"
  },
  {
    "id": "uXNEN-hGkZU",
    "title": "Go To Sleep ft. Parimal Shais",
    "artist": "Hanumankind",
    "duration": 263
  },
  {
    "id": "QuvqzlxEO6g",
    "title": "it boy",
    "artist": "bbno$",
    "duration": 178
  },
  {
    "id": "LGYLQ4zn95g",
    "title": "Nemzzz Ft. Central Cee",
    "artist": "DILEMMA",
    "duration": 149
  },
  {
    "id": "zTKheLpo4nQ",
    "title": "EVIL J0RDAN",
    "artist": "Playboi Carti",
    "duration": 184
  },
  {
    "id": "MFZ5zvjIcOE",
    "title": "Skyline",
    "artist": "Hanumankind",
    "duration": 267
  },
  {
    "id": "fYD7YsSRHOY",
    "title": "RATHER LIE",
    "artist": "Playboi Carti & The Weeknd",
    "duration": 210
  },
  {
    "id": "A5mURRozXtg",
    "title": "No Pole",
    "artist": "Don Toliver",
    "duration": 256
  },
  {
    "id": "Xtq_A2NnHKQ",
    "title": "Dark Thoughts",
    "artist": "Lil Tecca",
    "duration": 156
  },
  {
    "id": "8ekJMC8OtGU",
    "title": "NOKIA",
    "artist": "Drake",
    "duration": 266
  },
  {
    "id": "hrAwz6fHYgk",
    "title": "this is what heartbreak feels like",
    "artist": "JVKE",
    "duration": 157
  },
  {
    "id": "6366dxFf-Os",
    "title": "Why'd You Only Call Me When You're High?",
    "artist": "Arctic Monkeys",
    "duration": 289
  },
  {
    "id": "bpOSxM0rNPM",
    "title": "Do I Wanna Know?",
    "artist": "Arctic Monkeys",
    "duration": 266
  },
  {
    "id": "sElE_BfQ67s",
    "title": "Cigarettes After Sex",
    "artist": "Apocalypse",
    "duration": 291
  },
  {
    "id": "TUVcZfQe-Kw",
    "title": "Levitating Featuring DaBaby",
    "artist": "Dua Lipa",
    "duration": 231
  },
  {
    "id": "ygTZZpVkmKg",
    "title": "After Hours",
    "artist": "The Weeknd",
    "duration": 362
  },
  {
    "id": "oygrmJFKYZY",
    "title": "Don't Start Now",
    "artist": "Dua Lipa",
    "duration": 182
  },
  {
    "id": "eh8f8ee47mE",
    "title": "5 STAR",
    "artist": "CENTRAL CEE",
    "duration": 161
  },
  {
    "id": "OiC1rgCPmUQ",
    "title": "Dance The Night (From Barbie The Album)",
    "artist": "Dua Lipa",
    "duration": 212
  },
  {
    "id": "9XOA32QpWGU",
    "title": "UP NORTH",
    "artist": "CENTRAL CEE",
    "duration": 164
  },
  {
    "id": "JgDNFQ2RaLQ",
    "title": "Sapphire",
    "artist": "Ed Sheeran",
    "duration": 184
  },
  {
    "id": "tZY-jG_HThM",
    "title": "COLD",
    "artist": "NEMZZZ",
    "duration": 144
  },
  {
    "id": "MYHrk_6qky8",
    "title": "Redemption Ft. Nemzzz",
    "artist": "Kidwild",
    "duration": 157
  },
  {
    "id": "oojBNXKtE9M",
    "title": "PTSD",
    "artist": "NEMZZZ",
    "duration": 136
  },
  {
    "id": "xwN6WXjssfw",
    "title": "GUILT TRIPPIN",
    "artist": "Central Cee x Sexyy Red",
    "duration": 155
  },
  {
    "id": "TFWXqLSr4ZM",
    "title": "Illegal",
    "artist": "PinkPantheress",
    "duration": 153
  },
  {
    "id": "ft78CY3SSEc",
    "title": "ESCAPE",
    "artist": "NEMZZZ",
    "duration": 129
  },
  {
    "id": "acYUqMd9k2I",
    "title": "Glock In My Lap",
    "artist": "21 Savage & Metro Boomin",
    "duration": 199
  },
  {
    "id": "t-knFuqQdGc",
    "title": "THE DAYS (NOTION REMIX)",
    "artist": "CHRYSTAL",
    "duration": 234
  },
  {
    "id": "lw_XFnk5kwU",
    "title": "Pain",
    "artist": "PinkPantheress",
    "duration": 92
  },
  {
    "id": "2a-AK_39xg8",
    "title": "Vamp Anthem",
    "artist": "Playboi Carti",
    "duration": 125
  },
  {
    "id": "XfdGPSnaVkA",
    "title": "ST. PATRICK'S",
    "artist": "CENTRAL CEE",
    "duration": 161
  },
  {
    "id": "IrEFKJnl1H8",
    "title": "Tonight",
    "artist": "PinkPantheress",
    "duration": 178
  },
  {
    "id": "PEM0Vs8jf1w",
    "title": "golden hour",
    "artist": "JVKE",
    "duration": 232
  },
  {
    "id": "u2JMMm8TvZ0",
    "title": "Stars",
    "artist": "PinkPantheress",
    "duration": 142
  },
  {
    "id": "KnumAWWWgUE",
    "title": "Sky",
    "artist": "Playboi Carti",
    "duration": 193
  },
  {
    "id": "lSD_L-xic9o",
    "title": "From The Start",
    "artist": "Laufey",
    "duration": 170
  },
  {
    "id": "tERTBPdVivc",
    "title": "Beanie",
    "artist": "Chezile",
    "duration": 140
  },
  {
    "id": "ki0Ocze98U8",
    "title": "One Dance ft. Wizkid & Kyla",
    "artist": "Drake",
    "duration": 175
  },
  {
    "id": "L4sbDxR22z4",
    "title": "Cigarettes After Sex",
    "artist": "K.",
    "duration": 318
  },
  {
    "id": "BqucGvLxrEk",
    "title": "Let Go",
    "artist": "Central Cee",
    "duration": 178,
    "itunesId": "1656754378"
  },
  {
    "id": "BM0dbamY2Rw",
    "title": "Now Or Never",
    "artist": "TKANDZ",
    "duration": 124
  },
  {
    "id": "YRA7DNy3kzk",
    "title": "8PM",
    "artist": "NEMZZZ",
    "duration": 197
  }
];

export const TRACKS = deterministicShuffle(RAW_TRACKS, 42);
