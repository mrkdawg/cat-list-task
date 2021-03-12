import "./polyfills";
import { CatListComponent } from "./components/cat-list/cat-list";
import { ImageModalComponent } from "./components/image-modal/image-modal";

// instantiate child components
const catList = new CatListComponent("#cat-list");
const modal = new ImageModalComponent("#image-modal");

// current category id
// 1-hats 2-space 4-sunglasses 5-boxes 7-ties 14-sinks 15-clothes
let category = 4;

// current page for api (to avoid displaying duplicates)
let page = 0;

// === init CatListComponent ===
// hide the loading state when the list has loaded and rendered
catList.element.addEventListener("rendered", e => {
  const data = e.detail;
  if (data === null) hideLoading();
  else hideLoading(data.length < 8);
});
// show modal on item select
catList.element.addEventListener("itemselected", e => {
  const item = e.detail;
  modal.show(item.url);
});
// render dom
catList.loadCatsList(category, page, true);
// === end CatListComponent ===

// attach render events for category changes
const categoryListItems = document.querySelectorAll("ul#category-list > li");
categoryListItems.forEach(item => {
  const button = item.querySelector("button");
  button.addEventListener("click", () => {
    categoryListItems.forEach(cli => cli.classList.remove("active"));
    category = +button.getAttribute("data-cat");
    catList.clear();
    showLoading();
    catList.loadCatsList(category, page = 0);
    console.log(page);
    item.classList.add("active");
  });
});

// dynamic/interactive dom elements
const loadingElement = document.querySelector("#loading");
const loadMoreButton = document.querySelector("#button-load-more");
loadMoreButton.addEventListener("click", e => {
  showLoading();
  catList.loadCatsList(category, ++page);
});

function showLoading() {
  loadingElement.classList.remove("hidden");
  loadMoreButton.classList.remove("shown");
}

function hideLoading(end = false) {
  loadingElement.classList.add("hidden");
  if (!end) loadMoreButton.classList.add("shown");
}