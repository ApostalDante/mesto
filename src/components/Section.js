class Section {
  constructor({ items, renderer }, elementContainer) {
    this._items = items;
    this._renderer = renderer;
    this._elementContainer = elementContainer;
  };

  renderItems() {
    this._items.forEach(this._renderer);
  };

  addItem(cardElement) {
    this._elementContainer.prepend(cardElement);
  };
};

export default Section;
