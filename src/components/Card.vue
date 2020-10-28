<template>
	<div>
    <transition :card='now(index)' name='cards' enter-active-class='animated flipInY' leave-active-class='animated flipOutY' mode='out-in'>
      <div class="wr" key='face' v-if='cardIs'>
        <div class="num">{{card.title}}</div>
        <div class="suit" :class='cardFace'></div>
        <div class="num2">{{card.title}}</div>
      </div>
      <div @click='change' key='shirt' class="shirt" v-else></div>
    </transition>
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
	props: ['index'],
	data(){
		return {
			done: false,
			card: null
		}
	},
	computed: {
		cardIs() {
			if(this.card.isTurn) {
				return true;
			}
			else if(this.card.isDone) {
				return true;
			}
			else {
				return false;
			}
		},
    cardFace() {
      if(this.card.suit == 0) {
        return 'spade'
      }else if(this.card.suit == 1) {
        return 'diamond'
      }else if(this.card.suit == 2) {
        return 'club'
      }else if(this.card.suit == 3) {
        return 'heart'
      }
    }
	},
	methods: {
		change(){
			if(this.$store.getters.getTurned) {

			} else{
				this.card.isTurn = true;
				this.turnCard(this.index);
				this.$emit('cng',{

				})
			}

		},
		...mapActions({
			turnCard: 'turnCard'
		}),
		now(ind) {
			this.card = this.$store.getters.getCardByIndex(ind);
		}
	}
}
</script>
<style scoped>
	.num {
    margin-left: 1px;
    margin-top: -15px;
		width: 32px;
		height: 45px;
    font-size: 40px;
    margin-bottom: 2px;
	}
	.wr {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		width: 100px;
		height: 150px;
		background-color: white;

    border: 2px solid black;
	}
	.suit{
		width: 	80px;
		height: 80px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0px;
    margin-bottom: 0px;
	}
	.num2{
		width: 25px;
		height: 45px;
		margin-top: -14px;
		margin-left: auto;
		margin-bottom: 0;
    font-size: 40px;
	}
	.shirt {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		background: url(../../img/newSuit.jpg);
		background-size: 100% 100%;
    border: 2px solid black;
		border-radius: 5px;
		width: 100px;
		height: 150px;
	}
  .spade {
    background: url('../../img/spade.png');
    background-size: 100% 100%;
  }
  .heart {
    background: url('../../img/heart.png');
    background-size: 100% 100%;
  }
  .diamond {
    background: url('../../img/diamond.png');
    background-size: 100% 100%;
  }
  .club {
    background: url('../../img/club.png');
    background-size: 100% 100%;
  }
</style>
