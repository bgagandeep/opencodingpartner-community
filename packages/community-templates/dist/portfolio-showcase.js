import { renderGenuineAppWorkspace } from "./portfolio-engines.js";
const RAW_100_SPECS = [
    // 1. Games & Arcade (1-10)
    ["neon-snake-arcade", "Neon Snake Arcade", "नियॉन स्नेक गेम", "games", "creator", "🐍", "#10b981", "Classic grid snake with score streak, speed boost, and touch D-pad controls.", "arcade-game", "Grid Speed", "Apples Eaten", "Launch Round", ["Speed Boost", "Wall Wrap", "High Score"], 12, 100, "pts"],
    ["puzzle-2048-india", "2048 Number Merge", "2048 नंबर पज़ल", "games", "creator", "🔢", "#f97316", "Slide and merge power-of-two tiles to reach the 2048 crown tile.", "arcade-game", "Best Tile", "Move Count", "Merge Tiles (+2x)", ["2 -> 4 -> 8", "16 -> 32 -> 64", "128 -> 2048"], 64, 2048, "tile"],
    ["tic-tac-toe-ai", "Tic-Tac-Toe vs Minimax Bot", "टिक-टैक-टो AI गेम", "games", "creator", "⭕", "#38bdf8", "Play 3x3 tactical rounds against an unbeaten Minimax AI opponent.", "arcade-game", "Player X Score", "Bot O Score", "Play Next Move", ["Center Control", "Corner Fork", "Diagonal Win"], 3, 3, "wins"],
    ["brick-breaker-blitz", "Brick Breaker Blitz", "ब्रिक ब्रेकर आर्केड", "games", "creator", "🧱", "#ec4899", "Deflect the neon ball to shatter multi-hit cyber bricks and collect power-ups.", "arcade-game", "Bricks Remaining", "Combo Multiplier", "Fire Ball", ["Multi-Ball", "Laser Paddle", "Extra Life"], 24, 5, "x"],
    ["memory-match-masala", "Memory Card Flip Match", "मेमोरी कार्ड मैच", "games", "creator", "🃏", "#a855f7", "Flip 16 emoji cards in minimum moves to train working memory.", "arcade-game", "Pairs Matched", "Moves Taken", "Flip Pair", ["Chai & Samosa", "Rocket & Code", "Star & Crown"], 8, 16, "pairs"],
    ["whack-a-bug-qa", "Whack-a-Bug QA Arcade", "बग हंटर आर्केड गेम", "games", "creator", "🐞", "#ef4444", "Squash production race-condition bugs before the 30-second sprint timer ends.", "arcade-game", "Bugs Squashed", "Sprint Seconds", "Squash Bug (+10)", ["Null Pointer", "Memory Leak", "Race Condition"], 30, 10, "bugs"],
    ["wordle-hinglish-daily", "5-Letter Word Guess Daily", "डेली वर्ड पज़ल", "games", "creator", "🔤", "#eab308", "Guess the hidden 5-letter tech or Hinglish word in 6 attempts with color hints.", "arcade-game", "Attempt #", "Streak Days", "Submit 5-Letter Guess", ["BUILD", "SMART", "INDIA"], 1, 6, "tries"],
    ["flappy-rocket-lander", "Lunar Rocket Lander", "रॉकेट लैंडर गेम", "games", "creator", "🚀", "#06b6d4", "Balance thruster fuel and gravity to land softly on the lunar pad.", "arcade-game", "Fuel Remaining %", "Descent Velocity", "Fire Thruster", ["Lunar Pad Alpha", "Crater Ridge", "Zero-G Orbit"], 85, 12, "m/s"],
    ["sudoku-zen-grid", "Sudoku Zen 9x9 Solver", "सुडोकू ज़ेन पज़ल", "games", "creator", "🧩", "#14b8a6", "Conflict-checked Sudoku board with pencil notes and row/column validation.", "arcade-game", "Cells Filled", "Hints Left", "Validate Grid", ["Row Check", "Column Check", "3x3 Box Check"], 45, 81, "cells"],
    ["chess-clock-pro", "Rapid & Blitz Chess Clock", "शतरंज टाइमर घड़ी", "games", "creator", "♟️", "#8b5cf6", "Dual-player tournament timer with Fischer increment and spacebar/tap switch.", "arcade-game", "White Clock (sec)", "Black Clock (sec)", "Switch Turn (+2s)", ["10+0 Rapid", "5+3 Blitz", "3+2 Bullet"], 300, 2, "sec"],
    // 2. Productivity & Todo Utilities (11-20)
    ["zen-todo-kanban", "Zen Todo & Kanban Board", "टास्क और कानबान बोर्ड", "productivity", "operations", "✅", "#10b981", "Organize daily engineering and personal tasks across Todo, Doing, and Done.", "todo-kanban", "New Task Title", "Priority Level", "+ Add Task to Board", ["Ship UPI Checkout", "Write Playwright Tests", "Deploy to Railway"], 3, 10, "tasks"],
    ["pomodoro-deep-work", "Pomodoro Deep Work Timer", "पोमोडोरो फोकस टाइमर", "productivity", "operations", "🍅", "#f43f5e", "25-minute deep focus sprints with 5-minute recovery breaks and session logs.", "todo-kanban", "Focus Goal", "Minutes Per Sprint", "Start Focus Sprint", ["Deep Coding (25m)", "Short Break (5m)", "Long Break (15m)"], 25, 4, "mins"],
    ["daily-habit-streak", "Daily Habit Streak Tracker", "दैनिक आदत ट्रैकर", "productivity", "operations", "🔥", "#f97316", "Build unbreakable daily habits with 7-day visual chains and completion stats.", "todo-kanban", "Habit Name", "Target Days/Week", "Check In Today", ["Morning Walk 30m", "Read 15 Pages", "Zero Sugar"], 7, 21, "days"],
    ["markdown-live-notes", "Markdown Live Split Editor", "मार्कडाउन नोट्स एडिटर", "productivity", "creator", "📝", "#38bdf8", "Write clean Markdown notes with instant formatted preview and word counter.", "todo-kanban", "Note Heading", "Tag Category", "Save Note Snapshot", ["# Sprint Retro", "## Key Wins", "- Zero console errors"], 120, 1, "words"],
    ["eisenhower-priority-matrix", "Eisenhower Priority Matrix", "प्राथमिकता मैट्रिक्स", "productivity", "operations", "🎯", "#8b5cf6", "Sort tasks into Do First, Schedule, Delegate, and Eliminate quadrants.", "todo-kanban", "Action Item", "Urgency Score (1-10)", "Assign Quadrant", ["Urgent & Important", "Important Not Urgent", "Delegate"], 9, 4, "quadrants"],
    ["meeting-action-tracker", "Meeting Agenda & Action Log", "मीटिंग एक्शन ट्रैकर", "productivity", "operations", "📋", "#06b6d4", "Capture meeting decisions, assign owners, and export clean follow-up bullets.", "todo-kanban", "Action Decision", "Owner Name", "Log Action Item", ["Finalize Q3 Roadmap", "Approve Security Audit", "Send GST Invoice"], 5, 30, "items"],
    ["bookmark-vault-organizer", "Dev Bookmark & Docs Vault", "बुकमार्क ऑर्गनाइज़र", "productivity", "creator", "🔖", "#eab308", "Save and tag important documentation links, RFCs, and quick references.", "todo-kanban", "Resource Title", "Tag / Folder", "Save Bookmark", ["MDN Web Docs", "Railway CLI Guide", "Razorpay Webhooks"], 14, 5, "links"],
    ["water-hydration-coach", "Daily Water Hydration Coach", "वाटर हाइड्रेशन ट्रैकर", "productivity", "operations", "💧", "#0ea5e9", "Log 250ml glasses throughout the workday to hit your 3-liter hydration goal.", "todo-kanban", "Intake Note", "Glass Size (ml)", "+ Log 250ml Glass", ["Morning 500ml", "Midday 1.5L", "Evening 3.0L"], 250, 3000, "ml"],
    ["packing-checklist-travel", "Smart Travel Packing List", "यात्रा पैकिंग लिस्ट", "productivity", "operations", "🧳", "#14b8a6", "Interactive trip checklist across Tech Gear, Documents, and Apparel.", "todo-kanban", "Packing Item", "Bag Section", "+ Add to Suitcase", ["Laptop & USB-C Charger", "Aadhaar & Passport", "Power Bank"], 12, 18, "items"],
    ["quick-voice-scratchpad", "Instant Idea Scratchpad", "आइडिया स्क्रैचपैड", "productivity", "creator", "💡", "#a855f7", "Zero-friction scratchpad for fleeting product ideas, snippets, and reminders.", "todo-kanban", "Quick Thought", "Priority Tag", "Pin Idea Card", ["Launch 100 App Showcase", "Add Hindi Voice Prompt", "Optimize Mobile CSS"], 6, 1, "ideas"],
    // 3. India Business & UPI Commerce (21-30)
    ["bharat-upi-storefront", "Bharat QuickStore UPI Catalog", "दुकान और UPI ऑर्डर ऐप", "business", "business", "🛍️", "#f97316", "Complete D2C & Kirana product catalog with instant UPI QR checkout and WhatsApp receipts.", "upi-commerce", "Product Name", "Unit Price (₹)", "+ Add to Cart & UPI", ["Organic Assam Chai ₹249", "Filter Coffee Pack ₹199", "Dry Fruit Box ₹699"], 249, 199, "₹"],
    ["chai-point-pos", "Chai & Café Express POS", "चाय और कैफ़े बिलिंग POS", "business", "business", "☕", "#eab308", "1-tap counter billing for cafés, tea stalls, and quick-service restaurants.", "upi-commerce", "Menu Item", "Price (₹)", "+ Add to Counter Bill", ["Masala Kulhad Chai ₹30", "Bun Maska ₹45", "Poha Plate ₹60"], 30, 45, "₹"],
    ["tiffin-subscription-manager", "Home Tiffin & Dabba Planner", "टिफ़िन सब्सक्रिप्शन ऐप", "business", "business", "🍱", "#10b981", "Manage daily lunch/dinner tiffin deliveries, pause dates, and monthly UPI dues.", "upi-commerce", "Meal Plan", "Monthly Rate (₹)", "Add Meal Plan", ["Standard Veg Thali ₹2,400", "Jain Special Dabba ₹2,600", "Protein Diet Box ₹3,200"], 2400, 30, "₹"],
    ["local-pharmacy-order", "Neighborhood Pharmacy Express", "दवा और मेडिकल स्टोर ऐप", "business", "business", "💊", "#06b6d4", "Order OTC wellness essentials and upload prescription checklists for 30-min delivery.", "upi-commerce", "Medicine / Item", "MRP (₹)", "+ Add to Medicine Bag", ["Vitamin C Chewables ₹120", "Digital Thermometer ₹299", "First Aid Kit ₹450"], 120, 299, "₹"],
    ["saree-boutique-catalog", "Ethnic Boutique Lookbook", "साड़ी और बुटीक कैटलॉग", "business", "business", "👗", "#ec4899", "Showcase handloom sarees and festive ethnic wear with direct WhatsApp video-call booking.", "upi-commerce", "Design Name", "Boutique Price (₹)", "+ Shortlist Design", ["Banarasi Silk Saree ₹4,500", "Chanderi Kurta Set ₹2,200", "Phulkari Dupatta ₹1,450"], 4500, 2200, "₹"],
    ["sweet-shop-festive-box", "Mithai & Festive Gift Builder", "मिठाई गिफ्ट बॉक्स ऐप", "business", "business", "🍬", "#f59e0b", "Build custom 500g/1kg assorted Kaju Katli & dry-fruit boxes for corporate and family gifting.", "upi-commerce", "Sweet Variety", "Per 500g (₹)", "+ Add to Gift Box", ["Kaju Katli (500g) ₹540", "Motichoor Ladoo ₹320", "Roasted Pistachio ₹680"], 540, 320, "₹"],
    ["hardware-wholesaler-quote", "B2B Hardware Quote Generator", "हार्डवेयर थोक कोटेशन", "business", "business", "🔩", "#38bdf8", "Generate bulk tiered quotes for electricals, paints, and construction fittings.", "upi-commerce", "SKU Item", "Wholesale Rate (₹)", "+ Add Bulk Line", ["LED Panel 18W (Box) ₹1,850", "Copper Wire 90m ₹2,100", "Smart Switchboard ₹950"], 1850, 2100, "₹"],
    ["auto-garage-jobcard", "Auto Service & Garage Jobcard", "ऑटो गैरेज जॉब कार्ड", "business", "operations", "🔧", "#ef4444", "Create instant two-wheeler and car service estimates with labor + spare parts breakdown.", "upi-commerce", "Service / Part", "Estimate (₹)", "+ Add to Jobcard", ["Full Synthetic Oil Change ₹1,150", "Brake Pad Replacement ₹850", "General Wash & Polish ₹400"], 1150, 850, "₹"],
    ["bakery-cake-customizer", "Artisan Bakery Cake Studio", "बेकरी केक ऑर्डर ऐप", "business", "business", "🎂", "#a855f7", "Customize cake weight, eggless toggle, message on cake, and delivery slot.", "upi-commerce", "Cake Flavor", "1 Kg Price (₹)", "+ Add Custom Cake", ["Belgian Chocolate Truffle ₹899", "Fresh Pineapple Cream ₹699", "Red Velvet Berry ₹949"], 899, 699, "₹"],
    ["kirana-low-stock-alert", "Kirana Inventory & Reorder", "किराना स्टॉक ट्रैकर", "business", "operations", "📦", "#14b8a6", "Track fast-moving shelf SKUs and generate 1-click supplier WhatsApp purchase orders.", "upi-commerce", "SKU Name", "Restock Cost (₹)", "+ Add to Purchase Order", ["Aashirvaad Atta 10kg ₹440", "Tata Salt 1kg Pack (x20) ₹520", "Sunflower Oil 5L ₹780"], 440, 520, "₹"],
    // 4. Fintech, GST & Personal Finance (31-40)
    ["gst-invoice-smart-khata", "GST Invoice & CGST/SGST Maker", "GST बिलिंग और डिजिटल खाता", "fintech", "fintech", "🧾", "#10b981", "Calculate 5%, 12%, 18%, or 28% GST splits (CGST + SGST) and generate SAC 998315 tax invoices.", "finance-calc", "Taxable Base Amount (₹)", "GST Rate (%)", "Calculate GST Invoice", ["SAC 998315 Cloud IT (18%)", "HSN Electronics (18%)", "Restaurant Service (5%)"], 5000, 18, "%"],
    ["home-loan-emi-planner", "Home & Car Loan EMI Planner", "होम लोन EMI कैलकुलेटर", "fintech", "fintech", "🏠", "#38bdf8", "Compute monthly EMI, total interest payable, and prepayment savings in INR.", "finance-calc", "Loan Principal (₹)", "Annual Interest (%)", "Calculate Monthly EMI", ["Home Loan 8.5% (20y)", "Car Loan 9.2% (5y)", "Two-Wheeler 11% (3y)"], 2500000, 8.5, "%"],
    ["sip-wealth-compounding", "Mutual Fund SIP Wealth Builder", "SIP निवेश कैलकुलेटर", "fintech", "fintech", "📈", "#f97316", "Project 10-year and 20-year wealth compounding from monthly Nifty 50 SIP contributions.", "finance-calc", "Monthly SIP (₹)", "Expected Annual Return (%)", "Project 10-Year Corpus", ["Nifty 50 Index (12%)", "Midcap Growth (15%)", "Balanced Hybrid (10%)"], 10000, 12, "%"],
    ["upi-split-bill-friends", "UPI Group Expense Splitter", "ग्रुप बिल स्प्लिटर", "fintech", "fintech", "🤝", "#a855f7", "Split restaurant bills, Goa trip costs, and flatmate rent equally with per-person UPI shares.", "finance-calc", "Total Group Bill (₹)", "Number of Friends", "Split Bill Equally", ["Dinner & Chai Bill", "Weekend Roadtrip Fuel", "Shared Wi-Fi & Electricity"], 2400, 4, "people"],
    ["freelance-tds-gst-calc", "Freelancer TDS (194J) & GST Calc", "फ्रीलांसर TDS और GST कैलकुलेटर", "fintech", "fintech", "💼", "#06b6d4", "Calculate net bank payout after 10% Section 194J TDS deduction and 18% GST collection.", "finance-calc", "Invoice Base Fee (₹)", "GST Rate (%)", "Compute Net Payout", ["Software Retainer ₹50,000", "UI/UX Design Sprint ₹30,000", "Technical Audit ₹25,000"], 50000, 18, "%"],
    ["gold-jewellery-making-calc", "22K/24K Gold & Making Verifier", "सोना और ज्वैलरी कैलकुलेटर", "fintech", "fintech", "🪙", "#eab308", "Verify jeweller billing by computing gold weight, making charges %, and mandatory 3% GST.", "finance-calc", "Gold Value (₹)", "Making Charge (%)", "Verify Final Jewellery Bill", ["22K Hallmark Ring", "24K Gold Coin", "Bridal Necklace Set"], 72000, 12, "%"],
    ["monthly-budget-50-30-20", "50/30/20 Salary Budget Allocator", "मासिक बजट प्लानर", "fintech", "fintech", "💰", "#14b8a6", "Allocate monthly take-home salary into 50% Needs, 30% Wants, and 20% SIP/Investments.", "finance-calc", "Monthly Net Salary (₹)", "Savings Target (%)", "Allocate Monthly Budget", ["50% Needs (Rent/Groceries)", "30% Lifestyle", "20% SIP & Emergency Fund"], 85000, 20, "%"],
    ["fixed-deposit-maturity", "FD & Senior Citizen Yield Calc", "FD ब्याज कैलकुलेटर", "fintech", "fintech", "🏦", "#ec4899", "Calculate quarterly compounded Fixed Deposit maturity values across bank rates.", "finance-calc", "FD Deposit Amount (₹)", "Annual FD Rate (%)", "Calculate Maturity Value", ["1-Year Bank FD (7.1%)", "Senior Citizen FD (7.6%)", "Tax Saver 5Y FD (7.25%)"], 100000, 7.25, "%"],
    ["crypto-equity-capital-gains", "Equity STCG / LTCG Tax Estimator", "शेयर टैक्स कैलकुलेटर", "fintech", "fintech", "📊", "#8b5cf6", "Estimate net profit and capital gains tax on Indian equity and ETF trades.", "finance-calc", "Net Capital Gain (₹)", "Tax Bracket (%)", "Calculate Post-Tax Profit", ["LTCG > 1 Year (12.5%)", "STCG < 1 Year (20%)", "Intraday Speculative"], 150000, 12.5, "%"],
    ["subscription-burn-auditor", "SaaS & OTT Monthly Burn Auditor", "सब्सक्रिप्शन खर्च ट्रैकर", "fintech", "fintech", "💳", "#f43f5e", "Audit recurring cloud, AI, and OTT subscriptions to see annualized rupee burn.", "finance-calc", "Monthly Subscriptions (₹)", "Annual Discount (%)", "Compute Annual Burn", ["Zivel Bharat Indie ₹299/mo", "Cloud Hosting ₹500/mo", "OTT Bundle ₹299/mo"], 1098, 15, "%"],
    // 5. Developer & Engineering Utilities (41-50)
    ["json-formatter-validator", "JSON Formatter & Tree Validator", "JSON फॉर्मेटर और वैलिडेटर", "devtools", "operations", "{ }", "#38bdf8", "Validate, pretty-print, and minify JSON payloads with instant syntax diagnostics.", "dev-utility", "JSON Input Payload", "Indent Spaces", "Format & Validate JSON", ['{"app":"ocp","ok":true}', '{"plan":"bharat-pro","inr":999}', '{"bots":5,"errors":0}'], 2, 100, "spaces"],
    ["regex-live-tester", "Regex Pattern Match Workbench", "रेगेक्स पैटर्न टेस्टर", "devtools", "operations", "🔍", "#10b981", "Test regular expressions against sample strings with match count and capture inspection.", "dev-utility", "Test Input Text", "Pattern Mode", "Run Regex Match", ["upi://pay?pa=store@jio", "GSTIN: 27AAAAA0000A1Z5", "+91-9876543210"], 1, 3, "matches"],
    ["jwt-payload-decoder", "Client-Side JWT Token Inspector", "JWT टोकन डिकोडर", "devtools", "operations", "🔐", "#f97316", "Decode JWT header and payload claims locally in your browser without sending secrets over the network.", "dev-utility", "Token Claim Preview", "Expiry TTL (mins)", "Inspect Claims", ["alg: HS256 · typ: JWT", "sub: tenant-jio-demo", "role: admin · iat: valid"], 60, 24, "mins"],
    ["cron-schedule-explainer", "Cron Schedule Expression Builder", "क्रोन शेड्यूल बिल्डर", "devtools", "operations", "⏱️", "#a855f7", "Translate 5-field cron syntax into plain English and preview upcoming trigger times.", "dev-utility", "Cron Expression", "Timezone Offset", "Explain Cron Schedule", ["0 9 * * * (Every day at 9:00 AM)", "*/15 * * * * (Every 15 mins)", "0 18 * * 1-5 (Weekdays 6 PM)"], 9, 15, "hrs"],
    ["password-entropy-generator", "Cryptographic Password & Key Gen", "पासवर्ड और API की जनरेटर", "devtools", "operations", "🔑", "#eab308", "Generate high-entropy passwords and webhook secrets with bit-strength scoring.", "dev-utility", "Secret Prefix", "Key Length (chars)", "Generate Secure Secret", ["ocp_live_9f8a7b6c5d4e3f2a", "whsec_7d8e9f0a1b2c3d4e", "K9#mP2$vL8@qR5!xZ4"], 24, 128, "chars"],
    ["css-glassmorphism-studio", "CSS Glassmorphism Card Generator", "CSS ग्लासमॉर्फिज़्म स्टूडियो", "devtools", "creator", "✨", "#06b6d4", "Tune backdrop-filter blur, alpha transparency, and border glow with copy-ready CSS.", "dev-utility", "CSS Property", "Blur Radius (px)", "Generate CSS Snippet", ["backdrop-filter: blur(20px)", "background: rgba(15,23,42,0.72)", "border: 1px solid rgba(255,255,255,0.14)"], 20, 72, "px"],
    ["http-status-reference", "HTTP Status Code Explorer", "HTTP स्टेटस कोड गाइड", "devtools", "operations", "🌐", "#ec4899", "Instant lookup for 200 OK, 201 Created, 401 Unauthorized, 429 Rate Limited, and 502 Bad Gateway.", "dev-utility", "HTTP Status Code", "Category Filter", "Inspect Status Code", ["200 OK — Request succeeded", "429 Too Many Requests — Rate limit", "503 Service Unavailable"], 200, 429, "code"],
    ["chmod-octal-calculator", "Linux Chmod Octal Matrix (755/600)", "लिनक्स Chmod कैलकुलेटर", "devtools", "operations", "🐧", "#14b8a6", "Convert Owner/Group/Public read-write-execute permissions between octal (0755) and symbolic (-rwxr-xr-x).", "dev-utility", "Permission Preset", "Octal Mode", "Compute Chmod Command", ["0755 (-rwxr-xr-x) Web Dir", "0600 (-rw-------) SSH/Vault Key", "0644 (-rw-r--r--) Config File"], 755, 600, "octal"],
    ["base64-url-codec", "UTF-8 Base64 & URL Encoder", "Base64 और URL एनकोडर", "devtools", "operations", "🔄", "#8b5cf6", "Encode and decode UTF-8 strings, Basic Auth headers, and query parameters.", "dev-utility", "Raw Input String", "Codec Mode", "Encode Base64 & URL", ["rzp_live_key:secret", "https://zivel.app/?demo=jio", "Zivel v0.4.0"], 64, 1, "bit"],
    ["sql-query-prettifier", "SQL Query Formatter & Index Advisor", "SQL क्वेरी फॉर्मेटर", "devtools", "operations", "🗄️", "#f43f5e", "Format raw SQL queries and highlight missing WHERE/LIMIT clauses before production execution.", "dev-utility", "SQL Statement", "Max Rows Limit", "Format & Audit SQL", ["SELECT id, name FROM bots WHERE role = 'coding' LIMIT 50;", "CREATE INDEX idx_tasks_bot ON tasks(bot_id);", "SELECT count(*) FROM nodes;"], 50, 1, "rows"],
    // 6. Operations, Clinics & Local Services (51-60)
    ["clinic-live-token-queue", "Clinic Live Patient Token Board", "क्लिनिक अपॉइंटमेंट टोकन", "operations", "operations", "🏥", "#f97316", "Live 'Now Serving' patient token display with estimated wait time in minutes.", "queue-ops", "Patient / Visitor Name", "Minutes Per Token", "Issue New Token", ["Token A-14 (Now Serving)", "Token A-15 (Next in 10m)", "Token A-16 (Waiting)"], 14, 10, "mins"],
    ["salon-stylist-slot-booker", "Salon & Spa Slot Scheduler", "सैलून अपॉइंटमेंट बुकिंग", "operations", "operations", "💇", "#ec4899", "Book haircut, grooming, and spa slots with stylist selection and instant token confirmation.", "queue-ops", "Client Name", "Service Duration (m)", "Book Salon Slot", ["Haircut & Styling (30m)", "Beard Grooming (15m)", "Express Facial (45m)"], 21, 30, "mins"],
    ["society-visitor-gatepass", "Apartment Gate Security Pass", "सोसाइटी विज़िटर गेटपास", "operations", "operations", "🏢", "#10b981", "Generate 6-digit resident approval passes for delivery partners, cabs, and guests.", "queue-ops", "Visitor / Delivery Name", "Flat Number", "Issue Gate Pass", ["Swiggy/Zomato Delivery -> B-402", "Cab Pickup -> A-104", "Electrician -> C-201"], 402, 15, "flat"],
    ["hostel-mess-feedback", "Hostel Mess Meal Poll & Headcount", "हॉस्टल मेस फीडबैक ऐप", "operations", "operations", "🍛", "#eab308", "Track student dining attendance to prevent food waste and rate today's menu.", "queue-ops", "Student Roll / Name", "Meal Rating (1-5)", "Confirm Meal Attendance", ["Breakfast: Aloo Paratha & Curd", "Lunch: Rajma Chawal & Raita", "Dinner: Paneer Butter Masala"], 142, 5, "meals"],
    ["gym-membership-checkin", "Gym Member Check-In & Streak", "जिम अटेंडेंस ट्रैकर", "operations", "operations", "🏋️", "#ef4444", "1-tap member attendance check-in with active batch capacity meter.", "queue-ops", "Member Name", "Workout Duration (m)", "Check In Member", ["Morning Batch (6 AM - 8 AM)", "Evening Strength (6 PM - 9 PM)", "Cardio & HIIT Zone"], 38, 60, "members"],
    ["laundry-per-kg-estimator", "Wash & Iron Laundry Pickup Tag", "लॉन्ड्री पिकअप और बिलिंग", "operations", "operations", "👕", "#38bdf8", "Log garment count and kg weight to issue a digital laundry pickup tag.", "queue-ops", "Customer Name", "Bag Weight (kg)", "Generate Laundry Tag", ["Wash & Fold (₹79/kg)", "Steam Iron (₹15/pc)", "Dry Clean Blazer (₹249)"], 6, 48, "kg"],
    ["coaching-batch-attendance", "Coaching Batch Roll-Call Desk", "कोचिंग क्लास अटेंडेंस", "operations", "operations", "🎓", "#8b5cf6", "Fast roll-call tracker for JEE/NEET/coding batches with attendance percentage.", "queue-ops", "Student Name", "Batch Code", "Mark Present", ["JEE Physics Morning Batch", "Full-Stack Web Cohort", "Spoken English Evening"], 54, 60, "present"],
    ["event-rsvp-ticket-desk", "Tech Meetup RSVP & Badge Desk", "इवेंट RSVP और चेक-इन", "operations", "operations", "🎟️", "#06b6d4", "Check in registered attendees at the venue door and print instant participant badges.", "queue-ops", "Attendee Name", "Ticket Tier", "Check In Attendee", ["AI Builders Meetup Mumbai", "Open Source Saturday Bengaluru", "Cloud & DevOps Workshop"], 88, 1, "badge"],
    ["coworking-desk-hoteling", "Coworking Hot-Desk Booker", "को-वर्किंग डेस्क बुकिंग", "operations", "operations", "💻", "#14b8a6", "Reserve quiet focus desks, monitor pods, and 6-seater conference rooms by the hour.", "queue-ops", "Member / Team Name", "Hours Reserved", "Reserve Desk Pod", ["Quiet Zone Desk #12", "Dual-Monitor Pod #04", "Boardroom Alpha (6-Seater)"], 12, 4, "hrs"],
    ["blood-donor-match-finder", "Emergency Blood Donor Coordinator", "ब्लड डोनर डायरेक्टरी", "operations", "operations", "🩸", "#f43f5e", "Log verified volunteer blood donors by blood group (O+, A+, B+, AB+) and city zone.", "queue-ops", "Volunteer Donor Name", "Units Needed", "Register / Match Donor", ["O+ Universal Red Cell", "B+ City Hospital Request", "A+ Platelet Volunteer"], 18, 2, "units"],
    // 7. Education, Study & Quiz Apps (61-70)
    ["spaced-repetition-flashcards", "Spaced Repetition Flashcard Deck", "फ्लैशकार्ड रिवीजन ऐप", "education", "creator", "🧠", "#a855f7", "Flip active-recall study cards and rate Easy, Good, or Again to master any subject.", "quiz-flashcard", "Concept Question", "Mastery Interval (days)", "Flip & Score Card", ["What is ACID in Databases? -> Atomicity, Consistency, Isolation, Durability", "What is Git Worktree? -> Isolated working tree sharing .git history", "What is SAC 998315? -> Cloud & IT software service GST code"], 1, 7, "cards"],
    ["upsc-ncert-daily-mcqs", "Daily GK & Polity MCQ Arena", "दैनिक सामान्य ज्ञान क्विज़", "education", "creator", "🏛️", "#f97316", "Practice high-yield Constitutional, Economy, and Science MCQs with instant explanations.", "quiz-flashcard", "Topic Filter", "Points Per Correct", "Next Quiz Question", ["Article 21 -> Right to Life & Personal Liberty", "Repo Rate -> RBI lending rate to commercial banks", "ISRO Chandrayaan-3 -> South Pole lunar landing"], 10, 4, "pts"],
    ["periodic-table-explorer", "Interactive Periodic Element Cards", "आवर्त सारणी एक्सप्लोरर", "education", "creator", "⚗️", "#06b6d4", "Explore atomic numbers, electron shells, and real-world uses of chemical elements.", "quiz-flashcard", "Element Symbol", "Atomic Number", "Inspect Element", ["6 · Carbon (C) — Organic life & graphene", "14 · Silicon (Si) — Semiconductor chips", "79 · Gold (Au) — Corrosion-free conductor"], 14, 79, "Z"],
    ["mental-math-speed-drill", "60-Second Mental Math Sprint", "मेंटल मैथ स्पीड ड्रिल", "education", "creator", "➗", "#10b981", "Sharpen multiplication, percentage, and square-root speed for competitive exams.", "quiz-flashcard", "Difficulty Level", "Score Streak", "Next Math Challenge", ["24 × 15 = 360", "18% of ₹5,000 = ₹900", "√1444 = 38"], 15, 10, "solved"],
    ["typing-wpm-speed-test", "Developer Code Typing WPM Test", "टाइपिंग स्पीड टेस्ट (WPM)", "education", "creator", "⌨️", "#38bdf8", "Benchmark your Words Per Minute (WPM) and symbol accuracy on real code snippets.", "quiz-flashcard", "Target WPM", "Accuracy %", "Run Typing Drill", ["const app = await startProductApp({ port: 4317 });", "git commit -m 'feat: ship 100 apps'", "export function verifySignature(raw, sig) {}"], 78, 99, "WPM"],
    ["gpa-cgpa-semester-calc", "Engineering SGPA & CGPA Calculator", "SGPA और CGPA कैलकुलेटर", "education", "creator", "📐", "#eab308", "Compute 10-point credit-weighted semester GPA and cumulative engineering grade.", "quiz-flashcard", "Course Name", "Grade Points (0-10)", "Add Course Grade", ["Data Structures (4 Cr) -> 9/10 (A+)", "Operating Systems (4 Cr) -> 10/10 (O)", "Database Systems (3 Cr) -> 9/10 (A+)"], 9, 4, "credits"],
    ["binary-hex-bit-trainer", "8-Bit Binary & Hex Bitwise Trainer", "बाइनरी और हेक्स कन्वर्टर", "education", "creator", "01", "#ec4899", "Toggle individual bits (128 to 1) to visualize binary, decimal, and hexadecimal numbers.", "quiz-flashcard", "Byte Value", "Bit Shift", "Step Bit Pattern", ["01000001 -> Decimal 65 -> Hex 0x41 ('A')", "11111111 -> Decimal 255 -> Hex 0xFF", "10101010 -> Decimal 170 -> Hex 0xAA"], 65, 255, "dec"],
    ["sorting-algorithm-visualizer", "Sorting Algorithm Step Visualizer", "सॉर्टिंग एल्गोरिदम विज़ुअलाइज़र", "education", "creator", "📊", "#14b8a6", "Step through Bubble Sort, Selection Sort, and QuickSort partitions with comparison counts.", "quiz-flashcard", "Algorithm Name", "Array Size", "Step Next Swap", ["Pass 1: [42, 15, 8, 99, 23] -> Swap 42 & 15", "Pass 2: [15, 8, 23, 42, 99] -> Swap 15 & 8", "Sorted: [8, 15, 23, 42, 99] (O(n log n))"], 5, 10, "ops"],
    ["vocabulary-root-builder", "GRE / CAT Word Root Mastery", "वोकैबुलरी और वर्ड रूट्स", "education", "creator", "📖", "#8b5cf6", "Learn Latin and Greek roots (bene-, chron-, omni-, phil-) to unlock 500+ exam words.", "quiz-flashcard", "Word Root", "Words Unlocked", "Reveal Next Root", ["CHRON (Time) -> Chronicle, Synchronize, Anachronism", "OMNI (All) -> Omnibar, Omnipotent, Omniscient", "BENE (Good) -> Benevolent, Benefactor, Benign"], 12, 50, "words"],
    ["exam-countdown-study-plan", "Exam Countdown & Syllabus Tracker", "परीक्षा काउंटडाउन और सिलेबस", "education", "creator", "📅", "#f43f5e", "Track syllabus chapter completion % alongside days remaining until exam day.", "quiz-flashcard", "Subject Module", "Completion %", "Mark Chapter Done", ["Module 1: System Design & Scaling (100%)", "Module 2: Distributed SQLite & Graphs (90%)", "Module 3: Security & Cryptography (85%)"], 85, 30, "%"],
    // 8. Health, Fitness & Lifestyle (71-80)
    ["bmi-bmr-macro-calculator", "BMI, BMR & Daily Macro Planner", "BMI और कैलोरी कैलकुलेटर", "health", "operations", "🥗", "#10b981", "Calculate Body Mass Index, daily maintenance calories, and balanced protein/carb/fat grams.", "health-timer", "Weight (kg)", "Height (cm)", "Calculate BMI & Macros", ["Protein Target: 110g/day", "Complex Carbs: 220g/day", "Healthy Fats: 55g/day"], 70, 175, "kg/cm"],
    ["hiit-tabata-interval-timer", "Tabata 20s/10s HIIT Workout Timer", "HIIT और तबाता वर्कआउट टाइमर", "health", "operations", "⏱️", "#f97316", "High-intensity interval coach with 20s work, 10s rest, and 8-round progress tracker.", "health-timer", "Work Seconds", "Rest Seconds", "Advance HIIT Round", ["Round 1: Jumping Jacks (20s)", "Round 2: Push-ups (20s)", "Round 3: Mountain Climbers (20s)"], 20, 10, "sec"],
    ["box-breathing-pacer", "4-4-4-4 Box Breathing Stress Reset", "बॉक्स ब्रीदिंग प्राणायाम गाइड", "health", "operations", "🧘", "#06b6d4", "Guided 4-second inhale, hold, exhale, and rest cycle to lower heart rate before presentations.", "health-timer", "Breath Phase (sec)", "Completed Cycles", "Step Breath Cycle", ["Inhale slowly (4s)", "Hold gently (4s)", "Exhale completely (4s)"], 4, 6, "cycles"],
    ["sleep-cycle-wake-calculator", "90-Min REM Sleep Cycle Calculator", "नींद साइकिल कैलकुलेटर", "health", "operations", "🌙", "#8b5cf6", "Find optimal bedtime or wake-up windows aligned with 90-minute REM sleep cycles.", "health-timer", "Target Sleep Hours", "Cycles (90m each)", "Compute Wake Windows", ["5 Cycles (7.5 hrs) -> Wake Refreshed", "6 Cycles (9.0 hrs) -> Deep Recovery", "4 Cycles (6.0 hrs) -> Minimum Rest"], 7.5, 5, "cycles"],
    ["indian-meal-protein-counter", "Indian Thali Protein & Macro Counter", "भारतीय भोजन प्रोटीन काउंटर", "health", "operations", "🍲", "#eab308", "Count protein and calories across Dal, Paneer, Soya, Curd, Eggs, and Roti servings.", "health-timer", "Serving Grams", "Protein (g)", "+ Add Serving to Plate", ["100g Paneer Bhurji -> 18g Protein", "1 Bowl Moong Dal -> 9g Protein", "2 Whole Eggs / Sprouts -> 13g Protein"], 100, 18, "g protein"],
    ["running-pace-split-calc", "5K / 10K Running Pace & Split Calc", "रनिंग पेस कैलकुलेटर", "health", "operations", "🏃", "#38bdf8", "Calculate min/km pace and 1km split targets for 5K, 10K, and Half-Marathon runs.", "health-timer", "Distance (km)", "Target Minutes", "Calculate Pace / km", ["5K in 25 mins -> 5:00 min/km", "10K in 52 mins -> 5:12 min/km", "21.1K Half Marathon -> 5:30 min/km"], 5, 25, "min/km"],
    ["eye-strain-20-20-20-guard", "20-20-20 Developer Eye Care Timer", "20-20-20 आई केयर टाइमर", "health", "operations", "👁️", "#14b8a6", "Every 20 minutes of coding, look 20 feet away for 20 seconds to prevent digital eye strain.", "health-timer", "Screen Interval (m)", "Look Away (sec)", "Log Eye Break", ["Blink 10 times slowly", "Focus on distant tree/window (20 ft)", "Roll shoulders & relax neck"], 20, 20, "sec"],
    ["posture-ergonomics-audit", "Desk Ergonomics & Posture Scorer", "डेस्क पोस्चर ऑडिट", "health", "operations", "🪑", "#ec4899", "Score your monitor height, lumbar support, and wrist angle with instant fixes.", "health-timer", "Monitor Eye Level %", "Chair Angle (deg)", "Score Desk Setup", ["Top of monitor at eye level (✓)", "Elbows at 90-100 deg angle (✓)", "Feet flat on floor / footrest (✓)"], 95, 100, "score"],
    ["medication-dose-schedule", "Daily Medicine & Vitamin Tracker", "दवा और विटामिन रिमाइंडर", "health", "operations", "💊", "#ef4444", "Track Morning, Afternoon, and Night doses for family members with adherence history.", "health-timer", "Dose Mg / Units", "Doses Per Day", "Mark Dose Taken", ["Morning 8 AM: Vitamin D3 + B12", "Afternoon 2 PM: Omega-3 Capsule", "Night 9 PM: Magnesium Glycinate"], 1, 3, "doses"],
    ["mood-gratitude-microjournal", "Daily Mood & 3-Bullet Gratitude Log", "मूड और ग्रैटिट्यूड जर्नल", "health", "creator", "☀️", "#a855f7", "Log daily energy levels (1-10) and three positive wins in under 30 seconds.", "health-timer", "Energy Score (1-10)", "Streak Days", "Save Daily Entry", ["1. Shipped clean code with 0 bugs", "2. Helped a teammate debug CSP", "3. Evening walk with family"], 9, 14, "days"],
    // 9. Creator, Design & Media Tools (81-90)
    ["creator-portfolio-resume", "Developer & Creator Portfolio Studio", "पोर्टफोलियो और रेज़्यूमे वेबसाइट", "creator", "creator", "🎓", "#38bdf8", "Shareable personal portfolio with project filter, skill badges, and 1-click WhatsApp/Email CTA.", "creator-studio", "Hero Headline", "Featured Projects", "Update Live Portfolio", ["AI Engineering Teammates", "100 Runnable Web Apps", "Native Kotlin & Swift Apps"], 100, 12, "projects"],
    ["youtube-title-thumbnail-preview", "YouTube Title & Feed Previewer", "यूट्यूब टाइटल और थंबनेल प्रीव्यू", "creator", "creator", "▶️", "#ef4444", "Test video titles against 60-character mobile truncation limits before publishing.", "creator-studio", "Video Title Draft", "Max Ideal Chars", "Preview Feed Card", ["We Built 100 Apps with AI Agents in 1 Hour! (44 chars ✓)", "How Sovereign India Cloud Cuts LLM Costs by 78% (48 chars ✓)", "Full Android & iOS Companion App Walkthrough (45 chars ✓)"], 44, 60, "chars"],
    ["color-palette-contrast-wcag", "WCAG Color Contrast & Palette Checker", "कलर कंट्रास्ट और पैलेट चेकर", "creator", "creator", "🎨", "#10b981", "Verify foreground/background hex contrast ratios for WCAG AA (4.5:1) and AAA (7.0:1) legibility.", "creator-studio", "Foreground / Accent", "Contrast Ratio", "Test Color Pair", ["#f8fafc on #0f172a -> 17.4:1 (AAA Pass)", "#10b981 on #090d16 -> 8.2:1 (AAA Pass)", "#38bdf8 on #0f172a -> 9.6:1 (AAA Pass)"], 17.4, 4.5, ":1"],
    ["aspect-ratio-pixel-calc", "16:9 / 9:16 Reels Aspect Ratio Calc", "वीडियो आस्पेक्ट रेशियो कैलकुलेटर", "creator", "creator", "📐", "#f97316", "Compute exact pixel dimensions for YouTube 16:9, Instagram Reels 9:16, and 4:5 carousels.", "creator-studio", "Width (px)", "Height (px)", "Scale Resolution", ["1920 × 1080 (16:9 Full HD)", "1080 × 1920 (9:16 Vertical Reels/Shorts)", "1080 × 1350 (4:5 Portrait Carousel)"], 1920, 1080, "px"],
    ["podcast-show-notes-builder", "Podcast Chapter & Show Notes Maker", "पॉडकास्ट शो-नोट्स बिल्डर", "creator", "creator", "🎙️", "#a855f7", "Build clickable `[00:00]` YouTube/Spotify chapter timestamps and guest links.", "creator-studio", "Chapter Title", "Timestamp Minute", "+ Add Chapter Marker", ["00:00 Introduction & Vision", "04:30 Live Demo: No-Code App Builder", "12:15 Sovereign Cloud & UPI Billing"], 12, 3, "chapters"],
    ["drum-pad-beat-sequencer", "8-Pad Synth & Beat Rhythm Studio", "बीट पैड और म्यूज़िक स्टूडियो", "creator", "creator", "🥁", "#ec4899", "Trigger 8 rhythmic synth pads and customize BPM tempo for lo-fi coding beats.", "creator-studio", "Track Name", "Tempo (BPM)", "Trigger Beat Loop", ["Pad 1: Deep 808 Kick (120 BPM)", "Pad 2: Crisp Tabla / Snare", "Pad 3: Ambient Synth Chord"], 120, 8, "BPM"],
    ["svg-blob-badge-maker", "SVG Status Badge & Pill Generator", "SVG बैज जनरेटर", "creator", "creator", "🏷️", "#06b6d4", "Create crisp README shields and status pills (`build: passing`, `apps: 100/100`).", "creator-studio", "Badge Label", "Badge Value", "Render SVG Badge", ["build · passing (emerald)", "showcase · 100 apps (cyan)", "license · Apache-2.0 (orange)"], 100, 1, "badges"],
    ["social-bio-link-in-bio", "Creator Link-in-Bio Micro-Page", "लिंक-इन-बायो लैंडिंग पेज", "creator", "creator", "🔗", "#eab308", "High-converting mobile bio page with featured links, newsletter box, and UPI tip jar.", "creator-studio", "Creator Handle", "Active Links", "Publish Bio Card", ["🚀 Launch My Latest App", "📺 Watch Tutorial on YouTube", "☕ Support via UPI Tip Jar"], 5, 100, "links"],
    ["reading-time-flesch-auditor", "Article Reading Time & Clarity Auditor", "आर्टिकल रीडिंग टाइम कैलकुलेटर", "creator", "creator", "⏱️", "#14b8a6", "Estimate reading time at 200 WPM and highlight overly long sentences in blog drafts.", "creator-studio", "Draft Word Count", "Reading Speed (WPM)", "Analyze Readability", ["600 words -> ~3 min read (Grade A Clarity)", "1,200 words -> ~6 min read (Technical Deep Dive)", "300 words -> ~1.5 min read (Quick Update)"], 600, 200, "words"],
    ["meme-caption-poster-studio", "Social Quote & Poster Caption Studio", "सोशल पोस्टर और कोट स्टूडियो", "creator", "creator", "🖼️", "#8b5cf6", "Compose high-contrast engineering quotes and release announcements for X/LinkedIn.", "creator-studio", "Poster Headline", "Font Size (px)", "Render Social Card", ["Ship fast, verify with Playwright.", "100 Apps Built & Tested End-to-End.", "Local-First + Sovereign Cloud Ready."], 32, 1080, "px"],
    // 10. Smart Tools, Converters & AI Utilities (91-100)
    ["ai-prompt-token-estimator", "LLM Token & INR Cost Comparator", "AI टोकन और लागत कैलकुलेटर", "utilities", "fintech", "🤖", "#38bdf8", "Estimate input/output token counts and compare INR costs across local vLLM, Qwen, and frontier models.", "smart-converter", "Prompt Tokens", "Multiplier", "Compare Model Costs", ["Jamnagar vLLM (Llama-3.3-70B) -> ₹0.04 / run", "3-Model Consensus Router -> 78% saved", "Local Ollama Loopback -> ₹0.00 forever"], 4000, 0.04, "₹"],
    ["unit-converter-indian-land", "Indian Land & Area Converter (Sq.ft / Gaj / Acre)", "ज़मीन और एरिया यूनिट कन्वर्टर", "utilities", "operations", "📏", "#10b981", "Convert seamlessly between Square Feet, Square Yards (Gaj), Guntha, Bigha, Acre, and Hectare.", "smart-converter", "Input Value (Gaj)", "Conversion Factor", "Convert Area Units", ["100 Sq. Yards (Gaj) = 900 Sq. Feet", "1 Acre = 43,560 Sq. Feet = 4,840 Gaj", "1 Hectare = 2.471 Acres"], 100, 9, "sq.ft"],
    ["world-timezone-meeting-sync", "IST / UTC / PST Global Team Clock", "ग्लोबल टाइमज़ोन मीटिंग प्लानर", "utilities", "operations", "🌍", "#f97316", "Find golden meeting overlap hours across India (IST), London (GMT), and San Francisco (PST).", "smart-converter", "IST Hour (24h)", "UTC Offset", "Sync Global Clocks", ["IST 19:30 (Mumbai/Bengaluru) -> UTC 14:00 -> EST 09:00", "IST 14:00 -> London 09:30 -> Singapore 16:30", "IST 09:00 -> Tokyo 12:30 -> Sydney 14:30"], 19.5, 5.5, "hrs"],
    ["ev-charging-cost-range-calc", "EV Charging Cost vs Petrol Savings Calc", "EV चार्जिंग और बचत कैलकुलेटर", "utilities", "fintech", "⚡", "#eab308", "Compare home EV battery charging cost (₹/km) against ₹102/L petrol consumption.", "smart-converter", "Monthly Km Driven", "Savings Per Km (₹)", "Calculate Monthly EV Savings", ["EV Cost: ~₹1.10/km vs Petrol: ~₹6.80/km", "1,500 km/month -> Save ₹8,550/month", "Annual Fuel Savings -> ₹1,02,600/year"], 1500, 5.7, "₹/mo"],
    ["rooftop-solar-roi-estimator", "Rooftop Solar kW & Bill Savings Calc", "रूफटॉप सोलर बचत कैलकुलेटर", "utilities", "fintech", "☀️", "#06b6d4", "Estimate kW solar capacity needed, monthly units generated, and electricity bill savings.", "smart-converter", "System Size (kW)", "Monthly Savings Per kW (₹)", "Estimate Solar ROI", ["3 kW System -> ~360 units/mo -> Save ~₹3,200/mo", "5 kW System -> ~600 units/mo -> Save ~₹5,400/mo", "PM Surya Ghar Subsidy Eligible"], 3, 1100, "₹/mo"],
    ["qr-upi-link-builder", "Merchant UPI Deep-Link Generator", "UPI पेमेंट लिंक जनरेटर", "utilities", "business", "📲", "#a855f7", "Generate NPCI-compliant `upi://pay?pa=...&am=...` links for GPay, PhonePe, and Paytm.", "smart-converter", "Amount (₹)", "Merchant Fee %", "Build UPI Deep-Link", ["upi://pay?pa=merchant@jio&pn=Store&am=499&cu=INR", "upi://pay?pa=clinic@okaxis&pn=Care&am=300&cu=INR", "Zero MDR on RuPay / UPI"], 499, 1, "₹"],
    ["whatsapp-click-to-chat-gen", "WhatsApp Click-to-Chat Link Builder", "व्हाट्सएप चैट लिंक बिल्डर", "utilities", "business", "💬", "#22c55e", "Create pre-filled `https://wa.me/91...` customer support and order links in 1 click.", "smart-converter", "Campaign Clicks", "Conversion Rate %", "Generate wa.me Link", ["https://wa.me/919876543210?text=Hi%20I%20want%20to%20order", "https://wa.me/919876543210?text=Send%20GST%20Invoice", "1-Click Mobile Deep-Link"], 250, 18, "leads"],
    ["json-to-csv-table-converter", "JSON Array to CSV & Table Exporter", "JSON से CSV टेबल कन्वर्टर", "utilities", "operations", "📑", "#ec4899", "Convert structured JSON records into clean comma-separated CSV rows for Excel/Sheets.", "smart-converter", "Records Count", "Columns Per Row", "Convert to CSV Rows", ["id,name,plan,amount_inr", "1,Ada,bharat-pro,999", "2,Linus,enterprise-jio,2499"], 25, 4, "cells"],
    ["roman-numeral-date-codec", "Decimal & Roman Numeral Converter", "रोमन न्यूमरल कन्वर्टर", "utilities", "creator", "🏛️", "#14b8a6", "Convert numbers and years (e.g. 2026 -> MMXXVI) bidirectionally with breakdown rules.", "smart-converter", "Number Input", "Step Increment", "Convert to Roman", ["2026 -> MMXXVI (1000+1000+10+10+5+1)", "100 -> C (Centum · 100 Apps Built)", "42 -> XLII"], 2026, 1, "num"],
    ["morse-code-audio-translator", "Morse Code Text & Signal Translator", "मोर्स कोड ट्रांसलेटर", "utilities", "creator", "📡", "#8b5cf6", "Translate alphanumeric messages into international Morse code dots (·) and dashes (−).", "smart-converter", "Words Per Minute", "Signal Frequency", "Translate to Morse", ["Zivel -> --- -.-. .--.", "SOS -> ... --- ...", "INDIA -> .. -. -.. .. .-"], 20, 600, "Hz"],
];
export const PORTFOLIO_100_APPS = RAW_100_SPECS.map((row, idx) => ({
    index: idx + 1,
    slug: row[0],
    name: row[1],
    hindiTitle: row[2],
    showcaseCategory: row[3],
    templateCategory: row[4],
    icon: row[5],
    accent: row[6],
    tagline: row[7],
    promptUsed: `Build "${row[1]}" (${row[2]}): ${row[7]}`,
    interactiveWidgetKind: row[8],
    config: {
        primaryLabel: row[9],
        secondaryLabel: row[10],
        actionButtonText: row[11],
        sampleItems: [...row[12]],
        defaultNumberA: row[13],
        defaultNumberB: row[14],
        unitLabel: row[15],
    },
}));
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
export function renderShowcaseAppHtml(spec) {
    const safeTitle = escapeHtml(spec.name);
    const safeHindi = escapeHtml(spec.hindiTitle);
    const safeTagline = escapeHtml(spec.tagline);
    const safeAccent = /^#[0-9A-Fa-f]{6}$/.test(spec.accent) ? spec.accent : "#10b981";
    const cfg = spec.config;
    const genuine = renderGenuineAppWorkspace(spec);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle} — Built with Zivel</title>
  <style>
    :root {
      --bg: #070b14;
      --surface: #111827;
      --card: #1e293b;
      --line: #334155;
      --accent: ${safeAccent};
      --emerald: #10b981;
      --text: #f8fafc;
      --muted: #94a3b8;
    }
    * { box-sizing: border-box; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { margin: 0; background: var(--bg); color: var(--text); padding: 20px; line-height: 1.5; }
    .wrap { max-width: 980px; margin: 0 auto; }
    .topbar { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; font-size: 12px; color: var(--muted); }
    .topbar a { color: var(--accent); text-decoration: none; font-weight: 600; }
    .hero { background: linear-gradient(135deg, var(--surface), #0f172a); border: 1px solid var(--line); border-radius: 18px; padding: 20px 22px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }
    .badge { display: inline-block; background: rgba(255,255,255,0.07); color: var(--accent); border: 1px solid var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
    h1 { margin: 8px 0 4px; font-size: clamp(20px, 3vw, 26px); letter-spacing: -0.02em; }
    .hindi { color: var(--accent); font-size: 14px; font-weight: 600; margin-bottom: 6px; }
    .tagline { margin: 0; color: var(--muted); font-size: 14px; max-width: 62ch; }
    .score-box { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; text-align: right; min-width: 155px; }
    .score-val { font-size: 22px; font-weight: 800; color: var(--emerald); }
    .game-layout { display: grid; grid-template-columns: 1.35fr 0.65fr; gap: 16px; align-items: start; }
    @media (max-width: 780px) { .game-layout { grid-template-columns: 1fr; } }
    .canvas-stage, .side-panel, .kanban-workspace, .pos-cart-box, .dev-col { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 18px; }
    .hud-bar { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .hud-pill { background: var(--card); border: 1px solid var(--line); padding: 6px 12px; border-radius: 999px; font-size: 12.5px; }
    .perspective-stage { perspective: 900px; display: flex; justify-content: center; background: #050811; border-radius: 14px; padding: 10px; border: 1px solid var(--line); overflow: hidden; }
    .perspective-stage canvas { width: 100%; max-width: 520px; height: auto; border-radius: 10px; transform: rotateX(14deg); box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65), 0 0 24px rgba(16, 185, 129, 0.18); }
    .dpad-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
    .dpad-btn, .btn-sm { background: var(--accent); color: #070b14; font-weight: 800; border: none; border-radius: 10px; padding: 9px 14px; font-size: 12.5px; cursor: pointer; transition: transform 0.1s ease; }
    .dpad-btn { background: var(--card); color: var(--text); border: 1px solid var(--line); }
    .dpad-btn:hover, .btn-sm:hover { opacity: 0.92; transform: translateY(-1px); }
    .btn-sm.secondary { background: var(--card); color: var(--text); border: 1px solid var(--line); }
    .board-2048 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 380px; margin: 10px auto; background: #090d16; padding: 12px; border-radius: 14px; border: 1px solid var(--line); }
    .tile-2048 { height: 74px; border-radius: 12px; display: grid; place-items: center; font-size: 22px; font-weight: 900; color: #fff; transition: transform 0.12s ease; }
    .ttt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 330px; margin: 12px auto; }
    .ttt-cell { height: 92px; border-radius: 14px; background: var(--card); border: 2px solid var(--line); font-size: 36px; cursor: pointer; display: grid; place-items: center; }
    .stat-box { margin-top: 12px; padding: 12px 14px; border-radius: 12px; background: rgba(16, 185, 129, 0.12); border: 1px solid var(--emerald); font-size: 13px; color: var(--text); }
    .muted-sm { color: var(--muted); font-size: 13px; line-height: 1.5; }
    .feature-list { display: grid; gap: 8px; margin-top: 12px; font-size: 12.5px; color: var(--muted); }
    .feat-item { background: var(--card); padding: 8px 10px; border-radius: 8px; border: 1px solid var(--line); }
    .kanban-toolbar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 14px; }
    .kanban-toolbar input, .kanban-toolbar select, .custom-item-row input { background: var(--card); border: 1px solid var(--line); color: var(--text); padding: 9px 12px; border-radius: 10px; font-size: 13px; flex: 1; min-width: 160px; }
    .kanban-columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    @media (max-width: 720px) { .kanban-columns { grid-template-columns: 1fr; } }
    .kanban-col { background: #090d16; border: 1px solid var(--line); border-radius: 12px; padding: 12px; min-height: 220px; }
    .col-head { display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--line); }
    .badge-cnt { background: var(--card); padding: 2px 8px; border-radius: 999px; font-size: 11px; }
    .col-list, .records-list { display: grid; gap: 8px; }
    .k-card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; }
    .k-actions { display: flex; gap: 4px; }
    .k-actions button, .mini-btn { background: var(--surface); color: var(--accent); border: 1px solid var(--line); border-radius: 6px; padding: 3px 8px; cursor: pointer; font-weight: 700; }
    .commerce-grid, .devtools-workbench { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 16px; }
    @media (max-width: 760px) { .commerce-grid, .devtools-workbench { grid-template-columns: 1fr; } }
    .catalog-cards { display: grid; gap: 10px; margin-bottom: 12px; }
    .cat-card { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; }
    .qty-ctrl { display: flex; align-items: center; gap: 8px; }
    .qty-ctrl button { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--line); background: var(--surface); color: var(--text); font-weight: 800; cursor: pointer; }
    .custom-item-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .cart-items { display: grid; gap: 6px; margin-bottom: 12px; }
    .cart-row { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px dashed var(--line); }
    .bill-summary { background: #090d16; padding: 12px; border-radius: 10px; border: 1px solid var(--line); display: grid; gap: 6px; font-size: 13px; margin-bottom: 12px; }
    .bill-Summary div, .bill-summary div { display: flex; justify-content: space-between; }
    .bill-total { font-size: 15px; color: var(--emerald); border-top: 1px solid var(--line); padding-top: 6px; }
    .upi-qr-card { display: flex; gap: 12px; align-items: center; background: var(--card); padding: 12px; border-radius: 12px; border: 1px solid var(--line); }
    .qr-matrix { width: 72px; height: 72px; display: grid; grid-template-columns: repeat(8, 1fr); background: #fff; padding: 4px; border-radius: 6px; flex-shrink: 0; }
    .code-area, .code-output { width: 100%; background: #050811; color: #e2e8f0; border: 1px solid var(--line); border-radius: 10px; padding: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; margin-top: 10px; }
    .code-output { min-height: 190px; white-space: pre-wrap; overflow-x: auto; }
    .row-spread { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .controls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--card); padding: 12px; border-radius: 12px; }
    .controls-grid input[type="range"] { width: 100%; accent-color: var(--accent); margin-top: 6px; }
    .foot { margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar">
      <span>✨ Built &amp; Verified by <strong>Zivel</strong> · App #${spec.index} of 100</span>
      <div>
        <a href="/showcase">← All 100 Apps Showcase</a> ·
        <a href="/?demo=jio">Customize in Studio ↗</a>
      </div>
    </div>

    <div class="hero">
      <div>
        <span class="badge">${escapeHtml(spec.icon)} ${escapeHtml(spec.showcaseCategory.toUpperCase())} · INTERACTIVE ENGINE</span>
        <h1>${safeTitle}</h1>
        <div class="hindi">${safeHindi}</div>
        <p class="tagline">${safeTagline}</p>
      </div>
      <div class="score-box">
        <div style="font-size:11px;color:var(--muted);text-transform:uppercase;font-weight:700;">Engine Mode</div>
        <div class="score-val" id="liveMetricVal">${cfg.defaultNumberA} ${escapeHtml(cfg.unitLabel)}</div>
        <div style="font-size:11px;color:var(--muted);" id="liveSubStatus">${escapeHtml(spec.interactiveWidgetKind)} · Live</div>
      </div>
    </div>

    ${genuine.html}

    <div class="foot">
      <span>🛡️ Guarded Workspace · Responsive Mobile Touch UI · Grade A Health Verified</span>
      <span>Slug: <code>/share/${escapeHtml(spec.slug)}</code></span>
    </div>
  </div>

  <script>
    ${genuine.script}
  </script>
</body>
</html>`;
}
export function findShowcaseApp(slugOrId) {
    const clean = slugOrId
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return PORTFOLIO_100_APPS.find((item) => item.slug === clean);
}
export function matchShowcaseAppFromPrompt(promptOrName) {
    const q = promptOrName.trim().toLowerCase();
    if (!q)
        return PORTFOLIO_100_APPS[0];
    const exact = PORTFOLIO_100_APPS.find((a) => a.slug === q || a.name.toLowerCase() === q);
    if (exact)
        return exact;
    let bestScore = -1;
    let best = PORTFOLIO_100_APPS[0];
    const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length >= 2);
    for (const app of PORTFOLIO_100_APPS) {
        const hay = `${app.slug} ${app.name} ${app.tagline} ${app.showcaseCategory} ${app.interactiveWidgetKind}`.toLowerCase();
        let score = 0;
        for (const tok of tokens) {
            if (hay.includes(tok))
                score += tok.length >= 4 ? 3 : 1;
        }
        if (score > bestScore) {
            bestScore = score;
            best = app;
        }
    }
    return best;
}
export function toAppBlueprint(spec) {
    const html = renderShowcaseAppHtml(spec);
    return {
        id: spec.slug,
        name: spec.name,
        hindiTitle: spec.hindiTitle,
        category: spec.templateCategory,
        icon: spec.icon,
        tagline: spec.tagline,
        nonTechnicalSummary: spec.tagline,
        defaultPrompt: spec.promptUsed,
        files: {
            "README.md": `# ${spec.name} (${spec.hindiTitle})\n\n${spec.tagline}\n\n- Category: \`${spec.showcaseCategory}\`\n- Public Share Route: \`/share/${spec.slug}\`\n`,
            "index.html": html,
        },
    };
}
export function renderShowcaseGalleryPage(categoryFilter, searchQuery) {
    const cleanCat = (categoryFilter ?? "").trim().toLowerCase();
    const cleanQ = (searchQuery ?? "").trim().toLowerCase();
    const filtered = PORTFOLIO_100_APPS.filter((app) => {
        if (cleanCat && cleanCat !== "all" && app.showcaseCategory !== cleanCat)
            return false;
        if (cleanQ) {
            const hay = `${app.name} ${app.hindiTitle} ${app.tagline} ${app.slug} ${app.showcaseCategory}`.toLowerCase();
            return hay.includes(cleanQ);
        }
        return true;
    });
    const categories = [
        ["all", "All 100 Apps"],
        ["games", "🎮 Games & Arcade (10)"],
        ["productivity", "✅ Productivity & Todo (10)"],
        ["business", "🛍️ India Business & UPI (10)"],
        ["fintech", "🧾 Fintech & GST (10)"],
        ["devtools", "🛠️ Developer Utilities (10)"],
        ["operations", "🏥 Clinics & Operations (10)"],
        ["education", "🧠 Education & Quiz (10)"],
        ["health", "🥗 Health & Wellness (10)"],
        ["creator", "🎨 Creator & Media (10)"],
        ["utilities", "⚡ Smart Converters & AI (10)"],
    ];
    const cardsHtml = filtered
        .map((app) => `
      <article class="app-card" data-cat="${escapeHtml(app.showcaseCategory)}" data-search="${escapeHtml(`${app.name} ${app.hindiTitle} ${app.tagline} ${app.slug}`.toLowerCase())}">
        <div class="card-top">
          <span class="app-num">#${app.index}</span>
          <span class="app-cat" style="border-color:${escapeHtml(app.accent)};color:${escapeHtml(app.accent)};">${escapeHtml(app.icon)} ${escapeHtml(app.showcaseCategory)}</span>
        </div>
        <h3>${escapeHtml(app.name)}</h3>
        <div class="hindi">${escapeHtml(app.hindiTitle)}</div>
        <p>${escapeHtml(app.tagline)}</p>
        <div class="card-actions">
          <a class="btn-launch" href="/share/${escapeHtml(app.slug)}" target="_blank" rel="noopener">▶ Launch Live App</a>
          <a class="btn-fork" href="/?demo=jio&amp;blueprint=${escapeHtml(app.slug)}">🔧 Customize</a>
        </div>
      </article>`)
        .join("\n");
    const catButtonsHtml = categories
        .map(([id, label]) => `<button type="button" class="cat-btn${(!cleanCat && id === "all") || cleanCat === id ? " active" : ""}" data-filter-cat="${escapeHtml(id)}">${escapeHtml(label)}</button>`)
        .join("");
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>100 Apps Built & Verified Showcase — Zivel</title>
  <style>
    :root { --bg: #07090e; --surface: #111827; --card: #1e293b; --line: #334155; --accent: #00e5ff; --emerald: #10b981; --text: #f8fafc; --muted: #94a3b8; }
    * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
    body { margin: 0; background: var(--bg); color: var(--text); padding: 24px 16px 64px; }
    .wrap { max-width: 1280px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-bottom: 20px; border-bottom: 1px solid var(--line); margin-bottom: 28px; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 18px; color: var(--text); text-decoration: none; }
    .mark { width: 32px; height: 32px; border-radius: 9px; background: var(--accent); color: #07090e; display: grid; place-items: center; font-weight: 900; }
    .hero { text-align: center; max-width: 820px; margin: 0 auto 28px; }
    .badge { display: inline-block; padding: 5px 14px; border-radius: 999px; background: rgba(16, 185, 129, 0.14); border: 1px solid var(--emerald); color: var(--emerald); font-size: 12px; font-weight: 700; margin-bottom: 12px; }
    h1 { margin: 0 0 10px; font-size: clamp(26px, 4vw, 42px); letter-spacing: -0.03em; }
    .sub { color: var(--muted); font-size: 16px; line-height: 1.6; margin: 0 0 20px; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 16px; }
    .cat-btn { background: var(--surface); color: var(--muted); border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; font-size: 12.5px; font-weight: 600; cursor: pointer; }
    .cat-btn.active, .cat-btn:hover { background: rgba(0, 229, 255, 0.14); color: var(--accent); border-color: var(--accent); }
    .search-wrap { max-width: 480px; margin: 0 auto 26px; }
    .search-wrap input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid var(--line); background: var(--surface); color: var(--text); font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .app-card { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 18px; display: flex; flex-direction: column; transition: transform 0.15s ease, border-color 0.15s ease; }
    .app-card:hover { transform: translateY(-3px); border-color: var(--accent); }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .app-num { font-family: ui-monospace, monospace; font-size: 12px; color: var(--muted); font-weight: 700; }
    .app-cat { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--line); text-transform: uppercase; }
    .app-card h3 { margin: 0 0 4px; font-size: 16px; }
    .hindi { font-size: 12.5px; color: var(--accent); font-weight: 600; margin-bottom: 8px; }
    .app-card p { margin: 0 0 16px; font-size: 13px; color: var(--muted); line-height: 1.5; flex: 1; }
    .card-actions { display: flex; gap: 8px; }
    .btn-launch, .btn-fork { flex: 1; text-align: center; padding: 9px 10px; border-radius: 10px; font-size: 12.5px; font-weight: 700; text-decoration: none; }
    .btn-launch { background: var(--accent); color: #07090e; }
    .btn-fork { background: var(--card); color: var(--text); border: 1px solid var(--line); }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <a class="brand" href="/?demo=jio"><span class="mark">Z</span> Zivel · 100 Apps Showcase</a>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a class="btn-fork" href="/?demo=jio" style="padding:8px 14px;">✨ Open Studio (?demo=jio)</a>
        <a class="btn-launch" href="https://zivel.app" style="padding:8px 14px;">🌐 zivel.app</a>
      </div>
    </header>

    <div class="hero">
      <span class="badge">✓ 100 / 100 APPS BUILT, TESTED &amp; VERIFIED END-TO-END</span>
      <h1>100 Live Apps Built by Zivel</h1>
      <p class="sub">Every arcade game, Kanban board, UPI storefront, GST calculator, clinic token queue, and developer utility below was scaffolded, quick-edited, health-checked, and published end-to-end. Click any app to try it live in your browser.</p>
      <div class="filter-bar" id="catFilterBar">${catButtonsHtml}</div>
      <div class="search-wrap">
        <input type="search" id="showcaseSearchInput" placeholder="Search 100 apps (e.g. Snake, 2048, Todo, UPI, GST, Clinic, Flashcards, Solar)..." value="${escapeHtml(searchQuery ?? "")}" />
      </div>
      <div id="showcaseCountMeta" style="font-size:13px;color:var(--muted);">Showing ${filtered.length} of 100 verified live apps</div>
    </div>

    <div class="grid" id="showcaseGrid">${cardsHtml}</div>
  </div>

  <script>
    (function() {
      let activeCat = "all";
      const searchInp = document.getElementById("showcaseSearchInput");
      const cards = [...document.querySelectorAll(".app-card")];
      const meta = document.getElementById("showcaseCountMeta");

      function applyFilter() {
        const q = (searchInp.value || "").trim().toLowerCase();
        let shown = 0;
        cards.forEach((card) => {
          const catMatch = activeCat === "all" || card.getAttribute("data-cat") === activeCat;
          const qMatch = !q || (card.getAttribute("data-search") || "").includes(q);
          const vis = catMatch && qMatch;
          card.style.display = vis ? "flex" : "none";
          if (vis) shown += 1;
        });
        meta.textContent = "Showing " + shown + " of 100 verified live apps";
      }

      document.querySelectorAll("[data-filter-cat]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-filter-cat]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          activeCat = btn.getAttribute("data-filter-cat") || "all";
          applyFilter();
        });
      });

      searchInp.addEventListener("input", applyFilter);
    })();
  </script>
</body>
</html>`;
}
//# sourceMappingURL=portfolio-showcase.js.map