<script lang="tsx">
import { defineComponent } from 'vue';

import Circle from '../../../../components/Circle.vue';
import Input from './components/Input/Input.vue';
import List from './components/List/List.vue';

export default defineComponent({
  name: 'KeyWords',
  props: {
    toNextLevel: {
      type: Function,
      default: () => {},
    },
    addToFav: {
      type: Function,
      default: () => {},
    },
    initRootWord: {
      type: Function,
      default: () => {},
    },
    toSpecifiedLevel: {
      type: Function,
      default: () => {},
    },
    changeWords: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const {
      toNextLevel,
      addToFav,
      changeWords,
      initRootWord,
      toSpecifiedLevel,
    } = props;

    return () => (
      <>
        <div class="main-wrapper-inner-keywords">
          <Circle
            toNextLevel={toNextLevel}
            addToFav={addToFav}
            changeWords={changeWords}
          />
          <Input initRootWord={initRootWord} />
          <List toSpecifiedLevel={toSpecifiedLevel} />
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main-wrapper-inner-keywords {
  width: 100vw;
  height: 92vh;
  flex-shrink: 0;
  overflow: hidden;

  & > div:first-child {
    position: relative;
    top: -8vh;
  }
}
</style>
