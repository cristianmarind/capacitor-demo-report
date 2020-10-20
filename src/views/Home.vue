<template>
  <div class="pt-5 px-3">
    <button 
      @click="newReport"
      class="btn btn-success mb-3"
    >
      Nuevo Reporte
    </button>
    <div style="font-size: 2em" class="font-weight-bold mb-2">
      <span>Reportes</span>
    </div>
    <div v-for="(card, index) in cards" :key="index">
      <Card 
        :id="index"
        :title="card.title"
        :image="card.image"
        :options="options"
        @option-selected="action"
      />
    </div>
    
  </div>
</template>

<script>
import Card from '@/components/Card'
import {
  Storage,
  Plugins
} from "@capacitor/core";

const { Share } = Plugins

export default {
  name: 'Home',
  components : {
    Card
  },
  data(){
    return {
      cards: [],
      options: [
        {
          label: 'Compartir',
          actionId: 1
        },
        {
          label: 'Option 2',
          actionId: 2
        }
      ]
    }
  },
  async created(){
    const ret = await Storage.get({ key: 'reports' });
    this.cards = JSON.parse(ret.value)
  },
  methods: {
    newReport(){
      this.$router.push({
        path: '/createReport'
      })
    },
    async action(actionId, cardIndex){
      switch (actionId) {
        case 1:
          await Share.share({
            title: this.cards[cardIndex].title,
            url: this.cards[cardIndex].image,
          });
          break;
      
        default:
          break;
      }
    },
    share(){

    }
  }
}
</script>
