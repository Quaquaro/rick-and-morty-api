import Button from './components/Button.js';
import Search from './components/Searchbar.js';

const buttons = document.querySelectorAll('[data-js=Button]');

buttons.forEach(Button);

Search();
