<template>
    <section id="login" v-loading="loading">
        <div class="content">
            <div class="intro">
                <h2>2018 디미고 축제</h2>
                <h1>백야<small>"우리가 함께하는 마지막 밤"</small></h1>
            </div>
            <el-form label-position="top">
                <el-form-item label="학번">
                    <el-input v-model="student_id" type="number"></el-input>
                </el-form-item>
                <el-form-item label="이름">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-button @click="login">로그인</el-button>
            </el-form>
        </div>
    </section>
</template>

<script>
    import API from '@/api';


    export default {
        data () {
            return {
                student_id: '',
                name: '',
                loading: false
            }
        },
        methods: {
            login () {
                this.loading = true;

                const data = {
                    student_id: this.student_id,
                    name: this.name
                };

                API.post(`/auth`, data)
                    .then((response) => {
                        this.loading = false;
                        API.setAccessToken(response.data);
                        this.$router.push({ name: 'Index' });
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
        },
        created () {
            if (API.getAccessToken()) {
                this.$router.push({ name: 'Index' });
            }
        }
    }
</script>