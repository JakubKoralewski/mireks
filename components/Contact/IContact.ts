export default interface IContact {
	id: string;
	icon: string;
	subtitle: string;
	link?: string;
	info: string;
	hover: boolean;
	selected: boolean;
	/** For CSS animation reversal.  */
	reverse: boolean;
}
