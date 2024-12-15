import Lightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

export function initPhotoswipe() {
	import('photoswipe/dist/photoswipe.css');

	const lightbox = new Lightbox({
		gallery: '.article-grid',
		children: '.photoswipe-image',
		pswpModule: PhotoSwipe
	});
	lightbox.init();
}
