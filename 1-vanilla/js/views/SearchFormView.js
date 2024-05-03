import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvent();
  }
  // input태그에 어떠한 이벤트가 발생하면 해당하는 것을 보여줌
  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }
  // bindEvent 함수 호출 시 기능을 하는 것
  bindEvent() {
    on(this.inputElement, "keyup", () => this.handlekeyup())
    on(this.element, "submit", (event) => this.handleSubmit(event))
    on(this.resetElement, "click", () => this.handleReset())
  }
  handlekeyup() {
    console.log(tag, "handle keyup", this.inputElement.value);
    const {value} = this.inputElement
    this.showResetButton(value.length > 0)

    if(value.length <= 0) {
      this.handleReset();
      }
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(tag, "handleSubmit");
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
  handleReset(){
    console.log(tag, "handleReset");
    this.emit('@reset');
  }
}
