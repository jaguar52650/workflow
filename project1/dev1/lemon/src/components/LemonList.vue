<template>
    <section >
        <h2 >Рестораны</h2>
        <div>
            <div>
                <div
                     v-for="(item) in gridColumns"
                     :key="item.key"
                     :class="columnClass(item)"
                     @click="sortBy(item.key)"
                >{{ item.title }} <span
                        class="arrow"
                        :class="(sortKey==item.key)? sortOrders[item.key] > 0 ? 'asc' : 'dsc':''"
                /></div>
            </div>

            <transition-group tag="div" aria-rowindex="1">
                <div class="list__item"
                     v-for="(item,index) in pagedList"
                     :key="item.pos"
                     @click=rowClick(item)
                     :class="{'list__item--active':item.visible}"
                     tabindex="0"
                >
                    <div> {{ item.pos }}</div>
                    <div><h3>{{ item.title }}</h3></div>
                    <div>{{ item.address }}</div>
                    <div>{{ item.kitchen }}</div>
                    <div>
                        <span :class="('list__stars stars stars--' + item.lemon)"
                              :title="'Рейтинг: ' + item.lemon +' из 3'"></span>
                    </div>
                    <div>{{ item.chef }}</div>

                    <div v-if="item.visible" >
                        <div>
                            <img src="https://via.placeholder.com/334x332.png?Text=grg" alt="" class="list__img" width="167"
                                 height="167">
                        </div>
                        <div>
                            {{ item.prew }}
                        </div>
                        <div>
                            <router-link :to="{path:'/restaurant/'+item.code}" class="btn">Подробнее ></router-link>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="list__box box">
            <!--<button class="list__btn btn">Предыдущие ></button>-->
            <button class="btn" v-if="showNextButton" @click.prevent="nextPage">Следующие ></button>
            <a  class="btn btn--white" v-if="showNextButton"  @click.prevent="longList">Лонглист</a>
        </div>
    </section>

</template>
<script>
    export default {
        name: "LemonList",
        props: {
            'filterKey': {
                default: false
            },
            'list': {
                default: false
            }
        },
        data() {
            var sortOrders = {}
            this.columns =
                [
                    {
                        key: 'pos', title: 'Место в рейтинге',className:'list__position'
                    },
                    {
                        key: 'title', title: 'Название',className:'list__name'
                    },
                    {
                        key: 'address', title: 'Адрес',className:'list__address'
                    },
                    {
                        key: 'kitchen', title: 'Кухня',className:'list__cuisine'
                    },
                    {
                        key: 'lemon', title: 'Рейтинг',className:'list__rating'
                    },
                    {
                        key: 'chef', title: 'Шеф',className:'list__cheif'
                    },
                ];
            this.columns.forEach(function (key) {
                sortOrders[key['key']] = 1
            })
            return {
                sortKey: 'pos',
                sortOrders: sortOrders,
                gridColumns: this.columns,
                perPage: 10,
                page: 1,
            }
        },
        computed: {
            showNextButton(){          
                return ((this.page * this.perPage) < this.sortedList.length);
            },
            sortedList: function () {
                var sortKey = this.sortKey;

                var order = this.sortOrders[sortKey] || 1;
                var items = this.list;

                if (sortKey) {
                    items = items.slice().sort(function (a, b) {
                        a = a[sortKey]
                        b = b[sortKey]
                        return (a === b ? 0 : a > b ? 1 : -1) * order
                    })
                }
                return items
            },
            pagedList(){               
                return this.sortedList.slice(0, this.page * this.perPage);
            }
        },
        methods: {
            rowClick(item){
                item.visible = ! item.visible;
            },
            nextPage(){
                this.page++;
            },
            longList(){
                this.page = Math.ceil(this.sortedList.length/this.perPage);
            },
            columnClass(item){
                var obg = {
                    active: (this.sortKey == item.key )
                }
                obg[item.className] = true;
                return obg;
            },
            sortBy: function (key) {
                this.sortKey = key;
                this.sortOrders[key] = this.sortOrders[key] * -1
            },
        },
    }
</script>
<style scoped>
    .box-row {
        position: relative;
        box-sizing: border-box;
        min-height: 1rem;
        border: 1px solid #007FFF;
    }

    .active {
        font-weight: bold;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #000000;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #000000;
    }

</style>