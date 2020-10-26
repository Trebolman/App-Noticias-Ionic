export interface Provider {
	name: string;
}

export interface Image {
	url: string;
	height: number;
	width: number;
	thumbnail: string;
	thumbnailHeight: number;
	thumbnailWidth: number;
	base64Encoding: string;
	name?: any;
	title?: any;
	provider: Provider;
	imageWebSearchUrl?: any;
	webpageUrl: string;
}

export interface Articulo {
	id: string;
	title: string;
	url: string;
	description: string;
	body: string;
	keywords: string;
	language: string;
	isSafe: boolean;
	datePublished: string;
	provider: Provider;
	image: Image;
}

export interface Noticia {
	_type: string;
	didUMean: string;
	totalCount: number;
	relatedSearch: any[];
	value: Articulo[];
}