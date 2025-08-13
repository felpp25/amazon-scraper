document.getElementById("buscar").addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();
  const container = document.getElementById("resultados");
  container.innerHTML = "";

  if (!keyword) {
    container.innerHTML = `<p class="empty">Digite uma palavra-chave para buscar.</p>`;
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    if (!res.ok) throw new Error("Falha na requisição ao backend");

    const dados = await res.json();

    if (!Array.isArray(dados) || !dados.length) {
      container.innerHTML = `<p class="empty">Nenhum produto encontrado.</p>`;
      return;
    }

    // Criando cards para cada produto
    dados.forEach(p => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <a href="${p.link || '#'}" target="_blank">
          <img src="${p.imagem}" alt="${p.titulo}" />
        </a>
        <h3>${p.titulo || "Sem título"}</h3>
        <p class="preco">Preço: ${p.preco || "Sem preço"}</p>
        <p class="avaliacoes">⭐ ${p.avaliacoes.nota || "Sem avaliação"} (${p.avaliacoes.quantidade || 0} avaliações)</p>
        <p class="link"><a href="${p.link || '#'}" target="_blank">Ver no site</a></p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">Erro ao buscar produtos. Verifique se o backend está rodando em <code>http://localhost:3000</code>.</p>`;
  }
});
