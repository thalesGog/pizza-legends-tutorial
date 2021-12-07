const withGrid = (n) => n * 16;

const asGridCoord = (x, y) => `${x * 16},${y * 16}`;

const nextPosition = (initialX, initialY, direction) => {
  let x = initialX;
  let y = initialY;
  const size = 16;
  if (direction === "left") {
    x -= size;
  } else if (direction === "right") {
    x += size;
  } else if (direction === "up") {
    y -= size;
  } else if (direction === "down") {
    y += size;
  }
  return { x, y };
};

export { withGrid, asGridCoord, nextPosition };
