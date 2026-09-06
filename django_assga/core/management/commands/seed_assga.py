from django.core.management.base import BaseCommand
from datetime import date, datetime
from core.models import (
    Associado, Carteirinha, Mensalidade, MembroDiretoria,
    ModalidadeEsportiva, Evento, Noticia, CapituloEstatuto, ArtigoEstatuto
)

class Command(BaseCommand):
    help = 'Popula o banco de dados com os dados oficiais da ASSGA'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Iniciando seed de dados da ASSGA...'))

        # 1. Associados
        associados_data = [
            {
                'matricula': 'ASG-2024-001',
                'nome': 'Carlos Eduardo do Nascimento',
                'email': 'deafdonascimento@gmail.com',
                'telefone': '(84) 98845-1290',
                'cpf': '123.456.789-00',
                'rg': '2.345.678 SSP',
                'data_nascimento': date(1992, 7, 14),
                'tipo_sanguineo': 'O+',
                'data_filiacao': date(2018, 2, 10),
                'categoria': 'Sócio Atleta',
                'status': 'Ativo',
                'validade_carteirinha': date(2026, 12, 31),
                'cidade': 'São Gonçalo do Amarante',
                'estado': 'RN',
                'identidade_surda': 'Surdo(a)',
                'foto_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            },
            {
                'matricula': 'ASG-2023-042',
                'nome': 'Mariana Silveira Santos',
                'email': 'mariana.silveira@email.com',
                'telefone': '(84) 99123-4567',
                'cpf': '345.678.901-22',
                'rg': '3.456.789 SSP',
                'data_nascimento': date(1988, 3, 28),
                'tipo_sanguineo': 'A+',
                'data_filiacao': date(2019, 5, 15),
                'categoria': 'Sócio Efetivo',
                'status': 'Ativo',
                'validade_carteirinha': date(2026, 12, 31),
                'cidade': 'Natal',
                'estado': 'RN',
                'identidade_surda': 'Surdo(a)',
                'foto_url': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
            },
            {
                'matricula': 'ASG-2024-089',
                'nome': 'Lucas Vinicius Pereira Lima',
                'email': 'lucas.pereira@email.com',
                'telefone': '(84) 98711-2233',
                'cpf': '567.890.123-44',
                'rg': '4.567.890 SSP',
                'data_nascimento': date(1996, 11, 5),
                'tipo_sanguineo': 'B+',
                'data_filiacao': date(2022, 1, 20),
                'categoria': 'Sócio Atleta',
                'status': 'Ativo',
                'validade_carteirinha': date(2026, 12, 31),
                'cidade': 'São Gonçalo do Amarante',
                'estado': 'RN',
                'identidade_surda': 'Surdo(a)',
                'foto_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
            },
            {
                'matricula': 'ASG-2022-015',
                'nome': 'Renata Albuquerque Mendes',
                'email': 'renata.mendes@email.com',
                'telefone': '(84) 99654-7890',
                'cpf': '789.012.345-66',
                'rg': '5.678.901 SSP',
                'data_nascimento': date(1994, 9, 19),
                'tipo_sanguineo': 'AB+',
                'data_filiacao': date(2021, 8, 12),
                'categoria': 'Sócio Colaborador',
                'status': 'Pendente',
                'validade_carteirinha': date(2025, 12, 31),
                'cidade': 'Macaíba',
                'estado': 'RN',
                'identidade_surda': 'Intérprete / Familiar ouvinte',
                'foto_url': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
            }
        ]

        for dados in associados_data:
            assoc, created = Associado.objects.update_or_create(
                matricula=dados['matricula'],
                defaults=dados
            )
            # Cria carteirinha
            Carteirinha.objects.get_or_create(
                associado=assoc,
                defaults={'data_validade': assoc.validade_carteirinha or date(2026, 12, 31)}
            )
            # Cria mensalidades de exemplo
            Mensalidade.objects.get_or_create(
                associado=assoc,
                mes_referencia=9,
                ano_referencia=2026,
                defaults={'valor': 25.00, 'status': 'Pago' if assoc.status == 'Ativo' else 'Pendente', 'metodo': 'PIX'}
            )

        self.stdout.write(self.style.SUCCESS(f'{len(associados_data)} associados criados/atualizados.'))

        # 2. Diretoria
        diretoria_data = [
            {'ordem': 1, 'cargo': 'Presidente', 'nome': 'Carlos Eduardo do Nascimento', 'gestao': '2024-2028', 'email': 'deafdonascimento@gmail.com', 'telefone': '(84) 99698-1248', 'bio': 'Liderança surda ativa na luta pelos direitos linguísticos, acessibilidade e fortalecimento do desporto de surdos.'},
            {'ordem': 2, 'cargo': 'Vice-Presidente', 'nome': 'Mariana Silveira Santos', 'gestao': '2024-2028', 'email': 'mariana.silveira@email.com', 'telefone': '(84) 99123-4567', 'bio': 'Coordenadora de projetos comunitários e fomento cultural em LIBRAS.'},
            {'ordem': 3, 'cargo': 'Diretor de Esportes', 'nome': 'Lucas Vinicius Pereira', 'gestao': '2024-2028', 'email': 'lucas.pereira@email.com', 'telefone': '(84) 98711-2233', 'bio': 'Atleta de futsal para surdos, responsável pelo planejamento de competições e treinos da associação.'},
            {'ordem': 4, 'cargo': '1ª Secretária', 'nome': 'Juliana Costa Ferreira', 'gestao': '2024-2028', 'email': 'secretaria.assga@gmail.com', 'telefone': '(84) 98877-6655', 'bio': 'Gestão de documentação, atas e cadastro de associados.'},
            {'ordem': 5, 'cargo': 'Diretor Financeiro / Tesoureiro', 'nome': 'Marcos André da Silva', 'gestao': '2024-2028', 'email': 'financeiro.assga@gmail.com', 'telefone': '(84) 98122-3344', 'bio': 'Responsável pela transparência contábil, prestação de contas e arrecadação de mensalidades.'},
        ]

        for d in diretoria_data:
            MembroDiretoria.objects.update_or_create(cargo=d['cargo'], defaults=d)

        self.stdout.write(self.style.SUCCESS('Diretoria atualizada.'))

        # 3. Modalidades Esportivas
        modalidades_data = [
            {'nome': 'Futsal Masculino e Feminino', 'categoria': 'Principal e Veteranos', 'icone': 'fa-futbol', 'dias_treino': 'Terças e Quintas às 19:30', 'local_treino': 'Ginásio Municipal de São Gonçalo do Amarante', 'responsavel': 'Lucas Vinicius', 'descricao': 'Treinamento tático e físico para competições estaduais e nacionais de surdoatletas filiados à CBDS.'},
            {'nome': 'Voleibol de Surdos', 'categoria': 'Misto', 'icone': 'fa-volleyball', 'dias_treino': 'Sábados às 15:00', 'local_treino': 'Quadra Poliesportiva Central', 'responsavel': 'Equipe Técnica ASSGA', 'descricao': 'Iniciação e alto rendimento no voleibol, adaptado com sinais visuais.'},
            {'nome': 'Atletismo e Corridas de Rua', 'categoria': 'Geral', 'icone': 'fa-person-running', 'dias_treino': 'Segundas, Quartas e Sextas às 06:00', 'local_treino': 'Pista Municipal', 'responsavel': 'Coordenação Esportiva', 'descricao': 'Preparação para provas de 5km, 10km e pista oficial.'},
            {'nome': 'Xadrez e Jogos de Mesa', 'categoria': 'Livre', 'icone': 'fa-chess', 'dias_treino': 'Domingos às 14:00', 'local_treino': 'Sede Social da ASSGA', 'responsavel': 'Diretoria Social', 'descricao': 'Estimula o raciocínio estratégico e a integração dos associados de todas as idades.'},
        ]

        for m in modalidades_data:
            ModalidadeEsportiva.objects.update_or_create(nome=m['nome'], defaults=m)

        self.stdout.write(self.style.SUCCESS('Modalidades esportivas cadastradas.'))

        # 4. Eventos
        eventos_data = [
            {
                'titulo': 'Torneio Estadual de Futsal dos Surdos 2026',
                'tipo': 'Campeonato Oficial',
                'data_inicio': datetime(2026, 10, 12, 9, 0),
                'local': 'Ginásio Poliesportivo de São Gonçalo do Amarante - RN',
                'descricao': 'Competição que reúne equipes de surdos de várias regiões do Rio Grande do Norte e estados vizinhos.',
                'libras_disponivel': True,
                'imagem_url': '/static/imagens/foto1.jpg',
                'destaque': True,
            },
            {
                'titulo': 'Encontro de Conscientização e Cultura Surda (Setembro Azul)',
                'tipo': 'Cultural e Comunitário',
                'data_inicio': datetime(2026, 9, 26, 14, 0),
                'local': 'Auditório da Casa de Cultura Municipal',
                'descricao': 'Palestras, oficinas em LIBRAS, apresentações teatrais e debates sobre acessibilidade e inclusão social.',
                'libras_disponivel': True,
                'imagem_url': '/static/imagens/Assga_foto.jpg',
                'destaque': True,
            },
            {
                'titulo': 'Assembleia Geral Ordinária de Prestação de Contas',
                'tipo': 'Institucional',
                'data_inicio': datetime(2026, 11, 20, 18, 30),
                'local': 'Sede Social da ASSGA',
                'descricao': 'Apresentação dos balancetes financeiros, relatório de atividades esportivas e deliberações estatutárias.',
                'libras_disponivel': True,
                'imagem_url': '/static/imagens/foto2.jpg',
                'destaque': False,
            }
        ]

        for ev in eventos_data:
            Evento.objects.update_or_create(titulo=ev['titulo'], defaults=ev)

        self.stdout.write(self.style.SUCCESS('Eventos inseridos.'))

        # 5. Capítulos e Artigos do Estatuto
        cap1, _ = CapituloEstatuto.objects.get_or_create(numero=1, defaults={'titulo': 'Da Denominação, Sede, Fins e Duração', 'ordem': 1})
        ArtigoEstatuto.objects.get_or_create(capitulo=cap1, numero=1, defaults={
            'texto': 'A ASSGA - Associação dos Surdos de São Gonçalo do Amarante, fundada em 23 de Julho de 2024, é uma entidade civil sem fins lucrativos, com personalidade jurídica própria e prazo de duração indeterminado.',
            'paragrafo_unico': 'A associação adota a Língua Brasileira de Sinais (LIBRAS) como meio oficial e prioritário de comunicação, instrução e deliberação.'
        })
        ArtigoEstatuto.objects.get_or_create(capitulo=cap1, numero=2, defaults={
            'texto': 'A ASSGA tem por finalidade precípua promover a união da comunidade surda, fomentar o desporto, defender a cidadania e a inclusão social.',
        })

        cap2, _ = CapituloEstatuto.objects.get_or_create(numero=2, defaults={'titulo': 'Dos Sócios, Seus Direitos e Deveres', 'ordem': 2})
        ArtigoEstatuto.objects.get_or_create(capitulo=cap2, numero=3, defaults={
            'texto': 'O quadro social da ASSGA é composto pelas seguintes categorias: Sócios Atletas, Sócios Efetivos, Sócios Colaboradores e Sócios Beneméritos.',
        })
        ArtigoEstatuto.objects.get_or_create(capitulo=cap2, numero=4, defaults={
            'texto': 'São direitos dos associados em dia com suas mensalidades: participar das assembleias gerais, votar e ser votado, usufruir da carteirinha oficial e participar das modalidades esportivas.',
        })

        self.stdout.write(self.style.SUCCESS('Capítulos e Artigos do Estatuto cadastrados.'))
        self.stdout.write(self.style.SUCCESS('=== Banco de dados da ASSGA populado com sucesso! ==='))
