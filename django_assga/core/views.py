from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, date
import json

from .models import (
    Associado, Carteirinha, Mensalidade, MembroDiretoria,
    ModalidadeEsportiva, Evento, Noticia, CapituloEstatuto,
    ArtigoEstatuto, MensagemContato
)
from .forms import AssociadoLoginForm, MensagemContatoForm, ComprovanteUploadForm


def home_view(request):
    """Página Inicial com banners, destaques, eventos e notícias da ASSGA."""
    eventos_destaque = Evento.objects.filter(
        ativo=True,
        imagem_url__isnull=False,
    ).exclude(imagem_url='').order_by('data_inicio')[:10]
    noticias_destaque = Noticia.objects.filter(destaque=True)[:3]
    membros_presidencia = MembroDiretoria.objects.filter(cargo__icontains='Presidente')[:2]
    modalidades = ModalidadeEsportiva.objects.filter(ativa=True)

    context = {
        'eventos': eventos_destaque,
        'noticias': noticias_destaque,
        'presidencia': membros_presidencia,
        'modalidades': modalidades,
        'fotos_assga': [
            ('imagens/foto1.jpg', 'ASSGA e sua comunidade'),
            ('imagens/foto2.jpg', 'Atividades da ASSGA'),
            ('imagens/foto3-1.jpg', 'Esporte e inclusão'),
            ('imagens/halloween-assga.jpeg', 'Evento da ASSGA'),
        ],
        'active_page': 'home',
    }
    return render(request, 'portal/home.html', context)


def historia_view(request):
    """Página da História e Fundação da ASSGA."""
    return render(request, 'portal/historia.html', {'active_page': 'historia'})


def estatuto_view(request):
    """Estatuto Social Oficial da ASSGA com busca e capítulos."""
    busca = request.GET.get('q', '').strip()
    capitulos = CapituloEstatuto.objects.prefetch_related('artigos').all()

    if busca:
        artigos_filtrados = ArtigoEstatuto.objects.filter(texto__icontains=busca)
    else:
        artigos_filtrados = None

    context = {
        'capitulos': capitulos,
        'busca': busca,
        'artigos_filtrados': artigos_filtrados,
        'active_page': 'estatuto',
    }
    return render(request, 'portal/estatuto.html', context)


def diretoria_view(request):
    """Diretoria Executiva e Conselho Fiscal."""
    membros = MembroDiretoria.objects.all().order_by('ordem')
    return render(request, 'portal/diretoria.html', {'membros': membros, 'active_page': 'diretoria'})


def esportiva_view(request):
    """Departamento de Esportes e Modalidades."""
    modalidades = ModalidadeEsportiva.objects.filter(ativa=True)
    return render(request, 'portal/esportiva.html', {'modalidades': modalidades, 'active_page': 'esportiva'})


def evento_view(request):
    """Agenda de Eventos e Atividades."""
    eventos = Evento.objects.filter(ativo=True).order_by('-data_inicio')
    return render(request, 'portal/evento.html', {'eventos': eventos, 'active_page': 'evento'})


def login_view(request):
    """Login para associados via Matrícula ou CPF."""
    if request.session.get('associado_id'):
        return redirect('core:area_associado')

    form = AssociadoLoginForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        ident = form.cleaned_data['identificador'].strip()
        associado = Associado.objects.filter(matricula__iexact=ident).first()
        if not associado:
            # Tenta buscar por CPF
            limpo_cpf = ''.join(filter(str.isdigit, ident))
            associado = Associado.objects.filter(cpf__icontains=limpo_cpf).first()

        if associado:
            request.session['associado_id'] = associado.id
            messages.success(request, f"Bem-vindo(a), {associado.nome}!")
            return redirect('core:area_associado')
        else:
            messages.error(request, "Associado não encontrado com a matrícula ou CPF informado.")

    return render(request, 'portal/login.html', {'form': form, 'active_page': 'login'})


def logout_view(request):
    """Encerra a sessão do associado."""
    request.session.flush()
    messages.info(request, "Sessão encerrada com sucesso.")
    return redirect('core:home')


def area_associado_view(request):
    """Painel do Associado logado."""
    associado_id = request.session.get('associado_id')
    if not associado_id:
        messages.warning(request, "Por favor, entre com sua Matrícula ou CPF.")
        return redirect('core:login')

    associado = get_object_or_404(Associado, id=associado_id)
    mensalidades = associado.mensalidades.all().order_by('-ano_referencia', '-mes_referencia')
    
    # Carteirinha
    carteirinha, _ = Carteirinha.objects.get_or_create(
        associado=associado,
        defaults={'data_validade': associado.validade_carteirinha or date(2026, 12, 31)}
    )

    context = {
        'associado': associado,
        'mensalidades': mensalidades,
        'carteirinha': carteirinha,
        'active_page': 'area_associado',
    }
    return render(request, 'portal/area_associado.html', context)


def carteirinha_view(request, matricula=None):
    """Visualização e impressão da carteirinha digital oficial ASSGA."""
    if not matricula:
        associado_id = request.session.get('associado_id')
        if associado_id:
            associado = get_object_or_404(Associado, id=associado_id)
        else:
            # Associado padrão para demonstração
            associado = Associado.objects.first()
    else:
        associado = get_object_or_404(Associado, matricula=matricula)

    if not associado:
        messages.error(request, "Nenhum associado cadastrado para emitir carteirinha.")
        return redirect('core:home')

    carteirinha, _ = Carteirinha.objects.get_or_create(
        associado=associado,
        defaults={'data_validade': associado.validade_carteirinha or date(2026, 12, 31)}
    )

    context = {
        'associado': associado,
        'carteirinha': carteirinha,
        'active_page': 'carteirinha',
    }
    return render(request, 'portal/carteirinha.html', context)


def pagamento_view(request):
    """Página de pagamentos e contribuições via PIX."""
    form = ComprovanteUploadForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        associado_id = request.session.get('associado_id')
        if associado_id:
            associado = Associado.objects.get(id=associado_id)
            mensalidade = form.save(commit=False)
            mensalidade.associado = associado
            mensalidade.mes_referencia = datetime.now().month
            mensalidade.ano_referencia = datetime.now().year
            mensalidade.status = 'Pendente'
            mensalidade.save()
            messages.success(request, "Comprovante enviado com sucesso! A diretoria irá validar.")
            return redirect('core:area_associado')
        else:
            messages.info(request, "Comprovante registrado. Para vincular ao seu cadastro, faça login.")

    return render(request, 'portal/pagamento.html', {'form': form, 'active_page': 'pagamento'})


def validar_carteirinha_view(request, codigo_autenticacao):
    """Página pública de validação de autenticidade acessada via QR Code."""
    carteirinha = get_object_or_404(Carteirinha, codigo_autenticacao=codigo_autenticacao)
    associado = carteirinha.associado

    hoje = date.today()
    valida = carteirinha.ativa and (carteirinha.data_validade >= hoje) and (associado.status == 'Ativo')

    context = {
        'carteirinha': carteirinha,
        'associado': associado,
        'valida': valida,
        'hoje': hoje,
    }
    return render(request, 'portal/validar.html', context)


def api_dados_view(request):
    """Endpoint REST JSON para compatibilidade com o frontend."""
    collection = request.GET.get('collection', 'config')
    
    if collection == 'config':
        return JsonResponse({
            'nome_associacao': 'ASSGA - Associação de Surdos de São Gonçalo do Amarante',
            'sigla': 'ASSGA',
            'cnpj': '57.242.499/0001-60',
            'email': 'assgar2019@gmail.com',
            'telefone': '(84) 99698-1248',
            'chave_pix': 'Polyanabritoflamengobeatriz@gmail.com',
        })
    elif collection == 'associados':
        dados = list(Associado.objects.values(
            'matricula', 'nome', 'cpf', 'categoria', 'status', 'validade_carteirinha', 'identidade_surda'
        ))
        return JsonResponse({'associados': dados})
    elif collection == 'eventos':
        dados = list(Evento.objects.filter(ativo=True).values('titulo', 'tipo', 'local', 'data_inicio'))
        return JsonResponse({'eventos': dados})
    
    return JsonResponse({'status': 'ok'})
