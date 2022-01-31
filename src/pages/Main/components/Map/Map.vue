<template>
  <div class="main-wrapper-inner-map">
    <div class="main-wrapper-inner-map-container">
      <mindmap v-model="mapDataArr" v-if="showMap"></mindmap>
    </div>
    <div class="main-wrapper-inner-map-btn_wrapper">
      <button @click="updateMap" class="main-wrapper-inner-map-btn">
        重新生成
      </button>
      <button @click="closeMap" class="main-wrapper-inner-map-btn">关闭</button>
    </div>
    <div class="main-wrapper-inner-map-hint">
      请在整理好收藏夹的数据后，再生成思维导图！思维导图一经生成，则无法更新！
    </div>
  </div>
</template>

<script>
import mindmap from 'vue3-mindmap';
import 'vue3-mindmap/dist/style.css';
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  components: { mindmap },
  setup: () => {
    const favInfo = inject('favInfo');
    const mapData = { name: favInfo.keyWord, children: [] };
    const mapDataArr = [
      { name: '根', children: [{ name: '孩子1' }, { name: '孩子2' }] },
    ];
    const showMap = ref(false);

    function objStructor(arr1, arr2) {
      if (arr1.length === 0) {
        return;
      }
      // 先初始化
      arr2.length = 0;
      for (let i = 0; i < arr1.length; i++) {
        arr2.push({ name: arr1[i].keyWord, children: [] });
        objStructor(arr1[i].children, arr2[i].children);
      }
    }

    function updateMap() {
      mapData.name = favInfo.keyWord;
      objStructor(favInfo.children, mapData.children);
      mapDataArr.length = 0;
      mapDataArr.push(mapData);
      showMap.value = true;
      // console.log(mapDataArr);
    }

    function closeMap() {
      showMap.value = false;
    }

    return { mapDataArr, updateMap, showMap, closeMap };
  },
});
</script>
<style lang="scss">
.Mindmap_svg_fgvb6 {
  width: 100vw;
  height: 70vh;
}

.main-wrapper-inner-map-btn_wrapper {
  display: flex;
  width: 100vw;
  justify-content: space-evenly;
  position: absolute;
  bottom: 5rem;
}

.main-wrapper-inner-map-btn {
  outline: none;
  border: none;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 1.5rem;
  font-size: 1.3rem;
  background-color: rgb(236, 156, 236);
}

.main-wrapper-inner-map-hint {
  width: 100vw;
  position: absolute;
  bottom: 0.5rem;
  font-size: 1.1rem;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
