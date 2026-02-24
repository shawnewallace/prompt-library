---
applyTo: '**/*.py,**/*.ipynb'
---

# Data Analysis

## Reproducibility

- Always set random seeds before any stochastic operation:
  ```python
  import numpy as np
  import random
  SEED = 42
  np.random.seed(SEED)
  random.seed(SEED)
  ```
- Use `pathlib.Path` for all file paths — never hardcode OS-specific separators.
- Store raw data read-only; write derived data to a separate output directory.

## pandas

- Prefer method chaining over intermediate variables:
  ```python
  # Good
  result = (
      df
      .query("status == 'active'")
      .assign(revenue_per_user=lambda x: x.revenue / x.users)
      .groupby("region")["revenue_per_user"]
      .mean()
  )
  ```
- Never use `inplace=True` — it obscures data flow and prevents chaining.
- Use `.loc[]` and `.iloc[]` for explicit indexing; avoid chained indexing (`df[col][row]`).
- Specify `dtype` when reading CSVs with known schemas to avoid silent type coercion.
- Use `pd.NA` over `None` or `np.nan` for nullable integer/boolean columns.

## numpy

- Prefer vectorized operations over Python loops. If a loop seems necessary, check for a numpy equivalent first.
- Use explicit `axis=` arguments in aggregations — never rely on default axis behavior.
- Avoid in-place mutation of arrays that may be shared references.

## Visualization

- Always label axes and include a title.
- Save figures to files rather than relying on interactive display in production code.
- Use `tight_layout()` or `constrained_layout=True` to prevent label clipping.
- Prefer `seaborn` for statistical charts; use `matplotlib` directly for custom layouts.

## Notebooks

- One notebook = one analysis. Keep notebooks focused and short.
- Restart and run all cells before committing to ensure top-to-bottom reproducibility.
- Move reusable logic to `.py` modules; notebooks should call functions, not define them.
- Use markdown cells to explain the "why" between code cells.
