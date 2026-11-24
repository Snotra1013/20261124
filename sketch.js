// ==================== 角色 1（女角色）精靈圖變數 ====================
let walkSprite; // 儲存角色 1 的走路精靈圖（1/走路/all.png）
let flipSprite; // 儲存角色 1 的空中轉一圈精靈圖（1/空中轉一圈/all.png）
let punchSprite; // 儲存角色 1 的揮拳精靈圖（1/揮拳/all.png）
let sweepSprite; // 儲存角色 1 的揮掃把精靈圖（1/揮掃把/all.png，1174 x 90，共 9 格）
let idleSprite; // 儲存角色 1 的待機圖片（1/待機/MC_MarisaKirisame.png）

// ==================== 角色 0（男角色）精靈圖變數 ====================
let char0StopSprite; // 儲存角色 0 的待機精靈圖（0/stop/all.png，1395 x 196，共 10 格）
let char0JumpSprite; // 儲存角色 0 的跳躍精靈圖（0/jump/all.png，1913 x 188，共 14 格）
let char0PushSprite; // 儲存角色 0 的推擊精靈圖（0/push/all.png，2083 x 146，共 8 格）

// ==================== 背景與位置相關變數 ====================
let bgSprite; // 儲存無限捲動用的背景圖片（1/背景.jpg，612 x 367）
let characterX; // 儲存角色 1 目前的水平中心座標
let characterY; // 儲存角色 1 目前的垂直中心座標
let char0BaseX; // 儲存角色 0 在草地世界中的基準水平座標
let bgScrollX = 0; // 儲存背景目前的水平捲動位移量（像素）

// ==================== 角色 1 動作狀態與按鍵旗標 ====================
let facingDirection = 1; // 角色 1 水平朝向：1 代表向右，-1 代表向左
let isDoingFlip = false; // 記錄角色 1 是否正在播放空翻動畫（按上方向鍵觸發）
let isFlipKeyHeld = false; // 記錄上方向鍵是否仍被按住（避免連發重複觸發）
let flipStartTime = 0; // 記錄角色 1 空翻動畫開始時的毫秒時間（millis()）
let isDoingPunch = false; // 記錄角色 1 是否正在播放揮拳動畫（按空白鍵觸發）
let isPunchKeyHeld = false; // 記錄空白鍵是否仍被按住（避免連發重複觸發）
let punchStartTime = 0; // 記錄角色 1 揮拳動畫開始時的毫秒時間（millis()）
let isDoingSweep = false; // 記錄角色 1 是否正在播放揮掃把動畫（答對數學題觸發）
let sweepStartTime = 0; // 記錄角色 1 揮掃把動畫開始時的毫秒時間（millis()）

// ==================== 角色 0 動作狀態 ====================
let char0IsPushing = false; // 記錄角色 0 是否正在播放推擊動畫（答錯數學題觸發）
let char0PushStartTime = 0; // 記錄角色 0 推擊動畫開始時的毫秒時間（millis()）

// ==================== 數學題互動狀態與參數 ====================
let isMathModalOpen = false; // 記錄目前是否正在顯示數學題彈出視窗
let currentMathAnswer = null; // 儲存目前數學題的正確數值答案
let hasTriggeredInCurrentApproach = false; // 記錄在同一次靠近過程中是否已觸發過題目，避免重複彈出
let lastModalClosedTime = 0; // 記錄上次關閉數學題視窗的毫秒時間
const encounterDistance = 185; // 角色 1 遇到角色 0 的水平距離門檻（依截圖距離調寬，可微調）[cite: 7]
const encounterCooldownMs = 1500; // 作答結束後再次觸發的冷卻時間（毫秒）

// ==================== 數學題視窗 DOM 元件 ====================
let mathOverlay; // 全螢幕半透明遮罩層
let mathQuestionText; // 顯示數學題目的文字元素
let mathInput; // 讓玩家輸入答案的數字輸入框
let mathFeedbackText; // 顯示提示或錯誤訊息的文字元素

// ==================== 各精靈圖格數設定 ====================
const walkFrameCount = 6; // 角色 1 走路精靈圖總格數
const flipFrameCount = 10; // 角色 1 空翻精靈圖總格數
const punchFrameCount = 10; // 角色 1 揮拳精靈圖總格數
const sweepFrameCount = 9; // 角色 1 揮掃把精靈圖總格數（1/揮掃把/all.png）

const char0StopFrameCount = 10; // 角色 0 待機精靈圖總格數（0/stop/all.png）
const char0JumpFrameCount = 14; // 角色 0 跳躍精靈圖總格數（0/jump/all.png）
const char0PushFrameCount = 8; // 角色 0 推擊精靈圖總格數（0/push/all.png）

// ==================== 動畫速度與畫面比例微調常數 ====================
const char0StopFrameDuration = 110; // 角色 0 待機動畫每格停留時間（毫秒）
const char0JumpFrameDuration = 90; // 角色 0 跳躍動畫每格停留時間（毫秒）
const char0PushFrameDuration = 100; // 角色 0 推擊動畫每格停留時間（毫秒）
const char0TriggerDistance = 230; // 角色 1 接近時讓角色 0 切換為跳躍的水平距離門檻（像素）

const flipFrameDuration = 100; // 角色 1 空翻動畫每格停留時間（毫秒）
const punchFrameDuration = 100; // 角色 1 揮拳動畫每格停留時間（毫秒）
const sweepFrameDuration = 100; // 角色 1 揮掃把動畫每格停留時間（毫秒）
const characterScale = 2.4; // 角色 1 放大顯示倍率
const char0Scale = 1.45; // 角色 0 放大顯示倍率（縮小後比例）
const grassRatio = 0.795; // 草地表面在畫布高度中的垂直比例（約 79.5% 處）
const idleBottomOffset = 22; // 角色 1 待機圖底部留白垂直修正量（正數往下、負數往上）
const char0StopBottomOffset = 0; // 角色 0 待機（stop）底部垂直修正量
const char0JumpBottomOffset = 18; // 角色 0 跳躍（jump）底部垂直修正量（避免起跳前腳底懸空）
const char0PushBottomOffset = 0; // 角色 0 推擊（push）底部垂直修正量
const char0OffsetX = -260; // 角色 0 初始相對於畫面中心的水平偏移量（負數偏左）
const movementSpeed = 5; // 角色走路時背景捲動的速度（每影格像素）

// 圖片載入失敗時的錯誤提示函式
function handleImageError(path) {
  console.error("圖片載入失敗，請檢查路徑或是否透過本機伺服器開啟：", path); // 在主控台輸出錯誤路徑
}

// 計算目前畫布中草地表面的 Y 座標
function getGroundY() {
  return height * grassRatio; // 依畫布高度與草地比例算出草地線位置
}

// 更新角色 1 與角色 0 的初始／基準座標
function updateCharacterPositions() {
  characterX = width / 2; // 角色 1 固定在畫布水平中央
  let idleHeight = (idleSprite && idleSprite.height > 0) ? idleSprite.height : 64; // 取得待機圖高度，未載入前用 64 防呆
  characterY = getGroundY() - (idleHeight * characterScale) / 2 + idleBottomOffset; // 讓角色 1 腳底對齊草地

  char0BaseX = width / 2 + char0OffsetX; // 計算角色 0 在世界座標中的初始水平位置
}

// 建立數學題彈出視窗與相關介面元素
function createMathModalUI() {
  mathOverlay = createDiv(""); // 建立全螢幕遮罩容器
  mathOverlay.style("position", "fixed"); // 固定在瀏覽器視窗上
  mathOverlay.style("inset", "0"); // 撐滿整個螢幕上下左右
  mathOverlay.style("background", "rgba(0, 0, 0, 0.45)"); // 半透明深色背景
  mathOverlay.style("display", "none"); // 預設隱藏，遇到角色 0 時才顯示
  mathOverlay.style("align-items", "center"); // 垂直置中卡片
  mathOverlay.style("justify-content", "center"); // 水平置中卡片
  mathOverlay.style("z-index", "999"); // 確保浮在畫布最上方

  let card = createDiv(""); // 建立題目卡片區塊
  card.parent(mathOverlay); // 將卡片放入遮罩層中
  card.style("background", "#FFFDF5"); // 卡片底色
  card.style("border", "3px solid #2B2D42"); // 卡片邊框
  card.style("border-radius", "12px"); // 圓角樣式
  card.style("padding", "24px 28px"); // 內距
  card.style("min-width", "300px"); // 最小寬度
  card.style("text-align", "center"); // 文字置中
  card.style("box-shadow", "0 10px 28px rgba(0,0,0,0.25)"); // 陰影效果
  card.style("font-family", "sans-serif"); // 字型設定

  let title = createElement("h3", "遭遇挑戰！請回答數學題"); // 建立視窗標題
  title.parent(card); // 放入卡片
  title.style("margin", "0 0 12px 0"); // 下方間距
  title.style("color", "#2B2D42"); // 標題文字顏色

  mathQuestionText = createElement("p", ""); // 建立題目顯示段落
  mathQuestionText.parent(card); // 放入卡片
  mathQuestionText.style("font-size", "24px"); // 題目字體大小
  mathQuestionText.style("font-weight", "bold"); // 粗體顯示
  mathQuestionText.style("margin", "8px 0 16px 0"); // 上下間距
  mathQuestionText.style("color", "#1D3557"); // 題目文字顏色

  mathInput = createInput(""); // 建立答案輸入框
  mathInput.parent(card); // 放入卡片
  mathInput.attribute("type", "number"); // 限制為數字輸入框
  mathInput.attribute("placeholder", "輸入答案"); // 輸入提示文字
  mathInput.style("width", "160px"); // 輸入框寬度
  mathInput.style("padding", "8px 10px"); // 輸入框內距
  mathInput.style("font-size", "18px"); // 輸入框字體大小
  mathInput.style("text-align", "center"); // 輸入數字置中
  mathInput.style("border", "2px solid #8D99AE"); // 輸入框邊框
  mathInput.style("border-radius", "6px"); // 輸入框圓角
  mathInput.style("margin-right", "8px"); // 與送出按鈕的右側間距

  let submitBtn = createButton("送出答案"); // 建立送出按鈕
  submitBtn.parent(card); // 放入卡片
  submitBtn.style("padding", "9px 16px"); // 按鈕內距
  submitBtn.style("font-size", "16px"); // 按鈕字體大小
  submitBtn.style("cursor", "pointer"); // 滑鼠移上顯示手型游標
  submitBtn.style("background", "#2A9D8F"); // 按鈕底色
  submitBtn.style("color", "#FFFFFF"); // 按鈕文字顏色
  submitBtn.style("border", "none"); // 移除預設邊框
  submitBtn.style("border-radius", "6px"); // 按鈕圓角
  submitBtn.mousePressed(checkMathAnswer); // 點擊按鈕時呼叫答案檢查函式

  mathFeedbackText = createElement("p", ""); // 建立回饋訊息段落
  mathFeedbackText.parent(card); // 放入卡片
  mathFeedbackText.style("min-height", "22px"); // 預留高度避免版面跳動
  mathFeedbackText.style("margin", "12px 0 0 0"); // 上方間距
  mathFeedbackText.style("font-size", "14px"); // 提示文字大小
  mathFeedbackText.style("color", "#E63946"); // 提示文字顏色

  // 監聽輸入框鍵盤事件，按 Enter 鍵即可直接送出答案
  mathInput.elt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { // 判斷是否按下 Enter
      e.preventDefault(); // 防止預設表單送出行為
      checkMathAnswer(); // 執行答案檢查
    }
  });
}

// 隨機產生一道加減乘除數學題（除法保證整除，減法避免負數）
function generateMathProblem() {
  const ops = ["+", "-", "*", "/"]; // 可選運算子陣列
  const op = ops[floor(random(ops.length))]; // 隨機挑選一種運算
  let a = 0; // 第一個數字
  let b = 0; // 第二個數字
  let answer = 0; // 正確答案

  if (op === "+") {
    a = floor(random(1, 30)); // 產生 1～29 的整數
    b = floor(random(1, 30)); // 產生 1～29 的整數
    answer = a + b; // 計算加法答案
  } else if (op === "-") {
    a = floor(random(10, 40)); // 產生 10～39 的整數
    b = floor(random(1, a + 1)); // 產生不超過 a 的整數
    answer = a - b; // 計算減法答案
  } else if (op === "*") {
    a = floor(random(2, 12)); // 產生 2～11 的整數
    b = floor(random(2, 12)); // 產生 2～11 的整數
    answer = a * b; // 計算乘法答案
  } else {
    b = floor(random(2, 12)); // 除數設為 2～11
    answer = floor(random(2, 12)); // 商數設為 2～11
    a = b * answer; // 被除數為兩者乘積，確保能整除
  }

  const symbolMap = { "+": "+", "-": "−", "*": "×", "/": "÷" }; // 顯示用運算符號對照
  return {
    text: `${a} ${symbolMap[op]} ${b} = ?`, // 組合題目字串
    answer // 回傳正確答案
  };
}

// 開啟數學題視窗並初始化作答狀態
function openMathModal() {
  if (isMathModalOpen) return; // 若視窗已開啟則不重複開啟
  const problem = generateMathProblem(); // 產生新題目
  currentMathAnswer = problem.answer; // 儲存正確答案
  isMathModalOpen = true; // 標記視窗為開啟中
  hasTriggeredInCurrentApproach = true; // 標記本次靠近已觸發過

  isFlipKeyHeld = false; // 清除空翻按鍵按住狀態
  isPunchKeyHeld = false; // 清除揮拳按鍵按住狀態

  mathQuestionText.html(problem.text); // 更新題目文字
  mathFeedbackText.html(""); // 清空先前的提示文字
  mathInput.value(""); // 清空輸入框
  mathOverlay.style("display", "flex"); // 顯示彈出視窗
  setTimeout(() => mathInput.elt.focus(), 20); // 延遲一點讓游標自動聚焦到輸入框
}

// 關閉數學題視窗並記錄關閉時間
function closeMathModal() {
  isMathModalOpen = false; // 標記視窗已關閉
  lastModalClosedTime = millis(); // 記錄關閉時間作為冷卻起點
  mathOverlay.style("display", "none"); // 隱藏彈出視窗
}

// 檢查玩家輸入的數學題答案並觸發對應角色動作
function checkMathAnswer() {
  if (!isMathModalOpen) return; // 視窗未開啟時不處理
  const raw = mathInput.value().trim(); // 取得並去除前後空白的輸入值
  if (raw === "") {
    mathFeedbackText.html("請先輸入數字答案！"); // 未輸入時提示玩家
    return;
  }

  const userAns = Number(raw); // 轉為數值型別
  closeMathModal(); // 關閉數學題視窗

  if (userAns === currentMathAnswer) {
    // 答對：角色 1 播放揮掃把動作（1/揮掃把/all.png）
    isDoingSweep = true;
    sweepStartTime = millis();
  } else {
    // 答錯：角色 0 播放推擊動作（0/push/all.png）
    char0IsPushing = true;
    char0PushStartTime = millis();
  }
}

// 預載入所有角色精靈圖與背景圖片
function preload() {
  walkSprite = loadImage("1/走路/all.png", () => {}, () => handleImageError("1/走路/all.png")); // 載入角色 1 走路圖
  flipSprite = loadImage("1/空中轉一圈/all.png", () => {}, () => handleImageError("1/空中轉一圈/all.png")); // 載入角色 1 空翻圖
  punchSprite = loadImage("1/揮拳/all.png", () => {}, () => handleImageError("1/揮拳/all.png")); // 載入角色 1 揮拳圖
  sweepSprite = loadImage("1/揮掃把/all.png", () => {}, () => handleImageError("1/揮掃把/all.png")); // 載入角色 1 揮掃把圖
  idleSprite = loadImage("1/待機/MC_MarisaKirisame.png", () => {}, () => handleImageError("1/待機/MC_MarisaKirisame.png")); // 載入角色 1 待機圖

  char0StopSprite = loadImage("0/stop/all.png", () => {}, () => handleImageError("0/stop/all.png")); // 載入角色 0 待機圖
  char0JumpSprite = loadImage("0/jump/all.png", () => {}, () => handleImageError("0/jump/all.png")); // 載入角色 0 跳躍圖
  char0PushSprite = loadImage("0/push/all.png", () => {}, () => handleImageError("0/push/all.png")); // 載入角色 0 推擊圖

  bgSprite = loadImage("1/背景.jpg", (img) => { // 載入背景圖
    console.log("背景圖片載入成功，尺寸：", img.width, "x", img.height); // 印出背景實際寬高
  }, () => handleImageError("1/背景.jpg")); // 背景載入失敗時提示
}

// 初始化畫布、繪圖模式、角色位置與數學題視窗
function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全視窗大小的畫布
  imageMode(CENTER); // 讓精靈圖以中心點座標繪製
  updateCharacterPositions(); // 初始化角色位置
  createMathModalUI(); // 建立數學題視窗介面
}

// 更新並繪製角色 0（待機 / 接近跳躍 / 答錯推擊 + 遭遇判定）
function drawChar0() {
  let drawX = char0BaseX + bgScrollX; // 計算角色 0 隨背景捲動後的實際畫面 X 座標
  let distToChar1 = abs(characterX - drawX); // 計算角色 1 與角色 0 之間的水平距離

  // 若角色 1 走開超過一定距離，重設靠近旗標，之後再次靠近可重新觸發
  if (distToChar1 > encounterDistance * 1.4) {
    hasTriggeredInCurrentApproach = false;
  }

  // 當角色 1 遇到角色 0，且不在視窗開啟中、未重複觸發、已過冷卻時間時彈出數學題
  if (
    !isMathModalOpen &&
    !hasTriggeredInCurrentApproach &&
    distToChar1 <= encounterDistance &&
    (millis() - lastModalClosedTime) >= encounterCooldownMs
  ) {
    openMathModal();
  }

  // 檢查角色 0 推擊動畫是否已播放完畢
  let pushElapsed = millis() - char0PushStartTime;
  if (char0IsPushing && pushElapsed >= char0PushFrameCount * char0PushFrameDuration) {
    char0IsPushing = false;
  }

  let isChar1Near = distToChar1 <= char0TriggerDistance; // 判斷角色 1 是否在角色 0 跳躍感應範圍內

  let activeChar0Sprite; // 目前要繪製的角色 0 精靈圖
  let frameCount; // 目前精靈圖總格數
  let frameIndex; // 目前要裁切的第幾格（0 起算）
  let bottomOffset; // 目前動作的底部垂直修正量

  if (char0IsPushing) {
    // 答錯數學題時播放推擊動畫（0/push/all.png，8 格）
    activeChar0Sprite = char0PushSprite;
    frameCount = char0PushFrameCount;
    frameIndex = constrain(floor(pushElapsed / char0PushFrameDuration), 0, frameCount - 1);
    bottomOffset = char0PushBottomOffset;
  } else if (isChar1Near) {
    // 角色 1 接近時循環播放跳躍動畫（0/jump/all.png，14 格）
    activeChar0Sprite = char0JumpSprite;
    frameCount = char0JumpFrameCount;
    frameIndex = floor(millis() / char0JumpFrameDuration) % frameCount;
    bottomOffset = char0JumpBottomOffset;
  } else {
    // 平時待機時循環播放待機動畫（0/stop/all.png，10 格）
    activeChar0Sprite = char0StopSprite;
    frameCount = char0StopFrameCount;
    frameIndex = floor(millis() / char0StopFrameDuration) % frameCount;
    bottomOffset = char0StopBottomOffset;
  }

  if (!activeChar0Sprite || activeChar0Sprite.width <= 0 || activeChar0Sprite.height <= 0) return; // 圖片未就緒則略過

  let frameWidth = activeChar0Sprite.width / frameCount; // 計算單格來源寬度
  let drawWidth = frameWidth * char0Scale; // 計算放大後的顯示寬度
  let drawHeight = activeChar0Sprite.height * char0Scale; // 計算放大後的顯示高度
  let drawY = getGroundY() - drawHeight / 2 + bottomOffset; // 讓角色 0 底部對齊草地表面

  push(); // 暫存繪圖狀態
  translate(drawX, drawY); // 移動原點至角色 0 位置
  image(
    activeChar0Sprite,
    0,
    0,
    drawWidth,
    drawHeight,
    frameIndex * frameWidth,
    0,
    frameWidth,
    activeChar0Sprite.height
  ); // 裁切並繪製目前影格
  pop(); // 還原繪圖狀態
}

// 更新並繪製可操控的角色 1（左右走動捲動背景、空翻、揮拳、答對揮掃把、待機）
function updateAndDrawChar1() {
  let moving = false; // 記錄本影格角色 1 是否正在走路

  // 數學題視窗開啟時暫停角色 1 移動與背景捲動
  if (!isMathModalOpen) {
    let pressLeft = keyIsDown(LEFT_ARROW); // 檢查左方向鍵是否按住
    let pressRight = keyIsDown(RIGHT_ARROW); // 檢查右方向鍵是否按住

    if (pressLeft && !pressRight) {
      facingDirection = -1; // 面朝左
      moving = true; // 正在走路
      bgScrollX += movementSpeed; // 向右捲動背景營造往左走的感覺
    } else if (pressRight && !pressLeft) {
      facingDirection = 1; // 面朝右
      moving = true; // 正在走路
      bgScrollX -= movementSpeed; // 向左捲動背景營造往右走的感覺
    }
  }

  // 檢查空翻動畫是否播放完畢
  let flipElapsed = millis() - flipStartTime;
  if (isDoingFlip && flipElapsed >= flipFrameCount * flipFrameDuration) {
    isDoingFlip = false;
  }

  // 檢查揮拳動畫是否播放完畢
  let punchElapsed = millis() - punchStartTime;
  if (isDoingPunch && punchElapsed >= punchFrameCount * punchFrameDuration) {
    isDoingPunch = false;
  }

  // 檢查揮掃把動畫是否播放完畢
  let sweepElapsed = millis() - sweepStartTime;
  if (isDoingSweep && sweepElapsed >= sweepFrameCount * sweepFrameDuration) {
    isDoingSweep = false;
  }

  // 依目前動作優先順序決定角色 1 使用哪張圖片：揮掃把 > 揮拳 > 空翻 > 走路 > 待機
  let activeSprite = isDoingSweep
    ? sweepSprite
    : isDoingPunch
      ? punchSprite
      : isDoingFlip
        ? flipSprite
        : moving
          ? walkSprite
          : idleSprite;

  if (activeSprite && activeSprite.width > 0 && activeSprite.height > 0) { // 確認圖片已載入完成
    let frameCount = activeSprite === sweepSprite
      ? sweepFrameCount
      : activeSprite === punchSprite
        ? punchFrameCount
        : activeSprite === flipSprite
          ? flipFrameCount
          : activeSprite === walkSprite
            ? walkFrameCount
            : 1; // 待機單張圖設為 1 格

    let activeFrameWidth = activeSprite.width / frameCount; // 計算單格來源寬度
    let activeFrameIndex = isDoingSweep
      ? constrain(floor(sweepElapsed / sweepFrameDuration), 0, frameCount - 1)
      : isDoingPunch
        ? constrain(floor(punchElapsed / punchFrameDuration), 0, frameCount - 1)
        : isDoingFlip
          ? constrain(floor(flipElapsed / flipFrameDuration), 0, frameCount - 1)
          : moving
            ? floor(millis() / 100) % walkFrameCount
            : 0; // 待機固定第 0 格

    let characterWidth = activeFrameWidth * characterScale; // 計算顯示寬度
    let characterHeight = activeSprite.height * characterScale; // 計算顯示高度
    let activeBottomOffset = activeSprite === idleSprite ? idleBottomOffset : 0; // 待機圖套用專屬底部偏移
    characterX = width / 2; // 固定在畫面水平中央
    characterY = getGroundY() - characterHeight / 2 + activeBottomOffset; // 讓角色 1 底部對齊草地

    push(); // 暫存繪圖狀態
    translate(characterX, characterY); // 移動原點至角色 1 座標
    scale(facingDirection, 1); // 依左右朝向水平翻轉角色
    image(
      activeSprite,
      0,
      0,
      characterWidth,
      characterHeight,
      activeFrameIndex * activeFrameWidth,
      0,
      activeFrameWidth,
      activeSprite.height
    ); // 裁切並繪製目前影格
    pop(); // 還原繪圖狀態
  }
}

// 主繪圖迴圈：每一影格重繪背景與兩位角色
function draw() {
  background("#FEFAE0"); // 備用底色

  if (bgSprite && bgSprite.width > 0 && bgSprite.height > 0) { // 確認背景圖已載入
    let bgScale = height / bgSprite.height; // 依畫布高度等比例放大背景
    let bgDrawWidth = bgSprite.width * bgScale; // 計算縮放後的背景寬度
    let wrappedOffset = ((bgScrollX % bgDrawWidth) + bgDrawWidth) % bgDrawWidth; // 將位移正規化至 [0, bgDrawWidth)
    let startX = wrappedOffset - bgDrawWidth; // 從左側超出畫面一倍寬度處開始拼接
    push(); // 暫存繪圖設定
    imageMode(CORNER); // 改為左上角對齊模式方便無縫平鋪
    for (let x = startX; x < width + bgDrawWidth; x += bgDrawWidth) { // 橫向重複繪製背景填滿畫面
      image(bgSprite, x, 0, bgDrawWidth, height);
    }
    pop(); // 還原繪圖設定
  }

  drawChar0(); // 更新並繪製角色 0
  updateAndDrawChar1(); // 更新並繪製角色 1
}

// 處理鍵盤按下事件（上方向鍵空翻、空白鍵揮拳）
function keyPressed() {
  if (isMathModalOpen) return; // 數學題視窗開啟時不觸發角色動作

  if (keyCode === UP_ARROW && !isFlipKeyHeld) { // 按下上方向鍵且尚未按住
    isFlipKeyHeld = true; // 標記為按住中
    isDoingFlip = true; // 啟動空翻動畫
    flipStartTime = millis(); // 記錄起始時間
    return false; // 阻止瀏覽器預設上下捲動
  }
  if (keyCode === 32 && !isPunchKeyHeld) { // 按下空白鍵且尚未按住
    isPunchKeyHeld = true; // 標記為按住中
    isDoingPunch = true; // 啟動揮拳動畫
    punchStartTime = millis(); // 記錄起始時間
    return false; // 阻止空白鍵預設捲動頁面
  }
}

// 處理鍵盤放開事件，解除按住鎖定
function keyReleased() {
  if (keyCode === UP_ARROW) {
    isFlipKeyHeld = false; // 放開上方向鍵
  }
  if (keyCode === 32) {
    isPunchKeyHeld = false; // 放開空白鍵
  }
}

// 當瀏覽器視窗大小改變時，重新調整畫布與角色基準位置
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 更新畫布尺寸
  updateCharacterPositions(); // 重新計算角色位置
}