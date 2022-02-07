<template>
    <div>
        <bounce-loader :loading="isLoading" :color="#68d391" :size="100"></bounce-loader>
        <px-assets-table :assets="assets" />
    </div>
</template>

<script>
import api from '@/api'
import PxAssetsTable from '@/components/PxAssetsTable'

export default {
    name: 'Home',
    components: { PxAssetsTable },
    data() {
        return {
            assets: [],
            isLoading: false,
        }
    },
    created() {
        api.getAssets().then((assets) => (this.assets = assets))
    },
}
</script>
