<template>
    <div 
        class="w-1/7 p-4 border border-grey text-center group relative"
        :class="{ 'bg-green': day.isWorking, 'bg-red': !day.isWorking }">
        <tooltip v-if="day.reason" class="hidden group-hover:block">{{ day.reason }}</tooltip>
        <span>{{ day.dateStr }}</span>
    </div>
</template>

<script>
import Tooltip from '~/components/Tooltip.vue'

export default {
    components: {
        Tooltip,
    },
    props: ['day'],
    updated () {
        console.log('day')
    },
}
</script>

<style>

</style>
