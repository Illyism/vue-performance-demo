<template>
    <header class="bg-opacity-10 shadow fixed z-50 pin-y pin-l w-12">
        <nav class="flex">
            <div class="flex flex-col">
                <router-link to="/" exact class="fill-current w-10 h-10 rounded m-1 text-indigo-darkest  hover:bg-opacity-10 cursor-pointer flex justify-center align-center">
                    <icon-movie />
                </router-link>

                <span class="w-10 h-10 rounded m-1 text-indigo-darkest hover:bg-opacity-10 cursor-pointer flex justify-center items-center align-center">
                    <FPS />
                </span>

                <div class="relative group">
                    <div class="w-10 h-10 rounded m-1 hover:bg-opacity-10 justify-center flex items-center cursor-pointer">
                        <img class="w-6 h-6 border border-indigo-darkest rounded-full" src="https://pbs.twimg.com/profile_images/968591595028320269/uuI3bplo_400x400.jpg"
                            alt="Avatar of Ilias">
                    </div>

                    <div class="hidden group-hover:block text-xs absolute pin-l pin-t ml-16 bg-purple-darker shadow-lg p-4 rounded h-16">
                        <img class="w-10 h-10 border border-indigo-lightest rounded-full absolute pin-r pin-y my-3 mr-4" src="https://pbs.twimg.com/profile_images/968591595028320269/uuI3bplo_400x400.jpg"
                            alt="Avatar of Ilias">
                        <p class="text-blue-lightest leading-none text-lg font-light">
                            <span>Ilias Ismanalijev</span>
                        </p>
                        <a href="https://twitter.com/illyism" class="inline-block align-middle truncate w-64 text-blue-lighter text-bold text-sm">
                            twitter
                        </a>
                    </div> 
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import FPS from '../components/FPS'

export default {
    components: {
        FPS,
    },
}
</script>

<style>
</style>