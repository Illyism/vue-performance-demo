<template>
<div class="p-4">
    <div>
        <input class="border py-2 px-4 rounded mr-2 border-blue" type="text" v-model="newDate" placeholder="date">
        <input class="border py-2 px-4 rounded mr-2 border-blue" type="text" v-model="newMinutes" placeholder="minutes">
        
        <div @click="add" class="bg-blue inline-block py-2 px-4 text-white text-sm rounded shadow hover:bg-blue-dark cursor-pointer mr-2 mb-2">
            <span>Add</span>
        </div>
    </div>
    <div class="flex flex-wrap">
        <CalendarDay v-for="day in calendar" :key="day.i"
            :dateStr="day.dateStr"
            :isWorking="day.isWorking"
            :reason="day.reason"
        />
    </div>
</div>
</template>

<script>
import { getDaysInMonth, setMonth, setDate, format, isSameDay, parse, getDate } from 'date-fns'
import CalendarDay from '~/components/CalendarDay.vue'

export default {
    components: {
        CalendarDay,
    },
    filters: {
        getDate
    },
    data () {
        return {
            newDate: null,
            newMinutes: null,

            currentMonth: 8,
            days_off: [
                { dateStr: '2018-08-11', name: 'Sick day' },
                { dateStr: '2018-08-15', name: 'Assumption of Mary' },
            ],
            schedule: {
                '2018-08-01': 480, '2018-08-02': 480, '2018-08-03': 480, '2018-08-04': 480,
                '2018-08-05': 480, '2018-08-06': 0, '2018-08-07': 0,
                '2018-08-08': 480, '2018-08-09': 480, '2018-08-10': 480, '2018-08-11': 480,
                '2018-08-12': 480, '2018-08-13': 0, '2018-08-14': 0, // ...
            }
        }
    },
    computed: {
        days_off_map () {
            console.log('days_off_map computed')
            return this.days_off.reduce((acc, cur) => {
                acc[cur.dateStr] = cur
                return acc
            }, {})
        },
        calendar () {
            console.log('calendar computed')
            const calendar = []
            const daysInMonth = getDaysInMonth( setMonth(new Date(), this.currentMonth - 1) )
            for (let i = 1; i <= daysInMonth; i++) {
                const date = setDate(setMonth(new Date(), this.currentMonth - 1), i)
                const dateStr = format(date, 'YYYY-MM-DD')
                calendar.push({
                    i: i,
                    date: date,
                    dateStr: dateStr,
                    isWorking: this.isWorkingOnDate(dateStr),
                    reason: this.getReason(dateStr),
                })
            }
            return calendar
        },
    },
    methods: {
        getReason (dateStr) {
            // days off?
            const day = this.days_off_map[dateStr]
            return day && day.name
        },
        isWorkingOnDate (dateStr) {
            // Are we working today according to our work schedule?
            if (this.schedule[dateStr] == 0) {
                return false
            }

            if (this.days_off_map[dateStr]) {
                return false
            }

            return true
        },

        add () {
            this.$set(this.schedule, this.newDate, this.newMinutes)
        },
    }
}
</script>

<style>

</style>
