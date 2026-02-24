---
applyTo: '**/test_*.py,**/*_test.py'
---

# Testing

## Framework

- Use `pytest`. Do not use `unittest` unless integrating with existing `unittest`-based code.
- Place tests in a `tests/` directory mirroring the source structure.
- Name test files `test_<module>.py` and test functions `test_<behaviour>`.

## Structure

- One `assert` per test where practical — multiple asserts are fine for related properties of the same output.
- Use descriptive names that read like sentences: `test_zscore_returns_zero_mean_for_normal_data`.
- Group related tests in a class only when they share significant setup.

## Fixtures

- Use `pytest` fixtures for shared setup (data loading, temporary directories, mock objects).
- Scope fixtures appropriately: `function` (default), `module`, or `session` for expensive I/O.

```python
@pytest.fixture
def sample_df() -> pd.DataFrame:
    return pd.DataFrame({"value": [1.0, 2.0, 3.0, 4.0, 5.0]})
```

## Parametrize

- Use `@pytest.mark.parametrize` for testing the same logic with multiple inputs:

```python
@pytest.mark.parametrize("input,expected", [
    ([1, 2, 3], 2.0),
    ([0, 0, 0], 0.0),
])
def test_mean(input, expected):
    assert compute_mean(input) == expected
```

## Data

- Never depend on external files or network in unit tests — use fixtures or generated data.
- For integration tests that read files, use `tmp_path` fixture to write and read test data.
- Keep test datasets small (< 100 rows); test edge cases explicitly rather than hoping they appear in large samples.

## Coverage

- Target ≥ 80% line coverage for `src/` modules.
- Do not write tests purely to hit coverage numbers — test meaningful behaviour.
