from django.contrib import admin, messages
from .models import  email
####PARA EL REENVIO DE CORREOS###
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
####EXPROTACIONES #####
from import_export.resources import ModelResource
from import_export.admin import ExportMixin
from import_export.admin import ImportExportModelAdmin
#

###EXPORTACION###
class EmailResource(ModelResource):
    class Meta:
        model = email

class Email(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = EmailResource
    list_display=('id', 'username', 'email', 'enviado', 'mensaje', 'fecha_creacion')
    list_filter = ('username', 'referencia', 'fecha_creacion')
    search_fields = ('email',)
    #actions = [enviar_correo]  
admin.site.register(email, Email)



