<script lang="tsx">
import {
  defineComponent,
  onMounted,
  nextTick,
  ref,
  Ref,
  provide,
  reactive,
} from 'vue';

import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { page } from '../../models/page';
import request from '../../network/request';

import TopBar from './components/TopBar/TopBar.vue';
import KeyWords from './components/KeyWords/KeyWords.vue';
import Favorite from './components/Favorite/Favarite.vue';
import Map from './components/Map/Map.vue';

BScroll.use(Slide);

export default defineComponent({
  name: 'Main',
  setup() {
    let bs = null;
    let wrapper = null;
    const currentPage: Ref<page> = ref(page.keywords);

    // 所有层级信息(以下几个对象，有多余属性)
    const levelsInfo = reactive({
      count: 0,
      levels: [],
      keyWordsArr: [],
    });

    // 收藏夹信息
    const favInfo = reactive({
      keyWord: '',
      children: [],
    });

    // 当前层级信息
    const currentInfo = reactive({
      keyword: '',
      children: [],
      level: 0,
      // 指向收藏夹某处数组的指针
      favPointer: favInfo.children,
    });

    // 整个页面的滑动
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

    // 搜索根关键词
    async function initRootWord(word: string) {
      const res = await request(word);
      levelsInfo.count = 1;
      levelsInfo.levels.length = 0;
      levelsInfo.levels.push({
        keyWord: word,
        children: res.data,
      });
      levelsInfo.keyWordsArr.push(word);

      currentInfo.keyword = word;
      currentInfo.children = levelsInfo.levels[0].children;
      currentInfo.level = 1;

      favInfo.keyWord = word;
      favInfo.children.length = 0;
      currentInfo.favPointer = favInfo.children;

      console.log('initRootWord', word);
    }

    // 点击圈圈内的词，进入下一层级
    async function toNextLevel(word: string) {
      if (word) {
        const res = await request(word);
        levelsInfo.count++;
        levelsInfo.levels.push({
          keyWord: word,
          children: res.data,
        });
        levelsInfo.keyWordsArr.push(word);

        const favPointer = findWordInFav(word, favInfo);
        if (favPointer) {
          console.log('update favPointer', favPointer);
          currentInfo.favPointer = favPointer;
        }

        currentInfo.keyword = word;
        currentInfo.children = levelsInfo.levels[levelsInfo.count - 1].children;
        currentInfo.level = levelsInfo.count;

        console.log('toNextLevel');
      }
    }

    // 点击左下角，选择某一层级进入
    function toSpecifiedLevel(word: string, level) {
      console.log('toSpecifiedLevel', word, level);
      currentInfo.keyword = levelsInfo.keyWordsArr[level - 1];
      currentInfo.children = levelsInfo.levels[level - 1].children;
      currentInfo.level = level;

      const favPointer = findWordInFav(word, favInfo);
      if (favPointer) {
        currentInfo.favPointer = favPointer;
      }

      levelsInfo.count = level;
      levelsInfo.levels.length = level;
      levelsInfo.keyWordsArr.length = level;
    }

    // 换一批 
    function changeWords() {
      currentInfo.children.reverse()
    }

    // 在收藏夹内查找词，修改收藏夹指针
    function findWordInFav(word: string, favInfoObj) {
      let curWord = favInfoObj.keyWord;
      if (curWord === word) {
        // console.log(curWord, favInfoObj, favInfoObj.children);
        return favInfoObj.children;
      }
      for (let i = 0; i < favInfoObj.children.length; i++) {
        const data = findWordInFav(word, favInfoObj.children[i]);
        if (data) {
          return data;
        }
      }
    }

    // 加入收藏夹
    function addToFav(word: string) {
      console.log('addToFav', word);
      currentInfo.favPointer.push({
        keyWord: word,
        children: [],
        spread: false,
      });
    }

    // 删除收藏的词语
    function deleteInFav(word: string, favPointer) {
      // 确定删除后favPointer的指向(直接指向根的孩子)
      currentInfo.favPointer = favInfo.children;
      // 删除
      console.log('deleteInFav', word);
      const index = favPointer.findIndex((item) => item.keyWord === word);
      favPointer.splice(index, 1);
    }

    onMounted(async () => {
      await nextTick();
      initSlide();
    });

    provide('currentPage', currentPage);
    provide('currentInfo', currentInfo);
    provide('levelsInfo', levelsInfo);
    provide('favInfo', favInfo);

    return () => (
      <>
        <div class="main">
          <TopBar />
          <div class="main-wrapper">
            <div class="main-wrapper-inner">
              <KeyWords
                toNextLevel={toNextLevel}
                addToFav={addToFav}
                initRootWord={initRootWord}
                toSpecifiedLevel={toSpecifiedLevel}
                changeWords={changeWords}
              />
              <Favorite deleteInFav={deleteInFav} />
              <Map />
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

  &-wrapper {
    width: 100vw;
    height: 92vh;
    overflow: hidden;
    position: relative;

    &-inner {
      display: flex;
      overflow: hidden;
    }
  }
}
</style>
