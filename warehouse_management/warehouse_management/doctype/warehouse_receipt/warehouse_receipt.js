// Copyright (c) 2021, Agile Shift i/o and contributors
// For license information, please see license.txt

frappe.ui.form.on('Warehouse Receipt', {
    setup: function () {
        $('.layout-side-section').hide(); // Little Trick to work better
    },

    shipping_label_photo: function (frm) {
        if (frm.doc.shipping_label_photo) {
            // Emulating print.js inside frappe/printing/page/print/print.js
            window.open(
                frappe.urllib.get_full_url(
                    'printview?doctype=Warehouse%20Receipt&' +
                    'name=' + frm.doc.name +
                    '&trigger_print=1&format=Warehouse%20Receipt%20Labels&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=es'
                )
            );
        }

    }

});


// Child Table
frappe.ui.form.on('Warehouse Receipt Line', {
    weight: function (frm) {
        frm.set_value('total_weight', frm.get_sum('packages_in_warehouse_receipt', 'weight'));
    }
});
