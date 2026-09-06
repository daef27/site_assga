from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Associado, Carteirinha, Mensalidade, MembroDiretoria,
    ModalidadeEsportiva, Evento, Noticia, CapituloEstatuto,
    ArtigoEstatuto, MensagemContato
)

@admin.action(description='Marcar selecionados como Ativo')
def marcar_como_ativo(modeladmin, request, queryset):
    queryset.update(status='Ativo')

@admin.action(description='Marcar mensalidades selecionadas como Pago (PIX confirmado)')
def marcar_mensalidade_paga(modeladmin, request, queryset):
    from django.utils import timezone
    queryset.update(status='Pago', data_pagamento=timezone.now())

class CarteirinhaInline(admin.StackedInline):
    model = Carteirinha
    extra = 0
    can_delete = False
    readonly_fields = ('codigo_autenticacao', 'data_emissao')

class MensalidadeInline(admin.TabularInline):
    model = Mensalidade
    extra = 0
    fields = ('mes_referencia', 'ano_referencia', 'valor', 'status', 'metodo', 'data_pagamento')
    ordering = ('-ano_referencia', '-mes_referencia')

@admin.register(Associado)
class AssociadoAdmin(admin.ModelAdmin):
    list_display = ('matricula', 'nome', 'cpf', 'categoria', 'status_badge', 'identidade_surda', 'validade_carteirinha')
    list_filter = ('status', 'categoria', 'identidade_surda', 'cidade')
    search_fields = ('matricula', 'nome', 'cpf', 'email', 'telefone')
    ordering = ('nome',)
    inlines = [CarteirinhaInline, MensalidadeInline]
    actions = [marcar_como_ativo]

    fieldsets = (
        ('Identificação do Associado', {
            'fields': (('matricula', 'nome'), ('cpf', 'rg'), ('data_nascimento', 'tipo_sanguineo'))
        }),
        ('Contato e Endereço', {
            'fields': (('email', 'telefone'), ('cidade', 'estado'))
        }),
        ('Filiação e Associação', {
            'fields': (('categoria', 'status'), ('data_filiacao', 'validade_carteirinha'), 'identidade_surda')
        }),
        ('Fotografia 3x4', {
            'fields': ('foto', 'foto_url')
        }),
    )

    def status_badge(self, obj):
        cores = {
            'Ativo': '#16a34a',
            'Pendente': '#ca8a04',
            'Inativo': '#dc2626',
            'Bloqueado': '#4b5563',
        }
        cor = cores.get(obj.status, '#003366')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-weight: bold; font-size: 11px;">{}</span>',
            cor, obj.status
        )
    status_badge.short_description = 'Status'


@admin.register(Carteirinha)
class CarteirinhaAdmin(admin.ModelAdmin):
    list_display = ('associado', 'via', 'data_emissao', 'data_validade', 'ativa', 'codigo_autenticacao')
    list_filter = ('ativa', 'via')
    search_fields = ('associado__nome', 'associado__matricula', 'codigo_autenticacao')


@admin.register(Mensalidade)
class MensalidadeAdmin(admin.ModelAdmin):
    list_display = ('associado', 'referencia', 'valor', 'status_badge', 'metodo', 'data_pagamento')
    list_filter = ('status', 'metodo', 'ano_referencia', 'mes_referencia')
    search_fields = ('associado__nome', 'associado__matricula', 'associado__cpf')
    actions = [marcar_mensalidade_paga]

    def referencia(self, obj):
        return f"{obj.mes_referencia:02d}/{obj.ano_referencia}"
    referencia.short_description = 'Mês/Ano'

    def status_badge(self, obj):
        cor = '#16a34a' if obj.status == 'Pago' else ('#ca8a04' if obj.status == 'Pendente' else '#dc2626')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; border-radius: 10px; font-weight: bold;">{}</span>',
            cor, obj.status
        )
    status_badge.short_description = 'Status'


@admin.register(MembroDiretoria)
class MembroDiretoriaAdmin(admin.ModelAdmin):
    list_display = ('ordem', 'cargo', 'nome', 'gestao', 'telefone', 'email')
    list_editable = ('ordem',)
    search_fields = ('nome', 'cargo')
    ordering = ('ordem',)


@admin.register(ModalidadeEsportiva)
class ModalidadeEsportivaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'responsavel', 'dias_treino', 'ativa')
    list_filter = ('ativa',)
    search_fields = ('nome', 'responsavel')


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'data_inicio', 'local', 'libras_disponivel', 'destaque', 'ativo')
    list_filter = ('ativo', 'destaque', 'libras_disponivel', 'tipo')
    search_fields = ('titulo', 'local', 'descricao')
    prepopulated_fields = {'slug': ('titulo',)}


@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data_publicacao', 'destaque')
    list_filter = ('destaque', 'data_publicacao')
    search_fields = ('titulo', 'resumo', 'conteudo')
    prepopulated_fields = {'slug': ('titulo',)}


class ArtigoEstatutoInline(admin.TabularInline):
    model = ArtigoEstatuto
    extra = 1
    fields = ('numero', 'texto', 'paragrafo_unico')


@admin.register(CapituloEstatuto)
class CapituloEstatutoAdmin(admin.ModelAdmin):
    list_display = ('ordem', 'numero', 'titulo')
    list_editable = ('ordem',)
    inlines = [ArtigoEstatutoInline]


@admin.register(MensagemContato)
class MensagemContatoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone', 'assunto', 'data_envio', 'respondido')
    list_filter = ('respondido', 'data_envio')
    search_fields = ('nome', 'email', 'assunto', 'mensagem')
