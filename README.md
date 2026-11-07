# Altiora Group: website institucional

Página única em HTML, CSS e JavaScript simples. Sem dependências, sem passo de compilação.

## Executar localmente

```
python3 -m http.server 8080
```

Abra http://localhost:8080. Também funciona abrindo `index.html` diretamente no navegador.

## Estrutura

| Ficheiro | Função |
|---|---|
| `index.html` | Conteúdo e SEO: início, serviços, projetos, sobre nós e contactos |
| `css/styles.css` | Estilos. As cores e medidas base estão no topo (`:root`) |
| `css/nojs.css` | Ajustes quando o JavaScript está desativado |
| `js/main.js` | Menu móvel, separadores de serviços e mensagem preparada nos botões |
| `assets/img/` | Logótipos (WebP) e ícones do site |
| `assets/fonts/` | Poppins (WOFF), alojada no próprio site |

## Contactos

Não há formulário. Os contactos (telefone e WhatsApp, e-mail e Instagram) estão na secção `#contactos` do `index.html` e nos dados estruturados do `<head>`. Para os alterar, edite essas duas zonas.

Os botões "Solicitar proposta" e "Conhecer o projeto" levam aos contactos e deixam a mensagem já escrita no WhatsApp e no e-mail (atributos `data-ask` e `data-topic`).

Quando um projeto tiver site próprio, troque o `href="#contactos"` do botão por esse endereço e acrescente `target="_blank" rel="noopener noreferrer"`.

O WhatsApp usa o mesmo número do telefone (+244 938 575 755). Confirme que o número tem WhatsApp.

## Antes de publicar

- Quando existir domínio, acrescentar `canonical`, `og:url`, `og:image` e `sitemap.xml`.
- A `Content-Security-Policy` do `<head>` só permite recursos do próprio site. Se acrescentar serviços externos (mapas, estatísticas), ajuste-a.
- Os textos de Valores e Como trabalhamos são uma proposta para rever. As funcionalidades dos projetos vêm das descrições fornecidas.
- Os logótipos foram gerados a partir do ficheiro original. Para substituir o ícone de cada projeto por um logótipo próprio, troque o `<svg>` dentro de `.proj-art`.

## Créditos

Poppins © The Poppins Project Authors, licença SIL Open Font License 1.1 (https://openfontlicense.org).
Ícones SVG com traçado simples, no estilo Lucide/Feather.
