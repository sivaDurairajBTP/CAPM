sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/BusyDialog",
  "sap/m/MessageBox",
], function (BaseController, MessageToast, BusyDialog,MessageBox) {
  "use strict";

  var clientId;
  var onBusyDataDialog = new BusyDialog({
      title: "DATA LOADING",
      text: "Please wait......."
  });

  return BaseController.extend("project2.controller.ObjectPage", {
      onInit: function () {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.getRoute("ObjectPageView").attachMatched(this.onObjectMatched, this);
      },

      // onNavBack: function () {
      //     const oRouter = this.getOwnerComponent().getRouter();
      //     oRouter.navTo("RouteView1");
      // },

      // onObjectMatched: function (oEvent) {
      //     onBusyDataDialog.open();
      //     var oArgs = oEvent.getParameter("arguments");
      //     var oView = this.getView();

      //     console.log("Customer ID:", oArgs.id);
      //     clientId = oArgs.id;

          
      //     oView.bindElement({
      //         path: "/Customer('" + clientId + "')"
      //     });

      //     this.loadAssociatedData();
      // },

      // loadAssociatedData: function () {
      //     var oModel = this.getOwnerComponent().getModel();
      //     var oJSON = new sap.ui.model.json.JSONModel();

      //     console.log("Fetching Customer Address for ID:", clientId);

         
      //     oModel.read("/Customer('" + clientId + "')", {
      //         urlParameters: {
      //             "$expand": "address"   
      //         },
      //         success: function (response) {
      //             if (response.address && response.address.results.length > 0) {
      //                 console.log("address:", response.address.results[0].City);
      //                 oJSON.setData(response.address.results[0]);
      //                 this.getView().setModel(oJSON, "ChildData");
      //             } else {
      //                 console.log("No Address found for customer:", clientId);
      //             }
      //             this.closeBusyDialog();
      //         }.bind(this),
      //         error: function (error) {
      //             console.error("Error fetching address", error);
      //             this.closeBusyDialog();
      //         }.bind(this)
      //     });
      // },

      // closeBusyDialog: function () {
      //     setTimeout(function () {
      //         onBusyDataDialog.close();
      //     }, 1000);
      // }
    //   sdkhvgdsjbvudshbvcldsgv


      onObjectMatched:function(evt){
        var orderId = evt.getParameter("arguments").id;
        this.getOwnerComponent().getModel().read("/Customer",{
            urlParameters:{
                "$expand":"address"
            },
            filters:[new sap.ui.model.Filter("id","EQ",orderId)],
            success:function(oData,results){
                console.log(oData);
            },
            error:function(oError){
                MessageBox.error(JSON.parse(oError.responseText).error.message.value);
            }
        })
    },
  });
});
