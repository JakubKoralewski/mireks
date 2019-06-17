export default interface Service {
	id: number;
	title: string;
	visible: boolean;
	description: string;
	shortTitle?: string;
	keywords?: string[];
}
