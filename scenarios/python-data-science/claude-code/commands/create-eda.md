# Create EDA Notebook

Scaffold an exploratory data analysis (EDA) Jupyter notebook for the dataset at `$ARGUMENTS`.

The notebook should:

1. **Setup cell** — imports (pandas, numpy, matplotlib, seaborn), seed, display settings, and a `DATA_PATH` constant
2. **Load & inspect** — load the data, display shape, dtypes, and `head()`
3. **Missing values** — heatmap and per-column missing counts
4. **Distributions** — histograms for all numeric columns; bar charts for categoricals with ≤ 20 unique values
5. **Correlations** — heatmap of the correlation matrix for numeric columns
6. **Outlier detection** — box plots for numeric columns
7. **Key findings** — a markdown cell summarizing 3–5 observations from the above
8. **Next steps** — a markdown cell with suggested analyses or feature engineering ideas

Follow the conventions in `data-analysis.instructions.md`:
- Set random seed at the top
- Use method chaining for pandas operations
- Use `pathlib.Path` for the data path
- Include markdown cells explaining each section
- Keep the notebook runnable top-to-bottom with no side effects

Save the notebook as `notebooks/eda-<dataset-name>.ipynb`.
