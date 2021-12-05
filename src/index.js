import Overworld from "./OverWorld";
import "./style.css";

const overworld = new Overworld({
  element: document.querySelector(".game-container"),
});
overworld.init();
