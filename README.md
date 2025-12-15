# Project Title

## Overview
Brief description of the project and its purpose.

---

## Key Features
- Feature one
- Feature two
- Feature three

---

## Hardware Requirements

| Component | Role | Pin Configuration |
|---------|------|------------------|
| NodeMCU ESP8266 | Main Controller | — |
| DHT22 | Temperature & Humidity Sensor | Data → D4 (GPIO2) |

---

## Wiring Diagram
Refer to the diagrams inside the docs/Wiring_Diagrams/ directory.

---

## Software Setup

### 1. Arduino IDE Setup
1. Install Arduino IDE.
2. Install ESP8266 board package.
3. Select board: NodeMCU 1.0 (ESP-12E Module).
4. Set baud rate to *115200*.

### 2. Library Installation
Install the following libraries:
- DHT Sensor Library
- Firebase-ESP-Client
- ArduinoJson
- LiquidCrystal_I2C

---

## Firebase Configuration

```json
{
  "controls": {
    "target_temp": 37.7,
    "target_humidity": 65.0
  }
}