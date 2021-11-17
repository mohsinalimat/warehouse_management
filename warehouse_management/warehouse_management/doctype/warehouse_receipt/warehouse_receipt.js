frappe.ui.form.on('Warehouse Receipt', {
    setup: function () {
        $('.layout-side-section').hide(); // Little Trick to work better

        // https://stackoverflow.com/a/1977126/3172310
        $(document).on('keydown', "input[data-fieldname='tracking_number']", (event) => {
            if (event.key === 'Enter') {  // Enter key is sent if field is set from barcode scanner.
                event.preventDefault(); // We prevent the button 'Attach Image' opens a pop-up.
            }
        });
    },

    shipping_label_photo: function (frm) {
        if (!frm.is_new()) return;

        frm.save().then(() => {  // Is new doc and photo is added, Doc is saved and printed.
            window.open(
                frappe.urllib.get_full_url(
                    'printview?doctype=Warehouse%20Receipt&' +
                    'name=' + frm.doc.name +
                    '&trigger_print=1&format=Warehouse%20Receipt%20Labels&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=es'
                ) // Emulating print.js inside frappe/printing/page/print/print.js
            );
        });
    }
});

// Child Table
frappe.ui.form.on('Warehouse Receipt Line', {
    weight: function (frm) {
        frm.set_value('total_weight', frm.get_sum('packages_in_warehouse_receipt', 'weight'));
    }
});
