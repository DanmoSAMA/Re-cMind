<script lang="tsx">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NotFound',
  setup() {
    return () => (
      <>
        <div class="msg">404 Not Found</div>
      </>
    );
  },
});
</script>
<style lang="scss">
.msg {
  font-size: 2rem;
}
</style>
