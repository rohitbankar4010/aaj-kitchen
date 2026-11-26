# aaj. — Product Quality Release (26 November 2026)

This release focuses on **feasible dinner decisions**, not more decoration.

## What changed

1. **Freshness of kitchen memory:** Anything confirmed *today* expires back to "remembered" when the local day changes. It is not marked absent, and all your other pantry selections remain unchanged. Legacy confirmations with no date are treated as unverified.
2. **My Masala Box:** An illustrated row of everyday spices in My Kitchen. Tap to mark *Confirmed today*, tap again to mark *Out*. Other masalas remain in the full ingredient browser. This is optional, not a compulsory inventory task.
3. **Tonight settings:** Choose *Vegetarian* or *Eggs OK*, a maximum cooking time (15/25/40 minutes or Any), and the number of people (1–4). The recipe engine and search results respect time and diet. Household size is used to prefer recipes serving enough people, **not** to rescale quantities automatically.
4. **Recipe availability trust:** Optional sides (dahi/raita/papad) no longer block otherwise feasible khichdi, pulao, poha, lemon rice and selected paratha/tomato rice dishes. Their names now indicate when a side is optional.
5. **Signature ingredient checks:** Kashmiri dum aloo checks saunf, saunth and ajwain; Chettinad rice checks fennel, star anise and pepper. Extra masalas can be selected in the full ingredient browser.
6. **Prep-ahead truth:** Rajma, chole and dahi vada disclose overnight or 2-hour soaking. Cooking cannot start until the user confirms the prep has been done. Longer rice soak was reflected in the estimated time for two pulao recipes.
7. **Reduced flickering:** My Kitchen ingredient taps update the clicked item and counter, with one homepage recommendation refresh after closing or choosing "Find meals". Older asynchronous recommendation responses no longer overwrite newer choices.
8. **Better recipe variety:** Recently suggested dish IDs are remembered locally for 7 days, so reopening the app does not always start with the exact same first three meals. The current mood and pantry still take priority.
9. **No impossible matches:** A 15-minute preference will never suggest a 40-minute meal as ready. When the current mood/time filter has no dishes, a helpful empty state directs users to change settings or browse.

## What has NOT been solved

- **No live Gemini/API integration.** Recommendations are deterministic local rules over a 30-dish catalogue. Do not claim real-time AI recipe generation.
- **No authorized in-app Instamart checkout.** The shopping list works inside aaj.; purchase still requires opening Instamart separately.
- **No comprehensive food allergy validation or food-safety certification.** The vegetarian/eggs switch is a limited preference filter, not a guarantee against allergens or contamination.
- **Cooking times and recipes are estimates and have not been independently kitchen-tested.** Test the actual instructions with real cooks before stronger claims.
- **No automatic portion scaling.** Recipes display their original servings. If cooking for a different number, a user must check the written quantities.
- **No shared cloud account.** Pantry, preferences, favourites and cooking sessions are stored locally in each browser; testers will each start with their own device state.

## Quick check after GitHub/Vercel deploy

Use a fresh/incognito browser and your own phone.

1. Launch → Daily Kitchen Check opens. Confirm an ingredient → choose Find my dinner.
2. Tap **Tonight** → select Vegetarian and 15 minutes → results are genuinely 15 minutes or faster; select Eggs OK → the egg recipe is now eligible.
3. Choose a mood with no recipe under the filter → useful explanation appears, not an empty white screen.
4. Open **My kitchen** → find **My masala box** → tap Salt: Out → Confirmed today → Out, then confirm again. The page should not jump.
5. Remove paneer, choose paneer bhurji → not labelled ready; missing item resolution offers shopping or a supported substitute.
6. Choose rajma → before starting, confirm overnight soaking. Without confirmation, the app must not start.
7. On phone widths 360–430 pixels: test Daily Kitchen, Tonight, My Kitchen, Browse, Let's cook, missing essentials and Instamart handoff.
8. Refresh/close and reopen: remembered items persist, while next-day confirmations expire.

## Verification status

- All 30 recipes and existing matching tests passed at build time.
- 148 additional automated data/logic checks passed at build time.
- JavaScript syntax validated.
- **Full visual testing of this release in a browser was not available in the build environment.** Real device and deployed-browser validation is required before sending to testers.
