// importa os modulos e cria conexão 
import express from "express";
import cors from "cors";
import { chromium } from "playwright";

const app = express();
const PORT = 3000;

app.use(cors());

// verifica se a conexão foi bem sucedida
app.get("/", (req, res) => {
  res.send("Backend Node.js funcionando!");
});

// endpoint criado, cria uma requisição GET
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword || "notebook";
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
  
  // Configura um UserAgent para simular um pesquisa
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "pt-BR",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36" 
  });
  const page = await context.newPage();

  // Logs de validações para checar se o carregamento foi bem sucedido
  try {
    console.log(`Acessando a página: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

    await page.waitForSelector('div[data-component-type="s-search-result"]', { timeout: 30000 });
    console.log("Produtos carregaram!");

    // Faz as busca dos pordutos com base na keyword
    const produtos = await page.$$eval(
    'div[data-component-type="s-search-result"]',
    items => items.map(item => {
    // Título
    const titulo = item.querySelector('h2 a span')?.textContent?.trim() 
                 || "Sem título";

    // Imagem
    const imagem = item.querySelector('img.s-image')?.src || null;

    // Preço
    const preco = item.querySelector('span.a-price > span.a-offscreen')?.textContent?.trim() 
                || "Sem preço";

    // Nota (estrelas)
    const nota = item.querySelector('i[data-cy="reviews-ratings-slot"] span.a-icon-alt')?.textContent?.trim() 
                 || "Sem avaliação";

    // Quantidade de avaliações
    const quantidade = item.querySelector('a[href*="customerReviews"] span.a-size-base')?.textContent?.trim() 
                      || "0";

    const avaliacoes = { nota, quantidade };

    // Link do produto usando data-asin
    const asin = item.getAttribute('data-asin');
    const link = asin ? `https://www.amazon.com.br/dp/${asin}` : null;

    return { titulo, imagem, preco, avaliacoes, link };
  })
);

    res.json(produtos);

  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).json({ erro: error.message });
  } finally {
    await browser.close();
    console.log("Navegador fechado"); // fecha o navegador dps da busca
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`); // servidor rodando na porta 3000 localhost
});
