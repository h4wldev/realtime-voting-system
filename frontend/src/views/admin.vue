<template>
    <section id="admin">
        <el-menu mode="horizontal" @select="selectStage">
            <el-submenu index="1">
                <template slot="title">Stages</template>
                <el-menu-item v-for="stage in stages" :key="stage._id" :index="stage._id">
                    {{ stage.title || stage.song }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
        <div>
            <h1>{{ stage.title || stage.song }} <small>{{ stage._id }}</small></h1>
            <el-button @click="active" :disabled="isSelected">활성화 하기</el-button>
            <el-button @click="reset" :disabled="isSelected">초기화</el-button>
            <div class="logs">
                <el-input type="textarea" :rows="10" v-model="logText"></el-input>
            </div>
        </div>
    </section>
</template>

<script>
    import { isEmpty } from 'lodash';

    import API from '@/api';


    export default {
        data () {
            return {
                logs: [],
                stages: [],
                stage: {}
            }
        },
        computed: {
            isSelected: function () {
                return isEmpty(this.stage);
            },
            logText: function () {
                return this.logs.map((log) => {
                    return `[${log.at}] ${log.token.name}(${log.token.student_id})님이 ${log.target.nick}에게 투표하셨습니다.`;
                }).reverse().join('\n');
            }
        },
        methods: {
            selectStage (id) {
                this.stage = this.stages.filter((stage) => stage._id === id).pop();
            },
            active () {
                API.post(`/stages/${this.stage._id}/active`)
                    .then(() => {
                        this.$message({
                            message: '해당 무대 활성화 되었습니다.',
                            type: 'success'
                        });
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.$message({
                            showClose: true,
                            message: error.response.data.message,
                            type: 'error'
                        });
                    });
            },
            reset () {
                this.$confirm('초기화 하시겠습니까?', '투표 초기화', {
                    confirmButtonText: '초기화',
                    cancelButtonText: '취소',
                    type: 'warning'
                }).then(() => {
                    API.post(`/stages/${this.stage._id}/reset`)
                        .then(() => {
                            this.$message({
                                message: '투표가 초기화 되었습니다.',
                                type: 'success'
                            });
                        })
                        .catch((error) => {
                            this.loading = false;
                            this.$message({
                                showClose: true,
                                message: error.response.data.message,
                                type: 'error'
                            });
                        });
                });
            }
        },
        created () {
            if (API.user()['permission'] !== 'ADMIN') {
                this.$router.push({ name: 'Index' });
            }

            this.$socket.emit('join listener', null);

            API.get(`/stages`)
                .then((response) => {
                    this.stages = response.data;
                });
        }
    }
</script>
