let app = new Vue({
  el: "#app",

  data: {
    category: {
      name: "",
      description: "",
      seoDescription: "",
      properties: [
        {
          name: "Storage",
          required: true,
          input: {
            type: "",
            propertyChoices: [{ label: "Android", value: "android" }],
          },
        },
        {
          name: "RAM",
          required: true,
          input: { type: "", propertyChoices: [{}] },
        },
      ],
    },
    inputTypeOptions: [
      { label: "Fractional Input", value: "fractionalInput" },
      { label: "Integer Input", value: "integerInput" },
      { label: "Text", value: "textInput" },
      { label: "Select (One)", value: "selectOne" },
      { label: "Select (Multiple)", value: "selectMultiple" },
    ],
  },

  methods: {
    saveCategory: function () {
      console.log(this.category);
    },
    addProperty: function () {
      this.category.properties.push({
        name: "",
        required: true,
        input: {
          type: "",
          propertyChoices: [{ label: "", value: "" }],
        },
      });
    },

    removeProperty: function (index) {
      this.category.properties.splice(index, 1);
    },

    addNewChoice: function (propertyChoices) {
      propertyChoices.push({
        label: "",
        value: "",
      });
    },
    removeChoice: function (propertyChoices,  index) {
      if (propertyChoices.length > 1){
        propertyChoices.splice(index, 1);
      }
      else {
        propertyChoices[0].label = ''
        propertyChoices[0].value = ''
      }
    },
  },
});
