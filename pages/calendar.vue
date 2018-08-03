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
            :day="day" />
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
            personal_days_off: [
                { dateStr: '2018-08-20', name: 'Sick day', start: 9, end: 17 },
            ],
            company_days_off: [
                { dateStr: '2018-08-15', name: 'Assumption of Mary' },
            ],
            schedule: {
                '2018-08-01': 0, '2018-08-02': 480, '2018-08-03': 480, // ...
            }
        }
    },
    computed: {
        calendar () {
            const calendar = []
            const daysInMonth = getDaysInMonth( setMonth(new Date(), this.currentMonth - 1) )
            for (let i = 1; i <= daysInMonth; i++) {
                const date = setDate(setMonth(new Date(), this.currentMonth - 1), i)
                calendar.push({
                    i: i,
                    date: date,
                    dateStr: format(date, 'YYYY-MM-DD'),
                    isWorking: this.isWorkingOnDate(date),
                    reason: this.getReason(date),
                })
            }
            return calendar
        },
    },
    methods: {
        getReason (date) {
            console.log('getReason', date)
            // do we have a personal day off?
            for (const day of this.personal_days_off) {
                if (isSameDay(parse(day.dateStr), date)) {
                    return day.name
                }
            }

            // public holidays?
            for (const day of this.company_days_off) {
                if (isSameDay(parse(day.dateStr), date)) {
                    return day.name
                }
            }
        },
        isWorkingOnDate (date) {
            console.log('isWorkingOnDate', date)
            const dateStr = format(date, 'YYYY-MM-DD')
            
            // Are we working today according to our work schedule?
            if (this.schedule[dateStr] == 0) {
                return false
            }

            // do we have a personal day off?
            for (const day of this.personal_days_off) {
                if (isSameDay(parse(day.dateStr), date)) {
                    return false
                }
            }

            // public holidays?
            for (const day of this.company_days_off) {
                if (isSameDay(parse(day.dateStr), date)) {
                    return false
                }
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
