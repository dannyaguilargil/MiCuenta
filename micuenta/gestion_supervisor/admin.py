from django.contrib import admin
from .models import supervisor

class SupervisoresAdmin(admin.ModelAdmin):
    list_display = ('get_nombre_completo', 'cedula', 'cargo','fecha_creacion','fecha_actualizacion')
    search_fields = ('usuario__username', 'usuario__first_name', 'usuario__last_name')  

    def get_nombre_completo(self, obj):
        return obj.usuario.get_full_name()  
    get_nombre_completo.short_description = 'Nombre completo' 

admin.site.register(supervisor, SupervisoresAdmin)