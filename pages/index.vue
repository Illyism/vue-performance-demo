<template>
  <div>
    <NavHeader />
    <div class="bg-grey-lighter min-h-screen text-grey-darkest pl-12">
      <div class="flex flex-wrap justify-center align-center">
        <div class="p-4 hover:bg-grey-light cursor-pointer" @click="page--"> <icon-arrow-left /> </div>
        <div class="p-4">{{ page }}</div>
        <div class="p-4 hover:bg-grey-light cursor-pointer" @click="page++"> <icon-arrow-right /> </div>
        <div class="p-4 hover:bg-grey-light cursor-pointer" @click="shuffleMovies"> <icon-shuffle /> </div>
        <div class="p-4 hover:bg-grey-light cursor-pointer" @click="shuffleGenres"> <icon-shuffle /> </div>
      </div>

      <MoviesList
        :movies="movies.results"
        :genres="genres.results"
        :likes="likes.likes"
      />
    </div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import MoviesList from '../components/MoviesList.vue'
import * as likes from '~/store/likes'
import axios from 'axios'

export default {
  components: {
    NavHeader,
    MoviesList,
  },
  data () {
    return {
      page: 1,

      movies: {
        results: [],
        page: 1,
        total_pages: -1,
        total_results: -1,
      },

      genres: {
       results: [],
      },

      likes: likes.data,
    }
  },
  async asyncData (context) {
      return {
        movies: await getMovies(),
        genres: {
          results: await getGenres()
        },
      }
  },
  watch: {
    page () {
      this.loadMovies()
    }
  },
  methods: {
    async loadMovies () {
      this.movies = await getMovies(this.page)
    },
    shuffleList (list) {
      for (let i = list.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        
        let temp = list[i];
        this.$set(list, i, list[randomIndex]);
        this.$set(list, randomIndex, temp);
      }
    },
    shuffleMovies () {
      const shuffle = () => {
        this.shuffleList(this.movies.results)
      }
      setInterval(shuffle, 100)
    },
    shuffleGenres () {
      const shuffle = () => {
        this.shuffleList(this.genres.results)
      }
      setInterval(shuffle, 100)
    },
  }
}

const api_key = '825e69a24a134e1d6cbbb33327786625'
async function getMovies (page = 1) {
  const params = { api_key, page }
  let { data } = await axios.get('https://api.themoviedb.org/3/movie/top_rated', { params })
  return data
}

async function getGenres (page = 1) {
  const params = { api_key }
  let { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list', { params })
  return data.genres
}
</script>
