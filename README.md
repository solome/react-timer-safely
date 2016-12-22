Timer functions for executing code in the future that are safely cleaned up when the react component unmounts.

## Usage

```
import { Component } from 'react'
import timerSafely from 'react-timer-safely'

@timerSafely class TimerSafelyComponent extends Component {

  handleImmediate = () => {
    // prepend `this.`
    this.setTimeout(fn, 500)
  }

  rende() {
    return (
      <main>
        <button onClick={this.handleImmediate}>async event</button>
      </main>
    )
  }
}
```

You can replace your calls to `setTimeout(fn, 500)` with `this.setTimeout(fn, 500)` (just prepend `this.`) and everything will be properly cleaned up for you.
