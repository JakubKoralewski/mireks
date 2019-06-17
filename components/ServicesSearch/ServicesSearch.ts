import { Component, Vue } from "nuxt-property-decorator";
import {} from "gsap";
@Component
export default class ServicesSearch extends Vue {
	searchText = "";
	mounted() {}
	search() {
		console.log("Searching: ", this.searchText);
	}
	handleSearchInput() {
		console.log("Input");
	}
}
