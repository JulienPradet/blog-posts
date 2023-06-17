import Lightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

import 'photoswipe/dist/photoswipe.css';


export function initPhotoswipe() {
    const lightbox = new Lightbox({
      gallery: '.article-grid',
      children: '.photoswipe-image',
      pswpModule: PhotoSwipe
    });
    lightbox.init();
}
