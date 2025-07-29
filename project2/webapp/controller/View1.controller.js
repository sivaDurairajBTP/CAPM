sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter" 
], (Controller,Sorter) => {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit() {
            
        },

        onSearchProducts:function(evt){
            var searchString =evt.getParameter("value");
            var filters = new sap.ui.model.Filter("firstName","Contains",searchString);
            this.getView().byId("simpleTable").getBinding("items").filter(filters);
        },

        _bSortAsc: true,

        onSortByName: function () {
            console.log("clicked")
          const oTable = this.byId("simpleTable");
          const oBinding = oTable.getBinding("items");
    
          // Create a Sorter object
          const oSorter = new Sorter("firstName", !this._bSortAsc); 
          this._bSortAsc = !this._bSortAsc; 
    
          oBinding.sort(oSorter);
        },

        onPress(evt){
            console.log("Pressed")
            var SelectedRowId= evt.getSource().getBindingContext().getObject().id;
                var oRuter=sap.ui.core.UIComponent.getRouterFor(this);
                oRuter.navTo("ObjectPageView",{id : SelectedRowId});
        }
    });
});