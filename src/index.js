import Overworld from "./OverWorld";
import "./styles/global.css";

const overworld = new Overworld({
  element: document.querySelector(".game-container"),
});
overworld.init();
