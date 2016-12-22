import React, { Component } from 'react'

const log = console.log

const platform = typeof window === 'undefined' ? global : window

const TIMER_TIMEOUT     = 'timeout'
const TIMER_INTERVAL    = 'interval'
const TIMER_IMMEDIATE   = 'immediate'
const TIMER_RAF         = 'raf'


function noop(){}

function setter(timer, clear, type) {
  return function (callback, delta) {
    const id = timer(function() {
      clear.call(this.id)
      callback.apply(this, id)
    }.bind(this), delta)

    if (!this[type]) {
      this[type] = [id]
    } else {
      this[type].push(id)
    }
    return id
  }
}

function clearer(clear, type) {
  return function(id) {
    if (!this[type]) {
      return
    }
    const index = this[type].indexOf(id)
    if (index !== -1) {
      this[type].splice(index, 1)
    }
    clear(id)
  }
}


export default function timerSafely(clazz) {

  clazz.prototype.setTimeout = setter()
  clazz.prototype.clearTimeout = clearer()
  clazz.prototype.setInterval = setter()
  clazz.prototype.clearInterval = clearer()
  clazz.prototype.setImmediate = setter()
  clazz.prototype.clearImmediate = clearer()
  clazz.prototype.requestAnimationFrame = setter()
  clazz.prototype.cancelAnimationFrame = clearer()

  const componentWillUnmount = clazz.prototype.componentWillUnmount || noop
  clazz.prototype.componentWillUnmount = function () {
    return componentWillUnmount.call(this)
  }

  return clazz
}

