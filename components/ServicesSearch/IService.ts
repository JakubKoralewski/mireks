export interface IService extends IServiceTemp {
	id: number;
}

export interface IServiceTemp {
	id?: number;
	title: string;
	visible: boolean;
	description: string;
	shortTitle?: string;
	keywords?: string[];
}
