export const navMap: NavigationMap = {
	'37': 'back',
	'38': 'next',
	'39': 'next',
	'40': 'back'
};

async function getPresentationData(): Promise<SlideNavigation> {
	const navInfo = await fetch('./presentation.json');
	const json = await navInfo.json();
	return json;
}

export async function bootstrapNavigation() {
	const slideNav = await getPresentationData();

	window.addEventListener('keydown', e => {
		if (!(e.keyCode.toString() in navMap)) {
			return;
		}

		const action = navMap[e.keyCode];
		const { slides } = slideNav;

		const url = new URL(location.href);
		const parts = url.pathname.split('/').filter(p => !!p);
		const fileIndex = Math.max(parts.length - 1, 0);
		const file = parts[fileIndex];
		let newPathName = '';
		if (fileIndex > 0) {
			newPathName = `/${parts.slice(0, fileIndex - 1).join('/')}`;
		}

		const currentIndex = slides.findIndex(s => s.file === file);
		// const currentSlide = slides[currentIndex];
		const previousSlide = currentIndex !== 0 ? slides[currentIndex - 1] : null;
		const nextSlide = currentIndex !== slides.length - 1 ? slides[currentIndex + 1] : null;

		switch (action) {
			case 'next':
				if (nextSlide !== null) {
					window.location.href = `${location.origin}${newPathName}/${nextSlide.file}`;
				}
				break;
			case 'back':
				if (previousSlide !== null) {
					window.location.href = `${location.origin}${newPathName}/${previousSlide.file}`;
				}
				break;
			default:
				break;
		}
	});
}

export interface NavigationMap {
	[key: string]: 'next' | 'back';
}

export interface SlideNavigation {
	slides: Slide[];
}

export interface Slide {
	title: string;
	file: string;
	index: number;
}
