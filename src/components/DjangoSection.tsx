import { useState } from 'react';
import { Terminal, FileCode, CheckCircle, Copy, FolderTree, BookOpen, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export default function DjangoSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<'models' | 'admin' | 'views' | 'settings' | 'seed'>('models');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2500);
  };

  const quickstartCommands = `cd django_assga
python3 -m venv venv
source venv/bin/activate   # ou venv\\Scripts\\activate no Windows
pip install -r requirements.txt
python manage.py makemigrations core
python manage.py migrate
python manage.py seed_assga
python manage.py createsuperuser
python manage.py runserver`;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/30">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Versão Completa em Python & Django
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            ASSGA em Django Python
          </h1>
          <p className="mt-2 text-slate-300 max-w-2xl text-sm sm:text-base">
            O projeto foi estruturado integralmente dentro do diretório <code className="text-emerald-300 bg-black/30 px-2 py-0.5 rounded font-mono">/django_assga</code>, com models ORM, Django Admin customizado, templates DTL com acessibilidade em LIBRAS, emissão de carteirinha oficial com QR Code e comando seed com dados oficiais.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => copyToClipboard(quickstartCommands, 'commands')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              {copied === 'commands' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied === 'commands' ? 'Comandos Copiados!' : 'Copiar Comandos de Inicialização'}
            </button>
            <a
              href="#guia-execucao"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur border border-white/10 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Ver Passo a Passo
            </a>
          </div>
        </div>
      </div>

      {/* Grid de Resumo da Arquitetura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Django Models & ORM</h3>
          <p className="text-xs text-slate-600 mt-1">
            Entidades completas: <code className="text-emerald-700 font-semibold">Associado</code>, <code className="text-emerald-700 font-semibold">Carteirinha</code>, <code className="text-emerald-700 font-semibold">Mensalidade</code>, <code className="text-emerald-700 font-semibold">MembroDiretoria</code>, <code className="text-emerald-700 font-semibold">Evento</code> e <code className="text-emerald-700 font-semibold">ArtigoEstatuto</code>.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Painel Django Admin</h3>
          <p className="text-xs text-slate-600 mt-1">
            Interface administrativa pronta com filtros por status/categoria, busca por CPF/matrícula, validação em lote de PIX e inlines de carteirinhas e pagamentos.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
            <FolderTree className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Templates DTL + LIBRAS</h3>
          <p className="text-xs text-slate-600 mt-1">
            Todos os templates em <code className="text-amber-700 font-semibold">templates/portal/</code> com VLibras, carteirinha imprimível frente e verso e validação pública por QR Code.
          </p>
        </div>
      </div>

      {/* Passo a Passo de Execução */}
      <div id="guia-execucao" className="bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Como Iniciar o Django Localmente</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Python 3.10+ • Django 4.2+</span>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 mb-1">1. Instalar Dependências no Ambiente Virtual</div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900 rounded">
                <code>{`cd django_assga
python3 -m venv venv
source venv/bin/activate  # ou venv\\Scripts\\activate no Windows
pip install -r requirements.txt`}</code>
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 mb-1">2. Migrar e Popular Dados Oficiais da ASSGA</div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900 rounded">
                <code>{`python manage.py makemigrations core
python manage.py migrate
python manage.py seed_assga`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-emerald-400 mb-1">3. Criar Superusuário e Subir o Servidor Django</div>
            <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900 rounded">
              <code>{`python manage.py createsuperuser
python manage.py runserver`}</code>
            </pre>
            <div className="text-xs text-slate-400 mt-2">
              Pronto! Acesse <span className="text-emerald-300">http://127.0.0.1:8000/</span> para o portal e <span className="text-emerald-300">http://127.0.0.1:8000/admin/</span> para gerenciar os associados.
            </div>
          </div>
        </div>
      </div>

      {/* Visualizador de Arquivos Django */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">Código-Fonte dos Módulos Django</h3>
          </div>
          
          {/* File selector tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'models', label: 'core/models.py' },
              { id: 'admin', label: 'core/admin.py' },
              { id: 'views', label: 'core/views.py' },
              { id: 'seed', label: 'seed_assga.py' },
              { id: 'settings', label: 'settings.py' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFile(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedFile === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto max-h-[480px]">
          {selectedFile === 'models' && (
            <pre>
              <code>{`# django_assga/core/models.py
from django.db import models
from django.utils.text import slugify
import uuid

class Associado(models.Model):
    matricula = models.CharField('Matrícula', max_length=30, unique=True)
    nome = models.CharField('Nome Completo', max_length=150)
    email = models.EmailField('E-mail')
    telefone = models.CharField('Telefone / WhatsApp', max_length=30)
    cpf = models.CharField('CPF', max_length=18, unique=True)
    rg = models.CharField('RG', max_length=30, blank=True)
    data_nascimento = models.DateField('Data de Nascimento')
    tipo_sanguineo = models.CharField('Tipo Sanguíneo', max_length=10, default='O+')
    data_filiacao = models.DateField('Data de Filiação')
    categoria = models.CharField('Categoria', max_length=50, default='Sócio Atleta')
    status = models.CharField('Status', max_length=20, default='Ativo')
    foto = models.ImageField('Foto 3x4', upload_to='associados/fotos/', blank=True, null=True)
    validade_carteirinha = models.DateField('Validade', null=True, blank=True)
    cidade = models.CharField('Cidade', max_length=100, default='São Gonçalo do Amarante')
    estado = models.CharField('Estado', max_length=2, default='RN')
    identidade_surda = models.CharField('Identidade', max_length=60, default='Surdo(a)')

class Carteirinha(models.Model):
    associado = models.OneToOneField(Associado, on_delete=models.CASCADE)
    codigo_autenticacao = models.CharField(max_length=64, unique=True, default=uuid.uuid4)
    via = models.PositiveIntegerField(default=1)
    data_emissao = models.DateField(auto_now_add=True)
    data_validade = models.DateField()
    ativa = models.BooleanField(default=True)

class Mensalidade(models.Model):
    associado = models.ForeignKey(Associado, on_delete=models.CASCADE)
    mes_referencia = models.PositiveSmallIntegerField()
    ano_referencia = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=8, decimal_places=2, default=25.00)
    status = models.CharField(max_length=20, default='Pendente')
    metodo = models.CharField(max_length=30, default='PIX')`}</code>
            </pre>
          )}

          {selectedFile === 'admin' && (
            <pre>
              <code>{`# django_assga/core/admin.py
from django.contrib import admin
from .models import Associado, Carteirinha, Mensalidade, MembroDiretoria, Evento

@admin.register(Associado)
class AssociadoAdmin(admin.ModelAdmin):
    list_display = ('matricula', 'nome', 'cpf', 'categoria', 'status', 'identidade_surda')
    list_filter = ('status', 'categoria', 'identidade_surda', 'cidade')
    search_fields = ('matricula', 'nome', 'cpf', 'email', 'telefone')
    inlines = [CarteirinhaInline, MensalidadeInline]

@admin.register(Mensalidade)
class MensalidadeAdmin(admin.ModelAdmin):
    list_display = ('associado', 'mes_referencia', 'ano_referencia', 'valor', 'status', 'metodo')
    list_filter = ('status', 'metodo')
    actions = ['marcar_como_pago']`}</code>
            </pre>
          )}

          {selectedFile === 'views' && (
            <pre>
              <code>{`# django_assga/core/views.py
from django.shortcuts import render, get_object_or_404, redirect
from .models import Associado, Carteirinha, Evento, Mensalidade

def home_view(request):
    eventos = Evento.objects.filter(ativo=True)[:4]
    return render(request, 'portal/home.html', {'eventos': eventos})

def carteirinha_view(request, matricula=None):
    associado = get_object_or_404(Associado, matricula=matricula) if matricula else Associado.objects.first()
    carteirinha, _ = Carteirinha.objects.get_or_create(associado=associado)
    return render(request, 'portal/carteirinha.html', {'associado': associado, 'carteirinha': carteirinha})

def validar_carteirinha_view(request, codigo_autenticacao):
    carteirinha = get_object_or_404(Carteirinha, codigo_autenticacao=codigo_autenticacao)
    return render(request, 'portal/validar.html', {'carteirinha': carteirinha, 'valida': carteirinha.ativa})`}</code>
            </pre>
          )}

          {selectedFile === 'seed' && (
            <pre>
              <code>{`# django_assga/core/management/commands/seed_assga.py
# Executar com: python manage.py seed_assga
from django.core.management.base import BaseCommand
from core.models import Associado, Carteirinha, MembroDiretoria, ModalidadeEsportiva, Evento

class Command(BaseCommand):
    help = 'Popula dados oficiais da ASSGA'

    def handle(self, *args, **options):
        # Cadastra Carlos Eduardo, Diretoria, Eventos, Modalidades e Estatuto...
        self.stdout.write(self.style.SUCCESS('Banco de dados da ASSGA populado com sucesso!'))`}</code>
            </pre>
          )}

          {selectedFile === 'settings' && (
            <pre>
              <code>{`# django_assga/assga_project/settings.py
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Fortaleza'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',
]

ASSGA_CONFIG = {
    'NOME': 'ASSGA - Associação de Surdos de São Gonçalo do Amarante',
    'CNPJ': '57.242.499/0001-60',
    'EMAIL': 'assgar2019@gmail.com',
    'CHAVE_PIX': 'assgar2019@gmail.com',
}`}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
