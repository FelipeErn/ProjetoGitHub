# GitHub Explorer

Este projeto permite explorar perfis do GitHub, exibir seus repositórios e favoritos, além de oferecer funcionalidades de busca e exibição de detalhes dos repositórios.

## 🚀 Tecnologias Utilizadas

- **React** com **TypeScript**
- **Zustand** para gerenciamento de estado
- **React Query** para busca de dados
- **Tailwind CSS** para estilização
- **API do GitHub** para obter informações de repositórios e usuários

## 📂 Estrutura do Projeto

```
.github/               # Configurações e workflows do GitHub Actions
public/                # Arquivos estáticos
src/
  |-- assets/         # Imagens e ícones
  |-- components/     # Componentes reutilizáveis
  |-- store/          # Configuração do Zustand
  |-- App.tsx        # Componente principal
  |-- main.tsx       # Ponto de entrada do React
```

## 🛠️ Como Configurar e Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install  # ou yarn install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev  # ou yarn dev
   ```

## ✅ Funcionalidades

- 🔎 Busca de perfis do GitHub
- 📂 Listagem de repositórios e favoritos
- 🏷️ Filtro e ordenação de repositórios
- 📌 Opção de favoritar/desfavoritar repositórios

## 🎯 Desafios e Aprendizados

Durante o desenvolvimento deste projeto, enfrentei alguns desafios e aprendi bastante ao longo do processo:

- No início, não tinha experiência com **Zustand**, então precisei buscar vídeos e artigos para entender como utilizá-lo da melhor maneira.
- A estruturação do sistema foi um desafio, especialmente na **componentização**. Percebi, ao final do projeto, que poderia ter extraído mais partes do código para componentes reutilizáveis.
- Tive dificuldades na implementação do **componente de filtro**, o que me levou a pesquisar mais sobre o assunto para encontrar a melhor solução.
- Atualmente, tenho **5 meses de estudo em React**, e percebo que minha evolução tem sido constante. No entanto, ainda preciso aprimorar minha lógica e a qualidade do meu código.
- Meu objetivo é conseguir uma oportunidade como **Desenvolvedor Front-end Jr. na Magazord**, pois acredito que trabalhar na área proporcionará um aprendizado muito mais intenso e prático do que apenas estudar por conta própria.

## 🤝 Contribuição

1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`
4. Envie para o repositório: `git push origin minha-feature`
5. Abra um Pull Request 🚀

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.