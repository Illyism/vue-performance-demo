<template>
    <div class="absolute bg-white shadow p-4 pin-t pin-x -mt-16 rounded">
        <slot/>
    </div>
</template>

<script>
export default {
    mounted () {
        console.log('hi')
    }
}
</script>

<style>

</style>
