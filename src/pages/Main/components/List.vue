<script lang="tsx">
import { defineComponent, inject, ref, Ref } from 'vue';
import uptri from '../../../assets/uptri.svg';
import righttri from '../../../assets/righttri.svg';

export default defineComponent({
  name: 'List',
  setup() {
    const totalLevel = inject('totalLevel') as number,
      currentLevel = inject('currentLevel') as number,
      levelArr: string[] = [],
      isFolded: Ref<boolean> = ref(true);

    for (let i = 1; i <= totalLevel; i++) {
      levelArr.push(`第${i}级`);
    }

    return () => (
      <>
        <div class="main-wrapper-inner-keywords-list">
          <ul
            class={
              isFolded.value
                ? 'main-wrapper-inner-keywords-list-body folded'
                : 'main-wrapper-inner-keywords-list-body'
            }
          >
            {levelArr.map((item) => (
              <li class="main-wrapper-inner-keywords-list-body-item">{item}</li>
            ))}
          </ul>
          <div class="main-wrapper-inner-keywords-list-footer">
            你的层级
            <img
              src={isFolded.value ? righttri : uptri}
              class="main-wrapper-inner-keywords-list-footer-icon"
              onClick={() => {
                isFolded.value = !isFolded.value;
              }}
            />
          </div>
        </div>
      </>
    );
  },
});
</script>
<style lang="scss">
.main-wrapper-inner-keywords-list {
  position: absolute;
  left: 0;
  bottom: 4rem;
  font-size: 1.17rem;
  width: 6.7rem;
  background-color: #c1b3db;
  border-top-right-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;

  &-body {
    padding: 0 1rem 0 0;
    max-height: 10.5rem;
    transition: max-height 0.3s ease-out;
    overflow: hidden;

    &-item {
      height: 2rem;
      line-height: 2rem;
      color: #8c729c;
      text-align: center;
      border-bottom: 0.125rem #8c729c solid;
    }
  }

  &-body.folded {
    max-height: 0;
    // padding-bottom: 0;
  }

  &-footer {
    height: 2.4rem;
    line-height: 2.4rem;
    background-color: #b2a4cc;
    color: #fff;
    border-top-right-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    padding-left: 0.3rem;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3);
    position: relative;

    &-icon {
      position: absolute;
      top: 0.5rem;
      right: 0.2rem;
      width: 1.5rem;
      filter: invert(1);
    }
  }
}
</style>
