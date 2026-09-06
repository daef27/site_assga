"""
Main URL Configuration for ASSGA Django Project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Configuração do painel administrativo
admin.site.site_header = "ASSGA - Administração do Portal"
admin.site.site_title = "Painel ASSGA"
admin.site.index_title = "Gestão da Associação dos Surdos de São Gonçalo do Amarante"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
