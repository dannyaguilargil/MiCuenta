from django.db import models
from django.contrib.auth.models import User
from gestion_supervisor.models import supervisor
from micuenta.models import dependencia
from micuenta.choices import sexos, rol, tipodocumento
from datetime import date
from dateutil.relativedelta import relativedelta
from micuenta.choices import mes


class usuario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuario autenticado', blank=True, null=True )
    nombre = models.CharField(max_length=40, verbose_name='Primer nombre')
    segundonombre = models.CharField(max_length=40, verbose_name='Segundo nombre', blank=True, null=True)
    primerapellido = models.CharField(max_length=40, verbose_name='Primer apellido', blank=True, null=True)
    segundoapellido = models.CharField(max_length=40, verbose_name='Segundo apellido', blank=True, null=True)
    cargo = models.CharField(max_length=40, verbose_name='Cargo', blank=True, null=True)
    email = models.EmailField(max_length=40, verbose_name='Correo personal', blank=True, null=True)
    supervisor = models.ForeignKey(supervisor,max_length=40, verbose_name='supervisor',on_delete=models.CASCADE,related_name='supervisor_detail', default=1)
    tipodocumento = models.CharField(max_length=40, verbose_name='Tipo de documento',choices=tipodocumento, default='CC')
    cedula = models.IntegerField(primary_key=True, verbose_name='Cedula')
    lugarexpedicion = models.CharField(max_length=40, verbose_name='Lugar de expedicion', blank=True, null=True)
    dependencia = models.ForeignKey(dependencia,max_length=40, verbose_name='dependencia',on_delete=models.CASCADE, blank=True, null=True)
    sexo = models.CharField(max_length=40, verbose_name='Sexo', choices=sexos, default='F')
    telefono = models.BigIntegerField(verbose_name='Telefono fijo' , blank=True, null=True)
    celular = models.BigIntegerField(verbose_name='Celular' , blank=True, null=True) ###Pendiente
    direccion = models.CharField(max_length=40, verbose_name='Direccion completa', blank=True, null=True)
    rol = models.CharField(max_length=40, verbose_name='Rol',choices=rol, default='identidades')
    fechafinalcontrato = models.DateField(verbose_name='Fecha final del contrato', null=True,blank=True)
    imagen = models.ImageField(upload_to='imgs/',default='imgs/sinfoto.jpeg')
    firma = models.ImageField(upload_to='imgs/firmas',default='imgs/sinfoto.jpeg')
  
    def __str__(self):
        return self.nombre + ' ' + self.primerapellido
    

class planilla(models.Model):
    numero = models.CharField(  # CharField para conservar ceros iniciales si existen
        max_length=20,
        primary_key=True,
        verbose_name='Número de la planilla'
    )
    fecha_pago = models.DateField(verbose_name='Fecha de pago de la planilla')
    periodo = models.CharField(max_length=2,choices=mes,verbose_name='Mes de pago')
    ibc = models.CharField(max_length=200,verbose_name='IBC de la planilla')
    
    nombre_pension = models.CharField(max_length=150, verbose_name='Entidad de pensión')
    valor_pension = models.DecimalField(
        max_digits=12, decimal_places=2,
        verbose_name='Valor de pensión'
    )
    
    nombre_salud = models.CharField(max_length=150, verbose_name='Entidad de salud')
    valor_salud = models.DecimalField(
        max_digits=12, decimal_places=2,
        verbose_name='Valor de salud'
    )
    
    nombre_arl = models.CharField(max_length=150, verbose_name='Entidad ARL')
    valor_arl = models.DecimalField(
        max_digits=12, decimal_places=2,
        verbose_name='Valor de ARL'
    )
    valor_total = models.DecimalField(
        max_digits=12, decimal_places=2,
        verbose_name='Valor total de la planilla'
    )
    
    
    archivo = models.FileField(
        upload_to='pdfs/',
        default='NO CARGADO',
        verbose_name='Archivo de soporte'
    )
    
    usuario = models.ForeignKey(
        'usuario',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        verbose_name='Usuario asociado'
    )
    
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name='Última actualización')

    def __str__(self):
        return f'Planilla {self.numero} - {self.periodo}'
    
class documento(models.Model):
    nombre = models.CharField(max_length=200,verbose_name='Nombre del documento')
    archivo = models.FileField(upload_to='documentos/',verbose_name='Archivo adjunto')
    observaciones = models.TextField(blank=True,null=True,verbose_name='Observaciones')
    usuario = models.ForeignKey('usuario',null=True,blank=True,on_delete=models.CASCADE,verbose_name='Usuario asociado')
    fecha_creacion = models.DateTimeField(auto_now_add=True,verbose_name='Fecha de creación')
    fecha_actualizacion = models.DateTimeField(auto_now=True,verbose_name='Última actualización')

    def __str__(self):
        return self.nombre

class rp(models.Model):
    numero_rp = models.CharField(max_length=50, unique=True, verbose_name="Número de RP")
    numero_contrato = models.CharField(max_length=50, verbose_name="Número de Contrato")
    tipo_contrato = models.CharField(max_length=100, verbose_name="Tipo de Contrato")
    duracion = models.CharField(max_length=100, verbose_name="Duración")
    
    fecha_inicio = models.DateField(verbose_name="Fecha de Inicio")
    fecha_final = models.DateField(verbose_name="Fecha Final")
    objeto = models.TextField(verbose_name="Objeto del Contrato")
    
    fecha_rp = models.DateField(verbose_name="Fecha de RP")
    fecha_suscripcion = models.DateField(verbose_name="Fecha de Suscripción")
    valor = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="Valor")
    
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name="Fecha de Actualización")
    
    archivo = models.FileField(upload_to="rp/", blank=True, null=True, verbose_name="Archivo Adjunto")

    def __str__(self):
        return f"RP {self.numero_rp} - Contrato {self.numero_contrato}"

class contrato(models.Model):
    rp = models.ForeignKey(rp, on_delete=models.CASCADE, verbose_name="RP asociado", blank=True, null=True)
    numero_pagos = models.IntegerField(verbose_name="Número de pagos")
    supervisor = models.ForeignKey(supervisor,max_length=40, verbose_name='supervisor',on_delete=models.CASCADE)

    numero_proceso = models.CharField(
        max_length=100, 
        blank=True, 
        null=True, 
        verbose_name="Número de proceso (opcional)"
    )
    archivo = models.FileField(upload_to='contratos/', verbose_name="Archivo adjunto", blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    fecha_actualizacion = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    def __str__(self):
        return f"Contrato - Supervisor: {self.supervisor} ({self.numero_proceso or 'Sin proceso'})"