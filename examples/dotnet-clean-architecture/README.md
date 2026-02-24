# Example: .NET Clean Architecture Workflow

A walkthrough of using the `dotnet-clean-architecture` scenario to build a feature in a .NET project following Clean Architecture, DDD, and TDD.

## Context

**Goal:** Add an `Order` aggregate to an existing .NET solution, document the key design decision with an ADR, and get an architecture review before merging.

**Tools installed via:**
```bash
prompt-library add dotnet-clean-architecture
```

This installs:
- **Sharp** agent — expert .NET guidance (`.claude/agents/sharp.md` / `.github/agents/sharp.md`)
- **Archy** agent — architecture and planning (`.claude/agents/archy.md` / `.github/agents/archy.md`)
- **ADR prompt** — architectural decision record (`.claude/commands/adr.md` / `.github/prompts/adr.prompt.md`)
- **GitHub Copilot instructions** — Clean Architecture, DDD, coding style, testing rules

---

## Step 1: Plan the Feature with Archy

Before writing code, use **Archy** to think through the design.

**Prompt:**
> Using Archy: I need to add an Order aggregate to our e-commerce domain. Orders have line items, a shipping address, and go through statuses: Draft → Confirmed → Shipped → Delivered. What should live in the Domain layer vs Application layer, and what commands/queries should I create?

**What Archy produced:**
- Domain layer: `Order` aggregate root, `OrderLineItem` value object, `ShippingAddress` value object, `OrderStatus` enum, `OrderId` strongly-typed ID
- Application layer: `CreateOrderCommand`, `ConfirmOrderCommand`, `GetOrderByIdQuery`, `IOrderRepository` interface
- Identified that shipping address validation belongs in the domain, not application
- Flagged that `Order` should raise a domain event (`OrderConfirmed`) when confirmed

---

## Step 2: Document the Decision with an ADR

A key decision came up: should `OrderLineItem` be an entity (with its own ID) or a value object?

**Prompt (Claude Code):**
> /adr Should OrderLineItem be a value object or an entity in the Order aggregate?

**Prompt (GitHub Copilot):**
> Use the ADR prompt: Should OrderLineItem be a value object or an entity in the Order aggregate?

**ADR produced** (`docs/adr/0004-order-line-item-as-value-object.md`):

```markdown
# 0004 — OrderLineItem as Value Object

## Status
Accepted

## Context
OrderLineItems represent a snapshot of a product at the time of purchase
(price, quantity, product name). They have no independent lifecycle —
they only exist as part of an Order.

## Decision
Model OrderLineItem as a value object, not an entity. It is identified
by its content (product ID + quantity + unit price), not by a separate ID.
Equality is structural.

## Consequences
- Simpler persistence: line items stored as owned entities in EF Core
- Cannot update a line item independently — must replace the collection
- Enforces immutability: once an order is confirmed, line items are frozen
```

---

## Step 3: Implement with Sharp

With the design documented, use **Sharp** to implement the domain objects.

**Prompt:**
> Using Sharp: Implement the Order aggregate root following Clean Architecture and DDD. It should: hold a list of OrderLineItem value objects, enforce that line items cannot be added after confirmation, raise an OrderConfirmed domain event on confirmation, and use a strongly-typed OrderId. Follow our coding style and object calisthenics rules.

**Key output Sharp produced:**

```csharp
// Domain/Order/OrderId.cs
public record OrderId(Guid Value)
{
    public static OrderId New() => new(Guid.NewGuid());
    public static OrderId From(Guid value) => new(value);
    public override string ToString() => Value.ToString();
}

// Domain/Order/Order.cs
public sealed class Order : AggregateRoot<OrderId>
{
    private readonly List<OrderLineItem> _lineItems = [];

    public CustomerId CustomerId { get; }
    public ShippingAddress ShippingAddress { get; }
    public OrderStatus Status { get; private set; }
    public IReadOnlyList<OrderLineItem> LineItems => _lineItems.AsReadOnly();

    private Order() { } // EF Core

    private Order(OrderId id, CustomerId customerId, ShippingAddress shippingAddress)
        : base(id)
    {
        CustomerId = customerId;
        ShippingAddress = shippingAddress;
        Status = OrderStatus.Draft;
    }

    public static Order Create(CustomerId customerId, ShippingAddress shippingAddress)
    {
        ArgumentNullException.ThrowIfNull(customerId);
        ArgumentNullException.ThrowIfNull(shippingAddress);

        return new Order(OrderId.New(), customerId, shippingAddress);
    }

    public void AddLineItem(ProductId productId, string productName, Money unitPrice, int quantity)
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("Line items cannot be added after an order is confirmed.");

        _lineItems.Add(OrderLineItem.Create(productId, productName, unitPrice, quantity));
    }

    public void Confirm()
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("Only draft orders can be confirmed.");

        if (_lineItems.Count == 0)
            throw new DomainException("Cannot confirm an order with no line items.");

        Status = OrderStatus.Confirmed;
        RaiseDomainEvent(new OrderConfirmed(Id, CustomerId, DateTime.UtcNow));
    }
}
```

Sharp also generated:
- `OrderLineItem` value object with structural equality
- `OrderConfirmed` domain event record
- `IOrderRepository` interface in the Application layer
- Unit tests for `Order.Create`, `Order.AddLineItem`, and `Order.Confirm`

---

## Step 4: Architecture Review with Archy

Before raising a PR, use **Archy** to check for any issues.

**Prompt:**
> Using Archy: Review the Order aggregate implementation. Does it respect Clean Architecture dependency rules? Are there any DDD smells or object calisthenics violations?

**Findings Archy raised:**
1. `Order.Confirm()` was originally checking `DateTime.Now` directly — Archy flagged this as a hidden dependency and suggested injecting `TimeProvider` or passing `confirmedAt` as a parameter.
2. `ShippingAddress` was missing a domain validation rule for empty street lines — Archy suggested adding a guard in the value object constructor.
3. The `OrderConfirmed` event was initially a class — Archy recommended making it a `record` for immutability and structural equality.

All three issues were fixed before the PR was opened.

---

## Lessons Learned

**What worked well:**
- Using Archy first (before writing code) avoided a significant rework — the decision to keep `OrderLineItem` as a value object came out of the planning session, not a post-hoc refactor.
- The ADR prompt produced a complete, well-structured document with minimal editing. The "Consequences" section in particular prompted thinking about EF Core persistence that might otherwise have been discovered late.
- Sharp consistently applied project conventions (strongly-typed IDs, `AggregateRoot<TId>` base class, `RaiseDomainEvent`) without needing to be reminded each time.

**What to improve:**
- Sharp occasionally generated `public` setters on aggregate properties. Adding an explicit rule to the coding style instructions ("all aggregate properties must be private-set or init-only") would eliminate this.
- The ADR prompt doesn't auto-number the document. A short Claude Code command that finds the next ADR number and pre-fills it would save a manual step.
