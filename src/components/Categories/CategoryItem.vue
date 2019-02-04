<template>
  <div>
    <div class="container" :class="{ dark: isDark }">
      <img :src="src" alt="" />
      <div class="content">
        <div class="name">{{ name }}</div>
        <div class="count">{{ count }}本</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-categories",
  props: ["isDark", "src", "name", "count"]
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0.5rem 0;
  height: 3.375rem;
  display: flex;
  &.dark {
    background-color: #f7f7f7;
  }
  img {
    height: 3.375rem;
    width: 2.5rem;
    margin-right: 0.875rem;
  }
  .content {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: space-between;
    .name {
      font-size: 1.125rem;
      color: #5b5b59;
      line-height: 2.125rem;
    }
    .count {
      font-size: 0.875rem;
      color: #9d9d9b;
    }
  }
}
</style>
