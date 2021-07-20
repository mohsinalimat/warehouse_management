import frappe


def execute():
    """ Delete Unused Doctype """
    frappe.delete_doc_if_exists('Doctype', 'Consignee', force=1)
    frappe.delete_doc_if_exists('Doctype', 'Shipper', force=1)

    frappe.reload_doctype('Workspace Link')
    for workspace_link in frappe.get_all('Workspace Link', filters={
        'parent': 'Warehouse',
        'link_to': ['in', ['Consignee', 'Shipper']]
    }):
        frappe.delete_doc_if_exists('Workspace Link', workspace_link, force=1)
