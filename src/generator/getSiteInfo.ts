import { map, Observable } from 'rxjs';
import { readPackage } from './readPackage';

export type SiteInfo = {
	author: {
		name: string;
		email: string;
		url: string;
	};
	twitter: string;
	homepage: string;
	site_map: string;
};

const getSiteInfo = (): Observable<SiteInfo> => {
	return readPackage().pipe(
		map(
			(packageInfo) =>
				({
					author: packageInfo.author,
					twitter: packageInfo.twitter,
					homepage: packageInfo.homepage,
					site_name: packageInfo.site_name
				}) as unknown as SiteInfo
		)
	);
};

export { getSiteInfo };
