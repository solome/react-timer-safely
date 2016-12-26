import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import timerSafely from '..'

require('./TimerSafelyTestComponent.scss')

@timerSafely
class TimerSafelyTestComponent extends Component {

  state = { intervalId: null, date: new Date() }

  constructor() {
    super()
  }

  handleTimeout = () => {
    const id = this.setTimeout(() => console.log('hello world@timeout'), 5000)
  }

  handleInterval = () => {
    const { intervalId } = this.state
    if (intervalId) {
      this.clearInterval(intervalId)
    }
    const id = this.setInterval(() => this.setState({date: new Date()}), 50)
    this.setState({intervalId: id})
  }

  handleClearInterval = () => {
    const { intervalId } = this.state
    if (intervalId) {
      this.clearInterval(intervalId)
    }
  }

  handleAnimationFrame = () => {
    const el4animate = document.getElementById('el4animate')

    let start = null
    const step = timestamp => {
      if (start === null) {
        start = timestamp
      }
      const progress = timestamp - start
      const clientWidth = document.body.clientWidth
      el4animate.style.left = Math.min(progress/10, clientWidth) + 'px'
      if (progress < (clientWidth-120) * 10) {
        const id = this.requestAnimationFrame(step)
      }
    }
    this.requestAnimationFrame(step)
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div>
          <button className="pure-button" onClick={this.handleTimeout}>setTimeout()</button>
        </div>
        <div>
          <span className="date fa fa-clock-o">{this.state.date.toString()}</span>
          <div>
            <button className="pure-button" onClick={this.handleInterval}>setInterval()</button>
            <button className="pure-button" onClick={this.handleClearInterval}>clearInterval()</button>
          </div>
        </div>
        <div>
          <button className="pure-button pure-button-disabled">setImmediate()</button>
          @see<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate">Window.setImmediate()</a>
        </div>
        <div>
          <button className="pure-button" onClick={this.handleAnimationFrame}>AnimationFrame()</button>
        </div>
      </div>
    )
  }
}

class TestApp extends Component {

  state = { unmount: false }
  constructor() {
    super()
  }

  renderTimerSafely = () => {
    const { unmount } = this.state

    if (unmount) {
      return null
    }
    return (
      <TimerSafelyTestComponent />
    )
  }
  render() {
    return (
      <main>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5em'}}>
          <button className="pure-button pure-button-primary"
            onClick={() => this.setState({unmount: !this.state.unmount})}>
            {this.state.unmount ? 'Unmounted' : 'Unmount'}
          </button>
          {this.renderTimerSafely()}
        </div>
      </main>
    )
  }
}

ReactDOM.render(
  <TestApp />,
  document.getElementById('container')
)
