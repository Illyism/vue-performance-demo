<template>
    <div 
        class="w-1/7 p-4 border border-white text-center group relative"
        :class="{ 'bg-blue-lighter': day.isWorking, 'bg-red-light': !day.isWorking }">
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
    props: ['day']
}
</script>
