<script lang="tsx">
import { defineComponent } from 'vue';
import logo from '../../../assets/logo.png';
import router from '../../../router';

export default defineComponent({
  setup() {
    function jumpToMain() {
      router.push({ path: '/main' });
    }

    return () => (
      <>
        <div class="home-mask">
          <div class="home-mask-container">
            <h1 class="home-mask-container-title">欢迎来到</h1>
            <img class="home-mask-container-logo" src={logo} />
            <p class="home-mask-container-description">
              一款类头脑风暴式思维导图辅助工具
            </p>
          </div>
          <button
            class="home-mask-btn"
            onClick={() => {
              jumpToMain();
            }}
          >
            点击进入
          </button>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.home-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba($color: #220622, $alpha: 0.4);
  display: flex;
  justify-content: center;

  &-container {
    width: 100vw;
    position: absolute;
    top: 16vh;
    padding: 0 10vw;
    box-sizing: border-box;

    &-title {
      font-size: 1.25rem;
      color: #fff;
      font-weight: normal;
      letter-spacing: 0.2rem;
      padding-left: 0.3125rem;
      margin: 0;
    }

    &-logo {
      width: 50vw;
      filter: grayscale(100%) brightness(300%);
    }

    &-description {
      padding-left: 0.3125rem;
      margin: 0;
      color: #fff;
      font-size: 0.875rem;
      letter-spacing: 0.1rem;
      margin-top: 0.3rem;
    }
  }

  &-btn {
    outline: none;
    border: none;
    position: absolute;
    bottom: 12rem;
    left: 2rem;
    height: 2.2rem;
    line-height: 2.2rem;
    width: 6.5rem;
    border-radius: 1.1rem;
    font-size: 1.125rem;
    background-color: #b2a4cc;
    color: #fff;
  }
}
</style>
