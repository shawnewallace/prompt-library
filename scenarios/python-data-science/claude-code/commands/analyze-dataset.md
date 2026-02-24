# Analyze Dataset

Profile the dataset at `$ARGUMENTS` and produce a structured summary including:

1. **Shape** — row and column count
2. **Schema** — column names, dtypes, and whether each is numeric, categorical, or datetime
3. **Missing values** — count and percentage per column; flag any column with > 5% missing
4. **Numeric summary** — mean, median, std, min, max, and skewness for each numeric column
5. **Categorical summary** — cardinality and top-5 value counts for each categorical column
6. **Correlations** — top 5 strongest pairwise correlations among numeric columns
7. **Potential issues** — duplicate rows, constant columns, columns that look like IDs, extreme outliers (> 3 std from mean)
8. **Suggested next steps** — 2–3 concrete recommendations based on the findings

Output the summary as a markdown report. Use pandas for analysis. Do not modify the source file.
