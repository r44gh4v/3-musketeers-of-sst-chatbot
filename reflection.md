# Reflection (Draft, 300-500 words)

This build reinforced how quickly quality depends on input quality. The biggest lesson was to structure prompts like product specs: a clear persona description, explicit examples, and explicit output constraints. Even with placeholder prompts, the skeleton already pushes the model away from generic advice. When the persona lines are vague, the output becomes bland, which is the simplest reminder of GIGO. Conversely, when the prompt gives concrete style guidance and a few examples, the replies become more consistent even without additional model tuning.

The UI and API architecture also highlighted how prompt design and system design work together. By treating personas as configuration rather than hardcoded conditions, the app stays flexible and maintainable. This is not just clean code; it also helps experimentation. I can iterate on prompts without changing the UI logic, and I can test persona-specific behavior without reworking the API. That separation of concerns makes future research, editing, and evaluation much faster.

What worked well was building a minimal but complete loop: a typed frontend, a simple Express function, and a consistent OpenAI-style request to Gemini. The approach is reliable, and the error handling keeps the experience calm even when calls fail. The suggestion chips and typing indicator are small features, but they set the expectation of a real chat product and reduce friction for first-time users.

What I would improve next is depth of research and voice authenticity. The placeholder prompts are intentionally generic; the next iteration should include real references from talks, posts, or classes to match each personality. I would also add a short evaluation checklist per persona, such as tone markers, do-and-dont rules, and negative examples. That would make the prompts more testable and help prevent accidental drift.

Another improvement is to add a lightweight evaluation harness: a fixed set of prompts per persona, a checklist for tone and accuracy, and a quick scoring log. That would make iterations less subjective and help confirm that prompt edits actually improve persona fidelity instead of drifting. I would also add a small set of negative tests to ensure the assistant politely refuses unsafe or overly personal requests while staying helpful.

Finally, I would add lightweight analytics for local testing to see where users switch personas or abandon messages. That feedback, combined with stronger prompt research, would help converge faster on a believable and useful experience.
