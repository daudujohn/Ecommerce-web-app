let app = new Vue({
    'el': '#app', 

    data: {
        category: {
            name: '', 
            description: '', 
            seoDescription: ''
        }
    }, 

    methods: {
        saveCategory: function (){
            console.log(this.category)
        }
    }
})