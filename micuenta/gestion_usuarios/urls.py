
from django.contrib import admin
from django.urls import path, include
from . import views
from django.shortcuts import render, redirect
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/usuarios', views.usuarioView, 'usuarios')
router.register(r'api/contrato', views.contratoView, 'contratos')
router.register(r'api/rp', views.rpView, 'rps')
#router.register(r'api/actainicio', views.actainicioView, 'actainicio')
router.register(r'api/planilla', views.planillaView, 'planilla')
router.register(r'api/documento', views.documentoView, 'documento')
router.register(r'api/radicados', views.radicadoView, 'radicados')


urlpatterns = [
   
    path('', views.home, name='casita'),
    path('api/auths' , views.usuario_actual, name='auths'),
    path('login', views.home, name='inicio'),
    path('', include(router.urls)),
    #path('login', views.logout, name='logout'),
  
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)