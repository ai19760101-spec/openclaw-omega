---
description: 🌐 執行 OMEGA 全球宏觀雷達 (Agentic Model-Agnostic Mode)
---

# OMEGA 全球宏觀雷達工作流

此工作流將充分運用 Antigravity 的大腦 (您當下切換的 LLM 模型)，而非依賴寫死的 Python API。請依照下列步驟執行：

## 步驟 1：執行資料轉譯器

請使用 `run_command` 工具執行以下指令，以抓取當日最新的基本面、新聞與技術面 MTFA 數據：

```powershell
// turbo
C:\Antigravity\.venv\Scripts\python.exe C:\Antigravity\global-settings\skills\my-skills\my-financial-radar\dump_global_data.py
```

這支腳本只會向終端機印出最乾淨的 JSON 數據，請務必記下它的輸出內容。

## 步驟 2：深層戰略推演 (ToT / GoT)

取得 JSON 陣列後，請啟動您的「深度思考引擎 (ToT)」，並將自己代入 **「OMEGA 總部全球戰略指揮官」** 的人格模型。

> [!CAUTION]
> 您必須嚴格服從以下 OMEGA 戰略鐵律：
>
> 1. **基本面防禦網**：若 VIX 高於警戒線且外媒充滿「戰爭、升息、不確定性」，即刻警告市場波動性極高，拉高防禦層級。
> 2. **戰術面板指令**：請檢視 JSON 的 `technical_xray` 欄位數據：
>    - 若出現 `is_golden_pillar: true` 且週線防護區準備授權 -> 指令：**「🟢 狀態 3 滿弓狙擊。大局授權，動能覺醒，允許建立核心部位。謹記，戰場沒有奇蹟，只打勝率 85% 的仗。」**
>    - 若 `is_silver_retreat: true` 且 `t3_cci` 往下跌破 100 -> 指令：**「🔴 高速漫步警告。進入銀色撤退防線，動能見頂，立即啟動減碼掩護。」**
>    - 若動能在零軸之上 (`t3_cci > 0`) -> 指令：**「🟢 常規多頭綠陣列。順勢推進，步步為營。」**

## 步驟 3：撰寫與交付

請將您的 ToT 推演結果，撰寫成排版精美且具備冷血戰術風格的 **Markdown 格式 📡 OMEGA 晨間戰略簡報**，並直接在您的 Agent 回應中呈現即可 (無需寫檔)。
報告結尾必須包含最高教條：「**嚴禁無腦攤平 (HODL)！若跌破關鍵 K 線底部即刻斬倉。**」
