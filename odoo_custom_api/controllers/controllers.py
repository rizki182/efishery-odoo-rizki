# -*- coding: utf-8 -*-
from odoo import http
from werkzeug.wrappers import Request, Response
import json


class CustomApi(http.Controller):
    @http.route("/custom_api/sales_order", methods=["GET"], auth="user")
    def index(self, **kw):
        headers = {"Content-Type": "application/json"}

        # get sale order list
        data = http.request.env["sale.order"].search_read([], ["name", "date_order", "partner_id", "user_id", "amount_total", "state"])
        return Response(json.dumps(data, indent=4, default=str), headers=headers)

    @http.route("/custom_api/sales_order/detail", methods=["GET"], auth="user")
    def detail(self, **kw):
        headers = {"Content-Type": "application/json"}

        # get sale order
        sale_orders = http.request.env["sale.order"].search_read([], ["name", "date_order", "partner_id", "user_id", "order_line", "amount_total", "state"])

        # get sale order line
        sale_order_lines = http.request.env["sale.order.line"].search_read([("id", "in", sale_orders[0]["order_line"])], ["product_id", "product_uom_qty", "product_uom", "price_unit", "price_subtotal"])

        # merge sale order line detail into sale order
        sale_orders[0]["order_line"] = sale_order_lines

        return Response(json.dumps(sale_orders[0], indent=4, default=str), headers=headers)

    @http.route("/custom_api/sales_order/create", methods=["GET"], auth="user")
    def create(self, **kw):
        headers = {"Content-Type": "application/json"}
        
        # insert sale order
        sale_order_value = {
            "partner_id": 11,
            "date_order": "2023-05-11 11:42:56"
        }
        sale_order = http.request.env["sale.order"].create(sale_order_value)
        sale_order = sale_order.read()[0]
        
        # insert sale order line
        sale_order_line_values = [{
            "order_id": sale_order["id"],
            "product_id": 3,
            "product_uom_qty": 1
        }, {
            "order_id": sale_order["id"],
            "product_id": 4,
            "product_uom_qty": 2
        }]
        sale_order_line = http.request.env["sale.order.line"].create(sale_order_line_values)

        return Response(json.dumps({ "message": "success" }, indent=4, default=str), headers=headers)

    @http.route("/custom_api/sales_order/update", methods=["GET"], auth="user")
    def update(self, **kw):
        headers = {"Content-Type": "application/json"}
        
        sales_order_id = 54

        # insert sale order
        sale_order_value = {
            "partner_id": 10,
            "date_order": "2023-05-12 11:42:56"
        }
        sale_order = http.request.env["sale.order"].browse(sales_order_id).write(sale_order_value)

        http.request.env["sale.order.line"].search([("order_id", "=", sales_order_id)]).unlink()

        sale_order_line_values = [{
            "order_id": sales_order_id,
            "product_id": 7,
            "product_uom_qty": 1
        }, {
            "order_id": sales_order_id,
            "product_id": 8,
            "product_uom_qty": 2
        }]
        sale_order_line = http.request.env["sale.order.line"].create(sale_order_line_values)

        return Response(json.dumps({ "message": "success" }, indent=4, default=str), headers=headers)
