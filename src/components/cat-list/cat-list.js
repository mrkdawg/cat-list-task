import "./cat-list.scss";
import { getCatsByCategory } from "../../api";
import utils from "../../utils";

export class CatListComponent {

  constructor(selector) {
    this.element = document.querySelector(selector);

    // list of cats to be populated by api
    this.items = [];

    // events for parent (main.js) to listen to
    this.$onRender = (items) => new CustomEvent("rendered", {
      detail: items
    });
    this.$onItemSelect = (item) => new CustomEvent("itemselected", {
      detail: item
    });
  }

  // get cats list from the api and render content
  loadCatsList(category, page, initial) {
    getCatsByCategory(category, page).then(data => {

      this.items = data;
      
      this.renderItems(initial);

      this.element.dispatchEvent(this.$onRender(this.items));

    }).catch(() => {

      this.renderError();

      this.element.dispatchEvent(this.$onRender());

    });
  }

  // render the dom list
  renderItems(initial = false) {
    // insert each cat list item
    this.items.forEach((item, i) => {
      const fileName = utils.extractFileNameFromURL(item.url);

      const listItem = document.createElement("li");
      listItem.setAttribute("tabindex", "0");

      const thumbnail = document.createElement("div");
      thumbnail.className = "cat-item-thumbnail";

      const img = document.createElement("img");
      img.src = item.url;
      img.alt = `A cool cat in sunglasses`;

      const text = document.createElement("p");
      text.textContent = fileName;

      thumbnail.appendChild(img);
      
      listItem.appendChild(thumbnail);
      listItem.appendChild(text);
      
      listItem.addEventListener("click", () => {
        this.element.dispatchEvent(this.$onItemSelect(item));
      });

      listItem.addEventListener("keyup", e => {
        if (e.code === "Enter") listItem.click();
      });

      this.element.appendChild(listItem);

      if (!initial && i === 0) listItem.focus();

    });
  }

  // show an error message
  renderError() {
    this.clear();
    const p = document.createElement("p");
    p.textContent = `Ahhh Something's wrong! Please try again.`;
    this.element.appendChild(p);
  }

  clear() {
    // clear current list
    this.element.innerHTML = "";
  }

}