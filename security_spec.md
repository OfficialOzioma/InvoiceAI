# Security Specification for InvoiceAI

## Data Invariants
1. A User document can only be created with `onboardingStatus: 'in-progress'` and `currentOnboardingStep: 1`.
2. A Business document must have an `ownerId` matching the creator's UID.
3. Invoices must belong to a Business that the user owns.
4. Users cannot modify their `isVerified` status directly after initial creation (must go through server/otp).

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Theft**: Creating a business with `ownerId` set to another user's UID.
2. **Step Skipping**: Updating `currentOnboardingStep` from 1 directly to 5.
3. **Verification Bypass**: Manually setting `isVerified: true` via client SDK.
4. **Orphaned Invoice**: Creating an invoice for a business ID that the user does not own.
5. **PII Leak**: Authenticated user reading another user's email from `/users/{userId}`.
6. **Shadow Update**: Adding a `role: 'admin'` field to a user profile.
7. **Resource Poisoning**: Injecting 2MB of garbage text into the business address field.
8. **Invalid Currency**: Setting `currency: 'BITCOIN'` when only ISO codes are allowed.
9. **Negative Pricing**: Creating an invoice item with `price: -100`.
10. **Admin Escalation**: Trying to read `/admins/uid` to check for admin status if not authorized.
11. **Timestamp Spoofing**: Setting `createdAt` to a date in the past during creation.
12. **Status Shortcutting**: Moving an invoice from `draft` to `paid` without a valid payment reference.

## Test Runner (TDD)
(Simulated plan: All payloads above return PERMISSION_DENIED)
