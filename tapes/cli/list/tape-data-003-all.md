---
title: List all packages
url: all.webm
---

You can list all packages available in the registry with:

```bash
zana list --all
```

or the shorter alias:

```bash
zana ls -A
```

You can optionally filter the list:

```bash
zana list --all mistweaverco
```

or filter even more:

```bash
zana list --all --only-categories tree-sitter-parser --only-providers github http
```

This shows all Tree-sitter parsers available from GitHub
that match the search term "http."
