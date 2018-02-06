<template>
    <section id="screen">
        <img :src="require('&/images/background.png')">
        <div class="content">
            <Snowf
                    :amount="50"
                    :size="5"
                    :speed="1"
                    :wind="0"
                    :opacity="0.5"
                    :swing="1"
                    :zIndex="-1"
                    :resize="true"
                    color="#fff"
            ></Snowf>
            <div class="wait-stage" v-if="stage.participants.length < 1">
                <h1>{{ stage.title }}</h1>
                <h2>{{ stage.song }}</h2>
            </div>
            <el-row class="participants">
                <el-col
                        v-for="(participant, index) in stage.participants"
                        :key="participant.hash"
                        :span="6"
                        :offset="!index && stage.participants.length !== 4 ? 6 : 0"
                        :class="{ 'bigger': formattedVotes[participant.hash].votes === bigger }"
                >
                    <h2>{{ formattedVotes[participant.hash].nick }}</h2>
                    <h1>{{ formattedVotes[participant.hash].votes.format() }}</h1>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import API from '@/api';


    export default {
        components: {
            Snowf: require('vue-snowf')
        },
        data () {
            return {
                stage: {
                    participants: []
                },
                votes: {},
                bigger: 0
            }
        },
        computed: {
            formattedVotes: function () {
                let participants = {};

                this.stage.participants.forEach((participant) => {
                    participants[participant.hash] = {
                        nick: participant.nick,
                        votes: 0
                    };
                });

                Object.values(this.votes).forEach((vote) => {
                    if (participants[vote]) {
                        participants[vote].votes++;
                    }
                });

                this.bigger = Object.values(participants).reduce((p, c) => (p.votes > c.votes) ? p : c).votes;

                return participants;
            }
        },
        methods: {
            load () {
                API.get(`/stages/${this.stage._id}`)
                    .then((response) => {
                        this.votes = response.data.votes;
                    });
            },
            setHash () {
                API.get(`/vote`)
                    .then((response) => {
                        this.stage = response.data.stage;

                        this.load();
                    });
            }
        },
        created () {
            if (API.user()['permission'] !== 'ADMIN') {
                this.$router.push({ name: 'Index' });
            }
this.setHash();

            this.$socket.emit('join listener', null);

            this.$options.sockets['vote'] = this.load;
            this.$options.sockets['stage update'] = this.setHash;
        }
    }
</script>