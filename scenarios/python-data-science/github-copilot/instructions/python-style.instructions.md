---
applyTo: '**/*.py'
---

# Python Style

## Formatting

- Follow PEP 8. Use `ruff` or `black` for auto-formatting; do not manually reformat code that a linter would fix.
- Maximum line length: 88 characters (black default).
- Use double quotes for strings.

## Type Hints

- Add type hints to all function signatures. Use `from __future__ import annotations` for forward references.
- Use `collections.abc` types (`Sequence`, `Mapping`, `Callable`) over `typing` equivalents when possible.
- Use `X | None` instead of `Optional[X]` (Python 3.10+).

```python
# Good
def load_data(path: str | Path, nrows: int | None = None) -> pd.DataFrame:
    ...

# Bad
def load_data(path, nrows=None):
    ...
```

## Docstrings

- Use NumPy-style docstrings for public functions and classes.
- Document parameters, return values, and raised exceptions.

```python
def compute_zscore(series: pd.Series, ddof: int = 1) -> pd.Series:
    """Compute the z-score of a series.

    Parameters
    ----------
    series : pd.Series
        Input data.
    ddof : int, optional
        Delta degrees of freedom, by default 1.

    Returns
    -------
    pd.Series
        Z-score normalized series.
    """
```

## Error Handling

- Never use bare `except:`. Always catch specific exceptions.
- Raise `ValueError` for invalid arguments, `RuntimeError` for unexpected state.
- Log errors with context before re-raising.

## Imports

- Group imports: stdlib → third-party → local, separated by blank lines.
- Never use wildcard imports (`from module import *`).
- Prefer explicit imports (`from pathlib import Path`) over module-level access (`import pathlib; pathlib.Path`).
