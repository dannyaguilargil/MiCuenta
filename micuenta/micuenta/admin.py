from django.contrib import admin
from .models import  dependencia

class Dependencia(admin.ModelAdmin):
    list_display= ('id', 'nombre', 'responsable', 'activo', 'fecha_creacion', 'fecha_actualizacion')
    search_fields = ('nombre',)
admin.site.register(dependencia, Dependencia)


admin.site.__class__.Media = type('Media', (), {
    'css': {
        'all': ('css/admin_override.css',),  # archivo que ocultará la versión
    },
    'js': (),
})