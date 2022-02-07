<template>
    <div class="flex-col">
        <div class="flex justify-center">
            <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100"></bounce-loader>
        </div>
        <template v-if="!isLoading">
            <div class="flex flex-col sm:flex-row justify-around items-center">
                <div class="flex flex-col items-center">
                    <img
                        :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                        :alt="asset.name"
                        class="w-20 h-20 mr-5"
                    />
                    <h1 class="text-5xl">
                        {{ asset.name }}
                        <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
                    </h1>
                </div>

                <div class="my-10 flex flex-col">
                    <ul>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                            <span>#{{ asset.rank }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio actual</b
                            >
                            <span>{{ asset.priceUsd | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b
                            >
                            <span>{{ min | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase"
                                >Precio más alto</b
                            >
                            <span>{{ max | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase"
                                >Precio Promedio</b
                            >
                            <span>{{ avg | dollar }}</span>
                        </li>
                        <li class="flex justify-between">
                            <b class="text-gray-600 mr-10 uppercase"
                                >Variación 24hs</b
                            >
                            <span>{{ asset.changePercent24Hr | percent }}</span>
                        </li>
                    </ul>
                </div>

                <div
                    class="my-10 sm:mt-0 flex flex-col justify-center text-center"
                >
                    <button
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cambiar
                    </button>

                    <div class="flex flex-row my-5">
                        <label class="w-full" for="convertValue">
                            <input
                                id="convertValue"
                                type="number"
                                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                            />
                        </label>
                    </div>

                    <span class="text-xl"></span>
                </div>
            </div>
            <line-chart 
            class="my-10"
            :colors="['orange']"
            :min="min"
            :max="max"
            :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
            />

            <h3 class="text-xl my-10">Mejores ofertas de cambio</h3>
            <table>
                <tr v-for="market in markets"
                :key="`${market.exchangeId}-${market.priceUsd}`"
                class="border-b"
                >
                    <td>
                        <b>{{ market.exchangeId }}</b>
                    </td>
                    <td> {{ market.priceUsd | dollar}} </td>
                    <td> {{market.baseSymbo}} / {{market.quoteSymbo}} </td>
                    <td>
                        <px-button 
                        v-if="!market.url"
                        @click="getWebSite(market)">
                            <slot>Obtener Link</slot>
                        </px-button>
                            <a
                            v-else 
                            class="hover:underline text-green-600 target" target="blank">
                            {{ market.url }}
                            </a>
                    </td>
                </tr>
            </table>
        </template>
    </div>
</template>

<script>
import api from '@/api'
import PxButton from "@/components/PxButton";
import bitcoin from "@/dummies/bitcoin";
import asset_history from "@/dummies/asset_history";
import markets from "@/dummies/markets";


export default {
    name: 'CoinDetail',

    components: { PxButton },

    data() {
        return {
            asset: {},
            history: [],
            markets: [],
            exchanges: [],
            isLoading: false,
        }
    },

    computed: {
        min() {
            // los 3 puntos "..."
            // antes de la variable significan destructuring
            /* 
                Mapeo y formateo todos los elementos que están en history
                para obtener únicamnete el priceUsd 
                */
            return Math.min(
                ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        max() {
            return Math.max(
                ...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2))
            )
        },

        avg() {
            return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
            },
    },

    created() {
        this.getCoin()
    },

    methods: {
        getWebSite (exchange) {
            return api.getExchange(exchange.exchangeId)
            .then(res => {
                // Para que Vue registre la creación
                // de la propiedad "url"
                // En lugar de
                //exchange.url = res.exchangeUrl
                // Usar
                this.$set(exchange, 'url', res.exchangeUrl)
            })
        },
        getCoin() {
            const id = this.$route.params.id
            this.isLoading = true

/*
  "Promise.all" 
  me permite ejecutar diferentes promises
  de manera simultanea a través de un Array
  y poder manejar la respuesta cuando todas las
  promesas en la lista hayan terminado de ejecutarse
  */
            Promise.all([api.getAsset(id), api.getAssetHistory(id), api.getMarkets(id), api.getExchange(id)])
            .then(
                ([asset, history, markets, exchanges]) => {
                    console.log('Asset: ', asset)
                    this.asset = asset
                    this.history = history
                    this.markets = markets
                    this.exchanges = exchanges
                }
            )
            .catch(e => {
                console.log(e)
                this.asset = bitcoin.data
                this.history = asset_history.data
            })
            .finally(() => (this.isLoading = false))
        },
    },
}
</script>

<style scoped>
td {
    padding: 10px;
    text-align: center;
}
</style>
