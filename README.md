# Infinity Care — primeira versão React

Plataforma demonstrativa de angariação de fundos para causas médicas.

## Requisitos
- Node.js 18 ou superior
- npm

## Instalar e executar
```bash
npm install
npm run dev
```
Abra o endereço local indicado pelo Vite (normalmente http://localhost:5173).

## Criar versão de produção
```bash
npm run build
npm run preview
```

## O que já está incluído
- Página inicial responsiva com campanhas.
- Página individual de campanha com fotografia, biografia, vídeo por URL e progresso.
- Pesquisa de campanhas.
- Área de doação com transferência bancária para Ntsume (BCI), NIB copiável e instruções para envio do comprovativo por WhatsApp.
- Contacto WhatsApp no rodapé para esclarecimento de dúvidas.
- Painel administrativo para criar, editar e eliminar campanhas.
- Carregamento de imagem no painel.
- Persistência local através de `localStorage`.

## Limitações importantes desta versão
1. **A transferência é feita fora da plataforma.** O site apresenta os dados bancários da Ntsume e permite copiar o NIB. O doador faz a transferência no seu e-banking e envia o comprovativo pelo WhatsApp. A plataforma não confirma automaticamente o crédito bancário; a contribuição só deve ser contabilizada depois da conferência do comprovativo e da entrada do valor na conta.
2. O painel administrativo ainda não tem autenticação. Não publique esta versão com o painel aberto ao público.
3. Os dados ficam guardados no navegador e não são partilhados entre dispositivos. Uma versão pública precisa de backend e base de dados.
4. As campanhas de exemplo, fotografias e montantes são ilustrativos. Substitua-os por conteúdo autorizado e validado antes de publicar.
5. A marca foi escrita como **Infinity Care**, conforme indicado pelo proprietário.

## Próxima fase recomendada
- Backend e base de dados (por exemplo, Supabase).
- Autenticação e permissões para administradores.
- Upload de imagens e vídeos para armazenamento seguro.
- Integração M-Pesa/e-Mola com verificação de transacções por servidor.
- Recibos, histórico de doações e relatórios de transparência.
- Fluxo de validação de identidade, autorização do doente/responsável e documentos médicos.


## Campanha inicial — Mama Amélia

A versão está configurada com uma única campanha inicial:
- Paciente: Mama Amélia
- Fundo necessário: 1.390.000 MT
- Fundo já arrecadado: 400 MT
- Destino: cuidados médicos especializados na Índia
- Fotografia: `public/mama-amelia.png`

Os dados da campanha são informativos e devem ser acompanhados de documentação médica e autorização da paciente/responsável antes da publicação pública. O valor arrecadado de 400 MT foi mantido exactamente como indicado.
