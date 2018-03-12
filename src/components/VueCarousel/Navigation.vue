<template>
  <div class="VueCarousel-navigation">
    <a href="#"
      class="VueCarousel-navigation-button VueCarousel-navigation-prev"
      v-on:click.prevent="triggerPageAdvance('backward')"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceBackward }">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="32" viewBox="0 0 18 32">
        <defs>
          <path id="im7pa" d="M44.25 8884.1l-13.9 13.9 13.9 13.9"/>
        </defs>
        <g transform="translate(-28 -8882)">
          <use fill="#fff" fill-opacity="0" stroke="#fff" stroke-miterlimit="50" xlink:href="#im7pa"/>
        </g>
      </svg>
    </a>
    <a href="#"
      class="VueCarousel-navigation-button VueCarousel-navigation-next"
      v-on:click.prevent="triggerPageAdvance()"
      v-bind:class="{ 'VueCarousel-navigation--disabled': !canAdvanceForward }">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19" height="31" viewBox="0 0 19 31">
        <defs>
          <path id="ehkba" d="M1238.35 8884.36l13.95 14.14-13.95 14.14"/>
        </defs>
        <g transform="translate(-1236 -8883)">
          <use fill="#fff" fill-opacity="0" stroke="#fff" stroke-miterlimit="50" xlink:href="#ehkba"/>
        </g>
      </svg>
    </a>
  </div>
</template>

<script>
  export default {
    name: "navigation",
    data() {
      return {
        parentContainer: this.$parent,
      }
    },
    props: {
      sliderId: {
        type: Number,
        default: 0,
      },
      clickTargetSize: {
        type: Number,
        default: 8
      },
      nextLabel: {
        type: String,
        default: "▶"
      },
      prevLabel: {
        type: String,
        default: "◀"
      },
    },
    computed: {
      canAdvanceForward() {
        return this.parentContainer.canAdvanceForward || false
      },
      canAdvanceBackward() {
        return this.parentContainer.canAdvanceBackward || false
      },
    },
    methods: {
      triggerPageAdvance(direction) {
        if (direction) {
          this.$parent.advancePage(direction)

          ga('send', 'event', 'Slider', `slider-${this.sliderId}`, direction)

        } else {
          this.$parent.advancePage()
        }
      },
    },
  }
</script>

<style scoped>
  .VueCarousel-navigation-button {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
  }

  svg {
    width: 6em;
    height: 6em;
  }

  .VueCarousel-navigation-next {
    right: 1vw;
    transform: translateY(-50%)
  }

  .VueCarousel-navigation-prev {
    left: 1vw;
    transform: translateY(-50%)
  }

  .VueCarousel-navigation--disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
