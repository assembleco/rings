import React from "react"

class Rings extends React.Component {
  constructor(p) {
    super(p)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    console.log(this.canvas.current)
  }

  render = () => (
    <canvas ref={this.canvas} />
  )
}

export default Rings
