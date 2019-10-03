<template>
	<transition :card='now(index)' name='cards' enter-active-class='animated flipInY' leave-active-class='animated flipOutY' mode='out-in'>
		<div class="wr" key='face' v-if='cardIs'>
			<div class="num">{{card.title}}</div>
			<div class="suit">{{card.suit}}</div>
			<div class="num2">{{card.title}}</div>
		</div>
		<div @click='change' key='shirt' class="shirt" v-else></div>
	</transition>
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
		width: 35px;
		height: 25px;
	}
	.wr {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 5px;
		width: 100px;
		height: 150px;
		background-color: red;
	}
	.suit{
		width: 	50px;
		height: 50px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 25px;
		background: green;
	}
	.num2{
		width: 35px;
		height: 25px;
		margin-top: 20px;
		margin-left: auto;	
		margin-bottom: 0;
	}
	.shirt {
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		background: url(../../img/newSuit.jpg);
		background-size: 100% 100%;
		border-radius: 5px;
		width: 100px;
		height: 150px;
	},
	.icon-enter{
		
	}

	.icon-enter-active{
		
	}

	.icon-enter-to{
				
	}

	.icon-leave{
				
	}

	.icon-leave-active{
				
	}

	.icon-leave-to{
				
	}
</style>