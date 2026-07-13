/**
 * Demo web components for the sample app's custom component/control questions.
 *
 * The form engine lazy-loads this file via @angular-extensions/elements
 * (see custom-component-wrapper and custom-control-wrapper). It replaces the
 * external afe-ref-custom-components server that the original AMPATH setup
 * proxied to on port 8000.
 *
 * Contract (from the engine's wrappers):
 * - afe-content-display receives `config` and `dark` properties.
 * - afe-content-switcher receives `question`, `value`, `disabled` and
 *   `config` properties, and reports changes by dispatching an `on-change`
 *   CustomEvent whose `detail.data` carries the new value.
 */

// Angular may set properties on the element instance before this script has
// defined the custom element class. Re-installing them after upgrade makes
// sure they go through the class accessors.
function upgradeProperties(element, properties) {
  for (const property of properties) {
    if (Object.prototype.hasOwnProperty.call(element, property)) {
      const value = element[property];
      delete element[property];
      element[property] = value;
    }
  }
}

class AfeContentDisplay extends HTMLElement {
  #config = {};
  #dark = false;

  connectedCallback() {
    upgradeProperties(this, ['config', 'dark']);
    this.render();
  }

  get config() {
    return this.#config;
  }

  set config(value) {
    this.#config = value || {};
    this.render();
  }

  get dark() {
    return this.#dark;
  }

  set dark(value) {
    this.#dark = !!value;
    this.render();
  }

  render() {
    if (!this.isConnected) {
      return;
    }
    const background = this.#dark ? '#f4f4f4' : '#ffffff';
    this.style.display = 'block';
    this.style.padding = '0.5rem 1rem';
    this.style.margin = '0.5rem 0';
    this.style.background = background;
    this.style.borderLeft = '3px solid #0f62fe';
    this.textContent = this.#config.detail || 'afe-content-display';
  }
}

class AfeContentSwitcher extends HTMLElement {
  #question = null;
  #value = null;
  #disabled = false;

  config = {};

  connectedCallback() {
    upgradeProperties(this, ['question', 'value', 'disabled', 'config']);
    this.render();
  }

  get question() {
    return this.#question;
  }

  set question(value) {
    this.#question = value;
    this.render();
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
    this.render();
  }

  get disabled() {
    return this.#disabled;
  }

  set disabled(value) {
    this.#disabled = !!value;
    this.render();
  }

  get #options() {
    const options = this.#question?.options || [];
    return options.filter((option) => option.value !== '');
  }

  #select(value) {
    if (this.#disabled) {
      return;
    }
    this.#value = value;
    this.render();
    this.dispatchEvent(new CustomEvent('on-change', { detail: { data: value } }));
  }

  render() {
    if (!this.isConnected) {
      return;
    }
    this.style.display = 'inline-flex';
    this.style.gap = '0';
    this.setAttribute('role', 'group');
    if (this.#question?.label) {
      this.setAttribute('aria-label', this.#question.label);
    }
    this.replaceChildren(
      ...this.#options.map((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = option.label;
        button.disabled = this.#disabled;
        const selected = option.value === this.#value;
        button.setAttribute('aria-pressed', String(selected));
        button.style.cssText = [
          'padding: 0.5rem 1rem',
          'border: 1px solid #8d8d8d',
          'cursor: pointer',
          `background: ${selected ? '#393939' : '#ffffff'}`,
          `color: ${selected ? '#ffffff' : '#161616'}`
        ].join(';');
        button.addEventListener('click', () => this.#select(option.value));
        return button;
      })
    );
  }
}

if (!customElements.get('afe-content-display')) {
  customElements.define('afe-content-display', AfeContentDisplay);
}

if (!customElements.get('afe-content-switcher')) {
  customElements.define('afe-content-switcher', AfeContentSwitcher);
}
