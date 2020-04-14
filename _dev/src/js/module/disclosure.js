/**
 * ディスクロージャー機能
 * @constructor
 * @classdesc : ロード時にパネルが閉じているディスクロージャー機能
 *
 * @param  {String} elem : ディスクロージャーのルート要素のセレクター
 * @param  {Number} i : forEach で回したディレクロージャー要素の index
 *
 */
export default class Disclosure {
    constructor(elem, i) {
        this.root = elem;

        if (!this.root) {
            return;
        }

        this.btnClass = 'js-disclosure-btn';
        this.btnIconClass = 'js-disclosure-btnIcon';
        this.contentClass = 'js-disclosure-content';
        this.openClass = 'is-open';
        this.hook = this.createBtn();
        this.content = this.root.querySelector(`.${this.contentClass}`);
        this.contentInner = this.root.querySelector('.js-disclosure-content-inner');
        this.btnIcon = this.hook.querySelector(`.${this.btnIconClass}`);
        this.btnText = this.root.querySelector('.js-disclosure-text');
        this.contentHeight = this.contentInner.clientHeight;
        this.contentId = `disclosure-${i + 1}`;
        this.isTransition = false;

        if (this.btnText) {
            this.openedText = this.btnText.getAttribute('data-opened-text');
            this.closedText = this.btnText.getAttribute('data-closed-text');

            this.btnText.innerText = this.closedText;
        }

        this.content.id = this.contentId;
        this.setA11y();

        this.hook.addEventListener('click', () => {
            if (this.isTransition) {
                return;
            }

            this.isTransition = true;

            if (this.root.classList.contains(this.openClass)) {
                this.close();
            } else {
                this.open();
            }
        });

        this.content.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'height') {
                return;
            }

            if (this.hook.getAttribute('aria-expanded') === 'true') {
                this.content.style.height = 'auto';
            } else {
                this.root.classList.remove(this.openClass);
            }

            this.isTransition = false;
        });
    }

    /*
     * ディスクロージャーを開閉するボタンを生成
     *
     * @return {HTMLElement} .disclosure-btn を返す
     *
     */
    createBtn() {
        const btn = document.createElement('button');
        const elemBtn = this.root.querySelector(`.${this.btnClass}`);
        const elemInner = elemBtn.innerHTML;
        const elemParent = elemBtn.parentElement;

        btn.type = 'button';
        btn.classList.add('disclosure-btn');
        btn.classList.add(this.btnClass);
        btn.innerHTML = elemInner;
        elemParent.innerHTML = '';
        elemParent.appendChild(btn);

        return this.root.querySelector(`.${this.btnClass}`);
    }

    /**
     * アクセシビリティに関する属性の付与
     *
     * @return {Void}
     */
    setA11y() {
        this.hook.setAttribute('aria-expanded', false);
        this.hook.setAttribute('aria-controls', this.contentId);
    }

    /**
     * コンテンツを空ける処理
     *
     * @return {Void}
     */
    open() {
        this.contentHeight = this.contentInner.clientHeight;
        this.content.style.height = '0px';
        this.root.classList.add(this.openClass);
        this.btnIcon.firstElementChild.innerText = '閉じる';

        this.changeText();

        setTimeout(() => {
            this.hook.setAttribute('aria-expanded', true);
            this.content.style.height = `${this.contentHeight}px`;
        }, 100);
    }

    /**
     * コンテンツを閉じる処理
     *
     * @return {Void}
     */
    close() {
        this.contentHeight = this.contentInner.clientHeight;
        this.content.style.height = `${this.contentHeight}px`;
        this.btnIcon.firstElementChild.innerText = '開く';

        this.changeText();

        setTimeout(() => {
            this.hook.setAttribute('aria-expanded', false);
            this.content.style.height = '0px';
        }, 100);
    }

    changeText() {
        if (!this.btnText) {
            return;
        }

        if (this.hook.getAttribute('aria-expanded') === 'true') {
            this.btnText.innerText = this.closedText;
        } else {
            this.btnText.innerText = this.openedText;
        }
    }
}
