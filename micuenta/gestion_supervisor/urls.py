from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupervisorViewSet

router = DefaultRouter()
router.register(r'supervisores', SupervisorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]