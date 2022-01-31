<script lang="tsx">
import { defineComponent } from 'vue';
import router from '../../router';

export default defineComponent({
  name: 'Instruction',
  setup() {
    function jumpToHome() {
      router.push({ path: '/' });
    }
    return () => (
      <>
        <div class="instruction">
          <h1 class="instruction-title">使用说明：</h1>
          <div class="instruction-content">
            <div class="instruction-content-item">
              1.
              在页面上方的输入框中输入根关键词，点击提交，即可在收藏夹中生成对应项。如果想更换关键词，则重新输入根关键词，点击"修改"。
            </div>
            <div class="instruction-content-item">
              2.
              与此同时，页面上会出现与之相关联的词语，单击这些词，可以进入下一层级；长按这些词，可以将其加入收藏夹。
            </div>
            <div class="instruction-content-item">
              3.
              点击页面上的加号，可以自定义一个词语，点击它，可以进入下一层级；长按可以修改词语，它无法被加入收藏夹。
            </div>
            <div class="instruction-content-item">
              4. 在收藏夹页面，可以通过点击"X"，来删除关键词。
            </div>
            <div class="instruction-content-item">
              5. 当整合好收藏夹内的关键词后，可以生成思维导图。
            </div>
          </div>
          <button
            class="instruction-return_btn"
            onTouchstart={() => {
              jumpToHome();
            }}
          >
            返回首页
          </button>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.instruction {
  padding: 1rem;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #f4dcf7;

  &-title {
    margin: 0 0 2rem 0;
    padding: 0;
    font-weight: normal;
    color: #333;
  }

  &-content {
    &-item {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
  }

  &-return_btn {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    border: none;
    outline: none;
    border-radius: 1.5rem;
    box-sizing: border-box;
    font-size: 1.3rem;
    background-color: rgb(194, 154, 201);
    letter-spacing: 0.3125rem;
    margin-top: 2rem;
  }
}
</style>
