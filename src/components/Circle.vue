<script lang="tsx">
import { defineComponent, ref, Ref, inject, onMounted } from 'vue';
import longPress from '../utils/longPress';

import circle1 from '../assets/circle1.png';
import circle2 from '../assets/circle2.png';

export default defineComponent({
  name: 'Circle',
  props: {
    toNextLevel: {
      type: Function,
      default: () => {},
    },
    addToFav: {
      type: Function,
      default: () => {},
    },
    changeWords: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const showAddPage: Ref<boolean> = ref(false);
    const customWord: Ref<string> = ref('');
    const currentInfo = inject('currentInfo');
    const { toNextLevel, addToFav, changeWords } = props;

    onMounted(() => {
      // 区分长按和点击
      const customWordDom = document.querySelector('.c-circle-custom_word');
      const circleDom2 = document.querySelector('.c-circle-img_wrapper2');
      const circleDom3 = document.querySelector('.c-circle-img_wrapper3');
      const circleDom4 = document.querySelector('.c-circle-img_wrapper4');
      const circleDom5 = document.querySelector('.c-circle-img_wrapper5');

      longPress(
        customWordDom,
        () => {
          showAddPage.value = true;
        },
        () => {
          toNextLevel(customWord.value);
        }
      );

      longPress(
        circleDom2,
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[0] !== '') {
            // @ts-ignore
            addToFav(currentInfo.children[0]);
          }
        },
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[0] !== '') {
            // @ts-ignore
            toNextLevel(currentInfo.children[0]);
          }
        }
      );

      longPress(
        circleDom3,
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[1] !== '') {
            // @ts-ignore
            addToFav(currentInfo.children[1]);
          }
        },
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[1] !== '') {
            // @ts-ignore
            toNextLevel(currentInfo.children[1]);
          }
        }
      );

      longPress(
        circleDom4,
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[2] !== '') {
            // @ts-ignore
            addToFav(currentInfo.children[2]);
          }
        },
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[2] !== '') {
            // @ts-ignore
            toNextLevel(currentInfo.children[2]);
          }
        }
      );

      longPress(
        circleDom5,
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[3] !== '') {
            // @ts-ignore
            addToFav(currentInfo.children[3]);
          }
        },
        () => {
          // @ts-ignore
          if (currentInfo.children.length && currentInfo.children[3] !== '') {
            // @ts-ignore
            toNextLevel(currentInfo.children[3]);
          }
        }
      );
    });

    return () => (
      <>
        <div class="c-circle">
          <div class="c-circle-img_wrapper1">
            <img src={circle1} class="c-circle-img_wrapper-circle" />
            {customWord.value === '' ? (
              <span
                class="c-circle-add"
                onTouchstart={() => {
                  showAddPage.value = true;
                }}
              >
                +
              </span>
            ) : (
              ''
            )}
            <span
              class="c-circle-custom_word"
              onDblclick={() => {
                if (customWord.value !== '') {
                  addToFav(customWord.value);
                }
              }}
            >
              {customWord.value !== '' ? customWord.value : ''}
            </span>
          </div>
          <div class="c-circle-img_wrapper2">
            <img src={circle1} class="c-circle-img_wrapper-circle" />
            <span class="c-circle-img_wrapper-word">
              {/*@ts-ignore*/}
              {currentInfo?.children.length ? currentInfo.children[0] : ''}
            </span>
          </div>
          <div class="c-circle-img_wrapper3">
            <img src={circle2} class="c-circle-img_wrapper-circle" />
            <span class="c-circle-img_wrapper-word">
              {/*@ts-ignore*/}
              {currentInfo?.children.length ? currentInfo.children[1] : ''}
            </span>
          </div>
          <div class="c-circle-img_wrapper4">
            <img src={circle1} class="c-circle-img_wrapper-circle" />
            <span class="c-circle-img_wrapper-word">
              {/*@ts-ignore*/}
              {currentInfo?.children.length ? currentInfo.children[2] : ''}
            </span>
          </div>
          <div class="c-circle-img_wrapper5">
            <img src={circle1} class="c-circle-img_wrapper-circle" />
            <span class="c-circle-img_wrapper-word">
              {/*@ts-ignore*/}
              {currentInfo?.children.length ? currentInfo.children[3] : ''}
            </span>
          </div>
          <div class="c-circle-img_wrapper6">
            <img src={circle2} class="c-circle-img_wrapper-circle" />
            <span
              class="c-circle-img_wrapper-change"
              onTouchstart={() => {
                changeWords();
              }}
            >
              换一批
            </span>
          </div>
          <div class="c-circle-solid1"></div>
          <div class="c-circle-solid2"></div>
          <div class="c-circle-solid3"></div>
          <div class="c-circle-solid4"></div>
          <div class="c-circle-solid5"></div>
          <div class="c-circle-solid6"></div>
          <div class="c-circle-solid7"></div>
          <div
            class={
              showAddPage.value
                ? 'c-circle-add_page'
                : 'c-circle-add_page hidden'
            }
          >
            <input class="c-circle-add_page-input" placeholder="请输入关键词" />
            <div class="c-circle-add_page-btn">
              <button
                class="c-circle-add_page-btn-add"
                onTouchstart={() => {
                  showAddPage.value = false;
                  const input = document.querySelector(
                    '.c-circle-add_page-input'
                  ) as HTMLInputElement;
                  customWord.value = input.value;
                  input.value = '';
                }}
              >
                新建
              </button>
              <button
                class="c-circle-add_page-btn-cancel"
                onTouchstart={() => {
                  showAddPage.value = false;
                }}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.c-circle {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  & > div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &-img_wrapper1 {
    right: 0.625rem;
    top: 9rem;
    width: 8rem;
    height: 8rem;
  }

  &-img_wrapper2 {
    left: 2rem;
    top: 12rem;
    width: 10rem;
    height: 10rem;
  }

  &-img_wrapper3 {
    top: 21rem;
    width: 8.5rem;
    height: 8.5rem;
    left: 1rem;
  }

  &-img_wrapper4 {
    // bottom: 10rem;
    top: 23rem;
    right: 1rem;
    width: 9rem;
    height: 9rem;
  }

  &-img_wrapper5 {
    top: 31rem;
    right: 2rem;
    width: 11rem;
    height: 11rem;
  }

  &-img_wrapper6 {
    top: 37.5rem;
    left: 1rem;
    width: 9rem;
    height: 9rem;
  }

  &-solid1 {
    width: 5rem;
    height: 5rem;
    z-index: -1;
    background-color: #eceefb;
    top: 4rem;
    left: -0.5rem;
    border-radius: 50%;
  }

  &-solid2 {
    width: 4rem;
    height: 4rem;
    z-index: -1;
    background-color: #f3f4fb;
    top: 10rem;
    left: 2rem;
    border-radius: 50%;
  }

  &-solid3 {
    width: 1.5rem;
    height: 1.8rem;
    z-index: -1;
    background-color: #edeaf3;
    top: 7.8rem;
    left: 11rem;
    border-radius: 50%;
  }

  &-solid4 {
    width: 2rem;
    height: 2.5rem;
    z-index: -1;
    background-color: #d3c9e6;
    top: 19rem;
    right: 4rem;
    border-radius: 50%;
  }

  &-solid5 {
    width: 4.5rem;
    height: 4.5rem;
    z-index: -1;
    background-color: #f3f4fb;
    // bottom: 4rem;
    top: 32rem;
    left: 2.5rem;
    border-radius: 50%;
  }

  &-solid6 {
    width: 4rem;
    height: 4rem;
    z-index: -1;
    background-color: #f3f4fb;
    // bottom: 0.5rem;
    top: 37rem;
    right: 0.5rem;
    border-radius: 50%;
  }

  &-solid7 {
    width: 2rem;
    height: 2.7rem;
    z-index: -1;
    background-color: #f3f4fb;
    // bottom: 12rem;
    top: 29rem;
    left: -0.5rem;
    border-radius: 50%;
  }

  &-add_page {
    background-color: rgba($color: #220622, $alpha: 0.4);
    z-index: 10;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-input {
      width: 70%;
      height: 2rem;
      line-height: 2rem;
      outline: none;
      border: 2px solid #c3a5ff;
      border-radius: 1rem;
      padding: 0.1875rem 2.5rem 0.1875rem 0.5rem;
      font-size: 1.3rem;
      letter-spacing: 0.06rem;
      background-color: #eee;
    }

    &-btn {
      &-add,
      &-cancel {
        height: 2.6rem;
        line-height: 2.3rem;
        width: 6rem;
        outline: none;
        margin-top: 1rem;
        font-size: 1.3rem;
        border-radius: 1rem;
        border: 2px solid #c3a5ff;
        color: #666;
        letter-spacing: 0.5rem;
      }

      &-add {
        margin-right: 2rem;
      }
    }
  }

  &-add_page.hidden {
    display: none;
  }
}

.c-circle-img_wrapper-circle {
  position: absolute;
  width: 100%;
}

.c-circle-img_wrapper-word {
  position: absolute;
  color: #9e76a9;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  text-align: center;
}

.c-circle-img_wrapper-change {
  position: absolute;
  color: #9e76a9;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  text-align: center;
  top: 2.2rem;
}

.c-circle-add {
  position: absolute;
  font-size: 4rem;
  width: 70%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1rem;
  color: #b9a9d9;
  z-index: 1;
}

.c-circle-custom_word {
  position: absolute;
  color: #9e76a9;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
}
</style>
