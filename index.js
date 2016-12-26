import React, { Component } from 'react'

const platform = typeof window === 'undefined' ? global : window

const TIMER_TIMEOUT     = 'timeout'
const TIMER_INTERVAL    = 'interval'
const TIMER_IMMEDIATE   = 'immediate'
const TIMER_RAF         = 'raf'


function noop(){}

function setter(timer, clear, type) {
  return function (callback, delta) {
    const id = timer(callback, delta)

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

const timerClearTimeout =
  clearer(platform.clearTimeout, TIMER_TIMEOUT)
const timerSetTimeout  =
  setter(platform.setTimeout, timerClearTimeout, TIMER_TIMEOUT)

const timerClearInterval  =
  clearer(platform.clearInterval, TIMER_INTERVAL)
const timerSetInterval    =
  setter(platform.setInterval, timerClearInterval, TIMER_INTERVAL)

const timerClearImmediate =
  clearer(platform.clearImmediate, TIMER_IMMEDIATE)
const timerSetImmediate   =
  setter(platform.clearImmediate, timerClearImmediate, TIMER_IMMEDIATE)

const timerCancelAnimationFrame   =
  clearer(platform.cancelAnimationFrame, TIMER_RAF)
const timerRequestAnimationFrame  =
  setter(platform.requestAnimationFrame, timerCancelAnimationFrame, TIMER_RAF)


export default function timerSafely(clazz) {

  // `timer` functions prepend `this.`
  clazz.prototype.setTimeout = timerSetTimeout
  clazz.prototype.clearTimeout = timerClearTimeout

  clazz.prototype.setInterval = timerSetInterval
  clazz.prototype.clearInterval = timerClearInterval

  clazz.prototype.setImmediate = timerSetImmediate
  clazz.prototype.clearImmediate = timerClearImmediate

  clazz.prototype.requestAnimationFrame = timerRequestAnimationFrame
  clazz.prototype.cancelAnimationFrame = timerCancelAnimationFrame

  const componentWillUnmount = clazz.prototype.componentWillUnmount || noop

  clazz.prototype.componentWillUnmount = function () {

    // clear timer tasks
    this[TIMER_TIMEOUT] && this[TIMER_TIMEOUT].forEach(platform.clearTimeout)
    this[TIMER_TIMEOUT] = null

    this[TIMER_INTERVAL] && this[TIMER_INTERVAL].forEach(platform.clearInterval)
    this[TIMER_INTERVAL] = null

    this[TIMER_IMMEDIATE] && this[TIMER_IMMEDIATE].forEach(platform.clearImmediate)
    this[TIMER_IMMEDIATE] = null

    this[TIMER_RAF] && this[TIMER_RAF].forEach(platform.cancelAnimationFrame)
    this[TIMER_RAF] = null

    return componentWillUnmount.call(this)
  }

  return clazz
}

