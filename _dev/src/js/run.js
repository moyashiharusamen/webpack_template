import HamburgerMenu from './module/hamburgerMenu';
import CurrentLink from './module/currentLink';
import PageScroll from './module/pageScroll';
import adjustmentPosition from './module/adjustmentPosition';
import ConrtolDate from './module/controlDate';
import Disclosure from './module/disclosure';
import MoveAnimation from './module/moveAnimation';

(() => {
    window.addEventListener('DOMContentLoaded', () => {
        // Disclosure
        Array.prototype.forEach.call(document.querySelectorAll('.js-disclosure'), (elem, i) => {
            const disclosure = new Disclosure(elem, i); //eslint-disable-line
        });

        // HamburgerMenu
        const hamburgerMenu = new HamburgerMenu('.js-header'); //eslint-disable-line

        // CurrentLink
        const currentLink = new CurrentLink('.js-current'); //eslint-disable-line

        // pageScroll
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), (elem) => {
            const pageScroll = new PageScroll(elem); //eslint-disable-line
        });

        // ConrtolDate
        const conrtolDate = new ConrtolDate('.js-control-date'); //eslint-disable-line

        // MoveAnimation
        Array.prototype.forEach.call(document.querySelectorAll('.js-add-animateClass'), (elem) => {
            const moveAnimation = new MoveAnimation(elem); //eslint-disable-line
        });
    });
})();
