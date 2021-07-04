odoo.define("js_framework_sample.SampleFramework", function (require) {
    'use strict';

    var Dialog = require('web.Dialog');
    var Screens = require("point_of_sale.screens");
    var core = require('web.core');
    var _t = core._t;

    Screens.ActionpadWidget.include({
        renderElement: function() {
            var self = this;
            this._super();
            this.$('.pay').click(function(){
                var order = self.pos.get_order();
                // Show the order object
                console.log("order object: ", order)
                // Show the order subtotal
                console.log("order subtotal: ", order.get_subtotal())

                var order_subtotal = order.get_subtotal();
                var message_body = _t("The subtotal is bellow 5");

                if (order_subtotal <= 5){
                    // Show a Javascript simple an Alert Message
                    alert(message_body);
                    // Show a Dialog Window for an Alert Message
                    Dialog.alert(
                        this,
                        message_body,
                        {
                            title: _t("Error: Please Checkout Subtotal of Sale")
                        }
                    );
                }
                var has_valid_product_lot = _.every(order.orderlines.models, function(line){
                    return line.has_valid_product_lot();
                });
                if(!has_valid_product_lot){
                    self.gui.show_popup('confirm',{
                        'title': _t('Empty Serial/Lot Number'),
                        'body':  _t('One or more product(s) required serial/lot number.'),
                        confirm: function(){
                            self.gui.show_screen('payment');
                        },
                    });
                }else{
                    self.gui.show_screen('payment');
                }
            });
            this.$('.set-customer').click(function(){
                self.gui.show_screen('clientlist');
            });
        }
    });
});
