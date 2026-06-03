# Physics-Laboratory-Suite

A lightweight, automated backend suite designed to ingest, monitor, and process physics laboratory submissions. The platform tracks student progress through various experimental milestones, handles state machine tracking, and exports structured submission data for grading and visual analysis.

---

## Overview

The **Physics Laboratory Suite** provides an automated bridge between live student laboratory interactions and administrative grading workflows. Operating primarily over a cloud-hosted infrastructure, it monitors state transitions and aggregates raw data into human-readable reporting formats.

### Key Features
* **State Ingestion:** Real-time synchronization of lab tracking events.
* **Firestore Architecture:** Native integration with a NoSQL database tier optimized for high-throughput submission states.
* **Automated Reporting:** Built-in Python processing scripts to handle complex data transformation pipelines.
* **Excel Export Engine:** One-click compilation of data fields into clean sheets ready for LMS ingestion.

---

## Repository Structure

```text
Physics-Laboratory-Suite/
├── src/
│   ├── export_submissions.py   # Primary Firestore-to-Excel compiler
│   ├── database.py             # Firestore client initialization and helper layers
│   └── utils/                  # Data cleaning and string parsing utilities
├── config/
│   └── service-account.json    # Secure Firebase credentials (git-ignored)
├── requirements.txt            # Python dependency manifest
├── LICENSE                     # Apache License 2.0
└── README.md                   # System documentation
