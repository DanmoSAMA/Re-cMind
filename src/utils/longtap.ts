export default class LongTap implements ILongTap{
  constructor(element, duration) {
    this.element = element;
    this.duration = duration || 600; //长按触发的时长,默认600毫秒
    this.timer = null;
    this.startEvent = 'touchstart';
    this.moveEvent = 'touchmove';
    this.endEvent = 'touchend';
    this.eventJudge();
  }

  longTap(callback) {
    // console.log(this.startEvent, this.moveEvent, this.endEvent);
    this.element.addEventListener(
      this.startEvent,
      () => this.touchStart(callback),
      false
    );
    this.element.addEventListener(
      this.moveEvent,
      () => this.touchMove(),
      false
    );
    this.element.addEventListener(this.endEvent, () => this.touchEnd(), false);
  }

  touchStart(callback) {
    let cb = (...args) => typeof callback === 'function' && callback(...args);
    this.timer = setTimeout(() => cb(), this.duration);
  }

  touchMove() {
    this.timer && clearTimeout(this.timer);
  }

  touchEnd() {
    this.timer && clearTimeout(this.timer);
  }

  //判断是移动端还是PC端
  eventJudge() {
    let click = ['mousedown', 'mouseout', 'mouseup'];
    let touch = ['touchstart', 'touchmove', 'touchend'];
    let touchSupport = 'ontouchstart' in window;
    [this.startEvent, this.moveEvent, this.endEvent] = touchSupport
      ? touch
      : click;
  }
}
