<template>
    <div class="shadow hover:shadow-lg bg-white rounded text-grey-darker h-full relative">
        <img v-if="!imageLoaded" class="w-px h-px absolute opacity-0" :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" @load="onImageLoaded" alt="">
        <div class="h-32 rounded bg-center bg-cover opacity-0 transition-opacity z-10"
            :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
            :style="`background-image: url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`"></div>

        <span class="-mt-6 mr-20 float-right rounded-full text-black w-12 h-12 flex justify-center items-center font-bold text-center shadow-lg z-50 absolute pin-r bg-pink-lightest hover:bg-pink-lighter cursor-pointer text-black select-none"
            onth@click="toggleLike">
            <span v-if="moviesLikes">{{ moviesLikes }}</span>
            <span v-else><icon-star /></span>
        </span>

        <span class="-mt-6 mr-6 float-right rounded-full text-black w-12 h-12 flex justify-center items-center font-bold text-center shadow-lg z-50 absolute pin-r"
            :class="voteClasses">{{ movie.vote_average }}</span>
        <div class="p-4 flex flex-col w-full">
            <div class="text-xl text-blue-darkest">{{ movie.title }}</div>
            <div class="mt-4">
                <span>{{ movie.vote_count }} votes</span>
                <span> • </span>
                <span>{{ movie.release_date | parse | distanceInWordsToNow }} ago</span>
                <span> • </span>
                <span>{{ movie.original_language | isoLanguage }}</span>
            </div>

            <div class="mt-4 leading-tight text-sm text-grey-darkest">{{ movie.overview }}</div>

            <div class="mt-4">
                <div v-for="genre in genre_names"
                    :key="genre"
                    class="bg-blue inline-block py-2 px-4 text-white text-sm rounded shadow hover:bg-blue-dark cursor-pointer mr-2 mb-2">
                    <span>{{ genre }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Flag from '~/components/Flag.vue'
import { distanceInWordsToNow, parse } from 'date-fns'
import languages from '~/assets/languages.json'
import * as likes from '~/store/likes'

export default {
    components: {
        Flag,
    },
    props: ['movie', 'genres', 'likes'],
    data () {
        return {
            imageLoaded: false,
        }
    },
    filters: {
        distanceInWordsToNow,
        parse,
        isoLanguage (language) {
            let result = ''
            for (const l of languages) {
                if (l.code === language) {
                    result = l
                }
            }
            return result.name
        },
    },
    computed: {
        moviesLikes () {
            return this.likes[this.movie.id]
        },
        ratingClasses () {
            if (this.movie.vote_average >= 9) return 'bg-green-light'
            else if (this.movie.vote_average >= 8) return 'bg-green'
            else if (this.movie.vote_average >= 7) return 'bg-yellow'
            else if (this.movie.vote_average >= 6) return 'bg-orange'
            else if (this.movie.vote_average >= 5) return 'bg-red'
            else return 'bg-white'
        },
        voteClasses () {
            return [
                this.ratingClasses,
            ]
        },

        genre_names () {
            const genre_ids = this.movie.genre_ids
            const genres = this.genres
            const genre_names = []

            for (const id of genre_ids) {
                for (const g of genres) {
                    if (g.id === id) {
                        genre_names.push(g.name)
                    }
                }
            }

            return genre_names
        },
    },
    methods: {
        onImageLoaded () {
            this.imageLoaded = true
        },
        toggleLike () {
            likes.add(this.movie.id)
        },
    },
    updated () {
        console.log('updated MovieCard', this.movie.title)
    },
}
</script>

<style>

</style>
