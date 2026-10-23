import os
import json
import hashlib
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

# Ensure directories are absolute and robust
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MEMBERS_JSON = os.path.join(DATA_DIR, "members.json")
MODEL_PKL = os.path.join(DATA_DIR, "tfidf_model.pkl")

# Raw JSON data template to create automatically if missing
DATA_TEMPLATE = [
  {
    "id": "1",
    "fullName": "Aline Uwase",
    "registrationNumber": "INES/2024/001",
    "aliases": ["Aline", "Liliane", "Price Forecaster Lead"],
    "githubUsername": "aline-uwase-g11",
    "role": "AI and Data Engineer",
    "skills": ["Python", "scikit-learn", "Pandas", "TF-IDF Data Processing"],
    "targetUser": "Potato cooperatives in Musanze",
    "problem": "Unpredictable potato pricing causing financial losses during harvest",
    "contribution": "Built the core machine learning price forecasting index algorithm using scikit-learn",
    "feature": "Price Forecaster Model Engine",
    "outcomeMetric": "Cuts the average price forecasting error from 25 down to 18 Rwandan francs a kilo",
    "evidenceLinks": ["https://github.com"],
    "testerFeedback": "Cooperative representatives verified that clear predictive insights help them decide exactly when to sell.",
    "introductionDraft": "My name is Aline. I help potato cooperatives in Musanze decide when to sell. I built the price forecaster in AgriSoko."
  },
  {
    "id": "2",
    "fullName": "Eric Nshimiye",
    "registrationNumber": "INES/2024/002",
    "aliases": ["Eric", "Rico", "UI Offline Master"],
    "githubUsername": "eric-nshimiye-g11",
    "role": "Offline and Quality Engineer",
    "skills": ["React Native", "TypeScript", "AsyncStorage", "NetInfo Caching"],
    "targetUser": "Cooperative farmers in rural Kinigi",
    "problem": "Total lack of mobile cellular network connectivity in deep potato fields",
    "contribution": "Implemented local AsyncStorage profile lookups and state caching when network drops",
    "feature": "Offline Profile Directory and Storage Layer",
    "outcomeMetric": "Four farmers successfully tested offline queries; two critical interface bugs resolved",
    "evidenceLinks": ["https://github.com"],
    "testerFeedback": "Four rural farmers confirmed they checked critical app data with network turned completely off.",
    "introductionDraft": "My name is Eric. I built the price screen of AgriSoko Pocket."
  }
]

def build_search_index():
    print("🤖 Starting AgriSoko AI Index Build...")
    
    # Force create data folder if it doesn't exist
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Force write members.json if missing
    if not os.path.exists(MEMBERS_JSON):
        print(f"📦 members.json not found. Auto-generating file at: {MEMBERS_JSON}")
        with open(MEMBERS_JSON, "w", encoding="utf-8") as f:
            json.dump(DATA_TEMPLATE, f, indent=2)
            
    with open(MEMBERS_JSON, "r", encoding="utf-8") as f:
        raw_data = f.read()
        members = json.loads(raw_data)
    
    fingerprint = hashlib.sha256(raw_data.encode('utf-8')).hexdigest()
    print(f"✅ Data verified. SHA-256 Fingerprint: {fingerprint}")

    corpus = []
    metadata = []
    for member in members:
        combined_text = f"{member['fullName']} {' '.join(member['aliases'])} {member['role']} " \
                        f"{' '.join(member['skills'])} {member['feature']} {member['contribution']} " \
                        f"{member['problem']}"
        corpus.append(combined_text.lower())
        metadata.append(member)

    vectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 2), stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)

    model_payload = {
        "vectorizer": vectorizer,
        "tfidf_matrix": tfidf_matrix,
        "metadata": metadata,
        "fingerprint": fingerprint
    }
    
    with open(MODEL_PKL, "wb") as f:
        pickle.dump(model_payload, f)
        
    print(f"🚀 AI Index compiled successfully and stored in {MODEL_PKL}\n")

if __name__ == "__main__":
    build_search_index()
