



async function testGemini() {

    const transcript =
        localStorage.getItem("continuumTranscript") || "";

    const prompt = `
You are a senior executive business analyst.

Analyze the meeting transcript.

Return ONLY HTML.

Create FOUR visually rich sections:

<section class="decision-card">
<h2>📋 Key Decisions</h2>
<p>Executive summary paragraph.</p>
<ul>
<li>Decision 1</li>
<li>Decision 2</li>
</ul>
</section>

<section class="dependency-card">
<h2>🔗 Dependencies</h2>
<p>Dependency overview paragraph.</p>
<ul>
<li>Dependency 1</li>
<li>Dependency 2</li>
</ul>
</section>

<section class="risk-card">
<h2>⚠️ Risks</h2>
<p>Risk overview paragraph.</p>
<ul>
<li>Risk 1</li>
<li>Risk 2</li>
</ul>
</section>

<section class="action-card">
<h2>✅ Recommended Actions</h2>
<p>Action summary paragraph.</p>
<ul>
<li>Action 1</li>
<li>Action 2</li>
</ul>
</section>

Requirements:
- Write professional executive language
- Use complete sentences
- Add summary paragraphs
- Add multiple bullet points
- Return HTML only
- No markdown
- No code blocks

Transcript:

${transcript}
`;
console.log(prompt);

    const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt
        })
});

const data = await response.json();



if (!response.ok) {
    console.error("Gemini Error:", data);
    alert(
    "Gemini Error:\n\n" +
    (data.error?.message || "Unknown Error")
    );
    return;
}

const aiText =
    data.candidates[0].content.parts[0].text;

console.log("AI OUTPUT:");
console.log(aiText);
localStorage.setItem(
    "continuumAIAnalysis",
    aiText
);
localStorage.setItem(
    "analysisComplete",
    "true"
);
const aiSummary = document.getElementById("aiSummary");

if (aiSummary) {
    aiSummary.innerHTML = aiText;
}
}
window.addEventListener('load', () => {

    const alreadyDone =
        localStorage.getItem('analysisComplete');

    if (!alreadyDone) {
        testGemini();
    }

});
