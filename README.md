# QA Automation Assessment

UI and API automation solution built with **WebdriverIO, TypeScript, Node.js, Mocha, Chai, and Axios**.

## Tech Stack

- **WebdriverIO** - UI automation and browser interaction
- **Node.js / TypeScript** - Runtime and test implementation
- **Mocha** - Test structure and lifecycle
- **Chai** - Assertions
- **Axios** - API requests
- **Allure** - Test reporting

The solution uses all four technologies suggested in the assessment: **WebdriverIO, Node.js/JavaScript, Mocha, and Chai**, with **TypeScript** used for stronger typing and maintainability.

## Test Coverage

### UI - Cheapflights

**Positive Scenario**

- Verify Cheapflights logo and Sign-in are displayed
- Search for a **One-way** flight
- Select **Tokyo Narita → Manila**
- Dynamically select a departure date one month from execution
- Select **First Class**
- Verify flight results are returned
- Verify the selected **trip type, origin, destination, departure date, and cabin class** are retained
- Capture a screenshot of the validated results

**Negative Scenario**

- Attempt a flight search without a destination
- Verify the validation message: **`You didn't select an airport`**

### API - Restful Booker

The API suite covers the complete booking lifecycle:

AUTH
  ↓
CREATE
  ↓
GET - Verify Created Booking
  ↓
PUT Without Authentication
  ↓
GET - Verify Original Booking Is Unchanged
  ↓
PUT With Authentication
  ↓
GET - Verify Updated Booking
  ↓
DELETE
  ↓
GET - Verify 404

**Positive Coverage**

- Generate an authentication token
- Create a booking and validate all returned fields
- Retrieve and verify the created booking
- Update the booking using authentication
- Verify updated values were persisted
- Delete the booking
- Verify the deleted booking returns HTTP **`404`**

**Negative Coverage**

- Attempt to update a valid booking **without authentication**
- Verify the request is rejected
- Retrieve the booking afterward
- Verify the original booking data was **not modified**

The **`bookingId`** and authentication token are generated at runtime rather than hard-coded.

## Project Structure

```text
test/
├── ui/
│   ├── pages/
│   └── specs/
│
└── api/
    ├── data/
    ├── services/
    └── specs/
```

- UI tests use the **Page Object Model** to separate page interactions from test scenarios.
- API tests use a **service layer** to separate HTTP requests from assertions and test flow.
- API test data is maintained separately for readability and reuse.

## Key Implementation Decisions

- **Dynamic departure dates** avoid expired hard-coded test dates.
- Accessibility attributes such as **`aria-label`** and **`title`** are preferred for UI selectors.
- **Explicit WebdriverIO waits** are used instead of static delays.
- API tests create and manage their own booking data during execution.
- Assertions validate **business data** in addition to HTTP status codes.
- GET requests after **CREATE, UPDATE, and DELETE** verify the actual persisted resource state.
- Reusable helpers reduce duplicated API assertions and logging.

## Running the Tests

Install dependencies:

```bash
npm install
```

Run the configured test suite:

```bash
npm test
```

See **`package.json`** for the available test scripts.

## Reporting

**Allure** is configured for test reporting.

Tests also provide:

- Readable console logs
- API request/result information
- UI screenshots as execution evidence

## Possible Improvements

Given additional time:

- Add more API negative and boundary scenarios
- Add typed API request/response interfaces
- Move environment-specific values to configuration
- Improve API test isolation for parallel execution
- Add CI execution and cross-browser coverage

## Summary

The framework focuses on **readability, maintainability, meaningful assertions, positive and negative coverage, runtime test data, and clear separation of responsibilities** while using the technologies recommended in the assessment.