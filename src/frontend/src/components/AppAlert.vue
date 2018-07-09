<template>
  <div class="AppAlert alert"
    :class="{
      'alert-success': (type !== 'error'),
      'alert-danger': (type === 'error')
    }"
  >
    <button type="button" class="close" @click="closeButton" v-if="close">
      <span>&times;</span>
    </button>
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: "AppAlert",
    props: {
      theTitle: "",
      close: false,
      type: false
    },
    methods: {
      closeButton() {
        this.$emit("close");
      }
    }
  };
</script>

<style scoped>
  .AppAlert {
  }
</style>
