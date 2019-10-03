<template>
  <div class="container">
    <div class="row bg-success">
      <div class="col-lg bg-primary d-flex flex-wrap pb-2">
        <app-card 
          :key='index'
          @cng='getCard'
          :index='index'
          v-for='(n, index) in num'
        ></app-card>

      </div>
    </div>
  </div>
</template>

<script>
import AppCard from './components/Card'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      num: 8,
      card: [],
      a: [],
      keys: []
    }
  },
  components: {
    AppCard
  },
  computed: {
    isDone() {
      if(this.keys.length == 0) {
        for(let i = 0; i < this.card.length; i++) {
          if(this.card[i].isTurn) {
            this.keys.push({
              index: this.card[i].ind,
              key: this.card[i].key
            });
          }
        }
      }
      else{
        for(let i = 0; i < this.card.length; i++) {
          if(this.card[i].isTurn) {
            for(let j = 0; j < this.keys.length; j++) {
              if(this.keys[j].index != this.card[i].ind) {
                this.keys.push({
                  index: this.card[i].ind,
                  key: this.card[i].key
                });
              }
            }
          }
        }
        if(this.keys[0].key === this.keys[1].key) {
          this.done(this.keys[0].key);
          this.keys = [];
        }
        else{
          this.turned(true);
          setTimeout(()=>{
            this.cancel(this.keys[0].key);
            this.cancel(this.keys[1].key);
            this.keys = [];
            this.turned(false);
          }, 2000);
        }
      }

    }
  },
  methods: {
    ...mapActions ({
        fillCards: 'fillCards',
        cancel: 'cancel',
        done: 'done',
        turned: 'turned'
    }),
    getCard() {
      this.card = this.$store.getters.getCards;
      this.isDone;
      console.log(this.keys);
    },
  },
  created() {
      for(let i = 0; i < Math.floor(this.num / 2); i++) {
        let genTitle = Math.round(Math.random()*9);
        let genSuit = Math.round(Math.random()*4);
        this.card.push({
          title: genTitle,
          suit: genSuit,
          key: i,
          isTurn: false
        });
        this.a.push({
          title: genTitle,
          suit: genSuit,
          key: i,
          isTurn: false
        })
      }
      this.card = this.card.concat(this.a);
      this.card = this.card.sort(function(){
        return Math.random() - 0.5;
      });
      for(let ind = 0; ind < this.card.length; ind++) {
        this.card[ind].ind = ind;
        this.card[ind].isDone = false;
      }
      this.fillCards(this.card);
  }
}
</script>

<style>

</style>
