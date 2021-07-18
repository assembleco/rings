import React from "react"
import paper from "paper"

class Rings extends React.Component {
  constructor(p) {
    super(p)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    paper.setup(this.canvas.current)

    new paper.Path.Circle({
      center: paper.view.center,
      radius: 10,
      strokeColor: "black",
    })
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

export default Rings
