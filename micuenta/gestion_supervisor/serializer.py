from rest_framework import serializers
from .models import supervisor
from django.contrib.auth.models import User

class SupervisorSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    nombre_usuario = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = supervisor
        fields = ['cedula', 'usuario', 'cargo', 'nombre_completo', 'nombre_usuario', 'fecha_creacion', 'fecha_actualizacion']
        read_only_fields = ['fecha_creacion', 'fecha_actualizacion']
    
    def get_nombre_completo(self, obj):
        return obj.usuario.get_full_name() if obj.usuario else ''