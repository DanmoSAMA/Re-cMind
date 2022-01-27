<script lang="tsx">
import { defineComponent } from 'vue';
import Circle from '../../components/Circle.vue'
import Mask from './components/Mask.vue'

export default defineComponent({
  setup() {
    return () => (
      <>
        <Mask />
        <Circle />
      </>
    )
  }
})
</script>
<style>

</style>