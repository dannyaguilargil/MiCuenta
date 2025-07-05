from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
# Create your views here.
@staff_member_required
def gestion_ia_home(request):
    return render(request, "contrato.html", {
        "title": "Panel de IA",
    })