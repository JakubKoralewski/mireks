interface Service {
	title: string;
	description: string;
	shortTitle?: string;
	keywords?: string[];
}

const services: Service[] = [
	{
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
		]
	},
	{
		title: "Kontrola księgowa",
		description:
			"Sprawdzenie poprawności dokumentów pod względem formalnym, merytorycznym i rachunkowym.",
		keywords: ["błąd", "wykaz różnic inwentaryzacyjnych"]
	},
	{
		title: "Księgi rachunkowe",
		description: "Pełna forma prowadzenia ewidencji przychodów i kosztów.",
		keywords: ["pełna księgowość", "księgi handlowe"]
	},
	{
		title: "Porady finansowe i księgowe",
		description:
			"Doświadczenie poparte wieloletnią obsługą księgową firm \
			czyni z nas świetnego doradcę w dziedzinie rachunkowości. \
			Udzielamy porad zarówno finansowych jak i rachunkowych.",
		keywords: ["doradztwo", "inwentaryzacja", "finans", "due dilligence"]
	},
	{
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
		]
	},
	{
		title: "CIT",
		description: "Rozliczenie podatku dochodowego od osób prawnych.",
		keywords: ["US", "Urząd Skarbowy", "CIT-8"]
	},
	{
		title: "VAT",
		description: "Rozliczenie podatku od towarów i usług.",
		keywords: [
			"US",
			"Urząd Skarbowy",
			"PTU",
			"value-added-tax",
			"VAT-7",
			"VAT-UE"
		]
	},
	{
		title: "Ewidencja VAT",
		description: "Prowadzenie pełnej ewidencji dla potrzeb podatku VAT.",
		keywords: ["US", "Urząd Skarbowy"]
	},
	{
		title: "Pomoc w rozliczaniu podatku od nieruchomości",
		shortTitle: "Podatek od nieruchomości",
		description: "Mieszkanie, działka, dom, garaż - jaki to podatek?",
		keywords: ["gmina"]
	},
	{
		title: "Pomoc w rozliczaniu podatku od spadków i darowizn",
		shortTitle: "Podatek od spadków i darowizn",
		description:
			"Podatek od spadków i darowizn muszą zapłacić osoby, które nabyły majątek w drodze spadku lub darowizny.",
		keywords: ["samorząd", "gmina"]
	},
	{
		title: "Pomoc w rozliczaniu podatku akcyzowego",
		shortTitle: "Akcyza",
		description:
			"Podatek pośredni nakładany na niektóre dobra konsumpcyjne.",
		keywords: ["akcyza"]
	},
	{
		title: "Pomoc w zakładaniu działalności gospodarczej.",
		description: "Pomagamy zacząc własny biznes",
		keywords: ["spółka", "biznes"]
	},
	{
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
		]
	},
	{
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
		]
	},
	{
		title: "Sporządzanie sprawozdań finansowych",
		shortTitle: "Sprawozdania finansowe",
		description:
			"Uporządkowane przedstawienie sytuacji finansowej i finansowych wyników działalności podmiotu gospodarczego.",
		keywords: ["dzień bilansowy", "zysk", "strata"]
	},
	{
		title: "Rozliczenia międzypodmiotowe",
		shortTitle: "Rozliczanie produkcji",
		description:
			"Ma na celu ujęcie pełnego kosztu wytworzenia lub kosztu działalności podmiotu.",
		keywords: []
	},
	{
		title: "Podatkowa Księga Przychodu i Rozchodu",
		shortTitle: "PKPiR",
		description:
			"Podstawowe urządzenie służące do określania dochodu z prowadzonej firmy.",
		keywords: ["księgowość uproszczona", "przychodów", "rozchodów"]
	},
	{
		title: "Rozliczenia czasu pracy kierowców",
		shortTitle: "Kierowcy",
		description:
			"Wychodzimy naprzeciw potrzebom firm z branży transportowej.",
		keywords: ["BRK", "BRMK"]
	},
	{
		title: "Ryczał ewidencjonowany",
		description:
			"Uproszczona forma opodatkowania działalności gospodarczej.",
		keywords: ["US", "CEIDG-1"]
	},
	{
		title: "Deklaracje",
		description:
			"Roczne deklaracje podatkowe, miesięczne deklaracje podatkowe.",
		keywords: ["US", "E-Deklaracje", "JPK_VAT"]
	},
	{
		title: "Kadry i płace",
		description:
			"Administracja, dokumentacja pracownicza, rozliczanie i tworzenie umów, listy płac itp."
	},
	{
		title: "Ewidencje",
		description:
			"Ewidencja środków trwałych, ewidencje pracownicze, wartości prawnych i niematerialnych.",
		keywords: ["ryczałt"]
	}
];

export default services;
