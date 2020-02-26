<template>
    <div class="page">
        <main-head></main-head>
        <main-menu></main-menu>
        <lemon-filter @search-query="searchQueryAction"/>
        <lemon-list
                :list="filteredList"
                :filter-key="searchQueryGetter"
        />
        <main-footer></main-footer>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    import MainHead from "./MainHead";
    import MainMenu from "./MainMenu";
    import MainFooter from "./MainFooter";

    import LemonFilter from "./LemonFilter";
    import LemonList from "./LemonList";


    export default {
        name: "MainPage",
        components: {
            MainHead,
            MainMenu,
            MainFooter,
            LemonFilter,
            LemonList,
        },
        computed: {
            ...mapGetters([
                'getCafeList',
                'searchQueryGetter',
            ]),
            filteredList(){
                var items = this.getCafeList;
                var filterKey = this.searchQueryGetter && this.searchQueryGetter.toString().toLowerCase();
                if (filterKey) {
                    items = items.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toString().toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                return items;
            }
        },
        methods: {
            ...mapActions([
                'searchQueryAction'
            ]),
        }
    }
</script>
<style>


</style>