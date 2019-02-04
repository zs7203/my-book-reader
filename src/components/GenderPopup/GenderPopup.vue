<template>
  <div>
    <van-nav-bar
      title="精选"
      fixed
      :right-text="this.gender === 'male' ? '男生' : '女生'"
      @click-right="show = true"
    >
      <!--<van-tag :type="gender === 'male' ? 'primary' : 'danger'" slot="right">{{gender === 'male' ? '男生' : '女生'}}</van-tag>-->
      <svg
        class=" my-icon icon"
        aria-hidden="true"
        v-if="gender === 'male'"
        slot="right"
      >
        <use xlink:href="#icon-boy"></use>
      </svg>
      <svg class=" my-icon icon" aria-hidden="true" v-else slot="right">
        <use xlink:href="#icon-girl"></use>
      </svg>
    </van-nav-bar>
    <van-popup
      v-model="show"
      :overlay="true"
      close-on-click-overlay
      class="gender-group"
    >
      <van-button type="primary" @click="onToggleGender('male')"
        >男生</van-button
      >
      <van-button type="danger" @click="onToggleGender('female')"
        >女生</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.showPopup
    };
  },
  computed: {
    ...mapState(["gender"])
  },
  methods: {
    onToggleGender(gender) {
      if (gender !== this.gender) {
        this.toggleGender();
      }
      this.show = false;
    },
    ...mapMutations({
      toggleGender: "TOGGLE_GENDER"
    })
  }
};
</script>

<style lang="scss" scoped>
.my-icon {
  font-size: 24px;
  line-height: 100px;
}
.gender-group {
  background-color: transparent;
  button {
    margin: 0 0.5rem;
    &.van-button--primary {
      background-color: #38f;
      border-color: #38f;
    }
  }
}
</style>
