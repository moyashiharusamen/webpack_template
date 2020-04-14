/**
 *
 * カレントリンク
 *
 * @constructor
 * @classdesc : URL と合致する href を持つ a 要素に特定のクラスを付与
 *
 * @param  {String} elem : 対象となる a 要素を囲んだ要素
 */
export default class CurrentLink {
    constructor(elem) {
        this.root = document.querySelector(elem);

        if (!this.root) {
            return;
        }

        this.pathname = location.pathname;

        if (this.pathname.indexOf('index.html') !== -1) {
            this.pathname = this.pathname.replace(/index.html/g, '');
        }

        this.currentElems = document.querySelectorAll(`[href="${this.pathname}"]`);

        this.addClass();
    }

    /**
     * 合致すると判定された a 要素に特定のクラスを付与
     *
     * @return {Void}
     */
    addClass() {
        Array.prototype.forEach.call(this.currentElems, (val) => {
            val.classList.add('is-current');
        });
    }
}
