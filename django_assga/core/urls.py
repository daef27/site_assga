from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.home_view, name='home'),
    path('historia/', views.historia_view, name='historia'),
    path('estatuto/', views.estatuto_view, name='estatuto'),
    path('diretoria/', views.diretoria_view, name='diretoria'),
    path('esportiva/', views.esportiva_view, name='esportiva'),
    path('eventos/', views.evento_view, name='eventos'),
    path('carteirinha/', views.carteirinha_view, name='carteirinha'),
    path('carteirinha/<str:matricula>/', views.carteirinha_view, name='carteirinha_matricula'),
    path('pagamento/', views.pagamento_view, name='pagamento'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('area-associado/', views.area_associado_view, name='area_associado'),
    path('validar/<str:codigo_autenticacao>/', views.validar_carteirinha_view, name='validar_carteirinha'),
    # API endpoints
    path('api/data/', views.api_dados_view, name='api_data'),
]
