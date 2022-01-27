<script lang="tsx">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  nextTick,
  ref,
  Ref,
  provide,
} from 'vue';

import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { page } from '../../models/page';
import request from '../../network/request';

import Circle from '../../components/Circle.vue';
import Input from './components/Input.vue';
import List from './components/List.vue';

BScroll.use(Slide);

export default defineComponent({
  name: 'Main',
  setup() {
    let bs = null;
    let wrapper = null;
    const currentPage: Ref<page> = ref(page.keywords);
    let currentLevel = 0;
    let totalLevel = 1;
    // let keyWords = ['成步堂', '御剑', '千寻', '神乃木', '真宵'];
    let keyWords: Ref<string[]> = ref([]);

    provide('currentLevel', currentLevel);
    provide('totalLevel', totalLevel);

    onBeforeMount(async () => {
      const res = await request('黑客');
      keyWords.value = res.data;
    });

    onMounted(async () => {
      await nextTick();
      initSlide();
    });

    function initSlide() {
      wrapper = document.querySelector('.main-wrapper') as HTMLElement;

      bs = new BScroll(wrapper, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100,
          loop: false,
          autoplay: false,
        },
        // 不设置这一条，则左下角的list无法点击
        click: true,
        momentum: false,
        bounce: false,
        stopPropagation: true,
      });

      bs.on('scrollEnd', () => {
        currentPage.value = bs.getCurrentPage().pageX;
      });
    }

    function updateWords() {

    }

    return () => (
      <>
        <div class="main">
          <div class="main-topbar">
            <div
              class={
                currentPage.value === page.keywords
                  ? 'main-topbar-item selected'
                  : 'main-topbar-item'
              }
            >
              关键词
            </div>
            <div
              class={
                currentPage.value === page.favorite
                  ? 'main-topbar-item selected'
                  : 'main-topbar-item'
              }
            >
              收藏夹
            </div>
            <div
              class={
                currentPage.value === page.map
                  ? 'main-topbar-item selected'
                  : 'main-topbar-item'
              }
            >
              预览导图
            </div>
          </div>
          <div class="main-wrapper">
            <div class="main-wrapper-inner">
              <div class="main-wrapper-inner-keywords">
                <Circle keyWords={keyWords.value} />
                <Input />
                <List />
              </div>
              <div class="main-wrapper-inner-favorite">收藏夹</div>
              <div class="main-wrapper-inner-map">思维导图</div>
            </div>
          </div>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main {
  width: 100vw;
  height: 100vh;

  &-topbar {
    width: 100vw;
    height: 8vh;
    line-height: 8vh;
    background-color: #bfa;
    display: flex;

    &-item {
      width: 33.3%;
      text-align: center;
      background-color: #f7f7f7;
      color: #dcdcdc;
      font-size: 1.2rem;
      letter-spacing: 0.1875rem;
    }

    &-item.selected {
      background-color: #fff;
      color: #acacac;
    }
  }

  &-wrapper {
    width: 100vw;
    height: 92vh;
    overflow: hidden;

    &-inner {
      display: flex;

      &-keywords {
        width: 100vw;
        height: 92vh;
        flex-shrink: 0;

        & > div:first-child {
          position: relative;
          top: -8vh;
        }
      }

      &-favorite {
        width: 100vw;
        height: 92vh;
        flex-shrink: 0;
      }

      &-map {
        width: 100vw;
        height: 92vh;
        flex-shrink: 0;
      }
    }
  }
}
</style>
