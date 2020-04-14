/*
 * intersection-observer : polyfill
 *
 * https://github.com/w3c/IntersectionObserver/tree/master/polyfill
 */
import 'intersection-observer';

export default class MoveAnimation {
    constructor(elem) {
        this.root = elem;

        if (!this.root) {
            return;
        }

        const animateClass = 'is-animate';
        const options = {
            root: null,
            rootMargin: '0px 0px -30% 0px',
            threshold: 0
        };
        const doWhenIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.root.classList.add(animateClass);
                }
            });
        };
        const observer = new IntersectionObserver(doWhenIntersect, options);

        observer.observe(this.root);
    }
}
