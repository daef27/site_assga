from django.conf import settings
from datetime import datetime

def assga_global_context(request):
    """Context processor para injetar dados globais da ASSGA em todos os templates."""
    return {
        'assga_config': getattr(settings, 'ASSGA_CONFIG', {}),
        'current_year': datetime.now().year,
    }
