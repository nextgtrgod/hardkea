<template>
  <div v-show="parentContainer.pageCount > 1" class="VueCarousel-pagination">
    <div class="VueCarousel-dot-container">
      <div
        class="VueCarousel-dot"
        v-bind:class="{ 'VueCarousel-dot--active': (index === parentContainer.currentPage) }"
        v-for="(page, index) in parentContainer.pageCount"
        v-on:click="parentContainer.goToPage(index)"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
        parentContainer: this.$parent,
      }
    },
  }
</script>

<style lang="less" scoped>
  .VueCarousel-pagination {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    text-align: center;
  }

  .VueCarousel-dot-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .VueCarousel-dot {
    width: 6px;
    height: 6px;
    margin: 10px;
    border-radius: 50%;
    background-color: #FFF;
    opacity: .5;
    transition-property: opacity, transfrom;
    transition-duration: .2s;
    cursor: pointer;

    &--active {
      transform: scale(2);
      opacity: 1;
    }
  }

  .VueCarousel-dot-inner {
    border-radius: 100%;
  }
</style>
