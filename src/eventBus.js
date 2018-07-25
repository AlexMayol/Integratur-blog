import Vue from 'vue';

export const EventBus = new Vue({
    data:{
        posts:null,
        categories:null,
        searchResult:null,      
        perPage:8,
        currentPage:1,  
        totalPages:1,
        completed:false
    },
    methods:{
        setCurrentPage(num){
            this.currentPage = num;
        },
        setPerPage(num){
            this.perPage = num;
        }
    }
});
