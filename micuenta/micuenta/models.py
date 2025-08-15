from django.db import models
from django.contrib.auth.models import User
from micuenta.choices import tipocuenta

class dependencia(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, verbose_name='Nombre dependencia')
    responsable = models.CharField(max_length=200, verbose_name='Nombre del responsable')
    correoresponsable = models.CharField(max_length=200, verbose_name='Correo del responsable')
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre
    
    
class radicado(models.Model):
    rad = models.IntegerField(primary_key=True, verbose_name='Numero de radicado')
    asunto = models.CharField(max_length=200, verbose_name='Asunto')
    usuario = models.ForeignKey('gestion_usuarios.usuario',null=True,blank=True,on_delete=models.CASCADE,verbose_name='Usuario asociado')
    activo = models.BooleanField(default=True, verbose_name='Estado del radicado')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

class cuentabancaria(models.Model):
    numero = models.BigIntegerField(primary_key=True, verbose_name='Numero de cuenta bancaria')
    tipocuenta = models.CharField(max_length=100, choices=tipocuenta, verbose_name='Tipo de cuenta bancaria')
    nombrecb = models.CharField(max_length=40, verbose_name='Nombre de cuenta bancaria')
    usuario = models.ForeignKey('gestion_usuarios.usuario',null=True,blank=True,on_delete=models.CASCADE,verbose_name='Usuario asociado')

