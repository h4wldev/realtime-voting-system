<template>
    <div id="app-wrapper">
        <Snowf
                :amount="50"
                :size="5"
                :speed="1"
                :wind="0"
                :opacity="0.15"
                :swing="1"
                :zIndex="-1"
                :resize="true"
                color="#4449ad"
        ></Snowf>

        <router-view />

        <footer id="footer">
            ⓒ 2017. <a href="https://hawl.kim" target="_blank">Junho Kim</a>, all rights reserved.
        </footer>
    </div>
</template>

<script>
    /**
     *  IMPORT LIBRARIES
     */
    // animate
    import "animate.css/animate.min.css";
    // element ui
    import 'element-ui/lib/theme-chalk/index.css';

    /**
     *  IMPORT STYLESHEETS
     */
    import '&/stylesheets/style.scss';


    export default {
        components: {
            Snowf: require('vue-snowf')
        }
    }
</script>
