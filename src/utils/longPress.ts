export default function longPress(el, longPressCallback, touchCallback) {
  if (el) {
    let timer = null,
      longPress = false;

    el.addEventListener('touchstart', () => {
      timer = setTimeout(() => {
        longPress = true;
      }, 600);
    });
    el.addEventListener('touchend', () => {
      if (longPress) {
        longPressCallback();
      } else {
        touchCallback();
      }
      longPress = false;
      clearTimeout(timer);
    });
  }
}
