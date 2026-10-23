# AI use disclosure

## Tools and purpose

An AI coding assistant was used during development to help integrate the Expo
mobile interface, scaffold and refine the FastAPI service, write focused
automated tests, and prepare project documentation.

## Runtime behavior

The application does not call a generative AI model. API matching is
deterministic TF-IDF/cosine retrieval with exact name/alias boosts and a
confidence threshold. The offline fallback uses local token matching. The API
returns its match reason and linked repository evidence.

## Human review and limitations

AI-generated changes were reviewed and validated with the recorded local
checks. A passing automated test suite does not establish physical-device
compatibility, member approval of profile data, or tester feedback. Those
checks remain separate release evidence.
