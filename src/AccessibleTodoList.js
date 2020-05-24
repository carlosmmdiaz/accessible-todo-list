import { LitElement, html } from 'lit-element';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { CMMDButton } from '@cmmd-web/button/src/CMMDButton.js';
import { CMMDInput } from '@cmmd-web/input/src/CMMDInput.js';
import { CMMDCheckbox } from '@cmmd-web/checkbox/src/CMMDCheckbox.js';
import { crossIcon } from '@cmmd-web/styles';

import styles from './AccessibleTodoList.style.js';

export class AccessibleTodoList extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cmmd-button': CMMDButton,
      'cmmd-input': CMMDInput,
      'cmmd-checkbox': CMMDCheckbox,
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
    this._todoList = [
      { value: 'Buy chocolate', status: false },
      { value: 'Buy milk', status: false },
    ];

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

    /**
     * Current content of the live region for screen reader users
     * @type {String}
     */
    this._liveRegionFeedback = '';
  }

  /**
   * Check if the input value is valid and enable or disable the addTodo button
   * Also save the inputValue for later use
   * @param {String} inputValue
   */
  onInputChange(inputValue) {
    this._newTodo = inputValue;

    inputValue.length > 0
      ? (this._disabledButton = false)
      : (this._disabledButton = true);

    this.requestUpdate();
  }

  /**
   * Add a new todo item to the list, also provide feedback for screen reader users
   * @param {Event} e
   */
  addTodo(e) {
    e.preventDefault();

    if (this._newTodo) {
      this._todoList.push({ value: this._newTodo, status: false });

      // Add feedback for screen reader users
      this._liveRegionFeedback = `Task called ${this._newTodo} added`;

      this._newTodo = '';

      this.requestUpdate();
    }
  }

  /**
   * Delete a todo item from the list,  also provide feedback for screen reader users
   * @param {Number} index
   */
  deleteTodo(index) {
    const taskName = this._todoList[index].value;

    if (confirm(`Do you want to delete ${taskName} task?`)) {
      this._todoList.splice(index, 1);

      // Add feedback for screen reader users
      this._liveRegionFeedback = `Task called ${taskName} deleted`;

      this.requestUpdate();

      // Change focus to avoid "ghost" focus
      this.shadowRoot.querySelector('h1').focus();
    }
  }

  /**
   * Change the status of a task
   * @param {Number} index
   */
  checkTodo(index) {
    this._todoList[index].status = !this._todoList[index].status;
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
              class="checkbox"
              label=${item.value}
              .choiceValue=${item.value}
              @click=${_ => this.checkTodo(index)}
            ></cmmd-checkbox>
            <cmmd-button
              class="delete-todo-button"
              @click=${_ => this.deleteTodo(index)}
              aria-label=${`Delete ${item.value}`}
              rounded
              danger
            >
              ${crossIcon}
            </cmmd-button>
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
          @model-value-changed=${e => this.onInputChange(e.target.value)}
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
          <h1 id="todos-label" tabindex="-1">My Todo List</h1>
          ${this._todoList.length === 0
            ? this.renderEmptyState()
            : this.renderListOfTodos()}
          ${this.renderForm()} ${this.renderLiveRegion()}
        </section>
      </main>
    `;
  }
}
