import { html } from 'lit-html';
import '../src/accessible-todo-list.js';

export default {
  title: 'accessible-todo-list',
};

export const App = () =>
  html`
    <accessible-todo-list></accessible-todo-list>
  `;
