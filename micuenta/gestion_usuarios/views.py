from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages

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