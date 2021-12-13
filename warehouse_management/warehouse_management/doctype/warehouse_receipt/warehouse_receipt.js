frappe.ui.form.on('Warehouse Receipt', {
    setup: function () {
        $('.layout-side-section').hide(); // Little Trick to work better

        // https://stackoverflow.com/a/1977126/3172310
        $(document).on('keydown', "input[data-fieldname='tracking_number'], input[data-fieldname='weight'], " +
            "input[data-fieldname='length'], input[data-fieldname='width'], input[data-fieldname='height']", (event) => {
                if (event.key === 'Enter') {  // Enter key is sent if field is set from barcode scanner.
                    event.preventDefault(); // We prevent the button 'Attach Image' opens a pop-up.
                }
            });
    },

    before_save: function (frm) {
        frm.print_label = frm.is_new(); // If new true else undefined.
    },

    after_save: function (frm) {
        if (!frm.print_label) return;

        window.open(
            frappe.urllib.get_full_url(
                'printview?doctype=Warehouse%20Receipt&name=' + frm.doc.name +
                '&trigger_print=1&format=Warehouse%20Receipt%20Labels&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=es'
            ) // Emulating print.js inside frappe/printing/page/print/print.js
        );
    }
});

// Child Table
frappe.ui.form.on('Warehouse Receipt Line', {
    weight: function (frm) {
        frm.set_value('total_weight', frm.get_sum('packages_in_warehouse_receipt', 'weight'));
    }
});
