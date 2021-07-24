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
    place_subring_layer(paper, paper.view.center, size, this.props.code[0])
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

var place_subring_layer = (paper, center, size, code) => {
  var remaining_subrings = code.contents.length

  new paper.Path.Circle({ center, radius: size, strokeColor: "black" })
  var layer_size = size

  // layer by layer
  var subring_index = 0
  while(remaining_subrings > 0) {
    var number_subrings_in_layer = subrings_in_layer(remaining_subrings)
    remaining_subrings = remaining_subrings - number_subrings_in_layer

    var theta = Math.PI / number_subrings_in_layer
    var l = 1.0 / (layer_size * Math.sin(theta))
    var r = 1.0 / (layer_size)
    var subring_radius = 1.0 / (l + r)

    for(var i = 0; i < number_subrings_in_layer; i++) {
      var angle = 2 * theta * i;
      var x = center.x + (layer_size - subring_radius) * Math.cos(angle)
      var y = center.y + (layer_size - subring_radius) * Math.sin(angle)

      new paper.Path.Circle({
        center: [x, y],
        radius: subring_radius,
        strokeColor: "brown",
      })

      if(code.contents[subring_index].contents) {
        place_subring_layer(
          paper,
          { x, y },
          subring_radius,
          code.contents[subring_index],
        )
      }

      subring_index += 1
    }

    layer_size = layer_size - 2 * subring_radius
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
