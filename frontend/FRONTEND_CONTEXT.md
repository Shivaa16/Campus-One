# Campus360 — Frontend Context & Continuity Guide

## 1. Project Name
**Campus360 — From Fragmented to Connected**  
A unified institutional campus request, approval, and tracking platform giving every campus request ONE secure, connected, and trackable path from submission to resolution.

---

## 2. Frontend Owner
- **Lead Developer**: Shiva Kumar
- **Module Scope**: `/frontend` ONLY

---

## 3. Current Git Branch
- **Branch**: `shiva/frontend`
- **Rule**: All frontend implementation remains strictly inside `/frontend`. Do not switch branches, merge into `main`, or alter non-frontend directories (`/backend`, `/database`, `/intelligence-engine`, `/analytics`).

---

## 4. Technology Stack
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`vite`, `@vitejs/plugin-react`)
- **Language**: JavaScript (ES Modules)
- **Routing**: React Router DOM v7 (`react-router-dom`)
- **Theme & Styling**: Vanilla CSS Design Tokens (`src/styles/variables.css`, `src/styles/globals.css`) with ThemeContext and localStorage persistence (`c360_theme`)
- **Icons**: Lucide React (`lucide-react`)
- **Media**: Local MP4 video integration (`/assets/videos/Finalvedio.mp4`), static campus photography (`src/assets/hero.png` / `/assets/images/campus-hero.png`)
- **State & Services**: Custom Hooks (`useTheme`, `useAuth`) + Decoupled Service Layer (`requestService`, `authService`, `apiClient`)

---

## 5. Directory Architecture
```
frontend/
├── public/
│   └── assets/
│       ├── images/
│       │   └── campus-hero.png       # Static Garden City University campus photo
│       └── videos/
│           └── Finalvedio.mp4        # Cinematic local campus video footage
├── src/
│   ├── assets/
│   │   └── hero.png                  # Static Garden City University campus asset
│   ├── components/
│   │   ├── common/                   # Universal UI components
│   │   │   ├── Button.jsx & Button.css
│   │   │   ├── Card.jsx & Card.css
│   │   │   ├── StatusBadge.jsx & StatusBadge.css
│   │   │   └── RoutePlaceholder.jsx & RoutePlaceholder.css
│   │   ├── dashboard/                # Reusable Dashboard components
│   │   │   ├── DashboardHero.jsx & DashboardHero.css # Welcome hero with static campus background
│   │   │   ├── MetricCard.jsx & MetricCard.css
│   │   │   ├── AttentionCard.jsx & AttentionCard.css
│   │   │   ├── RecentRequestsTable.jsx & RecentRequestsTable.css
│   │   │   ├── ApprovalProgressWidget.jsx & ApprovalProgressWidget.css
│   │   │   └── QuickRequestLaunchpad.jsx & QuickRequestLaunchpad.css
│   │   ├── layout/                   # Application shell & navigation
│   │   │   ├── AppShell.jsx & AppShell.css
│   │   │   ├── Sidebar.jsx & Sidebar.css
│   │   └── TopBar.jsx & TopBar.css
│   │   └── theme/
│   │       ├── ThemeToggle.jsx & ThemeToggle.css
│   ├── context/
│   │   └── ThemeContext.jsx          # Theme state provider (Light/Dark)
│   ├── data/
│   │   └── mockData.js               # Mock data aligned with reference screenshot
│   ├── hooks/
│   │   ├── useAuth.js                # Auth & user profile hook
│   │   └── useTheme.js               # Theme context hook
│   ├── layouts/
│   │   ├── AuthLayout.jsx & AuthLayout.css
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx & LoginPage.css # Fullscreen cinematic video + centered floating auth card
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx & StudentDashboard.css # Completed Phase 2B & 2C.1 dashboard
│   │   │   ├── NewRequestPage.jsx
│   │   │   ├── RequestListPage.jsx
│   │   │   ├── RequestDetailPage.jsx
│   │   │   ├── RecordsPage.jsx
│   │   │   └── AuxiliaryPages.jsx   # Documents, Notifications, Help
│   │   ├── faculty/
│   │   │   └── FacultyDashboard.jsx
│   │   ├── hod/
│   │   │   └── HodDashboard.jsx
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── api.js                    # Base HTTP client with JWT interceptor support
│   │   ├── authService.js            # Authentication service abstraction
│   │   └── requestService.js         # Request CRUD & workflow service
│   ├── styles/
│   │   ├── variables.css             # Light & Dark theme tokens with directional hero overlay
│   │   └── globals.css               # Typography hierarchy & resets
│   ├── utils/
│   │   ├── constants.js              # Roles, stages, categories & nav definitions
│   │   └── formatters.js             # Date and status label formatters
│   ├── App.jsx                       # Main React router
│   └── main.jsx                      # App root mount
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── FRONTEND_CONTEXT.md               # Continuity guide
```

---

## 6. Implemented Routes

| Route | View Component | Status | Description |
|---|---|---|---|
| `/` | `Navigate to /login` | Operational | Default entry redirect |
| `/login` | `LoginPage` | **Phase 2C Final Complete** | Fullscreen cinematic video with centered floating translucent card & theme toggle |
| `/student/dashboard` | `StudentDashboard` | **Phase 2B & 2C.1 Complete** | Full operational Student Dashboard with static campus hero image |
| `/student/requests` | `RequestListPage` | Operational | Filterable request history |
| `/student/requests/new` | `NewRequestPage` | Operational | Request submission entry point |
| `/student/requests/:id` | `RequestDetailPage` | Operational | Universal Request ID timeline tracking |
| `/student/records` | `RecordsPage` | Operational | Archived official certificates, NOCs & transcripts |
| `/student/documents` | `DocumentsPage` | Operational | Institutional form templates & guidelines |
| `/student/notifications` | `NotificationsPage` | Operational | Request status change alerts |
| `/student/help` | `HelpPage` | Operational | Routing & support desk |
| `/faculty/dashboard` | `FacultyDashboard` | Operational | Faculty verification queue placeholder |
| `/hod/dashboard` | `HodDashboard` | Operational | HOD clearance queue placeholder |
| `/admin/dashboard` | `AdminDashboard` | Operational | Registrar & clearance queue placeholder |
| `*` | `NotFoundPage` | Operational | 404 handler |

---

## 7. Completed Work

### Phase 2B: Design System & Student Dashboard
- Implemented institutional design tokens, Light/Dark theme toggle with `localStorage` persistence.
- Completed full 2-column Student Dashboard (`DashboardHero`, `MetricCard`, `AttentionCard`, `RecentRequestsTable`, `ApprovalProgressWidget`, `QuickRequestLaunchpad`).

### Phase 2C Final: Full-Screen Cinematic Login Experience & Cardless Minimal Refinement
- **Full-Screen Background Video Composition**: The campus video (`/assets/videos/Finalvedio.mp4`) covers 100% of the viewport seamlessly with `autoPlay`, `muted`, `loop`, `playsInline`, and `object-fit: cover`.
- **Atmospheric Navy Overlay**: Layered radial/vignette gradient ensures the campus architecture is visibly recognizable while providing high contrast for text.
- **Top Minimal Header**: Clean unobtrusive header with Garden City University indicator and top-right `ThemeToggle` (Light/Dark mode) without redundant duplicate branding.
- **Cardless Floating Authentication Controls**:
  - The login card/panel background, border, shadow, and heavy container blur are completely removed.
  - Transparent **CampusOne Logo** (`campusone-logo.svg`) sits prominently and centered above the fields.
  - Subtly translucent inputs (`background: rgba(5, 15, 35, 0.40)`, `border: 1px solid rgba(255, 255, 255, 0.25)`, white text, `#38BDF8` focus glow) ensure high usability over moving video frames.
  - Signature solid blue `Sign In →` CTA button (`#2563EB` to `#1D4ED8`) remains prominent.
- **Problem-Statement Value Indicators**: Positioned gracefully below the floating form without a card wrapper:
  - *Every request. One path. Full visibility.*
  - Three compact chips: `✓ Track every request`, `✓ Know every approval`, `✓ Access every record`.
- **Dashboard Campus Identity**: Enhanced `DashboardHero` with static Garden City University photography (`src/assets/hero.png`) and directional overlay gradient (crisp text on left, visible campus on right).

---

### Phase 3: Student Request Submission & Tracking Workflow (COMPLETED)
- **New Request Submission Experience (`/student/new-request` & `/student/requests/new`)**:
  - Full multi-category request application form (Hackathon Permission, Internship Permission, Leave Request, Bonafide Certificate, Reimbursement, Attendance Correction, Other).
  - Pre-fillable via URL parameters (`?type=...` from Quick Launchpad).
  - Draft persistence (`Save Draft` / localStorage).
  - Integrated Drag & Drop `DocumentUpload` UI with client-side file format/size integrity checks.
  - Transparent notification: *"Campus360 automatically routes your request to the appropriate campus authority."*
- **Deterministic Smart Routing Preview (`RoutingPreview.jsx` & `routingRules.js`)**:
  - Real-time rule-based visual preview of the approval journey for the chosen category (e.g. Student -> Faculty Advisor -> HOD -> Administration).
  - Isolated modular architecture ready for Samarth's AI/Intelligence Engine drop-in replacement.
- **Universal Request ID Engine**:
  - Deterministic generation format `C360-2026-XXXX` (e.g. `C360-2026-01428`) generated ON submission and stored persistently in `localStorage` (`c360_requests`).
- **Submission Confirmation Modal (`SubmissionSuccessModal.jsx`)**:
  - Modal with animated success check, copyable Universal Request ID, submitted metadata, expected SLA benchmark, and direct links to Track Request, My Requests, and Dashboard.
- **My Requests Ledger (`/student/requests`)**:
  - Filter tabs (`All`, `Needs Action`, `In Progress`, `Completed`) with dynamic counts.
  - Multi-attribute search (ID, title, category, stage).
  - Comprehensive request ledger with clickable Universal IDs and next step actions.
- **Request Details & Governance Timeline (`/student/requests/:id`)**:
  - Full request dossier header, particulars, statement of purpose, and attached documents.
  - **`ApprovalTimeline`**: Multi-stage authority clearance track with distinct visual indicator for the active/current stage.
  - **`RequestActivity`**: Chronological zero-loss audit log directly solving the paper/spreadsheet black-hole problem.
  - **`SLAIndicator`**: Target resolution window and status tracking (On Track).
  - **Action Required Resolution**: Interactive file upload modal to submit requested documents and resume review seamlessly.
- **Live State & Persistence Strategy**:
  - `requestService.js` stores requests in browser `localStorage` (`c360_requests`), pre-seeded with realistic institutional mock requests.
  - Newly submitted requests immediately propagate to `RecentRequestsTable`, `My Requests`, and metric cards without reloads.

### Phase 5: Smart Routing & Admin Analytics (COMPLETED)
- **Smart Routing Presentation (`RoutingPreview.jsx` & `routingRules.js`)**:
  - Compact institutional **SMART ROUTE** display on New Request page.
  - Presents:
    - **Detected Category**: e.g., `Hackathon Permission`
    - **Recommended Path**: `Faculty Advisor → HOD → Administration`
    - **Required Documents**: `Event Invitation / Shortlisted Team Details`
    - **Estimated Resolution**: `Within 48 hours`
  - **Rule-Based vs AI Contract**: Operates on institutional rule logic with badge `Rule-Based Routing`. When Samarth's intelligence engine connects with `{ category, route, requiredDocuments, estimatedResolution, confidence }`, confidence score is cleanly surfaced without displaying fake scores.
- **Admin Analytics Dashboard (`AdminAnalytics.jsx` & `AuthorityDashboard.jsx`)**:
  - Automatically rendered on `/admin/dashboard` above the clearance queue.
  - **5 Key Performance Indicators (KPIs)**:
    1. `Total Requests`: Total count of active & historical dossiers
    2. `Open Requests`: Active requests in clearance pipeline (`IN_REVIEW`, `PENDING`, `PENDING_ACTION`)
    3. `Completed Requests`: Officially certified & issued requests (`COMPLETED`)
    4. `Overdue Requests`: Requests requiring escalation
    5. `Average Resolution Time`: Average turnaround time (`18h 24m`)
  - **2 Pure CSS Visualizations (No Heavy Dependencies)**:
    1. `Requests by Category`: Proportional horizontal bars with request counts and percentage share across categories.
    2. `Requests by Status`: Segmented multi-color distribution bar and state breakdown cards (`In Review`, `Action Required`, `Completed`, `Rejected`).
  - **Workflow Bottleneck Telemetry**:
    - Highlights stage with largest pending queue (e.g. `HOD Approval` • `X requests awaiting review`)
    - Displays average wait telemetry (`14h`) and throughput pace (`Active Clearance Queue` / `Optimal Velocity`).
  - **Recent System Activity Stream**:
    - Live feed summarizing recent stage endorsements and certifications directly from shared request records.
- **API Readiness**:
  - `requestService.getAdminAnalytics()` method checks for `GET /admin/analytics` when backend is enabled, falling back cleanly to real-time client derivations.
- **Production Build**: Verified with `npm run build` (0 errors).

---

### Phase 6: Final Integration, QA, Demo Hardening & Release Check (COMPLETED)
- **Brand Consistency**:
  - Visible primary product branding strictly unified to `CampusOne` across headers, sidebars, forms, indicators, and page titles.
  - Internal technical identifiers (`C360-2026-XXXX` universal request IDs, `c360_*` storage keys/classes) safely preserved to avoid breaking integrations or data persistence.
- **Unsupported Claims Removed / Sanitized**:
  - Replaced speculative cryptographic / blockchain / AI claims with clear, accurate institutional language:
    - "cryptographic timestamps / seals" -> "Recorded approval activity & timestamps"
    - "immutable audit ledger" -> "Recorded request decision history"
    - "cannot be retracted once signed" -> "Recorded with official faculty credentials"
    - "AI routing" -> "Smart Rule-Based Routing" (with clean dynamic contract for Intelligence Engine payload).
- **Full Approval Lifecycle Verification**:
  - Validated end-to-end multi-tier approval workflow on identical Request ID (`C360-2026-XXXX`):
    - `STUDENT (Submit)` -> `FACULTY (Approve: currentStage -> HOD)` -> `HOD (Approve: currentStage -> ADMIN)` -> `ADMIN (Approve: status -> COMPLETED, currentStage -> COMPLETED)`.
    - Student view reflects complete 5-node timeline with all completed checks (✓) and timestamped activity history entries.
- **Action States**:
  - `Request Changes`: Produces `ACTION_REQUIRED` (`PENDING_ACTION`), captures authority comment, and displays student document resolution upload modal.
  - `Reject`: Produces `REJECTED`, records rejection reason, and preserves full history.
- **Demo Role Mechanism**:
  - Header role selector clearly marked with `DEMO ROLE` badge.
  - Preserves underlying shared request store (`c360_requests`) across role switches (`Student`, `Faculty`, `HOD`, `Admin`).
- **Responsive & Theme QA**:
  - Clean layout rendering across desktop, tablet, and mobile with zero horizontal scroll overflow.
  - Light and Dark modes fully functional with high contrast and readable text on moving video login.
- **Backend & Intelligence Integration Readiness**:
  - Backend endpoints mapped: `POST /requests`, `GET /requests/:id`, `GET /students/:id/requests`, `PATCH /requests/:id/status`, `POST /requests/:id/approve`, `POST /requests/:id/reject`, `GET /admin/analytics`.
  - Intelligence contract ready for `{ category, route, requiredDocuments, estimatedResolution, confidence }`.
- **Production Build**: Verified with `npm run build` (0 errors, clean asset bundling).

---

## 8. Current Status
- **PHASE 6 — FINAL FRONTEND QA COMPLETE**: Application is fully hardened, tested, and ready for Hackathon Demonstration.

---

## 9. Next Steps (Hackathon Demo & Teammate Handshake)
1. Real-time REST API pairing with Backend services (Kushma).
2. Live intelligence payload ingestion from Intelligence Engine (Samarth).

---

## 10. Important Architectural & Design Decisions
1. **Single Source of Truth**: All roles and analytics share the exact same `c360_requests` store in `localStorage`.
2. **Deterministic Stage Progression**: Request timelines and activity logs are updated synchronously on authority endorsement.
3. **Modular Authority Components**: Reusable `AuthorityDashboard.jsx` seamlessly embeds `AdminAnalytics.jsx` when role is `ADMIN`.
4. **Lightweight Pure CSS Visualizations**: Zero external charting libraries added, ensuring maximum performance and zero bundle bloat.

---

## 11. Backend & Intelligence Integration Points
- **Backend APIs**:
  - `GET /admin/analytics` -> `requestService.getAdminAnalytics()`
  - `POST /requests` -> `requestService.createRequest(formData)`
  - `GET /requests/:id` -> `requestService.getRequestById(id)`
  - `POST /requests/:id/approve` -> `requestService.advanceRequestStage(id, { action: 'APPROVE' })`
  - `POST /requests/:id/reject` -> `requestService.advanceRequestStage(id, { action: 'REJECT' })`
  - `PATCH /requests/:id/status` -> `requestService.advanceRequestStage(id, { action: 'REQUEST_CHANGES' })`
- **Intelligence Engine**:
  - `determineRouting(category, aiPayload)` in `src/services/routingRules.js` accepts `{ category, route, requiredDocuments, estimatedResolution, confidence }`.

---

## 12. Known Limitations
- Demo role switcher operates in mock state for local multi-user demonstration prior to centralized JWT auth service.
