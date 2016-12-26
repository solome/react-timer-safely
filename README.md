# TimerSafely

Timer functions for executing code in the future that are safely cleaned up when the react component unmounts.

## Usage

You can replace your calls to `setTimeout(fn, 500)` with `this.setTimeout(fn, 500)` (just prepend `this.`) and everything will be properly cleaned up for you.

```js
import React, { Component } from 'react'
import timerSafely from 'react-timer-safely'

@timerSafely
class TimerSafelyComponent extends Component {

  handleAsyncTimer = () => {
    // prepend `this.`
    this.setTimeout(fn, 500)
    this.setInterval(fn, 500)
    this.setImmediate(fn)
    this.requestAnimationFrame(fn)
  }

  rende() {
    return (
      <main>
        <button onClick={this.handleAsyncTimer}>async timer</button>
      </main>
    )
  }
}
```

## License

`react-timer-safely` is released under the MIT license.
