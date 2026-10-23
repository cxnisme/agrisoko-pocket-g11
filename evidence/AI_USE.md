# AI assistance and project authorship

## Project authorship and assistance

AgriSoko Pocket G11 is our group project, led by Christian (`cxnisme`) as the
group leader. Christian developed and integrated the project with support from
an AI coding assistant for implementation, focused automated tests, code
review, and documentation. The group leader directed the work and coordinated
integration and submission.

## Runtime behavior

The application does not call a generative AI model at runtime. Its API uses
deterministic TF-IDF/cosine retrieval with exact name/alias boosts and a
confidence threshold. The offline fallback uses local token matching. API
responses include a match reason and repository evidence links.

## Validation and limitations

We reviewed AI-assisted changes and ran the local checks listed in
`TEST_LOG.pdf`. Those automated checks cover software behavior in the tested
environment; they are not physical-device results, member profile approvals, or
external user feedback. The contribution and evidence records report those
items separately.
