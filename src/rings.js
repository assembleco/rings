import React from "react"
import paper from "paper"

class Rings extends React.Component {
  constructor(p) {
    super(p)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    paper.setup(this.canvas.current)

    var background = new paper.Path.Rectangle(
      paper.view.bounds
    )
    background.fillColor = "#f8f6bb"

    var size = 0.98 * Math.min(paper.view.center.x, paper.view.center.y)
    place_subring_layer(paper, paper.view.center, size)
  }

  render = () => (
    <canvas
    style={{
      width: "80vw",
      height: "80vh",
      border: "1px solid black",
      display: "block",
    }}
    ref={this.canvas}
    />
  )
}

var place_subring_layer = (paper, center, size) => {
  var number_layers = 4
  var remaining_subrings = 120

  new paper.Path.Circle({ center, radius: size, strokeColor: "black" })

  // layer by layer
  while(remaining_subrings > 0) {
    var number_subrings_in_layer = subrings_in_layer(remaining_subrings)
    console.log(number_subrings_in_layer, "of", remaining_subrings)

    remaining_subrings = remaining_subrings - number_subrings_in_layer

    var theta = 2 * Math.PI / number_subrings_in_layer
    var l = 1.0 / (size * Math.sin(theta))
    var r = 1.0 / (size)
    var layer_radius = 1.0 / (l + r)
    console.log(layer_radius)
  }
}

var subrings_in_layer = (number_subrings) => {
  var PI = Math.PI

  for(var k = 2; k < number_subrings; k ++) {
    var minus = 1 - Math.sin(PI / k)
    var plus = 1 + Math.sin(PI / k)
    var f = minus * minus / (plus * plus)

    if(f >= (number_subrings - (1.0 * k)) / number_subrings)
      return k
  }

  return number_subrings
}

export default Rings
