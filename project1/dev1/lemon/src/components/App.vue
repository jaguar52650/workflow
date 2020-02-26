<template>
    <router-view></router-view>
</template>

<script>
    import MainPage from "./Main";
    export default {
        components: {
            MainPage,
        },
        created() {
            var store = this.$store;
            var xhr = $.ajax({
                url: '/ajax.php',
                method: 'POST',
            });
            xhr.done(function(response) {
                store.commit('setCafes', response.data.store);
            });
        },
    }
</script>
<style>
    html, body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .app {
        height: 100%;
    }
</style>