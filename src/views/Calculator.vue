<template>
  <div class="calculator">
    <!-- 标题区域 -->
    <div class="calc-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <h1 class="calc-title">💰 财务规划器</h1>
      <p class="calc-subtitle">规划你的财务，实现经济独立</p>
      <div class="calc-actions">
        <button class="action-btn primary" @click="handleSaveData">📥 保存参数</button>
        <button class="action-btn outline" @click="importInputRef?.click()">📤 导入参数</button>
        <input
          ref="importInputRef"
          type="file"
          accept="application/json"
          class="hidden"
          @change="handleImportData"
        />
      </div>
    </div>

    <div class="calc-grid">
      <!-- 参数设置区域 -->
      <div class="calc-params">
        <!-- 财务目标设置 -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">🎯</span>
            <span class="card-title">财务目标</span>
          </div>
          <div class="card-body">
            <div class="form-item">
              <label>预期月支出 (¥)</label>
              <input
                v-model.number="financialStore.data.monthlyExpense"
                type="number"
                @change="handleDataChange('monthlyExpense')"
              />
            </div>
            <div class="form-item">
              <label>预期年化收益率 (%)</label>
              <input
                v-model.number="financialStore.data.yearlyReturn"
                type="number"
                step="0.1"
                @change="handleDataChange('yearlyReturn')"
              />
            </div>
          </div>
        </div>

        <!-- 收支情况 -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">📈</span>
            <span class="card-title">收支情况</span>
          </div>
          <div class="card-body">
            <div class="form-item">
              <label>月收入 (¥)</label>
              <input
                v-model.number="financialStore.data.monthlyIncome"
                type="number"
                @change="handleDataChange('monthlyIncome')"
              />
            </div>
            <div class="form-item">
              <label>月固定支出 (¥)</label>
              <input
                v-model.number="financialStore.data.monthlyFixedCost"
                type="number"
                @change="handleDataChange('monthlyFixedCost')"
              />
            </div>
            <div class="form-item">
              <label>现有资金 (¥)</label>
              <input
                v-model.number="financialStore.data.currentSavings"
                type="number"
                @change="handleDataChange('currentSavings')"
              />
            </div>
            <div class="form-item">
              <label>目标达成时间 (年)</label>
              <input
                v-model.number="financialStore.data.targetYears"
                type="number"
                step="0.5"
                @change="handleDataChange('targetYears')"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 计算结果区域 -->
      <div class="calc-results">
        <!-- 核心指标 -->
        <div class="card highlight">
          <div class="card-header">
            <span class="card-icon">📊</span>
            <span class="card-title">核心指标</span>
          </div>
          <div class="card-body">
            <div class="metric-block">
              <div class="metric-label">财务规划所需本金</div>
              <div class="metric-value">{{ formatCurrency(financialStore.results.requiredCapital) }}</div>
            </div>
            <div class="metric-block">
              <div class="metric-label">当前月度盈余</div>
              <div class="metric-value">{{ formatCurrency(financialStore.results.monthlySurplus) }}</div>
            </div>
          </div>
        </div>

        <!-- 路径分析 -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">⏱️</span>
            <span class="card-title">路径分析</span>
          </div>
          <div class="card-body">
            <div class="analysis-row">
              <span class="analysis-label">按现有盈余达成时间</span>
              <span
                class="analysis-badge"
                :class="financialStore.results.timeToGoal <= financialStore.data.targetYears ? 'success' : 'danger'"
              >
                {{ formatTime(financialStore.results.timeToGoal) }}
              </span>
            </div>
            <div class="analysis-divider"></div>
            <div class="analysis-row">
              <span class="analysis-label">按目标时间所需月储蓄</span>
              <span
                class="analysis-badge"
                :class="financialStore.results.requiredMonthlySaving <= financialStore.results.monthlySurplus ? 'success' : 'danger'"
              >
                {{ formatCurrency(financialStore.results.requiredMonthlySaving) }}
              </span>
            </div>
          </div>
        </div>

        <!-- 进度分析 -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">💵</span>
            <span class="card-title">进度分析</span>
          </div>
          <div class="card-body">
            <div class="progress-header">
              <span>资金完成度</span>
              <span class="progress-pct">{{ financialStore.results.progress.toFixed(2) }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: Math.min(100, financialStore.results.progress) + '%' }"
              ></div>
            </div>
            <div class="progress-footer">
              还需 {{ formatCurrency(Math.max(0, financialStore.results.requiredCapital - financialStore.data.currentSavings)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFinancialStore } from '../stores/financial.js'

const financialStore = useFinancialStore()
const importInputRef = ref(null)

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatTime = (years) => {
  if (!isFinite(years)) return '∞'
  if (years < 1) return `${Math.ceil(years * 12)}个月`
  return `${years.toFixed(1)}年`
}

const handleDataChange = (field) => {
  financialStore.updateData(field, financialStore.data[field])
}

const handleSaveData = () => {
  financialStore.saveDataToFile()
}

const handleImportData = async (e) => {
  const input = e.target
  const file = input.files?.[0]
  if (!file) return
  try {
    await financialStore.importDataFromFile(file)
  } catch (error) {
    alert(error)
  }
  input.value = ''
}

onMounted(() => {
  financialStore.initData()
  financialStore.calculateResults()
})
</script>

<style scoped>
.calculator {
  min-height: 100vh;
  background: #f0f2f5;
  padding-bottom: 60px;
}

.calc-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 24px 32px;
  text-align: center;
}

.back-link {
  position: absolute;
  top: 16px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 1;
}

.calc-title {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.calc-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 20px;
}

.calc-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 24px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.action-btn.primary {
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.action-btn.outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.action-btn.outline:hover {
  border-color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
}

.hidden {
  display: none;
}

.calc-grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.calc-params,
.calc-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Card */
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card.highlight {
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.card-icon {
  font-size: 1.2rem;
}

.card-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
}

.card-body {
  padding: 20px;
}

/* Form */
.form-item {
  margin-bottom: 16px;
}

.form-item:last-child {
  margin-bottom: 0;
}

.form-item label {
  display: block;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 6px;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  outline: none;
}

.form-item input:focus {
  border-color: #667eea;
}

/* Metric Blocks */
.metric-block {
  padding: 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin-bottom: 12px;
}

.metric-block:last-child {
  margin-bottom: 0;
}

.metric-block .metric-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 6px;
}

.metric-block .metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

/* Analysis */
.analysis-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fc;
  border-radius: 10px;
}

.analysis-label {
  font-size: 0.88rem;
  color: #555;
}

.analysis-badge {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 20px;
}

.analysis-badge.success {
  background: rgba(67, 233, 123, 0.12);
  color: #22c55e;
}

.analysis-badge.danger {
  background: rgba(245, 87, 108, 0.12);
  color: #f5576c;
}

.analysis-divider {
  height: 1px;
  background: #eee;
  margin: 12px 0;
}

/* Progress */
.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: #555;
  margin-bottom: 10px;
}

.progress-pct {
  font-weight: 600;
  color: #667eea;
}

.progress-bar {
  height: 10px;
  background: #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-footer {
  text-align: center;
  font-size: 0.82rem;
  color: #999;
}

/* Responsive */
@media (max-width: 768px) {
  .calc-grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .calc-title {
    font-size: 1.5rem;
  }
}
</style>
