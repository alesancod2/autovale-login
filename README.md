# Auto Vale Prevenções - Página de Login

## IMPORTANTE: Substituir Logos

Os arquivos de logo estão como placeholder. **Substitua pelos arquivos originais:**

1. `assets/logo-autovale.png` — Logo completa (com texto "AUTOVALE PREVENÇÕES")
2. `assets/icone-autovale.png` — Ícone (apenas o V entrelaçado)

### Como substituir:

```bash
# Copie seus arquivos originais para a pasta assets/
cp /caminho/logo-completa.png assets/logo-autovale.png
cp /caminho/icone-v.png assets/icone-autovale.png
```

> **NÃO** recrie, redesenhe, vetorize ou altere as imagens. Use EXATAMENTE os arquivos originais.

## Visualização

Abra `login-completo.html` no navegador (self-contained) ou use `index.html` com os arquivos CSS/JS.

## Design System

```css
:root {
    --primary-color: #2B3990;    /* Azul da marca */
    --secondary-color: #2DB550;  /* Verde da marca */
    --accent-color: #5DD97B;     /* Verde claro */
    --background-color: #FFFFFF;
    --text-color: #1A1A2E;
}
```

## Ajustes permitidos na logo

- Redimensionamento proporcional
- Largura/altura para adaptação ao layout
- Margens e padding
- Alinhamento e responsividade
- No painel escuro: `filter: brightness(0) invert(1)` para versão monocromática

## Ajustes PROIBIDOS na logo

- Alterar cores
- Recriar em SVG
- Aplicar efeitos de IA
- Modificar qualquer elemento gráfico da marca
