import React from "react"
import paper from "paper"

class Rings extends React.Component {
  state = { label: 'none' }

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
    this.place_subring_layer(paper, paper.view.center, size, this.props.code[0])

    this.paper = paper
  }

  render = () => (
    <>
      <div>Mouse on: {this.state.label}</div>

      <canvas
      style={{
        width: "80vw",
        height: "80vh",
        border: "1px solid black",
        display: "block",
      }}
      ref={this.canvas}
      />

      <button onClick={() => {
        var background = new paper.Path.Rectangle(
          paper.view.bounds
        )
        background.fillColor = "#f8f6bb"

        var size = 0.98 * Math.min(this.paper.view.center.x, this.paper.view.center.y)
        this.place_subring_layer(
          this.paper,
          this.paper.view.center,
          size,
          this.props.code[0].contents[0],
        )
      }}
      >
        Zoom
      </button>
    </>
  )

  place_subring_layer = (paper, center, size, code) => {
    var contents = code.contents.filter(x =>
      x.name !== "links.index"
      && x.name !== "names.index"
    )
    var remaining_subrings = contents.length

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

      var measures = code.contents
      for(var i = 0; i < number_subrings_in_layer; i++) {
        var shade = measures[i].size / 6000
        var color = `rgb(40, 60, ${(shade * 256).toFixed(0)})`
        var angle = 2 * theta * i;
        var x = center.x + (layer_size - subring_radius) * Math.cos(angle)
        var y = center.y + (layer_size - subring_radius) * Math.sin(angle)

        if(shade > 1) shade = 1
        var circle = new paper.Path.Circle({
          center: [x, y],
          radius: subring_radius,
          strokeColor: color,
          // fillColor: '#f8f6dd',
        })

        if(measures[i]) {
          circle.onMouseEnter = (e) => {
            this.setState({ label: code.contents[i].name })
            this.strokeColor = "red"
          }

          circle.onMouseLeave = (e) => {
            this.strokeColor = color
          }
        }

        if(contents[subring_index].contents) {
          this.place_subring_layer(
            paper,
            { x, y },
            subring_radius,
            contents[subring_index],
          )
        }

        subring_index += 1
      }

      layer_size = layer_size - 2 * subring_radius
    }
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
