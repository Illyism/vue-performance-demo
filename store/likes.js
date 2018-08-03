import Vue from 'vue'

export const data = {
    likes: {}
}

export function add (id) {
    if (data.likes[id]) {
        data.likes[id]++
    } else {
        Vue.set(data.likes, id, 1)
    }
}