// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Rings from "../rings"

class Region extends React.Component {
  state = { code: null }

  componentDidMount = () => {
    var code = null
    var json = localStorage.getItem("code")
    if(json) this.setState({ code: JSON.parse(json) })

    if(!this.state.code)
      fetch(`/place/${this.props.name}`)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem("code", JSON.stringify(response))
        return response
      })
      .then(response => this.setState({ code: response }))
  }

  render = () => (
    <div style={{ background: '#bbe4c6', padding: '2rem' }} >
      Hello {this.props.name}!

      {this.state.code &&
        <Rings code={this.state.code} />
      }
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Region name="us-michigan" />,
    document.body.appendChild(document.createElement('div')),
  )
})

Rails.start()
Turbolinks.start()
ActiveStorage.start()
