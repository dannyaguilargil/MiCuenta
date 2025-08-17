from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import supervisor
from .serializer import SupervisorSerializer

class SupervisorViewSet(viewsets.ModelViewSet):
    queryset = supervisor.objects.all().select_related('usuario')
    serializer_class = SupervisorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['usuario__first_name', 'usuario__last_name', 'usuario__username', 'cargo', 'cedula']
    filterset_fields = ['cargo', 'cedula']
    ordering_fields = ['cedula', 'usuario__first_name', 'fecha_creacion']
    ordering = ['usuario__first_name']
    
    @action(detail=False, methods=['get'])
    def buscar_por_nombre(self, request):
        """Endpoint específico para búsqueda por nombre"""
        nombre = request.query_params.get('nombre', '')
        if nombre:
            supervisores = self.queryset.filter(
                usuario__first_name__icontains=nombre
            ) | self.queryset.filter(
                usuario__last_name__icontains=nombre
            ) | self.queryset.filter(
                usuario__username__icontains=nombre
            )
        else:
            supervisores = self.queryset.all()
        
        serializer = self.get_serializer(supervisores, many=True)
        return Response(serializer.data)
