from django.contrib import admin
from .models import  usuario, planilla, documento, rp, contrato
from django.db.models import Sum
from django.utils.html import format_html



class User(admin.ModelAdmin):
    list_display= ('nombre', 'primerapellido', 'segundoapellido', 'cedula', 'rol')
    search_fields = ('nombre','primerapellido','cedula')
admin.site.register(usuario, User)


class Planilla(admin.ModelAdmin):
    list_display= ('numero', 'fecha_creacion')
admin.site.register(planilla, Planilla)

class Documento(admin.ModelAdmin):
    list_display = ('nombre', 'get_usuario', 'display_archivo', 'fecha_creacion', 'fecha_actualizacion')
    search_fields = ('nombre', 'usuario__nombre', 'usuario__primerapellido', 'observaciones')
    list_filter = ('fecha_creacion', 'fecha_actualizacion', 'usuario')
    ordering = ('-fecha_creacion',)
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
    
    def get_usuario(self, obj):
        if obj.usuario:
            return f"{obj.usuario.nombre} {obj.usuario.primerapellido}"
        return "-"
    get_usuario.short_description = 'Usuario'
    
    def display_archivo(self, obj):
        if obj.archivo:
            file_url = obj.archivo.url.replace('/sistemas_cuentas/', '/')
            return format_html('<a href="{}" target="_blank" style="color: #E74C3C;">Ver Archivo</a>', file_url)
        return '-'
    display_archivo.short_description = 'Archivo'
    
    fieldsets = (
        ('Información del Documento', {
            'fields': ('nombre', 'archivo', 'observaciones')
        }),
        ('Asociación', {
            'fields': ('usuario',)
        }),
        ('Fechas', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )
    
admin.site.register(documento, Documento)


class Rp(admin.ModelAdmin):
    list_display = ('numero_rp', 'numero_contrato', 'tipo_contrato', 'objeto', 'fecha_rp', 'fecha_inicio', 'fecha_final', 'fecha_suscripcion', 'valor', 'archivo')
    # Filtros por campos separados
    list_filter = ('tipo_contrato', 'fecha_rp', 'fecha_inicio', 'fecha_final', 'fecha_suscripcion')
    search_fields = ('numero_rp', 'numero_contrato', 'objeto')

admin.site.register(rp, Rp)


class Contrato(admin.ModelAdmin):
    list_display = ( 'get_rp', 'numero_proceso', 'numero_pagos', 'display_archivo', 'fecha_creacion', 'fecha_actualizacion')
    search_fields = ('supervisor__usuario__first_name', 'supervisor__usuario__last_name', 'numero_proceso', 'rp__numero_rp')
    list_filter = ('fecha_creacion', 'fecha_actualizacion', 'supervisor', 'rp')
    ordering = ('-fecha_creacion',)
    readonly_fields = ('fecha_creacion', 'fecha_actualizacion')
    
    def get_supervisor(self, obj):
        if obj.supervisor and obj.supervisor.usuario:
            return obj.supervisor.usuario.get_full_name() or f"Usuario {obj.supervisor.usuario.username}"
        return "-"
    get_supervisor.short_description = 'Supervisor'
    
    def get_rp(self, obj):
        if obj.rp:
            return f"RP {obj.rp.numero_rp}"
        return "-"
    get_rp.short_description = 'RP Asociado'
    
    def display_archivo(self, obj):
        if obj.archivo:
            file_url = obj.archivo.url.replace('/sistemas_cuentas/', '/')
            return format_html('<a href="{}" target="_blank" style="color: #E74C3C;">Ver Archivo</a>', file_url)
        return '-'
    display_archivo.short_description = 'Archivo'
    
    fieldsets = (
        ('Información del Contrato', {
            'fields': ('supervisor', 'rp', 'numero_proceso', 'numero_pagos', 'archivo')
        }),
        ('Fechas', {
            'fields': ('fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )

admin.site.register(contrato, Contrato)