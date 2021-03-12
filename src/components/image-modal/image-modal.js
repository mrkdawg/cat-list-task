import "./image-modal.scss";

export class ImageModalComponent {

  constructor(selector) {
    this.element = document.querySelector(selector);
    this.imageElement = null;
    this.hidden = true;

    this.render();
  }

  render() {
    this.element.addEventListener("click", () => this.hide());
    window.addEventListener("keydown", e => {
      if (e.code === "Escape") this.hide();
    });

    const header = document.createElement("div");
    header.id = "image-modal-header";

    const closeButton = document.createElement("button");
    closeButton.addEventListener("click", () => this.hide());

    header.appendChild(closeButton);

    const imageArea = document.createElement("div");
    imageArea.id = "image-modal-area";

    this.imageElement = document.createElement("img");
    this.imageElement.addEventListener("click", e => {
      e.stopPropagation();
    });

    imageArea.appendChild(this.imageElement);

    this.element.appendChild(header);
    this.element.appendChild(imageArea);
  }

  show(imgUrl) {
    this.imageElement.src = imgUrl;
    this.element.classList.add("shown");
    this.hidden = false;
  }

  hide() {
    this.element.classList.remove("shown");
    this.hidden = true;
  }
}