/*
 * intersection-observer : polyfill
 *
 * https://github.com/w3c/IntersectionObserver/tree/master/polyfill
 */
import 'intersection-observer';

/**
 *
 * ページスクロール
 *
 * @constructor
 * @classdesc : ページ内リンク機能を持つ a 要素をクリックした際、目的地までアニメーションする
 *
 * @param  {String} elem : # で始まる href を持つ a 要素
 */
export default class PageScroll {
    constructor(elem) {
        this.root = elem;

        if (!this.root) {
            return;
        }

        this.root.addEventListener('click', (e) => {
            e.preventDefault();

            this.run();
        });
        this.adjustmentPosition();
    }

    /**
     * this.root を click した際に実行される
     *
     * @return {Void}
     */
    run() {
        const html = document.querySelector('html');
        const headerHeight = document.querySelector('.js-header').clientHeight;
        const focusable = 'a[href], area[href], input, select, textarea, button, output, video, audio, object, embed, iframe, [tabindex], [onclick]';
        const hash = this.root.getAttribute('href');
        let target = document.querySelector(hash);
        let targetPos = 0;

        /**
         * ページスクロール機能を実行
         *
         * @param  {Number} range : href で紐づいた要素の位置
         * @return {Void}
         */
        const scroll = (range) => {
            let position = 0;
            let progress = 0;
            const start = window.pageYOffset;
            const diff = range - start;
            const isUp = diff <= 0;
            const easeOut = (p) => p * (2 - p);

            if (!target.getAttribute('tabindex')) {
                target.setAttribute('tabindex', '0');
                target.focus();
                target.removeAttribute('tabindex');
            } else {
                target.focus();
            }

            const move = () => {
                progress++;
                position = start + (diff * easeOut(progress / 50));

                window.scrollTo(0, position);

                if (
                    (
                        isUp &&
                        range < position
                    ) ||
                    (
                        !isUp &&
                        position < range
                    )
                ) {
                    requestAnimationFrame(move);
                }
            };

            requestAnimationFrame(move);
        };

        if (hash !== '#top') {
            const nowPos = document.documentElement.scrollTop || document.body.scrollTop;
            const rect = target.getBoundingClientRect();

            targetPos = rect.top + nowPos - headerHeight;
        } else if (hash === '#top') {
            target = html.querySelectorAll(focusable)[0]; //eslint-disable-line
        }

        scroll(targetPos);
    }

    /**
     * トップへ戻る（.js-pagetop）の位置を調整する
     *
     * @return {Void}
     */
    adjustmentPosition() {
        const root = document.querySelector('.js-pagetop');

        if (!root) {
            return;
        }

        const positionFixed = document.querySelector('.js-fixed-position');
        const positionFade = document.querySelector('.js-fade-position');
        const fixedClass = 'is-fixed';
        const fadeClass = 'is-fade';
        const optionsFixed = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };
        const opsionsFade = {
            root: null,
            rootMargin: '-100% 0px 0px',
            threshold: 0
        };
        const doWhenIntersectFixed = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    root.classList.remove(fixedClass);
                } else {
                    root.classList.add(fixedClass);
                }
            });
        };
        const doWhenIntersectFade = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    root.classList.add(fadeClass);
                } else {
                    root.classList.remove(fadeClass);
                }
            });
        };

        if (positionFixed) {
            const observerFixed = new IntersectionObserver(doWhenIntersectFixed, optionsFixed);

            observerFixed.observe(positionFixed);
        }

        if (positionFade) {
            const observerFade = new IntersectionObserver(doWhenIntersectFade, opsionsFade);

            observerFade.observe(positionFade);
        }
    }
}
