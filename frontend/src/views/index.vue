<template>
    <section id="index" v-if="loggedIn">
        <div class="list" v-loading="loading">
            <div class="content">
                <div class="information">
                    <h1 class="title">{{ stage.title ? stage.title : stage.song }}</h1>
                    <h2 class="song">{{ stage.title ? stage.song : '' }}</h2>
                    <div class="description" v-if="stage.participants.length">
                        <b>한 명</b>을 선택해주세요! 중복투표는 불가능합니다.
                    </div>
                </div>

                <el-radio-group v-model="select">
                    <el-radio-button
                            v-for="participant in stage.participants"
                            :key="participant.hash"
                            :label="participant.hash"
                    >
                        {{ participant.nick }}
                    </el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="logout">
            <el-button type="text" @click="logout">로그아웃</el-button>
        </div>
    </section>
</template>

<script>
    import { isEmpty } from 'lodash';

    import API from '@/api';


    export default {
        data () {
            return {
                loggedIn: false,
                select: '',
                stage: {},
                loading: false
            }
        },
        watch: {
            'select': {
                handler: function () {
                    if (!this.select) {
                        return;
                    }

                    API.post(`/vote`, { hash: this.select })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.$message({
                                showClose: true,
                                message: error.response.data.message,
                                type: 'error'
                            });
                        });
                }
            }
        },
        methods: {
            checkAuth () {
                try {
                    if (isEmpty(API.user())) {
                        throw new Error();
                    } else {
                        this.loggedIn = true;
                    }
                } catch (error) {
                    this.$router.push({ name: 'Login' });
                }
            },
            loadStage () {
                this.loading = true;

                API.get(`/vote`)
                    .then((response) => {
                        this.loading = false;

                        this.select = response.data.voteTo;
                        this.stage = response.data.stage;
                    });
            },
            logout () {
                API.deleteAccessToken();
                this.$router.push({ name: 'Login' });
            }
        },
        created () {
            this.checkAuth();
            this.loadStage();

            this.$options.sockets['stage update'] = this.loadStage;
        }
    }
</script>
