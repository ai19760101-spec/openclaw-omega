---
description: 🇹🇼 執行 OMEGA 台股海選雷達 (Agentic Model-Agnostic Mode)
---

# OMEGA 台股特化海選雷達工作流

此工作流將充分運用 Antigravity 的大腦 (您當下切換的 LLM 模型)，親自下達台股的作戰指導原則。

## 步驟 1：執行資料轉譯器

台股股海茫茫，我們已備妥 Python 探針負責海選高流動性與籌碼集中的個股，並進行 OMEGA MTFA X 光掃描。請執行以下指令：

```powershell
// turbo
C:\Antigravity\.venv\Scripts\python.exe C:\Antigravity\global-settings\skills\my-tw-financial-radar\dump_tw_data.py
```

*(備註：如果因防火牆失敗，腳本有防撞機制，絕對會傳回至少三檔龍頭權值股的情資。)*

請使用 `run_command` 後靜待並讀取回傳的純淨 JSON 數據。

## 步驟 2：深層作戰推演 (ToT / GoT)

取得 JSON 陣列（內含 `t3_cci`, `momentum`, `weekly_auth`，以及最關鍵的三大法人（外資 `foreign_buy_k` / 投信 `trust_buy_k`））後，切換您的認知框架至：**「OMEGA 總部台股戰略指揮官」**。

> [!CAUTION]
> 台股屬於籌碼市，造物主鐵律：
>
> 1. **大盤籌碼防禦**：若所有強勢海選股外資與投信皆呈現全面性撤退（負值），大盤轉為防守甚至避險燈號。
> 2. **單點戰略突破**：針對清單內每一檔台股給出司令部作戰等級的具體指令：
>    - 若出現 `is_golden_pillar: true` (黃金狙擊色) 且有投信或外資連買加持：**「🟢 狀態 3 滿弓狙擊。籌碼順風，動能覺醒，允許建立核心部位。」**
>    - 若出現 `is_silver_retreat: true` 且籌碼轉弱：**「🔴 高速漫步警告。進入銀色撤退區，動能見頂，立即減碼停利。」**
>    - 若為「🟢 常規多頭綠」：**「順勢而為，觀察防守線是否跌破，嚴禁過度追高。」**

## 步驟 3：撰寫與交付

利用 ToT 思維整理完畢後，不須寫檔，直接在您的對話窗回覆中，為造物主呈現完整的 **Markdown 格式 📡 OMEGA 台股海選戰略簡報**。
報告結尾別忘了宣講神聖信條：「**嚴禁無腦攤平 (HODL)！若日線實體跌破關鍵 K 線底部的 3~5%，即刻無情斬倉。**」
