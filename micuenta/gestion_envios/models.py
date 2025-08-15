from django.db import models

# Create your models here.
class email(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=40, verbose_name='Nombre de usuario')
    referencia = models.CharField(max_length=60, verbose_name='Referencia', default='Recordatorio de citas')
    email = models.EmailField(max_length=40, verbose_name='Correo destinatario')
    enviado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    mensaje = models.CharField(max_length=300, verbose_name='Mensaje')