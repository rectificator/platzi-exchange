<template>
    <table>
        <thead>
            <tr class="bg-gray-100 border-b-2 border-gray-400">
                <th></th>
                <th>
                    <span>Ranking</span>
                </th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cap. de Mercado</th>
                <th>Variación 24hs</th>
                <td class="hidden sm:block">
                    <input
                        class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
                        id="filter"
                        placeholder="Buscar..."
                        type="text"
                        v-model="filter"
                    />
                </td>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="asset in filteredAssets"
                :key="asset.id"
                class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
            >
                <td>
                    <img
                        class="w-6 h-6"
                        :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
                        :alt="asset.name"
                    />
                </td>
                <td>
                    <b>#{{ asset.rank }}</b>
                </td>
                <td>
                    <router-link
                        class="hover:underline text-green-600"
                        :to="{ name: 'coin-detail', params: { id: asset.id } }"
                    >
                        {{ asset.name }}
                    </router-link>
                    <small class="lm-1 text-gray-500">
                        {{ asset.symbol }}
                    </small>
                </td>
                <td>
                    {{ asset.priceUsd | dollar }}
                </td>
                <td>
                    {{ asset.marketCapUsd | dollar }}
                </td>
                <td
                    :class="
                        parseFloat(asset.changePercent24Hr) < 0
                            ? 'text-red-600'
                            : 'text-green-600'
                    "
                >
                    {{ asset.changePercent24Hr | percent }}
                </td>
                <td class="hidden sm:block">
                    <px-button @click="goToCoin(asset.id)">
                        <span>Detalle</span>
                    </px-button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import PxButton from '@/components/PxButton'
export default {
    name: 'PxAssetsTable',
    components: {
        PxButton,
    },
    data() {
        return {
            filter: '',
            sortOrder: '',
        }
    },
    props: {
        assets: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        filteredAssets(){
            if(!this.filter){
                return this.assets
            }
            return this.assets.filter( asset => {
                return asset.symbol
                    .toLowerCase()
                    .includes(this.filter.toLowerCase()) ||
                    asset.name
                        .toLowerCase()
                        .includes(this.filter.toLowerCase())
            })
        },
    },
    methods: {
        goToCoin(id) {
            this.$router.push({ name: 'coin-detail', params: { id: id } })
        },
    },
}
</script>

<style scoped>
.up::before {
    content: '👆';
}

.down::before {
    content: '👇';
}

td {
    padding: 20px 0px;
    font-size: 0.6rem;
    text-align: center;
}

th {
    padding: 5px;
    font-size: 0.6rem;
}

@media (min-width: 640px) {
    td,
    th {
        padding: 20px;
        font-size: 1rem;
    }

    th {
        padding: 12px;
    }
}
</style>
