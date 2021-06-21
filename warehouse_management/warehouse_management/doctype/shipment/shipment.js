frappe.ui.form.on('Shipment', {
	refresh: function(frm) {
        if (frm.is_new()) return;

        if (frm.doc.status === 'Open') {
            frm.page.add_action_item(__('Close Warehouse Receipts'), () => {
               frappe.call({
                   method: 'warehouse_management.warehouse_management.doctype.shipment.actions.update_status',
                   freeze: true,
                   args: {
                       source_doc_name: frm.doc.name,
                       new_status: 'Closed'
                   }
               });
            });
        } else {
            frm.page.clear_actions_menu();
        }
	}
});
