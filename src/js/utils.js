function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(p1, p2) {
  const xDist = p1.x - p2.x;
  const yDist = p1.y - p2.y;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function arctan (p1,p2){
  return Math.atan2(p1.y - p2.y, p1.x -p2.x)
}

function random (max, min) {
  const delta = max - min;
  return Math.random()*delta + min;
}

//necessário para uso em """lambdas"""
function add (numA, numB) {
  return numA + numB;
}

module.exports = {randomColor, distance, random, arctan, add}
