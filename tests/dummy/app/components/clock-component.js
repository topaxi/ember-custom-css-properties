import Component from 'ember-component'

import run, {
  scheduleOnce
} from 'ember-runloop'

export default Component.extend({
  classNames: [ 'clock' ],
  cssPropertyBindings: [
    'width',
    'height',
    'hours',
    'minutes',
    'seconds',
    'hour',
    'minute',
    'second'
  ],

  width: '16px',
  height: '16px',

  _timer: null,

  startTimer() {
    let start = Date.now()
    let time  = 0
    let delay = 1000
    let self  = this

    clearTimeout(self._timer)
    self._timer = setTimeout(function timer() {
      run(() => {
        time += delay

        self.updateTime()

        let diff = Date.now() - start - time
        self._timer = setTimeout(timer, delay - diff)
      })
    }, delay)
  },

  endTimer() {
    clearTimeout(this._timer)
  },

  updateTime() {
    let date = new Date

    let second = date.getSeconds() * 6
    let minute = date.getMinutes() * 6 + second / 60
    let hour   = date.getHours() % 12 / 12 * 360 + 90 + minute / 12

    this.set('seconds', date.getSeconds())
    this.set('minutes', date.getMinutes())
    this.set('hours',   date.getHours())

    this.set('hour',   `${hour}deg`)
    this.set('minute', `${minute}deg`)
    this.set('second', `${second}deg`)
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, this.updateTime)
    scheduleOnce('afterRender', this, this.startTimer)
  },

  willDestroyElement() {
    this.endTimer()
  }
})
