import IService from "./IService";

const services: IService[] = [
	{
		id: 0,
		title: "Analiza finansowa",
		description:
			"Sporządzenie zbioru informacji o wynikach i sytuacji finansowej przedsiębiorstwa.",
		keywords: [
			"kredytodawca",
			"kontrahent",
			"inwestor",
			"audytor",
			"urząd statystyczny",
			"pionowa",
			"pozioma",
			"kapitał"
		],
		visible: true
	},
	{
		id: 1,
		title: "Kontrola księgowa",
		description:
			"Sprawdzenie poprawności dokumentów pod względem formalnym, merytorycznym i rachunkowym.",
		keywords: ["błąd", "wykaz różnic inwentaryzacyjnych"],
		visible: true
	},
	{
		id: 2,
		title: "Księgi rachunkowe",
		description: "Pełna forma prowadzenia ewidencji przychodów i kosztów.",
		keywords: ["pełna księgowość", "księgi handlowe"],
		visible: true
	},
	{
		id: 3,
		title: "Porady finansowe i księgowe",
		description:
			"Doświadczenie poparte wieloletnią obsługą księgową firm \
			czyni z nas świetnego doradcę w dziedzinie rachunkowości. \
			Udzielamy porad zarówno finansowych jak i rachunkowych.",
		keywords: ["doradztwo", "inwentaryzacja", "finans", "due dilligence"],
		visible: true
	},
	{
		id: 4,
		title: "PIT",
		description: "Rozliczenie podatku dochodowego od osób fizycznych.",
		keywords: [
			"US",
			"Urząd Skarbowy",
			"PIT-4R",
			"PIT-11",
			"PIT-28",
			"PIT-36",
			"PIT-37",
			"PIT-38"
		],
		visible: true
	},
	{
		id: 5,
		title: "CIT",
		description: "Rozliczenie podatku dochodowego od osób prawnych.",
		keywords: ["US", "Urząd Skarbowy", "CIT-8"],
		visible: true
	},
	{
		id: 6,
		title: "VAT",
		description: "Rozliczenie podatku od towarów i usług.",
		keywords: [
			"US",
			"Urząd Skarbowy",
			"PTU",
			"value-added-tax",
			"VAT-7",
			"VAT-UE"
		],
		visible: true
	},
	{
		id: 7,
		title: "Ewidencja VAT",
		description: "Prowadzenie pełnej ewidencji dla potrzeb podatku VAT.",
		keywords: ["US", "Urząd Skarbowy"],
		visible: true
	},
	{
		id: 8,
		title: "Pomoc w rozliczaniu podatku od nieruchomości",
		shortTitle: "Podatek od nieruchomości",
		description: "Mieszkanie, działka, dom, garaż - jaki to podatek?",
		keywords: ["gmina"],
		visible: true
	},
	{
		id: 9,
		title: "Pomoc w rozliczaniu podatku od spadków i darowizn",
		shortTitle: "Podatek od spadków i darowizn",
		description:
			"Podatek od spadków i darowizn muszą zapłacić osoby, które nabyły majątek w drodze spadku lub darowizny.",
		keywords: ["samorząd", "gmina"],
		visible: true
	},
	{
		id: 10,
		title: "Pomoc w rozliczaniu podatku akcyzowego",
		shortTitle: "Akcyza",
		description:
			"Podatek pośredni nakładany na niektóre dobra konsumpcyjne.",
		keywords: ["akcyza"],
		visible: true
	},
	{
		id: 11,
		title: "Pomoc w zakładaniu działalności gospodarczej.",
		description: "Pomagamy zacząc własny biznes",
		keywords: ["spółka", "biznes"],
		visible: true
	},
	{
		id: 12,
		title: "Składanie JPK",
		description: "Składanie Jednolitego Pliku Kontrolnego.",
		keywords: [
			"JPK_KR",
			"JPK_WB",
			"JPK_MAG",
			"JPK_VAT",
			"JPK_FA",
			"JPK_PKPIR",
			"JPK_EWP",
			"JPK_SF"
		],
		visible: true
	},
	{
		id: 13,
		title: "Pomoc w rozliczaniu cła",
		shortTitle: "Cło",
		description:
			"Opłata nakładana przez państwo na towary w związku z \
			ich wywozem i przywozem dokonywanym przez granice celne państwa.",
		keywords: [
			"cło",
			"import",
			"eksport",
			"tranzyt",
			"ad valorem",
			"taryfa"
		],
		visible: true
	},
	{
		id: 14,
		title: "Sporządzanie sprawozdań finansowych",
		shortTitle: "Sprawozdania finansowe",
		description:
			"Uporządkowane przedstawienie sytuacji finansowej i finansowych wyników działalności podmiotu gospodarczego.",
		keywords: ["dzień bilansowy", "zysk", "strata"],
		visible: true
	},
	{
		id: 15,
		title: "Rozliczenia międzypodmiotowe",
		shortTitle: "Rozliczanie produkcji",
		description:
			"Ma na celu ujęcie pełnego kosztu wytworzenia lub kosztu działalności podmiotu.",
		keywords: [],
		visible: true
	},
	{
		id: 16,
		title: "Podatkowa Księga Przychodu i Rozchodu",
		shortTitle: "PKPiR",
		description:
			"Podstawowe urządzenie służące do określania dochodu z prowadzonej firmy.",
		keywords: ["księgowość uproszczona", "przychodów", "rozchodów"],
		visible: true
	},
	{
		id: 17,
		title: "Rozliczenia czasu pracy kierowców",
		shortTitle: "Kierowcy",
		description:
			"Wychodzimy naprzeciw potrzebom firm z branży transportowej.",
		keywords: ["BRK", "BRMK"],
		visible: true
	},
	{
		id: 18,
		title: "Ryczałt ewidencjonowany",
		description:
			"Uproszczona forma opodatkowania działalności gospodarczej.",
		keywords: ["US", "CEIDG-1"],
		visible: true
	},
	{
		id: 19,
		title: "Deklaracje",
		description:
			"Roczne deklaracje podatkowe, miesięczne deklaracje podatkowe.",
		keywords: ["US", "E-Deklaracje", "JPK_VAT"],
		visible: true
	},
	{
		id: 20,
		title: "Kadry i płace",
		description:
			"Administracja, dokumentacja pracownicza, rozliczanie i tworzenie umów, listy płac itp.",
		visible: true
	},
	{
		id: 21,
		title: "Ewidencje",
		description:
			"Ewidencja środków trwałych, ewidencje pracownicze, wartości prawnych i niematerialnych.",
		keywords: ["ryczałt"],
		visible: true
	}
];

export default services;
