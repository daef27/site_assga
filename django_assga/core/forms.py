from django import forms
from .models import Associado, Mensalidade, MensagemContato

class AssociadoLoginForm(forms.Form):
    identificador = forms.CharField(
        label='Matrícula ou CPF',
        max_length=50,
        widget=forms.TextInput(attrs={
            'class': 'form-control form-control-lg',
            'placeholder': 'Ex: ASG-2024-001 ou 123.456.789-00',
            'required': True,
        })
    )


class MensagemContatoForm(forms.ModelForm):
    class Meta:
        model = MensagemContato
        fields = ['nome', 'email', 'telefone', 'assunto', 'mensagem', 'video_libras_url']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome completo'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'seu.email@exemplo.com'}),
            'telefone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': '(84) 99999-9999'}),
            'assunto': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Assunto da mensagem'}),
            'mensagem': forms.Textarea(attrs={'class': 'form-control', 'rows': 4, 'placeholder': 'Digite sua mensagem ou dúvida...'}),
            'video_libras_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'Link do vídeo em LIBRAS no YouTube ou Drive (opcional)'}),
        }


class ComprovanteUploadForm(forms.ModelForm):
    class Meta:
        model = Mensalidade
        fields = ['comprovante', 'observacoes']
        widgets = {
            'comprovante': forms.FileInput(attrs={'class': 'form-control', 'required': True}),
            'observacoes': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ex: PIX pago pelo titular Carlos...'}),
        }
