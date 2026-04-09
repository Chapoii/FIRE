<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-particles">
          <span v-for="n in 20" :key="n" class="particle" :style="particleStyle(n)"></span>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">🔥 Financial Independence, Retire Early</div>
        <h1 class="hero-title">
          <span class="title-fire">FIRE</span>
          <span class="title-sub">之路</span>
        </h1>
        <p class="hero-desc">
          通过合理的财务规划和投资策略，实现经济独立与提前退休的自由生活。
          <br />掌控你的财富，掌控你的人生。
        </p>
        <div class="hero-actions">
          <router-link to="/calculator" class="btn btn-primary">
            <span>🚀</span> 开始规划
          </router-link>
          <a href="#what-is-fire" class="btn btn-outline">了解更多 ↓</a>
        </div>
      </div>
    </section>

    <!-- 什么是 FIRE -->
    <section id="what-is-fire" class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">📖 概念介绍</span>
          <h2 class="section-title">什么是 FIRE？</h2>
          <p class="section-desc">FIRE 是一场关于财务自由的生活运动</p>
        </div>
        <div class="fire-intro-card">
          <div class="intro-text">
            <p>
              <strong>FIRE</strong>（Financial Independence, Retire Early）即<strong>「财务独立，提前退休」</strong>，
              是一种通过大幅降低生活支出、积极储蓄和投资来实现经济独立的生活方式运动。
            </p>
            <p>
              这个概念起源于 1992 年 Vicki Robin 和 Joe Dominguez 的著作《Your Money or Your Life》，
              并在近年来通过博客和社交媒体在全球范围内迅速传播。
            </p>
            <p>
              FIRE 的核心理念是：<strong>当你通过投资产生的被动收入足以覆盖你的生活开支时，你就实现了财务独立。</strong>
              此时你不再需要为了赚钱而工作，可以自由选择自己想做的事情。
            </p>
          </div>
          <div class="intro-visual">
            <div class="formula-card">
              <div class="formula-icon">📐</div>
              <h3>4% 法则</h3>
              <div class="formula">本金 × 4% = 年支出</div>
              <p class="formula-desc">
                当你的投资组合总额达到年支出的 25 倍时，你就可以安全地每年提取 4% 而不会耗尽本金。
              </p>
              <div class="formula-example">
                <span>例：年支出 ¥18万</span>
                <span class="formula-result">→ 需要本金 ¥450万</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FIRE 的类型 -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">🎯 运动类型</span>
          <h2 class="section-title">FIRE 的不同流派</h2>
          <p class="section-desc">选择适合你的 FIRE 之路</p>
        </div>
        <div class="fire-types">
          <div class="type-card" v-for="t in fireTypes" :key="t.name">
            <div class="type-icon" :style="{ background: t.gradient }">{{ t.icon }}</div>
            <h3>{{ t.name }}</h3>
            <p>{{ t.nameEn }}</p>
            <div class="type-desc">{{ t.desc }}</div>
            <div class="type-tags">
              <span v-for="tag in t.tags" :key="tag" class="type-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实现路径 -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">🗺️ 行动指南</span>
          <h2 class="section-title">如何实现 FIRE？</h2>
          <p class="section-desc">五个关键步骤，开启你的自由之路</p>
        </div>
        <div class="steps">
          <div class="step" v-for="(step, i) in steps" :key="i">
            <div class="step-number" :style="{ background: step.color }">{{ i + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
              <ul>
                <li v-for="item in step.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关键数字 -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">📊 关键指标</span>
          <h2 class="section-title">FIRE 的核心数字</h2>
        </div>
        <div class="metrics">
          <div class="metric-card" v-for="m in metrics" :key="m.label">
            <div class="metric-value" :style="{ color: m.color }">{{ m.value }}</div>
            <div class="metric-label">{{ m.label }}</div>
            <div class="metric-desc">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card">
          <h2>🚀 准备好开始你的 FIRE 之旅了吗？</h2>
          <p>使用我们的财务规划器，计算你的 FIRE 目标和达成路径</p>
          <router-link to="/calculator" class="btn btn-primary btn-lg">
            打开财务规划器 →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const fireTypes = [
  {
    icon: '🔥',
    name: 'Fat FIRE',
    nameEn: '肥胖 FIRE',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    desc: '维持高消费水平的同时实现财务自由，需要更高的储蓄率和投资回报。',
    tags: ['高收入', '高消费', '奢华退休']
  },
  {
    icon: '🥑',
    name: 'Lean FIRE',
    nameEn: '精简 FIRE',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    desc: '通过极简生活降低支出，用较少的本金就能实现财务自由。',
    tags: ['低消费', '极简主义', '快速退休']
  },
  {
    icon: '☕',
    name: 'Barista FIRE',
    nameEn: '咖啡师 FIRE',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    desc: '半退休状态，通过兼职或自由职业获得部分收入，降低财务压力。',
    tags: ['半退休', '兼职', '平衡生活']
  },
  {
    icon: '🌊',
    name: 'Coast FIRE',
    nameEn: '海岸 FIRE',
    gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
    desc: '已有足够储蓄，不再额外存钱，让复利自然增长到退休目标。',
    tags: ['复利增长', '轻松等待', '已有基础']
  }
]

const steps = [
  {
    title: '明确你的 FIRE 目标',
    desc: '确定你期望的退休生活方式和所需的年支出。',
    color: 'linear-gradient(135deg, #667eea, #764ba2)',
    items: ['计算年支出需求', '确定退休生活方式', '考虑通货膨胀因素']
  },
  {
    title: '计算目标本金',
    desc: '根据 4% 法则，计算实现 FIRE 所需的投资组合总额。',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    items: ['年支出 × 25 = 目标本金', '考虑个人风险偏好', '预留应急资金']
  },
  {
    title: '提高储蓄率',
    desc: '尽可能提高收入、降低支出，将储蓄率提升到 50% 以上。',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    items: ['削减不必要开支', '增加收入来源', '目标储蓄率 50%-70%']
  },
  {
    title: '投资理财',
    desc: '将储蓄投入低成本的指数基金，利用长期复利增长。',
    color: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    items: ['配置指数基金组合', '长期持有不频繁交易', '定期定额投资']
  },
  {
    title: '持续优化',
    desc: '定期审视和调整你的财务计划，确保朝着目标稳步前进。',
    color: 'linear-gradient(135deg, #fa709a, #fee140)',
    items: ['年度财务复盘', '调整投资组合', '追踪进度']
  }
]

const metrics = [
  { value: '25x', label: '年支出倍数', desc: '目标本金 = 年支出 × 25', color: '#667eea' },
  { value: '4%', label: '安全提取率', desc: '每年可安全提取投资组合的 4%', color: '#f5576c' },
  { value: '50%+', label: '储蓄率', desc: '将收入的 50% 以上用于储蓄投资', color: '#4facfe' },
  { value: '7-10%', label: '年化收益', desc: '长期投资股票市场的预期回报', color: '#43e97b' }
]

function particleStyle(n) {
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = 3 + Math.random() * 4
  const size = 2 + Math.random() * 4
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`
  }
}
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  bottom: -10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) scale(0); opacity: 0; }
}

.hero-content {
  position: relative;
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 20px;
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  margin-bottom: 24px;
  backdrop-filter: blur(4px);
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
}

.title-fire {
  background: linear-gradient(135deg, #f5576c, #ff9a56, #ffcc33);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  margin-left: 8px;
}

.hero-desc {
  color: rgba(255, 255, 255, 0.65);
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #f5576c, #ff6b6b);
  color: #fff;
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(245, 87, 108, 0.5);
}

.btn-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-outline:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
}

.btn-lg {
  padding: 18px 40px;
  font-size: 1.1rem;
}

/* Sections */
.section {
  padding: 80px 20px;
}

.section-alt {
  background: #f8f9fc;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-tag {
  display: inline-block;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  color: #667eea;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.section-desc {
  color: #888;
  font-size: 1rem;
}

/* FIRE Intro */
.fire-intro-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: start;
}

.intro-text p {
  color: #555;
  line-height: 1.9;
  margin-bottom: 16px;
  font-size: 1.02rem;
}

.intro-text strong {
  color: #1a1a2e;
}

.formula-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  padding: 32px;
  color: #fff;
  text-align: center;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.formula-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.formula-card h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
}

.formula {
  font-size: 1.4rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.formula-desc {
  font-size: 0.88rem;
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 16px;
}

.formula-example {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.formula-result {
  font-weight: 700;
  font-size: 1rem;
}

/* FIRE Types */
.fire-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.type-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.type-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.type-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 16px;
}

.type-card h3 {
  font-size: 1.2rem;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.type-card > p {
  font-size: 0.82rem;
  color: #aaa;
  margin-bottom: 12px;
}

.type-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.type-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.type-tag {
  font-size: 0.75rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.08);
  padding: 3px 10px;
  border-radius: 10px;
}

/* Steps */
.steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.step {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.step:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
}

.step-content h3 {
  font-size: 1.15rem;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.step-content p {
  color: #666;
  font-size: 0.92rem;
  margin-bottom: 10px;
}

.step-content ul {
  list-style: none;
  padding: 0;
}

.step-content li {
  color: #888;
  font-size: 0.85rem;
  padding: 3px 0;
  padding-left: 18px;
  position: relative;
}

.step-content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #43e97b;
  font-weight: 700;
}

/* Metrics */
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.metric-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.metric-value {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 1rem;
  color: #1a1a2e;
  font-weight: 600;
  margin-bottom: 6px;
}

.metric-desc {
  font-size: 0.82rem;
  color: #999;
}

/* CTA */
.cta-section {
  padding: 60px 20px;
}

.cta-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  color: #fff;
}

.cta-card h2 {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.cta-card p {
  opacity: 0.85;
  margin-bottom: 32px;
  font-size: 1.05rem;
}

.cta-card .btn-primary {
  background: #fff;
  color: #667eea;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cta-card .btn-primary:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .fire-intro-card {
    grid-template-columns: 1fr;
  }

  .step {
    flex-direction: column;
    gap: 16px;
  }

  .section-title {
    font-size: 1.7rem;
  }
}
</style>
