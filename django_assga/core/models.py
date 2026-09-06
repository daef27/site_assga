from django.db import models
from django.utils.text import slugify
import uuid

class Associado(models.Model):
    CATEGORIAS = [
        ('Sócio Atleta', 'Sócio Atleta'),
        ('Sócio Efetivo', 'Sócio Efetivo'),
        ('Sócio Colaborador', 'Sócio Colaborador'),
        ('Sócio Benemérito', 'Sócio Benemérito'),
    ]

    STATUS_CHOICES = [
        ('Ativo', 'Ativo'),
        ('Pendente', 'Pendente'),
        ('Inativo', 'Inativo'),
        ('Bloqueado', 'Bloqueado'),
    ]

    matricula = models.CharField('Matrícula', max_length=30, unique=True)
    nome = models.CharField('Nome Completo', max_length=150)
    email = models.EmailField('E-mail')
    telefone = models.CharField('Telefone / WhatsApp', max_length=30)
    cpf = models.CharField('CPF', max_length=18, unique=True)
    rg = models.CharField('RG', max_length=30, blank=True)
    data_nascimento = models.DateField('Data de Nascimento')
    tipo_sanguineo = models.CharField('Tipo Sanguíneo', max_length=10, blank=True, default='O+')
    data_filiacao = models.DateField('Data de Filiação')
    categoria = models.CharField('Categoria de Sócio', max_length=50, choices=CATEGORIAS, default='Sócio Atleta')
    status = models.CharField('Status', max_length=20, choices=STATUS_CHOICES, default='Ativo')
    foto = models.ImageField('Foto 3x4', upload_to='associados/fotos/', blank=True, null=True)
    foto_url = models.URLField('URL da Foto (opcional)', blank=True, help_text='Caso a foto esteja hospedada externamente')
    validade_carteirinha = models.DateField('Validade da Carteirinha', null=True, blank=True)
    cidade = models.CharField('Cidade', max_length=100, default='São Gonçalo do Amarante')
    estado = models.CharField('Estado (UF)', max_length=2, default='RN')
    identidade_surda = models.CharField('Identidade', max_length=60, default='Surdo(a)')
    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    updated_at = models.DateTimeField('Atualizado em', auto_now=True)

    class Meta:
        verbose_name = 'Associado'
        verbose_name_plural = 'Associados'
        ordering = ['nome']

    def __str__(self):
        return f"{self.matricula} - {self.nome}"

    def get_foto(self):
        if self.foto:
            return self.foto.url
        if self.foto_url:
            return self.foto_url
        return '/static/imagens/avatar-padrao.jpg'


class Carteirinha(models.Model):
    associado = models.OneToOneField(Associado, on_delete=models.CASCADE, related_name='carteirinha')
    codigo_autenticacao = models.CharField('Código de Autenticação', max_length=64, unique=True, default=uuid.uuid4)
    via = models.PositiveIntegerField('Via', default=1)
    data_emissao = models.DateField('Data de Emissão', auto_now_add=True)
    data_validade = models.DateField('Data de Validade')
    ativa = models.BooleanField('Ativa', default=True)

    class Meta:
        verbose_name = 'Carteirinha'
        verbose_name_plural = 'Carteirinhas'

    def __str__(self):
        return f"Carteirinha {self.associado.matricula} (Via {self.via})"


class Mensalidade(models.Model):
    STATUS_CHOICES = [
        ('Pago', 'Pago'),
        ('Pendente', 'Pendente'),
        ('Atrasado', 'Atrasado'),
        ('Isento', 'Isento'),
    ]

    METODOS = [
        ('PIX', 'PIX'),
        ('Dinheiro', 'Dinheiro'),
        ('Transferência', 'Transferência'),
        ('Cartão', 'Cartão de Crédito/Débito'),
    ]

    associado = models.ForeignKey(Associado, on_delete=models.CASCADE, related_name='mensalidades')
    mes_referencia = models.PositiveSmallIntegerField('Mês de Referência')
    ano_referencia = models.PositiveIntegerField('Ano de Referência')
    valor = models.DecimalField('Valor (R$)', max_digits=8, decimal_places=2, default=25.00)
    status = models.CharField('Status', max_length=20, choices=STATUS_CHOICES, default='Pendente')
    metodo = models.CharField('Método de Pagamento', max_length=30, choices=METODOS, default='PIX')
    data_pagamento = models.DateTimeField('Data do Pagamento', null=True, blank=True)
    comprovante = models.FileField('Comprovante', upload_to='comprovantes/', null=True, blank=True)
    observacoes = models.TextField('Observações', blank=True)
    created_at = models.DateTimeField('Registrado em', auto_now_add=True)

    class Meta:
        verbose_name = 'Mensalidade'
        verbose_name_plural = 'Mensalidades'
        ordering = ['-ano_referencia', '-mes_referencia']
        unique_together = ('associado', 'mes_referencia', 'ano_referencia')

    def __str__(self):
        return f"{self.associado.nome} - {self.mes_referencia:02d}/{self.ano_referencia} ({self.status})"


class MembroDiretoria(models.Model):
    nome = models.CharField('Nome Completo', max_length=150)
    cargo = models.CharField('Cargo', max_length=100)
    gestao = models.CharField('Gestão / Quadriênio', max_length=50, default='2024-2028')
    ordem = models.PositiveIntegerField('Ordem de Exibição', default=1)
    foto = models.ImageField('Foto Oficial', upload_to='diretoria/', blank=True, null=True)
    foto_url = models.URLField('URL da Foto (opcional)', blank=True)
    bio = models.TextField('Biografia / Resumo', blank=True)
    email = models.EmailField('E-mail institucional', blank=True)
    telefone = models.CharField('WhatsApp / Contato', max_length=30, blank=True)

    class Meta:
        verbose_name = 'Membro da Diretoria'
        verbose_name_plural = 'Diretoria Executiva'
        ordering = ['ordem', 'nome']

    def __str__(self):
        return f"{self.cargo}: {self.nome}"

    def get_foto(self):
        if self.foto:
            return self.foto.url
        if self.foto_url:
            return self.foto_url
        return '/static/imagens/avatar-padrao.jpg'


class ModalidadeEsportiva(models.Model):
    nome = models.CharField('Nome da Modalidade', max_length=100)
    categoria = models.CharField('Categoria', max_length=50, default='Masculino e Feminino')
    icone = models.CharField('Ícone FontAwesome', max_length=50, default='fa-futbol')
    dias_treino = models.CharField('Dias e Horários de Treino', max_length=150)
    local_treino = models.CharField('Local de Treino', max_length=200)
    responsavel = models.CharField('Responsável Técnico / Coordenador', max_length=120)
    descricao = models.TextField('Descrição da Modalidade')
    ativa = models.BooleanField('Ativa na ASSGA', default=True)

    class Meta:
        verbose_name = 'Modalidade Esportiva'
        verbose_name_plural = 'Modalidades Esportivas'

    def __str__(self):
        return self.nome


class Evento(models.Model):
    titulo = models.CharField('Título do Evento', max_length=200)
    slug = models.SlugField('Slug / URL', unique=True, blank=True)
    tipo = models.CharField('Tipo do Evento', max_length=60, default='Esportivo e Cultural')
    data_inicio = models.DateTimeField('Data e Horário de Início')
    data_fim = models.DateTimeField('Data e Horário de Término', null=True, blank=True)
    local = models.CharField('Local', max_length=200)
    descricao = models.TextField('Descrição e Detalhes')
    libras_disponivel = models.BooleanField('Intérpretes de LIBRAS confirmados', default=True)
    imagem = models.ImageField('Imagem / Banner', upload_to='eventos/', blank=True, null=True)
    imagem_url = models.URLField('URL da Imagem (opcional)', blank=True)
    destaque = models.BooleanField('Destaque na Página Inicial', default=False)
    ativo = models.BooleanField('Publicado', default=True)

    class Meta:
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        ordering = ['-data_inicio']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo


class Noticia(models.Model):
    titulo = models.CharField('Título da Notícia', max_length=250)
    slug = models.SlugField('Slug / URL', unique=True, blank=True)
    resumo = models.TextField('Resumo')
    conteudo = models.TextField('Conteúdo Completo (HTML ou Markdown)')
    imagem = models.ImageField('Imagem da Capa', upload_to='noticias/', blank=True, null=True)
    imagem_url = models.URLField('URL da Imagem (opcional)', blank=True)
    data_publicacao = models.DateTimeField('Data de Publicação', auto_now_add=True)
    destaque = models.BooleanField('Destaque', default=False)

    class Meta:
        verbose_name = 'Notícia'
        verbose_name_plural = 'Notícias e Comunicados'
        ordering = ['-data_publicacao']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.titulo)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo


class CapituloEstatuto(models.Model):
    numero = models.PositiveIntegerField('Número do Capítulo')
    titulo = models.CharField('Título do Capítulo', max_length=200)
    ordem = models.PositiveIntegerField('Ordem', default=1)

    class Meta:
        verbose_name = 'Capítulo do Estatuto'
        verbose_name_plural = 'Capítulos do Estatuto'
        ordering = ['ordem']

    def __str__(self):
        return f"Capítulo {self.numero}: {self.titulo}"


class ArtigoEstatuto(models.Model):
    capitulo = models.ForeignKey(CapituloEstatuto, on_delete=models.CASCADE, related_name='artigos')
    numero = models.PositiveIntegerField('Número do Artigo')
    texto = models.TextField('Texto do Artigo')
    paragrafo_unico = models.TextField('Parágrafo Único / Incisos', blank=True)

    class Meta:
        verbose_name = 'Artigo do Estatuto'
        verbose_name_plural = 'Artigos do Estatuto'
        ordering = ['capitulo__ordem', 'numero']

    def __str__(self):
        return f"Art. {self.numero}º - Cap. {self.capitulo.numero}"


class MensagemContato(models.Model):
    nome = models.CharField('Nome', max_length=150)
    email = models.EmailField('E-mail')
    telefone = models.CharField('Telefone / WhatsApp', max_length=30, blank=True)
    assunto = models.CharField('Assunto', max_length=150)
    mensagem = models.TextField('Mensagem')
    video_libras_url = models.URLField('Link do Vídeo em LIBRAS (opcional)', blank=True)
    data_envio = models.DateTimeField('Enviado em', auto_now_add=True)
    respondido = models.BooleanField('Respondido', default=False)

    class Meta:
        verbose_name = 'Mensagem de Contato'
        verbose_name_plural = 'Mensagens de Contato'
        ordering = ['-data_envio']

    def __str__(self):
        return f"{self.nome} - {self.assunto}"
