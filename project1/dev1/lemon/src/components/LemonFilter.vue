<template>
    <div>
        <div>
            <label >
                <input type="text"
                       placeholder="Искать по названию, кухне, шефу"
                       v-model="searchQuery">
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LemonFilter",
        props: ['groupList'],
        computed: {
            searchQuery: {
                get() {
                    return this.$store.state.filter.searchQuery;
                },
                set(value) {
                    this.$emit('search-query', value)
                }
            }
        }
    }
</script>
<style scoped>

</style>