<script lang="tsx">
import { defineComponent, inject } from 'vue';
import loading from '../../../../../../assets/loading.png';

export default defineComponent({
  name: 'Input',
  props: {
    initRootWord: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { initRootWord } = props;
    const favInfo = inject('favInfo');

    return () => (
      <>
        <div class="main-wrapper-inner-keywords-input_wrapper">
          <input
            class="main-wrapper-inner-keywords-input_wrapper-input"
            placeholder="请输入根关键词"
          />
          <img
            src={loading}
            class="main-wrapper-inner-keywords-input_wrapper-icon"
          />
          <button
            class="main-wrapper-inner-keywords-input_wrapper-btn"
            onClick={() => {
              const Input = document.querySelector(
                '.main-wrapper-inner-keywords-input_wrapper-input'
              ) as HTMLInputElement;
              initRootWord(Input.value);
            }}
          >
            {
              // @ts-ignore
              favInfo.keyWord === '' ? '提交' : '修改'
            }
          </button>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main-wrapper-inner-keywords-input_wrapper {
  position: absolute;
  // bottom: 33rem;
  top: 3rem;
  z-index: 1;
  box-sizing: border-box;
  width: 100vw;
  padding: 0 5vw;
  display: flex;

  &-input {
    width: 60%;
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

  &-icon {
    position: absolute;
    left: 16rem;
    top: 0.5rem;
  }

  &-btn {
    padding: auto 0px;
    height: 2.6rem;
    line-height: 2.3rem;
    width: 4.3rem;
    outline: none;
    margin-left: 0.7rem;
    font-size: 1.24rem;
    border-radius: 1rem;
    border: 2px solid #c3a5ff;
    color: #666;
    letter-spacing: .1875rem;
  }
}
</style>
