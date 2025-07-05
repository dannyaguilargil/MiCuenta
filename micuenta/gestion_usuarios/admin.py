from django.contrib import admin
from .models import  usuario, contrato
from django.utils.html import format_html

class User(admin.ModelAdmin):
    list_display= ('nombre', 'primerapellido', 'segundoapellido', 'cedula', 'rol')
    search_fields = ('nombre','primerapellido','cedula')
admin.site.register(usuario, User)

class Cont(admin.ModelAdmin):
    list_display = (
        'numero',
        'objeto',
        'valor',
        'fechacontrato',
        'fechaterminacion',
        'get_duracion',
        'get_supervisor',
        'display_archivo',
    )

    search_fields = (
        'numero',
        'objeto',
        'supervisor__usuario__first_name',
        'supervisor__usuario__last_name'
    )

    # Opcional: Evita edición manual si la duración se calcula automáticamente
    # readonly_fields = ('duracion_meses', 'duracion_dias')

    def get_duracion(self, obj):
        meses = obj.duracion_meses
        dias = obj.duracion_dias

        if meses == 0 and dias > 0:
            return f"{dias} días"
        elif meses > 0 and dias == 0:
            return f"{meses} meses"
        elif meses > 0 and dias > 0:
            return f"{meses} meses y {dias} días"
        else:
            return "0 días"
    get_duracion.short_description = 'Duración'

    def get_supervisor(self, obj):
        if obj.supervisor and obj.supervisor.usuario:
            return obj.supervisor.usuario.get_full_name()
        return "-"
    get_supervisor.short_description = 'Supervisor'

    def display_archivo(self, obj):
        if obj.archivo:
            # Ajusta el path si estás sirviendo archivos en una ruta diferente
            file_url = obj.archivo.url.replace('/sistemas_cuentas/', '/')
            return format_html('<a href="{}" target="_blank" style="color: #E74C3C;">Ver PDF</a>', file_url)
        return '-'
    display_archivo.short_description = 'Archivo'

admin.site.register(contrato, Cont)