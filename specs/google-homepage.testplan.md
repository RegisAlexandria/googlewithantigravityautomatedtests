# Google Homepage Test Plan

## Application Overview

Test plan for Google Search homepage (https://www.google.com). Covers core search flows, variants (image/voice), navigation, localization, accessibility, and error handling with happy-path and negative scenarios.

## Test Scenarios

### 1. Google Homepage - Core & Search Flows

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search - Happy Path

**File:** `tests/search/happy-path.spec.ts`

**Steps:**
  1. Assumptions: Fresh session, not signed in, homepage loaded at https://www.google.com.
  2. 1. Open the Google homepage.
  3. 2. Focus the search input (click into the search box).
  4. 3. Type a typical query, e.g., `playwright test`.
  5. 4. Press Enter or click the `Pesquisa Google` button.
  6. 5. Observe navigation to the search results page.

**Expected Results:**
  - The results page loads successfully.
  - The page title contains the query or shows search results for the query.
  - At least the first result is shown and clickable.

#### 1.2. Search - Empty Query

**File:** `tests/search/empty-query.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Ensure the search input is empty.
  3. 2. Click the `Pesquisa Google` button or press Enter.
  4. 3. Observe behavior (no input submitted).

**Expected Results:**
  - No navigation to results occurs, or page remains on homepage without errors.
  - If suggestions appear, suggestions are shown but no empty-query search is performed.

#### 1.3. Search - Long Query Boundary

**File:** `tests/search/long-query.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Type a very long query (e.g., 5000 characters) into the search box.
  3. 2. Submit via Enter.
  4. 3. Observe response and stability.

**Expected Results:**
  - The page accepts or safely truncates the query without crashing the client.
  - Either a results page is displayed or an informative error is shown; the browser should not hang.

#### 1.4. Search - "I'm Feeling Lucky" (Estou com sorte)

**File:** `tests/search/im-feeling-lucky.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Type a clear query with a known top result (e.g., `wikipedia`),
  3. 2. Click `Estou com sorte`.
  4. 3. Observe navigation target.

**Expected Results:**
  - Clicking `Estou com sorte` navigates directly to the top result page (or equivalent behavior).
  - Navigation occurs within a reasonable time and loads the expected destination.

#### 1.5. Search - Image Search & Upload

**File:** `tests/search/image-upload.spec.ts`

**Steps:**
  1. Assumptions: Fresh session, browser supports file upload or camera, homepage loaded.
  2. 1. Click `Pesquisa por imagem` or camera/upload button.
  3. 2. Confirm upload UI (file input or drag-and-drop) is visible.
  4. 3. Attempt to upload a small image (if environment permits).
  5. 4. Observe if image search runs and results (or error) appear.

**Expected Results:**
  - The image-search UI opens and a file input is present.
  - When an image is uploaded, either image-search results are shown or a clear message indicates why it couldn't run (permissions).

#### 1.6. Search - Voice Search UI

**File:** `tests/search/voice.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded; microphone permissions may vary by environment.
  2. 1. Click the `Pesquisar por voz` button.
  3. 2. Observe that a listening UI appears or a permission prompt appears.
  4. 3. If microphone access is granted in the environment, speak a simple query; otherwise, verify the app handles denied permission gracefully.

**Expected Results:**
  - If permission granted: voice input is captured and a search is triggered.
  - If permission denied or unavailable: a friendly message appears explaining microphone access is required or the feature is not available.

### 2. Navigation & Links

**Seed:** `tests/seed.spec.ts`

#### 2.1. Navigation - Sign In

**File:** `tests/navigation/sign-in.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Click `Fazer login` (Sign in).
  3. 2. Observe navigation to accounts.google.com or sign-in flow page.

**Expected Results:**
  - Navigation to sign-in page occurs and shows account login UI.
  - Link includes `accounts.google.com` and the flow begins without errors.

#### 2.2. Navigation - Google Apps Menu

**File:** `tests/navigation/google-apps.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Click the `Google Apps` button (grid icon).
  3. 2. Observe that the apps overlay/panel opens.
  4. 3. Verify at least several app icons/links are visible and clickable.

**Expected Results:**
  - Apps overlay opens and shows expected services (e.g., Maps, Drive, YouTube).
  - Clicking an app link navigates to the target service (may open a new tab).

#### 2.3. Footer Links - About / Privacy / Terms

**File:** `tests/navigation/footer-links.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Scroll, if needed, to footer and click `Sobre` (About).
  3. 2. Repeat for `Privacidade` and `Termos`.
  4. 3. Verify destination pages open correctly.

**Expected Results:**
  - Footer links open the expected external pages (URLs contain about.google.com, policies.google.com, etc.).
  - Pages load successfully without unexpected redirects or errors.

### 3. Localization & Settings

**Seed:** `tests/seed.spec.ts`

#### 3.1. Localization - Language Switch

**File:** `tests/localization/language-switch.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Click the `English` link near the bottom (or choose settings language).
  3. 2. Observe page reload or language change.
  4. 3. Confirm primary UI labels are in English (e.g., `Search` label, `I'm Feeling Lucky`).

**Expected Results:**
  - Page reloads with English labels and the UI reflects language selection.
  - Search behavior remains consistent after language change.

#### 3.2. Settings - Open Search Settings

**File:** `tests/localization/search-settings.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Click `Configurações` (Settings) in the footer.
  3. 2. Select `Search settings` (or the relevant settings entry).
  4. 3. Observe that the settings dialog or page opens and options are accessible.

**Expected Results:**
  - Settings UI opens and contains configurable options (e.g., SafeSearch, results per page).
  - Changes can be toggled and saved; a confirmation or persistent behavior is seen where applicable.

### 4. Accessibility & Resilience

**Seed:** `tests/seed.spec.ts`

#### 4.1. Accessibility - Keyboard Navigation & Submit

**File:** `tests/accessibility/keyboard.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded.
  2. 1. Use keyboard (Tab) to focus the search input.
  3. 2. Type a query and press Enter.
  4. 3. Observe navigation and focus behavior on results page.

**Expected Results:**
  - Search can be performed using keyboard-only controls.
  - Focus moves predictably and interactive elements are reachable by keyboard.

#### 4.2. Error Handling - Offline Search Attempt

**File:** `tests/errors/offline-search.spec.ts`

**Steps:**
  1. Assumptions: Fresh session and homepage loaded; test harness can simulate offline network conditions.
  2. 1. Put the browser into offline mode (network offline simulation).
  3. 2. Attempt to perform a search.
  4. 3. Observe the error behaviour/UI message.

**Expected Results:**
  - A clear network error or friendly offline message is presented; the app must not crash.
  - No unpredictable behavior; test should document the error text for verification.
