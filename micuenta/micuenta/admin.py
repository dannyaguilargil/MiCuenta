from django.contrib import admin
from .models import  dependencia, radicado, cuentabancaria
from django.contrib.admin.models import LogEntry
from django.contrib.sessions.models import Session


#admin.site.register(Session)
admin.site.__class__.Media = type('Media', (), {
    'css': {
        'all': ('css/admin_override.css',),  # archivo que ocultará la versión
    },
    'js': (),
})


class LogEntryAdmin(admin.ModelAdmin):
    list_display = ('action_time', 'user', 'content_type', 'object_repr', 'action_flag', 'change_message')
    list_filter = ('action_flag', 'user')
    search_fields = ('object_repr', 'change_message')
admin.site.register(LogEntry, LogEntryAdmin)

class Dependencia(admin.ModelAdmin):
    list_display= ('id', 'nombre', 'responsable', 'activo', 'fecha_creacion', 'fecha_actualizacion')
    search_fields = ('nombre',)
admin.site.register(dependencia, Dependencia)


class Radicado(admin.ModelAdmin):
    list_display = ('rad', 'asunto', 'fecha_creacion', 'fecha_actualizacion')
    list_filter = ('fecha_creacion',)
    search_fields = ('rad', 'asunto')
    ordering = ('-fecha_creacion',)
    date_hierarchy = 'fecha_creacion'
    list_per_page = 25

    # Para mostrar el número de radicado en formato con ceros iniciales (si quieres)
    def formatted_rad(self, obj):
        return f"{obj.rad:08d}"  # Ej: 00000042
    formatted_rad.short_description = "Número de radicado"
admin.site.register(radicado, Radicado)


class CuentaBancaria(admin.ModelAdmin):
    list_display=('numero','tipocuenta','nombrecb')
admin.site.register(cuentabancaria, CuentaBancaria)