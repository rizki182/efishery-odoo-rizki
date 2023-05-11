# -*- coding: utf-8 -*-
# from odoo import http


# class CustomApi(http.Controller):
#     @http.route('/custom_api/custom_api', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/custom_api/custom_api/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('custom_api.listing', {
#             'root': '/custom_api/custom_api',
#             'objects': http.request.env['custom_api.custom_api'].search([]),
#         })

#     @http.route('/custom_api/custom_api/objects/<model("custom_api.custom_api"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('custom_api.object', {
#             'object': obj
#         })
