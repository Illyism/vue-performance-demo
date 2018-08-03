<template>
    <span :class="{ 'text-green': fps >= 60 }">{{ fps }}</span>
</template>

<script>
export default {
    data () {
        return {
            times: [],
            fps: 0
        }
    },
    mounted () {
        this.countFPS()
    },
    methods: {
        countFPS () {
            this.refreshLoop();
        },
        refreshLoop () {
            window.requestAnimationFrame(() => {
                const now = performance.now();
                while (this.times.length > 0 && this.times[0] <= now - 1000) {
                    this.times.shift();
                }
                this.times.push(now);
                this.fps = Math.min(this.times.length, 60);
                this.refreshLoop();
            });
        },
    }
}
</script>

<style>

</style>
