<script lang="tsx">
import { defineComponent, inject } from 'vue';
import { page } from '../../../../models/page';

export default defineComponent({
  name: 'TopBar',
  setup() {
    const currentPage = inject('currentPage');

    return () => (
      <>
        <div class="main-topbar">
          <div
            class={
              // @ts-ignore
              currentPage.value === page.keywords
                ? 'main-topbar-item selected'
                : 'main-topbar-item'
            }
          >
            关键词
          </div>
          <div
            class={
              // @ts-ignore
              currentPage.value === page.favorite
                ? 'main-topbar-item selected'
                : 'main-topbar-item'
            }
          >
            收藏夹
          </div>
          <div
            class={
              // @ts-ignore
              currentPage.value === page.map
                ? 'main-topbar-item selected'
                : 'main-topbar-item'
            }
          >
            预览导图
          </div>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main-topbar {
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
</style>
