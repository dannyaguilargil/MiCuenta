from admin_tools.dashboard import modules, Dashboard

class CustomIndexDashboard(Dashboard):
    def init_with_context(self, context):
        self.children.append(modules.AppList(
            title='Aplicaciones',
            exclude=('django.contrib.*',),
        ))

        self.children.append(modules.ModelList(
            title='Administración',
            models=('django.contrib.*',),
        ))

        self.children.append(modules.LinkList(
            title='Enlaces útiles',
            layout='inline',
            children=[
                {'title': 'Google', 'url': 'https://www.google.com'},
                {'title': 'Soporte', 'url': '/soporte/'},
            ]
        ))
