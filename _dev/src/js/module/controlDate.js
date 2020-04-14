/**
 *
 * 日付制御
 *
 * @constructor
 * @classdesc : 選択した年月によって、出す日数を制御する
 *
 * @param  {String} elem : 対象となる年月日要素を囲んだ要素
 */
export default class ControlDate {
    constructor(elem) {
        this.root = document.querySelector(elem);

        if (!this.root) {
            return;
        }

        this.yaerElem = this.root.querySelector('.js-control-year');
        this.monthElem = this.root.querySelector('.js-control-month');
        this.dayElem = this.root.querySelector('.js-control-day');

        this.initialOperation();

        this.yaerElem.addEventListener('change', () => {
            this.setDay();
        });
        this.monthElem.addEventListener('change', () => {
            this.setDay();
        });

        this.dayElem.addEventListener('focus', () => {
            this.setDay();
        });
    }

    initialOperation() {
        if (this.dayElem.selectedIndex !== 0) {
            return;
        }

        this.setDay();
    }

    /**
     * this.yearElem と this.monthElem の値が変わった時に日数を変更
     *
     * @return {Void}
     */
    setDay() {
        const yearVal = this.yaerElem.value;
        const monthVal = this.monthElem.value;
        const dayVal = this.dayElem.value;
        let selectedDayOptionIndex;

        if (!yearVal || !monthVal) {
            return;
        }

        if (dayVal) {
            const dayElemL = this.dayElem.options.length;

            for (let i = 0; i < dayElemL; i++) {
                if (this.dayElem.options[i].selected) {
                    selectedDayOptionIndex = i;

                    break;
                }
            }
        }

        /**
         * 選択された月が何日あるかを返す
         *
         * @return {Number} 選択された月の日数
         *
         * @param  {Number} year : this.yearElem の値
         * @param  {Number} month : this.monthElem の値
         */
        const setLastDay = (yaer, month) => {
            const lastDay = ['', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            // うるう年の判定
            if (yaer) {
                if (
                    (
                        yaer % 4 === 0 &&
                        yaer % 100 !== 0
                    ) ||
                    yaer % 400 === 0
                ) {
                    lastDay[2] = 29;
                }
            }

            return lastDay[month];
        };
        const lastDay = setLastDay(yearVal, monthVal);
        let option = '<option label="選択してください"></option>';

        for (let i = 1; i <= lastDay; i++) {
            if (i === dayVal) {
                option += `<option value="${i}" selected="selected">${i}</option>`;
            } else {
                option += `<option value="${i}">${i}</option>`;
            }
        }

        this.dayElem.innerHTML = option;

        if (selectedDayOptionIndex) {
            this.dayElem.options[selectedDayOptionIndex].selected = true;
        }
    }
}
