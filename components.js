// components.js

class NoteTitleInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        input:invalid {
          border-color: red;
        }
      </style>
      <input type="text" placeholder="Judul catatan..." required minlength="3">
    `;
    this.inputElement = this.shadowRoot.querySelector('input');
    this.inputElement.addEventListener('input', () => this.validate());
  }

  validate() {
    if (this.inputElement.value.length < 3) {
      this.inputElement.setCustomValidity('Judul harus memiliki setidaknya 3 karakter.');
    } else {
      this.inputElement.setCustomValidity('');
    }
  }

  static get observedAttributes() {
    return ['placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'placeholder') {
      this.inputElement.setAttribute('placeholder', newValue);
    }
  }
}

customElements.define('note-title-input', NoteTitleInput);

class NoteBodyTextarea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        textarea {
          width: 100%;
          height: 150px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }
        textarea:invalid {
          border-color: red;
        }
      </style>
      <textarea placeholder="Isi catatan..." required minlength="5"></textarea>
    `;
    this.textareaElement = this.shadowRoot.querySelector('textarea');
    this.textareaElement.addEventListener('input', () => this.validate());
  }

  validate() {
    if (this.textareaElement.value.length < 5) {
      this.textareaElement.setCustomValidity('Isi catatan harus memiliki setidaknya 5 karakter.');
    } else {
      this.textareaElement.setCustomValidity('');
    }
  }

  static get observedAttributes() {
    return ['placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'placeholder') {
      this.textareaElement.setAttribute('placeholder', newValue);
    }
  }
}

customElements.define('note-body-textarea', NoteBodyTextarea);

class AddNoteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
      </style>
      <button>Tambah Catatan</button>
    `;
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addNote'));
    });
  }
}

customElements.define('add-note-button', AddNoteButton);


