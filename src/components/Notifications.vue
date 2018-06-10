<template>
    <div class="app">
        <div class="notif-header" @click="showList">
            <h3>Show/hide notifications</h3>
        </div>
        <div class="notif-list" v-if="toShow">
            <div :class="{ seen: notif.seen }" class="single-notif" v-for="(notif, index) in notifs" :key="notif.timestamp" @mouseenter="setSeen(index)">
                <img :src="notif.icon">
                <div>
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
        },
        methods: {
            sortArray() {
                this.notifs.sort(function(a, b) {return a - b;});
            },
            showList() {
                (this.toShow) ? this.toShow = false : this.toShow = true;
                this.notifs.forEach((notif, index) => {
                    this.notifs[index].date = this.moment(this.notifs[index].timestamp, 'X')
                        .format('MMMM Do YYYY, h:mm:ss:a');
                });
            },
            setSeen: function(index) {
                setTimeout(() => {
                    this.notifs[index].seen = true;
                    }, 3000);
            }
        }
    }

    //===================================
    // api
    // https://api.myjson.com/bins/19wyhe
    // ==================================
</script>

<style lang="scss">
    $unseen: #dac292;
    $seen: #c4b7a6;

    .notif-header {
        cursor: pointer;
        background-color: #b9936c;
        width: 800px;
        margin: 0 auto 5px auto;
        padding: 20px 0;
        border-radius: 5px 5px 0 0;

        h3 {
            transition: 0.4s ease-out;
        }

        &:hover h3 {
            color: #e6e2d3;
        }
    }


    .notif-list {
        width: 800px;
        margin: auto;

        .single-notif {
            display: block;
            background-color: $unseen;
            margin-bottom: 3px;
            height: 70px;
            transition: 0.2s ease;

            img {
                padding: 10px;
                display: inline-block;
                float: left;
                vertical-align: middle;
                width: 50px;
                height: 50px;
            }

            div {
                display: inline-block;
                width: 700px;
                height: 100%;
                float: right;

                p {
                    display: inline-block;
                    color: #333;
                    margin: 25px 0;
                }

                span {
                    color: #777;
                    float: right;
                    padding: 10px 3px;
                }
            }
        }

        .single-notif:last-of-type {
            border-radius: 0 0 5px 5px;
        }
    }

    .seen {
        background-color: $seen !important;
    }

    .unseen {
        background: $unseen;
    }
</style>