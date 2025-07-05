from django.contrib import admin
from .models import  dependencia
from django.contrib.admin.models import LogEntry
from django.contrib.sessions.models import Session

#admin.site.register(Session)

class LogEntryAdmin(admin.ModelAdmin):
    list_display = ('action_time', 'user', 'content_type', 'object_repr', 'action_flag', 'change_message')
    list_filter = ('action_flag', 'user')
    search_fields = ('object_repr', 'change_message')
admin.site.register(LogEntry, LogEntryAdmin)

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