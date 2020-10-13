<template>
  <b-card class="position-relative">
    <div class="position-absolute icon">
      <b-dropdown
        size="lg"
        variant="link"
        toggle-class="text-decoration-none"
        right
        no-caret
      >
        <template v-slot:button-content>
          <b-icon icon="three-dots-vertical" />
        </template>
          <b-dropdown-item
            v-for="(item, index) in options"
            :key="index"
             @click="emitAction(item.actionId)"
          >
           <span
            v-text="item.label"
           />
          </b-dropdown-item>
        
      </b-dropdown>
    </div>
    <b-card-title v-text="title" />
    <b-card-text v-text="text" />
  </b-card>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "text", "options"],
  methods: {
    emitAction(actionId){
      console.log(actionId);
      this.$emit('option-selected', actionId)
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  top: 1em;
  right: 1em;
}
</style>
