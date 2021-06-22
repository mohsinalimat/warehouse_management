// Copyright (c) 2021, Agile Shift I/o and contributors
// For license information, please see license.txt

frappe.ui.form.on('Warehouse Receipt', {
	setup: function () {
        $('.layout-side-section').hide(); // Little Trick to work better
    }
});


// Child Table
frappe.ui.form.on('Warehouse Receipt Line', {
    weight: function (frm) {
        frm.set_value('total_weight', frm.get_sum('packages_in_warehouse_receipt', 'weight'));
    }
});
