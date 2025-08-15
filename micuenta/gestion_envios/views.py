from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.utils.decorators import method_decorator
from django.urls import reverse
from rest_framework import viewsets

from django.http import JsonResponse
# Create your views here.
class usuarioView(viewsets.ModelViewSet):
    serializer_class = usuarioSerializer
    queryset = usuario.objects.all() ##pilas falta autenticacion
    #permission_classes = [IsAuthenticated] 