export default class ControlTabIndex {
    constructor() {
        this.body = document.body;
        this.focusable = 'a[href], area[href], input, select, textarea, button, output, video, audio, object, embed, iframe, [tabindex], [onclick]';
        this.focusableElems = this.body.querySelectorAll(this.focusable);
        this.tabindex = null;
        this.tabindexed = 'is-tabindexed';
        this.dataTabindex = 'data-tabindex';
    }

    /**
     * 指定した要素内にタブインデックスの設定
     * @param {object} elem - タブインデックスを設定するルート要素
     * @returns {void}
     */
    set(elem) {
        const focusableElem = Array.prototype.slice.call(elem.querySelectorAll(this.focusable), 0);

        focusableElem.forEach((val) => {
            this.tabindex = val.getAttribute('tabindex');

            if (!this.tabindex) {
                val.setAttribute('tabindex', '-1');
            } else {
                val.setAttribute(this.dataTabindex, val.getAttribute('tabindex'));
                val.setAttribute('tabindex', '-1');
                val.classList.add(this.tabindexed);
            }
        });
    }

    /**
     * 全体の要素にタブインデックスの設定
     * @returns {void}
     */
    setAll(...args) {
        const focusableElem = Array.prototype.slice.call(this.focusableElems, 0);
        let i; let l; let j; let m; let focusable; let target;

        focusableElem.forEach((val) => {
            this.tabindex = val.getAttribute('tabindex');

            if (!this.tabindex) {
                val.setAttribute('tabindex', '-1');
            } else {
                val.setAttribute(this.dataTabindex, val.getAttribute('tabindex'));
                val.setAttribute('tabindex', '-1');
                val.classList.add(this.tabindexed);
            }
        });

        // 引数に指定された要素内は tabindex の設定を削除
        for (i = 0, l = args.length; i < l; i++) {
            focusable = args[i].querySelectorAll(this.focusable);

            for (j = 0, m = focusable.length; j < m; j++) {
                target = focusable[j];

                if (target.classList.contains(this.tabindexed)) {
                    target.classList.remove(this.tabindexed);
                    target.setAttribute('tabindex', target.getAttribute(this.dataTabindex));
                    target.classList.removeAttribute(this.dataTabindex);
                } else {
                    target.removeAttribute('tabindex');
                }
            }
        }
    }

    /**
     * タブインデックスを元に戻す
     * @returns {void}
     */
    reset() {
        const focusableElem = Array.prototype.slice.call(this.focusableElems, 0);

        focusableElem.forEach((val) => {
            const hasTabIndexed = val.classList.contains(this.tabindexed);

            this.tabindex = val.getAttribute('tabindex');

            if (hasTabIndexed) {
                const dataTabindex = val.getAttribute(this.dataTabindex);

                setTimeout(() => {
                    val.setAttribute('tabindex', dataTabindex);
                    val.removeAttribute(this.dataTabindex);
                    val.classList.remove(this.tabindexed);
                }, 20);
            } else if (!hasTabIndexed) {
                val.removeAttribute('tabindex');
            }
        });
    }
}
