class Section {
  constructor({ renderer }, elementContainer) {
    this._renderer = renderer;
    this._elementContainer = elementContainer;
  };

  renderItems(arrItems) {
    arrItems.forEach(this._renderer);
  };

  addItem(cardElement) {
    this._elementContainer.prepend(cardElement);
  };
};

export default Section;
