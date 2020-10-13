<template>
  <div>
    <Card 
      :title="card.title"
      :text="card.text"
      :options="card.options"
      @option-selected="action"
    />
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Home',
  components : {
    Card
  },
  data(){
    return {
      card: {
        title: 'Titulo de la Card',
        text: 'It is a long established fact that a reader will be distrac making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        options: [
          {
            label: 'Option',
            actionId: 1
          }
        ]
      }
    }
  },
  methods: {
    action(actionId){
      alert(`Action: ${actionId}`)
    }
  }
}
</script>
