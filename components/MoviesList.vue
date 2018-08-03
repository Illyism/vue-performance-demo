<template>
    <div class="">
        <div class="p-4 flex flex-wrap justify-center align-center">
            <div v-for="movie in movies" :key="movie.id"
                class="w-full md:w-1/2 lg:w-1/3 xl:w-128 p-2">
                <MovieCard
                    :movie="movie"
                    :genres="genres"
                    :likes="likes"
                />
            </div>
        </div>
    </div>
</template>

<script>
import MovieCard from '~/components/MovieCard.vue';

export default {
    components: {
        MovieCard,
    },
    props: ['movies', 'genres', 'likes'],
    updated () {
        console.log('updated MovieList')
    },
}
</script>

<style>

</style>
