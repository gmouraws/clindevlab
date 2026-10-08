# Design system specification

Original design direction, 2026-10-08. No external UI or employer design was copied. Intent: a readable technical reference, with a restrained typographic identity.

## Independent visual identity — mandatory

ClinDevLab must have its own identity combining clinical science, structured data and software engineering. Do not reuse Blueprint's blueprint/grid aesthetic, layouts, typography, color system, components, animations or branding. Do not access Blueprint's repository, infrastructure or assets to implement or evaluate this requirement. No comparative visual inspection of Blueprint has been performed or is required: establish independence through original design decisions and asset provenance.

Direction: an editorial scientific field guide with precisely labeled data exhibits. Use warm neutral surfaces, restrained teal for actions, serif display headings, monospace identifiers and plain-language annotations. Repeated motifs are a labeled observation, a source note and an input-to-row explanation. They convey scientific context through content and composition. No blueprint backgrounds, drafting grids, coordinate decorations, hospital dashboard chrome, patient cards, medical-cross branding or decorative clinical charts. Ordinary CSS layout grids and actual data tables remain appropriate; a blueprint-style decorative grid does not.

Compose the landing page as an original learning introduction followed by one annotated synthetic observation and entry points into the curriculum. Explorer pages emphasize a domain summary, selected-variable exhibit and source context. Example pages follow collection → representation → limitation. Avoid a generic documentation starter's unchanged hero, card wall and sidebar composition. A sidebar is a functional navigation option, not the product's visual identity. Do not install or reskin a branded documentation theme as the finished design.

Record the rationale for typography, palette, page composition and any original marks in the implementation report. Use text branding for V1; no new external logo dependency is required. Review ClinDevLab's own representative screens for coherence and originality at AC-16.

## Typography and color

Use system sans-serif (`system-ui`, Segoe UI, sans-serif) for prose, system serif (`Georgia`, Cambria, serif) for page/section headings, and system monospace (`ui-monospace`, Consolas, monospace) for identifiers and samples. This combination is an independently selected typographic hierarchy, not inherited from Blueprint. No remote font request or font-license dependency. Base 16px/1.65; article body 18px on wide screens; metadata 14px minimum; h1 30px/1.2 mobile and 40px desktop; h2 26px; h3 20px. Body measure 68ch maximum. Never use uppercase paragraph text or shrink data text to fit a viewport.

Light mode only in V1. Independently selected tokens: page `#FAF9F6`, exhibit surface `#FFFFFF`, subtle surface `#F0EFEB`, main text `#242A29`, secondary text `#535E5B`, accent/link `#17645B`, decorative border `#D4D8D2`, control boundary `#66736D`, focus `#753D70`, warning text `#92400E` on `#FFFBEB`, error text `#991B1B` on `#FEF2F2`. Do not use the decorative border as the sole boundary of an input. All token pairings must be measured in implementation; these are proposed colors, not a completed contrast audit. Underline prose links. Required contrast: 4.5:1 normal text, 3:1 large text and essential control/focus indicators.

## Geometry and layout

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px. Primary touch controls must have at least a 44×44 CSS px target; inline prose links retain normal text layout. Radii: 6px controls, 8px panels; no decorative shadows or gradients. Header minimum 64px with wrapping allowed, section navigation 224px when present, optional contents rail 192px, centered outer maximum 1600px. Article measure remains 68ch even on a large desktop; data exhibits can use the wider main region.

Layout bands are content-driven contracts: below 768px, one column with disclosed section navigation; 768–1199px, tablet layout with a compact navigation disclosure and full-width data workspace; 1200–1599px, optional persistent section navigation alongside the main region; at ≥1600px an optional contents rail may join them. Contents links move into an in-page disclosure whenever the rail is absent. Use 16px page padding on phones, 24px on tablets, 32px on larger displays, with 12px permitted at 320px for reflow. No mandatory content disappears at a breakpoint. Test intermediate widths and both tablet orientations, not only these thresholds.

## Responsive component contracts

- **SDTM variable tables:** keep every column available in a semantic table inside a labeled, keyboard-focusable local scroll region. Provide a visible scroll cue only when it overflows. Keep identifiers easy to associate with rows; a sticky identifier column is optional only if it does not obscure cells at 320px. Also provide an explicit “Read as records” control that exposes the same rows as labeled field/value groups. This is a required V1 reading mode, not a new dataset or a simplified mobile subset. Default to the table; mode changes preserve row order and current selection, and never alter downloads.
- **Synthetic datasets:** use the same table/record-reading component, including all values, missing-value indications and row identity. On narrow screens stack input, output and mapping explanations vertically in their logical order. On wide screens a side-by-side presentation is allowed. All three examples remain fully inspectable without downloading a file.
- **Variable metadata:** use a definition list that stacks labels above values on phones. Wrap long descriptions and source URLs; preserve full codes, versions, provenance and unavailable-field notices. No ellipsis or hover-only mechanism as the sole way to read a value.
- **Search/filters:** full-width input on phones, visibly labeled controls stacked below it, result count and active filters adjacent in document order. Controls can share rows as space permits. Do not move filters into an inaccessible drawer or require horizontal toolbar scrolling. Long result titles wrap. The input remains reachable when the on-screen keyboard is open; no fixed footer overlays results.
- **Navigation:** preserve every destination through an accessible disclosure on smaller displays. Menus must scroll within short landscape viewports, support touch/keyboard dismissal, and return focus to their trigger. Avoid hover-only submenus. Breadcrumbs wrap rather than drop context.
- **Code/JSON/CSV previews:** retain whitespace in a local scroll region and provide a wrap-lines toggle for reading. Soft wrapping must not alter copied/downloaded bytes. Place copy, wrap and download controls above the preview with labels and sufficient touch spacing. Keep source-to-output explanations in normal flowing text.
- **Versions and sources:** badges and attribution wrap into multiple lines. These are essential context, never hidden to save width. All reading modes include them.

Local horizontal scrolling is acceptable for inherently two-dimensional content, but is not the entire mobile solution. Record reading, stacked metadata, wrapped text and reachable controls are required. Do not hide columns, truncate essential information, shrink fonts or rely on desktop-only tooltips to claim responsiveness.

## Components

- **Header/nav:** text wordmark ClinDevLab, plain section links and Search link. Mark current section with text weight and an underline, not color alone. Sticky positioning must not obscure keyboard focus or anchor headings; use scroll margin.
- **Sidebar:** nested section list with active-page semantics. Learning path has explicit order; reference list uses stable code sorting. No infinite nested tree.
- **Version strip:** label Model 2.0, IG 3.4, Content 1.0.0 independently. CT badge appears only when approved data is actually bundled. “Curated educational coverage” is visible on explorer pages.
- **Domain cards:** code in monospace, authored title, class text and short summary. One accessible link per card; no nested click targets. Card view for six domains, optional compact list unnecessary in V1.
- **Variable table:** semantic table with caption, column headers and individual variable links. Default columns: identifier, teaching explanation, example JSON type, example value. Do not relabel the last two as official SDTM metadata. Source and normative-unavailable information sits above/below rather than forty-four repeated empty columns.
- **Metadata detail:** definition list for compact properties; unavailable fields explicitly distinguished from null sample values. A sources section provides provenance and publisher links.
- **Search:** full page with normal labeled search input and native selects; no modal command palette required. Results are a list of links with context and summary. Announce updated result count using a polite live region; preserve focus in input. Clear resets filters and text.
- **Examples:** tabs may switch JSON/CSV previews only if ARIA tab keyboard behavior is implemented; simpler labeled sections are acceptable. Copy is a button with announced success/failure. Download names include example and content version. Syntax highlighting is build-time and cannot depend on color alone.
- **Callouts:** three labeled types—Educational simplification, Source/version, Limitation. Never style an educational warning as an official regulatory alert.
- **Table/code overflow:** follow the responsive contracts above, including record reading and optional line wrapping. Only the labeled container scrolls horizontally; keyboard access and visible scroll affordance. Do not hide fields on mobile. No fixed-height scroll region for ordinary prose.

## States and accessibility

Each interactive control has default, hover, focus-visible, active and disabled behavior. Focus ring 2px with 2px offset, clearly contrasting with adjacent surfaces. Menu opens with a button exposing expanded state; Escape closes it and restores trigger focus. Native links activate with Enter; no clickable divs. Respect reduced motion; animation is not necessary for V1. Error messages explain recovery in plain language.

Test 200% text zoom and 400% browser zoom, keyboard-only operation, long variable identifiers, and the full phone/tablet/laptop/desktop matrix in AC-17. Tables retain their semantics under overflow and record mode preserves field labels. Source notices remain readable and must not be hidden in tooltips. Accessibility baseline: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), accessed 2026-10-08.
