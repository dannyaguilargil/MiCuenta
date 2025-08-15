
from django.contrib import admin
from django.urls import path, include
from . import views
from django.shortcuts import render
from rest_framework import routers


###PENDIENTE COMO LE METO VALIDACIONES#####
router = routers.DefaultRouter()
router.register(r'envios/email', views.emailView, 'enviosemail')

urlpatterns = [
    path('', include(router.urls)),
    
]