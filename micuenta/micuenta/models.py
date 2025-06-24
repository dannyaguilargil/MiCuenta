from django.db import models

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