from rest_framework import serializers
from .models import usuario, planilla, documento, rp, contrato
from micuenta.models import radicado


class planillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = planilla
        fields = '__all__'

class documentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = documento
        fields = '__all__'

class usuarioSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    supervisor_nombre = serializers.SerializerMethodField()
    dependencia_nombre = serializers.SerializerMethodField()

    class Meta:
        model = usuario
        fields = ['usuario', 'cedula', 'nombre', 'segundonombre', 'primerapellido', 
                  'segundoapellido', 'email', 'username', 'cargo', 'fechafinalcontrato',
                  'supervisor', 'supervisor_nombre', 'tipodocumento', 'lugarexpedicion',
                  'dependencia', 'dependencia_nombre', 'sexo', 'telefono', 'celular',
                  'direccion', 'rol', 'imagen', 'firma']

    def get_username(self, obj):
        return obj.usuario.username if obj.usuario else None
        
    def get_supervisor_nombre(self, obj):
        return str(obj.supervisor) if obj.supervisor else None
        
    def get_dependencia_nombre(self, obj):
        return str(obj.dependencia) if obj.dependencia else None


class radicadoSerializer(serializers.ModelSerializer):
    usuario_nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = radicado
        fields = '__all__'
    
    def get_usuario_nombre_completo(self, obj):
        if obj.usuario:
            # obj.usuario ya es una instancia del modelo usuario de gestion_usuarios
            try:
                nombres = []
                
                # Agregar nombre si existe
                if obj.usuario.nombre:
                    nombres.append(obj.usuario.nombre.strip())
                
                # Agregar segundo nombre si existe
                if obj.usuario.segundonombre:
                    nombres.append(obj.usuario.segundonombre.strip())
                
                # Agregar primer apellido si existe
                if obj.usuario.primerapellido:
                    nombres.append(obj.usuario.primerapellido.strip())
                
                # Agregar segundo apellido si existe
                if obj.usuario.segundoapellido:
                    nombres.append(obj.usuario.segundoapellido.strip())
                
                # Unir todos los nombres con espacios
                return ' '.join(nombres) if nombres else 'Sin nombre'
            except AttributeError:
                return 'Error al obtener datos del usuario'
        return 'Sin usuario'


class rpSerializer(serializers.ModelSerializer):
    class Meta:
        model = rp
        fields = '__all__'


class contratoSerializer(serializers.ModelSerializer):
    supervisor_nombre = serializers.SerializerMethodField()
    rp_numero = serializers.SerializerMethodField()
    
    class Meta:
        model = contrato
        fields = ['id', 'numero_pagos', 'supervisor', 'supervisor_nombre', 'rp', 'rp_numero', 
                  'numero_proceso', 'archivo', 'fecha_creacion', 'fecha_actualizacion']
    
    def get_supervisor_nombre(self, obj):
        if obj.supervisor and obj.supervisor.usuario:
            return obj.supervisor.usuario.get_full_name() or f"Usuario {obj.supervisor.usuario.username}"
        return None
    
    def get_rp_numero(self, obj):
        if obj.rp:
            return obj.rp.numero_rp
        return None


