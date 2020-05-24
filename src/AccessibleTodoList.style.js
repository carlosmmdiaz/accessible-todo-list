import { css } from 'lit-element';

export default css`
  :host {
    min-height: 100vh;
    width: 20ch;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }

  main {
    flex-grow: 1;
  }

  form {
    display: flex;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }

  .empty-state {
    border: 0.1rem solid black;
    padding: 0.5rem;
    border-radius: 0.2rem;
    margin-bottom: 1rem;
  }

  .add-todo-button {
    margin-left: 12px;
  }

  .delete-todo-button {
    margin-top: -0.5rem;
    margin-left: 1rem;
  }

  /* No use of JavaScript for this, just CSS */
  .checkbox[checked] {
    text-decoration: line-through;
  }

  /* Visually hidden but not from screen readers */
  .vh {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
  }

  /* Remove focus style to elements focus by js */
  [tabindex='-1'] {
    outline: none;
  }

  /* Placeholder styles */
  ::-webkit-input-placeholder {
    color: #444;
    font-style: italic;
  }
  ::-moz-placeholder {
    color: #444;
    font-style: italic;
  }
  :-ms-input-placeholder {
    color: #444;
    font-style: italic;
  }
  :-moz-placeholder {
    color: #444;
    font-style: italic;
  }
`;
