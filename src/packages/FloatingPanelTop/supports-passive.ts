import { canUseDom } from './can-use-dom';

export let supportsPassive = false;

if (canUseDom) {
  try {
    const opts = {};
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('test-passive', () => {}, opts);
    window.removeEventListener('test-passive', () => {}); // 清理测试事件监听器
  } catch (e) {
    console.log(e, 'error')
  }
}
