---
applyTo: '**/*.cs'
---
# Rules for Unit and Integration Tests

This rule defines the best practices and tools to use for writing unit and integration tests in the backend project.

## Libraries and Tools
- **Test Framework**: Always use `xunit.v3` for unit and integration tests.
- **Mocks**: Use `FakeItEasy` to create mocks in unit tests.
- **Contract Tests or Advanced Mocks**: Use `Testcontainers` and `Microcks` to simulate SOAP or REST calls, or for contract tests.
- **Integration Tests**: Configure `Testcontainers` for databases or other external dependencies.

## General Steps
1. **Unit Tests**:
   - Write tests for each valid and invalid scenario.
   - Use `FakeItEasy` to mock dependencies.
   - Verify exceptions and expected results.

2. **Integration Tests**:
   - Set up a test environment with `Testcontainers`.
   - Simulate SOAP or REST calls with `Microcks` if necessary.
   - Validate the entire business flow.

3. **Performance Tests**:
   - Add tests to validate the performance of critical features.

## Unit Tests
- Located in `tests/[project].UnitTests/`.
- Test only the **Domain** and **Application** layers.
- Use `FakeItEasy` to mock dependencies.
- Do not interact with real databases or external services.
- Focus on business logic, use cases, and validation.
- Example folders: `UseCases/`, `Services/`.

## Test Organization Structure
- **Folder Naming**: Use `[ClassName]Tests` for test folders to avoid namespace collisions (e.g., `CategoriesTests/`, `EntryIdTests/`).
- **Class-per-Method Pattern**: For complex classes with many methods (both aggregates and value objects), organize tests using a folder-per-class approach:
  - Create a folder named `[ClassName]Tests/` (e.g., `CategoryTests/`, `CategoryIdTests/`)
  - Inside the folder, create separate test classes for each method under test (e.g., `CreateTests.cs`, `EqualsTests.cs`)
  - Each test class should focus on testing a single method and its various scenarios
- **Namespace Convention**: 
  - Main test folders: `MyTime.Application.Tests.[FeatureArea]Tests` (e.g., `MyTime.Application.Tests.CategoriesTests`)
  - Method-specific test classes: `MyTime.Application.Tests.[FeatureArea]Tests.[ClassName]Tests` (e.g., `MyTime.Application.Tests.CategoriesTests.CategoryIdTests`, `MyTime.Application.Tests.CategoriesTests.CategoryTests`)

### Example Structure:
```
tests/MyTime.Application.Tests/
├── CategoriesTests/                    # Feature area tests
│   ├── CategoryTests/                  # Folder for Category aggregate tests
│   │   ├── CreateTests.cs              # Tests for Category.Create method
│   │   ├── ChangeNameTests.cs          # Tests for Category.ChangeName method
│   │   ├── SetParentTests.cs           # Tests for Category.SetParent method
│   │   └── MarkAsDeletedTests.cs       # Tests for Category.MarkAsDeleted method
│   └── CategoryIdTests/                # Folder for CategoryId value object tests
│       ├── CreateTests.cs              # Tests for CategoryId.Create method
│       ├── EqualsTests.cs              # Tests for CategoryId.Equals method
│       ├── NewCategoryIdTests.cs       # Tests for CategoryId.NewCategoryId method
│       └── ToStringTests.cs            # Tests for CategoryId.ToString method
├── EntriesTests/                       # Feature area tests
│   ├── EntryTests/                     # Folder for Entry aggregate tests (follow same pattern)
│   └── EntryIdTests/                   # Folder for EntryId value object tests
│       ├── CreateTests.cs              # Tests for EntryId.Create method
│       └── NewEntryIdTests.cs          # Tests for EntryId.NewEntryId method
```

## Integration Tests
- Located in `tests/[project].IntegrationTests/`.
- Test the **Infrastructure** and **Api** layers, and the integration between layers.
- Use `Testcontainers` to set up real or simulated external dependencies (databases, APIs, etc.).
- Use `Microcks` for contract or advanced integration tests (SOAP, REST, events).
- Validate the entire business flow, including data persistence and external calls.
- Example folders: `Features/` (for API endpoint tests).

## Best Practices
- Always write tests before implementation (TDD).
- Document test cases in the corresponding files.
- Use explicit test names to describe their purpose.
- Do not use `arrange`, `act`, `assert` pattern in test names; instead, use descriptive names that indicate the scenario and expected outcome.
- **Test Organization**: Follow the folder-per-class and class-per-method pattern for complex classes with multiple methods.
- **Avoid Namespace Collisions**: Always suffix test folders with `Tests` (e.g., `CategoriesTests` not `Categories`).
- **Single Responsibility**: Each test class should focus on testing a single method or closely related functionality.
- **Clear Test Names**: Use descriptive method names that clearly indicate what is being tested and the expected outcome.

## Additional Rule: Continuous Test Execution

- After every significant change or addition, run `dotnet test` or `dotnet watch` to verify the current state of the project.
- This ensures that all tests pass and helps identify issues early in the development process.
- Document the results of the test runs in the corresponding task or user story.

## Updates
This rule must be updated if new tools or practices are adopted in the backend project.