const historyList = document.getElementById("historyList");

function handleRequest() {
  const input = document.getElementById("userInput").value.trim();
  const task = document.getElementById("taskSelect").value;
  if (!input) return alert("Please enter some text!");

  let response = "";
  switch (task) {
    case "translate":
      response = `Translated: "${input.split('').reverse().join('')}"`;
      break;
    case "synonyms":
      response = `Synonyms: ${input}1, ${input}2, ${input}3`;
      break;
    case "grammar":
      response = `Grammar Tip: "${input}" is grammatically acceptable.`;
      break;
    case "explain":
      response = `Explanation: "${input}" is a sample phrase for testing.`;
      break;
  }

  document.getElementById("response").innerText = response;
  addToHistory(task, input, response);
}

function addToHistory(task, input, response) {
  const li = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString();
  li.innerHTML = `<strong>${task}</strong> at ${timestamp}:<br> "${input}" → ${response}`;
  historyList.prepend(li);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function startVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Speech recognition not supported.");

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    document.getElementById("response").innerText = "🎤 Voice input received.";
  };

  recognition.start();
}

function downloadHistory() {
  const historyItems = Array.from(historyList.children).map(item => item.innerText).join("\n\n");
  const blob = new Blob([historyItems], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "lingogenie-history.txt";
  a.click();

  URL.revokeObjectURL(url);
}

function suggestWords() {
  const input = document.getElementById("userInput").value;
  const suggestions = ["hello", "world", "language", "grammar", "translate"];
  const matches = suggestions.filter(w => w.startsWith(input.toLowerCase()));
  const box = document.getElementById("suggestionsBox");

  if (matches.length === 0 || input.length === 0) {
    box.innerHTML = "";
    return;
  }

  box.innerHTML = matches.map(w => `<div onclick="fillSuggestion('${w}')">${w}</div>`).join('');
}

function fillSuggestion(word) {
  document.getElementById("userInput").value = word;
  document.getElementById("suggestionsBox").innerHTML = "";
}