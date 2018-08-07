<template>
    <div 
        class="w-1/7 p-4 border border-white text-center group relative"
        :class="{ 'bg-blue-lighter': isWorking, 'bg-red-light': !isWorking }">
        <tooltip v-if="reason" class="hidden group-hover:block">{{ reason }}</tooltip>
        <span>{{ dateStr }}</span>
    </div>
</template>

<script>
import Tooltip from '~/components/Tooltip.vue'

export default {
    components: {
        Tooltip,
    },
    props: ['dateStr', 'isWorking', 'reason'],
    updated () {
        console.log('CalendarDay updated')
    }
}
</script>
