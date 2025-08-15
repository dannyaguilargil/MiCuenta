from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.utils.decorators import method_decorator
from django.urls import reverse
from rest_framework import viewsets
from .serializer import usuarioSerializer, contratoSerializer, rpSerializer, actainicioSerializer, planillaSerializer, documentoSerializer
from gestion_usuarios.models import usuario, contrato, rp, actainicio, planilla, documento

from django.http import JsonResponse

# Create your views here.
def home(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.groups.filter(name='admin_identidades').exists():
                    login(request, user)
                    print("Inicio sesión a gestion de identidades")
                    return redirect('identidadespendientesadmin')
                elif user.groups.filter(name='informes').exists():
                    login(request, user)
                    print("Inicio sesión a gestion de informes")
                    return redirect('informe')
             
                else:
                    print("Inicio sesion el contratista")
                    login(request, user)
                    return redirect('identidades')
                   
        else:
            print("Usuario invalido")
            messages.error(request, 'Ingresar credenciales validos para iniciar sesión.')
            return redirect('inicio')
    else:
        print("Renderizado")
        #messages.error(request, 'Las credenciales de inicio de sesión son inválidas.')
        form = AuthenticationForm()

    return render(request, 'home.html', {'form': form})


def usuario_actual(request):
    if request.user.is_authenticated:
        grupos = list(request.user.groups.values_list('name', flat=True)) 
        return JsonResponse({
            'isAuthenticated': True,
            'id': request.user.id,
            'username': request.user.username,
            'grupo': grupos 
        })
    else:
        return JsonResponse({'isAuthenticated': False})    

class usuarioView(viewsets.ModelViewSet):
    serializer_class = usuarioSerializer
    queryset = usuario.objects.all() ##pilas falta autenticacion
    #permission_classes = [IsAuthenticated] 

class contratoView(viewsets.ModelViewSet):
    serializer_class = contratoSerializer
    queryset = contrato.objects.all() ##pilas falta autenticacion
    #permission_classes = [IsAuthenticated] 

class rpView(viewsets.ModelViewSet):
    serializer_class = rpSerializer
    queryset = rp.objects.all() ##pilas falta autenticacion
    #permission_classes = [IsAuthenticated] 

class actainicioView(viewsets.ModelViewSet):
    serializer_class = actainicioSerializer
    queryset = actainicio.objects.all() ##pilas falta autenticacion

class planillaView(viewsets.ModelViewSet):
    serializer_class = planillaSerializer
    queryset = planilla.objects.all() ##pilas falta autenticacion

class documentoView(viewsets.ModelViewSet):
    serializer_class = documentoSerializer
    queryset = documento.objects.all() ##pilas falta autenticacion
