<template>
    <button
    v-on:click
    class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
    >
        <slot></slot>
    </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default {
    name: 'PxButton',

    methods: {
        click(){
            this.$emit('click')
        }
    },
}
</script>
