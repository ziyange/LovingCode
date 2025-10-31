// 从URL获取查询参数的函数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 获取名字前缀
const namePrefix = getQueryParam('name');

// 从tips.txt读取的提示内容
const tips = [
    "你今天吃饭了吗？别又忘了。",
    "看看你最近睡得不太好，是不是压力大？",
    "别硬撑，不舒服就说出来。",
    "外面下雨了，你带伞了吗？",
    "你上次说腰疼，现在好点没？",
    "别总喝冰的，胃会不舒服的。",
    "别一个人扛，有事可以跟我说。",
    "别总喝咖啡提神，喝多了心慌。",
    "你吃饭别太快，对胃不好。",
    "你感冒了就别硬撑着上班，好好休息。",
    "你最近是不是又忘记吃早餐了？",
    "别让焦虑控制你，事情一件件来。",
    "我有点想你了。",
    "你最近瘦了。",
    "你声音听着累。",
    "记得吃饭。",
    "多喝点水。",
    "早点睡。",
    "胃还疼吗？",
    "肩膀好点没？",
    "今天过得怎么样？",
    "你咳嗽还没好。",
    "外面冷，多穿点。",
    "我给你留了饭。",
    "你眼睛很疲惫。",
    "别一个人扛。",
    "我在呢。",
    "你笑一下嘛。",
    "你脸色不太好。",
    "手怎么这么凉？",
    "今天有好好休息吗？",
    "你最近睡太少了。",
    "吃点热的。",
    "我帮你看着时间。",
    "你说话有气无力的。",
    "药吃了没？",
    "你头发该剪了。",
    "我陪你一会儿。",
    "你最近太拼了。",
    "腰还酸吗？",
    "你看起来不太开心。",
    "我给你倒杯水。",
    "你昨晚又没睡好。",
    "这汤我热着，你回来就能喝。",
    "你说话声音小了。",
    "你最近话变少了。",
    "我有点担心你。",
    "你吃饭太对付了。",
    "你眼睛干不干？",
    "你走路有点晃。",
    "你今天没吃早餐。",
    "你感冒还没好透。",
    "我等你忙完。",
    "你最近压力很大吧。",
    "你笑起来才像你。",
    "你手抖了。",
    "你心跳有点快。",
    "你最近吃得很少。",
    "你说话有点喘。",
    "你看起来很累。",
    "我给你按按肩膀。",
    "你值得歇一歇。",
    "我想你了！"
];

let bubbleCount = 0;
let maxBubbles = 1000;
let isFinalMessageShown = false;

// 获取随机提示
function getRandomTip() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    let tip = tips[randomIndex];
    
    // 如果有名字前缀，则在提示前加上名字
    if (namePrefix) {
        tip = namePrefix + "，" + tip;
    }
    
    return tip;
}

// 创建消息气泡
function createBubbleAt(x, y, text) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text || getRandomTip();
    
    // 随机背景色，但使用透明效果
    const bgColors = [
        'rgba(255, 182, 193, 0.3)', // 浅粉色
        'rgba(135, 206, 235, 0.3)', // 天空蓝
        'rgba(144, 238, 144, 0.3)', // 浅绿色
        'rgba(230, 230, 250, 0.3)', // 薰衣草色
        'rgba(255, 255, 224, 0.3)', // 浅黄色
        'rgba(221, 160, 221, 0.3)', // 梅花色
        'rgba(255, 127, 80, 0.3)',  // 珊瑚色
        'rgba(255, 228, 196, 0.3)', // 米色
        'rgba(127, 255, 212, 0.3)', // 碧绿色
        'rgba(255, 228, 225, 0.3)', // 薄雾玫瑰色
        'rgba(240, 255, 240, 0.3)', // 蜜瓜绿
        'rgba(230, 230, 250, 0.3)'  // 淡紫色
    ];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
    bubble.style.backgroundColor = randomBg;
    
    // 添加毛玻璃效果
    bubble.style.backdropFilter = 'blur(10px)';
    bubble.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    bubble.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    // 按照气泡中点进行绘制与排列
    bubble.style.transform = 'translate(-50%, -50%)';
    // 不允许文字超出气泡：不换行并根据内容扩宽
    bubble.style.whiteSpace = 'nowrap';
    bubble.style.minWidth = 'unset';
    bubble.style.maxWidth = 'none';
    
    // 点击关闭气泡
    // 初始阶段不再通过点击中断到最终效果
    
    const containerEl = document.getElementById('container');
    containerEl.appendChild(bubble);
    // 根据内容宽度调整气泡宽度
    requestAnimationFrame(() => {
        const needed = bubble.scrollWidth;
        const current = bubble.clientWidth;
        if (needed > current) {
            bubble.style.width = `${needed}px`;
        }
    });
    return bubble;
    
    // 删除自动消失逻辑（不再几秒后移除）
}

// 渐隐所有气泡
function fadeOutAllBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        bubble.classList.add('fade-out');
    });
    
    // 500ms后移除所有气泡
    setTimeout(() => {
        bubbles.forEach(bubble => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        });
    }, 500);
}

// 心形参数方程函数
function getHeartPosition(t, scale = 200, centerX = null, centerY = null) {
    if (centerX === null) centerX = window.innerWidth / 2;
    if (centerY === null) centerY = window.innerHeight / 2;
    
    const x = scale * (16 * Math.pow(Math.sin(t), 3));
    const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    
    return {
        x: centerX + x,
        y: centerY + y
    };
}

let heartBubbles = []; // 存储心形轮廓气泡
let heartDrawingComplete = false;

// 创建心形轮廓气泡
function createHeartBubble(index, total) {
    const t = (index / total) * 2 * Math.PI; // 参数t从0到2π
    const pos = getHeartPosition(t, 150); // 缩小一点的心形
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble heart-bubble';
    bubble.textContent = getRandomTip();
    
    // 随机背景色
    const bgColors = [
        'lightpink', 'skyblue', 'lightgreen', 'lavender',
        'lightyellow', 'plum', 'coral', 'bisque', 'aquamarine',
        'mistyrose', 'honeydew', 'lavenderblush', 'oldlace'
    ];
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
    bubble.style.backgroundColor = randomBg;
    
    // 设置位置（中点对齐）
    bubble.style.left = `${pos.x}px`;
    bubble.style.top = `${pos.y}px`;
    bubble.style.transform = 'translate(-50%, -50%)'; // 中点对齐
    
    const containerEl = document.getElementById('container');
    containerEl.appendChild(bubble);
    // 根据内容宽度调整气泡宽度
    requestAnimationFrame(() => {
        const needed = bubble.scrollWidth;
        const current = bubble.clientWidth;
        if (needed > current) {
            bubble.style.width = `${needed}px`;
        }
    });
    heartBubbles.push(bubble);
    
    return bubble;
}

// 分散心形气泡到全屏
function scatterHeartBubbles() {
    const toScatter = Array.from(document.querySelectorAll('#container .bubble'));
    console.log("需要分散的气泡数量:", toScatter.length);
    
    // 修改心跳逻辑：只执行一次跳动，在跳动到最大点时直接开始散布
    const heartbeatDuration = 400;
    toScatter.forEach(el => {
        // 创建只跳动一次的动画，在达到最大点时触发散布
        const animation = el.animate([
            { transform: el.style.transform + ' scale(1)', offset: 0 },
            { transform: el.style.transform + ' scale(1.12)', offset: 1 } // 只到最大点
        ], { duration: heartbeatDuration, easing: 'ease-in-out' });
        
        // 在动画结束时触发散布
        animation.onfinish = () => {
            // 随机位置
            const newX = Math.random() * (window.innerWidth - 200);
            const newY = Math.random() * (window.innerHeight - 80);
            
            // 添加过渡动画
            el.style.transition = 'all 0.8s ease-out';
            el.style.left = `${newX}px`;
            el.style.top = `${newY}px`;
            el.style.transform = 'translate(-50%, -50%)'; // 保持居中对齐
        };
    });
    
    // 在心跳动画结束后开始围绕中心旋转（时间稍微调整以匹配新的动画）
    setTimeout(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const duration = 20000; // 20秒一圈
        
        // 保持气泡在原有位置，只添加3D旋转效果
        toScatter.forEach((bubble, index) => {
            // 获取气泡当前位置
            const rect = bubble.getBoundingClientRect();
            const bubbleX = rect.left + rect.width / 2;
            const bubbleY = rect.top + rect.height / 2;
            
            // 计算相对于中心的角度
            const deltaX = bubbleX - centerX;
            const deltaY = bubbleY - centerY;
            let initialAngle = Math.atan2(deltaY, deltaX);
            
            // 确保角度在0到2π范围内
            if (initialAngle < 0) initialAngle += 2 * Math.PI;
            
            // 保存初始信息
            bubble.dataset.initialAngle = initialAngle;
            bubble.dataset.centerX = centerX;
            bubble.dataset.centerY = centerY;
            bubble.dataset.initialX = bubbleX;
            bubble.dataset.initialY = bubbleY;
            
            // 设置3D样式
            bubble.style.transformStyle = 'preserve-3d';
        });
        
        // 创建统一的旋转动画
        let currentRotation = 0;
        const rotationInterval = setInterval(() => {
            currentRotation += (2 * Math.PI) / (duration / 16); // 每帧增加的角度
            
            // 更新所有气泡的位置
            toScatter.forEach(bubble => {
                const initialAngle = parseFloat(bubble.dataset.initialAngle);
                const centerX = parseFloat(bubble.dataset.centerX);
                const centerY = parseFloat(bubble.dataset.centerY);
                const initialX = parseFloat(bubble.dataset.initialX);
                const initialY = parseFloat(bubble.dataset.initialY);
                
                // 计算新角度（围绕Z轴旋转）
                const newAngle = initialAngle + currentRotation;
                
                // 计算相对于中心的偏移
                const offsetX = initialX - centerX;
                const offsetY = initialY - centerY;
                
                // 应用旋转变换
                const cos = Math.cos(currentRotation);
                const sin = Math.sin(currentRotation);
                
                const newX = offsetX * cos - offsetY * sin;
                const newY = offsetX * sin + offsetY * cos;
                
                // 应用变换，保持文字朝向屏幕
                bubble.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
            });
        }, 16); // 约60fps
        
    }, heartbeatDuration + 800); // 等待心跳动画和散布动画完成
}

// 背景心和玫瑰弹出动画
// 存储背景表情，后续一起参与龙卷风螺旋动画
let bgEmojis = [];
function createBgEmoji() {
    const el = document.createElement('div');
    el.className = 'bg-emoji';
    const isRose = Math.random() < 0.5;
    el.textContent = isRose ? '🌹' : '💗';
    el.style.color = isRose ? '#c00000' : '#ff69b4';
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    // 不再自动移除，加入待动画队列
    bgEmojis.push(el);
}

function startBackgroundEmojis() {
    // 增加背景爱心和玫瑰的出现频率，从350ms减少到100ms
    setInterval(() => { 
        // 每次创建2个背景emoji以增加数量
        createBgEmoji();
        createBgEmoji();
    }, 100);
}

// 计算心形参数点（经典参数心形）
function heartPoint(t, scale) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return {
        x: window.innerWidth / 2 + x * scale,
        y: window.innerHeight / 2 - y * scale // 屏幕y向下，取负以使心形向上
    };
}

// 顺序绘制心形轮廓（从心形顶部12点方向开始，两侧同时向下绘制）
function drawHeartOutline() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    const N = 240; // 点数
    const scale = Math.min(window.innerWidth, window.innerHeight) / 60; // 心形大小
    const delay = 80; // 放慢绘制速度，从30增加到80
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 计算所有心形点
    const points = [];
    for (let i = 0; i < N; i++) {
        const t = (i / N) * 2 * Math.PI;
        const { x, y } = heartPoint(t, scale);
        points.push({ index: i, x, y, t });
    }

    // 找到心形顶部中心的点（在对称轴上，y坐标最小的点）
    let startIndex = 0;
    let minY = points[0].y;
    let minDiffX = Math.abs(points[0].x - centerX);
    
    for (let i = 1; i < points.length; i++) {
        const diffX = Math.abs(points[i].x - centerX);
        // 优先选择最接近对称轴的点，其次选择y坐标最小的点
        if (diffX < minDiffX || (Math.abs(diffX - minDiffX) < 0.1 && points[i].y < minY)) {
            minDiffX = diffX;
            minY = points[i].y;
            startIndex = i;
        }
    }

    // 获取起始点并首先绘制
    const startPoint = points[startIndex];
    bubbleCount++;
    const tip = getRandomTip();
    const bubble = createBubbleAt(startPoint.x, startPoint.y, tip);
    if (bubble) {
        bubble.style.transform = 'translate(-50%, -50%)';
        bubble.style.textAlign = 'center';
    }

    // 从起始点开始，将点分为左右两部分
    // 左侧：从起始点逆时针到对面起始点
    // 右侧：从起始点顺时针到对面起始点
    
    const leftPoints = [];
    const rightPoints = [];
    
    // 左侧点（逆时针）
    for (let i = 1; i <= Math.floor(N/2); i++) {
        const index = (startIndex - i + N) % N;
        leftPoints.push(points[index]);
    }
    
    // 右侧点（顺时针）
    for (let i = 1; i <= Math.floor(N/2); i++) {
        const index = (startIndex + i) % N;
        rightPoints.push(points[index]);
    }

    // 绘制心形轮廓，从顶部开始同时向左右两侧绘制
    const pointCount = Math.max(leftPoints.length, rightPoints.length);
    
    for (let i = 0; i < pointCount; i++) {
        // 左侧点
        if (i < leftPoints.length) {
            const pt = leftPoints[i];
            setTimeout(() => {
                bubbleCount++;
                const tip = getRandomTip();
                const bubble = createBubbleAt(pt.x, pt.y, tip);
                if (!bubble) return;

                // 右侧气泡居左，左侧气泡居右
                if (pt.x > centerX) {
                    bubble.style.transform = 'translate(0, -50%)';
                    bubble.style.textAlign = 'left';
                } else {
                    bubble.style.transform = 'translate(-100%, -50%)';
                    bubble.style.textAlign = 'right';
                }
            }, i * delay);
        }

        // 右侧点（稍微错开时间）
        if (i < rightPoints.length) {
            const pt = rightPoints[i];
            setTimeout(() => {
                bubbleCount++;
                const tip = getRandomTip();
                const bubble = createBubbleAt(pt.x, pt.y, tip);
                if (!bubble) return;

                // 右侧气泡居左，左侧气泡居右
                if (pt.x > centerX) {
                    bubble.style.transform = 'translate(0, -50%)';
                    bubble.style.textAlign = 'left';
                } else {
                    bubble.style.transform = 'translate(-100%, -50%)';
                    bubble.style.textAlign = 'right';
                }
            }, i * delay + delay/2);
        }
    }

    // 所有点绘制完成后，等待一段时间再开始分散
    setTimeout(() => {
        scatterHeartBubbles();
    }, pointCount * delay + 1500);
}

// 显示最终消息（围绕圆柱螺旋上升效果）
function showFinalMessage() {
    if (isFinalMessageShown) return;
    isFinalMessageShown = true;

    const finalContainer = document.getElementById('final-message');
    finalContainer.classList.remove('hidden');
    const loveContainer = document.getElementById('love-container');

    // 收集所有现有消息气泡（包括心形轮廓气泡）
    const messageBubbles = Array.from(document.querySelectorAll('#container .bubble'));
    console.log("转移到最终动画的气泡数量:", messageBubbles.length);

    const allItems = [];
    // 统一迁移到 love-container，并转为 love-bubble 参与3D动画
    messageBubbles.forEach(bubble => {
        bubble.classList.remove('heart-bubble');
        bubble.classList.add('love-bubble');
        bubble.style.transition = '';
        loveContainer.appendChild(bubble);
        allItems.push({ element: bubble, kind: 'text' });
    });

    // 龙卷风式螺旋上升：从较小半径到超大半径，慢速多圈向上
    const baseTurns = 6; // 多圈
    const baseDuration = 45000; // Increased from 32000 to 45000ms for slower spiral

    // 居中轴线
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 将气泡分为左侧和右侧
    const leftBubbles = [];
    const rightBubbles = [];
    
    allItems.forEach(item => {
        const el = item.element;
        const rect = el.getBoundingClientRect();
        const currentX = rect.left + rect.width / 2;
        
        if (currentX < centerX) {
            leftBubbles.push(item);
        } else {
            rightBubbles.push(item);
        }
    });

    // 左侧气泡先开始动画
    leftBubbles.forEach((item, idx) => {
        const el = item.element;
        
        // 获取元素当前位置
        const rect = el.getBoundingClientRect();
        const currentX = rect.left + rect.width / 2;
        const currentY = rect.top + rect.height / 2;
        
        // 计算当前位置相对于中心的角度
        const deltaX = currentX - centerX;
        const deltaY = centerY - currentY; // 注意Y轴方向
        let startAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        // 调整角度到0-360范围
        if (startAngle < 0) startAngle += 360;
        
        // 计算起始半径
        const startRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const endRadius = 1200 + Math.random() * 800; // 扩展到超大半径，形成龙卷风外轮廓
        const turns = baseTurns + Math.floor(Math.random() * 3); // 6-8圈
        const duration = baseDuration + Math.random() * 12000;

        el.classList.add('show');

        // 垂直起点与终点（自当前位置向上）
        const startVerticalOffset = currentY - centerY; // 相对于中心的像素偏移
        const endVerticalOffset = startVerticalOffset - (300 * window.innerHeight / 100); // 向上移动300vh

        // 创建螺旋路径的关键帧动画
        const keyframes = [];
        const steps = 50; // 动画关键帧数量
        
        for (let i = 0; i <= steps; i++) {
            const progress = i / steps;
            const currentTurns = turns * progress;
            const currentRadius = startRadius + (endRadius - startRadius) * progress;
            const currentVertical = startVerticalOffset + (endVerticalOffset - startVerticalOffset) * progress;
            const currentAngle = (startAngle + currentTurns * 360) * Math.PI / 180;
            
            // 圆柱坐标转换为笛卡尔坐标
            const x = Math.cos(currentAngle) * currentRadius;
            const y = currentVertical;
            const z = Math.sin(currentAngle) * currentRadius;
            
            // 计算相对位移（从当前位置开始）
            const translateX = x - deltaX;
            const translateY = y - (currentY - centerY);
            const translateZ = z;
            
            const opacity = 0.95 - (0.95 * progress); // 从0.95逐渐变为0
            
            keyframes.push({
                transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
                opacity: opacity
            });
        }

        // 左侧气泡立即开始动画
        el.animate(keyframes, {
            duration,
            easing: 'linear',
            fill: 'forwards'
        });
    });

    // 右侧气泡延迟1秒开始动画
    setTimeout(() => {
        rightBubbles.forEach((item, idx) => {
            const el = item.element;
            
            // 获取元素当前位置
            const rect = el.getBoundingClientRect();
            const currentX = rect.left + rect.width / 2;
            const currentY = rect.top + rect.height / 2;
            
            // 计算当前位置相对于中心的角度
            const deltaX = currentX - centerX;
            const deltaY = centerY - currentY; // 注意Y轴方向
            let startAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            // 调整角度到0-360范围
            if (startAngle < 0) startAngle += 360;
            
            // 计算起始半径
            const startRadius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            const endRadius = 1200 + Math.random() * 800; // 扩展到超大半径，形成龙卷风外轮廓
            const turns = baseTurns + Math.floor(Math.random() * 3); // 6-8圈
            const duration = baseDuration + Math.random() * 12000;

            el.classList.add('show');

            // 垂直起点与终点（自当前位置向上）
            const startVerticalOffset = currentY - centerY; // 相对于中心的像素偏移
            const endVerticalOffset = startVerticalOffset - (300 * window.innerHeight / 100); // 向上移动300vh

            // 创建螺旋路径的关键帧动画
            const keyframes = [];
            const steps = 50; // 动画关键帧数量
            
            for (let i = 0; i <= steps; i++) {
                const progress = i / steps;
                const currentTurns = turns * progress;
                const currentRadius = startRadius + (endRadius - startRadius) * progress;
                const currentVertical = startVerticalOffset + (endVerticalOffset - startVerticalOffset) * progress;
                const currentAngle = (startAngle + currentTurns * 360) * Math.PI / 180;
                
                // 圆柱坐标转换为笛卡尔坐标
                const x = Math.cos(currentAngle) * currentRadius;
                const y = currentVertical;
                const z = Math.sin(currentAngle) * currentRadius;
                
                // 计算相对位移（从当前位置开始）
                const translateX = x - deltaX;
                const translateY = y - (currentY - centerY);
                const translateZ = z;
                
                const opacity = 0.95 - (0.95 * progress); // 从0.95逐渐变为0
                
                keyframes.push({
                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
                    opacity: opacity
                });
            }

            // 右侧气泡开始动画
            el.animate(keyframes, {
                duration,
                easing: 'linear',
                fill: 'forwards'
            });
        });
    }, 1000); // 右侧气泡延迟1秒开始
}

// 开始创建气泡
function startBubbles() {
    startBackgroundEmojis(); // 背景心与玫瑰随机弹出
}

// 页面加载完成后开始
document.addEventListener('DOMContentLoaded', () => {
    // 开始背景动画
    startBackgroundEmojis();
    
    // 开始绘制心形轮廓
    setTimeout(() => {
        drawHeartOutline();
    }, 1000); // 1秒后开始绘制心形
});
