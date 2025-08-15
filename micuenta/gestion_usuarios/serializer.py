from rest_framework import serializers
from .models import usuario, contrato, rp, actainicio, planilla, documento


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


