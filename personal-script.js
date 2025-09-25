// 个人网页JavaScript功能

// 主题切换
let isDarkTheme = false;
const themes = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
];
let currentThemeIndex = 0;

// 随机趣事数据
const randomFacts = [
    "我热爱学习新技术，每天都会花时间提升自己！",
    "我喜欢在咖啡店里工作，那里有最好的创作灵感。",
    "我擅长解决问题，总是能找到创新的解决方案。",
    "我喜欢旅行，已经去过很多有趣的地方。",
    "我是一个完美主义者，对工作质量要求很高。",
    "我喜欢阅读，特别是科技和设计类的书籍。",
    "我享受与团队合作，相信集体的力量。",
    "我对新技术充满好奇，总是第一个尝试新工具。"
];

/**
 * 显示随机趣事
 */
function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * randomFacts.length);
    const fact = randomFacts[randomIndex];
    
    // 创建提示框
    showNotification(fact, 'info');
}

/**
 * 切换主题
 */
function changeTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.style.background = themes[currentThemeIndex];
    
    // 如果是深色主题，添加相应的class
    if (currentThemeIndex === 1) {
        document.body.classList.add('dark-theme');
        isDarkTheme = true;
    } else {
        document.body.classList.remove('dark-theme');
        isDarkTheme = false;
    }
    
    showNotification('主题已切换！', 'success');
}

/**
 * 显示联系表单
 */
function showContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
}

/**
 * 关闭联系表单
 */
function closeContactForm() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
}

/**
 * 显示通知消息
 */
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // 根据类型设置颜色
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#667eea';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * 技能条动画
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

/**
 * 滚动动画
 */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.card, .timeline-item, .skill-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

/**
 * 表单提交处理
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const message = event.target.querySelector('textarea').value;
    
    // 模拟发送消息
    showNotification('消息已发送！我会尽快回复你。', 'success');
    
    // 关闭模态框
    closeContactForm();
    
    // 清空表单
    event.target.reset();
}

/**
 * 页面初始化
 */
function initializePage() {
    console.log('个人网页已加载完成！');
    
    // 初始化技能条动画
    animateSkillBars();
    
    // 设置滚动动画
    const elements = document.querySelectorAll('.card, .timeline-item, .skill-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScrollAnimations);
    
    // 添加表单提交事件监听
    const contactForm = document.querySelector('#contactModal form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactForm();
        }
    });
    
    // 添加键盘事件监听
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeContactForm();
        }
    });
    
    // 显示欢迎消息
    setTimeout(() => {
        showNotification('欢迎来到我的个人网页！', 'success');
    }, 1000);
}

// 当DOM内容加载完成时执行初始化
document.addEventListener('DOMContentLoaded', initializePage);
