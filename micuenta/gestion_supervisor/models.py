from django.db import models
from django.contrib.auth.models import User

class supervisor(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuario', default=2)
    cedula = models.IntegerField(primary_key=True, verbose_name='Cédula')
    cargo = models.CharField(max_length=120, verbose_name='Cargo', blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.usuario.get_full_name() 