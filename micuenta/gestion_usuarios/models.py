from django.db import models
from django.contrib.auth.models import User
from gestion_supervisor.models import supervisor
from micuenta.models import dependencia
from micuenta.choices import sexos, rol, tipodocumento
from datetime import date
from dateutil.relativedelta import relativedelta

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
  
    def __str__(self):
        return self.nombre + ' ' + self.primerapellido
    
class contrato(models.Model):
    numero = models.IntegerField(primary_key=True, verbose_name='Número')
    numeroproceso = models.IntegerField(verbose_name='Número del proceso')
    objeto = models.CharField(max_length=300, verbose_name='Objeto del contrato')
    fechaperfeccionamiento = models.DateField(verbose_name='Fecha de perfeccionamiento')

    valor = models.DecimalField(
        verbose_name='Valor del contrato',
        max_digits=15,
        decimal_places=2
    )

    fechacontrato = models.DateField(verbose_name='Fecha inicial del contrato')
    fechaterminacion = models.DateField(verbose_name='Fecha final del contrato')

    duracion_meses = models.IntegerField(verbose_name='Duración (meses)', default=0, null=True, blank=True)
    duracion_dias = models.IntegerField(verbose_name='Duración (días)', null=True, blank=True)

    supervisor = models.ForeignKey('gestion_supervisor.supervisor', on_delete=models.SET_NULL, null=True, blank=True, verbose_name='Supervisor')
    archivo = models.FileField(upload_to='pdfs/', verbose_name='Archivo')
    usuario = models.ForeignKey('usuario', null=True, blank=True, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.fechacontrato and self.fechaterminacion:
            # Solo calcular si no fue ingresado manualmente
            if self.duracion_meses == 0 and self.duracion_dias == 0:
                delta = relativedelta(self.fechaterminacion + relativedelta(days=1), self.fechacontrato)
                meses = delta.years * 12 + delta.months
                dias = delta.days

                self.duracion_meses = meses
                self.duracion_dias = dias

        super().save(*args, **kwargs)

    def duracion_total_en_dias(self):
        return self.duracion_meses * 30 + (self.duracion_dias or 0)
    


class rp(models.Model):
    numero = models.BigIntegerField(primary_key=True, verbose_name='Numero del rp')
    fecha = models.DateField(max_length=300, verbose_name='Fecha del rp')
    archivo = models.FileField(upload_to='pdfs/', default='No cargado', verbose_name='archivo')
    usuario=models.ForeignKey(usuario,null=True,blank=True,on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'REGISTRO PRESUPUESTAL: '+self.fecha
    

class actainicio(models.Model):
    numero = models.IntegerField(primary_key=True, verbose_name='Numero del proceso')
    fecha = models.CharField(max_length=300, verbose_name='Fecha de acta de inicio')
    archivo = models.FileField(upload_to='pdfs/', default='NO CARGADO', verbose_name='archivo')#LO AGREGUE REVISAR
    usuario=models.ForeignKey(usuario,null=True,blank=True,on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return 'ACTA DE INICIO: '+self.fecha