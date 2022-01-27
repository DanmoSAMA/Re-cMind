<script lang="tsx">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Instruction',
  setup() {
    return () => (
      <>
        <div class="instruction">
          <h1 class="instruction-title">使用说明：</h1>
          <div>
            1. 起初，关键词、收藏夹和导图页面都为空，层级为0。
            2. 在页面上方的输入框中输入根关键词，点击提交，即可在收藏夹中生成对应项，此时你的层级为1。
            3. 与此同时，页面上会出现与之相关联的词语，单击这些词，可以进入下一层级；双击这些词，可以将其加入收藏夹。
            待续...
          </div>
          <button class="instruction-return_btn">返回首页</button>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss"></style>
