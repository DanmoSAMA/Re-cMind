<script lang="tsx">
import { defineComponent, inject, ref } from 'vue';
import downArrow from '../../../../assets/downarrow.svg';
import rightArrow from '../../../../assets/rightarrow.svg';

import Item from './components/Item/Item.vue';

export default defineComponent({
  name: 'Favorite',
  props: {
    deleteInFav: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const favInfo = inject('favInfo');
    const rootFolded = ref(true);
    const { deleteInFav } = props;

    return () => (
      <>
        <div class="main-wrapper-inner-favorite">
          {/*@ts-ignore*/}
          {favInfo.keyWord !== '' ? (
            <div
              class={
                rootFolded.value
                  ? 'main-wrapper-inner-favorite-root_word folded'
                  : 'main-wrapper-inner-favorite-root_word'
              }
            >
              {/*@ts-ignore*/}
              {favInfo.keyWord}
              {/*@ts-ignore*/}
              {favInfo.children.length ? (
                <img
                  class="main-wrapper-inner-favorite-icon"
                  src={rootFolded.value ? rightArrow : downArrow}
                  onTouchstart={() => {
                    rootFolded.value = !rootFolded.value;
                  }}
                />
              ) : (
                ''
              )}
              {/*@ts-ignore*/}
              <Item keyWords={favInfo.children} deleteInFav={deleteInFav} />
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main-wrapper-inner-favorite {
  width: 100vw;
  height: 92vh;
  flex-shrink: 0;
  background-color: #fafafa;
  letter-spacing: 0.2rem;

  &-root_word {
    padding: 0.5rem 1.7rem 0.5rem 0.5rem;
    color: #918195;
    font-size: 1.25rem;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2.5rem;
  }

  &-root_word.folded {
    overflow: hidden;
    background-color: #eee;
    color: #aaa;
    height: 2.5rem;
  }

  &-icon {
    position: absolute;
    width: 1.6rem;
    top: 1rem;
    right: 0.8rem;
    filter: invert(0.5);
  }
}
</style>
