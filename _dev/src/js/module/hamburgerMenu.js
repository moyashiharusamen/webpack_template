import ControlTabIndex from '../lib/controlTabIndex';

/**
 *
 * ハンバーガーメニュー
 *
 * @constructor
 * @classdesc : 画面幅が SP 幅(max-width: 767px)の際に、header グローバルナビをハンバーガーメニュー表示にする
 *
 * @param  {String} elem : header 要素のセレクター（.js-header）
 */
export default class HamburgerMenu {
    constructor(elem) {
        this.root = document.querySelector(elem);

        if (!this.root) {
            return;
        }

        this.html = document.querySelector('html');
        this.body = document.body;
        this.hamburger = document.querySelector('.js-hamburger');
        this.menuList = document.querySelector('.js-hamburger-list');
        this.mql = window.matchMedia('(max-width: 767px)');
        this.ControlTabIndex = new ControlTabIndex();
        this.toggleFlag = false;

        /**
         * アクセシビリティに関する属性の付与
         *
         * @return {Void}
         */
        this.checkBreakPoint = () => {
            if (!this.mql.matches) {
                if (!this.btn) {
                    return;
                }

                this.btn.parentNode.removeChild(this.btn);
                this.overlay.parentNode.removeChild(this.overlay);
                this.close();

                return;
            }

            this.btn = this.createBtn();
            this.btnTextElem = document.querySelector('.h-menu-text');
            this.overlay = this.createOverlay();
            this.setA11y();
            this.btn.addEventListener('click', () => {
                if (this.toggleFlag) {
                    this.close();
                } else {
                    this.open();
                }
            });
        };

        this.mql.addListener(this.checkBreakPoint);
        this.checkBreakPoint();
    }


    /**
     * アクセシビリティに関する属性の付与
     *
     * @return {Void}
     */
    setA11y() {
        this.btn.setAttribute('aria-expanded', false);
        this.btn.setAttribute('aria-controls', this.menuList.id);
    }

    /**
     * ハンバーガーメニュー開閉ボタンの生成
     *
     * @return {HTMLElement} .h-menu-btn を返す
     */
    createBtn() {
        const btn = document.createElement('button');
        const btnText = document.createElement('span');

        btn.type = 'button';
        btn.classList.add('h-menu-btn');
        btnText.classList.add('h-menu-text');
        btnText.textContent = '開く';

        btn.appendChild(btnText);

        this.hamburger.insertBefore(btn, this.menuList);

        return btn;
    }

    /**
     * ハンバーガーメニューの背景に設置する要素を生成
     *
     * @return {HTMLElement} .overlay を返す
     */
    createOverlay() {
        const overlay = document.createElement('div');

        overlay.classList.add('overlay');
        this.body.appendChild(overlay);

        return overlay;
    }

    /**
     * ハンバーガーメニューを開く
     *
     * @return {Void}
     */
    open() {
        this.menuList.classList.add('is-render');
        // For element reflow
        this.menuList.offsetTop; //eslint-disable-line
        this.menuList.classList.add('is-show');
        this.overlay.classList.add('is-show');
        this.html.classList.add('is-open');
        this.btn.setAttribute('aria-expanded', true);
        this.toggleFlag = true;
        this.btnTextElem.textContent = '閉じる';
        this.ControlTabIndex.setAll(this.root);
    }

    /**
     * ハンバーガーメニューを閉じる
     *
     * @return {Void}
     */
    close() {
        this.menuList.offsetTop; //eslint-disable-line
        this.menuList.classList.remove('is-show');
        this.one(this.menuList, 'transitionend', () => {
            this.menuList.classList.remove('is-render');
        });
        this.overlay.classList.remove('is-show');
        this.html.classList.remove('is-open');
        this.btn.setAttribute('aria-expanded', false);
        this.toggleFlag = false;
        this.btnTextElem.textContent = '開く';
        this.ControlTabIndex.reset();
    }

    /**
     * 特定のイベントを 1 回だけ発生させる
     *
     * @return {Void}
     */
    one(elem, event, callback) {
        const handler = (e) => {
            callback.call(this, e);
            elem.removeEventListener(event, handler);
        };

        elem.addEventListener(event, handler);
    }
}
