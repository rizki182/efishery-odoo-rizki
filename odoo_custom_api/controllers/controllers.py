# -*- coding: utf-8 -*-
from odoo import http
from werkzeug.wrappers import Request, Response
import json


class CustomApi(http.Controller):
    @http.route("/custom_api/sales_order", methods=["GET"], auth="api_key")
    def index(self, **kw):
        headers = {"Content-Type": "application/json"}

        # final response variable
        response = []

        # get sale order list
        sale_orders = http.request.env["sale.order"].search_read([], ["name", "date_order", "partner_id", "user_id", "amount_total", "state"])

        for sale_order in sale_orders:
            # reformat sale order response
            response.append({
                "id": sale_order["id"],
                "name": sale_order["name"],
                "date_order": sale_order["date_order"],
                "partner": {
                    "id": sale_order["partner_id"][0],
                    "name": sale_order["partner_id"][1]
                },
                "user": {
                    "id": sale_order["user_id"][0],
                    "name": sale_order["user_id"][1]
                },
                "amount_total": sale_order["amount_total"],
                "state": sale_order["state"]
            })

        return Response(json.dumps(response, indent=4, default=str), headers=headers)

    @http.route("/custom_api/sales_order", methods=["GET"], auth="api_key")
    def detail(self, **kw):
        headers = {"Content-Type": "application/json"}

        # final response variable
        response = {}

        # get sale order
        sale_orders = http.request.env["sale.order"].search_read([("id", "=", kw["id"])], ["name", "date_order", "partner_id", "user_id", "order_line", "amount_total", "state"])

        # get sale order line
        sale_order_lines = http.request.env["sale.order.line"].search_read([("id", "in", sale_orders[0]["order_line"])], ["product_id", "product_uom_qty", "product_uom", "price_unit", "price_subtotal"])

        # reformat sale order response
        response = {
            "id": sale_orders[0]["id"],
            "name": sale_orders[0]["name"],
            "date_order": sale_orders[0]["date_order"],
            "partner": {
                "id": sale_orders[0]["partner_id"][0],
                "name": sale_orders[0]["partner_id"][1]
            },
            "user": {
                "id": sale_orders[0]["user_id"][0],
                "name": sale_orders[0]["user_id"][1]
            },
            "amount_total": sale_orders[0]["amount_total"],
            "state": sale_orders[0]["state"],
            "order_line": []
        }

        # reformat sale order line response
        for sale_order_line in sale_order_lines:
            response["order_line"].append({
                "id": sale_order_line["id"],
                "product": {
                    "id": sale_order_line["product_id"][0],
                    "name": sale_order_line["product_id"][1]
                },
                "product_uom": {
                    "id": sale_order_line["product_uom"][0],
                    "name": sale_order_line["product_uom"][1]
                },
                "product_uom_qty": sale_order_line["product_uom_qty"],
                "price_unit": sale_order_line["price_unit"],
                "price_subtotal": sale_order_line["price_subtotal"]
            })

        return Response(json.dumps(response, indent=4, default=str), headers=headers)

    @http.route("/custom_api/sales_order/create", methods=["GET"], auth="api_key")
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

    @http.route("/custom_api/sales_order/update", methods=["GET"], auth="api_key")
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
