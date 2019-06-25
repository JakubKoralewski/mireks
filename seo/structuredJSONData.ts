import services from "../components/ServicesSearch/services";

const offerItemListElement: any[] = [];

for (const service of services) {
	offerItemListElement.push({
		"@type": "Offer",
		itemOffered: {
			"@type": "Service",
			name: service.title,
			alternateName: service.shortTitle,
			serviceType: "Usługa rachunkowa",
			provider: {
				"@id": "mireks_org"
			},
			availableChannel: {
				"@type": "ServiceChannel",
				availableLanguage: {
					"@type": "Language",
					name: "Polish",
					alternateName: "pl"
				},
				serviceLocation: {
					"@id": "mireks_place"
				},
				servicePhone: {
					"@id": "mireks_contact_point"
				},
				servicePostalAddress: {
					"@id": "address"
				}
			}
		}
	});
}

export default {
	"@context": "http://schema.org",
	"@graph": [
		{
			"@context": "http://schema.org",
			"@id": "mireks_org",
			"@type": "Organization",
			legalName: "Firma Handlowo-Usługowa Mireks Mirosław Koralewski",
			name: "Mireks",
			alternateName: "FHU MIREKS",
			contactPoint: {
				"@id": "mireks_contact_point"
			},
			address: {
				"@id": "address"
			},
			email: "mireks40@poczta.onet.pl",
			telephone: "+48 62 763 74 10"
		},
		{
			"@id": "mireks_place",
			"@type": "Place",
			address: {
				"@id": "address"
			}
		},
		{
			"@id": "address",
			"@type": "PostalAddress",
			streetAddress: "Nakwasińska 1",
			addressLocality: "Koźminek",
			addressRegion: "Wielkopolska",
			postalCode: "62-840",
			addressCountry: "Poland"
		},
		{
			"@id": "mireks_contact_point",
			"@type": "ContactPoint",
			availableLanguage: {
				"@type": "Language",
				name: "Polish",
				alternateName: "pl"
			},
			contactType: "Customer service",
			email: "mireks40@poczta.onet.pl",
			telephone: "+48 62 763 74 10",
			areaServed: "Poland"
		},
		{
			"@type": "AccountingService",
			"@id": "mireks_accounting_service",
			name: "Mireks",
			contactPoint: {
				"@id": "mireks_contact_point"
			},
			address: {
				"@id": "address"
			},
			photo: "/mireks_bg.jpg",
			image: "/mireks_og.jpg",
			currenciesAccepted: "PLN",
			email: "mireks40@poczta.onet.pl",
			telePhone: "+48 62 763 74 10",
			paymentAccepted: ["cash", "check", "credit card"],
			openingHours: "Mo,Tu,We,Th,Fr 08:00-16:00",
			openingHoursSpecification: [
				{
					"@type": "OpeningHoursSpecification",
					dayOfWeek: [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday"
					],
					opens: "08:00",
					closes: "16:00"
				}
			],
			geo: {
				"@type": "GeoCoordinates",
				latitude: "51.7956549,",
				longitude: "18.336128"
			},
			priceRange: "$",
			hasOfferCatalog: {
				"@type": "OfferCatalog",
				name: "Usługi",
				itemListElement: offerItemListElement
			}
		}
	],
	"@type": "AccountingService",
	"@id": "mireks_accounting_service"
};
