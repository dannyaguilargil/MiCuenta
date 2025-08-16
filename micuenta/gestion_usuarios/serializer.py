from rest_framework import serializers
from .models import usuario, contrato, rp, actainicio, planilla, documento
from micuenta.models import radicado


class contratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = contrato
        fields = '__all__'


class rpSerializer(serializers.ModelSerializer):
    class Meta:
        model = rp
        fields = '__all__'

class actainicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = actainicio
        fields = '__all__'

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

    class Meta:
        model = usuario
        fields = ['usuario', 'cedula', 'nombre', 'segundonombre', 'primerapellido', 
                  'segundoapellido', 'email', 'username','cargo','fechafinalcontrato']

    def get_username(self, obj):
        return obj.usuario.username if obj.usuario else None


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


