# Projeto ASSGA em Python & Django

Este diretório contém a versão completa e profissional do **Portal ASSGA (Associação dos Surdos de São Gonçalo do Amarante - RN)** desenvolvida em **Python 3** utilizando o framework **Django**.

---

## 📁 Estrutura do Projeto

```
django_assga/
├── manage.py                     # Utilitário CLI do Django
├── requirements.txt              # Dependências Python (Django, Pillow, qrcode, etc.)
├── README_DJANGO.md              # Este guia de execução
├── assga_project/                # Configuração central do projeto Django
│   ├── __init__.py
│   ├── settings.py               # Configurações (banco, apps, LIBRAS, templates)
│   ├── urls.py                   # Roteamento principal e painel admin
│   ├── wsgi.py                   # Entrada para servidores WSGI (Gunicorn)
│   └── asgi.py                   # Entrada para servidores ASGI
├── core/                         # Aplicação principal da ASSGA
│   ├── models.py                 # Associados, Carteirinha, Mensalidade, Diretoria, etc.
│   ├── admin.py                  # Painel Administrativo customizado com ações
│   ├── views.py                  # Lógica das páginas e API JSON
│   ├── forms.py                  # Formulários de login e envio de comprovante PIX
│   ├── urls.py                   # Rotas públicas e da área do associado
│   ├── context_processors.py     # Injeção automática de dados institucionais
│   └── management/commands/
│       └── seed_assga.py         # Comando para popular os dados iniciais oficiais
├── templates/                    # Templates HTML com Bootstrap 5 e VLibras
│   ├── base.html                 # Layout base com barra de acessibilidade e VLibras
│   └── portal/
│       ├── home.html             # Página Inicial com banners e eventos
│       ├── historia.html         # História e linha do tempo
│       ├── estatuto.html         # Capítulos e busca no estatuto social
│       ├── diretoria.html        # Membros da diretoria e conselho
│       ├── esportiva.html        # Modalidades esportivas e treinos
│       ├── evento.html           # Calendário de eventos
│       ├── carteirinha.html      # Carteirinha de sócio imprimível frente/verso
│       ├── pagamento.html        # Chave PIX e upload de comprovante
│       ├── login.html            # Login com Matrícula ou CPF
│       ├── area_associado.html   # Painel exclusivo do associado
│       └── validar.html          # Validação eletrônica de carteirinha via QR Code
└── static/                       # Arquivos estáticos (CSS, JS e imagens oficiais)
```

---

## 🚀 Como Executar o Projeto Django Localmente

### 1. Pré-requisitos
- Python 3.10 ou superior instalado no seu computador.

### 2. Criar e ativar o ambiente virtual (venv)
No terminal, entre na pasta `django_assga`:

```bash
cd django_assga

# No Linux / macOS:
python3 -m venv venv
source venv/bin/activate

# No Windows (PowerShell / CMD):
python -m venv venv
venv\Scripts\activate
```

### 3. Instalar as dependências
```bash
pip install -r requirements.txt
```

### 4. Executar as migrações do banco de dados
```bash
python manage.py makemigrations core
python manage.py migrate
```

### 5. Popular o banco com os dados oficiais da ASSGA
Execute o comando seed criado especialmente para o projeto:
```bash
python manage.py seed_assga
```
> Isso irá cadastrar automaticamente os associados de exemplo (como Carlos Eduardo), a diretoria executiva, as modalidades esportivas (Futsal, Vôlei, Atletismo), os eventos e os capítulos do estatuto.

### 6. Criar um usuário administrador para o Django Admin
```bash
python manage.py createsuperuser
```
*(Siga as instruções para definir seu usuário, e-mail e senha)*.

### 7. Iniciar o servidor de desenvolvimento
```bash
python manage.py runserver
```

Agora acesse no seu navegador:
- **Portal Público:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Painel Administrativo Django:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Emissão da Carteirinha de Sócio:** [http://127.0.0.1:8000/carteirinha/](http://127.0.0.1:8000/carteirinha/)
- **Área do Associado (Login):** [http://127.0.0.1:8000/login/](http://127.0.0.1:8000/login/) *(use a matrícula `ASG-2024-001`)*

---

## 💎 Recursos Incluídos

1. **Acessibilidade em LIBRAS:**
   - Plugin do **VLibras** pré-configurado no template `base.html`.
   - Campo para links de vídeos explicativos em LIBRAS nos formulários e eventos.

2. **Carteirinha de Sócio Inteligente:**
   - Modelo frente e verso pronto para impressão em folha/PVC.
   - QR Code com validação pública em tempo real pela rota `/validar/<codigo>/`.

3. **Gestão Financeira & PIX:**
   - Chave PIX oficial configurada (`assgar2019@gmail.com`).
   - Módulo de envio de comprovantes de pagamento e histórico de mensalidades.

4. **Painel Django Admin:**
   - Gestão completa de associados com filtros por status, categoria e cidade.
   - Ação rápida para aprovar e validar mensalidades.
   - Gestão de diretoria, eventos e artigos do estatuto social.
