<script lang="tsx">
import { defineComponent, onUpdated } from 'vue';
import BScroll from '@better-scroll/core';

import downArrow from '../../../../../../assets/downarrow.svg';
import rightArrow from '../../../../../../assets/rightarrow.svg';
import cross from '../../../../../../assets/cross.svg';

const Item = defineComponent({
  name: 'Item',
  props: {
    keyWords: {
      type: Array,
      default: [],
    },
    deleteInFav: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { keyWords, deleteInFav } = props;

    function initSlide() {
      const wrapperArr = document.getElementsByClassName(
        'main-wrapper-inner-favorite-children_wrapper'
      );
      for (let i = 0; i < wrapperArr.length; i++) {
        // @ts-ignore
        new BScroll(wrapperArr[i], {
          scrollX: true,
          scrollY: false,
          click: true,
          momentum: false,
          bounce: false,
          stopPropagation: true,
          pullUpLoad: true,
          wheel: true,
        });
      }
    }

    onUpdated(() => {
      initSlide();
      console.log('initSlide - children');
    });

    return () => (
      <>
        <div class="main-wrapper-inner-favorite-children_wrapper">
          <div class="main-wrapper-inner-favorite-children">
            {keyWords.length
              ? keyWords.map((item) => (
                  <div
                    class={
                      // @ts-ignore
                      (!item.children).length
                        ? 'main-wrapper-inner-favorite-child'
                        : // @ts-ignore
                        item.spread
                        ? 'main-wrapper-inner-favorite-child hasIcon spread'
                        : 'main-wrapper-inner-favorite-child hasIcon'
                    }
                  >
                    {/*@ts-ignore*/}
                    {item.keyWord}
                    {/*@ts-ignore*/}

                    <img
                      class={
                        // @ts-ignore
                        item.spread
                          ? 'main-wrapper-inner-favorite-child-icon spread'
                          : 'main-wrapper-inner-favorite-child-icon'
                      }
                      // @ts-ignore
                      src={item.spread ? downArrow : rightArrow}
                      onTouchstart={() => {
                        // @ts-ignore
                        item.spread = !item.spread;
                      }}
                    />

                    <img
                      class="main-wrapper-inner-favorite-child-cross"
                      src={cross}
                      onTouchstart={() => {
                        // @ts-ignore
                        deleteInFav(item.keyWord, keyWords);
                      }}
                    />
                    {/*@ts-ignore*/}
                    <Item keyWords={item.children} deleteInFav={deleteInFav} />
                  </div>
                ))
              : ''}
          </div>
        </div>
      </>
    );
  },
});

export default Item;
</script>
<style lang="scss">
.main-wrapper-inner-favorite-children_wrapper {
  width: 100vw;
  overflow: hidden;
}

.main-wrapper-inner-favorite-children {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
}

.main-wrapper-inner-favorite-children::-webkit-scrollbar {
  width: 0 !important;
}

.main-wrapper-inner-favorite-child {
  height: 3rem;
  margin: 0.5rem 0.5rem 0 0.5rem;
  line-height: 3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.3125rem rgba($color: #000, $alpha: 0.3);
  text-align: center;
  position: relative;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
  max-width: 8rem;
  min-width: 8rem;
  transition: all 0.5s;
  padding: 0 1.3rem 0 0.5rem;

  &-icon {
    position: absolute;
    width: 1.2rem;
    top: 0.8rem;
    right: 1.6rem;
    filter: invert(0.5);
  }

  &-cross {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 1rem;
    z-index: 9999;
  }
}

.main-wrapper-inner-favorite-child.hasIcon {
  padding-right: 2rem;
}

.main-wrapper-inner-favorite-child.spread {
  max-width: 96%;
  min-width: 96%;
  height: auto;
  box-sizing: border-box;
  padding-right: 0.5rem;
}
</style>
