frappe.listview_settings['Warehouse Receipt'] = {
    add_fields: ['status', 'transportation_type'],
    filters: [
        ['status', '!=', 'Closed'],
    ],
    hide_name_column: true,

    before_render() {
        localStorage.show_sidebar = "false"
    },

    get_indicator(doc) {
        const status_color = {
            'Open': 'lightblue',
            'Closed': 'green'
        };

        return [__(doc.status), status_color[doc.status], 'status,=,' + doc.status];
    },
    formatters: {
        transportation_type(val) {
            let color = (val === 'Sea') ? 'blue' : 'red';
            return `<span class="indicator-pill ${color} filterable ellipsis"
                data-filter="transportation_type,=,${frappe.utils.escape_html(val)}">
				<span class="ellipsis"> ${val} </span>
			<span>`;
        }
    }
}