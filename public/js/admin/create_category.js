let app = new Vue({
    'el': '#app', 

    data: {
        category: {
            name: '', 
            description: '', 
            seoDescription: '' ,
            properties: [
                {
                    name: 'Storage'
                }, 
                {
                    name: 'RAM'
                }
            ]
        }
    }, 

    methods: {
        saveCategory: function (){
            console.log(this.category)
        }, 
        addProperty: function(){
            this.category.properties.push({})
        }
    }
})