Script simples para extrair listagens de produtos da Amazon da primeira página de resultados de pesquisa para uma determinada palavra-chave.


# Amazon Scraper

Projeto para buscar produtos da Amazon por palavra-chave, exibindo **título, imagem, preço, avaliações e link**. Backend em Node.js com Playwright e frontend em HTML/CSS/JS usando **Vite**.

---

## 1️⃣ Requisitos

Antes de começar, você precisará ter instalado:

- **Node.js >= 18** (recomendado instalar via [Node.js oficial](https://nodejs.org/))
- **npm** (vem junto com o Node.js)
- Navegador moderno (Chrome, Edge ou Firefox)

---

## 2️⃣ Clonar o projeto


git clone https://seu-repositorio.git
cd amazon-scraper

3️⃣ Configuração do Backend
Acesse a pasta do backend:


cd backend
Instale as dependências:


npm install express cors playwright
Instale os navegadores para o Playwright:


npx playwright install
Rodar o backend:


node index.js
O servidor rodará em http://localhost:3000

Rota principal: / → retorna apenas "Backend Node.js funcionando!"

Rota de scraping: /api/scrape?keyword=PALAVRA → retorna JSON com produtos

4️⃣ Configuração do Frontend (Vite)
Acesse a pasta do frontend:


cd ../frontend
Inicialize um projeto Vite (se não estiver incluso):


npm create vite@latest .
# Escolha "vanilla" ou "vanilla-js"
Instale dependências:


npm install
Rodar o frontend:


npm run dev
Vite irá fornecer um link local (ex: http://localhost:5173) para acessar a aplicação

O frontend irá consumir o backend para buscar produtos

5️⃣ Estrutura do projeto
pgsql
Copiar
Editar
amazon-scraper/
│
├─ backend/
│  ├─ index.js            # Servidor Node.js com Playwright
│  └─ package.json
│
├─ frontend/
│  ├─ index.html
│  ├─ style.css
│  └─ main.js             # Lógica JS para renderizar produtos
│
└─ README.md
6️⃣ Uso
Rodar o backend (node index.js)

Rodar o frontend (npm run dev)

Abrir o navegador no link do Vite

Digitar a palavra-chave no campo de busca e clicar em "Buscar"

Visualizar os produtos retornados da Amazon

7️⃣ Exemplo de JSON retornado
json
Copiar
Editar
[
  {
    "titulo": "Notebook Lenovo IdeaPad 1 15AMN7 AMD Ryzen 3 7320U 4GB 256GB SSD Windows 11 15.6\" - 82X5000LBR Cloud Grey",
    "imagem": "https://m.media-amazon.com/images/I/519KvpZ9iBL._AC_UL320_.jpg",
    "preco": "R$ 2.184,05",
    "avaliacoes": {
      "nota": "4,5 de 5 estrelas",
      "quantidade": "52"
    },
    "link": "https://www.amazon.com.br/dp/B0FHJ7QP5M"
  }
]
titulo → Nome do produto

imagem → URL da imagem do produto

preco → Preço atual

avaliacoes.nota → Avaliação em estrelas

avaliacoes.quantidade → Quantidade de avaliações

link → Link direto para o produto na Amazon

8️⃣ Observações importantes
Backend depende do Playwright para simular navegador e extrair dados. É necessário instalar navegadores via npx playwright install.

A Amazon pode bloquear scraping em excesso. Use de forma moderada.

Todos os erros são tratados: se algo falhar, mensagens aparecem no frontend e backend.

Código comentado para entendimento da lógica no backend e frontend.

