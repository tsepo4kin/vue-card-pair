import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		cards: null,
		turned: false
	},
	getters: {
		getCards(state) {
			return state.cards
		},
		getCardByIndex: state => index => {
			return state.cards[index]
		},
		getTurned(state) {
			return state.turned;
		}
	},
	mutations: {
		turnCard(state, index) {
			for(let i = 0; i < state.cards.length; i++) {
				if(state.cards[i].ind == index) {
					state.cards[i].isTurn = true;
				}
			}
		},
		addCard(state, card) {
			state.cards = card
		},
		cancel(state, key) {
			for(let i = 0; i < state.cards.length; i++) {
				if(state.cards[i].key == key) {
					state.cards[i].isTurn = false;
				}
			}
		},

		done(state, key) {
			for(let i = 0; i < state.cards.length; i++) {
				if(state.cards[i].key == key) {
					state.cards[i].isDone = true;
					state.cards[i].isTurn = false;
				}
			}
		},
		changeTurned(state, res) {
			state.turned = res;
		}
	},
	actions: {
		fillCards(store, card) {
			store.commit('addCard', card);
		},
		turnCard(store, index) {
			store.commit('turnCard', index)
		},
		cancel(store, key) {
			store.commit('cancel', key)
		},
		done(store, key) {
			store.commit('done', key)
		},
		turned(store, res) {
			store.commit('changeTurned', res)
		}
	}
})