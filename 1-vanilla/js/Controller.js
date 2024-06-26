import { TabType } from "./views/TabView.js";

const tag = "[Controller]";
export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents()
    this.render()
  }

  subscribeViewEvents() {
    this.searchFormView.on('@submit', (event) => this.search(event.detail.value));
    this.searchFormView.on("@reset", () => this.reset());
  }

  search(searchKeyword){
    console.log(tag, "search", searchKeyword);
    this.store.search(searchKeyword)
    this.render()
  }

  reset(){
    console.log(tag, "reset");
    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }

  render(){
    if(this.store.searchKeyword.length > 0){
      this.tabView.hide()
      this.searchResultView.show(this.store.searchResult)
      return
    }

    this.tabView.show();
    this.searchResultView.hide();
  }
}
