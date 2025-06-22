# models/text_model.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"
tokenizer  = AutoTokenizer.from_pretrained(MODEL_NAME)
model      = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()

ADJECTIVES = {
    1: "horrendous",
    2: "poor",
    3: "mediocre",
    4: "good",
    5: "excellent"
}

def classify_text(text: str) -> dict:
    inputs = tokenizer(text, truncation=True, padding=True, return_tensors="pt")
    with torch.no_grad():
        outputs       = model(**inputs)
        probs         = torch.nn.functional.softmax(outputs.logits, dim=-1)
        confidence, idx = torch.max(probs, dim=1)

    stars = int(idx.item()) + 1
    return {
        "stars":      stars,
        "label":      ADJECTIVES[stars],
        "confidence": float(confidence.item())
    }
