import { LitElement, html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { CMMDButton } from '@cmmd-web/button/src/CMMDButton.js';
import { CMMDInput } from '@cmmd-web/input/src/CMMDInput.js';
import { CMMDCheckbox } from '@cmmd-web/checkbox/src/CMMDCheckbox.js';

import styles from './AccessibleTodoList.style.js';

export class AccessibleTodoList extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cmmd-button': CMMDButton,
      'cmmd-input': CMMDInput,
      'cmmd-checkbox': CMMDCheckbox,
    };
  }

  static get properties() {
    return {
      _todoList: { type: Array },
      _newTodo: { type: String },
      _disabledButton: { type: Boolean },
      _liveRegionFeedback: { type: String },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    /***
     * List of todos
     * @type {Array}
     */
    this._todoList = [{ value: 'Buy chocolate', status: false }];

    /**
     * Input modelValue
     * @type {String}
     */
    this._newTodo = '';

    /**
     * Enable or disable add todo button
     * @type {boolean}
     */
    this._disabledButton = true;
  }

  /**
   * Check if the input value is valid and enable or disable the addTodo button
   * Also save the model value of the input newTodo in a private variable
   * @param {Event} event keyup input event
   */
  validateAndSaveInput() {
    const inputNewTodo = this.shadowRoot.getElementById('newTodo');

    this._newTodo = inputNewTodo.value;

    this._newTodo.length > 0
      ? (this._disabledButton = false)
      : (this._disabledButton = true);
  }

  /**
   * Add a new todo item to the list, also provide feedback for screen reader users
   * @param {Event} e
   */
  addTodo(e) {
    e.preventDefault();

    this._todoList.push({ value: this._newTodo, status: false });

    // Add feedback for screen reader users
    this._liveRegionFeedback = `${this._newTodo} added`;

    this._newTodo = '';
  }

  checkTodo(index) {
    this._todoList[index].status = !this._todoList[index].status;
    this.requestUpdate();
  }

  /**
   * It renders the empty state of the Todo List
   */
  renderEmptyState() {
    return html`
      <div class="empty-state">
        <p>
          Either you've done everything already or there are still things to add
          to your list. Add your first todo &#x2193;
        </p>
      </div>
    `;
  }

  /**
   * It renders the live region for screen reader users
   */
  renderLiveRegion() {
    return html`
      <div id="liveRegion" role="status" aria-live="polite" class="vh">
        ${this._liveRegionFeedback}
      </div>
    `;
  }

  /**
   * It renders the List of todos
   */
  renderListOfTodos() {
    return html`<ul>
      ${this._todoList.map((item, index) => {
        return html`
          <li>
            <cmmd-checkbox
              class=${classMap({ checked: item.status })}
              label=${item.value}
              .choiceValue=${item.value}
              ?checked=${item.status}
              @click=${_ => this.checkTodo(index)}
            ></cmmd-checkbox>
          </li>
        `;
      })}
    </ul>`;
  }

  /**
   * It renders the form to add todos
   */
  renderForm() {
    return html`
      <form>
        <cmmd-input
          id="newTodo"
          name="newTodo"
          type="text"
          aria-label="Write a new todo item"
          placeholder="E.g. Adopt an owl"
          aria-invalid="${this._disabledButton}"
          .modelValue=${this._newTodo}
          @keyup=${_ => this.validateAndSaveInput()}
        ></cmmd-input>
        <cmmd-button
          class="add-todo-button"
          type="submit"
          ?disabled=${this._disabledButton}
          @click=${e => this.addTodo(e)}
        >
          Add
        </cmmd-button>
      </form>
    `;
  }

  render() {
    return html`
      <main>
        <section aria-labelledby="todos-label">
          <h1 id="todos-label">My Todo List</h1>

          ${this._todoList.length === 0
            ? this.renderEmptyState()
            : this.renderListOfTodos()}
          ${this.renderForm()} ${this.renderLiveRegion()}
        </section>
      </main>
    `;
  }
}
