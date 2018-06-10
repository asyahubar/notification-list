<template>
    <div class="app">
        <div class="notif-header container" @click="showList">
            <h3>Show/hide notifications</h3>
        </div>
        <div class="notif-list container" v-if="toShow">
            <div class="single-notif media" v-for="notif in notifs" :key="notif.timestamp">
                <img :src="notif.icon" class="align-self-center mr-3">
                <div class="media-body">
                    <p>{{ notif.message }}</p>
                    <span class="time">{{ notif.date }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Notifications',
        data() {
            return {
                notifs: [],
                toShow: false
            }
        },
        computed: {
            // dateFormat() {
            //     let newDates = [];
            //     this.notifs.forEach(function(timestamp, index) {
            //         newDates[index] = this.notifs.timestamp;
            //         // newDates[index] = this.moment(timestamp, 'X');
            //     });
            //     return newDates;
            // }
        },
        mounted() {
            this.axios
                .get('https://api.myjson.com/bins/19wyhe')
                .then(response => (this.notifs = response.data));
            this.notifs.sort(function(a, b) {return a - b;});
            this.notifs.forEach((notif, index) => {
                this.notifs[index].date = this.moment(this.notifs[index].timestamp, 'X')
                    .format('MMMM Do YYYY, h:mm:ss:a');
            });
        },
        methods: {
            sortArray() {
                this.notifs.sort(function(a, b) {return a - b;});
            },
            showList() {
                (this.toShow) ? this.toShow = false : this.toShow = true;
            }
        }
    }

    //===================================
    // api
    // https://api.myjson.com/bins/19wyhe
    // ==================================
</script>

<style lang="scss">
    .notif-header {
        cursor: pointer;
    }
</style>