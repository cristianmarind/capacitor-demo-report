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
    <b-card-body>
      <img class="w-100 h-auto" :src="image" >
    </b-card-body>
  </b-card>
</template>


<script>
export default {
  name: "Card",
  props: ["id", "title", "image", "options", 'cardIndex'],
  methods: {
    emitAction(actionId){
      this.$emit('option-selected', actionId, this.id)
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
