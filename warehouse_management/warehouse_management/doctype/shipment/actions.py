import frappe


@frappe.whitelist()
def update_status(source_doc_name: str, new_status: str):
    doc = frappe.get_doc('Shipment', source_doc_name)  # Getting the Shipment Doc

    # Getting all warehouse receipts
    warehouse_receipts = list(map(lambda wr: wr.warehouse_receipt, doc.warehouse_receipts_in_shipment))
    warehouse_receipts_len = len(warehouse_receipts)

    for i, wr_name in enumerate(warehouse_receipts, start=1):
        wr = frappe.get_doc('Warehouse Receipt', wr_name)

        wr.status = new_status
        wr.flags.ignore_validate = True
        wr.save(ignore_permissions=True)

        progress = i * 100 / warehouse_receipts_len
        frappe.publish_progress(percent=progress, title='Updating WRs',
                                description='Updating Warehouse Receipt {0}'.format(wr.name))

    frappe.msgprint('{0} Warehouse Receipt {1}.'.format(warehouse_receipts_len, new_status))
