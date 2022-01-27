<script lang="tsx">
import { defineComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {

    return () => (
      <>
        {/*router.currentRoute.value.path === '/' ? <Home /> : <Main />*/}
        <RouterView />
      </>
    );
  },
});
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  font-size: 4.266vw;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
  padding: 0;
}
</style>
