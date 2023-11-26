export type Category = (typeof categoryList)[number];
export type CountryCode = (typeof countryList)[number]['code'];
export type CaseStatus = (typeof statusList)[number];
export type UserRole = (typeof roleList)[number];

export const roleList = ['basic', 'admin'] as const;
export const statusList = ['active', 'inprogress', 'closed'] as const;
export const categoryList = ['Банк', 'ВНЖ', 'Авиалиния'] as const;
export const countryList = [
	{
		name: 'Абхазия',
		code: 'AB'
	},
	{
		name: 'Австралия',
		code: 'AU'
	},
	{
		name: 'Австрия',
		code: 'AT'
	},
	{
		name: 'Азербайджан',
		code: 'AZ'
	},
	{
		name: 'Албания',
		code: 'AL'
	},
	{
		name: 'Алжир',
		code: 'DZ'
	},
	{
		name: 'Американское Самоа',
		code: 'AS'
	},
	{
		name: 'Ангилья',
		code: 'AI'
	},
	{
		name: 'Ангола',
		code: 'AO'
	},
	{
		name: 'Андорра',
		code: 'AD'
	},
	{
		name: 'Антарктида',
		code: 'AQ'
	},
	{
		name: 'Антигуа и Барбуда',
		code: 'AG'
	},
	{
		name: 'Аргентина',
		code: 'AR'
	},
	{
		name: 'Армения',
		code: 'AM'
	},
	{
		name: 'Аруба',
		code: 'AW'
	},
	{
		name: 'Афганистан',
		code: 'AF'
	},
	{
		name: 'Багамы',
		code: 'BS'
	},
	{
		name: 'Бангладеш',
		code: 'BD'
	},
	{
		name: 'Барбадос',
		code: 'BB'
	},
	{
		name: 'Бахрейн',
		code: 'BH'
	},
	{
		name: 'Беларусь',
		code: 'BY'
	},
	{
		name: 'Белиз',
		code: 'BZ'
	},
	{
		name: 'Бельгия',
		code: 'BE'
	},
	{
		name: 'Бенин',
		code: 'BJ'
	},
	{
		name: 'Бермуды',
		code: 'BM'
	},
	{
		name: 'Болгария',
		code: 'BG'
	},
	{
		name: 'Боливия, Многонациональное Государство',
		code: 'BO'
	},
	{
		name: 'Бонайре, Саба и Синт-Эстатиус',
		code: 'BQ'
	},
	{
		name: 'Босния и Герцеговина',
		code: 'BA'
	},
	{
		name: 'Ботсвана',
		code: 'BW'
	},
	{
		name: 'Бразилия',
		code: 'BR'
	},
	{
		name: 'Британская территория в Индийском океане',
		code: 'IO'
	},
	{
		name: 'Бруней-Даруссалам',
		code: 'BN'
	},
	{
		name: 'Буркина-Фасо',
		code: 'BF'
	},
	{
		name: 'Бурунди',
		code: 'BI'
	},
	{
		name: 'Бутан',
		code: 'BT'
	},
	{
		name: 'Вануату',
		code: 'VU'
	},
	{
		name: 'Венгрия',
		code: 'HU'
	},
	{
		name: 'Венесуэла Боливарианская Республика',
		code: 'VE'
	},
	{
		name: 'Виргинские острова, Британские',
		code: 'VG'
	},
	{
		name: 'Виргинские острова, США',
		code: 'VI'
	},
	{
		name: 'Вьетнам',
		code: 'VN'
	},
	{
		name: 'Габон',
		code: 'GA'
	},
	{
		name: 'Гаити',
		code: 'HT'
	},
	{
		name: 'Гайана',
		code: 'GY'
	},
	{
		name: 'Гамбия',
		code: 'GM'
	},
	{
		name: 'Гана',
		code: 'GH'
	},
	{
		name: 'Гваделупа',
		code: 'GP'
	},
	{
		name: 'Гватемала',
		code: 'GT'
	},
	{
		name: 'Гвинея',
		code: 'GN'
	},
	{
		name: 'Гвинея-Бисау',
		code: 'GW'
	},
	{
		name: 'Германия',
		code: 'DE'
	},
	{
		name: 'Гернси',
		code: 'GG'
	},
	{
		name: 'Гибралтар',
		code: 'GI'
	},
	{
		name: 'Гондурас',
		code: 'HN'
	},
	{
		name: 'Гонконг',
		code: 'HK'
	},
	{
		name: 'Гренада',
		code: 'GD'
	},
	{
		name: 'Гренландия',
		code: 'GL'
	},
	{
		name: 'Греция',
		code: 'GR'
	},
	{
		name: 'Грузия',
		code: 'GE'
	},
	{
		name: 'Гуам',
		code: 'GU'
	},
	{
		name: 'Дания',
		code: 'DK'
	},
	{
		name: 'Джерси',
		code: 'JE'
	},
	{
		name: 'Джибути',
		code: 'DJ'
	},
	{
		name: 'Доминика',
		code: 'DM'
	},
	{
		name: 'Доминиканская Республика',
		code: 'DO'
	},
	{
		name: 'Египет',
		code: 'EG'
	},
	{
		name: 'Замбия',
		code: 'ZM'
	},
	{
		name: 'Западная Сахара',
		code: 'EH'
	},
	{
		name: 'Зимбабве',
		code: 'ZW'
	},
	{
		name: 'Израиль',
		code: 'IL'
	},
	{
		name: 'Индия',
		code: 'IN'
	},
	{
		name: 'Индонезия',
		code: 'ID'
	},
	{
		name: 'Иордания',
		code: 'JO'
	},
	{
		name: 'Ирак',
		code: 'IQ'
	},
	{
		name: 'Иран, Исламская Республика',
		code: 'IR'
	},
	{
		name: 'Ирландия',
		code: 'IE'
	},
	{
		name: 'Исландия',
		code: 'IS'
	},
	{
		name: 'Испания',
		code: 'ES'
	},
	{
		name: 'Италия',
		code: 'IT'
	},
	{
		name: 'Йемен',
		code: 'YE'
	},
	{
		name: 'Кабо-Верде',
		code: 'CV'
	},
	{
		name: 'Казахстан',
		code: 'KZ'
	},
	{
		name: 'Камбоджа',
		code: 'KH'
	},
	{
		name: 'Камерун',
		code: 'CM'
	},
	{
		name: 'Канада',
		code: 'CA'
	},
	{
		name: 'Катар',
		code: 'QA'
	},
	{
		name: 'Кения',
		code: 'KE'
	},
	{
		name: 'Кипр',
		code: 'CY'
	},
	{
		name: 'Киргизия',
		code: 'KG'
	},
	{
		name: 'Кирибати',
		code: 'KI'
	},
	{
		name: 'Китай',
		code: 'CN'
	},
	{
		name: 'Кокосовые (Килинг) острова',
		code: 'CC'
	},
	{
		name: 'Колумбия',
		code: 'CO'
	},
	{
		name: 'Коморы',
		code: 'KM'
	},
	{
		name: 'Конго',
		code: 'CG'
	},
	{
		name: 'Конго, Демократическая Республика',
		code: 'CD'
	},
	{
		name: 'Корея, Народно-Демократическая Республика',
		code: 'KP'
	},
	{
		name: 'Корея, Республика',
		code: 'KR'
	},
	{
		name: 'Коста-Рика',
		code: 'CR'
	},
	{
		name: "Кот д'Ивуар",
		code: 'CI'
	},
	{
		name: 'Куба',
		code: 'CU'
	},
	{
		name: 'Кувейт',
		code: 'KW'
	},
	{
		name: 'Кюрасао',
		code: 'CW'
	},
	{
		name: 'Лаос',
		code: 'LA'
	},
	{
		name: 'Латвия',
		code: 'LV'
	},
	{
		name: 'Лесото',
		code: 'LS'
	},
	{
		name: 'Ливан',
		code: 'LB'
	},
	{
		name: 'Ливийская Арабская Джамахирия',
		code: 'LY'
	},
	{
		name: 'Либерия',
		code: 'LR'
	},
	{
		name: 'Лихтенштейн',
		code: 'LI'
	},
	{
		name: 'Литва',
		code: 'LT'
	},
	{
		name: 'Люксембург',
		code: 'LU'
	},
	{
		name: 'Маврикий',
		code: 'MU'
	},
	{
		name: 'Мавритания',
		code: 'MR'
	},
	{
		name: 'Мадагаскар',
		code: 'MG'
	},
	{
		name: 'Майотта',
		code: 'YT'
	},
	{
		name: 'Макао',
		code: 'MO'
	},
	{
		name: 'Малави',
		code: 'MW'
	},
	{
		name: 'Малайзия',
		code: 'MY'
	},
	{
		name: 'Мали',
		code: 'ML'
	},
	{
		name: 'Малые Тихоокеанские отдаленные острова Соединенных Штатов',
		code: 'UM'
	},
	{
		name: 'Мальдивы',
		code: 'MV'
	},
	{
		name: 'Мальта',
		code: 'MT'
	},
	{
		name: 'Марокко',
		code: 'MA'
	},
	{
		name: 'Мартиника',
		code: 'MQ'
	},
	{
		name: 'Маршалловы острова',
		code: 'MH'
	},
	{
		name: 'Мексика',
		code: 'MX'
	},
	{
		name: 'Микронезия, Федеративные Штаты',
		code: 'FM'
	},
	{
		name: 'Мозамбик',
		code: 'MZ'
	},
	{
		name: 'Молдова, Республика',
		code: 'MD'
	},
	{
		name: 'Монако',
		code: 'MC'
	},
	{
		name: 'Монголия',
		code: 'MN'
	},
	{
		name: 'Монтсеррат',
		code: 'MS'
	},
	{
		name: 'Мьянма',
		code: 'MM'
	},
	{
		name: 'Намибия',
		code: 'NA'
	},
	{
		name: 'Науру',
		code: 'NR'
	},
	{
		name: 'Непал',
		code: 'NP'
	},
	{
		name: 'Нигер',
		code: 'NE'
	},
	{
		name: 'Нигерия',
		code: 'NG'
	},
	{
		name: 'Нидерланды',
		code: 'NL'
	},
	{
		name: 'Никарагуа',
		code: 'NI'
	},
	{
		name: 'Ниуэ',
		code: 'NU'
	},
	{
		name: 'Новая Зеландия',
		code: 'NZ'
	},
	{
		name: 'Новая Каледония',
		code: 'NC'
	},
	{
		name: 'Норвегия',
		code: 'NO'
	},
	{
		name: 'Объединенные Арабские Эмираты',
		code: 'AE'
	},
	{
		name: 'Оман',
		code: 'OM'
	},
	{
		name: 'Остров Буве',
		code: 'BV'
	},
	{
		name: 'Остров Мэн',
		code: 'IM'
	},
	{
		name: 'Остров Норфолк',
		code: 'NF'
	},
	{
		name: 'Остров Рождества',
		code: 'CX'
	},
	{
		name: 'Остров Херд и острова Макдональд',
		code: 'HM'
	},
	{
		name: 'Острова Кайман',
		code: 'KY'
	},
	{
		name: 'Острова Кука',
		code: 'CK'
	},
	{
		name: 'Острова Теркс и Кайкос',
		code: 'TC'
	},
	{
		name: 'Пакистан',
		code: 'PK'
	},
	{
		name: 'Палау',
		code: 'PW'
	},
	{
		name: 'Палестинская территория, оккупированная',
		code: 'PS'
	},
	{
		name: 'Панама',
		code: 'PA'
	},
	{
		name: 'Папский Престол (Государство — город Ватикан)',
		code: 'VA'
	},
	{
		name: 'Папуа-Новая Гвинея',
		code: 'PG'
	},
	{
		name: 'Парагвай',
		code: 'PY'
	},
	{
		name: 'Перу',
		code: 'PE'
	},
	{
		name: 'Питкерн',
		code: 'PN'
	},
	{
		name: 'Польша',
		code: 'PL'
	},
	{
		name: 'Португалия',
		code: 'PT'
	},
	{
		name: 'Пуэрто-Рико',
		code: 'PR'
	},
	{
		name: 'Республика Македония',
		code: 'MK'
	},
	{
		name: 'Реюньон',
		code: 'RE'
	},
	{
		name: 'Россия',
		code: 'RU'
	},
	{
		name: 'Руанда',
		code: 'RW'
	},
	{
		name: 'Румыния',
		code: 'RO'
	},
	{
		name: 'Самоа',
		code: 'WS'
	},
	{
		name: 'Сан-Марино',
		code: 'SM'
	},
	{
		name: 'Сан-Томе и Принсипи',
		code: 'ST'
	},
	{
		name: 'Саудовская Аравия',
		code: 'SA'
	},
	{
		name: 'Святая Елена, Остров вознесения, Тристан-да-Кунья',
		code: 'SH'
	},
	{
		name: 'Северные Марианские острова',
		code: 'MP'
	},
	{
		name: 'Сен-Бартельми',
		code: 'BL'
	},
	{
		name: 'Сен-Мартен',
		code: 'MF'
	},
	{
		name: 'Сенегал',
		code: 'SN'
	},
	{
		name: 'Сент-Винсент и Гренадины',
		code: 'VC'
	},
	{
		name: 'Сент-Китс и Невис',
		code: 'KN'
	},
	{
		name: 'Сент-Люсия',
		code: 'LC'
	},
	{
		name: 'Сент-Пьер и Микелон',
		code: 'PM'
	},
	{
		name: 'Сербия',
		code: 'RS'
	},
	{
		name: 'Сейшелы',
		code: 'SC'
	},
	{
		name: 'Сингапур',
		code: 'SG'
	},
	{
		name: 'Синт-Мартен',
		code: 'SX'
	},
	{
		name: 'Сирийская Арабская Республика',
		code: 'SY'
	},
	{
		name: 'Словакия',
		code: 'SK'
	},
	{
		name: 'Словения',
		code: 'SI'
	},
	{
		name: 'Соединенное Королевство',
		code: 'GB'
	},
	{
		name: 'Соединенные Штаты',
		code: 'US'
	},
	{
		name: 'Соломоновы острова',
		code: 'SB'
	},
	{
		name: 'Сомали',
		code: 'SO'
	},
	{
		name: 'Судан',
		code: 'SD'
	},
	{
		name: 'Суринам',
		code: 'SR'
	},
	{
		name: 'Сьерра-Леоне',
		code: 'SL'
	},
	{
		name: 'Таджикистан',
		code: 'TJ'
	},
	{
		name: 'Таиланд',
		code: 'TH'
	},
	{
		name: 'Тайвань (Китай)',
		code: 'TW'
	},
	{
		name: 'Танзания, Объединенная Республика',
		code: 'TZ'
	},
	{
		name: 'Тимор-Лесте',
		code: 'TL'
	},
	{
		name: 'Того',
		code: 'TG'
	},
	{
		name: 'Токелау',
		code: 'TK'
	},
	{
		name: 'Тонга',
		code: 'TO'
	},
	{
		name: 'Тринидад и Тобаго',
		code: 'TT'
	},
	{
		name: 'Тувалу',
		code: 'TV'
	},
	{
		name: 'Тунис',
		code: 'TN'
	},
	{
		name: 'Туркмения',
		code: 'TM'
	},
	{
		name: 'Турция',
		code: 'TR'
	},
	{
		name: 'Уганда',
		code: 'UG'
	},
	{
		name: 'Узбекистан',
		code: 'UZ'
	},
	{
		name: 'Украина',
		code: 'UA'
	},
	{
		name: 'Уоллис и Футуна',
		code: 'WF'
	},
	{
		name: 'Уругвай',
		code: 'UY'
	},
	{
		name: 'Фарерские острова',
		code: 'FO'
	},
	{
		name: 'Фиджи',
		code: 'FJ'
	},
	{
		name: 'Филиппины',
		code: 'PH'
	},
	{
		name: 'Финляндия',
		code: 'FI'
	},
	{
		name: 'Фолклендские острова (Мальвинские)',
		code: 'FK'
	},
	{
		name: 'Франция',
		code: 'FR'
	},
	{
		name: 'Французская Гвиана',
		code: 'GF'
	},
	{
		name: 'Французская Полинезия',
		code: 'PF'
	},
	{
		name: 'Французские Южные территории',
		code: 'TF'
	},
	{
		name: 'Хорватия',
		code: 'HR'
	},
	{
		name: 'Центрально-Африканская Республика',
		code: 'CF'
	},
	{
		name: 'Чад',
		code: 'TD'
	},
	{
		name: 'Черногория',
		code: 'ME'
	},
	{
		name: 'Чешская Республика',
		code: 'CZ'
	},
	{
		name: 'Чили',
		code: 'CL'
	},
	{
		name: 'Швейцария',
		code: 'CH'
	},
	{
		name: 'Швеция',
		code: 'SE'
	},
	{
		name: 'Шпицберген и Ян Майен',
		code: 'SJ'
	},
	{
		name: 'Шри-Ланка',
		code: 'LK'
	},
	{
		name: 'Эквадор',
		code: 'EC'
	},
	{
		name: 'Экваториальная Гвинея',
		code: 'GQ'
	},
	{
		name: 'Эландские острова',
		code: 'AX'
	},
	{
		name: 'Эль-Сальвадор',
		code: 'SV'
	},
	{
		name: 'Эритрея',
		code: 'ER'
	},
	{
		name: 'Эсватини',
		code: 'SZ'
	},
	{
		name: 'Эстония',
		code: 'EE'
	},
	{
		name: 'Эфиопия',
		code: 'ET'
	},
	{
		name: 'Южная Африка',
		code: 'ZA'
	},
	{
		name: 'Южная Джорджия и Южные Сандвичевы острова',
		code: 'GS'
	},
	{
		name: 'Южная Осетия',
		code: 'OS'
	},
	{
		name: 'Южный Судан',
		code: 'SS'
	},
	{
		name: 'Ямайка',
		code: 'JM'
	},
	{
		name: 'Япония',
		code: 'JP'
	}
] as const;
export const countryCodeList = countryList.map((x) => x.code) as [
	CountryCode,
	CountryCode,
	...CountryCode[]
];
